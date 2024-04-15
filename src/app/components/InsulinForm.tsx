"use client";

import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";

type Inputs = {
  gatinha: string;
  vaccinLocation: string;
  vaccinDate: string;
  usedSyringe?: number;
  usedChuru?: number;
};

// declare module "@mui/material/styles" {
//     interface Palette {
//       custom: Palette["secondary"]
//     }

//     interface PaletteOptions {
//       custom?: PaletteOptions["secondary"]
//     }
//   }

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
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const today = dayjs();
  const [catName, setCatName] = useState("Antifaz");
  const [value, setValue] = useState<Dayjs | null>(today);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCatName(event.target.value);
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("vaccinDate")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">Gatinha:</Typography>
      <TextField
        label="Gatinha"
        value={catName}
        variant="outlined"
        color="secondary"
        {...register("gatinha")}
        onChange={handleChange}
        sx={{ bgcolor: "white" }}
      />
      <Typography variant="h6">Cantidad de jeringa utilizada:</Typography>
      <TextField
        label="Jeringas utilizadas"
        defaultValue={1}
        variant="outlined"
        type="number"
        color="secondary"
        {...register("usedSyringe")}
        sx={{ bgcolor: "white" }}
      />
      <Typography variant="h6">Lugar donde se inyecto:</Typography>
      <TextField
        label="Lugar de inyección"
        variant="outlined"
        color="secondary"
        {...register("vaccinLocation")}
        sx={{ bgcolor: "white" }}
      />
      <Typography variant="h6">Cantidad de chuuru utilizadas:</Typography>
      <TextField
        label="Chuuru utilizadas"
        variant="outlined"
        type="number"
        color="secondary"
        {...register("usedChuru")}
        sx={{ bgcolor: "white" }}
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
      {/* register your input into the hook by invoking the "register" function */}
      {/* <input
        type="number"
        defaultValue="Number of Syringes"
        {...register("usedSyringe")}
      /> */}
      {/* {errors.usedSyringe && <span>This field is a number</span>} */}
      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register("vaccinLocation", { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {/* {errors.vaccinLocation && <span>This field is required</span>} */}

      {/* <input type="submit" /> */}
      <Button type="submit" variant='contained' color="green" sx={{ display: "block", my: 3 }}>
        Registrar Vacuna
      </Button>
    </form>
  );
  //   return (
  //     <div>InsulinForm</div>
  //   )
};

export default InsulinForm;
