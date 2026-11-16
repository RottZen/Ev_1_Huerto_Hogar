package cl.huertohogar.producto.dto;

import jakarta.validation.constraints.NotNull;

/** delta negativo = descontar stock (compra), positivo = devolver stock. */
public record StockRequest(@NotNull(message = "delta es obligatorio") Integer delta) {
}
