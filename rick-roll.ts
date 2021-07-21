var links:HTMLCollectionOf<HTMLAnchorElement> = document.getElementsByTagName("a");

chrome.storage.sync.get(["Rick Rolls"], function(result:any) {
    for(var i = 0; i < links.length; i++) {
        var index:HTMLAnchorElement = links[i];

        if(result["Rick Rolls"].includes(index.href)) {
            index.innerHTML = index.innerHTML + " (Rick Roll)";
        }
    }
});
