import React from 'react';
import{
	View,
	Text,StyleSheet
} from 'react-native';

function HorizontalSeparator(props){
	return(
		<View style={[styles.separator,
		{
			borderTopColor: (props.color)?props.color:'#4C3F3F',
		}
			]}>
		</View>
		)

}
const styles=StyleSheet.create(
	{
	separator:{
		flex:1,
		marginHorizontal: 5,
		borderLeftWidth: 1,
	}
	}
)
export default HorizontalSeparator