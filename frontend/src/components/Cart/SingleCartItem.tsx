import React from "react";
import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

const SingleCartItem = ({
  title,
  images,
  quantity,
  addHandler,
  removeHandler,
}) => {
  return (
    <Card
      my={2}
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline">
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={images}
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{title}</Heading>
          <Text py="2">{`X ${quantity}`}</Text>
        </CardBody>

        <CardFooter>
          <ButtonGroup>
            <Button variant="solid" colorScheme="blue" onClick={addHandler}>
              increase quantity +
            </Button>
            <Button variant="solid" colorScheme="red" onClick={removeHandler}>
              decrease quantity -
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default SingleCartItem;
