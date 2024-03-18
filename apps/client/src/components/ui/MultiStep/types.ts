import { FC, PropsWithChildren } from 'react';

export interface Props<TData, TStepNames> {
  state: TData;
  onSubmit: (data: TData) => void;
  children: React.ReactElement[];
  defaultStep: TStepNames;
  onStepChange?: (state: TData, stepCount: number) => void;
  onChange?: (state: TData) => void;
  defaultStepCount: number;
}

export interface StepProps<TStepNames = string> {
  value: TStepNames;
}

export interface IControls<TStepNames> {
  next: () => void;
  previous: () => void;
  goto: (step: TStepNames) => void;
}

export interface IMultiStepContext<TData, TStepNames>
  extends Pick<Props<TData, TStepNames>, 'state'> {
  handleFormValues: (key: keyof TData, value: TData[keyof TData]) => void;
  controls: IControls<TStepNames>;
  onSubmit: (data: TData) => void;
  onChange?: (state: TData) => void;
}

export interface IControllerHook<TStepNames> {
  children: React.ReactElement[];
  defaultStep: TStepNames;
  defaultCount: number;
  onPrev?: (stepCount: number) => void;
  onNext?: (stepCount: number) => void;
}

export interface IContextDetails {
  contextName: string;
}

export type ReturnType<TData, TStepNames> = [
  FC<PropsWithChildren<Props<TData, TStepNames>>> & {
    Step: FC<PropsWithChildren<StepProps<TStepNames>>>;
  },
  () => HookReturnType<TData, TStepNames>
];

export type HookReturnType<TData, TStepNames> = IMultiStepContext<
  TData,
  TStepNames
>;
