package com.Sena.Shoe_Store.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Sena.Shoe_Store.Entity.Productos;
import com.Sena.Shoe_Store.IService.IProductosService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/productos")
public class ProductosController extends ABaseController<Productos, IProductosService> {

	protected ProductosController(IProductosService service) {
		super(service, "Productos");
		// TODO Auto-generated constructor stub
	}

	
}
