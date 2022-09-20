import type { NextPage } from "next";
import { Box, Flex } from "theme-ui";
import { ControlPanel } from "../src/components/ControlPanel";
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
        <Box sx={{ width: "100%", maxWidth: "1024px" }}>
          <ControlPanel />
          <Sheet />
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
