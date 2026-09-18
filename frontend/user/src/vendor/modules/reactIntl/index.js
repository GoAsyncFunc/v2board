/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import defaultLocaleData from "./englishLocaleData.js";
import { addLocaleData } from "./localeDataRegistry.js";

addLocaleData(defaultLocaleData);

export { addLocaleData };
export { intlShape } from "./types.js";
export { default as injectIntl } from "./injectIntl.jsx";
export { default as defineMessages } from "./defineMessages.js";

export { default as IntlProvider } from "./components/IntlProvider.jsx";
export { default as FormattedDate } from "./components/FormattedDate.jsx";
export { default as FormattedTime } from "./components/FormattedTime.jsx";
export { default as FormattedRelative } from "./components/FormattedRelative.jsx";
export { default as FormattedNumber } from "./components/FormattedNumber.jsx";
export { default as FormattedPlural } from "./components/FormattedPlural.jsx";
export { default as FormattedMessage } from "./components/FormattedMessage.jsx";
export { default as FormattedHTMLMessage } from "./components/FormattedHTMLMessage.jsx";
