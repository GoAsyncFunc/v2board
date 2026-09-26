export {};

declare global {
    interface Window {
        settings: {
            background_url?: string;
            logo?: string;
            secure_path: string;
            title?: string;
            host?: string;
            theme: {
                color?: string;
                header?: string;
                sidebar?: string;
            };
        };
    }
}
