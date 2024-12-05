import { FormEventHandler, useState } from "react";
import Button from "../../ui/Buttons/Button";
import SpinnerMini from "../../ui/common/loaders/SpinnerMini";
import Form from "../../ui/Form/Form";
import Input from "../../ui/Form/FormControls/Input";
import FormRow from "../../ui/Form/FormRow";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState<string>("salem@test.com");
  const [password, setPassword] = useState<string>("12345678");
  const { login, isLoading } = useLogin();

  const handleSubmit: FormEventHandler<HTMLFormElement> = function (e) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow orientation="vertical" label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow orientation="vertical" label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
