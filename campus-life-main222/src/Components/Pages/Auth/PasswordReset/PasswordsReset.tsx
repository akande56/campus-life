import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Stack, Box,
    useToast,
} from '@chakra-ui/react';
import AuthLayout from "../Authlayout";
import CustomInput from '../../../Reuseables/Input';
import SolidButton from '../../../Reuseables/SolidButton';
import { useState } from 'react';
import { BaseApiUrl } from '../../../../utils/envKeys/keys';
import axios from 'axios';



interface ValidationFunction {
    (value: string): string;
}

interface RegistrationValues {
    OTP: string;
    newPassword: string;
    confirmPassword: string;
}


export default function PasswordReset() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<RegistrationValues>>({});

    const [values, setValues] = useState<RegistrationValues>({
        OTP: '',
        newPassword: '',
        confirmPassword: '',
    });

    const toast = useToast();

    const validateOTP: ValidationFunction = (value) => {
        if (!value || value.length === 3) {
            return 'OTP can only be 4 digits long!';
        }
        if (!/^\d+$/.test(value)) {
            return 'OTP must contain only digits!';
        }
        return '';
    };


    const validatePassword: ValidationFunction = (value) => {
        if (!value || value.length < 6) {
            return 'Password must be at least 6 characters!';
        }
        return '';
    };

    const validateConfirmedPassword: ValidationFunction = (value) => {
        if (value !== values.newPassword) {
            return 'Password does not match';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors: Partial<RegistrationValues> = {};

        // Validate each field
        Object.entries(values).forEach(([key, value]: [string, string]) => {

            let error = '';

            switch (key) {
                case 'OTP':
                    error = validateOTP(value);
                    break;
                case 'newPassword':
                    error = validatePassword(value);
                    break;
                case 'confirmPassword':
                    error = validateConfirmedPassword(value)
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
                `${BaseApiUrl}auth-token/`,
                {
                    OTP: values.OTP,
                    newPassword: values.newPassword,
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
                title: 'Password changed successfully',
                status: 'success',
                duration: 3000,
            });
        } catch (error: unknown) {
            console.error('Password update failed', error);

            toast({
                title: 'Password reset failed',
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
        <Box>
            <AuthLayout formHeading='Change Password' height="552px" children={
                <form method='get' action='' onSubmit={handleSubmit}>
                    <Stack gap="16px" width="100%" padding={10} align="center" justify="center">
                        <FormControl isInvalid={!!errors.OTP}>
                            <FormLabel fontWeight={800}>OTP code</FormLabel>
                            <CustomInput type="text" name="OTP" value={values.OTP} onChange={handleChange}
                            />
                            <FormErrorMessage>{errors.OTP}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.newPassword}>
                            <FormLabel fontWeight={800}>New password</FormLabel>
                            <CustomInput type="password" name="newPassword" value={values.newPassword} onChange={handleChange}
                            />
                            <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.confirmPassword}>
                            <FormLabel fontWeight={800}>Confirm password</FormLabel>
                            <CustomInput type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange}
                            />
                            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                        </FormControl>
                        <Box width="100%">
                            <SolidButton isLoading={loading} type='submit' buttonText='Reset Password' />
                        </Box>
                        {/* <Box>
                            <Text textAlign="center">Return to <NavLink style={{ fontWeight: "bold", color: "#15CA94" }} to="/sign-in">Login</NavLink></Text>
                        </Box> */}
                    </Stack>
                </form>
            } />
        </Box>
    )
}