import {
  Children,
  FC,
  PropsWithChildren,
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  HookReturnType,
  IContextDetails,
  IControllerHook,
  IMultiStepContext,
  Props,
  ReturnType,
  StepProps,
} from './types';

export const createMultiStep = <TData, TStepNames = string>({
  contextName,
}: IContextDetails): ReturnType<TData, TStepNames> => {
  if (!contextName.length) throw new Error('Provide a proper context name!');

  const MultiStepContext = createContext<IMultiStepContext<
    TData,
    TStepNames
  > | null>(null);

  const Root: FC<Props<TData, TStepNames>> = ({
    state: formState,
    children,
    defaultStep,
    onSubmit,
    onStepChange,
    onChange,
  }) => {
    const [state, setState] = useState(formState);
    const { component, ...controls } = useController({
      children,
      defaultStep,
      onNext: (step) => onStepChange?.(state, step),
      onPrev: (step) => onStepChange?.(state, step),
    });

    const handleFormValues = (key: keyof TData, value: TData[keyof TData]) =>
      setState((prevState) => ({ ...prevState, [key]: value }));

    return (
      <MultiStepContext.Provider
        value={{
          state,
          handleFormValues,
          controls,
          onSubmit,
          onChange,
        }}
      >
        {component}
      </MultiStepContext.Provider>
    );
  };

  const Step: FC<PropsWithChildren<StepProps<TStepNames>>> = ({ children }) => {
    return <div>{children}</div>;
  };

  const useController = ({
    defaultStep,
    children,
    onPrev,
    onNext,
  }: IControllerHook<TStepNames>) => {
    const [currentStep, setCurrentStep] = useState(defaultStep);
    const [stepCount, setStepCount] = useState(0);
    const [currentStepComponent, setCurrentStepComponent] =
      useState<ReactElement | null>(null);

    const componentStore = useMemo(() => {
      const map: Record<string, TStepNames> = {};
      Children.forEach(children, (child, index) => {
        const props = child.props as StepProps<TStepNames>;
        map[index] = props.value;
      });
      return map;
    }, []);

    useEffect(() => {
      Children.forEach(children, (child) => {
        const props = child.props as StepProps<TStepNames>;
        if (props.value === currentStep) setCurrentStepComponent(child);
      });
    }, [currentStep]);

    const next = () => {
      if (stepCount < Children.count(children)) {
        const stateCount = stepCount + 1;
        setStepCount(stateCount);
        setCurrentStep(componentStore[stateCount]);
        onNext?.(stateCount);
      }
    };

    const previous = () => {
      if (stepCount > 0) {
        const stateCount = stepCount - 1;
        setStepCount(stateCount);
        setCurrentStep(componentStore[stateCount]);
        onPrev?.(stateCount);
      }
    };

    const goto = (step: TStepNames) => {
      const stepValues = Object.values(componentStore);
      const indexOfStep = stepValues.findIndex(
        (stepValue) => stepValue === step
      );
      if (indexOfStep) {
        setStepCount(indexOfStep);
        setCurrentStep(componentStore[indexOfStep]);
      }
    };

    return { component: currentStepComponent, next, previous, goto };
  };

  const MultiStep = Object.assign(Root, { Step });

  const useMultiStep = (): HookReturnType<TData, TStepNames> => {
    const context = useContext(MultiStepContext);
    if (!context) throw new Error(`Context:: ${contextName} is not available!`);
    return context;
  };

  return [MultiStep, useMultiStep];
};
