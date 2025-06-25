import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import delay from "delay";
const LoadingNewIssuePage = async () => {
  //await delay(1000); // Simulating a delay for loading state
  return (
    <Box className="max-w-xl">
      <Skeleton />

      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewIssuePage;
