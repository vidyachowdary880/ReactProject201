import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MealsSeatMap from "./MealsSeatMap";
import { useSelector, useDispatch } from "react-redux";
import * as passengerActions from "../redux/actions/passengerActions";
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
} from "@material-ui/core";

 const NO_RESULTS="no results";

const ManagePassangers = (props) => {
  const [currentPassengerList, setCurrentPassengerList] = useState([]);
  const [ passengerList, setPassengerList] = useState([]);
  var response = useSelector((state) => state.passengers);
   

  if ( ((passengerList.length == 0) && response.length>0  )  ) {
    setPassengerList(response);
    setCurrentPassengerList(response);
  }  
  else if (((passengerList.length > 0) && response.length>0  ) )
  {
     if(passengerList[0].flightId != response[0].flightId)
     {
      setPassengerList(response);
      setCurrentPassengerList(response);
     }
  }
  

  const dispatch = useDispatch();
  useEffect(() => {
  const found=response.find(obj=>obj.flightId==props.match.params.id);
  if(found==undefined)
  {
    dispatch(passengerActions.getPassengers(props.match.params.id));
  } 
 
  },  [props.match.params.id] );

  
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
              <TableCell>PassengerId</TableCell>
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
                  specialMeals,
                  wheelChair,
                  shopRequest,
                  infants,
                } = passenger; // destructring
                return (
                  <TableRow key={index}>
                    <TableCell>{id}</TableCell>
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
                            to={`/staff/checkIn/managePassengers/seatMap/${id}/${flightId}`}
                          >
                           {checkIn ?  "Change Seat" : "Check In"}
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
