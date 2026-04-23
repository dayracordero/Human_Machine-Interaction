

const hornet = 
{
    ataque:50,
    vida:200,
    vidaMax : 200,
    defensa:10,
    danorecibido: 0, 
    puntuación:0,
    healthbar_p: document.getElementById('health_p'),
    factorRandom: () => Math.random () * 0.4 + 1.1 

    } ;

const moscabestia = 
{
    vida:300,
    ataque: 20,
    defensa:20,
    healthbar_e: document.getElementById('health_e'),
    factorRandom: () => Math.random () * 0.2 + 0.9  //forma corta de describir la función factorRandom

};

//-------------------------------------------------

let intervalo = setInterval(ataquemoscabestia, 1000);   //pa que la mosca intente atacar cada segundo
let juego_Activo = true;
const puntuacion_jugador = document.getElementById('puntuacion')
document.getElementById('victoria').style.display = 'none';
document.getElementById('derrota').style.display = 'none';
let ataqueTimeout;

//anims

const normal = document.querySelector('.horny');
const ataque = document.querySelector('.hornyattack');

//-------------------------------------------------

function dano (jugador, enemigo) 
{
    let daño = jugador.ataque * jugador.factorRandom() - enemigo.defensa;
    enemigo.defensa -= 5;
    if (enemigo.defensa < 0) {enemigo.defensa = 0;}
    
    

    //bonus random
    //--------------------
    let vida_porcentaje = jugador.vida / jugador.vidaMax;

    if (vida_porcentaje < 0.2) 
    {
        daño += 0.2*jugador.ataque;

    }

    //----------------------

    if (daño < 0) daño = 0;  //Puede pasar que el ataque random sea menor a la defensa y de negativo :v
    return daño;
}

function ataquehorny() {
    if (!juego_Activo || muerto(moscabestia) || muerto(hornet)) return;


    normal.style.display = 'none';
    ataque.style.display = 'block';

    ataqueTimeout = setTimeout(() => {
        if (juego_Activo) {
            ataque.style.display = 'none';
            normal.style.display = 'block';
        }
    },2350);

    let dañohorny = dano(hornet, moscabestia);
    moscabestia.vida -= dañohorny;
    
    hornet.puntuación += dañohorny;
    puntuacion_jugador.textContent = hornet.puntuación.toFixed(0);
    
    actualizarBarras();

    if (muerto(moscabestia)) {
        juego_Activo = false;
        clearInterval(intervalo); 
        clearTimeout(ataqueTimeout); 
        document.getElementById('victoria').style.display = 'flex';
        document.getElementById('fondo').style.filter = 'brightness(0.2)';
        document.getElementById('botonataque').style.display ='none';
        document.querySelector('.mosca').style.display = 'none';
        normal.style.display = 'none';
        ataque.style.display = 'none';

    }

    
}

function ataquemoscabestia () {

    if (!juego_Activo || muerto(moscabestia) || muerto(hornet)) return;

    let prob = Math.random();
    if (!juego_Activo) return;
    if (prob < 0.6) 
    {
        let dañomosca = dano (moscabestia, hornet);
        hornet.vida -= dañomosca;
        
    }
    
    actualizarBarras();

    if (muerto(hornet)) {
    juego_Activo = false;
    clearInterval(intervalo);
    document.getElementById('derrota').style.display = 'block';
    document.getElementById('fondo').style.filter = 'brightness(0.2)';
    document.getElementById('botonataque').style.display ='none';
    document.querySelector('.mosca').style.display = 'none';
    normal.style.display = 'none';
    ataque.style.display = 'none';

    }
    
    
   
}

function muerto(cosa) 
{
    if (cosa.vida <= 0) 
        { cosa.vida = 0;
            return true;
        }
    return false;
}

function reiniciar() 
{
    hornet.vida = hornet.vidaMax;
    hornet.puntuación = 0;
    puntuacion_jugador.textContent = hornet.puntuación;
    hornet.danorecibido = 0;
    juego_Activo = true;
    moscabestia.defensa = 20;
    moscabestia.vida = 300;
    normal.style.display = 'block';
    ataque.style.display = 'none';
    clearInterval (intervalo) ;
    intervalo = setInterval(ataquemoscabestia, 1000);  
    actualizarBarras();
    document.getElementById('victoria').style.display = 'none';
    document.getElementById('derrota').style.display = 'none';
    document.getElementById('fondo').style.filter = 'brightness(1)';
    document.getElementById('botonataque').style.display ='block';
    document.querySelector('.mosca').style.display = 'block';

}


function actualizarBarras() {
   if (hornet.vida < 0) {hornet.vida = 0} 
   if (moscabestia.vida < 0) {moscabestia.vida = 0} 
    hornet.healthbar_p.style.width = (hornet.vida / hornet.vidaMax * 100) + "%";
    moscabestia.healthbar_e.style.width = (moscabestia.vida / 300 * 100) + "%";
}


