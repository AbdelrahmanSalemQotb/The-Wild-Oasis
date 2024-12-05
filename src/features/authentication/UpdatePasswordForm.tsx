import { useForm } from "react-hook-form";
import Button from "../../ui/Buttons/Button";
import Form from "../../ui/Form/Form";
import Input from "../../ui/Form/FormControls/Input";
import FormRow from "../../ui/Form/FormRow";
import { useUpdateUser } from "./useUpdateUser";
import SpinnerMini from "../../ui/common/loaders/SpinnerMini";

type UpdatePasswordFormData = {
  password: string;
  passwordConfirm: string;
};

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<UpdatePasswordFormData>();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }: Pick<UpdatePasswordFormData, "password">) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        orientation="responsive"
        mediaWidth={500}
        label="Password (min 8 characters)"
        error={errors?.password?.message as string}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        orientation="responsive"
        mediaWidth={500}
        label="Confirm password"
        error={errors?.passwordConfirm?.message as string}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <>
          <Button onClick={() => reset()} type="reset" variation="secondary">
            Cancel
          </Button>
          <Button disabled={isUpdating}>
            {isUpdating ? <SpinnerMini /> : "Update password"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
