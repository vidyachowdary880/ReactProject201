import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as passengerApi from "../../api/passengerApi";
import TextField from "@material-ui/core/TextField";
import {
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UpdatePassenger = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [callFlag, setCallFlag] = useState(false);
  const [form, setForm] = useState({
    passport: "",
    address: "",
    name: "",
  });
  console.log("form",form);
  const onSubmit = (event) => {
    event.preventDefault();
    const paramId = props.match.params.id;
    let request = {
      id: paramId,
      passport: form.passport,
      address: form.address,
      name: form.name
    };
     passengerApi.updatePassangerDetails(request).then((resp) => {
        history.push(`/admin`);
     });
  };

  useEffect(() => {
      if(!callFlag)
      {
    passengerApi.getPassengerDetailsById(props.match.params.id).then((resp) => {
       console.log(resp.passport);
    setForm({...form, ["passport"]: resp[0].passport,["address"]: resp[0].address,["name"]: resp[0].name});
    setCallFlag(true);
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
        Name
      </Typography>
      <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Passenger Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoFocus
            />
      
      <Typography variant="h6" color="inherit">
        Passport
      </Typography>
      <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="passport"
              label="Passenger Passport"
              name="passport"
              value={form.passport}
              onChange={handleChange}
              autoFocus
            />
      <Typography variant="h6" color="inherit">
       Address
      </Typography>
      <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="address"
              label="Passenger Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              autoFocus
            />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        UPDATE
      </Button>
    </form>
  );
};

export default UpdatePassenger;
