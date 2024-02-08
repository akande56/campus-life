import { useState } from 'react';
import {
  Box,
  Flex,
  Badge,
  Heading,
  Text,
  Center,
  Image,
  Button,
  Input,
} from "@chakra-ui/react";
import ProfilePic from "../../../assets/student.jpg";

export default function ProfilePage() {
  const initialStudentInfo = {
    name: 'John Doe',
    studentId: '123456',
    currentSemester: 'First Semester',
    profileImage: ProfilePic,
    level: 200,
    course: 'Computer Science',
    hobbies: ['Rapping', 'Reading', 'Coding'],
    numberOfPics: 2,
  };

  const [studentInfo, setStudentInfo] = useState(initialStudentInfo);
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes, e.g., make an API request
    setEditMode(false);
    console.log('Saving changes:', studentInfo);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <Box margin={10}>
      <Center>
        <Flex wrap="wrap" w="95vw" gap={10} p={6} borderWidth="1px" borderRadius="lg">
          <Image
            objectPosition="top"
            objectFit="cover"
            height="400px"
            width="300px"
            src={studentInfo.profileImage}
            alt={`${studentInfo.name} profile pictures`}
          />
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              {editMode ? (
                <Input
                  type="text"
                  name="name"
                  value={studentInfo.name}
                  onChange={handleInputChange}
                />
              ) : (
                studentInfo.name
              )}
            </Heading>
            <Text fontSize="lg" mb={2}>
              Student ID: {studentInfo.studentId}
            </Text>
            <Text fontSize="lg" mb={2}>
              Course: {editMode ? (
                <Input
                  type="text"
                  name="course"
                  value={studentInfo.course}
                  onChange={handleInputChange}
                />
              ) : (
                studentInfo.course
              )}
            </Text>
            <Text fontSize="lg" mb={2}>
              Current Level: {editMode ? (
                <Input
                  type="number"
                  name="level"
                  value={studentInfo.level}
                  onChange={handleInputChange}
                />
              ) : (
                studentInfo.level !== 500 && studentInfo.level
              )} {studentInfo.level === 500 ? "Final Year" : "level"}
            </Text>
            <Text fontSize="lg" mb={2}>
              Current Semester: {editMode ? (
                <Input
                  type="text"
                  name="currentSemester"
                  value={studentInfo.currentSemester}
                  onChange={handleInputChange}
                />
              ) : (
                studentInfo.currentSemester
              )}
            </Text>
            <Text fontSize="large" mb={4}>Total pictures uploaded: {studentInfo.numberOfPics}</Text>
            <Heading as="h3" size="md" mb={2}>
              Hobbies
            </Heading>
            <Flex flexWrap="wrap">
              {editMode ? (
                <Input
                  type="text"
                  name="hobbies"
                  value={studentInfo.hobbies.join(', ')}
                  onChange={(e) => handleInputChange({ target: { name: 'hobbies', value: e.target.value.split(', ') } })}
                />
              ) : (
                studentInfo.hobbies.map((hobby, index) => (
                  <Badge key={index} colorScheme="teal" m={1}>
                    {hobby}
                  </Badge>
                ))
              )}
            </Flex>
            {editMode ? (
              <Button colorScheme="teal" mt={4} onClick={handleSaveChanges}>
                Save Changes
              </Button>
            ) : (
              <Button colorScheme="teal" mt={4} onClick={handleEditClick}>
                Edit Profile
              </Button>
            )}
          </Box>
        </Flex>
      </Center>
    </Box>
  );
}
