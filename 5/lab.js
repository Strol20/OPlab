

function asyncCallback(array, iterator, finalCallback){
  const results = [];
  let completed = 0;
  let hasError = false;
  array.forEach((item, index){
    iterator(item, (err,transformedItem)){
      if(hasError) return;
        if(err){
          hasError = true;
          return finalCallback(err);
        }
        
    }
  });
}

const aray = [1,2,3];

