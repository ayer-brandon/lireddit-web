import { Box, Flex, Link } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Button } from "@chakra-ui/button";
import { isServer } from "../utils/isServer";


interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{fetching: logoutFetching}, logout] = useLogoutMutation();

  let body = null;

  //loading
  if (fetching) {
  }
  //not logged in
  else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );
  }
  //logged in
  else {
    body = (
      <Flex>
        <Box color="white" mr={2}>
          {data.me.username}
        </Box>
        <Button
          variant="link"
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
