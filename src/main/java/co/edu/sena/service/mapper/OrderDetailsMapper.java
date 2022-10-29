package co.edu.sena.service.mapper;

import co.edu.sena.domain.Order;
import co.edu.sena.domain.OrderDetails;
import co.edu.sena.domain.Product;
import co.edu.sena.service.dto.OrderDTO;
import co.edu.sena.service.dto.OrderDetailsDTO;
import co.edu.sena.service.dto.ProductDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link OrderDetails} and its DTO {@link OrderDetailsDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderDetailsMapper extends EntityMapper<OrderDetailsDTO, OrderDetails> {
    @Mapping(target = "order", source = "order", qualifiedByName = "orderId")
    @Mapping(target = "product", source = "product", qualifiedByName = "productName")
    OrderDetailsDTO toDto(OrderDetails s);

    @Named("orderId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    OrderDTO toDtoOrderId(Order order);

    @Named("productName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    ProductDTO toDtoProductName(Product product);
}
