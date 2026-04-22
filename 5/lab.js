

function asyncCallback(array, iterator, resultCallback){
  const results = [];
  let completed = 0;
  let hasError = false;
  if (array.length == 0) return resultCallback(err);
  array.forEach((item, index) =>{
    iterator(item, (err,transformedItem) =>{
      if(hasError) return;
        if(err){
          hasError = true;
          return resultCallback(err);
        }
        results[index] = transformedItem;
        completed++;
        if(completed === aray.length){
          resultCallback(null, results)
        }
    });
  });
}



const aray = [2,3,4];

asyncCallback(aray, (n, next) => {
  setTimeout(() => next(null, n * 2), 100);
}, (err, res) => {
  if (err) console.error(err);
  else console.log("Callback Result:", res); // [2, 4, 6]
});