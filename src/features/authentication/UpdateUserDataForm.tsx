import { FormEventHandler, useState } from "react";

import Button from "../../ui/Buttons/Button";
import FileInput from "../../ui/Form/FormControls/FileInput";
import Form from "../../ui/Form/Form";
import FormRow from "../../ui/Form/FormRow";
import Input from "../../ui/Form/FormControls/Input";

import { useUser } from "./useUser";
import Spinner from "../../ui/common/loaders/Spinner";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const [fullName, setFullName] = useState<string>(
    user?.user_metadata.fullName || ""
  );
  const [avatar, setAvatar] = useState<File | null>(null);

  if (isLoading || !user) return <Spinner />;

  const handleSubmit: FormEventHandler<HTMLFormElement> = function (e) {
    e.preventDefault();
    if (!fullName) return;

    updateUser(
      { fullName, avatar: avatar || undefined },
      {
        onSuccess: () => {
          setAvatar(null);
          (e.target as HTMLFormElement).reset();
        },
      }
    );
  };

  function handleCancel() {
    setFullName(user?.user_metadata.fullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="responsive" mediaWidth={500}>
        <Input value={user.email || ""} disabled />
      </FormRow>
      <FormRow label="Full name" orientation="responsive" mediaWidth={500}>
        <Input
          type="text"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image" orientation="responsive" mediaWidth={500}>
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
        />
      </FormRow>
      <FormRow>
        <>
          <Button
            type="reset"
            variation="secondary"
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
