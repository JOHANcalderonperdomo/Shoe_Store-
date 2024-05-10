package com.Sena.Shoe_Store.Entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="productos")
public class Productos extends ABaseEntity{

	@Column(name="nombre_producto", length = 45, nullable = false)
	private String nombre_producto;
	
	@Column(name="descripcion", length = 45, nullable = false)
	private String descripcion;
	
	@Column(name="cantidad", nullable = false)
	private int cantidad;
	
	@Column(name = "precio", precision = 9, scale = 2, nullable = false)
    private BigDecimal precio;
	
	@Column(name = "porcentaje_iva", columnDefinition = "int(2)", nullable = false)
    private int porcentajeIva;
	
	@Column(name = "porcentaje_descuento", columnDefinition = "int(2)", nullable = false)
    private int porcentaje_descuento;
	
	@Column(name="estado", length = 30, nullable = false)
	private String estado;

	public String getNombre_producto() {
		return nombre_producto;
	}

	public void setNombre_producto(String nombre_producto) {
		this.nombre_producto = nombre_producto;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

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

	public int getPorcentajeIva() {
		return porcentajeIva;
	}

	public void setPorcentajeIva(int porcentajeIva) {
		this.porcentajeIva = porcentajeIva;
	}

	public int getPorcentaje_descuento() {
		return porcentaje_descuento;
	}

	public void setPorcentaje_descuento(int porcentaje_descuento) {
		this.porcentaje_descuento = porcentaje_descuento;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	
}
