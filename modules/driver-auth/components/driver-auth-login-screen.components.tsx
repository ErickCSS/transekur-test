import Link from "next/link";
import { ArrowLeftIcon, CarIcon } from "@/modules/shared/components/shared-icons.components";
import { SharedPhoneFrame } from "@/modules/shared/components/shared-phone-frame.components";
import { DriverAuthLoginForm } from "./driver-auth-login-form.components";

export function DriverAuthLoginScreen() {
  return (
    <SharedPhoneFrame>
      <div className="flex flex-1 flex-col px-6 pb-8 pt-12">
        <Link href="/" className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-ink-soft">
          <ArrowLeftIcon className="size-4" />
          All apps
        </Link>

        <div className="mt-14 flex flex-col gap-3">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-accent text-ink">
            <CarIcon className="size-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Driver sign in</h1>
          <p className="text-sm text-ink-soft">See today&apos;s pickups and let clients know you&apos;re close.</p>
        </div>

        <div className="mt-10">
          <DriverAuthLoginForm />
        </div>

        <p className="mt-auto pt-8 text-center text-xs text-ink-soft">
          Demo accounts are listed in the project README.
        </p>
      </div>
    </SharedPhoneFrame>
  );
}
