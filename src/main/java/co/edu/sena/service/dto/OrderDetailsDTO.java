package co.edu.sena.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.edu.sena.domain.OrderDetails} entity.
 */
public class OrderDetailsDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 50)
    private String price;

    @NotNull
    private Long amount;

    private OrderDTO order;

    private ProductDTO product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public OrderDTO getOrder() {
        return order;
    }

    public void setOrder(OrderDTO order) {
        this.order = order;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderDetailsDTO)) {
            return false;
        }

        OrderDetailsDTO orderDetailsDTO = (OrderDetailsDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, orderDetailsDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OrderDetailsDTO{" +
            "id=" + getId() +
            ", price='" + getPrice() + "'" +
            ", amount=" + getAmount() +
            ", order=" + getOrder() +
            ", product=" + getProduct() +
            "}";
    }
}
