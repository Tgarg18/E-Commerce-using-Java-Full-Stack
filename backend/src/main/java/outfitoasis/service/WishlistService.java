package outfitoasis.service;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import outfitoasis.exception.ProductException;
import outfitoasis.exception.UserException;
import outfitoasis.model.Product;
import outfitoasis.model.User;
import outfitoasis.repository.UserRepository;

@Service
public class WishlistService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductService productService;

    public void addToWishlist(User user, Long productId) throws UserException, ProductException {
        if (user == null)
            throw new UserException("User not found");
        Product product = productService.findProductById(productId);
        if (product == null)
            throw new ProductException("Product not found");
        if (user.getWishlist() == null)
            user.setWishlist(new HashSet<>());
        user.getWishlist().add(product);
        userRepository.save(user);
    }

    public void removeFromWishlist(User user, Long productId) throws UserException, ProductException {
        if (user == null)
            throw new UserException("User not found");
        Product product = productService.findProductById(productId);
        if (product == null)
            throw new ProductException("Product not found");
        if (user.getWishlist() == null)
            user.setWishlist(new HashSet<>());
        user.getWishlist().remove(product);
        userRepository.save(user);
    }

    public List<Product> getWishlist(User user) throws UserException {
        if (user == null)
            throw new UserException("User not found");
        if (user.getWishlist() == null)
            user.setWishlist(new HashSet<>());
        return user.getWishlist().stream().toList();
    }

    public boolean isProductInWishlist(User user, Long productId) throws UserException, ProductException {
        if (user == null)
            throw new UserException("User not found");
        Product product = productService.findProductById(productId);
        if (product == null)
            throw new ProductException("Product not found");
        if (user.getWishlist() == null)
            user.setWishlist(new HashSet<>());
        return user.getWishlist().contains(product);
    }

    public void clearWishlist(User user) throws UserException {
        if (user == null)
            throw new UserException("User not found");
        if (user.getWishlist() == null)
            user.setWishlist(new HashSet<>());
        user.getWishlist().clear();
        userRepository.save(user);
    }

}
