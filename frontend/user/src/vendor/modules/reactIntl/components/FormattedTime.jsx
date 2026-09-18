/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import React, { Component } from "../../reactRuntime.js";
import PropTypes from "../../propTypesRuntime.js";
import { intlShape, dateTimeFormatPropTypes } from "../types.js";
import { invariantIntlContext, shouldIntlComponentUpdate } from "../utils.js";

export default class FormattedTime extends Component {
    static displayName = "FormattedTime";

    static contextTypes = {
        intl: intlShape,
    };

    static propTypes = {
        ...dateTimeFormatPropTypes,
        value: PropTypes.any.isRequired,
        format: PropTypes.string,
        children: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);
        invariantIntlContext(context);
    }

    shouldComponentUpdate(...next) {
        return shouldIntlComponentUpdate(this, ...next);
    }

    render() {
        const { formatTime, textComponent: Text } = this.context.intl;
        const { value, children } = this.props;

        let formattedTime = formatTime(value, this.props);

        if (typeof children === "function") {
            return children(formattedTime);
        }

        return <Text>{formattedTime}</Text>;
    }
}
