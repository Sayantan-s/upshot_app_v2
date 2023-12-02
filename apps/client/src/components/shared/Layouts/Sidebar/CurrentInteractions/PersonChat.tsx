import { FC } from "react";
import { PersnalChatProps } from "./type";

export const PersonChat: FC<PersnalChatProps> = ({
  firstName,
  lastName,
  profilePic,
  messages,
}) => {
  return (
    <div className="flex space-x-3">
      <div className="w-24 aspect-square overflow-hidden relative rounded-2xl border-4">
        <img
          src={profilePic}
          alt={`${firstName} ${lastName}`}
          className="absolute top-0 left-0 object-cover object-center"
        />
      </div>
      <div className="mt-2 flex justify-between w-full">
        <div>
          <h1 className="text-base text-slate-900">
            {firstName} {lastName}
          </h1>
          <p className="mt-1">{messages[messages.length - 1]}</p>
        </div>
        {messages.length > 1 ? (
          <div className="relative top-1/2 transform -translate-y-1/2 bg-emerald-500 text-emerald-50 w-6 h-6 flex items-center justify-center rounded-full text-[10px]">
            {messages.length}
          </div>
        ) : null}
      </div>
    </div>
  );
};
