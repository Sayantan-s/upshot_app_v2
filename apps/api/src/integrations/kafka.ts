import { Consumer, Kafka, Producer } from 'kafkajs';

export default class PubSub {
  private producer: Producer;
  private consumer: Consumer;
  constructor() {
    const kafka = new Kafka({
      clientId: 'upshot-app',
      brokers: ['kafka1:5555'],
    });
    this.producer = kafka.producer();
    this.consumer = kafka.consumer({ groupId: 'test-group' });
  }

  async publish(topic, messages) {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic,
        messages,
      });
    } catch (error) {
      throw new Error('Kafka broke');
    } finally {
      await this.producer.disconnect();
    }
  }

  async consume(topic, callback) {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic, fromBeginning: true });
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log(topic, partition);
          const value = message.value.toString();
          callback(value);
        },
      });
    } catch (error) {
      throw new Error('Kafka broke');
    }
  }
}
