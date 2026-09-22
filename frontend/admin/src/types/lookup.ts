/**
 * Maps used by the recovered UI intentionally preserve JavaScript property-key
 * coercion. The API can return string, numeric, or symbol-like keys, so these
 * aliases keep that behavior explicit at call sites.
 */
export type PropertyLookup<Value> = Readonly<Record<PropertyKey, Value>>;

export type PropertyLabelMap = PropertyLookup<string>;
