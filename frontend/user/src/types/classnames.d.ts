declare module 'classnames' {
  type ClassValue = string | number | boolean | null | undefined | Record<string, boolean | null | undefined>;

  export default function classNames(...values: ClassValue[]): string;
}
