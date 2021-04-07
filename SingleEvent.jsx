import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, List, ListItem, Card, Button, Fab } from "@material-ui/core";

import PropTypes from "prop-types";

const SingleEvent = (props) => {
  const getEventDetailsClick = () => {
    props.eventDetails(props.event);
  };

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div></div>
        <List className="pb-0">
          <ListItem className="py-4">
            <div className="d-flex flex-column flex-sm-row align-items-start">
              <div>
                <Card className="card-transparent mb-3 mb-sm-0">
                  <a href="#/" className="card-img-wrapper rounded">
                    <div className="img-wrapper-overlay">
                      <div className="overlay-btn-wrapper">
                        <Fab
                          size="small"
                          color="secondary"
                          className="mx-auto d-flex align-items-center"
                        >
                          <FontAwesomeIcon
                            icon={["fas", "plus-circle"]}
                            className="font-size-lg"
                          />
                        </Fab>
                      </div>
                    </div>
                    <img
                      alt="..."
                      className="card-img-top rounded"
                      src={props.event.imageUrl}
                      style={{ width: 160 }}
                    />
                  </a>
                </Card>
              </div>
              <div className="pl-0 pl-sm-4">
                <div className="mb-1">
                  <a className="font-size-lg" href="#/">
                    {props.event.name}
                  </a>
                </div>
                <div>
                  <div className="text-info badge badge-neutral-info">
                    {props.event.eventType.name}
                  </div>
                  <div className="text-danger ml-2 badge badge-neutral-danger">
                    {props.event.eventCategory.name}
                  </div>
                </div>
                <p className="mb-0 mt-2 text-black-50">{props.event.summary}</p>
                <small className="d-block text-uppercase mt-1">
                  {props.event.venue.name}, {props.event.venue.location.city}
                </small>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  type="button"
                  name="details"
                  onClick={getEventDetailsClick}
                >
                  Click For More Info!
                </Button>
              </div>
            </div>
          </ListItem>

          <ListItem className="bg-secondary d-block text-center p-3">
            <Tooltip arrow title="Facebook">
              <Button color="default" className="text-facebook">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={["fab", "facebook"]} />
                </span>
              </Button>
            </Tooltip>
            <Tooltip arrow title="Instagram">
              <Button color="default" className="text-instagram mr-2 ml-2">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={["fab", "instagram"]} />
                </span>
              </Button>
            </Tooltip>
            <Tooltip arrow title="Twitter">
              <Button color="default" className="text-twitter">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={["fab", "twitter"]} />
                </span>
              </Button>
            </Tooltip>
          </ListItem>
        </List>
      </Card>
    </Fragment>
  );
};

SingleEvent.propTypes = {
  eventDetails: PropTypes.func.isRequired,

  event: PropTypes.shape({
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
    venue: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      location: PropTypes.shape({
        city: PropTypes.string.isRequired,
      }),
    }),
  }),

  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default SingleEvent;
