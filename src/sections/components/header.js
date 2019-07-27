import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	SafeAreaView,
	Platform,
	StatusBar,
} from 'react-native'

function Header(props){
  return (
    <View>
      <SafeAreaView>
        <View style={styles.container}>
        	<Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
          />
          <View style={styles.right}>
            {props.children}
          </View>
        </View>
      </SafeAreaView>
    </View>
		)
}
const styles=StyleSheet.create({
	logo:{
		width: 80,
		height: 26,
		resizeMode: 'contain',
		//lo muestra con el espacio disponible
		//por defecto esta en content
	},
	container:{
		//en normal el padding va como reloj desde el 12
		//en produccion usas el padding individual
		paddingVertical: 10,
		paddingHorizontal: 10,
		flexDirection: 'row' ,
		backgroundColor: '#A75CBD',
		//esto previene que el notch sea encimado con la app
		marginTop:Platform.select({
			android:StatusBar.currentHeight
		}),

	},
	right:{
		//al aprecer indica las direcciones
		//este le dice que ocupe mas espacio
		flex: 20,//aqui esta en column
		flexDirection: 'row' ,//aqui lo convierte a fila
		justifyContent: 'flex-end' ,//esto lo justifica al final del elemento
		backgroundColor: '#4559BA',

			paddingHorizontal: 10,
	}
})
export default Header;