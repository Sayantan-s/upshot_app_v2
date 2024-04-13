import { ShotPanel } from '@client/components/pages/shots/manulediting/components/ShotPanel';
import { Toolbar } from '@client/components/pages/shots/manulediting/components/Toolbar';
import { Page } from '@client/components/ui';

export const ManualEdits = () => {
  return (
    <Page>
      <Toolbar />
      <ShotPanel />
    </Page>
  );
};
