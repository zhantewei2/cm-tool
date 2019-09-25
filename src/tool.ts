import { Http2SecureServer } from "http2";
import { Server } from "http";

const chalk=require('chalk');

const performancePromise=(fn:Function,...args:any)=>
    new Promise((resolve,reject)=>{
        fn(...args,(...resArgs:any)=>resolve(resArgs))
    });
const _label=chalk.gray;
const _content=chalk.yellow;
const _error=chalk.red;
const _active=chalk.cyan;

const arr_parse=(arr:Array<string>)=>{
    const result:any={};
    let v:string,
        matchRule:string,
        fileCount:number=0;
    for(let i=0,len=arr.length;i<len;i++){
        if(i==0)continue;
        v=arr[i];
        if(v.match(/--?/)){
            v=v.replace(/-/g,'');
            matchRule=v;
            result[v]=1;
        }else if(matchRule){
            result[matchRule]=v;
            matchRule=null;
        }else{
            result['file'+fileCount]=v;
            fileCount++;
        }
    }
    return result;
};

const port_occupied=(port:number):Promise<boolean>=>{
    return new Promise((resolve,reject)=>{
        const {Server}=require("http");
        let app:Server;
        try{
           app=require("http").createServer(()=>{});
           app.on("error",()=>resolve(true));
           app.on("listening",()=>{
               app.close();
               resolve(false);
           })
           app.listen(port);
        }catch(e){
            resolve(true);
        }
    })
}

export {
    port_occupied,
    performancePromise,
    _label,
    _content,
    _error,
    _active,
    arr_parse
};