import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import { Heading, Text, Box, Button, Flex } from "@chakra-ui/react"
// import SettingsIcon from './assets/icons/SettingsButton.svg';
import ClockIcon from './assets/icons/Clock.svg';
import GridIcon from './assets/icons/Grid.svg';
import MailIcon from './assets/icons/Mail.svg';
import CommentsIcon from './assets/icons/Comments.svg';
import DropdownIcon from './assets/icons/Dropdown.svg';
import UpdownIcon from './assets/icons/Updown.svg';

import Popup from './components/popup';

function App() {
  const [filterState, setFilterState] = useState('All');
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const notificationData = [
    {
      type: 'Policy',
      priority: 'High',
      subject: 'Important Update Regarding Policy #5585-2274',
      text: 'Policy Button 1',
      active: false
    },
    {
      type: 'News',
      priority: 'Low',
      subject: 'Breaking News about Policies',
      text: 'News Button 1',
      active: false
    },
    {
      type: 'Claim',
      priority: 'Medium',
      subject: 'New Claim Filed',
      text: 'Claim Button 1',
      active: false
    },
    {
      type: 'Policy',
      priority: 'High',
      subject: 'New Policy Update #5585-2280',
      text: 'Policy Button 2',
      active: false
    },
    {
      type: 'News',
      priority: 'High',
      subject: 'Latest Updates on Claims',
      text: 'News Button 2',
      active: false
    },
    {
      type: 'Claim',
      priority: 'Low',
      subject: 'Claim Status Updated',
      text: 'Claim Button 2',
      active: false
    },
  ];

  const [buttonsData, setButtonsData] = useState(notificationData);

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

  // const handleToggle = (index: number) => {
  //   const updated = [...buttonData];
  //   updated[index].active = !updated[index].active;
  //   setButtonData(updated);
  // };

  // const [buttons, setButtons] = useState(filteredButtons);

  // const handleButtonClick = (index: number) => {
  //   setButtons((prevButtons) => {
  //     // Toggle the 'active' field of the clicked button
  //     const updatedButtons = [...prevButtons];
  //     updatedButtons[index].active = !updatedButtons[index].active;
  //     return updatedButtons;
  //   });
  // };

  return (
    <>
    {/* <Box>
      <Heading p={'20px'} fontFamily={'Poppins'} fontWeight={'bold'} color={'white'} fontSize={'29px'}>
          Duck <Text as={'a'} color={'#B2A5FF'}>Mail</Text> <Button textAlign={'right'} color={'#B2A5FF'}>Mail</Button>
        </Heading>
    </Box> */}
      
      <Flex
      justify="space-between"
      align="center"
      p="20px"
      // bg="gray.800" // Optional: background color
    >
      <Heading fontFamily="Poppins" fontWeight="700" color="white" fontSize="32px">
        Duck{' '}
        <Text as="span" color="#B2A5FF">
          Mail
        </Text>
      </Heading>

      <Flex gap="10px">
        <Button onClick={onOpen} fontFamily="Poppins" fontWeight="600" color="white" bg="#B2A5FF" variant="solid" fontSize="16px">
          Compose
        </Button>

        {/* <Button fontFamily="Poppins" fontWeight="600" color="white" bg="#B2A5FF" variant="solid" padding={'10px'} fontSize="16px">
          <img src={SettingsIcon} alt="Icon" />
        </Button> */}
      </Flex>
    </Flex>

    <Popup isOpen={isOpen} onClose={onClose} />

    <Flex
      justify="center"  // Center horizontally
      align="center"    // Center vertically
      minHeight="85vh"  // Full screen height
      gap="0px"         // Space between the two boxes
    >
      {/* First vertical box */}
      <Box
        p="20px"
        borderRadius="8px"
        // minHeight={'695px'}
        // minWidth={'259px'}
        minHeight={'75vh'}
        minWidth={'25vh'}
        bg="#212026"
      >
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

      {/* Second vertical box */}
      <Box
        p="20px"
        borderRadius="8px"
        // minHeight={'695px'}
        // minWidth={'956px'}
        minHeight={'75vh'}
        maxHeight={'75vh'}
        minWidth={'125vh'}
        maxWidth={'125vh'}
        overflowY="auto"
        bg="#282730"
      >
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
              <Text><Text as="span" color="#B2A5FF">Subject: </Text>{button.subject}</Text> 
            </Flex>

            {button.active && (
              <Text color="white" wordBreak="break-word" whiteSpace="normal">
                <Text as="span" fontWeight="600" fontSize="14px" color="#B2A5FF">Message: </Text><Text as="span" fontWeight="500" fontSize="13px">Lorem ipsum odor amet, consectetuer adipiscing elit. Cras aliquet posuere metus; mattis tempor venenatis sociosqu cras sit. Est hendrerit libero ipsum libero ridiculus tristique nullam nascetur adipiscing.</Text>
              </Text>
            )}
            </Flex>

          <img src={button.active === true ? UpdownIcon : DropdownIcon} alt="Icon" />
          </Button>
        ))}
        </Flex>
      </Box>
    </Flex>

    </>
  )
}

export default App
