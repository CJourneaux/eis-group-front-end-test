import * as React from "react";
import {
  Heading,
  IconButton,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Skeleton,
} from "@chakra-ui/core";

import { deleteProduct } from "../api";
import { ConfirmActionButton } from "../components";
import ProductsContext from "../products-context";

const IMAGE_PLACEHOLDER =
  "https://via.placeholder.com/448x160.png/EBF8FF/1A365D?text=Image+unavailable";

export function ProductCard({
  _id,
  name,
  price,
  stock,
  colour,
  imagePath,
  ...props
}) {
  const { updateProductsList } = React.useContext(ProductsContext);

  const imageAlt = name
    ? `Image of a ${colour || ""} ${name}`
    : "Image description unavailable";
  return (
    <Stack
      as="table"
      shadow="lg"
      spacing="0.5rem"
      padding="0.5rem"
      borderWidth="1px"
      rounded="lg"
      {...props}
    >
      <Heading as="caption" fontSize="1.75rem" textAlign="center">
        {name}
      </Heading>
      <thead>
        <SimpleTableRow
          header="Illustration"
          hideContent
          placeholder={
            <Skeleton isLoaded={!!imagePath}>
              <Image
                src={`http://localhost:5000${imagePath}`}
                fallbackSrc={IMAGE_PLACEHOLDER}
                corsorigin="anonymous"
                alt={imageAlt}
                height="12rem"
                rounded="lg"
                shadow="sm"
                margin="auto"
              />
            </Skeleton>
          }
        />
      </thead>
      <SimpleGrid
        as="tbody"
        columns={{ base: 1, sm: 2 }}
        spacing="0.25rem"
        padding={{ base: "0 1rem", md: "0 1.5rem", lg: "0 2rem" }}
      >
        <SimpleTableRow header="Price" data={`${price}`} />
        <SimpleTableRow
          header="Quantity"
          data={stock}
          hideContent={stock <= 0}
          placeholder="Out of order"
        />
        <SimpleTableRow header="Colour" data={colour} />
      </SimpleGrid>
      <ConfirmActionButton
        dialogHeaderText={`Confirm product deletion`}
        dialogMessageText={`Are you sure? The ${name} will be deleted forever!`}
        onConfirm={async () => {
          await deleteProduct(_id);
          updateProductsList();
        }}
        trigger={
          <IconButton
            icon="close"
            aria-label={`Delete ${name}`}
            variant="ghost"
            variantColor="red"
          />
        }
      />
    </Stack>
  );
}

const SimpleTableRow = ({ header, data, hideContent = false, placeholder }) => {
  const HeaderComponent = hideContent ? VisuallyHidden : Text;
  const dataCellProps = hideContent
    ? { fontStyle: "italic", colspan: "2" }
    : {};

  return (
    <Text as="tr" display="flex">
      <HeaderComponent as="th" width="5rem">
        {header}:
      </HeaderComponent>
      <Text as="td" flexGrow="1" {...dataCellProps}>
        {hideContent ? placeholder : data}
      </Text>
    </Text>
  );
};
