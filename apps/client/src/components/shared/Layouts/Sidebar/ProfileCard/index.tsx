import { useAuth } from '@client/hooks';
import { ArrowRight } from 'iconsax-react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

const config = [
  {
    heading: 'Products',
    counts: 3,
    active: true,
    link: 'profile/products',
  },
  {
    heading: 'Posts',
    counts: 21,
    active: false,
    link: 'profile/products',
  },
];

export const ProfileCard = () => {
  const { user } = useAuth();

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="w-full rounded-md h-32 relative overflow-hidden">
        <img
          className="absolute top-0 left-0 object-left-top w-full h-full object-cover bg-slate-100"
          src={user?.coverPic}
          alt="cover"
        />
      </div>
      <div className="w-24 h-24 bg-red-100 transform -translate-y-1/2 -mb-[18%] border-4 z-10 border-white rounded-full overflow-hidden relative mx-auto">
        <img
          className="absolute w-full h-full object-cover"
          alt={`avatar`}
          src={user?.profilePic}
        />
      </div>
      <div className="p-6 mx-auto">
        <div className="border-b pb-[10%] text-center">
          <div className="flex justify-center items-baseline space-x-2">
            <p className="text-lg font-bold text-slate-700">
              {user?.firstName || 'Cheems'} {user?.lastName}{' '}
            </p>
            <NavLink
              className="text-xs text-emerald-500"
              to={'/profile/' + user?.userName}
            >
              @{user?.userName}
            </NavLink>
          </div>
          <p className="mt-1">{user?.location}</p>
        </div>
        <div className="pt-[10%] flex justify-between">
          {config.map(({ heading, counts, active, link }) => (
            <NavLink
              to={link || '#'}
              role={active ? 'button' : 'document'}
              key={heading}
              className={`p-2 rounded-md ${
                active ? 'bg-emerald-50 border border-emerald-100' : ''
              }`}
            >
              <h3 className="flex items-center">
                <span
                  className={`font-semibold ${
                    active ? 'text-emerald-700' : 'text-slate-900'
                  } text-[0.9rem]`}
                >
                  {heading}
                </span>
                <ArrowRight
                  size={12}
                  color="rgb(16,185,12)"
                  className="transform -rotate-45 ml-1"
                />
              </h3>
              <p
                className={`text-lg ${
                  active ? 'text-emerald-700' : 'text-slate-400'
                }`}
              >
                {counts}
              </p>
            </NavLink>
          ))}
          <div className={`p-2 rounded-md`}>
            <h3 className="flex items-center">
              <span className={`font-semibold text-slate-900 text-[0.9rem]`}>
                Member Since
              </span>
              <ArrowRight
                size={12}
                color="rgb(16,185,12)"
                className="transform -rotate-45 ml-1"
              />
            </h3>
            <p className={`text-lg text-slate-400`}>
              {moment(user?.created_at).format('Do MMM, YYYY')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
