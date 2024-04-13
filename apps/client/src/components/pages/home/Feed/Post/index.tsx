import { useAuthor } from '@client/hooks';
import { IPost } from '@client/store/types/shot';
import { motion } from 'framer-motion';
import { AlignBottom, Heart, Messages2, Send2 } from 'iconsax-react';
import moment from 'moment';

const Post = ({ details, activity, id, updated_at, user }: IPost) => {
  const styles =
    activity === 'promote'
      ? 'bg-teal-100/50 text-teal-400'
      : 'bg-sky-100/50 text-sky-400';

  const bgColor = activity === 'promote' ? 'bg-teal-100/60' : 'bg-sky-100/60';
  const imgs = details.images?.length
    ? details.images
    : new Array(3).fill(false);

  const isAuthor = useAuthor(user!);

  return (
    <motion.div
      // initial={{ y: -5, opacity: 0.4 }}
      // animate={{ y: 0, opacity: 1, transition: { duration: 0.4 } }}
      className="p-3 rounded-xl bg-slate-50/70"
    >
      <button className="float-right flex flex-col space-y-0.5">
        <span className="bg-slate-300 w-1 h-1 rounded-full" />
        <span className="bg-slate-300 w-1 h-1 rounded-full" />
        <span className="bg-slate-300 w-1 h-1 rounded-full" />
      </button>
      <div className="flex space-x-2">
        <div className="w-16 h-16 rounded-full overflow-hidden relative">
          <img
            className={`absolute w-full h-full object-cover ${bgColor}`}
            alt={`avatar_${id}`}
            src={user?.profilePic}
          />
        </div>
        <div>
          <h1 className="flex space-x-2 items-center">
            <span className="text-sm font-normal text-slate-500">
              {' '}
              {user?.firstName} {user?.lastName}
            </span>
            <span> &middot;</span>
            <span
              className={`block w-max px-3 py-1 capitalize rounded-full text-xs ${styles}`}
            >
              {activity}
            </span>
          </h1>
          <p className="text-xs max-w-sm truncate text-slate-400 mt-1">
            {user?.about}
          </p>
          <span className="block text-xs text-slate-300 mt-0.5">
            {' '}
            {moment(updated_at).fromNow()}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <div>
          <h1
            className="text-slate-700 font-medium text-base"
            dangerouslySetInnerHTML={{ __html: details.heading }}
          />
          <p
            className="line-clamp-2 mt-1.5"
            dangerouslySetInnerHTML={{ __html: details.body }}
          />
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        {imgs?.map((image, index) => (
          <div
            className="w-full h-64 rounded-md overflow-hidden relative"
            key={index}
          >
            <img
              className={`absolute w-full h-full object-cover ${
                imgs.length > 2 && imgs.length - 1 === index ? 'blur-md' : ''
              }`}
              alt={`avatar_${id}`}
              src={
                image ||
                'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'
              }
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between">
        <div className="flex space-x-1.5">
          <button className="bg-rose-50 hover:bg-rose-100 flex items-center p-1.5 space-x-1 rounded-full">
            <Heart
              className={'w-5 h-5'}
              color="rgb(244 63 94)"
              variant="Broken"
            />
          </button>
          {activity === 'promote' ? (
            <button className="bg-teal-50 hover:bg-teal-100 flex items-center p-1.5 space-x-1 rounded-full">
              <Messages2
                className={'w-5 h-5'}
                color=" rgb(20 184 166)"
                variant="Broken"
              />
            </button>
          ) : !isAuthor ? (
            <button className="bg-sky-50 hover:bg-sky-100 flex items-center p-1.5 space-x-1 rounded-full">
              <Send2
                className={'w-5 h-5'}
                color="rgb(14 165 233)"
                variant={'Broken'}
              />
            </button>
          ) : null}
        </div>
        {activity === 'sell' ? (
          <button className="space-x-1 bg-slate-900 px-4 py-1.5 disabled:opacity-75 ring-1 ring-slate-900/10 shadow shadow-slate-700/10 rounded-full">
            <span className="text-yellow-200">$</span>
            <span className="text-sky-50 font-normal text-xs">
              {details.salePrice}
            </span>
          </button>
        ) : (
          <div className="flex items-end space-x-1 opacity-50">
            {' '}
            <AlignBottom className={'w-5 h-5'} variant="Broken" />{' '}
            <span className="text-xs">8 views</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Post;
