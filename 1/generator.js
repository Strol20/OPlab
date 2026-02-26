//Генератор - пошагово генерує елементи об'єкта

function* fibonacciNumber(maxRange){
    let counter = 0;
    let firstTerm = 0;
    let secondTerm = 1

    while(maxRange == undefined || counter < maxRange){
        yield firstTerm;
        let result = firstTerm + secondTerm;
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