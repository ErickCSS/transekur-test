// Radix Select can't use an empty value for an option, so "no driver" has its own value in the selects.
export const unassignedDriverSelectValue = "unassigned";

export function toDriverSelectValue(driverId: string | null) {
  return driverId || unassignedDriverSelectValue;
}

export function fromDriverSelectValue(selectValue: string) {
  return selectValue === unassignedDriverSelectValue ? "" : selectValue;
}
