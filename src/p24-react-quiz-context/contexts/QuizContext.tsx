import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { QuestionType } from "../types";

const QuizContex = createContext<ContextType | null>(null);
type State = {
  index: number;
  questions: QuestionType[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  selected: null | number;
  points: number;
  highscore: number;
  remainedSeconds: number | null;
};
type ContextType = State & {
  dispatch: Dispatch<Action>;
  maxPoints: number;
  numQuestions: number;
};

// type Difficulty = "easy" | "medium" | "difficult";

type DataRecieved = {
  type: "data-recieved";
  payload: QuestionType[];
};

type DataFailed = {
  type: "data-failed";
};

type Start = {
  type: "start";
  payload: { difficulty: string; size?: number };
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
const SECONDS_PER_QUESTION = 30;

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

const ceriteria = { easy: 10, medium: 20, difficult: 30 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "data-recieved":
      return { ...state, status: "ready", questions: action.payload };
    case "data-failed":
      return { ...state, status: "error" };
    case "start":
      const { size, difficulty } = action.payload;
      const showedQuestions = [...state.questions]
        .filter(
          (q) => q.points === ceriteria[difficulty as keyof typeof ceriteria]
        )
        .slice(0, size);
      return {
        ...state,
        status: "active",
        questions: showedQuestions,
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
function QuizProvider({ children }: PropsWithChildren) {
  const [
    { status, questions, index, selected, points, highscore, remainedSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  const numQuestions = questions.length;
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        // const questionsSlice = data.slice(0, 5);
        dispatch({ type: "data-recieved", payload: data });
      })
      .catch((err) => dispatch({ type: "data-failed" }));
  }, []);

  return (
    <QuizContex.Provider
      value={{
        status,
        questions,
        highscore,
        index,
        points,
        remainedSeconds,
        selected,
        dispatch,
        maxPoints,
        numQuestions,
      }}
    >
      {children}
    </QuizContex.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContex) as ContextType;

  if (context === undefined) throw new Error("Out of cities context");
  return context;
}

export { QuizProvider, useQuiz };
