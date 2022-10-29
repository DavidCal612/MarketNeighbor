package co.edu.sena.domain.enumeration;

/**
 * The Sex enumeration.
 */
public enum Sex {
    MALE("Hombre"),
    FEMALE("Mujer"),
    OTHER("Otro");

    private final String value;

    Sex(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
