import type { IconType } from "@/components/partials/Icon.vue";
import type { IOption } from "..";

export default interface SelectProps {
  options: IOption[];
  placeholder?: string;
  withNullOption?: boolean;
  icon?: IconType;
}

export type TModel = IOption["value"];
