import{s as O}from"./index-DJe2vpyj.js";import{C as x,a1 as B,X as a,b as r,d as o,k as d,A as h,a5 as k,p as l,t as f,z as y,e as N,F as g,x as P,a4 as R,f as v,g as S,ac as U,c as V,l as C,h as I}from"./index-BWWByROH.js";var A=`
    .p-breadcrumb {
        background: dt('breadcrumb.background');
        padding: dt('breadcrumb.padding');
        overflow-x: auto;
    }

    .p-breadcrumb-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        gap: dt('breadcrumb.gap');
    }

    .p-breadcrumb-separator {
        display: flex;
        align-items: center;
        color: dt('breadcrumb.separator.color');
    }

    .p-breadcrumb-separator-icon:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-breadcrumb::-webkit-scrollbar {
        display: none;
    }

    .p-breadcrumb-item-link {
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: dt('breadcrumb.item.gap');
        transition:
            background dt('breadcrumb.transition.duration'),
            color dt('breadcrumb.transition.duration'),
            outline-color dt('breadcrumb.transition.duration'),
            box-shadow dt('breadcrumb.transition.duration');
        border-radius: dt('breadcrumb.item.border.radius');
        outline-color: transparent;
        color: dt('breadcrumb.item.color');
    }

    .p-breadcrumb-item-link:focus-visible {
        box-shadow: dt('breadcrumb.item.focus.ring.shadow');
        outline: dt('breadcrumb.item.focus.ring.width') dt('breadcrumb.item.focus.ring.style') dt('breadcrumb.item.focus.ring.color');
        outline-offset: dt('breadcrumb.item.focus.ring.offset');
    }

    .p-breadcrumb-item-link:hover .p-breadcrumb-item-label {
        color: dt('breadcrumb.item.hover.color');
    }

    .p-breadcrumb-item-label {
        transition: inherit;
    }

    .p-breadcrumb-item-icon {
        color: dt('breadcrumb.item.icon.color');
        transition: inherit;
    }

    .p-breadcrumb-item-link:hover .p-breadcrumb-item-icon {
        color: dt('breadcrumb.item.icon.hover.color');
    }
`,M={root:"p-breadcrumb p-component",list:"p-breadcrumb-list",homeItem:"p-breadcrumb-home-item",separator:"p-breadcrumb-separator",separatorIcon:"p-breadcrumb-separator-icon",item:function(i){var t=i.instance;return["p-breadcrumb-item",{"p-disabled":t.disabled()}]},itemLink:"p-breadcrumb-item-link",itemIcon:"p-breadcrumb-item-icon",itemLabel:"p-breadcrumb-item-label"},z=x.extend({name:"breadcrumb",style:A,classes:M}),D={name:"BaseBreadcrumb",extends:B,props:{model:{type:Array,default:null},home:{type:null,default:null}},style:z,provide:function(){return{$pcBreadcrumb:this,$parentInstance:this}}},w={name:"BreadcrumbItem",hostName:"Breadcrumb",extends:B,props:{item:null,templates:null,index:null},methods:{onClick:function(i){this.item.command&&this.item.command({originalEvent:i,item:this.item})},visible:function(){return typeof this.item.visible=="function"?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled=="function"?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label=="function"?this.item.label():this.item.label},isCurrentUrl:function(){var i=this.item,t=i.to,m=i.url,c=typeof window<"u"?window.location.pathname:"";return t===c||m===c?"page":void 0}},computed:{ptmOptions:function(){return{context:{item:this.item,index:this.index}}},getMenuItemProps:function(){var i=this;return{action:a({class:this.cx("itemLink"),"aria-current":this.isCurrentUrl(),onClick:function(m){return i.onClick(m)}},this.ptm("itemLink",this.ptmOptions)),icon:a({class:[this.cx("icon"),this.item.icon]},this.ptm("icon",this.ptmOptions)),label:a({class:this.cx("label")},this.ptm("label",this.ptmOptions))}}}},E=["href","target","aria-current"];function F(e,i,t,m,c,n){return n.visible()?(r(),o("li",a({key:0,class:[e.cx("item"),t.item.class]},e.ptm("item",n.ptmOptions)),[t.templates.item?(r(),d(k(t.templates.item),{key:1,item:t.item,label:n.label(),props:n.getMenuItemProps},null,8,["item","label","props"])):(r(),o("a",a({key:0,href:t.item.url||"#",class:e.cx("itemLink"),target:t.item.target,"aria-current":n.isCurrentUrl(),onClick:i[0]||(i[0]=function(){return n.onClick&&n.onClick.apply(n,arguments)})},e.ptm("itemLink",n.ptmOptions)),[t.templates&&t.templates.itemicon?(r(),d(k(t.templates.itemicon),{key:0,item:t.item,class:h(e.cx("itemIcon",n.ptmOptions))},null,8,["item","class"])):t.item.icon?(r(),o("span",a({key:1,class:[e.cx("itemIcon"),t.item.icon]},e.ptm("itemIcon",n.ptmOptions)),null,16)):l("",!0),t.item.label?(r(),o("span",a({key:2,class:e.cx("itemLabel")},e.ptm("itemLabel",n.ptmOptions)),f(n.label()),17)):l("",!0)],16,E))],16)):l("",!0)}w.render=F;var L={name:"Breadcrumb",extends:D,inheritAttrs:!1,components:{BreadcrumbItem:w,ChevronRightIcon:O}};function T(e,i,t,m,c,n){var b=y("BreadcrumbItem"),p=y("ChevronRightIcon");return r(),o("nav",a({class:e.cx("root")},e.ptmi("root")),[N("ol",a({class:e.cx("list")},e.ptm("list")),[e.home?(r(),d(b,a({key:0,item:e.home,class:e.cx("homeItem"),templates:e.$slots,pt:e.pt,unstyled:e.unstyled},e.ptm("homeItem")),null,16,["item","class","templates","pt","unstyled"])):l("",!0),(r(!0),o(g,null,P(e.model,function(s,u){return r(),o(g,{key:s.label+"_"+u},[e.home||u!==0?(r(),o("li",a({key:0,class:e.cx("separator")},{ref_for:!0},e.ptm("separator")),[R(e.$slots,"separator",{},function(){return[v(p,a({"aria-hidden":"true",class:e.cx("separatorIcon")},{ref_for:!0},e.ptm("separatorIcon")),null,16,["class"])]})],16)):l("",!0),v(b,{item:s,index:u,templates:e.$slots,pt:e.pt,unstyled:e.unstyled},null,8,["item","index","templates","pt","unstyled"])],64)}),128))],16)],16)}L.render=T;const X={key:1},q=S({__name:"BreadcrumbList",setup(e){const i=U(),t={icon:"pi pi-home",route:"/"},m=V(()=>i.meta.breadcrumb??[]);return(c,n)=>{const b=y("router-link"),p=L;return m.value.length>0?(r(),d(p,{key:0,home:t,model:m.value,class:"mb-4 py-1 px-2"},{item:C(({item:s,props:u})=>[s.route?(r(),d(b,a({key:0},u.action,{to:s.route}),{default:C(()=>[s.icon?(r(),o("i",{key:0,class:h([s.icon,"mr-1"])},null,2)):l("",!0),I(" "+f(s.label),1)]),_:2},1040,["to"])):(r(),o("span",X,[s.icon?(r(),o("i",{key:0,class:h([s.icon,"mr-1"])},null,2)):l("",!0),I(" "+f(s.label),1)]))]),_:1},8,["model"])):l("",!0)}}});export{q as _};
