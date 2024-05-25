
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
    constructor(theta1: number, theta2: number, omega1: number, omega2: number, mass1: number, mass2: number, length1: number, length2: number, gravity: number = 9.81){
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
        this.alpha1 = this.getAlpha1();
        this.alpha2 = this.getAlpha2();

    }


    getAlpha1 = (theta: number, omega: number): number => {
        return ((-this.gravity)*(2*this.mass1 + this.mass2)*(Math.sin(theta)) - (this.mass2*this.gravity*Math.sin(theta - 2*theta)) - 2*Math.sin(theta - theta)*this.mass2*(Math.pow(this.omega2, 2)*this.length2 + Math.pow(this.omega1, 2)*this.length1*Math.cos(theta - theta)))
        /(this.length1*(2*this.mass1 + this.mass2 - this.mass2*Math.cos(2*theta - 2*theta)));
    }
    getAlpha2 = (theta:number, omega:number): number => {
        return (2*Math.sin(this.theta1 - this.theta2)*(Math.pow(this.omega1, 2)*this.length1*(this.mass1 + this.mass2) + this.gravity*(this.mass1 + this.mass2)*Math.cos(this.theta1) + Math.pow(this.omega2, 2)*this.length2*this.mass2*Math.cos(this.theta1 - this.theta2)))
        /(this.length2*(2*this.mass1 + this.mass2 - this.mass2*Math.cos(2*this.theta1 - 2*this.theta2)));
    }
    incrementOmega1 = (dt: number): void => {
        this.omega1 += this.alpha1*dt;
        this.omega2 += this.alpha2*dt;
    }
    incrementTheta1 = (dt: number): void => {
        this.theta1 += this.omega1*dt;
        this.theta2 += this.omega2*dt;
    }
    step = (dt: number): void => {
        this.incrementOmega1(dt);
        this.incrementTheta1(dt);
        this.alpha1 = this.getAlpha1();
        this.alpha2 = this.getAlpha2();
    }
    rungeKutta = (dt: number): void => {
        let k1: number = this.getAlpha1()*dt;
        let l1: number = this.getAlpha2()*dt;



    }


}