import React, { Fragment } from "react";
import {
  Grid,
  Card,
  TextField,
  Divider,
  Button,
  Snackbar,
} from "@material-ui/core";
import {
  FormControlLabel,
  Checkbox,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import { EventSchema } from "../../schemas/eventSchema";
import { addEvent } from "../../services/eventService";
import getLookUpTables from "../../services/lookUpService";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import FileUpload from "../FileUpload";

class AddEvent extends React.Component {
  state = {
    events: {
      eventType: 0,
      eventCategory: 0,
      eventName: "",
      summary: "",
      shortDescription: "",
      name: "",
      description: "",
      url: "",
      imageUrl: null,
      locationTypeId: "",
      lineOne: "",
      lineTwo: "",
      city: "",
      zip: "",
      stateId: "",
      latitude: 90.0,
      longitude: 36.0,
      createdBy: 98,
      modifiedBy: 98,
      eventStatusId: 1,
      eventImageUrl: "",
      externalId: null,
      externalSiteUrl: null,
      dateStart: "",
      dateEnd: "",
      isFree: false,
    },
    lookUpTypes: {
      eventTypes: [],
      eventCategories: [],
      locationTypes: [],
      states: [],
    },
    display: false,
  };

  selectMenus = ["States", "EventTypes", "EventCategories", "LocationTypes"];
  componentDidMount = () => {
    getLookUpTables(this.selectMenus)
      .then(this.onGetLookUpSuccess)
      .catch(this.onGlobalError);
  };

  onAddEvent = (value, { setSubmitting }) => {
    addEvent(value)
      .then((res) => {
        setSubmitting(false);
        this.onAddEventSuccess(res);
      })
      .catch(this.onAddEventError);
  };

  onGetLookUpSuccess = (response) => {
    let eventTypeArray = response.item.eventTypes;
    let eventCategoryArray = response.item.eventCategories;
    let locationTypeArray = response.item.locationTypes;
    let stateArray = response.item.states;

    this.setState((prevState) => {
      return {
        ...prevState,
        lookUpTypes: {
          eventTypes: eventTypeArray.map(this.mapTableType),
          eventCategories: eventCategoryArray.map(this.mapTableType),
          locationTypes: locationTypeArray.map(this.mapTableType),
          states: stateArray.map(this.mapTableType),
        },
      };
    });
  };

  mapTableType = (item) => {
    return (
      <MenuItem key={item.id} value={item.id}>
        {item.name}
      </MenuItem>
    );
  };

  onGlobalError = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        display: true,
      };
    });
  };

  onAddEventSuccess = () => {
    this.props.history.push(`/events`);
  };

  onAddEventError = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        display: true,
      };
    });
  };

  updateUrl = (response, setFieldValue) => {
    setFieldValue("eventImageUrl", response[0]);
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState((prevState) => {
      return { ...prevState, display: false };
    });
  };

  render() {
    return (
      <Fragment>
        <Formik
          enableReinitialize={true}
          initialValues={this.state.events}
          validationSchema={EventSchema}
          onSubmit={this.onAddEvent}
        >
          {(formikProps) => {
            const {
              values,
              touched,
              errors,
              setFieldValue,
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
            } = formikProps;
            return (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={4} justify="center">
                  <Grid item>
                    <Card className="p-4 mb-4">
                      <h1
                        //style={{ marginLeft: "300px" }}
                        className="font-size-xxl font-weight-bold"
                      >
                        Enter a New Event
                      </h1>
                      <Divider className="my-4" />
                      <Grid container spacing={4}>
                        <Grid item>
                          <FormControl
                            className="w-100"
                            error={
                              touched.eventType && Boolean(errors.eventType)
                            }
                          >
                            <div
                              style={{
                                marginTop: "5px",
                                marginLeft: "10px",
                              }}
                              className="font-size-xs font-weight-light"
                            >
                              Choose an Event Type
                            </div>
                            <Select
                              fullWidth
                              id="eventType"
                              value={values.eventType}
                              name="eventType"
                              type="number"
                              className="m-2"
                              variant="outlined"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.eventType && Boolean(errors.eventType)
                              }
                              helpertext={touched.eventType && errors.eventType}
                            >
                              {this.state.lookUpTypes.eventTypes}
                            </Select>
                          </FormControl>

                          <FormControl
                            className="w-100"
                            error={
                              touched.eventCategory &&
                              Boolean(errors.eventCategory)
                            }
                          >
                            <div
                              style={{
                                marginTop: "5px",
                                marginLeft: "10px",
                              }}
                              className="font-size-xs font-weight-light"
                            >
                              Choose an Event Category
                            </div>
                            <Select
                              fullWidth
                              id="eventCategory"
                              value={values.eventCategory}
                              name="eventCategory"
                              type="number"
                              className="m-2"
                              variant="outlined"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.eventCategory &&
                                Boolean(errors.eventCategory)
                              }
                              helpertext={
                                touched.eventCategory && errors.eventCategory
                              }
                            >
                              {this.state.lookUpTypes.eventCategories}
                            </Select>
                          </FormControl>
                          <div
                            style={{
                              marginTop: "5px",
                              marginLeft: "10px",
                            }}
                            className="font-size-xs font-weight-light"
                          >
                            Name of the Event
                          </div>
                          <TextField
                            style={{ marginRight: "10px" }}
                            fullWidth
                            className="m-2"
                            id="outlined-textarea"
                            variant="outlined"
                            name="eventName"
                            type="eventName"
                            value={values.eventName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.eventName && Boolean(errors.eventName)
                            }
                            helpertext={touched.eventName && errors.eventName}
                          />
                          <div
                            style={{
                              marginTop: "5px",
                              marginLeft: "10px",
                            }}
                            className="font-size-xs font-weight-light"
                          >
                            Summary
                          </div>
                          <div>
                            <TextField
                              fullWidth
                              className="m-2"
                              id="outlined-textarea"
                              multiline
                              variant="outlined"
                              name="summary"
                              type="summary"
                              value={values.summary}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.summary && Boolean(errors.summary)}
                              helperText={touched.summary && errors.summary}
                            />
                            <div
                              style={{
                                marginTop: "5px",
                                marginLeft: "10px",
                              }}
                              className="font-size-xs font-weight-light"
                            >
                              Event Description
                            </div>
                            <TextField
                              fullWidth
                              className="m-2"
                              id="outlined-textarea"
                              multiline
                              variant="outlined"
                              name="shortDescription"
                              type="shortDescription"
                              value={values.shortDescription}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.shortDescription &&
                                Boolean(errors.shortDescription)
                              }
                              helpertext={
                                touched.shortDescription &&
                                errors.shortDescription
                              }
                            />
                          </div>
                          <div>
                            <div style={{ marginLeft: "10px" }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={values.isFree}
                                    onChange={handleChange}
                                    name="isFree"
                                    error={
                                      touched.isFree && Boolean(errors.isFree)
                                    }
                                    helpertext={touched.isFree && errors.isFree}
                                  />
                                }
                                label="Is the Event Free?"
                              />
                            </div>
                          </div>

                          <div
                            style={{ marginTop: "50px" }}
                            className="font-size-lg font-weight-bold"
                          >
                            Venue Information
                          </div>
                          <Divider className="my-4" />
                          <div>
                            <div
                              style={{
                                marginTop: "5px",
                                marginLeft: "10px",
                              }}
                              className="font-size-xs font-weight-light"
                            >
                              Venue Name
                            </div>
                            <TextField
                              fullWidth
                              className="m-2"
                              id="outlined-basic"
                              variant="outlined"
                              name="name"
                              type="name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.name && Boolean(errors.name)}
                              helpertext={touched.name && errors.name}
                            />
                          </div>
                          <div
                            style={{
                              marginTop: "5px",
                              marginLeft: "10px",
                            }}
                            className="font-size-xs font-weight-light"
                          >
                            Venue Description
                          </div>
                          <div>
                            <TextField
                              fullWidth
                              className="m-2"
                              id="outlined-basic"
                              variant="outlined"
                              name="description"
                              type="description"
                              value={values.description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.description &&
                                Boolean(errors.description)
                              }
                              helpertext={
                                touched.description && errors.description
                              }
                            />
                          </div>
                          <div
                            style={{
                              marginTop: "5px",
                              marginLeft: "10px",
                            }}
                            className="font-size-xs font-weight-light"
                          >
                            Venue Website Url
                          </div>
                          <div>
                            <TextField
                              fullWidth
                              className="m-2"
                              id="outlined-basic"
                              variant="outlined"
                              name="url"
                              type="url"
                              value={values.url}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.url && Boolean(errors.url)}
                              helpertext={touched.url && errors.url}
                            />
                          </div>
                          <FormControl
                            className="w-100"
                            error={
                              touched.locationTypeId &&
                              Boolean(errors.locationTypeId)
                            }
                          >
                            <div
                              style={{
                                marginTop: "5px",
                                marginLeft: "10px",
                              }}
                              className="font-size-xs font-weight-light"
                            >
                              Choose a Venue Location Type
                            </div>
                            <Select
                              fullWidth
                              id="locationTypeId"
                              value={values.locationTypeId}
                              labelId="locationTypeLabel"
                              name="locationTypeId"
                              type="number"
                              className="m-2"
                              variant="outlined"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.locationTypeId &&
                                Boolean(errors.locationTypeId)
                              }
                              helpertext={
                                touched.locationTypeId && errors.locationTypeId
                              }
                            >
                              {this.state.lookUpTypes.locationTypes}
                            </Select>
                          </FormControl>

                          <div>
                            <div
                              style={{
                                marginTop: "5px",
                                marginLeft: "10px",
                              }}
                              className="font-size-xs font-weight-light"
                            >
                              Address Line One
                            </div>
                            <TextField
                              fullWidth
                              className="m-2"
                              id="outlined-basic"
                              variant="outlined"
                              name="lineOne"
                              type="lineOne"
                              value={values.lineOne}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.lineOne && Boolean(errors.lineOne)}
                              helpertext={touched.lineOne && errors.lineOne}
                            />
                          </div>
                          <div
                            style={{
                              marginTop: "5px",
                              marginLeft: "10px",
                            }}
                            className="font-size-xs font-weight-light"
                          >
                            Line Two (Optional)
                          </div>
                          <div>
                            <TextField
                              fullWidth
                              className="m-2"
                              id="outlined-basic"
                              variant="outlined"
                              name="lineTwo"
                              type="lineTwo"
                              value={values.lineTwo}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.lineTwo && Boolean(errors.lineTwo)}
                              helpertext={touched.lineTwo && errors.lineTwo}
                            />
                          </div>
                          <div
                            style={{
                              marginTop: "5px",
                              marginLeft: "10px",
                            }}
                            className="font-size-xs font-weight-light"
                          >
                            City
                          </div>
                          <div>
                            <TextField
                              fullWidth
                              className="m-2"
                              id="outlined-basic"
                              variant="outlined"
                              name="city"
                              type="city"
                              value={values.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.city && Boolean(errors.city)}
                              helpertext={touched.city && errors.city}
                            />
                          </div>
                          <div
                            style={{
                              marginTop: "5px",
                              marginLeft: "10px",
                            }}
                            className="font-size-xs font-weight-light"
                          >
                            Zip Code
                          </div>
                          <div>
                            <TextField
                              fullWidth
                              className="m-2"
                              id="outlined-basic"
                              variant="outlined"
                              name="zip"
                              type="zip"
                              value={values.zip}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.zip && Boolean(errors.zip)}
                              helpertext={touched.zip && errors.zip}
                            />
                          </div>

                          <FormControl
                            className="w-100"
                            error={touched.stateId && Boolean(errors.stateId)}
                          >
                            <div
                              style={{
                                marginTop: "5px",
                                marginLeft: "10px",
                              }}
                              className="font-size-xs font-weight-light"
                            >
                              State
                            </div>
                            <Select
                              fullWidth
                              id="stateId"
                              labelId="stateLabel"
                              value={values.stateId}
                              name="stateId"
                              type="number"
                              className="m-2"
                              variant="outlined"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.stateId && Boolean(errors.stateId)}
                              helpertext={touched.stateId && errors.stateId}
                            >
                              {this.state.lookUpTypes.states}
                            </Select>
                          </FormControl>

                          <div
                            style={{ marginTop: "50px" }}
                            className="font-size-lg font-weight-bold"
                          >
                            Upload an image for the Event below!
                            <Divider className="my-4" />
                            <FileUpload
                              updateUrl={(response) =>
                                this.updateUrl(response, setFieldValue)
                              }
                            ></FileUpload>
                          </div>
                          <Divider className="my-4" />
                          <div>
                            <div
                              style={{ marginTop: "10px", marginLeft: "10px" }}
                              className="font-size-xs font-weight-light"
                            >
                              Event Start Date
                            </div>
                            <TextField
                              fullWidth
                              className="m-2"
                              id="outlined-basic"
                              variant="outlined"
                              name="dateStart"
                              type="datetime-local"
                              value={values.dateStart}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.dateStart && Boolean(errors.dateStart)
                              }
                              helpertext={touched.dateStart && errors.dateStart}
                            />
                          </div>
                          <div>
                            <div
                              style={{ marginTop: "5px", marginLeft: "10px" }}
                              className="font-size-xs font-weight-light"
                            >
                              Event End Date
                            </div>
                            <TextField
                              fullWidth
                              className="m-2"
                              id="outlined-basic"
                              variant="outlined"
                              name="dateEnd"
                              type="datetime-local"
                              value={values.dateEnd}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.dateEnd && Boolean(errors.dateEnd)}
                              helpertext={touched.dateEnd && errors.dateEnd}
                            />
                          </div>

                          <Button
                            style={{ marginLeft: "10px" }}
                            color="primary"
                            variant="outlined"
                            size="large"
                            className="my-2"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Submit
                          </Button>
                          <Snackbar
                            open={this.state.display}
                            autoHideDuration={3000}
                            anchorOrigin={{
                              height: null,
                              vertical: "top",
                              horizontal: "left",
                            }}
                            onClose={this.handleClose}
                          >
                            <MuiAlert
                              severity="error"
                              onClose={this.handleClose}
                            >
                              Oops! Something went wrong
                            </MuiAlert>
                          </Snackbar>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Fragment>
    );
  }
}

AddEvent.propTypes = {
  updateUrl: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default AddEvent;
