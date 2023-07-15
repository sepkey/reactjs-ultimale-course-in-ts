import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import { QuestionType } from "../types";
import Loader from "./Loader";
import ErrorCom from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

type State = {
  index: number;
  questions: QuestionType[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  selected: null | number;
  points: number;
};

type DataRecieved = {
  type: "data-recieved";
  payload: QuestionType[];
};

type DataFailed = {
  type: "data-failed";
};

type Start = {
  type: "start";
};

type Select = {
  type: "select";
  payload: number;
};

type NextQuestion = {
  type: "next-question";
};

type Finish = {
  type: "finish";
};

export type Action =
  | DataRecieved
  | DataFailed
  | Start
  | Select
  | NextQuestion
  | Finish;

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  selected: null,
  points: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "data-recieved":
      return { ...state, status: "ready", questions: action.payload };
    case "data-failed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "select":
      const question = state.questions.at(state.index);
      return {
        ...state,
        selected: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "next-question":
      return {
        ...state,
        index: state.index + 1,
        selected: null,
      };
    case "finish":
      return { ...state, status: "finished" };
    default:
      throw new Error("Unknown action");
  }
}
export default function App() {
  const [{ status, questions, index, selected, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "data-recieved", payload: data }))
      .catch((err) => dispatch({ type: "data-failed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorCom />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              selected={selected}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              selected={selected}
            />
            <NextButton
              dispatch={dispatch}
              selected={selected}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}

        {status === "finished" && (
          <FinishScreen points={points} maxPoints={maxPoints} />
        )}
      </Main>
    </div>
  );
}
