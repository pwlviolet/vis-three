import{D as t}from"../Vis.es.fa503373.js";import{M as i,i as a,o as r,p,k as c,x as d}from"../three.b90fa353.js";import"../vis-three.78ccfae1.js";const m=new t().setDom(document.getElementById("app")).setSize().play(),e=m.scene,n=new i(new a(10,10,10),new r({color:"rgb(255, 105, 100)"}));n.position.x=10;e.add(n);const o=new p("rgb(255, 255, 255)",1,300,0);o.position.y=30;e.add(o);const g=new c(n.geometry);e.add(g);const s=new d(n.geometry);s.position.x=-10;e.add(s);
