package outfitoasis.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import outfitoasis.exception.ProductException;
import outfitoasis.model.Product;
import outfitoasis.model.Review;
import outfitoasis.model.User;
import outfitoasis.repository.ReviewRepository;
import outfitoasis.request.ReviewRequest;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private ProductService productService;

    public Review createReview(ReviewRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());

        Review review = new Review();

        review.setUser(user);
        review.setProduct(product);
        review.setReview(req.getReview());
        review.setRating(req.getRating());
        review.setCreatedAt(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    public List<Review> getAllReview(Long productId) {
        return reviewRepository.getAllProductsReviews(productId);
    }

}
