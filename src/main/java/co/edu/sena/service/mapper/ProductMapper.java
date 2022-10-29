package co.edu.sena.service.mapper;

import co.edu.sena.domain.Category;
import co.edu.sena.domain.Product;
import co.edu.sena.service.dto.CategoryDTO;
import co.edu.sena.service.dto.ProductDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Product} and its DTO {@link ProductDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {
    @Mapping(target = "category", source = "category", qualifiedByName = "categoryId")
    ProductDTO toDto(Product s);

    @Named("categoryId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CategoryDTO toDtoCategoryId(Category category);
}
