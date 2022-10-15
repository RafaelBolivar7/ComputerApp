$.ajax({
    type:"GET",
    dataType:"JSON",
    url:"http://158.101.114.26:8080/api/Computer/all",
    success:function(datos){
        console.log(datos)
        let datosApi ="";
        for (i=0; i<datos.length; i++){
            datosApi += "<tr>";
            datosApi += "<td>"+datos[i].id+"</td>";
            datosApi += "<td>"+datos[i].name+"</td>";
            datosApi += "<td>"+datos[i].description+"</td>";
            datosApi += "<td>"+datos[i].brand+"</td>";
            datosApi += "<td>"+datos[i].year+"</td>";
            datosApi += "<td>"+datos[i].category.id+"</td>";
            datosApi += "<td><a href = '#' onclick = 'updateModal("+datos[i].id+");' data-bs-toggle='modal' data-bs-target='#modalEditar' class = 'btn btn-warning'>Editar</a></td>";
            datosApi += "<td><a href = '#' onclick = 'deleteComputer("+datos[i].id+");' class = 'btn btn-danger'>Eliminar</a></td>";
            datosApi += "</tr>";   
        } 
        $("#datos").append(datosApi);
    }
})

function deleteComputer(id){
    console.log(id);
    $.ajax({
        type:"DELETE",
        url:"http://158.101.114.26:8080/api/Computer/"+id,
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
        url:"http://158.101.114.26:8080/api/Computer/"+id,
        success:function(datos){
            console.log(datos);
            document.querySelector("#idEd").value = id;
            document.querySelector("#nombreEd").value = datos.name;
            document.querySelector("#descripcionEd").value = datos.description;
            document.querySelector("#brandEd").value = datos.brand;
            document.querySelector("#yearEd").value = datos.year;
            document.querySelector("#categoriaEd").value = datos.category.id;
        }
    })
}
function saveComputer(){
    console.log("Guardar");
    let datosPc = {
        name:$("#nombrePC").val(),
        description:$("#descripcion").val(),
        brand:$("#marca").val(),
        year:parseInt($("#model").val()),
        category:parseInt($("#categoria").val())
    }
    console.log(datosPc);
    alert( datosPc.year);
   var parametros = {
        "name":datosPc.name,
        "description":datosPc.description,
        "brand":datosPc.brand,
        "year":datosPc.year,
        "category":{'id':datosPc.category}     
    }
    let parametrosEnvio=JSON.stringify(parametros);
    
    $.ajax({
        url:"http://158.101.114.26:8080/api/Computer/save",
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

function updateComputer(){
    console.log("Editar");
    let datosPc = {
        id:parseInt($("#idEd").val()),
        name:$("#nombreEd").val(),
        description:$("#descripcionEd").val(),
        brand:$("brandEd").val(),
        year:parseInt($("#yearEd").val()),
        category:parseInt($("#categoriaEd").val())
    };
console.log()
    var parametros = {
        "id":datosPc.id,
        "name":datosPc.name,
        "description":datosPc.description,
        "brand":datosPc.brand,
        "year":datosPc.year,
        "category":{"id":datosPc.category}
    };
    let parametrosEnvio = JSON.stringify(parametros);
    $.ajax({
        url:"http://158.101.114.26:8080/api/Computer/update",
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