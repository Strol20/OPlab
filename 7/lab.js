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

        // Розсилаємо інфу всім небайдужим
        emit(eventName, data) {
            if (!events[eventName]) {
                // console.log(`Ніхто не слухає "${eventName}"`);
                return;
            }

            // Проходимо по масиву і смикаємо колбеки
            events[eventName].forEach(callback => {
                callback(data);
            });
        }
    };
}

// --- Сутності ---

const hub = EventEmitter();

// Ентіті 1: Логгер. Йому аби все в консоль висрати
const logger = (data) => console.log(`[Logger] Зафіксовано подію:`, data);

// Ентіті 2: Сенсор. Реагує тільки на критичні речі
const alarm = (data) => {
    if (data.temp > 80) {
        console.error(`[ALARM] ТЕМПЕРАТУРА КРИТИЧНА: ${data.temp}°C! Тікайте з села!`);
    }
};

// Ентіті 3: Інтерфейс. Просто малює циферки
const dashboard = (data) => console.log(`[Dashboard] Оновлюю графік... Нове значення: ${data.temp}`);

// Демонструємо реактивність:

// Підписуємо декількох незалежних слухачів
const logSub = hub.subscribe('sensor_data', logger);
const alarmSub = hub.subscribe('sensor_data', alarm);
const uiSub = hub.subscribe('sensor_data', dashboard);

console.log('--- Перший замір (все спокійно) ---');
hub.emit('sensor_data', { temp: 25, status: 'OK' });

console.log('\n--- Другий замір (спекотно) ---');
hub.emit('sensor_data', { temp: 85, status: 'CRITICAL' });


uiSub.unsubscribe();

console.log('\n--- Третій замір (після відписки UI) ---');
hub.emit('sensor_data', { temp: 30, status: 'OK' });

// Перевірка подія без підписників
hub.emit('random_trash', { message: 'Hello world' });