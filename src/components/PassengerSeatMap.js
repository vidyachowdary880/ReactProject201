import React, { useEffect, useState } from "react";
import Seat from "./Seat";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as passengerActions from "../redux/actions/passengerActions";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  makeStyles,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    maxWidth: 550,
  },
  box: {
    marginLeft: 750,
    marginBottom: 2,
  },
});
const PassengerSeatMap = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [seatArray, setSeatArray] = useState(Array(20).fill(0));
  const [seatFill, setseatFill] = useState(false);
  var response = useSelector((state) => state.passengers);
   
   if(response.length>0 &&  !seatFill )
   {
    let passengersWithSeat =response
    .filter((passenger) => passenger.seatNo !== "")
    .map((passenger) => {
      return {
        paxId: passenger.id,
        seatNo: passenger.seatNo
      };
    });
  setSeatsMap(passengersWithSeat);
   }
   const dispatch = useDispatch();
  useEffect(() => {
      if(response == undefined || response.length==0 )
      {
    dispatch(passengerActions.getPassengers(props.match.params.flightId));
      }
  }, [props.match.params.flightId]);

  function setSeatsMap(passengersWithSeat) {
    passengersWithSeat.map((item) => {
      formSeatArray(item);
    });
    setSeatArray(seatArray);
    setseatFill(true);
    console.log("seatArray", seatArray);
  }

  function formSeatArray(item) {
    const { seatNo,paxId } = item;

    let row;
    let col;
    if (seatNo.length == 3) {
      row = String(seatNo).charAt(0) + String(seatNo).charAt(1) - 1;
      col = String(seatNo).charAt(2);
    } else {
      row = String(seatNo).charAt(0) - 1;
      col = String(seatNo).charAt(1);
    }
    let currentObj = {};
    if (seatArray[row] !== undefined && seatArray[row] !== 0) {
      currentObj = seatArray[row];
    }
    if (paxId == props.match.params.id) {
      currentObj[col] = "SELECTED";
      seatArray[row] = currentObj;
    } else {
      currentObj[col] = "BLOCKED";
      seatArray[row] = currentObj;
    }
  }

  function manageSeat(event) {
      console.log(event.currentTarget.value);
      const paramId = props.match.params.id; 
    let request = {
      id: paramId,
      seatNo: event.currentTarget.value,
      checkIn:  true,
    };
      dispatch(passengerActions.updatePassengers(request)).then(() => {
      let par = props.match.params.flightId;
      history.push(`/staff/checkIn/managePassengers/${par}`);
     });  
  }
  return (
    <>
     <Grid container spacing={0}>
           <Grid item xs={12} md={6} lg={6}> 
      <Box component="div" display="inline">
        <TableContainer className={classes.table}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>A</TableCell>
                <TableCell>B</TableCell>
                <TableCell>C</TableCell>
                <TableCell>D</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {seatArray.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Seat seatData={row.A} seatNo={index+1+"A"} onClickSeat={manageSeat}/>
                    </TableCell>
                    <TableCell>
                      <Seat seatData={row.B} seatNo={index+1+"B"} onClickSeat={manageSeat}/>
                    </TableCell>
                    <TableCell>
                      <Seat seatData={row.C} seatNo={index+1+"C"} onClickSeat={manageSeat}/>
                    </TableCell>
                    <TableCell>
                      <Seat seatData={row.D} seatNo={index+1+"D"} onClickSeat={manageSeat}/>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      </Grid>
      <Grid item xs={9} md={6} lg={6}> 
        <Seat seatData="BLOCKED" />
        <b>BLOCKED</b>
        <Seat seatData="SELECTED" />
        <b>SELECTED</b>
      </Grid>
      </Grid>
    </>
  );
};

export default PassengerSeatMap;
