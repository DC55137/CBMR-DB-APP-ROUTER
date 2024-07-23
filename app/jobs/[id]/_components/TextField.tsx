import React from "react";
import clsx from "clsx";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TextFieldProps {
  title: string;
  errors: FieldErrors;
  name: string;
  register: UseFormRegister<any>;
  autoComplete?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  title,
  errors,
  name,
  register,
  autoComplete,
}) => {
  return (
    <div className="col-span-2 sm:col-span-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium capitalize text-slate-100"
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
          className={clsx(
            `block w-full rounded-md bg-slate-700 py-3 text-white hover:border hover:border-main-200 focus:border-main-200 focus:ring-main-200 pl-2`
          )}
        />
        {errors[name] && (
          <p className="text-xs text-red-500">
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextField;
