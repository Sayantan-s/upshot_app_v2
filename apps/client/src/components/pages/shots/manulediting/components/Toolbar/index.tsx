import { Button } from '@client/components/ui';
import { Modal } from '@client/components/ui/Modal';
import { useToggle } from '@client/hooks';
import { shotsApi } from '@client/store/services/shot';
import { Share } from 'iconsax-react';
import { useParams } from 'react-router-dom';
import { DateTimePicker } from './DateTimePicker';

export const Toolbar = () => {
  const [scheduleAll, { isLoading: isSchedulingAll }] =
    shotsApi.useScheduleAllMutation();
  const params = useParams();

  const [isSaveAllOpen, { on: openSaveAll, off: closeSaveAll }] = useToggle();

  const handleScheduleAll = async () =>
    await scheduleAll({ productId: params.productId as string });

  return (
    <nav
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-max mx-auto mt-10 z-10 border p-2.5 flex items-center justify-center rounded-xl shadow-md shadow-slate-900/5 bg-white`}
    >
      <div className="space-x-3 flex items-center">
        <DateTimePicker />
        <Button
          size={'md'}
          className="shadow-md shadow-emerald-700/20 space-x-1.5"
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
              disabled={isSchedulingAll}
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
