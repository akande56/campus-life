import React, { SetStateAction, } from 'react';
import { Input, Stack, InputProps, InputGroup, InputLeftElement, Icon, InputRightElement, } from '@chakra-ui/react';
import SolidButton from '../../Reuseables/SolidButton';
import { IoIosSearch } from 'react-icons/io';



interface SearchProps extends InputProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<SetStateAction<string>>;
    handleSearch: () => void;
}

export default function SearchComponent(props: SearchProps) {


    return (
        <Stack alignSelf={props.alignSelf} direction="row" spacing={4} justify="center" align="start">
            <InputGroup boxShadow="-3px 0px 20px 0px rgba(146, 146, 146, 0.20)" width={["auto", "auto", "600px"]}>
                <InputLeftElement height="100%">
                    <Icon color="#9B9696" fontSize="22px" as={IoIosSearch} />
                </InputLeftElement>
                <Input border="1px solid #000" borderRadius="10px" bg="white" h="3.75rem" type='search' placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
                <InputRightElement mr="-10px" height="100%" width="7.875rem" >
                    <SolidButton onClick={props.handleSearch} width="100%" fontSize="16px" buttonText="Search" />
                </InputRightElement>
            </InputGroup>
        </Stack>
    );
}

