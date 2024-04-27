"use client";

import { Button, Typography } from "@mui/material";
import React, {  useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import FormTextField from "./atoms/FormTextField";
import { Inputs } from "../models/InputType";

declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    green: true;
    brown: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    green: true;
    brown: true;
  }
}

const InsulinForm = () => {
  // Uso de useForm para manejar el formulario
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const today = dayjs();
  const [catName, setCatName] = useState("Antifaz");
  const [value, setValue] = useState<Dayjs | null>(today);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCatName(event.target.value);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTextField
        title="Gatinha"
        label="Gatinha"
        value={catName}
        onChange={handleChange}
        itemName="gatinha"
        register={register}
        errors={errors}
        required={true}
      />
      <FormTextField
        title="Cantidad de jeringa utilizada:"
        label="Jeringas utilizadas"
        defaultValue={1}
        type="number"
        itemName="usedSyringe"
        register={register}
        required={true}
        errors={errors}
      />
      <FormTextField
        title="Lugar donde se inyecto:"
        label="Lugar de inyección"
        itemName="vaccinLocation"
        register={register}
        required={true}
        errors={errors}
        />
      <FormTextField
        title="Cantidad de chuuru utilizadas:"
        label="Chuuru utilizadas"
        type="number"
        itemName="usedChuru"
        register={register}
        errors={errors}
        />
      <Typography variant="h6">Dia de la inyeccion:</Typography>
      <Controller
        control={control}
        defaultValue={today.format("YYYY/MM/DD hh:mm A")}
        name="vaccinDate"
        rules={{ required: true }}
        render={({ field: { ref } }) => {
          return (
            <DateTimePicker
              {...register("vaccinDate")}
              value={dayjs(value)}
              inputRef={ref}
              onChange={(date) => {
                setValue(date);
              }}
              maxDate={today}
              sx={{ bgcolor: "white" }}
            />
          );
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="green"
        sx={{ display: "block", my: 3 }}
      >
        Registrar Vacuna
      </Button>
    </form>
  );
};

export default InsulinForm;
