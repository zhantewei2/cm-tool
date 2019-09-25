const path=require('path');
const fs=require('fs');
// const logging=require('../../logging/logging')(__dirname);
import logging from '../../logging/logging';
const log=logging(__filename);

module.exports=(host_path:string,com_obj:any)=>{
    const {
        file0,
        outDir,
        outFile,
        exclude,
        include,
    }:any=com_obj;
    log.info('content');
    const compress=(file:string)=>{

    };
    // compress()

};