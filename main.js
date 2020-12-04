/* Lightweight impl for DOMContentLoaded event. Refer to 
https://github.com/jfriend00/docReady/blob/master/docready.js for a more comprehensive JS 
only solution */
let ready = (callback) => {
    if (document.readyState!='loading') callback();
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
},
History = window.History,
manualStateChange = true;
iLinks = ['one', 'two'],
_l = console.log,
$ = (e) => {
    return document.getElementsByClassName(e);
},
bindEvents = () => {
    for( let i = 0; i<iLinks.length; i++) {
        $(iLinks[i])[0].addEventListener('click', (e) => {
            manualStateChange = false;
            e.preventDefault();
            History.pushState(null, this.title, "?currentUI=" + e.target.dataset.target);
            return false; // optional, for a links with a set href attr;
	    });
    }
};

//Listener for 'navigate' events
History.Adapter.bind(window, 'statechange', () => { 
    let State = History.getState(); 
    console.log('statechange:', State.data, State.title, State.url);
    if(manualStateChange) {
        //Back/Forward button was pressed.
        let qs = window.location.search.substring(1);
        //use qs here to rUpdate UI w.r.t State.URL
    }
    manualStateChange = true;
});

ready(() => {
    bindEvents();
});