import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { RecentInsulinType } from "../models/RecentInsulin";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  catName: string;
};

const CatInsulinTable = (props: Props) => {
  const theme = useTheme();
  const { catName } = props;
  const [recentInsulin, setRecentInsulin] = useState<RecentInsulinType[]>([]);
  const [originalInsulin, setOriginalInsulin] = useState<RecentInsulinType[]>(
    []
  );
  const [isEditMode, setIsEditMode] = useState(false);

  // Funcion para manejar los cambios del input
  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) {
    const { name, value } = e.target;
    setRecentInsulin((recentInsulin) =>
      recentInsulin.map((insulin, i) =>
        index === i ? { ...insulin, [name]: value } : insulin
      )
    );
  }

  // Funcion para el boton del lapiz (Activa el modo Edit)
  function handleEditClick() {
    setOriginalInsulin([...recentInsulin]);
    setIsEditMode(true);
  }

  // Funcion para el boton de cancelar el modo edit.
  function handleCancelClick() {
    setRecentInsulin([...originalInsulin]);
    setIsEditMode(false);
  }

  // Funcion para realizar la edicion.
  async function handleUpdateRecentInsulin(data: RecentInsulinType[]) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cats/edit-recent-insulin`,
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
        setIsEditMode(false);
        alert("Vacuna editada con exito!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (!catName) return;
    const getRecentInsulin = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cats/get-recent-insulin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ catName }),
        }
      );
      const recentInsulinData: RecentInsulinType[] = await response.json();
      setRecentInsulin(recentInsulinData);
    };
    getRecentInsulin();
  }, [catName]);

  return (
    <>
      {recentInsulin.length > 0 && catName !== "" && (
        <TableContainer
          component={Paper}
          sx={{
            width: isEditMode ? "65%" : "43%",
            height: "70%",
            borderRadius: "20px",
            border: "0",
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: theme.palette.green.main }}>
              <TableRow>
                {/* Lugar Header */}
                <TableCell
                  align="center"
                  sx={{ color: "white", borderBottom: "none" }}
                >
                  <Typography variant="h6">Lugar</Typography>
                </TableCell>
                {/* Dia Header */}
                <TableCell
                  align="center"
                  sx={{ color: "white", borderBottom: "none" }}
                >
                  <Typography variant="h6">Dia</Typography>
                </TableCell>
                {/* Chuuru Header */}
                <TableCell
                  align="center"
                  sx={{ color: "white", borderBottom: "none" }}
                >
                  <Typography variant="h6">Chuuru</Typography>
                </TableCell>
                {/* Edit Header */}
                {isEditMode ? (
                  <TableCell sx={{ display: "flex" }}>
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateRecentInsulin(recentInsulin)}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        handleCancelClick();
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                ) : (
                  <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton
                      size="small"
                      onClick={() => {
                        handleEditClick();
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {isEditMode
                ? recentInsulin.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {/* TextField: Lugar de vacuna */}
                        <TextField
                          size="small"
                          name="vaccineLocation"
                          defaultValue={data.vaccineLocation}
                          onChange={(e) => {
                            handleOnChange(e, index);
                          }}
                          sx={{ width: "140px" }}
                        />
                      </TableCell>
                      <TableCell>
                        {/* TextField: Dia de vacuna */}
                        <TextField
                          size="small"
                          name="vaccinedAt"
                          defaultValue={data.vaccinedAt}
                          onChange={(e) => {
                            handleOnChange(e, index);
                          }}
                          sx={{ width: "185px" }}
                        />
                      </TableCell>
                      <TableCell>
                        {/* TextField: Chuuru */}
                        <TextField
                          size="small"
                          name="chuuruNum"
                          defaultValue={data.chuuruNum}
                          onChange={(e) => {
                            handleOnChange(e, index);
                          }}
                          sx={{ width: "50px" }}
                        />
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  ))
                : recentInsulin.map((data, index) => (
                    <TableRow key={index}>
                      {/* Cell: Lugar de vacuna */}
                      <TableCell align="center">
                        {data.vaccineLocation}
                      </TableCell>
                      {/* Cell: Dia de vacuna */}
                      <TableCell
                        align="center"
                        sx={{ borderLeft: "1", borderRight: "1" }}
                      >
                        {data.vaccinedAt}
                      </TableCell>
                      {/* Cell: Chuuru */}
                      <TableCell align="center">{data.chuuruNum}</TableCell>
                      <TableCell />
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default CatInsulinTable;
