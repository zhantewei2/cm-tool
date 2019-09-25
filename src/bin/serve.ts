#!/usr/bin/env node
// const cmder=require("commander");
require("module-alias/register");

import cmder, { Command } from "commander";
import {SERVE_VERSION} from "@/setting";
import {strict as assert} from 'assert';
import createServe from "../command/serve/serveMain";
import stopServe from "../command/serve/serverStop";
import listServe from "../command/serve/serverList";

cmder
    .version(SERVE_VERSION)
    .command('start <serviceName>')
    .option('-d,--dir <string>','server static directory')
    .option('-u,--url <string>','server base url; default /')
    .option('-g,--gzipFile <string>','specify gzip file;default "js,css,html"; set false to present default behaviours ')
    .option('-p,--port <number>','server port ;default 3000')
    .option('-m,--maxAge <number>','server Cache-control maxAge; default ')
    .action((serviceName:string,{url='/',gzipFile='js,css,html',port=3000,dir,maxAge=86400}:any)=>{
        console.log(serviceName)
        createServe(serviceName,dir,url,gzipFile,port,maxAge);
    })

cmder
    .command('stop <serviceName>')
    .description("stop serve")
    .action((serviceName:string)=>{
        console.log(serviceName);
        stopServe(serviceName);
    })

cmder.command("list")
    .description("Displays all running ")
    .action(()=>{
        listServe();
    })

const result:Command=cmder.parse(process.argv);
