(function () {
    (function () {
        (function () {
            if (!window.b24form) {
                window.b24form = function (e) {
                    b24form.forms = b24form.forms || [];
                    b24form.forms.push(e);
                    if (e.ref && b24form.Loader && !this.loaded) {
                        this.loaded = true;
                        b24form.Loader.loadJs(e.ref, true);
                    }
                };
            }
            if (window.b24form.Loader) {
                return;
            }
            function e() {
                this.requested = false;
                this.queue = [];
            }
            e.prototype = {
                run: function (e) {
                    e = e || {};
                    var o = e.resources || {};
                    this.queue.push(e.form);
                    if (!this.requested) {
                        var t = this.loadApp.bind(this, o.app);
                        this.requested = true;
                        if (o.polyfill && !this.checkPolyfills()) {
                            this.loadJs(o.polyfill, true, t);
                        } else {
                            t();
                        }
                    }
                    this.loadForms();
                },
                loadApp: function (e) {
                    if (!e) {
                        return;
                    }
                    window.b24form.App ? this.loadForms() : this.loadJs(e, true, this.loadForms.bind(this));
                },
                loadForms: function () {
                    if (!this.checkPolyfills()) {
                        return;
                    }
                    if (!window.b24form.App) {
                        return;
                    }
                    var e = this.queue;
                    this.queue = [];
                    e.forEach(this.loadForm, this);
                },
                loadForm: function (e) {
                    b24form.App.initFormScript24(e);
                },
                checkBabelHelpers: function () {
                    return window.babelHelpers;
                },
                checkPolyfills: function () {
                    return window.fetch && window.Request && window.Response && window.Promise && Object.assign && Array.prototype.find && Array.prototype.includes;
                },
                loadJs: function (e, o, t) {
                    var i = document.createElement("SCRIPT");
                    i.setAttribute("type", "text/javascript");
                    i.setAttribute("async", "");
                    if (o) {
                        i.setAttribute("src", e + "?" + ((Date.now() / 864e5) | 0));
                        if (t) {
                            i.onload = t;
                        }
                        this.appendToHead(i);
                    } else {
                        i.appendChild(document.createTextNode(e));
                        this.appendToHead(i);
                    }
                },
                appendToHead: function (e) {
                    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(e);
                },
            };
            window.b24form.Loader = new e();
        })();
        //# sourceMappingURL=https://b24-p9cw17.bitrix24.com/bitrix/js/crm/site/form/embed/unit/script.map.js

        window.b24form.Loader.run({
            form: {
                id: "3",
                sec: "ki4g26",
                lang: "en",
                address: "https://b24-p9cw17.bitrix24.com",
                views: { click: { type: "panel", position: "right", vertical: "bottom" }, auto: { type: "popup", position: "center", vertical: "bottom", delay: 5 } },
                data: {
                    language: "en",
                    design: {
                        shadow: true,
                        border: { bottom: true },
                        color: { primary: "#0F58D0", primaryText: "#FFFFFF", text: "#000000", background: "#FFFFFF", fieldBorder: "#00000019", fieldBackground: "#00000014", fieldFocusBackground: "#ffffffff" },
                    },
                    title: "Feedback",
                    desc: "Please share your feedback in the comment field",
                    buttonCaption: "Send",
                    useSign: true,
                    date: { dateFormat: "MM/DD/YYYY", dateTimeFormat: "MM/DD/YYYY H:MI:SS T", sundayFirstly: true },
                    currency: { code: "USD", title: "US Dollar", format: "$#" },
                    fields: [
                        { id: "CONTACT_NAME", name: "CONTACT_NAME", label: "First Name", visible: true, required: false, multiple: false, type: "name", placeholder: "", value: null, items: [], bigPic: false },
                        { id: "CONTACT_LAST_NAME", name: "CONTACT_LAST_NAME", label: "Last Name", visible: true, required: false, multiple: false, type: "last-name", placeholder: "", value: null, items: [], bigPic: false },
                        { id: "CONTACT_PHONE", name: "CONTACT_PHONE", label: "Phone", visible: true, required: false, multiple: false, type: "phone", placeholder: "", value: null, items: [], bigPic: false },
                        { id: "CONTACT_EMAIL", name: "CONTACT_EMAIL", label: "E-mail", visible: true, required: false, multiple: false, type: "email", placeholder: "", value: null, items: [], bigPic: false },
                        { id: "DEAL_COMMENTS", name: "DEAL_COMMENTS", label: "Comment", visible: true, required: false, multiple: false, type: "text", placeholder: "", value: null, items: [], bigPic: false },
                    ],
                    agreements: [],
                    dependencies: [],
                    recaptcha: { use: false },
                },
            },
            resources: { app: "app.js", polyfill: "polyfill.js" },
        });
    })();
})();
