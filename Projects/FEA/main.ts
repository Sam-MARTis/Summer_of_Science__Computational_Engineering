
const canvas = document.getElementById("projectCanvas") as HTMLCanvasElement;
canvas.width = window.innerWidth*devicePixelRatio;
canvas.height = window.innerHeight*devicePixelRatio;
const ctx = canvas.getContext("2d")


const vecDotVec = (vec1: number[], vec2: number[]): number => {
    if (vec1.length !== vec2.length) {
        throw new Error("Vector dimensions must match");
    }
    let result = 0;
    for (let i = 0; i < vec1.length; i++) {
        result += vec1[i] * vec2[i];
    }
    return result;
}

const vecMulMat = (vec: number[], mat: number[][]): number[] => {
    if (vec.length !== mat[0].length) {
        throw new Error("Vector and matrix dimensions must match");
    }
    let result = [];
    for (let i = 0; i < mat[0].length; i++) {
        let sum = 0;
        for (let j = 0; j < vec.length; j++) {
            sum += vec[j] * mat[j][i];
        }
        result.push(sum);
    }
    return result;
}

const prepareRHSVector = (mat: number[][], vec: number[]): number[] => {
    if(mat[0].length !== vec.length) {
        throw new Error("Matrix and vector dimensions must match");
    }
    if(mat.length !== mat[0].length) {
        throw new Error("Matrix must be square");
    }
    let result = [];
    for (let i = 0; i < mat.length; i++) {
        result.push(vec[i] / mat[i][i]);
    }

    return result;
}
const prepareRHSMatrix = (mat: number[][]): number[][] => {
    let result = [];
    for (let i = 0; i < mat.length; i++) {
        let row = [];
        for (let j = 0; j < mat[i].length; j++) {
            if (i === j) {
                row.push(0);
            } else {
                row.push(-mat[i][j] / mat[i][i]);
            }
        }
        result.push(row);
    }
    return result;
}

const JacobiSolver = (initialGuess: number[], mat: number[][], rhs: number[], iterations: number): number[] => {
    if(mat.length !== mat[0].length) {
        throw new Error("Matrix must be square");
    }
    if(mat.length !== rhs.length) {
        throw new Error("Matrix and vector dimensions must match");
    }
    if(initialGuess.length !== rhs.length) {
        throw new Error("Initial guess and vector dimensions must match");
    }
    if(iterations < 1) {
        throw new Error("Number of iterations must be at least 1");
    }

    let state: number[] = []
    for (let i = 0; i < initialGuess.length; i++) {
        state.push(initialGuess[i]);
    }
    let rhsRev = prepareRHSVector(mat, rhs);
    let matRev = prepareRHSMatrix(mat);

    for (let i = 0; i < iterations; i++) {
        let newState = [];
        for (let j = 0; j < state.length; j++) {
            newState.push(vecDotVec(matRev[j], state) + rhsRev[j]);
        }
        state = newState;
    }
    return state;
}


const testMat1 = [[6, 1, 2], [1, 4, 0.5], [-1, 0.5, -4]];
const testVec1 = [-2, 1, 0];
const testGuess1 = [0, 0, 0];
const testIterations1 = 100;
console.log(JacobiSolver(testGuess1, testMat1, testVec1, testIterations1));