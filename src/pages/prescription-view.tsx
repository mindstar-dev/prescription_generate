import { useRouter } from "next/router";
import React from "react";
import PrescriptionView from "~/components/elements/PrescriptionView";
import CompounderPageTemplate from "~/components/templates/CompounderTemplate";
import { api } from "~/utils/api";

const prescriptionview: React.FunctionComponent = () => {
  const router = useRouter();
  const { prescription_id, patient_id, template_id } = router.query;
  return (
    <div>
      <CompounderPageTemplate activePage={""} doctorName={""}>
        <PrescriptionView
          prescription_id={prescription_id as string}
          pateint_id={patient_id as string}
          template_id={template_id as string}
        />
      </CompounderPageTemplate>
    </div>
  );
};

export default prescriptionview;
