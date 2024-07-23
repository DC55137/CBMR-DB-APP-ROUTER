// app/components/SelectField.tsx

import React from "react";
import clsx from "clsx";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  title: string;
  errors: FieldErrors;
  name: string;
  register: UseFormRegister<any>;
  options: Option[];
}

const SelectField: React.FC<SelectFieldProps> = ({
  title,
  errors,
  name,
  register,
  options,
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
        <select
          {...register(name)}
          id={name}
          className={clsx(
            `block w-full rounded-md bg-main-3 py-3 px-4 text-slate-12 shadow-sm`,
            `focus:border-main-7 focus:ring-main-7`,
            errors[name] ? "border-red-500" : "border-main-6"
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors[name] && (
          <p className="text-xs text-red-500 mt-1">
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectField;
