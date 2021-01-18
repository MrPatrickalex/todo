const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        label({ label: 'LOG' }),
        timestamp(),
        myFormat
    )
});

const loggerMiddleware = (req, res, next) => {
    const current_datetime = new Date();
    const formatted_date = current_datetime.getFullYear() + "-" +
        (current_datetime.getMonth() + 1) + "-" +
        current_datetime.getDate() + " " +
        current_datetime.getHours() + ":" +
        current_datetime.getMinutes() + ":" +
        current_datetime.getSeconds();
    const method = req.method;
    const url = req.url;
    const status = res.statusCode;
    logger.log({
        level: 'info',
        message: `[${formatted_date}] ${method}:${url} ${status}`
    });
    next();
};

module.exports = {
    logger,
    loggerMiddleware
}