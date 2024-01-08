import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Button,
  Center,
  Spinner,
  Alert,
  AlertIcon,
  Card,
} from '@chakra-ui/react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://fakestoreapi.com/products?page=${currentPage}`);
      const data = response.data;

      setProducts((prevProducts) => [...prevProducts, ...data]);
      setHasMore(data.length > 0);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = (productId) => {
    // Get the existing cart items from local storage or initialize an empty array
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the product is already in the cart
    const isProductInCart = existingCartItems.some((item) => item.id === productId);

    if (!isProductInCart) {
      // If the product is not in the cart, add it
      const productToAdd = products.find((product) => product.id === productId);
      if (productToAdd) {
        const updatedCartItems = [...existingCartItems, productToAdd];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        alert('Product added to cart!');
      }
    } else {
      alert('Product is already in the cart!');
    }
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchProducts();
  };

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} marginLeft={10} marginTop={5}>
        {products.map((product) => (
          <Card
            key={product.id}
            maxW="sm"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px"// Unique box shadow
          >
            <Image maxW="40%" padding="5px" h="auto" src={product.image} alt={product.title} />
            <Box p="4">
              <Text fontWeight="semibold" fontSize="lg" mb="2">
                {product.title}
              </Text>
              <Text>${product.price}</Text>
              <Button mt="2" onClick={() => handleAddToCart(product.id)}>
                Add to Cart
              </Button>
            </Box>
          </Card>
        ))}
      </SimpleGrid>

      {isLoading && (
        <Center mt="4">
          <Spinner />
        </Center>
      )}

      {error && (
        <Alert status="error" mt="4">
          <AlertIcon />
          {error}
          <Button ml="2" onClick={handleRetry}>
            Retry
          </Button>
        </Alert>
      )}

      {hasMore && !isLoading && !error && (
        <Center mt="4">
          <Button onClick={handleLoadMore}>Load More</Button>
        </Center>
      )}
    </Box>
  );
};

export default ProductList;
