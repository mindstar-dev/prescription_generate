import { useRouter } from "next/router";
import React from "react";
import DragAndDrop from "~/components/elements/DragAndDrop";
import CompounderPageTemplate from "~/components/templates/CompounderTemplate";

const compounderupload: React.FunctionComponent = () => {
  const router = useRouter();
  const { patient_id } = router.query;
  return (
    <div>
      <CompounderPageTemplate activePage="" doctorName="Doctor's Name">
        <DragAndDrop patient_id={patient_id as string} />
      </CompounderPageTemplate>
    </div>
  );
};

export default compounderupload;
