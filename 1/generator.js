//Генератор - пошагово генерує елементи об'єкта

function* fibonacciNumber(maxRange){
    let counter = 2;
    let firstTerm = 0;
    let secondTerm = 1

    while(maxRange == undefined || counter < maxRange-1){ // -1 бо починається лічильник з 0 а не з 1, без нього виводилоб на 1 число більше 
        let result = firstTerm + secondTerm;
        yield result;
        firstTerm = secondTerm;
        secondTerm = result;  
        counter += 1;
    }

}

console.log([
  [...fibonacciNumber(10)],
]);

for (const num of fibonacciNumber(1)) {
    console.log(num); 
    
}