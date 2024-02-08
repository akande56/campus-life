import { Box, Heading, FormControl, FormLabel, Input, Button, Center, Alert, AlertIcon, useMediaQuery } from '@chakra-ui/react';
import React, { ChangeEventHandler } from 'react';
import AuthLayout from '../Pages/Auth/Authlayout';

interface RegistrationFormProps {
    onRegister: (registrationNumber: string, password: string) => void;
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string | null>>;
    registrationNumber: string;
    setRegistrationNumber: React.Dispatch<React.SetStateAction<string | null>>;
    handleRegister: () => void;
    value: string;
    handleSubmit: () => void;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function SignUpForm(props: RegistrationFormProps) {
    const [mobileDevice] = useMediaQuery('(max-width: 650px)')


    return (
        <Center>
            <AuthLayout children={
                <Box boxShadow="2px 0px 16px 1px rgba(226,232,240,0.57)" w={!mobileDevice ? "600px" : "95vw"} m={6} p={6} borderRadius="lg">
                    <Heading as="h2" size="xl" mb={4}>
                        Registration
                    </Heading>
                    {props.error && (
                        <Alert status="error" mb={4}>
                            <AlertIcon />
                            {props.error}
                        </Alert>
                    )}
                    <FormControl id="registrationNumber" mb={4}>
                        <FormLabel>Registration Number</FormLabel>
                        <Input
                            type="text"
                            placeholder="Enter your registration number"
                            value={props.registrationNumber}
                            name='registrationNumber'
                            onChange={(e) => props.setRegistrationNumber(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password" mb={6}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={props.value}
                            onChange={props.onChange}
                        />
                    </FormControl>
                    <Button colorScheme="teal" onClick={props.handleSubmit}>
                        Register
                    </Button>
                </Box>
            } />

        </Center>
    );
}