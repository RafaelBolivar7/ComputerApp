$.ajax({
    type:"GET",
    dataType:"JSON",
    url:"http://158.101.114.26:8080/api/Reservation/all",
    success:function(datos){
        console.log(datos)
        let datosApi ="";
        for (i=0; i<datos.length; i++){
            datosApi += "<tr>";
            datosApi += "<td>"+datos[i].idReservation+"</td>";
            datosApi += "<td>"+datos[i].startDate+"</td>";
            datosApi += "<td>"+datos[i].devolutionDate+"</td>";
            datosApi += "<td>"+datos[i].status+"</td>";
            datosApi += "<td><a href = '#' onclick = 'updateModal("+datos[i].idReservation+");' data-bs-toggle='modal' data-bs-target='#modalEditar' class = 'btn btn-outline-warning'>Editar</a></td>";
            datosApi += "<td><a href = '#' onclick = 'deleteComputer("+datos[i].idReservation+");' class = 'btn btn-outline-danger'>Eliminar</a></td>";
            datosApi += "</tr>";   
        } 
        $("#datos").append(datosApi);
    }
})

function deleteReservation(id){
    console.log(id);
    $.ajax({
        type:"DELETE",
        url:"http://158.101.114.26:8080/api/Reservation/"+id,
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
        url:"http://158.101.114.26:8080/api/Reservation/"+id,
        success:function(datos){
            console.log(datos);
            document.querySelector("#idEd").value = id;
            document.querySelector("#inicioEd").value = datos.startDate;
            document.querySelector("#finEd").value = datos.devolutionDate;
            document.querySelector("#estadoEd").value = datos.status;
        }
    })
}
function saveReservation(){
    console.log("Guardar");
    let datosReservation = {
        startDate:$("#inicio").val(),
        devolutionDate:$("#fin").val(),
        status:$("#estado").val(),
    }
    console.log(datosReservation);

   var parametros = {
        "startDate":datosReservation.startDate,
        "devolutionDate":datosReservation.devolutionDate,
        "status":datosReservation.status, 
    }
    let parametrosEnvio=JSON.stringify(parametros);

    $.ajax({
        url:"http://158.101.114.26:8080/api/Reservation/save",
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

function updateReservation(){
    console.log("Editar");
    let datosReservation = {
        idReservation:parseInt($("#idEd").val()),
        startDate:$("#inicioEd").val(),
        devolutionDate:$("#finEd").val(),
        status:$("#estadoEd").val()
    };
console.log()
    var parametros = {
        "idReservation":datosReservation.idReservation,
        "startDate":datosReservation.startDate,
        "devolutionDate":datosReservation.devolutionDate,
        "status":datosReservation.status
    };
    let parametrosEnvio = JSON.stringify(parametros);
    $.ajax({
        url:"http://158.101.114.26:8080/api/Reservation/update",
        type:"PUT",
        dataType:"JSON",
        contentType:"application/JSON",
        data:parametrosEnvio,
        success:function(response){
            window.location.reload();
        }
    })
    console.log(datosReservation);
}