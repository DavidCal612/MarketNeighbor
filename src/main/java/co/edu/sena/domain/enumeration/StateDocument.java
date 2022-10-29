package co.edu.sena.domain.enumeration;

/**
 * The StateDocument enumeration.
 */
public enum StateDocument {
    ACTIVE("Activo"),
    INACTIVE("Inactivo");

    private final String value;

    StateDocument(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
