import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { RecentInsulinType } from "../models/InputType";

type Props = {
  catName: string;
};

const CatInsulinTable = (props: Props) => {
  const theme = useTheme();
  const { catName } = props;
  const [recentInsulin, setRecentInsulin] = useState<RecentInsulinType[]>([]);

  useEffect(() => {
    if (!catName) return;
    const getRecentInsulin = async () => {
      const response = await fetch(
        "http://localhost:3000/api/cats/get-recent-insulin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ catName }),
        }
      );
      const recentInsulinData = await response.json();
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
            width: "43%",
            height: "70%",
            borderRadius: "20px",
            border: "0",
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: theme.palette.green.main }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>
                  <Typography variant="h6">Lugar vacunado</Typography>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  <Typography variant="h6">Dia vacunado</Typography>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  <Typography variant="h6">Chuuru usado</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentInsulin.map((insulin) => (
                <TableRow key={insulin.vaccineLocation}>
                  <TableCell>{insulin.vaccineLocation}</TableCell>
                  <TableCell sx={{ borderLeft: "1", borderRight: "1" }}>
                    {insulin.vaccinedAt}
                  </TableCell>
                  <TableCell>{insulin.chuuruNum}</TableCell>
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
