loadSettings();

showCurrentDate();

let fechaFormateadaGlobal = showCurrentDate();

function getBaseDomainUrl() {

    if (typeof window === "undefined") {
        console.error("ReferenceError: window is not defined. Are you in frontend javascript layer?");
        return;
    }

    if (typeof window.location === "undefined") {
        console.error("ReferenceError: window.location is not defined. Are you in frontend javascript layer?");
        return;
    }

    if (window.location.port) {
        return window.location.protocol + "//" + window.location.hostname + ":" + window.location.port
    } else {
        return window.location.protocol + "//" + window.location.hostname
    }
}


/* Comportamiento Javascript con Jquery */
$(document).ready(function () {


    $('#logoutButton').click(function () {
        logout();
    });

    intDoc1();
    intDoc2();
    intDoc3();
    intDoc4();
    intDoc5();
    intDoc6();
    intDocCovid();

    // Save buttons on modals
    $('#btnGuardar1').click(function () {
        guardarDoc1();
    });
    $('#btnGuardar2').click(function () {
        guardarDoc2();
    });
    $('#btnGuardar3').click(function () {
        guardarDoc3();
    });
    $('#btnGuardar4').click(function () {
        guardarDoc4();
    });
    $('#btnGuardar5').click(function () {
        guardarDoc5();
    });
    $('#btnGuardar6').click(function () {
        guardarDoc6();
    });
    $('#btnGuardarDocCovid').click(function () {
        guardarDocCOVID();
    });

    // Validations
    $('#correo-contact').focusin(function(){
        $("#error_email").hide();
        $("#error_fullname").hide();
        $("#error_telefono").hide();
      });

    $('#nombres-apellidos').focusin(function(){
        $("#error_email").hide();
        $("#error_fullname").hide();
        $("#error_telefono").hide();
      });

    $('#telefono').focusin(function(){
        $("#error_email").hide();
        $("#error_fullname").hide();
        $("#error_telefono").hide();
      });

    $('#btnGuardarContactEmer').click(function () {
        validateForm();
    });

});

function intDoc1() {
    $('#modal-body-doc1').on('scroll', function () {
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            $('#conforme1').removeAttr('disabled');
        }
    })

    $('#conforme1').click(function () {
        if ($('#conforme1').is(':checked')) {
            $('#btnGuardar1').removeAttr('disabled');
        } else {
            $('#btnGuardar1').attr('disabled', true);
        }
    });

    $('#btnGuardar1').click(function () {
        $('#documento1').modal('hide');
    });
}

function intDoc2() {
    $('#modal-body-doc2').on('scroll', function () {
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            $('#conforme2').removeAttr('disabled');
        }
    })

    $('#conforme2').click(function () {
        if ($('#conforme2').is(':checked')) {
            $('#btnGuardar2').removeAttr('disabled');
        } else {
            $('#btnGuardar2').attr('disabled', true);
        }
    });

    $('#btnGuardar2').click(function () {
        $('#documento2').modal('hide');
    });
}

function intDoc3() {
    $('#modal-body-doc3').on('scroll', function () {
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            // console.log('Recorrido Completo Doc3');
            $('#conforme3').removeAttr('disabled');
        }
    })

    $('#conforme3').click(function () {
        if ($('#conforme3').is(':checked')) {
            $('#btnGuardar3').removeAttr('disabled');
        } else {
            $('#btnGuardar3').attr('disabled', true);
        }
    });

    $('#btnGuardar3').click(function () {
        $('#documento3').modal('hide');
    });
}

function intDoc4() {
    $('#modal-body-doc4').on('scroll', function () {
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            $('#conforme4').removeAttr('disabled');
        }
    })

    $('#conforme4').click(function () {
        if ($('#conforme4').is(':checked')) {
            $('#btnGuardar4').removeAttr('disabled');
        } else {
            $('#btnGuardar4').attr('disabled', true);
        }
    });

    $('#btnGuardar4').click(function () {
        $('#documento4').modal('hide');
    });
}

function intDoc5() {
    $('#modal-body-doc5').on('scroll', function () {
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            $('#conforme5').removeAttr('disabled');
        }
    })

    $('#conforme5').click(function () {
        if ($('#conforme5').is(':checked')) {
            $('#btnGuardar5').removeAttr('disabled');
        } else {
            $('#btnGuardar5').attr('disabled', true);
        }
    });

    $('#btnGuardar5').click(function () {
        $('#documento5').modal('hide');
    });
}

function intDoc6() {
    $('#modal-body-doc6').on('scroll', function () {
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            $('#conforme6').removeAttr('disabled');
        }
    })

    $('#conforme6').click(function () {
        if ($('#conforme6').is(':checked')) {
            $('#btnGuardar6').removeAttr('disabled');
        } else {
            $('#btnGuardar6').attr('disabled', true);
        }
    });

    $('#btnGuardar6').click(function () {
        $('#documento6').modal('hide');
    });
}

function intDocCovid() {

    $('#conforme-doc-covid').click(function () {
        if ($('#conforme-doc-covid').is(':checked') && $('#nombre-completo-dcovid').val() !== "" && $('#dni-dcovid').val() !== "" && $('#codigo-alumno-dcovid').val() !== "") {
            $('#btnGuardarDocCovid').removeAttr('disabled');
        } else {
            $('#btnGuardarDocCovid').attr('disabled', true);
        }
    });

    $('#btnGuardarDocCovid').click(function () {
        $('#conformidad-covid').modal('hide');
    });
}

function loadSettings() {

    var SETTINGS_URL = null;

    if (typeof DEV_SETTINGS_URL !== 'undefined' && DEV_SETTINGS_URL.length > 0) {
        SETTINGS_URL = DEV_SETTINGS_URL;
    } else {
        var domain = getBaseDomainUrl();
        SETTINGS_URL = domain + "/settings.json";
    }

    $.ajax({
        url: SETTINGS_URL,
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            var body = response.content;
            localStorage.setItem("email", body.session.email);
            localStorage.setItem("url_api", body.settings.reglamentosApi.baseUrl);
            checkIfUserExists();
        },
        error: function (request, status, error) {
            console.log("Error at consuming settings.json");
            console.log(error);
            window.location = "/error"
        }
    });
}

// Check if the user exist in the DB
function checkIfUserExists() {
    let url_api = localStorage.getItem("url_api");
    let email_ls = localStorage.getItem("email");
    $.ajax({
        url: url_api + `findOne?_where=(emailAlumno,eq,${email_ls})`,
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            let tam = response.length;
            if (tam == 0) {
                console.log('User does not exist saving the first time');
                saveUserFirtsTime();
            } else {
                console.log('User al ready exist getting the ID by email');
                getIdByEmail();
            }
        },
        error: function (request, status, error) {
            console.log("Error at cheking if the user exists");
            console.log(error);
        }
    });
}

// Save user for the first time when the API responses with 0
function saveUserFirtsTime() {
    let url_api = localStorage.getItem("url_api");
    let email_ls = localStorage.getItem("email");
    $.ajax({
        url: url_api,
        contentType: 'application/json',
        dataType: 'json',
        data: `{"emailAlumno": "${email_ls}"}`,
        type: 'POST',
        success: function (response) {
            getIdByEmail();
        }
    });
}

// Get the id from the user inserted when the API responses with 1
function getIdByEmail() {
    let url_api = localStorage.getItem("url_api");
    let email_ls = localStorage.getItem("email");
    $.ajax({
        url: url_api + `findOne?_where=(emailAlumno,eq,${email_ls})`,
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function (response) {
            localStorage.setItem("id_user", response[0].ID);
            listarReglamentosPorID();
        }
    });
}

function listarReglamentosPorID() {
    showEmail();
    let url_api = localStorage.getItem("url_api");
    let id = localStorage.getItem("id_user");
    var url = url_api + id;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);

            let leido1 = '';
            let color1 = '';
            let leido2 = '';
            let color2 = '';
            let leido3 = '';
            let color3 = '';
            let leido4 = '';
            let color4 = '';
            let leido5 = '';
            let color5 = '';
            let leido6 = '';
            let color6 = '';
            
            let leido_conformidad_covid = '';
            let color_conformidad_covid = '';

            if (respuesta[0].documento01 == 0) {
                leido1 = 'No';
                color1 = 'text-danger';
            } else {
                leido1 = 'Si';
                color1 = 'text-success';
            }
            if (respuesta[0].documento02 == 0) {
                leido2 = 'No';
                color2 = 'text-danger';
            } else {
                leido2 = 'Si';
                color2 = 'text-success';
            }
            if (respuesta[0].documento03 == 0) {
                leido3 = 'No';
                color3 = 'text-danger';
            } else {
                leido3 = 'Si';
                color3 = 'text-success';
            }
            if (respuesta[0].documento04 == 0) {
                leido4 = 'No';
                color4 = 'text-danger';
            } else {
                leido4 = 'Si';
                color4 = 'text-success';
            }
            if (respuesta[0].documento05 == 0) {
                leido5 = 'No';
                color5 = 'text-danger';
            } else {
                leido5 = 'Si';
                color5 = 'text-success';
            }
            if (respuesta[0].documento06 == 0) {
                leido6 = 'No';
                color6 = 'text-danger';
            } else {
                leido6 = 'Si';
                color6 = 'text-success';
            }

            if (respuesta[0].documento_covid == 0) {
                leido_conformidad_covid = 'No';
                color_conformidad_covid = 'text-danger';
            } else {
                leido_conformidad_covid = 'Si';
                color_conformidad_covid = 'text-success';
            }

            let datosUsuario = document.querySelector('#tbodyReglamentos');

            let datosUsuario_anterior = '';
            datosUsuario_anterior.innerHTML = ` 
            <tr>
            <td class="text-center align-middle"></td>
            <td><a href="#" data-toggle="modal" class="text-dark" data-target="#documento1">Procedimiento de respuesta ante accidentes</a></td>
            <td class="text-center ${color1} align-middle">${leido1}</td>
            </tr>
            <tr>
            <td class="text-center align-middle"></td>
            <td><a href="#" data-toggle="modal" class="text-dark" data-target="#documento2">Procedimiento de respuesta ante derrames de insumos químicos</a></td>
            <td class="text-center ${color2} align-middle">${leido2}</td>
            </tr>
            <tr>
            <td class="text-center align-middle"></td>
            <td><a href="#" data-toggle="modal" class="text-dark" data-target="#documento3">Procedimiento de respuesta ante fuga de gases</a></td>
            <td class="text-center ${color3} align-middle">${leido3}</td>
            </tr>
            <tr>
            <td class="text-center align-middle"></td>
            <td><a href="#" data-toggle="modal" class="text-dark" data-target="#documento4">Procedimiento para el uso adecuado de herramientas y máquinas</a></td>
            <td class="text-center ${color4} align-middle">${leido4}</td>
            </tr>
            <tr>
            <td class="text-center align-middle"></td>
            <td><a href="#" data-toggle="modal" class="text-dark" data-target="#documento5">Procedimiento para la manipulación, almacenamiento y transporte de insumos químicos</a></td>
            <td class="text-center ${color5} align-middle">${leido5}</td>
            </tr>
            <tr>
            <td class="text-center align-middle"></td>
            <td><a href="#" data-toggle="modal" class="text-dark" data-target="#documento6">Reglamento de seguridad para trabajo en laboratorios y talleres</a></td>
            <td class="text-center ${color6} align-middle">${leido6}</td>
            </tr>

            <tr>
            <td class="text-center align-middle"></td>
            <td><a href="#" data-toggle="modal" class="text-dark" data-target="#conformidad-covid">Documento COVID-19</a></td>
            <td class="text-center ${color_conformidad_covid} align-middle">${leido_conformidad_covid}</td>
            </tr>
            `
            
            datosUsuario.innerHTML = `
            <tr>
            <td class="text-center align-middle"></td>
            <td><a id="anchor-conf-covid" href="#" data-toggle="modal" class="text-dark" data-target="#conformidad-covid">CARTA DE COMPROMISO DE ESTUDIANTE DE UTEC</a></td>
            <td class="text-center ${color_conformidad_covid} align-middle">${leido_conformidad_covid}</td>
            </tr>
            `
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}


function guardarDoc1() {
    let url_api = localStorage.getItem("url_api");
    let id = localStorage.getItem("id_user");
    $.ajax({
        url: url_api + id,
        contentType: 'application/json',
        dataType: 'json',
        data: `{
            "documento01": 1, ,
            "fechaDocumento01": "${fechaFormateadaGlobal}"
        }`,
        type: 'PATCH',
        success: function (response) {
            listarReglamentosPorID();
        }
    });
}

function guardarDoc2() {
    let url_api = localStorage.getItem("url_api");
    let id = localStorage.getItem("id_user");
    $.ajax({
        url: url_api + id,
        contentType: 'application/json',
        dataType: 'json',
        data: `{
            "documento02": 1, ,
            "fechaDocumento02": "${fechaFormateadaGlobal}"
        }`,
        type: 'PATCH',
        success: function (response) {
            listarReglamentosPorID();
        }
    });
}

function guardarDoc3() {
    let url_api = localStorage.getItem("url_api");
    let id = localStorage.getItem("id_user");
    $.ajax({
        url: url_api + id,
        contentType: 'application/json',
        dataType: 'json',
        data: `{
            "documento03": 1, ,
            "fechaDocumento03": "${fechaFormateadaGlobal}"
        }`,
        type: 'PATCH',
        success: function (response) {
            listarReglamentosPorID();
        }
    });
}

function guardarDoc4() {
    let url_api = localStorage.getItem("url_api");
    let id = localStorage.getItem("id_user");
    $.ajax({
        url: url_api + id,
        contentType: 'application/json',
        dataType: 'json',
        data: `{
            "documento04": 1, ,
            "fechaDocumento04": "${fechaFormateadaGlobal}"
        }`,
        type: 'PATCH',
        success: function (response) {
            listarReglamentosPorID();
        }
    });
}

function guardarDoc5() {
    let url_api = localStorage.getItem("url_api");
    let id = localStorage.getItem("id_user");
    $.ajax({
        url: url_api + id,
        contentType: 'application/json',
        dataType: 'json',
        data: `{
            "documento05": 1, ,
            "fechaDocumento05": "${fechaFormateadaGlobal}"
        }`,
        type: 'PATCH',
        success: function (response) {
            listarReglamentosPorID();
        }
    });
}

function guardarDoc6() {
    let url_api = localStorage.getItem("url_api");
    let id = localStorage.getItem("id_user");
    $.ajax({
        url: url_api + id,
        contentType: 'application/json',
        dataType: 'json',
        data: `{
            "documento06": 1, ,
            "fechaDocumento06": "${fechaFormateadaGlobal}"
        }`,
        type: 'PATCH',
        success: function (response) {
            listarReglamentosPorID();
        }
    });
}

function guardarDocCOVID() {
    let url_api = localStorage.getItem("url_api");
    let id = localStorage.getItem("id_user");

    let nombre_completo_dcovid = $('#nombre-completo-dcovid').val();
    let dni_dcovid = $('#dni-dcovid').val();
    let codigo_alumno_dcovid = $('#codigo-alumno-dcovid').val(); 
    
    $.ajax({
        url: url_api + id,
        contentType: 'application/json',
        dataType: 'json',
        data: `{
            "documento_covid": 1,
            "fecha_documento_covid": "${fechaFormateadaGlobal}",
            "nombre_completo_alumno": "${nombre_completo_dcovid}",
            "dni_alumno": "${dni_dcovid}",
            "codigo_alumno": "${codigo_alumno_dcovid}"
        }`,
        type: 'PATCH',
        success: function (response) {
            $('#nombre-completo-dcovid').val("");
            $('#dni-dcovid').val("");
            $('#codigo-alumno-dcovid').val(""); 
            listarReglamentosPorID();
        }
    });
}

function saveEmergencyContact() {

    let url_api = localStorage.getItem("url_api");
    let id = localStorage.getItem("id_user");

    let correo_contact = $('#correo-contact').val();
    let nombres_apellidos = $('#nombres-apellidos').val();
    let telefono = $('#telefono').val();
    let periodo = $('#periodo').val();

    $.ajax({
        url: url_api + id,
        contentType: 'application/json',
        dataType: 'json',
        data: `{
            "emailEmergencia": "${correo_contact}",
            "nombresApellidosContactoEmergencia": "${nombres_apellidos}",
            "telefonoContactoEmergencia": "${telefono}",
            "periodo": "${periodo}"
        }`,
        type: 'PATCH',
        success: function (response) {
            $('#correo-contact').val("");
            $('#nombres-apellidos').val("");
            $('#telefono').val("");
            $('#modal-formulario').modal('hide');
            $('#successModal').modal('show');
        }
    });
}

function showEmail() {
    let email_ls = localStorage.getItem("email");
    $("#user_email").html(email_ls);
}

function validateForm() {
    let email_regex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;

    let correo = $('#correo-contact').val();
    let fullname = $('#nombres-apellidos').val();
    let phone = $('#telefono').val();

    if (correo == '') {
        $("#error_email").html(" *Este campo es obligatorio");
        $("#error_email").fadeIn();
        return false;
    }else if (!email_regex.test(correo)) {
        $("#error_email").html(" *Ingrese un email valido");
        $("#error_email").fadeIn();
        return false;
    }else if (fullname == '') {
        $("#error_fullname").html(" *Este campo es obligatorio");
        $("#error_fullname").fadeIn();
        return false;
    } else if (fullname.length <= 1) {
        $("#error_fullname").html(" *Ingrese un nombre valido");
        $("#error_fullname").fadeIn();
        return false;
    } else if (phone == '') {
        $("#error_telefono").html(" *Este campo es obligatorio");
        $("#error_telefono").fadeIn();
    }   else if (phone.length != 9) {
        $("#error_telefono").html(" *Ingrese un numero valido de 9 digitos");
        $("#error_telefono").fadeIn();
    } else {
        saveEmergencyContact();
    }
}

function logout(){
    window.location = "/logout"
}

function showCurrentDate() {

    let fullDate = new Date();

    let dia_actual = fullDate.getDate();
    let mes_actual = fullDate.getMonth() + 1;
    let year_actual = fullDate.getFullYear();

    let hora_actual = fullDate.getHours();
    let min_actual = fullDate.getMinutes();
    let seg_actual = fullDate.getSeconds();

    let fechaFormateada = `${year_actual}-${mes_actual}-${dia_actual} ${hora_actual}:${min_actual}:${seg_actual}`;

/*     console.log(fullDate);

    console.log(hora_actual);
    console.log(min_actual);
    console.log(seg_actual);

    console.log(dia_actual);
    console.log(mes_actual);
    console.log(year_actual); */

    switch (mes_actual) {
        case 1:
            mes_actual_letras = 'Enero';
            break;
        case 2:
            mes_actual_letras = 'Febrero';
            break;
        case 3:
            mes_actual_letras = 'Marzo';
            break;
        case 4:
            mes_actual_letras = 'Abril';
            break;
        case 5:
            mes_actual_letras = 'Mayo';
            break;
        case 6:
            mes_actual_letras = 'Junio';
            break;
        case 7:
            mes_actual_letras = 'Julio';
            break;
        case 8:
            mes_actual_letras = 'Agosto';
            break;
        case 9:
            mes_actual_letras = 'Setiembre';
            break;
        case 10:
            mes_actual_letras = 'Octubre';
            break;
        case 11:
            mes_actual_letras = 'Noviembre';
            break;
        case 12:
            mes_actual_letras = 'Diciembre';
            break;
    }

    $("#dia-actual").html(dia_actual);
    $("#mes-actual").html(mes_actual_letras);
    $("#year-actual").html(year_actual);

    return fechaFormateada;
}

