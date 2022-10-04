function getComputer(){
    // GET
    $.ajax({
        type:'GET',
        dataType:'JSON',
        url: "https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/computer/computer",      
        success : function(data) {
            console.log(data);
            addToTable(data.items);
        }
    });                    
}

function addToTable(items){
    let datosApi= "";
    $("#datos").empty();
    for(i = 0;i<items.length;i++){
        datosApi+= "<tr>";
        datosApi+= "<td class = 'datosTabla'>"+items[i].id+"</td>";
        datosApi+= "<td class = 'datosTabla'>"+items[i].name+"</td>";
        datosApi+= "<td class = 'datosTabla'>"+items[i].brand+"</td>";
        datosApi+= "<td class = 'datosTabla'>"+items[i].model+"</td>";
        datosApi+= "<td class = 'datosTabla'>"+items[i].category_id+"</td>";
        datosApi+= "<td><a href = '#' class='btn btn-success'>Editar</a></td>";
        datosApi+= "<td><button onclick='deleteComputer("+items[i].id+")' class='btn btn-danger'>Eliminar</button></td>";
        datosApi+= "</tr>";
    }
   ;
    $("#datos").append(datosApi)
}

function saveComputer(){
    let pcData={
        id:$("#idComputador").val(),
        brand:$("#marca").val(),
        model:$("#modelo").val(),
        category_id:$("#categoria").val(),
        name:$("#nombreComputador").val()
    }
    let dataToSend=JSON.stringify(pcData);

    $.ajax({
        url:"https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/computer/computer",
        type:"POST",
        data:pcData,
        dataType:"JSON",
        success:function(respuesta){
            alert("Se ha guardado")          
        },
        error: function(xhr, status) {
               //alert('ha sucedido un problema');
             },
             complete: function(){
                $("#idComputador").val("");
                $("#marca").val("");
                $("#modelo").val("");
                $("#categoria").val("");
                $("#nombreComputador").val("");
                getComputer();
             }
    })
}

function updateComputer(){
    let updateData={
        id:$("#idComputador").val(),
        brand:$("#marca").val(),
        model:$("#modelo").val(),
        category_id:$("#categoria").val(),
        name:$("#nombreComputador").val()
    }
    let dataToSend=JSON.stringify(updateData);

    $.ajax({
        url:"https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/computer/computer",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        dataType:"JSON",
        success:function(respuesta){           
            alert("Se ha actualizado")  
        }, complete: function(){
            $("#datos").empty();
            $("#idComputador").val("");
            $("#marca").val("");
            $("#modelo").val("");
            $("#categoria").val("");
            $("#nombreComputador").val("");
            getComputer();
         }
    });
}

function deleteComputer(idComputer){
    let delData={
        id:idComputer
    };

    let dataToSend=JSON.stringify(delData);

    $.ajax({
        url:"https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/computer/computer",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        dataType:"JSON",
        success: function(respuesta){
            $("#datos").empty();           
            alert("Elemento Eliminado")
        },complete:function(){
            getComputer();
        }
    });
}

