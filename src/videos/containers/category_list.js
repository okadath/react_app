import React, { Component } from 'react';
import {
  View,
  FlatList
} from 'react-native';
import Layout from '../components/category_list_layout';
import Empty from '../components/empty';
import Separator from '../../sections/components/horizontal_separator';
import Category from '../components/category';

class CategoryList extends Component {
  keyExtractor = item => item.id.toString()
  renderEmpty = () => <Empty text="No hay sugerencias :(" />
  itemSeparator = () => <Separator  color='blue'/>
  renderItem = ({item}) => {
    return (
      <Category {...item}/>
    )
  }
  render() {
    return (
    	<Layout title="Categorias"
    	>
      <FlatList
        horizontal
        keyExtractor={this.keyExtractor}
        data={this.props.list}
        ListEmptyComponent={this.renderEmtpy}
        ItemSeparatorComponent={this.itemSeparator}
        renderItem={this.renderItem}
      />
      </Layout>
    )
  }
}

export default CategoryList;