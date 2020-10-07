import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as passengerActions from "../../redux/actions/passengerActions";
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
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

const InFLightService = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    wheelChair: false,
    infantFacility: false,
    meals: "",
    shopping_items: "",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const paramId = props.match.params.id;
    let request = {
      id: paramId,
      specialMeals: form.meals,
      shopRequest: form.shopping_items,
      wheelChair: form.wheelChair,
      infants: form.infantFacility,
    };
    dispatch(passengerActions.updatePassengers(request)).then(() => {
      let par = props.match.params.flightId;
      history.push(`/staff/inFlight/managePassengers/${par}/true`, { from: 'updatePage' });
     });
   
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h6" color="inherit">
        Add Ancillary services
      </Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={form.wheelChair}
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
              checked={form.infantFacility}
              onChange={handleChange}
              name="infantFacility"
              color="primary"
            />
          }
          label="InfantFacility"
        />
      </FormGroup>
      <Typography variant="h6" color="inherit">
        Meal Selection
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Meal</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={form.meals}
          onChange={handleChange}
          name="meals"
        >
          <MenuItem value="vegMega">vegMega</MenuItem>
          <MenuItem value="NonVegCombo">NonVegCombo</MenuItem>
          <MenuItem value="Ala-carte">Ala-carte</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="h6" color="inherit">
        Shop Request
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">ShopRequest</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={form.shopping_items}
          onChange={handleChange}
          name="shopping_items"
        >
          <MenuItem value="HeadRest">HeadRest</MenuItem>
          <MenuItem value="ipod">ipod</MenuItem>
          <MenuItem value="Shoes">Shoes</MenuItem>
        </Select>
      </FormControl>
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

export default InFLightService;
