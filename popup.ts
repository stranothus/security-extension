const addRR:HTMLElement|null = document.getElementById("add-RR");//add Rick Roll button

//add a Rick Roll
function addRickRoll() {
    //access the current tab in Chrome
    chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
        let url:string|undefined = tabs[0].url;//get the page URL
        
        //access saved Rick Rolls
        chrome.storage.sync.get(["Rick Rolls"], function(result:any):void {
            let rickRolls:string = result["Rick Rolls"].replace(url || "", "") || "https://www.youtube.com/watch?v=iik25wqIuFo";//store the saved Rick Rolls. If there are none saved yet, set to the most common. Remove any previous mentions of the current URL to maximize storage
			
            rickRolls += url;//add the page URL as a Rick Roll
			
			//save the new Rick Rolls list
            chrome.storage.sync.set({"Rick Rolls": rickRolls}, function() {
                console.log("Rick roll link added");
            });
        });
    });
}

addRR?.addEventListener("click", addRickRoll);//add function to event listener


const removeRR:HTMLElement|null = document.getElementById("remove-RR");//remove Rick Roll button

//remove a Rick Roll
function removeRickRoll() {
	//access the current tab in Chrome
    chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
        let url:string|undefined = tabs[0].url;//get the page URL
		
		//access saved Rick Rolls
        chrome.storage.sync.get(["Rick Rolls"], function(result:any):void {
            let rickRolls:string = result["Rick Rolls"] || "https://www.youtube.com/watch?v=iik25wqIuFo";//store the saved Rick Rolls. If there are none saved yet, set to the most common
			
            rickRolls = rickRolls.replace(url || "", "");//remove the current page URL from the Rick Rolls list if it is present
			
			//save the new Rick Rolls list
            chrome.storage.sync.set({"Rick Rolls": rickRolls}, function() {
                console.log("Link removed");
            });
        });
    });
}

removeRR?.addEventListener("click", removeRickRoll);//add function to event listener
