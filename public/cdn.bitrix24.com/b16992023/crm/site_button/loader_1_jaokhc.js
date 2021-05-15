(function () {
    var webPacker = { address: "https://b24-p9cw17.bitrix24.com" };

    (function () {
        (function () {
            "use strict";
            if (typeof webPacker === "undefined") {
                return;
            }
            var e = [];
            function t(t) {
                this.name = t;
                e.push(this);
            }
            t.prototype = {
                language: null,
                languages: [],
                messages: {},
                properties: {},
                setProperties: function (e) {
                    this.properties = e || {};
                },
                loadResources: function (e) {
                    return (e || []).forEach(function (e) {
                        webPacker.resource.load(e, this);
                    }, this);
                },
                message: function (e) {
                    var t = this.messages;
                    if (e in t) {
                        return t[e];
                    }
                    var n = this.language || "en";
                    if (t[n] && t[n][e]) {
                        return t[n][e];
                    }
                    n = "en";
                    if (t[n] && t[n][e]) {
                        return t[n][e];
                    }
                    return "";
                },
                getMessages: function (e) {
                    var t = e || this.language || "en";
                    var n = this.messages;
                    if (n[t]) {
                        return n[t];
                    }
                    t = this.language || "en";
                    if (n[t]) {
                        return n[t];
                    }
                    if (n.en) {
                        return n.en;
                    }
                    return n;
                },
            };
            webPacker.getModule = function (e) {
                return this.getModules().filter(function (t) {
                    return t.name === e;
                })[0];
            };
            webPacker.getModules = function () {
                return e;
            };
            webPacker.module = t;
            webPacker.getAddress = function () {
                return this.address;
            };
            webPacker.resource = {
                load: function (e, t) {
                    switch (e.type) {
                        case "css":
                            this.loadCss(e.content);
                            break;
                        case "js":
                            this.loadJs(e.content || e.src, !e.content);
                            break;
                        case "html":
                        case "layout":
                            if (t) {
                                var n = t.messages[t.language] ? t.messages[t.language] : t.messages;
                                for (var r in n) {
                                    if (!n.hasOwnProperty(r)) {
                                        continue;
                                    }
                                    e.content = e.content.replace(new RegExp("%" + r + "%", "g"), n[r]);
                                }
                            }
                            this.loadLayout(e.content);
                            break;
                    }
                },
                loadLayout: function (e) {
                    if (!e) {
                        return;
                    }
                    var t = document.createElement("DIV");
                    t.innerHTML = e;
                    document.body.insertBefore(t, document.body.firstChild);
                },
                loadJs: function (e, t, n) {
                    if (!e) {
                        return;
                    }
                    var r = document.createElement("SCRIPT");
                    r.setAttribute("type", "text/javascript");
                    r.setAttribute("async", "");
                    if (t) {
                        r.setAttribute("src", src);
                    } else {
                        if (webPacker.browser.isIE()) {
                            r.text = text;
                        } else {
                            r.appendChild(document.createTextNode(e));
                        }
                    }
                    this.appendToHead(r, !t && n);
                },
                appendToHead: function (e, t) {
                    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(e);
                    if (t) {
                        document.head.removeChild(e);
                    }
                },
                loadCss: function (e) {
                    if (!e) {
                        return;
                    }
                    var t = document.createElement("STYLE");
                    t.setAttribute("type", "text/css");
                    if (t.styleSheet) {
                        t.styleSheet.cssText = e;
                    } else {
                        t.appendChild(document.createTextNode(e));
                    }
                    this.appendToHead(t);
                },
            };
            webPacker.type = {
                isArray: function (e) {
                    return e && Object.prototype.toString.call(e) === "[object Array]";
                },
                isString: function (e) {
                    return e === "" ? true : e ? typeof e === "string" || e instanceof String : false;
                },
                toArray: function (e) {
                    return Array.prototype.slice.call(e);
                },
            };
            webPacker.classes = {
                change: function (e, t, n) {
                    e ? (n ? this.add(e, t) : this.remove(e, t)) : null;
                },
                remove: function (e, t) {
                    e ? e.classList.remove(t) : null;
                },
                add: function (e, t) {
                    e ? e.classList.add(t) : null;
                },
                has: function (e, t) {
                    return e && e.classList.contains(t);
                },
            };
            webPacker.url = {};
            webPacker.url.parameter = {
                list: null,
                get: function (e) {
                    var t = this.getObject();
                    return t.hasOwnProperty(e) ? decodeURIComponent(t[e]) : null;
                },
                has: function (e) {
                    var t = this.getObject();
                    return t.hasOwnProperty(e);
                },
                getList: function () {
                    if (this.list) {
                        return this.list;
                    }
                    var e = window.location.search.substr(1);
                    if (e.length <= 1) {
                        return [];
                    }
                    this.list = e.split("&").map(function (e) {
                        var t = e.split("=");
                        return { name: t[0], value: t[1] || "" };
                    }, this);
                    return this.list;
                },
                getObject: function () {
                    return this.getList().reduce(function (e, t) {
                        e[t.name] = t.value;
                        return e;
                    }, {});
                },
            };
            webPacker.ready = function (e) {
                document.readyState === "complete" || document.readyState === "loaded" ? e() : this.addEventListener(window, "DOMContentLoaded", e);
            };
            webPacker.addEventListener = function (e, t, n) {
                e = e || window;
                if (window.addEventListener) {
                    e.addEventListener(t, n, false);
                } else {
                    e.attachEvent("on" + t, n);
                }
            };
            webPacker.event = {
                listeners: [],
                on: function (e, t, n) {
                    this.listeners
                        .filter(function (n) {
                            return n[0] === e && n[1] === t;
                        })
                        .forEach(function (e) {
                            e[2].apply(this, n);
                        });
                },
                listen: function (e, t, n) {
                    this.listeners.push([e, t, n]);
                },
            };
            webPacker.cookie = {
                setItem: function (e, t, n) {
                    try {
                        this.set(e, JSON.stringify(t), n);
                    } catch (e) {}
                },
                getItem: function (e) {
                    try {
                        return JSON.parse(this.get(e)) || null;
                    } catch (e) {
                        return null;
                    }
                },
                set: function (e, t, n) {
                    n = n || 3600 * 24 * 365 * 10;
                    var r = new Date(new Date().getTime() + 1e3 * n);
                    document.cookie = e + "=" + t + "; path=/; expires=" + r.toUTCString();
                },
                get: function (e) {
                    var t = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
                    return t ? decodeURIComponent(t[1]) : null;
                },
            };
            webPacker.ls = {
                supported: null,
                removeItem: function (e) {
                    if (!this.isSupported()) return;
                    window.localStorage.removeItem(e);
                },
                setItem: function (e, t, n) {
                    if (!this.isSupported()) return;
                    try {
                        if (n && t && typeof t === "object") {
                            n = parseInt(n);
                            t.cacheData = { time: parseInt(Date.now() / 1e3), ttl: isNaN(n) ? 3600 : n };
                        }
                        window.localStorage.setItem(e, JSON.stringify(t));
                    } catch (e) {}
                },
                getItem: function (e, t) {
                    if (!this.isSupported()) return null;
                    try {
                        var n = JSON.parse(window.localStorage.getItem(e)) || null;
                        if (t && n && typeof n === "object" && n.cacheData) {
                            t = parseInt(t);
                            t = t && !isNaN(t) ? t : n.cacheData.ttl;
                            if (parseInt(Date.now() / 1e3) > n.cacheData.time + t) {
                                n = null;
                                this.removeItem(e);
                            }
                        }
                        if (n && typeof n === "object") {
                            delete n.cacheData;
                        }
                        return n;
                    } catch (e) {
                        return null;
                    }
                },
                isSupported: function () {
                    if (this.supported === null) {
                        this.supported = false;
                        try {
                            var e = "b24crm-x-test";
                            window.localStorage.setItem(e, "x");
                            window.localStorage.removeItem(e);
                            this.supported = true;
                        } catch (e) {}
                    }
                    return this.supported;
                },
            };
            webPacker.browser = {
                isIOS: function () {
                    return /(iPad;)|(iPhone;)/i.test(navigator.userAgent);
                },
                isOpera: function () {
                    return navigator.userAgent.toLowerCase().indexOf("opera") !== -1;
                },
                isIE: function () {
                    return document.attachEvent && !this.isOpera();
                },
                isMobile: function () {
                    return /(ipad|iphone|android|mobile|touch)/i.test(navigator.userAgent);
                },
            };
            webPacker.analytics = {
                trackGa: function (e, t, n) {
                    if (window.gtag) {
                        if (e === "pageview") {
                            if (window.dataLayer) {
                                var r = window.dataLayer
                                    .filter(function (e) {
                                        return e[0] === "config";
                                    })
                                    .map(function (e) {
                                        return e[1];
                                    });
                                if (r.length > 0) {
                                    window.gtag("config", r[0], { page_path: t });
                                }
                            }
                        } else if (e === "event") {
                            window.gtag("event", n, { event_category: t });
                        }
                    } else if (window.dataLayer) {
                        if (e === "pageview") {
                            window.dataLayer.push({ event: "VirtualPageview", virtualPageURL: t });
                        } else if (e === "event") {
                            window.dataLayer.push({ event: "crm-form", eventCategory: t, eventAction: n });
                        }
                    } else if (typeof window.ga === "function") {
                        if (n) {
                            window.ga("send", e, t, n);
                        } else {
                            window.ga("send", e, t);
                        }
                    }
                },
                trackYa: function (e) {
                    if (!window["Ya"]) {
                        return;
                    }
                    var t;
                    if (Ya.Metrika && Ya.Metrika.counters()[0]) {
                        t = Ya.Metrika.counters()[0].id;
                    } else if (Ya.Metrika2 && Ya.Metrika2.counters()[0]) {
                        t = Ya.Metrika2.counters()[0].id;
                    }
                    if (t && window["yaCounter" + t]) {
                        window["yaCounter" + t].reachGoal(e);
                    }
                },
            };
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/ui/webpacker/ui.webpacker.map.js
    })();

    (function () {
        var module = new webPacker.module("crm.tracking.tracker.loader");
        (function (w, d, u) {
            var s = d.createElement("script");
            s.async = true;
            s.src = u + "?" + ((Date.now() / 60000) | 0);
            var h = d.getElementsByTagName("script")[0];
            h.parentNode.insertBefore(s, h);
        })(window, document, "https://cdn.bitrix24.com/b16992023/crm/tag/call.tracker.js");
    })();

    (function () {
        var module = new webPacker.module("crm.tracking.guest");
        module.setProperties({ lifespan: 28, canRegisterOrder: true });
        (function () {
            "use strict";
            if (typeof webPacker === "undefined") {
                return;
            }
            window.b24Tracker = window.b24Tracker || {};
            if (window.b24Tracker.guest) {
                return;
            }
            window.b24Tracker.guest = {
                cookieName: "b24_crm_guest_id",
                returnCookieName: "b24_crm_guest_id_returned",
                requestUrl: "",
                isInit: false,
                init: function () {
                    if (this.isInit) {
                        return;
                    }
                    this.isInit = true;
                    this.requestUrl = (webPacker.getAddress() + "/").match(/((http|https):\/\/[^\/]+?)\//)[1] + "/pub/guest.php";
                    if (module.properties["lifespan"]) {
                        var t = parseInt(module.properties["lifespan"]);
                        if (!isNaN(t) && t) {
                            i.lifespan = t;
                            n.lifespan = t;
                        }
                    }
                    e.collect();
                    i.collect();
                    n.collect();
                    s.collect();
                    this.checkReturn();
                    window.b24order = window.b24order || [];
                    window.b24order.forEach(function (e) {
                        this.registerOrder(e);
                    }, this);
                    window.b24order.push = function (e) {
                        this.registerOrder(e);
                    }.bind(this);
                },
                checkReturn: function () {
                    if (!this.getGidCookie() || webPacker.cookie.get(this.returnCookieName)) {
                        return;
                    }
                    a.query(this.requestUrl, { a: "event", e: "Return" }, this.onAjaxResponse.bind(this));
                    webPacker.cookie.set(this.returnCookieName, "y", 3600 * 6);
                },
                storeTrace: function (e, t) {
                    t = t || "storeTrace";
                    a.query(this.requestUrl, { a: t, d: { trace: e } });
                },
                link: function (e) {
                    if (!e || this.getGidCookie()) {
                        return;
                    }
                    a.query(this.requestUrl, { a: "link", gid: e }, this.onAjaxResponse.bind(this));
                },
                register: function () {
                    if (this.getGidCookie()) {
                        return;
                    }
                    a.query(this.requestUrl, { a: "register" }, this.onAjaxResponse.bind(this));
                },
                onAjaxResponse: function (e) {
                    e = e || {};
                    e.data = e.data || {};
                    if (this.getGidCookie() == null && !!e.data.gid) {
                        webPacker.cookie.set(this.cookieName, e.data.gid);
                        webPacker.cookie.set(this.returnCookieName, "y", 3600 * 6);
                    }
                },
                getPages: function () {
                    return s.list();
                },
                getTags: function () {
                    return i.list();
                },
                registerOrder: function (e) {
                    if (!module.properties["canRegisterOrder"]) {
                        return;
                    }
                    this.storeTrace(this.getTraceOrder(e), "registerOrder");
                },
                getTraceOrder: function (e) {
                    e = e || {};
                    var t = e.id || "";
                    if (!Number.isNaN(t) && typeof t === "number") {
                        t = t.toString();
                    }
                    if (!t || !webPacker.type.isString(t) || !t.match(/^[\d\w.\-\/\\_#]{1,30}$/i)) {
                        if (window.console && window.console.error) {
                            window.console.error("Wrong order id: " + e.id);
                        }
                    }
                    var r = parseFloat(e.sum);
                    if (isNaN(r) || r < 0) {
                        if (window.console && window.console.error) {
                            window.console.error("Wrong order sum: " + e.sum);
                        }
                    }
                    this.sentOrders = this.sentOrders || [];
                    if (this.sentOrders.indexOf(t) >= 0) {
                        return;
                    }
                    this.sentOrders.push(t);
                    return this.getTrace({ channels: [{ code: "order", value: t }], order: { id: t, sum: r } });
                },
                getTrace: function (t) {
                    var r = this.remindTrace(t);
                    e.clear();
                    return r;
                },
                remindTrace: function (t) {
                    return JSON.stringify(e.current(t));
                },
                getUtmSource: function () {
                    return this.getTags().utm_source || "";
                },
                isUtmSourceDetected: function () {
                    return i.isSourceDetected();
                },
                getGidCookie: function () {
                    return webPacker.cookie.get(this.cookieName);
                },
            };
            var e = {
                maxCount: 5,
                lsKey: "b24_crm_guest_traces",
                previous: function () {
                    return webPacker.ls.getItem(this.lsKey) || { list: [] };
                },
                current: function (e) {
                    e = e || {};
                    var r = { url: window.location.href, ref: n.getData().ref, device: { isMobile: webPacker.browser.isMobile() }, tags: i.getData(), client: t.getData(), pages: { list: s.list() }, gid: b24Tracker.guest.getGidCookie() };
                    if (e.previous !== false) {
                        r.previous = this.previous();
                    }
                    if (e.channels) {
                        r.channels = e.channels;
                    }
                    if (e.order) {
                        r.order = e.order;
                    }
                    return r;
                },
                clear: function () {
                    webPacker.ls.removeItem(this.lsKey);
                },
                collect: function () {
                    if (!i.isSourceDetected() && !n.detect().newest) {
                        return;
                    }
                    var e = this.current({ previous: false });
                    if (!e.pages.list) {
                        return;
                    }
                    var t = this.previous();
                    t = t || {};
                    t.list = t.list || [];
                    t.list.push(this.current({ previous: false }));
                    if (t.list.length > this.maxCount) {
                        t.list.shift();
                    }
                    i.clear();
                    s.clear();
                    webPacker.ls.setItem(this.lsKey, t);
                },
            };
            var t = {
                getData: function () {
                    var e = { gaId: this.getGaId(), yaId: this.getYaId() };
                    if (!e.gaId) delete e["gaId"];
                    if (!e.yaId) delete e["yaId"];
                    return e;
                },
                getGaId: function () {
                    var e;
                    if (typeof window.ga === "function") {
                        ga(function (t) {
                            e = t.get("clientId");
                        });
                        if (e) {
                            return e;
                        }
                        if (ga.getAll && ga.getAll()[0]) {
                            e = ga.getAll()[0].get("clientId");
                        }
                    }
                    if (e) {
                        return e;
                    }
                    e = (document.cookie || "").match(/_ga=(.+?);/);
                    if (e) {
                        e = (e[1] || "").split(".").slice(-2).join(".");
                    }
                    return e ? e : null;
                },
                getYaId: function () {
                    var e;
                    if (window.Ya) {
                        var t;
                        if (Ya.Metrika && Ya.Metrika.counters()[0]) {
                            t = Ya.Metrika.counters()[0].id;
                        } else if (Ya.Metrika2 && Ya.Metrika2.counters()[0]) {
                            t = Ya.Metrika2.counters()[0].id;
                        }
                        if (!t) {
                            return null;
                        }
                        if (window.ym && typeof window.ym === "object") {
                            ym(t, "getClientID", function (t) {
                                e = t;
                            });
                        }
                        if (!e && window["yaCounter" + t]) {
                            e = window["yaCounter" + t].getClientID();
                        }
                    }
                    if (!e) {
                        e = webPacker.cookie.get("_ym_uid");
                    }
                    return e ? e : null;
                },
            };
            var r = null;
            var i = {
                lifespan: 28,
                lsPageKey: "b24_crm_guest_utm",
                tags: ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"],
                sameTagLifeSpan: 3600,
                list: function () {
                    return this.getData().list || {};
                },
                isSourceDetected: function () {
                    if (r === null) {
                        var e = this.tags[0];
                        var t = webPacker.url.parameter.get(e);
                        if (t === null || !t) {
                            r = false;
                        } else if (this.list()[e] !== t) {
                            r = true;
                        } else {
                            r = this.getTimestamp(true) - this.getTimestamp() > this.sameTagLifeSpan;
                        }
                    }
                    return r;
                },
                getGCLid: function () {
                    return this.getData().gclid || null;
                },
                getTimestamp: function (e) {
                    return (e ? null : parseInt(this.getData().ts)) || parseInt(Date.now() / 1e3);
                },
                getData: function () {
                    return (webPacker.ls.isSupported() ? webPacker.ls.getItem(this.lsPageKey) : webPacker.cookie.getItem(this.lsPageKey)) || {};
                },
                clear: function () {
                    webPacker.ls.removeItem(this.lsPageKey);
                },
                collect: function () {
                    var e = this.getTimestamp();
                    var t = webPacker.url.parameter.getList().filter(function (e) {
                        return this.tags.indexOf(e.name) > -1;
                    }, this);
                    if (t.length > 0) {
                        t = t
                            .filter(function (e) {
                                return e.value.trim().length > 0;
                            })
                            .reduce(function (e, t) {
                                e[t.name] = decodeURIComponent(t.value);
                                return e;
                            }, {});
                        e = this.getTimestamp(true);
                    } else {
                        t = this.list();
                    }
                    var r = webPacker.url.parameter
                        .getList()
                        .filter(function (e) {
                            return e.name === "gclid";
                        }, this)
                        .map(function (e) {
                            return e.value;
                        });
                    r = r[0] || this.getGCLid();
                    if (this.getTimestamp(true) - e > this.lifespan * 3600 * 24) {
                        this.clear();
                        return;
                    }
                    var i = { ts: e, list: t, gclid: r };
                    webPacker.ls.isSupported() ? webPacker.ls.setItem(this.lsPageKey, i) : webPacker.cookie.setItem(this.lsPageKey, i);
                },
            };
            var n = {
                lifespan: 28,
                lsKey: "b24_crm_guest_ref",
                sameRefLifeSpan: 3600,
                detect: function () {
                    var e = { detected: false, existed: false, expired: false, newest: false, value: null };
                    var t = document.referrer;
                    if (!t) {
                        return e;
                    }
                    var r = document.createElement("a");
                    r.href = t;
                    if (!r.hostname) {
                        return e;
                    }
                    if (r.hostname === window.location.hostname) {
                        return e;
                    }
                    e.value = t;
                    e.detected = true;
                    if (t !== this.getData().ref) {
                        e.newest = true;
                        return e;
                    }
                    e.existed = true;
                    if (this.getTs(true) - this.getTs() > this.sameRefLifeSpan) {
                        e.expired = true;
                        return e;
                    }
                    return false;
                },
                getTs: function (e) {
                    return (e ? null : parseInt(this.getData().ts)) || parseInt(Date.now() / 1e3);
                },
                getData: function () {
                    return (webPacker.ls.isSupported() ? webPacker.ls.getItem(this.lsKey, this.getTtl()) : null) || {};
                },
                clear: function () {
                    webPacker.ls.removeItem(this.lsKey);
                },
                getTtl: function () {
                    return this.lifespan * 3600 * 24;
                },
                collect: function () {
                    var e = this.detect();
                    if (!e.detected) {
                        return;
                    }
                    if (e.expired) {
                        this.clear();
                        return;
                    }
                    webPacker.ls.setItem(this.lsKey, { ts: this.getTs(), ref: e.value }, this.getTtl());
                },
            };
            var s = {
                maxCount: 5,
                lsPageKey: "b24_crm_guest_pages",
                list: function () {
                    return webPacker.ls.getItem(this.lsPageKey);
                },
                clear: function () {
                    webPacker.ls.removeItem(this.lsPageKey);
                },
                collect: function () {
                    if (!document.body) {
                        return;
                    }
                    var e = document.body.querySelector("h1");
                    e = e ? e.textContent.trim() : "";
                    if (e.length === 0) {
                        e = document.head.querySelector("title");
                        e = e ? e.textContent.trim() : "";
                    }
                    e = e.substring(0, 40);
                    var t = window.location.href;
                    var r = webPacker.ls.getItem(this.lsPageKey);
                    r = r instanceof Array ? r : [];
                    var i = -1;
                    r.forEach(function (e, r) {
                        if (e[0] === t) i = r;
                    });
                    if (i > -1) {
                        r = r.slice(0, i).concat(r.slice(i + 1));
                    }
                    while (r.length >= this.maxCount) {
                        r.shift();
                    }
                    var n = new Date();
                    r.push([t, Math.round(n.getTime() / 1e3), e]);
                    webPacker.ls.setItem(this.lsPageKey, r);
                },
            };
            var a = {
                query: function (e, t, r) {
                    this.ajax = null;
                    if (window.XMLHttpRequest) {
                        this.ajax = new XMLHttpRequest();
                    } else if (window.ActiveXObject) {
                        this.ajax = new window.ActiveXObject("Microsoft.XMLHTTP");
                    }
                    "withCredentials" in this.ajax ? this.post(e, t, r) : this.get(e, t);
                },
                get: function (e, t) {
                    var r = document.createElement("script");
                    r.type = "text/javascript";
                    r.src = e + "?" + this.stringify(t);
                    r.async = true;
                    var i = document.getElementsByTagName("script")[0];
                    i.parentNode.insertBefore(r, i);
                },
                post: function (e, t, r) {
                    var i = this.ajax;
                    i.open("POST", e, true);
                    i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    i.withCredentials = true;
                    i.onreadystatechange = function () {
                        if (r && i.readyState === 4 && i.status === 200) {
                            r.apply(this, [JSON.parse(this.responseText)]);
                        }
                    };
                    i.send(this.stringify(t));
                },
                stringify: function (e) {
                    var t = [];
                    if (Object.prototype.toString.call(e) === "[object Array]") {
                    } else if (typeof e === "object") {
                        for (var r in e) {
                            if (!e.hasOwnProperty(r)) {
                                continue;
                            }
                            var i = e[r];
                            if (typeof i === "object") {
                                i = JSON.stringify(i);
                            }
                            t.push(r + "=" + encodeURIComponent(i));
                        }
                    }
                    return t.join("&");
                },
                getAjax: function () {
                    if (this.ajax) {
                        return this.ajax;
                    }
                    if (window.XMLHttpRequest) {
                        this.ajax = new XMLHttpRequest();
                    } else if (window.ActiveXObject) {
                        this.ajax = new window.ActiveXObject("Microsoft.XMLHTTP");
                    }
                    return this.ajax;
                },
            };
            window.b24Tracker.guest.init();
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/crm/tracking/guest/script.map.js
    })();

    (function () {
        var module = new webPacker.module("crm.site.button");
        module.loadResources([
            {
                type: "css",
                path: "https://b24-p9cw17.bitrix24.com/bitrix/components/bitrix/crm.button.button/templates/.default/style.css?1616489483.28718",
                content:
                    "html.bx-ios.bx-ios-fix-frame-focus,.bx-ios.bx-ios-fix-frame-focus body{-webkit-overflow-scrolling:touch}.bx-touch{-webkit-tap-highlight-color:rgba(0,0,0,0)}.bx-touch.crm-widget-button-mobile,.bx-touch.crm-widget-button-mobile body{height:100%;overflow:auto}.b24-widget-button-shadow{position:fixed;background:rgba(33,33,33,.3);width:100%;height:100%;top:0;left:0;visibility:hidden;z-index:10100}.bx-touch .b24-widget-button-shadow{background:rgba(33,33,33,.75)}.b24-widget-button-inner-container{position:relative;display:inline-block}.b24-widget-button-position-fixed{position:fixed;z-index:10000}.b24-widget-button-block{width:66px;height:66px;border-radius:100%;box-sizing:border-box;overflow:hidden;cursor:pointer}.b24-widget-button-block .b24-widget-button-icon{opacity:1}.b24-widget-button-block-active .b24-widget-button-icon{opacity:.7}.b24-widget-button-position-top-left{top:50px;left:50px}.b24-widget-button-position-top-middle{top:50px;left:50%;margin:0 0 0 -33px}.b24-widget-button-position-top-right{top:50px;right:50px}.b24-widget-button-position-bottom-left{left:50px;bottom:50px}.b24-widget-button-position-bottom-middle{left:50%;bottom:50px;margin:0 0 0 -33px}.b24-widget-button-position-bottom-right{right:50px;bottom:50px}.b24-widget-button-inner-block{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;height:66px;border-radius:100px;background:#00aeef;box-sizing:border-box}.b24-widget-button-icon-container{position:relative;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.b24-widget-button-inner-item{position:absolute;top:0;left:0;display:flex;align-items:center;justify-content:center;width:100%;height:100%;border-radius:50%;-webkit-transition:opacity .6s ease-out;transition:opacity .6s ease-out;-webkit-animation:socialRotateBack .4s;animation:socialRotateBack .4s;opacity:0;overflow:hidden;box-sizing:border-box}.b24-widget-button-icon-animation{opacity:1}.b24-widget-button-inner-mask{position:absolute;top:-8px;left:-8px;height:82px;min-width:66px;-webkit-width:calc(100% + 16px);width:calc(100% + 16px);border-radius:100px;background:#00aeef;opacity:.2}.b24-widget-button-icon{-webkit-transition:opacity .3s ease-out;transition:opacity .3s ease-out;cursor:pointer}.b24-widget-button-icon:hover{opacity:1}.b24-widget-button-inner-item-active .b24-widget-button-icon{opacity:1}.b24-widget-button-wrapper{position:fixed;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end;visibility:hidden;direction:ltr;z-index:10150}.bx-imopenlines-config-sidebar{z-index:10101}.b24-widget-button-visible{visibility:visible;-webkit-animation:b24-widget-button-visible 1s ease-out forwards 1;animation:b24-widget-button-visible 1s ease-out forwards 1}@-webkit-keyframes b24-widget-button-visible{0{-webkit-transform:scale(0);transform:scale(0)}30.001%{-webkit-transform:scale(1.2);transform:scale(1.2)}62.999%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes b24-widget-button-visible{0{-webkit-transform:scale(0);transform:scale(0)}30.001%{-webkit-transform:scale(1.2);transform:scale(1.2)}62.999%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(1);transform:scale(1)}}.b24-widget-button-disable{-webkit-animation:b24-widget-button-disable .3s ease-out forwards 1;animation:b24-widget-button-disable .3s ease-out forwards 1}@-webkit-keyframes b24-widget-button-disable{0{-webkit-transform:scale(1);transform:scale(1)}50.001%{-webkit-transform:scale(.5);transform:scale(.5)}92.999%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(0);transform:scale(0)}}@keyframes b24-widget-button-disable{0{-webkit-transform:scale(1);transform:scale(1)}50.001%{-webkit-transform:scale(.5);transform:scale(.5)}92.999%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(0);transform:scale(0)}}.b24-widget-button-social{display:none}.b24-widget-button-social-item{position:relative;display:block;margin:0 10px 10px 0;width:45px;height:44px;background-size:100%;border-radius:25px;-webkit-box-shadow:0 8px 6px -6px rgba(33,33,33,.2);-moz-box-shadow:0 8px 6px -6px rgba(33,33,33,.2);box-shadow:0 8px 6px -6px rgba(33,33,33,.2);cursor:pointer}.b24-widget-button-social-item:hover{-webkit-box-shadow:0 0 6px rgba(0,0,0,.16),0 6px 12px rgba(0,0,0,.32);box-shadow:0 0 6px rgba(0,0,0,.16),0 6px 12px rgba(0,0,0,.32);-webkit-transition:box-shadow .17s cubic-bezier(0,0,.2,1);transition:box-shadow .17s cubic-bezier(0,0,.2,1)}.ui-icon.b24-widget-button-social-item,.ui-icon.connector-icon-45{width:46px;height:46px;--ui-icon-size-md:46px }\n\n.b24-widget-button-callback {\n\tbackground-image: url(\u0027data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2229%22%20height%3D%2230%22%20viewBox%3D%220%200%2029%2030%22%3E%3Cpath%20fill%3D%22%23FFF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M21.872%2019.905c-.947-.968-2.13-.968-3.072%200-.718.737-1.256.974-1.962%201.723-.193.206-.356.25-.59.112-.466-.262-.96-.474-1.408-.76-2.082-1.356-3.827-3.098-5.372-5.058-.767-.974-1.45-2.017-1.926-3.19-.096-.238-.078-.394.11-.587.717-.718.96-.98%201.665-1.717.984-1.024.984-2.223-.006-3.253-.56-.586-1.103-1.397-1.56-2.034-.458-.636-.817-1.392-1.403-1.985C5.4%202.2%204.217%202.2%203.275%203.16%202.55%203.9%201.855%204.654%201.12%205.378.438%206.045.093%206.863.02%207.817c-.114%201.556.255%203.023.774%204.453%201.062%202.96%202.68%205.587%204.642%207.997%202.65%203.26%205.813%205.837%209.513%207.698%201.665.836%203.39%201.48%205.268%201.585%201.292.075%202.415-.262%203.314-1.304.616-.712%201.31-1.36%201.962-2.042.966-1.01.972-2.235.012-3.234-1.147-1.192-2.48-1.88-3.634-3.065zm-.49-5.36l.268-.047c.583-.103.953-.707.79-1.295-.465-1.676-1.332-3.193-2.537-4.445-1.288-1.33-2.857-2.254-4.59-2.708-.574-.15-1.148.248-1.23.855l-.038.28c-.07.522.253%201.01.747%201.142%201.326.355%202.53%201.064%203.517%202.086.926.958%201.59%202.125%201.952%203.412.14.5.624.807%201.12.72zm2.56-9.85C21.618%202.292%2018.74.69%2015.56.02c-.56-.117-1.1.283-1.178.868l-.038.28c-.073.537.272%201.04.786%201.15%202.74.584%205.218%201.968%207.217%204.03%201.885%201.95%203.19%204.36%203.803%207.012.122.53.617.873%201.136.78l.265-.046c.57-.1.934-.678.8-1.26-.71-3.08-2.223-5.873-4.41-8.14z%22/%3E%3C/svg%3E\u0027); background-repeat:no-repeat;background-position:center;background-color:#00aeef;background-size:43%;}\n.b24-widget-button-crmform {\n\tbackground-image: url(\u0027data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23FFF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M22.407%200h-21.1C.586%200%200%20.586%200%201.306v21.1c0%20.72.586%201.306%201.306%201.306h21.1c.72%200%201.306-.586%201.306-1.305V1.297C23.702.587%2023.117%200%2022.407%200zm-9.094%2018.046c0%20.41-.338.737-.738.737H3.9c-.41%200-.738-.337-.738-.737v-1.634c0-.408.337-.737.737-.737h8.675c.41%200%20.738.337.738.737v1.634zm7.246-5.79c0%20.408-.338.737-.738.737H3.89c-.41%200-.737-.338-.737-.737v-1.634c0-.41.337-.737.737-.737h15.923c.41%200%20.738.337.738.737v1.634h.01zm0-5.8c0%20.41-.338.738-.738.738H3.89c-.41%200-.737-.338-.737-.738V4.822c0-.408.337-.737.737-.737h15.923c.41%200%20.738.338.738.737v1.634h.01z%22/%3E%3C/svg%3E\u0027); background-repeat:no-repeat;background-position:center;background-color:#00aeef;background-size:43%;}\n.b24-widget-button-openline_livechat {\n\tbackground-image: url(\u0027data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2231%22%20height%3D%2228%22%20viewBox%3D%220%200%2031%2028%22%3E%3Cpath%20fill%3D%22%23FFF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M23.29%2013.25V2.84c0-1.378-1.386-2.84-2.795-2.84h-17.7C1.385%200%200%201.462%200%202.84v10.41c0%201.674%201.385%203.136%202.795%202.84H5.59v5.68h.93c.04%200%20.29-1.05.933-.947l3.726-4.732h9.315c1.41.296%202.795-1.166%202.795-2.84zm2.795-3.785v4.733c.348%202.407-1.756%204.558-4.658%204.732h-8.385l-1.863%201.893c.22%201.123%201.342%202.127%202.794%201.893h7.453l2.795%203.786c.623-.102.93.947.93.947h.933v-4.734h1.863c1.57.234%202.795-1.02%202.795-2.84v-7.57c0-1.588-1.225-2.84-2.795-2.84h-1.863z%22/%3E%3C/svg%3E\u0027); background-repeat:no-repeat;background-position:center;background-color:#00aeef;background-size:43%}.b24-widget-button-social-tooltip{position:absolute;top:50%;left:-9000px;display:inline-block;padding:5px 10px;max-width:360px;border-radius:10px;font:13px/15px \u0022Helvetica Neue\u0022,Arial,Helvetica,sans-serif;color:#000;background:#fff;text-align:center;text-overflow:ellipsis;white-space:nowrap;transform:translate(0,-50%);transition:opacity .6s linear;opacity:0;overflow:hidden}@media(max-width:480px){.b24-widget-button-social-tooltip{max-width:200px}}.b24-widget-button-social-item:hover .b24-widget-button-social-tooltip{left:50px;-webkit-transform:translate(0,-50%);transform:translate(0,-50%);opacity:1;z-index:1}.b24-widget-button-close{display:none}.b24-widget-button-position-bottom-left .b24-widget-button-social-item:hover .b24-widget-button-social-tooltip,.b24-widget-button-position-top-left .b24-widget-button-social-item:hover .b24-widget-button-social-tooltip{left:50px;-webkit-transform:translate(0,-50%);transform:translate(0,-50%);opacity:1}.b24-widget-button-position-top-right .b24-widget-button-social-item:hover .b24-widget-button-social-tooltip,.b24-widget-button-position-bottom-right .b24-widget-button-social-item:hover .b24-widget-button-social-tooltip{left:-5px;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%);opacity:1}.b24-widget-button-inner-container,.bx-touch .b24-widget-button-inner-container{-webkit-transform:scale(.85);transform:scale(.85);-webkit-transition:transform .3s;transition:transform .3s}.b24-widget-button-top .b24-widget-button-inner-container,.b24-widget-button-bottom .b24-widget-button-inner-container{-webkit-transform:scale(.7);transform:scale(.7);-webkit-transition:transform .3s linear;transition:transform .3s linear}.b24-widget-button-top .b24-widget-button-inner-block,.b24-widget-button-top .b24-widget-button-inner-mask,.b24-widget-button-bottom .b24-widget-button-inner-block,.b24-widget-button-bottom .b24-widget-button-inner-mask{background:#d6d6d6 !important;-webkit-transition:background .3s linear;transition:background .3s linear}.b24-widget-button-top .b24-widget-button-pulse,.b24-widget-button-bottom .b24-widget-button-pulse{display:none}.b24-widget-button-wrapper.b24-widget-button-position-bottom-right,.b24-widget-button-wrapper.b24-widget-button-position-bottom-middle,.b24-widget-button-wrapper.b24-widget-button-position-bottom-left{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}.b24-widget-button-bottom .b24-widget-button-social,.b24-widget-button-top .b24-widget-button-social{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-line-pack:end;align-content:flex-end;height:-webkit-calc(100vh - 110px);height:calc(100vh - 110px);-webkit-animation:bottomOpen .3s;animation:bottomOpen .3s;visibility:visible}.b24-widget-button-top .b24-widget-button-social{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;padding:10px 0 0 0;-webkit-animation:topOpen .3s;animation:topOpen .3s}.b24-widget-button-position-bottom-left.b24-widget-button-bottom .b24-widget-button-social{-ms-flex-line-pack:start;align-content:flex-start}.b24-widget-button-position-top-left.b24-widget-button-top .b24-widget-button-social{-ms-flex-line-pack:start;align-content:flex-start}.b24-widget-button-position-top-right.b24-widget-button-top .b24-widget-button-social{-ms-flex-line-pack:start;align-content:flex-start;-ms-flex-wrap:wrap-reverse;flex-wrap:wrap-reverse}.b24-widget-button-position-bottom-right.b24-widget-button-bottom .b24-widget-button-social,.b24-widget-button-position-bottom-left.b24-widget-button-bottom .b24-widget-button-social,.b24-widget-button-position-bottom-middle.b24-widget-button-bottom .b24-widget-button-social{-ms-flex-line-pack:start;align-content:flex-start;-ms-flex-wrap:wrap-reverse;flex-wrap:wrap-reverse;order:1}.b24-widget-button-position-bottom-left.b24-widget-button-bottom .b24-widget-button-social{-ms-flex-wrap:wrap;flex-wrap:wrap}.b24-widget-button-position-bottom-left .b24-widget-button-social-item,.b24-widget-button-position-top-left .b24-widget-button-social-item,.b24-widget-button-position-top-middle .b24-widget-button-social-item,.b24-widget-button-position-bottom-middle .b24-widget-button-social-item{margin:0 0 10px 10px}.b24-widget-button-position-bottom-left.b24-widget-button-wrapper{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.b24-widget-button-position-top-left.b24-widget-button-wrapper{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.b24-widget-button-position-bottom-middle.b24-widget-button-wrapper,.b24-widget-button-position-top-middle.b24-widget-button-wrapper{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;-ms-flex-line-pack:start;align-content:flex-start}.b24-widget-button-position-top-middle.b24-widget-button-top .b24-widget-button-social{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-line-pack:start;align-content:flex-start}.b24-widget-button-bottom .b24-widget-button-inner-item{display:none}.b24-widget-button-bottom .b24-widget-button-close{display:flex;-webkit-animation:socialRotate .4s;animation:socialRotate .4s;opacity:1}.b24-widget-button-top .b24-widget-button-inner-item{display:none}.b24-widget-button-top .b24-widget-button-close{display:flex;-webkit-animation:socialRotate .4s;animation:socialRotate .4s;opacity:1}.b24-widget-button-show{-webkit-animation:b24-widget-show .3s linear forwards;animation:b24-widget-show .3s linear forwards}@-webkit-keyframes b24-widget-show{0{opacity:0}50%{opacity:0}100%{opacity:1;visibility:visible}}@keyframes b24-widget-show{0{opacity:0}50%{opacity:0}100%{opacity:1;visibility:visible}}.b24-widget-button-hide{-webkit-animation:b24-widget-hidden .3s linear forwards;animation:b24-widget-hidden .3s linear forwards}@-webkit-keyframes b24-widget-hidden{0{opacity:1;visibility:visible}50%{opacity:1}99.999%{visibility:visible}100%{opacity:0;visibility:hidden}}@keyframes b24-widget-hidden{0{opacity:1;visibility:visible}50%{opacity:1}99.999%{visibility:visible}100%{opacity:0;visibility:hidden}}.b24-widget-button-hide-icons{-webkit-animation:hideIconsBottom .2s linear forwards;animation:hideIconsBottom .2s linear forwards}@-webkit-keyframes hideIconsBottom{0{opacity:1}50%{opacity:1}100%{opacity:0;-webkit-transform:translate(0,20px);transform:translate(0,20px);visibility:hidden}}@keyframes hideIconsBottom{0{opacity:1}50%{opacity:1}100%{opacity:0;-webkit-transform:translate(0,20px);transform:translate(0,20px);visibility:hidden}}@-webkit-keyframes hideIconsTop{0{opacity:1}50%{opacity:1}100%{opacity:0;-webkit-transform:translate(0,-20px);transform:translate(0,-20px);visibility:hidden}}@keyframes hideIconsTop{0{opacity:1}50%{opacity:1}100%{opacity:0;-webkit-transform:translate(0,-20px);transform:translate(0,-20px);visibility:hidden}}.b24-widget-button-popup-name{font:bold 14px \u0022Helvetica Neue\u0022,Arial,Helvetica,sans-serif;color:#000}.b24-widget-button-popup-description{margin:4px 0 0 0;font:13px \u0022Helvetica Neue\u0022,Arial,Helvetica,sans-serif;color:#424956}.b24-widget-button-close-item{width:28px;height:28px;\tbackground-image: url(\u0027data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2229%22%20height%3D%2229%22%20viewBox%3D%220%200%2029%2029%22%3E%3Cpath%20fill%3D%22%23FFF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M18.866%2014.45l9.58-9.582L24.03.448l-9.587%209.58L4.873.447.455%204.866l9.575%209.587-9.583%209.57%204.418%204.42%209.58-9.577%209.58%209.58%204.42-4.42%22/%3E%3C/svg%3E\u0027); background-repeat:no-repeat;background-position:center;cursor:pointer}.b24-widget-button-wrapper.b24-widget-button-top{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}@-webkit-keyframes bottomOpen{0{opacity:0;-webkit-transform:translate(0,20px);transform:translate(0,20px)}100%{opacity:1;-webkit-transform:translate(0,0);transform:translate(0,0)}}@keyframes bottomOpen{0{opacity:0;-webkit-transform:translate(0,20px);transform:translate(0,20px)}100%{opacity:1;-webkit-transform:translate(0,0);transform:translate(0,0)}}@-webkit-keyframes topOpen{0{opacity:0;-webkit-transform:translate(0,-20px);transform:translate(0,-20px)}100%{opacity:1;-webkit-transform:translate(0,0);transform:translate(0,0)}}@keyframes topOpen{0{opacity:0;-webkit-transform:translate(0,-20px);transform:translate(0,-20px)}100%{opacity:1;-webkit-transform:translate(0,0);transform:translate(0,0)}}@-webkit-keyframes socialRotate{0{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}100%{-webkit-transform:rotate(0);transform:rotate(0)}}@keyframes socialRotate{0{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}100%{-webkit-transform:rotate(0);transform:rotate(0)}}@-webkit-keyframes socialRotateBack{0{-webkit-transform:rotate(90deg);transform:rotate(90deg)}100%{-webkit-transform:rotate(0);transform:rotate(0)}}@keyframes socialRotateBack{0{-webkit-transform:rotate(90deg);transform:rotate(90deg)}100%{-webkit-transform:rotate(0);.b24-widget-button-inner-item transform:rotate(0)}}.b24-widget-button-popup{display:none;position:absolute;left:100px;padding:12px 20px 12px 14px;width:312px;border:2px solid #2fc7f7;background:#fff;border-radius:15px;box-sizing:border-box;z-index:1;cursor:pointer}.b24-widget-button-popup-triangle{position:absolute;display:block;width:8px;height:8px;background:#fff;border-right:2px solid #2fc7f7;border-bottom:2px solid #2fc7f7}.b24-widget-button-popup-show{display:block;-webkit-animation:show .4s linear forwards;animation:show .4s linear forwards}.b24-widget-button-position-top-left .b24-widget-button-popup-triangle{top:19px;left:-6px;-webkit-transform:rotate(134deg);transform:rotate(134deg)}.b24-widget-button-position-bottom-left .b24-widget-button-popup-triangle{bottom:25px;left:-6px;-webkit-transform:rotate(134deg);transform:rotate(134deg)}.b24-widget-button-position-bottom-left .b24-widget-button-popup,.b24-widget-button-position-bottom-middle .b24-widget-button-popup{bottom:0;left:75px}.b24-widget-button-position-bottom-right .b24-widget-button-popup-triangle{bottom:25px;right:-6px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.b24-widget-button-position-bottom-right .b24-widget-button-popup{left:-320px;bottom:0}.b24-widget-button-position-top-right .b24-widget-button-popup-triangle{top:19px;right:-6px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.b24-widget-button-position-top-right .b24-widget-button-popup{top:0;left:-320px}.b24-widget-button-position-top-middle .b24-widget-button-popup-triangle{top:19px;left:-6px;-webkit-transform:rotate(134deg);transform:rotate(134deg)}.b24-widget-button-position-top-middle .b24-widget-button-popup,.b24-widget-button-position-top-left .b24-widget-button-popup{top:0;left:75px}.b24-widget-button-position-bottom-middle .b24-widget-button-popup-triangle{bottom:25px;left:-6px;-webkit-transform:rotate(134deg);transform:rotate(134deg)}.bx-touch .b24-widget-button-popup{padding:10px 22px 10px 15px}.bx-touch .b24-widget-button-popup{width:230px}.bx-touch .b24-widget-button-position-bottom-left .b24-widget-button-popup{bottom:90px;left:0}.bx-touch .b24-widget-button-popup-image{margin:0 auto 10px auto}.bx-touch .b24-widget-button-popup-content{text-align:center}.bx-touch .b24-widget-button-position-bottom-left .b24-widget-button-popup-triangle{bottom:-6px;left:25px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.bx-touch .b24-widget-button-position-bottom-left .b24-widget-button-popup{bottom:90px;left:0}.bx-touch .b24-widget-button-position-bottom-right .b24-widget-button-popup{bottom:90px;left:-160px}.bx-touch .b24-widget-button-position-bottom-right .b24-widget-button-popup-triangle{bottom:-6px;right:30px;-webkit-transform:rotate(-45deg);transform:rotate(45deg)}.bx-touch .b24-widget-button-position-bottom-middle .b24-widget-button-popup{bottom:90px;left:50%;-webkit-transform:translate(-50%,0);transform:translate(-50%,0)}.bx-touch .b24-widget-button-position-bottom-middle .b24-widget-button-popup-triangle{bottom:-6px;left:108px;-webkit-transform:rotate(134deg);transform:rotate(45deg)}.bx-touch .b24-widget-button-position-top-middle .b24-widget-button-popup{top:90px;left:50%;-webkit-transform:translate(-50%,0);transform:translate(-50%,0)}.bx-touch .b24-widget-button-position-top-middle .b24-widget-button-popup-triangle{top:-7px;left:auto;right:108px;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.bx-touch .b24-widget-button-position-top-left .b24-widget-button-popup{top:90px;left:0}.bx-touch .b24-widget-button-position-top-left .b24-widget-button-popup-triangle{left:25px;top:-6px;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.bx-touch .b24-widget-button-position-top-right .b24-widget-button-popup{top:90px;left:-150px}.bx-touch .b24-widget-button-position-top-right .b24-widget-button-popup-triangle{top:-7px;right:40px;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.b24-widget-button-popup-btn-hide{position:absolute;top:4px;right:4px;display:inline-block;height:20px;width:20px;\tbackground-image: url(\u0027data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2010%2010%22%3E%3Cpath%20fill%3D%22%23525C68%22%20fill-rule%3D%22evenodd%22%20d%3D%22M6.41%205.07l2.867-2.864-1.34-1.34L5.07%203.73%202.207.867l-1.34%201.34L3.73%205.07.867%207.938l1.34%201.34L5.07%206.41l2.867%202.867%201.34-1.34L6.41%205.07z%22/%3E%3C/svg%3E\u0027); background-repeat:no-repeat;background-position:center;opacity:.2;-webkit-transition:opacity .3s;transition:opacity .3s;cursor:pointer}.b24-widget-button-popup-btn-hide:hover{opacity:1;}\n.bx-touch .b24-widget-button-popup-btn-hide {\n\tbackground-image: url(\u0027data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%3E%3Cpath%20fill%3D%22%23525C68%22%20fill-rule%3D%22evenodd%22%20d%3D%22M8.36%207.02l5.34-5.34L12.36.34%207.02%205.68%201.68.34.34%201.68l5.34%205.34-5.34%205.342%201.34%201.34%205.34-5.34%205.34%205.34%201.34-1.34-5.34-5.34z%22/%3E%3C/svg%3E\u0027); background-repeat:no-repeat}.b24-widget-button-popup-inner{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap}.b24-widget-button-popup-content{width:222px}.b24-widget-button-popup-image{margin:0 10px 0 0;width:42px;text-align:center}.b24-widget-button-popup-image-item{display:inline-block;width:42px;height:42px;border-radius:100%;background-repeat:no-repeat;background-position:center;background-size:cover}.b24-widget-button-popup-button{margin:15px 0 0 0;-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:center}.b24-widget-button-popup-button-item{display:inline-block;margin:0 16px 0 0;font:bold 12px \u0022Helvetica Neue\u0022,Arial,Helvetica,sans-serif;color:#08a6d8;text-transform:uppercase;border-bottom:1px solid #08a6d8;-webkit-transition:border-bottom .3s;transition:border-bottom .3s;cursor:pointer}.b24-widget-button-popup-button-item:hover{border-bottom:1px solid transparent}.b24-widget-button-popup-button-item:last-child{margin:0}.b24-widget-button-pulse{position:absolute;top:0;left:0;bottom:0;right:0;border:1px solid #00aeef;border-radius:50%}.b24-widget-button-pulse-animate{-webkit-animation:widgetPulse infinite 1.5s;animation:widgetPulse infinite 1.5s}@-webkit-keyframes widgetPulse{50%{-webkit-transform:scale(1,1);transform:scale(1,1);opacity:1}100%{-webkit-transform:scale(2,2);transform:scale(2,2);opacity:0}}@keyframes widgetPulse{50%{-webkit-transform:scale(1,1);transform:scale(1,1);opacity:1}100%{-webkit-transform:scale(2,2);transform:scale(2,2);opacity:0}}@media(min-height:1024px){.b24-widget-button-top .b24-widget-button-social,.b24-widget-button-bottom .b24-widget-button-social{max-height:900px}}@media(max-height:768px){.b24-widget-button-top .b24-widget-button-social,.b24-widget-button-bottom .b24-widget-button-social{max-height:600px}}@media(max-height:667px){.b24-widget-button-top .b24-widget-button-social,.b24-widget-button-bottom .b24-widget-button-social{max-height:440px}}@media(max-height:568px){.b24-widget-button-top .b24-widget-button-social,.b24-widget-button-bottom .b24-widget-button-social{max-height:380px}}@media(max-height:480px){.b24-widget-button-top .b24-widget-button-social,.b24-widget-button-bottom .b24-widget-button-social{max-height:335px}}",
                cache: true,
            },
            {
                type: "css",
                path: "https://b24-p9cw17.bitrix24.com/bitrix/components/bitrix/crm.button.webform/templates/.default/style.css?1589796815.5743",
                content:
                    ".bx-crm-widget-form-config-sidebar{position:fixed;left:-3850px;height:100%;width:369px;box-shadow:0 0 5px 0 rgba(0,0,0,0.25);background:rgba(255,255,255,.98);overflow:hidden;transition:opacity .5s ease;box-sizing:border-box;opacity:0;z-index:10101}.bx-crm-widget-form-config-sidebar-inner{position:absolute;width:100%;height:100%;overflow:hidden}.bx-crm-widget-form-config-sidebar.open-sidebar{left:auto;right:0;opacity:1;top:0}.bx-crm-widget-form-config-button.open-sidebar{display:none}.bx-crm-widget-form-config-button.button-visible{display:block}.bx-crm-widget-form-config-sidebar.close-sidebar{right:-385px}.bx-crm-widget-form-config-sidebar-header{position:absolute;top:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 20px;height:60px;width:100%;border-bottom:1px solid #e6e6e7;box-shadow:0 1px 0 0 rgba(0,0,0,0.03);background:#fff;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;z-index:4}.bx-crm-widget-form-config-sidebar-close{display:inline-block;-webkit-box-flex:1;-ms-flex:1;flex:1}.bx-crm-widget-form-config-sidebar-close-item{display:inline-block;\tbackground-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDE1IDE1Ij4gIDxwYXRoIGZpbGw9IiM4MDg2OEUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE2NDIuNDI0NjIsMjQ1LjAxMDQwOCBMMTYzNi40MTQyMSwyMzkgTDE2MzUsMjQwLjQxNDIxNCBMMTY0MS4wMTA0MSwyNDYuNDI0NjIxIEwxNjM1LDI1Mi40MzUwMjkgTDE2MzYuNDE0MjEsMjUzLjg0OTI0MiBMMTY0Mi40MjQ2MiwyNDcuODM4ODM1IEwxNjQ4LjQzNTAzLDI1My44NDkyNDIgTDE2NDkuODQ5MjQsMjUyLjQzNTAyOSBMMTY0My44Mzg4MywyNDYuNDI0NjIxIEwxNjQ5Ljg0OTI0LDI0MC40MTQyMTQgTDE2NDguNDM1MDMsMjM5IEwxNjQyLjQyNDYyLDI0NS4wMTA0MDggWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2MzUgLTIzOSkiLz48L3N2Zz4=); cursor:pointer;-webkit-transition:opacity .3s ease-in-out;-moz-transition:opacity .3s ease-in-out;transition:opacity .3s ease-in-out;opacity:.5}.bx-crm-widget-form-config-sidebar-close-item{width:20px;height:18px;background-position:3px 2px;background-repeat:no-repeat}.bx-crm-widget-form-config-sidebar-close-item:hover{opacity:1}.bx-crm-widget-form-config-sidebar-message{-webkit-box-flex:16;-ms-flex:16;flex:16;text-align:center}.bx-crm-widget-form-config-sidebar-message-item{display:inline-block;max-width:310px;font:bold 10px \u0022Helvetica Neue\u0022,Arial,Helvetica,sans-serif;color:#424956;text-transform:uppercase;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.bx-crm-widget-form-config-sidebar-rollup{display:none;margin:0 6px 0 0}.bx-crm-widget-form-config-sidebar-hamburger{display:none}.bx-crm-widget-form-config-sidebar-info{position:absolute;top:60px;width:100%;-webkit-height:calc(100% - 130px);height:calc(100% - 130px);background:#fff;transition:opacity .6s ease;overflow:auto;opacity:1;-webkit-overflow-scrolling:touch}.bx-crm-widget-form-copyright-disabled .bx-crm-widget-form-config-sidebar-info{height:calc(100% - 75px)}.bx-crm-widget-form-copyright-disabled .bx-crm-widget-form-config-sidebar-logo{display:none}.bx-crm-widget-form-config-sidebar-chat-container{position:absolute;bottom:0;width:100%;background:#fff;box-sizing:border-box;z-index:4}.bx-crm-widget-form-config-sidebar-chat{padding:20px;-webkit-box-shadow:0 -2px 0 0 rgba(0,0,0,0.03);box-shadow:0 -2px 0 0 rgba(0,0,0,0.03)}.bx-crm-widget-form-config-sidebar-chat-border{height:3px;background:#2fc7f7;background:-moz-linear-gradient(left,#2fc7f7 0,#35e8f6 50%,#7ce3a7 74%,#bcf664 100%);background:-webkit-linear-gradient(left,#2fc7f7 0,#35e8f6 50%,#7ce3a7 74%,#bcf664 100%);background:linear-gradient(to right,#2fc7f7 0,#35e8f6 50%,#7ce3a7 74%,#bcf664 100%)}.bx-crm-widget-form-config-sidebar-logo{padding:15px 0 10px 0;text-align:center}.bx-crm-widget-form-config-sidebar-logo a{text-decoration:none!important}.bx-crm-widget-form-config-sidebar-logo-text{display:inline-block;margin:0 0 0 -2px;font:12px \u0022Helvetica Neue\u0022,Arial,Helvetica,sans-serif;color:#b2b6bd}.bx-crm-widget-form-config-sidebar-logo-bx{display:inline-block;margin:0 -2px 0 0;font:bold 14px \u0022Helvetica Neue\u0022,Helvetica,Arial,sans-serif;color:#2fc7f7}.bx-crm-widget-form-config-sidebar-logo-24{display:inline-block;font:bold 15px \u0022Helvetica Neue\u0022,Helvetica,Arial,sans-serif;color:#215f98}@media(min-width:320px) and (max-width:420px){.bx-crm-widget-form-config-sidebar{width:100%}.bx-crm-widget-form-config-sidebar-info-block-container{padding:0;width:100%;height:115px;border-radius:0}.bx-crm-widget-form-config-sidebar-info-block-container:before{top:0;left:0;width:100%;height:113px;border-radius:0}.bx-crm-widget-form-config-sidebar-info-block-container:after{top:0;left:0;width:100%;height:100px;border-radius:0}.bx-crm-widget-form-config-sidebar-social{width:100%}.crm-webform-header-container{text-align:center}}",
                cache: true,
            },
            {
                type: "css",
                path: "https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/base/ui.icons.base.css?1591094385.1402",
                content:
                    ":root{--ui-icon-size-xs:26px;--ui-icon-size-sm:31px;--ui-icon-size-md:39px;--ui-icon-size-lg:47px;--ui-icon-size:39px}.ui-icon{position:relative;display:inline-block;width:var(--ui-icon-size)}.ui-icon\u003Ei{position:relative;display:block;padding-top:100%;width:100%;border-radius:50%;background-color:#ebeff2;background-position:center;background-size:100% auto;background-repeat:no-repeat}.ui-icon-square\u003Ei,.ui-icon[class*=ui-icon-file-]\u003Ei{border-radius:1px!important}button.ui-icon,.ui-icon-btn{padding:0;outline:0;border:0;background:transparent;text-decoration:none;cursor:pointer}button.ui-icon\u003Ei,.ui-icon-btn\u003Ei{transition:250ms linear opacity}button.ui-icon\u003Ei:hover,.ui-icon-btn\u003Ei:hover{opacity:.85}button.ui-icon\u003Ei:active,.ui-icon-btn\u003Ei:active{opacity:1}.ui-icon-xs{--ui-icon-size:var(--ui-icon-size-xs)}.ui-icon-sm{--ui-icon-size:var(--ui-icon-size-sm)}.ui-icon-md{--ui-icon-size:var(--ui-icon-size-md)}.ui-icon-lg{--ui-icon-size:var(--ui-icon-size-lg)}.bx-ie .ui-icon,.bx-ie .ui-icon-md{width:39px}.bx-ie .ui-icon-xs{width:26px}.bx-ie .ui-icon-sm{width:32px}.bx-ie .ui-icon-lg{width:47px}",
                cache: true,
            },
            {
                type: "css",
                path: "https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/ui.icons.service.css?1614343960.23481",
                content:
                    ".ui-icon[class*=ui-icon-service-light-]{--ui-icon-service-bg-color:#ebeff2}.ui-icon\u003Ei{background-color:var(--ui-icon-service-bg-color)}.ui-icon-service-bitrix24\u003Ei{--ui-icon-service-bg-color:#3ac8f5;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-bitrix24.svg); }\n\n.ui-icon-service-light-bitrix24 \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-bitrix24.svg); }\n\n.ui-icon-service-alice \u003E i {\n\tbackground: no-repeat center url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-alice.svg), rgb(182, 40, 255); \tbackground: no-repeat center url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-alice.svg), -moz-linear-gradient(45deg, rgba(182, 40, 255, 1) 0%, rgba(94, 39, 255, 1) 100%); \tbackground: no-repeat center url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-alice.svg), -webkit-linear-gradient(45deg, rgba(182, 40, 255, 1) 0%, rgba(94, 39, 255, 1) 100%); \tbackground: no-repeat center url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-alice.svg), linear-gradient(45deg, rgba(182, 40, 255, 1) 0%, rgba(94, 39, 255, 1) 100%); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\u0027#b628ff\u0027,endColorstr=\u0027#5e27ff\u0027,GradientType=1);}\n\n.ui-icon-service-light-alice \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-alice.svg);}.ui-icon-service-instagram\u003Ei{--ui-icon-service-bg-color:#d56c9a;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-instagram.svg); }\n\n.ui-icon-service-light-instagram \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-instagram.svg);}.ui-icon-service-fb-instagram\u003Ei{--ui-icon-service-bg-color:#c529a4;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-fb-instagram.svg); }\n\n.ui-icon-service-light-fb-instagram \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-fb-instagram.svg);}.ui-icon-service-vk\u003Ei,.ui-icon-service-vkontakte\u003Ei{--ui-icon-service-bg-color:#3871ba;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-vk.svg); }\n\n.ui-icon-service-light-vk \u003E i,\n.ui-icon-service-light-vkontakte \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-vk.svg);}.ui-icon-service-vk-adds\u003Ei{--ui-icon-service-bg-color:#3871ba;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-vk-adds.svg); }\n\n.ui-icon-service-light-vk-adds \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-vk-adds.svg);}.ui-icon-service-vk-order\u003Ei{--ui-icon-service-bg-color:#4a73a5;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-vk-order.svg); }\n\n.ui-icon-service-light-vk-order \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-vk-order.svg);}.ui-icon-service-g-assistant\u003Ei{--ui-icon-service-bg-color:#33cde0;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-g-assistant.svg); }\n\n.ui-icon-service-light-g-assistant \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-g-assistant.svg);}.ui-icon-service-crm\u003Ei{--ui-icon-service-bg-color:#11bff5;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-crm.svg); }\n\n.ui-icon-service-light-crm \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-crm.svg);}.ui-icon-service-livechat\u003Ei{--ui-icon-service-bg-color:#ffa900;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-livechat.svg); }\n\n.ui-icon-service-light-livechat \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-livechat.svg);}.ui-icon-service-skype\u003Ei{--ui-icon-service-bg-color:#02aff0;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-skype.svg); }\n\n.ui-icon-service-light-skype \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-skype.svg);}.ui-icon-service-fb\u003Ei,.ui-icon-service-facebook\u003Ei{--ui-icon-service-bg-color:#38659f;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-fb.svg); }\n\n.ui-icon-service-light-fb \u003E i,\n.ui-icon-service-light-facebook \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-fb.svg);}.ui-icon-service-fb-comments\u003Ei{--ui-icon-service-bg-color:#38659f;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-fb-comments.svg); }\n\n.ui-icon-service-light-fb-comments \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-fb-comments.svg);}.ui-icon-service-fb-messenger\u003Ei{--ui-icon-service-bg-color:#0183ff;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-fb-messenger.svg); }\n\n.ui-icon-service-light-fb-messenger \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-fb-messenger.svg);}.ui-icon-service-viber\u003Ei{--ui-icon-service-bg-color:#995aca;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-viber.svg); }\n\n.ui-icon-service-light-viber \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-viber.svg);}.ui-icon-service-twilio\u003Ei{--ui-icon-service-bg-color:#e42e3a;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-twilio.svg); }\n\n.ui-icon-service-light-twilio \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-twilio.svg);}.ui-icon-service-telegram\u003Ei{--ui-icon-service-bg-color:#2fc6f6;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-telegram.svg); }\n\n.ui-icon-service-light-telegram \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-telegram.svg);}.ui-icon-service-microsoft\u003Ei{--ui-icon-service-bg-color:#06afe5;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-microsoft.svg); }\n\n.ui-icon-service-light-microsoft \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-microsoft.svg);}.ui-icon-service-kik\u003Ei{--ui-icon-service-bg-color:#212121;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-kik.svg); }\n\n.ui-icon-service-light-kik \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-kik.svg);}.ui-icon-service-slack\u003Ei{--ui-icon-service-bg-color:#776ebd;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-slack.svg); }\n\n.ui-icon-service-light-slack \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-slack.svg);}.ui-icon-service-groupme\u003Ei{--ui-icon-service-bg-color:#1db0ed;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-groupme.svg); }\n\n.ui-icon-service-light-groupme \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-groupme.svg);}.ui-icon-service-outlook\u003Ei{--ui-icon-service-bg-color:#0071c5;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-outlook.svg); }\n\n.ui-icon-service-light-outlook \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-outlook.svg);}.ui-icon-service-webchat\u003Ei{--ui-icon-service-bg-color:#4393d0;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-webchat.svg); }\n\n.ui-icon-service-light-webchat \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-webchat.svg);}.ui-icon-service-directline\u003Ei{--ui-icon-service-bg-color:#4393d0;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-directline.svg); }\n\n.ui-icon-service-light-directline \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-directline.svg);}.ui-icon-service-callback\u003Ei{--ui-icon-service-bg-color:#ff5752;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-call.svg); }\n\n.ui-icon-service-light-callback \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-call.svg);}.ui-icon-service-call\u003Ei{--ui-icon-service-bg-color:#54d1e1;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-call.svg); }\n\n.ui-icon-service-light-call \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-call.svg);}.ui-icon-service-calltracking\u003Ei{--ui-icon-service-bg-color:#1eae43;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-calltracking.svg); }\n\n.ui-icon-service-light-calltracking \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-calltracking.svg);}.ui-icon-service-envelope\u003Ei{--ui-icon-service-bg-color:#4393d0;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-envelope.svg); }\n\n.ui-icon-service-light-envelope \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-envelope.svg);}.ui-icon-service-email\u003Ei{--ui-icon-service-bg-color:#90be00;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-email.svg); }\n\n.ui-icon-service-light-email \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-email.svg);}.ui-icon-service-ok\u003Ei{--ui-icon-service-bg-color:#ee8208;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-ok.svg); }\n\n.ui-icon-service-light-ok \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-ok.svg);}.ui-icon-service-webform\u003Ei{--ui-icon-service-bg-color:#00b4ac;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-webform.svg); }\n\n.ui-icon-service-light-webform \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-webform.svg);}.ui-icon-service-apple\u003Ei{--ui-icon-service-bg-color:#000;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-apple.svg); }\n\n.ui-icon-service-light-apple \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-apple.svg);}.ui-icon-service-imessage\u003Ei{--ui-icon-service-bg-color:#54d857;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-imessage.svg); }\n\n.ui-icon-service-light-imessage \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-imessage.svg);}.ui-icon-service-site-b24\u003Ei{--ui-icon-service-bg-color:#4393d0;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-siteb24.svg); }\n\n.ui-icon-service-light-site-b24 \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-siteb24.svg);}.ui-icon-service-fb-adds\u003Ei{--ui-icon-service-bg-color:#38659f;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-fb-adds.svg); }\n\n.ui-icon-service-light-fb-adds \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-fb-adds.svg);}.ui-icon-service-estore i{--ui-icon-service-bg-color:#90be00;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-estore.svg); }\n\n.ui-icon-service-light-estore i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-estore.svg);}.ui-icon-service-site\u003Ei{--ui-icon-service-bg-color:#d4825a;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-ownsite.svg); }\n\n.ui-icon-service-light-site \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-ownsite.svg);}.ui-icon-service-call-up i{--ui-icon-service-bg-color:#55d0e0;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-call-up.svg); }\n\n.ui-icon-service-light-call-up \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-call-up.svg);}.ui-icon-service-organic\u003Ei{--ui-icon-service-bg-color:#6baf0e;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-organic.svg); }\n\n.ui-icon-service-light-organic \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-organic.svg);}.ui-icon-service-common\u003Ei{--ui-icon-service-bg-color:#55d0e0;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-common.svg); }\n\n.ui-icon-service-light-common \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-common.svg);}.ui-icon-service-universal\u003Ei{--ui-icon-service-bg-color:#55d0e0;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-universal.svg); }\n\n.ui-icon-service-light-universal \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-universal.svg);}.ui-icon-service-instagram-fb\u003Ei{--ui-icon-service-bg-color:#e85998;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-instagram-fb.svg); }\n\n.ui-icon-service-light-instagram-fb \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-instagram-fb.svg);}.ui-icon-service-1c\u003Ei{--ui-icon-service-bg-color:#fade39;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-1c.svg?v=1); }\n\n.ui-icon-service-light-1c \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-1c.svg);}.ui-icon-service-office365\u003Ei{--ui-icon-service-bg-color:#fff;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-office365.svg); }\n\n.ui-icon-service-light-office365 \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-office365.svg);}.ui-icon-service-ya\u003Ei,.ui-icon-service-yandex\u003Ei{--ui-icon-service-bg-color:#fff;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-ya.svg); }\n\n.ui-icon-service-light-ya \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-ya.svg);}.ui-icon-service-ya-dialogs\u003Ei{--ui-icon-service-bg-color:#3a78db;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-ya-dialogs.svg); }\n\n.ui-icon-service-light-ya-dialogs \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-ya-dialogs.svg);}.ui-icon-service-ya-direct\u003Ei{--ui-icon-service-bg-color:#ffce00;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-ya-direct.svg); }\n\n.ui-icon-service-light-ya-direct \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-ya-direct.svg);}.ui-icon-service-ya-toloka\u003Ei{--ui-icon-service-bg-color:#ea8428;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-ya-toloka.svg); background-size:30px;}\n\n.ui-icon-service-light-ya-toloka \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-ya-toloka.svg);}.ui-icon-service-liveid\u003Ei{--ui-icon-service-bg-color:#fff;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-liveid.svg); }\n\n.ui-icon-service-light-liveid \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-liveid.svg);}.ui-icon-service-twitter\u003Ei{--ui-icon-service-bg-color:#1ea1f2;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-twitter.svg); }\n\n.ui-icon-service-light-twitter \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-twitter.svg);}.ui-icon-service-google\u003Ei{--ui-icon-service-bg-color:#fff;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-google.svg); }\n\n.ui-icon-service-light-google \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-google.svg);}.ui-icon-service-google-ads\u003Ei{--ui-icon-service-bg-color:#3889db;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-googleads.svg); }\n\n.ui-icon-service-light-google-ads \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-googleads.svg);}.ui-icon-service-rest-contact-center\u003Ei{--ui-icon-service-bg-color:#eb9e06;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-common.svg); }\n\n.ui-icon-service-light-rest-contact-center \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-common.svg);}.ui-icon-service-chatbot\u003Ei{--ui-icon-service-bg-color:#359fd0;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-chatbot.svg); }\n\n.ui-icon-service-light-chatbot \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-chatbot.svg);}.ui-icon-service-telephonybot\u003Ei{--ui-icon-service-bg-color:#af6d4d;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-telephonybot.svg); }\n\n.ui-icon-service-light-telephonybot \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-telephonybot.svg);}.ui-icon-service-campaign\u003Ei{--ui-icon-service-bg-color:#2bbff0;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-campaign.svg); }\n\n.ui-icon-service-light-campaign \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-campaign.svg);}.ui-icon-service-sms\u003Ei{--ui-icon-service-bg-color:#f4769c;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-sms.svg); }\n\n.ui-icon-service-light-sms \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-sms.svg);}.ui-icon-service-messenger\u003Ei{--ui-icon-service-bg-color:#97cb13;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-messenger.svg); }\n\n.ui-icon-service-light-messenger \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-messenger.svg);}.ui-icon-service-infocall\u003Ei{--ui-icon-service-bg-color:#349ed0;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-infocall.svg);}.ui-icon-service-audio-infocall\u003Ei{--ui-icon-service-bg-color:#3dc9db;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-audio-infocall.svg); }\n\n.ui-icon-service-light-audio-infocall \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-audio-infocall.svg); }\n\n.ui-icon-service-light-infocall \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-audio-infocall.svg);}.ui-icon-service-deal\u003Ei{--ui-icon-service-bg-color:#349ed0;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-deal.svg); }\n\n.ui-icon-service-light-deal \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-deal.svg);}.ui-icon-service-lead\u003Ei{--ui-icon-service-bg-color:#349ed0;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-lead.svg); }\n\n.ui-icon-service-light-lead \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-lead.svg);}.ui-icon-service-whatsapp\u003Ei{--ui-icon-service-bg-color:#01e675;background-size:30px;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-whatsapp.svg);}.ui-icon-service-light-whatsapp\u003Ei{background-size:30px;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-whatsapp.svg);}.ui-icon-service-wechat\u003Ei{--ui-icon-service-bg-color:#2ec100;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-wechat.svg); }\n\n.ui-icon-service-light-wechat \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-wechat.svg);}.ui-icon-service-avito\u003Ei{--ui-icon-service-bg-color:#0af;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-avito.svg); }\n\n.ui-icon-service-light-avito \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-avito.svg);}.ui-icon-service-mailru\u003Ei,.ui-icon-service-mailru2\u003Ei{--ui-icon-service-bg-color:#005ff9;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-mailru.svg); }\n\n.ui-icon-service-light-mailru \u003E i,\n.ui-icon-service-light-mailru2 \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-mailru.svg);}.ui-icon.ui-icon-service-sbbol\u003Ei,.ui-icon.ui-icon-service-sberbank\u003Ei{--ui-icon-service-bg-color:#289d37;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-sberbank.svg);}.ui-icon.ui-icon-service-green-sberbank\u003Ei{--ui-icon-service-bg-color:#ebeff2;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-green-sberbank.svg); }\n\n.ui-icon.ui-icon-service-light-sbbol \u003E i,\n.ui-icon.ui-icon-service-light-sberbank \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-sberbank.svg);}.ui-icon-service-olx\u003Ei{--ui-icon-service-bg-color:#5b2b82;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-olx.svg); }\n\n.ui-icon-service-light-olx \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-olx.svg);}.ui-icon.ui-icon-service-import\u003Ei{--ui-icon-service-bg-color:#6a89b0;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-import.svg); }\n\n.ui-icon.ui-icon-service-light-import \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-import.svg);}.ui-icon.ui-icon-service-zoom\u003Ei{--ui-icon-service-bg-color:#4690fb;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-zoom.svg);}.ui-icon.ui-icon-service-blue-zoom\u003Ei{--ui-icon-service-bg-color:transparent;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-blue-zoom.svg); }\n\n.ui-icon.ui-icon-service-light-zoom \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-zoom.svg);}.ui-icon.ui-icon-service-widget\u003Ei{--ui-icon-service-bg-color:#333;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-widget.svg); }\n\n.ui-icon.ui-icon-service-light-widget \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-widget.svg);}.ui-icon.ui-icon-service-wheel\u003Ei{--ui-icon-service-bg-color:#333;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-wheel.svg); }\n\n.ui-icon.ui-icon-service-light-wheel \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-wheel.svg);}.ui-icon.ui-icon-service-play\u003Ei{--ui-icon-service-bg-color:#333;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-play.svg); }\n\n.ui-icon.ui-icon-service-light-play \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-play.svg);}.ui-icon.ui-icon-service-other\u003Ei{--ui-icon-service-bg-color:#333;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-other.svg); }\n\n.ui-icon.ui-icon-service-light-other \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-other.svg);}.ui-icon.ui-icon-service-cart\u003Ei{--ui-icon-service-bg-color:#333;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-cart.svg); }\n\n.ui-icon.ui-icon-service-light-cart \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-cart.svg);}.ui-icon.ui-icon-service-add\u003Ei{--ui-icon-service-bg-color:#333;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-add.svg); }\n\n.ui-icon.ui-icon-service-light-add \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-add.svg);}.ui-icon.ui-icon-service-arrows\u003Ei{--ui-icon-service-bg-color:#333;\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-arrows.svg); }\n\n.ui-icon.ui-icon-service-light-arrows \u003E i {\n\tbackground-image: url(https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/service/images/ui-service-light-arrows.svg);}",
                cache: true,
            },
            {
                type: "css",
                path: "https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/b24/ui.icons.b24.css?1593701209.1654",
                content:
                    ".ui-icon[class*=ui-icon-common-]\u003Ei{background-color:#7b8691}\n.ui-icon-common-user \u003E i { background-image: url(/bitrix/js/ui/icons/b24/images/ui-user.svg?v2); } \n.ui-icon-common-phone \u003E i { background-image: url(/bitrix/js/ui/icons/b24/images/ui-call.svg); } \n.ui-icon-common-notification \u003E i { background-image: url(/bitrix/js/ui/icons/b24/images/ui-notification.svg); } \n.ui-icon-common-user-group \u003E i { background-image: url(/bitrix/js/ui/icons/b24/images/ui-user-group.svg?v2); } \n.ui-icon-common-user-mail \u003E i { background-image: url(/bitrix/js/ui/icons/b24/images/ui-user-mail.svg?v2); } \n.ui-icon-common-company \u003E i { background-image: url(/bitrix/js/ui/icons/b24/images/ui-user-company.svg?v2); } \n.ui-icon-common-bitrix24 \u003E i { background-image: url(/bitrix/js/ui/icons/service/images/ui-service-bitrix24.svg); } \n.ui-icon-common-cloud \u003E i { background-image: url(/bitrix/js/ui/icons/b24/images/ui-cloud.svg); } \n.ui-icon-common-folder \u003E i { background-image: url(/bitrix/js/ui/icons/b24/images/ui-folder.svg); } \n.ui-icon-common-info \u003E i { background-image: url(/bitrix/js/ui/icons/b24/images/ui-info.svg); } \n.ui-icon-common-question \u003E i { background-image: url(/bitrix/js/ui/icons/b24/images/ui-question.svg); } .ui-icon-package-numbers-five\u003Ei{--ui-icon-service-bg-color:#9dcf00;\tbackground-image: url(/bitrix/js/ui/icons/b24/images/ui-package-numbers-five.svg?v2); background-size:20px 20px}.ui-icon-package-numbers-ten\u003Ei{--ui-icon-service-bg-color:#55d0e0;\tbackground-image: url(/bitrix/js/ui/icons/b24/images/ui-package-numbers-ten.svg?v2); background-size:28px 20px}",
                cache: true,
            },
            {
                type: "css",
                path: "https://b24-p9cw17.bitrix24.com/bitrix/js/ui/icons/disk/ui.icons.disk.css?1603464484.2919",
                content:
                    "/*region File icons*/\n.ui-icon[class*=ui-icon-file-] \u003E i {\n\tbackground: url(/bitrix/js/ui/icons/disk/images/sprite-files.min.svg?v1.3) no-repeat center; background-size:100% auto;--icon-file-col:14}.ui-icon.ui-icon-file-empty\u003Ei{background-position:0 calc(100% / var(--icon-file-col) * 0)}.ui-icon.ui-icon-file-txt\u003Ei{background-position:0 calc(100% / var(--icon-file-col) * 1)}.ui-icon.ui-icon-file-doc\u003Ei,.ui-icon.ui-icon-file-docx\u003Ei{background-position:0 calc(100% / var(--icon-file-col) * 2)}.ui-icon.ui-icon-file-xls\u003Ei,.ui-icon.ui-icon-file-xlsx\u003Ei{background-position:0 calc(100% / var(--icon-file-col) * 3)}.ui-icon.ui-icon-file-php\u003Ei{background-position:0 calc(100% / var(--icon-file-col) * 4)}.ui-icon.ui-icon-file-pdf\u003Ei{background-position:0 calc(100% / var(--icon-file-col) * 5)}.ui-icon.ui-icon-file-ppt\u003Ei{background-position:0 calc(100% / var(--icon-file-col) * 6)}.ui-icon.ui-icon-file-rar\u003Ei{background-position:0 calc(100% / var(--icon-file-col) * 7)}.ui-icon.ui-icon-file-zip\u003Ei{background-position:0 calc(100% / var(--icon-file-col) * 8)}.ui-icon.ui-icon-file-set\u003Ei{background-position:0 calc(100% / var(--icon-file-col) * 9)}.ui-icon.ui-icon-file-mov\u003Ei,.ui-icon.ui-icon-file-mp4\u003Ei{background-position:0 calc(100% / var(--icon-file-col) * 10)}.ui-icon.ui-icon-file-img\u003Ei{background-position:0 calc(100% / var(--icon-file-col) * 11)}.ui-icon.ui-icon-file-folder\u003Ei{background-position:0 calc(100% / var(--icon-file-col) * 12)}.ui-icon.ui-icon-file-folder-shared\u003Ei{background-position:0 calc(100% / var(--icon-file-col) * 13)}.ui-icon.ui-icon-file-folder-shared-2\u003Ei{background-position:0 calc(100% / var(--icon-file-col) * 14)}.bx-ie .ui-icon-file,.bx-ie .ui-icon-file-empty\u003Ei{background-position:0 0}.bx-ie .ui-icon-file-txt\u003Ei{background-position:0 7.14%}.bx-ie .ui-icon-file-doc\u003Ei,.bx-ie .ui-icon-file-docx\u003Ei{background-position:0 14.28%}.bx-ie .ui-icon-file-xls\u003Ei,.bx-ie .ui-icon-file-xlsx\u003Ei{background-position:0 21.42%}.bx-ie .ui-icon-file-php\u003Ei{background-position:0 28.58%}.bx-ie .ui-icon-file-pdf\u003Ei{background-position:0 35.72%}.bx-ie .ui-icon-file-ppt\u003Ei{background-position:0 42.86%}.bx-ie .ui-icon-file-rar\u003Ei{background-position:0 50%}.bx-ie .ui-icon-file-zip\u003Ei{background-position:0 57.14%}.bx-ie .ui-icon-file-set\u003Ei{background-position:0 64.28%}.bx-ie .ui-icon-file-mov\u003Ei,.bx-ie .ui-icon-file-mp4\u003Ei{background-position:0 71.42%}.bx-ie .ui-icon-file-img\u003Ei{background-position:0 78.58%}.bx-ie .ui-icon-file-folder\u003Ei{background-position:0 85.72%}.bx-ie .ui-icon-file-folder-shared\u003Ei{background-position:0 92.86%}.bx-ie .ui-icon-file-folder-shared-2\u003Ei{background-position:0 100%}",
                cache: true,
            },
        ]);

        module.language = "en";
        module.languages = ["en"];
        module.messages = { location: "bottom-right", colorBackground: "#00AEEF", colorIcon: "#FFFFFF" };

        module.loadResources([
            {
                type: "layout",
                path: "https://b24-p9cw17.bitrix24.com/bitrix/components/bitrix/crm.button.button/templates/.default/layout.html?1616489483.7409",
                content:
                    "\u003Cdiv\u003E\n\t\u003Cdiv data-b24-crm-button-shadow=\u0022\u0022 class=\u0022b24-widget-button-shadow\u0022\u003E\u003C/div\u003E\n\t\u003Cdiv style=\u0022display: none;\u0022\u003E\n\t\t\u003Ca data-b24-crm-button-widget-blank=\u0022\u0022 data-b24-crm-button-widget=\u0022\u0022 class=\u0022b24-widget-button-social-item\u0022 title=\u0022\u0022\u003E\n\t\t\t\u003Ci\u003E\u003C/i\u003E\n\t\t\t\u003Cspan data-b24-crm-button-tooltip=\u0022\u0022 class=\u0022b24-widget-button-social-tooltip\u0022\u003E\u003C/span\u003E\n\t\t\u003C/a\u003E\n\t\u003C/div\u003E\n\n\t\u003Cdiv dir=\u0022ltr\u0022 data-b24-crm-button-cont=\u0022\u0022 class=\u0022b24-widget-button-wrapper b24-widget-button-position-%location%\u0022\u003E\n\t\t\u003Cdiv data-b24-crm-hello-cont=\u0022\u0022 class=\u0022b24-widget-button-popup\u0022 style=\u0022border-color: %colorBackground%;\u0022\u003E\n\t\t\t\u003Cspan data-b24-hello-btn-hide=\u0022\u0022 class=\u0022b24-widget-button-popup-btn-hide\u0022\u003E\u003C/span\u003E\n\t\t\t\u003Cdiv class=\u0022b24-widget-button-popup-inner\u0022\u003E\n\t\t\t\t\u003Cdiv class=\u0022b24-widget-button-popup-image\u0022\u003E\n\t\t\t\t\t\u003Cspan data-b24-hello-icon=\u0022\u0022 class=\u0022b24-widget-button-popup-image-item\u0022\u003E\u003C/span\u003E\n\t\t\t\t\u003C/div\u003E\n\t\t\t\t\u003Cdiv class=\u0022b24-widget-button-popup-content\u0022\u003E\n\t\t\t\t\t\u003Cdiv data-b24-hello-name=\u0022\u0022 class=\u0022b24-widget-button-popup-name\u0022\u003E\u003C/div\u003E\n\t\t\t\t\t\u003Cdiv data-b24-hello-text=\u0022\u0022 class=\u0022b24-widget-button-popup-description\u0022\u003E\u003C/div\u003E\n\t\t\t\t\u003C/div\u003E\n\t\t\t\u003C/div\u003E\n\t\t\t\u003Cdiv class=\u0022b24-widget-button-popup-triangle\u0022 style=\u0022border-color: %colorBackground%;\u0022\u003E\u003C/div\u003E\n\t\t\u003C/div\u003E\n\n\t\t\u003Cdiv data-b24-crm-button-block=\u0022\u0022 class=\u0022b24-widget-button-social\u0022\u003E\n\n\t\t\u003C/div\u003E\n\t\t\u003Cdiv data-b24-crm-button-block-button=\u0022\u0022 class=\u0022b24-widget-button-inner-container\u0022\u003E\n\t\t\t\u003Cdiv data-b24-crm-button-block-border=\u0022\u0022 class=\u0022b24-widget-button-inner-mask\u0022 style=\u0022background: %colorBackground%;\u0022\u003E\u003C/div\u003E\n\t\t\t\u003Cdiv class=\u0022b24-widget-button-block\u0022\u003E\n\t\t\t\t\u003Cdiv data-b24-crm-button-pulse=\u0022\u0022 class=\u0022b24-widget-button-pulse\u0022 style=\u0022border-color: %colorBackground%;\u0022\u003E\u003C/div\u003E\n\t\t\t\t\u003Cdiv data-b24-crm-button-block-inner=\u0022\u0022 class=\u0022b24-widget-button-inner-block\u0022 style=\u0022background: %colorBackground%;\u0022\u003E\n\t\t\t\t\t\u003Cdiv class=\u0022b24-widget-button-icon-container\u0022\u003E\n\n\t\t\t\t\t\t\u003Cdiv data-b24-crm-button-icon=\u0022crmform\u0022 class=\u0022b24-widget-button-inner-item\u0022\u003E\n\t\t\t\t\t\t\t\u003Csvg class=\u0022b24-crm-button-icon\u0022 width=\u002228\u0022 height=\u002229\u0022 xmlns=\u0022http://www.w3.org/2000/svg\u0022\u003E\n\t\t\t\t\t\t\t\t\u003Cpath class=\u0022b24-crm-button-webform-icon\u0022 d=\u0022M25.99 7.744a2 2 0 012 2v11.49a2 2 0 01-2 2h-1.044v5.162l-4.752-5.163h-7.503a2 2 0 01-2-2v-1.872h10.073a3 3 0 003-3V7.744zM19.381 0a2 2 0 012 2v12.78a2 2 0 01-2 2h-8.69l-5.94 6.453V16.78H2a2 2 0 01-2-2V2a2 2 0 012-2h17.382z\u0022\n\t\t\t\t\t\t\t\t\t  fill=\u0022 %colorIcon%\u0022 fill-rule=\u0022evenodd\u0022/\u003E\n\t\t\t\t\t\t\t\u003C/svg\u003E\n\t\t\t\t\t\t\u003C/div\u003E\n\n\t\t\t\t\t\t\u003Cdiv data-b24-crm-button-icon=\u0022callback\u0022 class=\u0022b24-widget-button-inner-item\u0022\u003E\n\t\t\t\t\t\t\t\u003Csvg class=\u0022b24-crm-button-icon\u0022 xmlns=\u0022http://www.w3.org/2000/svg\u0022 width=\u002228\u0022 height=\u002228\u0022\n\t\t\t\t\t\t\t\tviewBox=\u00220 0 28 30\u0022\u003E\n\t\t\t\t\t\t\t\t\u003Cpath class=\u0022b24-crm-button-call-icon\u0022 fill=\u0022%colorIcon%\u0022 fill-rule=\u0022evenodd\u0022\n\t\t\t\t\t\t\t\t\td=\u0022M940.872414,978.904882 C939.924716,977.937215 938.741602,977.937215 937.79994,978.904882 C937.08162,979.641558 936.54439,979.878792 935.838143,980.627954 C935.644982,980.833973 935.482002,980.877674 935.246586,980.740328 C934.781791,980.478121 934.286815,980.265859 933.840129,979.97868 C931.757607,978.623946 930.013117,976.882145 928.467826,974.921839 C927.701216,973.947929 927.019115,972.905345 926.542247,971.731659 C926.445666,971.494424 926.463775,971.338349 926.6509,971.144815 C927.36922,970.426869 927.610672,970.164662 928.316918,969.427987 C929.300835,968.404132 929.300835,967.205474 928.310882,966.175376 C927.749506,965.588533 927.206723,964.77769 926.749111,964.14109 C926.29156,963.50449 925.932581,962.747962 925.347061,962.154875 C924.399362,961.199694 923.216248,961.199694 922.274586,962.161118 C921.55023,962.897794 920.856056,963.653199 920.119628,964.377388 C919.437527,965.045391 919.093458,965.863226 919.021022,966.818407 C918.906333,968.372917 919.274547,969.840026 919.793668,971.269676 C920.856056,974.228864 922.473784,976.857173 924.43558,979.266977 C927.085514,982.52583 930.248533,985.104195 933.948783,986.964613 C935.6148,987.801177 937.341181,988.444207 939.218469,988.550339 C940.510236,988.625255 941.632988,988.288132 942.532396,987.245549 C943.148098,986.533845 943.842272,985.884572 944.494192,985.204083 C945.459999,984.192715 945.466036,982.969084 944.506265,981.970202 C943.359368,980.777786 942.025347,980.091055 940.872414,978.904882 Z M940.382358,973.54478 L940.649524,973.497583 C941.23257,973.394635 941.603198,972.790811 941.439977,972.202844 C940.97488,970.527406 940.107887,969.010104 938.90256,967.758442 C937.61538,966.427182 936.045641,965.504215 934.314009,965.050223 C933.739293,964.899516 933.16512,965.298008 933.082785,965.905204 L933.044877,966.18514 C932.974072,966.707431 933.297859,967.194823 933.791507,967.32705 C935.117621,967.682278 936.321439,968.391422 937.308977,969.412841 C938.23579,970.371393 938.90093,971.53815 939.261598,972.824711 C939.401641,973.324464 939.886476,973.632369 940.382358,973.54478 Z M942.940854,963.694228 C940.618932,961.29279 937.740886,959.69052 934.559939,959.020645 C934.000194,958.902777 933.461152,959.302642 933.381836,959.8878 L933.343988,960.167112 C933.271069,960.705385 933.615682,961.208072 934.130397,961.317762 C936.868581,961.901546 939.347628,963.286122 941.347272,965.348626 C943.231864,967.297758 944.53673,969.7065 945.149595,972.360343 C945.27189,972.889813 945.766987,973.232554 946.285807,973.140969 L946.55074,973.094209 C947.119782,972.993697 947.484193,972.415781 947.350127,971.835056 C946.638568,968.753629 945.126778,965.960567 942.940854,963.694228 Z\u0022\n\t\t\t\t\t\t\t\t\ttransform=\u0022translate(-919 -959)\u0022/\u003E\n\t\t\t\t\t\t\t\u003C/svg\u003E\n\t\t\t\t\t\t\u003C/div\u003E\n\n\t\t\t\t\t\t\u003Cdiv data-b24-crm-button-icon=\u0022openline\u0022 class=\u0022b24-widget-button-inner-item\u0022\u003E\n\t\t\t\t\t\t\t\u003Csvg class=\u0022b24-crm-button-icon b24-crm-button-icon-active\u0022 xmlns=\u0022http://www.w3.org/2000/svg\u0022\n\t\t\t\t\t\t\t\twidth=\u002228\u0022 height=\u002228\u0022 viewBox=\u00220 0 28 29\u0022\u003E\n\t\t\t\t\t\t\t\t\u003Cpath class=\u0022b24-crm-button-chat-icon\u0022 fill=\u0022%colorIcon%\u0022 fill-rule=\u0022evenodd\u0022\n\t\t\t\t\t\t\t\t\td=\u0022M878.289968,975.251189 L878.289968,964.83954 C878.289968,963.46238 876.904379,962 875.495172,962 L857.794796,962 C856.385491,962 855,963.46238 855,964.83954 L855,975.251189 C855,976.924031 856.385491,978.386204 857.794796,978.090729 L860.589592,978.090729 L860.589592,981.876783 L860.589592,983.76981 L861.521191,983.76981 C861.560963,983.76981 861.809636,982.719151 862.45279,982.823297 L866.179185,978.090729 L875.495172,978.090729 C876.904379,978.386204 878.289968,976.924031 878.289968,975.251189 Z M881.084764,971.465135 L881.084764,976.197702 C881.43316,978.604561 879.329051,980.755508 876.426771,980.93027 L868.042382,980.93027 L866.179185,982.823297 C866.400357,983.946455 867.522357,984.94992 868.973981,984.716324 L876.426771,984.716324 L879.221567,988.502377 C879.844559,988.400361 880.153166,989.448891 880.153166,989.448891 L881.084764,989.448891 L881.084764,987.555864 L881.084764,984.716324 L882.947962,984.716324 C884.517696,984.949819 885.742758,983.697082 885.742758,981.876783 L885.742758,974.304675 C885.742659,972.717669 884.517597,971.465135 882.947962,971.465135 L881.084764,971.465135 Z\u0022\n\t\t\t\t\t\t\t\t\ttransform=\u0022translate(-855 -962)\u0022/\u003E\n\t\t\t\t\t\t\t\u003C/svg\u003E\n\t\t\t\t\t\t\u003C/div\u003E\n\n\t\t\t\t\t\u003C/div\u003E\n\t\t\t\t\t\u003Cdiv class=\u0022b24-widget-button-inner-item b24-widget-button-close\u0022\u003E\n\t\t\t\t\t\t\u003Csvg class=\u0022b24-widget-button-icon b24-widget-button-close-item\u0022 xmlns=\u0022http://www.w3.org/2000/svg\u0022 width=\u002229\u0022 height=\u002229\u0022 viewBox=\u00220 0 29 29\u0022\u003E\u003Cpath fill=\u0022#FFF\u0022 fill-rule=\u0022evenodd\u0022 d=\u0022M18.866 14.45l9.58-9.582L24.03.448l-9.587 9.58L4.873.447.455 4.866l9.575 9.587-9.583 9.57 4.418 4.42 9.58-9.577 9.58 9.58 4.42-4.42\u0022/\u003E\u003C/svg\u003E\n\t\t\t\t\t\u003C/div\u003E\n\t\t\t\t\u003C/div\u003E\n\t\t\t\u003C/div\u003E\n\t\t\u003C/div\u003E\n\t\u003C/div\u003E\n\u003C/div\u003E\n",
                cache: true,
            },
        ]);

        (function () {
            "use strict";
            if (typeof webPacker === "undefined") {
                return;
            }
            if (!window.BX) {
                window.BX = {};
            } else if (window.BX.SiteButton) {
                return;
            }
            var t = webPacker.classes;
            var e = webPacker.browser;
            var i = webPacker.type;
            var n = {
                clickHandler: null,
                shadowNode: null,
                displayed: false,
                init: function (t) {
                    this.shadowNode = t.shadowNode;
                    webPacker.addEventListener(this.shadowNode, "click", this.onClick.bind(this));
                    webPacker.addEventListener(
                        document,
                        "keyup",
                        function (t) {
                            if ((t || window.e).keyCode === 27) this.onClick();
                        }.bind(this)
                    );
                },
                onClick: function () {
                    if (!this.displayed) {
                        return;
                    }
                    r.hide();
                    o.hide();
                    if (!this.clickHandler) {
                        return;
                    }
                    this.clickHandler.apply(this, []);
                    this.clickHandler = null;
                },
                show: function (e) {
                    this.clickHandler = e;
                    t.add(this.shadowNode, "b24-widget-button-show");
                    t.remove(this.shadowNode, "b24-widget-button-hide");
                    h.saveScrollPos();
                    t.add(document.documentElement, "crm-widget-button-mobile", true);
                    this.displayed = true;
                },
                hide: function () {
                    if (this.displayed) {
                        t.add(this.shadowNode, "b24-widget-button-hide");
                    }
                    t.remove(this.shadowNode, "b24-widget-button-show");
                    t.remove(document.documentElement, "crm-widget-button-mobile");
                    h.restoreScrollPos();
                    this.displayed = false;
                },
            };
            var o = {
                isShown: false,
                isInit: false,
                wasOnceShown: false,
                wasOnceClick: false,
                blankButtonNode: null,
                list: [],
                frozen: false,
                init: function (t) {
                    this.container = t.container;
                    this.blankButtonNode = t.blankButtonNode;
                    this.openerButtonNode = t.openerButtonNode;
                    this.openerClassName = l.config.location > 3 ? "b24-widget-button-bottom" : "b24-widget-button-top";
                    webPacker.addEventListener(
                        this.openerButtonNode,
                        "click",
                        function () {
                            if (this.frozen) {
                                this.unfreeze();
                            } else {
                                if (this.list.length === 1 && this.list[0].onclick && !this.list[0].href) {
                                    this.list[0].onclick.apply(this, []);
                                } else {
                                    this.toggle();
                                }
                            }
                        }.bind(this)
                    );
                    this.isInit = true;
                    this.list.forEach(function (t) {
                        if (!t.node) this.insert(t);
                    }, this);
                    s.restart();
                },
                getByType: function (t) {
                    var e = this.list.filter(function (e) {
                        return t === e.type;
                    }, this);
                    return e.length > 0 ? e[0] : null;
                },
                toggle: function () {
                    this.isShown ? this.hide() : this.show();
                },
                show: function () {
                    if (e.isIOS()) {
                        t.add(document.documentElement, "bx-ios-fix-frame-focus");
                    }
                    {
                        n.show();
                    }
                    this.isShown = true;
                    this.wasOnceShown = true;
                    t.add(l.container, this.openerClassName);
                    t.add(this.container, "b24-widget-button-show");
                    t.remove(this.container, "b24-widget-button-hide");
                    a.hide();
                },
                hide: function () {
                    if (e.isIOS()) {
                        t.remove(document.documentElement, "bx-ios-fix-frame-focus");
                    }
                    this.isShown = false;
                    t.add(this.container, "b24-widget-button-hide");
                    t.remove(this.container, "b24-widget-button-show");
                    t.remove(l.container, this.openerClassName);
                    a.hide();
                    n.hide();
                },
                freeze: function (t) {
                    this.hide();
                    if (t) {
                        s.freeze(t);
                    }
                    this.frozen = true;
                },
                unfreeze: function () {
                    s.start();
                    r.hide();
                    this.hide();
                    this.frozen = false;
                },
                displayButton: function (t, e) {
                    this.list.forEach(function (i) {
                        if (i.id !== t) return;
                        if (!i.node) return;
                        i.node.style.display = e ? "" : "none";
                    });
                },
                sortOut: function () {
                    this.list.sort(function (t, e) {
                        return t.sort > e.sort ? 1 : -1;
                    });
                    this.list.forEach(function (t) {
                        if (!t.node) return;
                        t.node.parentNode.appendChild(t.node);
                    });
                },
                add: function (t) {
                    this.list.push(t);
                    return this.insert(t);
                },
                insert: function (e) {
                    if (!this.isInit) {
                        e.node = null;
                        return null;
                    }
                    var i = this.blankButtonNode.cloneNode(true);
                    e.node = i;
                    e.sort = e.sort || 100;
                    i.setAttribute("data-b24-crm-button-widget", e.id);
                    i.setAttribute("data-b24-widget-sort", e.sort);
                    if (e.classList && e.classList.length > 0) {
                        e.classList.forEach(function (e) {
                            t.add(i, e);
                        }, this);
                    }
                    if (e.title) {
                        var n = i.querySelector("[data-b24-crm-button-tooltip]");
                        if (n) {
                            n.innerText = e.title;
                        } else {
                            i.title = e.title;
                        }
                    }
                    if (e.icon) {
                        i.style["background-image"] = "url(" + e.icon + ")";
                    } else {
                        if (e.iconColor) {
                            setTimeout(function () {
                                var t = "background-image";
                                if (!window.getComputedStyle) {
                                    return;
                                }
                                var n = window.getComputedStyle(i, null).getPropertyValue(t);
                                i.style[t] = (n || "").replace("FFF", e.iconColor.substring(1));
                            }, 1e3);
                        }
                        if (e.bgColor) {
                            i.style["background-color"] = e.bgColor;
                        }
                    }
                    if (e.href) {
                        i.href = e.href;
                        i.target = e.target ? e.target : "_blank";
                    }
                    if (e.onclick) {
                        webPacker.addEventListener(
                            i,
                            "click",
                            function () {
                                this.wasOnceClick = true;
                                e.onclick.apply(this, []);
                            }.bind(this)
                        );
                    }
                    this.container.appendChild(i);
                    this.sortOut();
                    s.restart();
                    return i;
                },
            };
            var s = {
                isInit: false,
                timer: null,
                timerPeriod: 1500,
                icons: [],
                pulsar: null,
                stop: function () {
                    this.rotate(false).pulse(false);
                },
                freeze: function (t) {
                    this.rotate(t).pulse(false);
                },
                start: function () {
                    this.rotate().pulse(true);
                },
                rotate: function (e) {
                    this.init();
                    if (this.timer) clearTimeout(this.timer);
                    if (e === false) {
                        return this;
                    }
                    var i = "b24-widget-button-icon-animation";
                    var n = 0;
                    var o = this.icons.filter(function (t) {
                        return !t.hidden;
                    });
                    o.forEach(function (e, o) {
                        if (t.has(e.node, i)) n = o;
                        t.remove(e.node, i);
                    }, this);
                    var s;
                    if (
                        e &&
                        !(s = o.filter(function (t) {
                            return t.type === e;
                        })[0])
                    ) {
                        throw new Error("Animation.rotate: Unknown type `" + e + "`");
                    }
                    if (!s && !(s = o.concat(this.icons).slice(n + 1)[0])) {
                        return this;
                    }
                    t.add(s.node, i);
                    if (!e && o.length > 1) {
                        this.timer = setTimeout(this.rotate.bind(this), this.timerPeriod);
                    }
                    return this;
                },
                pulse: function (e) {
                    t.change(this.pulsar, "b24-widget-button-pulse-animate", e);
                    return this;
                },
                restart: function () {
                    this.isInit = false;
                    this.start();
                },
                init: function () {
                    if (this.isInit) {
                        return this;
                    }
                    var t = "data-b24-crm-button-icon";
                    this.icons = i
                        .toArray(l.context.querySelectorAll("[" + t + "]"))
                        .map(function (e) {
                            var i = e.getAttribute(t);
                            var n = !o.getByType(i);
                            e.style.display = n ? "none" : "";
                            return { node: e, type: i, hidden: n };
                        }, this)
                        .filter(function (t) {
                            return !t.hidden;
                        }, this);
                    this.pulsar = l.context.querySelector("[data-b24-crm-button-pulse]");
                    this.isInit = true;
                    return this;
                },
            };
            var r = {
                showedWidget: null,
                loadedCount: 0,
                getList: function () {
                    return l.config.widgets.filter(function (t) {
                        return t.isLoaded;
                    }, this);
                },
                getById: function (t) {
                    var e = l.config.widgets.filter(function (e) {
                        return t === e.id && e.isLoaded;
                    }, this);
                    return e.length > 0 ? e[0] : null;
                },
                hide: function () {
                    if (!this.showedWidget) {
                        return;
                    }
                    var t = this.showedWidget;
                    this.showedWidget = null;
                    if (t.hide) {
                        c.evalGlobal(t.hide);
                    }
                    l.show();
                    n.hide();
                },
                show: function (t) {
                    this.storeTrace(t);
                    if (!t.show || !i.isString(t.show)) {
                        return;
                    }
                    this.showedWidget = t;
                    if (!t.freeze) {
                        n.show();
                    }
                    c.evalGlobal(t.show);
                    if (t.freeze) {
                        l.freeze(t.type);
                    } else {
                        l.hide();
                    }
                },
                storeTrace: function (t) {
                    if (!t || !t.tracking || !t.tracking.detecting) {
                        return;
                    }
                    t.tracking.detecting = false;
                    var e = l.getTrace({ channels: [t.tracking.channel] });
                    l.b24Tracker.guest.storeTrace(e);
                },
                showById: function (t) {
                    var e = this.getById(t);
                    if (e) {
                        this.show(e);
                    }
                },
                checkAll: function () {
                    return l.config.widgets.some(this.check, this);
                },
                check: function (t) {
                    return this.checkPages(t) && this.checkWorkTime(t);
                },
                checkPagesAll: function () {
                    return l.config.widgets.some(this.checkPages, this);
                },
                checkPages: function (t) {
                    var e = c.isCurPageInList(t.pages.list);
                    if (t.pages.mode === "EXCLUDE") {
                        return !e;
                    } else {
                        return e;
                    }
                },
                checkWorkTimeAll: function () {
                    return l.config.widgets.some(this.checkWorkTime, this);
                },
                checkWorkTime: function (t) {
                    if (!t.workTime) {
                        t.isWorkTimeNow = true;
                        t.isWorkTimeChecked = true;
                    }
                    if (t.isWorkTimeChecked) {
                        return t.isWorkTimeNow;
                    }
                    var e = t.workTime;
                    var i = new Date();
                    if (l.config.serverTimeStamp) {
                        i = new Date(l.config.serverTimeStamp);
                    }
                    var n = e.timeZoneOffset + i.getTimezoneOffset();
                    i = new Date(i.valueOf() + n * 6e4);
                    var o = i.getMinutes();
                    o = o >= 10 ? o : "0" + o;
                    var s = parseFloat(i.getHours() + "." + o);
                    var r = true;
                    if (e.dayOff) {
                        var a = i.getDay();
                        if (
                            e.dayOff.some(function (t) {
                                return t === a;
                            })
                        ) {
                            r = false;
                        }
                    }
                    if (r && e.holidays) {
                        var c = (i.getMonth() + 1).toString();
                        c = (c.length === 1 ? "0" : "") + c;
                        c = i.getDate() + "." + c;
                        if (
                            e.holidays.some(function (t) {
                                return t === c;
                            })
                        ) {
                            r = false;
                        }
                    }
                    if (r) {
                        var h = e.timeTo < e.timeFrom;
                        if (h) {
                            if (s > e.timeTo && s < e.timeFrom) {
                                r = false;
                            }
                        } else {
                            if (s < e.timeFrom || s > e.timeTo) {
                                r = false;
                            }
                        }
                    }
                    t.isWorkTimeChecked = true;
                    t.isWorkTimeActionRule = false;
                    if (!r && !!e.actionRule) {
                        r = true;
                        t.isWorkTimeActionRule = true;
                    }
                    t.isWorkTimeNow = r;
                    return r;
                },
                loadAll: function () {
                    l.config.widgets.forEach(this.load, this);
                },
                load: function (t) {
                    t.isLoaded = false;
                    l.execEventHandler("load-widget-" + t.id, [t]);
                    if (!this.check(t)) {
                        return;
                    }
                    if (t.workTime && t.isWorkTimeActionRule) {
                        switch (t.workTime.actionRule) {
                            case "text":
                                if (t.type === "callback") {
                                    l.addEventHandler("form-init", function (e) {
                                        if (!e.isCallbackForm) return;
                                        window.Bitrix24FormLoader.addEventHandler(e, "init-frame-params", function (e, i) {
                                            i.resultSuccessText = t.workTime.actionText;
                                            i.stopCallBack = true;
                                        });
                                    });
                                }
                                break;
                        }
                    }
                    t.buttonNode = o.add({
                        id: t.id,
                        type: t.type,
                        href: this.getButtonUrl(t),
                        sort: t.sort,
                        classList: typeof t.classList !== "undefined" ? t.classList : null,
                        title: typeof t.title !== "undefined" ? t.title : null,
                        onclick: this.show.bind(this, t),
                        bgColor: t.useColors ? l.config.bgColor : null,
                        iconColor: t.useColors ? l.config.iconColor : null,
                    });
                    this.loadScript(t);
                    t.isLoaded = true;
                    this.loadedCount++;
                },
                getButtonUrl: function (t) {
                    if (t.script || !t.show) {
                        return null;
                    }
                    if (i.isString(t.show) || !t.show.url) {
                        return null;
                    }
                    var n = null;
                    if (e.isMobile() && t.show.url.mobile) {
                        n = t.show.url.mobile;
                    } else if (!e.isMobile() && t.show.url.desktop) {
                        n = t.show.url.desktop;
                    } else if (i.isString(t.show.url)) {
                        n = t.show.url;
                    }
                    return n;
                },
                loadScript: function (t) {
                    if (!t.script) {
                        return;
                    }
                    var e = "";
                    var i = false;
                    var n = t.script.match(/<script\b[^>]*>(.*?)<\/script>/i);
                    if (n && n[1]) {
                        e = n[1];
                        i = true;
                    } else if (!t.freeze) {
                        t.node = c.getNodeFromText(t.script);
                        if (!t.node) {
                            return;
                        }
                        i = false;
                        if (typeof t.caption !== "undefined") {
                            var o = t.node.querySelector("[data-bx-crm-widget-caption]");
                            if (o) {
                                o.innerText = t.caption;
                            }
                        }
                    } else {
                        e = t.script;
                        i = true;
                    }
                    if (i) {
                        t.node = document.createElement("script");
                        try {
                            t.node.appendChild(document.createTextNode(e));
                        } catch (i) {
                            t.node.text = e;
                        }
                        document.head.appendChild(t.node);
                    } else {
                        document.body.insertBefore(t.node, document.body.firstChild);
                    }
                },
            };
            var a = {
                isInit: false,
                wasOnceShown: false,
                condition: null,
                cookieName: "b24_sitebutton_hello",
                init: function (t) {
                    if (this.isInit) {
                        return;
                    }
                    this.context = t.context;
                    this.showClassName = "b24-widget-button-popup-show";
                    this.config = l.config.hello || {};
                    this.delay = this.config.delay;
                    this.buttonHideNode = this.context.querySelector("[data-b24-hello-btn-hide]");
                    this.iconNode = this.context.querySelector("[data-b24-hello-icon]");
                    this.nameNode = this.context.querySelector("[data-b24-hello-name]");
                    this.textNode = this.context.querySelector("[data-b24-hello-text]");
                    this.initHandlers();
                    this.isInit = true;
                    if (webPacker.cookie.get(this.cookieName) === "y") {
                        return;
                    }
                    if (!this.config || !this.config.conditions || this.config.conditions.length === 0) {
                        return;
                    }
                    if (!this.condition) {
                        this.setConditions(this.config.conditions, true);
                    }
                    l.addEventHandler("first-show", this.initCondition.bind(this));
                },
                setConditions: function (t, e) {
                    this.condition = this.findCondition(t);
                    if (!e) {
                        this.initCondition();
                    }
                },
                initCondition: function () {
                    if (!this.condition) {
                        return;
                    }
                    if (!this.isInit) {
                        return;
                    }
                    if (this.condition.icon) {
                        this.iconNode.style["background-image"] = "url(" + this.condition.icon + ")";
                    }
                    if (this.condition.name) {
                        this.nameNode.innerText = this.condition.name;
                    }
                    if (this.condition.text) {
                        this.textNode.innerText = this.condition.text;
                    }
                    if (this.condition.delay) {
                        this.delay = this.condition.delay;
                    }
                    this.planShowing();
                },
                initHandlers: function () {
                    webPacker.addEventListener(
                        this.buttonHideNode,
                        "click",
                        function (t) {
                            this.hide();
                            if (!t) t = window.event;
                            if (t.stopPropagation) {
                                t.preventDefault();
                                t.stopPropagation();
                            } else {
                                t.cancelBubble = true;
                                t.returnValue = false;
                            }
                        }.bind(this)
                    );
                    webPacker.addEventListener(this.context, "click", this.showWidget.bind(this));
                },
                planShowing: function () {
                    if (this.wasOnceShown || o.wasOnceClick) {
                        return;
                    }
                    setTimeout(this.show.bind(this), (this.delay || 10) * 1e3);
                },
                findCondition: function (t) {
                    if (!t) {
                        return;
                    }
                    var e;
                    e = t.filter(function (t) {
                        if (!t.pages || t.pages.MODE === "EXCLUDE" || t.pages.LIST.length === 0) {
                            return false;
                        }
                        return c.isCurPageInList(t.pages.LIST);
                    }, this);
                    if (e.length > 0) {
                        return e[0];
                    }
                    e = t.filter(function (t) {
                        if (!t.pages || t.pages.MODE === "INCLUDE") {
                            return false;
                        }
                        return !c.isCurPageInList(t.pages.LIST);
                    }, this);
                    if (e.length > 0) {
                        return e[0];
                    }
                    e = t.filter(function (t) {
                        return !t.pages;
                    }, this);
                    if (e.length > 0) {
                        return e[0];
                    }
                    return null;
                },
                showWidget: function () {
                    this.hide();
                    var t = null;
                    if (this.condition && this.condition.showWidgetId) {
                        t = r.getById(this.condition.showWidgetId);
                    }
                    if (!t) {
                        t = r.getById(this.config.showWidgetId);
                    }
                    if (!t) {
                        var e = r.getList();
                        if (e.length > 0) {
                            t = e[0];
                        }
                    }
                    if (t) {
                        r.show(t);
                    }
                },
                showImmediately: function (t) {
                    t = t || null;
                    if (t) {
                        this.setConditions([{ icon: t.icon, name: t.name, text: t.text, page: "", delay: 0 }]);
                    }
                    this.show(true);
                },
                show: function (e) {
                    if (!this.condition) {
                        return;
                    }
                    e = e || false;
                    if (!e && o.isShown) {
                        this.planShowing();
                        return;
                    }
                    this.wasOnceShown = true;
                    t.add(this.context, this.showClassName);
                },
                hide: function () {
                    t.remove(this.context, this.showClassName);
                    webPacker.cookie.set(this.cookieName, "y", 60 * 60 * 6);
                },
            };
            var c = {
                getNodeFromText: function (t) {
                    var e = document.createElement("div");
                    e.innerHTML = t;
                    return e.children[0];
                },
                evalGlobal: function (t) {
                    webPacker.resource.loadJs(t, false, true);
                },
                isCurPageInList: function (t) {
                    var e = t.filter(function (t) {
                        t = encodeURI(t);
                        var e = this.prepareUrl(t)
                            .split("*")
                            .map(function (t) {
                                return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                            })
                            .join(".*");
                        e = "^" + e + "$";
                        return new RegExp(e).test(this.prepareUrl(window.location.href));
                    }, this);
                    return e.length > 0;
                },
                prepareUrl: function (t) {
                    var e;
                    if (t.substring(0, 5) === "http:") {
                        e = t.substring(7);
                    } else if (t.substring(0, 6) === "https:") {
                        e = t.substring(8);
                    } else {
                        e = t;
                    }
                    return e;
                },
            };
            var h = {
                scrollPos: 0,
                saveScrollPos: function () {
                    this.scrollPos = window.pageYOffset;
                },
                restoreScrollPos: function () {
                    if (!e.isMobile()) {
                        return;
                    }
                    window.scrollTo(0, this.scrollPos);
                },
            };
            var l = (window.BX.SiteButton = {
                buttons: o,
                animation: s,
                shadow: n,
                wm: r,
                hello: a,
                util: c,
                classes: t,
                hacks: h,
                isShown: false,
                init: function (t) {
                    this.b24Tracker = window.b24Tracker || {};
                    this.userParams = window.Bitrix24WidgetObject || {};
                    this.config = t;
                    this.handlers = this.userParams.handlers || {};
                    this.eventHandlers = [];
                    this.execEventHandler("init", [this]);
                    if (!this.check()) {
                        return;
                    }
                    this.load();
                    if (this.config.delay) {
                        window.setTimeout(this.show.bind(this), 1e3 * this.config.delay);
                    } else {
                        this.show();
                    }
                },
                check: function () {
                    if (!this.config.isActivated) {
                        return false;
                    }
                    if (this.config.widgets.length === 0) {
                        return false;
                    }
                    if (this.config.disableOnMobile && e.isMobile()) {
                        return false;
                    }
                    return r.checkAll();
                },
                loadResources: function () {},
                load: function () {
                    this.execEventHandler("load", [this]);
                    e.isIOS() ? t.add(document.documentElement, "bx-ios") : null;
                    e.isMobile() ? t.add(document.documentElement, "bx-touch") : null;
                    this.loadResources();
                    this.container = document.body.querySelector("[data-b24-crm-button-cont]");
                    this.context = this.container.parentNode;
                    this.shadow.init({ shadowNode: this.context.querySelector("[data-b24-crm-button-shadow]") });
                    this.buttons.init({
                        container: this.container.querySelector("[data-b24-crm-button-block]"),
                        blankButtonNode: this.context.querySelector("[data-b24-crm-button-widget-blank]"),
                        openerButtonNode: this.context.querySelector("[data-b24-crm-button-block-button]"),
                    });
                    this.hello.init({ context: this.container.querySelector("[data-b24-crm-hello-cont]") });
                    this.wm.loadAll();
                    this.execEventHandler("loaded", [this]);
                },
                show: function () {
                    t.remove(this.container, "b24-widget-button-disable");
                    t.add(this.container, "b24-widget-button-visible");
                    this.execEventHandler("show", [this]);
                    if (!this.isShown) {
                        this.execEventHandler("first-show", [this]);
                    }
                    this.isShown = true;
                },
                hide: function () {
                    t.add(this.container, "b24-widget-button-disable");
                    this.execEventHandler("hide", [this]);
                },
                freeze: function (t) {
                    setTimeout(
                        function () {
                            o.freeze(t);
                            this.show();
                        }.bind(this)
                    );
                },
                addEventHandler: function (t, e) {
                    if (!t || !e) {
                        return;
                    }
                    this.eventHandlers.push({ eventName: t, handler: e });
                },
                execEventHandler: function (t, e) {
                    e = e || [];
                    if (!t) {
                        return;
                    }
                    this.eventHandlers.forEach(function (i) {
                        if (i.eventName === t) {
                            i.handler.apply(this, e);
                        }
                    }, this);
                    if (this.handlers[t]) {
                        this.handlers[t].apply(this, e);
                    }
                    var i = "b24-sitebutton-" + t;
                    if (window.BX.onCustomEvent) {
                        window.BX.onCustomEvent(document, i, e);
                    }
                    if (window.jQuery && typeof window.jQuery === "function") {
                        var n = window.jQuery(document);
                        if (n && n.trigger) n.trigger(i, e);
                    }
                },
                onWidgetFormInit: function (t) {
                    this.execEventHandler("form-init", [t]);
                },
                onWidgetClose: function () {
                    o.unfreeze();
                    this.show();
                },
                getTrace: function (t) {
                    if (!this.b24Tracker.guest) {
                        return null;
                    }
                    t = t || {};
                    t.channels = t.channels || [];
                    t.channels = [this.config.tracking.channel].concat(t.channels);
                    return this.b24Tracker.guest.getTrace(t);
                },
            });
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/crm/site/button/script.map.js

        window.BX.SiteButton.init({
            isActivated: true,
            id: null,
            tracking: { channel: { code: "button", value: 1 } },
            disableOnMobile: false,
            location: 4,
            delay: 0,
            bgColor: "#00AEEF",
            iconColor: "#FFFFFF",
            widgets: [
                
                {
                    id: "crmform",
                    title: "Feedback",
                    script:
                        ";(function () {\n;(function () {\n(function(){if(!window.b24form){window.b24form=function(e){b24form.forms=b24form.forms||[];b24form.forms.push(e);if(e.ref\u0026\u0026b24form.Loader\u0026\u0026!this.loaded){this.loaded=true;b24form.Loader.loadJs(e.ref,true)}}}if(window.b24form.Loader){return}function e(){this.requested=false;this.queue=[]}e.prototype={run:function(e){e=e||{};var o=e.resources||{};this.queue.push(e.form);if(!this.requested){var t=this.loadApp.bind(this,o.app);this.requested=true;if(o.polyfill\u0026\u0026!this.checkPolyfills()){this.loadJs(o.polyfill,true,t)}else{t()}}this.loadForms()},loadApp:function(e){if(!e){return}window.b24form.App?this.loadForms():this.loadJs(e,true,this.loadForms.bind(this))},loadForms:function(){if(!this.checkPolyfills()){return}if(!window.b24form.App){return}var e=this.queue;this.queue=[];e.forEach(this.loadForm,this)},loadForm:function(e){b24form.App.initFormScript24(e)},checkBabelHelpers:function(){return window.babelHelpers},checkPolyfills:function(){return window.fetch\u0026\u0026window.Request\u0026\u0026window.Response\u0026\u0026window.Promise\u0026\u0026Object.assign\u0026\u0026Array.prototype.find\u0026\u0026Array.prototype.includes},loadJs:function(e,o,t){var i=document.createElement(\u0022SCRIPT\u0022);i.setAttribute(\u0022type\u0022,\u0022text/javascript\u0022);i.setAttribute(\u0022async\u0022,\u0022\u0022);if(o){i.setAttribute(\u0022src\u0022,e+\u0022?\u0022+(Date.now()/864e5|0));if(t){i.onload=t}this.appendToHead(i)}else{i.appendChild(document.createTextNode(e));this.appendToHead(i)}},appendToHead:function(e){(document.getElementsByTagName(\u0022head\u0022)[0]||document.documentElement).appendChild(e)}};window.b24form.Loader=new e})();\n//# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/crm/site/form/embed/unit/script.map.js\n\nwindow.b24form.Loader.run({\u0022form\u0022:{\u0022usedBySiteButton\u0022:true,\u0022lang\u0022:\u0022en\u0022,\u0022id\u0022:\u00223\u0022,\u0022sec\u0022:\u0022ki4g26\u0022,\u0022address\u0022:\u0022https:\\/\\/b24-p9cw17.bitrix24.com\u0022,\u0022views\u0022:{\u0022click\u0022:{\u0022type\u0022:\u0022panel\u0022,\u0022position\u0022:\u0022right\u0022,\u0022vertical\u0022:\u0022bottom\u0022},\u0022auto\u0022:{\u0022type\u0022:\u0022popup\u0022,\u0022position\u0022:\u0022center\u0022,\u0022vertical\u0022:\u0022bottom\u0022,\u0022delay\u0022:5}},\u0022data\u0022:{\u0022id\u0022:\u0022b24-site-button-form-3\u0022,\u0022visible\u0022:false,\u0022useSign\u0022:true,\u0022language\u0022:\u0022en\u0022,\u0022design\u0022:{\u0022shadow\u0022:true,\u0022border\u0022:{\u0022bottom\u0022:true},\u0022color\u0022:{\u0022primary\u0022:\u0022#0F58D0\u0022,\u0022primaryText\u0022:\u0022#FFFFFF\u0022,\u0022text\u0022:\u0022#000000\u0022,\u0022background\u0022:\u0022#FFFFFF\u0022,\u0022fieldBorder\u0022:\u0022#00000019\u0022,\u0022fieldBackground\u0022:\u0022#00000014\u0022,\u0022fieldFocusBackground\u0022:\u0022#ffffffff\u0022}},\u0022title\u0022:\u0022Feedback\u0022,\u0022desc\u0022:\u0022Please share your feedback in the comment field\u0022,\u0022buttonCaption\u0022:\u0022Send\u0022,\u0022date\u0022:{\u0022dateFormat\u0022:\u0022MM\\/DD\\/YYYY\u0022,\u0022dateTimeFormat\u0022:\u0022MM\\/DD\\/YYYY H:MI:SS T\u0022,\u0022sundayFirstly\u0022:true},\u0022currency\u0022:{\u0022code\u0022:\u0022USD\u0022,\u0022title\u0022:\u0022US Dollar\u0022,\u0022format\u0022:\u0022$#\u0022},\u0022fields\u0022:[{\u0022id\u0022:\u0022CONTACT_NAME\u0022,\u0022name\u0022:\u0022CONTACT_NAME\u0022,\u0022label\u0022:\u0022First Name\u0022,\u0022visible\u0022:true,\u0022required\u0022:false,\u0022multiple\u0022:false,\u0022type\u0022:\u0022name\u0022,\u0022placeholder\u0022:\u0022\u0022,\u0022value\u0022:null,\u0022items\u0022:[],\u0022bigPic\u0022:false},{\u0022id\u0022:\u0022CONTACT_LAST_NAME\u0022,\u0022name\u0022:\u0022CONTACT_LAST_NAME\u0022,\u0022label\u0022:\u0022Last Name\u0022,\u0022visible\u0022:true,\u0022required\u0022:false,\u0022multiple\u0022:false,\u0022type\u0022:\u0022last-name\u0022,\u0022placeholder\u0022:\u0022\u0022,\u0022value\u0022:null,\u0022items\u0022:[],\u0022bigPic\u0022:false},{\u0022id\u0022:\u0022CONTACT_PHONE\u0022,\u0022name\u0022:\u0022CONTACT_PHONE\u0022,\u0022label\u0022:\u0022Phone\u0022,\u0022visible\u0022:true,\u0022required\u0022:false,\u0022multiple\u0022:false,\u0022type\u0022:\u0022phone\u0022,\u0022placeholder\u0022:\u0022\u0022,\u0022value\u0022:null,\u0022items\u0022:[],\u0022bigPic\u0022:false},{\u0022id\u0022:\u0022CONTACT_EMAIL\u0022,\u0022name\u0022:\u0022CONTACT_EMAIL\u0022,\u0022label\u0022:\u0022E-mail\u0022,\u0022visible\u0022:true,\u0022required\u0022:false,\u0022multiple\u0022:false,\u0022type\u0022:\u0022email\u0022,\u0022placeholder\u0022:\u0022\u0022,\u0022value\u0022:null,\u0022items\u0022:[],\u0022bigPic\u0022:false},{\u0022id\u0022:\u0022DEAL_COMMENTS\u0022,\u0022name\u0022:\u0022DEAL_COMMENTS\u0022,\u0022label\u0022:\u0022Comment\u0022,\u0022visible\u0022:true,\u0022required\u0022:false,\u0022multiple\u0022:false,\u0022type\u0022:\u0022text\u0022,\u0022placeholder\u0022:\u0022\u0022,\u0022value\u0022:null,\u0022items\u0022:[],\u0022bigPic\u0022:false}],\u0022agreements\u0022:[],\u0022dependencies\u0022:[],\u0022recaptcha\u0022:{\u0022use\u0022:false}}},\u0022resources\u0022:{\u0022app\u0022:\u0022cdn.bitrix24.com\\/b16992023\\/crm\\/form\\/app.js\u0022,\u0022polyfill\u0022:\u0022cdn.bitrix24.com\\/b16992023\\/crm\\/form\\/polyfill.js\u0022}});\n})();\n\n\n})();",
                    freeze: true,
                    sort: 300,
                    useColors: true,
                    classList: ["b24-widget-button-crmform"],
                    show: "b24form.App.get(\u0027b24-site-button-form-3\u0027).show();",
                    hide: "b24form.App.get(\u0027b24-site-button-form-3\u0027).hide();",
                    type: "crmform",
                    pages: { mode: "EXCLUDE", list: [] },
                    workTime: null,
                },
            ],
            
        });
    })();
})();
