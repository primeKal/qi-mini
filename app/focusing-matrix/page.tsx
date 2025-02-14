import ToolWrapper from "@/components/tool-wrapper";
import React from "react";
import Matrix from "./components/matrix";
import { FocusingMatrixProvider } from "./context/context";
import FocusingMatrixFooter from "./components/footer";
import FocusingMatrixHistory from "./components/history";

function page() {
  return (
    <FocusingMatrixProvider>
      <ToolWrapper
        title="Focusing Matrix"
        toolId=""
        firstComponent={<Matrix />}
        secondComponent={<FocusingMatrixHistory 
        //   openEditor={() => {

        // }}
        />
      }
        
      />
    </FocusingMatrixProvider>
  );
}

export default page;
