import {SERVE_PREFIX} from "@/setting";
import findProcess from "find-process";


//转换为实际服务名
export const getServerName=(name:string):string=>{
    return SERVE_PREFIX+name;
}
//查看服务是否在运行
export const serviceIsRunning=async(realName:string)=>{
    const result=await findProcess("name",realName);
    return !!(result&&result.length);
}