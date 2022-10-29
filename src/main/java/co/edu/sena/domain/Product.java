package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @NotNull
    @Size(max = 100)
    @Column(name = "reference_product", length = 100, nullable = false, unique = true)
    private String referenceProduct;

    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties(value = { "order", "product" }, allowSetters = true)
    private Set<OrderDetails> orderDetails = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "products" }, allowSetters = true)
    private Category category;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Product id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Product name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getReferenceProduct() {
        return this.referenceProduct;
    }

    public Product referenceProduct(String referenceProduct) {
        this.setReferenceProduct(referenceProduct);
        return this;
    }

    public void setReferenceProduct(String referenceProduct) {
        this.referenceProduct = referenceProduct;
    }

    public Set<OrderDetails> getOrderDetails() {
        return this.orderDetails;
    }

    public void setOrderDetails(Set<OrderDetails> orderDetails) {
        if (this.orderDetails != null) {
            this.orderDetails.forEach(i -> i.setProduct(null));
        }
        if (orderDetails != null) {
            orderDetails.forEach(i -> i.setProduct(this));
        }
        this.orderDetails = orderDetails;
    }

    public Product orderDetails(Set<OrderDetails> orderDetails) {
        this.setOrderDetails(orderDetails);
        return this;
    }

    public Product addOrderDetails(OrderDetails orderDetails) {
        this.orderDetails.add(orderDetails);
        orderDetails.setProduct(this);
        return this;
    }

    public Product removeOrderDetails(OrderDetails orderDetails) {
        this.orderDetails.remove(orderDetails);
        orderDetails.setProduct(null);
        return this;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Product category(Category category) {
        this.setCategory(category);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", referenceProduct='" + getReferenceProduct() + "'" +
            "}";
    }
}
