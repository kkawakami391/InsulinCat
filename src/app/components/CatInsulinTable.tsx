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

type InsulinEditData = {
  vaccineLocation: string;
  vaccinedAt: Date;
  chuuruNum: number;
}[];

const CatInsulinTable = (props: Props) => {
  const theme = useTheme();
  const { catName } = props;
  const [recentInsulin, setRecentInsulin] = useState<RecentInsulinType[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [InsulinEditData, setInsulinEditData] = useState<InsulinEditData>([]);

  function handleOnChange() {}

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
                    <IconButton size="small">
                      <CheckCircleOutlineIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setIsEditMode(!isEditMode);
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
                        setIsEditMode(!isEditMode);
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
                          defaultValue={data.vaccineLocation}
                          sx={{ width: "140px" }}
                        />
                      </TableCell>
                      <TableCell>
                        {/* TextField: Dia de vacuna */}
                        <TextField
                          size="small"
                          defaultValue={data.vaccinedAt}
                          sx={{ width: "185px" }}
                        />
                      </TableCell>
                      <TableCell>
                        {/* TextField: Chuuru */}
                        <TextField
                          size="small"
                          defaultValue={data.chuuruNum}
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
