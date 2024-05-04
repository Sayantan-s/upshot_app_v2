import { Button } from '@client/components/ui';
import { useModal } from '@client/context/ModalSystem';
import { shotsApi } from '@client/store/services/shot';
import { Share } from 'iconsax-react';
import { useParams } from 'react-router-dom';
import { DateTimePicker } from './DateTimePicker';

export const Toolbar = () => {
  const [scheduleAll, { isLoading: isSchedulingAll }] =
    shotsApi.useScheduleAllMutation();
  const params = useParams();
  const modal = useModal({ isLoading: isSchedulingAll });

  const handleOpenSaveAll = () =>
    modal.create({
      variant: 'info',
      heading: `Are you sure want to schedule all the shots according to their
              schedule time?`,
      body: `Once the shots have been scheduled, any changes or reversals will
              necessitate additional credits. Please proceed only after
              confirming your final selections!`,
      confirmationBtnText: `Let's do this!`,
      onConfirm: handleScheduleAll,
    });

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
          onClick={handleOpenSaveAll}
        >
          <Share size={16} color="#ffffff" variant="Bulk" />
          <span className="text-white">Launch All</span>
        </Button>
      </div>
    </nav>
  );
};
