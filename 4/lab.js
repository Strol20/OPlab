//Мабуть краще булоб через опп, хоча замикання теж непогано. Але сенсу від цього немає

//Буде масівчік, новіші і старіші - це номера елементів. вище і нижче, в об'єкті записати 


function BiDirectionalPriorityQueue() {
    const queue = [];
    function _findFromType(type) { //пошук за типом
        
        switch (type) { //Щоб не робити багато іфів
            case 'highest': //Прикол, що кейси можна групувати
            case 'lowest':
                let priority = NaN;
                for (i = 0; i <= queue.length; i++) {
                    if(type == "highest"){
                        priority < queue[i].priority ? priority = queue[i].priority : NaN 
                    }else if(type == "lowest"){
                        priority > queue[i].priority ? priority = queue[i].priority : NaN
                    }
                }
                return
            case 'oldest':
                return (queue[0]);
            case 'newest':
                return (queue[queue.length - 1])
            default:
                console.log('Міша, неправильний тип. Давай всьо па новой')

        }
    }

    return {
        enqueue(item, priority) { //Додавання елементів з пріоритетом
            queue.push({ item: item, priority: priority })
        },
        dequeue(type) { //Видалити елемент з черги
            _findFromType
        },
        peek(type) { //Переглянути що то за предмет
            item = _findFromType(type);
            console.log(item)
        }

    }
}


const priq = BiDirectionalPriorityQueue();

priq.enqueue("Задача 1", 10);
priq.enqueue("Задача 2", 50); // Високий пріоритет
priq.enqueue("Задача 3", 5);  // Низький пріоритет
priq.enqueue("Задача 4", 20);

console.log(priq.peek('highest')); // покаже "Задача B"
console.log(priq.dequeue('highest')); // витягне "Задача B"

console.log(priq.dequeue('oldest')); // витягне "Задача A" (она была добавлена первой)

console.log(priq.dequeue('lowest')); // витягне "Задача C" (у нее приоритет 5)

console.log(priq.dequeue('newest')); // витягне "Задача D" (она была добавлена последней)

console.log(priq.size); // покаже: 0