package outfitoasis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import outfitoasis.exception.ProductException;
import outfitoasis.exception.UserException;
import outfitoasis.model.User;
import outfitoasis.service.UserService;
import outfitoasis.service.WishlistService;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @Autowired
    private UserService userService;

    @PutMapping("/add/{productId}")
    public ResponseEntity<String> addToWishlist(@RequestHeader("Authorization") String jwt,
            @PathVariable Long productId) throws UserException, ProductException {
        User user = userService.findUserProfileByJwt(jwt);
        if (user == null)
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        wishlistService.addToWishlist(user, productId);
        return new ResponseEntity<>("Product is in wishlist", HttpStatus.OK);
    }

    @PutMapping("/remove/{productId}")
    public ResponseEntity<String> removeFromWishlist(@RequestHeader("Authorization") String jwt,
            @PathVariable Long productId) throws UserException, ProductException {
        User user = userService.findUserProfileByJwt(jwt);
        if (user == null)
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        wishlistService.removeFromWishlist(user, productId);
        return new ResponseEntity<>("Product is not in wishlist", HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity<?> getWishlist(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUserProfileByJwt(jwt);
        if (user == null)
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(wishlistService.getWishlist(user), HttpStatus.OK);
    }

    @GetMapping("/isProductInWishlist/{productId}")
    public ResponseEntity<?> isProductInWishlist(@RequestHeader("Authorization") String jwt,
            @PathVariable Long productId) throws UserException, ProductException {
        User user = userService.findUserProfileByJwt(jwt);
        if (user == null)
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        boolean isInWishlist = wishlistService.isProductInWishlist(user, productId);
        return new ResponseEntity<>(isInWishlist ? "Product is in wishlist" : "Product is not in wishlist",
                HttpStatus.OK);
    }

    @PutMapping("/clear")
    public ResponseEntity<String> clearWishlist(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUserProfileByJwt(jwt);
        if (user == null)
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        wishlistService.clearWishlist(user);
        return new ResponseEntity<>("Wishlist cleared", HttpStatus.OK);
    }

}
