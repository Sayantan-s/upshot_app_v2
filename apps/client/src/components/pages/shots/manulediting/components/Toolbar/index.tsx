import { Button } from '@client/components/ui';
import { Calendar } from '@client/components/ui/Calendar';
import { convertDateToEpoch } from '@client/helpers/date';
import { useToggle } from '@client/hooks';
import { useDispatch, useSelector } from '@client/store';
import { shotsApi } from '@client/store/services/shot';
import { shotActions } from '@client/store/slices/shots';
import { IDateFormatter, TimeConvention } from '@client/store/types/shot';
import * as Popover from '@radix-ui/react-popover';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { formatDate } from 'date-fns';
import { Clock, Calendar as Datepicker } from 'iconsax-react';
import { ChangeEventHandler, Fragment, useState } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';

export const Toolbar = () => {
  const [updateShot, { isLoading }] = shotsApi.useUpdateShotMutation();
  const { shots, currentlyEditing } = useSelector(
    (state) => state.shots.manualEdits
  );
  const currentShot = shots.entities[currentlyEditing];

  const { timeConvention, selectedDate, ...time } = (() => {
    if (currentShot?.launchedAt) return currentShot.launchedAt;
    return {
      hours: '',
      mins: '',
      timeConvention: TimeConvention.AM,
      selectedDate: undefined,
    };
  })();

  const dispatch = useDispatch();

  const [isApplied, setIsApplied] = useState(false);

  const [isOpen, { off, toggle }] = useToggle();
  const [isOpenTimePicker, { toggle: toggleTimePicker, off: offTimePicker }] =
    useToggle();

  const handleSelectDate: SelectSingleEventHandler = (dateData) =>
    dateData &&
    dispatch(
      shotActions.updateLaunchDate({
        timeConvention,
        date: dateData,
        hours: time.hours,
        mins: time.hours,
      })
    );

  const handleApplyDate = () => {
    off();
    setIsApplied(true);
    handleSetEpoch();
  };

  const handleOpenChange = () => {
    !isApplied && handleSetEpoch();
    toggle();
  };

  const handleOpenChangeTimePicker = () => {
    toggleTimePicker();
  };

  const handleChangeTimeConvention = (value: string) => {
    const dateFormatter: IDateFormatter = {
      timeConvention: value as TimeConvention,
      date: selectedDate!,
      mins: time.mins,
      hours: time.hours,
    };
    dispatch(shotActions.updateLaunchDate(dateFormatter));
  };

  const handleChangeTime: ChangeEventHandler<HTMLInputElement> = (eve) => {
    const { name, value } = eve.target;
    const dateFormatter: IDateFormatter = {
      timeConvention,
      date: selectedDate!,
      mins: name === 'mins' ? value || '00' : time.mins,
      hours: name === 'hours' ? value || '00' : time.hours,
    };
    dispatch(shotActions.updateLaunchDate(dateFormatter));
  };

  const handleApplyTime = () => {
    offTimePicker();
    handleSetEpoch();
  };

  const handleSetEpoch = () => {
    if (timeConvention && time.hours && time.mins && selectedDate)
      dispatch(
        shotActions.updateLaunchDate({
          timeConvention,
          date: selectedDate,
          hours: time.hours,
          mins: time.mins,
        })
      );
  };

  const handleUpdateShot = async () => {
    const epoch = convertDateToEpoch(selectedDate!, timeConvention, time);
    await updateShot({
      shotId: currentShot!.id,
      shotInput: {
        launchedAt: epoch,
      },
    });
  };

  return (
    <nav
      className={`sticky top-0 w-max mx-auto mt-10 z-50 border p-2.5 flex items-center justify-center rounded-xl shadow-md shadow-slate-900/5 bg-white`}
    >
      <div className="space-x-3 flex items-center">
        <Popover.Root open={isOpen} onOpenChange={handleOpenChange}>
          <Popover.Trigger asChild>
            <button
              className="disabled:opacity-50 flex rounded-md stroke-slate-500 items-center justify-between border shadow-sm w-64 py-2.5 px-3"
              disabled={!currentShot}
            >
              <span className={selectedDate ? 'text-gray-600' : ''}>
                {selectedDate ? (
                  <Fragment>
                    {formatDate(selectedDate, 'do MMMM yyyy')}
                    <span className="bg-emerald-50 text-[0.65rem] text-emerald-500 ml-2 px-3 rounded-full py-1 border border-emerald-500/20">
                      {formatDate(selectedDate, 'ccc')}
                    </span>
                  </Fragment>
                ) : (
                  'Pick a date'
                )}
              </span>
              <Datepicker
                size={16}
                color={selectedDate ? '#10b981' : '#64748b'}
              />
            </button>
          </Popover.Trigger>
          <Popover.Content
            className="w-auto rounded-lg border border-slate-200/70 p-4 bg-white shadow-md shadow-slate-800/5"
            side="bottom"
            sideOffset={5}
            align="start"
          >
            <Calendar
              mode="single"
              today={new Date()}
              selected={selectedDate}
              onSelect={handleSelectDate}
              fixedWeeks
              initialFocus
              disabled={{ before: new Date() }}
            />
            <div className="mt-6 p-2 space-x-2 flex justify-end rounded-md">
              <Button
                variant={'neutral.outline'}
                size={'sm'}
                onClick={handleOpenChange}
              >
                Cancel
              </Button>
              <Button size={'sm'} onClick={handleApplyDate}>
                Apply
              </Button>
            </div>
          </Popover.Content>
        </Popover.Root>
        <Popover.Root
          open={isOpenTimePicker}
          onOpenChange={handleOpenChangeTimePicker}
        >
          <Popover.Trigger asChild>
            <button
              disabled={!currentShot || !selectedDate}
              className="disabled:opacity-50 flex rounded-md stroke-slate-500 items-center justify-between border shadow-sm w-52 px-3 py-2.5"
            >
              <span
                className={
                  time.hours && time.mins && timeConvention
                    ? 'text-gray-600'
                    : ''
                }
              >
                {timeConvention && time.hours && time.mins
                  ? `${time.hours}:${time.mins} ${timeConvention}`
                  : 'Pick a slot'}
              </span>
              <Clock
                size={16}
                color={
                  time.hours && time.mins && timeConvention
                    ? '#10b981'
                    : '#64748b'
                }
              />
            </button>
          </Popover.Trigger>
          <Popover.Content
            className="-ml-3 rounded-lg border border-slate-200/70 p-4 bg-white shadow-md shadow-slate-800/5 w-72"
            side="bottom"
            sideOffset={5}
            align="start"
          >
            <div className="flex space-x-1">
              <input
                type="number"
                placeholder="00"
                className="w-1/2 aspect-square text-5xl text-center text-emerald-500 placeholder:text-emerald-500/50 bg-emerald-50 focus:outline-none border border-transparent focus:border-emerald-100 rounded-lg"
                value={time.hours}
                name="hours"
                onChange={handleChangeTime}
              />
              <span>:</span>
              <input
                type="number"
                placeholder="00"
                className="w-1/2 aspect-square text-5xl text-center text-slate-600 focus:outline-none border border-transparent focus:border-slate-200 rounded-lg"
                value={time.mins}
                name="mins"
                onChange={handleChangeTime}
              />
            </div>
            <div>
              <ToggleGroup.Root
                type="single"
                value={timeConvention}
                className="w-full mt-3 flex border overflow-hidden rounded-lg"
                onValueChange={handleChangeTimeConvention}
              >
                <ToggleGroup.Item
                  value={TimeConvention.AM}
                  className={`flex-1 p-2 font-semibold ${
                    timeConvention === TimeConvention.AM
                      ? 'bg-slate-900 text-slate-50'
                      : ''
                  }`}
                >
                  AM
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value={TimeConvention.PM}
                  className={`flex-1 p-2 font-semibold ${
                    timeConvention === TimeConvention.PM
                      ? 'bg-slate-900 text-slate-50'
                      : ''
                  }`}
                >
                  PM
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="mt-6 flex items-center justify-end space-x-1.5">
              <Button
                variant={'neutral.outline'}
                size={'sm'}
                onClick={offTimePicker}
              >
                Cancel
              </Button>
              <Button size={'sm'} onClick={handleApplyTime}>
                Apply
              </Button>
            </div>
          </Popover.Content>
        </Popover.Root>
        <Button
          size={'md'}
          className="shadow-md shadow-emerald-700/20"
          disabled={!currentShot || isLoading}
          isLoading={isLoading}
          onClick={handleUpdateShot}
        >
          Save schedule time
        </Button>
      </div>
    </nav>
  );
};
