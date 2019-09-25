var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const inquirer = require('inquirer');
const sourceConfig = require('./source.config');
const { exec } = require('child_process');
const { performancePromise, _label, _content, _error } = require('../../tool');
module.exports = () => __awaiter(this, void 0, void 0, function* () {
    let [err, sourceOrigin] = yield performancePromise(exec, 'npm config get registry');
    if (err)
        throw '';
    const sourceValues = Object.values(sourceConfig);
    sourceOrigin = sourceOrigin.trim();
    let sourceDefault = sourceValues.indexOf(sourceOrigin);
    sourceDefault = sourceDefault < 0 ? 0 : sourceDefault;
    console.log(_label('Current proxy source: '), _content(sourceOrigin));
    const { env, source } = yield inquirer.prompt([
        {
            name: 'env',
            type: 'list',
            message: 'choose an environment that you need to configure',
            choices: ['yarn', 'npm']
        },
        {
            name: 'source',
            type: 'list',
            message: 'choose a registry address that you want to use',
            choices: Object.keys(sourceConfig),
            default: sourceDefault
        }
    ]);
    const sourceAddress = sourceConfig[source];
    exec(`npm config set registry ${sourceAddress}`, (err) => {
        if (err) {
            console.log(_error('Config registry failure!'));
        }
        else {
            console.log(_label('The registry address has been changed to'), _content(sourceAddress));
        }
    });
});
