import { SymbolConfig } from "../common/CommonConfig";

export interface ControlsConfig extends SymbolConfig {}

export interface TransformControlsConfig extends ControlsConfig {
  axis: string
  enabled: boolean
  mode: string

  snapAllow: boolean // 是否开启步幅功能
  rotationSnap: number
  translationSnap: number
  scaleSnap: number
  
  showX: boolean
  showY: boolean
  showZ: boolean

  size: number

  space: string

}

export type ControlsAllConfig = TransformControlsConfig

export const getTransformControlsConfig = function (): TransformControlsConfig {
  return {
    vid: 'TransformControls',
    type: 'TransformControls',
    axis: 'XYZ',
    enabled: true,
    mode: 'translate',

    snapAllow: false,
    rotationSnap: Math.PI / 180 * 10,
    translationSnap: 5,
    scaleSnap: 0.1,
    
    showX: true,
    showY: true,
    showZ: true,

    size: 1,

    space: 'world'
  }
}