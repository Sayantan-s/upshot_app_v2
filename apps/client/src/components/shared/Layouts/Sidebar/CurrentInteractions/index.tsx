import { MessageFavorite } from "iconsax-react";
import { PersonChat } from "./PersonChat";

const pinnedChats = [
  {
    _id: "1",
    firstName: "Jacob",
    lastName: "Doe",
    profilePic:
      "https://images.unsplash.com/photo-1627087820883-7a102b79179a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3165&q=80",
    messages: ["Hey!"],
  },
  {
    _id: "2",
    firstName: "Julia",
    lastName: "Fernandes",
    profilePic:
      "https://images.unsplash.com/photo-1618747946260-9511b46b1ac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3418&q=80",
    messages: [
      "Hey",
      "Sayantan",
      "I really love your product",
      "Can I get it within 250 ???",
    ],
  },
  {
    _id: "3",
    firstName: "Maeve",
    lastName: "Willy",
    profilePic:
      "https://images.unsplash.com/photo-1620067925093-801122ac1408?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3415&q=80",
    messages: ["Hey", "Sayantan", "I really love your product"],
  },
];

export const CurrentInteractions = () => {
  return (
    <div>
      <h1 className="flex gap-2 items-center">
        <MessageFavorite size="22" color="rgb(16,185,129)" />
        <span className="text-xl font-semibold text-slate-700">
          Current Interactions
        </span>
      </h1>
      <div className="mt-5 space-y-4 overflow-scroll relative">
        {pinnedChats.map((chat) => (
          <PersonChat {...chat} />
        ))}
        <div className="w-full bg-gradient-to-b from-white/0 via-white/30 to-white/80 h-10 sticky bottom-0 left-0" />
      </div>
    </div>
  );
};
