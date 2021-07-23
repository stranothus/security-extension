//common domain extensions which would likely be secure
const trustableExtensions:string[] = [
    "com", 
    "co",
    "org",
    "net",
    "us"
];

//check if the URL has already been flagged as unsafe
if((localStorage.getItem("security-safe") ? !JSON.parse(localStorage.getItem("security-safe") || "false") : false)) {
    
    //create popup alert element
    let popup:HTMLElement = document.createElement("div");
    
    /*
        populate alert with options to
        
        1. Report the website with the link provided by Google
        2. Dismiss the alert and view anyways. The alert will appear again on future website visits
        3. Unblock the website. This will dismiss the warning and unblock but not trust the webite
        4. Trust the website. The website will no longer be blocked and the warning will not appear in the future
    */
    popup.innerHTML = `
        <h1>Blocked website!</h1>
        <p>You have previously marked this website to be blocked. It may be attempting to steal personal information.</p>
        <p>Dismiss to interact with website or unblock.</p>
        <div id = "security-extension-sus-site-popup-options">
            <button onclick = "window.location.href = 'https://safebrowsing.google.com/safebrowsing/report_phish/?rd=1&hl=en';">Report website</button>
            <button onclick = "document.body.removeChild(document.getElementById('security-extension-sus-site-popup'));">Dismiss</button>
            <button onclick = "localStorage.removeItem('security-safe'); document.body.removeChild(document.getElementById('security-extension-sus-site-popup'));">Unblock website</button>
            <button onclick = "localStorage.setItem('security-safe', true); document.body.removeChild(document.getElementById('security-extension-sus-site-popup'));">Trust website</button>
        </div>`;
    
    popup.id = "security-extension-sus-site-popup";//id the element for styling

    document.body.appendChild(popup);//append the element to the page
}
//otherwise, check if the domain extension is questionable and the website is not trusted
else if(trustableExtensions.indexOf(domainExtension) === -1 && !(localStorage.getItem("security-safe") ? JSON.parse(localStorage.getItem("security-safe") || "false") : false)) {
    
    //create popup alert element
    let popup:HTMLElement = document.createElement("div");
    
    /*
        populate alert with options to
        
        1. Report the website with the link provided by Google
        2. Dismiss the alert and view anyways. The alert will appear again on future website visits
        3. Block the website. The alert will always appear in the future and will remind you the website has been blocked
        4. Trust the website. The warning will not appear in the future
    */
    popup.innerHTML = `
        <h1>Warning!</h1>
        <p>This website is not using one of the standard domain extensions. Please double check it is not impersonating a trusted site before submitting any confidential information.</p>
        <p>Dismiss to interact with website.</p>
        <div id = "security-extension-sus-site-popup-options">
            <button onclick = "window.location.href = 'https://safebrowsing.google.com/safebrowsing/report_phish/?rd=1&hl=en';">Report website</button>
            <button onclick = "document.body.removeChild(document.getElementById('security-extension-sus-site-popup'));">Dismiss</button>
            <button onclick = "localStorage.setItem('security-safe', false);">Block website</button>
            <button onclick = "localStorage.setItem('security-safe', true); document.body.removeChild(document.getElementById('security-extension-sus-site-popup'));">Trust website</button>
        </div>`;
    
    popup.id = "security-extension-sus-site-popup";//id the element for styling

    document.body.appendChild(popup);//append the element to the page
}
