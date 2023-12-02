import React, { PropsWithChildren } from "react";

interface ICreateTweetProps {
  onTweet: (editor: string | undefined) => void;
}

export type TPostToolProps = React.FC<PropsWithChildren<ICreateTweetProps>>;
