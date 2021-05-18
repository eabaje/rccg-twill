<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>vChurch -Redeemed Christian Church of God  </title>
        <meta name="description" content="">
        <meta name="title" content="">
        <meta name="author" content="OctoberCMS">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="generator" content="OctoberCMS">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="icon" type="image/png" href="{{asset('assets/images/rccg.png')}}">

        <link href="{{asset('assets/js/main/core/css/core.min.css')}}" type="text/css"  rel="stylesheet" />
        <link href="{{asset('assets/cdn.bitrix24.com/b16992023/crm/form/app.bundle.css')}}" type="text/css"  rel="stylesheet" />
      

        <style type="text/css">
                        :root {
                            --theme-color-primary: #4fd2c2;
                            --theme-color-primary-darken-1: hsl(172.67, 59%, 55%);
                            --theme-color-primary-darken-2: hsl(172.67, 59%, 52%);
                            --theme-color-primary-darken-3: hsl(172.67, 59%, 47%);
                            --theme-color-primary-lighten-1: hsl(172.67, 59%, 67%);
                            --theme-color-primary-opacity-0_1: rgba(79, 210, 194, 0.1);
                            --theme-color-primary-opacity-0_2: rgba(79, 210, 194, 0.2);
                            --theme-color-primary-opacity-0_3: rgba(79, 210, 194, 0.3);
                            --theme-color-primary-opacity-0_4: rgba(79, 210, 194, 0.4);
                            --theme-color-primary-opacity-0_6: rgba(79, 210, 194, 0.6);
                            --theme-color-primary-opacity-0_8: rgba(79, 210, 194, 0.8);
                            --theme-color-primary-opacity-0_9: rgba(79, 210, 194, 0.9);
                            --theme-color-main: #999999;
                            --theme-color-secondary: hsl(172.67, 20%, 80%);
                            --theme-color-title: #111111;
                        }
                    </style>
        <script type="text/javascript" data-skip-moving="true">(function(w, d, n) {
        
        var cl = "bx-core";
        var ht = d.documentElement;
        var htc = ht ? ht.className : undefined;
        if (htc === undefined || htc.indexOf(cl) !== -1)
        {
        return;
        }
        
        var ua = n.userAgent;
        if (/(iPad;)|(iPhone;)/i.test(ua))
        {
        cl += " bx-ios";
        }
        else if (/Android/i.test(ua))
        {
        cl += " bx-android";
        }
        
        cl += (/(ipad|iphone|android|mobile|touch)/i.test(ua) ? " bx-touch" : " bx-no-touch");
        
        cl += w.devicePixelRatio && w.devicePixelRatio >= 2
        ? " bx-retina"
        : " bx-no-retina";
        
        var ieVersion = -1;
        if (/AppleWebKit/.test(ua))
        {
        cl += " bx-chrome";
        }
        else if ((ieVersion = getIeVersion()) > 0)
        {
        cl += " bx-ie bx-ie" + ieVersion;
        if (ieVersion > 7 && ieVersion < 10 && !isDoctype())
        {
        cl += " bx-quirks";
        }
        }
        else if (/Opera/.test(ua))
        {
        cl += " bx-opera";
        }
        else if (/Gecko/.test(ua))
        {
        cl += " bx-firefox";
        }
        
        if (/Macintosh/i.test(ua))
        {
        cl += " bx-mac";
        }
        
        ht.className = htc ? htc + " " + cl : cl;
        
        function isDoctype()
        {
        if (d.compatMode)
        {
        return d.compatMode == "CSS1Compat";
        }
        
        return d.documentElement && d.documentElement.clientHeight;
        }
        
        function getIeVersion()
        {
        if (/Opera/i.test(ua) || /Webkit/i.test(ua) || /Firefox/i.test(ua) || /Chrome/i.test(ua))
        {
        return -1;
        }
        
        var rv = -1;
        if (!!(w.MSStream) && !(w.ActiveXObject) && ("ActiveXObject" in w))
        {
        rv = 11;
        }
        else if (!!d.documentMode && d.documentMode >= 10)
        {
        rv = 10;
        }
        else if (!!d.documentMode && d.documentMode >= 9)
        {
        rv = 9;
        }
        else if (d.attachEvent && !/Opera/.test(ua))
        {
        rv = 8;
        }
        
        if (rv == -1 || rv == 8)
        {
        var re;
        if (n.appName == "Microsoft Internet Explorer")
        {
        re = new RegExp("MSIE ([0-9]+[\.0-9]*)");
        if (re.exec(ua) != null)
        {
        rv = parseFloat(RegExp.$1);
        }
        }
        else if (n.appName == "Netscape")
        {
        rv = 11;
        re = new RegExp("Trident/.*rv:([0-9]+[\.0-9]*)");
        if (re.exec(ua) != null)
        {
        rv = parseFloat(RegExp.$1);
        }
        }
        }
        
        return rv;
        }
        
        })(window, document, navigator);</script>





        <link href="{{asset('assets/js/intranet/intranet-common.min.css') }}" type="text/css"  rel="stylesheet" />
        <link href="{{asset('assets/js/main/sidepanel/css/sidepanel.min.css') }}" type="text/css"  rel="stylesheet" />
        <link href="{{asset('assets/js/landing/css/landing_public.min.css') }}" type="text/css"  rel="stylesheet" />
        <link href="{{asset('assets/components/rccg/landing.pub/templates/.default/style.min.css') }}" type="text/css"  rel="stylesheet" />
        <link href="{{asset('assets/templates/landing24/assets/vendor/bootstrap/bootstrap.min.css') }}" type="text/css"  data-template-style="true"  rel="stylesheet" />
        <link href="{{asset('assets/templates/landing24/theme.min.css') }}" type="text/css"  data-template-style="true"  rel="stylesheet" />
        <link href="{{asset('assets/templates/landing24/assets/css/custom-grid.min.css') }}" type="text/css"  data-template-style="true"  rel="stylesheet" />
        <link href="{{asset('assets/templates/landing24/template_styles.min.css') }}" type="text/css"  data-template-style="true"  rel="stylesheet" />
        
        
        
        
        
        
        
        
        <link href="{{asset('assets/templates/landing24/assets/vendor/icon-awesome/font-awesome.min.css') }}" type="text/css"   rel="stylesheet" />
      <!--  <link rel="preload" href="{{asset('assets/templates/landing24/assets/vendor/icon/fa/font.woff') }}" as="font" crossorigin="anonymous" type="font/woff" crossorigin>
        <link rel="preload" href="{{asset('assets/templates/landing24/assets/vendor/icon/fa/font.woff2') }}" as="font" crossorigin="anonymous" type="font/woff2" crossorigin> -->
        
        <link 
        rel="preload" 
        as="style" 
        onload="this.removeAttribute('onload');this.rel='stylesheet'" 
        data-font="g-font-open-sans" 
        data-protected="true" 
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic">
    <noscript>
        <link
            rel="stylesheet" 
            data-font="g-font-open-sans" 
            data-protected="true" 
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic">
    </noscript>
    <style>
        body {
            font-weight: 400;
            font-family: "Open Sans", Helvetica, Arial, sans-serif;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            -moz-font-feature-settings: "liga", "kern";
            text-rendering: optimizelegibility;
        }
        </style>
        <style>
        h1, h2, h3, h4, h5, h6 {
            font-family: "Open Sans", Helvetica, Arial, sans-serif;
        }
        </style>
        <style>
        html {font-size: 14px;}
        body {font-size: 1.14286rem;}
        .g-font-size-default {font-size: 1.14286rem;}
        </style>

       @yield('styles')
    </head>
    <body >

        <main>
        <!-- Header -->
       
            
             @include('partials.header')    

        <!-- Content -->
       
            @yield('content')
       

        <!-- Footer -->
        </main> 
            
             @include('partials.footer')
        

        <script type="text/javascript" src="{{asset('assets/js/ui/dexie/dist/dexie.bitrix.bundle.min.js') }}"></script>
        <script type="text/javascript" src="{{asset('assets/js/main/core/core_ls.min.js') }}"></script>
        <script type="text/javascript" src="{{asset('assets/js/main/core/core_fx.min.js') }}"></script>
        <script type="text/javascript" src="{{asset('assets/js/main/core/core_frame_cache.min.js') }}"></script>
        <script type="text/javascript" src="{{asset('assets/js/landing/metrika/dist/metrika.bundle.min.js') }}"></script>
        <script type="text/javascript" src="{{asset('assets/js/main/pageobject/pageobject.min.js') }}"></script>
        <script type="text/javascript" src="{{asset('assets/js/main/sidepanel/manager.min.js') }}"></script>
        <script type="text/javascript" src="{{asset('assets/js/main/sidepanel/slider.min.js') }}"></script>
       
        <script>
            (function(w,d,u){
                var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
                var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
            })(window,document,"{{asset('assets/cdn.bitrix24.com/b16992023/landing/assets/assets_webpack.js') }}");
        </script>
       
         @yield('scripts')
        
      
        
        
        
        
        
      
       

        
    </body>
</html>
