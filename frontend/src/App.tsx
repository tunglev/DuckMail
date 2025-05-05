import { useState, useEffect } from 'react'; // Import useEffect
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';

import { Heading, Text, Box, Button, Flex } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
// import SettingsIcon from './assets/icons/SettingsButton.svg';
import ClockIcon from './assets/icons/Clock.svg';
import GridIcon from './assets/icons/Grid.svg';
import MailIcon from './assets/icons/Mail.svg';
import CommentsIcon from './assets/icons/Comments.svg';
import DropdownIcon from './assets/icons/Dropdown.svg';
import UpdownIcon from './assets/icons/Updown.svg';

import ComposePopup from './components/composepopup.tsx';
import LoginSignup from './components/loginsignup.tsx';
import UserProfilePopup from './components/UserProfilePopup.tsx'; // Import UserProfilePopup
import { authApi, AuthUser, messageApi } from './services/api.ts'; // Import authApi and AuthUser

function App() {
  const [composeOpen, setComposeOpen] = useState(false);
  const [loginSignupOpen, setLoginSignupOpen] = useState(true); // Start with login open
  const [profileOpen, setProfileOpen] = useState(false); // State for profile popup
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null); // State for logged-in user
  const [filterState, setFilterState] = useState('All');

  const notificationData = [];

  const [buttonsData, setButtonsData] = useState(notificationData);

  // Check for existing logged-in user on component mount
  useEffect(() => {
    const user = authApi.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setLoginSignupOpen(false); // Don't show login if already logged in
    } else {
      setLoginSignupOpen(true); // Show login if no user found
    }

    fetchUserMessages();
  }, []);

  const fetchUserMessages = async () => {
    try {
      const user = currentUser || authApi.getCurrentUser();
      
      if (!user) {
        setLoginSignupOpen(true);
        return;
      }
      
      // Use email instead of username to fetch messages
      const data = await messageApi.getUserMessages(user.email);

      const messageArr: any = [];
      data.forEach((elem) => {
        messageArr.push({
          recipient: elem.recipient,
          sender: elem.sender,
          type: elem.type,
          priority: elem.priority,
          subject: elem.subject,
          text: elem.body,
          active: false
        });
      });

      setButtonsData(messageArr);
    } catch (err) {
      console.log('Failed to fetch messages: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleComposeClose = () => {
    console.log("handleComposeClose called. Setting composeOpen to false.");
    setComposeOpen(false);
  };
  const handleComposeOpen = () => {
    console.log("handleComposeOpen called. Setting composeOpen to true.");
    console.log("Current user when opening compose:", currentUser);
    setComposeOpen(true);
  };

  // const handleLoginSignupClose = () => setLoginSignupOpen(false); // We'll close it via handleLoginSuccess

  const handleProfileOpen = () => setProfileOpen(true);
  const handleProfileClose = () => setProfileOpen(false);

  const handleLoginSuccess = (user: AuthUser) => {
    console.log("handleLoginSuccess called with user:", user);
    setCurrentUser(user); // Set the current user state
    setLoginSignupOpen(false); // Close the login popup
  };

  const handleLogout = () => {
    authApi.logout(); // Clear user data from storage
    setCurrentUser(null); // Clear user state
    setProfileOpen(false); // Close profile popup if open
    setLoginSignupOpen(true); // Show login popup again
  };

  const handleToggle = (indexInFiltered: number) => {
    // Get index in buttonsData
    const filteredButtons = buttonsData.filter(
      (button) => filterState === 'All' || button.type === filterState
    );

    const buttonToUpdate = filteredButtons[indexInFiltered];
    const indexInFullList = buttonsData.findIndex(
      (b) => b.subject === buttonToUpdate.subject && b.type === buttonToUpdate.type
    );

    const updatedButtons = [...buttonsData];
    updatedButtons[indexInFullList].active = !updatedButtons[indexInFullList].active;
    setButtonsData(updatedButtons);
  };

  const filteredButtons = buttonsData.filter(
    (button) => filterState === 'All' || button.type === filterState
  );

  // Log state on every render
  console.log("App rendering. currentUser:", currentUser, "composeOpen:", composeOpen, "profileOpen:", profileOpen, "loginSignupOpen:", loginSignupOpen);

  return (
    <>
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        p="20px"
      >
        <Heading fontFamily="Poppins" fontWeight="700" color="white" fontSize="32px" zIndex={6}>
          Duck{' '}
          <Text as="span" color="#B2A5FF">
            Mail
          </Text>
        </Heading>

        {/* Show buttons only if logged in */}
        {currentUser && (
          <Flex gap="10px">
            <Button onClick={handleComposeOpen} fontFamily="Poppins" fontWeight="600" color="white" bg="#B2A5FF" variant="solid" fontSize="16px">
              Compose
            </Button>
            <Button onClick={handleProfileOpen} fontFamily="Poppins" fontWeight="600" color="white" bg="#B2A5FF" variant="solid" fontSize="16px">
              View Profile
            </Button>
            <Button onClick={handleLogout} fontFamily="Poppins" fontWeight="600" color="white" bg="#B2A5FF" variant="solid" fontSize="16px">
              Logout
            </Button>
          </Flex>
        )}
      </Flex>

      {/* Main Content Area - Show only if logged in */}
      {currentUser && (
        <Flex
          justify="center"  // Center horizontally
          align="center"    // Center vertically
          minHeight="85vh"  // Full screen height
          gap="0px"         // Space between the two boxes
        >
          {/* Filter Box */}
          <Box
            p="20px"
            borderRadius="8px"
            minHeight={'75vh'}
            minWidth={'25vh'}
            bg="#212026"
          >
            {/* ... existing filter buttons ... */}
             <Text mb="25px" fontFamily="Poppins" fontWeight="700" color="white" fontSize="19px">Filters</Text>
            <Flex direction="column" gap="12px">
              <Button display="flex"
                alignItems="center"
                justifyContent="flex-start"
                width="100%"  // Ensures full width for alignment
                gap="10px"
                textAlign="left"
                fontFamily="Poppins"
                fontWeight="600"
                color="#FFC400"
                bg={filterState === 'All' ? '#b28a0d' : '#373122'}
                variant="solid"
                fontSize="14px"
                borderRadius="12px"
                onClick={() => setFilterState('All')}>
                <img src={GridIcon} alt="Icon" />
                All Notifications
              </Button>
              <Button display="flex"
                alignItems="center"
                justifyContent="flex-start"
                width="100%"  // Ensures full width for alignment
                gap="10px"
                textAlign="left"
                fontFamily="Poppins"
                fontWeight="600"
                color="#30C04F"
                bg={filterState === 'Policy' ? '#2b8840' : '#23302a'}
                variant="solid"
                fontSize="14px"
                borderRadius="12px"
                onClick={() => setFilterState('Policy')}>
                <img src={MailIcon} alt="Icon" />
                Policy Notifications
              </Button>
              <Button display="flex"
                alignItems="center"
                justifyContent="flex-start"
                width="100%"  // Ensures full width for alignment
                gap="10px"
                textAlign="left"
                fontFamily="Poppins"
                fontWeight="600"
                color="#A649DA"
                bg={filterState === 'News' ? '#783a9b' : '#2f2438'}
                variant="solid"
                fontSize="14px"
                borderRadius="12px"
                onClick={() => setFilterState('News')}>
                <img src={CommentsIcon} alt="Icon" />
                News Notifications
              </Button>
              <Button display="flex"
                alignItems="center"
                justifyContent="flex-start"
                width="100%"  // Ensures full width for alignment
                gap="10px"
                textAlign="left"
                fontFamily="Poppins"
                fontWeight="600"
                color="#056DFA"
                bg={filterState === 'Claim' ? '#0f52af' : '#1e283b'}
                variant="solid"
                fontSize="14px"
                borderRadius="12px"
                onClick={() => setFilterState('Claim')}>
                <img src={ClockIcon} alt="Icon" />
                Claim Notifications
              </Button>
            </Flex>
          </Box>

          {/* Notification List Box */}
          <Box
            p="20px"
            borderRadius="8px"
            minHeight={'75vh'}
            maxHeight={'75vh'}
            minWidth={'125vh'}
            maxWidth={'125vh'}
            overflowY="auto"
            bg="#282730"
          >
            {/* ... existing notification rendering logic ... */}
             <Text mb="20px" fontFamily="Poppins" fontWeight="700" color="white" fontSize="19px">Notifications</Text>
            <Flex direction="column" gap="10px">

            {filteredButtons.map((button, index) => (
              <Button display="flex"
              key={index}
              onClick={() => handleToggle(index)}
              alignItems="center"
              justifyContent="space-between"  // Spread out the text and icon
              width="100%"  // Ensures button takes full width
              // height="15vh"
              height={button.active ? 'auto' : '5vh'}
              gap="10px"
              textAlign="left"
              fontFamily="Poppins"
              fontWeight="600"
              color="white"
              bg="#45444D"
              variant="solid"
              fontSize="14px"
              borderRadius="8px"
              p="12px">
                <Flex direction="column" gap={button.active === true ? "5px" : "0px"}>
                <Flex gap="25px">
                  <Text><Text as="span" color="#B2A5FF">Type: </Text>{button.type}</Text>
                  <Text><Text as="span" color="#B2A5FF">Priority: </Text>{button.priority}</Text>
                  <Text><Text as="span" color="#B2A5FF">Sender: </Text>{button.sender}</Text>
                  <Text><Text as="span" color="#B2A5FF">Subject: </Text>{button.subject}</Text>
                </Flex>

                {button.active && (
                  <Text color="white" wordBreak="break-word" whiteSpace="normal">
                    <Text as="span" fontWeight="600" fontSize="14px" color="#B2A5FF">Message: </Text><Text as="span" fontWeight="500" fontSize="13px">{button.text}</Text>
                  </Text>
                )}
                </Flex>

              <img src={button.active === true ? UpdownIcon : DropdownIcon} alt="Icon" />
              </Button>
            ))}
            </Flex>
          </Box>
        </Flex>
      )}

      {/* Popups */}
      <Toaster />
      {/* Pass handleLoginSuccess to LoginSignup */}
      <LoginSignup open={loginSignupOpen} onClose={() => setLoginSignupOpen(false)} onLoginSuccess={handleLoginSuccess} />
      {/* Render ComposePopup only if logged in */}
      {console.log("Checking render condition for ComposePopup:", { shouldRender: !!currentUser && composeOpen, currentUserExists: !!currentUser, composeOpen })}
      {currentUser && <ComposePopup open={composeOpen} onClose={handleComposeClose} buttonsData={buttonsData} setButtonsData={setButtonsData} user={currentUser} fetchUserMessages={fetchUserMessages} />}
      {/* Render UserProfilePopup */}
      <UserProfilePopup open={profileOpen} onClose={handleProfileClose} user={currentUser} />

    </>
  )
}

export default App