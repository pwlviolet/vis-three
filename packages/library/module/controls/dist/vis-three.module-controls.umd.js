(function(e,r){typeof exports=="object"&&typeof module!="undefined"?module.exports=r(require("@vis-three/middleware"),require("uuid")):typeof define=="function"&&define.amd?define(["@vis-three/middleware","uuid"],r):(e=typeof globalThis!="undefined"?globalThis:e||self,e["vis-three"]=e["vis-three"]||{},e["vis-three"]["module-controls"]=r(e.middleware,e.uuid))})(this,function(e,r){"use strict";const i=[],n=function(u,s){e.Rule(u,s,t=>r.validate(t)||i.includes(t))};class o extends e.Compiler{constructor(){super()}reigstProcessor(s,t){return i.push(e.uniqueSymbol(s.type)),super.reigstProcessor(s,t)}}var d={type:"controls",compiler:o,rule:n,processors:[]};return d});
