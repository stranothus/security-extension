interface String{
    reverse():void
}

String.prototype.reverse = function():string {
    let r:string = this.toString().split("").reverse().join("");
    return r;
}

const url:string = window.location.href;
const noHTTP:string = url.replace(/^[^:]+:\/\//g, "").replace(/www\./g, "");
const paths:string[] = noHTTP.split("/");
const root:string = paths[0];
const domainExtension:string = root.split(".").reverse()[0];
