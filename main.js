const EQUIPOS = ["Qatar", "Ecuador", "Senegal", "Holanda", "Inglaterra", "Irán", "EEUU", "Gales", "Argentina", "Arabia Sau.", "México", "Polonia", "Francia", "Australia", "Dinamarca", "Tunez", "España", "Costa Rica", "Alemania", "Japon", "Belgica", "Canada", "Marruecos", "Croacia", "Brazil", "Serbia", "Suiza", "Camerun", "Portugal","Ghana","Uruguay","Corea del Sur"]

const GRUPOS = ["A", "B", "C", "D", "E", "F", "G", "H"]

const FASES = ["Fase de grupos", "Octavos de final", "Cuartos de final", "Semifinal", "Final"]



///////////////////////////////ARMADO DE EQUIPOS //////////////////////////////
class Equipo {
    constructor(nombre, puntos, golesFavor, golesContra, partidosGanados, partidosPerdidos, partidosJugados) {
        this.nombre = nombre;
        this.puntos = puntos;
        this.golesFavor = golesFavor;
        this.golesContra = golesContra;
        this.partidosGanados = partidosGanados;
        this.partidosPerdidos = partidosPerdidos;
        this.partidosJugados = partidosJugados;
    }
}

const EQUIPO = [];

EQUIPOS.forEach((nombre) => {
    
    const equipox = new Equipo (nombre, 0, 0, 0, 0,0, 0)
    EQUIPO.push(equipox)

});

console.log(EQUIPO)



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
    
    const grupox = new Grupo (nombre, [EQUIPO[multl+l], EQUIPO[multl+l+1], EQUIPO[multl+l+2], EQUIPO[multl+l+3]], [0,0])
    GRUPO.push(grupox)
    
    l++
    multl = multl + 3

});






// let grupos = [
//     {
//         nombre : GRUPOS[0],
//         equipos : [
//             equipo_1 : {
//                 nombre : EQUIPOS[0],
//                 puntos : 0,
//                 partidos : 0,
//                 goles_favor: 0,
//                 goles_contra: 0,
//             },
//             equipo_2 : {
//                 nombre : EQUIPOS[1],
//                 puntos : 0,
//                 partidos : 0,
//                 goles_favor: 0,
//                 goles_contra: 0,
//             }
//             equipo_3 : {
//                 nombre : EQUIPOS[2],
//                 puntos : 0,
//                 partidos : 0,
//                 goles_favor: 0,
//                 goles_contra: 0,
//             }
//             equipo_4 : {
//                 nombre : EQUIPOS[3],
//                 puntos : 0,
//                 partidos : 0,
//                 goles_favor: 0,
//                 goles_contra: 0,
//             }
//         ],
//         partidos : [
//             {
//                 local : 1,
//                 visita : 2,
//                 finalizado : false,
//                 goles_local : 0,
//                 goles_visita : 0,
//             }
//         ]
//     },
//     {
//         nombre : "B",
//         equipos : [...],
//         partidos : [...]
//     },
//     ...
// ]





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



document.write(`<h1 class="titulo"><center>Fixture Mundial Qatar 2022 </center></h1>`)


document.write(`<section class="gruposPrin .col-xl-1">`)



////////////////////// TABLAS EQUIPOS POR GRUPO/////////////////////////


GRUPO.forEach((grupo) => {
    
    document.write(`<div class="grupos"> <h3>Grupo ${grupo.nombre}</h3><ul>`)
    for (let j = 0; j < 4; j++) {
        document.write(
        `
            <li>${grupo.equipo[j].nombre}</li>`
        )
        
        
    }
    document.write(`</ul></div>`)
})



document.write(`</section>`)



document.write(`<h2 class="titulo"><center> ${FASES[0]} </center></h2>`)






////////////////////// TABLAS PARTIDOS POR GRUPO/////////////////////////



document.write(`<section class="tablasPartidos">`)


function crearTablaPartidos(grupo,eq1,eq2,eq3,eq4) {


    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    
    table.appendChild(thead);
    table.appendChild(tbody);
    
    // Adding the entire table to the body tag
    document.getElementById('partidoGrupo'+ grupo.nombre).appendChild(table);



    let row_1 = document.createElement('tr');
    let row_1_data_1 = document.createElement('td');
    row_1_data_1.innerHTML = eq1;
    let row_1_data_2 = document.createElement('td');
    row_1_data_2.innerHTML = `<input type="number" class="goles">`;
    let row_1_data_3 = document.createElement('td');
    row_1_data_3.innerHTML = `<input type="number" class="goles">`;
    let row_1_data_4 = document.createElement('td');
    row_1_data_4.innerHTML = eq2;

    
    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
    
    let row_2 = document.createElement('tr');
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = eq3;
    let row_2_data_2 = document.createElement('td');
    row_2_data_2.innerHTML = `<input type="number" class="goles">`;
    let row_2_data_3 = document.createElement('td');
    row_2_data_3.innerHTML = `<input type="number" class="goles">`;
    let row_2_data_4 = document.createElement('td');
    row_2_data_4.innerHTML = eq4;


    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    row_2.appendChild(row_2_data_4);

    tbody.appendChild(row_2);


    // Creating and adding data to third row of the table
    let row_3 = document.createElement('tr');
    let row_3_data_1 = document.createElement('td');
    row_3_data_1.innerHTML = eq1;
    let row_3_data_2 = document.createElement('td');
    row_3_data_2.innerHTML = `<input type="number" class="goles">`;
    let row_3_data_3 = document.createElement('td');
    row_3_data_3.innerHTML = `<input type="number" class="goles">`;
    let row_3_data_4 = document.createElement('td');
    row_3_data_4.innerHTML = eq4;

    
    
    row_3.appendChild(row_3_data_1);
    row_3.appendChild(row_3_data_2);
    row_3.appendChild(row_3_data_3);
    row_3.appendChild(row_3_data_4);

    tbody.appendChild(row_3);
    
    
    
    let row_4 = document.createElement('tr');
    let row_4_data_1 = document.createElement('td');
    row_4_data_1.innerHTML = eq2;
    let row_4_data_2 = document.createElement('td');
    row_4_data_2.innerHTML = `<input type="number" class="goles">`;
    let row_4_data_3 = document.createElement('td');
    row_4_data_3.innerHTML = `<input type="number" class="goles">`;
    let row_4_data_4 = document.createElement('td');
    row_4_data_4.innerHTML = eq3;

    
    
    row_4.appendChild(row_4_data_1);
    row_4.appendChild(row_4_data_2);
    row_4.appendChild(row_4_data_3);
    row_4.appendChild(row_4_data_4);
    tbody.appendChild(row_4);
    
    
 
    let row_5 = document.createElement('tr');
    let row_5_data_1 = document.createElement('td');
    row_5_data_1.innerHTML = eq1;
    let row_5_data_2 = document.createElement('td');
    row_5_data_2.innerHTML = `<input type="number" class="goles">`;
    let row_5_data_3 = document.createElement('td');
    row_5_data_3.innerHTML = `<input type="number" class="goles">`;
    let row_5_data_4 = document.createElement('td');
    row_5_data_4.innerHTML = eq3;

    
    
    row_5.appendChild(row_5_data_1);
    row_5.appendChild(row_5_data_2);
    row_5.appendChild(row_5_data_3);
    row_5.appendChild(row_5_data_4);

    tbody.appendChild(row_5);

    let row_6 = document.createElement('tr');
    let row_6_data_1 = document.createElement('td');
    row_6_data_1.innerHTML = eq2;
    let row_6_data_2 = document.createElement('td');
    row_6_data_2.innerHTML = `<input type="number" class="goles">`;
    let row_6_data_3 = document.createElement('td');
    row_6_data_3.innerHTML = `<input type="number" class="goles">`;
    let row_6_data_4 = document.createElement('td');
    row_6_data_4.innerHTML = eq4;

    
    
    row_6.appendChild(row_6_data_1);
    row_6.appendChild(row_6_data_2);
    row_6.appendChild(row_6_data_3);
    row_6.appendChild(row_6_data_4);

    tbody.appendChild(row_6);

    
    

}


//for (var i = 0; i < GRUPOS.length; i++) {


GRUPO.forEach(grupo => {
    


let eq1 = grupo.equipo[0].nombre;
let eq2 = grupo.equipo[1].nombre;
let eq3 = grupo.equipo[2].nombre;
let eq4 = grupo.equipo[3].nombre;


document.write(`<div class="grupo" id="partidoGrupo${grupo.nombre}"> <h3>Grupo ${grupo.nombre}</h3>`)
crearTablaPartidos(grupo,eq1, eq2, eq3, eq4)
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


row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
row_1.appendChild(heading_4);
row_1.appendChild(heading_5);
row_1.appendChild(heading_6);
thead.appendChild(row_1);



let row_2 = document.createElement('tr');
let row_2_data_1 = document.createElement('td');
row_2_data_1.innerHTML = grupo.equipo[0].nombre;
let row_2_data_2 = document.createElement('td');
row_2_data_2.innerHTML = 0;
let row_2_data_3 = document.createElement('td');
row_2_data_3.innerHTML = 0;
let row_2_data_4 = document.createElement('td');
row_2_data_4.innerHTML = 0;
let row_2_data_5 = document.createElement('td');
row_2_data_5.innerHTML = 0;
let row_2_data_6 = document.createElement('td');
row_2_data_6.innerHTML = 0;

row_2.appendChild(row_2_data_1);
row_2.appendChild(row_2_data_2);
row_2.appendChild(row_2_data_3);
row_2.appendChild(row_2_data_4);
row_2.appendChild(row_2_data_5);
row_2.appendChild(row_2_data_6);
tbody.appendChild(row_2);


// Creating and adding data to third row of the table
let row_3 = document.createElement('tr');
let row_3_data_1 = document.createElement('td');
row_3_data_1.innerHTML = grupo.equipo[1].nombre;
let row_3_data_2 = document.createElement('td');
row_3_data_2.innerHTML = 0;
let row_3_data_3 = document.createElement('td');
row_3_data_3.innerHTML = 0;
let row_3_data_4 = document.createElement('td');
row_3_data_4.innerHTML = 0;
let row_3_data_5 = document.createElement('td');
row_3_data_5.innerHTML = 0;
let row_3_data_6 = document.createElement('td');
row_3_data_6.innerHTML = 0;


row_3.appendChild(row_3_data_1);
row_3.appendChild(row_3_data_2);
row_3.appendChild(row_3_data_3);
row_3.appendChild(row_3_data_4);
row_3.appendChild(row_3_data_5);
row_3.appendChild(row_3_data_6);
tbody.appendChild(row_3);



let row_4 = document.createElement('tr');
let row_4_data_1 = document.createElement('td');
row_4_data_1.innerHTML = grupo.equipo[2].nombre;
let row_4_data_2 = document.createElement('td');
row_4_data_2.innerHTML = 0;
let row_4_data_3 = document.createElement('td');
row_4_data_3.innerHTML = 0;
let row_4_data_4 = document.createElement('td');
row_4_data_4.innerHTML = 0;
let row_4_data_5 = document.createElement('td');
row_4_data_5.innerHTML = 0;
let row_4_data_6 = document.createElement('td');
row_4_data_6.innerHTML = 0;


row_4.appendChild(row_4_data_1);
row_4.appendChild(row_4_data_2);
row_4.appendChild(row_4_data_3);
row_4.appendChild(row_4_data_4);
row_4.appendChild(row_4_data_5);
row_4.appendChild(row_4_data_6);
tbody.appendChild(row_4);


let row_5 = document.createElement('tr');
let row_5_data_1 = document.createElement('td');
row_5_data_1.innerHTML = grupo.equipo[3].nombre;
let row_5_data_2 = document.createElement('td');
row_5_data_2.innerHTML = 0;
let row_5_data_3 = document.createElement('td');
row_5_data_3.innerHTML = 0;
let row_5_data_4 = document.createElement('td');
row_5_data_4.innerHTML = 0;
let row_5_data_5 = document.createElement('td');
row_5_data_5.innerHTML = 0;
let row_5_data_6 = document.createElement('td');
row_5_data_6.innerHTML = 0;


row_5.appendChild(row_5_data_1);
row_5.appendChild(row_5_data_2);
row_5.appendChild(row_5_data_3);
row_5.appendChild(row_5_data_4);
row_5.appendChild(row_5_data_5);
row_5.appendChild(row_5_data_6);
tbody.appendChild(row_5);



}







//for (let i = 0; i < GRUPOS.length; i++) {

GRUPO.forEach((grupo) => {
    


    document.write(`<div class="tablaGrupos" id="grupo${grupo.nombre}"> <h3>Grupo ${grupo.nombre}</h3>`)
    crearTabla(grupo)
    document.write(`</div>`)

});

