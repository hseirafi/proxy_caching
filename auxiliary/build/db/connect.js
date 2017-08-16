import { RedisPubSub } from 'graphql-redis-subscriptions';

const pubsub = new RedisPubSub();
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {},
});


console.log(RedisPubSub)