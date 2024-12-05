import { FocusEvent } from "react";
import Form from "../../ui/Form/Form";
import Input from "../../ui/Form/FormControls/Input";
import FormRow from "../../ui/Form/FormRow";
import Spinner from "../../ui/common/loaders/Spinner";
import { SettingsFields, SettingsUpdateType } from "../Types/SettingsTypes";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};

  function handleUpdateSetting(
    e: FocusEvent<HTMLInputElement>,
    newField: SettingsFields
  ) {
    const value = Number(e.target.value);

    if (!value || settings?.[newField] === value) return;

    updateSetting({ [newField]: value } as SettingsUpdateType);
  }

  return (
    <Form aria-live="polite">
      <FormRow
        label="Minimum nights/booking"
        orientation="responsive"
        mediaWidth={500}
      >
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength ?? ""}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        orientation="responsive"
        mediaWidth={500}
      >
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength ?? ""}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        orientation="responsive"
        mediaWidth={500}
      >
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking ?? ""}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow
        label="Breakfast price"
        orientation="responsive"
        mediaWidth={500}
      >
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice ?? ""}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
