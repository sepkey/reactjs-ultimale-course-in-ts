import { useSearchParams } from "react-router-dom";
import { OperationItem } from "../models/models";
import Select from "./Select";

type Props = { options: OperationItem[]; value: string };

export default function Sortby({ options, value }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortBy}
      type="white"
      onChange={handleChange}
    />
  );
}
