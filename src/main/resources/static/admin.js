$.ajax({
    type:"GET",
    dataType:"JSON",
    url:"http://158.101.114.26:8080/api/Admin/all",
    success:function(datos){
        console.log(datos)
        let datosApi ="";
        for (i=0; i<datos.length; i++){
            datosApi += "<tr>";
            datosApi += "<td>"+datos[i].id+"</td>";
            datosApi += "<td>"+datos[i].name+"</td>";
            datosApi += "<td>"+datos[i].password+"</td>";
            datosApi += "<td>"+datos[i].email+"</td>";
            datosApi += "<td><a href = '#' onclick = 'updateModal("+datos[i].id+");' data-bs-toggle='modal' data-bs-target='#modalEditar' class = 'btn btn-warning'>Editar</a></td>";
            datosApi += "<td><a href = '#' onclick = 'deleteAdmin("+datos[i].id+");' class = 'btn btn-danger'>Eliminar</a></td>";
            datosApi += "</tr>";   
        } 
        $("#datos").append(datosApi);
    }
})

function deleteAdmin(id){
    console.log(id);
    $.ajax({
        type:"DELETE",
        url:"http://158.101.114.26:8080/api/Admin/"+id,
        success:function(datos){
            window.location.reload();
        }
    })
}

function updateModal(id){
    console.log(id);
    $.ajax({
        type:"GET",
        dataType:"JSON",
        url:"http://158.101.114.26:8080/api/Admin/"+id,
        success:function(datos){
            console.log(datos);
            document.querySelector("#idEd").value = id;
            document.querySelector("#nombreEd").value = datos.name;
            document.querySelector("#passEd").value = datos.password;
            document.querySelector("#emailEd").value = datos.email;
        }
    })
}
function saveAdmin(){
    console.log("Guardar");
    let datosAdmin = {
        name: $("#nombreAdmin").val(),
        password: $("#pass").val(),
        email: $("#email").val()
    }
    console.log(datosAdmin);
    var parametros = {
        "name": datosAdmin.name,
        "password": datosAdmin.password,
        "email": datosAdmin.email
    }
    let parametrosEnvio = JSON.stringify(parametros);

    $.ajax({
        url: "http://158.101.114.26:8080/api/Admin/save",
        type: "POST",
        dataType: "JSON",
        contentType: "application/JSON",
        data: parametrosEnvio,
        success: function (response) {
            window.location.reload();
        }
    })
    console.log(parametrosEnvio);
}

function updateAdmin(){
    console.log("Editar");
    let datosAdmin = {
        id:parseInt($("#idEd").val()),
        name:$("#nombreEd").val(),
        password:$("#passEd").val(),
        email:$("emailEd").val()
    };
console.log()
    var parametros = {
        "id":datosAdmin.id,
        "name":datosAdmin.name,
        "password":datosAdmin.password,
        "email":datosAdmin.email
    };
    let parametrosEnvio = JSON.stringify(parametros);
    $.ajax({
        url:"http://158.101.114.26:8080/api/Admin/update",
        type:"PUT",
        dataType:"JSON",
        contentType:"application/JSON",
        data:parametrosEnvio,
        success:function(response){
            window.location.reload();
        }
    })
    console.log(datosPc);
}