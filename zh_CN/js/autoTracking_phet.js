var docIdentifier = '/download';
var simIdentifier = ''; // No identifier for now

function listenToClicks() {
    var domains    = ["phet.colorado.edu"];
    var fileTypes  = [".doc",".xls",".exe",".zip",".pdf",".mp3",".bin",".mp4",".mov",".ppt"];

    if (document.getElementsByTagName) {
        var aTags = document.getElementsByTagName('a');

        ANCHOR:
        for (var i = 0; i < aTags.length; i++) {
            if (aTags[i]=="")                                         { continue ANCHOR; }
            if (typeof aTags[i].hostname == "undefined")              { continue ANCHOR; }
            if (aTags[i].protocol.indexOf("javascript") != -1)        { continue ANCHOR; }

            DOMAIN:
            for (var j = 0; j < domains.length; j++) {
                if (aTags[i].href.indexOf("http://" + domains[j]) == 0) {  //if the anchor tag we're checking matches a domain from our list

                    FILE:
                    // look for a file extension
                    for (k = 0; k < fileTypes.length; k++){
                        if (aTags[i].pathname.indexOf(fileTypes[k]) != -1) {
                            // file extension was found, go to next anchor
                            startListening(aTags[i],"click",trackDocuments);
                            continue ANCHOR;
                        }
                    }

                    // look for a sim file extension for direct download
                    if (
                        (aTags[i].pathname.indexOf(".jnlp") != -1) &&
                        (aTags[i].pathname.indexOf("sims") != -1)) {
                        // file extension was found, go to next anchor
                        startListening(aTags[i],"click",trackOnlineSims);
                        continue ANCHOR;
                    }

                    // look for a sim that is run offline
                    if (aTags[i].pathname.indexOf("get-run-offline") != -1) {
                        // file extension was found, go to next anchor
                        startListening(aTags[i],"click",trackOfflineSims);
                        continue ANCHOR;
                    }

                    // file extension was not found, see if we should use Linker
                    if (window.location.href.indexOf(domains[j]) == -1) {   // and our current location.href does not match
                        // then use _link and go to the next anchor tag
                        startListening(aTags[i],"click",useLinker);
                        continue ANCHOR;
                    }
                    else {
                        // otherwise it is a link on the same domain, so just go to the next anchor tag
                        continue ANCHOR;
                    }
                }
            }

            // if we were tracking external links, we would do it here, after looping through all of the domains in our list and not finding a match.

        }
    }
}

function startListening (obj,evnt,func) {
    if (obj.addEventListener) {
        obj.addEventListener(evnt, func, false);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + evnt, func);
    }
}

function useLinker (evnt) {
    var lnk;
    if (evnt.srcElement) {
        var elmnt = evnt.srcElement;
        while (elmnt.tagName != "a") {
            var newelmnt = elmnt.parentNode;
            elmnt = newelmnt;
        }
        lnk = "http://" + elmnt.hostname + "/" + elmnt.pathname + elmnt.search;
    }
    else {
        lnk = "http://" + this.hostname + this.pathname + this.search;
    }

    if (typeof(benchmarkTracker) == "object") {
        benchmarkTracker._link(lnk);
        if (evnt.preventDefault) {
            evnt.preventDefault();
        }
        else {
            evnt.returnValue=false;
        }

        return false;
    }

    // Remove warnings in the console
    return undefined;
}

// trackDocuments:  calls _trackPageview before downloading a file
function trackDocuments (evnt) {
    var url = (evnt.srcElement) ? "/" + evnt.srcElement.pathname : this.pathname;
    url = docIdentifier + url;
    if (typeof(benchmarkTracker) == "object") {
        benchmarkTracker._gat._anonymizeIp();
        benchmarkTracker._trackPageview(url);
    }

    if (typeof(overallTracker) == "object") {
        overallTracker._gat._anonymizeIp();
        overallTracker._trackPageview(url);
    }
}

function trackOnlineSims(evnt) {
    var url = (evnt.srcElement) ? "/" + evnt.srcElement.pathname : this.pathname;
    url = simIdentifier + url;
    if (typeof(benchmarkTracker) == "object") {
        benchmarkTracker._gat._anonymizeIp();
        benchmarkTracker._trackPageview(url);
    }

    if (typeof(overallTracker) == "object") {
        overallTracker._gat._anonymizeIp();
        overallTracker._trackPageview(url);
    }
}

function trackOfflineSims(evnt) {
    target = (evnt.srcElement) ? evnt.srcElement : this;
    // Get the pathname including the query string
    // TODO: make efficient
    idx = target.href.indexOf(target.pathname);
    url = simIdentifier + target.href.substr(idx);
    if (typeof(benchmarkTracker) == "object") {
        benchmarkTracker._gat._anonymizeIp();
        benchmarkTracker._trackPageview(url);
    }

    if (typeof(overallTracker) == "object") {
        overallTracker._gat._anonymizeIp();
        overallTracker._trackPageview(url);
    }
}

// register an event listener to run the script when the load event fires.
startListening(window, 'load', listenToClicks);
