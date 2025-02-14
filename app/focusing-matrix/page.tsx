import ToolWrapper from "@/components/tool-wrapper";
import React from "react";
import Matrix from "./matrix";
import { FocusingMatrixProvider } from "./context/context";

function page() {
  return (
    <FocusingMatrixProvider>
      <ToolWrapper
        title="Focusing Matrix"
        toolId=""
        firstComponent={<Matrix />}
      />
    </FocusingMatrixProvider>
  );
}

export default page;
