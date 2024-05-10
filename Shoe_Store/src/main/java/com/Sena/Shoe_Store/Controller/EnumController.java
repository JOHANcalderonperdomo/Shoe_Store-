package com.Sena.Shoe_Store.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Sena.Shoe_Store.IService.IEnumService;
import com.Sena.Shoe_Store.Utils.Estado;
import com.Sena.Shoe_Store.Utils.Tipo_Identificacion;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/enum")
public class EnumController {

	@Autowired
	private IEnumService service;
	
	@GetMapping("/tipo_identificacion")
	public Tipo_Identificacion[] tipo_Identificacions() {
		return service.getTipo_Identificacions();
	}
	
	@GetMapping("/estado")
	public Estado[] getEstados() {
		return service.getEstados();
	}
	
	
}
