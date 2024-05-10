function save() {
    
    try {
        var selectedClienteId = parseInt($("#selected_cliente_id").val());
        if (isNaN(selectedClienteId) || selectedClienteId === null) {
            console.error("ID de cliente no válido");
            return;
        }
        var data = {
            "total": $("#total").val(),
            "fecha_venta": $("#fecha_venta").val(),
            "cliente": {
                "id": selectedClienteId
            },
            'estado': $('#estado').val()
        };
    
        var jsonData = JSON.stringify(data);
        $.ajax({
          url: "http://localhost:9000/Shoe-Store/v1/api/ventas",
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
        url: "http://localhost:9000/Shoe-Store/v1/api/ventas",
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
                      <td>` + item.total + `</td>
                      <td>` + item.fecha_venta + `</td>
                      <td>` + item.cliente.nombre_cliente + `</td>
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

    function loadCliente() {
        console.log("Ejecutando cliente");
        $.ajax({
            url: "http://localhost:9000/Shoe-Store/v1/api/clientes",
            method: "GET",
            dataType: "json",
            success: function (response) {
                if (response.status && Array.isArray(response.data)) {
                    var cities = response.data.map(function (Cliente) {
                        return {
                            label: Cliente.nombre_cliente,
                            value: Cliente.id // Agrega el ID como valor
                        };
                    });
    
                    // Inicializar el autocompletado en el campo de entrada de texto
                    $("#cliente_id").autocomplete({
                        source: function (request, response) {
                            var results = $.ui.autocomplete.filter(cities, request.term);
                            if (!results.length) {
                                results = [{ label: 'No se encontraron resultados', value: null }];
                            }
                            response(results);
                        },
                        select: function (event, ui) {
                            // Al seleccionar un elemento del autocompletado, guarda el ID en un campo oculto
                            $("#selected_cliente_id").val(ui.item.value);
                            // Actualiza el valor del campo de entrada con el nombre de la persona seleccionada
                            $("#cliente_id").val(ui.item.label);
                            console.log("ID de ciudad seleccionada: " + ui.item.value);
                            return false; // Evita la propagación del evento y el formulario de envío
                        }
                    });
                } else {
                    console.error("Error: No se pudo obtener la lista de cliente.");
                }
            },
            error: function (error) {
                // Función que se ejecuta si hay un error en la solicitud
                console.error("Error en la solicitud:", error);
            },
        });
    }

    function deleteById(id) {
      $.ajax({
        url: "http://localhost:9000/Shoe-Store/v1/api/ventas/" + id,
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      }).done(function (result) {
        alert("Registro eliminado con éxito");
        loadData();
      });
    }
  
  
    function update() {
      // Construir el objeto data
      try{
        var data = {
          "total": $("#total").val(),
          "fecha_venta": $("#fecha_venta").val(),
          "cliente": {
            "id": selectedClienteId
        },
          "estado": $("#estado").val(),
        };
        
        var id = $("#id").val();
        var jsonData = JSON.stringify(data);
        $.ajax({
          url: "http://localhost:9000/Shoe-Store/v1/api/ventas/" + id,
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
        alert("Error en actualizar ventas.");
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
        url: "http://localhost:9000/Shoe-Store/v1/api/ventas/" + id,
        method: "GET",
        dataType: "json",
        success: function (response) {
          var data=response.data;
          $("#id").val(data.id);
          $("#total").val(data.total);
          $("#fecha_venta").val(data.fecha_venta);
          $("#cliente_id").val(data.cliente.nombre_cliente);
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
      $("#total").val("");
      $("#fecha_venta").val("");
      $("#cliente_id").val("");
      $("#estado").val("");
      var btnAgregar = $('button[name="btnAgregar"]');
          btnAgregar.text("Agregar");
          btnAgregar.attr("onclick", "save()");
    }
  
  