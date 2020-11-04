import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as flightApi from "../../api/flightApi";
import TextField from "@material-ui/core/TextField";
import {
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
 
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UpdateFlightServices = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [callFlag, setCallFlag] = useState(false);
  const [form, setForm] = useState({
    specialMeals: "",
    ancillaryServices: "",
    shop: "",
  });
  const [request, setRequest] = useState({
    specialMeals: [],
    ancillaryServices: [],
    shop: [],
  });
  const onSubmit = (event) => {
    event.preventDefault();
    let requestBody = {};
    /* Forming requestbody from entered input and respnse from flightId */
    requestBody["id"]=props.match.params.id;
    (form.specialMeals!="")? (requestBody["specialMeals"]= [...request["specialMeals"],form.specialMeals])
    : requestBody["specialMeals"]=[...request["specialMeals"]];
    (form.ancillaryServices!="")? (requestBody["ancillaryServices"]= [...request["ancillaryServices"],form.ancillaryServices])
    : requestBody["ancillaryServices"]=[...request["ancillaryServices"]];
    (form.shop!="")? requestBody["shop"]= [...request["shop"],form.shop]
    : requestBody["shop"]=[...request["shop"]]
     flightApi.saveflightService(requestBody).then((resp) => {
        history.push(`/admin/flights`);
     }); 
  };

  useEffect(() => {
    if(!callFlag)
    {
      /* Getting FLight details for clicked Id */
        flightApi.getFlightDetails(props.match.params.id).then((resp) => {
          setCallFlag(true);  
          setRequest({...request, ["specialMeals"]: resp[0].specialMeals,["ancillaryServices"]: resp[0].ancillaryServices,["shop"]: resp[0].shop});
  
});
}
});
 
  const handleChange = (e) => {
    
    const name = e.target.name;
    setForm({
      ...form,
      [name]: e.target.value,
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h6" color="inherit">
      SpecialMeal
      </Typography>
      <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="meal"
              label="Add a Meal"
              name="specialMeals"
              onChange={handleChange}
              autoFocus
            />
      
      <Typography variant="h6" color="inherit">
      AncillaryService
      </Typography>
      <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="ancillaryServices"
              label="Add a AncillaryService"
              name="ancillaryServices"
              autoFocus
            />
      <Typography variant="h6" color="inherit">
      Shop Item
      </Typography>
      <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="shop"
              label="Add a Shop Item"
              name="shop"
              onChange={handleChange}
              autoFocus
            />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        ADD
      </Button>
    </form>
  );
};

export default UpdateFlightServices;
