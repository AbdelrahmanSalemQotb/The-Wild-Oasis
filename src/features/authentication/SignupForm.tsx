import { useForm } from "react-hook-form";
import Button from "../../ui/Buttons/Button";
import Form from "../../ui/Form/Form";
import Input from "../../ui/Form/FormControls/Input";
import FormRow from "../../ui/Form/FormRow";
import {
  USER_FULL_NAME_MIN_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from "../../utils/constants";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

function SignupForm() {
  const { signup, isSignup } = useSignup();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<SignupFormData>();

  function onSubmitForm(formData: SignupFormData) {
    const { fullName, email, password, passwordConfirm } = formData;
    if (!fullName || !email || !password || !passwordConfirm) return;
    if (password !== passwordConfirm) return;

    signup(
      { fullName, email, password },
      {
        onSuccess: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <FormRow
        orientation="responsive"
        mediaWidth={500}
        label="Full name"
        error={errors?.fullName?.message as string | undefined}
      >
        <Input
          type="text"
          id="fullName"
          autoComplete="name"
          disabled={isSignup}
          {...register("fullName", {
            minLength: {
              value: USER_FULL_NAME_MIN_LENGTH,
              message: `Full-name needs a minimum of ${USER_FULL_NAME_MIN_LENGTH} characters`,
            },
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        orientation="responsive"
        mediaWidth={500}
        label="Email address"
        error={errors?.email?.message as string | undefined}
      >
        <Input
          type="email"
          id="email"
          autoComplete="email"
          disabled={isSignup}
          {...register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        orientation="responsive"
        mediaWidth={500}
        label={`Password (min ${USER_PASSWORD_MIN_LENGTH} characters)`}
        error={errors?.password?.message as string | undefined}
      >
        <Input
          type="password"
          id="password"
          autoComplete="new-password"
          disabled={isSignup}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: USER_PASSWORD_MIN_LENGTH,
              message: `Password needs a minimum of ${USER_PASSWORD_MIN_LENGTH} characters`,
            },
          })}
        />
      </FormRow>

      <FormRow
        orientation="responsive"
        mediaWidth={500}
        label="Repeat password"
        error={errors?.passwordConfirm?.message as string | undefined}
      >
        <Input
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          disabled={isSignup}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => reset()}
            disabled={isSignup}
          >
            Cancel
          </Button>
          <Button disabled={isSignup}>Create new user</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
