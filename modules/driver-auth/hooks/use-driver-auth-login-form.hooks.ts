"use client";

import { useActionState } from "react";
import { loginDriverWithEmail } from "../actions/driver-auth.actions";
import type { DriverAuthLoginFormState } from "../types/driver-auth.types";

const initialDriverAuthLoginFormState: DriverAuthLoginFormState = {
  errorMessage: null,
  submittedEmail: "",
};

export function useDriverAuthLoginForm() {
  const [loginFormState, loginFormAction, isSigningIn] = useActionState(
    loginDriverWithEmail,
    initialDriverAuthLoginFormState,
  );

  return {
    loginFormAction,
    isSigningIn,
    errorMessage: loginFormState.errorMessage,
    submittedEmail: loginFormState.submittedEmail,
  };
}
