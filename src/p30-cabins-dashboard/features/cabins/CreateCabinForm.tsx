import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createEditCabin } from "../../services/apiCabins";
import { IFetchedCabin } from "../../models";
import FormRow from "../../ui/FormRow";

export interface INewCabin {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}

type Props = { cabinToEdit?: Partial<IFetchedCabin> };
function CreateCabinForm({ cabinToEdit = {} }: Props) {
  const { id: editId, created_at, ...editValues } = cabinToEdit!;
  const isEditSession = Boolean(editId);
  // { defaultValues: isEditSession ? editValues : {} }
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<INewCabin>({
      defaultValues: isEditSession
        ? {
            name: cabinToEdit.name,
            maxCapacity: cabinToEdit.maxCapacity,
            regularPrice: cabinToEdit.regularPrice,
            discount: cabinToEdit.discount,
            description: cabinToEdit.description,
            image: undefined,
          }
        : {},
    });
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err: any) => toast.error(err.message),
  });

  function onSubmit(data: INewCabin) {
    mutate({ ...data, image: data.image });
  }
  function onError(errors: FieldErrors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="name" error={errors?.name?.message}>
        <Input
          disabled={isCreating}
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="maxCapacity" error={errors.maxCapacity?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "The capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "The price should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="discount"
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea
          disabled={isCreating}
          id="description"
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        <FileInput
          disabled={isCreating}
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
