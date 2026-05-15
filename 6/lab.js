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


}