package outfitoasis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import outfitoasis.exception.ProductException;
import outfitoasis.exception.UserException;
import outfitoasis.model.Cart;
import outfitoasis.model.User;
import outfitoasis.request.AddItemRequest;
import outfitoasis.response.ApiResponse;
import outfitoasis.service.CartService;
import outfitoasis.service.UserService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    
    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt)throws UserException{
        User user = userService.findUserProfileByJwt(jwt);
        Cart cart = cartService.findUserCart(user.getId());

        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    } 

    @PutMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestHeader("Authorization") String jwt, @RequestBody AddItemRequest req) throws UserException,ProductException{
        User user = userService.findUserProfileByJwt(jwt);
        cartService.addCartItem(user.getId(), req);

        ApiResponse response = new ApiResponse();
        response.setMessage("Item added to cart successfully");
        response.setStatus(true);
        return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
    }
}
