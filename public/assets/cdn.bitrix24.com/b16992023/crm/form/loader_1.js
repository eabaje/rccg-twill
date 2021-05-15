//alert('hello');
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
        //# sourceMappingURL=form/embed/unit/script.map.js

        window.b24form.Loader.run({
            form: {
                id: "1",
                sec: "c76mfc",
                lang: "en",
                address: "http://vchurch-rccg.org/",
                views: { click: { type: "panel", position: "right", vertical: "bottom" }, auto: { type: "popup", position: "center", vertical: "bottom", delay: 5 } },
                data: {
                    language: "en",
                    design: {
                        style: "classic",
                        dark: true,
                        border: { bottom: false, top: false, left: false, right: false },
                        color: { primary: "#fff", primaryText: "#333", text: "#fff", background: "--primary00", fieldBorder: "#ffffff00", fieldBackground: "#00000011", fieldFocusBackground: "#00000011" },
                    },
                    title: "Online Giving Form",
                    desc: "Fill The Form Below For Record Purposes After Payment",
                    buttonCaption: "Send",
                    useSign: true,
                    date: { dateFormat: "MM/DD/YYYY", dateTimeFormat: "MM/DD/YYYY H:MI:SS T", sundayFirstly: true },
                    currency: { code: "USD", title: "US Dollar", format: "$#" },
                    fields: [
                          { id: "full_name", name: "full_name", label: "Full Name", visible: true, required: true, multiple: false, type: "name", placeholder: null, value: "", items: [], bigPic: false },
                        { id: "email", name: "email", label: "E-mail", visible: true, required: false, multiple: false, type: "email", placeholder: null, value: "", items: [], bigPic: false },
                        { id: "phone", name: "phone", label: "Phone", visible: true, required: false, multiple: false, type: "phone", placeholder: null, value: "", items: [], bigPic: false },
                        { id: "amount", name: "amount", label: "Amount", visible: true, required: false, multiple: false, type: "last-name", placeholder: null, value: "", items: [], bigPic: false },
                        {
                            id: "donation_type",
                            name: "donation_type",
                            label: "Donation Type",
                            visible: true,
                            required: true,
                            multiple: false,
                            type: "list",
                            placeholder: null,
                            value: null,
                            items: [
                                { label: "TIthes", value: "tithe", selected: false },
                                { label: "Offering", value: "offering", selected: false },
                                { label: "Thanksgiving Offering", value: "thanksgiving", selected: false },
                                { label: "Building Fund Offering / Pledge", value: "pledge", selected: false },
                            ],
                            bigPic: false,
                        },
                      { id: "payment_date", name: "payment_date", label: "Date Of Payment", visible: true, required: true, multiple: false, type: "date", placeholder: null, value: null, items: [], bigPic: false },
                        { id: "bank", name: "bank", label: "Name Of Bank", visible: true, required: false, multiple: false, type: "second-name", placeholder: null, value: "", items: [], bigPic: false },
                    ],
                    agreements: [],
                    dependencies: [],
                    recaptcha: { use: false },
                },
            },
             resources: { app: "app.js", polyfill: "polyfill1.js" },
        });
    })();
})();
