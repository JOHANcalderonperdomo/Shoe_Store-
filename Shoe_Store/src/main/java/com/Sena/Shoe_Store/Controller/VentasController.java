package com.Sena.Shoe_Store.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Sena.Shoe_Store.Entity.Ventas;
import com.Sena.Shoe_Store.IService.IVentasService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/ventas")
public class VentasController extends ABaseController<Ventas, IVentasService>{

	protected VentasController(IVentasService service) {
		super(service, "Ventas");
		// TODO Auto-generated constructor stub
	}

	
}
