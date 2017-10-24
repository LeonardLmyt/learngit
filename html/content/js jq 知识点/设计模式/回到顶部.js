var Animate = function (dom) {
    this.startTime = 0; // 动画开始时间
    this.startPos = 0; // 动画开始时，dom 节点的位置，即 dom 的初始位置
    this.endPos = 0; // 动画结束时，dom 节点的位置，即 dom 的目标位置
    this.duration = null; // 动画持续时间

    if (!this.start) {
        Animate.prototype.start = function (endPos, duration) {
            this.startTime = +new Date; // 动画启动时间
            this.startPos = document.body.scrollTop;
            this.endPos = 0; // dom 节点目标位置
            this.duration = duration; // 动画持续事件
            var self = this;
            var timeId = setInterval(function () { // 启动定时器，开始执行动画
                if (self.step() === false) { // 如果动画已结束，则清除定时器
                    clearInterval(timeId);
                }
            }, 19);
        };
        Animate.prototype.step = function () {
            var t = +new Date;
            if (t >= this.startTime + this.duration) {
                this.update(this.endPos);
                return false;
            }
            var pos = function (t, b, c, d) {
                return c * t / d + b;
            };
            this.update(pos(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration));
        }

        Animate.prototype.update = function (pos) {
            document.body.scrollTop = pos;
        };
    }
};

document.getElementById("button").onclick = function () {
    var animate = new Animate();
    animate.start(500, 300);
}