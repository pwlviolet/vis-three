import { createSymbol, isObjectType, OBJECTMODULE, generateConfig, EngineSupport } from "@vis-three/middleware";
import { isObject } from "@vis-three/utils";
import { shallowReactive, EffectScope, proxyRefs, ReactiveEffect, getCurrentScope, isRef, isShallow, isReactive } from "@vue/reactivity";
export { computed, reactive, ref, shallowReactive, shallowReadonly, shallowRef, toRef, toRefs } from "@vue/reactivity";
import { EventDispatcher, ENGINE_EVENT } from "@vis-three/core";
import { isFunction, isPromise, isArray, EMPTY_OBJ, NOOP, hasChanged, remove, isObject as isObject$1, isSet, isMap, isPlainObject } from "@vue/shared";
const version = "0.6.0";
const createVNode = function(type, props = null, options = {}) {
  return {
    _isVNode: true,
    type,
    props,
    config: null,
    component: null,
    el: null,
    key: options.key || null,
    ref: options.ref || null,
    raw: options.raw || null,
    children: null
  };
};
const isVNode = function(object) {
  if (typeof object === "object") {
    return Boolean(object["_isVNode"]);
  } else {
    return false;
  }
};
const isOnProp = function(key) {
  return /^on[A-Z]/.test(key);
};
const getOnProps = function(vnode) {
  const props = vnode.props;
  const onProps = {};
  for (const key in props) {
    if (isOnProp(key)) {
      onProps[key] = props[key];
    }
  }
  return onProps;
};
var RENDER_SCOPE = /* @__PURE__ */ ((RENDER_SCOPE2) => {
  RENDER_SCOPE2["STATIC"] = "static";
  RENDER_SCOPE2["VIF"] = "vif";
  RENDER_SCOPE2["VFOR"] = "vfor";
  return RENDER_SCOPE2;
})(RENDER_SCOPE || {});
const _h = function(type, props = null) {
  const vnode = createVNode(type, props, {
    key: props && props.key || null,
    ref: props && props.ref || null,
    raw: props && props.raw || null
  });
  _h.add(vnode);
  return vnode;
};
_h.reset = function() {
  _h.el = null;
  _h.scope = "static";
  _h.vnodes = [];
};
_h.add = function(vnode) {
  vnode.el = _h.el;
  if (_h.scope !== "static") {
    const scope = _h.vnodes[_h.vnodes.length - 1];
    if (_h.scope === "vfor") {
      if (!vnode.key) {
        vnode.key = scope.vnodes.length;
      }
      scope.keyMap.set(vnode.key, vnode);
    }
    scope.vnodes.push(vnode);
  } else {
    _h.vnodes.push(vnode);
  }
  return _h.vnodes;
};
const h = function(type, props = null) {
  return _h(type, props);
};
const vif = function(fun) {
  _h.scope = "vif";
  _h.vnodes.push({
    scope: _h.scope,
    vnodes: [],
    keyMap: /* @__PURE__ */ new Map()
  });
  fun();
  _h.scope = "static";
};
const vfor = function(fun) {
  _h.scope = "vfor";
  _h.vnodes.push({
    scope: _h.scope,
    vnodes: [],
    keyMap: /* @__PURE__ */ new Map()
  });
  fun();
  _h.scope = "static";
};
var LifeCycleHooks = /* @__PURE__ */ ((LifeCycleHooks2) => {
  LifeCycleHooks2["MOUNTED"] = "mounted";
  LifeCycleHooks2["BEFORE_DISTORY"] = "beforeDistory";
  LifeCycleHooks2["UPDATE"] = "update";
  LifeCycleHooks2["FRAME"] = "frame";
  LifeCycleHooks2["CAMERA_CHANGE"] = "cameraChange";
  LifeCycleHooks2["SCENE_CHANGE"] = "sceneCHange";
  return LifeCycleHooks2;
})(LifeCycleHooks || {});
const onMounted = function(fn = () => {
}) {
  Component.currentComponent && Component.currentComponent.on("mounted", (event) => fn());
};
const onBeforeDistory = function(fn = () => {
}) {
  Component.currentComponent && Component.currentComponent.on(
    "beforeDistory",
    (event) => fn()
  );
};
const onFrame = function(fn = () => {
}) {
  Component.currentComponent && Component.currentComponent.on("frame", (event) => fn(event));
};
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!Array.isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPostFlushCbs() {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs() {
  isFlushPending = false;
  isFlushing = true;
  queue.sort(comparator);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        try {
          job();
        } catch (err) {
          console.error(err);
        }
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
const EVENT_SYMBOL = Symbol.for("vis.widget.event");
const createInvoker = function(fn) {
  const invoker = function(event) {
    invoker.value(event);
  };
  invoker.value = fn;
  return invoker;
};
const eventOptionsReg = /Once$/;
function parseName(name) {
  let options = {};
  if (eventOptionsReg.test(name)) {
    options = {};
    let m;
    while (m = name.match(eventOptionsReg)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name.slice(2).toLowerCase();
  return [event, options];
}
const mountEvents = function(vnode, config, object) {
  if (config[EVENT_SYMBOL]) {
    console.error(`config has already create events`, config);
    return;
  }
  const eventProps = getOnProps(vnode);
  for (const key in eventProps) {
    eventProps[key] = createInvoker(eventProps[key]);
    const [name, options] = parseName(key);
    object.addEventListener(name, eventProps[key]);
  }
  config[EVENT_SYMBOL] = eventProps;
};
const updateEvents = function(vnode) {
  const props = vnode.props;
  const config = vnode.config;
  if (!config[EVENT_SYMBOL]) {
    return;
  }
  const events = config[EVENT_SYMBOL];
  for (const key in events) {
    const invoker = events[key];
    if (invoker && invoker.value !== props[key]) {
      invoker.value = props[key];
    }
  }
};
const unmountEvents = function(vnode, object) {
  const config = vnode.config;
  if (!config[EVENT_SYMBOL]) {
    return;
  }
  const events = config[EVENT_SYMBOL];
  for (const key in events) {
    const invoker = events[key];
    if (invoker) {
      const [name, options] = parseName(key);
      object.removeEventListener(name, invoker);
    }
  }
  config[EVENT_SYMBOL] = void 0;
};
class Component extends EventDispatcher {
  constructor(vnode, renderer) {
    super();
    this.cid = createSymbol();
    this.name = "";
    this.el = "";
    this.isMounted = false;
    this.props = shallowReactive(Object.create(Object.prototype));
    this.scope = new EffectScope(true);
    this.subTree = null;
    this.cacheResources = Object.create(Object.prototype);
    this.resourcesKeyEnum = Object.create(
      Object.prototype
    );
    this.cacheEvent = {};
    this.vnode = vnode;
    const options = vnode.type;
    options.name && (this.name = options.name);
    this.el = options.el;
    this.options = options;
    this.renderer = renderer;
    this.engine = renderer.engine;
    this.ctx = renderer.context;
    this.createProps();
    this.createSetup();
    this.createResources();
    this.createRender();
    this.createEffect();
  }
  static setCurrentComponent(component) {
    Component.currentComponent = component;
    component.scope.on();
  }
  static unsetCurrentComponent() {
    Component.currentComponent && Component.currentComponent.scope.off();
    Component.currentComponent = null;
  }
  renderTree() {
    _h.reset();
    _h.el = this.el;
    this.render.call(
      { ...this.setupState, ...this.props },
      {
        components: this.options.components || {},
        resources: this.resourcesKeyEnum
      }
    );
    let tree = _h.vnodes;
    return tree;
  }
  createResources() {
    if (!this.options.resources) {
      return;
    }
    const resources = this.options.resources.call(this.setupState);
    this.engine.registerResources(resources);
    this.cacheResources = resources;
    for (const key in resources) {
      this.resourcesKeyEnum[key] = key;
    }
  }
  createProps() {
    const propsOptions = this.options.props || {};
    const vnProps = this.vnode.props || {};
    const props = this.props;
    const emits = this.options.emits || {};
    const inputProps = {};
    for (const key in vnProps) {
      if (isOnProp(key)) {
        const [name, options] = parseName(key);
        if (emits[name]) {
          this[options.once ? "once" : "on"](name, vnProps[key]);
        } else {
          console.warn(
            `widget Component: you not declare attribute  ${key}  in emits options`,
            this.options
          );
        }
      } else {
        inputProps[key] = vnProps[key];
      }
    }
    for (const key in propsOptions) {
      const options = propsOptions[key];
      if (options.required && typeof inputProps[key] === "undefined") {
        console.error(`widget component: component prop is required.`, {
          component: this,
          props: inputProps,
          key
        });
        return;
      }
      let value;
      if (typeof inputProps[key] !== "undefined") {
        value = inputProps[key];
      } else if (options.default) {
        value = typeof options.default === "function" ? options.default() : options.default;
      }
      if (value.constructor !== options.type) {
        console.error(
          `widget component: component prop is not instance of type.`,
          {
            component: this,
            props: inputProps,
            key,
            value,
            type: options.type
          }
        );
        return;
      }
      props[key] = value;
    }
  }
  createSetup() {
    if (!this.options.setup) {
      return;
    }
    Component.setCurrentComponent(this);
    const setupResult = this.options.setup({
      engine: this.engine,
      props: this.props,
      emit: this.emit.bind(this)
    }) || {};
    this.setupState = proxyRefs(setupResult);
    this.rawSetupState = setupResult;
    Component.unsetCurrentComponent();
  }
  createRender() {
    this.render = this.options.render;
  }
  createEffect() {
    const effect = new ReactiveEffect(
      () => {
        if (!this.isMounted) {
          const setupState = this.rawSetupState;
          const matchRef = (vnode) => {
            if (!vnode.ref) {
              return;
            }
            if (typeof setupState[vnode.ref] !== "undefined") {
              setupState[vnode.ref].value = vnode.component ? vnode.component : vnode.config || null;
            }
          };
          const matchRaw = (vnode) => {
            if (!vnode.raw) {
              return;
            }
            if (typeof setupState[vnode.raw] !== "undefined") {
              if (vnode.config) {
                const raw2 = this.engine.getObjectBySymbol(vnode.config.vid);
                if (!raw2) {
                  console.warn(`can not found raw object in engine`, {
                    component: this,
                    vnode
                  });
                }
                setupState[vnode.raw].value = raw2 || null;
              } else {
                console.warn(`component raw object is not a native config`, {
                  component: this,
                  vnode
                });
                return;
              }
            }
          };
          const subTree = this.subTree = this.renderTree();
          for (const vnode of subTree) {
            if (isVNode(vnode)) {
              this.renderer.patch(null, vnode);
              matchRef(vnode);
              matchRaw(vnode);
            } else {
              for (const vn of vnode.vnodes) {
                this.renderer.patch(null, vn);
                matchRef(vn);
                matchRaw(vn);
              }
            }
          }
          this.isMounted = true;
          queuePostFlushCb(() => this.emit(LifeCycleHooks.MOUNTED));
          const frameEvent = (event) => {
            this.emit(LifeCycleHooks.FRAME, event);
          };
          this.engine.renderManager.addEventListener(
            ENGINE_EVENT.RENDER,
            frameEvent
          );
          this.cacheEvent[ENGINE_EVENT.RENDER] = frameEvent;
        } else {
          const nextTree = this.renderTree();
          const prevTree = this.subTree;
          if (prevTree.length !== nextTree.length) {
            console.error(`widget component render: tree render error`, {
              nextTree,
              prevTree
            });
            return;
          }
          for (let i = 0; i < nextTree.length; i += 1) {
            if (isVNode(prevTree[i]) && isVNode(nextTree[i])) {
              this.renderer.patch(prevTree[i], nextTree[i]);
            } else {
              const next = nextTree[i];
              const prev = prevTree[i];
              if (next.scope !== prev.scope) {
                console.error(`widget component render: tree render error`, {
                  nextTree,
                  prevTree
                });
                return;
              }
              if (next.scope === RENDER_SCOPE.VIF) {
                for (const vnode of prev.vnodes) {
                  this.renderer.patch(vnode, null);
                }
                for (const vnode of next.vnodes) {
                  this.renderer.patch(null, vnode);
                }
              } else if (next.scope === RENDER_SCOPE.VFOR) {
                for (const key of next.keyMap.keys()) {
                  if (prev.keyMap.has(key)) {
                    this.renderer.patch(
                      prev.keyMap.get(key),
                      next.keyMap.get(key)
                    );
                    prev.keyMap.delete(key);
                  } else {
                    this.renderer.patch(null, next.keyMap.get(key));
                  }
                }
                for (const vnode of prev.keyMap.values()) {
                  this.renderer.unmountElement(vnode);
                }
              } else {
                console.warn(
                  `widget component render: unknow scope type: ${next.scope}`
                );
              }
            }
          }
          this.subTree = nextTree;
        }
      },
      () => queueJob(update),
      this.scope
    );
    const update = () => effect.run();
    update();
    this.effect = effect;
    this.update = update;
  }
  distory() {
    this.engine.removeEventListener(
      ENGINE_EVENT.RENDER,
      this.cacheEvent[ENGINE_EVENT.RENDER]
    );
    this.emit(LifeCycleHooks.BEFORE_DISTORY);
    this.scope.stop();
    this.effect.active = false;
    this.effect.stop();
    const tree = this.subTree || [];
    for (let i = 0; i < tree.length; i += 1) {
      if (isVNode(tree[i])) {
        this.renderer.patch(tree[i], null);
        tree[i].config = null;
        tree[i].raw = null;
      } else {
        for (const vnode of tree[i].vnodes) {
          this.renderer.patch(vnode, null);
          vnode.config = null;
          vnode.raw = null;
        }
      }
    }
  }
  updateProps(newProps) {
    const props = this.props;
    for (const key in newProps) {
      props[key] = newProps[key];
    }
  }
  getState(raw2 = true) {
    return raw2 ? this.rawSetupState : this.setupState;
  }
}
const defineComponent = function(options) {
  return options;
};
const vnodePropConverter = (object) => {
  if (typeof object === "object") {
    if (isVNode(object)) {
      return object.config.vid;
    } else {
      for (const key in object) {
        object[key] = vnodePropConverter(object[key]);
      }
      return object;
    }
  } else {
    return object;
  }
};
class Renderer {
  constructor(ctx) {
    this.context = ctx;
    this.engine = ctx.engine;
  }
  log(type, msg, object) {
    if (!msg) {
      console.info(`Widget renderer: ${type}`);
    } else {
      console[type](`Widget renderer: ${msg}`, object);
    }
  }
  patch(oldVn, newVn) {
    if (!oldVn && !newVn) {
      console.error(`widget renderer: patch prarams all of null`);
      return;
    }
    if (oldVn === newVn) {
      return;
    }
    if (newVn && typeof newVn.type === "string" || oldVn && typeof oldVn.type === "string") {
      this.processElement(oldVn, newVn);
    } else {
      this.processComponent(oldVn, newVn);
    }
  }
  render(vnode) {
    this.patch(null, vnode);
  }
  processElement(oldVn, newVn) {
    if (!oldVn && !newVn) {
      console.error(`widget renderer: processElement prarams all of null`);
      return;
    }
    if (oldVn === null) {
      this.mountElement(newVn);
    } else if (newVn === null) {
      this.unmountElement(oldVn);
    } else {
      this.patchElement(oldVn, newVn);
    }
  }
  unmountElement(vnode) {
    if (isObjectType(vnode.type)) {
      if (vnode.config.parent) {
        const parentConfig = this.engine.getConfigfromModules(
          OBJECTMODULE,
          vnode.config.parent
        );
        if (!parentConfig) {
          console.error(
            "widget renderer: can not found parent config with: ",
            vnode
          );
          return;
        }
        parentConfig.children.splice(
          parentConfig.children.indexOf(
            vnode.config.vid
          ),
          1
        );
      } else if (!vnode.el) {
        const object2 = this.engine.getObjectBySymbol(
          vnode.config.vid
        );
        if (!object2) {
          console.error(
            "widget renderer: can not found Three object with: ",
            vnode
          );
        }
        object2.removeFromParent();
      }
      const object = this.engine.getObjectBySymbol(
        vnode.config.vid
      );
      unmountEvents(vnode, object);
    }
    this.engine.removeConfigBySymbol(vnode.config.vid);
  }
  mountElement(vnode) {
    const { element, onProps } = this.createElement(vnode);
    this.engine.applyConfig(element);
    if (isObjectType(element.type)) {
      if (!vnode.el) {
        this.engine.scene.add(
          this.engine.getObjectfromModules(OBJECTMODULE, element.vid)
        );
      } else {
        const parent = this.engine.getConfigfromModules(
          OBJECTMODULE,
          vnode.el
        );
        if (!parent) {
          console.error(
            `widget renderer: can not found parent config with: ${vnode.el}`
          );
          return;
        }
        parent.children.push(element.vid);
      }
      const object = this.engine.getObjectBySymbol(element.vid);
      mountEvents(vnode, element, object);
    }
  }
  patchElement(oldVn, newVn) {
    if (oldVn.type !== newVn.type) {
      this.unmountElement(oldVn);
      this.mountElement(newVn);
    } else {
      newVn.config = oldVn.config;
      const config = oldVn.config;
      if (!config) {
        console.error("widget renderer: can not found  config with: ", oldVn);
      }
      let oldProps = {};
      const newProps = newVn.props;
      let hasEvent = false;
      for (const key in oldVn.props) {
        if (isOnProp(key)) {
          hasEvent = true;
          continue;
        }
        oldProps[key] = oldVn.props[key];
      }
      const traverse2 = (props1, props2, target) => {
        for (const key in props1) {
          if (isVNode(props1[key])) {
            if (isVNode(props2[key]) && props2[key].config.vid !== props1[key].config.vid) {
              target[key] = props2[key].config.vid;
            } else if (!isVNode(props2[key])) {
              target[key] = props2[key];
            }
          } else if (isObject(props1[key])) {
            traverse2(props1[key], props2[key], target[key]);
          } else {
            if (props2[key] !== props1[key]) {
              target[key] = props2[key];
            }
          }
        }
      };
      traverse2(oldProps, newProps, config);
      hasEvent && updateEvents(newVn);
    }
  }
  createElement(vnode) {
    const props = vnode.props;
    const merge = {};
    const onProps = {};
    for (const key in props) {
      if (["ref", "index"].includes(key)) {
        continue;
      }
      if (isOnProp(key)) {
        onProps[key] = props[key];
      } else {
        merge[key] = vnodePropConverter(props[key]);
      }
    }
    const config = generateConfig(vnode.type, merge, {
      strict: false,
      warn: false
    });
    vnode.config = config;
    return { element: config, onProps };
  }
  processComponent(oldVn, newVn) {
    if (!oldVn && !newVn) {
      console.error(`widget renderer: processElement prarams all of null`);
      return;
    }
    if (oldVn === null) {
      this.mountComponent(newVn);
    } else if (newVn === null) {
      this.unmountComponent(oldVn);
    } else {
      this.patchComponent(oldVn, newVn);
    }
  }
  mountComponent(vnode) {
    vnode.component = new Component(vnode, this);
  }
  unmountComponent(vnode) {
    var _a;
    (_a = vnode.component) == null ? void 0 : _a.distory();
    vnode.component = null;
  }
  patchComponent(oldVn, newVn) {
    const component = oldVn.component;
    newVn.component = component;
    component.vnode = newVn;
    const oldProps = oldVn.props || {};
    const newProps = newVn.props || {};
    const updateProps = {};
    let needUpdate = false;
    for (const key in newProps) {
      if (newProps[key] !== oldProps[key]) {
        updateProps[key] = newProps[key];
        needUpdate = true;
      }
    }
    if (needUpdate) {
      component.updateProps(updateProps);
      component.update();
    }
  }
}
class Widget {
  constructor(engine, component) {
    this.wid = createSymbol();
    this.version = version;
    this.components = {};
    this.instance = null;
    this.engine = engine;
    this.root = component;
    this.renderer = new Renderer(this);
  }
  component(name, component) {
    if (typeof name === "object") {
      component = name;
      if (!component.name) {
        console.error(
          `widget register component must be provide a name`,
          component
        );
        return;
      }
      name = component.name;
    }
    if (!component) {
      console.error(
        `widget register component must be provide a component not a null`,
        name
      );
      return;
    }
    if (this.components[name]) {
      console.warn(`A component with this name already exists: ${name}`);
      return;
    }
    this.components[name] = component;
  }
  mount() {
    const vnode = createVNode(this.root);
    this.renderer.render(vnode);
    this.instance = vnode.component;
    return this;
  }
  getState() {
    var _a;
    return (_a = this.instance) == null ? void 0 : _a.getState(true);
  }
  unmount() {
    var _a;
    (_a = this.instance) == null ? void 0 : _a.distory();
  }
  use() {
  }
}
class EngineWidget extends EngineSupport {
  constructor(params = {}) {
    super(params);
  }
  createWidget(component) {
    return new Widget(this, component);
  }
}
const defineEngineWidget = function(options, params = {}) {
  const engine = new EngineWidget();
  if (options.modules) {
    options.modules.forEach((module) => {
      engine.registModule(module);
    });
  }
  if (options.plugins) {
    options.plugins.forEach((plugin) => {
      engine.install(plugin);
    });
  }
  if (options.strategy) {
    options.strategy.forEach((strategy) => {
      engine.exec(strategy);
    });
  }
  if (options.wdigets) {
    options.wdigets.forEach((widget) => {
      engine.createWidget(widget);
    });
  }
  return engine;
};
const raw = function(value) {
  return {
    value
  };
};
function callWithErrorHandling(fn, instance, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    console.error(err);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        console.error(err);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, args));
  }
  return values;
}
function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  var _a;
  const instance = getCurrentScope() === ((_a = Component.currentComponent) == null ? void 0 : _a.scope) ? Component.currentComponent : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source);
    } else {
      getter = () => {
        if (instance && !instance.isMounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance);
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn);
      cleanup = effect.onStop = void 0;
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostFlushCb(job);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.cid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostFlushCb(effect.run.bind(effect));
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  return unwatch;
}
function traverse(value, seen) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
export { EngineWidget, defineComponent, defineEngineWidget, h, onBeforeDistory, onFrame, onMounted, raw, vfor, vif, watch, watchEffect };
