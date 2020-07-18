import * as React from "react";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Skeleton,
  Stack,
} from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";

export function ModalContentProductDetails({
  imageUrl,
  submitErrorMessage,
  onFormClose,
  onSubmit,
}) {
  const { errors, formState, handleSubmit, register } = useFormContext();
  return (
    <ModalContent maxWidth="lg" rounded="lg" margin="5rem auto">
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader textAlign="center">Add a new product</ModalHeader>
        <ModalBody>
          <Stack spacing="0.75rem">
            <Skeleton isLoaded={!!imageUrl}>
              <Image
                src={imageUrl}
                height="16rem"
                margin="0 auto 1rem"
                shadow="xl"
              />
            </Skeleton>
            <FormControl isRequired isInvalid={errors.name}>
              <FormLabel htmlFor="product-name">Product name</FormLabel>
              <Input
                type="text"
                name="productName"
                id="product-name"
                placeholder="Garden gnome hat"
                ref={register}
              />
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.stock}>
              <FormLabel htmlFor="stock">Stock</FormLabel>
              <Input
                type="number"
                name="stock"
                id="stock"
                placeholder="10"
                ref={register}
              />
              <FormErrorMessage>{errors?.stock?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.price}>
              <FormLabel htmlFor="price">Product price</FormLabel>
              <InputGroup>
                <InputLeftElement color="gray.300" fontSize="1.1rem">
                  $
                </InputLeftElement>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="42.00"
                  ref={register}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.price?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.colour}>
              <FormLabel htmlFor="colour">Product colour</FormLabel>
              <Input
                type="text"
                name="colour"
                id="colour"
                placeholder="Black"
                ref={register}
              />
              <FormErrorMessage>{errors?.colour?.message}</FormErrorMessage>
            </FormControl>
            {submitErrorMessage && (
              <Alert status="error" variant="left-accent">
                <AlertIcon />
                {submitErrorMessage}
              </Alert>
            )}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Stack isInline width="100%" spacing={["0.5rem", "1rem"]}>
            <Button
              type="submit"
              isLoading={formState.isSubmitting}
              loadingText="Saving product"
              flexGrow={1}
              flexBasis={["6.5rem", 0]}
              leftIcon="check"
              variantColor="green"
              variant="outline"
            >
              Save
            </Button>
            <Button
              type="reset"
              onClick={onFormClose}
              flexGrow={1}
              flexBasis={0}
              leftIcon="close"
              variantColor="red"
              variant="outline"
            >
              Cancel
            </Button>
          </Stack>
        </ModalFooter>
      </form>
    </ModalContent>
  );
}
