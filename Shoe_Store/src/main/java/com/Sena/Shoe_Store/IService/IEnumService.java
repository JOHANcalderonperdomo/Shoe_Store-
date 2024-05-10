package com.Sena.Shoe_Store.IService;

import com.Sena.Shoe_Store.Utils.Estado;
import com.Sena.Shoe_Store.Utils.Tipo_Identificacion;

public interface IEnumService {

	Tipo_Identificacion[] getTipo_Identificacions();
	Estado[] getEstados();
	
}
