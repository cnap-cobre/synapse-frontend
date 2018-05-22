import React from 'react';

import {FaFolderO, FaFileO,
  FaFileWordO, FaFilePowerpointO, FaFileExcelO, FaFileImageO,
  FaFileMovieO, FaFileTextO, FaFileArchiveO, FaFilePdfO,
  FaFileCodeO, FaFileAudioO, FaCogs, FaTerminal} from 'react-icons/lib/fa';

import {IoSocialPython, IoSocialJavascript,
  IoSocialSass} from 'react-icons/lib/io';

import {GoRuby, GoGitBranch, GoDatabase} from 'react-icons/lib/go';

const fileExtensionMappings = [
  {
    type: "dir",
    name: /^\.git$/i,
    icon: (<span className="fa-layers fa-fw">
      <FaFolderO/>
      <GoGitBranch style={{
        position: 'relative',
        fontSize: '0.4em',
        left: '-1.7em',
        marginRight: '-1em'
      }} />
    </span>)
  },
  {
    type: "dir",
    name: /^\./i,
    icon: (<span className="fa-layers fa-fw">
      <FaFolderO/>
      <FaCogs style={{
        position: 'relative',
        fontSize: '0.4em',
        left: '-1.7em',
        marginRight: '-1em'
      }} />
    </span>)
  },
  {
    type: "dir",
    icon: <FaFolderO />
  },
  {
    name: /\.(docx?|odt|rtf)$/i,
    icon: <FaFileWordO/>
  },
  {
    name: /\.(pptx?|key|odp|pps)$/i,
    icon: <FaFilePowerpointO/>
  },
  {
    name: /\.(xlsx?|ods|xlr)$/i,
    icon: <FaFileExcelO/>
  },
  {
    name: /\.(zip|tar|gz|7z|rar|z)$/i,
    icon: <FaFileArchiveO/>
  },
  {
    name: /\.pdf$/i,
    icon: <FaFilePdfO/>
  },
  {
    name: /\.(jpe?g|gif|bmp|tiff?|png|svg|eps|ai|ico)$/i,
    icon: <FaFileImageO/>
  },
  {
    name: /^\.(bash|zsh|ksh|tsh|csh|profile)/i,
    icon: <FaTerminal/>
  },
  {
    name: /^\.git/i,
    icon: <GoGitBranch/>
  },
  {
    name: /^\./i,
    icon: <FaCogs/>
  },
  {
    name: /\.(mp4|mov|wmv|flv|avi|ogg|vob|m4v|mpeg|mp2|3g([p2]))$/i,
    icon: <FaFileMovieO/>
  },
  {
    name: /\.(wav|mp3|wma|m4a|acc|oga|flac|aiff|)$/i,
    icon: <FaFileAudioO/>
  },
  {
    name: /\.(asp|bash|c|class|cmd|cpp|cs|css|cxx|h|hdl|hpp|html|hxx|inc|java|jar|jsp|php|pl|pm|r|sh|swift|tex|vb|xml|zsh)$/i,
    icon: <FaFileCodeO/>
  },
  {
    name: /\.(sql|psql)$/i,
    icon: <GoDatabase/>
  },
  {
    name: /\.(sass|scss)$/i,
    icon: <IoSocialSass/>
  },
  {
    name: /\.(js|jsx|json)$/i,
    icon: <IoSocialJavascript/>
  },
  {
    name: /\.py$/i,
    icon: <IoSocialPython/>
  },
  {
    name: /\.rb$/i,
    icon: <GoRuby/>
  },
  {
    name: /\.(txt|csv|tsv|log|md|rst|out)$/i,
    icon: <FaFileTextO/>
  },
  {
    icon: <FaFileO/>
  }
];

function resolve(item) {
  for (let type of fileExtensionMappings) {
    if (type.hasOwnProperty('type') && type.type !== item.type) {
      continue;
    }
    if (type.hasOwnProperty('name') && !item.name.match(type.name)) {
      continue;
    }

    return type.icon;
  }
}

export function fileIconResolver(item) {
  const X = resolve(item);
  return React.cloneElement(X, {className: "fa-2x far"});
}

// Executable files under 8kb may in fact be symlinks to directories
// The Agave API does not clarify whether a raw file is a symlink,
// let alone whether it is a symlink pointing to a directory.