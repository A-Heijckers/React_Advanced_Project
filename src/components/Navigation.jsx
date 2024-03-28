import React from "react";
import { Link } from "react-router-dom";
import {
  Center,
  Flex,
  Card,
  CardBody,
  Button,
  Heading,
  Input,
  Image,
  Text,
  Select,
  Stack,
  Badge,
  useToast,
} from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <Center bg="gray">
          <Link to="/">All Events</Link>
       </Center>
     
        <Center bg="gray">
          <Link to={"/add"}>
            Add Event
          </Link>
        </Center>
      </ul>
    </nav>
  );
};
