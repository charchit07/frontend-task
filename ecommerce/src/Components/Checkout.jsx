// Checkout.jsx
import React, { useState } from 'react';
import {
  Text,
  HStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
} from '@chakra-ui/react';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    address: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const calculateTotalItems = () => {
    // Implement your logic to calculate total items
    // For example, you can fetch the cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const calculateTotalPrice = () => {
    // Implement your logic to calculate total price
    // For example, you can fetch the cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic (you can customize based on your requirements)
    const newFormErrors = {};
    if (!formData.name) {
      newFormErrors.name = 'Name is required';
    }
    if (!formData.address) {
      newFormErrors.address = 'Address is required';
    }
    if (!formData.cardNumber) {
      newFormErrors.cardNumber = 'Card Number is required';
    }
    if (!formData.expirationDate) {
      newFormErrors.expirationDate = 'Expiration Date is required';
    }
    if (!formData.cvv) {
      newFormErrors.cvv = 'CVV is required';
    }

    if (Object.keys(newFormErrors).length > 0) {
      setFormErrors(newFormErrors);
      return;
    }

    // Save form data to local storage
    localStorage.setItem('checkoutFormData', JSON.stringify(formData));

    // Update state to show confirmation
    setIsSubmitted(true);
  };

  return (
    <>
      <Text fontSize="xl" fontWeight="bold" mb="4" textAlign="center">
        Checkout Page
      </Text>
      {isSubmitted ? (
        <Box maxW="600px" width="100%" margin="auto" p="6" boxShadow="lg" borderRadius="md">
          <Text fontSize="xl" fontWeight="bold" mb="4" textAlign="center">
            Order Placed Successfully!
          </Text>
          <Text mb="4">
            Thank you for your order, {formData.name}! Your order has been placed successfully.
          </Text>
          <Text mb="4">
            Order Summary:
          </Text>
          <Box mb="2">
            <Text>Name: {formData.name}</Text>
            <Text>Address: {formData.address}</Text>
            <Text>Card Number: {formData.cardNumber}</Text>
            <Text>Expiration Date: {formData.expirationDate}</Text>
            <Text>CVV: {formData.cvv}</Text>
            <Text>Total Items: {calculateTotalItems()}</Text>
            <Text>Total Price: ${calculateTotalPrice()}</Text>
          </Box>
          {/* You can display additional order details here */}
        </Box>
      ) : (
        <HStack spacing="4" align="start" justify="center" minH="100vh">
          <form
            onSubmit={handleSubmit}
            maxW="600px"
            width="100%"
            margin="auto"
            boxShadow="lg"
            borderRadius="md"
            p="6"
          >
            <FormControl isRequired isInvalid={!!formErrors.name} mb="4">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                width="100%"
              />
              <FormErrorMessage>{formErrors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!formErrors.address} mb="4">
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main St, City"
                width="100%"
              />
              <FormErrorMessage>{formErrors.address}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!formErrors.cardNumber} mb="4">
              <FormLabel>Card Number</FormLabel>
              <Input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                width="100%"
              />
              <FormErrorMessage>{formErrors.cardNumber}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!formErrors.expirationDate} mb="4">
              <FormLabel>Expiration Date</FormLabel>
              <Input
                type="text"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                width="100%"
              />
              <FormErrorMessage>{formErrors.expirationDate}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!formErrors.cvv} mb="4">
              <FormLabel>CVV</FormLabel>
              <Input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                width="100%"
              />
              <FormErrorMessage>{formErrors.cvv}</FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="teal" mt="4" width="100%">
              Place Order
            </Button>
          </form>
        </HStack>
      )}
    </>
  );
};

export default Checkout;
