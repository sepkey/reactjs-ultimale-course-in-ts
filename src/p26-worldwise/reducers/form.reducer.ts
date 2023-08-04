type State = {
  isLoadingGeocoding: boolean;
  cityName: string;
  country: string;
  date: Date;
  notes: string;
  emoji: string;
  geocodingError: string;
};
type Data = { cityName: string; country: string; emoji: string };
type Action =
  | { type: "loading" }
  | {
      type: "data-received";
      payload: Data;
    }
  | { type: "failed"; payload: string }
  | { type: "name-changed"; payload: string }
  | { type: "date-changed"; payload: Date }
  | { type: "note-changed"; payload: string };

export const initialForm: State = {
  cityName: "",
  country: "",
  date: new Date(),
  emoji: "",
  geocodingError: "",
  isLoadingGeocoding: false,
  notes: "",
};
export function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "loading":
      return { ...state, isLoadingGeocoding: true, geocodingError: "" };
    case "data-received":
      return {
        ...state,
        ...action.payload,
        isLoadingGeocoding: false,
      };
    case "failed":
      return {
        ...state,
        geocodingError: action.payload,
        isLoadingGeocoding: false,
      };
    case "name-changed":
      return { ...state, cityName: action.payload };
    case "date-changed":
      return { ...state, date: action.payload };
    case "note-changed":
      return { ...state, notes: action.payload };
    default:
      throw new Error("Unknown action");
  }
}
