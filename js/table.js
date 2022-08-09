let tableContainerUno = document.getElementById("table_container_uno");
let tableContainerDos = document.getElementById("table_container_dos");
let tableContainerTres = document.getElementById("table_container_tres");

let arrayData;
let arrayEventos;
let fechaActual;
let arrayEventosPasados;
let arrayEventosFuturos;

async function getDataEventos() {
	await fetch("https://amazing-events.herokuapp.com/api/events")
		.then((response) => response.json())
		.then((json) => (arrayData = json));

	arrayEventos = arrayData.events;
	fechaActual = arrayData.currentDate;
	arrayEventosPasados = arrayEventos.filter(
		(eventoPasado) => eventoPasado.date < fechaActual
	);
	arrayEventosFuturos = arrayEventos.filter(
		(eventoFuturo) => eventoFuturo.date > fechaActual
	);

	/* TABLA 1 */
	let arrayPorcentajeYEvento = []; //es el array donde pusheo un nuevo objeto con propiedades eventos y procentaje de Asistencia
	arrayEventosPasados.map((eventos) => {
		arrayPorcentajeYEvento.push({
			eventos: eventos.name,
			porcentajeAssistance: (
				(eventos.assistance * 100) /
				eventos.capacity
			).toFixed(2),
		});
	});

	//console.log(arrayPorcentajeYEvento)

	let maximoPorcentajeYEvento = arrayPorcentajeYEvento.sort(
		(a, b) => b.porcentajeAssistance - a.porcentajeAssistance
	)[0];

	//console.log(maximoPorcentajeYEvento)

	let minimoPorcentajeYEvento = arrayPorcentajeYEvento.sort(
		(a, b) => a.porcentajeAssistance - b.porcentajeAssistance
	)[0];

	//console.log(minimoPorcentajeYEvento)

	let capacidadMaxima = arrayEventos
		.filter((e) => e.capacity)
		.sort((a, b) => b.capacity - a.capacity)[0];

	// console.log(capacidadMaxima)

	/*TABLA 2*/
	let arrayCategoriasFuturas = arrayEventosFuturos.map(
		(element) => element.category
	);

	arrayCategoriasFuturas = new Set(arrayCategoriasFuturas);

	arrayCategoriasFuturas = [...arrayCategoriasFuturas];

	let categoriaValueFuturo = []; //"reordeno" y creo un nuevo objeto donde separo creando una propiedad categoria y una propiedad eventos donde junto en un array todos los eventos de esa categoria
	arrayCategoriasFuturas.map((categoria) => {
		categoriaValueFuturo.push({
			category: categoria,
			evento: arrayEventosFuturos.filter(
				(evento) => evento.category === categoria
			),
		});
	});

	// console.log(categoriaValueFuturo)

	let dataTablasFuturas = []; // [ ] => [{dato},{},{},{},{},{}]
	categoriaValueFuturo.map((datos) => {
		dataTablasFuturas.push({
			category: datos.category,
			estimate: datos.evento.map((item) => item.estimate),
			capacity: datos.evento.map((item) => item.capacity),
			revenue: datos.evento.map((item) => item.estimate * item.price),
		});
	});

	dataTablasFuturas.forEach((categoria) => {
		let totalEstimate = 0;
		categoria.estimate.forEach(
			(estimate) => (totalEstimate += Number(estimate))
		); // => totalEstimate = totalEstimate(0) + Number(estimate)
		categoria.estimate = totalEstimate;

		let totalCapacidadFutura = 0;
		categoria.capacity.forEach(
			(capacity) => (totalCapacidadFutura += Number(capacity))
		);
		categoria.capacity = totalCapacidadFutura;

		let totalRevenueFuturas = 0;
		categoria.revenue.forEach((revenue) => (totalRevenueFuturas += revenue));
		categoria.revenue = totalRevenueFuturas;

		categoria.porcentajePersonas = (
			(totalEstimate * 100) /
			totalCapacidadFutura
		).toFixed(2);
	});

	console.log(dataTablasFuturas);

	// /*TABLA 3 */
	let arrayCategoriasPasadas = arrayEventosPasados.map(
		(element) => element.category
	);

	arrayCategoriasPasadas = new Set(arrayCategoriasPasadas);

	arrayCategoriasPasadas = [...arrayCategoriasPasadas];

	let categoriaValuePasado = []; //es un array que tiene todos los elementos juntados por categoria
	arrayCategoriasPasadas.map((categoria) => {
		categoriaValuePasado.push({
			category: categoria,
			evento: arrayEventosPasados.filter(
				(evento) => evento.category === categoria
			),
		});
	});

	//console.log(categoriaValuePasado)

	let dataTablasPasadas = [];
	categoriaValuePasado.map((datos) => {
		dataTablasPasadas.push({
			category: datos.category,
			assistance: datos.evento.map((item) => item.assistance),
			capacity: datos.evento.map((item) => item.capacity),
			revenue: datos.evento.map((item) => item.assistance * item.price),
		});
	});

	dataTablasPasadas.forEach((categoria) => {
		let totalAsistencia = 0;
		categoria.assistance.forEach(
			(asistencia) => (totalAsistencia += Number(asistencia))
		);
		categoria.assistance = totalAsistencia;

		let totalCapacidad = 0;
		categoria.capacity.forEach(
			(capacidad) => (totalCapacidad += Number(capacidad))
		);
		categoria.capacity = totalCapacidad;

		let totalRevenue = 0;
		categoria.revenue.forEach((revenue) => (totalRevenue += revenue));
		categoria.revenue = totalRevenue;

		categoria.porcentajePersonas = (
			(totalAsistencia * 100) /
			totalCapacidad
		).toFixed(2);
	});

	//console.log(dataTablasPasadas)

	function tablaUno() {
		let contenedorUno = `
   
      <tr>
         <td>Events with the highest percentage of attendance</td>
         <td>Event with the lowest percentage</td>
         <td>Event with larger capacity</td>
      </tr>
         <td>${maximoPorcentajeYEvento.eventos}:${maximoPorcentajeYEvento.porcentajeAssistance}%</td>
         <td>${minimoPorcentajeYEvento.eventos}:${minimoPorcentajeYEvento.porcentajeAssistance}%</td>
         <td>${capacidadMaxima.name}: ${capacidadMaxima.capacity}</td>
      `;
		tableContainerUno.innerHTML = contenedorUno;
	}
	tablaUno();

	function tablaDos() {
		let contenedorDos = `
   
      <tr>
         <td>Categories</td>
         <td>Estimated Revenue</td>
         <td>Percentage of estimated attendance</td>
      </tr>`;

		dataTablasFuturas.forEach((e) => {
			contenedorDos += `
      <tr>
         <td>${e.category}</td>
         <td>$${e.revenue}</td>
         <td>${e.porcentajePersonas}%</td>
      </tr>
   `;
		});
		tableContainerDos.innerHTML = contenedorDos;
	}
	tablaDos();

	function tablaTres() {
		let contenedorTres = `
      <tr>
         <td>Categories</td>
         <td>Revenue</td>
         <td>Percentage of attendance</td>
      </tr>`;
		dataTablasPasadas.forEach((e) => {
			contenedorTres += `<tr>
      <td>${e.category}</td>
      <td>$${e.revenue}</td>
      <td>${e.porcentajePersonas}%</td>
   </tr>
   `;
		});
		tableContainerTres.innerHTML = contenedorTres;
	}
	tablaTres();
}

getDataEventos();
