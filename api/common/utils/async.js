
module.exports={
    waitWhile: waitWhile,
    wait: wait
}

function waitWhile(cb,time,condition){
    if (!condition){
        setTimeout(function(){
            waitWhile(cb,time,condition)
        },time)
    }else{
        return cb();
    }
}


async function wait(time,varX,compare) {
    return new Promise(function (resolve, reject) {
      setTimeout(async function () {
        if (varX!=compare) {
          console.log("cargando")
          return wait(time).then(function(){
              return resolve();
          })
        } else {
          console.log("Loadssssssssss")
          return resolve();
        }
      }, time)
    })
  }