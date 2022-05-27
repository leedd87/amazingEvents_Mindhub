let arrayData
let arrayEventos
let fechaActual

async function getDataEventos() {
   await fetch("https://amazing-events.herokuapp.com/api/events")
      .then(response => response.json())
      .then(json => arrayData = json)

   console.log(arrayData)

   arrayEventos = arrayData.events;
   fechaActual = arrayData.currentDate;

}

getDataEventos()