const GRUPOSTORAGE = localStorage.getItem('GrupoStorage');
const PARTIDOSTORAGE = localStorage.getItem('PartidoStorage');

const GRUPO = JSON.parse(GRUPOSTORAGE) ?? [];
const PARTIDO = JSON.parse(PARTIDOSTORAGE) ?? [];
console.log(GRUPO)
console.log(PARTIDO)


const EQUIPOS = ["Qatar", "Ecuador", "Senegal", "Holanda", "Inglaterra", "Irán", "EEUU", "Gales", "Argentina", "Arabia Sau.", "México", "Polonia", "Francia", "Australia", "Dinamarca", "Tunez", "España", "Costa Rica", "Alemania", "Japon", "Belgica", "Canada", "Marruecos", "Croacia", "Brazil", "Serbia", "Suiza", "Camerun", "Portugal","Ghana","Uruguay","Corea del Sur"]

const GRUPOS = ["A", "B", "C", "D", "E", "F", "G", "H"]

const FASES = ["Fase de grupos", "Octavos de final", "Cuartos de final", "Semifinal", "Final"]

const RANKING = [1441, 1464, 1593, 1679, 1737, 1559, 1635, 1582, 1770, 1435, 1650, 1546, 1765, 1484, 1665, 1508, 1717, 1500, 1659, 1553, 1822, 1474, 1559, 1632, 1838, 1550, 1621, 1485, 1679, 1390, 1644, 1526]

///////////////////////////////ARMADO DE EQUIPOS //////////////////////////////

class Equipo {
    constructor(nombre, puntos, golesFavor, golesContra, partidosGanados, partidosPerdidos, partidosJugados, partidosEmpatados, difGol, ranking) {
        this.nombre = nombre;
        this.puntos = puntos;
        this.golesFavor = golesFavor;
        this.golesContra = golesContra;
        this.partidosGanados = partidosGanados;
        this.partidosPerdidos = partidosPerdidos;
        this.partidosJugados = partidosJugados;
        this.partidosEmpatados = partidosEmpatados;
        this.difGol = difGol;
        this.ranking = ranking
    }
}

const EQUIPO = [];

EQUIPOS.forEach((nombre,index) => {
    
    const equipox = new Equipo (nombre, 0, 0, 0, 0, 0, 0, 0, 0, RANKING[index])
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


let multl = 0; 

if (JSON.parse(GRUPOSTORAGE) == null ) {
GRUPOS.forEach((nombre,index) => {
    
    const grupox = new Grupo (nombre, [EQUIPO[multl+index], EQUIPO[multl+index+1], EQUIPO[multl+index+2], EQUIPO[multl+index+3]], [])
    GRUPO.push(grupox)
    
    multl = multl + 3

});
}


class Partido {
    constructor(eq1, eq2, geq1, geq2, terminado, id){
        this.eq1 = eq1;
        this.eq2 = eq2;
        this.geq1 = geq1;
        this.geq2 = geq2;
        this.terminado = terminado;
        this.id = id;
    }
}

id = 0


console.log(PARTIDOSTORAGE)

if (PARTIDOSTORAGE == null) {
    console.log("si")
GRUPO.forEach((grupo) => {
    id++
    const partido1 = new Partido (grupo.equipo[0],grupo.equipo[1], 0, 0 , false, id);
    grupo.partido.push(partido1)
    PARTIDO.push(partido1)
    id++
    const partido2 = new Partido (grupo.equipo[2],grupo.equipo[3], 0, 0 , false, id);
    grupo.partido.push(partido2)
    PARTIDO.push(partido2)
    id++
    const partido3 = new Partido (grupo.equipo[0],grupo.equipo[2], 0, 0 , false, id);
    grupo.partido.push(partido3)
    PARTIDO.push(partido3)
    id++
    const partido4 = new Partido (grupo.equipo[1],grupo.equipo[3], 0, 0 , false, id);
    grupo.partido.push(partido4)
    PARTIDO.push(partido4)
    id++
    const partido5 = new Partido (grupo.equipo[0],grupo.equipo[3], 0, 0 , false, id);
    grupo.partido.push(partido5)
    PARTIDO.push(partido5)
    id++
    const partido6 = new Partido (grupo.equipo[1],grupo.equipo[2], 0, 0 , false, id);
    grupo.partido.push(partido6)
    PARTIDO.push(partido6)

});
}


function calcularPuntos(ge1,ge2) {
    let puntos
    let ganador = ""

    if (ge1>ge2) {
        puntos = [3,0]
        ganador = 1

    } else if(ge1<ge2) {
        puntos = [0,3]
        ganador = 2
    } else {
        puntos = [1,1]
        ganador = 0
    }
    return [puntos, ganador]
}


GRUPO.forEach((grupo) => {
    grupo.partido.forEach((partido) => {
        let resultado = calcularPuntos (partido.geq1, partido.geq2)
        if (partido.terminado==true) {
        partido.eq1.partidosJugados ++
        partido.eq2.partidosJugados ++
        partido.eq1.puntos =  partido.eq1.puntos + resultado[0][0]
        partido.eq2.puntos =  partido.eq2.puntos + resultado[0][1]
        
            
        
        switch (resultado[1]) {
            case 0:
                partido.eq1.partidosEmpatados ++
                partido.eq2.partidosEmpatados ++
                break
            case 1 : 
                partido.eq1.partidosGanados ++
                partido.eq2.partidosPerdidos ++
                break
            case 2 : 
                partido.eq2.partidosGanados ++
                partido.eq1.partidosPerdidos ++
                break

                ;
            }
        partido.eq1.golesFavor += partido.geq1
        partido.eq2.golesFavor += partido.geq2
        partido.eq1.difGol += partido.geq1
        partido.eq1.difGol -= partido.geq2
        partido.eq2.difGol += partido.geq2
        partido.eq2.difGol -= partido.geq1
        partido.eq1.golesContra += partido.geq2
        partido.eq2.golesContra += partido.geq1
        }

        });
    

    
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

tablaEq.innerHTML += `<div class="grupos" id="grup${grupo.nombre}"> <h3> Grupo ${grupo.nombre}</h3>`
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
    row_1_data_1.innerHTML = partido.eq1.nombre;
    let row_1_data_2 = document.createElement('td');
    row_1_data_2.innerHTML = `<input type="number" value= "${partido.geq1}" id= "${partido.id}L" class=" goles">` //partido.geq1 ;
    let row_1_data_3 = document.createElement('td');
    row_1_data_3.innerHTML = `<input type="number" value= "${partido.geq2}" id= "${partido.id}V" class=" goles">` //partido.geq2 ;
    let row_1_data_4 = document.createElement('td');
    row_1_data_4.innerHTML = partido.eq2.nombre;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
    

        
        //GRUPO[objIndex].partido.terminado = true;
    


    });
}

let tabla = document.getElementById ('tablasPartidosProde');
GRUPO.forEach((grupo) => {

    tabla.innerHTML += `<div class="grupo filterDiv Grupo${grupo.nombre}" id="partidoGrupo${grupo.nombre}"> <h3>Grupo ${grupo.nombre}</h3>`
    crearTablaPartidos(grupo)
    tabla.innerHTML += `</div>`

});
tabla.addEventListener("change", (e) => {
    let id = e.target.id.slice(0, -1);
    const objIndex = PARTIDO.findIndex(obj => obj.id == id)
    // let objIndex = partido.find (obj => obj.id == id)

    PARTIDO[objIndex].terminado = true
    if (e.target.id.split("").pop()== "L") {
        PARTIDO[objIndex].geq1 = document.getElementById(e.target.id).value
    } else {
        PARTIDO[objIndex].geq2 = document.getElementById(e.target.id).value
    }
    const localstoGru = JSON.stringify(GRUPO)
    const localstoPart = JSON.stringify(PARTIDO)
    console.log

    localStorage.setItem('GrupoStorage', localstoGru)
    localStorage.setItem('PartidoStorage', localstoPart)

    

    
    


    console.log(PARTIDO[objIndex])//.terminado = true
    //console.log(PARTIDO[objIndex].terminado)
    console.log(GRUPO)
    });
    
    //GRUPO[objIndex].partido.terminado = true;



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



//////////////////////////// OCTAVOS ///////////////////////////////////
const OCTAVOS = ["1ºA", "2ºB", "1ºC", "2ºD", "1ºE", "2ºF", "1ºG", "2ºH", "2ºA", "1ºB", "2ºC", "1ºD", "2ºE", "1ºF", "2ºG", "1ºH"]

const partidosOctavos = []
let i = 0
for (let j = 0; j < 4; j++) {
    id++
    const partido1 = new PartidoPlayoff (OCTAVOS[i],OCTAVOS[i+1],0 ,0 , 0, 0 , false, id);
    partidosOctavos.push(partido1)
    id++
    const partido2 = new PartidoPlayoff (OCTAVOS[i+2],OCTAVOS[i+3],0 ,0 , 0, 0 , false, id);
    partidosOctavos.push(partido2)
    i += 4

};


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
    let row_1_data_3 = document.createElement('td');

    row_1_data_2.innerHTML = `<input type="number" value= "0" class="goles" id="id${partido.id}eq1">` //`<input type="number" class="goles">`;
    row_1_data_3.innerHTML = `<input type="number" value= "0" class="goles" id="id${partido.id}eq2">` //`<input type="number" class="goles">`;

    let row_1_data_4 = document.createElement('td');
        row_1_data_4.innerHTML = partido.eq2;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
    });
}






//////////////////////////// CUARTOS ///////////////////////////////////

const Cuartos = []

function partidosPlayoff(partido,Instancia) {
    if (partido.geq2<partido.geq1) {
        ganador = partido.eq1
    } else if (partido.geq2>partido.geq1 ) {
        ganador = partido.eq2
    } else if (partido.pen1>partido.pen2 ) {
        ganador = partido.eq1
    } else {
        ganador = partido.eq2}
    Instancia.push(ganador)

}

partidosOctavos.forEach(partido => {
    partidosPlayoff(partido,Cuartos)
})


const partidosCuartos = [];

let n = 0
for (let j = 0; j < 4; j++) {
    id++
    const partido1 = new PartidoPlayoff (Cuartos[n],Cuartos[n+1], 0, 0, 0, 0 , false, id);
    partidosCuartos.push(partido1)
    id++
    n += 2

};


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
    row_1_data_1.innerHTML = partido.eq1.nombre;
    let row_1_data_2 = document.createElement('td');
    let row_1_data_3 = document.createElement('td');

    row_1_data_2.innerHTML = `<input type="number" value= "0" class="goles" id="id${partido.id}eq1">` //`<input type="number" class="goles">`;
    row_1_data_3.innerHTML = `<input type="number" value= "0" class="goles" id="id${partido.id}eq2">` //`<input type="number" class="goles">`;

    let row_1_data_4 = document.createElement('td');
        row_1_data_4.innerHTML = partido.eq2.nombre;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
    });
}




//////////////////////////// SEMIFINAL ///////////////////////////////////

const Semifinal = []


partidosCuartos.forEach(partido => {
    partidosPlayoff(partido,Semifinal)
})

const partidosSemi = [];

let o = 0
for (let j = 0; j < 2; j++) {
    id++
    const partido1 = new PartidoPlayoff (Semifinal[o],Semifinal[o+1], 0, 0, 0, 0 , false, id);
    partidosSemi.push(partido1)
    id++

    o += 2

};



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
    row_1_data_1.innerHTML = partido.eq1.nombre;
    let row_1_data_2 = document.createElement('td');
    let row_1_data_3 = document.createElement('td');

    row_1_data_2.innerHTML = `<input type="number" value= "0" class="goles" id="id${partido.id}eq1">` //`<input type="number" class="goles">`;
    row_1_data_3.innerHTML = `<input type="number" value= "0" class="goles" id="id${partido.id}eq2">` //`<input type="number" class="goles">`;

    let row_1_data_4 = document.createElement('td');
        row_1_data_4.innerHTML = partido.eq2.nombre;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
    });
}



//////////////////////////// FINAL ///////////////////////////////////

const FINAL = []

partidosSemi.forEach(partido => {
    if (partido.geq2<partido.geq1) {
        ganador = partido.eq1
    } else  {
        ganador = partido.eq2
    }   
    FINAL.push(ganador)
});



const partidoFinal = [];


id++
const partido1 = new PartidoPlayoff (FINAL[0],FINAL[1], 0, 0, 0, 0 , false, id);
partidoFinal.push(partido1)





function crearTablaPartidoFinal() {


    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    
    table.appendChild(thead);
    table.appendChild(tbody);
    

    document.getElementById('partidoFinal').appendChild(table);

    partidoFinal.forEach(partido => {
        
    let row_1 = document.createElement('tr');
    let row_1_data_1 = document.createElement('td');
    row_1_data_1.innerHTML = partido.eq1.nombre;
    let row_1_data_2 = document.createElement('td');
    let row_1_data_3 = document.createElement('td');

    row_1_data_2.innerHTML = `<input type="number" value= "0" class="goles" id="id${partido.id}eq1">` 
    partido.geq1 = row_1_data_2.innerHTML
    row_1_data_3.innerHTML = `<input type="number" value= "0" class="goles" id="id${partido.id}eq1">` //`<input type="number" class="goles">`;
    partido.geq2 = row_1_data_3.innerHTML
    let row_1_data_4 = document.createElement('td');
        row_1_data_4.innerHTML = partido.eq2.nombre;

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



