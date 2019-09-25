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
const logging_1 = __importDefault(require("../../logging/logging"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const tool_1 = require("@/tool");
const serverDefine_1 = require("./serverDefine");
const log = logging_1.default("");
exports.default = (serviceName, dir, url, gzip, port, maxAge) => __awaiter(this, void 0, void 0, function* () {
    if (!dir)
        return log.error("lack of dir");
    const realServiceName = serverDefine_1.getServerName(serviceName);
    //判断服务是否已运行
    const service_is_running = yield serverDefine_1.serviceIsRunning(realServiceName);
    if (service_is_running)
        return console.error(tool_1._active(serviceName), tool_1._error("already running"));
    //判断端口是否被占用
    const port_is_occupied = yield tool_1.port_occupied(port);
    if (port_is_occupied) {
        console.error(tool_1._error(`The port(${port}) is already occupied`));
        console.info("You can specify other port....See the help ", tool_1._label("'cmServe start --help'"));
        return;
    }
    dir = path_1.default.resolve(process.cwd(), dir);
    const serverProcessPath = path_1.default.join(path_1.default.dirname(__filename), "serverProcess.js");
    const sub = child_process_1.spawn("node", [serverProcessPath, realServiceName, url, dir, port + "", maxAge + "", gzip + ""], { detached: true });
    sub.stderr.on("data", (data) => {
        console.log(data.toString());
    });
    console.log(tool_1._label("result:"), tool_1._active(serviceName), tool_1._content(`serve start successfull`));
    console.log(tool_1._label("you can access it though by ", tool_1._content(`http://localhost:${port}${url}`)));
    process.exit();
});
