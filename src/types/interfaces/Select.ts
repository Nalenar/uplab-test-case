import type { IOption, TIcon } from "..";

export default interface SelectProps {
  options: IOption[];
  placeholder?: string;
  withNullOption?: boolean;
  icon?: TIcon;
}

export type TModel = IOption["value"];
