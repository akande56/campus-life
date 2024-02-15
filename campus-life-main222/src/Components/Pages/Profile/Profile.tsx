import { useState } from 'react';
import { Box, Flex, Badge, Heading, Text, Center, Image, Button, Input, } from "@chakra-ui/react";
import ProfilePic from "../../../assets/student.jpg";


interface ProfileProps {
  readonly: boolean
}


export default function UserProfile(props: ProfileProps) {

  const initialStudentInfo = {
    name: "Isa'ac Yerima",
    studentId: '123456',
    currentSemester: 'First Semester',
    profileImage: ProfilePic,
    level: 500,
    course: 'Mechatronics Engineering',
    hobbies: ['Reading', 'Coding'],
    numberOfPics: 2,
  };

  const [studentInfo, setStudentInfo] = useState(initialStudentInfo);
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'hobbies') {
      // Split the string value into an array
      setStudentInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value.split(','),
      }));
    } else {
      setStudentInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };


  const handleSaveChanges = () => {
    // Implement logic to save changes, e.g., make an API request
    setEditMode(false);
    console.log('Saving changes:', studentInfo);
  };


  return (
    <Box margin={10}>
      <Center>
        <Flex wrap="wrap" w="100%" gap={10} p={6} borderWidth="1px" borderRadius="lg">
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
                studentInfo.hobbies.map((hobby, index) => (
                  <Input
                    key={index}
                    type="text"
                    value={hobby}
                    onChange={(e) => {
                      const newHobbies = [...studentInfo.hobbies];
                      newHobbies[index] = e.target.value;
                      setStudentInfo((prevInfo) => ({
                        ...prevInfo,
                        hobbies: newHobbies,
                      }));
                    }}
                  />
                ))
              ) : (
                studentInfo.hobbies.map((hobby, index) => (
                  <Badge key={index} colorScheme="teal" m={1}>
                    {hobby}
                  </Badge>
                ))
              )}
            </Flex>
            {
              !props.readonly &&
              <Box>
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
            }
          </Box>
        </Flex>
      </Center>
    </Box>
  );
}
