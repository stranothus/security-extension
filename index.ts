//create a string.reverse() method 
interface String{
    reverse():void
}

//defines string.reverse()
String.prototype.reverse = function():string {
    let r:string = this.toString().split("").reverse().join("");
    return r;
}

//the URL
const url:string = window.location.href;

//the URL without the interent protocol (typically HTTP or HTTPS)
const noHTTP:string = url.replace(/^[^:]+:\/\//g, "").replace(/www\./g, "");

//each sub path of the URL
const paths:string[] = noHTTP.split("/");

//the domain
const root:string = paths[0];

//the domain extension (i.e. com, co, us, org, net, etc.)
const domainExtension:string = root.split(".").reverse()[0];//
