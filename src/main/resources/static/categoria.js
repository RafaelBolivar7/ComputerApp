$.ajax({
    type:"GET",
    dataType:"JSON",
    url:"http://158.101.114.26:8080/api/Category/all",
    success:function(datos){
        console.log(datos)
        let datosApi ="";
        for (i=0; i<datos.length; i++){
            datosApi += "<tr>";
            datosApi += "<td>"+datos[i].id+"</td>";
            datosApi += "<td>"+datos[i].name+"</td>";
            datosApi += "<td>"+datos[i].description+"</td>";
            datosApi += "<td><a href = '#' onclick = 'updateModal("+datos[i].id+");' data-bs-toggle='modal' data-bs-target='#modalEditar' class = 'btn btn-warning'>Editar</a></td>";
            datosApi += "<td><a href = '#' onclick = 'deleteCategory("+datos[i].id+");' class = 'btn btn-danger'>Eliminar</a></td>";
            datosApi += "</tr>";   
        } 
        $("#datos").append(datosApi);
    }
})

function deleteCategory(id){
    console.log(id);
    $.ajax({
        type:"DELETE",
        url:"http://158.101.114.26:8080/api/Category/"+id,
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
        url:"http://158.101.114.26:8080/api/Category/"+id,
        success:function(datos){
            console.log(datos);
            document.querySelector("#idEd").value = id;
            document.querySelector("#nombreEd").value = datos.name;
            document.querySelector("#descripcionEd").value = datos.description;
        }
    })
}
function saveCategory(){
    console.log("Guardar");
    let datosCategory = {
        name:$("#nombreCategoria").val(),
        description:$("#descripcion").val()
    }
    console.log(datosCategory);
   var parametros = {
        "name":datosCategory.name,
        "description":datosCategory.description 
    }
    let parametrosEnvio=JSON.stringify(parametros);
    
    $.ajax({
        url:"http://158.101.114.26:8080/api/Category/save",
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

function updateCategory(){
    console.log("Editar");
    let datosCategory = {
        id:parseInt($("#idEd").val()),
        name:$("#nombreEd").val(),
        description:$("#descripcionEd").val()
    };
console.log()
    var parametros = {
        "id":datosCategory.id,
        "name":datosCategory.name,
        "description":datosCategory.description
    };
    let parametrosEnvio = JSON.stringify(parametros);
    $.ajax({
        url:"http://158.101.114.26:8080/api/Category/update",
        type:"PUT",
        dataType:"JSON",
        contentType:"application/JSON",
        data:parametrosEnvio,
        success:function(response){
            window.location.reload();
        }
    })
    console.log(datosCategory);
}