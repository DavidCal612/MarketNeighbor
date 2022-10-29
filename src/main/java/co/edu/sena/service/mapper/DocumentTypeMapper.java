package co.edu.sena.service.mapper;

import co.edu.sena.domain.DocumentType;
import co.edu.sena.service.dto.DocumentTypeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link DocumentType} and its DTO {@link DocumentTypeDTO}.
 */
@Mapper(componentModel = "spring")
public interface DocumentTypeMapper extends EntityMapper<DocumentTypeDTO, DocumentType> {}
