function save() {
    
    try {
        
        var data = {
            "tipo_identificacion": $("#tipo_identificacion").val(),
            "identificacion": $("#identificacion").val(),
            "nombre_cliente": $("#nombre_cliente").val(),
            "apellido_cliente": $("#apellido_cliente").val(),
            "telefono": $("#telefono").val(),
            "direccion": $("#direccion").val(),
            "ciudad": $("#ciudad").val(),
            'estado': $('#estado').val()
        };
    
        var jsonData = JSON.stringify(data);
        $.ajax({
          url: "http://localhost:9000/Shoe-Store/v1/api/clientes",
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
        console.error("Error obteniendo el cliente:", error);
      }
    }
  
    function loadData() {
      $.ajax({
        url: "http://localhost:9000/Shoe-Store/v1/api/clientes",
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
                      <td>` + item.tipo_identificacion + `</td>
                      <td>` + item.identificacion + `</td>
                      <td>` + item.nombre_cliente + `</td>
                      <td>` + item.apellido_cliente + `</td>
                      <td>` + item.telefono + `</td>
                      <td>` + item.direccion + `</td>
                      <td>` + item.ciudad + `</td>
                      <td>` + item.estado + `</td>
                      <td> <button type="button" class="btn btn-primary" onclick="findById(${item.id})"> <img src="../assets/icon/pencil-square.svg" > </button>
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

    function loadTipoDocumento() {
        $.ajax({
            url: "http://localhost:9000/Shoe-Store/v1/api/enum/tipo_identificacion",
            method: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response);
                var html = "";
                response.forEach(function (item) {
                    // Construir el HTML para cada objeto
                    html += `<option value="${item}">${item}</option>`;
                });
                $("#tipo_identificacion").html(html);
    
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
              url: "http://localhost:9000/Shoe-Store/v1/api/clientes/" + id,
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
          "tipo_identificacion": $("#tipo_identificacion").val(),
          "identificacion": $("#identificacion").val(),
          "nombre_cliente": $("#nombre_cliente").val(),
          "apellido_cliente": $("#apellido_cliente").val(),
          "telefono": $("#telefono").val(),
          "direccion": $("#direccion").val(),
          "ciudad": $("#ciudad").val(),
          "estado": $("#estado").val(),
        };
        
        var id = $("#id").val();
        var jsonData = JSON.stringify(data);
        $.ajax({
          url: "http://localhost:9000/Shoe-Store/v1/api/clientes/" + id,
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
        alert("Error en actualizar clientes.");
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
        url: "http://localhost:9000/Shoe-Store/v1/api/clientes/" + id,
        method: "GET",
        dataType: "json",
        success: function (response) {
          var data=response.data;
          $("#id").val(data.id);
          $("#tipo_identificacion").val(data.tipo_identificacion);
          $("#identificacion").val(data.identificacion);
          $("#nombre_cliente").val(data.nombre_cliente);
          $("#apellido_cliente").val(data.apellido_cliente);
          $("#telefono").val(data.telefono);
          $("#direccion").val(data.direccion);
          $("#ciudad").val(data.ciudad);
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
      $("#tipo_identificacion").val("");
      $("#identificacion").val("");
      $("#nombre_cliente").val("");
      $("#apellido_cliente").val("");
      $("#telefono").val("");
      $("#direccion").val("");
      $("#ciudad").val("");
      $("#estado").val("");
      var btnAgregar = $('button[name="btnAgregar"]');
          btnAgregar.text("Agregar");
          btnAgregar.attr("onclick", "save()");
    }
  
  