import { FloatingActionButton } from '@client/components/ui/FloatingActionButton';
import { ChemicalGlass, Drop, ElementPlus } from 'iconsax-react';
import { Outlet, useNavigate } from 'react-router';
import { feedRef } from './Rootlayout';

enum FEED_ACTION_TYPES {
  PRODUCT_ONBOARD = 'PRODUCT_ONBOARD',
  CREATE_A_SHOT = 'CREATE_A_SHOT',
}

export const FeedLayout = () => {
  const navigate = useNavigate();

  const handleSelectWhatAction = (value: string) => {
    if (value === FEED_ACTION_TYPES.PRODUCT_ONBOARD)
      navigate('/product/onboard');
  };

  return (
    <main className="flex-[0.47] px-4 overflow-y-auto" ref={feedRef}>
      <div className="border-l border-l-slate-100 h-full">
        <Outlet />
      </div>
      <FloatingActionButton
        onSelect={handleSelectWhatAction}
        className="bg-emerald-500 p-4 rounded-full shadow-md shadow-sky-500/30"
        actionButtonIcon={
          <ElementPlus size="24" variant="Bulk" color="white" />
        }
      >
        <FloatingActionButton.Option
          value={FEED_ACTION_TYPES.PRODUCT_ONBOARD}
          className="bg-orange-500 p-4 rounded-full shadow-md"
          tooltip="Onboard your product"
        >
          <Drop size="24" variant="Bulk" color="rgb(255 247 237)" />
        </FloatingActionButton.Option>
        <FloatingActionButton.Option
          value={FEED_ACTION_TYPES.CREATE_A_SHOT}
          className="bg-white p-4 rounded-full shadow-md text-sky-500"
          tooltip="Create a shot"
        >
          <ChemicalGlass size="24" variant="Bulk" />
        </FloatingActionButton.Option>
      </FloatingActionButton>
    </main>
  );
};
