import { Button } from '@client/components/ui';
import { Calendar } from '@client/components/ui/Calendar';
import { convertDateToEpoch, convertEpochToDate } from '@client/helpers/date';
import { useToggle } from '@client/hooks';
import { useSelector } from '@client/store';
import { shotsApi } from '@client/store/services/shot';
import { shotActions } from '@client/store/slices/shots';
import * as Popover from '@radix-ui/react-popover';
import {
  addHours,
  addMinutes,
  formatDate,
  setHours,
  setMinutes,
} from 'date-fns';
import { Calendar as Datepicker, Timer1 } from 'iconsax-react';
import { ChangeEventHandler, FC, Fragment, useEffect, useState } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';
import { useDispatch } from 'react-redux';

interface IState {
  selectedDate?: Date;
  hours: string;
  mins: string;
}

export const DateTimePicker: FC = () => {
  const { shots, currentlyEditing } = useSelector(
    (state) => state.shots.manualEdits
  );
  const currentShot = shots.entities[currentlyEditing];
  const [updateShot, { isLoading }] = shotsApi.useUpdateShotMutation();

  const [dateTime, setDate] = useState<IState>({
    selectedDate: undefined,
    hours: '',
    mins: '',
  });

  const [currentAction, setCurrentAction] = useState<'CLEAR' | 'UPDATE' | null>(
    null
  );

  const { selectedDate, hours, mins } = dateTime;

  const [finalDate, setFinalDate] = useState<Date | null>(null);

  const dispatch = useDispatch();

  const [isOpen, { off, setState }] = useToggle();

  const handleSelectDate: SelectSingleEventHandler = (dateData) => {
    setDate((prevState) => ({ ...prevState, selectedDate: dateData }));
    if (dateData) handleChangeFinalTime('selectedDate', dateData);
  };

  const handleChangeFinalTime = (
    key: keyof typeof dateTime,
    value: number | Date
  ) => {
    let date = structuredClone(selectedDate!);
    if (key === 'selectedDate') {
      const currentdate = value as Date;
      const newDateWHours = addHours(currentdate, Number(hours));
      date = addMinutes(newDateWHours, Number(mins));
    }
    if (key === 'hours') date = setHours(finalDate!, Number(value));
    if (key === 'mins') date = setMinutes(finalDate!, Number(value));
    setFinalDate(date);
  };

  const handleChangeTime: ChangeEventHandler<HTMLInputElement> = (eve) => {
    const { name, value } = eve.target;
    const integerValue = Number(value);
    if (name === 'hours' && integerValue >= 0 && integerValue <= 23) {
      setDate((prevState) => ({ ...prevState, hours: value }));
      handleChangeFinalTime('hours', integerValue);
    }
    if (name === 'mins' && integerValue >= 0 && integerValue <= 59) {
      setDate((prevState) => ({ ...prevState, mins: value }));
      handleChangeFinalTime('mins', integerValue);
    }
  };

  const handleApplyDateTime = async () => {
    setCurrentAction('UPDATE');
    const epoch = convertDateToEpoch(finalDate!);
    const { selectedDate, ...rest } = convertEpochToDate(epoch);
    await updateShot({
      shotId: currentShot!.id,
      shotInput: {
        launchedAt: epoch,
      },
    });
    dispatch(shotActions.updateLaunchDate({ date: selectedDate!, ...rest }));
    off();
  };

  const handleClear = async () => {
    setCurrentAction('CLEAR');
    await updateShot({
      shotId: currentShot!.id,
      shotInput: {
        launchedAt: null,
      },
    });
    dispatch(
      shotActions.updateLaunchDate({ date: undefined, hours: '', mins: '' })
    );
  };

  useEffect(() => {
    if (currentShot) {
      setDate(currentShot.launchedAt!);
      setFinalDate(
        currentShot.launchedAt?.selectedDate
          ? new Date(currentShot.launchedAt.selectedDate)
          : null
      );
    }
  }, [currentShot]);

  return (
    <Popover.Root open={isOpen} onOpenChange={setState}>
      <Popover.Trigger asChild>
        <button
          className="disabled:opacity-50 flex rounded-md stroke-slate-500 items-center justify-between border shadow-sm w-72 py-2.5 px-3"
          disabled={!currentShot}
        >
          <span className={finalDate ? 'text-gray-600' : ''}>
            {finalDate ? (
              <Fragment>
                {formatDate(finalDate, 'do MMMM yyyy')}
                <span className="bg-emerald-50 text-[0.65rem] text-emerald-500 ml-2 px-3 rounded-full py-1 border border-emerald-500/20">
                  {formatDate(finalDate, 'ccc')}
                </span>
                <span className="ml-2 text-xs text-gray-300 font-semibold">
                  {formatDate(finalDate, 'hh : mm aa')}
                </span>
              </Fragment>
            ) : (
              'Pick a date'
            )}
          </span>
          <Datepicker size={16} color={selectedDate ? '#10b981' : '#64748b'} />
        </button>
      </Popover.Trigger>
      <Popover.Content
        className="w-auto -ml-3 rounded-lg border border-slate-200/70 bg-white shadow-md shadow-slate-800/5"
        side="bottom"
        sideOffset={8}
        align="start"
      >
        <div className="flex space-x-4">
          <div>
            <Calendar
              className="px-3 pt-3"
              mode="single"
              today={new Date()}
              selected={selectedDate}
              onSelect={handleSelectDate}
              fixedWeeks
              initialFocus
              disabled={{ before: new Date() }}
            />
            <div className="flex justify-between mt-2 border-t p-3">
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="flex items-center space-x-1">
                    <Timer1 size={14} color="#1f2937" />
                    <span className="text-sm font-bold text-gray-700">
                      Shot time
                    </span>
                  </h1>
                  <p className="text-xs mt-0.5">
                    Choose based on 24 hour clock
                  </p>
                </div>
                <p className="text-xs w-max text-emerald-600 font-bold mt-2">
                  {finalDate
                    ? formatDate(finalDate, 'do MMMM, yyyy, hh : mm aa')
                    : 'Add Your selected date!'}
                </p>
              </div>
              <div className="space-x-3">
                <input
                  disabled={!selectedDate || isLoading}
                  type="number"
                  placeholder="00"
                  className="disabled:opacity-60 w-[4.4rem] aspect-square text-2xl text-center text-emerald-500 placeholder:text-emerald-500/50 bg-emerald-50 focus:outline-none border border-emerald-200 rounded-lg"
                  value={hours}
                  name="hours"
                  onChange={handleChangeTime}
                  min={'00'}
                  max="23"
                />
                <input
                  disabled={!selectedDate || isLoading}
                  type="number"
                  placeholder="00"
                  className="disabled:opacity-60 w-[4.4rem] aspect-square text-2xl text-center text-slate-600 focus:outline-none border border-slate-200 rounded-lg"
                  value={mins}
                  name="mins"
                  onChange={handleChangeTime}
                  min={'00'}
                  max="59"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-2.5 border-t broder-gray-100 bg-gray-200/40 space-x-2 flex justify-end rounded-md">
          <Button
            disabled={isLoading && currentAction === 'UPDATE'}
            isLoading={isLoading && currentAction === 'CLEAR'}
            variant={'neutral.outline'}
            className="bg-white border border-gray-300/50"
            size={'sm'}
            loaderVersion="v1"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            size={'sm'}
            disabled={isLoading && currentAction === 'CLEAR'}
            isLoading={isLoading && currentAction === 'UPDATE'}
            loaderVersion="v1"
            onClick={handleApplyDateTime}
          >
            Save
          </Button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};
