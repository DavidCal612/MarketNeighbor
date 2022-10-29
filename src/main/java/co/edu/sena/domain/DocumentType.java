package co.edu.sena.domain;

import co.edu.sena.domain.enumeration.StateDocument;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A DocumentType.
 */
@Entity
@Table(name = "document_type")
public class DocumentType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 10)
    @Column(name = "initials", length = 10, nullable = false, unique = true)
    private String initials;

    @NotNull
    @Size(max = 60)
    @Column(name = "document_name", length = 60, nullable = false, unique = true)
    private String documentName;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StateDocument status;

    @OneToMany(mappedBy = "documentType")
    @JsonIgnoreProperties(value = { "user", "orders", "documentType" }, allowSetters = true)
    private Set<Client> clients = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public DocumentType id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInitials() {
        return this.initials;
    }

    public DocumentType initials(String initials) {
        this.setInitials(initials);
        return this;
    }

    public void setInitials(String initials) {
        this.initials = initials;
    }

    public String getDocumentName() {
        return this.documentName;
    }

    public DocumentType documentName(String documentName) {
        this.setDocumentName(documentName);
        return this;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public StateDocument getStatus() {
        return this.status;
    }

    public DocumentType status(StateDocument status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(StateDocument status) {
        this.status = status;
    }

    public Set<Client> getClients() {
        return this.clients;
    }

    public void setClients(Set<Client> clients) {
        if (this.clients != null) {
            this.clients.forEach(i -> i.setDocumentType(null));
        }
        if (clients != null) {
            clients.forEach(i -> i.setDocumentType(this));
        }
        this.clients = clients;
    }

    public DocumentType clients(Set<Client> clients) {
        this.setClients(clients);
        return this;
    }

    public DocumentType addClient(Client client) {
        this.clients.add(client);
        client.setDocumentType(this);
        return this;
    }

    public DocumentType removeClient(Client client) {
        this.clients.remove(client);
        client.setDocumentType(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DocumentType)) {
            return false;
        }
        return id != null && id.equals(((DocumentType) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DocumentType{" +
            "id=" + getId() +
            ", initials='" + getInitials() + "'" +
            ", documentName='" + getDocumentName() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
