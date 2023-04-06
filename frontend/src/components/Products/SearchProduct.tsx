import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, useToast, Text, Heading } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import SingleProduct from "./SingleProduct";
import { cartAction } from "../../redux/cartRedux";
import axios from "axios";

const SearchProduct = () => {
  const [pageNo, setPageNo] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [data, setData] = useState([]);
  const toast = useToast();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const { query } = location.state;

  const getProduct = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/product/search?pageno=${pageNo}&search=${query}`,
        config
      );
      if (data) {
        setData(data.product);
        setAllPage(data.count);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProduct();
  }, [pageNo]);

  const addToCartFunction = (product: any) => {
    dispatch(cartAction.addItem(product));
  };

  const numberOfPage = Math.floor(allPage / 6);

  return (
    <Box mx={2} my={10}>
      <Heading m={10} size={"lg"}>
        {`Search Reult of "${query}"`}{" "}
      </Heading>
      <Box display={"flex"} justifyContent="center" flexWrap="wrap">
        {data.map((e: any) => (
          <SingleProduct
            key={e._id}
            {...e}
            handlerFunction={addToCartFunction.bind(null, e)}
          />
        ))}
      </Box>
      <Box
        my={5}
        display={"flex"}
        alignItems="center"
        justifyContent={"center"}>
        {Array.apply(null, Array(numberOfPage)).map((e, i) => (
          <Button
            colorScheme={"teal"}
            key={i}
            mx={1}
            onClick={() => {
              setPageNo(i);
            }}>
            {i + 1}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default SearchProduct;
