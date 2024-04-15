import React from "react";
import Heading from "../elements/Heading";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { FaSearch, FaEdit } from "react-icons/fa";

const Template: React.FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const meds = [
    "Medicine1",
    "Medicine1",
    "Medicine1",
    "Medicine1",
    "Medicine1",
    "Medicine1",
    "Medicine1",
    "Medicine1",
  ];
  const arr = [
    "Template1",
    "Template1",
    "Template1",
    "Template1",
    "Template1",
    "Template1",
    "Template1",
    "Template1",
    "Template1",
    "Template1",
    "Template1",
  ];
  return (
    <div className="h-full w-full">
      <div className="relative h-fit w-full">
        <TriggerButton type="button" onClick={handleOpen}>
          Add New Template
        </TriggerButton>
        <Modal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={open}
          onClose={handleClose}
          slots={{ backdrop: StyledBackdrop }}
        >
          <ModalContent sx={{ width: 736, height: 635 }}>
            <div className="flex h-full w-full flex-col">
              <div className="h-[15%] w-full">
                <p className="text-center text-[32px]">Add New Template</p>
              </div>
              <div className="h-fit w-full space-y-[2%]">
                <div className=" flex flex-row items-center">
                  <span className="w-[20%] font-bold">Template Name</span>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="grow rounded-sm border border-[#DBDBDB] bg-[#FFFDFD] p-[1%]"
                  />
                </div>
                <div className=" flex flex-row items-center">
                  <span className="w-[20%] font-bold">Description</span>
                  <textarea
                    placeholder="Enter Description"
                    className="max-h-10 min-h-10 grow rounded-sm border border-[#DBDBDB] bg-[#FFFDFD] p-[1%]"
                  ></textarea>
                </div>
              </div>
              <div className="h-fit w-full">
                <p className="text-start text-[20px] font-bold">Rx</p>
                <div className="flex h-fit w-full flex-row">
                  <div className="m-[5%] w-[40%]">
                    <input
                      type="text"
                      className="h-12 w-full rounded-sm border border-[#DBDBDB] bg-[#FFFDFD] p-[1%]"
                      placeholder="Select Meds"
                      list="Medicine"
                    />
                    <datalist id="Medicine">
                      {meds.map((item, index) => (
                        <option key={index} value={item}></option>
                      ))}
                    </datalist>
                  </div>
                  <select
                    name=""
                    id=""
                    className="m-[5%] h-12 w-[40%] rounded-sm border border-[#DBDBDB] bg-[#FFFDFD] p-[1%]"
                  >
                    <option value="">OD BM</option>
                    <option value="">OD AM</option>
                    <option value="">BD AM</option>
                    <option value="">BD BM</option>
                    <option value="">TD BM</option>
                    <option value="">TD AM</option>
                  </select>
                  <button className="text-[#F36562]">
                  <span>Save</span>
                </button>
                </div>
                
                
              </div>
              <div className="flex h-[8%] self-end w-full justify-center space-x-8 text-white">
                 
                  <button className="h-full w-[103px] bg-[#3D4460]">
                    Cancle
                  </button>
                  <button className="h-full w-[103px] bg-[#F36562]">
                    Save
                  </button>
                </div>
            </div>
          </ModalContent>
        </Modal>
        <Heading
          SecondHeading1="Templates"
          SecondHeading2=""
          text="Lorem ipsum dolor amet consectetur adipisicing eliteiuim sete eiusmod tempor incididunt ut 
labore etnalom dolore magna aliqua udiminimate veniam quis norud"
        />
      </div>
      <div className="flex w-full flex-row space-x-[3%]">
        <input
          type="text"
          placeholder="Search"
          className="ml-[1%] rounded-sm border border-[#DBDBDB] bg-[#FFFDFD] p-[1%]"
        />{" "}
        <button className="flex h-[42px] w-[55px] items-center justify-center bg-[#F36562] text-white">
          <FaSearch />
        </button>
      </div>
      <div className="h-[66%] w-full flex-col overflow-y-scroll">
        <div className="flex flex-col">
          <div className="sticky top-0 flex h-[86px] w-full flex-row items-center justify-around bg-white">
            <div>Template</div>
            <div>Action</div>
          </div>
          {arr.map((item, index) => (
            <div
              key={index}
              className={`${index % 2 !== 0 ? "bg-[#F9F1F1]" : "bg-[#F0F0F0]"} flex h-[86px] w-full flex-row items-center justify-around`}
            >
              <div>{item}</div>
              <div className="w-10 text-center text-[#F36562]">
                <FaEdit />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Template;

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

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

const TriggerButton = styled("button")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    // &:hover {
    //   background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    //   border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    // }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px
        ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
      outline: none;
    }

    /* Adding button properties */
    position: absolute;
    left: 83.7%;
    top: 5%;
    height: 41px;
    width: 182px;
    border-radius: 8px;
    background-color: #f36562;
    color: white;
  `,
);
