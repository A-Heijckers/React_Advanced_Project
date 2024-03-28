import React from "react";
import { useState } from "react";
import {
  Center,
  Flex,
  Card,
  CardBody,
  Heading,
  Input,
  Image,
  Text,
  Select,
  Stack,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const text = "Browse through the events: ";

  const { events, categories } = useLoaderData();

  const matchedEvents = events.filter((event) => {
    const matchesSearch =
      event.title &&
      event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      (Number(event.categoryIds) &&
        Number(event.categoryIds.includes(parseInt(selectedCategory))));
    return matchesSearch && matchesCategory;
  });

  // console.log(matchedEvents);

  const toast = useToast();

  const openEvent = () => {
    if (window.confirm("Would you like to know more?")) {
      try {
        toast({
          title: "Event",
          description: "Redirecting",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        // navigate("/");
      } catch (error) {
        toast({
          title: "Nope",
          description: "Something went wrong....",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <div className="event-list">
      <Flex
        justify="center"
        flexDir={["column", "row"]}
        flexWrap="wrap"
        align="center"
        bg="red"
      >
        <Heading
          size={"2xl"}
          color={"black"}
          flexDir={["column", "row"]}
          align="center"
          w={["full", "100%"]}
          flexWrap="wrap"
          justify="center"
        >
        </Heading>

        <Text align="center" color={"orange.300"} fontSize="4xl" mt={6} mb={20}>
          {text}
        </Text>

        {/* Event Search */}
        <Input
          type="text"
          placeholder="Search event by name.."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          h={12}
          w={["full", "25%"]}
          variant="filled"
          ml={8}
          mb={12}
          pl={2}
          color="black"
          borderRadius={"8"}
          boxShadow="xl"
        />
        {/*  Category Filter */}
        <Select
          type="select"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          h={12}
          w={["full", "25%"]}
          ml={4}
          mb={12}
          pl={10}
          variant="filled"
          color="black"
          borderRadius={"8"}
          boxShadow="xl"
        >
          <option value="">Filter categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>

        <Center >
          <Card
          
            opacity="100%"
            boxShadow="2xl"
            display="flex"
            flexWrap="wrap"
            flexDir={["column", "row"]}
            bg="red"
            mt={-10}
            justify="space-evenly"
            alignItems="center"
            background-position="center"
            background-repeat="no-repeat"
            background-size="cover"
            gap={10}
            pl={10}
            pr={10}
          >
            {/* title, description, image, startTime & endTime, categories */}

            {/* Rendering: events from the matchedEvents array.. */}
            {matchedEvents.map((event) => (
              <div key={event.id} className="events">
                <Link to={`event/${event.id}`} onClick={openEvent}>
                  <Image
                    borderRadius="xl"
                    borderBottomLeftRadius="0"
                    borderBottomRightRadius="0"
                    mt={10}
                    h={56}
                    w="100%"
                    src={event.image}
                    objectFit="cover"
                    boxShadow="2xl"
                    alt="Events Images"
                  />

                  <CardBody
                    bgColor="gray"
                    borderRadius="xl"
                    borderTopLeftRadius="0"
                    borderTopRightRadius="0"
                    align="center"
                    boxShadow="2xl"
                    mb={10}
                  >
                    <Heading size="md" color="black">
                      <b>{event.title}</b>
                    </Heading>
                    <Text py="4" color="black">
                      <b>{event.description}</b>
                    </Text>

                    <Stack mt="0" spacing="1">
                      <Badge
                        borderRadius="md"
                        px={3}
                        py={1}
                        color="white"
                        bg={"green"}
                      >
                        Date:{" "}
                        {
                          new Date(event.startTime)
                            .toLocaleDateString("en-GB")
                            .split("T")[0]
                        }
                      </Badge>{" "}
                      {/* Format only Date objects to ISO format (yyyy-MM-dd) */}
                      <Badge
                        borderRadius="md"
                        px={3}
                        py={1}
                        color="white"
                        bg={"blue"}
                      >
                        Starts @ {event.startTime.split("T")[1].slice(0, 5)}{" "}
                        {/*  "2023-03-10T17:00" */}
                        {/* .split("T")[1].slice(0, 5)} */}
                      </Badge>{" "}
                      {/* Format both Date objects to ISO format (yyyy-MM-dd) */}
                      {/* OR: {new Date(event.startTime).toISOString().slice(11,16)} */}
                      <Badge
                        borderRadius="md"
                        px={3}
                        py={1}
                        color="white"
                        bg={"orange"}
                      >
                        Ends @ {event.endTime.split("T")[1].slice(0, 5)}
                      </Badge>{" "}
                      {/* Format both Date objects to ISO format (yyyy-MM-dd) */}
                      {/*OR: {new Date(event.endTime).toISOString().slice(11,16)} */}
                      <Link to={`/event/${event.id}`}>
                        <Text
                          borderRadius="md"
                          px={3}
                          py={0.5}
                          color="white"
                          bg={"purple"}
                        >
                          <b>Category:</b>{" "}
                          {event.categoryIds
                            .map((categoryId) => {
                              const category = categories.find(
                                (cat) => cat.id === Number(categoryId)
                              );
                              return category ? category.name : "";
                            })
                            .join(" / ")}
                        </Text>{" "}
                      </Link>
                    </Stack>

                    <Flex
                      justify="center"
                      flexDir={["column", "row"]}
                      flexWrap="wrap"
                      align="center"
                      mt={8}
                      gap={6}
                    >
                      {/* <Button
                        variant="solid"
                        bgColor="orange.300"
                        color="white"
                        size="md"
                        boxShadow="xl"
                        // onClick={openEvent}
                      >
                        Check: {event.title}
                      </Button> */}
                      {/* <Button
                        variant="ghost"
                        color="blue.400"
                        boxShadow="xl"
                      ></Button> */}
                    </Flex>
                  </CardBody>
                </Link>
              </div>
            ))}
          </Card>
        </Center>
      </Flex>
      
    </div>
  );
};
