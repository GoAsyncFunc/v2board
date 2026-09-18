import { withRouter } from "./router.js";

export const ticketDetailStyles = {
    content: "ticket-detail-content",
    input: "ticket-detail-input",
    tag: "ticket-detail-tag",
    bubble: "ticket-detail-bubble",
    time: "ticket-detail-time",
};

export { default as QRCode } from "qrcode.react";
export const withLocale = withRouter;
