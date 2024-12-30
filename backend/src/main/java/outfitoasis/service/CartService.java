package outfitoasis.service;

import outfitoasis.exception.ProductException;
import outfitoasis.model.Cart;
import outfitoasis.model.User;
import outfitoasis.request.AddItemRequest;

public interface CartService {

    public Cart createCart(User user);

    public String addCartItem(Long userId, AddItemRequest req) throws ProductException;

    public Cart findUserCart(Long userId);

}
