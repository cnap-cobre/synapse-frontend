import React from 'react';

import {FaFolderO, FaFileO,
  FaFileWordO, FaFilePowerpointO, FaFileExcelO, FaFileImageO,
  FaFileMovieO, FaFileTextO, FaFileArchiveO, FaFilePdfO,
  FaFileCodeO, FaFileAudioO, FaCogs, FaTerminal} from 'react-icons/lib/fa';

import {IoSocialPython, IoSocialJavascript,
  IoSocialSass} from 'react-icons/lib/io';

import {GoRuby, GoGitBranch, GoDatabase} from 'react-icons/lib/go';

function resolve(item) {
  if (item.type === "dir" && item.name.match(/^\.git$/i)) {
    return (<span className="fa-layers fa-fw">
      <FaFolderO/>
      <GoGitBranch style={{
        position: 'relative',
        fontSize: '0.4em',
        left: '-1.7em',
        marginRight: '-1em'
      }} />
    </span>);
  }
  if (item.type === "dir" && item.name.match(/^\./i)){
    return (<span className="fa-layers fa-fw">
      <FaFolderO/>
      <FaCogs style={{
        position: 'relative',
        fontSize: '0.4em',
        left: '-1.7em',
        marginRight: '-1em'
      }} />
    </span>);
  }
  if (item.type === "dir"){
    return (<FaFolderO />);
  }
  if (item.name.match(/\.(docx?|odt|rtf)$/i)) {
    return (<FaFileWordO/>);
  }
  if (item.name.match(/\.(pptx?|key|odp|pps)$/i)) {
    return (<FaFilePowerpointO/>);
  }
  if (item.name.match(/\.(xlsx?|ods|xlr)$/i)) {
    return (<FaFileExcelO/>);
  }
  if (item.name.match(/\.(zip|tar|gz|7z|rar|z|)$/i)) {
    return (<FaFileArchiveO/>);
  }
  if (item.name.match(/\.pdf?$/i)) {
    return (<FaFilePdfO/>);
  }
  if (item.name.match(/\.(jpe?g|gif|bmp|tiff?|png|svg|eps|ai|ico)$/i)) {
    return (<FaFileImageO/>);
  }
  if (item.name.match(/^\.(bash|zsh|ksh|tsh|csh|profile)/i)) {
    return (<FaTerminal/>);
  }
  if (item.name.match(/^\.git/i)) {
    return (<GoGitBranch/>);
  }
  if (item.name.match(/^\./i)) {
    return (<FaCogs/>);
  }
  if (item.name.match(/\.(mp4|mov|wmv|flv|avi|ogg|vob|m4v|mpeg|mp2|3g([p2]))$/i)) {
    return (<FaFileMovieO/>);
  }
  if (item.name.match(/\.(wav|mp3|wma|m4a|acc|oga|flac|aiff|)$/i)) {
    return (<FaFileAudioO/>);
  }
  if (item.name.match(/\.(asp|bash|c|class|cmd|cpp|cs|css|cxx|h|hdl|hpp|html|hxx|inc|java|jar|jsp|php|pl|pm|r|sh|swift|tex|vb|xml|zsh)$/i)) {
    return (<FaFileCodeO/>);
  }
  if (item.name.match(/\.(sql)$/i)) {
    return (<GoDatabase/>);
  }
  if (item.name.match(/\.(sass|scss)$/i)) {
    return (<IoSocialSass/>);
  }
  if (item.name.match(/\.(js|jsx|json)$/i)) {
    return (<IoSocialJavascript/>);
  }
  if (item.name.match(/\.py$/i)) {
    return (<IoSocialPython/>);
  }
  if (item.name.match(/\.rb$/i)) {
    return (<GoRuby/>);
  }
  if (item.name.match(/\.(txt|csv|tsv|log|md|rst|out)$/i)) {
    return (<FaFileTextO/>);
  }
  else {
    return (<FaFileO />);
  }
}

export function fileIconResolver(item) {
  const X = resolve(item);
  return React.cloneElement(X, {className: "fa-2x far"});
}

// Executable files under 8kb may in fact be symlinks to directories
// The Agave API does not clarify whether a raw file is a symlink,
// let alone whether it is a symlink pointing to a directory.