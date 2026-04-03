import { defaultFeatureFlags } from "../config/features";

export function isListsEnabled(): boolean {
  const stored = localStorage.getItem("dev.listsEnabled");

  if (stored === null) {
    return defaultFeatureFlags.listsEnabled;
  }

  return stored === "true";
}