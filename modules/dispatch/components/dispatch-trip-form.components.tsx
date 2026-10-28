"use client";

import { SharedButton } from "@/modules/shared/components/shared-button.components";
import { SharedSelectField, SharedTextField } from "@/modules/shared/components/shared-form-fields.components";
import { CheckIcon } from "@/modules/shared/components/shared-icons.components";
import type { Driver } from "@/modules/shared/types/shared-driver.types";
import { useDispatchTripForm } from "../hooks/use-dispatch-trip-form.hooks";

type DispatchTripFormProps = {
  availableDrivers: Driver[];
  onTripCreated: (scheduledDateInputValue: string) => void;
};

export function DispatchTripForm({ availableDrivers, onTripCreated }: DispatchTripFormProps) {
  const { formValues, formErrors, confirmationMessage, updateFormField, submitDispatchTripForm } =
    useDispatchTripForm(onTripCreated);

  return (
    <form
      onSubmit={submitDispatchTripForm}
      noValidate
      className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5"
    >
      <div>
        <h2 className="text-lg font-bold">New service</h2>
        <p className="text-sm text-ink-soft">Book a pickup and assign a driver.</p>
      </div>

      <SharedTextField
        label="Client name"
        name="clientName"
        placeholder="Ana Rodríguez"
        value={formValues.clientName}
        onChange={updateFormField}
        errorMessage={formErrors.clientName}
      />
      <SharedTextField
        label="Client phone"
        name="clientPhone"
        type="tel"
        inputMode="tel"
        placeholder="+1 809 555 0123"
        value={formValues.clientPhone}
        onChange={updateFormField}
        errorMessage={formErrors.clientPhone}
      />
      <div className="grid grid-cols-2 gap-3">
        <SharedTextField
          label="Date"
          name="date"
          type="date"
          value={formValues.date}
          onChange={updateFormField}
          errorMessage={formErrors.date}
        />
        <SharedTextField
          label="Time"
          name="time"
          type="time"
          value={formValues.time}
          onChange={updateFormField}
          errorMessage={formErrors.time}
        />
      </div>
      <SharedTextField
        label="Pickup point"
        name="pickupPoint"
        placeholder="Las Américas Airport, Terminal B"
        value={formValues.pickupPoint}
        onChange={updateFormField}
        errorMessage={formErrors.pickupPoint}
      />
      <SharedSelectField label="Driver" name="driverId" value={formValues.driverId} onChange={updateFormField}>
        <option value="">Assign later</option>
        {availableDrivers.map((driver) => (
          <option key={driver.id} value={driver.id}>
            {driver.fullName} — {driver.vehicle.make} {driver.vehicle.model}
          </option>
        ))}
      </SharedSelectField>

      <SharedButton type="submit" variant="accent" size="lg" isFullWidth>
        Create service
      </SharedButton>

      {confirmationMessage ? (
        <p role="status" className="flex items-center gap-2 rounded-xl bg-success-soft px-3 py-2 text-sm font-medium text-success">
          <CheckIcon className="size-4 shrink-0" />
          {confirmationMessage}
        </p>
      ) : null}
    </form>
  );
}
