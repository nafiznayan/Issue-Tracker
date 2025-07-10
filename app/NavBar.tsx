"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames"; // package to apply conditional styling
import { useSession } from "next-auth/react"; // To get the session data
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
// import * as Avatar from "@radix-ui/react-avatar";

const NavBar = () => {
  const currentPath = usePathname(); // To get the current path we are on
  const { status, data: session } = useSession();
  console.log("Session status:", status);
  console.log("Session data:", session);

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="border-black shadow-sm mb-5 px-7 py-5">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classnames({
                      "text-zinc-900": link.href === currentPath,
                      "text-zinc-500": link.href !== currentPath,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback={session.user?.name?.[0].toUpperCase() || "U"}
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                    referrerPolicy="no-referrer"
                  />

                  {/* <Avatar.Root className="w-8 h-8 rounded-full cursor-pointer overflow-hidden bg-zinc-300 flex items-center justify-center">
                    <Avatar.Image
                      src={session?.user?.image || ""}
                      className="w-full h-full object-cover"
                      alt={session?.user?.name || "User"}
                    />
                    <Avatar.Fallback
                      className="text-sm font-medium text-zinc-700"
                      delayMs={600}
                    >
                      {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                    </Avatar.Fallback>
                  </Avatar.Root> */}
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log Out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
