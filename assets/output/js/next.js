const real = [4, 5.6, -9.8, 3.14, 12, 7]


const square = (arr) => {
    const sq = arr.filter(num => Number.isInteger(num) && num > 0).map(x => x * x)
    return sq
}


console.log(square(real))