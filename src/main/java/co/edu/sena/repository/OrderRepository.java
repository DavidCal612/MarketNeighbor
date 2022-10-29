package co.edu.sena.repository;

import co.edu.sena.domain.Order;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Order entity.
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    default Optional<Order> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Order> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Order> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct marketneighborOrder from Order marketneighborOrder left join fetch marketneighborOrder.client",
        countQuery = "select count(distinct marketneighborOrder) from Order marketneighborOrder"
    )
    Page<Order> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct marketneighborOrder from Order marketneighborOrder left join fetch marketneighborOrder.client")
    List<Order> findAllWithToOneRelationships();

    @Query(
        "select marketneighborOrder from Order marketneighborOrder left join fetch marketneighborOrder.client where marketneighborOrder.id =:id"
    )
    Optional<Order> findOneWithToOneRelationships(@Param("id") Long id);
}
