// const PARTIDOSTORAGE = localStorage.getItem('PartidoStorage');
const PARTIDO = [];
//JSON.parse(PARTIDOSTORAGE) ??

const USERSTORAGE = localStorage.getItem("user");
function redirect() {
  window.location = "./pages/login.html";
}
const USER = JSON.parse(USERSTORAGE) ?? redirect();

document.getElementById("navbarDropdownMenuLink").innerHTML = USER.username;
const logout = document.getElementById("logout");
logout.addEventListener("click", (e) => {
  localStorage.removeItem("user");
  redirect();
});

const URL = "http://fprode.nachofernan.com/api/";

// const GUARDSTORAGE = localStorage.getItem('guardadasStorage');
// const guardadas = JSON.parse(GUARDSTORAGE) ?? [];

const EQUIPOS = [
  "Qatar",
  "Ecuador",
  "Senegal",
  "Holanda",
  "Inglaterra",
  "Irán",
  "EEUU",
  "Gales",
  "Argentina",
  "Arabia S.",
  "México",
  "Polonia",
  "Francia",
  "Australia",
  "Dinamarca",
  "Tunez",
  "España",
  "Costa Rica",
  "Alemania",
  "Japon",
  "Belgica",
  "Canada",
  "Marruecos",
  "Croacia",
  "Brazil",
  "Serbia",
  "Suiza",
  "Camerun",
  "Portugal",
  "Ghana",
  "Uruguay",
  "Corea",
];

const GRUPOS = ["A", "B", "C", "D", "E", "F", "G", "H"];

const FASES = [
  "Octavos de final",
  "Cuartos de final",
  "Semifinal",
  "Final",
  "3er puesto"
];

const RANKING = [
  1441, 1464, 1593, 1679, 1737, 1559, 1635, 1582, 1770, 1435, 1650, 1546, 1765,
  1484, 1665, 1508, 1717, 1500, 1659, 1553, 1822, 1474, 1559, 1632, 1838, 1550,
  1621, 1485, 1679, 1390, 1644, 1526,
];

///////////////////////////////ARMADO DE EQUIPOS //////////////////////////////

class Equipo {
  constructor(nombre, ranking) {
    this.nombre = nombre;
    this.ranking = ranking;
  }
}

const EQUIPO = [];

EQUIPOS.forEach((nombre, index) => {
  const equipox = new Equipo(nombre, RANKING[index]);
  EQUIPO.push(equipox);
});

///////////////////////////////ARMADO DE GRUPOS //////////////////////////////

let id=0

class Grupo {
  constructor(nombre, equipos, partidos) {
    this.nombre = nombre;
    this.equipo = equipos;
    this.partido = partidos;
  }
}
const GRUPO = [];

let multl = 0;

GRUPOS.forEach((nombre, index) => {
  const grupox = new Grupo(
    nombre,
    [
      EQUIPO[multl + index],
      EQUIPO[multl + index + 1],
      EQUIPO[multl + index + 2],
      EQUIPO[multl + index + 3],
    ],
    []
  );
  GRUPO.push(grupox);

  multl = multl + 3;
});

class Partido {
  constructor(eq1, eq2, geq1, geq2, terminado, id, grupo) {
    this.eq1 = eq1;
    this.eq2 = eq2;
    this.geq1 = geq1;
    this.geq2 = geq2;
    this.terminado = terminado;
    this.id = id;
    this.grupo = grupo;
  }
}



////////////////////// TABLAS EQUIPOS POR GRUPO/////////////////////////

function tablaEquipos(grupo) {
  let ul = document.createElement("ul");

  document.getElementById("grup" + grupo.nombre).appendChild(ul);

  grupo.equipo.forEach((equipo) => {
    let eq = document.createElement("li");
    eq.innerHTML = equipo.nombre;
    ul.appendChild(eq);
  });
}

let tablaEq = document.getElementById("gruposPrin");

GRUPO.forEach((grupo) => {
  tablaEq.innerHTML += `<div onclick="funcTogglePRO('Grupo${grupo.nombre}')" class="grupos" id="grup${grupo.nombre}"> <h3> Grupo ${grupo.nombre}</h3>`;
  tablaEquipos(grupo);

  tablaEq.innerHTML += `</div>`;
});

GRUPO.forEach((grupo) => {
  grupo.equipo.sort((a, b) => b.puntos - a.puntos || b.difGol - a.difGol);
});

////////////////////// Elegi al campeon/////////////////////////

let capeonDefault = document.getElementById("nombrePaisCampeon");


capeonDefault.innerText= "Elegí al campeón";


fetch(URL + "paises")
  .then((res) => res.json())
  .then((data) => {
    paises = data;

            fetch(URL + "user_all/" + USER.id)
            .then((res) => res.json())
            .then((data) => {
                if (data.pais_id !== null) {
                    const nombrePais = paises.find(
                        (pais) => pais.pais_id === data.pais_id
                        ).nombre;
                        document.getElementById("nombrePaisCampeon").innerText = nombrePais;
                }
            })

            .catch((error) => console.error("Error:", error));

    paises.forEach((equipo) => {
      let elCampeon = document.getElementById("campeon");

      elCampeon.innerHTML += `<option value="${equipo.nombre}" data-admin="${equipo.pais_id} " >${equipo.nombre}</option>`;

    });
      const select = document.getElementById("campeon");

      select.addEventListener("change", (e) => {
        let selecte = document.getElementById("campeon");

        let value = selecte.options[select.selectedIndex].dataset.admin;

        let request = {
          method: "POST",
          body: JSON.stringify({
            user_id: USER.id,
            pais_id: value,
          }),
        };

        fetch(URL + "elegir_campeon", request)
          .then((res) => res.json())
          .then((data) => {
          })
          .catch((error) => console.error("Error:", error));
      });
    
  });

//
//                 })
// })

// .catch((error) => console.error("Error:", error));

// const agregarEventListener = () => {
//

// Body: user_id, pais_id

////////////////////// TABLAS PARTIDOS POR GRUPO/////////////////////////

function crearTablaPartidos(grupo, data) {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  table.appendChild(thead);
  table.appendChild(tbody);

  document
    .getElementById("partidoGrupo" + grupo.grupo_nombre)
    .appendChild(table);
  grupo.partidos.forEach((partido) => {
    let row_1 = document.createElement("tr");
    let row_1_data_1 = document.createElement("td");
    row_1_data_1.className = "tablaequipo";
    row_1_data_1.innerHTML = partido.local.nombre;
    let row_1_data_2 = document.createElement("td");
    // const geq1 = PARTIDO.findIndex(obj => obj.id == partido.id)
    const pronost_partido =
      data.find((pronostico) => pronostico.partido_id == partido.partido_id) ??
      false;
    if (pronost_partido) {
      row_1_data_2.innerHTML = `<input type="number" min="0" value= "${pronost_partido.local}" id="${partido.partido_id}L" class="g${grupo.grupo_nombre} goles">`;
    } else {
      row_1_data_2.innerHTML = `<input type="number" min="0" value= "" placeholder="-" id="${partido.partido_id}L" class="g${grupo.grupo_nombre} goles">`; //partido.geq1 ;
    }
    let row_1_data_3 = document.createElement("td");
    const geq2 = PARTIDO.findIndex((obj) => obj.id == partido.partido_id);

    if (pronost_partido) {
      row_1_data_3.innerHTML = `<input type="number" min="0" value= "${pronost_partido.visita}" id="${partido.partido_id}V" class="g${grupo.grupo_nombre} goles">`; //partido.geq2 ;
    } else {
      row_1_data_3.innerHTML = `<input type="number" min="0" value= "" placeholder="-" id="${partido.partido_id}V" class="g${grupo.grupo_nombre} goles">`; //partido.geq1 ;
    }

    let row_1_data_4 = document.createElement("td");
    row_1_data_4.className = "tablaequipo";
    row_1_data_4.innerHTML = partido.visita.nombre;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
  });
  // let guardar = document.createElement('h3');
  // guardar.innerHTML = 'Guardar';
  // guardar.className = 'guardar';
  // guardar.id = 'guardar'+grupo.grupo_nombre;
  // insertAfter(table, guardar);
}

let tabla = document.getElementById("tablasPartidosProde");

tabla.innerHTML = `<div style="padding: 5%; ">
<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
<span class="sr-only"></span>
</div></div>`;

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const PRONOSTICOS = "pronosticos/" + USER.id;

let fixture = [];

function pronosticos(fixture) {
  fetch(URL + PRONOSTICOS)
    .then((res) => res.json())
    .then((data) => {
      tabla.innerHTML = "";

      fixture.forEach((grupo) => {
        tabla.innerHTML += `<div class="grupo filterDiv Grupo ${grupo.grupo_nombre}" id="partidoGrupo${grupo.grupo_nombre}"> <h3>Grupo ${grupo.grupo_nombre}</h3>`;
        crearTablaPartidos(grupo, data);
        tabla.innerHTML += `</div>`;
      });
    })
    .catch((error) => console.error("Error:", error));
}

tabla.addEventListener("change", (e) => {
  let id = e.target.id.slice(0, -1);

  let golLocal = 0;
  let golVisitante = 0;

  if (e.target.id.split("").pop() == "L") {
    golLocal = parseInt(document.getElementById(e.target.id).value);
    golVisitante = document.getElementById(
      e.target.id.slice(0, -1) + "V"
    ).value;
  } else {
    golVisitante = parseInt(document.getElementById(e.target.id).value);
    golLocal = document.getElementById(e.target.id.slice(0, -1) + "L").value;
  }

  const API_PRONOSTICOS = "pronosticos";

  let request = {
    method: "POST",
    body: JSON.stringify({
      user_id: USER.id,
      api_key: USER.api_key,
      partido_id: id,

      local: golLocal,

      visita: golVisitante,
    }),
  };

  fetch(URL + API_PRONOSTICOS, request)
    .then((res) => res.json())
    .then((data) => {})
    .catch((error) => console.error("Error:", error));
});

fetch("http://fprode.nachofernan.com/api/partidos_all")
  .then((res) => res.json())
  .then((data) => {
    fixture = data.slice(0, 8);
    pronosticos(fixture);
  })
  .catch((error) => console.error("Error:", error));



//////////////////////////// PLAYOFFS ///////////////////////////////////





//////////////////////////// OCTAVOS ///////////////////////////////////






let tablaOctavos = document.getElementById("tablasPartidosPlayoffProde");

tablaOctavos.innerHTML = `<div style="padding: 5%; ">
<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
<span class="sr-only"></span>
</div></div>`;



// crearTablaPartidosOctavos();


tablaOctavos.innerHTML += `</div>`;




function pronosticosOct(grupo, index) {
  fetch(URL + PRONOSTICOS)
    .then((res) => res.json())
    .then((data) => {

      tablaOctavos.innerHTML += `<div class="grupo" id="PO${grupo.grupo_nombre}"> <h3> ${FASES[index]} </h3>`;

      console.log(grupo)

      // grupo.forEach((grupo) => {
        // tablaOctavos.innerHTML += `<div class="grupo filterDiv Grupo ${grupo.grupo_nombre}" id="partidoGrupo${grupo.grupo_nombre}"> <h3>Grupo ${grupo.grupo_nombre}</h3>`;
        crearTablaPartidosOctavos(grupo, data);
        // tatablaOctavosbla.innerHTML += `</div>`;
      // })
  })
    .catch((error) => console.error("Error:", error));
}

tablaOctavos.addEventListener("change", (e) => {
  let id = e.target.id.slice(0, -1);

  let golLocal = 0;
  let golVisitante = 0;

  if (e.target.id.split("").pop() == "L") {
    golLocal = parseInt(document.getElementById(e.target.id).value);
    golVisitante = document.getElementById(
      e.target.id.slice(0, -1) + "V"
    ).value;
  } else {
    golVisitante = parseInt(document.getElementById(e.target.id).value);
    golLocal = document.getElementById(e.target.id.slice(0, -1) + "L").value;
  }

  const API_PRONOSTICOS = "pronosticos";

  let request = {
    method: "POST",
    body: JSON.stringify({
      user_id: USER.id,
      api_key: USER.api_key,
      partido_id: id,

      local: golLocal,

      visita: golVisitante,
    }),
  };

  fetch(URL + API_PRONOSTICOS, request)
    .then((res) => res.json())
    .then((data) => {})
    .catch((error) => console.error("Error:", error));
});

fetch("http://fprode.nachofernan.com/api/partidos_all")
  .then((res) => res.json())
  .then((data) => {
    tablaOctavos.innerHTML = ""
    fixture = data.slice(8, 13);
    fixture = fixture.reverse()
    console.log(fixture)
    fixture.forEach((playoff, index )=> {

    pronosticosOct(playoff, index);
    })
  })
  .catch((error) => console.error("Error:", error));





async function crearTablaPartidosOctavos(grupo, data) {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  table.appendChild(thead);
  table.appendChild(tbody);

  document.getElementById(`PO${grupo.grupo_nombre}`).appendChild(table);


  
  await grupo.partidos.forEach((partido) => {
  let row_1 = document.createElement("tr");
  let row_1_data_1 = document.createElement("td");
  row_1_data_1.className = "tablaequipo";
  row_1_data_1.innerHTML = partido.local.nombre;
  let row_1_data_2 = document.createElement("td");
  const pronost_partido =
    data.find((pronostico) => pronostico.partido_id == partido.partido_id) ??
    false;
  if (pronost_partido) {
    row_1_data_2.innerHTML = `<input type="number" min="0" value= "${pronost_partido.local}" id="${partido.partido_id}L" class="goles">`;
  } else {
    row_1_data_2.innerHTML = `<input type="number" min="0" value= "" placeholder="-" id="${partido.partido_id}L" class="goles">`; //partido.geq1 ;
  }
  let row_1_data_3 = document.createElement("td");
  const geq2 = PARTIDO.findIndex((obj) => obj.id == partido.partido_id);

  if (pronost_partido) {
    row_1_data_3.innerHTML = `<input type="number" min="0" value= "${pronost_partido.visita}" id="${partido.partido_id}V" class="goles">`; //partido.geq2 ;
  } else {
    row_1_data_3.innerHTML = `<input type="number" min="0" value= "" placeholder="-" id="${partido.partido_id}V" class="goles">`; //partido.geq1 ;
  }

  let row_1_data_4 = document.createElement("td");
  row_1_data_4.className = "tablaequipo";
  row_1_data_4.innerHTML = partido.visita.nombre;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
  });
}



// tablaOctavos.addEventListener("change", (e) => {
//   let id = e.target.id.slice(0, -1);
//   const objIndex = partidosOctavos.findIndex((obj) => obj.id == id);

//   partidosOctavos[objIndex].terminado = true;

//   if (e.target.id.split("").pop() == "L") {
//     partidosOctavos[objIndex].geq1 = document.getElementById(e.target.id).value;
//   } else {
//     partidosOctavos[objIndex].geq2 = document.getElementById(e.target.id).value;
//   }

//   const localstoPartOff = JSON.stringify(partidosOctavos);
//   localStorage.setItem("PartidosOFFStorage", localstoPartOff);
// });

//////////////////////////// CUARTOS ///////////////////////////////////

// const Cuartos = [];

// let partidosCuartos = PARTIDOPLAYOFF.slice(8, 12);
// const [a, b, c, d] = partidosCuartos;

// function crearTablaPartidosCuartos() {
//   let table = document.createElement("table");
//   let thead = document.createElement("thead");
//   let tbody = document.createElement("tbody");

//   table.appendChild(thead);
//   table.appendChild(tbody);

//   document.getElementById("partidosCuartos").appendChild(table);

//   partidosCuartos.forEach((partido) => {
//     let row_1 = document.createElement("tr");
//     let row_1_data_1 = document.createElement("td");
//     row_1_data_1.innerHTML = partido.eq1;
//     let row_1_data_2 = document.createElement("td");
//     let row_1_data_3 = document.createElement("td");

//     row_1_data_2.innerHTML = `<input type="number" min="0" value= "" placeholder="-" class="goles" id="id${partido.id}eq1">`; //`<input type="number" class="goles">`;
//     row_1_data_3.innerHTML = `<input type="number" min="0" value= "" placeholder="-" class="goles" id="id${partido.id}eq2">`; //`<input type="number" class="goles">`;

//     let row_1_data_4 = document.createElement("td");
//     row_1_data_4.innerHTML = partido.eq2;

//     row_1.appendChild(row_1_data_1);
//     row_1.appendChild(row_1_data_2);
//     row_1.appendChild(row_1_data_3);
//     row_1.appendChild(row_1_data_4);
//     tbody.appendChild(row_1);
//   });
// }

//////////////////////////// SEMIFINAL ///////////////////////////////////

// const partidosSemi = PARTIDOPLAYOFF.slice(12, 14);

// function crearTablaPartidosSemi() {
//   let table = document.createElement("table");
//   let thead = document.createElement("thead");
//   let tbody = document.createElement("tbody");

//   table.appendChild(thead);
//   table.appendChild(tbody);

//   document.getElementById("partidosSemi").appendChild(table);

//   partidosSemi.forEach((partido) => {
//     let row_1 = document.createElement("tr");
//     let row_1_data_1 = document.createElement("td");
//     row_1_data_1.innerHTML = partido.eq1;
//     let row_1_data_2 = document.createElement("td");
//     let row_1_data_3 = document.createElement("td");

//     row_1_data_2.innerHTML = `<input type="number" min="0" value= "" placeholder="-" class="goles" id="id${partido.id}eq1">`; //`<input type="number" class="goles">`;
//     row_1_data_3.innerHTML = `<input type="number" min="0" value= "" placeholder="-" class="goles" id="id${partido.id}eq2">`; //`<input type="number" class="goles">`;

//     let row_1_data_4 = document.createElement("td");
//     row_1_data_4.innerHTML = partido.eq2;

//     row_1.appendChild(row_1_data_1);
//     row_1.appendChild(row_1_data_2);
//     row_1.appendChild(row_1_data_3);
//     row_1.appendChild(row_1_data_4);
//     tbody.appendChild(row_1);
//   });
// }

//////////////////////////// FINAL ///////////////////////////////////

// const partidoFinal = PARTIDOPLAYOFF[14];

// function crearTablaPartidoFinal() {
//   let table = document.createElement("table");
//   let thead = document.createElement("thead");
//   let tbody = document.createElement("tbody");

//   table.appendChild(thead);
//   table.appendChild(tbody);

//   document.getElementById("partidoFinal").appendChild(table);

//   let row_1 = document.createElement("tr");
//   let row_1_data_1 = document.createElement("td");
//   row_1_data_1.innerHTML = partidoFinal.eq1;
//   let row_1_data_2 = document.createElement("td");
//   let row_1_data_3 = document.createElement("td");

//   row_1_data_2.innerHTML = `<input type="number" min="0" value= "" placeholder="-" class="goles" id="id${partidoFinal.id}eq1">`;
//   partidoFinal.geq1 = row_1_data_2.innerHTML;
//   row_1_data_3.innerHTML = `<input type="number" min="0" value= "" placeholder="-" class="goles" id="id${partidoFinal.id}eq1">`; //`<input type="number" class="goles">`;
//   partidoFinal.geq2 = row_1_data_3.innerHTML;
//   let row_1_data_4 = document.createElement("td");
//   row_1_data_4.innerHTML = partidoFinal.eq2;

//   row_1.appendChild(row_1_data_1);
//   row_1.appendChild(row_1_data_2);
//   row_1.appendChild(row_1_data_3);
//   row_1.appendChild(row_1_data_4);
//   tbody.appendChild(row_1);
// }

// let tablaCuartos = document.getElementById("tablasPartidosPlayoffProde");
// tablaCuartos.innerHTML += `<div class="grupo" id="partidosCuartos"> <h3>${FASES[2]}</h3>`;
// crearTablaPartidosCuartos();
// tablaCuartos.innerHTML += `</div>`;

// let tablaSemi = document.getElementById("tablasPartidosPlayoffProde");
// tablaSemi.innerHTML += `<div class="grupo" id="partidosSemi"> <h3>${FASES[3]}</h3>`;
// crearTablaPartidosSemi();
// tablaSemi.innerHTML += `</div>`;

// let tablaFinal = document.getElementById("tablasPartidosPlayoffProde");
// tablaFinal.innerHTML += `<div class="grupo" id="partidoFinal"> <h3>${FASES[4]}</h3>`;
// crearTablaPartidoFinal();
// tablaFinal.innerHTML += `</div>`;









////////////////////// FUNCION TOGGLE ////////////////////////

const GRUPOSTOGGLE = [
  "GrupoA",
  "GrupoB",
  "GrupoC",
  "GrupoD",
  "GrupoE",
  "GrupoF",
  "GrupoG",
  "GrupoH",
];

function funcTogglePRO(tabla) {
  const newGrupo = GRUPOSTOGGLE.filter((gr) => {
    return gr !== tabla;
  });

  var z = document.getElementById(`zonaGrupos`);
  var x = document.getElementById(`partido${tabla}`);

  if (z.style.display === "flex") {
    setTimeout;
    z.style.display = "block";
    x.style.display = "block";
    var t = document.getElementById(`tituloFG`);
    t.style.display = "block";
    newGrupo.forEach((grupo) => {
      var w = document.getElementById(`partido${grupo}`);
      w.style.display = "block";
      w.style.transition = "all 2s linear";
      z.style.transition = "all 2s linear";
      x.style.transition = "all 2s linear";
    });
  } else {
    z.style.display = "flex";
    z.style.justifyContent = "center";
    x.style.display = "block";
    var t = document.getElementById(`tituloFG`);
    t.style.display = "none";

    newGrupo.forEach((grupo) => {
      var w = document.getElementById(`partido${grupo}`);
      w.style.display = "none";
    });
  }
}





/////////////////////////////COUNTDOWN///////////////////////////

// let datetime = new Date("Nov 20, 2022 13:00:00").getTime() / 1000;

// var flipdown = new FlipDown(datetime, {
//   theme: "light", // or dark
// });
// flipdown.start();

// function cambiarNombreUsuario(inputField) {
//   Swal.fire({
//     text: "Estas seguro de cambiar tu nombre de usuario?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Cambiar",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       let request = {
//         method: "POST",
//         body: JSON.stringify({
//           user_id: USER.id,
//           username: inputField,
//         }),
//       };

//       fetch("http://fprode.nachofernan.com/api/editar_nombre_usuario", request)
//         .then((res) => res.json())
//         .then((data) => {
//           location.reload();
//         })

//         .catch((error) => console.error("Error:", error));
//     }
//   });
// }



console.log("Hecho por Matias Bianchi(Front-end) y Nacho Fernandez(Back-end)");
console.log("https://github.com/matibian/Fixture-Qatar-22");

