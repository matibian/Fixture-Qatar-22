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

console.log(USER.username)

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



const PARTIDOS = "partidos";

fetch(API_URL + PARTIDOS)
      .then((res) => res.json())
      .then((data) => {
        let partidosMundial = data;


const PRONOSTICOS = "pronosticos/" + USER.id;

fetch(API_URL + PRONOSTICOS)
  .then((res) => res.json())
  .then((data) => {
    let puntostotal = 0;

    data.forEach((partido) => {
      let equipos = partidosMundial.find(
        (equipos) => equipos.partido_id == partido.partido_id
      );

      puntostotal += partido.resultado;
      const tabla = document.getElementById("tabla");
      const res = document.createElement("tr");
      if (partido.resultado) {
        res.innerHTML = `
            <td> ${equipos.local[0].nombre} || ${equipos.local_goles}-${equipos.visita_goles}|| ${equipos.visita[0].nombre} </td>
            <td> ${equipos.local[0].nombre} || ${partido.local}-${partido.visita} || ${equipos.visita[0].nombre} </td>
            <td class="usupuntos"> ${partido.resultado}  </td>
            <td class="usupuntos"> ${puntostotal} </td>`;
      }


      tabla.prepend(res);
    });

  })
  .catch((error) => console.error("Error:", error));
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


let nombretorn = document.getElementById("torneosgen");

let torneoonchange = document.getElementById("individuales");

let cargaTorneosInd = (TORNEOS) => {
  console.log(TORNEOS)
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
let torneoSelect = "";

const agregarEventListener = (TORNEOS) => {
  const select = document.getElementById("torneosgen");

  select.addEventListener("change", (e) => {
    
    var selecte = document.getElementById("torneosgen");
    var value = selecte.options[select.selectedIndex].value;
    const GRUPOSTOGGLE = TORNEOS;

    let vereditar = selecte.options[select.selectedIndex].dataset;
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
      if (jugador.id !== USER.id){
      console.log(jugador)
      arrJugadores.push(jugador);
    }
    });



    listaJugadoresTorneoInd(arrJugadores);
    torneoSelect = buscartorneo;
    // document.getElementById(select).style.display = ''

    

    const verNombreTorneo = document.getElementById("nombreTorneoCambiar")
    verNombreTorneo.innerHTML = torneoSelect.torneo.nombre

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
  Swal.fire({
    text: "Estas seguro?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
  }).then((result) => {
    if (result.isConfirmed) {
      let request = {
        method: "POST",
        body: JSON.stringify({
          torneo_user_id: id_torneo,
        }),
      };
      fetch(API_URL + "delete_user", request)
        .then((res) => res.json())
        .then((data) => {
          const result = arrJugadores.filter((jug) => jug.id !== id)
          arrJugadores = result;
          document.getElementById("tbodyJugadores").innerHTML = "";
          listaJugadoresTorneoInd(arrJugadores);
          Swal.fire("Borrado", "Listo");
        })
        .catch((error) => console.error("Error: ", error));
    }
  });
};

let table = document.createElement("table");
let tbody = document.createElement("tbody");
tbody.id = "tbodyJugadores";
table.appendChild(tbody);

document.getElementById("JugadoresTorneoIndEditar").appendChild(table);

function listaJugadoresTorneoInd(jugador) {
  tbody.innerHTML = "";

  jugador.forEach((jugador) => {
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

function agregarJugadorTorneo(nombre) {
  if (nombre !== ""){
  arrJugadores.push(nombre);
  }
  listaJugadoresTorneoInd(arrJugadores)
  console.log(jugadoresTorneo);

}

function agregarJugador(inputField) {
  console.log(inputField.value);
  let request = {
    method: "POST",
    body: JSON.stringify({
      email: inputField.value,
      torneo_id: torneoSelect.torneo.torneo_id,
    }),
  };

  fetch(API_URL + "torneo_nuevo_user", request)
    .then((res) => res.json())
    .then((data) => {
      if (data == "El usuario no existe"){
        document.getElementById("errorAgregarUsuario").innerHTML = "  El usuario no existe"
        agregarJugadorTorneo("")
      } else {
      agregarJugadorTorneo(data)
        document.getElementById("errorAgregarUsuario").innerHTML = ""
        document.getElementById("inputAgregar").value = ""
        
      }
    })
    .catch((error) => console.log(error)
      
    );

  document.getElementById("tbodyJugadores").innerHTML = "";
  return false;
}

const jugadoresTorneo = [];



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

// elimina un torneo 

function eliminarTorneo() {
  Swal.fire({
    text: "Estas seguro de borrar el torneo?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
  }).then((result) => {
    if (result.isConfirmed) {
      


      let request = {
        method: "POST",
        body: JSON.stringify({
          torneo_id: torneoSelect.torneo.torneo_id
        }),
      };
    
      fetch(API_URL + "delete_torneo", request)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          // cargaTorneosInd(data)
          location.reload();
        })
    
        .catch((error) => console.error("Error:", error));
    }
  });
}

function cambiarNombreTorneo(inputField) {
  Swal.fire({
    text: "Estas seguro de cambiar tu nombre de torneo?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Cambiar",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(inputField)
      let request = {
          method: "POST",
          body: JSON.stringify({
            torneo_id: torneoSelect.torneo.torneo_id,
            nombre: inputField.value,
          }),
        };
    
      fetch(API_URL+ "editar_torneo", request)
        .then((res) => res.json())
        .then((data) => {
          location.reload();
        })
            .catch((error) => console.error("Error:", error));
    }
  });
}








function cambiarNombreUsuario(inputField) {
  Swal.fire({
    text: "Estas seguro de cambiar tu nombre de usuario?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Cambiar",
  }).then((result) => {
    if (result.isConfirmed) {
      let localData = JSON.parse(localStorage.getItem("user"))
    


      let request = {
          method: "POST",
          body: JSON.stringify({
            user_id: USER.id,
            username: inputField.value,
          }),
        };
      console.log(inputField.value)
    
      fetch("http://fprode.nachofernan.com/api/editar_nombre_usuario", request)
        .then((res) => res.json())
        .then((data) => {
          localData.username = inputField.value
          localData = JSON.stringify(localData)
          localStorage.setItem("user", localData);
          location.reload();
          
        })
            .catch((error) => console.error("Error:", error));
    }
  });
}