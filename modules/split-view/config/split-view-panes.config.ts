import { homeAppLinks, type HomeAppLink } from "@/modules/home/config/home-app-links.config";

// Dispatch takes the free width; driver and client are drawn as phones.
export type SplitViewPaneKind = "desktop" | "phone";

export type SplitViewPane = HomeAppLink & {
  kind: SplitViewPaneKind;
};

export const splitViewPanes: SplitViewPane[] = homeAppLinks.map((appLink) => ({
  ...appLink,
  kind: appLink.icon === "dispatch" ? "desktop" : "phone",
}));
