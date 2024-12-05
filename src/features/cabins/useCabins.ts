import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { CABINS_KEY_NAME } from "./constantVariables";
import { CabinType } from "../Types/CabinTypes";

function useCabins() {
  const {
    data: cabins = [],
    isLoading,
    error,
  } = useQuery<CabinType[]>({
    queryKey: [CABINS_KEY_NAME],
    queryFn: getCabins,
  });

  return { cabins, isLoading, error };
}

export default useCabins;
