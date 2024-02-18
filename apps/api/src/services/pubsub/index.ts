import redis from '@api/integrations/redis';
import { IRedisPubSubKeyNames } from '@api/main';
import { Request } from 'express';
import { IConsume } from './type';

export default class PubSub<TData> {
  channel: string;
  keyName?: keyof IRedisPubSubKeyNames;
  request: Request;

  constructor(channel: string, keyName?: keyof IRedisPubSubKeyNames) {
    this.channel = channel;
    this.keyName = keyName;
  }

  async subscribe() {
    redis.subscribe(this.channel);
  }

  async produce(message: TData, request?: Request) {
    await redis.publish(this.channel, JSON.stringify(message));
    if (request) {
      this.request = request;
      this.request.session[this.keyName] = true;
    }
  }

  async consume(callback: IConsume<TData>) {
    await redis.on('message', (channel: string, message: string) => {
      if (this.channel === channel) callback(JSON.parse(message));
    });
  }

  static init<TData>(_pubSubs: Pick<PubSub<TData>, 'channel' | 'keyName'>[]) {
    return _pubSubs.reduce((acc, curr) => {
      const pubSub = new PubSub<TData>(curr.channel, curr.keyName);
      pubSub.subscribe();
      acc.set(curr.keyName, {
        produce: pubSub.produce.bind(pubSub),
        consume: pubSub.consume.bind(pubSub),
      });
      return acc;
    }, new Map());
  }
}
