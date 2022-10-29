package co.edu.sena.domain.enumeration;

/**
 * The OrderStatus enumeration.
 */
public enum OrderStatus {
    PLACED("PedidoRealizado"),
    CANCELED("PedidoCancelado");

    private final String value;

    OrderStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
