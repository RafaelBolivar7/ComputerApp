$.ajax({
    type:"GET",
    dataType:"JSON",
    url:"http://158.101.114.26:8080/api/Score/all",
    success:function(datos){
        console.log(datos)
        let datosApi ="";
        for (i=0; i<datos.length; i++){
            datosApi += "<tr>";
            datosApi += "<td>"+datos[i].idScore+"</td>";
            datosApi += "<td>"+datos[i].messageText+"</td>";
            datosApi += "<td>"+datos[i].stars+"</td>";
          //  datosApi += "<td>"+datos[i].reservation.idReservation+"</td>";
            datosApi += "<td><a href = '#' onclick = 'updateModal("+datos[i].idScore+");' data-bs-toggle='modal' data-bs-target='#modalEditar' class = 'btn btn-warning'>Editar</a></td>";
            datosApi += "<td><a href = '#' onclick = 'deleteScore("+datos[i].idScore+");' class = 'btn btn-danger'>Eliminar</a></td>";
            datosApi += "</tr>";   
        } 
        $("#datos").append(datosApi);
    }
})

function deleteScore(id){
    console.log(id);
    $.ajax({
        type:"DELETE",
        url:"http://158.101.114.26:8080/api/Score/"+id,
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
        url:"http://158.101.114.26:8080/api/Score/"+id,
        success:function(datos){
            console.log(datos);
            document.querySelector("#idEd").value = id;
            document.querySelector("#textoEd").value = datos.messageText;
            document.querySelector("#calificacionEd").value = datos.stars;
         //   document.querySelector("#reservaEd").value = datos.reservation.idReservation;
        }
    })
}
function saveScore(){
    console.log("Guardar");
    let datosScore = {
        messageText:$("#texto").val(),
        stars:parseInt($("#calificacion").val()),
      //  reservation:parseInt($("#reserva").val())
    }
    console.log(datosScore);
   var parametros = {
        "messageText":datosScore.messageText,
        "stars":datosScore.stars,
        //"reservation":{'id':datosScore.reservation}     
    }
    let parametrosEnvio=JSON.stringify(parametros);
   
    $.ajax({
        url:"http://158.101.114.26:8080/api/Score/save",
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

function updateScore(){
    console.log("Editar");
    let datosScore = {
        id:parseInt($("#idEd").val()),
        messageText:$("#textoEd").val(),
        stars:parseInt($("#calificacionEd").val()),
      //  reservation:parseInt($("#reservaEd").val())
    };
console.log()
    var parametros = {
        "idScore":datosScore.id,
        "messageText":datosScore.messageText,
        "stars":datosScore.stars,
       // "reservation":{"id":datosScore.reservation}
    };
    let parametrosEnvio = JSON.stringify(parametros);
    $.ajax({
        url:"http://158.101.114.26:8080/api/Score/update",
        type:"PUT",
        dataType:"JSON",
        contentType:"application/JSON",
        data:parametrosEnvio,
        success:function(response){
            window.location.reload();
        }
    })
    console.log(datosScore);
}