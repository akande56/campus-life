import React, { useState } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Stack, useToast, Center, Text, Select, Box } from '@chakra-ui/react';
import axios from 'axios';
import { MdArrowDropDown } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { BaseApiUrl } from '../../../../utils/envKeys/keys';
import AuthLayout from '../Authlayout';
import CustomInput from '../../../Reuseables/Input';
import { DepartmentList } from '../../../../utils/departmentList';
import SolidButton from '../../../Reuseables/SolidButton';



interface RegistrationValues {
    reg_number: string;
    email: string;
    fullName: string;
    department: string;
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
        // fullName: '',
        // department: ''
    });

    const toast = useToast();

    const validateregistrationNumber: ValidationFunction = (value) => {
        if (!value || value.length < 4) {
            return 'registrationNumber must be at least 4 characters!';
        }
        return '';
    };

    // const validateFullName: ValidationFunction = (value) => {
    //     if (!value || value.length < 4) {
    //         return 'Name must be at least 4 characters!';
    //     }
    //     return '';
    // };

    // const validatePassword: ValidationFunction = (value) => {
    //     if (!value || value.length < 6) {
    //         return 'Password must be at least 6 characters!';
    //     }
    //     return '';
    // };

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
                // case 'fullName':
                //     error = validateFullName(value)
                //     break;
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
                'http://127.0.0.1:8003/api/v1/student/verify_and_create_user',
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
                description: error instanceof Error && error.message,
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
                        {/* <FormControl isRequired isInvalid={!!errors.reg_number}>
                            <FormLabel fontWeight={800}>Full name</FormLabel>
                            <CustomInput
                                type="text"
                                name="fullName"
                                value={values.fullName}
                                onChange={handleChange}
                            />
                            <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                        </FormControl> */}
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
                        {/* <FormControl isRequired isInvalid={!!errors.email}>
                            <FormLabel fontWeight={800}>Department</FormLabel>
                            <Select height="47px" icon={<MdArrowDropDown />} placeholder='Select Department' >
                                {DepartmentList.map((item) => {
                                    return (
                                        <option style={{ textTransform: 'capitalize' }} key={item.id} value={item.value.toLowerCase()}>{item.title}</option>
                                    )
                                })}
                            </Select>
                            <FormErrorMessage>{errors.department}</FormErrorMessage>
                        </FormControl> */}
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