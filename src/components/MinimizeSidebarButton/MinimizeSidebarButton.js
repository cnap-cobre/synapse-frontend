// @flow

import { connect } from 'react-redux';
import React from 'react';
import { toggleSidebar } from '../../store/ui/visualOptions/VisualOptions';
import { getSidebarMinimized } from '../../store/ui/reducer';

type Props = {
  toggleSidebar(): typeof undefined,
  sidebarMinimized: boolean,
}

const MinimizeSidebarButton = (props: Props) => {
  const { sidebarMinimized, toggleSidebar } = props;

  const buttonIconClass = sidebarMinimized ? 'ti-menu-alt' : 'ti-more-alt';

  return (
    <button
      id="minimizeSidebar"
      className="btn btn-fill btn-icon"
      onClick={toggleSidebar}
    >
      <i className={buttonIconClass} />
    </button>
  );
};

const mapStateToProps = store => ({
  sidebarMinimized: getSidebarMinimized(store),
});

const mapDispatchToProps = dispatch => ({
  toggleSidebar: () => { dispatch(toggleSidebar()); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MinimizeSidebarButton);
