import { useSearchParams } from "react-router-dom";

import useCabins from "./useCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { IFetchedCabin } from "../../models/cabins.interface";
import Empty from "../../ui/Empty";

type Filters = "all" | "no-discount" | "with-discount";

export default function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  //Filter
  const filterValue = (searchParams.get("discount") as Filters) || "all";
  let filteredCabins: IFetchedCabin[] = [];
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

  // Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    (a, b) =>
      (Number(a[field as keyof IFetchedCabin]) -
        Number(b[field as keyof IFetchedCabin])) *
      modifier,
  );

  if (isLoading) return <Spinner />;

  if (!cabins?.length) return <Empty resourceName="cabins" />;

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
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
