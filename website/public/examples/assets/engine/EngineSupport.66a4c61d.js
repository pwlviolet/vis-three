import{h as r,g as e}from"../Vis.es.fa503373.js";import"../three.b90fa353.js";import"../vis-three.78ccfae1.js";const s=new r().install("WebGLRenderer",{antialias:!0,alpha:!0}).install("ModelingScene",{hasDefaultPerspectiveCamera:!0,hasDefaultOrthographicCamera:!0,hasAxesHelper:!0,hasGridHelper:!0,hasDisplayMode:!0,displayMode:"env"}).install("RenderManager").install("Stats").install("EffectComposer",{WebGLMultisampleRenderTarget:!0}).install("OrbitControls").install("PointerManager").install("EventManager").install("TransformControls").complete().setDom(document.getElementById("app")).setSize().setStats(!0).play(),n=e("PointLight",{position:{x:30,y:50},distance:100}),t=e("MeshStandardMaterial",{color:"rgb(255, 0, 0)"}),a=e("BoxGeometry",{width:20,height:40,depth:60}),i=e("Model",{type:"Mesh",geometry:a.vid,material:t.vid});s.applyConfig(n,t,a,i);
