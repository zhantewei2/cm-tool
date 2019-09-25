var commander2:any=require('commander');
import chalk from 'chalk';

interface Log_Config{
    level?:'info'|'debug'|'warn'|'error';
    filepath?:boolean;
    time?:boolean;
}
const name=(aa:any)=>{
    console.log(aa)
};


const mpatch=(_fn:Function,cb:Function)=>(...args:any)=>cb(...args,_fn);
const datestring=()=>{
    const date:Date=new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
};
const var_color={
    'log':''
};

class Logging{
    _filename:string='';
    levels:string[]=['log','debug','warn','error'];
    active_level_index:number=0;
    write_content=(content:any)=>typeof content=='object'?JSON.stringify(content):content;
    constructor(config:Log_Config) {
        if (config.level){
            this.active_level_index=this.levels.indexOf(config.level);
            this.active_level_index=this.active_level_index<0?0:this.active_level_index;
        }
        if (config.filepath) this.write_content=mpatch(this.write_content,(content:string,next:Function)=>this._filename+' : '+next(content));
        if (config.time) this.write_content=mpatch(this.write_content,(content:string,next:Function)=>datestring()+' : '+next(content));

    }
    info=(content:any)=>this.show('info',content);

    warn=(content:any)=>this.show('warn',content);

    error=(content:any)=>this.show('error',content);

    debug=(content:any)=>this.show('debug',content);

    show(model:'info'|'debug'|'warn'|'error',content:string) {
        if (this.active_level_index) {
            const current_level = this.levels.indexOf(model);
            if (current_level<this.active_level_index)return;
        }
        console[model].call(console,model,this.write_content(content));
    }
}


class Logging2 extends Logging{
    constructor(filename:string){
        super({
            filepath:true,
            time:true
        });
        this._filename=filename;
    }
}

export default (filename:string)=>new Logging2(filename);