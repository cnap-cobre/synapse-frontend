import Dashboard from 'Views/Dashboard';
import Files from 'Views/Files';
import Shell from 'Views/Shell';
import CodeEditor from 'Views/CodeEditor';

export const routes = [
  { path: '/', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/files', exact: true, name: 'Files', component: Files },
  { path: '/shell', exact: true, name: 'Shell', component: Shell },
  { path: '/editor', exact: true, name: 'Code Editor', component: CodeEditor },
];