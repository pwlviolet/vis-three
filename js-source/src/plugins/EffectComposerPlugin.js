import { RGBAFormat, Vector2, WebGLMultisampleRenderTarget, WebGLRenderTarget, } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
export const EffectComposerPlugin = function (params = {}) {
    if (this.effectComposer) {
        console.warn("this has installed effect composer plugin.");
        return false;
    }
    if (!this.webGLRenderer) {
        console.error("must install some renderer before this plugin.");
        return false;
    }
    let composer;
    if (params.WebGLMultisampleRenderTarget || params.MSAA) {
        const renderer = this.webGLRenderer;
        const pixelRatio = renderer.getPixelRatio();
        const size = renderer.getDrawingBufferSize(new Vector2());
        if (Number(window.__THREE__) > 137) {
            composer = new EffectComposer(renderer, new WebGLRenderTarget(size.width * pixelRatio, size.height * pixelRatio, {
                format: params.format || RGBAFormat,
                // @ts-ignore
                samples: params.samples || 4,
            }));
        }
        else {
            composer = new EffectComposer(renderer, new WebGLMultisampleRenderTarget(size.width * pixelRatio, size.height * pixelRatio, {
                format: params.format || RGBAFormat,
            }));
        }
    }
    else {
        composer = new EffectComposer(this.webGLRenderer);
    }
    this.effectComposer = composer;
    let renderPass;
    if (this.scene && this.camera) {
        renderPass = new RenderPass(this.scene, this.camera);
        composer.addPass(renderPass);
    }
    this.addEventListener("setCamera", (event) => {
        if (!renderPass && this.scene) {
            renderPass = new RenderPass(this.scene, event.camera);
            composer.addPass(renderPass);
            return;
        }
        else if (renderPass) {
            renderPass.camera = event.camera;
        }
    });
    this.addEventListener("setScene", (event) => {
        if (!renderPass && this.camera) {
            renderPass = new RenderPass(event.scene, this.camera);
            composer.addPass(renderPass);
            return;
        }
        else if (renderPass) {
            renderPass.scene = event.scene;
        }
    });
    this.addEventListener("setSize", (event) => {
        composer.setSize(event.width, event.height);
    });
    if (this.renderManager) {
        this.renderManager.removeEventListener("render", this.render);
        this.renderManager.addEventListener("render", (event) => {
            this.effectComposer.render(event.delta);
        });
    }
    else {
        this.render = function () {
            this.effectComposer.render();
            return this;
        };
    }
    return true;
};
//# sourceMappingURL=EffectComposerPlugin.js.map