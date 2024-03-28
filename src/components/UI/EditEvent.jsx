import { Form, useActionData } from "react-router-dom";
import { Button, Stack, Input, Select, Heading, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { EventsContext } from "../../Context";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

// Send request to edit event
export const action = async ({ request, params }) => {
  const formData = Object.fromEntries(await request.formData());
  const response = await fetch(
    `http://localhost:3000/events/${params.eventId}`,
    {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.status;
};

export const EditEvent = ({ event }) => {
  const [succesfulUpdate, setSuccesfulUpdate] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { users, categories } = useContext(EventsContext);
  const response = useActionData();
  const toast = useToast();
  const refreshpage = () => {
    window.location.reload(false);
  };

  if (succesfulUpdate === false && response != undefined) {
    switch (response) {
      case 200:
        toast({
          title: "Success!",
          description: "Your event is updated succesfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setSuccesfulUpdate(true);
        break;
      case 404:
        toast({
          title: "Oops",
          description: `Event not found ${response} `,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        break;
      case undefined:
        break;
      default:
        toast({
          title: "Unknown",
          description: `Something happened..."${response}"`,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
    }
  }

  // Format dates 
  const massageDates = (date) => {
    const dateJson = JSON.stringify(date);
    if (dateJson.includes("00.000Z")) {
      return String(date.slice(0, -8));
    } else {
      return date;
    }
  };

  return (
    <>
      {succesfulUpdate ? (
        <Button
          size="sm"
          onClick={() => {
            refreshpage();
          }}
        >
         Please Refresh to make another edit
        </Button>
      ) : (
        <Button
          size="sm"
          onClick={() => {
            onOpen();
          }}
        >
          Edit
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading align="center">Edit Event</Heading>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text align="center">
              Change information below.
              <br />
              <b>
                Select category and user else your changes will not be
                saved!
              </b>
            </Text>

            <Form method="patch" id="edit-event-form">
              <Stack spacing={3}>
                <Input
                  placeholder="Event title"
                  type="text"
                  name="title"
                  required="required"
                  defaultValue={event.title}
                />
                <Input
                  placeholder="Description"
                  type="text"
                  name="description"
                  required="required"
                  defaultValue={event.description}
                />
                <Input
                  placeholder="Image url"
                  type="url"
                  name="image"
                  required="required"
                  defaultValue={event.image}
                />
                <Input
                  type="datetime-local"
                  variant="outline"
                  placeholder="Start time"
                  name="startTime"
                  required="required"
                  defaultValue={massageDates(event.startTime)}
                />
                <Input
                  type="datetime-local"
                  variant="outline"
                  placeholder="End time"
                  name="endTime"
                  required="required"
                  defaultValue={massageDates(event.endTime)}
                />
                <Input
                  placeholder="Location"
                  type="text"
                  name="location"
                  required="required"
                  defaultValue={event.location}
                />

                <Select
                  placeholder="Category"
                  name="categoryIds"
                  required="required"
                >
                  {categories.map((category) => {
                    return (
                      <option
                        value={category.id}
                        key={category.id}
                        type="text"
                      >
                        {category.name}
                      </option>
                    );
                  })}
                </Select>

                <Select
                  placeholder="Select user"
                  name="createdBy"
                  required="required"
                >
                  {users.map((user) => {
                    return (
                      <option value={user.id} key={user.id} type="text">
                        {user.name}
                      </option>
                    );
                  })}
                </Select>
                <Button
                  type="submit"
                  variant="ghost"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
