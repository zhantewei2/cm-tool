#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const cmder=require("commander");
require("module-alias/register");
const commander_1 = __importDefault(require("commander"));
const setting_1 = require("@/setting");
const serveMain_1 = __importDefault(require("../command/serve/serveMain"));
const serverStop_1 = __importDefault(require("../command/serve/serverStop"));
const serverList_1 = __importDefault(require("../command/serve/serverList"));
commander_1.default
    .version(setting_1.SERVE_VERSION)
    .command('start <serviceName>')
    .option('-d,--dir <string>', 'server static directory')
    .option('-u,--url <string>', 'server base url; default /')
    .option('-g,--gzipFile <string>', 'specify gzip file type;default false; you can set it to"js,css,html" ')
    .option('-p,--port <number>', 'server port ;default 3000')
    .option('-m,--maxAge <number>', 'server Cache-control maxAge; default 86400')
    .action((serviceName, { url = '/', gzipFile = 'js,css,html', port = 3000, dir, maxAge = 86400 }) => {
    serveMain_1.default(serviceName, dir, url, gzipFile, port, maxAge);
});
commander_1.default
    .command('stop <serviceName>')
    .description("stop serve")
    .action((serviceName) => {
    console.log(serviceName);
    serverStop_1.default(serviceName);
});
commander_1.default.command("list")
    .description("Displays all running ")
    .action(() => {
    serverList_1.default();
});
const result = commander_1.default.parse(process.argv);
