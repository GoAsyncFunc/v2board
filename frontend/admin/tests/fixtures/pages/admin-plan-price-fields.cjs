// Reconstructed from the original PlanEditor render branch in the Webpack bundle.
// The original module has no standalone component boundary; dependencies are injected
// so the extracted branch can serve as a stable differential baseline.
module.exports = function renderPlanPriceFields(React, ui, props) {
    var record = props.record;
    var currencySymbol = props.currencySymbol;
    var onPriceChange = props.onPriceChange;
    var priceFields = [
        ['month_price', '月付'],
        ['quarter_price', '季付'],
        ['half_year_price', '半年'],
        ['year_price', '年付'],
        ['two_year_price', '两年付'],
        ['three_year_price', '三年付'],
    ];
    var renderField = function (field, label, md, addonAfter) {
        var inputProps = {
            value: record[field] !== null ? record[field] : undefined,
            onChange: function (event) {
                return onPriceChange(field, event.target.value);
            },
        };
        if (addonAfter !== undefined) inputProps.addonAfter = addonAfter;
        return React.createElement(
            ui.Col,
            { md: md, key: field },
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('label', { for: 'example-text-input-alt' }, label),
                React.createElement(ui.Input, inputProps),
            ),
        );
    };
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            ui.Divider,
            { orientation: 'center' },
            '售价设置 ',
            React.createElement(
                ui.Tooltip,
                { placement: 'top', title: '将金额留空则不会进行出售' },
                React.createElement(ui.Icon, { type: 'info-circle' }),
            ),
        ),
        React.createElement(
            ui.Row,
            { gutter: 10 },
            priceFields.map(function (entry) {
                return renderField(entry[0], entry[1], 4);
            }),
        ),
        React.createElement(ui.Row, { gutter: 10 }, [
            renderField('onetime_price', '一次性', 12, currencySymbol),
            renderField('reset_price', '重置包', 12, currencySymbol),
        ]),
    );
};
