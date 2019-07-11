import React,{Component} from 'react';
import {
	FlatList,Text,
} from 'react-native';
import Layout from '../components/sugestion_list_layout';
import Empty from '../components/empty';
import Separator from '../components/vertical_separator';
class SuggestionList extends Component{
	renderEmpty=()=><Empty text="No hay sugerencias :/"/>
itemSeparator=()=><Separator color='red' text="No hay sugerencias :/"/>
	render(){
		const list=[
			{title:'titulo1',key:'1'},
			{title:'titulo 2',key:'2'}
		]
		return(
			<Layout title='sugerencias para ti'>
			<FlatList data={list}
			//ListEmptyComponent={()=><Text>No hay elementos</Text>}
			ListEmptyComponent={this.renderEmpty}
			ItemSeparatorComponent={this.itemSeparator}

			renderItem={({item})=><Text>{item.title}</Text> }/>
			</Layout>
			)
	}
}

export default SuggestionList