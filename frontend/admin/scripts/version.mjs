// Version helper extracted from the former scripts/build.mjs so the ui
// version format stays identical across the umi migration.
export function createUiVersion(date = new Date()) {
    const timestamp = date.toISOString().slice(0, 19).replace(/[-:T]/g, '');
    return `admin-source-${timestamp.slice(0, 8)}.${timestamp.slice(8)}`;
}
