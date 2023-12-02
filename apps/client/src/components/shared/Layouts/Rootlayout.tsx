import { Page } from '@client/components/ui';
import { createRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Chat } from './Chat';
import { Sidebar } from './Sidebar';
import Trending from './Trending';

export const feedRef = createRef<HTMLElement>();

const componentOnRouteLeft: Record<string, JSX.Element> = {
  '/chat': <Chat />,
};

const RootLayout = () => {
  const router = useLocation();
  return (
    <Page className="flex max-w-7xl mx-auto overflow-hidden">
      <aside className="flex-[0.3] h-full">
        {componentOnRouteLeft[router.pathname] || <Sidebar />}
      </aside>
      <main className="flex-[0.47] px-4 overflow-y-scroll" ref={feedRef}>
        <div className="border-l border-l-slate-100">
          <Outlet />
        </div>
      </main>
      <Trending />
    </Page>
  );
};

export default RootLayout;
