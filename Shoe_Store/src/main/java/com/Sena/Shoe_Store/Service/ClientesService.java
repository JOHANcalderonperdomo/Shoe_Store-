package com.Sena.Shoe_Store.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Sena.Shoe_Store.Entity.Clientes;
import com.Sena.Shoe_Store.IRepository.IBaseRepository;
import com.Sena.Shoe_Store.IRepository.IClientesRepository;
import com.Sena.Shoe_Store.IService.IClientesService;

@Service
public class ClientesService extends ABaseService<Clientes> implements IClientesService{

	@Autowired
	public IClientesRepository repository;

	@Override
	protected IBaseRepository<Clientes, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}
	
	
	
	
}
