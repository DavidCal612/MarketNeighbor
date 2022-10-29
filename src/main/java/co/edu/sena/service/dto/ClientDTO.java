package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.Sex;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.edu.sena.domain.Client} entity.
 */
public class ClientDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 200)
    private String address;

    @NotNull
    @Size(max = 60)
    private String phoneNumber;

    @NotNull
    @Size(max = 60)
    private String firstName;

    @Size(max = 60)
    private String secondName;

    @NotNull
    @Size(max = 60)
    private String lastName;

    @Size(max = 60)
    private String secondLastName;

    @NotNull
    private Sex sexType;

    @NotNull
    @Size(max = 200)
    private String email;

    @NotNull
    @Size(max = 100)
    private String documentNumber;

    private UserDTO user;

    private DocumentTypeDTO documentType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSecondLastName() {
        return secondLastName;
    }

    public void setSecondLastName(String secondLastName) {
        this.secondLastName = secondLastName;
    }

    public Sex getSexType() {
        return sexType;
    }

    public void setSexType(Sex sexType) {
        this.sexType = sexType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public DocumentTypeDTO getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentTypeDTO documentType) {
        this.documentType = documentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClientDTO)) {
            return false;
        }

        ClientDTO clientDTO = (ClientDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, clientDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ClientDTO{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", secondName='" + getSecondName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", secondLastName='" + getSecondLastName() + "'" +
            ", sexType='" + getSexType() + "'" +
            ", email='" + getEmail() + "'" +
            ", documentNumber='" + getDocumentNumber() + "'" +
            ", user=" + getUser() +
            ", documentType=" + getDocumentType() +
            "}";
    }
}
