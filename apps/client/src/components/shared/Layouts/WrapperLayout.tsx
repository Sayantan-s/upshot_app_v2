import { Outlet } from 'react-router';
import { feedRef } from './Rootlayout';

export const FeedLayout = () => {
  return (
    <main className="flex-[0.47] px-4 overflow-y-scroll" ref={feedRef}>
      <div className="border-l border-l-slate-100">
        <Outlet />
      </div>
    </main>
  );
};
