
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
};

Seguro.prototype.cotizarSeguro = function (){
    
    let cantidad;
    const base = 2000;
    
    switch(this.marca){
        case '1':
            cantidad = base * 1.15
            break;
        case '2':
            cantidad = base * 1.05
            break;
        case '3':
            cantidad = base * 1.35
            break;
        default:
            break;
    }
    // se reduce un 3% por cada año de antigüedad
    const diferencia = new Date().getFullYear()- this.year;
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    /*
    si el seguro es basico se multiplica por un 30% más
    si el seguro es completo se multiplica por un 50% más
    */

    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }
    return cantidad;
}
function UI(){};


UI.prototype.cargarYears = ()=>{
    const year = document.querySelector('#year');
    const maxYear = new Date().getFullYear(); //trae el año actual
    const minYear = maxYear - 20;
    for (let i = maxYear; i >= minYear; i-- ){
        const option = document.createElement('option');
        option.value = i; //le da a opcion el valor de i.
        option.textContent = i; //le agrega el contenido de i.
        year.appendChild(option); // enlaza cada opcion a year.   
    };
};

UI.prototype.mostrarError = (mensaje, tipo )=>{
    const formulario = document.querySelector('#cotizar-seguro');
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('mensaje', 'mt-10');
    if(tipo === 'error'){
        mensajeError.classList.add('error');
    } else {
        mensajeError.classList.add('correcto');
    }
    formulario.insertBefore(mensajeError, document.querySelector('#resultado'));
    setTimeout(() =>{
        mensajeError.remove();
    }, 3000);
}

UI.prototype.mostrarResultado =(total, seguro)=>{

    const {marca, year, tipo} = seguro;
    let textoMarca;
    switch (marca) {
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            break;
    }
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
    <p class = "header">Tu Resumen</p>
    <p class = "font-bold"> Marca:<span class = "font-normal">  ${textoMarca}</span></p>
    <p class = "font-bold"> Año:<span class = "font-normal">  ${year}</span></p>
    <p class = "font-bold"> Tipo:<span class = "font-normal capitalize">  ${tipo}</span></p>
    <p class = "font-bold"> Total:<span class = "font-normal"> $ ${total}</span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');
    

    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(()=>{
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 3000);
}

const ui = new UI();

document.addEventListener('DOMContentLoaded', ()=>{
    ui.cargarYears();
})

eventListener();

function eventListener(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();
    //validad marca
    const marca = document.querySelector('#marca').value;
    //validar year
    const year = document.querySelector('#year').value;
    //validad tipo
    const tipo = document.querySelector('input[name = "tipo"]:checked').value;
    if (marca !== '' & year !== '' & tipo !== '') {
        ui.mostrarError('cotizando', 'correcto');
    }else{
        ui.mostrarError('Todos los campos son obligatorios.', 'error');
        }

        const resultados = document.querySelector ('#resultado div');
        if (resultados != null){
            resultados.remove();
        }
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();
    ui.mostrarResultado(total, seguro);
 
};

