import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as passengerApi from "../../api/passengerApi";
import {
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
  Typography,
} from "@material-ui/core";

 const NO_RESULTS="no results";

const PassengerPage = (props) => {
  const [currentPassengerList, setCurrentPassengerList] = useState([]);
  const [ passengerList, setPassengerList] = useState([]);
  const [flightDetailList, setFlightDetailList] = useState([]);
  const [fixedList, setFixedList] = useState([]);
  let displayList=[];
  let index=0;
  if((passengerList.length>0 && flightDetailList.length>0 )&& currentPassengerList.length==0)
  {
  flightDetailList.forEach(element=>{
    const { id,seatNo,flightId,wheelChair, checkIn,infants,shopRequest} = element;
    const passenger=passengerList.find(obj=>obj.id==id);
  
    let displayobj={};
    displayobj['seatNo']=seatNo;
    displayobj['flightId']=flightId;
    displayobj['wheelChair']=wheelChair;
    displayobj['checkIn']=checkIn;
    displayobj ['infants']=infants;
    displayobj['id']=id;
    displayobj ['shopRequest']=shopRequest; 
    if(passenger != undefined)
    {
  const { name,passport,dob, address} = passenger;
    displayobj ['name']=name;
    displayobj ['passport']=passport;
    displayobj ['dob']=dob;
    displayobj ['address']=address;
    }
    displayList[index]=displayobj;
    index++
  });
  setFixedList(displayList);
  setCurrentPassengerList(displayList);
}
   
  useEffect(() => {
    if (flightDetailList.length === 0) {
        passengerApi.getAllPassengerFlightDetails().then((resp) => {
          console.log(resp);
          setFlightDetailList(resp);           
        });
      }   
      if (passengerList.length === 0) {
        passengerApi.getAllPassengerDetails().then((resp) => {
            console.log(resp);
            setPassengerList(resp);
          });
        }  
  }  );

  
  const [checkBoxstate, setCheckBoxstate] = useState({
    passport: false,
    dob: false,
    address: false,
  });

  const handleChange = (event) => {
    let passport = checkBoxstate.passport;
    let dob = checkBoxstate.dob;
    let address = checkBoxstate.address;

    const name = event.target.name;
    if (name === "passport") {
    passport = !checkBoxstate.passport;
    } else if (name === "dob") {
        dob = !checkBoxstate.dob;
    } else if (name === "address") {
        address = !checkBoxstate.address;
    }

    setCheckBoxstate({
      ...checkBoxstate,
      [name]: event.target.checked,
    });
    let filterList = fixedList;
    if (passport) {
      filterList = filterList.filter((pas) => pas.passport=="");
    }
    if (dob) {
      filterList = filterList.filter((pas) => pas.dob=="");
    }
    if (address) {
      filterList = filterList.filter((pas) => pas.address=="");
    }
    setCurrentPassengerList(filterList);
  };

  return (
    <>
   <div>
   <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
           
          >
            Filter By Missing Mandatory field
          </Typography>
   </div>
      <FormGroup row>
    
        <FormControlLabel
          control={
            <Checkbox
              checked={checkBoxstate.passport}
              onChange={handleChange}
              name="passport"
              color="primary"
            />
          }
          label="Passport"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkBoxstate.dob}
              onChange={handleChange}
              name="dob"
              color="primary"
            />
          }
          label="DOB"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkBoxstate.address}
              onChange={handleChange}
              name="address"
              color="primary"
            />
          }
          label="Address"
        />
      </FormGroup>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>FlightId</TableCell>
              <TableCell>Passenger Name</TableCell>
              <TableCell>Checking Status</TableCell>
              <TableCell>Seat Number</TableCell>
              <TableCell>Shopping Request</TableCell>
              <TableCell>wheelChair</TableCell>
              <TableCell>InfantFacility</TableCell>
              <TableCell>PassportNo</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Address</TableCell>
             <TableCell>Update Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPassengerList.length == 0 ? (
              <TableRow  >
              <TableCell>{NO_RESULTS }</TableCell>
                </TableRow>
             
            ) : (
              currentPassengerList.map((passenger, index) => {
                const {
                  id,
                  flightId,
                  name,
                  checkIn,
                  seatNo,
                  wheelChair,
                  shopRequest,
                  infants,
                  passport,
                  dob,
                  address
                } = passenger; // destructring
                return (
                  <TableRow key={index}>
                    <TableCell>{flightId}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{checkIn ? "Yes" : "No"}</TableCell>
                    <TableCell>{seatNo}</TableCell>
                    <TableCell>{shopRequest}</TableCell>
                    <TableCell>{wheelChair ? "Yes" : "No"}</TableCell>
                    <TableCell>{infants ? "Yes" : "No"}</TableCell>
                    <TableCell>{passport}</TableCell>
                    <TableCell>{dob}</TableCell>
                    <TableCell>{address}</TableCell>
                        <TableCell>
                          <Button>
                            <Link
                              to={`/admin/updatePassenger/${id}`}
                            >
                            Update Pessenger Details
                            </Link>
                          </Button>
                        </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PassengerPage;
