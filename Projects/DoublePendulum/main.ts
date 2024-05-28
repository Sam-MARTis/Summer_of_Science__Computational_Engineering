
// var ctx: object;
// var canvas: any;
// interface canvasObject{
//     width: number;
//     height: number;
// }
const TIME_STEP = 0.01;
interface ctxObject{
    clearRect: (x: number, y: number, width: number, height: number) => void;
    beginPath: () => void;
    moveTo: (x: number, y: number) => void;
    lineTo: (x: number, y: number) => void;
    stroke: () => void;
    strokeStyle: string;
}

class DoublePendulum{
    theta1: number;
    theta2: number;
    omega1: number;
    omega2: number;
    mass1: number;
    mass2: number;
    length1: number;
    length2: number;
    gravity: number;
    alpha1: number;
    alpha2: number;
    canvas: any
    ctx: ctxObject;
    meterToPixel: number = 100;
    constructor(theta1: number, theta2: number, omega1: number, omega2: number, mass1: number, mass2: number, length1: number, length2: number, gravity: number = 9.81, meterToPixel: number = 100, canvas: any, ctx: ctxObject){
        // console.log("Double Pendulum created");
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


    getAlpha1 = (theta1: number, omega1: number, theta2: number, omega2: number): number => {
        return ((-this.gravity)*(2*this.mass1 + this.mass2)*(Math.sin(theta1)) - (this.mass2*this.gravity*Math.sin(theta1 - 2*theta2)) - 2*Math.sin(theta1 - theta2)*this.mass2*(Math.pow(omega2, 2)*this.length2 + Math.pow(omega1, 2)*this.length1*Math.cos(theta1 - theta2)))
        /(this.length1*(2*this.mass1 + this.mass2 - this.mass2*Math.cos(2*theta1 - 2*theta2)));
    }
    getAlpha2 = (theta1: number, omega1: number, theta2: number, omega2: number): number => {
        return (2*Math.sin(theta1 - theta2)*(Math.pow(omega1, 2)*this.length1*(this.mass1 + this.mass2) + this.gravity*(this.mass1 + this.mass2)*Math.cos(theta1) + Math.pow(omega2, 2)*this.length2*this.mass2*Math.cos(theta1 - theta2)))
        /(this.length2*(2*this.mass1 + this.mass2 - this.mass2*Math.cos(2*theta1 - 2*theta2)));
    }
    incrementOmega1 = (dt: number): void => {
        this.omega1 += this.alpha1*dt;
        this.omega2 += this.alpha2*dt;
    }
    incrementTheta1 = (dt: number): void => {
        this.theta1 += this.omega1*dt;
        this.theta2 += this.omega2*dt;
    }

    rungeKutta = (dt: number): void => {
        let k1: number = this.getAlpha1(this.theta1, this.omega1, this.theta2, this.omega2) * dt;
        let l1: number = this.getAlpha2(this.theta1, this.omega1, this.theta2, this.omega2) * dt;
        let k2: number = this.getAlpha1(this.theta1 + 0.5*this.omega1*dt, this.omega1 + 0.5*k1, this.theta2 + 0.5*this.omega2*dt, this.omega2 + 0.5*l1) * dt;
        let l2: number = this.getAlpha2(this.theta1 + 0.5*this.omega1*dt, this.omega1 + 0.5*k1, this.theta2 + 0.5*this.omega2*dt, this.omega2 + 0.5*l1) * dt;

        this.theta1 += this.omega1*dt*0.5;
        this.theta2 += this.omega2*dt*0.5;
        this.omega1 += k2;
        this.omega2 += l2;
        this.theta1 += this.omega1*dt*0.5;
        this.theta2 += this.omega2*dt*0.5;
        
    }
    displayPendulum = (): void => {
        // console.log("Drawing self - Pendulum")
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let y1: number = this.meterToPixel* this.length1*Math.cos(this.theta1);
        let x1: number = this.meterToPixel* this.length1*Math.sin(this.theta1);
        let x2: number = x1 + this.meterToPixel*this.length2*Math.sin(this.theta2);
        let y2: number = y1 + this.meterToPixel*this.length2*Math.cos(this.theta2);
        this.ctx.beginPath();
        
        this.ctx.moveTo(this.canvas.width/2, this.canvas.height/2);
        this.ctx.lineTo(this.canvas.width/2 + x1, this.canvas.height/2 + y1);
        this.ctx.lineTo(this.canvas.width/2 + x2, this.canvas.height/2 + y2);
        this.ctx.stroke();
    
    }
    getAllResizeValues = (): number[] => {
        return [this.theta1, this.theta2, this.omega1, this.omega2, this.mass1, this.mass2, this.length1, this.length2, this.gravity,  this.meterToPixel]
    }



}

// const displayPendulum = (displayInformation: number[]): void => {


// }

const angleToRadians = (angle: number): number => {
    return angle * Math.PI/180;
}
const resizeHandle = (canvas: any): void => {
    // console.log('Resizing');
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    doublePendulum = new DoublePendulum(...doublePendulum.getAllResizeValues(), canvas,ctx )
    // console.log(new DoublePendulum(...doublePendulum.getAllResizeValues(), canvas, ctx))

}

let canvas: any
let ctx: ctxObject
let doublePendulum: DoublePendulum

const init = (): void => {
    canvas= document.getElementById("DoublePendulumCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    console.log('Done. Init complete');
    doublePendulum = new DoublePendulum(angleToRadians(60),angleToRadians(120), 0, 0, 1, 1, 1, 1, 9.81,100, canvas, ctx);
    setInterval(()=> {main(doublePendulum)}, 10);
    window.addEventListener('resize', () => {resizeHandle(canvas)})
    
}

const main = (doublePendulum: DoublePendulum): void => {
    
    doublePendulum.rungeKutta(TIME_STEP);
    doublePendulum.displayPendulum();


}








window.addEventListener("DOMContentLoaded", init);