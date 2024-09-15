const redis = require('redis');

const redisClient = redis.createClient({
    host: "127.0.0.1",
    port: 6379,
    password: "redis12task"
});

(async () => {
   redisClient.on('error', (err) => console.log(err));
})();

const getRedisAsync = async (key) => {
   const value = await redisClient.get(key);
   return value;
};

const getBatchRedisAsync = async (keys) => {
    if(keys.length===0) return [];
    return await redisClient.mGet(keys);
 };

const setRedisAsync = async (key, value) => {
   await redisClient.set(key, value);
};

const delRedisAsync = async (key) => {
    await redisClient.del(key);
};

module.exports = {
    redisClient,
    getRedisAsync,
    setRedisAsync,
    delRedisAsync,
    getBatchRedisAsync
}