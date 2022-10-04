function getCategory(){
    // GET
    $.ajax({
        type:'GET',
        dataType:'JSON',
        url: "https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/category/category",      
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
        datosApi+= "<td class = 'datosTabla'>"+items[i].description+"</td>";
        datosApi+= "<td><a href = '#' class='btn btn-success'>Editar</a></td>";
        datosApi+= "<td><button onclick='deleteCategory("+items[i].id+")' class='btn btn-danger'>Eliminar</button></td>";
        datosApi+= "</tr>";
    }
   ;
    $("#datos").append(datosApi)
}

function saveCategory(){
    let pcData={
        id:$("#idCategoria").val(),
        name:$("#nombreCategoria").val(),
        description:$("#descripcionCategoria").val()
    }
    let dataToSend=JSON.stringify(pcData);

    $.ajax({
        url:"https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/category/category",
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
                $("#idCategoria").val("");
                $("#nombreCategoria").val("");
                $("#descripcionCategoria").val("");
                getCategory();
             }
    })
}

function updateCategory(){
    let updateData={
        id:$("#idCategoria").val(),
        name:$("#nombreCategoria").val(),
        description:$("#descripcionCategoria").val()
        
    }
    let dataToSend=JSON.stringify(updateData);

    $.ajax({
        url:"https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/category/category",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        dataType:"JSON",
        success:function(respuesta){           
            alert("Se ha actualizado")  
        }, complete: function(){
            $("#datos").empty();
            $("#idCategoria").val("");
            $("#nombreCategoria").val("");
            $("#descripcionCategoria").val("");
            getCategory();
         }
    });
}

function deleteCategory(idCategory){
    let delData={
        id:idCategory
    };

    let dataToSend=JSON.stringify(delData);

    $.ajax({
        url:"https://gf89568b4a1d035-jf6gec79emyrjw9v.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/category/category",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        dataType:"JSON",
        success: function(respuesta){
            $("#datos").empty();           
            alert("Elemento Eliminado")
        },complete:function(){
            getCategory();
        }
    });
}

