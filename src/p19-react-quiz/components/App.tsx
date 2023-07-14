import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import { QuestionType } from "../types";
import Loader from "./Loader";
import ErrorCom from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

type State = {
  index: number;
  questions: QuestionType[] | [];
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

export type Action = DataRecieved | DataFailed | Start | Select;

const initialState: State = {
  index: 0,
  questions: [],
  status: "loading",
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

    default:
      throw new Error("Unknown action");
  }
}
export default function App() {
  const [{ status, questions, index, selected }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;

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
          <Question
            question={questions[index]}
            dispatch={dispatch}
            selected={selected}
          />
        )}
      </Main>
    </div>
  );
}
