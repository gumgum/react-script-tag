"use strict";var t=require("react");var o,e=(o=t)&&"object"==typeof o&&"default"in o?o:{default:o};module.exports=t=>{const o=e.default.useCallback(((o,e,r)=>{if(t.debug){const f=r?" ".repeat(r):"";console.log(`%c ScriptLoader debug {src: "${t.src}"}`,e||"color: #00ff00; font-weight: bold;"),console.log(`%c ${f} ${o}`,e||"color: #00ff00; font-weight: bold;")}}),[t]),[r,f]=e.default.useState(!1),[l,n]=e.default.useState(!1),c=e.default.createRef(),d=e.default.useCallback((e=>{const{onError:r}=t;o(`onerror started... for { src: "${t.src}" }`,"color: #ff0000; font-weight: bold;",2),r&&r(e),o(`onerror exiting... for { src: "${t.src}" }`,"color: #ff0000; font-weight: bold;",2)}),[t,o]),a=e.default.useCallback((e=>{const r=t.onLoad;o(`onload started... for { src: "${t.src}" }`,"color: #ff0000; font-weight: bold;",2),e&&o(`onload event: ${JSON.stringify(e,null,2)}`,"color: #ff0000; font-weight: bold;",4),r&&r(e),o(`onload exiting... for { src: "${t.src}" }`,"color: #ff0000; font-weight: bold;",2)}),[t,o]),s=e.default.useCallback((e=>{const{onLoad:r}=t;o(`oncreate started... for { src: "${t.src}" }`,"color: #ff0000; font-weight: bold;",2),e&&o(`oncreate event: ${JSON.stringify(e,null,2)}`,"color: #ff0000; font-weight: bold;",4),r&&r(e),o(`oncreate exiting... for { src: "${t.src}" }`,"color: #ff0000; font-weight: bold;",2)}),[t,o]),i=e.default.useMemo((()=>JSON.stringify(t)),[t]);return console.log("React",e.default.useEffect),e.default.useEffect((()=>{l||(o("componentDidMount started","color: #ff0000; font-weight: bold;",2),setTimeout((()=>{o("_appendScript started","color: #ff0000; font-weight: bold;",2);const{delayMs:e,src:r,id:f}=t,l=document.createElement("script");l.src=r,l.setAttribute("data-ref",i),l.setAttribute("data-delayMs",(e||0).toString()),f&&l.setAttribute("id",f),l.onload=a,l.onerror=d,document.body.appendChild(l),s(),o("_appendScript exiting","color: #ff0000; font-weight: bold;",2)}),t.delayMs||0),n(!0),o("componentDidMount exiting","color: #ff0000; font-weight: bold;",2)),l&&!r&&(o("componentDidUpdate started","color: #ff0000; font-weight: bold;",2),r||f(!0),o("componentDidUpdate exiting","color: #ff0000; font-weight: bold;",2))}),[t,r,o,d,a,s,l,i]),e.default.createElement("script",Object.assign({ref:c},t))};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3Qtc2NyaXB0LXRhZy5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIifQ==