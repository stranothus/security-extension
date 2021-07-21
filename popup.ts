const addRR:HTMLElement|null = document.getElementById("add-RR");

function addRickRoll() {
    chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
        let url:string|undefined = tabs[0].url;
        chrome.storage.sync.get(["Rick Rolls"], function(result:any):void {
            let rickRolls:string = result["Rick Rolls"].replace(url || "", "") || "https://www.youtube.com/watch?v=iik25wqIuFo";
            rickRolls += url;

            chrome.storage.sync.set({"Rick Rolls": rickRolls}, function() {
                console.log("Rick roll link added");
            });
        });
    });
}

addRR?.addEventListener("click", addRickRoll);


const removeRR:HTMLElement|null = document.getElementById("remove-RR");

function removeRickRoll() {
    chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
        let url:string|undefined = tabs[0].url;
        chrome.storage.sync.get(["Rick Rolls"], function(result:any):void {
            let rickRolls:string = result["Rick Rolls"] || "https://www.youtube.com/watch?v=iik25wqIuFo";
            rickRolls = rickRolls.replace(url || "", "");

            chrome.storage.sync.set({"Rick Rolls": rickRolls}, function() {
                console.log("Link removed");
            });
        });
    });
}

removeRR?.addEventListener("click", removeRickRoll);
