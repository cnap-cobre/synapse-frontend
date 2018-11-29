// Individual imports like this save massively on the Webpack
// bundle size.  Importing the index.js from each of these
// would result in more than double the bundle size.  Yuge.
import FaCogs from 'react-icons/lib/fa/cogs';
import FaFileArchiveO from 'react-icons/lib/fa/file-archive-o';
import FaFileAudioO from 'react-icons/lib/fa/file-audio-o';
import FaFileCodeO from 'react-icons/lib/fa/file-code-o';
import FaFileExcelO from 'react-icons/lib/fa/file-excel-o';
import FaFileImageO from 'react-icons/lib/fa/file-image-o';
import FaFileMovieO from 'react-icons/lib/fa/file-movie-o';
import FaFileO from 'react-icons/lib/fa/file-o';
import FaFilePdfO from 'react-icons/lib/fa/file-pdf-o';
import FaFilePowerpointO from 'react-icons/lib/fa/file-powerpoint-o';
import FaFileTextO from 'react-icons/lib/fa/file-text-o';
import FaFileWordO from 'react-icons/lib/fa/file-word-o';
import FaFolderO from 'react-icons/lib/fa/folder-o';
import FaTerminal from 'react-icons/lib/fa/terminal';

import GoDatabase from 'react-icons/lib/go/database';
import GoGitBranch from 'react-icons/lib/go/git-branch';
import GoRuby from 'react-icons/lib/go/ruby';

import IoSocialJavascript from 'react-icons/lib/io/social-javascript';
import IoSocialPython from 'react-icons/lib/io/social-python';
import IoSocialSass from 'react-icons/lib/io/social-sass';

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
        <FaFolderO />
        <GoGitBranch style={insetIconStyle} />
      </span>
    ),
  },
  {
    type: 'dir',
    name: /^\./i,
    icon: (
      <span className="fa-layers fa-fw">
        <FaFolderO />
        <FaCogs style={insetIconStyle} />
      </span>
    ),
  },
  {
    type: 'dir',
    icon: <FaFolderO />,
  },
  {
    name: /\.(docx?|odt|rtf)$/i,
    icon: <FaFileWordO />,
  },
  {
    name: /\.(pptx?|key|odp|pps)$/i,
    icon: <FaFilePowerpointO />,
  },
  {
    name: /\.(xlsx?|ods|xlr)$/i,
    icon: <FaFileExcelO />,
  },
  {
    name: /\.(zip|tar|gz|7z|rar|z|bz2)$/i,
    icon: <FaFileArchiveO />,
  },
  {
    name: /\.pdf$/i,
    icon: <FaFilePdfO />,
  },
  {
    name: /\.(jpe?g|gif|bmp|tiff?|png|svg|eps|ai|ico)$/i,
    icon: <FaFileImageO />,
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
    icon: <FaFileMovieO />,
  },
  {
    name: /\.(wav|mp3|wma|m4a|acc|oga|flac|aiff|)$/i,
    icon: <FaFileAudioO />,
  },
  {
    name: /\.(asp|bash|c|class|cmd|cpp|cs|css|cxx|h|hdl|hpp|html|hxx|inc|java|jar|jsp|php|pl|pm|r|sh|swift|tex|vb|xml)$/i,
    icon: <FaFileCodeO />,
  },
  {
    name: /\.(sql|psql)$/i,
    icon: <GoDatabase />,
  },
  {
    name: /\.(sass|scss)$/i,
    icon: <IoSocialSass />,
  },
  {
    name: /\.(js|jsx|json)$/i,
    icon: <IoSocialJavascript />,
  },
  {
    name: /\.py$/i,
    icon: <IoSocialPython />,
  },
  {
    name: /\.rb$/i,
    icon: <GoRuby />,
  },
  {
    name: /\.(txt|csv|tsv|log|md|rst|out)$/i,
    icon: <FaFileTextO />,
  },
  {
    icon: <FaFileO />,
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
