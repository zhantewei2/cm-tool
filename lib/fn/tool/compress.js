"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const fs = require('fs');
// const logging=require('../../logging/logging')(__dirname);
const logging_1 = __importDefault(require("../../logging/logging"));
const log = logging_1.default(__filename);
module.exports = (host_path, com_obj) => {
    const { file0, outDir, outFile, exclude, include, } = com_obj;
    log.info('content');
    const compress = (file) => {
    };
    // compress()
};
