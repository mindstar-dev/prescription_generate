import React, { useRef, useState } from "react";
import MultiSelectInput from "./../components/elements/Hybrid";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
function ParentComponent() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const handleSelectedValuesChange = (values: string[]) => {
    setSelectedValues(values);
  };
  // const handleGeneratePdf = async () => {
  //   // const doc = new jsPDF({
  //   //   format: [1920, 1080],
  //   //   unit: "px",
  //   //   orientation: "portrait",
  //   //   compress: false,
  //   //   precision: 100,
  //   // });

  //   // doc.html(ref.current, {
  //   //   callback: () => {
  //   //     doc.output("dataurlnewwindow");
  //   //   },
  //   // });
  //   if (!ref.current) {
  //     return;
  //   }
  //   await new Promise((resolve) => {
  //     setTimeout(resolve, 1000); // 1000 milliseconds = 1 second
  //   });
  //   const scaleFactor = 2; // You can adjust this value for higher resolution
  //   const canvas = await html2canvas(ref.current, {
  //     scale: scaleFactor,
  //   });
  //   html2canvas(ref.current).then((canvas) => {
  //     if (ref.current) {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF("p", "px", "a4", true);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = pdf.internal.pageSize.getHeight();
  //       const imgWidth = 2480;
  //       const imgHeight = 3508;
  //       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //       const imgX = (pdfWidth - imgWidth * ratio) / 2;
  //       const imgY = 30;
  //       pdf.addImage(
  //         imgData,
  //         "PNG",
  //         imgX,
  //         imgY,
  //         imgWidth * ratio,
  //         imgHeight * ratio,
  //       );
  //       pdf.output("dataurlnewwindow");
  //     } else {
  //       alert("error in generating pdf");
  //     }
  //   });
  // };
  const handleGeneratePdf = async () => {
    if (!ref.current) {
      return;
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 1000); // Wait for any asynchronous rendering to complete
    });

    // Increase the resolution of the captured canvas
    const scaleFactor = 2; // You can adjust this value for higher resolution
    const canvas = await html2canvas(ref.current, {
      scale: scaleFactor,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "px", "a4", true);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width / scaleFactor; // Adjusted width based on scale factor
    const imgHeight = canvas.height / scaleFactor; // Adjusted height based on scale factor
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;
    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio,
    );
    pdf.output("dataurlnewwindow");
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div
        className="flex h-[841px] w-[595px] flex-col border-2 border-black"
        id="pdfContainer"
        ref={ref}
      >
        <button onClick={handleGeneratePdf}>Print</button>
      </div>
    </div>
  );
}

export default ParentComponent;
