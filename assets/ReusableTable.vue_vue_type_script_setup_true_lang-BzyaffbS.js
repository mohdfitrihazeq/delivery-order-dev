import{C as E,a1 as O,b as s,d as p,X as V,e as f,g as P,_ as U,t as I,p as $,f as y,aA as j,r as x,k as u,i,F as S,x as L,s as C,l as b,af as W,a4 as M,A as T}from"./index-BWWByROH.js";import{s as X}from"./index-Ch6kk67X.js";import{a as q,s as G,c as H}from"./index-COJ-kZaj.js";import{s as J}from"./index-BZdkZB22.js";import{s as R}from"./index-CE414EAY.js";var K=`
    .p-progressspinner {
        position: relative;
        margin: 0 auto;
        width: 100px;
        height: 100px;
        display: inline-block;
    }

    .p-progressspinner::before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    .p-progressspinner-spin {
        height: 100%;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        animation: p-progressspinner-rotate 2s linear infinite;
    }

    .p-progressspinner-circle {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: 0;
        stroke: dt('progressspinner.colorOne');
        animation:
            p-progressspinner-dash 1.5s ease-in-out infinite,
            p-progressspinner-color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @keyframes p-progressspinner-rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes p-progressspinner-dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
    @keyframes p-progressspinner-color {
        100%,
        0% {
            stroke: dt('progressspinner.color.one');
        }
        40% {
            stroke: dt('progressspinner.color.two');
        }
        66% {
            stroke: dt('progressspinner.color.three');
        }
        80%,
        90% {
            stroke: dt('progressspinner.color.four');
        }
    }
`,Q={root:"p-progressspinner",spin:"p-progressspinner-spin",circle:"p-progressspinner-circle"},Y=E.extend({name:"progressspinner",style:K,classes:Q}),Z={name:"BaseProgressSpinner",extends:O,props:{strokeWidth:{type:String,default:"2"},fill:{type:String,default:"none"},animationDuration:{type:String,default:"2s"}},style:Y,provide:function(){return{$pcProgressSpinner:this,$parentInstance:this}}},B={name:"ProgressSpinner",extends:Z,inheritAttrs:!1,computed:{svgStyle:function(){return{"animation-duration":this.animationDuration}}}},ee=["fill","stroke-width"];function ne(t,e,g,l,v,h){return s(),p("div",V({class:t.cx("root"),role:"progressbar"},t.ptmi("root")),[(s(),p("svg",V({class:t.cx("spin"),viewBox:"25 25 50 50",style:h.svgStyle},t.ptm("spin")),[f("circle",V({class:t.cx("circle"),cx:"50",cy:"50",r:"20",fill:t.fill,"stroke-width":t.strokeWidth,strokeMiterlimit:"10"},t.ptm("circle")),null,16,ee)],16))],16)}B.render=ne;const te=P({name:"ResultNotFound",props:{title:{type:String,default:"No data available"},subtitle:{type:String,default:""}}}),se={class:"flex flex-col justify-center items-center text-center py-10 text-gray-500"},oe={class:"text-lg font-medium"},re={key:0,class:"text-sm text-gray-400"};function ae(t,e,g,l,v,h){return s(),p("div",se,[e[0]||(e[0]=f("i",{class:"pi pi-inbox text-4xl mb-3"},null,-1)),f("p",oe,I(t.title),1),t.subtitle?(s(),p("p",re,I(t.subtitle),1)):$("",!0)])}const le=U(te,[["render",ae]]),ie=P({name:"BaseSpinner",components:{ProgressSpinner:B},props:{size:{type:Number,default:50}}}),pe={class:"flex justify-center items-center py-10"};function de(t,e,g,l,v,h){const w=B;return s(),p("div",pe,[y(w,{strokeWidth:"4",animationDuration:"2.5s",style:j({width:t.size+"px",height:t.size+"px"})},null,8,["style"])])}const ce=U(ie,[["render",de]]),ue={class:"flex flex-col sm:flex-row justify-end items-start sm:items-center mb-4 gap-2 mt-0 sm:mt-[-35px]"},me={class:"p-input-icon-left w-full sm:max-w-sm sm:w-auto"},fe={class:"flex gap-2 flex-wrap items-center"},ge={key:0,class:"flex justify-center py-10"},he={key:1,class:"flex justify-center py-10"},ye={class:"flex gap-2"},we=P({__name:"ReusableTable",props:{value:{},columns:{},loading:{type:Boolean},onSearch:{type:Function},showCreate:{type:Boolean},showImportFile:{type:Boolean},onCreate:{type:Function},onImportFile:{type:Function},onRefresh:{type:Function},onExport:{type:Function},onActionClick:{type:Function},emptyTitle:{},extraFilters:{},onFilterChange:{type:Function}},setup(t){const e=t,g=x(""),l=x({}),v=x(),h=x(null),w=x([]);function N(){var d;(d=e.onSearch)==null||d.call(e,g.value)}function _(d,r){var c;l.value[d]=r,(c=e.onFilterChange)==null||c.call(e,l.value)}function z(){var a;if((a=e.onExport)==null||a.call(e),!e.value||e.value.length===0)return;const d=e.columns.map(k=>k.header),r=e.value.map(k=>e.columns.map(D=>{const F=k[D.field];return typeof F=="string"?`"${F.replace(/"/g,'""')}"`:F}).join(",")),c=[d.join(","),...r].join(`
`),m=new Blob([c],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(m),o=document.createElement("a");o.href=n,o.setAttribute("download",`export_${new Date().getTime()}.csv`),document.body.appendChild(o),o.click(),document.body.removeChild(o)}function A(d,r,c){const m=r.actions||c||[];m.length&&(h.value=r,w.value=m.map(n=>({label:n.charAt(0).toUpperCase()+n.slice(1),icon:n==="edit"?"pi pi-pencil":n==="view"?"pi pi-eye":n==="delete"?"pi pi-trash":"pi pi-comment",command:()=>{var o;return(o=e.onActionClick)==null?void 0:o.call(e,n,h.value)}})),v.value.toggle(d))}return(d,r)=>{var c,m;return s(),p(S,null,[f("div",ue,[f("span",me,[e.onSearch?(s(),u(i(R),{key:0,modelValue:g.value,"onUpdate:modelValue":r[0]||(r[0]=n=>g.value=n),placeholder:"Search...",onInput:N,class:"w-full sm:w-auto"},null,8,["modelValue"])):$("",!0)]),f("div",fe,[(s(!0),p(S,null,L(e.extraFilters,(n,o)=>(s(),p(S,{key:o},[n.type==="text"?(s(),u(i(R),{key:0,placeholder:n.placeholder,modelValue:l.value[n.field],"onUpdate:modelValue":a=>l.value[n.field]=a,onInput:a=>_(n.field,l.value[n.field])},null,8,["placeholder","modelValue","onUpdate:modelValue","onInput"])):n.type==="select"?(s(),u(i(J),{key:1,options:n.options,optionLabel:"label",optionValue:"value",placeholder:n.placeholder,modelValue:l.value[n.field],"onUpdate:modelValue":a=>l.value[n.field]=a,onChange:a=>_(n.field,l.value[n.field]),class:"min-w-[8rem]"},null,8,["options","placeholder","modelValue","onUpdate:modelValue","onChange"])):n.type==="date"?(s(),u(i(X),{key:2,placeholder:n.placeholder,modelValue:l.value[n.field],"onUpdate:modelValue":a=>l.value[n.field]=a,onInput:a=>_(n.field,l.value[n.field]),dateFormat:"yy-mm-dd",class:"min-w-[10rem]"},null,8,["placeholder","modelValue","onUpdate:modelValue","onInput"])):$("",!0)],64))),128)),e.showCreate?(s(),u(i(C),{key:0,label:"Create",icon:"pi pi-plus",onClick:r[1]||(r[1]=n=>{var o;return(o=e.onCreate)==null?void 0:o.call(e)})})):$("",!0),e.showImportFile?(s(),u(i(C),{key:1,label:"Import CSV",icon:"pi pi-upload",onClick:r[2]||(r[2]=n=>{var o;return(o=e.onImportFile)==null?void 0:o.call(e)})})):$("",!0)])]),e.loading?(s(),p("div",ge,[y(ce)])):!e.loading&&(!e.value||e.value.length===0)?(s(),p("div",he,[y(le,{message:e.emptyTitle??"No List Found"},null,8,["message"])])):(s(),u(i(G),{key:2,value:e.value,paginator:((c=e.value)==null?void 0:c.length)>0,rows:10,rowsPerPageOptions:[10],tableStyle:"min-width: 50rem",paginatorTemplate:"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",currentPageReportTemplate:"{first} to {last} of {totalRecords}",class:T(["overflow-hidden dark:text-white",!e.onSearch&&!((m=e.extraFilters)!=null&&m.length)&&!e.showCreate&&!e.showImportFile?"mt-9":""])},{paginatorstart:b(()=>r[3]||(r[3]=[])),paginatorend:b(()=>[y(i(C),{type:"button",icon:"pi pi-download",text:"",onClick:z})]),default:b(()=>[(s(!0),p(S,null,L(e.columns,(n,o)=>(s(),u(i(q),{key:o,field:n.field,header:n.header,sortable:n.sortable,frozen:n.frozen,style:j(n.style)},W({_:2},[n.bodySlot&&!n.action?{name:"body",fn:b(a=>[M(d.$slots,n.bodySlot,{data:a.data})]),key:"0"}:void 0,n.action?{name:"body",fn:b(a=>[f("div",ye,[y(i(C),{icon:"pi pi-ellipsis-v",text:"",onClick:k=>A(k,a.data,n.actions)},null,8,["onClick"])])]),key:"1"}:void 0]),1032,["field","header","sortable","frozen","style"]))),128))]),_:3},8,["value","paginator","class"])),y(i(H),{ref_key:"menu",ref:v,model:w.value,popup:""},null,8,["model"])],64)}}});export{we as _,B as s};
