import * as React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/core";

export function ConfirmActionButton({
  trigger,
  onConfirm,
  dialogHeaderText,
  dialogMessageText,
  cancelButtonText = "Cancel",
  confirmButtonText = "Delete",
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState(false);
  // used to give focus to the cancel button when the modal opens
  const cancelRef = React.useRef();

  return (
    <>
      {React.cloneElement(trigger, { onClick: onOpen })}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {dialogHeaderText}
          </AlertDialogHeader>

          <AlertDialogBody>{dialogMessageText}</AlertDialogBody>

          <AlertDialogFooter justifyContent="space-evenly">
            <Button ref={cancelRef} onClick={onClose}>
              {cancelButtonText}
            </Button>
            <Button
              variantColor="red"
              isLoading={isLoading}
              onClick={async () => {
                setIsLoading(true);
                await onConfirm();
                setIsLoading(false);
                onClose();
              }}
            >
              {confirmButtonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
