import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbMoodEmptyFilled } from "react-icons/tb";
import { Box, Heading, Text, Stack, useMediaQuery, Image, Center, HStack, List, ListItem, InputGroup, Input, InputRightElement, Flex, Icon } from "@chakra-ui/react";
import IliasImage from "../../../assets/usman.jpg";
import JblinksImage from "../../../assets/isaac-jblinks.jpg";
import AdocheImage from "../../../assets/adoche.png";
import TestimonialCard from "../../Sections/Cards/TestimonialCard";
import DocIcon from "../../../assets/octicon_log-16.svg";
import TrendIcon from "../../../assets/trend-icon.svg";
import CopyIcon from "../../../assets/copy-icon.svg";
import BackgroundImage from "../../../assets/graduating-students-atbu.jpg";
import { primaryColor } from "../../Core/Colors/colors";
import { FAQLinks, SupportLinks, aboutLinks } from "./links";
import SolidButton from "../../Reuseables/SolidButton";
import LandingPageNavIndex from "../../Navigation/LandingpageIndex";
import SearchComponent from "../../Core/Helpers/SearchHelper";
import { mediaData } from "../../../utils/mediaData";
import SinglePostCardLayout from "../../Sections/Cards/SinglePostCard";


type itemProps = {
    id: number;
    title: string;
    date: string;
    user: string;
    image: string;
    level: number;
}

export default function HomePage() {
    const [isMobile] = useMediaQuery("(max-width: 650px)")
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredData, setFilteredData] = useState<itemProps[]>([])

    function handleSearch() {

    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
        // Use the callback form to ensure you're working with the latest state
        setFilteredData(() => {
            const filtered = mediaData.filter(item =>
                item.title.toLowerCase().includes(event.target.value.toLowerCase())
            );
            return filtered;
        });
    }

    return (
        <Box>
            <LandingPageNavIndex />
            {/* You can edit and update the hero section here */}
            <Box bgSize="cover" bgImage={BackgroundImage} h={"700px"} minH={600}>
                <HStack width="full" height="100%" bg="rgba(0, 0, 10, 0.7)" justify="center" align="center" wrap="wrap">
                    <Center height="100%">
                        <Flex wrap="wrap">
                            <Stack align="center" justify="center">
                                <Stack padding={["10px", "10px", "0px"]} w={["auto", "auto", "633px"]} justify="center" align="center">
                                    <Heading color="white" lineHeight="101.99%" fontSize="56px">Empower Your <span style={{ color: primaryColor }}>Academic Journey</span> with Memories</Heading>
                                    <Text color="white">Welcome to AcademicHub, where we effortlessly capture and share your standout achievements, skills, and memorable experiences in a laid-back and user-friendly environment. It's like your academic journey's personal scrapbook - just snap, tag, and share!</Text>
                                </Stack>
                                <SearchComponent alignSelf={["center", "center", "start"]} onChange={handleChange} handleSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                                <Box zIndex={10} alignSelf="center">
                                    <Flex>
                                        {searchTerm.length >= 1 && filteredData.length >= 1 &&
                                            <Flex mt="-5px" ml="-30px" bg="white" padding={5} gap={5} css={{
                                                '&::-webkit-scrollbar': {
                                                    width: '0.5em',
                                                },
                                                '&::-webkit-scrollbar-thumb': {
                                                    backgroundColor: 'transparent',
                                                },
                                            }} overflow="scroll" width={filteredData.length <= 0 ? ["full", "full", "600px"] : ["full", "full", "600px"]} maxHeight="500px" minHeight="300px" wrap="wrap" align="center" justify="center" >
                                                {filteredData.map((item) => {
                                                    return (
                                                        <Link key={item.id} to="user/isaac-yerima">
                                                        <SinglePostCardLayout  name={item.title} date={item.date} image={item.image} title={item.title} />
                                                        </Link>
                                                    )
                                                })}
                                            </Flex>
                                        }
                                    </Flex>
                                    {
                                        filteredData.length <= 0 && searchTerm.length >= 1 &&
                                        <Center borderRadius={8} mt="-5px" ml="-30px" width="600px" bg="white" flexDirection="column" height="250px" justifySelf="start" alignSelf="start" >
                                            <Icon fontSize={"50px"} as={TbMoodEmptyFilled} />
                                            <Heading textAlign="center" >No post found</Heading>
                                        </Center>
                                    }
                                </Box>
                            </Stack>
                        </Flex>
                    </Center>
                </HStack>
            </Box >

            <section>
                <Center margin={isMobile ? "50px 0px" : "100px 0px"} flexWrap="wrap" flexDirection="column">
                    <Stack>
                        <Heading textAlign="start">Our Features</Heading>
                        <Box padding="30px" width={isMobile ? "auto" : "900px"} borderTop="5px solid #9B9696">
                            <Stack padding="10px 0px 10px 20px" borderLeft="2px solid #2DF8BB" bgColor="#F9F9F9">
                                <Text >1. Seamless Achievement Logging</Text>
                            </Stack>
                            <Text color="#908D8D">Effortlessly capture and celebrate your victories with our intuitive achievement logging feature. Whether it's academic milestones, project completions, or extracurricular triumphs, easily document and showcase your successes in a snap.</Text>
                        </Box>
                        <Box padding="30px" width={isMobile ? "auto" : "900px"} borderTop="5px solid #9B9696">
                            <Stack padding="10px 0px 10px 20px" borderLeft="2px solid #2DF8BB" bgColor="#F9F9F9">
                                <Text >2. Comprehensive Skill Tracking</Text>
                            </Stack>
                            <Text color="#908D8D">Chart your skill development journey with precision using our comprehensive skill tracking feature. From technical proficiencies to soft skills, AcademicHub empowers you to monitor your growth and highlight the diverse set of skills you're acquiring throughout your academic adventure.</Text>
                        </Box>
                        <Box padding="30px" width={isMobile ? "auto" : "900px"} borderTop="5px solid #9B9696">
                            <Stack padding="10px 0px 10px 20px" borderLeft="2px solid #2DF8BB" bgColor="#F9F9F9">
                                <Text >3. Interactive Experience Journal</Text>
                            </Stack>
                            <Text color="#908D8D">Effortlessly capture and celebrate your victories with our intuitive achievement logging feature. Whether it's academic milestones, project completions, or extracurricular triumphs, easily document and showcase your successes in a snap.</Text>
                        </Box>
                    </Stack>
                </Center>
            </section>

            {/* Section that explains how campus life works */}
            <section>
                <Box>

                    <Stack width="100%" align="center">
                        <Heading m="30px 0px">How it <span style={{ color: primaryColor }}>works</span></Heading>
                        <HStack justify={["center", "center", "initial"]} wrap="wrap" gap="40px">
                            <Stack gap="30px" padding="30px" boxShadow="1px 2px 26px 1px rgba(0, 0, 0, 0.25)" align="center" justify="center" width="345px" height="345px" background="#fff" border="1px solid #C1C1C1" borderRadius="24px">
                                <Image width="50px" src={DocIcon} />
                                <Heading textAlign="center" fontSize="32px">Document Achievements</Heading>
                                <Text textAlign="center">Effortlessly record your academic and extracurricular achievements. AcademicHub makes it simple.</Text>
                            </Stack>

                            <Stack gap="30px" color="#FFF" padding="30px" boxShadow="1px 2px 26px 1px rgba(0, 0, 0, 0.25)" align="center" justify="center" width="345px" height="345px" background="#23B265" border="1px solid #C1C1C1" borderRadius="24px">
                                <Image width="50px" src={TrendIcon} />
                                <Heading textAlign="center" fontSize="32px">Track Skills</Heading>
                                <Text textAlign="center">Map your skill development journey with precision. AcademicHub helps you build a comprehensive skill profile.</Text>
                            </Stack>

                            <Stack gap="30px" padding="30px" boxShadow="1px 2px 26px 1px rgba(0, 0, 0, 0.25)" align="center" justify="center" width="345px" height="345px" background="#fff" border="1px solid #C1C1C1" borderRadius="24px">
                                <Image width="50px" src={CopyIcon} />
                                <Heading textAlign="center" fontSize="32px">Journal Your Experience</Heading>
                                <Text textAlign="center">Capture the richness of your academic experiences through an interactive journal. Craft a vibrant academic story.</Text>
                            </Stack>
                        </HStack>
                    </Stack>
                </Box>
            </section >

            {/* Testimonial section for homepage */}
            <section>
                <Stack gap={10} align={["center", "center", "initial"]} m={"100px 0px"} padding={["0px", "0px", "10px 100px"]} justify="center">
                    <TestimonialCard clientImage={JblinksImage} clientName="Isaac Yerima"
                        message="We love using 'PETWORLD' products.  Environmentally friendly and sustainable. We have the sustainable dog bowls and regularly use the mint scented poo bags which were all such great value for money." />
                    <TestimonialCard ml={["0px", "0px", "auto"]} clientImage={IliasImage} clientName="Ilias"
                        message="We love using 'PETWORLD' products.  Environmentally friendly and sustainable. We have the sustainable dog bowls and regularly use the mint scented poo bags which were all such great value for money." />
                    <TestimonialCard clientImage={AdocheImage} clientName="Adoche"
                        message="We love using 'PETWORLD' products.  Environmentally friendly and sustainable. We have the sustainable dog bowls and regularly use the mint scented poo bags which were all such great value for money." />
                </Stack>
            </section >

            <section style={{ paddingTop: "100px" }}>
                <footer>
                    <Box padding={5} minHeight="480px" bg="#142140">
                        <HStack justify={["base", "center"]} align="center" padding="40px 0px" gap="85px" wrap="wrap">
                            <Stack width={isMobile ? "auto" : "561px"} color="white">
                                <Heading mb="40px">Logo</Heading>
                                <Stack mb="15px" gap="14px">
                                    <Heading>Subcribe Our Newsletter</Heading>
                                    <Text>Be the first one to know about discounts, offers and events Unsubscribe whenever you like.</Text>
                                </Stack>
                                <InputGroup boxShadow="-3px 0px 20px 0px rgba(146, 146, 146, 0.20)" width={isMobile ? "300px" : "550px"}>
                                    <Input
                                        color="blackz"
                                        border="1px solid #000"
                                        borderRadius="10px"
                                        bg="white"
                                        h="3.75rem"
                                        pr='4.5rem'
                                        type='email'
                                        placeholder='Enter your email'
                                    />
                                    <InputRightElement mr="15px" height="100%" width="7.875rem" >
                                        <SolidButton width="100%" fontSize="16px" buttonText="Subscribe now" />
                                    </InputRightElement>
                                </InputGroup>
                            </Stack>
                            {/* Section for the footer links. to add or remove links check the link array in the function local scope */}
                            <List>
                                <Stack gap="25px">
                                    <Heading color="white">About</Heading>
                                    {aboutLinks.map((item) => {
                                        return (
                                            <Link key={item.id} to={item.link}>
                                                <ListItem color="#B1B1B1">{item.title}</ListItem>
                                            </Link>
                                        )
                                    })}
                                </Stack>
                            </List>
                            {/* mapping for support links */}
                            <List>
                                <Stack gap="25px">
                                    <Heading color="white">Support</Heading>
                                    {SupportLinks.map((item) => {
                                        return (
                                            <Link key={item.id} to={item.link}>
                                                <ListItem color="#B1B1B1">{item.title}</ListItem>
                                            </Link>
                                        )
                                    })}
                                </Stack>
                            </List>
                            {/* mapping for faq links */}
                            <List>
                                <Stack gap="25px">
                                    <Heading color="white">FAQ`</Heading>
                                    {FAQLinks.map((item) => {
                                        return (
                                            <Link key={item.id} to={item.link}>
                                                <ListItem color="#B1B1B1">{item.title}</ListItem>
                                            </Link>
                                        )
                                    })}
                                </Stack>
                            </List>
                        </HStack>
                        <Stack align="center" justify="center">
                            <hr style={{ border: "1px solid #B8B8B8", width: "80%", }} />
                            <Text color="white" width="80%">© All Copyright received 2022</Text>
                        </Stack>
                    </Box>
                </footer>
            </section>
        </Box >
    )
}