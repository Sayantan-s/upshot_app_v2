export const Copyright = () => {
  return (
    <div className="mt-5 flex items-baseline">
      <span className="block w-2 h-2 rounded-full bg-sky-500 mr-1.5 animate-pulse" />
      <div>
        <p className="text-sm flex items-center">
          <b className="text-slate-800 flex">Upshot</b>
          .app
        </p>
        <p className="text-xs mt-0.5 text-slate-400/75">
          Made by Shankhadeep & Sayantan{' '}
          <span role="img" aria-label="matte">
            &#129481;
          </span>
        </p>
      </div>
    </div>
  );
};
