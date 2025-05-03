import { Box, Button, Flex, Text, IconButton } from '@chakra-ui/react';
import { AuthUser } from '../services/api'; // Import the AuthUser interface
import CloseIcon from '../assets/icons/Close.svg'; // Assuming you have a close icon

interface UserProfilePopupProps {
  open: boolean;
  onClose: () => void;
  user: AuthUser | null; // User data to display
}

function UserProfilePopup({ open, onClose, user }: UserProfilePopupProps) {
  if (!open || !user) return null; // Don't render if not open or no user data

  return (
    <>
      {/* Background Overlay */}
      <Box position="fixed" top="0" left="0" w="100%" h="100%" bg="blackAlpha.600" zIndex={1000} onClick={onClose} />

      {/* Popup Box */}
      <Flex
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="90%" // Responsive width
        maxW="400px" // Max width
        minH="200px" // Minimum height
        bg="#282730"
        zIndex={1001} // Ensure popup is above overlay
        p={6} // Padding
        borderRadius="10px"
        direction="column" // Stack elements vertically
        boxShadow="lg" // Add shadow for depth
      >
        {/* Top Row: Title and Close Button */}
        <Flex justify="space-between" align="center" mb={6}>
          <Text fontFamily="Poppins" fontWeight="700" color="white" fontSize="24px">
            User Profile
          </Text>
          <Button mb="10px" size="0px" onClick={onClose} bg="#B2A5FF" variant="solid">
            <img src={CloseIcon} alt="Icon" />
          </Button>
        </Flex>

        {/* Profile Details */}
        <Flex direction="column" gap={4} flexGrow={1}>
          <Box>
            <Text fontWeight="600" fontSize="16px" color="#B2A5FF">
              Username:
            </Text>
            <Text color="#CAC6C6" fontSize="16px">{user.username}</Text>
          </Box>
          <Box>
            <Text fontWeight="600" fontSize="16px" color="#B2A5FF">
              Email:
            </Text>
            <Text color="#CAC6C6" fontSize="16px">{user.email}</Text>
          </Box>
           <Box>
            <Text fontWeight="600" fontSize="16px" color="#B2A5FF">
              Name:
            </Text>
            <Text color="#CAC6C6" fontSize="16px">{user.firstName} {user.lastName}</Text>
          </Box>
        </Flex>

        {/* Optional: Close button at the bottom */}
        {/* <Button mt={6} onClick={onClose} variant="outline" colorScheme="purple">Close</Button> */}
      </Flex>
    </>
  );
}

export default UserProfilePopup;
