// Popup.tsx
import { Box, Button, Flex, Input, Text, Link } from '@chakra-ui/react';
import { useRef, useState } from 'react'; // Import useState
import { toaster } from "@/components/ui/toaster";

interface PopupProps {
  open: boolean;
  onClose: () => void;
}

function LoginSignup({ open, onClose }: PopupProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null); // Add ref for First Name
  const lastNameRef = useRef<HTMLInputElement>(null);  // Add ref for Last Name
  const [isLoginView, setIsLoginView] = useState(true); // State to toggle views

  if (!open) return null;

  const handleLogin = () => {
    if (!emailRef.current || !passwordRef.current) {
      return;
    }

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || !password) {
       toaster.create({
        description: "Email and Password cannot be empty.",
        type: "error",
        duration: 3000,
      });
      return;
    }

    // TODO: CHECK TO SEE IF PASSWORD MATCHES EMAIL (API Call)
    console.log("Logging in with:", email, password);


    toaster.create({
      description: "Login Successful!",
      type: "success",
      duration: 3000,
    });
    onClose(); // Close popup on successful login
  };

  const handleSignup = () => {
    if (!emailRef.current || !passwordRef.current || !firstNameRef.current || !lastNameRef.current) {
      return;
    }

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const firstName = firstNameRef.current.value.trim(); // Get first name
    const lastName = lastNameRef.current.value.trim();   // Get last name

    if (!firstName || !lastName) { // Validate names
      toaster.create({
        description: "First Name and Last Name cannot be empty.",
        type: "error",
        duration: 3000,
      });
      return;
    }

    if (email.length === 0 || !email.includes('@')) {
      toaster.create({
        description: "Invalid Email format.",
        type: "error",
        duration: 3000,
      });
      return;
    }

    if (password.length < 12) {
      toaster.create({
        description: "Password must be at least 12 characters long.",
        type: "error",
        duration: 3000,
      });
      return;
    }

    // TODO: CREATE USER CODE HERE AFTER HASHING PASSWORD (API Call)
    console.log("Signing up with:", firstName, lastName, email, password); // Include names in log

    toaster.create({
      description: "Signup Successful! Please log in.",
      type: "success",
      duration: 3000,
    });
    setIsLoginView(true); // Switch to login view after successful signup
    // Do not close popup, let user log in. If auto-login is desired, call onClose() here.
  };

  const handleSubmit = () => {
    if (isLoginView) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <Box position="fixed" top="0" left="0" w="100%" h="100%" bg="blackAlpha.600" zIndex={1000} />

      {/* Popup Box */}
      <Flex
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="90%" // Responsive width
        maxW="450px" // Max width for larger screens
        minH="300px" // Minimum height
        bg="#282730"
        zIndex={1001} // Ensure popup is above overlay
        p={6} // Padding
        borderRadius="10px"
        direction="column" // Stack elements vertically
        boxShadow="lg" // Add shadow for depth
      >
        {/* Top Row: Title */}
        <Flex justify="center" align="center" mb={6}>
          <Text fontFamily="Poppins" fontWeight="700" color="white" fontSize="24px">
            {isLoginView ? 'Login' : 'Sign Up'}
          </Text>
        </Flex>

        {/* Form */}
        <Flex direction="column" gap={4} flexGrow={1}>
          {/* First Name Input (Only in Sign Up view) */}
          {!isLoginView && (
            <Box>
              <Text as="label" htmlFor="firstName" mb={1} display="block" fontWeight="600" fontSize="16px" color="#B2A5FF">
                First Name:
              </Text>
              <Input
                id="firstName"
                ref={firstNameRef}
                border="0px"
                bg="#45444D"
                color="#CAC6C6"
                _focus={{ borderColor: "#B2A5FF" }}
                placeholder="Enter first name"
                w="100%"
                borderRadius="8px"
                p="12px"
                _placeholder={{ color: "#888" }}
              />
            </Box>
          )}

          {/* Last Name Input (Only in Sign Up view) */}
          {!isLoginView && (
            <Box>
              <Text as="label" htmlFor="lastName" mb={1} display="block" fontWeight="600" fontSize="16px" color="#B2A5FF">
                Last Name:
              </Text>
              <Input
                id="lastName"
                ref={lastNameRef}
                border="0px"
                bg="#45444D"
                color="#CAC6C6"
                _focus={{ borderColor: "#B2A5FF" }}
                placeholder="Enter last name"
                w="100%"
                borderRadius="8px"
                p="12px"
                _placeholder={{ color: "#888" }}
              />
            </Box>
          )}

          {/* Email Input */}
          <Box>
            <Text as="label" htmlFor="email" mb={1} display="block" fontWeight="600" fontSize="16px" color="#B2A5FF">
              Email:
            </Text>
            <Input
              id="email"
              ref={emailRef}
              type="email" // Use email type for better validation/mobile keyboards
              border="0px"
              bg="#45444D"
              color="#CAC6C6"
              _focus={{ borderColor: "#B2A5FF" }} // Use _focus for focus styles
              placeholder="Enter email here"
              w="100%"
              borderRadius="8px"
              p="12px"
              _placeholder={{ color: "#888" }} // Style placeholder
            />
          </Box>

          {/* Password Input */}
          <Box>
            <Text as="label" htmlFor="password" mb={1} display="block" fontWeight="600" fontSize="16px" color="#B2A5FF">
              Password:
            </Text>
            <Input
              id="password"
              ref={passwordRef}
              type="password" // Use password type
              border="0px"
              bg="#45444D"
              color="#CAC6C6"
              _focus={{ borderColor: "#B2A5FF" }} // Use _focus for focus styles
              placeholder="Enter password here"
              w="100%"
              borderRadius="8px"
              p="12px"
              _placeholder={{ color: "#888" }}
            />
             {!isLoginView && (
               <Text fontSize="xs" color="gray.400" mt={1}>Minimum 12 characters</Text>
             )}
          </Box>

          {/* Submit Button */}
          <Button
            mt={4} // Add margin top for spacing
            size={'lg'} // Consistent button size
            onClick={handleSubmit}
            fontFamily="Poppins"
            fontWeight="600"
            color="white"
            bg="#B2A5FF"
            variant="solid"
            fontSize="16px"
            _hover={{ bg: "#9d8bff" }} // Add hover effect
            w="100%" // Make button full width
          >
            {isLoginView ? 'Login' : 'Sign Up'}
          </Button>

          {/* Switch View Link */}
          <Text textAlign="center" mt={4}>
            <Link
              color="#B2A5FF"
              fontWeight="600"
              onClick={() => setIsLoginView(!isLoginView)}
              _hover={{ textDecoration: 'underline' }} // Add underline on hover
            >
              {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </Link>
          </Text>
        </Flex>
         {/* Optional: Add a close button if needed, though onClose is usually triggered by successful action or clicking overlay */}
         {/* <Button position="absolute" top="10px" right="10px" onClick={onClose}>Close</Button> */}
      </Flex>
    </>
  );
}

export default LoginSignup;