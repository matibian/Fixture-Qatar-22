const EQUIPOS = ["Qatar", "Ecuador", "Senegal", "Holanda", "Inglaterra", "Irán", "Estado Unidos", "Gales", "Argentina", "Arabia Saudita", "México", "Polonia", "Francia", "Clasificado 1", "Dinamarca", "Tunez", "España", "Clasificado 2", "Alemania", "Japon", "Belgica", "Canada", "Marruecos", "Croacia", "Brazil", "Serbia", "Suiza", "Camerun", "Portugal","Ghana","Uruguay","Corea del Sur"]

const GRUPOS = ["A", "B", "C", "D", "E", "F", "G", "H"]


function armarpartido (eq1, eq2) {
    return `<li>${eq1} -- ${eq2}</li>`
}

function armarPartidosGrupo (eq1, eq2, eq3, eq4) {
	let partidos = `<ul>`
	partidos = partidos + armarpartido(eq1, eq2)
    partidos = partidos + armarpartido(eq3, eq4)
    partidos = partidos + armarpartido(eq1, eq3)
    partidos = partidos + armarpartido(eq2, eq4)
    partidos = partidos + armarpartido(eq1, eq4)
    partidos = partidos + armarpartido(eq2, eq3)
    partidos = partidos + `</ul>`

    return partidos
}

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


let cont = 0


for (let i = 0; i < GRUPOS.length; i++) {
    console.log(GRUPOS[i]);
    document.write(`<div class="grupos"> <h3>Grupo ${GRUPOS[i]}</h3><ul>`)
    for (let j = 0; j < 4; j++) {
        console.log(EQUIPOS[cont])
        document.write(
        `
            <li>${EQUIPOS[cont]}</li>`
        )
        cont++
        
    }
    document.write(`</ul></div>`)
}

document.write(`<h2 class="titulo"><center>Partidos de grupo </center></h2>`)





for (var i = 0; i < GRUPOS.length; i++) {
let equipos = i*4
document.write(`<div class="grupos"> <h3>Grupo ${GRUPOS[i]}</h3>`)
document.write(armarPartidosGrupo(EQUIPOS[equipos],EQUIPOS[equipos+1],EQUIPOS[equipos+2],EQUIPOS[equipos+3]))
document.write(`</div>`)
}