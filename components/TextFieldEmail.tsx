import React from "react";
import clsx from "clsx";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface TextFieldEmailProps {
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  placeholder: string;
}

const TextFieldEmail: React.FC<TextFieldEmailProps> = ({
  name,
  register,
  errors,
  placeholder,
}) => {
  return (
    <div className="col-span-2 sm:col-span-1">
      <label
        htmlFor="email"
        className="block text-sm font-medium capitalize text-slate-11"
      >
        {name}
      </label>
      <div className="mt-1">
        <input
          {...register("email")}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={clsx(
            `block w-full rounded-md bg-main-3 py-3 px-4 text-slate-12 placeholder-slate-8 shadow-sm`,
            `focus:border-main-7 focus:ring-main-7`,
            errors[name] ? "border-red-500" : "border-main-6"
          )}
          placeholder={placeholder}
        />
        {errors[name] && (
          <p className="text-xs text-red-500 mt-1">
            {" "}
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextFieldEmail;
