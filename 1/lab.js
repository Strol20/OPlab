//Генератор - пошагово генерує елементи об'єкта

function* fibonacciNumber(maxRange){
    let counter = 0;
    let firstTerm = 0n;
    let secondTerm = 1n;

    while(maxRange == undefined || counter < maxRange){
        yield firstTerm;
        let result = firstTerm + secondTerm;
        firstTerm = secondTerm;
        secondTerm = result;  
        counter += 1;
    }

}
// Для тесту Перевірка
// console.log([
//   [...fibonacciNumber(10)],
// ]);

// for (const num of fibonacciNumber(1000)) { //Бесконечность не предел!!
//     console.log(num); 
// } 

function iteratorWithTime(iterable, time){
    
    let list = [];
    let sum = 0n;
    const finishTime = Date.now() + (time*1000);

    while(Date.now() < finishTime){
        curent = iterable.next();
        console.log(curent.value);
        sum += curent.value;
        list.push(curent.value)
    }
    return{
        sum: sum
    }
}

iterable = fibonacciNumber();

iterator = iteratorWithTime(iterable,10);

console.log(iterator)

//Мені не подобається що воно видає просто інфініті. 
//Можна перетворити числа в BigInt, але прошавай пам'ять
