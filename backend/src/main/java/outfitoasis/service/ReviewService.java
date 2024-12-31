package outfitoasis.service;

import java.util.List;


import outfitoasis.exception.ProductException;
import outfitoasis.model.Review;
import outfitoasis.model.User;
import outfitoasis.request.ReviewRequest;

public interface ReviewService {

    public Review createReview(ReviewRequest req, User user) throws ProductException;

    public List<Review> getAllReview(Long productId);

}
