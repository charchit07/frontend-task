import React, { useState, useEffect } from 'react';
import { Text, Button, Image, Card, Grid, GridItem, VStack, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart items from local storage on component mount
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems.map(item => ({ ...item, quantity: item.quantity || 1 })));
  }, []);

  const handleRemoveFromCart = (productId) => {
    // Use window.confirm to show a confirmation pop-up
    const shouldRemove = window.confirm('Are you sure you want to remove this item from the cart?');

    if (shouldRemove) {
      // Remove the item from the cart
      const updatedCartItems = cartItems.filter((item) => item.id !== productId);
      setCartItems(updatedCartItems);
      // Update local storage
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <VStack spacing="4" align="stretch">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Shopping Cart
      </Text>
      {cartItems.length > 0 && (
        <HStack spacing="4" justify="flex-end" w="100%">
          <VStack
            align="start"
            spacing="2"
            p="4"
            borderRadius="lg"
            boxShadow="base"
            bg="white"
          >
            <Text fontWeight="bold" fontSize="lg">
              Cart Summary:
            </Text>
            <Text fontSize="md">Total Items: {calculateTotalItems()}</Text>
            <Text fontSize="md">Total Price: ${calculateTotalPrice()}</Text>
          </VStack>
          {/* <Button
            as={Link}
            to="/checkout"
            colorScheme="teal"
            borderRadius="lg"
            boxShadow="base"
          >
            Checkout
          </Button> */}
        </HStack>
      )}
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {cartItems.map((item) => (
            <GridItem key={item.id}>
              <Card
                maxW="sm"
                borderRadius="lg"
                overflow="hidden"
                p="4"
                boxShadow="base"
              >
                <Image src={item.image} alt={item.title} boxSize="200px" objectFit="cover" mb="4" />
                <Text fontWeight="semibold" fontSize="lg" mb="2">
                  {item.title}
                </Text>
                <Text>${item.price} (Quantity: {item.quantity || 1})</Text>
                <Button
                  onClick={() => handleRemoveFromCart(item.id)}
                  mt="1"
                  colorScheme="red"
                  size="sm"
                  borderRadius="lg"
                >
                  Remove from Cart
                </Button>
              </Card>
            </GridItem>
          ))}
        </Grid>
      )}
    </VStack>
  );
};

export default Cart;
