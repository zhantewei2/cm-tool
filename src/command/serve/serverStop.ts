import findProcess from "find-process";
import {getServerName} from "./serverDefine";
import {_active,_label,_content,_error} from "../../tool";

export default async(serviceName:string)=>{
    const realServiceName=getServerName(serviceName);
    const result:Array<any>=await findProcess("name",realServiceName);
    if(!result||!result.length)return console.error(_active(serviceName),_error("not running"));
    const activeProcess:any=result[0];
    process.kill(activeProcess.pid)
    console.info(_active(serviceName),_content("stop successfull"))
}