package com.Sena.Shoe_Store.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Sena.Shoe_Store.Entity.Clientes;
import com.Sena.Shoe_Store.IService.IClientesService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/clientes")
public class ClientesController extends ABaseController<Clientes, IClientesService>{

	protected ClientesController(IClientesService service) {
		super(service, "Clientes");
		// TODO Auto-generated constructor stub
	}

	
}


