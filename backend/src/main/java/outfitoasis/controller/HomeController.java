package outfitoasis.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import outfitoasis.model.Category;
import outfitoasis.model.Product;
import outfitoasis.service.CategoryService;
import outfitoasis.service.ProductService;

@RestController
@RequestMapping("/auth/home")
public class HomeController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductService productService;

    @GetMapping("/getHomePageData")
    public ResponseEntity<HashMap<String, List<Product>>> getHomePageData() {
        HashMap<String, List<Product>> response = new HashMap<>();
        List<Category> categories = categoryService.findAllLevelThreeCategories();
        for (Category category : categories) {
            List<Product> products = productService.findProductByCategory(category.getName());
            Collections.shuffle(products);
            if (products.size() > 10)
                products = products.subList(0, 10);
            response.put(category.getName(), products);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
