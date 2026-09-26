// Original admin dashboard income/count expressions, extracted unchanged.
module.exports = function () {
    return {
        income: (e) => (e ? (e / 100).toFixed(2) : '0.00'),
        count: (e) => (e ? e : '0'),
    };
};
