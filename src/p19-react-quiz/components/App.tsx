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
import Footer from "./Footer";
import Timer from "./Timer";

const SECONDS_PER_QUESTION = 30;

type State = {
  index: number;
  questions: QuestionType[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  selected: null | number;
  points: number;
  highscore: number;
  remainedSeconds: number | null;
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
type Restart = {
  type: "restart";
};
type Tick = {
  type: "tick";
};

export type Action =
  | DataRecieved
  | DataFailed
  | Start
  | Select
  | NextQuestion
  | Finish
  | Restart
  | Tick;

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  selected: null,
  points: 0,
  highscore: 0,
  remainedSeconds: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "data-recieved":
      return { ...state, status: "ready", questions: action.payload };
    case "data-failed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        remainedSeconds: state.questions.length * SECONDS_PER_QUESTION,
      };
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
      const newHighscore =
        state.points > state.highscore ? state.points : state.highscore;
      return { ...state, status: "finished", highscore: newHighscore };

    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };
    case "tick":
      return {
        ...state,
        remainedSeconds: state.remainedSeconds! - 1,
        status: state.remainedSeconds === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action");
  }
}
export default function App() {
  const [
    { status, questions, index, selected, points, highscore, remainedSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);

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
            <Footer>
              <Timer remainedSeconds={remainedSeconds} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                selected={selected}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}
