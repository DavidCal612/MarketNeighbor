package co.edu.sena.domain;

import co.edu.sena.domain.enumeration.Iva;
import co.edu.sena.domain.enumeration.PaymentMethod;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Payment.
 */
@Entity
@Table(name = "payment")
public class Payment implements Serializable {

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
    @Column(name = "iva", nullable = false)
    private Iva iva;

    @NotNull
    @Size(max = 100)
    @Column(name = "total", length = 100, nullable = false)
    private String total;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "payment", nullable = false)
    private PaymentMethod payment;

    @JsonIgnoreProperties(value = { "orderDetails", "client" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Order order;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Payment id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Payment date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Iva getIva() {
        return this.iva;
    }

    public Payment iva(Iva iva) {
        this.setIva(iva);
        return this;
    }

    public void setIva(Iva iva) {
        this.iva = iva;
    }

    public String getTotal() {
        return this.total;
    }

    public Payment total(String total) {
        this.setTotal(total);
        return this;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public PaymentMethod getPayment() {
        return this.payment;
    }

    public Payment payment(PaymentMethod payment) {
        this.setPayment(payment);
        return this;
    }

    public void setPayment(PaymentMethod payment) {
        this.payment = payment;
    }

    public Order getOrder() {
        return this.order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Payment order(Order order) {
        this.setOrder(order);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Payment)) {
            return false;
        }
        return id != null && id.equals(((Payment) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Payment{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", iva='" + getIva() + "'" +
            ", total='" + getTotal() + "'" +
            ", payment='" + getPayment() + "'" +
            "}";
    }
}
