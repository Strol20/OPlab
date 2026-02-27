
numFiboNum = 0;

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
        numFiboNum += 1;
    }
}

// Не дуже рандомно
function* randomNumber(minRange = -10000, maxRange = 10000){
    while(true){
        yield Math.trunc(Math.random() * (maxRange - minRange) + minRange);
    }
}

// Для тесту Перевірка
// console.log([
//   [...fibonacciNumber(10)],
// ]);

// for (const num of fibonacciNumber()) { //Бесконечность не предел!!
//     console.log(num); 
// } 

function iteratorWithTime(iterable, time){
    
    let list = [];
    let sum = 0n;
    const finishTime = Date.now() + (time*1000);

    while(Date.now() < finishTime){
        curent = iterable.next();
        console.log(curent.value);
        sum += BigInt(curent.value);
        list.push(curent.value)
    }
    return{
        sum: sum,
        averageNum: sum / BigInt(list.length),
        list: list.length
    }
}

// iterable = fibonacciNumber();
iterable = randomNumber();

iterator = iteratorWithTime(iterable,1);

console.log(iterator)
console.log(numFiboNum)

//Мені не подобається що воно видає просто інфініті. 
//Можна перетворити числа в BigInt, але прошавай пам'ять
