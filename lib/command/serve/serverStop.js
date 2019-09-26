"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const find_process_1 = __importDefault(require("find-process"));
const serverDefine_1 = require("./serverDefine");
const tool_1 = require("../../tool");
exports.default = (serviceName) => __awaiter(this, void 0, void 0, function* () {
    const realServiceName = serverDefine_1.getServerName(serviceName);
    const result = yield find_process_1.default("name", realServiceName);
    if (!result || !result.length)
        return console.error(tool_1._active(serviceName), tool_1._error("not running"));
    const activeProcess = result[0];
    process.kill(activeProcess.pid);
    console.info(tool_1._active(serviceName), tool_1._content("stop successfull"));
});
