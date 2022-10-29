package co.edu.sena.repository;

import co.edu.sena.domain.OrderDetails;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the OrderDetails entity.
 */
@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
    default Optional<OrderDetails> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<OrderDetails> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<OrderDetails> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct orderDetails from OrderDetails orderDetails left join fetch orderDetails.product",
        countQuery = "select count(distinct orderDetails) from OrderDetails orderDetails"
    )
    Page<OrderDetails> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct orderDetails from OrderDetails orderDetails left join fetch orderDetails.product")
    List<OrderDetails> findAllWithToOneRelationships();

    @Query("select orderDetails from OrderDetails orderDetails left join fetch orderDetails.product where orderDetails.id =:id")
    Optional<OrderDetails> findOneWithToOneRelationships(@Param("id") Long id);
}
