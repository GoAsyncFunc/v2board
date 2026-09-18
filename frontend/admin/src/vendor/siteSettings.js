const siteOrigin = window.settings.host || new URL(window.location.href).origin;

window.settings.secure_path = window.settings.secure_path.replace('/', '');
document.title = window.settings.title;

export const siteSettings = {
  serviceHost: `${siteOrigin}/api/v1`,
};

export { siteSettings as a };
export default siteSettings;
