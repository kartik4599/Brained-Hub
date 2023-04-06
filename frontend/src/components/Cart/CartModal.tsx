import { useSelector, useDispatch } from "react-redux";
import {
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Button,
  useDisclosure,
  Modal,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
  Heading,
} from "@chakra-ui/react";
import SingleCartItem from "./SingleCartItem";
import { cartAction } from "../../redux/cartRedux";

const CartModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { cart, totalAmount } = useSelector((state: any) => state.cart);

  const addItem = (item: any) => {
    console.log("cart add");
    dispatch(cartAction.addItem(item));
  };

  const removeItem = (item: any) => {
    dispatch(cartAction.removeItem(item));
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="100%" maxH="400px" overflowY={"scroll"}>
            {cart.map((item, i) => (
              <SingleCartItem
                key={i}
                {...item}
                addHandler={addItem.bind(null, item)}
                removeHandler={removeItem.bind(null, item)}
              />
            ))}
          </ModalBody>
          <ModalFooter
            bgColor={"blackAlpha.200"}
            justifyContent="space-between">
            <Heading size={"lg"}>{`Total Amount : ${totalAmount}`}</Heading>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CartModal;
