var vs = (function () {
    "use strict";
    function pe() {
        if (!this.getRandom) {
            //获取特定区域随机数
            pe.prototype.getRandom = function (n, m) {
                return Math.random() * (m - n) + n;
            }
            //获取特定长度随机数(包含字母数字)
            pe.getRandomAlphaNum = function (len) {
                var rdmString = "";
                for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
                return rdmString.substr(0, len);
            }
            //获取数组最小值
            pe.prototype.getMinArray = function (n) {
                return Math.min.apply(Object.create(null), n);
            }
            //获取数组最大值
            pe.prototype.getMaxArray = function (n) {
                return Math.max.apply(Object.create(null), n);
            }

            //内置类型判断
            pe.prototype.getBuiltIn = function (n) {
                return Object.prototype.toString.call(n);
            }
            //获取url参数
            pe.prototype.getUrlParam = function (name) {
                var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
                if (reg.test(window.location.search)) return decodeURIComponent(RegExp.$2.replace(/\+/g, " ")); return "";
            }

            //获取当前时间yyyy-MM-dd hh-MM-ss 格式
            pe.prototype.getDate = function (y) {
                var now = (y === undefined ? new Date() : new Date(y)),
                    y = now.getFullYear(),
                    m = ("0" + (now.getMonth() + 1)).slice(-2),
                    d = ("0" + now.getDate()).slice(-2);
                return y + "-" + m + "-" + d + " " + now.toTimeString().substr(0, 8);
            }
            //获取固定时间格式的方法
            pe.prototype.getFormatDate = function (t, f) {
                var obj = {
                    yyyy: t.getFullYear(),
                    yy: ("" + t.getFullYear()).slice(-2),
                    M: t.getMonth() + 1,
                    MM: ("0" + (t.getMonth() + 1)).slice(-2),
                    d: t.getDate(),
                    dd: ("0" + t.getDate()).slice(-2),
                    H: t.getHours(),
                    HH: ("0" + t.getHours()).slice(-2),
                    h: t.getHours() % 12,
                    hh: ("0" + t.getHours() % 12).slice(-2),
                    m: t.getMinutes(),
                    mm: ("0" + t.getMinutes()).slice(-2),
                    s: t.getSeconds(),
                    ss: ("0" + t.getSeconds()).slice(-2),
                    w: ['日', '一', '二', '三', '四', '五', '六'][t.getDay()]
                };
                return f.replace(/([a-z]+)/ig, function ($1) { return obj[$1] });
            }
            //DOM2级事件处理机制
            pe.prototype.eventUtil = {
                addHandler: function (element, type, handler) {
                    if (element.addEventListenter) {
                        element.addEventListenter(type, handler, false);
                    } else if (element.attachEvent) {
                        element.attachEvent("on" + type, function () { handler.call(element) });
                    } else {
                        element["on" + type] = handler;
                    }
                },
                getEvent: function (event) {
                    return event ? event : window.event;
                },
                getTarget: function (event) {
                    return event.target || event.srcElement;
                },
                preventDefault: function (event) {
                    if (event.preventDefault) {
                        event.preventDefault;
                    } else {
                        event.returnValue = false;
                    }
                },
                removeHandler: function (element, type, handler) {
                    if (element.removeEventListenter) {
                        element.removeEventListenter(type, handler, false);
                    } else if (element.detachEvent) {
                        element.detachEvent("on" + type, handler);
                    } else {
                        element["on" + type] = null;
                    }
                },
                stopPropagation: function (event) {
                    if (event.stopPropagation) {
                        event.stopPropagation;
                    } else {
                        event.cancelBubble = true;
                    }
                }
            }
            //cookie机制
            pe.prototype.cookieUtil = {
                get: function (name) {
                    var cookieName = encodeURIComponent(name) + "=",
                        cookieStart = document.cookie.indexOf(cookieName),
                        cookieValue = null;
                    if (cookieStart > -1) {
                        var cookieEnd = document.cookie.indexOf(";", cookieStart);
                        if (cookieEnd == -1) {
                            cookieEnd = document.cookie.length;
                        }
                        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart +
                            cookieName.length, cookieEnd));
                    }
                    return cookieValue;
                },
                set: function (name, value, expires, path, domain, secure) { //expires按天数设置
                    var cookieText = encodeURIComponent(name) + "=" +
                        encodeURIComponent(value),
                        d = new Date();
                    d.setDate(d.getDate() + Number(expires));
                    if (d instanceof Date) {
                        cookieText += "; expires=" + d.toGMTString();
                    }
                    if (path) {
                        cookieText += "; path=" + path;
                    }
                    if (domain) {
                        cookieText += "; domain=" + domain;
                    }
                    if (secure) {
                        cookieText += "; secure";
                    }
                    document.cookie = cookieText;
                },
                unset: function (name, path, domain, secure) {
                    this.set(name, "", new Date(0), path, domain, secure);
                }
            }

            //判断访问终端
            pe.prototype.browserUtil = {
                versions: function () {
                    var u = navigator.userAgent, app = navigator.appVersion;
                    return {
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                        qq: u.match(/\sQQ/i) == " qq" //是否QQ
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            }
            //获取尺寸
            pe.prototype.sizeUtil = function () {
                var c = document.compatMode == "CSS1Compat";
                return {
                    clientWidth: c ? document.documentElement.clientWidth : document.body.clientWidth, //获取网页可见区域宽
                    clientHeight: c ? document.documentElement.clientHeight : document.body.clientHeight,//获取网页可见区域高
                    scrollWidth: c ? document.documentElement.scrollWidth : document.body.scrollWidth, //网页正文全文宽
                    scrollHeight: c ? document.documentElement.scrollHeight : document.body.scrollHeight,//网页正文全文高
                    scrollTop: c ? (document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop) : document.body.scrollTop, //网页被卷去的高(js文件加载body前会报错)
                    scrollLeft: c ? (document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft) : document.body.scrollLeft,//网页被卷去的左
                    screenTop: window.screenTop > 0 ? window.screenTop : window.screenY, //浏览器距屏幕顶部宽（IE中会加上浏览器头部宽度）
                    screenLeft: window.screenLeft > 0 ? window.screenLeft : window.screenX, //浏览器距屏幕左部宽
                    offsetWidth: document.documentElement.offsetWidth, //获取网页可见区域宽(包括边线的宽)
                    offsetHeight: document.documentElement.offsetHeight, //获取网页可见区域高(包括边线的高)
                    screenWidth: window.screen.width, //屏幕分辨率的宽
                    screenHeight: window.screen.height, //屏幕分辨率的高
                    blockWidth: function (d) { return d == undefined ? 0 : d.offsetWidth }, //元素宽
                    blockHeight: function (d) { return d == undefined ? 0 : d.offsetHeight }, //元素高
                    blockTop: function (d) { return d == undefined ? 0 : d.offsetTop }, //元素距父元素高（相较于定位，如果没有的话父元素为body）
                    blockLeft: function (d) { return d == undefined ? 0 : d.offsetLeft } //元素距父元素左（相较于定位，如果没有的话父元素为body）
                };
            }()
        }
    }
    return (new pe());
})();






