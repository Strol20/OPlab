// Глобальний лічильник, щоб бачити масштаб катастрофи
let totalProcessedElements = 0;

function DataStreamSystem() {
    
    // 1. Генератор "важких" даних
    async function* sourceGenerator(limit = 100000) {
        let i = 0;
        while (i < limit) {
            // Типу дані з інтернету
            yield {
                id: i,
                value: Math.random() * 1000,
                timestamp: Date.now()
            };
            i++;
        }
    }

    // 2. Обробник, який працює з асинхронним ітератором
    async function processStream(iterable, seconds) {
        let sum = 0;
        let count = 0;
        const finishTime = Date.now() + (seconds * 1000);

        console.log("Починаємо молотити дані...");

        for await (const chunk of iterable) {
            
            // Фільтруємо тільки парні індекси
            if (chunk.id % 2 === 0) {
                sum += chunk.value;
                count++;
                totalProcessedElements++;
            }

            
            if (Date.now() >= finishTime) {
                console.log("Час вийшов, зупиняємо конвеєр");
                break; 
            }
        }

        // повернення лічильника
        return {
            totalSum: sum.toFixed(2),
            average: count > 0 ? (sum / count).toFixed(2) : 0,
            processedCount: count,
            msg: "Пам'ять жива, масивів немає!"
        };
    }

    return {
        start: async (time) => {
            const data = sourceGenerator(); // Створюємо потік
            return await processStream(data, time);
        }
    };
}

// Тест
const myLab = DataStreamSystem();

// Запускаємо на 2 секунди
myLab.start(2).then(result => {
    console.log("Результат лабораторної:", result);
    console.log("Глобальний лічильник:", totalProcessedElements);
}).catch(err => {
    console.log("Все зламалося:", err);
});