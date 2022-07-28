import type { NextPage } from "next";
import { Box, Flex } from "theme-ui";
import { Sheet } from "../src/components/Sheet";

const Home: NextPage = () => {
  return (
    <Box
      sx={{
        p: "32px",
        width: "100%",
        height: "100%",
      }}
    >
      <Flex sx={{ width: "100%", justifyContent: "center" }}>
        <Sheet />
      </Flex>
    </Box>
  );
};

export default Home;
