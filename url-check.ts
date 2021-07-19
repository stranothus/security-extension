const url:string = window.location.href;
const noHTTP:string = url.replace(/^[^:]+:\/\//g, "").replace(/www\./g, "");
const paths:string[] = noHTTP.split("/");
const root:string = paths[0];
const domainExtension:string = root.split(".").reverse()[0];

const trustableExtensions:string[] = [
    "com",
    "co",
    "org",
    "net",
    "us"
];

if((localStorage.getItem("security-safe") ? !JSON.parse(localStorage.getItem("security-safe")) : false)) {
    let popup:HTMLElement = document.createElement("div");

    popup.innerHTML = `
        <h1>Block website!</h1>
        <p>You have previously marked this website to be blocked. It may be attempting to steal personal information.</p>
        <p>Dismiss to interact with website or unblock.</p>
        <div id = "security-extension-sus-site-popup-options">
            <button onclick = "window.location.href = 'https://safebrowsing.google.com/safebrowsing/report_phish/?rd=1&hl=en';">Report website</button>
            <button onclick = "document.body.removeChild(document.getElementById('security-extension-sus-site-popup'));">Dismiss</button>
            <button onclick = "localStorage.removeItem('security-safe'); document.body.removeChild(document.getElementById('security-extension-sus-site-popup'));">Unblock website</button>
            <button onclick = "localStorage.setItem('security-safe', true); document.body.removeChild(document.getElementById('security-extension-sus-site-popup'));">Trust website</button>
        </div>`;
    
    popup.id = "security-extension-sus-site-popup";

    document.body.appendChild(popup);
} else if(trustableExtensions.indexOf(domainExtension) === -1 && !(localStorage.getItem("security-safe") ? JSON.parse(localStorage.getItem("security-safe")) : false)) {
    let popup:HTMLElement = document.createElement("div");

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
    
    popup.id = "security-extension-sus-site-popup";

    document.body.appendChild(popup);
}
