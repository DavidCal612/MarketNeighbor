package co.edu.sena.service.mapper;

import co.edu.sena.domain.Client;
import co.edu.sena.domain.Order;
import co.edu.sena.service.dto.ClientDTO;
import co.edu.sena.service.dto.OrderDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Order} and its DTO {@link OrderDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderMapper extends EntityMapper<OrderDTO, Order> {
    @Mapping(target = "client", source = "client", qualifiedByName = "clientDocumentNumber")
    OrderDTO toDto(Order s);

    @Named("clientDocumentNumber")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "documentNumber", source = "documentNumber")
    ClientDTO toDtoClientDocumentNumber(Client client);
}
