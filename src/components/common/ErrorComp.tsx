import React from "react";
import { LiaUserAstronautSolid } from "react-icons/lia";

import Flex from "../ui/Flex";
import Button from "../ui/Button";

export default function ErrorComp({ reload }: { reload: () => void }) {
  return (
    <Flex
      className="h-screen overflow-y-hidden"
      items="center"
      justify="start"
      gap="md"
    >
      <LiaUserAstronautSolid size={400} color="#025AE0" />
      <p className="text-5xl font-semibold text-myprimary">
        Something went wrong
      </p>
      <Button onClick={reload}>Retry</Button>
    </Flex>
  );
}
