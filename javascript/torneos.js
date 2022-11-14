const API_URL = "http://fprode.nachofernan.com/api/";

// PARTIDOMUNSTORAGE = localStorage.getItem("partidoMunstore");
// const PARTIDOMUN = JSON.parse(PARTIDOMUNSTORAGE) ?? [];

// const PARTIDOSTORAGE = localStorage.getItem("PartidoStorage");
// const PARTIDOUSUARIO = JSON.parse(PARTIDOSTORAGE) ?? [];

const USERSTORAGE = localStorage.getItem("user");
function redirect() {
  window.location = "./login.html";
}
const USER = JSON.parse(USERSTORAGE) ?? redirect();

document.getElementById("navbarDropdownMenuLink").innerHTML = USER.username;
const logout = document.getElementById("logout");
logout.addEventListener("click", (e) => {
  localStorage.removeItem("user");
  redirect();
});

puntosGanados = 3;
puntosGoles = 1;

let TORNEOGENERAL = [];
let TORNEOSIND = [];
let USUARIOS = [];

/////////////////////////////ENVIO DE RESULTADOS///////////////////////////

// let PUNTOS = 0;

// PARTIDOMUN.forEach((partidomun, i) => {
//   Pts = 0;
//   if (partidomun.terminado == true) {
//     if (
//       partidomun.geq1 > partidomun.geq2 &&
//       PARTIDOUSUARIO[i].geq1 > PARTIDOUSUARIO[i].geq2
//     ) {
//       PUNTOS += puntosGanados;
//       Pts += puntosGanados;
//     } else if (
//       partidomun.geq1 == partidomun.geq2 &&
//       PARTIDOUSUARIO[i].geq1 == PARTIDOUSUARIO[i].geq2
//     ) {
//       PUNTOS += puntosGanados;
//       Pts += puntosGanados;
//     } else if (
//       partidomun.geq1 < partidomun.geq2 &&
//       PARTIDOUSUARIO[i].geq1 < PARTIDOUSUARIO[i].geq2
//     ) {
//       PUNTOS += puntosGanados;
//       Pts += puntosGanados;
//     }
//     if (partidomun.geq1 == PARTIDOUSUARIO[i].geq1) {
//       PUNTOS += puntosGoles;
//       Pts += puntosGoles;
//     }
//     if (partidomun.geq2 == PARTIDOUSUARIO[i].geq2) {
//       PUNTOS += puntosGoles;
//       Pts += puntosGoles;
//     }
//   }
const PRONOSTICOS = "pronosticos/" + USER.id;

fetch(API_URL + PRONOSTICOS)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((partido) => {
      const tabla = document.getElementById("tabla");
      const res = document.createElement("tr");
      res.innerHTML = `
            <td> PAIS 1 || 0-0|| PAIS 2</td>
            <td> PAIS 1 || ${partido.local}-${partido.visita} || PAIS 2 </td>
            <td class="usupuntos"> PUNTOS </td>
            <td class="usupuntos"> PUNTOS </td>`;
      tabla.prepend(res);
    });
  })
  .catch((error) => console.error("Error:", error));

fetch(API_URL + "user_all/" + USER.id)
  .then((res) => res.json())
  .then((data) => {
    let puntostotal = document.getElementById("spanpuntos");
    puntostotal.innerHTML = data.puntos;

    document.getElementById("tablaUsuario").addEventListener("click", (e) => {
      document.getElementById("collapse").classList.toggle("show");
      const s = document.querySelector(".flechita");
      if (s.classList.contains("fa-caret-down")) {
        s.classList.remove("fa-caret-down");
        s.classList.add("fa-caret-up");
      } else {
        s.classList.remove("fa-caret-up");
        s.classList.add("fa-caret-down");
      }
    });
  })

  .catch((error) => console.error("Error:", error));

// document.getElementById("tablaUsuario").addEventListener("click", (e) => {
//   document.getElementById("collapse").classList.toggle("show");
//   const s = document.querySelector(".flechita");
//   if (s.classList.contains("fa-caret-down")) {
//     s.classList.remove("fa-caret-down");
//     s.classList.add("fa-caret-up");
//   } else {
//     s.classList.remove("fa-caret-up");
//     s.classList.add("fa-caret-down");
//   }
// });

// class Usuarios {
//   constructor(nombre, usuario, puntos, mail, id) {
//     this.nombre = nombre;
//     this.usuario = usuario;
//     this.puntos = puntos;
//     this.mail = mail;
//     this.id = id;
//   }
// }

// const mati = new Usuarios("Mati", "matute", 10, "matubianchi@gmail.com", 1);
// const gudi = new Usuarios("Ignacio", "gudi", 120, "nachofernan@gmail.com", 2);
// const marcos = new Usuarios("Marcos", "marquitos", 132, "bla@gmail.com", 3);
// const pablo = new Usuarios("Pablo", "pablito", 114, "bla@gmail.com", 4);
// const andres = new Usuarios("Andres", "bro", 125, "bla@gmail.com", 5);
// const juani = new Usuarios("Juan Ignacio", "cabe", 105, "bla@gmail.com", 6);
// const juampa = new Usuarios("Juan Pablo", "gordo", 121, "bla@gmail.com", 7);
// const lucas = new Usuarios("lucas", "lulo", 123, "bla@gmail.com", 8);
// const majo = new Usuarios("majo", "majo", 119, "bla@gmail.com", 8);
// const gon = new Usuarios("gon", "gon", 128, "bla@gmail.com", 8);
// const tom = new Usuarios("tom", "tom", 133, "bla@gmail.com", 8);
// const tincho = new Usuarios("tincho", "tincho", 113, "bla@gmail.com", 8);
// const leti = new Usuarios("leti", "leti", 110, "bla@gmail.com", 8);
// const lore = new Usuarios("lore", "lore", 112, "bla@gmail.com", 8);
// const toto = new Usuarios("toto", "toto", 127, "bla@gmail.com", 8);

// USUARIOS.push(mati);
// USUARIOS.push(gudi);
// USUARIOS.push(marcos);
// USUARIOS.push(pablo);
// USUARIOS.push(andres);
// USUARIOS.push(juani);
// USUARIOS.push(juampa);
// USUARIOS.push(lucas);
// USUARIOS.push(majo);
// USUARIOS.push(gon);
// USUARIOS.push(tom);
// USUARIOS.push(tincho);
// USUARIOS.push(leti);
// USUARIOS.push(lore);
// USUARIOS.push(toto);

// class TorneoInd {
//   constructor(nombre, usuarios, id) {
//     this.nombre = nombre;
//     this.usuarios = usuarios;
//     this.id = id;
//   }
// }

// const Pibes = new TorneoInd(
//   "Pibes",
//   [mati, gudi, pablo, andres, juani, lucas, juampa],
//   1
// );
// const Laburo = new TorneoInd("Laburo", [mati, tincho, leti, lore], 2);
// const Flia = new TorneoInd("Flia", [mati, majo, gon, tom], 3);
// const Coderhouse = new TorneoInd("Coderhouse", [mati, toto, andres], 4);

// TORNEOSIND.push(Pibes);
// TORNEOSIND.push(Laburo);
// TORNEOSIND.push(Flia);
// TORNEOSIND.push(Coderhouse);

// let torneoSort = () => {
//   TORNEOSIND.forEach((torneo) => {
//     torneo.usuarios.sort((a, b) => b.puntos - a.puntos);
//   });
// };

// TOR = TORNEOSIND.usuarios;

let nombretorn = document.getElementById("torneosgen");

let torneoonchange = document.getElementById("individuales");

let cargaTorneosInd = (TORNEOS) => {
  TORNEOS.forEach((torneo) => {
    console.log(torneo.torneo.nombre);
    agregarEventListener(TORNEOS);
    nombretorn.innerHTML += `<option value="T${torneo.torneo.torneo_id}" data-admin="${torneo.torneo.user_id}" >${torneo.torneo.nombre}</option>`;
    const tabla = document.getElementById("torneoindividual");
    const tablaind = document.createElement("tbody");
    tablaind.id = "T" + torneo.torneo.torneo_id;
    tabla.appendChild(tablaind);
    torneo.usuarios.forEach((usuario, index) => {
      crearTablaTorneoPrin(usuario, `T${torneo.torneo.torneo_id}`, index);
    });
    tablaind.style.display = "none";
    tablaind.value = "torneosind";
  });
};

fetch(API_URL + "torneo_user/" + USER.id)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    cargaTorneosInd(data);
  })

  .catch((error) => console.error("Error:", error));

let arrJugadores = [];

const agregarEventListener = (TORNEOS) => {
  const select = document.getElementById("torneosgen");

  select.addEventListener("change", (e) => {
    var selecte = document.getElementById("torneosgen");
    var value = selecte.options[select.selectedIndex].value;
    const GRUPOSTOGGLE = TORNEOS;

    let vereditar = selecte.options[select.selectedIndex].dataset.admin;
    let mostrareditar = document.getElementById("editartorneo");

    if (vereditar == USER.id) {
      mostrareditar.style.display = "";
    } else {
      mostrareditar.style.display = "none";
    }

    const buscartorneo = TORNEOS.find(
      (tor) =>
        tor.torneo.nombre == selecte.options[select.selectedIndex].innerText
    );
    arrJugadores = [];

    buscartorneo.usuarios.forEach((jugador) => {
      arrJugadores.push(jugador);
    });

    listaJugadoresTorneoInd(arrJugadores);

    // document.getElementById(select).style.display = ''

    const newGrupo = GRUPOSTOGGLE.filter((gr) => {
      return gr.torneo.torneo_id !== value;
    });
    newGrupo.forEach((tabla) => {
      document.getElementById("T" + tabla.torneo.torneo_id).style.display =
        "none";
    });
    document.getElementById(value).style.display = "";
  });
};

console.log("Hecho por Matias Bianchi");
console.log("https://github.com/matibian/Fixture-Qatar-22");

// const API_URL = 'https://prode-qatar-default-rtdb.firebaseio.com/Torneos.json'

// const torneosDesdeBD = () => {
//     fetch(API_URL)
//     .then((response) => response.json())
//     .then((data) => {
//         TORNEOSIND = data.Torneos
// cargaTorneosInd()
// mostrarTorneo()
// agregarEventListener()
// USUARIOS.forEach((usuario,index) => {
//     crearTablaTorneoPrin(usuario, 'tabgeneral',index)
// });
// torneoSort()

//     })

// }
// torneosDesdeBD()

async function crearTablaTorneoPrin(u, nom, index) {
  const tabla = document.getElementById(nom);

  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.className = "tabGenUsuario";
  td1.innerHTML = `${index + 1}º`;
  let td2 = document.createElement("td");
  td2.className = "tabGenUsuario";
  td2.innerHTML = u.username;
  let td3 = document.createElement("td");
  td3.className = "tabGenUsuario";
  td3.innerHTML = u.puntos;

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);

  tabla.appendChild(tr);
}

fetch(API_URL + "users_all")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((usuario, index) => {
      crearTablaTorneoPrin(usuario, "tabgeneral", index);
    });
  })
  .catch((error) => console.error("Error:", error));

// USUARIOS.sort((a, b) => b.puntos - a.puntos);
// TORNEOSIND.forEach((torneo) => {
//   torneo.usuarios.sort((a, b) => b.puntos - a.puntos);
// });

// USUARIOS.forEach((usuario, index) => {
//   crearTablaTorneoPrin(usuario, "tabgeneral", index);
// });

// agregarEventListener();
// USUARIOS.forEach((usuario, index) => {
//   crearTablaTorneoPrin(usuario, "tabgeneral", index);
// });
// torneoSort();

//Carga tabla individual al inicio//

// let torind = new Promise((res, rej) => {
//   setTimeout(() => {
//     res(document.getElementsByClassName("fstselected")[0].innerText);
//     //document.getElementById(select).style.display = ''
//   }, 20);
// });
// torind.then((res) => (document.getElementById(res).style.display = ""));

//////////AGREGAR JUGADORES TORNEOSIND///////////////////

//////////EDITAR JUGADORES TORNEOSIND///////////////////
// let jugadoresTorneoInd = [
//   { nombre: "carlos", id: 1 },
//   { nombre: "julio", id: 2 },
//   { nombre: "feli", id: 3 },
// ];

const eliminarJugador = (id_torneo, id) => {
  let request = {
    method: "POST",
    body: JSON.stringify({
      torneo_user_id: id_torneo,
    }),
  };
  fetch(API_URL + "delete_user", request)
    .then((res) => res.json())
    .then((data) => {
      const result = arrJugadores.filter((jug) => jug.id !== id);
      arrJugadores = result;
      document.getElementById("tbodyJugadores").innerHTML = "";
      listaJugadoresTorneoInd(arrJugadores);
    })
    .catch((error) => console.error("Error: ", error));
};

let table = document.createElement("table");
let tbody = document.createElement("tbody");
tbody.id = "tbodyJugadores";
table.appendChild(tbody);

document.getElementById("JugadoresTorneoIndEditar").appendChild(table);

function listaJugadoresTorneoInd(jugador) {
  tbody.innerHTML = "";

  jugador.forEach((jugador) => {
    console.log(jugador);
    let row_1 = document.createElement("tr");
    let row_1_data_1 = document.createElement("td");
    row_1_data_1.innerHTML = jugador.username;
    let row_1_data_2 = document.createElement("td");
    row_1_data_2.innerHTML = `<i id="${jugador.id}" onclick="eliminarJugador(${jugador.torneo_user_id}, ${jugador.id})" class="fa-regular fa-x"></i>`;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    tbody.appendChild(row_1);
  });
}

// listaJugadoresTorneoInd(jugadoresTorneoInd);

// function addItem(inputField) {

//     var listItem = document.createElement("li");
//     listItem.innerText = inputField.value; // passed the field.
//     list.appendChild(listItem);
//     return false; // stop submission
//   }

function agregarJugador(inputField) {
  console.log(inputField.value);

  // arrJugadores.push({ nombre: inputField.value, id: 0 });
  document.getElementById("tbodyJugadores").innerHTML = "";
  // listaJugadoresTorneoInd(jugadoresTorneoInd);
  return false
  
}

const jugadoresTorneo = [];

function agregarJugadorTorneo(nombre) {
  console.log(nombre);
  jugadoresTorneo.push(nombre);
  console.log(jugadoresTorneo);
}

function agregarTorneo(inputField) {
  let request = {
    method: "POST",
    body: JSON.stringify({
      user_id: USER.id,
      nombre: inputField,
    }),
  };

  fetch(API_URL + "torneo", request)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      // cargaTorneosInd(data)
      location.reload();
    })

    .catch((error) => console.error("Error:", error));

  return false; // stop submission
}
