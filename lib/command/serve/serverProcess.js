var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Server, Static } = require("@ztwx/ztw-server");
let args = process.argv;
let [serviceName, url, dir, port, maxAge, gzipFile] = args.slice(2);
if (gzipFile)
    gzipFile = gzipFile.split(",");
const app = new Server();
app.use(Static(url, dir, {
    memory: false,
    etag: true,
    maxAge,
    callback: 'index.html'
}));
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = 'not found page';
}));
app.listen(port);
