import React from "react";
import {
  Center,
  Heading,
  Image,
  Flex,
  Text,
  Badge,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
// import { UserCard } from "../components/UI/UserCard";
// import { CategoryCard } from "../components/UI/CategoryCard";
// import { DeleteEvent } from "../components/UI/DeleteEvent";
import { EditEvent } from "../components/UI/EditEvent";
import { DeleteEvent } from "../components/UI/DeleteEvent";

// Loader function to fetch event data
export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const users = await fetch("http://localhost:3000/users");
  return {
    event: await event.json(),
    users: await users.json(),
  };
};

// Component to display an individual event
export const EventPage = () => {
  // Fetch event data using the loader
  const { event } = useLoaderData();
  const { users } = useLoaderData();
  const user = users.find((user) => user.id === Number(event.createdBy));

  // convert date/time 

  const date = event.startTime.split("T")[0];
  const start = event.startTime.split("T")[1].slice(0, 5);
  const end = event.endTime.split("T")[1].slice(0, 5);

  return (
    <Flex
      height="93vh"
      width="99vw"
      align="center"
      justify="center"
      bg="whiteAlpha.300"
    >
      {/* Event details container */}

      <Flex
        borderRadius={"xl"}
        mt={-5}
        bg="gray"
        align="center"
        justify="center"
        direction="column"
        minWidth="280px"
        maxW="30vw"
        gap={4}
        zIndex={1}
      >
        <Center
          borderRadius={"xl"}
          mb={5}
          variant="outline"
          boxShadow="2xl"
          display="flex"
          flexWrap="wrap"
          flexDir={["column"]}
          bg="gray"
          justify="space-evenly"
          alignItems="center"
          background-position="center"
          background-repeat="no-repeat"
          background-size="cover"
          gap={5}
          pl={10}
          pr={10}
        >
          <Image
            borderRadius={"xl"}
            mt={2}
            mb={-5}
            h={56}
            w="100%"
            src={event.image}
            objectFit="cover"
            boxShadow="2xl"
            alt="Events Images"
          />
          <Heading mb={-5}>{event.title}</Heading>
          <Text mb={-5} fontWeight="bold">
            {event.description}
          </Text>

          <Flex
            direction="column"
            align="center"
            gap={1}
            flexWrap="wrap"
            padding={0}
          >
            <Text>Date: {date}</Text>
            <Text>
              Time: {start} - {end}
            </Text>
            <Text align="center">Location: {event.location}</Text>
            <Badge event={event} />

            <Image
              borderRadius={"xl"}
              src={user ? user.image : "/events.json"}
              objectFit="cover"
              maxW={{ base: "100%", sm: "150px" }}
              alt="Event User"
            />
            <Text> Created by: {user.name}</Text>
          </Flex>

          {/* Edit, delete button */}
          <Flex mb={5} gap={4} flexWrap="wrap" justifyContent="center">
            <EditEvent event={event}>editeventknop</EditEvent>
            <Flex gap={4}>
              <DeleteEvent event={event}>delete eventknop</DeleteEvent>

            </Flex>
          </Flex>
        </Center>
      </Flex>
    </Flex>
  );
};
