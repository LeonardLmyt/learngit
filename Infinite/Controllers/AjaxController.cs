using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using ZtextB.DataCs;
using ZtextB.Models;

namespace ZtextB.Controllers
{
    public class AjaxController : Controller
    {

        /// <summary>
        /// 无限加载
        /// </summary>
        /// <returns></returns>
        public ActionResult Infinite()
        {
            return View();
        }


        /// <summary>
        /// 获取无限加载数据
        /// </summary>
        /// <param name="p"></param>
        /// <param name="s"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetYLInfinite(int p, int s)
        {
            JavaScriptSerializer JSS = new JavaScriptSerializer();
            string data = "";
            if (p < 5)
            {
                data = "{\"status\":true,\"content\":[";
                for (int i = ((p - 1) * s); i < (p * s); i++)
                {
                    data += "{\"t\":" + i + "},";
                }
                data = data.Substring(0, data.Length - 1) + "]}";
            }
            else
            {
                data = "{\"status\":false,\"content\":[]}";
            }
            return JSS.Serialize(data);
        }
    }
}