import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";
import { INewCabin } from "../../models/cabins.interface";

export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: INewCabin;
      id: number;
    }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err: any) => toast.error(err.message),
  });
  return { editCabin, isEditing };
}
