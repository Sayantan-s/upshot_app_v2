import { classNames } from '@client/helpers/classNames';
import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { INavProps } from './type';

export const NavigationLink = ({
  to,
  icon: Icon,
  name,
  disabled,
}: INavProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  const onNavigate: React.MouseEventHandler<HTMLAnchorElement> = (eve) => {
    if (disabled) eve.preventDefault();
  };

  const stylesLink = useMemo(
    () =>
      classNames('flex', 'hover:bg-slate-100', 'p-2', {
        'opacity-50': disabled,
      }),
    [disabled]
  );

  const stylesDiv = useMemo(
    () =>
      classNames(
        'flex space-x-4 w-44 relative left-1/2 transform -translate-x-1/2',
        {
          'after:w-2': disabled,
          'after:h-2': disabled,
          'after:rounded': disabled,
          'after:bg-yellow-400': disabled,
        }
      ),
    [disabled]
  );

  return (
    <NavLink onClick={onNavigate} to={to} className={stylesLink}>
      <div className={stylesDiv}>
        <Icon
          className={`w-6 h-6 ${
            isActive ? 'fill-slate-900 stroke-slate-800' : 'stroke-slate-300'
          }`}
          variant={isActive ? 'Bulk' : 'Broken'}
        />
        <span
          className={`${
            isActive ? 'text-slate-800' : 'text-slate-400'
          } text-base`}
        >
          {name}
        </span>
      </div>
    </NavLink>
  );
};
