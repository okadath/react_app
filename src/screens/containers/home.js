import React, {Component} from 'react';

class Home extends Component{
	render(){
		// esto regresa los hijos del componente
		return this.props.children
	}
}

export default Home;

