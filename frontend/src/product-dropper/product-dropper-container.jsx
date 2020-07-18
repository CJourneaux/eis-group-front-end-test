import * as React from "react";
import * as Yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { Modal, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/core";

import ProductsContext from "../products-context";
import { ModalContentProductDetails } from "./modal-content-product-details";
import { DragAndDropInput } from "../components";
import { createProduct } from "../api";

const AddProductValidationSchema = Yup.object().shape({
  productName: Yup.string()
    .required("This field is required")
    .min(5, "Please enter a longer product name"),
  stock: Yup.number()
    .typeError("The stock quantity has to be a number")
    .required("This field is required")
    .positive("Please enter a valid stock quantity")
    .integer("Please enter a valid stock quantity"),
  price: Yup.number()
    .typeError("The price has to be a number")
    .required("This field is required")
    .positive("Please enter a valid price"),
  colour: Yup.string().required("This field is required"),
});

export function ProductDropperContainer({ newProductIndex = 1 }) {
  const [imageUrl, setImageUrl] = React.useState("");
  const [submitErrorMessage, setSubmitErrorMessage] = React.useState("");
  const { updateProductsList } = React.useContext(ProductsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const displayToast = useToast();

  const defaultValues = {
    productImagesList: new DataTransfer().files,
    productName: `Product ${newProductIndex.toString().padStart(3, "0")}`,
    price: 1,
    stock: 1,
    colour: "white",
  };
  const formContext = useForm({
    defaultValues,
    resolver: yupResolver(AddProductValidationSchema),
  });
  const { reset, watch } = formContext;

  const fileList = watch("productImagesList");

  React.useEffect(() => {
    if (fileList?.length > 0) {
      onOpen();
      const firstUrl = URL.createObjectURL(fileList[0]);
      setImageUrl(firstUrl);
    } else {
      setImageUrl("");
    }
  }, [fileList, fileList.length, onOpen]);

  const onFormClose = () => {
    reset(defaultValues);
    onClose();
    setSubmitErrorMessage("");
  };

  const onSubmit = async (values) => {
    setSubmitErrorMessage("");
    try {
      await createProduct(values);
      displayToast({
        title: "Product created.",
        description:
          "The product has been successfully added to the catalogue.",
        status: "success",
        position: "top-right",
        variant: "left-accent",
        isClosable: true,
      });
      updateProductsList();
      onFormClose();
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 403) {
        setSubmitErrorMessage("This product already exist.");
      } else {
        setSubmitErrorMessage(
          "There was an issue when trying to create the product. Please verify the values entered and try again!"
        );
      }
    }
  };

  return (
    <FormProvider {...formContext}>
      <DragAndDropInput
        accept="image/*"
        name="productImagesList"
        variantColor="orange"
      />
      <Modal isOpen={isOpen} onClose={onFormClose}>
        <ModalOverlay />
        <ModalContentProductDetails
          imageUrl={imageUrl}
          submitErrorMessage={submitErrorMessage}
          onFormClose={onFormClose}
          onSubmit={onSubmit}
        />
      </Modal>
    </FormProvider>
  );
}
