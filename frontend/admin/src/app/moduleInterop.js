// Compatibility for recovered export shapes, not a module loader or registry.
export function hasOwn(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
}
export function defineExport(object, key, getter) {
    if (!hasOwn(object, key))
        Object.defineProperty(object, key, { enumerable: true, get: getter });
}
export function markEsModule(object) {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag)
        Object.defineProperty(object, Symbol.toStringTag, { value: "Module" });
    Object.defineProperty(object, "__esModule", { value: true });
}
export function interopDefault(object) {
    const getter =
        object && object.__esModule ? () => object.default : () => object;
    defineExport(getter, "a", getter);
    return getter;
}
