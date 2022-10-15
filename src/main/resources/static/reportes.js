//REPORTE PERIODO DE FECHAS
function reporteDates(){
    var fechaInicio= document.getElementById("inicio").value;
    var fechaFin= document.getElementById("final").value;

    $.ajax({
        url:"http://158.101.114.26:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaFin,    
        type:"GET",
        dataType:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            addItems(respuesta);
        }
    });
}

function addItems(respuesta){
    let myTable= "<table class='table table-dark table-striped'>";
    myTable+="<tr>";
    myTable+="<th>Total</th><td>"+respuesta.length+"</td></tr><tr>";
    myTable+="<th>ID</th><th>Fecha Inicio</th><th>Fecha Fin</th></tr>"
    //
    for (i=0;i<respuesta.length;i++){
        start=respuesta[i].startDate;
        fin = respuesta[i].devolutionDate;
        myTable+="<tr><th>"+respuesta[i].idReservation+"</th>";
        myTable+="<td>"+start.slice(0,10)+"</td>";
        myTable+="<td>"+fin.slice(0,10)+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>"
    $("#reservasDates").html(myTable);

}
//REPORTE STATUS
function reporteStatus(respuesta){
    $.ajax({
        url:"http://158.101.114.26:8080/api/Reservation/report-status",    
        type:"GET",
        dataType:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            addStatus(respuesta);
        }
    });
}

function addStatus(respuesta){
    let myTable= "<table class='table table-dark table-striped'>";
    myTable+="<tr>";
    myTable+="<th>Reservas Completadas</th><th>Reservas Canceladas</th></tr>";
    myTable+="<td>"+respuesta.completed+"</td>";
    myTable+="<td>"+respuesta.cancelled+"</td>";
    myTable+="</table>";
    $("#status").html(myTable);

}

//REPORTE CLIENTES

function reporteClient(respuesta){
    $.ajax({
        url:"http://158.101.114.26:8080/api/Reservation/report-clients",    
        type:"GET",
        dataType:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            addClients(respuesta);
        }
    });
}

function addClients(respuesta){
    let myTable= "<table class='table table-dark table-striped'>";
    myTable+="<tr>";
    myTable+="<th>No</th><th>Cliente</th><th>Número de Reservaciones</th></tr>"
    for (i=0;i<respuesta.length;i++){
        nombre=respuesta[i].client.name;
        total = respuesta[i].total;
        pos= i+1;
        myTable+="<tr><th>"+pos+"</th>";
        myTable+="<td>"+nombre+"</td>";
        myTable+="<td>"+total+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>"
    $("#clients").html(myTable);
}