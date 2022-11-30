"use strict";var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var t,u=1,i=arguments.length;u<i;u++)for(var n in t=arguments[u])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var jsx_runtime_1=require("react/jsx-runtime"),react_1=require("react"),react_dom_1=require("react-dom"),MuiStatus_1=__importDefault(require("../MuiStatus")),MuiStore_1=__importDefault(require("../MuiStore"));function default_1(e){var t=e.id,u=e.secondary,i=void 0!==u&&u,n=e.style,r=e.onClick,s=e.tooltip,o=void 0===s?"":s,a=e.children,l=e.console,_=e.consoleTitle,c=(0,react_1.useContext)(MuiStore_1.default),d=c.status,f=c.handleStatusTypeUpdate,p=c.handleStatusConsoleTypeUpdate,m=c.updateConsoleActiveId,h=(0,react_1.useContext)(MuiStore_1.default).settings,v=h.consoleActiveId,g=h.isConsoleOpen,x=(0,react_1.useState)(null),y=x[0],S=x[1],j=(0,react_1.useState)(null),q=j[0],M=j[1];return(0,react_1.useEffect)(function(){M(document.getElementById("mui-status-console")||null)},[y,v,g]),(0,react_1.useEffect)(function(){var e=d.find(function(e){return e.uniqueId===t});null===y&&e&&(S(e),f({id:t,type:"console"}))},[d,t,y]),(0,react_1.useEffect)(function(){y&&p({id:t,title:_})},[y,t,_]),(0,jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment,{children:[(0,jsx_runtime_1.jsx)(MuiStatus_1.default,__assign({},{id:t,tooltip:o,secondary:i,highlight:y&&g&&(null==y?void 0:y.uniqueId)===v?"primary":"default",onClick:function(){return r&&r(),void m(g&&v===t?{}:{id:null==y?void 0:y.uniqueId})},style:__assign(__assign({},n),{cursor:"context-menu",minWidth:"24px"})},{children:a})),q&&y&&y.uniqueId===v&&(0,react_dom_1.createPortal)(l,q)]})}exports.default=default_1;