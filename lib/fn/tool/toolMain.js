const compress = require('./compress');
const { arr_parse } = require('../../tool');
module.exports = (commandLine) => {
    const commandArr = commandLine.split(' ');
    const type = commandArr[0];
    const command_obj = arr_parse(commandArr);
    const host_path = process.cwd();
    switch (type) {
        case 'compress':
            console.log(command_obj);
            compress(host_path, command_obj);
            break;
    }
};
