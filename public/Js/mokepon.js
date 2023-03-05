const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonMascotaJugador =document.getElementById("boton-mascota")
const sectionReiniciar = document.getElementById('Reiniciar')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodogue 
let inputCapipepo 
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueEnemigo
let indexAtaqueJugador
let vidasEnemigo = 3
let vidasJugador = 3
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './images/Mokepam.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 550 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida  
        this.ataques = []   
        this.ancho = 100
        this.alto = 100    
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()      
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )
    }
}

let Hipodogue = new Mokepon('Hipodogue', './images/hipodogue.png', 5, './images/hipodogue.png')

let Capipepo = new Mokepon('Capipepo', './images/capipepo.png', 5, './images/capipepo.png')

let Ratigueya = new Mokepon('Ratigueya', './images/ratigueya.png', 5, './images/ratigueya.png')

const HIPODOGE_ATAQUES = [
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🔥', id:'boton-fuego'}
]

const CAPIPEPO_ATAQUES = [
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'}
]

const RATIGUEYA_ATAQUES = [
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '💧', id:'boton-agua'}
]

Hipodogue.ataques.push(...HIPODOGE_ATAQUES)
Capipepo.ataques.push(...CAPIPEPO_ATAQUES)
Ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(Hipodogue,Capipepo,Ratigueya)
   
function iniciarJuego(){  
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none' 
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((Mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${Mokepon.nombre} />
        <label class='tarjeta-de-mokepon' for=${Mokepon.nombre} >
            <p>${Mokepon.nombre}</p>
            <img src=${Mokepon.foto} alt=${Mokepon.nombre} >
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodogue = document.getElementById("Hipodogue")
    inputCapipepo = document.getElementById("Capipepo")
    inputRatigueya = document.getElementById("Ratigueya")

    })
   
    botonMascotaJugador.addEventListener("click",seleccionarMascotaJugador)
   

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://192.168.1.7:8080/unirse")
    .then((res) => {
            if (res.ok) {
                res.text()
                    .then((respuesta) => {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador(){
    if (inputHipodogue.checked) {
        spanMascotaJugador.innerHTML = inputHipodogue.id
        mascotaJugador = inputHipodogue.id
    }else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else {
        alert("SELECCIONA UNA MASCOTA")
        return
    }

    sectionSeleccionarMascota.style.display = 'none'

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://192.168.1.7:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button> 
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
    secuenciaAtaque()
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58' 
                boton.disabled = true
            } else if (e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }

            if(ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })   
}

function enviarAtaques() {
    console.log('Enviar ataques', ataqueJugador);

    fetch(`http://192.168.1.7:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    
    intervalo = setInterval(obtenerAtaques, 100)
}

function obtenerAtaques(){
    console.log('OBTENER ATAQUES');
    fetch(`http://192.168.1.7:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                .then(function ({ ataques }) {
                    if (ataques.length === 5) {
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques

    
}

/* function ataqueAleatorioEnemigo(){
    console.log('Ataques enemigo', ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if (ataqueJugador.length === 5) {
        combate()
    }
} */

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]

}


function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas();
}

function revisarVidas(){
    
    if (victoriasJugador > victoriasEnemigo){
        alert('Derrotaste a tu enemigo, GANASTE!👑')
        botonesDeshabilitados()
        let sectionReiniciar = document.getElementById('boton-reiniciar')
        sectionReiniciar.style.display = 'flex'
    }else if (victoriasEnemigo > victoriasJugador){
        alert('Tu enemigo te ha derrotado, PERDISTE!😞')
        botonesDeshabilitados()
        sectionReiniciar.style.display = 'block'
    }else
        alert('Esto fue un empate!! vuelve a intentar derrotar a tu enemigo ⚔️')
        botonesDeshabilitados()
        sectionReiniciar.style.display = 'flex'

        if (victoriasEnemigo > victoriasJugador){
            crearMensaje("PERDISTE!")
        } else if (victoriasJugador > victoriasEnemigo){
            crearMensaje("GANASTE!")
        } else
            crearMensaje("EMPATE!!")
        
}
    
function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)


}

function botonesDeshabilitados(){
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
}

function reiniciarJuego() {
    /* fetch(`${API_URL}/reset`).then((res) => {
      if (res.ok) { */
        location.reload();
 /*      }
    }); */
  }

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1 ) + min)
}

function pintarCanva(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
   mascotaJugadorObjeto.pintarMokepon()

        enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

        mokeponesEnemigos.forEach(function (mokepon)
        {
            if(mokepon != undefined){
                mokepon.pintarMokepon()
                revisarColision(mokepon)
        }
    })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.7:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
            .then(function ({ enemigos }) {
                mokeponesEnemigos = enemigos.map(function (enemigo)
    {
        let mokeponEnmigo = null
        if(enemigo.mokepon != undefined)
        {
            const mokeponNombre = enemigo.mokepon.nombre 
            switch (mokeponNombre)
            {
            case "Hipodogue":
                mokeponEnmigo = new Mokepon('Hipodogue', './images/hipodogue.png', 5, './images/hipodogue.png')
                    break
                case "Capipepo":
                    mokeponEnmigo = new Mokepon('Capipepo', './images/capipepo.png', 5, './images/capipepo.png')
                    break
                case "Ratigueya":
                    mokeponEnmigo = new Mokepon('Ratigueya', './images/ratigueya.png', 5, './images/ratigueya.png')
                    break
                default:
                    break
            }

            mokeponEnmigo.x = enemigo.x
            mokeponEnmigo.y = enemigo.y
        }
            return mokeponEnmigo
            secuenciaAtaque()
    })
                    
                    
                    
            })
        }
    })
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            moverArriba()
            break;
        case 'ArrowDown':
        case 's':
            moverAbajo()
            break;
        case 'ArrowLeft':
        case 'a':
            moverIzquierda()
            break;
        case 'ArrowRight':
        case 'd':
            moverDerecha()
            break;
        default:
            break;
    }
}

function iniciarMapa(){
    mapa.width = 800
    mapa.height = 550
    mascotaJugadorObjeto = ObtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador)
    intervalo = setInterval(pintarCanva, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function ObtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
           return mokepones[i]
        }
        
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaMascota = mascotaJugadorObjeto.x
    const derechaMascota = mascotaJugadorObjeto.x + enemigo.ancho

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    }
    
    detenerMovimiento()
    clearInterval(intervalo)
    alert("Tendras una batalla con " + enemigo.nombre) 
    enemigoId = enemigo.id

    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}
    
window.addEventListener("load", iniciarJuego)