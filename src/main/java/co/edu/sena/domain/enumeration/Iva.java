package co.edu.sena.domain.enumeration;

/**
 * The Iva enumeration.
 */
public enum Iva {
    YES("Iva"),
    NO("SinIva");

    private final String value;

    Iva(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
