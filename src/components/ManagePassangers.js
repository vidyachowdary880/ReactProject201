import React, { useState, useEffect } from "react";
import * as passengerApi from "../api/passengerApi";
import { Link } from "react-router-dom";
import MealsSeatMap from "./MealsSeatMap";
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

const ManagePassangers = (props) => {
  const [passengerList, setPassengerList] = useState([]);
  const [currentPassengerList, setCurrentPassengerList] = useState([]);
  useEffect(() => {
    if (passengerList.length === 0) {
      passengerApi
        .getPassengerFlightDetails(props.match.params.id)
        .then((resp) => {
          console.log(resp);
          setPassengerList(...passengerList, resp);
          setCurrentPassengerList(resp);
        });
    }
  });

  const [checkBoxstate, setCheckBoxstate] = useState({
    checkIn: false,
    wheelChair: false,
    InfantFacility: false,
  });

  const handleChange = (event) => {
    let isChecked = checkBoxstate.checkIn;
    let wheelChair = checkBoxstate.wheelChair;
    let infantFacility = checkBoxstate.InfantFacility;

    const name = event.target.name;
    if (name === "checkIn") {
      isChecked = !checkBoxstate.checkIn;
    } else if (name === "wheelChair") {
      wheelChair = !checkBoxstate.wheelChair;
    } else if (name === "InfantFacility") {
      infantFacility = !checkBoxstate.InfantFacility;
    }

    setCheckBoxstate({
      ...checkBoxstate,
      [name]: event.target.checked,
    });
    let filterList = passengerList;
    if (isChecked) {
      filterList = filterList.filter((pas) => pas.checkIn);
    }
    if (wheelChair) {
      filterList = filterList.filter((pas) => pas.wheelChair);
    }
    if (infantFacility) {
      filterList = filterList.filter((pas) => pas.infants);
    }

    setCurrentPassengerList(filterList);
  };

  return (
    <>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkBoxstate.checkIn}
              onChange={handleChange}
              name="checkIn"
              color="primary"
            />
          }
          label="CheckIn"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkBoxstate.wheelChair}
              onChange={handleChange}
              name="wheelChair"
              color="primary"
            />
          }
          label="WheelChair"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkBoxstate.InfantFacility}
              onChange={handleChange}
              name="InfantFacility"
              color="primary"
            />
          }
          label="InfantFacility"
        />
      </FormGroup>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>FligtName</TableCell>
              <TableCell>Passenger Name</TableCell>
              <TableCell>Checking Status</TableCell>
              <TableCell>Seat Number</TableCell>
              <TableCell>Special Meals</TableCell>
              <TableCell>Shopping Request</TableCell>
              <TableCell>wheelChair</TableCell>
              <TableCell>InfantFacility</TableCell>
              {props.match.params.services ? (
                <>
                  <TableCell>Update Services</TableCell>
                </>
              ) : (
                <TableCell>Check in</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPassengerList.length == 0 ? (
              <Typography variant="h6" color="inherit">
                No results
              </Typography>
            ) : (
              currentPassengerList.map((passenger, index) => {
                const {
                  id,
                  flightId,
                  name,
                  checkIn,
                  seatNo,
                  specialMeals,
                  wheelChair,
                  shopRequest,
                  infants,
                  passengerId,
                } = passenger; // destructring
                return (
                  <TableRow key={index}>
                    <TableCell>{flightId}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{checkIn ? "Yes" : "No"}</TableCell>
                    <TableCell>{seatNo}</TableCell>
                    <TableCell>{specialMeals}</TableCell>
                    <TableCell>{shopRequest}</TableCell>
                    <TableCell>{wheelChair ? "Yes" : "No"}</TableCell>
                    <TableCell>{infants ? "Yes" : "No"}</TableCell>

                    {props.match.params.services ? (
                      <>
                        <TableCell>
                          <Button>
                            <Link
                              to={`/staff/inFlight/flightServices/${id}/${flightId}`}
                            >
                              Add Services
                            </Link>
                          </Button>
                        </TableCell>
                      </>
                    ) : (
                      <TableCell>
                        {" "}
                        <Button>
                          <Link
                            to={`/staff/checkIn/seatMatrix/${id}/${flightId}`}
                          >
                            Check In
                          </Link>
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        {props.match.params.services ? (
          <MealsSeatMap
            passengerDetials={passengerList}
            flightId={props.match.params.id}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ManagePassangers;
