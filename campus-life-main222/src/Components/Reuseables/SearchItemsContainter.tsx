import { Box, Heading, Center, Flex, Icon } from "@chakra-ui/react";
import SinglePostCardLayout from "../Sections/Cards/SinglePostCard";
import { TbMoodEmptyFilled } from "react-icons/tb";



type itemDataProps = {
    id: number;
    title: string;
    date: string;
    user: string;
    image: string;
    level: number;
}

interface itemProps {
    searchTerm: string;
    filteredData: itemDataProps[]

}

export default function SearchItemsContainter(props: itemProps) {
    return (
        <Box alignSelf="center">
            <Flex>
                {props.searchTerm.length >= 1 && props.filteredData.length >= 1 &&
                    <Flex ml="" bg="white" padding={5} gap={5} css={{
                        '&::-webkit-scrollbar': {
                            width: '0.5em',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'transparent',
                        },
                    }} overflow="scroll" width={props.filteredData.length <= 0 ? ["full", "full", "600px"] : ["full", "full", "600px"]} maxHeight="500px" minHeight="300px" wrap="wrap" align="center" justify="center" >
                        {props.filteredData.map((item) => {
                            return (
                                <SinglePostCardLayout key={item.id} name={item.title} date={item.date} image={item.image} title={item.title} />
                            )
                        })}
                    </Flex>
                }
            </Flex>
            {
                props.filteredData.length <= 0 && props.searchTerm.length >= 1 &&
                <Center borderRadius={8} mt="-5px" ml="0px" width="100%" bg="white" flexDirection="column" height="250px" justifySelf="start" alignSelf="start" >
                    <Icon fontSize={"50px"} as={TbMoodEmptyFilled} />
                    <Heading textAlign="center" >No post found</Heading>
                </Center>
            }
        </Box>
    )
}