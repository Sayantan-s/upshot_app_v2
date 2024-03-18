import { Page } from '@client/components/ui';
import { createRef } from 'react';
import { Outlet } from 'react-router';

export const feedRef = createRef<HTMLElement>();

const RootLayout = () => {
  return (
    <Page className="flex max-w-7xl mx-auto overflow-hidden">
      {/* <aside className="flex-[0.3] h-full">
        {componentOnRouteLeft[router.pathname] || <Sidebar />}
      </aside> */}
      {/* <main className="flex-[0.47] px-4 overflow-y-scroll" ref={feedRef}>
        <div className="border-l border-l-slate-100">
          <Outlet />
        </div>
      </main>
      <Trending /> */}
      <Outlet />
    </Page>
  );
};

export default RootLayout;
