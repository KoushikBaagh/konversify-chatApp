import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
//import { ChatState } from "../../context/ChatProvider";

const UserListItem = ({ user, handleFunction }) => {
  if (!user) {
    console.error("User data is not available"); // Handle the case where 'user' is null or undefined
    return null; // or return some fallback UI
  }
  //const { user } = ChatState(); // 40:03, vid 11.. jokhuni ei line ta rakhchi code e tokhuni error asche, Create Group Chat e.

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;

// import { Avatar } from "@chakra-ui/avatar";
// import { Box, Text } from "@chakra-ui/layout";
// import { ChatState } from "../../context/ChatProvider";

// const UserListItem = ({ user: userProp, handleFunction }) => {
//   const chatState = ChatState();
//   const user = chatState.user;

//   if (!user) {
//     // Handle the case where 'user' is null or undefined
//     console.error("User data is not available");
//     return null; // or handle the error in some other way
//   }

//   return (
//     <Box
//       onClick={handleFunction}
//       cursor="pointer"
//       bg="#E8E8E8"
//       _hover={{
//         background: "#38B2AC",
//         color: "white",
//       }}
//       w="100%"
//       d="flex"
//       alignItems="center"
//       color="black"
//       px={3}
//       py={2}
//       mb={2}
//       borderRadius="lg"
//     >
//       <Avatar
//         mr={2}
//         size="sm"
//         cursor="pointer"
//         name={user.name}
//         src={user.pic}
//       />
//       <Box>
//         <Text>{user.name}</Text>
//         <Text fontSize="xs">
//           <b>Email : </b>
//           {user.email}
//         </Text>
//       </Box>
//     </Box>
//   );
// };

// export default UserListItem;

// import { Avatar, AvatarBadge, AvatarGroup, Box, Text } from "@chakra-ui/react";

// import { ChatState } from "../../context/ChatProvider";

// const UserListItem = ({ user, handleFunction }) => {
//   const chatState = ChatState();
//   const user = chatState.user;

//   if (!user) {
//     // Handle the case where 'user' is null or undefined
//     console.error("User data is not available");
//     return null; // or handle the error in some other way
//   }

//   return (
//     <Box
//       onClick={handleFunction}
//       cursor="pointer"
//       bg="#E8E8E8"
//       _hover={{
//         background: "#38B2AC",
//         color: "white",
//       }}
//       w="100%"
//       d="flex"
//       alignItems="center"
//       color="black"
//       px={3}
//       py={2}
//       mb={2}
//       borderRadius="lg"
//     >
//       <Avatar
//         mr={2}
//         size="sm"
//         cursor="pointer"
//         name={user.name}
//         src={user.pic}
//       />
//       <Box>
//         <Text>{user.name}</Text>
//         <Text fontSize="xs">
//           <b>Email : </b>
//           {user.email}
//         </Text>
//       </Box>
//     </Box>
//   );
// };

// export default UserListItem;
