"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
const performancePromise = (fn, ...args) => new Promise((resolve, reject) => {
    fn(...args, (...resArgs) => resolve(resArgs));
});
exports.performancePromise = performancePromise;
const _label = chalk.gray;
exports._label = _label;
const _content = chalk.yellow;
exports._content = _content;
const _error = chalk.red;
exports._error = _error;
const _active = chalk.cyan;
exports._active = _active;
const arr_parse = (arr) => {
    const result = {};
    let v, matchRule, fileCount = 0;
    for (let i = 0, len = arr.length; i < len; i++) {
        if (i == 0)
            continue;
        v = arr[i];
        if (v.match(/--?/)) {
            v = v.replace(/-/g, '');
            matchRule = v;
            result[v] = 1;
        }
        else if (matchRule) {
            result[matchRule] = v;
            matchRule = null;
        }
        else {
            result['file' + fileCount] = v;
            fileCount++;
        }
    }
    return result;
};
exports.arr_parse = arr_parse;
const port_occupied = (port) => {
    return new Promise((resolve, reject) => {
        const { Server } = require("http");
        let app;
        try {
            app = require("http").createServer(() => { });
            app.on("error", () => resolve(true));
            app.on("listening", () => {
                app.close();
                resolve(false);
            });
            app.listen(port);
        }
        catch (e) {
            resolve(true);
        }
    });
};
exports.port_occupied = port_occupied;
