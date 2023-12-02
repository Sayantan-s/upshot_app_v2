import { useClickOutside, useToggle } from '@client/hooks';
import {
  FC,
  PropsWithChildren,
  cloneElement,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import {
  IExtendable,
  OptionProps,
  Props,
  SelectionContextProps,
} from './types';

export const ListBoxInit = <TData extends IExtendable>() => {
  const SelectionContext = createContext<SelectionContextProps<TData> | null>(
    null
  );

  const Root = ({
    input,
    children,
    value,
    options,
    onChange,
    renderTag,
  }: Props<TData>) => {
    const [showListboxList, { on, off }] = useToggle();
    const [selectedValues, setSelectedValues] = useState<TData[]>(value);
    const [listBoxOptions, setListBoxOptions] = useState(options);
    const [inputValue, setInputValue] = useState('');
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, off);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (eve) => {
      const value = eve.target.value;
      setInputValue(value);
      if (value.trim() !== '' && value.length > 2)
        setListBoxOptions((prevState) =>
          prevState.filter((option) =>
            option.displayValue.startsWith(eve.target.value)
          )
        );
      else resetListBoxFilters();
    };

    const resetInput = () => setInputValue('');
    const resetListBoxFilters = () => setListBoxOptions(options);

    const handleDeleteTag = (value: string) =>
      setSelectedValues((prevState) =>
        prevState.filter((option) => option.value !== value)
      );

    return (
      <div role="listbox " className="relative" ref={ref}>
        <div className="flex gap-2 flex-wrap">
          {selectedValues.map((tag) => renderTag(tag, handleDeleteTag))}
        </div>
        <div className="mt-2">
          {cloneElement(input, {
            value: inputValue,
            onFocus: on,
            onChange: handleChange,
          })}
        </div>
        <SelectionContext.Provider
          value={{
            handleOff: off,
            options,
            setSelectedValues,
            selectedValues,
            onChange,
            resetInput,
            resetListBoxFilters,
          }}
        >
          {showListboxList && listBoxOptions.length ? (
            <div className="shadow-xl shadow-gray-600/5 border bg-white absolute w-full max-h-64 overflow-y-scroll rounded-lg">
              <div className="overflow-hidden">
                {listBoxOptions.map((option) => children(option))}
              </div>
            </div>
          ) : null}
        </SelectionContext.Provider>
      </div>
    );
  };

  const Option: FC<PropsWithChildren<OptionProps>> = ({ children, value }) => {
    const context = useContext(SelectionContext);

    const handleSelect = () => {
      const option = context?.options.find(
        (selectionOption) => selectionOption.value === value
      );
      if (
        option &&
        !context?.selectedValues.find((selected) => selected.value === value)
      ) {
        context?.setSelectedValues((prevState) => [...prevState, option]);
        context?.onChange?.([...context.selectedValues, option]);
        context?.resetInput();
        context?.resetListBoxFilters();
      }
      context?.handleOff();
    };

    return (
      <div
        role="button"
        className="p-4 hover:bg-emerald-50 hover:text-emerald-500 font-semibold"
        onClick={handleSelect}
      >
        {children}
      </div>
    );
  };

  return Object.assign(Root, { Option });
};
