/*
    @param {[String]} pc 父容器id
    @param {[String]} url 请求地址
    @param {[String]} urldata 请求地址参数
    @param {[String]} hf 子节点容器
    @param {[String]} se 请求成功标志
    @param {[String]} co 请求成功数据
    @param {[String]} bh 滚动到底部X像素请求数据
*/
var YLInfinite = (function (param) {
    var a = (document.compatMode == "CSS1Compat"),
        b = true, //但是是否属于请求加载状态
        c = param['urldata'],
        d = param['pc'],
        e = 1,
        h = param['se'] || 'status',
        i = param['co'] || 'content',
        j = param['bh'] || 50,
    F = {
        A: function () { //判断当前窗口是否位于底部j像素范围内
            var ch = (a ? document.documentElement.clientHeight : document.body.clientHeight),
                sh = (a ? document.documentElement.scrollHeight : document.body.scrollHeight),
                st = (a ? (document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop) : document.body.scrollTop);
            return (st > sh - ch - j) && b;
        },
        B: function (fn) { //单例模式创建
            var result;
            return function () {
                return result || (result = fn.apply(this, arguments));
            }
        },
        C: function () { //创建loading
            var md = document.createElement('div'),
                sd = document.createElement('div');
            md.className = 'load-container';
            md.id = 'load-container';
            sd.className = 'loader';
            sd.innerHTML = 'Loading...';
            md.appendChild(sd);
            return md;
        },
        D: function (fn, interval) { //函数节流
            var __self = fn,
                timer,
                firstTime = true;
            return function () {
                var args = arguments,
                    __me = this;
                if (firstTime) {
                    __self.apply(__me, args);
                    return firstTime = false;
                }
                if (timer) {
                    return false;
                }
                timer = setTimeout(function () {
                    clearTimeout(timer);
                    timer = null;
                    __self.apply(__me, args);

                }, interval || 500);
            }
        },
        E: function () { //创建nodata
            var div = document.createElement('div');
            div.innerHTML = '没有更多数据';
            div.id = "nodata";
            div.setAttribute("style", "width: 100%;overflow: hidden;text-align: center;line-height: 35px;background-color: #fff;");
            return div;
        },
        F: function (method, url) { //XHRget数据请求
            var x = new XMLHttpRequest();
            x.onreadystatechange = function () {
                if (x.readyState == 4) {
                    if (x.status == 200) {
                        var hld = JSON.parse(JSON.parse(x.responseText || x.responseXML)),
                            hlarr = [];
                        if (hld[h] === true) {
                            hld[i].forEach(function (key, index) {
                                hlarr.push(param['hf'](hld[i][index]));
                            })
                            document.getElementById(d).innerHTML += hlarr.join('');
                        } else {
                            document.getElementById(d).appendChild(F.B(F.E)());
                        }
                    }
                    c.p++;
                    b = true;
                    document.getElementById("load-container").style.display = 'none';
                }
            }
            x.open(method, url + "?" + (function () {
                var hlurld = "";
                for (var hlitem in c) {
                    hlurld += hlitem + "=" + c[hlitem] + "&";
                }
                return hlurld.substring(0, hlurld.length - 1)
            })(), true);
            x.send(null);
        }
    }

    //初始化加载
    document.body.appendChild(F.B(F.C)());
    F.F("GET", param['url']);

    //滚动加载
    window.onscroll = F.D(function () {
        if (F.A() && document.getElementById("nodata") === null) {
            b = false;
            document.getElementById("load-container").style.display = 'block';
            F.F("GET", param['url']);
        }
    }, 100);
});