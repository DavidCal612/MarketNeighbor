package co.edu.sena.service.mapper;

import co.edu.sena.domain.Client;
import co.edu.sena.domain.DocumentType;
import co.edu.sena.domain.User;
import co.edu.sena.service.dto.ClientDTO;
import co.edu.sena.service.dto.DocumentTypeDTO;
import co.edu.sena.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Client} and its DTO {@link ClientDTO}.
 */
@Mapper(componentModel = "spring")
public interface ClientMapper extends EntityMapper<ClientDTO, Client> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    @Mapping(target = "documentType", source = "documentType", qualifiedByName = "documentTypeDocumentName")
    ClientDTO toDto(Client s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);

    @Named("documentTypeDocumentName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "documentName", source = "documentName")
    DocumentTypeDTO toDtoDocumentTypeDocumentName(DocumentType documentType);
}
