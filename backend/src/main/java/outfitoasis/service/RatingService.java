package outfitoasis.service;

import java.util.List;

import outfitoasis.exception.ProductException;
import outfitoasis.model.Rating;
import outfitoasis.model.User;
import outfitoasis.request.RatingRequest;

public interface RatingService {

    public Rating createRating(RatingRequest req,User user) throws ProductException;

    public List<Rating>getProducRating(Long productId);

}

