import useCabins from "./useCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import { IFetchedCabin } from "../../cabins.interface";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
type Filters = "all" | "no-discount" | "with-discount";

export default function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  const filterValue = (searchParams.get("discount") as Filters) || "all";
  let filteredCabins: IFetchedCabin[];
  if (filterValue === "all") {
    filteredCabins = cabins as IFetchedCabin[];
  }
  if (filterValue === "no-discount") {
    filteredCabins = cabins?.filter(
      (item) => item.discount === 0,
    ) as IFetchedCabin[];
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins?.filter(
      (item) => item.discount! > 0,
    ) as IFetchedCabin[];
  }
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body
          data={filteredCabins!}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
