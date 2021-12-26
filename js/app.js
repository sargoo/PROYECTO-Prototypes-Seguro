
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
};

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
        console.log('validacion correcta');
        return;
    }else{
        console.log('no pasó la validación');
    }
    
}