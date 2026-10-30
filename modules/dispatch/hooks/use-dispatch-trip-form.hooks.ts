"use client";

import { useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import type { Driver } from "@/modules/shared/types/shared-driver.types";
import type { Trip } from "@/modules/shared/types/shared-trip.types";
import {
  combineDateAndTimeInputs,
  formatLongDateFromInputValue,
  getNextDateInputValue,
  toDateInputValue,
} from "@/modules/shared/utils/shared-date-format.utils";
import { keepOnlyPhoneDigits } from "@/modules/shared/utils/shared-phone-format.utils";
import { createDispatchTripAction } from "../actions/dispatch-trips.actions";
import type { DispatchTripConfirmation, DispatchTripFormErrors, DispatchTripFormValues } from "../types/dispatch.types";
import { buildOptimisticTrip } from "../utils/dispatch-optimistic-trips.utils";

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

// Drivers see today's and tomorrow's services; the 10-minute notice only works on the day.
function buildDriverVisibilityHint(dateInputValue: string) {
  const todayInputValue = toDateInputValue(new Date());
  if (!dateInputValue || dateInputValue === todayInputValue) return null;
  if (dateInputValue === getNextDateInputValue(todayInputValue)) {
    return "The driver sees it under Tomorrow and notifies the client on the day.";
  }
  return "Drivers see a service the day before, and notify the client on the day.";
}

function buildTripConfirmation(dateInputValue: string, assignedDriver: Driver | undefined): DispatchTripConfirmation {
  const todayInputValue = toDateInputValue(new Date());
  if (dateInputValue === todayInputValue) {
    return {
      message: assignedDriver
        ? `Service created and assigned to ${assignedDriver.fullName}. It's in their app now.`
        : "Service created. Assign a driver from the list.",
      otherDayInputValue: null,
    };
  }

  const dayLabel = formatLongDateFromInputValue(dateInputValue);
  const isTomorrow = dateInputValue === getNextDateInputValue(todayInputValue);
  const visibility = isTomorrow
    ? `${assignedDriver ? assignedDriver.fullName : "The driver"} sees it under Tomorrow in their app.`
    : "Drivers see it the day before.";
  return { message: `Service created for ${dayLabel}. ${visibility}`, otherDayInputValue: dateInputValue };
}

export function useDispatchTripForm(availableDrivers: Driver[], onOptimisticTripCreated: (trip: Trip) => void) {
  const [formValues, setFormValues] = useState(buildEmptyDispatchTripFormValues);
  const [formErrors, setFormErrors] = useState<DispatchTripFormErrors>({});
  const [confirmation, setConfirmation] = useState<DispatchTripConfirmation | null>(null);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);
  const [isCreatingTrip, startCreatingTrip] = useTransition();

  function updateFormField(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }));
    setFormErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }));
    setConfirmation(null);
    setSubmitErrorMessage(null);
  }

  function submitDispatchTripForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateDispatchTripForm(formValues);
    setFormErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const submittedValues = formValues;
    const newTrip = {
      clientName: submittedValues.clientName.trim(),
      clientPhone: keepOnlyPhoneDigits(submittedValues.clientPhone),
      pickupPoint: submittedValues.pickupPoint.trim(),
      scheduledAt: combineDateAndTimeInputs(submittedValues.date, submittedValues.time),
      driverId: submittedValues.driverId || null,
    };

    // The board stays on the day being viewed; the new row shows up at once if it belongs there.
    setConfirmation(null);
    setSubmitErrorMessage(null);
    setFormValues({ ...buildEmptyDispatchTripFormValues(), date: submittedValues.date });
    startCreatingTrip(async () => {
      onOptimisticTripCreated(buildOptimisticTrip(newTrip));
      const { errorMessage } = await createDispatchTripAction(newTrip);
      if (errorMessage) {
        setFormValues(submittedValues);
        setSubmitErrorMessage(errorMessage);
        return;
      }

      const assignedDriver = availableDrivers.find((driver) => driver.id === submittedValues.driverId);
      setConfirmation(buildTripConfirmation(submittedValues.date, assignedDriver));
    });
  }

  return {
    formValues,
    formErrors,
    confirmation,
    driverVisibilityHint: buildDriverVisibilityHint(formValues.date),
    submitErrorMessage,
    isCreatingTrip,
    updateFormField,
    submitDispatchTripForm,
  };
}
