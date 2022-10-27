PARTIDOMUNSTORAGE = localStorage.getItem('partidoMunstore');
const PARTIDOMUN = JSON.parse(PARTIDOMUNSTORAGE) ?? [];

const PARTIDOSTORAGE = localStorage.getItem('PartidoStorage');
const PARTIDOUSUARIO = JSON.parse(PARTIDOSTORAGE) ?? [];

puntosGanados = 3
puntosGoles = 1

let TORNEOGENERAL = [];
let TORNEOSIND = []
let USUARIOS = []



const tabla = document.getElementById('tabla');


/////////////////////////////ENVIO DE RESULTADOS///////////////////////////

let PUNTOS = 0;


PARTIDOMUN.forEach((partidomun, i) => {
    Pts = 0
    if (partidomun.terminado == true) {
        if (partidomun.geq1>partidomun.geq2 && PARTIDOUSUARIO[i].geq1>PARTIDOUSUARIO[i].geq2) {
            PUNTOS += puntosGanados;
            Pts += puntosGanados;
        } else if (partidomun.geq1==partidomun.geq2 && PARTIDOUSUARIO[i].geq1 == PARTIDOUSUARIO[i].geq2) {
            PUNTOS += puntosGanados;
            Pts += puntosGanados;
        } else if (partidomun.geq1<partidomun.geq2 && PARTIDOUSUARIO[i].geq1<PARTIDOUSUARIO[i].geq2) {
            PUNTOS += puntosGanados;
            Pts += puntosGanados;
        }
        if (partidomun.geq1==PARTIDOUSUARIO[i].geq1){
            PUNTOS += puntosGoles;
            Pts += puntosGoles;
        }
        if (partidomun.geq2==PARTIDOUSUARIO[i].geq2){
            PUNTOS += puntosGoles;
            Pts += puntosGoles;
        }
    }

    const res = document.createElement('tr');
        if (partidomun.terminado == true) {
            res.innerHTML = `
            <td>${partidomun.eq1.nombre} || ${partidomun.geq1}-${partidomun.geq2} || ${partidomun.eq2.nombre}</td>
            <td>${PARTIDOUSUARIO[i].eq1.nombre} || ${PARTIDOUSUARIO[i].geq1}-${PARTIDOUSUARIO[i].geq2} || ${PARTIDOUSUARIO[i].eq2.nombre}</td>
            <td class="usupuntos">${Pts}</td>
            <td class="usupuntos">${PUNTOS}</td>`
            tabla.prepend(res)
        }
        
    
});

let puntostotal = document.getElementById("spanpuntos");
puntostotal.innerHTML = PUNTOS


document.getElementById("tablaUsuario").addEventListener("click", (e) => {

    document.getElementById("collapse").classList.toggle("show");
    const s = document.querySelector(".flechita");
    if (s.classList.contains("fa-caret-down")){
        s.classList.remove("fa-caret-down")
        s.classList.add("fa-caret-up")
    } else {
        s.classList.remove("fa-caret-up")
        s.classList.add("fa-caret-down")
    }
    
})



class Usuarios {
    constructor(nombre, usuario, puntos, mail, id) {
        this.nombre = nombre;
        this.usuario = usuario;
        this.puntos = puntos;
        this.mail = mail;
        this.id = id;
}
}

const mati = new Usuarios("Mati", "matute", PUNTOS, "matubianchi@gmail.com", 1);
const gudi = new Usuarios("Ignacio", "gudi", 120, "nachofernan@gmail.com", 2);
const marcos = new Usuarios("Marcos", "marquitos", 132, "bla@gmail.com", 3);
const pablo = new Usuarios("Pablo", "pablito", 114, "bla@gmail.com", 4);
const andres = new Usuarios("Andres", "bro", 125, "bla@gmail.com", 5);
const juani = new Usuarios("Juan Ignacio", "cabe", 105, "bla@gmail.com", 6);
const juampa = new Usuarios("Juan Pablo", "gordo", 121, "bla@gmail.com", 7);
const lucas = new Usuarios("lucas", "lulo", 123, "bla@gmail.com", 8);
const majo = new Usuarios("majo", "majo", 119, "bla@gmail.com", 8);
const gon = new Usuarios("gon", "gon", 128, "bla@gmail.com", 8);
const tom = new Usuarios("tom", "tom", 133, "bla@gmail.com", 8);
const tincho = new Usuarios("tincho", "tincho", 113, "bla@gmail.com", 8);
const leti = new Usuarios("leti", "leti", 110, "bla@gmail.com", 8);
const lore = new Usuarios("lore", "lore", 112, "bla@gmail.com", 8);
const toto = new Usuarios("toto", "toto", 127, "bla@gmail.com", 8);



USUARIOS.push(mati)
USUARIOS.push(gudi)
USUARIOS.push(marcos)
USUARIOS.push(pablo)
USUARIOS.push(andres)
USUARIOS.push(juani)
USUARIOS.push(juampa)
USUARIOS.push(lucas)
USUARIOS.push(majo)
USUARIOS.push(gon)
USUARIOS.push(tom)
USUARIOS.push(tincho)
USUARIOS.push(leti)
USUARIOS.push(lore)
USUARIOS.push(toto)


class TorneoInd {
    constructor(nombre, usuarios, id) {
        this.nombre = nombre;
        this.usuarios = usuarios;
        this.id = id;
    }
}

const Pibes = new TorneoInd("Pibes", [mati, gudi, pablo, andres, juani, lucas, juampa],1)
const Laburo = new TorneoInd("Laburo", [mati, tincho, leti, lore],2)
const Flia = new TorneoInd("Flia", [mati, majo, gon, tom],3)
const Coderhouse = new TorneoInd("Coderhouse", [mati, toto, andres],4)

TORNEOSIND.push(Pibes);
TORNEOSIND.push(Laburo);
TORNEOSIND.push(Flia);
TORNEOSIND.push(Coderhouse);


let torneoSort = () => {
    TORNEOSIND.forEach(torneo => {
        torneo.usuarios.sort((a, b) => b.puntos - a.puntos)
        })
    }



// TOR = TORNEOSIND.usuarios;
let cargaTorneosInd = () => {
TORNEOSIND.forEach((torneo) => {
    const tabla = document.getElementById('torneoindividual')
    const tablaind = document.createElement('tbody')
    tablaind.id = torneo.nombre;
    tabla.appendChild(tablaind)
    torneo.usuarios.forEach((usuario,index) => {
        crearTablaTorneoPrin(usuario, `${torneo.nombre}`,index)
    });
    tablaind.style.display = 'none';
    tablaind.value = 'torneosind'

});
}

const agregarEventListener = () => {
const select = document.getElementById('fstdiv');

select.addEventListener('change', (e) => {
    var selecte = document.getElementById('fstdiv');
    var value = selecte.options[select.selectedIndex].value;
    

    const GRUPOSTOGGLE = TORNEOSIND

    const newGrupo = GRUPOSTOGGLE.filter(gr => {
        return gr.nombre !== value
    })
    newGrupo.forEach(tabla => {
        document.getElementById(tabla.nombre).style.display = 'none'

    });
    document.getElementById(value).style.display = ''
})
}

console.log("Hecho por Matias Bianchi")
console.log("https://github.com/matibian/Fixture-Qatar-22")

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








function crearTablaTorneoPrin(u, nom, index) {

    
    const tabla = document.getElementById(nom)

    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    td1.className = 'tabGenUsuario'
    td1.innerHTML = `${index+1}º`;
    let td2 = document.createElement('td');
    td2.className = 'tabGenUsuario'
    td2.innerHTML = u.usuario;
    let td3 = document.createElement('td');
    td3.className = 'tabGenUsuario'
    td3.innerHTML = u.puntos;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    tabla.appendChild(tr);

}

USUARIOS.sort((a, b) => b.puntos - a.puntos)
TORNEOSIND.forEach(torneo => {
    torneo.usuarios.sort((a, b) => b.puntos - a.puntos)

});

USUARIOS.forEach((usuario,index) => {
    crearTablaTorneoPrin(usuario, 'tabgeneral',index)
});

cargaTorneosInd()

        agregarEventListener()
        USUARIOS.forEach((usuario,index) => {
            crearTablaTorneoPrin(usuario, 'tabgeneral',index)
        });
        torneoSort()


//Carga tabla individual al inicio//


    const select = document.getElementsByClassName('fstselected')[0].outerText;
    document.getElementById(select).style.display = ''


