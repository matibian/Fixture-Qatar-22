const EQUIPOS = ["Qatar", "Ecuador", "Senegal", "Holanda", "Inglaterra", "Irán", "EEUU", "Gales", "Argentina", "Arabia Sau.", "México", "Polonia", "Francia", "Australia", "Dinamarca", "Tunez", "España", "Costa Rica", "Alemania", "Japon", "Belgica", "Canada", "Marruecos", "Croacia", "Brazil", "Serbia", "Suiza", "Camerun", "Portugal","Ghana","Uruguay","Corea del Sur"]
const RANKING = [1441, 1464, 1588, 1679, 1738, 1559, 1635, 1582, 1784, 1436, 1650, 1546, 1765, 1484, 1665, 1508, 1717, 1500, 1659, 1553, 1822, 1474, 1559, 1632, 1838, 1550, 1621, 1485, 1679, 1390, 1644, 1526]


const GRUPOS = ["A", "B", "C", "D", "E", "F", "G", "H"]

const FASES = ["Fase de grupos", "Octavos de final", "Cuartos de final", "Semifinal", "Final"]



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
        this.ranking = ranking;
    }
}

const EQUIPO = [];
let rank = 0;
EQUIPOS.forEach((nombre) => {
    
    const equipox = new Equipo (nombre, 0, 0, 0, 0, 0, 0, 0, 0, RANKING[rank])
    EQUIPO.push(equipox)
    rank++

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



function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

GRUPO.forEach((grupo) => {
    grupo.partido.forEach((partido) => {
        partido.geq1 = random(0,5)
        partido.geq2 = random(0,5)

    
});
});

// GRUPO[0].partido[0].geq1 = 3
// GRUPO[0].partido[0].geq2 = 1
// GRUPO[0].partido[1].geq1 = 4
// GRUPO[0].partido[1].geq2 = 5
// GRUPO[0].partido[2].geq1 = 2
// GRUPO[0].partido[2].geq2 = 2
// GRUPO[0].partido[3].geq1 = 6
// GRUPO[0].partido[3].geq2 = 4
// GRUPO[0].partido[4].geq1 = 1
// GRUPO[0].partido[4].geq2 = 0
// GRUPO[0].partido[5].geq1 = 3
// GRUPO[0].partido[5].geq2 = 2

// GRUPO[1].partido[0].geq1 = 2
// GRUPO[1].partido[0].geq2 = 3
// GRUPO[1].partido[1].geq1 = 1
// GRUPO[1].partido[1].geq2 = 0
// GRUPO[1].partido[2].geq1 = 3
// GRUPO[1].partido[2].geq2 = 2
// GRUPO[1].partido[3].geq1 = 4
// GRUPO[1].partido[3].geq2 = 4
// GRUPO[1].partido[4].geq1 = 1
// GRUPO[1].partido[4].geq2 = 2
// GRUPO[1].partido[5].geq1 = 0
// GRUPO[1].partido[5].geq2 = 2



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


        });


    
});
    
GRUPO.forEach(grupo => {
    grupo.equipo.sort((a, b) => b.puntos - a.puntos || b.difGol - a.difGol);
});


// GRUPO.forEach(grupo => {
//     grupo.equipo.sort((a, b) => {
//         if (b.puntos > a.puntos) {
//             return 1;
//         }
//         if (b.puntos < a.puntos) {
//             return -1;
//         }
//         return 0;
//     })
// });









document.write(`<h1 class="titulo"><center>Fixture Mundial Qatar 2022 </center></h1>`)


document.write(`<section class="gruposPrin">`)

console.log(GRUPO)

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



////////////////////// TABLAS PARTIDOS POR GRUPO/////////////////////////

document.write(`<h2 class="titulo"><center> ${FASES[0]} </center></h2>`)



document.write(`<section class="tablasPartidos">`)


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
    row_1_data_2.innerHTML = partido.geq1 //`<input type="number" class="goles">`;
    let row_1_data_3 = document.createElement('td');
    row_1_data_3.innerHTML = partido.geq2 //`<input type="number" class="goles">`;
    let row_1_data_4 = document.createElement('td');
    row_1_data_4.innerHTML = partido.eq2.nombre;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
    });
}



GRUPO.forEach((grupo) => {
    document.write(`<div class="grupo" id="partidoGrupo${grupo.nombre}"> <h3>Grupo ${grupo.nombre}</h3>`)
    crearTablaPartidos(grupo)
    document.write(`</div>`)
});



document.write(`</section>`)



////////////////////////////////// TABLAS DE PUNTOS POR GRUPO //////////////////

document.write(`<section class="tablasClasifGrupos">`)

document.write(`<h2 class="titulo"><center> PUNTOS POR GRUPO </center></h2>`)

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


grupo.equipo.forEach(equipo => {

let row = document.createElement('tr');
let row_data_1 = document.createElement('td');
row_data_1.innerHTML = equipo.nombre;
let row_data_2 = document.createElement('td');
row_data_2.innerHTML = equipo.puntos;
let row_data_3 = document.createElement('td');
row_data_3.innerHTML = equipo.partidosJugados;
let row_data_4 = document.createElement('td');
row_data_4.innerHTML = equipo.partidosGanados;
let row_data_5 = document.createElement('td');
row_data_5.innerHTML = equipo.partidosEmpatados;
let row_data_6 = document.createElement('td');
row_data_6.innerHTML = equipo.partidosPerdidos;
let row_data_7 = document.createElement('td');
row_data_7.innerHTML = equipo.difGol;

row.appendChild(row_data_1);
row.appendChild(row_data_2);
row.appendChild(row_data_3);
row.appendChild(row_data_4);
row.appendChild(row_data_5);
row.appendChild(row_data_6);
row.appendChild(row_data_7);
tbody.appendChild(row);

});

}

GRUPO.forEach((grupo) => {
    


    document.write(`<div class="tablaGrupos" id="grupo${grupo.nombre}"> <h3>Grupo ${grupo.nombre}</h3>`)
    crearTabla(grupo)
    document.write(`</div>`)

})

document.write(`</section>`)

//////////////////////////// PLAYOFFS ///////////////////////////////////
document.write(`<h2 class="titulo"><center> PLAYOFFS </center></h2>`)
document.write(`<section class="tablasPartidosPlayoff">`)

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
const partidosOctavos = []
let i = 0
for (let j = 0; j < 4; j++) {
    id++
    const partido1 = new PartidoPlayoff (GRUPO[i].equipo[0],GRUPO[i+1].equipo[1],0 ,0 , 0, 0 , false, id);
    partidosOctavos.push(partido1)
    id++
    const partido2 = new PartidoPlayoff (GRUPO[i+1].equipo[0],GRUPO[i].equipo[1],0 ,0 , 0, 0 , false, id);
    partidosOctavos.push(partido2)
    i += 2

};
// partidosOctavos.forEach(partido => {
//     document.write(`<br>` + partido.eq1.nombre + " - " +partido.eq2.nombre + `<br>`)
// });



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
    row_1_data_1.innerHTML = partido.eq1.nombre;
    let row_1_data_2 = document.createElement('td');
    let row_1_data_3 = document.createElement('td');
    if (partido.geq1 == partido.geq2) {
        row_1_data_2.innerHTML = partido.geq1 + `(${partido.pen1})` //`<input type="number" class="goles">`;
        row_1_data_3.innerHTML = partido.geq2 + `(${partido.pen2})` //`<input type="number" class="goles">`;
    } else {
        row_1_data_2.innerHTML = partido.geq1 //`<input type="number" class="goles">`;
        row_1_data_3.innerHTML = partido.geq2 //`<input type="number" class="goles">`;
    }
    let row_1_data_4 = document.createElement('td');
        row_1_data_4.innerHTML = partido.eq2.nombre;
    // row_1_data_2.innerHTML = partido.geq1 //`<input type="number" class="goles">`;
    // let row_1_data_3 = document.createElement('td');
    // row_1_data_3.innerHTML = partido.geq2 //`<input type="number" class="goles">`;
    // let row_1_data_4 = document.createElement('td');
    // row_1_data_4.innerHTML = partido.eq2.nombre;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
    });
}

// function random(min, max) {
//     return Math.floor((Math.random() * (max - min + 1)) + min);
// }

partidosOctavos.forEach((partido) => {
    partido.geq1 = random(0,5)
    partido.geq2 = random(0,5)
    if (partido.geq2 == partido.geq1) {
        while (partido.pen1 == partido.pen2) {
            partido.pen1 = random(0,5)
            partido.pen2 = random(0,5)
            }
    }
});



document.write(`<div class="grupo" id="partidosOctavos"> <h3>${FASES[1]}</h3>`)
crearTablaPartidosOctavos()
document.write(`</div>`)




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

// partidosOctavos.forEach(partido => {
//     if (partido.geq2<partido.geq1) {
//         ganador = partido.eq1
//     } else if (partido.geq2>partido.geq1 ) {
//         ganador = partido.eq2
//     } else if (partido.pen1>partido.pen2 ) {
//         ganador = partido.eq1
//     } else if (partido.pen1<partido.pen2 ) {
//         ganador = partido.eq2}
//     Cuartos.push(ganador)
// });



const partidosCuartos = [];

let n = 0
for (let j = 0; j < 4; j++) {
    id++
    const partido1 = new PartidoPlayoff (Cuartos[n],Cuartos[n+1], 0, 0, 0, 0 , false, id);
    partidosCuartos.push(partido1)
    id++

    n += 2

};

// partidosCuartos.forEach(partido => {
//     document.write(`<br>` + partido.eq1.nombre + " - " +partido.eq2.nombre + `<br>`)
// // });


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
    if (partido.geq1 == partido.geq2) {
        row_1_data_2.innerHTML = partido.geq1 + `(${partido.pen1})` //`<input type="number" class="goles">`;
        row_1_data_3.innerHTML = partido.geq2 + `(${partido.pen2})` //`<input type="number" class="goles">`;
    } else {
        row_1_data_2.innerHTML = partido.geq1 //`<input type="number" class="goles">`;
        row_1_data_3.innerHTML = partido.geq2 //`<input type="number" class="goles">`;
    }
    let row_1_data_4 = document.createElement('td');
        row_1_data_4.innerHTML = partido.eq2.nombre;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
    });
}

// function random(min, max) {
//     return Math.floor((Math.random() * (max - min + 1)) + min);
// }

partidosCuartos.forEach((partido) => {
    partido.geq1 = random(0,5)
    partido.geq2 = random(0,5)
    if (partido.geq2 == partido.geq1) {
        while (partido.pen1 == partido.pen2) {
        partido.pen1 = random(0,5)
        partido.pen2 = random(0,5)
        }
    }
});



document.write(`<div class="grupo" id="partidosCuartos"> <h3>${FASES[2]}</h3>`)
crearTablaPartidosCuartos()
document.write(`</div>`)



//////////////////////////// SEMIFINAL ///////////////////////////////////

const Semifinal = []


partidosCuartos.forEach(partido => {
    partidosPlayoff(partido,Semifinal)
})

// partidosCuartos.forEach(partido => {
//     if (partido.geq2<partido.geq1) {
//         ganador = partido.eq1
//     } else  {
//         ganador = partido.eq2
//     }   
//     Semifinal.push(ganador)
// });



const partidosSemi = [];

let o = 0
for (let j = 0; j < 2; j++) {
    id++
    const partido1 = new PartidoPlayoff (Semifinal[o],Semifinal[o+1], 0, 0, 0, 0 , false, id);
    partidosSemi.push(partido1)
    id++

    o += 2

};

// partidosCuartos.forEach(partido => {
//     document.write(`<br>` + partido.eq1.nombre + " - " +partido.eq2.nombre + `<br>`)
// // });



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
    if (partido.geq1 == partido.geq2) {
        row_1_data_2.innerHTML = partido.geq1 + `(${partido.pen1})` //`<input type="number" class="goles">`;
        row_1_data_3.innerHTML = partido.geq2 + `(${partido.pen2})` //`<input type="number" class="goles">`;
    } else {
        row_1_data_2.innerHTML = partido.geq1 //`<input type="number" class="goles">`;
        row_1_data_3.innerHTML = partido.geq2 //`<input type="number" class="goles">`;
    }
    let row_1_data_4 = document.createElement('td');
        row_1_data_4.innerHTML = partido.eq2.nombre;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
    });
}

// function random(min, max) {
//     return Math.floor((Math.random() * (max - min + 1)) + min);
// }

partidosSemi.forEach((partido) => {
    partido.geq1 = random(0,5)
    partido.geq2 = random(0,5)
    if (partido.geq2 == partido.geq1) {
        while (partido.pen1 == partido.pen2) {
            partido.pen1 = random(0,5)
            partido.pen2 = random(0,5)
            }
    }
});


document.write(`<div class="grupo" id="partidosSemi"> <h3>${FASES[3]}</h3>`)
crearTablaPartidosSemi()
document.write(`</div>`)



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







// partidosCuartos.forEach(partido => {
//     document.write(`<br>` + partido.eq1.nombre + " - " +partido.eq2.nombre + `<br>`)
// // });




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
    if (partido.geq1 == partido.geq2) {
        row_1_data_2.innerHTML = partido.geq1 + `(${partido.pen1})` //`<input type="number" class="goles">`;
        row_1_data_3.innerHTML = partido.geq2 + `(${partido.pen2})` //`<input type="number" class="goles">`;
    } else {
        row_1_data_2.innerHTML = partido.geq1 //`<input type="number" class="goles">`;
        row_1_data_3.innerHTML = partido.geq2 //`<input type="number" class="goles">`;
    }
    let row_1_data_4 = document.createElement('td');
        row_1_data_4.innerHTML = partido.eq2.nombre;

    row_1.appendChild(row_1_data_1);
    row_1.appendChild(row_1_data_2);
    row_1.appendChild(row_1_data_3);
    row_1.appendChild(row_1_data_4);
    tbody.appendChild(row_1);
    });
}

// function random(min, max) {
//     return Math.floor((Math.random() * (max - min + 1)) + min);
// }

partidoFinal.forEach((partido) => {
    partido.geq1 = random(0,5)
    partido.geq2 = random(0,5)
    if (partido.geq2 == partido.geq1) {
        while (partido.pen1 == partido.pen2) {
            partido.pen1 = random(0,5)
            partido.pen2 = random(0,5)
            }
    }
});


document.write(`<div class="grupo" id="partidoFinal"> <h3>${FASES[4]}</h3>`)
crearTablaPartidoFinal()
document.write(`</div>`)
document.write(`</section>`)




/////////////////////////////RANDOM CON RANKING///////////////////////////


function weightedRandom(prob) {
    let i, sum=0, r=Math.random();
    for (i in prob){
        sum += prob[i];
        if (r<=sum) return i
    }
}

// v is the number of times random is summed and should be over >= 1
// return a random number between 0-1 exclusive
function randomG(w){ 
    var r = 0;
    for(var i = 5; i > 0; i --){
        r += Math.round(weightedRandom(w));
    }
    return r;
}



GRUPO.forEach((grupo) => {
    grupo.partido.forEach((partido) => {
        // Diferencia de ranking mayor(1838, brazil) y menor (1390, )
        let dif = (partido.eq1.ranking - partido.eq2.ranking) / 4.71
        console.log("equipo", partido.eq1.nombre, "ranking", partido.eq1.ranking,  "equipo", partido.eq2.nombre, "ranking", partido.eq2.ranking, dif)
        let porceq1 = (50 + 0.5*dif)*.01
        let porceq2 = (50 - 0.5*dif)*.01
        
        partido.geq1 = randomG({0:porceq2, 1:porceq1})
        partido.geq2 = randomG({0:porceq1, 1:porceq2})
        console.log(porceq1,porceq2)
        console.log(partido.geq1, partido.geq2)

});
});

