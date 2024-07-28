import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/slogo.jpg";
import prisonerManagement from '../images/p.png'
import visitationSchedule from '../images/v.jpg'
import incidentReporting from '../images/i.jpg'
import reportingAnalytics from '../images/r.jpg'
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Image,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import "../styles/Home.css"; // Import the custom CSS file

const Home = () => {
  return (
    <Center
      minH="100vh"
      className="home-container"
      bg="gray.100"
      p={4}
      flexDirection="column"
    >
      <VStack spacing={8} textAlign="center" maxW="800px">
        <Image
          src={logo}
          alt="Jail Management System Logo"
          boxSize="150px"
          mb={4}
          className="logo"
        />
        <Heading as="h1" size="2xl" className="home-heading">
          Welcome to the Detention Center Management System
        </Heading>
        <Text fontSize="lg" className="home-text" px={4}>
          Efficiently manage prisoners, visitation schedules, and incidents with
          our comprehensive jail management system.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={10}>
          <Box className="home-box">
            <Image
              src={prisonerManagement}
              alt="Prisoner Management"
              borderRadius="md"
              mx="auto"
            />
            <Heading as="h3" size="lg" color="whitesmoke" mt={4}>
              Prisoner Management
            </Heading>
            <Text fontSize="md" color="white" mt={2}>
              Track and manage prisoner information, including personal details,
              charges, and sentence details.
            </Text>
          </Box>

          <Box className="home-box">
            <Image
              src={visitationSchedule}
              alt="Visitation Schedule"
              borderRadius="md"
              mx="auto"
            />
            <Heading as="h3" size="lg" color="white" mt={4}>
              Visitation Scheduling
            </Heading>
            <Text fontSize="md" color="white" mt={2}>
              Efficiently manage visitation schedules and keep track of visitor
              logs.
            </Text>
          </Box>

          <Box className="home-box">
            <Image
              src={incidentReporting}
              alt="Incident Reporting"
              borderRadius="md"
              mx="auto"
            />
            <Heading as="h3" size="lg" color="white" mt={4}>
              Incident Reporting
            </Heading>
            <Text fontSize="md" color="white" mt={2}>
              Document and report incidents to ensure a safe and secure
              environment.
            </Text>
          </Box>

          <Box className="home-box">
            <Image
              src={reportingAnalytics}
              alt="Reporting and Analytics"
              borderRadius="md"
              mx="auto"
            />
            <Heading as="h3" size="lg" color="white" mt={4}>
              Reporting & Analytics
            </Heading>
            <Text fontSize="md" color="white" mt={2}>
              Generate comprehensive reports and analytics to gain insights into
              jail operations.
            </Text>
          </Box>
        </SimpleGrid>
      </VStack>
    </Center>
  );
};

export default Home;
