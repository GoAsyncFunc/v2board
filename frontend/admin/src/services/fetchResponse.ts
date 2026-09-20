export function fetchResponse(...args: Parameters<typeof fetch>): ReturnType<typeof fetch> {
    return globalThis.fetch(...args);
}
