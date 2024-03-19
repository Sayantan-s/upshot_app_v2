import { Page } from '@client/components/ui';
import { createRef } from 'react';
import { Outlet } from 'react-router-dom';

export const feedRef = createRef<HTMLElement>();

const RootLayout = () => {
  return (
    <Page className="flex max-w-7xl mx-auto overflow-hidden">
      <Outlet />
    </Page>
  );
};

export default RootLayout;
