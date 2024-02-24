import { pubsubRedis } from '@api/integrations/redis';
import { IConsume, PUBSUB_CHANNELNAMES } from './type';

export default class PubSub<TData> {
  channel: string;
  static pubsubClient?: Record<
    (typeof PUBSUB_CHANNELNAMES)[number],
    Pick<PubSub<unknown>, 'consume' | 'produce'>
  >;

  constructor(channel: string) {
    this.channel = channel;
  }

  async subscribe() {
    pubsubRedis.subscribe(this.channel);
  }

  async produce(message: TData) {
    await pubsubRedis.publish(this.channel, JSON.stringify(message));
  }

  async consume(callback: IConsume<TData>) {
    await pubsubRedis.on('message', (channel: string, message: string) => {
      if (this.channel === channel) callback(JSON.parse(message));
    });
  }

  static get client() {
    if (!PubSub.pubsubClient)
      throw new Error('Cannot find any pubsub instantiation');
    return PubSub.pubsubClient;
  }

  private static setClient<TData>(
    obj: Record<string, Pick<PubSub<TData>, 'consume' | 'produce'>>
  ) {
    PubSub.pubsubClient = obj;
  }

  static init<TData>(_pubSubChannels: typeof PUBSUB_CHANNELNAMES) {
    const result = _pubSubChannels.reduce((acc, _pubSubChannel) => {
      const pubSub = new PubSub<TData>(_pubSubChannel);
      pubSub.subscribe();
      acc[_pubSubChannel] = {
        produce: pubSub.produce.bind(pubSub),
        consume: pubSub.consume.bind(pubSub),
      };
      return acc;
    }, {} as Record<string, Pick<PubSub<TData>, 'consume' | 'produce'>>);

    PubSub.setClient(result);

    _pubSubChannels.forEach((_pubSubChannel) => {
      PubSub.client[_pubSubChannel].consume((data) => {
        console.log(data);
      });
    });
  }
}
