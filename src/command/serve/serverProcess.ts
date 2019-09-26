const {Server,Static} =require("@ztwx/ztw-server");

let args=process.argv;
let [serviceName,url,dir,port,maxAge,gzipFile]:Array<any>=args.slice(2);

if(gzipFile)gzipFile=gzipFile.split(",");
const app:any=new Server();

app.use(
    Static(url,dir,{
      memory:false,
      etag:true,
      maxAge,
      gzip:gzipFile,
      callback:'index.html'
    })
)
app.use(async(ctx:any,next:Function)=>{
    ctx.body='not found page';
})
app.listen(port)