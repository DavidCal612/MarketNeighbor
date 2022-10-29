package co.edu.sena.service;

import co.edu.sena.service.dto.OrderDetailsDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.OrderDetails}.
 */
public interface OrderDetailsService {
    /**
     * Save a orderDetails.
     *
     * @param orderDetailsDTO the entity to save.
     * @return the persisted entity.
     */
    OrderDetailsDTO save(OrderDetailsDTO orderDetailsDTO);

    /**
     * Updates a orderDetails.
     *
     * @param orderDetailsDTO the entity to update.
     * @return the persisted entity.
     */
    OrderDetailsDTO update(OrderDetailsDTO orderDetailsDTO);

    /**
     * Partially updates a orderDetails.
     *
     * @param orderDetailsDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<OrderDetailsDTO> partialUpdate(OrderDetailsDTO orderDetailsDTO);

    /**
     * Get all the orderDetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<OrderDetailsDTO> findAll(Pageable pageable);

    /**
     * Get all the orderDetails with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<OrderDetailsDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" orderDetails.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OrderDetailsDTO> findOne(Long id);

    /**
     * Delete the "id" orderDetails.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
