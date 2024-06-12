"use client";

import { forwardRef } from "react";

const CustomInput = forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>((props, ref) => {
  return (
    <input
      ref={ref}
      className="w-full py-3 px-5 border-[#DCDCDF] border rounded-[12px] placeholder:text-placeholder hover:border-accent focus:border-accentDark transition-all duration-200 ease-in-out"
      {...props}
    />
  );
});

export default CustomInput;
