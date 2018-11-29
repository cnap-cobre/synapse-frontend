// @flow

import PropTypes from 'prop-types';
import React from 'react';
import AddDirectoryButton from './AddDirectoryButton/AddDirectoryButton';
import BrowserRefresh from './BrowserRefresh/BrowserRefresh';
import DotfilesCheckBox from './DotfilesCheckBox/DotfilesCheckBox';
import ListGridToggle from './ListGridToggle/ListGridToggle';
import UploadFile from './UploadFile/UploadFile';

type Props = {
  id: string,
  handleRefresh(): typeof undefined,
  showDotfiles: boolean,
  toggleDotfiles(): typeof undefined,
  path: string,
}

const FileBrowserControls = (props: Props) => {
  const { handleRefresh, id, showDotfiles, toggleDotfiles, path } = props;

  return (
      <div
          className="browserControls"
          style={{
            padding: '1px 15px',
            backgroundColor: '#e4e4e4',
            borderRadius: '4px',
            textAlign: 'left',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
      >

        <div style={{
          display: 'flex',
          backgroundColor: '#e4e4e4',
        }}
        >
          <BrowserRefresh handleRefresh={handleRefresh} />

          <DotfilesCheckBox
              id={id}
              showDotfiles={showDotfiles}
              toggleDotfiles={toggleDotfiles}
          />

          <ListGridToggle />
        </div>

        <div style={{
          display: 'flex',
        }}
        >
          <UploadFile path={path} />
          <AddDirectoryButton path={path} />
        </div>


      </div>
  );
}

export default FileBrowserControls;