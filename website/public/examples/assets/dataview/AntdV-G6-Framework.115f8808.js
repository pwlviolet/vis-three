import{C as F,D as Q,g as i,E as l}from"../Vis.es.321d2553.js";import{D as _}from"../three.5dc0577a.js";import{r as q,a as K,i as U,G as Y}from"../G6.bd27ca46.js";import{v as X}from"../v4.90f1a8cc.js";import"../vis-three.a3d50446.js";import"../Antd.4efcd57f.js";const Z={A:"#9CFC72",B:"#44A5FF",C:"#FFBE4C"},ee={nodes:[{id:"1",label:"Company1"},{id:"2",label:"Company2"},{id:"3",label:"Company3"},{id:"4",label:"Company4"},{id:"5",label:"Company5"},{id:"8",label:"Company8"},{id:"9",label:"Company9"}],edges:[{source:"1",target:"2",data:{type:"A",amount:"100,000 Yuan",date:"2019-08-03"}},{source:"1",target:"3",data:{type:"B",amount:"100,000 Yuan",date:"2019-08-03"}},{source:"2",target:"5",data:{type:"C",amount:"100,000 Yuan",date:"2019-08-03"}},{source:"3",target:"4",data:{type:"C",amount:"100,000 Yuan",date:"2019-08-03"}},{source:"1",target:"8",data:{type:"B",amount:"100,000 Yuan",date:"2019-08-03"}},{source:"1",target:"9",data:{type:"C",amount:"100,000 Yuan",date:"2019-08-03"}}]};q("round-rect",{drawShape:function(t,s){const a=t.style.width,n=t.style.stroke,d=s.addShape("rect",{attrs:{x:-a/2,y:-15,width:a,height:30,radius:15,stroke:n,lineWidth:3,fillOpacity:1},name:"rect-shape"});return s.addShape("circle",{attrs:{x:-a/2,y:0,r:3,fill:n},name:"circle-shape"}),s.addShape("circle",{attrs:{x:a/2,y:0,r:3,fill:n},name:"circle-shape2"}),d},getAnchorPoints:function(){return[[0,.5],[1,.5]]},update:function(t,s){const n=s.getContainer().get("children"),d=n[0],h=n[1],p=n[2],g=t.style.stroke;g&&(d.attr("stroke",g),h.attr("fill",g),p.attr("fill",g))}},"single-node");K("fund-polyline",{itemType:"edge",draw:function(t,s){const a=t.startPoint,n=t.endPoint,d=n.y-a.y,h=d!==0?Math.min(500/Math.abs(d),20):0,p=h>15?0:16,g=d<0?p:-p,y={x:a.x+h,y:n.y+g},u={x:y.x+p,y:n.y},A={x:(y.x-a.x)*(n.y-a.y)/(y.y-a.y)+a.x,y:n.y};let M=[["M",a.x,a.y],["L",y.x,y.y],["Q",A.x,A.y,u.x,u.y],["L",n.x,n.y]];Math.abs(d)<=5&&(M=[["M",a.x,a.y],["L",n.x,n.y]]);const T=(t==null?void 0:t.style)&&t.style.endArrow?t.style.endArrow:!1;U(T)&&(T.fill=stroke);const z=s.addShape("path",{attrs:{path:M,stroke:Z[t.data&&t.data.type],lineWidth:3,endArrow:T},name:"path-shape"}),b=0,G=8,J=s.addShape("text",{attrs:{text:t.data&&t.data.amount,x:u.x+b,y:n.y-G-2,fontSize:14,textAlign:"left",textBaseline:"middle",fill:"white"},name:"text-shape-amount"});return s.addShape("text",{attrs:{text:t.data&&t.data.type,x:u.x+b,y:n.y-G-J.getBBox().height-2,fontSize:10,textAlign:"left",textBaseline:"middle",fill:"white"},name:"text-shape-type"}),s.addShape("text",{attrs:{text:t.data&&t.data.date,x:u.x+b,y:n.y+G+4,fontSize:12,fontWeight:300,textAlign:"left",textBaseline:"middle",fill:"white"},name:"text-shape-date"}),z}});const v=document.createElement("div");v.style.width="1024px";v.style.height="1024px";v.style.position="absolute";v.style.opacity=0;v.className="g6-tree";document.body.appendChild(v);const I=new Y({container:v,layout:{type:"dagre",rankdir:"LR",nodesep:30,ranksep:100},fitView:!0,modes:{default:["drag-canvas"]},defaultNode:{type:"round-rect",labelCfg:{style:{fill:"white",fontSize:10}},style:{stroke:"#72CC4A",width:150}},defaultEdge:{type:"fund-polyline"}});I.data(ee);I.render();const k=["rgb(91, 143, 249)","rgb(90, 216, 166)","rgb(93, 112, 146)","rgb(246, 189, 22)","rgb(232, 104, 74)","rgb(109, 200, 236)","rgb(146, 112, 202)","rgb(255, 157, 77)","rgb(38, 154, 153)","rgb(227, 137, 163)"],x=document.createElement("div");x.style.width="1024px";x.style.height="1024px";x.style.position="absolute";x.style.opacity=0;x.className="g6-tree";document.body.appendChild(x);const m=new Y({container:x,linkCenter:!0,fitView:!0,modes:{default:[{type:"edge-tooltip",formatText:function(t){return"source: "+t.sourceName+"<br/> target: "+t.targetName}}]},defaultNode:{style:{opacity:.8,lineWidth:1,stroke:"#999"}},defaultEdge:{size:1,color:"#e2e2e2",style:{opacity:.6,lineAppendWidth:3}}});m.on("edge:mouseenter",function(e){const t=e.item;m.setItemState(t,"hover",!0)});m.on("edge:mouseleave",function(e){const t=e.item;m.setItemState(t,"hover",!1)});const te=1024,$=1024;fetch("https://gw.alipayobjects.com/os/basement_prod/70cde3be-22e8-4291-98f1-4d5a5b75b62f.json").then(e=>e.json()).then(e=>{const t=e.edges,s=e.nodes,a=new Map,n=new Map;let d=0;const h=s.length,p=10,g=[p,$*.7],y=[te-p,$*.7],u=y[0]-g[0],A=y[1]-g[1],M=u/h,T=A/h;s.forEach(function(o,C){o.x=g[0]+C*M,o.y=g[1]+C*T,a.set(o.id,o),o.cluster&&n.get(o.cluster)===void 0&&(n.set(o.cluster,d),d++);const O=n.get(o.cluster);o.style?o.style.fill=k[O%k.length]:o.style={fill:k[O%k.length]},o.label=o.name,o.labelCfg={position:"bottom",offset:5,style:{rotate:Math.PI/2,textAlign:"start",fill:"white"}}}),t.forEach(o=>{o.type="arc";const C=a.get(o.source),O=a.get(o.target),W=(O.x-C.x)/M,H=(W<0?-1:1)*10*Math.ceil(Math.abs(W));o.curveOffset=H,o.color=C.style.fill,o.sourceName=C.name,o.targetName=O.name});let z=-9999,b=9999;s.forEach(function(o){z<o.value&&(z=o.value),b>o.value&&(b=o.value)}),ae(s,"size","value",[b,z],[3,25]),m.data(e),m.render(),typeof window!="undefined"&&(window.onresize=()=>{!m||m.get("destroyed")||!container||!container.scrollWidth||!container.scrollHeight||m.changeSize(container.scrollWidth,container.scrollHeight)})});function ae(e,t,s,a,n){const d=n[1]-n[0],h=a[1]-a[0];e.forEach(function(p){p[t]=(p[s]-a[0])*d/h+n[0]})}const ne=new F({width:512,height:256,bgColor:"rgb(0, 0, 0)"}).draw(e=>{e.textBaseline="middle",e.textAlign="center",e.fillStyle="rgb(0, 255, 0)",e.font=" bold 54px \u5FAE\u8F6F\u96C5\u9ED1",e.fillText("\u6811\u67B6\u6784\u56FE\u8C31",256,128)}),oe=new F({width:512,height:256,bgColor:"rgb(0, 0, 0)"}).draw(e=>{e.textBaseline="middle",e.textAlign="center",e.fillStyle="rgb(0, 255, 0)",e.font=" bold 54px \u5FAE\u8F6F\u96C5\u9ED1",e.fillText("\u98DE\u7EBF\u67B6\u6784\u56FE\u8C31",256,128)}),se=new F({width:256,height:256,bgColor:"rgb(0, 0, 0)"}).draw(e=>{const t=e.createLinearGradient(0,0,0,256);t.addColorStop(0,"rgb(0, 0, 255)"),t.addColorStop(1,"rgb(0, 100, 0)"),e.fillStyle=t,e.fillRect(0,0,256,256)}),P=new Q().install("CSS3DRenderer").complete().setDom(document.getElementById("app")).setSize();P.registerResources({hookAlpha:se.getDom(),treeGraph:I.get("canvas").cfg.el,arcGraph:m.get("canvas").cfg.el,treeTips:ne.getDom(),arcTips:oe.getDom()});i.injectEngine=P;const ie=i("PerspectiveCamera",{far:1e4,position:{x:500,y:-300,z:500}});P.setCamera(ie.vid).setSize();const re=i("Scene");P.setScene(re.vid);i.injectScene=!0;i("AmbientLight");const le=70,N=70,r=le/2,c=10,f=N*2,de=i("CustomGeometry",{attribute:{position:[-r,0,-r,r,0,-r,r,0,r,-r,0,r,-r*c,f,-r*c,r*c,f,-r*c,r*c,f,r*c,-r*c,f,r*c],uv:[0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1],index:[0,4,5,5,1,0,1,5,6,6,2,1,2,6,7,7,3,2,3,7,4,4,0,3]},rotation:{x:Math.PI/2},position:{z:1}}),ce=i("CanvasTexture",{url:"hookAlpha"}),pe=i("MeshBasicMaterial",{color:"rgb(53, 193, 221)",side:_,alphaMap:ce.vid,transparent:!0}),R=i("Mesh",{geometry:de.vid,material:pe.vid,visible:!1}),V=i("PlaneGeometry",{width:100,height:50,rotation:{x:Math.PI/2}}),ge=i("CanvasTexture",{url:"treeTips"}),me=i("MeshBasicMaterial",{alphaMap:ge.vid,transparent:!0}),E=i("Mesh",{geometry:V.vid,material:me.vid,position:{z:f+10,y:-r*c+20,x:r*c-50},visible:!1}),j=i("CSS3DPlane",{element:"treeGraph",scale:{x:.7,y:.7,z:.7},position:{z:f+10},visible:!1}),he=i("CanvasTexture",{url:"arcTips"}),fe=i("MeshBasicMaterial",{alphaMap:he.vid,transparent:!0}),B=i("Mesh",{geometry:V.vid,material:fe.vid,position:{z:f+120,y:-r*c+20,x:r*c-50},visible:!1}),S=i("CSS3DPlane",{element:"arcGraph",scale:{x:.7,y:.7,z:.7},position:{z:f+120},visible:!1}),ye=i("Group",{children:[R.vid,E.vid,j.vid,B.vid,S.vid]}),D=6,w=10,L=5;for(let e=0;e<=D*w-1;e+=1){const t=document.createElement("div");t.className="app-brick",t.innerHTML=`<span class="title">title:${e}</span>
        <span class="tips">tips:${e}</span>`,document.body.appendChild(t),P.registerResources({[`dom${e}`]:t});const s=X(),a={x:w*(N+L)*(e%w/w)-w*(N+L)/2,y:D*(N+L)*(Math.floor(e/w)/D)-D*(N+L)/2,z:0};i("CSS3DPlane",{vid:s,element:`dom${e}`,position:a,click:[l.generateConfig("focusObject",{params:{target:s,space:"local",offset:{y:-850,z:500}}}),l.generateConfig("moveTo",{params:{target:ye.vid,position:{x:a.x,y:a.y,z:a.z},duration:0}}),l.generateConfig("moveFromTo",{params:{target:S.vid,to:{x:0,y:0,z:f+120},delay:500}}),l.generateConfig("moveFromTo",{params:{target:E.vid,to:JSON.parse(JSON.stringify(E.position)),delay:500}}),l.generateConfig("moveFromTo",{params:{target:j.vid,to:JSON.parse(JSON.stringify(j.position)),delay:500}}),l.generateConfig("moveFromTo",{params:{target:B.vid,to:JSON.parse(JSON.stringify(B.position)),delay:500}}),l.generateConfig("moveFromTo",{params:{target:S.vid,to:JSON.parse(JSON.stringify(S.position)),delay:500}}),l.generateConfig("fadeObject",{params:{target:R.vid,direction:"in",delay:500}}),l.generateConfig("fadeObject",{params:{target:B.vid,direction:"in",delay:500}}),l.generateConfig("visibleObject",{params:{target:S.vid,visible:!1}}),l.generateConfig("visibleObject",{params:{target:S.vid,visible:!0,delay:500}}),l.generateConfig("fadeObject",{params:{target:E.vid,direction:"in",delay:500}}),l.generateConfig("visibleObject",{params:{target:j.vid,visible:!1}}),l.generateConfig("visibleObject",{params:{target:j.vid,visible:!0,delay:500}}),l.generateConfig("addClass",{params:{target:s,className:"app-brick-focus"}}),l.generateConfig("addClass",{params:{target:"all",className:"app-brick-fade"}})]})}
