package outfitoasis.service;

import java.util.List;

import outfitoasis.exception.OrderException;
import outfitoasis.model.Address;
import outfitoasis.model.Order;
import outfitoasis.model.User;

public interface OrderService {
    public Order createOrder(User user,Address shippingAddress);
    
    public Order findOrderById(Long orderId) throws OrderException;

    public List<Order> usersOrderHistory(Long userId);

    public Order placedOrder(Long orderId) throws OrderException;
    
    public Order confirmedOrder(Long orderId) throws OrderException;
    
    public Order shippedOrder(Long orderId) throws OrderException;
    
    public Order deliveredOrder(Long orderId) throws OrderException;

    public Order cancelledOrder(Long orderId) throws OrderException;

    public List<Order> getAllOrders();
    
    public void deleteOrder(Long orderId) throws OrderException;
    
}