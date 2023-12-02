import { TagsList } from '@client/components/ui/TagsList';
import { PRDOUCT_TYPE_TAGS } from '@client/constants/tags/producttype';
import { Hashtag, HashtagUp } from 'iconsax-react';
import { useState } from 'react';

export const Genre = () => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div>
      <h1 className="flex gap-2 items-center">
        <HashtagUp size="22" color="rgb(16,185,129)" />
        <span className="text-xl font-semibold text-slate-700">
          Product Genre
        </span>
      </h1>
      <div className="mt-4">
        <TagsList
          value={value}
          onSelect={setValue}
          className="flex flex-wrap gap-2"
          data={PRDOUCT_TYPE_TAGS}
          renderTemplate={({ displayValue, value, active }) => (
            <button
              key={value}
              className={`flex space-x-1 items-center border px-4 py-2 rounded-full group ${
                active ? 'bg-slate-900' : 'bg-white'
              } hover:bg-slate-900 hover:text-slate-50`}
            >
              <Hashtag size={14} />
              <span
                className={`group-hover:text-slate-50 ${
                  active ? 'text-slate-50' : ''
                }`}
              >
                {displayValue}
              </span>
            </button>
          )}
        />
      </div>
    </div>
  );
};
