package outfitoasis.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import outfitoasis.exception.ProductException;
import outfitoasis.model.Product;
import outfitoasis.model.Rating;
import outfitoasis.model.User;
import outfitoasis.repository.RatingRepository;
import outfitoasis.request.RatingRequest;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;
    
    @Autowired
    private ProductService productService;

    public Rating createRating(RatingRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());

        Rating rating = new Rating();

        rating.setProduct(product);
        rating.setUser(user);
        rating.setRating(req.getRating());
        rating.setCreatedAt(LocalDateTime.now());

        return ratingRepository.save(rating);
    }

    public List<Rating> getProductRating(Long productId) {
        return ratingRepository.getAllProductsRating(productId);
    }

}
