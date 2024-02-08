import { useState } from "react";
import { Box, Flex, Icon, Stack, StackDirection, Text, HStack } from "@chakra-ui/react";
import { navItems } from "./navitems";
import { NavLink, } from "react-router-dom";
import { primaryColor } from "../Core/Colors/colors";

interface NavItemProps {
    direction: StackDirection;
    includeButton: boolean;
    onClick?: () => void;
}

export default function NavItemsRenderer(props: NavItemProps) {
    const [activeItem, setActiveItem] = useState<string | null>(null);


    const handleItemClick = (itemPath: string) => {
        setActiveItem(itemPath);
    };

    return (
        <Stack gap="30px" direction={props.direction}>
            {navItems.map((item) => {
                const isActive = item.title === activeItem;

                return (
                    <Box>
                        <NavLink
                            key={item.id}
                            to={"/" + item.path}
                            onClick={() => handleItemClick(item.title)}
                        >
                            <HStack>
                                {activeItem === item.title &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="37" viewBox="0 0 11 37" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.248718 19.5082C0.2571 31.0322 -0.213395 38.6615 0.248806 36.6899C0.711007 34.7194 4.61904 30.6736 6.85101 27.7053C12.3423 20.4018 12.3771 15.9159 6.98872 9.672C4.7783 7.11178 0.768513 2.1019 0.248837 0.27203C-0.306762 -1.68755 0.240337 7.16707 0.248718 19.5082Z" fill="#2DF8BB" />
                                    </svg>
                                }
                                <Flex
                                    align="center"
                                    gap="19px"
                                    color={isActive ? primaryColor : "grey"}
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
