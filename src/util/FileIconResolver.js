// Individual imports like this save massively on the Webpack
// bundle size.  Importing the index.js from each of these
// would result in more than double the bundle size.  Yuge.
import {
  FaCogs ,
  FaRegFileArchive ,
  FaRegFileAudio ,
  FaRegFileCode ,
  FaRegFileExcel ,
  FaRegFileImage ,
  FaRegFileVideo ,
  FaRegFile ,
  FaRegFilePdf ,
  FaRegFilePowerpoint ,
  FaRegFileAlt ,
  FaRegFileWord ,
  FaRegFolder ,
  FaTerminal ,
} from 'react-icons/fa';

import {
  GoDatabase,
  GoGitBranch,
  GoRuby,
} from 'react-icons/go'

import {
  IoLogoJavascript,
  IoLogoPython,
  IoLogoSass,
} from 'react-icons/io'

import React from 'react';


const insetIconStyle = {
  position: 'relative',
  fontSize: '0.4em',
  left: '-1.7em',
  marginRight: '-1em',
};

const fileExtensionMappings = [
  {
    type: 'dir',
    name: /^\.git$/i,
    icon: (
      <span className="fa-layers fa-fw">
        <FaRegFolder />
        <GoGitBranch style={insetIconStyle} />
      </span>
    ),
  },
  {
    type: 'dir',
    name: /^\./i,
    icon: (
      <span className="fa-layers fa-fw">
        <FaRegFolder />
        <FaCogs style={insetIconStyle} />
      </span>
    ),
  },
  {
    type: 'dir',
    icon: <FaRegFolder />,
  },
  {
    name: /\.(docx?|odt|rtf)$/i,
    icon: <FaRegFileWord />,
  },
  {
    name: /\.(pptx?|key|odp|pps)$/i,
    icon: <FaRegFilePowerpoint />,
  },
  {
    name: /\.(xlsx?|ods|xlr)$/i,
    icon: <FaRegFileExcel />,
  },
  {
    name: /\.(zip|tar|gz|7z|rar|z|bz2)$/i,
    icon: <FaRegFileArchive />,
  },
  {
    name: /\.pdf$/i,
    icon: <FaRegFilePdf />,
  },
  {
    name: /\.(jpe?g|gif|bmp|tiff?|png|svg|eps|ai|ico)$/i,
    icon: <FaRegFileImage />,
  },
  {
    name: /^\.(bash|zsh|ksh|tsh|csh|profile)/i,
    icon: <FaTerminal />,
  },
  {
    name: /^\.git/i,
    icon: <GoGitBranch />,
  },
  {
    name: /^\./i,
    icon: <FaCogs />,
  },
  {
    name: /\.(mp4|mov|wmv|flv|avi|ogg|vob|m4v|mpeg|mp2|3g([p2]))$/i,
    icon: <FaRegFileVideo />,
  },
  {
    name: /\.(wav|mp3|wma|m4a|acc|oga|flac|aiff|)$/i,
    icon: <FaRegFileAudio />,
  },
  {
    name: /\.(asp|bash|c|class|cmd|cpp|cs|css|cxx|h|hdl|hpp|html|hxx|inc|java|jar|jsp|php|pl|pm|r|sh|swift|tex|vb|xml)$/i,
    icon: <FaRegFileCode />,
  },
  {
    name: /\.(sql|psql)$/i,
    icon: <GoDatabase />,
  },
  {
    name: /\.(sass|scss)$/i,
    icon: <IoLogoSass />,
  },
  {
    name: /\.(js|jsx|json)$/i,
    icon: <IoLogoJavascript />,
  },
  {
    name: /\.(py|ipynb)$/i,
    icon: <IoLogoPython />,
  },
  {
    name: /\.rb$/i,
    icon: <GoRuby />,
  },
  {
    name: /\.(txt|csv|tsv|log|md|rst|out)$/i,
    icon: <FaRegFileAlt />,
  },
  {
    icon: <FaRegFile />,
  },
];

function resolve(item) {
  for (const type of fileExtensionMappings) {
    if (Object.prototype.hasOwnProperty.call(type, 'type') && type.type !== item.type) {
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(type, 'name') && !item.name.match(type.name)) {
      continue;
    }

    return type.icon;
  }

  return fileExtensionMappings.slice(-1)[0].icon;
}

export function fileIconResolver(item) {
  const X = resolve(item);
  return React.cloneElement(X, { className: 'fa-2x far' });
}
