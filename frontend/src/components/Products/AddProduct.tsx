import { useState } from "react";
import {
  VStack,
  FormLabel,
  Input,
  FormControl,
  useToast,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState("");
  const [price, setPrice] = useState("");

  const { user } = useSelector((state: any) => state.auth);

  const submitHandler = async () => {
    if (title && description && quantity && images && price) {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      axios.post("http://localhost:5000/api/product", {
        title,
        price,
        description,
        quantity,
        images,
      });
    }
  };
  return (
    <VStack spacing={"5px"} my={10} p={10}>
      <VStack id="email" w="500px" p={10} bgColor={"grey.100"} boxShadow="2xl">
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            w="100%"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            w="100%"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Quantity</FormLabel>
          <Input
            type={"number"}
            w="100%"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Image Url</FormLabel>
          <Input
            type={"password"}
            w="100%"
            value={images}
            onChange={(e) => {
              setImages(e.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            type={"number"}
            w="100%"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </FormControl>
        <Button
          colorScheme="teal"
          width={"100%"}
          style={{ marginTop: 15 }}
          onClick={submitHandler}>
          Add Product
        </Button>
      </VStack>
    </VStack>
  );
};

export default AddProduct;
