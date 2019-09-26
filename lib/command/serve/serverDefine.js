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
const setting_1 = require("../../setting");
const find_process_1 = __importDefault(require("find-process"));
//转换为实际服务名
exports.getServerName = (name) => {
    return setting_1.SERVE_PREFIX + name;
};
//查看服务是否在运行
exports.serviceIsRunning = (realName) => __awaiter(this, void 0, void 0, function* () {
    const result = yield find_process_1.default("name", realName);
    return !!(result && result.length);
});
