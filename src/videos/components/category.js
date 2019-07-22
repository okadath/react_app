import React from 'react';
import {
	View,Text,ImageBackground,StyleSheet
} from 'react-native';

function Category(props){
	return (
		<ImageBackground style={styles.wrapper}
		 source={{uri:props.background_image}} >
		<View>
		<Text style={styles.genre}>{props.genres[0]}</Text>
		</View>
		</ImageBackground>
		)
}
const styles=StyleSheet.create({
wrapper:{
width: 250,
height: 100,
borderRadius: 10,
//para que se vean bien los bordes
overflow: 'hidden',
alignItems: 'center',
justifyContent:  'center',
alignItems:'center'

},
genre:{
	color: 'white',
	fontSize: 40,
	fontWeight: 'bold' ,
	//
	textShadowColor:'rgba(0,0,0,0.75)',
	//mover la sombra
	textShadowOffset: {
		width: 2,
		height: 2
	},
	textShadowRadius:10 ,
},
})

export default Category;