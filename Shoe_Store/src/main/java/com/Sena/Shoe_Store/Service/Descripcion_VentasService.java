package com.Sena.Shoe_Store.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Sena.Shoe_Store.Entity.Descripcion_Ventas;
import com.Sena.Shoe_Store.IRepository.IBaseRepository;
import com.Sena.Shoe_Store.IRepository.IDescripcion_VentasRepository;
import com.Sena.Shoe_Store.IService.IDescripcion_VentasService;

@Service
public class Descripcion_VentasService extends ABaseService<Descripcion_Ventas> implements IDescripcion_VentasService{

	@Autowired
	public IDescripcion_VentasRepository repository;
	
	@Override
	protected IBaseRepository<Descripcion_Ventas, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}

	
}
