"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const logsDir = './logs';
// if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
// Define the time format
function getTime() {
    return new Date().toLocaleString();
}
function doLog(level, ...args) {
    const strs = args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg));
    let line = strs.join(' | ');
    line = `${getTime()} - ${level} - ${line}\n`;
    console.log(line);
    // fs.appendFileSync('./logs/backend.log', line);
}
exports.default = {
    debug(...args) {
        // if (process.env.NODE_NEV === 'production') return
        doLog('DEBUG', ...args);
    },
    info(...args) {
        doLog('INFO', ...args);
    },
    warn(...args) {
        doLog('WARN', ...args);
    },
    error(...args) {
        doLog('ERROR', ...args);
    },
};
