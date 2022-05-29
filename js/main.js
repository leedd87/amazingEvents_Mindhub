let contenedorTarjetasHome = document.getElementById('contenedorTarjetasHome');
let contenedorCheckbox = document.getElementById('contenedorCheckbox');
let searchBar = document.getElementById('searchBar');

let arrayEventos
let arrayData
let fechaActual
let searchInput = '';

async function getDataEventos() {
   await fetch("https://amazing-events.herokuapp.com/api/events")
      .then(response => response.json())
      .then(json => arrayData = json)

   //console.log(arrayData)

   arrayEventos = arrayData.events;
   fechaActual = arrayData.currentDate;
   let dataCategorias = arrayEventos.map(categoria => categoria.category);
   let dataArrayCategorias = new Set(dataCategorias)
   let dataCategoriasUnicas = [...dataArrayCategorias];

   crearCheckBox(dataCategoriasUnicas)

   let checkBoxes = document.querySelectorAll('input[type=checkbox]');
   let checkBoxChequeados = []

   searchBar.addEventListener('keyup', (evento) => {
      searchInput = evento.target.value;
      filtrarCards()
   })

   checkBoxes.forEach(checkBox => checkBox.addEventListener('change', (evento) => {
      let chequeado = evento.target.checked;
      if (chequeado) {
         checkBoxChequeados.push(evento.target.value)
         filtrarCards()
      } else {
         checkBoxChequeados = checkBoxChequeados.filter(noChequeado => noChequeado !== evento.target.value)
         filtrarCards()
      }
   }))

   function filtrarCards() {
      let tarjetasFiltradas = [];

      if (checkBoxChequeados.length > 0 && searchInput !== "") {

         checkBoxChequeados.map(chequeadoValue => {

            tarjetasFiltradas.push(...arrayEventos.filter(evento =>
               evento.category == chequeadoValue && evento.name.toLowerCase().includes(searchInput.toLowerCase().trim())
            ))
         })
         //console.log(tarjetasFiltradas)


      } else if (checkBoxChequeados.length > 0 && searchInput == "") {
         checkBoxChequeados.map(chequeadoValue => {

            tarjetasFiltradas.push(...arrayEventos.filter(evento =>
               evento.category == chequeadoValue
            ))
         })
         console.log(tarjetasFiltradas)
      } else if (checkBoxChequeados.length == 0 && searchInput !== "") {
         tarjetasFiltradas.push(...arrayEventos.filter(evento =>
            evento.name.toLowerCase().includes(searchInput.toLowerCase().trim())
         ))

      } else {
         tarjetasFiltradas.push(...arrayEventos)
      }

      //console.log(tarjetasFiltradas)
      crearTarjetas(tarjetasFiltradas);

   }

   filtrarCards()

}

getDataEventos();

function crearTarjetas(array) {

   let tarjetasHtml = ''
   if (array.length > 0) {

      array.forEach(element => {

         tarjetasHtml += `
                  <div class='col-lg-3 col-md-6 col-sm-12 my-2'>
                  <div class="card">
                  <img src=${element.image} class="card-img-top img-cards" alt="${element.name}">
                  <div class="card-body">
                  <h5 class="card-title">${element.name}</h5>
                  <p class="card-text">${element.description}
                  </p>
                  <p class="card-text">Date: ${element.date}</p>
                  <div class="d-flex justify-content-evenly align-items-center">
                  <p class="mx-3 my-0">$${element.price}</p>
                  <a href="./pages/cardDetail.html?id=${element._id}" class="btn">See more</a>
                  </div>
                  </div>
                  </div>
                  </div>
                  
                  `;
         contenedorTarjetasHome.innerHTML = tarjetasHtml;
      });
   } else {
      contenedorTarjetasHome.innerHTML = `<p class='text-center'>No hay ningun resultado</p>`
   }

}

function crearCheckBox(array) {
   let checkBoxHtml = '';
   array.forEach(categoria => {
      checkBoxHtml += `
      <label
      class="d-sm-flex flex-md-row flex-sm-column align-items-center justify-content-center mx-md-2 mx-lg-3 mx-1">
      <input type="checkbox" value="${categoria}" id=${categoria} name=${categoria}>
      ${categoria}
      </label>
      `
      contenedorCheckbox.innerHTML = checkBoxHtml
   })
}