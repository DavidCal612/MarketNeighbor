package co.edu.sena.domain;

import co.edu.sena.domain.enumeration.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Order.
 */
@Entity
@Table(name = "marketneighbor_order")
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private OrderStatus status;

    @NotNull
    @Size(max = 100)
    @Column(name = "total", length = 100, nullable = false)
    private String total;

    @OneToMany(mappedBy = "order")
    @JsonIgnoreProperties(value = { "order", "product" }, allowSetters = true)
    private Set<OrderDetails> orderDetails = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "user", "orders", "documentType" }, allowSetters = true)
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Order id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Order date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public OrderStatus getStatus() {
        return this.status;
    }

    public Order status(OrderStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getTotal() {
        return this.total;
    }

    public Order total(String total) {
        this.setTotal(total);
        return this;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public Set<OrderDetails> getOrderDetails() {
        return this.orderDetails;
    }

    public void setOrderDetails(Set<OrderDetails> orderDetails) {
        if (this.orderDetails != null) {
            this.orderDetails.forEach(i -> i.setOrder(null));
        }
        if (orderDetails != null) {
            orderDetails.forEach(i -> i.setOrder(this));
        }
        this.orderDetails = orderDetails;
    }

    public Order orderDetails(Set<OrderDetails> orderDetails) {
        this.setOrderDetails(orderDetails);
        return this;
    }

    public Order addOrderDetails(OrderDetails orderDetails) {
        this.orderDetails.add(orderDetails);
        orderDetails.setOrder(this);
        return this;
    }

    public Order removeOrderDetails(OrderDetails orderDetails) {
        this.orderDetails.remove(orderDetails);
        orderDetails.setOrder(null);
        return this;
    }

    public Client getClient() {
        return this.client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Order client(Client client) {
        this.setClient(client);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return id != null && id.equals(((Order) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", total='" + getTotal() + "'" +
            "}";
    }
}
