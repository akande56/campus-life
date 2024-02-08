import React, { FormEvent, useState } from 'react';
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Stack, Flex,
    useToast,
    Center, Text, Spacer
} from '@chakra-ui/react';
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom';  // Updated import
import { BaseApiUrl } from '../../../../utils/envKeys/keys';
import AuthLayout from '../Authlayout';
import CustomInput from '../../../Reuseables/Input';
import SolidButton from '../../../Reuseables/SolidButton';

interface RegistrationValues {
    username: string;
    password: string;
}

interface ValidationFunction {
    (value: string): string;
}

export default function Login() {

    const [loading, setLoading] = useState(false);
    const [csrftoken, setToken] = useState("");
    const navigate = useNavigate();  // Initialize useNavigate

    const [values, setValues] = useState<RegistrationValues>({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState<Partial<RegistrationValues>>({});
    const toast = useToast();

    const validatePassword: ValidationFunction = (value) => {
        if (!value || value.length < 6) {
            return 'Password must be 11 characters!';
        }
        return '';
    };

    const validateUsername: ValidationFunction = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
            return 'Please enter a valid email address!';
        }
        return '';
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const newErrors: Partial<RegistrationValues> = {};

        // Validate each field
        Object.entries(values).forEach(([key, value]: [string, string]) => {
            let error: string = '';

            switch (key) {
                case 'username':
                    error = validateUsername(value);
                    break;
                case 'password':
                    error = validatePassword(value);
                    break;
                default:
                    break;
            }

            if (error) {
                newErrors[key as keyof RegistrationValues] = error;
            }
        });

        // If there are validation errors, set the errors and stop form submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        fetch('http://127.0.0.1:8003/api/v1/student/get-csrf-token', {
            method: 'GET',
            credentials: 'include',  // Include cookies in the request
        })
            .then(response => response.json())
            .then(data => {
                const csrfToken = data.csrf_token;
                setToken(csrfToken)
            })
            .catch(error => console.error('Error fetching CSRF token:', error));
        setLoading(true);

        try {
            const response = await axios.post(
                'http://127.0.0.1:8003/auth-token',
                {
                    username: values.username,
                    password: values.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                    withCredentials: true,
                }
            );

            const { token } = response.data;

            localStorage.setItem('token', token);

            toast({
                title: 'Login successful',
                status: 'success',
                duration: 3000,
                position: "top",
            });

            // Use navigate to go to the '/dashboard' route
            navigate('/dashboard');

        } catch (error: unknown) {
            console.error('Login failed', error);

            toast({
                title: 'Login Failed',
                description: error instanceof Error && error.message === "Network Error" ? "Internal Server error" : error instanceof Error && error.message === "Request failed with status code 400" ? "Incorrect email or password, please try again" : "An error occurred, please try again",
                status: 'error',
                duration: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    return (
        <Center>
            <AuthLayout height="552px" formHeading='Sign in' children={
                <Stack padding={10} width="100%" align="center">
                    <form onSubmit={handleSubmit}>
                        <Stack gap="16px" >
                            <FormControl isInvalid={!!errors.username}>
                                <FormLabel fontWeight={800}>Email</FormLabel>
                                <CustomInput type="text" name="username" value={values.username} onChange={handleChange}
                                />
                                <FormErrorMessage>{errors.username}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.password}>
                                <FormLabel fontWeight={800}>Password</FormLabel>
                                <CustomInput onChange={handleChange} value={values.password} type='password' name='password' />
                                <FormErrorMessage>{errors.password}</FormErrorMessage>
                            </FormControl>
                            <SolidButton bgColor="#2BE4AC" buttonText="Login" isLoading={loading} type='submit' />

                            <Flex gap={5}>
                                <Text textAlign="start">Don't have an account? <NavLink style={{ fontWeight: "bold", color: "#15CA94" }} to="/sign-up">Create account </NavLink></Text>
                                <Spacer />
                                <Link to="/password-reset">
                                    <Text color="#15CA94">Forgot password?</Text>
                                </Link>
                            </Flex>
                        </Stack>
                    </form>
                </Stack>
            } />

        </Center>
    );
}
