import { InsulinInputs } from "@/app/models/InputType";
import { TextField, Typography } from "@mui/material";
import React from "react";
import { FieldErrors, UseFormRegister, Validate } from "react-hook-form";

type Props = {
  // Titulo del campo
  title: string;

  // Etiqueta del campo
  label: string;

  // Valor del campo
  value?: string | number;

  // Valor por defecto
  defaultValue?: string | number;

  // Tipo del campo
  type?: "number" | "text";

  // Funcion que se ejecuta al cambiar el valor del campo
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Nombre de los campos del useForm
  itemName: keyof InsulinInputs;

  // Funcion para registrar los campos del useForm
  register: UseFormRegister<InsulinInputs>;

  // Si el campo es requerido
  required?: boolean;

  // Errores del useForm
  errors: FieldErrors<InsulinInputs>;
};

const FormTextField = (props: Props) => {
  const {
    title,
    label,
    value,
    type = "text",
    onChange,
    itemName,
    register,
    required = false,
    errors,
  } = props;

  // Validar que el numero sea positivo
  const checkPositiveNumber: Validate<
    string | number | undefined,
    InsulinInputs
  > = (value) => {
    // Si el valor es un numero y es menor a 0
    if (type === "number" && typeof value === "number" && value <= 0) {
      return "Tiene que ser un numero positivo!";
    }
    return true;
  };

  return (
    <>
      {type === "number" ? (
        <>
          <Typography variant="h6">{title}</Typography>
          <TextField
            label={label}
            value={value}
            variant="outlined"
            color="secondary"
            // inputProps={{step: 0.1}}
            inputProps={
              itemName === "usedSyringe" ? { step: 1 } : { step: 0.1 }
            }
            {...register(itemName, {
              required: {
                value: required,
                message: "Este campo es requerido!",
              },
              valueAsNumber: true,
              validate: { checkPositiveNumber },
            })}
            type={type}
            sx={{ bgcolor: "white" }}
          />
          <Typography sx={{ color: "red" }}>
            {errors[itemName]?.message}
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h6">{title}</Typography>
          <TextField
            label={label}
            value={value}
            variant="outlined"
            color="secondary"
            {...register(itemName, {
              required: {
                value: required,
                message: "Este campo es requerido!",
              },
            })}
            onChange={onChange}
            type={type}
            sx={{ bgcolor: "white" }}
          />
          <Typography sx={{ color: "red" }}>
            {errors[itemName]?.message}
          </Typography>
        </>
      )}
    </>
  );
};

export default FormTextField;
