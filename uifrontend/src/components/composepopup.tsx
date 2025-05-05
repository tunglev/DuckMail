// Popup.tsx
import { Box, Button, Flex, Input, Text, Textarea, IconButton } from '@chakra-ui/react';
import { useRef } from 'react';
import { Select as ChakraSelect } from '@chakra-ui/select';
import { toaster } from "@/components/ui/toaster";

import CloseIcon from '../assets/icons/Close.svg';
import { messageApi } from '@/services/api';
import { AuthUser } from '../services/api'; // Import the AuthUser interface

interface PopupProps {
  open: boolean;
  onClose: () => void;
  buttonsData: any;
  setButtonsData: any;
  user: AuthUser | null; // User data to display
  fetchUserMessages: any;
}

function ComposePopup({ open, onClose, buttonsData, setButtonsData, user, fetchUserMessages }: PopupProps) {
  const recipientRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  if (!open) return null;

  const composeNotification = () => {
    if(!recipientRef.current || !subjectRef.current || !typeRef.current || !priorityRef.current || !messageRef.current){
      return;
    }

    let isError = false;

    if (recipientRef.current.value.trim().length === 0 || !recipientRef.current.value.trim().includes('@')) {
      isError = true;
    }

    if (subjectRef.current.value.trim().length === 0) {
      isError = true;
    }

    if (typeRef.current.value.trim().length === 0) {
      isError = true;
    }

    if (priorityRef.current.value.trim().length === 0) {
      isError = true;
    }

    if (messageRef.current.value.trim().length === 0) {
      isError = true;
    }

    if(isError){
      toaster.create({
        description: "Invalid Input :(",
        type: "error",
        duration: 3000,
      });
      return;
    }

    try {
      messageApi.create({ sender: user.email, recipient: recipientRef.current.value, subject: subjectRef.current.value, body: messageRef.current.value, priority: priorityRef.current.value, type: typeRef.current.value });
      fetchUserMessages();

      toaster.create({
        description: "Notification Composed Successfully!",
        type: "success",
        duration: 3000,
      });
      onClose();
    } catch {
      toaster.create({
        description: "Failed to compose message",
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <>
      {/* Background Overlay - Use fixed positioning and higher zIndex */}
      <Box
        position="fixed"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="blackAlpha.600" // Consistent overlay style
        zIndex={1000} // Higher zIndex
        onClick={onClose} // Allow closing by clicking overlay
      />

      {/* Popup Box - Use fixed positioning, centering, and higher zIndex */}
      <Flex
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="90%" // Responsive width
        maxW="600px" // Max width, adjust as needed
        // minH="400px" // Adjust height as needed or let content define it
        bg="#282730" // Match UserProfilePopup background
        zIndex={1001} // Higher zIndex
        p={6} // Consistent padding
        borderRadius="10px"
        direction="column"
        boxShadow="lg"
      >
        {/* Top Row: Text and Close Button */}
        <Flex justify="space-between" align="center" mb={6}>
          <Text fontFamily="Poppins" fontWeight="700" color="white" fontSize="24px">
            Compose
          </Text>
          {/* Use IconButton for consistency */}
          <Button mb="10px" size="0px" onClick={onClose} bg="#B2A5FF" variant="solid">
            <img src={CloseIcon} alt="Icon" />
          </Button>
        </Flex>

        {/* Form Content */}
        <Flex direction="column" gap={4} flexGrow={1}>
          {/* Recipient Input */}
          <Box>
            <Text as="label" htmlFor="recipient" mb={1} display="block" fontWeight="600" fontSize="16px" color="#B2A5FF">
              Recipient:
            </Text>
            <Input
              id="recipient"
              ref={recipientRef}
              border="0px"
              bg="#45444D"
              color="#CAC6C6"
              fontFamily="Poppins" 
              _focus={{ borderColor: "#B2A5FF" }}
              placeholder="Enter recipient email here"
              w="100%"
              borderRadius="8px"
              p="12px"
              _placeholder={{ color: "#888" }}
            />
          </Box>

          {/* Subject Input */}
          <Box>
            <Text as="label" htmlFor="subject" mb={1} display="block" fontWeight="600" fontSize="16px" color="#B2A5FF">
              Subject:
            </Text>
            <Input
              id="subject"
              ref={subjectRef}
              border="0px"
              bg="#45444D"
              color="#CAC6C6"
              _focus={{ borderColor: "#B2A5FF" }}
              placeholder="Enter subject here"
              w="100%"
              borderRadius="8px"
              p="12px"
              _placeholder={{ color: "#888" }}
            />
          </Box>

          {/* Type and Priority Row */}
          <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
            <Box flex={1}>
              <Text as="label" htmlFor="type" mb={1} display="block" fontWeight="600" fontSize="16px" color="#B2A5FF">
                Type:
              </Text>
              <ChakraSelect
                id="type"
                ref={typeRef}
                border="0px"
                bg="#45444D"
                color="#CAC6C6"
                _focus={{ borderColor: "#B2A5FF" }}
                fontFamily="Poppins" 
                placeholder="Select Type"
                w="100%"
                borderRadius="8px"
                icon={<></>}
                // p="12px" // Select padding is handled differently
                iconColor="#B2A5FF"
              >
                <option style={{ backgroundColor: '#45444D' }} value="Policy">Policy</option>
                <option style={{ backgroundColor: '#45444D' }} value="News">News</option>
                <option style={{ backgroundColor: '#45444D' }} value="Claim">Claim</option>
              </ChakraSelect>
            </Box>
            <Box flex={1}>
              <Text as="label" htmlFor="priority" mb={1} display="block" fontWeight="600" fontSize="16px" color="#B2A5FF">
                Priority:
              </Text>
              <ChakraSelect
                id="priority"
                ref={priorityRef}
                border="0px"
                bg="#45444D"
                color="#CAC6C6"
                _focus={{ borderColor: "#B2A5FF" }}
                fontFamily="Poppins" 
                placeholder="Select Priority"
                w="100%"
                borderRadius="8px"
                iconColor="#B2A5FF"
                icon={<></>}
              >
                <option style={{ backgroundColor: '#45444D' }} value="Low">Low</option>
                <option style={{ backgroundColor: '#45444D' }} value="Medium">Medium</option>
                <option style={{ backgroundColor: '#45444D' }} value="High">High</option>
              </ChakraSelect>
            </Box>
          </Flex>

          {/* Message Textarea */}
          <Box>
            <Text as="label" htmlFor="message" mb={1} display="block" fontWeight="600" fontSize="16px" color="#B2A5FF">
              Message:
            </Text>
            <Textarea
              id="message"
              ref={messageRef}
              border="0px"
              bg="#45444D"
              color="#CAC6C6"
              _focus={{ borderColor: "#B2A5FF" }}
              placeholder="Enter message here"
              w="100%"
              borderRadius="8px"
              p="12px"
              minH="100px" // Give textarea a minimum height
              _placeholder={{ color: "#888" }}
            />
          </Box>

          {/* Submit Button */}
          <Button
            mt={4}
            onClick={composeNotification}
            fontFamily="Poppins"
            fontWeight="600"
            color="white"
            bg="#B2A5FF"
            variant="solid"
            fontSize="16px"
            _hover={{ bg: "#9d8bff" }}
            w="100%"
            size="lg"
          >
            Compose
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default ComposePopup;