import * as React from "react";

import Heading from "../elements/Heading";
import { FaSearch } from "react-icons/fa";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { css, Modal, styled } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import clsx from "clsx";

const NewAppointmentsTable: React.FunctionComponent = () => {
  const { data, isLoading, isError } = api.patient.get_all.useQuery();
  const [searchData, setSearchData] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const { data: templates } = api.template.get_all.useQuery();

  return (
    <div className="h-full w-full">
      <Heading
        SecondHeading1={"New Appointment"}
        SecondHeading2={"List"}
        text={
          "Lorem ipsum dolor amet consectetur adipisicing eliteiuim sete eiusmod tempor incididunt ut labore etnalom dolore magna aliqua udiminimate veniam quis norud."
        }
      />
      <div className="flex h-[5%] justify-start space-x-2">
        <input
          type="text"
          placeholder="Search..."
          className="m-1"
          onChange={(e) => {
            setSearchData(e.target.value);
          }}
        />
        {/* <input type="date" className="m-1" /> */}
        <button className="flex h-[42px] w-[55px] items-center justify-center bg-[#F36562] text-white">
          <FaSearch />
        </button>
      </div>
      <div className="h-[75%] w-full">
        <div className="flex h-full w-full flex-col overflow-y-scroll">
          <div className="sticky top-0 flex h-[86px] w-full flex-row bg-white">
            <div className="flex  h-[86px] w-[15%] items-center justify-center text-center">
              P-ID
            </div>
            <div className="flex  h-[86px] w-[20%] items-center justify-center text-center">
              NAME
            </div>
            <div className="flex  h-[86px] w-[15%] items-center justify-center text-center">
              AGE
            </div>
            <div className="flex  h-[86px] w-[20%] items-center justify-center text-center">
              CONTACT NO
            </div>
            <div className="flex  h-[86px] w-[30%] items-center justify-center text-center">
              ACTION
            </div>
          </div>
          {data
            ?.filter(
              (item) =>
                searchData === "" ||
                item.patient_id.includes(searchData) ||
                item.first_name.includes(searchData) ||
                item.last_name.includes(searchData),
            )
            .map((item, index) => (
              <div
                key={index}
                className={`${index % 2 !== 0 ? "bg-[#F9F1F1]" : "bg-[#F0F0F0]"} flex h-[86px]`}
              >
                <div className="flex  w-[15%] items-center justify-center">
                  {item.patient_id}
                </div>
                <div className="flex  w-[20%] items-center justify-center">
                  {item.first_name} {item.last_name}
                </div>
                <div className="flex w-[15%] items-center justify-center">
                  {item.age}
                </div>
                <div className="flex  w-[20%] items-center justify-center">
                  {item.contact_number.toString()}
                </div>
                <div className="flex w-[30%] items-center space-x-4">
                  <button
                    className="h-[41px] w-[95px] bg-[#FCA19F] hover:bg-[#F36562]"
                    onClick={() => {
                      router.push({
                        pathname: "patient-details",
                        query: {
                          patient_id: item.patient_id,
                        },
                      });
                    }}
                  >
                    DETAILS
                  </button>
                  <button
                    className="h-[41px] w-[95px] bg-[#FCA19F] hover:bg-[#F36562]"
                    onClick={() => {
                      handleOpen();
                      // router.push({
                      //   pathname: "patient-prescription",
                      //   query: { patient_id: item.patient_id },
                      // });
                    }}
                  >
                    ATTEND
                  </button>
                  <Modal
                    aria-labelledby="unstyled-modal-title"
                    aria-describedby="unstyled-modal-description"
                    open={open}
                    onClose={handleClose}
                    slots={{ backdrop: StyledBackdrop }}
                    className="flex items-center justify-center"
                  >
                    <div className="flex h-2/5 w-[30%] flex-col self-center overflow-y-scroll bg-white">
                      {/* add code for popup to select templates */}
                      <div
                        className="flex h-10 w-full hover:bg-[#F0F0F0]"
                        onClick={() => {
                          router.push({
                            pathname: "patient-prescription",
                            query: {
                              patient_id: item.patient_id,
                              template_id: "",
                            },
                          });
                        }}
                      >
                        Blank
                      </div>
                      {templates?.map((template, index) => {
                        return (
                          <div
                            key={index}
                            className="h-10 w-full hover:bg-[#F0F0F0]"
                            onClick={() => {
                              router.push({
                                pathname: "patient-prescription",
                                query: {
                                  patient_id: item.patient_id,
                                  template_id: template.template_id,
                                },
                              });
                            }}
                          >
                            {template.template_id}
                          </div>
                        );
                      })}
                    </div>
                  </Modal>
                  <button
                    className="h-[41px] w-[95px] bg-[#FCA19F] hover:bg-[#F36562]"
                    onClick={() => {
                      router.push({
                        pathname: "report-upload",
                        query: {
                          patient_id: item.patient_id,
                        },
                      });
                    }}
                  >
                    REPORT
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewAppointmentsTable;
const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});
Backdrop.displayName = "Backdrop";
const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;
