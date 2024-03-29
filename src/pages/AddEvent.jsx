import { useContext, useState } from "react";
import {
  Heading,
  Text,
  Select,
  Card,
  CardHeader,
  Button,
  Flex,
  useToast,
  Stack,
  Input,
} from "@chakra-ui/react";
import { Form, Link } from "react-router-dom";
// import { useLocalStorage } from "./useLocalStorage";
import { EventsContext } from "../Context";
import { useActionData } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  console.log("============", formData);
  formData.categoryIds = [parseInt(formData.categoryIds, 10)];
  formData.createdBy = Number(formData.createdBy);
  console.log("============", formData);
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });

  const json = await response.json();
  const newId = await json.id;

  return {
    status: response.status,
    id: newId,
  };
};

export const AddEvent = () => {
  const [sentToast, setSentToast] = useState(false);
  const { users, categories } = useContext(EventsContext);
  const toast = useToast();

  // use data from POST request for status and newId
  const response = useActionData();
  const id = response?.id;
  const status = response?.status;

  if (response !== undefined && !sentToast) {
    switch (status) {
      case 201:
        toast({
          title: "Success!",
          description: "Your event was added successfully!!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setSentToast(true);
        break;
      default:
        toast({
          title: "Oops",
          description: `Something unexpected happened :"${status}" `,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        setSentToast(true);
    }
  }

  return (
    <Flex height="100vh" width="100vw" align="center" justify="center">
      <Card gap={4} padding={4}>
        <CardHeader>
          <Heading>Create a new event </Heading>
        </CardHeader>

        {/* Button to go to your event*/}
        {status === 201 && (
          <Flex justify="center">
            <Link to={`/event/${id}`}>
              <Button size="lg" color="green.500">
                Go to your Event!
              </Button>
            </Link>
          </Flex>
        )}

        <Text align="center">What's your event about:</Text>
        <Form method="post" id="new-event-form">
          <Stack spacing={3}>
            <Input
              placeholder="Event title"
              type="text"
              name="title"
              required="required"
            />
            <Input
              placeholder="Description"
              type="text"
              name="description"
              required="required"
            />
            <Input
              placeholder="Image URL"
              type="text"
              name="image"
              required="required"
            />
            <Input
              type="datetime-local"
              variant="outline"
              placeholder="Start time"
              name="startTime"
              required="required"
            />
            <Input
              type="datetime-local"
              variant="outline"
              placeholder="End time"
              name="endTime"
              required="required"
            />
            <Input
              placeholder="Location"
              type="text"
              name="location"
              required="required"
            />

            <Select
              placeholder="Category"
              name="categoryIds"

              required="required"
            >
              {categories.map((category) => (
                <option value={category.id} key={category.id} type="number">
                  {category.name}
                </option>
              ))}
            </Select>

            <Select
              placeholder="Select user"
              name="createdBy"
              required="required"
            >
              {users.map((user) => (
                <option value={user.id} key={user.id} type="number">
                  {user.name}
                </option>
              ))}
            </Select>
            {/* Hide submit button after adding an event successfully*/}
            {status !== 201 && (
              <Button type="submit" variant="ghost">
                Submit
              </Button>
            )}
          </Stack>
        </Form>
      </Card>
    </Flex>
  );
};
