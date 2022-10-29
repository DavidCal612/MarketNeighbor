package co.edu.sena.domain.enumeration;

/**
 * The Categories enumeration.
 */
public enum Categories {
    JEYEWELLS("Joyas"),
    RINGS("Anillos"),
    PLATE("Plata"),
    GOLD("Oro");

    private final String value;

    Categories(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
