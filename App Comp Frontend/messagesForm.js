function getMessage(){
    // GET
    $.ajax({
        type:'GET',
        dataType:'JSON',
        url: "https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",      
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
        datosApi+= "<td class = 'datosTabla'>"+items[i].messagetext+"</td>";
        datosApi+= "<td><a href = '#' class='btn btn-success'>Editar</a></td>";
        datosApi+= "<td><button onclick='deleteMessage("+items[i].id+")' class='btn btn-danger'>Eliminar</button></td>";
        datosApi+= "</tr>";
    }
   ;
    $("#datos").append(datosApi)
}

function saveMessage(){
    let pcData={
        id:$("#idMensaje").val(),
        messagetext:$("#textoMensaje").val()
    }
    let dataToSend=JSON.stringify(pcData);

    $.ajax({
        url:"https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
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
                $("#idMensaje").val("");
                $("#textoMensaje").val("");
                getMessage();
             }
    })
}

function updateMessage(){
    let updateData={
        id:$("#idMensaje").val(),
        messagetext:$("#textoMensaje").val()
    }
    let dataToSend=JSON.stringify(updateData);

    $.ajax({
        url:"https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        dataType:"JSON",
        success:function(respuesta){           
            alert("Se ha actualizado")  
        }, complete: function(){
            $("#datos").empty();
            $("#idMensaje").val("");
            $("#textoMensaje").val("");
            getMessage();
         }
    });
}

function deleteMessage(idMessage){
    let delData={
        id:idMessage
    };

    let dataToSend=JSON.stringify(delData);

    $.ajax({
        url:"https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        dataType:"JSON",
        success: function(respuesta){
            $("#datos").empty();           
            alert("Elemento Eliminado")
        },complete:function(){
            getMessage();
        }
    });
}

