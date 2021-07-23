var links:HTMLCollectionOf<HTMLAnchorElement> = document.getElementsByTagName("a");//access all links

//access saved Rick Rolls
chrome.storage.sync.get(["Rick Rolls"], function(result:any) {
    
    //loop through links
    for(var i = 0; i < links.length; i++) {
        var index:HTMLAnchorElement = links[i];
        
        //add "(Rick Roll)" warning to all anchor elements with a link to a saved Rick Roll
        if(result["Rick Rolls"].includes(index.href)) {
            index.innerHTML = index.innerHTML + " (Rick Roll)";
        }
    }
});
