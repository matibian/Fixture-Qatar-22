const PARTIDOSTORAGE = localStorage.getItem('PartidoStorage');
const PARTIDO = JSON.parse(PARTIDOSTORAGE) ?? [];


const GUARDSTORAGE = localStorage.getItem('guardadasStorage');
const guardadas = JSON.parse(GUARDSTORAGE) ?? [];


const EQUIPOS = ["Qatar", "Ecuador", "Senegal", "Holanda", "Inglaterra", "Irán", "EEUU", "Gales", "Argentina", "Arabia S.", "México", "Polonia", "Francia", "Australia", "Dinamarca", "Tunez", "España", "Costa Rica", "Alemania", "Japon", "Belgica", "Canada", "Marruecos", "Croacia", "Brazil", "Serbia", "Suiza", "Camerun", "Portugal","Ghana","Uruguay","Corea"]

const GRUPOS = ["A", "B", "C", "D", "E", "F", "G", "H"]

const FASES = ["Fase de grupos", "Octavos de final", "Cuartos de final", "Semifinal", "Final"]

const RANKING = [1441, 1464, 1593, 1679, 1737, 1559, 1635, 1582, 1770, 1435, 1650, 1546, 1765, 1484, 1665, 1508, 1717, 1500, 1659, 1553, 1822, 1474, 1559, 1632, 1838, 1550, 1621, 1485, 1679, 1390, 1644, 1526]

///////////////////////////////ARMADO DE EQUIPOS //////////////////////////////

class Equipo {
    constructor(nombre, ranking) {
        this.nombre = nombre;
        this.ranking = ranking;
    }
}

const EQUIPO = [];

EQUIPOS.forEach((nombre,index) => {
    
    const equipox = new Equipo (nombre, RANKING[index])
    EQUIPO.push(equipox)

});




///////////////////////////////ARMADO DE GRUPOS //////////////////////////////

class Grupo {
    constructor(nombre, equipos, partidos) {
        this.nombre = nombre;
        this.equipo = equipos;
        this.partido = partidos;
    }
}
const GRUPO = [];

let multl = 0; 


GRUPOS.forEach((nombre,index) => {
    
    const grupox = new Grupo (nombre, [EQUIPO[multl+index], EQUIPO[multl+index+1], EQUIPO[multl+index+2], EQUIPO[multl+index+3]], [])
    GRUPO.push(grupox)
    
    multl = multl + 3

});



class Partido {
    constructor(eq1, eq2, geq1, geq2, terminado, id, grupo){
        this.eq1 = eq1;
        this.eq2 = eq2;
        this.geq1 = geq1;
        this.geq2 = geq2;
        this.terminado = terminado;
        this.id = id;
        this.grupo = grupo;
    }
}

id = 0


GRUPO.forEach((grupo) => {
    id++
    const partido1 = new Partido (grupo.equipo[0],grupo.equipo[1], 0, 0 , false, id, grupo.nombre);
    grupo.partido.push(partido1)
    id++
    const partido2 = new Partido (grupo.equipo[2],grupo.equipo[3], 0, 0 , false, id, grupo.nombre);
    grupo.partido.push(partido2)
    id++
    const partido3 = new Partido (grupo.equipo[0],grupo.equipo[2], 0, 0 , false, id, grupo.nombre);
    grupo.partido.push(partido3)
    id++
    const partido4 = new Partido (grupo.equipo[1],grupo.equipo[3], 0, 0 , false, id, grupo.nombre);
    grupo.partido.push(partido4)
    id++
    const partido5 = new Partido (grupo.equipo[0],grupo.equipo[3], 0, 0 , false, id, grupo.nombre);
    grupo.partido.push(partido5)
    id++
    const partido6 = new Partido (grupo.equipo[1],grupo.equipo[2], 0, 0 , false, id, grupo.nombre);
    grupo.partido.push(partido6)
    
    if (PARTIDOSTORAGE == null) {
    PARTIDO.push(partido1)
    PARTIDO.push(partido2)
    PARTIDO.push(partido3)
    PARTIDO.push(partido4)
    PARTIDO.push(partido5)
    PARTIDO.push(partido6)
    }

});


////////////////////// TABLAS EQUIPOS POR GRUPO/////////////////////////


function tablaEquipos (grupo) { 


    let ul = document.createElement("ul")
    
    document.getElementById('grup'+ grupo.nombre).appendChild(ul);

    grupo.equipo.forEach(equipo => {
        
    let eq = document.createElement('li');
    eq.innerHTML = equipo.nombre
    ul.appendChild(eq)

    
    });
}



let tablaEq = document.getElementById("gruposPrin");

GRUPO.forEach((grupo) => {

tablaEq.innerHTML += `<div onclick="funcTogglePRO('Grupo${grupo.nombre}')" class="grupos" id="grup${grupo.nombre}"> <h3> Grupo ${grupo.nombre}</h3>`
tablaEquipos(grupo)

tablaEq.innerHTML += `</div>`
})



GRUPO.forEach(grupo => {
    grupo.equipo.sort((a, b) => b.puntos - a.puntos || b.difGol - a.difGol);

});






////////////////////// TABLAS PARTIDOS POR GRUPO/////////////////////////

function crearTablaPartidos(grupo) {


    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    
    table.appendChild(thead);
    table.appendChild(tbody);
    
    


    document.getElementById('partidoGrupo'+ grupo.nombre).appendChild(table);
    grupo.partido.forEach(partido => {
    let row_1 = document.createElement('tr');
    let row_1_data_1 = document.createElement('td');
    row_1_data_1.className = 'tablaequipo'
    row_1_data_1.innerHTML = partido.eq1.nombre;
    let row_1_data_2 = document.createElement('td');
    const geq1 = PARTIDO.findIndex(obj => obj.id == partido.id)
    if (PARTIDO[geq1].terminado == true) {
        row_1_data_2.innerHTML = `<input type="number" min="0" value= "${PARTIDO[geq1].geq1}" id="${partido.id}L" class="g${grupo.nombre} goles">`
    } else {
        row_1_data_2.innerHTML = `<input type="number" min="0" value= "" placeholder="-" id="${partido.id}L" class="g${grupo.nombre} goles">` //partido.geq1 ;
    }
    let row_1_data_3 = document.createElement('td');
    const geq2 = PARTIDO.findIndex(obj => obj.id == partido.id)
    
    if (PARTIDO[geq2].terminado == true) {
        row_1_data_3.innerHTML = `<input type="number" min="0" value= "${PARTIDO[geq2].geq2}" id="${partido.id}V" class="g${grupo.nombre} goles">` //partido.geq2 ;
    } else {
        row_1_data_3.innerHTML = `<input type="number" min="0" value= "" placeholder="-" id="${partido.id}V" class="g${grupo.nombre} goles">` //partido.geq1 ;
    }
    //row_1_data_3.innerHTML = `<input type="number" min="0" value= "${PARTIDO[geq2].geq2}" id="${partido.id}V" class="g${grupo.nombre} goles">` //partido.geq2 ;
    let row_1_data_4 = document.createElement('td');
    row_1_data_4.className = 'tablaequipo'
    row_1_data_4.innerHTML = partido.eq2.nombre;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);

    
    
    });
    let guardar = document.createElement('h3');
    guardar.innerHTML = 'Guardar';
    guardar.className = 'guardar';
    guardar.id = 'guardar'+grupo.nombre;
    insertAfter(table, guardar);
}


let tabla = document.getElementById ('tablasPartidosProde');

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }


GRUPO.forEach((grupo) => {

    tabla.innerHTML += `<div class="grupo filterDiv Grupo${grupo.nombre}" id="partidoGrupo${grupo.nombre}"> <h3>Grupo ${grupo.nombre}</h3>`
    crearTablaPartidos(grupo)
    tabla.innerHTML += `</div>`

});



////////////////////////////////////////////////////// GUARDAR TABLAS //////////////////////////////////////////////////////////////


function funcenviar() {
    let enviar = document.getElementById('enviar')
    if (guardadas.length == 8) {
        enviar.style.display = 'block'
    }else{
        enviar.style.display = 'none'
    }
}


GRUPOS.forEach(grupo => {
    /////////////////// GUARDADO EN STORAGE ////////////////
    const block = guardadas.indexOf(`guardar${grupo}`);
    const c = document.getElementById(`guardar${grupo}`);
    if (block > -1) { 
        let a = document.getElementsByClassName(`g${grupo}`);
        for (let index = 0; index < a.length; index++) {
            a[index].setAttribute("disabled","");
        }

        c.className += " active";
        document.getElementById(`guardar${grupo}`).innerText = "Editar"
    }
    /////////////////// EVENT LISTENER ////////////////
    let boton = document.getElementById(`guardar${grupo}`);
    boton.addEventListener('click', () =>{
        if (boton.classList.contains('active')){
            let b = document.getElementsByClassName(`g${grupo}`);
            for (let index = 0; index < b.length; index++) {
                b[index].removeAttribute("disabled");
                boton.classList.remove("active");
                document.getElementById(`guardar${grupo}`).innerText = "Guardar"
                
            }
            const bus = guardadas.indexOf(`guardar${grupo}`);
            guardadas.splice(bus, 1); 

        } else {
            let b = document.getElementsByClassName(`g${grupo}`);
            for (let index = 0; index < b.length; index++) {
                b[index].setAttribute("disabled","");
            }
            boton.className += " active";
            document.getElementById(`guardar${grupo}`).innerText = "Editar"
            guardadas.push(`guardar${grupo}`);

            Swal.fire({
                icon: 'success',
                title: 'Guardado!',
                showConfirmButton: false,
                color : '#821a4b',
                timer: 1000
            })
        }

        funcenviar()

    const localstoGuar = JSON.stringify(guardadas)
    localStorage.setItem('guardadasStorage', localstoGuar)


    })

    funcenviar()
});




tabla.addEventListener("change", (e) => {
    let id = e.target.id.slice(0, -1);
    const objIndex = PARTIDO.findIndex(obj => obj.id == id)

    PARTIDO[objIndex].terminado = true

    if (e.target.id.split("").pop()== "L") {
        PARTIDO[objIndex].geq1 = document.getElementById(e.target.id).value
    } else {
        PARTIDO[objIndex].geq2 = document.getElementById(e.target.id).value
    }

    const localstoGru = JSON.stringify(GRUPO)
    const localstoPart = JSON.stringify(PARTIDO)
    localStorage.setItem('PartidoStorage', localstoPart)

    localStorage.setItem('GrupoStorage', localstoGru)

    });
    



//////////////////////////// PLAYOFFS ///////////////////////////////////



class PartidoPlayoff {
    constructor(eq1, eq2, geq1, geq2, pen1, pen2, terminado, id){
        this.eq1 = eq1;
        this.eq2 = eq2;
        this.geq1 = geq1;
        this.geq2 = geq2;
        this.pen1 = pen1;
        this.pen2 = pen2;
        this.terminado = terminado;
        this.id = id;
    }
}

const PLAYOFFS = ["1ºA", "2ºB", "1ºC", "2ºD", "1ºE", "2ºF", "1ºG", "2ºH", "2ºA", "1ºB", "2ºC", "1ºD", "2ºE", "1ºF", "2ºG", "1ºH", "Cuartos 1", "Cuartos 2", "Cuartos 3", "Cuartos 4", "Cuartos 5", "Cuartos 6", "Cuartos 7", "Cuartos 8", "Semifinal 1", "Semifinal 2", "Semifinal 3", "Semifinal 4", "Final 1", "Final 2"]

const PARTIDOPLAYOFF = [];


let i = 0
for (let j = 0; j < 7; j++) {
    id++
    const partido1 = new PartidoPlayoff (PLAYOFFS[i],PLAYOFFS[i+1],0 ,0 , 0, 0 , false, id);
    PARTIDOPLAYOFF.push(partido1)
    id++
    const partido2 = new PartidoPlayoff (PLAYOFFS[i+2],PLAYOFFS[i+3],0 ,0 , 0, 0 , false, id);
    PARTIDOPLAYOFF.push(partido2)
    i += 4
}
const partidoFin = new PartidoPlayoff (PLAYOFFS[i],PLAYOFFS[i+1],0 ,0 , 0, 0 , false, id);
    PARTIDOPLAYOFF.push(partidoFin)
    id++



//////////////////////////// OCTAVOS ///////////////////////////////////

let partidosOctavos = PARTIDOPLAYOFF.slice(0, 8);

function crearTablaPartidosOctavos() {


    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    
    table.appendChild(thead);
    table.appendChild(tbody);
    

    document.getElementById('partidosOctavos').appendChild(table);

    partidosOctavos.forEach(partido => {

    
        
    let row_1 = document.createElement('tr');
    let row_1_data_1 = document.createElement('td');
    row_1_data_1.innerHTML = partido.eq1;
    let row_1_data_2 = document.createElement('td');


    const geq1 = partidosOctavos.findIndex(obj => obj.id == partido.id)
    row_1_data_2.innerHTML = `<input type="number" min="0" value= "" placeholder="-" id= "${partido.id}L" class=" goles">`
    let row_1_data_3 = document.createElement('td');
    const geq2 = partidosOctavos.findIndex(obj => obj.id == partido.id)
    row_1_data_3.innerHTML = `<input type="number" min="0" min="0" value= "" placeholder="-" id= "${partido.id}V" class=" goles">`

    let row_1_data_4 = document.createElement('td');
        row_1_data_4.innerHTML = partido.eq2;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
    });
}


let tablaOctavos = document.getElementById ('tablasPartidosPlayoffProde');
tablaOctavos.innerHTML += `<div class="grupo" id="partidosOctavos"> <h3>${FASES[1]}</h3>`
crearTablaPartidosOctavos()
tablaOctavos.innerHTML += `</div>`

tablaOctavos.addEventListener("change", (e) => {
    let id = e.target.id.slice(0, -1);
    const objIndex = partidosOctavos.findIndex(obj => obj.id == id)

    partidosOctavos[objIndex].terminado = true

    if (e.target.id.split("").pop()== "L") {
        partidosOctavos[objIndex].geq1 = document.getElementById(e.target.id).value
    } else {
        partidosOctavos[objIndex].geq2 = document.getElementById(e.target.id).value
    }


    const localstoPartOff = JSON.stringify(partidosOctavos)
    localStorage.setItem('PartidosOFFStorage', localstoPartOff)
    });



//////////////////////////// CUARTOS ///////////////////////////////////

const Cuartos = []

let partidosCuartos = PARTIDOPLAYOFF.slice(8, 12);
const [a,b,c,d] = partidosCuartos


function crearTablaPartidosCuartos() {


    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    
    table.appendChild(thead);
    table.appendChild(tbody);
    
    document.getElementById('partidosCuartos').appendChild(table);

    partidosCuartos.forEach(partido => {
        
    let row_1 = document.createElement('tr');
    let row_1_data_1 = document.createElement('td');
    row_1_data_1.innerHTML = partido.eq1;
    let row_1_data_2 = document.createElement('td');
    let row_1_data_3 = document.createElement('td');

    row_1_data_2.innerHTML = `<input type="number" min="0" value= "" placeholder="-" class="goles" id="id${partido.id}eq1">` //`<input type="number" class="goles">`;
    row_1_data_3.innerHTML = `<input type="number" min="0" value= "" placeholder="-" class="goles" id="id${partido.id}eq2">` //`<input type="number" class="goles">`;

    let row_1_data_4 = document.createElement('td');
        row_1_data_4.innerHTML = partido.eq2;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
    });
}




//////////////////////////// SEMIFINAL ///////////////////////////////////


const partidosSemi = PARTIDOPLAYOFF.slice(12, 14);



function crearTablaPartidosSemi() {


    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    
    table.appendChild(thead);
    table.appendChild(tbody);
    

    document.getElementById('partidosSemi').appendChild(table);

    partidosSemi.forEach(partido => {
        
    let row_1 = document.createElement('tr');
    let row_1_data_1 = document.createElement('td');
    row_1_data_1.innerHTML = partido.eq1;
    let row_1_data_2 = document.createElement('td');
    let row_1_data_3 = document.createElement('td');

    row_1_data_2.innerHTML = `<input type="number" min="0" value= "" placeholder="-" class="goles" id="id${partido.id}eq1">` //`<input type="number" class="goles">`;
    row_1_data_3.innerHTML = `<input type="number" min="0" value= "" placeholder="-" class="goles" id="id${partido.id}eq2">` //`<input type="number" class="goles">`;

    let row_1_data_4 = document.createElement('td');
        row_1_data_4.innerHTML = partido.eq2;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
    });
}



//////////////////////////// FINAL ///////////////////////////////////




const partidoFinal  = PARTIDOPLAYOFF[14];


function crearTablaPartidoFinal() {


    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    
    table.appendChild(thead);
    table.appendChild(tbody);
    

    document.getElementById('partidoFinal').appendChild(table);


    let row_1 = document.createElement('tr');
    let row_1_data_1 = document.createElement('td');
    row_1_data_1.innerHTML = partidoFinal.eq1;
    let row_1_data_2 = document.createElement('td');
    let row_1_data_3 = document.createElement('td');

    row_1_data_2.innerHTML = `<input type="number" min="0" value= "" placeholder="-" class="goles" id="id${partidoFinal.id}eq1">` 
    partidoFinal.geq1 = row_1_data_2.innerHTML
    row_1_data_3.innerHTML = `<input type="number" min="0" value= "" placeholder="-" class="goles" id="id${partidoFinal.id}eq1">` //`<input type="number" class="goles">`;
    partidoFinal.geq2 = row_1_data_3.innerHTML
    let row_1_data_4 = document.createElement('td');
    row_1_data_4.innerHTML = partidoFinal.eq2;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
    };




let tablaCuartos = document.getElementById ('tablasPartidosPlayoffProde');
tablaCuartos.innerHTML += `<div class="grupo" id="partidosCuartos"> <h3>${FASES[2]}</h3>`
crearTablaPartidosCuartos()
tablaCuartos.innerHTML += `</div>`

let tablaSemi = document.getElementById ('tablasPartidosPlayoffProde');
tablaSemi.innerHTML += `<div class="grupo" id="partidosSemi"> <h3>${FASES[3]}</h3>`
crearTablaPartidosSemi()
tablaSemi.innerHTML += `</div>`

let tablaFinal = document.getElementById ('tablasPartidosPlayoffProde');
tablaFinal.innerHTML += `<div class="grupo" id="partidoFinal"> <h3>${FASES[4]}</h3>`
crearTablaPartidoFinal()
tablaFinal.innerHTML += `</div>`




////////////////////// FUNCION TOGGLE ////////////////////////

const GRUPOSTOGGLE = ["GrupoA", "GrupoB", "GrupoC", "GrupoD", "GrupoE", "GrupoF", "GrupoG", "GrupoH"]

function funcTogglePRO(tabla) {
    const newGrupo = GRUPOSTOGGLE.filter(gr => {
        return gr !== tabla
    })

    var z = document.getElementById(`zonaGrupos`);
    var x = document.getElementById(`partido${tabla}`);


    if (z.style.display === "flex") {
        setTimeout
        z.style.display = "block";
        x.style.display = "block";
        var t = document.getElementById(`tituloFG`);
        t.style.display = "block"
        newGrupo.forEach(grupo => {
            var w = document.getElementById(`partido${grupo}`);
            w.style.display = "block";
            w.style.transition= "all 2s linear";
            z.style.transition= "all 2s linear";
            x.style.transition= "all 2s linear";
        })
    }

    else {
        

        z.style.display = "flex";
        z.style.justifyContent = "center";
        x.style.display = "block";
        var t = document.getElementById(`tituloFG`);
        t.style.display = "none"


        newGrupo.forEach(grupo => {
            var w = document.getElementById(`partido${grupo}`);
            w.style.display = "none";

    })
    }
    
    
}



/////////////////////////////RANDOM CON RANKING///////////////////////////

// Probabilidad sobre goles
function weightedRandom(prob) {
    let i, sum=0, r=Math.random();
    for (i in prob){
        sum += prob[i];
        if (r<=sum) return i
    }
}

// Itero 5 veces la posibilidad de gol
function randomG(w){ 
    var r = 0;
    for(var i = 5; i > 0; i --){
        r += Math.round(weightedRandom(w));
    }
    return r;
}

// Funcion random sin probabilidad (para penales)
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}


let botonRandom = document.getElementById('botonrandom')
// Probabilidad sobre partidos en funcion al ranking FIFA
botonRandom.addEventListener("click", (e) => {
    PARTIDO.forEach((partido) => {
        let guardado = document.getElementById(`guardar${partido.grupo}`);
        // Diferencia de ranking mayor(1838, brazil) y menor (1390, Ghana)dividido el 95% de que gane : 4.71
        if (partido.terminado==false && !guardado.classList.contains('active')) {
        let dif = (partido.eq1.ranking - partido.eq2.ranking) / 4.71
        let porceq1 = (50 + 0.5*dif)*.01
        let porceq2 = (50 - 0.5*dif)*.01
        partido.geq1 = randomG({0:porceq2, 1:porceq1})
        partido.geq2 = randomG({0:porceq1, 1:porceq2})
        partido.terminado = true

        const goles1 = document.getElementById(`${partido.id}L`)
        goles1.value = partido.geq1
        const goles2 = document.getElementById(`${partido.id}V`)
        goles2.value = partido.geq2

        const localstoPart = JSON.stringify(PARTIDO)
        localStorage.setItem('PartidoStorage', localstoPart)    
    };
})  

Toastify({
    text: "Partidos simulados",
    duration : 1500,
    stopOnFocus: false,
    className: "info",
    style: {
    color: "rgba(130,26,75,255)",
    background: "rgb(255, 255, 255, 0.9)",
    }
}).showToast();

})
/////////////////////////////RESETEO ///////////////////////////

let botonReset = document.getElementById('reset')

botonReset.addEventListener("click", (e) => {

    PARTIDO.forEach((partido) => {
        let guardado = document.getElementById(`guardar${partido.grupo}`);
        if (!guardado.classList.contains('active')){
        const goles1 = document.getElementById(`${partido.id}L`)
        goles1.value = "-"
        const goles2 = document.getElementById(`${partido.id}V`)
        goles2.value = "-"
        partido.geq1 = 0;
        partido.geq2 = 0;
        partido.terminado = false;
        }
    })

    const localstoPart = JSON.stringify(PARTIDO)
    localStorage.setItem('PartidoStorage', localstoPart)
    const localstoPartOct = JSON.stringify(partidosOctavos)
    localStorage.setItem('PartidosOFFStorage', localstoPartOct)

    Toastify({
        text: "Borrado",
        className: "info",
        style: {
        color: "rgba(130,26,75,255)",
        background: "rgb(255, 255, 255, 0.9)",
        }
    }).showToast();
    
})

/////////////////////////////COUNTDOWN///////////////////////////

let datetime = (new Date("Nov 21, 2022 12:00:00").getTime() / 1000)

var flipdown = new FlipDown(datetime, {
    theme: 'light' // or dark
});
flipdown.start();


/////////////////////////////ENVIO DE RESULTADOS///////////////////////////
const botonenviar = document.getElementById('enviar')

botonenviar.onclick = (e) => {
    swal({
        title: "Estas seguro?",
        text: "No se puede deshacer.",
        icon: "warning",
        buttons: true,
        buttonsColor : '#821a4b',
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            swal("Resultados enviados!", {
            icon: "success",
            });
        } 
    });
}


console.log("Hecho por Matias Bianchi")
console.log("https://github.com/matibian/Fixture-Qatar-22")