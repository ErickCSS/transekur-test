import type { ReactNode } from "react";

type SharedPhoneFrameProps = {
  children: ReactNode;
};

// Full screen on a phone; a centered device frame on wider screens.
export function SharedPhoneFrame({ children }: SharedPhoneFrameProps) {
  return (
    <div className="flex min-h-dvh w-full justify-center sm:items-center sm:py-10">
      <div className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-surface sm:min-h-0 sm:h-[780px] sm:max-w-[390px] sm:rounded-[2.75rem] sm:border-[10px] sm:border-ink sm:shadow-2xl">
        <div className="absolute left-1/2 top-2 hidden h-6 w-28 -translate-x-1/2 rounded-full bg-ink sm:block" />
        {children}
      </div>
    </div>
  );
}
