import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/common/components/Heading";

function Settings() {
  return (
    <>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </>
  );
}

export default Settings;
