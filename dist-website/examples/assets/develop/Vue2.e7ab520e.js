import{J as a,L as i,a as r}from"../Vis.es.fa503373.js";import{g as t}from"../vue.esm.browser.min.816a6d7c.js";import{c as d}from"../vue3Support.63e236d1.js";import"../three.b90fa353.js";import"../vis-three.78ccfae1.js";const n=t.observable(JSON.parse(JSON.stringify(d),a.parse)),s=new i(t.observable({}));new t({el:"#app",data(){return{lightMap:s.getData()}},methods:{addPositionY(e){e.position.y+=5}},mounted(){const e=document.createElement("div");e.innerText="\u6B63\u5728\u52A0\u8F7D...",e.className="loadingDom",document.body.appendChild(e);const o=new r({lightDataSupport:s}).setDom(document.getElementById("three")).setStats(!0).setSize();o.loadConfigAsync(n).then(m=>{document.body.removeChild(e),o.setScene(n.scene.Scene.vid).play(),this.$forceUpdate()})}});
