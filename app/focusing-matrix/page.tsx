import ToolWrapper from "@/components/tool-wrapper";
import React from "react";
import Matrix from "./components/matrix";
import { FocusingMatrixProvider } from "./context/context";
import FocusingMatrixHistory from "./components/history";
import FocusingMatrixInfo from "./components/info-dialogue";

function page() {
  return (
    <FocusingMatrixProvider>
      <ToolWrapper
        title="Focusing Matrix"
        toolId=""
        firstComponent={<Matrix />}
        secondComponent={
          <FocusingMatrixHistory
          //   openEditor={() => {

          // }}
          />
        }
        infoComponent={<FocusingMatrixInfo />}
      />
    </FocusingMatrixProvider>
  );
}

export default page;
