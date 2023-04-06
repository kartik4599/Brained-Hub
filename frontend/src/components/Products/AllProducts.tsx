import { useEffect, useState } from "react";
import { Box, Button, useToast } from "@chakra-ui/react";
import SingleProduct from "./SingleProduct";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { cartAction } from "../../redux/cartRedux";

const AllProducts = () => {
  const [pageNo, setPageNo] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [data, setData] = useState([]);
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { cart } = useSelector((state: any) => state.cart);

  const getProduct = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/product?pageno=${pageNo}`,
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

export default AllProducts;
