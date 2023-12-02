import { PropsWithChildren } from "react";

export interface IFloatingActionButtonContext {
  onSelect?: (value: string) => void;
  off: () => void;
}

export interface Props
  extends PropsWithChildren<Pick<IFloatingActionButtonContext, "onSelect">> {
  actionButtonIcon: JSX.Element;
  className?: string;
  open?: boolean;
}

export interface FloatingButtonOptions {
  value: string;
  children: JSX.Element;
  className?: string;
  tooltip?: string;
}
