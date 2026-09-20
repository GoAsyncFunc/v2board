const siteOrigin = window.settings.host || new URL(window.location.href).origin;

window.settings.secure_path = window.settings.secure_path.replace('/', '');
document.title = window.settings.title || 'V2Board';

export interface SiteSettings {
    serviceHost: string;
}

export const siteSettings: SiteSettings = {
    serviceHost: `${siteOrigin}/api/v1`,
};

export default siteSettings;
