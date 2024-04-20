import { Button } from '@client/components/ui';
import { Calendar } from '@client/components/ui/Calendar';
import { Modal } from '@client/components/ui/Modal';
import { convertDateToEpoch } from '@client/helpers/date';
import { useToggle } from '@client/hooks';
import { useDispatch, useSelector } from '@client/store';
import { shotsApi } from '@client/store/services/shot';
import { shotActions } from '@client/store/slices/shots';
import { IDateFormatter, TimeConvention } from '@client/store/types/shot';
import * as Popover from '@radix-ui/react-popover';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { formatDate } from 'date-fns';
import { Clock, Calendar as Datepicker, Share, Timer1 } from 'iconsax-react';
import { ChangeEventHandler, Fragment, useState } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';
import { useParams } from 'react-router-dom';

export const Toolbar = () => {
  const [updateShot, { isLoading }] = shotsApi.useUpdateShotMutation();
  const [scheduleAll, { isLoading: isSchedulingAll }] =
    shotsApi.useScheduleAllMutation();
  const params = useParams();

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
  const [isSaveAllOpen, { on: openSaveAll, off: closeSaveAll }] = useToggle();

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

  const handleUpdateOrAddScheduleTime = async () => {
    const epoch = convertDateToEpoch(selectedDate!, timeConvention, time);
    await updateShot({
      shotId: currentShot!.id,
      shotInput: {
        launchedAt: epoch,
      },
    });
  };

  const handleScheduleAll = async () => {
    await scheduleAll({ productId: params.productId as string });
  };

  return (
    <nav
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-max mx-auto mt-10 z-10 border p-2.5 flex items-center justify-center rounded-xl shadow-md shadow-slate-900/5 bg-white`}
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
            className="w-auto -ml-3 rounded-lg border border-slate-200/70 p-4 bg-white shadow-md shadow-slate-800/5"
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
          className="shadow-md shadow-emerald-700/20 space-x-1 w-[180px]"
          disabled={!currentShot || isLoading}
          isLoading={isLoading}
          onClick={handleUpdateOrAddScheduleTime}
          loaderVersion="v1"
        >
          <Timer1 size={18} color="#ffffff" />
          <span className="text-white">Save schedule time</span>
        </Button>
        <Button
          size={'md'}
          className="shadow-md shadow-emerald-700/20 space-x-1.5"
          disabled={isLoading}
          variant={'neutral.solid'}
          onClick={openSaveAll}
        >
          <Share size={16} color="#ffffff" variant="Bulk" />
          <span className="text-white">Launch All</span>
        </Button>
      </div>
      <Modal show={isSaveAllOpen} onHide={closeSaveAll}>
        <div className="bg-white w-[390px] flex flex-col justify-between shadow-md shadow-slate-600/5 rounded-xl p-5">
          <div className="relative">
            <h1 className="text-base leading-6 font-[700] text-slate-900 flex-[0.9]">
              Are you sure want to schedule all the shots according to their
              schedule time?
            </h1>

            <p className="mt-2 leading-6">
              Once the shots have been scheduled, any changes or reversals will
              necessitate additional credits. Please proceed only after
              confirming your final selections!
            </p>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant={'neutral.ghost'}
              disabled={isLoading || isSchedulingAll}
              size={'md'}
              loaderVersion="v1"
              onClick={closeSaveAll}
            >
              No,leave!
            </Button>
            <Button
              variant={'primary.solid'}
              onClick={handleScheduleAll}
              isLoading={isSchedulingAll}
              rounded={'md'}
              size={'md'}
              loaderVersion="v1"
            >
              Let's do this!
            </Button>
          </div>
        </div>
      </Modal>
    </nav>
  );
};
