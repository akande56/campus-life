import { Box, Heading, Text, Stack, useMediaQuery, Image, Center, HStack, List, ListItem, InputGroup, Input, InputRightElement, } from "@chakra-ui/react";
import LandingPageHeader from "./Header";
import IliasImage from "../../../assets/usman.jpg";
import JblinksImage from "../../../assets/isaac-jblinks.jpg";
import AdocheImage from "../../../assets/adoche.png";
import TestimonialCard from "../../Sections/Cards/TestimonialCard";
import DocIcon from "../../../assets/octicon_log-16.svg";
import TrendIcon from "../../../assets/trend-icon.svg";
import CopyIcon from "../../../assets/copy-icon.svg";
import LandingPageNavbar from "../../Navigation/HomepageNav";
import { primaryColor } from "../../Core/Colors/colors";
import { FAQLinks, SupportLinks, aboutLinks } from "./links";
import { Link } from "react-router-dom";
import SolidButton from "../../Reuseables/SolidButton";


export default function HomePage() {
    const [isMobile] = useMediaQuery("(max-width: 650px)")

    return (
        <Box>
            <LandingPageNavbar />
            <LandingPageHeader />
            <section>
                <Center flexWrap="wrap" flexDirection="column">
                    <Stack>
                        <Heading textAlign="start">Our Features</Heading>
                        <Box padding="30px" width={isMobile ? "auto" : "900px"} borderTop="5px solid #9B9696">
                            <Stack padding="10px 0px 10px 20px" borderLeft="2px solid #2DF8BB" bgColor="#F9F9F9">
                                <Text >1. Seamless Achievement Logging</Text>
                            </Stack>
                            <Text>Effortlessly capture and celebrate your victories with our intuitive achievement logging feature. Whether it's academic milestones, project completions, or extracurricular triumphs, easily document and showcase your successes in a snap.</Text>
                        </Box>
                        <Box padding="30px" width={isMobile ? "auto" : "900px"} borderTop="5px solid #9B9696">
                            <Stack padding="10px 0px 10px 20px" borderLeft="2px solid #2DF8BB" bgColor="#F9F9F9">
                                <Text >1. Seamless Achievement Logging</Text>
                            </Stack>
                            <Text>Effortlessly capture and celebrate your victories with our intuitive achievement logging feature. Whether it's academic milestones, project completions, or extracurricular triumphs, easily document and showcase your successes in a snap.</Text>
                        </Box>
                        <Box padding="30px" width={isMobile ? "auto" : "900px"} borderTop="5px solid #9B9696">
                            <Stack padding="10px 0px 10px 20px" borderLeft="2px solid #2DF8BB" bgColor="#F9F9F9">
                                <Text >1. Seamless Achievement Logging</Text>
                            </Stack>
                            <Text>Effortlessly capture and celebrate your victories with our intuitive achievement logging feature. Whether it's academic milestones, project completions, or extracurricular triumphs, easily document and showcase your successes in a snap.</Text>
                        </Box>
                    </Stack>
                </Center>
            </section>

            {/* Section that explains how campus life works */}
            <section>
                <Center>
                    <Stack align="center">
                        <Heading m="30px 0px">How it <span style={{ color: primaryColor }}>works</span></Heading>
                        <HStack wrap="wrap" gap="40px">
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
                </Center>
            </section >

            {/* Testimonial section for homepage */}
            <section>
                <Stack mt="200px" padding={isMobile ? "0px" : "10px 100px"} justify="center">
                    <TestimonialCard clientImage={JblinksImage} clientName="Isaac Yerima"
                        message="We love using 'PETWORLD' products.  Environmentally friendly and sustainable. We have the sustainable dog bowls and regularly use the mint scented poo bags which were all such great value for money." />
                    <TestimonialCard ml="auto" clientImage={IliasImage} clientName="Ilias"
                        message="We love using 'PETWORLD' products.  Environmentally friendly and sustainable. We have the sustainable dog bowls and regularly use the mint scented poo bags which were all such great value for money." />
                    <TestimonialCard clientImage={AdocheImage} clientName="Adoche"
                        message="We love using 'PETWORLD' products.  Environmentally friendly and sustainable. We have the sustainable dog bowls and regularly use the mint scented poo bags which were all such great value for money." />
                </Stack>
            </section >

            <section style={{ paddingTop: "100px" }}>
                <footer>
                    <Box minHeight="480px" bg="#142140">
                        <HStack justify="center" align="center" padding="40px 0px" gap="85px" wrap="wrap">
                            <Stack width={isMobile ? "auto" : "561px"} color="white">
                                <Heading mb="40px">Logo</Heading>
                                <Stack mb="15px" gap="14px">
                                    <Heading>Subcribe Our Newsletter</Heading>
                                    <Text>Be the first one to know about discounts, offers and events Unsubscribe whenever you like.</Text>
                                </Stack>
                                <InputGroup boxShadow="-3px 0px 20px 0px rgba(146, 146, 146, 0.20)" width={isMobile ? "300px" : "550px"}>
                                    <Input
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