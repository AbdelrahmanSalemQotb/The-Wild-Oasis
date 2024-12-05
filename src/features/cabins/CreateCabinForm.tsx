import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../ui/Buttons/Button";
import Form from "../../ui/Form/Form";
import FileInput from "../../ui/Form/FormControls/FileInput";
import Input from "../../ui/Form/FormControls/Input";
import Textarea from "../../ui/Form/FormControls/Textarea";
import FormRow from "../../ui/Form/FormRow";
import { CabinType } from "../Types/CabinTypes";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

interface ICreateCabinForm {
  onCloseModal?: undefined | (() => void);
  cabinToEdit?: CabinType;
}
type Inputs = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | string;
};

function CreateCabinForm({
  onCloseModal = undefined,
  cabinToEdit = {} as CabinType,
}: ICreateCabinForm) {
  const isEditSession = !!cabinToEdit?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Inputs>({
    defaultValues: isEditSession
      ? {
          ...cabinToEdit,
          name: cabinToEdit.name || "",
          description: cabinToEdit.description || "",
          image: cabinToEdit.image || "",
        }
      : {},
  });

  const { createCabin, isCreating } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isLoading = isCreating || isEditing;

  console.log(cabinToEdit, "before submit");
  const onSubmit: SubmitHandler<Inputs> = (newCabin) => {
    console.log(cabinToEdit, "after submit");

    const image =
      typeof newCabin.image === "string" ? newCabin.image : newCabin.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...newCabin, image }, id: cabinToEdit.id },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...newCabin, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow
        orientation="responsive"
        mediaWidth={600}
        label="Cabin name"
        error={errors?.name?.message?.toString()}
      >
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
            disabled: isLoading,
          })}
        />
      </FormRow>

      <FormRow
        orientation="responsive"
        mediaWidth={600}
        label="Maximum capacity"
        error={errors?.maxCapacity?.message?.toString()}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            disabled: isLoading,
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        orientation="responsive"
        mediaWidth={600}
        label="Regular price"
        error={errors?.regularPrice?.message?.toString()}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            disabled: isLoading,
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        orientation="responsive"
        mediaWidth={600}
        label="Discount"
        error={errors?.discount?.message?.toString()}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            disabled: isLoading,
            validate: (value) =>
              value <= getValues("regularPrice") ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        orientation="responsive"
        mediaWidth={600}
        label="Description for website"
        error={errors?.description?.message?.toString()}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", {
            disabled: isLoading,
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        orientation="responsive"
        mediaWidth={600}
        label="Cabin photo"
        error={errors?.image?.message?.toString()}
      >
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            disabled: isLoading,
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button
            variation="secondary"
            type="reset"
            disabled={isLoading}
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>

          <Button disabled={isLoading}>
            {isEditSession ? "Edit cabin" : "Create new cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
