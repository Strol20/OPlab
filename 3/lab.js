function memoizeFunction(fn, maxRange = Infinity, policy = "NONE", time = 0) {

    let cache = new Map();

    return function (...args) {
        let key = JSON.stringify(args);
        let currentTime = Date.now();

        if (cache.has(key)) {
            let curent = cache.get(key);

            // Перевірка часу життя
            const finishTime = curent.timestamp + (time * 1000);
            if (policy === "TIME" && time > 0 && currentTime >= finishTime) {
                cache.delete(key);
            } else {
                curent.count += 1;
                curent.timestamp = currentTime;

                if (policy === "LRU") {
                    cache.delete(key);
                    cache.set(key, curent);
                }
                return curent.value;
            }
        }
        let result = fn.apply(this, args);

        // Ліміт кешу
        if (maxRange !== Infinity && cache.size >= maxRange) {

            if (policy === "LRU" || policy === "NONE") {
                let oldestKey = cache.keys().next().value;
                cache.delete(oldestKey);
            }
            else if (policy === "LFU") {
                let minCount = Infinity;
                let lfuKey = null;
                for (const [key, val] of cache.entries()) {
                    if (val.count < minCount) {
                        minCount = val.count;
                        lfuKey = key;
                    }
                }
                if (lfuKey) cache.delete(lfuKey);
            }
            else if (policy === "TIME") {
                let oldestTime = Infinity;
                let oldestKey = null;
                for (const [key, val] of cache.entries()) {
                    if (val.timestamp < oldestTime) {
                        oldestTime = val.timestamp;
                        oldestKey = key;
                    }
                }
                if (oldestKey) cache.delete(oldestKey);
            }
        }

        cache.set(key, {
            value: result,
            count: 1,
            timestamp: currentTime
        });

        return result;

    }

}

// Тест
const slowAdd = (a, b) => {
    console.log(`Обчислення ${a} + ${b}...`);
    return a + b;
};

// Зберігає не більше 2 результатів, витісне найменш використовувані
let memoized = memoizeFunction(slowAdd, 2, "LFU");

// console.log(memoized(1, 2));
// console.log(memoized(1, 2)); // Бере з кешу
// console.log(memoized(3, 4));
// console.log(memoized(5, 6)); // Кеш переповнюється, одне значення вилітає