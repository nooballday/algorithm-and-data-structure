// let f1 = 0;
// let fn = 0;

function printFibonacci(start, end, next = 0) {
    next = start == 0 ? 1 : next + start
    console.log(start);
    if (start < end) {
        printFibonacci(next, end, start);
    }
}

printFibonacci(0, 70);