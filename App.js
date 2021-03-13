import React from 'react';
import Navigation from './app/navigations/Navigation';
import AuthState from './app/context/auth/AuthState';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <AuthState>
      <Navigation/>
    </AuthState>

  );
}

