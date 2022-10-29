package co.edu.sena.domain.enumeration;

/**
 * The PaymentMethod enumeration.
 */
public enum PaymentMethod {
    CREDIT("Cuotas"),
    CASHPAY("Efectivo");

    private final String value;

    PaymentMethod(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
