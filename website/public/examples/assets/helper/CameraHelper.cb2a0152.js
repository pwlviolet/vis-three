import{M as n,i as s}from"../Vis.es.fa503373.js";import{M as r,i,o as c,a1 as d,q as m,O as p}from"../three.b90fa353.js";import"../vis-three.78ccfae1.js";const o=document.getElementById("app"),h=new n().setDom(o).setSize().setStats(!0).play(),e=h.scene;e.add(new r(new i(10,10,10),new c({color:"rgb(255, 105, 70)"})));e.add(new d("white",1));const t=new m(45,o.offsetWidth/o.offsetHeight,5,200);e.add(t);t.position.set(-40,20,0);t.lookAt(0,0,0);const g=new s(t);e.add(g);const a=new p(-50,50,50,-50,5,200);e.add(a);a.position.set(40,20,0);a.lookAt(0,0,0);const l=new s(a);e.add(l);
