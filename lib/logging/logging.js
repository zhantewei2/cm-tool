"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander2 = require('commander');
const name = (aa) => {
    console.log(aa);
};
const mpatch = (_fn, cb) => (...args) => cb(...args, _fn);
const datestring = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
const var_color = {
    'log': ''
};
class Logging {
    constructor(config) {
        this._filename = '';
        this.levels = ['log', 'debug', 'warn', 'error'];
        this.active_level_index = 0;
        this.write_content = (content) => typeof content == 'object' ? JSON.stringify(content) : content;
        this.info = (content) => this.show('info', content);
        this.warn = (content) => this.show('warn', content);
        this.error = (content) => this.show('error', content);
        this.debug = (content) => this.show('debug', content);
        if (config.level) {
            this.active_level_index = this.levels.indexOf(config.level);
            this.active_level_index = this.active_level_index < 0 ? 0 : this.active_level_index;
        }
        if (config.filepath)
            this.write_content = mpatch(this.write_content, (content, next) => this._filename + ' : ' + next(content));
        if (config.time)
            this.write_content = mpatch(this.write_content, (content, next) => datestring() + ' : ' + next(content));
    }
    show(model, content) {
        if (this.active_level_index) {
            const current_level = this.levels.indexOf(model);
            if (current_level < this.active_level_index)
                return;
        }
        console[model].call(console, model, this.write_content(content));
    }
}
class Logging2 extends Logging {
    constructor(filename) {
        super({
            filepath: true,
            time: true
        });
        this._filename = filename;
    }
}
exports.default = (filename) => new Logging2(filename);
