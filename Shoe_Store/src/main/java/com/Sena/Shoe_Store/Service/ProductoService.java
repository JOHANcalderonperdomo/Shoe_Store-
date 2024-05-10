package com.Sena.Shoe_Store.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Sena.Shoe_Store.Entity.Productos;
import com.Sena.Shoe_Store.IRepository.IBaseRepository;
import com.Sena.Shoe_Store.IRepository.IProductosRepository;
import com.Sena.Shoe_Store.IService.IProductosService;

@Service
public class ProductoService extends ABaseService<Productos> implements IProductosService{

	@Autowired
	public IProductosRepository repository;
	
	@Override
	protected IBaseRepository<Productos, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}

	
}
