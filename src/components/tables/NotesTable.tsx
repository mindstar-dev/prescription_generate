import * as React from "react";

import { FaSearch } from "react-icons/fa";
import { api } from "~/utils/api";
import { css, Modal, styled } from "@mui/material";
import clsx from "clsx";
import Heading from "~/components/elements/Heading";
import SuccessPopup from "../popups/Success";
import ErrorPopup from "../popups/Error";
import FinalizePopup from "../popups/FinalizePopup";

const NotesTable: React.FunctionComponent = () => {
    const [searchData, setSearchData] = React.useState("");
    const [successPopupOpen, setSuccessPopupOpen] = React.useState(false);
    const [errorPopup, setErrorPopup] = React.useState({
        state: false,
        message: "",
    });
    const { data: notes } = api.note.get_all.useQuery(undefined, {
        refetchInterval: 2000,
    });
    const [open, setOpen] = React.useState(false);
    const [item, setItem] = React.useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const deletenote = api.note.delete.useMutation({
        onSuccess(data, variables, context) {
            setSuccessPopupOpen(true);;
            setItem("");
            handleClose();
        },
        onError(error, variables, context) {
            setErrorPopup({
                state: true,
                message: `Error occured while deleteing patient data please try again ${error.message}`,
            });
            setItem("");
            handleClose();

        },
    });

    return (
        <div className="h-full w-full">
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={() => {
                    setSuccessPopupOpen(false);
                }}
                className="flex h-full w-full items-center justify-center"
            >
                <FinalizePopup
                    onYesClick={() => {
                        deletenote.mutate(item);
                    }}
                    onNoClick={handleClose}
                    heading="Do you want to delete this note?"
                />
            </Modal>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={successPopupOpen}
                onClose={() => {
                    setSuccessPopupOpen(false);
                }}
                className="flex h-full w-full items-center justify-center"
            >
                <SuccessPopup
                    onClick={() => {
                        setSuccessPopupOpen(false);
                    }}
                    message="The note is Successfully Deleted"
                />
            </Modal>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={errorPopup.state}
                onClose={() => {
                    setErrorPopup({ state: false, message: "" });
                }}
                className="flex h-full w-full items-center justify-center"
            >
                <ErrorPopup
                    onClick={() => {
                        setErrorPopup({ state: false, message: "" });
                    }}
                    message={errorPopup.message}
                />
            </Modal>
            <Heading
                SecondHeading1={"Note"}
                SecondHeading2={"List"}
                text={""}
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
                <button className="flex h-[42px] w-[55px] items-center justify-center bg-[#F36562] text-white">
                    <FaSearch />
                </button>
            </div>
            <div className="flex-grow overflow-hidden">
                <div className="flex h-full w-full flex-col">
                    <div className="sticky top-0 flex h-[86px] w-full flex-row bg-white">
                        <div className="flex  h-[86px] w-1/3 items-center justify-center text-center">
                            Sl No.
                        </div>
                        <div className="flex  h-[86px] w-1/3 items-center justify-center text-center">
                            NAME
                        </div>
                        <div className="flex  h-[86px] w-1/3 items-center justify-center text-center">
                            ACTION
                        </div>
                    </div>
                    <div className="flex w-full flex-col pb-4">
                        {notes
                            ?.filter(
                                (item) =>
                                    searchData === "" ||
                                    item.name
                                        .toLocaleLowerCase()
                                        .includes(searchData.toLocaleLowerCase()),
                            )
                            .map((item, index) => (
                                <div
                                    key={index}
                                    className={`${index % 2 !== 0 ? "bg-[#F9F1F1]" : "bg-[#F0F0F0]"} flex h-[86px]`}
                                >
                                    <div className="flex  w-1/3 items-center justify-center text-center tablet:text-sm">
                                        {index + 1}
                                    </div>
                                    <div className="flex  w-1/3 items-center justify-center text-center tablet:text-sm">
                                        {item.name}
                                    </div>

                                    <div className="flex w-1/3 items-center justify-center space-x-4 tablet:space-x-2 tablet:text-sm ">
                                        <button
                                            className="h-[41px] w-[95px] bg-[#FCA19F] hover:bg-[#F36562] tablet:h-[30px] tablet:w-[70px]"
                                            onClick={() => { handleOpen(); setItem(item.name);}}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotesTable;
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

