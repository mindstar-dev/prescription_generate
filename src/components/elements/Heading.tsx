import React from "react";
interface HeadingProps {
  SecondHeading1: string;
  SecondHeading2: string;
  text: string;
}

const Heading: React.FunctionComponent<HeadingProps> = (props) => {
  return (
    <div className="flex h-[20%] w-full flex-col items-center justify-center bg-transparent space-y-[4%] py-[2%]">
      <div className="flex flex-row space-x-2">
        <div className='font-["Lato"] text-4xl font-medium text-black'>{props.SecondHeading1}</div>
        <div className='font-["Lato"] text-4xl font-medium text-red-600'>
          {props.SecondHeading2}
        </div>
      </div>
      <div className='w-[60%] text-center font-["Lato"] text-xs font-light text-black'>
        {props.text}
      </div>
    </div>
  );
};

export default Heading;
