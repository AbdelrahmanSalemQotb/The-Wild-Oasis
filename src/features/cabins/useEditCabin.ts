import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import {
  CabinInsertTypeWithImageFile,
  CabinUpdateType,
} from "../Types/CabinTypes";

type EditCabinData = {
  newCabinData: CabinUpdateType | CabinInsertTypeWithImageFile;
  id: number;
};

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: (data: EditCabinData) =>
      createEditCabin(data.newCabinData, data.id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
