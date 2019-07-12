import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import Home from './src/screens/containers/home';
import Header from './src/sections/components/header';
import SuggestionList from './src/videos/components/sugestion_list';

import API from './utils/api';

type Props = {};
export default class App extends Component<Props> {
  state = {
    suggestion_List: []
  }
  async componentDidMount() {
    const movies = await API.getSuggestion(10);
   // console.log(movies);
    this.setState({
      suggestion_List: movies,
    })
  }
  render() {
    return (
      <Home>
        <Header />
        <Text>buscador</Text>
        <Text>categorías</Text>
        <SuggestionList
          list={this.state.suggestion_List}
        />
      </Home>
    );
  }
}
