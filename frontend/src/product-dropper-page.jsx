import * as React from "react";
import { useQuery, queryCache } from "react-query";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Divider,
  Spinner,
  Stack,
  Button,
  SimpleGrid,
} from "@chakra-ui/core";

import ProductsContext from "./products-context";
import { ConfirmActionButton } from "./components";
import { ProductFilter, ProductCard } from "./products-list";
import { ProductDropper } from "./product-dropper";
import { getAllProducts, GET_ALL_PRODUCTS, resetApplication } from "./api";
import { doesObjectMatchFilters } from "./utils";

export default function App() {
  const { isLoading, error, data: products } = useQuery(
    GET_ALL_PRODUCTS,
    getAllProducts
  );

  const [filters, setFilters] = React.useState(new Set());

  if (isLoading) {
    return (
      <Spinner
        size="8rem"
        thickness="10px"
        speed="0.65s"
        color="cyan.300"
        emptyColor="gray.200"
        margin="auto"
      />
    );
  }

  if (error) {
    return (
      <Alert
        as={Stack}
        status="error"
        variant="top-accent"
        flexDirection="column"
        textAlign="center"
        spacing="1rem"
        padding="1.5rem"
      >
        <AlertIcon size="2.5rem" />
        <AlertTitle>Server did not respond</AlertTitle>
        <AlertDescription>
          There was an error when trying to read the data from our servers. Try
          refreshing the page.
        </AlertDescription>
      </Alert>
    );
  }

  const filtered =
    filters.size > 0
      ? products.filter(({ name, price, colour, stock }) =>
          doesObjectMatchFilters({ name, price, colour, stock }, [...filters])
        )
      : products;

  const nextProductIndex = products?.length + 1 || 1;

  const updateProductsList = () =>
    queryCache.invalidateQueries(GET_ALL_PRODUCTS);

  return (
    <ProductsContext.Provider value={{ updateProductsList }}>
      <Stack flexGrow={1} spacing="1rem">
        <Box>
          <ProductFilter
            inputName="searchFilters"
            tags={[...filters]}
            addTagCallback={(value) => setFilters(new Set(filters).add(value))}
            removeTagCallback={(value) =>
              setFilters(new Set(filters).delete(value))
            }
          />
        </Box>
        <Box>
          <ProductDropper
            key={nextProductIndex}
            newProductIndex={nextProductIndex}
          />
        </Box>
        <Divider width="100%" />
        <SimpleGrid
          flexGrow={1}
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
          spacing="2rem"
          marginBottom="2rem"
        >
          {filtered.map((product) => (
            <ProductCard key={`product-${product._id}`} {...product} />
          ))}
        </SimpleGrid>
        <ConfirmActionButton
          dialogHeaderText="Resetting the application"
          dialogMessageText="Are you sure? This will delete all products and cannot be undone!"
          onConfirm={async () => {
            await resetApplication();
            updateProductsList();
          }}
          trigger={
            <Button
              alignSelf="flex-end"
              justifySelf="flex-end"
              rightIcon="delete"
              variantColor="red"
              variant="ghost"
            >
              Reinitialise page
            </Button>
          }
        />
      </Stack>
    </ProductsContext.Provider>
  );
}
