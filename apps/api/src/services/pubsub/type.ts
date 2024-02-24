import { MESSAGE_CALL_GENPOST_FN } from '@api/enums/pubsub';

export type IConsume<TData> = (arg: TData) => void;

export const PUBSUB_CHANNELNAMES = [MESSAGE_CALL_GENPOST_FN] as const;
