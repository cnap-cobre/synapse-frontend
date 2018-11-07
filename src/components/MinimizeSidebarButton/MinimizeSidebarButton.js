import {connect} from 'react-redux';
import React from 'react';
import {toggleSidebar} from "../../store/visualOptions/actions";

class MinimizeSidebarButton extends React.Component {
  render() {
    const buttonIconClass =
        this.props.sidebarMinimized ? 'ti-menu-alt' : 'ti-more-alt';

    return (
        <button id="minimizeSidebar"
                className="btn btn-fill btn-icon"
                onClick={this.props.toggleSidebar}
        >
          <i className={buttonIconClass} />
        </button>
    );
  }
}

const mapStateToProps = (store) => ({
  sidebarMinimized: store.visualOptions.sidebarMinimized
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidebar: () => {dispatch(toggleSidebar())}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MinimizeSidebarButton);