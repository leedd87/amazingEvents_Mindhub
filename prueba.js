let arrayEventos
let arrayData
let fechaActual
let searchInput = '';
console.log(arrayEventos)

async function getDataEventos() {
   await fetch("https://amazing-events.herokuapp.com/api/events")
      .then(response => response.json())
      .then(json => arrayData = json)

   console.log(arrayData)

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
         console.log(tarjetasFiltradas)


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

      console.log(tarjetasFiltradas)
      crearTarjetas(tarjetasFiltradas);

   }

   filtrarCards()

}

getDataEventos();