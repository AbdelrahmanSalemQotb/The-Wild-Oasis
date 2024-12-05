import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";
import { CABINS_KEY_NAME } from "./constantVariables";

function useDeleteCabin() {
  const queryCilent = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryCilent.invalidateQueries({ queryKey: [CABINS_KEY_NAME] });
      toast.success("Cabin successfully deleted");
    },
    onError: (error) => toast.error(`${error.message}`),
  });
  return { isDeleting: isPending, deleteCabin: mutate };
}

export default useDeleteCabin;
