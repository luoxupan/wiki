import{d as n,o as l,c as r,a as s,b as e,t as i,w as u,u as d,R as c,H as _,e as m}from"./index.7d18ebbf.js";const p={class:"about"},h=e("h1",null,"This is an about page",-1),k={data(){return{params:{counter:0},counter:0,parentMessage:"Parent",items:[{message:"Foo"},{message:"Bar"}]}},methods:{handleClick(){this.params.counter++}}},b=n({...k,__name:"AboutView",setup(f){return(a,t)=>(l(),r("div",p,[s(_,{msg:"Hello World!"}),h,e("div",null,[e("button",{onClick:t[0]||(t[0]=(...o)=>a.handleClick&&a.handleClick(...o))},"handle click")]),e("div",null,i(a.params.data.num),1),s(d(c),{to:"/"},{default:u(()=>[m("Home")]),_:1})]))}});export{b as default};
