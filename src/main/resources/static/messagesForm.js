$.ajax({
    type:"GET",
    dataType:"JSON",
    url:"http://158.101.114.26:8080/api/Message/all",
    success:function(datos){
        console.log(datos)
        let datosApi ="";
        for (i=0; i<datos.length; i++){
            datosApi += "<tr>";
            datosApi += "<td>"+datos[i].idMessage+"</td>";
            datosApi += "<td>"+datos[i].messageText+"</td>";
            datosApi += "<td><a href = '#' onclick = 'updateModal("+datos[i].idMessage+");' data-bs-toggle='modal' data-bs-target='#modalEditar' class = 'btn btn-warning'>Editar</a></td>";
            datosApi += "<td><a href = '#' onclick = 'deleteMessage("+datos[i].idMessage+");' class = 'btn btn-danger'>Eliminar</a></td>";
            datosApi += "</tr>";   
        } 
        $("#datos").append(datosApi);
    }
})

function deleteMessage(id){
    console.log(id);
    $.ajax({
        type:"DELETE",
        url:"http://158.101.114.26:8080/api/Message/"+id,
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
        url:"http://158.101.114.26:8080/api/Message/"+id,
        success:function(datos){
            console.log(datos);
            document.querySelector("#idEd").value = id;
            document.querySelector("#nombreEd").value = datos.messageText;
        }
    })
}
function saveMessage(){
    console.log("Guardar");
    let datosMsn = {
        messageText:$("#text").val()
    }
    console.log(datosMsn);
   var parametros = {
        "messageText":datosMsn.messageText,  
    }
    let parametrosEnvio=JSON.stringify(parametros);
    $.ajax({
        url:"http://158.101.114.26:8080/api/Message/save",
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

function updateMessage(){
    console.log("Editar");
    let datosMsn = {
        idMessage:parseInt($("#idEd").val()),
        messageText:$("#textEd").val()
    };
console.log()
    var parametros = {
        "idMessage":datosMsn.idMessage,
        "messageText":datosMsn.messageText
    };
    let parametrosEnvio = JSON.stringify(parametros);
    $.ajax({
        url:"http://158.101.114.26:8080/api/Message/update",
        type:"PUT",
        dataType:"JSON",
        contentType:"application/JSON",
        data:parametrosEnvio,
        success:function(response){
            window.location.reload();
        }
    })
    console.log(datosMsn);
}