// A download link must be a DOM element, not a React element.
export function downloadCsv(buffer: BlobPart, filename: string): void {
    const blob = new Blob([buffer], { type: 'text/plain,charset=UTF-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    try {
        link.href = url;
        link.style.display = 'none';
        link.download = filename;
        link.click();
    } finally {
        window.URL.revokeObjectURL(url);
    }
}
