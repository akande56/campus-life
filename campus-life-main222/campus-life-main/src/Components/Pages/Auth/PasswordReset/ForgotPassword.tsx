import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Stack, Box,
    useToast,
    Text,
} from '@chakra-ui/react';
import AuthLayout from "../Authlayout";
import { NavLink, } from 'react-router-dom';
import CustomInput from '../../../Reuseables/Input';
import SolidButton from '../../../Reuseables/SolidButton';
import { useState } from 'react';
import { BaseApiUrl } from '../../../../utils/envKeys/keys';
import axios from 'axios';



interface ValidationFunction {
    (value: string): string;
}


export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');

    const toast = useToast();


    const validateEmail: ValidationFunction = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
            return 'Please enter a valid email address!';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        console.log(loading);

        if (!email.length) {
            setError('Email field cannot be blank')
            setLoading(false)
            return;
        }

        validateEmail(email)


        try {
            const response = await axios.post(
                `${BaseApiUrl}auth-token/`,
                {
                    email_address: email,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            const { token } = response.data;

            localStorage.setItem('token', token);

            toast({
                title: 'Code has been sent to your email address',
                status: 'success',
                duration: 3000,
            });
        } catch (error: unknown) {
            console.error('Password request failed', error);

            toast({
                title: 'Request Failed',
                description: error instanceof Error && error.message,
                status: 'error',
                duration: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmail(value)
        setError('')
    };

    return (
        <Box>
            <AuthLayout formHeading='Forgot Password' height="552px" children={
                <form method='get' action='' onSubmit={handleSubmit}>
                    <Stack gap="39px" width="100%" padding={10} align="center" justify="center">
                        <FormControl isInvalid={!!error}>
                            <FormLabel fontWeight={800}>Your account email</FormLabel>
                            <CustomInput type="email" name="email" value={email} onChange={handleChange}
                            />
                            <FormErrorMessage>{error}</FormErrorMessage>
                        </FormControl>
                        <Box width="100%">
                            <SolidButton isLoading={loading} type='submit' buttonText='Reset Password' />
                        </Box>
                        <Box>
                            <Text textAlign="center">Return to <NavLink style={{ fontWeight: "bold", color: "#15CA94" }} to="/sign-in">Login</NavLink></Text>
                        </Box>
                    </Stack>
                </form>
            } />
        </Box>
    )
}