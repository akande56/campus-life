import { useEffect, useState } from "react";
import { Box, Flex, Icon, Stack, StackDirection, Text, HStack, StackProps } from "@chakra-ui/react";
import { navItems } from "./navitems";
import { NavLink, } from "react-router-dom";
import { primaryColor } from "../Core/Colors/colors";
import { landingPageNavlinks } from "../Pages/LandingPage/navlinks";

interface NavItemProps extends StackProps {
    direction?: StackDirection;
    onClick?: () => void;
}

export default function NavItemsRenderer(props: NavItemProps) {
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const currentURL: string = window.location.href;

    console.log(currentURL);

    const handleItemClick = (itemPath: string) => {
        setActiveItem(itemPath);
        props.onClick!()
    };


    // using the useEffect to manage active state on refresh

    useEffect(() => {

        if (currentURL === "http://localhost:5173/dashboard") {
            setActiveItem("Home")
        } else if (
            currentURL.includes("http://localhost:5173/dashboard/all-files") ||
            currentURL.includes("http://localhost:5173/dashboard/100") ||
            currentURL.includes("http://localhost:5173/dashboard/200") ||
            currentURL.includes("http://localhost:5173/dashboard/300") ||
            currentURL.includes("http://localhost:5173/dashboard/400") ||
            currentURL.includes("http://localhost:5173/dashboard/100") ||
            currentURL.includes("https://campuslife-dev.netlify.app/dashboard/all-file")
        ) {
            setActiveItem("My Files")
        } else if (
            currentURL.includes("http://localhost:5173/dashboard/starred") ||
            currentURL.includes("https://campuslife-dev.netlify.app/dashboard/starred")
        ) {
            setActiveItem("Starred")
        } else if (
            currentURL === "http://localhost:5173/dashboard/file-request" ||
            currentURL.includes("https://campuslife-dev.netlify.app/dashboard/file-request"
            )
        ) {
            setActiveItem("Files Requests")
        } else if (
            currentURL === "http://localhost:5173/dashboard/shared" ||
            currentURL.includes("https://campuslife-dev.netlify.app/dashboard/shared"
            )
        ) {
            setActiveItem("Shared")
        } else if (
            currentURL === "http://localhost:5173/dashboard/deleted" ||
            currentURL.includes("https://campuslife-dev.netlify.app/dashboard/deleted"
            )
        ) {
            setActiveItem("Deleted")
        } else {
            setActiveItem("Home")
        }
    }, [activeItem, currentURL])

    return (
        <Stack gap="30px" direction={props.direction}>
            {navItems.map((item) => {
                const isActive = item.title === activeItem;

                return (
                    <Box key={item.id}>
                        <NavLink
                            to={"/" + item.path}
                            onClick={() => handleItemClick(item.title)}
                        >
                            <HStack>
                                {activeItem === item.title &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="37" viewBox="0 0 11 37" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.248718 19.5082C0.2571 31.0322 -0.213395 38.6615 0.248806 36.6899C0.711007 34.7194 4.61904 30.6736 6.85101 27.7053C12.3423 20.4018 12.3771 15.9159 6.98872 9.672C4.7783 7.11178 0.768513 2.1019 0.248837 0.27203C-0.306762 -1.68755 0.240337 7.16707 0.248718 19.5082Z" fill="#2DF8BB" />
                                    </svg>
                                }
                                <Flex ml="35px"
                                    align="center"
                                    gap="18px"
                                    color={isActive ? primaryColor : "#757897"}
                                    padding="10px"
                                    borderRadius="5px"
                                >
                                    <Icon as={item.icon} />
                                    <Text fontWeight={700} fontSize="20px">
                                        {item.title}
                                    </Text>
                                </Flex>
                            </HStack>
                        </NavLink>
                    </Box>
                );
            })}
        </Stack>
    );
}




export function LandingPageNavItemsRenderer(props: NavItemProps) {
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const handleItemClick = (itemPath: string) => {
        setActiveItem(itemPath);
    };

    return (
        <Flex direction="column">
            {landingPageNavlinks.map((item) => {
                const isActive = item.title === activeItem;

                return (
                    <Box onClick={props.onClick} key={item.id}>
                        <NavLink
                            to={item.path}
                            onClick={() => handleItemClick(item.title)}
                        >
                            <HStack>
                                {activeItem === item.title &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="37" viewBox="0 0 11 37" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.248718 19.5082C0.2571 31.0322 -0.213395 38.6615 0.248806 36.6899C0.711007 34.7194 4.61904 30.6736 6.85101 27.7053C12.3423 20.4018 12.3771 15.9159 6.98872 9.672C4.7783 7.11178 0.768513 2.1019 0.248837 0.27203C-0.306762 -1.68755 0.240337 7.16707 0.248718 19.5082Z" fill="#2DF8BB" />
                                    </svg>
                                }
                                <Flex ml="35px"
                                    align="center"
                                    gap="18px"
                                    color={isActive ? primaryColor : "#757897"}
                                    padding="10px"
                                    borderRadius="5px"
                                >
                                    <Text fontWeight={700} fontSize="20px">
                                        {item.title}
                                    </Text>
                                </Flex>
                            </HStack>
                        </NavLink>
                    </Box>
                );
            })}
        </Flex>
    );
}