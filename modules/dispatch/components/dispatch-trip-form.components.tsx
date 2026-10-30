"use client";

import { SharedButton } from "@/modules/shared/components/shared-button.components";
import { SharedSelectField, SharedTextField } from "@/modules/shared/components/shared-form-fields.components";
import { CheckIcon, ClockIcon } from "@/modules/shared/components/shared-icons.components";
import type { Driver } from "@/modules/shared/types/shared-driver.types";
import type { Trip } from "@/modules/shared/types/shared-trip.types";
import { useDispatchTripForm } from "../hooks/use-dispatch-trip-form.hooks";

type DispatchTripFormProps = {
  availableDrivers: Driver[];
  onOptimisticTripCreated: (trip: Trip) => void;
  onShowDay: (dateInputValue: string) => void;
};

export function DispatchTripForm({ availableDrivers, onOptimisticTripCreated, onShowDay }: DispatchTripFormProps) {
  const {
    formValues,
    formErrors,
    confirmation,
    driverVisibilityHint,
    submitErrorMessage,
    isCreatingTrip,
    updateFormField,
    submitDispatchTripForm,
  } = useDispatchTripForm(availableDrivers, onOptimisticTripCreated);

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

      {/* Two columns on mid-size screens, where the form sits above the list. */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
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
      </div>

      {driverVisibilityHint ? (
        <p className="flex items-start gap-2 rounded-xl bg-accent/15 px-3 py-2 text-xs font-medium text-ink">
          <ClockIcon className="mt-px size-4 shrink-0 text-accent-strong" />
          {driverVisibilityHint}
        </p>
      ) : null}

      <SharedButton type="submit" variant="accent" size="lg" isFullWidth disabled={isCreatingTrip}>
        {isCreatingTrip ? "Creating…" : "Create service"}
      </SharedButton>

      {submitErrorMessage ? (
        <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {submitErrorMessage}
        </p>
      ) : null}

      {confirmation ? (
        <div role="status" className="flex items-start gap-2 rounded-xl bg-success-soft px-3 py-2 text-sm font-medium text-success">
          <CheckIcon className="mt-0.5 size-4 shrink-0" />
          <p className="flex flex-col items-start gap-1">
            {confirmation.message}
            {confirmation.otherDayInputValue ? (
              <button
                type="button"
                onClick={() => onShowDay(confirmation.otherDayInputValue ?? "")}
                className="font-semibold underline underline-offset-4 hover:text-ink"
              >
                Show that day
              </button>
            ) : null}
          </p>
        </div>
      ) : null}
    </form>
  );
}
