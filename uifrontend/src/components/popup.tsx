// Popup.tsx
import { Box, Button, Flex, Input, Text, Textarea } from '@chakra-ui/react';
import { Select as ChakraSelect } from '@chakra-ui/select';
import { toaster } from "@/components/ui/toaster";

import CloseIcon from '../assets/icons/Close.svg';

interface PopupProps {
  open: boolean;
  toaster: any;
  onClose: () => void;
}

function Popup({ open, onClose }: PopupProps) {
  if (!open) return null;

  const composeNotification = () => {
    toaster.create({
      description: "Notification Composed Successfully!",
      type: "success",
      duration: 5000,
    });
    onClose();
  };

  return (
    <>
      <Box position="absolute" w="100%" h="110%" bg="#212026" opacity="0.4" zIndex={8} />

      <Box
        position="absolute"
        w="70vh"
        h="60vh"
        bg="#322F3E"
        zIndex={10}
        p={8}
        mb={50}
        borderRadius="10px"
      >
        {/* Top Row: Text and Close Button */}
        <Flex justify="space-between" align="center" mb={6}>
          <Text mb="10px" fontFamily="Poppins" fontWeight="700" color="white" fontSize="22px">
            Compose
          </Text>
          <Button mb="10px" size="0px" onClick={onClose} bg="#B2A5FF" variant="solid">
            <img src={CloseIcon} alt="Icon" />
          </Button>
        </Flex>

        {/* Centered Form */}
        <Flex direction="column" align="center" gap={4}>
          {/* Recipient Input */}
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" height="5vh" gap="0px" textAlign="left" fontFamily="Poppins" fontWeight="600" color="white" bg="#45444D" fontSize="14px" borderRadius="8px" p="12px">
            <Text as="span" fontWeight="600" fontSize="14px" color="#B2A5FF">
              Recipient:
            </Text>
            <Input border="0px" color="#CAC6C6" focusRingColor="transparent" placeholder="Enter recipient here" w="100%" />
          </Box>

          {/* Subject Input */}
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" height="5vh" gap="0px" textAlign="left" fontFamily="Poppins" fontWeight="600" color="white" bg="#45444D" fontSize="14px" borderRadius="8px" p="12px">
            <Text as="span" fontWeight="600" fontSize="14px" color="#B2A5FF">
              Subject:
            </Text>
            <Input border="0px" color="#CAC6C6" focusRingColor="transparent" placeholder="Enter subject here" w="100%" />
          </Box>

          {/* Notification Type Select */}
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" height="5vh" gap="0px" textAlign="left" fontFamily="Poppins" fontWeight="600" color="white" bg="#45444D" fontSize="14px" borderRadius="8px" p="12px">
            <Text as="span" paddingRight="10px" fontWeight="600" fontSize="14px" color="#B2A5FF">Notification&nbsp;Type:</Text>
            <ChakraSelect
              border="0px"
              color="#CAC6C6"
              focusBorderColor="transparent"
              _focus={{ boxShadow: 'none' }}
              bg="#45444D"
              placeholder="Select Type"
              w="100%"
              _hover={{ bg: "#383737" }}
              _expanded={{ bg: "#383737" }}
              icon={<></>}
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
              }}
            >
              <option value="Policy">Policy</option>
              <option value="News">News</option>
              <option value="Claim">Claim</option>
            </ChakraSelect>

            <Text as="span" paddingRight="10px" fontWeight="600" fontSize="14px" color="#B2A5FF">
              Priority:
            </Text>
            <ChakraSelect
              border="0px"
              color="#CAC6C6"
              focusBorderColor="transparent"
              _focus={{ boxShadow: 'none' }}
              bg="#45444D"
              placeholder="Select Type"
              w="100%"
              _hover={{ bg: "#383737" }}
              _expanded={{ bg: "#383737" }}
              icon={<></>}
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
              }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </ChakraSelect>
          </Box>

          {/* Message Textarea */}
          <Box display="flex" alignItems="top" justifyContent="space-between" width="100%" height="17vh" gap="0px" textAlign="left" fontFamily="Poppins" fontWeight="600" color="white" bg="#45444D" fontSize="14px" borderRadius="8px" p="12px">
            <Flex direction="column" align="left" gap={0} w="100%">
              <Text as="span" fontWeight="600" fontSize="14px" color="#B2A5FF">
                Message:
              </Text>
              <Textarea p="0px" border="0px" color="#CAC6C6" focusRingColor="transparent" placeholder="Enter subject here" w="100%" h="100%" />
            </Flex>
          </Box>

          {/* Submit Button */}
          <Button onClick={composeNotification} fontFamily="Poppins" fontWeight="600" color="white" bg="#B2A5FF" variant="solid" fontSize="16px">
            Compose
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default Popup;