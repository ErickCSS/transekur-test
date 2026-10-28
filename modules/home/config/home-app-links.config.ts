export type HomeAppLinkIcon = "dispatch" | "driver" | "client";

export type HomeAppLink = {
  href: string;
  icon: HomeAppLinkIcon;
  title: string;
  description: string;
  stepLabel: string;
};

export const homeAppLinks: HomeAppLink[] = [
  {
    href: "/dispatch",
    icon: "dispatch",
    title: "Dispatch",
    description: "Create a service, assign a driver and see when the client was notified.",
    stepLabel: "Step 1",
  },
  {
    href: "/driver",
    icon: "driver",
    title: "Driver app",
    description: "Sign in, see today's pickups and tap “10 min away”.",
    stepLabel: "Step 2",
  },
  {
    href: "/client",
    icon: "client",
    title: "Client phone",
    description: "The message the client receives, with driver and vehicle.",
    stepLabel: "Step 3",
  },
];
