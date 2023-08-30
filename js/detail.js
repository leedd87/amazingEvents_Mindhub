let arrayEventos
let contenedorDetail = document.getElementById('contenedorDetail');

async function getDataEventos() {
   await fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then(response => response.json())
      .then(json => arrayData = json)

   console.log(arrayData)

   arrayEventos = arrayData.events;
   fechaActual = arrayData.currentDate;

   var id = location.search.split('?id=')[1]

   var evento = arrayEventos.find(evento => {
      return evento._id == id
   })

   console.log(evento)


   //    let detailHtml = `
   // <div class="row g-4">
   //             <div class="col-12 col-md-6 d-flex justify-content-center">
   //                <img src=${evento.image} class="img-fluid rounded-start" alt="${evento.name}">
   //             </div>
   //             <div class=" col-12 col-md-6 d-flex justify-content-center align-items-center">
   //                <div class="card-body">
   //                   <h5 class="card-title text-center">${evento.name}</h5>
   //                   <p class="card-text">Date: ${evento.date}</p>
   //                   <p class="card-text">Description: ${evento.description}</p>
   //                   <p class="card-text">Category:${evento.category}</p>
   //                   <p class="card-text">Place: ${evento.place}</p>
   //                   <p class="card-text">Capacity: ${evento.capacity}</p>
   //                   <p class="card-text">Price: $${evento.price}</p>
   //                   <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
   //                </div>
   //             </div>
   //          </div> 



   // `

   //    contenedorDetail.innerHTML = detailHtml;




}

getDataEventos();