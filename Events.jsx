import React from "react";
import * as eventService from "../../services/eventService";
import SingleEvent from "./SingleEvent";
import {
  TextField,
  Button,
  Grid,
  List,
  Divider,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import InfiniteScroll from "react-infinite-scroll-component";
import { BarLoader } from "react-spinners";
import PropTypes from "prop-types";

class Events extends React.Component {
  state = {
    mappedEvents: [],
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    searchQuery: "",
    hasMore: true,
    display: false,
  };

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    eventService
      .getEventDetails(this.state.pageIndex, this.state.pageSize)
      .then(this.onFetchSuccess)
      .catch(this.onFetchError);
  };

  onFetchSuccess = (resp) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        mappedEvents: [
          ...prevState.mappedEvents,
          resp.item.pagedItems.map(this.mapSingleEvent),
        ],
        pageIndex: this.state.pageIndex + 1,
      };
    });
  };

  onFetchError = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        hasMore: false,
      };
    });
  };

  onGetSearchSuccess = (response) => {
    let events = response.item.pagedItems;

    this.setState(() => {
      return {
        mappedEvents: events.map(this.mapSingleEvent),

        totalCount: response.item.totalCount,
        totalPages: response.item.totalPages,
      };
    });
  };

  redirectToDetails = (event) => {
    this.props.history.push(`/events/${event.id}/details`, {
      type: "EVENT_DATA",
      payload: event,
    });
  };

  mapSingleEvent = (event) => (
    <SingleEvent
      event={event}
      key={`Events-${event.id}`}
      eventDetails={this.redirectToDetails}
    />
  );

  onGetSearchError = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        display: true,
      };
    });
  };

  onSearch = (e) => {
    let currentTarget = e.currentTarget;
    let inputValue = currentTarget.value;

    this.setState(() => {
      return { searchQuery: inputValue, pageIndex: 0 };
    });
  };

  onSearchClick = (e) => {
    e.preventDefault();
    eventService
      .getSearch(
        this.state.pageIndex,
        this.state.pageSize,
        this.state.searchQuery
      )
      .then(this.onGetSearchSuccess)
      .catch(this.onGetSearchError);
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
      <React.Fragment>
        <div>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item>
              <TextField
                variant="outlined"
                className="m-2"
                name="search"
                id="search"
                value={this.state.searchQuery}
                onChange={this.onSearch}
                color="primary"
              ></TextField>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                name="search"
                type="submit"
                onClick={this.onSearchClick}
              >
                Search
              </Button>
            </Grid>
          </Grid>
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
            <MuiAlert severity="error" onClose={this.handleClose}>
              Oops! We couldn`t find what you were looking for
            </MuiAlert>
          </Snackbar>

          <div style={{ marginBottom: "25px" }}>
            <h1>Checkout Nearby Events</h1>
          </div>
          <Divider className="my-4" />
          <List>
            <InfiniteScroll
              dataLength={this.state.mappedEvents.length}
              next={this.fetchData}
              hasMore={this.state.hasMore}
              scrollThreshold={0.8}
              loader={
                <div className="d-flex align-items-center justify-content-center py-3">
                  <BarLoader color={"var(--primary)"} loading={true} />
                </div>
              }
              endMessage={
                <div className="mb-2">
                  <MuiAlert severity="success">
                    This is the end of the list!
                  </MuiAlert>
                </div>
              }
            >
              {this.state.mappedEvents}
            </InfiniteScroll>
          </List>
        </div>
      </React.Fragment>
    );
  }
}
Events.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default Events;
