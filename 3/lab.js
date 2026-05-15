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


    }

}