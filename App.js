import React from 'react';
import Navigation from './app/navigations/Navigation';
import AuthState from './app/context/auth/AuthState';
export default function App() {
  return (
    <AuthState>
      <Navigation/>
    </AuthState>

  );
}

