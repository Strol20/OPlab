function EventEmitter() {
    const events = {}; // Тут будуть лежати наші масивчіки з функціями

    return {
        // Підписуємось на подію
        subscribe(eventName, callback) {
            if (!events[eventName]) {
                events[eventName] = [];
            }
            
            events[eventName].push(callback);
            console.log(`[System] Хтось підписався на "${eventName}". Слухачів: ${events[eventName].length}`);

            // Повертаємо функцію для відписки, щоб не шукати потім, що видаляти
            return {
                unsubscribe() {
                    events[eventName] = events[eventName].filter(cb => cb !== callback);
                    console.log(`[System] Відписка від "${eventName}". Залишилось: ${events[eventName].length}`);
                }
            };
        },


    };
}