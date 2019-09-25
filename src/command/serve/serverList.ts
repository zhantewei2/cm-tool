import findProcess from "find-process";
import {SERVE_PREFIX} from "@/setting";
import {_error,_content,_label,_active} from "@/tool";

export interface ServiceRef{
    name:string;
    pid:number;
}


export default async()=>{
    const result:any[]=await findProcess("name",SERVE_PREFIX);
    const nameRegexp=new RegExp(SERVE_PREFIX+"(\\w+)");
    const serviceList:ServiceRef[]=[];
    result.forEach((i:any)=>{
        const matcher:any=i.cmd.match(nameRegexp);
        if(matcher){
            serviceList.push({
                name:matcher[1],
                pid:i.pid
            })
        }
    })

    if(!serviceList.length)return console.error(_label("Not Found Service"));
    console.info(_label("service list:"))
    serviceList.forEach((i:ServiceRef,index:number)=>{
        console.log((index+1)+"  -","name:",_active(i.name),",pid:",_content(i.pid));
    })

}