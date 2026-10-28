"use client";

import { SharedButton } from "@/modules/shared/components/shared-button.components";
import { SharedTextField } from "@/modules/shared/components/shared-form-fields.components";
import { useDriverAuthLoginForm } from "../hooks/use-driver-auth-login-form.hooks";

export function DriverAuthLoginForm() {
  const { loginFormAction, isSigningIn, errorMessage, submittedEmail } = useDriverAuthLoginForm();

  return (
    <form action={loginFormAction} className="flex flex-col gap-4">
      <SharedTextField
        label="Email"
        name="email"
        type="email"
        autoComplete="username"
        inputMode="email"
        placeholder="you@driver.test"
        defaultValue={submittedEmail}
        required
      />
      <SharedTextField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        required
      />
      {errorMessage ? (
        <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      ) : null}
      <SharedButton type="submit" variant="ink" size="lg" isFullWidth disabled={isSigningIn}>
        {isSigningIn ? "Signing in…" : "Sign in"}
      </SharedButton>
    </form>
  );
}
