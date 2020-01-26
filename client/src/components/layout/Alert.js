import React from "react";
import PropTypes from "prop-types";
// any time you want to use redux you need connect
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  // when the reducer updates state and we connect to it, we add the alerts to our props from the reducer's props
  // by adding our alerts to our props here, we enable them to be accessed above by Alert func through destructuring
  // there's also a mapDispatchToProps that does the same thing for dispatch (enabling us to do things like onClick)
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
