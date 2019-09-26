import logging from "../../logging/logging";
import path from 'path';
import {spawn} from 'child_process';
import {_content,_label,port_occupied,_active,_error} from "../../tool";
import {getServerName,serviceIsRunning} from "./serverDefine";

const log=logging("")

export default async(serviceName:string,dir:string,url:string,gzip:string|boolean,port:number,maxAge:number)=>{

    if(!dir)return log.error("lack of dir");
    const realServiceName:string=getServerName(serviceName);
    //判断服务是否已运行
    const service_is_running:any=await serviceIsRunning(realServiceName);

    if(service_is_running)return console.error(_active(serviceName),_error("already running"));
    
    //判断端口是否被占用
    const port_is_occupied:boolean=await port_occupied(port);
    if(port_is_occupied){   
        console.error(_error(`The port(${port}) is already occupied`));
        console.info("You can specify other port....See the help ",_label("'cmServe start --help'"))
        return;
    }
    dir=path.resolve(process.cwd(),dir);

    const serverProcessPath:string=path.join(path.dirname(__filename),"serverProcess.js");
    const sub=spawn("node",[serverProcessPath,realServiceName,url,dir,port+"",maxAge+"",gzip+""],{detached:true})
    sub.stderr.on("data",(data:Buffer)=>{
        console.log(data.toString())
    })
    sub.stdout.on("data",(chunk:Buffer)=>{
        console.log(chunk.toString());
    })
    console.log(_label("result:"),_active(serviceName),_content(`serve start successfull`));
    console.log(_label("you can access it though by ",_content(`http://localhost:${port}${url}`)))
    process.exit();
}
