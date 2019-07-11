import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import Home from './src/screens/containers/home';
import Header from './src/sections/components/header';
import Sugestion_list from './src/videos/components/sugestion_list';


type Props = {};
export default class App extends React.Component<Props> {
  render() {
    return (
      <Home>
      <Header>
        <Text>asdasdasdas</Text>
      </Header>
        <Text>Header</Text>
        <Text>Buscador</Text>
        <Text>Categorías</Text>
        <Sugestion_list/>
      </Home>
    );
  }
}
