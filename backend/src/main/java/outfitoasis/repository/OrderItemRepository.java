package outfitoasis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import outfitoasis.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
