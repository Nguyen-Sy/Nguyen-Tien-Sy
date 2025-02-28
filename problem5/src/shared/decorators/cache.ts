import redisInstance from "@domain/db/redis";

export function Cache(prefix: string, expire: number) {
    return function (
        _target: unknown,
        _propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: unknown[]) {
            const key = `${prefix}:${args.join(":")}`;
            const rawValue = await redisInstance.client!.get(key);
            if (rawValue) return JSON.parse(rawValue);

            const value = await originalMethod.apply(this, args);
            redisInstance.client!.set(key, JSON.stringify(value), "EX", expire);
            return value;
        };
        return descriptor;
    };
}

export function InvalidCache(prefix: string) {
    return function (
        _target: unknown,
        _propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: unknown[]) {
            const key = `${prefix}:${args.join(":")}`;
            const value = await originalMethod.apply(this, args);
            await redisInstance.client!.del(key);
            return value;
        };
        return descriptor;
    };
}
