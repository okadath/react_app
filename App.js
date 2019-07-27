import React, { Component } from 'react';
import {
  Text,View,
} from 'react-native';

import Home from './src/screens/containers/home';
import Header from './src/sections/components/header';
import SuggestionList from './src/videos/containers/sugestion_list';
import CategoryList from './src/videos/containers/category_list';

import API from './utils/api';
import Player from './src/player/containers/player'

type Props = {};
export default class App extends Component<Props> {
  state = {
    suggestion_List: [],
    category_List: [],
  }
  async componentDidMount() {
    const movies = await API.getSuggestion(5);
    const categories = await API.getMovies();
   // console.log(movies);
    this.setState({
      suggestion_List: movies,
      category_List:categories,
    })
  }
  render() {
    return (
      <Home>
        <Header />
      <Player />
        <Text>buscador</Text>
        <Text>Categorías</Text>
        <CategoryList
          list={this.state.category_List}
        />
        <SuggestionList
          list={this.state.suggestion_List}
        />
        
      </Home>
    );
  }
}
