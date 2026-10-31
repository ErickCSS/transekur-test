"use client";

import { LoaderCircleIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SharedButton } from "@/modules/shared/components/shared-button.components";
import { SharedDatePickerField } from "@/modules/shared/components/shared-date-picker-field.components";
import { SharedSelectField, SharedTextField } from "@/modules/shared/components/shared-form-fields.components";
import { CheckIcon, ClockIcon } from "@/modules/shared/components/shared-icons.components";
import { Alert, AlertDescription } from "@/modules/shared/components/ui/alert";
import { Card } from "@/modules/shared/components/ui/card";
import { sharedRevealMotion } from "@/modules/shared/config/shared-motion.config";
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
    todayInputValue,
    timeSlotOptions,
    driverSelectValue,
    driverOptions,
    updateFormField,
    changeDate,
    changeTime,
    changeDriver,
    submitDispatchTripForm,
  } = useDispatchTripForm(availableDrivers, onOptimisticTripCreated);

  return (
    <Card className="px-5">
      <form onSubmit={submitDispatchTripForm} noValidate className="flex flex-col gap-4">
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
          <SharedDatePickerField
            label="Date"
            value={formValues.date}
            onValueChange={changeDate}
            disabledBefore={todayInputValue}
            errorMessage={formErrors.date}
          />
          <SharedSelectField
            label="Time"
            placeholder="Pick a time"
            value={formValues.time}
            onValueChange={changeTime}
            options={timeSlotOptions}
            errorMessage={formErrors.time}
          />
          <SharedTextField
            label="Pickup point"
            name="pickupPoint"
            placeholder="Las Américas Airport, Terminal B"
            value={formValues.pickupPoint}
            onChange={updateFormField}
            errorMessage={formErrors.pickupPoint}
          />
          <SharedSelectField label="Driver" value={driverSelectValue} onValueChange={changeDriver} options={driverOptions} />
        </div>

        <AnimatePresence initial={false}>
          {driverVisibilityHint ? (
            <motion.div key="driver-visibility-hint" {...sharedRevealMotion}>
              <Alert variant="warning" role="note" className="text-xs">
                <ClockIcon />
                <AlertDescription>{driverVisibilityHint}</AlertDescription>
              </Alert>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <SharedButton type="submit" variant="accent" size="lg" isFullWidth disabled={isCreatingTrip}>
          {isCreatingTrip ? <LoaderCircleIcon className="size-5 animate-spin" /> : null}
          {isCreatingTrip ? "Creating…" : "Create service"}
        </SharedButton>

        <AnimatePresence initial={false}>
          {submitErrorMessage ? (
            <motion.div key="submit-error" {...sharedRevealMotion}>
              <Alert variant="destructive">
                <AlertDescription>{submitErrorMessage}</AlertDescription>
              </Alert>
            </motion.div>
          ) : null}

          {confirmation ? (
            <motion.div key="confirmation" {...sharedRevealMotion}>
              <Alert variant="success" role="status">
                <CheckIcon />
                <AlertDescription>
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
                </AlertDescription>
              </Alert>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </form>
    </Card>
  );
}
