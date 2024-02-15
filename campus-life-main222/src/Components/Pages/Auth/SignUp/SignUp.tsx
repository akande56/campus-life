import React, { useState } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Stack, useToast, Center, Text, Box } from '@chakra-ui/react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import AuthLayout from '../Authlayout';
import CustomInput from '../../../Reuseables/Input';
import SolidButton from '../../../Reuseables/SolidButton';
import { BaseApiUrl } from '../../../../utils/envKeys/keys';



interface RegistrationValues {
    reg_number: string;
    email: string;
}

interface ValidationFunction {
    (value: string): string;
}

export default function Registration() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<RegistrationValues>>({});

    const [values, setValues] = useState<RegistrationValues>({
        reg_number: '',
        email: '',
    });

    const toast = useToast();

    const validateregistrationNumber: ValidationFunction = (value) => {
        if (!value || value.length < 4) {
            return 'registrationNumber must be at least 4 characters!';
        }
        return '';
    };

    const validateEmail: ValidationFunction = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
            return 'Please enter a valid email address!';
        }
        return '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Partial<RegistrationValues> = {};

        // Validate each field
        Object.entries(values).forEach(([key, value]: [string, string]) => {

            let error = '';

            switch (key) {
                case 'reg_number':
                    error = validateregistrationNumber(value);
                    break;
                case 'email':
                    error = validateEmail(value);
                    break;
                default:
                    break;
            }

            if (error) {
                newErrors[key] = error;
            }
        });

        // If there are validation errors, set the errors and stop form submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                BaseApiUrl + 'api/v1/student/verify_and_create_user',
                {
                    reg_number: values.reg_number,
                    email: values.email,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            // const { token } = response.data;

            // localStorage.setItem('token', token);
            console.log('bbbbb')
            console.log(response.data)
            toast({
                title: 'Registration successful',
                status: 'success',
                duration: 3000,
            });
        } catch (error: unknown) {
            console.error('Registration failed', error);

            toast({
                title: 'Registration failed',
                description: error instanceof Error && error.message === "Request failed with status code 400" ? "An account already exist, please login to continue or reset password" : error instanceof Error && error.message,
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
            <AuthLayout minH="618px" formHeading='Create your account' children={
                <form onSubmit={handleSubmit}>
                    <Stack gap="16px" padding={10} width="100%" align="center">
                        <FormControl isRequired isInvalid={!!errors.email}>
                            <FormLabel fontWeight={800}>Email</FormLabel>
                            <CustomInput
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors.reg_number}>
                            <FormLabel fontWeight={800}>Reg Number</FormLabel>
                            <CustomInput
                                type="text"
                                name="reg_number"
                                value={values.reg_number}
                                onChange={handleChange}
                            />
                            <FormErrorMessage>{errors.reg_number}</FormErrorMessage>
                        </FormControl>
                        <Box mt="22px" width="100%">
                            <SolidButton isLoading={loading} type='submit' bgColor="#2BE4AC" buttonText='Continue' />
                        </Box>
                        <Text textAlign="left">Already have an account? Click <NavLink style={{ fontWeight: "bold", color: "#2BE4AC" }} to="/sign-in">here</NavLink> to sign in</Text>
                    </Stack>
                </form>
            } />
        </Center>
    );
}