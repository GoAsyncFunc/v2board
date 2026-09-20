// The package declaration requires a string, while the recovered UI also forwards an absent URL.
declare module 'copy-to-clipboard' {
  export default function copyToClipboard(value?: string): boolean;
}
