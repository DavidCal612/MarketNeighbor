package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.Iva;
import co.edu.sena.domain.enumeration.PaymentMethod;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.edu.sena.domain.Payment} entity.
 */
public class PaymentDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate date;

    @NotNull
    private Iva iva;

    @NotNull
    @Size(max = 100)
    private String total;

    @NotNull
    private PaymentMethod payment;

    private OrderDTO order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Iva getIva() {
        return iva;
    }

    public void setIva(Iva iva) {
        this.iva = iva;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public PaymentMethod getPayment() {
        return payment;
    }

    public void setPayment(PaymentMethod payment) {
        this.payment = payment;
    }

    public OrderDTO getOrder() {
        return order;
    }

    public void setOrder(OrderDTO order) {
        this.order = order;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PaymentDTO)) {
            return false;
        }

        PaymentDTO paymentDTO = (PaymentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, paymentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PaymentDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", iva='" + getIva() + "'" +
            ", total='" + getTotal() + "'" +
            ", payment='" + getPayment() + "'" +
            ", order=" + getOrder() +
            "}";
    }
}
