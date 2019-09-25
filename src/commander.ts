let cmder:any=require('commander');
const {VERSION,Name} =require('./setting');
const sourceFn=require('./fn/source/source');
const toolFn=require('./fn/tool/toolMain');

module.exports=async ()=> {
    cmder
        .version(VERSION)
        .option('-p,--package <string>', 'Manage package')
        .option('-s,--source','Switch the registry sources')
        .option('-t,--tool <value>','cm tool collections')
        .option("-D --dir <value>","dir")

    const result=cmder.parse(process.argv);
    try{
        console.log(result.dir)
        if(result.source){
            await sourceFn()
        }
        else if(result.tool){
            await toolFn(result.tool)
        }
    }catch(e){
        console.log(e)
    }
};



