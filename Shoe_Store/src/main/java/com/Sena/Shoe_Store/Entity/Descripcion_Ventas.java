package com.Sena.Shoe_Store.Entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="descripcion_ventas")
public class Descripcion_Ventas extends ABaseEntity{

	@Column(name="cantidad", nullable = false)
	private int cantidad;
	
	@Column(name = "precio", precision = 9, scale = 2, nullable = false)
    private BigDecimal precio;
	
	@Column(name = "descuento", precision = 9, scale = 2, nullable = false)
    private BigDecimal descuento;
	
	@Column(name = "sub_total", precision = 9, scale = 2, nullable = false)
    private BigDecimal sub_total;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name="ventas_id", nullable = false)
	private Ventas ventas;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name="productos_id", nullable = false)
	private Productos productos;

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public BigDecimal getPrecio() {
		return precio;
	}

	public void setPrecio(BigDecimal precio) {
		this.precio = precio;
	}

	public BigDecimal getDescuento() {
		return descuento;
	}

	public void setDescuento(BigDecimal descuento) {
		this.descuento = descuento;
	}

	public BigDecimal getSub_total() {
		return sub_total;
	}

	public void setSub_total(BigDecimal sub_total) {
		this.sub_total = sub_total;
	}

	public Ventas getVentas() {
		return ventas;
	}

	public void setVentas(Ventas ventas) {
		this.ventas = ventas;
	}

	public Productos getProductos() {
		return productos;
	}

	public void setProductos(Productos productos) {
		this.productos = productos;
	}
	
}
