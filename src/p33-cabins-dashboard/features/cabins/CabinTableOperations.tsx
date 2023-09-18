import Filter from "../../ui/Filter";
import Sortby from "../../ui/Sortby";
import TableOperations from "../../ui/TableOperations";

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
        filterField="discount"
      />
      <Sortby
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          {
            value: "regularPrice-asc",
            label: "Sort by price (first low)",
          },
          {
            value: "regularPrice-desc",
            label: "Sort by price (first high)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by capacity (first low)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by capacity (first high)",
          },
        ]}
        value="hi"
      />
    </TableOperations>
  );
}
