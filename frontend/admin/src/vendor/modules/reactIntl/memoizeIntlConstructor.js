function getOrderedProperties(object) {
    return Object.keys(object)
        .sort()
        .map((propertyName) => ({ [propertyName]: object[propertyName] }));
}

function getCacheKey(argumentsList) {
    if (typeof JSON === "undefined") return undefined;

    return JSON.stringify(
        argumentsList.map((value) =>
            value && typeof value === "object"
                ? getOrderedProperties(value)
                : value,
        ),
    );
}

export default function memoizeIntlConstructor(FormatConstructor) {
    const cache = Object.create(null);

    return (...argumentsList) => {
        const cacheKey = getCacheKey(argumentsList);
        let formatter = cacheKey && cache[cacheKey];

        if (!formatter) {
            formatter = new FormatConstructor(...argumentsList);
            if (cacheKey) cache[cacheKey] = formatter;
        }

        return formatter;
    };
}
