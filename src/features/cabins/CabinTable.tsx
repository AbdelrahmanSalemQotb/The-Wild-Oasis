import { CabinType } from "../Types/CabinTypes";

import Menus from "../../ui/Menus/Menus";
import Table from "../../ui/Table/Table";
import Empty from "../../ui/common/errors/Empty";
import Spinner from "../../ui/common/loaders/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import { useSortFilterCabins } from "./useSortFilterCabins";

function CabinTable() {
  const { cabins = [], isLoading } = useCabins();

  const sortedCabins = useSortFilterCabins(cabins);

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  return (
    <Menus>
      <Table columns="minmax(20px, 0.6fr) 1fr minmax(2ch, 1fr) minmax(6ch, 1fr) minmax(6ch, 1fr) 15px">
        <Table.Header>
          <div></div>
          <div title="Cabin">Cabin</div>
          <div title="Capacity">Capacity</div>
          <div title="Price">Price</div>
          <div title="Discount">Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin: CabinType) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
