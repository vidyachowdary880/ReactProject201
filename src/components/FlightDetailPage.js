
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MealsSeatMap from "./MealsSeatMap";
import { useSelector, useDispatch } from "react-redux";
import * as flightApi from "../api/flightApi";
import * as passengerActions from "../redux/actions/passengerActions";
import {
  Button,
  Typography,
  Grid,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FlightSeatMap from "./FlightSeatMap";

const useStyles = makeStyles((theme) => ({
  linkText: {
    color: "white",
    textDecoration: "none",
  },
}));



const FlightDetailPage = (props) => {
     const classes = useStyles();
    const [flightData, setFlightData] = useState(null);
    var response = useSelector((state) => state.passengers);
    if(  response !=undefined)
    {
    
    var filledSeats=getSeatCount(response);
    }
  
    const dispatch = useDispatch();
    useEffect(() => {
        if (flightData ==null) {
            flightApi.getFlightDetails(props.match.params.id).then((resp) => {
                setFlightData(resp[0]);   
            })
        }
        const found=response.find(obj=>obj.flightId==props.match.params.id);
        if(found==undefined)
        {
      dispatch(passengerActions.getPassengers(props.match.params.id)); 
        } 
    },  [props.match.params.id] );

    function getSeatCount(response) {
        let count =0;
        response.forEach(element => {
            if(element.checkIn)
            {
                count++;
            }
        });
        return count;
    }
    return (
        <div>
         <Grid container spacing={0}>
           <Grid item xs={12} md={4} lg={4}>
           <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
          >
            FlightName:
          </Typography>  
           { flightData !=null ? (flightData.name): null }  
            <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
          >
            Depature: 
          </Typography> 
            { flightData !=null ? (flightData.depature): null }  
            <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
          >
            Destination:
          </Typography>
           { flightData !=null ? (flightData.destination): null }  
            <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
          >
            Available Ancillary Services: 
          </Typography>
          { flightData !=null ? (flightData.ancillaryServices.map((a,index)=>{
                    return (<Typography key={index}
                    >{a}</Typography>)
                  })): null }  
           </Grid>
           <Grid item xs={12} md={4} lg={4}>
           <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
          >
            Available Meal Types: 
          </Typography>
          { flightData !=null ? (flightData.specialMeals.map((a,index)=>{
                    return (<Typography key={index}
                    >{a}</Typography>)
                  })): null }  
           <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
          >
            Available Shop Items: 
          </Typography>
          { flightData !=null ? (flightData.shop.map((a,index)=>{
                    return (<Typography key={index}
                    >{a}</Typography>)
                  })): null }  
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
          >
            Filled Seats: 
          </Typography>
          { filledSeats !=undefined ? filledSeats: 0 }  
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
          >
           Available Passengers: 
          </Typography>
          { response !=undefined ? response.length: 0 }  
          </Grid>
           <Grid item xs={4} md={3} lg={3}>
           <Button variant="contained" color="primary">
             <Link className={classes.linkText} to={"/staff/checkIn/managePassengers/" + props.match.params.id}>
             Manange Passengers </Link></Button>
           </Grid>
          </Grid>
          <Divider   />
          <Divider   />
          <Divider   />
          <Typography
           component="h1"
           variant="h6"
           color="inherit"
           noWrap>Select seat to checkIn passenger or undo checkIn</Typography>
          <Grid container spacing={0}>
            {/* Flight Seat Map Component */}
          <FlightSeatMap
            flightId={props.match.params.id}
          />
            </Grid>
        </div>
    );

}


export default FlightDetailPage;