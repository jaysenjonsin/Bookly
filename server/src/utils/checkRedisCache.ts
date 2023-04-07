import { redis } from '..';

export const checkRedisCache = async (redisKey: string) => {
  const redisValue = await redis.get(redisKey);
  if (redisValue) return redisValue;
  else return null;
};
