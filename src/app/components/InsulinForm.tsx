"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import FormTextField from "./atoms/FormTextField";
import { InsulinInputs } from "../models/InputType";
import CatInsulinTable from "./CatInsulinTable";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    green: true;
  }
}
// Api response type
type catNamesData = {
  name: string[];
};

const InsulinForm = () => {
  // Uso de useForm para manejar el formulario
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<InsulinInputs>();

  const today = dayjs();
  const [catNames, setCatNames] = useState<string[]>([]);
  const [catName, setCatName] = useState<string>("");

  // Funcion para obtener los nombres de los gatos
  async function getCatsNames() {
    const response = await fetch("http://localhost:3000/api/cats/get_cats");
    const data: catNamesData = await response.json();
    setCatNames(data.name);
  }

  // Uso de useEffect para obtener los nombres de los gatos al cargar el componente
  useEffect(() => {
    getCatsNames();
  }, []);

  // Registrar datos de la vacuna
  const onSubmit: SubmitHandler<InsulinInputs> = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/cats/register-insulin",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (responseData.error) {
        alert(responseData.error);
      } else {
        alert("Vacuna registrada con exito!");
        setCatName("");
        reset();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginRight: "40px" }}>
        <Typography variant="h6">Nombre de la Gatinha:</Typography>
        <FormControl>
          <InputLabel color="secondary">Selecciona una gatinha</InputLabel>
          <Controller
            name="gatinha"
            control={control}
            defaultValue=""
            rules={{ required: "Es necesario seleccionar una gatinha!" }}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setCatName(e.target.value);
                }}
                variant="outlined"
                color="secondary"
                label="Selecciona una gatinha"
                sx={{ width: "223px", bgcolor: "white" }}
              >
                {catNames.map((catName, index) => (
                  <MenuItem key={index} value={catName}>
                    {catName}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Typography sx={{ color: "red" }}>{errors.gatinha?.message}</Typography>
        <FormTextField
          title="Cantidad de jeringas utilizadas:"
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
          render={({ field: { ref, onChange, value } }) => {
            return (
              <DateTimePicker
                value={dayjs(value)}
                inputRef={ref}
                format="YYYY/MM/DD hh:mm A"
                onChange={(date) => {
                  if (date) {
                    const formattedDate =
                      dayjs(date).format("YYYY/MM/DD hh:mm A");
                    onChange(formattedDate);
                    setValue("vaccinDate", formattedDate);
                  }
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
      <CatInsulinTable catName={catName} />
    </Box>
  );
};

export default InsulinForm;
