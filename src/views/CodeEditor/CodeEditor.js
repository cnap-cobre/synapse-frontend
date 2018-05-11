import React, { Component } from 'react';
import Editor from 'Components/Editor/Editor';

import './CodeEditor.css'

export default class CodeEditor extends Component {
  render() {
    return (
        <Editor
          fontSize={20}
          width="100%"
          height="80%"
          value={'from rest_framework import serializers\n' +
          '\n' +
          'from .models import Profile\n' +
          'from django.contrib.auth.models import User\n' +
          '\n' +
          '\n' +
          'class ProfileSerializer(serializers.HyperlinkedModelSerializer):\n' +
          '    class Meta:\n' +
          '        model = Profile\n' +
          '        fields = (\'user\', \'institution\', \'gravatar\')\n' +
          '\n' +
          '\n' +
          'class UserSerializer(serializers.HyperlinkedModelSerializer):\n' +
          '    class Meta:\n' +
          '        model = User\n' +
          '        fields = (\'url\', \'first_name\', \'last_name\',\n' +
          '                 \'username\', \'email\', \'date_joined\',\n' +
          '                 \'profile\')\n'}
        />
    );
  }
}
