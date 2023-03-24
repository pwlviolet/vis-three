import { MeshPhysicalMaterial } from "three";
import { getMeshPhysicalMaterialConfig, } from "./MaterialConfig";
import { colorSetHandler, commonMapRegCommand, commonNeedUpdatesRegCommand, create, dispose, } from "./common";
import { defineProcessor } from "@vis-three/middleware";
export default defineProcessor({
    type: "MeshPhysicalMaterial",
    config: getMeshPhysicalMaterialConfig,
    commands: {
        set: {
            color: colorSetHandler,
            emissive: colorSetHandler,
            specularColor: colorSetHandler,
            sheenColor: colorSetHandler,
            attenuationColor: colorSetHandler,
            $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
        },
    },
    create: function (config, engine) {
        return create(new MeshPhysicalMaterial(), config, engine);
    },
    dispose,
});
