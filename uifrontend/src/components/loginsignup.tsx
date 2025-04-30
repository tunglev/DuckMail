// Popup.tsx
import { Box, Button, Flex, Input, Text, Link } from '@chakra-ui/react';
import { useRef, useState } from 'react'; // Import useState
import { toaster } from "@/components/ui/toaster";
import { authApi, AuthUser } from '../services/api'; // Import AuthUser type

interface PopupProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void; // Add callback for successful login
}

function LoginSignup({ open, onClose, onLoginSuccess }: PopupProps) { // Destructure onLoginSuccess
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null); // Add ref for First Name
  const lastNameRef = useRef<HTMLInputElement>(null);  // Add ref for Last Name
  const usernameRef = useRef<HTMLInputElement>(null); // Add ref for Username
  const [isLoginView, setIsLoginView] = useState(true); // State to toggle views
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  if (!open) return null;

  const handleLogin = async () => { // Make async
    // Use usernameRef for login view now
    if (!usernameRef.current || !passwordRef.current) {
      return;
    }

    // Use usernameRef value for login
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!username || !password) {
       toaster.create({
        description: "Username and Password cannot be empty.", // Updated message
        type: "error",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true); // Set loading true

    try {
      // Send username from usernameRef
      const user = await authApi.login({ username: username, password });
      console.log("Logged in user:", user); // Log user data on success
      toaster.create({
        description: "Login Successful!",
        type: "success",
        duration: 3000,
      });
      onLoginSuccess(user); // Call the success callback with user data
      // onClose(); // onClose will be called by the parent component now
    } catch (err: any) {
      console.error("Login failed:", err);
      toaster.create({
        // Slightly more specific error hint
        description: err.message === 'Invalid credentials'
          ? "Login failed. Please check your username and password."
          : err.message || "Login failed. An unknown error occurred.",
        type: "error",
        duration: 5000, // Longer duration for errors
      });
    } finally {
      setIsLoading(false); // Set loading false
    }
  };

  const handleSignup = async () => { // Make async
    // Use emailRef for signup view
    if (!emailRef.current || !passwordRef.current || !firstNameRef.current || !lastNameRef.current || !usernameRef.current) {
      return;
    }

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const firstName = firstNameRef.current.value.trim(); // Get first name
    const lastName = lastNameRef.current.value.trim();   // Get last name
    const username = usernameRef.current.value.trim(); // Get username

    // ... existing signup validation ...
    if (!firstName || !lastName || !username) { // Validate username too
      toaster.create({
        description: "First Name, Last Name, and Username cannot be empty.",
        type: "error",
        duration: 3000,
      });
      return;
    }

     if (username.length < 3) { // Example username validation
        toaster.create({
            description: "Username must be at least 3 characters long.",
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
    // ... end existing signup validation ...

    setIsLoading(true); // Set loading true

    try {
      // Call the register API - username comes from usernameRef here too
      await authApi.register({ username, email, firstName, lastName, password });
      console.log("Signing up with:", firstName, lastName, username, email, password);

      toaster.create({
        description: "Signup Successful! Please log in.",
        type: "success",
        duration: 3000,
      });
      setIsLoginView(true); // Switch to login view after successful signup
    } catch (err: any) {
      console.error("Signup failed:", err);
      toaster.create({
        description: err.message || "Signup failed. Please try again.",
        type: "error",
        duration: 5000,
      });
    } finally {
      setIsLoading(false); // Set loading false
    }
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

           {/* Username Input (Used in BOTH Sign Up and Login views) */}
           {/* Always show username field now */}
            <Box>
              <Text as="label" htmlFor="username" mb={1} display="block" fontWeight="600" fontSize="16px" color="#B2A5FF">
                Username: {/* Label is always Username */}
              </Text>
              <Input
                id="username"
                ref={usernameRef} // Use usernameRef for both login and signup username
                border="0px"
                bg="#45444D"
                color="#CAC6C6"
                _focus={{ borderColor: "#B2A5FF" }}
                placeholder={isLoginView ? "Enter your username" : "Choose a username"} // Placeholder changes
                w="100%"
                borderRadius="8px"
                p="12px"
                _placeholder={{ color: "#888" }}
              />
               {!isLoginView && ( // Show hint only in signup
                 <Text fontSize="xs" color="gray.400" mt={1}>Minimum 3 characters</Text>
               )}
            </Box>

          {/* Email Input (Only in Sign Up view) */}
          {!isLoginView && (
            <Box>
              <Text as="label" htmlFor="email" mb={1} display="block" fontWeight="600" fontSize="16px" color="#B2A5FF">
                Email: {/* Label is always Email */}
              </Text>
              <Input
                id="email"
                ref={emailRef} // Use emailRef only for signup email
                type={"email"} // Always email type
                border="0px"
                bg="#45444D"
                color="#CAC6C6"
                _focus={{ borderColor: "#B2A5FF" }}
                placeholder={"Enter email here"} // Placeholder is always for email
                w="100%"
                borderRadius="8px"
                p="12px"
                _placeholder={{ color: "#888" }}
              />
            </Box>
          )}

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
            isLoading={isLoading} // Add isLoading prop
            disabled={isLoading} // Disable button when loading
            fontFamily="Poppins"
            fontWeight="600"
            color="white"
            bg="#B2A5FF"
            variant="solid"
            fontSize="16px"
            _hover={{ bg: "#9d8bff" }} // Add hover effect
            w="100%" // Make button full width
          >
            {isLoading ? 'Processing...' : (isLoginView ? 'Login' : 'Sign Up')} {/* Show loading text */}
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