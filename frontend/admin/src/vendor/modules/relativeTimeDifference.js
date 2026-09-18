let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var round = Math.round;
function daysToYears(days) {
  return 400 * days / 146097;
}
var millisecondsPerMinute = 6e4,
  millisecondsPerDay = 864e5;
function startOfLocalDay(value) {
  var date = new Date(value);
  return date.setHours(0, 0, 0, 0), date;
}
function differenceInCalendarDays(laterValue, earlierValue) {
  var laterDate = startOfLocalDay(laterValue),
    earlierDate = startOfLocalDay(earlierValue),
    laterTimestamp = laterDate.getTime() - laterDate.getTimezoneOffset() * millisecondsPerMinute,
    earlierTimestamp = earlierDate.getTime() - earlierDate.getTimezoneOffset() * millisecondsPerMinute;
  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsPerDay);
}
function calculateRelativeTimeDifference(from, to) {
  from = +from, to = +to;
  var milliseconds = round(to - from),
    seconds = round(milliseconds / 1e3),
    minutes = round(seconds / 60),
    hours = round(minutes / 60),
    days = differenceInCalendarDays(to, from),
    weeks = round(days / 7),
    yearsExact = daysToYears(days),
    months = round(12 * yearsExact),
    years = round(yearsExact);
  return {
    millisecond: milliseconds,
    second: seconds,
    "second-short": seconds,
    minute: minutes,
    "minute-short": minutes,
    hour: hours,
    "hour-short": hours,
    day: days,
    "day-short": days,
    week: weeks,
    "week-short": weeks,
    month: months,
    "month-short": months,
    year: years,
    "year-short": years
  };
}
legacyExports.default = calculateRelativeTimeDifference;
