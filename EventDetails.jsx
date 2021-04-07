import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Grid, Container, Card } from "@material-ui/core";
import { formatDateTime } from "../../services/dateService";

const EventDetails = (props) => {
  let eventDetails = props.location.state.payload;
  let dateStart = eventDetails.dateStart;

  return (
    <Fragment>
      <div padding={100}>
        <div className="feature-box bg-slick-carbon py-3 py-xl-5">
          <Container className="py-3 py-xl-5">
            <Grid container spacing={4}>
              <Grid item xs={12} lg={6} className="d-flex align-items-center">
                <Card className="card-box flex-fill mb-4 mb-xl-0 ">
                  <a className="card-img-wrapper rounded">
                    <img
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                      src={eventDetails.imageUrl}
                    ></img>
                  </a>
                </Card>
              </Grid>
              <Grid item xs={12} lg={6}>
                <div className="py-0 py-xl-5">
                  <div className="pl-0 pl-xl-5 text-white">
                    <h1 className="display-3 mb-3 font-weight-bold" name="name">
                      {eventDetails.name}
                    </h1>
                    <div className="font-size-xl text-white-50" name="summary">
                      {eventDetails.summary}
                    </div>
                    <div
                      className="font-size-m text-white-50"
                      name="shortDescription"
                      style={{ marginTop: "20px" }}
                    >
                      {eventDetails.shortDescription}
                    </div>
                    <div className="d-block mt-4">
                      <div className="feature-box pr-4">
                        <h3 className="font-size-lg font-weight-bold my-3">
                          <a href="#/" className="text-white"></a>
                          Event Date
                        </h3>
                        <div className="text-white-50 mb-3">
                          {formatDateTime(dateStart)}
                        </div>
                      </div>
                      <div>
                        <div className="feature-box pr-4">
                          <h3 className="font-size-lg font-weight-bold my-3">
                            <a href="#/" className="text-white">
                              {eventDetails.venue.name}
                            </a>
                          </h3>
                          <div className="text-white-50 mb-3">
                            {eventDetails.venue.description}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="feature-box pr-4">
                          <h3 className="font-size-lg font-weight-bold my-3">
                            <a href="#/" className="text-white"></a>
                            Address
                          </h3>
                          <div className="text-white-50 mb-3">
                            {eventDetails.venue.location.lineOne},
                            <div>
                              {eventDetails.venue.location.city},
                              {eventDetails.venue.location.state.name}
                            </div>
                            <div> {eventDetails.venue.location.zip}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </Fragment>
  );
};

EventDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      payload: PropTypes.shape({
        id: PropTypes.number.isRequired,
        eventType: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
        eventCategory: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
        name: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        dateStart: PropTypes.string.isRequired,
        dateEnd: PropTypes.string.isRequired,
        venue: PropTypes.shape({
          name: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          location: PropTypes.shape({
            lineOne: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            state: PropTypes.shape({
              name: PropTypes.string.isRequired,
            }),
            zip: PropTypes.string,
          }),
        }),
      }),
      type: PropTypes.string.isRequired,
    }),
    pathname: PropTypes.string,
  }),

  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default EventDetails;
