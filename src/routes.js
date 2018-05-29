import Dashboard from 'Views/Dashboard/Dashboard';
import Account from 'Views/Account/Account';
import Logout from 'Views/Account/Logout/Logout';
import Files from 'Views/Files/Files';
import Shell from 'Views/Shell/Shell';
import CodeEditor from 'Views/CodeEditor/CodeEditor';
import ComputeJobs from "Views/ComputeJobs/ComputeJobs";

const routes = [
  { path: '/', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/account/', exact: true, name: 'Account', component: Account },
  { path: '/account/logout/', exact: true, name: 'Logout', component: Logout },
  { path: '/files/', exact: false, name: 'Files', component: Files },
  { path: '/shell/', exact: true, name: 'Shell', component: Shell },
  { path: '/editor/', exact: true, name: 'Code Editor', component: CodeEditor },
  { path: '/compute/', exact: true, name: 'Code Editor', component: ComputeJobs },
];

export default routes;