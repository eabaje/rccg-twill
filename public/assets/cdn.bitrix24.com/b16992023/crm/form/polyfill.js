(function () {
    (function () {
        (function () {
            "use strict";
            if (typeof Array.prototype.find !== "function") {
                Object.defineProperty(Array.prototype, "find", {
                    enumerable: false,
                    value: function (t, r) {
                        if (this === null) {
                            throw new TypeError("Cannot read property 'find' of null");
                        }
                        if (typeof t !== "function") {
                            throw new TypeError(typeof t + " is not a function");
                        }
                        var n = this.length;
                        for (var e = 0; e < n; e++) {
                            if (t.call(r, this[e], e, this)) {
                                return this[e];
                            }
                        }
                    },
                });
            }
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/main/polyfill/find/js/find.map.js
    })();

    (function () {
        (function () {
            "use strict";
            if (typeof Array.prototype.includes !== "function") {
                Object.defineProperty(Array.prototype, "includes", {
                    enumerable: false,
                    value: function (e) {
                        var t = this.find(function (t) {
                            return t === e;
                        });
                        return t === e;
                    },
                });
            }
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/main/polyfill/includes/js/includes.map.js
    })();

    (function () {
        (function (e) {
            "use strict";
            if (typeof e.Promise === "undefined" || e.Promise.toString().indexOf("[native code]") === -1) {
                var n = "[[PromiseStatus]]";
                var t = "[[PromiseValue]]";
                var r = "pending";
                var i = "internal pending";
                var o = "resolved";
                var f = "rejected";
                var c = function (e, f) {
                    if (e[n] === i) {
                        e = e[t];
                    }
                    if (e[n] === r) {
                        e.deferreds.push(f);
                    } else {
                        e.handled = true;
                        setTimeout(function () {
                            var r = e[n] === o ? f.onFulfilled : f.onRejected;
                            if (r) {
                                try {
                                    u(f.promise, r(e[t]));
                                } catch (e) {
                                    s(f.promise, e);
                                }
                            } else {
                                if (e[n] === o) {
                                    u(f.promise, e[t]);
                                } else {
                                    s(f.promise, e[t]);
                                }
                            }
                        }, 0);
                    }
                };
                var u = function (e, r) {
                    if (r === e) {
                        throw new TypeError("A promise cannot be resolved with it promise.");
                    }
                    try {
                        if (r && (typeof r === "object" || typeof r === "function")) {
                            if (r instanceof d) {
                                e[n] = i;
                                e[t] = r;
                                l(e);
                                return;
                            } else if (typeof r.then === "function") {
                                a(r.then.bind(r), e);
                                return;
                            }
                        }
                        e[n] = o;
                        e[t] = r;
                        l(e);
                    } catch (n) {
                        s(e, n);
                    }
                };
                var s = function (e, r) {
                    e[n] = f;
                    e[t] = r;
                    l(e);
                };
                var l = function (e) {
                    if (e[n] === f && e.deferreds.length === 0) {
                        setTimeout(function () {
                            if (!e.handled) {
                                console.error("Unhandled Promise Rejection: " + e[t]);
                            }
                        }, 0);
                    }
                    e.deferreds.forEach(function (n) {
                        c(e, n);
                    });
                    e.deferreds = null;
                };
                var a = function (e, n) {
                    var t = false;
                    try {
                        e(r, i);
                    } catch (e) {
                        if (!t) {
                            t = true;
                            s(n, e);
                        }
                    }
                    function r(e) {
                        if (!t) {
                            t = true;
                            u(n, e);
                        }
                    }
                    function i(e) {
                        if (!t) {
                            t = true;
                            s(n, e);
                        }
                    }
                };
                var h = function (e, n, t) {
                    this.onFulfilled = typeof e === "function" ? e : null;
                    this.onRejected = typeof n === "function" ? n : null;
                    this.promise = t;
                };
                var d = function (e) {
                    this[n] = r;
                    this[t] = null;
                    this.handled = false;
                    this.deferreds = [];
                    a(e, this);
                };
                d.prototype["catch"] = function (e) {
                    return this.then(null, e);
                };
                d.prototype.then = function (e, n) {
                    var t = new d(function () {});
                    c(this, new h(e, n, t));
                    return t;
                };
                d.all = function (e) {
                    var n = [].slice.call(e);
                    return new d(function (e, t) {
                        if (n.length === 0) {
                            e(n);
                        } else {
                            var r = n.length;
                            var i = function (o, f) {
                                try {
                                    if (f && (typeof f === "object" || typeof f === "function")) {
                                        if (typeof f.then === "function") {
                                            f.then.call(
                                                f,
                                                function (e) {
                                                    i(o, e);
                                                },
                                                t
                                            );
                                            return;
                                        }
                                    }
                                    n[o] = f;
                                    if (--r === 0) {
                                        e(n);
                                    }
                                } catch (e) {
                                    t(e);
                                }
                            };
                            for (var o = 0; o < n.length; o++) {
                                i(o, n[o]);
                            }
                        }
                    });
                };
                d.resolve = function (e) {
                    if (e && typeof e === "object" && e.constructor === d) {
                        return e;
                    }
                    return new d(function (n) {
                        n(e);
                    });
                };
                d.reject = function (e) {
                    return new d(function (n, t) {
                        t(e);
                    });
                };
                d.race = function (e) {
                    return new d(function (n, t) {
                        for (var r = 0, i = e.length; r < i; r++) {
                            e[r].then(n, t);
                        }
                    });
                };
                e.Promise = d;
            }
        })(window);
    })();

    (function () {
        (function () {
            if (!Object.assign) {
                Object.defineProperty(Object, "assign", {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    value: function (e, r) {
                        "use strict";
                        if (e === undefined || e === null) {
                            throw new TypeError("Cannot convert first argument to object");
                        }
                        var n = Object(e);
                        for (var t = 1; t < arguments.length; t++) {
                            var i = arguments[t];
                            if (i === undefined || i === null) {
                                continue;
                            }
                            var a = Object.keys(Object(i));
                            for (var u = 0, c = a.length; u < c; u++) {
                                var f = a[u];
                                var o = Object.getOwnPropertyDescriptor(i, f);
                                if (o !== undefined && o.enumerable) {
                                    n[f] = i[f];
                                }
                            }
                        }
                        return n;
                    },
                });
            }
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/crm/site/form/polyfill/lib/assign.map.js

        (function () {
            if (!Object.keys) {
                Object.keys = (function () {
                    "use strict";
                    var t = Object.prototype.hasOwnProperty,
                        r = !{ toString: null }.propertyIsEnumerable("toString"),
                        e = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                        o = e.length;
                    return function (n) {
                        if (typeof n !== "function" && (typeof n !== "object" || n === null)) {
                            throw new TypeError("Object.keys called on non-object");
                        }
                        var c = [],
                            i,
                            f;
                        for (i in n) {
                            if (t.call(n, i)) {
                                c.push(i);
                            }
                        }
                        if (r) {
                            for (f = 0; f < o; f++) {
                                if (t.call(n, e[f])) {
                                    c.push(e[f]);
                                }
                            }
                        }
                        return c;
                    };
                })();
            }
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/crm/site/form/polyfill/lib/objectkeys.map.js

        (function () {
            var t = {
                searchParams: "URLSearchParams" in self,
                iterable: "Symbol" in self && "iterator" in Symbol,
                blob:
                    "FileReader" in self &&
                    "Blob" in self &&
                    (function () {
                        try {
                            new Blob();
                            return true;
                        } catch (t) {
                            return false;
                        }
                    })(),
                formData: "FormData" in self,
                arrayBuffer: "ArrayBuffer" in self,
            };
            function e(t) {
                return t && DataView.prototype.isPrototypeOf(t);
            }
            if (t.arrayBuffer) {
                var r = [
                    "[object Int8Array]",
                    "[object Uint8Array]",
                    "[object Uint8ClampedArray]",
                    "[object Int16Array]",
                    "[object Uint16Array]",
                    "[object Int32Array]",
                    "[object Uint32Array]",
                    "[object Float32Array]",
                    "[object Float64Array]",
                ];
                var o =
                    ArrayBuffer.isView ||
                    function (t) {
                        return t && r.indexOf(Object.prototype.toString.call(t)) > -1;
                    };
            }
            function n(t) {
                if (typeof t !== "string") {
                    t = String(t);
                }
                if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t) || t === "") {
                    throw new TypeError("Invalid character in header field name");
                }
                return t.toLowerCase();
            }
            function i(t) {
                if (typeof t !== "string") {
                    t = String(t);
                }
                return t;
            }
            function s(e) {
                var r = {
                    next: function () {
                        var t = e.shift();
                        return { done: t === undefined, value: t };
                    },
                };
                if (t.iterable) {
                    r[Symbol.iterator] = function () {
                        return r;
                    };
                }
                return r;
            }
            function a(t) {
                this.map = {};
                if (t instanceof a) {
                    t.forEach(function (t, e) {
                        this.append(e, t);
                    }, this);
                } else if (Array.isArray(t)) {
                    t.forEach(function (t) {
                        this.append(t[0], t[1]);
                    }, this);
                } else if (t) {
                    Object.getOwnPropertyNames(t).forEach(function (e) {
                        this.append(e, t[e]);
                    }, this);
                }
            }
            a.prototype.append = function (t, e) {
                t = n(t);
                e = i(e);
                var r = this.map[t];
                this.map[t] = r ? r + ", " + e : e;
            };
            a.prototype["delete"] = function (t) {
                delete this.map[n(t)];
            };
            a.prototype.get = function (t) {
                t = n(t);
                return this.has(t) ? this.map[t] : null;
            };
            a.prototype.has = function (t) {
                return this.map.hasOwnProperty(n(t));
            };
            a.prototype.set = function (t, e) {
                this.map[n(t)] = i(e);
            };
            a.prototype.forEach = function (t, e) {
                for (var r in this.map) {
                    if (this.map.hasOwnProperty(r)) {
                        t.call(e, this.map[r], r, this);
                    }
                }
            };
            a.prototype.keys = function () {
                var t = [];
                this.forEach(function (e, r) {
                    t.push(r);
                });
                return s(t);
            };
            a.prototype.values = function () {
                var t = [];
                this.forEach(function (e) {
                    t.push(e);
                });
                return s(t);
            };
            a.prototype.entries = function () {
                var t = [];
                this.forEach(function (e, r) {
                    t.push([r, e]);
                });
                return s(t);
            };
            if (t.iterable) {
                a.prototype[Symbol.iterator] = a.prototype.entries;
            }
            function f(t) {
                if (t.bodyUsed) {
                    return Promise.reject(new TypeError("Already read"));
                }
                t.bodyUsed = true;
            }
            function u(t) {
                return new Promise(function (e, r) {
                    t.onload = function () {
                        e(t.result);
                    };
                    t.onerror = function () {
                        r(t.error);
                    };
                });
            }
            function h(t) {
                var e = new FileReader();
                var r = u(e);
                e.readAsArrayBuffer(t);
                return r;
            }
            function l(t) {
                var e = new FileReader();
                var r = u(e);
                e.readAsText(t);
                return r;
            }
            function d(t) {
                var e = new Uint8Array(t);
                var r = new Array(e.length);
                for (var o = 0; o < e.length; o++) {
                    r[o] = String.fromCharCode(e[o]);
                }
                return r.join("");
            }
            function y(t) {
                if (t.slice) {
                    return t.slice(0);
                } else {
                    var e = new Uint8Array(t.byteLength);
                    e.set(new Uint8Array(t));
                    return e.buffer;
                }
            }
            function c() {
                this.bodyUsed = false;
                this._initBody = function (r) {
                    this._bodyInit = r;
                    if (!r) {
                        this._bodyText = "";
                    } else if (typeof r === "string") {
                        this._bodyText = r;
                    } else if (t.blob && Blob.prototype.isPrototypeOf(r)) {
                        this._bodyBlob = r;
                    } else if (t.formData && FormData.prototype.isPrototypeOf(r)) {
                        this._bodyFormData = r;
                    } else if (t.searchParams && URLSearchParams.prototype.isPrototypeOf(r)) {
                        this._bodyText = r.toString();
                    } else if (t.arrayBuffer && t.blob && e(r)) {
                        this._bodyArrayBuffer = y(r.buffer);
                        this._bodyInit = new Blob([this._bodyArrayBuffer]);
                    } else if (t.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(r) || o(r))) {
                        this._bodyArrayBuffer = y(r);
                    } else {
                        this._bodyText = r = Object.prototype.toString.call(r);
                    }
                    if (!this.headers.get("content-type")) {
                        if (typeof r === "string") {
                            this.headers.set("content-type", "text/plain;charset=UTF-8");
                        } else if (this._bodyBlob && this._bodyBlob.type) {
                            this.headers.set("content-type", this._bodyBlob.type);
                        } else if (t.searchParams && URLSearchParams.prototype.isPrototypeOf(r)) {
                            this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                        }
                    }
                };
                if (t.blob) {
                    this.blob = function () {
                        var t = f(this);
                        if (t) {
                            return t;
                        }
                        if (this._bodyBlob) {
                            return Promise.resolve(this._bodyBlob);
                        } else if (this._bodyArrayBuffer) {
                            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                        } else if (this._bodyFormData) {
                            throw new Error("could not read FormData body as blob");
                        } else {
                            return Promise.resolve(new Blob([this._bodyText]));
                        }
                    };
                    this.arrayBuffer = function () {
                        if (this._bodyArrayBuffer) {
                            return f(this) || Promise.resolve(this._bodyArrayBuffer);
                        } else {
                            return this.blob().then(h);
                        }
                    };
                }
                this.text = function () {
                    var t = f(this);
                    if (t) {
                        return t;
                    }
                    if (this._bodyBlob) {
                        return l(this._bodyBlob);
                    } else if (this._bodyArrayBuffer) {
                        return Promise.resolve(d(this._bodyArrayBuffer));
                    } else if (this._bodyFormData) {
                        throw new Error("could not read FormData body as text");
                    } else {
                        return Promise.resolve(this._bodyText);
                    }
                };
                if (t.formData) {
                    this.formData = function () {
                        return this.text().then(w);
                    };
                }
                this.json = function () {
                    return this.text().then(JSON.parse);
                };
                return this;
            }
            var p = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            function b(t) {
                var e = t.toUpperCase();
                return p.indexOf(e) > -1 ? e : t;
            }
            function m(t, e) {
                e = e || {};
                var r = e.body;
                if (t instanceof m) {
                    if (t.bodyUsed) {
                        throw new TypeError("Already read");
                    }
                    this.url = t.url;
                    this.credentials = t.credentials;
                    if (!e.headers) {
                        this.headers = new a(t.headers);
                    }
                    this.method = t.method;
                    this.mode = t.mode;
                    this.signal = t.signal;
                    if (!r && t._bodyInit != null) {
                        r = t._bodyInit;
                        t.bodyUsed = true;
                    }
                } else {
                    this.url = String(t);
                }
                this.credentials = e.credentials || this.credentials || "same-origin";
                if (e.headers || !this.headers) {
                    this.headers = new a(e.headers);
                }
                this.method = b(e.method || this.method || "GET");
                this.mode = e.mode || this.mode || null;
                this.signal = e.signal || this.signal;
                this.referrer = null;
                if ((this.method === "GET" || this.method === "HEAD") && r) {
                    throw new TypeError("Body not allowed for GET or HEAD requests");
                }
                this._initBody(r);
            }
            m.prototype.clone = function () {
                return new m(this, { body: this._bodyInit });
            };
            function w(t) {
                var e = new FormData();
                t.trim()
                    .split("&")
                    .forEach(function (t) {
                        if (t) {
                            var r = t.split("=");
                            var o = r.shift().replace(/\+/g, " ");
                            var n = r.join("=").replace(/\+/g, " ");
                            e.append(decodeURIComponent(o), decodeURIComponent(n));
                        }
                    });
                return e;
            }
            function v(t) {
                var e = new a();
                var r = t.replace(/\r?\n[\t ]+/g, " ");
                r.split(/\r?\n/).forEach(function (t) {
                    var r = t.split(":");
                    var o = r.shift().trim();
                    if (o) {
                        var n = r.join(":").trim();
                        e.append(o, n);
                    }
                });
                return e;
            }
            c.call(m.prototype);
            function A(t, e) {
                if (!e) {
                    e = {};
                }
                this.type = "default";
                this.status = e.status === undefined ? 200 : e.status;
                this.ok = this.status >= 200 && this.status < 300;
                this.statusText = "statusText" in e ? e.statusText : "OK";
                this.headers = new a(e.headers);
                this.url = e.url || "";
                this._initBody(t);
            }
            c.call(A.prototype);
            A.prototype.clone = function () {
                return new A(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new a(this.headers), url: this.url });
            };
            A.error = function () {
                var t = new A(null, { status: 0, statusText: "" });
                t.type = "error";
                return t;
            };
            var _ = [301, 302, 303, 307, 308];
            A.redirect = function (t, e) {
                if (_.indexOf(e) === -1) {
                    throw new RangeError("Invalid status code");
                }
                return new A(null, { status: e, headers: { location: t } });
            };
            var g = self.DOMException;
            try {
                new g();
            } catch (t) {
                g = function (t, e) {
                    this.message = t;
                    this.name = e;
                    var r = Error(t);
                    this.stack = r.stack;
                };
                g.prototype = Object.create(Error.prototype);
                g.prototype.constructor = g;
            }
            function B(e, r) {
                return new Promise(function (o, n) {
                    var i = new m(e, r);
                    if (i.signal && i.signal.aborted) {
                        return n(new g("Aborted", "AbortError"));
                    }
                    var s = new XMLHttpRequest();
                    function a() {
                        s.abort();
                    }
                    s.onload = function () {
                        var t = { status: s.status, statusText: s.statusText, headers: v(s.getAllResponseHeaders() || "") };
                        t.url = "responseURL" in s ? s.responseURL : t.headers.get("X-Request-URL");
                        var e = "response" in s ? s.response : s.responseText;
                        o(new A(e, t));
                    };
                    s.onerror = function () {
                        n(new TypeError("Network request failed"));
                    };
                    s.ontimeout = function () {
                        n(new TypeError("Network request failed"));
                    };
                    s.onabort = function () {
                        n(new g("Aborted", "AbortError"));
                    };
                    s.open(i.method, i.url, true);
                    if (i.credentials === "include") {
                        s.withCredentials = true;
                    } else if (i.credentials === "omit") {
                        s.withCredentials = false;
                    }
                    if ("responseType" in s && t.blob) {
                        s.responseType = "blob";
                    }
                    i.headers.forEach(function (t, e) {
                        s.setRequestHeader(e, t);
                    });
                    if (i.signal) {
                        i.signal.addEventListener("abort", a);
                        s.onreadystatechange = function () {
                            if (s.readyState === 4) {
                                i.signal.removeEventListener("abort", a);
                            }
                        };
                    }
                    s.send(typeof i._bodyInit === "undefined" ? null : i._bodyInit);
                });
            }
            B.polyfill = true;
            if (!self.fetch) {
                self.fetch = B;
                self.Headers = a;
                self.Request = m;
                self.Response = A;
            }
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/crm/site/form/polyfill/lib/fetch.map.js

        (function () {
            if (typeof window.CustomEvent === "function") return false;
            function e(e, n) {
                n = n || { bubbles: false, cancelable: false, detail: null };
                var t = document.createEvent("CustomEvent");
                t.initCustomEvent(e, n.bubbles, n.cancelable, n.detail);
                return t;
            }
            window.CustomEvent = e;
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/crm/site/form/polyfill/lib/customevent.map.js

        (function () {
            var t;
            function e(t) {
                var e = 0;
                return function () {
                    return e < t.length ? { done: !1, value: t[e++] } : { done: !0 };
                };
            }
            var n =
                    "function" == typeof Object.defineProperties
                        ? Object.defineProperty
                        : function (t, e, n) {
                              t != Array.prototype && t != Object.prototype && (t[e] = n.value);
                          },
                r = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
            function o() {
                o = function () {};
                r.Symbol || (r.Symbol = a);
            }
            function i(t, e) {
                this.o = t;
                n(this, "description", { configurable: !0, writable: !0, value: e });
            }
            i.prototype.toString = function () {
                return this.o;
            };
            var a = (function () {
                function t(n) {
                    if (this instanceof t) throw new TypeError("Symbol is not a constructor");
                    return new i("jscomp_symbol_" + (n || "") + "_" + e++, n);
                }
                var e = 0;
                return t;
            })();
            function u() {
                o();
                var t = r.Symbol.iterator;
                t || (t = r.Symbol.iterator = r.Symbol("Symbol.iterator"));
                "function" != typeof Array.prototype[t] &&
                    n(Array.prototype, t, {
                        configurable: !0,
                        writable: !0,
                        value: function () {
                            return l(e(this));
                        },
                    });
                u = function () {};
            }
            function l(t) {
                u();
                t = { next: t };
                t[r.Symbol.iterator] = function () {
                    return this;
                };
                return t;
            }
            function f(t) {
                var n = "undefined" != typeof Symbol && Symbol.iterator && t[Symbol.iterator];
                return n ? n.call(t) : { next: e(t) };
            }
            var s;
            if ("function" == typeof Object.setPrototypeOf) s = Object.setPrototypeOf;
            else {
                var c;
                t: {
                    var p = { u: !0 },
                        h = {};
                    try {
                        h.__proto__ = p;
                        c = h.u;
                        break t;
                    } catch (t) {}
                    c = !1;
                }
                s = c
                    ? function (t, e) {
                          t.__proto__ = e;
                          if (t.__proto__ !== e) throw new TypeError(t + " is not extensible");
                          return t;
                      }
                    : null;
            }
            var y = s;
            function v() {
                this.h = !1;
                this.f = null;
                this.m = void 0;
                this.c = 1;
                this.l = this.v = 0;
                this.g = null;
            }
            function b(t) {
                if (t.h) throw new TypeError("Generator is already running");
                t.h = !0;
            }
            v.prototype.i = function (t) {
                this.m = t;
            };
            v.prototype.j = function (t) {
                this.g = { w: t, A: !0 };
                this.c = this.v || this.l;
            };
            v.prototype["return"] = function (t) {
                this.g = { return: t };
                this.c = this.l;
            };
            function d(t, e) {
                t.c = 3;
                return { value: e };
            }
            function m(t) {
                this.a = new v();
                this.B = t;
            }
            m.prototype.i = function (t) {
                b(this.a);
                if (this.a.f) return w(this, this.a.f.next, t, this.a.i);
                this.a.i(t);
                return x(this);
            };
            function g(t, e) {
                b(t.a);
                var n = t.a.f;
                if (n)
                    return w(
                        t,
                        "return" in n
                            ? n["return"]
                            : function (t) {
                                  return { value: t, done: !0 };
                              },
                        e,
                        t.a["return"]
                    );
                t.a["return"](e);
                return x(t);
            }
            m.prototype.j = function (t) {
                b(this.a);
                if (this.a.f) return w(this, this.a.f["throw"], t, this.a.i);
                this.a.j(t);
                return x(this);
            };
            function w(t, e, n, r) {
                try {
                    var o = e.call(t.a.f, n);
                    if (!(o instanceof Object)) throw new TypeError("Iterator result " + o + " is not an object");
                    if (!o.done) return (t.a.h = !1), o;
                    var i = o.value;
                } catch (e) {
                    return (t.a.f = null), t.a.j(e), x(t);
                }
                t.a.f = null;
                r.call(t.a, i);
                return x(t);
            }
            function x(t) {
                for (; t.a.c; )
                    try {
                        var e = t.B(t.a);
                        if (e) return (t.a.h = !1), { value: e.value, done: !1 };
                    } catch (e) {
                        (t.a.m = void 0), t.a.j(e);
                    }
                t.a.h = !1;
                if (t.a.g) {
                    e = t.a.g;
                    t.a.g = null;
                    if (e.A) throw e.w;
                    return { value: e["return"], done: !0 };
                }
                return { value: void 0, done: !0 };
            }
            function S(t) {
                this.next = function (e) {
                    return t.i(e);
                };
                this["throw"] = function (e) {
                    return t.j(e);
                };
                this["return"] = function (e) {
                    return g(t, e);
                };
                u();
                this[Symbol.iterator] = function () {
                    return this;
                };
            }
            function j(t, e) {
                var n = new S(new m(e));
                y && y(n, t.prototype);
                return n;
            }
            if ("undefined" !== typeof Blob && ("undefined" === typeof FormData || !FormData.prototype.keys)) {
                var _ = function (t, e) {
                        for (var n = 0; n < t.length; n++) e(t[n]);
                    },
                    F = function (t, e, n) {
                        return e instanceof Blob ? [String(t), e, void 0 !== n ? n + "" : "string" === typeof e.name ? e.name : "blob"] : [String(t), String(e)];
                    },
                    B = function (t, e) {
                        if (t.length < e) throw new TypeError(e + " argument required, but only " + t.length + " present.");
                    },
                    M = function (t) {
                        var e = f(t);
                        t = e.next().value;
                        var n = e.next().value;
                        e = e.next().value;
                        n instanceof Blob && (n = new File([n], e, { type: n.type, lastModified: n.lastModified }));
                        return [t, n];
                    },
                    D = "object" === typeof window ? window : "object" === typeof self ? self : this,
                    q = D.FormData,
                    O = D.XMLHttpRequest && D.XMLHttpRequest.prototype.send,
                    R = D.Request && D.fetch,
                    H = D.navigator && D.navigator.sendBeacon;
                o();
                var T = D.Symbol && Symbol.toStringTag;
                T && (Blob.prototype[T] || (Blob.prototype[T] = "Blob"), "File" in D && !File.prototype[T] && (File.prototype[T] = "File"));
                try {
                    new File([], "");
                } catch (t) {
                    D.File = function (t, e, n) {
                        t = new Blob(t, n);
                        n = n && void 0 !== n.lastModified ? new Date(n.lastModified) : new Date();
                        Object.defineProperties(t, {
                            name: { value: e },
                            lastModifiedDate: { value: n },
                            lastModified: { value: +n },
                            toString: {
                                value: function () {
                                    return "[object File]";
                                },
                            },
                        });
                        T && Object.defineProperty(t, T, { value: "File" });
                        return t;
                    };
                }
                o();
                u();
                var A = function (t) {
                    this.b = [];
                    if (!t) return this;
                    var e = this;
                    _(t.elements, function (t) {
                        if (t.name && !t.disabled && "submit" !== t.type && "button" !== t.type)
                            if ("file" === t.type) {
                                var n = t.files && t.files.length ? t.files : [new File([], "", { type: "application/octet-stream" })];
                                _(n, function (n) {
                                    e.append(t.name, n);
                                });
                            } else
                                "select-multiple" === t.type || "select-one" === t.type
                                    ? _(t.options, function (n) {
                                          !n.disabled && n.selected && e.append(t.name, n.value);
                                      })
                                    : "checkbox" === t.type || "radio" === t.type
                                    ? t.checked && e.append(t.name, t.value)
                                    : ((n = "textarea" === t.type ? t.value.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n") : t.value), e.append(t.name, n));
                    });
                };
                t = A.prototype;
                t.append = function (t, e, n) {
                    B(arguments, 2);
                    var r = f(F.apply(null, arguments)),
                        o = r.next().value,
                        i = r.next().value;
                    r = r.next().value;
                    this.b.push([o, i, r]);
                };
                t["delete"] = function (t) {
                    B(arguments, 1);
                    var e = [];
                    t = String(t);
                    _(this.b, function (n) {
                        n[0] !== t && e.push(n);
                    });
                    this.b = e;
                };
                t.entries = function t() {
                    var e,
                        n = this;
                    return j(t, function (t) {
                        1 == t.c && (e = 0);
                        if (3 != t.c) return e < n.b.length ? (t = d(t, M(n.b[e]))) : ((t.c = 0), (t = void 0)), t;
                        e++;
                        t.c = 2;
                    });
                };
                t.forEach = function (t, e) {
                    B(arguments, 1);
                    for (var n = f(this), r = n.next(); !r.done; r = n.next()) {
                        var o = f(r.value);
                        r = o.next().value;
                        o = o.next().value;
                        t.call(e, o, r, this);
                    }
                };
                t.get = function (t) {
                    B(arguments, 1);
                    var e = this.b;
                    t = String(t);
                    for (var n = 0; n < e.length; n++) if (e[n][0] === t) return M(this.b[n])[1];
                    return null;
                };
                t.getAll = function (t) {
                    B(arguments, 1);
                    var e = [];
                    t = String(t);
                    for (var n = 0; n < this.b.length; n++) this.b[n][0] === t && e.push(M(this.b[n])[1]);
                    return e;
                };
                t.has = function (t) {
                    B(arguments, 1);
                    t = String(t);
                    for (var e = 0; e < this.b.length; e++) if (this.b[e][0] === t) return !0;
                    return !1;
                };
                t.keys = function t() {
                    var e = this,
                        n,
                        r,
                        o,
                        i,
                        a;
                    return j(t, function (t) {
                        1 == t.c && ((n = f(e)), (r = n.next()));
                        if (3 != t.c) {
                            if (r.done) {
                                t.c = 0;
                                return;
                            }
                            o = r.value;
                            i = f(o);
                            a = i.next().value;
                            return d(t, a);
                        }
                        r = n.next();
                        t.c = 2;
                    });
                };
                t.set = function (t, e, n) {
                    B(arguments, 2);
                    t = String(t);
                    for (var r = [], o = !1, i = 0; i < this.b.length; i++) this.b[i][0] === t ? o || ((r[i] = F.apply(null, arguments)), (o = !0)) : r.push(this.b[i]);
                    o || r.push(F.apply(null, arguments));
                    this.b = r;
                };
                t.values = function t() {
                    var e = this,
                        n,
                        r,
                        o,
                        i,
                        a;
                    return j(t, function (t) {
                        1 == t.c && ((n = f(e)), (r = n.next()));
                        if (3 != t.c) {
                            if (r.done) {
                                t.c = 0;
                                return;
                            }
                            o = r.value;
                            i = f(o);
                            i.next();
                            a = i.next().value;
                            return d(t, a);
                        }
                        r = n.next();
                        t.c = 2;
                    });
                };
                A.prototype._asNative = function () {
                    for (var t = new q(), e = f(this), n = e.next(); !n.done; n = e.next()) {
                        var r = f(n.value);
                        n = r.next().value;
                        r = r.next().value;
                        t.append(n, r);
                    }
                    return t;
                };
                A.prototype._blob = function () {
                    for (var t = "----formdata-polyfill-" + Math.random(), e = [], n = f(this), r = n.next(); !r.done; r = n.next()) {
                        var o = f(r.value);
                        r = o.next().value;
                        o = o.next().value;
                        e.push("--" + t + "\r\n");
                        o instanceof Blob
                            ? e.push('Content-Disposition: form-data; name="' + r + '"; filename="' + o.name + '"\r\n', "Content-Type: " + (o.type || "application/octet-stream") + "\r\n\r\n", o, "\r\n")
                            : e.push('Content-Disposition: form-data; name="' + r + '"\r\n\r\n' + o + "\r\n");
                    }
                    e.push("--" + t + "--");
                    return new Blob(e, { type: "multipart/form-data; boundary=" + t });
                };
                A.prototype[Symbol.iterator] = function () {
                    return this.entries();
                };
                A.prototype.toString = function () {
                    return "[object FormData]";
                };
                T && (A.prototype[T] = "FormData");
                if (O) {
                    var E = D.XMLHttpRequest.prototype.setRequestHeader;
                    D.XMLHttpRequest.prototype.setRequestHeader = function (t, e) {
                        E.call(this, t, e);
                        "content-type" === t.toLowerCase() && (this.s = !0);
                    };
                    D.XMLHttpRequest.prototype.send = function (t) {
                        t instanceof A ? ((t = t._blob()), this.s || this.setRequestHeader("Content-Type", t.type), O.call(this, t)) : O.call(this, t);
                    };
                }
                if (R) {
                    var L = D.fetch;
                    D.fetch = function (t, e) {
                        e && e.body && e.body instanceof A && (e.body = e.body._blob());
                        return L.call(this, t, e);
                    };
                }
                H &&
                    (D.navigator.sendBeacon = function (t, e) {
                        e instanceof A && (e = e._asNative());
                        return H.call(this, t, e);
                    });
                D.FormData = A;
            }
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/crm/site/form/polyfill/lib/formdata/formdata.map.js
    })();
})();
