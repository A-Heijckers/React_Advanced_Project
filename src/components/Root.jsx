import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { EventsContext } from "../Context";

export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const Root = () => {
  const { users, categories } = useLoaderData();
  return (
    <Box>
      <Navigation />
      <EventsContext.Provider value={{ users, categories }}>
        <Outlet />
      </EventsContext.Provider>
    </Box>
  );
};
