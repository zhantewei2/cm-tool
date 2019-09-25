const a=(arr,...args)=>
    String.raw({
        raw:arr
    },...args);

const name='ztw';
const age=12;

a`hello ${name} ${age}`;