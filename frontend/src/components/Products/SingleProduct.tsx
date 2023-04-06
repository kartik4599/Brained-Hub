import React from "react";
import {
  Card,
  Text,
  Image,
  Heading,
  Stack,
  CardBody,
  Box,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

const SingleProduct = ({
  images,
  description,
  title,
  price,
  _id,
  quantity,
  handlerFunction,
}) => {
  return (
    <Card maxW="sm" boxShadow={"2xl"} mx={2} my={2}>
      <CardBody>
        <Box
          h="50%"
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}>
          <Image
            src={images}
            alt="Green double couch with wooden legs"
            h="100%"
            objectFit={"cover"}
            borderRadius="lg"
          />
        </Box>
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{description}</Text>
          <Text color="blue.600" fontSize="2xl">
            {`$${price}`}
          </Text>
          <Text color="grey" fontSize="md">
            {`Quantity : ${quantity}`}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="teal" onClick={handlerFunction}>
            Add to Cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default SingleProduct;
