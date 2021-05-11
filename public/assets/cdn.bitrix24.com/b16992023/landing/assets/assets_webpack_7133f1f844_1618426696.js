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
        var module = new webPacker.module("assets_webpack");
        module.loadResources([
            {
                type: "css",
                path: "https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/css/custom.css?1573832753.1561",
                content:
                    ".custom-text-shadow-1{text-shadow:2px 4px 3px rgba(0,0,0,.3)}.custom-text-shadow-2{text-shadow:2px 2px 3px rgba(255,255,255,.1)}.custom-text-shadow-3{text-shadow:6px 6px 0 rgba(0,0,0,.2)}.custom-text-shadow-4{text-shadow:4px 3px 0 #fff,9px 8px 0 rgba(0,0,0,.15)}.custom-text-shadow-5{text-shadow:0 3px 0 #b2a98f,0 14px 10px rgba(0,0,0,.15),0 24px 2px rgba(0,0,0,.1),0 34px 30px rgba(0,0,0,.1)}.custom-text-shadow-6{text-shadow:0 4px 3px rgba(0,0,0,.4),0 8px 13px rgba(0,0,0,.1),0 18px 23px rgba(0,0,0,.1)}.custom-text-shadow-7{text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15)}.custom-text-shadow-8{text-shadow:rgba(255,255,255,.5) 0 3px 3px}.custom-text-shadow-9{text-shadow:0 0 6px rgba(255,255,255,.7)}.custom-text-shadow-10{text-shadow:0 15px 5px rgba(0,0,0,.1),10px 20px 5px rgba(0,0,0,.05),-10px 20px 5px rgba(0,0,0,.05)}.custom-text-shadow-11{text-shadow:2px 8px 6px rgba(0,0,0,.2),0 -5px 35px rgba(255,255,255,.3)}[style*=\u0022line-through\u0022]{text-decoration:line-through}.gm-style .gm-style-iw{font-weight:normal}.landing-public-mode [data-pseudo-url*=\u0022\\\u0022enabled\\\u0022:true}\u0022]{cursor:pointer}",
                cache: true,
            },
            {
                type: "css",
                path: "https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/css/themes_custom.css?1608555882.11076",
                content:
                    "@media all and (max-width:9999px){font[color=\u0022#f5f5f5\u0022],font[color=\u0022#f5f5f5\u0022] *{color:#f5f5f5 !important}font[color=\u0022#cfd8dc\u0022],font[color=\u0022#cfd8dc\u0022] *{color:#cfd8dc !important}font[color=\u0022#d7ccc8\u0022],font[color=\u0022#d7ccc8\u0022] *{color:#d7ccc8 !important}font[color=\u0022#ffccbc\u0022],font[color=\u0022#ffccbc\u0022] *{color:#ffccbc !important}font[color=\u0022#ffe0b2\u0022],font[color=\u0022#ffe0b2\u0022] *{color:#ffe0b2 !important}font[color=\u0022#ffecb3\u0022],font[color=\u0022#ffecb3\u0022] *{color:#ffecb3 !important}font[color=\u0022#fff9c4\u0022],font[color=\u0022#fff9c4\u0022] *{color:#fff9c4 !important}font[color=\u0022#f0f4c3\u0022],font[color=\u0022#f0f4c3\u0022] *{color:#f0f4c3 !important}font[color=\u0022#dcedc8\u0022],font[color=\u0022#dcedc8\u0022] *{color:#dcedc8 !important}font[color=\u0022#c8e6c9\u0022],font[color=\u0022#c8e6c9\u0022] *{color:#c8e6c9 !important}font[color=\u0022#b2dfdb\u0022],font[color=\u0022#b2dfdb\u0022] *{color:#b2dfdb !important}font[color=\u0022#b2ebf2\u0022],font[color=\u0022#b2ebf2\u0022] *{color:#b2ebf2 !important}font[color=\u0022#b3e5fc\u0022],font[color=\u0022#b3e5fc\u0022] *{color:#b3e5fc !important}font[color=\u0022#bbdefb\u0022],font[color=\u0022#bbdefb\u0022] *{color:#bbdefb !important}font[color=\u0022#c5cae9\u0022],font[color=\u0022#c5cae9\u0022] *{color:#c5cae9 !important}font[color=\u0022#d1c4e9\u0022],font[color=\u0022#d1c4e9\u0022] *{color:#d1c4e9 !important}font[color=\u0022#e1bee7\u0022],font[color=\u0022#e1bee7\u0022] *{color:#e1bee7 !important}font[color=\u0022#f8bbd0\u0022],font[color=\u0022#f8bbd0\u0022] *{color:#f8bbd0 !important}font[color=\u0022#ffcdd2\u0022],font[color=\u0022#ffcdd2\u0022] *{color:#ffcdd2 !important}font[color=\u0022#eeeeee\u0022],font[color=\u0022#eeeeee\u0022] *{color:#eee !important}font[color=\u0022#b0bec5\u0022],font[color=\u0022#b0bec5\u0022] *{color:#b0bec5 !important}font[color=\u0022#bcaaa4\u0022],font[color=\u0022#bcaaa4\u0022] *{color:#bcaaa4 !important}font[color=\u0022#ffab91\u0022],font[color=\u0022#ffab91\u0022] *{color:#ffab91 !important}font[color=\u0022#ffcc80\u0022],font[color=\u0022#ffcc80\u0022] *{color:#ffcc80 !important}font[color=\u0022#ffe082\u0022],font[color=\u0022#ffe082\u0022] *{color:#ffe082 !important}font[color=\u0022#fff59d\u0022],font[color=\u0022#fff59d\u0022] *{color:#fff59d !important}font[color=\u0022#e6ee9c\u0022],font[color=\u0022#e6ee9c\u0022] *{color:#e6ee9c !important}font[color=\u0022#c5e1a5\u0022],font[color=\u0022#c5e1a5\u0022] *{color:#c5e1a5 !important}font[color=\u0022#a5d6a7\u0022],font[color=\u0022#a5d6a7\u0022] *{color:#a5d6a7 !important}font[color=\u0022#80cbc4\u0022],font[color=\u0022#80cbc4\u0022] *{color:#80cbc4 !important}font[color=\u0022#80deea\u0022],font[color=\u0022#80deea\u0022] *{color:#80deea !important}font[color=\u0022#81d4fa\u0022],font[color=\u0022#81d4fa\u0022] *{color:#81d4fa !important}font[color=\u0022#90caf9\u0022],font[color=\u0022#90caf9\u0022] *{color:#90caf9 !important}font[color=\u0022#9fa8da\u0022],font[color=\u0022#9fa8da\u0022] *{color:#9fa8da !important}font[color=\u0022#b39ddb\u0022],font[color=\u0022#b39ddb\u0022] *{color:#b39ddb !important}font[color=\u0022#ce93d8\u0022],font[color=\u0022#ce93d8\u0022] *{color:#ce93d8 !important}font[color=\u0022#f48fb1\u0022],font[color=\u0022#f48fb1\u0022] *{color:#f48fb1 !important}font[color=\u0022#ef9a9a\u0022],font[color=\u0022#ef9a9a\u0022] *{color:#ef9a9a !important}font[color=\u0022#e0e0e0\u0022],font[color=\u0022#e0e0e0\u0022] *{color:#e0e0e0 !important}font[color=\u0022#90a4ae\u0022],font[color=\u0022#90a4ae\u0022] *{color:#90a4ae !important}font[color=\u0022#a1887f\u0022],font[color=\u0022#a1887f\u0022] *{color:#a1887f !important}font[color=\u0022#ff8a65\u0022],font[color=\u0022#ff8a65\u0022] *{color:#ff8a65 !important}font[color=\u0022#ffb74d\u0022],font[color=\u0022#ffb74d\u0022] *{color:#ffb74d !important}font[color=\u0022#ffd54f\u0022],font[color=\u0022#ffd54f\u0022] *{color:#ffd54f !important}font[color=\u0022#fff176\u0022],font[color=\u0022#fff176\u0022] *{color:#fff176 !important}font[color=\u0022#dce775\u0022],font[color=\u0022#dce775\u0022] *{color:#dce775 !important}font[color=\u0022#aed581\u0022],font[color=\u0022#aed581\u0022] *{color:#aed581 !important}font[color=\u0022#81c784\u0022],font[color=\u0022#81c784\u0022] *{color:#81c784 !important}font[color=\u0022#4db6ac\u0022],font[color=\u0022#4db6ac\u0022] *{color:#4db6ac !important}font[color=\u0022#4dd0e1\u0022],font[color=\u0022#4dd0e1\u0022] *{color:#4dd0e1 !important}font[color=\u0022#4fc3f7\u0022],font[color=\u0022#4fc3f7\u0022] *{color:#4fc3f7 !important}font[color=\u0022#64b5f6\u0022],font[color=\u0022#64b5f6\u0022] *{color:#64b5f6 !important}font[color=\u0022#7986cb\u0022],font[color=\u0022#7986cb\u0022] *{color:#7986cb !important}font[color=\u0022#9575cd\u0022],font[color=\u0022#9575cd\u0022] *{color:#9575cd !important}font[color=\u0022#ba68c8\u0022],font[color=\u0022#ba68c8\u0022] *{color:#ba68c8 !important}font[color=\u0022#f06292\u0022],font[color=\u0022#f06292\u0022] *{color:#f06292 !important}font[color=\u0022#e57373\u0022],font[color=\u0022#e57373\u0022] *{color:#e57373 !important}font[color=\u0022#9e9e9e\u0022],font[color=\u0022#9e9e9e\u0022] *{color:#9e9e9e !important}font[color=\u0022#607d8b\u0022],font[color=\u0022#607d8b\u0022] *{color:#607d8b !important}font[color=\u0022#795548\u0022],font[color=\u0022#795548\u0022] *{color:#795548 !important}font[color=\u0022#ff5722\u0022],font[color=\u0022#ff5722\u0022] *{color:#ff5722 !important}font[color=\u0022#ff9800\u0022],font[color=\u0022#ff9800\u0022] *{color:#ff9800 !important}font[color=\u0022#ffc107\u0022],font[color=\u0022#ffc107\u0022] *{color:#ffc107 !important}font[color=\u0022#ffeb3b\u0022],font[color=\u0022#ffeb3b\u0022] *{color:#ffeb3b !important}font[color=\u0022#cddc39\u0022],font[color=\u0022#cddc39\u0022] *{color:#cddc39 !important}font[color=\u0022#8bc34a\u0022],font[color=\u0022#8bc34a\u0022] *{color:#8bc34a !important}font[color=\u0022#4caf50\u0022],font[color=\u0022#4caf50\u0022] *{color:#4caf50 !important}font[color=\u0022#009688\u0022],font[color=\u0022#009688\u0022] *{color:#009688 !important}font[color=\u0022#00bcd4\u0022],font[color=\u0022#00bcd4\u0022] *{color:#00bcd4 !important}font[color=\u0022#03a9f4\u0022],font[color=\u0022#03a9f4\u0022] *{color:#03a9f4 !important}font[color=\u0022#2196f3\u0022],font[color=\u0022#2196f3\u0022] *{color:#2196f3 !important}font[color=\u0022#3f51b5\u0022],font[color=\u0022#3f51b5\u0022] *{color:#3f51b5 !important}font[color=\u0022#673ab7\u0022],font[color=\u0022#673ab7\u0022] *{color:#673ab7 !important}font[color=\u0022#9c27b0\u0022],font[color=\u0022#9c27b0\u0022] *{color:#9c27b0 !important}font[color=\u0022#e91e63\u0022],font[color=\u0022#e91e63\u0022] *{color:#e91e63 !important}font[color=\u0022#f44336\u0022],font[color=\u0022#f44336\u0022] *{color:#f44336 !important}font[color=\u0022#757575\u0022],font[color=\u0022#757575\u0022] *{color:#757575 !important}font[color=\u0022#546e7a\u0022],font[color=\u0022#546e7a\u0022] *{color:#546e7a !important}font[color=\u0022#6d4c41\u0022],font[color=\u0022#6d4c41\u0022] *{color:#6d4c41 !important}font[color=\u0022#f4511e\u0022],font[color=\u0022#f4511e\u0022] *{color:#f4511e !important}font[color=\u0022#fb8c00\u0022],font[color=\u0022#fb8c00\u0022] *{color:#fb8c00 !important}font[color=\u0022#ffb300\u0022],font[color=\u0022#ffb300\u0022] *{color:#ffb300 !important}font[color=\u0022#fdd835\u0022],font[color=\u0022#fdd835\u0022] *{color:#fdd835 !important}font[color=\u0022#c0ca33\u0022],font[color=\u0022#c0ca33\u0022] *{color:#c0ca33 !important}font[color=\u0022#7cb342\u0022],font[color=\u0022#7cb342\u0022] *{color:#7cb342 !important}font[color=\u0022#43a047\u0022],font[color=\u0022#43a047\u0022] *{color:#43a047 !important}font[color=\u0022#00897b\u0022],font[color=\u0022#00897b\u0022] *{color:#00897b !important}font[color=\u0022#00acc1\u0022],font[color=\u0022#00acc1\u0022] *{color:#00acc1 !important}font[color=\u0022#039be5\u0022],font[color=\u0022#039be5\u0022] *{color:#039be5 !important}font[color=\u0022#1e88e5\u0022],font[color=\u0022#1e88e5\u0022] *{color:#1e88e5 !important}font[color=\u0022#3949ab\u0022],font[color=\u0022#3949ab\u0022] *{color:#3949ab !important}font[color=\u0022#5e35b1\u0022],font[color=\u0022#5e35b1\u0022] *{color:#5e35b1 !important}font[color=\u0022#8e24aa\u0022],font[color=\u0022#8e24aa\u0022] *{color:#8e24aa !important}font[color=\u0022#d81b60\u0022],font[color=\u0022#d81b60\u0022] *{color:#d81b60 !important}font[color=\u0022#e53935\u0022],font[color=\u0022#e53935\u0022] *{color:#e53935 !important}font[color=\u0022#616161\u0022],font[color=\u0022#616161\u0022] *{color:#616161 !important}font[color=\u0022#455a64\u0022],font[color=\u0022#455a64\u0022] *{color:#455a64 !important}font[color=\u0022#5d4037\u0022],font[color=\u0022#5d4037\u0022] *{color:#5d4037 !important}font[color=\u0022#e64a19\u0022],font[color=\u0022#e64a19\u0022] *{color:#e64a19 !important}font[color=\u0022#f57c00\u0022],font[color=\u0022#f57c00\u0022] *{color:#f57c00 !important}font[color=\u0022#ffa000\u0022],font[color=\u0022#ffa000\u0022] *{color:#ffa000 !important}font[color=\u0022#fbc02d\u0022],font[color=\u0022#fbc02d\u0022] *{color:#fbc02d !important}font[color=\u0022#afb42b\u0022],font[color=\u0022#afb42b\u0022] *{color:#afb42b !important}font[color=\u0022#689f38\u0022],font[color=\u0022#689f38\u0022] *{color:#689f38 !important}font[color=\u0022#388e3c\u0022],font[color=\u0022#388e3c\u0022] *{color:#388e3c !important}font[color=\u0022#00796b\u0022],font[color=\u0022#00796b\u0022] *{color:#00796b !important}font[color=\u0022#0097a7\u0022],font[color=\u0022#0097a7\u0022] *{color:#0097a7 !important}font[color=\u0022#0288d1\u0022],font[color=\u0022#0288d1\u0022] *{color:#0288d1 !important}font[color=\u0022#1976d2\u0022],font[color=\u0022#1976d2\u0022] *{color:#1976d2 !important}font[color=\u0022#303f9f\u0022],font[color=\u0022#303f9f\u0022] *{color:#303f9f !important}font[color=\u0022#512da8\u0022],font[color=\u0022#512da8\u0022] *{color:#512da8 !important}font[color=\u0022#7b1fa2\u0022],font[color=\u0022#7b1fa2\u0022] *{color:#7b1fa2 !important}font[color=\u0022#c2185b\u0022],font[color=\u0022#c2185b\u0022] *{color:#c2185b !important}font[color=\u0022#d32f2f\u0022],font[color=\u0022#d32f2f\u0022] *{color:#d32f2f !important}font[color=\u0022#212121\u0022],font[color=\u0022#212121\u0022] *{color:#212121 !important}font[color=\u0022#263238\u0022],font[color=\u0022#263238\u0022] *{color:#263238 !important}font[color=\u0022#3e2723\u0022],font[color=\u0022#3e2723\u0022] *{color:#3e2723 !important}font[color=\u0022#bf360c\u0022],font[color=\u0022#bf360c\u0022] *{color:#bf360c !important}font[color=\u0022#e65100\u0022],font[color=\u0022#e65100\u0022] *{color:#e65100 !important}font[color=\u0022#ff6f00\u0022],font[color=\u0022#ff6f00\u0022] *{color:#ff6f00 !important}font[color=\u0022#f57f17\u0022],font[color=\u0022#f57f17\u0022] *{color:#f57f17 !important}font[color=\u0022#827717\u0022],font[color=\u0022#827717\u0022] *{color:#827717 !important}font[color=\u0022#33691e\u0022],font[color=\u0022#33691e\u0022] *{color:#33691e !important}font[color=\u0022#1b5e20\u0022],font[color=\u0022#1b5e20\u0022] *{color:#1b5e20 !important}font[color=\u0022#004d40\u0022],font[color=\u0022#004d40\u0022] *{color:#004d40 !important}font[color=\u0022#006064\u0022],font[color=\u0022#006064\u0022] *{color:#006064 !important}font[color=\u0022#01579b\u0022],font[color=\u0022#01579b\u0022] *{color:#01579b !important}font[color=\u0022#0d47a1\u0022],font[color=\u0022#0d47a1\u0022] *{color:#0d47a1 !important}font[color=\u0022#1a237e\u0022],font[color=\u0022#1a237e\u0022] *{color:#1a237e !important}font[color=\u0022#311b92\u0022],font[color=\u0022#311b92\u0022] *{color:#311b92 !important}font[color=\u0022#4a148c\u0022],font[color=\u0022#4a148c\u0022] *{color:#4a148c !important}font[color=\u0022#880e4f\u0022],font[color=\u0022#880e4f\u0022] *{color:#880e4f !important}font[color=\u0022#b71c1c\u0022],font[color=\u0022#b71c1c\u0022] *{color:#b71c1c !important}}",
                cache: true,
            },
            {
                type: "css",
                path: "https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/vendor/animate.css?1567508327.23848",
                content:
                    "@charset \u0022UTF-8\u0022;/*!\n * animate.css -http://daneden.me/animate\n * Version - 3.5.2\n * Licensed under the MIT license - http://opensource.org/licenses/MIT\n *\n * Copyright (c) 2017 Daniel Eden\n */.animated{animation-duration:1s;animation-fill-mode:both}.animated.infinite{animation-iteration-count:infinite}.animated.hinge{animation-duration:2s}.animated.flipOutX,.animated.flipOutY,.animated.bounceIn,.animated.bounceOut{animation-duration:.75s}@keyframes bounce{from,20%,53%,80%,to{animation-timing-function:cubic-bezier(0.215,0.610,0.355,1.000);transform:translate3d(0,0,0)}40%,43%{animation-timing-function:cubic-bezier(0.755,0.050,0.855,0.060);transform:translate3d(0,-30px,0)}70%{animation-timing-function:cubic-bezier(0.755,0.050,0.855,0.060);transform:translate3d(0,-15px,0)}90%{transform:translate3d(0,-4px,0)}}.bounce{animation-name:bounce;transform-origin:center bottom}@keyframes flash{from,50%,to{opacity:1}25%,75%{opacity:0}}.flash{animation-name:flash}@keyframes pulse{from{transform:scale3d(1,1,1)}50%{transform:scale3d(1.05,1.05,1.05)}to{transform:scale3d(1,1,1)}}.pulse{animation-name:pulse}@keyframes rubberBand{from{transform:scale3d(1,1,1)}30%{transform:scale3d(1.25,0.75,1)}40%{transform:scale3d(0.75,1.25,1)}50%{transform:scale3d(1.15,0.85,1)}65%{transform:scale3d(.95,1.05,1)}75%{transform:scale3d(1.05,.95,1)}to{transform:scale3d(1,1,1)}}.rubberBand{animation-name:rubberBand}@keyframes shake{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(-10px,0,0)}20%,40%,60%,80%{transform:translate3d(10px,0,0)}}.shake{animation-name:shake}@keyframes headShake{0%{transform:translateX(0)}6.5%{transform:translateX(-6px) rotateY(-9deg)}18.5%{transform:translateX(5px) rotateY(7deg)}31.5%{transform:translateX(-3px) rotateY(-5deg)}43.5%{transform:translateX(2px) rotateY(3deg)}50%{transform:translateX(0)}}.headShake{animation-timing-function:ease-in-out;animation-name:headShake}@keyframes swing{20%{transform:rotate3d(0,0,1,15deg)}40%{transform:rotate3d(0,0,1,-10deg)}60%{transform:rotate3d(0,0,1,5deg)}80%{transform:rotate3d(0,0,1,-5deg)}to{transform:rotate3d(0,0,1,0deg)}}.swing{transform-origin:top center;animation-name:swing}@keyframes tada{from{transform:scale3d(1,1,1)}10%,20%{transform:scale3d(.9,.9,.9) rotate3d(0,0,1,-3deg)}30%,50%,70%,90%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}40%,60%,80%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}to{transform:scale3d(1,1,1)}}.tada{animation-name:tada}@keyframes wobble{from{transform:none}15%{transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg)}30%{transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg)}45%{transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg)}60%{transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg)}75%{transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg)}to{transform:none}}.wobble{animation-name:wobble}@keyframes jello{from,11.1%,to{transform:none}22.2%{transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{transform:skewX(6.25deg) skewY(6.25deg)}44.4%{transform:skewX(-3.125deg) skewY(-3.125deg)}55.5%{transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{transform:skewX(-0.78125deg) skewY(-0.78125deg)}77.7%{transform:skewX(0.390625deg) skewY(0.390625deg)}88.8%{transform:skewX(-0.1953125deg) skewY(-0.1953125deg)}}.jello{animation-name:jello;transform-origin:center}@keyframes bounceIn{from,20%,40%,60%,80%,to{animation-timing-function:cubic-bezier(0.215,0.610,0.355,1.000)}0%{opacity:0;transform:scale3d(.3,.3,.3)}20%{transform:scale3d(1.1,1.1,1.1)}40%{transform:scale3d(.9,.9,.9)}60%{opacity:1;transform:scale3d(1.03,1.03,1.03)}80%{transform:scale3d(.97,.97,.97)}to{opacity:1;transform:scale3d(1,1,1)}}.bounceIn{animation-name:bounceIn}@keyframes bounceInDown{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.610,0.355,1.000)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}.bounceInDown{animation-name:bounceInDown}@keyframes bounceInLeft{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.610,0.355,1.000)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}.bounceInLeft{animation-name:bounceInLeft}@keyframes bounceInRight{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.610,0.355,1.000)}from{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}.bounceInRight{animation-name:bounceInRight}@keyframes bounceInUp{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.610,0.355,1.000)}from{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translate3d(0,0,0)}}.bounceInUp{animation-name:bounceInUp}@keyframes bounceOut{20%{transform:scale3d(.9,.9,.9)}50%,55%{opacity:1;transform:scale3d(1.1,1.1,1.1)}to{opacity:0;transform:scale3d(.3,.3,.3)}}.bounceOut{animation-name:bounceOut}@keyframes bounceOutDown{20%{transform:translate3d(0,10px,0)}40%,45%{opacity:1;transform:translate3d(0,-20px,0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.bounceOutDown{animation-name:bounceOutDown}@keyframes bounceOutLeft{20%{opacity:1;transform:translate3d(20px,0,0)}to{opacity:0;transform:translate3d(-2000px,0,0)}}.bounceOutLeft{animation-name:bounceOutLeft}@keyframes bounceOutRight{20%{opacity:1;transform:translate3d(-20px,0,0)}to{opacity:0;transform:translate3d(2000px,0,0)}}.bounceOutRight{animation-name:bounceOutRight}@keyframes bounceOutUp{20%{transform:translate3d(0,-10px,0)}40%,45%{opacity:1;transform:translate3d(0,20px,0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}.bounceOutUp{animation-name:bounceOutUp}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.fadeIn{animation-name:fadeIn}@keyframes fadeInDown{from{opacity:0;transform:translate3d(0,-100%,0)}to{opacity:1;transform:none}}.fadeInDown{animation-name:fadeInDown}@keyframes fadeInDownBig{from{opacity:0;transform:translate3d(0,-2000px,0)}to{opacity:1;transform:none}}.fadeInDownBig{animation-name:fadeInDownBig}@keyframes fadeInLeft{from{opacity:0;transform:translate3d(-100%,0,0)}to{opacity:1;transform:none}}.fadeInLeft{animation-name:fadeInLeft}@keyframes fadeInLeftBig{from{opacity:0;transform:translate3d(-2000px,0,0)}to{opacity:1;transform:none}}.fadeInLeftBig{animation-name:fadeInLeftBig}@keyframes fadeInRight{from{opacity:0;transform:translate3d(100%,0,0)}to{opacity:1;transform:none}}.fadeInRight{animation-name:fadeInRight}@keyframes fadeInRightBig{from{opacity:0;transform:translate3d(2000px,0,0)}to{opacity:1;transform:none}}.fadeInRightBig{animation-name:fadeInRightBig}@keyframes fadeInUp{from{opacity:0;transform:translate3d(0,100%,0)}to{opacity:1;transform:none}}.fadeInUp{animation-name:fadeInUp}@keyframes fadeInUpBig{from{opacity:0;transform:translate3d(0,2000px,0)}to{opacity:1;transform:none}}.fadeInUpBig{animation-name:fadeInUpBig}@keyframes fadeOut{from{opacity:1}to{opacity:0}}.fadeOut{animation-name:fadeOut}@keyframes fadeOutDown{from{opacity:1}to{opacity:0;transform:translate3d(0,100%,0)}}.fadeOutDown{animation-name:fadeOutDown}@keyframes fadeOutDownBig{from{opacity:1}to{opacity:0;transform:translate3d(0,2000px,0)}}.fadeOutDownBig{animation-name:fadeOutDownBig}@keyframes fadeOutLeft{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0)}}.fadeOutLeft{animation-name:fadeOutLeft}@keyframes fadeOutLeftBig{from{opacity:1}to{opacity:0;transform:translate3d(-2000px,0,0)}}.fadeOutLeftBig{animation-name:fadeOutLeftBig}@keyframes fadeOutRight{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0)}}.fadeOutRight{animation-name:fadeOutRight}@keyframes fadeOutRightBig{from{opacity:1}to{opacity:0;transform:translate3d(2000px,0,0)}}.fadeOutRightBig{animation-name:fadeOutRightBig}@keyframes fadeOutUp{from{opacity:1}to{opacity:0;transform:translate3d(0,-100%,0)}}.fadeOutUp{animation-name:fadeOutUp}@keyframes fadeOutUpBig{from{opacity:1}to{opacity:0;transform:translate3d(0,-2000px,0)}}.fadeOutUpBig{animation-name:fadeOutUpBig}@keyframes flip{from{transform:perspective(400px) rotate3d(0,1,0,-360deg);animation-timing-function:ease-out}40%{transform:perspective(400px) translate3d(0,0,150px) rotate3d(0,1,0,-190deg);animation-timing-function:ease-out}50%{transform:perspective(400px) translate3d(0,0,150px) rotate3d(0,1,0,-170deg);animation-timing-function:ease-in}80%{transform:perspective(400px) scale3d(.95,.95,.95);animation-timing-function:ease-in}to{transform:perspective(400px);animation-timing-function:ease-in}}.animated.flip{-webkit-backface-visibility:visible;backface-visibility:visible;animation-name:flip}@keyframes flipInX{from{transform:perspective(400px) rotate3d(1,0,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(1,0,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(1,0,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(1,0,0,-5deg)}to{transform:perspective(400px)}}.flipInX{-webkit-backface-visibility:visible!important;backface-visibility:visible!important;animation-name:flipInX}@keyframes flipInY{from{transform:perspective(400px) rotate3d(0,1,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(0,1,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(0,1,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(0,1,0,-5deg)}to{transform:perspective(400px)}}.flipInY{-webkit-backface-visibility:visible!important;backface-visibility:visible!important;animation-name:flipInY}@keyframes flipOutX{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(1,0,0,-20deg);opacity:1}to{transform:perspective(400px) rotate3d(1,0,0,90deg);opacity:0}}.flipOutX{animation-name:flipOutX;-webkit-backface-visibility:visible!important;backface-visibility:visible!important}@keyframes flipOutY{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(0,1,0,-15deg);opacity:1}to{transform:perspective(400px) rotate3d(0,1,0,90deg);opacity:0}}.flipOutY{-webkit-backface-visibility:visible!important;backface-visibility:visible!important;animation-name:flipOutY}@keyframes lightSpeedIn{from{transform:translate3d(100%,0,0) skewX(-30deg);opacity:0}60%{transform:skewX(20deg);opacity:1}80%{transform:skewX(-5deg);opacity:1}to{transform:none;opacity:1}}.lightSpeedIn{animation-name:lightSpeedIn;animation-timing-function:ease-out}@keyframes lightSpeedOut{from{opacity:1}to{transform:translate3d(100%,0,0) skewX(30deg);opacity:0}}.lightSpeedOut{animation-name:lightSpeedOut;animation-timing-function:ease-in}@keyframes rotateIn{from{transform-origin:center;transform:rotate3d(0,0,1,-200deg);opacity:0}to{transform-origin:center;transform:none;opacity:1}}.rotateIn{animation-name:rotateIn}@keyframes rotateInDownLeft{from{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}to{transform-origin:left bottom;transform:none;opacity:1}}.rotateInDownLeft{animation-name:rotateInDownLeft}@keyframes rotateInDownRight{from{transform-origin:right bottom;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:right bottom;transform:none;opacity:1}}.rotateInDownRight{animation-name:rotateInDownRight}@keyframes rotateInUpLeft{from{transform-origin:left bottom;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:left bottom;transform:none;opacity:1}}.rotateInUpLeft{animation-name:rotateInUpLeft}@keyframes rotateInUpRight{from{transform-origin:right bottom;transform:rotate3d(0,0,1,-90deg);opacity:0}to{transform-origin:right bottom;transform:none;opacity:1}}.rotateInUpRight{animation-name:rotateInUpRight}@keyframes rotateOut{from{transform-origin:center;opacity:1}to{transform-origin:center;transform:rotate3d(0,0,1,200deg);opacity:0}}.rotateOut{animation-name:rotateOut}@keyframes rotateOutDownLeft{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,45deg);opacity:0}}.rotateOutDownLeft{animation-name:rotateOutDownLeft}@keyframes rotateOutDownRight{from{transform-origin:right bottom;opacity:1}to{transform-origin:right bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}.rotateOutDownRight{animation-name:rotateOutDownRight}@keyframes rotateOutUpLeft{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}.rotateOutUpLeft{animation-name:rotateOutUpLeft}@keyframes rotateOutUpRight{from{transform-origin:right bottom;opacity:1}to{transform-origin:right bottom;transform:rotate3d(0,0,1,90deg);opacity:0}}.rotateOutUpRight{animation-name:rotateOutUpRight}@keyframes hinge{0%{transform-origin:top left;animation-timing-function:ease-in-out}20%,60%{transform:rotate3d(0,0,1,80deg);transform-origin:top left;animation-timing-function:ease-in-out}40%,80%{transform:rotate3d(0,0,1,60deg);transform-origin:top left;animation-timing-function:ease-in-out;opacity:1}to{transform:translate3d(0,700px,0);opacity:0}}.hinge{animation-name:hinge}@keyframes jackInTheBox{from{opacity:0;transform:scale(0.1) rotate(30deg);transform-origin:center bottom}50%{transform:rotate(-10deg)}70%{transform:rotate(3deg)}to{opacity:1;transform:scale(1)}}.jackInTheBox{animation-name:jackInTheBox}@keyframes rollIn{from{opacity:0;transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg)}to{opacity:1;transform:none}}.rollIn{animation-name:rollIn}@keyframes rollOut{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg)}}.rollOut{animation-name:rollOut}@keyframes zoomIn{from{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}.zoomIn{animation-name:zoomIn}@keyframes zoomInDown{from{opacity:0;transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);animation-timing-function:cubic-bezier(0.550,0.055,0.675,0.190)}60%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.320,1)}}.zoomInDown{animation-name:zoomInDown}@keyframes zoomInLeft{from{opacity:0;transform:scale3d(.1,.1,.1) translate3d(-1000px,0,0);animation-timing-function:cubic-bezier(0.550,0.055,0.675,0.190)}60%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.320,1)}}.zoomInLeft{animation-name:zoomInLeft}@keyframes zoomInRight{from{opacity:0;transform:scale3d(.1,.1,.1) translate3d(1000px,0,0);animation-timing-function:cubic-bezier(0.550,0.055,0.675,0.190)}60%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(-10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.320,1)}}.zoomInRight{animation-name:zoomInRight}@keyframes zoomInUp{from{opacity:0;transform:scale3d(.1,.1,.1) translate3d(0,1000px,0);animation-timing-function:cubic-bezier(0.550,0.055,0.675,0.190)}60%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.320,1)}}.zoomInUp{animation-name:zoomInUp}@keyframes zoomOut{from{opacity:1}50%{opacity:0;transform:scale3d(.3,.3,.3)}to{opacity:0}}.zoomOut{animation-name:zoomOut}@keyframes zoomOutDown{40%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.550,0.055,0.675,0.190)}to{opacity:0;transform:scale3d(.1,.1,.1) translate3d(0,2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.320,1)}}.zoomOutDown{animation-name:zoomOutDown}@keyframes zoomOutLeft{40%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(42px,0,0)}to{opacity:0;transform:scale(.1) translate3d(-2000px,0,0);transform-origin:left center}}.zoomOutLeft{animation-name:zoomOutLeft}@keyframes zoomOutRight{40%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(-42px,0,0)}to{opacity:0;transform:scale(.1) translate3d(2000px,0,0);transform-origin:right center}}.zoomOutRight{animation-name:zoomOutRight}@keyframes zoomOutUp{40%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.550,0.055,0.675,0.190)}to{opacity:0;transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.320,1)}}.zoomOutUp{animation-name:zoomOutUp}@keyframes slideInDown{from{transform:translate3d(0,-100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}.slideInDown{animation-name:slideInDown}@keyframes slideInLeft{from{transform:translate3d(-100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}.slideInLeft{animation-name:slideInLeft}@keyframes slideInRight{from{transform:translate3d(100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}.slideInRight{animation-name:slideInRight}@keyframes slideInUp{from{transform:translate3d(0,100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}.slideInUp{animation-name:slideInUp}@keyframes slideOutDown{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,100%,0)}}.slideOutDown{animation-name:slideOutDown}@keyframes slideOutLeft{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(-100%,0,0)}}.slideOutLeft{animation-name:slideOutLeft}@keyframes slideOutRight{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(100%,0,0)}}.slideOutRight{animation-name:slideOutRight}@keyframes slideOutUp{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,-100%,0)}}.slideOutUp{animation-name:slideOutUp}",
                cache: true,
            },
            {
                type: "css",
                path: "https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/vendor/hamburgers/dist/hamburgers.css?1608555882.7869",
                content:
                    "/*!\n * Hamburgers\n * @description Tasty CSS-animated hamburgers\n * @author Jonathan Suh @jonsuh\n * @site https://jonsuh.com/hamburgers\n * @link https://github.com/jonsuh/hamburgers\n */.hamburger{padding:15px 15px;display:inline-block;cursor:pointer;transition-property:opacity,filter;transition-duration:.15s;transition-timing-function:linear;font:inherit;color:inherit;text-transform:none;background-color:transparent;border:0;margin:0;overflow:visible}.hamburger:hover{opacity:.7}.hamburger-box{width:40px;height:24px;display:inline-block;position:relative}.hamburger-inner{display:block;top:50%;margin-top:-2px}.hamburger-inner,.hamburger-inner::before,.hamburger-inner::after{width:40px;height:4px;background-color:#000;border-radius:4px;position:absolute;transition-property:transform;transition-duration:.15s;transition-timing-function:ease}.hamburger-inner::before,.hamburger-inner::after{content:\u0022\u0022;display:block}.hamburger-inner::before{top:-10px}.hamburger-inner::after{bottom:-10px}.hamburger--slider .hamburger-inner{top:2px}.hamburger--slider .hamburger-inner::before{top:10px;transition-property:transform,opacity;transition-timing-function:ease;transition-duration:.15s}.hamburger--slider .hamburger-inner::after{top:20px}.hamburger--slider.is-active .hamburger-inner{transform:translate3d(0,10px,0) rotate(45deg)}.hamburger--slider.is-active .hamburger-inner::before{transform:rotate(-45deg) translate3d(-5.71429px,-6px,0);opacity:0}.hamburger--slider.is-active .hamburger-inner::after{transform:translate3d(0,-20px,0) rotate(-90deg)}.hamburger.hamburger--slider{padding:0}.hamburger-inner::before,.hamburger-inner::after{background-color:inherit}.hamburger.hamburger--slider .hamburger-box,.hamburger.hamburger--slider .hamburger-inner,.hamburger.hamburger--slider .hamburger-inner::after,.hamburger.hamburger--slider .hamburger-inner::before,.hamburger.hamburger--slider.hamburger--md .hamburger-box,.hamburger.hamburger--slider.hamburger--md .hamburger-inner,.hamburger.hamburger--slider.hamburger--md .hamburger-inner::after,.hamburger.hamburger--slider.hamburger--md .hamburger-inner::before{height:1px;border-radius:0;width:25px}.hamburger.hamburger--slider .hamburger-inner.hamburger-height-3,.hamburger.hamburger--slider .hamburger-inner.hamburger-height-3::after,.hamburger.hamburger--slider .hamburger-inner.hamburger-height-3::before,.hamburger.hamburger--slider.hamburger--md .hamburger-inner.hamburger-height-3,.hamburger.hamburger--slider.hamburger--md .hamburger-inner.hamburger-height-3::after,.hamburger.hamburger--slider.hamburger--md .hamburger-inner.hamburger-height-3::before{height:3px}.hamburger.hamburger--slider .hamburger-box,.hamburger.hamburger--slider.hamburger--md .hamburger-box{height:17px}.hamburger.hamburger--slider .hamburger-inner,.hamburger.hamburger--slider.hamburger--md .hamburger-inner{top:1px}.hamburger.hamburger--slider .hamburger-inner:before,.hamburger.hamburger--slider.hamburger--md .hamburger-inner:before{top:9px}.hamburger.hamburger--slider .hamburger-inner:after,.hamburger.hamburger--slider.hamburger--md .hamburger-inner:after{top:17px}.hamburger.hamburger--slider.is-active .hamburger-inner:after,.hamburger.hamburger--slider.hamburger--md.is-active .hamburger-inner:after{transform:translate3d(0,-17px,0) rotate(-90deg)}.hamburger.hamburger--slider.is-active .hamburger-inner,.hamburger.hamburger--slider.hamburger--md.is-active .hamburger-inner{transform:translate3d(0,9px,0) rotate(45deg)}.hamburger.hamburger--slider .hamburger-box,.hamburger.hamburger--slider .hamburger-inner,.hamburger.hamburger--slider .hamburger-inner::after,.hamburger.hamburger--slider .hamburger-inner::before,.hamburger.hamburger--md .hamburger-box,.hamburger.hamburger--md .hamburger-inner,.hamburger.hamburger--md .hamburger-inner::after,.hamburger.hamburger--md .hamburger-inner::before{height:1px;border-radius:0;width:25px}.hamburger.hamburger--slider .hamburger-inner.hamburger-height-3,.hamburger.hamburger--slider .hamburger-inner.hamburger-height-3::after,.hamburger.hamburger--slider .hamburger-inner.hamburger-height-3::before,.hamburger.hamburger--md .hamburger-inner.hamburger-height-3,.hamburger.hamburger--md .hamburger-inner.hamburger-height-3::after,.hamburger.hamburger--md .hamburger-inner.hamburger-height-3::before{height:3px}.hamburger.hamburger--slider .hamburger-box,.hamburger.hamburger--md .hamburger-box{height:17px}.hamburger.hamburger--slider .hamburger-inner,.hamburger.hamburger--md .hamburger-inner{top:1px}.hamburger.hamburger--slider .hamburger-inner:before,.hamburger.hamburger--md .hamburger-inner:before{top:9px}.hamburger.hamburger--slider .hamburger-inner:after,.hamburger.hamburger--md .hamburger-inner:after{top:17px}.hamburger.hamburger--slider.hamburger--sm .hamburger-box,.hamburger.hamburger--slider.hamburger--sm .hamburger-inner,.hamburger.hamburger--slider.hamburger--sm .hamburger-inner::after,.hamburger.hamburger--slider.hamburger--sm .hamburger-inner::before{height:2px;border-radius:1px;width:22px}.hamburger.hamburger--slider.hamburger--sm .hamburger-box{height:12px}.hamburger.hamburger--slider.hamburger--sm .hamburger-inner{top:0}.hamburger.hamburger--slider.hamburger--sm .hamburger-inner:before{top:6px}.hamburger.hamburger--slider.hamburger--sm .hamburger-inner:after{top:12px}.hamburger.hamburger--slider.hamburger--sm.is-active .hamburger-inner:after{transform:translate3d(0,-12px,0) rotate(-90deg)}.hamburger.hamburger--slider.hamburger--sm.is-active .hamburger-inner{transform:translate3d(0,6px,0) rotate(45deg)}.hamburger.hamburger--slider.hamburger--lg .hamburger-box,.hamburger.hamburger--slider.hamburger--lg .hamburger-inner,.hamburger.hamburger--slider.hamburger--lg .hamburger-inner::after,.hamburger.hamburger--slider.hamburger--lg .hamburger-inner::before{height:1px;border-radius:0;width:40px}.hamburger.hamburger--slider.hamburger--lg .hamburger-box{height:20px}.hamburger.hamburger--slider.hamburger--lg .hamburger-inner{top:2px}.hamburger.hamburger--slider.hamburger--lg .hamburger-inner:before{top:10px}.hamburger.hamburger--slider.hamburger--lg .hamburger-inner:after{top:20px}.hamburger.hamburger--slider.hamburger--lg.is-active .hamburger-inner:after{transform:translate3d(0,-20px,0) rotate(-90deg)}.hamburger.hamburger--slider.hamburger--lg.is-active .hamburger-inner{transform:translate3d(0,10px,0) rotate(45deg)}",
                cache: true,
            },
            {
                type: "css",
                path: "https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/vendor/icon/fa/style.css?1599490685.4131",
                content:
                    "/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */@font-face{font-family:\u0027FontAwesome\u0027;src:url(\u0027/bitrix/templates/landing24/assets/vendor/icon/fa/font.woff2\u0027) format(\u0027woff2\u0027),url(\u0027/bitrix/templates/landing24/assets/vendor/icon/fa/font.woff\u0027) format(\u0027woff\u0027);font-weight:normal;font-style:normal}.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571429em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14285714em;list-style-type:none}.fa-ul\u003Eli{position:relative}.fa-li{position:absolute;left:-2.14285714em;width:2.14285714em;top:.14285714em;text-align:center}.fa-li.fa-lg{left:-1.85714286em}.fa-border{padding:.2em .25em .15em;border:solid .08em #eee;border-radius:.1em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left{margin-right:.3em}.fa.fa-pull-right{margin-left:.3em}.pull-right{float:right}.pull-left{float:left}.fa.pull-left{margin-right:.3em}.fa.pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{-ms-filter:\u0022progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\u0022;-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-ms-filter:\u0022progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\u0022;-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-ms-filter:\u0022progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\u0022;-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-ms-filter:\u0022progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\u0022;-webkit-transform:scale(-1,1);-ms-transform:scale(-1,1);transform:scale(-1,1)}.fa-flip-vertical{-ms-filter:\u0022progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\u0022;-webkit-transform:scale(1,-1);-ms-transform:scale(1,-1);transform:scale(1,-1)}:root .fa-rotate-90,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-flip-horizontal,:root .fa-flip-vertical{filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}",
                cache: true,
            },
            {
                type: "css",
                path: "https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/vendor/fancybox/jquery.fancybox.css?1567508327.17123",
                content:
                    "@charset \u0022UTF-8\u0022;body.fancybox-active{overflow:hidden}body.fancybox-iosfix{position:fixed;left:0;right:0}.fancybox-is-hidden{position:absolute;top:-9999px;left:-9999px;visibility:hidden}.fancybox-container{position:fixed;top:0;left:0;width:100%;height:100%;z-index:99992;-webkit-tap-highlight-color:transparent;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:translateZ(0);transform:translateZ(0);font-family:-apple-system,BlinkMacSystemFont,\u0022Segoe UI\u0022,Roboto,\u0022Helvetica Neue\u0022,Arial,sans-serif,\u0022Apple Color Emoji\u0022,\u0022Segoe UI Emoji\u0022,\u0022Segoe UI Symbol\u0022}.fancybox-outer,.fancybox-inner,.fancybox-bg,.fancybox-stage{position:absolute;top:0;right:0;bottom:0;left:0}.fancybox-outer{overflow-y:auto;-webkit-overflow-scrolling:touch}.fancybox-bg{background:#1e1e1e;opacity:0;transition-duration:inherit;transition-property:opacity;transition-timing-function:cubic-bezier(0.47,0,0.74,0.71)}.fancybox-is-open .fancybox-bg{opacity:.87;transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)}.fancybox-infobar,.fancybox-toolbar,.fancybox-caption-wrap{position:absolute;direction:ltr;z-index:99997;opacity:0;visibility:hidden;transition:opacity .25s,visibility 0s linear .25s;box-sizing:border-box}.fancybox-show-infobar .fancybox-infobar,.fancybox-show-toolbar .fancybox-toolbar,.fancybox-show-caption .fancybox-caption-wrap{opacity:1;visibility:visible;transition:opacity .25s,visibility 0s}.fancybox-infobar{top:0;left:0;font-size:13px;padding:0 10px;height:44px;min-width:44px;line-height:44px;color:#ccc;text-align:center;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;-webkit-font-smoothing:subpixel-antialiased;mix-blend-mode:exclusion}.fancybox-toolbar{top:0;right:0;margin:0;padding:0}.fancybox-stage{overflow:hidden;direction:ltr;z-index:99994;-webkit-transform:translate3d(0,0,0)}.fancybox-is-closing .fancybox-stage{overflow:visible}.fancybox-slide{position:absolute;top:0;left:0;width:100%;height:100%;margin:0;padding:0;overflow:auto;outline:0;white-space:normal;box-sizing:border-box;text-align:center;z-index:99994;-webkit-overflow-scrolling:touch;display:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform}.fancybox-slide::before{content:\u0027\u0027;display:inline-block;vertical-align:middle;height:100%;width:0}.fancybox-is-sliding .fancybox-slide,.fancybox-slide--previous,.fancybox-slide--current,.fancybox-slide--next{display:block}.fancybox-slide--image{overflow:visible}.fancybox-slide--image::before{display:none}.fancybox-slide--video .fancybox-content,.fancybox-slide--video iframe{background:#000}.fancybox-slide--map .fancybox-content,.fancybox-slide--map iframe{background:#e5e3df}.fancybox-slide--next{z-index:99995}.fancybox-slide\u003E*{display:inline-block;position:relative;padding:24px;margin:44px 0 44px;border-width:0;vertical-align:middle;text-align:left;background-color:#fff;overflow:auto;box-sizing:border-box}.fancybox-slide\u003Etitle,.fancybox-slide\u003Estyle,.fancybox-slide\u003Emeta,.fancybox-slide\u003Elink,.fancybox-slide\u003Escript,.fancybox-slide\u003Ebase{display:none}.fancybox-slide .fancybox-image-wrap{position:absolute;top:0;left:0;margin:0;padding:0;border:0;z-index:99995;background:transparent;cursor:default;overflow:visible;-webkit-transform-origin:top left;-ms-transform-origin:top left;transform-origin:top left;background-size:100% 100%;background-repeat:no-repeat;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform}.fancybox-can-zoomOut .fancybox-image-wrap{cursor:-webkit-zoom-out;cursor:zoom-out}.fancybox-can-zoomIn .fancybox-image-wrap{cursor:-webkit-zoom-in;cursor:zoom-in}.fancybox-can-drag .fancybox-image-wrap{cursor:-webkit-grab;cursor:grab}.fancybox-is-dragging .fancybox-image-wrap{cursor:-webkit-grabbing;cursor:grabbing}.fancybox-image,.fancybox-spaceball{position:absolute;top:0;left:0;width:100%;height:100%;margin:0;padding:0;border:0;max-width:none;max-height:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.fancybox-spaceball{z-index:1}.fancybox-slide--iframe .fancybox-content{padding:0;width:80%;height:80%;max-width:calc(100% - 100px);max-height:calc(100% - 88px);overflow:visible;background:#fff}.fancybox-iframe{display:block;margin:0;padding:0;border:0;width:100%;height:100%;background:#fff}.fancybox-error{margin:0;padding:40px;width:100%;max-width:380px;background:#fff;cursor:default}.fancybox-error p{margin:0;padding:0;color:#444;font-size:16px;line-height:20px}.fancybox-button{box-sizing:border-box;display:inline-block;vertical-align:top;width:44px;height:44px;margin:0;padding:10px;border:0;border-radius:0;background:rgba(30,30,30,0.6);transition:color .3s ease;cursor:pointer;outline:0}.fancybox-button,.fancybox-button:visited,.fancybox-button:link{color:#ccc}.fancybox-button:focus,.fancybox-button:hover{color:#fff}.fancybox-button[disabled]{color:#ccc;cursor:default;opacity:.6}.fancybox-button svg{display:block;position:relative;overflow:visible;shape-rendering:geometricPrecision}.fancybox-button svg path{fill:currentColor;stroke:currentColor;stroke-linejoin:round;stroke-width:3}.fancybox-button--share svg path{stroke-width:1}.fancybox-button--play svg path:nth-child(2){display:none}.fancybox-button--pause svg path:nth-child(1){display:none}.fancybox-button--zoom svg path{fill:transparent}.fancybox-navigation{display:none}.fancybox-show-nav .fancybox-navigation{display:block}.fancybox-navigation button{position:absolute;top:50%;margin:-50px 0 0 0;z-index:99997;background:transparent;width:60px;height:100px;padding:17px}.fancybox-navigation button:before{content:\u0022\u0022;position:absolute;top:30px;right:10px;width:40px;height:40px;background:rgba(30,30,30,0.6)}.fancybox-navigation .fancybox-button--arrow_left{left:0}.fancybox-navigation .fancybox-button--arrow_right{right:0}.fancybox-close-small{position:absolute;top:0;right:0;width:44px;height:44px;padding:0;margin:0;border:0;border-radius:0;background:transparent;z-index:10;cursor:pointer}.fancybox-close-small:after{content:\u0027\u00d7\u0027;position:absolute;top:5px;right:5px;width:30px;height:30px;font:20px/30px Arial,\u0022Helvetica Neue\u0022,Helvetica,sans-serif;color:#888;font-weight:300;text-align:center;border-radius:50%;border-width:0;background-color:transparent;transition:background-color .25s;box-sizing:border-box;z-index:2}.fancybox-close-small:focus{outline:0}.fancybox-close-small:focus:after{outline:1px dotted #888}.fancybox-close-small:hover:after{color:#555;background:#eee}.fancybox-slide--image .fancybox-close-small,.fancybox-slide--iframe .fancybox-close-small{top:0;right:-44px}.fancybox-slide--image .fancybox-close-small:after,.fancybox-slide--iframe .fancybox-close-small:after{font-size:35px;color:#aaa}.fancybox-slide--image .fancybox-close-small:hover:after,.fancybox-slide--iframe .fancybox-close-small:hover:after{color:#fff;background:transparent}.fancybox-is-scaling .fancybox-close-small,.fancybox-is-zoomable.fancybox-can-drag .fancybox-close-small{display:none}.fancybox-caption-wrap{bottom:0;left:0;right:0;padding:60px 2vw 0 2vw;background:linear-gradient(to bottom,transparent 0,rgba(0,0,0,0.1) 20%,rgba(0,0,0,0.2) 40%,rgba(0,0,0,0.6) 80%,rgba(0,0,0,0.8) 100%);pointer-events:none}.fancybox-caption{padding:30px 0;border-top:1px solid rgba(255,255,255,0.4);font-size:14px;color:#fff;line-height:20px;-webkit-text-size-adjust:none}.fancybox-caption a,.fancybox-caption button,.fancybox-caption select{pointer-events:all;position:relative}.fancybox-caption a{color:#fff;text-decoration:underline}.fancybox-slide\u003E.fancybox-loading{border:6px solid rgba(100,100,100,0.4);border-top:6px solid rgba(255,255,255,0.6);border-radius:100%;height:50px;width:50px;-webkit-animation:fancybox-rotate .8s infinite linear;animation:fancybox-rotate .8s infinite linear;background:transparent;position:absolute;top:50%;left:50%;margin-top:-30px;margin-left:-30px;z-index:99999}@-webkit-keyframes fancybox-rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fancybox-rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fancybox-animated{transition-timing-function:cubic-bezier(0,0,0.25,1)}.fancybox-fx-slide.fancybox-slide--previous{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);opacity:0}.fancybox-fx-slide.fancybox-slide--next{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);opacity:0}.fancybox-fx-slide.fancybox-slide--current{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}.fancybox-fx-fade.fancybox-slide--previous,.fancybox-fx-fade.fancybox-slide--next{opacity:0;transition-timing-function:cubic-bezier(0.19,1,0.22,1)}.fancybox-fx-fade.fancybox-slide--current{opacity:1}.fancybox-fx-zoom-in-out.fancybox-slide--previous{-webkit-transform:scale3d(1.5,1.5,1.5);transform:scale3d(1.5,1.5,1.5);opacity:0}.fancybox-fx-zoom-in-out.fancybox-slide--next{-webkit-transform:scale3d(0.5,0.5,0.5);transform:scale3d(0.5,0.5,0.5);opacity:0}.fancybox-fx-zoom-in-out.fancybox-slide--current{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:1}.fancybox-fx-rotate.fancybox-slide--previous{-webkit-transform:rotate(-360deg);-ms-transform:rotate(-360deg);transform:rotate(-360deg);opacity:0}.fancybox-fx-rotate.fancybox-slide--next{-webkit-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg);opacity:0}.fancybox-fx-rotate.fancybox-slide--current{-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);opacity:1}.fancybox-fx-circular.fancybox-slide--previous{-webkit-transform:scale3d(0,0,0) translate3d(-100%,0,0);transform:scale3d(0,0,0) translate3d(-100%,0,0);opacity:0}.fancybox-fx-circular.fancybox-slide--next{-webkit-transform:scale3d(0,0,0) translate3d(100%,0,0);transform:scale3d(0,0,0) translate3d(100%,0,0);opacity:0}.fancybox-fx-circular.fancybox-slide--current{-webkit-transform:scale3d(1,1,1) translate3d(0,0,0);transform:scale3d(1,1,1) translate3d(0,0,0);opacity:1}.fancybox-fx-tube.fancybox-slide--previous{-webkit-transform:translate3d(-100%,0,0) scale(0.1) skew(-10deg);transform:translate3d(-100%,0,0) scale(0.1) skew(-10deg)}.fancybox-fx-tube.fancybox-slide--next{-webkit-transform:translate3d(100%,0,0) scale(0.1) skew(10deg);transform:translate3d(100%,0,0) scale(0.1) skew(10deg)}.fancybox-fx-tube.fancybox-slide--current{-webkit-transform:translate3d(0,0,0) scale(1);transform:translate3d(0,0,0) scale(1)}.fancybox-share{padding:30px;border-radius:3px;background:#f4f4f4;max-width:90%}.fancybox-share h1{color:#222;margin:0 0 20px 0;font-size:33px;font-weight:700;text-align:center}.fancybox-share p{margin:0;padding:0;text-align:center}.fancybox-share p:first-of-type{margin-right:-10px}.fancybox-share_button{display:inline-block;text-decoration:none;margin:0 10px 10px 0;padding:10px 20px;border:0;border-radius:3px;box-shadow:0 2px 2px 0 rgba(0,0,0,0.16);background:#fff;white-space:nowrap;font-size:16px;line-height:23px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;min-width:140px;color:#707070;transition:all .2s}.fancybox-share_button:focus,.fancybox-share_button:hover{text-decoration:none;color:#333;box-shadow:0 2px 2px 0 rgba(0,0,0,0.3)}.fancybox-share_button svg{margin-right:5px;width:20px;height:20px;vertical-align:text-bottom}.fancybox-share input{box-sizing:border-box;width:100%;margin:5px 0 0 0;padding:10px 15px;border:1px solid #d7d7d7;border-radius:3px;background:#ebebeb;color:#5d5b5b;font-size:14px;outline:0}.fancybox-thumbs{display:none;position:absolute;top:0;bottom:0;right:0;width:212px;margin:0;padding:2px 2px 4px 2px;background:#fff;-webkit-tap-highlight-color:transparent;-webkit-overflow-scrolling:touch;-ms-overflow-style:-ms-autohiding-scrollbar;box-sizing:border-box;z-index:99995}.fancybox-thumbs-x{overflow-y:hidden;overflow-x:auto}.fancybox-show-thumbs .fancybox-thumbs{display:block}.fancybox-show-thumbs .fancybox-inner{right:212px}.fancybox-thumbs\u003Eul{list-style:none;position:absolute;position:relative;width:100%;height:100%;margin:0;padding:0;overflow-x:hidden;overflow-y:auto;font-size:0;white-space:nowrap}.fancybox-thumbs-x\u003Eul{overflow:hidden}.fancybox-thumbs-y\u003Eul::-webkit-scrollbar{width:7px}.fancybox-thumbs-y\u003Eul::-webkit-scrollbar-track{background:#fff;border-radius:10px;box-shadow:inset 0 0 6px rgba(0,0,0,0.3)}.fancybox-thumbs-y\u003Eul::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:10px}.fancybox-thumbs\u003Eul\u003Eli{float:left;overflow:hidden;padding:0;margin:2px;width:100px;height:75px;max-width:calc(50% - 4px);max-height:calc(100% - 8px);position:relative;cursor:pointer;outline:0;-webkit-tap-highlight-color:transparent;-webkit-backface-visibility:hidden;backface-visibility:hidden;box-sizing:border-box}li.fancybox-thumbs-loading{background:rgba(0,0,0,0.1)}.fancybox-thumbs\u003Eul\u003Eli\u003Eimg{position:absolute;top:0;left:0;max-width:none;max-height:none;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.fancybox-thumbs\u003Eul\u003Eli:before{content:\u0027\u0027;position:absolute;top:0;right:0;bottom:0;left:0;border:4px solid #4ea7f9;z-index:99991;opacity:0;transition:all .2s cubic-bezier(0.25,0.46,0.45,0.94)}.fancybox-thumbs\u003Eul\u003Eli.fancybox-thumbs-active:before{opacity:1}@media all and (max-width:800px){.fancybox-thumbs{width:110px}.fancybox-show-thumbs .fancybox-inner{right:110px}.fancybox-thumbs\u003Eul\u003Eli{max-width:calc(100% - 10px)}}",
                cache: true,
            },
        ]);

        module.language = "en";
        module.languages = ["th", "it", "br", "ua", "pl", "in", "id", "ru", "hi", "vn", "fr", "la", "tr", "en", "de", "ms", "tc", "ja", "sc"];
        module.messages = {
            th: {
                LANDING_NAVBAR_MODAL_ALERT:
                    "\u0e42\u0e2b\u0e21\u0e14\u0e41\u0e01\u0e49\u0e44\u0e02\u003Cbr\u003E\u0e1a\u0e25\u0e47\u0e2d\u0e01\u0e08\u0e30\u0e43\u0e0a\u0e49\u0e07\u0e32\u0e19\u0e44\u0e14\u0e49\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e2a\u0e21\u0e1a\u0e39\u0e23\u0e13\u0e4c\u0e43\u0e19\u0e42\u0e2b\u0e21\u0e14\u0e41\u0e2a\u0e14\u0e07\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07",
                LANDING_NAVBAR_TOGGLER_HIDE: "\u0e22\u0e38\u0e1a",
                LANDING_NAVBAR_TOGGLER_SHOW: "\u0e02\u0e22\u0e32\u0e22",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "\u0e01\u0e23\u0e38\u0e13\u0e32\u0e15\u0e34\u0e14\u0e15\u0e48\u0e2d\u0e1d\u0e48\u0e32\u0e22\u0e0a\u0e48\u0e27\u0e22\u0e40\u0e2b\u0e25\u0e37\u0e2d",
                LANDING_BLOCK_WEBFORM_ERROR: "\u0e40\u0e01\u0e34\u0e14\u0e02\u0e49\u0e2d\u0e1c\u0e34\u0e14\u0e1e\u0e25\u0e32\u0e14\u0e43\u0e19\u0e01\u0e32\u0e23\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e41\u0e1a\u0e1a\u0e1f\u0e2d\u0e23\u0e4c\u0e21",
                LANDING_BLOCK_WEBFORM_NO_FORM: "\u0e44\u0e21\u0e48\u0e21\u0e35\u0e41\u0e1a\u0e1a\u0e1f\u0e2d\u0e23\u0e4c\u0e21 CRM \u0e17\u0e35\u0e48\u0e43\u0e0a\u0e49\u0e07\u0e32\u0e19\u0e2d\u0e22\u0e39\u0e48",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "\u0e40\u0e27\u0e47\u0e1a\u0e44\u0e0b\u0e15\u0e4c\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e44\u0e21\u0e48\u0e21\u0e35\u0e41\u0e1a\u0e1a\u0e1f\u0e2d\u0e23\u0e4c\u0e21 CRM \u0e43\u0e14 \u0e46 \u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a\u0e43\u0e2b\u0e49\u0e41\u0e19\u0e48\u0e43\u0e08\u0e27\u0e48\u0e32 \u0e21\u0e35\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e19\u0e49\u0e2d\u0e22\u0e2b\u0e19\u0e36\u0e48\u0e07\u0e40\u0e17\u0e21\u0e40\u0e1e\u0e25\u0e15\u0e17\u0e35\u0e48\u0e43\u0e0a\u0e49\u0e07\u0e32\u0e19\u0e1a\u0e19\u0e2b\u0e19\u0e49\u0e32 \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E \u0e41\u0e1a\u0e1a\u0e1f\u0e2d\u0e23\u0e4c\u0e21 CRM\u003C/a\u003E",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS:
                    "\u0e40\u0e27\u0e47\u0e1a\u0e44\u0e0b\u0e15\u0e4c\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e44\u0e21\u0e48\u0e21\u0e35\u0e41\u0e1a\u0e1a\u0e1f\u0e2d\u0e23\u0e4c\u0e21 CRM \u0e43\u0e14 \u0e46 \u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a\u0e27\u0e48\u0e32\u0e42\u0e21\u0e14\u0e39\u0e25 \u0022\u0e01\u0e32\u0e23\u0e1c\u0e2a\u0e32\u0e19\u0e23\u0e27\u0e21 Bitrix24\u0022 (b24connector) \u0e21\u0e35\u0e01\u0e32\u0e23\u0e15\u0e34\u0e14\u0e15\u0e31\u0e49\u0e07\u0e2b\u0e23\u0e37\u0e2d\u0e44\u0e21\u0e48 \u0e44\u0e14\u0e49\u0e17\u0e35\u0e48\u0e19\u0e35\u0e48: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003E\u0e01\u0e32\u0e23\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32 \u003E \u0e01\u0e32\u0e23\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32\u0e23\u0e30\u0e1a\u0e1a \u003E \u0e42\u0e21\u0e14\u0e39\u0e25\u003C/a\u003E \u0e2d\u0e35\u0e01\u0e17\u0e31\u0e49\u0e07\u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a\u0e27\u0e48\u0e32 \u0e1e\u0e2d\u0e23\u0e4c\u0e17\u0e31\u0e25 Bitrix24 \u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e21\u0e35\u0e01\u0e32\u0e23\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e42\u0e22\u0e07\u0e2d\u0e22\u0e39\u0e48 \u0e43\u0e19\u0e01\u0e32\u0e23\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32 \u0022\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/settings.php?mid=b24connector\u0022\u003EClient Communications\u003C/a\u003E\u0022",
            },
            it: {
                LANDING_NAVBAR_MODAL_ALERT: "Modalit\u00e0 di modifica.\u003Cbr\u003EIl blocco sar\u00e0 completamente funzionale in modalit\u00e0 anteprima.",
                LANDING_NAVBAR_TOGGLER_HIDE: "Comprimi",
                LANDING_NAVBAR_TOGGLER_SHOW: "Espandi",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "Contatta Helpdesk",
                LANDING_BLOCK_WEBFORM_ERROR: "Errore durante la creazione del modulo",
                LANDING_BLOCK_WEBFORM_NO_FORM: "Non sono presenti moduli CRM attivi",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "Il tuo sito non ha alcun modulo CRM. Assicurati che ci sia almeno un modulo attivo nella pagina \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E Moduli CRM\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS:
                    "Il tuo sito non ha alcun modulo CRM. Assicurati che sia installato il modulo \u0022Integrazione Bitrix24\u0022 (b24connector) qui: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003EImpostazioni \u003E Impostazioni sistema \u003E Moduli\u003C/a\u003E. Inoltre assicurati che il tuo portale Bitrix24 sia collegato nelle impostazioni \u0022\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/settings.php?mid=b24connector\u0022\u003EComunicazioni con i clienti\u003C/a\u003E\u0022.",
            },
            br: {
                LANDING_NAVBAR_MODAL_ALERT: "Modo de edi\u00e7\u00e3o.\u003Cbr\u003EO bloco estar\u00e1 totalmente funcional no modo de visualiza\u00e7\u00e3o.",
                LANDING_NAVBAR_TOGGLER_HIDE: "Recolher",
                LANDING_NAVBAR_TOGGLER_SHOW: "Expandir",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "Por favor, entre em contato com o Suporte T\u00e9cnica",
                LANDING_BLOCK_WEBFORM_ERROR: "Erro ao criar formul\u00e1rio",
                LANDING_BLOCK_WEBFORM_NO_FORM: "N\u00e3o h\u00e1 formul\u00e1rios CRM ativos",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "Seu site n\u00e3o possui nenhum formul\u00e1rio de CRM. Verifique se h\u00e1 pelo menos um modelo ativo na p\u00e1gina \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E Formul\u00e1rios de CRM\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS:
                    "Seu site n\u00e3o possui nenhum formul\u00e1rio de CRM. Verifique se o m\u00f3dulo \u0022Integra\u00e7\u00e3o Bitrix24\u0022 (b24connector) est\u00e1 instalado aqui: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003EConfigura\u00e7\u00f5es\u003E Configura\u00e7\u00f5es do Sistema\u003E M\u00f3dulos\u003C/a\u003E. Verifique tamb\u00e9m se o seu portal Bitrix24 est\u00e1 vinculado nas configura\u00e7\u00f5es \u0022\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/settings.php?mid=b24connector\u0022\u003EComunica\u00e7\u00f5es com o Cliente\u003C/a\u003E\u0022.",
            },
            ua: {
                LANDING_NAVBAR_TOGGLER_SHOW: "\u0420\u043e\u0437\u0433\u043e\u0440\u043d\u0443\u0442\u0438",
                LANDING_NAVBAR_TOGGLER_HIDE: "\u0417\u0433\u043e\u0440\u043d\u0443\u0442\u0438",
                LANDING_NAVBAR_MODAL_ALERT:
                    "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043d\u043d\u044f.\u003Cbr\u003E\u041f\u043e\u0432\u043d\u043e\u0446\u0456\u043d\u043d\u0430 \u0440\u043e\u0431\u043e\u0442\u0430 \u0431\u043b\u043e\u043a\u0443 \u0431\u0443\u0434\u0435 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0430 \u0432\u0026nbsp;\u0440\u0435\u0436\u0438\u043c\u0456 \u043f\u0435\u0440\u0435\u0433\u043b\u044f\u0434\u0443",
                LANDING_BLOCK_WEBFORM_ERROR: "\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0441\u0442\u0432\u043e\u0440\u0435\u043d\u043d\u044f \u0444\u043e\u0440\u043c\u0438",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT:
                    "\u0411\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430, \u0437\u0432\u0435\u0440\u043d\u0456\u0442\u044c\u0441\u044f \u0443 \u0442\u0435\u0445\u043f\u0456\u0434\u0442\u0440\u0438\u043c\u043a\u0443",
                LANDING_BLOCK_WEBFORM_NO_FORM: "\u041d\u0435\u043c\u0430\u0454 \u0430\u043a\u0442\u0438\u0432\u043d\u0438\u0445 CRM-\u0444\u043e\u0440\u043c",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "\u041d\u0430 \u0432\u0430\u0448\u043e\u043c\u0443 \u0441\u0430\u0439\u0442\u0456 \u043d\u0435\u043c\u0430\u0454 CRM-\u0444\u043e\u0440\u043c. \u041f\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 \u0457\u0445 \u043d\u0430\u044f\u0432\u043d\u0456\u0441\u0442\u044c \u0442\u0430 \u0430\u043a\u0442\u0438\u0432\u043d\u0456\u0441\u0442\u044c \u043d\u0430 \u0441\u0442\u043e\u0440\u0456\u043d\u0446\u0456 \u0026laquo;\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM - CRM-\u0444\u043e\u0440\u043c\u0438\u003C/a\u003E\u0026raquo;.",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "\u041d\u0430 \u0432\u0430\u0448\u043e\u043c\u0443 \u0441\u0430\u0439\u0442\u0456 \u043d\u0435\u043c\u0430\u0454 CRM-\u0444\u043e\u0440\u043c. \u041f\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0443 \u043c\u043e\u0434\u0443\u043b\u044f \u0026laquo;\u0406\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0456\u044f \u0437 \u0411\u0456\u0442\u0440\u0456\u043a\u044124 (b24connector)\u0026raquo;\u0443 \u0440\u0430\u0437\u0434\u0456\u043b\u0456 \u0026laquo;\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003E\u041d\u0430\u043b\u0430\u0448\u0442\u0443\u0432\u0430\u043d\u043d\u044f \u0026mdash; \u041d\u0430\u043b\u0430\u0448\u0442\u0443\u0432\u0430\u043d\u043d\u044f \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0443 \u0026mdash; \u041c\u043e\u0434\u0443\u043b\u0456\u003C/a\u003E\u0026raquo; \u0456 \u043f\u0440\u0438\u0432\u0027\u044f\u0437\u043a\u0443 \u043f\u043e\u0440\u0442\u0430\u043b\u0443 \u0411\u0456\u0442\u0440\u0456\u043a\u044124 \u0432 \u043d\u0430\u043b\u0430\u0448\u0442\u0443\u0432\u0430\u043d\u043d\u044f\u0445 \u0026laquo;\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003E\u041a\u043e\u043c\u0443\u043d\u0456\u043a\u0430\u0446\u0456\u0439 \u0437 \u043a\u043b\u0456\u0454\u043d\u0442\u043e\u043c\u003C/a\u003E\u0026raquo;.",
            },
            pl: {
                LANDING_NAVBAR_MODAL_ALERT: "Tryb edycji.\u003Cbr\u003EBlok b\u0119dzie w pe\u0142ni funkcjonalny w trybie podgl\u0105du.",
                LANDING_NAVBAR_TOGGLER_HIDE: "Zwi\u0144",
                LANDING_NAVBAR_TOGGLER_SHOW: "Rozwi\u0144",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "Skontaktuj si\u0119 z dzia\u0142em pomocy",
                LANDING_BLOCK_WEBFORM_ERROR: "B\u0142\u0105d podczas tworzenia formularza",
                LANDING_BLOCK_WEBFORM_NO_FORM: "Brak aktywnych formularzy CRM",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "Twoja witryna nie zawiera \u017cadnych formularzy CRM. Upewnij si\u0119, \u017ce na stronie \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E Formularze CRM\u003C/a\u003E jest co najmniej jeden aktywny szablon.",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS:
                    "Twoja witryna nie zawiera \u017cadnych formularzy CRM. Sprawd\u017a, czy modu\u0142 \u201eIntegracja Bitrix24\u201d (b24connector) jest zainstalowany: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003EUstawienia \u003E Ustawienia systemu \u003E Modu\u0142y\u003C/a\u003E. Sprawd\u017a tak\u017ce, czy Tw\u00f3j portal Bitrix24 jest pod\u0142\u0105czony, w ustawieniach \u201e\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/settings.php?mid=b24connector\u0022\u003EKomunikacja z klientem\u003C/a\u003E\u201d.",
            },
            in: {
                LANDING_NAVBAR_MODAL_ALERT: "Edit mode.\u003Cbr\u003EThe block will be fully functional in preview mode.",
                LANDING_NAVBAR_TOGGLER_HIDE: "Collapse ",
                LANDING_NAVBAR_TOGGLER_SHOW: "Expand",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "Please contact the Helpdesk",
                LANDING_BLOCK_WEBFORM_ERROR: "Error creating form",
                LANDING_BLOCK_WEBFORM_NO_FORM: "There are no active CRM forms",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "Your site does not have any CRM forms. Make sure there is at least one active template on the \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E CRM Forms\u003C/a\u003E page.",
            },
            id: {
                LANDING_NAVBAR_MODAL_ALERT: "Edit mode.\u003Cbr\u003EBlok akan berfungsi sepenuhnya dalam mode pratinjau.",
                LANDING_NAVBAR_TOGGLER_HIDE: "Ciutkan",
                LANDING_NAVBAR_TOGGLER_SHOW: "Bentangkan",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "Silakan hubungi Helpdesk",
                LANDING_BLOCK_WEBFORM_ERROR: "Kesalahan membuat formulir",
                LANDING_BLOCK_WEBFORM_NO_FORM: "Tidak ada formulir CRM yang aktif",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "Situs Anda tidak memiliki formulir CRM. Pastikan ada sedikitnya satu templat aktif di halaman \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E Formulir CRM\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS:
                    "Situs Anda tidak memiliki formulir CRM. Periksa apakah modul \u0022Integrasi Bitrix24\u0022 (b24connector) telah diinstal di sini: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003EPengaturan \u003E Pengaturan Sistem \u003E Modul\u003C/a\u003E. Periksa juga apakah portal Bitrix24 Anda ditautkan di pengaturan \u0022\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/settings.php?mid=b24connector\u0022\u003EKomunikasi Klien\u003C/a\u003E\u0022.",
            },
            ru: {
                LANDING_NAVBAR_TOGGLER_SHOW: "\u0420\u0430\u0437\u0432\u0435\u0440\u043d\u0443\u0442\u044c",
                LANDING_NAVBAR_TOGGLER_HIDE: "\u0421\u0432\u0435\u0440\u043d\u0443\u0442\u044c",
                LANDING_NAVBAR_MODAL_ALERT:
                    "\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435.\u003Cbr\u003E\u041f\u043e\u043b\u043d\u043e\u0446\u0435\u043d\u043d\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430 \u0431\u043b\u043e\u043a\u0430 \u0431\u0443\u0434\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0430 \u0432\u0026nbsp;\u0440\u0435\u0436\u0438\u043c\u0435 \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430.",
                LANDING_BLOCK_WEBFORM_ERROR: "\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u0444\u043e\u0440\u043c\u044b",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT:
                    "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u0432 \u0442\u0435\u0445\u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0443",
                LANDING_BLOCK_WEBFORM_NO_FORM: "\u041d\u0435\u0442 \u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0445 CRM-\u0444\u043e\u0440\u043c",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "\u041d\u0430 \u0432\u0430\u0448\u0435\u043c \u0441\u0430\u0439\u0442\u0435 \u043d\u0435\u0442 CRM-\u0444\u043e\u0440\u043c. \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0438\u0445 \u043d\u0430\u043b\u0438\u0447\u0438\u0435 \u0438 \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 \u0026laquo;\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM - CRM-\u0444\u043e\u0440\u043c\u044b\u003C/a\u003E\u0026raquo;.",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "\u041d\u0430 \u0432\u0430\u0448\u0435\u043c \u0441\u0430\u0439\u0442\u0435 \u043d\u0435\u0442 CRM-\u0444\u043e\u0440\u043c. \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0443 \u043c\u043e\u0434\u0443\u043b\u044f \u0026laquo;\u0418\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044f \u0441 \u0411\u0438\u0442\u0440\u0438\u043a\u044124 (b24connector)\u0026raquo; \u0432 \u0440\u0430\u0437\u0434\u0435\u043b\u0435 \u0026laquo;\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003E\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0026mdash; \u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0430 \u0026mdash; \u041c\u043e\u0434\u0443\u043b\u0438\u003C/a\u003E\u0026raquo; \u0438 \u043f\u0440\u0438\u0432\u044f\u0437\u043a\u0443 \u043f\u043e\u0440\u0442\u0430\u043b\u0430 \u0411\u0438\u0442\u0440\u0438\u043a\u044124 \u0432 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430\u0445 \u0026laquo;\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003E\u041a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0439 \u0441 \u043a\u043b\u0438\u0435\u043d\u0442\u043e\u043c\u003C/a\u003E\u0026raquo;.",
            },
            hi: {
                LANDING_NAVBAR_MODAL_ALERT: "Edit mode.\u003Cbr\u003EThe block will be fully functional in preview mode.",
                LANDING_NAVBAR_TOGGLER_HIDE: "\u0938\u093f\u0915\u094b\u0921\u093c\u0947\u0902",
                LANDING_NAVBAR_TOGGLER_SHOW: "\u092b\u0948\u0932\u093e\u090f\u0901",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "\u0915\u0943\u092a\u092f\u093e \u0939\u0947\u0932\u094d\u092a\u0921\u0947\u0938\u094d\u0915 \u0938\u0947 \u0938\u0902\u092a\u0930\u094d\u0915 \u0915\u0930\u0947\u0902",
                LANDING_BLOCK_WEBFORM_ERROR: "\u092b\u0949\u0930\u094d\u092e \u092c\u0928\u093e\u0928\u0947 \u092e\u0947\u0902 \u0924\u094d\u0930\u0941\u091f\u093f",
                LANDING_BLOCK_WEBFORM_NO_FORM: "\u0915\u094b\u0908 \u092d\u0940 \u0938\u0915\u094d\u0930\u093f\u092f CRM \u092b\u0949\u0930\u094d\u092e \u0928\u0939\u0940\u0902 \u0939\u0948",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "\u0906\u092a\u0915\u0940 \u0938\u093e\u0907\u091f \u0915\u0947 \u092a\u093e\u0938 \u0915\u094b\u0908 CRM \u092b\u0949\u0930\u094d\u092e \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u0938\u0941\u0928\u093f\u0936\u094d\u091a\u093f\u0924 \u0915\u0930 \u0932\u0947\u0902 \u0915\u093f \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E CRM \u092b\u0949\u0930\u094d\u092e\u003C/a\u003E \u092a\u0947\u091c \u092a\u0930 \u0915\u092e \u0938\u0947 \u0915\u092e \u090f\u0915 \u0938\u0915\u094d\u0930\u093f\u092f \u091f\u0947\u092e\u094d\u092a\u0932\u0947\u091f \u0905\u0935\u0936\u094d\u092f \u0939\u094b\u0964",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS:
                    "\u0906\u092a\u0915\u0940 \u0938\u093e\u0907\u091f \u0915\u0947 \u092a\u093e\u0938 \u0915\u094b\u0908 CRM \u092b\u0949\u0930\u094d\u092e \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u092f\u0939\u093e\u0901 \u0915\u0943\u092a\u092f\u093e \u091c\u093e\u0901\u091a \u0932\u0947\u0902 \u0915\u093f \u0915\u094d\u092f\u093e \u0022Bitrix24 \u0907\u0902\u091f\u0940\u0917\u094d\u0930\u0947\u0936\u0928\u0022 (b24connector) \u092e\u0949\u0921\u094d\u092f\u0942\u0932 \u0907\u0902\u0938\u094d\u091f\u0949\u0932 \u0939\u0948: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003E\u0938\u0947\u091f\u093f\u0902\u0917 \u003E \u0938\u093f\u0938\u094d\u091f\u092e \u0938\u0947\u091f\u093f\u0902\u0917 \u003E \u092e\u0949\u0921\u094d\u092f\u0942\u0932\u003C/a\u003E\u0964 \u092f\u0939 \u092d\u0940 \u091c\u093e\u0901\u091a\u0947\u0902 \u0915\u093f \u0915\u094d\u092f\u093e \u0906\u092a\u0915\u093e Bitrix24 \u092a\u094b\u0930\u094d\u091f\u0932 \u0022\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/settings.php?mid=b24connector\u0022\u003E\u0915\u094d\u0932\u093e\u0907\u0902\u091f \u0915\u092e\u094d\u092f\u0941\u0928\u093f\u0915\u0947\u0936\u0928\u003C/a\u003E\u0022 \u0938\u0947\u091f\u093f\u0902\u0917 \u092e\u0947\u0902 \u0932\u093f\u0902\u0915 \u0939\u0948\u0964",
            },
            vn: {
                LANDING_NAVBAR_MODAL_ALERT: "Ch\u1ebf \u0111\u1ed9 ch\u1ec9nh s\u1eeda.\u003Cbr\u003EKh\u1ed1i n\u00e0y s\u1ebd ho\u1ea1t \u0111\u1ed9ng t\u1ed1t trong ch\u1ebf \u0111\u1ed9 xem tr\u01b0\u1edbc.",
                LANDING_NAVBAR_TOGGLER_HIDE: "Thu h\u1eb9p",
                LANDING_NAVBAR_TOGGLER_SHOW: "M\u1edf r\u1ed9ng",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "Vui l\u00f2ng li\u00ean h\u1ec7 B\u1ed9 ph\u1eadn H\u1ed7 tr\u1ee3",
                LANDING_BLOCK_WEBFORM_ERROR: "L\u1ed7i t\u1ea1o bi\u1ec3u m\u1eabu",
                LANDING_BLOCK_WEBFORM_NO_FORM: "Kh\u00f4ng c\u00f3 bi\u1ec3u m\u1eabu CRM \u0111ang ho\u1ea1t \u0111\u1ed9ng n\u00e0o",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "Website c\u1ee7a b\u1ea1n kh\u00f4ng c\u00f3 bi\u1ec3u m\u1eabu CRM n\u00e0o. H\u00e3y \u0111\u1ea3m b\u1ea3o c\u00f3 \u00edt nh\u1ea5t m\u1ed9t khu\u00f4n m\u1eabu ho\u1ea1t \u0111\u1ed9ng tr\u00ean trang \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E Bi\u1ec3u m\u1eabu CRM\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS:
                    "Website c\u1ee7a b\u1ea1n kh\u00f4ng c\u00f3 bi\u1ec3u m\u1eabu CRM n\u00e0o. Ki\u1ec3m tra li\u1ec7u m\u00f4-\u0111un \u0022Bitrix24 Integration\u0022 (b24connector) c\u00f3 \u0111\u01b0\u1ee3c c\u00e0i \u0111\u1eb7t \u1edf \u0111\u00e2y hay kh\u00f4ng: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003EC\u00e0i \u0111\u1eb7t \u003E C\u00e0i \u0111\u1eb7t H\u1ec7 th\u1ed1ng \u003E M\u00f4-\u0111un\u003C/a\u003E. \u0110\u1ed3ng th\u1eddi, h\u00e3y ki\u1ec3m tra li\u1ec7u c\u1ed5ng th\u00f4ng tin Bitrix24 c\u1ee7a b\u1ea1n c\u00f3 \u0111\u01b0\u1ee3c li\u00ean k\u1ebft trong c\u00e0i \u0111\u1eb7t \u0022\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/settings.php?mid=b24connector\u0022\u003EGiao ti\u1ebfp Kh\u00e1ch h\u00e0ng\u003C/a\u003E\u0022 hay kh\u00f4ng.",
            },
            fr: {
                LANDING_NAVBAR_MODAL_ALERT: "Mode \u00e9dition.\u003Cbr\u003ELe bloc sera compl\u00e8tement fonctionnel en mode aper\u00e7u.",
                LANDING_NAVBAR_TOGGLER_HIDE: "R\u00e9duire",
                LANDING_NAVBAR_TOGGLER_SHOW: "D\u00e9velopper",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "Veuillez contacter l\u0027assistance",
                LANDING_BLOCK_WEBFORM_ERROR: "Erreur lors de la cr\u00e9ation du formulaire",
                LANDING_BLOCK_WEBFORM_NO_FORM: "Aucun formulaire CRM n\u0027est actif",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "Votre site n\u0027a pas de formulaire CRM. Assurez-vous qu\u0027au moins un mod\u00e8le soit actif dans la page \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E Formulaires CRM\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS:
                    "Votre site n\u0027a pas de formulaire CRM. V\u00e9rifiez sur le module \u00ab\u00a0Bitrix24 Integration\u00a0\u00bb (b24connector) est install\u00e9 ici : \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003EParam\u00e8tres \u003E Param\u00e8tres du syst\u00e8me \u003E Modules\u003C/a\u003E. V\u00e9rifiez \u00e9galement si votre portail Bitrix24 est li\u00e9 dans les param\u00e8tres \u00ab\u00a0\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/settings.php?mid=b24connector\u0022\u003ECommunications du client\u003C/a\u003E\u00a0\u00bb.",
            },
            la: {
                LANDING_NAVBAR_MODAL_ALERT: "Modo de edici\u00f3n.\u003Cbr\u003EEl bloque ser\u00e1 completamente funcional en modo de vista previa.",
                LANDING_NAVBAR_TOGGLER_HIDE: "Contraer",
                LANDING_NAVBAR_TOGGLER_SHOW: "Expandir",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "P\u00f3ngase en contacto con el servicio de asistencia",
                LANDING_BLOCK_WEBFORM_ERROR: "Error al crear el formulario",
                LANDING_BLOCK_WEBFORM_NO_FORM: "No hay formularios activos del CRM",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "Su sitio web no tiene ning\u00fan formulario del CRM. Aseg\u00farese de que haya al menos una plantilla activa en el \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E Formularios del CRM\u003C/a\u003E page.",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS:
                    "Su sitio web no tiene ning\u00fan formulario del CRM. Compruebe si el m\u00f3dulo \u0022Bitrix24 Integration\u0022 (b24connector) est\u00e1 instalado aqu\u00ed: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003EConfiguraciones \u003E Configuraci\u00f3n del Sistema \u003E M\u00f3dulos\u003C/a\u003E. Tambi\u00e9n verifique que su portal Bitrix24 est\u00e9 vinculado en el \u0022\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/settings.php?mid=b24connector\u0022\u003EComunicaciones del cliente\u003C/a\u003E\u0022 ajustes.",
            },
            tr: {
                LANDING_NAVBAR_MODAL_ALERT: "D\u00fczenleme modu.\u003Cbr\u003EBlok, \u00f6n izleme modunda tam olarak i\u015flevsel olacakt\u0131r.",
                LANDING_NAVBAR_TOGGLER_HIDE: "Daralt",
                LANDING_NAVBAR_TOGGLER_SHOW: "Geni\u015fletin",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "L\u00fctfen Yard\u0131m Masas\u0131 ile ileti\u015fime ge\u00e7in",
                LANDING_BLOCK_WEBFORM_ERROR: "Form olu\u015ftururken bir hata olu\u015ftu",
                LANDING_BLOCK_WEBFORM_NO_FORM: "Aktif CRM formlar\u0131 yok",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "Sitenizde CRM formlar\u0131 yok. \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM\u003E CRM Formlar\u0131\u003C/a\u003E sayfas\u0131nda en az bir aktif \u015fablonunuzun oldu\u011fundan emin olun.",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS:
                    "Sitenizde CRM formlar\u0131 yok. Buradan \u0022Bitrix24 Integration\u0022 (b24connector) mod\u00fcl\u00fcn\u00fcn y\u00fckl\u00fc olup olmad\u0131\u011f\u0131n\u0131 kontrol edin: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003EAyarlar\u003E Sistem Ayarlar\u0131\u003E Mod\u00fcller\u003C/a\u003E. Ayr\u0131ca, ayarlardan Bitrix24 portal\u0131n\u0131z\u0131n \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/settings.php?mid=b24connector\u0022\u003EM\u00fc\u015fteri \u0130leti\u015fimi\u003C/a\u003Ene ba\u011fl\u0131 oldu\u011fundan emin olun.",
            },
            en: {
                LANDING_NAVBAR_MODAL_ALERT: "Edit mode.\u003Cbr\u003EThe block will be fully functional in preview mode.",
                LANDING_NAVBAR_TOGGLER_HIDE: "Collapse ",
                LANDING_NAVBAR_TOGGLER_SHOW: "Expand",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "Please contact the Helpdesk",
                LANDING_BLOCK_WEBFORM_ERROR: "Error creating form",
                LANDING_BLOCK_WEBFORM_NO_FORM: "There are no active CRM forms",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "Your site does not have any CRM forms. Make sure there is at least one active template on the \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E CRM Forms\u003C/a\u003E page.",
            },
            de: {
                LANDING_NAVBAR_MODAL_ALERT: "Bearbeitungsmodus.\u003Cbr\u003EDer Block wird im Vorschaumodus voll funktionsf\u00e4hig sein.",
                LANDING_NAVBAR_TOGGLER_HIDE: "Minimieren\u00a0",
                LANDING_NAVBAR_TOGGLER_SHOW: "Maximieren",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "Bitte kontaktieren Sie den Helpdesk",
                LANDING_BLOCK_WEBFORM_ERROR: "Fehler beim Erstellen des Formulars",
                LANDING_BLOCK_WEBFORM_NO_FORM: "Es gibt keine aktiven Online-Formulare",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "Auf Ihrer Website gibt es keine Onlineformulare. Stellen Sie bitte sicher, dass das Modul Bitrix24 Connector hier installiert ist: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; Systemeinstellungen \u0026mdash; Module\u003C/a\u003E. Au\u00dferdem  muss Ihr Bitrix24 mit Kommunikationskan\u00e4len hier verbunden sein: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EKommunikation mit Kunden\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "Ihre Website hat keine Online-Formulare. Stellen Sie sicher, es gibt mindestens eine aktive Vorlage auf der Seite \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E Online-Formulare\u003C/a\u003E.",
            },
            ms: {
                LANDING_NAVBAR_MODAL_ALERT: "Mod sunting.\u003Cbr\u003EBlok akan berfungsi sepenuhnya dalam mod pratonton.",
                LANDING_NAVBAR_TOGGLER_HIDE: "Runtuh",
                LANDING_NAVBAR_TOGGLER_SHOW: "Memperluas",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "Sila hubungi Meja Bantuan",
                LANDING_BLOCK_WEBFORM_ERROR: "Ralat mencipta borang",
                LANDING_BLOCK_WEBFORM_NO_FORM: "Tiada borang CRM aktif",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "Tapak anda tidak mempunyai sebarang borang CRM. Pastikan terdapat sekurang-kurangnya satu templat aktif di halaman \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E Borang CRM\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS:
                    "Tapak anda tidak mempunyai sebarang borang CRM. Semak sama ada modul \u0022Integrasi Bitrix24\u0022 (b24connector) dipasang di sini: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ETetapan\u003E Tetapan Sistem\u003E Modul\u003C/a\u003E. Semak juga bahawa portal Bitrix24 anda dihubungkan dalam tetapan \u0022\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/settings.php?mid=b24connector\u0022\u003EKomunikasi Pelanggan\u003C/a\u003E\u0022.",
            },
            tc: {
                LANDING_NAVBAR_MODAL_ALERT: "\u7de8\u8f2f\u6a21\u5f0f\u3002\u003Cbr\u003E\u8a72\u6a21\u7d44\u5c07\u5728\u9810\u89bd\u6a21\u5f0f\u4e0b\u5b8c\u5168\u8d77\u4f5c\u7528\u3002",
                LANDING_NAVBAR_TOGGLER_HIDE: "\u647a\u758a",
                LANDING_NAVBAR_TOGGLER_SHOW: "\u5c55\u958b",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "\u8acb\u806f\u7e6b\u670d\u52d9\u53f0",
                LANDING_BLOCK_WEBFORM_ERROR: "\u5efa\u7acb\u8868\u55ae\u6642\uff0c\u767c\u751f\u932f\u8aa4",
                LANDING_BLOCK_WEBFORM_NO_FORM: "\u6c92\u6709\u6d3b\u52d5\u7684 CRM \u8868\u55ae",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "\u60a8\u7684\u7db2\u7ad9\u6c92\u6709\u4efb\u4f55 CRM \u8868\u55ae\u3002\u8acb\u78ba\u4fdd\u5728\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E CRM \u8868\u55ae\u003C/a\u003E \u9801\u9762\u4e0a\uff0c\u81f3\u5c11\u6709\u4e00\u500b\u6d3b\u52d5\u7684\u7bc4\u672c\u3002",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS:
                    "\u60a8\u7684\u7db2\u7ad9\u6c92\u6709\u4efb\u4f55 CRM \u8868\u55ae\u3002\u6aa2\u67e5\u662f\u5426\u5b89\u88dd\u4e86\u300cBitrix24 \u6574\u5408\u300d(b24connector) \u6a21\u7d44\uff1a\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003E \u8a2d\u5b9a \u003E \u7cfb\u7d71\u8a2d\u5b9a \u003E \u6a21\u7d44\u003C/a\u003E\u3002\u53e6\u8acb\u6aa2\u67e5\u60a8\u7684 Bitrix24 \u5165\u53e3\u7db2\u7ad9\u662f\u5426\u5728\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/settings.php?mid=b24connector\u0022\u003E\u5ba2\u6236\u6e9d\u901a\u003C/a\u003E\u201d\u8a2d\u5b9a\u4e2d\u5df2\u9023\u7d50\u3002",
            },
            ja: {
                LANDING_NAVBAR_MODAL_ALERT:
                    "\u7de8\u96c6\u30e2\u30fc\u30c9\u3002\u003Cbr\u003E\u3053\u306e\u30d6\u30ed\u30c3\u30af\u306f\u30d7\u30ec\u30d3\u30e5\u30fc\u30e2\u30fc\u30c9\u3067\u5b8c\u5168\u306b\u6a5f\u80fd\u3057\u307e\u3059\u3002",
                LANDING_NAVBAR_TOGGLER_HIDE: "\u6298\u308a\u7573\u3080",
                LANDING_NAVBAR_TOGGLER_SHOW: "\u66f4\u306b\u8868\u793a",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "\u30d8\u30eb\u30d7\u30c7\u30b9\u30af\u306b\u9023\u7d61\u3057\u3066\u304f\u3060\u3055\u3044",
                LANDING_BLOCK_WEBFORM_ERROR: "\u30d5\u30a9\u30fc\u30e0\u3092\u4f5c\u6210\u4e2d\u306b\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f",
                LANDING_BLOCK_WEBFORM_NO_FORM: "\u30a2\u30af\u30c6\u30a3\u30d6\u306aCRM\u30d5\u30a9\u30fc\u30e0\u306f\u3042\u308a\u307e\u305b\u3093",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "\u30b5\u30a4\u30c8\u306b\u306fCRM\u30d5\u30a9\u30fc\u30e0\u304c\u3042\u308a\u307e\u305b\u3093\u3002\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E CRM\u30d5\u30a9\u30fc\u30e0\u003C/a\u003E \u30da\u30fc\u30b8\u306b\u30a2\u30af\u30c6\u30a3\u30d6\u306a\u30c6\u30f3\u30d7\u30ec\u30fc\u30c8\u304c\u5c11\u306a\u304f\u3068\u30821\u3064\u3042\u308b\u3053\u3068\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS:
                    "\u3042\u306a\u305f\u306e\u30b5\u30a4\u30c8\u306b\u306fCRM\u30d5\u30a9\u30fc\u30e0\u304c\u3042\u308a\u307e\u305b\u3093\u3002\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003E[\u8a2d\u5b9a] \u003E [\u30b7\u30b9\u30c6\u30e0\u8a2d\u5b9a] \u003E [\u30e2\u30b8\u30e5\u30fc\u30eb]\u003C/a\u003E \u3067\u3001\u0022Bitrix24 Integration\u0022\uff08b24connector\uff09\u30e2\u30b8\u30e5\u30fc\u30eb\u304c\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3055\u308c\u3066\u3044\u308b\u304b\u3069\u3046\u304b\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002\u307e\u305f\u3001Bitrix24\u30dd\u30fc\u30bf\u30eb\u304c \u0022\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/settings.php?mid=b24connector\u0022\u003E\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u901a\u4fe1\u003C/a\u003E\u0022 \u8a2d\u5b9a\u3067\u30ea\u30f3\u30af\u3055\u308c\u3066\u3044\u308b\u3053\u3068\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
            },
            sc: {
                LANDING_NAVBAR_MODAL_ALERT: "\u7f16\u8f91\u6a21\u5f0f\u3002\u003Cbr\u003E\u8be5\u5757\u4f1a\u5728\u9884\u89c8\u6a21\u5f0f\u4e0b\u5b8c\u5168\u6b63\u5e38\u8fd0\u884c\u3002",
                LANDING_NAVBAR_TOGGLER_HIDE: "\u6298\u53e0",
                LANDING_NAVBAR_TOGGLER_SHOW: "\u5c55\u5f00",
                LANDING_BLOCK_WEBFORM_CONNECT_SUPPORT: "\u8bf7\u8054\u7cfb\u5e2e\u52a9\u53f0",
                LANDING_BLOCK_WEBFORM_ERROR: "\u521b\u5efa\u8868\u5355\u65f6\u51fa\u9519",
                LANDING_BLOCK_WEBFORM_NO_FORM: "\u6ca1\u6709\u6d3b\u52a8\u7684 CRM \u8868\u5355",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS_NEW:
                    "There are no CRM forms on your site. Please check that the Bitrix24 Connector module is installed here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003ESettings \u0026mdash; System Settings \u0026mdash; Modules\u003C/a\u003E. Also check your Bitrix24 is connected to communications channels here: \u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/b24connector_b24connector.php\u0022\u003EClient Communications\u003C/a\u003E.",
                LANDING_BLOCK_WEBFORM_NO_FORM_CP:
                    "\u60a8\u7684\u7f51\u7ad9\u6ca1\u6709\u4efb\u4f55CRM\u8868\u5355\u3002\u8bf7\u786e\u4fdd\u5728\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/crm/webform\u0022\u003ECRM \u003E CRM \u8868\u5355\u003C/a\u003E \u9875\u9762\u4e0a\u81f3\u5c11\u6709\u4e00\u4e2a\u6d3b\u52a8\u7684\u6a21\u677f\u3002",
                LANDING_BLOCK_WEBFORM_NO_FORM_BUS:
                    "\u60a8\u7684\u7f51\u7ad9\u6ca1\u6709\u4efb\u4f55CRM\u8868\u5355\u3002\u68c0\u67e5\u662f\u5426\u5b89\u88c5\u4e86\u201cBitrix24 \u96c6\u6210\u201d\uff08b24connector\uff09\u6a21\u5757\uff1a\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/module_admin.php\u0022\u003E \u8bbe\u7f6e \u003E \u7cfb\u7edf\u8bbe\u7f6e \u003E \u6a21\u5757\u003C/a\u003E\u3002\u53e6\u8bf7\u68c0\u67e5\u60a8\u7684Bitrix24\u95e8\u6237\u7f51\u7ad9\u662f\u5426\u5728\u003Ca target=\u0022_blank\u0022 class=\u0022landing-trusted-link\u0022 href=\u0022/bitrix/admin/settings.php?mid=b24connector\u0022\u003E\u5ba2\u6237\u6c9f\u901a\u003C/a\u003E\u201d\u8bbe\u7f6e\u4e2d\u5df2\u94fe\u63a5\u3002",
            },
        };

        (function () {
            "use strict";
            if (!webPacker) {
                return;
            }
            if (!window.BX || !BX.message) {
                return;
            }
            webPacker.getModules().forEach(function (e) {
                var n = e.messages || {};
                var r = BX.message("LANGUAGE_ID");
                if (n[r]) {
                    n = n[r];
                }
                for (var i in n) {
                    if (!n.hasOwnProperty(i)) {
                        continue;
                    }
                    var s = n[i];
                    if (typeof s === "undefined" || s === "") {
                        continue;
                    }
                    BX.message[i] = s;
                }
            });
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/landing/webpackassets/message_loader.map.js

        (function (t, e) {
            "use strict";
            if ("IntersectionObserver" in t && "IntersectionObserverEntry" in t && "intersectionRatio" in t.IntersectionObserverEntry.prototype) {
                if (!("isIntersecting" in t.IntersectionObserverEntry.prototype)) {
                    Object.defineProperty(t.IntersectionObserverEntry.prototype, "isIntersecting", {
                        get: function () {
                            return this.intersectionRatio > 0;
                        },
                    });
                }
                return;
            }
            var r = [];
            function n(t) {
                this.time = t.time;
                this.target = t.target;
                this.rootBounds = t.rootBounds;
                this.boundingClientRect = t.boundingClientRect;
                this.intersectionRect = t.intersectionRect || f();
                this.isIntersecting = !!t.intersectionRect;
                var e = this.boundingClientRect;
                var r = e.width * e.height;
                var n = this.intersectionRect;
                var i = n.width * n.height;
                if (r) {
                    this.intersectionRatio = i / r;
                } else {
                    this.intersectionRatio = this.isIntersecting ? 1 : 0;
                }
            }
            function i(t, e) {
                var r = e || {};
                if (typeof t !== "function") {
                    throw new Error("callback must be a function");
                }
                if (r.root && r.root.nodeType !== 1) {
                    throw new Error("root must be an Element");
                }
                this._checkForIntersections = s(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);
                this._callback = t;
                this._observationTargets = [];
                this._queuedEntries = [];
                this._rootMarginValues = this._parseRootMargin(r.rootMargin);
                this.thresholds = this._initThresholds(r.threshold);
                this.root = r.root || null;
                this.rootMargin = this._rootMarginValues
                    .map(function (t) {
                        return t.value + t.unit;
                    })
                    .join(" ");
            }
            i.prototype.THROTTLE_TIMEOUT = 100;
            i.prototype.POLL_INTERVAL = null;
            i.prototype.USE_MUTATION_OBSERVER = true;
            i.prototype.observe = function (t) {
                var e = this._observationTargets.some(function (e) {
                    return e.element === t;
                });
                if (e) {
                    return;
                }
                if (!(t && t.nodeType === 1)) {
                    throw new Error("target must be an Element");
                }
                this._registerInstance();
                this._observationTargets.push({ element: t, entry: null });
                this._monitorIntersections();
                this._checkForIntersections();
            };
            i.prototype.unobserve = function (t) {
                this._observationTargets = this._observationTargets.filter(function (e) {
                    return e.element !== t;
                });
                if (!this._observationTargets.length) {
                    this._unmonitorIntersections();
                    this._unregisterInstance();
                }
            };
            i.prototype.disconnect = function () {
                this._observationTargets = [];
                this._unmonitorIntersections();
                this._unregisterInstance();
            };
            i.prototype.takeRecords = function () {
                var t = this._queuedEntries.slice();
                this._queuedEntries = [];
                return t;
            };
            i.prototype._initThresholds = function (t) {
                var e = t || [0];
                if (!Array.isArray(e)) {
                    e = [e];
                }
                return e.sort().filter(function (t, e, r) {
                    if (typeof t !== "number" || isNaN(t) || t < 0 || t > 1) {
                        throw new Error("threshold must be a number between 0 and 1 inclusively");
                    }
                    return t !== r[e - 1];
                });
            };
            i.prototype._parseRootMargin = function (t) {
                var e = t || "0px";
                var r = e.split(/\s+/).map(function (t) {
                    var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
                    if (!e) {
                        throw new Error("rootMargin must be specified in pixels or percent");
                    }
                    return { value: parseFloat(e[1]), unit: e[2] };
                });
                r[1] = r[1] || r[0];
                r[2] = r[2] || r[0];
                r[3] = r[3] || r[1];
                return r;
            };
            i.prototype._monitorIntersections = function () {
                if (!this._monitoringIntersections) {
                    this._monitoringIntersections = true;
                    if (this.POLL_INTERVAL) {
                        this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL);
                    } else {
                        h(t, "resize", this._checkForIntersections, true);
                        h(e, "scroll", this._checkForIntersections, true);
                        if (this.USE_MUTATION_OBSERVER && "MutationObserver" in t) {
                            this._domObserver = new MutationObserver(this._checkForIntersections);
                            this._domObserver.observe(e, { attributes: true, childList: true, characterData: true, subtree: true });
                        }
                    }
                }
            };
            i.prototype._unmonitorIntersections = function () {
                if (this._monitoringIntersections) {
                    this._monitoringIntersections = false;
                    clearInterval(this._monitoringInterval);
                    this._monitoringInterval = null;
                    c(t, "resize", this._checkForIntersections, true);
                    c(e, "scroll", this._checkForIntersections, true);
                    if (this._domObserver) {
                        this._domObserver.disconnect();
                        this._domObserver = null;
                    }
                }
            };
            i.prototype._checkForIntersections = function () {
                var t = this._rootIsInDom();
                var e = t ? this._getRootRect() : f();
                this._observationTargets.forEach(function (r) {
                    var i = r.element;
                    var s = u(i);
                    var h = this._rootContainsTarget(i);
                    var c = r.entry;
                    var a = t && h && this._computeTargetAndRootIntersection(i, e);
                    var f = (r.entry = new n({ time: o(), target: i, boundingClientRect: s, rootBounds: e, intersectionRect: a }));
                    if (!c) {
                        this._queuedEntries.push(f);
                    } else if (t && h) {
                        if (this._hasCrossedThreshold(c, f)) {
                            this._queuedEntries.push(f);
                        }
                    } else {
                        if (c && c.isIntersecting) {
                            this._queuedEntries.push(f);
                        }
                    }
                }, this);
                if (this._queuedEntries.length) {
                    this._callback(this.takeRecords(), this);
                }
            };
            i.prototype._computeTargetAndRootIntersection = function (r, n) {
                if (t.getComputedStyle(r).display === "none") {
                    return;
                }
                var i = u(r);
                var o = p(r);
                var s = false;
                while (!s) {
                    var h = null;
                    var c = o.nodeType === 1 ? t.getComputedStyle(o) : {};
                    if (c.display == "none") {
                        return;
                    }
                    if (o === this.root || o === e) {
                        s = true;
                        h = n;
                    } else {
                        if (o != e.body && o != e.documentElement && c.overflow != "visible") {
                            h = u(o);
                        }
                    }
                    if (h) {
                        i = a(h, i);
                        if (!i) {
                            break;
                        }
                    }
                    o = p(o);
                }
                return i;
            };
            i.prototype._getRootRect = function () {
                var t;
                if (this.root) {
                    t = u(this.root);
                } else {
                    var r = e.documentElement;
                    var n = e.body;
                    t = { top: 0, left: 0, right: r.clientWidth || n.clientWidth, width: r.clientWidth || n.clientWidth, bottom: r.clientHeight || n.clientHeight, height: r.clientHeight || n.clientHeight };
                }
                return this._expandRectByRootMargin(t);
            };
            i.prototype._expandRectByRootMargin = function (t) {
                var e = this._rootMarginValues.map(function (e, r) {
                    return e.unit === "px" ? e.value : (e.value * (r % 2 ? t.width : t.height)) / 100;
                });
                var r = { top: t.top - e[0], right: t.right + e[1], bottom: t.bottom + e[2], left: t.left - e[3] };
                r.width = r.right - r.left;
                r.height = r.bottom - r.top;
                return r;
            };
            i.prototype._hasCrossedThreshold = function (t, e) {
                var r = t && t.isIntersecting ? t.intersectionRatio || 0 : -1;
                var n = e.isIntersecting ? e.intersectionRatio || 0 : -1;
                if (r === n) {
                    return;
                }
                for (var i = 0; i < this.thresholds.length; i++) {
                    var o = this.thresholds[i];
                    if (o == r || o == n || o < r !== o < n) {
                        return true;
                    }
                }
            };
            i.prototype._rootIsInDom = function () {
                return !this.root || l(e, this.root);
            };
            i.prototype._rootContainsTarget = function (t) {
                return l(this.root || e, t);
            };
            i.prototype._registerInstance = function () {
                if (r.indexOf(this) < 0) {
                    r.push(this);
                }
            };
            i.prototype._unregisterInstance = function () {
                var t = r.indexOf(this);
                if (t !== -1) {
                    r.splice(t, 1);
                }
            };
            function o() {
                return t.performance && performance.now && performance.now();
            }
            function s(t, e) {
                var r = null;
                return function () {
                    if (!r) {
                        r = setTimeout(function () {
                            t();
                            r = null;
                        }, e);
                    }
                };
            }
            function h(t, e, r, n) {
                if (typeof t.addEventListener == "function") {
                    t.addEventListener(e, r, n || false);
                } else if (typeof t.attachEvent === "function") {
                    t.attachEvent("on" + e, r);
                }
            }
            function c(t, e, r, n) {
                if (typeof t.removeEventListener === "function") {
                    t.removeEventListener(e, r, n || false);
                } else if (typeof t.detatchEvent === "function") {
                    t.detatchEvent("on" + e, r);
                }
            }
            function a(t, e) {
                var r = Math.max(t.top, e.top);
                var n = Math.min(t.bottom, e.bottom);
                var i = Math.max(t.left, e.left);
                var o = Math.min(t.right, e.right);
                var s = o - i;
                var h = n - r;
                return s >= 0 && h >= 0 && { top: r, bottom: n, left: i, right: o, width: s, height: h };
            }
            function u(t) {
                var e;
                try {
                    e = t.getBoundingClientRect();
                } catch (t) {}
                if (!e) {
                    return f();
                }
                if (!(e.width && e.height)) {
                    e = { top: e.top, right: e.right, bottom: e.bottom, left: e.left, width: e.right - e.left, height: e.bottom - e.top };
                }
                return e;
            }
            function f() {
                return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
            }
            function l(t, e) {
                var r = e;
                while (r) {
                    if (r === t) {
                        return true;
                    }
                    r = p(r);
                }
                return false;
            }
            function p(t) {
                var e = t.parentNode;
                if (e && e.nodeType == 11 && e.host) {
                    return e.host;
                }
                return e;
            }
            t.IntersectionObserver = i;
            t.IntersectionObserverEntry = n;
        })(window, document);

        (function () {
            "use strict";
            BX.namespace("BX.Landing");
            BX.Landing.Utils = function () {};
            BX.Landing.Utils.AnalyticLabel = function (n, e) {
                if (typeof e === "undefined") {
                    e = null;
                }
                BX.ajax({ url: "/bitrix/images/landing/analytics/pixel.gif?action=" + n + (e ? "&value=" + e : "") + "&time=" + new Date().getTime() });
            };
            BX.Landing.Utils.Show = function (n) {
                return new Promise(function (e) {
                    if (!!n && !BX.Landing.Utils.isShown(n)) {
                        BX.Landing.Utils.onAnimationEnd(n).then(function (t) {
                            n.dataset.isShown = true;
                            e(t);
                        });
                        requestAnimationFrame(function () {
                            n.hidden = false;
                            n.classList.remove("landing-ui-hide");
                            n.classList.add("landing-ui-show");
                        });
                    } else {
                        e();
                    }
                });
            };
            BX.Landing.Utils.isShown = function (n) {
                return n.dataset.isShown === "true";
            };
            BX.Landing.Utils.Hide = function (n) {
                return new Promise(function (e) {
                    if (!!n && BX.Landing.Utils.isShown(n)) {
                        BX.Landing.Utils.onAnimationEnd(n).then(function (t) {
                            n.hidden = true;
                            n.dataset.isShown = false;
                            e(t);
                        });
                        requestAnimationFrame(function () {
                            n.classList.remove("landing-ui-show");
                            n.classList.add("landing-ui-hide");
                        });
                    } else {
                        e();
                    }
                });
            };
            BX.Landing.Utils.isValidElementId = function (n) {
                var e = new RegExp("^[A-Za-z]+[\\w\\-\\:\\.]*$");
                return e.test(n);
            };
            BX.Landing.Utils.ignorePromiseDecorator = function (n) {
                var e = function () {};
                return function () {
                    n.apply(null, arguments).then(e);
                };
            };
            BX.Landing.Utils.appendHTML = function (n, e) {
                n.innerHTML = n.innerHTML + e;
            };
            BX.Landing.Utils.getCSSSelector = function (n) {
                var e = [];
                while (n.parentNode) {
                    if (n.id) {
                        e.unshift("#" + n.id);
                        break;
                    } else {
                        if (n === n.ownerDocument.documentElement) {
                            e.unshift(n.tagName.toLowerCase());
                        } else {
                            for (var t = 1, i = n; i.previousElementSibling; i = i.previousElementSibling, t++) {}
                            e.unshift(n.tagName.toLowerCase() + ":nth-child(" + t + ")");
                        }
                        n = n.parentNode;
                    }
                }
                return e.join(" > ");
            };
            BX.Landing.Utils.onTransitionEnd = function (n) {
                n = BX.type.isArray(n) ? n : [n];
                return Promise.all(
                    n.map(function (n) {
                        return new Promise(function (e) {
                            n.addEventListener("webkitTransitionEnd", e);
                            n.addEventListener("transitionend", e);
                            n.addEventListener("msTransitionEnd", e);
                            n.addEventListener("oTransitionEnd", e);
                            return e;
                        }).then(function (e) {
                            n.removeEventListener("webkitTransitionEnd", e);
                            n.removeEventListener("transitionend", e);
                            n.removeEventListener("msTransitionEnd", e);
                            n.removeEventListener("oTransitionEnd", e);
                        });
                    })
                );
            };
            BX.Landing.Utils.onAnimationEnd = function (n, e) {
                return new Promise(function (t) {
                    var i = function (r) {
                        if (!e || r.animationName === e) {
                            t(r);
                            n.removeEventListener("animationend", i);
                            n.removeEventListener("oAnimationEnd", i);
                            n.removeEventListener("webkitAnimationEnd", i);
                        }
                    };
                    n.addEventListener("animationend", i);
                    n.addEventListener("oAnimationEnd", i);
                    n.addEventListener("webkitAnimationEnd", i);
                });
            };
            BX.Landing.Utils.htmlToElement = function (n) {
                return BX.create("div", { html: n }).firstElementChild;
            };
            BX.Landing.Utils.htmlToFragment = function (n) {
                var e = BX.create("div", { html: n });
                var t = document.createDocumentFragment();
                [].slice.call(e.children).forEach(function (n) {
                    t.appendChild(n);
                });
                return t;
            };
            BX.Landing.Utils.deepFreeze = function (n) {
                Object.freeze(n);
                Object.keys(n).forEach(function (e) {
                    if (!!n[e] && (typeof n[e] === "object" || typeof n[e] === "function")) {
                        BX.Landing.Utils.deepFreeze(n[e]);
                    }
                });
                return n;
            };
            BX.Landing.Utils.insert = function (n, e, t) {
                if (t === 0) {
                    BX.prepend(e, n);
                } else if (t > 0 && t <= n.children.length - 1) {
                    n.insertBefore(e, n.children[t]);
                } else {
                    n.appendChild(e);
                }
            };
            BX.Landing.Utils.Matchers = {
                youtube: new RegExp("(youtube\\.com|youtu\\.be|youtube\\-nocookie\\.com)\\/(watch\\?(.*&)?v=|v\\/|u\\/|embed\\/?)?(videoseries\\?list=(.*)|[\\w-]{11}|\\?listType=(.*)&list=(.*))(.*)"),
                vimeo: new RegExp("^.+vimeo.com\\/(.*\\/)?([\\d]+)(.*)?"),
                vine: new RegExp("vine.co\\/v\\/([a-zA-Z0-9\\?\\=\\-]+)"),
                instagram: new RegExp("(instagr\\.am|instagram\\.com)\\/p\\/([a-zA-Z0-9_\\-]+)\\/?"),
                googleMapsSearch: new RegExp("(maps\\.)?google\\.([a-z]{2,3}(\\.[a-z]{2})?)\\/(maps\\/search\\/)(.*)", "i"),
                googleMapsPlace: new RegExp("(maps\\.)?google\\.([a-z]{2,3}(\\.[a-z]{2})?)\\/(((maps\\/(place\\/(.*)\\/)?\\@(.*),(\\d+.?\\d+?)z))|(\\?ll=))(.*)?", "i"),
                headerTag: new RegExp("^H[1-6]$"),
                russianText: new RegExp("[\u0400-\u04ff]"),
                facebookPages: new RegExp("(?:http://)?(?:www.)?facebook.com/(?:(?:w)*#!/)?(?:pages/)?(?:[w-]*/)*([w-]*)"),
                facebookPosts: new RegExp("^https://www.facebook.com/(photo(.php|s)|permalink.php|media|questions|notes|[^/]+/(activity|posts))[/?].*$"),
                facebookVideos: new RegExp("^(?:(?:https?:)?//)?(?:www.)?facebook.com/[a-z0-9.]+/videos/(?:[a-z0-9.]+/)?([0-9]+)/?(?:\\?.*)?$"),
            };
            BX.Landing.Utils.getURLPreview = function (n) {
                return BX.Landing.Backend.getInstance().action("Utils::getUrlPreview", { url: n });
            };
            BX.Landing.Utils.HTMLToElement = function (n) {
                return BX.create("div", { html: n }).firstElementChild;
            };
            BX.Landing.Utils.getQueryParams = function (n) {
                var e = {};
                if (typeof n === "string") {
                    var t = n.split("?")[1];
                    if (t) {
                        var i = t.split("&");
                        for (var r = 0; r < i.length; r++) {
                            var a = i[r].split("=");
                            if (typeof e[a[0]] === "undefined") {
                                e[a[0]] = decodeURIComponent(a[1]);
                            } else if (typeof e[a[0]] === "string") {
                                e[a[0]] = [e[a[0]], decodeURIComponent(a[1])];
                            } else {
                                e[a[0]].push(decodeURIComponent(a[1]));
                            }
                        }
                    }
                }
                return e;
            };
            BX.Landing.Utils.escapeHtml = function (n) {
                return BX.util.htmlspecialchars(BX.util.htmlspecialcharsback("" + n));
            };
            BX.Landing.Utils.escapeText = function (n) {
                var e = n;
                if (typeof n === "number" || typeof n === "boolean") {
                    e = "" + n;
                } else if (!!n && typeof n === "object") {
                    e = JSON.stringify(n);
                }
                return BX.Landing.Utils.escapeHtml(e);
            };
            BX.Landing.Utils.escapeAttributeValue = function (n) {
                if (BX.Landing.Utils.isPlainObject(n) || BX.Landing.Utils.isArray(n)) {
                    n = JSON.stringify(n);
                }
                return BX.util.jsencode("" + n);
            };
            BX.Landing.Utils.setTextContent = function (n, e) {
                if (typeof e === "string") {
                    var t = n.firstChild;
                    if (t && t === n.lastChild && t.nodeType === Node.TEXT_NODE) {
                        t.nodeValue = e;
                        return;
                    }
                }
                n.textContent = e;
            };
            BX.Landing.Utils.encodeDataValue = function (n) {
                if (BX.Landing.Utils.isPlainObject(n) || BX.Landing.Utils.isArray(n)) {
                    n = JSON.stringify(n);
                } else {
                    if (BX.Landing.Utils.isString(n)) {
                        n = BX.Landing.Utils.escapeHtml(n);
                    }
                }
                return "" + n;
            };
            BX.Landing.Utils.decodeDataValue = function (n) {
                var e = n;
                try {
                    e = JSON.parse(n);
                } catch (t) {
                    e = n;
                }
                if (BX.Landing.Utils.isString(e)) {
                    e = BX.util.htmlspecialcharsback(e);
                }
                return e;
            };
            BX.Landing.Utils.data = function (n, e, t) {
                var i = BX.Landing.Utils.decodeDataValue;
                var r = BX.Landing.Utils.encodeDataValue;
                var a = BX.Landing.Utils.isPlainObject;
                var o = BX.Landing.Utils.isString;
                var s = new RegExp("^data-");
                if (!n) {
                    throw new TypeError("Element is required");
                }
                if (!e) {
                    var l = {};
                    [].forEach.call(n.attributes, function (n) {
                        if (s.test(n.name)) {
                            l[n.name] = i(n.value);
                        }
                    });
                    return l;
                }
                if (o(e)) {
                    e = !s.test(e) ? "data-" + e : e;
                    if (t === undefined) {
                        return i(n.getAttribute(e));
                    }
                    if (t === null) {
                        return n.removeAttribute(e);
                    }
                    return n.setAttribute(e, r(t));
                }
                if (a(e)) {
                    Object.keys(e).forEach(function (t) {
                        BX.Landing.Utils.data(n, t, e[t]);
                    });
                }
            };
            function n(n) {
                n = n || document.body;
                var e = n.ownerDocument || document;
                var t = e.createTreeWalker(n, NodeFilter.SHOW_TEXT, null, false);
                var i = [];
                var r;
                while ((r = t.nextNode())) {
                    i.push(r);
                }
                return i;
            }
            function e(n, e) {
                return n.compareBoundaryPoints(Range.END_TO_START, e) === -1 && n.compareBoundaryPoints(Range.START_TO_END, e) === 1;
            }
            function t(n) {
                var e = n.ownerDocument.createRange();
                try {
                    e.selectNode(n);
                } catch (t) {
                    e.selectNodeContents(n);
                }
                return e;
            }
            function i(n, i) {
                if (n.intersectsNode) {
                    return n.intersectsNode(i);
                } else {
                    return e(n, t(i));
                }
            }
            function r(e) {
                var t = e.commonAncestorContainer;
                var r = n(t.parentNode || t);
                return r.filter(function (n) {
                    return i(e, n) && a(n);
                });
            }
            function a(n) {
                return n.textContent.length > 0;
            }
            function o(n) {
                if (n.parentNode) {
                    n.parentNode.removeChild(n);
                }
            }
            function s(n, e) {
                o(n);
                e.parentNode.insertBefore(n, e);
                o(e);
            }
            function l(n) {
                var e = document.createRange();
                e.selectNodeContents(n);
                s(e.extractContents(), n);
            }
            function u(n) {
                n.forEach(function (n) {
                    var e = n.parentNode;
                    l(n);
                    e.normalize();
                });
            }
            function d(n, e) {
                var t = e.startContainer;
                var i = e.endContainer;
                var r = e.startOffset;
                var a = e.endOffset;
                return function e(o) {
                    var s = document.createRange();
                    var l = n;
                    s.selectNodeContents(o);
                    if (o === t && t.nodeType === 3) {
                        s.setStart(o, r);
                        t = l;
                        r = 0;
                    }
                    if (o === i && i.nodeType === 3) {
                        s.setEnd(o, a);
                        i = l;
                        a = 1;
                    }
                    s.surroundContents(l);
                    return l;
                };
            }
            BX.Landing.Utils.wrapSelection = function (n, e) {
                var t;
                var i;
                var a = {};
                if (typeof e === "undefined") {
                    e = window.getSelection().getRangeAt(0);
                }
                if (e.isCollapsed) {
                    return [];
                }
                if (typeof n === "undefined") {
                    n = "span";
                }
                if (typeof n === "string") {
                    n = document.createElement(n);
                }
                i = d(n, e);
                t = r(e);
                t = t.map(i);
                a.nodes = t;
                a.unwrap = function () {
                    if (this.nodes.length) {
                        u(this.nodes);
                        this.nodes = [];
                    }
                };
                return a;
            };
            BX.Landing.Utils.createRangeFromNode = t;
            BX.Landing.Utils.createSelectionRange = function (e, t, i) {
                var r;
                if (document.createRange && window.getSelection) {
                    r = document.createRange();
                    r.selectNodeContents(e);
                    var a = n(e);
                    var o = false;
                    var s = 0,
                        l;
                    for (var u = 0, d; (d = a[u++]); ) {
                        l = s + d.length;
                        if (!o && t >= s && (t < l || (t === l && u <= a.length))) {
                            r.setStart(d, t - s);
                            o = true;
                        }
                        if (o && i <= l) {
                            r.setEnd(d, i - s);
                            break;
                        }
                        s = l;
                    }
                } else if (document.selection && document.body.createTextRange) {
                    r = document.body.createTextRange();
                    r.moveToElementText(e);
                    r.collapse(true);
                    r.moveEnd("character", i);
                    r.moveStart("character", t);
                }
                return r;
            };
            BX.Landing.Utils.style = function (n, e) {
                return new Promise(function (t) {
                    if (e === null) {
                        requestAnimationFrame(function () {
                            n.style = null;
                            t();
                        });
                    }
                    if (!!e && typeof e === "object") {
                        requestAnimationFrame(function () {
                            Object.keys(e).forEach(function (t) {
                                n.style.setProperty(t, e[t]);
                            });
                            t();
                        });
                    }
                });
            };
            BX.Landing.Utils.translateY = function (n, e) {
                return BX.Landing.Utils.translate("y", n, e);
            };
            BX.Landing.Utils.translateX = function (n, e) {
                return BX.Landing.Utils.translate("x", n, e);
            };
            BX.Landing.Utils.translate = function (n, e, t) {
                void BX.Landing.Utils.style(e, { transition: "transform 200ms ease", transform: "translate" + n.toUpperCase() + "(" + t + "px) translateZ(0)" });
                return BX.Landing.Utils.onTransitionEnd(e);
            };
            BX.Landing.Utils.insertBefore = function (n, e) {
                e.parentElement.insertBefore(n, e);
            };
            BX.Landing.Utils.rect = function (n) {
                return n.getBoundingClientRect();
            };
            BX.Landing.Utils.nextSibling = function (n, e) {
                return e ? BX.findNextSibling(n, { className: e }) : n.nextElementSibling;
            };
            BX.Landing.Utils.prevSibling = function (n, e) {
                return e ? BX.findPreviousSibling(n, { className: e }) : n.previousElementSibling;
            };
            BX.Landing.Utils.join = function () {
                return [].slice.call(arguments).join("");
            };
            BX.Landing.Utils.slice = function (n) {
                return [].slice.call(n);
            };
            BX.Landing.Utils.attr = function (n, e, t) {
                if (BX.Landing.Utils.isString(e)) {
                    if (typeof t === "undefined") {
                        return n.getAttribute(e);
                    }
                    n.setAttribute(e, BX.Landing.Utils.encodeDataValue(t));
                }
                if (BX.Landing.Utils.isPlainObject(e)) {
                    Object.keys(e).forEach(function (t) {
                        if (e[t] === null) {
                            n.removeAttribute(t);
                        } else {
                            n.setAttribute(t, BX.Landing.Utils.encodeDataValue(e[t]));
                        }
                    });
                }
            };
            BX.Landing.Utils.removePanels = function (n) {
                [].slice.call(n.querySelectorAll(".landing-ui-panel")).forEach(function (n) {
                    BX.remove(n);
                });
                return n;
            };
            BX.Landing.Utils.getFileExtension = function (n) {
                var e = "fm";
                var t = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)");
                var i = t.exec(n);
                if (!i || !i[2]) {
                    return "";
                }
                return decodeURIComponent(i[2].replace(/\+/g, " "));
            };
            BX.Landing.Utils.key = {
                isUp: function (n) {
                    return n.keyCode === 38;
                },
                isDown: function (n) {
                    return n.keyCode === 40;
                },
                isRight: function (n) {
                    return n.keyCode === 39;
                },
                isLeft: function (n) {
                    return n.keyCode === 37;
                },
                isEnter: function (n) {
                    return n.keyCode === 13;
                },
                isEscape: function (n) {
                    return n.keyCode === 27;
                },
            };
            BX.Landing.Utils.makeFilterablePopupMenu = function (n) {
                var e = BX.Landing.Utils.append;
                var t = BX.Landing.Utils.prepend;
                var i = BX.Landing.Utils.onCustomEvent;
                var r = BX.Landing.Utils.create;
                var a = BX.Landing.Utils.addClass;
                function o(n) {
                    return n.some(function (n) {
                        return !n.layout.item.hidden;
                    });
                }
                function s(e) {
                    var t = e.currentTarget.value.toLowerCase();
                    n.menuItems.forEach(function (n) {
                        n.layout.item.hidden = !n.text.toLowerCase().includes(t);
                    });
                    d.hidden = o(n.menuItems);
                }
                var l = r("div", { props: { className: "landing-ui-popup-filter" } });
                var u = r("input", { props: { className: "landing-ui-popup-filter-input" }, attrs: { placeholder: BX.Landing.Loc.getMessage("LANDING_MENU_ITEM_FILTER") }, events: { input: s } });
                var d = r("div", {
                    props: { className: "landing-ui-popup-filter-empty" },
                    children: [r("span", { props: { className: "landing-ui-popup-filter-empty-text" }, html: BX.Landing.Loc.getMessage("LANDING_MENU_ITEM_FILTER_EMPTY") })],
                    attrs: { hidden: true },
                });
                e(u, l);
                t(l, n.popupWindow.contentContainer);
                e(d, n.popupWindow.contentContainer);
                a(n.popupWindow.popupContainer, "landing-ui-popup-filterable");
                u.focus();
                i(n.popupWindow, "onAfterPopupShow", function () {
                    requestAnimationFrame(function () {
                        u.focus();
                    });
                });
            };
            BX.Landing.Utils.makeSelectablePopupMenu = function (n) {
                var e = BX.Landing.Utils.addClass;
                var t = BX.Landing.Utils.removeClass;
                var i = BX.Landing.Utils.hasClass;
                var r = BX.Landing.Utils.bind;
                var a = BX.Landing.Utils.key;
                var o = null;
                var s = -1;
                function l(n) {
                    e(n.layout.item, "landing-ui-select");
                }
                function u(n) {
                    t(n.layout.item, "landing-ui-select");
                }
                function d(n) {
                    n.forEach(u);
                }
                function c(n) {
                    return n.find(function (n) {
                        return i(n.layout.item, "landing-ui-select");
                    });
                }
                function f(n, e) {
                    return n.findIndex(function (n) {
                        return e === n;
                    });
                }
                function g(n) {
                    return n.find(function (n) {
                        return !n.layout.item.hidden;
                    });
                }
                function p(n) {
                    if (o) {
                        s = f(n, o);
                    }
                    var e = n.find(function (n, e) {
                        return e > s && !n.layout.item.hidden;
                    });
                    if (e) {
                        o = e;
                        return e;
                    }
                    e = g(n);
                    o = e;
                    return e;
                }
                function m(n) {
                    var e = BX.Landing.Utils.key;
                    return e.isLeft(n) || e.isRight(n) || e.isUp(n) || e.isDown(n) || e.isEnter(n);
                }
                function B(n) {
                    n.forEach(function (n) {
                        n.closeSubMenu();
                        var e = n.getSubMenu();
                        if (e) {
                            d(e.menuItems);
                        }
                    });
                }
                var X = false;
                r(n.popupWindow.popupContainer, "keydown", function (e) {
                    var t = n;
                    if (o && o.menuWindow.popupWindow.isShown()) {
                        t = o.menuWindow;
                    }
                    if (m(e)) {
                        var i = c(t.menuItems);
                        if (a.isDown(e) && X && t === n) {
                            X = false;
                            t.menuItems = t.menuItems.reverse();
                        }
                        if (a.isUp(e) && !X && t === n) {
                            X = true;
                            t.menuItems = t.menuItems.reverse();
                        }
                        if (a.isRight(e)) {
                            if (i) {
                                i.showSubMenu();
                                if (i.hasSubMenu()) {
                                    var r = i.getSubMenu();
                                    d(r.menuItems);
                                    l(r.menuItems[0]);
                                    o = r.menuItems[0];
                                }
                            }
                            return;
                        }
                        if (a.isLeft(e)) {
                            B(n.menuItems);
                            o = c(n.menuItems);
                            return;
                        }
                        if (a.isEnter(e)) {
                            if (i) {
                                BX.fireEvent(i.layout.item, "click");
                                return;
                            }
                        }
                        d(t.menuItems);
                        var s = p(t.menuItems);
                        if (s) {
                            l(s);
                            return;
                        }
                    }
                    if (a.isEscape(e)) {
                        t.close();
                    }
                    B(n.menuItems);
                });
            };
            BX.Landing.Utils.delay = function (n, e) {
                return new Promise(function (t) {
                    setTimeout(t.bind(null, e), n);
                });
            };
            BX.Landing.Utils.highlight = function (n, e, t) {
                var i;
                if (e) {
                    var r = document.createRange();
                    r.selectNodeContents(n);
                    i = r.getBoundingClientRect();
                } else {
                    i = n.getBoundingClientRect();
                }
                if (t) {
                    i = { top: i.bottom, left: i.left, right: i.right, bottom: i.bottom + 1, height: 20, width: i.width };
                }
                return BX.Landing.History.Highlight.getInstance().show(n, i);
            };
            BX.Landing.Utils.scrollTo = function (n) {
                return BX.Landing.PageObject.getInstance()
                    .view()
                    .then(function (e) {
                        return BX.Landing.UI.Panel.Content.scrollTo(e, n).then(function () {
                            return new Promise(function (n) {
                                setTimeout(n, 50);
                            });
                        });
                    });
            };
            BX.Landing.Utils.offsetTop = function (n, e) {
                var t = n.getBoundingClientRect();
                var i = e.getBoundingClientRect();
                var r = e.scrollTop;
                var a = parseInt(BX.style(e, "border-top-width"));
                a = a === a ? a : 0;
                return t.top + r - i.top - a;
            };
            BX.Landing.Utils.offsetLeft = function (n, e) {
                var t = n.getBoundingClientRect();
                var i = e.getBoundingClientRect();
                var r = e.scrollLeft;
                return t.left + r - i.left;
            };
            BX.Landing.Utils.isArrayLike = function (n) {
                var e = BX.Landing.Utils.isBoolean;
                var t = BX.Landing.Utils.isNumber;
                var i = BX.Landing.Utils.isFunction;
                return n !== null && !i(n) && !e(n) && !t(n) && n.length > 0 && n.length <= Number.MAX_SAFE_INTEGER;
            };
            BX.Landing.Utils.isArguments = function (n) {
                var e = BX.Landing.Utils.isArrayLike;
                return e(n) && n.toString() === "[object Arguments]";
            };
            BX.Landing.Utils.isEmpty = function (n) {
                var e = BX.Landing.Utils.isArrayLike;
                if (n == null) {
                    return true;
                }
                if (e(n)) {
                    return !n.length;
                }
                for (var t in n) {
                    if (n.hasOwnProperty(t)) {
                        return false;
                    }
                }
                return true;
            };
            BX.Landing.Utils.randomInt = function (n, e) {
                e += 1;
                return Math.floor(Math.random() * (e - n)) + n;
            };
            BX.Landing.Utils.intersection = function () {
                var n = BX.Landing.Utils.slice;
                return n(arguments).reduce(function (n, e) {
                    return n.filter(function (n) {
                        return e.includes(n);
                    });
                });
            };
            BX.Landing.Utils.difference = function () {
                var n = BX.Landing.Utils.slice;
                return n(arguments).reduce(function (n, e) {
                    return n.filter(function (n) {
                        return !e.includes(n);
                    });
                });
            };
            BX.Landing.Utils.changeTagName = function (n, e) {
                if (!n || !e) {
                    return null;
                }
                var t = BX.Landing.Utils.slice;
                var i = BX.Landing.Utils.create;
                var r = t(n.attributes);
                var a = getComputedStyle(n);
                var o = a.getPropertyValue("font-size");
                var s = a.getPropertyValue("font-weight");
                var l = i(e);
                var u = n.innerHTML;
                r.forEach(function (n) {
                    l.setAttribute(n.nodeName, n.nodeValue);
                });
                l.style.fontSize = o;
                l.style.fontWeight = s;
                l.innerHTML = u;
                n.parentElement.replaceChild(l, n);
                return l;
            };
            BX.Landing.Utils.hash = function (n) {
                if (BX.Landing.Utils.isArray(n) || BX.Landing.Utils.isPlainObject(n)) {
                    n = JSON.stringify(BX.Landing.Utils.sortObject(n));
                }
                return "" + BX.util.hashCode(n);
            };
            BX.Landing.Utils.sortObject = function (n) {
                return Object.keys(n)
                    .sort()
                    .reduce(function (e, t) {
                        return (e[t] = n[t]), e;
                    }, {});
            };
            BX.Landing.Utils.capitalize = function (n) {
                return n.charAt(0).toUpperCase() + n.slice(1);
            };
            BX.Landing.Utils.textToPlaceholders = function (n) {
                var e = new RegExp('<span[^>]*data-placeholder="(\\w+)"[^>]*>(.+?)<\\/span>', "gm");
                var t = e.exec(n);
                if (t) {
                    return n.replace(e, "{{" + t[1] + "}}");
                }
                return n;
            };
            BX.Landing.Utils.changeExtension = function (n, e) {
                return !!n ? n.replace(/\.[^\.]+$/, "." + e) : n;
            };
            BX.Landing.Utils.rename2x = function (n) {
                n = n.replace(/@2x/, "");
                return !!n ? n.replace(/\.[^\.]+$/, "@2x." + BX.util.getExtension(n)) : n;
            };
            BX.Landing.Utils.getDeltaFromEvent = function (n) {
                var e = n.deltaX;
                var t = -1 * n.deltaY;
                if (typeof e === "undefined" || typeof t === "undefined") {
                    e = (-1 * n.wheelDeltaX) / 6;
                    t = n.wheelDeltaY / 6;
                }
                if (n.deltaMode && n.deltaMode === 1) {
                    e *= 10;
                    t *= 10;
                }
                if (n.deltaMode && n.deltaMode === 1) {
                    e *= 10;
                    t *= 10;
                }
                if (e !== e && t !== t) {
                    e = 0;
                    t = n.wheelDelta;
                }
                return { x: e, y: t };
            };
            BX.Landing.Utils.urlToBlob = function (n) {
                if (!BX.type.isString(n)) {
                    return Promise.resolve(n);
                }
                return new Promise(function (e, t) {
                    try {
                        var i = BX.ajax.xhr();
                        i.open("GET", n);
                        i.responseType = "blob";
                        i.onerror = function () {
                            t("Network error.");
                        };
                        i.onload = function () {
                            if (i.status === 200) {
                                e(i.response);
                            } else {
                                t("Loading error:" + i.statusText);
                            }
                        };
                        i.send();
                    } catch (n) {
                        t(n.message);
                    }
                });
            };
            BX.Landing.Utils.getFileName = function (n) {
                return n.split("\\").pop().split("/").pop();
            };
            BX.Landing.Utils.getSelectedElement = function () {
                var n, e, t;
                if (document.selection) {
                    n = document.selection.createRange();
                    return n.parentElement();
                } else {
                    e = window.getSelection();
                    if (e.getRangeAt) {
                        if (e.rangeCount > 0) {
                            n = e.getRangeAt(0);
                        }
                    } else {
                        n = document.createRange();
                        n.setStart(e.anchorNode, e.anchorOffset);
                        n.setEnd(e.focusNode, e.focusOffset);
                        if (n.collapsed !== e.isCollapsed) {
                            n.setStart(e.focusNode, e.focusOffset);
                            n.setEnd(e.anchorNode, e.anchorOffset);
                        }
                    }
                    if (n) {
                        t = n["endContainer"];
                        return t.nodeType === 3 ? t.parentNode : t;
                    }
                }
            };
            BX.Landing.Utils.fireCustomEvent = function (n, e, t) {
                try {
                    BX.onCustomEvent(n, e, t);
                } catch (n) {
                    console.error(e, n);
                }
            };
            BX.Landing.Utils.onCustomEvent = BX.addCustomEvent;
            BX.Landing.Utils.removeCustomEvent = BX.removeCustomEvent;
            BX.Landing.Utils.insertAfter = BX.insertAfter;
            BX.Landing.Utils.isPlainObject = BX.type.isPlainObject;
            BX.Landing.Utils.append = BX.append;
            BX.Landing.Utils.prepend = BX.prepend;
            BX.Landing.Utils.isBoolean = BX.type.isBoolean;
            BX.Landing.Utils.isNumber = BX.type.isNumber;
            BX.Landing.Utils.isString = BX.type.isString;
            BX.Landing.Utils.isArray = BX.type.isArray;
            BX.Landing.Utils.isFunction = BX.type.isFunction;
            BX.Landing.Utils.addClass = BX.addClass;
            BX.Landing.Utils.removeClass = BX.removeClass;
            BX.Landing.Utils.toggleClass = BX.toggleClass;
            BX.Landing.Utils.hasClass = BX.hasClass;
            BX.Landing.Utils.debounce = BX.debounce;
            BX.Landing.Utils.throttle = BX.throttle;
            BX.Landing.Utils.bind = BX.bind;
            BX.Landing.Utils.unbind = BX.unbind;
            BX.Landing.Utils.getClass = BX.getClass;
            BX.Landing.Utils.pos = BX.pos;
            BX.Landing.Utils.assign = Object.assign || BX.util.objectMerge;
            BX.Landing.Utils.clone = BX.clone;
            BX.Landing.Utils.create = BX.create;
            BX.Landing.Utils.remove = BX.remove;
            BX.Landing.Utils.trim = BX.util.trim;
            BX.Landing.Utils.random = BX.util.getRandomString;
            BX.Landing.Utils.findParent = BX.findParent;
            BX.Landing.Utils.proxy = BX.proxy;
            BX.Landing.Utils.arrayUnique = BX.util.array_unique;
            BX.Landing.Utils.keys = Object.keys;
            BX.Landing.Utils.fireEvent = BX.fireEvent;
            BX.Landing.Utils.addQueryParams = BX.util.add_url_param.bind(BX.util);
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/landing/utils/utils.map.js

        (function () {
            "use strict";
            if (BX.browser.IsMobile()) {
                return;
            }
            var n = new IntersectionObserver(d);
            var a = new WeakMap();
            var i = BX.Landing.Utils.addClass;
            var t = BX.Landing.Utils.removeClass;
            var e = BX.Landing.Utils.style;
            var o = BX.Landing.Utils.isPlainObject;
            var r = BX.Landing.Utils.onAnimationEnd;
            var s = BX.Landing.Utils.slice;
            var l = BX.Landing.Utils.onCustomEvent;
            l("BX.Landing.Block:init", function (a) {
                var i = s(a.block.querySelectorAll(".js-animation"));
                i.forEach(function (a) {
                    c(a);
                    n.observe(a);
                });
            });
            l("BX.Landing.UI.Panel.URLList:show", function (a) {
                var i = s(a.querySelectorAll(".js-animation"));
                i.forEach(function (a) {
                    c(a);
                    n.observe(a);
                });
            });
            l("BX.Landing.Block:updateStyle", function (a) {
                if (o(a.data) && o(a.data.affect)) {
                    var i = a.data.affect.some(function (n) {
                        return n === "animation-name";
                    });
                    if (i) {
                        var t = s(a.block.querySelectorAll(".js-animation"));
                        t.forEach(function (a) {
                            c(a);
                            n.observe(a);
                        });
                    }
                }
            });
            function c(n) {
                void e(n, { "animation-duration": "1000ms", visibility: "hidden", "animation-name": "none", "animation-play-state": "paused" });
            }
            function d(n) {
                n.forEach(function (n) {
                    if (n.isIntersecting && !a.has(n.target)) {
                        void u(n.target).then(function () {
                            a.set(n.target, true);
                            void e(n.target, { "animation-name": "none" });
                            t(n.target, "animated");
                        });
                    }
                });
            }
            function u(n) {
                i(n, "animated");
                void e(n, { visibility: "", "animation-name": "", "animation-play-state": "running" });
                return r(n);
            }
        })();

        (function (e, t) {
            "use strict";
            if (typeof module === "object" && typeof module.exports === "object") {
                module.exports = e.document
                    ? t(e, true)
                    : function (e) {
                          if (!e.document) {
                              throw new Error("jQuery requires a window with a document");
                          }
                          return t(e);
                      };
            } else {
                t(e);
            }
        })(typeof window !== "undefined" ? window : this, function (e, t) {
            "use strict";
            var n = [];
            var i = e.document;
            var r = Object.getPrototypeOf;
            var o = n.slice;
            var s = n.concat;
            var u = n.push;
            var a = n.indexOf;
            var f = {};
            var l = f.toString;
            var c = f.hasOwnProperty;
            var d = c.toString;
            var p = d.call(Object);
            var h = {};
            function g(e, t) {
                t = t || i;
                var n = t.createElement("script");
                n.text = e;
                t.head.appendChild(n).parentNode.removeChild(n);
            }
            var y = "3.2.1",
                m = function (e, t) {
                    return new m.fn.init(e, t);
                },
                v = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                x = /^-ms-/,
                b = /-([a-z])/g,
                w = function (e, t) {
                    return t.toUpperCase();
                };
            m.fn = m.prototype = {
                jquery: y,
                constructor: m,
                length: 0,
                toArray: function () {
                    return o.call(this);
                },
                get: function (e) {
                    if (e == null) {
                        return o.call(this);
                    }
                    return e < 0 ? this[e + this.length] : this[e];
                },
                pushStack: function (e) {
                    var t = m.merge(this.constructor(), e);
                    t.prevObject = this;
                    return t;
                },
                each: function (e) {
                    return m.each(this, e);
                },
                map: function (e) {
                    return this.pushStack(
                        m.map(this, function (t, n) {
                            return e.call(t, n, t);
                        })
                    );
                },
                slice: function () {
                    return this.pushStack(o.apply(this, arguments));
                },
                first: function () {
                    return this.eq(0);
                },
                last: function () {
                    return this.eq(-1);
                },
                eq: function (e) {
                    var t = this.length,
                        n = +e + (e < 0 ? t : 0);
                    return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
                },
                end: function () {
                    return this.prevObject || this.constructor();
                },
                push: u,
                sort: n.sort,
                splice: n.splice,
            };
            m.extend = m.fn.extend = function () {
                var e,
                    t,
                    n,
                    i,
                    r,
                    o,
                    s = arguments[0] || {},
                    u = 1,
                    a = arguments.length,
                    f = false;
                if (typeof s === "boolean") {
                    f = s;
                    s = arguments[u] || {};
                    u++;
                }
                if (typeof s !== "object" && !m.isFunction(s)) {
                    s = {};
                }
                if (u === a) {
                    s = this;
                    u--;
                }
                for (; u < a; u++) {
                    if ((e = arguments[u]) != null) {
                        for (t in e) {
                            n = s[t];
                            i = e[t];
                            if (s === i) {
                                continue;
                            }
                            if (f && i && (m.isPlainObject(i) || (r = Array.isArray(i)))) {
                                if (r) {
                                    r = false;
                                    o = n && Array.isArray(n) ? n : [];
                                } else {
                                    o = n && m.isPlainObject(n) ? n : {};
                                }
                                s[t] = m.extend(f, o, i);
                            } else if (i !== undefined) {
                                s[t] = i;
                            }
                        }
                    }
                }
                return s;
            };
            m.extend({
                expando: "jQuery" + (y + Math.random()).replace(/\D/g, ""),
                isReady: true,
                error: function (e) {
                    throw new Error(e);
                },
                noop: function () {},
                isFunction: function (e) {
                    return m.type(e) === "function";
                },
                isWindow: function (e) {
                    return e != null && e === e.window;
                },
                isNumeric: function (e) {
                    var t = m.type(e);
                    return (t === "number" || t === "string") && !isNaN(e - parseFloat(e));
                },
                isPlainObject: function (e) {
                    var t, n;
                    if (!e || l.call(e) !== "[object Object]") {
                        return false;
                    }
                    t = r(e);
                    if (!t) {
                        return true;
                    }
                    n = c.call(t, "constructor") && t.constructor;
                    return typeof n === "function" && d.call(n) === p;
                },
                isEmptyObject: function (e) {
                    var t;
                    for (t in e) {
                        return false;
                    }
                    return true;
                },
                type: function (e) {
                    if (e == null) {
                        return e + "";
                    }
                    return typeof e === "object" || typeof e === "function" ? f[l.call(e)] || "object" : typeof e;
                },
                globalEval: function (e) {
                    g(e);
                },
                camelCase: function (e) {
                    return e.replace(x, "ms-").replace(b, w);
                },
                each: function (e, t) {
                    var n,
                        i = 0;
                    if (T(e)) {
                        n = e.length;
                        for (; i < n; i++) {
                            if (t.call(e[i], i, e[i]) === false) {
                                break;
                            }
                        }
                    } else {
                        for (i in e) {
                            if (t.call(e[i], i, e[i]) === false) {
                                break;
                            }
                        }
                    }
                    return e;
                },
                trim: function (e) {
                    return e == null ? "" : (e + "").replace(v, "");
                },
                makeArray: function (e, t) {
                    var n = t || [];
                    if (e != null) {
                        if (T(Object(e))) {
                            m.merge(n, typeof e === "string" ? [e] : e);
                        } else {
                            u.call(n, e);
                        }
                    }
                    return n;
                },
                inArray: function (e, t, n) {
                    return t == null ? -1 : a.call(t, e, n);
                },
                merge: function (e, t) {
                    var n = +t.length,
                        i = 0,
                        r = e.length;
                    for (; i < n; i++) {
                        e[r++] = t[i];
                    }
                    e.length = r;
                    return e;
                },
                grep: function (e, t, n) {
                    var i,
                        r = [],
                        o = 0,
                        s = e.length,
                        u = !n;
                    for (; o < s; o++) {
                        i = !t(e[o], o);
                        if (i !== u) {
                            r.push(e[o]);
                        }
                    }
                    return r;
                },
                map: function (e, t, n) {
                    var i,
                        r,
                        o = 0,
                        u = [];
                    if (T(e)) {
                        i = e.length;
                        for (; o < i; o++) {
                            r = t(e[o], o, n);
                            if (r != null) {
                                u.push(r);
                            }
                        }
                    } else {
                        for (o in e) {
                            r = t(e[o], o, n);
                            if (r != null) {
                                u.push(r);
                            }
                        }
                    }
                    return s.apply([], u);
                },
                guid: 1,
                proxy: function (e, t) {
                    var n, i, r;
                    if (typeof t === "string") {
                        n = e[t];
                        t = e;
                        e = n;
                    }
                    if (!m.isFunction(e)) {
                        return undefined;
                    }
                    i = o.call(arguments, 2);
                    r = function () {
                        return e.apply(t || this, i.concat(o.call(arguments)));
                    };
                    r.guid = e.guid = e.guid || m.guid++;
                    return r;
                },
                now: Date.now,
                support: h,
            });
            if (typeof Symbol === "function") {
                m.fn[Symbol.iterator] = n[Symbol.iterator];
            }
            m.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
                f["[object " + t + "]"] = t.toLowerCase();
            });
            function T(e) {
                var t = !!e && "length" in e && e.length,
                    n = m.type(e);
                if (n === "function" || m.isWindow(e)) {
                    return false;
                }
                return n === "array" || t === 0 || (typeof t === "number" && t > 0 && t - 1 in e);
            }
            var C = (function (e) {
                var t,
                    n,
                    i,
                    r,
                    o,
                    s,
                    u,
                    a,
                    f,
                    l,
                    c,
                    d,
                    p,
                    h,
                    g,
                    y,
                    m,
                    v,
                    x,
                    b = "sizzle" + 1 * new Date(),
                    w = e.document,
                    T = 0,
                    C = 0,
                    k = se(),
                    E = se(),
                    S = se(),
                    N = function (e, t) {
                        if (e === t) {
                            c = true;
                        }
                        return 0;
                    },
                    D = {}.hasOwnProperty,
                    j = [],
                    A = j.pop,
                    q = j.push,
                    L = j.push,
                    H = j.slice,
                    F = function (e, t) {
                        var n = 0,
                            i = e.length;
                        for (; n < i; n++) {
                            if (e[n] === t) {
                                return n;
                            }
                        }
                        return -1;
                    },
                    O = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    P = "[\\x20\\t\\r\\n\\f]",
                    R = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                    M = "\\[" + P + "*(" + R + ")(?:" + P + "*([*^$|!~]?=)" + P + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + P + "*\\]",
                    I = ":(" + R + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|" + ".*" + ")\\)|)",
                    W = new RegExp(P + "+", "g"),
                    $ = new RegExp("^" + P + "+|((?:^|[^\\\\])(?:\\\\.)*)" + P + "+$", "g"),
                    B = new RegExp("^" + P + "*," + P + "*"),
                    _ = new RegExp("^" + P + "*([>+~]|" + P + ")" + P + "*"),
                    z = new RegExp("=" + P + "*([^\\]'\"]*?)" + P + "*\\]", "g"),
                    X = new RegExp(I),
                    U = new RegExp("^" + R + "$"),
                    V = {
                        ID: new RegExp("^#(" + R + ")"),
                        CLASS: new RegExp("^\\.(" + R + ")"),
                        TAG: new RegExp("^(" + R + "|[*])"),
                        ATTR: new RegExp("^" + M),
                        PSEUDO: new RegExp("^" + I),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + P + "*(even|odd|(([+-]|)(\\d*)n|)" + P + "*(?:([+-]|)" + P + "*(\\d+)|))" + P + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + O + ")$", "i"),
                        needsContext: new RegExp("^" + P + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + P + "*((?:-\\d)?\\d*)" + P + "*\\)|)(?=[^-]|$)", "i"),
                    },
                    G = /^(?:input|select|textarea|button)$/i,
                    Y = /^h\d$/i,
                    Q = /^[^{]+\{\s*\[native \w/,
                    J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    K = /[+~]/,
                    Z = new RegExp("\\\\([\\da-f]{1,6}" + P + "?|(" + P + ")|.)", "ig"),
                    ee = function (e, t, n) {
                        var i = "0x" + t - 65536;
                        return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode((i >> 10) | 55296, (i & 1023) | 56320);
                    },
                    te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                    ne = function (e, t) {
                        if (t) {
                            if (e === "\0") {
                                return "�";
                            }
                            return e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " ";
                        }
                        return "\\" + e;
                    },
                    ie = function () {
                        d();
                    },
                    re = ve(
                        function (e) {
                            return e.disabled === true && ("form" in e || "label" in e);
                        },
                        { dir: "parentNode", next: "legend" }
                    );
                try {
                    L.apply((j = H.call(w.childNodes)), w.childNodes);
                    j[w.childNodes.length].nodeType;
                } catch (e) {
                    L = {
                        apply: j.length
                            ? function (e, t) {
                                  q.apply(e, H.call(t));
                              }
                            : function (e, t) {
                                  var n = e.length,
                                      i = 0;
                                  while ((e[n++] = t[i++])) {}
                                  e.length = n - 1;
                              },
                    };
                }
                function oe(e, t, i, r) {
                    var o,
                        u,
                        f,
                        l,
                        c,
                        h,
                        m,
                        v = t && t.ownerDocument,
                        T = t ? t.nodeType : 9;
                    i = i || [];
                    if (typeof e !== "string" || !e || (T !== 1 && T !== 9 && T !== 11)) {
                        return i;
                    }
                    if (!r) {
                        if ((t ? t.ownerDocument || t : w) !== p) {
                            d(t);
                        }
                        t = t || p;
                        if (g) {
                            if (T !== 11 && (c = J.exec(e))) {
                                if ((o = c[1])) {
                                    if (T === 9) {
                                        if ((f = t.getElementById(o))) {
                                            if (f.id === o) {
                                                i.push(f);
                                                return i;
                                            }
                                        } else {
                                            return i;
                                        }
                                    } else {
                                        if (v && (f = v.getElementById(o)) && x(t, f) && f.id === o) {
                                            i.push(f);
                                            return i;
                                        }
                                    }
                                } else if (c[2]) {
                                    L.apply(i, t.getElementsByTagName(e));
                                    return i;
                                } else if ((o = c[3]) && n.getElementsByClassName && t.getElementsByClassName) {
                                    L.apply(i, t.getElementsByClassName(o));
                                    return i;
                                }
                            }
                            if (n.qsa && !S[e + " "] && (!y || !y.test(e))) {
                                if (T !== 1) {
                                    v = t;
                                    m = e;
                                } else if (t.nodeName.toLowerCase() !== "object") {
                                    if ((l = t.getAttribute("id"))) {
                                        l = l.replace(te, ne);
                                    } else {
                                        t.setAttribute("id", (l = b));
                                    }
                                    h = s(e);
                                    u = h.length;
                                    while (u--) {
                                        h[u] = "#" + l + " " + me(h[u]);
                                    }
                                    m = h.join(",");
                                    v = (K.test(e) && ge(t.parentNode)) || t;
                                }
                                if (m) {
                                    try {
                                        L.apply(i, v.querySelectorAll(m));
                                        return i;
                                    } catch (e) {
                                    } finally {
                                        if (l === b) {
                                            t.removeAttribute("id");
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return a(e.replace($, "$1"), t, i, r);
                }
                function se() {
                    var e = [];
                    function t(n, r) {
                        if (e.push(n + " ") > i.cacheLength) {
                            delete t[e.shift()];
                        }
                        return (t[n + " "] = r);
                    }
                    return t;
                }
                function ue(e) {
                    e[b] = true;
                    return e;
                }
                function ae(e) {
                    var t = p.createElement("fieldset");
                    try {
                        return !!e(t);
                    } catch (e) {
                        return false;
                    } finally {
                        if (t.parentNode) {
                            t.parentNode.removeChild(t);
                        }
                        t = null;
                    }
                }
                function fe(e, t) {
                    var n = e.split("|"),
                        r = n.length;
                    while (r--) {
                        i.attrHandle[n[r]] = t;
                    }
                }
                function le(e, t) {
                    var n = t && e,
                        i = n && e.nodeType === 1 && t.nodeType === 1 && e.sourceIndex - t.sourceIndex;
                    if (i) {
                        return i;
                    }
                    if (n) {
                        while ((n = n.nextSibling)) {
                            if (n === t) {
                                return -1;
                            }
                        }
                    }
                    return e ? 1 : -1;
                }
                function ce(e) {
                    return function (t) {
                        var n = t.nodeName.toLowerCase();
                        return n === "input" && t.type === e;
                    };
                }
                function de(e) {
                    return function (t) {
                        var n = t.nodeName.toLowerCase();
                        return (n === "input" || n === "button") && t.type === e;
                    };
                }
                function pe(e) {
                    return function (t) {
                        if ("form" in t) {
                            if (t.parentNode && t.disabled === false) {
                                if ("label" in t) {
                                    if ("label" in t.parentNode) {
                                        return t.parentNode.disabled === e;
                                    } else {
                                        return t.disabled === e;
                                    }
                                }
                                return t.isDisabled === e || (t.isDisabled !== !e && re(t) === e);
                            }
                            return t.disabled === e;
                        } else if ("label" in t) {
                            return t.disabled === e;
                        }
                        return false;
                    };
                }
                function he(e) {
                    return ue(function (t) {
                        t = +t;
                        return ue(function (n, i) {
                            var r,
                                o = e([], n.length, t),
                                s = o.length;
                            while (s--) {
                                if (n[(r = o[s])]) {
                                    n[r] = !(i[r] = n[r]);
                                }
                            }
                        });
                    });
                }
                function ge(e) {
                    return e && typeof e.getElementsByTagName !== "undefined" && e;
                }
                n = oe.support = {};
                o = oe.isXML = function (e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return t ? t.nodeName !== "HTML" : false;
                };
                d = oe.setDocument = function (e) {
                    var t,
                        r,
                        s = e ? e.ownerDocument || e : w;
                    if (s === p || s.nodeType !== 9 || !s.documentElement) {
                        return p;
                    }
                    p = s;
                    h = p.documentElement;
                    g = !o(p);
                    if (w !== p && (r = p.defaultView) && r.top !== r) {
                        if (r.addEventListener) {
                            r.addEventListener("unload", ie, false);
                        } else if (r.attachEvent) {
                            r.attachEvent("onunload", ie);
                        }
                    }
                    n.attributes = ae(function (e) {
                        e.className = "i";
                        return !e.getAttribute("className");
                    });
                    n.getElementsByTagName = ae(function (e) {
                        e.appendChild(p.createComment(""));
                        return !e.getElementsByTagName("*").length;
                    });
                    n.getElementsByClassName = Q.test(p.getElementsByClassName);
                    n.getById = ae(function (e) {
                        h.appendChild(e).id = b;
                        return !p.getElementsByName || !p.getElementsByName(b).length;
                    });
                    if (n.getById) {
                        i.filter["ID"] = function (e) {
                            var t = e.replace(Z, ee);
                            return function (e) {
                                return e.getAttribute("id") === t;
                            };
                        };
                        i.find["ID"] = function (e, t) {
                            if (typeof t.getElementById !== "undefined" && g) {
                                var n = t.getElementById(e);
                                return n ? [n] : [];
                            }
                        };
                    } else {
                        i.filter["ID"] = function (e) {
                            var t = e.replace(Z, ee);
                            return function (e) {
                                var n = typeof e.getAttributeNode !== "undefined" && e.getAttributeNode("id");
                                return n && n.value === t;
                            };
                        };
                        i.find["ID"] = function (e, t) {
                            if (typeof t.getElementById !== "undefined" && g) {
                                var n,
                                    i,
                                    r,
                                    o = t.getElementById(e);
                                if (o) {
                                    n = o.getAttributeNode("id");
                                    if (n && n.value === e) {
                                        return [o];
                                    }
                                    r = t.getElementsByName(e);
                                    i = 0;
                                    while ((o = r[i++])) {
                                        n = o.getAttributeNode("id");
                                        if (n && n.value === e) {
                                            return [o];
                                        }
                                    }
                                }
                                return [];
                            }
                        };
                    }
                    i.find["TAG"] = n.getElementsByTagName
                        ? function (e, t) {
                              if (typeof t.getElementsByTagName !== "undefined") {
                                  return t.getElementsByTagName(e);
                              } else if (n.qsa) {
                                  return t.querySelectorAll(e);
                              }
                          }
                        : function (e, t) {
                              var n,
                                  i = [],
                                  r = 0,
                                  o = t.getElementsByTagName(e);
                              if (e === "*") {
                                  while ((n = o[r++])) {
                                      if (n.nodeType === 1) {
                                          i.push(n);
                                      }
                                  }
                                  return i;
                              }
                              return o;
                          };
                    i.find["CLASS"] =
                        n.getElementsByClassName &&
                        function (e, t) {
                            if (typeof t.getElementsByClassName !== "undefined" && g) {
                                return t.getElementsByClassName(e);
                            }
                        };
                    m = [];
                    y = [];
                    if ((n.qsa = Q.test(p.querySelectorAll))) {
                        ae(function (e) {
                            h.appendChild(e).innerHTML = "<a id='" + b + "'></a>" + "<select id='" + b + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
                            if (e.querySelectorAll("[msallowcapture^='']").length) {
                                y.push("[*^$]=" + P + "*(?:''|\"\")");
                            }
                            if (!e.querySelectorAll("[selected]").length) {
                                y.push("\\[" + P + "*(?:value|" + O + ")");
                            }
                            if (!e.querySelectorAll("[id~=" + b + "-]").length) {
                                y.push("~=");
                            }
                            if (!e.querySelectorAll(":checked").length) {
                                y.push(":checked");
                            }
                            if (!e.querySelectorAll("a#" + b + "+*").length) {
                                y.push(".#.+[+~]");
                            }
                        });
                        ae(function (e) {
                            e.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";
                            var t = p.createElement("input");
                            t.setAttribute("type", "hidden");
                            e.appendChild(t).setAttribute("name", "D");
                            if (e.querySelectorAll("[name=d]").length) {
                                y.push("name" + P + "*[*^$|!~]?=");
                            }
                            if (e.querySelectorAll(":enabled").length !== 2) {
                                y.push(":enabled", ":disabled");
                            }
                            h.appendChild(e).disabled = true;
                            if (e.querySelectorAll(":disabled").length !== 2) {
                                y.push(":enabled", ":disabled");
                            }
                            e.querySelectorAll("*,:x");
                            y.push(",.*:");
                        });
                    }
                    if ((n.matchesSelector = Q.test((v = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)))) {
                        ae(function (e) {
                            n.disconnectedMatch = v.call(e, "*");
                            v.call(e, "[s!='']:x");
                            m.push("!=", I);
                        });
                    }
                    y = y.length && new RegExp(y.join("|"));
                    m = m.length && new RegExp(m.join("|"));
                    t = Q.test(h.compareDocumentPosition);
                    x =
                        t || Q.test(h.contains)
                            ? function (e, t) {
                                  var n = e.nodeType === 9 ? e.documentElement : e,
                                      i = t && t.parentNode;
                                  return e === i || !!(i && i.nodeType === 1 && (n.contains ? n.contains(i) : e.compareDocumentPosition && e.compareDocumentPosition(i) & 16));
                              }
                            : function (e, t) {
                                  if (t) {
                                      while ((t = t.parentNode)) {
                                          if (t === e) {
                                              return true;
                                          }
                                      }
                                  }
                                  return false;
                              };
                    N = t
                        ? function (e, t) {
                              if (e === t) {
                                  c = true;
                                  return 0;
                              }
                              var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                              if (i) {
                                  return i;
                              }
                              i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1;
                              if (i & 1 || (!n.sortDetached && t.compareDocumentPosition(e) === i)) {
                                  if (e === p || (e.ownerDocument === w && x(w, e))) {
                                      return -1;
                                  }
                                  if (t === p || (t.ownerDocument === w && x(w, t))) {
                                      return 1;
                                  }
                                  return l ? F(l, e) - F(l, t) : 0;
                              }
                              return i & 4 ? -1 : 1;
                          }
                        : function (e, t) {
                              if (e === t) {
                                  c = true;
                                  return 0;
                              }
                              var n,
                                  i = 0,
                                  r = e.parentNode,
                                  o = t.parentNode,
                                  s = [e],
                                  u = [t];
                              if (!r || !o) {
                                  return e === p ? -1 : t === p ? 1 : r ? -1 : o ? 1 : l ? F(l, e) - F(l, t) : 0;
                              } else if (r === o) {
                                  return le(e, t);
                              }
                              n = e;
                              while ((n = n.parentNode)) {
                                  s.unshift(n);
                              }
                              n = t;
                              while ((n = n.parentNode)) {
                                  u.unshift(n);
                              }
                              while (s[i] === u[i]) {
                                  i++;
                              }
                              return i ? le(s[i], u[i]) : s[i] === w ? -1 : u[i] === w ? 1 : 0;
                          };
                    return p;
                };
                oe.matches = function (e, t) {
                    return oe(e, null, null, t);
                };
                oe.matchesSelector = function (e, t) {
                    if ((e.ownerDocument || e) !== p) {
                        d(e);
                    }
                    t = t.replace(z, "='$1']");
                    if (n.matchesSelector && g && !S[t + " "] && (!m || !m.test(t)) && (!y || !y.test(t))) {
                        try {
                            var i = v.call(e, t);
                            if (i || n.disconnectedMatch || (e.document && e.document.nodeType !== 11)) {
                                return i;
                            }
                        } catch (e) {}
                    }
                    return oe(t, p, null, [e]).length > 0;
                };
                oe.contains = function (e, t) {
                    if ((e.ownerDocument || e) !== p) {
                        d(e);
                    }
                    return x(e, t);
                };
                oe.attr = function (e, t) {
                    if ((e.ownerDocument || e) !== p) {
                        d(e);
                    }
                    var r = i.attrHandle[t.toLowerCase()],
                        o = r && D.call(i.attrHandle, t.toLowerCase()) ? r(e, t, !g) : undefined;
                    return o !== undefined ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null;
                };
                oe.escape = function (e) {
                    return (e + "").replace(te, ne);
                };
                oe.error = function (e) {
                    throw new Error("Syntax error, unrecognized expression: " + e);
                };
                oe.uniqueSort = function (e) {
                    var t,
                        i = [],
                        r = 0,
                        o = 0;
                    c = !n.detectDuplicates;
                    l = !n.sortStable && e.slice(0);
                    e.sort(N);
                    if (c) {
                        while ((t = e[o++])) {
                            if (t === e[o]) {
                                r = i.push(o);
                            }
                        }
                        while (r--) {
                            e.splice(i[r], 1);
                        }
                    }
                    l = null;
                    return e;
                };
                r = oe.getText = function (e) {
                    var t,
                        n = "",
                        i = 0,
                        o = e.nodeType;
                    if (!o) {
                        while ((t = e[i++])) {
                            n += r(t);
                        }
                    } else if (o === 1 || o === 9 || o === 11) {
                        if (typeof e.textContent === "string") {
                            return e.textContent;
                        } else {
                            for (e = e.firstChild; e; e = e.nextSibling) {
                                n += r(e);
                            }
                        }
                    } else if (o === 3 || o === 4) {
                        return e.nodeValue;
                    }
                    return n;
                };
                i = oe.selectors = {
                    cacheLength: 50,
                    createPseudo: ue,
                    match: V,
                    attrHandle: {},
                    find: {},
                    relative: { ">": { dir: "parentNode", first: true }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: true }, "~": { dir: "previousSibling" } },
                    preFilter: {
                        ATTR: function (e) {
                            e[1] = e[1].replace(Z, ee);
                            e[3] = (e[3] || e[4] || e[5] || "").replace(Z, ee);
                            if (e[2] === "~=") {
                                e[3] = " " + e[3] + " ";
                            }
                            return e.slice(0, 4);
                        },
                        CHILD: function (e) {
                            e[1] = e[1].toLowerCase();
                            if (e[1].slice(0, 3) === "nth") {
                                if (!e[3]) {
                                    oe.error(e[0]);
                                }
                                e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd"));
                                e[5] = +(e[7] + e[8] || e[3] === "odd");
                            } else if (e[3]) {
                                oe.error(e[0]);
                            }
                            return e;
                        },
                        PSEUDO: function (e) {
                            var t,
                                n = !e[6] && e[2];
                            if (V["CHILD"].test(e[0])) {
                                return null;
                            }
                            if (e[3]) {
                                e[2] = e[4] || e[5] || "";
                            } else if (n && X.test(n) && (t = s(n, true)) && (t = n.indexOf(")", n.length - t) - n.length)) {
                                e[0] = e[0].slice(0, t);
                                e[2] = n.slice(0, t);
                            }
                            return e.slice(0, 3);
                        },
                    },
                    filter: {
                        TAG: function (e) {
                            var t = e.replace(Z, ee).toLowerCase();
                            return e === "*"
                                ? function () {
                                      return true;
                                  }
                                : function (e) {
                                      return e.nodeName && e.nodeName.toLowerCase() === t;
                                  };
                        },
                        CLASS: function (e) {
                            var t = k[e + " "];
                            return (
                                t ||
                                ((t = new RegExp("(^|" + P + ")" + e + "(" + P + "|$)")) &&
                                    k(e, function (e) {
                                        return t.test((typeof e.className === "string" && e.className) || (typeof e.getAttribute !== "undefined" && e.getAttribute("class")) || "");
                                    }))
                            );
                        },
                        ATTR: function (e, t, n) {
                            return function (i) {
                                var r = oe.attr(i, e);
                                if (r == null) {
                                    return t === "!=";
                                }
                                if (!t) {
                                    return true;
                                }
                                r += "";
                                return t === "="
                                    ? r === n
                                    : t === "!="
                                    ? r !== n
                                    : t === "^="
                                    ? n && r.indexOf(n) === 0
                                    : t === "*="
                                    ? n && r.indexOf(n) > -1
                                    : t === "$="
                                    ? n && r.slice(-n.length) === n
                                    : t === "~="
                                    ? (" " + r.replace(W, " ") + " ").indexOf(n) > -1
                                    : t === "|="
                                    ? r === n || r.slice(0, n.length + 1) === n + "-"
                                    : false;
                            };
                        },
                        CHILD: function (e, t, n, i, r) {
                            var o = e.slice(0, 3) !== "nth",
                                s = e.slice(-4) !== "last",
                                u = t === "of-type";
                            return i === 1 && r === 0
                                ? function (e) {
                                      return !!e.parentNode;
                                  }
                                : function (t, n, a) {
                                      var f,
                                          l,
                                          c,
                                          d,
                                          p,
                                          h,
                                          g = o !== s ? "nextSibling" : "previousSibling",
                                          y = t.parentNode,
                                          m = u && t.nodeName.toLowerCase(),
                                          v = !a && !u,
                                          x = false;
                                      if (y) {
                                          if (o) {
                                              while (g) {
                                                  d = t;
                                                  while ((d = d[g])) {
                                                      if (u ? d.nodeName.toLowerCase() === m : d.nodeType === 1) {
                                                          return false;
                                                      }
                                                  }
                                                  h = g = e === "only" && !h && "nextSibling";
                                              }
                                              return true;
                                          }
                                          h = [s ? y.firstChild : y.lastChild];
                                          if (s && v) {
                                              d = y;
                                              c = d[b] || (d[b] = {});
                                              l = c[d.uniqueID] || (c[d.uniqueID] = {});
                                              f = l[e] || [];
                                              p = f[0] === T && f[1];
                                              x = p && f[2];
                                              d = p && y.childNodes[p];
                                              while ((d = (++p && d && d[g]) || (x = p = 0) || h.pop())) {
                                                  if (d.nodeType === 1 && ++x && d === t) {
                                                      l[e] = [T, p, x];
                                                      break;
                                                  }
                                              }
                                          } else {
                                              if (v) {
                                                  d = t;
                                                  c = d[b] || (d[b] = {});
                                                  l = c[d.uniqueID] || (c[d.uniqueID] = {});
                                                  f = l[e] || [];
                                                  p = f[0] === T && f[1];
                                                  x = p;
                                              }
                                              if (x === false) {
                                                  while ((d = (++p && d && d[g]) || (x = p = 0) || h.pop())) {
                                                      if ((u ? d.nodeName.toLowerCase() === m : d.nodeType === 1) && ++x) {
                                                          if (v) {
                                                              c = d[b] || (d[b] = {});
                                                              l = c[d.uniqueID] || (c[d.uniqueID] = {});
                                                              l[e] = [T, x];
                                                          }
                                                          if (d === t) {
                                                              break;
                                                          }
                                                      }
                                                  }
                                              }
                                          }
                                          x -= r;
                                          return x === i || (x % i === 0 && x / i >= 0);
                                      }
                                  };
                        },
                        PSEUDO: function (e, t) {
                            var n,
                                r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);
                            if (r[b]) {
                                return r(t);
                            }
                            if (r.length > 1) {
                                n = [e, e, "", t];
                                return i.setFilters.hasOwnProperty(e.toLowerCase())
                                    ? ue(function (e, n) {
                                          var i,
                                              o = r(e, t),
                                              s = o.length;
                                          while (s--) {
                                              i = F(e, o[s]);
                                              e[i] = !(n[i] = o[s]);
                                          }
                                      })
                                    : function (e) {
                                          return r(e, 0, n);
                                      };
                            }
                            return r;
                        },
                    },
                    pseudos: {
                        not: ue(function (e) {
                            var t = [],
                                n = [],
                                i = u(e.replace($, "$1"));
                            return i[b]
                                ? ue(function (e, t, n, r) {
                                      var o,
                                          s = i(e, null, r, []),
                                          u = e.length;
                                      while (u--) {
                                          if ((o = s[u])) {
                                              e[u] = !(t[u] = o);
                                          }
                                      }
                                  })
                                : function (e, r, o) {
                                      t[0] = e;
                                      i(t, null, o, n);
                                      t[0] = null;
                                      return !n.pop();
                                  };
                        }),
                        has: ue(function (e) {
                            return function (t) {
                                return oe(e, t).length > 0;
                            };
                        }),
                        contains: ue(function (e) {
                            e = e.replace(Z, ee);
                            return function (t) {
                                return (t.textContent || t.innerText || r(t)).indexOf(e) > -1;
                            };
                        }),
                        lang: ue(function (e) {
                            if (!U.test(e || "")) {
                                oe.error("unsupported lang: " + e);
                            }
                            e = e.replace(Z, ee).toLowerCase();
                            return function (t) {
                                var n;
                                do {
                                    if ((n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))) {
                                        n = n.toLowerCase();
                                        return n === e || n.indexOf(e + "-") === 0;
                                    }
                                } while ((t = t.parentNode) && t.nodeType === 1);
                                return false;
                            };
                        }),
                        target: function (t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id;
                        },
                        root: function (e) {
                            return e === h;
                        },
                        focus: function (e) {
                            return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                        },
                        enabled: pe(false),
                        disabled: pe(true),
                        checked: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return (t === "input" && !!e.checked) || (t === "option" && !!e.selected);
                        },
                        selected: function (e) {
                            if (e.parentNode) {
                                e.parentNode.selectedIndex;
                            }
                            return e.selected === true;
                        },
                        empty: function (e) {
                            for (e = e.firstChild; e; e = e.nextSibling) {
                                if (e.nodeType < 6) {
                                    return false;
                                }
                            }
                            return true;
                        },
                        parent: function (e) {
                            return !i.pseudos["empty"](e);
                        },
                        header: function (e) {
                            return Y.test(e.nodeName);
                        },
                        input: function (e) {
                            return G.test(e.nodeName);
                        },
                        button: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return (t === "input" && e.type === "button") || t === "button";
                        },
                        text: function (e) {
                            var t;
                            return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === "text");
                        },
                        first: he(function () {
                            return [0];
                        }),
                        last: he(function (e, t) {
                            return [t - 1];
                        }),
                        eq: he(function (e, t, n) {
                            return [n < 0 ? n + t : n];
                        }),
                        even: he(function (e, t) {
                            var n = 0;
                            for (; n < t; n += 2) {
                                e.push(n);
                            }
                            return e;
                        }),
                        odd: he(function (e, t) {
                            var n = 1;
                            for (; n < t; n += 2) {
                                e.push(n);
                            }
                            return e;
                        }),
                        lt: he(function (e, t, n) {
                            var i = n < 0 ? n + t : n;
                            for (; --i >= 0; ) {
                                e.push(i);
                            }
                            return e;
                        }),
                        gt: he(function (e, t, n) {
                            var i = n < 0 ? n + t : n;
                            for (; ++i < t; ) {
                                e.push(i);
                            }
                            return e;
                        }),
                    },
                };
                i.pseudos["nth"] = i.pseudos["eq"];
                for (t in { radio: true, checkbox: true, file: true, password: true, image: true }) {
                    i.pseudos[t] = ce(t);
                }
                for (t in { submit: true, reset: true }) {
                    i.pseudos[t] = de(t);
                }
                function ye() {}
                ye.prototype = i.filters = i.pseudos;
                i.setFilters = new ye();
                s = oe.tokenize = function (e, t) {
                    var n,
                        r,
                        o,
                        s,
                        u,
                        a,
                        f,
                        l = E[e + " "];
                    if (l) {
                        return t ? 0 : l.slice(0);
                    }
                    u = e;
                    a = [];
                    f = i.preFilter;
                    while (u) {
                        if (!n || (r = B.exec(u))) {
                            if (r) {
                                u = u.slice(r[0].length) || u;
                            }
                            a.push((o = []));
                        }
                        n = false;
                        if ((r = _.exec(u))) {
                            n = r.shift();
                            o.push({ value: n, type: r[0].replace($, " ") });
                            u = u.slice(n.length);
                        }
                        for (s in i.filter) {
                            if ((r = V[s].exec(u)) && (!f[s] || (r = f[s](r)))) {
                                n = r.shift();
                                o.push({ value: n, type: s, matches: r });
                                u = u.slice(n.length);
                            }
                        }
                        if (!n) {
                            break;
                        }
                    }
                    return t ? u.length : u ? oe.error(e) : E(e, a).slice(0);
                };
                function me(e) {
                    var t = 0,
                        n = e.length,
                        i = "";
                    for (; t < n; t++) {
                        i += e[t].value;
                    }
                    return i;
                }
                function ve(e, t, n) {
                    var i = t.dir,
                        r = t.next,
                        o = r || i,
                        s = n && o === "parentNode",
                        u = C++;
                    return t.first
                        ? function (t, n, r) {
                              while ((t = t[i])) {
                                  if (t.nodeType === 1 || s) {
                                      return e(t, n, r);
                                  }
                              }
                              return false;
                          }
                        : function (t, n, a) {
                              var f,
                                  l,
                                  c,
                                  d = [T, u];
                              if (a) {
                                  while ((t = t[i])) {
                                      if (t.nodeType === 1 || s) {
                                          if (e(t, n, a)) {
                                              return true;
                                          }
                                      }
                                  }
                              } else {
                                  while ((t = t[i])) {
                                      if (t.nodeType === 1 || s) {
                                          c = t[b] || (t[b] = {});
                                          l = c[t.uniqueID] || (c[t.uniqueID] = {});
                                          if (r && r === t.nodeName.toLowerCase()) {
                                              t = t[i] || t;
                                          } else if ((f = l[o]) && f[0] === T && f[1] === u) {
                                              return (d[2] = f[2]);
                                          } else {
                                              l[o] = d;
                                              if ((d[2] = e(t, n, a))) {
                                                  return true;
                                              }
                                          }
                                      }
                                  }
                              }
                              return false;
                          };
                }
                function xe(e) {
                    return e.length > 1
                        ? function (t, n, i) {
                              var r = e.length;
                              while (r--) {
                                  if (!e[r](t, n, i)) {
                                      return false;
                                  }
                              }
                              return true;
                          }
                        : e[0];
                }
                function be(e, t, n) {
                    var i = 0,
                        r = t.length;
                    for (; i < r; i++) {
                        oe(e, t[i], n);
                    }
                    return n;
                }
                function we(e, t, n, i, r) {
                    var o,
                        s = [],
                        u = 0,
                        a = e.length,
                        f = t != null;
                    for (; u < a; u++) {
                        if ((o = e[u])) {
                            if (!n || n(o, i, r)) {
                                s.push(o);
                                if (f) {
                                    t.push(u);
                                }
                            }
                        }
                    }
                    return s;
                }
                function Te(e, t, n, i, r, o) {
                    if (i && !i[b]) {
                        i = Te(i);
                    }
                    if (r && !r[b]) {
                        r = Te(r, o);
                    }
                    return ue(function (o, s, u, a) {
                        var f,
                            l,
                            c,
                            d = [],
                            p = [],
                            h = s.length,
                            g = o || be(t || "*", u.nodeType ? [u] : u, []),
                            y = e && (o || !t) ? we(g, d, e, u, a) : g,
                            m = n ? (r || (o ? e : h || i) ? [] : s) : y;
                        if (n) {
                            n(y, m, u, a);
                        }
                        if (i) {
                            f = we(m, p);
                            i(f, [], u, a);
                            l = f.length;
                            while (l--) {
                                if ((c = f[l])) {
                                    m[p[l]] = !(y[p[l]] = c);
                                }
                            }
                        }
                        if (o) {
                            if (r || e) {
                                if (r) {
                                    f = [];
                                    l = m.length;
                                    while (l--) {
                                        if ((c = m[l])) {
                                            f.push((y[l] = c));
                                        }
                                    }
                                    r(null, (m = []), f, a);
                                }
                                l = m.length;
                                while (l--) {
                                    if ((c = m[l]) && (f = r ? F(o, c) : d[l]) > -1) {
                                        o[f] = !(s[f] = c);
                                    }
                                }
                            }
                        } else {
                            m = we(m === s ? m.splice(h, m.length) : m);
                            if (r) {
                                r(null, s, m, a);
                            } else {
                                L.apply(s, m);
                            }
                        }
                    });
                }
                function Ce(e) {
                    var t,
                        n,
                        r,
                        o = e.length,
                        s = i.relative[e[0].type],
                        u = s || i.relative[" "],
                        a = s ? 1 : 0,
                        l = ve(
                            function (e) {
                                return e === t;
                            },
                            u,
                            true
                        ),
                        c = ve(
                            function (e) {
                                return F(t, e) > -1;
                            },
                            u,
                            true
                        ),
                        d = [
                            function (e, n, i) {
                                var r = (!s && (i || n !== f)) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i));
                                t = null;
                                return r;
                            },
                        ];
                    for (; a < o; a++) {
                        if ((n = i.relative[e[a].type])) {
                            d = [ve(xe(d), n)];
                        } else {
                            n = i.filter[e[a].type].apply(null, e[a].matches);
                            if (n[b]) {
                                r = ++a;
                                for (; r < o; r++) {
                                    if (i.relative[e[r].type]) {
                                        break;
                                    }
                                }
                                return Te(a > 1 && xe(d), a > 1 && me(e.slice(0, a - 1).concat({ value: e[a - 2].type === " " ? "*" : "" })).replace($, "$1"), n, a < r && Ce(e.slice(a, r)), r < o && Ce((e = e.slice(r))), r < o && me(e));
                            }
                            d.push(n);
                        }
                    }
                    return xe(d);
                }
                function ke(e, t) {
                    var n = t.length > 0,
                        r = e.length > 0,
                        o = function (o, s, u, a, l) {
                            var c,
                                h,
                                y,
                                m = 0,
                                v = "0",
                                x = o && [],
                                b = [],
                                w = f,
                                C = o || (r && i.find["TAG"]("*", l)),
                                k = (T += w == null ? 1 : Math.random() || 0.1),
                                E = C.length;
                            if (l) {
                                f = s === p || s || l;
                            }
                            for (; v !== E && (c = C[v]) != null; v++) {
                                if (r && c) {
                                    h = 0;
                                    if (!s && c.ownerDocument !== p) {
                                        d(c);
                                        u = !g;
                                    }
                                    while ((y = e[h++])) {
                                        if (y(c, s || p, u)) {
                                            a.push(c);
                                            break;
                                        }
                                    }
                                    if (l) {
                                        T = k;
                                    }
                                }
                                if (n) {
                                    if ((c = !y && c)) {
                                        m--;
                                    }
                                    if (o) {
                                        x.push(c);
                                    }
                                }
                            }
                            m += v;
                            if (n && v !== m) {
                                h = 0;
                                while ((y = t[h++])) {
                                    y(x, b, s, u);
                                }
                                if (o) {
                                    if (m > 0) {
                                        while (v--) {
                                            if (!(x[v] || b[v])) {
                                                b[v] = A.call(a);
                                            }
                                        }
                                    }
                                    b = we(b);
                                }
                                L.apply(a, b);
                                if (l && !o && b.length > 0 && m + t.length > 1) {
                                    oe.uniqueSort(a);
                                }
                            }
                            if (l) {
                                T = k;
                                f = w;
                            }
                            return x;
                        };
                    return n ? ue(o) : o;
                }
                u = oe.compile = function (e, t) {
                    var n,
                        i = [],
                        r = [],
                        o = S[e + " "];
                    if (!o) {
                        if (!t) {
                            t = s(e);
                        }
                        n = t.length;
                        while (n--) {
                            o = Ce(t[n]);
                            if (o[b]) {
                                i.push(o);
                            } else {
                                r.push(o);
                            }
                        }
                        o = S(e, ke(r, i));
                        o.selector = e;
                    }
                    return o;
                };
                a = oe.select = function (e, t, n, r) {
                    var o,
                        a,
                        f,
                        l,
                        c,
                        d = typeof e === "function" && e,
                        p = !r && s((e = d.selector || e));
                    n = n || [];
                    if (p.length === 1) {
                        a = p[0] = p[0].slice(0);
                        if (a.length > 2 && (f = a[0]).type === "ID" && t.nodeType === 9 && g && i.relative[a[1].type]) {
                            t = (i.find["ID"](f.matches[0].replace(Z, ee), t) || [])[0];
                            if (!t) {
                                return n;
                            } else if (d) {
                                t = t.parentNode;
                            }
                            e = e.slice(a.shift().value.length);
                        }
                        o = V["needsContext"].test(e) ? 0 : a.length;
                        while (o--) {
                            f = a[o];
                            if (i.relative[(l = f.type)]) {
                                break;
                            }
                            if ((c = i.find[l])) {
                                if ((r = c(f.matches[0].replace(Z, ee), (K.test(a[0].type) && ge(t.parentNode)) || t))) {
                                    a.splice(o, 1);
                                    e = r.length && me(a);
                                    if (!e) {
                                        L.apply(n, r);
                                        return n;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    (d || u(e, p))(r, t, !g, n, !t || (K.test(e) && ge(t.parentNode)) || t);
                    return n;
                };
                n.sortStable = b.split("").sort(N).join("") === b;
                n.detectDuplicates = !!c;
                d();
                n.sortDetached = ae(function (e) {
                    return e.compareDocumentPosition(p.createElement("fieldset")) & 1;
                });
                if (
                    !ae(function (e) {
                        e.innerHTML = "<a href='#'></a>";
                        return e.firstChild.getAttribute("href") === "#";
                    })
                ) {
                    fe("type|href|height|width", function (e, t, n) {
                        if (!n) {
                            return e.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2);
                        }
                    });
                }
                if (
                    !n.attributes ||
                    !ae(function (e) {
                        e.innerHTML = "<input/>";
                        e.firstChild.setAttribute("value", "");
                        return e.firstChild.getAttribute("value") === "";
                    })
                ) {
                    fe("value", function (e, t, n) {
                        if (!n && e.nodeName.toLowerCase() === "input") {
                            return e.defaultValue;
                        }
                    });
                }
                if (
                    !ae(function (e) {
                        return e.getAttribute("disabled") == null;
                    })
                ) {
                    fe(O, function (e, t, n) {
                        var i;
                        if (!n) {
                            return e[t] === true ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
                        }
                    });
                }
                return oe;
            })(e);
            m.find = C;
            m.expr = C.selectors;
            m.expr[":"] = m.expr.pseudos;
            m.uniqueSort = m.unique = C.uniqueSort;
            m.text = C.getText;
            m.isXMLDoc = C.isXML;
            m.contains = C.contains;
            m.escapeSelector = C.escape;
            var k = function (e, t, n) {
                var i = [],
                    r = n !== undefined;
                while ((e = e[t]) && e.nodeType !== 9) {
                    if (e.nodeType === 1) {
                        if (r && m(e).is(n)) {
                            break;
                        }
                        i.push(e);
                    }
                }
                return i;
            };
            var E = function (e, t) {
                var n = [];
                for (; e; e = e.nextSibling) {
                    if (e.nodeType === 1 && e !== t) {
                        n.push(e);
                    }
                }
                return n;
            };
            var S = m.expr.match.needsContext;
            function N(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
            }
            var D = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
            var j = /^.[^:#\[\.,]*$/;
            function A(e, t, n) {
                if (m.isFunction(t)) {
                    return m.grep(e, function (e, i) {
                        return !!t.call(e, i, e) !== n;
                    });
                }
                if (t.nodeType) {
                    return m.grep(e, function (e) {
                        return (e === t) !== n;
                    });
                }
                if (typeof t !== "string") {
                    return m.grep(e, function (e) {
                        return a.call(t, e) > -1 !== n;
                    });
                }
                if (j.test(t)) {
                    return m.filter(t, e, n);
                }
                t = m.filter(t, e);
                return m.grep(e, function (e) {
                    return a.call(t, e) > -1 !== n && e.nodeType === 1;
                });
            }
            m.filter = function (e, t, n) {
                var i = t[0];
                if (n) {
                    e = ":not(" + e + ")";
                }
                if (t.length === 1 && i.nodeType === 1) {
                    return m.find.matchesSelector(i, e) ? [i] : [];
                }
                return m.find.matches(
                    e,
                    m.grep(t, function (e) {
                        return e.nodeType === 1;
                    })
                );
            };
            m.fn.extend({
                find: function (e) {
                    var t,
                        n,
                        i = this.length,
                        r = this;
                    if (typeof e !== "string") {
                        return this.pushStack(
                            m(e).filter(function () {
                                for (t = 0; t < i; t++) {
                                    if (m.contains(r[t], this)) {
                                        return true;
                                    }
                                }
                            })
                        );
                    }
                    n = this.pushStack([]);
                    for (t = 0; t < i; t++) {
                        m.find(e, r[t], n);
                    }
                    return i > 1 ? m.uniqueSort(n) : n;
                },
                filter: function (e) {
                    return this.pushStack(A(this, e || [], false));
                },
                not: function (e) {
                    return this.pushStack(A(this, e || [], true));
                },
                is: function (e) {
                    return !!A(this, typeof e === "string" && S.test(e) ? m(e) : e || [], false).length;
                },
            });
            var q,
                L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
                H = (m.fn.init = function (e, t, n) {
                    var r, o;
                    if (!e) {
                        return this;
                    }
                    n = n || q;
                    if (typeof e === "string") {
                        if (e[0] === "<" && e[e.length - 1] === ">" && e.length >= 3) {
                            r = [null, e, null];
                        } else {
                            r = L.exec(e);
                        }
                        if (r && (r[1] || !t)) {
                            if (r[1]) {
                                t = t instanceof m ? t[0] : t;
                                m.merge(this, m.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : i, true));
                                if (D.test(r[1]) && m.isPlainObject(t)) {
                                    for (r in t) {
                                        if (m.isFunction(this[r])) {
                                            this[r](t[r]);
                                        } else {
                                            this.attr(r, t[r]);
                                        }
                                    }
                                }
                                return this;
                            } else {
                                o = i.getElementById(r[2]);
                                if (o) {
                                    this[0] = o;
                                    this.length = 1;
                                }
                                return this;
                            }
                        } else if (!t || t.jquery) {
                            return (t || n).find(e);
                        } else {
                            return this.constructor(t).find(e);
                        }
                    } else if (e.nodeType) {
                        this[0] = e;
                        this.length = 1;
                        return this;
                    } else if (m.isFunction(e)) {
                        return n.ready !== undefined ? n.ready(e) : e(m);
                    }
                    return m.makeArray(e, this);
                });
            H.prototype = m.fn;
            q = m(i);
            var F = /^(?:parents|prev(?:Until|All))/,
                O = { children: true, contents: true, next: true, prev: true };
            m.fn.extend({
                has: function (e) {
                    var t = m(e, this),
                        n = t.length;
                    return this.filter(function () {
                        var e = 0;
                        for (; e < n; e++) {
                            if (m.contains(this, t[e])) {
                                return true;
                            }
                        }
                    });
                },
                closest: function (e, t) {
                    var n,
                        i = 0,
                        r = this.length,
                        o = [],
                        s = typeof e !== "string" && m(e);
                    if (!S.test(e)) {
                        for (; i < r; i++) {
                            for (n = this[i]; n && n !== t; n = n.parentNode) {
                                if (n.nodeType < 11 && (s ? s.index(n) > -1 : n.nodeType === 1 && m.find.matchesSelector(n, e))) {
                                    o.push(n);
                                    break;
                                }
                            }
                        }
                    }
                    return this.pushStack(o.length > 1 ? m.uniqueSort(o) : o);
                },
                index: function (e) {
                    if (!e) {
                        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
                    }
                    if (typeof e === "string") {
                        return a.call(m(e), this[0]);
                    }
                    return a.call(this, e.jquery ? e[0] : e);
                },
                add: function (e, t) {
                    return this.pushStack(m.uniqueSort(m.merge(this.get(), m(e, t))));
                },
                addBack: function (e) {
                    return this.add(e == null ? this.prevObject : this.prevObject.filter(e));
                },
            });
            function P(e, t) {
                while ((e = e[t]) && e.nodeType !== 1) {}
                return e;
            }
            m.each(
                {
                    parent: function (e) {
                        var t = e.parentNode;
                        return t && t.nodeType !== 11 ? t : null;
                    },
                    parents: function (e) {
                        return k(e, "parentNode");
                    },
                    parentsUntil: function (e, t, n) {
                        return k(e, "parentNode", n);
                    },
                    next: function (e) {
                        return P(e, "nextSibling");
                    },
                    prev: function (e) {
                        return P(e, "previousSibling");
                    },
                    nextAll: function (e) {
                        return k(e, "nextSibling");
                    },
                    prevAll: function (e) {
                        return k(e, "previousSibling");
                    },
                    nextUntil: function (e, t, n) {
                        return k(e, "nextSibling", n);
                    },
                    prevUntil: function (e, t, n) {
                        return k(e, "previousSibling", n);
                    },
                    siblings: function (e) {
                        return E((e.parentNode || {}).firstChild, e);
                    },
                    children: function (e) {
                        return E(e.firstChild);
                    },
                    contents: function (e) {
                        if (N(e, "iframe")) {
                            return e.contentDocument;
                        }
                        if (N(e, "template")) {
                            e = e.content || e;
                        }
                        return m.merge([], e.childNodes);
                    },
                },
                function (e, t) {
                    m.fn[e] = function (n, i) {
                        var r = m.map(this, t, n);
                        if (e.slice(-5) !== "Until") {
                            i = n;
                        }
                        if (i && typeof i === "string") {
                            r = m.filter(i, r);
                        }
                        if (this.length > 1) {
                            if (!O[e]) {
                                m.uniqueSort(r);
                            }
                            if (F.test(e)) {
                                r.reverse();
                            }
                        }
                        return this.pushStack(r);
                    };
                }
            );
            var R = /[^\x20\t\r\n\f]+/g;
            function M(e) {
                var t = {};
                m.each(e.match(R) || [], function (e, n) {
                    t[n] = true;
                });
                return t;
            }
            m.Callbacks = function (e) {
                e = typeof e === "string" ? M(e) : m.extend({}, e);
                var t,
                    n,
                    i,
                    r,
                    o = [],
                    s = [],
                    u = -1,
                    a = function () {
                        r = r || e.once;
                        i = t = true;
                        for (; s.length; u = -1) {
                            n = s.shift();
                            while (++u < o.length) {
                                if (o[u].apply(n[0], n[1]) === false && e.stopOnFalse) {
                                    u = o.length;
                                    n = false;
                                }
                            }
                        }
                        if (!e.memory) {
                            n = false;
                        }
                        t = false;
                        if (r) {
                            if (n) {
                                o = [];
                            } else {
                                o = "";
                            }
                        }
                    },
                    f = {
                        add: function () {
                            if (o) {
                                if (n && !t) {
                                    u = o.length - 1;
                                    s.push(n);
                                }
                                (function t(n) {
                                    m.each(n, function (n, i) {
                                        if (m.isFunction(i)) {
                                            if (!e.unique || !f.has(i)) {
                                                o.push(i);
                                            }
                                        } else if (i && i.length && m.type(i) !== "string") {
                                            t(i);
                                        }
                                    });
                                })(arguments);
                                if (n && !t) {
                                    a();
                                }
                            }
                            return this;
                        },
                        remove: function () {
                            m.each(arguments, function (e, t) {
                                var n;
                                while ((n = m.inArray(t, o, n)) > -1) {
                                    o.splice(n, 1);
                                    if (n <= u) {
                                        u--;
                                    }
                                }
                            });
                            return this;
                        },
                        has: function (e) {
                            return e ? m.inArray(e, o) > -1 : o.length > 0;
                        },
                        empty: function () {
                            if (o) {
                                o = [];
                            }
                            return this;
                        },
                        disable: function () {
                            r = s = [];
                            o = n = "";
                            return this;
                        },
                        disabled: function () {
                            return !o;
                        },
                        lock: function () {
                            r = s = [];
                            if (!n && !t) {
                                o = n = "";
                            }
                            return this;
                        },
                        locked: function () {
                            return !!r;
                        },
                        fireWith: function (e, n) {
                            if (!r) {
                                n = n || [];
                                n = [e, n.slice ? n.slice() : n];
                                s.push(n);
                                if (!t) {
                                    a();
                                }
                            }
                            return this;
                        },
                        fire: function () {
                            f.fireWith(this, arguments);
                            return this;
                        },
                        fired: function () {
                            return !!i;
                        },
                    };
                return f;
            };
            function I(e) {
                return e;
            }
            function W(e) {
                throw e;
            }
            function $(e, t, n, i) {
                var r;
                try {
                    if (e && m.isFunction((r = e.promise))) {
                        r.call(e).done(t).fail(n);
                    } else if (e && m.isFunction((r = e.then))) {
                        r.call(e, t, n);
                    } else {
                        t.apply(undefined, [e].slice(i));
                    }
                } catch (e) {
                    n.apply(undefined, [e]);
                }
            }
            m.extend({
                Deferred: function (t) {
                    var n = [
                            ["notify", "progress", m.Callbacks("memory"), m.Callbacks("memory"), 2],
                            ["resolve", "done", m.Callbacks("once memory"), m.Callbacks("once memory"), 0, "resolved"],
                            ["reject", "fail", m.Callbacks("once memory"), m.Callbacks("once memory"), 1, "rejected"],
                        ],
                        i = "pending",
                        r = {
                            state: function () {
                                return i;
                            },
                            always: function () {
                                o.done(arguments).fail(arguments);
                                return this;
                            },
                            catch: function (e) {
                                return r.then(null, e);
                            },
                            pipe: function () {
                                var e = arguments;
                                return m
                                    .Deferred(function (t) {
                                        m.each(n, function (n, i) {
                                            var r = m.isFunction(e[i[4]]) && e[i[4]];
                                            o[i[1]](function () {
                                                var e = r && r.apply(this, arguments);
                                                if (e && m.isFunction(e.promise)) {
                                                    e.promise().progress(t.notify).done(t.resolve).fail(t.reject);
                                                } else {
                                                    t[i[0] + "With"](this, r ? [e] : arguments);
                                                }
                                            });
                                        });
                                        e = null;
                                    })
                                    .promise();
                            },
                            then: function (t, i, r) {
                                var o = 0;
                                function s(t, n, i, r) {
                                    return function () {
                                        var u = this,
                                            a = arguments,
                                            f = function () {
                                                var e, f;
                                                if (t < o) {
                                                    return;
                                                }
                                                e = i.apply(u, a);
                                                if (e === n.promise()) {
                                                    throw new TypeError("Thenable self-resolution");
                                                }
                                                f = e && (typeof e === "object" || typeof e === "function") && e.then;
                                                if (m.isFunction(f)) {
                                                    if (r) {
                                                        f.call(e, s(o, n, I, r), s(o, n, W, r));
                                                    } else {
                                                        o++;
                                                        f.call(e, s(o, n, I, r), s(o, n, W, r), s(o, n, I, n.notifyWith));
                                                    }
                                                } else {
                                                    if (i !== I) {
                                                        u = undefined;
                                                        a = [e];
                                                    }
                                                    (r || n.resolveWith)(u, a);
                                                }
                                            },
                                            l = r
                                                ? f
                                                : function () {
                                                      try {
                                                          f();
                                                      } catch (e) {
                                                          if (m.Deferred.exceptionHook) {
                                                              m.Deferred.exceptionHook(e, l.stackTrace);
                                                          }
                                                          if (t + 1 >= o) {
                                                              if (i !== W) {
                                                                  u = undefined;
                                                                  a = [e];
                                                              }
                                                              n.rejectWith(u, a);
                                                          }
                                                      }
                                                  };
                                        if (t) {
                                            l();
                                        } else {
                                            if (m.Deferred.getStackHook) {
                                                l.stackTrace = m.Deferred.getStackHook();
                                            }
                                            e.setTimeout(l);
                                        }
                                    };
                                }
                                return m
                                    .Deferred(function (e) {
                                        n[0][3].add(s(0, e, m.isFunction(r) ? r : I, e.notifyWith));
                                        n[1][3].add(s(0, e, m.isFunction(t) ? t : I));
                                        n[2][3].add(s(0, e, m.isFunction(i) ? i : W));
                                    })
                                    .promise();
                            },
                            promise: function (e) {
                                return e != null ? m.extend(e, r) : r;
                            },
                        },
                        o = {};
                    m.each(n, function (e, t) {
                        var s = t[2],
                            u = t[5];
                        r[t[1]] = s.add;
                        if (u) {
                            s.add(
                                function () {
                                    i = u;
                                },
                                n[3 - e][2].disable,
                                n[0][2].lock
                            );
                        }
                        s.add(t[3].fire);
                        o[t[0]] = function () {
                            o[t[0] + "With"](this === o ? undefined : this, arguments);
                            return this;
                        };
                        o[t[0] + "With"] = s.fireWith;
                    });
                    r.promise(o);
                    if (t) {
                        t.call(o, o);
                    }
                    return o;
                },
                when: function (e) {
                    var t = arguments.length,
                        n = t,
                        i = Array(n),
                        r = o.call(arguments),
                        s = m.Deferred(),
                        u = function (e) {
                            return function (n) {
                                i[e] = this;
                                r[e] = arguments.length > 1 ? o.call(arguments) : n;
                                if (!--t) {
                                    s.resolveWith(i, r);
                                }
                            };
                        };
                    if (t <= 1) {
                        $(e, s.done(u(n)).resolve, s.reject, !t);
                        if (s.state() === "pending" || m.isFunction(r[n] && r[n].then)) {
                            return s.then();
                        }
                    }
                    while (n--) {
                        $(r[n], u(n), s.reject);
                    }
                    return s.promise();
                },
            });
            var B = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
            m.Deferred.exceptionHook = function (t, n) {
                if (e.console && e.console.warn && t && B.test(t.name)) {
                    e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n);
                }
            };
            m.readyException = function (t) {
                e.setTimeout(function () {
                    throw t;
                });
            };
            var _ = m.Deferred();
            m.fn.ready = function (e) {
                _.then(e).catch(function (e) {
                    m.readyException(e);
                });
                return this;
            };
            m.extend({
                isReady: false,
                readyWait: 1,
                ready: function (e) {
                    if (e === true ? --m.readyWait : m.isReady) {
                        return;
                    }
                    m.isReady = true;
                    if (e !== true && --m.readyWait > 0) {
                        return;
                    }
                    _.resolveWith(i, [m]);
                },
            });
            m.ready.then = _.then;
            function z() {
                i.removeEventListener("DOMContentLoaded", z);
                e.removeEventListener("load", z);
                m.ready();
            }
            if (i.readyState === "complete" || (i.readyState !== "loading" && !i.documentElement.doScroll)) {
                e.setTimeout(m.ready);
            } else {
                i.addEventListener("DOMContentLoaded", z);
                e.addEventListener("load", z);
            }
            var X = function (e, t, n, i, r, o, s) {
                var u = 0,
                    a = e.length,
                    f = n == null;
                if (m.type(n) === "object") {
                    r = true;
                    for (u in n) {
                        X(e, t, u, n[u], true, o, s);
                    }
                } else if (i !== undefined) {
                    r = true;
                    if (!m.isFunction(i)) {
                        s = true;
                    }
                    if (f) {
                        if (s) {
                            t.call(e, i);
                            t = null;
                        } else {
                            f = t;
                            t = function (e, t, n) {
                                return f.call(m(e), n);
                            };
                        }
                    }
                    if (t) {
                        for (; u < a; u++) {
                            t(e[u], n, s ? i : i.call(e[u], u, t(e[u], n)));
                        }
                    }
                }
                if (r) {
                    return e;
                }
                if (f) {
                    return t.call(e);
                }
                return a ? t(e[0], n) : o;
            };
            var U = function (e) {
                return e.nodeType === 1 || e.nodeType === 9 || !+e.nodeType;
            };
            function V() {
                this.expando = m.expando + V.uid++;
            }
            V.uid = 1;
            V.prototype = {
                cache: function (e) {
                    var t = e[this.expando];
                    if (!t) {
                        t = {};
                        if (U(e)) {
                            if (e.nodeType) {
                                e[this.expando] = t;
                            } else {
                                Object.defineProperty(e, this.expando, { value: t, configurable: true });
                            }
                        }
                    }
                    return t;
                },
                set: function (e, t, n) {
                    var i,
                        r = this.cache(e);
                    if (typeof t === "string") {
                        r[m.camelCase(t)] = n;
                    } else {
                        for (i in t) {
                            r[m.camelCase(i)] = t[i];
                        }
                    }
                    return r;
                },
                get: function (e, t) {
                    return t === undefined ? this.cache(e) : e[this.expando] && e[this.expando][m.camelCase(t)];
                },
                access: function (e, t, n) {
                    if (t === undefined || (t && typeof t === "string" && n === undefined)) {
                        return this.get(e, t);
                    }
                    this.set(e, t, n);
                    return n !== undefined ? n : t;
                },
                remove: function (e, t) {
                    var n,
                        i = e[this.expando];
                    if (i === undefined) {
                        return;
                    }
                    if (t !== undefined) {
                        if (Array.isArray(t)) {
                            t = t.map(m.camelCase);
                        } else {
                            t = m.camelCase(t);
                            t = t in i ? [t] : t.match(R) || [];
                        }
                        n = t.length;
                        while (n--) {
                            delete i[t[n]];
                        }
                    }
                    if (t === undefined || m.isEmptyObject(i)) {
                        if (e.nodeType) {
                            e[this.expando] = undefined;
                        } else {
                            delete e[this.expando];
                        }
                    }
                },
                hasData: function (e) {
                    var t = e[this.expando];
                    return t !== undefined && !m.isEmptyObject(t);
                },
            };
            var G = new V();
            var Y = new V();
            var Q = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                J = /[A-Z]/g;
            function K(e) {
                if (e === "true") {
                    return true;
                }
                if (e === "false") {
                    return false;
                }
                if (e === "null") {
                    return null;
                }
                if (e === +e + "") {
                    return +e;
                }
                if (Q.test(e)) {
                    return JSON.parse(e);
                }
                return e;
            }
            function Z(e, t, n) {
                var i;
                if (n === undefined && e.nodeType === 1) {
                    i = "data-" + t.replace(J, "-$&").toLowerCase();
                    n = e.getAttribute(i);
                    if (typeof n === "string") {
                        try {
                            n = K(n);
                        } catch (e) {}
                        Y.set(e, t, n);
                    } else {
                        n = undefined;
                    }
                }
                return n;
            }
            m.extend({
                hasData: function (e) {
                    return Y.hasData(e) || G.hasData(e);
                },
                data: function (e, t, n) {
                    return Y.access(e, t, n);
                },
                removeData: function (e, t) {
                    Y.remove(e, t);
                },
                _data: function (e, t, n) {
                    return G.access(e, t, n);
                },
                _removeData: function (e, t) {
                    G.remove(e, t);
                },
            });
            m.fn.extend({
                data: function (e, t) {
                    var n,
                        i,
                        r,
                        o = this[0],
                        s = o && o.attributes;
                    if (e === undefined) {
                        if (this.length) {
                            r = Y.get(o);
                            if (o.nodeType === 1 && !G.get(o, "hasDataAttrs")) {
                                n = s.length;
                                while (n--) {
                                    if (s[n]) {
                                        i = s[n].name;
                                        if (i.indexOf("data-") === 0) {
                                            i = m.camelCase(i.slice(5));
                                            Z(o, i, r[i]);
                                        }
                                    }
                                }
                                G.set(o, "hasDataAttrs", true);
                            }
                        }
                        return r;
                    }
                    if (typeof e === "object") {
                        return this.each(function () {
                            Y.set(this, e);
                        });
                    }
                    return X(
                        this,
                        function (t) {
                            var n;
                            if (o && t === undefined) {
                                n = Y.get(o, e);
                                if (n !== undefined) {
                                    return n;
                                }
                                n = Z(o, e);
                                if (n !== undefined) {
                                    return n;
                                }
                                return;
                            }
                            this.each(function () {
                                Y.set(this, e, t);
                            });
                        },
                        null,
                        t,
                        arguments.length > 1,
                        null,
                        true
                    );
                },
                removeData: function (e) {
                    return this.each(function () {
                        Y.remove(this, e);
                    });
                },
            });
            m.extend({
                queue: function (e, t, n) {
                    var i;
                    if (e) {
                        t = (t || "fx") + "queue";
                        i = G.get(e, t);
                        if (n) {
                            if (!i || Array.isArray(n)) {
                                i = G.access(e, t, m.makeArray(n));
                            } else {
                                i.push(n);
                            }
                        }
                        return i || [];
                    }
                },
                dequeue: function (e, t) {
                    t = t || "fx";
                    var n = m.queue(e, t),
                        i = n.length,
                        r = n.shift(),
                        o = m._queueHooks(e, t),
                        s = function () {
                            m.dequeue(e, t);
                        };
                    if (r === "inprogress") {
                        r = n.shift();
                        i--;
                    }
                    if (r) {
                        if (t === "fx") {
                            n.unshift("inprogress");
                        }
                        delete o.stop;
                        r.call(e, s, o);
                    }
                    if (!i && o) {
                        o.empty.fire();
                    }
                },
                _queueHooks: function (e, t) {
                    var n = t + "queueHooks";
                    return (
                        G.get(e, n) ||
                        G.access(e, n, {
                            empty: m.Callbacks("once memory").add(function () {
                                G.remove(e, [t + "queue", n]);
                            }),
                        })
                    );
                },
            });
            m.fn.extend({
                queue: function (e, t) {
                    var n = 2;
                    if (typeof e !== "string") {
                        t = e;
                        e = "fx";
                        n--;
                    }
                    if (arguments.length < n) {
                        return m.queue(this[0], e);
                    }
                    return t === undefined
                        ? this
                        : this.each(function () {
                              var n = m.queue(this, e, t);
                              m._queueHooks(this, e);
                              if (e === "fx" && n[0] !== "inprogress") {
                                  m.dequeue(this, e);
                              }
                          });
                },
                dequeue: function (e) {
                    return this.each(function () {
                        m.dequeue(this, e);
                    });
                },
                clearQueue: function (e) {
                    return this.queue(e || "fx", []);
                },
                promise: function (e, t) {
                    var n,
                        i = 1,
                        r = m.Deferred(),
                        o = this,
                        s = this.length,
                        u = function () {
                            if (!--i) {
                                r.resolveWith(o, [o]);
                            }
                        };
                    if (typeof e !== "string") {
                        t = e;
                        e = undefined;
                    }
                    e = e || "fx";
                    while (s--) {
                        n = G.get(o[s], e + "queueHooks");
                        if (n && n.empty) {
                            i++;
                            n.empty.add(u);
                        }
                    }
                    u();
                    return r.promise(t);
                },
            });
            var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
            var te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i");
            var ne = ["Top", "Right", "Bottom", "Left"];
            var ie = function (e, t) {
                e = t || e;
                return e.style.display === "none" || (e.style.display === "" && m.contains(e.ownerDocument, e) && m.css(e, "display") === "none");
            };
            var re = function (e, t, n, i) {
                var r,
                    o,
                    s = {};
                for (o in t) {
                    s[o] = e.style[o];
                    e.style[o] = t[o];
                }
                r = n.apply(e, i || []);
                for (o in t) {
                    e.style[o] = s[o];
                }
                return r;
            };
            function oe(e, t, n, i) {
                var r,
                    o = 1,
                    s = 20,
                    u = i
                        ? function () {
                              return i.cur();
                          }
                        : function () {
                              return m.css(e, t, "");
                          },
                    a = u(),
                    f = (n && n[3]) || (m.cssNumber[t] ? "" : "px"),
                    l = (m.cssNumber[t] || (f !== "px" && +a)) && te.exec(m.css(e, t));
                if (l && l[3] !== f) {
                    f = f || l[3];
                    n = n || [];
                    l = +a || 1;
                    do {
                        o = o || ".5";
                        l = l / o;
                        m.style(e, t, l + f);
                    } while (o !== (o = u() / a) && o !== 1 && --s);
                }
                if (n) {
                    l = +l || +a || 0;
                    r = n[1] ? l + (n[1] + 1) * n[2] : +n[2];
                    if (i) {
                        i.unit = f;
                        i.start = l;
                        i.end = r;
                    }
                }
                return r;
            }
            var se = {};
            function ue(e) {
                var t,
                    n = e.ownerDocument,
                    i = e.nodeName,
                    r = se[i];
                if (r) {
                    return r;
                }
                t = n.body.appendChild(n.createElement(i));
                r = m.css(t, "display");
                t.parentNode.removeChild(t);
                if (r === "none") {
                    r = "block";
                }
                se[i] = r;
                return r;
            }
            function ae(e, t) {
                var n,
                    i,
                    r = [],
                    o = 0,
                    s = e.length;
                for (; o < s; o++) {
                    i = e[o];
                    if (!i.style) {
                        continue;
                    }
                    n = i.style.display;
                    if (t) {
                        if (n === "none") {
                            r[o] = G.get(i, "display") || null;
                            if (!r[o]) {
                                i.style.display = "";
                            }
                        }
                        if (i.style.display === "" && ie(i)) {
                            r[o] = ue(i);
                        }
                    } else {
                        if (n !== "none") {
                            r[o] = "none";
                            G.set(i, "display", n);
                        }
                    }
                }
                for (o = 0; o < s; o++) {
                    if (r[o] != null) {
                        e[o].style.display = r[o];
                    }
                }
                return e;
            }
            m.fn.extend({
                show: function () {
                    return ae(this, true);
                },
                hide: function () {
                    return ae(this);
                },
                toggle: function (e) {
                    if (typeof e === "boolean") {
                        return e ? this.show() : this.hide();
                    }
                    return this.each(function () {
                        if (ie(this)) {
                            m(this).show();
                        } else {
                            m(this).hide();
                        }
                    });
                },
            });
            var fe = /^(?:checkbox|radio)$/i;
            var le = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;
            var ce = /^$|\/(?:java|ecma)script/i;
            var de = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""],
            };
            de.optgroup = de.option;
            de.tbody = de.tfoot = de.colgroup = de.caption = de.thead;
            de.th = de.td;
            function pe(e, t) {
                var n;
                if (typeof e.getElementsByTagName !== "undefined") {
                    n = e.getElementsByTagName(t || "*");
                } else if (typeof e.querySelectorAll !== "undefined") {
                    n = e.querySelectorAll(t || "*");
                } else {
                    n = [];
                }
                if (t === undefined || (t && N(e, t))) {
                    return m.merge([e], n);
                }
                return n;
            }
            function he(e, t) {
                var n = 0,
                    i = e.length;
                for (; n < i; n++) {
                    G.set(e[n], "globalEval", !t || G.get(t[n], "globalEval"));
                }
            }
            var ge = /<|&#?\w+;/;
            function ye(e, t, n, i, r) {
                var o,
                    s,
                    u,
                    a,
                    f,
                    l,
                    c = t.createDocumentFragment(),
                    d = [],
                    p = 0,
                    h = e.length;
                for (; p < h; p++) {
                    o = e[p];
                    if (o || o === 0) {
                        if (m.type(o) === "object") {
                            m.merge(d, o.nodeType ? [o] : o);
                        } else if (!ge.test(o)) {
                            d.push(t.createTextNode(o));
                        } else {
                            s = s || c.appendChild(t.createElement("div"));
                            u = (le.exec(o) || ["", ""])[1].toLowerCase();
                            a = de[u] || de._default;
                            s.innerHTML = a[1] + m.htmlPrefilter(o) + a[2];
                            l = a[0];
                            while (l--) {
                                s = s.lastChild;
                            }
                            m.merge(d, s.childNodes);
                            s = c.firstChild;
                            s.textContent = "";
                        }
                    }
                }
                c.textContent = "";
                p = 0;
                while ((o = d[p++])) {
                    if (i && m.inArray(o, i) > -1) {
                        if (r) {
                            r.push(o);
                        }
                        continue;
                    }
                    f = m.contains(o.ownerDocument, o);
                    s = pe(c.appendChild(o), "script");
                    if (f) {
                        he(s);
                    }
                    if (n) {
                        l = 0;
                        while ((o = s[l++])) {
                            if (ce.test(o.type || "")) {
                                n.push(o);
                            }
                        }
                    }
                }
                return c;
            }
            (function () {
                var e = i.createDocumentFragment(),
                    t = e.appendChild(i.createElement("div")),
                    n = i.createElement("input");
                n.setAttribute("type", "radio");
                n.setAttribute("checked", "checked");
                n.setAttribute("name", "t");
                t.appendChild(n);
                h.checkClone = t.cloneNode(true).cloneNode(true).lastChild.checked;
                t.innerHTML = "<textarea>x</textarea>";
                h.noCloneChecked = !!t.cloneNode(true).lastChild.defaultValue;
            })();
            var me = i.documentElement;
            var ve = /^key/,
                xe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                be = /^([^.]*)(?:\.(.+)|)/;
            function we() {
                return true;
            }
            function Te() {
                return false;
            }
            function Ce() {
                try {
                    return i.activeElement;
                } catch (e) {}
            }
            function ke(e, t, n, i, r, o) {
                var s, u;
                if (typeof t === "object") {
                    if (typeof n !== "string") {
                        i = i || n;
                        n = undefined;
                    }
                    for (u in t) {
                        ke(e, u, n, i, t[u], o);
                    }
                    return e;
                }
                if (i == null && r == null) {
                    r = n;
                    i = n = undefined;
                } else if (r == null) {
                    if (typeof n === "string") {
                        r = i;
                        i = undefined;
                    } else {
                        r = i;
                        i = n;
                        n = undefined;
                    }
                }
                if (r === false) {
                    r = Te;
                } else if (!r) {
                    return e;
                }
                if (o === 1) {
                    s = r;
                    r = function (e) {
                        m().off(e);
                        return s.apply(this, arguments);
                    };
                    r.guid = s.guid || (s.guid = m.guid++);
                }
                return e.each(function () {
                    m.event.add(this, t, r, i, n);
                });
            }
            m.event = {
                global: {},
                add: function (e, t, n, i, r) {
                    var o,
                        s,
                        u,
                        a,
                        f,
                        l,
                        c,
                        d,
                        p,
                        h,
                        g,
                        y = G.get(e);
                    if (!y) {
                        return;
                    }
                    if (n.handler) {
                        o = n;
                        n = o.handler;
                        r = o.selector;
                    }
                    if (r) {
                        m.find.matchesSelector(me, r);
                    }
                    if (!n.guid) {
                        n.guid = m.guid++;
                    }
                    if (!(a = y.events)) {
                        a = y.events = {};
                    }
                    if (!(s = y.handle)) {
                        s = y.handle = function (t) {
                            return typeof m !== "undefined" && m.event.triggered !== t.type ? m.event.dispatch.apply(e, arguments) : undefined;
                        };
                    }
                    t = (t || "").match(R) || [""];
                    f = t.length;
                    while (f--) {
                        u = be.exec(t[f]) || [];
                        p = g = u[1];
                        h = (u[2] || "").split(".").sort();
                        if (!p) {
                            continue;
                        }
                        c = m.event.special[p] || {};
                        p = (r ? c.delegateType : c.bindType) || p;
                        c = m.event.special[p] || {};
                        l = m.extend({ type: p, origType: g, data: i, handler: n, guid: n.guid, selector: r, needsContext: r && m.expr.match.needsContext.test(r), namespace: h.join(".") }, o);
                        if (!(d = a[p])) {
                            d = a[p] = [];
                            d.delegateCount = 0;
                            if (!c.setup || c.setup.call(e, i, h, s) === false) {
                                if (e.addEventListener) {
                                    e.addEventListener(p, s);
                                }
                            }
                        }
                        if (c.add) {
                            c.add.call(e, l);
                            if (!l.handler.guid) {
                                l.handler.guid = n.guid;
                            }
                        }
                        if (r) {
                            d.splice(d.delegateCount++, 0, l);
                        } else {
                            d.push(l);
                        }
                        m.event.global[p] = true;
                    }
                },
                remove: function (e, t, n, i, r) {
                    var o,
                        s,
                        u,
                        a,
                        f,
                        l,
                        c,
                        d,
                        p,
                        h,
                        g,
                        y = G.hasData(e) && G.get(e);
                    if (!y || !(a = y.events)) {
                        return;
                    }
                    t = (t || "").match(R) || [""];
                    f = t.length;
                    while (f--) {
                        u = be.exec(t[f]) || [];
                        p = g = u[1];
                        h = (u[2] || "").split(".").sort();
                        if (!p) {
                            for (p in a) {
                                m.event.remove(e, p + t[f], n, i, true);
                            }
                            continue;
                        }
                        c = m.event.special[p] || {};
                        p = (i ? c.delegateType : c.bindType) || p;
                        d = a[p] || [];
                        u = u[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)");
                        s = o = d.length;
                        while (o--) {
                            l = d[o];
                            if ((r || g === l.origType) && (!n || n.guid === l.guid) && (!u || u.test(l.namespace)) && (!i || i === l.selector || (i === "**" && l.selector))) {
                                d.splice(o, 1);
                                if (l.selector) {
                                    d.delegateCount--;
                                }
                                if (c.remove) {
                                    c.remove.call(e, l);
                                }
                            }
                        }
                        if (s && !d.length) {
                            if (!c.teardown || c.teardown.call(e, h, y.handle) === false) {
                                m.removeEvent(e, p, y.handle);
                            }
                            delete a[p];
                        }
                    }
                    if (m.isEmptyObject(a)) {
                        G.remove(e, "handle events");
                    }
                },
                dispatch: function (e) {
                    var t = m.event.fix(e);
                    var n,
                        i,
                        r,
                        o,
                        s,
                        u,
                        a = new Array(arguments.length),
                        f = (G.get(this, "events") || {})[t.type] || [],
                        l = m.event.special[t.type] || {};
                    a[0] = t;
                    for (n = 1; n < arguments.length; n++) {
                        a[n] = arguments[n];
                    }
                    t.delegateTarget = this;
                    if (l.preDispatch && l.preDispatch.call(this, t) === false) {
                        return;
                    }
                    u = m.event.handlers.call(this, t, f);
                    n = 0;
                    while ((o = u[n++]) && !t.isPropagationStopped()) {
                        t.currentTarget = o.elem;
                        i = 0;
                        while ((s = o.handlers[i++]) && !t.isImmediatePropagationStopped()) {
                            if (!t.rnamespace || t.rnamespace.test(s.namespace)) {
                                t.handleObj = s;
                                t.data = s.data;
                                r = ((m.event.special[s.origType] || {}).handle || s.handler).apply(o.elem, a);
                                if (r !== undefined) {
                                    if ((t.result = r) === false) {
                                        t.preventDefault();
                                        t.stopPropagation();
                                    }
                                }
                            }
                        }
                    }
                    if (l.postDispatch) {
                        l.postDispatch.call(this, t);
                    }
                    return t.result;
                },
                handlers: function (e, t) {
                    var n,
                        i,
                        r,
                        o,
                        s,
                        u = [],
                        a = t.delegateCount,
                        f = e.target;
                    if (a && f.nodeType && !(e.type === "click" && e.button >= 1)) {
                        for (; f !== this; f = f.parentNode || this) {
                            if (f.nodeType === 1 && !(e.type === "click" && f.disabled === true)) {
                                o = [];
                                s = {};
                                for (n = 0; n < a; n++) {
                                    i = t[n];
                                    r = i.selector + " ";
                                    if (s[r] === undefined) {
                                        s[r] = i.needsContext ? m(r, this).index(f) > -1 : m.find(r, this, null, [f]).length;
                                    }
                                    if (s[r]) {
                                        o.push(i);
                                    }
                                }
                                if (o.length) {
                                    u.push({ elem: f, handlers: o });
                                }
                            }
                        }
                    }
                    f = this;
                    if (a < t.length) {
                        u.push({ elem: f, handlers: t.slice(a) });
                    }
                    return u;
                },
                addProp: function (e, t) {
                    Object.defineProperty(m.Event.prototype, e, {
                        enumerable: true,
                        configurable: true,
                        get: m.isFunction(t)
                            ? function () {
                                  if (this.originalEvent) {
                                      return t(this.originalEvent);
                                  }
                              }
                            : function () {
                                  if (this.originalEvent) {
                                      return this.originalEvent[e];
                                  }
                              },
                        set: function (t) {
                            Object.defineProperty(this, e, { enumerable: true, configurable: true, writable: true, value: t });
                        },
                    });
                },
                fix: function (e) {
                    return e[m.expando] ? e : new m.Event(e);
                },
                special: {
                    load: { noBubble: true },
                    focus: {
                        trigger: function () {
                            if (this !== Ce() && this.focus) {
                                this.focus();
                                return false;
                            }
                        },
                        delegateType: "focusin",
                    },
                    blur: {
                        trigger: function () {
                            if (this === Ce() && this.blur) {
                                this.blur();
                                return false;
                            }
                        },
                        delegateType: "focusout",
                    },
                    click: {
                        trigger: function () {
                            if (this.type === "checkbox" && this.click && N(this, "input")) {
                                this.click();
                                return false;
                            }
                        },
                        _default: function (e) {
                            return N(e.target, "a");
                        },
                    },
                    beforeunload: {
                        postDispatch: function (e) {
                            if (e.result !== undefined && e.originalEvent) {
                                e.originalEvent.returnValue = e.result;
                            }
                        },
                    },
                },
            };
            m.removeEvent = function (e, t, n) {
                if (e.removeEventListener) {
                    e.removeEventListener(t, n);
                }
            };
            m.Event = function (e, t) {
                if (!(this instanceof m.Event)) {
                    return new m.Event(e, t);
                }
                if (e && e.type) {
                    this.originalEvent = e;
                    this.type = e.type;
                    this.isDefaultPrevented = e.defaultPrevented || (e.defaultPrevented === undefined && e.returnValue === false) ? we : Te;
                    this.target = e.target && e.target.nodeType === 3 ? e.target.parentNode : e.target;
                    this.currentTarget = e.currentTarget;
                    this.relatedTarget = e.relatedTarget;
                } else {
                    this.type = e;
                }
                if (t) {
                    m.extend(this, t);
                }
                this.timeStamp = (e && e.timeStamp) || m.now();
                this[m.expando] = true;
            };
            m.Event.prototype = {
                constructor: m.Event,
                isDefaultPrevented: Te,
                isPropagationStopped: Te,
                isImmediatePropagationStopped: Te,
                isSimulated: false,
                preventDefault: function () {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = we;
                    if (e && !this.isSimulated) {
                        e.preventDefault();
                    }
                },
                stopPropagation: function () {
                    var e = this.originalEvent;
                    this.isPropagationStopped = we;
                    if (e && !this.isSimulated) {
                        e.stopPropagation();
                    }
                },
                stopImmediatePropagation: function () {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = we;
                    if (e && !this.isSimulated) {
                        e.stopImmediatePropagation();
                    }
                    this.stopPropagation();
                },
            };
            m.each(
                {
                    altKey: true,
                    bubbles: true,
                    cancelable: true,
                    changedTouches: true,
                    ctrlKey: true,
                    detail: true,
                    eventPhase: true,
                    metaKey: true,
                    pageX: true,
                    pageY: true,
                    shiftKey: true,
                    view: true,
                    char: true,
                    charCode: true,
                    key: true,
                    keyCode: true,
                    button: true,
                    buttons: true,
                    clientX: true,
                    clientY: true,
                    offsetX: true,
                    offsetY: true,
                    pointerId: true,
                    pointerType: true,
                    screenX: true,
                    screenY: true,
                    targetTouches: true,
                    toElement: true,
                    touches: true,
                    which: function (e) {
                        var t = e.button;
                        if (e.which == null && ve.test(e.type)) {
                            return e.charCode != null ? e.charCode : e.keyCode;
                        }
                        if (!e.which && t !== undefined && xe.test(e.type)) {
                            if (t & 1) {
                                return 1;
                            }
                            if (t & 2) {
                                return 3;
                            }
                            if (t & 4) {
                                return 2;
                            }
                            return 0;
                        }
                        return e.which;
                    },
                },
                m.event.addProp
            );
            m.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, t) {
                m.event.special[e] = {
                    delegateType: t,
                    bindType: t,
                    handle: function (e) {
                        var n,
                            i = this,
                            r = e.relatedTarget,
                            o = e.handleObj;
                        if (!r || (r !== i && !m.contains(i, r))) {
                            e.type = o.origType;
                            n = o.handler.apply(this, arguments);
                            e.type = t;
                        }
                        return n;
                    },
                };
            });
            m.fn.extend({
                on: function (e, t, n, i) {
                    return ke(this, e, t, n, i);
                },
                one: function (e, t, n, i) {
                    return ke(this, e, t, n, i, 1);
                },
                off: function (e, t, n) {
                    var i, r;
                    if (e && e.preventDefault && e.handleObj) {
                        i = e.handleObj;
                        m(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler);
                        return this;
                    }
                    if (typeof e === "object") {
                        for (r in e) {
                            this.off(r, t, e[r]);
                        }
                        return this;
                    }
                    if (t === false || typeof t === "function") {
                        n = t;
                        t = undefined;
                    }
                    if (n === false) {
                        n = Te;
                    }
                    return this.each(function () {
                        m.event.remove(this, e, n, t);
                    });
                },
            });
            var Ee = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
                Se = /<script|<style|<link/i,
                Ne = /checked\s*(?:[^=]|=\s*.checked.)/i,
                De = /^true\/(.*)/,
                je = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
            function Ae(e, t) {
                if (N(e, "table") && N(t.nodeType !== 11 ? t : t.firstChild, "tr")) {
                    return m(">tbody", e)[0] || e;
                }
                return e;
            }
            function qe(e) {
                e.type = (e.getAttribute("type") !== null) + "/" + e.type;
                return e;
            }
            function Le(e) {
                var t = De.exec(e.type);
                if (t) {
                    e.type = t[1];
                } else {
                    e.removeAttribute("type");
                }
                return e;
            }
            function He(e, t) {
                var n, i, r, o, s, u, a, f;
                if (t.nodeType !== 1) {
                    return;
                }
                if (G.hasData(e)) {
                    o = G.access(e);
                    s = G.set(t, o);
                    f = o.events;
                    if (f) {
                        delete s.handle;
                        s.events = {};
                        for (r in f) {
                            for (n = 0, i = f[r].length; n < i; n++) {
                                m.event.add(t, r, f[r][n]);
                            }
                        }
                    }
                }
                if (Y.hasData(e)) {
                    u = Y.access(e);
                    a = m.extend({}, u);
                    Y.set(t, a);
                }
            }
            function Fe(e, t) {
                var n = t.nodeName.toLowerCase();
                if (n === "input" && fe.test(e.type)) {
                    t.checked = e.checked;
                } else if (n === "input" || n === "textarea") {
                    t.defaultValue = e.defaultValue;
                }
            }
            function Oe(e, t, n, i) {
                t = s.apply([], t);
                var r,
                    o,
                    u,
                    a,
                    f,
                    l,
                    c = 0,
                    d = e.length,
                    p = d - 1,
                    y = t[0],
                    v = m.isFunction(y);
                if (v || (d > 1 && typeof y === "string" && !h.checkClone && Ne.test(y))) {
                    return e.each(function (r) {
                        var o = e.eq(r);
                        if (v) {
                            t[0] = y.call(this, r, o.html());
                        }
                        Oe(o, t, n, i);
                    });
                }
                if (d) {
                    r = ye(t, e[0].ownerDocument, false, e, i);
                    o = r.firstChild;
                    if (r.childNodes.length === 1) {
                        r = o;
                    }
                    if (o || i) {
                        u = m.map(pe(r, "script"), qe);
                        a = u.length;
                        for (; c < d; c++) {
                            f = r;
                            if (c !== p) {
                                f = m.clone(f, true, true);
                                if (a) {
                                    m.merge(u, pe(f, "script"));
                                }
                            }
                            n.call(e[c], f, c);
                        }
                        if (a) {
                            l = u[u.length - 1].ownerDocument;
                            m.map(u, Le);
                            for (c = 0; c < a; c++) {
                                f = u[c];
                                if (ce.test(f.type || "") && !G.access(f, "globalEval") && m.contains(l, f)) {
                                    if (f.src) {
                                        if (m._evalUrl) {
                                            m._evalUrl(f.src);
                                        }
                                    } else {
                                        g(f.textContent.replace(je, ""), l);
                                    }
                                }
                            }
                        }
                    }
                }
                return e;
            }
            function Pe(e, t, n) {
                var i,
                    r = t ? m.filter(t, e) : e,
                    o = 0;
                for (; (i = r[o]) != null; o++) {
                    if (!n && i.nodeType === 1) {
                        m.cleanData(pe(i));
                    }
                    if (i.parentNode) {
                        if (n && m.contains(i.ownerDocument, i)) {
                            he(pe(i, "script"));
                        }
                        i.parentNode.removeChild(i);
                    }
                }
                return e;
            }
            m.extend({
                htmlPrefilter: function (e) {
                    return e.replace(Ee, "<$1></$2>");
                },
                clone: function (e, t, n) {
                    var i,
                        r,
                        o,
                        s,
                        u = e.cloneNode(true),
                        a = m.contains(e.ownerDocument, e);
                    if (!h.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !m.isXMLDoc(e)) {
                        s = pe(u);
                        o = pe(e);
                        for (i = 0, r = o.length; i < r; i++) {
                            Fe(o[i], s[i]);
                        }
                    }
                    if (t) {
                        if (n) {
                            o = o || pe(e);
                            s = s || pe(u);
                            for (i = 0, r = o.length; i < r; i++) {
                                He(o[i], s[i]);
                            }
                        } else {
                            He(e, u);
                        }
                    }
                    s = pe(u, "script");
                    if (s.length > 0) {
                        he(s, !a && pe(e, "script"));
                    }
                    return u;
                },
                cleanData: function (e) {
                    var t,
                        n,
                        i,
                        r = m.event.special,
                        o = 0;
                    for (; (n = e[o]) !== undefined; o++) {
                        if (U(n)) {
                            if ((t = n[G.expando])) {
                                if (t.events) {
                                    for (i in t.events) {
                                        if (r[i]) {
                                            m.event.remove(n, i);
                                        } else {
                                            m.removeEvent(n, i, t.handle);
                                        }
                                    }
                                }
                                n[G.expando] = undefined;
                            }
                            if (n[Y.expando]) {
                                n[Y.expando] = undefined;
                            }
                        }
                    }
                },
            });
            m.fn.extend({
                detach: function (e) {
                    return Pe(this, e, true);
                },
                remove: function (e) {
                    return Pe(this, e);
                },
                text: function (e) {
                    return X(
                        this,
                        function (e) {
                            return e === undefined
                                ? m.text(this)
                                : this.empty().each(function () {
                                      if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                                          this.textContent = e;
                                      }
                                  });
                        },
                        null,
                        e,
                        arguments.length
                    );
                },
                append: function () {
                    return Oe(this, arguments, function (e) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var t = Ae(this, e);
                            t.appendChild(e);
                        }
                    });
                },
                prepend: function () {
                    return Oe(this, arguments, function (e) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var t = Ae(this, e);
                            t.insertBefore(e, t.firstChild);
                        }
                    });
                },
                before: function () {
                    return Oe(this, arguments, function (e) {
                        if (this.parentNode) {
                            this.parentNode.insertBefore(e, this);
                        }
                    });
                },
                after: function () {
                    return Oe(this, arguments, function (e) {
                        if (this.parentNode) {
                            this.parentNode.insertBefore(e, this.nextSibling);
                        }
                    });
                },
                empty: function () {
                    var e,
                        t = 0;
                    for (; (e = this[t]) != null; t++) {
                        if (e.nodeType === 1) {
                            m.cleanData(pe(e, false));
                            e.textContent = "";
                        }
                    }
                    return this;
                },
                clone: function (e, t) {
                    e = e == null ? false : e;
                    t = t == null ? e : t;
                    return this.map(function () {
                        return m.clone(this, e, t);
                    });
                },
                html: function (e) {
                    return X(
                        this,
                        function (e) {
                            var t = this[0] || {},
                                n = 0,
                                i = this.length;
                            if (e === undefined && t.nodeType === 1) {
                                return t.innerHTML;
                            }
                            if (typeof e === "string" && !Se.test(e) && !de[(le.exec(e) || ["", ""])[1].toLowerCase()]) {
                                e = m.htmlPrefilter(e);
                                try {
                                    for (; n < i; n++) {
                                        t = this[n] || {};
                                        if (t.nodeType === 1) {
                                            m.cleanData(pe(t, false));
                                            t.innerHTML = e;
                                        }
                                    }
                                    t = 0;
                                } catch (e) {}
                            }
                            if (t) {
                                this.empty().append(e);
                            }
                        },
                        null,
                        e,
                        arguments.length
                    );
                },
                replaceWith: function () {
                    var e = [];
                    return Oe(
                        this,
                        arguments,
                        function (t) {
                            var n = this.parentNode;
                            if (m.inArray(this, e) < 0) {
                                m.cleanData(pe(this));
                                if (n) {
                                    n.replaceChild(t, this);
                                }
                            }
                        },
                        e
                    );
                },
            });
            m.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) {
                m.fn[e] = function (e) {
                    var n,
                        i = [],
                        r = m(e),
                        o = r.length - 1,
                        s = 0;
                    for (; s <= o; s++) {
                        n = s === o ? this : this.clone(true);
                        m(r[s])[t](n);
                        u.apply(i, n.get());
                    }
                    return this.pushStack(i);
                };
            });
            var Re = /^margin/;
            var Me = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i");
            var Ie = function (t) {
                var n = t.ownerDocument.defaultView;
                if (!n || !n.opener) {
                    n = e;
                }
                return n.getComputedStyle(t);
            };
            (function () {
                function t() {
                    if (!a) {
                        return;
                    }
                    a.style.cssText = "box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
                    a.innerHTML = "";
                    me.appendChild(u);
                    var t = e.getComputedStyle(a);
                    n = t.top !== "1%";
                    s = t.marginLeft === "2px";
                    r = t.width === "4px";
                    a.style.marginRight = "50%";
                    o = t.marginRight === "4px";
                    me.removeChild(u);
                    a = null;
                }
                var n,
                    r,
                    o,
                    s,
                    u = i.createElement("div"),
                    a = i.createElement("div");
                if (!a.style) {
                    return;
                }
                a.style.backgroundClip = "content-box";
                a.cloneNode(true).style.backgroundClip = "";
                h.clearCloneStyle = a.style.backgroundClip === "content-box";
                u.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
                u.appendChild(a);
                m.extend(h, {
                    pixelPosition: function () {
                        t();
                        return n;
                    },
                    boxSizingReliable: function () {
                        t();
                        return r;
                    },
                    pixelMarginRight: function () {
                        t();
                        return o;
                    },
                    reliableMarginLeft: function () {
                        t();
                        return s;
                    },
                });
            })();
            function We(e, t, n) {
                var i,
                    r,
                    o,
                    s,
                    u = e.style;
                n = n || Ie(e);
                if (n) {
                    s = n.getPropertyValue(t) || n[t];
                    if (s === "" && !m.contains(e.ownerDocument, e)) {
                        s = m.style(e, t);
                    }
                    if (!h.pixelMarginRight() && Me.test(s) && Re.test(t)) {
                        i = u.width;
                        r = u.minWidth;
                        o = u.maxWidth;
                        u.minWidth = u.maxWidth = u.width = s;
                        s = n.width;
                        u.width = i;
                        u.minWidth = r;
                        u.maxWidth = o;
                    }
                }
                return s !== undefined ? s + "" : s;
            }
            function $e(e, t) {
                return {
                    get: function () {
                        if (e()) {
                            delete this.get;
                            return;
                        }
                        return (this.get = t).apply(this, arguments);
                    },
                };
            }
            var Be = /^(none|table(?!-c[ea]).+)/,
                _e = /^--/,
                ze = { position: "absolute", visibility: "hidden", display: "block" },
                Xe = { letterSpacing: "0", fontWeight: "400" },
                Ue = ["Webkit", "Moz", "ms"],
                Ve = i.createElement("div").style;
            function Ge(e) {
                if (e in Ve) {
                    return e;
                }
                var t = e[0].toUpperCase() + e.slice(1),
                    n = Ue.length;
                while (n--) {
                    e = Ue[n] + t;
                    if (e in Ve) {
                        return e;
                    }
                }
            }
            function Ye(e) {
                var t = m.cssProps[e];
                if (!t) {
                    t = m.cssProps[e] = Ge(e) || e;
                }
                return t;
            }
            function Qe(e, t, n) {
                var i = te.exec(t);
                return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t;
            }
            function Je(e, t, n, i, r) {
                var o,
                    s = 0;
                if (n === (i ? "border" : "content")) {
                    o = 4;
                } else {
                    o = t === "width" ? 1 : 0;
                }
                for (; o < 4; o += 2) {
                    if (n === "margin") {
                        s += m.css(e, n + ne[o], true, r);
                    }
                    if (i) {
                        if (n === "content") {
                            s -= m.css(e, "padding" + ne[o], true, r);
                        }
                        if (n !== "margin") {
                            s -= m.css(e, "border" + ne[o] + "Width", true, r);
                        }
                    } else {
                        s += m.css(e, "padding" + ne[o], true, r);
                        if (n !== "padding") {
                            s += m.css(e, "border" + ne[o] + "Width", true, r);
                        }
                    }
                }
                return s;
            }
            function Ke(e, t, n) {
                var i,
                    r = Ie(e),
                    o = We(e, t, r),
                    s = m.css(e, "boxSizing", false, r) === "border-box";
                if (Me.test(o)) {
                    return o;
                }
                i = s && (h.boxSizingReliable() || o === e.style[t]);
                if (o === "auto") {
                    o = e["offset" + t[0].toUpperCase() + t.slice(1)];
                }
                o = parseFloat(o) || 0;
                return o + Je(e, t, n || (s ? "border" : "content"), i, r) + "px";
            }
            m.extend({
                cssHooks: {
                    opacity: {
                        get: function (e, t) {
                            if (t) {
                                var n = We(e, "opacity");
                                return n === "" ? "1" : n;
                            }
                        },
                    },
                },
                cssNumber: {
                    animationIterationCount: true,
                    columnCount: true,
                    fillOpacity: true,
                    flexGrow: true,
                    flexShrink: true,
                    fontWeight: true,
                    lineHeight: true,
                    opacity: true,
                    order: true,
                    orphans: true,
                    widows: true,
                    zIndex: true,
                    zoom: true,
                },
                cssProps: { float: "cssFloat" },
                style: function (e, t, n, i) {
                    if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) {
                        return;
                    }
                    var r,
                        o,
                        s,
                        u = m.camelCase(t),
                        a = _e.test(t),
                        f = e.style;
                    if (!a) {
                        t = Ye(u);
                    }
                    s = m.cssHooks[t] || m.cssHooks[u];
                    if (n !== undefined) {
                        o = typeof n;
                        if (o === "string" && (r = te.exec(n)) && r[1]) {
                            n = oe(e, t, r);
                            o = "number";
                        }
                        if (n == null || n !== n) {
                            return;
                        }
                        if (o === "number") {
                            n += (r && r[3]) || (m.cssNumber[u] ? "" : "px");
                        }
                        if (!h.clearCloneStyle && n === "" && t.indexOf("background") === 0) {
                            f[t] = "inherit";
                        }
                        if (!s || !("set" in s) || (n = s.set(e, n, i)) !== undefined) {
                            if (a) {
                                f.setProperty(t, n);
                            } else {
                                f[t] = n;
                            }
                        }
                    } else {
                        if (s && "get" in s && (r = s.get(e, false, i)) !== undefined) {
                            return r;
                        }
                        return f[t];
                    }
                },
                css: function (e, t, n, i) {
                    var r,
                        o,
                        s,
                        u = m.camelCase(t),
                        a = _e.test(t);
                    if (!a) {
                        t = Ye(u);
                    }
                    s = m.cssHooks[t] || m.cssHooks[u];
                    if (s && "get" in s) {
                        r = s.get(e, true, n);
                    }
                    if (r === undefined) {
                        r = We(e, t, i);
                    }
                    if (r === "normal" && t in Xe) {
                        r = Xe[t];
                    }
                    if (n === "" || n) {
                        o = parseFloat(r);
                        return n === true || isFinite(o) ? o || 0 : r;
                    }
                    return r;
                },
            });
            m.each(["height", "width"], function (e, t) {
                m.cssHooks[t] = {
                    get: function (e, n, i) {
                        if (n) {
                            return Be.test(m.css(e, "display")) && (!e.getClientRects().length || !e.getBoundingClientRect().width)
                                ? re(e, ze, function () {
                                      return Ke(e, t, i);
                                  })
                                : Ke(e, t, i);
                        }
                    },
                    set: function (e, n, i) {
                        var r,
                            o = i && Ie(e),
                            s = i && Je(e, t, i, m.css(e, "boxSizing", false, o) === "border-box", o);
                        if (s && (r = te.exec(n)) && (r[3] || "px") !== "px") {
                            e.style[t] = n;
                            n = m.css(e, t);
                        }
                        return Qe(e, n, s);
                    },
                };
            });
            m.cssHooks.marginLeft = $e(h.reliableMarginLeft, function (e, t) {
                if (t) {
                    return (
                        (parseFloat(We(e, "marginLeft")) ||
                            e.getBoundingClientRect().left -
                                re(e, { marginLeft: 0 }, function () {
                                    return e.getBoundingClientRect().left;
                                })) + "px"
                    );
                }
            });
            m.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
                m.cssHooks[e + t] = {
                    expand: function (n) {
                        var i = 0,
                            r = {},
                            o = typeof n === "string" ? n.split(" ") : [n];
                        for (; i < 4; i++) {
                            r[e + ne[i] + t] = o[i] || o[i - 2] || o[0];
                        }
                        return r;
                    },
                };
                if (!Re.test(e)) {
                    m.cssHooks[e + t].set = Qe;
                }
            });
            m.fn.extend({
                css: function (e, t) {
                    return X(
                        this,
                        function (e, t, n) {
                            var i,
                                r,
                                o = {},
                                s = 0;
                            if (Array.isArray(t)) {
                                i = Ie(e);
                                r = t.length;
                                for (; s < r; s++) {
                                    o[t[s]] = m.css(e, t[s], false, i);
                                }
                                return o;
                            }
                            return n !== undefined ? m.style(e, t, n) : m.css(e, t);
                        },
                        e,
                        t,
                        arguments.length > 1
                    );
                },
            });
            function Ze(e, t, n, i, r) {
                return new Ze.prototype.init(e, t, n, i, r);
            }
            m.Tween = Ze;
            Ze.prototype = {
                constructor: Ze,
                init: function (e, t, n, i, r, o) {
                    this.elem = e;
                    this.prop = n;
                    this.easing = r || m.easing._default;
                    this.options = t;
                    this.start = this.now = this.cur();
                    this.end = i;
                    this.unit = o || (m.cssNumber[n] ? "" : "px");
                },
                cur: function () {
                    var e = Ze.propHooks[this.prop];
                    return e && e.get ? e.get(this) : Ze.propHooks._default.get(this);
                },
                run: function (e) {
                    var t,
                        n = Ze.propHooks[this.prop];
                    if (this.options.duration) {
                        this.pos = t = m.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration);
                    } else {
                        this.pos = t = e;
                    }
                    this.now = (this.end - this.start) * t + this.start;
                    if (this.options.step) {
                        this.options.step.call(this.elem, this.now, this);
                    }
                    if (n && n.set) {
                        n.set(this);
                    } else {
                        Ze.propHooks._default.set(this);
                    }
                    return this;
                },
            };
            Ze.prototype.init.prototype = Ze.prototype;
            Ze.propHooks = {
                _default: {
                    get: function (e) {
                        var t;
                        if (e.elem.nodeType !== 1 || (e.elem[e.prop] != null && e.elem.style[e.prop] == null)) {
                            return e.elem[e.prop];
                        }
                        t = m.css(e.elem, e.prop, "");
                        return !t || t === "auto" ? 0 : t;
                    },
                    set: function (e) {
                        if (m.fx.step[e.prop]) {
                            m.fx.step[e.prop](e);
                        } else if (e.elem.nodeType === 1 && (e.elem.style[m.cssProps[e.prop]] != null || m.cssHooks[e.prop])) {
                            m.style(e.elem, e.prop, e.now + e.unit);
                        } else {
                            e.elem[e.prop] = e.now;
                        }
                    },
                },
            };
            Ze.propHooks.scrollTop = Ze.propHooks.scrollLeft = {
                set: function (e) {
                    if (e.elem.nodeType && e.elem.parentNode) {
                        e.elem[e.prop] = e.now;
                    }
                },
            };
            m.easing = {
                linear: function (e) {
                    return e;
                },
                swing: function (e) {
                    return 0.5 - Math.cos(e * Math.PI) / 2;
                },
                _default: "swing",
            };
            m.fx = Ze.prototype.init;
            m.fx.step = {};
            var et,
                tt,
                nt = /^(?:toggle|show|hide)$/,
                it = /queueHooks$/;
            function rt() {
                if (tt) {
                    if (i.hidden === false && e.requestAnimationFrame) {
                        e.requestAnimationFrame(rt);
                    } else {
                        e.setTimeout(rt, m.fx.interval);
                    }
                    m.fx.tick();
                }
            }
            function ot() {
                e.setTimeout(function () {
                    et = undefined;
                });
                return (et = m.now());
            }
            function st(e, t) {
                var n,
                    i = 0,
                    r = { height: e };
                t = t ? 1 : 0;
                for (; i < 4; i += 2 - t) {
                    n = ne[i];
                    r["margin" + n] = r["padding" + n] = e;
                }
                if (t) {
                    r.opacity = r.width = e;
                }
                return r;
            }
            function ut(e, t, n) {
                var i,
                    r = (lt.tweeners[t] || []).concat(lt.tweeners["*"]),
                    o = 0,
                    s = r.length;
                for (; o < s; o++) {
                    if ((i = r[o].call(n, t, e))) {
                        return i;
                    }
                }
            }
            function at(e, t, n) {
                var i,
                    r,
                    o,
                    s,
                    u,
                    a,
                    f,
                    l,
                    c = "width" in t || "height" in t,
                    d = this,
                    p = {},
                    h = e.style,
                    g = e.nodeType && ie(e),
                    y = G.get(e, "fxshow");
                if (!n.queue) {
                    s = m._queueHooks(e, "fx");
                    if (s.unqueued == null) {
                        s.unqueued = 0;
                        u = s.empty.fire;
                        s.empty.fire = function () {
                            if (!s.unqueued) {
                                u();
                            }
                        };
                    }
                    s.unqueued++;
                    d.always(function () {
                        d.always(function () {
                            s.unqueued--;
                            if (!m.queue(e, "fx").length) {
                                s.empty.fire();
                            }
                        });
                    });
                }
                for (i in t) {
                    r = t[i];
                    if (nt.test(r)) {
                        delete t[i];
                        o = o || r === "toggle";
                        if (r === (g ? "hide" : "show")) {
                            if (r === "show" && y && y[i] !== undefined) {
                                g = true;
                            } else {
                                continue;
                            }
                        }
                        p[i] = (y && y[i]) || m.style(e, i);
                    }
                }
                a = !m.isEmptyObject(t);
                if (!a && m.isEmptyObject(p)) {
                    return;
                }
                if (c && e.nodeType === 1) {
                    n.overflow = [h.overflow, h.overflowX, h.overflowY];
                    f = y && y.display;
                    if (f == null) {
                        f = G.get(e, "display");
                    }
                    l = m.css(e, "display");
                    if (l === "none") {
                        if (f) {
                            l = f;
                        } else {
                            ae([e], true);
                            f = e.style.display || f;
                            l = m.css(e, "display");
                            ae([e]);
                        }
                    }
                    if (l === "inline" || (l === "inline-block" && f != null)) {
                        if (m.css(e, "float") === "none") {
                            if (!a) {
                                d.done(function () {
                                    h.display = f;
                                });
                                if (f == null) {
                                    l = h.display;
                                    f = l === "none" ? "" : l;
                                }
                            }
                            h.display = "inline-block";
                        }
                    }
                }
                if (n.overflow) {
                    h.overflow = "hidden";
                    d.always(function () {
                        h.overflow = n.overflow[0];
                        h.overflowX = n.overflow[1];
                        h.overflowY = n.overflow[2];
                    });
                }
                a = false;
                for (i in p) {
                    if (!a) {
                        if (y) {
                            if ("hidden" in y) {
                                g = y.hidden;
                            }
                        } else {
                            y = G.access(e, "fxshow", { display: f });
                        }
                        if (o) {
                            y.hidden = !g;
                        }
                        if (g) {
                            ae([e], true);
                        }
                        d.done(function () {
                            if (!g) {
                                ae([e]);
                            }
                            G.remove(e, "fxshow");
                            for (i in p) {
                                m.style(e, i, p[i]);
                            }
                        });
                    }
                    a = ut(g ? y[i] : 0, i, d);
                    if (!(i in y)) {
                        y[i] = a.start;
                        if (g) {
                            a.end = a.start;
                            a.start = 0;
                        }
                    }
                }
            }
            function ft(e, t) {
                var n, i, r, o, s;
                for (n in e) {
                    i = m.camelCase(n);
                    r = t[i];
                    o = e[n];
                    if (Array.isArray(o)) {
                        r = o[1];
                        o = e[n] = o[0];
                    }
                    if (n !== i) {
                        e[i] = o;
                        delete e[n];
                    }
                    s = m.cssHooks[i];
                    if (s && "expand" in s) {
                        o = s.expand(o);
                        delete e[i];
                        for (n in o) {
                            if (!(n in e)) {
                                e[n] = o[n];
                                t[n] = r;
                            }
                        }
                    } else {
                        t[i] = r;
                    }
                }
            }
            function lt(e, t, n) {
                var i,
                    r,
                    o = 0,
                    s = lt.prefilters.length,
                    u = m.Deferred().always(function () {
                        delete a.elem;
                    }),
                    a = function () {
                        if (r) {
                            return false;
                        }
                        var t = et || ot(),
                            n = Math.max(0, f.startTime + f.duration - t),
                            i = n / f.duration || 0,
                            o = 1 - i,
                            s = 0,
                            a = f.tweens.length;
                        for (; s < a; s++) {
                            f.tweens[s].run(o);
                        }
                        u.notifyWith(e, [f, o, n]);
                        if (o < 1 && a) {
                            return n;
                        }
                        if (!a) {
                            u.notifyWith(e, [f, 1, 0]);
                        }
                        u.resolveWith(e, [f]);
                        return false;
                    },
                    f = u.promise({
                        elem: e,
                        props: m.extend({}, t),
                        opts: m.extend(true, { specialEasing: {}, easing: m.easing._default }, n),
                        originalProperties: t,
                        originalOptions: n,
                        startTime: et || ot(),
                        duration: n.duration,
                        tweens: [],
                        createTween: function (t, n) {
                            var i = m.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                            f.tweens.push(i);
                            return i;
                        },
                        stop: function (t) {
                            var n = 0,
                                i = t ? f.tweens.length : 0;
                            if (r) {
                                return this;
                            }
                            r = true;
                            for (; n < i; n++) {
                                f.tweens[n].run(1);
                            }
                            if (t) {
                                u.notifyWith(e, [f, 1, 0]);
                                u.resolveWith(e, [f, t]);
                            } else {
                                u.rejectWith(e, [f, t]);
                            }
                            return this;
                        },
                    }),
                    l = f.props;
                ft(l, f.opts.specialEasing);
                for (; o < s; o++) {
                    i = lt.prefilters[o].call(f, e, l, f.opts);
                    if (i) {
                        if (m.isFunction(i.stop)) {
                            m._queueHooks(f.elem, f.opts.queue).stop = m.proxy(i.stop, i);
                        }
                        return i;
                    }
                }
                m.map(l, ut, f);
                if (m.isFunction(f.opts.start)) {
                    f.opts.start.call(e, f);
                }
                f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always);
                m.fx.timer(m.extend(a, { elem: e, anim: f, queue: f.opts.queue }));
                return f;
            }
            m.Animation = m.extend(lt, {
                tweeners: {
                    "*": [
                        function (e, t) {
                            var n = this.createTween(e, t);
                            oe(n.elem, e, te.exec(t), n);
                            return n;
                        },
                    ],
                },
                tweener: function (e, t) {
                    if (m.isFunction(e)) {
                        t = e;
                        e = ["*"];
                    } else {
                        e = e.match(R);
                    }
                    var n,
                        i = 0,
                        r = e.length;
                    for (; i < r; i++) {
                        n = e[i];
                        lt.tweeners[n] = lt.tweeners[n] || [];
                        lt.tweeners[n].unshift(t);
                    }
                },
                prefilters: [at],
                prefilter: function (e, t) {
                    if (t) {
                        lt.prefilters.unshift(e);
                    } else {
                        lt.prefilters.push(e);
                    }
                },
            });
            m.speed = function (e, t, n) {
                var i = e && typeof e === "object" ? m.extend({}, e) : { complete: n || (!n && t) || (m.isFunction(e) && e), duration: e, easing: (n && t) || (t && !m.isFunction(t) && t) };
                if (m.fx.off) {
                    i.duration = 0;
                } else {
                    if (typeof i.duration !== "number") {
                        if (i.duration in m.fx.speeds) {
                            i.duration = m.fx.speeds[i.duration];
                        } else {
                            i.duration = m.fx.speeds._default;
                        }
                    }
                }
                if (i.queue == null || i.queue === true) {
                    i.queue = "fx";
                }
                i.old = i.complete;
                i.complete = function () {
                    if (m.isFunction(i.old)) {
                        i.old.call(this);
                    }
                    if (i.queue) {
                        m.dequeue(this, i.queue);
                    }
                };
                return i;
            };
            m.fn.extend({
                fadeTo: function (e, t, n, i) {
                    return this.filter(ie).css("opacity", 0).show().end().animate({ opacity: t }, e, n, i);
                },
                animate: function (e, t, n, i) {
                    var r = m.isEmptyObject(e),
                        o = m.speed(t, n, i),
                        s = function () {
                            var t = lt(this, m.extend({}, e), o);
                            if (r || G.get(this, "finish")) {
                                t.stop(true);
                            }
                        };
                    s.finish = s;
                    return r || o.queue === false ? this.each(s) : this.queue(o.queue, s);
                },
                stop: function (e, t, n) {
                    var i = function (e) {
                        var t = e.stop;
                        delete e.stop;
                        t(n);
                    };
                    if (typeof e !== "string") {
                        n = t;
                        t = e;
                        e = undefined;
                    }
                    if (t && e !== false) {
                        this.queue(e || "fx", []);
                    }
                    return this.each(function () {
                        var t = true,
                            r = e != null && e + "queueHooks",
                            o = m.timers,
                            s = G.get(this);
                        if (r) {
                            if (s[r] && s[r].stop) {
                                i(s[r]);
                            }
                        } else {
                            for (r in s) {
                                if (s[r] && s[r].stop && it.test(r)) {
                                    i(s[r]);
                                }
                            }
                        }
                        for (r = o.length; r--; ) {
                            if (o[r].elem === this && (e == null || o[r].queue === e)) {
                                o[r].anim.stop(n);
                                t = false;
                                o.splice(r, 1);
                            }
                        }
                        if (t || !n) {
                            m.dequeue(this, e);
                        }
                    });
                },
                finish: function (e) {
                    if (e !== false) {
                        e = e || "fx";
                    }
                    return this.each(function () {
                        var t,
                            n = G.get(this),
                            i = n[e + "queue"],
                            r = n[e + "queueHooks"],
                            o = m.timers,
                            s = i ? i.length : 0;
                        n.finish = true;
                        m.queue(this, e, []);
                        if (r && r.stop) {
                            r.stop.call(this, true);
                        }
                        for (t = o.length; t--; ) {
                            if (o[t].elem === this && o[t].queue === e) {
                                o[t].anim.stop(true);
                                o.splice(t, 1);
                            }
                        }
                        for (t = 0; t < s; t++) {
                            if (i[t] && i[t].finish) {
                                i[t].finish.call(this);
                            }
                        }
                        delete n.finish;
                    });
                },
            });
            m.each(["toggle", "show", "hide"], function (e, t) {
                var n = m.fn[t];
                m.fn[t] = function (e, i, r) {
                    return e == null || typeof e === "boolean" ? n.apply(this, arguments) : this.animate(st(t, true), e, i, r);
                };
            });
            m.each({ slideDown: st("show"), slideUp: st("hide"), slideToggle: st("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) {
                m.fn[e] = function (e, n, i) {
                    return this.animate(t, e, n, i);
                };
            });
            m.timers = [];
            m.fx.tick = function () {
                var e,
                    t = 0,
                    n = m.timers;
                et = m.now();
                for (; t < n.length; t++) {
                    e = n[t];
                    if (!e() && n[t] === e) {
                        n.splice(t--, 1);
                    }
                }
                if (!n.length) {
                    m.fx.stop();
                }
                et = undefined;
            };
            m.fx.timer = function (e) {
                m.timers.push(e);
                m.fx.start();
            };
            m.fx.interval = 13;
            m.fx.start = function () {
                if (tt) {
                    return;
                }
                tt = true;
                rt();
            };
            m.fx.stop = function () {
                tt = null;
            };
            m.fx.speeds = { slow: 600, fast: 200, _default: 400 };
            m.fn.delay = function (t, n) {
                t = m.fx ? m.fx.speeds[t] || t : t;
                n = n || "fx";
                return this.queue(n, function (n, i) {
                    var r = e.setTimeout(n, t);
                    i.stop = function () {
                        e.clearTimeout(r);
                    };
                });
            };
            (function () {
                var e = i.createElement("input"),
                    t = i.createElement("select"),
                    n = t.appendChild(i.createElement("option"));
                e.type = "checkbox";
                h.checkOn = e.value !== "";
                h.optSelected = n.selected;
                e = i.createElement("input");
                e.value = "t";
                e.type = "radio";
                h.radioValue = e.value === "t";
            })();
            var ct,
                dt = m.expr.attrHandle;
            m.fn.extend({
                attr: function (e, t) {
                    return X(this, m.attr, e, t, arguments.length > 1);
                },
                removeAttr: function (e) {
                    return this.each(function () {
                        m.removeAttr(this, e);
                    });
                },
            });
            m.extend({
                attr: function (e, t, n) {
                    var i,
                        r,
                        o = e.nodeType;
                    if (o === 3 || o === 8 || o === 2) {
                        return;
                    }
                    if (typeof e.getAttribute === "undefined") {
                        return m.prop(e, t, n);
                    }
                    if (o !== 1 || !m.isXMLDoc(e)) {
                        r = m.attrHooks[t.toLowerCase()] || (m.expr.match.bool.test(t) ? ct : undefined);
                    }
                    if (n !== undefined) {
                        if (n === null) {
                            m.removeAttr(e, t);
                            return;
                        }
                        if (r && "set" in r && (i = r.set(e, n, t)) !== undefined) {
                            return i;
                        }
                        e.setAttribute(t, n + "");
                        return n;
                    }
                    if (r && "get" in r && (i = r.get(e, t)) !== null) {
                        return i;
                    }
                    i = m.find.attr(e, t);
                    return i == null ? undefined : i;
                },
                attrHooks: {
                    type: {
                        set: function (e, t) {
                            if (!h.radioValue && t === "radio" && N(e, "input")) {
                                var n = e.value;
                                e.setAttribute("type", t);
                                if (n) {
                                    e.value = n;
                                }
                                return t;
                            }
                        },
                    },
                },
                removeAttr: function (e, t) {
                    var n,
                        i = 0,
                        r = t && t.match(R);
                    if (r && e.nodeType === 1) {
                        while ((n = r[i++])) {
                            e.removeAttribute(n);
                        }
                    }
                },
            });
            ct = {
                set: function (e, t, n) {
                    if (t === false) {
                        m.removeAttr(e, n);
                    } else {
                        e.setAttribute(n, n);
                    }
                    return n;
                },
            };
            m.each(m.expr.match.bool.source.match(/\w+/g), function (e, t) {
                var n = dt[t] || m.find.attr;
                dt[t] = function (e, t, i) {
                    var r,
                        o,
                        s = t.toLowerCase();
                    if (!i) {
                        o = dt[s];
                        dt[s] = r;
                        r = n(e, t, i) != null ? s : null;
                        dt[s] = o;
                    }
                    return r;
                };
            });
            var pt = /^(?:input|select|textarea|button)$/i,
                ht = /^(?:a|area)$/i;
            m.fn.extend({
                prop: function (e, t) {
                    return X(this, m.prop, e, t, arguments.length > 1);
                },
                removeProp: function (e) {
                    return this.each(function () {
                        delete this[m.propFix[e] || e];
                    });
                },
            });
            m.extend({
                prop: function (e, t, n) {
                    var i,
                        r,
                        o = e.nodeType;
                    if (o === 3 || o === 8 || o === 2) {
                        return;
                    }
                    if (o !== 1 || !m.isXMLDoc(e)) {
                        t = m.propFix[t] || t;
                        r = m.propHooks[t];
                    }
                    if (n !== undefined) {
                        if (r && "set" in r && (i = r.set(e, n, t)) !== undefined) {
                            return i;
                        }
                        return (e[t] = n);
                    }
                    if (r && "get" in r && (i = r.get(e, t)) !== null) {
                        return i;
                    }
                    return e[t];
                },
                propHooks: {
                    tabIndex: {
                        get: function (e) {
                            var t = m.find.attr(e, "tabindex");
                            if (t) {
                                return parseInt(t, 10);
                            }
                            if (pt.test(e.nodeName) || (ht.test(e.nodeName) && e.href)) {
                                return 0;
                            }
                            return -1;
                        },
                    },
                },
                propFix: { for: "htmlFor", class: "className" },
            });
            if (!h.optSelected) {
                m.propHooks.selected = {
                    get: function (e) {
                        var t = e.parentNode;
                        if (t && t.parentNode) {
                            t.parentNode.selectedIndex;
                        }
                        return null;
                    },
                    set: function (e) {
                        var t = e.parentNode;
                        if (t) {
                            t.selectedIndex;
                            if (t.parentNode) {
                                t.parentNode.selectedIndex;
                            }
                        }
                    },
                };
            }
            m.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                m.propFix[this.toLowerCase()] = this;
            });
            function gt(e) {
                var t = e.match(R) || [];
                return t.join(" ");
            }
            function yt(e) {
                return (e.getAttribute && e.getAttribute("class")) || "";
            }
            m.fn.extend({
                addClass: function (e) {
                    var t,
                        n,
                        i,
                        r,
                        o,
                        s,
                        u,
                        a = 0;
                    if (m.isFunction(e)) {
                        return this.each(function (t) {
                            m(this).addClass(e.call(this, t, yt(this)));
                        });
                    }
                    if (typeof e === "string" && e) {
                        t = e.match(R) || [];
                        while ((n = this[a++])) {
                            r = yt(n);
                            i = n.nodeType === 1 && " " + gt(r) + " ";
                            if (i) {
                                s = 0;
                                while ((o = t[s++])) {
                                    if (i.indexOf(" " + o + " ") < 0) {
                                        i += o + " ";
                                    }
                                }
                                u = gt(i);
                                if (r !== u) {
                                    n.setAttribute("class", u);
                                }
                            }
                        }
                    }
                    return this;
                },
                removeClass: function (e) {
                    var t,
                        n,
                        i,
                        r,
                        o,
                        s,
                        u,
                        a = 0;
                    if (m.isFunction(e)) {
                        return this.each(function (t) {
                            m(this).removeClass(e.call(this, t, yt(this)));
                        });
                    }
                    if (!arguments.length) {
                        return this.attr("class", "");
                    }
                    if (typeof e === "string" && e) {
                        t = e.match(R) || [];
                        while ((n = this[a++])) {
                            r = yt(n);
                            i = n.nodeType === 1 && " " + gt(r) + " ";
                            if (i) {
                                s = 0;
                                while ((o = t[s++])) {
                                    while (i.indexOf(" " + o + " ") > -1) {
                                        i = i.replace(" " + o + " ", " ");
                                    }
                                }
                                u = gt(i);
                                if (r !== u) {
                                    n.setAttribute("class", u);
                                }
                            }
                        }
                    }
                    return this;
                },
                toggleClass: function (e, t) {
                    var n = typeof e;
                    if (typeof t === "boolean" && n === "string") {
                        return t ? this.addClass(e) : this.removeClass(e);
                    }
                    if (m.isFunction(e)) {
                        return this.each(function (n) {
                            m(this).toggleClass(e.call(this, n, yt(this), t), t);
                        });
                    }
                    return this.each(function () {
                        var t, i, r, o;
                        if (n === "string") {
                            i = 0;
                            r = m(this);
                            o = e.match(R) || [];
                            while ((t = o[i++])) {
                                if (r.hasClass(t)) {
                                    r.removeClass(t);
                                } else {
                                    r.addClass(t);
                                }
                            }
                        } else if (e === undefined || n === "boolean") {
                            t = yt(this);
                            if (t) {
                                G.set(this, "__className__", t);
                            }
                            if (this.setAttribute) {
                                this.setAttribute("class", t || e === false ? "" : G.get(this, "__className__") || "");
                            }
                        }
                    });
                },
                hasClass: function (e) {
                    var t,
                        n,
                        i = 0;
                    t = " " + e + " ";
                    while ((n = this[i++])) {
                        if (n.nodeType === 1 && (" " + gt(yt(n)) + " ").indexOf(t) > -1) {
                            return true;
                        }
                    }
                    return false;
                },
            });
            var mt = /\r/g;
            m.fn.extend({
                val: function (e) {
                    var t,
                        n,
                        i,
                        r = this[0];
                    if (!arguments.length) {
                        if (r) {
                            t = m.valHooks[r.type] || m.valHooks[r.nodeName.toLowerCase()];
                            if (t && "get" in t && (n = t.get(r, "value")) !== undefined) {
                                return n;
                            }
                            n = r.value;
                            if (typeof n === "string") {
                                return n.replace(mt, "");
                            }
                            return n == null ? "" : n;
                        }
                        return;
                    }
                    i = m.isFunction(e);
                    return this.each(function (n) {
                        var r;
                        if (this.nodeType !== 1) {
                            return;
                        }
                        if (i) {
                            r = e.call(this, n, m(this).val());
                        } else {
                            r = e;
                        }
                        if (r == null) {
                            r = "";
                        } else if (typeof r === "number") {
                            r += "";
                        } else if (Array.isArray(r)) {
                            r = m.map(r, function (e) {
                                return e == null ? "" : e + "";
                            });
                        }
                        t = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()];
                        if (!t || !("set" in t) || t.set(this, r, "value") === undefined) {
                            this.value = r;
                        }
                    });
                },
            });
            m.extend({
                valHooks: {
                    option: {
                        get: function (e) {
                            var t = m.find.attr(e, "value");
                            return t != null ? t : gt(m.text(e));
                        },
                    },
                    select: {
                        get: function (e) {
                            var t,
                                n,
                                i,
                                r = e.options,
                                o = e.selectedIndex,
                                s = e.type === "select-one",
                                u = s ? null : [],
                                a = s ? o + 1 : r.length;
                            if (o < 0) {
                                i = a;
                            } else {
                                i = s ? o : 0;
                            }
                            for (; i < a; i++) {
                                n = r[i];
                                if ((n.selected || i === o) && !n.disabled && (!n.parentNode.disabled || !N(n.parentNode, "optgroup"))) {
                                    t = m(n).val();
                                    if (s) {
                                        return t;
                                    }
                                    u.push(t);
                                }
                            }
                            return u;
                        },
                        set: function (e, t) {
                            var n,
                                i,
                                r = e.options,
                                o = m.makeArray(t),
                                s = r.length;
                            while (s--) {
                                i = r[s];
                                if ((i.selected = m.inArray(m.valHooks.option.get(i), o) > -1)) {
                                    n = true;
                                }
                            }
                            if (!n) {
                                e.selectedIndex = -1;
                            }
                            return o;
                        },
                    },
                },
            });
            m.each(["radio", "checkbox"], function () {
                m.valHooks[this] = {
                    set: function (e, t) {
                        if (Array.isArray(t)) {
                            return (e.checked = m.inArray(m(e).val(), t) > -1);
                        }
                    },
                };
                if (!h.checkOn) {
                    m.valHooks[this].get = function (e) {
                        return e.getAttribute("value") === null ? "on" : e.value;
                    };
                }
            });
            var vt = /^(?:focusinfocus|focusoutblur)$/;
            m.extend(m.event, {
                trigger: function (t, n, r, o) {
                    var s,
                        u,
                        a,
                        f,
                        l,
                        d,
                        p,
                        h = [r || i],
                        g = c.call(t, "type") ? t.type : t,
                        y = c.call(t, "namespace") ? t.namespace.split(".") : [];
                    u = a = r = r || i;
                    if (r.nodeType === 3 || r.nodeType === 8) {
                        return;
                    }
                    if (vt.test(g + m.event.triggered)) {
                        return;
                    }
                    if (g.indexOf(".") > -1) {
                        y = g.split(".");
                        g = y.shift();
                        y.sort();
                    }
                    l = g.indexOf(":") < 0 && "on" + g;
                    t = t[m.expando] ? t : new m.Event(g, typeof t === "object" && t);
                    t.isTrigger = o ? 2 : 3;
                    t.namespace = y.join(".");
                    t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                    t.result = undefined;
                    if (!t.target) {
                        t.target = r;
                    }
                    n = n == null ? [t] : m.makeArray(n, [t]);
                    p = m.event.special[g] || {};
                    if (!o && p.trigger && p.trigger.apply(r, n) === false) {
                        return;
                    }
                    if (!o && !p.noBubble && !m.isWindow(r)) {
                        f = p.delegateType || g;
                        if (!vt.test(f + g)) {
                            u = u.parentNode;
                        }
                        for (; u; u = u.parentNode) {
                            h.push(u);
                            a = u;
                        }
                        if (a === (r.ownerDocument || i)) {
                            h.push(a.defaultView || a.parentWindow || e);
                        }
                    }
                    s = 0;
                    while ((u = h[s++]) && !t.isPropagationStopped()) {
                        t.type = s > 1 ? f : p.bindType || g;
                        d = (G.get(u, "events") || {})[t.type] && G.get(u, "handle");
                        if (d) {
                            d.apply(u, n);
                        }
                        d = l && u[l];
                        if (d && d.apply && U(u)) {
                            t.result = d.apply(u, n);
                            if (t.result === false) {
                                t.preventDefault();
                            }
                        }
                    }
                    t.type = g;
                    if (!o && !t.isDefaultPrevented()) {
                        if ((!p._default || p._default.apply(h.pop(), n) === false) && U(r)) {
                            if (l && m.isFunction(r[g]) && !m.isWindow(r)) {
                                a = r[l];
                                if (a) {
                                    r[l] = null;
                                }
                                m.event.triggered = g;
                                r[g]();
                                m.event.triggered = undefined;
                                if (a) {
                                    r[l] = a;
                                }
                            }
                        }
                    }
                    return t.result;
                },
                simulate: function (e, t, n) {
                    var i = m.extend(new m.Event(), n, { type: e, isSimulated: true });
                    m.event.trigger(i, null, t);
                },
            });
            m.fn.extend({
                trigger: function (e, t) {
                    return this.each(function () {
                        m.event.trigger(e, t, this);
                    });
                },
                triggerHandler: function (e, t) {
                    var n = this[0];
                    if (n) {
                        return m.event.trigger(e, t, n, true);
                    }
                },
            });
            m.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (
                e,
                t
            ) {
                m.fn[t] = function (e, n) {
                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
                };
            });
            m.fn.extend({
                hover: function (e, t) {
                    return this.mouseenter(e).mouseleave(t || e);
                },
            });
            h.focusin = "onfocusin" in e;
            if (!h.focusin) {
                m.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
                    var n = function (e) {
                        m.event.simulate(t, e.target, m.event.fix(e));
                    };
                    m.event.special[t] = {
                        setup: function () {
                            var i = this.ownerDocument || this,
                                r = G.access(i, t);
                            if (!r) {
                                i.addEventListener(e, n, true);
                            }
                            G.access(i, t, (r || 0) + 1);
                        },
                        teardown: function () {
                            var i = this.ownerDocument || this,
                                r = G.access(i, t) - 1;
                            if (!r) {
                                i.removeEventListener(e, n, true);
                                G.remove(i, t);
                            } else {
                                G.access(i, t, r);
                            }
                        },
                    };
                });
            }
            var xt = e.location;
            var bt = m.now();
            var wt = /\?/;
            m.parseXML = function (t) {
                var n;
                if (!t || typeof t !== "string") {
                    return null;
                }
                try {
                    n = new e.DOMParser().parseFromString(t, "text/xml");
                } catch (e) {
                    n = undefined;
                }
                if (!n || n.getElementsByTagName("parsererror").length) {
                    m.error("Invalid XML: " + t);
                }
                return n;
            };
            var Tt = /\[\]$/,
                Ct = /\r?\n/g,
                kt = /^(?:submit|button|image|reset|file)$/i,
                Et = /^(?:input|select|textarea|keygen)/i;
            function St(e, t, n, i) {
                var r;
                if (Array.isArray(t)) {
                    m.each(t, function (t, r) {
                        if (n || Tt.test(e)) {
                            i(e, r);
                        } else {
                            St(e + "[" + (typeof r === "object" && r != null ? t : "") + "]", r, n, i);
                        }
                    });
                } else if (!n && m.type(t) === "object") {
                    for (r in t) {
                        St(e + "[" + r + "]", t[r], n, i);
                    }
                } else {
                    i(e, t);
                }
            }
            m.param = function (e, t) {
                var n,
                    i = [],
                    r = function (e, t) {
                        var n = m.isFunction(t) ? t() : t;
                        i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(n == null ? "" : n);
                    };
                if (Array.isArray(e) || (e.jquery && !m.isPlainObject(e))) {
                    m.each(e, function () {
                        r(this.name, this.value);
                    });
                } else {
                    for (n in e) {
                        St(n, e[n], t, r);
                    }
                }
                return i.join("&");
            };
            m.fn.extend({
                serialize: function () {
                    return m.param(this.serializeArray());
                },
                serializeArray: function () {
                    return this.map(function () {
                        var e = m.prop(this, "elements");
                        return e ? m.makeArray(e) : this;
                    })
                        .filter(function () {
                            var e = this.type;
                            return this.name && !m(this).is(":disabled") && Et.test(this.nodeName) && !kt.test(e) && (this.checked || !fe.test(e));
                        })
                        .map(function (e, t) {
                            var n = m(this).val();
                            if (n == null) {
                                return null;
                            }
                            if (Array.isArray(n)) {
                                return m.map(n, function (e) {
                                    return { name: t.name, value: e.replace(Ct, "\r\n") };
                                });
                            }
                            return { name: t.name, value: n.replace(Ct, "\r\n") };
                        })
                        .get();
                },
            });
            var Nt = /%20/g,
                Dt = /#.*$/,
                jt = /([?&])_=[^&]*/,
                At = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                qt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                Lt = /^(?:GET|HEAD)$/,
                Ht = /^\/\//,
                Ft = {},
                Ot = {},
                Pt = "*/".concat("*"),
                Rt = i.createElement("a");
            Rt.href = xt.href;
            function Mt(e) {
                return function (t, n) {
                    if (typeof t !== "string") {
                        n = t;
                        t = "*";
                    }
                    var i,
                        r = 0,
                        o = t.toLowerCase().match(R) || [];
                    if (m.isFunction(n)) {
                        while ((i = o[r++])) {
                            if (i[0] === "+") {
                                i = i.slice(1) || "*";
                                (e[i] = e[i] || []).unshift(n);
                            } else {
                                (e[i] = e[i] || []).push(n);
                            }
                        }
                    }
                };
            }
            function It(e, t, n, i) {
                var r = {},
                    o = e === Ot;
                function s(u) {
                    var a;
                    r[u] = true;
                    m.each(e[u] || [], function (e, u) {
                        var f = u(t, n, i);
                        if (typeof f === "string" && !o && !r[f]) {
                            t.dataTypes.unshift(f);
                            s(f);
                            return false;
                        } else if (o) {
                            return !(a = f);
                        }
                    });
                    return a;
                }
                return s(t.dataTypes[0]) || (!r["*"] && s("*"));
            }
            function Wt(e, t) {
                var n,
                    i,
                    r = m.ajaxSettings.flatOptions || {};
                for (n in t) {
                    if (t[n] !== undefined) {
                        (r[n] ? e : i || (i = {}))[n] = t[n];
                    }
                }
                if (i) {
                    m.extend(true, e, i);
                }
                return e;
            }
            function $t(e, t, n) {
                var i,
                    r,
                    o,
                    s,
                    u = e.contents,
                    a = e.dataTypes;
                while (a[0] === "*") {
                    a.shift();
                    if (i === undefined) {
                        i = e.mimeType || t.getResponseHeader("Content-Type");
                    }
                }
                if (i) {
                    for (r in u) {
                        if (u[r] && u[r].test(i)) {
                            a.unshift(r);
                            break;
                        }
                    }
                }
                if (a[0] in n) {
                    o = a[0];
                } else {
                    for (r in n) {
                        if (!a[0] || e.converters[r + " " + a[0]]) {
                            o = r;
                            break;
                        }
                        if (!s) {
                            s = r;
                        }
                    }
                    o = o || s;
                }
                if (o) {
                    if (o !== a[0]) {
                        a.unshift(o);
                    }
                    return n[o];
                }
            }
            function Bt(e, t, n, i) {
                var r,
                    o,
                    s,
                    u,
                    a,
                    f = {},
                    l = e.dataTypes.slice();
                if (l[1]) {
                    for (s in e.converters) {
                        f[s.toLowerCase()] = e.converters[s];
                    }
                }
                o = l.shift();
                while (o) {
                    if (e.responseFields[o]) {
                        n[e.responseFields[o]] = t;
                    }
                    if (!a && i && e.dataFilter) {
                        t = e.dataFilter(t, e.dataType);
                    }
                    a = o;
                    o = l.shift();
                    if (o) {
                        if (o === "*") {
                            o = a;
                        } else if (a !== "*" && a !== o) {
                            s = f[a + " " + o] || f["* " + o];
                            if (!s) {
                                for (r in f) {
                                    u = r.split(" ");
                                    if (u[1] === o) {
                                        s = f[a + " " + u[0]] || f["* " + u[0]];
                                        if (s) {
                                            if (s === true) {
                                                s = f[r];
                                            } else if (f[r] !== true) {
                                                o = u[0];
                                                l.unshift(u[1]);
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                            if (s !== true) {
                                if (s && e.throws) {
                                    t = s(t);
                                } else {
                                    try {
                                        t = s(t);
                                    } catch (e) {
                                        return { state: "parsererror", error: s ? e : "No conversion from " + a + " to " + o };
                                    }
                                }
                            }
                        }
                    }
                }
                return { state: "success", data: t };
            }
            m.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: xt.href,
                    type: "GET",
                    isLocal: qt.test(xt.protocol),
                    global: true,
                    processData: true,
                    async: true,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: { "*": Pt, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
                    contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                    responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                    converters: { "* text": String, "text html": true, "text json": JSON.parse, "text xml": m.parseXML },
                    flatOptions: { url: true, context: true },
                },
                ajaxSetup: function (e, t) {
                    return t ? Wt(Wt(e, m.ajaxSettings), t) : Wt(m.ajaxSettings, e);
                },
                ajaxPrefilter: Mt(Ft),
                ajaxTransport: Mt(Ot),
                ajax: function (t, n) {
                    if (typeof t === "object") {
                        n = t;
                        t = undefined;
                    }
                    n = n || {};
                    var r,
                        o,
                        s,
                        u,
                        a,
                        f,
                        l,
                        c,
                        d,
                        p,
                        h = m.ajaxSetup({}, n),
                        g = h.context || h,
                        y = h.context && (g.nodeType || g.jquery) ? m(g) : m.event,
                        v = m.Deferred(),
                        x = m.Callbacks("once memory"),
                        b = h.statusCode || {},
                        w = {},
                        T = {},
                        C = "canceled",
                        k = {
                            readyState: 0,
                            getResponseHeader: function (e) {
                                var t;
                                if (l) {
                                    if (!u) {
                                        u = {};
                                        while ((t = At.exec(s))) {
                                            u[t[1].toLowerCase()] = t[2];
                                        }
                                    }
                                    t = u[e.toLowerCase()];
                                }
                                return t == null ? null : t;
                            },
                            getAllResponseHeaders: function () {
                                return l ? s : null;
                            },
                            setRequestHeader: function (e, t) {
                                if (l == null) {
                                    e = T[e.toLowerCase()] = T[e.toLowerCase()] || e;
                                    w[e] = t;
                                }
                                return this;
                            },
                            overrideMimeType: function (e) {
                                if (l == null) {
                                    h.mimeType = e;
                                }
                                return this;
                            },
                            statusCode: function (e) {
                                var t;
                                if (e) {
                                    if (l) {
                                        k.always(e[k.status]);
                                    } else {
                                        for (t in e) {
                                            b[t] = [b[t], e[t]];
                                        }
                                    }
                                }
                                return this;
                            },
                            abort: function (e) {
                                var t = e || C;
                                if (r) {
                                    r.abort(t);
                                }
                                E(0, t);
                                return this;
                            },
                        };
                    v.promise(k);
                    h.url = ((t || h.url || xt.href) + "").replace(Ht, xt.protocol + "//");
                    h.type = n.method || n.type || h.method || h.type;
                    h.dataTypes = (h.dataType || "*").toLowerCase().match(R) || [""];
                    if (h.crossDomain == null) {
                        f = i.createElement("a");
                        try {
                            f.href = h.url;
                            f.href = f.href;
                            h.crossDomain = Rt.protocol + "//" + Rt.host !== f.protocol + "//" + f.host;
                        } catch (e) {
                            h.crossDomain = true;
                        }
                    }
                    if (h.data && h.processData && typeof h.data !== "string") {
                        h.data = m.param(h.data, h.traditional);
                    }
                    It(Ft, h, n, k);
                    if (l) {
                        return k;
                    }
                    c = m.event && h.global;
                    if (c && m.active++ === 0) {
                        m.event.trigger("ajaxStart");
                    }
                    h.type = h.type.toUpperCase();
                    h.hasContent = !Lt.test(h.type);
                    o = h.url.replace(Dt, "");
                    if (!h.hasContent) {
                        p = h.url.slice(o.length);
                        if (h.data) {
                            o += (wt.test(o) ? "&" : "?") + h.data;
                            delete h.data;
                        }
                        if (h.cache === false) {
                            o = o.replace(jt, "$1");
                            p = (wt.test(o) ? "&" : "?") + "_=" + bt++ + p;
                        }
                        h.url = o + p;
                    } else if (h.data && h.processData && (h.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
                        h.data = h.data.replace(Nt, "+");
                    }
                    if (h.ifModified) {
                        if (m.lastModified[o]) {
                            k.setRequestHeader("If-Modified-Since", m.lastModified[o]);
                        }
                        if (m.etag[o]) {
                            k.setRequestHeader("If-None-Match", m.etag[o]);
                        }
                    }
                    if ((h.data && h.hasContent && h.contentType !== false) || n.contentType) {
                        k.setRequestHeader("Content-Type", h.contentType);
                    }
                    k.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + (h.dataTypes[0] !== "*" ? ", " + Pt + "; q=0.01" : "") : h.accepts["*"]);
                    for (d in h.headers) {
                        k.setRequestHeader(d, h.headers[d]);
                    }
                    if (h.beforeSend && (h.beforeSend.call(g, k, h) === false || l)) {
                        return k.abort();
                    }
                    C = "abort";
                    x.add(h.complete);
                    k.done(h.success);
                    k.fail(h.error);
                    r = It(Ot, h, n, k);
                    if (!r) {
                        E(-1, "No Transport");
                    } else {
                        k.readyState = 1;
                        if (c) {
                            y.trigger("ajaxSend", [k, h]);
                        }
                        if (l) {
                            return k;
                        }
                        if (h.async && h.timeout > 0) {
                            a = e.setTimeout(function () {
                                k.abort("timeout");
                            }, h.timeout);
                        }
                        try {
                            l = false;
                            r.send(w, E);
                        } catch (e) {
                            if (l) {
                                throw e;
                            }
                            E(-1, e);
                        }
                    }
                    function E(t, n, i, u) {
                        var f,
                            d,
                            p,
                            w,
                            T,
                            C = n;
                        if (l) {
                            return;
                        }
                        l = true;
                        if (a) {
                            e.clearTimeout(a);
                        }
                        r = undefined;
                        s = u || "";
                        k.readyState = t > 0 ? 4 : 0;
                        f = (t >= 200 && t < 300) || t === 304;
                        if (i) {
                            w = $t(h, k, i);
                        }
                        w = Bt(h, w, k, f);
                        if (f) {
                            if (h.ifModified) {
                                T = k.getResponseHeader("Last-Modified");
                                if (T) {
                                    m.lastModified[o] = T;
                                }
                                T = k.getResponseHeader("etag");
                                if (T) {
                                    m.etag[o] = T;
                                }
                            }
                            if (t === 204 || h.type === "HEAD") {
                                C = "nocontent";
                            } else if (t === 304) {
                                C = "notmodified";
                            } else {
                                C = w.state;
                                d = w.data;
                                p = w.error;
                                f = !p;
                            }
                        } else {
                            p = C;
                            if (t || !C) {
                                C = "error";
                                if (t < 0) {
                                    t = 0;
                                }
                            }
                        }
                        k.status = t;
                        k.statusText = (n || C) + "";
                        if (f) {
                            v.resolveWith(g, [d, C, k]);
                        } else {
                            v.rejectWith(g, [k, C, p]);
                        }
                        k.statusCode(b);
                        b = undefined;
                        if (c) {
                            y.trigger(f ? "ajaxSuccess" : "ajaxError", [k, h, f ? d : p]);
                        }
                        x.fireWith(g, [k, C]);
                        if (c) {
                            y.trigger("ajaxComplete", [k, h]);
                            if (!--m.active) {
                                m.event.trigger("ajaxStop");
                            }
                        }
                    }
                    return k;
                },
                getJSON: function (e, t, n) {
                    return m.get(e, t, n, "json");
                },
                getScript: function (e, t) {
                    return m.get(e, undefined, t, "script");
                },
            });
            m.each(["get", "post"], function (e, t) {
                m[t] = function (e, n, i, r) {
                    if (m.isFunction(n)) {
                        r = r || i;
                        i = n;
                        n = undefined;
                    }
                    return m.ajax(m.extend({ url: e, type: t, dataType: r, data: n, success: i }, m.isPlainObject(e) && e));
                };
            });
            m._evalUrl = function (e) {
                return m.ajax({ url: e, type: "GET", dataType: "script", cache: true, async: false, global: false, throws: true });
            };
            m.fn.extend({
                wrapAll: function (e) {
                    var t;
                    if (this[0]) {
                        if (m.isFunction(e)) {
                            e = e.call(this[0]);
                        }
                        t = m(e, this[0].ownerDocument).eq(0).clone(true);
                        if (this[0].parentNode) {
                            t.insertBefore(this[0]);
                        }
                        t.map(function () {
                            var e = this;
                            while (e.firstElementChild) {
                                e = e.firstElementChild;
                            }
                            return e;
                        }).append(this);
                    }
                    return this;
                },
                wrapInner: function (e) {
                    if (m.isFunction(e)) {
                        return this.each(function (t) {
                            m(this).wrapInner(e.call(this, t));
                        });
                    }
                    return this.each(function () {
                        var t = m(this),
                            n = t.contents();
                        if (n.length) {
                            n.wrapAll(e);
                        } else {
                            t.append(e);
                        }
                    });
                },
                wrap: function (e) {
                    var t = m.isFunction(e);
                    return this.each(function (n) {
                        m(this).wrapAll(t ? e.call(this, n) : e);
                    });
                },
                unwrap: function (e) {
                    this.parent(e)
                        .not("body")
                        .each(function () {
                            m(this).replaceWith(this.childNodes);
                        });
                    return this;
                },
            });
            m.expr.pseudos.hidden = function (e) {
                return !m.expr.pseudos.visible(e);
            };
            m.expr.pseudos.visible = function (e) {
                return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
            };
            m.ajaxSettings.xhr = function () {
                try {
                    return new e.XMLHttpRequest();
                } catch (e) {}
            };
            var _t = { 0: 200, 1223: 204 },
                zt = m.ajaxSettings.xhr();
            h.cors = !!zt && "withCredentials" in zt;
            h.ajax = zt = !!zt;
            m.ajaxTransport(function (t) {
                var n, i;
                if (h.cors || (zt && !t.crossDomain)) {
                    return {
                        send: function (r, o) {
                            var s,
                                u = t.xhr();
                            u.open(t.type, t.url, t.async, t.username, t.password);
                            if (t.xhrFields) {
                                for (s in t.xhrFields) {
                                    u[s] = t.xhrFields[s];
                                }
                            }
                            if (t.mimeType && u.overrideMimeType) {
                                u.overrideMimeType(t.mimeType);
                            }
                            if (!t.crossDomain && !r["X-Requested-With"]) {
                                r["X-Requested-With"] = "XMLHttpRequest";
                            }
                            for (s in r) {
                                u.setRequestHeader(s, r[s]);
                            }
                            n = function (e) {
                                return function () {
                                    if (n) {
                                        n = i = u.onload = u.onerror = u.onabort = u.onreadystatechange = null;
                                        if (e === "abort") {
                                            u.abort();
                                        } else if (e === "error") {
                                            if (typeof u.status !== "number") {
                                                o(0, "error");
                                            } else {
                                                o(u.status, u.statusText);
                                            }
                                        } else {
                                            o(
                                                _t[u.status] || u.status,
                                                u.statusText,
                                                (u.responseType || "text") !== "text" || typeof u.responseText !== "string" ? { binary: u.response } : { text: u.responseText },
                                                u.getAllResponseHeaders()
                                            );
                                        }
                                    }
                                };
                            };
                            u.onload = n();
                            i = u.onerror = n("error");
                            if (u.onabort !== undefined) {
                                u.onabort = i;
                            } else {
                                u.onreadystatechange = function () {
                                    if (u.readyState === 4) {
                                        e.setTimeout(function () {
                                            if (n) {
                                                i();
                                            }
                                        });
                                    }
                                };
                            }
                            n = n("abort");
                            try {
                                u.send((t.hasContent && t.data) || null);
                            } catch (e) {
                                if (n) {
                                    throw e;
                                }
                            }
                        },
                        abort: function () {
                            if (n) {
                                n();
                            }
                        },
                    };
                }
            });
            m.ajaxPrefilter(function (e) {
                if (e.crossDomain) {
                    e.contents.script = false;
                }
            });
            m.ajaxSetup({
                accepts: { script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript" },
                contents: { script: /\b(?:java|ecma)script\b/ },
                converters: {
                    "text script": function (e) {
                        m.globalEval(e);
                        return e;
                    },
                },
            });
            m.ajaxPrefilter("script", function (e) {
                if (e.cache === undefined) {
                    e.cache = false;
                }
                if (e.crossDomain) {
                    e.type = "GET";
                }
            });
            m.ajaxTransport("script", function (e) {
                if (e.crossDomain) {
                    var t, n;
                    return {
                        send: function (r, o) {
                            t = m("<script>")
                                .prop({ charset: e.scriptCharset, src: e.url })
                                .on(
                                    "load error",
                                    (n = function (e) {
                                        t.remove();
                                        n = null;
                                        if (e) {
                                            o(e.type === "error" ? 404 : 200, e.type);
                                        }
                                    })
                                );
                            i.head.appendChild(t[0]);
                        },
                        abort: function () {
                            if (n) {
                                n();
                            }
                        },
                    };
                }
            });
            var Xt = [],
                Ut = /(=)\?(?=&|$)|\?\?/;
            m.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function () {
                    var e = Xt.pop() || m.expando + "_" + bt++;
                    this[e] = true;
                    return e;
                },
            });
            m.ajaxPrefilter("json jsonp", function (t, n, i) {
                var r,
                    o,
                    s,
                    u = t.jsonp !== false && (Ut.test(t.url) ? "url" : typeof t.data === "string" && (t.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && Ut.test(t.data) && "data");
                if (u || t.dataTypes[0] === "jsonp") {
                    r = t.jsonpCallback = m.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback;
                    if (u) {
                        t[u] = t[u].replace(Ut, "$1" + r);
                    } else if (t.jsonp !== false) {
                        t.url += (wt.test(t.url) ? "&" : "?") + t.jsonp + "=" + r;
                    }
                    t.converters["script json"] = function () {
                        if (!s) {
                            m.error(r + " was not called");
                        }
                        return s[0];
                    };
                    t.dataTypes[0] = "json";
                    o = e[r];
                    e[r] = function () {
                        s = arguments;
                    };
                    i.always(function () {
                        if (o === undefined) {
                            m(e).removeProp(r);
                        } else {
                            e[r] = o;
                        }
                        if (t[r]) {
                            t.jsonpCallback = n.jsonpCallback;
                            Xt.push(r);
                        }
                        if (s && m.isFunction(o)) {
                            o(s[0]);
                        }
                        s = o = undefined;
                    });
                    return "script";
                }
            });
            h.createHTMLDocument = (function () {
                var e = i.implementation.createHTMLDocument("").body;
                e.innerHTML = "<form></form><form></form>";
                return e.childNodes.length === 2;
            })();
            m.parseHTML = function (e, t, n) {
                if (typeof e !== "string") {
                    return [];
                }
                if (typeof t === "boolean") {
                    n = t;
                    t = false;
                }
                var r, o, s;
                if (!t) {
                    if (h.createHTMLDocument) {
                        t = i.implementation.createHTMLDocument("");
                        r = t.createElement("base");
                        r.href = i.location.href;
                        t.head.appendChild(r);
                    } else {
                        t = i;
                    }
                }
                o = D.exec(e);
                s = !n && [];
                if (o) {
                    return [t.createElement(o[1])];
                }
                o = ye([e], t, s);
                if (s && s.length) {
                    m(s).remove();
                }
                return m.merge([], o.childNodes);
            };
            m.fn.load = function (e, t, n) {
                var i,
                    r,
                    o,
                    s = this,
                    u = e.indexOf(" ");
                if (u > -1) {
                    i = gt(e.slice(u));
                    e = e.slice(0, u);
                }
                if (m.isFunction(t)) {
                    n = t;
                    t = undefined;
                } else if (t && typeof t === "object") {
                    r = "POST";
                }
                if (s.length > 0) {
                    m.ajax({ url: e, type: r || "GET", dataType: "html", data: t })
                        .done(function (e) {
                            o = arguments;
                            s.html(i ? m("<div>").append(m.parseHTML(e)).find(i) : e);
                        })
                        .always(
                            n &&
                                function (e, t) {
                                    s.each(function () {
                                        n.apply(this, o || [e.responseText, t, e]);
                                    });
                                }
                        );
                }
                return this;
            };
            m.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
                m.fn[t] = function (e) {
                    return this.on(t, e);
                };
            });
            m.expr.pseudos.animated = function (e) {
                return m.grep(m.timers, function (t) {
                    return e === t.elem;
                }).length;
            };
            m.offset = {
                setOffset: function (e, t, n) {
                    var i,
                        r,
                        o,
                        s,
                        u,
                        a,
                        f,
                        l = m.css(e, "position"),
                        c = m(e),
                        d = {};
                    if (l === "static") {
                        e.style.position = "relative";
                    }
                    u = c.offset();
                    o = m.css(e, "top");
                    a = m.css(e, "left");
                    f = (l === "absolute" || l === "fixed") && (o + a).indexOf("auto") > -1;
                    if (f) {
                        i = c.position();
                        s = i.top;
                        r = i.left;
                    } else {
                        s = parseFloat(o) || 0;
                        r = parseFloat(a) || 0;
                    }
                    if (m.isFunction(t)) {
                        t = t.call(e, n, m.extend({}, u));
                    }
                    if (t.top != null) {
                        d.top = t.top - u.top + s;
                    }
                    if (t.left != null) {
                        d.left = t.left - u.left + r;
                    }
                    if ("using" in t) {
                        t.using.call(e, d);
                    } else {
                        c.css(d);
                    }
                },
            };
            m.fn.extend({
                offset: function (e) {
                    if (arguments.length) {
                        return e === undefined
                            ? this
                            : this.each(function (t) {
                                  m.offset.setOffset(this, e, t);
                              });
                    }
                    var t,
                        n,
                        i,
                        r,
                        o = this[0];
                    if (!o) {
                        return;
                    }
                    if (!o.getClientRects().length) {
                        return { top: 0, left: 0 };
                    }
                    i = o.getBoundingClientRect();
                    t = o.ownerDocument;
                    n = t.documentElement;
                    r = t.defaultView;
                    return { top: i.top + r.pageYOffset - n.clientTop, left: i.left + r.pageXOffset - n.clientLeft };
                },
                position: function () {
                    if (!this[0]) {
                        return;
                    }
                    var e,
                        t,
                        n = this[0],
                        i = { top: 0, left: 0 };
                    if (m.css(n, "position") === "fixed") {
                        t = n.getBoundingClientRect();
                    } else {
                        e = this.offsetParent();
                        t = this.offset();
                        if (!N(e[0], "html")) {
                            i = e.offset();
                        }
                        i = { top: i.top + m.css(e[0], "borderTopWidth", true), left: i.left + m.css(e[0], "borderLeftWidth", true) };
                    }
                    return { top: t.top - i.top - m.css(n, "marginTop", true), left: t.left - i.left - m.css(n, "marginLeft", true) };
                },
                offsetParent: function () {
                    return this.map(function () {
                        var e = this.offsetParent;
                        while (e && m.css(e, "position") === "static") {
                            e = e.offsetParent;
                        }
                        return e || me;
                    });
                },
            });
            m.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, t) {
                var n = "pageYOffset" === t;
                m.fn[e] = function (i) {
                    return X(
                        this,
                        function (e, i, r) {
                            var o;
                            if (m.isWindow(e)) {
                                o = e;
                            } else if (e.nodeType === 9) {
                                o = e.defaultView;
                            }
                            if (r === undefined) {
                                return o ? o[t] : e[i];
                            }
                            if (o) {
                                o.scrollTo(!n ? r : o.pageXOffset, n ? r : o.pageYOffset);
                            } else {
                                e[i] = r;
                            }
                        },
                        e,
                        i,
                        arguments.length
                    );
                };
            });
            m.each(["top", "left"], function (e, t) {
                m.cssHooks[t] = $e(h.pixelPosition, function (e, n) {
                    if (n) {
                        n = We(e, t);
                        return Me.test(n) ? m(e).position()[t] + "px" : n;
                    }
                });
            });
            m.each({ Height: "height", Width: "width" }, function (e, t) {
                m.each({ padding: "inner" + e, content: t, "": "outer" + e }, function (n, i) {
                    m.fn[i] = function (r, o) {
                        var s = arguments.length && (n || typeof r !== "boolean"),
                            u = n || (r === true || o === true ? "margin" : "border");
                        return X(
                            this,
                            function (t, n, r) {
                                var o;
                                if (m.isWindow(t)) {
                                    return i.indexOf("outer") === 0 ? t["inner" + e] : t.document.documentElement["client" + e];
                                }
                                if (t.nodeType === 9) {
                                    o = t.documentElement;
                                    return Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e]);
                                }
                                return r === undefined ? m.css(t, n, u) : m.style(t, n, r, u);
                            },
                            t,
                            s ? r : undefined,
                            s
                        );
                    };
                });
            });
            m.fn.extend({
                bind: function (e, t, n) {
                    return this.on(e, null, t, n);
                },
                unbind: function (e, t) {
                    return this.off(e, null, t);
                },
                delegate: function (e, t, n, i) {
                    return this.on(t, e, n, i);
                },
                undelegate: function (e, t, n) {
                    return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n);
                },
            });
            m.holdReady = function (e) {
                if (e) {
                    m.readyWait++;
                } else {
                    m.ready(true);
                }
            };
            m.isArray = Array.isArray;
            m.parseJSON = JSON.parse;
            m.nodeName = N;
            if (typeof define === "function" && define.amd) {
                define("jquery", [], function () {
                    return m;
                });
            }
            var Vt = e.jQuery,
                Gt = e.$;
            m.noConflict = function (t) {
                if (e.$ === m) {
                    e.$ = Gt;
                }
                if (t && e.jQuery === m) {
                    e.jQuery = Vt;
                }
                return m;
            };
            if (!t) {
                e.jQuery = e.$ = m;
            }
            return m;
        });
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/vendor/jquery/jquery-3.2.1.map.js

        jQuery.easing["jswing"] = jQuery.easing["swing"];
        jQuery.extend(jQuery.easing, {
            def: "easeOutQuad",
            swing: function (n, e, t, r, u) {
                return jQuery.easing[jQuery.easing.def](n, e, t, r, u);
            },
            easeInQuad: function (n, e, t, r, u) {
                return r * (e /= u) * e + t;
            },
            easeOutQuad: function (n, e, t, r, u) {
                return -r * (e /= u) * (e - 2) + t;
            },
            easeInOutQuad: function (n, e, t, r, u) {
                if ((e /= u / 2) < 1) return (r / 2) * e * e + t;
                return (-r / 2) * (--e * (e - 2) - 1) + t;
            },
            easeInCubic: function (n, e, t, r, u) {
                return r * (e /= u) * e * e + t;
            },
            easeOutCubic: function (n, e, t, r, u) {
                return r * ((e = e / u - 1) * e * e + 1) + t;
            },
            easeInOutCubic: function (n, e, t, r, u) {
                if ((e /= u / 2) < 1) return (r / 2) * e * e * e + t;
                return (r / 2) * ((e -= 2) * e * e + 2) + t;
            },
            easeInQuart: function (n, e, t, r, u) {
                return r * (e /= u) * e * e * e + t;
            },
            easeOutQuart: function (n, e, t, r, u) {
                return -r * ((e = e / u - 1) * e * e * e - 1) + t;
            },
            easeInOutQuart: function (n, e, t, r, u) {
                if ((e /= u / 2) < 1) return (r / 2) * e * e * e * e + t;
                return (-r / 2) * ((e -= 2) * e * e * e - 2) + t;
            },
            easeInQuint: function (n, e, t, r, u) {
                return r * (e /= u) * e * e * e * e + t;
            },
            easeOutQuint: function (n, e, t, r, u) {
                return r * ((e = e / u - 1) * e * e * e * e + 1) + t;
            },
            easeInOutQuint: function (n, e, t, r, u) {
                if ((e /= u / 2) < 1) return (r / 2) * e * e * e * e * e + t;
                return (r / 2) * ((e -= 2) * e * e * e * e + 2) + t;
            },
            easeInSine: function (n, e, t, r, u) {
                return -r * Math.cos((e / u) * (Math.PI / 2)) + r + t;
            },
            easeOutSine: function (n, e, t, r, u) {
                return r * Math.sin((e / u) * (Math.PI / 2)) + t;
            },
            easeInOutSine: function (n, e, t, r, u) {
                return (-r / 2) * (Math.cos((Math.PI * e) / u) - 1) + t;
            },
            easeInExpo: function (n, e, t, r, u) {
                return e == 0 ? t : r * Math.pow(2, 10 * (e / u - 1)) + t;
            },
            easeOutExpo: function (n, e, t, r, u) {
                return e == u ? t + r : r * (-Math.pow(2, (-10 * e) / u) + 1) + t;
            },
            easeInOutExpo: function (n, e, t, r, u) {
                if (e == 0) return t;
                if (e == u) return t + r;
                if ((e /= u / 2) < 1) return (r / 2) * Math.pow(2, 10 * (e - 1)) + t;
                return (r / 2) * (-Math.pow(2, -10 * --e) + 2) + t;
            },
            easeInCirc: function (n, e, t, r, u) {
                return -r * (Math.sqrt(1 - (e /= u) * e) - 1) + t;
            },
            easeOutCirc: function (n, e, t, r, u) {
                return r * Math.sqrt(1 - (e = e / u - 1) * e) + t;
            },
            easeInOutCirc: function (n, e, t, r, u) {
                if ((e /= u / 2) < 1) return (-r / 2) * (Math.sqrt(1 - e * e) - 1) + t;
                return (r / 2) * (Math.sqrt(1 - (e -= 2) * e) + 1) + t;
            },
            easeInElastic: function (n, e, t, r, u) {
                var a = 1.70158;
                var i = 0;
                var s = r;
                if (e == 0) return t;
                if ((e /= u) == 1) return t + r;
                if (!i) i = u * 0.3;
                if (s < Math.abs(r)) {
                    s = r;
                    var a = i / 4;
                } else var a = (i / (2 * Math.PI)) * Math.asin(r / s);
                return -(s * Math.pow(2, 10 * (e -= 1)) * Math.sin(((e * u - a) * (2 * Math.PI)) / i)) + t;
            },
            easeOutElastic: function (n, e, t, r, u) {
                var a = 1.70158;
                var i = 0;
                var s = r;
                if (e == 0) return t;
                if ((e /= u) == 1) return t + r;
                if (!i) i = u * 0.3;
                if (s < Math.abs(r)) {
                    s = r;
                    var a = i / 4;
                } else var a = (i / (2 * Math.PI)) * Math.asin(r / s);
                return s * Math.pow(2, -10 * e) * Math.sin(((e * u - a) * (2 * Math.PI)) / i) + r + t;
            },
            easeInOutElastic: function (n, e, t, r, u) {
                var a = 1.70158;
                var i = 0;
                var s = r;
                if (e == 0) return t;
                if ((e /= u / 2) == 2) return t + r;
                if (!i) i = u * (0.3 * 1.5);
                if (s < Math.abs(r)) {
                    s = r;
                    var a = i / 4;
                } else var a = (i / (2 * Math.PI)) * Math.asin(r / s);
                if (e < 1) return -0.5 * (s * Math.pow(2, 10 * (e -= 1)) * Math.sin(((e * u - a) * (2 * Math.PI)) / i)) + t;
                return s * Math.pow(2, -10 * (e -= 1)) * Math.sin(((e * u - a) * (2 * Math.PI)) / i) * 0.5 + r + t;
            },
            easeInBack: function (n, e, t, r, u, a) {
                if (a == undefined) a = 1.70158;
                return r * (e /= u) * e * ((a + 1) * e - a) + t;
            },
            easeOutBack: function (n, e, t, r, u, a) {
                if (a == undefined) a = 1.70158;
                return r * ((e = e / u - 1) * e * ((a + 1) * e + a) + 1) + t;
            },
            easeInOutBack: function (n, e, t, r, u, a) {
                if (a == undefined) a = 1.70158;
                if ((e /= u / 2) < 1) return (r / 2) * (e * e * (((a *= 1.525) + 1) * e - a)) + t;
                return (r / 2) * ((e -= 2) * e * (((a *= 1.525) + 1) * e + a) + 2) + t;
            },
            easeInBounce: function (n, e, t, r, u) {
                return r - jQuery.easing.easeOutBounce(n, u - e, 0, r, u) + t;
            },
            easeOutBounce: function (n, e, t, r, u) {
                if ((e /= u) < 1 / 2.75) {
                    return r * (7.5625 * e * e) + t;
                } else if (e < 2 / 2.75) {
                    return r * (7.5625 * (e -= 1.5 / 2.75) * e + 0.75) + t;
                } else if (e < 2.5 / 2.75) {
                    return r * (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375) + t;
                } else {
                    return r * (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375) + t;
                }
            },
            easeInOutBounce: function (n, e, t, r, u) {
                if (e < u / 2) return jQuery.easing.easeInBounce(n, e * 2, 0, r, u) * 0.5 + t;
                return jQuery.easing.easeOutBounce(n, e * 2 - u, 0, r, u) * 0.5 + r * 0.5 + t;
            },
        });
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/vendor/jquery.easing/js/jquery.easing.map.js

        (function (t, e) {
            typeof exports === "object" && typeof module !== "undefined" ? (module.exports = e(require("jquery"))) : typeof define === "function" && define.amd ? define(["jquery"], e) : ((t = t || self), (t.Util = e(t.jQuery)));
        })(this, function (t) {
            "use strict";
            t = t && t.hasOwnProperty("default") ? t["default"] : t;
            var e = "transitionend";
            var n = 1e6;
            var r = 1e3;
            function o(t) {
                return {}.toString
                    .call(t)
                    .match(/\s([a-z]+)/i)[1]
                    .toLowerCase();
            }
            function i() {
                return {
                    bindType: e,
                    delegateType: e,
                    handle: function e(n) {
                        if (t(n.target).is(this)) {
                            return n.handleObj.handler.apply(this, arguments);
                        }
                        return undefined;
                    },
                };
            }
            function a(e) {
                var n = this;
                var r = false;
                t(this).one(f.TRANSITION_END, function () {
                    r = true;
                });
                setTimeout(function () {
                    if (!r) {
                        f.triggerTransitionEnd(n);
                    }
                }, e);
                return this;
            }
            function u() {
                t.fn.emulateTransitionEnd = a;
                t.event.special[f.TRANSITION_END] = i();
            }
            var f = {
                TRANSITION_END: "bsTransitionEnd",
                getUID: function t(e) {
                    do {
                        e += ~~(Math.random() * n);
                    } while (document.getElementById(e));
                    return e;
                },
                getSelectorFromElement: function t(e) {
                    var n = e.getAttribute("data-target");
                    if (!n || n === "#") {
                        var r = e.getAttribute("href");
                        n = r && r !== "#" ? r.trim() : "";
                    }
                    try {
                        return document.querySelector(n) ? n : null;
                    } catch (t) {
                        return null;
                    }
                },
                getTransitionDurationFromElement: function e(n) {
                    if (!n) {
                        return 0;
                    }
                    var o = t(n).css("transition-duration");
                    var i = t(n).css("transition-delay");
                    var a = parseFloat(o);
                    var u = parseFloat(i);
                    if (!a && !u) {
                        return 0;
                    }
                    o = o.split(",")[0];
                    i = i.split(",")[0];
                    return (parseFloat(o) + parseFloat(i)) * r;
                },
                reflow: function t(e) {
                    return e.offsetHeight;
                },
                triggerTransitionEnd: function n(r) {
                    t(r).trigger(e);
                },
                supportsTransitionEnd: function t() {
                    return Boolean(e);
                },
                isElement: function t(e) {
                    return (e[0] || e).nodeType;
                },
                typeCheckConfig: function t(e, n, r) {
                    for (var i in r) {
                        if (Object.prototype.hasOwnProperty.call(r, i)) {
                            var a = r[i];
                            var u = n[i];
                            var d = u && f.isElement(u) ? "element" : o(u);
                            if (!new RegExp(a).test(d)) {
                                throw new Error(e.toUpperCase() + ": " + ('Option "' + i + '" provided type "' + d + '" ') + ('but expected type "' + a + '".'));
                            }
                        }
                    }
                },
                findShadowRoot: function t(e) {
                    if (!document.documentElement.attachShadow) {
                        return null;
                    }
                    if (typeof e.getRootNode === "function") {
                        var n = e.getRootNode();
                        return n instanceof ShadowRoot ? n : null;
                    }
                    if (e instanceof ShadowRoot) {
                        return e;
                    }
                    if (!e.parentNode) {
                        return null;
                    }
                    return f.findShadowRoot(e.parentNode);
                },
            };
            u();
            return f;
        });
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/vendor/bootstrap/js/dist/util.map.js

        (function (e, t) {
            typeof exports === "object" && typeof module !== "undefined"
                ? (module.exports = t(require("jquery"), require("./util.js")))
                : typeof define === "function" && define.amd
                ? define(["jquery", "./util.js"], t)
                : ((e = e || self), (e.Collapse = t(e.jQuery, e.Util)));
        })(this, function (e, t) {
            "use strict";
            e = e && e.hasOwnProperty("default") ? e["default"] : e;
            t = t && t.hasOwnProperty("default") ? t["default"] : t;
            function r(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || false;
                    n.configurable = true;
                    if ("value" in n) n.writable = true;
                    Object.defineProperty(e, n.key, n);
                }
            }
            function n(e, t, n) {
                if (t) r(e.prototype, t);
                if (n) r(e, n);
                return e;
            }
            function i(e, t, r) {
                if (t in e) {
                    Object.defineProperty(e, t, { value: r, enumerable: true, configurable: true, writable: true });
                } else {
                    e[t] = r;
                }
                return e;
            }
            function a(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t] != null ? arguments[t] : {};
                    var n = Object.keys(r);
                    if (typeof Object.getOwnPropertySymbols === "function") {
                        n = n.concat(
                            Object.getOwnPropertySymbols(r).filter(function (e) {
                                return Object.getOwnPropertyDescriptor(r, e).enumerable;
                            })
                        );
                    }
                    n.forEach(function (t) {
                        i(e, t, r[t]);
                    });
                }
                return e;
            }
            var l = "collapse";
            var s = "4.3.1";
            var o = "bs.collapse";
            var u = "." + o;
            var f = ".data-api";
            var c = e.fn[l];
            var g = { toggle: true, parent: "" };
            var h = { toggle: "boolean", parent: "(string|element)" };
            var d = { SHOW: "show" + u, SHOWN: "shown" + u, HIDE: "hide" + u, HIDDEN: "hidden" + u, CLICK_DATA_API: "click" + u + f };
            var _ = { SHOW: "show", COLLAPSE: "collapse", COLLAPSING: "collapsing", COLLAPSED: "collapsed" };
            var m = { WIDTH: "width", HEIGHT: "height" };
            var v = { ACTIVES: ".show, .collapsing", DATA_TOGGLE: '[data-toggle="collapse"]' };
            var p = (function () {
                function r(e, r) {
                    this._isTransitioning = false;
                    this._element = e;
                    this._config = this._getConfig(r);
                    this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],' + ('[data-toggle="collapse"][data-target="#' + e.id + '"]')));
                    var n = [].slice.call(document.querySelectorAll(v.DATA_TOGGLE));
                    for (var i = 0, a = n.length; i < a; i++) {
                        var l = n[i];
                        var s = t.getSelectorFromElement(l);
                        var o = [].slice.call(document.querySelectorAll(s)).filter(function (t) {
                            return t === e;
                        });
                        if (s !== null && o.length > 0) {
                            this._selector = s;
                            this._triggerArray.push(l);
                        }
                    }
                    this._parent = this._config.parent ? this._getParent() : null;
                    if (!this._config.parent) {
                        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
                    }
                    if (this._config.toggle) {
                        this.toggle();
                    }
                }
                var i = r.prototype;
                i.toggle = function t() {
                    if (e(this._element).hasClass(_.SHOW)) {
                        this.hide();
                    } else {
                        this.show();
                    }
                };
                i.show = function n() {
                    var i = this;
                    if (this._isTransitioning || e(this._element).hasClass(_.SHOW)) {
                        return;
                    }
                    var a;
                    var l;
                    if (this._parent) {
                        a = [].slice.call(this._parent.querySelectorAll(v.ACTIVES)).filter(function (e) {
                            if (typeof i._config.parent === "string") {
                                return e.getAttribute("data-parent") === i._config.parent;
                            }
                            return e.classList.contains(_.COLLAPSE);
                        });
                        if (a.length === 0) {
                            a = null;
                        }
                    }
                    if (a) {
                        l = e(a).not(this._selector).data(o);
                        if (l && l._isTransitioning) {
                            return;
                        }
                    }
                    var s = e.Event(d.SHOW);
                    e(this._element).trigger(s);
                    if (s.isDefaultPrevented()) {
                        return;
                    }
                    if (a) {
                        r._jQueryInterface.call(e(a).not(this._selector), "hide");
                        if (!l) {
                            e(a).data(o, null);
                        }
                    }
                    var u = this._getDimension();
                    e(this._element).removeClass(_.COLLAPSE).addClass(_.COLLAPSING);
                    this._element.style[u] = 0;
                    if (this._triggerArray.length) {
                        e(this._triggerArray).removeClass(_.COLLAPSED).attr("aria-expanded", true);
                    }
                    this.setTransitioning(true);
                    var f = function t() {
                        e(i._element).removeClass(_.COLLAPSING).addClass(_.COLLAPSE).addClass(_.SHOW);
                        i._element.style[u] = "";
                        i.setTransitioning(false);
                        e(i._element).trigger(d.SHOWN);
                    };
                    var c = u[0].toUpperCase() + u.slice(1);
                    var g = "scroll" + c;
                    var h = t.getTransitionDurationFromElement(this._element);
                    e(this._element).one(t.TRANSITION_END, f).emulateTransitionEnd(h);
                    this._element.style[u] = this._element[g] + "px";
                };
                i.hide = function r() {
                    var n = this;
                    if (this._isTransitioning || !e(this._element).hasClass(_.SHOW)) {
                        return;
                    }
                    var i = e.Event(d.HIDE);
                    e(this._element).trigger(i);
                    if (i.isDefaultPrevented()) {
                        return;
                    }
                    var a = this._getDimension();
                    this._element.style[a] = this._element.getBoundingClientRect()[a] + "px";
                    t.reflow(this._element);
                    e(this._element).addClass(_.COLLAPSING).removeClass(_.COLLAPSE).removeClass(_.SHOW);
                    var l = this._triggerArray.length;
                    if (l > 0) {
                        for (var s = 0; s < l; s++) {
                            var o = this._triggerArray[s];
                            var u = t.getSelectorFromElement(o);
                            if (u !== null) {
                                var f = e([].slice.call(document.querySelectorAll(u)));
                                if (!f.hasClass(_.SHOW)) {
                                    e(o).addClass(_.COLLAPSED).attr("aria-expanded", false);
                                }
                            }
                        }
                    }
                    this.setTransitioning(true);
                    var c = function t() {
                        n.setTransitioning(false);
                        e(n._element).removeClass(_.COLLAPSING).addClass(_.COLLAPSE).trigger(d.HIDDEN);
                    };
                    this._element.style[a] = "";
                    var g = t.getTransitionDurationFromElement(this._element);
                    e(this._element).one(t.TRANSITION_END, c).emulateTransitionEnd(g);
                };
                i.setTransitioning = function e(t) {
                    this._isTransitioning = t;
                };
                i.dispose = function t() {
                    e.removeData(this._element, o);
                    this._config = null;
                    this._parent = null;
                    this._element = null;
                    this._triggerArray = null;
                    this._isTransitioning = null;
                };
                i._getConfig = function e(r) {
                    r = a({}, g, r);
                    r.toggle = Boolean(r.toggle);
                    t.typeCheckConfig(l, r, h);
                    return r;
                };
                i._getDimension = function t() {
                    var r = e(this._element).hasClass(m.WIDTH);
                    return r ? m.WIDTH : m.HEIGHT;
                };
                i._getParent = function n() {
                    var i = this;
                    var a;
                    if (t.isElement(this._config.parent)) {
                        a = this._config.parent;
                        if (typeof this._config.parent.jquery !== "undefined") {
                            a = this._config.parent[0];
                        }
                    } else {
                        a = document.querySelector(this._config.parent);
                    }
                    var l = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                    var s = [].slice.call(a.querySelectorAll(l));
                    e(s).each(function (e, t) {
                        i._addAriaAndCollapsedClass(r._getTargetFromElement(t), [t]);
                    });
                    return a;
                };
                i._addAriaAndCollapsedClass = function t(r, n) {
                    var i = e(r).hasClass(_.SHOW);
                    if (n.length) {
                        e(n).toggleClass(_.COLLAPSED, !i).attr("aria-expanded", i);
                    }
                };
                r._getTargetFromElement = function e(r) {
                    var n = t.getSelectorFromElement(r);
                    return n ? document.querySelector(n) : null;
                };
                r._jQueryInterface = function t(n) {
                    return this.each(function () {
                        var t = e(this);
                        var i = t.data(o);
                        var l = a({}, g, t.data(), typeof n === "object" && n ? n : {});
                        if (!i && l.toggle && /show|hide/.test(n)) {
                            l.toggle = false;
                        }
                        if (!i) {
                            i = new r(this, l);
                            t.data(o, i);
                        }
                        if (typeof n === "string") {
                            if (typeof i[n] === "undefined") {
                                throw new TypeError('No method named "' + n + '"');
                            }
                            i[n]();
                        }
                    });
                };
                n(r, null, [
                    {
                        key: "VERSION",
                        get: function e() {
                            return s;
                        },
                    },
                    {
                        key: "Default",
                        get: function e() {
                            return g;
                        },
                    },
                ]);
                return r;
            })();
            e(document).on(d.CLICK_DATA_API, v.DATA_TOGGLE, function (r) {
                if (r.currentTarget.tagName === "A") {
                    r.preventDefault();
                }
                var n = e(this);
                var i = t.getSelectorFromElement(this);
                var a = [].slice.call(document.querySelectorAll(i));
                e(a).each(function () {
                    var t = e(this);
                    var r = t.data(o);
                    var i = r ? "toggle" : n.data();
                    p._jQueryInterface.call(t, i);
                });
            });
            e.fn[l] = p._jQueryInterface;
            e.fn[l].Constructor = p;
            e.fn[l].noConflict = function () {
                e.fn[l] = c;
                return p._jQueryInterface;
            };
            return p;
        });
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/vendor/bootstrap/js/dist/collapse.map.js

        (function () {
            "use strict";
            BX.addCustomEvent("BX.Landing.Block:init", function (e) {
                var t = e.makeRelativeSelector(".hamburger");
                var i = document.querySelector(t);
                if (i) {
                    BX.bind(i, "click", function (e) {
                        e.preventDefault();
                        i.classList.toggle("is-active");
                    });
                }
            });
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/js/helpers/menu/hamburgers.map.js

        (function () {
            "use strict";
            BX.namespace("BX.Landing");
            BX.Landing.NavbarScrollSpy = function () {
                this.links = {};
                this.targets = [];
                this.onScreen = [];
                this.forceHighlightId = null;
                this.observer = new IntersectionObserver(BX.Landing.NavbarScrollSpy.onIntersection, { threshold: [0.5, 1] });
            };
            BX.Landing.NavbarScrollSpy.CLASS_TO_SET_ACTIVE = "nav-item";
            BX.Landing.NavbarScrollSpy.ACTIVE_CLASS = "active";
            BX.Landing.NavbarScrollSpy.getInstance = function () {
                return this.instance || (this.instance = new BX.Landing.NavbarScrollSpy());
            };
            BX.Landing.NavbarScrollSpy.init = function (n) {
                var i = BX.Landing.NavbarScrollSpy.getInstance();
                i.add(n);
            };
            BX.Landing.NavbarScrollSpy.onIntersection = function (n) {
                var i = BX.Landing.NavbarScrollSpy.getInstance();
                n.forEach(function (n) {
                    i.checkOnScreen(n);
                });
                i.highlight();
            };
            BX.Landing.NavbarScrollSpy.getNodeToHighlight = function (n) {
                var i = BX.findParent(n, { class: BX.Landing.NavbarScrollSpy.CLASS_TO_SET_ACTIVE });
                return i ? i : n;
            };
            BX.Landing.NavbarScrollSpy.prototype = {
                add: function (n) {
                    var i = [].slice.call(n.querySelectorAll("a"));
                    i.forEach(function (n) {
                        if (n.getAttribute("href") !== "#" && n.hash !== "" && n.pathname === document.location.pathname && n.hostname === document.location.hostname) {
                            try {
                                var i = document.querySelector(n.hash);
                            } catch (n) {}
                            if (i) {
                                if (typeof this.links[n.hash] === "undefined") {
                                    this.links[n.hash] = [];
                                }
                                this.links[n.hash].push(n);
                                this.targets.push(i);
                                this.observer.observe(i);
                                n.addEventListener(
                                    "click",
                                    BX.delegate(function (i) {
                                        i.preventDefault();
                                        i.target.blur();
                                        this.forceHighlightId = n.hash;
                                        this.unhighlight();
                                        this.highlightOnce(n.hash);
                                    }, this)
                                );
                            }
                        }
                    }, this);
                },
                checkOnScreen: function (n) {
                    var i = this.onScreen.indexOf(n.target);
                    if (n.isIntersecting && i === -1) {
                        this.onScreen.push(n.target);
                    } else if (!n.isIntersecting && i !== -1) {
                        this.onScreen.splice(i, 1);
                    }
                    if (this.forceHighlightId === "#" + n.target.id && !n.isIntersecting) {
                        this.forceHighlightId = null;
                    }
                },
                highlight: function () {
                    if (this.forceHighlightId !== null) {
                        return;
                    }
                    this.unhighlight();
                    var n;
                    var i;
                    this.onScreen.forEach(function (t) {
                        if (i === undefined) {
                            i = t.offsetTop;
                        }
                        if (t.offsetTop <= i) {
                            i = t.offsetTop;
                            n = "#" + t.id;
                        }
                    }, this);
                    if (typeof n !== "undefined" && typeof this.links[n] !== "undefined" && this.links[n].length > 0) {
                        this.highlightOnce(n);
                    }
                },
                unhighlight: function () {
                    for (var n in this.links) {
                        this.unhighlightOnce(n);
                    }
                },
                highlightOnce: function (n) {
                    this.links[n].forEach(function (n) {
                        BX.Landing.NavbarScrollSpy.getNodeToHighlight(n).classList.add(BX.Landing.NavbarScrollSpy.ACTIVE_CLASS);
                    });
                },
                unhighlightOnce: function (n) {
                    this.links[n].forEach(function (n) {
                        BX.Landing.NavbarScrollSpy.getNodeToHighlight(n).classList.remove(BX.Landing.NavbarScrollSpy.ACTIVE_CLASS);
                    }, this);
                },
            };
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/js/helpers/menu/scrollspy.map.js

        (function () {
            "use strict";
            BX.addCustomEvent(window, "BX.Landing.Block:init", function (i) {
                e(i);
                n(i);
                a(i);
                t(i);
                l(i);
            });
            BX.addCustomEvent("BX.Landing.Block:Node:update", BX.debounce(e, 200));
            BX.addCustomEvent("BX.Landing.Block:Cards:update", function (n) {
                e(n);
            });
            BX.addCustomEvent("BX.Landing.Block:Card:add", function (n) {
                e(n);
            });
            BX.addCustomEvent("BX.Landing.Block:Card:remove", function (n) {
                e(n);
            });
            function e(e) {
                var n = e.makeRelativeSelector(".navbar-nav");
                if (e.block.querySelectorAll(n).length > 0) {
                    s(n);
                    i(n);
                }
            }
            function n(e) {
                if (BX.Landing.getMode() !== "edit") {
                    var n = e.makeRelativeSelector(".js-scroll-nav");
                    var a = e.block.querySelectorAll(n);
                    if (a.length > 0) {
                        [].slice.call(a).forEach(function (e) {
                            BX.Landing.NavbarScrollSpy.init(e);
                        });
                    }
                }
            }
            function a(e) {
                var n = e.block.querySelector(e.makeRelativeSelector(".navbar.u-navbar-modal"));
                if (n && BX.Landing.getMode() === "edit") {
                    BX.adjust(n, { children: [BX.create("div", { props: { className: "g-landing-alert-v3" }, html: BX.message("LANDING_NAVBAR_MODAL_ALERT") })] });
                }
            }
            function t(e) {
                if (BX.Landing.getMode() !== "edit") {
                    var n = e.block.querySelector(".g-menu-multilevel");
                    if (n) {
                        d(n);
                    }
                }
            }
            function l(e) {
                if (BX.Landing.getMode() !== "edit") {
                    var n = e.block.querySelector(".collapse");
                    if (n) {
                        var a = [].slice.call(n.querySelectorAll(".nav-item"));
                        if (!!a && a.length) {
                            a.forEach(function (e) {
                                BX.bind(e, "click", function (e) {
                                    $(e.target).parents(".collapse").collapse("hide");
                                });
                            });
                        }
                    }
                }
            }
            function i(e) {
                if (BX.Landing.getMode() === "edit") {
                    if (!r(e)) {
                        o(document.querySelector(e).querySelector(".nav-item"));
                    }
                } else {
                    c(e);
                }
            }
            function r(e) {
                var n = false;
                var a = landingParams["LANDING_ID"];
                if (a === undefined || a === null) {
                    return false;
                }
                var t = document.querySelector(e);
                var l = [].slice.call(t.querySelectorAll(".nav-link"));
                if (!!l && l.length) {
                    var i = new RegExp("#landing([0-9]+)");
                    l.forEach(function (e) {
                        var t = e.href.match(i);
                        if (t !== null && t[1] === a) {
                            o(BX.findParent(e, { className: "nav-item" }));
                            n = true;
                        }
                    });
                }
                return n;
            }
            function c(e) {
                var n = false;
                var a = document.location;
                var t = document.querySelector(e);
                var l = [].slice.call(t.querySelectorAll(".nav-link"));
                if (!!l && l.length) {
                    l.forEach(function (e) {
                        if (e.hasAttribute("href") && e.getAttribute("href") !== "" && e.getAttribute("href") !== "#" && e.pathname === a.pathname && e.hostname === a.hostname && e.hash === "") {
                            var t = BX.findParent(e, { className: "nav-item" });
                            o(t);
                            n = true;
                        }
                    });
                }
                return n;
            }
            function o(e) {
                e.classList.add("active");
                BX.adjust(e, { children: [BX.create("span", { props: { className: "sr-only" }, text: "(current)" })] });
            }
            function s(e) {
                var n = document.querySelector(e);
                var a = [].slice.call(n.querySelectorAll(".nav-item"));
                if (!!a && a.length) {
                    a.forEach(function (e) {
                        u(e);
                    });
                }
            }
            function u(e) {
                e.classList.remove("active");
                BX.remove(e.querySelector("span.sr-only"));
            }
            function d(e) {
                var n = [].slice.call(e.querySelectorAll(".g-menu-sublevel"));
                n.forEach(function (e) {
                    var n = BX.findPreviousSibling(e, { class: "nav-link" });
                    if (!n) {
                        return;
                    }
                    f(n);
                    if (e.querySelector(".nav-item.active")) {
                        g(n);
                    }
                    BX.addClass(n, "g-menu-sublevel-toggler--parent");
                    BX.adjust(n, {
                        children: [
                            BX.create("span", {
                                props: { className: "g-menu-sublevel-toggler" },
                                html: '<span class="is-hide-text">' + BX.message("LANDING_NAVBAR_TOGGLER_SHOW") + '</span><span class="is-show-text">' + BX.message("LANDING_NAVBAR_TOGGLER_HIDE") + "</span>",
                                events: {
                                    click: function (e) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        v(BX.findParent(e.target, { class: "nav-link" }));
                                    },
                                },
                            }),
                        ],
                    });
                });
            }
            function v(e) {
                if (BX.hasClass(e, "g-menu-sublevel-toggler--parent-hide")) {
                    g(e);
                } else {
                    f(e);
                }
            }
            function f(e) {
                BX.addClass(e, "g-menu-sublevel-toggler--parent-hide");
                var n = BX.findNextSibling(e, { class: "g-menu-sublevel" });
                if (n) {
                    BX.addClass(n, "g-menu-sublevel--hide");
                }
            }
            function g(e) {
                BX.removeClass(e, "g-menu-sublevel-toggler--parent-hide");
                var n = BX.findNextSibling(e, { class: "g-menu-sublevel" });
                if (n) {
                    BX.removeClass(n, "g-menu-sublevel--hide");
                }
            }
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/js/helpers/menu/menu_init.map.js

        (function () {
            "use strict";
            BX.namespace("BX.Landing");
            var e = BX.Landing.Utils.style;
            var n = BX.Landing.Utils.addClass;
            var t = BX.Landing.Utils.removeClass;
            BX.Landing.BlockHeaderEntry = function (e) {
                this.headerNode = e;
                this.wrapperNode = e.parentNode;
                this.fixMomentNodes = this.headerNode.querySelectorAll(BX.Landing.BlockHeaderEntry.FIX_MOMENT_SELECTOR);
                this.hiddenSectionsNodes = this.headerNode.querySelectorAll(BX.Landing.BlockHeaderEntry.SECTION_HIDDEN_SELECTOR);
                this.mode = this.getMode();
                this.prevState = 0;
                var n = document.querySelector(".landing-pub-top-panel-wrapper");
                this.headerOffset = n ? n.offsetHeight : 0;
            };
            BX.Landing.BlockHeaderEntry.HEADER_SELECTOR = ".u-header";
            BX.Landing.BlockHeaderEntry.SECTION_HIDDEN_SELECTOR = ".u-header__section--hidden";
            BX.Landing.BlockHeaderEntry.FIX_MOMENT_SELECTOR = "[data-header-fix-moment-classes], [data-header-fix-moment-exclude]";
            BX.Landing.BlockHeaderEntry.STATE_IN_FLOW = 10;
            BX.Landing.BlockHeaderEntry.STATE_ON_TOP = 20;
            BX.Landing.BlockHeaderEntry.STATE_FIX_MOMENT = 30;
            BX.Landing.BlockHeaderEntry.DIRECTION_TOP_TO_BOTTOM = 1;
            BX.Landing.BlockHeaderEntry.DIRECTION_BOTTOM_TO_TOP = -1;
            BX.Landing.BlockHeaderEntry.THRESHOLD_FULL = 1;
            BX.Landing.BlockHeaderEntry.STICKY_CLASS = "u-header--sticky";
            BX.Landing.BlockHeaderEntry.FLOAT_CLASS = "u-header--float";
            BX.Landing.BlockHeaderEntry.MODE_STICKY = 10;
            BX.Landing.BlockHeaderEntry.MODE_STICKY_RELATIVE = 20;
            BX.Landing.BlockHeaderEntry.MODE_STATIC = 30;
            BX.Landing.BlockHeaderEntry.FIX_MOMENT_CLASSES = ["js-header-fix-moment"];
            BX.Landing.BlockHeaderEntry.FIX_MOMENT_ADD_DATA = "header-fix-moment-classes";
            BX.Landing.BlockHeaderEntry.FIX_MOMENT_REMOVE_DATA = "header-fix-moment-exclude";
            BX.Landing.BlockHeaderEntry.getHeaderNodeByWrapper = function (e) {
                return e.querySelector(BX.Landing.BlockHeaderEntry.HEADER_SELECTOR);
            };
            BX.Landing.BlockHeaderEntry.prototype = {
                getNodeForObserve: function () {
                    return this.wrapperNode;
                },
                getMode: function () {
                    if (BX.hasClass(this.headerNode, BX.Landing.BlockHeaderEntry.STICKY_CLASS)) {
                        if (BX.hasClass(this.headerNode, BX.Landing.BlockHeaderEntry.FLOAT_CLASS)) {
                            return BX.Landing.BlockHeaderEntry.MODE_STICKY;
                        }
                        return BX.Landing.BlockHeaderEntry.MODE_STICKY_RELATIVE;
                    }
                    return BX.Landing.BlockHeaderEntry.MODE_STATIC;
                },
                getCurrentState: function (e) {
                    if (e.isIntersecting) {
                        if (!this.isOnTop(e)) {
                            return BX.Landing.BlockHeaderEntry.STATE_IN_FLOW;
                        } else if (e.intersectionRatio === BX.Landing.BlockHeaderEntry.THRESHOLD_FULL) {
                            return BX.Landing.BlockHeaderEntry.STATE_IN_FLOW;
                        } else if (e.intersectionRatio < BX.Landing.BlockHeaderEntry.THRESHOLD_FULL) {
                            return BX.Landing.BlockHeaderEntry.STATE_ON_TOP;
                        }
                    } else {
                        if (!this.isOnTop(e)) {
                            return BX.Landing.BlockHeaderEntry.STATE_IN_FLOW;
                        } else {
                            return BX.Landing.BlockHeaderEntry.STATE_FIX_MOMENT;
                        }
                    }
                },
                isOnTop: function (e) {
                    return e.boundingClientRect.top <= 0;
                },
                getDirection: function (e) {
                    if (this.prevState === null) {
                        return 0;
                    }
                    if (e > this.prevState) {
                        return BX.Landing.BlockHeaderEntry.DIRECTION_TOP_TO_BOTTOM;
                    }
                    return BX.Landing.BlockHeaderEntry.DIRECTION_BOTTOM_TO_TOP;
                },
                isOverScreen: function (e) {
                    return e.boundingClientRect.height >= e.rootBounds.height;
                },
                setInFlow: function () {
                    if (this.mode === BX.Landing.BlockHeaderEntry.MODE_STICKY) {
                        void e(this.headerNode, { position: "absolute", top: 0, left: 0, right: 0 });
                    } else if (this.mode === BX.Landing.BlockHeaderEntry.MODE_STICKY_RELATIVE) {
                        void e(this.wrapperNode, { height: "auto" });
                        void e(this.headerNode, { position: "relative", top: 0, left: 0, right: 0 });
                    }
                },
                setOnTop: function () {
                    if (this.mode === BX.Landing.BlockHeaderEntry.MODE_STICKY_RELATIVE) {
                        void e(this.wrapperNode, { height: this.wrapperNode.offsetHeight + "px" });
                    }
                    void e(this.headerNode, { position: "fixed", top: this.headerOffset + "px", left: 0, right: 0 });
                },
                setFixMoment: function () {
                    n(this.headerNode, BX.Landing.BlockHeaderEntry.FIX_MOMENT_CLASSES);
                    this.fixMomentNodes.forEach(function (e) {
                        var r = BX.data(e, BX.Landing.BlockHeaderEntry.FIX_MOMENT_ADD_DATA);
                        if (r !== undefined) {
                            n(e, r.split(" "));
                        }
                        var i = BX.data(e, BX.Landing.BlockHeaderEntry.FIX_MOMENT_REMOVE_DATA);
                        if (i !== undefined) {
                            t(e, i.split(" "));
                        }
                    });
                    this.hideSections();
                },
                unsetFixMoment: function () {
                    t(this.headerNode, BX.Landing.BlockHeaderEntry.FIX_MOMENT_CLASSES);
                    this.fixMomentNodes.forEach(function (e) {
                        var r = BX.data(e, BX.Landing.BlockHeaderEntry.FIX_MOMENT_ADD_DATA);
                        if (r !== undefined) {
                            t(e, r.split(" "));
                        }
                        var i = BX.data(e, BX.Landing.BlockHeaderEntry.FIX_MOMENT_REMOVE_DATA);
                        if (i !== undefined) {
                            n(e, i.split(" "));
                        }
                    });
                    this.showSections();
                },
                hideSections: function () {
                    this.hiddenSectionsNodes.forEach(function (e) {
                        e.style.setProperty("height", 0);
                        e.style.setProperty("border", "none", "important");
                        e.style.setProperty("overflow", "hidden");
                        e.style.setProperty("padding", 0, "important");
                    });
                },
                showSections: function () {
                    this.hiddenSectionsNodes.forEach(function (e) {
                        e.style.removeProperty("height");
                        e.style.removeProperty("border");
                        e.style.removeProperty("overflow");
                        e.style.removeProperty("padding");
                    });
                },
            };
            BX.Landing.BlockHeaderEntry.onIntersection = function (e) {
                e.forEach(function (e) {
                    var n = BX.Landing.BlockHeaders.getInstance();
                    var t = n.getEntryByIntersectionTarget(e.target);
                    if (t.mode === BX.Landing.BlockHeaderEntry.MODE_STATIC) {
                        return;
                    }
                    var r = t.getCurrentState(e);
                    if (r !== t.prevState) {
                        if (r === BX.Landing.BlockHeaderEntry.STATE_IN_FLOW) {
                            t.setInFlow();
                        } else if (r === BX.Landing.BlockHeaderEntry.STATE_ON_TOP) {
                            t.setOnTop();
                        } else if (r === BX.Landing.BlockHeaderEntry.STATE_FIX_MOMENT) {
                            if (t.prevState < BX.Landing.BlockHeaderEntry.STATE_ON_TOP) {
                                t.setOnTop();
                            }
                            t.setFixMoment();
                        }
                        var i = t.getDirection(r);
                        if (i < 0 && r < BX.Landing.BlockHeaderEntry.STATE_FIX_MOMENT) {
                            t.unsetFixMoment();
                        }
                        t.prevState = r;
                    } else if (t.isOverScreen(e)) {
                        t.wrapperNode.scrollIntoView({ behavior: "smooth" });
                        t.setOnTop();
                        t.prevState = BX.Landing.BlockHeaderEntry.STATE_ON_TOP;
                    }
                });
            };
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/js/helpers/menu/block-header-entry.map.js

        (function () {
            "use strict";
            BX.namespace("BX.Landing");
            BX.Landing.BlockHeaders = function () {
                this.entries = [];
                this.observer = new IntersectionObserver(BX.Landing.BlockHeaderEntry.onIntersection, this.getObserverOptions());
            };
            BX.Landing.BlockHeaders.prototype = {
                getObserverOptions: function () {
                    return { threshold: [0, 1] };
                },
                add: function (e) {
                    var n = new BX.Landing.BlockHeaderEntry(e);
                    this.entries.push(n);
                    this.observer.observe(n.getNodeForObserve());
                },
                getEntryByIntersectionTarget: function (e) {
                    var n = null;
                    this.entries.forEach(function (t) {
                        if (e === t.getNodeForObserve()) {
                            n = t;
                            return true;
                        }
                    });
                    return n;
                },
                hidePrevEntriess: function () {},
            };
            BX.Landing.BlockHeaders.getInstance = function () {
                return BX.Landing.BlockHeaders.instance || (BX.Landing.BlockHeaders.instance = new BX.Landing.BlockHeaders());
            };
            var e = BX.Landing.BlockHeaders.getInstance();
            var n = BX.Landing.Utils.onCustomEvent;
            n("BX.Landing.Block:init", function (n) {
                var t = n.makeRelativeSelector(".u-header");
                if (BX.Landing.getMode() === "view" && n.block.querySelectorAll(t).length > 0) {
                    e.add(n.block.querySelector(".u-header"));
                }
            });
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/js/helpers/menu/block-header-init.map.js

        (function () {
            "use strict";
            BX.namespace("BX.Landing.MediaPlayer");
            var e = BX.Landing.Utils.getQueryParams;
            BX.Landing.MediaPlayer.BasePlayer = function (s) {
                this.iframe = s;
                this.parameters = e(s.src);
                Object.keys(this.parameters).forEach(function (e) {
                    if (!isNaN(parseFloat(this.parameters[e]))) {
                        this.parameters[e] = parseFloat(this.parameters[e]);
                    }
                }, this);
            };
            BX.Landing.MediaPlayer.BasePlayer.prototype = {
                play: function () {
                    throw new Error("Must be implemented by subclass");
                },
                pause: function () {
                    throw new Error("Must be implemented by subclass");
                },
                stop: function () {
                    throw new Error("Must be implemented by subclass");
                },
                setLoop: function (e) {
                    throw new Error("Must be implemented by subclass");
                },
                seekTo: function (e) {
                    throw new Error("Must be implemented by subclass");
                },
                mute: function () {
                    throw new Error("Must be implemented by subclass");
                },
                unMute: function () {
                    throw new Error("Must be implemented by subclass");
                },
            };
        })();

        (function () {
            "use strict";
            BX.namespace("BX.Landing.MediaPlayer");
            var t = BX.Landing.Utils.addQueryParams;
            var e = BX.Landing.Utils.getQueryParams;
            BX.Landing.MediaPlayer.Youtube = function (e) {
                BX.Landing.MediaPlayer.BasePlayer.apply(this, arguments);
                var i = e.src;
                if (new RegExp("^//").test(i)) {
                    i = i.replace("//", "https://");
                }
                if (new RegExp("^http://").test(i)) {
                    i = i.replace("http://", "https://");
                }
                e.src = t(i, { enablejsapi: 1, origin: window.location.protocol + "//" + window.location.host });
                e.onload = function () {
                    this.player = new YT.Player(e);
                    this.player.addEventListener(
                        "onReady",
                        function () {
                            void (this.parameters.autoplay ? this.play() : this.pause());
                            void (this.parameters.mute ? this.mute() : this.unMute());
                            void (this.parameters.loop ? this.setLoop(true) : this.setLoop(false));
                        }.bind(this)
                    );
                }.bind(this);
            };
            BX.Landing.MediaPlayer.Youtube.prototype = {
                constructor: BX.Landing.MediaPlayer.Youtube,
                __proto__: BX.Landing.MediaPlayer.BasePlayer.prototype,
                play: function () {
                    this.player.playVideo();
                },
                pause: function () {
                    this.player.pauseVideo();
                },
                stop: function () {
                    this.player.stopVideo();
                },
                setLoop: function (t) {
                    this.parameters.loop = t;
                    if (!this.loopInited) {
                        this.loopInited = true;
                        this.player.addEventListener(
                            "onStateChange",
                            function (t) {
                                void (this.parameters.loop && t.data === 0 && this.play());
                            }.bind(this)
                        );
                    }
                },
                seekTo: function (t) {
                    this.player.seekTo(t);
                },
                mute: function () {
                    this.player.mute();
                },
                unMute: function () {
                    this.player.unMute();
                },
            };
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/landing/mediaplayer/youtube_mediaplayer.map.js

        (function () {
            "use strict";
            BX.namespace("BX.Landing.MediaPlayer");
            var a = BX.Landing.Utils.Matchers;
            BX.Landing.MediaPlayer.Factory = function (a) {
                this.player = BX.Landing.MediaPlayer.Factory.create(a);
            };
            BX.Landing.MediaPlayer.Factory.create = function (e) {
                if (a.youtube.test(e.src)) {
                    return new BX.Landing.MediaPlayer.Youtube(e);
                }
            };
        })();

        (function (t, e, n, i) {
            "use strict";
            if (!n) {
                return;
            }
            if (n.fn.fancybox) {
                if ("console" in t) {
                    console.log("fancyBox already initialized");
                }
                return;
            }
            var o = {
                loop: false,
                margin: [44, 0],
                gutter: 50,
                keyboard: true,
                arrows: true,
                infobar: true,
                toolbar: true,
                buttons: ["slideShow", "fullScreen", "thumbs", "share", "close"],
                idleTime: 3,
                smallBtn: "auto",
                protect: false,
                modal: false,
                image: { preload: "auto" },
                ajax: { settings: { data: { fancybox: true } } },
                iframe: {
                    tpl:
                        '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
                    preload: true,
                    css: {},
                    attr: { scrolling: "auto" },
                },
                defaultType: "image",
                animationEffect: "zoom",
                animationDuration: 500,
                zoomOpacity: "auto",
                transitionEffect: "fade",
                transitionDuration: 366,
                slideClass: "",
                baseClass: "",
                baseTpl:
                    '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                    '<div class="fancybox-bg"></div>' +
                    '<div class="fancybox-inner">' +
                    '<div class="fancybox-infobar">' +
                    "<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>" +
                    "</div>" +
                    '<div class="fancybox-toolbar">{{buttons}}</div>' +
                    '<div class="fancybox-navigation">{{arrows}}</div>' +
                    '<div class="fancybox-stage"></div>' +
                    '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
                    "</div>" +
                    "</div>",
                spinnerTpl: '<div class="fancybox-loading"></div>',
                errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>',
                btnTpl: {
                    download:
                        '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}">' +
                        '<svg viewBox="0 0 40 40">' +
                        '<path d="M20,23 L20,8 L20,23 L13,16 L20,23 L27,16 L20,23 M26,28 L13,28 L27,28 L14,28" />' +
                        "</svg>" +
                        "</a>",
                    zoom:
                        '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
                        '<svg viewBox="0 0 40 40">' +
                        '<path d="M 18,17 m-8,0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M25,23 L31,29 L25,23" />' +
                        "</svg>" +
                        "</button>",
                    close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' + '<svg viewBox="0 0 40 40">' + '<path d="M10,10 L30,30 M30,10 L10,30" />' + "</svg>" + "</button>",
                    smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>',
                    arrowLeft:
                        '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
                        '<svg viewBox="0 0 40 40">' +
                        '<path d="M10,20 L30,20 L10,20 L18,28 L10,20 L18,12 L10,20"></path>' +
                        "</svg>" +
                        "</button>",
                    arrowRight:
                        '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
                        '<svg viewBox="0 0 40 40">' +
                        '<path d="M30,20 L10,20 L30,20 L22,28 L30,20 L22,12 L30,20"></path>' +
                        "</svg>" +
                        "</button>",
                },
                parentEl: "body",
                autoFocus: false,
                backFocus: true,
                trapFocus: true,
                fullScreen: { autoStart: false },
                touch: { vertical: true, momentum: true },
                hash: null,
                media: {},
                slideShow: { autoStart: false, speed: 4e3 },
                thumbs: { autoStart: false, hideOnClose: true, parentEl: ".fancybox-container", axis: "y" },
                onInit: n.noop,
                beforeLoad: n.noop,
                afterLoad: n.noop,
                beforeShow: n.noop,
                afterShow: n.noop,
                beforeClose: n.noop,
                afterClose: n.noop,
                onActivate: n.noop,
                onDeactivate: n.noop,
                clickContent: function (t, e) {
                    return t.type === "image" ? "zoom" : false;
                },
                clickSlide: "close",
                clickOutside: "close",
                dblclickContent: false,
                dblclickSlide: false,
                dblclickOutside: false,
                mobile: {
                    margin: 0,
                    clickContent: function (t, e) {
                        return t.type === "image" ? "toggleControls" : false;
                    },
                    clickSlide: function (t, e) {
                        return t.type === "image" ? "toggleControls" : "close";
                    },
                    dblclickContent: function (t, e) {
                        return t.type === "image" ? "zoom" : false;
                    },
                    dblclickSlide: function (t, e) {
                        return t.type === "image" ? "zoom" : false;
                    },
                },
                lang: "en",
                i18n: {
                    en: {
                        CLOSE: "Close",
                        NEXT: "Next",
                        PREV: "Previous",
                        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                        PLAY_START: "Start slideshow",
                        PLAY_STOP: "Pause slideshow",
                        FULL_SCREEN: "Full screen",
                        THUMBS: "Thumbnails",
                        DOWNLOAD: "Download",
                        SHARE: "Share",
                        ZOOM: "Zoom",
                    },
                    de: {
                        CLOSE: "Schliessen",
                        NEXT: "Weiter",
                        PREV: "Zurück",
                        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
                        PLAY_START: "Diaschau starten",
                        PLAY_STOP: "Diaschau beenden",
                        FULL_SCREEN: "Vollbild",
                        THUMBS: "Vorschaubilder",
                        DOWNLOAD: "Herunterladen",
                        SHARE: "Teilen",
                        ZOOM: "Maßstab",
                    },
                },
            };
            var a = n(t);
            var s = n(e);
            var r = 0;
            var l = function (t) {
                return t && t.hasOwnProperty && t instanceof n;
            };
            var c = (function () {
                return (
                    t.requestAnimationFrame ||
                    t.webkitRequestAnimationFrame ||
                    t.mozRequestAnimationFrame ||
                    t.oRequestAnimationFrame ||
                    function (e) {
                        return t.setTimeout(e, 1e3 / 60);
                    }
                );
            })();
            var f = (function () {
                var t,
                    n = e.createElement("fakeelement");
                var o = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" };
                for (t in o) {
                    if (n.style[t] !== i) {
                        return o[t];
                    }
                }
                return "transitionend";
            })();
            var u = function (t) {
                return t && t.length && t[0].offsetHeight;
            };
            var d = function (t, i, o) {
                var a = this;
                a.opts = n.extend(true, { index: o }, n.fancybox.defaults, i || {});
                if (n.fancybox.isMobile) {
                    a.opts = n.extend(true, {}, a.opts, a.opts.mobile);
                }
                if (i && n.isArray(i.buttons)) {
                    a.opts.buttons = i.buttons;
                }
                a.id = a.opts.id || ++r;
                a.group = [];
                a.currIndex = parseInt(a.opts.index, 10) || 0;
                a.prevIndex = null;
                a.prevPos = null;
                a.currPos = 0;
                a.firstRun = null;
                a.createGroup(t);
                if (!a.group.length) {
                    return;
                }
                a.$lastFocus = n(e.activeElement).blur();
                a.slides = {};
                a.init();
            };
            n.extend(d.prototype, {
                init: function () {
                    var o = this,
                        a = o.group[o.currIndex],
                        r = a.opts,
                        l = n.fancybox.scrollbarWidth,
                        c,
                        f,
                        u;
                    o.scrollTop = s.scrollTop();
                    o.scrollLeft = s.scrollLeft();
                    if (!n.fancybox.getInstance()) {
                        n("body").addClass("fancybox-active");
                        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !t.MSStream) {
                            if (a.type !== "image") {
                                n("body")
                                    .css("top", n("body").scrollTop() * -1)
                                    .addClass("fancybox-iosfix");
                            }
                        } else if (!n.fancybox.isMobile && e.body.scrollHeight > t.innerHeight) {
                            if (l === i) {
                                c = n('<div style="width:50px;height:50px;overflow:scroll;" />').appendTo("body");
                                l = n.fancybox.scrollbarWidth = c[0].offsetWidth - c[0].clientWidth;
                                c.remove();
                            }
                            n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' + l + "px; }</style>");
                            n("body").addClass("compensate-for-scrollbar");
                        }
                    }
                    u = "";
                    n.each(r.buttons, function (t, e) {
                        u += r.btnTpl[e] || "";
                    });
                    f = n(o.translate(o, r.baseTpl.replace("{{buttons}}", u).replace("{{arrows}}", r.btnTpl.arrowLeft + r.btnTpl.arrowRight)))
                        .attr("id", "fancybox-container-" + o.id)
                        .addClass("fancybox-is-hidden")
                        .addClass(r.baseClass)
                        .data("FancyBox", o)
                        .appendTo(r.parentEl);
                    o.$refs = { container: f };
                    ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function (t) {
                        o.$refs[t] = f.find(".fancybox-" + t);
                    });
                    o.trigger("onInit");
                    o.activate();
                    o.jumpTo(o.currIndex);
                },
                translate: function (t, e) {
                    var n = t.opts.i18n[t.opts.lang];
                    return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
                        var o = n[e];
                        if (o === i) {
                            return t;
                        }
                        return o;
                    });
                },
                createGroup: function (t) {
                    var e = this;
                    var o = n.makeArray(t);
                    n.each(o, function (t, o) {
                        var a = {},
                            s = {},
                            r,
                            l,
                            c,
                            f;
                        if (n.isPlainObject(o)) {
                            a = o;
                            s = o.opts || o;
                        } else if (n.type(o) === "object" && n(o).length) {
                            r = n(o);
                            s = r.data();
                            s = n.extend({}, s, s.options || {});
                            s.$orig = r;
                            a.src = s.src || r.attr("href");
                            if (!a.type && !a.src) {
                                a.type = "inline";
                                a.src = o;
                            }
                        } else {
                            a = { type: "html", src: o + "" };
                        }
                        a.opts = n.extend(true, {}, e.opts, s);
                        if (n.isArray(s.buttons)) {
                            a.opts.buttons = s.buttons;
                        }
                        l = a.type || a.opts.type;
                        c = a.src || "";
                        if (!l && c) {
                            if (c.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)) {
                                l = "image";
                            } else if (c.match(/\.(pdf)((\?|#).*)?$/i)) {
                                l = "pdf";
                            } else if (c.charAt(0) === "#") {
                                l = "inline";
                            }
                        }
                        if (l) {
                            a.type = l;
                        } else {
                            e.trigger("objectNeedsType", a);
                        }
                        a.index = e.group.length;
                        if (a.opts.$orig && !a.opts.$orig.length) {
                            delete a.opts.$orig;
                        }
                        if (!a.opts.$thumb && a.opts.$orig) {
                            a.opts.$thumb = a.opts.$orig.find("img:first");
                        }
                        if (a.opts.$thumb && !a.opts.$thumb.length) {
                            delete a.opts.$thumb;
                        }
                        if (n.type(a.opts.caption) === "function") {
                            a.opts.caption = a.opts.caption.apply(o, [e, a]);
                        }
                        if (n.type(e.opts.caption) === "function") {
                            a.opts.caption = e.opts.caption.apply(o, [e, a]);
                        }
                        if (!(a.opts.caption instanceof n)) {
                            a.opts.caption = a.opts.caption === i ? "" : a.opts.caption + "";
                        }
                        if (l === "ajax") {
                            f = c.split(/\s+/, 2);
                            if (f.length > 1) {
                                a.src = f.shift();
                                a.opts.filter = f.shift();
                            }
                        }
                        if (a.opts.smallBtn == "auto") {
                            if (n.inArray(l, ["html", "inline", "ajax"]) > -1) {
                                a.opts.toolbar = false;
                                a.opts.smallBtn = true;
                            } else {
                                a.opts.smallBtn = false;
                            }
                        }
                        if (l === "pdf") {
                            a.type = "iframe";
                            a.opts.iframe.preload = false;
                        }
                        if (a.opts.modal) {
                            a.opts = n.extend(true, a.opts, {
                                infobar: 0,
                                toolbar: 0,
                                smallBtn: 0,
                                keyboard: 0,
                                slideShow: 0,
                                fullScreen: 0,
                                thumbs: 0,
                                touch: 0,
                                clickContent: false,
                                clickSlide: false,
                                clickOutside: false,
                                dblclickContent: false,
                                dblclickSlide: false,
                                dblclickOutside: false,
                            });
                        }
                        e.group.push(a);
                    });
                },
                addEvents: function () {
                    var i = this;
                    i.removeEvents();
                    i.$refs.container
                        .on("click.fb-close", "[data-fancybox-close]", function (t) {
                            t.stopPropagation();
                            t.preventDefault();
                            i.close(t);
                        })
                        .on("click.fb-prev touchend.fb-prev", "[data-fancybox-prev]", function (t) {
                            t.stopPropagation();
                            t.preventDefault();
                            i.previous();
                        })
                        .on("click.fb-next touchend.fb-next", "[data-fancybox-next]", function (t) {
                            t.stopPropagation();
                            t.preventDefault();
                            i.next();
                        })
                        .on("click.fb", "[data-fancybox-zoom]", function (t) {
                            i[i.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
                        });
                    a.on("orientationchange.fb resize.fb", function (t) {
                        if (t && t.originalEvent && t.originalEvent.type === "resize") {
                            c(function () {
                                i.update();
                            });
                        } else {
                            i.$refs.stage.hide();
                            setTimeout(function () {
                                i.$refs.stage.show();
                                i.update();
                            }, 600);
                        }
                    });
                    s.on("focusin.fb", function (t) {
                        var o = n.fancybox ? n.fancybox.getInstance() : null;
                        if (o.isClosing || !o.current || !o.current.opts.trapFocus || n(t.target).hasClass("fancybox-container") || n(t.target).is(e)) {
                            return;
                        }
                        if (o && n(t.target).css("position") !== "fixed" && !o.$refs.container.has(t.target).length) {
                            t.stopPropagation();
                            o.focus();
                            a.scrollTop(i.scrollTop).scrollLeft(i.scrollLeft);
                        }
                    });
                    s.on("keydown.fb", function (t) {
                        var e = i.current,
                            o = t.keyCode || t.which;
                        if (!e || !e.opts.keyboard) {
                            return;
                        }
                        if (n(t.target).is("input") || n(t.target).is("textarea")) {
                            return;
                        }
                        if (o === 8 || o === 27) {
                            t.preventDefault();
                            i.close(t);
                            return;
                        }
                        if (o === 37 || o === 38) {
                            t.preventDefault();
                            i.previous();
                            return;
                        }
                        if (o === 39 || o === 40) {
                            t.preventDefault();
                            i.next();
                            return;
                        }
                        i.trigger("afterKeydown", t, o);
                    });
                    if (i.group[i.currIndex].opts.idleTime) {
                        i.idleSecondsCounter = 0;
                        s.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function (t) {
                            i.idleSecondsCounter = 0;
                            if (i.isIdle) {
                                i.showControls();
                            }
                            i.isIdle = false;
                        });
                        i.idleInterval = t.setInterval(function () {
                            i.idleSecondsCounter++;
                            if (i.idleSecondsCounter >= i.group[i.currIndex].opts.idleTime) {
                                i.isIdle = true;
                                i.idleSecondsCounter = 0;
                                i.hideControls();
                            }
                        }, 1e3);
                    }
                },
                removeEvents: function () {
                    var e = this;
                    a.off("orientationchange.fb resize.fb");
                    s.off("focusin.fb keydown.fb .fb-idle");
                    this.$refs.container.off(".fb-close .fb-prev .fb-next");
                    if (e.idleInterval) {
                        t.clearInterval(e.idleInterval);
                        e.idleInterval = null;
                    }
                },
                previous: function (t) {
                    return this.jumpTo(this.currPos - 1, t);
                },
                next: function (t) {
                    return this.jumpTo(this.currPos + 1, t);
                },
                jumpTo: function (t, e, o) {
                    var a = this,
                        s,
                        r,
                        l,
                        c,
                        f,
                        d,
                        p;
                    var h = a.group.length;
                    if (a.isSliding || a.isClosing || (a.isAnimating && a.firstRun)) {
                        return;
                    }
                    t = parseInt(t, 10);
                    r = a.current ? a.current.opts.loop : a.opts.loop;
                    if (!r && (t < 0 || t >= h)) {
                        return false;
                    }
                    s = a.firstRun = a.firstRun === null;
                    if (h < 2 && !s && !!a.isSliding) {
                        return;
                    }
                    c = a.current;
                    a.prevIndex = a.currIndex;
                    a.prevPos = a.currPos;
                    l = a.createSlide(t);
                    if (h > 1) {
                        if (r || l.index > 0) {
                            a.createSlide(t - 1);
                        }
                        if (r || l.index < h - 1) {
                            a.createSlide(t + 1);
                        }
                    }
                    a.current = l;
                    a.currIndex = l.index;
                    a.currPos = l.pos;
                    a.trigger("beforeShow", s);
                    a.updateControls();
                    d = n.fancybox.getTranslate(l.$slide);
                    l.isMoved = (d.left !== 0 || d.top !== 0) && !l.$slide.hasClass("fancybox-animated");
                    l.forcedDuration = i;
                    if (n.isNumeric(e)) {
                        l.forcedDuration = e;
                    } else {
                        e = l.opts[s ? "animationDuration" : "transitionDuration"];
                    }
                    e = parseInt(e, 10);
                    if (s) {
                        if (l.opts.animationEffect && e) {
                            a.$refs.container.css("transition-duration", e + "ms");
                        }
                        a.$refs.container.removeClass("fancybox-is-hidden");
                        u(a.$refs.container);
                        a.$refs.container.addClass("fancybox-is-open");
                        l.$slide.addClass("fancybox-slide--current");
                        a.loadSlide(l);
                        a.preload();
                        return;
                    }
                    n.each(a.slides, function (t, e) {
                        n.fancybox.stop(e.$slide);
                    });
                    l.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current");
                    if (l.isMoved) {
                        f = Math.round(l.$slide.width());
                        n.each(a.slides, function (t, i) {
                            var o = i.pos - l.pos;
                            n.fancybox.animate(i.$slide, { top: 0, left: o * f + o * i.opts.gutter }, e, function () {
                                i.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous");
                                if (i.pos === a.currPos) {
                                    l.isMoved = false;
                                    a.complete();
                                }
                            });
                        });
                    } else {
                        a.$refs.stage.children().removeAttr("style");
                    }
                    if (l.isLoaded) {
                        a.revealContent(l);
                    } else {
                        a.loadSlide(l);
                    }
                    a.preload();
                    if (c.pos === l.pos) {
                        return;
                    }
                    p = "fancybox-slide--" + (c.pos > l.pos ? "next" : "previous");
                    c.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous");
                    c.isComplete = false;
                    if (!e || (!l.isMoved && !l.opts.transitionEffect)) {
                        return;
                    }
                    if (l.isMoved) {
                        c.$slide.addClass(p);
                    } else {
                        p = "fancybox-animated " + p + " fancybox-fx-" + l.opts.transitionEffect;
                        n.fancybox.animate(c.$slide, p, e, function () {
                            c.$slide.removeClass(p).removeAttr("style");
                        });
                    }
                },
                createSlide: function (t) {
                    var e = this;
                    var i;
                    var o;
                    o = t % e.group.length;
                    o = o < 0 ? e.group.length + o : o;
                    if (!e.slides[t] && e.group[o]) {
                        i = n('<div class="fancybox-slide"></div>').appendTo(e.$refs.stage);
                        e.slides[t] = n.extend(true, {}, e.group[o], { pos: t, $slide: i, isLoaded: false });
                        e.updateSlide(e.slides[t]);
                    }
                    return e.slides[t];
                },
                scaleToActual: function (t, e, o) {
                    var a = this;
                    var s = a.current;
                    var r = s.$content;
                    var l, c, f, u, d;
                    var p = parseInt(s.$slide.width(), 10);
                    var h = parseInt(s.$slide.height(), 10);
                    var g = s.width;
                    var b = s.height;
                    if (!(s.type == "image" && !s.hasError) || !r || a.isAnimating) {
                        return;
                    }
                    n.fancybox.stop(r);
                    a.isAnimating = true;
                    t = t === i ? p * 0.5 : t;
                    e = e === i ? h * 0.5 : e;
                    l = n.fancybox.getTranslate(r);
                    u = g / l.width;
                    d = b / l.height;
                    c = p * 0.5 - g * 0.5;
                    f = h * 0.5 - b * 0.5;
                    if (g > p) {
                        c = l.left * u - (t * u - t);
                        if (c > 0) {
                            c = 0;
                        }
                        if (c < p - g) {
                            c = p - g;
                        }
                    }
                    if (b > h) {
                        f = l.top * d - (e * d - e);
                        if (f > 0) {
                            f = 0;
                        }
                        if (f < h - b) {
                            f = h - b;
                        }
                    }
                    a.updateCursor(g, b);
                    n.fancybox.animate(r, { top: f, left: c, scaleX: u, scaleY: d }, o || 330, function () {
                        a.isAnimating = false;
                    });
                    if (a.SlideShow && a.SlideShow.isActive) {
                        a.SlideShow.stop();
                    }
                },
                scaleToFit: function (t) {
                    var e = this;
                    var i = e.current;
                    var o = i.$content;
                    var a;
                    if (!(i.type == "image" && !i.hasError) || !o || e.isAnimating) {
                        return;
                    }
                    n.fancybox.stop(o);
                    e.isAnimating = true;
                    a = e.getFitPos(i);
                    e.updateCursor(a.width, a.height);
                    n.fancybox.animate(o, { top: a.top, left: a.left, scaleX: a.width / o.width(), scaleY: a.height / o.height() }, t || 330, function () {
                        e.isAnimating = false;
                    });
                },
                getFitPos: function (t) {
                    var e = this;
                    var i = t.$content;
                    var o = t.width;
                    var a = t.height;
                    var s = t.opts.margin;
                    var r, l, c, f, u;
                    if (!i || !i.length || (!o && !a)) {
                        return false;
                    }
                    if (n.type(s) === "number") {
                        s = [s, s];
                    }
                    if (s.length == 2) {
                        s = [s[0], s[1], s[0], s[1]];
                    }
                    r = parseInt(e.$refs.stage.width(), 10) - (s[1] + s[3]);
                    l = parseInt(e.$refs.stage.height(), 10) - (s[0] + s[2]);
                    c = Math.min(1, r / o, l / a);
                    f = Math.floor(c * o);
                    u = Math.floor(c * a);
                    return { top: Math.floor((l - u) * 0.5) + s[0], left: Math.floor((r - f) * 0.5) + s[3], width: f, height: u };
                },
                update: function () {
                    var t = this;
                    n.each(t.slides, function (e, n) {
                        t.updateSlide(n);
                    });
                },
                updateSlide: function (t) {
                    var e = this;
                    var i = t.$content;
                    if (i && (t.width || t.height)) {
                        e.isAnimating = false;
                        n.fancybox.stop(i);
                        n.fancybox.setTranslate(i, e.getFitPos(t));
                        if (t.pos === e.currPos) {
                            e.updateCursor();
                        }
                    }
                    t.$slide.trigger("refresh");
                    e.trigger("onUpdate", t);
                },
                updateCursor: function (t, e) {
                    var n = this;
                    var o;
                    var a = n.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");
                    if (!n.current || n.isClosing) {
                        return;
                    }
                    if (n.isZoomable()) {
                        a.addClass("fancybox-is-zoomable");
                        if (t !== i && e !== i) {
                            o = t < n.current.width && e < n.current.height;
                        } else {
                            o = n.isScaledDown();
                        }
                        if (o) {
                            a.addClass("fancybox-can-zoomIn");
                        } else {
                            if (n.current.opts.touch) {
                                a.addClass("fancybox-can-drag");
                            } else {
                                a.addClass("fancybox-can-zoomOut");
                            }
                        }
                    } else if (n.current.opts.touch) {
                        a.addClass("fancybox-can-drag");
                    }
                },
                isZoomable: function () {
                    var t = this;
                    var e = t.current;
                    var i;
                    if (!e || t.isClosing) {
                        return;
                    }
                    if (e.type === "image" && e.isLoaded && !e.hasError && (e.opts.clickContent === "zoom" || (n.isFunction(e.opts.clickContent) && e.opts.clickContent(e) === "zoom"))) {
                        i = t.getFitPos(e);
                        if (e.width > i.width || e.height > i.height) {
                            return true;
                        }
                    }
                    return false;
                },
                isScaledDown: function () {
                    var t = this;
                    var e = t.current;
                    var i = e.$content;
                    var o = false;
                    if (i) {
                        o = n.fancybox.getTranslate(i);
                        o = o.width < e.width || o.height < e.height;
                    }
                    return o;
                },
                canPan: function () {
                    var t = this;
                    var e = t.current;
                    var n = e.$content;
                    var i = false;
                    if (n) {
                        i = t.getFitPos(e);
                        i = Math.abs(n.width() - i.width) > 1 || Math.abs(n.height() - i.height) > 1;
                    }
                    return i;
                },
                loadSlide: function (t) {
                    var e = this,
                        i,
                        o;
                    var a;
                    if (t.isLoading) {
                        return;
                    }
                    if (t.isLoaded) {
                        return;
                    }
                    t.isLoading = true;
                    e.trigger("beforeLoad", t);
                    i = t.type;
                    o = t.$slide;
                    o.off("refresh")
                        .trigger("onReset")
                        .addClass("fancybox-slide--" + (i || "unknown"))
                        .addClass(t.opts.slideClass);
                    switch (i) {
                        case "image":
                            e.setImage(t);
                            break;
                        case "iframe":
                            e.setIframe(t);
                            break;
                        case "html":
                            e.setContent(t, t.src || t.content);
                            break;
                        case "inline":
                            if (n(t.src).length) {
                                e.setContent(t, n(t.src));
                            } else {
                                e.setError(t);
                            }
                            break;
                        case "ajax":
                            e.showLoading(t);
                            a = n.ajax(
                                n.extend({}, t.opts.ajax.settings, {
                                    url: t.src,
                                    success: function (n, i) {
                                        if (i === "success") {
                                            e.setContent(t, n);
                                        }
                                    },
                                    error: function (n, i) {
                                        if (n && i !== "abort") {
                                            e.setError(t);
                                        }
                                    },
                                })
                            );
                            o.one("onReset", function () {
                                a.abort();
                            });
                            break;
                        default:
                            e.setError(t);
                            break;
                    }
                    return true;
                },
                setImage: function (e) {
                    var i = this;
                    var o = e.opts.srcset || e.opts.image.srcset;
                    var a, s, r, l;
                    if (o) {
                        r = t.devicePixelRatio || 1;
                        l = t.innerWidth * r;
                        s = o.split(",").map(function (t) {
                            var e = {};
                            t.trim()
                                .split(/\s+/)
                                .forEach(function (t, n) {
                                    var i = parseInt(t.substring(0, t.length - 1), 10);
                                    if (n === 0) {
                                        return (e.url = t);
                                    }
                                    if (i) {
                                        e.value = i;
                                        e.postfix = t[t.length - 1];
                                    }
                                });
                            return e;
                        });
                        s.sort(function (t, e) {
                            return t.value - e.value;
                        });
                        for (var c = 0; c < s.length; c++) {
                            var f = s[c];
                            if ((f.postfix === "w" && f.value >= l) || (f.postfix === "x" && f.value >= r)) {
                                a = f;
                                break;
                            }
                        }
                        if (!a && s.length) {
                            a = s[s.length - 1];
                        }
                        if (a) {
                            e.src = a.url;
                            if (e.width && e.height && a.postfix == "w") {
                                e.height = (e.width / e.height) * a.value;
                                e.width = a.value;
                            }
                        }
                    }
                    e.$content = n('<div class="fancybox-image-wrap"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide);
                    if (e.opts.preload !== false && e.opts.width && e.opts.height && (e.opts.thumb || e.opts.$thumb)) {
                        e.width = e.opts.width;
                        e.height = e.opts.height;
                        e.$ghost = n("<img />")
                            .one("error", function () {
                                n(this).remove();
                                e.$ghost = null;
                                i.setBigImage(e);
                            })
                            .one("load", function () {
                                i.afterLoad(e);
                                i.setBigImage(e);
                            })
                            .addClass("fancybox-image")
                            .appendTo(e.$content)
                            .attr("src", e.opts.thumb || e.opts.$thumb.attr("src"));
                    } else {
                        i.setBigImage(e);
                    }
                },
                setBigImage: function (t) {
                    var e = this;
                    var i = n("<img />");
                    t.$image = i
                        .one("error", function () {
                            e.setError(t);
                        })
                        .one("load", function () {
                            clearTimeout(t.timouts);
                            t.timouts = null;
                            if (e.isClosing) {
                                return;
                            }
                            t.width = this.naturalWidth;
                            t.height = this.naturalHeight;
                            if (t.opts.image.srcset) {
                                i.attr("sizes", "100vw").attr("srcset", t.opts.image.srcset);
                            }
                            e.hideLoading(t);
                            if (t.$ghost) {
                                t.timouts = setTimeout(function () {
                                    t.timouts = null;
                                    t.$ghost.hide();
                                }, Math.min(300, Math.max(1e3, t.height / 1600)));
                            } else {
                                e.afterLoad(t);
                            }
                        })
                        .addClass("fancybox-image")
                        .attr("src", t.src)
                        .appendTo(t.$content);
                    if ((i[0].complete || i[0].readyState == "complete") && i[0].naturalWidth && i[0].naturalHeight) {
                        i.trigger("load");
                    } else if (i[0].error) {
                        i.trigger("error");
                    } else {
                        t.timouts = setTimeout(function () {
                            if (!i[0].complete && !t.hasError) {
                                e.showLoading(t);
                            }
                        }, 100);
                    }
                },
                setIframe: function (t) {
                    var e = this,
                        o = t.opts.iframe,
                        a = t.$slide,
                        s;
                    t.$content = n('<div class="fancybox-content' + (o.preload ? " fancybox-is-hidden" : "") + '"></div>')
                        .css(o.css)
                        .appendTo(a);
                    s = n(o.tpl.replace(/\{rnd\}/g, new Date().getTime()))
                        .attr(o.attr)
                        .appendTo(t.$content);
                    if (o.preload) {
                        e.showLoading(t);
                        s.on("load.fb error.fb", function (n) {
                            this.isReady = 1;
                            t.$slide.trigger("refresh");
                            e.afterLoad(t);
                        });
                        a.on("refresh.fb", function () {
                            var e = t.$content,
                                n = o.css.width,
                                a = o.css.height,
                                r,
                                l,
                                c;
                            if (s[0].isReady !== 1) {
                                return;
                            }
                            try {
                                l = s.contents();
                                c = l.find("body");
                            } catch (t) {}
                            if (c && c.length) {
                                if (n === i) {
                                    r = s[0].contentWindow.document.documentElement.scrollWidth;
                                    n = Math.ceil(c.outerWidth(true) + (e.width() - r));
                                    n += e.outerWidth() - e.innerWidth();
                                }
                                if (a === i) {
                                    a = Math.ceil(c.outerHeight(true));
                                    a += e.outerHeight() - e.innerHeight();
                                }
                                if (n) {
                                    e.width(n);
                                }
                                if (a) {
                                    e.height(a);
                                }
                            }
                            e.removeClass("fancybox-is-hidden");
                        });
                    } else {
                        this.afterLoad(t);
                    }
                    s.attr("src", t.src);
                    if (t.opts.smallBtn === true) {
                        t.$content.prepend(e.translate(t, t.opts.btnTpl.smallBtn));
                    }
                    a.one("onReset", function () {
                        try {
                            n(this).find("iframe").hide().attr("src", "//about:blank");
                        } catch (t) {}
                        n(this).empty();
                        t.isLoaded = false;
                    });
                },
                setContent: function (t, e) {
                    var i = this;
                    if (i.isClosing) {
                        return;
                    }
                    i.hideLoading(t);
                    t.$slide.empty();
                    if (l(e) && e.parent().length) {
                        e.parent(".fancybox-slide--inline").trigger("onReset");
                        t.$placeholder = n("<div></div>").hide().insertAfter(e);
                        e.css("display", "inline-block");
                    } else if (!t.hasError) {
                        if (n.type(e) === "string") {
                            e = n("<div>").append(n.trim(e)).contents();
                            if (e[0].nodeType === 3) {
                                e = n("<div>").html(e);
                            }
                        }
                        if (t.opts.filter) {
                            e = n("<div>").html(e).find(t.opts.filter);
                        }
                    }
                    t.$slide.one("onReset", function () {
                        if (t.$placeholder) {
                            t.$placeholder.after(e.hide()).remove();
                            t.$placeholder = null;
                        }
                        if (t.$smallBtn) {
                            t.$smallBtn.remove();
                            t.$smallBtn = null;
                        }
                        if (!t.hasError) {
                            n(this).empty();
                            t.isLoaded = false;
                        }
                    });
                    t.$content = n(e).appendTo(t.$slide);
                    this.afterLoad(t);
                },
                setError: function (t) {
                    t.hasError = true;
                    t.$slide.removeClass("fancybox-slide--" + t.type);
                    this.setContent(t, this.translate(t, t.opts.errorTpl));
                },
                showLoading: function (t) {
                    var e = this;
                    t = t || e.current;
                    if (t && !t.$spinner) {
                        t.$spinner = n(e.opts.spinnerTpl).appendTo(t.$slide);
                    }
                },
                hideLoading: function (t) {
                    var e = this;
                    t = t || e.current;
                    if (t && t.$spinner) {
                        t.$spinner.remove();
                        delete t.$spinner;
                    }
                },
                afterLoad: function (t) {
                    var e = this;
                    if (e.isClosing) {
                        return;
                    }
                    t.isLoading = false;
                    t.isLoaded = true;
                    e.trigger("afterLoad", t);
                    e.hideLoading(t);
                    if (t.opts.smallBtn && !t.$smallBtn) {
                        t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content.filter("div,form").first());
                    }
                    if (t.opts.protect && t.$content && !t.hasError) {
                        t.$content.on("contextmenu.fb", function (t) {
                            if (t.button == 2) {
                                t.preventDefault();
                            }
                            return true;
                        });
                        if (t.type === "image") {
                            n('<div class="fancybox-spaceball"></div>').appendTo(t.$content);
                        }
                    }
                    e.revealContent(t);
                },
                revealContent: function (t) {
                    var e = this;
                    var o = t.$slide;
                    var a,
                        s,
                        r,
                        l,
                        c,
                        f = false;
                    a = t.opts[e.firstRun ? "animationEffect" : "transitionEffect"];
                    r = t.opts[e.firstRun ? "animationDuration" : "transitionDuration"];
                    r = parseInt(t.forcedDuration === i ? r : t.forcedDuration, 10);
                    if (t.isMoved || t.pos !== e.currPos || !r) {
                        a = false;
                    }
                    if (a === "zoom" && !(t.pos === e.currPos && r && t.type === "image" && !t.hasError && (f = e.getThumbPos(t)))) {
                        a = "fade";
                    }
                    if (a === "zoom") {
                        c = e.getFitPos(t);
                        c.scaleX = c.width / f.width;
                        c.scaleY = c.height / f.height;
                        delete c.width;
                        delete c.height;
                        l = t.opts.zoomOpacity;
                        if (l == "auto") {
                            l = Math.abs(t.width / t.height - f.width / f.height) > 0.1;
                        }
                        if (l) {
                            f.opacity = 0.1;
                            c.opacity = 1;
                        }
                        n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), f);
                        u(t.$content);
                        n.fancybox.animate(t.$content, c, r, function () {
                            e.complete();
                        });
                        return;
                    }
                    e.updateSlide(t);
                    if (!a) {
                        u(o);
                        t.$content.removeClass("fancybox-is-hidden");
                        if (t.pos === e.currPos) {
                            e.complete();
                        }
                        return;
                    }
                    n.fancybox.stop(o);
                    s = "fancybox-animated fancybox-slide--" + (t.pos >= e.prevPos ? "next" : "previous") + " fancybox-fx-" + a;
                    o.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(s);
                    t.$content.removeClass("fancybox-is-hidden");
                    u(o);
                    n.fancybox.animate(
                        o,
                        "fancybox-slide--current",
                        r,
                        function (n) {
                            o.removeClass(s).removeAttr("style");
                            if (t.pos === e.currPos) {
                                e.complete();
                            }
                        },
                        true
                    );
                },
                getThumbPos: function (i) {
                    var o = this;
                    var a = false;
                    var s = function (e) {
                        var i = e[0];
                        var o = i.getBoundingClientRect();
                        var a = [];
                        var s;
                        while (i.parentElement !== null) {
                            if (n(i.parentElement).css("overflow") === "hidden" || n(i.parentElement).css("overflow") === "auto") {
                                a.push(i.parentElement.getBoundingClientRect());
                            }
                            i = i.parentElement;
                        }
                        s = a.every(function (t) {
                            var e = Math.min(o.right, t.right) - Math.max(o.left, t.left);
                            var n = Math.min(o.bottom, t.bottom) - Math.max(o.top, t.top);
                            return e > 0 && n > 0;
                        });
                        return s && o.bottom > 0 && o.right > 0 && o.left < n(t).width() && o.top < n(t).height();
                    };
                    var r = i.opts.$thumb;
                    var l = r ? r.offset() : 0;
                    var c;
                    if (l && r[0].ownerDocument === e && s(r)) {
                        c = o.$refs.stage.offset();
                        a = { top: l.top - c.top + parseFloat(r.css("border-top-width") || 0), left: l.left - c.left + parseFloat(r.css("border-left-width") || 0), width: r.width(), height: r.height(), scaleX: 1, scaleY: 1 };
                    }
                    return a;
                },
                complete: function () {
                    var t = this;
                    var i = t.current;
                    var o = {};
                    if (i.isMoved || !i.isLoaded || i.isComplete) {
                        return;
                    }
                    i.isComplete = true;
                    i.$slide.siblings().trigger("onReset");
                    u(i.$slide);
                    i.$slide.addClass("fancybox-slide--complete");
                    n.each(t.slides, function (e, i) {
                        if (i.pos >= t.currPos - 1 && i.pos <= t.currPos + 1) {
                            o[i.pos] = i;
                        } else if (i) {
                            n.fancybox.stop(i.$slide);
                            i.$slide.off().remove();
                        }
                    });
                    t.slides = o;
                    t.updateCursor();
                    t.trigger("afterShow");
                    if (n(e.activeElement).is("[disabled]") || (i.opts.autoFocus && !(i.type == "image" || i.type === "iframe"))) {
                        t.focus();
                    }
                },
                preload: function () {
                    var t = this;
                    var e, n;
                    if (t.group.length < 2) {
                        return;
                    }
                    e = t.slides[t.currPos + 1];
                    n = t.slides[t.currPos - 1];
                    if (e && e.type === "image") {
                        t.loadSlide(e);
                    }
                    if (n && n.type === "image") {
                        t.loadSlide(n);
                    }
                },
                focus: function () {
                    var t = this.current;
                    var e;
                    if (this.isClosing) {
                        return;
                    }
                    if (t && t.isComplete) {
                        e = t.$slide.find("input[autofocus]:enabled:visible:first");
                        if (!e.length) {
                            e = t.$slide.find("button,:input,[tabindex],a").filter(":enabled:visible:first");
                        }
                    }
                    e = e && e.length ? e : this.$refs.container;
                    e.focus();
                },
                activate: function () {
                    var t = this;
                    n(".fancybox-container").each(function () {
                        var e = n(this).data("FancyBox");
                        if (e && e.id !== t.id && !e.isClosing) {
                            e.trigger("onDeactivate");
                            e.removeEvents();
                            e.isVisible = false;
                        }
                    });
                    t.isVisible = true;
                    if (t.current || t.isIdle) {
                        t.update();
                        t.updateControls();
                    }
                    t.trigger("onActivate");
                    t.addEvents();
                },
                close: function (t, e) {
                    var i = this;
                    var o = i.current;
                    var a, s;
                    var r, l, d, p;
                    var h = function () {
                        i.cleanUp(t);
                    };
                    if (i.isClosing) {
                        return false;
                    }
                    i.isClosing = true;
                    if (i.trigger("beforeClose", t) === false) {
                        i.isClosing = false;
                        c(function () {
                            i.update();
                        });
                        return false;
                    }
                    i.removeEvents();
                    if (o.timouts) {
                        clearTimeout(o.timouts);
                    }
                    r = o.$content;
                    a = o.opts.animationEffect;
                    s = n.isNumeric(e) ? e : a ? o.opts.animationDuration : 0;
                    o.$slide.off(f).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated");
                    o.$slide.siblings().trigger("onReset").remove();
                    if (s) {
                        i.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing");
                    }
                    i.hideLoading(o);
                    i.hideControls();
                    i.updateCursor();
                    if (a === "zoom" && !(t !== true && r && s && o.type === "image" && !o.hasError && (p = i.getThumbPos(o)))) {
                        a = "fade";
                    }
                    if (a === "zoom") {
                        n.fancybox.stop(r);
                        d = n.fancybox.getTranslate(r);
                        d.width = d.width * d.scaleX;
                        d.height = d.height * d.scaleY;
                        l = o.opts.zoomOpacity;
                        if (l == "auto") {
                            l = Math.abs(o.width / o.height - p.width / p.height) > 0.1;
                        }
                        if (l) {
                            p.opacity = 0;
                        }
                        d.scaleX = d.width / p.width;
                        d.scaleY = d.height / p.height;
                        d.width = p.width;
                        d.height = p.height;
                        n.fancybox.setTranslate(o.$content, d);
                        u(o.$content);
                        n.fancybox.animate(o.$content, p, s, h);
                        return true;
                    }
                    if (a && s) {
                        if (t === true) {
                            setTimeout(h, s);
                        } else {
                            n.fancybox.animate(o.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + a, s, h);
                        }
                    } else {
                        h();
                    }
                    return true;
                },
                cleanUp: function (t) {
                    var i = this,
                        o = n("body"),
                        s,
                        r;
                    i.current.$slide.trigger("onReset");
                    i.$refs.container.empty().remove();
                    i.trigger("afterClose", t);
                    if (i.$lastFocus && !!i.current.opts.backFocus) {
                        i.$lastFocus.focus();
                    }
                    i.current = null;
                    s = n.fancybox.getInstance();
                    if (s) {
                        s.activate();
                    } else {
                        a.scrollTop(i.scrollTop).scrollLeft(i.scrollLeft);
                        o.removeClass("fancybox-active compensate-for-scrollbar");
                        if (o.hasClass("fancybox-iosfix")) {
                            r = parseInt(e.body.style.top, 10);
                            o.removeClass("fancybox-iosfix")
                                .css("top", "")
                                .scrollTop(r * -1);
                        }
                        n("#fancybox-style-noscroll").remove();
                    }
                },
                trigger: function (t, e) {
                    var i = Array.prototype.slice.call(arguments, 1),
                        o = this,
                        a = e && e.opts ? e : o.current,
                        r;
                    if (a) {
                        i.unshift(a);
                    } else {
                        a = o;
                    }
                    i.unshift(o);
                    if (n.isFunction(a.opts[t])) {
                        r = a.opts[t].apply(a, i);
                    }
                    if (r === false) {
                        return r;
                    }
                    if (t === "afterClose" || !o.$refs) {
                        s.trigger(t + ".fb", i);
                    } else {
                        o.$refs.container.trigger(t + ".fb", i);
                    }
                },
                updateControls: function (t) {
                    var e = this;
                    var n = e.current,
                        i = n.index,
                        o = n.opts.caption,
                        a = e.$refs.container,
                        s = e.$refs.caption;
                    n.$slide.trigger("refresh");
                    e.$caption = o && o.length ? s.html(o) : null;
                    if (!e.isHiddenControls && !e.isIdle) {
                        e.showControls();
                    }
                    a.find("[data-fancybox-count]").html(e.group.length);
                    a.find("[data-fancybox-index]").html(i + 1);
                    a.find("[data-fancybox-prev]").prop("disabled", !n.opts.loop && i <= 0);
                    a.find("[data-fancybox-next]").prop("disabled", !n.opts.loop && i >= e.group.length - 1);
                    if (n.type === "image") {
                        a.find("[data-fancybox-download]")
                            .attr("href", n.opts.image.src || n.src)
                            .show();
                    } else {
                        a.find("[data-fancybox-download],[data-fancybox-zoom]").hide();
                    }
                },
                hideControls: function () {
                    this.isHiddenControls = true;
                    this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav");
                },
                showControls: function () {
                    var t = this;
                    var e = t.current ? t.current.opts : t.opts;
                    var n = t.$refs.container;
                    t.isHiddenControls = false;
                    t.idleSecondsCounter = 0;
                    n.toggleClass("fancybox-show-toolbar", !!(e.toolbar && e.buttons))
                        .toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1))
                        .toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1))
                        .toggleClass("fancybox-is-modal", !!e.modal);
                    if (t.$caption) {
                        n.addClass("fancybox-show-caption ");
                    } else {
                        n.removeClass("fancybox-show-caption");
                    }
                },
                toggleControls: function () {
                    if (this.isHiddenControls) {
                        this.showControls();
                    } else {
                        this.hideControls();
                    }
                },
            });
            n.fancybox = {
                version: "3.2.5",
                defaults: o,
                getInstance: function (t) {
                    var e = n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox");
                    var i = Array.prototype.slice.call(arguments, 1);
                    if (e instanceof d) {
                        if (n.type(t) === "string") {
                            e[t].apply(e, i);
                        } else if (n.type(t) === "function") {
                            t.apply(e, i);
                        }
                        return e;
                    }
                    return false;
                },
                open: function (t, e, n) {
                    return new d(t, e, n);
                },
                close: function (t) {
                    var e = this.getInstance();
                    if (e) {
                        e.close();
                        if (t === true) {
                            this.close();
                        }
                    }
                },
                destroy: function () {
                    this.close(true);
                    s.off("click.fb-start");
                },
                isMobile: e.createTouch !== i && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                use3d: (function () {
                    var n = e.createElement("div");
                    return t.getComputedStyle && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11);
                })(),
                getTranslate: function (t) {
                    var e;
                    if (!t || !t.length) {
                        return false;
                    }
                    e = t.eq(0).css("transform");
                    if (e && e.indexOf("matrix") !== -1) {
                        e = e.split("(")[1];
                        e = e.split(")")[0];
                        e = e.split(",");
                    } else {
                        e = [];
                    }
                    if (e.length) {
                        if (e.length > 10) {
                            e = [e[13], e[12], e[0], e[5]];
                        } else {
                            e = [e[5], e[4], e[0], e[3]];
                        }
                        e = e.map(parseFloat);
                    } else {
                        e = [0, 0, 1, 1];
                        var n = /\.*translate\((.*)px,(.*)px\)/i;
                        var i = n.exec(t.eq(0).attr("style"));
                        if (i) {
                            e[0] = parseFloat(i[2]);
                            e[1] = parseFloat(i[1]);
                        }
                    }
                    return { top: e[0], left: e[1], scaleX: e[2], scaleY: e[3], opacity: parseFloat(t.css("opacity")), width: t.width(), height: t.height() };
                },
                setTranslate: function (t, e) {
                    var n = "";
                    var o = {};
                    if (!t || !e) {
                        return;
                    }
                    if (e.left !== i || e.top !== i) {
                        n = (e.left === i ? t.position().left : e.left) + "px, " + (e.top === i ? t.position().top : e.top) + "px";
                        if (this.use3d) {
                            n = "translate3d(" + n + ", 0px)";
                        } else {
                            n = "translate(" + n + ")";
                        }
                    }
                    if (e.scaleX !== i && e.scaleY !== i) {
                        n = (n.length ? n + " " : "") + "scale(" + e.scaleX + ", " + e.scaleY + ")";
                    }
                    if (n.length) {
                        o.transform = n;
                    }
                    if (e.opacity !== i) {
                        o.opacity = e.opacity;
                    }
                    if (e.width !== i) {
                        o.width = e.width;
                    }
                    if (e.height !== i) {
                        o.height = e.height;
                    }
                    return t.css(o);
                },
                animate: function (t, e, o, a, s) {
                    if (n.isFunction(o)) {
                        a = o;
                        o = null;
                    }
                    if (!n.isPlainObject(e)) {
                        t.removeAttr("style");
                    }
                    t.on(f, function (o) {
                        if (o && o.originalEvent && (!t.is(o.originalEvent.target) || o.originalEvent.propertyName == "z-index")) {
                            return;
                        }
                        n.fancybox.stop(t);
                        if (n.isPlainObject(e)) {
                            if (e.scaleX !== i && e.scaleY !== i) {
                                t.css("transition-duration", "");
                                e.width = Math.round(t.width() * e.scaleX);
                                e.height = Math.round(t.height() * e.scaleY);
                                e.scaleX = 1;
                                e.scaleY = 1;
                                n.fancybox.setTranslate(t, e);
                            }
                        } else if (s !== true) {
                            t.removeClass(e);
                        }
                        if (n.isFunction(a)) {
                            a(o);
                        }
                    });
                    if (n.isNumeric(o)) {
                        t.css("transition-duration", o + "ms");
                    }
                    if (n.isPlainObject(e)) {
                        n.fancybox.setTranslate(t, e);
                    } else {
                        t.addClass(e);
                    }
                    if (e.scaleX && t.hasClass("fancybox-image-wrap")) {
                        t.parent().addClass("fancybox-is-scaling");
                    }
                    t.data(
                        "timer",
                        setTimeout(function () {
                            t.trigger("transitionend");
                        }, o + 16)
                    );
                },
                stop: function (t) {
                    clearTimeout(t.data("timer"));
                    t.off("transitionend").css("transition-duration", "");
                    if (t.hasClass("fancybox-image-wrap")) {
                        t.parent().removeClass("fancybox-is-scaling");
                    }
                },
            };
            function p(t) {
                var e = n(t.currentTarget),
                    i = t.data ? t.data.options : {},
                    o = e.attr("data-fancybox") || "",
                    a = 0,
                    s = [];
                if (t.isDefaultPrevented()) {
                    return;
                }
                t.preventDefault();
                if (o) {
                    s = i.selector ? n(i.selector) : t.data ? t.data.items : [];
                    s = s.length ? s.filter('[data-fancybox="' + o + '"]') : n('[data-fancybox="' + o + '"]');
                    a = s.index(e);
                    if (a < 0) {
                        a = 0;
                    }
                } else {
                    s = [e];
                }
                n.fancybox.open(s, i, a);
            }
            n.fn.fancybox = function (t) {
                var e;
                t = t || {};
                e = t.selector || false;
                if (e) {
                    n("body").off("click.fb-start", e).on("click.fb-start", e, { options: t }, p);
                } else {
                    this.off("click.fb-start").on("click.fb-start", { items: this, options: t }, p);
                }
                return this;
            };
            s.on("click.fb-start", "[data-fancybox]", p);
        })(window, document, window.jQuery || jQuery);
        (function (t) {
            "use strict";
            var e = function (e, n, i) {
                if (!e) {
                    return;
                }
                i = i || "";
                if (t.type(i) === "object") {
                    i = t.param(i, true);
                }
                t.each(n, function (t, n) {
                    e = e.replace("$" + t, n || "");
                });
                if (i.length) {
                    e += (e.indexOf("?") > 0 ? "&" : "?") + i;
                }
                return e;
            };
            var n = {
                youtube: {
                    matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
                    params: { autoplay: 1, autohide: 1, fs: 1, rel: 0, hd: 1, wmode: "transparent", enablejsapi: 1, html5: 1 },
                    paramPlace: 8,
                    type: "iframe",
                    url: "//www.youtube.com/embed/$4",
                    thumb: "//img.youtube.com/vi/$4/hqdefault.jpg",
                },
                vimeo: {
                    matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
                    params: { autoplay: 1, hd: 1, show_title: 1, show_byline: 1, show_portrait: 0, fullscreen: 1, api: 1 },
                    paramPlace: 3,
                    type: "iframe",
                    url: "//player.vimeo.com/video/$2",
                },
                metacafe: { matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/, type: "iframe", url: "//www.metacafe.com/embed/$1/?ap=1" },
                dailymotion: { matcher: /dailymotion.com\/video\/(.*)\/?(.*)/, params: { additionalInfos: 0, autoStart: 1 }, type: "iframe", url: "//www.dailymotion.com/embed/video/$1" },
                vine: { matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/, type: "iframe", url: "//vine.co/v/$1/embed/simple" },
                instagram: { matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i, type: "image", url: "//$1/p/$2/media/?size=l" },
                gmap_place: {
                    matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
                    type: "iframe",
                    url: function (t) {
                        return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12]) + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed");
                    },
                },
                gmap_search: {
                    matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
                    type: "iframe",
                    url: function (t) {
                        return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed";
                    },
                },
            };
            t(document).on("objectNeedsType.fb", function (i, o, a) {
                var s = a.src || "",
                    r = false,
                    l,
                    c,
                    f,
                    u,
                    d,
                    p,
                    h;
                l = t.extend(true, {}, n, a.opts.media);
                t.each(l, function (n, i) {
                    f = s.match(i.matcher);
                    if (!f) {
                        return;
                    }
                    r = i.type;
                    p = {};
                    if (i.paramPlace && f[i.paramPlace]) {
                        d = f[i.paramPlace];
                        if (d[0] == "?") {
                            d = d.substring(1);
                        }
                        d = d.split("&");
                        for (var o = 0; o < d.length; ++o) {
                            var l = d[o].split("=", 2);
                            if (l.length == 2) {
                                p[l[0]] = decodeURIComponent(l[1].replace(/\+/g, " "));
                            }
                        }
                    }
                    u = t.extend(true, {}, i.params, a.opts[n], p);
                    s = t.type(i.url) === "function" ? i.url.call(this, f, u, a) : e(i.url, f, u);
                    c = t.type(i.thumb) === "function" ? i.thumb.call(this, f, u, a) : e(i.thumb, f);
                    if (n === "vimeo") {
                        s = s.replace("&%23", "#");
                    }
                    return false;
                });
                if (r) {
                    a.src = s;
                    a.type = r;
                    if (!a.opts.thumb && !(a.opts.$thumb && a.opts.$thumb.length)) {
                        a.opts.thumb = c;
                    }
                    if (r === "iframe") {
                        t.extend(true, a.opts, { iframe: { preload: false, attr: { scrolling: "no" } } });
                        a.contentProvider = h;
                        a.opts.slideClass += " fancybox-slide--" + (h == "gmap_place" || h == "gmap_search" ? "map" : "video");
                    }
                } else if (s) {
                    a.type = a.opts.defaultType;
                }
            });
        })(window.jQuery || jQuery);
        (function (t, e, n) {
            "use strict";
            var i = (function () {
                return (
                    t.requestAnimationFrame ||
                    t.webkitRequestAnimationFrame ||
                    t.mozRequestAnimationFrame ||
                    t.oRequestAnimationFrame ||
                    function (e) {
                        return t.setTimeout(e, 1e3 / 60);
                    }
                );
            })();
            var o = (function () {
                return (
                    t.cancelAnimationFrame ||
                    t.webkitCancelAnimationFrame ||
                    t.mozCancelAnimationFrame ||
                    t.oCancelAnimationFrame ||
                    function (e) {
                        t.clearTimeout(e);
                    }
                );
            })();
            var a = function (e) {
                var n = [];
                e = e.originalEvent || e || t.e;
                e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
                for (var i in e) {
                    if (e[i].pageX) {
                        n.push({ x: e[i].pageX, y: e[i].pageY });
                    } else if (e[i].clientX) {
                        n.push({ x: e[i].clientX, y: e[i].clientY });
                    }
                }
                return n;
            };
            var s = function (t, e, n) {
                if (!e || !t) {
                    return 0;
                }
                if (n === "x") {
                    return t.x - e.x;
                } else if (n === "y") {
                    return t.y - e.y;
                }
                return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
            };
            var r = function (t) {
                if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea') || n.isFunction(t.get(0).onclick) || t.data("selectable")) {
                    return true;
                }
                for (var e = 0, i = t[0].attributes, o = i.length; e < o; e++) {
                    if (i[e].nodeName.substr(0, 14) === "data-fancybox-") {
                        return true;
                    }
                }
                return false;
            };
            var l = function (e) {
                var n = t.getComputedStyle(e)["overflow-y"];
                var i = t.getComputedStyle(e)["overflow-x"];
                var o = (n === "scroll" || n === "auto") && e.scrollHeight > e.clientHeight;
                var a = (i === "scroll" || i === "auto") && e.scrollWidth > e.clientWidth;
                return o || a;
            };
            var c = function (t) {
                var e = false;
                while (true) {
                    e = l(t.get(0));
                    if (e) {
                        break;
                    }
                    t = t.parent();
                    if (!t.length || t.hasClass("fancybox-stage") || t.is("body")) {
                        break;
                    }
                }
                return e;
            };
            var f = function (t) {
                var e = this;
                e.instance = t;
                e.$bg = t.$refs.bg;
                e.$stage = t.$refs.stage;
                e.$container = t.$refs.container;
                e.destroy();
                e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"));
            };
            f.prototype.destroy = function () {
                this.$container.off(".fb.touch");
            };
            f.prototype.ontouchstart = function (i) {
                var o = this;
                var l = n(i.target);
                var f = o.instance;
                var u = f.current;
                var d = u.$content;
                var p = i.type == "touchstart";
                if (p) {
                    o.$container.off("mousedown.fb.touch");
                }
                if (!u || o.instance.isAnimating || o.instance.isClosing) {
                    i.stopPropagation();
                    i.preventDefault();
                    return;
                }
                if (i.originalEvent && i.originalEvent.button == 2) {
                    return;
                }
                if (!l.length || r(l) || r(l.parent())) {
                    return;
                }
                if (i.originalEvent.clientX > l[0].clientWidth + l.offset().left) {
                    return;
                }
                o.startPoints = a(i);
                if (!o.startPoints || (o.startPoints.length > 1 && f.isSliding)) {
                    return;
                }
                o.$target = l;
                o.$content = d;
                o.canTap = true;
                o.opts = u.opts.touch;
                n(e).off(".fb.touch");
                n(e).on(p ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(o, "ontouchend"));
                n(e).on(p ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(o, "ontouchmove"));
                if (!(o.opts || f.canPan()) || !(l.is(o.$stage) || o.$stage.find(l).length)) {
                    if (l.is("img")) {
                        i.preventDefault();
                    }
                    return;
                }
                i.stopPropagation();
                if (!(n.fancybox.isMobile && (c(o.$target) || c(o.$target.parent())))) {
                    i.preventDefault();
                }
                o.canvasWidth = Math.round(u.$slide[0].clientWidth);
                o.canvasHeight = Math.round(u.$slide[0].clientHeight);
                o.startTime = new Date().getTime();
                o.distanceX = o.distanceY = o.distance = 0;
                o.isPanning = false;
                o.isSwiping = false;
                o.isZooming = false;
                o.sliderStartPos = o.sliderLastPos || { top: 0, left: 0 };
                o.contentStartPos = n.fancybox.getTranslate(o.$content);
                o.contentLastPos = null;
                if (o.startPoints.length === 1 && !o.isZooming) {
                    o.canTap = !f.isSliding;
                    if (u.type === "image" && (o.contentStartPos.width > o.canvasWidth + 1 || o.contentStartPos.height > o.canvasHeight + 1)) {
                        n.fancybox.stop(o.$content);
                        o.$content.css("transition-duration", "0ms");
                        o.isPanning = true;
                    } else {
                        o.isSwiping = true;
                    }
                    o.$container.addClass("fancybox-controls--isGrabbing");
                }
                if (o.startPoints.length === 2 && !f.isAnimating && !u.hasError && u.type === "image" && (u.isLoaded || u.$ghost)) {
                    o.isZooming = true;
                    o.isSwiping = false;
                    o.isPanning = false;
                    n.fancybox.stop(o.$content);
                    o.$content.css("transition-duration", "0ms");
                    o.centerPointStartX = (o.startPoints[0].x + o.startPoints[1].x) * 0.5 - n(t).scrollLeft();
                    o.centerPointStartY = (o.startPoints[0].y + o.startPoints[1].y) * 0.5 - n(t).scrollTop();
                    o.percentageOfImageAtPinchPointX = (o.centerPointStartX - o.contentStartPos.left) / o.contentStartPos.width;
                    o.percentageOfImageAtPinchPointY = (o.centerPointStartY - o.contentStartPos.top) / o.contentStartPos.height;
                    o.startDistanceBetweenFingers = s(o.startPoints[0], o.startPoints[1]);
                }
            };
            f.prototype.ontouchmove = function (t) {
                var e = this;
                e.newPoints = a(t);
                if (n.fancybox.isMobile && (c(e.$target) || c(e.$target.parent()))) {
                    t.stopPropagation();
                    e.canTap = false;
                    return;
                }
                if (!(e.opts || e.instance.canPan()) || !e.newPoints || !e.newPoints.length) {
                    return;
                }
                e.distanceX = s(e.newPoints[0], e.startPoints[0], "x");
                e.distanceY = s(e.newPoints[0], e.startPoints[0], "y");
                e.distance = s(e.newPoints[0], e.startPoints[0]);
                if (e.distance > 0) {
                    if (!(e.$target.is(e.$stage) || e.$stage.find(e.$target).length)) {
                        return;
                    }
                    t.stopPropagation();
                    t.preventDefault();
                    if (e.isSwiping) {
                        e.onSwipe();
                    } else if (e.isPanning) {
                        e.onPan();
                    } else if (e.isZooming) {
                        e.onZoom();
                    }
                }
            };
            f.prototype.onSwipe = function () {
                var e = this;
                var a = e.isSwiping;
                var s = e.sliderStartPos.left || 0;
                var r;
                if (a === true) {
                    if (Math.abs(e.distance) > 10) {
                        e.canTap = false;
                        if (e.instance.group.length < 2 && e.opts.vertical) {
                            e.isSwiping = "y";
                        } else if (e.instance.isSliding || e.opts.vertical === false || (e.opts.vertical === "auto" && n(t).width() > 800)) {
                            e.isSwiping = "x";
                        } else {
                            r = Math.abs((Math.atan2(e.distanceY, e.distanceX) * 180) / Math.PI);
                            e.isSwiping = r > 45 && r < 135 ? "y" : "x";
                        }
                        e.instance.isSliding = e.isSwiping;
                        e.startPoints = e.newPoints;
                        n.each(e.instance.slides, function (t, i) {
                            n.fancybox.stop(i.$slide);
                            i.$slide.css("transition-duration", "0ms");
                            i.inTransition = false;
                            if (i.pos === e.instance.current.pos) {
                                e.sliderStartPos.left = n.fancybox.getTranslate(i.$slide).left;
                            }
                        });
                        if (e.instance.SlideShow && e.instance.SlideShow.isActive) {
                            e.instance.SlideShow.stop();
                        }
                    }
                } else {
                    if (a == "x") {
                        if (e.distanceX > 0 && (e.instance.group.length < 2 || (e.instance.current.index === 0 && !e.instance.current.opts.loop))) {
                            s = s + Math.pow(e.distanceX, 0.8);
                        } else if (e.distanceX < 0 && (e.instance.group.length < 2 || (e.instance.current.index === e.instance.group.length - 1 && !e.instance.current.opts.loop))) {
                            s = s - Math.pow(-e.distanceX, 0.8);
                        } else {
                            s = s + e.distanceX;
                        }
                    }
                    e.sliderLastPos = { top: a == "x" ? 0 : e.sliderStartPos.top + e.distanceY, left: s };
                    if (e.requestId) {
                        o(e.requestId);
                        e.requestId = null;
                    }
                    e.requestId = i(function () {
                        if (e.sliderLastPos) {
                            n.each(e.instance.slides, function (t, i) {
                                var o = i.pos - e.instance.currPos;
                                n.fancybox.setTranslate(i.$slide, { top: e.sliderLastPos.top, left: e.sliderLastPos.left + o * e.canvasWidth + o * i.opts.gutter });
                            });
                            e.$container.addClass("fancybox-is-sliding");
                        }
                    });
                }
            };
            f.prototype.onPan = function () {
                var t = this;
                var e, a, s;
                t.canTap = false;
                if (t.contentStartPos.width > t.canvasWidth) {
                    e = t.contentStartPos.left + t.distanceX;
                } else {
                    e = t.contentStartPos.left;
                }
                a = t.contentStartPos.top + t.distanceY;
                s = t.limitMovement(e, a, t.contentStartPos.width, t.contentStartPos.height);
                s.scaleX = t.contentStartPos.scaleX;
                s.scaleY = t.contentStartPos.scaleY;
                t.contentLastPos = s;
                if (t.requestId) {
                    o(t.requestId);
                    t.requestId = null;
                }
                t.requestId = i(function () {
                    n.fancybox.setTranslate(t.$content, t.contentLastPos);
                });
            };
            f.prototype.limitMovement = function (t, e, n, i) {
                var o = this;
                var a, s, r, l;
                var c = o.canvasWidth;
                var f = o.canvasHeight;
                var u = o.contentStartPos.left;
                var d = o.contentStartPos.top;
                var p = o.distanceX;
                var h = o.distanceY;
                a = Math.max(0, c * 0.5 - n * 0.5);
                s = Math.max(0, f * 0.5 - i * 0.5);
                r = Math.min(c - n, c * 0.5 - n * 0.5);
                l = Math.min(f - i, f * 0.5 - i * 0.5);
                if (n > c) {
                    if (p > 0 && t > a) {
                        t = a - 1 + Math.pow(-a + u + p, 0.8) || 0;
                    }
                    if (p < 0 && t < r) {
                        t = r + 1 - Math.pow(r - u - p, 0.8) || 0;
                    }
                }
                if (i > f) {
                    if (h > 0 && e > s) {
                        e = s - 1 + Math.pow(-s + d + h, 0.8) || 0;
                    }
                    if (h < 0 && e < l) {
                        e = l + 1 - Math.pow(l - d - h, 0.8) || 0;
                    }
                }
                return { top: e, left: t };
            };
            f.prototype.limitPosition = function (t, e, n, i) {
                var o = this;
                var a = o.canvasWidth;
                var s = o.canvasHeight;
                if (n > a) {
                    t = t > 0 ? 0 : t;
                    t = t < a - n ? a - n : t;
                } else {
                    t = Math.max(0, a / 2 - n / 2);
                }
                if (i > s) {
                    e = e > 0 ? 0 : e;
                    e = e < s - i ? s - i : e;
                } else {
                    e = Math.max(0, s / 2 - i / 2);
                }
                return { top: e, left: t };
            };
            f.prototype.onZoom = function () {
                var e = this;
                var a = e.contentStartPos.width;
                var r = e.contentStartPos.height;
                var l = e.contentStartPos.left;
                var c = e.contentStartPos.top;
                var f = s(e.newPoints[0], e.newPoints[1]);
                var u = f / e.startDistanceBetweenFingers;
                var d = Math.floor(a * u);
                var p = Math.floor(r * u);
                var h = (a - d) * e.percentageOfImageAtPinchPointX;
                var g = (r - p) * e.percentageOfImageAtPinchPointY;
                var b = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft();
                var v = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop();
                var m = b - e.centerPointStartX;
                var y = v - e.centerPointStartY;
                var x = l + (h + m);
                var w = c + (g + y);
                var $ = { top: w, left: x, scaleX: e.contentStartPos.scaleX * u, scaleY: e.contentStartPos.scaleY * u };
                e.canTap = false;
                e.newWidth = d;
                e.newHeight = p;
                e.contentLastPos = $;
                if (e.requestId) {
                    o(e.requestId);
                    e.requestId = null;
                }
                e.requestId = i(function () {
                    n.fancybox.setTranslate(e.$content, e.contentLastPos);
                });
            };
            f.prototype.ontouchend = function (t) {
                var i = this;
                var s = Math.max(new Date().getTime() - i.startTime, 1);
                var r = i.isSwiping;
                var l = i.isPanning;
                var c = i.isZooming;
                i.endPoints = a(t);
                i.$container.removeClass("fancybox-controls--isGrabbing");
                n(e).off(".fb.touch");
                if (i.requestId) {
                    o(i.requestId);
                    i.requestId = null;
                }
                i.isSwiping = false;
                i.isPanning = false;
                i.isZooming = false;
                if (i.canTap) {
                    return i.onTap(t);
                }
                i.speed = 366;
                i.velocityX = (i.distanceX / s) * 0.5;
                i.velocityY = (i.distanceY / s) * 0.5;
                i.speedX = Math.max(i.speed * 0.5, Math.min(i.speed * 1.5, (1 / Math.abs(i.velocityX)) * i.speed));
                if (l) {
                    i.endPanning();
                } else if (c) {
                    i.endZooming();
                } else {
                    i.endSwiping(r);
                }
                return;
            };
            f.prototype.endSwiping = function (t) {
                var e = this;
                var i = false;
                e.instance.isSliding = false;
                e.sliderLastPos = null;
                if (t == "y" && Math.abs(e.distanceY) > 50) {
                    n.fancybox.animate(e.instance.current.$slide, { top: e.sliderStartPos.top + e.distanceY + e.velocityY * 150, opacity: 0 }, 150);
                    i = e.instance.close(true, 300);
                } else if (t == "x" && e.distanceX > 50 && e.instance.group.length > 1) {
                    i = e.instance.previous(e.speedX);
                } else if (t == "x" && e.distanceX < -50 && e.instance.group.length > 1) {
                    i = e.instance.next(e.speedX);
                }
                if (i === false && (t == "x" || t == "y")) {
                    e.instance.jumpTo(e.instance.current.index, 150);
                }
                e.$container.removeClass("fancybox-is-sliding");
            };
            f.prototype.endPanning = function () {
                var t = this;
                var e, i, o;
                if (!t.contentLastPos) {
                    return;
                }
                if (t.opts.momentum === false) {
                    e = t.contentLastPos.left;
                    i = t.contentLastPos.top;
                } else {
                    e = t.contentLastPos.left + t.velocityX * t.speed;
                    i = t.contentLastPos.top + t.velocityY * t.speed;
                }
                o = t.limitPosition(e, i, t.contentStartPos.width, t.contentStartPos.height);
                o.width = t.contentStartPos.width;
                o.height = t.contentStartPos.height;
                n.fancybox.animate(t.$content, o, 330);
            };
            f.prototype.endZooming = function () {
                var t = this;
                var e = t.instance.current;
                var i, o, a, s;
                var r = t.newWidth;
                var l = t.newHeight;
                if (!t.contentLastPos) {
                    return;
                }
                i = t.contentLastPos.left;
                o = t.contentLastPos.top;
                s = { top: o, left: i, width: r, height: l, scaleX: 1, scaleY: 1 };
                n.fancybox.setTranslate(t.$content, s);
                if (r < t.canvasWidth && l < t.canvasHeight) {
                    t.instance.scaleToFit(150);
                } else if (r > e.width || l > e.height) {
                    t.instance.scaleToActual(t.centerPointStartX, t.centerPointStartY, 150);
                } else {
                    a = t.limitPosition(i, o, r, l);
                    n.fancybox.setTranslate(t.content, n.fancybox.getTranslate(t.$content));
                    n.fancybox.animate(t.$content, a, 150);
                }
            };
            f.prototype.onTap = function (t) {
                var e = this;
                var i = n(t.target);
                var o = e.instance;
                var s = o.current;
                var r = (t && a(t)) || e.startPoints;
                var l = r[0] ? r[0].x - e.$stage.offset().left : 0;
                var c = r[0] ? r[0].y - e.$stage.offset().top : 0;
                var f;
                var u = function (i) {
                    var a = s.opts[i];
                    if (n.isFunction(a)) {
                        a = a.apply(o, [s, t]);
                    }
                    if (!a) {
                        return;
                    }
                    switch (a) {
                        case "close":
                            o.close(e.startEvent);
                            break;
                        case "toggleControls":
                            o.toggleControls(true);
                            break;
                        case "next":
                            o.next();
                            break;
                        case "nextOrClose":
                            if (o.group.length > 1) {
                                o.next();
                            } else {
                                o.close(e.startEvent);
                            }
                            break;
                        case "zoom":
                            if (s.type == "image" && (s.isLoaded || s.$ghost)) {
                                if (o.canPan()) {
                                    o.scaleToFit();
                                } else if (o.isScaledDown()) {
                                    o.scaleToActual(l, c);
                                } else if (o.group.length < 2) {
                                    o.close(e.startEvent);
                                }
                            }
                            break;
                    }
                };
                if (t.originalEvent && t.originalEvent.button == 2) {
                    return;
                }
                if (o.isSliding) {
                    return;
                }
                if (l > i[0].clientWidth + i.offset().left) {
                    return;
                }
                if (i.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) {
                    f = "Outside";
                } else if (i.is(".fancybox-slide")) {
                    f = "Slide";
                } else if (o.current.$content && o.current.$content.has(t.target).length) {
                    f = "Content";
                } else {
                    return;
                }
                if (e.tapped) {
                    clearTimeout(e.tapped);
                    e.tapped = null;
                    if (Math.abs(l - e.tapX) > 50 || Math.abs(c - e.tapY) > 50 || o.isSliding) {
                        return this;
                    }
                    u("dblclick" + f);
                } else {
                    e.tapX = l;
                    e.tapY = c;
                    if (s.opts["dblclick" + f] && s.opts["dblclick" + f] !== s.opts["click" + f]) {
                        e.tapped = setTimeout(function () {
                            e.tapped = null;
                            u("click" + f);
                        }, 300);
                    } else {
                        u("click" + f);
                    }
                }
                return this;
            };
            n(e).on("onActivate.fb", function (t, e) {
                if (e && !e.Guestures) {
                    e.Guestures = new f(e);
                }
            });
            n(e).on("beforeClose.fb", function (t, e) {
                if (e && e.Guestures) {
                    e.Guestures.destroy();
                }
            });
        })(window, document, window.jQuery || jQuery);
        (function (t, e) {
            "use strict";
            e.extend(true, e.fancybox.defaults, {
                btnTpl: {
                    slideShow:
                        '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' +
                        '<svg viewBox="0 0 40 40">' +
                        '<path d="M13,12 L27,20 L13,27 Z" />' +
                        '<path d="M15,10 v19 M23,10 v19" />' +
                        "</svg>" +
                        "</button>",
                },
                slideShow: { autoStart: false, speed: 3e3 },
            });
            var n = function (t) {
                this.instance = t;
                this.init();
            };
            e.extend(n.prototype, {
                timer: null,
                isActive: false,
                $button: null,
                init: function () {
                    var t = this;
                    t.$button = t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
                        t.toggle();
                    });
                    if (t.instance.group.length < 2 || !t.instance.group[t.instance.currIndex].opts.slideShow) {
                        t.$button.hide();
                    }
                },
                set: function (t) {
                    var e = this;
                    if (e.instance && e.instance.current && (t === true || e.instance.current.opts.loop || e.instance.currIndex < e.instance.group.length - 1)) {
                        e.timer = setTimeout(function () {
                            if (e.isActive) {
                                e.instance.jumpTo((e.instance.currIndex + 1) % e.instance.group.length);
                            }
                        }, e.instance.current.opts.slideShow.speed);
                    } else {
                        e.stop();
                        e.instance.idleSecondsCounter = 0;
                        e.instance.showControls();
                    }
                },
                clear: function () {
                    var t = this;
                    clearTimeout(t.timer);
                    t.timer = null;
                },
                start: function () {
                    var t = this;
                    var e = t.instance.current;
                    if (e) {
                        t.isActive = true;
                        t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause");
                        t.set(true);
                    }
                },
                stop: function () {
                    var t = this;
                    var e = t.instance.current;
                    t.clear();
                    t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play");
                    t.isActive = false;
                },
                toggle: function () {
                    var t = this;
                    if (t.isActive) {
                        t.stop();
                    } else {
                        t.start();
                    }
                },
            });
            e(t).on({
                "onInit.fb": function (t, e) {
                    if (e && !e.SlideShow) {
                        e.SlideShow = new n(e);
                    }
                },
                "beforeShow.fb": function (t, e, n, i) {
                    var o = e && e.SlideShow;
                    if (i) {
                        if (o && n.opts.slideShow.autoStart) {
                            o.start();
                        }
                    } else if (o && o.isActive) {
                        o.clear();
                    }
                },
                "afterShow.fb": function (t, e, n) {
                    var i = e && e.SlideShow;
                    if (i && i.isActive) {
                        i.set();
                    }
                },
                "afterKeydown.fb": function (n, i, o, a, s) {
                    var r = i && i.SlideShow;
                    if (r && o.opts.slideShow && (s === 80 || s === 32) && !e(t.activeElement).is("button,a,input")) {
                        a.preventDefault();
                        r.toggle();
                    }
                },
                "beforeClose.fb onDeactivate.fb": function (t, e) {
                    var n = e && e.SlideShow;
                    if (n) {
                        n.stop();
                    }
                },
            });
            e(t).on("visibilitychange", function () {
                var n = e.fancybox.getInstance();
                var i = n && n.SlideShow;
                if (i && i.isActive) {
                    if (t.hidden) {
                        i.clear();
                    } else {
                        i.set();
                    }
                }
            });
        })(document, window.jQuery || jQuery);
        (function (t, e) {
            "use strict";
            var n = (function () {
                var e = [
                    ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                    ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                    ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                    ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                    ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"],
                ];
                var n;
                var i = {};
                var o, a;
                for (o = 0; o < e.length; o++) {
                    n = e[o];
                    if (n && n[1] in t) {
                        for (a = 0; a < n.length; a++) {
                            i[e[0][a]] = n[a];
                        }
                        return i;
                    }
                }
                return false;
            })();
            if (!n) {
                if (e && e.fancybox) {
                    e.fancybox.defaults.btnTpl.fullScreen = false;
                }
                return;
            }
            var i = {
                request: function (e) {
                    e = e || t.documentElement;
                    e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT);
                },
                exit: function () {
                    t[n.exitFullscreen]();
                },
                toggle: function (e) {
                    e = e || t.documentElement;
                    if (this.isFullscreen()) {
                        this.exit();
                    } else {
                        this.request(e);
                    }
                },
                isFullscreen: function () {
                    return Boolean(t[n.fullscreenElement]);
                },
                enabled: function () {
                    return Boolean(t[n.fullscreenEnabled]);
                },
            };
            e.extend(true, e.fancybox.defaults, {
                btnTpl: {
                    fullScreen:
                        '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}">' +
                        '<svg viewBox="0 0 40 40">' +
                        '<path d="M9,12 h22 v16 h-22 v-16 v16 h22 v-16 Z" />' +
                        "</svg>" +
                        "</button>",
                },
                fullScreen: { autoStart: false },
            });
            e(t).on({
                "onInit.fb": function (t, e) {
                    var n;
                    if (e && e.group[e.currIndex].opts.fullScreen) {
                        n = e.$refs.container;
                        n.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (t) {
                            t.stopPropagation();
                            t.preventDefault();
                            i.toggle(n[0]);
                        });
                        if (e.opts.fullScreen && e.opts.fullScreen.autoStart === true) {
                            i.request(n[0]);
                        }
                        e.FullScreen = i;
                    } else if (e) {
                        e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide();
                    }
                },
                "afterKeydown.fb": function (t, e, n, i, o) {
                    if (e && e.FullScreen && o === 70) {
                        i.preventDefault();
                        e.FullScreen.toggle(e.$refs.container[0]);
                    }
                },
                "beforeClose.fb": function (t) {
                    if (t && t.FullScreen) {
                        i.exit();
                    }
                },
            });
            e(t).on(n.fullscreenchange, function () {
                var t = i.isFullscreen(),
                    n = e.fancybox.getInstance();
                if (n) {
                    if (n.current && n.current.type === "image" && n.isAnimating) {
                        n.current.$content.css("transition", "none");
                        n.isAnimating = false;
                        n.update(true, true, 0);
                    }
                    n.trigger("onFullscreenChange", t);
                    n.$refs.container.toggleClass("fancybox-is-fullscreen", t);
                }
            });
        })(document, window.jQuery || jQuery);
        (function (t, e) {
            "use strict";
            e.fancybox.defaults = e.extend(
                true,
                {
                    btnTpl: {
                        thumbs:
                            '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' +
                            '<svg viewBox="0 0 120 120">' +
                            '<path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" />' +
                            "</svg>" +
                            "</button>",
                    },
                    thumbs: { autoStart: false, hideOnClose: true, parentEl: ".fancybox-container", axis: "y" },
                },
                e.fancybox.defaults
            );
            var n = function (t) {
                this.init(t);
            };
            e.extend(n.prototype, {
                $button: null,
                $grid: null,
                $list: null,
                isVisible: false,
                isActive: false,
                init: function (t) {
                    var e = this;
                    e.instance = t;
                    t.Thumbs = e;
                    var n = t.group[0],
                        i = t.group[1];
                    e.opts = t.group[t.currIndex].opts.thumbs;
                    e.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]");
                    if (e.opts && n && i && (n.type == "image" || n.opts.thumb || n.opts.$thumb) && (i.type == "image" || i.opts.thumb || i.opts.$thumb)) {
                        e.$button.show().on("click", function () {
                            e.toggle();
                        });
                        e.isActive = true;
                    } else {
                        e.$button.hide();
                    }
                },
                create: function () {
                    var t = this,
                        n = t.instance,
                        i = t.opts.parentEl,
                        o,
                        a;
                    t.$grid = e('<div class="fancybox-thumbs fancybox-thumbs-' + t.opts.axis + '"></div>').appendTo(n.$refs.container.find(i).addBack().filter(i));
                    o = "<ul>";
                    e.each(n.group, function (t, e) {
                        a = e.opts.thumb || (e.opts.$thumb ? e.opts.$thumb.attr("src") : null);
                        if (!a && e.type === "image") {
                            a = e.src;
                        }
                        if (a && a.length) {
                            o += '<li data-index="' + t + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + a + '" /></li>';
                        }
                    });
                    o += "</ul>";
                    t.$list = e(o)
                        .appendTo(t.$grid)
                        .on("click", "li", function () {
                            n.jumpTo(e(this).data("index"));
                        });
                    t.$list
                        .find("img")
                        .hide()
                        .one("load", function () {
                            var t = e(this).parent().removeClass("fancybox-thumbs-loading"),
                                n = t.outerWidth(),
                                i = t.outerHeight(),
                                o,
                                a,
                                s,
                                r;
                            o = this.naturalWidth || this.width;
                            a = this.naturalHeight || this.height;
                            s = o / n;
                            r = a / i;
                            if (s >= 1 && r >= 1) {
                                if (s > r) {
                                    o = o / r;
                                    a = i;
                                } else {
                                    o = n;
                                    a = a / s;
                                }
                            }
                            e(this)
                                .css({ width: Math.floor(o), height: Math.floor(a), "margin-top": a > i ? Math.floor(i * 0.3 - a * 0.3) : Math.floor(i * 0.5 - a * 0.5), "margin-left": Math.floor(n * 0.5 - o * 0.5) })
                                .show();
                        })
                        .each(function () {
                            this.src = e(this).data("src");
                        });
                    if (t.opts.axis === "x") {
                        t.$list.width(parseInt(t.$grid.css("padding-right")) + n.group.length * t.$list.children().eq(0).outerWidth(true) + "px");
                    }
                },
                focus: function (t) {
                    var e = this,
                        n = e.$list,
                        i,
                        o;
                    if (e.instance.current) {
                        i = n
                            .children()
                            .removeClass("fancybox-thumbs-active")
                            .filter('[data-index="' + e.instance.current.index + '"]')
                            .addClass("fancybox-thumbs-active");
                        o = i.position();
                        if (e.opts.axis === "y" && (o.top < 0 || o.top > n.height() - i.outerHeight())) {
                            n.stop().animate({ scrollTop: n.scrollTop() + o.top }, t);
                        } else if (e.opts.axis === "x" && (o.left < n.parent().scrollLeft() || o.left > n.parent().scrollLeft() + (n.parent().width() - i.outerWidth()))) {
                            n.parent().stop().animate({ scrollLeft: o.left }, t);
                        }
                    }
                },
                update: function () {
                    this.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible);
                    if (this.isVisible) {
                        if (!this.$grid) {
                            this.create();
                        }
                        this.instance.trigger("onThumbsShow");
                        this.focus(0);
                    } else if (this.$grid) {
                        this.instance.trigger("onThumbsHide");
                    }
                    this.instance.update();
                },
                hide: function () {
                    this.isVisible = false;
                    this.update();
                },
                show: function () {
                    this.isVisible = true;
                    this.update();
                },
                toggle: function () {
                    this.isVisible = !this.isVisible;
                    this.update();
                },
            });
            e(t).on({
                "onInit.fb": function (t, e) {
                    var i;
                    if (e && !e.Thumbs) {
                        i = new n(e);
                        if (i.isActive && i.opts.autoStart === true) {
                            i.show();
                        }
                    }
                },
                "beforeShow.fb": function (t, e, n, i) {
                    var o = e && e.Thumbs;
                    if (o && o.isVisible) {
                        o.focus(i ? 0 : 250);
                    }
                },
                "afterKeydown.fb": function (t, e, n, i, o) {
                    var a = e && e.Thumbs;
                    if (a && a.isActive && o === 71) {
                        i.preventDefault();
                        a.toggle();
                    }
                },
                "beforeClose.fb": function (t, e) {
                    var n = e && e.Thumbs;
                    if (n && n.isVisible && n.opts.hideOnClose !== false) {
                        n.$grid.hide();
                    }
                },
            });
        })(document, window.jQuery);
        (function (t, e) {
            "use strict";
            e.extend(true, e.fancybox.defaults, {
                btnTpl: {
                    share:
                        '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">' +
                        '<svg viewBox="0 0 40 40">' +
                        '<path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z">' +
                        "</svg>" +
                        "</button>",
                },
                share: {
                    tpl:
                        '<div class="fancybox-share">' +
                        "<h1>{{SHARE}}</h1>" +
                        "<p>" +
                        '<a href="https://www.facebook.com/sharer/sharer.php?u={{src}}" target="_blank" class="fancybox-share_button">' +
                        '<svg version="1.1" viewBox="0 0 32 32" fill="#3b5998"><path d="M27.6 3h-23.2c-.8 0-1.4.6-1.4 1.4v23.1c0 .9.6 1.5 1.4 1.5h12.5v-10.1h-3.4v-3.9h3.4v-2.9c0-3.4 2.1-5.2 5-5.2 1.4 0 2.7.1 3 .2v3.5h-2.1c-1.6 0-1.9.8-1.9 1.9v2.5h3.9l-.5 3.9h-3.4v10.1h6.6c.8 0 1.4-.6 1.4-1.4v-23.2c.1-.8-.5-1.4-1.3-1.4z"></path></svg>' +
                        "<span>Facebook</span>" +
                        "</a>" +
                        '<a href="https://www.pinterest.com/pin/create/button/?url={{src}}&amp;description={{descr}}" target="_blank" class="fancybox-share_button">' +
                        '<svg version="1.1" viewBox="0 0 32 32" fill="#c92228"><path d="M16 3c-7.2 0-13 5.8-13 13 0 5.5 3.4 10.2 8.3 12.1-.1-1-.2-2.6 0-3.7.2-1 1.5-6.5 1.5-6.5s-.4-.8-.4-1.9c0-1.8 1-3.2 2.4-3.2 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.8-1.1 4.3-.3 1.3.6 2.3 1.9 2.3 2.3 0 4.1-2.4 4.1-6 0-3.1-2.2-5.3-5.4-5.3-3.7 0-5.9 2.8-5.9 5.6 0 1.1.4 2.3 1 3 .1.1.1.2.1.4-.1.4-.3 1.3-.4 1.5-.1.2-.2.3-.4.2-1.6-.8-2.6-3.1-2.6-5 0-4.1 3-7.9 8.6-7.9 4.5 0 8 3.2 8 7.5 0 4.5-2.8 8.1-6.7 8.1-1.3 0-2.6-.7-3-1.5 0 0-.7 2.5-.8 3.1-.3 1.1-1.1 2.5-1.6 3.4 1.2.4 2.5.6 3.8.6 7.2 0 13-5.8 13-13 0-7.1-5.8-12.9-13-12.9z"></path></svg>' +
                        "<span>Pinterest</span>" +
                        "</a>" +
                        '<a href="https://twitter.com/intent/tweet?url={{src}}&amp;text={{descr}}" target="_blank" class="fancybox-share_button">' +
                        '<svg version="1.1" viewBox="0 0 32 32" fill="#1da1f2"><path d="M30 7.3c-1 .5-2.1.8-3.3.9 1.2-.7 2.1-1.8 2.5-3.2-1.1.7-2.3 1.1-3.6 1.4-1-1.1-2.5-1.8-4.2-1.8-3.2 0-5.7 2.6-5.7 5.7 0 .5.1.9.1 1.3-4.8-.2-9-2.5-11.8-6-.5.9-.8 1.9-.8 3 0 2 1 3.8 2.6 4.8-.9 0-1.8-.3-2.6-.7v.1c0 2.8 2 5.1 4.6 5.6-.5.1-1 .2-1.5.2-.4 0-.7 0-1.1-.1.7 2.3 2.9 3.9 5.4 4-2 1.5-4.4 2.5-7.1 2.5-.5 0-.9 0-1.4-.1 2.5 1.6 5.6 2.6 8.8 2.6 10.6 0 16.3-8.8 16.3-16.3v-.7c1.1-1 2-2 2.8-3.2z"></path></svg>' +
                        "<span>Twitter</span>" +
                        "</a>" +
                        "</p>" +
                        '<p><input type="text" value="{{src_raw}}" onfocus="this.select()" /></p>' +
                        "</div>",
                },
            });
            function n(t) {
                var e = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;", "`": "&#x60;", "=": "&#x3D;" };
                return String(t).replace(/[&<>"'`=\/]/g, function (t) {
                    return e[t];
                });
            }
            e(t).on("click", "[data-fancybox-share]", function () {
                var t = e.fancybox.getInstance(),
                    i,
                    o;
                if (t) {
                    i = t.current.opts.hash === false ? t.current.src : window.location;
                    o = t.current.opts.share.tpl
                        .replace(/\{\{src\}\}/g, encodeURIComponent(i))
                        .replace(/\{\{src_raw\}\}/g, n(i))
                        .replace(/\{\{descr\}\}/g, t.$caption ? encodeURIComponent(t.$caption.text()) : "");
                    e.fancybox.open({ src: t.translate(t, o), type: "html", opts: { animationEffect: "fade", animationDuration: 250 } });
                }
            });
        })(document, window.jQuery || jQuery);
        (function (t, e, n) {
            "use strict";
            if (!n.escapeSelector) {
                n.escapeSelector = function (t) {
                    var e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
                    var n = function (t, e) {
                        if (e) {
                            if (t === "\0") {
                                return "�";
                            }
                            return t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " ";
                        }
                        return "\\" + t;
                    };
                    return (t + "").replace(e, n);
                };
            }
            var i = true;
            var o = null;
            var a = null;
            function s() {
                var t = e.location.hash.substr(1);
                var n = t.split("-");
                var i = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1;
                var o = n.join("-");
                if (i < 1) {
                    i = 1;
                }
                return { hash: t, index: i, gallery: o };
            }
            function r(t) {
                var e;
                if (t.gallery !== "") {
                    e = n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1);
                    if (!e.length) {
                        e = n("#" + n.escapeSelector(t.gallery) + "");
                    }
                    if (e.length) {
                        i = false;
                        e.trigger("click");
                    }
                }
            }
            function l(t) {
                var e;
                if (!t) {
                    return false;
                }
                e = t.current ? t.current.opts : t.opts;
                return e.hash || (e.$orig ? e.$orig.data("fancybox") : "");
            }
            n(function () {
                if (n.fancybox.defaults.hash === false) {
                    return;
                }
                n(t).on({
                    "onInit.fb": function (t, e) {
                        var n, i;
                        if (e.group[e.currIndex].opts.hash === false) {
                            return;
                        }
                        n = s();
                        i = l(e);
                        if (i && n.gallery && i == n.gallery) {
                            e.currIndex = n.index - 1;
                        }
                    },
                    "beforeShow.fb": function (n, s, r) {
                        var c;
                        if (!r || r.opts.hash === false) {
                            return;
                        }
                        c = l(s);
                        if (c && c !== "") {
                            if (e.location.hash.indexOf(c) < 0) {
                                s.opts.origHash = e.location.hash;
                            }
                            o = c + (s.group.length > 1 ? "-" + (r.index + 1) : "");
                            if ("replaceState" in e.history) {
                                if (a) {
                                    clearTimeout(a);
                                }
                                a = setTimeout(function () {
                                    e.history[i ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + o);
                                    a = null;
                                    i = false;
                                }, 300);
                            } else {
                                e.location.hash = o;
                            }
                        }
                    },
                    "beforeClose.fb": function (i, s, r) {
                        var c, f;
                        if (a) {
                            clearTimeout(a);
                        }
                        if (r.opts.hash === false) {
                            return;
                        }
                        c = l(s);
                        f = s && s.opts.origHash ? s.opts.origHash : "";
                        if (c && c !== "") {
                            if ("replaceState" in history) {
                                e.history.replaceState({}, t.title, e.location.pathname + e.location.search + f);
                            } else {
                                e.location.hash = f;
                                n(e).scrollTop(s.scrollTop).scrollLeft(s.scrollLeft);
                            }
                        }
                        o = null;
                    },
                });
                n(e).on("hashchange.fb", function () {
                    var t = s();
                    if (n.fancybox.getInstance()) {
                        if (o && o !== t.gallery + "-" + t.index && !(t.index === 1 && o == t.gallery)) {
                            o = null;
                            n.fancybox.close();
                        }
                    } else if (t.gallery !== "") {
                        r(t);
                    }
                });
                setTimeout(function () {
                    r(s());
                }, 50);
            });
        })(document, window, window.jQuery || jQuery);
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/vendor/fancybox/jquery.fancybox.map.js

        (function () {
            "use strict";
            BX.ready(function () {
                {
                    $('[target="_popup"]:not([data-url])').fancybox({ type: "iframe" });
                    $('[target="_popup"][data-url]').on("click", function (t) {
                        t.preventDefault();
                        $.fancybox.open({ src: this.dataset.url, type: "iframe", afterShow: a }, { iframe: { scrolling: "auto" } });
                    });
                    $("[data-pseudo-url*='_popup']").on("click", function (t) {
                        t.preventDefault();
                        var e = BX.Landing.Utils.data(this, "data-pseudo-url");
                        if (e.href && e.enabled) {
                            var r = e.href;
                            if (BX.type.isPlainObject(e.attrs) && e.attrs["data-url"]) {
                                r = e.attrs["data-url"];
                            }
                            $.fancybox.open({ src: r, type: "iframe", afterShow: a }, { iframe: { scrolling: "auto" } });
                        }
                    });
                }
                function a(a, t) {
                    var e = t.$slide.find("iframe")[0];
                    void BX.Landing.MediaPlayer.Factory.create(e);
                }
            });
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/js/helpers/popup_init.map.js

        (function () {
            "use strict";
            BX.addCustomEvent(window, "BX.Landing.Block:init", function (a) {
                var n = [].slice.call(a.block.querySelectorAll("[data-source]"));
                if (n.length) {
                    n.forEach(function (a) {
                        if (BX.Landing.Utils.Matchers.youtube.test(a.dataset.source)) {
                            var n = a.src ? a.src : a.dataset.src;
                            if (n.indexOf("autoplay=1") !== -1) {
                                t(a, { autoplay: 1, mute: 1 });
                            } else if (a.tagName !== "IFRAME") {
                                BX.bind(a, "click", e);
                            } else {
                                t(a);
                            }
                        } else if (a.tagName !== "IFRAME") {
                            r(a);
                        }
                    });
                }
            });
            function e(e) {
                var a = e.target;
                t(a, { autoplay: 1 });
            }
            var a = [];
            function t(e, n) {
                if (typeof YT === "undefined" || typeof YT.Player === "undefined") {
                    if (!a.includes(e)) {
                        a.push(e);
                    }
                    window.onYouTubeIframeAPIReady = function () {
                        a.forEach(function (e) {
                            t(e, n);
                        });
                    };
                } else {
                    var c = r(e);
                    var i = BX.Landing.MediaPlayer.Factory.create(c);
                    if (typeof n !== "undefined" && Object.keys(n).length) {
                        i.parameters = Object.assign(i.parameters, n);
                    }
                }
            }
            function r(e) {
                if (e.tagName === "IFRAME") {
                    return e;
                }
                var a = BX.create("iframe", {
                    props: { className: e.className },
                    attrs: { src: e.dataset.src, frameborder: "0", allowfullscreen: "allowfullscreen", allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" },
                    dataset: { source: e.dataset.source },
                    events: {
                        load: function () {
                            BX.remove(e);
                        },
                    },
                });
                e.parentElement.insertBefore(a, e);
                return a;
            }
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/js/helpers/inline-video.map.js

        (function () {
            "use strict";
            BX.namespace("BX.Landing");
            BX.Landing.EmbedForms = function () {
                this.forms = [];
            };
            BX.Landing.EmbedForms.prototype = {
                add: function (t) {
                    var e = new BX.Landing.EmbedFormEntry(t);
                    this.forms.push(e);
                    e.load();
                },
                remove: function (t) {
                    var e = this.getFormByNode(t);
                    if (e) {
                        e.unload();
                        this.forms = this.forms.filter(function (t) {
                            return t !== e;
                        });
                    }
                },
                reload: function (t) {
                    this.remove(t);
                    this.add(t);
                },
                getFormByNode: function (t) {
                    var e = null;
                    this.forms.forEach(function (r) {
                        if (t === r.getNode()) {
                            e = r;
                            return true;
                        }
                    });
                    return e;
                },
            };
            BX.Landing.EmbedFormEntry = function (t) {
                this.node = t;
                this.formObject = null;
                var e = this.node.dataset.b24form;
                e = e.split("|");
                if (e.length !== 3) {
                    return;
                }
                this.id = e[0];
                this.sec = e[1];
                this.url = e[2];
                this.useStyle = this.node.dataset[BX.Landing.EmbedFormEntry.ATTR_USE_STYLE] === "Y";
                this.design = this.node.dataset[BX.Landing.EmbedFormEntry.ATTR_DESIGN] ? JSON.parse(this.node.dataset[BX.Landing.EmbedFormEntry.ATTR_DESIGN]) : {};
                this.primaryOpacityMatcher = new RegExp("--primary([\\da-fA-F]{2})");
            };
            BX.Landing.EmbedFormEntry.ATTR_FORM_ID = "b24form";
            BX.Landing.EmbedFormEntry.ATTR_FORM_ID_STR = "data-b24form";
            BX.Landing.EmbedFormEntry.ATTR_USE_STYLE = "b24formUseStyle";
            BX.Landing.EmbedFormEntry.ATTR_USE_STYLE_STR = "data-b24form-use-style";
            BX.Landing.EmbedFormEntry.ATTR_DESIGN = "b24formDesign";
            BX.Landing.EmbedFormEntry.prototype = {
                load: function () {
                    this.node.innerHTML = "";
                    this.loadScript();
                },
                unload: function () {
                    if (!b24form || !b24form.App || !this.formObject) {
                        return;
                    }
                    b24form.App.remove(this.formObject.getId());
                },
                getNode: function () {
                    return this.node;
                },
                setFormObject: function (t) {
                    this.formObject = t;
                },
                loadScript: function () {
                    var t = BX.Landing.getMode() === "edit" ? (Date.now() / 1e3) | 0 : (Date.now() / 6e4) | 0;
                    var e = document.createElement("script");
                    e.setAttribute("data-b24-form", "inline/" + this.id + "/" + this.sec);
                    e.setAttribute("data-skip-moving", "true");
                    e.innerText =
                        "(function(w,d,u){" + "var s=d.createElement('script');s.async=true;s.src=u+'?'+(" + t + ");" + "var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);" + "})(window,document,'" + this.url + "')";
                    this.node.append(e);
                },
                onFormLoad: function (t) {
                    this.setFormObject(t);
                    if (this.useStyle) {
                        this.formObject.adjust(this.getParams());
                    }
                },
                getParams: function () {
                    var t = { design: { shadow: false } };
                    var e = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
                    var r = this.design;
                    for (var n in r.color) {
                        if (r.color[n] === "--primary" || r.color[n].match(this.primaryOpacityMatcher) !== null) {
                            r.color[n] = r.color[n].replace("--primary", e);
                        }
                    }
                    t.design = Object.assign(t.design, r);
                    return t;
                },
            };
            var t = new BX.Landing.EmbedForms();
            window.addEventListener("b24:form:init", function (e) {
                var r = t.getFormByNode(e.detail.object.node.parentElement);
                if (!!r && e.detail.object) {
                    r.onFormLoad(e.detail.object);
                }
            });
            BX.addCustomEvent("BX.Landing.Block:init", function (e) {
                var r = e.block.querySelector(e.makeRelativeSelector(".bitrix24forms"));
                if (r) {
                    t.add(r);
                }
            });
            BX.addCustomEvent("BX.Landing.Block:remove", function (e) {
                var r = e.block.querySelector(e.makeRelativeSelector(".bitrix24forms"));
                if (r) {
                    t.remove(r);
                }
            });
            BX.addCustomEvent("BX.Landing.Block:Node:updateAttr", function (e) {
                var r = e.block.querySelector(e.makeRelativeSelector(".bitrix24forms"));
                if (r) {
                    t.reload(r);
                }
            });
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/js/helpers/form_init.map.js

        (function () {
            "use strict";
            BX.ready(function () {
                var o = 555;
                var e = "animated";
                var a = "opacity-0";
                var t = "zoomIn";
                var s = ".js-go-to";
                document.body.appendChild(
                    BX.create("A", { props: { className: "js-go-to u-go-to-v1 opacity-0 g-bg-white-opacity-0_7 g-bg-primary--hover g-brd-main g-brd-white--hover" }, attrs: { "data-show-effect": "zoomIn" }, events: { click: r } })
                );
                function r(o) {
                    o.preventDefault();
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }
                BX.bind(window, "scroll", BX.debounce(n, 333));
                function n() {
                    var r = document.querySelector(s);
                    if (window.pageYOffset >= o) {
                        BX.removeClass(r, a);
                        BX.addClass(r, e);
                        BX.addClass(r, t);
                    } else {
                        BX.addClass(r, a);
                        BX.removeClass(r, e);
                        BX.removeClass(r, t);
                    }
                }
            });
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/js/helpers/upper_init.map.js

        (function () {
            "use strict";
            BX.namespace("BX.Landing.UI.Tool");
            var t = BX.Landing.Utils.bind;
            var n = BX.Landing.Utils.slice;
            var i = BX.Landing.Utils.onCustomEvent;
            var e = BX.width(window);
            function o() {
                return BX.width(window) < 1100;
            }
            function s() {
                var t = e !== BX.width(window);
                e = BX.width(window);
                return t;
            }
            BX.Landing.UI.Tool.autoFontScale = function (n) {
                this.entries = n.map(this.createEntry, this);
                t(window, "resize", this.onResize.bind(this, false));
                t(window, "orientationchange", this.onResize.bind(this, true));
                i("BX.Landing.Block:init", this.onAddBlock.bind(this));
                this.adjust(true);
            };
            BX.Landing.UI.Tool.autoFontScale.prototype = {
                onResize: function (t) {
                    this.adjust(t);
                    clearTimeout(this.falbackTimeoutId);
                    this.falbackTimeoutId = setTimeout(
                        function () {
                            this.adjust(true);
                        }.bind(this),
                        250
                    );
                },
                adjust: function (t) {
                    if (t === true || s()) {
                        var n = o();
                        this.entries.forEach(function (t) {
                            if (n) {
                                t.adjust();
                            } else {
                                t.resetSize();
                            }
                        });
                    }
                },
                createEntry: function (t) {
                    return new BX.Landing.UI.Tool.autoFontScaleEntry(t);
                },
                addElements: function (t) {
                    t.forEach(function (t) {
                        var n = this.entries.some(function (n) {
                            return n.element === t;
                        });
                        if (!n) {
                            this.entries.push(this.createEntry(t));
                        }
                    }, this);
                },
                onAddBlock: function (t) {
                    var i = n(t.block.querySelectorAll("h1, h2, h3, h4, h5, [data-auto-font-scale]"));
                    this.addElements(i);
                },
            };
        })();

        (function () {
            "use strict";
            BX.namespace("BX.Landing.UI.Tool");
            var t = BX.Landing.Utils.createRangeFromNode;
            var i = BX.Landing.Utils.isNumber;
            var e = BX.Landing.Utils.rect;
            BX.Landing.UI.Tool.autoFontScaleEntry = function (t) {
                this.element = t;
                this.minSize = 8;
                this.maxSize = parseInt(BX.style(t, "font-size"));
                this.maxLetterSpacing = parseFloat(BX.style(t, "letter-spacing"));
                this.maxLetterSpacing = i(this.maxLetterSpacing) ? this.maxLetterSpacing : 0;
                this.minLetterSpacing = 0;
                this.paddings = 30;
                this.changed = false;
            };
            BX.Landing.UI.Tool.autoFontScaleEntry.prototype = {
                setFontSize: function (t) {
                    t = Math.min(Math.max(t, this.minSize), this.maxSize);
                    this.element.style.cssText = "font-size: " + t + "px!important;";
                },
                setLetterSpacing: function (t) {
                    t = Math.min(Math.max(t, this.minLetterSpacing), this.maxLetterSpacing);
                    this.element.style.letterSpacing = t + "px";
                },
                resetSize: function () {
                    this.element.style.fontSize = null;
                    this.element.style.letterSpacing = null;
                    this.element.style.display = null;
                },
                adjust: function () {
                    if (this.changed || this.getRangeWidth() > this.getParentWidth()) {
                        this.changed = true;
                        var t = this.getParentWidth() * this.getFontSizeRatio();
                        var i = this.getParentWidth() * this.getLetterSpacingRatio();
                        this.setFontSize(t - i);
                        this.setLetterSpacing(i);
                    }
                    if (!this.changed && this.maxSize > 40 && BX.width(window) <= 600) {
                        this.setFontSize(this.getParentWidth() * this.getBaseFontSizeRatio());
                    }
                },
                getCurrentSize: function () {
                    return parseInt(BX.style(this.element, "font-size"));
                },
                getFontSizeRatio: function () {
                    if (i(this.ratio)) {
                        return this.ratio;
                    }
                    this.ratio = this.maxSize / this.getRangeWidth();
                    return this.ratio;
                },
                getLetterSpacingRatio: function () {
                    if (i(this.letterSpacingRatio)) {
                        return this.letterSpacingRatio;
                    }
                    this.letterSpacingRatio = this.maxLetterSpacing / this.getRangeWidth();
                    return this.letterSpacingRatio;
                },
                getBaseFontSizeRatio: function () {
                    if (i(this.baseFontSizeRatio)) {
                        return this.baseFontSizeRatio;
                    }
                    this.baseFontSizeRatio = this.getCurrentSize() / (600 - this.paddings);
                    return this.baseFontSizeRatio;
                },
                getRangeWidth: function () {
                    return e(t(this.element)).width;
                },
                getParentWidth: function () {
                    return Math.min(e(this.element).width, BX.width(window) - this.paddings);
                },
            };
        })();

        (function () {
            "use strict";
            BX.ready(function () {
                var t = [].slice.call(document.querySelectorAll("h1, h2, h3, h4, h5, [data-auto-font-scale]"));
                new BX.Landing.UI.Tool.autoFontScale(t);
            });
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/templates/landing24/assets/js/helpers/auto_font_scale_init.map.js

        (function () {
            "use strict";
            BX.namespace("BX.Landing");
            var e = BX.Landing.Utils.bind;
            var n = BX.Landing.Utils.data;
            var t = BX.Landing.Utils.isEmpty;
            var i = BX.Landing.Utils.isPlainObject;
            var a = BX.Landing.Utils.slice;
            var r = BX.Landing.Utils.findParent;
            var l = BX.Landing.Utils.trim;
            var c = BX.Landing.Utils.join;
            var o = BX.Landing.Utils.attr;
            function s(e, n, t) {
                switch (t) {
                    case "show":
                        return u(e, n);
                    case "click":
                        return d(e, n);
                    default:
                        return function () {};
                }
            }
            function u(e, n) {
                if (!e.blockWiewMap.has(n)) {
                    e.intersectionObserver.observe(n);
                    e.blockWiewMap.set(n, null);
                }
            }
            function d(n, t) {
                var i = [].concat(a(t.querySelectorAll("a")), a(t.querySelectorAll("button")), a(t.querySelectorAll("[data-pseudo-url]")));
                i.forEach(function (t) {
                    if (!n.clickMap.has(t)) {
                        e(t, "click", f.bind(null, n, t));
                        n.clickMap.set(t, null);
                    }
                });
            }
            function f(e, n) {
                var t = r(n, { className: "block-wrapper" });
                var i = { type: "click", category: c("#", t.id), label: l(n.innerText) };
                if (e.options.labelFrom === "href") {
                    if (n.tagName === "A" && BX.Type.isStringFilled(n.href)) {
                        i.label = n.href;
                    } else {
                        var a = BX.Landing.Utils.data(n, "data-pseudo-url");
                        if (BX.Type.isPlainObject(a) && a.enabled && BX.Type.isStringFilled(a.href)) {
                            i.label = a.href;
                        }
                    }
                } else if (!BX.Type.isStringFilled(i.label)) {
                    if (n.tagName === "IMG" && o(n, "alt")) {
                        i.label = o(n, "alt");
                    } else {
                        var s = n.firstElementChild;
                        if (s && s.tagName === "IMG" && o(s, "alt")) {
                            i.label = o(s, "alt");
                        }
                    }
                }
                e.push(i);
            }
            function h(e) {
                var a = n(e);
                var r = {};
                if (i(a) && !t(a)) {
                    r.event = a["data-event-tracker"] || [];
                    r.labelFrom = a["data-event-tracker-label-from"] || "text";
                }
                return r;
            }
            function v(e, n) {
                g(e, n);
                var t = setTimeout(function () {
                    var t = r(n, { className: "block-wrapper" });
                    e.push({ category: "Block", type: "show", label: "#" + t.id });
                }, 1e3);
                e.blockWiewMap.set(n, t);
            }
            function g(e, n) {
                clearTimeout(e.blockWiewMap.get(n));
                e.blockWiewMap.set(n, 0);
            }
            function b(e) {
                var n = window.innerHeight;
                if (e.boundingClientRect.height <= n / 2) {
                    return 0.9;
                }
                if (e.boundingClientRect.height >= n) {
                    var t = Math.min(e.boundingClientRect.height, n) / Math.max(e.boundingClientRect.height, n);
                    return t - (t / 100) * 10;
                }
                return 0.7;
            }
            function p(e, n) {
                n.forEach(function (n) {
                    if (n.intersectionRatio >= b(n)) {
                        v(e, n.target);
                        return;
                    }
                    g(e, n.target);
                });
            }
            BX.Landing.EventTracker = function () {
                this.intersectionObserver = new IntersectionObserver(p.bind(null, this), { threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] });
                this.blockWiewMap = new WeakMap();
                this.clickMap = new WeakMap();
                this.services = [new BX.Landing.EventTracker.Service.GoogleAnalytics()];
                this.options = h(document.body);
            };
            BX.Landing.EventTracker.getInstance = function () {
                return BX.Landing.EventTracker.instance || (BX.Landing.EventTracker.instance = new BX.Landing.EventTracker());
            };
            BX.Landing.EventTracker.prototype = {
                observe: function (e) {
                    var n = h(document.body);
                    if (i(n) && !t(n)) {
                        n.event.forEach(s.bind(null, this, e));
                    }
                },
                push: function (e) {
                    this.services.forEach(function (n) {
                        n.push(e);
                    });
                },
                run: function () {
                    a(document.querySelectorAll(".block-wrapper > *:first-child")).forEach(this.observe, this);
                },
            };
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/landing/event-tracker/event-tracker.map.js

        (function () {
            "use strict";
            BX.namespace("BX.Landing.EventTracker.Service");
            BX.Landing.EventTracker.Service.BaseService = function () {};
            BX.Landing.EventTracker.Service.BaseService.prototype = {
                push: function (e) {
                    throw new Error("Must be implemented by subclass");
                },
            };
        })();

        (function () {
            "use strict";
            BX.namespace("BX.Landing.EventTracker.Service");
            BX.Landing.EventTracker.Service.GoogleAnalytics = function () {
                BX.Landing.EventTracker.Service.BaseService.apply(this);
            };
            BX.Landing.EventTracker.Service.GoogleAnalytics.prototype = {
                constructor: BX.Landing.EventTracker.Service.GoogleAnalytics,
                __proto__: BX.Landing.EventTracker.Service.BaseService.prototype,
                push: function (e) {
                    if ("gtag" in window) {
                        gtag("event", e.type, { event_category: e.category, event_label: e.label });
                    }
                },
            };
        })();

        (function (t) {
            "use strict";
            if (!t.loadCSS) {
                t.loadCSS = function () {};
            }
            var e = (loadCSS.relpreload = {});
            e.support = (function () {
                var e;
                try {
                    e = t.document.createElement("link").relList.supports("preload");
                } catch (t) {
                    e = false;
                }
                return function () {
                    return e;
                };
            })();
            e.bindMediaToggle = function (t) {
                var e = t.media || "all";
                function a() {
                    t.media = e;
                }
                if (t.addEventListener) {
                    t.addEventListener("load", a);
                } else if (t.attachEvent) {
                    t.attachEvent("onload", a);
                }
                setTimeout(function () {
                    t.rel = "stylesheet";
                    t.media = "only x";
                });
                setTimeout(a, 3e3);
            };
            e.poly = function () {
                if (e.support()) {
                    return;
                }
                var a = t.document.getElementsByTagName("link");
                for (var n = 0; n < a.length; n++) {
                    var o = a[n];
                    if (o.rel === "preload" && o.getAttribute("as") === "style" && !o.getAttribute("data-loadcss")) {
                        o.setAttribute("data-loadcss", true);
                        e.bindMediaToggle(o);
                    }
                }
            };
            if (!e.support()) {
                e.poly();
                var a = t.setInterval(e.poly, 500);
                if (t.addEventListener) {
                    t.addEventListener("load", function () {
                        e.poly();
                        t.clearInterval(a);
                    });
                } else if (t.attachEvent) {
                    t.attachEvent("onload", function () {
                        e.poly();
                        t.clearInterval(a);
                    });
                }
            }
            t.loadCSS = loadCSS;
        })(window);
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/landing/polyfill.map.js

        (function () {
            "use strict";
            BX.namespace("BX.Landing.Event");
            BX.Landing.Event.Block = function (n) {
                this.block = typeof n.block === "object" ? n.block : null;
                this.card = typeof n.card === "object" ? n.card : null;
                this.node = typeof n.node === "object" ? n.node : null;
                this.data = typeof n.data !== "undefined" ? n.data : null;
                this.forceInitHandler = typeof n.onForceInit === "function" ? n.onForceInit : function () {};
            };
            BX.Landing.Event.Block.prototype = {
                forceInit: function () {
                    this.forceInitHandler();
                },
                makeRelativeSelector: function (n) {
                    return "#" + this.block.id + " " + n;
                },
            };
        })();

        (function () {
            "use strict";
            BX(function () {
                if (typeof BX.Landing === "undefined" || typeof BX.Landing.Main === "undefined") {
                    BX.namespace("BX.Landing");
                    BX.Landing.getMode = function () {
                        return window.top === window ? "view" : "design";
                    };
                    var e = [].slice.call(document.getElementsByClassName("block-wrapper"));
                    if (!!e && e.length) {
                        e.forEach(function (e) {
                            var n = new BX.Landing.Event.Block({ block: e });
                            BX.onCustomEvent("BX.Landing.Block:init", [n]);
                        });
                    }
                    if (BX.Landing.EventTracker) {
                        BX.Landing.EventTracker.getInstance().run();
                    }
                    var n = [].slice.call(document.querySelectorAll('[data-pseudo-url*="{"]'));
                    if (n.length) {
                        n.forEach(function (e) {
                            var n = BX.Landing.Utils.data(e, "data-pseudo-url");
                            if (n.href && n.enabled) {
                                if (n.target !== "_popup") {
                                    e.addEventListener("click", function (e) {
                                        e.preventDefault();
                                        if (typeof BXMobileApp !== "undefined") {
                                            BXMobileApp.PageManager.loadPageBlank({ url: n.href, cache: false, bx24ModernStyle: true });
                                        } else {
                                            if (window.top === window) {
                                                if (n.query) {
                                                    n.href += n.href.indexOf("?") === -1 ? "?" : "&";
                                                    n.href += n.query;
                                                }
                                                top.open(n.href, n.target);
                                            }
                                        }
                                    });
                                }
                                var a = e.getElementsByTagName("a");
                                if (a.length > 0) {
                                    [].slice.call(a).map(function (e) {
                                        t(e);
                                    });
                                }
                            }
                        });
                    }
                    function t(e) {
                        e.addEventListener("click", function (e) {
                            e.stopPropagation();
                        });
                    }
                    var a = [].slice.call(document.querySelectorAll("[data-stop-propagation]"));
                    if (a.length) {
                        a.forEach(function (e) {
                            t(e);
                        });
                    }
                    if (typeof BXMobileApp !== "undefined") {
                        var o = [].slice.call(document.querySelectorAll("a"));
                        if (o.length) {
                            o.forEach(function (e) {
                                if (e.href) {
                                    e.addEventListener("click", function (n) {
                                        n.preventDefault();
                                        BXMobileApp.PageManager.loadPageBlank({ url: e.href, cache: false, bx24ModernStyle: true });
                                    });
                                }
                            });
                        }
                    }
                    var i = [].slice.call(document.querySelectorAll('a[href*="#"]'));
                    if (!!i && i.length) {
                        var r = 0;
                        var l = document.querySelector(".u-header.u-header--sticky");
                        if (!!l) {
                            var c = l.querySelector(".navbar");
                            if (!!c) {
                                var f = BX.findParent(c, { class: "u-header__section" });
                                r = !!f ? f.offsetHeight : c.offsetHeight;
                            }
                        }
                        i.forEach(function (e) {
                            if (e.getAttribute("href") !== "#" && e.hash !== "" && e.pathname === document.location.pathname && e.hostname === document.location.hostname) {
                                try {
                                    var n = document.querySelector(e.hash);
                                } catch (e) {}
                                if (n) {
                                    e.addEventListener("click", function (e) {
                                        e.preventDefault();
                                        window.scrollTo({ top: n.offsetTop - r, behavior: "smooth" });
                                        e.target.blur();
                                    });
                                }
                            }
                        });
                    }
                }
            });
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/landing/public.map.js
    })();
})();
