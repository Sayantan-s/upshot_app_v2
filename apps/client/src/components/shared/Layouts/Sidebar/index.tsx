import { Logo } from '@client/components/shared';
import { Fragment } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Chat } from '../Chat';
import { CurrentInteractions } from './CurrentInteractions';
import { Genre } from './Genre';
import { ProfileCard } from './ProfileCard';
import Searchbar from './Searchbar';

const componentOnRouteLeft: Record<string, JSX.Element> = {
  '/chat': <Chat />,
};

const Root = () => (
  <div className="flex flex-col py-8 h-full relative">
    <div className="flex space-x-3">
      <Logo withName={false} />
      <Searchbar />
    </div>
    <div className="mt-6 space-y-10">
      <ProfileCard />
      <Genre />
      <CurrentInteractions />
    </div>
  </div>
);

export const SidebarLayout = () => {
  const router = useLocation();
  return (
    <Fragment>
      <aside className="flex-[0.3] h-full">
        {componentOnRouteLeft[router.pathname] || <Root />}
      </aside>
      <Outlet />
    </Fragment>
  );
};
