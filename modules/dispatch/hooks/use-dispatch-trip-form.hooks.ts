"use client";

import { useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import type { Driver } from "@/modules/shared/types/shared-driver.types";
import { combineDateAndTimeInputs, toDateInputValue } from "@/modules/shared/utils/shared-date-format.utils";
import { keepOnlyPhoneDigits } from "@/modules/shared/utils/shared-phone-format.utils";
import { createDispatchTripAction } from "../actions/dispatch-trips.actions";
import type { DispatchTripFormErrors, DispatchTripFormValues } from "../types/dispatch.types";

function buildEmptyDispatchTripFormValues(): DispatchTripFormValues {
  return { clientName: "", clientPhone: "", date: toDateInputValue(new Date()), time: "", pickupPoint: "", driverId: "" };
}

function validateDispatchTripForm(formValues: DispatchTripFormValues): DispatchTripFormErrors {
  const formErrors: DispatchTripFormErrors = {};
  if (!formValues.clientName.trim()) formErrors.clientName = "Client name is required.";
  if (keepOnlyPhoneDigits(formValues.clientPhone).length < 10) formErrors.clientPhone = "Enter a phone with country code.";
  if (!formValues.date) formErrors.date = "Pick a date.";
  if (!formValues.time) formErrors.time = "Pick a time.";
  if (!formValues.pickupPoint.trim()) formErrors.pickupPoint = "Pickup point is required.";
  return formErrors;
}

export function useDispatchTripForm(
  availableDrivers: Driver[],
  onTripCreated: (scheduledDateInputValue: string) => void,
) {
  const [formValues, setFormValues] = useState(buildEmptyDispatchTripFormValues);
  const [formErrors, setFormErrors] = useState<DispatchTripFormErrors>({});
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);
  const [isCreatingTrip, startCreatingTrip] = useTransition();

  function updateFormField(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }));
    setFormErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }));
    setConfirmationMessage(null);
    setSubmitErrorMessage(null);
  }

  function submitDispatchTripForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateDispatchTripForm(formValues);
    setFormErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    startCreatingTrip(async () => {
      const { errorMessage } = await createDispatchTripAction({
        clientName: formValues.clientName.trim(),
        clientPhone: keepOnlyPhoneDigits(formValues.clientPhone),
        pickupPoint: formValues.pickupPoint.trim(),
        scheduledAt: combineDateAndTimeInputs(formValues.date, formValues.time),
        driverId: formValues.driverId || null,
      });
      if (errorMessage) {
        setSubmitErrorMessage(errorMessage);
        return;
      }

      const assignedDriver = availableDrivers.find((driver) => driver.id === formValues.driverId);
      setConfirmationMessage(
        assignedDriver
          ? `Service created and assigned to ${assignedDriver.fullName}.`
          : "Service created. Assign a driver from the list.",
      );
      onTripCreated(formValues.date);
      setFormValues({ ...buildEmptyDispatchTripFormValues(), date: formValues.date });
    });
  }

  return {
    formValues,
    formErrors,
    confirmationMessage,
    submitErrorMessage,
    isCreatingTrip,
    updateFormField,
    submitDispatchTripForm,
  };
}
