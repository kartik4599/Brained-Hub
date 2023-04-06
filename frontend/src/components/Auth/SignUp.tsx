import {
  VStack,
  FormLabel,
  Input,
  FormControl,
  useToast,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setconformPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const submitHandler = async () => {
    setLoading(true);
    try {
      if (name && email && password) {
        if (!(password === conformPassword)) {
          return toast({
            status: "warning",
            position: "top",
            title: "Check the password",
          });
        }

        const { data } = await axios.post(
          "http://localhost:5000/api/user/signup",
          {
            name,
            email,
            password,
          }
        );
        console.log(data);
        if (data) {
          toast({
            status: "success",
            position: "top",
            title: "Account Created",
          });
        }
      } else {
        toast({
          status: "warning",
          position: "top",
          title: "Enter the  all fields",
        });
      }
    } catch (e) {
      toast({
        status: "error",
        position: "top",
        title: "Error Occured",
      });
    }
    setLoading(false);
  };

  return (
    <VStack spacing={"5px"}>
      <VStack id="email" w="400px">
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="name"
            placeContent={"Enter Your Name"}
            w="100%"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeContent={"Enter Your Email"}
            w="100%"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type={"password"}
            w="100%"
            placeContent={"Enter Your Password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Conform Password</FormLabel>
          <Input
            type={"password"}
            w="100%"
            placeContent={"Enter Your Password"}
            value={conformPassword}
            onChange={(e) => {
              setconformPassword(e.target.value);
            }}
          />
        </FormControl>
        <Button
          colorScheme="teal"
          width={"100%"}
          isLoading={loading}
          style={{ marginTop: 15 }}
          onClick={submitHandler}>
          Sign Up
        </Button>
      </VStack>
    </VStack>
  );
};

export default SignUp;
