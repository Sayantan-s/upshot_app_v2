import { Button } from '@client/components/ui';
import { useModal } from '@client/context/ModalSystem';
import { useToggle } from '@client/hooks';
import { useDispatch, useSelector } from '@client/store';
import { Tags } from '@client/store/services';
import { shotsApi } from '@client/store/services/shot';
import { ShotStatus } from '@client/store/types/shot';
import * as Popover from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { Archive, Bag, Edit2, Share } from 'iconsax-react';
import { FC } from 'react';
import { toast } from 'sonner';
import { IShotControllerProps } from './type';

export const ShotController: FC<IShotControllerProps> = ({
  allowEdit,
  shotId,
  onSave,
  onEdit,
  isActive,
  characterCount,
}) => {
  const [deleteShot, { isLoading }] = shotsApi.useDeleteShotMutation();
  const [archiveShot, { isLoading: isArchiving }] =
    shotsApi.useUpdateShotMutation();

  const [scheduleOne, { isLoading: isScheduling }] =
    shotsApi.useScheduleOneMutation();
  const [isOpenLaunch, { off: closeLaunch, setState }] = useToggle();
  const dispatch = useDispatch();
  const [
    isOpenLaunchArchive,
    { off: closeArchive, setState: setStateArchive },
  ] = useToggle();

  const deletShotModal = useModal({ isLoading });
  const { shots } = useSelector((state) => state.shots.manualEdits);

  const isArchived = !shots.entities[shotId]?.isArchived;

  const handleDeleteShot = async () => await deleteShot({ shotId });

  const handleCreateDeleteModal = () =>
    deletShotModal.create({
      variant: 'danger',
      heading: 'Delete this shot?',
      body: `<b class="text-rose-500 font-semibold">Action Warning:</b>
                  Once this shot is posted, it cannot be reverted. Please
                  proceed with caution. You will have the option to update the
                  shot before it is finalized.`,
      onConfirm: handleDeleteShot,
    });

  const handleLaunch = async () => {
    if (!shots.entities[shotId]?.launchedAt?.selectedDate) {
      toast.info('Shot Upload', {
        description: `Shot cannot be launched without a launch date!`,
      });
    } else await scheduleOne({ id: shotId }).unwrap();
    closeLaunch();
  };

  const handleArchive = async () => {
    await archiveShot({
      shotId,
      shotInput: {
        isArchived: true,
      },
    }).unwrap();
    dispatch(
      shotsApi.util.invalidateTags([
        {
          id: 'LIST',
          type: Tags.SHOT,
        },
      ])
    );
  };

  return (
    <div className="flex justify-between my-2">
      {characterCount ? (
        <div className="flex items-center px-2 rounded-md">
          <span className="text-xs text-gray-900">{characterCount?.[0]}</span>
          &nbsp;/&nbsp;
          <span className="text-xs">{characterCount?.[1]}</span>
        </div>
      ) : null}
      <div className="flex space-x-2">
        <button
          disabled={!isActive}
          onClick={allowEdit ? onSave : onEdit}
          className="disabled:grayscale bg-white border border-gray-500/20 w-8 h-8 rounded-full flex items-center justify-center"
        >
          <Edit2
            size={16}
            variant="Bulk"
            color={allowEdit ? '#10b981' : '#64748b'}
            className={allowEdit ? 'animate-pulse' : ''}
          />
        </button>
        {shots.entities[shotId]?.status !== ShotStatus.SHOOT ||
        shots.entities[shotId]?.status !== ShotStatus.SHOOT ? (
          <Popover.Root open={isOpenLaunch} onOpenChange={setState}>
            <Popover.Trigger>
              <motion.button
                disabled={!isActive}
                className="disabled:grayscale bg-white border border-emerald-500/20 w-8 h-8 rounded-full flex items-center justify-center"
              >
                <Share size={16} color="#10b981" variant="Bulk" />
              </motion.button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="bg-white border border-gray-200 max-w-[350px] z-40 focus:outline-none shadow shadow-gray-800/10 rounded-xl"
                side="top"
                sticky="always"
                sideOffset={5}
              >
                <div className="p-4">
                  <h1 className="text-gray-900 text-base font-semibold">
                    Are you sure you want to schedule this shot?
                  </h1>
                  <p className="text-sm mt-2">
                    <b className="text-rose-500 font-semibold">
                      Action Warning:
                    </b>{' '}
                    Once this shot is posted, it cannot be reverted. Please
                    proceed with caution. You will have the option to update the
                    shot before it is finalized.
                  </p>
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button
                      size={'sm'}
                      onClick={handleLaunch}
                      isLoading={isScheduling}
                      className="shadow"
                    >
                      Launch
                    </Button>
                    <Button
                      disabled={isScheduling}
                      size={'sm'}
                      variant={'neutral.ghost'}
                      onClick={closeLaunch}
                      className="shadow border border-slate-400/10"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        ) : null}
        <Popover.Root open={isOpenLaunchArchive} onOpenChange={setStateArchive}>
          <Popover.Trigger>
            <motion.button
              disabled={!isActive}
              className="disabled:grayscale border border-sky-500/20 bg-sky-50 w-8 h-8 rounded-full flex items-center justify-center"
            >
              <Archive size={16} color="#0ea5e9" variant="Bulk" />
            </motion.button>
          </Popover.Trigger>
          <Popover.Portal>
            {isArchived ? null : (
              <Popover.Content
                className="bg-white border border-gray-200 max-w-[350px] z-40 focus:outline-none shadow shadow-gray-800/10 rounded-xl"
                sticky="always"
                sideOffset={5}
              >
                <div className="p-4">
                  <h1 className="text-gray-900 text-base font-semibold">
                    Are you sure you want to archive this shot?
                  </h1>
                  <p className="text-sm mt-2">
                    <b className="text-rose-500 font-semibold">
                      Action Warning:
                    </b>{' '}
                    This shot will be archived and subsequently removed from the
                    global feed. Please review the content and take any
                    necessary actions before it is no longer accessible.
                  </p>
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button
                      size={'sm'}
                      onClick={handleArchive}
                      isLoading={isArchiving}
                      className="shadow"
                      variant={'neutral.solid'}
                    >
                      Archive
                    </Button>
                    <Button
                      disabled={isArchiving}
                      size={'sm'}
                      variant={'neutral.ghost'}
                      onClick={closeArchive}
                      className="shadow border border-slate-400/10"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Popover.Content>
            )}
          </Popover.Portal>
        </Popover.Root>

        <motion.button
          disabled={!isActive}
          className="disabled:grayscale bg-rose-50 w-8 h-8 rounded-full flex items-center justify-center"
          onClick={handleCreateDeleteModal}
        >
          <Bag size={16} color="#f43f5d" variant="Bulk" />
        </motion.button>
      </div>
    </div>
  );
};
