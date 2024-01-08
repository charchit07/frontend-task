import React from "react";
import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex
      justifyContent={"space-evenly"}
      backgroundColor={"gray"}
      fontWeight={"bold"}
      padding={"20px"}
    >
      <Link to={"/"}>Product</Link>
      <Link to={"/cart"}>Cart</Link>
      <Link to={"/checkout"}>Checkout</Link>


    </Flex>
  );
};

export default Navbar;
