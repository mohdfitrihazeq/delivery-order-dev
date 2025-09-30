import{_ as R}from"./ReusableTable.vue_vue_type_script_setup_true_lang-BzyaffbS.js";import{C as z,ad as q,Z as K,a0 as U,a2 as ee,a3 as te,b as p,d as f,e as u,a4 as T,A as ne,X as E,p as O,t as w,ae as x,V as I,z as _,F as M,x as j,k as $,af as oe,l as k,g as P,ag as le,r as m,ah as ie,c as ae,o as re,_ as N,f as v,h as L,s as H,v as se,w as ue,i as A,ai as de,aj as ce,m as pe,M as ge,q as W}from"./index-BWWByROH.js";import{a as G}from"./index-DJe2vpyj.js";import{s as Q}from"./index-BZdkZB22.js";import{_ as be}from"./BreadcrumbList.vue_vue_type_script_setup_true_lang-CZdJiYSg.js";import{_ as me}from"./BaseTab-C6PmnmuQ.js";import{s as fe}from"./index-DbpY-J4V.js";import{D as he}from"./SummaryCard-BEMHh6o0.js";import{s as ve}from"./index-C0HwIFuv.js";import{s as ye}from"./index-D0h6_7Qp.js";import"./index-Ch6kk67X.js";import"./index-CGPca2n-.js";import"./index-CE414EAY.js";import"./index-2Hpez_V6.js";import"./index-COJ-kZaj.js";import"./index-Cn_iqxZv.js";import"./index-CqvAMFTI.js";var Be=`
    .p-togglebutton {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        color: dt('togglebutton.color');
        background: dt('togglebutton.background');
        border: 1px solid dt('togglebutton.border.color');
        padding: dt('togglebutton.padding');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
        border-radius: dt('togglebutton.border.radius');
        outline-color: transparent;
        font-weight: dt('togglebutton.font.weight');
    }

    .p-togglebutton-content {
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        gap: dt('togglebutton.gap');
        padding: dt('togglebutton.content.padding');
        background: transparent;
        border-radius: dt('togglebutton.content.border.radius');
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
        background: dt('togglebutton.hover.background');
        color: dt('togglebutton.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked {
        background: dt('togglebutton.checked.background');
        border-color: dt('togglebutton.checked.border.color');
        color: dt('togglebutton.checked.color');
    }

    .p-togglebutton-checked .p-togglebutton-content {
        background: dt('togglebutton.content.checked.background');
        box-shadow: dt('togglebutton.content.checked.shadow');
    }

    .p-togglebutton:focus-visible {
        box-shadow: dt('togglebutton.focus.ring.shadow');
        outline: dt('togglebutton.focus.ring.width') dt('togglebutton.focus.ring.style') dt('togglebutton.focus.ring.color');
        outline-offset: dt('togglebutton.focus.ring.offset');
    }

    .p-togglebutton.p-invalid {
        border-color: dt('togglebutton.invalid.border.color');
    }

    .p-togglebutton:disabled {
        opacity: 1;
        cursor: default;
        background: dt('togglebutton.disabled.background');
        border-color: dt('togglebutton.disabled.border.color');
        color: dt('togglebutton.disabled.color');
    }

    .p-togglebutton-label,
    .p-togglebutton-icon {
        position: relative;
        transition: none;
    }

    .p-togglebutton-icon {
        color: dt('togglebutton.icon.color');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
        color: dt('togglebutton.icon.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
        color: dt('togglebutton.icon.checked.color');
    }

    .p-togglebutton:disabled .p-togglebutton-icon {
        color: dt('togglebutton.icon.disabled.color');
    }

    .p-togglebutton-sm {
        padding: dt('togglebutton.sm.padding');
        font-size: dt('togglebutton.sm.font.size');
    }

    .p-togglebutton-sm .p-togglebutton-content {
        padding: dt('togglebutton.content.sm.padding');
    }

    .p-togglebutton-lg {
        padding: dt('togglebutton.lg.padding');
        font-size: dt('togglebutton.lg.font.size');
    }

    .p-togglebutton-lg .p-togglebutton-content {
        padding: dt('togglebutton.content.lg.padding');
    }

    .p-togglebutton-fluid {
        width: 100%;
    }
`,Se={root:function(t){var n=t.instance,i=t.props;return["p-togglebutton p-component",{"p-togglebutton-checked":n.active,"p-invalid":n.$invalid,"p-togglebutton-fluid":i.fluid,"p-togglebutton-sm p-inputfield-sm":i.size==="small","p-togglebutton-lg p-inputfield-lg":i.size==="large"}]},content:"p-togglebutton-content",icon:"p-togglebutton-icon",label:"p-togglebutton-label"},ke=z.extend({name:"togglebutton",style:Be,classes:Se}),we={name:"BaseToggleButton",extends:G,props:{onIcon:String,offIcon:String,onLabel:{type:String,default:"Yes"},offLabel:{type:String,default:"No"},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null},size:{type:String,default:null},fluid:{type:Boolean,default:null}},style:ke,provide:function(){return{$pcToggleButton:this,$parentInstance:this}}};function V(e){"@babel/helpers - typeof";return V=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},V(e)}function Ce(e,t,n){return(t=Ae(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ae(e){var t=Ee(e,"string");return V(t)=="symbol"?t:t+""}function Ee(e,t){if(V(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t);if(V(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var X={name:"ToggleButton",extends:we,inheritAttrs:!1,emits:["change"],methods:{getPTOptions:function(t){var n=t==="root"?this.ptmi:this.ptm;return n(t,{context:{active:this.active,disabled:this.disabled}})},onChange:function(t){!this.disabled&&!this.readonly&&(this.writeValue(!this.d_value,t),this.$emit("change",t))},onBlur:function(t){var n,i;(n=(i=this.formField).onBlur)===null||n===void 0||n.call(i,t)}},computed:{active:function(){return this.d_value===!0},hasLabel:function(){return q(this.onLabel)&&q(this.offLabel)},label:function(){return this.hasLabel?this.d_value?this.onLabel:this.offLabel:" "},dataP:function(){return K(Ce({checked:this.active,invalid:this.$invalid},this.size,this.size))}},directives:{ripple:U}},_e=["tabindex","disabled","aria-pressed","aria-label","aria-labelledby","data-p-checked","data-p-disabled","data-p"],$e=["data-p"];function Le(e,t,n,i,r,o){var s=ee("ripple");return te((p(),f("button",E({type:"button",class:e.cx("root"),tabindex:e.tabindex,disabled:e.disabled,"aria-pressed":e.d_value,onClick:t[0]||(t[0]=function(){return o.onChange&&o.onChange.apply(o,arguments)}),onBlur:t[1]||(t[1]=function(){return o.onBlur&&o.onBlur.apply(o,arguments)})},o.getPTOptions("root"),{"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,"data-p-checked":o.active,"data-p-disabled":e.disabled,"data-p":o.dataP}),[u("span",E({class:e.cx("content")},o.getPTOptions("content"),{"data-p":o.dataP}),[T(e.$slots,"default",{},function(){return[T(e.$slots,"icon",{value:e.d_value,class:ne(e.cx("icon"))},function(){return[e.onIcon||e.offIcon?(p(),f("span",E({key:0,class:[e.cx("icon"),e.d_value?e.onIcon:e.offIcon]},o.getPTOptions("icon")),null,16)):O("",!0)]}),u("span",E({class:e.cx("label")},o.getPTOptions("label")),w(o.label),17)]})],16,$e)],16,_e)),[[s]])}X.render=Le;var Oe=`
    .p-selectbutton {
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        outline-color: transparent;
        border-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton {
        border-radius: 0;
        border-width: 1px 1px 1px 0;
    }

    .p-selectbutton .p-togglebutton:focus-visible {
        position: relative;
        z-index: 1;
    }

    .p-selectbutton .p-togglebutton:first-child {
        border-inline-start-width: 1px;
        border-start-start-radius: dt('selectbutton.border.radius');
        border-end-start-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton:last-child {
        border-start-end-radius: dt('selectbutton.border.radius');
        border-end-end-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton.p-invalid {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }

    .p-selectbutton-fluid {
        width: 100%;
    }
    
    .p-selectbutton-fluid .p-togglebutton {
        flex: 1 1 0;
    }
`,Ve={root:function(t){var n=t.props,i=t.instance;return["p-selectbutton p-component",{"p-invalid":i.$invalid,"p-selectbutton-fluid":n.fluid}]}},xe=z.extend({name:"selectbutton",style:Oe,classes:Ve}),Ie={name:"BaseSelectButton",extends:G,props:{options:Array,optionLabel:null,optionValue:null,optionDisabled:null,multiple:Boolean,allowEmpty:{type:Boolean,default:!0},dataKey:null,ariaLabelledby:{type:String,default:null},size:{type:String,default:null},fluid:{type:Boolean,default:null}},style:xe,provide:function(){return{$pcSelectButton:this,$parentInstance:this}}};function Te(e,t){var n=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=Y(e))||t){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(g){throw g},f:r}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var o,s=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var g=n.next();return s=g.done,g},e:function(g){l=!0,o=g},f:function(){try{s||n.return==null||n.return()}finally{if(l)throw o}}}}function Me(e){return Fe(e)||Pe(e)||Y(e)||De()}function De(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Y(e,t){if(e){if(typeof e=="string")return D(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?D(e,t):void 0}}function Pe(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Fe(e){if(Array.isArray(e))return D(e)}function D(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,i=Array(t);n<t;n++)i[n]=e[n];return i}var F={name:"SelectButton",extends:Ie,inheritAttrs:!1,emits:["change"],methods:{getOptionLabel:function(t){return this.optionLabel?x(t,this.optionLabel):t},getOptionValue:function(t){return this.optionValue?x(t,this.optionValue):t},getOptionRenderKey:function(t){return this.dataKey?x(t,this.dataKey):this.getOptionLabel(t)},isOptionDisabled:function(t){return this.optionDisabled?x(t,this.optionDisabled):!1},isOptionReadonly:function(t){if(this.allowEmpty)return!1;var n=this.isSelected(t);return this.multiple?n&&this.d_value.length===1:n},onOptionSelect:function(t,n,i){var r=this;if(!(this.disabled||this.isOptionDisabled(n)||this.isOptionReadonly(n))){var o=this.isSelected(n),s=this.getOptionValue(n),l;if(this.multiple)if(o){if(l=this.d_value.filter(function(d){return!I(d,s,r.equalityKey)}),!this.allowEmpty&&l.length===0)return}else l=this.d_value?[].concat(Me(this.d_value),[s]):[s];else{if(o&&!this.allowEmpty)return;l=o?null:s}this.writeValue(l,t),this.$emit("change",{event:t,value:l})}},isSelected:function(t){var n=!1,i=this.getOptionValue(t);if(this.multiple){if(this.d_value){var r=Te(this.d_value),o;try{for(r.s();!(o=r.n()).done;){var s=o.value;if(I(s,i,this.equalityKey)){n=!0;break}}}catch(l){r.e(l)}finally{r.f()}}}else n=I(this.d_value,i,this.equalityKey);return n}},computed:{equalityKey:function(){return this.optionValue?null:this.dataKey},dataP:function(){return K({invalid:this.$invalid})}},directives:{ripple:U},components:{ToggleButton:X}},qe=["aria-labelledby","data-p"];function Re(e,t,n,i,r,o){var s=_("ToggleButton");return p(),f("div",E({class:e.cx("root"),role:"group","aria-labelledby":e.ariaLabelledby},e.ptmi("root"),{"data-p":o.dataP}),[(p(!0),f(M,null,j(e.options,function(l,d){return p(),$(s,{key:o.getOptionRenderKey(l),modelValue:o.isSelected(l),onLabel:o.getOptionLabel(l),offLabel:o.getOptionLabel(l),disabled:e.disabled||o.isOptionDisabled(l),unstyled:e.unstyled,size:e.size,readonly:o.isOptionReadonly(l),onChange:function(B){return o.onOptionSelect(B,l,d)},pt:e.ptm("pcToggleButton")},oe({_:2},[e.$slots.option?{name:"default",fn:k(function(){return[T(e.$slots,"option",{option:l,index:d},function(){return[u("span",E({ref_for:!0},e.ptm("pcToggleButton").label),w(o.getOptionLabel(l)),17)]})]}),key:"0"}:void 0]),1032,["modelValue","onLabel","offLabel","disabled","unstyled","size","readonly","onChange","pt"])}),128))],16,qe)}F.render=Re;const ze=P({name:"Overview",components:{BudgetSummaryData:he,highcharts:le.Chart},setup(){const e=[{title:"Total Budget",value:"$1800000",description:"24 new since last visit",icon:"pi pi-dollar",color:"orange"},{title:"Total Items",value:"14",description:"5 Delivered",icon:"pi pi-database",color:"green"},{title:"Location",value:"4",description:"Upload 10 Location",icon:"pi pi-building",color:"blue"}],t=m(null),n=m(null),i={root:{categories:["Concrete","Steel","Bricks"],series:[60,20,10],drillMap:{Concrete:{categories:["Grade A","Grade B"],series:[40,20],drillMap:{"Grade A":{categories:["Mix 1","Mix 2"],series:[20,20]},"Grade B":{categories:["Mix 3","Mix 4"],series:[10,10]}}},Steel:{categories:["Rebar","Structural"],series:[10,10],drillMap:{Rebar:{categories:["Type 1","Type 2"],series:[5,5]},Structural:{categories:["Beam","Column"],series:[5,5]}}},Bricks:{categories:["Red Bricks","Fly Ash Bricks"],series:[5,5],drillMap:{"Red Bricks":{categories:["Size 1","Size 2"],series:[2,3]},"Fly Ash Bricks":{categories:["Size 3","Size 4"],series:[2,3]}}}}}},r=[],o=m(0),s=m([]),l=ie({chart:{type:"column"},title:{text:""},xAxis:{categories:i.root.categories},yAxis:{title:{text:""}},legend:{enabled:!1},plotOptions:{series:{showInLegend:!1,cursor:"pointer",point:{events:{click:function(){const a=this.category,c=B();c.drillMap&&c.drillMap[a]&&y(a,c.drillMap[a])}}}}},series:[{data:i.root.series}]}),d=ae(()=>{const a=["Element","1st Sub Element","2nd Sub Element"],c=s.value.length;if(c===0)return"Budget by Cost Centre (Material)";const S=s.value[c-1];return`Budget by ${a[c-1]} (${S})`});function g(){const c=getComputedStyle(document.documentElement).getPropertyValue("--text-color"),S=[{label:"Building A",amount:540,item:4},{label:"Building B",amount:325,item:2},{label:"Parking Area",amount:702,item:7},{label:"Site Area",amount:100,item:3}];t.value={labels:S.map(b=>b.label),datasets:[{data:S.map(b=>b.item),backgroundColor:["#FF4D4F","#1890FF","#00CED1","#FFA500"],hoverBackgroundColor:["#FF7875","#40A9FF","#48D1CC","#FFB347"],items:S.map(b=>b.item)}]},n.value={plugins:{legend:{position:"bottom",labels:{usePointStyle:!0,color:c,boxWidth:12,padding:15}},tooltip:{callbacks:{label:function(b){const Z=b.raw,J=b.dataset.items[b.dataIndex];return`Amount: $${Z}, Item: ${J}`}}}},responsive:!0,maintainAspectRatio:!1}}function B(){return r.length===0?i.root:r[r.length-1]}function y(a,c){r.push({...c,drillMap:c.drillMap}),o.value++,l.xAxis.categories=c.categories,l.series[0].data=c.series,s.value.push(a)}function C(){if(r.length>1){r.pop(),s.value.pop(),o.value--;const a=r[r.length-1];l.xAxis.categories=a.categories,l.series[0].data=a.series}else{r.pop(),s.value=[],o.value=0;const a=i.root;l.xAxis.categories=a.categories,l.series[0].data=a.series}}function h(a){if(a<0||a>=s.value.length)return;r.splice(a+1),s.value.splice(a);const c=r[r.length-1];l.xAxis.categories=c.categories,l.series[0].data=c.series,o.value=r.length-1}return r.push(i.root),re(()=>{g()}),{pieData:t,pieOptions:n,chartOptions:l,drillDown:y,goBackTo:h,goBack:C,level:o,path:s,breadcrumbTitle:d,BudgetSummaryData:e}}}),Ke={class:"grid grid-cols-12 gap-4 mb-3 mt-4"},Ue={class:"grid grid-cols-12 gap-4 mt-6 items-stretch"},je={class:"col-span-12 lg:col-span-6 flex flex-col"},Ne={class:"glossy-card mb-0 p-4 rounded-lg border border-gray-300 relative flex-1 flex flex-col items-center"},He={style:{width:"100%",height:"324px",display:"flex","justify-content":"center","align-items":"center"}},We={class:"col-span-12 lg:col-span-6 flex flex-col"},Ge={class:"glossy-card mb-0 p-4 rounded-lg border border-gray-300 relative flex-1 flex flex-col"},Qe={class:"w-full flex items-center justify-between mb-4"},Xe={class:"font-bold text-black-500 block"},Ye={class:"w-full flex items-center gap-2 text-sm text-gray-600 mt-2"},Ze=["onClick"],Je={key:0};function et(e,t,n,i,r,o){const s=_("BudgetSummaryData"),l=fe,d=H,g=_("highcharts");return p(),f(M,null,[u("div",Ke,[v(s,{cardItems:e.BudgetSummaryData,cardCol:3},null,8,["cardItems"])]),u("div",Ue,[u("div",je,[u("div",Ne,[t[0]||(t[0]=u("span",{class:"self-start font-bold text-black-500 mb-10"},[u("i",{class:"pi pi-map-marker",style:{"margin-right":"5px"}}),L(" Budget by Location ")],-1)),u("div",He,[v(l,{type:"pie",data:e.pieData,options:e.pieOptions,style:{width:"100%",maxWidth:"400px",height:"70%"}},null,8,["data","options"])])])]),u("div",We,[u("div",Ge,[u("div",Qe,[u("div",null,[u("span",Xe,[t[1]||(t[1]=u("i",{class:"pi pi-eject mr-1"},null,-1)),L(" "+w(e.breadcrumbTitle),1)]),t[2]||(t[2]=u("span",{class:"font-small text-gray-500 block mt-1"},"Click on bars to drill down",-1)),u("div",Ye,[(p(!0),f(M,null,j(e.path,(B,y)=>(p(),f("span",{key:y,class:"cursor-pointer hover:underline",onClick:C=>e.goBackTo(y)},[L(w(B)+" ",1),y<e.path.length-1?(p(),f("span",Je," > ")):O("",!0)],8,Ze))),128))])]),e.level>0?(p(),$(d,{key:0,label:"Back",icon:"pi pi-arrow-left",class:"p-button-sm",onClick:e.goBack},null,8,["onClick"])):O("",!0)]),v(g,{options:e.chartOptions,style:{height:"300px",width:"100%"}},null,8,["options"])])])])],64)}const tt=N(ze,[["render",et]]);function nt(e,t){const n=se(),i=m(e.visible);ue(()=>e.visible,s=>{i.value=s});function r(){t("close"),i.value=!1}function o(s){n.add({severity:"success",summary:"Success",detail:"File Uploaded",life:3e3}),s.options.clear()}return{internalVisible:i,onHide:r,onAdvancedUpload:o}}const ot=P({__name:"BudgetImport",props:{visible:{type:Boolean}},emits:["close"],setup(e,{emit:t}){const n=e,i=t,{internalVisible:r,onHide:o,onAdvancedUpload:s}=nt(n,i);return(l,d)=>(p(),$(A(pe),{visible:A(r),"onUpdate:visible":d[0]||(d[0]=g=>ce(r)?r.value=g:null),modal:"",header:"Import Budget Items",style:{width:"43vw"},breakpoints:{"1199px":"75vw","575px":"90vw"},onHide:A(o)},{default:k(()=>[d[2]||(d[2]=u("p",{class:"m-0"},"Upload a CSV file with budget items. Required columns: item_code, description, element, 1st_sub_element, 2nd_sub_element, location1, location2, uom, budget_qty, rate, amount, wastage.",-1)),d[3]||(d[3]=u("br",null,null,-1)),v(A(de)),v(A(ve),{name:"files",customUpload:!0,onUpload:A(s),multiple:!1,accept:".csv",maxFileSize:2e6,"choose-label":"Choose CSV","upload-label":"Upload","cancel-label":"Cancel"},{empty:k(()=>d[1]||(d[1]=[u("span",null,"Drag and drop CSV files here to upload.",-1)])),_:1},8,["onUpload"]),d[4]||(d[4]=u("br",null,null,-1))]),_:1},8,["visible","onHide"]))}}),lt=P({name:"BudgetManagement",components:{BaseTab:me,Motion:ge,Badge:W,Button:H,Dropdown:Q,SelectButton:F,Tag:ye,ReusableTable:R,Overview:tt,BudgetImportModal:ot},setup(){var C;const e=m([{label:"Version 1.0",value:"1.0"},{label:"Version 1.1",value:"1.1"},{label:"Version 2.0",value:"2.0",latest:!0}]),t=[{label:"Overview",value:"overview"},{label:"Detail",value:"detail"}],n=m([{itemCode:"STL-001",description:"Steel reinforcement bars Grade 60",location:"Building A",element:"Structure",subElement:"Foundation",subsubElement:"Reinforcement",uom:"kg",quantity:2500,rate:1.85,amount:4625},{itemCode:"CON-002",description:"Ready mix concrete C25/30",location:"Building A",element:"Structure",subElement:"Foundation",subsubElement:"Concrete",uom:"m³",quantity:180,rate:125,amount:22500},{itemCode:"LAB-001",description:"Excavation work including disposal",location:"Building A",element:"Earthworks",subElement:"Excavation",subsubElement:"Manual",uom:"m³",quantity:450,rate:35,amount:15750},{itemCode:"STL-002",description:"Structural steel beams H-section",location:"Building A",element:"Structure",subElement:"Columns",subsubElement:"Steel Beams",uom:"kg",quantity:1800,rate:2.1,amount:3780},{itemCode:"EQP-001",description:"Tower crane rental (monthly)",location:"Building A",element:"Equipment",subElement:"Lifting",subsubElement:"Tower Crane",uom:"month",quantity:12,rate:8500,amount:102e3},{itemCode:"BLK-001",description:"Clay brick walls with mortar",location:"Building B",element:"Envelope",subElement:"Walls",subsubElement:"Brickwork",uom:"m²",quantity:650,rate:85,amount:55250},{itemCode:"ROF-001",description:"Galvanized metal roofing sheets",location:"Building B",element:"Structure",subElement:"Roofing",subsubElement:"Metal Sheets",uom:"m²",quantity:420,rate:65,amount:27300},{itemCode:"ELE-001",description:"Electrical wiring and conduits",location:"Building B",element:"MEP",subElement:"Electrical",subsubElement:"Wiring",uom:"points",quantity:280,rate:125,amount:35e3},{itemCode:"LAB-002",description:"Site landscaping and soil preparation",location:"Site Area",element:"Earthworks",subElement:"Landscaping",subsubElement:"Soil Preparation",uom:"m²",quantity:850,rate:25,amount:21250},{itemCode:"PAV-001",description:"Asphalt paving for parking areas",location:"Site Area",element:"Infrastructure",subElement:"Paving",subsubElement:"Asphalt",uom:"m²",quantity:1200,rate:45,amount:54e3},{itemCode:"PLB-001",description:"Water supply and drainage pipes",location:"Building A",element:"MEP",subElement:"Plumbing",subsubElement:"Pipes",uom:"m",quantity:650,rate:35,amount:22750},{itemCode:"HVC-001",description:"Air conditioning ductwork installation",location:"Building A",element:"MEP",subElement:"HVAC",subsubElement:"Ductwork",uom:"m²",quantity:380,rate:95,amount:36100},{itemCode:"PAV-002",description:"Reinforced concrete paving",location:"Parking Area",element:"Infrastructure",subElement:"Paving",subsubElement:"Concrete",uom:"m²",quantity:950,rate:75,amount:71250},{itemCode:"DRN-001",description:"Storm water drainage system",location:"Parking Area",element:"Infrastructure",subElement:"Drainage",subsubElement:"Storm Drains",uom:"m",quantity:320,rate:85,amount:27200}]),i=[{field:"itemCode",header:"Item Code",sortable:!0},{field:"description",header:"Description",sortable:!0},{field:"location",header:"Location",sortable:!0},{field:"element",header:"Element",sortable:!0},{field:"subElement",header:"1st Sub Element",sortable:!0},{field:"subsubElement",header:"2nd Sub Element",sortable:!0},{field:"uom",header:"UOM",sortable:!0},{field:"quantity",header:"Qty",sortable:!0},{field:"rate",header:"Rate",sortable:!0,bodySlot:"rate"},{field:"amount",header:"Amount",sortable:!0,bodySlot:"amount"},{header:"Action",action:!0,actions:["edit","delete"]}],r=m(((C=e.value.find(h=>h.latest))==null?void 0:C.value)||""),o=m("overview"),s=m(""),l=m(!1),d=m({});function g(h){s.value=h,d.value.global.value=h}function B(){l.value=!0}function y(h,a){h==="delete"?console.log("Deleting:",a):h==="edit"&&console.log("Editing:",a)}return{versions:e,viewOptions:t,budgetItems:n,columns:i,selectedVersion:r,viewMode:o,search:s,showImportModal:l,handleAction:y,onSearchWrapper:g,handleImportClick:B}}}),it={class:"p-6 card mb-6"},at={class:"flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"},rt={class:"flex items-center gap-2 w-full md:w-auto"},st={class:"flex items-center"},ut={key:0,class:"flex items-center"},dt={key:1,class:"text-gray-400"},ct={key:0},pt={key:1};function gt(e,t,n,i,r,o){const s=be,l=W,d=Q,g=F,B=_("Overview"),y=R,C=_("BudgetImportModal"),h=_("Motion");return p(),$(h,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.8}},{default:k(()=>[u("div",it,[v(s),u("div",at,[t[3]||(t[3]=u("div",null,[u("h1",{class:"text-2xl font-bold dark:text-white"},"Budget Management"),u("p",{class:"text-gray-500 dark:text-white"},"Interactive charts showing budget distribution.")],-1)),u("div",rt,[v(d,{modelValue:e.selectedVersion,"onUpdate:modelValue":t[0]||(t[0]=a=>e.selectedVersion=a),options:e.versions,optionLabel:"label",optionValue:"value",class:"w-full md:w-64 h-10 rounded-lg",placeholder:"Select Version"},{option:k(a=>[u("div",st,[u("span",null,w(a.option.label),1),a.option.latest?(p(),$(l,{key:0,value:"Latest",severity:"primary",class:"ml-2"})):O("",!0)])]),value:k(a=>{var c,S;return[a.value?(p(),f("div",ut,[u("span",null,w((c=e.versions.find(b=>b.value===a.value))==null?void 0:c.label),1),(S=e.versions.find(b=>b.value===a.value))!=null&&S.latest?(p(),$(l,{key:0,value:"Latest",severity:"primary",class:"ml-2"})):O("",!0)])):(p(),f("span",dt,"Select Version"))]}),_:1},8,["modelValue","options"])])]),v(g,{modelValue:e.viewMode,"onUpdate:modelValue":t[1]||(t[1]=a=>e.viewMode=a),options:e.viewOptions,optionLabel:"label",optionValue:"value",class:"h-10 rounded-lg"},null,8,["modelValue","options"]),e.viewMode==="overview"?(p(),f("div",ct,[v(B,{class:"col-span-12"})])):(p(),f("div",pt,[v(y,{value:e.budgetItems,columns:e.columns,emptyTitle:"Budget List Data",onSearch:e.onSearchWrapper,"show-import-file":!0,onImportFile:e.handleImportClick,onActionClick:e.handleAction},{rate:k(({data:a})=>[L(" $"+w(a.rate),1)]),amount:k(({data:a})=>[L(" $"+w(a.amount),1)]),_:1},8,["value","columns","onSearch","onImportFile","onActionClick"]),v(C,{visible:e.showImportModal,onClose:t[2]||(t[2]=a=>e.showImportModal=!1)},null,8,["visible"])]))])]),_:1})}const Vt=N(lt,[["render",gt]]);export{Vt as default};
