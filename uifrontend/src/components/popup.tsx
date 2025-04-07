// src/components/Popup.tsx

import React from 'react';
import { Box, Button, Text, Input, Select, Stack, Flex } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/modal';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

function Popup({ isOpen, onClose }: PopupProps) {
  return (
    // <Box>
    <>
      {/* Modal (Popup) */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          {/* Modal Header */}
          <ModalHeader>
            <Flex justify="space-between">
              <Text>Popup Title</Text>
              <Button onClick={onClose} size="sm">Close</Button>
            </Flex>
          </ModalHeader>

          {/* Modal Body */}
          <ModalBody>
            <Stack>
              {/* First row: Text and close button */}
              <Flex justify="space-between" align="center">
                <Text>Some instructions or text here</Text>
                <Button size="sm" onClick={onClose}>Close</Button>
              </Flex>

              {/* Textboxes */}
              <Input placeholder="Textbox 1" />
              <Input placeholder="Textbox 2" />
              
              {/* Dropdown */}
              {/* <Select placeholder="Select an option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select> */}
              
              {/* Another Textbox */}
              <Input placeholder="Textbox 3" />
            </Stack>
          </ModalBody>

          {/* Modal Footer with Close Button */}
          <ModalFooter>
            <Button onClick={onClose}>Close Popup</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Popup;
