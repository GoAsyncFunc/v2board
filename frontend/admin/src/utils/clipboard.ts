import copyToClipboard from 'copy-to-clipboard';

type RecoveredClipboardCopy = (text?: string) => boolean;

// The recovered UI historically forwards an absent subscription URL. Keep that
// compatibility local instead of widening the third-party declaration globally.
const copyRecoveredClipboardText = copyToClipboard as RecoveredClipboardCopy;

export function copyText(text: string): boolean {
  return copyToClipboard(text);
}

export function copyOptionalText(text?: string): boolean {
  return copyRecoveredClipboardText(text);
}
