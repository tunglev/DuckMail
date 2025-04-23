// Popup.tsx
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import { toaster } from "@/components/ui/toaster";

interface PopupProps {
  open: boolean;
  onClose: () => void;
}

function LoginSignup({ open, onClose }: PopupProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleLogin = () => {
    if(!emailRef.current || !passwordRef.current){
      return;
    }

    // CHECK TO SEE IF PASSWORD MATCHES EMAIL

    toaster.create({
      description: "Login Successful!",
      type: "success",
      duration: 3000,
    });
    onClose();
  };

  const handleSignup = () => {
    if(!emailRef.current || !passwordRef.current){
      return;
    }

    if (emailRef.current.value.trim().length === 0 || !emailRef.current.value.trim().includes('@')) {
      toaster.create({
        description: "Invalid Email",
        type: "error",
        duration: 3000,
      });
      return;
    }

    if (passwordRef.current.value.trim().length < 12) {
      toaster.create({
        description: "Length Of Password Less Than 12",
        type: "error",
        duration: 3000,
      });
      return;
    }

    // CREATE USER CODE HERE AFTER HASHING PASSWORD

    toaster.create({
      description: "Signup Successful!",
      type: "success",
      duration: 3000,
    });
    onClose();
  };

  return (
    <>
      <Box position="absolute" w="100%" h="110%" bg="#1A191E" zIndex={4} />

      <Box
        position="absolute"
        w="68vh"
        h="45vh"
        bg="#282730"
        zIndex={10}
        p={8}
        mb={50}
        borderRadius="10px"
      >
        {/* Top Row: Text */}
        <Flex justify="space-between" align="center" mb={6}>
          <Text mb="10px" fontFamily="Poppins" fontWeight="700" color="white" fontSize="24px">
            Login <Text as={'a'} fontWeight="600" color="#B2A5FF">|</Text> Signup
          </Text>
        </Flex>

        {/* Centered Form */}
        <Flex mt={-3} direction="column" gap={4}>
          {/* Email Input */}
          <Text as="span" mb={-4} textJustify="left" fontWeight="600" fontSize="16px" color="#B2A5FF">
            Email:
          </Text>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" height="5vh" gap="0px" textAlign="left" fontFamily="Poppins" fontWeight="600" color="white" bg="#45444D" fontSize="14px" borderRadius="8px" p="12px">
            <Input ref={emailRef} border="0px" color="#CAC6C6" focusRingColor="transparent" placeholder="Enter email here" w="100%" />
          </Box>

          {/* Password Input */}
          <Text as="span" mt={-1} mb={-4} fontWeight="600" fontSize="16px" color="#B2A5FF">
              Password:
          </Text>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" height="5vh" gap="0px" textAlign="left" fontFamily="Poppins" fontWeight="600" color="white" bg="#45444D" fontSize="14px" borderRadius="8px" p="12px">
            <Input ref={passwordRef} border="0px" color="#CAC6C6" focusRingColor="transparent" placeholder="Enter password here" w="100%" />
          </Box>

          {/* Login and Signup Buttons */}
          <Flex justify="center" align="center" mt={8} gap={12}>
            <Button size={'xl'} onClick={handleLogin} fontFamily="Poppins" fontWeight="600" color="white" bg="#B2A5FF" variant="solid" fontSize="16px">
              Login
            </Button>
            <Button size={'xl'} onClick={handleSignup} fontFamily="Poppins" fontWeight="600" color="white" bg="#B2A5FF" variant="solid" fontSize="16px">
              Signup
            </Button>
        </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default LoginSignup;