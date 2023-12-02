export interface IExtendable {
  displayValue: string;
  value: string;
}

export interface Props<TData extends IExtendable> {
  input: JSX.Element;
  value: TData[];
  options: TData[];
  children: (item: TData) => JSX.Element;
  onChange?: (string: TData[]) => void;
  renderTag: (
    data: TData,
    handleDelete: (value: string) => void
  ) => JSX.Element;
}

export interface OptionProps {
  value: string;
}

export interface SelectionContextProps<TData> {
  handleOff: () => void;
  options: TData[];
  setSelectedValues: React.Dispatch<React.SetStateAction<TData[]>>;
  selectedValues: TData[];
  onChange?: (string: TData[]) => void;
  resetInput: () => void;
  resetListBoxFilters: () => void;
}
