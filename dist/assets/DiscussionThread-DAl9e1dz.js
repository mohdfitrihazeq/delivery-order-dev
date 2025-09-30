import{b as V,s as L}from"./index-DiGaO9lk.js";import{s as E}from"./index-DsNqXNZw.js";import{C,X as i,a1 as _,b as r,k as l,l as h,a3 as j,a5 as f,e as d,a4 as b,aa as M,p as y,al as R,A as k,J as q,Q as N,S as J,Z as Q,a0 as X,a2 as Z,z as S,d as m,F as K,x as D,f as v,t as $,g as G,r as W,_ as Y,h as U,s as ee}from"./index-DtKSGrAm.js";import{s as ne}from"./index-CcNHh_jx.js";import{s as te}from"./index-Dv8gB4kq.js";var oe={root:"p-accordioncontent",content:"p-accordioncontent-content"},ae=C.extend({name:"accordioncontent",classes:oe}),re={name:"BaseAccordionContent",extends:_,props:{as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1}},style:ae,provide:function(){return{$pcAccordionContent:this,$parentInstance:this}}},H={name:"AccordionContent",extends:re,inheritAttrs:!1,inject:["$pcAccordion","$pcAccordionPanel"],computed:{id:function(){return"".concat(this.$pcAccordion.$id,"_accordioncontent_").concat(this.$pcAccordionPanel.value)},ariaLabelledby:function(){return"".concat(this.$pcAccordion.$id,"_accordionheader_").concat(this.$pcAccordionPanel.value)},attrs:function(){return i(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){return{id:this.id,role:"region","aria-labelledby":this.ariaLabelledby,"data-pc-name":"accordioncontent","data-p-active":this.$pcAccordionPanel.active}},ptParams:function(){return{context:{active:this.$pcAccordionPanel.active}}}}};function ce(e,n,t,a,u,o){return e.asChild?b(e.$slots,"default",{key:1,class:k(e.cx("root")),active:o.$pcAccordionPanel.active,a11yAttrs:o.a11yAttrs}):(r(),l(R,i({key:0,name:"p-toggleable-content"},e.ptm("transition",o.ptParams)),{default:h(function(){return[!o.$pcAccordion.lazy||o.$pcAccordionPanel.active?j((r(),l(f(e.as),i({key:0,class:e.cx("root")},o.attrs),{default:h(function(){return[d("div",i({class:e.cx("content")},e.ptm("content",o.ptParams)),[b(e.$slots,"default")],16)]}),_:3},16,["class"])),[[M,o.$pcAccordion.lazy?!0:o.$pcAccordionPanel.active]]):y("",!0)]}),_:3},16))}H.render=ce;var ie={root:"p-accordionheader",toggleicon:"p-accordionheader-toggle-icon"},de=C.extend({name:"accordionheader",classes:ie}),se={name:"BaseAccordionHeader",extends:_,props:{as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1}},style:de,provide:function(){return{$pcAccordionHeader:this,$parentInstance:this}}},B={name:"AccordionHeader",extends:se,inheritAttrs:!1,inject:["$pcAccordion","$pcAccordionPanel"],methods:{onFocus:function(){this.$pcAccordion.selectOnFocus&&this.changeActiveValue()},onClick:function(){!this.$pcAccordion.selectOnFocus&&this.changeActiveValue()},onKeydown:function(n){switch(n.code){case"ArrowDown":this.onArrowDownKey(n);break;case"ArrowUp":this.onArrowUpKey(n);break;case"Home":this.onHomeKey(n);break;case"End":this.onEndKey(n);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(n);break}},onArrowDownKey:function(n){var t=this.findNextPanel(this.findPanel(n.currentTarget));t?this.changeFocusedPanel(n,t):this.onHomeKey(n),n.preventDefault()},onArrowUpKey:function(n){var t=this.findPrevPanel(this.findPanel(n.currentTarget));t?this.changeFocusedPanel(n,t):this.onEndKey(n),n.preventDefault()},onHomeKey:function(n){var t=this.findFirstPanel();this.changeFocusedPanel(n,t),n.preventDefault()},onEndKey:function(n){var t=this.findLastPanel();this.changeFocusedPanel(n,t),n.preventDefault()},onEnterKey:function(n){this.changeActiveValue(),n.preventDefault()},findPanel:function(n){return n==null?void 0:n.closest('[data-pc-name="accordionpanel"]')},findHeader:function(n){return q(n,'[data-pc-name="accordionheader"]')},findNextPanel:function(n){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=t?n:n.nextElementSibling;return a?N(a,"data-p-disabled")?this.findNextPanel(a):this.findHeader(a):null},findPrevPanel:function(n){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=t?n:n.previousElementSibling;return a?N(a,"data-p-disabled")?this.findPrevPanel(a):this.findHeader(a):null},findFirstPanel:function(){return this.findNextPanel(this.$pcAccordion.$el.firstElementChild,!0)},findLastPanel:function(){return this.findPrevPanel(this.$pcAccordion.$el.lastElementChild,!0)},changeActiveValue:function(){this.$pcAccordion.updateValue(this.$pcAccordionPanel.value)},changeFocusedPanel:function(n,t){J(this.findHeader(t))}},computed:{id:function(){return"".concat(this.$pcAccordion.$id,"_accordionheader_").concat(this.$pcAccordionPanel.value)},ariaControls:function(){return"".concat(this.$pcAccordion.$id,"_accordioncontent_").concat(this.$pcAccordionPanel.value)},attrs:function(){return i(this.asAttrs,this.a11yAttrs,this.ptmi("root",this.ptParams))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.$pcAccordionPanel.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.$pcAccordion.tabindex,"aria-expanded":this.$pcAccordionPanel.active,"aria-controls":this.ariaControls,"data-pc-name":"accordionheader","data-p-disabled":this.$pcAccordionPanel.disabled,"data-p-active":this.$pcAccordionPanel.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.$pcAccordionPanel.active}}},dataP:function(){return Q({active:this.$pcAccordionPanel.active})}},components:{ChevronUpIcon:E,ChevronDownIcon:V},directives:{ripple:X}};function le(e,n,t,a,u,o){var g=Z("ripple");return e.asChild?b(e.$slots,"default",{key:1,class:k(e.cx("root")),active:o.$pcAccordionPanel.active,a11yAttrs:o.a11yAttrs,onClick:o.onClick}):j((r(),l(f(e.as),i({key:0,"data-p":o.dataP,class:e.cx("root"),onClick:o.onClick},o.attrs),{default:h(function(){return[b(e.$slots,"default",{active:o.$pcAccordionPanel.active}),b(e.$slots,"toggleicon",{active:o.$pcAccordionPanel.active,class:k(e.cx("toggleicon"))},function(){return[o.$pcAccordionPanel.active?(r(),l(f(o.$pcAccordion.$slots.collapseicon?o.$pcAccordion.$slots.collapseicon:o.$pcAccordion.collapseIcon?"span":"ChevronUpIcon"),i({key:0,class:[o.$pcAccordion.collapseIcon,e.cx("toggleicon")],"aria-hidden":"true"},e.ptm("toggleicon",o.ptParams)),null,16,["class"])):(r(),l(f(o.$pcAccordion.$slots.expandicon?o.$pcAccordion.$slots.expandicon:o.$pcAccordion.expandIcon?"span":"ChevronDownIcon"),i({key:1,class:[o.$pcAccordion.expandIcon,e.cx("toggleicon")],"aria-hidden":"true"},e.ptm("toggleicon",o.ptParams)),null,16,["class"]))]})]}),_:3},16,["data-p","class","onClick"])),[[g]])}B.render=le;var ue={root:function(n){var t=n.instance,a=n.props;return["p-accordionpanel",{"p-accordionpanel-active":t.active,"p-disabled":a.disabled}]}},pe=C.extend({name:"accordionpanel",classes:ue}),he={name:"BaseAccordionPanel",extends:_,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1}},style:pe,provide:function(){return{$pcAccordionPanel:this,$parentInstance:this}}},F={name:"AccordionPanel",extends:he,inheritAttrs:!1,inject:["$pcAccordion"],computed:{active:function(){return this.$pcAccordion.isItemActive(this.value)},attrs:function(){return i(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){return{"data-pc-name":"accordionpanel","data-p-disabled":this.disabled,"data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function fe(e,n,t,a,u,o){return e.asChild?b(e.$slots,"default",{key:1,class:k(e.cx("root")),active:o.active,a11yAttrs:o.a11yAttrs}):(r(),l(f(e.as),i({key:0,class:e.cx("root")},o.attrs),{default:h(function(){return[b(e.$slots,"default")]}),_:3},16,["class"]))}F.render=fe;var ve=`
    .p-accordionpanel {
        display: flex;
        flex-direction: column;
        border-style: solid;
        border-width: dt('accordion.panel.border.width');
        border-color: dt('accordion.panel.border.color');
    }

    .p-accordionheader {
        all: unset;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: dt('accordion.header.padding');
        color: dt('accordion.header.color');
        background: dt('accordion.header.background');
        border-style: solid;
        border-width: dt('accordion.header.border.width');
        border-color: dt('accordion.header.border.color');
        font-weight: dt('accordion.header.font.weight');
        border-radius: dt('accordion.header.border.radius');
        transition:
            background dt('accordion.transition.duration'),
            color dt('accordion.transition.duration'),
            outline-color dt('accordion.transition.duration'),
            box-shadow dt('accordion.transition.duration');
        outline-color: transparent;
    }

    .p-accordionpanel:first-child > .p-accordionheader {
        border-width: dt('accordion.header.first.border.width');
        border-start-start-radius: dt('accordion.header.first.top.border.radius');
        border-start-end-radius: dt('accordion.header.first.top.border.radius');
    }

    .p-accordionpanel:last-child > .p-accordionheader {
        border-end-start-radius: dt('accordion.header.last.bottom.border.radius');
        border-end-end-radius: dt('accordion.header.last.bottom.border.radius');
    }

    .p-accordionpanel:last-child.p-accordionpanel-active > .p-accordionheader {
        border-end-start-radius: dt('accordion.header.last.active.bottom.border.radius');
        border-end-end-radius: dt('accordion.header.last.active.bottom.border.radius');
    }

    .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.color');
    }

    .p-accordionpanel:not(.p-disabled) .p-accordionheader:focus-visible {
        box-shadow: dt('accordion.header.focus.ring.shadow');
        outline: dt('accordion.header.focus.ring.width') dt('accordion.header.focus.ring.style') dt('accordion.header.focus.ring.color');
        outline-offset: dt('accordion.header.focus.ring.offset');
    }

    .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) > .p-accordionheader:hover {
        background: dt('accordion.header.hover.background');
        color: dt('accordion.header.hover.color');
    }

    .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) .p-accordionheader:hover .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.hover.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader {
        background: dt('accordion.header.active.background');
        color: dt('accordion.header.active.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.active.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover {
        background: dt('accordion.header.active.hover.background');
        color: dt('accordion.header.active.hover.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.active.hover.color');
    }

    .p-accordioncontent-content {
        border-style: solid;
        border-width: dt('accordion.content.border.width');
        border-color: dt('accordion.content.border.color');
        background-color: dt('accordion.content.background');
        color: dt('accordion.content.color');
        padding: dt('accordion.content.padding');
    }
`,me={root:"p-accordion p-component"},ge=C.extend({name:"accordion",style:ve,classes:me}),be={name:"BaseAccordion",extends:_,props:{value:{type:[String,Number,Array],default:void 0},multiple:{type:Boolean,default:!1},lazy:{type:Boolean,default:!1},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1},expandIcon:{type:String,default:void 0},collapseIcon:{type:String,default:void 0},activeIndex:{type:[Number,Array],default:null}},style:ge,provide:function(){return{$pcAccordion:this,$parentInstance:this}}},z={name:"Accordion",extends:be,inheritAttrs:!1,emits:["update:value","update:activeIndex","tab-open","tab-close","tab-click"],data:function(){return{d_value:this.value}},watch:{value:function(n){this.d_value=n},activeIndex:{immediate:!0,handler:function(n){this.hasAccordionTab&&(this.d_value=this.multiple?n==null?void 0:n.map(String):n==null?void 0:n.toString())}}},methods:{isItemActive:function(n){var t;return this.multiple?(t=this.d_value)===null||t===void 0?void 0:t.includes(n):this.d_value===n},updateValue:function(n){var t,a=this.isItemActive(n);this.multiple?a?this.d_value=this.d_value.filter(function(u){return u!==n}):this.d_value?this.d_value.push(n):this.d_value=[n]:this.d_value=a?null:n,this.$emit("update:value",this.d_value),this.$emit("update:activeIndex",this.multiple?(t=this.d_value)===null||t===void 0?void 0:t.map(Number):Number(this.d_value)),this.$emit(a?"tab-close":"tab-open",{originalEvent:void 0,index:Number(n)})},isAccordionTab:function(n){return n.type.name==="AccordionTab"},getTabProp:function(n,t){return n.props?n.props[t]:void 0},getKey:function(n,t){return this.getTabProp(n,"header")||t},getHeaderPT:function(n,t){var a=this;return{root:i({onClick:function(o){return a.onTabClick(o,t)}},this.getTabProp(n,"headerProps"),this.getTabPT(n,"header",t)),toggleicon:i(this.getTabProp(n,"headeractionprops"),this.getTabPT(n,"headeraction",t))}},getContentPT:function(n,t){return{root:i(this.getTabProp(n,"contentProps"),this.getTabPT(n,"toggleablecontent",t)),transition:this.getTabPT(n,"transition",t),content:this.getTabPT(n,"content",t)}},getTabPT:function(n,t,a){var u=this.tabs.length,o={props:n.props||{},parent:{instance:this,props:this.$props,state:this.$data},context:{index:a,count:u,first:a===0,last:a===u-1,active:this.isItemActive("".concat(a))}};return i(this.ptm("accordiontab.".concat(t),o),this.ptmo(this.getTabProp(n,"pt"),t,o))},onTabClick:function(n,t){this.$emit("tab-click",{originalEvent:n,index:t})}},computed:{tabs:function(){var n=this;return this.$slots.default().reduce(function(t,a){return n.isAccordionTab(a)?t.push(a):a.children&&a.children instanceof Array&&a.children.forEach(function(u){n.isAccordionTab(u)&&t.push(u)}),t},[])},hasAccordionTab:function(){return this.tabs.length}},components:{AccordionPanel:F,AccordionHeader:B,AccordionContent:H,ChevronUpIcon:E,ChevronRightIcon:L}};function Ae(e,n,t,a,u,o){var g=S("AccordionHeader"),x=S("AccordionContent"),w=S("AccordionPanel");return r(),m("div",i({class:e.cx("root")},e.ptmi("root")),[o.hasAccordionTab?(r(!0),m(K,{key:0},D(o.tabs,function(c,p){return r(),l(w,{key:o.getKey(c,p),value:"".concat(p),pt:{root:o.getTabPT(c,"root",p)},disabled:o.getTabProp(c,"disabled")},{default:h(function(){return[v(g,{class:k(o.getTabProp(c,"headerClass")),pt:o.getHeaderPT(c,p)},{toggleicon:h(function(P){return[P.active?(r(),l(f(e.$slots.collapseicon?e.$slots.collapseicon:e.collapseIcon?"span":"ChevronDownIcon"),i({key:0,class:[e.collapseIcon,P.class],"aria-hidden":"true"},{ref_for:!0},o.getTabPT(c,"headericon",p)),null,16,["class"])):(r(),l(f(e.$slots.expandicon?e.$slots.expandicon:e.expandIcon?"span":"ChevronUpIcon"),i({key:1,class:[e.expandIcon,P.class],"aria-hidden":"true"},{ref_for:!0},o.getTabPT(c,"headericon",p)),null,16,["class"]))]}),default:h(function(){return[c.children&&c.children.headericon?(r(),l(f(c.children.headericon),{key:0,isTabActive:o.isItemActive("".concat(p)),active:o.isItemActive("".concat(p)),index:p},null,8,["isTabActive","active","index"])):y("",!0),c.props&&c.props.header?(r(),m("span",i({key:1,ref_for:!0},o.getTabPT(c,"headertitle",p)),$(c.props.header),17)):y("",!0),c.children&&c.children.header?(r(),l(f(c.children.header),{key:2})):y("",!0)]}),_:2},1032,["class","pt"]),v(x,{pt:o.getContentPT(c,p)},{default:h(function(){return[(r(),l(f(c)))]}),_:2},1032,["pt"])]}),_:2},1032,["value","pt","disabled"])}),128)):b(e.$slots,"default",{key:1})],16)}z.render=Ae;const ye=G({name:"DiscussionThread",props:{discussions:{type:Array,required:!0},editMode:{type:Boolean,default:!1}},setup(){return{active:W("0"),onUpload:t=>{console.log("uploaded",t)}}}}),Pe={class:"card p-4 mb-6 shadow"},$e={class:"flex items-center justify-between mb-4"},ke={class:"flex gap-2"},Te={class:"flex justify-between items-center w-full"},Ce={class:"flex gap-2 items-center"},_e={class:"font-semibold"},xe={class:"text-gray-400"},we={key:0,class:"flex justify-between items-start"},Ie={class:"mb-2 text-sm text-gray-700"},Se={key:0,class:"flex gap-2 flex-wrap"},Ke={key:1},De={class:"flex gap-2 justify-end mt-2"};function He(e,n,t,a,u,o){const g=ee,x=B,w=te,c=ne,p=H,P=F,O=z;return r(),m("div",Pe,[d("div",$e,[n[1]||(n[1]=d("h3",{class:"text-lg font-semibold flex items-center gap-2"},[d("i",{class:"pi pi-comments"}),U(" Discussion Thread")],-1)),d("div",ke,[(r(!0),m(K,null,D(e.discussions,(s,A)=>(r(),l(g,{key:A,onClick:I=>e.active=String(A),rounded:"",label:s.role,class:"w-auto h-8 px-2 p-0",outlined:e.active!==String(A)},null,8,["onClick","label","outlined"]))),128))])]),v(O,{value:e.active,"onUpdate:value":n[0]||(n[0]=s=>e.active=s)},{default:h(()=>[(r(!0),m(K,null,D(e.discussions,(s,A)=>(r(),l(P,{key:A,value:String(A)},{default:h(()=>[v(x,null,{default:h(()=>[d("div",Te,[d("div",Ce,[d("span",_e,$(s.role),1),d("span",null,$(s.name),1),d("span",xe,$(s.datetime),1)])])]),_:2},1024),v(p,null,{default:h(()=>{var I;return[s.isEditing?(r(),m("div",Ke,[n[3]||(n[3]=d("label",{class:"block text-gray-600 mb-2"},"Comments",-1)),v(w,{modelValue:s.message,"onUpdate:modelValue":T=>s.message=T,autoResize:"",rows:"3",class:"w-full text-sm mb-3",placeholder:"Type your comment..."},null,8,["modelValue","onUpdate:modelValue"]),v(c,{ref_for:!0,ref:"fileupload",mode:"basic",name:"demo[]",url:"/api/upload",accept:"image/*",maxFileSize:1e6,onUpload:e.onUpload,class:"text-xs"},null,8,["onUpload"]),d("div",De,[v(g,{label:"Save",icon:"pi pi-check",onClick:T=>s.isEditing=!1},null,8,["onClick"]),v(g,{label:"Cancel",icon:"pi pi-times",outlined:"",onClick:T=>s.isEditing=!1},null,8,["onClick"])])])):(r(),m("div",we,[d("div",null,[d("p",Ie,$(s.message||"No comments yet."),1),(I=s.documentUrl)!=null&&I.length?(r(),m("div",Se,n[2]||(n[2]=[d("span",{class:"px-2 py-1 text-sm text-primary"},[d("i",{class:"pi pi-file"}),U(" 1 Attachments ")],-1)]))):y("",!0)]),e.editMode?(r(),l(g,{key:0,icon:"pi pi-pencil",text:"",rounded:"",onClick:T=>s.isEditing=!0},null,8,["onClick"])):y("",!0)]))]}),_:2},1024)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])])}const je=Y(ye,[["render",He]]);export{je as D};
