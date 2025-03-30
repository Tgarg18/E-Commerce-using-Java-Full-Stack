package outfitoasis.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import outfitoasis.model.Category;
import outfitoasis.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    public Category findCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    public List<Category> findAllLevelThreeCategories() {
        return categoryRepository.findAllByLevel(3);
    }

    public List<Category> findAllLevelTwoCategories() {
        return categoryRepository.findAllByLevel(2);
    }

    public List<Category> findAllLevelOneCategories() {
        return categoryRepository.findAllByLevel(1);
    }

}
