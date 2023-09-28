import { FormEvent, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "./useUser";
import useUpdateUser from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const currentFullName = user?.user_metadata.fullName;
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<FileList | string>("");
  const { isUpdating, updateUser } = useUpdateUser();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { avatar, fullName },
      {
        onSuccess: () => {
          setAvatar("");
          // e.target.reset();//It seems it doesn't work
        },
      },
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar("");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={user?.email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files || "")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          onClick={handleCancel}
          type="reset"
          variation="secondary"
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
