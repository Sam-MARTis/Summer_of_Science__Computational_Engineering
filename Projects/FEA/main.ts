
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
