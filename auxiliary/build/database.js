const redis = require('redis'); 
import { RedisPubSub } from 'graphql-redis-subscriptions';



const pubsub = new RedisPubSub({
  connection: {
    host: REDIS_DOMAIN_NAME,
    port: PORT_NUMBER,
    retry_strategy: options => {
      // reconnect after upto 3000 milis
      return Math.max(options.attempt * 100, 3000);
    }
  }
});


