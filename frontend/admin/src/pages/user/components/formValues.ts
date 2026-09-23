export type UserInputValue = string | number | null | undefined;

export function toInputDefaultValue(value: UserInputValue): string | number | undefined {
    return value ?? undefined;
}
