// Prevent variables from being global      
(function () {

      /*
          1. Inject CSS which makes iframe invisible
      */
    
    var div = document.createElement('div'),
        ref = document.getElementsByTagName('base')[0] || 
              document.getElementsByTagName('script')[0],
        xmlhttp = new XMLHttpRequest(),
        iref,
        ssheet = document.createElement('link'),
        cssFile = "../assets/css/hotella-res.css",
        mobileCss = "../assets/css/hotella-res-mobi.css",
        mobileHref = "https://www.yourreservation.net/tb3/mobile/index.cfm?bf=mhotelella";

    div.innerHTML = '&shy;<style> iframe { visibility: hidden; } </style>';

    ssheet.rel = 'stylesheet';
    ssheet.href = '../assets/css/hotella-res.css';
    ssheet.type = 'text/css';

    ref.parentNode.insertBefore(ssheet,ref);
    ref.parentNode.insertBefore(div, ref);

    function createStyleInFrame() {
        iref = window.frames[0].document.getElementsByTagName("link")[0];
        xmlhttp.open("GET", cssFile, false);
        xmlhttp.send();
        var el = document.createElement('style');
        el.type = "text/css";
        el.innerHTML = xmlhttp.response;
        iref.parentNode.insertBefore(el, iref.nextSibling);
        console.log('loaded..');
    }

        
    /*
        2. When window loads, remove that CSS, 
           making iframe visible again
    */
    
    window.onload = function() {
        var winWidth = window.innerWidth;
        if (winWidth < 960) {
            ssheet.href = mobileCss;
            $('#reservations').attr('src', mobileHref);
            cssFile = mobileCss;
        } 
        $('#reservations').load(function(){
            createStyleInFrame(); console.log('framing'); 
        });
        div.parentNode.removeChild(div);
    };
    
})();
