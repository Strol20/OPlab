//Мабуть краще булоб через опп, хоча замикання теж непогано. Але сенсу від цього немає

//Буде масівчік, новіші і старіші - це номера елементів. вище і нижче, в об'єкті записати 


function BiDirectionalPriorityQueue() {
    const queue = [];
    function _findFromType(type) { //пошук за типом
        
        switch (type) { //Щоб не робити багато іфів
            case 'highest': //Прикол, що кейси можна групувати
            case 'lowest':
                let priorityFor = 0;
                for (i = 0; i < queue.length; i++) {
                    if(type == "highest"){
                        if(queue[priorityFor].priority < queue[i].priority){
                            priorityFor = i;
                        }
                    }else if(type == "lowest"){
                        if(queue[priorityFor].priority > queue[i].priority){
                            priorityFor = i;
                        }
                    }
                }
                return priorityFor;
            case 'oldest':
                return 0;
            case 'newest':
                return queue.length - 1;
            default:
                console.log('Міша, неправильний тип. Давай всьо па новой')

        }
    }

    return {
        enqueue(item, priority) { //Додавання елементів з пріоритетом
            queue.push({ item: item, priority: priority })
            return queue[queue.length - 1]
        },
        dequeue(type) { //Видалити елемент з черги
            let index = _findFromType(type);
            queue.splice(index,1)
            let newindex = _findFromType(type);
            return queue[index]
        },
        peek(type) { //Переглянути що то за предмет
            const index = _findFromType(type);
            return queue[index].item
        },
        size() { //Переглянути що то за предмет
            seze = queue.length;
            return seze;
        }

    }
}


const priq = BiDirectionalPriorityQueue();

console.log(priq.enqueue("Задача 1", 10))
console.log(priq.enqueue("Задача 2", 50)) // Високий пріоритет
console.log(priq.enqueue("Задача 3", 5)) // Низький пріоритет
console.log(priq.enqueue("Задача 4", 20))

console.log("Старе Найбільше",priq.peek('highest')); // покаже "Задача B"
priq.dequeue('highest'); // витягне "Задача B"
console.log("Нове Найбільше",priq.peek('highest'));

priq.dequeue('oldest'); // витягне "Задача A" (она была добавлена первой)

priq.dequeue('lowest'); // витягне "Задача C" (у нее приоритет 5)

priq.dequeue('newest'); // витягне "Задача D" (она была добавлена последней)

console.log(priq.size()); // покаже: 0