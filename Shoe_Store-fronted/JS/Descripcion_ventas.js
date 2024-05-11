function save() {
    
    try {
        var selectedVentasId = parseInt($("#selected_ventas_id").val());
        if (isNaN(selectedVentasId) || selectedVentasId === null) {
            console.error("ID de ventas no válido");
            return;
        }
        var selectedProductosId = parseInt($("#selected_productos_id").val());
        if (isNaN(selectedProductosId) || selectedProductosId === null) {
            console.error("ID de productos no válido");
            return;
        }
        var data = {
            "cantidad": $("#cantidad").val(),
            "precio": $("#precio").val(),
            "descuento": $("#descuento").val(),
            "sub_total": $("#sub_total").val(),
            "ventas": {
                "id": selectedVentasId
            },
            "productos": {
                "id": selectedProductosId
            },
        };
    
        var jsonData = JSON.stringify(data);
        $.ajax({
          url: "http://localhost:9000/Shoe-Store/v1/api/descripcion_ventas",
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
        url: "http://localhost:9000/Shoe-Store/v1/api/descripcion_ventas",
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
                      <td>` + item.cantidad + `</td>
                      <td>` + item.precio + `</td>
                      <td>` + item.descuento + `</td>
                      <td>` + item.sub_total + `</td>
                      <td>` + item.ventas.cliente.nombre_cliente + `</td>
                      <td>` + item.productos.nombre_producto + `</td>
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

    function loadVentas() {
        console.log("Ejecutando ventas");
        $.ajax({
            url: "http://localhost:9000/Shoe-Store/v1/api/ventas",
            method: "GET",
            dataType: "json",
            success: function (response) {
                if (response.status && Array.isArray(response.data)) {
                    var cities = response.data.map(function (Ventas) {
                        return {
                            label: Ventas.cliente.nombre_cliente,
                            value: Ventas.id // Agrega el ID como valor
                        };
                    });
    
                    // Inicializar el autocompletado en el campo de entrada de texto
                    $("#ventas_id").autocomplete({
                        source: function (request, response) {
                            var results = $.ui.autocomplete.filter(cities, request.term);
                            if (!results.length) {
                                results = [{ label: 'No se encontraron resultados', value: null }];
                            }
                            response(results);
                        },
                        select: function (event, ui) {
                            // Al seleccionar un elemento del autocompletado, guarda el ID en un campo oculto
                            $("#selected_ventas_id").val(ui.item.value);
                            // Actualiza el valor del campo de entrada con el nombre de la persona seleccionada
                            $("#ventas_id").val(ui.item.label);
                            console.log("ID de ciudad seleccionada: " + ui.item.value);
                            return false; // Evita la propagación del evento y el formulario de envío
                        }
                    });
                } else {
                    console.error("Error: No se pudo obtener la lista de ventas.");
                }
            },
            error: function (error) {
                // Función que se ejecuta si hay un error en la solicitud
                console.error("Error en la solicitud:", error);
            },
        });
    }

    function loadProducto() {
        console.log("Ejecutando productos");
        $.ajax({
            url: "http://localhost:9000/Shoe-Store/v1/api/productos",
            method: "GET",
            dataType: "json",
            success: function (response) {
                if (response.status && Array.isArray(response.data)) {
                    var cities = response.data.map(function (Producto) {
                        return {
                            label: Producto.nombre_producto,
                            value: Producto.id // Agrega el ID como valor
                        };
                    });
    
                    // Inicializar el autocompletado en el campo de entrada de texto
                    $("#productos_id").autocomplete({
                        source: function (request, response) {
                            var results = $.ui.autocomplete.filter(cities, request.term);
                            if (!results.length) {
                                results = [{ label: 'No se encontraron resultados', value: null }];
                            }
                            response(results);
                        },
                        select: function (event, ui) {
                            // Al seleccionar un elemento del autocompletado, guarda el ID en un campo oculto
                            $("#selected_productos_id").val(ui.item.value);
                            // Actualiza el valor del campo de entrada con el nombre de la persona seleccionada
                            $("#productos_id").val(ui.item.label);
                            console.log("ID de ciudad seleccionada: " + ui.item.value);
                            return false; // Evita la propagación del evento y el formulario de envío
                        }
                    });
                } else {
                    console.error("Error: No se pudo obtener la lista de productos.");
                }
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
              url: "http://localhost:9000/Shoe-Store/v1/api/descripcion_ventas/" + id,
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
          "cantidad": $("#cantidad").val(),
          "precio": $("#precio").val(),
          "descuento": $("#descuento").val(),
          "sub_total": $("#sub_total").val(),
          "ventas": {
            "id": selectedVentasId
        },
        "productos": {
            "id": selectedProductosId
        },
        };
        
        var id = $("#id").val();
        var jsonData = JSON.stringify(data);
        $.ajax({
          url: "http://localhost:9000/Shoe-Store/v1/api/descripcion_ventas/" + id,
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
        alert("Error en actualizar descripcion_ventas.");
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
        url: "http://localhost:9000/Shoe-Store/v1/api/descripcion_ventas/" + id,
        method: "GET",
        dataType: "json",
        success: function (response) {
          var data=response.data;
          $("#id").val(data.id);
          $("#cantidad").val(data.cantidad);
          $("#precio").val(data.precio);
          $("#descuento").val(data.descuento);
          $("#sub_total").val(data.sub_total);
          $("#ventas_id").val(data.ventas.cliente.nombre_cliente);
          $("#productos_id").val(data.productos.nombre_producto);
    
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
      $("#cantidad").val("");
      $("#precio").val("");
      $("#descuento").val("");
      $("#sub_total").val("");
      $("#cliente_id").val("");
      var btnAgregar = $('button[name="btnAgregar"]');
          btnAgregar.text("Agregar");
          btnAgregar.attr("onclick", "save()");
    }
  
  