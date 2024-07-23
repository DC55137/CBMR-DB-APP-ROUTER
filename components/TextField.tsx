import React from "react";
import clsx from "clsx";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface TextFieldProps {
  title: string;
  errors: FieldErrors;
  name: string;
  register: UseFormRegister<any>;
  autoComplete?: string;
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  title,
  errors,
  name,
  register,
  autoComplete,
  placeholder,
}) => {
  return (
    <div className="col-span-2 sm:col-span-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium capitalize text-slate-11"
      >
        {title}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          {...register(name)}
          name={name}
          autoComplete={autoComplete}
          id={name}
          placeholder={placeholder}
          className={clsx(
            `block w-full rounded-md bg-main-3 py-3 px-4 text-slate-12 placeholder-slate-8 shadow-sm`,
            `focus:border-main-7 focus:ring-main-7`,
            errors[name] ? "border-red-500" : "border-main-6"
          )}
        />
        {errors[name] && (
          <p className="text-xs text-red-500 mt-1">
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextField;
