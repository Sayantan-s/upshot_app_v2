import { Button } from '@client/components/ui';
import { Modal } from '@client/components/ui/Modal';
import { useToggle } from '@client/hooks';
import { shotsApi } from '@client/store/services/shot';
import * as Popover from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { ArchiveTick, Bag, Edit2, Share } from 'iconsax-react';
import { FC, Fragment } from 'react';
import { IShotControllerProps } from './type';

export const ShotController: FC<IShotControllerProps> = ({
  allowEdit,
  shotId,
  onSave,
  onEdit,
  isActive,
}) => {
  const [deleteShot, { isLoading }] = shotsApi.useDeleteShotMutation();
  const [isOpenDeleteShot, { on, off }] = useToggle();
  const [isOpenLaunch, { off: closeLaunch, setState }] = useToggle();

  const handleDeleteShot = async () => {
    await deleteShot({ shotId });
    off();
  };

  return (
    <Fragment>
      <div className="flex justify-end my-2 space-x-2">
        <button
          disabled={!isActive}
          onClick={allowEdit ? onSave : onEdit}
          className="disabled:grayscale bg-white border border-gray-500/20 w-8 h-8 rounded-full flex items-center justify-center"
        >
          {allowEdit ? (
            <ArchiveTick
              size={16}
              variant="Bulk"
              color="#22c55e"
              className="animate-pulse"
            />
          ) : (
            <Edit2 size={16} variant="Bulk" color="#64748b" />
          )}
        </button>
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
              className="bg-white border border-gray-200 max-w-[350px] z-40 focus:outline-none shadow shadow-gray-800/10 rounded-md"
              side="top"
              sticky="always"
              sideOffset={5}
            >
              <div className="p-4">
                <h1 className="text-gray-900 text-base font-semibold">
                  Are you sure you want to schedule this shot?
                </h1>
                <p className="text-sm mt-2">
                  <b className="text-rose-500 font-semibold">Action Warning:</b>{' '}
                  Once this shot is posted, it cannot be reverted. Please
                  proceed with caution. You will have the option to update the
                  shot before it is finalized.
                </p>
                <div className="flex justify-end mt-4">
                  <Button size={'sm'}>Launch</Button>
                  <Button
                    size={'sm'}
                    variant={'neutral.ghost'}
                    onClick={closeLaunch}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        <button
          disabled={!isActive}
          className="disabled:grayscale bg-rose-50 w-8 h-8 rounded-full flex items-center justify-center"
          onClick={on}
        >
          <Bag size={16} color="#f43f5d" variant="Bulk" />
        </button>
      </div>
      <Modal show={isOpenDeleteShot} onHide={off}>
        <div className="bg-white w-[390px] flex flex-col justify-between shadow-md shadow-slate-600/5 rounded-xl p-5">
          <div className="relative">
            <h1 className="text-base leading-6 font-[700] text-slate-900 flex-[0.9]">
              Are you sure want to delete this shot?
            </h1>

            <p className="mt-2 leading-6">
              Once deleted, the content cannot be recovered. Please proceed with
              caution and ensure that you intend to permanently remove this
              shot.
            </p>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant={'neutral.ghost'}
              disabled={isLoading}
              size={'md'}
              onClick={off}
            >
              No,leave!
            </Button>
            <Button
              variant={'danger.solid'}
              onClick={handleDeleteShot}
              isLoading={isLoading}
              rounded={'md'}
              size={'md'}
              loaderVersion="v1"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
