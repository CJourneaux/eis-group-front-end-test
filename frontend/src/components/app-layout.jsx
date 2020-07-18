import * as React from "react";
import { Box, Flex, Heading, Text, Link } from "@chakra-ui/core";
import { customEventHandler } from "../utils";

export function AppLayout({ children }) {
  return (
    <Flex
      direction="column"
      minHeight="100vh"
      onDragOver={customEventHandler(
        (e) => (e.dataTransfer.dropEffect = "none")
      )}
    >
      <Box backgroundColor="pink.900" color="white" padding="1.5rem">
        <Heading as="h1" textAlign="center">
          Product & Co
        </Heading>
        <Heading as="h2" textAlign="center">
          Product dropper
        </Heading>
      </Box>
      <Flex direction="column" padding="1.5rem" flexGrow={1}>
        {children}
      </Flex>
      <Box
        backgroundColor="pink.900"
        color="white"
        textAlign={["center", "right"]}
        padding={["1.5rem 4rem", "1.5rem 8rem"]}
      >
        <Text as="span" width="100%">
          Created by{" "}
          <Link href="https://github.com/CJourneaux">Cécile Journeaux</Link> for{" "}
          <Link href="https://www.eisgroup.com/">EIS Group</Link> - 2020
        </Text>
      </Box>
    </Flex>
  );
}
