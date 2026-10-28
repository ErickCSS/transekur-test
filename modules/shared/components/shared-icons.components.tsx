import type { SVGProps } from "react";

type SharedIconProps = SVGProps<SVGSVGElement>;

function SharedIconBase({ children, className = "size-5", ...svgProps }: SharedIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...svgProps}
    >
      {children}
    </svg>
  );
}

export function HeadsetIcon(iconProps: SharedIconProps) {
  return (
    <SharedIconBase {...iconProps}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" />
      <path d="M19 20a3 3 0 0 1-3 2h-3" />
    </SharedIconBase>
  );
}

export function CarIcon(iconProps: SharedIconProps) {
  return (
    <SharedIconBase {...iconProps}>
      <path d="M5 17h14v-5l-2-5H7l-2 5v5Z" />
      <path d="M5 12h14" />
      <circle cx="8" cy="17" r="1.8" />
      <circle cx="16" cy="17" r="1.8" />
    </SharedIconBase>
  );
}

export function PhoneIcon(iconProps: SharedIconProps) {
  return (
    <SharedIconBase {...iconProps}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </SharedIconBase>
  );
}

export function ArrowRightIcon(iconProps: SharedIconProps) {
  return (
    <SharedIconBase {...iconProps}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </SharedIconBase>
  );
}

export function ArrowLeftIcon(iconProps: SharedIconProps) {
  return (
    <SharedIconBase {...iconProps}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </SharedIconBase>
  );
}

export function ClockIcon(iconProps: SharedIconProps) {
  return (
    <SharedIconBase {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </SharedIconBase>
  );
}

export function MapPinIcon(iconProps: SharedIconProps) {
  return (
    <SharedIconBase {...iconProps}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </SharedIconBase>
  );
}

export function CheckIcon(iconProps: SharedIconProps) {
  return (
    <SharedIconBase {...iconProps}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </SharedIconBase>
  );
}

export function MessageIcon(iconProps: SharedIconProps) {
  return (
    <SharedIconBase {...iconProps}>
      <path d="M4 5h16v11H9l-5 4V5Z" />
    </SharedIconBase>
  );
}

export function UserIcon(iconProps: SharedIconProps) {
  return (
    <SharedIconBase {...iconProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </SharedIconBase>
  );
}
