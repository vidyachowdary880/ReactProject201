import React, {  useState } from "react";
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
  Button,
  makeStyles,
  Grid,
  Divider,
  Dialog ,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
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
const FlightSeatMap = () => {
  const classes = useStyles();
  const [seatArray, setSeatArray] = useState(Array(20).fill(0));
  const [seatFill, setseatFill] = useState(false);
  const [passengerRequest, setPassengerRequest] = useState({});
  const [open, setOpen] =   useState(false);
  const [confirmPop, setConfirmPop] =   useState(false);
  const [errors, setErrors] = useState({});
  var response = useSelector((state) => state.passengers);
  console.log("resposne",response);
   if(response.length>0 &&  !seatFill )
   {
    let passengersWithSeat =response
    .filter((passenger) => passenger.seatNo !== "")
    .map((passenger) => {
      return {
        paxId: passenger.id,
        seatNo: passenger.seatNo,
        infants:passenger.infants,
        wheelChair:passenger.wheelChair,
        checkIn:passenger.checkIn
      };
    });
  setSeatsMap(passengersWithSeat);
   }
   const dispatch = useDispatch();
  

  function setSeatsMap(passengersWithSeat) {
    passengersWithSeat.map((item) => {
      formSeatArray(item);
    });
    setSeatArray(seatArray);
    setseatFill(true);
    console.log("seatArray", seatArray);
  }

  function formSeatArray(item) {
    const { seatNo,paxId,wheelChair, checkIn,infants} = item;

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
    if (wheelChair && infants ) {
      currentObj[col] = "BLOCKED WITH BOTH";
      seatArray[row] = currentObj;
    } else if(wheelChair){
      currentObj[col] = "BLOCKED WITH WHEELCHAIR";
      seatArray[row] = currentObj;
    }
    else if(infants){
        currentObj[col] = "BLOCKED WITH INFANT";
        seatArray[row] = currentObj;
      }
      else{
        currentObj[col] = "SELECTED";
        seatArray[row] = currentObj;
      }
  }

  function manageSeat( ) { 
      
    const found = response.find(value=>value.id==passengerRequest.passengerId);
    if(found !=undefined)
    {
    let request = {
      id: passengerRequest.passengerId,
      seatNo: passengerRequest.seatNo,
      checkIn:  true,
    };
    console.log("request",request);
      dispatch(passengerActions.updatePassengers(request)).then(() => {
        setSeatArray(Array(20).fill(0));
        setseatFill(false);
        handleClose();
     });
    } 
    else{
        const errors = {};
         errors.message =  true;
         setErrors(errors);
    }   
  }
  const handleClickOpen = (event) => {
    const passengerObj = response.find(value=>value.seatNo==event.currentTarget.value);
    setPassengerRequest({...passengerRequest, ["seatNo"]: event.currentTarget.value});
    if(passengerObj != undefined)
    {
        setPassengerRequest({...passengerRequest, ["passengerId"]: passengerObj.id});
        setConfirmPop(true);
    }
    else
    {
    setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const confirmClose =()=>{
      setConfirmPop(false);
  }

  const confirmSubmit =()=>{
    let request = {
        id: passengerRequest.passengerId,
        seatNo: "",
        checkIn:  false,
        
      };
      console.log("request",request);
        dispatch(passengerActions.updatePassengers(request)).then(() => {
          setSeatArray(Array(20).fill(0));
          setseatFill(false);
          confirmClose();
       });
}
  function handleChange({ target }) {
    setErrors({...errors,["message"]:false});
    setPassengerRequest({...passengerRequest, [target.name]: target.value});
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
                      <Seat seatData={row.A} seatNo={index+1+"A"} onClickSeat={handleClickOpen}/>
                    </TableCell>
                    <TableCell>
                      <Seat seatData={row.B} seatNo={index+1+"B"} onClickSeat={handleClickOpen}/>
                    </TableCell>
                    <TableCell>
                      <Seat seatData={row.C} seatNo={index+1+"C"} onClickSeat={handleClickOpen}/>
                    </TableCell>
                    <TableCell>
                      <Seat seatData={row.D} seatNo={index+1+"D"} onClickSeat={handleClickOpen}/>
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

        <Seat seatData="BLOCKED WITH BOTH" />
        <b>BLOCKED WITH BOTH</b>
        <Seat seatData="SELECTED" />
        <b>CHECKED IN</b>
        <Divider />
        <Seat seatData="BLOCKED WITH WHEELCHAIR" />
        <b>BLOCKED WITH WHEELCHAIR</b>
        <Seat seatData="BLOCKED WITH INFANT" />
        <b>BLOCKED WITH INFANT</b>
      </Grid>
      </Grid>


      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Passengers CheckIn</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter valid Passenger Id to checkIn
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Passenger Id"
            type="text"
            name="passengerId"
            onChange={handleChange}
            error={errors.message}
            fullWidth
          />
          {errors.message ? (
    <span>Invalid Passenger Id</span>
  ) : (
    <></>
  )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={manageSeat} color="primary">
            Check In
          </Button>
        </DialogActions>
      </Dialog>
{/*confirm popup for removing seat*/}
      <Dialog
        open={confirmPop}
        onClose={confirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confrim"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             Confirm Undo CheckIn
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmSubmit} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FlightSeatMap;
