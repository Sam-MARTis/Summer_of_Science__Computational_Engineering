// var ctx: object;
// var canvas: any;
// interface canvasObject{
//     width: number;
//     height: number;
// }
var TIME_STEP = 0.01;
var DoublePendulum = /** @class */ (function () {
    function DoublePendulum(theta1, theta2, omega1, omega2, mass1, mass2, length1, length2, gravity, canvas, ctx, meterToPixel) {
        if (gravity === void 0) { gravity = 9.81; }
        if (meterToPixel === void 0) { meterToPixel = 100; }
        var _this = this;
        this.meterToPixel = 100;
        this.getAlpha1 = function (theta1, omega1, theta2, omega2) {
            return ((-_this.gravity) * (2 * _this.mass1 + _this.mass2) * (Math.sin(theta1)) - (_this.mass2 * _this.gravity * Math.sin(theta1 - 2 * theta2)) - 2 * Math.sin(theta1 - theta2) * _this.mass2 * (Math.pow(omega2, 2) * _this.length2 + Math.pow(omega1, 2) * _this.length1 * Math.cos(theta1 - theta2)))
                / (_this.length1 * (2 * _this.mass1 + _this.mass2 - _this.mass2 * Math.cos(2 * theta1 - 2 * theta2)));
        };
        this.getAlpha2 = function (theta1, omega1, theta2, omega2) {
            return (2 * Math.sin(theta1 - theta2) * (Math.pow(omega1, 2) * _this.length1 * (_this.mass1 + _this.mass2) + _this.gravity * (_this.mass1 + _this.mass2) * Math.cos(theta1) + Math.pow(omega2, 2) * _this.length2 * _this.mass2 * Math.cos(theta1 - theta2)))
                / (_this.length2 * (2 * _this.mass1 + _this.mass2 - _this.mass2 * Math.cos(2 * theta1 - 2 * theta2)));
        };
        this.incrementOmega1 = function (dt) {
            _this.omega1 += _this.alpha1 * dt;
            _this.omega2 += _this.alpha2 * dt;
        };
        this.incrementTheta1 = function (dt) {
            _this.theta1 += _this.omega1 * dt;
            _this.theta2 += _this.omega2 * dt;
        };
        this.rungeKutta = function (dt) {
            var k1 = _this.getAlpha1(_this.theta1, _this.omega1, _this.theta2, _this.omega2) * dt;
            var l1 = _this.getAlpha2(_this.theta1, _this.omega1, _this.theta2, _this.omega2) * dt;
            var k2 = _this.getAlpha1(_this.theta1 + 0.5 * _this.omega1 * dt, _this.omega1 + 0.5 * k1, _this.theta2 + 0.5 * _this.omega2 * dt, _this.omega2 + 0.5 * l1) * dt;
            var l2 = _this.getAlpha2(_this.theta1 + 0.5 * _this.omega1 * dt, _this.omega1 + 0.5 * k1, _this.theta2 + 0.5 * _this.omega2 * dt, _this.omega2 + 0.5 * l1) * dt;
            _this.theta1 += _this.omega1 * dt * 0.5;
            _this.theta2 += _this.omega2 * dt * 0.5;
            _this.omega1 += k2;
            _this.omega2 += l2;
            _this.theta1 += _this.omega1 * dt * 0.5;
            _this.theta2 += _this.omega2 * dt * 0.5;
        };
        this.displayPendulum = function () {
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            var y1 = _this.meterToPixel * _this.length1 * Math.cos(_this.theta1);
            var x1 = _this.meterToPixel * _this.length1 * Math.sin(_this.theta1);
            var x2 = x1 + _this.meterToPixel * _this.length2 * Math.sin(_this.theta2);
            var y2 = y1 + _this.meterToPixel * _this.length2 * Math.cos(_this.theta2);
            _this.ctx.beginPath();
            _this.ctx.moveTo(_this.canvas.width / 2, _this.canvas.height / 2);
            _this.ctx.lineTo(_this.canvas.width / 2 + x1, _this.canvas.height / 2 + y1);
            _this.ctx.lineTo(_this.canvas.width / 2 + x2, _this.canvas.height / 2 + y2);
            _this.ctx.stroke();
        };
        console.log("Double Pendulum created");
        this.theta1 = theta1;
        this.theta2 = theta2;
        this.omega1 = omega1;
        this.omega2 = omega2;
        this.mass1 = mass1;
        this.mass2 = mass2;
        this.length1 = length1;
        this.length2 = length2;
        this.gravity = gravity;
        this.alpha1 = this.getAlpha1(this.theta1, this.omega1, this.theta2, this.omega2);
        this.alpha2 = this.getAlpha2(this.theta1, this.omega1, this.theta2, this.omega2);
        this.canvas = canvas;
        this.ctx = ctx;
        this.meterToPixel = meterToPixel;
        this.ctx.strokeStyle = "white";
    }
    return DoublePendulum;
}());
// const displayPendulum = (displayInformation: number[]): void => {
// }
var angleToRadians = function (angle) {
    return angle * Math.PI / 180;
};
var init = function () {
    var canvas = document.getElementById("DoublePendulumCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    console.log('Done. Init complete');
    var doublePendulum = new DoublePendulum(angleToRadians(80), angleToRadians(120), 0, 0, 1, 1, 1.5, 1, 9.81, canvas, ctx);
    setInterval(function () { main(doublePendulum); }, 10);
};
var main = function (doublePendulum) {
    // console.log('loaded :>>');
    doublePendulum.rungeKutta(TIME_STEP);
    doublePendulum.displayPendulum();
};
document.addEventListener("DOMContentLoaded", init);
