import React, { useEffect, useState } from "react";
import Seat from "./Seat";
 
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
const MealsSeatMap = (props) => {
  const classes = useStyles();
  const [seatArray, setSeatArray] = useState(Array(20).fill(0));
  const [ passengerList, setPassengerList] = useState([]);
   if(props.passengerDetials.length>0 && passengerList.length==0)
   {
    let passengersWithSeat = props.passengerDetials
    .filter((passenger) => passenger.seatNo !== "")
    .map((passenger) => {
      return {
        paxId: passenger.id,
        seatNo: passenger.seatNo,
        meals: passenger.specialMeals,
      };
    });
  setSeatsMap(passengersWithSeat);
  setPassengerList(props.passengerDetials);
   }
  useEffect(() => {
   /*  passengerApi.getPassengerFlightDetails(props.flightId).then((resp) => {
      console.log(resp);
      
    }); */
    console.log("passengerList",props.passengerDetials)
      // getting all passengers having seat
      let passengersWithSeat = props.passengerDetials
        .filter((passenger) => passenger.seatNo !== "")
        .map((passenger) => {
          return {
            paxId: passenger.id,
            seatNo: passenger.seatNo,
            meals: passenger.specialMeals,
          };
        });
      setSeatsMap(passengersWithSeat);
  }, []);

  function setSeatsMap(passengersWithSeat) {
    passengersWithSeat.map((item) => {
      formSeatArray(item);
    });
    setSeatArray(seatArray);
    console.log("seatArray", seatArray);
  }

  function formSeatArray(item) {
    const { seatNo, meals } = item;

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
    if (meals !== "") {
      currentObj[col] = "MEAL";
      seatArray[row] = currentObj;
    } else {
      currentObj[col] = "NO MEAL";
      seatArray[row] = currentObj;
    }
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
                      <Seat seatData={row.A} meal={true} />
                    </TableCell>
                    <TableCell>
                      <Seat seatData={row.B} meal={true} />
                    </TableCell>
                    <TableCell>
                      <Seat seatData={row.C}  meal={true}/>
                    </TableCell>
                    <TableCell>
                      <Seat seatData={row.D} meal={true}/>
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
        <Seat seatData="MEAL" meal={true} />
        <b>MEAL</b>
        <Seat seatData="NO MEAL"  meal={true}/>
        <b>NO SPEACIAL MEAL</b>
      </Grid>
      </Grid>
    </>
  );
};

export default MealsSeatMap;
