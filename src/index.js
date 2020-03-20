/* Comportamiento Javascript con Jquery */
$(document).ready(function() {



    $('#modal-body-doc1').on('scroll', function() {
        console.log('Scrolleando');
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            console.log('Recorrido Completo');
            $('#conforme1').removeAttr('disabled');
        }
    })

    $('#conforme1').click(function() {
        if ($('#conforme1').is(':checked')) {
            console.log('Aceptó los terminos del documentos 1');
            $('#btnGuardar1').removeAttr('disabled');
            let doc1leido = true;
            console.log(doc1leido);
        } else {
            console.log('No aceptó los terminos del documentos 1');
            $('#btnGuardar1').attr('disabled', true);
            let doc1leido = false;
            console.log(doc1leido);
        }
    });

    $('#btnGuardar1').click(function() {
        $('#documento1').modal('hide');
    });

    /* Documento 2 */
    $('#modal-body-doc2').scroll(function() {
        console.log('Scrolleando');
        if ($('#agreement2').height() == ($(this).scrollTop() + $(this).height())) {
            console.log('Recorrido Completo');
            $('#conforme2').removeAttr('disabled');
        }
    });

    $('#conforme2').click(function() {
        console.log('conforme checkeado');
        if ($('#conforme2').is(':checked')) {
            $('#btnGuardar2').removeAttr('disabled');
        }
    });

    $('#btnGuardar2').click(function() {
        console.log('Boton Guardar clickeado');
        $('#documento2').modal('hide');
    });

    /* Documento 3 */
    $('#modal-body-doc3').scroll(function() {
        console.log('Scrolleando');
        if ($('#agreement3').height() == ($(this).scrollTop() + $(this).height())) {
            $('#conforme3').removeAttr('disabled');
        }
    });


    $('#conforme3').click(function() {
        console.log('conforme checkeado');
        if ($('#conforme3').is(':checked')) {
            $('#btnGuardar3').removeAttr('disabled');
        }
    });

    $('#btnGuardar3').click(function() {
        console.log('Boton Guardar clickeado');
        $('#documento3').modal('hide');
    });

    /* Documento 4 */
    $('#modal-body-doc4').scroll(function() {
        if ($('#agreement4').height() == ($(this).scrollTop() + $(this).height())) {
            console.log('Terminos leidos');
            $('#conforme4').removeAttr('disabled');
        }
    });

    $('#conforme4').click(function() {
        if ($('#conforme4').is(':checked')) {
            console.log('Aceptó los terminos del documentos 4');
            $('#btnGuardar4').removeAttr('disabled');
            let doc4leido = true;
            console.log(doc4leido);
        } else {
            console.log('No aceptó los terminos del documentos 4');
            $('#btnGuardar4').attr('disabled', true);
            let doc4leido = false;
            console.log(doc4leido);
        }
    });

    $('#btnGuardar4').click(function() {
        console.log('Boton Guardar doc4 clickeado');
        $('#documento4').modal('hide');
    });

    $('#periodo').attr('readonly', true);

});


/* Formulario */
var formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('me diste un click');

    var datos = new FormData(formulario);
    console.log(datos);
})

window.onload = function() {
    traerDatos();
};

function traerDatos() {
    const peticion = new XMLHttpRequest();
    peticion.open('GET', 'reglamentos.json', true);
    peticion.send();
    peticion.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            console.log(datos);

            let res = document.querySelector('#tbodyReglamentos');
            res.innerHTML = '';

            for (let item of datos.content) {
                res.innerHTML += ` 
                <tr>
                    <td class="text-center align-middle">${item.id}</td>
                    <td><a href="#" data-toggle="modal" data-target="#${item.modal}">${item.reglamento}</a></td>
                    <td class="text-center align-middle">${item.leido}</td>
                </tr>
                `
            }
        }
    }
}

document.querySelector('#btnGuardar1').addEventListener('click', documento1Leido);

function documento1Leido() {
    console.log('Boton guardar doc 1 leido');
}