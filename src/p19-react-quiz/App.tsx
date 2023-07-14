import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import { QuestionType } from "./types";
import Loader from "./Loader";
import ErrorCom from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

type State = {
  idx: number;
  questions: QuestionType[] | [];
  status: "loading" | "error" | "ready" | "active" | "finished";
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

export type Action = DataRecieved | DataFailed | Start;

const initialState: State = {
  idx: 0,
  questions: [],
  status: "loading",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "data-recieved":
      return { ...state, status: "ready", questions: action.payload };
    case "data-failed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    default:
      throw new Error("Unknown action");
  }
}
export default function App() {
  const [{ status, questions, idx }, dispatch] = useReducer(
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
        {status === "active" && <Question />}
      </Main>
    </div>
  );
}
