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
const setting_1 = require("@/setting");
const tool_1 = require("@/tool");
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    const result = yield find_process_1.default("name", setting_1.SERVE_PREFIX);
    const nameRegexp = new RegExp(setting_1.SERVE_PREFIX + "(\\w+)");
    const serviceList = [];
    result.forEach((i) => {
        const matcher = i.cmd.match(nameRegexp);
        if (matcher) {
            serviceList.push({
                name: matcher[1],
                pid: i.pid
            });
        }
    });
    if (!serviceList.length)
        return console.error(tool_1._label("Not Found Service"));
    console.info(tool_1._label("service list:"));
    serviceList.forEach((i, index) => {
        console.log((index + 1) + "  -", "name:", tool_1._active(i.name), ",pid:", tool_1._content(i.pid));
    });
});
