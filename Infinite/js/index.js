/*
    @param {[String]} pc ������id
    @param {[String]} url �����ַ
    @param {[String]} urldata �����ַ����
    @param {[String]} hf �ӽڵ�����
    @param {[String]} se ����ɹ���־
    @param {[String]} co ����ɹ�����
    @param {[String]} bh �������ײ�X������������
*/
var YLInfinite = (function (param) {
    var a = (document.compatMode == "CSS1Compat"),
        b = true, //�����Ƿ������������״̬
        c = param['urldata'],
        d = param['pc'],
        e = 1,
        h = param['se'] || 'status',
        i = param['co'] || 'content',
        j = param['bh'] || 50,
    F = {
        A: function () { //�жϵ�ǰ�����Ƿ�λ�ڵײ�j���ط�Χ��
            var ch = (a ? document.documentElement.clientHeight : document.body.clientHeight),
                sh = (a ? document.documentElement.scrollHeight : document.body.scrollHeight),
                st = (a ? (document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop) : document.body.scrollTop);
            return (st > sh - ch - j) && b;
        },
        B: function (fn) { //����ģʽ����
            var result;
            return function () {
                return result || (result = fn.apply(this, arguments));
            }
        },
        C: function () { //����loading
            var md = document.createElement('div'),
                sd = document.createElement('div');
            md.className = 'load-container';
            md.id = 'load-container';
            sd.className = 'loader';
            sd.innerHTML = 'Loading...';
            md.appendChild(sd);
            return md;
        },
        D: function (fn, interval) { //��������
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
        E: function () { //����nodata
            var div = document.createElement('div');
            div.innerHTML = 'û�и�������';
            div.id = "nodata";
            div.setAttribute("style", "width: 100%;overflow: hidden;text-align: center;line-height: 35px;background-color: #fff;");
            return div;
        },
        F: function (method, url) { //XHRget��������
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

    //��ʼ������
    document.body.appendChild(F.B(F.C)());
    F.F("GET", param['url']);

    //��������
    window.onscroll = F.D(function () {
        if (F.A() && document.getElementById("nodata") === null) {
            b = false;
            document.getElementById("load-container").style.display = 'block';
            F.F("GET", param['url']);
        }
    }, 100);
});