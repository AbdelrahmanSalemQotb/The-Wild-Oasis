import { useSearchParams } from "react-router-dom";
import { naturalSort } from "../../utils/helpers";
import { CabinType } from "../Types/CabinTypes";

export function useSortFilterCabins(cabins: CabinType[]): CabinType[] {
  const [serachParams] = useSearchParams();

  // 1) Filter
  const filterType = serachParams.get("discount") || "all";

  let filteredCabins: CabinType[] = [];

  if (filterType === "all") filteredCabins = cabins;
  if (filterType === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterType === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) Sort
  const sortByField = serachParams.get("sortBy") || "name-asc";

  const [sortBy, direction] = sortByField.split("-");

  const validSortFields: (keyof CabinType)[] = Object.keys(
    (cabins?.at(0) as CabinType) || {}
  ) as (keyof CabinType)[];

  const validKey = validSortFields.includes(sortBy as keyof CabinType)
    ? sortBy
    : "name";

  const validDirection =
    direction === "asc" || direction === "desc" ? direction : "asc";

  const modifier = validDirection === "asc" ? 1 : -1;
  const sortedCabins: CabinType[] = [...filteredCabins];

  sortedCabins.sort(
    (a, b) =>
      naturalSort(
        a[validKey as keyof CabinType] as string,
        b[validKey as keyof CabinType] as string
      ) * modifier
  );

  return sortedCabins;
}
