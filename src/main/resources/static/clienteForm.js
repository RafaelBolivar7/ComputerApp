$.ajax({
    type:"GET",
    dataType:"JSON",
    url:"http://158.101.114.26:8080/api/Client/all",
    success:function(datos){
        console.log(datos)
        let datosApi ="";
        for (i=0; i<datos.length; i++){
            datosApi += "<tr>";
            datosApi += "<td>"+datos[i].idClient+"</td>";
            datosApi += "<td>"+datos[i].name+"</td>";
            datosApi += "<td>"+datos[i].email+"</td>";
            datosApi += "<td>"+datos[i].password+"</td>";
            datosApi += "<td>"+datos[i].age+"</td>";
            datosApi += "<td><a href = '#' onclick = 'updateModal("+datos[i].idClient+");' data-bs-toggle='modal' data-bs-target='#modalEditar' class = 'btn btn-warning'>Editar</a></td>";
            datosApi += "<td><a href = '#' onclick = 'deleteClient("+datos[i].idClient+");' class = 'btn btn-danger'>Eliminar</a></td>";
            datosApi += "</tr>";   
        } 
        $("#datos").append(datosApi);
    }
})

function deleteClient(id){
    console.log(id);
    $.ajax({
        type:"DELETE",
        url:"http://158.101.114.26:8080/api/Client/"+id,
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
        url:"http://158.101.114.26:8080/api/Client/"+id,
        success:function(datos){
            console.log(datos);
            document.querySelector("#idEd").value = id;
            document.querySelector("#nombreEd").value = datos.name;
            document.querySelector("#emailEd").value = datos.email;
            document.querySelector("#passEd").value = datos.password;
            document.querySelector("#edadEd").value = datos.age;
        }
    })
}
function saveClient(){
    console.log("Guardar");
    let datosClient = {
        name:$("#nombreCliente").val(),
        email:$("#email").val(),
        password:$("#pass").val(),
        age:parseInt($("#edad").val())
    }

    console.log(datosClient);
    
   var parametros = {
        "name":datosClient.name,
        "email":datosClient.email,
        "password":datosClient.password,
        "age":datosClient.age  
    }
    let parametrosEnvio=JSON.stringify(parametros);
   
    $.ajax({
        url:"http://158.101.114.26:8080/api/Client/save",
        type:"POST",
        dataType:"JSON",
        contentType:"application/JSON",
        data:parametrosEnvio,
        success:function(response){
            window.location.reload();
        }
    })
    console.log(parametrosEnvio);
}

function updateClient(){
    console.log("Editar");
    let datosClient = {
        idClient:parseInt($("#idEd").val()),
        name:$("#nombreEd").val(),
        email:$("#emailEd").val(),
        password:$("#passEd").val(),
        age:parseInt($("#edadEd").val())
    };
console.log()
    var parametros = {
        "idClient":datosClient.idClient,
        "name":datosClient.name,
        "email":datosClient.email,
        "password":datosClient.password,
        "age":datosClient.age
    };
    let parametrosEnvio = JSON.stringify(parametros);
    $.ajax({
        url:"http://158.101.114.26:8080/api/Client/update",
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