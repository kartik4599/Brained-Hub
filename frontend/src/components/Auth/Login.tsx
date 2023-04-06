import {
  VStack,
  FormLabel,
  Input,
  FormControl,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authAction } from "../../redux/authRedux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      if (email && password) {
        const { data } = await axios.post(
          "http://localhost:5000/api/user/login",
          {
            email,
            password,
          }
        );
        console.log(data);
        if (data) {
          toast({
            status: "success",
            position: "top",
            title: "Logined",
          });
        }

        dispatch(authAction.setUser(data));
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
      console.log(e);
    }
  };

  return (
    <VStack spacing={"5px"}>
      <VStack id="email" w="400px">
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
        <Button
          colorScheme="teal"
          width={"100%"}
          isLoading={loading}
          style={{ marginTop: 15 }}
          onClick={submitHandler}>
          Log In
        </Button>
      </VStack>
    </VStack>
  );
};

export default Login;
