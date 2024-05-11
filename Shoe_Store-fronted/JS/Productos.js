function save() {
    
    try {
        
        var data = {
            "nombre_producto": $("#nombre_producto").val(),
            "descripcion": $("#descripcion").val(),
            "cantidad": $("#cantidad").val(),
            "precio": $("#precio").val(),
            "porcentajeIva": $("#porcentaje_iva").val(),
            "porcentaje_descuento": $("#porcentaje_descuento").val(),
            'estado': $('#estado').val()
        };
    
        var jsonData = JSON.stringify(data);
        $.ajax({
          url: "http://localhost:9000/Shoe-Store/v1/api/productos",
          method: "POST",
          dataType: "json",
          contentType: "application/json",
          data: jsonData,
          success: function(data) {
            alert("Registro agregado con éxito");
            clearData();
            loadData();
  
       
          },
          error: function(error) {
            alert(`Error no se pudo realizar el registro.`);
            //console.log($("#person_id").val());
          },
        });
      } catch (error) {
        console.error("Error obteniendo el producto:", error);
      }
    }
  
    function loadData() {
      $.ajax({
        url: "http://localhost:9000/Shoe-Store/v1/api/productos",
        method: "GET",
        dataType: "json",
        success: function (response) {
          console.log(response.data);
          var html = "";
          var data = response.data;
          data.forEach(function (item) {
            // Construir el HTML para cada objeto
            if (!item.deletedAt) {
            html +=
              `<tr>
                      <td>` + item.nombre_producto + `</td>
                      <td>` + item.descripcion + `</td>
                      <td>` + item.cantidad + `</td>
                      <td>` + item.precio + `</td>
                      <td>` + item.porcentajeIva + `</td>
                      <td>` + item.porcentaje_descuento + `</td>
                      <td>` + item.estado + `</td>
                      <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="findById(${item.id})"> <img src="../assets/icon/pencil-square.svg" > </button>
                      <button type="button" class="btn btn-secundary" onclick="deleteById(${item.id})"> <img src="../assets/icon/trash3.svg" > </button></td>
                  </tr>`;
            }
          });
    
          $("#resultData").html(html);
        },
        error: function (error) {
          // Función que se ejecuta si hay un error en la solicitud
          console.error("Error en la solicitud:", error);
        },
      });
    }
    
    function loadEstado() {
        $.ajax({
            url: "http://localhost:9000/Shoe-Store/v1/api/enum/estado",
            method: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response);
                var html = "";
                response.forEach(function (item) {
                    // Construir el HTML para cada objeto
                    html += `<option value="${item}">${item}</option>`;
                });
                $("#estado").html(html);
    
            },
            error: function (error) {
                // Función que se ejecuta si hay un error en la solicitud
                console.error("Error en la solicitud:", error);
            },
        });
    }

    function deleteById(id) {
      // Mostrar confirmación al usuario
      if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
          // Si el usuario confirma, realizar la eliminación
          $.ajax({
              url: "http://localhost:9000/Shoe-Store/v1/api/productos/" + id,
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
              },
          }).done(function (result) {
              alert("Registro eliminado con éxito");
              loadData();
          }).fail(function (error) {
              // Manejar errores en caso de que ocurran
              console.error("Error al eliminar el registro:", error);
              alert("Error al eliminar el registro. Por favor, inténtalo de nuevo.");
          });
      } else {
          // Si el usuario cancela, no hacer nada
          console.log("Eliminación cancelada por el usuario");
      }
  }
  
  
    function update() {
      // Construir el objeto data
      try{
        var data = {
          "nombre_producto": $("#nombre_producto").val(),
          "descripcion": $("#descripcion").val(),
          "cantidad": $("#cantidad").val(),
          "precio": $("#precio").val(),
          "porcentajeIva": $("#porcentaje_iva").val(),
          "porcentaje_descuento": $("#porcentaje_descuento").val(),
          "estado": $("#estado").val(),
        };
        
        var id = $("#id").val();
        var jsonData = JSON.stringify(data);
        $.ajax({
          url: "http://localhost:9000/Shoe-Store/v1/api/productos/" + id,
          data: jsonData,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }).done(function (result) {
          alert("Registro actualizado con éxito");
          loadData();
          clearData();
      
          //actualzar boton
          var btnAgregar = $('button[name="btnAgregar"]');
          btnAgregar.text("Agregar");
          btnAgregar.attr("onclick", "save()");
        });
      }catch (error) {
        alert("Error en actualizar productos.");
        console.error("Error en la solicitud:", error);
        //actualzar boton
        loadData();
        clearData();
        var btnAgregar = $('button[name="btnAgregar"]');
        btnAgregar.text("Agregar");
        btnAgregar.attr("onclick", "save()");
      }
    }
  
    function findById(id) {
      $.ajax({
        url: "http://localhost:9000/Shoe-Store/v1/api/productos/" + id,
        method: "GET",
        dataType: "json",
        success: function (response) {
          var data=response.data;
          $("#id").val(data.id);
          $("#nombre_producto").val(data.nombre_producto);
          $("#descripcion").val(data.descripcion);
          $("#cantidad").val(data.cantidad);
          $("#precio").val(data.precio);
          $("#porcentaje_iva").val(data.porcentajeIva);
          $("#porcentaje_descuento").val(data.porcentaje_descuento);
          $("#estado").val(data.estado);
    
          //Cambiar boton.
          var btnAgregar = $('button[name="btnAgregar"]');
          btnAgregar.text("Actualizar");
          btnAgregar.attr("onclick", "update()");
        },
        error: function (error) {
          // Función que se ejecuta si hay un error en la solicitud
          console.error("Error en la solicitud:", error);
        },
      });
    }
    
  
    function clearData() {
      $("#id").val("");
      $("#nombre_producto").val("");
      $("#descripcion").val("");
      $("#cantidad").val("");
      $("#precio").val("");
      $("#porcentaje_iva").val("");
      $("#porcentaje_descuento").val("");
      $("#ciudad").val("");
      $("#estado").val("");
      var btnAgregar = $('button[name="btnAgregar"]');
          btnAgregar.text("Agregar");
          btnAgregar.attr("onclick", "save()");
    }
  
  