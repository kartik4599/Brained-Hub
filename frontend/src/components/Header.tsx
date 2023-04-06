import { useState } from "react";
import {
  Box,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Image,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { Search2Icon, CloseIcon, ArrowRightIcon } from "@chakra-ui/icons";
import cartIcon from "../assets/cart.svg";
import { useSelector, useDispatch } from "react-redux";
import CartModal from "./Cart/CartModal";
import { authAction } from "../redux/authRedux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isLogin } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <Box borderBottom="1px">
      <Box
        display={"flex"}
        justifyContent={isLogin ? "space-between" : "center"}
        alignItems={"center"}
        w="100%"
        px={5}
        h={"75px"}>
        {isLogin && (
          <Box mx={3}>
            {!search && (
              <Search2Icon
                cursor={"pointer"}
                color="gray"
                onClick={() => {
                  setSearch(true);
                }}
                boxSize={6}
              />
            )}
            {search && (
              <FormControl
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate("/search", { state: { query } });
                  }
                }}>
                <InputGroup>
                  <InputLeftElement>
                    <Search2Icon boxSize={6} />
                  </InputLeftElement>
                  <Input
                    type={"text"}
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                    placeholder="Search our store"
                  />
                  <InputRightElement>
                    <CloseIcon
                      cursor={"pointer"}
                      onClick={() => {
                        setSearch(false);
                      }}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            )}
          </Box>
        )}
        <Box cursor={"pointer"}>
          <Text fontFamily={"Poppins"} fontSize={"30px"}>
            BrainerHub Solutions{" "}
          </Text>
        </Box>
        {isLogin && (
          <Box display={"flex"} alignItems="center" mx={2}>
            <Tooltip label="Cart">
              <CartModal>
                <Image h="30px" mr={3} src={cartIcon} cursor={"pointer"} />
              </CartModal>
            </Tooltip>
            <Tooltip label="Logout">
              <ArrowRightIcon
                color={"red"}
                ml={3}
                boxSize={6}
                cursor={"pointer"}
                onClick={() => {
                  dispatch(authAction.removeUser());
                }}
              />
            </Tooltip>
          </Box>
        )}
      </Box>
      <Box display={"flex"} justifyContent="space-evenly">
        <Text
          cursor={"pointer"}
          fontSize={"xl"}
          fontFamily="Ubuntu"
          mx={2}
          onClick={() => {
            navigate("/");
          }}
          p={2}>
          Home
        </Text>
        <Text
          cursor={"pointer"}
          fontSize={"xl"}
          fontFamily="Ubuntu"
          mx={2}
          onClick={() => {
            navigate("/addProduct");
          }}
          p={2}>
          Add Product
        </Text>
      </Box>
    </Box>
  );
};

export default Header;
