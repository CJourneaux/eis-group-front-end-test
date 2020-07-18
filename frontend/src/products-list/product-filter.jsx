import * as React from "react";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Tag,
  TagIcon,
  TagLabel,
} from "@chakra-ui/core";

export function ProductFilter({
  inputName,
  tags,
  addTagCallback,
  removeTagCallback,
}) {
  const [inputValue, setInputValue] = React.useState("");
  const buttonRef = React.useRef();

  const submitTag = () => {
    if (inputValue) {
      addTagCallback(inputValue);
      setInputValue("");
    }
  };

  return (
    <Stack spacing="0.5rem">
      <InputGroup flexDirection="row-reverse">
        <InputLeftElement>
          <IconButton
            tabIndex="-1"
            ref={buttonRef}
            ariaControls={inputName}
            icon="search"
            variant="link"
            aria-label="Add a filter"
            onClick={() => submitTag()}
          />
        </InputLeftElement>
        <Input
          name={inputName}
          type="search"
          value={inputValue}
          aria-label="Start typing to filter the list of products"
          placeholder="Filter the list of products"
          onChange={({ target }) => setInputValue(target?.value)}
          onKeyDown={({ key }) => {
            if (key === "Tab" || key === "Enter") {
              buttonRef.current.click();
            }
          }}
          variant="flushed"
          size="lg"
          paddingRight="0.5rem"
        />
      </InputGroup>
      <Stack isInline isReversed spacing="0.5rem" flexWrap="wrap">
        {tags.map((tag, index) => {
          return (
            <Tag
              as={Button}
              key={`tag-${index}`}
              variantColor="cyan"
              marginBottom="0.5rem"
              onClick={() => {
                removeTagCallback(tag);
              }}
              _hover={{ bg: "cyan.200" }}
            >
              <TagLabel>{tag}</TagLabel>
              <TagIcon icon="close" size="0.75rem" />
            </Tag>
          );
        })}
      </Stack>
    </Stack>
  );
}
