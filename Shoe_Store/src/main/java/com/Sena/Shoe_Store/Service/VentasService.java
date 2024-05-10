package com.Sena.Shoe_Store.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Sena.Shoe_Store.Entity.Ventas;
import com.Sena.Shoe_Store.IRepository.IBaseRepository;
import com.Sena.Shoe_Store.IRepository.IVentasRepository;
import com.Sena.Shoe_Store.IService.IVentasService;

@Service
public class VentasService extends ABaseService<Ventas> implements IVentasService{

	@Autowired
	public IVentasRepository repository;
	
	@Override
	protected IBaseRepository<Ventas, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}

	
}
