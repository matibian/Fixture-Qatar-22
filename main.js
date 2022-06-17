const EQUIPOS = ["Qatar", "Ecuador", "Senegal", "Holanda", "Inglaterra", "Irán", "EEUU", "Gales", "Argentina", "Arabia Sau.", "México", "Polonia", "Francia", "Australia", "Dinamarca", "Tunez", "España", "Costa Rica", "Alemania", "Japon", "Belgica", "Canada", "Marruecos", "Croacia", "Brazil", "Serbia", "Suiza", "Camerun", "Portugal","Ghana","Uruguay","Corea del Sur"]

const GRUPOS = ["A", "B", "C", "D", "E", "F", "G", "H"]

const FASES = ["Fase de grupos", "Octavos de final", "Cuartos de final", "Semifinal", "Final"]



///////////////////////////////ARMADO DE EQUIPOS //////////////////////////////
class Equipo {
    constructor(nombre, puntos, golesFavor, golesContra, partidosGanados, partidosPerdidos, partidosJugados, partidosEmpatados, difGol) {
        this.nombre = nombre;
        this.puntos = puntos;
        this.golesFavor = golesFavor;
        this.golesContra = golesContra;
        this.partidosGanados = partidosGanados;
        this.partidosPerdidos = partidosPerdidos;
        this.partidosJugados = partidosJugados;
        this.partidosEmpatados = partidosEmpatados;
        this.difGol = difGol;
    }
}

const EQUIPO = [];

EQUIPOS.forEach((nombre) => {
    
    const equipox = new Equipo (nombre, 0, 0, 0, 0, 0, 0, 0, 0)
    EQUIPO.push(equipox)

});




///////////////////////////////ARMADO DE GRUPOS //////////////////////////////
let partido1 = 0 //
let partido2 = 0 //

class Grupo {
    constructor(nombre, equipos, partidos) {
        this.nombre = nombre;
        this.equipo = equipos;
        this.partido = partidos;
    }
}


const GRUPO = [];
let l = 0;
let multl = 0; 


GRUPOS.forEach((nombre) => {
    
    const grupox = new Grupo (nombre, [EQUIPO[multl+l], EQUIPO[multl+l+1], EQUIPO[multl+l+2], EQUIPO[multl+l+3]], [])
    GRUPO.push(grupox)
    
    l++
    multl = multl + 3

});


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

GRUPO.forEach((grupo) => {
    id++
    const partido1 = new Partido (grupo.equipo[0],grupo.equipo[1], 0, 0 , false, id);
    grupo.partido.push(partido1)
    id++
    const partido2 = new Partido (grupo.equipo[2],grupo.equipo[3], 0, 0 , false, id);
    grupo.partido.push(partido2)
    id++
    const partido3 = new Partido (grupo.equipo[0],grupo.equipo[2], 0, 0 , false, id);
    grupo.partido.push(partido3)
    id++
    const partido4 = new Partido (grupo.equipo[1],grupo.equipo[3], 0, 0 , false, id);
    grupo.partido.push(partido4)
    id++
    const partido5 = new Partido (grupo.equipo[0],grupo.equipo[3], 0, 0 , false, id);
    grupo.partido.push(partido5)
    id++
    const partido6 = new Partido (grupo.equipo[1],grupo.equipo[2], 0, 0 , false, id);
    grupo.partido.push(partido6)

});

console.log(GRUPO)


function calcularPuntos(ge1,ge2) {
    let puntos
    if (ge1>ge2) {
        puntos = [3,0]
    } else if(ge1<ge2) {
        puntos = [0,3]
    } else {
        puntos = [1,1]
    }

    return puntos
}



GRUPO[2].equipo[0].puntos = 6
GRUPO[2].equipo[1].puntos = 1
GRUPO[2].equipo[2].puntos = 5
GRUPO[2].equipo[3].puntos = 3




GRUPO.forEach(grupo => {
    grupo.equipo.sort((a, b) => {
        if (b.puntos > a.puntos) {
            return 1;
        }
        if (b.puntos < a.puntos) {
            return -1;
        }
        return 0;
    })
    
});









document.write(`<h1 class="titulo"><center>Fixture Mundial Qatar 2022 </center></h1>`)


document.write(`<section class="gruposPrin">`)



////////////////////// TABLAS EQUIPOS POR GRUPO/////////////////////////

for (let i = 0; i < GRUPOS.length; i++) {
    document.write(`<div class="grupos"> <h3>Grupo ${GRUPOS[i]}</h3><ul>`)
    for (let j = 0; j < 4; j++) {
        document.write(
        `
            <li>${EQUIPOS[j+4*i]}</li>`
        )
        
        
    }
    document.write(`</ul></div>`)
}
// GRUPOS.forEach((grupo) => {
    
//     document.write(`<div class="grupos"> <h3>Grupo ${grupo}</h3><ul>`)
//     for (let j = 0; j < 4; j++) {
//         document.write(
//         `
//             <li>${EQUIPOS[j]}</li>`
//         )
        
        
//     }
//     document.write(`</ul></div>`)
// })



document.write(`</section>`)



document.write(`<h2 class="titulo"><center> ${FASES[0]} </center></h2>`)






////////////////////// TABLAS PARTIDOS POR GRUPO/////////////////////////



document.write(`<section class="tablasPartidos">`)


function crearTablaPartidos(grupo) {


    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    
    table.appendChild(thead);
    table.appendChild(tbody);
    
    // Adding the entire table to the body tag
    document.getElementById('partidoGrupo'+ grupo.nombre).appendChild(table);



    let row_1 = document.createElement('tr');
    let row_1_data_1 = document.createElement('td');
    row_1_data_1.innerHTML = grupo.partido[0].eq1.nombre;
    let row_1_data_2 = document.createElement('td');
    row_1_data_2.innerHTML = `<input type="number" class="goles">`;
    let row_1_data_3 = document.createElement('td');
    row_1_data_3.innerHTML = `<input type="number" class="goles">`;
    let row_1_data_4 = document.createElement('td');
    row_1_data_4.innerHTML = grupo.partido[0].eq2.nombre;

    
    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
    
    let row_2 = document.createElement('tr');
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = grupo.partido[1].eq1.nombre;
    let row_2_data_2 = document.createElement('td');
    row_2_data_2.innerHTML = `<input type="number" class="goles">`;
    let row_2_data_3 = document.createElement('td');
    row_2_data_3.innerHTML = `<input type="number" class="goles">`;
    let row_2_data_4 = document.createElement('td');
    row_2_data_4.innerHTML = grupo.partido[1].eq2.nombre;


    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    row_2.appendChild(row_2_data_4);

    tbody.appendChild(row_2);


    // Creating and adding data to third row of the table
    let row_3 = document.createElement('tr');
    let row_3_data_1 = document.createElement('td');
    row_3_data_1.innerHTML = grupo.partido[2].eq1.nombre;
    let row_3_data_2 = document.createElement('td');
    row_3_data_2.innerHTML = `<input type="number" class="goles">`;
    let row_3_data_3 = document.createElement('td');
    row_3_data_3.innerHTML = `<input type="number" class="goles">`;
    let row_3_data_4 = document.createElement('td');
    row_3_data_4.innerHTML = grupo.partido[2].eq2.nombre;

    
    
    row_3.appendChild(row_3_data_1);
    row_3.appendChild(row_3_data_2);
    row_3.appendChild(row_3_data_3);
    row_3.appendChild(row_3_data_4);

    tbody.appendChild(row_3);
    
    
    
    let row_4 = document.createElement('tr');
    let row_4_data_1 = document.createElement('td');
    row_4_data_1.innerHTML = grupo.partido[3].eq1.nombre;
    let row_4_data_2 = document.createElement('td');
    row_4_data_2.innerHTML = `<input type="number" class="goles">`;
    let row_4_data_3 = document.createElement('td');
    row_4_data_3.innerHTML = `<input type="number" class="goles">`;
    let row_4_data_4 = document.createElement('td');
    row_4_data_4.innerHTML = grupo.partido[3].eq2.nombre;

    
    
    row_4.appendChild(row_4_data_1);
    row_4.appendChild(row_4_data_2);
    row_4.appendChild(row_4_data_3);
    row_4.appendChild(row_4_data_4);
    tbody.appendChild(row_4);
    
    
 
    let row_5 = document.createElement('tr');
    let row_5_data_1 = document.createElement('td');
    row_5_data_1.innerHTML = grupo.partido[4].eq1.nombre;
    let row_5_data_2 = document.createElement('td');
    row_5_data_2.innerHTML = `<input type="number" class="goles">`;
    let row_5_data_3 = document.createElement('td');
    row_5_data_3.innerHTML = `<input type="number" class="goles">`;
    let row_5_data_4 = document.createElement('td');
    row_5_data_4.innerHTML = grupo.partido[4].eq2.nombre;

    
    
    row_5.appendChild(row_5_data_1);
    row_5.appendChild(row_5_data_2);
    row_5.appendChild(row_5_data_3);
    row_5.appendChild(row_5_data_4);

    tbody.appendChild(row_5);

    let row_6 = document.createElement('tr');
    let row_6_data_1 = document.createElement('td');
    row_6_data_1.innerHTML = grupo.partido[5].eq1.nombre;
    let row_6_data_2 = document.createElement('td');
    row_6_data_2.innerHTML = `<input type="number" class="goles">`;
    let row_6_data_3 = document.createElement('td');
    row_6_data_3.innerHTML = `<input type="number" class="goles">`;
    let row_6_data_4 = document.createElement('td');
    row_6_data_4.innerHTML = grupo.partido[5].eq2.nombre;


    row_6.appendChild(row_6_data_1);
    row_6.appendChild(row_6_data_2);
    row_6.appendChild(row_6_data_3);
    row_6.appendChild(row_6_data_4);

    tbody.appendChild(row_6);

}




// GRUPO.forEach(grupo => {
    


// let eq1 = grupo.equipo[0].nombre;
// let eq2 = grupo.equipo[1].nombre;
// let eq3 = grupo.equipo[2].nombre;
// let eq4 = grupo.equipo[3].nombre;


// document.write(`<div class="grupo" id="partidoGrupo${grupo.nombre}"> <h3>Grupo ${grupo.nombre}</h3>`)
// crearTablaPartidos(grupo,eq1, eq2, eq3, eq4)
// document.write(`</div>`)

// });

GRUPO.forEach((grupo) => {
    document.write(`<div class="grupo" id="partidoGrupo${grupo.nombre}"> <h3>Grupo ${grupo.nombre}</h3>`)
    crearTablaPartidos(grupo)
    document.write(`</div>`)
});

document.write(`</section>`)


document.write(`<h2 class="titulo"><center> PUNTOS POR GRUPO </center></h2>`)


////////////////////////////////// TABLAS DE PUNTOS POR GRUPO //////////////////

function crearTabla(grupo) {


let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);


document.getElementById('grupo'+ grupo.nombre).appendChild(table);


let row_1 = document.createElement('tr');
let heading_1 = document.createElement('th');
heading_1.innerHTML = "Pais";
let heading_2 = document.createElement('th');
heading_2.innerHTML = "Pts";
let heading_3 = document.createElement('th');
heading_3.innerHTML = "PJ";
let heading_4 = document.createElement('th');
heading_4.innerHTML = "PG";
let heading_5 = document.createElement('th');
heading_5.innerHTML = "PE";
let heading_6 = document.createElement('th');
heading_6.innerHTML = "PP";
let heading_7 = document.createElement('th');
heading_7.innerHTML = "DG";


row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
row_1.appendChild(heading_4);
row_1.appendChild(heading_5);
row_1.appendChild(heading_6);
row_1.appendChild(heading_7);
thead.appendChild(row_1);



let row_2 = document.createElement('tr');
let row_2_data_1 = document.createElement('td');
row_2_data_1.innerHTML = grupo.equipo[0].nombre;
let row_2_data_2 = document.createElement('td');
row_2_data_2.innerHTML = grupo.equipo[0].puntos;
let row_2_data_3 = document.createElement('td');
row_2_data_3.innerHTML = grupo.equipo[0].partidosJugados;
let row_2_data_4 = document.createElement('td');
row_2_data_4.innerHTML = grupo.equipo[0].partidosGanados;
let row_2_data_5 = document.createElement('td');
row_2_data_5.innerHTML = grupo.equipo[0].partidosEmpatados;
let row_2_data_6 = document.createElement('td');
row_2_data_6.innerHTML = grupo.equipo[0].partidosPerdidos;
let row_2_data_7 = document.createElement('td');
row_2_data_7.innerHTML = grupo.equipo[0].difGol;

row_2.appendChild(row_2_data_1);
row_2.appendChild(row_2_data_2);
row_2.appendChild(row_2_data_3);
row_2.appendChild(row_2_data_4);
row_2.appendChild(row_2_data_5);
row_2.appendChild(row_2_data_6);
row_2.appendChild(row_2_data_7);
tbody.appendChild(row_2);


// Creating and adding data to third row of the table
let row_3 = document.createElement('tr');
let row_3_data_1 = document.createElement('td');
row_3_data_1.innerHTML = grupo.equipo[1].nombre;
let row_3_data_2 = document.createElement('td');
row_3_data_2.innerHTML = grupo.equipo[1].puntos;
let row_3_data_3 = document.createElement('td');
row_3_data_3.innerHTML = grupo.equipo[1].partidosJugados;
let row_3_data_4 = document.createElement('td');
row_3_data_4.innerHTML = grupo.equipo[1].partidosGanados;
let row_3_data_5 = document.createElement('td');
row_3_data_5.innerHTML = grupo.equipo[1].partidosEmpatados;
let row_3_data_6 = document.createElement('td');
row_3_data_6.innerHTML = grupo.equipo[1].partidosPerdidos;
let row_3_data_7 = document.createElement('td');
row_3_data_7.innerHTML = grupo.equipo[1].difGol;

row_3.appendChild(row_3_data_1);
row_3.appendChild(row_3_data_2);
row_3.appendChild(row_3_data_3);
row_3.appendChild(row_3_data_4);
row_3.appendChild(row_3_data_5);
row_3.appendChild(row_3_data_6);
row_3.appendChild(row_3_data_7);
tbody.appendChild(row_3);



let row_4 = document.createElement('tr');
let row_4_data_1 = document.createElement('td');
row_4_data_1.innerHTML = grupo.equipo[2].nombre;
let row_4_data_2 = document.createElement('td');
row_4_data_2.innerHTML = grupo.equipo[2].puntos;
let row_4_data_3 = document.createElement('td');
row_4_data_3.innerHTML = grupo.equipo[2].partidosJugados;
let row_4_data_4 = document.createElement('td');
row_4_data_4.innerHTML = grupo.equipo[2].partidosGanados;
let row_4_data_5 = document.createElement('td');
row_4_data_5.innerHTML = grupo.equipo[2].partidosEmpatados;
let row_4_data_6 = document.createElement('td');
row_4_data_6.innerHTML = grupo.equipo[2].partidosPerdidos;
let row_4_data_7 = document.createElement('td');
row_4_data_7.innerHTML = grupo.equipo[2].difGol;


row_4.appendChild(row_4_data_1);
row_4.appendChild(row_4_data_2);
row_4.appendChild(row_4_data_3);
row_4.appendChild(row_4_data_4);
row_4.appendChild(row_4_data_5);
row_4.appendChild(row_4_data_6);
row_4.appendChild(row_4_data_7);
tbody.appendChild(row_4);


let row_5 = document.createElement('tr');
let row_5_data_1 = document.createElement('td');
row_5_data_1.innerHTML = grupo.equipo[3].nombre;
let row_5_data_2 = document.createElement('td');
row_5_data_2.innerHTML = grupo.equipo[3].puntos;
let row_5_data_3 = document.createElement('td');
row_5_data_3.innerHTML = grupo.equipo[3].partidosJugados;
let row_5_data_4 = document.createElement('td');
row_5_data_4.innerHTML = grupo.equipo[3].partidosGanados;
let row_5_data_5 = document.createElement('td');
row_5_data_5.innerHTML = grupo.equipo[3].partidosEmpatados;
let row_5_data_6 = document.createElement('td');
row_5_data_6.innerHTML = grupo.equipo[3].partidosPerdidos;
let row_5_data_7 = document.createElement('td');
row_5_data_7.innerHTML = grupo.equipo[3].difGol;


row_5.appendChild(row_5_data_1);
row_5.appendChild(row_5_data_2);
row_5.appendChild(row_5_data_3);
row_5.appendChild(row_5_data_4);
row_5.appendChild(row_5_data_5);
row_5.appendChild(row_5_data_6);
row_5.appendChild(row_5_data_7);
tbody.appendChild(row_5);



}







//for (let i = 0; i < GRUPOS.length; i++) {

GRUPO.forEach((grupo) => {
    


    document.write(`<div class="tablaGrupos" id="grupo${grupo.nombre}"> <h3>Grupo ${grupo.nombre}</h3>`)
    crearTabla(grupo)
    document.write(`</div>`)

});






