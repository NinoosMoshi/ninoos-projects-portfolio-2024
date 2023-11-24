package com.ninos.service.customer.cart;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ninos.model.dto.AddProductInCartDTO;
import com.ninos.model.entity.CartItems;
import com.ninos.model.entity.Order;
import com.ninos.model.entity.Product;
import com.ninos.model.entity.User;
import com.ninos.model.enums.OrderStatus;
import com.ninos.repository.CartItemsRepository;
import com.ninos.repository.OrderRepository;
import com.ninos.repository.ProductRepository;
import com.ninos.repository.UserRepository;

@RequiredArgsConstructor
@Service
public class CartServiceImpl implements CartService{

    private final CartItemsRepository cartItemsRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;


    @Override
    public ResponseEntity<?> addProductToCart(AddProductInCartDTO addProductInCartDTO){
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductInCartDTO.getUserId(), OrderStatus.Pending);
        Optional<CartItems> optionalCartItems = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                addProductInCartDTO.getProductId(), activeOrder.getId(), addProductInCartDTO.getUserId());

        if(optionalCartItems.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }else{
            Optional<Product> optionalProduct = productRepository.findById(addProductInCartDTO.getProductId());
            Optional<User> optionalUser = userRepository.findById(addProductInCartDTO.getUserId());

            if(optionalProduct.isPresent() && optionalUser.isPresent()){
                CartItems cart = new CartItems();
                cart.setProduct(optionalProduct.get());
                cart.setPrice(optionalProduct.get().getPrice());
                cart.setQuantity(1L);
                cart.setUser(optionalUser.get());
                cart.setOrder(activeOrder);

                CartItems updatedCart = cartItemsRepository.save(cart);

                activeOrder.setTotalAmount(activeOrder.getTotalAmount() + cart.getPrice());
                activeOrder.setAmount(activeOrder.getAmount() + cart.getPrice());
                activeOrder.getCardItems().add(cart);

                orderRepository.save(activeOrder);
                return ResponseEntity.status(HttpStatus.CREATED).body(cart);

            }
            else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or product not found");
            }
        }

    }






}
