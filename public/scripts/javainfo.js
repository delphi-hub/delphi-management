// As a version string, this might be '1.4.2_31'.  
// I.E. it is not a 'number' but a 'string' and therefore must be treated as a string.
var highestVersion = 'undefined';

// not available in IE, but all other known desktop browsers
var mimes = window.navigator.mimeTypes;
// not available in IE, but all other known desktop browsers
var plugins = window.navigator.plugins; 

function getBrowserName() {
    var s = "";
    s = navigator['appCodeName'];
    return s;   
}

function getPlatform() {
    var s = "";
    s = navigator['platform'];
    return s;   
}

function getComputerName() {
    try {
        var host1 = window.location.hostname;
        return host1;
    }
    catch (e) {
    }
}

function getScalaVersion() {
    //not yet implemented
}

function isJava() {
    return (
        typeof(navigator.javaEnabled) !== 'undefined' &&
        navigator.javaEnabled());
}

function getVersion() {
    var version = 0;
    if (isJava()) {
        version = 1.1;
    }
    for (var ii=0; ii<mimes.length; ii++) {
        var t = mimes[ii].type;
        if (t.indexOf("java")>0 &&
            t.indexOf("jpi")>0 &&
            t.indexOf("applet")>0
            ) {
            var parts = t.split("=");
            version = parts[parts.length-1];
        }
    }
    if (highestVersion=='undefined') highestVersion = version;
    return version;
}

function getClassName(val) {
    var className = undefined;

    if (
        (val) ||
        (!val) ||
        (val!=="undefined")
        ) {
        className = val;
    }

    return className;
}

function getBrowserInfo() {
    var s = "";

    var props = [
        'appCodeName','appName','appVersion',
        'userAgent',
        'platform','cookieEnabled'
    ];

    s += "<table border='1'>";
    for (var i=0; i<props.length; i++) {
        s+= "<tr>";
        s+= "<td><b>";
        s+= props[i];
        s+= "</b></td>";
        s+= "<td>";
        s+= navigator[props[i]];
        s+= "</td>";
        s+= "</tr>";
    }
    s += "</table>";

    return s;
}