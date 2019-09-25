var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let cmder = require('commander');
const { VERSION, Name } = require('./setting');
const sourceFn = require('./fn/source/source');
const toolFn = require('./fn/tool/toolMain');
module.exports = () => __awaiter(this, void 0, void 0, function* () {
    cmder
        .version(VERSION)
        .option('-p,--package <string>', 'Manage package')
        .option('-s,--source', 'Switch the registry sources')
        .option('-t,--tool <value>', 'cm tool collections')
        .option("-D --dir <value>", "dir");
    const result = cmder.parse(process.argv);
    try {
        console.log(result.dir);
        if (result.source) {
            yield sourceFn();
        }
        else if (result.tool) {
            yield toolFn(result.tool);
        }
    }
    catch (e) {
        console.log(e);
    }
});
