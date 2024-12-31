package outfitoasis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import outfitoasis.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
