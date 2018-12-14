import React from 'react';

const DefaultFooter = () => (
  <footer className="footer">
    <div className="container-fluid">
      <nav className="pull-left">
        <ul>
          <li>
            <a href="https://support.beocat.ksu.edu/">
                    Beocat Support
            </a>
          </li>
          <li>
            <a href="https://ksu.edu/">
                    Kansas State University
            </a>
          </li>
          <li>
            <a href="https://www.k-state.edu/cnap/">
                    CNAP
            </a>
          </li>
        </ul>
      </nav>
      <div className="copyright pull-right">
              &copy;
        {new Date().getFullYear()}
        {' '}
CNAP Center of Biomedical Research
      </div>
    </div>
  </footer>
);

export default DefaultFooter;
