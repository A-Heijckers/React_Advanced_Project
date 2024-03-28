import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as eventPageLoader } from "./pages/EventPage";
import { EventsPage, loader as eventsPageLoader } from "./pages/EventsPage";
import { AddEvent, action as addEvent} from "./pages/AddEvent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, loader as contextLoader } from "./components/Root";
import { action as editEvent } from "./components/UI/EditEvent";
// import { EditEvent, action as editEvent } from "./components/UI/EditEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: contextLoader,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsPageLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventPageLoader,
        action: editEvent,
        // action: addComment,
      },
      {
        path: "/add",
        element: <AddEvent />,
        // loader: eventsPageLoader,
        action: addEvent,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
