import { jsx as x, jsxs as A, Fragment as yr } from "react/jsx-runtime";
import * as q from "react";
import T, { createContext as nr, useState as J, useMemo as wr, useEffect as vi, useContext as At, forwardRef as oc, createElement as Ca, isValidElement as Pt, Children as zr, PureComponent as Et, useRef as Yi, useImperativeHandle as k0, useCallback as I0, cloneElement as ze, Component as gm } from "react";
import "react-dom";
/**
 * @remix-run/router v1.23.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Ki() {
  return Ki = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ki.apply(null, arguments);
}
var hr;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(hr || (hr = {}));
function D0(e) {
  e === void 0 && (e = {});
  let {
    initialEntries: t = ["/"],
    initialIndex: r,
    v5Compat: n = !1
  } = e, a;
  a = t.map((h, m) => f(h, typeof h == "string" ? null : h.state, m === 0 ? "default" : void 0));
  let i = s(r ?? a.length - 1), o = hr.Pop, c = null;
  function s(h) {
    return Math.min(Math.max(h, 0), a.length - 1);
  }
  function l() {
    return a[i];
  }
  function f(h, m, v) {
    m === void 0 && (m = null);
    let p = L0(a ? l().pathname : "/", h, m, v);
    return yt(p.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(h)), p;
  }
  function u(h) {
    return typeof h == "string" ? h : Xi(h);
  }
  return {
    get index() {
      return i;
    },
    get action() {
      return o;
    },
    get location() {
      return l();
    },
    createHref: u,
    createURL(h) {
      return new URL(u(h), "http://localhost");
    },
    encodeLocation(h) {
      let m = typeof h == "string" ? Xr(h) : h;
      return {
        pathname: m.pathname || "",
        search: m.search || "",
        hash: m.hash || ""
      };
    },
    push(h, m) {
      o = hr.Push;
      let v = f(h, m);
      i += 1, a.splice(i, a.length, v), n && c && c({
        action: o,
        location: v,
        delta: 1
      });
    },
    replace(h, m) {
      o = hr.Replace;
      let v = f(h, m);
      a[i] = v, n && c && c({
        action: o,
        location: v,
        delta: 0
      });
    },
    go(h) {
      o = hr.Pop;
      let m = s(i + h), v = a[m];
      i = m, c && c({
        action: o,
        location: v,
        delta: h
      });
    },
    listen(h) {
      return c = h, () => {
        c = null;
      };
    }
  };
}
function se(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function yt(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function R0() {
  return Math.random().toString(36).substr(2, 8);
}
function L0(e, t, r, n) {
  return r === void 0 && (r = null), Ki({
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: ""
  }, typeof t == "string" ? Xr(t) : t, {
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: t && t.key || n || R0()
  });
}
function Xi(e) {
  let {
    pathname: t = "/",
    search: r = "",
    hash: n = ""
  } = e;
  return r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n), t;
}
function Xr(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substr(r), e = e.substr(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substr(n), e = e.substr(0, n)), e && (t.pathname = e);
  }
  return t;
}
var Df;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Df || (Df = {}));
function F0(e, t, r) {
  return r === void 0 && (r = "/"), B0(e, t, r);
}
function B0(e, t, r, n) {
  let a = typeof t == "string" ? Xr(t) : t, i = gr(a.pathname || "/", r);
  if (i == null)
    return null;
  let o = bm(e);
  z0(o);
  let c = null, s = J0(i);
  for (let l = 0; c == null && l < o.length; ++l)
    c = X0(o[l], s);
  return c;
}
function bm(e, t, r, n) {
  t === void 0 && (t = []), r === void 0 && (r = []), n === void 0 && (n = "");
  let a = (i, o, c) => {
    let s = {
      relativePath: c === void 0 ? i.path || "" : c,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: o,
      route: i
    };
    s.relativePath.startsWith("/") && (se(s.relativePath.startsWith(n), 'Absolute route path "' + s.relativePath + '" nested under path ' + ('"' + n + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), s.relativePath = s.relativePath.slice(n.length));
    let l = Kt([n, s.relativePath]), f = r.concat(s);
    i.children && i.children.length > 0 && (se(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      i.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + l + '".')
    ), bm(i.children, t, f, l)), !(i.path == null && !i.index) && t.push({
      path: l,
      score: Y0(l, i.index),
      routesMeta: f
    });
  };
  return e.forEach((i, o) => {
    var c;
    if (i.path === "" || !((c = i.path) != null && c.includes("?")))
      a(i, o);
    else
      for (let s of wm(i.path))
        a(i, o, s);
  }), t;
}
function wm(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...n] = t, a = r.endsWith("?"), i = r.replace(/\?$/, "");
  if (n.length === 0)
    return a ? [i, ""] : [i];
  let o = wm(n.join("/")), c = [];
  return c.push(...o.map((s) => s === "" ? i : [i, s].join("/"))), a && c.push(...o), c.map((s) => e.startsWith("/") && s === "" ? "/" : s);
}
function z0(e) {
  e.sort((t, r) => t.score !== r.score ? r.score - t.score : K0(t.routesMeta.map((n) => n.childrenIndex), r.routesMeta.map((n) => n.childrenIndex)));
}
const W0 = /^:[\w-]+$/, U0 = 3, V0 = 2, q0 = 1, H0 = 10, G0 = -2, Rf = (e) => e === "*";
function Y0(e, t) {
  let r = e.split("/"), n = r.length;
  return r.some(Rf) && (n += G0), t && (n += V0), r.filter((a) => !Rf(a)).reduce((a, i) => a + (W0.test(i) ? U0 : i === "" ? q0 : H0), n);
}
function K0(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, a) => n === t[a]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    e[e.length - 1] - t[t.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function X0(e, t, r) {
  let {
    routesMeta: n
  } = e, a = {}, i = "/", o = [];
  for (let c = 0; c < n.length; ++c) {
    let s = n[c], l = c === n.length - 1, f = i === "/" ? t : t.slice(i.length) || "/", u = Fs({
      path: s.relativePath,
      caseSensitive: s.caseSensitive,
      end: l
    }, f), d = s.route;
    if (!u)
      return null;
    Object.assign(a, u.params), o.push({
      // TODO: Can this as be avoided?
      params: a,
      pathname: Kt([i, u.pathname]),
      pathnameBase: t1(Kt([i, u.pathnameBase])),
      route: d
    }), u.pathnameBase !== "/" && (i = Kt([i, u.pathnameBase]));
  }
  return o;
}
function Fs(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [r, n] = Z0(e.path, e.caseSensitive, e.end), a = t.match(r);
  if (!a) return null;
  let i = a[0], o = i.replace(/(.)\/+$/, "$1"), c = a.slice(1);
  return {
    params: n.reduce((l, f, u) => {
      let {
        paramName: d,
        isOptional: h
      } = f;
      if (d === "*") {
        let v = c[u] || "";
        o = i.slice(0, i.length - v.length).replace(/(.)\/+$/, "$1");
      }
      const m = c[u];
      return h && !m ? l[d] = void 0 : l[d] = (m || "").replace(/%2F/g, "/"), l;
    }, {}),
    pathname: i,
    pathnameBase: o,
    pattern: e
  };
}
function Z0(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !0), yt(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let n = [], a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (o, c, s) => (n.push({
    paramName: c,
    isOptional: s != null
  }), s ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (n.push({
    paramName: "*"
  }), a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? a += "\\/*$" : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"), [new RegExp(a, t ? void 0 : "i"), n];
}
function J0(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return yt(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e;
  }
}
function gr(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function Q0(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: r,
    search: n = "",
    hash: a = ""
  } = typeof e == "string" ? Xr(e) : e, i;
  return r ? (r = xm(r), r.startsWith("/") ? i = Lf(r.substring(1), "/") : i = Lf(r, t)) : i = t, {
    pathname: i,
    search: r1(n),
    hash: n1(a)
  };
}
function Lf(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((a) => {
    a === ".." ? r.length > 1 && r.pop() : a !== "." && r.push(a);
  }), r.length > 1 ? r.join("/") : "/";
}
function Zc(e, t, r, n) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function e1(e) {
  return e.filter((t, r) => r === 0 || t.route.path && t.route.path.length > 0);
}
function yu(e, t) {
  let r = e1(e);
  return t ? r.map((n, a) => a === r.length - 1 ? n.pathname : n.pathnameBase) : r.map((n) => n.pathnameBase);
}
function gu(e, t, r, n) {
  n === void 0 && (n = !1);
  let a;
  typeof e == "string" ? a = Xr(e) : (a = Ki({}, e), se(!a.pathname || !a.pathname.includes("?"), Zc("?", "pathname", "search", a)), se(!a.pathname || !a.pathname.includes("#"), Zc("#", "pathname", "hash", a)), se(!a.search || !a.search.includes("#"), Zc("#", "search", "hash", a)));
  let i = e === "" || a.pathname === "", o = i ? "/" : a.pathname, c;
  if (o == null)
    c = r;
  else {
    let u = t.length - 1;
    if (!n && o.startsWith("..")) {
      let d = o.split("/");
      for (; d[0] === ".."; )
        d.shift(), u -= 1;
      a.pathname = d.join("/");
    }
    c = u >= 0 ? t[u] : "/";
  }
  let s = Q0(a, c), l = o && o !== "/" && o.endsWith("/"), f = (i || o === ".") && r.endsWith("/");
  return !s.pathname.endsWith("/") && (l || f) && (s.pathname += "/"), s;
}
const xm = (e) => e.replace(/\/\/+/g, "/"), Kt = (e) => xm(e.join("/")), t1 = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), r1 = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, n1 = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function a1(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
const Om = ["post", "put", "patch", "delete"];
new Set(Om);
const i1 = ["get", ...Om];
new Set(i1);
/**
 * React Router v6.30.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Ma() {
  return Ma = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ma.apply(null, arguments);
}
const mi = /* @__PURE__ */ q.createContext(null);
process.env.NODE_ENV !== "production" && (mi.displayName = "DataRouter");
const bu = /* @__PURE__ */ q.createContext(null);
process.env.NODE_ENV !== "production" && (bu.displayName = "DataRouterState");
const o1 = /* @__PURE__ */ q.createContext(null);
process.env.NODE_ENV !== "production" && (o1.displayName = "Await");
const bt = /* @__PURE__ */ q.createContext(null);
process.env.NODE_ENV !== "production" && (bt.displayName = "Navigation");
const yi = /* @__PURE__ */ q.createContext(null);
process.env.NODE_ENV !== "production" && (yi.displayName = "Location");
const Bt = /* @__PURE__ */ q.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (Bt.displayName = "Route");
const wu = /* @__PURE__ */ q.createContext(null);
process.env.NODE_ENV !== "production" && (wu.displayName = "RouteError");
function c1(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t;
  Kn() || (process.env.NODE_ENV !== "production" ? se(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : se(!1));
  let {
    basename: n,
    navigator: a
  } = q.useContext(bt), {
    hash: i,
    pathname: o,
    search: c
  } = gi(e, {
    relative: r
  }), s = o;
  return n !== "/" && (s = o === "/" ? n : Kt([n, o])), a.createHref({
    pathname: s,
    search: c,
    hash: i
  });
}
function Kn() {
  return q.useContext(yi) != null;
}
function xr() {
  return Kn() || (process.env.NODE_ENV !== "production" ? se(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : se(!1)), q.useContext(yi).location;
}
const Sm = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Pm(e) {
  q.useContext(bt).static || q.useLayoutEffect(e);
}
function xu() {
  let {
    isDataRoute: e
  } = q.useContext(Bt);
  return e ? x1() : s1();
}
function s1() {
  Kn() || (process.env.NODE_ENV !== "production" ? se(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : se(!1));
  let e = q.useContext(mi), {
    basename: t,
    future: r,
    navigator: n
  } = q.useContext(bt), {
    matches: a
  } = q.useContext(Bt), {
    pathname: i
  } = xr(), o = JSON.stringify(yu(a, r.v7_relativeSplatPath)), c = q.useRef(!1);
  return Pm(() => {
    c.current = !0;
  }), q.useCallback(function(l, f) {
    if (f === void 0 && (f = {}), process.env.NODE_ENV !== "production" && yt(c.current, Sm), !c.current) return;
    if (typeof l == "number") {
      n.go(l);
      return;
    }
    let u = gu(l, JSON.parse(o), i, f.relative === "path");
    e == null && t !== "/" && (u.pathname = u.pathname === "/" ? t : Kt([t, u.pathname])), (f.replace ? n.replace : n.push)(u, f.state, f);
  }, [t, n, o, i, e]);
}
function gi(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    future: n
  } = q.useContext(bt), {
    matches: a
  } = q.useContext(Bt), {
    pathname: i
  } = xr(), o = JSON.stringify(yu(a, n.v7_relativeSplatPath));
  return q.useMemo(() => gu(e, JSON.parse(o), i, r === "path"), [e, o, i, r]);
}
function l1(e, t) {
  return u1(e, t);
}
function u1(e, t, r, n) {
  Kn() || (process.env.NODE_ENV !== "production" ? se(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  ) : se(!1));
  let {
    navigator: a
  } = q.useContext(bt), {
    matches: i
  } = q.useContext(Bt), o = i[i.length - 1], c = o ? o.params : {}, s = o ? o.pathname : "/", l = o ? o.pathnameBase : "/", f = o && o.route;
  if (process.env.NODE_ENV !== "production") {
    let g = f && f.path || "";
    Am(s, !f || g.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + s + '" (under <Route path="' + g + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + g + '"> to <Route ') + ('path="' + (g === "/" ? "*" : g + "/*") + '">.'));
  }
  let u = xr(), d;
  if (t) {
    var h;
    let g = typeof t == "string" ? Xr(t) : t;
    l === "/" || (h = g.pathname) != null && h.startsWith(l) || (process.env.NODE_ENV !== "production" ? se(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + l + '" ') + ('but pathname "' + g.pathname + '" was given in the `location` prop.')) : se(!1)), d = g;
  } else
    d = u;
  let m = d.pathname || "/", v = m;
  if (l !== "/") {
    let g = l.replace(/^\//, "").split("/");
    v = "/" + m.replace(/^\//, "").split("/").slice(g.length).join("/");
  }
  let p = F0(e, {
    pathname: v
  });
  process.env.NODE_ENV !== "production" && (process.env.NODE_ENV !== "production" && yt(f || p != null, 'No routes matched location "' + d.pathname + d.search + d.hash + '" '), process.env.NODE_ENV !== "production" && yt(p == null || p[p.length - 1].route.element !== void 0 || p[p.length - 1].route.Component !== void 0 || p[p.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + d.pathname + d.search + d.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'));
  let b = v1(p && p.map((g) => Object.assign({}, g, {
    params: Object.assign({}, c, g.params),
    pathname: Kt([
      l,
      // Re-encode pathnames that were decoded inside matchRoutes
      a.encodeLocation ? a.encodeLocation(g.pathname).pathname : g.pathname
    ]),
    pathnameBase: g.pathnameBase === "/" ? l : Kt([
      l,
      // Re-encode pathnames that were decoded inside matchRoutes
      a.encodeLocation ? a.encodeLocation(g.pathnameBase).pathname : g.pathnameBase
    ])
  })), i, r, n);
  return t && b ? /* @__PURE__ */ q.createElement(yi.Provider, {
    value: {
      location: Ma({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, d),
      navigationType: hr.Pop
    }
  }, b) : b;
}
function f1() {
  let e = w1(), t = a1(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, n = "rgba(200,200,200, 0.5)", a = {
    padding: "0.5rem",
    backgroundColor: n
  }, i = {
    padding: "2px 4px",
    backgroundColor: n
  }, o = null;
  return process.env.NODE_ENV !== "production" && (console.error("Error handled by React Router default ErrorBoundary:", e), o = /* @__PURE__ */ q.createElement(q.Fragment, null, /* @__PURE__ */ q.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ q.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ q.createElement("code", {
    style: i
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ q.createElement("code", {
    style: i
  }, "errorElement"), " prop on your route."))), /* @__PURE__ */ q.createElement(q.Fragment, null, /* @__PURE__ */ q.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ q.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, t), r ? /* @__PURE__ */ q.createElement("pre", {
    style: a
  }, r) : null, o);
}
const d1 = /* @__PURE__ */ q.createElement(f1, null);
class h1 extends q.Component {
  constructor(t) {
    super(t), this.state = {
      location: t.location,
      revalidation: t.revalidation,
      error: t.error
    };
  }
  static getDerivedStateFromError(t) {
    return {
      error: t
    };
  }
  static getDerivedStateFromProps(t, r) {
    return r.location !== t.location || r.revalidation !== "idle" && t.revalidation === "idle" ? {
      error: t.error,
      location: t.location,
      revalidation: t.revalidation
    } : {
      error: t.error !== void 0 ? t.error : r.error,
      location: r.location,
      revalidation: t.revalidation || r.revalidation
    };
  }
  componentDidCatch(t, r) {
    console.error("React Router caught the following error during render", t, r);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ q.createElement(Bt.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ q.createElement(wu.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function p1(e) {
  let {
    routeContext: t,
    match: r,
    children: n
  } = e, a = q.useContext(mi);
  return a && a.static && a.staticContext && (r.route.errorElement || r.route.ErrorBoundary) && (a.staticContext._deepestRenderedBoundaryId = r.route.id), /* @__PURE__ */ q.createElement(Bt.Provider, {
    value: t
  }, n);
}
function v1(e, t, r, n) {
  var a;
  if (t === void 0 && (t = []), r === void 0 && (r = null), n === void 0 && (n = null), e == null) {
    var i;
    if (!r)
      return null;
    if (r.errors)
      e = r.matches;
    else if ((i = n) != null && i.v7_partialHydration && t.length === 0 && !r.initialized && r.matches.length > 0)
      e = r.matches;
    else
      return null;
  }
  let o = e, c = (a = r) == null ? void 0 : a.errors;
  if (c != null) {
    let f = o.findIndex((u) => u.route.id && (c == null ? void 0 : c[u.route.id]) !== void 0);
    f >= 0 || (process.env.NODE_ENV !== "production" ? se(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(c).join(",")) : se(!1)), o = o.slice(0, Math.min(o.length, f + 1));
  }
  let s = !1, l = -1;
  if (r && n && n.v7_partialHydration)
    for (let f = 0; f < o.length; f++) {
      let u = o[f];
      if ((u.route.HydrateFallback || u.route.hydrateFallbackElement) && (l = f), u.route.id) {
        let {
          loaderData: d,
          errors: h
        } = r, m = u.route.loader && d[u.route.id] === void 0 && (!h || h[u.route.id] === void 0);
        if (u.route.lazy || m) {
          s = !0, l >= 0 ? o = o.slice(0, l + 1) : o = [o[0]];
          break;
        }
      }
    }
  return o.reduceRight((f, u, d) => {
    let h, m = !1, v = null, p = null;
    r && (h = c && u.route.id ? c[u.route.id] : void 0, v = u.route.errorElement || d1, s && (l < 0 && d === 0 ? (Am("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), m = !0, p = null) : l === d && (m = !0, p = u.route.hydrateFallbackElement || null)));
    let b = t.concat(o.slice(0, d + 1)), g = () => {
      let O;
      return h ? O = v : m ? O = p : u.route.Component ? O = /* @__PURE__ */ q.createElement(u.route.Component, null) : u.route.element ? O = u.route.element : O = f, /* @__PURE__ */ q.createElement(p1, {
        match: u,
        routeContext: {
          outlet: f,
          matches: b,
          isDataRoute: r != null
        },
        children: O
      });
    };
    return r && (u.route.ErrorBoundary || u.route.errorElement || d === 0) ? /* @__PURE__ */ q.createElement(h1, {
      location: r.location,
      revalidation: r.revalidation,
      component: v,
      error: h,
      children: g(),
      routeContext: {
        outlet: null,
        matches: b,
        isDataRoute: !0
      }
    }) : g();
  }, null);
}
var _m = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(_m || {}), ja = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(ja || {});
function Ou(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function m1(e) {
  let t = q.useContext(mi);
  return t || (process.env.NODE_ENV !== "production" ? se(!1, Ou(e)) : se(!1)), t;
}
function y1(e) {
  let t = q.useContext(bu);
  return t || (process.env.NODE_ENV !== "production" ? se(!1, Ou(e)) : se(!1)), t;
}
function g1(e) {
  let t = q.useContext(Bt);
  return t || (process.env.NODE_ENV !== "production" ? se(!1, Ou(e)) : se(!1)), t;
}
function Su(e) {
  let t = g1(e), r = t.matches[t.matches.length - 1];
  return r.route.id || (process.env.NODE_ENV !== "production" ? se(!1, e + ' can only be used on routes that contain a unique "id"') : se(!1)), r.route.id;
}
function b1() {
  return Su(ja.UseRouteId);
}
function w1() {
  var e;
  let t = q.useContext(wu), r = y1(ja.UseRouteError), n = Su(ja.UseRouteError);
  return t !== void 0 ? t : (e = r.errors) == null ? void 0 : e[n];
}
function x1() {
  let {
    router: e
  } = m1(_m.UseNavigateStable), t = Su(ja.UseNavigateStable), r = q.useRef(!1);
  return Pm(() => {
    r.current = !0;
  }), q.useCallback(function(a, i) {
    i === void 0 && (i = {}), process.env.NODE_ENV !== "production" && yt(r.current, Sm), r.current && (typeof a == "number" ? e.navigate(a) : e.navigate(a, Ma({
      fromRouteId: t
    }, i)));
  }, [e, t]);
}
const Ff = {};
function Am(e, t, r) {
  !t && !Ff[e] && (Ff[e] = !0, process.env.NODE_ENV !== "production" && yt(!1, r));
}
const Bf = {};
function O1(e, t) {
  process.env.NODE_ENV !== "production" && !Bf[t] && (Bf[t] = !0, console.warn(t));
}
const zf = (e, t, r) => O1(e, "⚠️ React Router Future Flag Warning: " + t + ". " + ("You can use the `" + e + "` future flag to opt-in early. ") + ("For more information, see " + r + "."));
function S1(e, t) {
  (e == null ? void 0 : e.v7_startTransition) === void 0 && zf("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (e == null ? void 0 : e.v7_relativeSplatPath) === void 0 && zf("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
const P1 = "startTransition", Wf = q[P1];
function _1(e) {
  let {
    basename: t,
    children: r,
    initialEntries: n,
    initialIndex: a,
    future: i
  } = e, o = q.useRef();
  o.current == null && (o.current = D0({
    initialEntries: n,
    initialIndex: a,
    v5Compat: !0
  }));
  let c = o.current, [s, l] = q.useState({
    action: c.action,
    location: c.location
  }), {
    v7_startTransition: f
  } = i || {}, u = q.useCallback((d) => {
    f && Wf ? Wf(() => l(d)) : l(d);
  }, [l, f]);
  return q.useLayoutEffect(() => c.listen(u), [c, u]), q.useEffect(() => S1(i), [i]), /* @__PURE__ */ q.createElement(E1, {
    basename: t,
    children: r,
    location: s.location,
    navigationType: s.action,
    navigator: c,
    future: i
  });
}
function A1(e) {
  let {
    to: t,
    replace: r,
    state: n,
    relative: a
  } = e;
  Kn() || (process.env.NODE_ENV !== "production" ? se(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  ) : se(!1));
  let {
    future: i,
    static: o
  } = q.useContext(bt);
  process.env.NODE_ENV !== "production" && yt(!o, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: c
  } = q.useContext(Bt), {
    pathname: s
  } = xr(), l = xu(), f = gu(t, yu(c, i.v7_relativeSplatPath), s, a === "path"), u = JSON.stringify(f);
  return q.useEffect(() => l(JSON.parse(u), {
    replace: r,
    state: n,
    relative: a
  }), [l, u, a, r, n]), null;
}
function tt(e) {
  process.env.NODE_ENV !== "production" ? se(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : se(!1);
}
function E1(e) {
  let {
    basename: t = "/",
    children: r = null,
    location: n,
    navigationType: a = hr.Pop,
    navigator: i,
    static: o = !1,
    future: c
  } = e;
  Kn() && (process.env.NODE_ENV !== "production" ? se(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : se(!1));
  let s = t.replace(/^\/*/, "/"), l = q.useMemo(() => ({
    basename: s,
    navigator: i,
    static: o,
    future: Ma({
      v7_relativeSplatPath: !1
    }, c)
  }), [s, c, i, o]);
  typeof n == "string" && (n = Xr(n));
  let {
    pathname: f = "/",
    search: u = "",
    hash: d = "",
    state: h = null,
    key: m = "default"
  } = n, v = q.useMemo(() => {
    let p = gr(f, s);
    return p == null ? null : {
      location: {
        pathname: p,
        search: u,
        hash: d,
        state: h,
        key: m
      },
      navigationType: a
    };
  }, [s, f, u, d, h, m, a]);
  return process.env.NODE_ENV !== "production" && yt(v != null, '<Router basename="' + s + '"> is not able to match the URL ' + ('"' + f + u + d + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), v == null ? null : /* @__PURE__ */ q.createElement(bt.Provider, {
    value: l
  }, /* @__PURE__ */ q.createElement(yi.Provider, {
    children: r,
    value: v
  }));
}
function T1(e) {
  let {
    children: t,
    location: r
  } = e;
  return l1(Bs(t), r);
}
new Promise(() => {
});
function Bs(e, t) {
  t === void 0 && (t = []);
  let r = [];
  return q.Children.forEach(e, (n, a) => {
    if (!/* @__PURE__ */ q.isValidElement(n))
      return;
    let i = [...t, a];
    if (n.type === q.Fragment) {
      r.push.apply(r, Bs(n.props.children, i));
      return;
    }
    n.type !== tt && (process.env.NODE_ENV !== "production" ? se(!1, "[" + (typeof n.type == "string" ? n.type : n.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : se(!1)), !n.props.index || !n.props.children || (process.env.NODE_ENV !== "production" ? se(!1, "An index route cannot have child routes.") : se(!1));
    let o = {
      id: n.props.id || i.join("-"),
      caseSensitive: n.props.caseSensitive,
      element: n.props.element,
      Component: n.props.Component,
      index: n.props.index,
      path: n.props.path,
      loader: n.props.loader,
      action: n.props.action,
      errorElement: n.props.errorElement,
      ErrorBoundary: n.props.ErrorBoundary,
      hasErrorBoundary: n.props.ErrorBoundary != null || n.props.errorElement != null,
      shouldRevalidate: n.props.shouldRevalidate,
      handle: n.props.handle,
      lazy: n.props.lazy
    };
    n.props.children && (o.children = Bs(n.props.children, i)), r.push(o);
  }), r;
}
/**
 * React Router DOM v6.30.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function xn() {
  return xn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, xn.apply(null, arguments);
}
function Pu(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
const qi = "get", Hi = "application/x-www-form-urlencoded";
function cc(e) {
  return e != null && typeof e.tagName == "string";
}
function $1(e) {
  return cc(e) && e.tagName.toLowerCase() === "button";
}
function C1(e) {
  return cc(e) && e.tagName.toLowerCase() === "form";
}
function M1(e) {
  return cc(e) && e.tagName.toLowerCase() === "input";
}
function j1(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function N1(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !j1(e);
}
let Ei = null;
function k1() {
  if (Ei === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Ei = !1;
    } catch {
      Ei = !0;
    }
  return Ei;
}
const I1 = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Jc(e) {
  return e != null && !I1.has(e) ? (process.env.NODE_ENV !== "production" && yt(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + Hi + '"')), null) : e;
}
function D1(e, t) {
  let r, n, a, i, o;
  if (C1(e)) {
    let c = e.getAttribute("action");
    n = c ? gr(c, t) : null, r = e.getAttribute("method") || qi, a = Jc(e.getAttribute("enctype")) || Hi, i = new FormData(e);
  } else if ($1(e) || M1(e) && (e.type === "submit" || e.type === "image")) {
    let c = e.form;
    if (c == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let s = e.getAttribute("formaction") || c.getAttribute("action");
    if (n = s ? gr(s, t) : null, r = e.getAttribute("formmethod") || c.getAttribute("method") || qi, a = Jc(e.getAttribute("formenctype")) || Jc(c.getAttribute("enctype")) || Hi, i = new FormData(c, e), !k1()) {
      let {
        name: l,
        type: f,
        value: u
      } = e;
      if (f === "image") {
        let d = l ? l + "." : "";
        i.append(d + "x", "0"), i.append(d + "y", "0");
      } else l && i.append(l, u);
    }
  } else {
    if (cc(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    r = qi, n = null, a = Hi, o = e;
  }
  return i && a === "text/plain" && (o = i, i = void 0), {
    action: n,
    method: r.toLowerCase(),
    encType: a,
    formData: i,
    body: o
  };
}
const R1 = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], L1 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], F1 = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], B1 = "6";
try {
  window.__reactRouterVersion = B1;
} catch {
}
const Em = /* @__PURE__ */ q.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (Em.displayName = "ViewTransition");
const z1 = /* @__PURE__ */ q.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (z1.displayName = "Fetchers");
process.env.NODE_ENV;
const W1 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", U1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Na = /* @__PURE__ */ q.forwardRef(function(t, r) {
  let {
    onClick: n,
    relative: a,
    reloadDocument: i,
    replace: o,
    state: c,
    target: s,
    to: l,
    preventScrollReset: f,
    viewTransition: u
  } = t, d = Pu(t, R1), {
    basename: h
  } = q.useContext(bt), m, v = !1;
  if (typeof l == "string" && U1.test(l) && (m = l, W1))
    try {
      let O = new URL(window.location.href), S = l.startsWith("//") ? new URL(O.protocol + l) : new URL(l), y = gr(S.pathname, h);
      S.origin === O.origin && y != null ? l = y + S.search + S.hash : v = !0;
    } catch {
      process.env.NODE_ENV !== "production" && yt(!1, '<Link to="' + l + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let p = c1(l, {
    relative: a
  }), b = H1(l, {
    replace: o,
    state: c,
    target: s,
    preventScrollReset: f,
    relative: a,
    viewTransition: u
  });
  function g(O) {
    n && n(O), O.defaultPrevented || b(O);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ q.createElement("a", xn({}, d, {
      href: m || p,
      onClick: v || i ? n : g,
      ref: r,
      target: s
    }))
  );
});
process.env.NODE_ENV !== "production" && (Na.displayName = "Link");
const Tm = /* @__PURE__ */ q.forwardRef(function(t, r) {
  let {
    "aria-current": n = "page",
    caseSensitive: a = !1,
    className: i = "",
    end: o = !1,
    style: c,
    to: s,
    viewTransition: l,
    children: f
  } = t, u = Pu(t, L1), d = gi(s, {
    relative: u.relative
  }), h = xr(), m = q.useContext(bu), {
    navigator: v,
    basename: p
  } = q.useContext(bt), b = m != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  J1(d) && l === !0, g = v.encodeLocation ? v.encodeLocation(d).pathname : d.pathname, O = h.pathname, S = m && m.navigation && m.navigation.location ? m.navigation.location.pathname : null;
  a || (O = O.toLowerCase(), S = S ? S.toLowerCase() : null, g = g.toLowerCase()), S && p && (S = gr(S, p) || S);
  const y = g !== "/" && g.endsWith("/") ? g.length - 1 : g.length;
  let w = O === g || !o && O.startsWith(g) && O.charAt(y) === "/", P = S != null && (S === g || !o && S.startsWith(g) && S.charAt(g.length) === "/"), _ = {
    isActive: w,
    isPending: P,
    isTransitioning: b
  }, $ = w ? n : void 0, E;
  typeof i == "function" ? E = i(_) : E = [i, w ? "active" : null, P ? "pending" : null, b ? "transitioning" : null].filter(Boolean).join(" ");
  let j = typeof c == "function" ? c(_) : c;
  return /* @__PURE__ */ q.createElement(Na, xn({}, u, {
    "aria-current": $,
    className: E,
    ref: r,
    style: j,
    to: s,
    viewTransition: l
  }), typeof f == "function" ? f(_) : f);
});
process.env.NODE_ENV !== "production" && (Tm.displayName = "NavLink");
const V1 = /* @__PURE__ */ q.forwardRef((e, t) => {
  let {
    fetcherKey: r,
    navigate: n,
    reloadDocument: a,
    replace: i,
    state: o,
    method: c = qi,
    action: s,
    onSubmit: l,
    relative: f,
    preventScrollReset: u,
    viewTransition: d
  } = e, h = Pu(e, F1), m = X1(), v = Z1(s, {
    relative: f
  }), p = c.toLowerCase() === "get" ? "get" : "post", b = (g) => {
    if (l && l(g), g.defaultPrevented) return;
    g.preventDefault();
    let O = g.nativeEvent.submitter, S = (O == null ? void 0 : O.getAttribute("formmethod")) || c;
    m(O || g.currentTarget, {
      fetcherKey: r,
      method: S,
      navigate: n,
      replace: i,
      state: o,
      relative: f,
      preventScrollReset: u,
      viewTransition: d
    });
  };
  return /* @__PURE__ */ q.createElement("form", xn({
    ref: t,
    method: p,
    action: v,
    onSubmit: a ? l : b
  }, h));
});
process.env.NODE_ENV !== "production" && (V1.displayName = "Form");
process.env.NODE_ENV;
var Zi;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(Zi || (Zi = {}));
var Uf;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Uf || (Uf = {}));
function q1(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function $m(e) {
  let t = q.useContext(mi);
  return t || (process.env.NODE_ENV !== "production" ? se(!1, q1(e)) : se(!1)), t;
}
function H1(e, t) {
  let {
    target: r,
    replace: n,
    state: a,
    preventScrollReset: i,
    relative: o,
    viewTransition: c
  } = t === void 0 ? {} : t, s = xu(), l = xr(), f = gi(e, {
    relative: o
  });
  return q.useCallback((u) => {
    if (N1(u, r)) {
      u.preventDefault();
      let d = n !== void 0 ? n : Xi(l) === Xi(f);
      s(e, {
        replace: d,
        state: a,
        preventScrollReset: i,
        relative: o,
        viewTransition: c
      });
    }
  }, [l, s, f, n, a, r, e, i, o, c]);
}
function G1() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let Y1 = 0, K1 = () => "__" + String(++Y1) + "__";
function X1() {
  let {
    router: e
  } = $m(Zi.UseSubmit), {
    basename: t
  } = q.useContext(bt), r = b1();
  return q.useCallback(function(n, a) {
    a === void 0 && (a = {}), G1();
    let {
      action: i,
      method: o,
      encType: c,
      formData: s,
      body: l
    } = D1(n, t);
    if (a.navigate === !1) {
      let f = a.fetcherKey || K1();
      e.fetch(f, r, a.action || i, {
        preventScrollReset: a.preventScrollReset,
        formData: s,
        body: l,
        formMethod: a.method || o,
        formEncType: a.encType || c,
        flushSync: a.flushSync
      });
    } else
      e.navigate(a.action || i, {
        preventScrollReset: a.preventScrollReset,
        formData: s,
        body: l,
        formMethod: a.method || o,
        formEncType: a.encType || c,
        replace: a.replace,
        state: a.state,
        fromRouteId: r,
        flushSync: a.flushSync,
        viewTransition: a.viewTransition
      });
  }, [e, t, r]);
}
function Z1(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    basename: n
  } = q.useContext(bt), a = q.useContext(Bt);
  a || (process.env.NODE_ENV !== "production" ? se(!1, "useFormAction must be used inside a RouteContext") : se(!1));
  let [i] = a.matches.slice(-1), o = xn({}, gi(e || ".", {
    relative: r
  })), c = xr();
  if (e == null) {
    o.search = c.search;
    let s = new URLSearchParams(o.search), l = s.getAll("index");
    if (l.some((u) => u === "")) {
      s.delete("index"), l.filter((d) => d).forEach((d) => s.append("index", d));
      let u = s.toString();
      o.search = u ? "?" + u : "";
    }
  }
  return (!e || e === ".") && i.route.index && (o.search = o.search ? o.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (o.pathname = o.pathname === "/" ? n : Kt([n, o.pathname])), Xi(o);
}
function J1(e, t) {
  t === void 0 && (t = {});
  let r = q.useContext(Em);
  r == null && (process.env.NODE_ENV !== "production" ? se(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : se(!1));
  let {
    basename: n
  } = $m(Zi.useViewTransitionState), a = gi(e, {
    relative: t.relative
  });
  if (!r.isTransitioning)
    return !1;
  let i = gr(r.currentLocation.pathname, n) || r.currentLocation.pathname, o = gr(r.nextLocation.pathname, n) || r.nextLocation.pathname;
  return Fs(a.pathname, o) != null || Fs(a.pathname, i) != null;
}
const Q1 = {}, Vf = (e) => {
  let t;
  const r = /* @__PURE__ */ new Set(), n = (f, u) => {
    const d = typeof f == "function" ? f(t) : f;
    if (!Object.is(d, t)) {
      const h = t;
      t = u ?? (typeof d != "object" || d === null) ? d : Object.assign({}, t, d), r.forEach((m) => m(t, h));
    }
  }, a = () => t, s = { setState: n, getState: a, getInitialState: () => l, subscribe: (f) => (r.add(f), () => r.delete(f)), destroy: () => {
    (Q1 ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), r.clear();
  } }, l = t = e(n, a, s);
  return s;
}, ew = (e) => e ? Vf(e) : Vf;
var Ti = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Pe(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var zs = { exports: {} }, Qc = {}, $i = { exports: {} }, es = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qf;
function tw() {
  if (qf) return es;
  qf = 1;
  var e = T;
  function t(u, d) {
    return u === d && (u !== 0 || 1 / u === 1 / d) || u !== u && d !== d;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, a = e.useEffect, i = e.useLayoutEffect, o = e.useDebugValue;
  function c(u, d) {
    var h = d(), m = n({ inst: { value: h, getSnapshot: d } }), v = m[0].inst, p = m[1];
    return i(
      function() {
        v.value = h, v.getSnapshot = d, s(v) && p({ inst: v });
      },
      [u, h, d]
    ), a(
      function() {
        return s(v) && p({ inst: v }), u(function() {
          s(v) && p({ inst: v });
        });
      },
      [u]
    ), o(h), h;
  }
  function s(u) {
    var d = u.getSnapshot;
    u = u.value;
    try {
      var h = d();
      return !r(u, h);
    } catch {
      return !0;
    }
  }
  function l(u, d) {
    return d();
  }
  var f = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : c;
  return es.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : f, es;
}
var ts = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hf;
function rw() {
  return Hf || (Hf = 1, process.env.NODE_ENV !== "production" && function() {
    function e(h, m) {
      return h === m && (h !== 0 || 1 / h === 1 / m) || h !== h && m !== m;
    }
    function t(h, m) {
      f || a.startTransition === void 0 || (f = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var v = m();
      if (!u) {
        var p = m();
        i(v, p) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), u = !0);
      }
      p = o({
        inst: { value: v, getSnapshot: m }
      });
      var b = p[0].inst, g = p[1];
      return s(
        function() {
          b.value = v, b.getSnapshot = m, r(b) && g({ inst: b });
        },
        [h, v, m]
      ), c(
        function() {
          return r(b) && g({ inst: b }), h(function() {
            r(b) && g({ inst: b });
          });
        },
        [h]
      ), l(v), v;
    }
    function r(h) {
      var m = h.getSnapshot;
      h = h.value;
      try {
        var v = m();
        return !i(h, v);
      } catch {
        return !0;
      }
    }
    function n(h, m) {
      return m();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var a = T, i = typeof Object.is == "function" ? Object.is : e, o = a.useState, c = a.useEffect, s = a.useLayoutEffect, l = a.useDebugValue, f = !1, u = !1, d = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? n : t;
    ts.useSyncExternalStore = a.useSyncExternalStore !== void 0 ? a.useSyncExternalStore : d, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), ts;
}
var Gf;
function Cm() {
  return Gf || (Gf = 1, process.env.NODE_ENV === "production" ? $i.exports = tw() : $i.exports = rw()), $i.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yf;
function nw() {
  if (Yf) return Qc;
  Yf = 1;
  var e = T, t = Cm();
  function r(l, f) {
    return l === f && (l !== 0 || 1 / l === 1 / f) || l !== l && f !== f;
  }
  var n = typeof Object.is == "function" ? Object.is : r, a = t.useSyncExternalStore, i = e.useRef, o = e.useEffect, c = e.useMemo, s = e.useDebugValue;
  return Qc.useSyncExternalStoreWithSelector = function(l, f, u, d, h) {
    var m = i(null);
    if (m.current === null) {
      var v = { hasValue: !1, value: null };
      m.current = v;
    } else v = m.current;
    m = c(
      function() {
        function b(w) {
          if (!g) {
            if (g = !0, O = w, w = d(w), h !== void 0 && v.hasValue) {
              var P = v.value;
              if (h(P, w))
                return S = P;
            }
            return S = w;
          }
          if (P = S, n(O, w)) return P;
          var _ = d(w);
          return h !== void 0 && h(P, _) ? (O = w, P) : (O = w, S = _);
        }
        var g = !1, O, S, y = u === void 0 ? null : u;
        return [
          function() {
            return b(f());
          },
          y === null ? void 0 : function() {
            return b(y());
          }
        ];
      },
      [f, u, d, h]
    );
    var p = a(l, m[0], m[1]);
    return o(
      function() {
        v.hasValue = !0, v.value = p;
      },
      [p]
    ), s(p), p;
  }, Qc;
}
var rs = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kf;
function aw() {
  return Kf || (Kf = 1, process.env.NODE_ENV !== "production" && function() {
    function e(l, f) {
      return l === f && (l !== 0 || 1 / l === 1 / f) || l !== l && f !== f;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = T, r = Cm(), n = typeof Object.is == "function" ? Object.is : e, a = r.useSyncExternalStore, i = t.useRef, o = t.useEffect, c = t.useMemo, s = t.useDebugValue;
    rs.useSyncExternalStoreWithSelector = function(l, f, u, d, h) {
      var m = i(null);
      if (m.current === null) {
        var v = { hasValue: !1, value: null };
        m.current = v;
      } else v = m.current;
      m = c(
        function() {
          function b(w) {
            if (!g) {
              if (g = !0, O = w, w = d(w), h !== void 0 && v.hasValue) {
                var P = v.value;
                if (h(P, w))
                  return S = P;
              }
              return S = w;
            }
            if (P = S, n(O, w))
              return P;
            var _ = d(w);
            return h !== void 0 && h(P, _) ? (O = w, P) : (O = w, S = _);
          }
          var g = !1, O, S, y = u === void 0 ? null : u;
          return [
            function() {
              return b(f());
            },
            y === null ? void 0 : function() {
              return b(y());
            }
          ];
        },
        [f, u, d, h]
      );
      var p = a(l, m[0], m[1]);
      return o(
        function() {
          v.hasValue = !0, v.value = p;
        },
        [p]
      ), s(p), p;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), rs;
}
process.env.NODE_ENV === "production" ? zs.exports = nw() : zs.exports = aw();
var iw = zs.exports;
const ow = /* @__PURE__ */ Pe(iw), { useDebugValue: cw } = T, { useSyncExternalStoreWithSelector: sw } = ow, lw = (e) => e;
function uw(e, t = lw, r) {
  const n = sw(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    r
  );
  return cw(n), n;
}
const $e = [
  { id: "cli-1", nombre: "Constructora del Valle, S.A. de C.V.", rfc: "CVA1103158K2", regimenFiscal: "601 - General de Ley Personas Morales", direccion: "Av. Insurgentes Sur 1458, CDMX, 03920", correo: "pagos@constructoradelvalle.mx", telefono: "55 5555 0182", usoCfdi: "G03" },
  { id: "cli-2", nombre: "Mariana López Hernández", rfc: "LOHM900723QW4", regimenFiscal: "612 - Personas Físicas con Actividades Empresariales", direccion: "Calle Olmo 218, Guadalajara, JAL, 44100", correo: "mariana.lopez@email.mx", telefono: "33 3614 2290", usoCfdi: "G03" },
  { id: "cli-3", nombre: "Grupo Nopal del Norte, S. de R.L.", rfc: "GNN1809063M1", regimenFiscal: "601 - General de Ley Personas Morales", direccion: "Blvd. Díaz Ordaz 880, Monterrey, NL, 64650", correo: "administracion@nopalnorte.mx", telefono: "81 8000 1830", usoCfdi: "G01" },
  { id: "cli-4", nombre: "Sofía Ramírez Torres", rfc: "RATS850211PZ9", regimenFiscal: "612 - Personas Físicas con Actividades Empresariales", direccion: "Calle 60 412, Mérida, YUC, 97000", correo: "sofia.ramirez@email.mx", telefono: "999 920 4418", usoCfdi: "S01" },
  { id: "cli-5", nombre: "Tecnología Cobalto, S.A.P.I. de C.V.", rfc: "TCO200417H65", regimenFiscal: "601 - General de Ley Personas Morales", direccion: "Paseo de la Reforma 296, CDMX, 06600", correo: "facturas@cobalto.tech", telefono: "55 1102 7834", usoCfdi: "G03" },
  { id: "cli-6", nombre: "Café Estación Central, S.A. de C.V.", rfc: "CEC1608225B7", regimenFiscal: "601 - General de Ley Personas Morales", direccion: "Av. Vallarta 1932, Guadalajara, JAL, 44130", correo: "contabilidad@estacioncentral.mx", telefono: "33 3121 8840", usoCfdi: "G03" }
], fw = [
  { id: "prod-1", claveSat: "81112100", nombre: "Desarrollo de software a medida", unidad: "E48 - Servicio", precio: 18500, iva: 16, categoria: "Servicios profesionales" },
  { id: "prod-2", claveSat: "80161500", nombre: "Consultoría de procesos", unidad: "E48 - Servicio", precio: 9200, iva: 16, categoria: "Consultoría" },
  { id: "prod-3", claveSat: "43231500", nombre: "Licencia de plataforma mensual", unidad: "E48 - Servicio", precio: 2400, iva: 16, categoria: "Software" },
  { id: "prod-4", claveSat: "78101800", nombre: "Logística y entrega local", unidad: "E48 - Servicio", precio: 850, iva: 16, categoria: "Logística" },
  { id: "prod-5", claveSat: "80141600", nombre: "Diseño de identidad visual", unidad: "E48 - Servicio", precio: 6800, iva: 16, categoria: "Diseño" }
], nn = (e, t, r, n, a) => ({
  id: e,
  claveSat: t,
  descripcion: r,
  unidad: "E48 - Servicio",
  cantidad: n,
  precioUnitario: a,
  iva: 16
}), dw = [
  { id: "fac-1", folio: "F-2026-0084", clienteId: "cli-1", cliente: $e[0].nombre, rfc: $e[0].rfc, fecha: "2026-09-30", vencimiento: "2026-10-30", subtotal: 18500, iva: 2960, retenciones: 0, total: 21460, estado: "Pendiente", metodoPago: "PPD", formaPago: "Por definir", conceptos: [nn("con-1", "81112100", "Desarrollo de software a medida", 1, 18500)] },
  { id: "fac-2", folio: "F-2026-0083", clienteId: "cli-5", cliente: $e[4].nombre, rfc: $e[4].rfc, fecha: "2026-09-30", vencimiento: "2026-09-30", subtotal: 9200, iva: 1472, retenciones: 0, total: 10672, estado: "Pagada", metodoPago: "PUE", formaPago: "Transferencia", conceptos: [nn("con-2", "80161500", "Consultoría de procesos", 1, 9200)] },
  { id: "fac-3", folio: "F-2026-0082", clienteId: "cli-3", cliente: $e[2].nombre, rfc: $e[2].rfc, fecha: "2026-09-29", vencimiento: "2026-10-29", subtotal: 24e3, iva: 3840, retenciones: 0, total: 27840, estado: "Emitida", metodoPago: "PPD", formaPago: "Por definir", conceptos: [nn("con-3", "43231500", "Licencia de plataforma mensual", 10, 2400)] },
  { id: "fac-4", folio: "F-2026-0081", clienteId: "cli-2", cliente: $e[1].nombre, rfc: $e[1].rfc, fecha: "2026-09-27", vencimiento: "2026-09-27", subtotal: 6800, iva: 1088, retenciones: 0, total: 7888, estado: "Pagada", metodoPago: "PUE", formaPago: "Tarjeta", conceptos: [nn("con-4", "80141600", "Diseño de identidad visual", 1, 6800)] },
  { id: "fac-5", folio: "F-2026-0079", clienteId: "cli-6", cliente: $e[5].nombre, rfc: $e[5].rfc, fecha: "2026-09-21", vencimiento: "2026-10-21", subtotal: 18500, iva: 2960, retenciones: 0, total: 21460, estado: "Cancelada", metodoPago: "PPD", formaPago: "Por definir", conceptos: [nn("con-5", "81112100", "Desarrollo de software a medida", 1, 18500)], cancelacion: { motivo: "Solicitud del cliente", fecha: "2026-09-22", usuario: "Lucía Fernández" } },
  { id: "fac-6", folio: "F-2026-0078", clienteId: "cli-4", cliente: $e[3].nombre, rfc: $e[3].rfc, fecha: "2026-09-18", vencimiento: "2026-10-18", subtotal: 9200, iva: 1472, retenciones: 0, total: 10672, estado: "Pendiente", metodoPago: "PPD", formaPago: "Por definir", conceptos: [nn("con-6", "80161500", "Consultoría de procesos", 1, 9200)] }
], hw = [
  { id: "pag-1", facturaId: "fac-2", folioFactura: "F-2026-0083", cliente: $e[4].nombre, fecha: "2026-09-30", monto: 10672, formaPago: "Transferencia", referencia: "SPEI-483921" },
  { id: "pag-2", facturaId: "fac-1", folioFactura: "F-2026-0084", cliente: $e[0].nombre, fecha: "2026-09-30", monto: 1e4, formaPago: "Transferencia", referencia: "SPEI-483875" },
  { id: "pag-3", facturaId: "fac-4", folioFactura: "F-2026-0081", cliente: $e[1].nombre, fecha: "2026-09-27", monto: 7888, formaPago: "Tarjeta", referencia: "TARJ-290184" }
], pw = [
  { id: "cot-1", folio: "COT-2026-0031", cliente: $e[2].nombre, fecha: "2026-09-29", vigencia: "2026-10-29", total: 27840, estado: "Enviada" },
  { id: "cot-2", folio: "COT-2026-0030", cliente: $e[0].nombre, fecha: "2026-09-26", vigencia: "2026-10-10", total: 21460, estado: "Aceptada" },
  { id: "cot-3", folio: "COT-2026-0029", cliente: $e[5].nombre, fecha: "2026-09-20", vigencia: "2026-10-20", total: 7888, estado: "Borrador" },
  { id: "cot-4", folio: "COT-2026-0028", cliente: $e[1].nombre, fecha: "2026-09-14", vigencia: "2026-09-28", total: 10672, estado: "Convertida" }
], vw = [
  { id: "nc-1", folio: "NC-2026-0006", facturaOriginal: "F-2026-0079", cliente: $e[5].nombre, fecha: "2026-09-22", motivo: "Devolución del servicio", monto: 21460, estado: "Aplicada" },
  { id: "nc-2", folio: "NC-2026-0005", facturaOriginal: "F-2026-0072", cliente: $e[0].nombre, fecha: "2026-09-18", motivo: "Descuento comercial", monto: 2500, estado: "Pendiente" },
  { id: "nc-3", folio: "NC-2026-0004", facturaOriginal: "F-2026-0068", cliente: $e[4].nombre, fecha: "2026-09-10", motivo: "Corrección de importe", monto: 1200, estado: "Aplicada" }
], mw = [
  { id: "rec-1", cliente: $e[4].nombre, concepto: "Licencias de plataforma", frecuencia: "Mensual", proximaEmision: "2026-10-01", total: 27840, activa: !0 },
  { id: "rec-2", cliente: $e[1].nombre, concepto: "Soporte y mantenimiento", frecuencia: "Mensual", proximaEmision: "2026-10-05", total: 7888, activa: !0 },
  { id: "rec-3", cliente: $e[2].nombre, concepto: "Consultoría trimestral", frecuencia: "Trimestral", proximaEmision: "2026-10-15", total: 10672, activa: !1 }
], yw = {
  razonSocial: "Estudio Norte Digital, S.A. de C.V.",
  rfc: "END190514KJ3",
  regimenFiscal: "601 - General de Ley Personas Morales",
  codigoPostal: "03100",
  serie: "F",
  siguienteFolio: 85,
  tasaIva: 16,
  retencionIsr: 0,
  retencionIva: 0,
  pacUsuario: "",
  pacApiKey: ""
}, gw = [
  { dia: "24 sep", total: 18200 },
  { dia: "25 sep", total: 26400 },
  { dia: "26 sep", total: 19800 },
  { dia: "27 sep", total: 32600 },
  { dia: "28 sep", total: 24100 },
  { dia: "29 sep", total: 38700 },
  { dia: "30 sep", total: 32132 }
], bw = () => {
  const e = (t, r) => ({
    facturas: dw,
    clientes: $e,
    productos: fw,
    pagos: hw,
    cotizaciones: pw,
    notasCredito: vw,
    recurrentes: mw,
    datosFiscales: yw,
    cargarFacturas: (n) => t({ facturas: n }),
    agregarFactura: (n) => {
      const a = "id" in n && "folio" in n ? n : {
        ...n,
        id: `fac-${Date.now()}`,
        folio: `${r().datosFiscales.serie}-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(r().datosFiscales.siguienteFolio).padStart(4, "0")}`
      };
      return t((i) => ({ facturas: [a, ...i.facturas], datosFiscales: { ...i.datosFiscales, siguienteFolio: i.datosFiscales.siguienteFolio + 1 } })), a;
    },
    cancelarFactura: (n, a, i) => t((o) => ({ facturas: o.facturas.map((c) => c.id === n ? { ...c, estado: "Cancelada", cancelacion: { motivo: a, fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), usuario: i } } : c) })),
    agregarPago: (n) => t((a) => ({ pagos: [{ ...n, id: `pag-${Date.now()}` }, ...a.pagos] })),
    alternarRecurrente: (n) => t((a) => ({ recurrentes: a.recurrentes.map((i) => i.id === n ? { ...i, activa: !i.activa } : i) })),
    guardarCliente: (n) => t((a) => ({ clientes: [n, ...a.clientes.filter((i) => i.id !== n.id)] })),
    guardarProducto: (n) => t((a) => ({ productos: [n, ...a.productos.filter((i) => i.id !== n.id)] })),
    actualizarDatosFiscales: (n) => t({ datosFiscales: n }),
    convertirCotizacion: (n) => t((a) => ({ cotizaciones: a.cotizaciones.map((i) => i.id === n ? { ...i, estado: "Convertida" } : i) }))
  });
  return ew()(e);
};
function ww(e) {
  const t = e.replace(/\/+$/, "");
  return {
    obtenerFacturas: async () => {
      const r = await fetch(`${t}/facturas`);
      if (!r.ok) throw new Error("No se pudieron cargar las facturas.");
      return r.json();
    },
    guardarFactura: async (r) => {
      const n = await fetch(`${t}/facturas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(r)
      });
      if (!n.ok) throw new Error("No se pudo guardar la factura.");
      return n.json();
    }
  };
}
const Mm = nr(null), jm = nr(null);
function xw({ children: e, apiBaseUrl: t, api: r, tema: n = "claro" }) {
  const [a] = J(bw), i = wr(() => ({ apiBaseUrl: t, api: r ?? (t ? ww(t) : void 0), tema: n }), [t, r, n]);
  return vi(() => {
    var c;
    if (!((c = i.api) != null && c.obtenerFacturas)) return;
    let o = !0;
    return i.api.obtenerFacturas().then((s) => {
      o && a.getState().cargarFacturas(s);
    }).catch(() => {
    }), () => {
      o = !1;
    };
  }, [i.api, a]), /* @__PURE__ */ x(jm.Provider, { value: i, children: /* @__PURE__ */ x(Mm.Provider, { value: a, children: e }) });
}
function Oe(e) {
  const t = At(Mm);
  if (!t) throw new Error("useFacturacionStore debe usarse dentro de FacturacionProvider");
  return uw(t, e);
}
function Ow() {
  const e = At(jm);
  if (!e) throw new Error("useFacturacionConfig debe usarse dentro de FacturacionProvider");
  return e;
}
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sw = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Nm = (...e) => e.filter((t, r, n) => !!t && t.trim() !== "" && n.indexOf(t) === r).join(" ").trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Pw = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _w = oc(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: n,
    className: a = "",
    children: i,
    iconNode: o,
    ...c
  }, s) => Ca(
    "svg",
    {
      ref: s,
      ...Pw,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: n ? Number(r) * 24 / Number(t) : r,
      className: Nm("lucide", a),
      ...c
    },
    [
      ...o.map(([l, f]) => Ca(l, f)),
      ...Array.isArray(i) ? i : [i]
    ]
  )
);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ue = (e, t) => {
  const r = oc(
    ({ className: n, ...a }, i) => Ca(_w, {
      ref: i,
      iconNode: t,
      className: Nm(`lucide-${Sw(e)}`, n),
      ...a
    })
  );
  return r.displayName = `${e}`, r;
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const km = ue("Activity", [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Aw = ue("ArrowDownRight", [
  ["path", { d: "m7 7 10 10", key: "1fmybs" }],
  ["path", { d: "M17 7v10H7", key: "6fjiku" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ew = ue("ArrowRightLeft", [
  ["path", { d: "m16 3 4 4-4 4", key: "1x1c3m" }],
  ["path", { d: "M20 7H4", key: "zbl0bi" }],
  ["path", { d: "m8 21-4-4 4-4", key: "h9nckh" }],
  ["path", { d: "M4 17h16", key: "g4d7ey" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xf = ue("ArrowUpRight", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tw = ue("Bell", [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $w = ue("Boxes", [
  [
    "path",
    {
      d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
      key: "lc1i9w"
    }
  ],
  ["path", { d: "m7 16.5-4.74-2.85", key: "1o9zyk" }],
  ["path", { d: "m7 16.5 5-3", key: "va8pkn" }],
  ["path", { d: "M7 16.5v5.17", key: "jnp8gn" }],
  [
    "path",
    {
      d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
      key: "8zsnat"
    }
  ],
  ["path", { d: "m17 16.5-5-3", key: "8arw3v" }],
  ["path", { d: "m17 16.5 4.74-2.85", key: "8rfmw" }],
  ["path", { d: "M17 16.5v5.17", key: "k6z78m" }],
  [
    "path",
    {
      d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
      key: "1xygjf"
    }
  ],
  ["path", { d: "M12 8 7.26 5.15", key: "1vbdud" }],
  ["path", { d: "m12 8 4.74-2.85", key: "3rx089" }],
  ["path", { d: "M12 13.5V8", key: "1io7kd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cw = ue("Building2", [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mw = ue("CalendarDays", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jw = ue("ChartColumn", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zf = ue("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _u = ue("CircleDollarSign", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nw = ue("CircleX", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kw = ue("ClipboardList", [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ji = ue("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Iw = ue("Eye", [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dw = ue("FileClock", [
  ["path", { d: "M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3", key: "37hlfg" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["circle", { cx: "8", cy: "16", r: "6", key: "10v15b" }],
  ["path", { d: "M9.5 17.5 8 16.25V14", key: "1o80t2" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Im = ue("FileCode2", [
  ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4", key: "1pf5j1" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "m5 12-3 3 3 3", key: "oke12k" }],
  ["path", { d: "m9 18 3-3-3-3", key: "112psh" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dm = ue("FilePlus2", [
  ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4", key: "1pf5j1" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M3 15h6", key: "4e2qda" }],
  ["path", { d: "M6 12v6", key: "1u72j0" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qi = ue("FileText", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rw = ue("Gauge", [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lw = ue("Layers", [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fw = ue("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bw = ue("Mail", [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zw = ue("Package", [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["path", { d: "m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7", key: "yx3hmr" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ww = ue("Pause", [
  ["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1", key: "zuxfzm" }],
  ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1", key: "1okwgv" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uw = ue("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xn = ue("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vw = ue("ReceiptText", [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M14 8H8", key: "1l3xfs" }],
  ["path", { d: "M16 12H8", key: "1fr5h0" }],
  ["path", { d: "M13 16H8", key: "wsln4y" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qw = ue("Save", [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sc = ue("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hw = ue("Settings2", [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gw = ue("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Au = ue("UserRound", [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yw = ue("UsersRound", [
  ["path", { d: "M18 21a8 8 0 0 0-16 0", key: "3ypg7q" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3", key: "10s06x" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rm = ue("WalletCards", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2", key: "4125el" }],
  [
    "path",
    {
      d: "M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21",
      key: "1dpki6"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kw = ue("Wallet", [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xw = ue("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zw = ue("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]);
function de({ variante: e = "neutro", icono: t, children: r, className: n = "", ...a }) {
  return /* @__PURE__ */ A("button", { className: `fact-button fact-button--${e} ${n}`, ...a, children: [
    t && /* @__PURE__ */ x("span", { className: "fact-button__icon", "aria-hidden": "true", children: t }),
    r
  ] });
}
const Jw = [
  { to: "/", label: "Resumen", icon: Rw },
  { to: "/facturas/nueva", label: "Nueva factura", icon: Dm },
  { to: "/facturas", label: "Facturas", icon: Qi },
  { to: "/canceladas", label: "Canceladas", icon: Dw },
  { to: "/pagos", label: "Pagos y complementos", icon: Rm },
  { to: "/cotizaciones", label: "Cotizaciones", icon: kw },
  { to: "/notas-credito", label: "Notas de crédito", icon: Lw },
  { to: "/recurrentes", label: "Recurrentes", icon: km },
  { to: "/clientes", label: "Clientes", icon: Yw },
  { to: "/productos", label: "Productos y servicios", icon: zw },
  { to: "/reportes", label: "Reportes", icon: jw },
  { to: "/configuracion", label: "Configuración", icon: Hw }
];
function Qw() {
  const [e, t] = J(!1);
  return /* @__PURE__ */ A(yr, { children: [
    /* @__PURE__ */ x("button", { className: "fact-mobile-menu", onClick: () => t((r) => !r), "aria-expanded": e, "aria-label": "Abrir navegación", children: /* @__PURE__ */ x(Zf, { size: 18 }) }),
    e && /* @__PURE__ */ x("button", { "aria-label": "Cerrar menú", className: "fact-sidebar-scrim", onClick: () => t(!1) }),
    /* @__PURE__ */ A("aside", { className: `fact-sidebar ${e ? "is-open" : ""}`, children: [
      /* @__PURE__ */ A("div", { className: "fact-brand", children: [
        /* @__PURE__ */ x("span", { className: "fact-brand__mark", children: /* @__PURE__ */ x(_u, { size: 21 }) }),
        /* @__PURE__ */ A("span", { children: [
          "norte",
          /* @__PURE__ */ x("span", { className: "fact-brand__dot", children: "." }),
          /* @__PURE__ */ x("small", { children: "FACTURACIÓN" })
        ] })
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-company", children: [
        /* @__PURE__ */ x("span", { className: "fact-company__icon", children: /* @__PURE__ */ x(Cw, { size: 17 }) }),
        /* @__PURE__ */ A("span", { children: [
          "Estudio Norte Digital",
          /* @__PURE__ */ x("small", { children: "RFC END190514KJ3" })
        ] }),
        /* @__PURE__ */ x(Zf, { size: 14 })
      ] }),
      /* @__PURE__ */ x("nav", { className: "fact-nav", "aria-label": "Navegación de facturación", children: Jw.map(({ to: r, label: n, icon: a }) => /* @__PURE__ */ A(Tm, { to: r, end: r === "/", onClick: () => t(!1), className: ({ isActive: i }) => `fact-nav__link ${i ? "is-active" : ""}`, children: [
        /* @__PURE__ */ x(a, { size: 17, strokeWidth: 1.8 }),
        /* @__PURE__ */ x("span", { children: n }),
        n === "Facturas" && /* @__PURE__ */ x("span", { className: "fact-nav__count", children: "6" })
      ] }, r)) }),
      /* @__PURE__ */ A("div", { className: "fact-sidebar__footer", children: [
        /* @__PURE__ */ A("div", { className: "fact-help", children: [
          /* @__PURE__ */ x("strong", { children: "¿Necesitas ayuda?" }),
          /* @__PURE__ */ x("span", { children: "Estamos para apoyarte." }),
          /* @__PURE__ */ x(de, { variante: "neutro", onClick: () => window.alert("Escríbenos a soporte@nortedigital.mx"), children: "Contactar soporte" })
        ] }),
        /* @__PURE__ */ x("small", { children: "© 2026 Norte Digital" })
      ] })
    ] })
  ] });
}
function ex({ titulo: e, usuario: t, onSalir: r }) {
  return /* @__PURE__ */ A("header", { className: "fact-header", children: [
    /* @__PURE__ */ A("div", { className: "fact-header__title", children: [
      /* @__PURE__ */ x("span", { className: "fact-header__eyebrow", children: "ADMINISTRACIÓN" }),
      /* @__PURE__ */ x("h1", { children: e })
    ] }),
    /* @__PURE__ */ A("div", { className: "fact-header__tools", children: [
      /* @__PURE__ */ A("label", { className: "fact-search fact-header__search", children: [
        /* @__PURE__ */ x(sc, { size: 16 }),
        /* @__PURE__ */ x("input", { "aria-label": "Buscar en facturación", placeholder: "Buscar en facturación" })
      ] }),
      /* @__PURE__ */ A("button", { className: "fact-icon-button fact-header__notification", "aria-label": "Notificaciones", children: [
        /* @__PURE__ */ x(Tw, { size: 18 }),
        /* @__PURE__ */ x("i", {})
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-user", children: [
        /* @__PURE__ */ x("span", { className: "fact-user__avatar", children: /* @__PURE__ */ x(Au, { size: 18 }) }),
        /* @__PURE__ */ A("span", { className: "fact-user__name", children: [
          (t == null ? void 0 : t.nombre) ?? "Lucía Fernández",
          /* @__PURE__ */ x("small", { children: (t == null ? void 0 : t.rol) ?? "Administradora" })
        ] })
      ] }),
      r && /* @__PURE__ */ x("button", { className: "fact-icon-button", onClick: r, "aria-label": "Salir del módulo", title: "Salir", children: /* @__PURE__ */ x(Fw, { size: 17 }) })
    ] })
  ] });
}
const tx = { "/": "Resumen", "/facturas/nueva": "Nueva factura", "/facturas": "Facturas", "/canceladas": "Facturas canceladas", "/pagos": "Pagos y complementos", "/cotizaciones": "Cotizaciones", "/notas-credito": "Notas de crédito", "/recurrentes": "Facturas recurrentes", "/clientes": "Clientes", "/productos": "Productos y servicios", "/reportes": "Reportes", "/configuracion": "Configuración" };
function rx({ children: e, usuario: t, onSalir: r }) {
  const n = xr(), a = tx[n.pathname] ?? (n.pathname.startsWith("/facturas/") ? "Detalle de factura" : "Facturación");
  return /* @__PURE__ */ A("div", { className: "fact-shell", children: [
    /* @__PURE__ */ x(Qw, {}),
    /* @__PURE__ */ A("div", { className: "fact-main", children: [
      /* @__PURE__ */ x(ex, { titulo: a, usuario: t, onSalir: r }),
      /* @__PURE__ */ x("main", { className: "fact-content", children: e })
    ] })
  ] });
}
function Lm(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = Lm(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function le() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = Lm(e)) && (n && (n += " "), n += t);
  return n;
}
var nx = Array.isArray, it = nx, ax = typeof Ti == "object" && Ti && Ti.Object === Object && Ti, Fm = ax, ix = Fm, ox = typeof self == "object" && self && self.Object === Object && self, cx = ix || ox || Function("return this")(), zt = cx, sx = zt, lx = sx.Symbol, bi = lx, Jf = bi, Bm = Object.prototype, ux = Bm.hasOwnProperty, fx = Bm.toString, fa = Jf ? Jf.toStringTag : void 0;
function dx(e) {
  var t = ux.call(e, fa), r = e[fa];
  try {
    e[fa] = void 0;
    var n = !0;
  } catch {
  }
  var a = fx.call(e);
  return n && (t ? e[fa] = r : delete e[fa]), a;
}
var hx = dx, px = Object.prototype, vx = px.toString;
function mx(e) {
  return vx.call(e);
}
var yx = mx, Qf = bi, gx = hx, bx = yx, wx = "[object Null]", xx = "[object Undefined]", ed = Qf ? Qf.toStringTag : void 0;
function Ox(e) {
  return e == null ? e === void 0 ? xx : wx : ed && ed in Object(e) ? gx(e) : bx(e);
}
var ar = Ox;
function Sx(e) {
  return e != null && typeof e == "object";
}
var ir = Sx, Px = ar, _x = ir, Ax = "[object Symbol]";
function Ex(e) {
  return typeof e == "symbol" || _x(e) && Px(e) == Ax;
}
var Zn = Ex, Tx = it, $x = Zn, Cx = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Mx = /^\w*$/;
function jx(e, t) {
  if (Tx(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || $x(e) ? !0 : Mx.test(e) || !Cx.test(e) || t != null && e in Object(t);
}
var Eu = jx;
function Nx(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Or = Nx;
const Jn = /* @__PURE__ */ Pe(Or);
var kx = ar, Ix = Or, Dx = "[object AsyncFunction]", Rx = "[object Function]", Lx = "[object GeneratorFunction]", Fx = "[object Proxy]";
function Bx(e) {
  if (!Ix(e))
    return !1;
  var t = kx(e);
  return t == Rx || t == Lx || t == Dx || t == Fx;
}
var Tu = Bx;
const ie = /* @__PURE__ */ Pe(Tu);
var zx = zt, Wx = zx["__core-js_shared__"], Ux = Wx, ns = Ux, td = function() {
  var e = /[^.]+$/.exec(ns && ns.keys && ns.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Vx(e) {
  return !!td && td in e;
}
var qx = Vx, Hx = Function.prototype, Gx = Hx.toString;
function Yx(e) {
  if (e != null) {
    try {
      return Gx.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var zm = Yx, Kx = Tu, Xx = qx, Zx = Or, Jx = zm, Qx = /[\\^$.*+?()[\]{}|]/g, eO = /^\[object .+?Constructor\]$/, tO = Function.prototype, rO = Object.prototype, nO = tO.toString, aO = rO.hasOwnProperty, iO = RegExp(
  "^" + nO.call(aO).replace(Qx, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function oO(e) {
  if (!Zx(e) || Xx(e))
    return !1;
  var t = Kx(e) ? iO : eO;
  return t.test(Jx(e));
}
var cO = oO;
function sO(e, t) {
  return e == null ? void 0 : e[t];
}
var lO = sO, uO = cO, fO = lO;
function dO(e, t) {
  var r = fO(e, t);
  return uO(r) ? r : void 0;
}
var Zr = dO, hO = Zr, pO = hO(Object, "create"), lc = pO, rd = lc;
function vO() {
  this.__data__ = rd ? rd(null) : {}, this.size = 0;
}
var mO = vO;
function yO(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var gO = yO, bO = lc, wO = "__lodash_hash_undefined__", xO = Object.prototype, OO = xO.hasOwnProperty;
function SO(e) {
  var t = this.__data__;
  if (bO) {
    var r = t[e];
    return r === wO ? void 0 : r;
  }
  return OO.call(t, e) ? t[e] : void 0;
}
var PO = SO, _O = lc, AO = Object.prototype, EO = AO.hasOwnProperty;
function TO(e) {
  var t = this.__data__;
  return _O ? t[e] !== void 0 : EO.call(t, e);
}
var $O = TO, CO = lc, MO = "__lodash_hash_undefined__";
function jO(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = CO && t === void 0 ? MO : t, this;
}
var NO = jO, kO = mO, IO = gO, DO = PO, RO = $O, LO = NO;
function Qn(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Qn.prototype.clear = kO;
Qn.prototype.delete = IO;
Qn.prototype.get = DO;
Qn.prototype.has = RO;
Qn.prototype.set = LO;
var FO = Qn;
function BO() {
  this.__data__ = [], this.size = 0;
}
var zO = BO;
function WO(e, t) {
  return e === t || e !== e && t !== t;
}
var $u = WO, UO = $u;
function VO(e, t) {
  for (var r = e.length; r--; )
    if (UO(e[r][0], t))
      return r;
  return -1;
}
var uc = VO, qO = uc, HO = Array.prototype, GO = HO.splice;
function YO(e) {
  var t = this.__data__, r = qO(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : GO.call(t, r, 1), --this.size, !0;
}
var KO = YO, XO = uc;
function ZO(e) {
  var t = this.__data__, r = XO(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var JO = ZO, QO = uc;
function eS(e) {
  return QO(this.__data__, e) > -1;
}
var tS = eS, rS = uc;
function nS(e, t) {
  var r = this.__data__, n = rS(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var aS = nS, iS = zO, oS = KO, cS = JO, sS = tS, lS = aS;
function ea(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
ea.prototype.clear = iS;
ea.prototype.delete = oS;
ea.prototype.get = cS;
ea.prototype.has = sS;
ea.prototype.set = lS;
var fc = ea, uS = Zr, fS = zt, dS = uS(fS, "Map"), Cu = dS, nd = FO, hS = fc, pS = Cu;
function vS() {
  this.size = 0, this.__data__ = {
    hash: new nd(),
    map: new (pS || hS)(),
    string: new nd()
  };
}
var mS = vS;
function yS(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var gS = yS, bS = gS;
function wS(e, t) {
  var r = e.__data__;
  return bS(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var dc = wS, xS = dc;
function OS(e) {
  var t = xS(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var SS = OS, PS = dc;
function _S(e) {
  return PS(this, e).get(e);
}
var AS = _S, ES = dc;
function TS(e) {
  return ES(this, e).has(e);
}
var $S = TS, CS = dc;
function MS(e, t) {
  var r = CS(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var jS = MS, NS = mS, kS = SS, IS = AS, DS = $S, RS = jS;
function ta(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
ta.prototype.clear = NS;
ta.prototype.delete = kS;
ta.prototype.get = IS;
ta.prototype.has = DS;
ta.prototype.set = RS;
var Mu = ta, Wm = Mu, LS = "Expected a function";
function ju(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(LS);
  var r = function() {
    var n = arguments, a = t ? t.apply(this, n) : n[0], i = r.cache;
    if (i.has(a))
      return i.get(a);
    var o = e.apply(this, n);
    return r.cache = i.set(a, o) || i, o;
  };
  return r.cache = new (ju.Cache || Wm)(), r;
}
ju.Cache = Wm;
var Um = ju;
const FS = /* @__PURE__ */ Pe(Um);
var BS = Um, zS = 500;
function WS(e) {
  var t = BS(e, function(n) {
    return r.size === zS && r.clear(), n;
  }), r = t.cache;
  return t;
}
var US = WS, VS = US, qS = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, HS = /\\(\\)?/g, GS = VS(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(qS, function(r, n, a, i) {
    t.push(a ? i.replace(HS, "$1") : n || r);
  }), t;
}), YS = GS;
function KS(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = Array(n); ++r < n; )
    a[r] = t(e[r], r, e);
  return a;
}
var Nu = KS, ad = bi, XS = Nu, ZS = it, JS = Zn, id = ad ? ad.prototype : void 0, od = id ? id.toString : void 0;
function Vm(e) {
  if (typeof e == "string")
    return e;
  if (ZS(e))
    return XS(e, Vm) + "";
  if (JS(e))
    return od ? od.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
var QS = Vm, eP = QS;
function tP(e) {
  return e == null ? "" : eP(e);
}
var qm = tP, rP = it, nP = Eu, aP = YS, iP = qm;
function oP(e, t) {
  return rP(e) ? e : nP(e, t) ? [e] : aP(iP(e));
}
var Hm = oP, cP = Zn;
function sP(e) {
  if (typeof e == "string" || cP(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
var hc = sP, lP = Hm, uP = hc;
function fP(e, t) {
  t = lP(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[uP(t[r++])];
  return r && r == n ? e : void 0;
}
var ku = fP, dP = ku;
function hP(e, t, r) {
  var n = e == null ? void 0 : dP(e, t);
  return n === void 0 ? r : n;
}
var Gm = hP;
const lt = /* @__PURE__ */ Pe(Gm);
function pP(e) {
  return e == null;
}
var vP = pP;
const ce = /* @__PURE__ */ Pe(vP);
var mP = ar, yP = it, gP = ir, bP = "[object String]";
function wP(e) {
  return typeof e == "string" || !yP(e) && gP(e) && mP(e) == bP;
}
var xP = wP;
const Vr = /* @__PURE__ */ Pe(xP);
var Ws = { exports: {} }, ye = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cd;
function OP() {
  if (cd) return ye;
  cd = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), o = Symbol.for("react.context"), c = Symbol.for("react.server_context"), s = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), h = Symbol.for("react.offscreen"), m;
  m = Symbol.for("react.module.reference");
  function v(p) {
    if (typeof p == "object" && p !== null) {
      var b = p.$$typeof;
      switch (b) {
        case e:
          switch (p = p.type, p) {
            case r:
            case a:
            case n:
            case l:
            case f:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case c:
                case o:
                case s:
                case d:
                case u:
                case i:
                  return p;
                default:
                  return b;
              }
          }
        case t:
          return b;
      }
    }
  }
  return ye.ContextConsumer = o, ye.ContextProvider = i, ye.Element = e, ye.ForwardRef = s, ye.Fragment = r, ye.Lazy = d, ye.Memo = u, ye.Portal = t, ye.Profiler = a, ye.StrictMode = n, ye.Suspense = l, ye.SuspenseList = f, ye.isAsyncMode = function() {
    return !1;
  }, ye.isConcurrentMode = function() {
    return !1;
  }, ye.isContextConsumer = function(p) {
    return v(p) === o;
  }, ye.isContextProvider = function(p) {
    return v(p) === i;
  }, ye.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === e;
  }, ye.isForwardRef = function(p) {
    return v(p) === s;
  }, ye.isFragment = function(p) {
    return v(p) === r;
  }, ye.isLazy = function(p) {
    return v(p) === d;
  }, ye.isMemo = function(p) {
    return v(p) === u;
  }, ye.isPortal = function(p) {
    return v(p) === t;
  }, ye.isProfiler = function(p) {
    return v(p) === a;
  }, ye.isStrictMode = function(p) {
    return v(p) === n;
  }, ye.isSuspense = function(p) {
    return v(p) === l;
  }, ye.isSuspenseList = function(p) {
    return v(p) === f;
  }, ye.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === r || p === a || p === n || p === l || p === f || p === h || typeof p == "object" && p !== null && (p.$$typeof === d || p.$$typeof === u || p.$$typeof === i || p.$$typeof === o || p.$$typeof === s || p.$$typeof === m || p.getModuleId !== void 0);
  }, ye.typeOf = v, ye;
}
var ge = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sd;
function SP() {
  return sd || (sd = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), o = Symbol.for("react.context"), c = Symbol.for("react.server_context"), s = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), h = Symbol.for("react.offscreen"), m = !1, v = !1, p = !1, b = !1, g = !1, O;
    O = Symbol.for("react.module.reference");
    function S(G) {
      return !!(typeof G == "string" || typeof G == "function" || G === r || G === a || g || G === n || G === l || G === f || b || G === h || m || v || p || typeof G == "object" && G !== null && (G.$$typeof === d || G.$$typeof === u || G.$$typeof === i || G.$$typeof === o || G.$$typeof === s || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      G.$$typeof === O || G.getModuleId !== void 0));
    }
    function y(G) {
      if (typeof G == "object" && G !== null) {
        var Ee = G.$$typeof;
        switch (Ee) {
          case e:
            var ke = G.type;
            switch (ke) {
              case r:
              case a:
              case n:
              case l:
              case f:
                return ke;
              default:
                var Ye = ke && ke.$$typeof;
                switch (Ye) {
                  case c:
                  case o:
                  case s:
                  case d:
                  case u:
                  case i:
                    return Ye;
                  default:
                    return Ee;
                }
            }
          case t:
            return Ee;
        }
      }
    }
    var w = o, P = i, _ = e, $ = s, E = r, j = d, C = u, D = t, I = a, R = n, F = l, k = f, z = !1, V = !1;
    function N(G) {
      return z || (z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function B(G) {
      return V || (V = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function W(G) {
      return y(G) === o;
    }
    function Y(G) {
      return y(G) === i;
    }
    function X(G) {
      return typeof G == "object" && G !== null && G.$$typeof === e;
    }
    function ee(G) {
      return y(G) === s;
    }
    function re(G) {
      return y(G) === r;
    }
    function oe(G) {
      return y(G) === d;
    }
    function ae(G) {
      return y(G) === u;
    }
    function U(G) {
      return y(G) === t;
    }
    function K(G) {
      return y(G) === a;
    }
    function Q(G) {
      return y(G) === n;
    }
    function M(G) {
      return y(G) === l;
    }
    function fe(G) {
      return y(G) === f;
    }
    ge.ContextConsumer = w, ge.ContextProvider = P, ge.Element = _, ge.ForwardRef = $, ge.Fragment = E, ge.Lazy = j, ge.Memo = C, ge.Portal = D, ge.Profiler = I, ge.StrictMode = R, ge.Suspense = F, ge.SuspenseList = k, ge.isAsyncMode = N, ge.isConcurrentMode = B, ge.isContextConsumer = W, ge.isContextProvider = Y, ge.isElement = X, ge.isForwardRef = ee, ge.isFragment = re, ge.isLazy = oe, ge.isMemo = ae, ge.isPortal = U, ge.isProfiler = K, ge.isStrictMode = Q, ge.isSuspense = M, ge.isSuspenseList = fe, ge.isValidElementType = S, ge.typeOf = y;
  }()), ge;
}
process.env.NODE_ENV === "production" ? Ws.exports = OP() : Ws.exports = SP();
var PP = Ws.exports, _P = ar, AP = ir, EP = "[object Number]";
function TP(e) {
  return typeof e == "number" || AP(e) && _P(e) == EP;
}
var Ym = TP;
const $P = /* @__PURE__ */ Pe(Ym);
var CP = Ym;
function MP(e) {
  return CP(e) && e != +e;
}
var jP = MP;
const ra = /* @__PURE__ */ Pe(jP);
var Je = function(t) {
  return t === 0 ? 0 : t > 0 ? 1 : -1;
}, Dr = function(t) {
  return Vr(t) && t.indexOf("%") === t.length - 1;
}, H = function(t) {
  return $P(t) && !ra(t);
}, NP = function(t) {
  return ce(t);
}, Ue = function(t) {
  return H(t) || Vr(t);
}, kP = 0, na = function(t) {
  var r = ++kP;
  return "".concat(t || "").concat(r);
}, Qe = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!H(t) && !Vr(t))
    return n;
  var i;
  if (Dr(t)) {
    var o = t.indexOf("%");
    i = r * parseFloat(t.slice(0, o)) / 100;
  } else
    i = +t;
  return ra(i) && (i = n), a && i > r && (i = r), i;
}, dr = function(t) {
  if (!t)
    return null;
  var r = Object.keys(t);
  return r && r.length ? t[r[0]] : null;
}, IP = function(t) {
  if (!Array.isArray(t))
    return !1;
  for (var r = t.length, n = {}, a = 0; a < r; a++)
    if (!n[t[a]])
      n[t[a]] = !0;
    else
      return !0;
  return !1;
}, rt = function(t, r) {
  return H(t) && H(r) ? function(n) {
    return t + n * (r - t);
  } : function() {
    return r;
  };
};
function eo(e, t, r) {
  return !e || !e.length ? null : e.find(function(n) {
    return n && (typeof t == "function" ? t(n) : lt(n, t)) === r;
  });
}
var DP = function(t, r) {
  return H(t) && H(r) ? t - r : Vr(t) && Vr(r) ? t.localeCompare(r) : t instanceof Date && r instanceof Date ? t.getTime() - r.getTime() : String(t).localeCompare(String(r));
};
function vn(e, t) {
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r) && (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r]))
      return !1;
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n))
      return !1;
  return !0;
}
function Us(e) {
  "@babel/helpers - typeof";
  return Us = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Us(e);
}
var RP = ["viewBox", "children"], LP = [
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  "className",
  "color",
  "height",
  "id",
  "lang",
  "max",
  "media",
  "method",
  "min",
  "name",
  "style",
  /*
   * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
   * that can use it and it conflicts with the recharts prop 'type'
   * https://github.com/recharts/recharts/pull/3327
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
   */
  // 'type',
  "target",
  "width",
  "role",
  "tabIndex",
  "accentHeight",
  "accumulate",
  "additive",
  "alignmentBaseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabicForm",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "capHeight",
  "clip",
  "clipPath",
  "clipPathUnits",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominantBaseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "enableBackground",
  "end",
  "exponent",
  "externalResourcesRequired",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "focusable",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "format",
  "from",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "horizAdvX",
  "horizOriginX",
  "href",
  "ideographic",
  "imageRendering",
  "in2",
  "in",
  "intercept",
  "k1",
  "k2",
  "k3",
  "k4",
  "k",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "local",
  "markerEnd",
  "markerHeight",
  "markerMid",
  "markerStart",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "mode",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overlinePosition",
  "overlineThickness",
  "paintOrder",
  "panose1",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "refX",
  "refY",
  "renderingIntent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "seed",
  "shapeRendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "string",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textLength",
  "textRendering",
  "to",
  "transform",
  "u1",
  "u2",
  "underlinePosition",
  "underlineThickness",
  "unicode",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "values",
  "vectorEffect",
  "version",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "vHanging",
  "vIdeographic",
  "viewTarget",
  "visibility",
  "vMathematical",
  "widths",
  "wordSpacing",
  "writingMode",
  "x1",
  "x2",
  "x",
  "xChannelSelector",
  "xHeight",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlns",
  "xmlnsXlink",
  "xmlSpace",
  "y1",
  "y2",
  "y",
  "yChannelSelector",
  "z",
  "zoomAndPan",
  "ref",
  "key",
  "angle"
], ld = ["points", "pathLength"], as = {
  svg: RP,
  polygon: ld,
  polyline: ld
}, Iu = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"], to = function(t, r) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var n = t;
  if (/* @__PURE__ */ Pt(t) && (n = t.props), !Jn(n))
    return null;
  var a = {};
  return Object.keys(n).forEach(function(i) {
    Iu.includes(i) && (a[i] = r || function(o) {
      return n[i](n, o);
    });
  }), a;
}, FP = function(t, r, n) {
  return function(a) {
    return t(r, n, a), null;
  };
}, qr = function(t, r, n) {
  if (!Jn(t) || Us(t) !== "object")
    return null;
  var a = null;
  return Object.keys(t).forEach(function(i) {
    var o = t[i];
    Iu.includes(i) && typeof o == "function" && (a || (a = {}), a[i] = FP(o, r, n));
  }), a;
}, BP = ["children"], zP = ["children"];
function ud(e, t) {
  if (e == null) return {};
  var r = WP(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function WP(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Vs(e) {
  "@babel/helpers - typeof";
  return Vs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Vs(e);
}
var fd = {
  click: "onClick",
  mousedown: "onMouseDown",
  mouseup: "onMouseUp",
  mouseover: "onMouseOver",
  mousemove: "onMouseMove",
  mouseout: "onMouseOut",
  mouseenter: "onMouseEnter",
  mouseleave: "onMouseLeave",
  touchcancel: "onTouchCancel",
  touchend: "onTouchEnd",
  touchmove: "onTouchMove",
  touchstart: "onTouchStart",
  contextmenu: "onContextMenu",
  dblclick: "onDoubleClick"
}, Xt = function(t) {
  return typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : "";
}, dd = null, is = null, Du = function e(t) {
  if (t === dd && Array.isArray(is))
    return is;
  var r = [];
  return zr.forEach(t, function(n) {
    ce(n) || (PP.isFragment(n) ? r = r.concat(e(n.props.children)) : r.push(n));
  }), is = r, dd = t, r;
};
function mt(e, t) {
  var r = [], n = [];
  return Array.isArray(t) ? n = t.map(function(a) {
    return Xt(a);
  }) : n = [Xt(t)], Du(e).forEach(function(a) {
    var i = lt(a, "type.displayName") || lt(a, "type.name");
    n.indexOf(i) !== -1 && r.push(a);
  }), r;
}
function ct(e, t) {
  var r = mt(e, t);
  return r && r[0];
}
var hd = function(t) {
  if (!t || !t.props)
    return !1;
  var r = t.props, n = r.width, a = r.height;
  return !(!H(n) || n <= 0 || !H(a) || a <= 0);
}, UP = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"], VP = function(t) {
  return t && t.type && Vr(t.type) && UP.indexOf(t.type) >= 0;
}, qP = function(t) {
  return t && Vs(t) === "object" && "clipDot" in t;
}, HP = function(t, r, n, a) {
  var i, o = (i = as == null ? void 0 : as[a]) !== null && i !== void 0 ? i : [];
  return r.startsWith("data-") || !ie(t) && (a && o.includes(r) || LP.includes(r)) || n && Iu.includes(r);
}, te = function(t, r, n) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var a = t;
  if (/* @__PURE__ */ Pt(t) && (a = t.props), !Jn(a))
    return null;
  var i = {};
  return Object.keys(a).forEach(function(o) {
    var c;
    HP((c = a) === null || c === void 0 ? void 0 : c[o], o, r, n) && (i[o] = a[o]);
  }), i;
}, qs = function e(t, r) {
  if (t === r)
    return !0;
  var n = zr.count(t);
  if (n !== zr.count(r))
    return !1;
  if (n === 0)
    return !0;
  if (n === 1)
    return pd(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
  for (var a = 0; a < n; a++) {
    var i = t[a], o = r[a];
    if (Array.isArray(i) || Array.isArray(o)) {
      if (!e(i, o))
        return !1;
    } else if (!pd(i, o))
      return !1;
  }
  return !0;
}, pd = function(t, r) {
  if (ce(t) && ce(r))
    return !0;
  if (!ce(t) && !ce(r)) {
    var n = t.props || {}, a = n.children, i = ud(n, BP), o = r.props || {}, c = o.children, s = ud(o, zP);
    return a && c ? vn(i, s) && qs(a, c) : !a && !c ? vn(i, s) : !1;
  }
  return !1;
}, vd = function(t, r) {
  var n = [], a = {};
  return Du(t).forEach(function(i, o) {
    if (VP(i))
      n.push(i);
    else if (i) {
      var c = Xt(i.type), s = r[c] || {}, l = s.handler, f = s.once;
      if (l && (!f || !a[c])) {
        var u = l(i, c, o);
        n.push(u), a[c] = !0;
      }
    }
  }), n;
}, GP = function(t) {
  var r = t && t.type;
  return r && fd[r] ? fd[r] : null;
}, YP = function(t, r) {
  return Du(r).indexOf(t);
}, KP = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function Hs() {
  return Hs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Hs.apply(this, arguments);
}
function XP(e, t) {
  if (e == null) return {};
  var r = ZP(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function ZP(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Gs(e) {
  var t = e.children, r = e.width, n = e.height, a = e.viewBox, i = e.className, o = e.style, c = e.title, s = e.desc, l = XP(e, KP), f = a || {
    width: r,
    height: n,
    x: 0,
    y: 0
  }, u = le("recharts-surface", i);
  return /* @__PURE__ */ T.createElement("svg", Hs({}, te(l, !0, "svg"), {
    className: u,
    width: r,
    height: n,
    style: o,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height)
  }), /* @__PURE__ */ T.createElement("title", null, c), /* @__PURE__ */ T.createElement("desc", null, s), t);
}
var JP = ["children", "className"];
function Ys() {
  return Ys = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ys.apply(this, arguments);
}
function QP(e, t) {
  if (e == null) return {};
  var r = e_(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function e_(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var pe = /* @__PURE__ */ T.forwardRef(function(e, t) {
  var r = e.children, n = e.className, a = QP(e, JP), i = le("recharts-layer", n);
  return /* @__PURE__ */ T.createElement("g", Ys({
    className: i
  }, te(a, !0), {
    ref: t
  }), r);
}), t_ = process.env.NODE_ENV !== "production", _t = function(t, r) {
  for (var n = arguments.length, a = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++)
    a[i - 2] = arguments[i];
  if (t_ && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var o = 0;
      console.warn(r.replace(/%s/g, function() {
        return a[o++];
      }));
    }
};
function r_(e, t, r) {
  var n = -1, a = e.length;
  t < 0 && (t = -t > a ? 0 : a + t), r = r > a ? a : r, r < 0 && (r += a), a = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var i = Array(a); ++n < a; )
    i[n] = e[n + t];
  return i;
}
var n_ = r_, a_ = n_;
function i_(e, t, r) {
  var n = e.length;
  return r = r === void 0 ? n : r, !t && r >= n ? e : a_(e, t, r);
}
var o_ = i_, c_ = "\\ud800-\\udfff", s_ = "\\u0300-\\u036f", l_ = "\\ufe20-\\ufe2f", u_ = "\\u20d0-\\u20ff", f_ = s_ + l_ + u_, d_ = "\\ufe0e\\ufe0f", h_ = "\\u200d", p_ = RegExp("[" + h_ + c_ + f_ + d_ + "]");
function v_(e) {
  return p_.test(e);
}
var Km = v_;
function m_(e) {
  return e.split("");
}
var y_ = m_, Xm = "\\ud800-\\udfff", g_ = "\\u0300-\\u036f", b_ = "\\ufe20-\\ufe2f", w_ = "\\u20d0-\\u20ff", x_ = g_ + b_ + w_, O_ = "\\ufe0e\\ufe0f", S_ = "[" + Xm + "]", Ks = "[" + x_ + "]", Xs = "\\ud83c[\\udffb-\\udfff]", P_ = "(?:" + Ks + "|" + Xs + ")", Zm = "[^" + Xm + "]", Jm = "(?:\\ud83c[\\udde6-\\uddff]){2}", Qm = "[\\ud800-\\udbff][\\udc00-\\udfff]", __ = "\\u200d", ey = P_ + "?", ty = "[" + O_ + "]?", A_ = "(?:" + __ + "(?:" + [Zm, Jm, Qm].join("|") + ")" + ty + ey + ")*", E_ = ty + ey + A_, T_ = "(?:" + [Zm + Ks + "?", Ks, Jm, Qm, S_].join("|") + ")", $_ = RegExp(Xs + "(?=" + Xs + ")|" + T_ + E_, "g");
function C_(e) {
  return e.match($_) || [];
}
var M_ = C_, j_ = y_, N_ = Km, k_ = M_;
function I_(e) {
  return N_(e) ? k_(e) : j_(e);
}
var D_ = I_, R_ = o_, L_ = Km, F_ = D_, B_ = qm;
function z_(e) {
  return function(t) {
    t = B_(t);
    var r = L_(t) ? F_(t) : void 0, n = r ? r[0] : t.charAt(0), a = r ? R_(r, 1).join("") : t.slice(1);
    return n[e]() + a;
  };
}
var W_ = z_, U_ = W_, V_ = U_("toUpperCase"), q_ = V_;
const pc = /* @__PURE__ */ Pe(q_);
function Ce(e) {
  return function() {
    return e;
  };
}
const ry = Math.cos, ro = Math.sin, Tt = Math.sqrt, no = Math.PI, vc = 2 * no, Zs = Math.PI, Js = 2 * Zs, Mr = 1e-6, H_ = Js - Mr;
function ny(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function G_(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return ny;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let a = 1, i = n.length; a < i; ++a)
      this._ += Math.round(arguments[a] * r) / r + n[a];
  };
}
class Y_ {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? ny : G_(t);
  }
  moveTo(t, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, r) {
    this._append`L${this._x1 = +t},${this._y1 = +r}`;
  }
  quadraticCurveTo(t, r, n, a) {
    this._append`Q${+t},${+r},${this._x1 = +n},${this._y1 = +a}`;
  }
  bezierCurveTo(t, r, n, a, i, o) {
    this._append`C${+t},${+r},${+n},${+a},${this._x1 = +i},${this._y1 = +o}`;
  }
  arcTo(t, r, n, a, i) {
    if (t = +t, r = +r, n = +n, a = +a, i = +i, i < 0) throw new Error(`negative radius: ${i}`);
    let o = this._x1, c = this._y1, s = n - t, l = a - r, f = o - t, u = c - r, d = f * f + u * u;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (d > Mr) if (!(Math.abs(u * s - l * f) > Mr) || !i)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let h = n - o, m = a - c, v = s * s + l * l, p = h * h + m * m, b = Math.sqrt(v), g = Math.sqrt(d), O = i * Math.tan((Zs - Math.acos((v + d - p) / (2 * b * g))) / 2), S = O / g, y = O / b;
      Math.abs(S - 1) > Mr && this._append`L${t + S * f},${r + S * u}`, this._append`A${i},${i},0,0,${+(u * h > f * m)},${this._x1 = t + y * s},${this._y1 = r + y * l}`;
    }
  }
  arc(t, r, n, a, i, o) {
    if (t = +t, r = +r, n = +n, o = !!o, n < 0) throw new Error(`negative radius: ${n}`);
    let c = n * Math.cos(a), s = n * Math.sin(a), l = t + c, f = r + s, u = 1 ^ o, d = o ? a - i : i - a;
    this._x1 === null ? this._append`M${l},${f}` : (Math.abs(this._x1 - l) > Mr || Math.abs(this._y1 - f) > Mr) && this._append`L${l},${f}`, n && (d < 0 && (d = d % Js + Js), d > H_ ? this._append`A${n},${n},0,1,${u},${t - c},${r - s}A${n},${n},0,1,${u},${this._x1 = l},${this._y1 = f}` : d > Mr && this._append`A${n},${n},0,${+(d >= Zs)},${u},${this._x1 = t + n * Math.cos(i)},${this._y1 = r + n * Math.sin(i)}`);
  }
  rect(t, r, n, a) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+a}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function Ru(e) {
  let t = 3;
  return e.digits = function(r) {
    if (!arguments.length) return t;
    if (r == null)
      t = null;
    else {
      const n = Math.floor(r);
      if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
      t = n;
    }
    return e;
  }, () => new Y_(t);
}
function Lu(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function ay(e) {
  this._context = e;
}
ay.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function mc(e) {
  return new ay(e);
}
function iy(e) {
  return e[0];
}
function oy(e) {
  return e[1];
}
function cy(e, t) {
  var r = Ce(!0), n = null, a = mc, i = null, o = Ru(c);
  e = typeof e == "function" ? e : e === void 0 ? iy : Ce(e), t = typeof t == "function" ? t : t === void 0 ? oy : Ce(t);
  function c(s) {
    var l, f = (s = Lu(s)).length, u, d = !1, h;
    for (n == null && (i = a(h = o())), l = 0; l <= f; ++l)
      !(l < f && r(u = s[l], l, s)) === d && ((d = !d) ? i.lineStart() : i.lineEnd()), d && i.point(+e(u, l, s), +t(u, l, s));
    if (h) return i = null, h + "" || null;
  }
  return c.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : Ce(+s), c) : e;
  }, c.y = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : Ce(+s), c) : t;
  }, c.defined = function(s) {
    return arguments.length ? (r = typeof s == "function" ? s : Ce(!!s), c) : r;
  }, c.curve = function(s) {
    return arguments.length ? (a = s, n != null && (i = a(n)), c) : a;
  }, c.context = function(s) {
    return arguments.length ? (s == null ? n = i = null : i = a(n = s), c) : n;
  }, c;
}
function Ci(e, t, r) {
  var n = null, a = Ce(!0), i = null, o = mc, c = null, s = Ru(l);
  e = typeof e == "function" ? e : e === void 0 ? iy : Ce(+e), t = typeof t == "function" ? t : Ce(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? oy : Ce(+r);
  function l(u) {
    var d, h, m, v = (u = Lu(u)).length, p, b = !1, g, O = new Array(v), S = new Array(v);
    for (i == null && (c = o(g = s())), d = 0; d <= v; ++d) {
      if (!(d < v && a(p = u[d], d, u)) === b)
        if (b = !b)
          h = d, c.areaStart(), c.lineStart();
        else {
          for (c.lineEnd(), c.lineStart(), m = d - 1; m >= h; --m)
            c.point(O[m], S[m]);
          c.lineEnd(), c.areaEnd();
        }
      b && (O[d] = +e(p, d, u), S[d] = +t(p, d, u), c.point(n ? +n(p, d, u) : O[d], r ? +r(p, d, u) : S[d]));
    }
    if (g) return c = null, g + "" || null;
  }
  function f() {
    return cy().defined(a).curve(o).context(i);
  }
  return l.x = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : Ce(+u), n = null, l) : e;
  }, l.x0 = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : Ce(+u), l) : e;
  }, l.x1 = function(u) {
    return arguments.length ? (n = u == null ? null : typeof u == "function" ? u : Ce(+u), l) : n;
  }, l.y = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : Ce(+u), r = null, l) : t;
  }, l.y0 = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : Ce(+u), l) : t;
  }, l.y1 = function(u) {
    return arguments.length ? (r = u == null ? null : typeof u == "function" ? u : Ce(+u), l) : r;
  }, l.lineX0 = l.lineY0 = function() {
    return f().x(e).y(t);
  }, l.lineY1 = function() {
    return f().x(e).y(r);
  }, l.lineX1 = function() {
    return f().x(n).y(t);
  }, l.defined = function(u) {
    return arguments.length ? (a = typeof u == "function" ? u : Ce(!!u), l) : a;
  }, l.curve = function(u) {
    return arguments.length ? (o = u, i != null && (c = o(i)), l) : o;
  }, l.context = function(u) {
    return arguments.length ? (u == null ? i = c = null : c = o(i = u), l) : i;
  }, l;
}
class sy {
  constructor(t, r) {
    this._context = t, this._x = r;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(t, r) {
    switch (t = +t, r = +r, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
        break;
      }
      case 1:
        this._point = 2;
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, r, t, r) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + r) / 2, t, this._y0, t, r);
        break;
      }
    }
    this._x0 = t, this._y0 = r;
  }
}
function K_(e) {
  return new sy(e, !0);
}
function X_(e) {
  return new sy(e, !1);
}
const Fu = {
  draw(e, t) {
    const r = Tt(t / no);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, vc);
  }
}, Z_ = {
  draw(e, t) {
    const r = Tt(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, ly = Tt(1 / 3), J_ = ly * 2, Q_ = {
  draw(e, t) {
    const r = Tt(t / J_), n = r * ly;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, eA = {
  draw(e, t) {
    const r = Tt(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, tA = 0.8908130915292852, uy = ro(no / 10) / ro(7 * no / 10), rA = ro(vc / 10) * uy, nA = -ry(vc / 10) * uy, aA = {
  draw(e, t) {
    const r = Tt(t * tA), n = rA * r, a = nA * r;
    e.moveTo(0, -r), e.lineTo(n, a);
    for (let i = 1; i < 5; ++i) {
      const o = vc * i / 5, c = ry(o), s = ro(o);
      e.lineTo(s * r, -c * r), e.lineTo(c * n - s * a, s * n + c * a);
    }
    e.closePath();
  }
}, os = Tt(3), iA = {
  draw(e, t) {
    const r = -Tt(t / (os * 3));
    e.moveTo(0, r * 2), e.lineTo(-os * r, -r), e.lineTo(os * r, -r), e.closePath();
  }
}, ft = -0.5, dt = Tt(3) / 2, Qs = 1 / Tt(12), oA = (Qs / 2 + 1) * 3, cA = {
  draw(e, t) {
    const r = Tt(t / oA), n = r / 2, a = r * Qs, i = n, o = r * Qs + r, c = -i, s = o;
    e.moveTo(n, a), e.lineTo(i, o), e.lineTo(c, s), e.lineTo(ft * n - dt * a, dt * n + ft * a), e.lineTo(ft * i - dt * o, dt * i + ft * o), e.lineTo(ft * c - dt * s, dt * c + ft * s), e.lineTo(ft * n + dt * a, ft * a - dt * n), e.lineTo(ft * i + dt * o, ft * o - dt * i), e.lineTo(ft * c + dt * s, ft * s - dt * c), e.closePath();
  }
};
function sA(e, t) {
  let r = null, n = Ru(a);
  e = typeof e == "function" ? e : Ce(e || Fu), t = typeof t == "function" ? t : Ce(t === void 0 ? 64 : +t);
  function a() {
    let i;
    if (r || (r = i = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), i) return r = null, i + "" || null;
  }
  return a.type = function(i) {
    return arguments.length ? (e = typeof i == "function" ? i : Ce(i), a) : e;
  }, a.size = function(i) {
    return arguments.length ? (t = typeof i == "function" ? i : Ce(+i), a) : t;
  }, a.context = function(i) {
    return arguments.length ? (r = i ?? null, a) : r;
  }, a;
}
function ao() {
}
function io(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function fy(e) {
  this._context = e;
}
fy.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        io(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        io(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function lA(e) {
  return new fy(e);
}
function dy(e) {
  this._context = e;
}
dy.prototype = {
  areaStart: ao,
  areaEnd: ao,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x2 = e, this._y2 = t;
        break;
      case 1:
        this._point = 2, this._x3 = e, this._y3 = t;
        break;
      case 2:
        this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        io(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function uA(e) {
  return new dy(e);
}
function hy(e) {
  this._context = e;
}
hy.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var r = (this._x0 + 4 * this._x1 + e) / 6, n = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
        break;
      case 3:
        this._point = 4;
      default:
        io(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function fA(e) {
  return new hy(e);
}
function py(e) {
  this._context = e;
}
py.prototype = {
  areaStart: ao,
  areaEnd: ao,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._point && this._context.closePath();
  },
  point: function(e, t) {
    e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
  }
};
function dA(e) {
  return new py(e);
}
function md(e) {
  return e < 0 ? -1 : 1;
}
function yd(e, t, r) {
  var n = e._x1 - e._x0, a = t - e._x1, i = (e._y1 - e._y0) / (n || a < 0 && -0), o = (r - e._y1) / (a || n < 0 && -0), c = (i * a + o * n) / (n + a);
  return (md(i) + md(o)) * Math.min(Math.abs(i), Math.abs(o), 0.5 * Math.abs(c)) || 0;
}
function gd(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function cs(e, t, r) {
  var n = e._x0, a = e._y0, i = e._x1, o = e._y1, c = (i - n) / 3;
  e._context.bezierCurveTo(n + c, a + c * t, i - c, o - c * r, i, o);
}
function oo(e) {
  this._context = e;
}
oo.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        cs(this, this._t0, gd(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    var r = NaN;
    if (e = +e, t = +t, !(e === this._x1 && t === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, cs(this, gd(this, r = yd(this, e, t)), r);
          break;
        default:
          cs(this, this._t0, r = yd(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function vy(e) {
  this._context = new my(e);
}
(vy.prototype = Object.create(oo.prototype)).point = function(e, t) {
  oo.prototype.point.call(this, t, e);
};
function my(e) {
  this._context = e;
}
my.prototype = {
  moveTo: function(e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function(e, t, r, n, a, i) {
    this._context.bezierCurveTo(t, e, n, r, i, a);
  }
};
function hA(e) {
  return new oo(e);
}
function pA(e) {
  return new vy(e);
}
function yy(e) {
  this._context = e;
}
yy.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var e = this._x, t = this._y, r = e.length;
    if (r)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), r === 2)
        this._context.lineTo(e[1], t[1]);
      else
        for (var n = bd(e), a = bd(t), i = 0, o = 1; o < r; ++i, ++o)
          this._context.bezierCurveTo(n[0][i], a[0][i], n[1][i], a[1][i], e[o], t[o]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function bd(e) {
  var t, r = e.length - 1, n, a = new Array(r), i = new Array(r), o = new Array(r);
  for (a[0] = 0, i[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) a[t] = 1, i[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
  for (a[r - 1] = 2, i[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = a[t] / i[t - 1], i[t] -= n, o[t] -= n * o[t - 1];
  for (a[r - 1] = o[r - 1] / i[r - 1], t = r - 2; t >= 0; --t) a[t] = (o[t] - a[t + 1]) / i[t];
  for (i[r - 1] = (e[r] + a[r - 1]) / 2, t = 0; t < r - 1; ++t) i[t] = 2 * e[t + 1] - a[t + 1];
  return [a, i];
}
function vA(e) {
  return new yy(e);
}
function yc(e, t) {
  this._context = e, this._t = t;
}
yc.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var r = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(r, this._y), this._context.lineTo(r, t);
        }
        break;
      }
    }
    this._x = e, this._y = t;
  }
};
function mA(e) {
  return new yc(e, 0.5);
}
function yA(e) {
  return new yc(e, 0);
}
function gA(e) {
  return new yc(e, 1);
}
function On(e, t) {
  if ((o = e.length) > 1)
    for (var r = 1, n, a, i = e[t[0]], o, c = i.length; r < o; ++r)
      for (a = i, i = e[t[r]], n = 0; n < c; ++n)
        i[n][1] += i[n][0] = isNaN(a[n][1]) ? a[n][0] : a[n][1];
}
function el(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function bA(e, t) {
  return e[t];
}
function wA(e) {
  const t = [];
  return t.key = e, t;
}
function xA() {
  var e = Ce([]), t = el, r = On, n = bA;
  function a(i) {
    var o = Array.from(e.apply(this, arguments), wA), c, s = o.length, l = -1, f;
    for (const u of i)
      for (c = 0, ++l; c < s; ++c)
        (o[c][l] = [0, +n(u, o[c].key, l, i)]).data = u;
    for (c = 0, f = Lu(t(o)); c < s; ++c)
      o[f[c]].index = c;
    return r(o, f), o;
  }
  return a.keys = function(i) {
    return arguments.length ? (e = typeof i == "function" ? i : Ce(Array.from(i)), a) : e;
  }, a.value = function(i) {
    return arguments.length ? (n = typeof i == "function" ? i : Ce(+i), a) : n;
  }, a.order = function(i) {
    return arguments.length ? (t = i == null ? el : typeof i == "function" ? i : Ce(Array.from(i)), a) : t;
  }, a.offset = function(i) {
    return arguments.length ? (r = i ?? On, a) : r;
  }, a;
}
function OA(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, a = 0, i = e[0].length, o; a < i; ++a) {
      for (o = r = 0; r < n; ++r) o += e[r][a][1] || 0;
      if (o) for (r = 0; r < n; ++r) e[r][a][1] /= o;
    }
    On(e, t);
  }
}
function SA(e, t) {
  if ((a = e.length) > 0) {
    for (var r = 0, n = e[t[0]], a, i = n.length; r < i; ++r) {
      for (var o = 0, c = 0; o < a; ++o) c += e[o][r][1] || 0;
      n[r][1] += n[r][0] = -c / 2;
    }
    On(e, t);
  }
}
function PA(e, t) {
  if (!(!((o = e.length) > 0) || !((i = (a = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, a, i, o; n < i; ++n) {
      for (var c = 0, s = 0, l = 0; c < o; ++c) {
        for (var f = e[t[c]], u = f[n][1] || 0, d = f[n - 1][1] || 0, h = (u - d) / 2, m = 0; m < c; ++m) {
          var v = e[t[m]], p = v[n][1] || 0, b = v[n - 1][1] || 0;
          h += p - b;
        }
        s += u, l += h * u;
      }
      a[n - 1][1] += a[n - 1][0] = r, s && (r -= l / s);
    }
    a[n - 1][1] += a[n - 1][0] = r, On(e, t);
  }
}
function ka(e) {
  "@babel/helpers - typeof";
  return ka = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ka(e);
}
var _A = ["type", "size", "sizeType"];
function tl() {
  return tl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, tl.apply(this, arguments);
}
function wd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wd(Object(r), !0).forEach(function(n) {
      AA(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function AA(e, t, r) {
  return t = EA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function EA(e) {
  var t = TA(e, "string");
  return ka(t) == "symbol" ? t : t + "";
}
function TA(e, t) {
  if (ka(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ka(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function $A(e, t) {
  if (e == null) return {};
  var r = CA(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function CA(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var gy = {
  symbolCircle: Fu,
  symbolCross: Z_,
  symbolDiamond: Q_,
  symbolSquare: eA,
  symbolStar: aA,
  symbolTriangle: iA,
  symbolWye: cA
}, MA = Math.PI / 180, jA = function(t) {
  var r = "symbol".concat(pc(t));
  return gy[r] || Fu;
}, NA = function(t, r, n) {
  if (r === "area")
    return t;
  switch (n) {
    case "cross":
      return 5 * t * t / 9;
    case "diamond":
      return 0.5 * t * t / Math.sqrt(3);
    case "square":
      return t * t;
    case "star": {
      var a = 18 * MA;
      return 1.25 * t * t * (Math.tan(a) - Math.tan(a * 2) * Math.pow(Math.tan(a), 2));
    }
    case "triangle":
      return Math.sqrt(3) * t * t / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * t * t / 8;
    default:
      return Math.PI * t * t / 4;
  }
}, kA = function(t, r) {
  gy["symbol".concat(pc(t))] = r;
}, Bu = function(t) {
  var r = t.type, n = r === void 0 ? "circle" : r, a = t.size, i = a === void 0 ? 64 : a, o = t.sizeType, c = o === void 0 ? "area" : o, s = $A(t, _A), l = xd(xd({}, s), {}, {
    type: n,
    size: i,
    sizeType: c
  }), f = function() {
    var p = jA(n), b = sA().type(p).size(NA(i, c, n));
    return b();
  }, u = l.className, d = l.cx, h = l.cy, m = te(l, !0);
  return d === +d && h === +h && i === +i ? /* @__PURE__ */ T.createElement("path", tl({}, m, {
    className: le("recharts-symbols", u),
    transform: "translate(".concat(d, ", ").concat(h, ")"),
    d: f()
  })) : null;
};
Bu.registerSymbol = kA;
function Sn(e) {
  "@babel/helpers - typeof";
  return Sn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Sn(e);
}
function rl() {
  return rl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, rl.apply(this, arguments);
}
function Od(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function IA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Od(Object(r), !0).forEach(function(n) {
      Ia(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Od(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function DA(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function RA(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, wy(n.key), n);
  }
}
function LA(e, t, r) {
  return t && RA(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function FA(e, t, r) {
  return t = co(t), BA(e, by() ? Reflect.construct(t, r || [], co(e).constructor) : t.apply(e, r));
}
function BA(e, t) {
  if (t && (Sn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return zA(e);
}
function zA(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function by() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (by = function() {
    return !!e;
  })();
}
function co(e) {
  return co = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, co(e);
}
function WA(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && nl(e, t);
}
function nl(e, t) {
  return nl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, nl(e, t);
}
function Ia(e, t, r) {
  return t = wy(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wy(e) {
  var t = UA(e, "string");
  return Sn(t) == "symbol" ? t : t + "";
}
function UA(e, t) {
  if (Sn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Sn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var ht = 32, zu = /* @__PURE__ */ function(e) {
  function t() {
    return DA(this, t), FA(this, t, arguments);
  }
  return WA(t, e), LA(t, [{
    key: "renderIcon",
    value: (
      /**
       * Render the path of icon
       * @param {Object} data Data of each legend item
       * @return {String} Path element
       */
      function(n) {
        var a = this.props.inactiveColor, i = ht / 2, o = ht / 6, c = ht / 3, s = n.inactive ? a : n.color;
        if (n.type === "plainline")
          return /* @__PURE__ */ T.createElement("line", {
            strokeWidth: 4,
            fill: "none",
            stroke: s,
            strokeDasharray: n.payload.strokeDasharray,
            x1: 0,
            y1: i,
            x2: ht,
            y2: i,
            className: "recharts-legend-icon"
          });
        if (n.type === "line")
          return /* @__PURE__ */ T.createElement("path", {
            strokeWidth: 4,
            fill: "none",
            stroke: s,
            d: "M0,".concat(i, "h").concat(c, `
            A`).concat(o, ",").concat(o, ",0,1,1,").concat(2 * c, ",").concat(i, `
            H`).concat(ht, "M").concat(2 * c, ",").concat(i, `
            A`).concat(o, ",").concat(o, ",0,1,1,").concat(c, ",").concat(i),
            className: "recharts-legend-icon"
          });
        if (n.type === "rect")
          return /* @__PURE__ */ T.createElement("path", {
            stroke: "none",
            fill: s,
            d: "M0,".concat(ht / 8, "h").concat(ht, "v").concat(ht * 3 / 4, "h").concat(-ht, "z"),
            className: "recharts-legend-icon"
          });
        if (/* @__PURE__ */ T.isValidElement(n.legendIcon)) {
          var l = IA({}, n);
          return delete l.legendIcon, /* @__PURE__ */ T.cloneElement(n.legendIcon, l);
        }
        return /* @__PURE__ */ T.createElement(Bu, {
          fill: s,
          cx: i,
          cy: i,
          size: ht,
          sizeType: "diameter",
          type: n.type
        });
      }
    )
    /**
     * Draw items of legend
     * @return {ReactElement} Items
     */
  }, {
    key: "renderItems",
    value: function() {
      var n = this, a = this.props, i = a.payload, o = a.iconSize, c = a.layout, s = a.formatter, l = a.inactiveColor, f = {
        x: 0,
        y: 0,
        width: ht,
        height: ht
      }, u = {
        display: c === "horizontal" ? "inline-block" : "block",
        marginRight: 10
      }, d = {
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: 4
      };
      return i.map(function(h, m) {
        var v = h.formatter || s, p = le(Ia(Ia({
          "recharts-legend-item": !0
        }, "legend-item-".concat(m), !0), "inactive", h.inactive));
        if (h.type === "none")
          return null;
        var b = ie(h.value) ? null : h.value;
        _t(
          !ie(h.value),
          `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`
          // eslint-disable-line max-len
        );
        var g = h.inactive ? l : h.color;
        return /* @__PURE__ */ T.createElement("li", rl({
          className: p,
          style: u,
          key: "legend-item-".concat(m)
        }, qr(n.props, h, m)), /* @__PURE__ */ T.createElement(Gs, {
          width: o,
          height: o,
          viewBox: f,
          style: d
        }, n.renderIcon(h)), /* @__PURE__ */ T.createElement("span", {
          className: "recharts-legend-item-text",
          style: {
            color: g
          }
        }, v ? v(b, h, m) : b));
      });
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.payload, i = n.layout, o = n.align;
      if (!a || !a.length)
        return null;
      var c = {
        padding: 0,
        margin: 0,
        textAlign: i === "horizontal" ? o : "left"
      };
      return /* @__PURE__ */ T.createElement("ul", {
        className: "recharts-default-legend",
        style: c
      }, this.renderItems());
    }
  }]);
}(Et);
Ia(zu, "displayName", "Legend");
Ia(zu, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var VA = fc;
function qA() {
  this.__data__ = new VA(), this.size = 0;
}
var HA = qA;
function GA(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var YA = GA;
function KA(e) {
  return this.__data__.get(e);
}
var XA = KA;
function ZA(e) {
  return this.__data__.has(e);
}
var JA = ZA, QA = fc, eE = Cu, tE = Mu, rE = 200;
function nE(e, t) {
  var r = this.__data__;
  if (r instanceof QA) {
    var n = r.__data__;
    if (!eE || n.length < rE - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new tE(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var aE = nE, iE = fc, oE = HA, cE = YA, sE = XA, lE = JA, uE = aE;
function aa(e) {
  var t = this.__data__ = new iE(e);
  this.size = t.size;
}
aa.prototype.clear = oE;
aa.prototype.delete = cE;
aa.prototype.get = sE;
aa.prototype.has = lE;
aa.prototype.set = uE;
var xy = aa, fE = "__lodash_hash_undefined__";
function dE(e) {
  return this.__data__.set(e, fE), this;
}
var hE = dE;
function pE(e) {
  return this.__data__.has(e);
}
var vE = pE, mE = Mu, yE = hE, gE = vE;
function so(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new mE(); ++t < r; )
    this.add(e[t]);
}
so.prototype.add = so.prototype.push = yE;
so.prototype.has = gE;
var Oy = so;
function bE(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
var Sy = bE;
function wE(e, t) {
  return e.has(t);
}
var Py = wE, xE = Oy, OE = Sy, SE = Py, PE = 1, _E = 2;
function AE(e, t, r, n, a, i) {
  var o = r & PE, c = e.length, s = t.length;
  if (c != s && !(o && s > c))
    return !1;
  var l = i.get(e), f = i.get(t);
  if (l && f)
    return l == t && f == e;
  var u = -1, d = !0, h = r & _E ? new xE() : void 0;
  for (i.set(e, t), i.set(t, e); ++u < c; ) {
    var m = e[u], v = t[u];
    if (n)
      var p = o ? n(v, m, u, t, e, i) : n(m, v, u, e, t, i);
    if (p !== void 0) {
      if (p)
        continue;
      d = !1;
      break;
    }
    if (h) {
      if (!OE(t, function(b, g) {
        if (!SE(h, g) && (m === b || a(m, b, r, n, i)))
          return h.push(g);
      })) {
        d = !1;
        break;
      }
    } else if (!(m === v || a(m, v, r, n, i))) {
      d = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), d;
}
var _y = AE, EE = zt, TE = EE.Uint8Array, $E = TE;
function CE(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, a) {
    r[++t] = [a, n];
  }), r;
}
var ME = CE;
function jE(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var Wu = jE, Sd = bi, Pd = $E, NE = $u, kE = _y, IE = ME, DE = Wu, RE = 1, LE = 2, FE = "[object Boolean]", BE = "[object Date]", zE = "[object Error]", WE = "[object Map]", UE = "[object Number]", VE = "[object RegExp]", qE = "[object Set]", HE = "[object String]", GE = "[object Symbol]", YE = "[object ArrayBuffer]", KE = "[object DataView]", _d = Sd ? Sd.prototype : void 0, ss = _d ? _d.valueOf : void 0;
function XE(e, t, r, n, a, i, o) {
  switch (r) {
    case KE:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case YE:
      return !(e.byteLength != t.byteLength || !i(new Pd(e), new Pd(t)));
    case FE:
    case BE:
    case UE:
      return NE(+e, +t);
    case zE:
      return e.name == t.name && e.message == t.message;
    case VE:
    case HE:
      return e == t + "";
    case WE:
      var c = IE;
    case qE:
      var s = n & RE;
      if (c || (c = DE), e.size != t.size && !s)
        return !1;
      var l = o.get(e);
      if (l)
        return l == t;
      n |= LE, o.set(e, t);
      var f = kE(c(e), c(t), n, a, i, o);
      return o.delete(e), f;
    case GE:
      if (ss)
        return ss.call(e) == ss.call(t);
  }
  return !1;
}
var ZE = XE;
function JE(e, t) {
  for (var r = -1, n = t.length, a = e.length; ++r < n; )
    e[a + r] = t[r];
  return e;
}
var Ay = JE, QE = Ay, eT = it;
function tT(e, t, r) {
  var n = t(e);
  return eT(e) ? n : QE(n, r(e));
}
var rT = tT;
function nT(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = 0, i = []; ++r < n; ) {
    var o = e[r];
    t(o, r, e) && (i[a++] = o);
  }
  return i;
}
var aT = nT;
function iT() {
  return [];
}
var oT = iT, cT = aT, sT = oT, lT = Object.prototype, uT = lT.propertyIsEnumerable, Ad = Object.getOwnPropertySymbols, fT = Ad ? function(e) {
  return e == null ? [] : (e = Object(e), cT(Ad(e), function(t) {
    return uT.call(e, t);
  }));
} : sT, dT = fT;
function hT(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var pT = hT, vT = ar, mT = ir, yT = "[object Arguments]";
function gT(e) {
  return mT(e) && vT(e) == yT;
}
var bT = gT, Ed = bT, wT = ir, Ey = Object.prototype, xT = Ey.hasOwnProperty, OT = Ey.propertyIsEnumerable, ST = Ed(/* @__PURE__ */ function() {
  return arguments;
}()) ? Ed : function(e) {
  return wT(e) && xT.call(e, "callee") && !OT.call(e, "callee");
}, Uu = ST, lo = { exports: {} };
function PT() {
  return !1;
}
var _T = PT;
lo.exports;
(function(e, t) {
  var r = zt, n = _T, a = t && !t.nodeType && t, i = a && !0 && e && !e.nodeType && e, o = i && i.exports === a, c = o ? r.Buffer : void 0, s = c ? c.isBuffer : void 0, l = s || n;
  e.exports = l;
})(lo, lo.exports);
var Ty = lo.exports, AT = 9007199254740991, ET = /^(?:0|[1-9]\d*)$/;
function TT(e, t) {
  var r = typeof e;
  return t = t ?? AT, !!t && (r == "number" || r != "symbol" && ET.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Vu = TT, $T = 9007199254740991;
function CT(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= $T;
}
var qu = CT, MT = ar, jT = qu, NT = ir, kT = "[object Arguments]", IT = "[object Array]", DT = "[object Boolean]", RT = "[object Date]", LT = "[object Error]", FT = "[object Function]", BT = "[object Map]", zT = "[object Number]", WT = "[object Object]", UT = "[object RegExp]", VT = "[object Set]", qT = "[object String]", HT = "[object WeakMap]", GT = "[object ArrayBuffer]", YT = "[object DataView]", KT = "[object Float32Array]", XT = "[object Float64Array]", ZT = "[object Int8Array]", JT = "[object Int16Array]", QT = "[object Int32Array]", e$ = "[object Uint8Array]", t$ = "[object Uint8ClampedArray]", r$ = "[object Uint16Array]", n$ = "[object Uint32Array]", je = {};
je[KT] = je[XT] = je[ZT] = je[JT] = je[QT] = je[e$] = je[t$] = je[r$] = je[n$] = !0;
je[kT] = je[IT] = je[GT] = je[DT] = je[YT] = je[RT] = je[LT] = je[FT] = je[BT] = je[zT] = je[WT] = je[UT] = je[VT] = je[qT] = je[HT] = !1;
function a$(e) {
  return NT(e) && jT(e.length) && !!je[MT(e)];
}
var i$ = a$;
function o$(e) {
  return function(t) {
    return e(t);
  };
}
var $y = o$, uo = { exports: {} };
uo.exports;
(function(e, t) {
  var r = Fm, n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, i = a && a.exports === n, o = i && r.process, c = function() {
    try {
      var s = a && a.require && a.require("util").types;
      return s || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  e.exports = c;
})(uo, uo.exports);
var c$ = uo.exports, s$ = i$, l$ = $y, Td = c$, $d = Td && Td.isTypedArray, u$ = $d ? l$($d) : s$, Cy = u$, f$ = pT, d$ = Uu, h$ = it, p$ = Ty, v$ = Vu, m$ = Cy, y$ = Object.prototype, g$ = y$.hasOwnProperty;
function b$(e, t) {
  var r = h$(e), n = !r && d$(e), a = !r && !n && p$(e), i = !r && !n && !a && m$(e), o = r || n || a || i, c = o ? f$(e.length, String) : [], s = c.length;
  for (var l in e)
    (t || g$.call(e, l)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (l == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (l == "offset" || l == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (l == "buffer" || l == "byteLength" || l == "byteOffset") || // Skip index properties.
    v$(l, s))) && c.push(l);
  return c;
}
var w$ = b$, x$ = Object.prototype;
function O$(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || x$;
  return e === r;
}
var S$ = O$;
function P$(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var My = P$, _$ = My, A$ = _$(Object.keys, Object), E$ = A$, T$ = S$, $$ = E$, C$ = Object.prototype, M$ = C$.hasOwnProperty;
function j$(e) {
  if (!T$(e))
    return $$(e);
  var t = [];
  for (var r in Object(e))
    M$.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var N$ = j$, k$ = Tu, I$ = qu;
function D$(e) {
  return e != null && I$(e.length) && !k$(e);
}
var wi = D$, R$ = w$, L$ = N$, F$ = wi;
function B$(e) {
  return F$(e) ? R$(e) : L$(e);
}
var gc = B$, z$ = rT, W$ = dT, U$ = gc;
function V$(e) {
  return z$(e, U$, W$);
}
var q$ = V$, Cd = q$, H$ = 1, G$ = Object.prototype, Y$ = G$.hasOwnProperty;
function K$(e, t, r, n, a, i) {
  var o = r & H$, c = Cd(e), s = c.length, l = Cd(t), f = l.length;
  if (s != f && !o)
    return !1;
  for (var u = s; u--; ) {
    var d = c[u];
    if (!(o ? d in t : Y$.call(t, d)))
      return !1;
  }
  var h = i.get(e), m = i.get(t);
  if (h && m)
    return h == t && m == e;
  var v = !0;
  i.set(e, t), i.set(t, e);
  for (var p = o; ++u < s; ) {
    d = c[u];
    var b = e[d], g = t[d];
    if (n)
      var O = o ? n(g, b, d, t, e, i) : n(b, g, d, e, t, i);
    if (!(O === void 0 ? b === g || a(b, g, r, n, i) : O)) {
      v = !1;
      break;
    }
    p || (p = d == "constructor");
  }
  if (v && !p) {
    var S = e.constructor, y = t.constructor;
    S != y && "constructor" in e && "constructor" in t && !(typeof S == "function" && S instanceof S && typeof y == "function" && y instanceof y) && (v = !1);
  }
  return i.delete(e), i.delete(t), v;
}
var X$ = K$, Z$ = Zr, J$ = zt, Q$ = Z$(J$, "DataView"), e2 = Q$, t2 = Zr, r2 = zt, n2 = t2(r2, "Promise"), a2 = n2, i2 = Zr, o2 = zt, c2 = i2(o2, "Set"), jy = c2, s2 = Zr, l2 = zt, u2 = s2(l2, "WeakMap"), f2 = u2, al = e2, il = Cu, ol = a2, cl = jy, sl = f2, Ny = ar, ia = zm, Md = "[object Map]", d2 = "[object Object]", jd = "[object Promise]", Nd = "[object Set]", kd = "[object WeakMap]", Id = "[object DataView]", h2 = ia(al), p2 = ia(il), v2 = ia(ol), m2 = ia(cl), y2 = ia(sl), jr = Ny;
(al && jr(new al(new ArrayBuffer(1))) != Id || il && jr(new il()) != Md || ol && jr(ol.resolve()) != jd || cl && jr(new cl()) != Nd || sl && jr(new sl()) != kd) && (jr = function(e) {
  var t = Ny(e), r = t == d2 ? e.constructor : void 0, n = r ? ia(r) : "";
  if (n)
    switch (n) {
      case h2:
        return Id;
      case p2:
        return Md;
      case v2:
        return jd;
      case m2:
        return Nd;
      case y2:
        return kd;
    }
  return t;
});
var g2 = jr, ls = xy, b2 = _y, w2 = ZE, x2 = X$, Dd = g2, Rd = it, Ld = Ty, O2 = Cy, S2 = 1, Fd = "[object Arguments]", Bd = "[object Array]", Mi = "[object Object]", P2 = Object.prototype, zd = P2.hasOwnProperty;
function _2(e, t, r, n, a, i) {
  var o = Rd(e), c = Rd(t), s = o ? Bd : Dd(e), l = c ? Bd : Dd(t);
  s = s == Fd ? Mi : s, l = l == Fd ? Mi : l;
  var f = s == Mi, u = l == Mi, d = s == l;
  if (d && Ld(e)) {
    if (!Ld(t))
      return !1;
    o = !0, f = !1;
  }
  if (d && !f)
    return i || (i = new ls()), o || O2(e) ? b2(e, t, r, n, a, i) : w2(e, t, s, r, n, a, i);
  if (!(r & S2)) {
    var h = f && zd.call(e, "__wrapped__"), m = u && zd.call(t, "__wrapped__");
    if (h || m) {
      var v = h ? e.value() : e, p = m ? t.value() : t;
      return i || (i = new ls()), a(v, p, r, n, i);
    }
  }
  return d ? (i || (i = new ls()), x2(e, t, r, n, a, i)) : !1;
}
var A2 = _2, E2 = A2, Wd = ir;
function ky(e, t, r, n, a) {
  return e === t ? !0 : e == null || t == null || !Wd(e) && !Wd(t) ? e !== e && t !== t : E2(e, t, r, n, ky, a);
}
var Hu = ky, T2 = xy, $2 = Hu, C2 = 1, M2 = 2;
function j2(e, t, r, n) {
  var a = r.length, i = a, o = !n;
  if (e == null)
    return !i;
  for (e = Object(e); a--; ) {
    var c = r[a];
    if (o && c[2] ? c[1] !== e[c[0]] : !(c[0] in e))
      return !1;
  }
  for (; ++a < i; ) {
    c = r[a];
    var s = c[0], l = e[s], f = c[1];
    if (o && c[2]) {
      if (l === void 0 && !(s in e))
        return !1;
    } else {
      var u = new T2();
      if (n)
        var d = n(l, f, s, e, t, u);
      if (!(d === void 0 ? $2(f, l, C2 | M2, n, u) : d))
        return !1;
    }
  }
  return !0;
}
var N2 = j2, k2 = Or;
function I2(e) {
  return e === e && !k2(e);
}
var Iy = I2, D2 = Iy, R2 = gc;
function L2(e) {
  for (var t = R2(e), r = t.length; r--; ) {
    var n = t[r], a = e[n];
    t[r] = [n, a, D2(a)];
  }
  return t;
}
var F2 = L2;
function B2(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
var Dy = B2, z2 = N2, W2 = F2, U2 = Dy;
function V2(e) {
  var t = W2(e);
  return t.length == 1 && t[0][2] ? U2(t[0][0], t[0][1]) : function(r) {
    return r === e || z2(r, e, t);
  };
}
var q2 = V2;
function H2(e, t) {
  return e != null && t in Object(e);
}
var G2 = H2, Y2 = Hm, K2 = Uu, X2 = it, Z2 = Vu, J2 = qu, Q2 = hc;
function eC(e, t, r) {
  t = Y2(t, e);
  for (var n = -1, a = t.length, i = !1; ++n < a; ) {
    var o = Q2(t[n]);
    if (!(i = e != null && r(e, o)))
      break;
    e = e[o];
  }
  return i || ++n != a ? i : (a = e == null ? 0 : e.length, !!a && J2(a) && Z2(o, a) && (X2(e) || K2(e)));
}
var tC = eC, rC = G2, nC = tC;
function aC(e, t) {
  return e != null && nC(e, t, rC);
}
var iC = aC, oC = Hu, cC = Gm, sC = iC, lC = Eu, uC = Iy, fC = Dy, dC = hc, hC = 1, pC = 2;
function vC(e, t) {
  return lC(e) && uC(t) ? fC(dC(e), t) : function(r) {
    var n = cC(r, e);
    return n === void 0 && n === t ? sC(r, e) : oC(t, n, hC | pC);
  };
}
var mC = vC;
function yC(e) {
  return e;
}
var oa = yC;
function gC(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
var bC = gC, wC = ku;
function xC(e) {
  return function(t) {
    return wC(t, e);
  };
}
var OC = xC, SC = bC, PC = OC, _C = Eu, AC = hc;
function EC(e) {
  return _C(e) ? SC(AC(e)) : PC(e);
}
var TC = EC, $C = q2, CC = mC, MC = oa, jC = it, NC = TC;
function kC(e) {
  return typeof e == "function" ? e : e == null ? MC : typeof e == "object" ? jC(e) ? CC(e[0], e[1]) : $C(e) : NC(e);
}
var Wt = kC;
function IC(e, t, r, n) {
  for (var a = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < a; )
    if (t(e[i], i, e))
      return i;
  return -1;
}
var Ry = IC;
function DC(e) {
  return e !== e;
}
var RC = DC;
function LC(e, t, r) {
  for (var n = r - 1, a = e.length; ++n < a; )
    if (e[n] === t)
      return n;
  return -1;
}
var FC = LC, BC = Ry, zC = RC, WC = FC;
function UC(e, t, r) {
  return t === t ? WC(e, t, r) : BC(e, zC, r);
}
var VC = UC, qC = VC;
function HC(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && qC(e, t, 0) > -1;
}
var GC = HC;
function YC(e, t, r) {
  for (var n = -1, a = e == null ? 0 : e.length; ++n < a; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
var KC = YC;
function XC() {
}
var ZC = XC, us = jy, JC = ZC, QC = Wu, eM = 1 / 0, tM = us && 1 / QC(new us([, -0]))[1] == eM ? function(e) {
  return new us(e);
} : JC, rM = tM, nM = Oy, aM = GC, iM = KC, oM = Py, cM = rM, sM = Wu, lM = 200;
function uM(e, t, r) {
  var n = -1, a = aM, i = e.length, o = !0, c = [], s = c;
  if (r)
    o = !1, a = iM;
  else if (i >= lM) {
    var l = t ? null : cM(e);
    if (l)
      return sM(l);
    o = !1, a = oM, s = new nM();
  } else
    s = t ? [] : c;
  e:
    for (; ++n < i; ) {
      var f = e[n], u = t ? t(f) : f;
      if (f = r || f !== 0 ? f : 0, o && u === u) {
        for (var d = s.length; d--; )
          if (s[d] === u)
            continue e;
        t && s.push(u), c.push(f);
      } else a(s, u, r) || (s !== c && s.push(u), c.push(f));
    }
  return c;
}
var fM = uM, dM = Wt, hM = fM;
function pM(e, t) {
  return e && e.length ? hM(e, dM(t)) : [];
}
var vM = pM;
const Ud = /* @__PURE__ */ Pe(vM);
function Ly(e, t, r) {
  return t === !0 ? Ud(e, r) : ie(t) ? Ud(e, t) : e;
}
function Pn(e) {
  "@babel/helpers - typeof";
  return Pn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Pn(e);
}
var mM = ["ref"];
function Vd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Vt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Vd(Object(r), !0).forEach(function(n) {
      bc(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Vd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function yM(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function qd(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, By(n.key), n);
  }
}
function gM(e, t, r) {
  return t && qd(e.prototype, t), r && qd(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function bM(e, t, r) {
  return t = fo(t), wM(e, Fy() ? Reflect.construct(t, r || [], fo(e).constructor) : t.apply(e, r));
}
function wM(e, t) {
  if (t && (Pn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return xM(e);
}
function xM(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Fy() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Fy = function() {
    return !!e;
  })();
}
function fo(e) {
  return fo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, fo(e);
}
function OM(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ll(e, t);
}
function ll(e, t) {
  return ll = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ll(e, t);
}
function bc(e, t, r) {
  return t = By(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function By(e) {
  var t = SM(e, "string");
  return Pn(t) == "symbol" ? t : t + "";
}
function SM(e, t) {
  if (Pn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Pn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function PM(e, t) {
  if (e == null) return {};
  var r = _M(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function _M(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function AM(e) {
  return e.value;
}
function EM(e, t) {
  if (/* @__PURE__ */ T.isValidElement(e))
    return /* @__PURE__ */ T.cloneElement(e, t);
  if (typeof e == "function")
    return /* @__PURE__ */ T.createElement(e, t);
  t.ref;
  var r = PM(t, mM);
  return /* @__PURE__ */ T.createElement(zu, r);
}
var Hd = 1, mn = /* @__PURE__ */ function(e) {
  function t() {
    var r;
    yM(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = bM(this, t, [].concat(a)), bc(r, "lastBoundingBox", {
      width: -1,
      height: -1
    }), r;
  }
  return OM(t, e), gM(t, [{
    key: "componentDidMount",
    value: function() {
      this.updateBBox();
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      this.updateBBox();
    }
  }, {
    key: "getBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var n = this.wrapperNode.getBoundingClientRect();
        return n.height = this.wrapperNode.offsetHeight, n.width = this.wrapperNode.offsetWidth, n;
      }
      return null;
    }
  }, {
    key: "updateBBox",
    value: function() {
      var n = this.props.onBBoxUpdate, a = this.getBBox();
      a ? (Math.abs(a.width - this.lastBoundingBox.width) > Hd || Math.abs(a.height - this.lastBoundingBox.height) > Hd) && (this.lastBoundingBox.width = a.width, this.lastBoundingBox.height = a.height, n && n(a)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, n && n(null));
    }
  }, {
    key: "getBBoxSnapshot",
    value: function() {
      return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? Vt({}, this.lastBoundingBox) : {
        width: 0,
        height: 0
      };
    }
  }, {
    key: "getDefaultPosition",
    value: function(n) {
      var a = this.props, i = a.layout, o = a.align, c = a.verticalAlign, s = a.margin, l = a.chartWidth, f = a.chartHeight, u, d;
      if (!n || (n.left === void 0 || n.left === null) && (n.right === void 0 || n.right === null))
        if (o === "center" && i === "vertical") {
          var h = this.getBBoxSnapshot();
          u = {
            left: ((l || 0) - h.width) / 2
          };
        } else
          u = o === "right" ? {
            right: s && s.right || 0
          } : {
            left: s && s.left || 0
          };
      if (!n || (n.top === void 0 || n.top === null) && (n.bottom === void 0 || n.bottom === null))
        if (c === "middle") {
          var m = this.getBBoxSnapshot();
          d = {
            top: ((f || 0) - m.height) / 2
          };
        } else
          d = c === "bottom" ? {
            bottom: s && s.bottom || 0
          } : {
            top: s && s.top || 0
          };
      return Vt(Vt({}, u), d);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.content, o = a.width, c = a.height, s = a.wrapperStyle, l = a.payloadUniqBy, f = a.payload, u = Vt(Vt({
        position: "absolute",
        width: o || "auto",
        height: c || "auto"
      }, this.getDefaultPosition(s)), s);
      return /* @__PURE__ */ T.createElement("div", {
        className: "recharts-legend-wrapper",
        style: u,
        ref: function(h) {
          n.wrapperNode = h;
        }
      }, EM(i, Vt(Vt({}, this.props), {}, {
        payload: Ly(f, l, AM)
      })));
    }
  }], [{
    key: "getWithHeight",
    value: function(n, a) {
      var i = Vt(Vt({}, this.defaultProps), n.props), o = i.layout;
      return o === "vertical" && H(n.props.height) ? {
        height: n.props.height
      } : o === "horizontal" ? {
        width: n.props.width || a
      } : null;
    }
  }]);
}(Et);
bc(mn, "displayName", "Legend");
bc(mn, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
var Gd = bi, TM = Uu, $M = it, Yd = Gd ? Gd.isConcatSpreadable : void 0;
function CM(e) {
  return $M(e) || TM(e) || !!(Yd && e && e[Yd]);
}
var MM = CM, jM = Ay, NM = MM;
function zy(e, t, r, n, a) {
  var i = -1, o = e.length;
  for (r || (r = NM), a || (a = []); ++i < o; ) {
    var c = e[i];
    t > 0 && r(c) ? t > 1 ? zy(c, t - 1, r, n, a) : jM(a, c) : n || (a[a.length] = c);
  }
  return a;
}
var Wy = zy;
function kM(e) {
  return function(t, r, n) {
    for (var a = -1, i = Object(t), o = n(t), c = o.length; c--; ) {
      var s = o[e ? c : ++a];
      if (r(i[s], s, i) === !1)
        break;
    }
    return t;
  };
}
var IM = kM, DM = IM, RM = DM(), LM = RM, FM = LM, BM = gc;
function zM(e, t) {
  return e && FM(e, t, BM);
}
var Uy = zM, WM = wi;
function UM(e, t) {
  return function(r, n) {
    if (r == null)
      return r;
    if (!WM(r))
      return e(r, n);
    for (var a = r.length, i = t ? a : -1, o = Object(r); (t ? i-- : ++i < a) && n(o[i], i, o) !== !1; )
      ;
    return r;
  };
}
var VM = UM, qM = Uy, HM = VM, GM = HM(qM), Gu = GM, YM = Gu, KM = wi;
function XM(e, t) {
  var r = -1, n = KM(e) ? Array(e.length) : [];
  return YM(e, function(a, i, o) {
    n[++r] = t(a, i, o);
  }), n;
}
var Vy = XM;
function ZM(e, t) {
  var r = e.length;
  for (e.sort(t); r--; )
    e[r] = e[r].value;
  return e;
}
var JM = ZM, Kd = Zn;
function QM(e, t) {
  if (e !== t) {
    var r = e !== void 0, n = e === null, a = e === e, i = Kd(e), o = t !== void 0, c = t === null, s = t === t, l = Kd(t);
    if (!c && !l && !i && e > t || i && o && s && !c && !l || n && o && s || !r && s || !a)
      return 1;
    if (!n && !i && !l && e < t || l && r && a && !n && !i || c && r && a || !o && a || !s)
      return -1;
  }
  return 0;
}
var ej = QM, tj = ej;
function rj(e, t, r) {
  for (var n = -1, a = e.criteria, i = t.criteria, o = a.length, c = r.length; ++n < o; ) {
    var s = tj(a[n], i[n]);
    if (s) {
      if (n >= c)
        return s;
      var l = r[n];
      return s * (l == "desc" ? -1 : 1);
    }
  }
  return e.index - t.index;
}
var nj = rj, fs = Nu, aj = ku, ij = Wt, oj = Vy, cj = JM, sj = $y, lj = nj, uj = oa, fj = it;
function dj(e, t, r) {
  t.length ? t = fs(t, function(i) {
    return fj(i) ? function(o) {
      return aj(o, i.length === 1 ? i[0] : i);
    } : i;
  }) : t = [uj];
  var n = -1;
  t = fs(t, sj(ij));
  var a = oj(e, function(i, o, c) {
    var s = fs(t, function(l) {
      return l(i);
    });
    return { criteria: s, index: ++n, value: i };
  });
  return cj(a, function(i, o) {
    return lj(i, o, r);
  });
}
var hj = dj;
function pj(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
var vj = pj, mj = vj, Xd = Math.max;
function yj(e, t, r) {
  return t = Xd(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, a = -1, i = Xd(n.length - t, 0), o = Array(i); ++a < i; )
      o[a] = n[t + a];
    a = -1;
    for (var c = Array(t + 1); ++a < t; )
      c[a] = n[a];
    return c[t] = r(o), mj(e, this, c);
  };
}
var gj = yj;
function bj(e) {
  return function() {
    return e;
  };
}
var wj = bj, xj = Zr, Oj = function() {
  try {
    var e = xj(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), qy = Oj, Sj = wj, Zd = qy, Pj = oa, _j = Zd ? function(e, t) {
  return Zd(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Sj(t),
    writable: !0
  });
} : Pj, Aj = _j, Ej = 800, Tj = 16, $j = Date.now;
function Cj(e) {
  var t = 0, r = 0;
  return function() {
    var n = $j(), a = Tj - (n - r);
    if (r = n, a > 0) {
      if (++t >= Ej)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var Mj = Cj, jj = Aj, Nj = Mj, kj = Nj(jj), Ij = kj, Dj = oa, Rj = gj, Lj = Ij;
function Fj(e, t) {
  return Lj(Rj(e, t, Dj), e + "");
}
var Bj = Fj, zj = $u, Wj = wi, Uj = Vu, Vj = Or;
function qj(e, t, r) {
  if (!Vj(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? Wj(r) && Uj(t, r.length) : n == "string" && t in r) ? zj(r[t], e) : !1;
}
var wc = qj, Hj = Wy, Gj = hj, Yj = Bj, Jd = wc, Kj = Yj(function(e, t) {
  if (e == null)
    return [];
  var r = t.length;
  return r > 1 && Jd(e, t[0], t[1]) ? t = [] : r > 2 && Jd(t[0], t[1], t[2]) && (t = [t[0]]), Gj(e, Hj(t, 1), []);
}), Xj = Kj;
const Yu = /* @__PURE__ */ Pe(Xj);
function Da(e) {
  "@babel/helpers - typeof";
  return Da = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Da(e);
}
function ul() {
  return ul = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ul.apply(this, arguments);
}
function Zj(e, t) {
  return tN(e) || eN(e, t) || Qj(e, t) || Jj();
}
function Jj() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Qj(e, t) {
  if (e) {
    if (typeof e == "string") return Qd(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Qd(e, t);
  }
}
function Qd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function eN(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, c = [], s = !0, l = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (c.push(n.value), c.length !== t); s = !0) ;
    } catch (f) {
      l = !0, a = f;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw a;
      }
    }
    return c;
  }
}
function tN(e) {
  if (Array.isArray(e)) return e;
}
function eh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ds(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? eh(Object(r), !0).forEach(function(n) {
      rN(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : eh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function rN(e, t, r) {
  return t = nN(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function nN(e) {
  var t = aN(e, "string");
  return Da(t) == "symbol" ? t : t + "";
}
function aN(e, t) {
  if (Da(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Da(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function iN(e) {
  return Array.isArray(e) && Ue(e[0]) && Ue(e[1]) ? e.join(" ~ ") : e;
}
var oN = function(t) {
  var r = t.separator, n = r === void 0 ? " : " : r, a = t.contentStyle, i = a === void 0 ? {} : a, o = t.itemStyle, c = o === void 0 ? {} : o, s = t.labelStyle, l = s === void 0 ? {} : s, f = t.payload, u = t.formatter, d = t.itemSorter, h = t.wrapperClassName, m = t.labelClassName, v = t.label, p = t.labelFormatter, b = t.accessibilityLayer, g = b === void 0 ? !1 : b, O = function() {
    if (f && f.length) {
      var C = {
        padding: 0,
        margin: 0
      }, D = (d ? Yu(f, d) : f).map(function(I, R) {
        if (I.type === "none")
          return null;
        var F = ds({
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: I.color || "#000"
        }, c), k = I.formatter || u || iN, z = I.value, V = I.name, N = z, B = V;
        if (k && N != null && B != null) {
          var W = k(z, V, I, R, f);
          if (Array.isArray(W)) {
            var Y = Zj(W, 2);
            N = Y[0], B = Y[1];
          } else
            N = W;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ T.createElement("li", {
            className: "recharts-tooltip-item",
            key: "tooltip-item-".concat(R),
            style: F
          }, Ue(B) ? /* @__PURE__ */ T.createElement("span", {
            className: "recharts-tooltip-item-name"
          }, B) : null, Ue(B) ? /* @__PURE__ */ T.createElement("span", {
            className: "recharts-tooltip-item-separator"
          }, n) : null, /* @__PURE__ */ T.createElement("span", {
            className: "recharts-tooltip-item-value"
          }, N), /* @__PURE__ */ T.createElement("span", {
            className: "recharts-tooltip-item-unit"
          }, I.unit || ""))
        );
      });
      return /* @__PURE__ */ T.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: C
      }, D);
    }
    return null;
  }, S = ds({
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  }, i), y = ds({
    margin: 0
  }, l), w = !ce(v), P = w ? v : "", _ = le("recharts-default-tooltip", h), $ = le("recharts-tooltip-label", m);
  w && p && f !== void 0 && f !== null && (P = p(v, f));
  var E = g ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ T.createElement("div", ul({
    className: _,
    style: S
  }, E), /* @__PURE__ */ T.createElement("p", {
    className: $,
    style: y
  }, /* @__PURE__ */ T.isValidElement(P) ? P : "".concat(P)), O());
};
function Ra(e) {
  "@babel/helpers - typeof";
  return Ra = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ra(e);
}
function ji(e, t, r) {
  return t = cN(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function cN(e) {
  var t = sN(e, "string");
  return Ra(t) == "symbol" ? t : t + "";
}
function sN(e, t) {
  if (Ra(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ra(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var da = "recharts-tooltip-wrapper", lN = {
  visibility: "hidden"
};
function uN(e) {
  var t = e.coordinate, r = e.translateX, n = e.translateY;
  return le(da, ji(ji(ji(ji({}, "".concat(da, "-right"), H(r) && t && H(t.x) && r >= t.x), "".concat(da, "-left"), H(r) && t && H(t.x) && r < t.x), "".concat(da, "-bottom"), H(n) && t && H(t.y) && n >= t.y), "".concat(da, "-top"), H(n) && t && H(t.y) && n < t.y));
}
function th(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.key, a = e.offsetTopLeft, i = e.position, o = e.reverseDirection, c = e.tooltipDimension, s = e.viewBox, l = e.viewBoxDimension;
  if (i && H(i[n]))
    return i[n];
  var f = r[n] - c - a, u = r[n] + a;
  if (t[n])
    return o[n] ? f : u;
  if (o[n]) {
    var d = f, h = s[n];
    return d < h ? Math.max(u, s[n]) : Math.max(f, s[n]);
  }
  var m = u + c, v = s[n] + l;
  return m > v ? Math.max(f, s[n]) : Math.max(u, s[n]);
}
function fN(e) {
  var t = e.translateX, r = e.translateY, n = e.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  };
}
function dN(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.offsetTopLeft, a = e.position, i = e.reverseDirection, o = e.tooltipBox, c = e.useTranslate3d, s = e.viewBox, l, f, u;
  return o.height > 0 && o.width > 0 && r ? (f = th({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: a,
    reverseDirection: i,
    tooltipDimension: o.width,
    viewBox: s,
    viewBoxDimension: s.width
  }), u = th({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: a,
    reverseDirection: i,
    tooltipDimension: o.height,
    viewBox: s,
    viewBoxDimension: s.height
  }), l = fN({
    translateX: f,
    translateY: u,
    useTranslate3d: c
  })) : l = lN, {
    cssProperties: l,
    cssClasses: uN({
      translateX: f,
      translateY: u,
      coordinate: r
    })
  };
}
function _n(e) {
  "@babel/helpers - typeof";
  return _n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, _n(e);
}
function rh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function nh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rh(Object(r), !0).forEach(function(n) {
      dl(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function hN(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function pN(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Gy(n.key), n);
  }
}
function vN(e, t, r) {
  return t && pN(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function mN(e, t, r) {
  return t = ho(t), yN(e, Hy() ? Reflect.construct(t, r || [], ho(e).constructor) : t.apply(e, r));
}
function yN(e, t) {
  if (t && (_n(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return gN(e);
}
function gN(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Hy() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Hy = function() {
    return !!e;
  })();
}
function ho(e) {
  return ho = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ho(e);
}
function bN(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && fl(e, t);
}
function fl(e, t) {
  return fl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, fl(e, t);
}
function dl(e, t, r) {
  return t = Gy(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Gy(e) {
  var t = wN(e, "string");
  return _n(t) == "symbol" ? t : t + "";
}
function wN(e, t) {
  if (_n(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (_n(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var ah = 1, xN = /* @__PURE__ */ function(e) {
  function t() {
    var r;
    hN(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = mN(this, t, [].concat(a)), dl(r, "state", {
      dismissed: !1,
      dismissedAtCoordinate: {
        x: 0,
        y: 0
      },
      lastBoundingBox: {
        width: -1,
        height: -1
      }
    }), dl(r, "handleKeyDown", function(o) {
      if (o.key === "Escape") {
        var c, s, l, f;
        r.setState({
          dismissed: !0,
          dismissedAtCoordinate: {
            x: (c = (s = r.props.coordinate) === null || s === void 0 ? void 0 : s.x) !== null && c !== void 0 ? c : 0,
            y: (l = (f = r.props.coordinate) === null || f === void 0 ? void 0 : f.y) !== null && l !== void 0 ? l : 0
          }
        });
      }
    }), r;
  }
  return bN(t, e), vN(t, [{
    key: "updateBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var n = this.wrapperNode.getBoundingClientRect();
        (Math.abs(n.width - this.state.lastBoundingBox.width) > ah || Math.abs(n.height - this.state.lastBoundingBox.height) > ah) && this.setState({
          lastBoundingBox: {
            width: n.width,
            height: n.height
          }
        });
      } else (this.state.lastBoundingBox.width !== -1 || this.state.lastBoundingBox.height !== -1) && this.setState({
        lastBoundingBox: {
          width: -1,
          height: -1
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function() {
      document.addEventListener("keydown", this.handleKeyDown), this.updateBBox();
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      document.removeEventListener("keydown", this.handleKeyDown);
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      var n, a;
      this.props.active && this.updateBBox(), this.state.dismissed && (((n = this.props.coordinate) === null || n === void 0 ? void 0 : n.x) !== this.state.dismissedAtCoordinate.x || ((a = this.props.coordinate) === null || a === void 0 ? void 0 : a.y) !== this.state.dismissedAtCoordinate.y) && (this.state.dismissed = !1);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.active, o = a.allowEscapeViewBox, c = a.animationDuration, s = a.animationEasing, l = a.children, f = a.coordinate, u = a.hasPayload, d = a.isAnimationActive, h = a.offset, m = a.position, v = a.reverseDirection, p = a.useTranslate3d, b = a.viewBox, g = a.wrapperStyle, O = dN({
        allowEscapeViewBox: o,
        coordinate: f,
        offsetTopLeft: h,
        position: m,
        reverseDirection: v,
        tooltipBox: this.state.lastBoundingBox,
        useTranslate3d: p,
        viewBox: b
      }), S = O.cssClasses, y = O.cssProperties, w = nh(nh({
        transition: d && i ? "transform ".concat(c, "ms ").concat(s) : void 0
      }, y), {}, {
        pointerEvents: "none",
        visibility: !this.state.dismissed && i && u ? "visible" : "hidden",
        position: "absolute",
        top: 0,
        left: 0
      }, g);
      return (
        // This element allow listening to the `Escape` key.
        // See https://github.com/recharts/recharts/pull/2925
        /* @__PURE__ */ T.createElement("div", {
          tabIndex: -1,
          className: S,
          style: w,
          ref: function(_) {
            n.wrapperNode = _;
          }
        }, l)
      );
    }
  }]);
}(Et), ON = function() {
  return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout);
}, Jr = {
  isSsr: ON()
};
function An(e) {
  "@babel/helpers - typeof";
  return An = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, An(e);
}
function ih(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function oh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ih(Object(r), !0).forEach(function(n) {
      Ku(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ih(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function SN(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function PN(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Ky(n.key), n);
  }
}
function _N(e, t, r) {
  return t && PN(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function AN(e, t, r) {
  return t = po(t), EN(e, Yy() ? Reflect.construct(t, r || [], po(e).constructor) : t.apply(e, r));
}
function EN(e, t) {
  if (t && (An(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return TN(e);
}
function TN(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Yy() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Yy = function() {
    return !!e;
  })();
}
function po(e) {
  return po = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, po(e);
}
function $N(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && hl(e, t);
}
function hl(e, t) {
  return hl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, hl(e, t);
}
function Ku(e, t, r) {
  return t = Ky(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Ky(e) {
  var t = CN(e, "string");
  return An(t) == "symbol" ? t : t + "";
}
function CN(e, t) {
  if (An(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (An(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function MN(e) {
  return e.dataKey;
}
function jN(e, t) {
  return /* @__PURE__ */ T.isValidElement(e) ? /* @__PURE__ */ T.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ T.createElement(e, t) : /* @__PURE__ */ T.createElement(oN, t);
}
var Ct = /* @__PURE__ */ function(e) {
  function t() {
    return SN(this, t), AN(this, t, arguments);
  }
  return $N(t, e), _N(t, [{
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.active, o = a.allowEscapeViewBox, c = a.animationDuration, s = a.animationEasing, l = a.content, f = a.coordinate, u = a.filterNull, d = a.isAnimationActive, h = a.offset, m = a.payload, v = a.payloadUniqBy, p = a.position, b = a.reverseDirection, g = a.useTranslate3d, O = a.viewBox, S = a.wrapperStyle, y = m ?? [];
      u && y.length && (y = Ly(m.filter(function(P) {
        return P.value != null && (P.hide !== !0 || n.props.includeHidden);
      }), v, MN));
      var w = y.length > 0;
      return /* @__PURE__ */ T.createElement(xN, {
        allowEscapeViewBox: o,
        animationDuration: c,
        animationEasing: s,
        isAnimationActive: d,
        active: i,
        coordinate: f,
        hasPayload: w,
        offset: h,
        position: p,
        reverseDirection: b,
        useTranslate3d: g,
        viewBox: O,
        wrapperStyle: S
      }, jN(l, oh(oh({}, this.props), {}, {
        payload: y
      })));
    }
  }]);
}(Et);
Ku(Ct, "displayName", "Tooltip");
Ku(Ct, "defaultProps", {
  accessibilityLayer: !1,
  allowEscapeViewBox: {
    x: !1,
    y: !1
  },
  animationDuration: 400,
  animationEasing: "ease",
  contentStyle: {},
  coordinate: {
    x: 0,
    y: 0
  },
  cursor: !0,
  cursorStyle: {},
  filterNull: !0,
  isAnimationActive: !Jr.isSsr,
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: !1,
    y: !1
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: !1,
  viewBox: {
    x: 0,
    y: 0,
    height: 0,
    width: 0
  },
  wrapperStyle: {}
});
var NN = zt, kN = function() {
  return NN.Date.now();
}, IN = kN, DN = /\s/;
function RN(e) {
  for (var t = e.length; t-- && DN.test(e.charAt(t)); )
    ;
  return t;
}
var LN = RN, FN = LN, BN = /^\s+/;
function zN(e) {
  return e && e.slice(0, FN(e) + 1).replace(BN, "");
}
var WN = zN, UN = WN, ch = Or, VN = Zn, sh = NaN, qN = /^[-+]0x[0-9a-f]+$/i, HN = /^0b[01]+$/i, GN = /^0o[0-7]+$/i, YN = parseInt;
function KN(e) {
  if (typeof e == "number")
    return e;
  if (VN(e))
    return sh;
  if (ch(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = ch(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = UN(e);
  var r = HN.test(e);
  return r || GN.test(e) ? YN(e.slice(2), r ? 2 : 8) : qN.test(e) ? sh : +e;
}
var Xy = KN, XN = Or, hs = IN, lh = Xy, ZN = "Expected a function", JN = Math.max, QN = Math.min;
function ek(e, t, r) {
  var n, a, i, o, c, s, l = 0, f = !1, u = !1, d = !0;
  if (typeof e != "function")
    throw new TypeError(ZN);
  t = lh(t) || 0, XN(r) && (f = !!r.leading, u = "maxWait" in r, i = u ? JN(lh(r.maxWait) || 0, t) : i, d = "trailing" in r ? !!r.trailing : d);
  function h(w) {
    var P = n, _ = a;
    return n = a = void 0, l = w, o = e.apply(_, P), o;
  }
  function m(w) {
    return l = w, c = setTimeout(b, t), f ? h(w) : o;
  }
  function v(w) {
    var P = w - s, _ = w - l, $ = t - P;
    return u ? QN($, i - _) : $;
  }
  function p(w) {
    var P = w - s, _ = w - l;
    return s === void 0 || P >= t || P < 0 || u && _ >= i;
  }
  function b() {
    var w = hs();
    if (p(w))
      return g(w);
    c = setTimeout(b, v(w));
  }
  function g(w) {
    return c = void 0, d && n ? h(w) : (n = a = void 0, o);
  }
  function O() {
    c !== void 0 && clearTimeout(c), l = 0, n = s = a = c = void 0;
  }
  function S() {
    return c === void 0 ? o : g(hs());
  }
  function y() {
    var w = hs(), P = p(w);
    if (n = arguments, a = this, s = w, P) {
      if (c === void 0)
        return m(s);
      if (u)
        return clearTimeout(c), c = setTimeout(b, t), h(s);
    }
    return c === void 0 && (c = setTimeout(b, t)), o;
  }
  return y.cancel = O, y.flush = S, y;
}
var tk = ek, rk = tk, nk = Or, ak = "Expected a function";
function ik(e, t, r) {
  var n = !0, a = !0;
  if (typeof e != "function")
    throw new TypeError(ak);
  return nk(r) && (n = "leading" in r ? !!r.leading : n, a = "trailing" in r ? !!r.trailing : a), rk(e, t, {
    leading: n,
    maxWait: t,
    trailing: a
  });
}
var ok = ik;
const Zy = /* @__PURE__ */ Pe(ok);
function La(e) {
  "@babel/helpers - typeof";
  return La = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, La(e);
}
function uh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ni(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? uh(Object(r), !0).forEach(function(n) {
      ck(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : uh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ck(e, t, r) {
  return t = sk(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function sk(e) {
  var t = lk(e, "string");
  return La(t) == "symbol" ? t : t + "";
}
function lk(e, t) {
  if (La(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (La(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function uk(e, t) {
  return pk(e) || hk(e, t) || dk(e, t) || fk();
}
function fk() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function dk(e, t) {
  if (e) {
    if (typeof e == "string") return fh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return fh(e, t);
  }
}
function fh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function hk(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, c = [], s = !0, l = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (c.push(n.value), c.length !== t); s = !0) ;
    } catch (f) {
      l = !0, a = f;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw a;
      }
    }
    return c;
  }
}
function pk(e) {
  if (Array.isArray(e)) return e;
}
var vk = /* @__PURE__ */ oc(function(e, t) {
  var r = e.aspect, n = e.initialDimension, a = n === void 0 ? {
    width: -1,
    height: -1
  } : n, i = e.width, o = i === void 0 ? "100%" : i, c = e.height, s = c === void 0 ? "100%" : c, l = e.minWidth, f = l === void 0 ? 0 : l, u = e.minHeight, d = e.maxHeight, h = e.children, m = e.debounce, v = m === void 0 ? 0 : m, p = e.id, b = e.className, g = e.onResize, O = e.style, S = O === void 0 ? {} : O, y = Yi(null), w = Yi();
  w.current = g, k0(t, function() {
    return Object.defineProperty(y.current, "current", {
      get: function() {
        return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), y.current;
      },
      configurable: !0
    });
  });
  var P = J({
    containerWidth: a.width,
    containerHeight: a.height
  }), _ = uk(P, 2), $ = _[0], E = _[1], j = I0(function(D, I) {
    E(function(R) {
      var F = Math.round(D), k = Math.round(I);
      return R.containerWidth === F && R.containerHeight === k ? R : {
        containerWidth: F,
        containerHeight: k
      };
    });
  }, []);
  vi(function() {
    var D = function(V) {
      var N, B = V[0].contentRect, W = B.width, Y = B.height;
      j(W, Y), (N = w.current) === null || N === void 0 || N.call(w, W, Y);
    };
    v > 0 && (D = Zy(D, v, {
      trailing: !0,
      leading: !1
    }));
    var I = new ResizeObserver(D), R = y.current.getBoundingClientRect(), F = R.width, k = R.height;
    return j(F, k), I.observe(y.current), function() {
      I.disconnect();
    };
  }, [j, v]);
  var C = wr(function() {
    var D = $.containerWidth, I = $.containerHeight;
    if (D < 0 || I < 0)
      return null;
    _t(Dr(o) || Dr(s), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, o, s), _t(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
    var R = Dr(o) ? D : o, F = Dr(s) ? I : s;
    r && r > 0 && (R ? F = R / r : F && (R = F * r), d && F > d && (F = d)), _t(R > 0 || F > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, R, F, o, s, f, u, r);
    var k = !Array.isArray(h) && Xt(h.type).endsWith("Chart");
    return T.Children.map(h, function(z) {
      return /* @__PURE__ */ T.isValidElement(z) ? /* @__PURE__ */ ze(z, Ni({
        width: R,
        height: F
      }, k ? {
        style: Ni({
          height: "100%",
          width: "100%",
          maxHeight: F,
          maxWidth: R
        }, z.props.style)
      } : {})) : z;
    });
  }, [r, h, s, d, u, f, $, o]);
  return /* @__PURE__ */ T.createElement("div", {
    id: p ? "".concat(p) : void 0,
    className: le("recharts-responsive-container", b),
    style: Ni(Ni({}, S), {}, {
      width: o,
      height: s,
      minWidth: f,
      minHeight: u,
      maxHeight: d
    }),
    ref: y
  }, C);
}), Xu = function(t) {
  return null;
};
Xu.displayName = "Cell";
function Fa(e) {
  "@babel/helpers - typeof";
  return Fa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Fa(e);
}
function dh(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function pl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dh(Object(r), !0).forEach(function(n) {
      mk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dh(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function mk(e, t, r) {
  return t = yk(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function yk(e) {
  var t = gk(e, "string");
  return Fa(t) == "symbol" ? t : t + "";
}
function gk(e, t) {
  if (Fa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Fa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var an = {
  widthCache: {},
  cacheCount: 0
}, bk = 2e3, wk = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, hh = "recharts_measurement_span";
function xk(e) {
  var t = pl({}, e);
  return Object.keys(t).forEach(function(r) {
    t[r] || delete t[r];
  }), t;
}
var Pa = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || Jr.isSsr)
    return {
      width: 0,
      height: 0
    };
  var n = xk(r), a = JSON.stringify({
    text: t,
    copyStyle: n
  });
  if (an.widthCache[a])
    return an.widthCache[a];
  try {
    var i = document.getElementById(hh);
    i || (i = document.createElement("span"), i.setAttribute("id", hh), i.setAttribute("aria-hidden", "true"), document.body.appendChild(i));
    var o = pl(pl({}, wk), n);
    Object.assign(i.style, o), i.textContent = "".concat(t);
    var c = i.getBoundingClientRect(), s = {
      width: c.width,
      height: c.height
    };
    return an.widthCache[a] = s, ++an.cacheCount > bk && (an.cacheCount = 0, an.widthCache = {}), s;
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, Ok = function(t) {
  return {
    top: t.top + window.scrollY - document.documentElement.clientTop,
    left: t.left + window.scrollX - document.documentElement.clientLeft
  };
};
function Ba(e) {
  "@babel/helpers - typeof";
  return Ba = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ba(e);
}
function vo(e, t) {
  return Ak(e) || _k(e, t) || Pk(e, t) || Sk();
}
function Sk() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Pk(e, t) {
  if (e) {
    if (typeof e == "string") return ph(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ph(e, t);
  }
}
function ph(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function _k(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, c = [], s = !0, l = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1;
      } else for (; !(s = (n = i.call(r)).done) && (c.push(n.value), c.length !== t); s = !0) ;
    } catch (f) {
      l = !0, a = f;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw a;
      }
    }
    return c;
  }
}
function Ak(e) {
  if (Array.isArray(e)) return e;
}
function Ek(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function vh(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, $k(n.key), n);
  }
}
function Tk(e, t, r) {
  return t && vh(e.prototype, t), r && vh(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function $k(e) {
  var t = Ck(e, "string");
  return Ba(t) == "symbol" ? t : t + "";
}
function Ck(e, t) {
  if (Ba(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ba(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var mh = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, yh = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, Mk = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/, jk = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, Jy = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, Nk = Object.keys(Jy), un = "NaN";
function kk(e, t) {
  return e * Jy[t];
}
var ki = /* @__PURE__ */ function() {
  function e(t, r) {
    Ek(this, e), this.num = t, this.unit = r, this.num = t, this.unit = r, Number.isNaN(t) && (this.unit = ""), r !== "" && !Mk.test(r) && (this.num = NaN, this.unit = ""), Nk.includes(r) && (this.num = kk(t, r), this.unit = "px");
  }
  return Tk(e, [{
    key: "add",
    value: function(r) {
      return this.unit !== r.unit ? new e(NaN, "") : new e(this.num + r.num, this.unit);
    }
  }, {
    key: "subtract",
    value: function(r) {
      return this.unit !== r.unit ? new e(NaN, "") : new e(this.num - r.num, this.unit);
    }
  }, {
    key: "multiply",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new e(NaN, "") : new e(this.num * r.num, this.unit || r.unit);
    }
  }, {
    key: "divide",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new e(NaN, "") : new e(this.num / r.num, this.unit || r.unit);
    }
  }, {
    key: "toString",
    value: function() {
      return "".concat(this.num).concat(this.unit);
    }
  }, {
    key: "isNaN",
    value: function() {
      return Number.isNaN(this.num);
    }
  }], [{
    key: "parse",
    value: function(r) {
      var n, a = (n = jk.exec(r)) !== null && n !== void 0 ? n : [], i = vo(a, 3), o = i[1], c = i[2];
      return new e(parseFloat(o), c ?? "");
    }
  }]);
}();
function Qy(e) {
  if (e.includes(un))
    return un;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, n = (r = mh.exec(t)) !== null && r !== void 0 ? r : [], a = vo(n, 4), i = a[1], o = a[2], c = a[3], s = ki.parse(i ?? ""), l = ki.parse(c ?? ""), f = o === "*" ? s.multiply(l) : s.divide(l);
    if (f.isNaN())
      return un;
    t = t.replace(mh, f.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var u, d = (u = yh.exec(t)) !== null && u !== void 0 ? u : [], h = vo(d, 4), m = h[1], v = h[2], p = h[3], b = ki.parse(m ?? ""), g = ki.parse(p ?? ""), O = v === "+" ? b.add(g) : b.subtract(g);
    if (O.isNaN())
      return un;
    t = t.replace(yh, O.toString());
  }
  return t;
}
var gh = /\(([^()]*)\)/;
function Ik(e) {
  for (var t = e; t.includes("("); ) {
    var r = gh.exec(t), n = vo(r, 2), a = n[1];
    t = t.replace(gh, Qy(a));
  }
  return t;
}
function Dk(e) {
  var t = e.replace(/\s+/g, "");
  return t = Ik(t), t = Qy(t), t;
}
function Rk(e) {
  try {
    return Dk(e);
  } catch {
    return un;
  }
}
function ps(e) {
  var t = Rk(e.slice(5, -1));
  return t === un ? "" : t;
}
var Lk = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"], Fk = ["dx", "dy", "angle", "className", "breakAll"];
function vl() {
  return vl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, vl.apply(this, arguments);
}
function bh(e, t) {
  if (e == null) return {};
  var r = Bk(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Bk(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function wh(e, t) {
  return Vk(e) || Uk(e, t) || Wk(e, t) || zk();
}
function zk() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Wk(e, t) {
  if (e) {
    if (typeof e == "string") return xh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return xh(e, t);
  }
}
function xh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Uk(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, c = [], s = !0, l = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1;
      } else for (; !(s = (n = i.call(r)).done) && (c.push(n.value), c.length !== t); s = !0) ;
    } catch (f) {
      l = !0, a = f;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw a;
      }
    }
    return c;
  }
}
function Vk(e) {
  if (Array.isArray(e)) return e;
}
var eg = /[ \f\n\r\t\v\u2028\u2029]+/, tg = function(t) {
  var r = t.children, n = t.breakAll, a = t.style;
  try {
    var i = [];
    ce(r) || (n ? i = r.toString().split("") : i = r.toString().split(eg));
    var o = i.map(function(s) {
      return {
        word: s,
        width: Pa(s, a).width
      };
    }), c = n ? 0 : Pa(" ", a).width;
    return {
      wordsWithComputedWidth: o,
      spaceWidth: c
    };
  } catch {
    return null;
  }
}, qk = function(t, r, n, a, i) {
  var o = t.maxLines, c = t.children, s = t.style, l = t.breakAll, f = H(o), u = c, d = function() {
    var R = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return R.reduce(function(F, k) {
      var z = k.word, V = k.width, N = F[F.length - 1];
      if (N && (a == null || i || N.width + V + n < Number(a)))
        N.words.push(z), N.width += V + n;
      else {
        var B = {
          words: [z],
          width: V
        };
        F.push(B);
      }
      return F;
    }, []);
  }, h = d(r), m = function(R) {
    return R.reduce(function(F, k) {
      return F.width > k.width ? F : k;
    });
  };
  if (!f)
    return h;
  for (var v = "…", p = function(R) {
    var F = u.slice(0, R), k = tg({
      breakAll: l,
      style: s,
      children: F + v
    }).wordsWithComputedWidth, z = d(k), V = z.length > o || m(z).width > Number(a);
    return [V, z];
  }, b = 0, g = u.length - 1, O = 0, S; b <= g && O <= u.length - 1; ) {
    var y = Math.floor((b + g) / 2), w = y - 1, P = p(w), _ = wh(P, 2), $ = _[0], E = _[1], j = p(y), C = wh(j, 1), D = C[0];
    if (!$ && !D && (b = y + 1), $ && D && (g = y - 1), !$ && D) {
      S = E;
      break;
    }
    O++;
  }
  return S || h;
}, Oh = function(t) {
  var r = ce(t) ? [] : t.toString().split(eg);
  return [{
    words: r
  }];
}, Hk = function(t) {
  var r = t.width, n = t.scaleToFit, a = t.children, i = t.style, o = t.breakAll, c = t.maxLines;
  if ((r || n) && !Jr.isSsr) {
    var s, l, f = tg({
      breakAll: o,
      children: a,
      style: i
    });
    if (f) {
      var u = f.wordsWithComputedWidth, d = f.spaceWidth;
      s = u, l = d;
    } else
      return Oh(a);
    return qk({
      breakAll: o,
      children: a,
      maxLines: c,
      style: i
    }, s, l, r, n);
  }
  return Oh(a);
}, Sh = "#808080", Hr = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, a = t.y, i = a === void 0 ? 0 : a, o = t.lineHeight, c = o === void 0 ? "1em" : o, s = t.capHeight, l = s === void 0 ? "0.71em" : s, f = t.scaleToFit, u = f === void 0 ? !1 : f, d = t.textAnchor, h = d === void 0 ? "start" : d, m = t.verticalAnchor, v = m === void 0 ? "end" : m, p = t.fill, b = p === void 0 ? Sh : p, g = bh(t, Lk), O = wr(function() {
    return Hk({
      breakAll: g.breakAll,
      children: g.children,
      maxLines: g.maxLines,
      scaleToFit: u,
      style: g.style,
      width: g.width
    });
  }, [g.breakAll, g.children, g.maxLines, u, g.style, g.width]), S = g.dx, y = g.dy, w = g.angle, P = g.className, _ = g.breakAll, $ = bh(g, Fk);
  if (!Ue(n) || !Ue(i))
    return null;
  var E = n + (H(S) ? S : 0), j = i + (H(y) ? y : 0), C;
  switch (v) {
    case "start":
      C = ps("calc(".concat(l, ")"));
      break;
    case "middle":
      C = ps("calc(".concat((O.length - 1) / 2, " * -").concat(c, " + (").concat(l, " / 2))"));
      break;
    default:
      C = ps("calc(".concat(O.length - 1, " * -").concat(c, ")"));
      break;
  }
  var D = [];
  if (u) {
    var I = O[0].width, R = g.width;
    D.push("scale(".concat((H(R) ? R / I : 1) / I, ")"));
  }
  return w && D.push("rotate(".concat(w, ", ").concat(E, ", ").concat(j, ")")), D.length && ($.transform = D.join(" ")), /* @__PURE__ */ T.createElement("text", vl({}, te($, !0), {
    x: E,
    y: j,
    className: le("recharts-text", P),
    textAnchor: h,
    fill: b.includes("url") ? Sh : b
  }), O.map(function(F, k) {
    var z = F.words.join(_ ? "" : " ");
    return (
      // duplicate words will cause duplicate keys
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ T.createElement("tspan", {
        x: E,
        dy: k === 0 ? C : c,
        key: "".concat(z, "-").concat(k)
      }, z)
    );
  }));
};
function mr(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Gk(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Zu(e) {
  let t, r, n;
  e.length !== 2 ? (t = mr, r = (c, s) => mr(e(c), s), n = (c, s) => e(c) - s) : (t = e === mr || e === Gk ? e : Yk, r = e, n = e);
  function a(c, s, l = 0, f = c.length) {
    if (l < f) {
      if (t(s, s) !== 0) return f;
      do {
        const u = l + f >>> 1;
        r(c[u], s) < 0 ? l = u + 1 : f = u;
      } while (l < f);
    }
    return l;
  }
  function i(c, s, l = 0, f = c.length) {
    if (l < f) {
      if (t(s, s) !== 0) return f;
      do {
        const u = l + f >>> 1;
        r(c[u], s) <= 0 ? l = u + 1 : f = u;
      } while (l < f);
    }
    return l;
  }
  function o(c, s, l = 0, f = c.length) {
    const u = a(c, s, l, f - 1);
    return u > l && n(c[u - 1], s) > -n(c[u], s) ? u - 1 : u;
  }
  return { left: a, center: o, right: i };
}
function Yk() {
  return 0;
}
function rg(e) {
  return e === null ? NaN : +e;
}
function* Kk(e, t) {
  for (let r of e)
    r != null && (r = +r) >= r && (yield r);
}
const Xk = Zu(mr), xi = Xk.right;
Zu(rg).center;
class Ph extends Map {
  constructor(t, r = Qk) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, a] of t) this.set(n, a);
  }
  get(t) {
    return super.get(_h(this, t));
  }
  has(t) {
    return super.has(_h(this, t));
  }
  set(t, r) {
    return super.set(Zk(this, t), r);
  }
  delete(t) {
    return super.delete(Jk(this, t));
  }
}
function _h({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function Zk({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function Jk({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r;
}
function Qk(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function eI(e = mr) {
  if (e === mr) return ng;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function ng(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const tI = Math.sqrt(50), rI = Math.sqrt(10), nI = Math.sqrt(2);
function mo(e, t, r) {
  const n = (t - e) / Math.max(0, r), a = Math.floor(Math.log10(n)), i = n / Math.pow(10, a), o = i >= tI ? 10 : i >= rI ? 5 : i >= nI ? 2 : 1;
  let c, s, l;
  return a < 0 ? (l = Math.pow(10, -a) / o, c = Math.round(e * l), s = Math.round(t * l), c / l < e && ++c, s / l > t && --s, l = -l) : (l = Math.pow(10, a) * o, c = Math.round(e / l), s = Math.round(t / l), c * l < e && ++c, s * l > t && --s), s < c && 0.5 <= r && r < 2 ? mo(e, t, r * 2) : [c, s, l];
}
function ml(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  const n = t < e, [a, i, o] = n ? mo(t, e, r) : mo(e, t, r);
  if (!(i >= a)) return [];
  const c = i - a + 1, s = new Array(c);
  if (n)
    if (o < 0) for (let l = 0; l < c; ++l) s[l] = (i - l) / -o;
    else for (let l = 0; l < c; ++l) s[l] = (i - l) * o;
  else if (o < 0) for (let l = 0; l < c; ++l) s[l] = (a + l) / -o;
  else for (let l = 0; l < c; ++l) s[l] = (a + l) * o;
  return s;
}
function yl(e, t, r) {
  return t = +t, e = +e, r = +r, mo(e, t, r)[2];
}
function gl(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e, a = n ? yl(t, e, r) : yl(e, t, r);
  return (n ? -1 : 1) * (a < 0 ? 1 / -a : a);
}
function Ah(e, t) {
  let r;
  for (const n of e)
    n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r;
}
function Eh(e, t) {
  let r;
  for (const n of e)
    n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r;
}
function ag(e, t, r = 0, n = 1 / 0, a) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (a = a === void 0 ? ng : eI(a); n > r; ) {
    if (n - r > 600) {
      const s = n - r + 1, l = t - r + 1, f = Math.log(s), u = 0.5 * Math.exp(2 * f / 3), d = 0.5 * Math.sqrt(f * u * (s - u) / s) * (l - s / 2 < 0 ? -1 : 1), h = Math.max(r, Math.floor(t - l * u / s + d)), m = Math.min(n, Math.floor(t + (s - l) * u / s + d));
      ag(e, t, h, m, a);
    }
    const i = e[t];
    let o = r, c = n;
    for (ha(e, r, t), a(e[n], i) > 0 && ha(e, r, n); o < c; ) {
      for (ha(e, o, c), ++o, --c; a(e[o], i) < 0; ) ++o;
      for (; a(e[c], i) > 0; ) --c;
    }
    a(e[r], i) === 0 ? ha(e, r, c) : (++c, ha(e, c, n)), c <= t && (r = c + 1), t <= c && (n = c - 1);
  }
  return e;
}
function ha(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function aI(e, t, r) {
  if (e = Float64Array.from(Kk(e)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return Eh(e);
    if (t >= 1) return Ah(e);
    var n, a = (n - 1) * t, i = Math.floor(a), o = Ah(ag(e, i).subarray(0, i + 1)), c = Eh(e.subarray(i + 1));
    return o + (c - o) * (a - i);
  }
}
function iI(e, t, r = rg) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, a = (n - 1) * t, i = Math.floor(a), o = +r(e[i], i, e), c = +r(e[i + 1], i + 1, e);
    return o + (c - o) * (a - i);
  }
}
function oI(e, t, r) {
  e = +e, t = +t, r = (a = arguments.length) < 2 ? (t = e, e = 0, 1) : a < 3 ? 1 : +r;
  for (var n = -1, a = Math.max(0, Math.ceil((t - e) / r)) | 0, i = new Array(a); ++n < a; )
    i[n] = e + n * r;
  return i;
}
function wt(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function or(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
    default: {
      this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
const bl = Symbol("implicit");
function Ju() {
  var e = new Ph(), t = [], r = [], n = bl;
  function a(i) {
    let o = e.get(i);
    if (o === void 0) {
      if (n !== bl) return n;
      e.set(i, o = t.push(i) - 1);
    }
    return r[o % r.length];
  }
  return a.domain = function(i) {
    if (!arguments.length) return t.slice();
    t = [], e = new Ph();
    for (const o of i)
      e.has(o) || e.set(o, t.push(o) - 1);
    return a;
  }, a.range = function(i) {
    return arguments.length ? (r = Array.from(i), a) : r.slice();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return Ju(t, r).unknown(n);
  }, wt.apply(a, arguments), a;
}
function za() {
  var e = Ju().unknown(void 0), t = e.domain, r = e.range, n = 0, a = 1, i, o, c = !1, s = 0, l = 0, f = 0.5;
  delete e.unknown;
  function u() {
    var d = t().length, h = a < n, m = h ? a : n, v = h ? n : a;
    i = (v - m) / Math.max(1, d - s + l * 2), c && (i = Math.floor(i)), m += (v - m - i * (d - s)) * f, o = i * (1 - s), c && (m = Math.round(m), o = Math.round(o));
    var p = oI(d).map(function(b) {
      return m + i * b;
    });
    return r(h ? p.reverse() : p);
  }
  return e.domain = function(d) {
    return arguments.length ? (t(d), u()) : t();
  }, e.range = function(d) {
    return arguments.length ? ([n, a] = d, n = +n, a = +a, u()) : [n, a];
  }, e.rangeRound = function(d) {
    return [n, a] = d, n = +n, a = +a, c = !0, u();
  }, e.bandwidth = function() {
    return o;
  }, e.step = function() {
    return i;
  }, e.round = function(d) {
    return arguments.length ? (c = !!d, u()) : c;
  }, e.padding = function(d) {
    return arguments.length ? (s = Math.min(1, l = +d), u()) : s;
  }, e.paddingInner = function(d) {
    return arguments.length ? (s = Math.min(1, d), u()) : s;
  }, e.paddingOuter = function(d) {
    return arguments.length ? (l = +d, u()) : l;
  }, e.align = function(d) {
    return arguments.length ? (f = Math.max(0, Math.min(1, d)), u()) : f;
  }, e.copy = function() {
    return za(t(), [n, a]).round(c).paddingInner(s).paddingOuter(l).align(f);
  }, wt.apply(u(), arguments);
}
function ig(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return ig(t());
  }, e;
}
function _a() {
  return ig(za.apply(null, arguments).paddingInner(1));
}
function Qu(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function og(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function Oi() {
}
var Wa = 0.7, yo = 1 / Wa, yn = "\\s*([+-]?\\d+)\\s*", Ua = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", It = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", cI = /^#([0-9a-f]{3,8})$/, sI = new RegExp(`^rgb\\(${yn},${yn},${yn}\\)$`), lI = new RegExp(`^rgb\\(${It},${It},${It}\\)$`), uI = new RegExp(`^rgba\\(${yn},${yn},${yn},${Ua}\\)$`), fI = new RegExp(`^rgba\\(${It},${It},${It},${Ua}\\)$`), dI = new RegExp(`^hsl\\(${Ua},${It},${It}\\)$`), hI = new RegExp(`^hsla\\(${Ua},${It},${It},${Ua}\\)$`), Th = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Qu(Oi, Va, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: $h,
  // Deprecated! Use color.formatHex.
  formatHex: $h,
  formatHex8: pI,
  formatHsl: vI,
  formatRgb: Ch,
  toString: Ch
});
function $h() {
  return this.rgb().formatHex();
}
function pI() {
  return this.rgb().formatHex8();
}
function vI() {
  return cg(this).formatHsl();
}
function Ch() {
  return this.rgb().formatRgb();
}
function Va(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = cI.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? Mh(t) : r === 3 ? new nt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? Ii(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? Ii(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = sI.exec(e)) ? new nt(t[1], t[2], t[3], 1) : (t = lI.exec(e)) ? new nt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = uI.exec(e)) ? Ii(t[1], t[2], t[3], t[4]) : (t = fI.exec(e)) ? Ii(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = dI.exec(e)) ? kh(t[1], t[2] / 100, t[3] / 100, 1) : (t = hI.exec(e)) ? kh(t[1], t[2] / 100, t[3] / 100, t[4]) : Th.hasOwnProperty(e) ? Mh(Th[e]) : e === "transparent" ? new nt(NaN, NaN, NaN, 0) : null;
}
function Mh(e) {
  return new nt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ii(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new nt(e, t, r, n);
}
function mI(e) {
  return e instanceof Oi || (e = Va(e)), e ? (e = e.rgb(), new nt(e.r, e.g, e.b, e.opacity)) : new nt();
}
function wl(e, t, r, n) {
  return arguments.length === 1 ? mI(e) : new nt(e, t, r, n ?? 1);
}
function nt(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
Qu(nt, wl, og(Oi, {
  brighter(e) {
    return e = e == null ? yo : Math.pow(yo, e), new nt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Wa : Math.pow(Wa, e), new nt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new nt(Wr(this.r), Wr(this.g), Wr(this.b), go(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: jh,
  // Deprecated! Use color.formatHex.
  formatHex: jh,
  formatHex8: yI,
  formatRgb: Nh,
  toString: Nh
}));
function jh() {
  return `#${Rr(this.r)}${Rr(this.g)}${Rr(this.b)}`;
}
function yI() {
  return `#${Rr(this.r)}${Rr(this.g)}${Rr(this.b)}${Rr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Nh() {
  const e = go(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Wr(this.r)}, ${Wr(this.g)}, ${Wr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function go(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Wr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Rr(e) {
  return e = Wr(e), (e < 16 ? "0" : "") + e.toString(16);
}
function kh(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new St(e, t, r, n);
}
function cg(e) {
  if (e instanceof St) return new St(e.h, e.s, e.l, e.opacity);
  if (e instanceof Oi || (e = Va(e)), !e) return new St();
  if (e instanceof St) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, a = Math.min(t, r, n), i = Math.max(t, r, n), o = NaN, c = i - a, s = (i + a) / 2;
  return c ? (t === i ? o = (r - n) / c + (r < n) * 6 : r === i ? o = (n - t) / c + 2 : o = (t - r) / c + 4, c /= s < 0.5 ? i + a : 2 - i - a, o *= 60) : c = s > 0 && s < 1 ? 0 : o, new St(o, c, s, e.opacity);
}
function gI(e, t, r, n) {
  return arguments.length === 1 ? cg(e) : new St(e, t, r, n ?? 1);
}
function St(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
Qu(St, gI, og(Oi, {
  brighter(e) {
    return e = e == null ? yo : Math.pow(yo, e), new St(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Wa : Math.pow(Wa, e), new St(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, a = 2 * r - n;
    return new nt(
      vs(e >= 240 ? e - 240 : e + 120, a, n),
      vs(e, a, n),
      vs(e < 120 ? e + 240 : e - 120, a, n),
      this.opacity
    );
  },
  clamp() {
    return new St(Ih(this.h), Di(this.s), Di(this.l), go(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = go(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Ih(this.h)}, ${Di(this.s) * 100}%, ${Di(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Ih(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Di(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function vs(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const ef = (e) => () => e;
function bI(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function wI(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function xI(e) {
  return (e = +e) == 1 ? sg : function(t, r) {
    return r - t ? wI(t, r, e) : ef(isNaN(t) ? r : t);
  };
}
function sg(e, t) {
  var r = t - e;
  return r ? bI(e, r) : ef(isNaN(e) ? t : e);
}
const Dh = function e(t) {
  var r = xI(t);
  function n(a, i) {
    var o = r((a = wl(a)).r, (i = wl(i)).r), c = r(a.g, i.g), s = r(a.b, i.b), l = sg(a.opacity, i.opacity);
    return function(f) {
      return a.r = o(f), a.g = c(f), a.b = s(f), a.opacity = l(f), a + "";
    };
  }
  return n.gamma = e, n;
}(1);
function OI(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), a;
  return function(i) {
    for (a = 0; a < r; ++a) n[a] = e[a] * (1 - i) + t[a] * i;
    return n;
  };
}
function SI(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function PI(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, a = new Array(n), i = new Array(r), o;
  for (o = 0; o < n; ++o) a[o] = ca(e[o], t[o]);
  for (; o < r; ++o) i[o] = t[o];
  return function(c) {
    for (o = 0; o < n; ++o) i[o] = a[o](c);
    return i;
  };
}
function _I(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function bo(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function AI(e, t) {
  var r = {}, n = {}, a;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (a in t)
    a in e ? r[a] = ca(e[a], t[a]) : n[a] = t[a];
  return function(i) {
    for (a in r) n[a] = r[a](i);
    return n;
  };
}
var xl = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ms = new RegExp(xl.source, "g");
function EI(e) {
  return function() {
    return e;
  };
}
function TI(e) {
  return function(t) {
    return e(t) + "";
  };
}
function $I(e, t) {
  var r = xl.lastIndex = ms.lastIndex = 0, n, a, i, o = -1, c = [], s = [];
  for (e = e + "", t = t + ""; (n = xl.exec(e)) && (a = ms.exec(t)); )
    (i = a.index) > r && (i = t.slice(r, i), c[o] ? c[o] += i : c[++o] = i), (n = n[0]) === (a = a[0]) ? c[o] ? c[o] += a : c[++o] = a : (c[++o] = null, s.push({ i: o, x: bo(n, a) })), r = ms.lastIndex;
  return r < t.length && (i = t.slice(r), c[o] ? c[o] += i : c[++o] = i), c.length < 2 ? s[0] ? TI(s[0].x) : EI(t) : (t = s.length, function(l) {
    for (var f = 0, u; f < t; ++f) c[(u = s[f]).i] = u.x(l);
    return c.join("");
  });
}
function ca(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? ef(t) : (r === "number" ? bo : r === "string" ? (n = Va(t)) ? (t = n, Dh) : $I : t instanceof Va ? Dh : t instanceof Date ? _I : SI(t) ? OI : Array.isArray(t) ? PI : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? AI : bo)(e, t);
}
function tf(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function CI(e, t) {
  t === void 0 && (t = e, e = ca);
  for (var r = 0, n = t.length - 1, a = t[0], i = new Array(n < 0 ? 0 : n); r < n; ) i[r] = e(a, a = t[++r]);
  return function(o) {
    var c = Math.max(0, Math.min(n - 1, Math.floor(o *= n)));
    return i[c](o - c);
  };
}
function MI(e) {
  return function() {
    return e;
  };
}
function wo(e) {
  return +e;
}
var Rh = [0, 1];
function et(e) {
  return e;
}
function Ol(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : MI(isNaN(t) ? NaN : 0.5);
}
function jI(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function NI(e, t, r) {
  var n = e[0], a = e[1], i = t[0], o = t[1];
  return a < n ? (n = Ol(a, n), i = r(o, i)) : (n = Ol(n, a), i = r(i, o)), function(c) {
    return i(n(c));
  };
}
function kI(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, a = new Array(n), i = new Array(n), o = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < n; )
    a[o] = Ol(e[o], e[o + 1]), i[o] = r(t[o], t[o + 1]);
  return function(c) {
    var s = xi(e, c, 1, n) - 1;
    return i[s](a[s](c));
  };
}
function Si(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function xc() {
  var e = Rh, t = Rh, r = ca, n, a, i, o = et, c, s, l;
  function f() {
    var d = Math.min(e.length, t.length);
    return o !== et && (o = jI(e[0], e[d - 1])), c = d > 2 ? kI : NI, s = l = null, u;
  }
  function u(d) {
    return d == null || isNaN(d = +d) ? i : (s || (s = c(e.map(n), t, r)))(n(o(d)));
  }
  return u.invert = function(d) {
    return o(a((l || (l = c(t, e.map(n), bo)))(d)));
  }, u.domain = function(d) {
    return arguments.length ? (e = Array.from(d, wo), f()) : e.slice();
  }, u.range = function(d) {
    return arguments.length ? (t = Array.from(d), f()) : t.slice();
  }, u.rangeRound = function(d) {
    return t = Array.from(d), r = tf, f();
  }, u.clamp = function(d) {
    return arguments.length ? (o = d ? !0 : et, f()) : o !== et;
  }, u.interpolate = function(d) {
    return arguments.length ? (r = d, f()) : r;
  }, u.unknown = function(d) {
    return arguments.length ? (i = d, u) : i;
  }, function(d, h) {
    return n = d, a = h, f();
  };
}
function rf() {
  return xc()(et, et);
}
function II(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function xo(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function En(e) {
  return e = xo(Math.abs(e)), e ? e[1] : NaN;
}
function DI(e, t) {
  return function(r, n) {
    for (var a = r.length, i = [], o = 0, c = e[0], s = 0; a > 0 && c > 0 && (s + c + 1 > n && (c = Math.max(1, n - s)), i.push(r.substring(a -= c, a + c)), !((s += c + 1) > n)); )
      c = e[o = (o + 1) % e.length];
    return i.reverse().join(t);
  };
}
function RI(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var LI = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function qa(e) {
  if (!(t = LI.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new nf({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  });
}
qa.prototype = nf.prototype;
function nf(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
nf.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function FI(e) {
  e: for (var t = e.length, r = 1, n = -1, a; r < t; ++r)
    switch (e[r]) {
      case ".":
        n = a = r;
        break;
      case "0":
        n === 0 && (n = r), a = r;
        break;
      default:
        if (!+e[r]) break e;
        n > 0 && (n = 0);
        break;
    }
  return n > 0 ? e.slice(0, n) + e.slice(a + 1) : e;
}
var Oo;
function BI(e, t) {
  var r = xo(e, t);
  if (!r) return Oo = void 0, e.toPrecision(t);
  var n = r[0], a = r[1], i = a - (Oo = Math.max(-8, Math.min(8, Math.floor(a / 3))) * 3) + 1, o = n.length;
  return i === o ? n : i > o ? n + new Array(i - o + 1).join("0") : i > 0 ? n.slice(0, i) + "." + n.slice(i) : "0." + new Array(1 - i).join("0") + xo(e, Math.max(0, t + i - 1))[0];
}
function Lh(e, t) {
  var r = xo(e, t);
  if (!r) return e + "";
  var n = r[0], a = r[1];
  return a < 0 ? "0." + new Array(-a).join("0") + n : n.length > a + 1 ? n.slice(0, a + 1) + "." + n.slice(a + 1) : n + new Array(a - n.length + 2).join("0");
}
const Fh = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: II,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => Lh(e * 100, t),
  r: Lh,
  s: BI,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function Bh(e) {
  return e;
}
var zh = Array.prototype.map, Wh = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function zI(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Bh : DI(zh.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", a = e.decimal === void 0 ? "." : e.decimal + "", i = e.numerals === void 0 ? Bh : RI(zh.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", c = e.minus === void 0 ? "−" : e.minus + "", s = e.nan === void 0 ? "NaN" : e.nan + "";
  function l(u, d) {
    u = qa(u);
    var h = u.fill, m = u.align, v = u.sign, p = u.symbol, b = u.zero, g = u.width, O = u.comma, S = u.precision, y = u.trim, w = u.type;
    w === "n" ? (O = !0, w = "g") : Fh[w] || (S === void 0 && (S = 12), y = !0, w = "g"), (b || h === "0" && m === "=") && (b = !0, h = "0", m = "=");
    var P = (d && d.prefix !== void 0 ? d.prefix : "") + (p === "$" ? r : p === "#" && /[boxX]/.test(w) ? "0" + w.toLowerCase() : ""), _ = (p === "$" ? n : /[%p]/.test(w) ? o : "") + (d && d.suffix !== void 0 ? d.suffix : ""), $ = Fh[w], E = /[defgprs%]/.test(w);
    S = S === void 0 ? 6 : /[gprs]/.test(w) ? Math.max(1, Math.min(21, S)) : Math.max(0, Math.min(20, S));
    function j(C) {
      var D = P, I = _, R, F, k;
      if (w === "c")
        I = $(C) + I, C = "";
      else {
        C = +C;
        var z = C < 0 || 1 / C < 0;
        if (C = isNaN(C) ? s : $(Math.abs(C), S), y && (C = FI(C)), z && +C == 0 && v !== "+" && (z = !1), D = (z ? v === "(" ? v : c : v === "-" || v === "(" ? "" : v) + D, I = (w === "s" && !isNaN(C) && Oo !== void 0 ? Wh[8 + Oo / 3] : "") + I + (z && v === "(" ? ")" : ""), E) {
          for (R = -1, F = C.length; ++R < F; )
            if (k = C.charCodeAt(R), 48 > k || k > 57) {
              I = (k === 46 ? a + C.slice(R + 1) : C.slice(R)) + I, C = C.slice(0, R);
              break;
            }
        }
      }
      O && !b && (C = t(C, 1 / 0));
      var V = D.length + C.length + I.length, N = V < g ? new Array(g - V + 1).join(h) : "";
      switch (O && b && (C = t(N + C, N.length ? g - I.length : 1 / 0), N = ""), m) {
        case "<":
          C = D + C + I + N;
          break;
        case "=":
          C = D + N + C + I;
          break;
        case "^":
          C = N.slice(0, V = N.length >> 1) + D + C + I + N.slice(V);
          break;
        default:
          C = N + D + C + I;
          break;
      }
      return i(C);
    }
    return j.toString = function() {
      return u + "";
    }, j;
  }
  function f(u, d) {
    var h = Math.max(-8, Math.min(8, Math.floor(En(d) / 3))) * 3, m = Math.pow(10, -h), v = l((u = qa(u), u.type = "f", u), { suffix: Wh[8 + h / 3] });
    return function(p) {
      return v(m * p);
    };
  }
  return {
    format: l,
    formatPrefix: f
  };
}
var Ri, af, lg;
WI({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function WI(e) {
  return Ri = zI(e), af = Ri.format, lg = Ri.formatPrefix, Ri;
}
function UI(e) {
  return Math.max(0, -En(Math.abs(e)));
}
function VI(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(En(t) / 3))) * 3 - En(Math.abs(e)));
}
function qI(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, En(t) - En(e)) + 1;
}
function ug(e, t, r, n) {
  var a = gl(e, t, r), i;
  switch (n = qa(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(i = VI(a, o)) && (n.precision = i), lg(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(i = qI(a, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = i - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(i = UI(a)) && (n.precision = i - (n.type === "%") * 2);
      break;
    }
  }
  return af(n);
}
function Sr(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return ml(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var a = t();
    return ug(a[0], a[a.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), a = 0, i = n.length - 1, o = n[a], c = n[i], s, l, f = 10;
    for (c < o && (l = o, o = c, c = l, l = a, a = i, i = l); f-- > 0; ) {
      if (l = yl(o, c, r), l === s)
        return n[a] = o, n[i] = c, t(n);
      if (l > 0)
        o = Math.floor(o / l) * l, c = Math.ceil(c / l) * l;
      else if (l < 0)
        o = Math.ceil(o * l) / l, c = Math.floor(c * l) / l;
      else
        break;
      s = l;
    }
    return e;
  }, e;
}
function So() {
  var e = rf();
  return e.copy = function() {
    return Si(e, So());
  }, wt.apply(e, arguments), Sr(e);
}
function fg(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, wo), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return fg(e).unknown(t);
  }, e = arguments.length ? Array.from(e, wo) : [0, 1], Sr(r);
}
function dg(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, a = e[r], i = e[n], o;
  return i < a && (o = r, r = n, n = o, o = a, a = i, i = o), e[r] = t.floor(a), e[n] = t.ceil(i), e;
}
function Uh(e) {
  return Math.log(e);
}
function Vh(e) {
  return Math.exp(e);
}
function HI(e) {
  return -Math.log(-e);
}
function GI(e) {
  return -Math.exp(-e);
}
function YI(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function KI(e) {
  return e === 10 ? YI : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function XI(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function qh(e) {
  return (t, r) => -e(-t, r);
}
function of(e) {
  const t = e(Uh, Vh), r = t.domain;
  let n = 10, a, i;
  function o() {
    return a = XI(n), i = KI(n), r()[0] < 0 ? (a = qh(a), i = qh(i), e(HI, GI)) : e(Uh, Vh), t;
  }
  return t.base = function(c) {
    return arguments.length ? (n = +c, o()) : n;
  }, t.domain = function(c) {
    return arguments.length ? (r(c), o()) : r();
  }, t.ticks = (c) => {
    const s = r();
    let l = s[0], f = s[s.length - 1];
    const u = f < l;
    u && ([l, f] = [f, l]);
    let d = a(l), h = a(f), m, v;
    const p = c == null ? 10 : +c;
    let b = [];
    if (!(n % 1) && h - d < p) {
      if (d = Math.floor(d), h = Math.ceil(h), l > 0) {
        for (; d <= h; ++d)
          for (m = 1; m < n; ++m)
            if (v = d < 0 ? m / i(-d) : m * i(d), !(v < l)) {
              if (v > f) break;
              b.push(v);
            }
      } else for (; d <= h; ++d)
        for (m = n - 1; m >= 1; --m)
          if (v = d > 0 ? m / i(-d) : m * i(d), !(v < l)) {
            if (v > f) break;
            b.push(v);
          }
      b.length * 2 < p && (b = ml(l, f, p));
    } else
      b = ml(d, h, Math.min(h - d, p)).map(i);
    return u ? b.reverse() : b;
  }, t.tickFormat = (c, s) => {
    if (c == null && (c = 10), s == null && (s = n === 10 ? "s" : ","), typeof s != "function" && (!(n % 1) && (s = qa(s)).precision == null && (s.trim = !0), s = af(s)), c === 1 / 0) return s;
    const l = Math.max(1, n * c / t.ticks().length);
    return (f) => {
      let u = f / i(Math.round(a(f)));
      return u * n < n - 0.5 && (u *= n), u <= l ? s(f) : "";
    };
  }, t.nice = () => r(dg(r(), {
    floor: (c) => i(Math.floor(a(c))),
    ceil: (c) => i(Math.ceil(a(c)))
  })), t;
}
function hg() {
  const e = of(xc()).domain([1, 10]);
  return e.copy = () => Si(e, hg()).base(e.base()), wt.apply(e, arguments), e;
}
function Hh(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function Gh(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function cf(e) {
  var t = 1, r = e(Hh(t), Gh(t));
  return r.constant = function(n) {
    return arguments.length ? e(Hh(t = +n), Gh(t)) : t;
  }, Sr(r);
}
function pg() {
  var e = cf(xc());
  return e.copy = function() {
    return Si(e, pg()).constant(e.constant());
  }, wt.apply(e, arguments);
}
function Yh(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function ZI(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function JI(e) {
  return e < 0 ? -e * e : e * e;
}
function sf(e) {
  var t = e(et, et), r = 1;
  function n() {
    return r === 1 ? e(et, et) : r === 0.5 ? e(ZI, JI) : e(Yh(r), Yh(1 / r));
  }
  return t.exponent = function(a) {
    return arguments.length ? (r = +a, n()) : r;
  }, Sr(t);
}
function lf() {
  var e = sf(xc());
  return e.copy = function() {
    return Si(e, lf()).exponent(e.exponent());
  }, wt.apply(e, arguments), e;
}
function QI() {
  return lf.apply(null, arguments).exponent(0.5);
}
function Kh(e) {
  return Math.sign(e) * e * e;
}
function eD(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function vg() {
  var e = rf(), t = [0, 1], r = !1, n;
  function a(i) {
    var o = eD(e(i));
    return isNaN(o) ? n : r ? Math.round(o) : o;
  }
  return a.invert = function(i) {
    return e.invert(Kh(i));
  }, a.domain = function(i) {
    return arguments.length ? (e.domain(i), a) : e.domain();
  }, a.range = function(i) {
    return arguments.length ? (e.range((t = Array.from(i, wo)).map(Kh)), a) : t.slice();
  }, a.rangeRound = function(i) {
    return a.range(i).round(!0);
  }, a.round = function(i) {
    return arguments.length ? (r = !!i, a) : r;
  }, a.clamp = function(i) {
    return arguments.length ? (e.clamp(i), a) : e.clamp();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return vg(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, wt.apply(a, arguments), Sr(a);
}
function mg() {
  var e = [], t = [], r = [], n;
  function a() {
    var o = 0, c = Math.max(1, t.length);
    for (r = new Array(c - 1); ++o < c; ) r[o - 1] = iI(e, o / c);
    return i;
  }
  function i(o) {
    return o == null || isNaN(o = +o) ? n : t[xi(r, o)];
  }
  return i.invertExtent = function(o) {
    var c = t.indexOf(o);
    return c < 0 ? [NaN, NaN] : [
      c > 0 ? r[c - 1] : e[0],
      c < r.length ? r[c] : e[e.length - 1]
    ];
  }, i.domain = function(o) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let c of o) c != null && !isNaN(c = +c) && e.push(c);
    return e.sort(mr), a();
  }, i.range = function(o) {
    return arguments.length ? (t = Array.from(o), a()) : t.slice();
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n;
  }, i.quantiles = function() {
    return r.slice();
  }, i.copy = function() {
    return mg().domain(e).range(t).unknown(n);
  }, wt.apply(i, arguments);
}
function yg() {
  var e = 0, t = 1, r = 1, n = [0.5], a = [0, 1], i;
  function o(s) {
    return s != null && s <= s ? a[xi(n, s, 0, r)] : i;
  }
  function c() {
    var s = -1;
    for (n = new Array(r); ++s < r; ) n[s] = ((s + 1) * t - (s - r) * e) / (r + 1);
    return o;
  }
  return o.domain = function(s) {
    return arguments.length ? ([e, t] = s, e = +e, t = +t, c()) : [e, t];
  }, o.range = function(s) {
    return arguments.length ? (r = (a = Array.from(s)).length - 1, c()) : a.slice();
  }, o.invertExtent = function(s) {
    var l = a.indexOf(s);
    return l < 0 ? [NaN, NaN] : l < 1 ? [e, n[0]] : l >= r ? [n[r - 1], t] : [n[l - 1], n[l]];
  }, o.unknown = function(s) {
    return arguments.length && (i = s), o;
  }, o.thresholds = function() {
    return n.slice();
  }, o.copy = function() {
    return yg().domain([e, t]).range(a).unknown(i);
  }, wt.apply(Sr(o), arguments);
}
function gg() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function a(i) {
    return i != null && i <= i ? t[xi(e, i, 0, n)] : r;
  }
  return a.domain = function(i) {
    return arguments.length ? (e = Array.from(i), n = Math.min(e.length, t.length - 1), a) : e.slice();
  }, a.range = function(i) {
    return arguments.length ? (t = Array.from(i), n = Math.min(e.length, t.length - 1), a) : t.slice();
  }, a.invertExtent = function(i) {
    var o = t.indexOf(i);
    return [e[o - 1], e[o]];
  }, a.unknown = function(i) {
    return arguments.length ? (r = i, a) : r;
  }, a.copy = function() {
    return gg().domain(e).range(t).unknown(r);
  }, wt.apply(a, arguments);
}
const ys = /* @__PURE__ */ new Date(), gs = /* @__PURE__ */ new Date();
function Ve(e, t, r, n) {
  function a(i) {
    return e(i = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+i)), i;
  }
  return a.floor = (i) => (e(i = /* @__PURE__ */ new Date(+i)), i), a.ceil = (i) => (e(i = new Date(i - 1)), t(i, 1), e(i), i), a.round = (i) => {
    const o = a(i), c = a.ceil(i);
    return i - o < c - i ? o : c;
  }, a.offset = (i, o) => (t(i = /* @__PURE__ */ new Date(+i), o == null ? 1 : Math.floor(o)), i), a.range = (i, o, c) => {
    const s = [];
    if (i = a.ceil(i), c = c == null ? 1 : Math.floor(c), !(i < o) || !(c > 0)) return s;
    let l;
    do
      s.push(l = /* @__PURE__ */ new Date(+i)), t(i, c), e(i);
    while (l < i && i < o);
    return s;
  }, a.filter = (i) => Ve((o) => {
    if (o >= o) for (; e(o), !i(o); ) o.setTime(o - 1);
  }, (o, c) => {
    if (o >= o)
      if (c < 0) for (; ++c <= 0; )
        for (; t(o, -1), !i(o); )
          ;
      else for (; --c >= 0; )
        for (; t(o, 1), !i(o); )
          ;
  }), r && (a.count = (i, o) => (ys.setTime(+i), gs.setTime(+o), e(ys), e(gs), Math.floor(r(ys, gs))), a.every = (i) => (i = Math.floor(i), !isFinite(i) || !(i > 0) ? null : i > 1 ? a.filter(n ? (o) => n(o) % i === 0 : (o) => a.count(0, o) % i === 0) : a)), a;
}
const Po = Ve(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
Po.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Ve((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, r) => {
  t.setTime(+t + r * e);
}, (t, r) => (r - t) / e) : Po);
Po.range;
const Ht = 1e3, vt = Ht * 60, Gt = vt * 60, er = Gt * 24, uf = er * 7, Xh = er * 30, bs = er * 365, Lr = Ve((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * Ht);
}, (e, t) => (t - e) / Ht, (e) => e.getUTCSeconds());
Lr.range;
const ff = Ve((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * Ht);
}, (e, t) => {
  e.setTime(+e + t * vt);
}, (e, t) => (t - e) / vt, (e) => e.getMinutes());
ff.range;
const df = Ve((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * vt);
}, (e, t) => (t - e) / vt, (e) => e.getUTCMinutes());
df.range;
const hf = Ve((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * Ht - e.getMinutes() * vt);
}, (e, t) => {
  e.setTime(+e + t * Gt);
}, (e, t) => (t - e) / Gt, (e) => e.getHours());
hf.range;
const pf = Ve((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * Gt);
}, (e, t) => (t - e) / Gt, (e) => e.getUTCHours());
pf.range;
const Pi = Ve(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * vt) / er,
  (e) => e.getDate() - 1
);
Pi.range;
const Oc = Ve((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / er, (e) => e.getUTCDate() - 1);
Oc.range;
const bg = Ve((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / er, (e) => Math.floor(e / er));
bg.range;
function Qr(e) {
  return Ve((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * vt) / uf);
}
const Sc = Qr(0), _o = Qr(1), tD = Qr(2), rD = Qr(3), Tn = Qr(4), nD = Qr(5), aD = Qr(6);
Sc.range;
_o.range;
tD.range;
rD.range;
Tn.range;
nD.range;
aD.range;
function en(e) {
  return Ve((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / uf);
}
const Pc = en(0), Ao = en(1), iD = en(2), oD = en(3), $n = en(4), cD = en(5), sD = en(6);
Pc.range;
Ao.range;
iD.range;
oD.range;
$n.range;
cD.range;
sD.range;
const vf = Ve((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
vf.range;
const mf = Ve((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
mf.range;
const tr = Ve((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
tr.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Ve((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e);
});
tr.range;
const rr = Ve((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
rr.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Ve((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e);
});
rr.range;
function wg(e, t, r, n, a, i) {
  const o = [
    [Lr, 1, Ht],
    [Lr, 5, 5 * Ht],
    [Lr, 15, 15 * Ht],
    [Lr, 30, 30 * Ht],
    [i, 1, vt],
    [i, 5, 5 * vt],
    [i, 15, 15 * vt],
    [i, 30, 30 * vt],
    [a, 1, Gt],
    [a, 3, 3 * Gt],
    [a, 6, 6 * Gt],
    [a, 12, 12 * Gt],
    [n, 1, er],
    [n, 2, 2 * er],
    [r, 1, uf],
    [t, 1, Xh],
    [t, 3, 3 * Xh],
    [e, 1, bs]
  ];
  function c(l, f, u) {
    const d = f < l;
    d && ([l, f] = [f, l]);
    const h = u && typeof u.range == "function" ? u : s(l, f, u), m = h ? h.range(l, +f + 1) : [];
    return d ? m.reverse() : m;
  }
  function s(l, f, u) {
    const d = Math.abs(f - l) / u, h = Zu(([, , p]) => p).right(o, d);
    if (h === o.length) return e.every(gl(l / bs, f / bs, u));
    if (h === 0) return Po.every(Math.max(gl(l, f, u), 1));
    const [m, v] = o[d / o[h - 1][2] < o[h][2] / d ? h - 1 : h];
    return m.every(v);
  }
  return [c, s];
}
const [lD, uD] = wg(rr, mf, Pc, bg, pf, df), [fD, dD] = wg(tr, vf, Sc, Pi, hf, ff);
function ws(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function xs(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function pa(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function hD(e) {
  var t = e.dateTime, r = e.date, n = e.time, a = e.periods, i = e.days, o = e.shortDays, c = e.months, s = e.shortMonths, l = va(a), f = ma(a), u = va(i), d = ma(i), h = va(o), m = ma(o), v = va(c), p = ma(c), b = va(s), g = ma(s), O = {
    a: k,
    A: z,
    b: V,
    B: N,
    c: null,
    d: rp,
    e: rp,
    f: DD,
    g: HD,
    G: YD,
    H: ND,
    I: kD,
    j: ID,
    L: xg,
    m: RD,
    M: LD,
    p: B,
    q: W,
    Q: ip,
    s: op,
    S: FD,
    u: BD,
    U: zD,
    V: WD,
    w: UD,
    W: VD,
    x: null,
    X: null,
    y: qD,
    Y: GD,
    Z: KD,
    "%": ap
  }, S = {
    a: Y,
    A: X,
    b: ee,
    B: re,
    c: null,
    d: np,
    e: np,
    f: QD,
    g: lR,
    G: fR,
    H: XD,
    I: ZD,
    j: JD,
    L: Sg,
    m: eR,
    M: tR,
    p: oe,
    q: ae,
    Q: ip,
    s: op,
    S: rR,
    u: nR,
    U: aR,
    V: iR,
    w: oR,
    W: cR,
    x: null,
    X: null,
    y: sR,
    Y: uR,
    Z: dR,
    "%": ap
  }, y = {
    a: E,
    A: j,
    b: C,
    B: D,
    c: I,
    d: ep,
    e: ep,
    f: $D,
    g: Qh,
    G: Jh,
    H: tp,
    I: tp,
    j: _D,
    L: TD,
    m: PD,
    M: AD,
    p: $,
    q: SD,
    Q: MD,
    s: jD,
    S: ED,
    u: gD,
    U: bD,
    V: wD,
    w: yD,
    W: xD,
    x: R,
    X: F,
    y: Qh,
    Y: Jh,
    Z: OD,
    "%": CD
  };
  O.x = w(r, O), O.X = w(n, O), O.c = w(t, O), S.x = w(r, S), S.X = w(n, S), S.c = w(t, S);
  function w(U, K) {
    return function(Q) {
      var M = [], fe = -1, G = 0, Ee = U.length, ke, Ye, sr;
      for (Q instanceof Date || (Q = /* @__PURE__ */ new Date(+Q)); ++fe < Ee; )
        U.charCodeAt(fe) === 37 && (M.push(U.slice(G, fe)), (Ye = Zh[ke = U.charAt(++fe)]) != null ? ke = U.charAt(++fe) : Ye = ke === "e" ? " " : "0", (sr = K[ke]) && (ke = sr(Q, Ye)), M.push(ke), G = fe + 1);
      return M.push(U.slice(G, fe)), M.join("");
    };
  }
  function P(U, K) {
    return function(Q) {
      var M = pa(1900, void 0, 1), fe = _(M, U, Q += "", 0), G, Ee;
      if (fe != Q.length) return null;
      if ("Q" in M) return new Date(M.Q);
      if ("s" in M) return new Date(M.s * 1e3 + ("L" in M ? M.L : 0));
      if (K && !("Z" in M) && (M.Z = 0), "p" in M && (M.H = M.H % 12 + M.p * 12), M.m === void 0 && (M.m = "q" in M ? M.q : 0), "V" in M) {
        if (M.V < 1 || M.V > 53) return null;
        "w" in M || (M.w = 1), "Z" in M ? (G = xs(pa(M.y, 0, 1)), Ee = G.getUTCDay(), G = Ee > 4 || Ee === 0 ? Ao.ceil(G) : Ao(G), G = Oc.offset(G, (M.V - 1) * 7), M.y = G.getUTCFullYear(), M.m = G.getUTCMonth(), M.d = G.getUTCDate() + (M.w + 6) % 7) : (G = ws(pa(M.y, 0, 1)), Ee = G.getDay(), G = Ee > 4 || Ee === 0 ? _o.ceil(G) : _o(G), G = Pi.offset(G, (M.V - 1) * 7), M.y = G.getFullYear(), M.m = G.getMonth(), M.d = G.getDate() + (M.w + 6) % 7);
      } else ("W" in M || "U" in M) && ("w" in M || (M.w = "u" in M ? M.u % 7 : "W" in M ? 1 : 0), Ee = "Z" in M ? xs(pa(M.y, 0, 1)).getUTCDay() : ws(pa(M.y, 0, 1)).getDay(), M.m = 0, M.d = "W" in M ? (M.w + 6) % 7 + M.W * 7 - (Ee + 5) % 7 : M.w + M.U * 7 - (Ee + 6) % 7);
      return "Z" in M ? (M.H += M.Z / 100 | 0, M.M += M.Z % 100, xs(M)) : ws(M);
    };
  }
  function _(U, K, Q, M) {
    for (var fe = 0, G = K.length, Ee = Q.length, ke, Ye; fe < G; ) {
      if (M >= Ee) return -1;
      if (ke = K.charCodeAt(fe++), ke === 37) {
        if (ke = K.charAt(fe++), Ye = y[ke in Zh ? K.charAt(fe++) : ke], !Ye || (M = Ye(U, Q, M)) < 0) return -1;
      } else if (ke != Q.charCodeAt(M++))
        return -1;
    }
    return M;
  }
  function $(U, K, Q) {
    var M = l.exec(K.slice(Q));
    return M ? (U.p = f.get(M[0].toLowerCase()), Q + M[0].length) : -1;
  }
  function E(U, K, Q) {
    var M = h.exec(K.slice(Q));
    return M ? (U.w = m.get(M[0].toLowerCase()), Q + M[0].length) : -1;
  }
  function j(U, K, Q) {
    var M = u.exec(K.slice(Q));
    return M ? (U.w = d.get(M[0].toLowerCase()), Q + M[0].length) : -1;
  }
  function C(U, K, Q) {
    var M = b.exec(K.slice(Q));
    return M ? (U.m = g.get(M[0].toLowerCase()), Q + M[0].length) : -1;
  }
  function D(U, K, Q) {
    var M = v.exec(K.slice(Q));
    return M ? (U.m = p.get(M[0].toLowerCase()), Q + M[0].length) : -1;
  }
  function I(U, K, Q) {
    return _(U, t, K, Q);
  }
  function R(U, K, Q) {
    return _(U, r, K, Q);
  }
  function F(U, K, Q) {
    return _(U, n, K, Q);
  }
  function k(U) {
    return o[U.getDay()];
  }
  function z(U) {
    return i[U.getDay()];
  }
  function V(U) {
    return s[U.getMonth()];
  }
  function N(U) {
    return c[U.getMonth()];
  }
  function B(U) {
    return a[+(U.getHours() >= 12)];
  }
  function W(U) {
    return 1 + ~~(U.getMonth() / 3);
  }
  function Y(U) {
    return o[U.getUTCDay()];
  }
  function X(U) {
    return i[U.getUTCDay()];
  }
  function ee(U) {
    return s[U.getUTCMonth()];
  }
  function re(U) {
    return c[U.getUTCMonth()];
  }
  function oe(U) {
    return a[+(U.getUTCHours() >= 12)];
  }
  function ae(U) {
    return 1 + ~~(U.getUTCMonth() / 3);
  }
  return {
    format: function(U) {
      var K = w(U += "", O);
      return K.toString = function() {
        return U;
      }, K;
    },
    parse: function(U) {
      var K = P(U += "", !1);
      return K.toString = function() {
        return U;
      }, K;
    },
    utcFormat: function(U) {
      var K = w(U += "", S);
      return K.toString = function() {
        return U;
      }, K;
    },
    utcParse: function(U) {
      var K = P(U += "", !0);
      return K.toString = function() {
        return U;
      }, K;
    }
  };
}
var Zh = { "-": "", _: " ", 0: "0" }, Ge = /^\s*\d+/, pD = /^%/, vD = /[\\^$*+?|[\]().{}]/g;
function me(e, t, r) {
  var n = e < 0 ? "-" : "", a = (n ? -e : e) + "", i = a.length;
  return n + (i < r ? new Array(r - i + 1).join(t) + a : a);
}
function mD(e) {
  return e.replace(vD, "\\$&");
}
function va(e) {
  return new RegExp("^(?:" + e.map(mD).join("|") + ")", "i");
}
function ma(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function yD(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function gD(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function bD(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function wD(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function xD(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function Jh(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function Qh(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function OD(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function SD(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function PD(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function ep(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function _D(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function tp(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function AD(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function ED(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function TD(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function $D(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function CD(e, t, r) {
  var n = pD.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function MD(e, t, r) {
  var n = Ge.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function jD(e, t, r) {
  var n = Ge.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function rp(e, t) {
  return me(e.getDate(), t, 2);
}
function ND(e, t) {
  return me(e.getHours(), t, 2);
}
function kD(e, t) {
  return me(e.getHours() % 12 || 12, t, 2);
}
function ID(e, t) {
  return me(1 + Pi.count(tr(e), e), t, 3);
}
function xg(e, t) {
  return me(e.getMilliseconds(), t, 3);
}
function DD(e, t) {
  return xg(e, t) + "000";
}
function RD(e, t) {
  return me(e.getMonth() + 1, t, 2);
}
function LD(e, t) {
  return me(e.getMinutes(), t, 2);
}
function FD(e, t) {
  return me(e.getSeconds(), t, 2);
}
function BD(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function zD(e, t) {
  return me(Sc.count(tr(e) - 1, e), t, 2);
}
function Og(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? Tn(e) : Tn.ceil(e);
}
function WD(e, t) {
  return e = Og(e), me(Tn.count(tr(e), e) + (tr(e).getDay() === 4), t, 2);
}
function UD(e) {
  return e.getDay();
}
function VD(e, t) {
  return me(_o.count(tr(e) - 1, e), t, 2);
}
function qD(e, t) {
  return me(e.getFullYear() % 100, t, 2);
}
function HD(e, t) {
  return e = Og(e), me(e.getFullYear() % 100, t, 2);
}
function GD(e, t) {
  return me(e.getFullYear() % 1e4, t, 4);
}
function YD(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? Tn(e) : Tn.ceil(e), me(e.getFullYear() % 1e4, t, 4);
}
function KD(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + me(t / 60 | 0, "0", 2) + me(t % 60, "0", 2);
}
function np(e, t) {
  return me(e.getUTCDate(), t, 2);
}
function XD(e, t) {
  return me(e.getUTCHours(), t, 2);
}
function ZD(e, t) {
  return me(e.getUTCHours() % 12 || 12, t, 2);
}
function JD(e, t) {
  return me(1 + Oc.count(rr(e), e), t, 3);
}
function Sg(e, t) {
  return me(e.getUTCMilliseconds(), t, 3);
}
function QD(e, t) {
  return Sg(e, t) + "000";
}
function eR(e, t) {
  return me(e.getUTCMonth() + 1, t, 2);
}
function tR(e, t) {
  return me(e.getUTCMinutes(), t, 2);
}
function rR(e, t) {
  return me(e.getUTCSeconds(), t, 2);
}
function nR(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function aR(e, t) {
  return me(Pc.count(rr(e) - 1, e), t, 2);
}
function Pg(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? $n(e) : $n.ceil(e);
}
function iR(e, t) {
  return e = Pg(e), me($n.count(rr(e), e) + (rr(e).getUTCDay() === 4), t, 2);
}
function oR(e) {
  return e.getUTCDay();
}
function cR(e, t) {
  return me(Ao.count(rr(e) - 1, e), t, 2);
}
function sR(e, t) {
  return me(e.getUTCFullYear() % 100, t, 2);
}
function lR(e, t) {
  return e = Pg(e), me(e.getUTCFullYear() % 100, t, 2);
}
function uR(e, t) {
  return me(e.getUTCFullYear() % 1e4, t, 4);
}
function fR(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? $n(e) : $n.ceil(e), me(e.getUTCFullYear() % 1e4, t, 4);
}
function dR() {
  return "+0000";
}
function ap() {
  return "%";
}
function ip(e) {
  return +e;
}
function op(e) {
  return Math.floor(+e / 1e3);
}
var on, _g, Ag;
hR({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function hR(e) {
  return on = hD(e), _g = on.format, on.parse, Ag = on.utcFormat, on.utcParse, on;
}
function pR(e) {
  return new Date(e);
}
function vR(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function yf(e, t, r, n, a, i, o, c, s, l) {
  var f = rf(), u = f.invert, d = f.domain, h = l(".%L"), m = l(":%S"), v = l("%I:%M"), p = l("%I %p"), b = l("%a %d"), g = l("%b %d"), O = l("%B"), S = l("%Y");
  function y(w) {
    return (s(w) < w ? h : c(w) < w ? m : o(w) < w ? v : i(w) < w ? p : n(w) < w ? a(w) < w ? b : g : r(w) < w ? O : S)(w);
  }
  return f.invert = function(w) {
    return new Date(u(w));
  }, f.domain = function(w) {
    return arguments.length ? d(Array.from(w, vR)) : d().map(pR);
  }, f.ticks = function(w) {
    var P = d();
    return e(P[0], P[P.length - 1], w ?? 10);
  }, f.tickFormat = function(w, P) {
    return P == null ? y : l(P);
  }, f.nice = function(w) {
    var P = d();
    return (!w || typeof w.range != "function") && (w = t(P[0], P[P.length - 1], w ?? 10)), w ? d(dg(P, w)) : f;
  }, f.copy = function() {
    return Si(f, yf(e, t, r, n, a, i, o, c, s, l));
  }, f;
}
function mR() {
  return wt.apply(yf(fD, dD, tr, vf, Sc, Pi, hf, ff, Lr, _g).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function yR() {
  return wt.apply(yf(lD, uD, rr, mf, Pc, Oc, pf, df, Lr, Ag).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function _c() {
  var e = 0, t = 1, r, n, a, i, o = et, c = !1, s;
  function l(u) {
    return u == null || isNaN(u = +u) ? s : o(a === 0 ? 0.5 : (u = (i(u) - r) * a, c ? Math.max(0, Math.min(1, u)) : u));
  }
  l.domain = function(u) {
    return arguments.length ? ([e, t] = u, r = i(e = +e), n = i(t = +t), a = r === n ? 0 : 1 / (n - r), l) : [e, t];
  }, l.clamp = function(u) {
    return arguments.length ? (c = !!u, l) : c;
  }, l.interpolator = function(u) {
    return arguments.length ? (o = u, l) : o;
  };
  function f(u) {
    return function(d) {
      var h, m;
      return arguments.length ? ([h, m] = d, o = u(h, m), l) : [o(0), o(1)];
    };
  }
  return l.range = f(ca), l.rangeRound = f(tf), l.unknown = function(u) {
    return arguments.length ? (s = u, l) : s;
  }, function(u) {
    return i = u, r = u(e), n = u(t), a = r === n ? 0 : 1 / (n - r), l;
  };
}
function Pr(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function Eg() {
  var e = Sr(_c()(et));
  return e.copy = function() {
    return Pr(e, Eg());
  }, or.apply(e, arguments);
}
function Tg() {
  var e = of(_c()).domain([1, 10]);
  return e.copy = function() {
    return Pr(e, Tg()).base(e.base());
  }, or.apply(e, arguments);
}
function $g() {
  var e = cf(_c());
  return e.copy = function() {
    return Pr(e, $g()).constant(e.constant());
  }, or.apply(e, arguments);
}
function gf() {
  var e = sf(_c());
  return e.copy = function() {
    return Pr(e, gf()).exponent(e.exponent());
  }, or.apply(e, arguments);
}
function gR() {
  return gf.apply(null, arguments).exponent(0.5);
}
function Cg() {
  var e = [], t = et;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((xi(e, n, 1) - 1) / (e.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let a of n) a != null && !isNaN(a = +a) && e.push(a);
    return e.sort(mr), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e.map((n, a) => t(a / (e.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (a, i) => aI(e, i / n));
  }, r.copy = function() {
    return Cg(t).domain(e);
  }, or.apply(r, arguments);
}
function Ac() {
  var e = 0, t = 0.5, r = 1, n = 1, a, i, o, c, s, l = et, f, u = !1, d;
  function h(v) {
    return isNaN(v = +v) ? d : (v = 0.5 + ((v = +f(v)) - i) * (n * v < n * i ? c : s), l(u ? Math.max(0, Math.min(1, v)) : v));
  }
  h.domain = function(v) {
    return arguments.length ? ([e, t, r] = v, a = f(e = +e), i = f(t = +t), o = f(r = +r), c = a === i ? 0 : 0.5 / (i - a), s = i === o ? 0 : 0.5 / (o - i), n = i < a ? -1 : 1, h) : [e, t, r];
  }, h.clamp = function(v) {
    return arguments.length ? (u = !!v, h) : u;
  }, h.interpolator = function(v) {
    return arguments.length ? (l = v, h) : l;
  };
  function m(v) {
    return function(p) {
      var b, g, O;
      return arguments.length ? ([b, g, O] = p, l = CI(v, [b, g, O]), h) : [l(0), l(0.5), l(1)];
    };
  }
  return h.range = m(ca), h.rangeRound = m(tf), h.unknown = function(v) {
    return arguments.length ? (d = v, h) : d;
  }, function(v) {
    return f = v, a = v(e), i = v(t), o = v(r), c = a === i ? 0 : 0.5 / (i - a), s = i === o ? 0 : 0.5 / (o - i), n = i < a ? -1 : 1, h;
  };
}
function Mg() {
  var e = Sr(Ac()(et));
  return e.copy = function() {
    return Pr(e, Mg());
  }, or.apply(e, arguments);
}
function jg() {
  var e = of(Ac()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return Pr(e, jg()).base(e.base());
  }, or.apply(e, arguments);
}
function Ng() {
  var e = cf(Ac());
  return e.copy = function() {
    return Pr(e, Ng()).constant(e.constant());
  }, or.apply(e, arguments);
}
function bf() {
  var e = sf(Ac());
  return e.copy = function() {
    return Pr(e, bf()).exponent(e.exponent());
  }, or.apply(e, arguments);
}
function bR() {
  return bf.apply(null, arguments).exponent(0.5);
}
const cp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: za,
  scaleDiverging: Mg,
  scaleDivergingLog: jg,
  scaleDivergingPow: bf,
  scaleDivergingSqrt: bR,
  scaleDivergingSymlog: Ng,
  scaleIdentity: fg,
  scaleImplicit: bl,
  scaleLinear: So,
  scaleLog: hg,
  scaleOrdinal: Ju,
  scalePoint: _a,
  scalePow: lf,
  scaleQuantile: mg,
  scaleQuantize: yg,
  scaleRadial: vg,
  scaleSequential: Eg,
  scaleSequentialLog: Tg,
  scaleSequentialPow: gf,
  scaleSequentialQuantile: Cg,
  scaleSequentialSqrt: gR,
  scaleSequentialSymlog: $g,
  scaleSqrt: QI,
  scaleSymlog: pg,
  scaleThreshold: gg,
  scaleTime: mR,
  scaleUtc: yR,
  tickFormat: ug
}, Symbol.toStringTag, { value: "Module" }));
var wR = Zn;
function xR(e, t, r) {
  for (var n = -1, a = e.length; ++n < a; ) {
    var i = e[n], o = t(i);
    if (o != null && (c === void 0 ? o === o && !wR(o) : r(o, c)))
      var c = o, s = i;
  }
  return s;
}
var Ec = xR;
function OR(e, t) {
  return e > t;
}
var kg = OR, SR = Ec, PR = kg, _R = oa;
function AR(e) {
  return e && e.length ? SR(e, _R, PR) : void 0;
}
var ER = AR;
const pr = /* @__PURE__ */ Pe(ER);
function TR(e, t) {
  return e < t;
}
var Ig = TR, $R = Ec, CR = Ig, MR = oa;
function jR(e) {
  return e && e.length ? $R(e, MR, CR) : void 0;
}
var NR = jR;
const Tc = /* @__PURE__ */ Pe(NR);
var kR = Nu, IR = Wt, DR = Vy, RR = it;
function LR(e, t) {
  var r = RR(e) ? kR : DR;
  return r(e, IR(t));
}
var FR = LR, BR = Wy, zR = FR;
function WR(e, t) {
  return BR(zR(e, t), 1);
}
var UR = WR;
const VR = /* @__PURE__ */ Pe(UR);
var qR = Hu;
function HR(e, t) {
  return qR(e, t);
}
var GR = HR;
const Cn = /* @__PURE__ */ Pe(GR);
var sa = 1e9, YR = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed during run-time using `Decimal.config`.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
  // `toFixed`, `toPrecision` and `toSignificantDigits`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -MAX_E
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to MAX_E
  // The natural logarithm of 10.
  // 115 digits
  LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
}, xf, Ie = !0, gt = "[DecimalError] ", Ur = gt + "Invalid argument: ", wf = gt + "Exponent out of range: ", la = Math.floor, Nr = Math.pow, KR = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, st, qe = 1e7, Ne = 7, Dg = 9007199254740991, Eo = la(Dg / Ne), Z = {};
Z.absoluteValue = Z.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
Z.comparedTo = Z.cmp = function(e) {
  var t, r, n, a, i = this;
  if (e = new i.constructor(e), i.s !== e.s) return i.s || -e.s;
  if (i.e !== e.e) return i.e > e.e ^ i.s < 0 ? 1 : -1;
  for (n = i.d.length, a = e.d.length, t = 0, r = n < a ? n : a; t < r; ++t)
    if (i.d[t] !== e.d[t]) return i.d[t] > e.d[t] ^ i.s < 0 ? 1 : -1;
  return n === a ? 0 : n > a ^ i.s < 0 ? 1 : -1;
};
Z.decimalPlaces = Z.dp = function() {
  var e = this, t = e.d.length - 1, r = (t - e.e) * Ne;
  if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r;
};
Z.dividedBy = Z.div = function(e) {
  return Zt(this, new this.constructor(e));
};
Z.dividedToIntegerBy = Z.idiv = function(e) {
  var t = this, r = t.constructor;
  return Ae(Zt(t, new r(e), 0, 1), r.precision);
};
Z.equals = Z.eq = function(e) {
  return !this.cmp(e);
};
Z.exponent = function() {
  return Le(this);
};
Z.greaterThan = Z.gt = function(e) {
  return this.cmp(e) > 0;
};
Z.greaterThanOrEqualTo = Z.gte = function(e) {
  return this.cmp(e) >= 0;
};
Z.isInteger = Z.isint = function() {
  return this.e > this.d.length - 2;
};
Z.isNegative = Z.isneg = function() {
  return this.s < 0;
};
Z.isPositive = Z.ispos = function() {
  return this.s > 0;
};
Z.isZero = function() {
  return this.s === 0;
};
Z.lessThan = Z.lt = function(e) {
  return this.cmp(e) < 0;
};
Z.lessThanOrEqualTo = Z.lte = function(e) {
  return this.cmp(e) < 1;
};
Z.logarithm = Z.log = function(e) {
  var t, r = this, n = r.constructor, a = n.precision, i = a + 5;
  if (e === void 0)
    e = new n(10);
  else if (e = new n(e), e.s < 1 || e.eq(st)) throw Error(gt + "NaN");
  if (r.s < 1) throw Error(gt + (r.s ? "NaN" : "-Infinity"));
  return r.eq(st) ? new n(0) : (Ie = !1, t = Zt(Ha(r, i), Ha(e, i), i), Ie = !0, Ae(t, a));
};
Z.minus = Z.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? Fg(t, e) : Rg(t, (e.s = -e.s, e));
};
Z.modulo = Z.mod = function(e) {
  var t, r = this, n = r.constructor, a = n.precision;
  if (e = new n(e), !e.s) throw Error(gt + "NaN");
  return r.s ? (Ie = !1, t = Zt(r, e, 0, 1).times(e), Ie = !0, r.minus(t)) : Ae(new n(r), a);
};
Z.naturalExponential = Z.exp = function() {
  return Lg(this);
};
Z.naturalLogarithm = Z.ln = function() {
  return Ha(this);
};
Z.negated = Z.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
Z.plus = Z.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? Rg(t, e) : Fg(t, (e.s = -e.s, e));
};
Z.precision = Z.sd = function(e) {
  var t, r, n, a = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Ur + e);
  if (t = Le(a) + 1, n = a.d.length - 1, r = n * Ne + 1, n = a.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = a.d[0]; n >= 10; n /= 10) r++;
  }
  return e && t > r ? t : r;
};
Z.squareRoot = Z.sqrt = function() {
  var e, t, r, n, a, i, o, c = this, s = c.constructor;
  if (c.s < 1) {
    if (!c.s) return new s(0);
    throw Error(gt + "NaN");
  }
  for (e = Le(c), Ie = !1, a = Math.sqrt(+c), a == 0 || a == 1 / 0 ? (t = Nt(c.d), (t.length + e) % 2 == 0 && (t += "0"), a = Math.sqrt(t), e = la((e + 1) / 2) - (e < 0 || e % 2), a == 1 / 0 ? t = "5e" + e : (t = a.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new s(t)) : n = new s(a.toString()), r = s.precision, a = o = r + 3; ; )
    if (i = n, n = i.plus(Zt(c, i, o + 2)).times(0.5), Nt(i.d).slice(0, o) === (t = Nt(n.d)).slice(0, o)) {
      if (t = t.slice(o - 3, o + 1), a == o && t == "4999") {
        if (Ae(i, r + 1, 0), i.times(i).eq(c)) {
          n = i;
          break;
        }
      } else if (t != "9999")
        break;
      o += 4;
    }
  return Ie = !0, Ae(n, r);
};
Z.times = Z.mul = function(e) {
  var t, r, n, a, i, o, c, s, l, f = this, u = f.constructor, d = f.d, h = (e = new u(e)).d;
  if (!f.s || !e.s) return new u(0);
  for (e.s *= f.s, r = f.e + e.e, s = d.length, l = h.length, s < l && (i = d, d = h, h = i, o = s, s = l, l = o), i = [], o = s + l, n = o; n--; ) i.push(0);
  for (n = l; --n >= 0; ) {
    for (t = 0, a = s + n; a > n; )
      c = i[a] + h[n] * d[a - n - 1] + t, i[a--] = c % qe | 0, t = c / qe | 0;
    i[a] = (i[a] + t) % qe | 0;
  }
  for (; !i[--o]; ) i.pop();
  return t ? ++r : i.shift(), e.d = i, e.e = r, Ie ? Ae(e, u.precision) : e;
};
Z.toDecimalPlaces = Z.todp = function(e, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e === void 0 ? r : (Rt(e, 0, sa), t === void 0 ? t = n.rounding : Rt(t, 0, 8), Ae(r, e + Le(r) + 1, t));
};
Z.toExponential = function(e, t) {
  var r, n = this, a = n.constructor;
  return e === void 0 ? r = Gr(n, !0) : (Rt(e, 0, sa), t === void 0 ? t = a.rounding : Rt(t, 0, 8), n = Ae(new a(n), e + 1, t), r = Gr(n, !0, e + 1)), r;
};
Z.toFixed = function(e, t) {
  var r, n, a = this, i = a.constructor;
  return e === void 0 ? Gr(a) : (Rt(e, 0, sa), t === void 0 ? t = i.rounding : Rt(t, 0, 8), n = Ae(new i(a), e + Le(a) + 1, t), r = Gr(n.abs(), !1, e + Le(n) + 1), a.isneg() && !a.isZero() ? "-" + r : r);
};
Z.toInteger = Z.toint = function() {
  var e = this, t = e.constructor;
  return Ae(new t(e), Le(e) + 1, t.rounding);
};
Z.toNumber = function() {
  return +this;
};
Z.toPower = Z.pow = function(e) {
  var t, r, n, a, i, o, c = this, s = c.constructor, l = 12, f = +(e = new s(e));
  if (!e.s) return new s(st);
  if (c = new s(c), !c.s) {
    if (e.s < 1) throw Error(gt + "Infinity");
    return c;
  }
  if (c.eq(st)) return c;
  if (n = s.precision, e.eq(st)) return Ae(c, n);
  if (t = e.e, r = e.d.length - 1, o = t >= r, i = c.s, o) {
    if ((r = f < 0 ? -f : f) <= Dg) {
      for (a = new s(st), t = Math.ceil(n / Ne + 4), Ie = !1; r % 2 && (a = a.times(c), lp(a.d, t)), r = la(r / 2), r !== 0; )
        c = c.times(c), lp(c.d, t);
      return Ie = !0, e.s < 0 ? new s(st).div(a) : Ae(a, n);
    }
  } else if (i < 0) throw Error(gt + "NaN");
  return i = i < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, c.s = 1, Ie = !1, a = e.times(Ha(c, n + l)), Ie = !0, a = Lg(a), a.s = i, a;
};
Z.toPrecision = function(e, t) {
  var r, n, a = this, i = a.constructor;
  return e === void 0 ? (r = Le(a), n = Gr(a, r <= i.toExpNeg || r >= i.toExpPos)) : (Rt(e, 1, sa), t === void 0 ? t = i.rounding : Rt(t, 0, 8), a = Ae(new i(a), e, t), r = Le(a), n = Gr(a, e <= r || r <= i.toExpNeg, e)), n;
};
Z.toSignificantDigits = Z.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (Rt(e, 1, sa), t === void 0 ? t = n.rounding : Rt(t, 0, 8)), Ae(new n(r), e, t);
};
Z.toString = Z.valueOf = Z.val = Z.toJSON = Z[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = Le(e), r = e.constructor;
  return Gr(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function Rg(e, t) {
  var r, n, a, i, o, c, s, l, f = e.constructor, u = f.precision;
  if (!e.s || !t.s)
    return t.s || (t = new f(e)), Ie ? Ae(t, u) : t;
  if (s = e.d, l = t.d, o = e.e, a = t.e, s = s.slice(), i = o - a, i) {
    for (i < 0 ? (n = s, i = -i, c = l.length) : (n = l, a = o, c = s.length), o = Math.ceil(u / Ne), c = o > c ? o + 1 : c + 1, i > c && (i = c, n.length = 1), n.reverse(); i--; ) n.push(0);
    n.reverse();
  }
  for (c = s.length, i = l.length, c - i < 0 && (i = c, n = l, l = s, s = n), r = 0; i; )
    r = (s[--i] = s[i] + l[i] + r) / qe | 0, s[i] %= qe;
  for (r && (s.unshift(r), ++a), c = s.length; s[--c] == 0; ) s.pop();
  return t.d = s, t.e = a, Ie ? Ae(t, u) : t;
}
function Rt(e, t, r) {
  if (e !== ~~e || e < t || e > r)
    throw Error(Ur + e);
}
function Nt(e) {
  var t, r, n, a = e.length - 1, i = "", o = e[0];
  if (a > 0) {
    for (i += o, t = 1; t < a; t++)
      n = e[t] + "", r = Ne - n.length, r && (i += fr(r)), i += n;
    o = e[t], n = o + "", r = Ne - n.length, r && (i += fr(r));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; ) o /= 10;
  return i + o;
}
var Zt = /* @__PURE__ */ function() {
  function e(n, a) {
    var i, o = 0, c = n.length;
    for (n = n.slice(); c--; )
      i = n[c] * a + o, n[c] = i % qe | 0, o = i / qe | 0;
    return o && n.unshift(o), n;
  }
  function t(n, a, i, o) {
    var c, s;
    if (i != o)
      s = i > o ? 1 : -1;
    else
      for (c = s = 0; c < i; c++)
        if (n[c] != a[c]) {
          s = n[c] > a[c] ? 1 : -1;
          break;
        }
    return s;
  }
  function r(n, a, i) {
    for (var o = 0; i--; )
      n[i] -= o, o = n[i] < a[i] ? 1 : 0, n[i] = o * qe + n[i] - a[i];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, a, i, o) {
    var c, s, l, f, u, d, h, m, v, p, b, g, O, S, y, w, P, _, $ = n.constructor, E = n.s == a.s ? 1 : -1, j = n.d, C = a.d;
    if (!n.s) return new $(n);
    if (!a.s) throw Error(gt + "Division by zero");
    for (s = n.e - a.e, P = C.length, y = j.length, h = new $(E), m = h.d = [], l = 0; C[l] == (j[l] || 0); ) ++l;
    if (C[l] > (j[l] || 0) && --s, i == null ? g = i = $.precision : o ? g = i + (Le(n) - Le(a)) + 1 : g = i, g < 0) return new $(0);
    if (g = g / Ne + 2 | 0, l = 0, P == 1)
      for (f = 0, C = C[0], g++; (l < y || f) && g--; l++)
        O = f * qe + (j[l] || 0), m[l] = O / C | 0, f = O % C | 0;
    else {
      for (f = qe / (C[0] + 1) | 0, f > 1 && (C = e(C, f), j = e(j, f), P = C.length, y = j.length), S = P, v = j.slice(0, P), p = v.length; p < P; ) v[p++] = 0;
      _ = C.slice(), _.unshift(0), w = C[0], C[1] >= qe / 2 && ++w;
      do
        f = 0, c = t(C, v, P, p), c < 0 ? (b = v[0], P != p && (b = b * qe + (v[1] || 0)), f = b / w | 0, f > 1 ? (f >= qe && (f = qe - 1), u = e(C, f), d = u.length, p = v.length, c = t(u, v, d, p), c == 1 && (f--, r(u, P < d ? _ : C, d))) : (f == 0 && (c = f = 1), u = C.slice()), d = u.length, d < p && u.unshift(0), r(v, u, p), c == -1 && (p = v.length, c = t(C, v, P, p), c < 1 && (f++, r(v, P < p ? _ : C, p))), p = v.length) : c === 0 && (f++, v = [0]), m[l++] = f, c && v[0] ? v[p++] = j[S] || 0 : (v = [j[S]], p = 1);
      while ((S++ < y || v[0] !== void 0) && g--);
    }
    return m[0] || m.shift(), h.e = s, Ae(h, o ? i + Le(h) + 1 : i);
  };
}();
function Lg(e, t) {
  var r, n, a, i, o, c, s = 0, l = 0, f = e.constructor, u = f.precision;
  if (Le(e) > 16) throw Error(wf + Le(e));
  if (!e.s) return new f(st);
  for (Ie = !1, c = u, o = new f(0.03125); e.abs().gte(0.1); )
    e = e.times(o), l += 5;
  for (n = Math.log(Nr(2, l)) / Math.LN10 * 2 + 5 | 0, c += n, r = a = i = new f(st), f.precision = c; ; ) {
    if (a = Ae(a.times(e), c), r = r.times(++s), o = i.plus(Zt(a, r, c)), Nt(o.d).slice(0, c) === Nt(i.d).slice(0, c)) {
      for (; l--; ) i = Ae(i.times(i), c);
      return f.precision = u, t == null ? (Ie = !0, Ae(i, u)) : i;
    }
    i = o;
  }
}
function Le(e) {
  for (var t = e.e * Ne, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function Os(e, t, r) {
  if (t > e.LN10.sd())
    throw Ie = !0, r && (e.precision = r), Error(gt + "LN10 precision limit exceeded");
  return Ae(new e(e.LN10), t);
}
function fr(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function Ha(e, t) {
  var r, n, a, i, o, c, s, l, f, u = 1, d = 10, h = e, m = h.d, v = h.constructor, p = v.precision;
  if (h.s < 1) throw Error(gt + (h.s ? "NaN" : "-Infinity"));
  if (h.eq(st)) return new v(0);
  if (t == null ? (Ie = !1, l = p) : l = t, h.eq(10))
    return t == null && (Ie = !0), Os(v, l);
  if (l += d, v.precision = l, r = Nt(m), n = r.charAt(0), i = Le(h), Math.abs(i) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      h = h.times(e), r = Nt(h.d), n = r.charAt(0), u++;
    i = Le(h), n > 1 ? (h = new v("0." + r), i++) : h = new v(n + "." + r.slice(1));
  } else
    return s = Os(v, l + 2, p).times(i + ""), h = Ha(new v(n + "." + r.slice(1)), l - d).plus(s), v.precision = p, t == null ? (Ie = !0, Ae(h, p)) : h;
  for (c = o = h = Zt(h.minus(st), h.plus(st), l), f = Ae(h.times(h), l), a = 3; ; ) {
    if (o = Ae(o.times(f), l), s = c.plus(Zt(o, new v(a), l)), Nt(s.d).slice(0, l) === Nt(c.d).slice(0, l))
      return c = c.times(2), i !== 0 && (c = c.plus(Os(v, l + 2, p).times(i + ""))), c = Zt(c, new v(u), l), v.precision = p, t == null ? (Ie = !0, Ae(c, p)) : c;
    c = s, a += 2;
  }
}
function sp(e, t) {
  var r, n, a;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (a = t.length; t.charCodeAt(a - 1) === 48; ) --a;
  if (t = t.slice(n, a), t) {
    if (a -= n, r = r - n - 1, e.e = la(r / Ne), e.d = [], n = (r + 1) % Ne, r < 0 && (n += Ne), n < a) {
      for (n && e.d.push(+t.slice(0, n)), a -= Ne; n < a; ) e.d.push(+t.slice(n, n += Ne));
      t = t.slice(n), n = Ne - t.length;
    } else
      n -= a;
    for (; n--; ) t += "0";
    if (e.d.push(+t), Ie && (e.e > Eo || e.e < -Eo)) throw Error(wf + r);
  } else
    e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function Ae(e, t, r) {
  var n, a, i, o, c, s, l, f, u = e.d;
  for (o = 1, i = u[0]; i >= 10; i /= 10) o++;
  if (n = t - o, n < 0)
    n += Ne, a = t, l = u[f = 0];
  else {
    if (f = Math.ceil((n + 1) / Ne), i = u.length, f >= i) return e;
    for (l = i = u[f], o = 1; i >= 10; i /= 10) o++;
    n %= Ne, a = n - Ne + o;
  }
  if (r !== void 0 && (i = Nr(10, o - a - 1), c = l / i % 10 | 0, s = t < 0 || u[f + 1] !== void 0 || l % i, s = r < 4 ? (c || s) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : c > 5 || c == 5 && (r == 4 || s || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (n > 0 ? a > 0 ? l / Nr(10, o - a) : 0 : u[f - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !u[0])
    return s ? (i = Le(e), u.length = 1, t = t - i - 1, u[0] = Nr(10, (Ne - t % Ne) % Ne), e.e = la(-t / Ne) || 0) : (u.length = 1, u[0] = e.e = e.s = 0), e;
  if (n == 0 ? (u.length = f, i = 1, f--) : (u.length = f + 1, i = Nr(10, Ne - n), u[f] = a > 0 ? (l / Nr(10, o - a) % Nr(10, a) | 0) * i : 0), s)
    for (; ; )
      if (f == 0) {
        (u[0] += i) == qe && (u[0] = 1, ++e.e);
        break;
      } else {
        if (u[f] += i, u[f] != qe) break;
        u[f--] = 0, i = 1;
      }
  for (n = u.length; u[--n] === 0; ) u.pop();
  if (Ie && (e.e > Eo || e.e < -Eo))
    throw Error(wf + Le(e));
  return e;
}
function Fg(e, t) {
  var r, n, a, i, o, c, s, l, f, u, d = e.constructor, h = d.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new d(e), Ie ? Ae(t, h) : t;
  if (s = e.d, u = t.d, n = t.e, l = e.e, s = s.slice(), o = l - n, o) {
    for (f = o < 0, f ? (r = s, o = -o, c = u.length) : (r = u, n = l, c = s.length), a = Math.max(Math.ceil(h / Ne), c) + 2, o > a && (o = a, r.length = 1), r.reverse(), a = o; a--; ) r.push(0);
    r.reverse();
  } else {
    for (a = s.length, c = u.length, f = a < c, f && (c = a), a = 0; a < c; a++)
      if (s[a] != u[a]) {
        f = s[a] < u[a];
        break;
      }
    o = 0;
  }
  for (f && (r = s, s = u, u = r, t.s = -t.s), c = s.length, a = u.length - c; a > 0; --a) s[c++] = 0;
  for (a = u.length; a > o; ) {
    if (s[--a] < u[a]) {
      for (i = a; i && s[--i] === 0; ) s[i] = qe - 1;
      --s[i], s[a] += qe;
    }
    s[a] -= u[a];
  }
  for (; s[--c] === 0; ) s.pop();
  for (; s[0] === 0; s.shift()) --n;
  return s[0] ? (t.d = s, t.e = n, Ie ? Ae(t, h) : t) : new d(0);
}
function Gr(e, t, r) {
  var n, a = Le(e), i = Nt(e.d), o = i.length;
  return t ? (r && (n = r - o) > 0 ? i = i.charAt(0) + "." + i.slice(1) + fr(n) : o > 1 && (i = i.charAt(0) + "." + i.slice(1)), i = i + (a < 0 ? "e" : "e+") + a) : a < 0 ? (i = "0." + fr(-a - 1) + i, r && (n = r - o) > 0 && (i += fr(n))) : a >= o ? (i += fr(a + 1 - o), r && (n = r - a - 1) > 0 && (i = i + "." + fr(n))) : ((n = a + 1) < o && (i = i.slice(0, n) + "." + i.slice(n)), r && (n = r - o) > 0 && (a + 1 === o && (i += "."), i += fr(n))), e.s < 0 ? "-" + i : i;
}
function lp(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function Bg(e) {
  var t, r, n;
  function a(i) {
    var o = this;
    if (!(o instanceof a)) return new a(i);
    if (o.constructor = a, i instanceof a) {
      o.s = i.s, o.e = i.e, o.d = (i = i.d) ? i.slice() : i;
      return;
    }
    if (typeof i == "number") {
      if (i * 0 !== 0)
        throw Error(Ur + i);
      if (i > 0)
        o.s = 1;
      else if (i < 0)
        i = -i, o.s = -1;
      else {
        o.s = 0, o.e = 0, o.d = [0];
        return;
      }
      if (i === ~~i && i < 1e7) {
        o.e = 0, o.d = [i];
        return;
      }
      return sp(o, i.toString());
    } else if (typeof i != "string")
      throw Error(Ur + i);
    if (i.charCodeAt(0) === 45 ? (i = i.slice(1), o.s = -1) : o.s = 1, KR.test(i)) sp(o, i);
    else throw Error(Ur + i);
  }
  if (a.prototype = Z, a.ROUND_UP = 0, a.ROUND_DOWN = 1, a.ROUND_CEIL = 2, a.ROUND_FLOOR = 3, a.ROUND_HALF_UP = 4, a.ROUND_HALF_DOWN = 5, a.ROUND_HALF_EVEN = 6, a.ROUND_HALF_CEIL = 7, a.ROUND_HALF_FLOOR = 8, a.clone = Bg, a.config = a.set = XR, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return a.config(e), a;
}
function XR(e) {
  if (!e || typeof e != "object")
    throw Error(gt + "Object expected");
  var t, r, n, a = [
    "precision",
    1,
    sa,
    "rounding",
    0,
    8,
    "toExpNeg",
    -1 / 0,
    0,
    "toExpPos",
    0,
    1 / 0
  ];
  for (t = 0; t < a.length; t += 3)
    if ((n = e[r = a[t]]) !== void 0)
      if (la(n) === n && n >= a[t + 1] && n <= a[t + 2]) this[r] = n;
      else throw Error(Ur + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(Ur + r + ": " + n);
  return this;
}
var xf = Bg(YR);
st = new xf(1);
const _e = xf;
function ZR(e) {
  return tL(e) || eL(e) || QR(e) || JR();
}
function JR() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function QR(e, t) {
  if (e) {
    if (typeof e == "string") return Sl(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Sl(e, t);
  }
}
function eL(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function tL(e) {
  if (Array.isArray(e)) return Sl(e);
}
function Sl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
var rL = function(t) {
  return t;
}, zg = {}, Wg = function(t) {
  return t === zg;
}, up = function(t) {
  return function r() {
    return arguments.length === 0 || arguments.length === 1 && Wg(arguments.length <= 0 ? void 0 : arguments[0]) ? r : t.apply(void 0, arguments);
  };
}, nL = function e(t, r) {
  return t === 1 ? r : up(function() {
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    var o = a.filter(function(c) {
      return c !== zg;
    }).length;
    return o >= t ? r.apply(void 0, a) : e(t - o, up(function() {
      for (var c = arguments.length, s = new Array(c), l = 0; l < c; l++)
        s[l] = arguments[l];
      var f = a.map(function(u) {
        return Wg(u) ? s.shift() : u;
      });
      return r.apply(void 0, ZR(f).concat(s));
    }));
  });
}, $c = function(t) {
  return nL(t.length, t);
}, Pl = function(t, r) {
  for (var n = [], a = t; a < r; ++a)
    n[a - t] = a;
  return n;
}, aL = $c(function(e, t) {
  return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(r) {
    return t[r];
  }).map(e);
}), iL = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  if (!r.length)
    return rL;
  var a = r.reverse(), i = a[0], o = a.slice(1);
  return function() {
    return o.reduce(function(c, s) {
      return s(c);
    }, i.apply(void 0, arguments));
  };
}, _l = function(t) {
  return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("");
}, Ug = function(t) {
  var r = null, n = null;
  return function() {
    for (var a = arguments.length, i = new Array(a), o = 0; o < a; o++)
      i[o] = arguments[o];
    return r && i.every(function(c, s) {
      return c === r[s];
    }) || (r = i, n = t.apply(void 0, i)), n;
  };
};
function oL(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new _e(e).abs().log(10).toNumber()) + 1, t;
}
function cL(e, t, r) {
  for (var n = new _e(e), a = 0, i = []; n.lt(t) && a < 1e5; )
    i.push(n.toNumber()), n = n.add(r), a++;
  return i;
}
var sL = $c(function(e, t, r) {
  var n = +e, a = +t;
  return n + r * (a - n);
}), lL = $c(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, (r - e) / n;
}), uL = $c(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, Math.max(0, Math.min(1, (r - e) / n));
});
const Cc = {
  rangeStep: cL,
  getDigitCount: oL,
  interpolateNumber: sL,
  uninterpolateNumber: lL,
  uninterpolateTruncation: uL
};
function Al(e) {
  return hL(e) || dL(e) || Vg(e) || fL();
}
function fL() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function dL(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function hL(e) {
  if (Array.isArray(e)) return El(e);
}
function Ga(e, t) {
  return mL(e) || vL(e, t) || Vg(e, t) || pL();
}
function pL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Vg(e, t) {
  if (e) {
    if (typeof e == "string") return El(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return El(e, t);
  }
}
function El(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function vL(e, t) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(e)))) {
    var r = [], n = !0, a = !1, i = void 0;
    try {
      for (var o = e[Symbol.iterator](), c; !(n = (c = o.next()).done) && (r.push(c.value), !(t && r.length === t)); n = !0)
        ;
    } catch (s) {
      a = !0, i = s;
    } finally {
      try {
        !n && o.return != null && o.return();
      } finally {
        if (a) throw i;
      }
    }
    return r;
  }
}
function mL(e) {
  if (Array.isArray(e)) return e;
}
function qg(e) {
  var t = Ga(e, 2), r = t[0], n = t[1], a = r, i = n;
  return r > n && (a = n, i = r), [a, i];
}
function Hg(e, t, r) {
  if (e.lte(0))
    return new _e(0);
  var n = Cc.getDigitCount(e.toNumber()), a = new _e(10).pow(n), i = e.div(a), o = n !== 1 ? 0.05 : 0.1, c = new _e(Math.ceil(i.div(o).toNumber())).add(r).mul(o), s = c.mul(a);
  return t ? s : new _e(Math.ceil(s));
}
function yL(e, t, r) {
  var n = 1, a = new _e(e);
  if (!a.isint() && r) {
    var i = Math.abs(e);
    i < 1 ? (n = new _e(10).pow(Cc.getDigitCount(e) - 1), a = new _e(Math.floor(a.div(n).toNumber())).mul(n)) : i > 1 && (a = new _e(Math.floor(e)));
  } else e === 0 ? a = new _e(Math.floor((t - 1) / 2)) : r || (a = new _e(Math.floor(e)));
  var o = Math.floor((t - 1) / 2), c = iL(aL(function(s) {
    return a.add(new _e(s - o).mul(n)).toNumber();
  }), Pl);
  return c(0, t);
}
function Gg(e, t, r, n) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (r - 1)))
    return {
      step: new _e(0),
      tickMin: new _e(0),
      tickMax: new _e(0)
    };
  var i = Hg(new _e(t).sub(e).div(r - 1), n, a), o;
  e <= 0 && t >= 0 ? o = new _e(0) : (o = new _e(e).add(t).div(2), o = o.sub(new _e(o).mod(i)));
  var c = Math.ceil(o.sub(e).div(i).toNumber()), s = Math.ceil(new _e(t).sub(o).div(i).toNumber()), l = c + s + 1;
  return l > r ? Gg(e, t, r, n, a + 1) : (l < r && (s = t > 0 ? s + (r - l) : s, c = t > 0 ? c : c + (r - l)), {
    step: i,
    tickMin: o.sub(new _e(c).mul(i)),
    tickMax: o.add(new _e(s).mul(i))
  });
}
function gL(e) {
  var t = Ga(e, 2), r = t[0], n = t[1], a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = Math.max(a, 2), c = qg([r, n]), s = Ga(c, 2), l = s[0], f = s[1];
  if (l === -1 / 0 || f === 1 / 0) {
    var u = f === 1 / 0 ? [l].concat(Al(Pl(0, a - 1).map(function() {
      return 1 / 0;
    }))) : [].concat(Al(Pl(0, a - 1).map(function() {
      return -1 / 0;
    })), [f]);
    return r > n ? _l(u) : u;
  }
  if (l === f)
    return yL(l, a, i);
  var d = Gg(l, f, o, i), h = d.step, m = d.tickMin, v = d.tickMax, p = Cc.rangeStep(m, v.add(new _e(0.1).mul(h)), h);
  return r > n ? _l(p) : p;
}
function bL(e, t) {
  var r = Ga(e, 2), n = r[0], a = r[1], i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = qg([n, a]), c = Ga(o, 2), s = c[0], l = c[1];
  if (s === -1 / 0 || l === 1 / 0)
    return [n, a];
  if (s === l)
    return [s];
  var f = Math.max(t, 2), u = Hg(new _e(l).sub(s).div(f - 1), i, 0), d = [].concat(Al(Cc.rangeStep(new _e(s), new _e(l).sub(new _e(0.99).mul(u)), u)), [l]);
  return n > a ? _l(d) : d;
}
var wL = Ug(gL), xL = Ug(bL), OL = process.env.NODE_ENV === "production", Ss = "Invariant failed";
function at(e, t) {
  if (OL)
    throw new Error(Ss);
  var r = typeof t == "function" ? t() : t, n = r ? "".concat(Ss, ": ").concat(r) : Ss;
  throw new Error(n);
}
var SL = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function Mn(e) {
  "@babel/helpers - typeof";
  return Mn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Mn(e);
}
function To() {
  return To = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, To.apply(this, arguments);
}
function PL(e, t) {
  return TL(e) || EL(e, t) || AL(e, t) || _L();
}
function _L() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function AL(e, t) {
  if (e) {
    if (typeof e == "string") return fp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return fp(e, t);
  }
}
function fp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function EL(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, c = [], s = !0, l = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (c.push(n.value), c.length !== t); s = !0) ;
    } catch (f) {
      l = !0, a = f;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw a;
      }
    }
    return c;
  }
}
function TL(e) {
  if (Array.isArray(e)) return e;
}
function $L(e, t) {
  if (e == null) return {};
  var r = CL(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function CL(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function ML(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function jL(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Xg(n.key), n);
  }
}
function NL(e, t, r) {
  return t && jL(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function kL(e, t, r) {
  return t = $o(t), IL(e, Yg() ? Reflect.construct(t, r || [], $o(e).constructor) : t.apply(e, r));
}
function IL(e, t) {
  if (t && (Mn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return DL(e);
}
function DL(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Yg() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Yg = function() {
    return !!e;
  })();
}
function $o(e) {
  return $o = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, $o(e);
}
function RL(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Tl(e, t);
}
function Tl(e, t) {
  return Tl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Tl(e, t);
}
function Kg(e, t, r) {
  return t = Xg(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Xg(e) {
  var t = LL(e, "string");
  return Mn(t) == "symbol" ? t : t + "";
}
function LL(e, t) {
  if (Mn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Mn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Mc = /* @__PURE__ */ function(e) {
  function t() {
    return ML(this, t), kL(this, t, arguments);
  }
  return RL(t, e), NL(t, [{
    key: "render",
    value: function() {
      var n = this.props, a = n.offset, i = n.layout, o = n.width, c = n.dataKey, s = n.data, l = n.dataPointFormatter, f = n.xAxis, u = n.yAxis, d = $L(n, SL), h = te(d, !1);
      this.props.direction === "x" && f.type !== "number" && (process.env.NODE_ENV !== "production" ? at(!1, 'ErrorBar requires Axis type property to be "number".') : at());
      var m = s.map(function(v) {
        var p = l(v, c), b = p.x, g = p.y, O = p.value, S = p.errorVal;
        if (!S)
          return null;
        var y = [], w, P;
        if (Array.isArray(S)) {
          var _ = PL(S, 2);
          w = _[0], P = _[1];
        } else
          w = P = S;
        if (i === "vertical") {
          var $ = f.scale, E = g + a, j = E + o, C = E - o, D = $(O - w), I = $(O + P);
          y.push({
            x1: I,
            y1: j,
            x2: I,
            y2: C
          }), y.push({
            x1: D,
            y1: E,
            x2: I,
            y2: E
          }), y.push({
            x1: D,
            y1: j,
            x2: D,
            y2: C
          });
        } else if (i === "horizontal") {
          var R = u.scale, F = b + a, k = F - o, z = F + o, V = R(O - w), N = R(O + P);
          y.push({
            x1: k,
            y1: N,
            x2: z,
            y2: N
          }), y.push({
            x1: F,
            y1: V,
            x2: F,
            y2: N
          }), y.push({
            x1: k,
            y1: V,
            x2: z,
            y2: V
          });
        }
        return /* @__PURE__ */ T.createElement(pe, To({
          className: "recharts-errorBar",
          key: "bar-".concat(y.map(function(B) {
            return "".concat(B.x1, "-").concat(B.x2, "-").concat(B.y1, "-").concat(B.y2);
          }))
        }, h), y.map(function(B) {
          return /* @__PURE__ */ T.createElement("line", To({}, B, {
            key: "line-".concat(B.x1, "-").concat(B.x2, "-").concat(B.y1, "-").concat(B.y2)
          }));
        }));
      });
      return /* @__PURE__ */ T.createElement(pe, {
        className: "recharts-errorBars"
      }, m);
    }
  }]);
}(T.Component);
Kg(Mc, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
Kg(Mc, "displayName", "ErrorBar");
function Ya(e) {
  "@babel/helpers - typeof";
  return Ya = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ya(e);
}
function dp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Tr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dp(Object(r), !0).forEach(function(n) {
      FL(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function FL(e, t, r) {
  return t = BL(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function BL(e) {
  var t = zL(e, "string");
  return Ya(t) == "symbol" ? t : t + "";
}
function zL(e, t) {
  if (Ya(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ya(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Zg = function(t) {
  var r = t.children, n = t.formattedGraphicalItems, a = t.legendWidth, i = t.legendContent, o = ct(r, mn);
  if (!o)
    return null;
  var c = mn.defaultProps, s = c !== void 0 ? Tr(Tr({}, c), o.props) : {}, l;
  return o.props && o.props.payload ? l = o.props && o.props.payload : i === "children" ? l = (n || []).reduce(function(f, u) {
    var d = u.item, h = u.props, m = h.sectors || h.data || [];
    return f.concat(m.map(function(v) {
      return {
        type: o.props.iconType || d.props.legendType,
        value: v.name,
        color: v.fill,
        payload: v
      };
    }));
  }, []) : l = (n || []).map(function(f) {
    var u = f.item, d = u.type.defaultProps, h = d !== void 0 ? Tr(Tr({}, d), u.props) : {}, m = h.dataKey, v = h.name, p = h.legendType, b = h.hide;
    return {
      inactive: b,
      dataKey: m,
      type: s.iconType || p || "square",
      color: Of(u),
      value: v || m,
      // @ts-expect-error property strokeDasharray is required in Payload but optional in props
      payload: h
    };
  }), Tr(Tr(Tr({}, s), mn.getWithHeight(o, a)), {}, {
    payload: l,
    item: o
  });
};
function Ka(e) {
  "@babel/helpers - typeof";
  return Ka = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ka(e);
}
function hp(e) {
  return qL(e) || VL(e) || UL(e) || WL();
}
function WL() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function UL(e, t) {
  if (e) {
    if (typeof e == "string") return $l(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return $l(e, t);
  }
}
function VL(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function qL(e) {
  if (Array.isArray(e)) return $l(e);
}
function $l(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function pp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function De(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pp(Object(r), !0).forEach(function(n) {
      gn(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : pp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function gn(e, t, r) {
  return t = HL(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function HL(e) {
  var t = GL(e, "string");
  return Ka(t) == "symbol" ? t : t + "";
}
function GL(e, t) {
  if (Ka(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ka(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function We(e, t, r) {
  return ce(e) || ce(t) ? r : Ue(t) ? lt(e, t, r) : ie(t) ? t(e) : r;
}
function Aa(e, t, r, n) {
  var a = VR(e, function(c) {
    return We(c, t);
  });
  if (r === "number") {
    var i = a.filter(function(c) {
      return H(c) || parseFloat(c);
    });
    return i.length ? [Tc(i), pr(i)] : [1 / 0, -1 / 0];
  }
  var o = n ? a.filter(function(c) {
    return !ce(c);
  }) : a;
  return o.map(function(c) {
    return Ue(c) || c instanceof Date ? c : "";
  });
}
var YL = function(t) {
  var r, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], a = arguments.length > 2 ? arguments[2] : void 0, i = arguments.length > 3 ? arguments[3] : void 0, o = -1, c = (r = n == null ? void 0 : n.length) !== null && r !== void 0 ? r : 0;
  if (c <= 1)
    return 0;
  if (i && i.axisType === "angleAxis" && Math.abs(Math.abs(i.range[1] - i.range[0]) - 360) <= 1e-6)
    for (var s = i.range, l = 0; l < c; l++) {
      var f = l > 0 ? a[l - 1].coordinate : a[c - 1].coordinate, u = a[l].coordinate, d = l >= c - 1 ? a[0].coordinate : a[l + 1].coordinate, h = void 0;
      if (Je(u - f) !== Je(d - u)) {
        var m = [];
        if (Je(d - u) === Je(s[1] - s[0])) {
          h = d;
          var v = u + s[1] - s[0];
          m[0] = Math.min(v, (v + f) / 2), m[1] = Math.max(v, (v + f) / 2);
        } else {
          h = f;
          var p = d + s[1] - s[0];
          m[0] = Math.min(u, (p + u) / 2), m[1] = Math.max(u, (p + u) / 2);
        }
        var b = [Math.min(u, (h + u) / 2), Math.max(u, (h + u) / 2)];
        if (t > b[0] && t <= b[1] || t >= m[0] && t <= m[1]) {
          o = a[l].index;
          break;
        }
      } else {
        var g = Math.min(f, d), O = Math.max(f, d);
        if (t > (g + u) / 2 && t <= (O + u) / 2) {
          o = a[l].index;
          break;
        }
      }
    }
  else
    for (var S = 0; S < c; S++)
      if (S === 0 && t <= (n[S].coordinate + n[S + 1].coordinate) / 2 || S > 0 && S < c - 1 && t > (n[S].coordinate + n[S - 1].coordinate) / 2 && t <= (n[S].coordinate + n[S + 1].coordinate) / 2 || S === c - 1 && t > (n[S].coordinate + n[S - 1].coordinate) / 2) {
        o = n[S].index;
        break;
      }
  return o;
}, Of = function(t) {
  var r, n = t, a = n.type.displayName, i = (r = t.type) !== null && r !== void 0 && r.defaultProps ? De(De({}, t.type.defaultProps), t.props) : t.props, o = i.stroke, c = i.fill, s;
  switch (a) {
    case "Line":
      s = o;
      break;
    case "Area":
    case "Radar":
      s = o && o !== "none" ? o : c;
      break;
    default:
      s = c;
      break;
  }
  return s;
}, KL = function(t) {
  var r = t.barSize, n = t.totalSize, a = t.stackGroups, i = a === void 0 ? {} : a;
  if (!i)
    return {};
  for (var o = {}, c = Object.keys(i), s = 0, l = c.length; s < l; s++)
    for (var f = i[c[s]].stackGroups, u = Object.keys(f), d = 0, h = u.length; d < h; d++) {
      var m = f[u[d]], v = m.items, p = m.cateAxisId, b = v.filter(function(P) {
        return Xt(P.type).indexOf("Bar") >= 0;
      });
      if (b && b.length) {
        var g = b[0].type.defaultProps, O = g !== void 0 ? De(De({}, g), b[0].props) : b[0].props, S = O.barSize, y = O[p];
        o[y] || (o[y] = []);
        var w = ce(S) ? r : S;
        o[y].push({
          item: b[0],
          stackList: b.slice(1),
          barSize: ce(w) ? void 0 : Qe(w, n, 0)
        });
      }
    }
  return o;
}, XL = function(t) {
  var r = t.barGap, n = t.barCategoryGap, a = t.bandSize, i = t.sizeList, o = i === void 0 ? [] : i, c = t.maxBarSize, s = o.length;
  if (s < 1) return null;
  var l = Qe(r, a, 0, !0), f, u = [];
  if (o[0].barSize === +o[0].barSize) {
    var d = !1, h = a / s, m = o.reduce(function(S, y) {
      return S + y.barSize || 0;
    }, 0);
    m += (s - 1) * l, m >= a && (m -= (s - 1) * l, l = 0), m >= a && h > 0 && (d = !0, h *= 0.9, m = s * h);
    var v = (a - m) / 2 >> 0, p = {
      offset: v - l,
      size: 0
    };
    f = o.reduce(function(S, y) {
      var w = {
        item: y.item,
        position: {
          offset: p.offset + p.size + l,
          // @ts-expect-error the type check above does not check for type number explicitly
          size: d ? h : y.barSize
        }
      }, P = [].concat(hp(S), [w]);
      return p = P[P.length - 1].position, y.stackList && y.stackList.length && y.stackList.forEach(function(_) {
        P.push({
          item: _,
          position: p
        });
      }), P;
    }, u);
  } else {
    var b = Qe(n, a, 0, !0);
    a - 2 * b - (s - 1) * l <= 0 && (l = 0);
    var g = (a - 2 * b - (s - 1) * l) / s;
    g > 1 && (g >>= 0);
    var O = c === +c ? Math.min(g, c) : g;
    f = o.reduce(function(S, y, w) {
      var P = [].concat(hp(S), [{
        item: y.item,
        position: {
          offset: b + (g + l) * w + (g - O) / 2,
          size: O
        }
      }]);
      return y.stackList && y.stackList.length && y.stackList.forEach(function(_) {
        P.push({
          item: _,
          position: P[P.length - 1].position
        });
      }), P;
    }, u);
  }
  return f;
}, ZL = function(t, r, n, a) {
  var i = n.children, o = n.width, c = n.margin, s = o - (c.left || 0) - (c.right || 0), l = Zg({
    children: i,
    legendWidth: s
  });
  if (l) {
    var f = a || {}, u = f.width, d = f.height, h = l.align, m = l.verticalAlign, v = l.layout;
    if ((v === "vertical" || v === "horizontal" && m === "middle") && h !== "center" && H(t[h]))
      return De(De({}, t), {}, gn({}, h, t[h] + (u || 0)));
    if ((v === "horizontal" || v === "vertical" && h === "center") && m !== "middle" && H(t[m]))
      return De(De({}, t), {}, gn({}, m, t[m] + (d || 0)));
  }
  return t;
}, JL = function(t, r, n) {
  return ce(r) ? !0 : t === "horizontal" ? r === "yAxis" : t === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0;
}, Jg = function(t, r, n, a, i) {
  var o = r.props.children, c = mt(o, Mc).filter(function(l) {
    return JL(a, i, l.props.direction);
  });
  if (c && c.length) {
    var s = c.map(function(l) {
      return l.props.dataKey;
    });
    return t.reduce(function(l, f) {
      var u = We(f, n);
      if (ce(u)) return l;
      var d = Array.isArray(u) ? [Tc(u), pr(u)] : [u, u], h = s.reduce(function(m, v) {
        var p = We(f, v, 0), b = d[0] - Math.abs(Array.isArray(p) ? p[0] : p), g = d[1] + Math.abs(Array.isArray(p) ? p[1] : p);
        return [Math.min(b, m[0]), Math.max(g, m[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(h[0], l[0]), Math.max(h[1], l[1])];
    }, [1 / 0, -1 / 0]);
  }
  return null;
}, QL = function(t, r, n, a, i) {
  var o = r.map(function(c) {
    return Jg(t, c, n, i, a);
  }).filter(function(c) {
    return !ce(c);
  });
  return o && o.length ? o.reduce(function(c, s) {
    return [Math.min(c[0], s[0]), Math.max(c[1], s[1])];
  }, [1 / 0, -1 / 0]) : null;
}, Qg = function(t, r, n, a, i) {
  var o = r.map(function(s) {
    var l = s.props.dataKey;
    return n === "number" && l && Jg(t, s, l, a) || Aa(t, l, n, i);
  });
  if (n === "number")
    return o.reduce(
      // @ts-expect-error if (type === number) means that the domain is numerical type
      // - but this link is missing in the type definition
      function(s, l) {
        return [Math.min(s[0], l[0]), Math.max(s[1], l[1])];
      },
      [1 / 0, -1 / 0]
    );
  var c = {};
  return o.reduce(function(s, l) {
    for (var f = 0, u = l.length; f < u; f++)
      c[l[f]] || (c[l[f]] = !0, s.push(l[f]));
    return s;
  }, []);
}, eb = function(t, r) {
  return t === "horizontal" && r === "xAxis" || t === "vertical" && r === "yAxis" || t === "centric" && r === "angleAxis" || t === "radial" && r === "radiusAxis";
}, tb = function(t, r, n, a) {
  if (a)
    return t.map(function(s) {
      return s.coordinate;
    });
  var i, o, c = t.map(function(s) {
    return s.coordinate === r && (i = !0), s.coordinate === n && (o = !0), s.coordinate;
  });
  return i || c.push(r), o || c.push(n), c;
}, Yt = function(t, r, n) {
  if (!t) return null;
  var a = t.scale, i = t.duplicateDomain, o = t.type, c = t.range, s = t.realScaleType === "scaleBand" ? a.bandwidth() / 2 : 2, l = (r || n) && o === "category" && a.bandwidth ? a.bandwidth() / s : 0;
  if (l = t.axisType === "angleAxis" && (c == null ? void 0 : c.length) >= 2 ? Je(c[0] - c[1]) * 2 * l : l, r && (t.ticks || t.niceTicks)) {
    var f = (t.ticks || t.niceTicks).map(function(u) {
      var d = i ? i.indexOf(u) : u;
      return {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: a(d) + l,
        value: u,
        offset: l
      };
    });
    return f.filter(function(u) {
      return !ra(u.coordinate);
    });
  }
  return t.isCategorical && t.categoricalDomain ? t.categoricalDomain.map(function(u, d) {
    return {
      coordinate: a(u) + l,
      value: u,
      index: d,
      offset: l
    };
  }) : a.ticks && !n ? a.ticks(t.tickCount).map(function(u) {
    return {
      coordinate: a(u) + l,
      value: u,
      offset: l
    };
  }) : a.domain().map(function(u, d) {
    return {
      coordinate: a(u) + l,
      value: i ? i[u] : u,
      index: d,
      offset: l
    };
  });
}, Ps = /* @__PURE__ */ new WeakMap(), Li = function(t, r) {
  if (typeof r != "function")
    return t;
  Ps.has(t) || Ps.set(t, /* @__PURE__ */ new WeakMap());
  var n = Ps.get(t);
  if (n.has(r))
    return n.get(r);
  var a = function() {
    t.apply(void 0, arguments), r.apply(void 0, arguments);
  };
  return n.set(r, a), a;
}, rb = function(t, r, n) {
  var a = t.scale, i = t.type, o = t.layout, c = t.axisType;
  if (a === "auto")
    return o === "radial" && c === "radiusAxis" ? {
      scale: za(),
      realScaleType: "band"
    } : o === "radial" && c === "angleAxis" ? {
      scale: So(),
      realScaleType: "linear"
    } : i === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? {
      scale: _a(),
      realScaleType: "point"
    } : i === "category" ? {
      scale: za(),
      realScaleType: "band"
    } : {
      scale: So(),
      realScaleType: "linear"
    };
  if (Vr(a)) {
    var s = "scale".concat(pc(a));
    return {
      scale: (cp[s] || _a)(),
      realScaleType: cp[s] ? s : "point"
    };
  }
  return ie(a) ? {
    scale: a
  } : {
    scale: _a(),
    realScaleType: "point"
  };
}, vp = 1e-4, nb = function(t) {
  var r = t.domain();
  if (!(!r || r.length <= 2)) {
    var n = r.length, a = t.range(), i = Math.min(a[0], a[1]) - vp, o = Math.max(a[0], a[1]) + vp, c = t(r[0]), s = t(r[n - 1]);
    (c < i || c > o || s < i || s > o) && t.domain([r[0], r[n - 1]]);
  }
}, eF = function(t, r) {
  if (!t)
    return null;
  for (var n = 0, a = t.length; n < a; n++)
    if (t[n].item === r)
      return t[n].position;
  return null;
}, tF = function(t, r) {
  if (!r || r.length !== 2 || !H(r[0]) || !H(r[1]))
    return t;
  var n = Math.min(r[0], r[1]), a = Math.max(r[0], r[1]), i = [t[0], t[1]];
  return (!H(t[0]) || t[0] < n) && (i[0] = n), (!H(t[1]) || t[1] > a) && (i[1] = a), i[0] > a && (i[0] = a), i[1] < n && (i[1] = n), i;
}, rF = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, a = t[0].length; n < a; ++n)
      for (var i = 0, o = 0, c = 0; c < r; ++c) {
        var s = ra(t[c][n][1]) ? t[c][n][0] : t[c][n][1];
        s >= 0 ? (t[c][n][0] = i, t[c][n][1] = i + s, i = t[c][n][1]) : (t[c][n][0] = o, t[c][n][1] = o + s, o = t[c][n][1]);
      }
}, nF = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, a = t[0].length; n < a; ++n)
      for (var i = 0, o = 0; o < r; ++o) {
        var c = ra(t[o][n][1]) ? t[o][n][0] : t[o][n][1];
        c >= 0 ? (t[o][n][0] = i, t[o][n][1] = i + c, i = t[o][n][1]) : (t[o][n][0] = 0, t[o][n][1] = 0);
      }
}, aF = {
  sign: rF,
  // @ts-expect-error definitelytyped types are incorrect
  expand: OA,
  // @ts-expect-error definitelytyped types are incorrect
  none: On,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: SA,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: PA,
  positive: nF
}, iF = function(t, r, n) {
  var a = r.map(function(c) {
    return c.props.dataKey;
  }), i = aF[n], o = xA().keys(a).value(function(c, s) {
    return +We(c, s, 0);
  }).order(el).offset(i);
  return o(t);
}, oF = function(t, r, n, a, i, o) {
  if (!t)
    return null;
  var c = o ? r.reverse() : r, s = {}, l = c.reduce(function(u, d) {
    var h, m = (h = d.type) !== null && h !== void 0 && h.defaultProps ? De(De({}, d.type.defaultProps), d.props) : d.props, v = m.stackId, p = m.hide;
    if (p)
      return u;
    var b = m[n], g = u[b] || {
      hasStack: !1,
      stackGroups: {}
    };
    if (Ue(v)) {
      var O = g.stackGroups[v] || {
        numericAxisId: n,
        cateAxisId: a,
        items: []
      };
      O.items.push(d), g.hasStack = !0, g.stackGroups[v] = O;
    } else
      g.stackGroups[na("_stackId_")] = {
        numericAxisId: n,
        cateAxisId: a,
        items: [d]
      };
    return De(De({}, u), {}, gn({}, b, g));
  }, s), f = {};
  return Object.keys(l).reduce(function(u, d) {
    var h = l[d];
    if (h.hasStack) {
      var m = {};
      h.stackGroups = Object.keys(h.stackGroups).reduce(function(v, p) {
        var b = h.stackGroups[p];
        return De(De({}, v), {}, gn({}, p, {
          numericAxisId: n,
          cateAxisId: a,
          items: b.items,
          stackedData: iF(t, b.items, i)
        }));
      }, m);
    }
    return De(De({}, u), {}, gn({}, d, h));
  }, f);
}, ab = function(t, r) {
  var n = r.realScaleType, a = r.type, i = r.tickCount, o = r.originalDomain, c = r.allowDecimals, s = n || r.scale;
  if (s !== "auto" && s !== "linear")
    return null;
  if (i && a === "number" && o && (o[0] === "auto" || o[1] === "auto")) {
    var l = t.domain();
    if (!l.length)
      return null;
    var f = wL(l, i, c);
    return t.domain([Tc(f), pr(f)]), {
      niceTicks: f
    };
  }
  if (i && a === "number") {
    var u = t.domain(), d = xL(u, i, c);
    return {
      niceTicks: d
    };
  }
  return null;
};
function mp(e) {
  var t = e.axis, r = e.ticks, n = e.bandSize, a = e.entry, i = e.index, o = e.dataKey;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !ce(a[t.dataKey])) {
      var c = eo(r, "value", a[t.dataKey]);
      if (c)
        return c.coordinate + n / 2;
    }
    return r[i] ? r[i].coordinate + n / 2 : null;
  }
  var s = We(a, ce(o) ? t.dataKey : o);
  return ce(s) ? null : t.scale(s);
}
var yp = function(t) {
  var r = t.axis, n = t.ticks, a = t.offset, i = t.bandSize, o = t.entry, c = t.index;
  if (r.type === "category")
    return n[c] ? n[c].coordinate + a : null;
  var s = We(o, r.dataKey, r.domain[c]);
  return ce(s) ? null : r.scale(s) - i / 2 + a;
}, cF = function(t) {
  var r = t.numericAxis, n = r.scale.domain();
  if (r.type === "number") {
    var a = Math.min(n[0], n[1]), i = Math.max(n[0], n[1]);
    return a <= 0 && i >= 0 ? 0 : i < 0 ? i : a;
  }
  return n[0];
}, sF = function(t, r) {
  var n, a = (n = t.type) !== null && n !== void 0 && n.defaultProps ? De(De({}, t.type.defaultProps), t.props) : t.props, i = a.stackId;
  if (Ue(i)) {
    var o = r[i];
    if (o) {
      var c = o.items.indexOf(t);
      return c >= 0 ? o.stackedData[c] : null;
    }
  }
  return null;
}, lF = function(t) {
  return t.reduce(function(r, n) {
    return [Tc(n.concat([r[0]]).filter(H)), pr(n.concat([r[1]]).filter(H))];
  }, [1 / 0, -1 / 0]);
}, ib = function(t, r, n) {
  return Object.keys(t).reduce(function(a, i) {
    var o = t[i], c = o.stackedData, s = c.reduce(function(l, f) {
      var u = lF(f.slice(r, n + 1));
      return [Math.min(l[0], u[0]), Math.max(l[1], u[1])];
    }, [1 / 0, -1 / 0]);
    return [Math.min(s[0], a[0]), Math.max(s[1], a[1])];
  }, [1 / 0, -1 / 0]).map(function(a) {
    return a === 1 / 0 || a === -1 / 0 ? 0 : a;
  });
}, gp = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, bp = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Cl = function(t, r, n) {
  if (ie(t))
    return t(r, n);
  if (!Array.isArray(t))
    return r;
  var a = [];
  if (H(t[0]))
    a[0] = n ? t[0] : Math.min(t[0], r[0]);
  else if (gp.test(t[0])) {
    var i = +gp.exec(t[0])[1];
    a[0] = r[0] - i;
  } else ie(t[0]) ? a[0] = t[0](r[0]) : a[0] = r[0];
  if (H(t[1]))
    a[1] = n ? t[1] : Math.max(t[1], r[1]);
  else if (bp.test(t[1])) {
    var o = +bp.exec(t[1])[1];
    a[1] = r[1] + o;
  } else ie(t[1]) ? a[1] = t[1](r[1]) : a[1] = r[1];
  return a;
}, Co = function(t, r, n) {
  if (t && t.scale && t.scale.bandwidth) {
    var a = t.scale.bandwidth();
    if (!n || a > 0)
      return a;
  }
  if (t && r && r.length >= 2) {
    for (var i = Yu(r, function(u) {
      return u.coordinate;
    }), o = 1 / 0, c = 1, s = i.length; c < s; c++) {
      var l = i[c], f = i[c - 1];
      o = Math.min((l.coordinate || 0) - (f.coordinate || 0), o);
    }
    return o === 1 / 0 ? 0 : o;
  }
  return n ? void 0 : 0;
}, wp = function(t, r, n) {
  return !t || !t.length || Cn(t, lt(n, "type.defaultProps.domain")) ? r : t;
}, ob = function(t, r) {
  var n = t.type.defaultProps ? De(De({}, t.type.defaultProps), t.props) : t.props, a = n.dataKey, i = n.name, o = n.unit, c = n.formatter, s = n.tooltipType, l = n.chartType, f = n.hide;
  return De(De({}, te(t, !1)), {}, {
    dataKey: a,
    unit: o,
    formatter: c,
    name: i || a,
    color: Of(t),
    value: We(r, a),
    type: s,
    payload: r,
    chartType: l,
    hide: f
  });
};
function Xa(e) {
  "@babel/helpers - typeof";
  return Xa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Xa(e);
}
function xp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xp(Object(r), !0).forEach(function(n) {
      cb(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function cb(e, t, r) {
  return t = uF(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function uF(e) {
  var t = fF(e, "string");
  return Xa(t) == "symbol" ? t : t + "";
}
function fF(e, t) {
  if (Xa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Xa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function dF(e, t) {
  return mF(e) || vF(e, t) || pF(e, t) || hF();
}
function hF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function pF(e, t) {
  if (e) {
    if (typeof e == "string") return Op(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Op(e, t);
  }
}
function Op(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function vF(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, c = [], s = !0, l = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (c.push(n.value), c.length !== t); s = !0) ;
    } catch (f) {
      l = !0, a = f;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw a;
      }
    }
    return c;
  }
}
function mF(e) {
  if (Array.isArray(e)) return e;
}
var Mo = Math.PI / 180, yF = function(t) {
  return t * 180 / Math.PI;
}, Me = function(t, r, n, a) {
  return {
    x: t + Math.cos(-Mo * a) * n,
    y: r + Math.sin(-Mo * a) * n
  };
}, sb = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, gF = function(t, r, n, a, i) {
  var o = t.width, c = t.height, s = t.startAngle, l = t.endAngle, f = Qe(t.cx, o, o / 2), u = Qe(t.cy, c, c / 2), d = sb(o, c, n), h = Qe(t.innerRadius, d, 0), m = Qe(t.outerRadius, d, d * 0.8), v = Object.keys(r);
  return v.reduce(function(p, b) {
    var g = r[b], O = g.domain, S = g.reversed, y;
    if (ce(g.range))
      a === "angleAxis" ? y = [s, l] : a === "radiusAxis" && (y = [h, m]), S && (y = [y[1], y[0]]);
    else {
      y = g.range;
      var w = y, P = dF(w, 2);
      s = P[0], l = P[1];
    }
    var _ = rb(g, i), $ = _.realScaleType, E = _.scale;
    E.domain(O).range(y), nb(E);
    var j = ab(E, qt(qt({}, g), {}, {
      realScaleType: $
    })), C = qt(qt(qt({}, g), j), {}, {
      range: y,
      radius: m,
      realScaleType: $,
      scale: E,
      cx: f,
      cy: u,
      innerRadius: h,
      outerRadius: m,
      startAngle: s,
      endAngle: l
    });
    return qt(qt({}, p), {}, cb({}, b, C));
  }, {});
}, bF = function(t, r) {
  var n = t.x, a = t.y, i = r.x, o = r.y;
  return Math.sqrt(Math.pow(n - i, 2) + Math.pow(a - o, 2));
}, wF = function(t, r) {
  var n = t.x, a = t.y, i = r.cx, o = r.cy, c = bF({
    x: n,
    y: a
  }, {
    x: i,
    y: o
  });
  if (c <= 0)
    return {
      radius: c
    };
  var s = (n - i) / c, l = Math.acos(s);
  return a > o && (l = 2 * Math.PI - l), {
    radius: c,
    angle: yF(l),
    angleInRadian: l
  };
}, xF = function(t) {
  var r = t.startAngle, n = t.endAngle, a = Math.floor(r / 360), i = Math.floor(n / 360), o = Math.min(a, i);
  return {
    startAngle: r - o * 360,
    endAngle: n - o * 360
  };
}, OF = function(t, r) {
  var n = r.startAngle, a = r.endAngle, i = Math.floor(n / 360), o = Math.floor(a / 360), c = Math.min(i, o);
  return t + c * 360;
}, Sp = function(t, r) {
  var n = t.x, a = t.y, i = wF({
    x: n,
    y: a
  }, r), o = i.radius, c = i.angle, s = r.innerRadius, l = r.outerRadius;
  if (o < s || o > l)
    return !1;
  if (o === 0)
    return !0;
  var f = xF(r), u = f.startAngle, d = f.endAngle, h = c, m;
  if (u <= d) {
    for (; h > d; )
      h -= 360;
    for (; h < u; )
      h += 360;
    m = h >= u && h <= d;
  } else {
    for (; h > u; )
      h -= 360;
    for (; h < d; )
      h += 360;
    m = h >= d && h <= u;
  }
  return m ? qt(qt({}, r), {}, {
    radius: o,
    angle: OF(h, r)
  }) : null;
}, lb = function(t) {
  return !/* @__PURE__ */ Pt(t) && !ie(t) && typeof t != "boolean" ? t.className : "";
};
function Za(e) {
  "@babel/helpers - typeof";
  return Za = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Za(e);
}
var SF = ["offset"];
function PF(e) {
  return TF(e) || EF(e) || AF(e) || _F();
}
function _F() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function AF(e, t) {
  if (e) {
    if (typeof e == "string") return Ml(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ml(e, t);
  }
}
function EF(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function TF(e) {
  if (Array.isArray(e)) return Ml(e);
}
function Ml(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function $F(e, t) {
  if (e == null) return {};
  var r = CF(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function CF(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Pp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Be(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Pp(Object(r), !0).forEach(function(n) {
      MF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Pp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function MF(e, t, r) {
  return t = jF(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function jF(e) {
  var t = NF(e, "string");
  return Za(t) == "symbol" ? t : t + "";
}
function NF(e, t) {
  if (Za(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Za(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ja() {
  return Ja = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ja.apply(this, arguments);
}
var kF = function(t) {
  var r = t.value, n = t.formatter, a = ce(t.children) ? r : t.children;
  return ie(n) ? n(a) : a;
}, IF = function(t, r) {
  var n = Je(r - t), a = Math.min(Math.abs(r - t), 360);
  return n * a;
}, DF = function(t, r, n) {
  var a = t.position, i = t.viewBox, o = t.offset, c = t.className, s = i, l = s.cx, f = s.cy, u = s.innerRadius, d = s.outerRadius, h = s.startAngle, m = s.endAngle, v = s.clockWise, p = (u + d) / 2, b = IF(h, m), g = b >= 0 ? 1 : -1, O, S;
  a === "insideStart" ? (O = h + g * o, S = v) : a === "insideEnd" ? (O = m - g * o, S = !v) : a === "end" && (O = m + g * o, S = v), S = b <= 0 ? S : !S;
  var y = Me(l, f, p, O), w = Me(l, f, p, O + (S ? 1 : -1) * 359), P = "M".concat(y.x, ",").concat(y.y, `
    A`).concat(p, ",").concat(p, ",0,1,").concat(S ? 0 : 1, `,
    `).concat(w.x, ",").concat(w.y), _ = ce(t.id) ? na("recharts-radial-line-") : t.id;
  return /* @__PURE__ */ T.createElement("text", Ja({}, n, {
    dominantBaseline: "central",
    className: le("recharts-radial-bar-label", c)
  }), /* @__PURE__ */ T.createElement("defs", null, /* @__PURE__ */ T.createElement("path", {
    id: _,
    d: P
  })), /* @__PURE__ */ T.createElement("textPath", {
    xlinkHref: "#".concat(_)
  }, r));
}, RF = function(t) {
  var r = t.viewBox, n = t.offset, a = t.position, i = r, o = i.cx, c = i.cy, s = i.innerRadius, l = i.outerRadius, f = i.startAngle, u = i.endAngle, d = (f + u) / 2;
  if (a === "outside") {
    var h = Me(o, c, l + n, d), m = h.x, v = h.y;
    return {
      x: m,
      y: v,
      textAnchor: m >= o ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (a === "center")
    return {
      x: o,
      y: c,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  if (a === "centerTop")
    return {
      x: o,
      y: c,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  if (a === "centerBottom")
    return {
      x: o,
      y: c,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  var p = (s + l) / 2, b = Me(o, c, p, d), g = b.x, O = b.y;
  return {
    x: g,
    y: O,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, LF = function(t) {
  var r = t.viewBox, n = t.parentViewBox, a = t.offset, i = t.position, o = r, c = o.x, s = o.y, l = o.width, f = o.height, u = f >= 0 ? 1 : -1, d = u * a, h = u > 0 ? "end" : "start", m = u > 0 ? "start" : "end", v = l >= 0 ? 1 : -1, p = v * a, b = v > 0 ? "end" : "start", g = v > 0 ? "start" : "end";
  if (i === "top") {
    var O = {
      x: c + l / 2,
      y: s - u * a,
      textAnchor: "middle",
      verticalAnchor: h
    };
    return Be(Be({}, O), n ? {
      height: Math.max(s - n.y, 0),
      width: l
    } : {});
  }
  if (i === "bottom") {
    var S = {
      x: c + l / 2,
      y: s + f + d,
      textAnchor: "middle",
      verticalAnchor: m
    };
    return Be(Be({}, S), n ? {
      height: Math.max(n.y + n.height - (s + f), 0),
      width: l
    } : {});
  }
  if (i === "left") {
    var y = {
      x: c - p,
      y: s + f / 2,
      textAnchor: b,
      verticalAnchor: "middle"
    };
    return Be(Be({}, y), n ? {
      width: Math.max(y.x - n.x, 0),
      height: f
    } : {});
  }
  if (i === "right") {
    var w = {
      x: c + l + p,
      y: s + f / 2,
      textAnchor: g,
      verticalAnchor: "middle"
    };
    return Be(Be({}, w), n ? {
      width: Math.max(n.x + n.width - w.x, 0),
      height: f
    } : {});
  }
  var P = n ? {
    width: l,
    height: f
  } : {};
  return i === "insideLeft" ? Be({
    x: c + p,
    y: s + f / 2,
    textAnchor: g,
    verticalAnchor: "middle"
  }, P) : i === "insideRight" ? Be({
    x: c + l - p,
    y: s + f / 2,
    textAnchor: b,
    verticalAnchor: "middle"
  }, P) : i === "insideTop" ? Be({
    x: c + l / 2,
    y: s + d,
    textAnchor: "middle",
    verticalAnchor: m
  }, P) : i === "insideBottom" ? Be({
    x: c + l / 2,
    y: s + f - d,
    textAnchor: "middle",
    verticalAnchor: h
  }, P) : i === "insideTopLeft" ? Be({
    x: c + p,
    y: s + d,
    textAnchor: g,
    verticalAnchor: m
  }, P) : i === "insideTopRight" ? Be({
    x: c + l - p,
    y: s + d,
    textAnchor: b,
    verticalAnchor: m
  }, P) : i === "insideBottomLeft" ? Be({
    x: c + p,
    y: s + f - d,
    textAnchor: g,
    verticalAnchor: h
  }, P) : i === "insideBottomRight" ? Be({
    x: c + l - p,
    y: s + f - d,
    textAnchor: b,
    verticalAnchor: h
  }, P) : Jn(i) && (H(i.x) || Dr(i.x)) && (H(i.y) || Dr(i.y)) ? Be({
    x: c + Qe(i.x, l),
    y: s + Qe(i.y, f),
    textAnchor: "end",
    verticalAnchor: "end"
  }, P) : Be({
    x: c + l / 2,
    y: s + f / 2,
    textAnchor: "middle",
    verticalAnchor: "middle"
  }, P);
}, FF = function(t) {
  return "cx" in t && H(t.cx);
};
function He(e) {
  var t = e.offset, r = t === void 0 ? 5 : t, n = $F(e, SF), a = Be({
    offset: r
  }, n), i = a.viewBox, o = a.position, c = a.value, s = a.children, l = a.content, f = a.className, u = f === void 0 ? "" : f, d = a.textBreakAll;
  if (!i || ce(c) && ce(s) && !/* @__PURE__ */ Pt(l) && !ie(l))
    return null;
  if (/* @__PURE__ */ Pt(l))
    return /* @__PURE__ */ ze(l, a);
  var h;
  if (ie(l)) {
    if (h = /* @__PURE__ */ Ca(l, a), /* @__PURE__ */ Pt(h))
      return h;
  } else
    h = kF(a);
  var m = FF(i), v = te(a, !0);
  if (m && (o === "insideStart" || o === "insideEnd" || o === "end"))
    return DF(a, h, v);
  var p = m ? RF(a) : LF(a);
  return /* @__PURE__ */ T.createElement(Hr, Ja({
    className: le("recharts-label", u)
  }, v, p, {
    breakAll: d
  }), h);
}
He.displayName = "Label";
var ub = function(t) {
  var r = t.cx, n = t.cy, a = t.angle, i = t.startAngle, o = t.endAngle, c = t.r, s = t.radius, l = t.innerRadius, f = t.outerRadius, u = t.x, d = t.y, h = t.top, m = t.left, v = t.width, p = t.height, b = t.clockWise, g = t.labelViewBox;
  if (g)
    return g;
  if (H(v) && H(p)) {
    if (H(u) && H(d))
      return {
        x: u,
        y: d,
        width: v,
        height: p
      };
    if (H(h) && H(m))
      return {
        x: h,
        y: m,
        width: v,
        height: p
      };
  }
  return H(u) && H(d) ? {
    x: u,
    y: d,
    width: 0,
    height: 0
  } : H(r) && H(n) ? {
    cx: r,
    cy: n,
    startAngle: i || a || 0,
    endAngle: o || a || 0,
    innerRadius: l || 0,
    outerRadius: f || s || c || 0,
    clockWise: b
  } : t.viewBox ? t.viewBox : {};
}, BF = function(t, r) {
  return t ? t === !0 ? /* @__PURE__ */ T.createElement(He, {
    key: "label-implicit",
    viewBox: r
  }) : Ue(t) ? /* @__PURE__ */ T.createElement(He, {
    key: "label-implicit",
    viewBox: r,
    value: t
  }) : /* @__PURE__ */ Pt(t) ? t.type === He ? /* @__PURE__ */ ze(t, {
    key: "label-implicit",
    viewBox: r
  }) : /* @__PURE__ */ T.createElement(He, {
    key: "label-implicit",
    content: t,
    viewBox: r
  }) : ie(t) ? /* @__PURE__ */ T.createElement(He, {
    key: "label-implicit",
    content: t,
    viewBox: r
  }) : Jn(t) ? /* @__PURE__ */ T.createElement(He, Ja({
    viewBox: r
  }, t, {
    key: "label-implicit"
  })) : null : null;
}, zF = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && n && !t.label)
    return null;
  var a = t.children, i = ub(t), o = mt(a, He).map(function(s, l) {
    return /* @__PURE__ */ ze(s, {
      viewBox: r || i,
      // eslint-disable-next-line react/no-array-index-key
      key: "label-".concat(l)
    });
  });
  if (!n)
    return o;
  var c = BF(t.label, r || i);
  return [c].concat(PF(o));
};
He.parseViewBox = ub;
He.renderCallByParent = zF;
function WF(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
var UF = WF;
const VF = /* @__PURE__ */ Pe(UF);
function Qa(e) {
  "@babel/helpers - typeof";
  return Qa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Qa(e);
}
var qF = ["valueAccessor"], HF = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function GF(e) {
  return ZF(e) || XF(e) || KF(e) || YF();
}
function YF() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function KF(e, t) {
  if (e) {
    if (typeof e == "string") return jl(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return jl(e, t);
  }
}
function XF(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function ZF(e) {
  if (Array.isArray(e)) return jl(e);
}
function jl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function jo() {
  return jo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, jo.apply(this, arguments);
}
function _p(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ap(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _p(Object(r), !0).forEach(function(n) {
      JF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _p(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function JF(e, t, r) {
  return t = QF(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function QF(e) {
  var t = eB(e, "string");
  return Qa(t) == "symbol" ? t : t + "";
}
function eB(e, t) {
  if (Qa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Qa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ep(e, t) {
  if (e == null) return {};
  var r = tB(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function tB(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var rB = function(t) {
  return Array.isArray(t.value) ? VF(t.value) : t.value;
};
function Jt(e) {
  var t = e.valueAccessor, r = t === void 0 ? rB : t, n = Ep(e, qF), a = n.data, i = n.dataKey, o = n.clockWise, c = n.id, s = n.textBreakAll, l = Ep(n, HF);
  return !a || !a.length ? null : /* @__PURE__ */ T.createElement(pe, {
    className: "recharts-label-list"
  }, a.map(function(f, u) {
    var d = ce(i) ? r(f, u) : We(f && f.payload, i), h = ce(c) ? {} : {
      id: "".concat(c, "-").concat(u)
    };
    return /* @__PURE__ */ T.createElement(He, jo({}, te(f, !0), l, h, {
      parentViewBox: f.parentViewBox,
      value: d,
      textBreakAll: s,
      viewBox: He.parseViewBox(ce(o) ? f : Ap(Ap({}, f), {}, {
        clockWise: o
      })),
      key: "label-".concat(u),
      index: u
    }));
  }));
}
Jt.displayName = "LabelList";
function nB(e, t) {
  return e ? e === !0 ? /* @__PURE__ */ T.createElement(Jt, {
    key: "labelList-implicit",
    data: t
  }) : /* @__PURE__ */ T.isValidElement(e) || ie(e) ? /* @__PURE__ */ T.createElement(Jt, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : Jn(e) ? /* @__PURE__ */ T.createElement(Jt, jo({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null;
}
function aB(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || !e.children && r && !e.label)
    return null;
  var n = e.children, a = mt(n, Jt).map(function(o, c) {
    return /* @__PURE__ */ ze(o, {
      data: t,
      // eslint-disable-next-line react/no-array-index-key
      key: "labelList-".concat(c)
    });
  });
  if (!r)
    return a;
  var i = nB(e.label, t);
  return [i].concat(GF(a));
}
Jt.renderCallByParent = aB;
function ei(e) {
  "@babel/helpers - typeof";
  return ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ei(e);
}
function Nl() {
  return Nl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Nl.apply(this, arguments);
}
function Tp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function $p(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Tp(Object(r), !0).forEach(function(n) {
      iB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Tp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function iB(e, t, r) {
  return t = oB(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function oB(e) {
  var t = cB(e, "string");
  return ei(t) == "symbol" ? t : t + "";
}
function cB(e, t) {
  if (ei(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ei(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var sB = function(t, r) {
  var n = Je(r - t), a = Math.min(Math.abs(r - t), 359.999);
  return n * a;
}, Fi = function(t) {
  var r = t.cx, n = t.cy, a = t.radius, i = t.angle, o = t.sign, c = t.isExternal, s = t.cornerRadius, l = t.cornerIsExternal, f = s * (c ? 1 : -1) + a, u = Math.asin(s / f) / Mo, d = l ? i : i + o * u, h = Me(r, n, f, d), m = Me(r, n, a, d), v = l ? i - o * u : i, p = Me(r, n, f * Math.cos(u * Mo), v);
  return {
    center: h,
    circleTangency: m,
    lineTangency: p,
    theta: u
  };
}, fb = function(t) {
  var r = t.cx, n = t.cy, a = t.innerRadius, i = t.outerRadius, o = t.startAngle, c = t.endAngle, s = sB(o, c), l = o + s, f = Me(r, n, i, o), u = Me(r, n, i, l), d = "M ".concat(f.x, ",").concat(f.y, `
    A `).concat(i, ",").concat(i, `,0,
    `).concat(+(Math.abs(s) > 180), ",").concat(+(o > l), `,
    `).concat(u.x, ",").concat(u.y, `
  `);
  if (a > 0) {
    var h = Me(r, n, a, o), m = Me(r, n, a, l);
    d += "L ".concat(m.x, ",").concat(m.y, `
            A `).concat(a, ",").concat(a, `,0,
            `).concat(+(Math.abs(s) > 180), ",").concat(+(o <= l), `,
            `).concat(h.x, ",").concat(h.y, " Z");
  } else
    d += "L ".concat(r, ",").concat(n, " Z");
  return d;
}, lB = function(t) {
  var r = t.cx, n = t.cy, a = t.innerRadius, i = t.outerRadius, o = t.cornerRadius, c = t.forceCornerRadius, s = t.cornerIsExternal, l = t.startAngle, f = t.endAngle, u = Je(f - l), d = Fi({
    cx: r,
    cy: n,
    radius: i,
    angle: l,
    sign: u,
    cornerRadius: o,
    cornerIsExternal: s
  }), h = d.circleTangency, m = d.lineTangency, v = d.theta, p = Fi({
    cx: r,
    cy: n,
    radius: i,
    angle: f,
    sign: -u,
    cornerRadius: o,
    cornerIsExternal: s
  }), b = p.circleTangency, g = p.lineTangency, O = p.theta, S = s ? Math.abs(l - f) : Math.abs(l - f) - v - O;
  if (S < 0)
    return c ? "M ".concat(m.x, ",").concat(m.y, `
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(o * 2, `,0
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(-o * 2, `,0
      `) : fb({
      cx: r,
      cy: n,
      innerRadius: a,
      outerRadius: i,
      startAngle: l,
      endAngle: f
    });
  var y = "M ".concat(m.x, ",").concat(m.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(u < 0), ",").concat(h.x, ",").concat(h.y, `
    A`).concat(i, ",").concat(i, ",0,").concat(+(S > 180), ",").concat(+(u < 0), ",").concat(b.x, ",").concat(b.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(u < 0), ",").concat(g.x, ",").concat(g.y, `
  `);
  if (a > 0) {
    var w = Fi({
      cx: r,
      cy: n,
      radius: a,
      angle: l,
      sign: u,
      isExternal: !0,
      cornerRadius: o,
      cornerIsExternal: s
    }), P = w.circleTangency, _ = w.lineTangency, $ = w.theta, E = Fi({
      cx: r,
      cy: n,
      radius: a,
      angle: f,
      sign: -u,
      isExternal: !0,
      cornerRadius: o,
      cornerIsExternal: s
    }), j = E.circleTangency, C = E.lineTangency, D = E.theta, I = s ? Math.abs(l - f) : Math.abs(l - f) - $ - D;
    if (I < 0 && o === 0)
      return "".concat(y, "L").concat(r, ",").concat(n, "Z");
    y += "L".concat(C.x, ",").concat(C.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(u < 0), ",").concat(j.x, ",").concat(j.y, `
      A`).concat(a, ",").concat(a, ",0,").concat(+(I > 180), ",").concat(+(u > 0), ",").concat(P.x, ",").concat(P.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(u < 0), ",").concat(_.x, ",").concat(_.y, "Z");
  } else
    y += "L".concat(r, ",").concat(n, "Z");
  return y;
}, uB = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, db = function(t) {
  var r = $p($p({}, uB), t), n = r.cx, a = r.cy, i = r.innerRadius, o = r.outerRadius, c = r.cornerRadius, s = r.forceCornerRadius, l = r.cornerIsExternal, f = r.startAngle, u = r.endAngle, d = r.className;
  if (o < i || f === u)
    return null;
  var h = le("recharts-sector", d), m = o - i, v = Qe(c, m, 0, !0), p;
  return v > 0 && Math.abs(f - u) < 360 ? p = lB({
    cx: n,
    cy: a,
    innerRadius: i,
    outerRadius: o,
    cornerRadius: Math.min(v, m / 2),
    forceCornerRadius: s,
    cornerIsExternal: l,
    startAngle: f,
    endAngle: u
  }) : p = fb({
    cx: n,
    cy: a,
    innerRadius: i,
    outerRadius: o,
    startAngle: f,
    endAngle: u
  }), /* @__PURE__ */ T.createElement("path", Nl({}, te(r, !0), {
    className: h,
    d: p,
    role: "img"
  }));
};
function ti(e) {
  "@babel/helpers - typeof";
  return ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ti(e);
}
function kl() {
  return kl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, kl.apply(this, arguments);
}
function Cp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Mp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cp(Object(r), !0).forEach(function(n) {
      fB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Cp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function fB(e, t, r) {
  return t = dB(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function dB(e) {
  var t = hB(e, "string");
  return ti(t) == "symbol" ? t : t + "";
}
function hB(e, t) {
  if (ti(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ti(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var jp = {
  curveBasisClosed: uA,
  curveBasisOpen: fA,
  curveBasis: lA,
  curveBumpX: K_,
  curveBumpY: X_,
  curveLinearClosed: dA,
  curveLinear: mc,
  curveMonotoneX: hA,
  curveMonotoneY: pA,
  curveNatural: vA,
  curveStep: mA,
  curveStepAfter: gA,
  curveStepBefore: yA
}, Bi = function(t) {
  return t.x === +t.x && t.y === +t.y;
}, ya = function(t) {
  return t.x;
}, ga = function(t) {
  return t.y;
}, pB = function(t, r) {
  if (ie(t))
    return t;
  var n = "curve".concat(pc(t));
  return (n === "curveMonotone" || n === "curveBump") && r ? jp["".concat(n).concat(r === "vertical" ? "Y" : "X")] : jp[n] || mc;
}, vB = function(t) {
  var r = t.type, n = r === void 0 ? "linear" : r, a = t.points, i = a === void 0 ? [] : a, o = t.baseLine, c = t.layout, s = t.connectNulls, l = s === void 0 ? !1 : s, f = pB(n, c), u = l ? i.filter(function(v) {
    return Bi(v);
  }) : i, d;
  if (Array.isArray(o)) {
    var h = l ? o.filter(function(v) {
      return Bi(v);
    }) : o, m = u.map(function(v, p) {
      return Mp(Mp({}, v), {}, {
        base: h[p]
      });
    });
    return c === "vertical" ? d = Ci().y(ga).x1(ya).x0(function(v) {
      return v.base.x;
    }) : d = Ci().x(ya).y1(ga).y0(function(v) {
      return v.base.y;
    }), d.defined(Bi).curve(f), d(m);
  }
  return c === "vertical" && H(o) ? d = Ci().y(ga).x1(ya).x0(o) : H(o) ? d = Ci().x(ya).y1(ga).y0(o) : d = cy().x(ya).y(ga), d.defined(Bi).curve(f), d(u);
}, bn = function(t) {
  var r = t.className, n = t.points, a = t.path, i = t.pathRef;
  if ((!n || !n.length) && !a)
    return null;
  var o = n && n.length ? vB(t) : a;
  return /* @__PURE__ */ q.createElement("path", kl({}, te(t, !1), to(t), {
    className: le("recharts-curve", r),
    d: o,
    ref: i
  }));
}, Il = { exports: {} }, zi = { exports: {} }, be = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Np;
function mB() {
  if (Np) return be;
  Np = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, s = e ? Symbol.for("react.async_mode") : 60111, l = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, u = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, p = e ? Symbol.for("react.fundamental") : 60117, b = e ? Symbol.for("react.responder") : 60118, g = e ? Symbol.for("react.scope") : 60119;
  function O(y) {
    if (typeof y == "object" && y !== null) {
      var w = y.$$typeof;
      switch (w) {
        case t:
          switch (y = y.type, y) {
            case s:
            case l:
            case n:
            case i:
            case a:
            case u:
              return y;
            default:
              switch (y = y && y.$$typeof, y) {
                case c:
                case f:
                case m:
                case h:
                case o:
                  return y;
                default:
                  return w;
              }
          }
        case r:
          return w;
      }
    }
  }
  function S(y) {
    return O(y) === l;
  }
  return be.AsyncMode = s, be.ConcurrentMode = l, be.ContextConsumer = c, be.ContextProvider = o, be.Element = t, be.ForwardRef = f, be.Fragment = n, be.Lazy = m, be.Memo = h, be.Portal = r, be.Profiler = i, be.StrictMode = a, be.Suspense = u, be.isAsyncMode = function(y) {
    return S(y) || O(y) === s;
  }, be.isConcurrentMode = S, be.isContextConsumer = function(y) {
    return O(y) === c;
  }, be.isContextProvider = function(y) {
    return O(y) === o;
  }, be.isElement = function(y) {
    return typeof y == "object" && y !== null && y.$$typeof === t;
  }, be.isForwardRef = function(y) {
    return O(y) === f;
  }, be.isFragment = function(y) {
    return O(y) === n;
  }, be.isLazy = function(y) {
    return O(y) === m;
  }, be.isMemo = function(y) {
    return O(y) === h;
  }, be.isPortal = function(y) {
    return O(y) === r;
  }, be.isProfiler = function(y) {
    return O(y) === i;
  }, be.isStrictMode = function(y) {
    return O(y) === a;
  }, be.isSuspense = function(y) {
    return O(y) === u;
  }, be.isValidElementType = function(y) {
    return typeof y == "string" || typeof y == "function" || y === n || y === l || y === i || y === a || y === u || y === d || typeof y == "object" && y !== null && (y.$$typeof === m || y.$$typeof === h || y.$$typeof === o || y.$$typeof === c || y.$$typeof === f || y.$$typeof === p || y.$$typeof === b || y.$$typeof === g || y.$$typeof === v);
  }, be.typeOf = O, be;
}
var we = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kp;
function yB() {
  return kp || (kp = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, s = e ? Symbol.for("react.async_mode") : 60111, l = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, u = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, p = e ? Symbol.for("react.fundamental") : 60117, b = e ? Symbol.for("react.responder") : 60118, g = e ? Symbol.for("react.scope") : 60119;
    function O(M) {
      return typeof M == "string" || typeof M == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      M === n || M === l || M === i || M === a || M === u || M === d || typeof M == "object" && M !== null && (M.$$typeof === m || M.$$typeof === h || M.$$typeof === o || M.$$typeof === c || M.$$typeof === f || M.$$typeof === p || M.$$typeof === b || M.$$typeof === g || M.$$typeof === v);
    }
    function S(M) {
      if (typeof M == "object" && M !== null) {
        var fe = M.$$typeof;
        switch (fe) {
          case t:
            var G = M.type;
            switch (G) {
              case s:
              case l:
              case n:
              case i:
              case a:
              case u:
                return G;
              default:
                var Ee = G && G.$$typeof;
                switch (Ee) {
                  case c:
                  case f:
                  case m:
                  case h:
                  case o:
                    return Ee;
                  default:
                    return fe;
                }
            }
          case r:
            return fe;
        }
      }
    }
    var y = s, w = l, P = c, _ = o, $ = t, E = f, j = n, C = m, D = h, I = r, R = i, F = a, k = u, z = !1;
    function V(M) {
      return z || (z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), N(M) || S(M) === s;
    }
    function N(M) {
      return S(M) === l;
    }
    function B(M) {
      return S(M) === c;
    }
    function W(M) {
      return S(M) === o;
    }
    function Y(M) {
      return typeof M == "object" && M !== null && M.$$typeof === t;
    }
    function X(M) {
      return S(M) === f;
    }
    function ee(M) {
      return S(M) === n;
    }
    function re(M) {
      return S(M) === m;
    }
    function oe(M) {
      return S(M) === h;
    }
    function ae(M) {
      return S(M) === r;
    }
    function U(M) {
      return S(M) === i;
    }
    function K(M) {
      return S(M) === a;
    }
    function Q(M) {
      return S(M) === u;
    }
    we.AsyncMode = y, we.ConcurrentMode = w, we.ContextConsumer = P, we.ContextProvider = _, we.Element = $, we.ForwardRef = E, we.Fragment = j, we.Lazy = C, we.Memo = D, we.Portal = I, we.Profiler = R, we.StrictMode = F, we.Suspense = k, we.isAsyncMode = V, we.isConcurrentMode = N, we.isContextConsumer = B, we.isContextProvider = W, we.isElement = Y, we.isForwardRef = X, we.isFragment = ee, we.isLazy = re, we.isMemo = oe, we.isPortal = ae, we.isProfiler = U, we.isStrictMode = K, we.isSuspense = Q, we.isValidElementType = O, we.typeOf = S;
  }()), we;
}
var Ip;
function hb() {
  return Ip || (Ip = 1, process.env.NODE_ENV === "production" ? zi.exports = mB() : zi.exports = yB()), zi.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var _s, Dp;
function gB() {
  if (Dp) return _s;
  Dp = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function n(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function a() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var o = {}, c = 0; c < 10; c++)
        o["_" + String.fromCharCode(c)] = c;
      var s = Object.getOwnPropertyNames(o).map(function(f) {
        return o[f];
      });
      if (s.join("") !== "0123456789")
        return !1;
      var l = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        l[f] = f;
      }), Object.keys(Object.assign({}, l)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return _s = a() ? Object.assign : function(i, o) {
    for (var c, s = n(i), l, f = 1; f < arguments.length; f++) {
      c = Object(arguments[f]);
      for (var u in c)
        t.call(c, u) && (s[u] = c[u]);
      if (e) {
        l = e(c);
        for (var d = 0; d < l.length; d++)
          r.call(c, l[d]) && (s[l[d]] = c[l[d]]);
      }
    }
    return s;
  }, _s;
}
var As, Rp;
function Sf() {
  if (Rp) return As;
  Rp = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return As = e, As;
}
var Es, Lp;
function pb() {
  return Lp || (Lp = 1, Es = Function.call.bind(Object.prototype.hasOwnProperty)), Es;
}
var Ts, Fp;
function bB() {
  if (Fp) return Ts;
  Fp = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Sf(), r = {}, n = pb();
    e = function(i) {
      var o = "Warning: " + i;
      typeof console < "u" && console.error(o);
      try {
        throw new Error(o);
      } catch {
      }
    };
  }
  function a(i, o, c, s, l) {
    if (process.env.NODE_ENV !== "production") {
      for (var f in i)
        if (n(i, f)) {
          var u;
          try {
            if (typeof i[f] != "function") {
              var d = Error(
                (s || "React class") + ": " + c + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw d.name = "Invariant Violation", d;
            }
            u = i[f](o, f, s, c, null, t);
          } catch (m) {
            u = m;
          }
          if (u && !(u instanceof Error) && e(
            (s || "React class") + ": type specification of " + c + " `" + f + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof u + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), u instanceof Error && !(u.message in r)) {
            r[u.message] = !0;
            var h = l ? l() : "";
            e(
              "Failed " + c + " type: " + u.message + (h ?? "")
            );
          }
        }
    }
  }
  return a.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, Ts = a, Ts;
}
var $s, Bp;
function wB() {
  if (Bp) return $s;
  Bp = 1;
  var e = hb(), t = gB(), r = Sf(), n = pb(), a = bB(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(c) {
    var s = "Warning: " + c;
    typeof console < "u" && console.error(s);
    try {
      throw new Error(s);
    } catch {
    }
  });
  function o() {
    return null;
  }
  return $s = function(c, s) {
    var l = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function u(N) {
      var B = N && (l && N[l] || N[f]);
      if (typeof B == "function")
        return B;
    }
    var d = "<<anonymous>>", h = {
      array: b("array"),
      bigint: b("bigint"),
      bool: b("boolean"),
      func: b("function"),
      number: b("number"),
      object: b("object"),
      string: b("string"),
      symbol: b("symbol"),
      any: g(),
      arrayOf: O,
      element: S(),
      elementType: y(),
      instanceOf: w,
      node: E(),
      objectOf: _,
      oneOf: P,
      oneOfType: $,
      shape: C,
      exact: D
    };
    function m(N, B) {
      return N === B ? N !== 0 || 1 / N === 1 / B : N !== N && B !== B;
    }
    function v(N, B) {
      this.message = N, this.data = B && typeof B == "object" ? B : {}, this.stack = "";
    }
    v.prototype = Error.prototype;
    function p(N) {
      if (process.env.NODE_ENV !== "production")
        var B = {}, W = 0;
      function Y(ee, re, oe, ae, U, K, Q) {
        if (ae = ae || d, K = K || oe, Q !== r) {
          if (s) {
            var M = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw M.name = "Invariant Violation", M;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var fe = ae + ":" + oe;
            !B[fe] && // Avoid spamming the console because they are often not actionable except for lib authors
            W < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + K + "` prop on `" + ae + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), B[fe] = !0, W++);
          }
        }
        return re[oe] == null ? ee ? re[oe] === null ? new v("The " + U + " `" + K + "` is marked as required " + ("in `" + ae + "`, but its value is `null`.")) : new v("The " + U + " `" + K + "` is marked as required in " + ("`" + ae + "`, but its value is `undefined`.")) : null : N(re, oe, ae, U, K);
      }
      var X = Y.bind(null, !1);
      return X.isRequired = Y.bind(null, !0), X;
    }
    function b(N) {
      function B(W, Y, X, ee, re, oe) {
        var ae = W[Y], U = F(ae);
        if (U !== N) {
          var K = k(ae);
          return new v(
            "Invalid " + ee + " `" + re + "` of type " + ("`" + K + "` supplied to `" + X + "`, expected ") + ("`" + N + "`."),
            { expectedType: N }
          );
        }
        return null;
      }
      return p(B);
    }
    function g() {
      return p(o);
    }
    function O(N) {
      function B(W, Y, X, ee, re) {
        if (typeof N != "function")
          return new v("Property `" + re + "` of component `" + X + "` has invalid PropType notation inside arrayOf.");
        var oe = W[Y];
        if (!Array.isArray(oe)) {
          var ae = F(oe);
          return new v("Invalid " + ee + " `" + re + "` of type " + ("`" + ae + "` supplied to `" + X + "`, expected an array."));
        }
        for (var U = 0; U < oe.length; U++) {
          var K = N(oe, U, X, ee, re + "[" + U + "]", r);
          if (K instanceof Error)
            return K;
        }
        return null;
      }
      return p(B);
    }
    function S() {
      function N(B, W, Y, X, ee) {
        var re = B[W];
        if (!c(re)) {
          var oe = F(re);
          return new v("Invalid " + X + " `" + ee + "` of type " + ("`" + oe + "` supplied to `" + Y + "`, expected a single ReactElement."));
        }
        return null;
      }
      return p(N);
    }
    function y() {
      function N(B, W, Y, X, ee) {
        var re = B[W];
        if (!e.isValidElementType(re)) {
          var oe = F(re);
          return new v("Invalid " + X + " `" + ee + "` of type " + ("`" + oe + "` supplied to `" + Y + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return p(N);
    }
    function w(N) {
      function B(W, Y, X, ee, re) {
        if (!(W[Y] instanceof N)) {
          var oe = N.name || d, ae = V(W[Y]);
          return new v("Invalid " + ee + " `" + re + "` of type " + ("`" + ae + "` supplied to `" + X + "`, expected ") + ("instance of `" + oe + "`."));
        }
        return null;
      }
      return p(B);
    }
    function P(N) {
      if (!Array.isArray(N))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), o;
      function B(W, Y, X, ee, re) {
        for (var oe = W[Y], ae = 0; ae < N.length; ae++)
          if (m(oe, N[ae]))
            return null;
        var U = JSON.stringify(N, function(Q, M) {
          var fe = k(M);
          return fe === "symbol" ? String(M) : M;
        });
        return new v("Invalid " + ee + " `" + re + "` of value `" + String(oe) + "` " + ("supplied to `" + X + "`, expected one of " + U + "."));
      }
      return p(B);
    }
    function _(N) {
      function B(W, Y, X, ee, re) {
        if (typeof N != "function")
          return new v("Property `" + re + "` of component `" + X + "` has invalid PropType notation inside objectOf.");
        var oe = W[Y], ae = F(oe);
        if (ae !== "object")
          return new v("Invalid " + ee + " `" + re + "` of type " + ("`" + ae + "` supplied to `" + X + "`, expected an object."));
        for (var U in oe)
          if (n(oe, U)) {
            var K = N(oe, U, X, ee, re + "." + U, r);
            if (K instanceof Error)
              return K;
          }
        return null;
      }
      return p(B);
    }
    function $(N) {
      if (!Array.isArray(N))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), o;
      for (var B = 0; B < N.length; B++) {
        var W = N[B];
        if (typeof W != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + z(W) + " at index " + B + "."
          ), o;
      }
      function Y(X, ee, re, oe, ae) {
        for (var U = [], K = 0; K < N.length; K++) {
          var Q = N[K], M = Q(X, ee, re, oe, ae, r);
          if (M == null)
            return null;
          M.data && n(M.data, "expectedType") && U.push(M.data.expectedType);
        }
        var fe = U.length > 0 ? ", expected one of type [" + U.join(", ") + "]" : "";
        return new v("Invalid " + oe + " `" + ae + "` supplied to " + ("`" + re + "`" + fe + "."));
      }
      return p(Y);
    }
    function E() {
      function N(B, W, Y, X, ee) {
        return I(B[W]) ? null : new v("Invalid " + X + " `" + ee + "` supplied to " + ("`" + Y + "`, expected a ReactNode."));
      }
      return p(N);
    }
    function j(N, B, W, Y, X) {
      return new v(
        (N || "React class") + ": " + B + " type `" + W + "." + Y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + X + "`."
      );
    }
    function C(N) {
      function B(W, Y, X, ee, re) {
        var oe = W[Y], ae = F(oe);
        if (ae !== "object")
          return new v("Invalid " + ee + " `" + re + "` of type `" + ae + "` " + ("supplied to `" + X + "`, expected `object`."));
        for (var U in N) {
          var K = N[U];
          if (typeof K != "function")
            return j(X, ee, re, U, k(K));
          var Q = K(oe, U, X, ee, re + "." + U, r);
          if (Q)
            return Q;
        }
        return null;
      }
      return p(B);
    }
    function D(N) {
      function B(W, Y, X, ee, re) {
        var oe = W[Y], ae = F(oe);
        if (ae !== "object")
          return new v("Invalid " + ee + " `" + re + "` of type `" + ae + "` " + ("supplied to `" + X + "`, expected `object`."));
        var U = t({}, W[Y], N);
        for (var K in U) {
          var Q = N[K];
          if (n(N, K) && typeof Q != "function")
            return j(X, ee, re, K, k(Q));
          if (!Q)
            return new v(
              "Invalid " + ee + " `" + re + "` key `" + K + "` supplied to `" + X + "`.\nBad object: " + JSON.stringify(W[Y], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(N), null, "  ")
            );
          var M = Q(oe, K, X, ee, re + "." + K, r);
          if (M)
            return M;
        }
        return null;
      }
      return p(B);
    }
    function I(N) {
      switch (typeof N) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !N;
        case "object":
          if (Array.isArray(N))
            return N.every(I);
          if (N === null || c(N))
            return !0;
          var B = u(N);
          if (B) {
            var W = B.call(N), Y;
            if (B !== N.entries) {
              for (; !(Y = W.next()).done; )
                if (!I(Y.value))
                  return !1;
            } else
              for (; !(Y = W.next()).done; ) {
                var X = Y.value;
                if (X && !I(X[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function R(N, B) {
      return N === "symbol" ? !0 : B ? B["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && B instanceof Symbol : !1;
    }
    function F(N) {
      var B = typeof N;
      return Array.isArray(N) ? "array" : N instanceof RegExp ? "object" : R(B, N) ? "symbol" : B;
    }
    function k(N) {
      if (typeof N > "u" || N === null)
        return "" + N;
      var B = F(N);
      if (B === "object") {
        if (N instanceof Date)
          return "date";
        if (N instanceof RegExp)
          return "regexp";
      }
      return B;
    }
    function z(N) {
      var B = k(N);
      switch (B) {
        case "array":
        case "object":
          return "an " + B;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + B;
        default:
          return B;
      }
    }
    function V(N) {
      return !N.constructor || !N.constructor.name ? d : N.constructor.name;
    }
    return h.checkPropTypes = a, h.resetWarningCache = a.resetWarningCache, h.PropTypes = h, h;
  }, $s;
}
var Cs, zp;
function xB() {
  if (zp) return Cs;
  zp = 1;
  var e = Sf();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, Cs = function() {
    function n(o, c, s, l, f, u) {
      if (u !== e) {
        var d = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw d.name = "Invariant Violation", d;
      }
    }
    n.isRequired = n;
    function a() {
      return n;
    }
    var i = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: a,
      element: n,
      elementType: n,
      instanceOf: a,
      node: n,
      objectOf: a,
      oneOf: a,
      oneOfType: a,
      shape: a,
      exact: a,
      checkPropTypes: r,
      resetWarningCache: t
    };
    return i.PropTypes = i, i;
  }, Cs;
}
if (process.env.NODE_ENV !== "production") {
  var OB = hb(), SB = !0;
  Il.exports = wB()(OB.isElement, SB);
} else
  Il.exports = xB()();
var PB = Il.exports;
const xe = /* @__PURE__ */ Pe(PB), { getOwnPropertyNames: _B, getOwnPropertySymbols: AB } = Object, { hasOwnProperty: EB } = Object.prototype;
function ba(e, t) {
  return function(n, a, i) {
    return e(n, a, i) && t(n, a, i);
  };
}
function wa(e) {
  return function(r, n, a) {
    if (!r || !n || typeof r != "object" || typeof n != "object")
      return e(r, n, a);
    const { cache: i } = a, o = i.get(r), c = i.get(n);
    if (o && c)
      return o === n && c === r;
    i.set(r, n), i.set(n, r);
    const s = e(r, n, a);
    return i.delete(r), i.delete(n), s;
  };
}
function TB(e) {
  return e != null ? e[Symbol.toStringTag] : void 0;
}
function Wp(e) {
  return _B(e).concat(AB(e));
}
const $B = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn || ((e, t) => EB.call(e, t))
);
function tn(e, t) {
  return e === t || !e && !t && e !== e && t !== t;
}
const CB = "__v", MB = "__o", jB = "_owner", NB = typeof Float16Array < "u", { getOwnPropertyDescriptor: Up, keys: Vp } = Object;
function kB(e, t) {
  return e.byteLength === t.byteLength && No(new Uint8Array(e), new Uint8Array(t));
}
function IB(e, t, r) {
  let n = e.length;
  if (t.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!r.equals(e[n], t[n], n, n, e, t, r))
      return !1;
  return !0;
}
function DB(e, t) {
  return e.byteLength === t.byteLength && No(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength));
}
function RB(e, t) {
  return tn(e.getTime(), t.getTime());
}
function qp(e, t, r) {
  return e.name === t.name && e.message === t.message && e.stack === t.stack && r.equals(e.cause, t.cause, "cause", "cause", e, t, r);
}
function LB(e, t) {
  return e === t;
}
function Hp(e, t, r) {
  const n = e.size;
  if (n !== t.size)
    return !1;
  if (!n)
    return !0;
  const a = new Array(n), i = e.entries();
  let o, c, s = 0;
  for (; (o = i.next()) && !o.done; ) {
    const l = t.entries();
    let f = !1, u = 0;
    for (; (c = l.next()) && !c.done; ) {
      if (a[u]) {
        u++;
        continue;
      }
      const d = o.value, h = c.value;
      if (r.equals(d[0], h[0], s, u, e, t, r) && r.equals(d[1], h[1], d[0], h[0], e, t, r)) {
        f = a[u] = !0;
        break;
      }
      u++;
    }
    if (!f)
      return !1;
    s++;
  }
  return !0;
}
const FB = tn;
function Gp(e, t, r) {
  const n = Vp(e);
  let a = n.length;
  if (Vp(t).length !== a)
    return !1;
  for (; a-- > 0; )
    if (!vb(e, t, r, n[a]))
      return !1;
  return !0;
}
function cn(e, t, r) {
  const n = Wp(e);
  let a = n.length;
  if (Wp(t).length !== a)
    return !1;
  let i, o, c;
  for (; a-- > 0; )
    if (i = n[a], !vb(e, t, r, i) || (o = Up(e, i), c = Up(t, i), (o || c) && (!o || !c || o.configurable !== c.configurable || o.enumerable !== c.enumerable || o.writable !== c.writable)))
      return !1;
  return !0;
}
function BB(e, t) {
  return tn(e.valueOf(), t.valueOf());
}
function zB(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function Yp(e, t, r) {
  const n = e.size;
  if (n !== t.size)
    return !1;
  if (!n)
    return !0;
  const a = new Array(n), i = e.values();
  let o, c;
  for (; (o = i.next()) && !o.done; ) {
    const s = t.values();
    let l = !1, f = 0;
    for (; (c = s.next()) && !c.done; ) {
      if (!a[f] && r.equals(o.value, c.value, o.value, c.value, e, t, r)) {
        l = a[f] = !0;
        break;
      }
      f++;
    }
    if (!l)
      return !1;
  }
  return !0;
}
function No(e, t) {
  let r = e.length;
  if (t.length !== r || e.byteOffset !== t.byteOffset)
    return !1;
  if (e instanceof Float64Array || e instanceof Float32Array || NB && e instanceof Float16Array) {
    for (; r-- > 0; )
      if (e[r] !== t[r] && (e[r] === e[r] || t[r] === t[r]))
        return !1;
    return !0;
  }
  for (; r-- > 0; )
    if (e[r] !== t[r])
      return !1;
  return !0;
}
function WB(e, t) {
  return e.href === t.href ? !0 : e.protocol === t.protocol && e.username === t.username && e.password === t.password && e.host === t.host && e.pathname === t.pathname && e.hash === t.hash && UB(e.searchParams, t.searchParams);
}
function UB(e, t) {
  const r = e.toString(), n = t.toString();
  return r === n || Kp(r) === Kp(n);
}
function Kp(e) {
  return e.split("&").sort().join("&");
}
function vb(e, t, r, n) {
  return (n === jB || n === MB || n === CB) && (e.$$typeof || t.$$typeof) ? !0 : $B(t, n) && r.equals(e[n], t[n], n, n, e, t, r);
}
const VB = "[object ArrayBuffer]", qB = "[object Arguments]", HB = "[object Boolean]", GB = "[object DataView]", YB = "[object Date]", KB = "[object Error]", XB = "[object Map]", ZB = "[object Number]", JB = "[object Object]", QB = "[object RegExp]", e3 = "[object Set]", t3 = "[object String]", r3 = {
  "[object Int8Array]": !0,
  "[object Uint8Array]": !0,
  "[object Uint8ClampedArray]": !0,
  "[object Int16Array]": !0,
  "[object Uint16Array]": !0,
  "[object Int32Array]": !0,
  "[object Uint32Array]": !0,
  "[object Float16Array]": !0,
  "[object Float32Array]": !0,
  "[object Float64Array]": !0,
  "[object BigInt64Array]": !0,
  "[object BigUint64Array]": !0
}, n3 = "[object URL]", a3 = Object.prototype.toString;
function i3({ areArrayBuffersEqual: e, areArraysEqual: t, areDataViewsEqual: r, areDatesEqual: n, areErrorsEqual: a, areFunctionsEqual: i, areMapsEqual: o, areNumbersEqual: c, areObjectsEqual: s, arePrimitiveWrappersEqual: l, areRegExpsEqual: f, areSetsEqual: u, areTypedArraysEqual: d, areUrlsEqual: h, unknownTagComparators: m }) {
  return function(p, b, g) {
    if (p === b)
      return !0;
    if (p == null || b == null)
      return !1;
    const O = typeof p;
    if (O !== typeof b)
      return !1;
    if (O !== "object")
      return O === "number" ? c(p, b, g) : O === "function" ? i(p, b, g) : !1;
    const S = p.constructor;
    if (S !== b.constructor)
      return !1;
    if (S === Object)
      return s(p, b, g);
    if (Array.isArray(p))
      return t(p, b, g);
    if (S === Date)
      return n(p, b, g);
    if (S === RegExp)
      return f(p, b, g);
    if (S === Map)
      return o(p, b, g);
    if (S === Set)
      return u(p, b, g);
    if (S == null)
      return s(p, b, g);
    const y = a3.call(p);
    if (y === YB)
      return n(p, b, g);
    if (y === QB)
      return f(p, b, g);
    if (y === XB)
      return o(p, b, g);
    if (y === e3)
      return u(p, b, g);
    if (y === JB)
      return typeof p.then != "function" && typeof b.then != "function" && s(p, b, g);
    if (y === n3)
      return h(p, b, g);
    if (y === KB)
      return a(p, b, g);
    if (y === qB)
      return s(p, b, g);
    if (r3[y])
      return d(p, b, g);
    if (y === VB)
      return e(p, b, g);
    if (y === GB)
      return r(p, b, g);
    if (y === HB || y === ZB || y === t3)
      return l(p, b, g);
    if (m) {
      let w = m[y];
      if (!w) {
        const P = TB(p);
        P && (w = m[P]);
      }
      if (w)
        return w(p, b, g);
    }
    return !1;
  };
}
function o3({ circular: e, createCustomConfig: t, strict: r }) {
  let n = {
    areArrayBuffersEqual: kB,
    areArraysEqual: r ? cn : IB,
    areDataViewsEqual: DB,
    areDatesEqual: RB,
    // `Error` subclasses routinely carry their own enumerable properties (`status`, `code`, ...),
    // which the error comparator alone does not see, so it is composed with the object comparator.
    // `name` / `message` / `stack` are own but not enumerable, which is why errors need a
    // comparator of their own rather than being treated as plain objects in the first place.
    areErrorsEqual: r ? ba(qp, cn) : ba(qp, Gp),
    areFunctionsEqual: LB,
    areMapsEqual: r ? ba(Hp, cn) : Hp,
    areNumbersEqual: FB,
    areObjectsEqual: r ? cn : Gp,
    arePrimitiveWrappersEqual: BB,
    areRegExpsEqual: zB,
    areSetsEqual: r ? ba(Yp, cn) : Yp,
    areTypedArraysEqual: r ? ba(No, cn) : No,
    areUrlsEqual: WB,
    unknownTagComparators: void 0
  };
  if (t && (n = Object.assign({}, n, t(n))), e) {
    const a = wa(n.areArraysEqual), i = wa(n.areErrorsEqual), o = wa(n.areMapsEqual), c = wa(n.areObjectsEqual), s = wa(n.areSetsEqual);
    n = Object.assign({}, n, {
      areArraysEqual: a,
      areErrorsEqual: i,
      areMapsEqual: o,
      areObjectsEqual: c,
      areSetsEqual: s
    });
  }
  return n;
}
function c3(e) {
  return function(t, r, n, a, i, o, c) {
    return e(t, r, c);
  };
}
function s3({ circular: e, comparator: t, createState: r, equals: n, strict: a }) {
  if (r)
    return function(c, s) {
      const { cache: l = e ? /* @__PURE__ */ new WeakMap() : void 0, meta: f } = r();
      return t(c, s, {
        cache: l,
        equals: n,
        meta: f,
        strict: a
      });
    };
  if (e)
    return function(c, s) {
      return t(c, s, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: n,
        meta: void 0,
        strict: a
      });
    };
  const i = {
    cache: void 0,
    equals: n,
    meta: void 0,
    strict: a
  };
  return function(c, s) {
    return t(c, s, i);
  };
}
const l3 = _r();
_r({ strict: !0 });
_r({ circular: !0 });
_r({
  circular: !0,
  strict: !0
});
_r({
  createInternalComparator: () => tn
});
_r({
  strict: !0,
  createInternalComparator: () => tn
});
_r({
  circular: !0,
  createInternalComparator: () => tn
});
_r({
  circular: !0,
  createInternalComparator: () => tn,
  strict: !0
});
function _r(e = {}) {
  const { circular: t = !1, createInternalComparator: r, createState: n, strict: a = !1 } = e, i = o3(e), o = i3(i), c = r ? r(o) : c3(o);
  return s3({ circular: t, comparator: o, createState: n, equals: c, strict: a });
}
function u3(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e);
}
function Xp(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = -1, n = function a(i) {
    r < 0 && (r = i), i - r > t ? (e(i), r = -1) : u3(a);
  };
  requestAnimationFrame(n);
}
function Dl(e) {
  "@babel/helpers - typeof";
  return Dl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Dl(e);
}
function f3(e) {
  return v3(e) || p3(e) || h3(e) || d3();
}
function d3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function h3(e, t) {
  if (e) {
    if (typeof e == "string") return Zp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Zp(e, t);
  }
}
function Zp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function p3(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function v3(e) {
  if (Array.isArray(e)) return e;
}
function m3() {
  var e = {}, t = function() {
    return null;
  }, r = !1, n = function a(i) {
    if (!r) {
      if (Array.isArray(i)) {
        if (!i.length)
          return;
        var o = i, c = f3(o), s = c[0], l = c.slice(1);
        if (typeof s == "number") {
          Xp(a.bind(null, l), s);
          return;
        }
        a(s), Xp(a.bind(null, l));
        return;
      }
      Dl(i) === "object" && (e = i, t(e)), typeof i == "function" && i();
    }
  };
  return {
    stop: function() {
      r = !0;
    },
    start: function(i) {
      r = !1, n(i);
    },
    subscribe: function(i) {
      return t = i, function() {
        t = function() {
          return null;
        };
      };
    }
  };
}
function ri(e) {
  "@babel/helpers - typeof";
  return ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ri(e);
}
function Jp(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Qp(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Jp(Object(r), !0).forEach(function(n) {
      mb(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Jp(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function mb(e, t, r) {
  return t = y3(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function y3(e) {
  var t = g3(e, "string");
  return ri(t) === "symbol" ? t : String(t);
}
function g3(e, t) {
  if (ri(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ri(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var b3 = function(t, r) {
  return [Object.keys(t), Object.keys(r)].reduce(function(n, a) {
    return n.filter(function(i) {
      return a.includes(i);
    });
  });
}, w3 = function(t) {
  return t;
}, x3 = function(t) {
  return t.replace(/([A-Z])/g, function(r) {
    return "-".concat(r.toLowerCase());
  });
}, Ea = function(t, r) {
  return Object.keys(r).reduce(function(n, a) {
    return Qp(Qp({}, n), {}, mb({}, a, t(a, r[a])));
  }, {});
}, ev = function(t, r, n) {
  return t.map(function(a) {
    return "".concat(x3(a), " ").concat(r, "ms ").concat(n);
  }).join(",");
}, O3 = process.env.NODE_ENV !== "production", ko = function(t, r, n, a, i, o, c, s) {
  if (O3 && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var l = [n, a, i, o, c, s], f = 0;
      console.warn(r.replace(/%s/g, function() {
        return l[f++];
      }));
    }
};
function S3(e, t) {
  return A3(e) || _3(e, t) || yb(e, t) || P3();
}
function P3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _3(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, c = [], s = !0, l = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (c.push(n.value), c.length !== t); s = !0) ;
    } catch (f) {
      l = !0, a = f;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw a;
      }
    }
    return c;
  }
}
function A3(e) {
  if (Array.isArray(e)) return e;
}
function E3(e) {
  return C3(e) || $3(e) || yb(e) || T3();
}
function T3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function yb(e, t) {
  if (e) {
    if (typeof e == "string") return Rl(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Rl(e, t);
  }
}
function $3(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function C3(e) {
  if (Array.isArray(e)) return Rl(e);
}
function Rl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var Io = 1e-4, gb = function(t, r) {
  return [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1];
}, bb = function(t, r) {
  return t.map(function(n, a) {
    return n * Math.pow(r, a);
  }).reduce(function(n, a) {
    return n + a;
  });
}, tv = function(t, r) {
  return function(n) {
    var a = gb(t, r);
    return bb(a, n);
  };
}, M3 = function(t, r) {
  return function(n) {
    var a = gb(t, r), i = [].concat(E3(a.map(function(o, c) {
      return o * c;
    }).slice(1)), [0]);
    return bb(i, n);
  };
}, rv = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var a = r[0], i = r[1], o = r[2], c = r[3];
  if (r.length === 1)
    switch (r[0]) {
      case "linear":
        a = 0, i = 0, o = 1, c = 1;
        break;
      case "ease":
        a = 0.25, i = 0.1, o = 0.25, c = 1;
        break;
      case "ease-in":
        a = 0.42, i = 0, o = 1, c = 1;
        break;
      case "ease-out":
        a = 0.42, i = 0, o = 0.58, c = 1;
        break;
      case "ease-in-out":
        a = 0, i = 0, o = 0.58, c = 1;
        break;
      default: {
        var s = r[0].split("(");
        if (s[0] === "cubic-bezier" && s[1].split(")")[0].split(",").length === 4) {
          var l = s[1].split(")")[0].split(",").map(function(p) {
            return parseFloat(p);
          }), f = S3(l, 4);
          a = f[0], i = f[1], o = f[2], c = f[3];
        } else
          ko(!1, "[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s", r);
      }
    }
  ko([a, o, i, c].every(function(p) {
    return typeof p == "number" && p >= 0 && p <= 1;
  }), "[configBezier]: arguments should be x1, y1, x2, y2 of [0, 1] instead received %s", r);
  var u = tv(a, o), d = tv(i, c), h = M3(a, o), m = function(b) {
    return b > 1 ? 1 : b < 0 ? 0 : b;
  }, v = function(b) {
    for (var g = b > 1 ? 1 : b, O = g, S = 0; S < 8; ++S) {
      var y = u(O) - g, w = h(O);
      if (Math.abs(y - g) < Io || w < Io)
        return d(O);
      O = m(O - y / w);
    }
    return d(O);
  };
  return v.isStepper = !1, v;
}, j3 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = t.stiff, n = r === void 0 ? 100 : r, a = t.damping, i = a === void 0 ? 8 : a, o = t.dt, c = o === void 0 ? 17 : o, s = function(f, u, d) {
    var h = -(f - u) * n, m = d * i, v = d + (h - m) * c / 1e3, p = d * c / 1e3 + f;
    return Math.abs(p - u) < Io && Math.abs(v) < Io ? [u, 0] : [p, v];
  };
  return s.isStepper = !0, s.dt = c, s;
}, N3 = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var a = r[0];
  if (typeof a == "string")
    switch (a) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return rv(a);
      case "spring":
        return j3();
      default:
        if (a.split("(")[0] === "cubic-bezier")
          return rv(a);
        ko(!1, "[configEasing]: first argument should be one of 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', 'linear' and 'spring', instead  received %s", r);
    }
  return typeof a == "function" ? a : (ko(!1, "[configEasing]: first argument type should be function or string, instead received %s", r), null);
};
function ni(e) {
  "@babel/helpers - typeof";
  return ni = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ni(e);
}
function nv(e) {
  return D3(e) || I3(e) || wb(e) || k3();
}
function k3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function I3(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function D3(e) {
  if (Array.isArray(e)) return Fl(e);
}
function av(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ke(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? av(Object(r), !0).forEach(function(n) {
      Ll(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : av(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ll(e, t, r) {
  return t = R3(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function R3(e) {
  var t = L3(e, "string");
  return ni(t) === "symbol" ? t : String(t);
}
function L3(e, t) {
  if (ni(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ni(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function F3(e, t) {
  return W3(e) || z3(e, t) || wb(e, t) || B3();
}
function B3() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function wb(e, t) {
  if (e) {
    if (typeof e == "string") return Fl(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Fl(e, t);
  }
}
function Fl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function z3(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, c = [], s = !0, l = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (c.push(n.value), c.length !== t); s = !0) ;
    } catch (f) {
      l = !0, a = f;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw a;
      }
    }
    return c;
  }
}
function W3(e) {
  if (Array.isArray(e)) return e;
}
var Do = function(t, r, n) {
  return t + (r - t) * n;
}, Bl = function(t) {
  var r = t.from, n = t.to;
  return r !== n;
}, U3 = function e(t, r, n) {
  var a = Ea(function(i, o) {
    if (Bl(o)) {
      var c = t(o.from, o.to, o.velocity), s = F3(c, 2), l = s[0], f = s[1];
      return Ke(Ke({}, o), {}, {
        from: l,
        velocity: f
      });
    }
    return o;
  }, r);
  return n < 1 ? Ea(function(i, o) {
    return Bl(o) ? Ke(Ke({}, o), {}, {
      velocity: Do(o.velocity, a[i].velocity, n),
      from: Do(o.from, a[i].from, n)
    }) : o;
  }, r) : e(t, a, n - 1);
};
const V3 = function(e, t, r, n, a) {
  var i = b3(e, t), o = i.reduce(function(p, b) {
    return Ke(Ke({}, p), {}, Ll({}, b, [e[b], t[b]]));
  }, {}), c = i.reduce(function(p, b) {
    return Ke(Ke({}, p), {}, Ll({}, b, {
      from: e[b],
      velocity: 0,
      to: t[b]
    }));
  }, {}), s = -1, l, f, u = function() {
    return null;
  }, d = function() {
    return Ea(function(b, g) {
      return g.from;
    }, c);
  }, h = function() {
    return !Object.values(c).filter(Bl).length;
  }, m = function(b) {
    l || (l = b);
    var g = b - l, O = g / r.dt;
    c = U3(r, c, O), a(Ke(Ke(Ke({}, e), t), d())), l = b, h() || (s = requestAnimationFrame(u));
  }, v = function(b) {
    f || (f = b);
    var g = (b - f) / n, O = Ea(function(y, w) {
      return Do.apply(void 0, nv(w).concat([r(g)]));
    }, o);
    if (a(Ke(Ke(Ke({}, e), t), O)), g < 1)
      s = requestAnimationFrame(u);
    else {
      var S = Ea(function(y, w) {
        return Do.apply(void 0, nv(w).concat([r(1)]));
      }, o);
      a(Ke(Ke(Ke({}, e), t), S));
    }
  };
  return u = r.isStepper ? m : v, function() {
    return requestAnimationFrame(u), function() {
      cancelAnimationFrame(s);
    };
  };
};
function jn(e) {
  "@babel/helpers - typeof";
  return jn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, jn(e);
}
var q3 = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];
function H3(e, t) {
  if (e == null) return {};
  var r = G3(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function G3(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function Ms(e) {
  return Z3(e) || X3(e) || K3(e) || Y3();
}
function Y3() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function K3(e, t) {
  if (e) {
    if (typeof e == "string") return zl(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return zl(e, t);
  }
}
function X3(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Z3(e) {
  if (Array.isArray(e)) return zl(e);
}
function zl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function iv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? iv(Object(r), !0).forEach(function(n) {
      Sa(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : iv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Sa(e, t, r) {
  return t = xb(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function J3(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Q3(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, xb(n.key), n);
  }
}
function e6(e, t, r) {
  return t && Q3(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function xb(e) {
  var t = t6(e, "string");
  return jn(t) === "symbol" ? t : String(t);
}
function t6(e, t) {
  if (jn(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (jn(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function r6(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Wl(e, t);
}
function Wl(e, t) {
  return Wl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Wl(e, t);
}
function n6(e) {
  var t = a6();
  return function() {
    var n = Ro(e), a;
    if (t) {
      var i = Ro(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return Ul(this, a);
  };
}
function Ul(e, t) {
  if (t && (jn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Vl(e);
}
function Vl(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function a6() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Ro(e) {
  return Ro = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ro(e);
}
var Lt = /* @__PURE__ */ function(e) {
  r6(r, e);
  var t = n6(r);
  function r(n, a) {
    var i;
    J3(this, r), i = t.call(this, n, a);
    var o = i.props, c = o.isActive, s = o.attributeName, l = o.from, f = o.to, u = o.steps, d = o.children, h = o.duration;
    if (i.handleStyleChange = i.handleStyleChange.bind(Vl(i)), i.changeStyle = i.changeStyle.bind(Vl(i)), !c || h <= 0)
      return i.state = {
        style: {}
      }, typeof d == "function" && (i.state = {
        style: f
      }), Ul(i);
    if (u && u.length)
      i.state = {
        style: u[0].style
      };
    else if (l) {
      if (typeof d == "function")
        return i.state = {
          style: l
        }, Ul(i);
      i.state = {
        style: s ? Sa({}, s, l) : l
      };
    } else
      i.state = {
        style: {}
      };
    return i;
  }
  return e6(r, [{
    key: "componentDidMount",
    value: function() {
      var a = this.props, i = a.isActive, o = a.canBegin;
      this.mounted = !0, !(!i || !o) && this.runAnimation(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function(a) {
      var i = this.props, o = i.isActive, c = i.canBegin, s = i.attributeName, l = i.shouldReAnimate, f = i.to, u = i.from, d = this.state.style;
      if (c) {
        if (!o) {
          var h = {
            style: s ? Sa({}, s, f) : f
          };
          this.state && d && (s && d[s] !== f || !s && d !== f) && this.setState(h);
          return;
        }
        if (!(l3(a.to, f) && a.canBegin && a.isActive)) {
          var m = !a.canBegin || !a.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var v = m || l ? u : a.to;
          if (this.state && d) {
            var p = {
              style: s ? Sa({}, s, v) : v
            };
            (s && d[s] !== v || !s && d !== v) && this.setState(p);
          }
          this.runAnimation(xt(xt({}, this.props), {}, {
            from: v,
            begin: 0
          }));
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.mounted = !1;
      var a = this.props.onAnimationEnd;
      this.unSubscribe && this.unSubscribe(), this.manager && (this.manager.stop(), this.manager = null), this.stopJSAnimation && this.stopJSAnimation(), a && a();
    }
  }, {
    key: "handleStyleChange",
    value: function(a) {
      this.changeStyle(a);
    }
  }, {
    key: "changeStyle",
    value: function(a) {
      this.mounted && this.setState({
        style: a
      });
    }
  }, {
    key: "runJSAnimation",
    value: function(a) {
      var i = this, o = a.from, c = a.to, s = a.duration, l = a.easing, f = a.begin, u = a.onAnimationEnd, d = a.onAnimationStart, h = V3(o, c, N3(l), s, this.changeStyle), m = function() {
        i.stopJSAnimation = h();
      };
      this.manager.start([d, f, m, s, u]);
    }
  }, {
    key: "runStepAnimation",
    value: function(a) {
      var i = this, o = a.steps, c = a.begin, s = a.onAnimationStart, l = o[0], f = l.style, u = l.duration, d = u === void 0 ? 0 : u, h = function(v, p, b) {
        if (b === 0)
          return v;
        var g = p.duration, O = p.easing, S = O === void 0 ? "ease" : O, y = p.style, w = p.properties, P = p.onAnimationEnd, _ = b > 0 ? o[b - 1] : p, $ = w || Object.keys(y);
        if (typeof S == "function" || S === "spring")
          return [].concat(Ms(v), [i.runJSAnimation.bind(i, {
            from: _.style,
            to: y,
            duration: g,
            easing: S
          }), g]);
        var E = ev($, g, S), j = xt(xt(xt({}, _.style), y), {}, {
          transition: E
        });
        return [].concat(Ms(v), [j, g, P]).filter(w3);
      };
      return this.manager.start([s].concat(Ms(o.reduce(h, [f, Math.max(d, c)])), [a.onAnimationEnd]));
    }
  }, {
    key: "runAnimation",
    value: function(a) {
      this.manager || (this.manager = m3());
      var i = a.begin, o = a.duration, c = a.attributeName, s = a.to, l = a.easing, f = a.onAnimationStart, u = a.onAnimationEnd, d = a.steps, h = a.children, m = this.manager;
      if (this.unSubscribe = m.subscribe(this.handleStyleChange), typeof l == "function" || typeof h == "function" || l === "spring") {
        this.runJSAnimation(a);
        return;
      }
      if (d.length > 1) {
        this.runStepAnimation(a);
        return;
      }
      var v = c ? Sa({}, c, s) : s, p = ev(Object.keys(v), o, l);
      m.start([f, i, xt(xt({}, v), {}, {
        transition: p
      }), o, u]);
    }
  }, {
    key: "render",
    value: function() {
      var a = this.props, i = a.children;
      a.begin;
      var o = a.duration;
      a.attributeName, a.easing;
      var c = a.isActive;
      a.steps, a.from, a.to, a.canBegin, a.onAnimationEnd, a.shouldReAnimate, a.onAnimationReStart;
      var s = H3(a, q3), l = zr.count(i), f = this.state.style;
      if (typeof i == "function")
        return i(f);
      if (!c || l === 0 || o <= 0)
        return i;
      var u = function(h) {
        var m = h.props, v = m.style, p = v === void 0 ? {} : v, b = m.className, g = /* @__PURE__ */ ze(h, xt(xt({}, s), {}, {
          style: xt(xt({}, p), f),
          className: b
        }));
        return g;
      };
      return l === 1 ? u(zr.only(i)) : /* @__PURE__ */ T.createElement("div", null, zr.map(i, function(d) {
        return u(d);
      }));
    }
  }]), r;
}(Et);
Lt.displayName = "Animate";
Lt.defaultProps = {
  begin: 0,
  duration: 1e3,
  from: "",
  to: "",
  attributeName: "",
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  steps: [],
  onAnimationEnd: function() {
  },
  onAnimationStart: function() {
  }
};
Lt.propTypes = {
  from: xe.oneOfType([xe.object, xe.string]),
  to: xe.oneOfType([xe.object, xe.string]),
  attributeName: xe.string,
  // animation duration
  duration: xe.number,
  begin: xe.number,
  easing: xe.oneOfType([xe.string, xe.func]),
  steps: xe.arrayOf(xe.shape({
    duration: xe.number.isRequired,
    style: xe.object.isRequired,
    easing: xe.oneOfType([xe.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), xe.func]),
    // transition css properties(dash case), optional
    properties: xe.arrayOf("string"),
    onAnimationEnd: xe.func
  })),
  children: xe.oneOfType([xe.node, xe.func]),
  isActive: xe.bool,
  canBegin: xe.bool,
  onAnimationEnd: xe.func,
  // decide if it should reanimate with initial from style when props change
  shouldReAnimate: xe.bool,
  onAnimationStart: xe.func,
  onAnimationReStart: xe.func
};
function ai(e) {
  "@babel/helpers - typeof";
  return ai = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ai(e);
}
function Lo() {
  return Lo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Lo.apply(this, arguments);
}
function i6(e, t) {
  return l6(e) || s6(e, t) || c6(e, t) || o6();
}
function o6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function c6(e, t) {
  if (e) {
    if (typeof e == "string") return ov(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ov(e, t);
  }
}
function ov(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function s6(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, c = [], s = !0, l = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (c.push(n.value), c.length !== t); s = !0) ;
    } catch (f) {
      l = !0, a = f;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw a;
      }
    }
    return c;
  }
}
function l6(e) {
  if (Array.isArray(e)) return e;
}
function cv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function sv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cv(Object(r), !0).forEach(function(n) {
      u6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function u6(e, t, r) {
  return t = f6(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function f6(e) {
  var t = d6(e, "string");
  return ai(t) == "symbol" ? t : t + "";
}
function d6(e, t) {
  if (ai(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ai(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var lv = function(t, r, n, a, i) {
  var o = Math.min(Math.abs(n) / 2, Math.abs(a) / 2), c = a >= 0 ? 1 : -1, s = n >= 0 ? 1 : -1, l = a >= 0 && n >= 0 || a < 0 && n < 0 ? 1 : 0, f;
  if (o > 0 && i instanceof Array) {
    for (var u = [0, 0, 0, 0], d = 0, h = 4; d < h; d++)
      u[d] = i[d] > o ? o : i[d];
    f = "M".concat(t, ",").concat(r + c * u[0]), u[0] > 0 && (f += "A ".concat(u[0], ",").concat(u[0], ",0,0,").concat(l, ",").concat(t + s * u[0], ",").concat(r)), f += "L ".concat(t + n - s * u[1], ",").concat(r), u[1] > 0 && (f += "A ".concat(u[1], ",").concat(u[1], ",0,0,").concat(l, `,
        `).concat(t + n, ",").concat(r + c * u[1])), f += "L ".concat(t + n, ",").concat(r + a - c * u[2]), u[2] > 0 && (f += "A ".concat(u[2], ",").concat(u[2], ",0,0,").concat(l, `,
        `).concat(t + n - s * u[2], ",").concat(r + a)), f += "L ".concat(t + s * u[3], ",").concat(r + a), u[3] > 0 && (f += "A ".concat(u[3], ",").concat(u[3], ",0,0,").concat(l, `,
        `).concat(t, ",").concat(r + a - c * u[3])), f += "Z";
  } else if (o > 0 && i === +i && i > 0) {
    var m = Math.min(o, i);
    f = "M ".concat(t, ",").concat(r + c * m, `
            A `).concat(m, ",").concat(m, ",0,0,").concat(l, ",").concat(t + s * m, ",").concat(r, `
            L `).concat(t + n - s * m, ",").concat(r, `
            A `).concat(m, ",").concat(m, ",0,0,").concat(l, ",").concat(t + n, ",").concat(r + c * m, `
            L `).concat(t + n, ",").concat(r + a - c * m, `
            A `).concat(m, ",").concat(m, ",0,0,").concat(l, ",").concat(t + n - s * m, ",").concat(r + a, `
            L `).concat(t + s * m, ",").concat(r + a, `
            A `).concat(m, ",").concat(m, ",0,0,").concat(l, ",").concat(t, ",").concat(r + a - c * m, " Z");
  } else
    f = "M ".concat(t, ",").concat(r, " h ").concat(n, " v ").concat(a, " h ").concat(-n, " Z");
  return f;
}, h6 = function(t, r) {
  if (!t || !r)
    return !1;
  var n = t.x, a = t.y, i = r.x, o = r.y, c = r.width, s = r.height;
  if (Math.abs(c) > 0 && Math.abs(s) > 0) {
    var l = Math.min(i, i + c), f = Math.max(i, i + c), u = Math.min(o, o + s), d = Math.max(o, o + s);
    return n >= l && n <= f && a >= u && a <= d;
  }
  return !1;
}, p6 = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  // The radius of border
  // The radius of four corners when radius is a number
  // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
  radius: 0,
  isAnimationActive: !1,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, Pf = function(t) {
  var r = sv(sv({}, p6), t), n = Yi(), a = J(-1), i = i6(a, 2), o = i[0], c = i[1];
  vi(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var S = n.current.getTotalLength();
        S && c(S);
      } catch {
      }
  }, []);
  var s = r.x, l = r.y, f = r.width, u = r.height, d = r.radius, h = r.className, m = r.animationEasing, v = r.animationDuration, p = r.animationBegin, b = r.isAnimationActive, g = r.isUpdateAnimationActive;
  if (s !== +s || l !== +l || f !== +f || u !== +u || f === 0 || u === 0)
    return null;
  var O = le("recharts-rectangle", h);
  return g ? /* @__PURE__ */ T.createElement(Lt, {
    canBegin: o > 0,
    from: {
      width: f,
      height: u,
      x: s,
      y: l
    },
    to: {
      width: f,
      height: u,
      x: s,
      y: l
    },
    duration: v,
    animationEasing: m,
    isActive: g
  }, function(S) {
    var y = S.width, w = S.height, P = S.x, _ = S.y;
    return /* @__PURE__ */ T.createElement(Lt, {
      canBegin: o > 0,
      from: "0px ".concat(o === -1 ? 1 : o, "px"),
      to: "".concat(o, "px 0px"),
      attributeName: "strokeDasharray",
      begin: p,
      duration: v,
      isActive: b,
      easing: m
    }, /* @__PURE__ */ T.createElement("path", Lo({}, te(r, !0), {
      className: O,
      d: lv(P, _, y, w, d),
      ref: n
    })));
  }) : /* @__PURE__ */ T.createElement("path", Lo({}, te(r, !0), {
    className: O,
    d: lv(s, l, f, u, d)
  }));
}, v6 = ["points", "className", "baseLinePoints", "connectNulls"];
function fn() {
  return fn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, fn.apply(this, arguments);
}
function m6(e, t) {
  if (e == null) return {};
  var r = y6(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function y6(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function uv(e) {
  return x6(e) || w6(e) || b6(e) || g6();
}
function g6() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function b6(e, t) {
  if (e) {
    if (typeof e == "string") return ql(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ql(e, t);
  }
}
function w6(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function x6(e) {
  if (Array.isArray(e)) return ql(e);
}
function ql(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var fv = function(t) {
  return t && t.x === +t.x && t.y === +t.y;
}, O6 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], r = [[]];
  return t.forEach(function(n) {
    fv(n) ? r[r.length - 1].push(n) : r[r.length - 1].length > 0 && r.push([]);
  }), fv(t[0]) && r[r.length - 1].push(t[0]), r[r.length - 1].length <= 0 && (r = r.slice(0, -1)), r;
}, Ta = function(t, r) {
  var n = O6(t);
  r && (n = [n.reduce(function(i, o) {
    return [].concat(uv(i), uv(o));
  }, [])]);
  var a = n.map(function(i) {
    return i.reduce(function(o, c, s) {
      return "".concat(o).concat(s === 0 ? "M" : "L").concat(c.x, ",").concat(c.y);
    }, "");
  }).join("");
  return n.length === 1 ? "".concat(a, "Z") : a;
}, S6 = function(t, r, n) {
  var a = Ta(t, n);
  return "".concat(a.slice(-1) === "Z" ? a.slice(0, -1) : a, "L").concat(Ta(r.reverse(), n).slice(1));
}, P6 = function(t) {
  var r = t.points, n = t.className, a = t.baseLinePoints, i = t.connectNulls, o = m6(t, v6);
  if (!r || !r.length)
    return null;
  var c = le("recharts-polygon", n);
  if (a && a.length) {
    var s = o.stroke && o.stroke !== "none", l = S6(r, a, i);
    return /* @__PURE__ */ T.createElement("g", {
      className: c
    }, /* @__PURE__ */ T.createElement("path", fn({}, te(o, !0), {
      fill: l.slice(-1) === "Z" ? o.fill : "none",
      stroke: "none",
      d: l
    })), s ? /* @__PURE__ */ T.createElement("path", fn({}, te(o, !0), {
      fill: "none",
      d: Ta(r, i)
    })) : null, s ? /* @__PURE__ */ T.createElement("path", fn({}, te(o, !0), {
      fill: "none",
      d: Ta(a, i)
    })) : null);
  }
  var f = Ta(r, i);
  return /* @__PURE__ */ T.createElement("path", fn({}, te(o, !0), {
    fill: f.slice(-1) === "Z" ? o.fill : "none",
    className: c,
    d: f
  }));
};
function Hl() {
  return Hl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Hl.apply(this, arguments);
}
var jc = function(t) {
  var r = t.cx, n = t.cy, a = t.r, i = t.className, o = le("recharts-dot", i);
  return r === +r && n === +n && a === +a ? /* @__PURE__ */ q.createElement("circle", Hl({}, te(t, !1), to(t), {
    className: o,
    cx: r,
    cy: n,
    r: a
  })) : null;
};
function ii(e) {
  "@babel/helpers - typeof";
  return ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ii(e);
}
var _6 = ["x", "y", "top", "left", "width", "height", "className"];
function Gl() {
  return Gl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Gl.apply(this, arguments);
}
function dv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function A6(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dv(Object(r), !0).forEach(function(n) {
      E6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function E6(e, t, r) {
  return t = T6(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function T6(e) {
  var t = $6(e, "string");
  return ii(t) == "symbol" ? t : t + "";
}
function $6(e, t) {
  if (ii(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ii(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function C6(e, t) {
  if (e == null) return {};
  var r = M6(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function M6(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var j6 = function(t, r, n, a, i, o) {
  return "M".concat(t, ",").concat(i, "v").concat(a, "M").concat(o, ",").concat(r, "h").concat(n);
}, N6 = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, a = t.y, i = a === void 0 ? 0 : a, o = t.top, c = o === void 0 ? 0 : o, s = t.left, l = s === void 0 ? 0 : s, f = t.width, u = f === void 0 ? 0 : f, d = t.height, h = d === void 0 ? 0 : d, m = t.className, v = C6(t, _6), p = A6({
    x: n,
    y: i,
    top: c,
    left: l,
    width: u,
    height: h
  }, v);
  return !H(n) || !H(i) || !H(u) || !H(h) || !H(c) || !H(l) ? null : /* @__PURE__ */ T.createElement("path", Gl({}, te(p, !0), {
    className: le("recharts-cross", m),
    d: j6(n, i, u, h, c, l)
  }));
}, k6 = Ec, I6 = kg, D6 = Wt;
function R6(e, t) {
  return e && e.length ? k6(e, D6(t), I6) : void 0;
}
var L6 = R6;
const F6 = /* @__PURE__ */ Pe(L6);
var B6 = Ec, z6 = Wt, W6 = Ig;
function U6(e, t) {
  return e && e.length ? B6(e, z6(t), W6) : void 0;
}
var V6 = U6;
const q6 = /* @__PURE__ */ Pe(V6);
var H6 = ["cx", "cy", "angle", "ticks", "axisLine"], G6 = ["ticks", "tick", "angle", "tickFormatter", "stroke"];
function Nn(e) {
  "@babel/helpers - typeof";
  return Nn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Nn(e);
}
function $a() {
  return $a = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, $a.apply(this, arguments);
}
function hv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function $r(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hv(Object(r), !0).forEach(function(n) {
      Nc(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : hv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function pv(e, t) {
  if (e == null) return {};
  var r = Y6(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Y6(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function K6(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function vv(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Sb(n.key), n);
  }
}
function X6(e, t, r) {
  return t && vv(e.prototype, t), r && vv(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Z6(e, t, r) {
  return t = Fo(t), J6(e, Ob() ? Reflect.construct(t, r || [], Fo(e).constructor) : t.apply(e, r));
}
function J6(e, t) {
  if (t && (Nn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Q6(e);
}
function Q6(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Ob() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Ob = function() {
    return !!e;
  })();
}
function Fo(e) {
  return Fo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Fo(e);
}
function e8(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Yl(e, t);
}
function Yl(e, t) {
  return Yl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Yl(e, t);
}
function Nc(e, t, r) {
  return t = Sb(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Sb(e) {
  var t = t8(e, "string");
  return Nn(t) == "symbol" ? t : t + "";
}
function t8(e, t) {
  if (Nn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Nn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var kc = /* @__PURE__ */ function(e) {
  function t() {
    return K6(this, t), Z6(this, t, arguments);
  }
  return e8(t, e), X6(t, [{
    key: "getTickValueCoord",
    value: (
      /**
       * Calculate the coordinate of tick
       * @param  {Number} coordinate The radius of tick
       * @return {Object} (x, y)
       */
      function(n) {
        var a = n.coordinate, i = this.props, o = i.angle, c = i.cx, s = i.cy;
        return Me(c, s, a, o);
      }
    )
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var n = this.props.orientation, a;
      switch (n) {
        case "left":
          a = "end";
          break;
        case "right":
          a = "start";
          break;
        default:
          a = "middle";
          break;
      }
      return a;
    }
  }, {
    key: "getViewBox",
    value: function() {
      var n = this.props, a = n.cx, i = n.cy, o = n.angle, c = n.ticks, s = F6(c, function(f) {
        return f.coordinate || 0;
      }), l = q6(c, function(f) {
        return f.coordinate || 0;
      });
      return {
        cx: a,
        cy: i,
        startAngle: o,
        endAngle: o,
        innerRadius: l.coordinate || 0,
        outerRadius: s.coordinate || 0
      };
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, a = n.cx, i = n.cy, o = n.angle, c = n.ticks, s = n.axisLine, l = pv(n, H6), f = c.reduce(function(m, v) {
        return [Math.min(m[0], v.coordinate), Math.max(m[1], v.coordinate)];
      }, [1 / 0, -1 / 0]), u = Me(a, i, f[0], o), d = Me(a, i, f[1], o), h = $r($r($r({}, te(l, !1)), {}, {
        fill: "none"
      }, te(s, !1)), {}, {
        x1: u.x,
        y1: u.y,
        x2: d.x,
        y2: d.y
      });
      return /* @__PURE__ */ T.createElement("line", $a({
        className: "recharts-polar-radius-axis-line"
      }, h));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, a = this.props, i = a.ticks, o = a.tick, c = a.angle, s = a.tickFormatter, l = a.stroke, f = pv(a, G6), u = this.getTickTextAnchor(), d = te(f, !1), h = te(o, !1), m = i.map(function(v, p) {
        var b = n.getTickValueCoord(v), g = $r($r($r($r({
          textAnchor: u,
          transform: "rotate(".concat(90 - c, ", ").concat(b.x, ", ").concat(b.y, ")")
        }, d), {}, {
          stroke: "none",
          fill: l
        }, h), {}, {
          index: p
        }, b), {}, {
          payload: v
        });
        return /* @__PURE__ */ T.createElement(pe, $a({
          className: le("recharts-polar-radius-axis-tick", lb(o)),
          key: "tick-".concat(v.coordinate)
        }, qr(n.props, v, p)), t.renderTickItem(o, g, s ? s(v.value, p) : v.value));
      });
      return /* @__PURE__ */ T.createElement(pe, {
        className: "recharts-polar-radius-axis-ticks"
      }, m);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.ticks, i = n.axisLine, o = n.tick;
      return !a || !a.length ? null : /* @__PURE__ */ T.createElement(pe, {
        className: le("recharts-polar-radius-axis", this.props.className)
      }, i && this.renderAxisLine(), o && this.renderTicks(), He.renderCallByParent(this.props, this.getViewBox()));
    }
  }], [{
    key: "renderTickItem",
    value: function(n, a, i) {
      var o;
      return /* @__PURE__ */ T.isValidElement(n) ? o = /* @__PURE__ */ T.cloneElement(n, a) : ie(n) ? o = n(a) : o = /* @__PURE__ */ T.createElement(Hr, $a({}, a, {
        className: "recharts-polar-radius-axis-tick-value"
      }), i), o;
    }
  }]);
}(Et);
Nc(kc, "displayName", "PolarRadiusAxis");
Nc(kc, "axisType", "radiusAxis");
Nc(kc, "defaultProps", {
  type: "number",
  radiusAxisId: 0,
  cx: 0,
  cy: 0,
  angle: 0,
  orientation: "right",
  stroke: "#ccc",
  axisLine: !0,
  tick: !0,
  tickCount: 5,
  allowDataOverflow: !1,
  scale: "auto",
  allowDuplicatedCategory: !0
});
function kn(e) {
  "@babel/helpers - typeof";
  return kn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, kn(e);
}
function Ir() {
  return Ir = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ir.apply(this, arguments);
}
function mv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Cr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? mv(Object(r), !0).forEach(function(n) {
      Ic(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : mv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function r8(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function yv(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, _b(n.key), n);
  }
}
function n8(e, t, r) {
  return t && yv(e.prototype, t), r && yv(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function a8(e, t, r) {
  return t = Bo(t), i8(e, Pb() ? Reflect.construct(t, r || [], Bo(e).constructor) : t.apply(e, r));
}
function i8(e, t) {
  if (t && (kn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return o8(e);
}
function o8(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Pb() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Pb = function() {
    return !!e;
  })();
}
function Bo(e) {
  return Bo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Bo(e);
}
function c8(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Kl(e, t);
}
function Kl(e, t) {
  return Kl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Kl(e, t);
}
function Ic(e, t, r) {
  return t = _b(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function _b(e) {
  var t = s8(e, "string");
  return kn(t) == "symbol" ? t : t + "";
}
function s8(e, t) {
  if (kn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (kn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var l8 = Math.PI / 180, gv = 1e-5, Dc = /* @__PURE__ */ function(e) {
  function t() {
    return r8(this, t), a8(this, t, arguments);
  }
  return c8(t, e), n8(t, [{
    key: "getTickLineCoord",
    value: (
      /**
       * Calculate the coordinate of line endpoint
       * @param  {Object} data The Data if ticks
       * @return {Object} (x0, y0): The start point of text,
       *                  (x1, y1): The end point close to text,
       *                  (x2, y2): The end point close to axis
       */
      function(n) {
        var a = this.props, i = a.cx, o = a.cy, c = a.radius, s = a.orientation, l = a.tickSize, f = l || 8, u = Me(i, o, c, n.coordinate), d = Me(i, o, c + (s === "inner" ? -1 : 1) * f, n.coordinate);
        return {
          x1: u.x,
          y1: u.y,
          x2: d.x,
          y2: d.y
        };
      }
    )
    /**
     * Get the text-anchor of each tick
     * @param  {Object} data Data of ticks
     * @return {String} text-anchor
     */
  }, {
    key: "getTickTextAnchor",
    value: function(n) {
      var a = this.props.orientation, i = Math.cos(-n.coordinate * l8), o;
      return i > gv ? o = a === "outer" ? "start" : "end" : i < -gv ? o = a === "outer" ? "end" : "start" : o = "middle", o;
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, a = n.cx, i = n.cy, o = n.radius, c = n.axisLine, s = n.axisLineType, l = Cr(Cr({}, te(this.props, !1)), {}, {
        fill: "none"
      }, te(c, !1));
      if (s === "circle")
        return /* @__PURE__ */ T.createElement(jc, Ir({
          className: "recharts-polar-angle-axis-line"
        }, l, {
          cx: a,
          cy: i,
          r: o
        }));
      var f = this.props.ticks, u = f.map(function(d) {
        return Me(a, i, o, d.coordinate);
      });
      return /* @__PURE__ */ T.createElement(P6, Ir({
        className: "recharts-polar-angle-axis-line"
      }, l, {
        points: u
      }));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, a = this.props, i = a.ticks, o = a.tick, c = a.tickLine, s = a.tickFormatter, l = a.stroke, f = te(this.props, !1), u = te(o, !1), d = Cr(Cr({}, f), {}, {
        fill: "none"
      }, te(c, !1)), h = i.map(function(m, v) {
        var p = n.getTickLineCoord(m), b = n.getTickTextAnchor(m), g = Cr(Cr(Cr({
          textAnchor: b
        }, f), {}, {
          stroke: "none",
          fill: l
        }, u), {}, {
          index: v,
          payload: m,
          x: p.x2,
          y: p.y2
        });
        return /* @__PURE__ */ T.createElement(pe, Ir({
          className: le("recharts-polar-angle-axis-tick", lb(o)),
          key: "tick-".concat(m.coordinate)
        }, qr(n.props, m, v)), c && /* @__PURE__ */ T.createElement("line", Ir({
          className: "recharts-polar-angle-axis-tick-line"
        }, d, p)), o && t.renderTickItem(o, g, s ? s(m.value, v) : m.value));
      });
      return /* @__PURE__ */ T.createElement(pe, {
        className: "recharts-polar-angle-axis-ticks"
      }, h);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.ticks, i = n.radius, o = n.axisLine;
      return i <= 0 || !a || !a.length ? null : /* @__PURE__ */ T.createElement(pe, {
        className: le("recharts-polar-angle-axis", this.props.className)
      }, o && this.renderAxisLine(), this.renderTicks());
    }
  }], [{
    key: "renderTickItem",
    value: function(n, a, i) {
      var o;
      return /* @__PURE__ */ T.isValidElement(n) ? o = /* @__PURE__ */ T.cloneElement(n, a) : ie(n) ? o = n(a) : o = /* @__PURE__ */ T.createElement(Hr, Ir({}, a, {
        className: "recharts-polar-angle-axis-tick-value"
      }), i), o;
    }
  }]);
}(Et);
Ic(Dc, "displayName", "PolarAngleAxis");
Ic(Dc, "axisType", "angleAxis");
Ic(Dc, "defaultProps", {
  type: "category",
  angleAxisId: 0,
  scale: "auto",
  cx: 0,
  cy: 0,
  orientation: "outer",
  axisLine: !0,
  tickLine: !0,
  tickSize: 8,
  tick: !0,
  hide: !1,
  allowDuplicatedCategory: !0
});
var u8 = My, f8 = u8(Object.getPrototypeOf, Object), d8 = f8, h8 = ar, p8 = d8, v8 = ir, m8 = "[object Object]", y8 = Function.prototype, g8 = Object.prototype, Ab = y8.toString, b8 = g8.hasOwnProperty, w8 = Ab.call(Object);
function x8(e) {
  if (!v8(e) || h8(e) != m8)
    return !1;
  var t = p8(e);
  if (t === null)
    return !0;
  var r = b8.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && Ab.call(r) == w8;
}
var O8 = x8;
const S8 = /* @__PURE__ */ Pe(O8);
var P8 = ar, _8 = ir, A8 = "[object Boolean]";
function E8(e) {
  return e === !0 || e === !1 || _8(e) && P8(e) == A8;
}
var T8 = E8;
const $8 = /* @__PURE__ */ Pe(T8);
function oi(e) {
  "@babel/helpers - typeof";
  return oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, oi(e);
}
function zo() {
  return zo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, zo.apply(this, arguments);
}
function C8(e, t) {
  return k8(e) || N8(e, t) || j8(e, t) || M8();
}
function M8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function j8(e, t) {
  if (e) {
    if (typeof e == "string") return bv(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return bv(e, t);
  }
}
function bv(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function N8(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, c = [], s = !0, l = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (c.push(n.value), c.length !== t); s = !0) ;
    } catch (f) {
      l = !0, a = f;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw a;
      }
    }
    return c;
  }
}
function k8(e) {
  if (Array.isArray(e)) return e;
}
function wv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wv(Object(r), !0).forEach(function(n) {
      I8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function I8(e, t, r) {
  return t = D8(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function D8(e) {
  var t = R8(e, "string");
  return oi(t) == "symbol" ? t : t + "";
}
function R8(e, t) {
  if (oi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (oi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ov = function(t, r, n, a, i) {
  var o = n - a, c;
  return c = "M ".concat(t, ",").concat(r), c += "L ".concat(t + n, ",").concat(r), c += "L ".concat(t + n - o / 2, ",").concat(r + i), c += "L ".concat(t + n - o / 2 - a, ",").concat(r + i), c += "L ".concat(t, ",").concat(r, " Z"), c;
}, L8 = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, F8 = function(t) {
  var r = xv(xv({}, L8), t), n = Yi(), a = J(-1), i = C8(a, 2), o = i[0], c = i[1];
  vi(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var O = n.current.getTotalLength();
        O && c(O);
      } catch {
      }
  }, []);
  var s = r.x, l = r.y, f = r.upperWidth, u = r.lowerWidth, d = r.height, h = r.className, m = r.animationEasing, v = r.animationDuration, p = r.animationBegin, b = r.isUpdateAnimationActive;
  if (s !== +s || l !== +l || f !== +f || u !== +u || d !== +d || f === 0 && u === 0 || d === 0)
    return null;
  var g = le("recharts-trapezoid", h);
  return b ? /* @__PURE__ */ T.createElement(Lt, {
    canBegin: o > 0,
    from: {
      upperWidth: 0,
      lowerWidth: 0,
      height: d,
      x: s,
      y: l
    },
    to: {
      upperWidth: f,
      lowerWidth: u,
      height: d,
      x: s,
      y: l
    },
    duration: v,
    animationEasing: m,
    isActive: b
  }, function(O) {
    var S = O.upperWidth, y = O.lowerWidth, w = O.height, P = O.x, _ = O.y;
    return /* @__PURE__ */ T.createElement(Lt, {
      canBegin: o > 0,
      from: "0px ".concat(o === -1 ? 1 : o, "px"),
      to: "".concat(o, "px 0px"),
      attributeName: "strokeDasharray",
      begin: p,
      duration: v,
      easing: m
    }, /* @__PURE__ */ T.createElement("path", zo({}, te(r, !0), {
      className: g,
      d: Ov(P, _, S, y, w),
      ref: n
    })));
  }) : /* @__PURE__ */ T.createElement("g", null, /* @__PURE__ */ T.createElement("path", zo({}, te(r, !0), {
    className: g,
    d: Ov(s, l, f, u, d)
  })));
}, B8 = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function ci(e) {
  "@babel/helpers - typeof";
  return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ci(e);
}
function z8(e, t) {
  if (e == null) return {};
  var r = W8(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function W8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Sv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Wo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Sv(Object(r), !0).forEach(function(n) {
      U8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Sv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function U8(e, t, r) {
  return t = V8(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function V8(e) {
  var t = q8(e, "string");
  return ci(t) == "symbol" ? t : t + "";
}
function q8(e, t) {
  if (ci(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ci(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function H8(e, t) {
  return Wo(Wo({}, t), e);
}
function G8(e, t) {
  return e === "symbols";
}
function Pv(e) {
  var t = e.shapeType, r = e.elementProps;
  switch (t) {
    case "rectangle":
      return /* @__PURE__ */ T.createElement(Pf, r);
    case "trapezoid":
      return /* @__PURE__ */ T.createElement(F8, r);
    case "sector":
      return /* @__PURE__ */ T.createElement(db, r);
    case "symbols":
      if (G8(t))
        return /* @__PURE__ */ T.createElement(Bu, r);
      break;
    default:
      return null;
  }
}
function Y8(e) {
  return /* @__PURE__ */ Pt(e) ? e.props : e;
}
function Eb(e) {
  var t = e.option, r = e.shapeType, n = e.propTransformer, a = n === void 0 ? H8 : n, i = e.activeClassName, o = i === void 0 ? "recharts-active-shape" : i, c = e.isActive, s = z8(e, B8), l;
  if (/* @__PURE__ */ Pt(t))
    l = /* @__PURE__ */ ze(t, Wo(Wo({}, s), Y8(t)));
  else if (ie(t))
    l = t(s);
  else if (S8(t) && !$8(t)) {
    var f = a(t, s);
    l = /* @__PURE__ */ T.createElement(Pv, {
      shapeType: r,
      elementProps: f
    });
  } else {
    var u = s;
    l = /* @__PURE__ */ T.createElement(Pv, {
      shapeType: r,
      elementProps: u
    });
  }
  return c ? /* @__PURE__ */ T.createElement(pe, {
    className: o
  }, l) : l;
}
function Rc(e, t) {
  return t != null && "trapezoids" in e.props;
}
function Lc(e, t) {
  return t != null && "sectors" in e.props;
}
function si(e, t) {
  return t != null && "points" in e.props;
}
function K8(e, t) {
  var r, n, a = e.x === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.x) || e.x === t.x, i = e.y === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.y) || e.y === t.y;
  return a && i;
}
function X8(e, t) {
  var r = e.endAngle === t.endAngle, n = e.startAngle === t.startAngle;
  return r && n;
}
function Z8(e, t) {
  var r = e.x === t.x, n = e.y === t.y, a = e.z === t.z;
  return r && n && a;
}
function J8(e, t) {
  var r;
  return Rc(e, t) ? r = K8 : Lc(e, t) ? r = X8 : si(e, t) && (r = Z8), r;
}
function Q8(e, t) {
  var r;
  return Rc(e, t) ? r = "trapezoids" : Lc(e, t) ? r = "sectors" : si(e, t) && (r = "points"), r;
}
function ez(e, t) {
  if (Rc(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload;
  }
  if (Lc(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload;
  }
  return si(e, t) ? t.payload : {};
}
function tz(e) {
  var t = e.activeTooltipItem, r = e.graphicalItem, n = e.itemData, a = Q8(r, t), i = ez(r, t), o = n.filter(function(s, l) {
    var f = Cn(i, s), u = r.props[a].filter(function(m) {
      var v = J8(r, t);
      return v(m, t);
    }), d = r.props[a].indexOf(u[u.length - 1]), h = l === d;
    return f && h;
  }), c = n.indexOf(o[o.length - 1]);
  return c;
}
var Gi;
function In(e) {
  "@babel/helpers - typeof";
  return In = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, In(e);
}
function dn() {
  return dn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, dn.apply(this, arguments);
}
function _v(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Te(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _v(Object(r), !0).forEach(function(n) {
      pt(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _v(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function rz(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Av(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, $b(n.key), n);
  }
}
function nz(e, t, r) {
  return t && Av(e.prototype, t), r && Av(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function az(e, t, r) {
  return t = Uo(t), iz(e, Tb() ? Reflect.construct(t, r || [], Uo(e).constructor) : t.apply(e, r));
}
function iz(e, t) {
  if (t && (In(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return oz(e);
}
function oz(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Tb() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Tb = function() {
    return !!e;
  })();
}
function Uo(e) {
  return Uo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Uo(e);
}
function cz(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Xl(e, t);
}
function Xl(e, t) {
  return Xl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Xl(e, t);
}
function pt(e, t, r) {
  return t = $b(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function $b(e) {
  var t = sz(e, "string");
  return In(t) == "symbol" ? t : t + "";
}
function sz(e, t) {
  if (In(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (In(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var cr = /* @__PURE__ */ function(e) {
  function t(r) {
    var n;
    return rz(this, t), n = az(this, t, [r]), pt(n, "pieRef", null), pt(n, "sectorRefs", []), pt(n, "id", na("recharts-pie-")), pt(n, "handleAnimationEnd", function() {
      var a = n.props.onAnimationEnd;
      n.setState({
        isAnimationFinished: !0
      }), ie(a) && a();
    }), pt(n, "handleAnimationStart", function() {
      var a = n.props.onAnimationStart;
      n.setState({
        isAnimationFinished: !1
      }), ie(a) && a();
    }), n.state = {
      isAnimationFinished: !r.isAnimationActive,
      prevIsAnimationActive: r.isAnimationActive,
      prevAnimationId: r.animationId,
      sectorToFocus: 0
    }, n;
  }
  return cz(t, e), nz(t, [{
    key: "isActiveIndex",
    value: function(n) {
      var a = this.props.activeIndex;
      return Array.isArray(a) ? a.indexOf(n) !== -1 : n === a;
    }
  }, {
    key: "hasActiveIndex",
    value: function() {
      var n = this.props.activeIndex;
      return Array.isArray(n) ? n.length !== 0 : n || n === 0;
    }
  }, {
    key: "renderLabels",
    value: function(n) {
      var a = this.props.isAnimationActive;
      if (a && !this.state.isAnimationFinished)
        return null;
      var i = this.props, o = i.label, c = i.labelLine, s = i.dataKey, l = i.valueKey, f = te(this.props, !1), u = te(o, !1), d = te(c, !1), h = o && o.offsetRadius || 20, m = n.map(function(v, p) {
        var b = (v.startAngle + v.endAngle) / 2, g = Me(v.cx, v.cy, v.outerRadius + h, b), O = Te(Te(Te(Te({}, f), v), {}, {
          stroke: "none"
        }, u), {}, {
          index: p,
          textAnchor: t.getTextAnchor(g.x, v.cx)
        }, g), S = Te(Te(Te(Te({}, f), v), {}, {
          fill: "none",
          stroke: v.fill
        }, d), {}, {
          index: p,
          points: [Me(v.cx, v.cy, v.outerRadius, b), g]
        }), y = s;
        return ce(s) && ce(l) ? y = "value" : ce(s) && (y = l), // eslint-disable-next-line react/no-array-index-key
        /* @__PURE__ */ T.createElement(pe, {
          key: "label-".concat(v.startAngle, "-").concat(v.endAngle, "-").concat(v.midAngle, "-").concat(p)
        }, c && t.renderLabelLineItem(c, S, "line"), t.renderLabelItem(o, O, We(v, y)));
      });
      return /* @__PURE__ */ T.createElement(pe, {
        className: "recharts-pie-labels"
      }, m);
    }
  }, {
    key: "renderSectorsStatically",
    value: function(n) {
      var a = this, i = this.props, o = i.activeShape, c = i.blendStroke, s = i.inactiveShape;
      return n.map(function(l, f) {
        if ((l == null ? void 0 : l.startAngle) === 0 && (l == null ? void 0 : l.endAngle) === 0 && n.length !== 1) return null;
        var u = a.isActiveIndex(f), d = s && a.hasActiveIndex() ? s : null, h = u ? o : d, m = Te(Te({}, l), {}, {
          stroke: c ? l.fill : l.stroke,
          tabIndex: -1
        });
        return /* @__PURE__ */ T.createElement(pe, dn({
          ref: function(p) {
            p && !a.sectorRefs.includes(p) && a.sectorRefs.push(p);
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, qr(a.props, l, f), {
          // eslint-disable-next-line react/no-array-index-key
          key: "sector-".concat(l == null ? void 0 : l.startAngle, "-").concat(l == null ? void 0 : l.endAngle, "-").concat(l.midAngle, "-").concat(f)
        }), /* @__PURE__ */ T.createElement(Eb, dn({
          option: h,
          isActive: u,
          shapeType: "sector"
        }, m)));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function() {
      var n = this, a = this.props, i = a.sectors, o = a.isAnimationActive, c = a.animationBegin, s = a.animationDuration, l = a.animationEasing, f = a.animationId, u = this.state, d = u.prevSectors, h = u.prevIsAnimationActive;
      return /* @__PURE__ */ T.createElement(Lt, {
        begin: c,
        duration: s,
        isActive: o,
        easing: l,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(f, "-").concat(h),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(m) {
        var v = m.t, p = [], b = i && i[0], g = b.startAngle;
        return i.forEach(function(O, S) {
          var y = d && d[S], w = S > 0 ? lt(O, "paddingAngle", 0) : 0;
          if (y) {
            var P = rt(y.endAngle - y.startAngle, O.endAngle - O.startAngle), _ = Te(Te({}, O), {}, {
              startAngle: g + w,
              endAngle: g + P(v) + w
            });
            p.push(_), g = _.endAngle;
          } else {
            var $ = O.endAngle, E = O.startAngle, j = rt(0, $ - E), C = j(v), D = Te(Te({}, O), {}, {
              startAngle: g + w,
              endAngle: g + C + w
            });
            p.push(D), g = D.endAngle;
          }
        }), /* @__PURE__ */ T.createElement(pe, null, n.renderSectorsStatically(p));
      });
    }
  }, {
    key: "attachKeyboardHandlers",
    value: function(n) {
      var a = this;
      n.onkeydown = function(i) {
        if (!i.altKey)
          switch (i.key) {
            case "ArrowLeft": {
              var o = ++a.state.sectorToFocus % a.sectorRefs.length;
              a.sectorRefs[o].focus(), a.setState({
                sectorToFocus: o
              });
              break;
            }
            case "ArrowRight": {
              var c = --a.state.sectorToFocus < 0 ? a.sectorRefs.length - 1 : a.state.sectorToFocus % a.sectorRefs.length;
              a.sectorRefs[c].focus(), a.setState({
                sectorToFocus: c
              });
              break;
            }
            case "Escape": {
              a.sectorRefs[a.state.sectorToFocus].blur(), a.setState({
                sectorToFocus: 0
              });
              break;
            }
          }
      };
    }
  }, {
    key: "renderSectors",
    value: function() {
      var n = this.props, a = n.sectors, i = n.isAnimationActive, o = this.state.prevSectors;
      return i && a && a.length && (!o || !Cn(o, a)) ? this.renderSectorsWithAnimation() : this.renderSectorsStatically(a);
    }
  }, {
    key: "componentDidMount",
    value: function() {
      this.pieRef && this.attachKeyboardHandlers(this.pieRef);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.hide, o = a.sectors, c = a.className, s = a.label, l = a.cx, f = a.cy, u = a.innerRadius, d = a.outerRadius, h = a.isAnimationActive, m = this.state.isAnimationFinished;
      if (i || !o || !o.length || !H(l) || !H(f) || !H(u) || !H(d))
        return null;
      var v = le("recharts-pie", c);
      return /* @__PURE__ */ T.createElement(pe, {
        tabIndex: this.props.rootTabIndex,
        className: v,
        ref: function(b) {
          n.pieRef = b;
        }
      }, this.renderSectors(), s && this.renderLabels(o), He.renderCallByParent(this.props, null, !1), (!h || m) && Jt.renderCallByParent(this.props, o, !1));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, a) {
      return a.prevIsAnimationActive !== n.isAnimationActive ? {
        prevIsAnimationActive: n.isAnimationActive,
        prevAnimationId: n.animationId,
        curSectors: n.sectors,
        prevSectors: [],
        isAnimationFinished: !0
      } : n.isAnimationActive && n.animationId !== a.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curSectors: n.sectors,
        prevSectors: a.curSectors,
        isAnimationFinished: !0
      } : n.sectors !== a.curSectors ? {
        curSectors: n.sectors,
        isAnimationFinished: !0
      } : null;
    }
  }, {
    key: "getTextAnchor",
    value: function(n, a) {
      return n > a ? "start" : n < a ? "end" : "middle";
    }
  }, {
    key: "renderLabelLineItem",
    value: function(n, a, i) {
      if (/* @__PURE__ */ T.isValidElement(n))
        return /* @__PURE__ */ T.cloneElement(n, a);
      if (ie(n))
        return n(a);
      var o = le("recharts-pie-label-line", typeof n != "boolean" ? n.className : "");
      return /* @__PURE__ */ T.createElement(bn, dn({}, a, {
        key: i,
        type: "linear",
        className: o
      }));
    }
  }, {
    key: "renderLabelItem",
    value: function(n, a, i) {
      if (/* @__PURE__ */ T.isValidElement(n))
        return /* @__PURE__ */ T.cloneElement(n, a);
      var o = i;
      if (ie(n) && (o = n(a), /* @__PURE__ */ T.isValidElement(o)))
        return o;
      var c = le("recharts-pie-label-text", typeof n != "boolean" && !ie(n) ? n.className : "");
      return /* @__PURE__ */ T.createElement(Hr, dn({}, a, {
        alignmentBaseline: "middle",
        className: c
      }), o);
    }
  }]);
}(Et);
Gi = cr;
pt(cr, "displayName", "Pie");
pt(cr, "defaultProps", {
  stroke: "#fff",
  fill: "#808080",
  legendType: "rect",
  cx: "50%",
  cy: "50%",
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  outerRadius: "80%",
  paddingAngle: 0,
  labelLine: !0,
  hide: !1,
  minAngle: 0,
  isAnimationActive: !Jr.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  nameKey: "name",
  blendStroke: !1,
  rootTabIndex: 0
});
pt(cr, "parseDeltaAngle", function(e, t) {
  var r = Je(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
});
pt(cr, "getRealPieData", function(e) {
  var t = e.data, r = e.children, n = te(e, !1), a = mt(r, Xu);
  return t && t.length ? t.map(function(i, o) {
    return Te(Te(Te({
      payload: i
    }, n), i), a && a[o] && a[o].props);
  }) : a && a.length ? a.map(function(i) {
    return Te(Te({}, n), i.props);
  }) : [];
});
pt(cr, "parseCoordinateOfPie", function(e, t) {
  var r = t.top, n = t.left, a = t.width, i = t.height, o = sb(a, i), c = n + Qe(e.cx, a, a / 2), s = r + Qe(e.cy, i, i / 2), l = Qe(e.innerRadius, o, 0), f = Qe(e.outerRadius, o, o * 0.8), u = e.maxRadius || Math.sqrt(a * a + i * i) / 2;
  return {
    cx: c,
    cy: s,
    innerRadius: l,
    outerRadius: f,
    maxRadius: u
  };
});
pt(cr, "getComposedData", function(e) {
  var t = e.item, r = e.offset, n = t.type.defaultProps !== void 0 ? Te(Te({}, t.type.defaultProps), t.props) : t.props, a = Gi.getRealPieData(n);
  if (!a || !a.length)
    return null;
  var i = n.cornerRadius, o = n.startAngle, c = n.endAngle, s = n.paddingAngle, l = n.dataKey, f = n.nameKey, u = n.valueKey, d = n.tooltipType, h = Math.abs(n.minAngle), m = Gi.parseCoordinateOfPie(n, r), v = Gi.parseDeltaAngle(o, c), p = Math.abs(v), b = l;
  ce(l) && ce(u) ? (_t(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), b = "value") : ce(l) && (_t(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), b = u);
  var g = a.filter(function(_) {
    return We(_, b, 0) !== 0;
  }).length, O = (p >= 360 ? g : g - 1) * s, S = p - g * h - O, y = a.reduce(function(_, $) {
    var E = We($, b, 0);
    return _ + (H(E) ? E : 0);
  }, 0), w;
  if (y > 0) {
    var P;
    w = a.map(function(_, $) {
      var E = We(_, b, 0), j = We(_, f, $), C = (H(E) ? E : 0) / y, D;
      $ ? D = P.endAngle + Je(v) * s * (E !== 0 ? 1 : 0) : D = o;
      var I = D + Je(v) * ((E !== 0 ? h : 0) + C * S), R = (D + I) / 2, F = (m.innerRadius + m.outerRadius) / 2, k = [{
        name: j,
        value: E,
        payload: _,
        dataKey: b,
        type: d
      }], z = Me(m.cx, m.cy, F, R);
      return P = Te(Te(Te({
        percent: C,
        cornerRadius: i,
        name: j,
        tooltipPayload: k,
        midAngle: R,
        middleRadius: F,
        tooltipPosition: z
      }, _), m), {}, {
        value: We(_, b),
        startAngle: D,
        endAngle: I,
        payload: _,
        paddingAngle: Je(v) * s
      }), P;
    });
  }
  return Te(Te({}, m), {}, {
    sectors: w,
    data: a
  });
});
var lz = Math.ceil, uz = Math.max;
function fz(e, t, r, n) {
  for (var a = -1, i = uz(lz((t - e) / (r || 1)), 0), o = Array(i); i--; )
    o[n ? i : ++a] = e, e += r;
  return o;
}
var dz = fz, hz = Xy, Ev = 1 / 0, pz = 17976931348623157e292;
function vz(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = hz(e), e === Ev || e === -Ev) {
    var t = e < 0 ? -1 : 1;
    return t * pz;
  }
  return e === e ? e : 0;
}
var Cb = vz, mz = dz, yz = wc, js = Cb;
function gz(e) {
  return function(t, r, n) {
    return n && typeof n != "number" && yz(t, r, n) && (r = n = void 0), t = js(t), r === void 0 ? (r = t, t = 0) : r = js(r), n = n === void 0 ? t < r ? 1 : -1 : js(n), mz(t, r, n, e);
  };
}
var bz = gz, wz = bz, xz = wz(), Oz = xz;
const Vo = /* @__PURE__ */ Pe(Oz);
function li(e) {
  "@babel/helpers - typeof";
  return li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, li(e);
}
function Tv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function $v(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Tv(Object(r), !0).forEach(function(n) {
      Mb(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Tv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Mb(e, t, r) {
  return t = Sz(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Sz(e) {
  var t = Pz(e, "string");
  return li(t) == "symbol" ? t : t + "";
}
function Pz(e, t) {
  if (li(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (li(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var _z = ["Webkit", "Moz", "O", "ms"], Az = function(t, r) {
  var n = t.replace(/(\w)/, function(i) {
    return i.toUpperCase();
  }), a = _z.reduce(function(i, o) {
    return $v($v({}, i), {}, Mb({}, o + n, r));
  }, {});
  return a[t] = r, a;
};
function Dn(e) {
  "@babel/helpers - typeof";
  return Dn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Dn(e);
}
function qo() {
  return qo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, qo.apply(this, arguments);
}
function Cv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ns(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cv(Object(r), !0).forEach(function(n) {
      ot(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Cv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ez(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Mv(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Nb(n.key), n);
  }
}
function Tz(e, t, r) {
  return t && Mv(e.prototype, t), r && Mv(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function $z(e, t, r) {
  return t = Ho(t), Cz(e, jb() ? Reflect.construct(t, r || [], Ho(e).constructor) : t.apply(e, r));
}
function Cz(e, t) {
  if (t && (Dn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Mz(e);
}
function Mz(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function jb() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (jb = function() {
    return !!e;
  })();
}
function Ho(e) {
  return Ho = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ho(e);
}
function jz(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Zl(e, t);
}
function Zl(e, t) {
  return Zl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Zl(e, t);
}
function ot(e, t, r) {
  return t = Nb(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Nb(e) {
  var t = Nz(e, "string");
  return Dn(t) == "symbol" ? t : t + "";
}
function Nz(e, t) {
  if (Dn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Dn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var kz = function(t) {
  var r = t.data, n = t.startIndex, a = t.endIndex, i = t.x, o = t.width, c = t.travellerWidth;
  if (!r || !r.length)
    return {};
  var s = r.length, l = _a().domain(Vo(0, s)).range([i, i + o - c]), f = l.domain().map(function(u) {
    return l(u);
  });
  return {
    isTextActive: !1,
    isSlideMoving: !1,
    isTravellerMoving: !1,
    isTravellerFocused: !1,
    startX: l(n),
    endX: l(a),
    scale: l,
    scaleValues: f
  };
}, jv = function(t) {
  return t.changedTouches && !!t.changedTouches.length;
}, Rn = /* @__PURE__ */ function(e) {
  function t(r) {
    var n;
    return Ez(this, t), n = $z(this, t, [r]), ot(n, "handleDrag", function(a) {
      n.leaveTimer && (clearTimeout(n.leaveTimer), n.leaveTimer = null), n.state.isTravellerMoving ? n.handleTravellerMove(a) : n.state.isSlideMoving && n.handleSlideDrag(a);
    }), ot(n, "handleTouchMove", function(a) {
      a.changedTouches != null && a.changedTouches.length > 0 && n.handleDrag(a.changedTouches[0]);
    }), ot(n, "handleDragEnd", function() {
      n.setState({
        isTravellerMoving: !1,
        isSlideMoving: !1
      }, function() {
        var a = n.props, i = a.endIndex, o = a.onDragEnd, c = a.startIndex;
        o == null || o({
          endIndex: i,
          startIndex: c
        });
      }), n.detachDragEndListener();
    }), ot(n, "handleLeaveWrapper", function() {
      (n.state.isTravellerMoving || n.state.isSlideMoving) && (n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut));
    }), ot(n, "handleEnterSlideOrTraveller", function() {
      n.setState({
        isTextActive: !0
      });
    }), ot(n, "handleLeaveSlideOrTraveller", function() {
      n.setState({
        isTextActive: !1
      });
    }), ot(n, "handleSlideDragStart", function(a) {
      var i = jv(a) ? a.changedTouches[0] : a;
      n.setState({
        isTravellerMoving: !1,
        isSlideMoving: !0,
        slideMoveStartX: i.pageX
      }), n.attachDragEndListener();
    }), n.travellerDragStartHandlers = {
      startX: n.handleTravellerDragStart.bind(n, "startX"),
      endX: n.handleTravellerDragStart.bind(n, "endX")
    }, n.state = {}, n;
  }
  return jz(t, e), Tz(t, [{
    key: "componentWillUnmount",
    value: function() {
      this.leaveTimer && (clearTimeout(this.leaveTimer), this.leaveTimer = null), this.detachDragEndListener();
    }
  }, {
    key: "getIndex",
    value: function(n) {
      var a = n.startX, i = n.endX, o = this.state.scaleValues, c = this.props, s = c.gap, l = c.data, f = l.length - 1, u = Math.min(a, i), d = Math.max(a, i), h = t.getIndexInRange(o, u), m = t.getIndexInRange(o, d);
      return {
        startIndex: h - h % s,
        endIndex: m === f ? f : m - m % s
      };
    }
  }, {
    key: "getTextOfTick",
    value: function(n) {
      var a = this.props, i = a.data, o = a.tickFormatter, c = a.dataKey, s = We(i[n], c, n);
      return ie(o) ? o(s, n) : s;
    }
  }, {
    key: "attachDragEndListener",
    value: function() {
      window.addEventListener("mouseup", this.handleDragEnd, !0), window.addEventListener("touchend", this.handleDragEnd, !0), window.addEventListener("mousemove", this.handleDrag, !0);
    }
  }, {
    key: "detachDragEndListener",
    value: function() {
      window.removeEventListener("mouseup", this.handleDragEnd, !0), window.removeEventListener("touchend", this.handleDragEnd, !0), window.removeEventListener("mousemove", this.handleDrag, !0);
    }
  }, {
    key: "handleSlideDrag",
    value: function(n) {
      var a = this.state, i = a.slideMoveStartX, o = a.startX, c = a.endX, s = this.props, l = s.x, f = s.width, u = s.travellerWidth, d = s.startIndex, h = s.endIndex, m = s.onChange, v = n.pageX - i;
      v > 0 ? v = Math.min(v, l + f - u - c, l + f - u - o) : v < 0 && (v = Math.max(v, l - o, l - c));
      var p = this.getIndex({
        startX: o + v,
        endX: c + v
      });
      (p.startIndex !== d || p.endIndex !== h) && m && m(p), this.setState({
        startX: o + v,
        endX: c + v,
        slideMoveStartX: n.pageX
      });
    }
  }, {
    key: "handleTravellerDragStart",
    value: function(n, a) {
      var i = jv(a) ? a.changedTouches[0] : a;
      this.setState({
        isSlideMoving: !1,
        isTravellerMoving: !0,
        movingTravellerId: n,
        brushMoveStartX: i.pageX
      }), this.attachDragEndListener();
    }
  }, {
    key: "handleTravellerMove",
    value: function(n) {
      var a = this.state, i = a.brushMoveStartX, o = a.movingTravellerId, c = a.endX, s = a.startX, l = this.state[o], f = this.props, u = f.x, d = f.width, h = f.travellerWidth, m = f.onChange, v = f.gap, p = f.data, b = {
        startX: this.state.startX,
        endX: this.state.endX
      }, g = n.pageX - i;
      g > 0 ? g = Math.min(g, u + d - h - l) : g < 0 && (g = Math.max(g, u - l)), b[o] = l + g;
      var O = this.getIndex(b), S = O.startIndex, y = O.endIndex, w = function() {
        var _ = p.length - 1;
        return o === "startX" && (c > s ? S % v === 0 : y % v === 0) || c < s && y === _ || o === "endX" && (c > s ? y % v === 0 : S % v === 0) || c > s && y === _;
      };
      this.setState(ot(ot({}, o, l + g), "brushMoveStartX", n.pageX), function() {
        m && w() && m(O);
      });
    }
  }, {
    key: "handleTravellerMoveKeyboard",
    value: function(n, a) {
      var i = this, o = this.state, c = o.scaleValues, s = o.startX, l = o.endX, f = this.state[a], u = c.indexOf(f);
      if (u !== -1) {
        var d = u + n;
        if (!(d === -1 || d >= c.length)) {
          var h = c[d];
          a === "startX" && h >= l || a === "endX" && h <= s || this.setState(ot({}, a, h), function() {
            i.props.onChange(i.getIndex({
              startX: i.state.startX,
              endX: i.state.endX
            }));
          });
        }
      }
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this.props, a = n.x, i = n.y, o = n.width, c = n.height, s = n.fill, l = n.stroke;
      return /* @__PURE__ */ T.createElement("rect", {
        stroke: l,
        fill: s,
        x: a,
        y: i,
        width: o,
        height: c
      });
    }
  }, {
    key: "renderPanorama",
    value: function() {
      var n = this.props, a = n.x, i = n.y, o = n.width, c = n.height, s = n.data, l = n.children, f = n.padding, u = zr.only(l);
      return u ? /* @__PURE__ */ T.cloneElement(u, {
        x: a,
        y: i,
        width: o,
        height: c,
        margin: f,
        compact: !0,
        data: s
      }) : null;
    }
  }, {
    key: "renderTravellerLayer",
    value: function(n, a) {
      var i, o, c = this, s = this.props, l = s.y, f = s.travellerWidth, u = s.height, d = s.traveller, h = s.ariaLabel, m = s.data, v = s.startIndex, p = s.endIndex, b = Math.max(n, this.props.x), g = Ns(Ns({}, te(this.props, !1)), {}, {
        x: b,
        y: l,
        width: f,
        height: u
      }), O = h || "Min value: ".concat((i = m[v]) === null || i === void 0 ? void 0 : i.name, ", Max value: ").concat((o = m[p]) === null || o === void 0 ? void 0 : o.name);
      return /* @__PURE__ */ T.createElement(pe, {
        tabIndex: 0,
        role: "slider",
        "aria-label": O,
        "aria-valuenow": n,
        className: "recharts-brush-traveller",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.travellerDragStartHandlers[a],
        onTouchStart: this.travellerDragStartHandlers[a],
        onKeyDown: function(y) {
          ["ArrowLeft", "ArrowRight"].includes(y.key) && (y.preventDefault(), y.stopPropagation(), c.handleTravellerMoveKeyboard(y.key === "ArrowRight" ? 1 : -1, a));
        },
        onFocus: function() {
          c.setState({
            isTravellerFocused: !0
          });
        },
        onBlur: function() {
          c.setState({
            isTravellerFocused: !1
          });
        },
        style: {
          cursor: "col-resize"
        }
      }, t.renderTraveller(d, g));
    }
  }, {
    key: "renderSlide",
    value: function(n, a) {
      var i = this.props, o = i.y, c = i.height, s = i.stroke, l = i.travellerWidth, f = Math.min(n, a) + l, u = Math.max(Math.abs(a - n) - l, 0);
      return /* @__PURE__ */ T.createElement("rect", {
        className: "recharts-brush-slide",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.handleSlideDragStart,
        onTouchStart: this.handleSlideDragStart,
        style: {
          cursor: "move"
        },
        stroke: "none",
        fill: s,
        fillOpacity: 0.2,
        x: f,
        y: o,
        width: u,
        height: c
      });
    }
  }, {
    key: "renderText",
    value: function() {
      var n = this.props, a = n.startIndex, i = n.endIndex, o = n.y, c = n.height, s = n.travellerWidth, l = n.stroke, f = this.state, u = f.startX, d = f.endX, h = 5, m = {
        pointerEvents: "none",
        fill: l
      };
      return /* @__PURE__ */ T.createElement(pe, {
        className: "recharts-brush-texts"
      }, /* @__PURE__ */ T.createElement(Hr, qo({
        textAnchor: "end",
        verticalAnchor: "middle",
        x: Math.min(u, d) - h,
        y: o + c / 2
      }, m), this.getTextOfTick(a)), /* @__PURE__ */ T.createElement(Hr, qo({
        textAnchor: "start",
        verticalAnchor: "middle",
        x: Math.max(u, d) + s + h,
        y: o + c / 2
      }, m), this.getTextOfTick(i)));
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.data, i = n.className, o = n.children, c = n.x, s = n.y, l = n.width, f = n.height, u = n.alwaysShowText, d = this.state, h = d.startX, m = d.endX, v = d.isTextActive, p = d.isSlideMoving, b = d.isTravellerMoving, g = d.isTravellerFocused;
      if (!a || !a.length || !H(c) || !H(s) || !H(l) || !H(f) || l <= 0 || f <= 0)
        return null;
      var O = le("recharts-brush", i), S = T.Children.count(o) === 1, y = Az("userSelect", "none");
      return /* @__PURE__ */ T.createElement(pe, {
        className: O,
        onMouseLeave: this.handleLeaveWrapper,
        onTouchMove: this.handleTouchMove,
        style: y
      }, this.renderBackground(), S && this.renderPanorama(), this.renderSlide(h, m), this.renderTravellerLayer(h, "startX"), this.renderTravellerLayer(m, "endX"), (v || p || b || g || u) && this.renderText());
    }
  }], [{
    key: "renderDefaultTraveller",
    value: function(n) {
      var a = n.x, i = n.y, o = n.width, c = n.height, s = n.stroke, l = Math.floor(i + c / 2) - 1;
      return /* @__PURE__ */ T.createElement(T.Fragment, null, /* @__PURE__ */ T.createElement("rect", {
        x: a,
        y: i,
        width: o,
        height: c,
        fill: s,
        stroke: "none"
      }), /* @__PURE__ */ T.createElement("line", {
        x1: a + 1,
        y1: l,
        x2: a + o - 1,
        y2: l,
        fill: "none",
        stroke: "#fff"
      }), /* @__PURE__ */ T.createElement("line", {
        x1: a + 1,
        y1: l + 2,
        x2: a + o - 1,
        y2: l + 2,
        fill: "none",
        stroke: "#fff"
      }));
    }
  }, {
    key: "renderTraveller",
    value: function(n, a) {
      var i;
      return /* @__PURE__ */ T.isValidElement(n) ? i = /* @__PURE__ */ T.cloneElement(n, a) : ie(n) ? i = n(a) : i = t.renderDefaultTraveller(a), i;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function(n, a) {
      var i = n.data, o = n.width, c = n.x, s = n.travellerWidth, l = n.updateId, f = n.startIndex, u = n.endIndex;
      if (i !== a.prevData || l !== a.prevUpdateId)
        return Ns({
          prevData: i,
          prevTravellerWidth: s,
          prevUpdateId: l,
          prevX: c,
          prevWidth: o
        }, i && i.length ? kz({
          data: i,
          width: o,
          x: c,
          travellerWidth: s,
          startIndex: f,
          endIndex: u
        }) : {
          scale: null,
          scaleValues: null
        });
      if (a.scale && (o !== a.prevWidth || c !== a.prevX || s !== a.prevTravellerWidth)) {
        a.scale.range([c, c + o - s]);
        var d = a.scale.domain().map(function(h) {
          return a.scale(h);
        });
        return {
          prevData: i,
          prevTravellerWidth: s,
          prevUpdateId: l,
          prevX: c,
          prevWidth: o,
          startX: a.scale(n.startIndex),
          endX: a.scale(n.endIndex),
          scaleValues: d
        };
      }
      return null;
    }
  }, {
    key: "getIndexInRange",
    value: function(n, a) {
      for (var i = n.length, o = 0, c = i - 1; c - o > 1; ) {
        var s = Math.floor((o + c) / 2);
        n[s] > a ? c = s : o = s;
      }
      return a >= n[c] ? c : o;
    }
  }]);
}(Et);
ot(Rn, "displayName", "Brush");
ot(Rn, "defaultProps", {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: "#fff",
  stroke: "#666",
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  },
  leaveTimeOut: 1e3,
  alwaysShowText: !1
});
var Iz = Gu;
function Dz(e, t) {
  var r;
  return Iz(e, function(n, a, i) {
    return r = t(n, a, i), !r;
  }), !!r;
}
var Rz = Dz, Lz = Sy, Fz = Wt, Bz = Rz, zz = it, Wz = wc;
function Uz(e, t, r) {
  var n = zz(e) ? Lz : Bz;
  return r && Wz(e, t, r) && (t = void 0), n(e, Fz(t));
}
var Vz = Uz;
const qz = /* @__PURE__ */ Pe(Vz);
var Dt = function(t, r) {
  var n = t.alwaysShow, a = t.ifOverflow;
  return n && (a = "extendDomain"), a === r;
}, Nv = qy;
function Hz(e, t, r) {
  t == "__proto__" && Nv ? Nv(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var Gz = Hz, Yz = Gz, Kz = Uy, Xz = Wt;
function Zz(e, t) {
  var r = {};
  return t = Xz(t), Kz(e, function(n, a, i) {
    Yz(r, a, t(n, a, i));
  }), r;
}
var Jz = Zz;
const Qz = /* @__PURE__ */ Pe(Jz);
function eW(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (!t(e[r], r, e))
      return !1;
  return !0;
}
var tW = eW, rW = Gu;
function nW(e, t) {
  var r = !0;
  return rW(e, function(n, a, i) {
    return r = !!t(n, a, i), r;
  }), r;
}
var aW = nW, iW = tW, oW = aW, cW = Wt, sW = it, lW = wc;
function uW(e, t, r) {
  var n = sW(e) ? iW : oW;
  return r && lW(e, t, r) && (t = void 0), n(e, cW(t));
}
var fW = uW;
const kb = /* @__PURE__ */ Pe(fW);
var dW = ["x", "y"];
function Ln(e) {
  "@babel/helpers - typeof";
  return Ln = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ln(e);
}
function Jl() {
  return Jl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Jl.apply(this, arguments);
}
function kv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? kv(Object(r), !0).forEach(function(n) {
      hW(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : kv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function hW(e, t, r) {
  return t = pW(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function pW(e) {
  var t = vW(e, "string");
  return Ln(t) == "symbol" ? t : t + "";
}
function vW(e, t) {
  if (Ln(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ln(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function mW(e, t) {
  if (e == null) return {};
  var r = yW(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function yW(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function gW(e, t) {
  var r = e.x, n = e.y, a = mW(e, dW), i = "".concat(r), o = parseInt(i, 10), c = "".concat(n), s = parseInt(c, 10), l = "".concat(t.height || a.height), f = parseInt(l, 10), u = "".concat(t.width || a.width), d = parseInt(u, 10);
  return xa(xa(xa(xa(xa({}, t), a), o ? {
    x: o
  } : {}), s ? {
    y: s
  } : {}), {}, {
    height: f,
    width: d,
    name: t.name,
    radius: t.radius
  });
}
function Iv(e) {
  return /* @__PURE__ */ T.createElement(Eb, Jl({
    shapeType: "rectangle",
    propTransformer: gW,
    activeClassName: "recharts-active-bar"
  }, e));
}
var bW = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(n, a) {
    if (typeof t == "number") return t;
    var i = H(n) || NP(n);
    return i ? t(n, a) : (i || (process.env.NODE_ENV !== "production" ? at(!1, "minPointSize callback function received a value with type of ".concat(Ln(n), ". Currently only numbers or null/undefined are supported.")) : at()), r);
  };
}, wW = ["value", "background"], Ib;
function Fn(e) {
  "@babel/helpers - typeof";
  return Fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Fn(e);
}
function xW(e, t) {
  if (e == null) return {};
  var r = OW(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function OW(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Go() {
  return Go = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Go.apply(this, arguments);
}
function Dv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Re(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Dv(Object(r), !0).forEach(function(n) {
      vr(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Dv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function SW(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Rv(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Rb(n.key), n);
  }
}
function PW(e, t, r) {
  return t && Rv(e.prototype, t), r && Rv(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _W(e, t, r) {
  return t = Yo(t), AW(e, Db() ? Reflect.construct(t, r || [], Yo(e).constructor) : t.apply(e, r));
}
function AW(e, t) {
  if (t && (Fn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return EW(e);
}
function EW(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Db() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Db = function() {
    return !!e;
  })();
}
function Yo(e) {
  return Yo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Yo(e);
}
function TW(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ql(e, t);
}
function Ql(e, t) {
  return Ql = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Ql(e, t);
}
function vr(e, t, r) {
  return t = Rb(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Rb(e) {
  var t = $W(e, "string");
  return Fn(t) == "symbol" ? t : t + "";
}
function $W(e, t) {
  if (Fn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Fn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var _i = /* @__PURE__ */ function(e) {
  function t() {
    var r;
    SW(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = _W(this, t, [].concat(a)), vr(r, "state", {
      isAnimationFinished: !1
    }), vr(r, "id", na("recharts-bar-")), vr(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), o && o();
    }), vr(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), o && o();
    }), r;
  }
  return TW(t, e), PW(t, [{
    key: "renderRectanglesStatically",
    value: function(n) {
      var a = this, i = this.props, o = i.shape, c = i.dataKey, s = i.activeIndex, l = i.activeBar, f = te(this.props, !1);
      return n && n.map(function(u, d) {
        var h = d === s, m = h ? l : o, v = Re(Re(Re({}, f), u), {}, {
          isActive: h,
          option: m,
          index: d,
          dataKey: c,
          onAnimationStart: a.handleAnimationStart,
          onAnimationEnd: a.handleAnimationEnd
        });
        return /* @__PURE__ */ T.createElement(pe, Go({
          className: "recharts-bar-rectangle"
        }, qr(a.props, u, d), {
          // https://github.com/recharts/recharts/issues/5415
          // eslint-disable-next-line react/no-array-index-key
          key: "rectangle-".concat(u == null ? void 0 : u.x, "-").concat(u == null ? void 0 : u.y, "-").concat(u == null ? void 0 : u.value, "-").concat(d)
        }), /* @__PURE__ */ T.createElement(Iv, v));
      });
    }
  }, {
    key: "renderRectanglesWithAnimation",
    value: function() {
      var n = this, a = this.props, i = a.data, o = a.layout, c = a.isAnimationActive, s = a.animationBegin, l = a.animationDuration, f = a.animationEasing, u = a.animationId, d = this.state.prevData;
      return /* @__PURE__ */ T.createElement(Lt, {
        begin: s,
        duration: l,
        isActive: c,
        easing: f,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "bar-".concat(u),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(h) {
        var m = h.t, v = i.map(function(p, b) {
          var g = d && d[b];
          if (g) {
            var O = rt(g.x, p.x), S = rt(g.y, p.y), y = rt(g.width, p.width), w = rt(g.height, p.height);
            return Re(Re({}, p), {}, {
              x: O(m),
              y: S(m),
              width: y(m),
              height: w(m)
            });
          }
          if (o === "horizontal") {
            var P = rt(0, p.height), _ = P(m);
            return Re(Re({}, p), {}, {
              y: p.y + p.height - _,
              height: _
            });
          }
          var $ = rt(0, p.width), E = $(m);
          return Re(Re({}, p), {}, {
            width: E
          });
        });
        return /* @__PURE__ */ T.createElement(pe, null, n.renderRectanglesStatically(v));
      });
    }
  }, {
    key: "renderRectangles",
    value: function() {
      var n = this.props, a = n.data, i = n.isAnimationActive, o = this.state.prevData;
      return i && a && a.length && (!o || !Cn(o, a)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(a);
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this, a = this.props, i = a.data, o = a.dataKey, c = a.activeIndex, s = te(this.props.background, !1);
      return i.map(function(l, f) {
        l.value;
        var u = l.background, d = xW(l, wW);
        if (!u)
          return null;
        var h = Re(Re(Re(Re(Re({}, d), {}, {
          fill: "#eee"
        }, u), s), qr(n.props, l, f)), {}, {
          onAnimationStart: n.handleAnimationStart,
          onAnimationEnd: n.handleAnimationEnd,
          dataKey: o,
          index: f,
          className: "recharts-bar-background-rectangle"
        });
        return /* @__PURE__ */ T.createElement(Iv, Go({
          key: "background-bar-".concat(f),
          option: n.props.background,
          isActive: f === c
        }, h));
      });
    }
  }, {
    key: "renderErrorBar",
    value: function(n, a) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished)
        return null;
      var i = this.props, o = i.data, c = i.xAxis, s = i.yAxis, l = i.layout, f = i.children, u = mt(f, Mc);
      if (!u)
        return null;
      var d = l === "vertical" ? o[0].height / 2 : o[0].width / 2, h = function(p, b) {
        var g = Array.isArray(p.value) ? p.value[1] : p.value;
        return {
          x: p.x,
          y: p.y,
          value: g,
          errorVal: We(p, b)
        };
      }, m = {
        clipPath: n ? "url(#clipPath-".concat(a, ")") : null
      };
      return /* @__PURE__ */ T.createElement(pe, m, u.map(function(v) {
        return /* @__PURE__ */ T.cloneElement(v, {
          key: "error-bar-".concat(a, "-").concat(v.props.dataKey),
          data: o,
          xAxis: c,
          yAxis: s,
          layout: l,
          offset: d,
          dataPointFormatter: h
        });
      }));
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.hide, i = n.data, o = n.className, c = n.xAxis, s = n.yAxis, l = n.left, f = n.top, u = n.width, d = n.height, h = n.isAnimationActive, m = n.background, v = n.id;
      if (a || !i || !i.length)
        return null;
      var p = this.state.isAnimationFinished, b = le("recharts-bar", o), g = c && c.allowDataOverflow, O = s && s.allowDataOverflow, S = g || O, y = ce(v) ? this.id : v;
      return /* @__PURE__ */ T.createElement(pe, {
        className: b
      }, g || O ? /* @__PURE__ */ T.createElement("defs", null, /* @__PURE__ */ T.createElement("clipPath", {
        id: "clipPath-".concat(y)
      }, /* @__PURE__ */ T.createElement("rect", {
        x: g ? l : l - u / 2,
        y: O ? f : f - d / 2,
        width: g ? u : u * 2,
        height: O ? d : d * 2
      }))) : null, /* @__PURE__ */ T.createElement(pe, {
        className: "recharts-bar-rectangles",
        clipPath: S ? "url(#clipPath-".concat(y, ")") : null
      }, m ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(S, y), (!h || p) && Jt.renderCallByParent(this.props, i));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, a) {
      return n.animationId !== a.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curData: n.data,
        prevData: a.curData
      } : n.data !== a.curData ? {
        curData: n.data
      } : null;
    }
  }]);
}(Et);
Ib = _i;
vr(_i, "displayName", "Bar");
vr(_i, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !Jr.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease"
});
vr(_i, "getComposedData", function(e) {
  var t = e.props, r = e.item, n = e.barPosition, a = e.bandSize, i = e.xAxis, o = e.yAxis, c = e.xAxisTicks, s = e.yAxisTicks, l = e.stackedData, f = e.dataStartIndex, u = e.displayedData, d = e.offset, h = eF(n, r);
  if (!h)
    return null;
  var m = t.layout, v = r.type.defaultProps, p = v !== void 0 ? Re(Re({}, v), r.props) : r.props, b = p.dataKey, g = p.children, O = p.minPointSize, S = m === "horizontal" ? o : i, y = l ? S.scale.domain() : null, w = cF({
    numericAxis: S
  }), P = mt(g, Xu), _ = u.map(function($, E) {
    var j, C, D, I, R, F;
    l ? j = tF(l[f + E], y) : (j = We($, b), Array.isArray(j) || (j = [w, j]));
    var k = bW(O, Ib.defaultProps.minPointSize)(j[1], E);
    if (m === "horizontal") {
      var z, V = [o.scale(j[0]), o.scale(j[1])], N = V[0], B = V[1];
      C = yp({
        axis: i,
        ticks: c,
        bandSize: a,
        offset: h.offset,
        entry: $,
        index: E
      }), D = (z = B ?? N) !== null && z !== void 0 ? z : void 0, I = h.size;
      var W = N - B;
      if (R = Number.isNaN(W) ? 0 : W, F = {
        x: C,
        y: o.y,
        width: I,
        height: o.height
      }, Math.abs(k) > 0 && Math.abs(R) < Math.abs(k)) {
        var Y = Je(R || k) * (Math.abs(k) - Math.abs(R));
        D -= Y, R += Y;
      }
    } else {
      var X = [i.scale(j[0]), i.scale(j[1])], ee = X[0], re = X[1];
      if (C = ee, D = yp({
        axis: o,
        ticks: s,
        bandSize: a,
        offset: h.offset,
        entry: $,
        index: E
      }), I = re - ee, R = h.size, F = {
        x: i.x,
        y: D,
        width: i.width,
        height: R
      }, Math.abs(k) > 0 && Math.abs(I) < Math.abs(k)) {
        var oe = Je(I || k) * (Math.abs(k) - Math.abs(I));
        I += oe;
      }
    }
    return Re(Re(Re({}, $), {}, {
      x: C,
      y: D,
      width: I,
      height: R,
      value: l ? j : j[1],
      payload: $,
      background: F
    }, P && P[E] && P[E].props), {}, {
      tooltipPayload: [ob(r, $)],
      tooltipPosition: {
        x: C + I / 2,
        y: D + R / 2
      }
    });
  });
  return Re({
    data: _,
    layout: m
  }, d);
});
function ui(e) {
  "@babel/helpers - typeof";
  return ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ui(e);
}
function CW(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Lv(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Lb(n.key), n);
  }
}
function MW(e, t, r) {
  return t && Lv(e.prototype, t), r && Lv(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Fv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ot(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fv(Object(r), !0).forEach(function(n) {
      Fc(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Fv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Fc(e, t, r) {
  return t = Lb(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Lb(e) {
  var t = jW(e, "string");
  return ui(t) == "symbol" ? t : t + "";
}
function jW(e, t) {
  if (ui(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ui(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var NW = function(t, r, n, a, i) {
  var o = t.width, c = t.height, s = t.layout, l = t.children, f = Object.keys(r), u = {
    left: n.left,
    leftMirror: n.left,
    right: o - n.right,
    rightMirror: o - n.right,
    top: n.top,
    topMirror: n.top,
    bottom: c - n.bottom,
    bottomMirror: c - n.bottom
  }, d = !!ct(l, _i);
  return f.reduce(function(h, m) {
    var v = r[m], p = v.orientation, b = v.domain, g = v.padding, O = g === void 0 ? {} : g, S = v.mirror, y = v.reversed, w = "".concat(p).concat(S ? "Mirror" : ""), P, _, $, E, j;
    if (v.type === "number" && (v.padding === "gap" || v.padding === "no-gap")) {
      var C = b[1] - b[0], D = 1 / 0, I = v.categoricalDomain.sort(DP);
      if (I.forEach(function(X, ee) {
        ee > 0 && (D = Math.min((X || 0) - (I[ee - 1] || 0), D));
      }), Number.isFinite(D)) {
        var R = D / C, F = v.layout === "vertical" ? n.height : n.width;
        if (v.padding === "gap" && (P = R * F / 2), v.padding === "no-gap") {
          var k = Qe(t.barCategoryGap, R * F), z = R * F / 2;
          P = z - k - (z - k) / F * k;
        }
      }
    }
    a === "xAxis" ? _ = [n.left + (O.left || 0) + (P || 0), n.left + n.width - (O.right || 0) - (P || 0)] : a === "yAxis" ? _ = s === "horizontal" ? [n.top + n.height - (O.bottom || 0), n.top + (O.top || 0)] : [n.top + (O.top || 0) + (P || 0), n.top + n.height - (O.bottom || 0) - (P || 0)] : _ = v.range, y && (_ = [_[1], _[0]]);
    var V = rb(v, i, d), N = V.scale, B = V.realScaleType;
    N.domain(b).range(_), nb(N);
    var W = ab(N, Ot(Ot({}, v), {}, {
      realScaleType: B
    }));
    a === "xAxis" ? (j = p === "top" && !S || p === "bottom" && S, $ = n.left, E = u[w] - j * v.height) : a === "yAxis" && (j = p === "left" && !S || p === "right" && S, $ = u[w] - j * v.width, E = n.top);
    var Y = Ot(Ot(Ot({}, v), W), {}, {
      realScaleType: B,
      x: $,
      y: E,
      scale: N,
      width: a === "xAxis" ? n.width : v.width,
      height: a === "yAxis" ? n.height : v.height
    });
    return Y.bandSize = Co(Y, W), !v.hide && a === "xAxis" ? u[w] += (j ? -1 : 1) * Y.height : v.hide || (u[w] += (j ? -1 : 1) * Y.width), Ot(Ot({}, h), {}, Fc({}, m, Y));
  }, {});
}, Fb = function(t, r) {
  var n = t.x, a = t.y, i = r.x, o = r.y;
  return {
    x: Math.min(n, i),
    y: Math.min(a, o),
    width: Math.abs(i - n),
    height: Math.abs(o - a)
  };
}, kW = function(t) {
  var r = t.x1, n = t.y1, a = t.x2, i = t.y2;
  return Fb({
    x: r,
    y: n
  }, {
    x: a,
    y: i
  });
}, Bb = /* @__PURE__ */ function() {
  function e(t) {
    CW(this, e), this.scale = t;
  }
  return MW(e, [{
    key: "domain",
    get: function() {
      return this.scale.domain;
    }
  }, {
    key: "range",
    get: function() {
      return this.scale.range;
    }
  }, {
    key: "rangeMin",
    get: function() {
      return this.range()[0];
    }
  }, {
    key: "rangeMax",
    get: function() {
      return this.range()[1];
    }
  }, {
    key: "bandwidth",
    get: function() {
      return this.scale.bandwidth;
    }
  }, {
    key: "apply",
    value: function(r) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = n.bandAware, i = n.position;
      if (r !== void 0) {
        if (i)
          switch (i) {
            case "start":
              return this.scale(r);
            case "middle": {
              var o = this.bandwidth ? this.bandwidth() / 2 : 0;
              return this.scale(r) + o;
            }
            case "end": {
              var c = this.bandwidth ? this.bandwidth() : 0;
              return this.scale(r) + c;
            }
            default:
              return this.scale(r);
          }
        if (a) {
          var s = this.bandwidth ? this.bandwidth() / 2 : 0;
          return this.scale(r) + s;
        }
        return this.scale(r);
      }
    }
  }, {
    key: "isInRange",
    value: function(r) {
      var n = this.range(), a = n[0], i = n[n.length - 1];
      return a <= i ? r >= a && r <= i : r >= i && r <= a;
    }
  }], [{
    key: "create",
    value: function(r) {
      return new e(r);
    }
  }]);
}();
Fc(Bb, "EPS", 1e-4);
var _f = function(t) {
  var r = Object.keys(t).reduce(function(n, a) {
    return Ot(Ot({}, n), {}, Fc({}, a, Bb.create(t[a])));
  }, {});
  return Ot(Ot({}, r), {}, {
    apply: function(a) {
      var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = i.bandAware, c = i.position;
      return Qz(a, function(s, l) {
        return r[l].apply(s, {
          bandAware: o,
          position: c
        });
      });
    },
    isInRange: function(a) {
      return kb(a, function(i, o) {
        return r[o].isInRange(i);
      });
    }
  });
};
function IW(e) {
  return (e % 180 + 180) % 180;
}
var DW = function(t) {
  var r = t.width, n = t.height, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, i = IW(a), o = i * Math.PI / 180, c = Math.atan(n / r), s = o > c && o < Math.PI - c ? n / Math.sin(o) : r / Math.cos(o);
  return Math.abs(s);
}, RW = Wt, LW = wi, FW = gc;
function BW(e) {
  return function(t, r, n) {
    var a = Object(t);
    if (!LW(t)) {
      var i = RW(r);
      t = FW(t), r = function(c) {
        return i(a[c], c, a);
      };
    }
    var o = e(t, r, n);
    return o > -1 ? a[i ? t[o] : o] : void 0;
  };
}
var zW = BW, WW = Cb;
function UW(e) {
  var t = WW(e), r = t % 1;
  return t === t ? r ? t - r : t : 0;
}
var VW = UW, qW = Ry, HW = Wt, GW = VW, YW = Math.max;
function KW(e, t, r) {
  var n = e == null ? 0 : e.length;
  if (!n)
    return -1;
  var a = r == null ? 0 : GW(r);
  return a < 0 && (a = YW(n + a, 0)), qW(e, HW(t), a);
}
var XW = KW, ZW = zW, JW = XW, QW = ZW(JW), e4 = QW;
const t4 = /* @__PURE__ */ Pe(e4);
var r4 = FS(function(e) {
  return {
    x: e.left,
    y: e.top,
    width: e.width,
    height: e.height
  };
}, function(e) {
  return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("");
});
function Ko(e) {
  "@babel/helpers - typeof";
  return Ko = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ko(e);
}
var Af = /* @__PURE__ */ nr(void 0), Ef = /* @__PURE__ */ nr(void 0), zb = /* @__PURE__ */ nr(void 0), Wb = /* @__PURE__ */ nr({}), Ub = /* @__PURE__ */ nr(void 0), Vb = /* @__PURE__ */ nr(0), qb = /* @__PURE__ */ nr(0), Bv = function(t) {
  var r = t.state, n = r.xAxisMap, a = r.yAxisMap, i = r.offset, o = t.clipPathId, c = t.children, s = t.width, l = t.height, f = r4(i);
  return /* @__PURE__ */ T.createElement(Af.Provider, {
    value: n
  }, /* @__PURE__ */ T.createElement(Ef.Provider, {
    value: a
  }, /* @__PURE__ */ T.createElement(Wb.Provider, {
    value: i
  }, /* @__PURE__ */ T.createElement(zb.Provider, {
    value: f
  }, /* @__PURE__ */ T.createElement(Ub.Provider, {
    value: o
  }, /* @__PURE__ */ T.createElement(Vb.Provider, {
    value: l
  }, /* @__PURE__ */ T.createElement(qb.Provider, {
    value: s
  }, c)))))));
}, n4 = function() {
  return At(Ub);
};
function Hb(e) {
  var t = Object.keys(e);
  return t.length === 0 ? "There are no available ids." : "Available ids are: ".concat(t, ".");
}
var Gb = function(t) {
  var r = At(Af);
  r == null && (process.env.NODE_ENV !== "production" ? at(!1, "Could not find Recharts context; are you sure this is rendered inside a Recharts wrapper component?") : at());
  var n = r[t];
  return n == null && (process.env.NODE_ENV !== "production" ? at(!1, 'Could not find xAxis by id "'.concat(t, '" [').concat(Ko(t), "]. ").concat(Hb(r))) : at()), n;
}, a4 = function() {
  var t = At(Af);
  return dr(t);
}, i4 = function() {
  var t = At(Ef), r = t4(t, function(n) {
    return kb(n.domain, Number.isFinite);
  });
  return r || dr(t);
}, Yb = function(t) {
  var r = At(Ef);
  r == null && (process.env.NODE_ENV !== "production" ? at(!1, "Could not find Recharts context; are you sure this is rendered inside a Recharts wrapper component?") : at());
  var n = r[t];
  return n == null && (process.env.NODE_ENV !== "production" ? at(!1, 'Could not find yAxis by id "'.concat(t, '" [').concat(Ko(t), "]. ").concat(Hb(r))) : at()), n;
}, o4 = function() {
  var t = At(zb);
  return t;
}, c4 = function() {
  return At(Wb);
}, Tf = function() {
  return At(qb);
}, $f = function() {
  return At(Vb);
};
function Bn(e) {
  "@babel/helpers - typeof";
  return Bn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Bn(e);
}
function s4(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function l4(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Xb(n.key), n);
  }
}
function u4(e, t, r) {
  return t && l4(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function f4(e, t, r) {
  return t = Xo(t), d4(e, Kb() ? Reflect.construct(t, r || [], Xo(e).constructor) : t.apply(e, r));
}
function d4(e, t) {
  if (t && (Bn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return h4(e);
}
function h4(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Kb() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Kb = function() {
    return !!e;
  })();
}
function Xo(e) {
  return Xo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Xo(e);
}
function p4(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && eu(e, t);
}
function eu(e, t) {
  return eu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, eu(e, t);
}
function zv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Wv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zv(Object(r), !0).forEach(function(n) {
      Cf(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Cf(e, t, r) {
  return t = Xb(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Xb(e) {
  var t = v4(e, "string");
  return Bn(t) == "symbol" ? t : t + "";
}
function v4(e, t) {
  if (Bn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Bn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function m4(e, t) {
  return w4(e) || b4(e, t) || g4(e, t) || y4();
}
function y4() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function g4(e, t) {
  if (e) {
    if (typeof e == "string") return Uv(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Uv(e, t);
  }
}
function Uv(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function b4(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, c = [], s = !0, l = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (c.push(n.value), c.length !== t); s = !0) ;
    } catch (f) {
      l = !0, a = f;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw a;
      }
    }
    return c;
  }
}
function w4(e) {
  if (Array.isArray(e)) return e;
}
function tu() {
  return tu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, tu.apply(this, arguments);
}
var x4 = function(t, r) {
  var n;
  return /* @__PURE__ */ T.isValidElement(t) ? n = /* @__PURE__ */ T.cloneElement(t, r) : ie(t) ? n = t(r) : n = /* @__PURE__ */ T.createElement("line", tu({}, r, {
    className: "recharts-reference-line-line"
  })), n;
}, O4 = function(t, r, n, a, i, o, c, s, l) {
  var f = i.x, u = i.y, d = i.width, h = i.height;
  if (n) {
    var m = l.y, v = t.y.apply(m, {
      position: o
    });
    if (Dt(l, "discard") && !t.y.isInRange(v))
      return null;
    var p = [{
      x: f + d,
      y: v
    }, {
      x: f,
      y: v
    }];
    return s === "left" ? p.reverse() : p;
  }
  if (r) {
    var b = l.x, g = t.x.apply(b, {
      position: o
    });
    if (Dt(l, "discard") && !t.x.isInRange(g))
      return null;
    var O = [{
      x: g,
      y: u + h
    }, {
      x: g,
      y: u
    }];
    return c === "top" ? O.reverse() : O;
  }
  if (a) {
    var S = l.segment, y = S.map(function(w) {
      return t.apply(w, {
        position: o
      });
    });
    return Dt(l, "discard") && qz(y, function(w) {
      return !t.isInRange(w);
    }) ? null : y;
  }
  return null;
};
function S4(e) {
  var t = e.x, r = e.y, n = e.segment, a = e.xAxisId, i = e.yAxisId, o = e.shape, c = e.className, s = e.alwaysShow, l = n4(), f = Gb(a), u = Yb(i), d = o4();
  if (!l || !d)
    return null;
  _t(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var h = _f({
    x: f.scale,
    y: u.scale
  }), m = Ue(t), v = Ue(r), p = n && n.length === 2, b = O4(h, m, v, p, d, e.position, f.orientation, u.orientation, e);
  if (!b)
    return null;
  var g = m4(b, 2), O = g[0], S = O.x, y = O.y, w = g[1], P = w.x, _ = w.y, $ = Dt(e, "hidden") ? "url(#".concat(l, ")") : void 0, E = Wv(Wv({
    clipPath: $
  }, te(e, !0)), {}, {
    x1: S,
    y1: y,
    x2: P,
    y2: _
  });
  return /* @__PURE__ */ T.createElement(pe, {
    className: le("recharts-reference-line", c)
  }, x4(o, E), He.renderCallByParent(e, kW({
    x1: S,
    y1: y,
    x2: P,
    y2: _
  })));
}
var Mf = /* @__PURE__ */ function(e) {
  function t() {
    return s4(this, t), f4(this, t, arguments);
  }
  return p4(t, e), u4(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ T.createElement(S4, this.props);
    }
  }]);
}(T.Component);
Cf(Mf, "displayName", "ReferenceLine");
Cf(Mf, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  fill: "none",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1,
  position: "middle"
});
function ru() {
  return ru = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ru.apply(this, arguments);
}
function zn(e) {
  "@babel/helpers - typeof";
  return zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, zn(e);
}
function Vv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Vv(Object(r), !0).forEach(function(n) {
      Bc(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Vv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function P4(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _4(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Jb(n.key), n);
  }
}
function A4(e, t, r) {
  return t && _4(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function E4(e, t, r) {
  return t = Zo(t), T4(e, Zb() ? Reflect.construct(t, r || [], Zo(e).constructor) : t.apply(e, r));
}
function T4(e, t) {
  if (t && (zn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return $4(e);
}
function $4(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Zb() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Zb = function() {
    return !!e;
  })();
}
function Zo(e) {
  return Zo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Zo(e);
}
function C4(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && nu(e, t);
}
function nu(e, t) {
  return nu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, nu(e, t);
}
function Bc(e, t, r) {
  return t = Jb(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Jb(e) {
  var t = M4(e, "string");
  return zn(t) == "symbol" ? t : t + "";
}
function M4(e, t) {
  if (zn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (zn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var j4 = function(t) {
  var r = t.x, n = t.y, a = t.xAxis, i = t.yAxis, o = _f({
    x: a.scale,
    y: i.scale
  }), c = o.apply({
    x: r,
    y: n
  }, {
    bandAware: !0
  });
  return Dt(t, "discard") && !o.isInRange(c) ? null : c;
}, zc = /* @__PURE__ */ function(e) {
  function t() {
    return P4(this, t), E4(this, t, arguments);
  }
  return C4(t, e), A4(t, [{
    key: "render",
    value: function() {
      var n = this.props, a = n.x, i = n.y, o = n.r, c = n.alwaysShow, s = n.clipPathId, l = Ue(a), f = Ue(i);
      if (_t(c === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !l || !f)
        return null;
      var u = j4(this.props);
      if (!u)
        return null;
      var d = u.x, h = u.y, m = this.props, v = m.shape, p = m.className, b = Dt(this.props, "hidden") ? "url(#".concat(s, ")") : void 0, g = qv(qv({
        clipPath: b
      }, te(this.props, !0)), {}, {
        cx: d,
        cy: h
      });
      return /* @__PURE__ */ T.createElement(pe, {
        className: le("recharts-reference-dot", p)
      }, t.renderDot(v, g), He.renderCallByParent(this.props, {
        x: d - o,
        y: h - o,
        width: 2 * o,
        height: 2 * o
      }));
    }
  }]);
}(T.Component);
Bc(zc, "displayName", "ReferenceDot");
Bc(zc, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#fff",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1
});
Bc(zc, "renderDot", function(e, t) {
  var r;
  return /* @__PURE__ */ T.isValidElement(e) ? r = /* @__PURE__ */ T.cloneElement(e, t) : ie(e) ? r = e(t) : r = /* @__PURE__ */ T.createElement(jc, ru({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), r;
});
function au() {
  return au = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, au.apply(this, arguments);
}
function Wn(e) {
  "@babel/helpers - typeof";
  return Wn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Wn(e);
}
function Hv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Gv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Hv(Object(r), !0).forEach(function(n) {
      Wc(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function N4(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function k4(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, e0(n.key), n);
  }
}
function I4(e, t, r) {
  return t && k4(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function D4(e, t, r) {
  return t = Jo(t), R4(e, Qb() ? Reflect.construct(t, r || [], Jo(e).constructor) : t.apply(e, r));
}
function R4(e, t) {
  if (t && (Wn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return L4(e);
}
function L4(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Qb() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Qb = function() {
    return !!e;
  })();
}
function Jo(e) {
  return Jo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Jo(e);
}
function F4(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && iu(e, t);
}
function iu(e, t) {
  return iu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, iu(e, t);
}
function Wc(e, t, r) {
  return t = e0(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function e0(e) {
  var t = B4(e, "string");
  return Wn(t) == "symbol" ? t : t + "";
}
function B4(e, t) {
  if (Wn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Wn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var z4 = function(t, r, n, a, i) {
  var o = i.x1, c = i.x2, s = i.y1, l = i.y2, f = i.xAxis, u = i.yAxis;
  if (!f || !u) return null;
  var d = _f({
    x: f.scale,
    y: u.scale
  }), h = {
    x: t ? d.x.apply(o, {
      position: "start"
    }) : d.x.rangeMin,
    y: n ? d.y.apply(s, {
      position: "start"
    }) : d.y.rangeMin
  }, m = {
    x: r ? d.x.apply(c, {
      position: "end"
    }) : d.x.rangeMax,
    y: a ? d.y.apply(l, {
      position: "end"
    }) : d.y.rangeMax
  };
  return Dt(i, "discard") && (!d.isInRange(h) || !d.isInRange(m)) ? null : Fb(h, m);
}, Uc = /* @__PURE__ */ function(e) {
  function t() {
    return N4(this, t), D4(this, t, arguments);
  }
  return F4(t, e), I4(t, [{
    key: "render",
    value: function() {
      var n = this.props, a = n.x1, i = n.x2, o = n.y1, c = n.y2, s = n.className, l = n.alwaysShow, f = n.clipPathId;
      _t(l === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      var u = Ue(a), d = Ue(i), h = Ue(o), m = Ue(c), v = this.props.shape;
      if (!u && !d && !h && !m && !v)
        return null;
      var p = z4(u, d, h, m, this.props);
      if (!p && !v)
        return null;
      var b = Dt(this.props, "hidden") ? "url(#".concat(f, ")") : void 0;
      return /* @__PURE__ */ T.createElement(pe, {
        className: le("recharts-reference-area", s)
      }, t.renderRect(v, Gv(Gv({
        clipPath: b
      }, te(this.props, !0)), p)), He.renderCallByParent(this.props, p));
    }
  }]);
}(T.Component);
Wc(Uc, "displayName", "ReferenceArea");
Wc(Uc, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#ccc",
  fillOpacity: 0.5,
  stroke: "none",
  strokeWidth: 1
});
Wc(Uc, "renderRect", function(e, t) {
  var r;
  return /* @__PURE__ */ T.isValidElement(e) ? r = /* @__PURE__ */ T.cloneElement(e, t) : ie(e) ? r = e(t) : r = /* @__PURE__ */ T.createElement(Pf, au({}, t, {
    className: "recharts-reference-area-rect"
  })), r;
});
function t0(e, t, r) {
  if (t < 1)
    return [];
  if (t === 1 && r === void 0)
    return e;
  for (var n = [], a = 0; a < e.length; a += t)
    n.push(e[a]);
  return n;
}
function W4(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return DW(n, r);
}
function U4(e, t, r) {
  var n = r === "width", a = e.x, i = e.y, o = e.width, c = e.height;
  return t === 1 ? {
    start: n ? a : i,
    end: n ? a + o : i + c
  } : {
    start: n ? a + o : i + c,
    end: n ? a : i
  };
}
function Qo(e, t, r, n, a) {
  if (e * t < e * n || e * t > e * a)
    return !1;
  var i = r();
  return e * (t - e * i / 2 - n) >= 0 && e * (t + e * i / 2 - a) <= 0;
}
function V4(e, t) {
  return t0(e, t + 1);
}
function q4(e, t, r, n, a) {
  for (var i = (n || []).slice(), o = t.start, c = t.end, s = 0, l = 1, f = o, u = function() {
    var m = n == null ? void 0 : n[s];
    if (m === void 0)
      return {
        v: t0(n, l)
      };
    var v = s, p, b = function() {
      return p === void 0 && (p = r(m, v)), p;
    }, g = m.coordinate, O = s === 0 || Qo(e, g, b, f, c);
    O || (s = 0, f = o, l += 1), O && (f = g + e * (b() / 2 + a), s += l);
  }, d; l <= i.length; )
    if (d = u(), d) return d.v;
  return [];
}
function fi(e) {
  "@babel/helpers - typeof";
  return fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fi(e);
}
function Yv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Xe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Yv(Object(r), !0).forEach(function(n) {
      H4(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Yv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function H4(e, t, r) {
  return t = G4(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function G4(e) {
  var t = Y4(e, "string");
  return fi(t) == "symbol" ? t : t + "";
}
function Y4(e, t) {
  if (fi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (fi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function K4(e, t, r, n, a) {
  for (var i = (n || []).slice(), o = i.length, c = t.start, s = t.end, l = function(d) {
    var h = i[d], m, v = function() {
      return m === void 0 && (m = r(h, d)), m;
    };
    if (d === o - 1) {
      var p = e * (h.coordinate + e * v() / 2 - s);
      i[d] = h = Xe(Xe({}, h), {}, {
        tickCoord: p > 0 ? h.coordinate - p * e : h.coordinate
      });
    } else
      i[d] = h = Xe(Xe({}, h), {}, {
        tickCoord: h.coordinate
      });
    var b = Qo(e, h.tickCoord, v, c, s);
    b && (s = h.tickCoord - e * (v() / 2 + a), i[d] = Xe(Xe({}, h), {}, {
      isShow: !0
    }));
  }, f = o - 1; f >= 0; f--)
    l(f);
  return i;
}
function X4(e, t, r, n, a, i) {
  var o = (n || []).slice(), c = o.length, s = t.start, l = t.end;
  if (i) {
    var f = n[c - 1], u = r(f, c - 1), d = e * (f.coordinate + e * u / 2 - l);
    o[c - 1] = f = Xe(Xe({}, f), {}, {
      tickCoord: d > 0 ? f.coordinate - d * e : f.coordinate
    });
    var h = Qo(e, f.tickCoord, function() {
      return u;
    }, s, l);
    h && (l = f.tickCoord - e * (u / 2 + a), o[c - 1] = Xe(Xe({}, f), {}, {
      isShow: !0
    }));
  }
  for (var m = i ? c - 1 : c, v = function(g) {
    var O = o[g], S, y = function() {
      return S === void 0 && (S = r(O, g)), S;
    };
    if (g === 0) {
      var w = e * (O.coordinate - e * y() / 2 - s);
      o[g] = O = Xe(Xe({}, O), {}, {
        tickCoord: w < 0 ? O.coordinate - w * e : O.coordinate
      });
    } else
      o[g] = O = Xe(Xe({}, O), {}, {
        tickCoord: O.coordinate
      });
    var P = Qo(e, O.tickCoord, y, s, l);
    P && (s = O.tickCoord + e * (y() / 2 + a), o[g] = Xe(Xe({}, O), {}, {
      isShow: !0
    }));
  }, p = 0; p < m; p++)
    v(p);
  return o;
}
function jf(e, t, r) {
  var n = e.tick, a = e.ticks, i = e.viewBox, o = e.minTickGap, c = e.orientation, s = e.interval, l = e.tickFormatter, f = e.unit, u = e.angle;
  if (!a || !a.length || !n)
    return [];
  if (H(s) || Jr.isSsr)
    return V4(a, typeof s == "number" && H(s) ? s : 0);
  var d = [], h = c === "top" || c === "bottom" ? "width" : "height", m = f && h === "width" ? Pa(f, {
    fontSize: t,
    letterSpacing: r
  }) : {
    width: 0,
    height: 0
  }, v = function(O, S) {
    var y = ie(l) ? l(O.value, S) : O.value;
    return h === "width" ? W4(Pa(y, {
      fontSize: t,
      letterSpacing: r
    }), m, u) : Pa(y, {
      fontSize: t,
      letterSpacing: r
    })[h];
  }, p = a.length >= 2 ? Je(a[1].coordinate - a[0].coordinate) : 1, b = U4(i, p, h);
  return s === "equidistantPreserveStart" ? q4(p, b, v, a, o) : (s === "preserveStart" || s === "preserveStartEnd" ? d = X4(p, b, v, a, o, s === "preserveStartEnd") : d = K4(p, b, v, a, o), d.filter(function(g) {
    return g.isShow;
  }));
}
var Z4 = ["viewBox"], J4 = ["viewBox"], Q4 = ["ticks"];
function Un(e) {
  "@babel/helpers - typeof";
  return Un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Un(e);
}
function hn() {
  return hn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, hn.apply(this, arguments);
}
function Kv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Fe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Kv(Object(r), !0).forEach(function(n) {
      Nf(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Kv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ks(e, t) {
  if (e == null) return {};
  var r = e5(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function e5(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function t5(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Xv(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n0(n.key), n);
  }
}
function r5(e, t, r) {
  return t && Xv(e.prototype, t), r && Xv(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function n5(e, t, r) {
  return t = ec(t), a5(e, r0() ? Reflect.construct(t, r || [], ec(e).constructor) : t.apply(e, r));
}
function a5(e, t) {
  if (t && (Un(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return i5(e);
}
function i5(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function r0() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (r0 = function() {
    return !!e;
  })();
}
function ec(e) {
  return ec = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ec(e);
}
function o5(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ou(e, t);
}
function ou(e, t) {
  return ou = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ou(e, t);
}
function Nf(e, t, r) {
  return t = n0(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function n0(e) {
  var t = c5(e, "string");
  return Un(t) == "symbol" ? t : t + "";
}
function c5(e, t) {
  if (Un(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Un(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var ua = /* @__PURE__ */ function(e) {
  function t(r) {
    var n;
    return t5(this, t), n = n5(this, t, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n;
  }
  return o5(t, e), r5(t, [{
    key: "shouldComponentUpdate",
    value: function(n, a) {
      var i = n.viewBox, o = ks(n, Z4), c = this.props, s = c.viewBox, l = ks(c, J4);
      return !vn(i, s) || !vn(o, l) || !vn(a, this.state);
    }
  }, {
    key: "componentDidMount",
    value: function() {
      var n = this.layerReference;
      if (n) {
        var a = n.getElementsByClassName("recharts-cartesian-axis-tick-value")[0];
        a && this.setState({
          fontSize: window.getComputedStyle(a).fontSize,
          letterSpacing: window.getComputedStyle(a).letterSpacing
        });
      }
    }
    /**
     * Calculate the coordinates of endpoints in ticks
     * @param  {Object} data The data of a simple tick
     * @return {Object} (x1, y1): The coordinate of endpoint close to tick text
     *  (x2, y2): The coordinate of endpoint close to axis
     */
  }, {
    key: "getTickLineCoord",
    value: function(n) {
      var a = this.props, i = a.x, o = a.y, c = a.width, s = a.height, l = a.orientation, f = a.tickSize, u = a.mirror, d = a.tickMargin, h, m, v, p, b, g, O = u ? -1 : 1, S = n.tickSize || f, y = H(n.tickCoord) ? n.tickCoord : n.coordinate;
      switch (l) {
        case "top":
          h = m = n.coordinate, p = o + +!u * s, v = p - O * S, g = v - O * d, b = y;
          break;
        case "left":
          v = p = n.coordinate, m = i + +!u * c, h = m - O * S, b = h - O * d, g = y;
          break;
        case "right":
          v = p = n.coordinate, m = i + +u * c, h = m + O * S, b = h + O * d, g = y;
          break;
        default:
          h = m = n.coordinate, p = o + +u * s, v = p + O * S, g = v + O * d, b = y;
          break;
      }
      return {
        line: {
          x1: h,
          y1: v,
          x2: m,
          y2: p
        },
        tick: {
          x: b,
          y: g
        }
      };
    }
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var n = this.props, a = n.orientation, i = n.mirror, o;
      switch (a) {
        case "left":
          o = i ? "start" : "end";
          break;
        case "right":
          o = i ? "end" : "start";
          break;
        default:
          o = "middle";
          break;
      }
      return o;
    }
  }, {
    key: "getTickVerticalAnchor",
    value: function() {
      var n = this.props, a = n.orientation, i = n.mirror, o = "end";
      switch (a) {
        case "left":
        case "right":
          o = "middle";
          break;
        case "top":
          o = i ? "start" : "end";
          break;
        default:
          o = i ? "end" : "start";
          break;
      }
      return o;
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, a = n.x, i = n.y, o = n.width, c = n.height, s = n.orientation, l = n.mirror, f = n.axisLine, u = Fe(Fe(Fe({}, te(this.props, !1)), te(f, !1)), {}, {
        fill: "none"
      });
      if (s === "top" || s === "bottom") {
        var d = +(s === "top" && !l || s === "bottom" && l);
        u = Fe(Fe({}, u), {}, {
          x1: a,
          y1: i + d * c,
          x2: a + o,
          y2: i + d * c
        });
      } else {
        var h = +(s === "left" && !l || s === "right" && l);
        u = Fe(Fe({}, u), {}, {
          x1: a + h * o,
          y1: i,
          x2: a + h * o,
          y2: i + c
        });
      }
      return /* @__PURE__ */ T.createElement("line", hn({}, u, {
        className: le("recharts-cartesian-axis-line", lt(f, "className"))
      }));
    }
  }, {
    key: "renderTicks",
    value: (
      /**
       * render the ticks
       * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
       * @param {string} fontSize Fontsize to consider for tick spacing
       * @param {string} letterSpacing Letterspacing to consider for tick spacing
       * @return {ReactComponent} renderedTicks
       */
      function(n, a, i) {
        var o = this, c = this.props, s = c.tickLine, l = c.stroke, f = c.tick, u = c.tickFormatter, d = c.unit, h = jf(Fe(Fe({}, this.props), {}, {
          ticks: n
        }), a, i), m = this.getTickTextAnchor(), v = this.getTickVerticalAnchor(), p = te(this.props, !1), b = te(f, !1), g = Fe(Fe({}, p), {}, {
          fill: "none"
        }, te(s, !1)), O = h.map(function(S, y) {
          var w = o.getTickLineCoord(S), P = w.line, _ = w.tick, $ = Fe(Fe(Fe(Fe({
            textAnchor: m,
            verticalAnchor: v
          }, p), {}, {
            stroke: "none",
            fill: l
          }, b), _), {}, {
            index: y,
            payload: S,
            visibleTicksCount: h.length,
            tickFormatter: u
          });
          return /* @__PURE__ */ T.createElement(pe, hn({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(S.value, "-").concat(S.coordinate, "-").concat(S.tickCoord)
          }, qr(o.props, S, y)), s && /* @__PURE__ */ T.createElement("line", hn({}, g, P, {
            className: le("recharts-cartesian-axis-tick-line", lt(s, "className"))
          })), f && t.renderTickItem(f, $, "".concat(ie(u) ? u(S.value, y) : S.value).concat(d || "")));
        });
        return /* @__PURE__ */ T.createElement("g", {
          className: "recharts-cartesian-axis-ticks"
        }, O);
      }
    )
  }, {
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.axisLine, o = a.width, c = a.height, s = a.ticksGenerator, l = a.className, f = a.hide;
      if (f)
        return null;
      var u = this.props, d = u.ticks, h = ks(u, Q4), m = d;
      return ie(s) && (m = d && d.length > 0 ? s(this.props) : s(h)), o <= 0 || c <= 0 || !m || !m.length ? null : /* @__PURE__ */ T.createElement(pe, {
        className: le("recharts-cartesian-axis", l),
        ref: function(p) {
          n.layerReference = p;
        }
      }, i && this.renderAxisLine(), this.renderTicks(m, this.state.fontSize, this.state.letterSpacing), He.renderCallByParent(this.props));
    }
  }], [{
    key: "renderTickItem",
    value: function(n, a, i) {
      var o, c = le(a.className, "recharts-cartesian-axis-tick-value");
      return /* @__PURE__ */ T.isValidElement(n) ? o = /* @__PURE__ */ T.cloneElement(n, Fe(Fe({}, a), {}, {
        className: c
      })) : ie(n) ? o = n(Fe(Fe({}, a), {}, {
        className: c
      })) : o = /* @__PURE__ */ T.createElement(Hr, hn({}, a, {
        className: "recharts-cartesian-axis-tick-value"
      }), i), o;
    }
  }]);
}(gm);
Nf(ua, "displayName", "CartesianAxis");
Nf(ua, "defaultProps", {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: "bottom",
  // The ticks
  ticks: [],
  stroke: "#666",
  tickLine: !0,
  axisLine: !0,
  tick: !0,
  mirror: !1,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd"
});
var s5 = ["x1", "y1", "x2", "y2", "key"], l5 = ["offset"];
function Yr(e) {
  "@babel/helpers - typeof";
  return Yr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Yr(e);
}
function Zv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ze(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zv(Object(r), !0).forEach(function(n) {
      u5(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Zv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function u5(e, t, r) {
  return t = f5(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function f5(e) {
  var t = d5(e, "string");
  return Yr(t) == "symbol" ? t : t + "";
}
function d5(e, t) {
  if (Yr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Yr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Fr() {
  return Fr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Fr.apply(this, arguments);
}
function Jv(e, t) {
  if (e == null) return {};
  var r = h5(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function h5(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var p5 = function(t) {
  var r = t.fill;
  if (!r || r === "none")
    return null;
  var n = t.fillOpacity, a = t.x, i = t.y, o = t.width, c = t.height, s = t.ry;
  return /* @__PURE__ */ T.createElement("rect", {
    x: a,
    y: i,
    ry: s,
    width: o,
    height: c,
    stroke: "none",
    fill: r,
    fillOpacity: n,
    className: "recharts-cartesian-grid-bg"
  });
};
function a0(e, t) {
  var r;
  if (/* @__PURE__ */ T.isValidElement(e))
    r = /* @__PURE__ */ T.cloneElement(e, t);
  else if (ie(e))
    r = e(t);
  else {
    var n = t.x1, a = t.y1, i = t.x2, o = t.y2, c = t.key, s = Jv(t, s5), l = te(s, !1);
    l.offset;
    var f = Jv(l, l5);
    r = /* @__PURE__ */ T.createElement("line", Fr({}, f, {
      x1: n,
      y1: a,
      x2: i,
      y2: o,
      fill: "none",
      key: c
    }));
  }
  return r;
}
function v5(e) {
  var t = e.x, r = e.width, n = e.horizontal, a = n === void 0 ? !0 : n, i = e.horizontalPoints;
  if (!a || !i || !i.length)
    return null;
  var o = i.map(function(c, s) {
    var l = Ze(Ze({}, e), {}, {
      x1: t,
      y1: c,
      x2: t + r,
      y2: c,
      key: "line-".concat(s),
      index: s
    });
    return a0(a, l);
  });
  return /* @__PURE__ */ T.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, o);
}
function m5(e) {
  var t = e.y, r = e.height, n = e.vertical, a = n === void 0 ? !0 : n, i = e.verticalPoints;
  if (!a || !i || !i.length)
    return null;
  var o = i.map(function(c, s) {
    var l = Ze(Ze({}, e), {}, {
      x1: c,
      y1: t,
      x2: c,
      y2: t + r,
      key: "line-".concat(s),
      index: s
    });
    return a0(a, l);
  });
  return /* @__PURE__ */ T.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, o);
}
function y5(e) {
  var t = e.horizontalFill, r = e.fillOpacity, n = e.x, a = e.y, i = e.width, o = e.height, c = e.horizontalPoints, s = e.horizontal, l = s === void 0 ? !0 : s;
  if (!l || !t || !t.length)
    return null;
  var f = c.map(function(d) {
    return Math.round(d + a - a);
  }).sort(function(d, h) {
    return d - h;
  });
  a !== f[0] && f.unshift(0);
  var u = f.map(function(d, h) {
    var m = !f[h + 1], v = m ? a + o - d : f[h + 1] - d;
    if (v <= 0)
      return null;
    var p = h % t.length;
    return /* @__PURE__ */ T.createElement("rect", {
      key: "react-".concat(h),
      y: d,
      x: n,
      height: v,
      width: i,
      stroke: "none",
      fill: t[p],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ T.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, u);
}
function g5(e) {
  var t = e.vertical, r = t === void 0 ? !0 : t, n = e.verticalFill, a = e.fillOpacity, i = e.x, o = e.y, c = e.width, s = e.height, l = e.verticalPoints;
  if (!r || !n || !n.length)
    return null;
  var f = l.map(function(d) {
    return Math.round(d + i - i);
  }).sort(function(d, h) {
    return d - h;
  });
  i !== f[0] && f.unshift(0);
  var u = f.map(function(d, h) {
    var m = !f[h + 1], v = m ? i + c - d : f[h + 1] - d;
    if (v <= 0)
      return null;
    var p = h % n.length;
    return /* @__PURE__ */ T.createElement("rect", {
      key: "react-".concat(h),
      x: d,
      y: o,
      width: v,
      height: s,
      stroke: "none",
      fill: n[p],
      fillOpacity: a,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ T.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, u);
}
var b5 = function(t, r) {
  var n = t.xAxis, a = t.width, i = t.height, o = t.offset;
  return tb(jf(Ze(Ze(Ze({}, ua.defaultProps), n), {}, {
    ticks: Yt(n, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: a,
      height: i
    }
  })), o.left, o.left + o.width, r);
}, w5 = function(t, r) {
  var n = t.yAxis, a = t.width, i = t.height, o = t.offset;
  return tb(jf(Ze(Ze(Ze({}, ua.defaultProps), n), {}, {
    ticks: Yt(n, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: a,
      height: i
    }
  })), o.top, o.top + o.height, r);
}, sn = {
  horizontal: !0,
  vertical: !0,
  stroke: "#ccc",
  fill: "none",
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: []
};
function i0(e) {
  var t, r, n, a, i, o, c = Tf(), s = $f(), l = c4(), f = Ze(Ze({}, e), {}, {
    stroke: (t = e.stroke) !== null && t !== void 0 ? t : sn.stroke,
    fill: (r = e.fill) !== null && r !== void 0 ? r : sn.fill,
    horizontal: (n = e.horizontal) !== null && n !== void 0 ? n : sn.horizontal,
    horizontalFill: (a = e.horizontalFill) !== null && a !== void 0 ? a : sn.horizontalFill,
    vertical: (i = e.vertical) !== null && i !== void 0 ? i : sn.vertical,
    verticalFill: (o = e.verticalFill) !== null && o !== void 0 ? o : sn.verticalFill,
    x: H(e.x) ? e.x : l.left,
    y: H(e.y) ? e.y : l.top,
    width: H(e.width) ? e.width : l.width,
    height: H(e.height) ? e.height : l.height
  }), u = f.x, d = f.y, h = f.width, m = f.height, v = f.syncWithTicks, p = f.horizontalValues, b = f.verticalValues, g = a4(), O = i4();
  if (!H(h) || h <= 0 || !H(m) || m <= 0 || !H(u) || u !== +u || !H(d) || d !== +d)
    return null;
  var S = f.verticalCoordinatesGenerator || b5, y = f.horizontalCoordinatesGenerator || w5, w = f.horizontalPoints, P = f.verticalPoints;
  if ((!w || !w.length) && ie(y)) {
    var _ = p && p.length, $ = y({
      yAxis: O ? Ze(Ze({}, O), {}, {
        ticks: _ ? p : O.ticks
      }) : void 0,
      width: c,
      height: s,
      offset: l
    }, _ ? !0 : v);
    _t(Array.isArray($), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(Yr($), "]")), Array.isArray($) && (w = $);
  }
  if ((!P || !P.length) && ie(S)) {
    var E = b && b.length, j = S({
      xAxis: g ? Ze(Ze({}, g), {}, {
        ticks: E ? b : g.ticks
      }) : void 0,
      width: c,
      height: s,
      offset: l
    }, E ? !0 : v);
    _t(Array.isArray(j), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(Yr(j), "]")), Array.isArray(j) && (P = j);
  }
  return /* @__PURE__ */ T.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ T.createElement(p5, {
    fill: f.fill,
    fillOpacity: f.fillOpacity,
    x: f.x,
    y: f.y,
    width: f.width,
    height: f.height,
    ry: f.ry
  }), /* @__PURE__ */ T.createElement(v5, Fr({}, f, {
    offset: l,
    horizontalPoints: w,
    xAxis: g,
    yAxis: O
  })), /* @__PURE__ */ T.createElement(m5, Fr({}, f, {
    offset: l,
    verticalPoints: P,
    xAxis: g,
    yAxis: O
  })), /* @__PURE__ */ T.createElement(y5, Fr({}, f, {
    horizontalPoints: w
  })), /* @__PURE__ */ T.createElement(g5, Fr({}, f, {
    verticalPoints: P
  })));
}
i0.displayName = "CartesianGrid";
var x5 = ["layout", "type", "stroke", "connectNulls", "isRange", "ref"], O5 = ["key"], o0;
function Vn(e) {
  "@babel/helpers - typeof";
  return Vn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Vn(e);
}
function c0(e, t) {
  if (e == null) return {};
  var r = S5(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function S5(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Br() {
  return Br = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Br.apply(this, arguments);
}
function Qv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ur(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qv(Object(r), !0).forEach(function(n) {
      kt(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Qv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function P5(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function em(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, l0(n.key), n);
  }
}
function _5(e, t, r) {
  return t && em(e.prototype, t), r && em(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function A5(e, t, r) {
  return t = tc(t), E5(e, s0() ? Reflect.construct(t, r || [], tc(e).constructor) : t.apply(e, r));
}
function E5(e, t) {
  if (t && (Vn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return T5(e);
}
function T5(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function s0() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (s0 = function() {
    return !!e;
  })();
}
function tc(e) {
  return tc = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, tc(e);
}
function $5(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && cu(e, t);
}
function cu(e, t) {
  return cu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, cu(e, t);
}
function kt(e, t, r) {
  return t = l0(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function l0(e) {
  var t = C5(e, "string");
  return Vn(t) == "symbol" ? t : t + "";
}
function C5(e, t) {
  if (Vn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Vn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Ar = /* @__PURE__ */ function(e) {
  function t() {
    var r;
    P5(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = A5(this, t, [].concat(a)), kt(r, "state", {
      isAnimationFinished: !0
    }), kt(r, "id", na("recharts-area-")), kt(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), ie(o) && o();
    }), kt(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), ie(o) && o();
    }), r;
  }
  return $5(t, e), _5(t, [{
    key: "renderDots",
    value: function(n, a, i) {
      var o = this.props.isAnimationActive, c = this.state.isAnimationFinished;
      if (o && !c)
        return null;
      var s = this.props, l = s.dot, f = s.points, u = s.dataKey, d = te(this.props, !1), h = te(l, !0), m = f.map(function(p, b) {
        var g = ur(ur(ur({
          key: "dot-".concat(b),
          r: 3
        }, d), h), {}, {
          index: b,
          cx: p.x,
          cy: p.y,
          dataKey: u,
          value: p.value,
          payload: p.payload,
          points: f
        });
        return t.renderDotItem(l, g);
      }), v = {
        clipPath: n ? "url(#clipPath-".concat(a ? "" : "dots-").concat(i, ")") : null
      };
      return /* @__PURE__ */ T.createElement(pe, Br({
        className: "recharts-area-dots"
      }, v), m);
    }
  }, {
    key: "renderHorizontalRect",
    value: function(n) {
      var a = this.props, i = a.baseLine, o = a.points, c = a.strokeWidth, s = o[0].x, l = o[o.length - 1].x, f = n * Math.abs(s - l), u = pr(o.map(function(d) {
        return d.y || 0;
      }));
      return H(i) && typeof i == "number" ? u = Math.max(i, u) : i && Array.isArray(i) && i.length && (u = Math.max(pr(i.map(function(d) {
        return d.y || 0;
      })), u)), H(u) ? /* @__PURE__ */ T.createElement("rect", {
        x: s < l ? s : s - f,
        y: 0,
        width: f,
        height: Math.floor(u + (c ? parseInt("".concat(c), 10) : 1))
      }) : null;
    }
  }, {
    key: "renderVerticalRect",
    value: function(n) {
      var a = this.props, i = a.baseLine, o = a.points, c = a.strokeWidth, s = o[0].y, l = o[o.length - 1].y, f = n * Math.abs(s - l), u = pr(o.map(function(d) {
        return d.x || 0;
      }));
      return H(i) && typeof i == "number" ? u = Math.max(i, u) : i && Array.isArray(i) && i.length && (u = Math.max(pr(i.map(function(d) {
        return d.x || 0;
      })), u)), H(u) ? /* @__PURE__ */ T.createElement("rect", {
        x: 0,
        y: s < l ? s : s - f,
        width: u + (c ? parseInt("".concat(c), 10) : 1),
        height: Math.floor(f)
      }) : null;
    }
  }, {
    key: "renderClipRect",
    value: function(n) {
      var a = this.props.layout;
      return a === "vertical" ? this.renderVerticalRect(n) : this.renderHorizontalRect(n);
    }
  }, {
    key: "renderAreaStatically",
    value: function(n, a, i, o) {
      var c = this.props, s = c.layout, l = c.type, f = c.stroke, u = c.connectNulls, d = c.isRange;
      c.ref;
      var h = c0(c, x5);
      return /* @__PURE__ */ T.createElement(pe, {
        clipPath: i ? "url(#clipPath-".concat(o, ")") : null
      }, /* @__PURE__ */ T.createElement(bn, Br({}, te(h, !0), {
        points: n,
        connectNulls: u,
        type: l,
        baseLine: a,
        layout: s,
        stroke: "none",
        className: "recharts-area-area"
      })), f !== "none" && /* @__PURE__ */ T.createElement(bn, Br({}, te(this.props, !1), {
        className: "recharts-area-curve",
        layout: s,
        type: l,
        connectNulls: u,
        fill: "none",
        points: n
      })), f !== "none" && d && /* @__PURE__ */ T.createElement(bn, Br({}, te(this.props, !1), {
        className: "recharts-area-curve",
        layout: s,
        type: l,
        connectNulls: u,
        fill: "none",
        points: a
      })));
    }
  }, {
    key: "renderAreaWithAnimation",
    value: function(n, a) {
      var i = this, o = this.props, c = o.points, s = o.baseLine, l = o.isAnimationActive, f = o.animationBegin, u = o.animationDuration, d = o.animationEasing, h = o.animationId, m = this.state, v = m.prevPoints, p = m.prevBaseLine;
      return /* @__PURE__ */ T.createElement(Lt, {
        begin: f,
        duration: u,
        isActive: l,
        easing: d,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "area-".concat(h),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(b) {
        var g = b.t;
        if (v) {
          var O = v.length / c.length, S = c.map(function(_, $) {
            var E = Math.floor($ * O);
            if (v[E]) {
              var j = v[E], C = rt(j.x, _.x), D = rt(j.y, _.y);
              return ur(ur({}, _), {}, {
                x: C(g),
                y: D(g)
              });
            }
            return _;
          }), y;
          if (H(s) && typeof s == "number") {
            var w = rt(p, s);
            y = w(g);
          } else if (ce(s) || ra(s)) {
            var P = rt(p, 0);
            y = P(g);
          } else
            y = s.map(function(_, $) {
              var E = Math.floor($ * O);
              if (p[E]) {
                var j = p[E], C = rt(j.x, _.x), D = rt(j.y, _.y);
                return ur(ur({}, _), {}, {
                  x: C(g),
                  y: D(g)
                });
              }
              return _;
            });
          return i.renderAreaStatically(S, y, n, a);
        }
        return /* @__PURE__ */ T.createElement(pe, null, /* @__PURE__ */ T.createElement("defs", null, /* @__PURE__ */ T.createElement("clipPath", {
          id: "animationClipPath-".concat(a)
        }, i.renderClipRect(g))), /* @__PURE__ */ T.createElement(pe, {
          clipPath: "url(#animationClipPath-".concat(a, ")")
        }, i.renderAreaStatically(c, s, n, a)));
      });
    }
  }, {
    key: "renderArea",
    value: function(n, a) {
      var i = this.props, o = i.points, c = i.baseLine, s = i.isAnimationActive, l = this.state, f = l.prevPoints, u = l.prevBaseLine, d = l.totalLength;
      return s && o && o.length && (!f && d > 0 || !Cn(f, o) || !Cn(u, c)) ? this.renderAreaWithAnimation(n, a) : this.renderAreaStatically(o, c, n, a);
    }
  }, {
    key: "render",
    value: function() {
      var n, a = this.props, i = a.hide, o = a.dot, c = a.points, s = a.className, l = a.top, f = a.left, u = a.xAxis, d = a.yAxis, h = a.width, m = a.height, v = a.isAnimationActive, p = a.id;
      if (i || !c || !c.length)
        return null;
      var b = this.state.isAnimationFinished, g = c.length === 1, O = le("recharts-area", s), S = u && u.allowDataOverflow, y = d && d.allowDataOverflow, w = S || y, P = ce(p) ? this.id : p, _ = (n = te(o, !1)) !== null && n !== void 0 ? n : {
        r: 3,
        strokeWidth: 2
      }, $ = _.r, E = $ === void 0 ? 3 : $, j = _.strokeWidth, C = j === void 0 ? 2 : j, D = qP(o) ? o : {}, I = D.clipDot, R = I === void 0 ? !0 : I, F = E * 2 + C;
      return /* @__PURE__ */ T.createElement(pe, {
        className: O
      }, S || y ? /* @__PURE__ */ T.createElement("defs", null, /* @__PURE__ */ T.createElement("clipPath", {
        id: "clipPath-".concat(P)
      }, /* @__PURE__ */ T.createElement("rect", {
        x: S ? f : f - h / 2,
        y: y ? l : l - m / 2,
        width: S ? h : h * 2,
        height: y ? m : m * 2
      })), !R && /* @__PURE__ */ T.createElement("clipPath", {
        id: "clipPath-dots-".concat(P)
      }, /* @__PURE__ */ T.createElement("rect", {
        x: f - F / 2,
        y: l - F / 2,
        width: h + F,
        height: m + F
      }))) : null, g ? null : this.renderArea(w, P), (o || g) && this.renderDots(w, R, P), (!v || b) && Jt.renderCallByParent(this.props, c));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, a) {
      return n.animationId !== a.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curPoints: n.points,
        curBaseLine: n.baseLine,
        prevPoints: a.curPoints,
        prevBaseLine: a.curBaseLine
      } : n.points !== a.curPoints || n.baseLine !== a.curBaseLine ? {
        curPoints: n.points,
        curBaseLine: n.baseLine
      } : null;
    }
  }]);
}(Et);
o0 = Ar;
kt(Ar, "displayName", "Area");
kt(Ar, "defaultProps", {
  stroke: "#3182bd",
  fill: "#3182bd",
  fillOpacity: 0.6,
  xAxisId: 0,
  yAxisId: 0,
  legendType: "line",
  connectNulls: !1,
  // points of area
  points: [],
  dot: !1,
  activeDot: !0,
  hide: !1,
  isAnimationActive: !Jr.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
kt(Ar, "getBaseValue", function(e, t, r, n) {
  var a = e.layout, i = e.baseValue, o = t.props.baseValue, c = o ?? i;
  if (H(c) && typeof c == "number")
    return c;
  var s = a === "horizontal" ? n : r, l = s.scale.domain();
  if (s.type === "number") {
    var f = Math.max(l[0], l[1]), u = Math.min(l[0], l[1]);
    return c === "dataMin" ? u : c === "dataMax" || f < 0 ? f : Math.max(Math.min(l[0], l[1]), 0);
  }
  return c === "dataMin" ? l[0] : c === "dataMax" ? l[1] : l[0];
});
kt(Ar, "getComposedData", function(e) {
  var t = e.props, r = e.item, n = e.xAxis, a = e.yAxis, i = e.xAxisTicks, o = e.yAxisTicks, c = e.bandSize, s = e.dataKey, l = e.stackedData, f = e.dataStartIndex, u = e.displayedData, d = e.offset, h = t.layout, m = l && l.length, v = o0.getBaseValue(t, r, n, a), p = h === "horizontal", b = !1, g = u.map(function(S, y) {
    var w;
    m ? w = l[f + y] : (w = We(S, s), Array.isArray(w) ? b = !0 : w = [v, w]);
    var P = w[1] == null || m && We(S, s) == null;
    return p ? {
      x: mp({
        axis: n,
        ticks: i,
        bandSize: c,
        entry: S,
        index: y
      }),
      y: P ? null : a.scale(w[1]),
      value: w,
      payload: S
    } : {
      x: P ? null : n.scale(w[1]),
      y: mp({
        axis: a,
        ticks: o,
        bandSize: c,
        entry: S,
        index: y
      }),
      value: w,
      payload: S
    };
  }), O;
  return m || b ? O = g.map(function(S) {
    var y = Array.isArray(S.value) ? S.value[0] : null;
    return p ? {
      x: S.x,
      y: y != null && S.y != null ? a.scale(y) : null
    } : {
      x: y != null ? n.scale(y) : null,
      y: S.y
    };
  }) : O = p ? a.scale(v) : n.scale(v), ur({
    points: g,
    baseLine: O,
    layout: h,
    isRange: b
  }, d);
});
kt(Ar, "renderDotItem", function(e, t) {
  var r;
  if (/* @__PURE__ */ T.isValidElement(e))
    r = /* @__PURE__ */ T.cloneElement(e, t);
  else if (ie(e))
    r = e(t);
  else {
    var n = le("recharts-area-dot", typeof e != "boolean" ? e.className : ""), a = t.key, i = c0(t, O5);
    r = /* @__PURE__ */ T.createElement(jc, Br({}, i, {
      key: a,
      className: n
    }));
  }
  return r;
});
function qn(e) {
  "@babel/helpers - typeof";
  return qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, qn(e);
}
function M5(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function j5(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, d0(n.key), n);
  }
}
function N5(e, t, r) {
  return t && j5(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function k5(e, t, r) {
  return t = rc(t), I5(e, u0() ? Reflect.construct(t, r || [], rc(e).constructor) : t.apply(e, r));
}
function I5(e, t) {
  if (t && (qn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return D5(e);
}
function D5(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function u0() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (u0 = function() {
    return !!e;
  })();
}
function rc(e) {
  return rc = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, rc(e);
}
function R5(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && su(e, t);
}
function su(e, t) {
  return su = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, su(e, t);
}
function f0(e, t, r) {
  return t = d0(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function d0(e) {
  var t = L5(e, "string");
  return qn(t) == "symbol" ? t : t + "";
}
function L5(e, t) {
  if (qn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (qn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function lu() {
  return lu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, lu.apply(this, arguments);
}
function F5(e) {
  var t = e.xAxisId, r = Tf(), n = $f(), a = Gb(t);
  return a == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ q.createElement(ua, lu({}, a, {
      className: le("recharts-".concat(a.axisType, " ").concat(a.axisType), a.className),
      viewBox: {
        x: 0,
        y: 0,
        width: r,
        height: n
      },
      ticksGenerator: function(o) {
        return Yt(o, !0);
      }
    }))
  );
}
var Vc = /* @__PURE__ */ function(e) {
  function t() {
    return M5(this, t), k5(this, t, arguments);
  }
  return R5(t, e), N5(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ q.createElement(F5, this.props);
    }
  }]);
}(q.Component);
f0(Vc, "displayName", "XAxis");
f0(Vc, "defaultProps", {
  allowDecimals: !0,
  hide: !1,
  orientation: "bottom",
  width: 0,
  height: 30,
  mirror: !1,
  xAxisId: 0,
  tickCount: 5,
  type: "category",
  padding: {
    left: 0,
    right: 0
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1,
  allowDuplicatedCategory: !0
});
function Hn(e) {
  "@babel/helpers - typeof";
  return Hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Hn(e);
}
function B5(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function z5(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, v0(n.key), n);
  }
}
function W5(e, t, r) {
  return t && z5(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function U5(e, t, r) {
  return t = nc(t), V5(e, h0() ? Reflect.construct(t, r || [], nc(e).constructor) : t.apply(e, r));
}
function V5(e, t) {
  if (t && (Hn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return q5(e);
}
function q5(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function h0() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (h0 = function() {
    return !!e;
  })();
}
function nc(e) {
  return nc = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, nc(e);
}
function H5(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && uu(e, t);
}
function uu(e, t) {
  return uu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, uu(e, t);
}
function p0(e, t, r) {
  return t = v0(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function v0(e) {
  var t = G5(e, "string");
  return Hn(t) == "symbol" ? t : t + "";
}
function G5(e, t) {
  if (Hn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Hn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function fu() {
  return fu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, fu.apply(this, arguments);
}
var Y5 = function(t) {
  var r = t.yAxisId, n = Tf(), a = $f(), i = Yb(r);
  return i == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ q.createElement(ua, fu({}, i, {
      className: le("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: a
      },
      ticksGenerator: function(c) {
        return Yt(c, !0);
      }
    }))
  );
}, qc = /* @__PURE__ */ function(e) {
  function t() {
    return B5(this, t), U5(this, t, arguments);
  }
  return H5(t, e), W5(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ q.createElement(Y5, this.props);
    }
  }]);
}(q.Component);
p0(qc, "displayName", "YAxis");
p0(qc, "defaultProps", {
  allowDuplicatedCategory: !0,
  allowDecimals: !0,
  hide: !1,
  orientation: "left",
  width: 60,
  height: 0,
  mirror: !1,
  yAxisId: 0,
  tickCount: 5,
  type: "number",
  padding: {
    top: 0,
    bottom: 0
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1
});
function tm(e) {
  return J5(e) || Z5(e) || X5(e) || K5();
}
function K5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function X5(e, t) {
  if (e) {
    if (typeof e == "string") return du(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return du(e, t);
  }
}
function Z5(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function J5(e) {
  if (Array.isArray(e)) return du(e);
}
function du(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var hu = function(t, r, n, a, i) {
  var o = mt(t, Mf), c = mt(t, zc), s = [].concat(tm(o), tm(c)), l = mt(t, Uc), f = "".concat(a, "Id"), u = a[0], d = r;
  if (s.length && (d = s.reduce(function(v, p) {
    if (p.props[f] === n && Dt(p.props, "extendDomain") && H(p.props[u])) {
      var b = p.props[u];
      return [Math.min(v[0], b), Math.max(v[1], b)];
    }
    return v;
  }, d)), l.length) {
    var h = "".concat(u, "1"), m = "".concat(u, "2");
    d = l.reduce(function(v, p) {
      if (p.props[f] === n && Dt(p.props, "extendDomain") && H(p.props[h]) && H(p.props[m])) {
        var b = p.props[h], g = p.props[m];
        return [Math.min(v[0], b, g), Math.max(v[1], b, g)];
      }
      return v;
    }, d);
  }
  return i && i.length && (d = i.reduce(function(v, p) {
    return H(p) ? [Math.min(v[0], p), Math.max(v[1], p)] : v;
  }, d)), d;
}, m0 = { exports: {} };
(function(e) {
  var t = Object.prototype.hasOwnProperty, r = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (r = !1));
  function a(s, l, f) {
    this.fn = s, this.context = l, this.once = f || !1;
  }
  function i(s, l, f, u, d) {
    if (typeof f != "function")
      throw new TypeError("The listener must be a function");
    var h = new a(f, u || s, d), m = r ? r + l : l;
    return s._events[m] ? s._events[m].fn ? s._events[m] = [s._events[m], h] : s._events[m].push(h) : (s._events[m] = h, s._eventsCount++), s;
  }
  function o(s, l) {
    --s._eventsCount === 0 ? s._events = new n() : delete s._events[l];
  }
  function c() {
    this._events = new n(), this._eventsCount = 0;
  }
  c.prototype.eventNames = function() {
    var l = [], f, u;
    if (this._eventsCount === 0) return l;
    for (u in f = this._events)
      t.call(f, u) && l.push(r ? u.slice(1) : u);
    return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(f)) : l;
  }, c.prototype.listeners = function(l) {
    var f = r ? r + l : l, u = this._events[f];
    if (!u) return [];
    if (u.fn) return [u.fn];
    for (var d = 0, h = u.length, m = new Array(h); d < h; d++)
      m[d] = u[d].fn;
    return m;
  }, c.prototype.listenerCount = function(l) {
    var f = r ? r + l : l, u = this._events[f];
    return u ? u.fn ? 1 : u.length : 0;
  }, c.prototype.emit = function(l, f, u, d, h, m) {
    var v = r ? r + l : l;
    if (!this._events[v]) return !1;
    var p = this._events[v], b = arguments.length, g, O;
    if (p.fn) {
      switch (p.once && this.removeListener(l, p.fn, void 0, !0), b) {
        case 1:
          return p.fn.call(p.context), !0;
        case 2:
          return p.fn.call(p.context, f), !0;
        case 3:
          return p.fn.call(p.context, f, u), !0;
        case 4:
          return p.fn.call(p.context, f, u, d), !0;
        case 5:
          return p.fn.call(p.context, f, u, d, h), !0;
        case 6:
          return p.fn.call(p.context, f, u, d, h, m), !0;
      }
      for (O = 1, g = new Array(b - 1); O < b; O++)
        g[O - 1] = arguments[O];
      p.fn.apply(p.context, g);
    } else {
      var S = p.length, y;
      for (O = 0; O < S; O++)
        switch (p[O].once && this.removeListener(l, p[O].fn, void 0, !0), b) {
          case 1:
            p[O].fn.call(p[O].context);
            break;
          case 2:
            p[O].fn.call(p[O].context, f);
            break;
          case 3:
            p[O].fn.call(p[O].context, f, u);
            break;
          case 4:
            p[O].fn.call(p[O].context, f, u, d);
            break;
          default:
            if (!g) for (y = 1, g = new Array(b - 1); y < b; y++)
              g[y - 1] = arguments[y];
            p[O].fn.apply(p[O].context, g);
        }
    }
    return !0;
  }, c.prototype.on = function(l, f, u) {
    return i(this, l, f, u, !1);
  }, c.prototype.once = function(l, f, u) {
    return i(this, l, f, u, !0);
  }, c.prototype.removeListener = function(l, f, u, d) {
    var h = r ? r + l : l;
    if (!this._events[h]) return this;
    if (!f)
      return o(this, h), this;
    var m = this._events[h];
    if (m.fn)
      m.fn === f && (!d || m.once) && (!u || m.context === u) && o(this, h);
    else {
      for (var v = 0, p = [], b = m.length; v < b; v++)
        (m[v].fn !== f || d && !m[v].once || u && m[v].context !== u) && p.push(m[v]);
      p.length ? this._events[h] = p.length === 1 ? p[0] : p : o(this, h);
    }
    return this;
  }, c.prototype.removeAllListeners = function(l) {
    var f;
    return l ? (f = r ? r + l : l, this._events[f] && o(this, f)) : (this._events = new n(), this._eventsCount = 0), this;
  }, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = r, c.EventEmitter = c, e.exports = c;
})(m0);
var Q5 = m0.exports;
const eU = /* @__PURE__ */ Pe(Q5);
var Is = new eU(), Ds = "recharts.syncMouseEvents";
function di(e) {
  "@babel/helpers - typeof";
  return di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, di(e);
}
function tU(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function rU(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, y0(n.key), n);
  }
}
function nU(e, t, r) {
  return t && rU(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Rs(e, t, r) {
  return t = y0(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function y0(e) {
  var t = aU(e, "string");
  return di(t) == "symbol" ? t : t + "";
}
function aU(e, t) {
  if (di(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var iU = /* @__PURE__ */ function() {
  function e() {
    tU(this, e), Rs(this, "activeIndex", 0), Rs(this, "coordinateList", []), Rs(this, "layout", "horizontal");
  }
  return nU(e, [{
    key: "setDetails",
    value: function(r) {
      var n, a = r.coordinateList, i = a === void 0 ? null : a, o = r.container, c = o === void 0 ? null : o, s = r.layout, l = s === void 0 ? null : s, f = r.offset, u = f === void 0 ? null : f, d = r.mouseHandlerCallback, h = d === void 0 ? null : d;
      this.coordinateList = (n = i ?? this.coordinateList) !== null && n !== void 0 ? n : [], this.container = c ?? this.container, this.layout = l ?? this.layout, this.offset = u ?? this.offset, this.mouseHandlerCallback = h ?? this.mouseHandlerCallback, this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1);
    }
  }, {
    key: "focus",
    value: function() {
      this.spoofMouse();
    }
  }, {
    key: "keyboardEvent",
    value: function(r) {
      if (this.coordinateList.length !== 0)
        switch (r.key) {
          case "ArrowRight": {
            if (this.layout !== "horizontal")
              return;
            this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1), this.spoofMouse();
            break;
          }
          case "ArrowLeft": {
            if (this.layout !== "horizontal")
              return;
            this.activeIndex = Math.max(this.activeIndex - 1, 0), this.spoofMouse();
            break;
          }
        }
    }
  }, {
    key: "setIndex",
    value: function(r) {
      this.activeIndex = r;
    }
  }, {
    key: "spoofMouse",
    value: function() {
      var r, n;
      if (this.layout === "horizontal" && this.coordinateList.length !== 0) {
        var a = this.container.getBoundingClientRect(), i = a.x, o = a.y, c = a.height, s = this.coordinateList[this.activeIndex].coordinate, l = ((r = window) === null || r === void 0 ? void 0 : r.scrollX) || 0, f = ((n = window) === null || n === void 0 ? void 0 : n.scrollY) || 0, u = i + s + l, d = o + this.offset.top + c / 2 + f;
        this.mouseHandlerCallback({
          pageX: u,
          pageY: d
        });
      }
    }
  }]);
}();
function oU(e, t, r) {
  if (r === "number" && t === !0 && Array.isArray(e)) {
    var n = e == null ? void 0 : e[0], a = e == null ? void 0 : e[1];
    if (n && a && H(n) && H(a))
      return !0;
  }
  return !1;
}
function cU(e, t, r, n) {
  var a = n / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: e === "horizontal" ? t.x - a : r.left + 0.5,
    y: e === "horizontal" ? r.top + 0.5 : t.y - a,
    width: e === "horizontal" ? n : r.width - 1,
    height: e === "horizontal" ? r.height - 1 : n
  };
}
function g0(e) {
  var t = e.cx, r = e.cy, n = e.radius, a = e.startAngle, i = e.endAngle, o = Me(t, r, n, a), c = Me(t, r, n, i);
  return {
    points: [o, c],
    cx: t,
    cy: r,
    radius: n,
    startAngle: a,
    endAngle: i
  };
}
function sU(e, t, r) {
  var n, a, i, o;
  if (e === "horizontal")
    n = t.x, i = n, a = r.top, o = r.top + r.height;
  else if (e === "vertical")
    a = t.y, o = a, n = r.left, i = r.left + r.width;
  else if (t.cx != null && t.cy != null)
    if (e === "centric") {
      var c = t.cx, s = t.cy, l = t.innerRadius, f = t.outerRadius, u = t.angle, d = Me(c, s, l, u), h = Me(c, s, f, u);
      n = d.x, a = d.y, i = h.x, o = h.y;
    } else
      return g0(t);
  return [{
    x: n,
    y: a
  }, {
    x: i,
    y: o
  }];
}
function hi(e) {
  "@babel/helpers - typeof";
  return hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, hi(e);
}
function rm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Wi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rm(Object(r), !0).forEach(function(n) {
      lU(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function lU(e, t, r) {
  return t = uU(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function uU(e) {
  var t = fU(e, "string");
  return hi(t) == "symbol" ? t : t + "";
}
function fU(e, t) {
  if (hi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (hi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function dU(e) {
  var t, r, n = e.element, a = e.tooltipEventType, i = e.isActive, o = e.activeCoordinate, c = e.activePayload, s = e.offset, l = e.activeTooltipIndex, f = e.tooltipAxisBandSize, u = e.layout, d = e.chartName, h = (t = n.props.cursor) !== null && t !== void 0 ? t : (r = n.type.defaultProps) === null || r === void 0 ? void 0 : r.cursor;
  if (!n || !h || !i || !o || d !== "ScatterChart" && a !== "axis")
    return null;
  var m, v = bn;
  if (d === "ScatterChart")
    m = o, v = N6;
  else if (d === "BarChart")
    m = cU(u, o, s, f), v = Pf;
  else if (u === "radial") {
    var p = g0(o), b = p.cx, g = p.cy, O = p.radius, S = p.startAngle, y = p.endAngle;
    m = {
      cx: b,
      cy: g,
      startAngle: S,
      endAngle: y,
      innerRadius: O,
      outerRadius: O
    }, v = db;
  } else
    m = {
      points: sU(u, o, s)
    }, v = bn;
  var w = Wi(Wi(Wi(Wi({
    stroke: "#ccc",
    pointerEvents: "none"
  }, s), m), te(h, !1)), {}, {
    payload: c,
    payloadIndex: l,
    className: le("recharts-tooltip-cursor", h.className)
  });
  return /* @__PURE__ */ Pt(h) ? /* @__PURE__ */ ze(h, w) : /* @__PURE__ */ Ca(v, w);
}
var hU = ["item"], pU = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function Gn(e) {
  "@babel/helpers - typeof";
  return Gn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Gn(e);
}
function pn() {
  return pn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, pn.apply(this, arguments);
}
function nm(e, t) {
  return yU(e) || mU(e, t) || w0(e, t) || vU();
}
function vU() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function mU(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, c = [], s = !0, l = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (c.push(n.value), c.length !== t); s = !0) ;
    } catch (f) {
      l = !0, a = f;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw a;
      }
    }
    return c;
  }
}
function yU(e) {
  if (Array.isArray(e)) return e;
}
function am(e, t) {
  if (e == null) return {};
  var r = gU(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function gU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function bU(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function wU(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, x0(n.key), n);
  }
}
function xU(e, t, r) {
  return t && wU(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function OU(e, t, r) {
  return t = ac(t), SU(e, b0() ? Reflect.construct(t, r || [], ac(e).constructor) : t.apply(e, r));
}
function SU(e, t) {
  if (t && (Gn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return PU(e);
}
function PU(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function b0() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (b0 = function() {
    return !!e;
  })();
}
function ac(e) {
  return ac = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ac(e);
}
function _U(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && pu(e, t);
}
function pu(e, t) {
  return pu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, pu(e, t);
}
function Yn(e) {
  return TU(e) || EU(e) || w0(e) || AU();
}
function AU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function w0(e, t) {
  if (e) {
    if (typeof e == "string") return vu(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return vu(e, t);
  }
}
function EU(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function TU(e) {
  if (Array.isArray(e)) return vu(e);
}
function vu(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function im(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function L(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? im(Object(r), !0).forEach(function(n) {
      ne(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : im(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ne(e, t, r) {
  return t = x0(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function x0(e) {
  var t = $U(e, "string");
  return Gn(t) == "symbol" ? t : t + "";
}
function $U(e, t) {
  if (Gn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Gn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var CU = {
  xAxis: ["bottom", "top"],
  yAxis: ["left", "right"]
}, MU = {
  width: "100%",
  height: "100%"
}, O0 = {
  x: 0,
  y: 0
};
function Ui(e) {
  return e;
}
var jU = function(t, r) {
  return r === "horizontal" ? t.x : r === "vertical" ? t.y : r === "centric" ? t.angle : t.radius;
}, NU = function(t, r, n, a) {
  var i = r.find(function(f) {
    return f && f.index === n;
  });
  if (i) {
    if (t === "horizontal")
      return {
        x: i.coordinate,
        y: a.y
      };
    if (t === "vertical")
      return {
        x: a.x,
        y: i.coordinate
      };
    if (t === "centric") {
      var o = i.coordinate, c = a.radius;
      return L(L(L({}, a), Me(a.cx, a.cy, c, o)), {}, {
        angle: o,
        radius: c
      });
    }
    var s = i.coordinate, l = a.angle;
    return L(L(L({}, a), Me(a.cx, a.cy, s, l)), {}, {
      angle: l,
      radius: s
    });
  }
  return O0;
}, Hc = function(t, r) {
  var n = r.graphicalItems, a = r.dataStartIndex, i = r.dataEndIndex, o = (n ?? []).reduce(function(c, s) {
    var l = s.props.data;
    return l && l.length ? [].concat(Yn(c), Yn(l)) : c;
  }, []);
  return o.length > 0 ? o : t && t.length && H(a) && H(i) ? t.slice(a, i + 1) : [];
};
function S0(e) {
  return e === "number" ? [0, "auto"] : void 0;
}
var mu = function(t, r, n, a) {
  var i = t.graphicalItems, o = t.tooltipAxis, c = Hc(r, t);
  return n < 0 || !i || !i.length || n >= c.length ? null : i.reduce(function(s, l) {
    var f, u = (f = l.props.data) !== null && f !== void 0 ? f : r;
    u && t.dataStartIndex + t.dataEndIndex !== 0 && // https://github.com/recharts/recharts/issues/4717
    // The data is sliced only when the active index is within the start/end index range.
    t.dataEndIndex - t.dataStartIndex >= n && (u = u.slice(t.dataStartIndex, t.dataEndIndex + 1));
    var d;
    if (o.dataKey && !o.allowDuplicatedCategory) {
      var h = u === void 0 ? c : u;
      d = eo(h, o.dataKey, a);
    } else
      d = u && u[n] || c[n];
    return d ? [].concat(Yn(s), [ob(l, d)]) : s;
  }, []);
}, om = function(t, r, n, a) {
  var i = a || {
    x: t.chartX,
    y: t.chartY
  }, o = jU(i, n), c = t.orderedTooltipTicks, s = t.tooltipAxis, l = t.tooltipTicks, f = YL(o, c, l, s);
  if (f >= 0 && l) {
    var u = l[f] && l[f].value, d = mu(t, r, f, u), h = NU(n, c, f, i);
    return {
      activeTooltipIndex: f,
      activeLabel: u,
      activePayload: d,
      activeCoordinate: h
    };
  }
  return null;
}, kU = function(t, r) {
  var n = r.axes, a = r.graphicalItems, i = r.axisType, o = r.axisIdKey, c = r.stackGroups, s = r.dataStartIndex, l = r.dataEndIndex, f = t.layout, u = t.children, d = t.stackOffset, h = eb(f, i);
  return n.reduce(function(m, v) {
    var p, b = v.type.defaultProps !== void 0 ? L(L({}, v.type.defaultProps), v.props) : v.props, g = b.type, O = b.dataKey, S = b.allowDataOverflow, y = b.allowDuplicatedCategory, w = b.scale, P = b.ticks, _ = b.includeHidden, $ = b[o];
    if (m[$])
      return m;
    var E = Hc(t.data, {
      graphicalItems: a.filter(function(W) {
        var Y, X = o in W.props ? W.props[o] : (Y = W.type.defaultProps) === null || Y === void 0 ? void 0 : Y[o];
        return X === $;
      }),
      dataStartIndex: s,
      dataEndIndex: l
    }), j = E.length, C, D, I;
    oU(b.domain, S, g) && (C = Cl(b.domain, null, S), h && (g === "number" || w !== "auto") && (I = Aa(E, O, "category")));
    var R = S0(g);
    if (!C || C.length === 0) {
      var F, k = (F = b.domain) !== null && F !== void 0 ? F : R;
      if (O) {
        if (C = Aa(E, O, g), g === "category" && h) {
          var z = IP(C);
          y && z ? (D = C, C = Vo(0, j)) : y || (C = wp(k, C, v).reduce(function(W, Y) {
            return W.indexOf(Y) >= 0 ? W : [].concat(Yn(W), [Y]);
          }, []));
        } else if (g === "category")
          y ? C = C.filter(function(W) {
            return W !== "" && !ce(W);
          }) : C = wp(k, C, v).reduce(function(W, Y) {
            return W.indexOf(Y) >= 0 || Y === "" || ce(Y) ? W : [].concat(Yn(W), [Y]);
          }, []);
        else if (g === "number") {
          var V = QL(E, a.filter(function(W) {
            var Y, X, ee = o in W.props ? W.props[o] : (Y = W.type.defaultProps) === null || Y === void 0 ? void 0 : Y[o], re = "hide" in W.props ? W.props.hide : (X = W.type.defaultProps) === null || X === void 0 ? void 0 : X.hide;
            return ee === $ && (_ || !re);
          }), O, i, f);
          V && (C = V);
        }
        h && (g === "number" || w !== "auto") && (I = Aa(E, O, "category"));
      } else h ? C = Vo(0, j) : c && c[$] && c[$].hasStack && g === "number" ? C = d === "expand" ? [0, 1] : ib(c[$].stackGroups, s, l) : C = Qg(E, a.filter(function(W) {
        var Y = o in W.props ? W.props[o] : W.type.defaultProps[o], X = "hide" in W.props ? W.props.hide : W.type.defaultProps.hide;
        return Y === $ && (_ || !X);
      }), g, f, !0);
      if (g === "number")
        C = hu(u, C, $, i, P), k && (C = Cl(k, C, S));
      else if (g === "category" && k) {
        var N = k, B = C.every(function(W) {
          return N.indexOf(W) >= 0;
        });
        B && (C = N);
      }
    }
    return L(L({}, m), {}, ne({}, $, L(L({}, b), {}, {
      axisType: i,
      domain: C,
      categoricalDomain: I,
      duplicateDomain: D,
      originalDomain: (p = b.domain) !== null && p !== void 0 ? p : R,
      isCategorical: h,
      layout: f
    })));
  }, {});
}, IU = function(t, r) {
  var n = r.graphicalItems, a = r.Axis, i = r.axisType, o = r.axisIdKey, c = r.stackGroups, s = r.dataStartIndex, l = r.dataEndIndex, f = t.layout, u = t.children, d = Hc(t.data, {
    graphicalItems: n,
    dataStartIndex: s,
    dataEndIndex: l
  }), h = d.length, m = eb(f, i), v = -1;
  return n.reduce(function(p, b) {
    var g = b.type.defaultProps !== void 0 ? L(L({}, b.type.defaultProps), b.props) : b.props, O = g[o], S = S0("number");
    if (!p[O]) {
      v++;
      var y;
      return m ? y = Vo(0, h) : c && c[O] && c[O].hasStack ? (y = ib(c[O].stackGroups, s, l), y = hu(u, y, O, i)) : (y = Cl(S, Qg(d, n.filter(function(w) {
        var P, _, $ = o in w.props ? w.props[o] : (P = w.type.defaultProps) === null || P === void 0 ? void 0 : P[o], E = "hide" in w.props ? w.props.hide : (_ = w.type.defaultProps) === null || _ === void 0 ? void 0 : _.hide;
        return $ === O && !E;
      }), "number", f), a.defaultProps.allowDataOverflow), y = hu(u, y, O, i)), L(L({}, p), {}, ne({}, O, L(L({
        axisType: i
      }, a.defaultProps), {}, {
        hide: !0,
        orientation: lt(CU, "".concat(i, ".").concat(v % 2), null),
        domain: y,
        originalDomain: S,
        isCategorical: m,
        layout: f
        // specify scale when no Axis
        // scale: isCategorical ? 'band' : 'linear',
      })));
    }
    return p;
  }, {});
}, DU = function(t, r) {
  var n = r.axisType, a = n === void 0 ? "xAxis" : n, i = r.AxisComp, o = r.graphicalItems, c = r.stackGroups, s = r.dataStartIndex, l = r.dataEndIndex, f = t.children, u = "".concat(a, "Id"), d = mt(f, i), h = {};
  return d && d.length ? h = kU(t, {
    axes: d,
    graphicalItems: o,
    axisType: a,
    axisIdKey: u,
    stackGroups: c,
    dataStartIndex: s,
    dataEndIndex: l
  }) : o && o.length && (h = IU(t, {
    Axis: i,
    graphicalItems: o,
    axisType: a,
    axisIdKey: u,
    stackGroups: c,
    dataStartIndex: s,
    dataEndIndex: l
  })), h;
}, RU = function(t) {
  var r = dr(t), n = Yt(r, !1, !0);
  return {
    tooltipTicks: n,
    orderedTooltipTicks: Yu(n, function(a) {
      return a.coordinate;
    }),
    tooltipAxis: r,
    tooltipAxisBandSize: Co(r, n)
  };
}, cm = function(t) {
  var r = t.children, n = t.defaultShowTooltip, a = ct(r, Rn), i = 0, o = 0;
  return t.data && t.data.length !== 0 && (o = t.data.length - 1), a && a.props && (a.props.startIndex >= 0 && (i = a.props.startIndex), a.props.endIndex >= 0 && (o = a.props.endIndex)), {
    chartX: 0,
    chartY: 0,
    dataStartIndex: i,
    dataEndIndex: o,
    activeTooltipIndex: -1,
    isTooltipActive: !!n
  };
}, LU = function(t) {
  return !t || !t.length ? !1 : t.some(function(r) {
    var n = Xt(r && r.type);
    return n && n.indexOf("Bar") >= 0;
  });
}, sm = function(t) {
  return t === "horizontal" ? {
    numericAxisName: "yAxis",
    cateAxisName: "xAxis"
  } : t === "vertical" ? {
    numericAxisName: "xAxis",
    cateAxisName: "yAxis"
  } : t === "centric" ? {
    numericAxisName: "radiusAxis",
    cateAxisName: "angleAxis"
  } : {
    numericAxisName: "angleAxis",
    cateAxisName: "radiusAxis"
  };
}, FU = function(t, r) {
  var n = t.props, a = t.graphicalItems, i = t.xAxisMap, o = i === void 0 ? {} : i, c = t.yAxisMap, s = c === void 0 ? {} : c, l = n.width, f = n.height, u = n.children, d = n.margin || {}, h = ct(u, Rn), m = ct(u, mn), v = Object.keys(s).reduce(function(y, w) {
    var P = s[w], _ = P.orientation;
    return !P.mirror && !P.hide ? L(L({}, y), {}, ne({}, _, y[_] + P.width)) : y;
  }, {
    left: d.left || 0,
    right: d.right || 0
  }), p = Object.keys(o).reduce(function(y, w) {
    var P = o[w], _ = P.orientation;
    return !P.mirror && !P.hide ? L(L({}, y), {}, ne({}, _, lt(y, "".concat(_)) + P.height)) : y;
  }, {
    top: d.top || 0,
    bottom: d.bottom || 0
  }), b = L(L({}, p), v), g = b.bottom;
  h && (b.bottom += h.props.height || Rn.defaultProps.height), m && r && (b = ZL(b, a, n, r));
  var O = l - b.left - b.right, S = f - b.top - b.bottom;
  return L(L({
    brushBottom: g
  }, b), {}, {
    // never return negative values for height and width
    width: Math.max(O, 0),
    height: Math.max(S, 0)
  });
}, BU = function(t, r) {
  if (r === "xAxis")
    return t[r].width;
  if (r === "yAxis")
    return t[r].height;
}, P0 = function(t) {
  var r = t.chartName, n = t.GraphicalChild, a = t.defaultTooltipEventType, i = a === void 0 ? "axis" : a, o = t.validateTooltipEventTypes, c = o === void 0 ? ["axis"] : o, s = t.axisComponents, l = t.legendContent, f = t.formatAxisMap, u = t.defaultProps, d = function(b, g) {
    var O = g.graphicalItems, S = g.stackGroups, y = g.offset, w = g.updateId, P = g.dataStartIndex, _ = g.dataEndIndex, $ = b.barSize, E = b.layout, j = b.barGap, C = b.barCategoryGap, D = b.maxBarSize, I = sm(E), R = I.numericAxisName, F = I.cateAxisName, k = LU(O), z = [];
    return O.forEach(function(V, N) {
      var B = Hc(b.data, {
        graphicalItems: [V],
        dataStartIndex: P,
        dataEndIndex: _
      }), W = V.type.defaultProps !== void 0 ? L(L({}, V.type.defaultProps), V.props) : V.props, Y = W.dataKey, X = W.maxBarSize, ee = W["".concat(R, "Id")], re = W["".concat(F, "Id")], oe = {}, ae = s.reduce(function(Er, Ut) {
        var Yc, Kc, Xc = g["".concat(Ut.axisType, "Map")], kf = W["".concat(Ut.axisType, "Id")];
        Xc && Xc[kf] || Ut.axisType === "zAxis" || (process.env.NODE_ENV !== "production" ? at(!1, "Specifying a(n) ".concat(Ut.axisType, "Id requires a corresponding ").concat(
          Ut.axisType,
          "Id on the targeted graphical component "
        ).concat((Yc = V == null || (Kc = V.type) === null || Kc === void 0 ? void 0 : Kc.displayName) !== null && Yc !== void 0 ? Yc : "")) : at());
        var If = Xc[kf];
        return L(L({}, Er), {}, ne(ne({}, Ut.axisType, If), "".concat(Ut.axisType, "Ticks"), Yt(If)));
      }, oe), U = ae[F], K = ae["".concat(F, "Ticks")], Q = S && S[ee] && S[ee].hasStack && sF(V, S[ee].stackGroups), M = Xt(V.type).indexOf("Bar") >= 0, fe = Co(U, K), G = [], Ee = k && KL({
        barSize: $,
        stackGroups: S,
        totalSize: BU(ae, F)
      });
      if (M) {
        var ke, Ye, sr = ce(X) ? D : X, rn = (ke = (Ye = Co(U, K, !0)) !== null && Ye !== void 0 ? Ye : sr) !== null && ke !== void 0 ? ke : 0;
        G = XL({
          barGap: j,
          barCategoryGap: C,
          bandSize: rn !== fe ? rn : fe,
          sizeList: Ee[re],
          maxBarSize: sr
        }), rn !== fe && (G = G.map(function(Er) {
          return L(L({}, Er), {}, {
            position: L(L({}, Er.position), {}, {
              offset: Er.position.offset - rn / 2
            })
          });
        }));
      }
      var Ai = V && V.type && V.type.getComposedData;
      Ai && z.push({
        props: L(L({}, Ai(L(L({}, ae), {}, {
          displayedData: B,
          props: b,
          dataKey: Y,
          item: V,
          bandSize: fe,
          barPosition: G,
          offset: y,
          stackedData: Q,
          layout: E,
          dataStartIndex: P,
          dataEndIndex: _
        }))), {}, ne(ne(ne({
          key: V.key || "item-".concat(N)
        }, R, ae[R]), F, ae[F]), "animationId", w)),
        childIndex: YP(V, b.children),
        item: V
      });
    }), z;
  }, h = function(b, g) {
    var O = b.props, S = b.dataStartIndex, y = b.dataEndIndex, w = b.updateId;
    if (!hd({
      props: O
    }))
      return null;
    var P = O.children, _ = O.layout, $ = O.stackOffset, E = O.data, j = O.reverseStackOrder, C = sm(_), D = C.numericAxisName, I = C.cateAxisName, R = mt(P, n), F = oF(E, R, "".concat(D, "Id"), "".concat(I, "Id"), $, j), k = s.reduce(function(W, Y) {
      var X = "".concat(Y.axisType, "Map");
      return L(L({}, W), {}, ne({}, X, DU(O, L(L({}, Y), {}, {
        graphicalItems: R,
        stackGroups: Y.axisType === D && F,
        dataStartIndex: S,
        dataEndIndex: y
      }))));
    }, {}), z = FU(L(L({}, k), {}, {
      props: O,
      graphicalItems: R
    }), g == null ? void 0 : g.legendBBox);
    Object.keys(k).forEach(function(W) {
      k[W] = f(O, k[W], z, W.replace("Map", ""), r);
    });
    var V = k["".concat(I, "Map")], N = RU(V), B = d(O, L(L({}, k), {}, {
      dataStartIndex: S,
      dataEndIndex: y,
      updateId: w,
      graphicalItems: R,
      stackGroups: F,
      offset: z
    }));
    return L(L({
      formattedGraphicalItems: B,
      graphicalItems: R,
      offset: z,
      stackGroups: F
    }, N), k);
  }, m = /* @__PURE__ */ function(p) {
    function b(g) {
      var O, S, y;
      return bU(this, b), y = OU(this, b, [g]), ne(y, "eventEmitterSymbol", Symbol("rechartsEventEmitter")), ne(y, "accessibilityManager", new iU()), ne(y, "handleLegendBBoxUpdate", function(w) {
        if (w) {
          var P = y.state, _ = P.dataStartIndex, $ = P.dataEndIndex, E = P.updateId;
          y.setState(L({
            legendBBox: w
          }, h({
            props: y.props,
            dataStartIndex: _,
            dataEndIndex: $,
            updateId: E
          }, L(L({}, y.state), {}, {
            legendBBox: w
          }))));
        }
      }), ne(y, "handleReceiveSyncEvent", function(w, P, _) {
        if (y.props.syncId === w) {
          if (_ === y.eventEmitterSymbol && typeof y.props.syncMethod != "function")
            return;
          y.applySyncEvent(P);
        }
      }), ne(y, "handleBrushChange", function(w) {
        var P = w.startIndex, _ = w.endIndex;
        if (P !== y.state.dataStartIndex || _ !== y.state.dataEndIndex) {
          var $ = y.state.updateId;
          y.setState(function() {
            return L({
              dataStartIndex: P,
              dataEndIndex: _
            }, h({
              props: y.props,
              dataStartIndex: P,
              dataEndIndex: _,
              updateId: $
            }, y.state));
          }), y.triggerSyncEvent({
            dataStartIndex: P,
            dataEndIndex: _
          });
        }
      }), ne(y, "handleMouseEnter", function(w) {
        var P = y.getMouseInfo(w);
        if (P) {
          var _ = L(L({}, P), {}, {
            isTooltipActive: !0
          });
          y.setState(_), y.triggerSyncEvent(_);
          var $ = y.props.onMouseEnter;
          ie($) && $(_, w);
        }
      }), ne(y, "triggeredAfterMouseMove", function(w) {
        var P = y.getMouseInfo(w), _ = P ? L(L({}, P), {}, {
          isTooltipActive: !0
        }) : {
          isTooltipActive: !1
        };
        y.setState(_), y.triggerSyncEvent(_);
        var $ = y.props.onMouseMove;
        ie($) && $(_, w);
      }), ne(y, "handleItemMouseEnter", function(w) {
        y.setState(function() {
          return {
            isTooltipActive: !0,
            activeItem: w,
            activePayload: w.tooltipPayload,
            activeCoordinate: w.tooltipPosition || {
              x: w.cx,
              y: w.cy
            }
          };
        });
      }), ne(y, "handleItemMouseLeave", function() {
        y.setState(function() {
          return {
            isTooltipActive: !1
          };
        });
      }), ne(y, "handleMouseMove", function(w) {
        w.persist(), y.throttleTriggeredAfterMouseMove(w);
      }), ne(y, "handleMouseLeave", function(w) {
        y.throttleTriggeredAfterMouseMove.cancel();
        var P = {
          isTooltipActive: !1
        };
        y.setState(P), y.triggerSyncEvent(P);
        var _ = y.props.onMouseLeave;
        ie(_) && _(P, w);
      }), ne(y, "handleOuterEvent", function(w) {
        var P = GP(w), _ = lt(y.props, "".concat(P));
        if (P && ie(_)) {
          var $, E;
          /.*touch.*/i.test(P) ? E = y.getMouseInfo(w.changedTouches[0]) : E = y.getMouseInfo(w), _(($ = E) !== null && $ !== void 0 ? $ : {}, w);
        }
      }), ne(y, "handleClick", function(w) {
        var P = y.getMouseInfo(w);
        if (P) {
          var _ = L(L({}, P), {}, {
            isTooltipActive: !0
          });
          y.setState(_), y.triggerSyncEvent(_);
          var $ = y.props.onClick;
          ie($) && $(_, w);
        }
      }), ne(y, "handleMouseDown", function(w) {
        var P = y.props.onMouseDown;
        if (ie(P)) {
          var _ = y.getMouseInfo(w);
          P(_, w);
        }
      }), ne(y, "handleMouseUp", function(w) {
        var P = y.props.onMouseUp;
        if (ie(P)) {
          var _ = y.getMouseInfo(w);
          P(_, w);
        }
      }), ne(y, "handleTouchMove", function(w) {
        w.changedTouches != null && w.changedTouches.length > 0 && y.throttleTriggeredAfterMouseMove(w.changedTouches[0]);
      }), ne(y, "handleTouchStart", function(w) {
        w.changedTouches != null && w.changedTouches.length > 0 && y.handleMouseDown(w.changedTouches[0]);
      }), ne(y, "handleTouchEnd", function(w) {
        w.changedTouches != null && w.changedTouches.length > 0 && y.handleMouseUp(w.changedTouches[0]);
      }), ne(y, "handleDoubleClick", function(w) {
        var P = y.props.onDoubleClick;
        if (ie(P)) {
          var _ = y.getMouseInfo(w);
          P(_, w);
        }
      }), ne(y, "handleContextMenu", function(w) {
        var P = y.props.onContextMenu;
        if (ie(P)) {
          var _ = y.getMouseInfo(w);
          P(_, w);
        }
      }), ne(y, "triggerSyncEvent", function(w) {
        y.props.syncId !== void 0 && Is.emit(Ds, y.props.syncId, w, y.eventEmitterSymbol);
      }), ne(y, "applySyncEvent", function(w) {
        var P = y.props, _ = P.layout, $ = P.syncMethod, E = y.state.updateId, j = w.dataStartIndex, C = w.dataEndIndex;
        if (w.dataStartIndex !== void 0 || w.dataEndIndex !== void 0)
          y.setState(L({
            dataStartIndex: j,
            dataEndIndex: C
          }, h({
            props: y.props,
            dataStartIndex: j,
            dataEndIndex: C,
            updateId: E
          }, y.state)));
        else if (w.activeTooltipIndex !== void 0) {
          var D = w.chartX, I = w.chartY, R = w.activeTooltipIndex, F = y.state, k = F.offset, z = F.tooltipTicks;
          if (!k)
            return;
          if (typeof $ == "function")
            R = $(z, w);
          else if ($ === "value") {
            R = -1;
            for (var V = 0; V < z.length; V++)
              if (z[V].value === w.activeLabel) {
                R = V;
                break;
              }
          }
          var N = L(L({}, k), {}, {
            x: k.left,
            y: k.top
          }), B = Math.min(D, N.x + N.width), W = Math.min(I, N.y + N.height), Y = z[R] && z[R].value, X = mu(y.state, y.props.data, R), ee = z[R] ? {
            x: _ === "horizontal" ? z[R].coordinate : B,
            y: _ === "horizontal" ? W : z[R].coordinate
          } : O0;
          y.setState(L(L({}, w), {}, {
            activeLabel: Y,
            activeCoordinate: ee,
            activePayload: X,
            activeTooltipIndex: R
          }));
        } else
          y.setState(w);
      }), ne(y, "renderCursor", function(w) {
        var P, _ = y.state, $ = _.isTooltipActive, E = _.activeCoordinate, j = _.activePayload, C = _.offset, D = _.activeTooltipIndex, I = _.tooltipAxisBandSize, R = y.getTooltipEventType(), F = (P = w.props.active) !== null && P !== void 0 ? P : $, k = y.props.layout, z = w.key || "_recharts-cursor";
        return /* @__PURE__ */ T.createElement(dU, {
          key: z,
          activeCoordinate: E,
          activePayload: j,
          activeTooltipIndex: D,
          chartName: r,
          element: w,
          isActive: F,
          layout: k,
          offset: C,
          tooltipAxisBandSize: I,
          tooltipEventType: R
        });
      }), ne(y, "renderPolarAxis", function(w, P, _) {
        var $ = lt(w, "type.axisType"), E = lt(y.state, "".concat($, "Map")), j = w.type.defaultProps, C = j !== void 0 ? L(L({}, j), w.props) : w.props, D = E && E[C["".concat($, "Id")]];
        return /* @__PURE__ */ ze(w, L(L({}, D), {}, {
          className: le($, D.className),
          key: w.key || "".concat(P, "-").concat(_),
          ticks: Yt(D, !0)
        }));
      }), ne(y, "renderPolarGrid", function(w) {
        var P = w.props, _ = P.radialLines, $ = P.polarAngles, E = P.polarRadius, j = y.state, C = j.radiusAxisMap, D = j.angleAxisMap, I = dr(C), R = dr(D), F = R.cx, k = R.cy, z = R.innerRadius, V = R.outerRadius;
        return /* @__PURE__ */ ze(w, {
          polarAngles: Array.isArray($) ? $ : Yt(R, !0).map(function(N) {
            return N.coordinate;
          }),
          polarRadius: Array.isArray(E) ? E : Yt(I, !0).map(function(N) {
            return N.coordinate;
          }),
          cx: F,
          cy: k,
          innerRadius: z,
          outerRadius: V,
          key: w.key || "polar-grid",
          radialLines: _
        });
      }), ne(y, "renderLegend", function() {
        var w = y.state.formattedGraphicalItems, P = y.props, _ = P.children, $ = P.width, E = P.height, j = y.props.margin || {}, C = $ - (j.left || 0) - (j.right || 0), D = Zg({
          children: _,
          formattedGraphicalItems: w,
          legendWidth: C,
          legendContent: l
        });
        if (!D)
          return null;
        var I = D.item, R = am(D, hU);
        return /* @__PURE__ */ ze(I, L(L({}, R), {}, {
          chartWidth: $,
          chartHeight: E,
          margin: j,
          onBBoxUpdate: y.handleLegendBBoxUpdate
        }));
      }), ne(y, "renderTooltip", function() {
        var w, P = y.props, _ = P.children, $ = P.accessibilityLayer, E = ct(_, Ct);
        if (!E)
          return null;
        var j = y.state, C = j.isTooltipActive, D = j.activeCoordinate, I = j.activePayload, R = j.activeLabel, F = j.offset, k = (w = E.props.active) !== null && w !== void 0 ? w : C;
        return /* @__PURE__ */ ze(E, {
          viewBox: L(L({}, F), {}, {
            x: F.left,
            y: F.top
          }),
          active: k,
          label: R,
          payload: k ? I : [],
          coordinate: D,
          accessibilityLayer: $
        });
      }), ne(y, "renderBrush", function(w) {
        var P = y.props, _ = P.margin, $ = P.data, E = y.state, j = E.offset, C = E.dataStartIndex, D = E.dataEndIndex, I = E.updateId;
        return /* @__PURE__ */ ze(w, {
          key: w.key || "_recharts-brush",
          onChange: Li(y.handleBrushChange, w.props.onChange),
          data: $,
          x: H(w.props.x) ? w.props.x : j.left,
          y: H(w.props.y) ? w.props.y : j.top + j.height + j.brushBottom - (_.bottom || 0),
          width: H(w.props.width) ? w.props.width : j.width,
          startIndex: C,
          endIndex: D,
          updateId: "brush-".concat(I)
        });
      }), ne(y, "renderReferenceElement", function(w, P, _) {
        if (!w)
          return null;
        var $ = y, E = $.clipPathId, j = y.state, C = j.xAxisMap, D = j.yAxisMap, I = j.offset, R = w.type.defaultProps || {}, F = w.props, k = F.xAxisId, z = k === void 0 ? R.xAxisId : k, V = F.yAxisId, N = V === void 0 ? R.yAxisId : V;
        return /* @__PURE__ */ ze(w, {
          key: w.key || "".concat(P, "-").concat(_),
          xAxis: C[z],
          yAxis: D[N],
          viewBox: {
            x: I.left,
            y: I.top,
            width: I.width,
            height: I.height
          },
          clipPathId: E
        });
      }), ne(y, "renderActivePoints", function(w) {
        var P = w.item, _ = w.activePoint, $ = w.basePoint, E = w.childIndex, j = w.isRange, C = [], D = P.props.key, I = P.item.type.defaultProps !== void 0 ? L(L({}, P.item.type.defaultProps), P.item.props) : P.item.props, R = I.activeDot, F = I.dataKey, k = L(L({
          index: E,
          dataKey: F,
          cx: _.x,
          cy: _.y,
          r: 4,
          fill: Of(P.item),
          strokeWidth: 2,
          stroke: "#fff",
          payload: _.payload,
          value: _.value
        }, te(R, !1)), to(R));
        return C.push(b.renderActiveDot(R, k, "".concat(D, "-activePoint-").concat(E))), $ ? C.push(b.renderActiveDot(R, L(L({}, k), {}, {
          cx: $.x,
          cy: $.y
        }), "".concat(D, "-basePoint-").concat(E))) : j && C.push(null), C;
      }), ne(y, "renderGraphicChild", function(w, P, _) {
        var $ = y.filterFormatItem(w, P, _);
        if (!$)
          return null;
        var E = y.getTooltipEventType(), j = y.state, C = j.isTooltipActive, D = j.tooltipAxis, I = j.activeTooltipIndex, R = j.activeLabel, F = y.props.children, k = ct(F, Ct), z = $.props, V = z.points, N = z.isRange, B = z.baseLine, W = $.item.type.defaultProps !== void 0 ? L(L({}, $.item.type.defaultProps), $.item.props) : $.item.props, Y = W.activeDot, X = W.hide, ee = W.activeBar, re = W.activeShape, oe = !!(!X && C && k && (Y || ee || re)), ae = {};
        E !== "axis" && k && k.props.trigger === "click" ? ae = {
          onClick: Li(y.handleItemMouseEnter, w.props.onClick)
        } : E !== "axis" && (ae = {
          onMouseLeave: Li(y.handleItemMouseLeave, w.props.onMouseLeave),
          onMouseEnter: Li(y.handleItemMouseEnter, w.props.onMouseEnter)
        });
        var U = /* @__PURE__ */ ze(w, L(L({}, $.props), ae));
        function K(Ut) {
          return typeof D.dataKey == "function" ? D.dataKey(Ut.payload) : null;
        }
        if (oe)
          if (I >= 0) {
            var Q, M;
            if (D.dataKey && !D.allowDuplicatedCategory) {
              var fe = typeof D.dataKey == "function" ? K : "payload.".concat(D.dataKey.toString());
              Q = eo(V, fe, R), M = N && B && eo(B, fe, R);
            } else
              Q = V == null ? void 0 : V[I], M = N && B && B[I];
            if (re || ee) {
              var G = w.props.activeIndex !== void 0 ? w.props.activeIndex : I;
              return [/* @__PURE__ */ ze(w, L(L(L({}, $.props), ae), {}, {
                activeIndex: G
              })), null, null];
            }
            if (!ce(Q))
              return [U].concat(Yn(y.renderActivePoints({
                item: $,
                activePoint: Q,
                basePoint: M,
                childIndex: I,
                isRange: N
              })));
          } else {
            var Ee, ke = (Ee = y.getItemByXY(y.state.activeCoordinate)) !== null && Ee !== void 0 ? Ee : {
              graphicalItem: U
            }, Ye = ke.graphicalItem, sr = Ye.item, rn = sr === void 0 ? w : sr, Ai = Ye.childIndex, Er = L(L(L({}, $.props), ae), {}, {
              activeIndex: Ai
            });
            return [/* @__PURE__ */ ze(rn, Er), null, null];
          }
        return N ? [U, null, null] : [U, null];
      }), ne(y, "renderCustomized", function(w, P, _) {
        return /* @__PURE__ */ ze(w, L(L({
          key: "recharts-customized-".concat(_)
        }, y.props), y.state));
      }), ne(y, "renderMap", {
        CartesianGrid: {
          handler: Ui,
          once: !0
        },
        ReferenceArea: {
          handler: y.renderReferenceElement
        },
        ReferenceLine: {
          handler: Ui
        },
        ReferenceDot: {
          handler: y.renderReferenceElement
        },
        XAxis: {
          handler: Ui
        },
        YAxis: {
          handler: Ui
        },
        Brush: {
          handler: y.renderBrush,
          once: !0
        },
        Bar: {
          handler: y.renderGraphicChild
        },
        Line: {
          handler: y.renderGraphicChild
        },
        Area: {
          handler: y.renderGraphicChild
        },
        Radar: {
          handler: y.renderGraphicChild
        },
        RadialBar: {
          handler: y.renderGraphicChild
        },
        Scatter: {
          handler: y.renderGraphicChild
        },
        Pie: {
          handler: y.renderGraphicChild
        },
        Funnel: {
          handler: y.renderGraphicChild
        },
        Tooltip: {
          handler: y.renderCursor,
          once: !0
        },
        PolarGrid: {
          handler: y.renderPolarGrid,
          once: !0
        },
        PolarAngleAxis: {
          handler: y.renderPolarAxis
        },
        PolarRadiusAxis: {
          handler: y.renderPolarAxis
        },
        Customized: {
          handler: y.renderCustomized
        }
      }), y.clipPathId = "".concat((O = g.id) !== null && O !== void 0 ? O : na("recharts"), "-clip"), y.throttleTriggeredAfterMouseMove = Zy(y.triggeredAfterMouseMove, (S = g.throttleDelay) !== null && S !== void 0 ? S : 1e3 / 60), y.state = {}, y;
    }
    return _U(b, p), xU(b, [{
      key: "componentDidMount",
      value: function() {
        var O, S;
        this.addListener(), this.accessibilityManager.setDetails({
          container: this.container,
          offset: {
            left: (O = this.props.margin.left) !== null && O !== void 0 ? O : 0,
            top: (S = this.props.margin.top) !== null && S !== void 0 ? S : 0
          },
          coordinateList: this.state.tooltipTicks,
          mouseHandlerCallback: this.triggeredAfterMouseMove,
          layout: this.props.layout
        }), this.displayDefaultTooltip();
      }
    }, {
      key: "displayDefaultTooltip",
      value: function() {
        var O = this.props, S = O.children, y = O.data, w = O.height, P = O.layout, _ = ct(S, Ct);
        if (_) {
          var $ = _.props.defaultIndex;
          if (!(typeof $ != "number" || $ < 0 || $ > this.state.tooltipTicks.length - 1)) {
            var E = this.state.tooltipTicks[$] && this.state.tooltipTicks[$].value, j = mu(this.state, y, $, E), C = this.state.tooltipTicks[$].coordinate, D = (this.state.offset.top + w) / 2, I = P === "horizontal", R = I ? {
              x: C,
              y: D
            } : {
              y: C,
              x: D
            }, F = this.state.formattedGraphicalItems.find(function(z) {
              var V = z.item;
              return V.type.name === "Scatter";
            });
            F && (R = L(L({}, R), F.props.points[$].tooltipPosition), j = F.props.points[$].tooltipPayload);
            var k = {
              activeTooltipIndex: $,
              isTooltipActive: !0,
              activeLabel: E,
              activePayload: j,
              activeCoordinate: R
            };
            this.setState(k), this.renderCursor(_), this.accessibilityManager.setIndex($);
          }
        }
      }
    }, {
      key: "getSnapshotBeforeUpdate",
      value: function(O, S) {
        if (!this.props.accessibilityLayer)
          return null;
        if (this.state.tooltipTicks !== S.tooltipTicks && this.accessibilityManager.setDetails({
          coordinateList: this.state.tooltipTicks
        }), this.props.layout !== O.layout && this.accessibilityManager.setDetails({
          layout: this.props.layout
        }), this.props.margin !== O.margin) {
          var y, w;
          this.accessibilityManager.setDetails({
            offset: {
              left: (y = this.props.margin.left) !== null && y !== void 0 ? y : 0,
              top: (w = this.props.margin.top) !== null && w !== void 0 ? w : 0
            }
          });
        }
        return null;
      }
    }, {
      key: "componentDidUpdate",
      value: function(O) {
        qs([ct(O.children, Ct)], [ct(this.props.children, Ct)]) || this.displayDefaultTooltip();
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel();
      }
    }, {
      key: "getTooltipEventType",
      value: function() {
        var O = ct(this.props.children, Ct);
        if (O && typeof O.props.shared == "boolean") {
          var S = O.props.shared ? "axis" : "item";
          return c.indexOf(S) >= 0 ? S : i;
        }
        return i;
      }
      /**
       * Get the information of mouse in chart, return null when the mouse is not in the chart
       * @param  {MousePointer} event    The event object
       * @return {Object}          Mouse data
       */
    }, {
      key: "getMouseInfo",
      value: function(O) {
        if (!this.container)
          return null;
        var S = this.container, y = S.getBoundingClientRect(), w = Ok(y), P = {
          chartX: Math.round(O.pageX - w.left),
          chartY: Math.round(O.pageY - w.top)
        }, _ = y.width / S.offsetWidth || 1, $ = this.inRange(P.chartX, P.chartY, _);
        if (!$)
          return null;
        var E = this.state, j = E.xAxisMap, C = E.yAxisMap, D = this.getTooltipEventType(), I = om(this.state, this.props.data, this.props.layout, $);
        if (D !== "axis" && j && C) {
          var R = dr(j).scale, F = dr(C).scale, k = R && R.invert ? R.invert(P.chartX) : null, z = F && F.invert ? F.invert(P.chartY) : null;
          return L(L({}, P), {}, {
            xValue: k,
            yValue: z
          }, I);
        }
        return I ? L(L({}, P), I) : null;
      }
    }, {
      key: "inRange",
      value: function(O, S) {
        var y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, w = this.props.layout, P = O / y, _ = S / y;
        if (w === "horizontal" || w === "vertical") {
          var $ = this.state.offset, E = P >= $.left && P <= $.left + $.width && _ >= $.top && _ <= $.top + $.height;
          return E ? {
            x: P,
            y: _
          } : null;
        }
        var j = this.state, C = j.angleAxisMap, D = j.radiusAxisMap;
        if (C && D) {
          var I = dr(C);
          return Sp({
            x: P,
            y: _
          }, I);
        }
        return null;
      }
    }, {
      key: "parseEventsOfWrapper",
      value: function() {
        var O = this.props.children, S = this.getTooltipEventType(), y = ct(O, Ct), w = {};
        y && S === "axis" && (y.props.trigger === "click" ? w = {
          onClick: this.handleClick
        } : w = {
          onMouseEnter: this.handleMouseEnter,
          onDoubleClick: this.handleDoubleClick,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd,
          onContextMenu: this.handleContextMenu
        });
        var P = to(this.props, this.handleOuterEvent);
        return L(L({}, P), w);
      }
    }, {
      key: "addListener",
      value: function() {
        Is.on(Ds, this.handleReceiveSyncEvent);
      }
    }, {
      key: "removeListener",
      value: function() {
        Is.removeListener(Ds, this.handleReceiveSyncEvent);
      }
    }, {
      key: "filterFormatItem",
      value: function(O, S, y) {
        for (var w = this.state.formattedGraphicalItems, P = 0, _ = w.length; P < _; P++) {
          var $ = w[P];
          if ($.item === O || $.props.key === O.key || S === Xt($.item.type) && y === $.childIndex)
            return $;
        }
        return null;
      }
    }, {
      key: "renderClipPath",
      value: function() {
        var O = this.clipPathId, S = this.state.offset, y = S.left, w = S.top, P = S.height, _ = S.width;
        return /* @__PURE__ */ T.createElement("defs", null, /* @__PURE__ */ T.createElement("clipPath", {
          id: O
        }, /* @__PURE__ */ T.createElement("rect", {
          x: y,
          y: w,
          height: P,
          width: _
        })));
      }
    }, {
      key: "getXScales",
      value: function() {
        var O = this.state.xAxisMap;
        return O ? Object.entries(O).reduce(function(S, y) {
          var w = nm(y, 2), P = w[0], _ = w[1];
          return L(L({}, S), {}, ne({}, P, _.scale));
        }, {}) : null;
      }
    }, {
      key: "getYScales",
      value: function() {
        var O = this.state.yAxisMap;
        return O ? Object.entries(O).reduce(function(S, y) {
          var w = nm(y, 2), P = w[0], _ = w[1];
          return L(L({}, S), {}, ne({}, P, _.scale));
        }, {}) : null;
      }
    }, {
      key: "getXScaleByAxisId",
      value: function(O) {
        var S;
        return (S = this.state.xAxisMap) === null || S === void 0 || (S = S[O]) === null || S === void 0 ? void 0 : S.scale;
      }
    }, {
      key: "getYScaleByAxisId",
      value: function(O) {
        var S;
        return (S = this.state.yAxisMap) === null || S === void 0 || (S = S[O]) === null || S === void 0 ? void 0 : S.scale;
      }
    }, {
      key: "getItemByXY",
      value: function(O) {
        var S = this.state, y = S.formattedGraphicalItems, w = S.activeItem;
        if (y && y.length)
          for (var P = 0, _ = y.length; P < _; P++) {
            var $ = y[P], E = $.props, j = $.item, C = j.type.defaultProps !== void 0 ? L(L({}, j.type.defaultProps), j.props) : j.props, D = Xt(j.type);
            if (D === "Bar") {
              var I = (E.data || []).find(function(z) {
                return h6(O, z);
              });
              if (I)
                return {
                  graphicalItem: $,
                  payload: I
                };
            } else if (D === "RadialBar") {
              var R = (E.data || []).find(function(z) {
                return Sp(O, z);
              });
              if (R)
                return {
                  graphicalItem: $,
                  payload: R
                };
            } else if (Rc($, w) || Lc($, w) || si($, w)) {
              var F = tz({
                graphicalItem: $,
                activeTooltipItem: w,
                itemData: C.data
              }), k = C.activeIndex === void 0 ? F : C.activeIndex;
              return {
                graphicalItem: L(L({}, $), {}, {
                  childIndex: k
                }),
                payload: si($, w) ? C.data[F] : $.props.data[F]
              };
            }
          }
        return null;
      }
    }, {
      key: "render",
      value: function() {
        var O = this;
        if (!hd(this))
          return null;
        var S = this.props, y = S.children, w = S.className, P = S.width, _ = S.height, $ = S.style, E = S.compact, j = S.title, C = S.desc, D = am(S, pU), I = te(D, !1);
        if (E)
          return /* @__PURE__ */ T.createElement(Bv, {
            state: this.state,
            width: this.props.width,
            height: this.props.height,
            clipPathId: this.clipPathId
          }, /* @__PURE__ */ T.createElement(Gs, pn({}, I, {
            width: P,
            height: _,
            title: j,
            desc: C
          }), this.renderClipPath(), vd(y, this.renderMap)));
        if (this.props.accessibilityLayer) {
          var R, F;
          I.tabIndex = (R = this.props.tabIndex) !== null && R !== void 0 ? R : 0, I.role = (F = this.props.role) !== null && F !== void 0 ? F : "application", I.onKeyDown = function(z) {
            O.accessibilityManager.keyboardEvent(z);
          }, I.onFocus = function() {
            O.accessibilityManager.focus();
          };
        }
        var k = this.parseEventsOfWrapper();
        return /* @__PURE__ */ T.createElement(Bv, {
          state: this.state,
          width: this.props.width,
          height: this.props.height,
          clipPathId: this.clipPathId
        }, /* @__PURE__ */ T.createElement("div", pn({
          className: le("recharts-wrapper", w),
          style: L({
            position: "relative",
            cursor: "default",
            width: P,
            height: _
          }, $)
        }, k, {
          ref: function(V) {
            O.container = V;
          }
        }), /* @__PURE__ */ T.createElement(Gs, pn({}, I, {
          width: P,
          height: _,
          title: j,
          desc: C,
          style: MU
        }), this.renderClipPath(), vd(y, this.renderMap)), this.renderLegend(), this.renderTooltip()));
      }
    }]);
  }(gm);
  ne(m, "displayName", r), ne(m, "defaultProps", L({
    layout: "horizontal",
    stackOffset: "none",
    barCategoryGap: "10%",
    barGap: 4,
    margin: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    reverseStackOrder: !1,
    syncMethod: "index"
  }, u)), ne(m, "getDerivedStateFromProps", function(p, b) {
    var g = p.dataKey, O = p.data, S = p.children, y = p.width, w = p.height, P = p.layout, _ = p.stackOffset, $ = p.margin, E = b.dataStartIndex, j = b.dataEndIndex;
    if (b.updateId === void 0) {
      var C = cm(p);
      return L(L(L({}, C), {}, {
        updateId: 0
      }, h(L(L({
        props: p
      }, C), {}, {
        updateId: 0
      }), b)), {}, {
        prevDataKey: g,
        prevData: O,
        prevWidth: y,
        prevHeight: w,
        prevLayout: P,
        prevStackOffset: _,
        prevMargin: $,
        prevChildren: S
      });
    }
    if (g !== b.prevDataKey || O !== b.prevData || y !== b.prevWidth || w !== b.prevHeight || P !== b.prevLayout || _ !== b.prevStackOffset || !vn($, b.prevMargin)) {
      var D = cm(p), I = {
        // (chartX, chartY) are (0,0) in default state, but we want to keep the last mouse position to avoid
        // any flickering
        chartX: b.chartX,
        chartY: b.chartY,
        // The tooltip should stay active when it was active in the previous render. If this is not
        // the case, the tooltip disappears and immediately re-appears, causing a flickering effect
        isTooltipActive: b.isTooltipActive
      }, R = L(L({}, om(b, O, P)), {}, {
        updateId: b.updateId + 1
      }), F = L(L(L({}, D), I), R);
      return L(L(L({}, F), h(L({
        props: p
      }, F), b)), {}, {
        prevDataKey: g,
        prevData: O,
        prevWidth: y,
        prevHeight: w,
        prevLayout: P,
        prevStackOffset: _,
        prevMargin: $,
        prevChildren: S
      });
    }
    if (!qs(S, b.prevChildren)) {
      var k, z, V, N, B = ct(S, Rn), W = B && (k = (z = B.props) === null || z === void 0 ? void 0 : z.startIndex) !== null && k !== void 0 ? k : E, Y = B && (V = (N = B.props) === null || N === void 0 ? void 0 : N.endIndex) !== null && V !== void 0 ? V : j, X = W !== E || Y !== j, ee = !ce(O), re = ee && !X ? b.updateId : b.updateId + 1;
      return L(L({
        updateId: re
      }, h(L(L({
        props: p
      }, b), {}, {
        updateId: re,
        dataStartIndex: W,
        dataEndIndex: Y
      }), b)), {}, {
        prevChildren: S,
        dataStartIndex: W,
        dataEndIndex: Y
      });
    }
    return null;
  }), ne(m, "renderActiveDot", function(p, b, g) {
    var O;
    return /* @__PURE__ */ Pt(p) ? O = /* @__PURE__ */ ze(p, b) : ie(p) ? O = p(b) : O = /* @__PURE__ */ T.createElement(jc, b), /* @__PURE__ */ T.createElement(pe, {
      className: "recharts-active-dot",
      key: g
    }, O);
  });
  var v = /* @__PURE__ */ oc(function(b, g) {
    return /* @__PURE__ */ T.createElement(m, pn({}, b, {
      ref: g
    }));
  });
  return v.displayName = m.displayName, v;
}, zU = P0({
  chartName: "PieChart",
  GraphicalChild: cr,
  validateTooltipEventTypes: ["item"],
  defaultTooltipEventType: "item",
  legendContent: "children",
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: Dc
  }, {
    axisType: "radiusAxis",
    AxisComp: kc
  }],
  formatAxisMap: gF,
  defaultProps: {
    layout: "centric",
    startAngle: 0,
    endAngle: 360,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
}), WU = P0({
  chartName: "AreaChart",
  GraphicalChild: Ar,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: Vc
  }, {
    axisType: "yAxis",
    AxisComp: qc
  }],
  formatAxisMap: NW
});
const UU = { Pagada: "success", Pendiente: "warning", Emitida: "info", Cancelada: "danger", Aceptada: "success", Aplicada: "success", Enviada: "info", Borrador: "muted", Rechazada: "danger", Convertida: "muted" };
function br({ estado: e, children: t }) {
  const r = t ?? e ?? "";
  return /* @__PURE__ */ x("span", { className: `fact-badge fact-badge--${UU[e ?? String(r)] ?? "muted"}`, children: r });
}
function ve({ children: e, className: t = "" }) {
  return /* @__PURE__ */ x("section", { className: `fact-card ${t}`, children: e });
}
function ut({ columnas: e, filas: t, vacio: r = "No hay registros para mostrar." }) {
  return /* @__PURE__ */ x("div", { className: "fact-table-wrap", children: /* @__PURE__ */ A("table", { className: "fact-table", children: [
    /* @__PURE__ */ x("thead", { children: /* @__PURE__ */ x("tr", { children: e.map((n) => /* @__PURE__ */ x("th", { className: n.className, children: n.titulo }, n.clave)) }) }),
    /* @__PURE__ */ x("tbody", { children: t.length ? t.map((n) => /* @__PURE__ */ x("tr", { children: e.map((a) => /* @__PURE__ */ x("td", { className: a.className, children: a.render(n) }, a.clave)) }, n.id)) : /* @__PURE__ */ x("tr", { children: /* @__PURE__ */ x("td", { colSpan: e.length, className: "fact-table__empty", children: r }) }) })
  ] }) });
}
function $t(e) {
  const t = Object.prototype.toString.call(e);
  return e instanceof Date || typeof e == "object" && t === "[object Date]" ? new e.constructor(+e) : typeof e == "number" || t === "[object Number]" || typeof e == "string" || t === "[object String]" ? new Date(e) : /* @__PURE__ */ new Date(NaN);
}
function Kr(e, t) {
  return e instanceof Date ? new e.constructor(t) : new Date(t);
}
const _0 = 6048e5, VU = 864e5, A0 = 6e4, E0 = 36e5;
let qU = {};
function Gc() {
  return qU;
}
function pi(e, t) {
  var c, s, l, f;
  const r = Gc(), n = (t == null ? void 0 : t.weekStartsOn) ?? ((s = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : s.weekStartsOn) ?? r.weekStartsOn ?? ((f = (l = r.locale) == null ? void 0 : l.options) == null ? void 0 : f.weekStartsOn) ?? 0, a = $t(e), i = a.getDay(), o = (i < n ? 7 : 0) + i - n;
  return a.setDate(a.getDate() - o), a.setHours(0, 0, 0, 0), a;
}
function ic(e) {
  return pi(e, { weekStartsOn: 1 });
}
function T0(e) {
  const t = $t(e), r = t.getFullYear(), n = Kr(e, 0);
  n.setFullYear(r + 1, 0, 4), n.setHours(0, 0, 0, 0);
  const a = ic(n), i = Kr(e, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const o = ic(i);
  return t.getTime() >= a.getTime() ? r + 1 : t.getTime() >= o.getTime() ? r : r - 1;
}
function lm(e) {
  const t = $t(e);
  return t.setHours(0, 0, 0, 0), t;
}
function um(e) {
  const t = $t(e), r = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return r.setUTCFullYear(t.getFullYear()), +e - +r;
}
function HU(e, t) {
  const r = lm(e), n = lm(t), a = +r - um(r), i = +n - um(n);
  return Math.round((a - i) / VU);
}
function GU(e) {
  const t = T0(e), r = Kr(e, 0);
  return r.setFullYear(t, 0, 4), r.setHours(0, 0, 0, 0), ic(r);
}
function YU(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function $0(e) {
  if (!YU(e) && typeof e != "number")
    return !1;
  const t = $t(e);
  return !isNaN(Number(t));
}
function KU(e) {
  const t = $t(e), r = Kr(e, 0);
  return r.setFullYear(t.getFullYear(), 0, 1), r.setHours(0, 0, 0, 0), r;
}
const XU = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, ZU = (e, t, r) => {
  let n;
  const a = XU[e];
  return typeof a == "string" ? n = a : t === 1 ? n = a.one : n = a.other.replace("{{count}}", t.toString()), r != null && r.addSuffix ? r.comparison && r.comparison > 0 ? "in " + n : n + " ago" : n;
};
function wn(e) {
  return (t = {}) => {
    const r = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[r] || e.formats[e.defaultWidth];
  };
}
const JU = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, QU = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, eV = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, tV = {
  date: wn({
    formats: JU,
    defaultWidth: "full"
  }),
  time: wn({
    formats: QU,
    defaultWidth: "full"
  }),
  dateTime: wn({
    formats: eV,
    defaultWidth: "full"
  })
}, rV = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, nV = (e, t, r, n) => rV[e];
function Mt(e) {
  return (t, r) => {
    const n = r != null && r.context ? String(r.context) : "standalone";
    let a;
    if (n === "formatting" && e.formattingValues) {
      const o = e.defaultFormattingWidth || e.defaultWidth, c = r != null && r.width ? String(r.width) : o;
      a = e.formattingValues[c] || e.formattingValues[o];
    } else {
      const o = e.defaultWidth, c = r != null && r.width ? String(r.width) : e.defaultWidth;
      a = e.values[c] || e.values[o];
    }
    const i = e.argumentCallback ? e.argumentCallback(t) : t;
    return a[i];
  };
}
const aV = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, iV = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, oV = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, cV = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, sV = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, lV = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, uV = (e, t) => {
  const r = Number(e), n = r % 100;
  if (n > 20 || n < 10)
    switch (n % 10) {
      case 1:
        return r + "st";
      case 2:
        return r + "nd";
      case 3:
        return r + "rd";
    }
  return r + "th";
}, fV = {
  ordinalNumber: uV,
  era: Mt({
    values: aV,
    defaultWidth: "wide"
  }),
  quarter: Mt({
    values: iV,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Mt({
    values: oV,
    defaultWidth: "wide"
  }),
  day: Mt({
    values: cV,
    defaultWidth: "wide"
  }),
  dayPeriod: Mt({
    values: sV,
    defaultWidth: "wide",
    formattingValues: lV,
    defaultFormattingWidth: "wide"
  })
};
function jt(e) {
  return (t, r = {}) => {
    const n = r.width, a = n && e.matchPatterns[n] || e.matchPatterns[e.defaultMatchWidth], i = t.match(a);
    if (!i)
      return null;
    const o = i[0], c = n && e.parsePatterns[n] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(c) ? hV(c, (u) => u.test(o)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      dV(c, (u) => u.test(o))
    );
    let l;
    l = e.valueCallback ? e.valueCallback(s) : s, l = r.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      r.valueCallback(l)
    ) : l;
    const f = t.slice(o.length);
    return { value: l, rest: f };
  };
}
function dV(e, t) {
  for (const r in e)
    if (Object.prototype.hasOwnProperty.call(e, r) && t(e[r]))
      return r;
}
function hV(e, t) {
  for (let r = 0; r < e.length; r++)
    if (t(e[r]))
      return r;
}
function C0(e) {
  return (t, r = {}) => {
    const n = t.match(e.matchPattern);
    if (!n) return null;
    const a = n[0], i = t.match(e.parsePattern);
    if (!i) return null;
    let o = e.valueCallback ? e.valueCallback(i[0]) : i[0];
    o = r.valueCallback ? r.valueCallback(o) : o;
    const c = t.slice(a.length);
    return { value: o, rest: c };
  };
}
const pV = /^(\d+)(th|st|nd|rd)?/i, vV = /\d+/i, mV = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, yV = {
  any: [/^b/i, /^(a|c)/i]
}, gV = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, bV = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, wV = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, xV = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, OV = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, SV = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, PV = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, _V = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, AV = {
  ordinalNumber: C0({
    matchPattern: pV,
    parsePattern: vV,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: jt({
    matchPatterns: mV,
    defaultMatchWidth: "wide",
    parsePatterns: yV,
    defaultParseWidth: "any"
  }),
  quarter: jt({
    matchPatterns: gV,
    defaultMatchWidth: "wide",
    parsePatterns: bV,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: jt({
    matchPatterns: wV,
    defaultMatchWidth: "wide",
    parsePatterns: xV,
    defaultParseWidth: "any"
  }),
  day: jt({
    matchPatterns: OV,
    defaultMatchWidth: "wide",
    parsePatterns: SV,
    defaultParseWidth: "any"
  }),
  dayPeriod: jt({
    matchPatterns: PV,
    defaultMatchWidth: "any",
    parsePatterns: _V,
    defaultParseWidth: "any"
  })
}, EV = {
  code: "en-US",
  formatDistance: ZU,
  formatLong: tV,
  formatRelative: nV,
  localize: fV,
  match: AV,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function TV(e) {
  const t = $t(e);
  return HU(t, KU(t)) + 1;
}
function $V(e) {
  const t = $t(e), r = +ic(t) - +GU(t);
  return Math.round(r / _0) + 1;
}
function M0(e, t) {
  var f, u, d, h;
  const r = $t(e), n = r.getFullYear(), a = Gc(), i = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (f = t == null ? void 0 : t.locale) == null ? void 0 : f.options) == null ? void 0 : u.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((h = (d = a.locale) == null ? void 0 : d.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, o = Kr(e, 0);
  o.setFullYear(n + 1, 0, i), o.setHours(0, 0, 0, 0);
  const c = pi(o, t), s = Kr(e, 0);
  s.setFullYear(n, 0, i), s.setHours(0, 0, 0, 0);
  const l = pi(s, t);
  return r.getTime() >= c.getTime() ? n + 1 : r.getTime() >= l.getTime() ? n : n - 1;
}
function CV(e, t) {
  var c, s, l, f;
  const r = Gc(), n = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((s = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : s.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((f = (l = r.locale) == null ? void 0 : l.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1, a = M0(e, t), i = Kr(e, 0);
  return i.setFullYear(a, 0, n), i.setHours(0, 0, 0, 0), pi(i, t);
}
function MV(e, t) {
  const r = $t(e), n = +pi(r, t) - +CV(r, t);
  return Math.round(n / _0) + 1;
}
function Se(e, t) {
  const r = e < 0 ? "-" : "", n = Math.abs(e).toString().padStart(t, "0");
  return r + n;
}
const lr = {
  // Year
  y(e, t) {
    const r = e.getFullYear(), n = r > 0 ? r : 1 - r;
    return Se(t === "yy" ? n % 100 : n, t.length);
  },
  // Month
  M(e, t) {
    const r = e.getMonth();
    return t === "M" ? String(r + 1) : Se(r + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return Se(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const r = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return r.toUpperCase();
      case "aaa":
        return r;
      case "aaaaa":
        return r[0];
      case "aaaa":
      default:
        return r === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return Se(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return Se(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return Se(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return Se(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const r = t.length, n = e.getMilliseconds(), a = Math.trunc(
      n * Math.pow(10, r - 3)
    );
    return Se(a, t.length);
  }
}, ln = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, fm = {
  // Era
  G: function(e, t, r) {
    const n = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      case "G":
      case "GG":
      case "GGG":
        return r.era(n, { width: "abbreviated" });
      case "GGGGG":
        return r.era(n, { width: "narrow" });
      case "GGGG":
      default:
        return r.era(n, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, r) {
    if (t === "yo") {
      const n = e.getFullYear(), a = n > 0 ? n : 1 - n;
      return r.ordinalNumber(a, { unit: "year" });
    }
    return lr.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, r, n) {
    const a = M0(e, n), i = a > 0 ? a : 1 - a;
    if (t === "YY") {
      const o = i % 100;
      return Se(o, 2);
    }
    return t === "Yo" ? r.ordinalNumber(i, { unit: "year" }) : Se(i, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const r = T0(e);
    return Se(r, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const r = e.getFullYear();
    return Se(r, t.length);
  },
  // Quarter
  Q: function(e, t, r) {
    const n = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(n);
      case "QQ":
        return Se(n, 2);
      case "Qo":
        return r.ordinalNumber(n, { unit: "quarter" });
      case "QQQ":
        return r.quarter(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return r.quarter(n, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return r.quarter(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, r) {
    const n = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "q":
        return String(n);
      case "qq":
        return Se(n, 2);
      case "qo":
        return r.ordinalNumber(n, { unit: "quarter" });
      case "qqq":
        return r.quarter(n, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return r.quarter(n, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return r.quarter(n, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, r) {
    const n = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return lr.M(e, t);
      case "Mo":
        return r.ordinalNumber(n + 1, { unit: "month" });
      case "MMM":
        return r.month(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return r.month(n, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return r.month(n, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, r) {
    const n = e.getMonth();
    switch (t) {
      case "L":
        return String(n + 1);
      case "LL":
        return Se(n + 1, 2);
      case "Lo":
        return r.ordinalNumber(n + 1, { unit: "month" });
      case "LLL":
        return r.month(n, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return r.month(n, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return r.month(n, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, r, n) {
    const a = MV(e, n);
    return t === "wo" ? r.ordinalNumber(a, { unit: "week" }) : Se(a, t.length);
  },
  // ISO week of year
  I: function(e, t, r) {
    const n = $V(e);
    return t === "Io" ? r.ordinalNumber(n, { unit: "week" }) : Se(n, t.length);
  },
  // Day of the month
  d: function(e, t, r) {
    return t === "do" ? r.ordinalNumber(e.getDate(), { unit: "date" }) : lr.d(e, t);
  },
  // Day of year
  D: function(e, t, r) {
    const n = TV(e);
    return t === "Do" ? r.ordinalNumber(n, { unit: "dayOfYear" }) : Se(n, t.length);
  },
  // Day of week
  E: function(e, t, r) {
    const n = e.getDay();
    switch (t) {
      case "E":
      case "EE":
      case "EEE":
        return r.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return r.day(n, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return r.day(n, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return r.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, r, n) {
    const a = e.getDay(), i = (a - n.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "e":
        return String(i);
      case "ee":
        return Se(i, 2);
      case "eo":
        return r.ordinalNumber(i, { unit: "day" });
      case "eee":
        return r.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return r.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return r.day(a, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return r.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, r, n) {
    const a = e.getDay(), i = (a - n.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "c":
        return String(i);
      case "cc":
        return Se(i, t.length);
      case "co":
        return r.ordinalNumber(i, { unit: "day" });
      case "ccc":
        return r.day(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return r.day(a, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return r.day(a, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return r.day(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, r) {
    const n = e.getDay(), a = n === 0 ? 7 : n;
    switch (t) {
      case "i":
        return String(a);
      case "ii":
        return Se(a, t.length);
      case "io":
        return r.ordinalNumber(a, { unit: "day" });
      case "iii":
        return r.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return r.day(n, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return r.day(n, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return r.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, r) {
    const a = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return r.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return r.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return r.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return r.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, r) {
    const n = e.getHours();
    let a;
    switch (n === 12 ? a = ln.noon : n === 0 ? a = ln.midnight : a = n / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return r.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return r.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return r.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return r.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, r) {
    const n = e.getHours();
    let a;
    switch (n >= 17 ? a = ln.evening : n >= 12 ? a = ln.afternoon : n >= 4 ? a = ln.morning : a = ln.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return r.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return r.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return r.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, r) {
    if (t === "ho") {
      let n = e.getHours() % 12;
      return n === 0 && (n = 12), r.ordinalNumber(n, { unit: "hour" });
    }
    return lr.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, r) {
    return t === "Ho" ? r.ordinalNumber(e.getHours(), { unit: "hour" }) : lr.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, r) {
    const n = e.getHours() % 12;
    return t === "Ko" ? r.ordinalNumber(n, { unit: "hour" }) : Se(n, t.length);
  },
  // Hour [1-24]
  k: function(e, t, r) {
    let n = e.getHours();
    return n === 0 && (n = 24), t === "ko" ? r.ordinalNumber(n, { unit: "hour" }) : Se(n, t.length);
  },
  // Minute
  m: function(e, t, r) {
    return t === "mo" ? r.ordinalNumber(e.getMinutes(), { unit: "minute" }) : lr.m(e, t);
  },
  // Second
  s: function(e, t, r) {
    return t === "so" ? r.ordinalNumber(e.getSeconds(), { unit: "second" }) : lr.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return lr.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, r) {
    const n = e.getTimezoneOffset();
    if (n === 0)
      return "Z";
    switch (t) {
      case "X":
        return hm(n);
      case "XXXX":
      case "XX":
        return kr(n);
      case "XXXXX":
      case "XXX":
      default:
        return kr(n, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, r) {
    const n = e.getTimezoneOffset();
    switch (t) {
      case "x":
        return hm(n);
      case "xxxx":
      case "xx":
        return kr(n);
      case "xxxxx":
      case "xxx":
      default:
        return kr(n, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, r) {
    const n = e.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + dm(n, ":");
      case "OOOO":
      default:
        return "GMT" + kr(n, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, r) {
    const n = e.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + dm(n, ":");
      case "zzzz":
      default:
        return "GMT" + kr(n, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, r) {
    const n = Math.trunc(e.getTime() / 1e3);
    return Se(n, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, r) {
    const n = e.getTime();
    return Se(n, t.length);
  }
};
function dm(e, t = "") {
  const r = e > 0 ? "-" : "+", n = Math.abs(e), a = Math.trunc(n / 60), i = n % 60;
  return i === 0 ? r + String(a) : r + String(a) + t + Se(i, 2);
}
function hm(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + Se(Math.abs(e) / 60, 2) : kr(e, t);
}
function kr(e, t = "") {
  const r = e > 0 ? "-" : "+", n = Math.abs(e), a = Se(Math.trunc(n / 60), 2), i = Se(n % 60, 2);
  return r + a + t + i;
}
const pm = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, j0 = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, jV = (e, t) => {
  const r = e.match(/(P+)(p+)?/) || [], n = r[1], a = r[2];
  if (!a)
    return pm(e, t);
  let i;
  switch (n) {
    case "P":
      i = t.dateTime({ width: "short" });
      break;
    case "PP":
      i = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      i = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      i = t.dateTime({ width: "full" });
      break;
  }
  return i.replace("{{date}}", pm(n, t)).replace("{{time}}", j0(a, t));
}, NV = {
  p: j0,
  P: jV
}, kV = /^D+$/, IV = /^Y+$/, DV = ["D", "DD", "YY", "YYYY"];
function RV(e) {
  return kV.test(e);
}
function LV(e) {
  return IV.test(e);
}
function FV(e, t, r) {
  const n = BV(e, t, r);
  if (console.warn(n), DV.includes(e)) throw new RangeError(n);
}
function BV(e, t, r) {
  const n = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${n} to the input \`${r}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const zV = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, WV = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, UV = /^'([^]*?)'?$/, VV = /''/g, qV = /[a-zA-Z]/;
function HV(e, t, r) {
  var f, u, d, h, m, v, p, b;
  const n = Gc(), a = (r == null ? void 0 : r.locale) ?? n.locale ?? EV, i = (r == null ? void 0 : r.firstWeekContainsDate) ?? ((u = (f = r == null ? void 0 : r.locale) == null ? void 0 : f.options) == null ? void 0 : u.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((h = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, o = (r == null ? void 0 : r.weekStartsOn) ?? ((v = (m = r == null ? void 0 : r.locale) == null ? void 0 : m.options) == null ? void 0 : v.weekStartsOn) ?? n.weekStartsOn ?? ((b = (p = n.locale) == null ? void 0 : p.options) == null ? void 0 : b.weekStartsOn) ?? 0, c = $t(e);
  if (!$0(c))
    throw new RangeError("Invalid time value");
  let s = t.match(WV).map((g) => {
    const O = g[0];
    if (O === "p" || O === "P") {
      const S = NV[O];
      return S(g, a.formatLong);
    }
    return g;
  }).join("").match(zV).map((g) => {
    if (g === "''")
      return { isToken: !1, value: "'" };
    const O = g[0];
    if (O === "'")
      return { isToken: !1, value: GV(g) };
    if (fm[O])
      return { isToken: !0, value: g };
    if (O.match(qV))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + O + "`"
      );
    return { isToken: !1, value: g };
  });
  a.localize.preprocessor && (s = a.localize.preprocessor(c, s));
  const l = {
    firstWeekContainsDate: i,
    weekStartsOn: o,
    locale: a
  };
  return s.map((g) => {
    if (!g.isToken) return g.value;
    const O = g.value;
    (!(r != null && r.useAdditionalWeekYearTokens) && LV(O) || !(r != null && r.useAdditionalDayOfYearTokens) && RV(O)) && FV(O, t, String(e));
    const S = fm[O[0]];
    return S(c, O, a.localize, l);
  }).join("");
}
function GV(e) {
  const t = e.match(UV);
  return t ? t[1].replace(VV, "'") : e;
}
function YV(e, t) {
  const n = JV(e);
  let a;
  if (n.date) {
    const s = QV(n.date, 2);
    a = e7(s.restDateString, s.year);
  }
  if (!a || isNaN(a.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  const i = a.getTime();
  let o = 0, c;
  if (n.time && (o = t7(n.time), isNaN(o)))
    return /* @__PURE__ */ new Date(NaN);
  if (n.timezone) {
    if (c = r7(n.timezone), isNaN(c))
      return /* @__PURE__ */ new Date(NaN);
  } else {
    const s = new Date(i + o), l = /* @__PURE__ */ new Date(0);
    return l.setFullYear(
      s.getUTCFullYear(),
      s.getUTCMonth(),
      s.getUTCDate()
    ), l.setHours(
      s.getUTCHours(),
      s.getUTCMinutes(),
      s.getUTCSeconds(),
      s.getUTCMilliseconds()
    ), l;
  }
  return new Date(i + o + c);
}
const Vi = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, KV = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, XV = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, ZV = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function JV(e) {
  const t = {}, r = e.split(Vi.dateTimeDelimiter);
  let n;
  if (r.length > 2)
    return t;
  if (/:/.test(r[0]) ? n = r[0] : (t.date = r[0], n = r[1], Vi.timeZoneDelimiter.test(t.date) && (t.date = e.split(Vi.timeZoneDelimiter)[0], n = e.substr(
    t.date.length,
    e.length
  ))), n) {
    const a = Vi.timezone.exec(n);
    a ? (t.time = n.replace(a[1], ""), t.timezone = a[1]) : t.time = n;
  }
  return t;
}
function QV(e, t) {
  const r = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + t) + "})|(\\d{2}|[+-]\\d{" + (2 + t) + "})$)"
  ), n = e.match(r);
  if (!n) return { year: NaN, restDateString: "" };
  const a = n[1] ? parseInt(n[1]) : null, i = n[2] ? parseInt(n[2]) : null;
  return {
    year: i === null ? a : i * 100,
    restDateString: e.slice((n[1] || n[2]).length)
  };
}
function e7(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const r = e.match(KV);
  if (!r) return /* @__PURE__ */ new Date(NaN);
  const n = !!r[4], a = Oa(r[1]), i = Oa(r[2]) - 1, o = Oa(r[3]), c = Oa(r[4]), s = Oa(r[5]) - 1;
  if (n)
    return c7(t, c, s) ? n7(t, c, s) : /* @__PURE__ */ new Date(NaN);
  {
    const l = /* @__PURE__ */ new Date(0);
    return !i7(t, i, o) || !o7(t, a) ? /* @__PURE__ */ new Date(NaN) : (l.setUTCFullYear(t, i, Math.max(a, o)), l);
  }
}
function Oa(e) {
  return e ? parseInt(e) : 1;
}
function t7(e) {
  const t = e.match(XV);
  if (!t) return NaN;
  const r = Ls(t[1]), n = Ls(t[2]), a = Ls(t[3]);
  return s7(r, n, a) ? r * E0 + n * A0 + a * 1e3 : NaN;
}
function Ls(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function r7(e) {
  if (e === "Z") return 0;
  const t = e.match(ZV);
  if (!t) return 0;
  const r = t[1] === "+" ? -1 : 1, n = parseInt(t[2]), a = t[3] && parseInt(t[3]) || 0;
  return l7(n, a) ? r * (n * E0 + a * A0) : NaN;
}
function n7(e, t, r) {
  const n = /* @__PURE__ */ new Date(0);
  n.setUTCFullYear(e, 0, 4);
  const a = n.getUTCDay() || 7, i = (t - 1) * 7 + r + 1 - a;
  return n.setUTCDate(n.getUTCDate() + i), n;
}
const a7 = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function N0(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function i7(e, t, r) {
  return t >= 0 && t <= 11 && r >= 1 && r <= (a7[t] || (N0(e) ? 29 : 28));
}
function o7(e, t) {
  return t >= 1 && t <= (N0(e) ? 366 : 365);
}
function c7(e, t, r) {
  return t >= 1 && t <= 53 && r >= 0 && r <= 6;
}
function s7(e, t, r) {
  return e === 24 ? t === 0 && r === 0 : r >= 0 && r < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function l7(e, t) {
  return t >= 0 && t <= 59;
}
const u7 = {
  lessThanXSeconds: {
    one: "menos de un segundo",
    other: "menos de {{count}} segundos"
  },
  xSeconds: {
    one: "1 segundo",
    other: "{{count}} segundos"
  },
  halfAMinute: "medio minuto",
  lessThanXMinutes: {
    one: "menos de un minuto",
    other: "menos de {{count}} minutos"
  },
  xMinutes: {
    one: "1 minuto",
    other: "{{count}} minutos"
  },
  aboutXHours: {
    one: "alrededor de 1 hora",
    other: "alrededor de {{count}} horas"
  },
  xHours: {
    one: "1 hora",
    other: "{{count}} horas"
  },
  xDays: {
    one: "1 día",
    other: "{{count}} días"
  },
  aboutXWeeks: {
    one: "alrededor de 1 semana",
    other: "alrededor de {{count}} semanas"
  },
  xWeeks: {
    one: "1 semana",
    other: "{{count}} semanas"
  },
  aboutXMonths: {
    one: "alrededor de 1 mes",
    other: "alrededor de {{count}} meses"
  },
  xMonths: {
    one: "1 mes",
    other: "{{count}} meses"
  },
  aboutXYears: {
    one: "alrededor de 1 año",
    other: "alrededor de {{count}} años"
  },
  xYears: {
    one: "1 año",
    other: "{{count}} años"
  },
  overXYears: {
    one: "más de 1 año",
    other: "más de {{count}} años"
  },
  almostXYears: {
    one: "casi 1 año",
    other: "casi {{count}} años"
  }
}, f7 = (e, t, r) => {
  let n;
  const a = u7[e];
  return typeof a == "string" ? n = a : t === 1 ? n = a.one : n = a.other.replace("{{count}}", t.toString()), r != null && r.addSuffix ? r.comparison && r.comparison > 0 ? "en " + n : "hace " + n : n;
}, d7 = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, h7 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, p7 = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, v7 = {
  date: wn({
    formats: d7,
    defaultWidth: "full"
  }),
  time: wn({
    formats: h7,
    defaultWidth: "full"
  }),
  dateTime: wn({
    formats: p7,
    defaultWidth: "full"
  })
}, m7 = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'mañana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, y7 = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'mañana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
}, g7 = (e, t, r, n) => t.getHours() !== 1 ? y7[e] : m7[e], b7 = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "después de cristo"]
}, w7 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
}, x7 = {
  narrow: ["e", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic"
  ],
  wide: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
  ]
}, O7 = {
  narrow: ["d", "l", "m", "m", "j", "v", "s"],
  short: ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
  abbreviated: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  wide: [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado"
  ]
}, S7 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  }
}, P7 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  }
}, _7 = (e, t) => Number(e) + "º", A7 = {
  ordinalNumber: _7,
  era: Mt({
    values: b7,
    defaultWidth: "wide"
  }),
  quarter: Mt({
    values: w7,
    defaultWidth: "wide",
    argumentCallback: (e) => Number(e) - 1
  }),
  month: Mt({
    values: x7,
    defaultWidth: "wide"
  }),
  day: Mt({
    values: O7,
    defaultWidth: "wide"
  }),
  dayPeriod: Mt({
    values: S7,
    defaultWidth: "wide",
    formattingValues: P7,
    defaultFormattingWidth: "wide"
  })
}, E7 = /^(\d+)(º)?/i, T7 = /\d+/i, $7 = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
}, C7 = {
  any: [/^ac/i, /^dc/i],
  wide: [
    /^(antes de cristo|antes de la era com[uú]n)/i,
    /^(despu[eé]s de cristo|era com[uú]n)/i
  ]
}, M7 = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, j7 = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, N7 = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
}, k7 = {
  narrow: [
    /^e/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^en/i,
    /^feb/i,
    /^mar/i,
    /^abr/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^ago/i,
    /^sep/i,
    /^oct/i,
    /^nov/i,
    /^dic/i
  ]
}, I7 = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
}, D7 = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
}, R7 = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
}, L7 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn/i,
    noon: /^md/i,
    morning: /mañana/i,
    afternoon: /tarde/i,
    evening: /tarde/i,
    night: /noche/i
  }
}, F7 = {
  ordinalNumber: C0({
    matchPattern: E7,
    parsePattern: T7,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: jt({
    matchPatterns: $7,
    defaultMatchWidth: "wide",
    parsePatterns: C7,
    defaultParseWidth: "any"
  }),
  quarter: jt({
    matchPatterns: M7,
    defaultMatchWidth: "wide",
    parsePatterns: j7,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: jt({
    matchPatterns: N7,
    defaultMatchWidth: "wide",
    parsePatterns: k7,
    defaultParseWidth: "any"
  }),
  day: jt({
    matchPatterns: I7,
    defaultMatchWidth: "wide",
    parsePatterns: D7,
    defaultParseWidth: "any"
  }),
  dayPeriod: jt({
    matchPatterns: R7,
    defaultMatchWidth: "any",
    parsePatterns: L7,
    defaultParseWidth: "any"
  })
}, B7 = {
  code: "es",
  formatDistance: f7,
  formatLong: v7,
  formatRelative: g7,
  localize: A7,
  match: F7,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
}, z7 = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
function he(e) {
  return z7.format(Number.isFinite(e) ? e : 0);
}
function Ft(e, t = "d MMM yyyy") {
  const r = typeof e == "string" ? YV(e) : e;
  return $0(r) ? HV(r, t, { locale: B7 }) : "Fecha no disponible";
}
function W7() {
  const e = Oe((u) => u.facturas), t = "2026-09-30", r = e.filter((u) => u.fecha.startsWith("2026-09") && u.estado !== "Cancelada"), n = e.filter((u) => ["Pendiente", "Emitida"].includes(u.estado)).reduce((u, d) => u + d.total, 0), a = e.filter((u) => u.fecha === t && u.estado !== "Cancelada").reduce((u, d) => u + d.total, 0), i = e.filter((u) => u.estado === "Pagada").length, o = e.filter((u) => ["Pendiente", "Emitida"].includes(u.estado)).length, c = e.filter((u) => u.estado === "Cancelada").length, s = [
    { clave: "folio", titulo: "Folio", render: (u) => /* @__PURE__ */ x("span", { className: "fact-cell-main", children: u.folio }) },
    { clave: "cliente", titulo: "Cliente", render: (u) => /* @__PURE__ */ A(yr, { children: [
      /* @__PURE__ */ x("span", { className: "fact-cell-main", children: u.cliente }),
      /* @__PURE__ */ x("span", { className: "fact-cell-sub", children: u.rfc })
    ] }) },
    { clave: "fecha", titulo: "Fecha", render: (u) => Ft(u.fecha) },
    { clave: "total", titulo: "Total", render: (u) => /* @__PURE__ */ x("span", { className: "fact-cell-main", children: he(u.total) }) },
    { clave: "estado", titulo: "Estado", render: (u) => /* @__PURE__ */ x(br, { estado: u.estado }) }
  ], l = [{ name: "Pagadas", value: i, color: "#34D399" }, { name: "Pendientes", value: o, color: "#4F8DF7" }, { name: "Canceladas", value: c, color: "#F87171" }], f = [
    { titulo: "Facturado hoy", valor: he(a), nota: "vs. día anterior", icono: Vw, cambio: "+12.8%" },
    { titulo: "Facturado en el mes", valor: he(r.reduce((u, d) => u + d.total, 0)), nota: "Septiembre 2026", icono: _u, cambio: "+8.2%" },
    { titulo: "Por cobrar", valor: he(n), nota: `${o} facturas pendientes`, icono: Kw, cambio: "Atención" },
    { titulo: "Canceladas", valor: String(c).padStart(2, "0"), nota: "En el periodo actual", icono: Qi, cambio: "Este mes" }
  ];
  return /* @__PURE__ */ A("div", { className: "fact-page", children: [
    /* @__PURE__ */ A("div", { className: "fact-page-heading", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x("h2", { children: "Buenos días, Lucía" }),
        /* @__PURE__ */ x("p", { children: "Este es el resumen de tu operación al 30 de septiembre de 2026." })
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-actions", children: [
        /* @__PURE__ */ A("span", { className: "fact-button", children: [
          /* @__PURE__ */ x(Mw, { size: 15 }),
          " Últimos 30 días"
        ] }),
        /* @__PURE__ */ x(Na, { to: "/facturas/nueva", children: /* @__PURE__ */ x(de, { variante: "primario", icono: /* @__PURE__ */ x(Dm, { size: 15 }), children: "Nueva factura" }) })
      ] })
    ] }),
    /* @__PURE__ */ x("div", { className: "fact-kpis", children: f.map(({ titulo: u, valor: d, nota: h, icono: m, cambio: v }) => /* @__PURE__ */ A(ve, { className: "fact-kpi", children: [
      /* @__PURE__ */ A("div", { className: "fact-kpi__top", children: [
        /* @__PURE__ */ x("span", { children: u }),
        /* @__PURE__ */ x("span", { className: "fact-kpi__icon", children: /* @__PURE__ */ x(m, { size: 16 }) })
      ] }),
      /* @__PURE__ */ x("strong", { children: d }),
      /* @__PURE__ */ A("span", { className: "fact-kpi__note", children: [
        u !== "Canceladas" && /* @__PURE__ */ x(Xf, { size: 11, color: "#10B981" }),
        " ",
        h,
        " ",
        /* @__PURE__ */ x("span", { style: { color: "#10B981" }, children: v })
      ] })
    ] }, u)) }),
    /* @__PURE__ */ A("div", { className: "fact-dashboard-grid", children: [
      /* @__PURE__ */ A(ve, { children: [
        /* @__PURE__ */ A("div", { className: "fact-card__head", children: [
          /* @__PURE__ */ x("h3", { children: "Ventas de los últimos 7 días" }),
          /* @__PURE__ */ A("span", { className: "fact-badge fact-badge--success", children: [
            /* @__PURE__ */ x(Xf, { size: 11 }),
            " 8.4%"
          ] })
        ] }),
        /* @__PURE__ */ x("div", { className: "fact-chart", children: /* @__PURE__ */ x(vk, { width: "100%", height: "100%", children: /* @__PURE__ */ A(WU, { data: gw, margin: { top: 10, right: 14, left: -14, bottom: 0 }, children: [
          /* @__PURE__ */ x("defs", { children: /* @__PURE__ */ A("linearGradient", { id: "fact-ventas", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ x("stop", { offset: "0%", stopColor: "#4F8DF7", stopOpacity: 0.2 }),
            /* @__PURE__ */ x("stop", { offset: "100%", stopColor: "#4F8DF7", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ x(i0, { stroke: "#EDF0F4", strokeDasharray: "3 3", vertical: !1 }),
          /* @__PURE__ */ x(Vc, { dataKey: "dia", axisLine: !1, tickLine: !1, tick: { fill: "#8993A2", fontSize: 10 } }),
          /* @__PURE__ */ x(qc, { axisLine: !1, tickLine: !1, tick: { fill: "#8993A2", fontSize: 9 }, tickFormatter: (u) => `$${u / 1e3}k` }),
          /* @__PURE__ */ x(Ct, { formatter: (u) => he(Number(u)) }),
          /* @__PURE__ */ x(Ar, { type: "monotone", dataKey: "total", stroke: "#4F8DF7", strokeWidth: 2.5, fill: "url(#fact-ventas)" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ A(ve, { children: [
        /* @__PURE__ */ A("div", { className: "fact-card__head", children: [
          /* @__PURE__ */ x("h3", { children: "Estado de facturas" }),
          /* @__PURE__ */ x(km, { size: 16, color: "#8993A2" })
        ] }),
        /* @__PURE__ */ A("div", { className: "fact-donut-wrap", children: [
          /* @__PURE__ */ x("div", { className: "fact-donut", children: /* @__PURE__ */ A("div", { className: "fact-donut__label", children: [
            /* @__PURE__ */ x("strong", { children: e.length }),
            /* @__PURE__ */ x("span", { children: "Facturas" })
          ] }) }),
          /* @__PURE__ */ x("div", { className: "fact-legend", children: l.map((u, d) => /* @__PURE__ */ A("div", { className: "fact-legend__item", children: [
            /* @__PURE__ */ x("span", { className: `fact-legend__dot fact-legend__dot--${["green", "blue", "red"][d]}` }),
            u.name,
            /* @__PURE__ */ x("strong", { children: u.value })
          ] }, u.name)) })
        ] }),
        /* @__PURE__ */ x("div", { style: { display: "none" }, children: /* @__PURE__ */ x(zU, { children: /* @__PURE__ */ x(cr, { data: l, dataKey: "value" }) }) })
      ] })
    ] }),
    /* @__PURE__ */ A(ve, { children: [
      /* @__PURE__ */ A("div", { className: "fact-card__head", children: [
        /* @__PURE__ */ x("h3", { children: "Últimas facturas" }),
        /* @__PURE__ */ A(Na, { className: "fact-button fact-button--texto", to: "/facturas", children: [
          "Ver todas ",
          /* @__PURE__ */ x(Aw, { size: 13 })
        ] })
      ] }),
      /* @__PURE__ */ x("div", { style: { paddingTop: 12 }, children: /* @__PURE__ */ x(ut, { columnas: s, filas: e.slice(0, 5) }) })
    ] })
  ] });
}
function Qt({ abierto: e, titulo: t, onCerrar: r, children: n }) {
  return vi(() => {
    if (!e) return;
    const a = (i) => {
      i.key === "Escape" && r();
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [e, r]), e ? /* @__PURE__ */ x("div", { className: "fact-modal-backdrop", role: "presentation", onMouseDown: (a) => {
    a.target === a.currentTarget && r();
  }, children: /* @__PURE__ */ A("section", { className: "fact-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "fact-modal-title", children: [
    /* @__PURE__ */ A("header", { className: "fact-modal__header", children: [
      /* @__PURE__ */ x("h2", { id: "fact-modal-title", children: t }),
      /* @__PURE__ */ x("button", { className: "fact-icon-button", onClick: r, "aria-label": "Cerrar ventana", children: /* @__PURE__ */ x(Xw, { size: 18 }) })
    ] }),
    /* @__PURE__ */ x("div", { className: "fact-modal__body", children: n })
  ] }) }) : null;
}
function U7(e, t = 0, r = 0) {
  const n = e.reduce((o, c) => o + c.cantidad * c.precioUnitario - (c.descuento ?? 0), 0), a = e.reduce((o, c) => o + (c.cantidad * c.precioUnitario - (c.descuento ?? 0)) * c.iva / 100, 0), i = n * (t + r) / 100;
  return { subtotal: n, iva: a, retencionIsr: n * t / 100, retencionIva: n * r / 100, retenciones: i, total: n + a - i };
}
const vm = () => ({ id: `con-${Date.now()}-${Math.random()}`, claveSat: "", descripcion: "", unidad: "E48 - Servicio", cantidad: 1, precioUnitario: 0, iva: 16 });
function V7() {
  const e = xu(), t = Oe((k) => k.clientes), r = Oe((k) => k.productos), n = Oe((k) => k.agregarFactura), a = Oe((k) => k.datosFiscales), { api: i } = Ow(), [o, c] = J(""), [s, l] = J(""), [f, u] = J([vm()]), [d, h] = J("PPD"), [m, v] = J("Por definir"), [p, b] = J("2026-10-30"), [g, O] = J(0), [S, y] = J(0), [w, P] = J(""), [_, $] = J(!1), [E, j] = J(!1), C = t.find((k) => k.id === o), D = wr(() => U7(f, g, S), [f, g, S]), I = (k, z) => u((V) => V.map((N) => N.id === k ? { ...N, ...z } : N)), R = (k, z) => {
    const V = r.find((N) => N.nombre === z);
    V ? I(k, { productoId: V.id, claveSat: V.claveSat, descripcion: V.nombre, unidad: V.unidad, precioUnitario: V.precio, iva: V.iva }) : I(k, { descripcion: z });
  }, F = async () => {
    var z;
    if (!C) {
      P("Selecciona un cliente antes de emitir.");
      return;
    }
    if (!f.length || f.some((V) => !V.descripcion.trim() || V.cantidad <= 0)) {
      P("Agrega al menos un concepto válido.");
      return;
    }
    const k = { clienteId: C.id, cliente: C.nombre, rfc: C.rfc, fecha: "2026-09-30", vencimiento: p, subtotal: D.subtotal, iva: D.iva, retenciones: D.retenciones, total: D.total, estado: d === "PUE" ? "Pagada" : "Emitida", metodoPago: d, formaPago: m, conceptos: f };
    j(!0), P("");
    try {
      const V = await ((z = i == null ? void 0 : i.guardarFactura) == null ? void 0 : z.call(i, k));
      n(V ?? k), e("/facturas");
    } catch {
      P("No se pudo conectar con el servicio. Revisa la configuración de API e inténtalo de nuevo.");
    } finally {
      j(!1);
    }
  };
  return /* @__PURE__ */ A("div", { className: "fact-page", children: [
    /* @__PURE__ */ A("div", { className: "fact-page-heading", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x("h2", { children: "Crear factura" }),
        /* @__PURE__ */ x("p", { children: "Completa los datos fiscales y los conceptos del comprobante." })
      ] }),
      /* @__PURE__ */ x("span", { className: "fact-badge fact-badge--info", children: "Borrador nuevo" })
    ] }),
    /* @__PURE__ */ A(ve, { className: "fact-form-section", children: [
      /* @__PURE__ */ A("h3", { className: "fact-section-title", children: [
        /* @__PURE__ */ x("span", { children: /* @__PURE__ */ x(Au, { size: 14 }) }),
        "Cliente"
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-form-grid", children: [
        /* @__PURE__ */ A("label", { className: "fact-field fact-field--wide", children: [
          "Buscar cliente",
          /* @__PURE__ */ x("input", { list: "fact-clientes", value: s, onChange: (k) => {
            l(k.target.value), c("");
          }, placeholder: "Nombre o RFC del cliente", autoComplete: "off" }),
          /* @__PURE__ */ x("datalist", { id: "fact-clientes", children: t.map((k) => /* @__PURE__ */ x("option", { value: k.nombre, children: k.rfc }, k.id)) }),
          C && /* @__PURE__ */ A("small", { children: [
            C.rfc,
            " · ",
            C.regimenFiscal,
            " · ",
            C.correo
          ] })
        ] }),
        /* @__PURE__ */ A("label", { className: "fact-field", children: [
          "Método de pago",
          /* @__PURE__ */ A("select", { value: d, onChange: (k) => h(k.target.value), children: [
            /* @__PURE__ */ x("option", { value: "PUE", children: "PUE · Pago en una sola exhibición" }),
            /* @__PURE__ */ x("option", { value: "PPD", children: "PPD · Pago en parcialidades o diferido" })
          ] })
        ] }),
        /* @__PURE__ */ A("label", { className: "fact-field", children: [
          "Forma de pago",
          /* @__PURE__ */ x("select", { value: m, onChange: (k) => v(k.target.value), children: ["Por definir", "Transferencia", "Efectivo", "Tarjeta", "Cheque"].map((k) => /* @__PURE__ */ x("option", { children: k }, k)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ A(ve, { className: "fact-form-section", children: [
      /* @__PURE__ */ A("h3", { className: "fact-section-title", children: [
        /* @__PURE__ */ x("span", { children: /* @__PURE__ */ x($w, { size: 14 }) }),
        "Conceptos"
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-concept-editor", children: [
        f.map((k) => /* @__PURE__ */ A("div", { className: "fact-concept-row", children: [
          /* @__PURE__ */ A("label", { className: "fact-field", children: [
            "Descripción",
            /* @__PURE__ */ x("input", { list: "fact-productos", value: k.descripcion, onChange: (z) => R(k.id, z.target.value), placeholder: "Servicio o producto" }),
            /* @__PURE__ */ x("datalist", { id: "fact-productos", children: r.map((z) => /* @__PURE__ */ x("option", { value: z.nombre, children: z.claveSat }, z.id)) })
          ] }),
          /* @__PURE__ */ A("label", { className: "fact-field", children: [
            "Cantidad",
            /* @__PURE__ */ x("input", { type: "number", min: "0.01", step: "0.01", value: k.cantidad, onChange: (z) => I(k.id, { cantidad: Number(z.target.value) }) })
          ] }),
          /* @__PURE__ */ A("label", { className: "fact-field", children: [
            "Precio unitario",
            /* @__PURE__ */ x("input", { type: "number", min: "0", step: "0.01", value: k.precioUnitario, onChange: (z) => I(k.id, { precioUnitario: Number(z.target.value) }) })
          ] }),
          /* @__PURE__ */ A("label", { className: "fact-field fact-concept-tax", children: [
            "IVA",
            /* @__PURE__ */ A("select", { value: k.iva, onChange: (z) => I(k.id, { iva: Number(z.target.value) }), children: [
              /* @__PURE__ */ x("option", { value: 16, children: "16%" }),
              /* @__PURE__ */ x("option", { value: 8, children: "8%" }),
              /* @__PURE__ */ x("option", { value: 0, children: "0%" })
            ] })
          ] }),
          /* @__PURE__ */ x("button", { className: "fact-icon-button", onClick: () => u((z) => z.length > 1 ? z.filter((V) => V.id !== k.id) : z), "aria-label": "Eliminar concepto", children: /* @__PURE__ */ x(Gw, { size: 16 }) })
        ] }, k.id)),
        /* @__PURE__ */ x(de, { variante: "texto", icono: /* @__PURE__ */ x(Xn, { size: 15 }), onClick: () => u((k) => [...k, vm()]), children: "Agregar concepto" })
      ] })
    ] }),
    /* @__PURE__ */ A(ve, { className: "fact-form-section", children: [
      /* @__PURE__ */ A("h3", { className: "fact-section-title", children: [
        /* @__PURE__ */ x("span", { children: /* @__PURE__ */ x(_u, { size: 14 }) }),
        "Totales e impuestos"
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-form-grid", children: [
        /* @__PURE__ */ A("label", { className: "fact-field", children: [
          "Retención ISR (%)",
          /* @__PURE__ */ x("input", { type: "number", min: "0", max: "100", step: "0.01", value: g, onChange: (k) => O(Number(k.target.value)) })
        ] }),
        /* @__PURE__ */ A("label", { className: "fact-field", children: [
          "Retención IVA (%)",
          /* @__PURE__ */ x("input", { type: "number", min: "0", max: "100", step: "0.01", value: S, onChange: (k) => y(Number(k.target.value)) })
        ] }),
        /* @__PURE__ */ A("label", { className: "fact-field", children: [
          "Fecha de vencimiento",
          /* @__PURE__ */ x("input", { type: "date", value: p, onChange: (k) => b(k.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-totals", style: { marginTop: 20 }, children: [
        /* @__PURE__ */ A("div", { className: "fact-total-line", children: [
          /* @__PURE__ */ x("span", { children: "Subtotal" }),
          /* @__PURE__ */ x("span", { children: he(D.subtotal) })
        ] }),
        /* @__PURE__ */ A("div", { className: "fact-total-line", children: [
          /* @__PURE__ */ x("span", { children: "IVA trasladado" }),
          /* @__PURE__ */ x("span", { children: he(D.iva) })
        ] }),
        /* @__PURE__ */ A("div", { className: "fact-total-line", children: [
          /* @__PURE__ */ x("span", { children: "Retenciones" }),
          /* @__PURE__ */ A("span", { children: [
            "− ",
            he(D.retenciones)
          ] })
        ] }),
        /* @__PURE__ */ A("div", { className: "fact-total-line fact-total-line--grand", children: [
          /* @__PURE__ */ x("span", { children: "Total" }),
          /* @__PURE__ */ x("span", { children: he(D.total) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ A(ve, { className: "fact-form-section", children: [
      /* @__PURE__ */ A("h3", { className: "fact-section-title", children: [
        /* @__PURE__ */ x("span", { children: /* @__PURE__ */ x(Qi, { size: 14 }) }),
        "Extras"
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-form-grid", children: [
        /* @__PURE__ */ A("label", { className: "fact-field", children: [
          "Uso de CFDI",
          /* @__PURE__ */ x("input", { value: (C == null ? void 0 : C.usoCfdi) ?? "G03", readOnly: !0 })
        ] }),
        /* @__PURE__ */ A("label", { className: "fact-field", children: [
          "Serie y folio",
          /* @__PURE__ */ x("input", { value: `${a.serie}-2026-${String(a.siguienteFolio).padStart(4, "0")}`, readOnly: !0 })
        ] }),
        /* @__PURE__ */ A("label", { className: "fact-field fact-field--wide", children: [
          "Notas internas",
          /* @__PURE__ */ x("textarea", { placeholder: "Notas para el equipo (no aparecen en la factura)" })
        ] })
      ] })
    ] }),
    w && /* @__PURE__ */ x("div", { role: "alert", className: "fact-badge fact-badge--danger", children: w }),
    /* @__PURE__ */ A("div", { className: "fact-form-footer", children: [
      /* @__PURE__ */ x(de, { onClick: () => e("/facturas"), children: "Cancelar" }),
      /* @__PURE__ */ x(de, { icono: /* @__PURE__ */ x(Qi, { size: 14 }), onClick: () => $(!0), children: "Vista previa" }),
      /* @__PURE__ */ x(de, { variante: "primario", onClick: F, disabled: E, children: E ? "Guardando…" : "Emitir factura" })
    ] }),
    /* @__PURE__ */ x(Qt, { abierto: _, titulo: "Vista previa de factura", onCerrar: () => $(!1), children: /* @__PURE__ */ A("div", { className: "fact-page", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x("strong", { children: a.razonSocial }),
        /* @__PURE__ */ A("span", { className: "fact-cell-sub", children: [
          "RFC ",
          a.rfc,
          " · ",
          a.regimenFiscal
        ] })
      ] }),
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x("strong", { children: "Cliente" }),
        /* @__PURE__ */ A("span", { className: "fact-cell-sub", children: [
          (C == null ? void 0 : C.nombre) ?? "Selecciona un cliente",
          " · ",
          (C == null ? void 0 : C.rfc) ?? "RFC"
        ] })
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-total-line", children: [
        /* @__PURE__ */ x("span", { children: "Fecha" }),
        Ft("2026-09-30")
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-total-line", children: [
        /* @__PURE__ */ x("span", { children: "Subtotal" }),
        he(D.subtotal)
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-total-line", children: [
        /* @__PURE__ */ x("span", { children: "IVA" }),
        he(D.iva)
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-total-line fact-total-line--grand", children: [
        /* @__PURE__ */ x("span", { children: "Total" }),
        he(D.total)
      ] }),
      /* @__PURE__ */ x(br, { estado: "Emitida", children: "Vista previa" })
    ] }) })
  ] });
}
function q7() {
  const e = Oe((E) => E.facturas), t = Oe((E) => E.cancelarFactura), r = Oe((E) => E.agregarPago), [n, a] = J(""), [i, o] = J("Todos"), [c, s] = J("Todos"), [l, f] = J(""), [u, d] = J(1), [h, m] = J(null), [v, p] = J(null), [b, g] = J(""), [O, S] = J(""), y = wr(() => e.filter((E) => `${E.folio} ${E.cliente} ${E.rfc}`.toLowerCase().includes(n.toLowerCase()) && (i === "Todos" || E.estado === i) && (c === "Todos" || E.metodoPago === c) && (!l || E.fecha.startsWith(l))), [e, n, i, c, l]), w = y.slice((u - 1) * 5, u * 5), P = (E, j) => {
    const C = j === "XML" ? `<Comprobante folio="${E.folio}" total="${E.total}" rfc="${E.rfc}" />` : `Representación impresa de ${E.folio}
Cliente: ${E.cliente}
Total: ${he(E.total)}`, D = new Blob([C], { type: j === "XML" ? "application/xml" : "text/plain" }), I = URL.createObjectURL(D), R = document.createElement("a");
    R.href = I, R.download = `${E.folio}.${j.toLowerCase()}`, R.click(), URL.revokeObjectURL(I), S(`Se generó el archivo ${j} de muestra.`);
  }, _ = [
    { clave: "folio", titulo: "Folio", render: (E) => /* @__PURE__ */ A(yr, { children: [
      /* @__PURE__ */ x("span", { className: "fact-cell-main", children: E.folio }),
      /* @__PURE__ */ x("span", { className: "fact-cell-sub", children: E.metodoPago })
    ] }) },
    { clave: "cliente", titulo: "Cliente", render: (E) => /* @__PURE__ */ A(yr, { children: [
      /* @__PURE__ */ x("span", { className: "fact-cell-main", children: E.cliente }),
      /* @__PURE__ */ x("span", { className: "fact-cell-sub", children: E.rfc })
    ] }) },
    { clave: "fecha", titulo: "Fecha", render: (E) => Ft(E.fecha) },
    { clave: "total", titulo: "Total", render: (E) => /* @__PURE__ */ x("span", { className: "fact-cell-main", children: he(E.total) }) },
    { clave: "estado", titulo: "Estado", render: (E) => /* @__PURE__ */ x(br, { estado: E.estado }) },
    { clave: "acciones", titulo: "Acciones", render: (E) => /* @__PURE__ */ A("div", { className: "fact-row-actions", children: [
      /* @__PURE__ */ x("button", { className: "fact-icon-button", title: "Ver", "aria-label": `Ver ${E.folio}`, onClick: () => {
        m(E), p("ver");
      }, children: /* @__PURE__ */ x(Iw, { size: 15 }) }),
      /* @__PURE__ */ x("button", { className: "fact-icon-button", title: "Descargar PDF de muestra", "aria-label": `PDF ${E.folio}`, onClick: () => P(E, "PDF"), children: /* @__PURE__ */ x(Ji, { size: 15 }) }),
      /* @__PURE__ */ x("button", { className: "fact-icon-button", title: "Descargar XML de muestra", "aria-label": `XML ${E.folio}`, onClick: () => P(E, "XML"), children: /* @__PURE__ */ x(Im, { size: 15 }) }),
      /* @__PURE__ */ x("button", { className: "fact-icon-button", title: "Enviar", "aria-label": `Enviar ${E.folio}`, onClick: () => S(`Se preparó el envío de ${E.folio} a ${E.cliente}.`), children: /* @__PURE__ */ x(Bw, { size: 15 }) }),
      E.estado !== "Pagada" && E.estado !== "Cancelada" && /* @__PURE__ */ x("button", { className: "fact-icon-button", title: "Registrar pago", "aria-label": `Registrar pago ${E.folio}`, onClick: () => {
        m(E), p("pago");
      }, children: /* @__PURE__ */ x(Rm, { size: 15 }) }),
      E.estado !== "Cancelada" && /* @__PURE__ */ x("button", { className: "fact-icon-button", title: "Cancelar", "aria-label": `Cancelar ${E.folio}`, onClick: () => {
        m(E), p("cancelar");
      }, children: /* @__PURE__ */ x(Nw, { size: 15 }) })
    ] }) }
  ], $ = () => {
    p(null), m(null);
  };
  return /* @__PURE__ */ A("div", { className: "fact-page", children: [
    /* @__PURE__ */ A("div", { className: "fact-page-heading", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x("h2", { children: "Control de comprobantes" }),
        /* @__PURE__ */ x("p", { children: "Consulta, filtra y administra las facturas emitidas." })
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-actions", children: [
        /* @__PURE__ */ x(de, { onClick: () => S("El archivo de exportación se preparó correctamente."), icono: /* @__PURE__ */ x(Ji, { size: 14 }), children: "Exportar" }),
        /* @__PURE__ */ x(Na, { to: "/facturas/nueva", children: /* @__PURE__ */ x(de, { variante: "primario", icono: /* @__PURE__ */ x(Xn, { size: 15 }), children: "Nueva factura" }) })
      ] })
    ] }),
    /* @__PURE__ */ A(ve, { className: "fact-form-section", children: [
      /* @__PURE__ */ A("div", { className: "fact-toolbar", children: [
        /* @__PURE__ */ A("label", { className: "fact-search", children: [
          /* @__PURE__ */ x(sc, { size: 15 }),
          /* @__PURE__ */ x("input", { value: n, onChange: (E) => {
            a(E.target.value), d(1);
          }, placeholder: "Buscar por folio, cliente o RFC", "aria-label": "Buscar facturas" })
        ] }),
        /* @__PURE__ */ x("select", { className: "fact-input", "aria-label": "Filtrar estado", value: i, onChange: (E) => o(E.target.value), children: ["Todos", "Pagada", "Pendiente", "Emitida", "Cancelada"].map((E) => /* @__PURE__ */ x("option", { children: E }, E)) }),
        /* @__PURE__ */ x("select", { className: "fact-input", "aria-label": "Filtrar método de pago", value: c, onChange: (E) => s(E.target.value), children: ["Todos", "PUE", "PPD"].map((E) => /* @__PURE__ */ x("option", { children: E }, E)) }),
        /* @__PURE__ */ x("input", { className: "fact-input", type: "month", "aria-label": "Filtrar mes", value: l, onChange: (E) => f(E.target.value) })
      ] }),
      /* @__PURE__ */ x("div", { style: { marginTop: 17 }, children: /* @__PURE__ */ x(ut, { columnas: _, filas: w }) }),
      /* @__PURE__ */ A("div", { className: "fact-pagination", style: { marginTop: 15 }, children: [
        /* @__PURE__ */ A("span", { children: [
          "Mostrando ",
          y.length ? (u - 1) * 5 + 1 : 0,
          "–",
          Math.min(u * 5, y.length),
          " de ",
          y.length,
          " facturas"
        ] }),
        /* @__PURE__ */ A("div", { className: "fact-pagination__buttons", children: [
          /* @__PURE__ */ x(de, { disabled: u <= 1, onClick: () => d((E) => Math.max(1, E - 1)), children: "Anterior" }),
          /* @__PURE__ */ x(de, { disabled: u * 5 >= y.length, onClick: () => d((E) => E + 1), children: "Siguiente" })
        ] })
      ] })
    ] }),
    O && /* @__PURE__ */ A("div", { className: "fact-toast", role: "status", onClick: () => S(""), children: [
      O,
      " · Cerrar"
    ] }),
    /* @__PURE__ */ x(Qt, { abierto: v === "ver", titulo: (h == null ? void 0 : h.folio) ?? "Factura", onCerrar: $, children: h && /* @__PURE__ */ A("div", { className: "fact-page", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x("strong", { children: h.cliente }),
        /* @__PURE__ */ A("span", { className: "fact-cell-sub", children: [
          h.rfc,
          " · ",
          Ft(h.fecha)
        ] })
      ] }),
      /* @__PURE__ */ x(ut, { columnas: [{ clave: "desc", titulo: "Concepto", render: (E) => E.descripcion }, { clave: "cant", titulo: "Cant.", render: (E) => E.cantidad }, { clave: "importe", titulo: "Importe", render: (E) => he(E.cantidad * E.precioUnitario) }], filas: h.conceptos.map((E) => ({ ...E, id: E.id })) }),
      /* @__PURE__ */ A("div", { className: "fact-total-line fact-total-line--grand", children: [
        /* @__PURE__ */ x("span", { children: "Total" }),
        /* @__PURE__ */ x("span", { children: he(h.total) })
      ] }),
      /* @__PURE__ */ x(br, { estado: h.estado })
    ] }) }),
    /* @__PURE__ */ x(Qt, { abierto: v === "cancelar", titulo: "Cancelar factura", onCerrar: $, children: /* @__PURE__ */ A("div", { className: "fact-page", children: [
      /* @__PURE__ */ A("p", { children: [
        "Se registrará el motivo de cancelación para ",
        h == null ? void 0 : h.folio,
        "."
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Motivo",
        /* @__PURE__ */ x("textarea", { value: b, onChange: (E) => g(E.target.value), placeholder: "Describe el motivo" })
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-form-footer", children: [
        /* @__PURE__ */ x(de, { onClick: $, children: "Volver" }),
        /* @__PURE__ */ x(de, { variante: "peligro", onClick: () => {
          !b.trim() || !h || (t(h.id, b, "Lucía Fernández"), S(`${h.folio} fue cancelada.`), g(""), $());
        }, children: "Confirmar cancelación" })
      ] })
    ] }) }),
    /* @__PURE__ */ x(Qt, { abierto: v === "pago", titulo: "Registrar pago", onCerrar: $, children: /* @__PURE__ */ x(H7, { factura: h, onGuardar: (E, j, C) => {
      h && (r({ facturaId: h.id, folioFactura: h.folio, cliente: h.cliente, fecha: "2026-09-30", monto: E, formaPago: j, referencia: C }), S("Pago registrado. El complemento está disponible en Pagos."), $());
    } }) })
  ] });
}
function H7({ factura: e, onGuardar: t }) {
  const [r, n] = J((e == null ? void 0 : e.total) ?? 0), [a, i] = J(""), [o, c] = J("Transferencia");
  return /* @__PURE__ */ A("div", { className: "fact-page", children: [
    /* @__PURE__ */ A("label", { className: "fact-field", children: [
      "Monto",
      /* @__PURE__ */ x("input", { type: "number", min: "1", max: e == null ? void 0 : e.total, value: r, onChange: (s) => n(Number(s.target.value)) })
    ] }),
    /* @__PURE__ */ A("label", { className: "fact-field", children: [
      "Forma de pago",
      /* @__PURE__ */ x("select", { value: o, onChange: (s) => c(s.target.value), children: ["Transferencia", "Efectivo", "Tarjeta", "Cheque"].map((s) => /* @__PURE__ */ x("option", { children: s }, s)) })
    ] }),
    /* @__PURE__ */ A("label", { className: "fact-field", children: [
      "Referencia",
      /* @__PURE__ */ x("input", { value: a, onChange: (s) => i(s.target.value) })
    ] }),
    /* @__PURE__ */ x(de, { variante: "primario", onClick: () => t(r, o, a), children: "Guardar pago" })
  ] });
}
function G7() {
  const e = Oe((n) => n.facturas.filter((a) => a.estado === "Cancelada")), t = (n) => {
    var c, s;
    const a = `Acuse de cancelación de ${n.folio}
Fecha: ${(c = n.cancelacion) == null ? void 0 : c.fecha}
Motivo: ${(s = n.cancelacion) == null ? void 0 : s.motivo}`, i = URL.createObjectURL(new Blob([a], { type: "text/plain" })), o = document.createElement("a");
    o.href = i, o.download = `acuse-${n.folio}.txt`, o.click(), URL.revokeObjectURL(i);
  }, r = [{ clave: "folio", titulo: "Folio", render: (n) => /* @__PURE__ */ x("strong", { children: n.folio }) }, { clave: "cliente", titulo: "Cliente", render: (n) => /* @__PURE__ */ A(yr, { children: [
    /* @__PURE__ */ x("span", { className: "fact-cell-main", children: n.cliente }),
    /* @__PURE__ */ x("span", { className: "fact-cell-sub", children: n.rfc })
  ] }) }, { clave: "fecha", titulo: "Fecha de factura", render: (n) => Ft(n.fecha) }, { clave: "motivo", titulo: "Motivo", render: (n) => {
    var a;
    return ((a = n.cancelacion) == null ? void 0 : a.motivo) ?? "No especificado";
  } }, { clave: "usuario", titulo: "Cancelada por", render: (n) => {
    var a;
    return ((a = n.cancelacion) == null ? void 0 : a.usuario) ?? "Sistema";
  } }, { clave: "estado", titulo: "Estado", render: () => /* @__PURE__ */ x(br, { estado: "Cancelada" }) }, { clave: "acuse", titulo: "Acuse", render: (n) => /* @__PURE__ */ x(de, { onClick: () => t(n), "aria-label": `Descargar acuse ${n.folio}`, icono: /* @__PURE__ */ x(Ji, { size: 14 }), children: "Descargar" }) }];
  return /* @__PURE__ */ A("div", { className: "fact-page", children: [
    /* @__PURE__ */ A("div", { className: "fact-page-heading", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x("h2", { children: "Historial de cancelaciones" }),
        /* @__PURE__ */ x("p", { children: "Consulta motivos, responsables y acuses de cancelación." })
      ] }),
      /* @__PURE__ */ A("span", { className: "fact-badge fact-badge--danger", children: [
        e.length,
        " canceladas"
      ] })
    ] }),
    /* @__PURE__ */ A(ve, { children: [
      /* @__PURE__ */ x("div", { style: { padding: "16px 0 0" }, children: /* @__PURE__ */ x(ut, { columnas: r, filas: e, vacio: "No hay facturas canceladas." }) }),
      /* @__PURE__ */ A("div", { className: "fact-card__body", style: { paddingTop: 10, color: "var(--fact-muted)", fontSize: 10 }, children: [
        "Importe relacionado: ",
        he(e.reduce((n, a) => n + a.total, 0))
      ] })
    ] })
  ] });
}
function Y7() {
  var O;
  const e = Oe((S) => S.pagos), t = Oe((S) => S.facturas.filter((y) => y.estado !== "Cancelada")), r = Oe((S) => S.agregarPago), [n, a] = J(!1), [i, o] = J(((O = t[0]) == null ? void 0 : O.id) ?? ""), [c, s] = J(0), [l, f] = J("2026-09-30"), [u, d] = J("Transferencia"), [h, m] = J(""), [v, p] = J(""), b = [{ clave: "folio", titulo: "Factura", render: (S) => /* @__PURE__ */ x("strong", { children: S.folioFactura }) }, { clave: "cliente", titulo: "Cliente", render: (S) => S.cliente }, { clave: "fecha", titulo: "Fecha de pago", render: (S) => Ft(S.fecha) }, { clave: "monto", titulo: "Monto", render: (S) => /* @__PURE__ */ x("strong", { children: he(S.monto) }) }, { clave: "forma", titulo: "Forma de pago", render: (S) => S.formaPago }, { clave: "ref", titulo: "Referencia", render: (S) => S.referencia || "—" }, { clave: "comp", titulo: "Complemento", render: (S) => /* @__PURE__ */ x(de, { "aria-label": `Generar complemento para ${S.folioFactura}`, onClick: () => p(`Complemento mock de ${S.folioFactura} generado.`), icono: /* @__PURE__ */ x(Im, { size: 14 }), children: "PDF / XML" }) }], g = () => {
    const S = t.find((y) => y.id === i);
    !S || c <= 0 || (r({ facturaId: i, folioFactura: S.folio, cliente: S.cliente, fecha: l, monto: c, formaPago: u, referencia: h }), a(!1), p("Pago registrado correctamente."), s(0), m(""));
  };
  return /* @__PURE__ */ A("div", { className: "fact-page", children: [
    /* @__PURE__ */ A("div", { className: "fact-page-heading", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x("h2", { children: "Pagos recibidos" }),
        /* @__PURE__ */ x("p", { children: "Administra pagos y genera complementos de recepción (mock)." })
      ] }),
      /* @__PURE__ */ x(de, { variante: "primario", onClick: () => a(!0), icono: /* @__PURE__ */ x(Xn, { size: 15 }), children: "Registrar pago" })
    ] }),
    /* @__PURE__ */ A("div", { className: "fact-kpis", children: [
      /* @__PURE__ */ A(ve, { className: "fact-kpi", children: [
        /* @__PURE__ */ x("div", { className: "fact-kpi__top", children: "Pagos registrados" }),
        /* @__PURE__ */ x("strong", { children: e.length }),
        /* @__PURE__ */ x("span", { className: "fact-kpi__note", children: "En el periodo actual" })
      ] }),
      /* @__PURE__ */ A(ve, { className: "fact-kpi", children: [
        /* @__PURE__ */ x("div", { className: "fact-kpi__top", children: "Total recibido" }),
        /* @__PURE__ */ x("strong", { children: he(e.reduce((S, y) => S + y.monto, 0)) }),
        /* @__PURE__ */ x("span", { className: "fact-kpi__note", children: "Pagos vinculados" })
      ] }),
      /* @__PURE__ */ A(ve, { className: "fact-kpi", children: [
        /* @__PURE__ */ x("div", { className: "fact-kpi__top", children: "Complementos" }),
        /* @__PURE__ */ x("strong", { children: e.length }),
        /* @__PURE__ */ x("span", { className: "fact-kpi__note", children: "Disponibles para generar" })
      ] })
    ] }),
    /* @__PURE__ */ x(ve, { children: /* @__PURE__ */ x("div", { style: { paddingTop: 13 }, children: /* @__PURE__ */ x(ut, { columnas: b, filas: e }) }) }),
    v && /* @__PURE__ */ A("div", { className: "fact-toast", role: "status", onClick: () => p(""), children: [
      v,
      " · Cerrar"
    ] }),
    /* @__PURE__ */ x(Qt, { abierto: n, titulo: "Registrar pago", onCerrar: () => a(!1), children: /* @__PURE__ */ A("div", { className: "fact-page", children: [
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Factura",
        /* @__PURE__ */ A("select", { value: i, onChange: (S) => {
          var y;
          o(S.target.value), s(((y = t.find((w) => w.id === S.target.value)) == null ? void 0 : y.total) ?? 0);
        }, children: [
          /* @__PURE__ */ x("option", { value: "", children: "Seleccionar factura" }),
          t.map((S) => /* @__PURE__ */ A("option", { value: S.id, children: [
            S.folio,
            " · ",
            S.cliente
          ] }, S.id))
        ] })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Fecha",
        /* @__PURE__ */ x("input", { type: "date", value: l, onChange: (S) => f(S.target.value) })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Monto",
        /* @__PURE__ */ x("input", { type: "number", min: "0", value: c, onChange: (S) => s(Number(S.target.value)) })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Forma de pago",
        /* @__PURE__ */ x("select", { value: u, onChange: (S) => d(S.target.value), children: ["Transferencia", "Efectivo", "Tarjeta", "Cheque"].map((S) => /* @__PURE__ */ x("option", { children: S }, S)) })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Referencia",
        /* @__PURE__ */ x("input", { value: h, onChange: (S) => m(S.target.value) })
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-form-footer", children: [
        /* @__PURE__ */ x(de, { onClick: () => a(!1), children: "Cancelar" }),
        /* @__PURE__ */ x(de, { variante: "primario", onClick: g, children: "Registrar pago" })
      ] })
    ] }) })
  ] });
}
function K7() {
  const e = Oe((s) => s.cotizaciones), t = Oe((s) => s.clientes), r = Oe((s) => s.convertirCotizacion), n = Oe((s) => s.agregarFactura), [a, i] = J(""), o = (s) => {
    if (s.estado !== "Aceptada") {
      r(s.id), i(`${s.folio} se marcó como convertida.`);
      return;
    }
    const l = t.find((d) => d.nombre === s.cliente);
    if (!l) return;
    const f = s.total / 1.16, u = { id: `con-${Date.now()}`, claveSat: "81112100", descripcion: `Servicios según ${s.folio}`, unidad: "E48 - Servicio", cantidad: 1, precioUnitario: f, iva: 16 };
    n({ clienteId: l.id, cliente: l.nombre, rfc: l.rfc, fecha: "2026-09-30", vencimiento: s.vigencia, subtotal: f, iva: s.total - f, retenciones: 0, total: s.total, estado: "Emitida", metodoPago: "PPD", formaPago: "Por definir", conceptos: [u] }), r(s.id), i(`Se creó la factura para ${s.folio}.`);
  }, c = [{ clave: "folio", titulo: "Cotización", render: (s) => /* @__PURE__ */ x("strong", { children: s.folio }) }, { clave: "cliente", titulo: "Cliente", render: (s) => s.cliente }, { clave: "fecha", titulo: "Fecha", render: (s) => Ft(s.fecha) }, { clave: "vigencia", titulo: "Vigencia", render: (s) => Ft(s.vigencia) }, { clave: "total", titulo: "Total", render: (s) => /* @__PURE__ */ x("strong", { children: he(s.total) }) }, { clave: "estado", titulo: "Estado", render: (s) => /* @__PURE__ */ x(br, { estado: s.estado }) }, { clave: "accion", titulo: "Acciones", render: (s) => /* @__PURE__ */ x(de, { disabled: s.estado === "Convertida" || s.estado === "Rechazada", onClick: () => o(s), icono: /* @__PURE__ */ x(Ew, { size: 14 }), children: "Convertir" }) }];
  return /* @__PURE__ */ A("div", { className: "fact-page", children: [
    /* @__PURE__ */ A("div", { className: "fact-page-heading", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x("h2", { children: "Propuestas comerciales" }),
        /* @__PURE__ */ x("p", { children: "Da seguimiento a cotizaciones y su vigencia." })
      ] }),
      /* @__PURE__ */ x(de, { variante: "primario", icono: /* @__PURE__ */ x(Xn, { size: 15 }), onClick: () => i("Formulario de cotización disponible en la siguiente versión."), children: "Nueva cotización" })
    ] }),
    /* @__PURE__ */ x("div", { className: "fact-tabbar", children: ["Todas", "Borrador", "Enviada", "Aceptada", "Rechazada", "Convertida"].map((s, l) => /* @__PURE__ */ x("button", { className: l === 0 ? "is-active" : "", children: s }, s)) }),
    /* @__PURE__ */ x(ve, { children: /* @__PURE__ */ x("div", { style: { paddingTop: 13 }, children: /* @__PURE__ */ x(ut, { columnas: c, filas: e }) }) }),
    a && /* @__PURE__ */ A("div", { className: "fact-toast", role: "status", onClick: () => i(""), children: [
      a,
      " · Cerrar"
    ] })
  ] });
}
function X7() {
  const e = Oe((h) => h.notasCredito), t = Oe((h) => h.facturas), [r, n] = J(!1), [a, i] = J(""), [o, c] = J(""), [s, l] = J(0), [f, u] = J("");
  return /* @__PURE__ */ A("div", { className: "fact-page", children: [
    /* @__PURE__ */ A("div", { className: "fact-page-heading", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x("h2", { children: "Ajustes y devoluciones" }),
        /* @__PURE__ */ x("p", { children: "Notas vinculadas al comprobante fiscal de origen." })
      ] }),
      /* @__PURE__ */ x(de, { variante: "primario", onClick: () => n(!0), children: "Nueva nota de crédito" })
    ] }),
    /* @__PURE__ */ x(ve, { children: /* @__PURE__ */ x("div", { style: { paddingTop: 13 }, children: /* @__PURE__ */ x(ut, { columnas: [{ clave: "folio", titulo: "Nota de crédito", render: (h) => /* @__PURE__ */ x("strong", { children: h.folio }) }, { clave: "original", titulo: "Factura original", render: (h) => h.facturaOriginal }, { clave: "cliente", titulo: "Cliente", render: (h) => h.cliente }, { clave: "fecha", titulo: "Fecha", render: (h) => Ft(h.fecha) }, { clave: "motivo", titulo: "Motivo", render: (h) => h.motivo }, { clave: "monto", titulo: "Monto", render: (h) => /* @__PURE__ */ x("strong", { children: he(h.monto) }) }, { clave: "estado", titulo: "Estado", render: (h) => /* @__PURE__ */ x(br, { estado: h.estado }) }], filas: e }) }) }),
    /* @__PURE__ */ x(Qt, { abierto: r, titulo: "Crear nota de crédito", onCerrar: () => n(!1), children: /* @__PURE__ */ A("div", { className: "fact-page", children: [
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Factura original",
        /* @__PURE__ */ A("select", { value: a, onChange: (h) => i(h.target.value), children: [
          /* @__PURE__ */ x("option", { value: "", children: "Seleccionar factura" }),
          t.filter((h) => h.estado !== "Cancelada").map((h) => /* @__PURE__ */ A("option", { value: h.id, children: [
            h.folio,
            " · ",
            h.cliente
          ] }, h.id))
        ] })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Motivo",
        /* @__PURE__ */ x("textarea", { value: o, onChange: (h) => c(h.target.value), placeholder: "Motivo de la nota" })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Monto",
        /* @__PURE__ */ x("input", { type: "number", min: "0", value: s, onChange: (h) => l(Number(h.target.value)) })
      ] }),
      /* @__PURE__ */ x(de, { variante: "primario", onClick: () => {
        const h = t.find((m) => m.id === a);
        !h || !o || s <= 0 || (u(`Nota de crédito preparada para ${h.folio}.`), n(!1));
      }, children: "Guardar nota" })
    ] }) }),
    f && /* @__PURE__ */ A("div", { className: "fact-toast", role: "status", onClick: () => u(""), children: [
      f,
      " · Cerrar"
    ] })
  ] });
}
function Z7() {
  const e = Oe((i) => i.recurrentes), t = Oe((i) => i.alternarRecurrente), [r, n] = J("");
  return /* @__PURE__ */ A("div", { className: "fact-page", children: [
    /* @__PURE__ */ A("div", { className: "fact-page-heading", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x("h2", { children: "Emisiones programadas" }),
        /* @__PURE__ */ x("p", { children: "Automatiza la facturación de servicios periódicos." })
      ] }),
      /* @__PURE__ */ x(de, { variante: "primario", onClick: () => n("Configuración de nueva recurrencia preparada."), children: "Crear recurrencia" })
    ] }),
    /* @__PURE__ */ x(ve, { children: /* @__PURE__ */ x("div", { style: { paddingTop: 13 }, children: /* @__PURE__ */ x(ut, { columnas: [{ clave: "cliente", titulo: "Cliente", render: (i) => /* @__PURE__ */ A(yr, { children: [
      /* @__PURE__ */ x("span", { className: "fact-cell-main", children: i.cliente }),
      /* @__PURE__ */ x("span", { className: "fact-cell-sub", children: i.concepto })
    ] }) }, { clave: "frecuencia", titulo: "Frecuencia", render: (i) => i.frecuencia }, { clave: "siguiente", titulo: "Próxima emisión", render: (i) => Ft(i.proximaEmision) }, { clave: "total", titulo: "Importe", render: (i) => /* @__PURE__ */ x("strong", { children: he(i.total) }) }, { clave: "estado", titulo: "Estado", render: (i) => /* @__PURE__ */ x(br, { estado: i.activa ? "Pagada" : "Pendiente", children: i.activa ? "Activa" : "Pausada" }) }, { clave: "acciones", titulo: "Acciones", render: (i) => /* @__PURE__ */ A("div", { className: "fact-row-actions", children: [
      /* @__PURE__ */ x(de, { onClick: () => {
        t(i.id), n(i.activa ? "Emisión recurrente pausada." : "Emisión recurrente reanudada.");
      }, icono: i.activa ? /* @__PURE__ */ x(Ww, { size: 14 }) : /* @__PURE__ */ x(Uw, { size: 14 }), children: i.activa ? "Pausar" : "Reanudar" }),
      /* @__PURE__ */ x(de, { variante: "texto", onClick: () => n(`Se emitió una factura mock para ${i.cliente}.`), "aria-label": `Emitir ahora ${i.cliente}`, icono: /* @__PURE__ */ x(Zw, { size: 14 }), children: "Emitir ahora" })
    ] }) }], filas: e }) }) }),
    r && /* @__PURE__ */ A("div", { className: "fact-toast", role: "status", onClick: () => n(""), children: [
      r,
      " · Cerrar"
    ] })
  ] });
}
const mm = () => ({ id: `cli-${Date.now()}`, nombre: "", rfc: "", regimenFiscal: "", direccion: "", correo: "", telefono: "", usoCfdi: "G03" });
function J7() {
  const e = Oe((p) => p.clientes), t = Oe((p) => p.facturas), r = Oe((p) => p.guardarCliente), [n, a] = J(""), [i, o] = J(!1), [c, s] = J(null), [l, f] = J(mm()), [u, d] = J(""), h = wr(() => e.filter((p) => `${p.nombre} ${p.rfc} ${p.correo}`.toLowerCase().includes(n.toLowerCase())), [e, n]), m = [{ clave: "cliente", titulo: "Cliente", render: (p) => /* @__PURE__ */ A(yr, { children: [
    /* @__PURE__ */ x("span", { className: "fact-cell-main", children: p.nombre }),
    /* @__PURE__ */ x("span", { className: "fact-cell-sub", children: p.rfc })
  ] }) }, { clave: "regimen", titulo: "Régimen fiscal", render: (p) => p.regimenFiscal.split(" - ")[0] }, { clave: "correo", titulo: "Correo", render: (p) => p.correo }, { clave: "facturas", titulo: "Facturas", render: (p) => t.filter((b) => b.clienteId === p.id).length }, { clave: "saldo", titulo: "Saldo pendiente", render: (p) => he(t.filter((b) => b.clienteId === p.id && ["Pendiente", "Emitida"].includes(b.estado)).reduce((b, g) => b + g.total, 0)) }, { clave: "accion", titulo: "Historial", render: (p) => /* @__PURE__ */ x(de, { onClick: () => s(p), children: "Ver historial" }) }], v = c ? t.filter((p) => p.clienteId === c.id) : [];
  return /* @__PURE__ */ A("div", { className: "fact-page", children: [
    /* @__PURE__ */ A("div", { className: "fact-page-heading", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x("h2", { children: "Directorio de clientes" }),
        /* @__PURE__ */ x("p", { children: "Datos fiscales y actividad de tus clientes." })
      ] }),
      /* @__PURE__ */ x(de, { variante: "primario", icono: /* @__PURE__ */ x(Xn, { size: 15 }), onClick: () => {
        f(mm()), o(!0);
      }, children: "Nuevo cliente" })
    ] }),
    /* @__PURE__ */ A(ve, { className: "fact-form-section", children: [
      /* @__PURE__ */ x("div", { className: "fact-toolbar", children: /* @__PURE__ */ A("label", { className: "fact-search", children: [
        /* @__PURE__ */ x(sc, { size: 15 }),
        /* @__PURE__ */ x("input", { value: n, onChange: (p) => a(p.target.value), placeholder: "Buscar por nombre, RFC o correo", "aria-label": "Buscar cliente" })
      ] }) }),
      /* @__PURE__ */ x("div", { style: { marginTop: 14 }, children: /* @__PURE__ */ x(ut, { columnas: m, filas: h }) })
    ] }),
    /* @__PURE__ */ x(Qt, { abierto: i, titulo: "Nuevo cliente", onCerrar: () => o(!1), children: /* @__PURE__ */ A("form", { className: "fact-form-grid", onSubmit: (p) => {
      p.preventDefault(), !(!l.nombre || !l.rfc || !l.correo) && (r(l), o(!1), d("Cliente guardado."));
    }, children: [
      /* @__PURE__ */ A("label", { className: "fact-field fact-field--wide", children: [
        "Nombre o razón social",
        /* @__PURE__ */ x("input", { required: !0, value: l.nombre, onChange: (p) => f({ ...l, nombre: p.target.value }) })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "RFC",
        /* @__PURE__ */ x("input", { required: !0, value: l.rfc, onChange: (p) => f({ ...l, rfc: p.target.value.toUpperCase() }), maxLength: 13 })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Correo",
        /* @__PURE__ */ x("input", { required: !0, type: "email", value: l.correo, onChange: (p) => f({ ...l, correo: p.target.value }) })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field fact-field--wide", children: [
        "Régimen fiscal",
        /* @__PURE__ */ x("input", { value: l.regimenFiscal, onChange: (p) => f({ ...l, regimenFiscal: p.target.value }), placeholder: "601 - General de Ley Personas Morales" })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field fact-field--wide", children: [
        "Dirección",
        /* @__PURE__ */ x("input", { value: l.direccion, onChange: (p) => f({ ...l, direccion: p.target.value }) })
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-form-footer fact-field--wide", children: [
        /* @__PURE__ */ x(de, { type: "button", onClick: () => o(!1), children: "Cancelar" }),
        /* @__PURE__ */ x(de, { type: "submit", variante: "primario", children: "Guardar cliente" })
      ] })
    ] }) }),
    /* @__PURE__ */ x(Qt, { abierto: !!c, titulo: (c == null ? void 0 : c.nombre) ?? "Historial", onCerrar: () => s(null), children: /* @__PURE__ */ A("div", { className: "fact-page", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x(Au, { size: 18 }),
        " ",
        c == null ? void 0 : c.rfc,
        /* @__PURE__ */ A("p", { className: "fact-cell-sub", children: [
          "Saldo: ",
          he(v.filter((p) => ["Pendiente", "Emitida"].includes(p.estado)).reduce((p, b) => p + b.total, 0))
        ] })
      ] }),
      /* @__PURE__ */ x(ut, { columnas: [{ clave: "folio", titulo: "Factura", render: (p) => p.folio }, { clave: "fecha", titulo: "Fecha", render: (p) => p.fecha }, { clave: "total", titulo: "Total", render: (p) => he(p.total) }, { clave: "estado", titulo: "Estado", render: (p) => p.estado }], filas: v })
    ] }) }),
    u && /* @__PURE__ */ A("div", { className: "fact-toast", role: "status", onClick: () => d(""), children: [
      u,
      " · Cerrar"
    ] })
  ] });
}
const ym = () => ({ id: `prod-${Date.now()}`, claveSat: "", nombre: "", unidad: "E48 - Servicio", precio: 0, iva: 16, categoria: "" });
function Q7() {
  const e = Oe((d) => d.productos), t = Oe((d) => d.guardarProducto), [r, n] = J(""), [a, i] = J(!1), [o, c] = J(ym()), [s, l] = J(""), f = wr(() => e.filter((d) => `${d.nombre} ${d.claveSat} ${d.categoria}`.toLowerCase().includes(r.toLowerCase())), [e, r]);
  return /* @__PURE__ */ A("div", { className: "fact-page", children: [
    /* @__PURE__ */ A("div", { className: "fact-page-heading", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x("h2", { children: "Catálogo de conceptos" }),
        /* @__PURE__ */ x("p", { children: "Productos y servicios listos para agregar a tus facturas." })
      ] }),
      /* @__PURE__ */ x(de, { variante: "primario", icono: /* @__PURE__ */ x(Xn, { size: 15 }), onClick: () => {
        c(ym()), i(!0);
      }, children: "Nuevo concepto" })
    ] }),
    /* @__PURE__ */ A(ve, { className: "fact-form-section", children: [
      /* @__PURE__ */ A("label", { className: "fact-search", children: [
        /* @__PURE__ */ x(sc, { size: 15 }),
        /* @__PURE__ */ x("input", { value: r, onChange: (d) => n(d.target.value), placeholder: "Buscar por nombre, clave SAT o categoría", "aria-label": "Buscar productos" })
      ] }),
      /* @__PURE__ */ x("div", { style: { marginTop: 14 }, children: /* @__PURE__ */ x(ut, { columnas: [{ clave: "clave", titulo: "Clave SAT", render: (d) => /* @__PURE__ */ x("strong", { children: d.claveSat }) }, { clave: "nombre", titulo: "Producto o servicio", render: (d) => /* @__PURE__ */ A(yr, { children: [
        /* @__PURE__ */ x("span", { className: "fact-cell-main", children: d.nombre }),
        /* @__PURE__ */ x("span", { className: "fact-cell-sub", children: d.unidad })
      ] }) }, { clave: "categoria", titulo: "Categoría", render: (d) => d.categoria }, { clave: "iva", titulo: "IVA", render: (d) => `${d.iva}%` }, { clave: "precio", titulo: "Precio unitario", render: (d) => /* @__PURE__ */ x("strong", { children: he(d.precio) }) }, { clave: "accion", titulo: "Acciones", render: (d) => /* @__PURE__ */ x(de, { onClick: () => {
        c(d), i(!0);
      }, children: "Editar" }) }], filas: f }) })
    ] }),
    /* @__PURE__ */ x(Qt, { abierto: a, titulo: o.id.startsWith("prod-") && e.some((d) => d.id === o.id) ? "Editar producto" : "Nuevo producto o servicio", onCerrar: () => i(!1), children: /* @__PURE__ */ A("form", { className: "fact-form-grid", onSubmit: (d) => {
      d.preventDefault(), !(!o.nombre.trim() || !o.claveSat.trim()) && (t(o), i(!1), l("Concepto guardado en el catálogo."));
    }, children: [
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Clave SAT",
        /* @__PURE__ */ x("input", { required: !0, value: o.claveSat, onChange: (d) => c({ ...o, claveSat: d.target.value }) })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Nombre",
        /* @__PURE__ */ x("input", { required: !0, value: o.nombre, onChange: (d) => c({ ...o, nombre: d.target.value }) })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Unidad",
        /* @__PURE__ */ x("input", { value: o.unidad, onChange: (d) => c({ ...o, unidad: d.target.value }) })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Precio",
        /* @__PURE__ */ x("input", { type: "number", min: "0", value: o.precio, onChange: (d) => c({ ...o, precio: Number(d.target.value) }) })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "IVA",
        /* @__PURE__ */ A("select", { value: o.iva, onChange: (d) => c({ ...o, iva: Number(d.target.value) }), children: [
          /* @__PURE__ */ x("option", { value: 16, children: "16%" }),
          /* @__PURE__ */ x("option", { value: 8, children: "8%" }),
          /* @__PURE__ */ x("option", { value: 0, children: "0%" })
        ] })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Categoría",
        /* @__PURE__ */ x("input", { value: o.categoria, onChange: (d) => c({ ...o, categoria: d.target.value }) })
      ] }),
      /* @__PURE__ */ A("div", { className: "fact-form-footer fact-field--wide", children: [
        /* @__PURE__ */ x(de, { type: "button", onClick: () => i(!1), children: "Cancelar" }),
        /* @__PURE__ */ x(de, { type: "submit", variante: "primario", children: "Guardar concepto" })
      ] })
    ] }) }),
    s && /* @__PURE__ */ A("div", { className: "fact-toast", role: "status", onClick: () => l(""), children: [
      s,
      " · Cerrar"
    ] })
  ] });
}
function eq() {
  const e = Oe((g) => g.facturas), t = Oe((g) => g.productos), r = Oe((g) => g.clientes), [n, a] = J("2026-09-01"), [i, o] = J("2026-09-30"), [c, s] = J("Todos"), [l, f] = J(""), u = wr(() => e.filter((g) => g.fecha >= n && g.fecha <= i && (c === "Todos" || g.clienteId === c) && g.estado !== "Cancelada"), [e, n, i, c]), d = u.reduce((g, O) => g + O.total, 0), h = u.reduce((g, O) => g + O.subtotal, 0), m = u.reduce((g, O) => g + O.iva - O.retenciones, 0), v = Object.entries(u.reduce((g, O) => (g[O.cliente] = (g[O.cliente] ?? 0) + O.total, g), {})), p = [{ clave: "folio", titulo: "Factura", render: (g) => g.folio }, { clave: "cliente", titulo: "Cliente", render: (g) => g.cliente }, { clave: "fecha", titulo: "Fecha", render: (g) => g.fecha }, { clave: "subtotal", titulo: "Subtotal", render: (g) => he(g.subtotal) }, { clave: "iva", titulo: "IVA", render: (g) => he(g.iva) }, { clave: "total", titulo: "Total", render: (g) => /* @__PURE__ */ x("strong", { children: he(g.total) }) }];
  return /* @__PURE__ */ A("div", { className: "fact-page", children: [
    /* @__PURE__ */ A("div", { className: "fact-page-heading", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x("h2", { children: "Rendimiento y obligaciones" }),
        /* @__PURE__ */ x("p", { children: "Consulta ventas, clientes, productos, impuestos y cuentas por cobrar." })
      ] }),
      /* @__PURE__ */ x(de, { variante: "primario", onClick: () => {
        const g = ["Folio,Cliente,Fecha,Subtotal,IVA,Total", ...u.map((y) => [y.folio, `"${y.cliente}"`, y.fecha, y.subtotal, y.iva, y.total].join(","))].join(`
`), O = URL.createObjectURL(new Blob([g], { type: "text/csv;charset=utf-8" })), S = document.createElement("a");
        S.href = O, S.download = "reporte-facturacion.csv", S.click(), URL.revokeObjectURL(O), f("Reporte CSV generado.");
      }, icono: /* @__PURE__ */ x(Ji, { size: 15 }), children: "Exportar a Excel / PDF" })
    ] }),
    /* @__PURE__ */ x(ve, { className: "fact-form-section", children: /* @__PURE__ */ A("div", { className: "fact-toolbar", children: [
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Desde",
        /* @__PURE__ */ x("input", { type: "date", value: n, onChange: (g) => a(g.target.value) })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Hasta",
        /* @__PURE__ */ x("input", { type: "date", value: i, onChange: (g) => o(g.target.value) })
      ] }),
      /* @__PURE__ */ A("label", { className: "fact-field", children: [
        "Cliente",
        /* @__PURE__ */ A("select", { value: c, onChange: (g) => s(g.target.value), children: [
          /* @__PURE__ */ x("option", { children: "Todos" }),
          r.map((g) => /* @__PURE__ */ x("option", { value: g.id, children: g.nombre }, g.id))
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ A("div", { className: "fact-report-grid", children: [
      /* @__PURE__ */ A(ve, { className: "fact-report-item", children: [
        /* @__PURE__ */ x("h3", { children: "Ventas netas" }),
        /* @__PURE__ */ x("strong", { children: he(d) }),
        /* @__PURE__ */ A("span", { children: [
          u.length,
          " comprobantes incluidos"
        ] })
      ] }),
      /* @__PURE__ */ A(ve, { className: "fact-report-item", children: [
        /* @__PURE__ */ x("h3", { children: "Impuestos trasladados" }),
        /* @__PURE__ */ x("strong", { children: he(m) }),
        /* @__PURE__ */ x("span", { children: "IVA menos retenciones" })
      ] }),
      /* @__PURE__ */ A(ve, { className: "fact-report-item", children: [
        /* @__PURE__ */ x("h3", { children: "Cuentas por cobrar" }),
        /* @__PURE__ */ x("strong", { children: he(u.filter((g) => ["Pendiente", "Emitida"].includes(g.estado)).reduce((g, O) => g + O.total, 0)) }),
        /* @__PURE__ */ x("span", { children: "Facturas no pagadas" })
      ] }),
      /* @__PURE__ */ A(ve, { className: "fact-report-item", children: [
        /* @__PURE__ */ x("h3", { children: "Subtotal facturado" }),
        /* @__PURE__ */ x("strong", { children: he(h) }),
        /* @__PURE__ */ x("span", { children: "Antes de impuestos" })
      ] }),
      /* @__PURE__ */ A(ve, { className: "fact-report-item", children: [
        /* @__PURE__ */ x("h3", { children: "Productos en catálogo" }),
        /* @__PURE__ */ x("strong", { children: t.length }),
        /* @__PURE__ */ x("span", { children: "Servicios disponibles" })
      ] }),
      /* @__PURE__ */ A(ve, { className: "fact-report-item", children: [
        /* @__PURE__ */ x("h3", { children: "Clientes activos" }),
        /* @__PURE__ */ x("strong", { children: r.length }),
        /* @__PURE__ */ x("span", { children: "En el directorio" })
      ] })
    ] }),
    /* @__PURE__ */ A(ve, { children: [
      /* @__PURE__ */ x("div", { className: "fact-card__head", children: /* @__PURE__ */ x("h3", { children: "Ventas por cliente" }) }),
      /* @__PURE__ */ x("div", { style: { paddingTop: 13 }, children: /* @__PURE__ */ x(ut, { columnas: [{ clave: "cliente", titulo: "Cliente", render: (g) => g.nombre }, { clave: "importe", titulo: "Importe facturado", render: (g) => /* @__PURE__ */ x("strong", { children: he(g.importe) }) }], filas: v.map(([g, O], S) => ({ id: String(S), nombre: g, importe: O })) }) })
    ] }),
    /* @__PURE__ */ x(ve, { children: /* @__PURE__ */ x("div", { style: { paddingTop: 13 }, children: /* @__PURE__ */ x(ut, { columnas: p, filas: u }) }) }),
    l && /* @__PURE__ */ A("div", { className: "fact-toast", role: "status", onClick: () => f(""), children: [
      l,
      " · Cerrar"
    ] })
  ] });
}
function tq() {
  const e = Oe((s) => s.datosFiscales), t = Oe((s) => s.actualizarDatosFiscales), [r, n] = J(e), [a, i] = J(""), o = (s, l) => n((f) => ({ ...f, [s]: l })), c = (s, l, f = "text") => /* @__PURE__ */ A("label", { className: "fact-field", children: [
    s,
    /* @__PURE__ */ x("input", { type: f, value: String(r[l]), onChange: (u) => o(l, f === "number" ? Number(u.target.value) : u.target.value) })
  ] });
  return /* @__PURE__ */ A("div", { className: "fact-page", children: [
    /* @__PURE__ */ A("div", { className: "fact-page-heading", children: [
      /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ x("h2", { children: "Preferencias fiscales" }),
        /* @__PURE__ */ x("p", { children: "Identidad, folios, impuestos y credenciales de timbrado." })
      ] }),
      /* @__PURE__ */ x(de, { variante: "primario", icono: /* @__PURE__ */ x(qw, { size: 15 }), onClick: () => {
        t(r), i("Configuración guardada en esta instancia.");
      }, children: "Guardar cambios" })
    ] }),
    /* @__PURE__ */ A(ve, { className: "fact-form-section", children: [
      /* @__PURE__ */ x("h3", { className: "fact-section-title", children: "Datos fiscales de la empresa" }),
      /* @__PURE__ */ A("div", { className: "fact-form-grid", children: [
        c("Razón social", "razonSocial"),
        c("RFC", "rfc"),
        c("Régimen fiscal", "regimenFiscal"),
        c("Código postal fiscal", "codigoPostal")
      ] })
    ] }),
    /* @__PURE__ */ A(ve, { className: "fact-form-section", children: [
      /* @__PURE__ */ x("h3", { className: "fact-section-title", children: "Series y folios" }),
      /* @__PURE__ */ A("div", { className: "fact-form-grid", children: [
        c("Serie", "serie"),
        c("Siguiente folio", "siguienteFolio", "number")
      ] })
    ] }),
    /* @__PURE__ */ A(ve, { className: "fact-form-section", children: [
      /* @__PURE__ */ x("h3", { className: "fact-section-title", children: "Impuestos por defecto" }),
      /* @__PURE__ */ A("div", { className: "fact-form-grid", children: [
        c("IVA (%)", "tasaIva", "number"),
        c("Retención ISR (%)", "retencionIsr", "number"),
        c("Retención IVA (%)", "retencionIva", "number")
      ] })
    ] }),
    /* @__PURE__ */ A(ve, { className: "fact-form-section", children: [
      /* @__PURE__ */ x("h3", { className: "fact-section-title", children: "Plantilla de representación impresa" }),
      /* @__PURE__ */ A("div", { className: "fact-form-grid", children: [
        /* @__PURE__ */ A("label", { className: "fact-field", children: [
          "Plantilla PDF",
          /* @__PURE__ */ A("select", { children: [
            /* @__PURE__ */ x("option", { children: "Clásica Norte" }),
            /* @__PURE__ */ x("option", { children: "Minimalista" }),
            /* @__PURE__ */ x("option", { children: "Corporativa" })
          ] })
        ] }),
        /* @__PURE__ */ A("label", { className: "fact-field", children: [
          "Color principal",
          /* @__PURE__ */ x("input", { type: "color", defaultValue: "#4F8DF7" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ A(ve, { className: "fact-form-section", children: [
      /* @__PURE__ */ x("h3", { className: "fact-section-title", children: "Integración PAC" }),
      /* @__PURE__ */ x("p", { style: { color: "var(--fact-muted)", fontSize: 11, marginBottom: 13 }, children: "Credenciales almacenadas solo al conectar un proveedor de timbrado." }),
      /* @__PURE__ */ A("div", { className: "fact-form-grid", children: [
        c("Usuario PAC", "pacUsuario"),
        c("API key", "pacApiKey", "password"),
        /* @__PURE__ */ A("label", { className: "fact-field", children: [
          "Ambiente",
          /* @__PURE__ */ A("select", { children: [
            /* @__PURE__ */ x("option", { children: "Pruebas" }),
            /* @__PURE__ */ x("option", { children: "Producción" })
          ] })
        ] })
      ] })
    ] }),
    a && /* @__PURE__ */ A("div", { className: "fact-toast", role: "status", onClick: () => i(""), children: [
      a,
      " · Cerrar"
    ] })
  ] });
}
function rq() {
  return /* @__PURE__ */ A(T1, { children: [
    /* @__PURE__ */ x(tt, { index: !0, element: /* @__PURE__ */ x(W7, {}) }),
    /* @__PURE__ */ x(tt, { path: "facturas/nueva", element: /* @__PURE__ */ x(V7, {}) }),
    /* @__PURE__ */ x(tt, { path: "facturas", element: /* @__PURE__ */ x(q7, {}) }),
    /* @__PURE__ */ x(tt, { path: "canceladas", element: /* @__PURE__ */ x(G7, {}) }),
    /* @__PURE__ */ x(tt, { path: "pagos", element: /* @__PURE__ */ x(Y7, {}) }),
    /* @__PURE__ */ x(tt, { path: "cotizaciones", element: /* @__PURE__ */ x(K7, {}) }),
    /* @__PURE__ */ x(tt, { path: "notas-credito", element: /* @__PURE__ */ x(X7, {}) }),
    /* @__PURE__ */ x(tt, { path: "recurrentes", element: /* @__PURE__ */ x(Z7, {}) }),
    /* @__PURE__ */ x(tt, { path: "clientes", element: /* @__PURE__ */ x(J7, {}) }),
    /* @__PURE__ */ x(tt, { path: "productos", element: /* @__PURE__ */ x(Q7, {}) }),
    /* @__PURE__ */ x(tt, { path: "reportes", element: /* @__PURE__ */ x(eq, {}) }),
    /* @__PURE__ */ x(tt, { path: "configuracion", element: /* @__PURE__ */ x(tq, {}) }),
    /* @__PURE__ */ x(tt, { path: "*", element: /* @__PURE__ */ x(A1, { to: "/", replace: !0 }) })
  ] });
}
function nq(e) {
  const t = e.startsWith("/") ? e : `/${e}`;
  return t.length > 1 ? t.replace(/\/$/, "") : t;
}
function cq({ basename: e = "/facturacion", apiBaseUrl: t, api: r, usuarioActual: n, onSalir: a, tema: i = "claro" }) {
  const o = nq(e);
  return /* @__PURE__ */ x("div", { className: `fact-module fact-theme-${i}`, "data-facturacion-root": "true", children: /* @__PURE__ */ x(xw, { apiBaseUrl: t, api: r, tema: i, children: /* @__PURE__ */ x(_1, { basename: o, initialEntries: [`${o}/`], children: /* @__PURE__ */ x(rx, { usuario: n, onSalir: a, children: /* @__PURE__ */ x(rq, {}) }) }) }) });
}
export {
  cq as ModuloFacturacion
};
