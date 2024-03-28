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

//   const [events, setEvents] = useState([
//     { newevent: "" },
//   ]);

//   // For storing in Local Storage in dev tools
//   const [name, setName] = useLocalStorage("Your Added Name:");
//   // const [ name, setName ] = useState("");   // empty string
//   // For storing in Local Storage in dev tools
//   // const [ event, setEvent ] = useLocalStorage('Your Added Event:');
//   // const [ event, setEvent ] = useState(""); // empty string

//   const greeting = "Welcome @ WINC New Event App";
//   const text = "Please add Your New Event below..";

//   const [formData /* , setFormData */] = useLocalStorage({
//     //event: '',
//     name: "",
//   });

//   const AddEvent = (event) => {
//     event.preventDefault();

//     setEvents((event) => [{ event, name }, ...event]);
//     setName("");
//   };

//   const toast = useToast();

//   const addingEvent = () => {
//     toast({
//       title: "Event Added..",
//       description: "Adding Event Succesfully!",
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   // const deleteEvent = () => {
//   //   if (window.confirm("Sure you want to delete this event?")) {
//   //     try {
//   //       toast({
//   //         title: "Event Deleted..",
//   //         description: "Event deleted successfully!",
//   //         status: "success",
//   //         duration: 2000,
//   //         isClosable: true,
//   //       });
//   //     } catch (error) {
//   //       toast({
//   //         title: "Delete Failed..",
//   //         description: "Failed to delete event. Please try again!",
//   //         status: "error",
//   //         duration: 2000,
//   //         isClosable: true,
//   //       });
//   //     }
//   //   }
//   // };

//   // console.log(event); // Log outcome in console..
//   // console.log(name);  // Log outcome in console..
//   // console.log(email);  // Log outcome in console..
//   // console.log(info);  // Log outcome in console..

//   return (
//     <div className="new-event">
//       <Flex
//         justify="center"
//         flexDir={["column"]}
//         flexWrap="wrap"
//         align="center"
//       >
//         <Heading
//           size={"2xl"}
//           color={"blue.400"}
//           flexDir={["column", "row"]}
//           align="center"
//           w={["full", "100%"]}
//           flexWrap="wrap"
//           justify="center"
//         >
//           {greeting}
//         </Heading>

//         <Text align="center" color={"orange.300"} fontSize="4xl" mt={4} mb={14}>
//           {text}
//         </Text>

//         <Center borderRadius="xl" boxShadow="2xl">
//           <Card
//             direction={{ base: "column", sm: "column" }}
//             overflow="hidden"
//             variant="outline"
//             borderRadius="xl"
//             boxShadow="2xl"
//             gap={2}
//             bgImage="/src/components/balloons.jpeg"
//           >
//             <form onSubmit={AddEvent}>
//               <br /> {/* Input veld hier */}
//               <textarea
//                 type="text"
//                 name="event"
//                 placeholder=" Please Provide Your New Event:"
//                 value={formData.name}
//                 onChange={(name) => setName(name.target.value)}
//                 cols={71}
//                 rows={2}
//               ></textarea>
//               <Flex
//                 flexDir={["column", "row"]}
//                 flexWrap="wrap"
//                 justify="center"
//                 align="center"
//                 gap={10}
//                 m={6}
//               >
//                 <Button
//                   type="submit"
//                   variant="ghost"
//                   color="blue.400"
//                   boxShadow="xl"
//                   onClick={addingEvent}
//                 >
//                   <b>Add Event</b>
//                 </Button>
//                 <Button
//                   type="reset"
//                   variant="ghost"
//                   color="red.400"
//                   boxShadow="xl"
//                   value="Reset New Event"
//                   // onClick={deleteEvent}
//                 >
//                   <b>Change Event..</b>
//                 </Button>
//                 <Button
//                   variant="solid"
//                   bgColor="orange.300"
//                   color="white"
//                   boxShadow="xl"
//                 >
//                   <Link to={"/"}>
//                     <b>Back to Events</b>
//                   </Link>
//                 </Button>
//               </Flex>
//             </form>

//             <h2>
//               <b>New Event Added by last user:</b>
//             </h2>
//             {events.map((event) => {
//               return (
//                 <div className="event" key={event.newvent}>
//                   <p> {event.newevent}</p>
//                   <span> {event.name}</span>
//                   <hr />
//                 </div>
//               );
//             })}
//           </Card>
//         </Center>
//       </Flex>
//     </div>
//   );
// };
