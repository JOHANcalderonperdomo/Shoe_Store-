package com.Sena.Shoe_Store.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Sena.Shoe_Store.Entity.Descripcion_Ventas;
import com.Sena.Shoe_Store.IService.IDescripcion_VentasService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/descripcion_ventas")
public class Descripcion_VentasController extends ABaseController<Descripcion_Ventas, IDescripcion_VentasService>{

	protected Descripcion_VentasController(IDescripcion_VentasService service) {
		super(service, "Descripcion_Ventas");
		// TODO Auto-generated constructor stub
	}

	
}
