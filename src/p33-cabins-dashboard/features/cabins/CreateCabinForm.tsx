import { FieldErrors, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { IFetchedCabin, INewCabin } from "../../cabins.interface";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

type Props = {
  cabinToEdit?: Partial<IFetchedCabin>;
  onCloseModal?: () => void;
};
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }: Props) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const { id: editId, ...editValues } = cabinToEdit!;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<INewCabin>({ defaultValues: isEditSession ? editValues : {} });
  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  function onSubmit(data: INewCabin) {
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image: data.image }, id: editId! },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      createCabin(
        { ...data, image: data.image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        },
      );
  }

  function onError(errors: FieldErrors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="name" error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="maxCapacity" error={errors.maxCapacity?.message}>
        <Input
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          id="description"
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        <FileInput
          disabled={isWorking}
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
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
