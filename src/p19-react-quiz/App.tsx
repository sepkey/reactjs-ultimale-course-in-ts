import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import { QuestionType } from "./types";

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

type Action = DataRecieved | DataFailed;

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
    default:
      throw Error("Unknown action");
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
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
        <p>1/15</p>
        <p>question?</p>
      </Main>
    </div>
  );
}
