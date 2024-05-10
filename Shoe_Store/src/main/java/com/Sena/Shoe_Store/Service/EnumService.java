package com.Sena.Shoe_Store.Service;

import org.springframework.stereotype.Service;

import com.Sena.Shoe_Store.IService.IEnumService;
import com.Sena.Shoe_Store.Utils.Estado;
import com.Sena.Shoe_Store.Utils.Tipo_Identificacion;

@Service
public class EnumService implements IEnumService{

	@Override
	public Tipo_Identificacion[] getTipo_Identificacions() {
		// TODO Auto-generated method stub
		return Tipo_Identificacion.values();
	}

	@Override
	public Estado[] getEstados() {
		// TODO Auto-generated method stub
		return Estado.values();
	}

	
}
