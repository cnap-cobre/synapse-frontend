// @flow

import type { NavigationType } from './types/navigationTypes';

const nav: Array<NavigationType> = [
  // {
  //   name: 'Dashboard',
  //   url: '/',
  //   icon: 'ti-dashboard',
  //   exact: true
  // },
  // {
  //   name: 'Files',
  //   url: '/files',
  //   icon: 'ti-folder',
  //   exact: false,
  //   children: [
  {
    name: 'Files',
    icon: 'ti-folder',
    // mini: 'B',
    url: '/files/browse',
    exact: false,
  },
  {
    name: 'File Systems',
    icon: 'ti-server',
    // mini: 'FS',
    url: '/files/systems',
    exact: true,
  },
  {
    name: 'Metadata Schemas',
    icon: 'ti-panel',
    // mini: 'FS',
    url: '/files/schemas',
    exact: true,
  },
  {
    name: 'Terminal',
    url: '/terminal',
    icon: 'ti-layout-cta-left',
    exact: true
  },
  //   ]
  // },
  // {
  //   name: 'Code Editor',
  //   url: '/editor',
  //   icon: 'ti-paragraph',
  //   exact: true,
  //   beta: true
  // },
  // {
  //   name: 'Compute Jobs',
  //   url: '/compute',
  //   icon: 'ti-cloud',
  //   exact: true
  // },
  // {
  //   name: 'Desktop',
  //   url: '/desktop',
  //   icon: 'ti-layout-tab-window',
  //   exact: false,
  //   children: [
  //     {
  //       name: 'Jupyter Notebooks',
  //       mini: 'J',
  //       url: '/desktop/jupyter',
  //       exact: true
  //     },
  //     {
  //       name: 'Matlab',
  //       mini: 'M',
  //       url: '/desktop/matlab',
  //       exact: true
  //     },
  //     {
  //       name: 'Octave',
  //       mini: 'O',
  //       url: '/desktop/octave',
  //       exact: true
  //     },
  //     {
  //       name: 'XNAT',
  //       mini: 'X',
  //       url: '/desktop/xnat',
  //       exact: true
  //     }
  //   ]
  // }
];

export default nav;
