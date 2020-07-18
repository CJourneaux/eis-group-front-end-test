import * as React from "react";
import {
  Button,
  Icon,
  Input,
  Text,
  PseudoBox,
  VisuallyHidden,
  useTheme,
} from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";

import { customEventHandler } from "../utils";

const hasAppropriateAmountOfFiles = (multiple, fileList = []) =>
  fileList.length === 1 || (multiple && fileList.length > 0);

const getFileNames = (fileList = []) =>
  Array.from(fileList)
    .map((file) => file.name)
    .join(", ");

export function DragAndDropInput({
  name,
  variantColor,
  accept,
  multiple = false,
}) {
  const [isDragging, setDragging] = React.useState(false);
  const { register, setValue, getValues } = useFormContext();
  const inputRef = React.useRef();

  const inputValueAsText = getFileNames(getValues(name));
  const inputLabelId = `label-for-${name}`;

  const { colors } = useTheme();
  const contentColour = colors[variantColor]["800"];
  const bgColour = colors[variantColor]["50"];
  const hoverBgColour = colors[variantColor]["100"];
  const hoverDarkBgColour = colors[variantColor]["600"];
  const activeBgColour = colors[variantColor]["200"];

  const onDragEnter = () => setDragging(true);
  const onDragOver = (e) => (e.dataTransfer.dropEffect = "copy");
  const onDragLeave = () => setDragging(false);
  const onDrop = (e) => {
    const files = e.dataTransfer?.files;
    console.log("event drop", files.length);
    if (hasAppropriateAmountOfFiles(multiple, files)) {
      setValue(name, files);
    }
    setDragging(false);
  };

  const onDragStyle = isDragging
    ? {
        border: "dashed",
        backgroundColor: hoverBgColour,
        shadow: `0 0 0 0.5rem ${hoverBgColour}`,
      }
    : { backgroundColor: bgColour };

  return (
    <>
      <VisuallyHidden
        as={Input}
        name={name}
        type="file"
        id={name}
        multiple={multiple}
        accept={accept}
        aria-labelledby={inputLabelId}
        tabIndex="-1"
        ref={(e) => {
          inputRef.current = e;
          register(e);
        }}
      />
      <PseudoBox
        id={inputLabelId}
        aria-controls={name}
        as={Button}
        onClick={() => inputRef.current.click()}
        onDragEnter={customEventHandler(onDragEnter)}
        onDragOver={customEventHandler(onDragOver)}
        onDragLeave={customEventHandler(onDragLeave)}
        onDrop={customEventHandler(onDrop)}
        role="group"
        display="flex"
        flexDirection={["column", "row"]}
        rounded="lg"
        overflow="hidden"
        height={["6rem", "4rem"]}
        width="100%"
        padding="0"
        color={contentColour}
        borderColor={contentColour}
        _focus={{ shadow: "outline" }}
        _hover={{ bg: hoverBgColour }}
        _active={{ bg: activeBgColour }}
        {...onDragStyle}
      >
        {isDragging ? (
          <Icon
            name="add"
            aria-label="Drop an image here"
            color={contentColour}
            display="block"
            margin="auto"
            height="100%"
            pointerEvents="none"
          />
        ) : (
          <>
            <Button
              as="span"
              variantColor={variantColor}
              _groupHover={{ bg: hoverDarkBgColour }}
              borderRadius="0"
              minWidth={["100%", "20%"]}
              height={["50%", "100%"]}
            >
              Select an image
            </Button>
            <Text
              as="span"
              flexGrow="1"
              margin={["0.75rem 0 0 0", "0 0 0 2rem"]}
              textAlign={["center", "left"]}
            >
              {inputValueAsText || "or drop your file here"}
            </Text>
          </>
        )}
      </PseudoBox>
    </>
  );
}
