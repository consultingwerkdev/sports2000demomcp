/*!
  * Bootstrap v5.3.8 (https://getbootstrap.com/)
  * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!(function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e();
})(this, function() {
  "use strict";
  const t = /* @__PURE__ */ new Map(), e = { set(e2, i2, n2) {
    t.has(e2) || t.set(e2, /* @__PURE__ */ new Map());
    const s2 = t.get(e2);
    s2.has(i2) || 0 === s2.size ? s2.set(i2, n2) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s2.keys())[0]}.`);
  }, get: (e2, i2) => t.has(e2) && t.get(e2).get(i2) || null, remove(e2, i2) {
    if (!t.has(e2)) return;
    const n2 = t.get(e2);
    n2.delete(i2), 0 === n2.size && t.delete(e2);
  } }, i = "transitionend", n = (t2) => (t2 && window.CSS && window.CSS.escape && (t2 = t2.replace(/#([^\s"#']+)/g, (t3, e2) => `#${CSS.escape(e2)}`)), t2), s = (t2) => null == t2 ? `${t2}` : Object.prototype.toString.call(t2).match(/\s([a-z]+)/i)[1].toLowerCase(), o = (t2) => {
    t2.dispatchEvent(new Event(i));
  }, r = (t2) => !(!t2 || "object" != typeof t2) && (void 0 !== t2.jquery && (t2 = t2[0]), void 0 !== t2.nodeType), a = (t2) => r(t2) ? t2.jquery ? t2[0] : t2 : "string" == typeof t2 && t2.length > 0 ? document.querySelector(n(t2)) : null, l = (t2) => {
    if (!r(t2) || 0 === t2.getClientRects().length) return false;
    const e2 = "visible" === getComputedStyle(t2).getPropertyValue("visibility"), i2 = t2.closest("details:not([open])");
    if (!i2) return e2;
    if (i2 !== t2) {
      const e3 = t2.closest("summary");
      if (e3 && e3.parentNode !== i2) return false;
      if (null === e3) return false;
    }
    return e2;
  }, c = (t2) => !t2 || t2.nodeType !== Node.ELEMENT_NODE || !!t2.classList.contains("disabled") || (void 0 !== t2.disabled ? t2.disabled : t2.hasAttribute("disabled") && "false" !== t2.getAttribute("disabled")), h = (t2) => {
    if (!document.documentElement.attachShadow) return null;
    if ("function" == typeof t2.getRootNode) {
      const e2 = t2.getRootNode();
      return e2 instanceof ShadowRoot ? e2 : null;
    }
    return t2 instanceof ShadowRoot ? t2 : t2.parentNode ? h(t2.parentNode) : null;
  }, d = () => {
  }, u = (t2) => {
    t2.offsetHeight;
  }, f = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, p = [], m = () => "rtl" === document.documentElement.dir, g = (t2) => {
    var e2;
    e2 = () => {
      const e3 = f();
      if (e3) {
        const i2 = t2.NAME, n2 = e3.fn[i2];
        e3.fn[i2] = t2.jQueryInterface, e3.fn[i2].Constructor = t2, e3.fn[i2].noConflict = () => (e3.fn[i2] = n2, t2.jQueryInterface);
      }
    }, "loading" === document.readyState ? (p.length || document.addEventListener("DOMContentLoaded", () => {
      for (const t3 of p) t3();
    }), p.push(e2)) : e2();
  }, _ = (t2, e2 = [], i2 = t2) => "function" == typeof t2 ? t2.call(...e2) : i2, b = (t2, e2, n2 = true) => {
    if (!n2) return void _(t2);
    const s2 = ((t3) => {
      if (!t3) return 0;
      let { transitionDuration: e3, transitionDelay: i2 } = window.getComputedStyle(t3);
      const n3 = Number.parseFloat(e3), s3 = Number.parseFloat(i2);
      return n3 || s3 ? (e3 = e3.split(",")[0], i2 = i2.split(",")[0], 1e3 * (Number.parseFloat(e3) + Number.parseFloat(i2))) : 0;
    })(e2) + 5;
    let r2 = false;
    const a2 = ({ target: n3 }) => {
      n3 === e2 && (r2 = true, e2.removeEventListener(i, a2), _(t2));
    };
    e2.addEventListener(i, a2), setTimeout(() => {
      r2 || o(e2);
    }, s2);
  }, v = (t2, e2, i2, n2) => {
    const s2 = t2.length;
    let o2 = t2.indexOf(e2);
    return -1 === o2 ? !i2 && n2 ? t2[s2 - 1] : t2[0] : (o2 += i2 ? 1 : -1, n2 && (o2 = (o2 + s2) % s2), t2[Math.max(0, Math.min(o2, s2 - 1))]);
  }, y = /[^.]*(?=\..*)\.|.*/, w = /\..*/, A = /::\d+$/, E = {};
  let T = 1;
  const C = { mouseenter: "mouseover", mouseleave: "mouseout" }, O = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
  function x(t2, e2) {
    return e2 && `${e2}::${T++}` || t2.uidEvent || T++;
  }
  function k(t2) {
    const e2 = x(t2);
    return t2.uidEvent = e2, E[e2] = E[e2] || {}, E[e2];
  }
  function L(t2, e2, i2 = null) {
    return Object.values(t2).find((t3) => t3.callable === e2 && t3.delegationSelector === i2);
  }
  function S(t2, e2, i2) {
    const n2 = "string" == typeof e2, s2 = n2 ? i2 : e2 || i2;
    let o2 = N(t2);
    return O.has(o2) || (o2 = t2), [n2, s2, o2];
  }
  function D(t2, e2, i2, n2, s2) {
    if ("string" != typeof e2 || !t2) return;
    let [o2, r2, a2] = S(e2, i2, n2);
    if (e2 in C) {
      const t3 = (t4) => function(e3) {
        if (!e3.relatedTarget || e3.relatedTarget !== e3.delegateTarget && !e3.delegateTarget.contains(e3.relatedTarget)) return t4.call(this, e3);
      };
      r2 = t3(r2);
    }
    const l2 = k(t2), c2 = l2[a2] || (l2[a2] = {}), h2 = L(c2, r2, o2 ? i2 : null);
    if (h2) return void (h2.oneOff = h2.oneOff && s2);
    const d2 = x(r2, e2.replace(y, "")), u2 = o2 ? /* @__PURE__ */ (function(t3, e3, i3) {
      return function n3(s3) {
        const o3 = t3.querySelectorAll(e3);
        for (let { target: r3 } = s3; r3 && r3 !== this; r3 = r3.parentNode) for (const a3 of o3) if (a3 === r3) return j(s3, { delegateTarget: r3 }), n3.oneOff && P.off(t3, s3.type, e3, i3), i3.apply(r3, [s3]);
      };
    })(t2, i2, r2) : /* @__PURE__ */ (function(t3, e3) {
      return function i3(n3) {
        return j(n3, { delegateTarget: t3 }), i3.oneOff && P.off(t3, n3.type, e3), e3.apply(t3, [n3]);
      };
    })(t2, r2);
    u2.delegationSelector = o2 ? i2 : null, u2.callable = r2, u2.oneOff = s2, u2.uidEvent = d2, c2[d2] = u2, t2.addEventListener(a2, u2, o2);
  }
  function $(t2, e2, i2, n2, s2) {
    const o2 = L(e2[i2], n2, s2);
    o2 && (t2.removeEventListener(i2, o2, Boolean(s2)), delete e2[i2][o2.uidEvent]);
  }
  function I(t2, e2, i2, n2) {
    const s2 = e2[i2] || {};
    for (const [o2, r2] of Object.entries(s2)) o2.includes(n2) && $(t2, e2, i2, r2.callable, r2.delegationSelector);
  }
  function N(t2) {
    return t2 = t2.replace(w, ""), C[t2] || t2;
  }
  const P = { on(t2, e2, i2, n2) {
    D(t2, e2, i2, n2, false);
  }, one(t2, e2, i2, n2) {
    D(t2, e2, i2, n2, true);
  }, off(t2, e2, i2, n2) {
    if ("string" != typeof e2 || !t2) return;
    const [s2, o2, r2] = S(e2, i2, n2), a2 = r2 !== e2, l2 = k(t2), c2 = l2[r2] || {}, h2 = e2.startsWith(".");
    if (void 0 === o2) {
      if (h2) for (const i3 of Object.keys(l2)) I(t2, l2, i3, e2.slice(1));
      for (const [i3, n3] of Object.entries(c2)) {
        const s3 = i3.replace(A, "");
        a2 && !e2.includes(s3) || $(t2, l2, r2, n3.callable, n3.delegationSelector);
      }
    } else {
      if (!Object.keys(c2).length) return;
      $(t2, l2, r2, o2, s2 ? i2 : null);
    }
  }, trigger(t2, e2, i2) {
    if ("string" != typeof e2 || !t2) return null;
    const n2 = f();
    let s2 = null, o2 = true, r2 = true, a2 = false;
    e2 !== N(e2) && n2 && (s2 = n2.Event(e2, i2), n2(t2).trigger(s2), o2 = !s2.isPropagationStopped(), r2 = !s2.isImmediatePropagationStopped(), a2 = s2.isDefaultPrevented());
    const l2 = j(new Event(e2, { bubbles: o2, cancelable: true }), i2);
    return a2 && l2.preventDefault(), r2 && t2.dispatchEvent(l2), l2.defaultPrevented && s2 && s2.preventDefault(), l2;
  } };
  function j(t2, e2 = {}) {
    for (const [i2, n2] of Object.entries(e2)) try {
      t2[i2] = n2;
    } catch (e3) {
      Object.defineProperty(t2, i2, { configurable: true, get: () => n2 });
    }
    return t2;
  }
  function M(t2) {
    if ("true" === t2) return true;
    if ("false" === t2) return false;
    if (t2 === Number(t2).toString()) return Number(t2);
    if ("" === t2 || "null" === t2) return null;
    if ("string" != typeof t2) return t2;
    try {
      return JSON.parse(decodeURIComponent(t2));
    } catch (e2) {
      return t2;
    }
  }
  function F(t2) {
    return t2.replace(/[A-Z]/g, (t3) => `-${t3.toLowerCase()}`);
  }
  const H = { setDataAttribute(t2, e2, i2) {
    t2.setAttribute(`data-bs-${F(e2)}`, i2);
  }, removeDataAttribute(t2, e2) {
    t2.removeAttribute(`data-bs-${F(e2)}`);
  }, getDataAttributes(t2) {
    if (!t2) return {};
    const e2 = {}, i2 = Object.keys(t2.dataset).filter((t3) => t3.startsWith("bs") && !t3.startsWith("bsConfig"));
    for (const n2 of i2) {
      let i3 = n2.replace(/^bs/, "");
      i3 = i3.charAt(0).toLowerCase() + i3.slice(1), e2[i3] = M(t2.dataset[n2]);
    }
    return e2;
  }, getDataAttribute: (t2, e2) => M(t2.getAttribute(`data-bs-${F(e2)}`)) };
  class W {
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(t2) {
      return t2 = this._mergeConfigObj(t2), t2 = this._configAfterMerge(t2), this._typeCheckConfig(t2), t2;
    }
    _configAfterMerge(t2) {
      return t2;
    }
    _mergeConfigObj(t2, e2) {
      const i2 = r(e2) ? H.getDataAttribute(e2, "config") : {};
      return { ...this.constructor.Default, ..."object" == typeof i2 ? i2 : {}, ...r(e2) ? H.getDataAttributes(e2) : {}, ..."object" == typeof t2 ? t2 : {} };
    }
    _typeCheckConfig(t2, e2 = this.constructor.DefaultType) {
      for (const [i2, n2] of Object.entries(e2)) {
        const e3 = t2[i2], o2 = r(e3) ? "element" : s(e3);
        if (!new RegExp(n2).test(o2)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${i2}" provided type "${o2}" but expected type "${n2}".`);
      }
    }
  }
  class B extends W {
    constructor(t2, i2) {
      super(), (t2 = a(t2)) && (this._element = t2, this._config = this._getConfig(i2), e.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
      e.remove(this._element, this.constructor.DATA_KEY), P.off(this._element, this.constructor.EVENT_KEY);
      for (const t2 of Object.getOwnPropertyNames(this)) this[t2] = null;
    }
    _queueCallback(t2, e2, i2 = true) {
      b(t2, e2, i2);
    }
    _getConfig(t2) {
      return t2 = this._mergeConfigObj(t2, this._element), t2 = this._configAfterMerge(t2), this._typeCheckConfig(t2), t2;
    }
    static getInstance(t2) {
      return e.get(a(t2), this.DATA_KEY);
    }
    static getOrCreateInstance(t2, e2 = {}) {
      return this.getInstance(t2) || new this(t2, "object" == typeof e2 ? e2 : null);
    }
    static get VERSION() {
      return "5.3.8";
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(t2) {
      return `${t2}${this.EVENT_KEY}`;
    }
  }
  const z = (t2) => {
    let e2 = t2.getAttribute("data-bs-target");
    if (!e2 || "#" === e2) {
      let i2 = t2.getAttribute("href");
      if (!i2 || !i2.includes("#") && !i2.startsWith(".")) return null;
      i2.includes("#") && !i2.startsWith("#") && (i2 = `#${i2.split("#")[1]}`), e2 = i2 && "#" !== i2 ? i2.trim() : null;
    }
    return e2 ? e2.split(",").map((t3) => n(t3)).join(",") : null;
  }, R = { find: (t2, e2 = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e2, t2)), findOne: (t2, e2 = document.documentElement) => Element.prototype.querySelector.call(e2, t2), children: (t2, e2) => [].concat(...t2.children).filter((t3) => t3.matches(e2)), parents(t2, e2) {
    const i2 = [];
    let n2 = t2.parentNode.closest(e2);
    for (; n2; ) i2.push(n2), n2 = n2.parentNode.closest(e2);
    return i2;
  }, prev(t2, e2) {
    let i2 = t2.previousElementSibling;
    for (; i2; ) {
      if (i2.matches(e2)) return [i2];
      i2 = i2.previousElementSibling;
    }
    return [];
  }, next(t2, e2) {
    let i2 = t2.nextElementSibling;
    for (; i2; ) {
      if (i2.matches(e2)) return [i2];
      i2 = i2.nextElementSibling;
    }
    return [];
  }, focusableChildren(t2) {
    const e2 = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((t3) => `${t3}:not([tabindex^="-"])`).join(",");
    return this.find(e2, t2).filter((t3) => !c(t3) && l(t3));
  }, getSelectorFromElement(t2) {
    const e2 = z(t2);
    return e2 && R.findOne(e2) ? e2 : null;
  }, getElementFromSelector(t2) {
    const e2 = z(t2);
    return e2 ? R.findOne(e2) : null;
  }, getMultipleElementsFromSelector(t2) {
    const e2 = z(t2);
    return e2 ? R.find(e2) : [];
  } }, q = (t2, e2 = "hide") => {
    const i2 = `click.dismiss${t2.EVENT_KEY}`, n2 = t2.NAME;
    P.on(document, i2, `[data-bs-dismiss="${n2}"]`, function(i3) {
      if (["A", "AREA"].includes(this.tagName) && i3.preventDefault(), c(this)) return;
      const s2 = R.getElementFromSelector(this) || this.closest(`.${n2}`);
      t2.getOrCreateInstance(s2)[e2]();
    });
  }, V = ".bs.alert", K = `close${V}`, Q = `closed${V}`;
  class X extends B {
    static get NAME() {
      return "alert";
    }
    close() {
      if (P.trigger(this._element, K).defaultPrevented) return;
      this._element.classList.remove("show");
      const t2 = this._element.classList.contains("fade");
      this._queueCallback(() => this._destroyElement(), this._element, t2);
    }
    _destroyElement() {
      this._element.remove(), P.trigger(this._element, Q), this.dispose();
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = X.getOrCreateInstance(this);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
          e2[t2](this);
        }
      });
    }
  }
  q(X, "close"), g(X);
  const Y = '[data-bs-toggle="button"]';
  class U extends B {
    static get NAME() {
      return "button";
    }
    toggle() {
      this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"));
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = U.getOrCreateInstance(this);
        "toggle" === t2 && e2[t2]();
      });
    }
  }
  P.on(document, "click.bs.button.data-api", Y, (t2) => {
    t2.preventDefault();
    const e2 = t2.target.closest(Y);
    U.getOrCreateInstance(e2).toggle();
  }), g(U);
  const G = ".bs.swipe", J = `touchstart${G}`, Z = `touchmove${G}`, tt = `touchend${G}`, et = `pointerdown${G}`, it = `pointerup${G}`, nt = { endCallback: null, leftCallback: null, rightCallback: null }, st = { endCallback: "(function|null)", leftCallback: "(function|null)", rightCallback: "(function|null)" };
  class ot extends W {
    constructor(t2, e2) {
      super(), this._element = t2, t2 && ot.isSupported() && (this._config = this._getConfig(e2), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents());
    }
    static get Default() {
      return nt;
    }
    static get DefaultType() {
      return st;
    }
    static get NAME() {
      return "swipe";
    }
    dispose() {
      P.off(this._element, G);
    }
    _start(t2) {
      this._supportPointerEvents ? this._eventIsPointerPenTouch(t2) && (this._deltaX = t2.clientX) : this._deltaX = t2.touches[0].clientX;
    }
    _end(t2) {
      this._eventIsPointerPenTouch(t2) && (this._deltaX = t2.clientX - this._deltaX), this._handleSwipe(), _(this._config.endCallback);
    }
    _move(t2) {
      this._deltaX = t2.touches && t2.touches.length > 1 ? 0 : t2.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const t2 = Math.abs(this._deltaX);
      if (t2 <= 40) return;
      const e2 = t2 / this._deltaX;
      this._deltaX = 0, e2 && _(e2 > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      this._supportPointerEvents ? (P.on(this._element, et, (t2) => this._start(t2)), P.on(this._element, it, (t2) => this._end(t2)), this._element.classList.add("pointer-event")) : (P.on(this._element, J, (t2) => this._start(t2)), P.on(this._element, Z, (t2) => this._move(t2)), P.on(this._element, tt, (t2) => this._end(t2)));
    }
    _eventIsPointerPenTouch(t2) {
      return this._supportPointerEvents && ("pen" === t2.pointerType || "touch" === t2.pointerType);
    }
    static isSupported() {
      return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
    }
  }
  const rt = ".bs.carousel", at = ".data-api", lt = "ArrowLeft", ct = "ArrowRight", ht = "next", dt = "prev", ut = "left", ft = "right", pt = `slide${rt}`, mt = `slid${rt}`, gt = `keydown${rt}`, _t = `mouseenter${rt}`, bt = `mouseleave${rt}`, vt = `dragstart${rt}`, yt = `load${rt}${at}`, wt = `click${rt}${at}`, At = "carousel", Et = "active", Tt = ".active", Ct = ".carousel-item", Ot = Tt + Ct, xt = { [lt]: ft, [ct]: ut }, kt = { interval: 5e3, keyboard: true, pause: "hover", ride: false, touch: true, wrap: true }, Lt = { interval: "(number|boolean)", keyboard: "boolean", pause: "(string|boolean)", ride: "(boolean|string)", touch: "boolean", wrap: "boolean" };
  class St extends B {
    constructor(t2, e2) {
      super(t2, e2), this._interval = null, this._activeElement = null, this._isSliding = false, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = R.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride === At && this.cycle();
    }
    static get Default() {
      return kt;
    }
    static get DefaultType() {
      return Lt;
    }
    static get NAME() {
      return "carousel";
    }
    next() {
      this._slide(ht);
    }
    nextWhenVisible() {
      !document.hidden && l(this._element) && this.next();
    }
    prev() {
      this._slide(dt);
    }
    pause() {
      this._isSliding && o(this._element), this._clearInterval();
    }
    cycle() {
      this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    }
    _maybeEnableCycle() {
      this._config.ride && (this._isSliding ? P.one(this._element, mt, () => this.cycle()) : this.cycle());
    }
    to(t2) {
      const e2 = this._getItems();
      if (t2 > e2.length - 1 || t2 < 0) return;
      if (this._isSliding) return void P.one(this._element, mt, () => this.to(t2));
      const i2 = this._getItemIndex(this._getActive());
      if (i2 === t2) return;
      const n2 = t2 > i2 ? ht : dt;
      this._slide(n2, e2[t2]);
    }
    dispose() {
      this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
    }
    _configAfterMerge(t2) {
      return t2.defaultInterval = t2.interval, t2;
    }
    _addEventListeners() {
      this._config.keyboard && P.on(this._element, gt, (t2) => this._keydown(t2)), "hover" === this._config.pause && (P.on(this._element, _t, () => this.pause()), P.on(this._element, bt, () => this._maybeEnableCycle())), this._config.touch && ot.isSupported() && this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
      for (const t3 of R.find(".carousel-item img", this._element)) P.on(t3, vt, (t4) => t4.preventDefault());
      const t2 = { leftCallback: () => this._slide(this._directionToOrder(ut)), rightCallback: () => this._slide(this._directionToOrder(ft)), endCallback: () => {
        "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), 500 + this._config.interval));
      } };
      this._swipeHelper = new ot(this._element, t2);
    }
    _keydown(t2) {
      if (/input|textarea/i.test(t2.target.tagName)) return;
      const e2 = xt[t2.key];
      e2 && (t2.preventDefault(), this._slide(this._directionToOrder(e2)));
    }
    _getItemIndex(t2) {
      return this._getItems().indexOf(t2);
    }
    _setActiveIndicatorElement(t2) {
      if (!this._indicatorsElement) return;
      const e2 = R.findOne(Tt, this._indicatorsElement);
      e2.classList.remove(Et), e2.removeAttribute("aria-current");
      const i2 = R.findOne(`[data-bs-slide-to="${t2}"]`, this._indicatorsElement);
      i2 && (i2.classList.add(Et), i2.setAttribute("aria-current", "true"));
    }
    _updateInterval() {
      const t2 = this._activeElement || this._getActive();
      if (!t2) return;
      const e2 = Number.parseInt(t2.getAttribute("data-bs-interval"), 10);
      this._config.interval = e2 || this._config.defaultInterval;
    }
    _slide(t2, e2 = null) {
      if (this._isSliding) return;
      const i2 = this._getActive(), n2 = t2 === ht, s2 = e2 || v(this._getItems(), i2, n2, this._config.wrap);
      if (s2 === i2) return;
      const o2 = this._getItemIndex(s2), r2 = (e3) => P.trigger(this._element, e3, { relatedTarget: s2, direction: this._orderToDirection(t2), from: this._getItemIndex(i2), to: o2 });
      if (r2(pt).defaultPrevented) return;
      if (!i2 || !s2) return;
      const a2 = Boolean(this._interval);
      this.pause(), this._isSliding = true, this._setActiveIndicatorElement(o2), this._activeElement = s2;
      const l2 = n2 ? "carousel-item-start" : "carousel-item-end", c2 = n2 ? "carousel-item-next" : "carousel-item-prev";
      s2.classList.add(c2), u(s2), i2.classList.add(l2), s2.classList.add(l2), this._queueCallback(() => {
        s2.classList.remove(l2, c2), s2.classList.add(Et), i2.classList.remove(Et, c2, l2), this._isSliding = false, r2(mt);
      }, i2, this._isAnimated()), a2 && this.cycle();
    }
    _isAnimated() {
      return this._element.classList.contains("slide");
    }
    _getActive() {
      return R.findOne(Ot, this._element);
    }
    _getItems() {
      return R.find(Ct, this._element);
    }
    _clearInterval() {
      this._interval && (clearInterval(this._interval), this._interval = null);
    }
    _directionToOrder(t2) {
      return m() ? t2 === ut ? dt : ht : t2 === ut ? ht : dt;
    }
    _orderToDirection(t2) {
      return m() ? t2 === dt ? ut : ft : t2 === dt ? ft : ut;
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = St.getOrCreateInstance(this, t2);
        if ("number" != typeof t2) {
          if ("string" == typeof t2) {
            if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
            e2[t2]();
          }
        } else e2.to(t2);
      });
    }
  }
  P.on(document, wt, "[data-bs-slide], [data-bs-slide-to]", function(t2) {
    const e2 = R.getElementFromSelector(this);
    if (!e2 || !e2.classList.contains(At)) return;
    t2.preventDefault();
    const i2 = St.getOrCreateInstance(e2), n2 = this.getAttribute("data-bs-slide-to");
    return n2 ? (i2.to(n2), void i2._maybeEnableCycle()) : "next" === H.getDataAttribute(this, "slide") ? (i2.next(), void i2._maybeEnableCycle()) : (i2.prev(), void i2._maybeEnableCycle());
  }), P.on(window, yt, () => {
    const t2 = R.find('[data-bs-ride="carousel"]');
    for (const e2 of t2) St.getOrCreateInstance(e2);
  }), g(St);
  const Dt = ".bs.collapse", $t = `show${Dt}`, It = `shown${Dt}`, Nt = `hide${Dt}`, Pt = `hidden${Dt}`, jt = `click${Dt}.data-api`, Mt = "show", Ft = "collapse", Ht = "collapsing", Wt = `:scope .${Ft} .${Ft}`, Bt = '[data-bs-toggle="collapse"]', zt = { parent: null, toggle: true }, Rt = { parent: "(null|element)", toggle: "boolean" };
  class qt extends B {
    constructor(t2, e2) {
      super(t2, e2), this._isTransitioning = false, this._triggerArray = [];
      const i2 = R.find(Bt);
      for (const t3 of i2) {
        const e3 = R.getSelectorFromElement(t3), i3 = R.find(e3).filter((t4) => t4 === this._element);
        null !== e3 && i3.length && this._triggerArray.push(t3);
      }
      this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
    }
    static get Default() {
      return zt;
    }
    static get DefaultType() {
      return Rt;
    }
    static get NAME() {
      return "collapse";
    }
    toggle() {
      this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || this._isShown()) return;
      let t2 = [];
      if (this._config.parent && (t2 = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter((t3) => t3 !== this._element).map((t3) => qt.getOrCreateInstance(t3, { toggle: false }))), t2.length && t2[0]._isTransitioning) return;
      if (P.trigger(this._element, $t).defaultPrevented) return;
      for (const e3 of t2) e3.hide();
      const e2 = this._getDimension();
      this._element.classList.remove(Ft), this._element.classList.add(Ht), this._element.style[e2] = 0, this._addAriaAndCollapsedClass(this._triggerArray, true), this._isTransitioning = true;
      const i2 = `scroll${e2[0].toUpperCase() + e2.slice(1)}`;
      this._queueCallback(() => {
        this._isTransitioning = false, this._element.classList.remove(Ht), this._element.classList.add(Ft, Mt), this._element.style[e2] = "", P.trigger(this._element, It);
      }, this._element, true), this._element.style[e2] = `${this._element[i2]}px`;
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) return;
      if (P.trigger(this._element, Nt).defaultPrevented) return;
      const t2 = this._getDimension();
      this._element.style[t2] = `${this._element.getBoundingClientRect()[t2]}px`, u(this._element), this._element.classList.add(Ht), this._element.classList.remove(Ft, Mt);
      for (const t3 of this._triggerArray) {
        const e2 = R.getElementFromSelector(t3);
        e2 && !this._isShown(e2) && this._addAriaAndCollapsedClass([t3], false);
      }
      this._isTransitioning = true, this._element.style[t2] = "", this._queueCallback(() => {
        this._isTransitioning = false, this._element.classList.remove(Ht), this._element.classList.add(Ft), P.trigger(this._element, Pt);
      }, this._element, true);
    }
    _isShown(t2 = this._element) {
      return t2.classList.contains(Mt);
    }
    _configAfterMerge(t2) {
      return t2.toggle = Boolean(t2.toggle), t2.parent = a(t2.parent), t2;
    }
    _getDimension() {
      return this._element.classList.contains("collapse-horizontal") ? "width" : "height";
    }
    _initializeChildren() {
      if (!this._config.parent) return;
      const t2 = this._getFirstLevelChildren(Bt);
      for (const e2 of t2) {
        const t3 = R.getElementFromSelector(e2);
        t3 && this._addAriaAndCollapsedClass([e2], this._isShown(t3));
      }
    }
    _getFirstLevelChildren(t2) {
      const e2 = R.find(Wt, this._config.parent);
      return R.find(t2, this._config.parent).filter((t3) => !e2.includes(t3));
    }
    _addAriaAndCollapsedClass(t2, e2) {
      if (t2.length) for (const i2 of t2) i2.classList.toggle("collapsed", !e2), i2.setAttribute("aria-expanded", e2);
    }
    static jQueryInterface(t2) {
      const e2 = {};
      return "string" == typeof t2 && /show|hide/.test(t2) && (e2.toggle = false), this.each(function() {
        const i2 = qt.getOrCreateInstance(this, e2);
        if ("string" == typeof t2) {
          if (void 0 === i2[t2]) throw new TypeError(`No method named "${t2}"`);
          i2[t2]();
        }
      });
    }
  }
  P.on(document, jt, Bt, function(t2) {
    ("A" === t2.target.tagName || t2.delegateTarget && "A" === t2.delegateTarget.tagName) && t2.preventDefault();
    for (const t3 of R.getMultipleElementsFromSelector(this)) qt.getOrCreateInstance(t3, { toggle: false }).toggle();
  }), g(qt);
  var Vt = "top", Kt = "bottom", Qt = "right", Xt = "left", Yt = "auto", Ut = [Vt, Kt, Qt, Xt], Gt = "start", Jt = "end", Zt = "clippingParents", te = "viewport", ee = "popper", ie = "reference", ne = Ut.reduce(function(t2, e2) {
    return t2.concat([e2 + "-" + Gt, e2 + "-" + Jt]);
  }, []), se = [].concat(Ut, [Yt]).reduce(function(t2, e2) {
    return t2.concat([e2, e2 + "-" + Gt, e2 + "-" + Jt]);
  }, []), oe = "beforeRead", re = "read", ae = "afterRead", le = "beforeMain", ce = "main", he = "afterMain", de = "beforeWrite", ue = "write", fe = "afterWrite", pe = [oe, re, ae, le, ce, he, de, ue, fe];
  function me(t2) {
    return t2 ? (t2.nodeName || "").toLowerCase() : null;
  }
  function ge(t2) {
    if (null == t2) return window;
    if ("[object Window]" !== t2.toString()) {
      var e2 = t2.ownerDocument;
      return e2 && e2.defaultView || window;
    }
    return t2;
  }
  function _e(t2) {
    return t2 instanceof ge(t2).Element || t2 instanceof Element;
  }
  function be(t2) {
    return t2 instanceof ge(t2).HTMLElement || t2 instanceof HTMLElement;
  }
  function ve(t2) {
    return "undefined" != typeof ShadowRoot && (t2 instanceof ge(t2).ShadowRoot || t2 instanceof ShadowRoot);
  }
  const ye = { name: "applyStyles", enabled: true, phase: "write", fn: function(t2) {
    var e2 = t2.state;
    Object.keys(e2.elements).forEach(function(t3) {
      var i2 = e2.styles[t3] || {}, n2 = e2.attributes[t3] || {}, s2 = e2.elements[t3];
      be(s2) && me(s2) && (Object.assign(s2.style, i2), Object.keys(n2).forEach(function(t4) {
        var e3 = n2[t4];
        false === e3 ? s2.removeAttribute(t4) : s2.setAttribute(t4, true === e3 ? "" : e3);
      }));
    });
  }, effect: function(t2) {
    var e2 = t2.state, i2 = { popper: { position: e2.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
    return Object.assign(e2.elements.popper.style, i2.popper), e2.styles = i2, e2.elements.arrow && Object.assign(e2.elements.arrow.style, i2.arrow), function() {
      Object.keys(e2.elements).forEach(function(t3) {
        var n2 = e2.elements[t3], s2 = e2.attributes[t3] || {}, o2 = Object.keys(e2.styles.hasOwnProperty(t3) ? e2.styles[t3] : i2[t3]).reduce(function(t4, e3) {
          return t4[e3] = "", t4;
        }, {});
        be(n2) && me(n2) && (Object.assign(n2.style, o2), Object.keys(s2).forEach(function(t4) {
          n2.removeAttribute(t4);
        }));
      });
    };
  }, requires: ["computeStyles"] };
  function we(t2) {
    return t2.split("-")[0];
  }
  var Ae = Math.max, Ee = Math.min, Te = Math.round;
  function Ce() {
    var t2 = navigator.userAgentData;
    return null != t2 && t2.brands && Array.isArray(t2.brands) ? t2.brands.map(function(t3) {
      return t3.brand + "/" + t3.version;
    }).join(" ") : navigator.userAgent;
  }
  function Oe() {
    return !/^((?!chrome|android).)*safari/i.test(Ce());
  }
  function xe(t2, e2, i2) {
    void 0 === e2 && (e2 = false), void 0 === i2 && (i2 = false);
    var n2 = t2.getBoundingClientRect(), s2 = 1, o2 = 1;
    e2 && be(t2) && (s2 = t2.offsetWidth > 0 && Te(n2.width) / t2.offsetWidth || 1, o2 = t2.offsetHeight > 0 && Te(n2.height) / t2.offsetHeight || 1);
    var r2 = (_e(t2) ? ge(t2) : window).visualViewport, a2 = !Oe() && i2, l2 = (n2.left + (a2 && r2 ? r2.offsetLeft : 0)) / s2, c2 = (n2.top + (a2 && r2 ? r2.offsetTop : 0)) / o2, h2 = n2.width / s2, d2 = n2.height / o2;
    return { width: h2, height: d2, top: c2, right: l2 + h2, bottom: c2 + d2, left: l2, x: l2, y: c2 };
  }
  function ke(t2) {
    var e2 = xe(t2), i2 = t2.offsetWidth, n2 = t2.offsetHeight;
    return Math.abs(e2.width - i2) <= 1 && (i2 = e2.width), Math.abs(e2.height - n2) <= 1 && (n2 = e2.height), { x: t2.offsetLeft, y: t2.offsetTop, width: i2, height: n2 };
  }
  function Le(t2, e2) {
    var i2 = e2.getRootNode && e2.getRootNode();
    if (t2.contains(e2)) return true;
    if (i2 && ve(i2)) {
      var n2 = e2;
      do {
        if (n2 && t2.isSameNode(n2)) return true;
        n2 = n2.parentNode || n2.host;
      } while (n2);
    }
    return false;
  }
  function Se(t2) {
    return ge(t2).getComputedStyle(t2);
  }
  function De(t2) {
    return ["table", "td", "th"].indexOf(me(t2)) >= 0;
  }
  function $e(t2) {
    return ((_e(t2) ? t2.ownerDocument : t2.document) || window.document).documentElement;
  }
  function Ie(t2) {
    return "html" === me(t2) ? t2 : t2.assignedSlot || t2.parentNode || (ve(t2) ? t2.host : null) || $e(t2);
  }
  function Ne(t2) {
    return be(t2) && "fixed" !== Se(t2).position ? t2.offsetParent : null;
  }
  function Pe(t2) {
    for (var e2 = ge(t2), i2 = Ne(t2); i2 && De(i2) && "static" === Se(i2).position; ) i2 = Ne(i2);
    return i2 && ("html" === me(i2) || "body" === me(i2) && "static" === Se(i2).position) ? e2 : i2 || (function(t3) {
      var e3 = /firefox/i.test(Ce());
      if (/Trident/i.test(Ce()) && be(t3) && "fixed" === Se(t3).position) return null;
      var i3 = Ie(t3);
      for (ve(i3) && (i3 = i3.host); be(i3) && ["html", "body"].indexOf(me(i3)) < 0; ) {
        var n2 = Se(i3);
        if ("none" !== n2.transform || "none" !== n2.perspective || "paint" === n2.contain || -1 !== ["transform", "perspective"].indexOf(n2.willChange) || e3 && "filter" === n2.willChange || e3 && n2.filter && "none" !== n2.filter) return i3;
        i3 = i3.parentNode;
      }
      return null;
    })(t2) || e2;
  }
  function je(t2) {
    return ["top", "bottom"].indexOf(t2) >= 0 ? "x" : "y";
  }
  function Me(t2, e2, i2) {
    return Ae(t2, Ee(e2, i2));
  }
  function Fe(t2) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, t2);
  }
  function He(t2, e2) {
    return e2.reduce(function(e3, i2) {
      return e3[i2] = t2, e3;
    }, {});
  }
  const We = { name: "arrow", enabled: true, phase: "main", fn: function(t2) {
    var e2, i2 = t2.state, n2 = t2.name, s2 = t2.options, o2 = i2.elements.arrow, r2 = i2.modifiersData.popperOffsets, a2 = we(i2.placement), l2 = je(a2), c2 = [Xt, Qt].indexOf(a2) >= 0 ? "height" : "width";
    if (o2 && r2) {
      var h2 = (function(t3, e3) {
        return Fe("number" != typeof (t3 = "function" == typeof t3 ? t3(Object.assign({}, e3.rects, { placement: e3.placement })) : t3) ? t3 : He(t3, Ut));
      })(s2.padding, i2), d2 = ke(o2), u2 = "y" === l2 ? Vt : Xt, f2 = "y" === l2 ? Kt : Qt, p2 = i2.rects.reference[c2] + i2.rects.reference[l2] - r2[l2] - i2.rects.popper[c2], m2 = r2[l2] - i2.rects.reference[l2], g2 = Pe(o2), _2 = g2 ? "y" === l2 ? g2.clientHeight || 0 : g2.clientWidth || 0 : 0, b2 = p2 / 2 - m2 / 2, v2 = h2[u2], y2 = _2 - d2[c2] - h2[f2], w2 = _2 / 2 - d2[c2] / 2 + b2, A2 = Me(v2, w2, y2), E2 = l2;
      i2.modifiersData[n2] = ((e2 = {})[E2] = A2, e2.centerOffset = A2 - w2, e2);
    }
  }, effect: function(t2) {
    var e2 = t2.state, i2 = t2.options.element, n2 = void 0 === i2 ? "[data-popper-arrow]" : i2;
    null != n2 && ("string" != typeof n2 || (n2 = e2.elements.popper.querySelector(n2))) && Le(e2.elements.popper, n2) && (e2.elements.arrow = n2);
  }, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
  function Be(t2) {
    return t2.split("-")[1];
  }
  var ze = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function Re(t2) {
    var e2, i2 = t2.popper, n2 = t2.popperRect, s2 = t2.placement, o2 = t2.variation, r2 = t2.offsets, a2 = t2.position, l2 = t2.gpuAcceleration, c2 = t2.adaptive, h2 = t2.roundOffsets, d2 = t2.isFixed, u2 = r2.x, f2 = void 0 === u2 ? 0 : u2, p2 = r2.y, m2 = void 0 === p2 ? 0 : p2, g2 = "function" == typeof h2 ? h2({ x: f2, y: m2 }) : { x: f2, y: m2 };
    f2 = g2.x, m2 = g2.y;
    var _2 = r2.hasOwnProperty("x"), b2 = r2.hasOwnProperty("y"), v2 = Xt, y2 = Vt, w2 = window;
    if (c2) {
      var A2 = Pe(i2), E2 = "clientHeight", T2 = "clientWidth";
      A2 === ge(i2) && "static" !== Se(A2 = $e(i2)).position && "absolute" === a2 && (E2 = "scrollHeight", T2 = "scrollWidth"), (s2 === Vt || (s2 === Xt || s2 === Qt) && o2 === Jt) && (y2 = Kt, m2 -= (d2 && A2 === w2 && w2.visualViewport ? w2.visualViewport.height : A2[E2]) - n2.height, m2 *= l2 ? 1 : -1), s2 !== Xt && (s2 !== Vt && s2 !== Kt || o2 !== Jt) || (v2 = Qt, f2 -= (d2 && A2 === w2 && w2.visualViewport ? w2.visualViewport.width : A2[T2]) - n2.width, f2 *= l2 ? 1 : -1);
    }
    var C2, O2 = Object.assign({ position: a2 }, c2 && ze), x2 = true === h2 ? (function(t3, e3) {
      var i3 = t3.x, n3 = t3.y, s3 = e3.devicePixelRatio || 1;
      return { x: Te(i3 * s3) / s3 || 0, y: Te(n3 * s3) / s3 || 0 };
    })({ x: f2, y: m2 }, ge(i2)) : { x: f2, y: m2 };
    return f2 = x2.x, m2 = x2.y, l2 ? Object.assign({}, O2, ((C2 = {})[y2] = b2 ? "0" : "", C2[v2] = _2 ? "0" : "", C2.transform = (w2.devicePixelRatio || 1) <= 1 ? "translate(" + f2 + "px, " + m2 + "px)" : "translate3d(" + f2 + "px, " + m2 + "px, 0)", C2)) : Object.assign({}, O2, ((e2 = {})[y2] = b2 ? m2 + "px" : "", e2[v2] = _2 ? f2 + "px" : "", e2.transform = "", e2));
  }
  const qe = { name: "computeStyles", enabled: true, phase: "beforeWrite", fn: function(t2) {
    var e2 = t2.state, i2 = t2.options, n2 = i2.gpuAcceleration, s2 = void 0 === n2 || n2, o2 = i2.adaptive, r2 = void 0 === o2 || o2, a2 = i2.roundOffsets, l2 = void 0 === a2 || a2, c2 = { placement: we(e2.placement), variation: Be(e2.placement), popper: e2.elements.popper, popperRect: e2.rects.popper, gpuAcceleration: s2, isFixed: "fixed" === e2.options.strategy };
    null != e2.modifiersData.popperOffsets && (e2.styles.popper = Object.assign({}, e2.styles.popper, Re(Object.assign({}, c2, { offsets: e2.modifiersData.popperOffsets, position: e2.options.strategy, adaptive: r2, roundOffsets: l2 })))), null != e2.modifiersData.arrow && (e2.styles.arrow = Object.assign({}, e2.styles.arrow, Re(Object.assign({}, c2, { offsets: e2.modifiersData.arrow, position: "absolute", adaptive: false, roundOffsets: l2 })))), e2.attributes.popper = Object.assign({}, e2.attributes.popper, { "data-popper-placement": e2.placement });
  }, data: {} };
  var Ve = { passive: true };
  const Ke = { name: "eventListeners", enabled: true, phase: "write", fn: function() {
  }, effect: function(t2) {
    var e2 = t2.state, i2 = t2.instance, n2 = t2.options, s2 = n2.scroll, o2 = void 0 === s2 || s2, r2 = n2.resize, a2 = void 0 === r2 || r2, l2 = ge(e2.elements.popper), c2 = [].concat(e2.scrollParents.reference, e2.scrollParents.popper);
    return o2 && c2.forEach(function(t3) {
      t3.addEventListener("scroll", i2.update, Ve);
    }), a2 && l2.addEventListener("resize", i2.update, Ve), function() {
      o2 && c2.forEach(function(t3) {
        t3.removeEventListener("scroll", i2.update, Ve);
      }), a2 && l2.removeEventListener("resize", i2.update, Ve);
    };
  }, data: {} };
  var Qe = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function Xe(t2) {
    return t2.replace(/left|right|bottom|top/g, function(t3) {
      return Qe[t3];
    });
  }
  var Ye = { start: "end", end: "start" };
  function Ue(t2) {
    return t2.replace(/start|end/g, function(t3) {
      return Ye[t3];
    });
  }
  function Ge(t2) {
    var e2 = ge(t2);
    return { scrollLeft: e2.pageXOffset, scrollTop: e2.pageYOffset };
  }
  function Je(t2) {
    return xe($e(t2)).left + Ge(t2).scrollLeft;
  }
  function Ze(t2) {
    var e2 = Se(t2), i2 = e2.overflow, n2 = e2.overflowX, s2 = e2.overflowY;
    return /auto|scroll|overlay|hidden/.test(i2 + s2 + n2);
  }
  function ti(t2) {
    return ["html", "body", "#document"].indexOf(me(t2)) >= 0 ? t2.ownerDocument.body : be(t2) && Ze(t2) ? t2 : ti(Ie(t2));
  }
  function ei(t2, e2) {
    var i2;
    void 0 === e2 && (e2 = []);
    var n2 = ti(t2), s2 = n2 === (null == (i2 = t2.ownerDocument) ? void 0 : i2.body), o2 = ge(n2), r2 = s2 ? [o2].concat(o2.visualViewport || [], Ze(n2) ? n2 : []) : n2, a2 = e2.concat(r2);
    return s2 ? a2 : a2.concat(ei(Ie(r2)));
  }
  function ii(t2) {
    return Object.assign({}, t2, { left: t2.x, top: t2.y, right: t2.x + t2.width, bottom: t2.y + t2.height });
  }
  function ni(t2, e2, i2) {
    return e2 === te ? ii((function(t3, e3) {
      var i3 = ge(t3), n2 = $e(t3), s2 = i3.visualViewport, o2 = n2.clientWidth, r2 = n2.clientHeight, a2 = 0, l2 = 0;
      if (s2) {
        o2 = s2.width, r2 = s2.height;
        var c2 = Oe();
        (c2 || !c2 && "fixed" === e3) && (a2 = s2.offsetLeft, l2 = s2.offsetTop);
      }
      return { width: o2, height: r2, x: a2 + Je(t3), y: l2 };
    })(t2, i2)) : _e(e2) ? (function(t3, e3) {
      var i3 = xe(t3, false, "fixed" === e3);
      return i3.top = i3.top + t3.clientTop, i3.left = i3.left + t3.clientLeft, i3.bottom = i3.top + t3.clientHeight, i3.right = i3.left + t3.clientWidth, i3.width = t3.clientWidth, i3.height = t3.clientHeight, i3.x = i3.left, i3.y = i3.top, i3;
    })(e2, i2) : ii((function(t3) {
      var e3, i3 = $e(t3), n2 = Ge(t3), s2 = null == (e3 = t3.ownerDocument) ? void 0 : e3.body, o2 = Ae(i3.scrollWidth, i3.clientWidth, s2 ? s2.scrollWidth : 0, s2 ? s2.clientWidth : 0), r2 = Ae(i3.scrollHeight, i3.clientHeight, s2 ? s2.scrollHeight : 0, s2 ? s2.clientHeight : 0), a2 = -n2.scrollLeft + Je(t3), l2 = -n2.scrollTop;
      return "rtl" === Se(s2 || i3).direction && (a2 += Ae(i3.clientWidth, s2 ? s2.clientWidth : 0) - o2), { width: o2, height: r2, x: a2, y: l2 };
    })($e(t2)));
  }
  function si(t2) {
    var e2, i2 = t2.reference, n2 = t2.element, s2 = t2.placement, o2 = s2 ? we(s2) : null, r2 = s2 ? Be(s2) : null, a2 = i2.x + i2.width / 2 - n2.width / 2, l2 = i2.y + i2.height / 2 - n2.height / 2;
    switch (o2) {
      case Vt:
        e2 = { x: a2, y: i2.y - n2.height };
        break;
      case Kt:
        e2 = { x: a2, y: i2.y + i2.height };
        break;
      case Qt:
        e2 = { x: i2.x + i2.width, y: l2 };
        break;
      case Xt:
        e2 = { x: i2.x - n2.width, y: l2 };
        break;
      default:
        e2 = { x: i2.x, y: i2.y };
    }
    var c2 = o2 ? je(o2) : null;
    if (null != c2) {
      var h2 = "y" === c2 ? "height" : "width";
      switch (r2) {
        case Gt:
          e2[c2] = e2[c2] - (i2[h2] / 2 - n2[h2] / 2);
          break;
        case Jt:
          e2[c2] = e2[c2] + (i2[h2] / 2 - n2[h2] / 2);
      }
    }
    return e2;
  }
  function oi(t2, e2) {
    void 0 === e2 && (e2 = {});
    var i2 = e2, n2 = i2.placement, s2 = void 0 === n2 ? t2.placement : n2, o2 = i2.strategy, r2 = void 0 === o2 ? t2.strategy : o2, a2 = i2.boundary, l2 = void 0 === a2 ? Zt : a2, c2 = i2.rootBoundary, h2 = void 0 === c2 ? te : c2, d2 = i2.elementContext, u2 = void 0 === d2 ? ee : d2, f2 = i2.altBoundary, p2 = void 0 !== f2 && f2, m2 = i2.padding, g2 = void 0 === m2 ? 0 : m2, _2 = Fe("number" != typeof g2 ? g2 : He(g2, Ut)), b2 = u2 === ee ? ie : ee, v2 = t2.rects.popper, y2 = t2.elements[p2 ? b2 : u2], w2 = (function(t3, e3, i3, n3) {
      var s3 = "clippingParents" === e3 ? (function(t4) {
        var e4 = ei(Ie(t4)), i4 = ["absolute", "fixed"].indexOf(Se(t4).position) >= 0 && be(t4) ? Pe(t4) : t4;
        return _e(i4) ? e4.filter(function(t5) {
          return _e(t5) && Le(t5, i4) && "body" !== me(t5);
        }) : [];
      })(t3) : [].concat(e3), o3 = [].concat(s3, [i3]), r3 = o3[0], a3 = o3.reduce(function(e4, i4) {
        var s4 = ni(t3, i4, n3);
        return e4.top = Ae(s4.top, e4.top), e4.right = Ee(s4.right, e4.right), e4.bottom = Ee(s4.bottom, e4.bottom), e4.left = Ae(s4.left, e4.left), e4;
      }, ni(t3, r3, n3));
      return a3.width = a3.right - a3.left, a3.height = a3.bottom - a3.top, a3.x = a3.left, a3.y = a3.top, a3;
    })(_e(y2) ? y2 : y2.contextElement || $e(t2.elements.popper), l2, h2, r2), A2 = xe(t2.elements.reference), E2 = si({ reference: A2, element: v2, placement: s2 }), T2 = ii(Object.assign({}, v2, E2)), C2 = u2 === ee ? T2 : A2, O2 = { top: w2.top - C2.top + _2.top, bottom: C2.bottom - w2.bottom + _2.bottom, left: w2.left - C2.left + _2.left, right: C2.right - w2.right + _2.right }, x2 = t2.modifiersData.offset;
    if (u2 === ee && x2) {
      var k2 = x2[s2];
      Object.keys(O2).forEach(function(t3) {
        var e3 = [Qt, Kt].indexOf(t3) >= 0 ? 1 : -1, i3 = [Vt, Kt].indexOf(t3) >= 0 ? "y" : "x";
        O2[t3] += k2[i3] * e3;
      });
    }
    return O2;
  }
  function ri(t2, e2) {
    void 0 === e2 && (e2 = {});
    var i2 = e2, n2 = i2.placement, s2 = i2.boundary, o2 = i2.rootBoundary, r2 = i2.padding, a2 = i2.flipVariations, l2 = i2.allowedAutoPlacements, c2 = void 0 === l2 ? se : l2, h2 = Be(n2), d2 = h2 ? a2 ? ne : ne.filter(function(t3) {
      return Be(t3) === h2;
    }) : Ut, u2 = d2.filter(function(t3) {
      return c2.indexOf(t3) >= 0;
    });
    0 === u2.length && (u2 = d2);
    var f2 = u2.reduce(function(e3, i3) {
      return e3[i3] = oi(t2, { placement: i3, boundary: s2, rootBoundary: o2, padding: r2 })[we(i3)], e3;
    }, {});
    return Object.keys(f2).sort(function(t3, e3) {
      return f2[t3] - f2[e3];
    });
  }
  const ai = { name: "flip", enabled: true, phase: "main", fn: function(t2) {
    var e2 = t2.state, i2 = t2.options, n2 = t2.name;
    if (!e2.modifiersData[n2]._skip) {
      for (var s2 = i2.mainAxis, o2 = void 0 === s2 || s2, r2 = i2.altAxis, a2 = void 0 === r2 || r2, l2 = i2.fallbackPlacements, c2 = i2.padding, h2 = i2.boundary, d2 = i2.rootBoundary, u2 = i2.altBoundary, f2 = i2.flipVariations, p2 = void 0 === f2 || f2, m2 = i2.allowedAutoPlacements, g2 = e2.options.placement, _2 = we(g2), b2 = l2 || (_2 !== g2 && p2 ? (function(t3) {
        if (we(t3) === Yt) return [];
        var e3 = Xe(t3);
        return [Ue(t3), e3, Ue(e3)];
      })(g2) : [Xe(g2)]), v2 = [g2].concat(b2).reduce(function(t3, i3) {
        return t3.concat(we(i3) === Yt ? ri(e2, { placement: i3, boundary: h2, rootBoundary: d2, padding: c2, flipVariations: p2, allowedAutoPlacements: m2 }) : i3);
      }, []), y2 = e2.rects.reference, w2 = e2.rects.popper, A2 = /* @__PURE__ */ new Map(), E2 = true, T2 = v2[0], C2 = 0; C2 < v2.length; C2++) {
        var O2 = v2[C2], x2 = we(O2), k2 = Be(O2) === Gt, L2 = [Vt, Kt].indexOf(x2) >= 0, S2 = L2 ? "width" : "height", D2 = oi(e2, { placement: O2, boundary: h2, rootBoundary: d2, altBoundary: u2, padding: c2 }), $2 = L2 ? k2 ? Qt : Xt : k2 ? Kt : Vt;
        y2[S2] > w2[S2] && ($2 = Xe($2));
        var I2 = Xe($2), N2 = [];
        if (o2 && N2.push(D2[x2] <= 0), a2 && N2.push(D2[$2] <= 0, D2[I2] <= 0), N2.every(function(t3) {
          return t3;
        })) {
          T2 = O2, E2 = false;
          break;
        }
        A2.set(O2, N2);
      }
      if (E2) for (var P2 = function(t3) {
        var e3 = v2.find(function(e4) {
          var i3 = A2.get(e4);
          if (i3) return i3.slice(0, t3).every(function(t4) {
            return t4;
          });
        });
        if (e3) return T2 = e3, "break";
      }, j2 = p2 ? 3 : 1; j2 > 0 && "break" !== P2(j2); j2--) ;
      e2.placement !== T2 && (e2.modifiersData[n2]._skip = true, e2.placement = T2, e2.reset = true);
    }
  }, requiresIfExists: ["offset"], data: { _skip: false } };
  function li(t2, e2, i2) {
    return void 0 === i2 && (i2 = { x: 0, y: 0 }), { top: t2.top - e2.height - i2.y, right: t2.right - e2.width + i2.x, bottom: t2.bottom - e2.height + i2.y, left: t2.left - e2.width - i2.x };
  }
  function ci(t2) {
    return [Vt, Qt, Kt, Xt].some(function(e2) {
      return t2[e2] >= 0;
    });
  }
  const hi = { name: "hide", enabled: true, phase: "main", requiresIfExists: ["preventOverflow"], fn: function(t2) {
    var e2 = t2.state, i2 = t2.name, n2 = e2.rects.reference, s2 = e2.rects.popper, o2 = e2.modifiersData.preventOverflow, r2 = oi(e2, { elementContext: "reference" }), a2 = oi(e2, { altBoundary: true }), l2 = li(r2, n2), c2 = li(a2, s2, o2), h2 = ci(l2), d2 = ci(c2);
    e2.modifiersData[i2] = { referenceClippingOffsets: l2, popperEscapeOffsets: c2, isReferenceHidden: h2, hasPopperEscaped: d2 }, e2.attributes.popper = Object.assign({}, e2.attributes.popper, { "data-popper-reference-hidden": h2, "data-popper-escaped": d2 });
  } }, di = { name: "offset", enabled: true, phase: "main", requires: ["popperOffsets"], fn: function(t2) {
    var e2 = t2.state, i2 = t2.options, n2 = t2.name, s2 = i2.offset, o2 = void 0 === s2 ? [0, 0] : s2, r2 = se.reduce(function(t3, i3) {
      return t3[i3] = (function(t4, e3, i4) {
        var n3 = we(t4), s3 = [Xt, Vt].indexOf(n3) >= 0 ? -1 : 1, o3 = "function" == typeof i4 ? i4(Object.assign({}, e3, { placement: t4 })) : i4, r3 = o3[0], a3 = o3[1];
        return r3 = r3 || 0, a3 = (a3 || 0) * s3, [Xt, Qt].indexOf(n3) >= 0 ? { x: a3, y: r3 } : { x: r3, y: a3 };
      })(i3, e2.rects, o2), t3;
    }, {}), a2 = r2[e2.placement], l2 = a2.x, c2 = a2.y;
    null != e2.modifiersData.popperOffsets && (e2.modifiersData.popperOffsets.x += l2, e2.modifiersData.popperOffsets.y += c2), e2.modifiersData[n2] = r2;
  } }, ui = { name: "popperOffsets", enabled: true, phase: "read", fn: function(t2) {
    var e2 = t2.state, i2 = t2.name;
    e2.modifiersData[i2] = si({ reference: e2.rects.reference, element: e2.rects.popper, placement: e2.placement });
  }, data: {} }, fi = { name: "preventOverflow", enabled: true, phase: "main", fn: function(t2) {
    var e2 = t2.state, i2 = t2.options, n2 = t2.name, s2 = i2.mainAxis, o2 = void 0 === s2 || s2, r2 = i2.altAxis, a2 = void 0 !== r2 && r2, l2 = i2.boundary, c2 = i2.rootBoundary, h2 = i2.altBoundary, d2 = i2.padding, u2 = i2.tether, f2 = void 0 === u2 || u2, p2 = i2.tetherOffset, m2 = void 0 === p2 ? 0 : p2, g2 = oi(e2, { boundary: l2, rootBoundary: c2, padding: d2, altBoundary: h2 }), _2 = we(e2.placement), b2 = Be(e2.placement), v2 = !b2, y2 = je(_2), w2 = "x" === y2 ? "y" : "x", A2 = e2.modifiersData.popperOffsets, E2 = e2.rects.reference, T2 = e2.rects.popper, C2 = "function" == typeof m2 ? m2(Object.assign({}, e2.rects, { placement: e2.placement })) : m2, O2 = "number" == typeof C2 ? { mainAxis: C2, altAxis: C2 } : Object.assign({ mainAxis: 0, altAxis: 0 }, C2), x2 = e2.modifiersData.offset ? e2.modifiersData.offset[e2.placement] : null, k2 = { x: 0, y: 0 };
    if (A2) {
      if (o2) {
        var L2, S2 = "y" === y2 ? Vt : Xt, D2 = "y" === y2 ? Kt : Qt, $2 = "y" === y2 ? "height" : "width", I2 = A2[y2], N2 = I2 + g2[S2], P2 = I2 - g2[D2], j2 = f2 ? -T2[$2] / 2 : 0, M2 = b2 === Gt ? E2[$2] : T2[$2], F2 = b2 === Gt ? -T2[$2] : -E2[$2], H2 = e2.elements.arrow, W2 = f2 && H2 ? ke(H2) : { width: 0, height: 0 }, B2 = e2.modifiersData["arrow#persistent"] ? e2.modifiersData["arrow#persistent"].padding : { top: 0, right: 0, bottom: 0, left: 0 }, z2 = B2[S2], R2 = B2[D2], q2 = Me(0, E2[$2], W2[$2]), V2 = v2 ? E2[$2] / 2 - j2 - q2 - z2 - O2.mainAxis : M2 - q2 - z2 - O2.mainAxis, K2 = v2 ? -E2[$2] / 2 + j2 + q2 + R2 + O2.mainAxis : F2 + q2 + R2 + O2.mainAxis, Q2 = e2.elements.arrow && Pe(e2.elements.arrow), X2 = Q2 ? "y" === y2 ? Q2.clientTop || 0 : Q2.clientLeft || 0 : 0, Y2 = null != (L2 = null == x2 ? void 0 : x2[y2]) ? L2 : 0, U2 = I2 + K2 - Y2, G2 = Me(f2 ? Ee(N2, I2 + V2 - Y2 - X2) : N2, I2, f2 ? Ae(P2, U2) : P2);
        A2[y2] = G2, k2[y2] = G2 - I2;
      }
      if (a2) {
        var J2, Z2 = "x" === y2 ? Vt : Xt, tt2 = "x" === y2 ? Kt : Qt, et2 = A2[w2], it2 = "y" === w2 ? "height" : "width", nt2 = et2 + g2[Z2], st2 = et2 - g2[tt2], ot2 = -1 !== [Vt, Xt].indexOf(_2), rt2 = null != (J2 = null == x2 ? void 0 : x2[w2]) ? J2 : 0, at2 = ot2 ? nt2 : et2 - E2[it2] - T2[it2] - rt2 + O2.altAxis, lt2 = ot2 ? et2 + E2[it2] + T2[it2] - rt2 - O2.altAxis : st2, ct2 = f2 && ot2 ? (function(t3, e3, i3) {
          var n3 = Me(t3, e3, i3);
          return n3 > i3 ? i3 : n3;
        })(at2, et2, lt2) : Me(f2 ? at2 : nt2, et2, f2 ? lt2 : st2);
        A2[w2] = ct2, k2[w2] = ct2 - et2;
      }
      e2.modifiersData[n2] = k2;
    }
  }, requiresIfExists: ["offset"] };
  function pi(t2, e2, i2) {
    void 0 === i2 && (i2 = false);
    var n2, s2, o2 = be(e2), r2 = be(e2) && (function(t3) {
      var e3 = t3.getBoundingClientRect(), i3 = Te(e3.width) / t3.offsetWidth || 1, n3 = Te(e3.height) / t3.offsetHeight || 1;
      return 1 !== i3 || 1 !== n3;
    })(e2), a2 = $e(e2), l2 = xe(t2, r2, i2), c2 = { scrollLeft: 0, scrollTop: 0 }, h2 = { x: 0, y: 0 };
    return (o2 || !o2 && !i2) && (("body" !== me(e2) || Ze(a2)) && (c2 = (n2 = e2) !== ge(n2) && be(n2) ? { scrollLeft: (s2 = n2).scrollLeft, scrollTop: s2.scrollTop } : Ge(n2)), be(e2) ? ((h2 = xe(e2, true)).x += e2.clientLeft, h2.y += e2.clientTop) : a2 && (h2.x = Je(a2))), { x: l2.left + c2.scrollLeft - h2.x, y: l2.top + c2.scrollTop - h2.y, width: l2.width, height: l2.height };
  }
  function mi(t2) {
    var e2 = /* @__PURE__ */ new Map(), i2 = /* @__PURE__ */ new Set(), n2 = [];
    function s2(t3) {
      i2.add(t3.name), [].concat(t3.requires || [], t3.requiresIfExists || []).forEach(function(t4) {
        if (!i2.has(t4)) {
          var n3 = e2.get(t4);
          n3 && s2(n3);
        }
      }), n2.push(t3);
    }
    return t2.forEach(function(t3) {
      e2.set(t3.name, t3);
    }), t2.forEach(function(t3) {
      i2.has(t3.name) || s2(t3);
    }), n2;
  }
  var gi = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function _i() {
    for (var t2 = arguments.length, e2 = new Array(t2), i2 = 0; i2 < t2; i2++) e2[i2] = arguments[i2];
    return !e2.some(function(t3) {
      return !(t3 && "function" == typeof t3.getBoundingClientRect);
    });
  }
  function bi(t2) {
    void 0 === t2 && (t2 = {});
    var e2 = t2, i2 = e2.defaultModifiers, n2 = void 0 === i2 ? [] : i2, s2 = e2.defaultOptions, o2 = void 0 === s2 ? gi : s2;
    return function(t3, e3, i3) {
      void 0 === i3 && (i3 = o2);
      var s3, r2, a2 = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, gi, o2), modifiersData: {}, elements: { reference: t3, popper: e3 }, attributes: {}, styles: {} }, l2 = [], c2 = false, h2 = { state: a2, setOptions: function(i4) {
        var s4 = "function" == typeof i4 ? i4(a2.options) : i4;
        d2(), a2.options = Object.assign({}, o2, a2.options, s4), a2.scrollParents = { reference: _e(t3) ? ei(t3) : t3.contextElement ? ei(t3.contextElement) : [], popper: ei(e3) };
        var r3, c3, u2 = (function(t4) {
          var e4 = mi(t4);
          return pe.reduce(function(t5, i5) {
            return t5.concat(e4.filter(function(t6) {
              return t6.phase === i5;
            }));
          }, []);
        })((r3 = [].concat(n2, a2.options.modifiers), c3 = r3.reduce(function(t4, e4) {
          var i5 = t4[e4.name];
          return t4[e4.name] = i5 ? Object.assign({}, i5, e4, { options: Object.assign({}, i5.options, e4.options), data: Object.assign({}, i5.data, e4.data) }) : e4, t4;
        }, {}), Object.keys(c3).map(function(t4) {
          return c3[t4];
        })));
        return a2.orderedModifiers = u2.filter(function(t4) {
          return t4.enabled;
        }), a2.orderedModifiers.forEach(function(t4) {
          var e4 = t4.name, i5 = t4.options, n3 = void 0 === i5 ? {} : i5, s5 = t4.effect;
          if ("function" == typeof s5) {
            var o3 = s5({ state: a2, name: e4, instance: h2, options: n3 });
            l2.push(o3 || function() {
            });
          }
        }), h2.update();
      }, forceUpdate: function() {
        if (!c2) {
          var t4 = a2.elements, e4 = t4.reference, i4 = t4.popper;
          if (_i(e4, i4)) {
            a2.rects = { reference: pi(e4, Pe(i4), "fixed" === a2.options.strategy), popper: ke(i4) }, a2.reset = false, a2.placement = a2.options.placement, a2.orderedModifiers.forEach(function(t5) {
              return a2.modifiersData[t5.name] = Object.assign({}, t5.data);
            });
            for (var n3 = 0; n3 < a2.orderedModifiers.length; n3++) if (true !== a2.reset) {
              var s4 = a2.orderedModifiers[n3], o3 = s4.fn, r3 = s4.options, l3 = void 0 === r3 ? {} : r3, d3 = s4.name;
              "function" == typeof o3 && (a2 = o3({ state: a2, options: l3, name: d3, instance: h2 }) || a2);
            } else a2.reset = false, n3 = -1;
          }
        }
      }, update: (s3 = function() {
        return new Promise(function(t4) {
          h2.forceUpdate(), t4(a2);
        });
      }, function() {
        return r2 || (r2 = new Promise(function(t4) {
          Promise.resolve().then(function() {
            r2 = void 0, t4(s3());
          });
        })), r2;
      }), destroy: function() {
        d2(), c2 = true;
      } };
      if (!_i(t3, e3)) return h2;
      function d2() {
        l2.forEach(function(t4) {
          return t4();
        }), l2 = [];
      }
      return h2.setOptions(i3).then(function(t4) {
        !c2 && i3.onFirstUpdate && i3.onFirstUpdate(t4);
      }), h2;
    };
  }
  var vi = bi(), yi = bi({ defaultModifiers: [Ke, ui, qe, ye] }), wi = bi({ defaultModifiers: [Ke, ui, qe, ye, di, ai, fi, We, hi] });
  const Ai = Object.freeze(Object.defineProperty({ __proto__: null, afterMain: he, afterRead: ae, afterWrite: fe, applyStyles: ye, arrow: We, auto: Yt, basePlacements: Ut, beforeMain: le, beforeRead: oe, beforeWrite: de, bottom: Kt, clippingParents: Zt, computeStyles: qe, createPopper: wi, createPopperBase: vi, createPopperLite: yi, detectOverflow: oi, end: Jt, eventListeners: Ke, flip: ai, hide: hi, left: Xt, main: ce, modifierPhases: pe, offset: di, placements: se, popper: ee, popperGenerator: bi, popperOffsets: ui, preventOverflow: fi, read: re, reference: ie, right: Qt, start: Gt, top: Vt, variationPlacements: ne, viewport: te, write: ue }, Symbol.toStringTag, { value: "Module" })), Ei = "dropdown", Ti = ".bs.dropdown", Ci = ".data-api", Oi = "ArrowUp", xi = "ArrowDown", ki = `hide${Ti}`, Li = `hidden${Ti}`, Si = `show${Ti}`, Di = `shown${Ti}`, $i = `click${Ti}${Ci}`, Ii = `keydown${Ti}${Ci}`, Ni = `keyup${Ti}${Ci}`, Pi = "show", ji = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', Mi = `${ji}.${Pi}`, Fi = ".dropdown-menu", Hi = m() ? "top-end" : "top-start", Wi = m() ? "top-start" : "top-end", Bi = m() ? "bottom-end" : "bottom-start", zi = m() ? "bottom-start" : "bottom-end", Ri = m() ? "left-start" : "right-start", qi = m() ? "right-start" : "left-start", Vi = { autoClose: true, boundary: "clippingParents", display: "dynamic", offset: [0, 2], popperConfig: null, reference: "toggle" }, Ki = { autoClose: "(boolean|string)", boundary: "(string|element)", display: "string", offset: "(array|string|function)", popperConfig: "(null|object|function)", reference: "(string|element|object)" };
  class Qi extends B {
    constructor(t2, e2) {
      super(t2, e2), this._popper = null, this._parent = this._element.parentNode, this._menu = R.next(this._element, Fi)[0] || R.prev(this._element, Fi)[0] || R.findOne(Fi, this._parent), this._inNavbar = this._detectNavbar();
    }
    static get Default() {
      return Vi;
    }
    static get DefaultType() {
      return Ki;
    }
    static get NAME() {
      return Ei;
    }
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (c(this._element) || this._isShown()) return;
      const t2 = { relatedTarget: this._element };
      if (!P.trigger(this._element, Si, t2).defaultPrevented) {
        if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav")) for (const t3 of [].concat(...document.body.children)) P.on(t3, "mouseover", d);
        this._element.focus(), this._element.setAttribute("aria-expanded", true), this._menu.classList.add(Pi), this._element.classList.add(Pi), P.trigger(this._element, Di, t2);
      }
    }
    hide() {
      if (c(this._element) || !this._isShown()) return;
      const t2 = { relatedTarget: this._element };
      this._completeHide(t2);
    }
    dispose() {
      this._popper && this._popper.destroy(), super.dispose();
    }
    update() {
      this._inNavbar = this._detectNavbar(), this._popper && this._popper.update();
    }
    _completeHide(t2) {
      if (!P.trigger(this._element, ki, t2).defaultPrevented) {
        if ("ontouchstart" in document.documentElement) for (const t3 of [].concat(...document.body.children)) P.off(t3, "mouseover", d);
        this._popper && this._popper.destroy(), this._menu.classList.remove(Pi), this._element.classList.remove(Pi), this._element.setAttribute("aria-expanded", "false"), H.removeDataAttribute(this._menu, "popper"), P.trigger(this._element, Li, t2);
      }
    }
    _getConfig(t2) {
      if ("object" == typeof (t2 = super._getConfig(t2)).reference && !r(t2.reference) && "function" != typeof t2.reference.getBoundingClientRect) throw new TypeError(`${Ei.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      return t2;
    }
    _createPopper() {
      if (void 0 === Ai) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
      let t2 = this._element;
      "parent" === this._config.reference ? t2 = this._parent : r(this._config.reference) ? t2 = a(this._config.reference) : "object" == typeof this._config.reference && (t2 = this._config.reference);
      const e2 = this._getPopperConfig();
      this._popper = wi(t2, this._menu, e2);
    }
    _isShown() {
      return this._menu.classList.contains(Pi);
    }
    _getPlacement() {
      const t2 = this._parent;
      if (t2.classList.contains("dropend")) return Ri;
      if (t2.classList.contains("dropstart")) return qi;
      if (t2.classList.contains("dropup-center")) return "top";
      if (t2.classList.contains("dropdown-center")) return "bottom";
      const e2 = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
      return t2.classList.contains("dropup") ? e2 ? Wi : Hi : e2 ? zi : Bi;
    }
    _detectNavbar() {
      return null !== this._element.closest(".navbar");
    }
    _getOffset() {
      const { offset: t2 } = this._config;
      return "string" == typeof t2 ? t2.split(",").map((t3) => Number.parseInt(t3, 10)) : "function" == typeof t2 ? (e2) => t2(e2, this._element) : t2;
    }
    _getPopperConfig() {
      const t2 = { placement: this._getPlacement(), modifiers: [{ name: "preventOverflow", options: { boundary: this._config.boundary } }, { name: "offset", options: { offset: this._getOffset() } }] };
      return (this._inNavbar || "static" === this._config.display) && (H.setDataAttribute(this._menu, "popper", "static"), t2.modifiers = [{ name: "applyStyles", enabled: false }]), { ...t2, ..._(this._config.popperConfig, [void 0, t2]) };
    }
    _selectMenuItem({ key: t2, target: e2 }) {
      const i2 = R.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter((t3) => l(t3));
      i2.length && v(i2, e2, t2 === xi, !i2.includes(e2)).focus();
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Qi.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
    static clearMenus(t2) {
      if (2 === t2.button || "keyup" === t2.type && "Tab" !== t2.key) return;
      const e2 = R.find(Mi);
      for (const i2 of e2) {
        const e3 = Qi.getInstance(i2);
        if (!e3 || false === e3._config.autoClose) continue;
        const n2 = t2.composedPath(), s2 = n2.includes(e3._menu);
        if (n2.includes(e3._element) || "inside" === e3._config.autoClose && !s2 || "outside" === e3._config.autoClose && s2) continue;
        if (e3._menu.contains(t2.target) && ("keyup" === t2.type && "Tab" === t2.key || /input|select|option|textarea|form/i.test(t2.target.tagName))) continue;
        const o2 = { relatedTarget: e3._element };
        "click" === t2.type && (o2.clickEvent = t2), e3._completeHide(o2);
      }
    }
    static dataApiKeydownHandler(t2) {
      const e2 = /input|textarea/i.test(t2.target.tagName), i2 = "Escape" === t2.key, n2 = [Oi, xi].includes(t2.key);
      if (!n2 && !i2) return;
      if (e2 && !i2) return;
      t2.preventDefault();
      const s2 = this.matches(ji) ? this : R.prev(this, ji)[0] || R.next(this, ji)[0] || R.findOne(ji, t2.delegateTarget.parentNode), o2 = Qi.getOrCreateInstance(s2);
      if (n2) return t2.stopPropagation(), o2.show(), void o2._selectMenuItem(t2);
      o2._isShown() && (t2.stopPropagation(), o2.hide(), s2.focus());
    }
  }
  P.on(document, Ii, ji, Qi.dataApiKeydownHandler), P.on(document, Ii, Fi, Qi.dataApiKeydownHandler), P.on(document, $i, Qi.clearMenus), P.on(document, Ni, Qi.clearMenus), P.on(document, $i, ji, function(t2) {
    t2.preventDefault(), Qi.getOrCreateInstance(this).toggle();
  }), g(Qi);
  const Xi = "backdrop", Yi = "show", Ui = `mousedown.bs.${Xi}`, Gi = { className: "modal-backdrop", clickCallback: null, isAnimated: false, isVisible: true, rootElement: "body" }, Ji = { className: "string", clickCallback: "(function|null)", isAnimated: "boolean", isVisible: "boolean", rootElement: "(element|string)" };
  class Zi extends W {
    constructor(t2) {
      super(), this._config = this._getConfig(t2), this._isAppended = false, this._element = null;
    }
    static get Default() {
      return Gi;
    }
    static get DefaultType() {
      return Ji;
    }
    static get NAME() {
      return Xi;
    }
    show(t2) {
      if (!this._config.isVisible) return void _(t2);
      this._append();
      const e2 = this._getElement();
      this._config.isAnimated && u(e2), e2.classList.add(Yi), this._emulateAnimation(() => {
        _(t2);
      });
    }
    hide(t2) {
      this._config.isVisible ? (this._getElement().classList.remove(Yi), this._emulateAnimation(() => {
        this.dispose(), _(t2);
      })) : _(t2);
    }
    dispose() {
      this._isAppended && (P.off(this._element, Ui), this._element.remove(), this._isAppended = false);
    }
    _getElement() {
      if (!this._element) {
        const t2 = document.createElement("div");
        t2.className = this._config.className, this._config.isAnimated && t2.classList.add("fade"), this._element = t2;
      }
      return this._element;
    }
    _configAfterMerge(t2) {
      return t2.rootElement = a(t2.rootElement), t2;
    }
    _append() {
      if (this._isAppended) return;
      const t2 = this._getElement();
      this._config.rootElement.append(t2), P.on(t2, Ui, () => {
        _(this._config.clickCallback);
      }), this._isAppended = true;
    }
    _emulateAnimation(t2) {
      b(t2, this._getElement(), this._config.isAnimated);
    }
  }
  const tn = ".bs.focustrap", en = `focusin${tn}`, nn = `keydown.tab${tn}`, sn = "backward", on = { autofocus: true, trapElement: null }, rn = { autofocus: "boolean", trapElement: "element" };
  class an extends W {
    constructor(t2) {
      super(), this._config = this._getConfig(t2), this._isActive = false, this._lastTabNavDirection = null;
    }
    static get Default() {
      return on;
    }
    static get DefaultType() {
      return rn;
    }
    static get NAME() {
      return "focustrap";
    }
    activate() {
      this._isActive || (this._config.autofocus && this._config.trapElement.focus(), P.off(document, tn), P.on(document, en, (t2) => this._handleFocusin(t2)), P.on(document, nn, (t2) => this._handleKeydown(t2)), this._isActive = true);
    }
    deactivate() {
      this._isActive && (this._isActive = false, P.off(document, tn));
    }
    _handleFocusin(t2) {
      const { trapElement: e2 } = this._config;
      if (t2.target === document || t2.target === e2 || e2.contains(t2.target)) return;
      const i2 = R.focusableChildren(e2);
      0 === i2.length ? e2.focus() : this._lastTabNavDirection === sn ? i2[i2.length - 1].focus() : i2[0].focus();
    }
    _handleKeydown(t2) {
      "Tab" === t2.key && (this._lastTabNavDirection = t2.shiftKey ? sn : "forward");
    }
  }
  const ln = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", cn = ".sticky-top", hn = "padding-right", dn = "margin-right";
  class un {
    constructor() {
      this._element = document.body;
    }
    getWidth() {
      const t2 = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - t2);
    }
    hide() {
      const t2 = this.getWidth();
      this._disableOverFlow(), this._setElementAttributes(this._element, hn, (e2) => e2 + t2), this._setElementAttributes(ln, hn, (e2) => e2 + t2), this._setElementAttributes(cn, dn, (e2) => e2 - t2);
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, hn), this._resetElementAttributes(ln, hn), this._resetElementAttributes(cn, dn);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
    }
    _setElementAttributes(t2, e2, i2) {
      const n2 = this.getWidth();
      this._applyManipulationCallback(t2, (t3) => {
        if (t3 !== this._element && window.innerWidth > t3.clientWidth + n2) return;
        this._saveInitialAttribute(t3, e2);
        const s2 = window.getComputedStyle(t3).getPropertyValue(e2);
        t3.style.setProperty(e2, `${i2(Number.parseFloat(s2))}px`);
      });
    }
    _saveInitialAttribute(t2, e2) {
      const i2 = t2.style.getPropertyValue(e2);
      i2 && H.setDataAttribute(t2, e2, i2);
    }
    _resetElementAttributes(t2, e2) {
      this._applyManipulationCallback(t2, (t3) => {
        const i2 = H.getDataAttribute(t3, e2);
        null !== i2 ? (H.removeDataAttribute(t3, e2), t3.style.setProperty(e2, i2)) : t3.style.removeProperty(e2);
      });
    }
    _applyManipulationCallback(t2, e2) {
      if (r(t2)) e2(t2);
      else for (const i2 of R.find(t2, this._element)) e2(i2);
    }
  }
  const fn = ".bs.modal", pn = `hide${fn}`, mn = `hidePrevented${fn}`, gn = `hidden${fn}`, _n = `show${fn}`, bn = `shown${fn}`, vn = `resize${fn}`, yn = `click.dismiss${fn}`, wn = `mousedown.dismiss${fn}`, An = `keydown.dismiss${fn}`, En = `click${fn}.data-api`, Tn = "modal-open", Cn = "show", On = "modal-static", xn = { backdrop: true, focus: true, keyboard: true }, kn = { backdrop: "(boolean|string)", focus: "boolean", keyboard: "boolean" };
  class Ln extends B {
    constructor(t2, e2) {
      super(t2, e2), this._dialog = R.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = false, this._isTransitioning = false, this._scrollBar = new un(), this._addEventListeners();
    }
    static get Default() {
      return xn;
    }
    static get DefaultType() {
      return kn;
    }
    static get NAME() {
      return "modal";
    }
    toggle(t2) {
      return this._isShown ? this.hide() : this.show(t2);
    }
    show(t2) {
      this._isShown || this._isTransitioning || P.trigger(this._element, _n, { relatedTarget: t2 }).defaultPrevented || (this._isShown = true, this._isTransitioning = true, this._scrollBar.hide(), document.body.classList.add(Tn), this._adjustDialog(), this._backdrop.show(() => this._showElement(t2)));
    }
    hide() {
      this._isShown && !this._isTransitioning && (P.trigger(this._element, pn).defaultPrevented || (this._isShown = false, this._isTransitioning = true, this._focustrap.deactivate(), this._element.classList.remove(Cn), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated())));
    }
    dispose() {
      P.off(window, fn), P.off(this._dialog, fn), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new Zi({ isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated() });
    }
    _initializeFocusTrap() {
      return new an({ trapElement: this._element });
    }
    _showElement(t2) {
      document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", true), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
      const e2 = R.findOne(".modal-body", this._dialog);
      e2 && (e2.scrollTop = 0), u(this._element), this._element.classList.add(Cn), this._queueCallback(() => {
        this._config.focus && this._focustrap.activate(), this._isTransitioning = false, P.trigger(this._element, bn, { relatedTarget: t2 });
      }, this._dialog, this._isAnimated());
    }
    _addEventListeners() {
      P.on(this._element, An, (t2) => {
        "Escape" === t2.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition());
      }), P.on(window, vn, () => {
        this._isShown && !this._isTransitioning && this._adjustDialog();
      }), P.on(this._element, wn, (t2) => {
        P.one(this._element, yn, (e2) => {
          this._element === t2.target && this._element === e2.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition());
        });
      });
    }
    _hideModal() {
      this._element.style.display = "none", this._element.setAttribute("aria-hidden", true), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = false, this._backdrop.hide(() => {
        document.body.classList.remove(Tn), this._resetAdjustments(), this._scrollBar.reset(), P.trigger(this._element, gn);
      });
    }
    _isAnimated() {
      return this._element.classList.contains("fade");
    }
    _triggerBackdropTransition() {
      if (P.trigger(this._element, mn).defaultPrevented) return;
      const t2 = this._element.scrollHeight > document.documentElement.clientHeight, e2 = this._element.style.overflowY;
      "hidden" === e2 || this._element.classList.contains(On) || (t2 || (this._element.style.overflowY = "hidden"), this._element.classList.add(On), this._queueCallback(() => {
        this._element.classList.remove(On), this._queueCallback(() => {
          this._element.style.overflowY = e2;
        }, this._dialog);
      }, this._dialog), this._element.focus());
    }
    _adjustDialog() {
      const t2 = this._element.scrollHeight > document.documentElement.clientHeight, e2 = this._scrollBar.getWidth(), i2 = e2 > 0;
      if (i2 && !t2) {
        const t3 = m() ? "paddingLeft" : "paddingRight";
        this._element.style[t3] = `${e2}px`;
      }
      if (!i2 && t2) {
        const t3 = m() ? "paddingRight" : "paddingLeft";
        this._element.style[t3] = `${e2}px`;
      }
    }
    _resetAdjustments() {
      this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
    }
    static jQueryInterface(t2, e2) {
      return this.each(function() {
        const i2 = Ln.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === i2[t2]) throw new TypeError(`No method named "${t2}"`);
          i2[t2](e2);
        }
      });
    }
  }
  P.on(document, En, '[data-bs-toggle="modal"]', function(t2) {
    const e2 = R.getElementFromSelector(this);
    ["A", "AREA"].includes(this.tagName) && t2.preventDefault(), P.one(e2, _n, (t3) => {
      t3.defaultPrevented || P.one(e2, gn, () => {
        l(this) && this.focus();
      });
    });
    const i2 = R.findOne(".modal.show");
    i2 && Ln.getInstance(i2).hide(), Ln.getOrCreateInstance(e2).toggle(this);
  }), q(Ln), g(Ln);
  const Sn = ".bs.offcanvas", Dn = ".data-api", $n = `load${Sn}${Dn}`, In = "show", Nn = "showing", Pn = "hiding", jn = ".offcanvas.show", Mn = `show${Sn}`, Fn = `shown${Sn}`, Hn = `hide${Sn}`, Wn = `hidePrevented${Sn}`, Bn = `hidden${Sn}`, zn = `resize${Sn}`, Rn = `click${Sn}${Dn}`, qn = `keydown.dismiss${Sn}`, Vn = { backdrop: true, keyboard: true, scroll: false }, Kn = { backdrop: "(boolean|string)", keyboard: "boolean", scroll: "boolean" };
  class Qn extends B {
    constructor(t2, e2) {
      super(t2, e2), this._isShown = false, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
    }
    static get Default() {
      return Vn;
    }
    static get DefaultType() {
      return Kn;
    }
    static get NAME() {
      return "offcanvas";
    }
    toggle(t2) {
      return this._isShown ? this.hide() : this.show(t2);
    }
    show(t2) {
      this._isShown || P.trigger(this._element, Mn, { relatedTarget: t2 }).defaultPrevented || (this._isShown = true, this._backdrop.show(), this._config.scroll || new un().hide(), this._element.setAttribute("aria-modal", true), this._element.setAttribute("role", "dialog"), this._element.classList.add(Nn), this._queueCallback(() => {
        this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add(In), this._element.classList.remove(Nn), P.trigger(this._element, Fn, { relatedTarget: t2 });
      }, this._element, true));
    }
    hide() {
      this._isShown && (P.trigger(this._element, Hn).defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = false, this._element.classList.add(Pn), this._backdrop.hide(), this._queueCallback(() => {
        this._element.classList.remove(In, Pn), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new un().reset(), P.trigger(this._element, Bn);
      }, this._element, true)));
    }
    dispose() {
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    _initializeBackDrop() {
      const t2 = Boolean(this._config.backdrop);
      return new Zi({ className: "offcanvas-backdrop", isVisible: t2, isAnimated: true, rootElement: this._element.parentNode, clickCallback: t2 ? () => {
        "static" !== this._config.backdrop ? this.hide() : P.trigger(this._element, Wn);
      } : null });
    }
    _initializeFocusTrap() {
      return new an({ trapElement: this._element });
    }
    _addEventListeners() {
      P.on(this._element, qn, (t2) => {
        "Escape" === t2.key && (this._config.keyboard ? this.hide() : P.trigger(this._element, Wn));
      });
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Qn.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
          e2[t2](this);
        }
      });
    }
  }
  P.on(document, Rn, '[data-bs-toggle="offcanvas"]', function(t2) {
    const e2 = R.getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName) && t2.preventDefault(), c(this)) return;
    P.one(e2, Bn, () => {
      l(this) && this.focus();
    });
    const i2 = R.findOne(jn);
    i2 && i2 !== e2 && Qn.getInstance(i2).hide(), Qn.getOrCreateInstance(e2).toggle(this);
  }), P.on(window, $n, () => {
    for (const t2 of R.find(jn)) Qn.getOrCreateInstance(t2).show();
  }), P.on(window, zn, () => {
    for (const t2 of R.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(t2).position && Qn.getOrCreateInstance(t2).hide();
  }), q(Qn), g(Qn);
  const Xn = { "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i], a: ["target", "href", "title", "rel"], area: [], b: [], br: [], col: [], code: [], dd: [], div: [], dl: [], dt: [], em: [], hr: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], i: [], img: ["src", "srcset", "alt", "title", "width", "height"], li: [], ol: [], p: [], pre: [], s: [], small: [], span: [], sub: [], sup: [], strong: [], u: [], ul: [] }, Yn = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), Un = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, Gn = (t2, e2) => {
    const i2 = t2.nodeName.toLowerCase();
    return e2.includes(i2) ? !Yn.has(i2) || Boolean(Un.test(t2.nodeValue)) : e2.filter((t3) => t3 instanceof RegExp).some((t3) => t3.test(i2));
  }, Jn = { allowList: Xn, content: {}, extraClass: "", html: false, sanitize: true, sanitizeFn: null, template: "<div></div>" }, Zn = { allowList: "object", content: "object", extraClass: "(string|function)", html: "boolean", sanitize: "boolean", sanitizeFn: "(null|function)", template: "string" }, ts = { entry: "(string|element|function|null)", selector: "(string|element)" };
  class es extends W {
    constructor(t2) {
      super(), this._config = this._getConfig(t2);
    }
    static get Default() {
      return Jn;
    }
    static get DefaultType() {
      return Zn;
    }
    static get NAME() {
      return "TemplateFactory";
    }
    getContent() {
      return Object.values(this._config.content).map((t2) => this._resolvePossibleFunction(t2)).filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(t2) {
      return this._checkContent(t2), this._config.content = { ...this._config.content, ...t2 }, this;
    }
    toHtml() {
      const t2 = document.createElement("div");
      t2.innerHTML = this._maybeSanitize(this._config.template);
      for (const [e3, i3] of Object.entries(this._config.content)) this._setContent(t2, i3, e3);
      const e2 = t2.children[0], i2 = this._resolvePossibleFunction(this._config.extraClass);
      return i2 && e2.classList.add(...i2.split(" ")), e2;
    }
    _typeCheckConfig(t2) {
      super._typeCheckConfig(t2), this._checkContent(t2.content);
    }
    _checkContent(t2) {
      for (const [e2, i2] of Object.entries(t2)) super._typeCheckConfig({ selector: e2, entry: i2 }, ts);
    }
    _setContent(t2, e2, i2) {
      const n2 = R.findOne(i2, t2);
      n2 && ((e2 = this._resolvePossibleFunction(e2)) ? r(e2) ? this._putElementInTemplate(a(e2), n2) : this._config.html ? n2.innerHTML = this._maybeSanitize(e2) : n2.textContent = e2 : n2.remove());
    }
    _maybeSanitize(t2) {
      return this._config.sanitize ? (function(t3, e2, i2) {
        if (!t3.length) return t3;
        if (i2 && "function" == typeof i2) return i2(t3);
        const n2 = new window.DOMParser().parseFromString(t3, "text/html"), s2 = [].concat(...n2.body.querySelectorAll("*"));
        for (const t4 of s2) {
          const i3 = t4.nodeName.toLowerCase();
          if (!Object.keys(e2).includes(i3)) {
            t4.remove();
            continue;
          }
          const n3 = [].concat(...t4.attributes), s3 = [].concat(e2["*"] || [], e2[i3] || []);
          for (const e3 of n3) Gn(e3, s3) || t4.removeAttribute(e3.nodeName);
        }
        return n2.body.innerHTML;
      })(t2, this._config.allowList, this._config.sanitizeFn) : t2;
    }
    _resolvePossibleFunction(t2) {
      return _(t2, [void 0, this]);
    }
    _putElementInTemplate(t2, e2) {
      if (this._config.html) return e2.innerHTML = "", void e2.append(t2);
      e2.textContent = t2.textContent;
    }
  }
  const is = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), ns = "fade", ss = "show", os = ".tooltip-inner", rs = ".modal", as = "hide.bs.modal", ls = "hover", cs = "focus", hs = "click", ds = { AUTO: "auto", TOP: "top", RIGHT: m() ? "left" : "right", BOTTOM: "bottom", LEFT: m() ? "right" : "left" }, us = { allowList: Xn, animation: true, boundary: "clippingParents", container: false, customClass: "", delay: 0, fallbackPlacements: ["top", "right", "bottom", "left"], html: false, offset: [0, 6], placement: "top", popperConfig: null, sanitize: true, sanitizeFn: null, selector: false, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', title: "", trigger: "hover focus" }, fs = { allowList: "object", animation: "boolean", boundary: "(string|element)", container: "(string|element|boolean)", customClass: "(string|function)", delay: "(number|object)", fallbackPlacements: "array", html: "boolean", offset: "(array|string|function)", placement: "(string|function)", popperConfig: "(null|object|function)", sanitize: "boolean", sanitizeFn: "(null|function)", selector: "(string|boolean)", template: "string", title: "(string|element|function)", trigger: "string" };
  class ps extends B {
    constructor(t2, e2) {
      if (void 0 === Ai) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");
      super(t2, e2), this._isEnabled = true, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
    }
    static get Default() {
      return us;
    }
    static get DefaultType() {
      return fs;
    }
    static get NAME() {
      return "tooltip";
    }
    enable() {
      this._isEnabled = true;
    }
    disable() {
      this._isEnabled = false;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      this._isEnabled && (this._isShown() ? this._leave() : this._enter());
    }
    dispose() {
      clearTimeout(this._timeout), P.off(this._element.closest(rs), as, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
    }
    show() {
      if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
      if (!this._isWithContent() || !this._isEnabled) return;
      const t2 = P.trigger(this._element, this.constructor.eventName("show")), e2 = (h(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
      if (t2.defaultPrevented || !e2) return;
      this._disposePopper();
      const i2 = this._getTipElement();
      this._element.setAttribute("aria-describedby", i2.getAttribute("id"));
      const { container: n2 } = this._config;
      if (this._element.ownerDocument.documentElement.contains(this.tip) || (n2.append(i2), P.trigger(this._element, this.constructor.eventName("inserted"))), this._popper = this._createPopper(i2), i2.classList.add(ss), "ontouchstart" in document.documentElement) for (const t3 of [].concat(...document.body.children)) P.on(t3, "mouseover", d);
      this._queueCallback(() => {
        P.trigger(this._element, this.constructor.eventName("shown")), false === this._isHovered && this._leave(), this._isHovered = false;
      }, this.tip, this._isAnimated());
    }
    hide() {
      if (this._isShown() && !P.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) {
        if (this._getTipElement().classList.remove(ss), "ontouchstart" in document.documentElement) for (const t2 of [].concat(...document.body.children)) P.off(t2, "mouseover", d);
        this._activeTrigger[hs] = false, this._activeTrigger[cs] = false, this._activeTrigger[ls] = false, this._isHovered = null, this._queueCallback(() => {
          this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), P.trigger(this._element, this.constructor.eventName("hidden")));
        }, this.tip, this._isAnimated());
      }
    }
    update() {
      this._popper && this._popper.update();
    }
    _isWithContent() {
      return Boolean(this._getTitle());
    }
    _getTipElement() {
      return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip;
    }
    _createTipElement(t2) {
      const e2 = this._getTemplateFactory(t2).toHtml();
      if (!e2) return null;
      e2.classList.remove(ns, ss), e2.classList.add(`bs-${this.constructor.NAME}-auto`);
      const i2 = ((t3) => {
        do {
          t3 += Math.floor(1e6 * Math.random());
        } while (document.getElementById(t3));
        return t3;
      })(this.constructor.NAME).toString();
      return e2.setAttribute("id", i2), this._isAnimated() && e2.classList.add(ns), e2;
    }
    setContent(t2) {
      this._newContent = t2, this._isShown() && (this._disposePopper(), this.show());
    }
    _getTemplateFactory(t2) {
      return this._templateFactory ? this._templateFactory.changeContent(t2) : this._templateFactory = new es({ ...this._config, content: t2, extraClass: this._resolvePossibleFunction(this._config.customClass) }), this._templateFactory;
    }
    _getContentForTemplate() {
      return { [os]: this._getTitle() };
    }
    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
    }
    _initializeOnDelegatedTarget(t2) {
      return this.constructor.getOrCreateInstance(t2.delegateTarget, this._getDelegateConfig());
    }
    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(ns);
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(ss);
    }
    _createPopper(t2) {
      const e2 = _(this._config.placement, [this, t2, this._element]), i2 = ds[e2.toUpperCase()];
      return wi(this._element, t2, this._getPopperConfig(i2));
    }
    _getOffset() {
      const { offset: t2 } = this._config;
      return "string" == typeof t2 ? t2.split(",").map((t3) => Number.parseInt(t3, 10)) : "function" == typeof t2 ? (e2) => t2(e2, this._element) : t2;
    }
    _resolvePossibleFunction(t2) {
      return _(t2, [this._element, this._element]);
    }
    _getPopperConfig(t2) {
      const e2 = { placement: t2, modifiers: [{ name: "flip", options: { fallbackPlacements: this._config.fallbackPlacements } }, { name: "offset", options: { offset: this._getOffset() } }, { name: "preventOverflow", options: { boundary: this._config.boundary } }, { name: "arrow", options: { element: `.${this.constructor.NAME}-arrow` } }, { name: "preSetPlacement", enabled: true, phase: "beforeMain", fn: (t3) => {
        this._getTipElement().setAttribute("data-popper-placement", t3.state.placement);
      } }] };
      return { ...e2, ..._(this._config.popperConfig, [void 0, e2]) };
    }
    _setListeners() {
      const t2 = this._config.trigger.split(" ");
      for (const e2 of t2) if ("click" === e2) P.on(this._element, this.constructor.eventName("click"), this._config.selector, (t3) => {
        const e3 = this._initializeOnDelegatedTarget(t3);
        e3._activeTrigger[hs] = !(e3._isShown() && e3._activeTrigger[hs]), e3.toggle();
      });
      else if ("manual" !== e2) {
        const t3 = e2 === ls ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"), i2 = e2 === ls ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
        P.on(this._element, t3, this._config.selector, (t4) => {
          const e3 = this._initializeOnDelegatedTarget(t4);
          e3._activeTrigger["focusin" === t4.type ? cs : ls] = true, e3._enter();
        }), P.on(this._element, i2, this._config.selector, (t4) => {
          const e3 = this._initializeOnDelegatedTarget(t4);
          e3._activeTrigger["focusout" === t4.type ? cs : ls] = e3._element.contains(t4.relatedTarget), e3._leave();
        });
      }
      this._hideModalHandler = () => {
        this._element && this.hide();
      }, P.on(this._element.closest(rs), as, this._hideModalHandler);
    }
    _fixTitle() {
      const t2 = this._element.getAttribute("title");
      t2 && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", t2), this._element.setAttribute("data-bs-original-title", t2), this._element.removeAttribute("title"));
    }
    _enter() {
      this._isShown() || this._isHovered ? this._isHovered = true : (this._isHovered = true, this._setTimeout(() => {
        this._isHovered && this.show();
      }, this._config.delay.show));
    }
    _leave() {
      this._isWithActiveTrigger() || (this._isHovered = false, this._setTimeout(() => {
        this._isHovered || this.hide();
      }, this._config.delay.hide));
    }
    _setTimeout(t2, e2) {
      clearTimeout(this._timeout), this._timeout = setTimeout(t2, e2);
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }
    _getConfig(t2) {
      const e2 = H.getDataAttributes(this._element);
      for (const t3 of Object.keys(e2)) is.has(t3) && delete e2[t3];
      return t2 = { ...e2, ..."object" == typeof t2 && t2 ? t2 : {} }, t2 = this._mergeConfigObj(t2), t2 = this._configAfterMerge(t2), this._typeCheckConfig(t2), t2;
    }
    _configAfterMerge(t2) {
      return t2.container = false === t2.container ? document.body : a(t2.container), "number" == typeof t2.delay && (t2.delay = { show: t2.delay, hide: t2.delay }), "number" == typeof t2.title && (t2.title = t2.title.toString()), "number" == typeof t2.content && (t2.content = t2.content.toString()), t2;
    }
    _getDelegateConfig() {
      const t2 = {};
      for (const [e2, i2] of Object.entries(this._config)) this.constructor.Default[e2] !== i2 && (t2[e2] = i2);
      return t2.selector = false, t2.trigger = "manual", t2;
    }
    _disposePopper() {
      this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null);
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = ps.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  g(ps);
  const ms = ".popover-header", gs = ".popover-body", _s = { ...ps.Default, content: "", offset: [0, 8], placement: "right", template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>', trigger: "click" }, bs = { ...ps.DefaultType, content: "(null|string|element|function)" };
  class vs extends ps {
    static get Default() {
      return _s;
    }
    static get DefaultType() {
      return bs;
    }
    static get NAME() {
      return "popover";
    }
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }
    _getContentForTemplate() {
      return { [ms]: this._getTitle(), [gs]: this._getContent() };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = vs.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  g(vs);
  const ys = ".bs.scrollspy", ws = `activate${ys}`, As = `click${ys}`, Es = `load${ys}.data-api`, Ts = "active", Cs = "[href]", Os = ".nav-link", xs = `${Os}, .nav-item > ${Os}, .list-group-item`, ks = { offset: null, rootMargin: "0px 0px -25%", smoothScroll: false, target: null, threshold: [0.1, 0.5, 1] }, Ls = { offset: "(number|null)", rootMargin: "string", smoothScroll: "boolean", target: "element", threshold: "array" };
  class Ss extends B {
    constructor(t2, e2) {
      super(t2, e2), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }, this.refresh();
    }
    static get Default() {
      return ks;
    }
    static get DefaultType() {
      return Ls;
    }
    static get NAME() {
      return "scrollspy";
    }
    refresh() {
      this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
      for (const t2 of this._observableSections.values()) this._observer.observe(t2);
    }
    dispose() {
      this._observer.disconnect(), super.dispose();
    }
    _configAfterMerge(t2) {
      return t2.target = a(t2.target) || document.body, t2.rootMargin = t2.offset ? `${t2.offset}px 0px -30%` : t2.rootMargin, "string" == typeof t2.threshold && (t2.threshold = t2.threshold.split(",").map((t3) => Number.parseFloat(t3))), t2;
    }
    _maybeEnableSmoothScroll() {
      this._config.smoothScroll && (P.off(this._config.target, As), P.on(this._config.target, As, Cs, (t2) => {
        const e2 = this._observableSections.get(t2.target.hash);
        if (e2) {
          t2.preventDefault();
          const i2 = this._rootElement || window, n2 = e2.offsetTop - this._element.offsetTop;
          if (i2.scrollTo) return void i2.scrollTo({ top: n2, behavior: "smooth" });
          i2.scrollTop = n2;
        }
      }));
    }
    _getNewObserver() {
      const t2 = { root: this._rootElement, threshold: this._config.threshold, rootMargin: this._config.rootMargin };
      return new IntersectionObserver((t3) => this._observerCallback(t3), t2);
    }
    _observerCallback(t2) {
      const e2 = (t3) => this._targetLinks.get(`#${t3.target.id}`), i2 = (t3) => {
        this._previousScrollData.visibleEntryTop = t3.target.offsetTop, this._process(e2(t3));
      }, n2 = (this._rootElement || document.documentElement).scrollTop, s2 = n2 >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = n2;
      for (const o2 of t2) {
        if (!o2.isIntersecting) {
          this._activeTarget = null, this._clearActiveClass(e2(o2));
          continue;
        }
        const t3 = o2.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        if (s2 && t3) {
          if (i2(o2), !n2) return;
        } else s2 || t3 || i2(o2);
      }
    }
    _initializeTargetsAndObservables() {
      this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map();
      const t2 = R.find(Cs, this._config.target);
      for (const e2 of t2) {
        if (!e2.hash || c(e2)) continue;
        const t3 = R.findOne(decodeURI(e2.hash), this._element);
        l(t3) && (this._targetLinks.set(decodeURI(e2.hash), e2), this._observableSections.set(e2.hash, t3));
      }
    }
    _process(t2) {
      this._activeTarget !== t2 && (this._clearActiveClass(this._config.target), this._activeTarget = t2, t2.classList.add(Ts), this._activateParents(t2), P.trigger(this._element, ws, { relatedTarget: t2 }));
    }
    _activateParents(t2) {
      if (t2.classList.contains("dropdown-item")) R.findOne(".dropdown-toggle", t2.closest(".dropdown")).classList.add(Ts);
      else for (const e2 of R.parents(t2, ".nav, .list-group")) for (const t3 of R.prev(e2, xs)) t3.classList.add(Ts);
    }
    _clearActiveClass(t2) {
      t2.classList.remove(Ts);
      const e2 = R.find(`${Cs}.${Ts}`, t2);
      for (const t3 of e2) t3.classList.remove(Ts);
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Ss.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  P.on(window, Es, () => {
    for (const t2 of R.find('[data-bs-spy="scroll"]')) Ss.getOrCreateInstance(t2);
  }), g(Ss);
  const Ds = ".bs.tab", $s = `hide${Ds}`, Is = `hidden${Ds}`, Ns = `show${Ds}`, Ps = `shown${Ds}`, js = `click${Ds}`, Ms = `keydown${Ds}`, Fs = `load${Ds}`, Hs = "ArrowLeft", Ws = "ArrowRight", Bs = "ArrowUp", zs = "ArrowDown", Rs = "Home", qs = "End", Vs = "active", Ks = "fade", Qs = "show", Xs = ".dropdown-toggle", Ys = `:not(${Xs})`, Us = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', Gs = `.nav-link${Ys}, .list-group-item${Ys}, [role="tab"]${Ys}, ${Us}`, Js = `.${Vs}[data-bs-toggle="tab"], .${Vs}[data-bs-toggle="pill"], .${Vs}[data-bs-toggle="list"]`;
  class Zs extends B {
    constructor(t2) {
      super(t2), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), P.on(this._element, Ms, (t3) => this._keydown(t3)));
    }
    static get NAME() {
      return "tab";
    }
    show() {
      const t2 = this._element;
      if (this._elemIsActive(t2)) return;
      const e2 = this._getActiveElem(), i2 = e2 ? P.trigger(e2, $s, { relatedTarget: t2 }) : null;
      P.trigger(t2, Ns, { relatedTarget: e2 }).defaultPrevented || i2 && i2.defaultPrevented || (this._deactivate(e2, t2), this._activate(t2, e2));
    }
    _activate(t2, e2) {
      t2 && (t2.classList.add(Vs), this._activate(R.getElementFromSelector(t2)), this._queueCallback(() => {
        "tab" === t2.getAttribute("role") ? (t2.removeAttribute("tabindex"), t2.setAttribute("aria-selected", true), this._toggleDropDown(t2, true), P.trigger(t2, Ps, { relatedTarget: e2 })) : t2.classList.add(Qs);
      }, t2, t2.classList.contains(Ks)));
    }
    _deactivate(t2, e2) {
      t2 && (t2.classList.remove(Vs), t2.blur(), this._deactivate(R.getElementFromSelector(t2)), this._queueCallback(() => {
        "tab" === t2.getAttribute("role") ? (t2.setAttribute("aria-selected", false), t2.setAttribute("tabindex", "-1"), this._toggleDropDown(t2, false), P.trigger(t2, Is, { relatedTarget: e2 })) : t2.classList.remove(Qs);
      }, t2, t2.classList.contains(Ks)));
    }
    _keydown(t2) {
      if (![Hs, Ws, Bs, zs, Rs, qs].includes(t2.key)) return;
      t2.stopPropagation(), t2.preventDefault();
      const e2 = this._getChildren().filter((t3) => !c(t3));
      let i2;
      if ([Rs, qs].includes(t2.key)) i2 = e2[t2.key === Rs ? 0 : e2.length - 1];
      else {
        const n2 = [Ws, zs].includes(t2.key);
        i2 = v(e2, t2.target, n2, true);
      }
      i2 && (i2.focus({ preventScroll: true }), Zs.getOrCreateInstance(i2).show());
    }
    _getChildren() {
      return R.find(Gs, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find((t2) => this._elemIsActive(t2)) || null;
    }
    _setInitialAttributes(t2, e2) {
      this._setAttributeIfNotExists(t2, "role", "tablist");
      for (const t3 of e2) this._setInitialAttributesOnChild(t3);
    }
    _setInitialAttributesOnChild(t2) {
      t2 = this._getInnerElement(t2);
      const e2 = this._elemIsActive(t2), i2 = this._getOuterElement(t2);
      t2.setAttribute("aria-selected", e2), i2 !== t2 && this._setAttributeIfNotExists(i2, "role", "presentation"), e2 || t2.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t2, "role", "tab"), this._setInitialAttributesOnTargetPanel(t2);
    }
    _setInitialAttributesOnTargetPanel(t2) {
      const e2 = R.getElementFromSelector(t2);
      e2 && (this._setAttributeIfNotExists(e2, "role", "tabpanel"), t2.id && this._setAttributeIfNotExists(e2, "aria-labelledby", `${t2.id}`));
    }
    _toggleDropDown(t2, e2) {
      const i2 = this._getOuterElement(t2);
      if (!i2.classList.contains("dropdown")) return;
      const n2 = (t3, n3) => {
        const s2 = R.findOne(t3, i2);
        s2 && s2.classList.toggle(n3, e2);
      };
      n2(Xs, Vs), n2(".dropdown-menu", Qs), i2.setAttribute("aria-expanded", e2);
    }
    _setAttributeIfNotExists(t2, e2, i2) {
      t2.hasAttribute(e2) || t2.setAttribute(e2, i2);
    }
    _elemIsActive(t2) {
      return t2.classList.contains(Vs);
    }
    _getInnerElement(t2) {
      return t2.matches(Gs) ? t2 : R.findOne(Gs, t2);
    }
    _getOuterElement(t2) {
      return t2.closest(".nav-item, .list-group-item") || t2;
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Zs.getOrCreateInstance(this);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  P.on(document, js, Us, function(t2) {
    ["A", "AREA"].includes(this.tagName) && t2.preventDefault(), c(this) || Zs.getOrCreateInstance(this).show();
  }), P.on(window, Fs, () => {
    for (const t2 of R.find(Js)) Zs.getOrCreateInstance(t2);
  }), g(Zs);
  const to = ".bs.toast", eo = `mouseover${to}`, io = `mouseout${to}`, no = `focusin${to}`, so = `focusout${to}`, oo = `hide${to}`, ro = `hidden${to}`, ao = `show${to}`, lo = `shown${to}`, co = "hide", ho = "show", uo = "showing", fo = { animation: "boolean", autohide: "boolean", delay: "number" }, po = { animation: true, autohide: true, delay: 5e3 };
  class mo extends B {
    constructor(t2, e2) {
      super(t2, e2), this._timeout = null, this._hasMouseInteraction = false, this._hasKeyboardInteraction = false, this._setListeners();
    }
    static get Default() {
      return po;
    }
    static get DefaultType() {
      return fo;
    }
    static get NAME() {
      return "toast";
    }
    show() {
      P.trigger(this._element, ao).defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove(co), u(this._element), this._element.classList.add(ho, uo), this._queueCallback(() => {
        this._element.classList.remove(uo), P.trigger(this._element, lo), this._maybeScheduleHide();
      }, this._element, this._config.animation));
    }
    hide() {
      this.isShown() && (P.trigger(this._element, oo).defaultPrevented || (this._element.classList.add(uo), this._queueCallback(() => {
        this._element.classList.add(co), this._element.classList.remove(uo, ho), P.trigger(this._element, ro);
      }, this._element, this._config.animation)));
    }
    dispose() {
      this._clearTimeout(), this.isShown() && this._element.classList.remove(ho), super.dispose();
    }
    isShown() {
      return this._element.classList.contains(ho);
    }
    _maybeScheduleHide() {
      this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay)));
    }
    _onInteraction(t2, e2) {
      switch (t2.type) {
        case "mouseover":
        case "mouseout":
          this._hasMouseInteraction = e2;
          break;
        case "focusin":
        case "focusout":
          this._hasKeyboardInteraction = e2;
      }
      if (e2) return void this._clearTimeout();
      const i2 = t2.relatedTarget;
      this._element === i2 || this._element.contains(i2) || this._maybeScheduleHide();
    }
    _setListeners() {
      P.on(this._element, eo, (t2) => this._onInteraction(t2, true)), P.on(this._element, io, (t2) => this._onInteraction(t2, false)), P.on(this._element, no, (t2) => this._onInteraction(t2, true)), P.on(this._element, so, (t2) => this._onInteraction(t2, false));
    }
    _clearTimeout() {
      clearTimeout(this._timeout), this._timeout = null;
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = mo.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
          e2[t2](this);
        }
      });
    }
  }
  return q(mo), g(mo), { Alert: X, Button: U, Carousel: St, Collapse: qt, Dropdown: Qi, Modal: Ln, Offcanvas: Qn, Popover: vs, ScrollSpy: Ss, Tab: Zs, Toast: mo, Tooltip: ps };
});
(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = global2 || self, global2.CodeMirror = factory());
})(this, (function() {
  "use strict";
  var userAgent = navigator.userAgent;
  var platform = navigator.platform;
  var gecko = /gecko\/\d/i.test(userAgent);
  var ie_upto10 = /MSIE \d/.test(userAgent);
  var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent);
  var edge = /Edge\/(\d+)/.exec(userAgent);
  var ie = ie_upto10 || ie_11up || edge;
  var ie_version = ie && (ie_upto10 ? document.documentMode || 6 : +(edge || ie_11up)[1]);
  var webkit = !edge && /WebKit\//.test(userAgent);
  var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(userAgent);
  var chrome = !edge && /Chrome\/(\d+)/.exec(userAgent);
  var chrome_version = chrome && +chrome[1];
  var presto = /Opera\//.test(userAgent);
  var safari = /Apple Computer/.test(navigator.vendor);
  var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(userAgent);
  var phantom = /PhantomJS/.test(userAgent);
  var ios = safari && (/Mobile\/\w+/.test(userAgent) || navigator.maxTouchPoints > 2);
  var android = /Android/.test(userAgent);
  var mobile = ios || android || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
  var mac = ios || /Mac/.test(platform);
  var chromeOS = /\bCrOS\b/.test(userAgent);
  var windows = /win/i.test(platform);
  var presto_version = presto && userAgent.match(/Version\/(\d*\.\d*)/);
  if (presto_version) {
    presto_version = Number(presto_version[1]);
  }
  if (presto_version && presto_version >= 15) {
    presto = false;
    webkit = true;
  }
  var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
  var captureRightClick = gecko || ie && ie_version >= 9;
  function classTest(cls) {
    return new RegExp("(^|\\s)" + cls + "(?:$|\\s)\\s*");
  }
  var rmClass = function(node, cls) {
    var current = node.className;
    var match = classTest(cls).exec(current);
    if (match) {
      var after = current.slice(match.index + match[0].length);
      node.className = current.slice(0, match.index) + (after ? match[1] + after : "");
    }
  };
  function removeChildren(e) {
    for (var count = e.childNodes.length; count > 0; --count) {
      e.removeChild(e.firstChild);
    }
    return e;
  }
  function removeChildrenAndAdd(parent, e) {
    return removeChildren(parent).appendChild(e);
  }
  function elt(tag, content, className, style) {
    var e = document.createElement(tag);
    if (className) {
      e.className = className;
    }
    if (style) {
      e.style.cssText = style;
    }
    if (typeof content == "string") {
      e.appendChild(document.createTextNode(content));
    } else if (content) {
      for (var i2 = 0; i2 < content.length; ++i2) {
        e.appendChild(content[i2]);
      }
    }
    return e;
  }
  function eltP(tag, content, className, style) {
    var e = elt(tag, content, className, style);
    e.setAttribute("role", "presentation");
    return e;
  }
  var range;
  if (document.createRange) {
    range = function(node, start, end, endNode) {
      var r = document.createRange();
      r.setEnd(endNode || node, end);
      r.setStart(node, start);
      return r;
    };
  } else {
    range = function(node, start, end) {
      var r = document.body.createTextRange();
      try {
        r.moveToElementText(node.parentNode);
      } catch (e) {
        return r;
      }
      r.collapse(true);
      r.moveEnd("character", end);
      r.moveStart("character", start);
      return r;
    };
  }
  function contains(parent, child) {
    if (child.nodeType == 3) {
      child = child.parentNode;
    }
    if (parent.contains) {
      return parent.contains(child);
    }
    do {
      if (child.nodeType == 11) {
        child = child.host;
      }
      if (child == parent) {
        return true;
      }
    } while (child = child.parentNode);
  }
  function activeElt(rootNode2) {
    var doc2 = rootNode2.ownerDocument || rootNode2;
    var activeElement;
    try {
      activeElement = rootNode2.activeElement;
    } catch (e) {
      activeElement = doc2.body || null;
    }
    while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
      activeElement = activeElement.shadowRoot.activeElement;
    }
    return activeElement;
  }
  function addClass(node, cls) {
    var current = node.className;
    if (!classTest(cls).test(current)) {
      node.className += (current ? " " : "") + cls;
    }
  }
  function joinClasses(a, b) {
    var as = a.split(" ");
    for (var i2 = 0; i2 < as.length; i2++) {
      if (as[i2] && !classTest(as[i2]).test(b)) {
        b += " " + as[i2];
      }
    }
    return b;
  }
  var selectInput = function(node) {
    node.select();
  };
  if (ios) {
    selectInput = function(node) {
      node.selectionStart = 0;
      node.selectionEnd = node.value.length;
    };
  } else if (ie) {
    selectInput = function(node) {
      try {
        node.select();
      } catch (_e) {
      }
    };
  }
  function doc(cm) {
    return cm.display.wrapper.ownerDocument;
  }
  function root(cm) {
    return rootNode(cm.display.wrapper);
  }
  function rootNode(element) {
    return element.getRootNode ? element.getRootNode() : element.ownerDocument;
  }
  function win(cm) {
    return doc(cm).defaultView;
  }
  function bind(f) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
      return f.apply(null, args);
    };
  }
  function copyObj(obj, target, overwrite) {
    if (!target) {
      target = {};
    }
    for (var prop2 in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop2) && (overwrite !== false || !Object.prototype.hasOwnProperty.call(target, prop2))) {
        target[prop2] = obj[prop2];
      }
    }
    return target;
  }
  function countColumn(string, end, tabSize, startIndex, startValue) {
    if (end == null) {
      end = string.search(/[^\s\u00a0]/);
      if (end == -1) {
        end = string.length;
      }
    }
    for (var i2 = startIndex || 0, n = startValue || 0; ; ) {
      var nextTab = string.indexOf("	", i2);
      if (nextTab < 0 || nextTab >= end) {
        return n + (end - i2);
      }
      n += nextTab - i2;
      n += tabSize - n % tabSize;
      i2 = nextTab + 1;
    }
  }
  var Delayed = function() {
    this.id = null;
    this.f = null;
    this.time = 0;
    this.handler = bind(this.onTimeout, this);
  };
  Delayed.prototype.onTimeout = function(self2) {
    self2.id = 0;
    if (self2.time <= +/* @__PURE__ */ new Date()) {
      self2.f();
    } else {
      setTimeout(self2.handler, self2.time - +/* @__PURE__ */ new Date());
    }
  };
  Delayed.prototype.set = function(ms, f) {
    this.f = f;
    var time = +/* @__PURE__ */ new Date() + ms;
    if (!this.id || time < this.time) {
      clearTimeout(this.id);
      this.id = setTimeout(this.handler, ms);
      this.time = time;
    }
  };
  function indexOf(array, elt2) {
    for (var i2 = 0; i2 < array.length; ++i2) {
      if (array[i2] == elt2) {
        return i2;
      }
    }
    return -1;
  }
  var scrollerGap = 50;
  var Pass = { toString: function() {
    return "CodeMirror.Pass";
  } };
  var sel_dontScroll = { scroll: false }, sel_mouse = { origin: "*mouse" }, sel_move = { origin: "+move" };
  function findColumn(string, goal, tabSize) {
    for (var pos = 0, col = 0; ; ) {
      var nextTab = string.indexOf("	", pos);
      if (nextTab == -1) {
        nextTab = string.length;
      }
      var skipped = nextTab - pos;
      if (nextTab == string.length || col + skipped >= goal) {
        return pos + Math.min(skipped, goal - col);
      }
      col += nextTab - pos;
      col += tabSize - col % tabSize;
      pos = nextTab + 1;
      if (col >= goal) {
        return pos;
      }
    }
  }
  var spaceStrs = [""];
  function spaceStr(n) {
    while (spaceStrs.length <= n) {
      spaceStrs.push(lst(spaceStrs) + " ");
    }
    return spaceStrs[n];
  }
  function lst(arr) {
    return arr[arr.length - 1];
  }
  function map(array, f) {
    var out = [];
    for (var i2 = 0; i2 < array.length; i2++) {
      out[i2] = f(array[i2], i2);
    }
    return out;
  }
  function insertSorted(array, value, score) {
    var pos = 0, priority = score(value);
    while (pos < array.length && score(array[pos]) <= priority) {
      pos++;
    }
    array.splice(pos, 0, value);
  }
  function nothing() {
  }
  function createObj(base, props) {
    var inst;
    if (Object.create) {
      inst = Object.create(base);
    } else {
      nothing.prototype = base;
      inst = new nothing();
    }
    if (props) {
      copyObj(props, inst);
    }
    return inst;
  }
  var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
  function isWordCharBasic(ch) {
    return /\w/.test(ch) || ch > "\x80" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch));
  }
  function isWordChar(ch, helper) {
    if (!helper) {
      return isWordCharBasic(ch);
    }
    if (helper.source.indexOf("\\w") > -1 && isWordCharBasic(ch)) {
      return true;
    }
    return helper.test(ch);
  }
  function isEmpty(obj) {
    for (var n in obj) {
      if (obj.hasOwnProperty(n) && obj[n]) {
        return false;
      }
    }
    return true;
  }
  var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
  function isExtendingChar(ch) {
    return ch.charCodeAt(0) >= 768 && extendingChars.test(ch);
  }
  function skipExtendingChars(str, pos, dir) {
    while ((dir < 0 ? pos > 0 : pos < str.length) && isExtendingChar(str.charAt(pos))) {
      pos += dir;
    }
    return pos;
  }
  function findFirst(pred, from, to) {
    var dir = from > to ? -1 : 1;
    for (; ; ) {
      if (from == to) {
        return from;
      }
      var midF = (from + to) / 2, mid = dir < 0 ? Math.ceil(midF) : Math.floor(midF);
      if (mid == from) {
        return pred(mid) ? from : to;
      }
      if (pred(mid)) {
        to = mid;
      } else {
        from = mid + dir;
      }
    }
  }
  function iterateBidiSections(order, from, to, f) {
    if (!order) {
      return f(from, to, "ltr", 0);
    }
    var found = false;
    for (var i2 = 0; i2 < order.length; ++i2) {
      var part = order[i2];
      if (part.from < to && part.to > from || from == to && part.to == from) {
        f(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr", i2);
        found = true;
      }
    }
    if (!found) {
      f(from, to, "ltr");
    }
  }
  var bidiOther = null;
  function getBidiPartAt(order, ch, sticky) {
    var found;
    bidiOther = null;
    for (var i2 = 0; i2 < order.length; ++i2) {
      var cur = order[i2];
      if (cur.from < ch && cur.to > ch) {
        return i2;
      }
      if (cur.to == ch) {
        if (cur.from != cur.to && sticky == "before") {
          found = i2;
        } else {
          bidiOther = i2;
        }
      }
      if (cur.from == ch) {
        if (cur.from != cur.to && sticky != "before") {
          found = i2;
        } else {
          bidiOther = i2;
        }
      }
    }
    return found != null ? found : bidiOther;
  }
  var bidiOrdering = /* @__PURE__ */ (function() {
    var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
    var arabicTypes = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
    function charType(code) {
      if (code <= 247) {
        return lowTypes.charAt(code);
      } else if (1424 <= code && code <= 1524) {
        return "R";
      } else if (1536 <= code && code <= 1785) {
        return arabicTypes.charAt(code - 1536);
      } else if (1774 <= code && code <= 2220) {
        return "r";
      } else if (8192 <= code && code <= 8203) {
        return "w";
      } else if (code == 8204) {
        return "b";
      } else {
        return "L";
      }
    }
    var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
    var isNeutral = /[stwN]/, isStrong = /[LRr]/, countsAsLeft = /[Lb1n]/, countsAsNum = /[1n]/;
    function BidiSpan(level, from, to) {
      this.level = level;
      this.from = from;
      this.to = to;
    }
    return function(str, direction) {
      var outerType = direction == "ltr" ? "L" : "R";
      if (str.length == 0 || direction == "ltr" && !bidiRE.test(str)) {
        return false;
      }
      var len = str.length, types = [];
      for (var i2 = 0; i2 < len; ++i2) {
        types.push(charType(str.charCodeAt(i2)));
      }
      for (var i$12 = 0, prev = outerType; i$12 < len; ++i$12) {
        var type = types[i$12];
        if (type == "m") {
          types[i$12] = prev;
        } else {
          prev = type;
        }
      }
      for (var i$22 = 0, cur = outerType; i$22 < len; ++i$22) {
        var type$1 = types[i$22];
        if (type$1 == "1" && cur == "r") {
          types[i$22] = "n";
        } else if (isStrong.test(type$1)) {
          cur = type$1;
          if (type$1 == "r") {
            types[i$22] = "R";
          }
        }
      }
      for (var i$3 = 1, prev$1 = types[0]; i$3 < len - 1; ++i$3) {
        var type$2 = types[i$3];
        if (type$2 == "+" && prev$1 == "1" && types[i$3 + 1] == "1") {
          types[i$3] = "1";
        } else if (type$2 == "," && prev$1 == types[i$3 + 1] && (prev$1 == "1" || prev$1 == "n")) {
          types[i$3] = prev$1;
        }
        prev$1 = type$2;
      }
      for (var i$4 = 0; i$4 < len; ++i$4) {
        var type$3 = types[i$4];
        if (type$3 == ",") {
          types[i$4] = "N";
        } else if (type$3 == "%") {
          var end = void 0;
          for (end = i$4 + 1; end < len && types[end] == "%"; ++end) {
          }
          var replace = i$4 && types[i$4 - 1] == "!" || end < len && types[end] == "1" ? "1" : "N";
          for (var j = i$4; j < end; ++j) {
            types[j] = replace;
          }
          i$4 = end - 1;
        }
      }
      for (var i$5 = 0, cur$1 = outerType; i$5 < len; ++i$5) {
        var type$4 = types[i$5];
        if (cur$1 == "L" && type$4 == "1") {
          types[i$5] = "L";
        } else if (isStrong.test(type$4)) {
          cur$1 = type$4;
        }
      }
      for (var i$6 = 0; i$6 < len; ++i$6) {
        if (isNeutral.test(types[i$6])) {
          var end$1 = void 0;
          for (end$1 = i$6 + 1; end$1 < len && isNeutral.test(types[end$1]); ++end$1) {
          }
          var before = (i$6 ? types[i$6 - 1] : outerType) == "L";
          var after = (end$1 < len ? types[end$1] : outerType) == "L";
          var replace$1 = before == after ? before ? "L" : "R" : outerType;
          for (var j$1 = i$6; j$1 < end$1; ++j$1) {
            types[j$1] = replace$1;
          }
          i$6 = end$1 - 1;
        }
      }
      var order = [], m;
      for (var i$7 = 0; i$7 < len; ) {
        if (countsAsLeft.test(types[i$7])) {
          var start = i$7;
          for (++i$7; i$7 < len && countsAsLeft.test(types[i$7]); ++i$7) {
          }
          order.push(new BidiSpan(0, start, i$7));
        } else {
          var pos = i$7, at = order.length, isRTL = direction == "rtl" ? 1 : 0;
          for (++i$7; i$7 < len && types[i$7] != "L"; ++i$7) {
          }
          for (var j$2 = pos; j$2 < i$7; ) {
            if (countsAsNum.test(types[j$2])) {
              if (pos < j$2) {
                order.splice(at, 0, new BidiSpan(1, pos, j$2));
                at += isRTL;
              }
              var nstart = j$2;
              for (++j$2; j$2 < i$7 && countsAsNum.test(types[j$2]); ++j$2) {
              }
              order.splice(at, 0, new BidiSpan(2, nstart, j$2));
              at += isRTL;
              pos = j$2;
            } else {
              ++j$2;
            }
          }
          if (pos < i$7) {
            order.splice(at, 0, new BidiSpan(1, pos, i$7));
          }
        }
      }
      if (direction == "ltr") {
        if (order[0].level == 1 && (m = str.match(/^\s+/))) {
          order[0].from = m[0].length;
          order.unshift(new BidiSpan(0, 0, m[0].length));
        }
        if (lst(order).level == 1 && (m = str.match(/\s+$/))) {
          lst(order).to -= m[0].length;
          order.push(new BidiSpan(0, len - m[0].length, len));
        }
      }
      return direction == "rtl" ? order.reverse() : order;
    };
  })();
  function getOrder(line, direction) {
    var order = line.order;
    if (order == null) {
      order = line.order = bidiOrdering(line.text, direction);
    }
    return order;
  }
  var noHandlers = [];
  var on = function(emitter, type, f) {
    if (emitter.addEventListener) {
      emitter.addEventListener(type, f, false);
    } else if (emitter.attachEvent) {
      emitter.attachEvent("on" + type, f);
    } else {
      var map2 = emitter._handlers || (emitter._handlers = {});
      map2[type] = (map2[type] || noHandlers).concat(f);
    }
  };
  function getHandlers(emitter, type) {
    return emitter._handlers && emitter._handlers[type] || noHandlers;
  }
  function off(emitter, type, f) {
    if (emitter.removeEventListener) {
      emitter.removeEventListener(type, f, false);
    } else if (emitter.detachEvent) {
      emitter.detachEvent("on" + type, f);
    } else {
      var map2 = emitter._handlers, arr = map2 && map2[type];
      if (arr) {
        var index = indexOf(arr, f);
        if (index > -1) {
          map2[type] = arr.slice(0, index).concat(arr.slice(index + 1));
        }
      }
    }
  }
  function signal(emitter, type) {
    var handlers = getHandlers(emitter, type);
    if (!handlers.length) {
      return;
    }
    var args = Array.prototype.slice.call(arguments, 2);
    for (var i2 = 0; i2 < handlers.length; ++i2) {
      handlers[i2].apply(null, args);
    }
  }
  function signalDOMEvent(cm, e, override) {
    if (typeof e == "string") {
      e = { type: e, preventDefault: function() {
        this.defaultPrevented = true;
      } };
    }
    signal(cm, override || e.type, cm, e);
    return e_defaultPrevented(e) || e.codemirrorIgnore;
  }
  function signalCursorActivity(cm) {
    var arr = cm._handlers && cm._handlers.cursorActivity;
    if (!arr) {
      return;
    }
    var set = cm.curOp.cursorActivityHandlers || (cm.curOp.cursorActivityHandlers = []);
    for (var i2 = 0; i2 < arr.length; ++i2) {
      if (indexOf(set, arr[i2]) == -1) {
        set.push(arr[i2]);
      }
    }
  }
  function hasHandler(emitter, type) {
    return getHandlers(emitter, type).length > 0;
  }
  function eventMixin(ctor) {
    ctor.prototype.on = function(type, f) {
      on(this, type, f);
    };
    ctor.prototype.off = function(type, f) {
      off(this, type, f);
    };
  }
  function e_preventDefault(e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  }
  function e_stopPropagation(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  }
  function e_defaultPrevented(e) {
    return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false;
  }
  function e_stop(e) {
    e_preventDefault(e);
    e_stopPropagation(e);
  }
  function e_target(e) {
    return e.target || e.srcElement;
  }
  function e_button(e) {
    var b = e.which;
    if (b == null) {
      if (e.button & 1) {
        b = 1;
      } else if (e.button & 2) {
        b = 3;
      } else if (e.button & 4) {
        b = 2;
      }
    }
    if (mac && e.ctrlKey && b == 1) {
      b = 3;
    }
    return b;
  }
  var dragAndDrop = (function() {
    if (ie && ie_version < 9) {
      return false;
    }
    var div = elt("div");
    return "draggable" in div || "dragDrop" in div;
  })();
  var zwspSupported;
  function zeroWidthElement(measure) {
    if (zwspSupported == null) {
      var test = elt("span", "\u200B");
      removeChildrenAndAdd(measure, elt("span", [test, document.createTextNode("x")]));
      if (measure.firstChild.offsetHeight != 0) {
        zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !(ie && ie_version < 8);
      }
    }
    var node = zwspSupported ? elt("span", "\u200B") : elt("span", "\xA0", null, "display: inline-block; width: 1px; margin-right: -1px");
    node.setAttribute("cm-text", "");
    return node;
  }
  var badBidiRects;
  function hasBadBidiRects(measure) {
    if (badBidiRects != null) {
      return badBidiRects;
    }
    var txt = removeChildrenAndAdd(measure, document.createTextNode("A\u062EA"));
    var r0 = range(txt, 0, 1).getBoundingClientRect();
    var r1 = range(txt, 1, 2).getBoundingClientRect();
    removeChildren(measure);
    if (!r0 || r0.left == r0.right) {
      return false;
    }
    return badBidiRects = r1.right - r0.right < 3;
  }
  var splitLinesAuto = "\n\nb".split(/\n/).length != 3 ? function(string) {
    var pos = 0, result = [], l = string.length;
    while (pos <= l) {
      var nl = string.indexOf("\n", pos);
      if (nl == -1) {
        nl = string.length;
      }
      var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
      var rt = line.indexOf("\r");
      if (rt != -1) {
        result.push(line.slice(0, rt));
        pos += rt + 1;
      } else {
        result.push(line);
        pos = nl + 1;
      }
    }
    return result;
  } : function(string) {
    return string.split(/\r\n?|\n/);
  };
  var hasSelection = window.getSelection ? function(te) {
    try {
      return te.selectionStart != te.selectionEnd;
    } catch (e) {
      return false;
    }
  } : function(te) {
    var range2;
    try {
      range2 = te.ownerDocument.selection.createRange();
    } catch (e) {
    }
    if (!range2 || range2.parentElement() != te) {
      return false;
    }
    return range2.compareEndPoints("StartToEnd", range2) != 0;
  };
  var hasCopyEvent = (function() {
    var e = elt("div");
    if ("oncopy" in e) {
      return true;
    }
    e.setAttribute("oncopy", "return;");
    return typeof e.oncopy == "function";
  })();
  var badZoomedRects = null;
  function hasBadZoomedRects(measure) {
    if (badZoomedRects != null) {
      return badZoomedRects;
    }
    var node = removeChildrenAndAdd(measure, elt("span", "x"));
    var normal = node.getBoundingClientRect();
    var fromRange = range(node, 0, 1).getBoundingClientRect();
    return badZoomedRects = Math.abs(normal.left - fromRange.left) > 1;
  }
  var modes = {}, mimeModes = {};
  function defineMode(name, mode) {
    if (arguments.length > 2) {
      mode.dependencies = Array.prototype.slice.call(arguments, 2);
    }
    modes[name] = mode;
  }
  function defineMIME(mime, spec) {
    mimeModes[mime] = spec;
  }
  function resolveMode(spec) {
    if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
      spec = mimeModes[spec];
    } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
      var found = mimeModes[spec.name];
      if (typeof found == "string") {
        found = { name: found };
      }
      spec = createObj(found, spec);
      spec.name = found.name;
    } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
      return resolveMode("application/xml");
    } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(spec)) {
      return resolveMode("application/json");
    }
    if (typeof spec == "string") {
      return { name: spec };
    } else {
      return spec || { name: "null" };
    }
  }
  function getMode(options, spec) {
    spec = resolveMode(spec);
    var mfactory = modes[spec.name];
    if (!mfactory) {
      return getMode(options, "text/plain");
    }
    var modeObj = mfactory(options, spec);
    if (modeExtensions.hasOwnProperty(spec.name)) {
      var exts = modeExtensions[spec.name];
      for (var prop2 in exts) {
        if (!exts.hasOwnProperty(prop2)) {
          continue;
        }
        if (modeObj.hasOwnProperty(prop2)) {
          modeObj["_" + prop2] = modeObj[prop2];
        }
        modeObj[prop2] = exts[prop2];
      }
    }
    modeObj.name = spec.name;
    if (spec.helperType) {
      modeObj.helperType = spec.helperType;
    }
    if (spec.modeProps) {
      for (var prop$1 in spec.modeProps) {
        modeObj[prop$1] = spec.modeProps[prop$1];
      }
    }
    return modeObj;
  }
  var modeExtensions = {};
  function extendMode(mode, properties) {
    var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : modeExtensions[mode] = {};
    copyObj(properties, exts);
  }
  function copyState(mode, state) {
    if (state === true) {
      return state;
    }
    if (mode.copyState) {
      return mode.copyState(state);
    }
    var nstate = {};
    for (var n in state) {
      var val = state[n];
      if (val instanceof Array) {
        val = val.concat([]);
      }
      nstate[n] = val;
    }
    return nstate;
  }
  function innerMode(mode, state) {
    var info;
    while (mode.innerMode) {
      info = mode.innerMode(state);
      if (!info || info.mode == mode) {
        break;
      }
      state = info.state;
      mode = info.mode;
    }
    return info || { mode, state };
  }
  function startState(mode, a1, a2) {
    return mode.startState ? mode.startState(a1, a2) : true;
  }
  var StringStream = function(string, tabSize, lineOracle) {
    this.pos = this.start = 0;
    this.string = string;
    this.tabSize = tabSize || 8;
    this.lastColumnPos = this.lastColumnValue = 0;
    this.lineStart = 0;
    this.lineOracle = lineOracle;
  };
  StringStream.prototype.eol = function() {
    return this.pos >= this.string.length;
  };
  StringStream.prototype.sol = function() {
    return this.pos == this.lineStart;
  };
  StringStream.prototype.peek = function() {
    return this.string.charAt(this.pos) || void 0;
  };
  StringStream.prototype.next = function() {
    if (this.pos < this.string.length) {
      return this.string.charAt(this.pos++);
    }
  };
  StringStream.prototype.eat = function(match) {
    var ch = this.string.charAt(this.pos);
    var ok;
    if (typeof match == "string") {
      ok = ch == match;
    } else {
      ok = ch && (match.test ? match.test(ch) : match(ch));
    }
    if (ok) {
      ++this.pos;
      return ch;
    }
  };
  StringStream.prototype.eatWhile = function(match) {
    var start = this.pos;
    while (this.eat(match)) {
    }
    return this.pos > start;
  };
  StringStream.prototype.eatSpace = function() {
    var start = this.pos;
    while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
      ++this.pos;
    }
    return this.pos > start;
  };
  StringStream.prototype.skipToEnd = function() {
    this.pos = this.string.length;
  };
  StringStream.prototype.skipTo = function(ch) {
    var found = this.string.indexOf(ch, this.pos);
    if (found > -1) {
      this.pos = found;
      return true;
    }
  };
  StringStream.prototype.backUp = function(n) {
    this.pos -= n;
  };
  StringStream.prototype.column = function() {
    if (this.lastColumnPos < this.start) {
      this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
      this.lastColumnPos = this.start;
    }
    return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
  };
  StringStream.prototype.indentation = function() {
    return countColumn(this.string, null, this.tabSize) - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
  };
  StringStream.prototype.match = function(pattern, consume, caseInsensitive) {
    if (typeof pattern == "string") {
      var cased = function(str) {
        return caseInsensitive ? str.toLowerCase() : str;
      };
      var substr = this.string.substr(this.pos, pattern.length);
      if (cased(substr) == cased(pattern)) {
        if (consume !== false) {
          this.pos += pattern.length;
        }
        return true;
      }
    } else {
      var match = this.string.slice(this.pos).match(pattern);
      if (match && match.index > 0) {
        return null;
      }
      if (match && consume !== false) {
        this.pos += match[0].length;
      }
      return match;
    }
  };
  StringStream.prototype.current = function() {
    return this.string.slice(this.start, this.pos);
  };
  StringStream.prototype.hideFirstChars = function(n, inner) {
    this.lineStart += n;
    try {
      return inner();
    } finally {
      this.lineStart -= n;
    }
  };
  StringStream.prototype.lookAhead = function(n) {
    var oracle = this.lineOracle;
    return oracle && oracle.lookAhead(n);
  };
  StringStream.prototype.baseToken = function() {
    var oracle = this.lineOracle;
    return oracle && oracle.baseToken(this.pos);
  };
  function getLine(doc2, n) {
    n -= doc2.first;
    if (n < 0 || n >= doc2.size) {
      throw new Error("There is no line " + (n + doc2.first) + " in the document.");
    }
    var chunk = doc2;
    while (!chunk.lines) {
      for (var i2 = 0; ; ++i2) {
        var child = chunk.children[i2], sz = child.chunkSize();
        if (n < sz) {
          chunk = child;
          break;
        }
        n -= sz;
      }
    }
    return chunk.lines[n];
  }
  function getBetween(doc2, start, end) {
    var out = [], n = start.line;
    doc2.iter(start.line, end.line + 1, function(line) {
      var text = line.text;
      if (n == end.line) {
        text = text.slice(0, end.ch);
      }
      if (n == start.line) {
        text = text.slice(start.ch);
      }
      out.push(text);
      ++n;
    });
    return out;
  }
  function getLines(doc2, from, to) {
    var out = [];
    doc2.iter(from, to, function(line) {
      out.push(line.text);
    });
    return out;
  }
  function updateLineHeight(line, height) {
    var diff = height - line.height;
    if (diff) {
      for (var n = line; n; n = n.parent) {
        n.height += diff;
      }
    }
  }
  function lineNo(line) {
    if (line.parent == null) {
      return null;
    }
    var cur = line.parent, no = indexOf(cur.lines, line);
    for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
      for (var i2 = 0; ; ++i2) {
        if (chunk.children[i2] == cur) {
          break;
        }
        no += chunk.children[i2].chunkSize();
      }
    }
    return no + cur.first;
  }
  function lineAtHeight(chunk, h) {
    var n = chunk.first;
    outer: do {
      for (var i$12 = 0; i$12 < chunk.children.length; ++i$12) {
        var child = chunk.children[i$12], ch = child.height;
        if (h < ch) {
          chunk = child;
          continue outer;
        }
        h -= ch;
        n += child.chunkSize();
      }
      return n;
    } while (!chunk.lines);
    var i2 = 0;
    for (; i2 < chunk.lines.length; ++i2) {
      var line = chunk.lines[i2], lh = line.height;
      if (h < lh) {
        break;
      }
      h -= lh;
    }
    return n + i2;
  }
  function isLine(doc2, l) {
    return l >= doc2.first && l < doc2.first + doc2.size;
  }
  function lineNumberFor(options, i2) {
    return String(options.lineNumberFormatter(i2 + options.firstLineNumber));
  }
  function Pos(line, ch, sticky) {
    if (sticky === void 0) sticky = null;
    if (!(this instanceof Pos)) {
      return new Pos(line, ch, sticky);
    }
    this.line = line;
    this.ch = ch;
    this.sticky = sticky;
  }
  function cmp(a, b) {
    return a.line - b.line || a.ch - b.ch;
  }
  function equalCursorPos(a, b) {
    return a.sticky == b.sticky && cmp(a, b) == 0;
  }
  function copyPos(x) {
    return Pos(x.line, x.ch);
  }
  function maxPos(a, b) {
    return cmp(a, b) < 0 ? b : a;
  }
  function minPos(a, b) {
    return cmp(a, b) < 0 ? a : b;
  }
  function clipLine(doc2, n) {
    return Math.max(doc2.first, Math.min(n, doc2.first + doc2.size - 1));
  }
  function clipPos(doc2, pos) {
    if (pos.line < doc2.first) {
      return Pos(doc2.first, 0);
    }
    var last = doc2.first + doc2.size - 1;
    if (pos.line > last) {
      return Pos(last, getLine(doc2, last).text.length);
    }
    return clipToLen(pos, getLine(doc2, pos.line).text.length);
  }
  function clipToLen(pos, linelen) {
    var ch = pos.ch;
    if (ch == null || ch > linelen) {
      return Pos(pos.line, linelen);
    } else if (ch < 0) {
      return Pos(pos.line, 0);
    } else {
      return pos;
    }
  }
  function clipPosArray(doc2, array) {
    var out = [];
    for (var i2 = 0; i2 < array.length; i2++) {
      out[i2] = clipPos(doc2, array[i2]);
    }
    return out;
  }
  var SavedContext = function(state, lookAhead) {
    this.state = state;
    this.lookAhead = lookAhead;
  };
  var Context = function(doc2, state, line, lookAhead) {
    this.state = state;
    this.doc = doc2;
    this.line = line;
    this.maxLookAhead = lookAhead || 0;
    this.baseTokens = null;
    this.baseTokenPos = 1;
  };
  Context.prototype.lookAhead = function(n) {
    var line = this.doc.getLine(this.line + n);
    if (line != null && n > this.maxLookAhead) {
      this.maxLookAhead = n;
    }
    return line;
  };
  Context.prototype.baseToken = function(n) {
    if (!this.baseTokens) {
      return null;
    }
    while (this.baseTokens[this.baseTokenPos] <= n) {
      this.baseTokenPos += 2;
    }
    var type = this.baseTokens[this.baseTokenPos + 1];
    return {
      type: type && type.replace(/( |^)overlay .*/, ""),
      size: this.baseTokens[this.baseTokenPos] - n
    };
  };
  Context.prototype.nextLine = function() {
    this.line++;
    if (this.maxLookAhead > 0) {
      this.maxLookAhead--;
    }
  };
  Context.fromSaved = function(doc2, saved, line) {
    if (saved instanceof SavedContext) {
      return new Context(doc2, copyState(doc2.mode, saved.state), line, saved.lookAhead);
    } else {
      return new Context(doc2, copyState(doc2.mode, saved), line);
    }
  };
  Context.prototype.save = function(copy) {
    var state = copy !== false ? copyState(this.doc.mode, this.state) : this.state;
    return this.maxLookAhead > 0 ? new SavedContext(state, this.maxLookAhead) : state;
  };
  function highlightLine(cm, line, context, forceToEnd) {
    var st = [cm.state.modeGen], lineClasses = {};
    runMode(
      cm,
      line.text,
      cm.doc.mode,
      context,
      function(end, style) {
        return st.push(end, style);
      },
      lineClasses,
      forceToEnd
    );
    var state = context.state;
    var loop = function(o2) {
      context.baseTokens = st;
      var overlay = cm.state.overlays[o2], i2 = 1, at = 0;
      context.state = true;
      runMode(cm, line.text, overlay.mode, context, function(end, style) {
        var start = i2;
        while (at < end) {
          var i_end = st[i2];
          if (i_end > end) {
            st.splice(i2, 1, end, st[i2 + 1], i_end);
          }
          i2 += 2;
          at = Math.min(end, i_end);
        }
        if (!style) {
          return;
        }
        if (overlay.opaque) {
          st.splice(start, i2 - start, end, "overlay " + style);
          i2 = start + 2;
        } else {
          for (; start < i2; start += 2) {
            var cur = st[start + 1];
            st[start + 1] = (cur ? cur + " " : "") + "overlay " + style;
          }
        }
      }, lineClasses);
      context.state = state;
      context.baseTokens = null;
      context.baseTokenPos = 1;
    };
    for (var o = 0; o < cm.state.overlays.length; ++o) loop(o);
    return { styles: st, classes: lineClasses.bgClass || lineClasses.textClass ? lineClasses : null };
  }
  function getLineStyles(cm, line, updateFrontier) {
    if (!line.styles || line.styles[0] != cm.state.modeGen) {
      var context = getContextBefore(cm, lineNo(line));
      var resetState = line.text.length > cm.options.maxHighlightLength && copyState(cm.doc.mode, context.state);
      var result = highlightLine(cm, line, context);
      if (resetState) {
        context.state = resetState;
      }
      line.stateAfter = context.save(!resetState);
      line.styles = result.styles;
      if (result.classes) {
        line.styleClasses = result.classes;
      } else if (line.styleClasses) {
        line.styleClasses = null;
      }
      if (updateFrontier === cm.doc.highlightFrontier) {
        cm.doc.modeFrontier = Math.max(cm.doc.modeFrontier, ++cm.doc.highlightFrontier);
      }
    }
    return line.styles;
  }
  function getContextBefore(cm, n, precise) {
    var doc2 = cm.doc, display = cm.display;
    if (!doc2.mode.startState) {
      return new Context(doc2, true, n);
    }
    var start = findStartLine(cm, n, precise);
    var saved = start > doc2.first && getLine(doc2, start - 1).stateAfter;
    var context = saved ? Context.fromSaved(doc2, saved, start) : new Context(doc2, startState(doc2.mode), start);
    doc2.iter(start, n, function(line) {
      processLine(cm, line.text, context);
      var pos = context.line;
      line.stateAfter = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo ? context.save() : null;
      context.nextLine();
    });
    if (precise) {
      doc2.modeFrontier = context.line;
    }
    return context;
  }
  function processLine(cm, text, context, startAt) {
    var mode = cm.doc.mode;
    var stream = new StringStream(text, cm.options.tabSize, context);
    stream.start = stream.pos = startAt || 0;
    if (text == "") {
      callBlankLine(mode, context.state);
    }
    while (!stream.eol()) {
      readToken(mode, stream, context.state);
      stream.start = stream.pos;
    }
  }
  function callBlankLine(mode, state) {
    if (mode.blankLine) {
      return mode.blankLine(state);
    }
    if (!mode.innerMode) {
      return;
    }
    var inner = innerMode(mode, state);
    if (inner.mode.blankLine) {
      return inner.mode.blankLine(inner.state);
    }
  }
  function readToken(mode, stream, state, inner) {
    for (var i2 = 0; i2 < 10; i2++) {
      if (inner) {
        inner[0] = innerMode(mode, state).mode;
      }
      var style = mode.token(stream, state);
      if (stream.pos > stream.start) {
        return style;
      }
    }
    throw new Error("Mode " + mode.name + " failed to advance stream.");
  }
  var Token = function(stream, type, state) {
    this.start = stream.start;
    this.end = stream.pos;
    this.string = stream.current();
    this.type = type || null;
    this.state = state;
  };
  function takeToken(cm, pos, precise, asArray) {
    var doc2 = cm.doc, mode = doc2.mode, style;
    pos = clipPos(doc2, pos);
    var line = getLine(doc2, pos.line), context = getContextBefore(cm, pos.line, precise);
    var stream = new StringStream(line.text, cm.options.tabSize, context), tokens;
    if (asArray) {
      tokens = [];
    }
    while ((asArray || stream.pos < pos.ch) && !stream.eol()) {
      stream.start = stream.pos;
      style = readToken(mode, stream, context.state);
      if (asArray) {
        tokens.push(new Token(stream, style, copyState(doc2.mode, context.state)));
      }
    }
    return asArray ? tokens : new Token(stream, style, context.state);
  }
  function extractLineClasses(type, output) {
    if (type) {
      for (; ; ) {
        var lineClass = type.match(/(?:^|\s+)line-(background-)?(\S+)/);
        if (!lineClass) {
          break;
        }
        type = type.slice(0, lineClass.index) + type.slice(lineClass.index + lineClass[0].length);
        var prop2 = lineClass[1] ? "bgClass" : "textClass";
        if (output[prop2] == null) {
          output[prop2] = lineClass[2];
        } else if (!new RegExp("(?:^|\\s)" + lineClass[2] + "(?:$|\\s)").test(output[prop2])) {
          output[prop2] += " " + lineClass[2];
        }
      }
    }
    return type;
  }
  function runMode(cm, text, mode, context, f, lineClasses, forceToEnd) {
    var flattenSpans = mode.flattenSpans;
    if (flattenSpans == null) {
      flattenSpans = cm.options.flattenSpans;
    }
    var curStart = 0, curStyle = null;
    var stream = new StringStream(text, cm.options.tabSize, context), style;
    var inner = cm.options.addModeClass && [null];
    if (text == "") {
      extractLineClasses(callBlankLine(mode, context.state), lineClasses);
    }
    while (!stream.eol()) {
      if (stream.pos > cm.options.maxHighlightLength) {
        flattenSpans = false;
        if (forceToEnd) {
          processLine(cm, text, context, stream.pos);
        }
        stream.pos = text.length;
        style = null;
      } else {
        style = extractLineClasses(readToken(mode, stream, context.state, inner), lineClasses);
      }
      if (inner) {
        var mName = inner[0].name;
        if (mName) {
          style = "m-" + (style ? mName + " " + style : mName);
        }
      }
      if (!flattenSpans || curStyle != style) {
        while (curStart < stream.start) {
          curStart = Math.min(stream.start, curStart + 5e3);
          f(curStart, curStyle);
        }
        curStyle = style;
      }
      stream.start = stream.pos;
    }
    while (curStart < stream.pos) {
      var pos = Math.min(stream.pos, curStart + 5e3);
      f(pos, curStyle);
      curStart = pos;
    }
  }
  function findStartLine(cm, n, precise) {
    var minindent, minline, doc2 = cm.doc;
    var lim = precise ? -1 : n - (cm.doc.mode.innerMode ? 1e3 : 100);
    for (var search = n; search > lim; --search) {
      if (search <= doc2.first) {
        return doc2.first;
      }
      var line = getLine(doc2, search - 1), after = line.stateAfter;
      if (after && (!precise || search + (after instanceof SavedContext ? after.lookAhead : 0) <= doc2.modeFrontier)) {
        return search;
      }
      var indented = countColumn(line.text, null, cm.options.tabSize);
      if (minline == null || minindent > indented) {
        minline = search - 1;
        minindent = indented;
      }
    }
    return minline;
  }
  function retreatFrontier(doc2, n) {
    doc2.modeFrontier = Math.min(doc2.modeFrontier, n);
    if (doc2.highlightFrontier < n - 10) {
      return;
    }
    var start = doc2.first;
    for (var line = n - 1; line > start; line--) {
      var saved = getLine(doc2, line).stateAfter;
      if (saved && (!(saved instanceof SavedContext) || line + saved.lookAhead < n)) {
        start = line + 1;
        break;
      }
    }
    doc2.highlightFrontier = Math.min(doc2.highlightFrontier, start);
  }
  var sawReadOnlySpans = false, sawCollapsedSpans = false;
  function seeReadOnlySpans() {
    sawReadOnlySpans = true;
  }
  function seeCollapsedSpans() {
    sawCollapsedSpans = true;
  }
  function MarkedSpan(marker, from, to) {
    this.marker = marker;
    this.from = from;
    this.to = to;
  }
  function getMarkedSpanFor(spans, marker) {
    if (spans) {
      for (var i2 = 0; i2 < spans.length; ++i2) {
        var span = spans[i2];
        if (span.marker == marker) {
          return span;
        }
      }
    }
  }
  function removeMarkedSpan(spans, span) {
    var r;
    for (var i2 = 0; i2 < spans.length; ++i2) {
      if (spans[i2] != span) {
        (r || (r = [])).push(spans[i2]);
      }
    }
    return r;
  }
  function addMarkedSpan(line, span, op) {
    var inThisOp = op && window.WeakSet && (op.markedSpans || (op.markedSpans = /* @__PURE__ */ new WeakSet()));
    if (inThisOp && line.markedSpans && inThisOp.has(line.markedSpans)) {
      line.markedSpans.push(span);
    } else {
      line.markedSpans = line.markedSpans ? line.markedSpans.concat([span]) : [span];
      if (inThisOp) {
        inThisOp.add(line.markedSpans);
      }
    }
    span.marker.attachLine(line);
  }
  function markedSpansBefore(old, startCh, isInsert) {
    var nw;
    if (old) {
      for (var i2 = 0; i2 < old.length; ++i2) {
        var span = old[i2], marker = span.marker;
        var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
        if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
          var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh);
          (nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
        }
      }
    }
    return nw;
  }
  function markedSpansAfter(old, endCh, isInsert) {
    var nw;
    if (old) {
      for (var i2 = 0; i2 < old.length; ++i2) {
        var span = old[i2], marker = span.marker;
        var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
        if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
          var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh);
          (nw || (nw = [])).push(new MarkedSpan(
            marker,
            startsBefore ? null : span.from - endCh,
            span.to == null ? null : span.to - endCh
          ));
        }
      }
    }
    return nw;
  }
  function stretchSpansOverChange(doc2, change) {
    if (change.full) {
      return null;
    }
    var oldFirst = isLine(doc2, change.from.line) && getLine(doc2, change.from.line).markedSpans;
    var oldLast = isLine(doc2, change.to.line) && getLine(doc2, change.to.line).markedSpans;
    if (!oldFirst && !oldLast) {
      return null;
    }
    var startCh = change.from.ch, endCh = change.to.ch, isInsert = cmp(change.from, change.to) == 0;
    var first = markedSpansBefore(oldFirst, startCh, isInsert);
    var last = markedSpansAfter(oldLast, endCh, isInsert);
    var sameLine = change.text.length == 1, offset = lst(change.text).length + (sameLine ? startCh : 0);
    if (first) {
      for (var i2 = 0; i2 < first.length; ++i2) {
        var span = first[i2];
        if (span.to == null) {
          var found = getMarkedSpanFor(last, span.marker);
          if (!found) {
            span.to = startCh;
          } else if (sameLine) {
            span.to = found.to == null ? null : found.to + offset;
          }
        }
      }
    }
    if (last) {
      for (var i$12 = 0; i$12 < last.length; ++i$12) {
        var span$1 = last[i$12];
        if (span$1.to != null) {
          span$1.to += offset;
        }
        if (span$1.from == null) {
          var found$1 = getMarkedSpanFor(first, span$1.marker);
          if (!found$1) {
            span$1.from = offset;
            if (sameLine) {
              (first || (first = [])).push(span$1);
            }
          }
        } else {
          span$1.from += offset;
          if (sameLine) {
            (first || (first = [])).push(span$1);
          }
        }
      }
    }
    if (first) {
      first = clearEmptySpans(first);
    }
    if (last && last != first) {
      last = clearEmptySpans(last);
    }
    var newMarkers = [first];
    if (!sameLine) {
      var gap = change.text.length - 2, gapMarkers;
      if (gap > 0 && first) {
        for (var i$22 = 0; i$22 < first.length; ++i$22) {
          if (first[i$22].to == null) {
            (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i$22].marker, null, null));
          }
        }
      }
      for (var i$3 = 0; i$3 < gap; ++i$3) {
        newMarkers.push(gapMarkers);
      }
      newMarkers.push(last);
    }
    return newMarkers;
  }
  function clearEmptySpans(spans) {
    for (var i2 = 0; i2 < spans.length; ++i2) {
      var span = spans[i2];
      if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false) {
        spans.splice(i2--, 1);
      }
    }
    if (!spans.length) {
      return null;
    }
    return spans;
  }
  function removeReadOnlyRanges(doc2, from, to) {
    var markers = null;
    doc2.iter(from.line, to.line + 1, function(line) {
      if (line.markedSpans) {
        for (var i3 = 0; i3 < line.markedSpans.length; ++i3) {
          var mark = line.markedSpans[i3].marker;
          if (mark.readOnly && (!markers || indexOf(markers, mark) == -1)) {
            (markers || (markers = [])).push(mark);
          }
        }
      }
    });
    if (!markers) {
      return null;
    }
    var parts = [{ from, to }];
    for (var i2 = 0; i2 < markers.length; ++i2) {
      var mk = markers[i2], m = mk.find(0);
      for (var j = 0; j < parts.length; ++j) {
        var p = parts[j];
        if (cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0) {
          continue;
        }
        var newParts = [j, 1], dfrom = cmp(p.from, m.from), dto = cmp(p.to, m.to);
        if (dfrom < 0 || !mk.inclusiveLeft && !dfrom) {
          newParts.push({ from: p.from, to: m.from });
        }
        if (dto > 0 || !mk.inclusiveRight && !dto) {
          newParts.push({ from: m.to, to: p.to });
        }
        parts.splice.apply(parts, newParts);
        j += newParts.length - 3;
      }
    }
    return parts;
  }
  function detachMarkedSpans(line) {
    var spans = line.markedSpans;
    if (!spans) {
      return;
    }
    for (var i2 = 0; i2 < spans.length; ++i2) {
      spans[i2].marker.detachLine(line);
    }
    line.markedSpans = null;
  }
  function attachMarkedSpans(line, spans) {
    if (!spans) {
      return;
    }
    for (var i2 = 0; i2 < spans.length; ++i2) {
      spans[i2].marker.attachLine(line);
    }
    line.markedSpans = spans;
  }
  function extraLeft(marker) {
    return marker.inclusiveLeft ? -1 : 0;
  }
  function extraRight(marker) {
    return marker.inclusiveRight ? 1 : 0;
  }
  function compareCollapsedMarkers(a, b) {
    var lenDiff = a.lines.length - b.lines.length;
    if (lenDiff != 0) {
      return lenDiff;
    }
    var aPos = a.find(), bPos = b.find();
    var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
    if (fromCmp) {
      return -fromCmp;
    }
    var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
    if (toCmp) {
      return toCmp;
    }
    return b.id - a.id;
  }
  function collapsedSpanAtSide(line, start) {
    var sps = sawCollapsedSpans && line.markedSpans, found;
    if (sps) {
      for (var sp = void 0, i2 = 0; i2 < sps.length; ++i2) {
        sp = sps[i2];
        if (sp.marker.collapsed && (start ? sp.from : sp.to) == null && (!found || compareCollapsedMarkers(found, sp.marker) < 0)) {
          found = sp.marker;
        }
      }
    }
    return found;
  }
  function collapsedSpanAtStart(line) {
    return collapsedSpanAtSide(line, true);
  }
  function collapsedSpanAtEnd(line) {
    return collapsedSpanAtSide(line, false);
  }
  function collapsedSpanAround(line, ch) {
    var sps = sawCollapsedSpans && line.markedSpans, found;
    if (sps) {
      for (var i2 = 0; i2 < sps.length; ++i2) {
        var sp = sps[i2];
        if (sp.marker.collapsed && (sp.from == null || sp.from < ch) && (sp.to == null || sp.to > ch) && (!found || compareCollapsedMarkers(found, sp.marker) < 0)) {
          found = sp.marker;
        }
      }
    }
    return found;
  }
  function conflictingCollapsedRange(doc2, lineNo2, from, to, marker) {
    var line = getLine(doc2, lineNo2);
    var sps = sawCollapsedSpans && line.markedSpans;
    if (sps) {
      for (var i2 = 0; i2 < sps.length; ++i2) {
        var sp = sps[i2];
        if (!sp.marker.collapsed) {
          continue;
        }
        var found = sp.marker.find(0);
        var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
        var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
        if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0) {
          continue;
        }
        if (fromCmp <= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.to, from) >= 0 : cmp(found.to, from) > 0) || fromCmp >= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.from, to) <= 0 : cmp(found.from, to) < 0)) {
          return true;
        }
      }
    }
  }
  function visualLine(line) {
    var merged;
    while (merged = collapsedSpanAtStart(line)) {
      line = merged.find(-1, true).line;
    }
    return line;
  }
  function visualLineEnd(line) {
    var merged;
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line;
    }
    return line;
  }
  function visualLineContinued(line) {
    var merged, lines;
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line;
      (lines || (lines = [])).push(line);
    }
    return lines;
  }
  function visualLineNo(doc2, lineN) {
    var line = getLine(doc2, lineN), vis = visualLine(line);
    if (line == vis) {
      return lineN;
    }
    return lineNo(vis);
  }
  function visualLineEndNo(doc2, lineN) {
    if (lineN > doc2.lastLine()) {
      return lineN;
    }
    var line = getLine(doc2, lineN), merged;
    if (!lineIsHidden(doc2, line)) {
      return lineN;
    }
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line;
    }
    return lineNo(line) + 1;
  }
  function lineIsHidden(doc2, line) {
    var sps = sawCollapsedSpans && line.markedSpans;
    if (sps) {
      for (var sp = void 0, i2 = 0; i2 < sps.length; ++i2) {
        sp = sps[i2];
        if (!sp.marker.collapsed) {
          continue;
        }
        if (sp.from == null) {
          return true;
        }
        if (sp.marker.widgetNode) {
          continue;
        }
        if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc2, line, sp)) {
          return true;
        }
      }
    }
  }
  function lineIsHiddenInner(doc2, line, span) {
    if (span.to == null) {
      var end = span.marker.find(1, true);
      return lineIsHiddenInner(doc2, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker));
    }
    if (span.marker.inclusiveRight && span.to == line.text.length) {
      return true;
    }
    for (var sp = void 0, i2 = 0; i2 < line.markedSpans.length; ++i2) {
      sp = line.markedSpans[i2];
      if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to && (sp.to == null || sp.to != span.from) && (sp.marker.inclusiveLeft || span.marker.inclusiveRight) && lineIsHiddenInner(doc2, line, sp)) {
        return true;
      }
    }
  }
  function heightAtLine(lineObj) {
    lineObj = visualLine(lineObj);
    var h = 0, chunk = lineObj.parent;
    for (var i2 = 0; i2 < chunk.lines.length; ++i2) {
      var line = chunk.lines[i2];
      if (line == lineObj) {
        break;
      } else {
        h += line.height;
      }
    }
    for (var p = chunk.parent; p; chunk = p, p = chunk.parent) {
      for (var i$12 = 0; i$12 < p.children.length; ++i$12) {
        var cur = p.children[i$12];
        if (cur == chunk) {
          break;
        } else {
          h += cur.height;
        }
      }
    }
    return h;
  }
  function lineLength(line) {
    if (line.height == 0) {
      return 0;
    }
    var len = line.text.length, merged, cur = line;
    while (merged = collapsedSpanAtStart(cur)) {
      var found = merged.find(0, true);
      cur = found.from.line;
      len += found.from.ch - found.to.ch;
    }
    cur = line;
    while (merged = collapsedSpanAtEnd(cur)) {
      var found$1 = merged.find(0, true);
      len -= cur.text.length - found$1.from.ch;
      cur = found$1.to.line;
      len += cur.text.length - found$1.to.ch;
    }
    return len;
  }
  function findMaxLine(cm) {
    var d = cm.display, doc2 = cm.doc;
    d.maxLine = getLine(doc2, doc2.first);
    d.maxLineLength = lineLength(d.maxLine);
    d.maxLineChanged = true;
    doc2.iter(function(line) {
      var len = lineLength(line);
      if (len > d.maxLineLength) {
        d.maxLineLength = len;
        d.maxLine = line;
      }
    });
  }
  var Line = function(text, markedSpans, estimateHeight2) {
    this.text = text;
    attachMarkedSpans(this, markedSpans);
    this.height = estimateHeight2 ? estimateHeight2(this) : 1;
  };
  Line.prototype.lineNo = function() {
    return lineNo(this);
  };
  eventMixin(Line);
  function updateLine(line, text, markedSpans, estimateHeight2) {
    line.text = text;
    if (line.stateAfter) {
      line.stateAfter = null;
    }
    if (line.styles) {
      line.styles = null;
    }
    if (line.order != null) {
      line.order = null;
    }
    detachMarkedSpans(line);
    attachMarkedSpans(line, markedSpans);
    var estHeight = estimateHeight2 ? estimateHeight2(line) : 1;
    if (estHeight != line.height) {
      updateLineHeight(line, estHeight);
    }
  }
  function cleanUpLine(line) {
    line.parent = null;
    detachMarkedSpans(line);
  }
  var styleToClassCache = {}, styleToClassCacheWithMode = {};
  function interpretTokenStyle(style, options) {
    if (!style || /^\s*$/.test(style)) {
      return null;
    }
    var cache = options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
    return cache[style] || (cache[style] = style.replace(/\S+/g, "cm-$&"));
  }
  function buildLineContent(cm, lineView) {
    var content = eltP("span", null, null, webkit ? "padding-right: .1px" : null);
    var builder = {
      pre: eltP("pre", [content], "CodeMirror-line"),
      content,
      col: 0,
      pos: 0,
      cm,
      trailingSpace: false,
      splitSpaces: cm.getOption("lineWrapping")
    };
    lineView.measure = {};
    for (var i2 = 0; i2 <= (lineView.rest ? lineView.rest.length : 0); i2++) {
      var line = i2 ? lineView.rest[i2 - 1] : lineView.line, order = void 0;
      builder.pos = 0;
      builder.addToken = buildToken;
      if (hasBadBidiRects(cm.display.measure) && (order = getOrder(line, cm.doc.direction))) {
        builder.addToken = buildTokenBadBidi(builder.addToken, order);
      }
      builder.map = [];
      var allowFrontierUpdate = lineView != cm.display.externalMeasured && lineNo(line);
      insertLineContent(line, builder, getLineStyles(cm, line, allowFrontierUpdate));
      if (line.styleClasses) {
        if (line.styleClasses.bgClass) {
          builder.bgClass = joinClasses(line.styleClasses.bgClass, builder.bgClass || "");
        }
        if (line.styleClasses.textClass) {
          builder.textClass = joinClasses(line.styleClasses.textClass, builder.textClass || "");
        }
      }
      if (builder.map.length == 0) {
        builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure)));
      }
      if (i2 == 0) {
        lineView.measure.map = builder.map;
        lineView.measure.cache = {};
      } else {
        (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map);
        (lineView.measure.caches || (lineView.measure.caches = [])).push({});
      }
    }
    if (webkit) {
      var last = builder.content.lastChild;
      if (/\bcm-tab\b/.test(last.className) || last.querySelector && last.querySelector(".cm-tab")) {
        builder.content.className = "cm-tab-wrap-hack";
      }
    }
    signal(cm, "renderLine", cm, lineView.line, builder.pre);
    if (builder.pre.className) {
      builder.textClass = joinClasses(builder.pre.className, builder.textClass || "");
    }
    return builder;
  }
  function defaultSpecialCharPlaceholder(ch) {
    var token = elt("span", "\u2022", "cm-invalidchar");
    token.title = "\\u" + ch.charCodeAt(0).toString(16);
    token.setAttribute("aria-label", token.title);
    return token;
  }
  function buildToken(builder, text, style, startStyle, endStyle, css, attributes) {
    if (!text) {
      return;
    }
    var displayText = builder.splitSpaces ? splitSpaces(text, builder.trailingSpace) : text;
    var special = builder.cm.state.specialChars, mustWrap = false;
    var content;
    if (!special.test(text)) {
      builder.col += text.length;
      content = document.createTextNode(displayText);
      builder.map.push(builder.pos, builder.pos + text.length, content);
      if (ie && ie_version < 9) {
        mustWrap = true;
      }
      builder.pos += text.length;
    } else {
      content = document.createDocumentFragment();
      var pos = 0;
      while (true) {
        special.lastIndex = pos;
        var m = special.exec(text);
        var skipped = m ? m.index - pos : text.length - pos;
        if (skipped) {
          var txt = document.createTextNode(displayText.slice(pos, pos + skipped));
          if (ie && ie_version < 9) {
            content.appendChild(elt("span", [txt]));
          } else {
            content.appendChild(txt);
          }
          builder.map.push(builder.pos, builder.pos + skipped, txt);
          builder.col += skipped;
          builder.pos += skipped;
        }
        if (!m) {
          break;
        }
        pos += skipped + 1;
        var txt$1 = void 0;
        if (m[0] == "	") {
          var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize;
          txt$1 = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
          txt$1.setAttribute("role", "presentation");
          txt$1.setAttribute("cm-text", "	");
          builder.col += tabWidth;
        } else if (m[0] == "\r" || m[0] == "\n") {
          txt$1 = content.appendChild(elt("span", m[0] == "\r" ? "\u240D" : "\u2424", "cm-invalidchar"));
          txt$1.setAttribute("cm-text", m[0]);
          builder.col += 1;
        } else {
          txt$1 = builder.cm.options.specialCharPlaceholder(m[0]);
          txt$1.setAttribute("cm-text", m[0]);
          if (ie && ie_version < 9) {
            content.appendChild(elt("span", [txt$1]));
          } else {
            content.appendChild(txt$1);
          }
          builder.col += 1;
        }
        builder.map.push(builder.pos, builder.pos + 1, txt$1);
        builder.pos++;
      }
    }
    builder.trailingSpace = displayText.charCodeAt(text.length - 1) == 32;
    if (style || startStyle || endStyle || mustWrap || css || attributes) {
      var fullStyle = style || "";
      if (startStyle) {
        fullStyle += startStyle;
      }
      if (endStyle) {
        fullStyle += endStyle;
      }
      var token = elt("span", [content], fullStyle, css);
      if (attributes) {
        for (var attr in attributes) {
          if (attributes.hasOwnProperty(attr) && attr != "style" && attr != "class") {
            token.setAttribute(attr, attributes[attr]);
          }
        }
      }
      return builder.content.appendChild(token);
    }
    builder.content.appendChild(content);
  }
  function splitSpaces(text, trailingBefore) {
    if (text.length > 1 && !/  /.test(text)) {
      return text;
    }
    var spaceBefore = trailingBefore, result = "";
    for (var i2 = 0; i2 < text.length; i2++) {
      var ch = text.charAt(i2);
      if (ch == " " && spaceBefore && (i2 == text.length - 1 || text.charCodeAt(i2 + 1) == 32)) {
        ch = "\xA0";
      }
      result += ch;
      spaceBefore = ch == " ";
    }
    return result;
  }
  function buildTokenBadBidi(inner, order) {
    return function(builder, text, style, startStyle, endStyle, css, attributes) {
      style = style ? style + " cm-force-border" : "cm-force-border";
      var start = builder.pos, end = start + text.length;
      for (; ; ) {
        var part = void 0;
        for (var i2 = 0; i2 < order.length; i2++) {
          part = order[i2];
          if (part.to > start && part.from <= start) {
            break;
          }
        }
        if (part.to >= end) {
          return inner(builder, text, style, startStyle, endStyle, css, attributes);
        }
        inner(builder, text.slice(0, part.to - start), style, startStyle, null, css, attributes);
        startStyle = null;
        text = text.slice(part.to - start);
        start = part.to;
      }
    };
  }
  function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
    var widget = !ignoreWidget && marker.widgetNode;
    if (widget) {
      builder.map.push(builder.pos, builder.pos + size, widget);
    }
    if (!ignoreWidget && builder.cm.display.input.needsContentAttribute) {
      if (!widget) {
        widget = builder.content.appendChild(document.createElement("span"));
      }
      widget.setAttribute("cm-marker", marker.id);
    }
    if (widget) {
      builder.cm.display.input.setUneditable(widget);
      builder.content.appendChild(widget);
    }
    builder.pos += size;
    builder.trailingSpace = false;
  }
  function insertLineContent(line, builder, styles) {
    var spans = line.markedSpans, allText = line.text, at = 0;
    if (!spans) {
      for (var i$12 = 1; i$12 < styles.length; i$12 += 2) {
        builder.addToken(builder, allText.slice(at, at = styles[i$12]), interpretTokenStyle(styles[i$12 + 1], builder.cm.options));
      }
      return;
    }
    var len = allText.length, pos = 0, i2 = 1, text = "", style, css;
    var nextChange = 0, spanStyle, spanEndStyle, spanStartStyle, collapsed, attributes;
    for (; ; ) {
      if (nextChange == pos) {
        spanStyle = spanEndStyle = spanStartStyle = css = "";
        attributes = null;
        collapsed = null;
        nextChange = Infinity;
        var foundBookmarks = [], endStyles = void 0;
        for (var j = 0; j < spans.length; ++j) {
          var sp = spans[j], m = sp.marker;
          if (m.type == "bookmark" && sp.from == pos && m.widgetNode) {
            foundBookmarks.push(m);
          } else if (sp.from <= pos && (sp.to == null || sp.to > pos || m.collapsed && sp.to == pos && sp.from == pos)) {
            if (sp.to != null && sp.to != pos && nextChange > sp.to) {
              nextChange = sp.to;
              spanEndStyle = "";
            }
            if (m.className) {
              spanStyle += " " + m.className;
            }
            if (m.css) {
              css = (css ? css + ";" : "") + m.css;
            }
            if (m.startStyle && sp.from == pos) {
              spanStartStyle += " " + m.startStyle;
            }
            if (m.endStyle && sp.to == nextChange) {
              (endStyles || (endStyles = [])).push(m.endStyle, sp.to);
            }
            if (m.title) {
              (attributes || (attributes = {})).title = m.title;
            }
            if (m.attributes) {
              for (var attr in m.attributes) {
                (attributes || (attributes = {}))[attr] = m.attributes[attr];
              }
            }
            if (m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0)) {
              collapsed = sp;
            }
          } else if (sp.from > pos && nextChange > sp.from) {
            nextChange = sp.from;
          }
        }
        if (endStyles) {
          for (var j$1 = 0; j$1 < endStyles.length; j$1 += 2) {
            if (endStyles[j$1 + 1] == nextChange) {
              spanEndStyle += " " + endStyles[j$1];
            }
          }
        }
        if (!collapsed || collapsed.from == pos) {
          for (var j$2 = 0; j$2 < foundBookmarks.length; ++j$2) {
            buildCollapsedSpan(builder, 0, foundBookmarks[j$2]);
          }
        }
        if (collapsed && (collapsed.from || 0) == pos) {
          buildCollapsedSpan(
            builder,
            (collapsed.to == null ? len + 1 : collapsed.to) - pos,
            collapsed.marker,
            collapsed.from == null
          );
          if (collapsed.to == null) {
            return;
          }
          if (collapsed.to == pos) {
            collapsed = false;
          }
        }
      }
      if (pos >= len) {
        break;
      }
      var upto = Math.min(len, nextChange);
      while (true) {
        if (text) {
          var end = pos + text.length;
          if (!collapsed) {
            var tokenText = end > upto ? text.slice(0, upto - pos) : text;
            builder.addToken(
              builder,
              tokenText,
              style ? style + spanStyle : spanStyle,
              spanStartStyle,
              pos + tokenText.length == nextChange ? spanEndStyle : "",
              css,
              attributes
            );
          }
          if (end >= upto) {
            text = text.slice(upto - pos);
            pos = upto;
            break;
          }
          pos = end;
          spanStartStyle = "";
        }
        text = allText.slice(at, at = styles[i2++]);
        style = interpretTokenStyle(styles[i2++], builder.cm.options);
      }
    }
  }
  function LineView(doc2, line, lineN) {
    this.line = line;
    this.rest = visualLineContinued(line);
    this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
    this.node = this.text = null;
    this.hidden = lineIsHidden(doc2, line);
  }
  function buildViewArray(cm, from, to) {
    var array = [], nextPos;
    for (var pos = from; pos < to; pos = nextPos) {
      var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
      nextPos = pos + view.size;
      array.push(view);
    }
    return array;
  }
  var operationGroup = null;
  function pushOperation(op) {
    if (operationGroup) {
      operationGroup.ops.push(op);
    } else {
      op.ownsGroup = operationGroup = {
        ops: [op],
        delayedCallbacks: []
      };
    }
  }
  function fireCallbacksForOps(group) {
    var callbacks = group.delayedCallbacks, i2 = 0;
    do {
      for (; i2 < callbacks.length; i2++) {
        callbacks[i2].call(null);
      }
      for (var j = 0; j < group.ops.length; j++) {
        var op = group.ops[j];
        if (op.cursorActivityHandlers) {
          while (op.cursorActivityCalled < op.cursorActivityHandlers.length) {
            op.cursorActivityHandlers[op.cursorActivityCalled++].call(null, op.cm);
          }
        }
      }
    } while (i2 < callbacks.length);
  }
  function finishOperation(op, endCb) {
    var group = op.ownsGroup;
    if (!group) {
      return;
    }
    try {
      fireCallbacksForOps(group);
    } finally {
      operationGroup = null;
      endCb(group);
    }
  }
  var orphanDelayedCallbacks = null;
  function signalLater(emitter, type) {
    var arr = getHandlers(emitter, type);
    if (!arr.length) {
      return;
    }
    var args = Array.prototype.slice.call(arguments, 2), list;
    if (operationGroup) {
      list = operationGroup.delayedCallbacks;
    } else if (orphanDelayedCallbacks) {
      list = orphanDelayedCallbacks;
    } else {
      list = orphanDelayedCallbacks = [];
      setTimeout(fireOrphanDelayed, 0);
    }
    var loop = function(i3) {
      list.push(function() {
        return arr[i3].apply(null, args);
      });
    };
    for (var i2 = 0; i2 < arr.length; ++i2)
      loop(i2);
  }
  function fireOrphanDelayed() {
    var delayed = orphanDelayedCallbacks;
    orphanDelayedCallbacks = null;
    for (var i2 = 0; i2 < delayed.length; ++i2) {
      delayed[i2]();
    }
  }
  function updateLineForChanges(cm, lineView, lineN, dims) {
    for (var j = 0; j < lineView.changes.length; j++) {
      var type = lineView.changes[j];
      if (type == "text") {
        updateLineText(cm, lineView);
      } else if (type == "gutter") {
        updateLineGutter(cm, lineView, lineN, dims);
      } else if (type == "class") {
        updateLineClasses(cm, lineView);
      } else if (type == "widget") {
        updateLineWidgets(cm, lineView, dims);
      }
    }
    lineView.changes = null;
  }
  function ensureLineWrapped(lineView) {
    if (lineView.node == lineView.text) {
      lineView.node = elt("div", null, null, "position: relative");
      if (lineView.text.parentNode) {
        lineView.text.parentNode.replaceChild(lineView.node, lineView.text);
      }
      lineView.node.appendChild(lineView.text);
      if (ie && ie_version < 8) {
        lineView.node.style.zIndex = 2;
      }
    }
    return lineView.node;
  }
  function updateLineBackground(cm, lineView) {
    var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
    if (cls) {
      cls += " CodeMirror-linebackground";
    }
    if (lineView.background) {
      if (cls) {
        lineView.background.className = cls;
      } else {
        lineView.background.parentNode.removeChild(lineView.background);
        lineView.background = null;
      }
    } else if (cls) {
      var wrap = ensureLineWrapped(lineView);
      lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
      cm.display.input.setUneditable(lineView.background);
    }
  }
  function getLineContent(cm, lineView) {
    var ext = cm.display.externalMeasured;
    if (ext && ext.line == lineView.line) {
      cm.display.externalMeasured = null;
      lineView.measure = ext.measure;
      return ext.built;
    }
    return buildLineContent(cm, lineView);
  }
  function updateLineText(cm, lineView) {
    var cls = lineView.text.className;
    var built = getLineContent(cm, lineView);
    if (lineView.text == lineView.node) {
      lineView.node = built.pre;
    }
    lineView.text.parentNode.replaceChild(built.pre, lineView.text);
    lineView.text = built.pre;
    if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
      lineView.bgClass = built.bgClass;
      lineView.textClass = built.textClass;
      updateLineClasses(cm, lineView);
    } else if (cls) {
      lineView.text.className = cls;
    }
  }
  function updateLineClasses(cm, lineView) {
    updateLineBackground(cm, lineView);
    if (lineView.line.wrapClass) {
      ensureLineWrapped(lineView).className = lineView.line.wrapClass;
    } else if (lineView.node != lineView.text) {
      lineView.node.className = "";
    }
    var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
    lineView.text.className = textClass || "";
  }
  function updateLineGutter(cm, lineView, lineN, dims) {
    if (lineView.gutter) {
      lineView.node.removeChild(lineView.gutter);
      lineView.gutter = null;
    }
    if (lineView.gutterBackground) {
      lineView.node.removeChild(lineView.gutterBackground);
      lineView.gutterBackground = null;
    }
    if (lineView.line.gutterClass) {
      var wrap = ensureLineWrapped(lineView);
      lineView.gutterBackground = elt(
        "div",
        null,
        "CodeMirror-gutter-background " + lineView.line.gutterClass,
        "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px; width: " + dims.gutterTotalWidth + "px"
      );
      cm.display.input.setUneditable(lineView.gutterBackground);
      wrap.insertBefore(lineView.gutterBackground, lineView.text);
    }
    var markers = lineView.line.gutterMarkers;
    if (cm.options.lineNumbers || markers) {
      var wrap$1 = ensureLineWrapped(lineView);
      var gutterWrap = lineView.gutter = elt("div", null, "CodeMirror-gutter-wrapper", "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px");
      gutterWrap.setAttribute("aria-hidden", "true");
      cm.display.input.setUneditable(gutterWrap);
      wrap$1.insertBefore(gutterWrap, lineView.text);
      if (lineView.line.gutterClass) {
        gutterWrap.className += " " + lineView.line.gutterClass;
      }
      if (cm.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"])) {
        lineView.lineNumber = gutterWrap.appendChild(
          elt(
            "div",
            lineNumberFor(cm.options, lineN),
            "CodeMirror-linenumber CodeMirror-gutter-elt",
            "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + cm.display.lineNumInnerWidth + "px"
          )
        );
      }
      if (markers) {
        for (var k = 0; k < cm.display.gutterSpecs.length; ++k) {
          var id = cm.display.gutterSpecs[k].className, found = markers.hasOwnProperty(id) && markers[id];
          if (found) {
            gutterWrap.appendChild(elt(
              "div",
              [found],
              "CodeMirror-gutter-elt",
              "left: " + dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"
            ));
          }
        }
      }
    }
  }
  function updateLineWidgets(cm, lineView, dims) {
    if (lineView.alignable) {
      lineView.alignable = null;
    }
    var isWidget = classTest("CodeMirror-linewidget");
    for (var node = lineView.node.firstChild, next = void 0; node; node = next) {
      next = node.nextSibling;
      if (isWidget.test(node.className)) {
        lineView.node.removeChild(node);
      }
    }
    insertLineWidgets(cm, lineView, dims);
  }
  function buildLineElement(cm, lineView, lineN, dims) {
    var built = getLineContent(cm, lineView);
    lineView.text = lineView.node = built.pre;
    if (built.bgClass) {
      lineView.bgClass = built.bgClass;
    }
    if (built.textClass) {
      lineView.textClass = built.textClass;
    }
    updateLineClasses(cm, lineView);
    updateLineGutter(cm, lineView, lineN, dims);
    insertLineWidgets(cm, lineView, dims);
    return lineView.node;
  }
  function insertLineWidgets(cm, lineView, dims) {
    insertLineWidgetsFor(cm, lineView.line, lineView, dims, true);
    if (lineView.rest) {
      for (var i2 = 0; i2 < lineView.rest.length; i2++) {
        insertLineWidgetsFor(cm, lineView.rest[i2], lineView, dims, false);
      }
    }
  }
  function insertLineWidgetsFor(cm, line, lineView, dims, allowAbove) {
    if (!line.widgets) {
      return;
    }
    var wrap = ensureLineWrapped(lineView);
    for (var i2 = 0, ws = line.widgets; i2 < ws.length; ++i2) {
      var widget = ws[i2], node = elt("div", [widget.node], "CodeMirror-linewidget" + (widget.className ? " " + widget.className : ""));
      if (!widget.handleMouseEvents) {
        node.setAttribute("cm-ignore-events", "true");
      }
      positionLineWidget(widget, node, lineView, dims);
      cm.display.input.setUneditable(node);
      if (allowAbove && widget.above) {
        wrap.insertBefore(node, lineView.gutter || lineView.text);
      } else {
        wrap.appendChild(node);
      }
      signalLater(widget, "redraw");
    }
  }
  function positionLineWidget(widget, node, lineView, dims) {
    if (widget.noHScroll) {
      (lineView.alignable || (lineView.alignable = [])).push(node);
      var width = dims.wrapperWidth;
      node.style.left = dims.fixedPos + "px";
      if (!widget.coverGutter) {
        width -= dims.gutterTotalWidth;
        node.style.paddingLeft = dims.gutterTotalWidth + "px";
      }
      node.style.width = width + "px";
    }
    if (widget.coverGutter) {
      node.style.zIndex = 5;
      node.style.position = "relative";
      if (!widget.noHScroll) {
        node.style.marginLeft = -dims.gutterTotalWidth + "px";
      }
    }
  }
  function widgetHeight(widget) {
    if (widget.height != null) {
      return widget.height;
    }
    var cm = widget.doc.cm;
    if (!cm) {
      return 0;
    }
    if (!contains(document.body, widget.node)) {
      var parentStyle = "position: relative;";
      if (widget.coverGutter) {
        parentStyle += "margin-left: -" + cm.display.gutters.offsetWidth + "px;";
      }
      if (widget.noHScroll) {
        parentStyle += "width: " + cm.display.wrapper.clientWidth + "px;";
      }
      removeChildrenAndAdd(cm.display.measure, elt("div", [widget.node], null, parentStyle));
    }
    return widget.height = widget.node.parentNode.offsetHeight;
  }
  function eventInWidget(display, e) {
    for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
      if (!n || n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true" || n.parentNode == display.sizer && n != display.mover) {
        return true;
      }
    }
  }
  function paddingTop(display) {
    return display.lineSpace.offsetTop;
  }
  function paddingVert(display) {
    return display.mover.offsetHeight - display.lineSpace.offsetHeight;
  }
  function paddingH(display) {
    if (display.cachedPaddingH) {
      return display.cachedPaddingH;
    }
    var e = removeChildrenAndAdd(display.measure, elt("pre", "x", "CodeMirror-line-like"));
    var style = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
    var data = { left: parseInt(style.paddingLeft), right: parseInt(style.paddingRight) };
    if (!isNaN(data.left) && !isNaN(data.right)) {
      display.cachedPaddingH = data;
    }
    return data;
  }
  function scrollGap(cm) {
    return scrollerGap - cm.display.nativeBarWidth;
  }
  function displayWidth(cm) {
    return cm.display.scroller.clientWidth - scrollGap(cm) - cm.display.barWidth;
  }
  function displayHeight(cm) {
    return cm.display.scroller.clientHeight - scrollGap(cm) - cm.display.barHeight;
  }
  function ensureLineHeights(cm, lineView, rect) {
    var wrapping = cm.options.lineWrapping;
    var curWidth = wrapping && displayWidth(cm);
    if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
      var heights = lineView.measure.heights = [];
      if (wrapping) {
        lineView.measure.width = curWidth;
        var rects = lineView.text.firstChild.getClientRects();
        for (var i2 = 0; i2 < rects.length - 1; i2++) {
          var cur = rects[i2], next = rects[i2 + 1];
          if (Math.abs(cur.bottom - next.bottom) > 2) {
            heights.push((cur.bottom + next.top) / 2 - rect.top);
          }
        }
      }
      heights.push(rect.bottom - rect.top);
    }
  }
  function mapFromLineView(lineView, line, lineN) {
    if (lineView.line == line) {
      return { map: lineView.measure.map, cache: lineView.measure.cache };
    }
    if (lineView.rest) {
      for (var i2 = 0; i2 < lineView.rest.length; i2++) {
        if (lineView.rest[i2] == line) {
          return { map: lineView.measure.maps[i2], cache: lineView.measure.caches[i2] };
        }
      }
      for (var i$12 = 0; i$12 < lineView.rest.length; i$12++) {
        if (lineNo(lineView.rest[i$12]) > lineN) {
          return { map: lineView.measure.maps[i$12], cache: lineView.measure.caches[i$12], before: true };
        }
      }
    }
  }
  function updateExternalMeasurement(cm, line) {
    line = visualLine(line);
    var lineN = lineNo(line);
    var view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
    view.lineN = lineN;
    var built = view.built = buildLineContent(cm, view);
    view.text = built.pre;
    removeChildrenAndAdd(cm.display.lineMeasure, built.pre);
    return view;
  }
  function measureChar(cm, line, ch, bias) {
    return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias);
  }
  function findViewForLine(cm, lineN) {
    if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo) {
      return cm.display.view[findViewIndex(cm, lineN)];
    }
    var ext = cm.display.externalMeasured;
    if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size) {
      return ext;
    }
  }
  function prepareMeasureForLine(cm, line) {
    var lineN = lineNo(line);
    var view = findViewForLine(cm, lineN);
    if (view && !view.text) {
      view = null;
    } else if (view && view.changes) {
      updateLineForChanges(cm, view, lineN, getDimensions(cm));
      cm.curOp.forceUpdate = true;
    }
    if (!view) {
      view = updateExternalMeasurement(cm, line);
    }
    var info = mapFromLineView(view, line, lineN);
    return {
      line,
      view,
      rect: null,
      map: info.map,
      cache: info.cache,
      before: info.before,
      hasHeights: false
    };
  }
  function measureCharPrepared(cm, prepared, ch, bias, varHeight) {
    if (prepared.before) {
      ch = -1;
    }
    var key = ch + (bias || ""), found;
    if (prepared.cache.hasOwnProperty(key)) {
      found = prepared.cache[key];
    } else {
      if (!prepared.rect) {
        prepared.rect = prepared.view.text.getBoundingClientRect();
      }
      if (!prepared.hasHeights) {
        ensureLineHeights(cm, prepared.view, prepared.rect);
        prepared.hasHeights = true;
      }
      found = measureCharInner(cm, prepared, ch, bias);
      if (!found.bogus) {
        prepared.cache[key] = found;
      }
    }
    return {
      left: found.left,
      right: found.right,
      top: varHeight ? found.rtop : found.top,
      bottom: varHeight ? found.rbottom : found.bottom
    };
  }
  var nullRect = { left: 0, right: 0, top: 0, bottom: 0 };
  function nodeAndOffsetInLineMap(map2, ch, bias) {
    var node, start, end, collapse, mStart, mEnd;
    for (var i2 = 0; i2 < map2.length; i2 += 3) {
      mStart = map2[i2];
      mEnd = map2[i2 + 1];
      if (ch < mStart) {
        start = 0;
        end = 1;
        collapse = "left";
      } else if (ch < mEnd) {
        start = ch - mStart;
        end = start + 1;
      } else if (i2 == map2.length - 3 || ch == mEnd && map2[i2 + 3] > ch) {
        end = mEnd - mStart;
        start = end - 1;
        if (ch >= mEnd) {
          collapse = "right";
        }
      }
      if (start != null) {
        node = map2[i2 + 2];
        if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right")) {
          collapse = bias;
        }
        if (bias == "left" && start == 0) {
          while (i2 && map2[i2 - 2] == map2[i2 - 3] && map2[i2 - 1].insertLeft) {
            node = map2[(i2 -= 3) + 2];
            collapse = "left";
          }
        }
        if (bias == "right" && start == mEnd - mStart) {
          while (i2 < map2.length - 3 && map2[i2 + 3] == map2[i2 + 4] && !map2[i2 + 5].insertLeft) {
            node = map2[(i2 += 3) + 2];
            collapse = "right";
          }
        }
        break;
      }
    }
    return { node, start, end, collapse, coverStart: mStart, coverEnd: mEnd };
  }
  function getUsefulRect(rects, bias) {
    var rect = nullRect;
    if (bias == "left") {
      for (var i2 = 0; i2 < rects.length; i2++) {
        if ((rect = rects[i2]).left != rect.right) {
          break;
        }
      }
    } else {
      for (var i$12 = rects.length - 1; i$12 >= 0; i$12--) {
        if ((rect = rects[i$12]).left != rect.right) {
          break;
        }
      }
    }
    return rect;
  }
  function measureCharInner(cm, prepared, ch, bias) {
    var place = nodeAndOffsetInLineMap(prepared.map, ch, bias);
    var node = place.node, start = place.start, end = place.end, collapse = place.collapse;
    var rect;
    if (node.nodeType == 3) {
      for (var i$12 = 0; i$12 < 4; i$12++) {
        while (start && isExtendingChar(prepared.line.text.charAt(place.coverStart + start))) {
          --start;
        }
        while (place.coverStart + end < place.coverEnd && isExtendingChar(prepared.line.text.charAt(place.coverStart + end))) {
          ++end;
        }
        if (ie && ie_version < 9 && start == 0 && end == place.coverEnd - place.coverStart) {
          rect = node.parentNode.getBoundingClientRect();
        } else {
          rect = getUsefulRect(range(node, start, end).getClientRects(), bias);
        }
        if (rect.left || rect.right || start == 0) {
          break;
        }
        end = start;
        start = start - 1;
        collapse = "right";
      }
      if (ie && ie_version < 11) {
        rect = maybeUpdateRectForZooming(cm.display.measure, rect);
      }
    } else {
      if (start > 0) {
        collapse = bias = "right";
      }
      var rects;
      if (cm.options.lineWrapping && (rects = node.getClientRects()).length > 1) {
        rect = rects[bias == "right" ? rects.length - 1 : 0];
      } else {
        rect = node.getBoundingClientRect();
      }
    }
    if (ie && ie_version < 9 && !start && (!rect || !rect.left && !rect.right)) {
      var rSpan = node.parentNode.getClientRects()[0];
      if (rSpan) {
        rect = { left: rSpan.left, right: rSpan.left + charWidth(cm.display), top: rSpan.top, bottom: rSpan.bottom };
      } else {
        rect = nullRect;
      }
    }
    var rtop = rect.top - prepared.rect.top, rbot = rect.bottom - prepared.rect.top;
    var mid = (rtop + rbot) / 2;
    var heights = prepared.view.measure.heights;
    var i2 = 0;
    for (; i2 < heights.length - 1; i2++) {
      if (mid < heights[i2]) {
        break;
      }
    }
    var top = i2 ? heights[i2 - 1] : 0, bot = heights[i2];
    var result = {
      left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
      right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
      top,
      bottom: bot
    };
    if (!rect.left && !rect.right) {
      result.bogus = true;
    }
    if (!cm.options.singleCursorHeightPerLine) {
      result.rtop = rtop;
      result.rbottom = rbot;
    }
    return result;
  }
  function maybeUpdateRectForZooming(measure, rect) {
    if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !hasBadZoomedRects(measure)) {
      return rect;
    }
    var scaleX = screen.logicalXDPI / screen.deviceXDPI;
    var scaleY = screen.logicalYDPI / screen.deviceYDPI;
    return {
      left: rect.left * scaleX,
      right: rect.right * scaleX,
      top: rect.top * scaleY,
      bottom: rect.bottom * scaleY
    };
  }
  function clearLineMeasurementCacheFor(lineView) {
    if (lineView.measure) {
      lineView.measure.cache = {};
      lineView.measure.heights = null;
      if (lineView.rest) {
        for (var i2 = 0; i2 < lineView.rest.length; i2++) {
          lineView.measure.caches[i2] = {};
        }
      }
    }
  }
  function clearLineMeasurementCache(cm) {
    cm.display.externalMeasure = null;
    removeChildren(cm.display.lineMeasure);
    for (var i2 = 0; i2 < cm.display.view.length; i2++) {
      clearLineMeasurementCacheFor(cm.display.view[i2]);
    }
  }
  function clearCaches(cm) {
    clearLineMeasurementCache(cm);
    cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null;
    if (!cm.options.lineWrapping) {
      cm.display.maxLineChanged = true;
    }
    cm.display.lineNumChars = null;
  }
  function pageScrollX(doc2) {
    if (chrome && android) {
      return -(doc2.body.getBoundingClientRect().left - parseInt(getComputedStyle(doc2.body).marginLeft));
    }
    return doc2.defaultView.pageXOffset || (doc2.documentElement || doc2.body).scrollLeft;
  }
  function pageScrollY(doc2) {
    if (chrome && android) {
      return -(doc2.body.getBoundingClientRect().top - parseInt(getComputedStyle(doc2.body).marginTop));
    }
    return doc2.defaultView.pageYOffset || (doc2.documentElement || doc2.body).scrollTop;
  }
  function widgetTopHeight(lineObj) {
    var ref = visualLine(lineObj);
    var widgets = ref.widgets;
    var height = 0;
    if (widgets) {
      for (var i2 = 0; i2 < widgets.length; ++i2) {
        if (widgets[i2].above) {
          height += widgetHeight(widgets[i2]);
        }
      }
    }
    return height;
  }
  function intoCoordSystem(cm, lineObj, rect, context, includeWidgets) {
    if (!includeWidgets) {
      var height = widgetTopHeight(lineObj);
      rect.top += height;
      rect.bottom += height;
    }
    if (context == "line") {
      return rect;
    }
    if (!context) {
      context = "local";
    }
    var yOff = heightAtLine(lineObj);
    if (context == "local") {
      yOff += paddingTop(cm.display);
    } else {
      yOff -= cm.display.viewOffset;
    }
    if (context == "page" || context == "window") {
      var lOff = cm.display.lineSpace.getBoundingClientRect();
      yOff += lOff.top + (context == "window" ? 0 : pageScrollY(doc(cm)));
      var xOff = lOff.left + (context == "window" ? 0 : pageScrollX(doc(cm)));
      rect.left += xOff;
      rect.right += xOff;
    }
    rect.top += yOff;
    rect.bottom += yOff;
    return rect;
  }
  function fromCoordSystem(cm, coords, context) {
    if (context == "div") {
      return coords;
    }
    var left = coords.left, top = coords.top;
    if (context == "page") {
      left -= pageScrollX(doc(cm));
      top -= pageScrollY(doc(cm));
    } else if (context == "local" || !context) {
      var localBox = cm.display.sizer.getBoundingClientRect();
      left += localBox.left;
      top += localBox.top;
    }
    var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
    return { left: left - lineSpaceBox.left, top: top - lineSpaceBox.top };
  }
  function charCoords(cm, pos, context, lineObj, bias) {
    if (!lineObj) {
      lineObj = getLine(cm.doc, pos.line);
    }
    return intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context);
  }
  function cursorCoords(cm, pos, context, lineObj, preparedMeasure, varHeight) {
    lineObj = lineObj || getLine(cm.doc, pos.line);
    if (!preparedMeasure) {
      preparedMeasure = prepareMeasureForLine(cm, lineObj);
    }
    function get(ch2, right) {
      var m = measureCharPrepared(cm, preparedMeasure, ch2, right ? "right" : "left", varHeight);
      if (right) {
        m.left = m.right;
      } else {
        m.right = m.left;
      }
      return intoCoordSystem(cm, lineObj, m, context);
    }
    var order = getOrder(lineObj, cm.doc.direction), ch = pos.ch, sticky = pos.sticky;
    if (ch >= lineObj.text.length) {
      ch = lineObj.text.length;
      sticky = "before";
    } else if (ch <= 0) {
      ch = 0;
      sticky = "after";
    }
    if (!order) {
      return get(sticky == "before" ? ch - 1 : ch, sticky == "before");
    }
    function getBidi(ch2, partPos2, invert) {
      var part = order[partPos2], right = part.level == 1;
      return get(invert ? ch2 - 1 : ch2, right != invert);
    }
    var partPos = getBidiPartAt(order, ch, sticky);
    var other = bidiOther;
    var val = getBidi(ch, partPos, sticky == "before");
    if (other != null) {
      val.other = getBidi(ch, other, sticky != "before");
    }
    return val;
  }
  function estimateCoords(cm, pos) {
    var left = 0;
    pos = clipPos(cm.doc, pos);
    if (!cm.options.lineWrapping) {
      left = charWidth(cm.display) * pos.ch;
    }
    var lineObj = getLine(cm.doc, pos.line);
    var top = heightAtLine(lineObj) + paddingTop(cm.display);
    return { left, right: left, top, bottom: top + lineObj.height };
  }
  function PosWithInfo(line, ch, sticky, outside, xRel) {
    var pos = Pos(line, ch, sticky);
    pos.xRel = xRel;
    if (outside) {
      pos.outside = outside;
    }
    return pos;
  }
  function coordsChar(cm, x, y) {
    var doc2 = cm.doc;
    y += cm.display.viewOffset;
    if (y < 0) {
      return PosWithInfo(doc2.first, 0, null, -1, -1);
    }
    var lineN = lineAtHeight(doc2, y), last = doc2.first + doc2.size - 1;
    if (lineN > last) {
      return PosWithInfo(doc2.first + doc2.size - 1, getLine(doc2, last).text.length, null, 1, 1);
    }
    if (x < 0) {
      x = 0;
    }
    var lineObj = getLine(doc2, lineN);
    for (; ; ) {
      var found = coordsCharInner(cm, lineObj, lineN, x, y);
      var collapsed = collapsedSpanAround(lineObj, found.ch + (found.xRel > 0 || found.outside > 0 ? 1 : 0));
      if (!collapsed) {
        return found;
      }
      var rangeEnd = collapsed.find(1);
      if (rangeEnd.line == lineN) {
        return rangeEnd;
      }
      lineObj = getLine(doc2, lineN = rangeEnd.line);
    }
  }
  function wrappedLineExtent(cm, lineObj, preparedMeasure, y) {
    y -= widgetTopHeight(lineObj);
    var end = lineObj.text.length;
    var begin = findFirst(function(ch) {
      return measureCharPrepared(cm, preparedMeasure, ch - 1).bottom <= y;
    }, end, 0);
    end = findFirst(function(ch) {
      return measureCharPrepared(cm, preparedMeasure, ch).top > y;
    }, begin, end);
    return { begin, end };
  }
  function wrappedLineExtentChar(cm, lineObj, preparedMeasure, target) {
    if (!preparedMeasure) {
      preparedMeasure = prepareMeasureForLine(cm, lineObj);
    }
    var targetTop = intoCoordSystem(cm, lineObj, measureCharPrepared(cm, preparedMeasure, target), "line").top;
    return wrappedLineExtent(cm, lineObj, preparedMeasure, targetTop);
  }
  function boxIsAfter(box, x, y, left) {
    return box.bottom <= y ? false : box.top > y ? true : (left ? box.left : box.right) > x;
  }
  function coordsCharInner(cm, lineObj, lineNo2, x, y) {
    y -= heightAtLine(lineObj);
    var preparedMeasure = prepareMeasureForLine(cm, lineObj);
    var widgetHeight2 = widgetTopHeight(lineObj);
    var begin = 0, end = lineObj.text.length, ltr = true;
    var order = getOrder(lineObj, cm.doc.direction);
    if (order) {
      var part = (cm.options.lineWrapping ? coordsBidiPartWrapped : coordsBidiPart)(cm, lineObj, lineNo2, preparedMeasure, order, x, y);
      ltr = part.level != 1;
      begin = ltr ? part.from : part.to - 1;
      end = ltr ? part.to : part.from - 1;
    }
    var chAround = null, boxAround = null;
    var ch = findFirst(function(ch2) {
      var box = measureCharPrepared(cm, preparedMeasure, ch2);
      box.top += widgetHeight2;
      box.bottom += widgetHeight2;
      if (!boxIsAfter(box, x, y, false)) {
        return false;
      }
      if (box.top <= y && box.left <= x) {
        chAround = ch2;
        boxAround = box;
      }
      return true;
    }, begin, end);
    var baseX, sticky, outside = false;
    if (boxAround) {
      var atLeft = x - boxAround.left < boxAround.right - x, atStart = atLeft == ltr;
      ch = chAround + (atStart ? 0 : 1);
      sticky = atStart ? "after" : "before";
      baseX = atLeft ? boxAround.left : boxAround.right;
    } else {
      if (!ltr && (ch == end || ch == begin)) {
        ch++;
      }
      sticky = ch == 0 ? "after" : ch == lineObj.text.length ? "before" : measureCharPrepared(cm, preparedMeasure, ch - (ltr ? 1 : 0)).bottom + widgetHeight2 <= y == ltr ? "after" : "before";
      var coords = cursorCoords(cm, Pos(lineNo2, ch, sticky), "line", lineObj, preparedMeasure);
      baseX = coords.left;
      outside = y < coords.top ? -1 : y >= coords.bottom ? 1 : 0;
    }
    ch = skipExtendingChars(lineObj.text, ch, 1);
    return PosWithInfo(lineNo2, ch, sticky, outside, x - baseX);
  }
  function coordsBidiPart(cm, lineObj, lineNo2, preparedMeasure, order, x, y) {
    var index = findFirst(function(i2) {
      var part2 = order[i2], ltr2 = part2.level != 1;
      return boxIsAfter(cursorCoords(
        cm,
        Pos(lineNo2, ltr2 ? part2.to : part2.from, ltr2 ? "before" : "after"),
        "line",
        lineObj,
        preparedMeasure
      ), x, y, true);
    }, 0, order.length - 1);
    var part = order[index];
    if (index > 0) {
      var ltr = part.level != 1;
      var start = cursorCoords(
        cm,
        Pos(lineNo2, ltr ? part.from : part.to, ltr ? "after" : "before"),
        "line",
        lineObj,
        preparedMeasure
      );
      if (boxIsAfter(start, x, y, true) && start.top > y) {
        part = order[index - 1];
      }
    }
    return part;
  }
  function coordsBidiPartWrapped(cm, lineObj, _lineNo, preparedMeasure, order, x, y) {
    var ref = wrappedLineExtent(cm, lineObj, preparedMeasure, y);
    var begin = ref.begin;
    var end = ref.end;
    if (/\s/.test(lineObj.text.charAt(end - 1))) {
      end--;
    }
    var part = null, closestDist = null;
    for (var i2 = 0; i2 < order.length; i2++) {
      var p = order[i2];
      if (p.from >= end || p.to <= begin) {
        continue;
      }
      var ltr = p.level != 1;
      var endX = measureCharPrepared(cm, preparedMeasure, ltr ? Math.min(end, p.to) - 1 : Math.max(begin, p.from)).right;
      var dist = endX < x ? x - endX + 1e9 : endX - x;
      if (!part || closestDist > dist) {
        part = p;
        closestDist = dist;
      }
    }
    if (!part) {
      part = order[order.length - 1];
    }
    if (part.from < begin) {
      part = { from: begin, to: part.to, level: part.level };
    }
    if (part.to > end) {
      part = { from: part.from, to: end, level: part.level };
    }
    return part;
  }
  var measureText;
  function textHeight(display) {
    if (display.cachedTextHeight != null) {
      return display.cachedTextHeight;
    }
    if (measureText == null) {
      measureText = elt("pre", null, "CodeMirror-line-like");
      for (var i2 = 0; i2 < 49; ++i2) {
        measureText.appendChild(document.createTextNode("x"));
        measureText.appendChild(elt("br"));
      }
      measureText.appendChild(document.createTextNode("x"));
    }
    removeChildrenAndAdd(display.measure, measureText);
    var height = measureText.offsetHeight / 50;
    if (height > 3) {
      display.cachedTextHeight = height;
    }
    removeChildren(display.measure);
    return height || 1;
  }
  function charWidth(display) {
    if (display.cachedCharWidth != null) {
      return display.cachedCharWidth;
    }
    var anchor = elt("span", "xxxxxxxxxx");
    var pre = elt("pre", [anchor], "CodeMirror-line-like");
    removeChildrenAndAdd(display.measure, pre);
    var rect = anchor.getBoundingClientRect(), width = (rect.right - rect.left) / 10;
    if (width > 2) {
      display.cachedCharWidth = width;
    }
    return width || 10;
  }
  function getDimensions(cm) {
    var d = cm.display, left = {}, width = {};
    var gutterLeft = d.gutters.clientLeft;
    for (var n = d.gutters.firstChild, i2 = 0; n; n = n.nextSibling, ++i2) {
      var id = cm.display.gutterSpecs[i2].className;
      left[id] = n.offsetLeft + n.clientLeft + gutterLeft;
      width[id] = n.clientWidth;
    }
    return {
      fixedPos: compensateForHScroll(d),
      gutterTotalWidth: d.gutters.offsetWidth,
      gutterLeft: left,
      gutterWidth: width,
      wrapperWidth: d.wrapper.clientWidth
    };
  }
  function compensateForHScroll(display) {
    return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left;
  }
  function estimateHeight(cm) {
    var th = textHeight(cm.display), wrapping = cm.options.lineWrapping;
    var perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
    return function(line) {
      if (lineIsHidden(cm.doc, line)) {
        return 0;
      }
      var widgetsHeight = 0;
      if (line.widgets) {
        for (var i2 = 0; i2 < line.widgets.length; i2++) {
          if (line.widgets[i2].height) {
            widgetsHeight += line.widgets[i2].height;
          }
        }
      }
      if (wrapping) {
        return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th;
      } else {
        return widgetsHeight + th;
      }
    };
  }
  function estimateLineHeights(cm) {
    var doc2 = cm.doc, est = estimateHeight(cm);
    doc2.iter(function(line) {
      var estHeight = est(line);
      if (estHeight != line.height) {
        updateLineHeight(line, estHeight);
      }
    });
  }
  function posFromMouse(cm, e, liberal, forRect) {
    var display = cm.display;
    if (!liberal && e_target(e).getAttribute("cm-not-content") == "true") {
      return null;
    }
    var x, y, space = display.lineSpace.getBoundingClientRect();
    try {
      x = e.clientX - space.left;
      y = e.clientY - space.top;
    } catch (e$1) {
      return null;
    }
    var coords = coordsChar(cm, x, y), line;
    if (forRect && coords.xRel > 0 && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
      var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
      coords = Pos(coords.line, Math.max(0, Math.round((x - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff));
    }
    return coords;
  }
  function findViewIndex(cm, n) {
    if (n >= cm.display.viewTo) {
      return null;
    }
    n -= cm.display.viewFrom;
    if (n < 0) {
      return null;
    }
    var view = cm.display.view;
    for (var i2 = 0; i2 < view.length; i2++) {
      n -= view[i2].size;
      if (n < 0) {
        return i2;
      }
    }
  }
  function regChange(cm, from, to, lendiff) {
    if (from == null) {
      from = cm.doc.first;
    }
    if (to == null) {
      to = cm.doc.first + cm.doc.size;
    }
    if (!lendiff) {
      lendiff = 0;
    }
    var display = cm.display;
    if (lendiff && to < display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers > from)) {
      display.updateLineNumbers = from;
    }
    cm.curOp.viewChanged = true;
    if (from >= display.viewTo) {
      if (sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo) {
        resetView(cm);
      }
    } else if (to <= display.viewFrom) {
      if (sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom) {
        resetView(cm);
      } else {
        display.viewFrom += lendiff;
        display.viewTo += lendiff;
      }
    } else if (from <= display.viewFrom && to >= display.viewTo) {
      resetView(cm);
    } else if (from <= display.viewFrom) {
      var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
      if (cut) {
        display.view = display.view.slice(cut.index);
        display.viewFrom = cut.lineN;
        display.viewTo += lendiff;
      } else {
        resetView(cm);
      }
    } else if (to >= display.viewTo) {
      var cut$1 = viewCuttingPoint(cm, from, from, -1);
      if (cut$1) {
        display.view = display.view.slice(0, cut$1.index);
        display.viewTo = cut$1.lineN;
      } else {
        resetView(cm);
      }
    } else {
      var cutTop = viewCuttingPoint(cm, from, from, -1);
      var cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
      if (cutTop && cutBot) {
        display.view = display.view.slice(0, cutTop.index).concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN)).concat(display.view.slice(cutBot.index));
        display.viewTo += lendiff;
      } else {
        resetView(cm);
      }
    }
    var ext = display.externalMeasured;
    if (ext) {
      if (to < ext.lineN) {
        ext.lineN += lendiff;
      } else if (from < ext.lineN + ext.size) {
        display.externalMeasured = null;
      }
    }
  }
  function regLineChange(cm, line, type) {
    cm.curOp.viewChanged = true;
    var display = cm.display, ext = cm.display.externalMeasured;
    if (ext && line >= ext.lineN && line < ext.lineN + ext.size) {
      display.externalMeasured = null;
    }
    if (line < display.viewFrom || line >= display.viewTo) {
      return;
    }
    var lineView = display.view[findViewIndex(cm, line)];
    if (lineView.node == null) {
      return;
    }
    var arr = lineView.changes || (lineView.changes = []);
    if (indexOf(arr, type) == -1) {
      arr.push(type);
    }
  }
  function resetView(cm) {
    cm.display.viewFrom = cm.display.viewTo = cm.doc.first;
    cm.display.view = [];
    cm.display.viewOffset = 0;
  }
  function viewCuttingPoint(cm, oldN, newN, dir) {
    var index = findViewIndex(cm, oldN), diff, view = cm.display.view;
    if (!sawCollapsedSpans || newN == cm.doc.first + cm.doc.size) {
      return { index, lineN: newN };
    }
    var n = cm.display.viewFrom;
    for (var i2 = 0; i2 < index; i2++) {
      n += view[i2].size;
    }
    if (n != oldN) {
      if (dir > 0) {
        if (index == view.length - 1) {
          return null;
        }
        diff = n + view[index].size - oldN;
        index++;
      } else {
        diff = n - oldN;
      }
      oldN += diff;
      newN += diff;
    }
    while (visualLineNo(cm.doc, newN) != newN) {
      if (index == (dir < 0 ? 0 : view.length - 1)) {
        return null;
      }
      newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
      index += dir;
    }
    return { index, lineN: newN };
  }
  function adjustView(cm, from, to) {
    var display = cm.display, view = display.view;
    if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
      display.view = buildViewArray(cm, from, to);
      display.viewFrom = from;
    } else {
      if (display.viewFrom > from) {
        display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view);
      } else if (display.viewFrom < from) {
        display.view = display.view.slice(findViewIndex(cm, from));
      }
      display.viewFrom = from;
      if (display.viewTo < to) {
        display.view = display.view.concat(buildViewArray(cm, display.viewTo, to));
      } else if (display.viewTo > to) {
        display.view = display.view.slice(0, findViewIndex(cm, to));
      }
    }
    display.viewTo = to;
  }
  function countDirtyView(cm) {
    var view = cm.display.view, dirty = 0;
    for (var i2 = 0; i2 < view.length; i2++) {
      var lineView = view[i2];
      if (!lineView.hidden && (!lineView.node || lineView.changes)) {
        ++dirty;
      }
    }
    return dirty;
  }
  function updateSelection(cm) {
    cm.display.input.showSelection(cm.display.input.prepareSelection());
  }
  function prepareSelection(cm, primary) {
    if (primary === void 0) primary = true;
    var doc2 = cm.doc, result = {};
    var curFragment = result.cursors = document.createDocumentFragment();
    var selFragment = result.selection = document.createDocumentFragment();
    var customCursor = cm.options.$customCursor;
    if (customCursor) {
      primary = true;
    }
    for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
      if (!primary && i2 == doc2.sel.primIndex) {
        continue;
      }
      var range2 = doc2.sel.ranges[i2];
      if (range2.from().line >= cm.display.viewTo || range2.to().line < cm.display.viewFrom) {
        continue;
      }
      var collapsed = range2.empty();
      if (customCursor) {
        var head = customCursor(cm, range2);
        if (head) {
          drawSelectionCursor(cm, head, curFragment);
        }
      } else if (collapsed || cm.options.showCursorWhenSelecting) {
        drawSelectionCursor(cm, range2.head, curFragment);
      }
      if (!collapsed) {
        drawSelectionRange(cm, range2, selFragment);
      }
    }
    return result;
  }
  function drawSelectionCursor(cm, head, output) {
    var pos = cursorCoords(cm, head, "div", null, null, !cm.options.singleCursorHeightPerLine);
    var cursor = output.appendChild(elt("div", "\xA0", "CodeMirror-cursor"));
    cursor.style.left = pos.left + "px";
    cursor.style.top = pos.top + "px";
    cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px";
    if (/\bcm-fat-cursor\b/.test(cm.getWrapperElement().className)) {
      var charPos = charCoords(cm, head, "div", null, null);
      var width = charPos.right - charPos.left;
      cursor.style.width = (width > 0 ? width : cm.defaultCharWidth()) + "px";
    }
    if (pos.other) {
      var otherCursor = output.appendChild(elt("div", "\xA0", "CodeMirror-cursor CodeMirror-secondarycursor"));
      otherCursor.style.display = "";
      otherCursor.style.left = pos.other.left + "px";
      otherCursor.style.top = pos.other.top + "px";
      otherCursor.style.height = (pos.other.bottom - pos.other.top) * 0.85 + "px";
    }
  }
  function cmpCoords(a, b) {
    return a.top - b.top || a.left - b.left;
  }
  function drawSelectionRange(cm, range2, output) {
    var display = cm.display, doc2 = cm.doc;
    var fragment = document.createDocumentFragment();
    var padding = paddingH(cm.display), leftSide = padding.left;
    var rightSide = Math.max(display.sizerWidth, displayWidth(cm) - display.sizer.offsetLeft) - padding.right;
    var docLTR = doc2.direction == "ltr";
    function add(left, top, width, bottom) {
      if (top < 0) {
        top = 0;
      }
      top = Math.round(top);
      bottom = Math.round(bottom);
      fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left + "px;\n                             top: " + top + "px; width: " + (width == null ? rightSide - left : width) + "px;\n                             height: " + (bottom - top) + "px"));
    }
    function drawForLine(line, fromArg, toArg) {
      var lineObj = getLine(doc2, line);
      var lineLen = lineObj.text.length;
      var start, end;
      function coords(ch, bias) {
        return charCoords(cm, Pos(line, ch), "div", lineObj, bias);
      }
      function wrapX(pos, dir, side) {
        var extent = wrappedLineExtentChar(cm, lineObj, null, pos);
        var prop2 = dir == "ltr" == (side == "after") ? "left" : "right";
        var ch = side == "after" ? extent.begin : extent.end - (/\s/.test(lineObj.text.charAt(extent.end - 1)) ? 2 : 1);
        return coords(ch, prop2)[prop2];
      }
      var order = getOrder(lineObj, doc2.direction);
      iterateBidiSections(order, fromArg || 0, toArg == null ? lineLen : toArg, function(from, to, dir, i2) {
        var ltr = dir == "ltr";
        var fromPos = coords(from, ltr ? "left" : "right");
        var toPos = coords(to - 1, ltr ? "right" : "left");
        var openStart = fromArg == null && from == 0, openEnd = toArg == null && to == lineLen;
        var first = i2 == 0, last = !order || i2 == order.length - 1;
        if (toPos.top - fromPos.top <= 3) {
          var openLeft = (docLTR ? openStart : openEnd) && first;
          var openRight = (docLTR ? openEnd : openStart) && last;
          var left = openLeft ? leftSide : (ltr ? fromPos : toPos).left;
          var right = openRight ? rightSide : (ltr ? toPos : fromPos).right;
          add(left, fromPos.top, right - left, fromPos.bottom);
        } else {
          var topLeft, topRight, botLeft, botRight;
          if (ltr) {
            topLeft = docLTR && openStart && first ? leftSide : fromPos.left;
            topRight = docLTR ? rightSide : wrapX(from, dir, "before");
            botLeft = docLTR ? leftSide : wrapX(to, dir, "after");
            botRight = docLTR && openEnd && last ? rightSide : toPos.right;
          } else {
            topLeft = !docLTR ? leftSide : wrapX(from, dir, "before");
            topRight = !docLTR && openStart && first ? rightSide : fromPos.right;
            botLeft = !docLTR && openEnd && last ? leftSide : toPos.left;
            botRight = !docLTR ? rightSide : wrapX(to, dir, "after");
          }
          add(topLeft, fromPos.top, topRight - topLeft, fromPos.bottom);
          if (fromPos.bottom < toPos.top) {
            add(leftSide, fromPos.bottom, null, toPos.top);
          }
          add(botLeft, toPos.top, botRight - botLeft, toPos.bottom);
        }
        if (!start || cmpCoords(fromPos, start) < 0) {
          start = fromPos;
        }
        if (cmpCoords(toPos, start) < 0) {
          start = toPos;
        }
        if (!end || cmpCoords(fromPos, end) < 0) {
          end = fromPos;
        }
        if (cmpCoords(toPos, end) < 0) {
          end = toPos;
        }
      });
      return { start, end };
    }
    var sFrom = range2.from(), sTo = range2.to();
    if (sFrom.line == sTo.line) {
      drawForLine(sFrom.line, sFrom.ch, sTo.ch);
    } else {
      var fromLine = getLine(doc2, sFrom.line), toLine = getLine(doc2, sTo.line);
      var singleVLine = visualLine(fromLine) == visualLine(toLine);
      var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
      var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
      if (singleVLine) {
        if (leftEnd.top < rightStart.top - 2) {
          add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
          add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
        } else {
          add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
        }
      }
      if (leftEnd.bottom < rightStart.top) {
        add(leftSide, leftEnd.bottom, null, rightStart.top);
      }
    }
    output.appendChild(fragment);
  }
  function restartBlink(cm) {
    if (!cm.state.focused) {
      return;
    }
    var display = cm.display;
    clearInterval(display.blinker);
    var on2 = true;
    display.cursorDiv.style.visibility = "";
    if (cm.options.cursorBlinkRate > 0) {
      display.blinker = setInterval(function() {
        if (!cm.hasFocus()) {
          onBlur(cm);
        }
        display.cursorDiv.style.visibility = (on2 = !on2) ? "" : "hidden";
      }, cm.options.cursorBlinkRate);
    } else if (cm.options.cursorBlinkRate < 0) {
      display.cursorDiv.style.visibility = "hidden";
    }
  }
  function ensureFocus(cm) {
    if (!cm.hasFocus()) {
      cm.display.input.focus();
      if (!cm.state.focused) {
        onFocus(cm);
      }
    }
  }
  function delayBlurEvent(cm) {
    cm.state.delayingBlurEvent = true;
    setTimeout(function() {
      if (cm.state.delayingBlurEvent) {
        cm.state.delayingBlurEvent = false;
        if (cm.state.focused) {
          onBlur(cm);
        }
      }
    }, 100);
  }
  function onFocus(cm, e) {
    if (cm.state.delayingBlurEvent && !cm.state.draggingText) {
      cm.state.delayingBlurEvent = false;
    }
    if (cm.options.readOnly == "nocursor") {
      return;
    }
    if (!cm.state.focused) {
      signal(cm, "focus", cm, e);
      cm.state.focused = true;
      addClass(cm.display.wrapper, "CodeMirror-focused");
      if (!cm.curOp && cm.display.selForContextMenu != cm.doc.sel) {
        cm.display.input.reset();
        if (webkit) {
          setTimeout(function() {
            return cm.display.input.reset(true);
          }, 20);
        }
      }
      cm.display.input.receivedFocus();
    }
    restartBlink(cm);
  }
  function onBlur(cm, e) {
    if (cm.state.delayingBlurEvent) {
      return;
    }
    if (cm.state.focused) {
      signal(cm, "blur", cm, e);
      cm.state.focused = false;
      rmClass(cm.display.wrapper, "CodeMirror-focused");
    }
    clearInterval(cm.display.blinker);
    setTimeout(function() {
      if (!cm.state.focused) {
        cm.display.shift = false;
      }
    }, 150);
  }
  function updateHeightsInViewport(cm) {
    var display = cm.display;
    var prevBottom = display.lineDiv.offsetTop;
    var viewTop = Math.max(0, display.scroller.getBoundingClientRect().top);
    var oldHeight = display.lineDiv.getBoundingClientRect().top;
    var mustScroll = 0;
    for (var i2 = 0; i2 < display.view.length; i2++) {
      var cur = display.view[i2], wrapping = cm.options.lineWrapping;
      var height = void 0, width = 0;
      if (cur.hidden) {
        continue;
      }
      oldHeight += cur.line.height;
      if (ie && ie_version < 8) {
        var bot = cur.node.offsetTop + cur.node.offsetHeight;
        height = bot - prevBottom;
        prevBottom = bot;
      } else {
        var box = cur.node.getBoundingClientRect();
        height = box.bottom - box.top;
        if (!wrapping && cur.text.firstChild) {
          width = cur.text.firstChild.getBoundingClientRect().right - box.left - 1;
        }
      }
      var diff = cur.line.height - height;
      if (diff > 5e-3 || diff < -5e-3) {
        if (oldHeight < viewTop) {
          mustScroll -= diff;
        }
        updateLineHeight(cur.line, height);
        updateWidgetHeight(cur.line);
        if (cur.rest) {
          for (var j = 0; j < cur.rest.length; j++) {
            updateWidgetHeight(cur.rest[j]);
          }
        }
      }
      if (width > cm.display.sizerWidth) {
        var chWidth = Math.ceil(width / charWidth(cm.display));
        if (chWidth > cm.display.maxLineLength) {
          cm.display.maxLineLength = chWidth;
          cm.display.maxLine = cur.line;
          cm.display.maxLineChanged = true;
        }
      }
    }
    if (Math.abs(mustScroll) > 2) {
      display.scroller.scrollTop += mustScroll;
    }
  }
  function updateWidgetHeight(line) {
    if (line.widgets) {
      for (var i2 = 0; i2 < line.widgets.length; ++i2) {
        var w = line.widgets[i2], parent = w.node.parentNode;
        if (parent) {
          w.height = parent.offsetHeight;
        }
      }
    }
  }
  function visibleLines(display, doc2, viewport) {
    var top = viewport && viewport.top != null ? Math.max(0, viewport.top) : display.scroller.scrollTop;
    top = Math.floor(top - paddingTop(display));
    var bottom = viewport && viewport.bottom != null ? viewport.bottom : top + display.wrapper.clientHeight;
    var from = lineAtHeight(doc2, top), to = lineAtHeight(doc2, bottom);
    if (viewport && viewport.ensure) {
      var ensureFrom = viewport.ensure.from.line, ensureTo = viewport.ensure.to.line;
      if (ensureFrom < from) {
        from = ensureFrom;
        to = lineAtHeight(doc2, heightAtLine(getLine(doc2, ensureFrom)) + display.wrapper.clientHeight);
      } else if (Math.min(ensureTo, doc2.lastLine()) >= to) {
        from = lineAtHeight(doc2, heightAtLine(getLine(doc2, ensureTo)) - display.wrapper.clientHeight);
        to = ensureTo;
      }
    }
    return { from, to: Math.max(to, from + 1) };
  }
  function maybeScrollWindow(cm, rect) {
    if (signalDOMEvent(cm, "scrollCursorIntoView")) {
      return;
    }
    var display = cm.display, box = display.sizer.getBoundingClientRect(), doScroll = null;
    var doc2 = display.wrapper.ownerDocument;
    if (rect.top + box.top < 0) {
      doScroll = true;
    } else if (rect.bottom + box.top > (doc2.defaultView.innerHeight || doc2.documentElement.clientHeight)) {
      doScroll = false;
    }
    if (doScroll != null && !phantom) {
      var scrollNode = elt("div", "\u200B", null, "position: absolute;\n                         top: " + (rect.top - display.viewOffset - paddingTop(cm.display)) + "px;\n                         height: " + (rect.bottom - rect.top + scrollGap(cm) + display.barHeight) + "px;\n                         left: " + rect.left + "px; width: " + Math.max(2, rect.right - rect.left) + "px;");
      cm.display.lineSpace.appendChild(scrollNode);
      scrollNode.scrollIntoView(doScroll);
      cm.display.lineSpace.removeChild(scrollNode);
    }
  }
  function scrollPosIntoView(cm, pos, end, margin) {
    if (margin == null) {
      margin = 0;
    }
    var rect;
    if (!cm.options.lineWrapping && pos == end) {
      end = pos.sticky == "before" ? Pos(pos.line, pos.ch + 1, "before") : pos;
      pos = pos.ch ? Pos(pos.line, pos.sticky == "before" ? pos.ch - 1 : pos.ch, "after") : pos;
    }
    for (var limit = 0; limit < 5; limit++) {
      var changed = false;
      var coords = cursorCoords(cm, pos);
      var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
      rect = {
        left: Math.min(coords.left, endCoords.left),
        top: Math.min(coords.top, endCoords.top) - margin,
        right: Math.max(coords.left, endCoords.left),
        bottom: Math.max(coords.bottom, endCoords.bottom) + margin
      };
      var scrollPos = calculateScrollPos(cm, rect);
      var startTop = cm.doc.scrollTop, startLeft = cm.doc.scrollLeft;
      if (scrollPos.scrollTop != null) {
        updateScrollTop(cm, scrollPos.scrollTop);
        if (Math.abs(cm.doc.scrollTop - startTop) > 1) {
          changed = true;
        }
      }
      if (scrollPos.scrollLeft != null) {
        setScrollLeft(cm, scrollPos.scrollLeft);
        if (Math.abs(cm.doc.scrollLeft - startLeft) > 1) {
          changed = true;
        }
      }
      if (!changed) {
        break;
      }
    }
    return rect;
  }
  function scrollIntoView(cm, rect) {
    var scrollPos = calculateScrollPos(cm, rect);
    if (scrollPos.scrollTop != null) {
      updateScrollTop(cm, scrollPos.scrollTop);
    }
    if (scrollPos.scrollLeft != null) {
      setScrollLeft(cm, scrollPos.scrollLeft);
    }
  }
  function calculateScrollPos(cm, rect) {
    var display = cm.display, snapMargin = textHeight(cm.display);
    if (rect.top < 0) {
      rect.top = 0;
    }
    var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
    var screen2 = displayHeight(cm), result = {};
    if (rect.bottom - rect.top > screen2) {
      rect.bottom = rect.top + screen2;
    }
    var docBottom = cm.doc.height + paddingVert(display);
    var atTop = rect.top < snapMargin, atBottom = rect.bottom > docBottom - snapMargin;
    if (rect.top < screentop) {
      result.scrollTop = atTop ? 0 : rect.top;
    } else if (rect.bottom > screentop + screen2) {
      var newTop = Math.min(rect.top, (atBottom ? docBottom : rect.bottom) - screen2);
      if (newTop != screentop) {
        result.scrollTop = newTop;
      }
    }
    var gutterSpace = cm.options.fixedGutter ? 0 : display.gutters.offsetWidth;
    var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft - gutterSpace;
    var screenw = displayWidth(cm) - display.gutters.offsetWidth;
    var tooWide = rect.right - rect.left > screenw;
    if (tooWide) {
      rect.right = rect.left + screenw;
    }
    if (rect.left < 10) {
      result.scrollLeft = 0;
    } else if (rect.left < screenleft) {
      result.scrollLeft = Math.max(0, rect.left + gutterSpace - (tooWide ? 0 : 10));
    } else if (rect.right > screenw + screenleft - 3) {
      result.scrollLeft = rect.right + (tooWide ? 0 : 10) - screenw;
    }
    return result;
  }
  function addToScrollTop(cm, top) {
    if (top == null) {
      return;
    }
    resolveScrollToPos(cm);
    cm.curOp.scrollTop = (cm.curOp.scrollTop == null ? cm.doc.scrollTop : cm.curOp.scrollTop) + top;
  }
  function ensureCursorVisible(cm) {
    resolveScrollToPos(cm);
    var cur = cm.getCursor();
    cm.curOp.scrollToPos = { from: cur, to: cur, margin: cm.options.cursorScrollMargin };
  }
  function scrollToCoords(cm, x, y) {
    if (x != null || y != null) {
      resolveScrollToPos(cm);
    }
    if (x != null) {
      cm.curOp.scrollLeft = x;
    }
    if (y != null) {
      cm.curOp.scrollTop = y;
    }
  }
  function scrollToRange(cm, range2) {
    resolveScrollToPos(cm);
    cm.curOp.scrollToPos = range2;
  }
  function resolveScrollToPos(cm) {
    var range2 = cm.curOp.scrollToPos;
    if (range2) {
      cm.curOp.scrollToPos = null;
      var from = estimateCoords(cm, range2.from), to = estimateCoords(cm, range2.to);
      scrollToCoordsRange(cm, from, to, range2.margin);
    }
  }
  function scrollToCoordsRange(cm, from, to, margin) {
    var sPos = calculateScrollPos(cm, {
      left: Math.min(from.left, to.left),
      top: Math.min(from.top, to.top) - margin,
      right: Math.max(from.right, to.right),
      bottom: Math.max(from.bottom, to.bottom) + margin
    });
    scrollToCoords(cm, sPos.scrollLeft, sPos.scrollTop);
  }
  function updateScrollTop(cm, val) {
    if (Math.abs(cm.doc.scrollTop - val) < 2) {
      return;
    }
    if (!gecko) {
      updateDisplaySimple(cm, { top: val });
    }
    setScrollTop(cm, val, true);
    if (gecko) {
      updateDisplaySimple(cm);
    }
    startWorker(cm, 100);
  }
  function setScrollTop(cm, val, forceScroll) {
    val = Math.max(0, Math.min(cm.display.scroller.scrollHeight - cm.display.scroller.clientHeight, val));
    if (cm.display.scroller.scrollTop == val && !forceScroll) {
      return;
    }
    cm.doc.scrollTop = val;
    cm.display.scrollbars.setScrollTop(val);
    if (cm.display.scroller.scrollTop != val) {
      cm.display.scroller.scrollTop = val;
    }
  }
  function setScrollLeft(cm, val, isScroller, forceScroll) {
    val = Math.max(0, Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth));
    if ((isScroller ? val == cm.doc.scrollLeft : Math.abs(cm.doc.scrollLeft - val) < 2) && !forceScroll) {
      return;
    }
    cm.doc.scrollLeft = val;
    alignHorizontally(cm);
    if (cm.display.scroller.scrollLeft != val) {
      cm.display.scroller.scrollLeft = val;
    }
    cm.display.scrollbars.setScrollLeft(val);
  }
  function measureForScrollbars(cm) {
    var d = cm.display, gutterW = d.gutters.offsetWidth;
    var docH = Math.round(cm.doc.height + paddingVert(cm.display));
    return {
      clientHeight: d.scroller.clientHeight,
      viewHeight: d.wrapper.clientHeight,
      scrollWidth: d.scroller.scrollWidth,
      clientWidth: d.scroller.clientWidth,
      viewWidth: d.wrapper.clientWidth,
      barLeft: cm.options.fixedGutter ? gutterW : 0,
      docHeight: docH,
      scrollHeight: docH + scrollGap(cm) + d.barHeight,
      nativeBarWidth: d.nativeBarWidth,
      gutterWidth: gutterW
    };
  }
  var NativeScrollbars = function(place, scroll, cm) {
    this.cm = cm;
    var vert = this.vert = elt("div", [elt("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
    var horiz = this.horiz = elt("div", [elt("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
    vert.tabIndex = horiz.tabIndex = -1;
    place(vert);
    place(horiz);
    on(vert, "scroll", function() {
      if (vert.clientHeight) {
        scroll(vert.scrollTop, "vertical");
      }
    });
    on(horiz, "scroll", function() {
      if (horiz.clientWidth) {
        scroll(horiz.scrollLeft, "horizontal");
      }
    });
    this.checkedZeroWidth = false;
    if (ie && ie_version < 8) {
      this.horiz.style.minHeight = this.vert.style.minWidth = "18px";
    }
  };
  NativeScrollbars.prototype.update = function(measure) {
    var needsH = measure.scrollWidth > measure.clientWidth + 1;
    var needsV = measure.scrollHeight > measure.clientHeight + 1;
    var sWidth = measure.nativeBarWidth;
    if (needsV) {
      this.vert.style.display = "block";
      this.vert.style.bottom = needsH ? sWidth + "px" : "0";
      var totalHeight = measure.viewHeight - (needsH ? sWidth : 0);
      this.vert.firstChild.style.height = Math.max(0, measure.scrollHeight - measure.clientHeight + totalHeight) + "px";
    } else {
      this.vert.scrollTop = 0;
      this.vert.style.display = "";
      this.vert.firstChild.style.height = "0";
    }
    if (needsH) {
      this.horiz.style.display = "block";
      this.horiz.style.right = needsV ? sWidth + "px" : "0";
      this.horiz.style.left = measure.barLeft + "px";
      var totalWidth = measure.viewWidth - measure.barLeft - (needsV ? sWidth : 0);
      this.horiz.firstChild.style.width = Math.max(0, measure.scrollWidth - measure.clientWidth + totalWidth) + "px";
    } else {
      this.horiz.style.display = "";
      this.horiz.firstChild.style.width = "0";
    }
    if (!this.checkedZeroWidth && measure.clientHeight > 0) {
      if (sWidth == 0) {
        this.zeroWidthHack();
      }
      this.checkedZeroWidth = true;
    }
    return { right: needsV ? sWidth : 0, bottom: needsH ? sWidth : 0 };
  };
  NativeScrollbars.prototype.setScrollLeft = function(pos) {
    if (this.horiz.scrollLeft != pos) {
      this.horiz.scrollLeft = pos;
    }
    if (this.disableHoriz) {
      this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
    }
  };
  NativeScrollbars.prototype.setScrollTop = function(pos) {
    if (this.vert.scrollTop != pos) {
      this.vert.scrollTop = pos;
    }
    if (this.disableVert) {
      this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
    }
  };
  NativeScrollbars.prototype.zeroWidthHack = function() {
    var w = mac && !mac_geMountainLion ? "12px" : "18px";
    this.horiz.style.height = this.vert.style.width = w;
    this.horiz.style.visibility = this.vert.style.visibility = "hidden";
    this.disableHoriz = new Delayed();
    this.disableVert = new Delayed();
  };
  NativeScrollbars.prototype.enableZeroWidthBar = function(bar, delay, type) {
    bar.style.visibility = "";
    function maybeDisable() {
      var box = bar.getBoundingClientRect();
      var elt2 = type == "vert" ? document.elementFromPoint(box.right - 1, (box.top + box.bottom) / 2) : document.elementFromPoint((box.right + box.left) / 2, box.bottom - 1);
      if (elt2 != bar) {
        bar.style.visibility = "hidden";
      } else {
        delay.set(1e3, maybeDisable);
      }
    }
    delay.set(1e3, maybeDisable);
  };
  NativeScrollbars.prototype.clear = function() {
    var parent = this.horiz.parentNode;
    parent.removeChild(this.horiz);
    parent.removeChild(this.vert);
  };
  var NullScrollbars = function() {
  };
  NullScrollbars.prototype.update = function() {
    return { bottom: 0, right: 0 };
  };
  NullScrollbars.prototype.setScrollLeft = function() {
  };
  NullScrollbars.prototype.setScrollTop = function() {
  };
  NullScrollbars.prototype.clear = function() {
  };
  function updateScrollbars(cm, measure) {
    if (!measure) {
      measure = measureForScrollbars(cm);
    }
    var startWidth = cm.display.barWidth, startHeight = cm.display.barHeight;
    updateScrollbarsInner(cm, measure);
    for (var i2 = 0; i2 < 4 && startWidth != cm.display.barWidth || startHeight != cm.display.barHeight; i2++) {
      if (startWidth != cm.display.barWidth && cm.options.lineWrapping) {
        updateHeightsInViewport(cm);
      }
      updateScrollbarsInner(cm, measureForScrollbars(cm));
      startWidth = cm.display.barWidth;
      startHeight = cm.display.barHeight;
    }
  }
  function updateScrollbarsInner(cm, measure) {
    var d = cm.display;
    var sizes = d.scrollbars.update(measure);
    d.sizer.style.paddingRight = (d.barWidth = sizes.right) + "px";
    d.sizer.style.paddingBottom = (d.barHeight = sizes.bottom) + "px";
    d.heightForcer.style.borderBottom = sizes.bottom + "px solid transparent";
    if (sizes.right && sizes.bottom) {
      d.scrollbarFiller.style.display = "block";
      d.scrollbarFiller.style.height = sizes.bottom + "px";
      d.scrollbarFiller.style.width = sizes.right + "px";
    } else {
      d.scrollbarFiller.style.display = "";
    }
    if (sizes.bottom && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter) {
      d.gutterFiller.style.display = "block";
      d.gutterFiller.style.height = sizes.bottom + "px";
      d.gutterFiller.style.width = measure.gutterWidth + "px";
    } else {
      d.gutterFiller.style.display = "";
    }
  }
  var scrollbarModel = { "native": NativeScrollbars, "null": NullScrollbars };
  function initScrollbars(cm) {
    if (cm.display.scrollbars) {
      cm.display.scrollbars.clear();
      if (cm.display.scrollbars.addClass) {
        rmClass(cm.display.wrapper, cm.display.scrollbars.addClass);
      }
    }
    cm.display.scrollbars = new scrollbarModel[cm.options.scrollbarStyle](function(node) {
      cm.display.wrapper.insertBefore(node, cm.display.scrollbarFiller);
      on(node, "mousedown", function() {
        if (cm.state.focused) {
          setTimeout(function() {
            return cm.display.input.focus();
          }, 0);
        }
      });
      node.setAttribute("cm-not-content", "true");
    }, function(pos, axis) {
      if (axis == "horizontal") {
        setScrollLeft(cm, pos);
      } else {
        updateScrollTop(cm, pos);
      }
    }, cm);
    if (cm.display.scrollbars.addClass) {
      addClass(cm.display.wrapper, cm.display.scrollbars.addClass);
    }
  }
  var nextOpId = 0;
  function startOperation(cm) {
    cm.curOp = {
      cm,
      viewChanged: false,
      // Flag that indicates that lines might need to be redrawn
      startHeight: cm.doc.height,
      // Used to detect need to update scrollbar
      forceUpdate: false,
      // Used to force a redraw
      updateInput: 0,
      // Whether to reset the input textarea
      typing: false,
      // Whether this reset should be careful to leave existing text (for compositing)
      changeObjs: null,
      // Accumulated changes, for firing change events
      cursorActivityHandlers: null,
      // Set of handlers to fire cursorActivity on
      cursorActivityCalled: 0,
      // Tracks which cursorActivity handlers have been called already
      selectionChanged: false,
      // Whether the selection needs to be redrawn
      updateMaxLine: false,
      // Set when the widest line needs to be determined anew
      scrollLeft: null,
      scrollTop: null,
      // Intermediate scroll position, not pushed to DOM yet
      scrollToPos: null,
      // Used to scroll to a specific position
      focus: false,
      id: ++nextOpId,
      // Unique ID
      markArrays: null
      // Used by addMarkedSpan
    };
    pushOperation(cm.curOp);
  }
  function endOperation(cm) {
    var op = cm.curOp;
    if (op) {
      finishOperation(op, function(group) {
        for (var i2 = 0; i2 < group.ops.length; i2++) {
          group.ops[i2].cm.curOp = null;
        }
        endOperations(group);
      });
    }
  }
  function endOperations(group) {
    var ops = group.ops;
    for (var i2 = 0; i2 < ops.length; i2++) {
      endOperation_R1(ops[i2]);
    }
    for (var i$12 = 0; i$12 < ops.length; i$12++) {
      endOperation_W1(ops[i$12]);
    }
    for (var i$22 = 0; i$22 < ops.length; i$22++) {
      endOperation_R2(ops[i$22]);
    }
    for (var i$3 = 0; i$3 < ops.length; i$3++) {
      endOperation_W2(ops[i$3]);
    }
    for (var i$4 = 0; i$4 < ops.length; i$4++) {
      endOperation_finish(ops[i$4]);
    }
  }
  function endOperation_R1(op) {
    var cm = op.cm, display = cm.display;
    maybeClipScrollbars(cm);
    if (op.updateMaxLine) {
      findMaxLine(cm);
    }
    op.mustUpdate = op.viewChanged || op.forceUpdate || op.scrollTop != null || op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom || op.scrollToPos.to.line >= display.viewTo) || display.maxLineChanged && cm.options.lineWrapping;
    op.update = op.mustUpdate && new DisplayUpdate(cm, op.mustUpdate && { top: op.scrollTop, ensure: op.scrollToPos }, op.forceUpdate);
  }
  function endOperation_W1(op) {
    op.updatedDisplay = op.mustUpdate && updateDisplayIfNeeded(op.cm, op.update);
  }
  function endOperation_R2(op) {
    var cm = op.cm, display = cm.display;
    if (op.updatedDisplay) {
      updateHeightsInViewport(cm);
    }
    op.barMeasure = measureForScrollbars(cm);
    if (display.maxLineChanged && !cm.options.lineWrapping) {
      op.adjustWidthTo = measureChar(cm, display.maxLine, display.maxLine.text.length).left + 3;
      cm.display.sizerWidth = op.adjustWidthTo;
      op.barMeasure.scrollWidth = Math.max(display.scroller.clientWidth, display.sizer.offsetLeft + op.adjustWidthTo + scrollGap(cm) + cm.display.barWidth);
      op.maxScrollLeft = Math.max(0, display.sizer.offsetLeft + op.adjustWidthTo - displayWidth(cm));
    }
    if (op.updatedDisplay || op.selectionChanged) {
      op.preparedSelection = display.input.prepareSelection();
    }
  }
  function endOperation_W2(op) {
    var cm = op.cm;
    if (op.adjustWidthTo != null) {
      cm.display.sizer.style.minWidth = op.adjustWidthTo + "px";
      if (op.maxScrollLeft < cm.doc.scrollLeft) {
        setScrollLeft(cm, Math.min(cm.display.scroller.scrollLeft, op.maxScrollLeft), true);
      }
      cm.display.maxLineChanged = false;
    }
    var takeFocus = op.focus && op.focus == activeElt(root(cm));
    if (op.preparedSelection) {
      cm.display.input.showSelection(op.preparedSelection, takeFocus);
    }
    if (op.updatedDisplay || op.startHeight != cm.doc.height) {
      updateScrollbars(cm, op.barMeasure);
    }
    if (op.updatedDisplay) {
      setDocumentHeight(cm, op.barMeasure);
    }
    if (op.selectionChanged) {
      restartBlink(cm);
    }
    if (cm.state.focused && op.updateInput) {
      cm.display.input.reset(op.typing);
    }
    if (takeFocus) {
      ensureFocus(op.cm);
    }
  }
  function endOperation_finish(op) {
    var cm = op.cm, display = cm.display, doc2 = cm.doc;
    if (op.updatedDisplay) {
      postUpdateDisplay(cm, op.update);
    }
    if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos)) {
      display.wheelStartX = display.wheelStartY = null;
    }
    if (op.scrollTop != null) {
      setScrollTop(cm, op.scrollTop, op.forceScroll);
    }
    if (op.scrollLeft != null) {
      setScrollLeft(cm, op.scrollLeft, true, true);
    }
    if (op.scrollToPos) {
      var rect = scrollPosIntoView(
        cm,
        clipPos(doc2, op.scrollToPos.from),
        clipPos(doc2, op.scrollToPos.to),
        op.scrollToPos.margin
      );
      maybeScrollWindow(cm, rect);
    }
    var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
    if (hidden) {
      for (var i2 = 0; i2 < hidden.length; ++i2) {
        if (!hidden[i2].lines.length) {
          signal(hidden[i2], "hide");
        }
      }
    }
    if (unhidden) {
      for (var i$12 = 0; i$12 < unhidden.length; ++i$12) {
        if (unhidden[i$12].lines.length) {
          signal(unhidden[i$12], "unhide");
        }
      }
    }
    if (display.wrapper.offsetHeight) {
      doc2.scrollTop = cm.display.scroller.scrollTop;
    }
    if (op.changeObjs) {
      signal(cm, "changes", cm, op.changeObjs);
    }
    if (op.update) {
      op.update.finish();
    }
  }
  function runInOp(cm, f) {
    if (cm.curOp) {
      return f();
    }
    startOperation(cm);
    try {
      return f();
    } finally {
      endOperation(cm);
    }
  }
  function operation(cm, f) {
    return function() {
      if (cm.curOp) {
        return f.apply(cm, arguments);
      }
      startOperation(cm);
      try {
        return f.apply(cm, arguments);
      } finally {
        endOperation(cm);
      }
    };
  }
  function methodOp(f) {
    return function() {
      if (this.curOp) {
        return f.apply(this, arguments);
      }
      startOperation(this);
      try {
        return f.apply(this, arguments);
      } finally {
        endOperation(this);
      }
    };
  }
  function docMethodOp(f) {
    return function() {
      var cm = this.cm;
      if (!cm || cm.curOp) {
        return f.apply(this, arguments);
      }
      startOperation(cm);
      try {
        return f.apply(this, arguments);
      } finally {
        endOperation(cm);
      }
    };
  }
  function startWorker(cm, time) {
    if (cm.doc.highlightFrontier < cm.display.viewTo) {
      cm.state.highlight.set(time, bind(highlightWorker, cm));
    }
  }
  function highlightWorker(cm) {
    var doc2 = cm.doc;
    if (doc2.highlightFrontier >= cm.display.viewTo) {
      return;
    }
    var end = +/* @__PURE__ */ new Date() + cm.options.workTime;
    var context = getContextBefore(cm, doc2.highlightFrontier);
    var changedLines = [];
    doc2.iter(context.line, Math.min(doc2.first + doc2.size, cm.display.viewTo + 500), function(line) {
      if (context.line >= cm.display.viewFrom) {
        var oldStyles = line.styles;
        var resetState = line.text.length > cm.options.maxHighlightLength ? copyState(doc2.mode, context.state) : null;
        var highlighted = highlightLine(cm, line, context, true);
        if (resetState) {
          context.state = resetState;
        }
        line.styles = highlighted.styles;
        var oldCls = line.styleClasses, newCls = highlighted.classes;
        if (newCls) {
          line.styleClasses = newCls;
        } else if (oldCls) {
          line.styleClasses = null;
        }
        var ischange = !oldStyles || oldStyles.length != line.styles.length || oldCls != newCls && (!oldCls || !newCls || oldCls.bgClass != newCls.bgClass || oldCls.textClass != newCls.textClass);
        for (var i2 = 0; !ischange && i2 < oldStyles.length; ++i2) {
          ischange = oldStyles[i2] != line.styles[i2];
        }
        if (ischange) {
          changedLines.push(context.line);
        }
        line.stateAfter = context.save();
        context.nextLine();
      } else {
        if (line.text.length <= cm.options.maxHighlightLength) {
          processLine(cm, line.text, context);
        }
        line.stateAfter = context.line % 5 == 0 ? context.save() : null;
        context.nextLine();
      }
      if (+/* @__PURE__ */ new Date() > end) {
        startWorker(cm, cm.options.workDelay);
        return true;
      }
    });
    doc2.highlightFrontier = context.line;
    doc2.modeFrontier = Math.max(doc2.modeFrontier, context.line);
    if (changedLines.length) {
      runInOp(cm, function() {
        for (var i2 = 0; i2 < changedLines.length; i2++) {
          regLineChange(cm, changedLines[i2], "text");
        }
      });
    }
  }
  var DisplayUpdate = function(cm, viewport, force) {
    var display = cm.display;
    this.viewport = viewport;
    this.visible = visibleLines(display, cm.doc, viewport);
    this.editorIsHidden = !display.wrapper.offsetWidth;
    this.wrapperHeight = display.wrapper.clientHeight;
    this.wrapperWidth = display.wrapper.clientWidth;
    this.oldDisplayWidth = displayWidth(cm);
    this.force = force;
    this.dims = getDimensions(cm);
    this.events = [];
  };
  DisplayUpdate.prototype.signal = function(emitter, type) {
    if (hasHandler(emitter, type)) {
      this.events.push(arguments);
    }
  };
  DisplayUpdate.prototype.finish = function() {
    for (var i2 = 0; i2 < this.events.length; i2++) {
      signal.apply(null, this.events[i2]);
    }
  };
  function maybeClipScrollbars(cm) {
    var display = cm.display;
    if (!display.scrollbarsClipped && display.scroller.offsetWidth) {
      display.nativeBarWidth = display.scroller.offsetWidth - display.scroller.clientWidth;
      display.heightForcer.style.height = scrollGap(cm) + "px";
      display.sizer.style.marginBottom = -display.nativeBarWidth + "px";
      display.sizer.style.borderRightWidth = scrollGap(cm) + "px";
      display.scrollbarsClipped = true;
    }
  }
  function selectionSnapshot(cm) {
    if (cm.hasFocus()) {
      return null;
    }
    var active = activeElt(root(cm));
    if (!active || !contains(cm.display.lineDiv, active)) {
      return null;
    }
    var result = { activeElt: active };
    if (window.getSelection) {
      var sel = win(cm).getSelection();
      if (sel.anchorNode && sel.extend && contains(cm.display.lineDiv, sel.anchorNode)) {
        result.anchorNode = sel.anchorNode;
        result.anchorOffset = sel.anchorOffset;
        result.focusNode = sel.focusNode;
        result.focusOffset = sel.focusOffset;
      }
    }
    return result;
  }
  function restoreSelection(snapshot) {
    if (!snapshot || !snapshot.activeElt || snapshot.activeElt == activeElt(rootNode(snapshot.activeElt))) {
      return;
    }
    snapshot.activeElt.focus();
    if (!/^(INPUT|TEXTAREA)$/.test(snapshot.activeElt.nodeName) && snapshot.anchorNode && contains(document.body, snapshot.anchorNode) && contains(document.body, snapshot.focusNode)) {
      var doc2 = snapshot.activeElt.ownerDocument;
      var sel = doc2.defaultView.getSelection(), range2 = doc2.createRange();
      range2.setEnd(snapshot.anchorNode, snapshot.anchorOffset);
      range2.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range2);
      sel.extend(snapshot.focusNode, snapshot.focusOffset);
    }
  }
  function updateDisplayIfNeeded(cm, update) {
    var display = cm.display, doc2 = cm.doc;
    if (update.editorIsHidden) {
      resetView(cm);
      return false;
    }
    if (!update.force && update.visible.from >= display.viewFrom && update.visible.to <= display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo) && display.renderedView == display.view && countDirtyView(cm) == 0) {
      return false;
    }
    if (maybeUpdateLineNumberWidth(cm)) {
      resetView(cm);
      update.dims = getDimensions(cm);
    }
    var end = doc2.first + doc2.size;
    var from = Math.max(update.visible.from - cm.options.viewportMargin, doc2.first);
    var to = Math.min(end, update.visible.to + cm.options.viewportMargin);
    if (display.viewFrom < from && from - display.viewFrom < 20) {
      from = Math.max(doc2.first, display.viewFrom);
    }
    if (display.viewTo > to && display.viewTo - to < 20) {
      to = Math.min(end, display.viewTo);
    }
    if (sawCollapsedSpans) {
      from = visualLineNo(cm.doc, from);
      to = visualLineEndNo(cm.doc, to);
    }
    var different = from != display.viewFrom || to != display.viewTo || display.lastWrapHeight != update.wrapperHeight || display.lastWrapWidth != update.wrapperWidth;
    adjustView(cm, from, to);
    display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom));
    cm.display.mover.style.top = display.viewOffset + "px";
    var toUpdate = countDirtyView(cm);
    if (!different && toUpdate == 0 && !update.force && display.renderedView == display.view && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo)) {
      return false;
    }
    var selSnapshot = selectionSnapshot(cm);
    if (toUpdate > 4) {
      display.lineDiv.style.display = "none";
    }
    patchDisplay(cm, display.updateLineNumbers, update.dims);
    if (toUpdate > 4) {
      display.lineDiv.style.display = "";
    }
    display.renderedView = display.view;
    restoreSelection(selSnapshot);
    removeChildren(display.cursorDiv);
    removeChildren(display.selectionDiv);
    display.gutters.style.height = display.sizer.style.minHeight = 0;
    if (different) {
      display.lastWrapHeight = update.wrapperHeight;
      display.lastWrapWidth = update.wrapperWidth;
      startWorker(cm, 400);
    }
    display.updateLineNumbers = null;
    return true;
  }
  function postUpdateDisplay(cm, update) {
    var viewport = update.viewport;
    for (var first = true; ; first = false) {
      if (!first || !cm.options.lineWrapping || update.oldDisplayWidth == displayWidth(cm)) {
        if (viewport && viewport.top != null) {
          viewport = { top: Math.min(cm.doc.height + paddingVert(cm.display) - displayHeight(cm), viewport.top) };
        }
        update.visible = visibleLines(cm.display, cm.doc, viewport);
        if (update.visible.from >= cm.display.viewFrom && update.visible.to <= cm.display.viewTo) {
          break;
        }
      } else if (first) {
        update.visible = visibleLines(cm.display, cm.doc, viewport);
      }
      if (!updateDisplayIfNeeded(cm, update)) {
        break;
      }
      updateHeightsInViewport(cm);
      var barMeasure = measureForScrollbars(cm);
      updateSelection(cm);
      updateScrollbars(cm, barMeasure);
      setDocumentHeight(cm, barMeasure);
      update.force = false;
    }
    update.signal(cm, "update", cm);
    if (cm.display.viewFrom != cm.display.reportedViewFrom || cm.display.viewTo != cm.display.reportedViewTo) {
      update.signal(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
      cm.display.reportedViewFrom = cm.display.viewFrom;
      cm.display.reportedViewTo = cm.display.viewTo;
    }
  }
  function updateDisplaySimple(cm, viewport) {
    var update = new DisplayUpdate(cm, viewport);
    if (updateDisplayIfNeeded(cm, update)) {
      updateHeightsInViewport(cm);
      postUpdateDisplay(cm, update);
      var barMeasure = measureForScrollbars(cm);
      updateSelection(cm);
      updateScrollbars(cm, barMeasure);
      setDocumentHeight(cm, barMeasure);
      update.finish();
    }
  }
  function patchDisplay(cm, updateNumbersFrom, dims) {
    var display = cm.display, lineNumbers = cm.options.lineNumbers;
    var container = display.lineDiv, cur = container.firstChild;
    function rm(node2) {
      var next = node2.nextSibling;
      if (webkit && mac && cm.display.currentWheelTarget == node2) {
        node2.style.display = "none";
      } else {
        node2.parentNode.removeChild(node2);
      }
      return next;
    }
    var view = display.view, lineN = display.viewFrom;
    for (var i2 = 0; i2 < view.length; i2++) {
      var lineView = view[i2];
      if (lineView.hidden) ;
      else if (!lineView.node || lineView.node.parentNode != container) {
        var node = buildLineElement(cm, lineView, lineN, dims);
        container.insertBefore(node, cur);
      } else {
        while (cur != lineView.node) {
          cur = rm(cur);
        }
        var updateNumber = lineNumbers && updateNumbersFrom != null && updateNumbersFrom <= lineN && lineView.lineNumber;
        if (lineView.changes) {
          if (indexOf(lineView.changes, "gutter") > -1) {
            updateNumber = false;
          }
          updateLineForChanges(cm, lineView, lineN, dims);
        }
        if (updateNumber) {
          removeChildren(lineView.lineNumber);
          lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)));
        }
        cur = lineView.node.nextSibling;
      }
      lineN += lineView.size;
    }
    while (cur) {
      cur = rm(cur);
    }
  }
  function updateGutterSpace(display) {
    var width = display.gutters.offsetWidth;
    display.sizer.style.marginLeft = width + "px";
    signalLater(display, "gutterChanged", display);
  }
  function setDocumentHeight(cm, measure) {
    cm.display.sizer.style.minHeight = measure.docHeight + "px";
    cm.display.heightForcer.style.top = measure.docHeight + "px";
    cm.display.gutters.style.height = measure.docHeight + cm.display.barHeight + scrollGap(cm) + "px";
  }
  function alignHorizontally(cm) {
    var display = cm.display, view = display.view;
    if (!display.alignWidgets && (!display.gutters.firstChild || !cm.options.fixedGutter)) {
      return;
    }
    var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft;
    var gutterW = display.gutters.offsetWidth, left = comp + "px";
    for (var i2 = 0; i2 < view.length; i2++) {
      if (!view[i2].hidden) {
        if (cm.options.fixedGutter) {
          if (view[i2].gutter) {
            view[i2].gutter.style.left = left;
          }
          if (view[i2].gutterBackground) {
            view[i2].gutterBackground.style.left = left;
          }
        }
        var align = view[i2].alignable;
        if (align) {
          for (var j = 0; j < align.length; j++) {
            align[j].style.left = left;
          }
        }
      }
    }
    if (cm.options.fixedGutter) {
      display.gutters.style.left = comp + gutterW + "px";
    }
  }
  function maybeUpdateLineNumberWidth(cm) {
    if (!cm.options.lineNumbers) {
      return false;
    }
    var doc2 = cm.doc, last = lineNumberFor(cm.options, doc2.first + doc2.size - 1), display = cm.display;
    if (last.length != display.lineNumChars) {
      var test = display.measure.appendChild(elt(
        "div",
        [elt("div", last)],
        "CodeMirror-linenumber CodeMirror-gutter-elt"
      ));
      var innerW = test.firstChild.offsetWidth, padding = test.offsetWidth - innerW;
      display.lineGutter.style.width = "";
      display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding) + 1;
      display.lineNumWidth = display.lineNumInnerWidth + padding;
      display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
      display.lineGutter.style.width = display.lineNumWidth + "px";
      updateGutterSpace(cm.display);
      return true;
    }
    return false;
  }
  function getGutters(gutters, lineNumbers) {
    var result = [], sawLineNumbers = false;
    for (var i2 = 0; i2 < gutters.length; i2++) {
      var name = gutters[i2], style = null;
      if (typeof name != "string") {
        style = name.style;
        name = name.className;
      }
      if (name == "CodeMirror-linenumbers") {
        if (!lineNumbers) {
          continue;
        } else {
          sawLineNumbers = true;
        }
      }
      result.push({ className: name, style });
    }
    if (lineNumbers && !sawLineNumbers) {
      result.push({ className: "CodeMirror-linenumbers", style: null });
    }
    return result;
  }
  function renderGutters(display) {
    var gutters = display.gutters, specs = display.gutterSpecs;
    removeChildren(gutters);
    display.lineGutter = null;
    for (var i2 = 0; i2 < specs.length; ++i2) {
      var ref = specs[i2];
      var className = ref.className;
      var style = ref.style;
      var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + className));
      if (style) {
        gElt.style.cssText = style;
      }
      if (className == "CodeMirror-linenumbers") {
        display.lineGutter = gElt;
        gElt.style.width = (display.lineNumWidth || 1) + "px";
      }
    }
    gutters.style.display = specs.length ? "" : "none";
    updateGutterSpace(display);
  }
  function updateGutters(cm) {
    renderGutters(cm.display);
    regChange(cm);
    alignHorizontally(cm);
  }
  function Display(place, doc2, input, options) {
    var d = this;
    this.input = input;
    d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
    d.scrollbarFiller.setAttribute("cm-not-content", "true");
    d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
    d.gutterFiller.setAttribute("cm-not-content", "true");
    d.lineDiv = eltP("div", null, "CodeMirror-code");
    d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
    d.cursorDiv = elt("div", null, "CodeMirror-cursors");
    d.measure = elt("div", null, "CodeMirror-measure");
    d.lineMeasure = elt("div", null, "CodeMirror-measure");
    d.lineSpace = eltP(
      "div",
      [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv],
      null,
      "position: relative; outline: none"
    );
    var lines = eltP("div", [d.lineSpace], "CodeMirror-lines");
    d.mover = elt("div", [lines], null, "position: relative");
    d.sizer = elt("div", [d.mover], "CodeMirror-sizer");
    d.sizerWidth = null;
    d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerGap + "px; width: 1px;");
    d.gutters = elt("div", null, "CodeMirror-gutters");
    d.lineGutter = null;
    d.scroller = elt("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
    d.scroller.setAttribute("tabIndex", "-1");
    d.wrapper = elt("div", [d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");
    if (chrome && chrome_version === 105) {
      d.wrapper.style.clipPath = "inset(0px)";
    }
    d.wrapper.setAttribute("translate", "no");
    if (ie && ie_version < 8) {
      d.gutters.style.zIndex = -1;
      d.scroller.style.paddingRight = 0;
    }
    if (!webkit && !(gecko && mobile)) {
      d.scroller.draggable = true;
    }
    if (place) {
      if (place.appendChild) {
        place.appendChild(d.wrapper);
      } else {
        place(d.wrapper);
      }
    }
    d.viewFrom = d.viewTo = doc2.first;
    d.reportedViewFrom = d.reportedViewTo = doc2.first;
    d.view = [];
    d.renderedView = null;
    d.externalMeasured = null;
    d.viewOffset = 0;
    d.lastWrapHeight = d.lastWrapWidth = 0;
    d.updateLineNumbers = null;
    d.nativeBarWidth = d.barHeight = d.barWidth = 0;
    d.scrollbarsClipped = false;
    d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
    d.alignWidgets = false;
    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
    d.maxLine = null;
    d.maxLineLength = 0;
    d.maxLineChanged = false;
    d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;
    d.shift = false;
    d.selForContextMenu = null;
    d.activeTouch = null;
    d.gutterSpecs = getGutters(options.gutters, options.lineNumbers);
    renderGutters(d);
    input.init(d);
  }
  var wheelSamples = 0, wheelPixelsPerUnit = null;
  if (ie) {
    wheelPixelsPerUnit = -0.53;
  } else if (gecko) {
    wheelPixelsPerUnit = 15;
  } else if (chrome) {
    wheelPixelsPerUnit = -0.7;
  } else if (safari) {
    wheelPixelsPerUnit = -1 / 3;
  }
  function wheelEventDelta(e) {
    var dx = e.wheelDeltaX, dy = e.wheelDeltaY;
    if (dx == null && e.detail && e.axis == e.HORIZONTAL_AXIS) {
      dx = e.detail;
    }
    if (dy == null && e.detail && e.axis == e.VERTICAL_AXIS) {
      dy = e.detail;
    } else if (dy == null) {
      dy = e.wheelDelta;
    }
    return { x: dx, y: dy };
  }
  function wheelEventPixels(e) {
    var delta = wheelEventDelta(e);
    delta.x *= wheelPixelsPerUnit;
    delta.y *= wheelPixelsPerUnit;
    return delta;
  }
  function onScrollWheel(cm, e) {
    if (chrome && chrome_version == 102) {
      if (cm.display.chromeScrollHack == null) {
        cm.display.sizer.style.pointerEvents = "none";
      } else {
        clearTimeout(cm.display.chromeScrollHack);
      }
      cm.display.chromeScrollHack = setTimeout(function() {
        cm.display.chromeScrollHack = null;
        cm.display.sizer.style.pointerEvents = "";
      }, 100);
    }
    var delta = wheelEventDelta(e), dx = delta.x, dy = delta.y;
    var pixelsPerUnit = wheelPixelsPerUnit;
    if (e.deltaMode === 0) {
      dx = e.deltaX;
      dy = e.deltaY;
      pixelsPerUnit = 1;
    }
    var display = cm.display, scroll = display.scroller;
    var canScrollX = scroll.scrollWidth > scroll.clientWidth;
    var canScrollY = scroll.scrollHeight > scroll.clientHeight;
    if (!(dx && canScrollX || dy && canScrollY)) {
      return;
    }
    if (dy && mac && webkit) {
      outer: for (var cur = e.target, view = display.view; cur != scroll; cur = cur.parentNode) {
        for (var i2 = 0; i2 < view.length; i2++) {
          if (view[i2].node == cur) {
            cm.display.currentWheelTarget = cur;
            break outer;
          }
        }
      }
    }
    if (dx && !gecko && !presto && pixelsPerUnit != null) {
      if (dy && canScrollY) {
        updateScrollTop(cm, Math.max(0, scroll.scrollTop + dy * pixelsPerUnit));
      }
      setScrollLeft(cm, Math.max(0, scroll.scrollLeft + dx * pixelsPerUnit));
      if (!dy || dy && canScrollY) {
        e_preventDefault(e);
      }
      display.wheelStartX = null;
      return;
    }
    if (dy && pixelsPerUnit != null) {
      var pixels = dy * pixelsPerUnit;
      var top = cm.doc.scrollTop, bot = top + display.wrapper.clientHeight;
      if (pixels < 0) {
        top = Math.max(0, top + pixels - 50);
      } else {
        bot = Math.min(cm.doc.height, bot + pixels + 50);
      }
      updateDisplaySimple(cm, { top, bottom: bot });
    }
    if (wheelSamples < 20 && e.deltaMode !== 0) {
      if (display.wheelStartX == null) {
        display.wheelStartX = scroll.scrollLeft;
        display.wheelStartY = scroll.scrollTop;
        display.wheelDX = dx;
        display.wheelDY = dy;
        setTimeout(function() {
          if (display.wheelStartX == null) {
            return;
          }
          var movedX = scroll.scrollLeft - display.wheelStartX;
          var movedY = scroll.scrollTop - display.wheelStartY;
          var sample = movedY && display.wheelDY && movedY / display.wheelDY || movedX && display.wheelDX && movedX / display.wheelDX;
          display.wheelStartX = display.wheelStartY = null;
          if (!sample) {
            return;
          }
          wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
          ++wheelSamples;
        }, 200);
      } else {
        display.wheelDX += dx;
        display.wheelDY += dy;
      }
    }
  }
  var Selection = function(ranges, primIndex) {
    this.ranges = ranges;
    this.primIndex = primIndex;
  };
  Selection.prototype.primary = function() {
    return this.ranges[this.primIndex];
  };
  Selection.prototype.equals = function(other) {
    if (other == this) {
      return true;
    }
    if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) {
      return false;
    }
    for (var i2 = 0; i2 < this.ranges.length; i2++) {
      var here = this.ranges[i2], there = other.ranges[i2];
      if (!equalCursorPos(here.anchor, there.anchor) || !equalCursorPos(here.head, there.head)) {
        return false;
      }
    }
    return true;
  };
  Selection.prototype.deepCopy = function() {
    var out = [];
    for (var i2 = 0; i2 < this.ranges.length; i2++) {
      out[i2] = new Range(copyPos(this.ranges[i2].anchor), copyPos(this.ranges[i2].head));
    }
    return new Selection(out, this.primIndex);
  };
  Selection.prototype.somethingSelected = function() {
    for (var i2 = 0; i2 < this.ranges.length; i2++) {
      if (!this.ranges[i2].empty()) {
        return true;
      }
    }
    return false;
  };
  Selection.prototype.contains = function(pos, end) {
    if (!end) {
      end = pos;
    }
    for (var i2 = 0; i2 < this.ranges.length; i2++) {
      var range2 = this.ranges[i2];
      if (cmp(end, range2.from()) >= 0 && cmp(pos, range2.to()) <= 0) {
        return i2;
      }
    }
    return -1;
  };
  var Range = function(anchor, head) {
    this.anchor = anchor;
    this.head = head;
  };
  Range.prototype.from = function() {
    return minPos(this.anchor, this.head);
  };
  Range.prototype.to = function() {
    return maxPos(this.anchor, this.head);
  };
  Range.prototype.empty = function() {
    return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
  };
  function normalizeSelection(cm, ranges, primIndex) {
    var mayTouch = cm && cm.options.selectionsMayTouch;
    var prim = ranges[primIndex];
    ranges.sort(function(a, b) {
      return cmp(a.from(), b.from());
    });
    primIndex = indexOf(ranges, prim);
    for (var i2 = 1; i2 < ranges.length; i2++) {
      var cur = ranges[i2], prev = ranges[i2 - 1];
      var diff = cmp(prev.to(), cur.from());
      if (mayTouch && !cur.empty() ? diff > 0 : diff >= 0) {
        var from = minPos(prev.from(), cur.from()), to = maxPos(prev.to(), cur.to());
        var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
        if (i2 <= primIndex) {
          --primIndex;
        }
        ranges.splice(--i2, 2, new Range(inv ? to : from, inv ? from : to));
      }
    }
    return new Selection(ranges, primIndex);
  }
  function simpleSelection(anchor, head) {
    return new Selection([new Range(anchor, head || anchor)], 0);
  }
  function changeEnd(change) {
    if (!change.text) {
      return change.to;
    }
    return Pos(
      change.from.line + change.text.length - 1,
      lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0)
    );
  }
  function adjustForChange(pos, change) {
    if (cmp(pos, change.from) < 0) {
      return pos;
    }
    if (cmp(pos, change.to) <= 0) {
      return changeEnd(change);
    }
    var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1, ch = pos.ch;
    if (pos.line == change.to.line) {
      ch += changeEnd(change).ch - change.to.ch;
    }
    return Pos(line, ch);
  }
  function computeSelAfterChange(doc2, change) {
    var out = [];
    for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
      var range2 = doc2.sel.ranges[i2];
      out.push(new Range(
        adjustForChange(range2.anchor, change),
        adjustForChange(range2.head, change)
      ));
    }
    return normalizeSelection(doc2.cm, out, doc2.sel.primIndex);
  }
  function offsetPos(pos, old, nw) {
    if (pos.line == old.line) {
      return Pos(nw.line, pos.ch - old.ch + nw.ch);
    } else {
      return Pos(nw.line + (pos.line - old.line), pos.ch);
    }
  }
  function computeReplacedSel(doc2, changes, hint) {
    var out = [];
    var oldPrev = Pos(doc2.first, 0), newPrev = oldPrev;
    for (var i2 = 0; i2 < changes.length; i2++) {
      var change = changes[i2];
      var from = offsetPos(change.from, oldPrev, newPrev);
      var to = offsetPos(changeEnd(change), oldPrev, newPrev);
      oldPrev = change.to;
      newPrev = to;
      if (hint == "around") {
        var range2 = doc2.sel.ranges[i2], inv = cmp(range2.head, range2.anchor) < 0;
        out[i2] = new Range(inv ? to : from, inv ? from : to);
      } else {
        out[i2] = new Range(from, from);
      }
    }
    return new Selection(out, doc2.sel.primIndex);
  }
  function loadMode(cm) {
    cm.doc.mode = getMode(cm.options, cm.doc.modeOption);
    resetModeState(cm);
  }
  function resetModeState(cm) {
    cm.doc.iter(function(line) {
      if (line.stateAfter) {
        line.stateAfter = null;
      }
      if (line.styles) {
        line.styles = null;
      }
    });
    cm.doc.modeFrontier = cm.doc.highlightFrontier = cm.doc.first;
    startWorker(cm, 100);
    cm.state.modeGen++;
    if (cm.curOp) {
      regChange(cm);
    }
  }
  function isWholeLineUpdate(doc2, change) {
    return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" && (!doc2.cm || doc2.cm.options.wholeLineUpdateBefore);
  }
  function updateDoc(doc2, change, markedSpans, estimateHeight2) {
    function spansFor(n) {
      return markedSpans ? markedSpans[n] : null;
    }
    function update(line, text2, spans) {
      updateLine(line, text2, spans, estimateHeight2);
      signalLater(line, "change", line, change);
    }
    function linesFor(start, end) {
      var result = [];
      for (var i2 = start; i2 < end; ++i2) {
        result.push(new Line(text[i2], spansFor(i2), estimateHeight2));
      }
      return result;
    }
    var from = change.from, to = change.to, text = change.text;
    var firstLine = getLine(doc2, from.line), lastLine = getLine(doc2, to.line);
    var lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;
    if (change.full) {
      doc2.insert(0, linesFor(0, text.length));
      doc2.remove(text.length, doc2.size - text.length);
    } else if (isWholeLineUpdate(doc2, change)) {
      var added = linesFor(0, text.length - 1);
      update(lastLine, lastLine.text, lastSpans);
      if (nlines) {
        doc2.remove(from.line, nlines);
      }
      if (added.length) {
        doc2.insert(from.line, added);
      }
    } else if (firstLine == lastLine) {
      if (text.length == 1) {
        update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
      } else {
        var added$1 = linesFor(1, text.length - 1);
        added$1.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight2));
        update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
        doc2.insert(from.line + 1, added$1);
      }
    } else if (text.length == 1) {
      update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
      doc2.remove(from.line + 1, nlines);
    } else {
      update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
      update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
      var added$2 = linesFor(1, text.length - 1);
      if (nlines > 1) {
        doc2.remove(from.line + 1, nlines - 1);
      }
      doc2.insert(from.line + 1, added$2);
    }
    signalLater(doc2, "change", doc2, change);
  }
  function linkedDocs(doc2, f, sharedHistOnly) {
    function propagate(doc3, skip, sharedHist) {
      if (doc3.linked) {
        for (var i2 = 0; i2 < doc3.linked.length; ++i2) {
          var rel = doc3.linked[i2];
          if (rel.doc == skip) {
            continue;
          }
          var shared = sharedHist && rel.sharedHist;
          if (sharedHistOnly && !shared) {
            continue;
          }
          f(rel.doc, shared);
          propagate(rel.doc, doc3, shared);
        }
      }
    }
    propagate(doc2, null, true);
  }
  function attachDoc(cm, doc2) {
    if (doc2.cm) {
      throw new Error("This document is already in use.");
    }
    cm.doc = doc2;
    doc2.cm = cm;
    estimateLineHeights(cm);
    loadMode(cm);
    setDirectionClass(cm);
    cm.options.direction = doc2.direction;
    if (!cm.options.lineWrapping) {
      findMaxLine(cm);
    }
    cm.options.mode = doc2.modeOption;
    regChange(cm);
  }
  function setDirectionClass(cm) {
    (cm.doc.direction == "rtl" ? addClass : rmClass)(cm.display.lineDiv, "CodeMirror-rtl");
  }
  function directionChanged(cm) {
    runInOp(cm, function() {
      setDirectionClass(cm);
      regChange(cm);
    });
  }
  function History(prev) {
    this.done = [];
    this.undone = [];
    this.undoDepth = prev ? prev.undoDepth : Infinity;
    this.lastModTime = this.lastSelTime = 0;
    this.lastOp = this.lastSelOp = null;
    this.lastOrigin = this.lastSelOrigin = null;
    this.generation = this.maxGeneration = prev ? prev.maxGeneration : 1;
  }
  function historyChangeFromChange(doc2, change) {
    var histChange = { from: copyPos(change.from), to: changeEnd(change), text: getBetween(doc2, change.from, change.to) };
    attachLocalSpans(doc2, histChange, change.from.line, change.to.line + 1);
    linkedDocs(doc2, function(doc3) {
      return attachLocalSpans(doc3, histChange, change.from.line, change.to.line + 1);
    }, true);
    return histChange;
  }
  function clearSelectionEvents(array) {
    while (array.length) {
      var last = lst(array);
      if (last.ranges) {
        array.pop();
      } else {
        break;
      }
    }
  }
  function lastChangeEvent(hist, force) {
    if (force) {
      clearSelectionEvents(hist.done);
      return lst(hist.done);
    } else if (hist.done.length && !lst(hist.done).ranges) {
      return lst(hist.done);
    } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
      hist.done.pop();
      return lst(hist.done);
    }
  }
  function addChangeToHistory(doc2, change, selAfter, opId) {
    var hist = doc2.history;
    hist.undone.length = 0;
    var time = +/* @__PURE__ */ new Date(), cur;
    var last;
    if ((hist.lastOp == opId || hist.lastOrigin == change.origin && change.origin && (change.origin.charAt(0) == "+" && hist.lastModTime > time - (doc2.cm ? doc2.cm.options.historyEventDelay : 500) || change.origin.charAt(0) == "*")) && (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
      last = lst(cur.changes);
      if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
        last.to = changeEnd(change);
      } else {
        cur.changes.push(historyChangeFromChange(doc2, change));
      }
    } else {
      var before = lst(hist.done);
      if (!before || !before.ranges) {
        pushSelectionToHistory(doc2.sel, hist.done);
      }
      cur = {
        changes: [historyChangeFromChange(doc2, change)],
        generation: hist.generation
      };
      hist.done.push(cur);
      while (hist.done.length > hist.undoDepth) {
        hist.done.shift();
        if (!hist.done[0].ranges) {
          hist.done.shift();
        }
      }
    }
    hist.done.push(selAfter);
    hist.generation = ++hist.maxGeneration;
    hist.lastModTime = hist.lastSelTime = time;
    hist.lastOp = hist.lastSelOp = opId;
    hist.lastOrigin = hist.lastSelOrigin = change.origin;
    if (!last) {
      signal(doc2, "historyAdded");
    }
  }
  function selectionEventCanBeMerged(doc2, origin, prev, sel) {
    var ch = origin.charAt(0);
    return ch == "*" || ch == "+" && prev.ranges.length == sel.ranges.length && prev.somethingSelected() == sel.somethingSelected() && /* @__PURE__ */ new Date() - doc2.history.lastSelTime <= (doc2.cm ? doc2.cm.options.historyEventDelay : 500);
  }
  function addSelectionToHistory(doc2, sel, opId, options) {
    var hist = doc2.history, origin = options && options.origin;
    if (opId == hist.lastSelOp || origin && hist.lastSelOrigin == origin && (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin || selectionEventCanBeMerged(doc2, origin, lst(hist.done), sel))) {
      hist.done[hist.done.length - 1] = sel;
    } else {
      pushSelectionToHistory(sel, hist.done);
    }
    hist.lastSelTime = +/* @__PURE__ */ new Date();
    hist.lastSelOrigin = origin;
    hist.lastSelOp = opId;
    if (options && options.clearRedo !== false) {
      clearSelectionEvents(hist.undone);
    }
  }
  function pushSelectionToHistory(sel, dest) {
    var top = lst(dest);
    if (!(top && top.ranges && top.equals(sel))) {
      dest.push(sel);
    }
  }
  function attachLocalSpans(doc2, change, from, to) {
    var existing = change["spans_" + doc2.id], n = 0;
    doc2.iter(Math.max(doc2.first, from), Math.min(doc2.first + doc2.size, to), function(line) {
      if (line.markedSpans) {
        (existing || (existing = change["spans_" + doc2.id] = {}))[n] = line.markedSpans;
      }
      ++n;
    });
  }
  function removeClearedSpans(spans) {
    if (!spans) {
      return null;
    }
    var out;
    for (var i2 = 0; i2 < spans.length; ++i2) {
      if (spans[i2].marker.explicitlyCleared) {
        if (!out) {
          out = spans.slice(0, i2);
        }
      } else if (out) {
        out.push(spans[i2]);
      }
    }
    return !out ? spans : out.length ? out : null;
  }
  function getOldSpans(doc2, change) {
    var found = change["spans_" + doc2.id];
    if (!found) {
      return null;
    }
    var nw = [];
    for (var i2 = 0; i2 < change.text.length; ++i2) {
      nw.push(removeClearedSpans(found[i2]));
    }
    return nw;
  }
  function mergeOldSpans(doc2, change) {
    var old = getOldSpans(doc2, change);
    var stretched = stretchSpansOverChange(doc2, change);
    if (!old) {
      return stretched;
    }
    if (!stretched) {
      return old;
    }
    for (var i2 = 0; i2 < old.length; ++i2) {
      var oldCur = old[i2], stretchCur = stretched[i2];
      if (oldCur && stretchCur) {
        spans: for (var j = 0; j < stretchCur.length; ++j) {
          var span = stretchCur[j];
          for (var k = 0; k < oldCur.length; ++k) {
            if (oldCur[k].marker == span.marker) {
              continue spans;
            }
          }
          oldCur.push(span);
        }
      } else if (stretchCur) {
        old[i2] = stretchCur;
      }
    }
    return old;
  }
  function copyHistoryArray(events, newGroup, instantiateSel) {
    var copy = [];
    for (var i2 = 0; i2 < events.length; ++i2) {
      var event = events[i2];
      if (event.ranges) {
        copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
        continue;
      }
      var changes = event.changes, newChanges = [];
      copy.push({ changes: newChanges });
      for (var j = 0; j < changes.length; ++j) {
        var change = changes[j], m = void 0;
        newChanges.push({ from: change.from, to: change.to, text: change.text });
        if (newGroup) {
          for (var prop2 in change) {
            if (m = prop2.match(/^spans_(\d+)$/)) {
              if (indexOf(newGroup, Number(m[1])) > -1) {
                lst(newChanges)[prop2] = change[prop2];
                delete change[prop2];
              }
            }
          }
        }
      }
    }
    return copy;
  }
  function extendRange(range2, head, other, extend) {
    if (extend) {
      var anchor = range2.anchor;
      if (other) {
        var posBefore = cmp(head, anchor) < 0;
        if (posBefore != cmp(other, anchor) < 0) {
          anchor = head;
          head = other;
        } else if (posBefore != cmp(head, other) < 0) {
          head = other;
        }
      }
      return new Range(anchor, head);
    } else {
      return new Range(other || head, head);
    }
  }
  function extendSelection(doc2, head, other, options, extend) {
    if (extend == null) {
      extend = doc2.cm && (doc2.cm.display.shift || doc2.extend);
    }
    setSelection(doc2, new Selection([extendRange(doc2.sel.primary(), head, other, extend)], 0), options);
  }
  function extendSelections(doc2, heads, options) {
    var out = [];
    var extend = doc2.cm && (doc2.cm.display.shift || doc2.extend);
    for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
      out[i2] = extendRange(doc2.sel.ranges[i2], heads[i2], null, extend);
    }
    var newSel = normalizeSelection(doc2.cm, out, doc2.sel.primIndex);
    setSelection(doc2, newSel, options);
  }
  function replaceOneSelection(doc2, i2, range2, options) {
    var ranges = doc2.sel.ranges.slice(0);
    ranges[i2] = range2;
    setSelection(doc2, normalizeSelection(doc2.cm, ranges, doc2.sel.primIndex), options);
  }
  function setSimpleSelection(doc2, anchor, head, options) {
    setSelection(doc2, simpleSelection(anchor, head), options);
  }
  function filterSelectionChange(doc2, sel, options) {
    var obj = {
      ranges: sel.ranges,
      update: function(ranges) {
        this.ranges = [];
        for (var i2 = 0; i2 < ranges.length; i2++) {
          this.ranges[i2] = new Range(
            clipPos(doc2, ranges[i2].anchor),
            clipPos(doc2, ranges[i2].head)
          );
        }
      },
      origin: options && options.origin
    };
    signal(doc2, "beforeSelectionChange", doc2, obj);
    if (doc2.cm) {
      signal(doc2.cm, "beforeSelectionChange", doc2.cm, obj);
    }
    if (obj.ranges != sel.ranges) {
      return normalizeSelection(doc2.cm, obj.ranges, obj.ranges.length - 1);
    } else {
      return sel;
    }
  }
  function setSelectionReplaceHistory(doc2, sel, options) {
    var done = doc2.history.done, last = lst(done);
    if (last && last.ranges) {
      done[done.length - 1] = sel;
      setSelectionNoUndo(doc2, sel, options);
    } else {
      setSelection(doc2, sel, options);
    }
  }
  function setSelection(doc2, sel, options) {
    setSelectionNoUndo(doc2, sel, options);
    addSelectionToHistory(doc2, doc2.sel, doc2.cm ? doc2.cm.curOp.id : NaN, options);
  }
  function setSelectionNoUndo(doc2, sel, options) {
    if (hasHandler(doc2, "beforeSelectionChange") || doc2.cm && hasHandler(doc2.cm, "beforeSelectionChange")) {
      sel = filterSelectionChange(doc2, sel, options);
    }
    var bias = options && options.bias || (cmp(sel.primary().head, doc2.sel.primary().head) < 0 ? -1 : 1);
    setSelectionInner(doc2, skipAtomicInSelection(doc2, sel, bias, true));
    if (!(options && options.scroll === false) && doc2.cm && doc2.cm.getOption("readOnly") != "nocursor") {
      ensureCursorVisible(doc2.cm);
    }
  }
  function setSelectionInner(doc2, sel) {
    if (sel.equals(doc2.sel)) {
      return;
    }
    doc2.sel = sel;
    if (doc2.cm) {
      doc2.cm.curOp.updateInput = 1;
      doc2.cm.curOp.selectionChanged = true;
      signalCursorActivity(doc2.cm);
    }
    signalLater(doc2, "cursorActivity", doc2);
  }
  function reCheckSelection(doc2) {
    setSelectionInner(doc2, skipAtomicInSelection(doc2, doc2.sel, null, false));
  }
  function skipAtomicInSelection(doc2, sel, bias, mayClear) {
    var out;
    for (var i2 = 0; i2 < sel.ranges.length; i2++) {
      var range2 = sel.ranges[i2];
      var old = sel.ranges.length == doc2.sel.ranges.length && doc2.sel.ranges[i2];
      var newAnchor = skipAtomic(doc2, range2.anchor, old && old.anchor, bias, mayClear);
      var newHead = range2.head == range2.anchor ? newAnchor : skipAtomic(doc2, range2.head, old && old.head, bias, mayClear);
      if (out || newAnchor != range2.anchor || newHead != range2.head) {
        if (!out) {
          out = sel.ranges.slice(0, i2);
        }
        out[i2] = new Range(newAnchor, newHead);
      }
    }
    return out ? normalizeSelection(doc2.cm, out, sel.primIndex) : sel;
  }
  function skipAtomicInner(doc2, pos, oldPos, dir, mayClear) {
    var line = getLine(doc2, pos.line);
    if (line.markedSpans) {
      for (var i2 = 0; i2 < line.markedSpans.length; ++i2) {
        var sp = line.markedSpans[i2], m = sp.marker;
        var preventCursorLeft = "selectLeft" in m ? !m.selectLeft : m.inclusiveLeft;
        var preventCursorRight = "selectRight" in m ? !m.selectRight : m.inclusiveRight;
        if ((sp.from == null || (preventCursorLeft ? sp.from <= pos.ch : sp.from < pos.ch)) && (sp.to == null || (preventCursorRight ? sp.to >= pos.ch : sp.to > pos.ch))) {
          if (mayClear) {
            signal(m, "beforeCursorEnter");
            if (m.explicitlyCleared) {
              if (!line.markedSpans) {
                break;
              } else {
                --i2;
                continue;
              }
            }
          }
          if (!m.atomic) {
            continue;
          }
          if (oldPos) {
            var near = m.find(dir < 0 ? 1 : -1), diff = void 0;
            if (dir < 0 ? preventCursorRight : preventCursorLeft) {
              near = movePos(doc2, near, -dir, near && near.line == pos.line ? line : null);
            }
            if (near && near.line == pos.line && (diff = cmp(near, oldPos)) && (dir < 0 ? diff < 0 : diff > 0)) {
              return skipAtomicInner(doc2, near, pos, dir, mayClear);
            }
          }
          var far = m.find(dir < 0 ? -1 : 1);
          if (dir < 0 ? preventCursorLeft : preventCursorRight) {
            far = movePos(doc2, far, dir, far.line == pos.line ? line : null);
          }
          return far ? skipAtomicInner(doc2, far, pos, dir, mayClear) : null;
        }
      }
    }
    return pos;
  }
  function skipAtomic(doc2, pos, oldPos, bias, mayClear) {
    var dir = bias || 1;
    var found = skipAtomicInner(doc2, pos, oldPos, dir, mayClear) || !mayClear && skipAtomicInner(doc2, pos, oldPos, dir, true) || skipAtomicInner(doc2, pos, oldPos, -dir, mayClear) || !mayClear && skipAtomicInner(doc2, pos, oldPos, -dir, true);
    if (!found) {
      doc2.cantEdit = true;
      return Pos(doc2.first, 0);
    }
    return found;
  }
  function movePos(doc2, pos, dir, line) {
    if (dir < 0 && pos.ch == 0) {
      if (pos.line > doc2.first) {
        return clipPos(doc2, Pos(pos.line - 1));
      } else {
        return null;
      }
    } else if (dir > 0 && pos.ch == (line || getLine(doc2, pos.line)).text.length) {
      if (pos.line < doc2.first + doc2.size - 1) {
        return Pos(pos.line + 1, 0);
      } else {
        return null;
      }
    } else {
      return new Pos(pos.line, pos.ch + dir);
    }
  }
  function selectAll(cm) {
    cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll);
  }
  function filterChange(doc2, change, update) {
    var obj = {
      canceled: false,
      from: change.from,
      to: change.to,
      text: change.text,
      origin: change.origin,
      cancel: function() {
        return obj.canceled = true;
      }
    };
    if (update) {
      obj.update = function(from, to, text, origin) {
        if (from) {
          obj.from = clipPos(doc2, from);
        }
        if (to) {
          obj.to = clipPos(doc2, to);
        }
        if (text) {
          obj.text = text;
        }
        if (origin !== void 0) {
          obj.origin = origin;
        }
      };
    }
    signal(doc2, "beforeChange", doc2, obj);
    if (doc2.cm) {
      signal(doc2.cm, "beforeChange", doc2.cm, obj);
    }
    if (obj.canceled) {
      if (doc2.cm) {
        doc2.cm.curOp.updateInput = 2;
      }
      return null;
    }
    return { from: obj.from, to: obj.to, text: obj.text, origin: obj.origin };
  }
  function makeChange(doc2, change, ignoreReadOnly) {
    if (doc2.cm) {
      if (!doc2.cm.curOp) {
        return operation(doc2.cm, makeChange)(doc2, change, ignoreReadOnly);
      }
      if (doc2.cm.state.suppressEdits) {
        return;
      }
    }
    if (hasHandler(doc2, "beforeChange") || doc2.cm && hasHandler(doc2.cm, "beforeChange")) {
      change = filterChange(doc2, change, true);
      if (!change) {
        return;
      }
    }
    var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc2, change.from, change.to);
    if (split) {
      for (var i2 = split.length - 1; i2 >= 0; --i2) {
        makeChangeInner(doc2, { from: split[i2].from, to: split[i2].to, text: i2 ? [""] : change.text, origin: change.origin });
      }
    } else {
      makeChangeInner(doc2, change);
    }
  }
  function makeChangeInner(doc2, change) {
    if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0) {
      return;
    }
    var selAfter = computeSelAfterChange(doc2, change);
    addChangeToHistory(doc2, change, selAfter, doc2.cm ? doc2.cm.curOp.id : NaN);
    makeChangeSingleDoc(doc2, change, selAfter, stretchSpansOverChange(doc2, change));
    var rebased = [];
    linkedDocs(doc2, function(doc3, sharedHist) {
      if (!sharedHist && indexOf(rebased, doc3.history) == -1) {
        rebaseHist(doc3.history, change);
        rebased.push(doc3.history);
      }
      makeChangeSingleDoc(doc3, change, null, stretchSpansOverChange(doc3, change));
    });
  }
  function makeChangeFromHistory(doc2, type, allowSelectionOnly) {
    var suppress = doc2.cm && doc2.cm.state.suppressEdits;
    if (suppress && !allowSelectionOnly) {
      return;
    }
    var hist = doc2.history, event, selAfter = doc2.sel;
    var source = type == "undo" ? hist.done : hist.undone, dest = type == "undo" ? hist.undone : hist.done;
    var i2 = 0;
    for (; i2 < source.length; i2++) {
      event = source[i2];
      if (allowSelectionOnly ? event.ranges && !event.equals(doc2.sel) : !event.ranges) {
        break;
      }
    }
    if (i2 == source.length) {
      return;
    }
    hist.lastOrigin = hist.lastSelOrigin = null;
    for (; ; ) {
      event = source.pop();
      if (event.ranges) {
        pushSelectionToHistory(event, dest);
        if (allowSelectionOnly && !event.equals(doc2.sel)) {
          setSelection(doc2, event, { clearRedo: false });
          return;
        }
        selAfter = event;
      } else if (suppress) {
        source.push(event);
        return;
      } else {
        break;
      }
    }
    var antiChanges = [];
    pushSelectionToHistory(selAfter, dest);
    dest.push({ changes: antiChanges, generation: hist.generation });
    hist.generation = event.generation || ++hist.maxGeneration;
    var filter = hasHandler(doc2, "beforeChange") || doc2.cm && hasHandler(doc2.cm, "beforeChange");
    var loop = function(i3) {
      var change = event.changes[i3];
      change.origin = type;
      if (filter && !filterChange(doc2, change, false)) {
        source.length = 0;
        return {};
      }
      antiChanges.push(historyChangeFromChange(doc2, change));
      var after = i3 ? computeSelAfterChange(doc2, change) : lst(source);
      makeChangeSingleDoc(doc2, change, after, mergeOldSpans(doc2, change));
      if (!i3 && doc2.cm) {
        doc2.cm.scrollIntoView({ from: change.from, to: changeEnd(change) });
      }
      var rebased = [];
      linkedDocs(doc2, function(doc3, sharedHist) {
        if (!sharedHist && indexOf(rebased, doc3.history) == -1) {
          rebaseHist(doc3.history, change);
          rebased.push(doc3.history);
        }
        makeChangeSingleDoc(doc3, change, null, mergeOldSpans(doc3, change));
      });
    };
    for (var i$12 = event.changes.length - 1; i$12 >= 0; --i$12) {
      var returned = loop(i$12);
      if (returned) return returned.v;
    }
  }
  function shiftDoc(doc2, distance) {
    if (distance == 0) {
      return;
    }
    doc2.first += distance;
    doc2.sel = new Selection(map(doc2.sel.ranges, function(range2) {
      return new Range(
        Pos(range2.anchor.line + distance, range2.anchor.ch),
        Pos(range2.head.line + distance, range2.head.ch)
      );
    }), doc2.sel.primIndex);
    if (doc2.cm) {
      regChange(doc2.cm, doc2.first, doc2.first - distance, distance);
      for (var d = doc2.cm.display, l = d.viewFrom; l < d.viewTo; l++) {
        regLineChange(doc2.cm, l, "gutter");
      }
    }
  }
  function makeChangeSingleDoc(doc2, change, selAfter, spans) {
    if (doc2.cm && !doc2.cm.curOp) {
      return operation(doc2.cm, makeChangeSingleDoc)(doc2, change, selAfter, spans);
    }
    if (change.to.line < doc2.first) {
      shiftDoc(doc2, change.text.length - 1 - (change.to.line - change.from.line));
      return;
    }
    if (change.from.line > doc2.lastLine()) {
      return;
    }
    if (change.from.line < doc2.first) {
      var shift = change.text.length - 1 - (doc2.first - change.from.line);
      shiftDoc(doc2, shift);
      change = {
        from: Pos(doc2.first, 0),
        to: Pos(change.to.line + shift, change.to.ch),
        text: [lst(change.text)],
        origin: change.origin
      };
    }
    var last = doc2.lastLine();
    if (change.to.line > last) {
      change = {
        from: change.from,
        to: Pos(last, getLine(doc2, last).text.length),
        text: [change.text[0]],
        origin: change.origin
      };
    }
    change.removed = getBetween(doc2, change.from, change.to);
    if (!selAfter) {
      selAfter = computeSelAfterChange(doc2, change);
    }
    if (doc2.cm) {
      makeChangeSingleDocInEditor(doc2.cm, change, spans);
    } else {
      updateDoc(doc2, change, spans);
    }
    setSelectionNoUndo(doc2, selAfter, sel_dontScroll);
    if (doc2.cantEdit && skipAtomic(doc2, Pos(doc2.firstLine(), 0))) {
      doc2.cantEdit = false;
    }
  }
  function makeChangeSingleDocInEditor(cm, change, spans) {
    var doc2 = cm.doc, display = cm.display, from = change.from, to = change.to;
    var recomputeMaxLength = false, checkWidthStart = from.line;
    if (!cm.options.lineWrapping) {
      checkWidthStart = lineNo(visualLine(getLine(doc2, from.line)));
      doc2.iter(checkWidthStart, to.line + 1, function(line) {
        if (line == display.maxLine) {
          recomputeMaxLength = true;
          return true;
        }
      });
    }
    if (doc2.sel.contains(change.from, change.to) > -1) {
      signalCursorActivity(cm);
    }
    updateDoc(doc2, change, spans, estimateHeight(cm));
    if (!cm.options.lineWrapping) {
      doc2.iter(checkWidthStart, from.line + change.text.length, function(line) {
        var len = lineLength(line);
        if (len > display.maxLineLength) {
          display.maxLine = line;
          display.maxLineLength = len;
          display.maxLineChanged = true;
          recomputeMaxLength = false;
        }
      });
      if (recomputeMaxLength) {
        cm.curOp.updateMaxLine = true;
      }
    }
    retreatFrontier(doc2, from.line);
    startWorker(cm, 400);
    var lendiff = change.text.length - (to.line - from.line) - 1;
    if (change.full) {
      regChange(cm);
    } else if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm.doc, change)) {
      regLineChange(cm, from.line, "text");
    } else {
      regChange(cm, from.line, to.line + 1, lendiff);
    }
    var changesHandler = hasHandler(cm, "changes"), changeHandler = hasHandler(cm, "change");
    if (changeHandler || changesHandler) {
      var obj = {
        from,
        to,
        text: change.text,
        removed: change.removed,
        origin: change.origin
      };
      if (changeHandler) {
        signalLater(cm, "change", cm, obj);
      }
      if (changesHandler) {
        (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push(obj);
      }
    }
    cm.display.selForContextMenu = null;
  }
  function replaceRange(doc2, code, from, to, origin) {
    var assign;
    if (!to) {
      to = from;
    }
    if (cmp(to, from) < 0) {
      assign = [to, from], from = assign[0], to = assign[1];
    }
    if (typeof code == "string") {
      code = doc2.splitLines(code);
    }
    makeChange(doc2, { from, to, text: code, origin });
  }
  function rebaseHistSelSingle(pos, from, to, diff) {
    if (to < pos.line) {
      pos.line += diff;
    } else if (from < pos.line) {
      pos.line = from;
      pos.ch = 0;
    }
  }
  function rebaseHistArray(array, from, to, diff) {
    for (var i2 = 0; i2 < array.length; ++i2) {
      var sub = array[i2], ok = true;
      if (sub.ranges) {
        if (!sub.copied) {
          sub = array[i2] = sub.deepCopy();
          sub.copied = true;
        }
        for (var j = 0; j < sub.ranges.length; j++) {
          rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
          rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
        }
        continue;
      }
      for (var j$1 = 0; j$1 < sub.changes.length; ++j$1) {
        var cur = sub.changes[j$1];
        if (to < cur.from.line) {
          cur.from = Pos(cur.from.line + diff, cur.from.ch);
          cur.to = Pos(cur.to.line + diff, cur.to.ch);
        } else if (from <= cur.to.line) {
          ok = false;
          break;
        }
      }
      if (!ok) {
        array.splice(0, i2 + 1);
        i2 = 0;
      }
    }
  }
  function rebaseHist(hist, change) {
    var from = change.from.line, to = change.to.line, diff = change.text.length - (to - from) - 1;
    rebaseHistArray(hist.done, from, to, diff);
    rebaseHistArray(hist.undone, from, to, diff);
  }
  function changeLine(doc2, handle, changeType, op) {
    var no = handle, line = handle;
    if (typeof handle == "number") {
      line = getLine(doc2, clipLine(doc2, handle));
    } else {
      no = lineNo(handle);
    }
    if (no == null) {
      return null;
    }
    if (op(line, no) && doc2.cm) {
      regLineChange(doc2.cm, no, changeType);
    }
    return line;
  }
  function LeafChunk(lines) {
    this.lines = lines;
    this.parent = null;
    var height = 0;
    for (var i2 = 0; i2 < lines.length; ++i2) {
      lines[i2].parent = this;
      height += lines[i2].height;
    }
    this.height = height;
  }
  LeafChunk.prototype = {
    chunkSize: function() {
      return this.lines.length;
    },
    // Remove the n lines at offset 'at'.
    removeInner: function(at, n) {
      for (var i2 = at, e = at + n; i2 < e; ++i2) {
        var line = this.lines[i2];
        this.height -= line.height;
        cleanUpLine(line);
        signalLater(line, "delete");
      }
      this.lines.splice(at, n);
    },
    // Helper used to collapse a small branch into a single leaf.
    collapse: function(lines) {
      lines.push.apply(lines, this.lines);
    },
    // Insert the given array of lines at offset 'at', count them as
    // having the given height.
    insertInner: function(at, lines, height) {
      this.height += height;
      this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
      for (var i2 = 0; i2 < lines.length; ++i2) {
        lines[i2].parent = this;
      }
    },
    // Used to iterate over a part of the tree.
    iterN: function(at, n, op) {
      for (var e = at + n; at < e; ++at) {
        if (op(this.lines[at])) {
          return true;
        }
      }
    }
  };
  function BranchChunk(children) {
    this.children = children;
    var size = 0, height = 0;
    for (var i2 = 0; i2 < children.length; ++i2) {
      var ch = children[i2];
      size += ch.chunkSize();
      height += ch.height;
      ch.parent = this;
    }
    this.size = size;
    this.height = height;
    this.parent = null;
  }
  BranchChunk.prototype = {
    chunkSize: function() {
      return this.size;
    },
    removeInner: function(at, n) {
      this.size -= n;
      for (var i2 = 0; i2 < this.children.length; ++i2) {
        var child = this.children[i2], sz = child.chunkSize();
        if (at < sz) {
          var rm = Math.min(n, sz - at), oldHeight = child.height;
          child.removeInner(at, rm);
          this.height -= oldHeight - child.height;
          if (sz == rm) {
            this.children.splice(i2--, 1);
            child.parent = null;
          }
          if ((n -= rm) == 0) {
            break;
          }
          at = 0;
        } else {
          at -= sz;
        }
      }
      if (this.size - n < 25 && (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
        var lines = [];
        this.collapse(lines);
        this.children = [new LeafChunk(lines)];
        this.children[0].parent = this;
      }
    },
    collapse: function(lines) {
      for (var i2 = 0; i2 < this.children.length; ++i2) {
        this.children[i2].collapse(lines);
      }
    },
    insertInner: function(at, lines, height) {
      this.size += lines.length;
      this.height += height;
      for (var i2 = 0; i2 < this.children.length; ++i2) {
        var child = this.children[i2], sz = child.chunkSize();
        if (at <= sz) {
          child.insertInner(at, lines, height);
          if (child.lines && child.lines.length > 50) {
            var remaining = child.lines.length % 25 + 25;
            for (var pos = remaining; pos < child.lines.length; ) {
              var leaf = new LeafChunk(child.lines.slice(pos, pos += 25));
              child.height -= leaf.height;
              this.children.splice(++i2, 0, leaf);
              leaf.parent = this;
            }
            child.lines = child.lines.slice(0, remaining);
            this.maybeSpill();
          }
          break;
        }
        at -= sz;
      }
    },
    // When a node has grown, check whether it should be split.
    maybeSpill: function() {
      if (this.children.length <= 10) {
        return;
      }
      var me = this;
      do {
        var spilled = me.children.splice(me.children.length - 5, 5);
        var sibling = new BranchChunk(spilled);
        if (!me.parent) {
          var copy = new BranchChunk(me.children);
          copy.parent = me;
          me.children = [copy, sibling];
          me = copy;
        } else {
          me.size -= sibling.size;
          me.height -= sibling.height;
          var myIndex = indexOf(me.parent.children, me);
          me.parent.children.splice(myIndex + 1, 0, sibling);
        }
        sibling.parent = me.parent;
      } while (me.children.length > 10);
      me.parent.maybeSpill();
    },
    iterN: function(at, n, op) {
      for (var i2 = 0; i2 < this.children.length; ++i2) {
        var child = this.children[i2], sz = child.chunkSize();
        if (at < sz) {
          var used = Math.min(n, sz - at);
          if (child.iterN(at, used, op)) {
            return true;
          }
          if ((n -= used) == 0) {
            break;
          }
          at = 0;
        } else {
          at -= sz;
        }
      }
    }
  };
  var LineWidget = function(doc2, node, options) {
    if (options) {
      for (var opt in options) {
        if (options.hasOwnProperty(opt)) {
          this[opt] = options[opt];
        }
      }
    }
    this.doc = doc2;
    this.node = node;
  };
  LineWidget.prototype.clear = function() {
    var cm = this.doc.cm, ws = this.line.widgets, line = this.line, no = lineNo(line);
    if (no == null || !ws) {
      return;
    }
    for (var i2 = 0; i2 < ws.length; ++i2) {
      if (ws[i2] == this) {
        ws.splice(i2--, 1);
      }
    }
    if (!ws.length) {
      line.widgets = null;
    }
    var height = widgetHeight(this);
    updateLineHeight(line, Math.max(0, line.height - height));
    if (cm) {
      runInOp(cm, function() {
        adjustScrollWhenAboveVisible(cm, line, -height);
        regLineChange(cm, no, "widget");
      });
      signalLater(cm, "lineWidgetCleared", cm, this, no);
    }
  };
  LineWidget.prototype.changed = function() {
    var this$1 = this;
    var oldH = this.height, cm = this.doc.cm, line = this.line;
    this.height = null;
    var diff = widgetHeight(this) - oldH;
    if (!diff) {
      return;
    }
    if (!lineIsHidden(this.doc, line)) {
      updateLineHeight(line, line.height + diff);
    }
    if (cm) {
      runInOp(cm, function() {
        cm.curOp.forceUpdate = true;
        adjustScrollWhenAboveVisible(cm, line, diff);
        signalLater(cm, "lineWidgetChanged", cm, this$1, lineNo(line));
      });
    }
  };
  eventMixin(LineWidget);
  function adjustScrollWhenAboveVisible(cm, line, diff) {
    if (heightAtLine(line) < (cm.curOp && cm.curOp.scrollTop || cm.doc.scrollTop)) {
      addToScrollTop(cm, diff);
    }
  }
  function addLineWidget(doc2, handle, node, options) {
    var widget = new LineWidget(doc2, node, options);
    var cm = doc2.cm;
    if (cm && widget.noHScroll) {
      cm.display.alignWidgets = true;
    }
    changeLine(doc2, handle, "widget", function(line) {
      var widgets = line.widgets || (line.widgets = []);
      if (widget.insertAt == null) {
        widgets.push(widget);
      } else {
        widgets.splice(Math.min(widgets.length, Math.max(0, widget.insertAt)), 0, widget);
      }
      widget.line = line;
      if (cm && !lineIsHidden(doc2, line)) {
        var aboveVisible = heightAtLine(line) < doc2.scrollTop;
        updateLineHeight(line, line.height + widgetHeight(widget));
        if (aboveVisible) {
          addToScrollTop(cm, widget.height);
        }
        cm.curOp.forceUpdate = true;
      }
      return true;
    });
    if (cm) {
      signalLater(cm, "lineWidgetAdded", cm, widget, typeof handle == "number" ? handle : lineNo(handle));
    }
    return widget;
  }
  var nextMarkerId = 0;
  var TextMarker = function(doc2, type) {
    this.lines = [];
    this.type = type;
    this.doc = doc2;
    this.id = ++nextMarkerId;
  };
  TextMarker.prototype.clear = function() {
    if (this.explicitlyCleared) {
      return;
    }
    var cm = this.doc.cm, withOp = cm && !cm.curOp;
    if (withOp) {
      startOperation(cm);
    }
    if (hasHandler(this, "clear")) {
      var found = this.find();
      if (found) {
        signalLater(this, "clear", found.from, found.to);
      }
    }
    var min = null, max = null;
    for (var i2 = 0; i2 < this.lines.length; ++i2) {
      var line = this.lines[i2];
      var span = getMarkedSpanFor(line.markedSpans, this);
      if (cm && !this.collapsed) {
        regLineChange(cm, lineNo(line), "text");
      } else if (cm) {
        if (span.to != null) {
          max = lineNo(line);
        }
        if (span.from != null) {
          min = lineNo(line);
        }
      }
      line.markedSpans = removeMarkedSpan(line.markedSpans, span);
      if (span.from == null && this.collapsed && !lineIsHidden(this.doc, line) && cm) {
        updateLineHeight(line, textHeight(cm.display));
      }
    }
    if (cm && this.collapsed && !cm.options.lineWrapping) {
      for (var i$12 = 0; i$12 < this.lines.length; ++i$12) {
        var visual = visualLine(this.lines[i$12]), len = lineLength(visual);
        if (len > cm.display.maxLineLength) {
          cm.display.maxLine = visual;
          cm.display.maxLineLength = len;
          cm.display.maxLineChanged = true;
        }
      }
    }
    if (min != null && cm && this.collapsed) {
      regChange(cm, min, max + 1);
    }
    this.lines.length = 0;
    this.explicitlyCleared = true;
    if (this.atomic && this.doc.cantEdit) {
      this.doc.cantEdit = false;
      if (cm) {
        reCheckSelection(cm.doc);
      }
    }
    if (cm) {
      signalLater(cm, "markerCleared", cm, this, min, max);
    }
    if (withOp) {
      endOperation(cm);
    }
    if (this.parent) {
      this.parent.clear();
    }
  };
  TextMarker.prototype.find = function(side, lineObj) {
    if (side == null && this.type == "bookmark") {
      side = 1;
    }
    var from, to;
    for (var i2 = 0; i2 < this.lines.length; ++i2) {
      var line = this.lines[i2];
      var span = getMarkedSpanFor(line.markedSpans, this);
      if (span.from != null) {
        from = Pos(lineObj ? line : lineNo(line), span.from);
        if (side == -1) {
          return from;
        }
      }
      if (span.to != null) {
        to = Pos(lineObj ? line : lineNo(line), span.to);
        if (side == 1) {
          return to;
        }
      }
    }
    return from && { from, to };
  };
  TextMarker.prototype.changed = function() {
    var this$1 = this;
    var pos = this.find(-1, true), widget = this, cm = this.doc.cm;
    if (!pos || !cm) {
      return;
    }
    runInOp(cm, function() {
      var line = pos.line, lineN = lineNo(pos.line);
      var view = findViewForLine(cm, lineN);
      if (view) {
        clearLineMeasurementCacheFor(view);
        cm.curOp.selectionChanged = cm.curOp.forceUpdate = true;
      }
      cm.curOp.updateMaxLine = true;
      if (!lineIsHidden(widget.doc, line) && widget.height != null) {
        var oldHeight = widget.height;
        widget.height = null;
        var dHeight = widgetHeight(widget) - oldHeight;
        if (dHeight) {
          updateLineHeight(line, line.height + dHeight);
        }
      }
      signalLater(cm, "markerChanged", cm, this$1);
    });
  };
  TextMarker.prototype.attachLine = function(line) {
    if (!this.lines.length && this.doc.cm) {
      var op = this.doc.cm.curOp;
      if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1) {
        (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this);
      }
    }
    this.lines.push(line);
  };
  TextMarker.prototype.detachLine = function(line) {
    this.lines.splice(indexOf(this.lines, line), 1);
    if (!this.lines.length && this.doc.cm) {
      var op = this.doc.cm.curOp;
      (op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
    }
  };
  eventMixin(TextMarker);
  function markText(doc2, from, to, options, type) {
    if (options && options.shared) {
      return markTextShared(doc2, from, to, options, type);
    }
    if (doc2.cm && !doc2.cm.curOp) {
      return operation(doc2.cm, markText)(doc2, from, to, options, type);
    }
    var marker = new TextMarker(doc2, type), diff = cmp(from, to);
    if (options) {
      copyObj(options, marker, false);
    }
    if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false) {
      return marker;
    }
    if (marker.replacedWith) {
      marker.collapsed = true;
      marker.widgetNode = eltP("span", [marker.replacedWith], "CodeMirror-widget");
      if (!options.handleMouseEvents) {
        marker.widgetNode.setAttribute("cm-ignore-events", "true");
      }
      if (options.insertLeft) {
        marker.widgetNode.insertLeft = true;
      }
    }
    if (marker.collapsed) {
      if (conflictingCollapsedRange(doc2, from.line, from, to, marker) || from.line != to.line && conflictingCollapsedRange(doc2, to.line, from, to, marker)) {
        throw new Error("Inserting collapsed marker partially overlapping an existing one");
      }
      seeCollapsedSpans();
    }
    if (marker.addToHistory) {
      addChangeToHistory(doc2, { from, to, origin: "markText" }, doc2.sel, NaN);
    }
    var curLine = from.line, cm = doc2.cm, updateMaxLine;
    doc2.iter(curLine, to.line + 1, function(line) {
      if (cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine) {
        updateMaxLine = true;
      }
      if (marker.collapsed && curLine != from.line) {
        updateLineHeight(line, 0);
      }
      addMarkedSpan(line, new MarkedSpan(
        marker,
        curLine == from.line ? from.ch : null,
        curLine == to.line ? to.ch : null
      ), doc2.cm && doc2.cm.curOp);
      ++curLine;
    });
    if (marker.collapsed) {
      doc2.iter(from.line, to.line + 1, function(line) {
        if (lineIsHidden(doc2, line)) {
          updateLineHeight(line, 0);
        }
      });
    }
    if (marker.clearOnEnter) {
      on(marker, "beforeCursorEnter", function() {
        return marker.clear();
      });
    }
    if (marker.readOnly) {
      seeReadOnlySpans();
      if (doc2.history.done.length || doc2.history.undone.length) {
        doc2.clearHistory();
      }
    }
    if (marker.collapsed) {
      marker.id = ++nextMarkerId;
      marker.atomic = true;
    }
    if (cm) {
      if (updateMaxLine) {
        cm.curOp.updateMaxLine = true;
      }
      if (marker.collapsed) {
        regChange(cm, from.line, to.line + 1);
      } else if (marker.className || marker.startStyle || marker.endStyle || marker.css || marker.attributes || marker.title) {
        for (var i2 = from.line; i2 <= to.line; i2++) {
          regLineChange(cm, i2, "text");
        }
      }
      if (marker.atomic) {
        reCheckSelection(cm.doc);
      }
      signalLater(cm, "markerAdded", cm, marker);
    }
    return marker;
  }
  var SharedTextMarker = function(markers, primary) {
    this.markers = markers;
    this.primary = primary;
    for (var i2 = 0; i2 < markers.length; ++i2) {
      markers[i2].parent = this;
    }
  };
  SharedTextMarker.prototype.clear = function() {
    if (this.explicitlyCleared) {
      return;
    }
    this.explicitlyCleared = true;
    for (var i2 = 0; i2 < this.markers.length; ++i2) {
      this.markers[i2].clear();
    }
    signalLater(this, "clear");
  };
  SharedTextMarker.prototype.find = function(side, lineObj) {
    return this.primary.find(side, lineObj);
  };
  eventMixin(SharedTextMarker);
  function markTextShared(doc2, from, to, options, type) {
    options = copyObj(options);
    options.shared = false;
    var markers = [markText(doc2, from, to, options, type)], primary = markers[0];
    var widget = options.widgetNode;
    linkedDocs(doc2, function(doc3) {
      if (widget) {
        options.widgetNode = widget.cloneNode(true);
      }
      markers.push(markText(doc3, clipPos(doc3, from), clipPos(doc3, to), options, type));
      for (var i2 = 0; i2 < doc3.linked.length; ++i2) {
        if (doc3.linked[i2].isParent) {
          return;
        }
      }
      primary = lst(markers);
    });
    return new SharedTextMarker(markers, primary);
  }
  function findSharedMarkers(doc2) {
    return doc2.findMarks(Pos(doc2.first, 0), doc2.clipPos(Pos(doc2.lastLine())), function(m) {
      return m.parent;
    });
  }
  function copySharedMarkers(doc2, markers) {
    for (var i2 = 0; i2 < markers.length; i2++) {
      var marker = markers[i2], pos = marker.find();
      var mFrom = doc2.clipPos(pos.from), mTo = doc2.clipPos(pos.to);
      if (cmp(mFrom, mTo)) {
        var subMark = markText(doc2, mFrom, mTo, marker.primary, marker.primary.type);
        marker.markers.push(subMark);
        subMark.parent = marker;
      }
    }
  }
  function detachSharedMarkers(markers) {
    var loop = function(i3) {
      var marker = markers[i3], linked = [marker.primary.doc];
      linkedDocs(marker.primary.doc, function(d) {
        return linked.push(d);
      });
      for (var j = 0; j < marker.markers.length; j++) {
        var subMarker = marker.markers[j];
        if (indexOf(linked, subMarker.doc) == -1) {
          subMarker.parent = null;
          marker.markers.splice(j--, 1);
        }
      }
    };
    for (var i2 = 0; i2 < markers.length; i2++) loop(i2);
  }
  var nextDocId = 0;
  var Doc = function(text, mode, firstLine, lineSep, direction) {
    if (!(this instanceof Doc)) {
      return new Doc(text, mode, firstLine, lineSep, direction);
    }
    if (firstLine == null) {
      firstLine = 0;
    }
    BranchChunk.call(this, [new LeafChunk([new Line("", null)])]);
    this.first = firstLine;
    this.scrollTop = this.scrollLeft = 0;
    this.cantEdit = false;
    this.cleanGeneration = 1;
    this.modeFrontier = this.highlightFrontier = firstLine;
    var start = Pos(firstLine, 0);
    this.sel = simpleSelection(start);
    this.history = new History(null);
    this.id = ++nextDocId;
    this.modeOption = mode;
    this.lineSep = lineSep;
    this.direction = direction == "rtl" ? "rtl" : "ltr";
    this.extend = false;
    if (typeof text == "string") {
      text = this.splitLines(text);
    }
    updateDoc(this, { from: start, to: start, text });
    setSelection(this, simpleSelection(start), sel_dontScroll);
  };
  Doc.prototype = createObj(BranchChunk.prototype, {
    constructor: Doc,
    // Iterate over the document. Supports two forms -- with only one
    // argument, it calls that for each line in the document. With
    // three, it iterates over the range given by the first two (with
    // the second being non-inclusive).
    iter: function(from, to, op) {
      if (op) {
        this.iterN(from - this.first, to - from, op);
      } else {
        this.iterN(this.first, this.first + this.size, from);
      }
    },
    // Non-public interface for adding and removing lines.
    insert: function(at, lines) {
      var height = 0;
      for (var i2 = 0; i2 < lines.length; ++i2) {
        height += lines[i2].height;
      }
      this.insertInner(at - this.first, lines, height);
    },
    remove: function(at, n) {
      this.removeInner(at - this.first, n);
    },
    // From here, the methods are part of the public interface. Most
    // are also available from CodeMirror (editor) instances.
    getValue: function(lineSep) {
      var lines = getLines(this, this.first, this.first + this.size);
      if (lineSep === false) {
        return lines;
      }
      return lines.join(lineSep || this.lineSeparator());
    },
    setValue: docMethodOp(function(code) {
      var top = Pos(this.first, 0), last = this.first + this.size - 1;
      makeChange(this, {
        from: top,
        to: Pos(last, getLine(this, last).text.length),
        text: this.splitLines(code),
        origin: "setValue",
        full: true
      }, true);
      if (this.cm) {
        scrollToCoords(this.cm, 0, 0);
      }
      setSelection(this, simpleSelection(top), sel_dontScroll);
    }),
    replaceRange: function(code, from, to, origin) {
      from = clipPos(this, from);
      to = to ? clipPos(this, to) : from;
      replaceRange(this, code, from, to, origin);
    },
    getRange: function(from, to, lineSep) {
      var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
      if (lineSep === false) {
        return lines;
      }
      if (lineSep === "") {
        return lines.join("");
      }
      return lines.join(lineSep || this.lineSeparator());
    },
    getLine: function(line) {
      var l = this.getLineHandle(line);
      return l && l.text;
    },
    getLineHandle: function(line) {
      if (isLine(this, line)) {
        return getLine(this, line);
      }
    },
    getLineNumber: function(line) {
      return lineNo(line);
    },
    getLineHandleVisualStart: function(line) {
      if (typeof line == "number") {
        line = getLine(this, line);
      }
      return visualLine(line);
    },
    lineCount: function() {
      return this.size;
    },
    firstLine: function() {
      return this.first;
    },
    lastLine: function() {
      return this.first + this.size - 1;
    },
    clipPos: function(pos) {
      return clipPos(this, pos);
    },
    getCursor: function(start) {
      var range2 = this.sel.primary(), pos;
      if (start == null || start == "head") {
        pos = range2.head;
      } else if (start == "anchor") {
        pos = range2.anchor;
      } else if (start == "end" || start == "to" || start === false) {
        pos = range2.to();
      } else {
        pos = range2.from();
      }
      return pos;
    },
    listSelections: function() {
      return this.sel.ranges;
    },
    somethingSelected: function() {
      return this.sel.somethingSelected();
    },
    setCursor: docMethodOp(function(line, ch, options) {
      setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
    }),
    setSelection: docMethodOp(function(anchor, head, options) {
      setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
    }),
    extendSelection: docMethodOp(function(head, other, options) {
      extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
    }),
    extendSelections: docMethodOp(function(heads, options) {
      extendSelections(this, clipPosArray(this, heads), options);
    }),
    extendSelectionsBy: docMethodOp(function(f, options) {
      var heads = map(this.sel.ranges, f);
      extendSelections(this, clipPosArray(this, heads), options);
    }),
    setSelections: docMethodOp(function(ranges, primary, options) {
      if (!ranges.length) {
        return;
      }
      var out = [];
      for (var i2 = 0; i2 < ranges.length; i2++) {
        out[i2] = new Range(
          clipPos(this, ranges[i2].anchor),
          clipPos(this, ranges[i2].head || ranges[i2].anchor)
        );
      }
      if (primary == null) {
        primary = Math.min(ranges.length - 1, this.sel.primIndex);
      }
      setSelection(this, normalizeSelection(this.cm, out, primary), options);
    }),
    addSelection: docMethodOp(function(anchor, head, options) {
      var ranges = this.sel.ranges.slice(0);
      ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
      setSelection(this, normalizeSelection(this.cm, ranges, ranges.length - 1), options);
    }),
    getSelection: function(lineSep) {
      var ranges = this.sel.ranges, lines;
      for (var i2 = 0; i2 < ranges.length; i2++) {
        var sel = getBetween(this, ranges[i2].from(), ranges[i2].to());
        lines = lines ? lines.concat(sel) : sel;
      }
      if (lineSep === false) {
        return lines;
      } else {
        return lines.join(lineSep || this.lineSeparator());
      }
    },
    getSelections: function(lineSep) {
      var parts = [], ranges = this.sel.ranges;
      for (var i2 = 0; i2 < ranges.length; i2++) {
        var sel = getBetween(this, ranges[i2].from(), ranges[i2].to());
        if (lineSep !== false) {
          sel = sel.join(lineSep || this.lineSeparator());
        }
        parts[i2] = sel;
      }
      return parts;
    },
    replaceSelection: function(code, collapse, origin) {
      var dup = [];
      for (var i2 = 0; i2 < this.sel.ranges.length; i2++) {
        dup[i2] = code;
      }
      this.replaceSelections(dup, collapse, origin || "+input");
    },
    replaceSelections: docMethodOp(function(code, collapse, origin) {
      var changes = [], sel = this.sel;
      for (var i2 = 0; i2 < sel.ranges.length; i2++) {
        var range2 = sel.ranges[i2];
        changes[i2] = { from: range2.from(), to: range2.to(), text: this.splitLines(code[i2]), origin };
      }
      var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
      for (var i$12 = changes.length - 1; i$12 >= 0; i$12--) {
        makeChange(this, changes[i$12]);
      }
      if (newSel) {
        setSelectionReplaceHistory(this, newSel);
      } else if (this.cm) {
        ensureCursorVisible(this.cm);
      }
    }),
    undo: docMethodOp(function() {
      makeChangeFromHistory(this, "undo");
    }),
    redo: docMethodOp(function() {
      makeChangeFromHistory(this, "redo");
    }),
    undoSelection: docMethodOp(function() {
      makeChangeFromHistory(this, "undo", true);
    }),
    redoSelection: docMethodOp(function() {
      makeChangeFromHistory(this, "redo", true);
    }),
    setExtending: function(val) {
      this.extend = val;
    },
    getExtending: function() {
      return this.extend;
    },
    historySize: function() {
      var hist = this.history, done = 0, undone = 0;
      for (var i2 = 0; i2 < hist.done.length; i2++) {
        if (!hist.done[i2].ranges) {
          ++done;
        }
      }
      for (var i$12 = 0; i$12 < hist.undone.length; i$12++) {
        if (!hist.undone[i$12].ranges) {
          ++undone;
        }
      }
      return { undo: done, redo: undone };
    },
    clearHistory: function() {
      var this$1 = this;
      this.history = new History(this.history);
      linkedDocs(this, function(doc2) {
        return doc2.history = this$1.history;
      }, true);
    },
    markClean: function() {
      this.cleanGeneration = this.changeGeneration(true);
    },
    changeGeneration: function(forceSplit) {
      if (forceSplit) {
        this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null;
      }
      return this.history.generation;
    },
    isClean: function(gen) {
      return this.history.generation == (gen || this.cleanGeneration);
    },
    getHistory: function() {
      return {
        done: copyHistoryArray(this.history.done),
        undone: copyHistoryArray(this.history.undone)
      };
    },
    setHistory: function(histData) {
      var hist = this.history = new History(this.history);
      hist.done = copyHistoryArray(histData.done.slice(0), null, true);
      hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
    },
    setGutterMarker: docMethodOp(function(line, gutterID, value) {
      return changeLine(this, line, "gutter", function(line2) {
        var markers = line2.gutterMarkers || (line2.gutterMarkers = {});
        markers[gutterID] = value;
        if (!value && isEmpty(markers)) {
          line2.gutterMarkers = null;
        }
        return true;
      });
    }),
    clearGutter: docMethodOp(function(gutterID) {
      var this$1 = this;
      this.iter(function(line) {
        if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
          changeLine(this$1, line, "gutter", function() {
            line.gutterMarkers[gutterID] = null;
            if (isEmpty(line.gutterMarkers)) {
              line.gutterMarkers = null;
            }
            return true;
          });
        }
      });
    }),
    lineInfo: function(line) {
      var n;
      if (typeof line == "number") {
        if (!isLine(this, line)) {
          return null;
        }
        n = line;
        line = getLine(this, line);
        if (!line) {
          return null;
        }
      } else {
        n = lineNo(line);
        if (n == null) {
          return null;
        }
      }
      return {
        line: n,
        handle: line,
        text: line.text,
        gutterMarkers: line.gutterMarkers,
        textClass: line.textClass,
        bgClass: line.bgClass,
        wrapClass: line.wrapClass,
        widgets: line.widgets
      };
    },
    addLineClass: docMethodOp(function(handle, where, cls) {
      return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
        var prop2 = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
        if (!line[prop2]) {
          line[prop2] = cls;
        } else if (classTest(cls).test(line[prop2])) {
          return false;
        } else {
          line[prop2] += " " + cls;
        }
        return true;
      });
    }),
    removeLineClass: docMethodOp(function(handle, where, cls) {
      return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
        var prop2 = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
        var cur = line[prop2];
        if (!cur) {
          return false;
        } else if (cls == null) {
          line[prop2] = null;
        } else {
          var found = cur.match(classTest(cls));
          if (!found) {
            return false;
          }
          var end = found.index + found[0].length;
          line[prop2] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
        }
        return true;
      });
    }),
    addLineWidget: docMethodOp(function(handle, node, options) {
      return addLineWidget(this, handle, node, options);
    }),
    removeLineWidget: function(widget) {
      widget.clear();
    },
    markText: function(from, to, options) {
      return markText(this, clipPos(this, from), clipPos(this, to), options, options && options.type || "range");
    },
    setBookmark: function(pos, options) {
      var realOpts = {
        replacedWith: options && (options.nodeType == null ? options.widget : options),
        insertLeft: options && options.insertLeft,
        clearWhenEmpty: false,
        shared: options && options.shared,
        handleMouseEvents: options && options.handleMouseEvents
      };
      pos = clipPos(this, pos);
      return markText(this, pos, pos, realOpts, "bookmark");
    },
    findMarksAt: function(pos) {
      pos = clipPos(this, pos);
      var markers = [], spans = getLine(this, pos.line).markedSpans;
      if (spans) {
        for (var i2 = 0; i2 < spans.length; ++i2) {
          var span = spans[i2];
          if ((span.from == null || span.from <= pos.ch) && (span.to == null || span.to >= pos.ch)) {
            markers.push(span.marker.parent || span.marker);
          }
        }
      }
      return markers;
    },
    findMarks: function(from, to, filter) {
      from = clipPos(this, from);
      to = clipPos(this, to);
      var found = [], lineNo2 = from.line;
      this.iter(from.line, to.line + 1, function(line) {
        var spans = line.markedSpans;
        if (spans) {
          for (var i2 = 0; i2 < spans.length; i2++) {
            var span = spans[i2];
            if (!(span.to != null && lineNo2 == from.line && from.ch >= span.to || span.from == null && lineNo2 != from.line || span.from != null && lineNo2 == to.line && span.from >= to.ch) && (!filter || filter(span.marker))) {
              found.push(span.marker.parent || span.marker);
            }
          }
        }
        ++lineNo2;
      });
      return found;
    },
    getAllMarks: function() {
      var markers = [];
      this.iter(function(line) {
        var sps = line.markedSpans;
        if (sps) {
          for (var i2 = 0; i2 < sps.length; ++i2) {
            if (sps[i2].from != null) {
              markers.push(sps[i2].marker);
            }
          }
        }
      });
      return markers;
    },
    posFromIndex: function(off2) {
      var ch, lineNo2 = this.first, sepSize = this.lineSeparator().length;
      this.iter(function(line) {
        var sz = line.text.length + sepSize;
        if (sz > off2) {
          ch = off2;
          return true;
        }
        off2 -= sz;
        ++lineNo2;
      });
      return clipPos(this, Pos(lineNo2, ch));
    },
    indexFromPos: function(coords) {
      coords = clipPos(this, coords);
      var index = coords.ch;
      if (coords.line < this.first || coords.ch < 0) {
        return 0;
      }
      var sepSize = this.lineSeparator().length;
      this.iter(this.first, coords.line, function(line) {
        index += line.text.length + sepSize;
      });
      return index;
    },
    copy: function(copyHistory) {
      var doc2 = new Doc(
        getLines(this, this.first, this.first + this.size),
        this.modeOption,
        this.first,
        this.lineSep,
        this.direction
      );
      doc2.scrollTop = this.scrollTop;
      doc2.scrollLeft = this.scrollLeft;
      doc2.sel = this.sel;
      doc2.extend = false;
      if (copyHistory) {
        doc2.history.undoDepth = this.history.undoDepth;
        doc2.setHistory(this.getHistory());
      }
      return doc2;
    },
    linkedDoc: function(options) {
      if (!options) {
        options = {};
      }
      var from = this.first, to = this.first + this.size;
      if (options.from != null && options.from > from) {
        from = options.from;
      }
      if (options.to != null && options.to < to) {
        to = options.to;
      }
      var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from, this.lineSep, this.direction);
      if (options.sharedHist) {
        copy.history = this.history;
      }
      (this.linked || (this.linked = [])).push({ doc: copy, sharedHist: options.sharedHist });
      copy.linked = [{ doc: this, isParent: true, sharedHist: options.sharedHist }];
      copySharedMarkers(copy, findSharedMarkers(this));
      return copy;
    },
    unlinkDoc: function(other) {
      if (other instanceof CodeMirror2) {
        other = other.doc;
      }
      if (this.linked) {
        for (var i2 = 0; i2 < this.linked.length; ++i2) {
          var link = this.linked[i2];
          if (link.doc != other) {
            continue;
          }
          this.linked.splice(i2, 1);
          other.unlinkDoc(this);
          detachSharedMarkers(findSharedMarkers(this));
          break;
        }
      }
      if (other.history == this.history) {
        var splitIds = [other.id];
        linkedDocs(other, function(doc2) {
          return splitIds.push(doc2.id);
        }, true);
        other.history = new History(null);
        other.history.done = copyHistoryArray(this.history.done, splitIds);
        other.history.undone = copyHistoryArray(this.history.undone, splitIds);
      }
    },
    iterLinkedDocs: function(f) {
      linkedDocs(this, f);
    },
    getMode: function() {
      return this.mode;
    },
    getEditor: function() {
      return this.cm;
    },
    splitLines: function(str) {
      if (this.lineSep) {
        return str.split(this.lineSep);
      }
      return splitLinesAuto(str);
    },
    lineSeparator: function() {
      return this.lineSep || "\n";
    },
    setDirection: docMethodOp(function(dir) {
      if (dir != "rtl") {
        dir = "ltr";
      }
      if (dir == this.direction) {
        return;
      }
      this.direction = dir;
      this.iter(function(line) {
        return line.order = null;
      });
      if (this.cm) {
        directionChanged(this.cm);
      }
    })
  });
  Doc.prototype.eachLine = Doc.prototype.iter;
  var lastDrop = 0;
  function onDrop(e) {
    var cm = this;
    clearDragCursor(cm);
    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) {
      return;
    }
    e_preventDefault(e);
    if (ie) {
      lastDrop = +/* @__PURE__ */ new Date();
    }
    var pos = posFromMouse(cm, e, true), files = e.dataTransfer.files;
    if (!pos || cm.isReadOnly()) {
      return;
    }
    if (files && files.length && window.FileReader && window.File) {
      var n = files.length, text = Array(n), read = 0;
      var markAsReadAndPasteIfAllFilesAreRead = function() {
        if (++read == n) {
          operation(cm, function() {
            pos = clipPos(cm.doc, pos);
            var change = {
              from: pos,
              to: pos,
              text: cm.doc.splitLines(
                text.filter(function(t) {
                  return t != null;
                }).join(cm.doc.lineSeparator())
              ),
              origin: "paste"
            };
            makeChange(cm.doc, change);
            setSelectionReplaceHistory(cm.doc, simpleSelection(clipPos(cm.doc, pos), clipPos(cm.doc, changeEnd(change))));
          })();
        }
      };
      var readTextFromFile = function(file, i3) {
        if (cm.options.allowDropFileTypes && indexOf(cm.options.allowDropFileTypes, file.type) == -1) {
          markAsReadAndPasteIfAllFilesAreRead();
          return;
        }
        var reader = new FileReader();
        reader.onerror = function() {
          return markAsReadAndPasteIfAllFilesAreRead();
        };
        reader.onload = function() {
          var content = reader.result;
          if (/[\x00-\x08\x0e-\x1f]{2}/.test(content)) {
            markAsReadAndPasteIfAllFilesAreRead();
            return;
          }
          text[i3] = content;
          markAsReadAndPasteIfAllFilesAreRead();
        };
        reader.readAsText(file);
      };
      for (var i2 = 0; i2 < files.length; i2++) {
        readTextFromFile(files[i2], i2);
      }
    } else {
      if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
        cm.state.draggingText(e);
        setTimeout(function() {
          return cm.display.input.focus();
        }, 20);
        return;
      }
      try {
        var text$1 = e.dataTransfer.getData("Text");
        if (text$1) {
          var selected;
          if (cm.state.draggingText && !cm.state.draggingText.copy) {
            selected = cm.listSelections();
          }
          setSelectionNoUndo(cm.doc, simpleSelection(pos, pos));
          if (selected) {
            for (var i$12 = 0; i$12 < selected.length; ++i$12) {
              replaceRange(cm.doc, "", selected[i$12].anchor, selected[i$12].head, "drag");
            }
          }
          cm.replaceSelection(text$1, "around", "paste");
          cm.display.input.focus();
        }
      } catch (e$1) {
      }
    }
  }
  function onDragStart(cm, e) {
    if (ie && (!cm.state.draggingText || +/* @__PURE__ */ new Date() - lastDrop < 100)) {
      e_stop(e);
      return;
    }
    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) {
      return;
    }
    e.dataTransfer.setData("Text", cm.getSelection());
    e.dataTransfer.effectAllowed = "copyMove";
    if (e.dataTransfer.setDragImage && !safari) {
      var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
      img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      if (presto) {
        img.width = img.height = 1;
        cm.display.wrapper.appendChild(img);
        img._top = img.offsetTop;
      }
      e.dataTransfer.setDragImage(img, 0, 0);
      if (presto) {
        img.parentNode.removeChild(img);
      }
    }
  }
  function onDragOver(cm, e) {
    var pos = posFromMouse(cm, e);
    if (!pos) {
      return;
    }
    var frag = document.createDocumentFragment();
    drawSelectionCursor(cm, pos, frag);
    if (!cm.display.dragCursor) {
      cm.display.dragCursor = elt("div", null, "CodeMirror-cursors CodeMirror-dragcursors");
      cm.display.lineSpace.insertBefore(cm.display.dragCursor, cm.display.cursorDiv);
    }
    removeChildrenAndAdd(cm.display.dragCursor, frag);
  }
  function clearDragCursor(cm) {
    if (cm.display.dragCursor) {
      cm.display.lineSpace.removeChild(cm.display.dragCursor);
      cm.display.dragCursor = null;
    }
  }
  function forEachCodeMirror(f) {
    if (!document.getElementsByClassName) {
      return;
    }
    var byClass = document.getElementsByClassName("CodeMirror"), editors = [];
    for (var i2 = 0; i2 < byClass.length; i2++) {
      var cm = byClass[i2].CodeMirror;
      if (cm) {
        editors.push(cm);
      }
    }
    if (editors.length) {
      editors[0].operation(function() {
        for (var i3 = 0; i3 < editors.length; i3++) {
          f(editors[i3]);
        }
      });
    }
  }
  var globalsRegistered = false;
  function ensureGlobalHandlers() {
    if (globalsRegistered) {
      return;
    }
    registerGlobalHandlers();
    globalsRegistered = true;
  }
  function registerGlobalHandlers() {
    var resizeTimer;
    on(window, "resize", function() {
      if (resizeTimer == null) {
        resizeTimer = setTimeout(function() {
          resizeTimer = null;
          forEachCodeMirror(onResize);
        }, 100);
      }
    });
    on(window, "blur", function() {
      return forEachCodeMirror(onBlur);
    });
  }
  function onResize(cm) {
    var d = cm.display;
    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
    d.scrollbarsClipped = false;
    cm.setSize();
  }
  var keyNames = {
    3: "Pause",
    8: "Backspace",
    9: "Tab",
    13: "Enter",
    16: "Shift",
    17: "Ctrl",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Esc",
    32: "Space",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "Left",
    38: "Up",
    39: "Right",
    40: "Down",
    44: "PrintScrn",
    45: "Insert",
    46: "Delete",
    59: ";",
    61: "=",
    91: "Mod",
    92: "Mod",
    93: "Mod",
    106: "*",
    107: "=",
    109: "-",
    110: ".",
    111: "/",
    145: "ScrollLock",
    173: "-",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'",
    224: "Mod",
    63232: "Up",
    63233: "Down",
    63234: "Left",
    63235: "Right",
    63272: "Delete",
    63273: "Home",
    63275: "End",
    63276: "PageUp",
    63277: "PageDown",
    63302: "Insert"
  };
  for (var i = 0; i < 10; i++) {
    keyNames[i + 48] = keyNames[i + 96] = String(i);
  }
  for (var i$1 = 65; i$1 <= 90; i$1++) {
    keyNames[i$1] = String.fromCharCode(i$1);
  }
  for (var i$2 = 1; i$2 <= 12; i$2++) {
    keyNames[i$2 + 111] = keyNames[i$2 + 63235] = "F" + i$2;
  }
  var keyMap = {};
  keyMap.basic = {
    "Left": "goCharLeft",
    "Right": "goCharRight",
    "Up": "goLineUp",
    "Down": "goLineDown",
    "End": "goLineEnd",
    "Home": "goLineStartSmart",
    "PageUp": "goPageUp",
    "PageDown": "goPageDown",
    "Delete": "delCharAfter",
    "Backspace": "delCharBefore",
    "Shift-Backspace": "delCharBefore",
    "Tab": "defaultTab",
    "Shift-Tab": "indentAuto",
    "Enter": "newlineAndIndent",
    "Insert": "toggleOverwrite",
    "Esc": "singleSelection"
  };
  keyMap.pcDefault = {
    "Ctrl-A": "selectAll",
    "Ctrl-D": "deleteLine",
    "Ctrl-Z": "undo",
    "Shift-Ctrl-Z": "redo",
    "Ctrl-Y": "redo",
    "Ctrl-Home": "goDocStart",
    "Ctrl-End": "goDocEnd",
    "Ctrl-Up": "goLineUp",
    "Ctrl-Down": "goLineDown",
    "Ctrl-Left": "goGroupLeft",
    "Ctrl-Right": "goGroupRight",
    "Alt-Left": "goLineStart",
    "Alt-Right": "goLineEnd",
    "Ctrl-Backspace": "delGroupBefore",
    "Ctrl-Delete": "delGroupAfter",
    "Ctrl-S": "save",
    "Ctrl-F": "find",
    "Ctrl-G": "findNext",
    "Shift-Ctrl-G": "findPrev",
    "Shift-Ctrl-F": "replace",
    "Shift-Ctrl-R": "replaceAll",
    "Ctrl-[": "indentLess",
    "Ctrl-]": "indentMore",
    "Ctrl-U": "undoSelection",
    "Shift-Ctrl-U": "redoSelection",
    "Alt-U": "redoSelection",
    "fallthrough": "basic"
  };
  keyMap.emacsy = {
    "Ctrl-F": "goCharRight",
    "Ctrl-B": "goCharLeft",
    "Ctrl-P": "goLineUp",
    "Ctrl-N": "goLineDown",
    "Ctrl-A": "goLineStart",
    "Ctrl-E": "goLineEnd",
    "Ctrl-V": "goPageDown",
    "Shift-Ctrl-V": "goPageUp",
    "Ctrl-D": "delCharAfter",
    "Ctrl-H": "delCharBefore",
    "Alt-Backspace": "delWordBefore",
    "Ctrl-K": "killLine",
    "Ctrl-T": "transposeChars",
    "Ctrl-O": "openLine"
  };
  keyMap.macDefault = {
    "Cmd-A": "selectAll",
    "Cmd-D": "deleteLine",
    "Cmd-Z": "undo",
    "Shift-Cmd-Z": "redo",
    "Cmd-Y": "redo",
    "Cmd-Home": "goDocStart",
    "Cmd-Up": "goDocStart",
    "Cmd-End": "goDocEnd",
    "Cmd-Down": "goDocEnd",
    "Alt-Left": "goGroupLeft",
    "Alt-Right": "goGroupRight",
    "Cmd-Left": "goLineLeft",
    "Cmd-Right": "goLineRight",
    "Alt-Backspace": "delGroupBefore",
    "Ctrl-Alt-Backspace": "delGroupAfter",
    "Alt-Delete": "delGroupAfter",
    "Cmd-S": "save",
    "Cmd-F": "find",
    "Cmd-G": "findNext",
    "Shift-Cmd-G": "findPrev",
    "Cmd-Alt-F": "replace",
    "Shift-Cmd-Alt-F": "replaceAll",
    "Cmd-[": "indentLess",
    "Cmd-]": "indentMore",
    "Cmd-Backspace": "delWrappedLineLeft",
    "Cmd-Delete": "delWrappedLineRight",
    "Cmd-U": "undoSelection",
    "Shift-Cmd-U": "redoSelection",
    "Ctrl-Up": "goDocStart",
    "Ctrl-Down": "goDocEnd",
    "fallthrough": ["basic", "emacsy"]
  };
  keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;
  function normalizeKeyName(name) {
    var parts = name.split(/-(?!$)/);
    name = parts[parts.length - 1];
    var alt, ctrl, shift, cmd;
    for (var i2 = 0; i2 < parts.length - 1; i2++) {
      var mod = parts[i2];
      if (/^(cmd|meta|m)$/i.test(mod)) {
        cmd = true;
      } else if (/^a(lt)?$/i.test(mod)) {
        alt = true;
      } else if (/^(c|ctrl|control)$/i.test(mod)) {
        ctrl = true;
      } else if (/^s(hift)?$/i.test(mod)) {
        shift = true;
      } else {
        throw new Error("Unrecognized modifier name: " + mod);
      }
    }
    if (alt) {
      name = "Alt-" + name;
    }
    if (ctrl) {
      name = "Ctrl-" + name;
    }
    if (cmd) {
      name = "Cmd-" + name;
    }
    if (shift) {
      name = "Shift-" + name;
    }
    return name;
  }
  function normalizeKeyMap(keymap) {
    var copy = {};
    for (var keyname in keymap) {
      if (keymap.hasOwnProperty(keyname)) {
        var value = keymap[keyname];
        if (/^(name|fallthrough|(de|at)tach)$/.test(keyname)) {
          continue;
        }
        if (value == "...") {
          delete keymap[keyname];
          continue;
        }
        var keys = map(keyname.split(" "), normalizeKeyName);
        for (var i2 = 0; i2 < keys.length; i2++) {
          var val = void 0, name = void 0;
          if (i2 == keys.length - 1) {
            name = keys.join(" ");
            val = value;
          } else {
            name = keys.slice(0, i2 + 1).join(" ");
            val = "...";
          }
          var prev = copy[name];
          if (!prev) {
            copy[name] = val;
          } else if (prev != val) {
            throw new Error("Inconsistent bindings for " + name);
          }
        }
        delete keymap[keyname];
      }
    }
    for (var prop2 in copy) {
      keymap[prop2] = copy[prop2];
    }
    return keymap;
  }
  function lookupKey(key, map2, handle, context) {
    map2 = getKeyMap(map2);
    var found = map2.call ? map2.call(key, context) : map2[key];
    if (found === false) {
      return "nothing";
    }
    if (found === "...") {
      return "multi";
    }
    if (found != null && handle(found)) {
      return "handled";
    }
    if (map2.fallthrough) {
      if (Object.prototype.toString.call(map2.fallthrough) != "[object Array]") {
        return lookupKey(key, map2.fallthrough, handle, context);
      }
      for (var i2 = 0; i2 < map2.fallthrough.length; i2++) {
        var result = lookupKey(key, map2.fallthrough[i2], handle, context);
        if (result) {
          return result;
        }
      }
    }
  }
  function isModifierKey(value) {
    var name = typeof value == "string" ? value : keyNames[value.keyCode];
    return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod";
  }
  function addModifierNames(name, event, noShift) {
    var base = name;
    if (event.altKey && base != "Alt") {
      name = "Alt-" + name;
    }
    if ((flipCtrlCmd ? event.metaKey : event.ctrlKey) && base != "Ctrl") {
      name = "Ctrl-" + name;
    }
    if ((flipCtrlCmd ? event.ctrlKey : event.metaKey) && base != "Mod") {
      name = "Cmd-" + name;
    }
    if (!noShift && event.shiftKey && base != "Shift") {
      name = "Shift-" + name;
    }
    return name;
  }
  function keyName(event, noShift) {
    if (presto && event.keyCode == 34 && event["char"]) {
      return false;
    }
    var name = keyNames[event.keyCode];
    if (name == null || event.altGraphKey) {
      return false;
    }
    if (event.keyCode == 3 && event.code) {
      name = event.code;
    }
    return addModifierNames(name, event, noShift);
  }
  function getKeyMap(val) {
    return typeof val == "string" ? keyMap[val] : val;
  }
  function deleteNearSelection(cm, compute) {
    var ranges = cm.doc.sel.ranges, kill = [];
    for (var i2 = 0; i2 < ranges.length; i2++) {
      var toKill = compute(ranges[i2]);
      while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
        var replaced = kill.pop();
        if (cmp(replaced.from, toKill.from) < 0) {
          toKill.from = replaced.from;
          break;
        }
      }
      kill.push(toKill);
    }
    runInOp(cm, function() {
      for (var i3 = kill.length - 1; i3 >= 0; i3--) {
        replaceRange(cm.doc, "", kill[i3].from, kill[i3].to, "+delete");
      }
      ensureCursorVisible(cm);
    });
  }
  function moveCharLogically(line, ch, dir) {
    var target = skipExtendingChars(line.text, ch + dir, dir);
    return target < 0 || target > line.text.length ? null : target;
  }
  function moveLogically(line, start, dir) {
    var ch = moveCharLogically(line, start.ch, dir);
    return ch == null ? null : new Pos(start.line, ch, dir < 0 ? "after" : "before");
  }
  function endOfLine(visually, cm, lineObj, lineNo2, dir) {
    if (visually) {
      if (cm.doc.direction == "rtl") {
        dir = -dir;
      }
      var order = getOrder(lineObj, cm.doc.direction);
      if (order) {
        var part = dir < 0 ? lst(order) : order[0];
        var moveInStorageOrder = dir < 0 == (part.level == 1);
        var sticky = moveInStorageOrder ? "after" : "before";
        var ch;
        if (part.level > 0 || cm.doc.direction == "rtl") {
          var prep = prepareMeasureForLine(cm, lineObj);
          ch = dir < 0 ? lineObj.text.length - 1 : 0;
          var targetTop = measureCharPrepared(cm, prep, ch).top;
          ch = findFirst(function(ch2) {
            return measureCharPrepared(cm, prep, ch2).top == targetTop;
          }, dir < 0 == (part.level == 1) ? part.from : part.to - 1, ch);
          if (sticky == "before") {
            ch = moveCharLogically(lineObj, ch, 1);
          }
        } else {
          ch = dir < 0 ? part.to : part.from;
        }
        return new Pos(lineNo2, ch, sticky);
      }
    }
    return new Pos(lineNo2, dir < 0 ? lineObj.text.length : 0, dir < 0 ? "before" : "after");
  }
  function moveVisually(cm, line, start, dir) {
    var bidi = getOrder(line, cm.doc.direction);
    if (!bidi) {
      return moveLogically(line, start, dir);
    }
    if (start.ch >= line.text.length) {
      start.ch = line.text.length;
      start.sticky = "before";
    } else if (start.ch <= 0) {
      start.ch = 0;
      start.sticky = "after";
    }
    var partPos = getBidiPartAt(bidi, start.ch, start.sticky), part = bidi[partPos];
    if (cm.doc.direction == "ltr" && part.level % 2 == 0 && (dir > 0 ? part.to > start.ch : part.from < start.ch)) {
      return moveLogically(line, start, dir);
    }
    var mv = function(pos, dir2) {
      return moveCharLogically(line, pos instanceof Pos ? pos.ch : pos, dir2);
    };
    var prep;
    var getWrappedLineExtent = function(ch2) {
      if (!cm.options.lineWrapping) {
        return { begin: 0, end: line.text.length };
      }
      prep = prep || prepareMeasureForLine(cm, line);
      return wrappedLineExtentChar(cm, line, prep, ch2);
    };
    var wrappedLineExtent2 = getWrappedLineExtent(start.sticky == "before" ? mv(start, -1) : start.ch);
    if (cm.doc.direction == "rtl" || part.level == 1) {
      var moveInStorageOrder = part.level == 1 == dir < 0;
      var ch = mv(start, moveInStorageOrder ? 1 : -1);
      if (ch != null && (!moveInStorageOrder ? ch >= part.from && ch >= wrappedLineExtent2.begin : ch <= part.to && ch <= wrappedLineExtent2.end)) {
        var sticky = moveInStorageOrder ? "before" : "after";
        return new Pos(start.line, ch, sticky);
      }
    }
    var searchInVisualLine = function(partPos2, dir2, wrappedLineExtent3) {
      var getRes = function(ch3, moveInStorageOrder3) {
        return moveInStorageOrder3 ? new Pos(start.line, mv(ch3, 1), "before") : new Pos(start.line, ch3, "after");
      };
      for (; partPos2 >= 0 && partPos2 < bidi.length; partPos2 += dir2) {
        var part2 = bidi[partPos2];
        var moveInStorageOrder2 = dir2 > 0 == (part2.level != 1);
        var ch2 = moveInStorageOrder2 ? wrappedLineExtent3.begin : mv(wrappedLineExtent3.end, -1);
        if (part2.from <= ch2 && ch2 < part2.to) {
          return getRes(ch2, moveInStorageOrder2);
        }
        ch2 = moveInStorageOrder2 ? part2.from : mv(part2.to, -1);
        if (wrappedLineExtent3.begin <= ch2 && ch2 < wrappedLineExtent3.end) {
          return getRes(ch2, moveInStorageOrder2);
        }
      }
    };
    var res = searchInVisualLine(partPos + dir, dir, wrappedLineExtent2);
    if (res) {
      return res;
    }
    var nextCh = dir > 0 ? wrappedLineExtent2.end : mv(wrappedLineExtent2.begin, -1);
    if (nextCh != null && !(dir > 0 && nextCh == line.text.length)) {
      res = searchInVisualLine(dir > 0 ? 0 : bidi.length - 1, dir, getWrappedLineExtent(nextCh));
      if (res) {
        return res;
      }
    }
    return null;
  }
  var commands = {
    selectAll,
    singleSelection: function(cm) {
      return cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll);
    },
    killLine: function(cm) {
      return deleteNearSelection(cm, function(range2) {
        if (range2.empty()) {
          var len = getLine(cm.doc, range2.head.line).text.length;
          if (range2.head.ch == len && range2.head.line < cm.lastLine()) {
            return { from: range2.head, to: Pos(range2.head.line + 1, 0) };
          } else {
            return { from: range2.head, to: Pos(range2.head.line, len) };
          }
        } else {
          return { from: range2.from(), to: range2.to() };
        }
      });
    },
    deleteLine: function(cm) {
      return deleteNearSelection(cm, function(range2) {
        return {
          from: Pos(range2.from().line, 0),
          to: clipPos(cm.doc, Pos(range2.to().line + 1, 0))
        };
      });
    },
    delLineLeft: function(cm) {
      return deleteNearSelection(cm, function(range2) {
        return {
          from: Pos(range2.from().line, 0),
          to: range2.from()
        };
      });
    },
    delWrappedLineLeft: function(cm) {
      return deleteNearSelection(cm, function(range2) {
        var top = cm.charCoords(range2.head, "div").top + 5;
        var leftPos = cm.coordsChar({ left: 0, top }, "div");
        return { from: leftPos, to: range2.from() };
      });
    },
    delWrappedLineRight: function(cm) {
      return deleteNearSelection(cm, function(range2) {
        var top = cm.charCoords(range2.head, "div").top + 5;
        var rightPos = cm.coordsChar({ left: cm.display.lineDiv.offsetWidth + 100, top }, "div");
        return { from: range2.from(), to: rightPos };
      });
    },
    undo: function(cm) {
      return cm.undo();
    },
    redo: function(cm) {
      return cm.redo();
    },
    undoSelection: function(cm) {
      return cm.undoSelection();
    },
    redoSelection: function(cm) {
      return cm.redoSelection();
    },
    goDocStart: function(cm) {
      return cm.extendSelection(Pos(cm.firstLine(), 0));
    },
    goDocEnd: function(cm) {
      return cm.extendSelection(Pos(cm.lastLine()));
    },
    goLineStart: function(cm) {
      return cm.extendSelectionsBy(
        function(range2) {
          return lineStart(cm, range2.head.line);
        },
        { origin: "+move", bias: 1 }
      );
    },
    goLineStartSmart: function(cm) {
      return cm.extendSelectionsBy(
        function(range2) {
          return lineStartSmart(cm, range2.head);
        },
        { origin: "+move", bias: 1 }
      );
    },
    goLineEnd: function(cm) {
      return cm.extendSelectionsBy(
        function(range2) {
          return lineEnd(cm, range2.head.line);
        },
        { origin: "+move", bias: -1 }
      );
    },
    goLineRight: function(cm) {
      return cm.extendSelectionsBy(function(range2) {
        var top = cm.cursorCoords(range2.head, "div").top + 5;
        return cm.coordsChar({ left: cm.display.lineDiv.offsetWidth + 100, top }, "div");
      }, sel_move);
    },
    goLineLeft: function(cm) {
      return cm.extendSelectionsBy(function(range2) {
        var top = cm.cursorCoords(range2.head, "div").top + 5;
        return cm.coordsChar({ left: 0, top }, "div");
      }, sel_move);
    },
    goLineLeftSmart: function(cm) {
      return cm.extendSelectionsBy(function(range2) {
        var top = cm.cursorCoords(range2.head, "div").top + 5;
        var pos = cm.coordsChar({ left: 0, top }, "div");
        if (pos.ch < cm.getLine(pos.line).search(/\S/)) {
          return lineStartSmart(cm, range2.head);
        }
        return pos;
      }, sel_move);
    },
    goLineUp: function(cm) {
      return cm.moveV(-1, "line");
    },
    goLineDown: function(cm) {
      return cm.moveV(1, "line");
    },
    goPageUp: function(cm) {
      return cm.moveV(-1, "page");
    },
    goPageDown: function(cm) {
      return cm.moveV(1, "page");
    },
    goCharLeft: function(cm) {
      return cm.moveH(-1, "char");
    },
    goCharRight: function(cm) {
      return cm.moveH(1, "char");
    },
    goColumnLeft: function(cm) {
      return cm.moveH(-1, "column");
    },
    goColumnRight: function(cm) {
      return cm.moveH(1, "column");
    },
    goWordLeft: function(cm) {
      return cm.moveH(-1, "word");
    },
    goGroupRight: function(cm) {
      return cm.moveH(1, "group");
    },
    goGroupLeft: function(cm) {
      return cm.moveH(-1, "group");
    },
    goWordRight: function(cm) {
      return cm.moveH(1, "word");
    },
    delCharBefore: function(cm) {
      return cm.deleteH(-1, "codepoint");
    },
    delCharAfter: function(cm) {
      return cm.deleteH(1, "char");
    },
    delWordBefore: function(cm) {
      return cm.deleteH(-1, "word");
    },
    delWordAfter: function(cm) {
      return cm.deleteH(1, "word");
    },
    delGroupBefore: function(cm) {
      return cm.deleteH(-1, "group");
    },
    delGroupAfter: function(cm) {
      return cm.deleteH(1, "group");
    },
    indentAuto: function(cm) {
      return cm.indentSelection("smart");
    },
    indentMore: function(cm) {
      return cm.indentSelection("add");
    },
    indentLess: function(cm) {
      return cm.indentSelection("subtract");
    },
    insertTab: function(cm) {
      return cm.replaceSelection("	");
    },
    insertSoftTab: function(cm) {
      var spaces = [], ranges = cm.listSelections(), tabSize = cm.options.tabSize;
      for (var i2 = 0; i2 < ranges.length; i2++) {
        var pos = ranges[i2].from();
        var col = countColumn(cm.getLine(pos.line), pos.ch, tabSize);
        spaces.push(spaceStr(tabSize - col % tabSize));
      }
      cm.replaceSelections(spaces);
    },
    defaultTab: function(cm) {
      if (cm.somethingSelected()) {
        cm.indentSelection("add");
      } else {
        cm.execCommand("insertTab");
      }
    },
    // Swap the two chars left and right of each selection's head.
    // Move cursor behind the two swapped characters afterwards.
    //
    // Doesn't consider line feeds a character.
    // Doesn't scan more than one line above to find a character.
    // Doesn't do anything on an empty line.
    // Doesn't do anything with non-empty selections.
    transposeChars: function(cm) {
      return runInOp(cm, function() {
        var ranges = cm.listSelections(), newSel = [];
        for (var i2 = 0; i2 < ranges.length; i2++) {
          if (!ranges[i2].empty()) {
            continue;
          }
          var cur = ranges[i2].head, line = getLine(cm.doc, cur.line).text;
          if (line) {
            if (cur.ch == line.length) {
              cur = new Pos(cur.line, cur.ch - 1);
            }
            if (cur.ch > 0) {
              cur = new Pos(cur.line, cur.ch + 1);
              cm.replaceRange(
                line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2),
                Pos(cur.line, cur.ch - 2),
                cur,
                "+transpose"
              );
            } else if (cur.line > cm.doc.first) {
              var prev = getLine(cm.doc, cur.line - 1).text;
              if (prev) {
                cur = new Pos(cur.line, 1);
                cm.replaceRange(
                  line.charAt(0) + cm.doc.lineSeparator() + prev.charAt(prev.length - 1),
                  Pos(cur.line - 1, prev.length - 1),
                  cur,
                  "+transpose"
                );
              }
            }
          }
          newSel.push(new Range(cur, cur));
        }
        cm.setSelections(newSel);
      });
    },
    newlineAndIndent: function(cm) {
      return runInOp(cm, function() {
        var sels = cm.listSelections();
        for (var i2 = sels.length - 1; i2 >= 0; i2--) {
          cm.replaceRange(cm.doc.lineSeparator(), sels[i2].anchor, sels[i2].head, "+input");
        }
        sels = cm.listSelections();
        for (var i$12 = 0; i$12 < sels.length; i$12++) {
          cm.indentLine(sels[i$12].from().line, null, true);
        }
        ensureCursorVisible(cm);
      });
    },
    openLine: function(cm) {
      return cm.replaceSelection("\n", "start");
    },
    toggleOverwrite: function(cm) {
      return cm.toggleOverwrite();
    }
  };
  function lineStart(cm, lineN) {
    var line = getLine(cm.doc, lineN);
    var visual = visualLine(line);
    if (visual != line) {
      lineN = lineNo(visual);
    }
    return endOfLine(true, cm, visual, lineN, 1);
  }
  function lineEnd(cm, lineN) {
    var line = getLine(cm.doc, lineN);
    var visual = visualLineEnd(line);
    if (visual != line) {
      lineN = lineNo(visual);
    }
    return endOfLine(true, cm, line, lineN, -1);
  }
  function lineStartSmart(cm, pos) {
    var start = lineStart(cm, pos.line);
    var line = getLine(cm.doc, start.line);
    var order = getOrder(line, cm.doc.direction);
    if (!order || order[0].level == 0) {
      var firstNonWS = Math.max(start.ch, line.text.search(/\S/));
      var inWS = pos.line == start.line && pos.ch <= firstNonWS && pos.ch;
      return Pos(start.line, inWS ? 0 : firstNonWS, start.sticky);
    }
    return start;
  }
  function doHandleBinding(cm, bound, dropShift) {
    if (typeof bound == "string") {
      bound = commands[bound];
      if (!bound) {
        return false;
      }
    }
    cm.display.input.ensurePolled();
    var prevShift = cm.display.shift, done = false;
    try {
      if (cm.isReadOnly()) {
        cm.state.suppressEdits = true;
      }
      if (dropShift) {
        cm.display.shift = false;
      }
      done = bound(cm) != Pass;
    } finally {
      cm.display.shift = prevShift;
      cm.state.suppressEdits = false;
    }
    return done;
  }
  function lookupKeyForEditor(cm, name, handle) {
    for (var i2 = 0; i2 < cm.state.keyMaps.length; i2++) {
      var result = lookupKey(name, cm.state.keyMaps[i2], handle, cm);
      if (result) {
        return result;
      }
    }
    return cm.options.extraKeys && lookupKey(name, cm.options.extraKeys, handle, cm) || lookupKey(name, cm.options.keyMap, handle, cm);
  }
  var stopSeq = new Delayed();
  function dispatchKey(cm, name, e, handle) {
    var seq = cm.state.keySeq;
    if (seq) {
      if (isModifierKey(name)) {
        return "handled";
      }
      if (/\'$/.test(name)) {
        cm.state.keySeq = null;
      } else {
        stopSeq.set(50, function() {
          if (cm.state.keySeq == seq) {
            cm.state.keySeq = null;
            cm.display.input.reset();
          }
        });
      }
      if (dispatchKeyInner(cm, seq + " " + name, e, handle)) {
        return true;
      }
    }
    return dispatchKeyInner(cm, name, e, handle);
  }
  function dispatchKeyInner(cm, name, e, handle) {
    var result = lookupKeyForEditor(cm, name, handle);
    if (result == "multi") {
      cm.state.keySeq = name;
    }
    if (result == "handled") {
      signalLater(cm, "keyHandled", cm, name, e);
    }
    if (result == "handled" || result == "multi") {
      e_preventDefault(e);
      restartBlink(cm);
    }
    return !!result;
  }
  function handleKeyBinding(cm, e) {
    var name = keyName(e, true);
    if (!name) {
      return false;
    }
    if (e.shiftKey && !cm.state.keySeq) {
      return dispatchKey(cm, "Shift-" + name, e, function(b) {
        return doHandleBinding(cm, b, true);
      }) || dispatchKey(cm, name, e, function(b) {
        if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion) {
          return doHandleBinding(cm, b);
        }
      });
    } else {
      return dispatchKey(cm, name, e, function(b) {
        return doHandleBinding(cm, b);
      });
    }
  }
  function handleCharBinding(cm, e, ch) {
    return dispatchKey(cm, "'" + ch + "'", e, function(b) {
      return doHandleBinding(cm, b, true);
    });
  }
  var lastStoppedKey = null;
  function onKeyDown(e) {
    var cm = this;
    if (e.target && e.target != cm.display.input.getField()) {
      return;
    }
    cm.curOp.focus = activeElt(root(cm));
    if (signalDOMEvent(cm, e)) {
      return;
    }
    if (ie && ie_version < 11 && e.keyCode == 27) {
      e.returnValue = false;
    }
    var code = e.keyCode;
    cm.display.shift = code == 16 || e.shiftKey;
    var handled = handleKeyBinding(cm, e);
    if (presto) {
      lastStoppedKey = handled ? code : null;
      if (!handled && code == 88 && !hasCopyEvent && (mac ? e.metaKey : e.ctrlKey)) {
        cm.replaceSelection("", null, "cut");
      }
    }
    if (gecko && !mac && !handled && code == 46 && e.shiftKey && !e.ctrlKey && document.execCommand) {
      document.execCommand("cut");
    }
    if (code == 18 && !/\bCodeMirror-crosshair\b/.test(cm.display.lineDiv.className)) {
      showCrossHair(cm);
    }
  }
  function showCrossHair(cm) {
    var lineDiv = cm.display.lineDiv;
    addClass(lineDiv, "CodeMirror-crosshair");
    function up(e) {
      if (e.keyCode == 18 || !e.altKey) {
        rmClass(lineDiv, "CodeMirror-crosshair");
        off(document, "keyup", up);
        off(document, "mouseover", up);
      }
    }
    on(document, "keyup", up);
    on(document, "mouseover", up);
  }
  function onKeyUp(e) {
    if (e.keyCode == 16) {
      this.doc.sel.shift = false;
    }
    signalDOMEvent(this, e);
  }
  function onKeyPress(e) {
    var cm = this;
    if (e.target && e.target != cm.display.input.getField()) {
      return;
    }
    if (eventInWidget(cm.display, e) || signalDOMEvent(cm, e) || e.ctrlKey && !e.altKey || mac && e.metaKey) {
      return;
    }
    var keyCode = e.keyCode, charCode = e.charCode;
    if (presto && keyCode == lastStoppedKey) {
      lastStoppedKey = null;
      e_preventDefault(e);
      return;
    }
    if (presto && (!e.which || e.which < 10) && handleKeyBinding(cm, e)) {
      return;
    }
    var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
    if (ch == "\b") {
      return;
    }
    if (handleCharBinding(cm, e, ch)) {
      return;
    }
    cm.display.input.onKeyPress(e);
  }
  var DOUBLECLICK_DELAY = 400;
  var PastClick = function(time, pos, button) {
    this.time = time;
    this.pos = pos;
    this.button = button;
  };
  PastClick.prototype.compare = function(time, pos, button) {
    return this.time + DOUBLECLICK_DELAY > time && cmp(pos, this.pos) == 0 && button == this.button;
  };
  var lastClick, lastDoubleClick;
  function clickRepeat(pos, button) {
    var now = +/* @__PURE__ */ new Date();
    if (lastDoubleClick && lastDoubleClick.compare(now, pos, button)) {
      lastClick = lastDoubleClick = null;
      return "triple";
    } else if (lastClick && lastClick.compare(now, pos, button)) {
      lastDoubleClick = new PastClick(now, pos, button);
      lastClick = null;
      return "double";
    } else {
      lastClick = new PastClick(now, pos, button);
      lastDoubleClick = null;
      return "single";
    }
  }
  function onMouseDown(e) {
    var cm = this, display = cm.display;
    if (signalDOMEvent(cm, e) || display.activeTouch && display.input.supportsTouch()) {
      return;
    }
    display.input.ensurePolled();
    display.shift = e.shiftKey;
    if (eventInWidget(display, e)) {
      if (!webkit) {
        display.scroller.draggable = false;
        setTimeout(function() {
          return display.scroller.draggable = true;
        }, 100);
      }
      return;
    }
    if (clickInGutter(cm, e)) {
      return;
    }
    var pos = posFromMouse(cm, e), button = e_button(e), repeat = pos ? clickRepeat(pos, button) : "single";
    win(cm).focus();
    if (button == 1 && cm.state.selectingText) {
      cm.state.selectingText(e);
    }
    if (pos && handleMappedButton(cm, button, pos, repeat, e)) {
      return;
    }
    if (button == 1) {
      if (pos) {
        leftButtonDown(cm, pos, repeat, e);
      } else if (e_target(e) == display.scroller) {
        e_preventDefault(e);
      }
    } else if (button == 2) {
      if (pos) {
        extendSelection(cm.doc, pos);
      }
      setTimeout(function() {
        return display.input.focus();
      }, 20);
    } else if (button == 3) {
      if (captureRightClick) {
        cm.display.input.onContextMenu(e);
      } else {
        delayBlurEvent(cm);
      }
    }
  }
  function handleMappedButton(cm, button, pos, repeat, event) {
    var name = "Click";
    if (repeat == "double") {
      name = "Double" + name;
    } else if (repeat == "triple") {
      name = "Triple" + name;
    }
    name = (button == 1 ? "Left" : button == 2 ? "Middle" : "Right") + name;
    return dispatchKey(cm, addModifierNames(name, event), event, function(bound) {
      if (typeof bound == "string") {
        bound = commands[bound];
      }
      if (!bound) {
        return false;
      }
      var done = false;
      try {
        if (cm.isReadOnly()) {
          cm.state.suppressEdits = true;
        }
        done = bound(cm, pos) != Pass;
      } finally {
        cm.state.suppressEdits = false;
      }
      return done;
    });
  }
  function configureMouse(cm, repeat, event) {
    var option = cm.getOption("configureMouse");
    var value = option ? option(cm, repeat, event) : {};
    if (value.unit == null) {
      var rect = chromeOS ? event.shiftKey && event.metaKey : event.altKey;
      value.unit = rect ? "rectangle" : repeat == "single" ? "char" : repeat == "double" ? "word" : "line";
    }
    if (value.extend == null || cm.doc.extend) {
      value.extend = cm.doc.extend || event.shiftKey;
    }
    if (value.addNew == null) {
      value.addNew = mac ? event.metaKey : event.ctrlKey;
    }
    if (value.moveOnDrag == null) {
      value.moveOnDrag = !(mac ? event.altKey : event.ctrlKey);
    }
    return value;
  }
  function leftButtonDown(cm, pos, repeat, event) {
    if (ie) {
      setTimeout(bind(ensureFocus, cm), 0);
    } else {
      cm.curOp.focus = activeElt(root(cm));
    }
    var behavior = configureMouse(cm, repeat, event);
    var sel = cm.doc.sel, contained;
    if (cm.options.dragDrop && dragAndDrop && !cm.isReadOnly() && repeat == "single" && (contained = sel.contains(pos)) > -1 && (cmp((contained = sel.ranges[contained]).from(), pos) < 0 || pos.xRel > 0) && (cmp(contained.to(), pos) > 0 || pos.xRel < 0)) {
      leftButtonStartDrag(cm, event, pos, behavior);
    } else {
      leftButtonSelect(cm, event, pos, behavior);
    }
  }
  function leftButtonStartDrag(cm, event, pos, behavior) {
    var display = cm.display, moved = false;
    var dragEnd = operation(cm, function(e) {
      if (webkit) {
        display.scroller.draggable = false;
      }
      cm.state.draggingText = false;
      if (cm.state.delayingBlurEvent) {
        if (cm.hasFocus()) {
          cm.state.delayingBlurEvent = false;
        } else {
          delayBlurEvent(cm);
        }
      }
      off(display.wrapper.ownerDocument, "mouseup", dragEnd);
      off(display.wrapper.ownerDocument, "mousemove", mouseMove);
      off(display.scroller, "dragstart", dragStart);
      off(display.scroller, "drop", dragEnd);
      if (!moved) {
        e_preventDefault(e);
        if (!behavior.addNew) {
          extendSelection(cm.doc, pos, null, null, behavior.extend);
        }
        if (webkit && !safari || ie && ie_version == 9) {
          setTimeout(function() {
            display.wrapper.ownerDocument.body.focus({ preventScroll: true });
            display.input.focus();
          }, 20);
        } else {
          display.input.focus();
        }
      }
    });
    var mouseMove = function(e2) {
      moved = moved || Math.abs(event.clientX - e2.clientX) + Math.abs(event.clientY - e2.clientY) >= 10;
    };
    var dragStart = function() {
      return moved = true;
    };
    if (webkit) {
      display.scroller.draggable = true;
    }
    cm.state.draggingText = dragEnd;
    dragEnd.copy = !behavior.moveOnDrag;
    on(display.wrapper.ownerDocument, "mouseup", dragEnd);
    on(display.wrapper.ownerDocument, "mousemove", mouseMove);
    on(display.scroller, "dragstart", dragStart);
    on(display.scroller, "drop", dragEnd);
    cm.state.delayingBlurEvent = true;
    setTimeout(function() {
      return display.input.focus();
    }, 20);
    if (display.scroller.dragDrop) {
      display.scroller.dragDrop();
    }
  }
  function rangeForUnit(cm, pos, unit) {
    if (unit == "char") {
      return new Range(pos, pos);
    }
    if (unit == "word") {
      return cm.findWordAt(pos);
    }
    if (unit == "line") {
      return new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0)));
    }
    var result = unit(cm, pos);
    return new Range(result.from, result.to);
  }
  function leftButtonSelect(cm, event, start, behavior) {
    if (ie) {
      delayBlurEvent(cm);
    }
    var display = cm.display, doc2 = cm.doc;
    e_preventDefault(event);
    var ourRange, ourIndex, startSel = doc2.sel, ranges = startSel.ranges;
    if (behavior.addNew && !behavior.extend) {
      ourIndex = doc2.sel.contains(start);
      if (ourIndex > -1) {
        ourRange = ranges[ourIndex];
      } else {
        ourRange = new Range(start, start);
      }
    } else {
      ourRange = doc2.sel.primary();
      ourIndex = doc2.sel.primIndex;
    }
    if (behavior.unit == "rectangle") {
      if (!behavior.addNew) {
        ourRange = new Range(start, start);
      }
      start = posFromMouse(cm, event, true, true);
      ourIndex = -1;
    } else {
      var range2 = rangeForUnit(cm, start, behavior.unit);
      if (behavior.extend) {
        ourRange = extendRange(ourRange, range2.anchor, range2.head, behavior.extend);
      } else {
        ourRange = range2;
      }
    }
    if (!behavior.addNew) {
      ourIndex = 0;
      setSelection(doc2, new Selection([ourRange], 0), sel_mouse);
      startSel = doc2.sel;
    } else if (ourIndex == -1) {
      ourIndex = ranges.length;
      setSelection(
        doc2,
        normalizeSelection(cm, ranges.concat([ourRange]), ourIndex),
        { scroll: false, origin: "*mouse" }
      );
    } else if (ranges.length > 1 && ranges[ourIndex].empty() && behavior.unit == "char" && !behavior.extend) {
      setSelection(
        doc2,
        normalizeSelection(cm, ranges.slice(0, ourIndex).concat(ranges.slice(ourIndex + 1)), 0),
        { scroll: false, origin: "*mouse" }
      );
      startSel = doc2.sel;
    } else {
      replaceOneSelection(doc2, ourIndex, ourRange, sel_mouse);
    }
    var lastPos = start;
    function extendTo(pos) {
      if (cmp(lastPos, pos) == 0) {
        return;
      }
      lastPos = pos;
      if (behavior.unit == "rectangle") {
        var ranges2 = [], tabSize = cm.options.tabSize;
        var startCol = countColumn(getLine(doc2, start.line).text, start.ch, tabSize);
        var posCol = countColumn(getLine(doc2, pos.line).text, pos.ch, tabSize);
        var left = Math.min(startCol, posCol), right = Math.max(startCol, posCol);
        for (var line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line)); line <= end; line++) {
          var text = getLine(doc2, line).text, leftPos = findColumn(text, left, tabSize);
          if (left == right) {
            ranges2.push(new Range(Pos(line, leftPos), Pos(line, leftPos)));
          } else if (text.length > leftPos) {
            ranges2.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize))));
          }
        }
        if (!ranges2.length) {
          ranges2.push(new Range(start, start));
        }
        setSelection(
          doc2,
          normalizeSelection(cm, startSel.ranges.slice(0, ourIndex).concat(ranges2), ourIndex),
          { origin: "*mouse", scroll: false }
        );
        cm.scrollIntoView(pos);
      } else {
        var oldRange = ourRange;
        var range3 = rangeForUnit(cm, pos, behavior.unit);
        var anchor = oldRange.anchor, head;
        if (cmp(range3.anchor, anchor) > 0) {
          head = range3.head;
          anchor = minPos(oldRange.from(), range3.anchor);
        } else {
          head = range3.anchor;
          anchor = maxPos(oldRange.to(), range3.head);
        }
        var ranges$1 = startSel.ranges.slice(0);
        ranges$1[ourIndex] = bidiSimplify(cm, new Range(clipPos(doc2, anchor), head));
        setSelection(doc2, normalizeSelection(cm, ranges$1, ourIndex), sel_mouse);
      }
    }
    var editorSize = display.wrapper.getBoundingClientRect();
    var counter = 0;
    function extend(e) {
      var curCount = ++counter;
      var cur = posFromMouse(cm, e, true, behavior.unit == "rectangle");
      if (!cur) {
        return;
      }
      if (cmp(cur, lastPos) != 0) {
        cm.curOp.focus = activeElt(root(cm));
        extendTo(cur);
        var visible = visibleLines(display, doc2);
        if (cur.line >= visible.to || cur.line < visible.from) {
          setTimeout(operation(cm, function() {
            if (counter == curCount) {
              extend(e);
            }
          }), 150);
        }
      } else {
        var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
        if (outside) {
          setTimeout(operation(cm, function() {
            if (counter != curCount) {
              return;
            }
            display.scroller.scrollTop += outside;
            extend(e);
          }), 50);
        }
      }
    }
    function done(e) {
      cm.state.selectingText = false;
      counter = Infinity;
      if (e) {
        e_preventDefault(e);
        display.input.focus();
      }
      off(display.wrapper.ownerDocument, "mousemove", move);
      off(display.wrapper.ownerDocument, "mouseup", up);
      doc2.history.lastSelOrigin = null;
    }
    var move = operation(cm, function(e) {
      if (e.buttons === 0 || !e_button(e)) {
        done(e);
      } else {
        extend(e);
      }
    });
    var up = operation(cm, done);
    cm.state.selectingText = up;
    on(display.wrapper.ownerDocument, "mousemove", move);
    on(display.wrapper.ownerDocument, "mouseup", up);
  }
  function bidiSimplify(cm, range2) {
    var anchor = range2.anchor;
    var head = range2.head;
    var anchorLine = getLine(cm.doc, anchor.line);
    if (cmp(anchor, head) == 0 && anchor.sticky == head.sticky) {
      return range2;
    }
    var order = getOrder(anchorLine);
    if (!order) {
      return range2;
    }
    var index = getBidiPartAt(order, anchor.ch, anchor.sticky), part = order[index];
    if (part.from != anchor.ch && part.to != anchor.ch) {
      return range2;
    }
    var boundary = index + (part.from == anchor.ch == (part.level != 1) ? 0 : 1);
    if (boundary == 0 || boundary == order.length) {
      return range2;
    }
    var leftSide;
    if (head.line != anchor.line) {
      leftSide = (head.line - anchor.line) * (cm.doc.direction == "ltr" ? 1 : -1) > 0;
    } else {
      var headIndex = getBidiPartAt(order, head.ch, head.sticky);
      var dir = headIndex - index || (head.ch - anchor.ch) * (part.level == 1 ? -1 : 1);
      if (headIndex == boundary - 1 || headIndex == boundary) {
        leftSide = dir < 0;
      } else {
        leftSide = dir > 0;
      }
    }
    var usePart = order[boundary + (leftSide ? -1 : 0)];
    var from = leftSide == (usePart.level == 1);
    var ch = from ? usePart.from : usePart.to, sticky = from ? "after" : "before";
    return anchor.ch == ch && anchor.sticky == sticky ? range2 : new Range(new Pos(anchor.line, ch, sticky), head);
  }
  function gutterEvent(cm, e, type, prevent) {
    var mX, mY;
    if (e.touches) {
      mX = e.touches[0].clientX;
      mY = e.touches[0].clientY;
    } else {
      try {
        mX = e.clientX;
        mY = e.clientY;
      } catch (e$1) {
        return false;
      }
    }
    if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) {
      return false;
    }
    if (prevent) {
      e_preventDefault(e);
    }
    var display = cm.display;
    var lineBox = display.lineDiv.getBoundingClientRect();
    if (mY > lineBox.bottom || !hasHandler(cm, type)) {
      return e_defaultPrevented(e);
    }
    mY -= lineBox.top - display.viewOffset;
    for (var i2 = 0; i2 < cm.display.gutterSpecs.length; ++i2) {
      var g = display.gutters.childNodes[i2];
      if (g && g.getBoundingClientRect().right >= mX) {
        var line = lineAtHeight(cm.doc, mY);
        var gutter = cm.display.gutterSpecs[i2];
        signal(cm, type, cm, line, gutter.className, e);
        return e_defaultPrevented(e);
      }
    }
  }
  function clickInGutter(cm, e) {
    return gutterEvent(cm, e, "gutterClick", true);
  }
  function onContextMenu(cm, e) {
    if (eventInWidget(cm.display, e) || contextMenuInGutter(cm, e)) {
      return;
    }
    if (signalDOMEvent(cm, e, "contextmenu")) {
      return;
    }
    if (!captureRightClick) {
      cm.display.input.onContextMenu(e);
    }
  }
  function contextMenuInGutter(cm, e) {
    if (!hasHandler(cm, "gutterContextMenu")) {
      return false;
    }
    return gutterEvent(cm, e, "gutterContextMenu", false);
  }
  function themeChanged(cm) {
    cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
    clearCaches(cm);
  }
  var Init = { toString: function() {
    return "CodeMirror.Init";
  } };
  var defaults = {};
  var optionHandlers = {};
  function defineOptions(CodeMirror3) {
    var optionHandlers2 = CodeMirror3.optionHandlers;
    function option(name, deflt, handle, notOnInit) {
      CodeMirror3.defaults[name] = deflt;
      if (handle) {
        optionHandlers2[name] = notOnInit ? function(cm, val, old) {
          if (old != Init) {
            handle(cm, val, old);
          }
        } : handle;
      }
    }
    CodeMirror3.defineOption = option;
    CodeMirror3.Init = Init;
    option("value", "", function(cm, val) {
      return cm.setValue(val);
    }, true);
    option("mode", null, function(cm, val) {
      cm.doc.modeOption = val;
      loadMode(cm);
    }, true);
    option("indentUnit", 2, loadMode, true);
    option("indentWithTabs", false);
    option("smartIndent", true);
    option("tabSize", 4, function(cm) {
      resetModeState(cm);
      clearCaches(cm);
      regChange(cm);
    }, true);
    option("lineSeparator", null, function(cm, val) {
      cm.doc.lineSep = val;
      if (!val) {
        return;
      }
      var newBreaks = [], lineNo2 = cm.doc.first;
      cm.doc.iter(function(line) {
        for (var pos = 0; ; ) {
          var found = line.text.indexOf(val, pos);
          if (found == -1) {
            break;
          }
          pos = found + val.length;
          newBreaks.push(Pos(lineNo2, found));
        }
        lineNo2++;
      });
      for (var i2 = newBreaks.length - 1; i2 >= 0; i2--) {
        replaceRange(cm.doc, val, newBreaks[i2], Pos(newBreaks[i2].line, newBreaks[i2].ch + val.length));
      }
    });
    option("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g, function(cm, val, old) {
      cm.state.specialChars = new RegExp(val.source + (val.test("	") ? "" : "|	"), "g");
      if (old != Init) {
        cm.refresh();
      }
    });
    option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function(cm) {
      return cm.refresh();
    }, true);
    option("electricChars", true);
    option("inputStyle", mobile ? "contenteditable" : "textarea", function() {
      throw new Error("inputStyle can not (yet) be changed in a running editor");
    }, true);
    option("spellcheck", false, function(cm, val) {
      return cm.getInputField().spellcheck = val;
    }, true);
    option("autocorrect", false, function(cm, val) {
      return cm.getInputField().autocorrect = val;
    }, true);
    option("autocapitalize", false, function(cm, val) {
      return cm.getInputField().autocapitalize = val;
    }, true);
    option("rtlMoveVisually", !windows);
    option("wholeLineUpdateBefore", true);
    option("theme", "default", function(cm) {
      themeChanged(cm);
      updateGutters(cm);
    }, true);
    option("keyMap", "default", function(cm, val, old) {
      var next = getKeyMap(val);
      var prev = old != Init && getKeyMap(old);
      if (prev && prev.detach) {
        prev.detach(cm, next);
      }
      if (next.attach) {
        next.attach(cm, prev || null);
      }
    });
    option("extraKeys", null);
    option("configureMouse", null);
    option("lineWrapping", false, wrappingChanged, true);
    option("gutters", [], function(cm, val) {
      cm.display.gutterSpecs = getGutters(val, cm.options.lineNumbers);
      updateGutters(cm);
    }, true);
    option("fixedGutter", true, function(cm, val) {
      cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" : "0";
      cm.refresh();
    }, true);
    option("coverGutterNextToScrollbar", false, function(cm) {
      return updateScrollbars(cm);
    }, true);
    option("scrollbarStyle", "native", function(cm) {
      initScrollbars(cm);
      updateScrollbars(cm);
      cm.display.scrollbars.setScrollTop(cm.doc.scrollTop);
      cm.display.scrollbars.setScrollLeft(cm.doc.scrollLeft);
    }, true);
    option("lineNumbers", false, function(cm, val) {
      cm.display.gutterSpecs = getGutters(cm.options.gutters, val);
      updateGutters(cm);
    }, true);
    option("firstLineNumber", 1, updateGutters, true);
    option("lineNumberFormatter", function(integer) {
      return integer;
    }, updateGutters, true);
    option("showCursorWhenSelecting", false, updateSelection, true);
    option("resetSelectionOnContextMenu", true);
    option("lineWiseCopyCut", true);
    option("pasteLinesPerSelection", true);
    option("selectionsMayTouch", false);
    option("readOnly", false, function(cm, val) {
      if (val == "nocursor") {
        onBlur(cm);
        cm.display.input.blur();
      }
      cm.display.input.readOnlyChanged(val);
    });
    option("screenReaderLabel", null, function(cm, val) {
      val = val === "" ? null : val;
      cm.display.input.screenReaderLabelChanged(val);
    });
    option("disableInput", false, function(cm, val) {
      if (!val) {
        cm.display.input.reset();
      }
    }, true);
    option("dragDrop", true, dragDropChanged);
    option("allowDropFileTypes", null);
    option("cursorBlinkRate", 530);
    option("cursorScrollMargin", 0);
    option("cursorHeight", 1, updateSelection, true);
    option("singleCursorHeightPerLine", true, updateSelection, true);
    option("workTime", 100);
    option("workDelay", 100);
    option("flattenSpans", true, resetModeState, true);
    option("addModeClass", false, resetModeState, true);
    option("pollInterval", 100);
    option("undoDepth", 200, function(cm, val) {
      return cm.doc.history.undoDepth = val;
    });
    option("historyEventDelay", 1250);
    option("viewportMargin", 10, function(cm) {
      return cm.refresh();
    }, true);
    option("maxHighlightLength", 1e4, resetModeState, true);
    option("moveInputWithCursor", true, function(cm, val) {
      if (!val) {
        cm.display.input.resetPosition();
      }
    });
    option("tabindex", null, function(cm, val) {
      return cm.display.input.getField().tabIndex = val || "";
    });
    option("autofocus", null);
    option("direction", "ltr", function(cm, val) {
      return cm.doc.setDirection(val);
    }, true);
    option("phrases", null);
  }
  function dragDropChanged(cm, value, old) {
    var wasOn = old && old != Init;
    if (!value != !wasOn) {
      var funcs = cm.display.dragFunctions;
      var toggle = value ? on : off;
      toggle(cm.display.scroller, "dragstart", funcs.start);
      toggle(cm.display.scroller, "dragenter", funcs.enter);
      toggle(cm.display.scroller, "dragover", funcs.over);
      toggle(cm.display.scroller, "dragleave", funcs.leave);
      toggle(cm.display.scroller, "drop", funcs.drop);
    }
  }
  function wrappingChanged(cm) {
    if (cm.options.lineWrapping) {
      addClass(cm.display.wrapper, "CodeMirror-wrap");
      cm.display.sizer.style.minWidth = "";
      cm.display.sizerWidth = null;
    } else {
      rmClass(cm.display.wrapper, "CodeMirror-wrap");
      findMaxLine(cm);
    }
    estimateLineHeights(cm);
    regChange(cm);
    clearCaches(cm);
    setTimeout(function() {
      return updateScrollbars(cm);
    }, 100);
  }
  function CodeMirror2(place, options) {
    var this$1 = this;
    if (!(this instanceof CodeMirror2)) {
      return new CodeMirror2(place, options);
    }
    this.options = options = options ? copyObj(options) : {};
    copyObj(defaults, options, false);
    var doc2 = options.value;
    if (typeof doc2 == "string") {
      doc2 = new Doc(doc2, options.mode, null, options.lineSeparator, options.direction);
    } else if (options.mode) {
      doc2.modeOption = options.mode;
    }
    this.doc = doc2;
    var input = new CodeMirror2.inputStyles[options.inputStyle](this);
    var display = this.display = new Display(place, doc2, input, options);
    display.wrapper.CodeMirror = this;
    themeChanged(this);
    if (options.lineWrapping) {
      this.display.wrapper.className += " CodeMirror-wrap";
    }
    initScrollbars(this);
    this.state = {
      keyMaps: [],
      // stores maps added by addKeyMap
      overlays: [],
      // highlighting overlays, as added by addOverlay
      modeGen: 0,
      // bumped when mode/overlay changes, used to invalidate highlighting info
      overwrite: false,
      delayingBlurEvent: false,
      focused: false,
      suppressEdits: false,
      // used to disable editing during key handlers when in readOnly mode
      pasteIncoming: -1,
      cutIncoming: -1,
      // help recognize paste/cut edits in input.poll
      selectingText: false,
      draggingText: false,
      highlight: new Delayed(),
      // stores highlight worker timeout
      keySeq: null,
      // Unfinished key sequence
      specialChars: null
    };
    if (options.autofocus && !mobile) {
      display.input.focus();
    }
    if (ie && ie_version < 11) {
      setTimeout(function() {
        return this$1.display.input.reset(true);
      }, 20);
    }
    registerEventHandlers(this);
    ensureGlobalHandlers();
    startOperation(this);
    this.curOp.forceUpdate = true;
    attachDoc(this, doc2);
    if (options.autofocus && !mobile || this.hasFocus()) {
      setTimeout(function() {
        if (this$1.hasFocus() && !this$1.state.focused) {
          onFocus(this$1);
        }
      }, 20);
    } else {
      onBlur(this);
    }
    for (var opt in optionHandlers) {
      if (optionHandlers.hasOwnProperty(opt)) {
        optionHandlers[opt](this, options[opt], Init);
      }
    }
    maybeUpdateLineNumberWidth(this);
    if (options.finishInit) {
      options.finishInit(this);
    }
    for (var i2 = 0; i2 < initHooks.length; ++i2) {
      initHooks[i2](this);
    }
    endOperation(this);
    if (webkit && options.lineWrapping && getComputedStyle(display.lineDiv).textRendering == "optimizelegibility") {
      display.lineDiv.style.textRendering = "auto";
    }
  }
  CodeMirror2.defaults = defaults;
  CodeMirror2.optionHandlers = optionHandlers;
  function registerEventHandlers(cm) {
    var d = cm.display;
    on(d.scroller, "mousedown", operation(cm, onMouseDown));
    if (ie && ie_version < 11) {
      on(d.scroller, "dblclick", operation(cm, function(e) {
        if (signalDOMEvent(cm, e)) {
          return;
        }
        var pos = posFromMouse(cm, e);
        if (!pos || clickInGutter(cm, e) || eventInWidget(cm.display, e)) {
          return;
        }
        e_preventDefault(e);
        var word = cm.findWordAt(pos);
        extendSelection(cm.doc, word.anchor, word.head);
      }));
    } else {
      on(d.scroller, "dblclick", function(e) {
        return signalDOMEvent(cm, e) || e_preventDefault(e);
      });
    }
    on(d.scroller, "contextmenu", function(e) {
      return onContextMenu(cm, e);
    });
    on(d.input.getField(), "contextmenu", function(e) {
      if (!d.scroller.contains(e.target)) {
        onContextMenu(cm, e);
      }
    });
    var touchFinished, prevTouch = { end: 0 };
    function finishTouch() {
      if (d.activeTouch) {
        touchFinished = setTimeout(function() {
          return d.activeTouch = null;
        }, 1e3);
        prevTouch = d.activeTouch;
        prevTouch.end = +/* @__PURE__ */ new Date();
      }
    }
    function isMouseLikeTouchEvent(e) {
      if (e.touches.length != 1) {
        return false;
      }
      var touch = e.touches[0];
      return touch.radiusX <= 1 && touch.radiusY <= 1;
    }
    function farAway(touch, other) {
      if (other.left == null) {
        return true;
      }
      var dx = other.left - touch.left, dy = other.top - touch.top;
      return dx * dx + dy * dy > 20 * 20;
    }
    on(d.scroller, "touchstart", function(e) {
      if (!signalDOMEvent(cm, e) && !isMouseLikeTouchEvent(e) && !clickInGutter(cm, e)) {
        d.input.ensurePolled();
        clearTimeout(touchFinished);
        var now = +/* @__PURE__ */ new Date();
        d.activeTouch = {
          start: now,
          moved: false,
          prev: now - prevTouch.end <= 300 ? prevTouch : null
        };
        if (e.touches.length == 1) {
          d.activeTouch.left = e.touches[0].pageX;
          d.activeTouch.top = e.touches[0].pageY;
        }
      }
    });
    on(d.scroller, "touchmove", function() {
      if (d.activeTouch) {
        d.activeTouch.moved = true;
      }
    });
    on(d.scroller, "touchend", function(e) {
      var touch = d.activeTouch;
      if (touch && !eventInWidget(d, e) && touch.left != null && !touch.moved && /* @__PURE__ */ new Date() - touch.start < 300) {
        var pos = cm.coordsChar(d.activeTouch, "page"), range2;
        if (!touch.prev || farAway(touch, touch.prev)) {
          range2 = new Range(pos, pos);
        } else if (!touch.prev.prev || farAway(touch, touch.prev.prev)) {
          range2 = cm.findWordAt(pos);
        } else {
          range2 = new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0)));
        }
        cm.setSelection(range2.anchor, range2.head);
        cm.focus();
        e_preventDefault(e);
      }
      finishTouch();
    });
    on(d.scroller, "touchcancel", finishTouch);
    on(d.scroller, "scroll", function() {
      if (d.scroller.clientHeight) {
        updateScrollTop(cm, d.scroller.scrollTop);
        setScrollLeft(cm, d.scroller.scrollLeft, true);
        signal(cm, "scroll", cm);
      }
    });
    on(d.scroller, "mousewheel", function(e) {
      return onScrollWheel(cm, e);
    });
    on(d.scroller, "DOMMouseScroll", function(e) {
      return onScrollWheel(cm, e);
    });
    on(d.wrapper, "scroll", function() {
      return d.wrapper.scrollTop = d.wrapper.scrollLeft = 0;
    });
    d.dragFunctions = {
      enter: function(e) {
        if (!signalDOMEvent(cm, e)) {
          e_stop(e);
        }
      },
      over: function(e) {
        if (!signalDOMEvent(cm, e)) {
          onDragOver(cm, e);
          e_stop(e);
        }
      },
      start: function(e) {
        return onDragStart(cm, e);
      },
      drop: operation(cm, onDrop),
      leave: function(e) {
        if (!signalDOMEvent(cm, e)) {
          clearDragCursor(cm);
        }
      }
    };
    var inp = d.input.getField();
    on(inp, "keyup", function(e) {
      return onKeyUp.call(cm, e);
    });
    on(inp, "keydown", operation(cm, onKeyDown));
    on(inp, "keypress", operation(cm, onKeyPress));
    on(inp, "focus", function(e) {
      return onFocus(cm, e);
    });
    on(inp, "blur", function(e) {
      return onBlur(cm, e);
    });
  }
  var initHooks = [];
  CodeMirror2.defineInitHook = function(f) {
    return initHooks.push(f);
  };
  function indentLine(cm, n, how, aggressive) {
    var doc2 = cm.doc, state;
    if (how == null) {
      how = "add";
    }
    if (how == "smart") {
      if (!doc2.mode.indent) {
        how = "prev";
      } else {
        state = getContextBefore(cm, n).state;
      }
    }
    var tabSize = cm.options.tabSize;
    var line = getLine(doc2, n), curSpace = countColumn(line.text, null, tabSize);
    if (line.stateAfter) {
      line.stateAfter = null;
    }
    var curSpaceString = line.text.match(/^\s*/)[0], indentation;
    if (!aggressive && !/\S/.test(line.text)) {
      indentation = 0;
      how = "not";
    } else if (how == "smart") {
      indentation = doc2.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
      if (indentation == Pass || indentation > 150) {
        if (!aggressive) {
          return;
        }
        how = "prev";
      }
    }
    if (how == "prev") {
      if (n > doc2.first) {
        indentation = countColumn(getLine(doc2, n - 1).text, null, tabSize);
      } else {
        indentation = 0;
      }
    } else if (how == "add") {
      indentation = curSpace + cm.options.indentUnit;
    } else if (how == "subtract") {
      indentation = curSpace - cm.options.indentUnit;
    } else if (typeof how == "number") {
      indentation = curSpace + how;
    }
    indentation = Math.max(0, indentation);
    var indentString = "", pos = 0;
    if (cm.options.indentWithTabs) {
      for (var i2 = Math.floor(indentation / tabSize); i2; --i2) {
        pos += tabSize;
        indentString += "	";
      }
    }
    if (pos < indentation) {
      indentString += spaceStr(indentation - pos);
    }
    if (indentString != curSpaceString) {
      replaceRange(doc2, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input");
      line.stateAfter = null;
      return true;
    } else {
      for (var i$12 = 0; i$12 < doc2.sel.ranges.length; i$12++) {
        var range2 = doc2.sel.ranges[i$12];
        if (range2.head.line == n && range2.head.ch < curSpaceString.length) {
          var pos$1 = Pos(n, curSpaceString.length);
          replaceOneSelection(doc2, i$12, new Range(pos$1, pos$1));
          break;
        }
      }
    }
  }
  var lastCopied = null;
  function setLastCopied(newLastCopied) {
    lastCopied = newLastCopied;
  }
  function applyTextInput(cm, inserted, deleted, sel, origin) {
    var doc2 = cm.doc;
    cm.display.shift = false;
    if (!sel) {
      sel = doc2.sel;
    }
    var recent = +/* @__PURE__ */ new Date() - 200;
    var paste = origin == "paste" || cm.state.pasteIncoming > recent;
    var textLines = splitLinesAuto(inserted), multiPaste = null;
    if (paste && sel.ranges.length > 1) {
      if (lastCopied && lastCopied.text.join("\n") == inserted) {
        if (sel.ranges.length % lastCopied.text.length == 0) {
          multiPaste = [];
          for (var i2 = 0; i2 < lastCopied.text.length; i2++) {
            multiPaste.push(doc2.splitLines(lastCopied.text[i2]));
          }
        }
      } else if (textLines.length == sel.ranges.length && cm.options.pasteLinesPerSelection) {
        multiPaste = map(textLines, function(l) {
          return [l];
        });
      }
    }
    var updateInput = cm.curOp.updateInput;
    for (var i$12 = sel.ranges.length - 1; i$12 >= 0; i$12--) {
      var range2 = sel.ranges[i$12];
      var from = range2.from(), to = range2.to();
      if (range2.empty()) {
        if (deleted && deleted > 0) {
          from = Pos(from.line, from.ch - deleted);
        } else if (cm.state.overwrite && !paste) {
          to = Pos(to.line, Math.min(getLine(doc2, to.line).text.length, to.ch + lst(textLines).length));
        } else if (paste && lastCopied && lastCopied.lineWise && lastCopied.text.join("\n") == textLines.join("\n")) {
          from = to = Pos(from.line, 0);
        }
      }
      var changeEvent = {
        from,
        to,
        text: multiPaste ? multiPaste[i$12 % multiPaste.length] : textLines,
        origin: origin || (paste ? "paste" : cm.state.cutIncoming > recent ? "cut" : "+input")
      };
      makeChange(cm.doc, changeEvent);
      signalLater(cm, "inputRead", cm, changeEvent);
    }
    if (inserted && !paste) {
      triggerElectric(cm, inserted);
    }
    ensureCursorVisible(cm);
    if (cm.curOp.updateInput < 2) {
      cm.curOp.updateInput = updateInput;
    }
    cm.curOp.typing = true;
    cm.state.pasteIncoming = cm.state.cutIncoming = -1;
  }
  function handlePaste(e, cm) {
    var pasted = e.clipboardData && e.clipboardData.getData("Text");
    if (pasted) {
      e.preventDefault();
      if (!cm.isReadOnly() && !cm.options.disableInput && cm.hasFocus()) {
        runInOp(cm, function() {
          return applyTextInput(cm, pasted, 0, null, "paste");
        });
      }
      return true;
    }
  }
  function triggerElectric(cm, inserted) {
    if (!cm.options.electricChars || !cm.options.smartIndent) {
      return;
    }
    var sel = cm.doc.sel;
    for (var i2 = sel.ranges.length - 1; i2 >= 0; i2--) {
      var range2 = sel.ranges[i2];
      if (range2.head.ch > 100 || i2 && sel.ranges[i2 - 1].head.line == range2.head.line) {
        continue;
      }
      var mode = cm.getModeAt(range2.head);
      var indented = false;
      if (mode.electricChars) {
        for (var j = 0; j < mode.electricChars.length; j++) {
          if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
            indented = indentLine(cm, range2.head.line, "smart");
            break;
          }
        }
      } else if (mode.electricInput) {
        if (mode.electricInput.test(getLine(cm.doc, range2.head.line).text.slice(0, range2.head.ch))) {
          indented = indentLine(cm, range2.head.line, "smart");
        }
      }
      if (indented) {
        signalLater(cm, "electricInput", cm, range2.head.line);
      }
    }
  }
  function copyableRanges(cm) {
    var text = [], ranges = [];
    for (var i2 = 0; i2 < cm.doc.sel.ranges.length; i2++) {
      var line = cm.doc.sel.ranges[i2].head.line;
      var lineRange = { anchor: Pos(line, 0), head: Pos(line + 1, 0) };
      ranges.push(lineRange);
      text.push(cm.getRange(lineRange.anchor, lineRange.head));
    }
    return { text, ranges };
  }
  function disableBrowserMagic(field, spellcheck, autocorrect, autocapitalize) {
    field.setAttribute("autocorrect", autocorrect ? "on" : "off");
    field.setAttribute("autocapitalize", autocapitalize ? "on" : "off");
    field.setAttribute("spellcheck", !!spellcheck);
  }
  function hiddenTextarea() {
    var te = elt("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none");
    var div = elt("div", [te], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
    if (webkit) {
      te.style.width = "1000px";
    } else {
      te.setAttribute("wrap", "off");
    }
    if (ios) {
      te.style.border = "1px solid black";
    }
    return div;
  }
  function addEditorMethods(CodeMirror3) {
    var optionHandlers2 = CodeMirror3.optionHandlers;
    var helpers = CodeMirror3.helpers = {};
    CodeMirror3.prototype = {
      constructor: CodeMirror3,
      focus: function() {
        win(this).focus();
        this.display.input.focus();
      },
      setOption: function(option, value) {
        var options = this.options, old = options[option];
        if (options[option] == value && option != "mode") {
          return;
        }
        options[option] = value;
        if (optionHandlers2.hasOwnProperty(option)) {
          operation(this, optionHandlers2[option])(this, value, old);
        }
        signal(this, "optionChange", this, option);
      },
      getOption: function(option) {
        return this.options[option];
      },
      getDoc: function() {
        return this.doc;
      },
      addKeyMap: function(map2, bottom) {
        this.state.keyMaps[bottom ? "push" : "unshift"](getKeyMap(map2));
      },
      removeKeyMap: function(map2) {
        var maps = this.state.keyMaps;
        for (var i2 = 0; i2 < maps.length; ++i2) {
          if (maps[i2] == map2 || maps[i2].name == map2) {
            maps.splice(i2, 1);
            return true;
          }
        }
      },
      addOverlay: methodOp(function(spec, options) {
        var mode = spec.token ? spec : CodeMirror3.getMode(this.options, spec);
        if (mode.startState) {
          throw new Error("Overlays may not be stateful.");
        }
        insertSorted(
          this.state.overlays,
          {
            mode,
            modeSpec: spec,
            opaque: options && options.opaque,
            priority: options && options.priority || 0
          },
          function(overlay) {
            return overlay.priority;
          }
        );
        this.state.modeGen++;
        regChange(this);
      }),
      removeOverlay: methodOp(function(spec) {
        var overlays = this.state.overlays;
        for (var i2 = 0; i2 < overlays.length; ++i2) {
          var cur = overlays[i2].modeSpec;
          if (cur == spec || typeof spec == "string" && cur.name == spec) {
            overlays.splice(i2, 1);
            this.state.modeGen++;
            regChange(this);
            return;
          }
        }
      }),
      indentLine: methodOp(function(n, dir, aggressive) {
        if (typeof dir != "string" && typeof dir != "number") {
          if (dir == null) {
            dir = this.options.smartIndent ? "smart" : "prev";
          } else {
            dir = dir ? "add" : "subtract";
          }
        }
        if (isLine(this.doc, n)) {
          indentLine(this, n, dir, aggressive);
        }
      }),
      indentSelection: methodOp(function(how) {
        var ranges = this.doc.sel.ranges, end = -1;
        for (var i2 = 0; i2 < ranges.length; i2++) {
          var range2 = ranges[i2];
          if (!range2.empty()) {
            var from = range2.from(), to = range2.to();
            var start = Math.max(end, from.line);
            end = Math.min(this.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
            for (var j = start; j < end; ++j) {
              indentLine(this, j, how);
            }
            var newRanges = this.doc.sel.ranges;
            if (from.ch == 0 && ranges.length == newRanges.length && newRanges[i2].from().ch > 0) {
              replaceOneSelection(this.doc, i2, new Range(from, newRanges[i2].to()), sel_dontScroll);
            }
          } else if (range2.head.line > end) {
            indentLine(this, range2.head.line, how, true);
            end = range2.head.line;
            if (i2 == this.doc.sel.primIndex) {
              ensureCursorVisible(this);
            }
          }
        }
      }),
      // Fetch the parser token for a given character. Useful for hacks
      // that want to inspect the mode state (say, for completion).
      getTokenAt: function(pos, precise) {
        return takeToken(this, pos, precise);
      },
      getLineTokens: function(line, precise) {
        return takeToken(this, Pos(line), precise, true);
      },
      getTokenTypeAt: function(pos) {
        pos = clipPos(this.doc, pos);
        var styles = getLineStyles(this, getLine(this.doc, pos.line));
        var before = 0, after = (styles.length - 1) / 2, ch = pos.ch;
        var type;
        if (ch == 0) {
          type = styles[2];
        } else {
          for (; ; ) {
            var mid = before + after >> 1;
            if ((mid ? styles[mid * 2 - 1] : 0) >= ch) {
              after = mid;
            } else if (styles[mid * 2 + 1] < ch) {
              before = mid + 1;
            } else {
              type = styles[mid * 2 + 2];
              break;
            }
          }
        }
        var cut = type ? type.indexOf("overlay ") : -1;
        return cut < 0 ? type : cut == 0 ? null : type.slice(0, cut - 1);
      },
      getModeAt: function(pos) {
        var mode = this.doc.mode;
        if (!mode.innerMode) {
          return mode;
        }
        return CodeMirror3.innerMode(mode, this.getTokenAt(pos).state).mode;
      },
      getHelper: function(pos, type) {
        return this.getHelpers(pos, type)[0];
      },
      getHelpers: function(pos, type) {
        var found = [];
        if (!helpers.hasOwnProperty(type)) {
          return found;
        }
        var help = helpers[type], mode = this.getModeAt(pos);
        if (typeof mode[type] == "string") {
          if (help[mode[type]]) {
            found.push(help[mode[type]]);
          }
        } else if (mode[type]) {
          for (var i2 = 0; i2 < mode[type].length; i2++) {
            var val = help[mode[type][i2]];
            if (val) {
              found.push(val);
            }
          }
        } else if (mode.helperType && help[mode.helperType]) {
          found.push(help[mode.helperType]);
        } else if (help[mode.name]) {
          found.push(help[mode.name]);
        }
        for (var i$12 = 0; i$12 < help._global.length; i$12++) {
          var cur = help._global[i$12];
          if (cur.pred(mode, this) && indexOf(found, cur.val) == -1) {
            found.push(cur.val);
          }
        }
        return found;
      },
      getStateAfter: function(line, precise) {
        var doc2 = this.doc;
        line = clipLine(doc2, line == null ? doc2.first + doc2.size - 1 : line);
        return getContextBefore(this, line + 1, precise).state;
      },
      cursorCoords: function(start, mode) {
        var pos, range2 = this.doc.sel.primary();
        if (start == null) {
          pos = range2.head;
        } else if (typeof start == "object") {
          pos = clipPos(this.doc, start);
        } else {
          pos = start ? range2.from() : range2.to();
        }
        return cursorCoords(this, pos, mode || "page");
      },
      charCoords: function(pos, mode) {
        return charCoords(this, clipPos(this.doc, pos), mode || "page");
      },
      coordsChar: function(coords, mode) {
        coords = fromCoordSystem(this, coords, mode || "page");
        return coordsChar(this, coords.left, coords.top);
      },
      lineAtHeight: function(height, mode) {
        height = fromCoordSystem(this, { top: height, left: 0 }, mode || "page").top;
        return lineAtHeight(this.doc, height + this.display.viewOffset);
      },
      heightAtLine: function(line, mode, includeWidgets) {
        var end = false, lineObj;
        if (typeof line == "number") {
          var last = this.doc.first + this.doc.size - 1;
          if (line < this.doc.first) {
            line = this.doc.first;
          } else if (line > last) {
            line = last;
            end = true;
          }
          lineObj = getLine(this.doc, line);
        } else {
          lineObj = line;
        }
        return intoCoordSystem(this, lineObj, { top: 0, left: 0 }, mode || "page", includeWidgets || end).top + (end ? this.doc.height - heightAtLine(lineObj) : 0);
      },
      defaultTextHeight: function() {
        return textHeight(this.display);
      },
      defaultCharWidth: function() {
        return charWidth(this.display);
      },
      getViewport: function() {
        return { from: this.display.viewFrom, to: this.display.viewTo };
      },
      addWidget: function(pos, node, scroll, vert, horiz) {
        var display = this.display;
        pos = cursorCoords(this, clipPos(this.doc, pos));
        var top = pos.bottom, left = pos.left;
        node.style.position = "absolute";
        node.setAttribute("cm-ignore-events", "true");
        this.display.input.setUneditable(node);
        display.sizer.appendChild(node);
        if (vert == "over") {
          top = pos.top;
        } else if (vert == "above" || vert == "near") {
          var vspace = Math.max(display.wrapper.clientHeight, this.doc.height), hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
          if ((vert == "above" || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight) {
            top = pos.top - node.offsetHeight;
          } else if (pos.bottom + node.offsetHeight <= vspace) {
            top = pos.bottom;
          }
          if (left + node.offsetWidth > hspace) {
            left = hspace - node.offsetWidth;
          }
        }
        node.style.top = top + "px";
        node.style.left = node.style.right = "";
        if (horiz == "right") {
          left = display.sizer.clientWidth - node.offsetWidth;
          node.style.right = "0px";
        } else {
          if (horiz == "left") {
            left = 0;
          } else if (horiz == "middle") {
            left = (display.sizer.clientWidth - node.offsetWidth) / 2;
          }
          node.style.left = left + "px";
        }
        if (scroll) {
          scrollIntoView(this, { left, top, right: left + node.offsetWidth, bottom: top + node.offsetHeight });
        }
      },
      triggerOnKeyDown: methodOp(onKeyDown),
      triggerOnKeyPress: methodOp(onKeyPress),
      triggerOnKeyUp: onKeyUp,
      triggerOnMouseDown: methodOp(onMouseDown),
      execCommand: function(cmd) {
        if (commands.hasOwnProperty(cmd)) {
          return commands[cmd].call(null, this);
        }
      },
      triggerElectric: methodOp(function(text) {
        triggerElectric(this, text);
      }),
      findPosH: function(from, amount, unit, visually) {
        var dir = 1;
        if (amount < 0) {
          dir = -1;
          amount = -amount;
        }
        var cur = clipPos(this.doc, from);
        for (var i2 = 0; i2 < amount; ++i2) {
          cur = findPosH(this.doc, cur, dir, unit, visually);
          if (cur.hitSide) {
            break;
          }
        }
        return cur;
      },
      moveH: methodOp(function(dir, unit) {
        var this$1 = this;
        this.extendSelectionsBy(function(range2) {
          if (this$1.display.shift || this$1.doc.extend || range2.empty()) {
            return findPosH(this$1.doc, range2.head, dir, unit, this$1.options.rtlMoveVisually);
          } else {
            return dir < 0 ? range2.from() : range2.to();
          }
        }, sel_move);
      }),
      deleteH: methodOp(function(dir, unit) {
        var sel = this.doc.sel, doc2 = this.doc;
        if (sel.somethingSelected()) {
          doc2.replaceSelection("", null, "+delete");
        } else {
          deleteNearSelection(this, function(range2) {
            var other = findPosH(doc2, range2.head, dir, unit, false);
            return dir < 0 ? { from: other, to: range2.head } : { from: range2.head, to: other };
          });
        }
      }),
      findPosV: function(from, amount, unit, goalColumn) {
        var dir = 1, x = goalColumn;
        if (amount < 0) {
          dir = -1;
          amount = -amount;
        }
        var cur = clipPos(this.doc, from);
        for (var i2 = 0; i2 < amount; ++i2) {
          var coords = cursorCoords(this, cur, "div");
          if (x == null) {
            x = coords.left;
          } else {
            coords.left = x;
          }
          cur = findPosV(this, coords, dir, unit);
          if (cur.hitSide) {
            break;
          }
        }
        return cur;
      },
      moveV: methodOp(function(dir, unit) {
        var this$1 = this;
        var doc2 = this.doc, goals = [];
        var collapse = !this.display.shift && !doc2.extend && doc2.sel.somethingSelected();
        doc2.extendSelectionsBy(function(range2) {
          if (collapse) {
            return dir < 0 ? range2.from() : range2.to();
          }
          var headPos = cursorCoords(this$1, range2.head, "div");
          if (range2.goalColumn != null) {
            headPos.left = range2.goalColumn;
          }
          goals.push(headPos.left);
          var pos = findPosV(this$1, headPos, dir, unit);
          if (unit == "page" && range2 == doc2.sel.primary()) {
            addToScrollTop(this$1, charCoords(this$1, pos, "div").top - headPos.top);
          }
          return pos;
        }, sel_move);
        if (goals.length) {
          for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
            doc2.sel.ranges[i2].goalColumn = goals[i2];
          }
        }
      }),
      // Find the word at the given position (as returned by coordsChar).
      findWordAt: function(pos) {
        var doc2 = this.doc, line = getLine(doc2, pos.line).text;
        var start = pos.ch, end = pos.ch;
        if (line) {
          var helper = this.getHelper(pos, "wordChars");
          if ((pos.sticky == "before" || end == line.length) && start) {
            --start;
          } else {
            ++end;
          }
          var startChar = line.charAt(start);
          var check = isWordChar(startChar, helper) ? function(ch) {
            return isWordChar(ch, helper);
          } : /\s/.test(startChar) ? function(ch) {
            return /\s/.test(ch);
          } : function(ch) {
            return !/\s/.test(ch) && !isWordChar(ch);
          };
          while (start > 0 && check(line.charAt(start - 1))) {
            --start;
          }
          while (end < line.length && check(line.charAt(end))) {
            ++end;
          }
        }
        return new Range(Pos(pos.line, start), Pos(pos.line, end));
      },
      toggleOverwrite: function(value) {
        if (value != null && value == this.state.overwrite) {
          return;
        }
        if (this.state.overwrite = !this.state.overwrite) {
          addClass(this.display.cursorDiv, "CodeMirror-overwrite");
        } else {
          rmClass(this.display.cursorDiv, "CodeMirror-overwrite");
        }
        signal(this, "overwriteToggle", this, this.state.overwrite);
      },
      hasFocus: function() {
        return this.display.input.getField() == activeElt(root(this));
      },
      isReadOnly: function() {
        return !!(this.options.readOnly || this.doc.cantEdit);
      },
      scrollTo: methodOp(function(x, y) {
        scrollToCoords(this, x, y);
      }),
      getScrollInfo: function() {
        var scroller = this.display.scroller;
        return {
          left: scroller.scrollLeft,
          top: scroller.scrollTop,
          height: scroller.scrollHeight - scrollGap(this) - this.display.barHeight,
          width: scroller.scrollWidth - scrollGap(this) - this.display.barWidth,
          clientHeight: displayHeight(this),
          clientWidth: displayWidth(this)
        };
      },
      scrollIntoView: methodOp(function(range2, margin) {
        if (range2 == null) {
          range2 = { from: this.doc.sel.primary().head, to: null };
          if (margin == null) {
            margin = this.options.cursorScrollMargin;
          }
        } else if (typeof range2 == "number") {
          range2 = { from: Pos(range2, 0), to: null };
        } else if (range2.from == null) {
          range2 = { from: range2, to: null };
        }
        if (!range2.to) {
          range2.to = range2.from;
        }
        range2.margin = margin || 0;
        if (range2.from.line != null) {
          scrollToRange(this, range2);
        } else {
          scrollToCoordsRange(this, range2.from, range2.to, range2.margin);
        }
      }),
      setSize: methodOp(function(width, height) {
        var this$1 = this;
        var interpret = function(val) {
          return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val;
        };
        if (width != null) {
          this.display.wrapper.style.width = interpret(width);
        }
        if (height != null) {
          this.display.wrapper.style.height = interpret(height);
        }
        if (this.options.lineWrapping) {
          clearLineMeasurementCache(this);
        }
        var lineNo2 = this.display.viewFrom;
        this.doc.iter(lineNo2, this.display.viewTo, function(line) {
          if (line.widgets) {
            for (var i2 = 0; i2 < line.widgets.length; i2++) {
              if (line.widgets[i2].noHScroll) {
                regLineChange(this$1, lineNo2, "widget");
                break;
              }
            }
          }
          ++lineNo2;
        });
        this.curOp.forceUpdate = true;
        signal(this, "refresh", this);
      }),
      operation: function(f) {
        return runInOp(this, f);
      },
      startOperation: function() {
        return startOperation(this);
      },
      endOperation: function() {
        return endOperation(this);
      },
      refresh: methodOp(function() {
        var oldHeight = this.display.cachedTextHeight;
        regChange(this);
        this.curOp.forceUpdate = true;
        clearCaches(this);
        scrollToCoords(this, this.doc.scrollLeft, this.doc.scrollTop);
        updateGutterSpace(this.display);
        if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > 0.5 || this.options.lineWrapping) {
          estimateLineHeights(this);
        }
        signal(this, "refresh", this);
      }),
      swapDoc: methodOp(function(doc2) {
        var old = this.doc;
        old.cm = null;
        if (this.state.selectingText) {
          this.state.selectingText();
        }
        attachDoc(this, doc2);
        clearCaches(this);
        this.display.input.reset();
        scrollToCoords(this, doc2.scrollLeft, doc2.scrollTop);
        this.curOp.forceScroll = true;
        signalLater(this, "swapDoc", this, old);
        return old;
      }),
      phrase: function(phraseText) {
        var phrases = this.options.phrases;
        return phrases && Object.prototype.hasOwnProperty.call(phrases, phraseText) ? phrases[phraseText] : phraseText;
      },
      getInputField: function() {
        return this.display.input.getField();
      },
      getWrapperElement: function() {
        return this.display.wrapper;
      },
      getScrollerElement: function() {
        return this.display.scroller;
      },
      getGutterElement: function() {
        return this.display.gutters;
      }
    };
    eventMixin(CodeMirror3);
    CodeMirror3.registerHelper = function(type, name, value) {
      if (!helpers.hasOwnProperty(type)) {
        helpers[type] = CodeMirror3[type] = { _global: [] };
      }
      helpers[type][name] = value;
    };
    CodeMirror3.registerGlobalHelper = function(type, name, predicate, value) {
      CodeMirror3.registerHelper(type, name, value);
      helpers[type]._global.push({ pred: predicate, val: value });
    };
  }
  function findPosH(doc2, pos, dir, unit, visually) {
    var oldPos = pos;
    var origDir = dir;
    var lineObj = getLine(doc2, pos.line);
    var lineDir = visually && doc2.direction == "rtl" ? -dir : dir;
    function findNextLine() {
      var l = pos.line + lineDir;
      if (l < doc2.first || l >= doc2.first + doc2.size) {
        return false;
      }
      pos = new Pos(l, pos.ch, pos.sticky);
      return lineObj = getLine(doc2, l);
    }
    function moveOnce(boundToLine) {
      var next;
      if (unit == "codepoint") {
        var ch = lineObj.text.charCodeAt(pos.ch + (dir > 0 ? 0 : -1));
        if (isNaN(ch)) {
          next = null;
        } else {
          var astral = dir > 0 ? ch >= 55296 && ch < 56320 : ch >= 56320 && ch < 57343;
          next = new Pos(pos.line, Math.max(0, Math.min(lineObj.text.length, pos.ch + dir * (astral ? 2 : 1))), -dir);
        }
      } else if (visually) {
        next = moveVisually(doc2.cm, lineObj, pos, dir);
      } else {
        next = moveLogically(lineObj, pos, dir);
      }
      if (next == null) {
        if (!boundToLine && findNextLine()) {
          pos = endOfLine(visually, doc2.cm, lineObj, pos.line, lineDir);
        } else {
          return false;
        }
      } else {
        pos = next;
      }
      return true;
    }
    if (unit == "char" || unit == "codepoint") {
      moveOnce();
    } else if (unit == "column") {
      moveOnce(true);
    } else if (unit == "word" || unit == "group") {
      var sawType = null, group = unit == "group";
      var helper = doc2.cm && doc2.cm.getHelper(pos, "wordChars");
      for (var first = true; ; first = false) {
        if (dir < 0 && !moveOnce(!first)) {
          break;
        }
        var cur = lineObj.text.charAt(pos.ch) || "\n";
        var type = isWordChar(cur, helper) ? "w" : group && cur == "\n" ? "n" : !group || /\s/.test(cur) ? null : "p";
        if (group && !first && !type) {
          type = "s";
        }
        if (sawType && sawType != type) {
          if (dir < 0) {
            dir = 1;
            moveOnce();
            pos.sticky = "after";
          }
          break;
        }
        if (type) {
          sawType = type;
        }
        if (dir > 0 && !moveOnce(!first)) {
          break;
        }
      }
    }
    var result = skipAtomic(doc2, pos, oldPos, origDir, true);
    if (equalCursorPos(oldPos, result)) {
      result.hitSide = true;
    }
    return result;
  }
  function findPosV(cm, pos, dir, unit) {
    var doc2 = cm.doc, x = pos.left, y;
    if (unit == "page") {
      var pageSize = Math.min(cm.display.wrapper.clientHeight, win(cm).innerHeight || doc2(cm).documentElement.clientHeight);
      var moveAmount = Math.max(pageSize - 0.5 * textHeight(cm.display), 3);
      y = (dir > 0 ? pos.bottom : pos.top) + dir * moveAmount;
    } else if (unit == "line") {
      y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
    }
    var target;
    for (; ; ) {
      target = coordsChar(cm, x, y);
      if (!target.outside) {
        break;
      }
      if (dir < 0 ? y <= 0 : y >= doc2.height) {
        target.hitSide = true;
        break;
      }
      y += dir * 5;
    }
    return target;
  }
  var ContentEditableInput = function(cm) {
    this.cm = cm;
    this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
    this.polling = new Delayed();
    this.composing = null;
    this.gracePeriod = false;
    this.readDOMTimeout = null;
  };
  ContentEditableInput.prototype.init = function(display) {
    var this$1 = this;
    var input = this, cm = input.cm;
    var div = input.div = display.lineDiv;
    div.contentEditable = true;
    disableBrowserMagic(div, cm.options.spellcheck, cm.options.autocorrect, cm.options.autocapitalize);
    function belongsToInput(e) {
      for (var t = e.target; t; t = t.parentNode) {
        if (t == div) {
          return true;
        }
        if (/\bCodeMirror-(?:line)?widget\b/.test(t.className)) {
          break;
        }
      }
      return false;
    }
    on(div, "paste", function(e) {
      if (!belongsToInput(e) || signalDOMEvent(cm, e) || handlePaste(e, cm)) {
        return;
      }
      if (ie_version <= 11) {
        setTimeout(operation(cm, function() {
          return this$1.updateFromDOM();
        }), 20);
      }
    });
    on(div, "compositionstart", function(e) {
      this$1.composing = { data: e.data, done: false };
    });
    on(div, "compositionupdate", function(e) {
      if (!this$1.composing) {
        this$1.composing = { data: e.data, done: false };
      }
    });
    on(div, "compositionend", function(e) {
      if (this$1.composing) {
        if (e.data != this$1.composing.data) {
          this$1.readFromDOMSoon();
        }
        this$1.composing.done = true;
      }
    });
    on(div, "touchstart", function() {
      return input.forceCompositionEnd();
    });
    on(div, "input", function() {
      if (!this$1.composing) {
        this$1.readFromDOMSoon();
      }
    });
    function onCopyCut(e) {
      if (!belongsToInput(e) || signalDOMEvent(cm, e)) {
        return;
      }
      if (cm.somethingSelected()) {
        setLastCopied({ lineWise: false, text: cm.getSelections() });
        if (e.type == "cut") {
          cm.replaceSelection("", null, "cut");
        }
      } else if (!cm.options.lineWiseCopyCut) {
        return;
      } else {
        var ranges = copyableRanges(cm);
        setLastCopied({ lineWise: true, text: ranges.text });
        if (e.type == "cut") {
          cm.operation(function() {
            cm.setSelections(ranges.ranges, 0, sel_dontScroll);
            cm.replaceSelection("", null, "cut");
          });
        }
      }
      if (e.clipboardData) {
        e.clipboardData.clearData();
        var content = lastCopied.text.join("\n");
        e.clipboardData.setData("Text", content);
        if (e.clipboardData.getData("Text") == content) {
          e.preventDefault();
          return;
        }
      }
      var kludge = hiddenTextarea(), te = kludge.firstChild;
      disableBrowserMagic(te);
      cm.display.lineSpace.insertBefore(kludge, cm.display.lineSpace.firstChild);
      te.value = lastCopied.text.join("\n");
      var hadFocus = activeElt(rootNode(div));
      selectInput(te);
      setTimeout(function() {
        cm.display.lineSpace.removeChild(kludge);
        hadFocus.focus();
        if (hadFocus == div) {
          input.showPrimarySelection();
        }
      }, 50);
    }
    on(div, "copy", onCopyCut);
    on(div, "cut", onCopyCut);
  };
  ContentEditableInput.prototype.screenReaderLabelChanged = function(label) {
    if (label) {
      this.div.setAttribute("aria-label", label);
    } else {
      this.div.removeAttribute("aria-label");
    }
  };
  ContentEditableInput.prototype.prepareSelection = function() {
    var result = prepareSelection(this.cm, false);
    result.focus = activeElt(rootNode(this.div)) == this.div;
    return result;
  };
  ContentEditableInput.prototype.showSelection = function(info, takeFocus) {
    if (!info || !this.cm.display.view.length) {
      return;
    }
    if (info.focus || takeFocus) {
      this.showPrimarySelection();
    }
    this.showMultipleSelections(info);
  };
  ContentEditableInput.prototype.getSelection = function() {
    return this.cm.display.wrapper.ownerDocument.getSelection();
  };
  ContentEditableInput.prototype.showPrimarySelection = function() {
    var sel = this.getSelection(), cm = this.cm, prim = cm.doc.sel.primary();
    var from = prim.from(), to = prim.to();
    if (cm.display.viewTo == cm.display.viewFrom || from.line >= cm.display.viewTo || to.line < cm.display.viewFrom) {
      sel.removeAllRanges();
      return;
    }
    var curAnchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
    var curFocus = domToPos(cm, sel.focusNode, sel.focusOffset);
    if (curAnchor && !curAnchor.bad && curFocus && !curFocus.bad && cmp(minPos(curAnchor, curFocus), from) == 0 && cmp(maxPos(curAnchor, curFocus), to) == 0) {
      return;
    }
    var view = cm.display.view;
    var start = from.line >= cm.display.viewFrom && posToDOM(cm, from) || { node: view[0].measure.map[2], offset: 0 };
    var end = to.line < cm.display.viewTo && posToDOM(cm, to);
    if (!end) {
      var measure = view[view.length - 1].measure;
      var map2 = measure.maps ? measure.maps[measure.maps.length - 1] : measure.map;
      end = { node: map2[map2.length - 1], offset: map2[map2.length - 2] - map2[map2.length - 3] };
    }
    if (!start || !end) {
      sel.removeAllRanges();
      return;
    }
    var old = sel.rangeCount && sel.getRangeAt(0), rng;
    try {
      rng = range(start.node, start.offset, end.offset, end.node);
    } catch (e) {
    }
    if (rng) {
      if (!gecko && cm.state.focused) {
        sel.collapse(start.node, start.offset);
        if (!rng.collapsed) {
          sel.removeAllRanges();
          sel.addRange(rng);
        }
      } else {
        sel.removeAllRanges();
        sel.addRange(rng);
      }
      if (old && sel.anchorNode == null) {
        sel.addRange(old);
      } else if (gecko) {
        this.startGracePeriod();
      }
    }
    this.rememberSelection();
  };
  ContentEditableInput.prototype.startGracePeriod = function() {
    var this$1 = this;
    clearTimeout(this.gracePeriod);
    this.gracePeriod = setTimeout(function() {
      this$1.gracePeriod = false;
      if (this$1.selectionChanged()) {
        this$1.cm.operation(function() {
          return this$1.cm.curOp.selectionChanged = true;
        });
      }
    }, 20);
  };
  ContentEditableInput.prototype.showMultipleSelections = function(info) {
    removeChildrenAndAdd(this.cm.display.cursorDiv, info.cursors);
    removeChildrenAndAdd(this.cm.display.selectionDiv, info.selection);
  };
  ContentEditableInput.prototype.rememberSelection = function() {
    var sel = this.getSelection();
    this.lastAnchorNode = sel.anchorNode;
    this.lastAnchorOffset = sel.anchorOffset;
    this.lastFocusNode = sel.focusNode;
    this.lastFocusOffset = sel.focusOffset;
  };
  ContentEditableInput.prototype.selectionInEditor = function() {
    var sel = this.getSelection();
    if (!sel.rangeCount) {
      return false;
    }
    var node = sel.getRangeAt(0).commonAncestorContainer;
    return contains(this.div, node);
  };
  ContentEditableInput.prototype.focus = function() {
    if (this.cm.options.readOnly != "nocursor") {
      if (!this.selectionInEditor() || activeElt(rootNode(this.div)) != this.div) {
        this.showSelection(this.prepareSelection(), true);
      }
      this.div.focus();
    }
  };
  ContentEditableInput.prototype.blur = function() {
    this.div.blur();
  };
  ContentEditableInput.prototype.getField = function() {
    return this.div;
  };
  ContentEditableInput.prototype.supportsTouch = function() {
    return true;
  };
  ContentEditableInput.prototype.receivedFocus = function() {
    var this$1 = this;
    var input = this;
    if (this.selectionInEditor()) {
      setTimeout(function() {
        return this$1.pollSelection();
      }, 20);
    } else {
      runInOp(this.cm, function() {
        return input.cm.curOp.selectionChanged = true;
      });
    }
    function poll() {
      if (input.cm.state.focused) {
        input.pollSelection();
        input.polling.set(input.cm.options.pollInterval, poll);
      }
    }
    this.polling.set(this.cm.options.pollInterval, poll);
  };
  ContentEditableInput.prototype.selectionChanged = function() {
    var sel = this.getSelection();
    return sel.anchorNode != this.lastAnchorNode || sel.anchorOffset != this.lastAnchorOffset || sel.focusNode != this.lastFocusNode || sel.focusOffset != this.lastFocusOffset;
  };
  ContentEditableInput.prototype.pollSelection = function() {
    if (this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged()) {
      return;
    }
    var sel = this.getSelection(), cm = this.cm;
    if (android && chrome && this.cm.display.gutterSpecs.length && isInGutter(sel.anchorNode)) {
      this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs });
      this.blur();
      this.focus();
      return;
    }
    if (this.composing) {
      return;
    }
    this.rememberSelection();
    var anchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
    var head = domToPos(cm, sel.focusNode, sel.focusOffset);
    if (anchor && head) {
      runInOp(cm, function() {
        setSelection(cm.doc, simpleSelection(anchor, head), sel_dontScroll);
        if (anchor.bad || head.bad) {
          cm.curOp.selectionChanged = true;
        }
      });
    }
  };
  ContentEditableInput.prototype.pollContent = function() {
    if (this.readDOMTimeout != null) {
      clearTimeout(this.readDOMTimeout);
      this.readDOMTimeout = null;
    }
    var cm = this.cm, display = cm.display, sel = cm.doc.sel.primary();
    var from = sel.from(), to = sel.to();
    if (from.ch == 0 && from.line > cm.firstLine()) {
      from = Pos(from.line - 1, getLine(cm.doc, from.line - 1).length);
    }
    if (to.ch == getLine(cm.doc, to.line).text.length && to.line < cm.lastLine()) {
      to = Pos(to.line + 1, 0);
    }
    if (from.line < display.viewFrom || to.line > display.viewTo - 1) {
      return false;
    }
    var fromIndex, fromLine, fromNode;
    if (from.line == display.viewFrom || (fromIndex = findViewIndex(cm, from.line)) == 0) {
      fromLine = lineNo(display.view[0].line);
      fromNode = display.view[0].node;
    } else {
      fromLine = lineNo(display.view[fromIndex].line);
      fromNode = display.view[fromIndex - 1].node.nextSibling;
    }
    var toIndex = findViewIndex(cm, to.line);
    var toLine, toNode;
    if (toIndex == display.view.length - 1) {
      toLine = display.viewTo - 1;
      toNode = display.lineDiv.lastChild;
    } else {
      toLine = lineNo(display.view[toIndex + 1].line) - 1;
      toNode = display.view[toIndex + 1].node.previousSibling;
    }
    if (!fromNode) {
      return false;
    }
    var newText = cm.doc.splitLines(domTextBetween(cm, fromNode, toNode, fromLine, toLine));
    var oldText = getBetween(cm.doc, Pos(fromLine, 0), Pos(toLine, getLine(cm.doc, toLine).text.length));
    while (newText.length > 1 && oldText.length > 1) {
      if (lst(newText) == lst(oldText)) {
        newText.pop();
        oldText.pop();
        toLine--;
      } else if (newText[0] == oldText[0]) {
        newText.shift();
        oldText.shift();
        fromLine++;
      } else {
        break;
      }
    }
    var cutFront = 0, cutEnd = 0;
    var newTop = newText[0], oldTop = oldText[0], maxCutFront = Math.min(newTop.length, oldTop.length);
    while (cutFront < maxCutFront && newTop.charCodeAt(cutFront) == oldTop.charCodeAt(cutFront)) {
      ++cutFront;
    }
    var newBot = lst(newText), oldBot = lst(oldText);
    var maxCutEnd = Math.min(
      newBot.length - (newText.length == 1 ? cutFront : 0),
      oldBot.length - (oldText.length == 1 ? cutFront : 0)
    );
    while (cutEnd < maxCutEnd && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
      ++cutEnd;
    }
    if (newText.length == 1 && oldText.length == 1 && fromLine == from.line) {
      while (cutFront && cutFront > from.ch && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
        cutFront--;
        cutEnd++;
      }
    }
    newText[newText.length - 1] = newBot.slice(0, newBot.length - cutEnd).replace(/^\u200b+/, "");
    newText[0] = newText[0].slice(cutFront).replace(/\u200b+$/, "");
    var chFrom = Pos(fromLine, cutFront);
    var chTo = Pos(toLine, oldText.length ? lst(oldText).length - cutEnd : 0);
    if (newText.length > 1 || newText[0] || cmp(chFrom, chTo)) {
      replaceRange(cm.doc, newText, chFrom, chTo, "+input");
      return true;
    }
  };
  ContentEditableInput.prototype.ensurePolled = function() {
    this.forceCompositionEnd();
  };
  ContentEditableInput.prototype.reset = function() {
    this.forceCompositionEnd();
  };
  ContentEditableInput.prototype.forceCompositionEnd = function() {
    if (!this.composing) {
      return;
    }
    clearTimeout(this.readDOMTimeout);
    this.composing = null;
    this.updateFromDOM();
    this.div.blur();
    this.div.focus();
  };
  ContentEditableInput.prototype.readFromDOMSoon = function() {
    var this$1 = this;
    if (this.readDOMTimeout != null) {
      return;
    }
    this.readDOMTimeout = setTimeout(function() {
      this$1.readDOMTimeout = null;
      if (this$1.composing) {
        if (this$1.composing.done) {
          this$1.composing = null;
        } else {
          return;
        }
      }
      this$1.updateFromDOM();
    }, 80);
  };
  ContentEditableInput.prototype.updateFromDOM = function() {
    var this$1 = this;
    if (this.cm.isReadOnly() || !this.pollContent()) {
      runInOp(this.cm, function() {
        return regChange(this$1.cm);
      });
    }
  };
  ContentEditableInput.prototype.setUneditable = function(node) {
    node.contentEditable = "false";
  };
  ContentEditableInput.prototype.onKeyPress = function(e) {
    if (e.charCode == 0 || this.composing) {
      return;
    }
    e.preventDefault();
    if (!this.cm.isReadOnly()) {
      operation(this.cm, applyTextInput)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0);
    }
  };
  ContentEditableInput.prototype.readOnlyChanged = function(val) {
    this.div.contentEditable = String(val != "nocursor");
  };
  ContentEditableInput.prototype.onContextMenu = function() {
  };
  ContentEditableInput.prototype.resetPosition = function() {
  };
  ContentEditableInput.prototype.needsContentAttribute = true;
  function posToDOM(cm, pos) {
    var view = findViewForLine(cm, pos.line);
    if (!view || view.hidden) {
      return null;
    }
    var line = getLine(cm.doc, pos.line);
    var info = mapFromLineView(view, line, pos.line);
    var order = getOrder(line, cm.doc.direction), side = "left";
    if (order) {
      var partPos = getBidiPartAt(order, pos.ch);
      side = partPos % 2 ? "right" : "left";
    }
    var result = nodeAndOffsetInLineMap(info.map, pos.ch, side);
    result.offset = result.collapse == "right" ? result.end : result.start;
    return result;
  }
  function isInGutter(node) {
    for (var scan = node; scan; scan = scan.parentNode) {
      if (/CodeMirror-gutter-wrapper/.test(scan.className)) {
        return true;
      }
    }
    return false;
  }
  function badPos(pos, bad) {
    if (bad) {
      pos.bad = true;
    }
    return pos;
  }
  function domTextBetween(cm, from, to, fromLine, toLine) {
    var text = "", closing = false, lineSep = cm.doc.lineSeparator(), extraLinebreak = false;
    function recognizeMarker(id) {
      return function(marker) {
        return marker.id == id;
      };
    }
    function close() {
      if (closing) {
        text += lineSep;
        if (extraLinebreak) {
          text += lineSep;
        }
        closing = extraLinebreak = false;
      }
    }
    function addText(str) {
      if (str) {
        close();
        text += str;
      }
    }
    function walk(node) {
      if (node.nodeType == 1) {
        var cmText = node.getAttribute("cm-text");
        if (cmText) {
          addText(cmText);
          return;
        }
        var markerID = node.getAttribute("cm-marker"), range2;
        if (markerID) {
          var found = cm.findMarks(Pos(fromLine, 0), Pos(toLine + 1, 0), recognizeMarker(+markerID));
          if (found.length && (range2 = found[0].find(0))) {
            addText(getBetween(cm.doc, range2.from, range2.to).join(lineSep));
          }
          return;
        }
        if (node.getAttribute("contenteditable") == "false") {
          return;
        }
        var isBlock = /^(pre|div|p|li|table|br)$/i.test(node.nodeName);
        if (!/^br$/i.test(node.nodeName) && node.textContent.length == 0) {
          return;
        }
        if (isBlock) {
          close();
        }
        for (var i2 = 0; i2 < node.childNodes.length; i2++) {
          walk(node.childNodes[i2]);
        }
        if (/^(pre|p)$/i.test(node.nodeName)) {
          extraLinebreak = true;
        }
        if (isBlock) {
          closing = true;
        }
      } else if (node.nodeType == 3) {
        addText(node.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
      }
    }
    for (; ; ) {
      walk(from);
      if (from == to) {
        break;
      }
      from = from.nextSibling;
      extraLinebreak = false;
    }
    return text;
  }
  function domToPos(cm, node, offset) {
    var lineNode;
    if (node == cm.display.lineDiv) {
      lineNode = cm.display.lineDiv.childNodes[offset];
      if (!lineNode) {
        return badPos(cm.clipPos(Pos(cm.display.viewTo - 1)), true);
      }
      node = null;
      offset = 0;
    } else {
      for (lineNode = node; ; lineNode = lineNode.parentNode) {
        if (!lineNode || lineNode == cm.display.lineDiv) {
          return null;
        }
        if (lineNode.parentNode && lineNode.parentNode == cm.display.lineDiv) {
          break;
        }
      }
    }
    for (var i2 = 0; i2 < cm.display.view.length; i2++) {
      var lineView = cm.display.view[i2];
      if (lineView.node == lineNode) {
        return locateNodeInLineView(lineView, node, offset);
      }
    }
  }
  function locateNodeInLineView(lineView, node, offset) {
    var wrapper = lineView.text.firstChild, bad = false;
    if (!node || !contains(wrapper, node)) {
      return badPos(Pos(lineNo(lineView.line), 0), true);
    }
    if (node == wrapper) {
      bad = true;
      node = wrapper.childNodes[offset];
      offset = 0;
      if (!node) {
        var line = lineView.rest ? lst(lineView.rest) : lineView.line;
        return badPos(Pos(lineNo(line), line.text.length), bad);
      }
    }
    var textNode = node.nodeType == 3 ? node : null, topNode = node;
    if (!textNode && node.childNodes.length == 1 && node.firstChild.nodeType == 3) {
      textNode = node.firstChild;
      if (offset) {
        offset = textNode.nodeValue.length;
      }
    }
    while (topNode.parentNode != wrapper) {
      topNode = topNode.parentNode;
    }
    var measure = lineView.measure, maps = measure.maps;
    function find(textNode2, topNode2, offset2) {
      for (var i2 = -1; i2 < (maps ? maps.length : 0); i2++) {
        var map2 = i2 < 0 ? measure.map : maps[i2];
        for (var j = 0; j < map2.length; j += 3) {
          var curNode = map2[j + 2];
          if (curNode == textNode2 || curNode == topNode2) {
            var line2 = lineNo(i2 < 0 ? lineView.line : lineView.rest[i2]);
            var ch = map2[j] + offset2;
            if (offset2 < 0 || curNode != textNode2) {
              ch = map2[j + (offset2 ? 1 : 0)];
            }
            return Pos(line2, ch);
          }
        }
      }
    }
    var found = find(textNode, topNode, offset);
    if (found) {
      return badPos(found, bad);
    }
    for (var after = topNode.nextSibling, dist = textNode ? textNode.nodeValue.length - offset : 0; after; after = after.nextSibling) {
      found = find(after, after.firstChild, 0);
      if (found) {
        return badPos(Pos(found.line, found.ch - dist), bad);
      } else {
        dist += after.textContent.length;
      }
    }
    for (var before = topNode.previousSibling, dist$1 = offset; before; before = before.previousSibling) {
      found = find(before, before.firstChild, -1);
      if (found) {
        return badPos(Pos(found.line, found.ch + dist$1), bad);
      } else {
        dist$1 += before.textContent.length;
      }
    }
  }
  var TextareaInput = function(cm) {
    this.cm = cm;
    this.prevInput = "";
    this.pollingFast = false;
    this.polling = new Delayed();
    this.hasSelection = false;
    this.composing = null;
    this.resetting = false;
  };
  TextareaInput.prototype.init = function(display) {
    var this$1 = this;
    var input = this, cm = this.cm;
    this.createField(display);
    var te = this.textarea;
    display.wrapper.insertBefore(this.wrapper, display.wrapper.firstChild);
    if (ios) {
      te.style.width = "0px";
    }
    on(te, "input", function() {
      if (ie && ie_version >= 9 && this$1.hasSelection) {
        this$1.hasSelection = null;
      }
      input.poll();
    });
    on(te, "paste", function(e) {
      if (signalDOMEvent(cm, e) || handlePaste(e, cm)) {
        return;
      }
      cm.state.pasteIncoming = +/* @__PURE__ */ new Date();
      input.fastPoll();
    });
    function prepareCopyCut(e) {
      if (signalDOMEvent(cm, e)) {
        return;
      }
      if (cm.somethingSelected()) {
        setLastCopied({ lineWise: false, text: cm.getSelections() });
      } else if (!cm.options.lineWiseCopyCut) {
        return;
      } else {
        var ranges = copyableRanges(cm);
        setLastCopied({ lineWise: true, text: ranges.text });
        if (e.type == "cut") {
          cm.setSelections(ranges.ranges, null, sel_dontScroll);
        } else {
          input.prevInput = "";
          te.value = ranges.text.join("\n");
          selectInput(te);
        }
      }
      if (e.type == "cut") {
        cm.state.cutIncoming = +/* @__PURE__ */ new Date();
      }
    }
    on(te, "cut", prepareCopyCut);
    on(te, "copy", prepareCopyCut);
    on(display.scroller, "paste", function(e) {
      if (eventInWidget(display, e) || signalDOMEvent(cm, e)) {
        return;
      }
      if (!te.dispatchEvent) {
        cm.state.pasteIncoming = +/* @__PURE__ */ new Date();
        input.focus();
        return;
      }
      var event = new Event("paste");
      event.clipboardData = e.clipboardData;
      te.dispatchEvent(event);
    });
    on(display.lineSpace, "selectstart", function(e) {
      if (!eventInWidget(display, e)) {
        e_preventDefault(e);
      }
    });
    on(te, "compositionstart", function() {
      var start = cm.getCursor("from");
      if (input.composing) {
        input.composing.range.clear();
      }
      input.composing = {
        start,
        range: cm.markText(start, cm.getCursor("to"), { className: "CodeMirror-composing" })
      };
    });
    on(te, "compositionend", function() {
      if (input.composing) {
        input.poll();
        input.composing.range.clear();
        input.composing = null;
      }
    });
  };
  TextareaInput.prototype.createField = function(_display) {
    this.wrapper = hiddenTextarea();
    this.textarea = this.wrapper.firstChild;
    var opts = this.cm.options;
    disableBrowserMagic(this.textarea, opts.spellcheck, opts.autocorrect, opts.autocapitalize);
  };
  TextareaInput.prototype.screenReaderLabelChanged = function(label) {
    if (label) {
      this.textarea.setAttribute("aria-label", label);
    } else {
      this.textarea.removeAttribute("aria-label");
    }
  };
  TextareaInput.prototype.prepareSelection = function() {
    var cm = this.cm, display = cm.display, doc2 = cm.doc;
    var result = prepareSelection(cm);
    if (cm.options.moveInputWithCursor) {
      var headPos = cursorCoords(cm, doc2.sel.primary().head, "div");
      var wrapOff = display.wrapper.getBoundingClientRect(), lineOff = display.lineDiv.getBoundingClientRect();
      result.teTop = Math.max(0, Math.min(
        display.wrapper.clientHeight - 10,
        headPos.top + lineOff.top - wrapOff.top
      ));
      result.teLeft = Math.max(0, Math.min(
        display.wrapper.clientWidth - 10,
        headPos.left + lineOff.left - wrapOff.left
      ));
    }
    return result;
  };
  TextareaInput.prototype.showSelection = function(drawn) {
    var cm = this.cm, display = cm.display;
    removeChildrenAndAdd(display.cursorDiv, drawn.cursors);
    removeChildrenAndAdd(display.selectionDiv, drawn.selection);
    if (drawn.teTop != null) {
      this.wrapper.style.top = drawn.teTop + "px";
      this.wrapper.style.left = drawn.teLeft + "px";
    }
  };
  TextareaInput.prototype.reset = function(typing) {
    if (this.contextMenuPending || this.composing && typing) {
      return;
    }
    var cm = this.cm;
    this.resetting = true;
    if (cm.somethingSelected()) {
      this.prevInput = "";
      var content = cm.getSelection();
      this.textarea.value = content;
      if (cm.state.focused) {
        selectInput(this.textarea);
      }
      if (ie && ie_version >= 9) {
        this.hasSelection = content;
      }
    } else if (!typing) {
      this.prevInput = this.textarea.value = "";
      if (ie && ie_version >= 9) {
        this.hasSelection = null;
      }
    }
    this.resetting = false;
  };
  TextareaInput.prototype.getField = function() {
    return this.textarea;
  };
  TextareaInput.prototype.supportsTouch = function() {
    return false;
  };
  TextareaInput.prototype.focus = function() {
    if (this.cm.options.readOnly != "nocursor" && (!mobile || activeElt(rootNode(this.textarea)) != this.textarea)) {
      try {
        this.textarea.focus();
      } catch (e) {
      }
    }
  };
  TextareaInput.prototype.blur = function() {
    this.textarea.blur();
  };
  TextareaInput.prototype.resetPosition = function() {
    this.wrapper.style.top = this.wrapper.style.left = 0;
  };
  TextareaInput.prototype.receivedFocus = function() {
    this.slowPoll();
  };
  TextareaInput.prototype.slowPoll = function() {
    var this$1 = this;
    if (this.pollingFast) {
      return;
    }
    this.polling.set(this.cm.options.pollInterval, function() {
      this$1.poll();
      if (this$1.cm.state.focused) {
        this$1.slowPoll();
      }
    });
  };
  TextareaInput.prototype.fastPoll = function() {
    var missed = false, input = this;
    input.pollingFast = true;
    function p() {
      var changed = input.poll();
      if (!changed && !missed) {
        missed = true;
        input.polling.set(60, p);
      } else {
        input.pollingFast = false;
        input.slowPoll();
      }
    }
    input.polling.set(20, p);
  };
  TextareaInput.prototype.poll = function() {
    var this$1 = this;
    var cm = this.cm, input = this.textarea, prevInput = this.prevInput;
    if (this.contextMenuPending || this.resetting || !cm.state.focused || hasSelection(input) && !prevInput && !this.composing || cm.isReadOnly() || cm.options.disableInput || cm.state.keySeq) {
      return false;
    }
    var text = input.value;
    if (text == prevInput && !cm.somethingSelected()) {
      return false;
    }
    if (ie && ie_version >= 9 && this.hasSelection === text || mac && /[\uf700-\uf7ff]/.test(text)) {
      cm.display.input.reset();
      return false;
    }
    if (cm.doc.sel == cm.display.selForContextMenu) {
      var first = text.charCodeAt(0);
      if (first == 8203 && !prevInput) {
        prevInput = "\u200B";
      }
      if (first == 8666) {
        this.reset();
        return this.cm.execCommand("undo");
      }
    }
    var same = 0, l = Math.min(prevInput.length, text.length);
    while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same)) {
      ++same;
    }
    runInOp(cm, function() {
      applyTextInput(
        cm,
        text.slice(same),
        prevInput.length - same,
        null,
        this$1.composing ? "*compose" : null
      );
      if (text.length > 1e3 || text.indexOf("\n") > -1) {
        input.value = this$1.prevInput = "";
      } else {
        this$1.prevInput = text;
      }
      if (this$1.composing) {
        this$1.composing.range.clear();
        this$1.composing.range = cm.markText(
          this$1.composing.start,
          cm.getCursor("to"),
          { className: "CodeMirror-composing" }
        );
      }
    });
    return true;
  };
  TextareaInput.prototype.ensurePolled = function() {
    if (this.pollingFast && this.poll()) {
      this.pollingFast = false;
    }
  };
  TextareaInput.prototype.onKeyPress = function() {
    if (ie && ie_version >= 9) {
      this.hasSelection = null;
    }
    this.fastPoll();
  };
  TextareaInput.prototype.onContextMenu = function(e) {
    var input = this, cm = input.cm, display = cm.display, te = input.textarea;
    if (input.contextMenuPending) {
      input.contextMenuPending();
    }
    var pos = posFromMouse(cm, e), scrollPos = display.scroller.scrollTop;
    if (!pos || presto) {
      return;
    }
    var reset = cm.options.resetSelectionOnContextMenu;
    if (reset && cm.doc.sel.contains(pos) == -1) {
      operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll);
    }
    var oldCSS = te.style.cssText, oldWrapperCSS = input.wrapper.style.cssText;
    var wrapperBox = input.wrapper.offsetParent.getBoundingClientRect();
    input.wrapper.style.cssText = "position: static";
    te.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - wrapperBox.top - 5) + "px; left: " + (e.clientX - wrapperBox.left - 5) + "px;\n      z-index: 1000; background: " + (ie ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
    var oldScrollY;
    if (webkit) {
      oldScrollY = te.ownerDocument.defaultView.scrollY;
    }
    display.input.focus();
    if (webkit) {
      te.ownerDocument.defaultView.scrollTo(null, oldScrollY);
    }
    display.input.reset();
    if (!cm.somethingSelected()) {
      te.value = input.prevInput = " ";
    }
    input.contextMenuPending = rehide;
    display.selForContextMenu = cm.doc.sel;
    clearTimeout(display.detectingSelectAll);
    function prepareSelectAllHack() {
      if (te.selectionStart != null) {
        var selected = cm.somethingSelected();
        var extval = "\u200B" + (selected ? te.value : "");
        te.value = "\u21DA";
        te.value = extval;
        input.prevInput = selected ? "" : "\u200B";
        te.selectionStart = 1;
        te.selectionEnd = extval.length;
        display.selForContextMenu = cm.doc.sel;
      }
    }
    function rehide() {
      if (input.contextMenuPending != rehide) {
        return;
      }
      input.contextMenuPending = false;
      input.wrapper.style.cssText = oldWrapperCSS;
      te.style.cssText = oldCSS;
      if (ie && ie_version < 9) {
        display.scrollbars.setScrollTop(display.scroller.scrollTop = scrollPos);
      }
      if (te.selectionStart != null) {
        if (!ie || ie && ie_version < 9) {
          prepareSelectAllHack();
        }
        var i2 = 0, poll = function() {
          if (display.selForContextMenu == cm.doc.sel && te.selectionStart == 0 && te.selectionEnd > 0 && input.prevInput == "\u200B") {
            operation(cm, selectAll)(cm);
          } else if (i2++ < 10) {
            display.detectingSelectAll = setTimeout(poll, 500);
          } else {
            display.selForContextMenu = null;
            display.input.reset();
          }
        };
        display.detectingSelectAll = setTimeout(poll, 200);
      }
    }
    if (ie && ie_version >= 9) {
      prepareSelectAllHack();
    }
    if (captureRightClick) {
      e_stop(e);
      var mouseup = function() {
        off(window, "mouseup", mouseup);
        setTimeout(rehide, 20);
      };
      on(window, "mouseup", mouseup);
    } else {
      setTimeout(rehide, 50);
    }
  };
  TextareaInput.prototype.readOnlyChanged = function(val) {
    if (!val) {
      this.reset();
    }
    this.textarea.disabled = val == "nocursor";
    this.textarea.readOnly = !!val;
  };
  TextareaInput.prototype.setUneditable = function() {
  };
  TextareaInput.prototype.needsContentAttribute = false;
  function fromTextArea(textarea, options) {
    options = options ? copyObj(options) : {};
    options.value = textarea.value;
    if (!options.tabindex && textarea.tabIndex) {
      options.tabindex = textarea.tabIndex;
    }
    if (!options.placeholder && textarea.placeholder) {
      options.placeholder = textarea.placeholder;
    }
    if (options.autofocus == null) {
      var hasFocus = activeElt(rootNode(textarea));
      options.autofocus = hasFocus == textarea || textarea.getAttribute("autofocus") != null && hasFocus == document.body;
    }
    function save() {
      textarea.value = cm.getValue();
    }
    var realSubmit;
    if (textarea.form) {
      on(textarea.form, "submit", save);
      if (!options.leaveSubmitMethodAlone) {
        var form = textarea.form;
        realSubmit = form.submit;
        try {
          var wrappedSubmit = form.submit = function() {
            save();
            form.submit = realSubmit;
            form.submit();
            form.submit = wrappedSubmit;
          };
        } catch (e) {
        }
      }
    }
    options.finishInit = function(cm2) {
      cm2.save = save;
      cm2.getTextArea = function() {
        return textarea;
      };
      cm2.toTextArea = function() {
        cm2.toTextArea = isNaN;
        save();
        textarea.parentNode.removeChild(cm2.getWrapperElement());
        textarea.style.display = "";
        if (textarea.form) {
          off(textarea.form, "submit", save);
          if (!options.leaveSubmitMethodAlone && typeof textarea.form.submit == "function") {
            textarea.form.submit = realSubmit;
          }
        }
      };
    };
    textarea.style.display = "none";
    var cm = CodeMirror2(
      function(node) {
        return textarea.parentNode.insertBefore(node, textarea.nextSibling);
      },
      options
    );
    return cm;
  }
  function addLegacyProps(CodeMirror3) {
    CodeMirror3.off = off;
    CodeMirror3.on = on;
    CodeMirror3.wheelEventPixels = wheelEventPixels;
    CodeMirror3.Doc = Doc;
    CodeMirror3.splitLines = splitLinesAuto;
    CodeMirror3.countColumn = countColumn;
    CodeMirror3.findColumn = findColumn;
    CodeMirror3.isWordChar = isWordCharBasic;
    CodeMirror3.Pass = Pass;
    CodeMirror3.signal = signal;
    CodeMirror3.Line = Line;
    CodeMirror3.changeEnd = changeEnd;
    CodeMirror3.scrollbarModel = scrollbarModel;
    CodeMirror3.Pos = Pos;
    CodeMirror3.cmpPos = cmp;
    CodeMirror3.modes = modes;
    CodeMirror3.mimeModes = mimeModes;
    CodeMirror3.resolveMode = resolveMode;
    CodeMirror3.getMode = getMode;
    CodeMirror3.modeExtensions = modeExtensions;
    CodeMirror3.extendMode = extendMode;
    CodeMirror3.copyState = copyState;
    CodeMirror3.startState = startState;
    CodeMirror3.innerMode = innerMode;
    CodeMirror3.commands = commands;
    CodeMirror3.keyMap = keyMap;
    CodeMirror3.keyName = keyName;
    CodeMirror3.isModifierKey = isModifierKey;
    CodeMirror3.lookupKey = lookupKey;
    CodeMirror3.normalizeKeyMap = normalizeKeyMap;
    CodeMirror3.StringStream = StringStream;
    CodeMirror3.SharedTextMarker = SharedTextMarker;
    CodeMirror3.TextMarker = TextMarker;
    CodeMirror3.LineWidget = LineWidget;
    CodeMirror3.e_preventDefault = e_preventDefault;
    CodeMirror3.e_stopPropagation = e_stopPropagation;
    CodeMirror3.e_stop = e_stop;
    CodeMirror3.addClass = addClass;
    CodeMirror3.contains = contains;
    CodeMirror3.rmClass = rmClass;
    CodeMirror3.keyNames = keyNames;
  }
  defineOptions(CodeMirror2);
  addEditorMethods(CodeMirror2);
  var dontDelegate = "iter insert remove copy getEditor constructor".split(" ");
  for (var prop in Doc.prototype) {
    if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0) {
      CodeMirror2.prototype[prop] = /* @__PURE__ */ (function(method) {
        return function() {
          return method.apply(this.doc, arguments);
        };
      })(Doc.prototype[prop]);
    }
  }
  eventMixin(Doc);
  CodeMirror2.inputStyles = { "textarea": TextareaInput, "contenteditable": ContentEditableInput };
  CodeMirror2.defineMode = function(name) {
    if (!CodeMirror2.defaults.mode && name != "null") {
      CodeMirror2.defaults.mode = name;
    }
    defineMode.apply(this, arguments);
  };
  CodeMirror2.defineMIME = defineMIME;
  CodeMirror2.defineMode("null", function() {
    return { token: function(stream) {
      return stream.skipToEnd();
    } };
  });
  CodeMirror2.defineMIME("text/plain", "null");
  CodeMirror2.defineExtension = function(name, func) {
    CodeMirror2.prototype[name] = func;
  };
  CodeMirror2.defineDocExtension = function(name, func) {
    Doc.prototype[name] = func;
  };
  CodeMirror2.fromTextArea = fromTextArea;
  addLegacyProps(CodeMirror2);
  CodeMirror2.version = "5.65.21";
  return CodeMirror2;
}));
(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd)
    define(["../../lib/codemirror"], mod);
  else
    mod(CodeMirror);
})(function(CodeMirror2) {
  "use strict";
  CodeMirror2.defineMode("javascript", function(config, parserConfig) {
    var indentUnit = config.indentUnit;
    var statementIndent = parserConfig.statementIndent;
    var jsonldMode = parserConfig.jsonld;
    var jsonMode = parserConfig.json || jsonldMode;
    var trackScope = parserConfig.trackScope !== false;
    var isTS = parserConfig.typescript;
    var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;
    var keywords = (function() {
      function kw(type2) {
        return { type: type2, style: "keyword" };
      }
      var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c"), D = kw("keyword d");
      var operator = kw("operator"), atom = { type: "atom", style: "atom" };
      return {
        "if": kw("if"),
        "while": A,
        "with": A,
        "else": B,
        "do": B,
        "try": B,
        "finally": B,
        "return": D,
        "break": D,
        "continue": D,
        "new": kw("new"),
        "delete": C,
        "void": C,
        "throw": C,
        "debugger": kw("debugger"),
        "var": kw("var"),
        "const": kw("var"),
        "let": kw("var"),
        "function": kw("function"),
        "catch": kw("catch"),
        "for": kw("for"),
        "switch": kw("switch"),
        "case": kw("case"),
        "default": kw("default"),
        "in": operator,
        "typeof": operator,
        "instanceof": operator,
        "true": atom,
        "false": atom,
        "null": atom,
        "undefined": atom,
        "NaN": atom,
        "Infinity": atom,
        "this": kw("this"),
        "class": kw("class"),
        "super": kw("atom"),
        "yield": C,
        "export": kw("export"),
        "import": kw("import"),
        "extends": C,
        "await": C
      };
    })();
    var isOperatorChar = /[+\-*&%=<>!?|~^@]/;
    var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
    function readRegexp(stream) {
      var escaped = false, next, inSet = false;
      while ((next = stream.next()) != null) {
        if (!escaped) {
          if (next == "/" && !inSet) return;
          if (next == "[") inSet = true;
          else if (inSet && next == "]") inSet = false;
        }
        escaped = !escaped && next == "\\";
      }
    }
    var type, content;
    function ret(tp, style, cont2) {
      type = tp;
      content = cont2;
      return style;
    }
    function tokenBase(stream, state) {
      var ch = stream.next();
      if (ch == '"' || ch == "'") {
        state.tokenize = tokenString(ch);
        return state.tokenize(stream, state);
      } else if (ch == "." && stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
        return ret("number", "number");
      } else if (ch == "." && stream.match("..")) {
        return ret("spread", "meta");
      } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
        return ret(ch);
      } else if (ch == "=" && stream.eat(">")) {
        return ret("=>", "operator");
      } else if (ch == "0" && stream.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) {
        return ret("number", "number");
      } else if (/\d/.test(ch)) {
        stream.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/);
        return ret("number", "number");
      } else if (ch == "/") {
        if (stream.eat("*")) {
          state.tokenize = tokenComment;
          return tokenComment(stream, state);
        } else if (stream.eat("/")) {
          stream.skipToEnd();
          return ret("comment", "comment");
        } else if (expressionAllowed(stream, state, 1)) {
          readRegexp(stream);
          stream.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/);
          return ret("regexp", "string-2");
        } else {
          stream.eat("=");
          return ret("operator", "operator", stream.current());
        }
      } else if (ch == "`") {
        state.tokenize = tokenQuasi;
        return tokenQuasi(stream, state);
      } else if (ch == "#" && stream.peek() == "!") {
        stream.skipToEnd();
        return ret("meta", "meta");
      } else if (ch == "#" && stream.eatWhile(wordRE)) {
        return ret("variable", "property");
      } else if (ch == "<" && stream.match("!--") || ch == "-" && stream.match("->") && !/\S/.test(stream.string.slice(0, stream.start))) {
        stream.skipToEnd();
        return ret("comment", "comment");
      } else if (isOperatorChar.test(ch)) {
        if (ch != ">" || !state.lexical || state.lexical.type != ">") {
          if (stream.eat("=")) {
            if (ch == "!" || ch == "=") stream.eat("=");
          } else if (/[<>*+\-|&?]/.test(ch)) {
            stream.eat(ch);
            if (ch == ">") stream.eat(ch);
          }
        }
        if (ch == "?" && stream.eat(".")) return ret(".");
        return ret("operator", "operator", stream.current());
      } else if (wordRE.test(ch)) {
        stream.eatWhile(wordRE);
        var word = stream.current();
        if (state.lastType != ".") {
          if (keywords.propertyIsEnumerable(word)) {
            var kw = keywords[word];
            return ret(kw.type, kw.style, word);
          }
          if (word == "async" && stream.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, false))
            return ret("async", "keyword", word);
        }
        return ret("variable", "variable", word);
      }
    }
    function tokenString(quote) {
      return function(stream, state) {
        var escaped = false, next;
        if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)) {
          state.tokenize = tokenBase;
          return ret("jsonld-keyword", "meta");
        }
        while ((next = stream.next()) != null) {
          if (next == quote && !escaped) break;
          escaped = !escaped && next == "\\";
        }
        if (!escaped) state.tokenize = tokenBase;
        return ret("string", "string");
      };
    }
    function tokenComment(stream, state) {
      var maybeEnd = false, ch;
      while (ch = stream.next()) {
        if (ch == "/" && maybeEnd) {
          state.tokenize = tokenBase;
          break;
        }
        maybeEnd = ch == "*";
      }
      return ret("comment", "comment");
    }
    function tokenQuasi(stream, state) {
      var escaped = false, next;
      while ((next = stream.next()) != null) {
        if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
          state.tokenize = tokenBase;
          break;
        }
        escaped = !escaped && next == "\\";
      }
      return ret("quasi", "string-2", stream.current());
    }
    var brackets = "([{}])";
    function findFatArrow(stream, state) {
      if (state.fatArrowAt) state.fatArrowAt = null;
      var arrow = stream.string.indexOf("=>", stream.start);
      if (arrow < 0) return;
      if (isTS) {
        var m = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(stream.string.slice(stream.start, arrow));
        if (m) arrow = m.index;
      }
      var depth = 0, sawSomething = false;
      for (var pos = arrow - 1; pos >= 0; --pos) {
        var ch = stream.string.charAt(pos);
        var bracket = brackets.indexOf(ch);
        if (bracket >= 0 && bracket < 3) {
          if (!depth) {
            ++pos;
            break;
          }
          if (--depth == 0) {
            if (ch == "(") sawSomething = true;
            break;
          }
        } else if (bracket >= 3 && bracket < 6) {
          ++depth;
        } else if (wordRE.test(ch)) {
          sawSomething = true;
        } else if (/["'\/`]/.test(ch)) {
          for (; ; --pos) {
            if (pos == 0) return;
            var next = stream.string.charAt(pos - 1);
            if (next == ch && stream.string.charAt(pos - 2) != "\\") {
              pos--;
              break;
            }
          }
        } else if (sawSomething && !depth) {
          ++pos;
          break;
        }
      }
      if (sawSomething && !depth) state.fatArrowAt = pos;
    }
    var atomicTypes = {
      "atom": true,
      "number": true,
      "variable": true,
      "string": true,
      "regexp": true,
      "this": true,
      "import": true,
      "jsonld-keyword": true
    };
    function JSLexical(indented, column, type2, align, prev, info) {
      this.indented = indented;
      this.column = column;
      this.type = type2;
      this.prev = prev;
      this.info = info;
      if (align != null) this.align = align;
    }
    function inScope(state, varname) {
      if (!trackScope) return false;
      for (var v = state.localVars; v; v = v.next)
        if (v.name == varname) return true;
      for (var cx2 = state.context; cx2; cx2 = cx2.prev) {
        for (var v = cx2.vars; v; v = v.next)
          if (v.name == varname) return true;
      }
    }
    function parseJS(state, style, type2, content2, stream) {
      var cc = state.cc;
      cx.state = state;
      cx.stream = stream;
      cx.marked = null, cx.cc = cc;
      cx.style = style;
      if (!state.lexical.hasOwnProperty("align"))
        state.lexical.align = true;
      while (true) {
        var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
        if (combinator(type2, content2)) {
          while (cc.length && cc[cc.length - 1].lex)
            cc.pop()();
          if (cx.marked) return cx.marked;
          if (type2 == "variable" && inScope(state, content2)) return "variable-2";
          return style;
        }
      }
    }
    var cx = { state: null, column: null, marked: null, cc: null };
    function pass() {
      for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
    }
    function cont() {
      pass.apply(null, arguments);
      return true;
    }
    function inList(name, list) {
      for (var v = list; v; v = v.next) if (v.name == name) return true;
      return false;
    }
    function register(varname) {
      var state = cx.state;
      cx.marked = "def";
      if (!trackScope) return;
      if (state.context) {
        if (state.lexical.info == "var" && state.context && state.context.block) {
          var newContext = registerVarScoped(varname, state.context);
          if (newContext != null) {
            state.context = newContext;
            return;
          }
        } else if (!inList(varname, state.localVars)) {
          state.localVars = new Var(varname, state.localVars);
          return;
        }
      }
      if (parserConfig.globalVars && !inList(varname, state.globalVars))
        state.globalVars = new Var(varname, state.globalVars);
    }
    function registerVarScoped(varname, context) {
      if (!context) {
        return null;
      } else if (context.block) {
        var inner = registerVarScoped(varname, context.prev);
        if (!inner) return null;
        if (inner == context.prev) return context;
        return new Context(inner, context.vars, true);
      } else if (inList(varname, context.vars)) {
        return context;
      } else {
        return new Context(context.prev, new Var(varname, context.vars), false);
      }
    }
    function isModifier(name) {
      return name == "public" || name == "private" || name == "protected" || name == "abstract" || name == "readonly";
    }
    function Context(prev, vars, block2) {
      this.prev = prev;
      this.vars = vars;
      this.block = block2;
    }
    function Var(name, next) {
      this.name = name;
      this.next = next;
    }
    var defaultVars = new Var("this", new Var("arguments", null));
    function pushcontext() {
      cx.state.context = new Context(cx.state.context, cx.state.localVars, false);
      cx.state.localVars = defaultVars;
    }
    function pushblockcontext() {
      cx.state.context = new Context(cx.state.context, cx.state.localVars, true);
      cx.state.localVars = null;
    }
    pushcontext.lex = pushblockcontext.lex = true;
    function popcontext() {
      cx.state.localVars = cx.state.context.vars;
      cx.state.context = cx.state.context.prev;
    }
    popcontext.lex = true;
    function pushlex(type2, info) {
      var result = function() {
        var state = cx.state, indent = state.indented;
        if (state.lexical.type == "stat") indent = state.lexical.indented;
        else for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
          indent = outer.indented;
        state.lexical = new JSLexical(indent, cx.stream.column(), type2, null, state.lexical, info);
      };
      result.lex = true;
      return result;
    }
    function poplex() {
      var state = cx.state;
      if (state.lexical.prev) {
        if (state.lexical.type == ")")
          state.indented = state.lexical.indented;
        state.lexical = state.lexical.prev;
      }
    }
    poplex.lex = true;
    function expect(wanted) {
      function exp(type2) {
        if (type2 == wanted) return cont();
        else if (wanted == ";" || type2 == "}" || type2 == ")" || type2 == "]") return pass();
        else return cont(exp);
      }
      ;
      return exp;
    }
    function statement(type2, value) {
      if (type2 == "var") return cont(pushlex("vardef", value), vardef, expect(";"), poplex);
      if (type2 == "keyword a") return cont(pushlex("form"), parenExpr, statement, poplex);
      if (type2 == "keyword b") return cont(pushlex("form"), statement, poplex);
      if (type2 == "keyword d") return cx.stream.match(/^\s*$/, false) ? cont() : cont(pushlex("stat"), maybeexpression, expect(";"), poplex);
      if (type2 == "debugger") return cont(expect(";"));
      if (type2 == "{") return cont(pushlex("}"), pushblockcontext, block, poplex, popcontext);
      if (type2 == ";") return cont();
      if (type2 == "if") {
        if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
          cx.state.cc.pop()();
        return cont(pushlex("form"), parenExpr, statement, poplex, maybeelse);
      }
      if (type2 == "function") return cont(functiondef);
      if (type2 == "for") return cont(pushlex("form"), pushblockcontext, forspec, statement, popcontext, poplex);
      if (type2 == "class" || isTS && value == "interface") {
        cx.marked = "keyword";
        return cont(pushlex("form", type2 == "class" ? type2 : value), className, poplex);
      }
      if (type2 == "variable") {
        if (isTS && value == "declare") {
          cx.marked = "keyword";
          return cont(statement);
        } else if (isTS && (value == "module" || value == "enum" || value == "type") && cx.stream.match(/^\s*\w/, false)) {
          cx.marked = "keyword";
          if (value == "enum") return cont(enumdef);
          else if (value == "type") return cont(typename, expect("operator"), typeexpr, expect(";"));
          else return cont(pushlex("form"), pattern, expect("{"), pushlex("}"), block, poplex, poplex);
        } else if (isTS && value == "namespace") {
          cx.marked = "keyword";
          return cont(pushlex("form"), expression, statement, poplex);
        } else if (isTS && value == "abstract") {
          cx.marked = "keyword";
          return cont(statement);
        } else {
          return cont(pushlex("stat"), maybelabel);
        }
      }
      if (type2 == "switch") return cont(
        pushlex("form"),
        parenExpr,
        expect("{"),
        pushlex("}", "switch"),
        pushblockcontext,
        block,
        poplex,
        poplex,
        popcontext
      );
      if (type2 == "case") return cont(expression, expect(":"));
      if (type2 == "default") return cont(expect(":"));
      if (type2 == "catch") return cont(pushlex("form"), pushcontext, maybeCatchBinding, statement, poplex, popcontext);
      if (type2 == "export") return cont(pushlex("stat"), afterExport, poplex);
      if (type2 == "import") return cont(pushlex("stat"), afterImport, poplex);
      if (type2 == "async") return cont(statement);
      if (value == "@") return cont(expression, statement);
      return pass(pushlex("stat"), expression, expect(";"), poplex);
    }
    function maybeCatchBinding(type2) {
      if (type2 == "(") return cont(funarg, expect(")"));
    }
    function expression(type2, value) {
      return expressionInner(type2, value, false);
    }
    function expressionNoComma(type2, value) {
      return expressionInner(type2, value, true);
    }
    function parenExpr(type2) {
      if (type2 != "(") return pass();
      return cont(pushlex(")"), maybeexpression, expect(")"), poplex);
    }
    function expressionInner(type2, value, noComma) {
      if (cx.state.fatArrowAt == cx.stream.start) {
        var body = noComma ? arrowBodyNoComma : arrowBody;
        if (type2 == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, expect("=>"), body, popcontext);
        else if (type2 == "variable") return pass(pushcontext, pattern, expect("=>"), body, popcontext);
      }
      var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
      if (atomicTypes.hasOwnProperty(type2)) return cont(maybeop);
      if (type2 == "function") return cont(functiondef, maybeop);
      if (type2 == "class" || isTS && value == "interface") {
        cx.marked = "keyword";
        return cont(pushlex("form"), classExpression, poplex);
      }
      if (type2 == "keyword c" || type2 == "async") return cont(noComma ? expressionNoComma : expression);
      if (type2 == "(") return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop);
      if (type2 == "operator" || type2 == "spread") return cont(noComma ? expressionNoComma : expression);
      if (type2 == "[") return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
      if (type2 == "{") return contCommasep(objprop, "}", null, maybeop);
      if (type2 == "quasi") return pass(quasi, maybeop);
      if (type2 == "new") return cont(maybeTarget(noComma));
      return cont();
    }
    function maybeexpression(type2) {
      if (type2.match(/[;\}\)\],]/)) return pass();
      return pass(expression);
    }
    function maybeoperatorComma(type2, value) {
      if (type2 == ",") return cont(maybeexpression);
      return maybeoperatorNoComma(type2, value, false);
    }
    function maybeoperatorNoComma(type2, value, noComma) {
      var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
      var expr = noComma == false ? expression : expressionNoComma;
      if (type2 == "=>") return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
      if (type2 == "operator") {
        if (/\+\+|--/.test(value) || isTS && value == "!") return cont(me);
        if (isTS && value == "<" && cx.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, false))
          return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, me);
        if (value == "?") return cont(expression, expect(":"), expr);
        return cont(expr);
      }
      if (type2 == "quasi") {
        return pass(quasi, me);
      }
      if (type2 == ";") return;
      if (type2 == "(") return contCommasep(expressionNoComma, ")", "call", me);
      if (type2 == ".") return cont(property, me);
      if (type2 == "[") return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
      if (isTS && value == "as") {
        cx.marked = "keyword";
        return cont(typeexpr, me);
      }
      if (type2 == "regexp") {
        cx.state.lastType = cx.marked = "operator";
        cx.stream.backUp(cx.stream.pos - cx.stream.start - 1);
        return cont(expr);
      }
    }
    function quasi(type2, value) {
      if (type2 != "quasi") return pass();
      if (value.slice(value.length - 2) != "${") return cont(quasi);
      return cont(maybeexpression, continueQuasi);
    }
    function continueQuasi(type2) {
      if (type2 == "}") {
        cx.marked = "string-2";
        cx.state.tokenize = tokenQuasi;
        return cont(quasi);
      }
    }
    function arrowBody(type2) {
      findFatArrow(cx.stream, cx.state);
      return pass(type2 == "{" ? statement : expression);
    }
    function arrowBodyNoComma(type2) {
      findFatArrow(cx.stream, cx.state);
      return pass(type2 == "{" ? statement : expressionNoComma);
    }
    function maybeTarget(noComma) {
      return function(type2) {
        if (type2 == ".") return cont(noComma ? targetNoComma : target);
        else if (type2 == "variable" && isTS) return cont(maybeTypeArgs, noComma ? maybeoperatorNoComma : maybeoperatorComma);
        else return pass(noComma ? expressionNoComma : expression);
      };
    }
    function target(_, value) {
      if (value == "target") {
        cx.marked = "keyword";
        return cont(maybeoperatorComma);
      }
    }
    function targetNoComma(_, value) {
      if (value == "target") {
        cx.marked = "keyword";
        return cont(maybeoperatorNoComma);
      }
    }
    function maybelabel(type2) {
      if (type2 == ":") return cont(poplex, statement);
      return pass(maybeoperatorComma, expect(";"), poplex);
    }
    function property(type2) {
      if (type2 == "variable") {
        cx.marked = "property";
        return cont();
      }
    }
    function objprop(type2, value) {
      if (type2 == "async") {
        cx.marked = "property";
        return cont(objprop);
      } else if (type2 == "variable" || cx.style == "keyword") {
        cx.marked = "property";
        if (value == "get" || value == "set") return cont(getterSetter);
        var m;
        if (isTS && cx.state.fatArrowAt == cx.stream.start && (m = cx.stream.match(/^\s*:\s*/, false)))
          cx.state.fatArrowAt = cx.stream.pos + m[0].length;
        return cont(afterprop);
      } else if (type2 == "number" || type2 == "string") {
        cx.marked = jsonldMode ? "property" : cx.style + " property";
        return cont(afterprop);
      } else if (type2 == "jsonld-keyword") {
        return cont(afterprop);
      } else if (isTS && isModifier(value)) {
        cx.marked = "keyword";
        return cont(objprop);
      } else if (type2 == "[") {
        return cont(expression, maybetype, expect("]"), afterprop);
      } else if (type2 == "spread") {
        return cont(expressionNoComma, afterprop);
      } else if (value == "*") {
        cx.marked = "keyword";
        return cont(objprop);
      } else if (type2 == ":") {
        return pass(afterprop);
      }
    }
    function getterSetter(type2) {
      if (type2 != "variable") return pass(afterprop);
      cx.marked = "property";
      return cont(functiondef);
    }
    function afterprop(type2) {
      if (type2 == ":") return cont(expressionNoComma);
      if (type2 == "(") return pass(functiondef);
    }
    function commasep(what, end, sep) {
      function proceed(type2, value) {
        if (sep ? sep.indexOf(type2) > -1 : type2 == ",") {
          var lex = cx.state.lexical;
          if (lex.info == "call") lex.pos = (lex.pos || 0) + 1;
          return cont(function(type3, value2) {
            if (type3 == end || value2 == end) return pass();
            return pass(what);
          }, proceed);
        }
        if (type2 == end || value == end) return cont();
        if (sep && sep.indexOf(";") > -1) return pass(what);
        return cont(expect(end));
      }
      return function(type2, value) {
        if (type2 == end || value == end) return cont();
        return pass(what, proceed);
      };
    }
    function contCommasep(what, end, info) {
      for (var i = 3; i < arguments.length; i++)
        cx.cc.push(arguments[i]);
      return cont(pushlex(end, info), commasep(what, end), poplex);
    }
    function block(type2) {
      if (type2 == "}") return cont();
      return pass(statement, block);
    }
    function maybetype(type2, value) {
      if (isTS) {
        if (type2 == ":") return cont(typeexpr);
        if (value == "?") return cont(maybetype);
      }
    }
    function maybetypeOrIn(type2, value) {
      if (isTS && (type2 == ":" || value == "in")) return cont(typeexpr);
    }
    function mayberettype(type2) {
      if (isTS && type2 == ":") {
        if (cx.stream.match(/^\s*\w+\s+is\b/, false)) return cont(expression, isKW, typeexpr);
        else return cont(typeexpr);
      }
    }
    function isKW(_, value) {
      if (value == "is") {
        cx.marked = "keyword";
        return cont();
      }
    }
    function typeexpr(type2, value) {
      if (value == "keyof" || value == "typeof" || value == "infer" || value == "readonly") {
        cx.marked = "keyword";
        return cont(value == "typeof" ? expressionNoComma : typeexpr);
      }
      if (type2 == "variable" || value == "void") {
        cx.marked = "type";
        return cont(afterType);
      }
      if (value == "|" || value == "&") return cont(typeexpr);
      if (type2 == "string" || type2 == "number" || type2 == "atom") return cont(afterType);
      if (type2 == "[") return cont(pushlex("]"), commasep(typeexpr, "]", ","), poplex, afterType);
      if (type2 == "{") return cont(pushlex("}"), typeprops, poplex, afterType);
      if (type2 == "(") return cont(commasep(typearg, ")"), maybeReturnType, afterType);
      if (type2 == "<") return cont(commasep(typeexpr, ">"), typeexpr);
      if (type2 == "quasi") {
        return pass(quasiType, afterType);
      }
    }
    function maybeReturnType(type2) {
      if (type2 == "=>") return cont(typeexpr);
    }
    function typeprops(type2) {
      if (type2.match(/[\}\)\]]/)) return cont();
      if (type2 == "," || type2 == ";") return cont(typeprops);
      return pass(typeprop, typeprops);
    }
    function typeprop(type2, value) {
      if (type2 == "variable" || cx.style == "keyword") {
        cx.marked = "property";
        return cont(typeprop);
      } else if (value == "?" || type2 == "number" || type2 == "string") {
        return cont(typeprop);
      } else if (type2 == ":") {
        return cont(typeexpr);
      } else if (type2 == "[") {
        return cont(expect("variable"), maybetypeOrIn, expect("]"), typeprop);
      } else if (type2 == "(") {
        return pass(functiondecl, typeprop);
      } else if (!type2.match(/[;\}\)\],]/)) {
        return cont();
      }
    }
    function quasiType(type2, value) {
      if (type2 != "quasi") return pass();
      if (value.slice(value.length - 2) != "${") return cont(quasiType);
      return cont(typeexpr, continueQuasiType);
    }
    function continueQuasiType(type2) {
      if (type2 == "}") {
        cx.marked = "string-2";
        cx.state.tokenize = tokenQuasi;
        return cont(quasiType);
      }
    }
    function typearg(type2, value) {
      if (type2 == "variable" && cx.stream.match(/^\s*[?:]/, false) || value == "?") return cont(typearg);
      if (type2 == ":") return cont(typeexpr);
      if (type2 == "spread") return cont(typearg);
      return pass(typeexpr);
    }
    function afterType(type2, value) {
      if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType);
      if (value == "|" || type2 == "." || value == "&") return cont(typeexpr);
      if (type2 == "[") return cont(typeexpr, expect("]"), afterType);
      if (value == "extends" || value == "implements") {
        cx.marked = "keyword";
        return cont(typeexpr);
      }
      if (value == "?") return cont(typeexpr, expect(":"), typeexpr);
    }
    function maybeTypeArgs(_, value) {
      if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType);
    }
    function typeparam() {
      return pass(typeexpr, maybeTypeDefault);
    }
    function maybeTypeDefault(_, value) {
      if (value == "=") return cont(typeexpr);
    }
    function vardef(_, value) {
      if (value == "enum") {
        cx.marked = "keyword";
        return cont(enumdef);
      }
      return pass(pattern, maybetype, maybeAssign, vardefCont);
    }
    function pattern(type2, value) {
      if (isTS && isModifier(value)) {
        cx.marked = "keyword";
        return cont(pattern);
      }
      if (type2 == "variable") {
        register(value);
        return cont();
      }
      if (type2 == "spread") return cont(pattern);
      if (type2 == "[") return contCommasep(eltpattern, "]");
      if (type2 == "{") return contCommasep(proppattern, "}");
    }
    function proppattern(type2, value) {
      if (type2 == "variable" && !cx.stream.match(/^\s*:/, false)) {
        register(value);
        return cont(maybeAssign);
      }
      if (type2 == "variable") cx.marked = "property";
      if (type2 == "spread") return cont(pattern);
      if (type2 == "}") return pass();
      if (type2 == "[") return cont(expression, expect("]"), expect(":"), proppattern);
      return cont(expect(":"), pattern, maybeAssign);
    }
    function eltpattern() {
      return pass(pattern, maybeAssign);
    }
    function maybeAssign(_type, value) {
      if (value == "=") return cont(expressionNoComma);
    }
    function vardefCont(type2) {
      if (type2 == ",") return cont(vardef);
    }
    function maybeelse(type2, value) {
      if (type2 == "keyword b" && value == "else") return cont(pushlex("form", "else"), statement, poplex);
    }
    function forspec(type2, value) {
      if (value == "await") return cont(forspec);
      if (type2 == "(") return cont(pushlex(")"), forspec1, poplex);
    }
    function forspec1(type2) {
      if (type2 == "var") return cont(vardef, forspec2);
      if (type2 == "variable") return cont(forspec2);
      return pass(forspec2);
    }
    function forspec2(type2, value) {
      if (type2 == ")") return cont();
      if (type2 == ";") return cont(forspec2);
      if (value == "in" || value == "of") {
        cx.marked = "keyword";
        return cont(expression, forspec2);
      }
      return pass(expression, forspec2);
    }
    function functiondef(type2, value) {
      if (value == "*") {
        cx.marked = "keyword";
        return cont(functiondef);
      }
      if (type2 == "variable") {
        register(value);
        return cont(functiondef);
      }
      if (type2 == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, statement, popcontext);
      if (isTS && value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondef);
    }
    function functiondecl(type2, value) {
      if (value == "*") {
        cx.marked = "keyword";
        return cont(functiondecl);
      }
      if (type2 == "variable") {
        register(value);
        return cont(functiondecl);
      }
      if (type2 == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, popcontext);
      if (isTS && value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondecl);
    }
    function typename(type2, value) {
      if (type2 == "keyword" || type2 == "variable") {
        cx.marked = "type";
        return cont(typename);
      } else if (value == "<") {
        return cont(pushlex(">"), commasep(typeparam, ">"), poplex);
      }
    }
    function funarg(type2, value) {
      if (value == "@") cont(expression, funarg);
      if (type2 == "spread") return cont(funarg);
      if (isTS && isModifier(value)) {
        cx.marked = "keyword";
        return cont(funarg);
      }
      if (isTS && type2 == "this") return cont(maybetype, maybeAssign);
      return pass(pattern, maybetype, maybeAssign);
    }
    function classExpression(type2, value) {
      if (type2 == "variable") return className(type2, value);
      return classNameAfter(type2, value);
    }
    function className(type2, value) {
      if (type2 == "variable") {
        register(value);
        return cont(classNameAfter);
      }
    }
    function classNameAfter(type2, value) {
      if (value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, classNameAfter);
      if (value == "extends" || value == "implements" || isTS && type2 == ",") {
        if (value == "implements") cx.marked = "keyword";
        return cont(isTS ? typeexpr : expression, classNameAfter);
      }
      if (type2 == "{") return cont(pushlex("}"), classBody, poplex);
    }
    function classBody(type2, value) {
      if (type2 == "async" || type2 == "variable" && (value == "static" || value == "get" || value == "set" || isTS && isModifier(value)) && cx.stream.match(/^\s+#?[\w$\xa1-\uffff]/, false)) {
        cx.marked = "keyword";
        return cont(classBody);
      }
      if (type2 == "variable" || cx.style == "keyword") {
        cx.marked = "property";
        return cont(classfield, classBody);
      }
      if (type2 == "number" || type2 == "string") return cont(classfield, classBody);
      if (type2 == "[")
        return cont(expression, maybetype, expect("]"), classfield, classBody);
      if (value == "*") {
        cx.marked = "keyword";
        return cont(classBody);
      }
      if (isTS && type2 == "(") return pass(functiondecl, classBody);
      if (type2 == ";" || type2 == ",") return cont(classBody);
      if (type2 == "}") return cont();
      if (value == "@") return cont(expression, classBody);
    }
    function classfield(type2, value) {
      if (value == "!") return cont(classfield);
      if (value == "?") return cont(classfield);
      if (type2 == ":") return cont(typeexpr, maybeAssign);
      if (value == "=") return cont(expressionNoComma);
      var context = cx.state.lexical.prev, isInterface = context && context.info == "interface";
      return pass(isInterface ? functiondecl : functiondef);
    }
    function afterExport(type2, value) {
      if (value == "*") {
        cx.marked = "keyword";
        return cont(maybeFrom, expect(";"));
      }
      if (value == "default") {
        cx.marked = "keyword";
        return cont(expression, expect(";"));
      }
      if (type2 == "{") return cont(commasep(exportField, "}"), maybeFrom, expect(";"));
      return pass(statement);
    }
    function exportField(type2, value) {
      if (value == "as") {
        cx.marked = "keyword";
        return cont(expect("variable"));
      }
      if (type2 == "variable") return pass(expressionNoComma, exportField);
    }
    function afterImport(type2) {
      if (type2 == "string") return cont();
      if (type2 == "(") return pass(expression);
      if (type2 == ".") return pass(maybeoperatorComma);
      return pass(importSpec, maybeMoreImports, maybeFrom);
    }
    function importSpec(type2, value) {
      if (type2 == "{") return contCommasep(importSpec, "}");
      if (type2 == "variable") register(value);
      if (value == "*") cx.marked = "keyword";
      return cont(maybeAs);
    }
    function maybeMoreImports(type2) {
      if (type2 == ",") return cont(importSpec, maybeMoreImports);
    }
    function maybeAs(_type, value) {
      if (value == "as") {
        cx.marked = "keyword";
        return cont(importSpec);
      }
    }
    function maybeFrom(_type, value) {
      if (value == "from") {
        cx.marked = "keyword";
        return cont(expression);
      }
    }
    function arrayLiteral(type2) {
      if (type2 == "]") return cont();
      return pass(commasep(expressionNoComma, "]"));
    }
    function enumdef() {
      return pass(pushlex("form"), pattern, expect("{"), pushlex("}"), commasep(enummember, "}"), poplex, poplex);
    }
    function enummember() {
      return pass(pattern, maybeAssign);
    }
    function isContinuedStatement(state, textAfter) {
      return state.lastType == "operator" || state.lastType == "," || isOperatorChar.test(textAfter.charAt(0)) || /[,.]/.test(textAfter.charAt(0));
    }
    function expressionAllowed(stream, state, backUp) {
      return state.tokenize == tokenBase && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(state.lastType) || state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0)));
    }
    return {
      startState: function(basecolumn) {
        var state = {
          tokenize: tokenBase,
          lastType: "sof",
          cc: [],
          lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
          localVars: parserConfig.localVars,
          context: parserConfig.localVars && new Context(null, null, false),
          indented: basecolumn || 0
        };
        if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
          state.globalVars = parserConfig.globalVars;
        return state;
      },
      token: function(stream, state) {
        if (stream.sol()) {
          if (!state.lexical.hasOwnProperty("align"))
            state.lexical.align = false;
          state.indented = stream.indentation();
          findFatArrow(stream, state);
        }
        if (state.tokenize != tokenComment && stream.eatSpace()) return null;
        var style = state.tokenize(stream, state);
        if (type == "comment") return style;
        state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
        return parseJS(state, style, type, content, stream);
      },
      indent: function(state, textAfter) {
        if (state.tokenize == tokenComment || state.tokenize == tokenQuasi) return CodeMirror2.Pass;
        if (state.tokenize != tokenBase) return 0;
        var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical, top;
        if (!/^\s*else\b/.test(textAfter)) for (var i = state.cc.length - 1; i >= 0; --i) {
          var c = state.cc[i];
          if (c == poplex) lexical = lexical.prev;
          else if (c != maybeelse && c != popcontext) break;
        }
        while ((lexical.type == "stat" || lexical.type == "form") && (firstChar == "}" || (top = state.cc[state.cc.length - 1]) && (top == maybeoperatorComma || top == maybeoperatorNoComma) && !/^[,\.=+\-*:?[\(]/.test(textAfter)))
          lexical = lexical.prev;
        if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
          lexical = lexical.prev;
        var type2 = lexical.type, closing = firstChar == type2;
        if (type2 == "vardef") return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info.length + 1 : 0);
        else if (type2 == "form" && firstChar == "{") return lexical.indented;
        else if (type2 == "form") return lexical.indented + indentUnit;
        else if (type2 == "stat")
          return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
        else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
          return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
        else if (lexical.align) return lexical.column + (closing ? 0 : 1);
        else return lexical.indented + (closing ? 0 : indentUnit);
      },
      electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
      blockCommentStart: jsonMode ? null : "/*",
      blockCommentEnd: jsonMode ? null : "*/",
      blockCommentContinue: jsonMode ? null : " * ",
      lineComment: jsonMode ? null : "//",
      fold: "brace",
      closeBrackets: "()[]{}''\"\"``",
      helperType: jsonMode ? "json" : "javascript",
      jsonldMode,
      jsonMode,
      expressionAllowed,
      skipExpression: function(state) {
        parseJS(state, "atom", "atom", "true", new CodeMirror2.StringStream("", 2, null));
      }
    };
  });
  CodeMirror2.registerHelper("wordChars", "javascript", /[\w$]/);
  CodeMirror2.defineMIME("text/javascript", "javascript");
  CodeMirror2.defineMIME("text/ecmascript", "javascript");
  CodeMirror2.defineMIME("application/javascript", "javascript");
  CodeMirror2.defineMIME("application/x-javascript", "javascript");
  CodeMirror2.defineMIME("application/ecmascript", "javascript");
  CodeMirror2.defineMIME("application/json", { name: "javascript", json: true });
  CodeMirror2.defineMIME("application/x-json", { name: "javascript", json: true });
  CodeMirror2.defineMIME("application/manifest+json", { name: "javascript", json: true });
  CodeMirror2.defineMIME("application/ld+json", { name: "javascript", jsonld: true });
  CodeMirror2.defineMIME("text/typescript", { name: "javascript", typescript: true });
  CodeMirror2.defineMIME("application/typescript", { name: "javascript", typescript: true });
});
var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism = (function(_self2) {
  var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
  var uniqueId = 0;
  var plainTextGrammar = {};
  var _ = {
    /**
     * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
     * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
     * additional languages or plugins yourself.
     *
     * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
     *
     * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
     * empty Prism object into the global scope before loading the Prism script like this:
     *
     * ```js
     * window.Prism = window.Prism || {};
     * Prism.manual = true;
     * // add a new <script> to load Prism's script
     * ```
     *
     * @default false
     * @type {boolean}
     * @memberof Prism
     * @public
     */
    manual: _self2.Prism && _self2.Prism.manual,
    /**
     * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
     * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
     * own worker, you don't want it to do this.
     *
     * By setting this value to `true`, Prism will not add its own listeners to the worker.
     *
     * You obviously have to change this value before Prism executes. To do this, you can add an
     * empty Prism object into the global scope before loading the Prism script like this:
     *
     * ```js
     * window.Prism = window.Prism || {};
     * Prism.disableWorkerMessageHandler = true;
     * // Load Prism's script
     * ```
     *
     * @default false
     * @type {boolean}
     * @memberof Prism
     * @public
     */
    disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
    /**
     * A namespace for utility methods.
     *
     * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
     * change or disappear at any time.
     *
     * @namespace
     * @memberof Prism
     */
    util: {
      encode: function encode(tokens) {
        if (tokens instanceof Token) {
          return new Token(tokens.type, encode(tokens.content), tokens.alias);
        } else if (Array.isArray(tokens)) {
          return tokens.map(encode);
        } else {
          return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
        }
      },
      /**
       * Returns the name of the type of the given value.
       *
       * @param {any} o
       * @returns {string}
       * @example
       * type(null)      === 'Null'
       * type(undefined) === 'Undefined'
       * type(123)       === 'Number'
       * type('foo')     === 'String'
       * type(true)      === 'Boolean'
       * type([1, 2])    === 'Array'
       * type({})        === 'Object'
       * type(String)    === 'Function'
       * type(/abc+/)    === 'RegExp'
       */
      type: function(o) {
        return Object.prototype.toString.call(o).slice(8, -1);
      },
      /**
       * Returns a unique number for the given object. Later calls will still return the same number.
       *
       * @param {Object} obj
       * @returns {number}
       */
      objId: function(obj) {
        if (!obj["__id"]) {
          Object.defineProperty(obj, "__id", { value: ++uniqueId });
        }
        return obj["__id"];
      },
      /**
       * Creates a deep clone of the given object.
       *
       * The main intended use of this function is to clone language definitions.
       *
       * @param {T} o
       * @param {Record<number, any>} [visited]
       * @returns {T}
       * @template T
       */
      clone: function deepClone(o, visited) {
        visited = visited || {};
        var clone;
        var id;
        switch (_.util.type(o)) {
          case "Object":
            id = _.util.objId(o);
            if (visited[id]) {
              return visited[id];
            }
            clone = /** @type {Record<string, any>} */
            {};
            visited[id] = clone;
            for (var key in o) {
              if (o.hasOwnProperty(key)) {
                clone[key] = deepClone(o[key], visited);
              }
            }
            return (
              /** @type {any} */
              clone
            );
          case "Array":
            id = _.util.objId(o);
            if (visited[id]) {
              return visited[id];
            }
            clone = [];
            visited[id] = clone;
            /** @type {Array} */
            /** @type {any} */
            o.forEach(function(v, i) {
              clone[i] = deepClone(v, visited);
            });
            return (
              /** @type {any} */
              clone
            );
          default:
            return o;
        }
      },
      /**
       * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
       *
       * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
       *
       * @param {Element} element
       * @returns {string}
       */
      getLanguage: function(element) {
        while (element) {
          var m = lang.exec(element.className);
          if (m) {
            return m[1].toLowerCase();
          }
          element = element.parentElement;
        }
        return "none";
      },
      /**
       * Sets the Prism `language-xxxx` class of the given element.
       *
       * @param {Element} element
       * @param {string} language
       * @returns {void}
       */
      setLanguage: function(element, language) {
        element.className = element.className.replace(RegExp(lang, "gi"), "");
        element.classList.add("language-" + language);
      },
      /**
       * Returns the script element that is currently executing.
       *
       * This does __not__ work for line script element.
       *
       * @returns {HTMLScriptElement | null}
       */
      currentScript: function() {
        if (typeof document === "undefined") {
          return null;
        }
        if (document.currentScript && document.currentScript.tagName === "SCRIPT" && 1 < 2) {
          return (
            /** @type {any} */
            document.currentScript
          );
        }
        try {
          throw new Error();
        } catch (err) {
          var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
          if (src) {
            var scripts = document.getElementsByTagName("script");
            for (var i in scripts) {
              if (scripts[i].src == src) {
                return scripts[i];
              }
            }
          }
          return null;
        }
      },
      /**
       * Returns whether a given class is active for `element`.
       *
       * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
       * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
       * given class is just the given class with a `no-` prefix.
       *
       * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
       * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
       * ancestors have the given class or the negated version of it, then the default activation will be returned.
       *
       * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
       * version of it, the class is considered active.
       *
       * @param {Element} element
       * @param {string} className
       * @param {boolean} [defaultActivation=false]
       * @returns {boolean}
       */
      isActive: function(element, className, defaultActivation) {
        var no = "no-" + className;
        while (element) {
          var classList = element.classList;
          if (classList.contains(className)) {
            return true;
          }
          if (classList.contains(no)) {
            return false;
          }
          element = element.parentElement;
        }
        return !!defaultActivation;
      }
    },
    /**
     * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
     *
     * @namespace
     * @memberof Prism
     * @public
     */
    languages: {
      /**
       * The grammar for plain, unformatted text.
       */
      plain: plainTextGrammar,
      plaintext: plainTextGrammar,
      text: plainTextGrammar,
      txt: plainTextGrammar,
      /**
       * Creates a deep copy of the language with the given id and appends the given tokens.
       *
       * If a token in `redef` also appears in the copied language, then the existing token in the copied language
       * will be overwritten at its original position.
       *
       * ## Best practices
       *
       * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
       * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
       * understand the language definition because, normally, the order of tokens matters in Prism grammars.
       *
       * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
       * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
       *
       * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
       * @param {Grammar} redef The new tokens to append.
       * @returns {Grammar} The new language created.
       * @public
       * @example
       * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
       *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
       *     // at its original position
       *     'comment': { ... },
       *     // CSS doesn't have a 'color' token, so this token will be appended
       *     'color': /\b(?:red|green|blue)\b/
       * });
       */
      extend: function(id, redef) {
        var lang2 = _.util.clone(_.languages[id]);
        for (var key in redef) {
          lang2[key] = redef[key];
        }
        return lang2;
      },
      /**
       * Inserts tokens _before_ another token in a language definition or any other grammar.
       *
       * ## Usage
       *
       * This helper method makes it easy to modify existing languages. For example, the CSS language definition
       * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
       * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
       * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
       * this:
       *
       * ```js
       * Prism.languages.markup.style = {
       *     // token
       * };
       * ```
       *
       * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
       * before existing tokens. For the CSS example above, you would use it like this:
       *
       * ```js
       * Prism.languages.insertBefore('markup', 'cdata', {
       *     'style': {
       *         // token
       *     }
       * });
       * ```
       *
       * ## Special cases
       *
       * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
       * will be ignored.
       *
       * This behavior can be used to insert tokens after `before`:
       *
       * ```js
       * Prism.languages.insertBefore('markup', 'comment', {
       *     'comment': Prism.languages.markup.comment,
       *     // tokens after 'comment'
       * });
       * ```
       *
       * ## Limitations
       *
       * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
       * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
       * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
       * deleting properties which is necessary to insert at arbitrary positions.
       *
       * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
       * Instead, it will create a new object and replace all references to the target object with the new one. This
       * can be done without temporarily deleting properties, so the iteration order is well-defined.
       *
       * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
       * you hold the target object in a variable, then the value of the variable will not change.
       *
       * ```js
       * var oldMarkup = Prism.languages.markup;
       * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
       *
       * assert(oldMarkup !== Prism.languages.markup);
       * assert(newMarkup === Prism.languages.markup);
       * ```
       *
       * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
       * object to be modified.
       * @param {string} before The key to insert before.
       * @param {Grammar} insert An object containing the key-value pairs to be inserted.
       * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
       * object to be modified.
       *
       * Defaults to `Prism.languages`.
       * @returns {Grammar} The new grammar object.
       * @public
       */
      insertBefore: function(inside, before, insert, root) {
        root = root || /** @type {any} */
        _.languages;
        var grammar = root[inside];
        var ret = {};
        for (var token in grammar) {
          if (grammar.hasOwnProperty(token)) {
            if (token == before) {
              for (var newToken in insert) {
                if (insert.hasOwnProperty(newToken)) {
                  ret[newToken] = insert[newToken];
                }
              }
            }
            if (!insert.hasOwnProperty(token)) {
              ret[token] = grammar[token];
            }
          }
        }
        var old = root[inside];
        root[inside] = ret;
        _.languages.DFS(_.languages, function(key, value) {
          if (value === old && key != inside) {
            this[key] = ret;
          }
        });
        return ret;
      },
      // Traverse a language definition with Depth First Search
      DFS: function DFS(o, callback, type, visited) {
        visited = visited || {};
        var objId = _.util.objId;
        for (var i in o) {
          if (o.hasOwnProperty(i)) {
            callback.call(o, i, o[i], type || i);
            var property = o[i];
            var propertyType = _.util.type(property);
            if (propertyType === "Object" && !visited[objId(property)]) {
              visited[objId(property)] = true;
              DFS(property, callback, null, visited);
            } else if (propertyType === "Array" && !visited[objId(property)]) {
              visited[objId(property)] = true;
              DFS(property, callback, i, visited);
            }
          }
        }
      }
    },
    plugins: {},
    /**
     * This is the most high-level function in Prism’s API.
     * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
     * each one of them.
     *
     * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
     *
     * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
     * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
     * @memberof Prism
     * @public
     */
    highlightAll: function(async, callback) {
      _.highlightAllUnder(document, async, callback);
    },
    /**
     * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
     * {@link Prism.highlightElement} on each one of them.
     *
     * The following hooks will be run:
     * 1. `before-highlightall`
     * 2. `before-all-elements-highlight`
     * 3. All hooks of {@link Prism.highlightElement} for each element.
     *
     * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
     * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
     * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
     * @memberof Prism
     * @public
     */
    highlightAllUnder: function(container, async, callback) {
      var env = {
        callback,
        container,
        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      };
      _.hooks.run("before-highlightall", env);
      env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
      _.hooks.run("before-all-elements-highlight", env);
      for (var i = 0, element; element = env.elements[i++]; ) {
        _.highlightElement(element, async === true, env.callback);
      }
    },
    /**
     * Highlights the code inside a single element.
     *
     * The following hooks will be run:
     * 1. `before-sanity-check`
     * 2. `before-highlight`
     * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
     * 4. `before-insert`
     * 5. `after-highlight`
     * 6. `complete`
     *
     * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
     * the element's language.
     *
     * @param {Element} element The element containing the code.
     * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
     * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
     * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
     * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
     *
     * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
     * asynchronous highlighting to work. You can build your own bundle on the
     * [Download page](https://prismjs.com/download.html).
     * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
     * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
     * @memberof Prism
     * @public
     */
    highlightElement: function(element, async, callback) {
      var language = _.util.getLanguage(element);
      var grammar = _.languages[language];
      _.util.setLanguage(element, language);
      var parent = element.parentElement;
      if (parent && parent.nodeName.toLowerCase() === "pre") {
        _.util.setLanguage(parent, language);
      }
      var code = element.textContent;
      var env = {
        element,
        language,
        grammar,
        code
      };
      function insertHighlightedCode(highlightedCode) {
        env.highlightedCode = highlightedCode;
        _.hooks.run("before-insert", env);
        env.element.innerHTML = env.highlightedCode;
        _.hooks.run("after-highlight", env);
        _.hooks.run("complete", env);
        callback && callback.call(env.element);
      }
      _.hooks.run("before-sanity-check", env);
      parent = env.element.parentElement;
      if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
        parent.setAttribute("tabindex", "0");
      }
      if (!env.code) {
        _.hooks.run("complete", env);
        callback && callback.call(env.element);
        return;
      }
      _.hooks.run("before-highlight", env);
      if (!env.grammar) {
        insertHighlightedCode(_.util.encode(env.code));
        return;
      }
      if (async && _self2.Worker) {
        var worker = new Worker(_.filename);
        worker.onmessage = function(evt) {
          insertHighlightedCode(evt.data);
        };
        worker.postMessage(JSON.stringify({
          language: env.language,
          code: env.code,
          immediateClose: true
        }));
      } else {
        insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
      }
    },
    /**
     * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
     * and the language definitions to use, and returns a string with the HTML produced.
     *
     * The following hooks will be run:
     * 1. `before-tokenize`
     * 2. `after-tokenize`
     * 3. `wrap`: On each {@link Token}.
     *
     * @param {string} text A string with the code to be highlighted.
     * @param {Grammar} grammar An object containing the tokens to use.
     *
     * Usually a language definition like `Prism.languages.markup`.
     * @param {string} language The name of the language definition passed to `grammar`.
     * @returns {string} The highlighted HTML.
     * @memberof Prism
     * @public
     * @example
     * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
     */
    highlight: function(text, grammar, language) {
      var env = {
        code: text,
        grammar,
        language
      };
      _.hooks.run("before-tokenize", env);
      if (!env.grammar) {
        throw new Error('The language "' + env.language + '" has no grammar.');
      }
      env.tokens = _.tokenize(env.code, env.grammar);
      _.hooks.run("after-tokenize", env);
      return Token.stringify(_.util.encode(env.tokens), env.language);
    },
    /**
     * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
     * and the language definitions to use, and returns an array with the tokenized code.
     *
     * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
     *
     * This method could be useful in other contexts as well, as a very crude parser.
     *
     * @param {string} text A string with the code to be highlighted.
     * @param {Grammar} grammar An object containing the tokens to use.
     *
     * Usually a language definition like `Prism.languages.markup`.
     * @returns {TokenStream} An array of strings and tokens, a token stream.
     * @memberof Prism
     * @public
     * @example
     * let code = `var foo = 0;`;
     * let tokens = Prism.tokenize(code, Prism.languages.javascript);
     * tokens.forEach(token => {
     *     if (token instanceof Prism.Token && token.type === 'number') {
     *         console.log(`Found numeric literal: ${token.content}`);
     *     }
     * });
     */
    tokenize: function(text, grammar) {
      var rest = grammar.rest;
      if (rest) {
        for (var token in rest) {
          grammar[token] = rest[token];
        }
        delete grammar.rest;
      }
      var tokenList = new LinkedList();
      addAfter(tokenList, tokenList.head, text);
      matchGrammar(text, tokenList, grammar, tokenList.head, 0);
      return toArray(tokenList);
    },
    /**
     * @namespace
     * @memberof Prism
     * @public
     */
    hooks: {
      all: {},
      /**
       * Adds the given callback to the list of callbacks for the given hook.
       *
       * The callback will be invoked when the hook it is registered for is run.
       * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
       *
       * One callback function can be registered to multiple hooks and the same hook multiple times.
       *
       * @param {string} name The name of the hook.
       * @param {HookCallback} callback The callback function which is given environment variables.
       * @public
       */
      add: function(name, callback) {
        var hooks = _.hooks.all;
        hooks[name] = hooks[name] || [];
        hooks[name].push(callback);
      },
      /**
       * Runs a hook invoking all registered callbacks with the given environment variables.
       *
       * Callbacks will be invoked synchronously and in the order in which they were registered.
       *
       * @param {string} name The name of the hook.
       * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
       * @public
       */
      run: function(name, env) {
        var callbacks = _.hooks.all[name];
        if (!callbacks || !callbacks.length) {
          return;
        }
        for (var i = 0, callback; callback = callbacks[i++]; ) {
          callback(env);
        }
      }
    },
    Token
  };
  _self2.Prism = _;
  function Token(type, content, alias, matchedStr) {
    this.type = type;
    this.content = content;
    this.alias = alias;
    this.length = (matchedStr || "").length | 0;
  }
  Token.stringify = function stringify(o, language) {
    if (typeof o == "string") {
      return o;
    }
    if (Array.isArray(o)) {
      var s = "";
      o.forEach(function(e) {
        s += stringify(e, language);
      });
      return s;
    }
    var env = {
      type: o.type,
      content: stringify(o.content, language),
      tag: "span",
      classes: ["token", o.type],
      attributes: {},
      language
    };
    var aliases = o.alias;
    if (aliases) {
      if (Array.isArray(aliases)) {
        Array.prototype.push.apply(env.classes, aliases);
      } else {
        env.classes.push(aliases);
      }
    }
    _.hooks.run("wrap", env);
    var attributes = "";
    for (var name in env.attributes) {
      attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
    }
    return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
  };
  function matchPattern(pattern, pos, text, lookbehind) {
    pattern.lastIndex = pos;
    var match = pattern.exec(text);
    if (match && lookbehind && match[1]) {
      var lookbehindLength = match[1].length;
      match.index += lookbehindLength;
      match[0] = match[0].slice(lookbehindLength);
    }
    return match;
  }
  function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
    for (var token in grammar) {
      if (!grammar.hasOwnProperty(token) || !grammar[token]) {
        continue;
      }
      var patterns = grammar[token];
      patterns = Array.isArray(patterns) ? patterns : [patterns];
      for (var j = 0; j < patterns.length; ++j) {
        if (rematch && rematch.cause == token + "," + j) {
          return;
        }
        var patternObj = patterns[j];
        var inside = patternObj.inside;
        var lookbehind = !!patternObj.lookbehind;
        var greedy = !!patternObj.greedy;
        var alias = patternObj.alias;
        if (greedy && !patternObj.pattern.global) {
          var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
          patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
        }
        var pattern = patternObj.pattern || patternObj;
        for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
          if (rematch && pos >= rematch.reach) {
            break;
          }
          var str = currentNode.value;
          if (tokenList.length > text.length) {
            return;
          }
          if (str instanceof Token) {
            continue;
          }
          var removeCount = 1;
          var match;
          if (greedy) {
            match = matchPattern(pattern, pos, text, lookbehind);
            if (!match || match.index >= text.length) {
              break;
            }
            var from = match.index;
            var to = match.index + match[0].length;
            var p = pos;
            p += currentNode.value.length;
            while (from >= p) {
              currentNode = currentNode.next;
              p += currentNode.value.length;
            }
            p -= currentNode.value.length;
            pos = p;
            if (currentNode.value instanceof Token) {
              continue;
            }
            for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
              removeCount++;
              p += k.value.length;
            }
            removeCount--;
            str = text.slice(pos, p);
            match.index -= pos;
          } else {
            match = matchPattern(pattern, 0, str, lookbehind);
            if (!match) {
              continue;
            }
          }
          var from = match.index;
          var matchStr = match[0];
          var before = str.slice(0, from);
          var after = str.slice(from + matchStr.length);
          var reach = pos + str.length;
          if (rematch && reach > rematch.reach) {
            rematch.reach = reach;
          }
          var removeFrom = currentNode.prev;
          if (before) {
            removeFrom = addAfter(tokenList, removeFrom, before);
            pos += before.length;
          }
          removeRange(tokenList, removeFrom, removeCount);
          var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
          currentNode = addAfter(tokenList, removeFrom, wrapped);
          if (after) {
            addAfter(tokenList, currentNode, after);
          }
          if (removeCount > 1) {
            var nestedRematch = {
              cause: token + "," + j,
              reach
            };
            matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
            if (rematch && nestedRematch.reach > rematch.reach) {
              rematch.reach = nestedRematch.reach;
            }
          }
        }
      }
    }
  }
  function LinkedList() {
    var head = { value: null, prev: null, next: null };
    var tail = { value: null, prev: head, next: null };
    head.next = tail;
    this.head = head;
    this.tail = tail;
    this.length = 0;
  }
  function addAfter(list, node, value) {
    var next = node.next;
    var newNode = { value, prev: node, next };
    node.next = newNode;
    next.prev = newNode;
    list.length++;
    return newNode;
  }
  function removeRange(list, node, count) {
    var next = node.next;
    for (var i = 0; i < count && next !== list.tail; i++) {
      next = next.next;
    }
    node.next = next;
    next.prev = node;
    list.length -= i;
  }
  function toArray(list) {
    var array = [];
    var node = list.head.next;
    while (node !== list.tail) {
      array.push(node.value);
      node = node.next;
    }
    return array;
  }
  if (!_self2.document) {
    if (!_self2.addEventListener) {
      return _;
    }
    if (!_.disableWorkerMessageHandler) {
      _self2.addEventListener("message", function(evt) {
        var message = JSON.parse(evt.data);
        var lang2 = message.language;
        var code = message.code;
        var immediateClose = message.immediateClose;
        _self2.postMessage(_.highlight(code, _.languages[lang2], lang2));
        if (immediateClose) {
          _self2.close();
        }
      }, false);
    }
    return _;
  }
  var script = _.util.currentScript();
  if (script) {
    _.filename = script.src;
    if (script.hasAttribute("data-manual")) {
      _.manual = true;
    }
  }
  function highlightAutomaticallyCallback() {
    if (!_.manual) {
      _.highlightAll();
    }
  }
  if (!_.manual) {
    var readyState = document.readyState;
    if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
      document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
    } else {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(highlightAutomaticallyCallback);
      } else {
        window.setTimeout(highlightAutomaticallyCallback, 16);
      }
    }
  }
  return _;
})(_self);
if (typeof module !== "undefined" && module.exports) {
  module.exports = Prism;
}
if (typeof global !== "undefined") {
  global.Prism = Prism;
}
Prism.languages.markup = {
  "comment": {
    pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
    greedy: true
  },
  "prolog": {
    pattern: /<\?[\s\S]+?\?>/,
    greedy: true
  },
  "doctype": {
    // https://www.w3.org/TR/xml/#NT-doctypedecl
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: true,
    inside: {
      "internal-subset": {
        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: true,
        greedy: true,
        inside: null
        // see below
      },
      "string": {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: true
      },
      "punctuation": /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/i,
      "name": /[^\s<>'"]+/
    }
  },
  "cdata": {
    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
    greedy: true
  },
  "tag": {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      "tag": {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          "punctuation": /^<\/?/,
          "namespace": /^[^\s>\/:]+:/
        }
      },
      "special-attr": [],
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          "punctuation": [
            {
              pattern: /^=/,
              alias: "attr-equals"
            },
            {
              pattern: /^(\s*)["']|["']$/,
              lookbehind: true
            }
          ]
        }
      },
      "punctuation": /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          "namespace": /^[^\s>\/:]+:/
        }
      }
    }
  },
  "entity": [
    {
      pattern: /&[\da-z]{1,8};/i,
      alias: "named-entity"
    },
    /&#x?[\da-f]{1,8};/i
  ]
};
Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism.languages.markup["entity"];
Prism.languages.markup["doctype"].inside["internal-subset"].inside = Prism.languages.markup;
Prism.hooks.add("wrap", function(env) {
  if (env.type === "entity") {
    env.attributes["title"] = env.content.replace(/&amp;/, "&");
  }
});
Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
  /**
   * Adds an inlined language to markup.
   *
   * An example of an inlined language is CSS with `<style>` tags.
   *
   * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addInlined('style', 'css');
   */
  value: function addInlined(tagName, lang) {
    var includedCdataInside = {};
    includedCdataInside["language-" + lang] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: true,
      inside: Prism.languages[lang]
    };
    includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
    var inside = {
      "included-cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: includedCdataInside
      }
    };
    inside["language-" + lang] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[lang]
    };
    var def = {};
    def[tagName] = {
      pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
        return tagName;
      }), "i"),
      lookbehind: true,
      greedy: true,
      inside
    };
    Prism.languages.insertBefore("markup", "cdata", def);
  }
});
Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
  /**
   * Adds an pattern to highlight languages embedded in HTML attributes.
   *
   * An example of an inlined language is CSS with `style` attributes.
   *
   * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addAttribute('style', 'css');
   */
  value: function(attrName, lang) {
    Prism.languages.markup.tag.inside["special-attr"].push({
      pattern: RegExp(
        /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
        "i"
      ),
      lookbehind: true,
      inside: {
        "attr-name": /^[^\s=]+/,
        "attr-value": {
          pattern: /=[\s\S]+/,
          inside: {
            "value": {
              pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
              lookbehind: true,
              alias: [lang, "language-" + lang],
              inside: Prism.languages[lang]
            },
            "punctuation": [
              {
                pattern: /^=/,
                alias: "attr-equals"
              },
              /"|'/
            ]
          }
        }
      }
    });
  }
});
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;
Prism.languages.xml = Prism.languages.extend("markup", {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;
(function(Prism2) {
  var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  Prism2.languages.css = {
    "comment": /\/\*[\s\S]*?\*\//,
    "atrule": {
      pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
      inside: {
        "rule": /^@[\w-]+/,
        "selector-function-argument": {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: true,
          alias: "selector"
        },
        "keyword": {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: true
        }
        // See rest below
      }
    },
    "url": {
      // https://drafts.csswg.org/css-values-3/#urls
      pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
      greedy: true,
      inside: {
        "function": /^url/i,
        "punctuation": /^\(|\)$/,
        "string": {
          pattern: RegExp("^" + string.source + "$"),
          alias: "url"
        }
      }
    },
    "selector": {
      pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
      lookbehind: true
    },
    "string": {
      pattern: string,
      greedy: true
    },
    "property": {
      pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: true
    },
    "important": /!important\b/i,
    "function": {
      pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
      lookbehind: true
    },
    "punctuation": /[(){};:,]/
  };
  Prism2.languages.css["atrule"].inside.rest = Prism2.languages.css;
  var markup = Prism2.languages.markup;
  if (markup) {
    markup.tag.addInlined("style", "css");
    markup.tag.addAttribute("style", "css");
  }
})(Prism);
Prism.languages.clike = {
  "comment": [
    {
      pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
      lookbehind: true,
      greedy: true
    },
    {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: true,
      greedy: true
    }
  ],
  "string": {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  "class-name": {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: true,
    inside: {
      "punctuation": /[.\\]/
    }
  },
  "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  "boolean": /\b(?:false|true)\b/,
  "function": /\b\w+(?=\()/,
  "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  "punctuation": /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
      lookbehind: true
    }
  ],
  "keyword": [
    {
      pattern: /((?:^|\})\s*)catch\b/,
      lookbehind: true
    },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: true
    }
  ],
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  "number": {
    pattern: RegExp(
      /(^|[^\w$])/.source + "(?:" + // constant
      (/NaN|Infinity/.source + "|" + // binary integer
      /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
      /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
      /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
      /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
      /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
    ),
    lookbehind: true
  },
  "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore("javascript", "keyword", {
  "regex": {
    pattern: RegExp(
      // lookbehind
      // eslint-disable-next-line regexp/no-dupe-characters-character-class
      /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
      // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
      // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
      // with the only syntax, so we have to define 2 different regex patterns.
      /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
      /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
      /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
    ),
    lookbehind: true,
    greedy: true,
    inside: {
      "regex-source": {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: true,
        alias: "language-regex",
        inside: Prism.languages.regex
      },
      "regex-delimiter": /^\/|\/$/,
      "regex-flags": /^[a-z]+$/
    }
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  "function-variable": {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: "function"
  },
  "parameter": [
    {
      pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    }
  ],
  "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore("javascript", "string", {
  "hashbang": {
    pattern: /^#!.*/,
    greedy: true,
    alias: "comment"
  },
  "template-string": {
    pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
    greedy: true,
    inside: {
      "template-punctuation": {
        pattern: /^`|`$/,
        alias: "string"
      },
      "interpolation": {
        pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
        lookbehind: true,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\$\{|\}$/,
            alias: "punctuation"
          },
          rest: Prism.languages.javascript
        }
      },
      "string": /[\s\S]+/
    }
  },
  "string-property": {
    pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
    lookbehind: true,
    greedy: true,
    alias: "property"
  }
});
Prism.languages.insertBefore("javascript", "operator", {
  "literal-property": {
    pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
    lookbehind: true,
    alias: "property"
  }
});
if (Prism.languages.markup) {
  Prism.languages.markup.tag.addInlined("script", "javascript");
  Prism.languages.markup.tag.addAttribute(
    /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
    "javascript"
  );
}
Prism.languages.js = Prism.languages.javascript;
(function() {
  if (typeof Prism === "undefined" || typeof document === "undefined") {
    return;
  }
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }
  var LOADING_MESSAGE = "Loading\u2026";
  var FAILURE_MESSAGE = function(status, message) {
    return "\u2716 Error " + status + " while fetching file: " + message;
  };
  var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
  var EXTENSIONS = {
    "js": "javascript",
    "py": "python",
    "rb": "ruby",
    "ps1": "powershell",
    "psm1": "powershell",
    "sh": "bash",
    "bat": "batch",
    "h": "c",
    "tex": "latex"
  };
  var STATUS_ATTR = "data-src-status";
  var STATUS_LOADING = "loading";
  var STATUS_LOADED = "loaded";
  var STATUS_FAILED = "failed";
  var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
  function loadFile(src, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", src, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status < 400 && xhr.responseText) {
          success(xhr.responseText);
        } else {
          if (xhr.status >= 400) {
            error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
          } else {
            error(FAILURE_EMPTY_MESSAGE);
          }
        }
      }
    };
    xhr.send(null);
  }
  function parseRange(range) {
    var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
    if (m) {
      var start = Number(m[1]);
      var comma = m[2];
      var end = m[3];
      if (!comma) {
        return [start, start];
      }
      if (!end) {
        return [start, void 0];
      }
      return [start, Number(end)];
    }
    return void 0;
  }
  Prism.hooks.add("before-highlightall", function(env) {
    env.selector += ", " + SELECTOR;
  });
  Prism.hooks.add("before-sanity-check", function(env) {
    var pre = (
      /** @type {HTMLPreElement} */
      env.element
    );
    if (pre.matches(SELECTOR)) {
      env.code = "";
      pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
      var code = pre.appendChild(document.createElement("CODE"));
      code.textContent = LOADING_MESSAGE;
      var src = pre.getAttribute("data-src");
      var language = env.language;
      if (language === "none") {
        var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
        language = EXTENSIONS[extension] || extension;
      }
      Prism.util.setLanguage(code, language);
      Prism.util.setLanguage(pre, language);
      var autoloader = Prism.plugins.autoloader;
      if (autoloader) {
        autoloader.loadLanguages(language);
      }
      loadFile(
        src,
        function(text) {
          pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
          var range = parseRange(pre.getAttribute("data-range"));
          if (range) {
            var lines = text.split(/\r\n?|\n/g);
            var start = range[0];
            var end = range[1] == null ? lines.length : range[1];
            if (start < 0) {
              start += lines.length;
            }
            start = Math.max(0, Math.min(start - 1, lines.length));
            if (end < 0) {
              end += lines.length;
            }
            end = Math.max(0, Math.min(end, lines.length));
            text = lines.slice(start, end).join("\n");
            if (!pre.hasAttribute("data-start")) {
              pre.setAttribute("data-start", String(start + 1));
            }
          }
          code.textContent = text;
          Prism.highlightElement(code);
        },
        function(error) {
          pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
          code.textContent = error;
        }
      );
    }
  });
  Prism.plugins.fileHighlight = {
    /**
     * Executes the File Highlight plugin for all matching `pre` elements under the given container.
     *
     * Note: Elements which are already loaded or currently loading will not be touched by this method.
     *
     * @param {ParentNode} [container=document]
     */
    highlight: function highlight(container) {
      var elements = (container || document).querySelectorAll(SELECTOR);
      for (var i = 0, element; element = elements[i++]; ) {
        Prism.highlightElement(element);
      }
    }
  };
  var logged = false;
  Prism.fileHighlight = function() {
    if (!logged) {
      console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
      logged = true;
    }
    Prism.plugins.fileHighlight.highlight.apply(this, arguments);
  };
})();
!(function(e) {
  function n(e2, n2) {
    return e2.replace(/<<(\d+)>>/g, (function(e3, s2) {
      return "(?:" + n2[+s2] + ")";
    }));
  }
  function s(e2, s2, a2) {
    return RegExp(n(e2, s2), a2 || "");
  }
  function a(e2, n2) {
    for (var s2 = 0; s2 < n2; s2++) e2 = e2.replace(/<<self>>/g, (function() {
      return "(?:" + e2 + ")";
    }));
    return e2.replace(/<<self>>/g, "[^\\s\\S]");
  }
  var t = "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void", r = "class enum interface record struct", i = "add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)", o = "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield";
  function l(e2) {
    return "\\b(?:" + e2.trim().replace(/ /g, "|") + ")\\b";
  }
  var d = l(r), p = RegExp(l(t + " " + r + " " + i + " " + o)), c = l(r + " " + i + " " + o), u = l(t + " " + r + " " + o), g = a("<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>", 2), b = a("\\((?:[^()]|<<self>>)*\\)", 2), h = "@?\\b[A-Za-z_]\\w*\\b", f = n("<<0>>(?:\\s*<<1>>)?", [h, g]), m = n("(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*", [c, f]), k = "\\[\\s*(?:,\\s*)*\\]", y = n("<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?", [m, k]), w = n("[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>", [g, b, k]), v = n("\\(<<0>>+(?:,<<0>>+)+\\)", [w]), x = n("(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?", [v, m, k]), $ = { keyword: p, punctuation: /[<>()?,.:[\]]/ }, _ = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'", B = '"(?:\\\\.|[^\\\\"\r\n])*"';
  e.languages.csharp = e.languages.extend("clike", { string: [{ pattern: s("(^|[^$\\\\])<<0>>", ['@"(?:""|\\\\[^]|[^\\\\"])*"(?!")']), lookbehind: true, greedy: true }, { pattern: s("(^|[^@$\\\\])<<0>>", [B]), lookbehind: true, greedy: true }], "class-name": [{ pattern: s("(\\busing\\s+static\\s+)<<0>>(?=\\s*;)", [m]), lookbehind: true, inside: $ }, { pattern: s("(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)", [h, x]), lookbehind: true, inside: $ }, { pattern: s("(\\busing\\s+)<<0>>(?=\\s*=)", [h]), lookbehind: true }, { pattern: s("(\\b<<0>>\\s+)<<1>>", [d, f]), lookbehind: true, inside: $ }, { pattern: s("(\\bcatch\\s*\\(\\s*)<<0>>", [m]), lookbehind: true, inside: $ }, { pattern: s("(\\bwhere\\s+)<<0>>", [h]), lookbehind: true }, { pattern: s("(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>", [y]), lookbehind: true, inside: $ }, { pattern: s("\\b<<0>>(?=\\s+(?!<<1>>|with\\s*\\{)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))", [x, u, h]), inside: $ }], keyword: p, number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i, operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/, punctuation: /\?\.?|::|[{}[\];(),.:]/ }), e.languages.insertBefore("csharp", "number", { range: { pattern: /\.\./, alias: "operator" } }), e.languages.insertBefore("csharp", "punctuation", { "named-parameter": { pattern: s("([(,]\\s*)<<0>>(?=\\s*:)", [h]), lookbehind: true, alias: "punctuation" } }), e.languages.insertBefore("csharp", "class-name", { namespace: { pattern: s("(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])", [h]), lookbehind: true, inside: { punctuation: /\./ } }, "type-expression": { pattern: s("(\\b(?:default|sizeof|typeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<<0>>)*(?=\\s*\\))", [b]), lookbehind: true, alias: "class-name", inside: $ }, "return-type": { pattern: s("<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))", [x, m]), inside: $, alias: "class-name" }, "constructor-invocation": { pattern: s("(\\bnew\\s+)<<0>>(?=\\s*[[({])", [x]), lookbehind: true, inside: $, alias: "class-name" }, "generic-method": { pattern: s("<<0>>\\s*<<1>>(?=\\s*\\()", [h, g]), inside: { function: s("^<<0>>", [h]), generic: { pattern: RegExp(g), alias: "class-name", inside: $ } } }, "type-list": { pattern: s("\\b((?:<<0>>\\s+<<1>>|record\\s+<<1>>\\s*<<5>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>|<<1>>\\s*<<5>>|<<6>>)(?:\\s*,\\s*(?:<<3>>|<<4>>|<<6>>))*(?=\\s*(?:where|[{;]|=>|$))", [d, f, h, x, p.source, b, "\\bnew\\s*\\(\\s*\\)"]), lookbehind: true, inside: { "record-arguments": { pattern: s("(^(?!new\\s*\\()<<0>>\\s*)<<1>>", [f, b]), lookbehind: true, greedy: true, inside: e.languages.csharp }, keyword: p, "class-name": { pattern: RegExp(x), greedy: true, inside: $ }, punctuation: /[,()]/ } }, preprocessor: { pattern: /(^[\t ]*)#.*/m, lookbehind: true, alias: "property", inside: { directive: { pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/, lookbehind: true, alias: "keyword" } } } });
  var E = B + "|" + _, R = n("/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>", [E]), z = a(n(`[^"'/()]|<<0>>|\\(<<self>>*\\)`, [R]), 2), S = "\\b(?:assembly|event|field|method|module|param|property|return|type)\\b", j = n("<<0>>(?:\\s*\\(<<1>>*\\))?", [m, z]);
  e.languages.insertBefore("csharp", "class-name", { attribute: { pattern: s("((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])", [S, j]), lookbehind: true, greedy: true, inside: { target: { pattern: s("^<<0>>(?=\\s*:)", [S]), alias: "keyword" }, "attribute-arguments": { pattern: s("\\(<<0>>*\\)", [z]), inside: e.languages.csharp }, "class-name": { pattern: RegExp(m), inside: { punctuation: /\./ } }, punctuation: /[:,]/ } } });
  var A = ":[^}\r\n]+", F = a(n(`[^"'/()]|<<0>>|\\(<<self>>*\\)`, [R]), 2), P = n("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [F, A]), U = a(n(`[^"'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)`, [E]), 2), Z = n("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [U, A]);
  function q(n2, a2) {
    return { interpolation: { pattern: s("((?:^|[^{])(?:\\{\\{)*)<<0>>", [n2]), lookbehind: true, inside: { "format-string": { pattern: s("(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)", [a2, A]), lookbehind: true, inside: { punctuation: /^:/ } }, punctuation: /^\{|\}$/, expression: { pattern: /[\s\S]+/, alias: "language-csharp", inside: e.languages.csharp } } }, string: /[\s\S]+/ };
  }
  e.languages.insertBefore("csharp", "string", { "interpolation-string": [{ pattern: s('(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"', [P]), lookbehind: true, greedy: true, inside: q(P, F) }, { pattern: s('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [Z]), lookbehind: true, greedy: true, inside: q(Z, U) }], char: { pattern: RegExp(_), greedy: true } }), e.languages.dotnet = e.languages.cs = e.languages.csharp;
})(Prism);
!(function(s) {
  var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  s.languages.css = { comment: /\/\*[\s\S]*?\*\//, atrule: { pattern: RegExp(`@[\\w-](?:[^;{\\s"']|\\s+(?!\\s)|` + e.source + ")*?(?:;|(?=\\s*\\{))"), inside: { rule: /^@[\w-]+/, "selector-function-argument": { pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/, lookbehind: true, alias: "selector" }, keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: true } } }, url: { pattern: RegExp("\\burl\\((?:" + e.source + `|(?:[^\\\\\r
()"']|\\\\[^])*)\\)`, "i"), greedy: true, inside: { function: /^url/i, punctuation: /^\(|\)$/, string: { pattern: RegExp("^" + e.source + "$"), alias: "url" } } }, selector: { pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + e.source + ")*(?=\\s*\\{)"), lookbehind: true }, string: { pattern: e, greedy: true }, property: { pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i, lookbehind: true }, important: /!important\b/i, function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: true }, punctuation: /[(){};:,]/ }, s.languages.css.atrule.inside.rest = s.languages.css;
  var t = s.languages.markup;
  t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"));
})(Prism);
//# sourceMappingURL=scripts.js.map
