import{D as c}from"../Vis.es.fa503373.js";import{M as i,i as s,o as r,p as a}from"../three.b90fa353.js";import"../vis-three.78ccfae1.js";const l=new c().setDom(document.getElementById("app")).setSize().play(),t=l.scene,n=new i(new s(10,10,10),new r({color:"rgb(255, 105, 100)"}));n.position.x=10;t.add(n);const o=new i(new s(10,10,10),new r({color:"rgb(255, 105, 100)"}));o.position.x=5;o.position.y=5;t.add(o);const d=new a("rgb(255, 255, 255)",1,300,0);d.position.y=30;t.add(d);l.eventManager;n.addEventListener("pointerdown",e=>{console.log("box pointerdown")});n.addEventListener("pointerup",e=>{console.log("box pointerup")});n.addEventListener("pointerenter",e=>{console.log("box pointerenter")});n.addEventListener("pointermove",e=>{console.log("box pointermove")});n.addEventListener("pointerleave",e=>{console.log("box pointerleave")});n.addEventListener("click",e=>{console.log("box click")});n.addEventListener("contextmenu",e=>{console.log("box contextmenu")});n.addEventListener("dblclick",e=>{console.log("box dblclick")});o.addEventListener("pointerdown",e=>{console.log("box2 pointerdown")});o.addEventListener("pointerup",e=>{console.log("box2 pointerup")});o.addEventListener("pointerenter",e=>{console.log("box2 pointerenter")});o.addEventListener("pointermove",e=>{console.log("box2 pointermove")});o.addEventListener("pointerleave",e=>{console.log("box2 pointerleave")});o.addEventListener("click",e=>{console.log("box2 click")});o.addEventListener("contextmenu",e=>{console.log("box2 contextmenu")});o.addEventListener("dblclick",e=>{console.log("box2 dblclick")});
