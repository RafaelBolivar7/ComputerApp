function getClient(){
    // GET
    $.ajax({
        type:'GET',
        dataType:'JSON',
        url: "https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",      
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
        datosApi+= "<td class = 'datosTabla'>"+items[i].email+"</td>";
        datosApi+= "<td class = 'datosTabla'>"+items[i].age+"</td>";
        datosApi+= "<td><a href = '#' class='btn btn-success'>Editar</a></td>";
        datosApi+= "<td><button onclick='deleteClient("+items[i].id+")' class='btn btn-danger'>Eliminar</button></td>";
        datosApi+= "</tr>";
    }
   ;
    $("#datos").append(datosApi)
}

function saveClient(){
    let pcData={
        id:$("#idCliente").val(),
        name:$("#nombreCliente").val(),
        email:$("#mailCliente").val(),
        age:$("#edadCliente").val()
    }
    let dataToSend=JSON.stringify(pcData);

    $.ajax({
        url:"https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
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
                $("#idCliente").val("");
                $("#nombreCliente").val("");
                $("#mailCliente").val("");
                $("#edadCliente").val("");
                getClient();
             }
    });
}

function updateClient(){
    let updateData={
        id:$("#idCliente").val(),
        name:$("#nombreCliente").val(),
        email:$("#mailCliente").val(),
        age:$("#edadCliente").val()
    }
    let dataToSend=JSON.stringify(updateData);

    $.ajax({
        url:"https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        dataType:"JSON",
        success:function(respuesta){           
            alert("Se ha actualizado")  
        }, complete: function(){
            $("#datos").empty();
            $("#idCliente").val("");
            $("#nombreCliente").val("");
            $("#mailCliente").val("");
            $("#edadCliente").val("");
            getClient();
         }
    });
}

function deleteClient(idClient){
    let delData={
        id:idClient
    };

    let dataToSend=JSON.stringify(delData);

    $.ajax({
        url:"https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        dataType:"JSON",
        success: function(respuesta){
            $("#datos").empty();           
            alert("Elemento Eliminado")
        },complete:function(){
            getClient();
        }
    });
}

