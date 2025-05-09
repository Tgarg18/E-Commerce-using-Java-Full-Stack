package outfitoasis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import outfitoasis.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    public Category findByName(String name);

    @Query("SELECT c from Category c WHERE c.name=:name AND c.parentCategory.name =:parentCategoryName ")
    public Category findByNameAndParent(@Param("name") String name,
            @Param("parentCategoryName") String parentCategoryName);

    public List<Category> findAllByLevel(int level);

    public List<Category> findAllByParentCategoryId(Long parentCategoryId);
}
