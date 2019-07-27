correr server local para pasar archivos:

 python3 -m http.server 8000 --bind 10.0.0.5

```
 yarn expo init platziVideoApp
 cd platziVideoApp
 yarn start
 yarn expo start
```
usar el linter de Babel.js en SublimeText
instalar el adb desde apt
instalar desde yarn expo por que usando el create-expoproject del libro usa una version antigua que el cliente de android no reconoce
usar lo siguiente para el path de android
https://medium.com/@khairold/setting-up-react-native-on-linux-without-android-studio-a65f3e011bbb

## Componentes

#### Imagenes
el background se ahce con un componente, no con una imagen y CSS
absoluta `<image source={{uri}}/>`
relativa `<image source={require('path')}/>`
```jsx
<Image 
	source={require('./assets/logo.png')} 
	style={{width:300, height:80}}
/>

```
#### Platform
Nos permite elegir codigo segun la plataforma:
```jsx
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +'asdasd',
  android: 'shitty instructions',
});

export default class App extends React.Component<Props>
```

#### Styles
usa Flex(?) alreves por su orden
parecido a displayblock(?)

```jsx
cosnt instructions='asd'
...
<Text style={styles.instructions}>
  {instructions}
</Text>
...    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Platform.select({
      ios: 'blue',
      android: '#ff1',
    }),
  },
  welcome: {
    fontSize: 20,
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#3333FF',
    marginBottom: 5,
  },
});
```
### Containers

poseen componentes y ciclos de vida,los componentes(dumb components)solo tienen UI

## Proyecto

creamos esta estructura de carpetas dentro del proyecto
```
tree  -L 3 -I node_modules --noreport

├── App.js
├── app.json
├── assets
│   └── *.png
├── babel.config.js
├── index.js
├── package.json
├── README.md
├── src
│   ├── player
│   │   ├── components
│   │   └── containers
│   ├── screens
│   │   ├── components
│   │   └── containers
│   ├── sections
│   │   ├── components
│   │   └── containers
│   └── videos
│       ├── components
│       └── containers
└── yarn.lock

```

en `src/screens/containers` creamos un `home.js`:
```jsx
import React, {Component} from 'react';

class Home extends Component{
	render(){
		// esto regresa los hijos del componente
		return this.props.children
	}
}

export default Home;
```
con esto solo creamos React(no usamos anda del native) ni hemos creado UI

En el `App.js`:
```jsx
import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import Home from './src/screens/containers/home';
import Header from './src/sections/components/header';
type Props = {};
export default class App extends React.Component<Props> {
  render() {
    return (
      <Home>
      <Header>
        <Text>asdasdasdas</Text>
      </Header>
        <Text>header</Text>
        <Text>buscador</Text>
        <Text>categorías</Text>
        <Text>sugerencias</Text>
      </Home>
    );
  }
}
```
creamos un componente sencillo para herencia como ejemplo en `src/screens/containers/home.js`
```jsx
import React, {Component} from 'react';

class Home extends Component{
	render(){
		// esto regresa los hijos del componente
		return this.props.children
	}
}

export default Home;

```
### Header
creamos un componente en `src/sections/components/header.js`
```jsx
import React from 'react';
import {View,Text,Image,StyleSheet,SafeAreaView,} from 'react-native'

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
            //esto le permite heredar al componente si hay algun comp. interno
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
		backgroundColor: '#539FDB',
	},
	right:{
		//al aprecer indica las direcciones
		//este le dice que ocupe mas espacio
		flex: 1,//aqui esta en column
		flexDirection: 'row' ,//aqui lo convierte a fila
		justifyContent: 'flex-end' ,//esto lo justifica al final del elemento
		backgroundColor: '#BBC7FF',
	}
})
export default Header;
```

### listas

creamos un nuevo componente:`src/sections/components/sugestion_list.js`, aqui haremos la mayoria de las operaciones de despliegue de info,se va modificando mientras se agregan los componentes pero aqui solo anotare los cambios al agregar los componentes a considerar

```jsx
import React,{Component} from 'react';
import {
  FlatList,Text,
} from 'react-native';

class SuggestionList extends Component{
  render(){
    const list=[
      {title:'uno',key:'1'},
      {title:'dos',key:'2'}
    ]
    return(
      <FlatList data={list}
      //lee los elementos de item y despliega su info
      renderItem={({item})=><Text>{item.title}</Text> }/>
      )
  }
}

export default SuggestionList
```
e importamos ambos en el `app.js`:

``` jsx
import ...

import Home from './src/screens/containers/home';
import Header from './src/sections/components/header';
import Sugestion_list from './src/screens/containers/sugestion_list';
...
    return (
      <Home>
      <Header>
        <Text>asdasdasdas</Text>
      </Header>
       ...
        <Sugestion_list/>
...
```

ahora que ya los importamos creamos el componente `src/sections/components/sugestion_list_layout.js`

```jsx
import React from 'react';
import {
  View,Text,StyleSheet
} from 'react-native';

function SuggestionListLayout(props){
  return(
    //aqui hereda las propiedades a sus hijos y sus css
    <View style={styles.container}>
    <Text  style={styles.title}> {props.title}</Text>
    {props.children}
    </View>

    )
}
const styles=StyleSheet.create({
  container:{
    paddingVertical:10,
    flex:1,
  },
  title:{
    color:'#4c4c4c',
    fontSize:20,
    marginBottom:10,
    fontWeight:'bold',
    marginLeft:8,
  }
})
//aqui lo exportamos
export default SuggestionListLayout
``` 

creamos el componente `src/sections/components/empty.js`

```
 import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

function Empty(props){
  return(
    <View style={styles.container}>
    <Text style={styles.text}>{props.text}</Text>
    </View>
    )
}
const styles=StyleSheet.create({
container:{
  padding: 10,
},
text: {
fontSize: 20,
}
})

export default Empty
```


creamos el componente `src/sections/components/vertical_separator.js`

```
import React from 'react';
import{
  View,
  Text,StyleSheet
} from 'react-native';

function VerticalSeparator(props){
  return(
    <View style={[styles.separator,
    {//crea opciones de colores
      borderTopColor: (props.color)?props.color:'#eaeaea',
    }
      ]}>
    <Text>esto es un separador</Text>
    </View>
    )

}
const styles=StyleSheet.create(
  {
  separator:{
    //linea de separador
    borderTopWidth: 1,
  }
  }
)
export default VerticalSeparator
```
y creamos el cuerpo del componente principal en `suggestions.js`
```jsx
import React from 'react';
import 
{
  View,Image,Text,StyleSheet
}from 'react-native';

function Suggestion(props){
  return (
    <View style={styles.container}>
    <View style={styles.left}>
    <Image style={styles.cover}
    source={require('../../../assets/logo.png')}
    />
    <View style={styles.genre} >
    <Text style={styles.genreText} > accion</Text>
    </View>
    </View>
    <View style={styles.right}>
    <Text style={styles.rigth}>Avengers</Text>
    <Text style={styles.year}>2001</Text>
    <Text style={styles.rating}>5 estrellas</Text>
    </View>
    </View>

    )
}
const styles=StyleSheet.create({
  container:{
    //    aqui debemos de reescribir el  flexbox :
    flexDirection: 'row' ,

  },
  cover:{
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  right:{
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  title:{
    fontSize: 18,
    color:'#44546b'
  },
  year:{
    backgroundColor: '#75E07F',
    paddingVertical: 4,
    paddingHorizontal: 6,
    color:'white',
    fontSize:11,
    borderRadius: 5,
    overflow: 'hidden',
    alignSelf: 'flex-start' ,
  },
rating:{
  color:"#6b6b6b",
  fontSize:14,
  fontWeight: 'bold' ,
},
genre:{
position: 'absolute' ,
left: 0,
top: 0,
backgroundColor: 'black',
paddingVertical: 7,
},
genreText:{
color:"white",
fontSize: 11,
}
})
export default Suggestion
```
### API

usaremos la api de https://yts.lt/api

creamos una carpeta con un archivo: `utils/api.js`:
```js
const BASE_API = 'https://yts.am/api/v2/';

class API {
  async getSuggestion(id) {
    const query = await fetch(`${BASE_API}movie_suggestions.json?movie_id=${id}`);
    const { data } = await query.json();
    return data.movies
  }
}
//asi creamos y exportamos e instanciamos una clase
export default new API();

```
y la llamamos desde el app.js:
```jsx
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
    console.log(movies);
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
```
y para que no haya rerender editamos el `sugestion_list.js`:

```jsx
class SuggestionList extends Component{
...
  //solo ayuda a no rerenderizar
  keyExtractor=(item)=>item.id.toString()
  render(){
    //const list=[
      //{title:'titulo1',key:'1'},
      //{title:'titulo 2',key:'2'}
    //]
    return(
      <Layout title='Sugerencias para ti'>
      <FlatList 
      keyExtractor={this.keyExtractor}
      data={this.props.list}
      //ListEmptyComponent={()=><Text>No hay elementos</Text>}
      ListEmptyComponent={this.renderEmpty}
      ItemSeparatorComponent={this.itemSeparator}
      //renderItem={({item})=><Text>{item.title}</Text> }/>
      renderItem={this.renderItem} />
...
```
para desplegarlo editamos el `suggeston.js`:
```jsx
function Suggestion(props){
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image style={styles.cover}
        source={{uri:props.medium_cover_image}} />
        <View style={styles.genre} >
          <Text style={styles.genreText} >{props.genres[0]}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.rigth}>{props.title}</Text>
        <Text style={styles.year}>{props.year}</Text>
        <Text style={styles.rating}>{props.rating}</Text>
      </View>
    </View>

    )
}
```

### Lista de Categorias

creamos un layout `src/videos/components/category_list_layout.js`:
```jsx
import React from 'react';
import {
  View,Text,StyleSheet,ImageBackground,
} from 'react-native';

function CategoryListLayout(props){
  return(
    <ImageBackground source={require('../../../assets/background.png')}
    style={styles.container}>
      <Text  style={styles.title}> {props.title}</Text>
      {props.children}
    </ImageBackground>
    )
}
const styles=StyleSheet.create({
  container:{
    paddingVertical:30,
    paddingHorizontal: 10,
    flex:1,
    backgroundColor: '#F4F9F1',
  },
  title:{
    color:'#4c4c4c',
    fontSize:20,
    marginBottom:10,
    fontWeight:'bold',
  }
})

export default CategoryListLayout
```
y creamos su separador en `sections/sections/components/horizontal_separator.js`:
```jsx
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
```
creamos un container para las categorias en `src/videos/containers/category_list.js`
```jsx
import React, { Component } from 'react';
import {
  View,
  FlatList
} from 'react-native';
import Layout from '../components/category_list_layout';
import Empty from '../components/empty';
import Separator from '../../sections/components/horizontal_separator';
import Suggestion from '../components/suggestion';

class CategoryList extends Component {
  keyExtractor = item => item.id.toString()
  renderEmpty = () => <Empty text="No hay sugerencias :(" />
  itemSeparator = () => <Separator  color='blue'/>
  renderItem = ({item}) => {
    return (
      <Suggestion {...item}/>
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
```

y este componente lo llamaremos desde el `app.js`:
```jsx
...
import CategoryList from './src/videos/containers/category_list';
...
export default class App extends Component<Props> {
  state = {
    suggestion_List: [],
    category_List: [],
  }
  async componentDidMount() {
    const movies = await API.getSuggestion(5);
    const categories = await API.getMovies();
    this.setState({
      suggestion_List: movies,
      category_List:categories,
    })
  }
  render() {
...
        <CategoryList
          list={this.state.category_List}
        />
        <SuggestionList
          list={this.state.suggestion_List}
        />
...
```


falta aun agregarle un componente con categorias, el cual crearemos en `src/videos/components/category.js`:

```
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
```
y lo agregamos al `category_list.js`:
```jsx
} from 'react-native';
...
import Category from '../components/category';

class CategoryList extends Component {
...
  renderItem = ({item}) => {
    return (
      <Category {...item}/>
    )
  }
```


### Componentes independientes

instalar componentes desde npm, si hay mala suerte se debe hacer desde el IDE
https://github.com/react-native-community/react-native-video

instalamos con yarn y linkeamos

```
yarn add react-native-video
react-native link react-native-video
```
ya deberiamos poder usarlo...

como use expo es diferente, usaremos su sdk
```
yarn expo install expo-av
```
y agregamos en el app.js
```
import { Video } from 'expo-av';
```

**No esta terminado el componente ya que es independiente por Expo**

creamos los componentes y lo importamos en el App.js:
```

```jsx
import Player from './src/player/containers/player'

export default class App extends Component<Props> {
  ...
  render() {
    return (
      <Home>
        <Header />
      <Player />
        <Text>buscador</Text>
        ...
```
y creamos los componentes en una nueva carpeta `src/player`

aqui, creamos en `components/layout.js`:
```jsx
import React from 'react';
import {
  View,Text,StyleSheet
} from 'react-native';

function Layout (props){
  return(
    <View style={styles.container}>
    <View style={styles.video}>
    {props.video}
    </View>
    <View style={styles.overlay} >
  {props.loader}
    </View>
    </View>
    )
}

const styles=StyleSheet.create({
container:{
  paddingTop: '56.25%',
},
video:{
  position: 'absolute' ,
  left:0,
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'black',
},
overlay:{
  position: 'absolute', 
  left:0,
  top: 0,
  right: 0,
  bottom: 0,
  justifyContent:  'center',
  alignItems: 'center'
}
})
export default Layout;
```

y en `containers/player.js`
```
import React ,{Component} from 'react';
//import { Video } from 'expo';
import { Video } from 'expo-av';
import {
  StyleSheet, ActivityIndicator
} from 'react-native';

import Layout from '../components/layout';
class Player extends Component{
  render(){
    return(
      <Layout video= {
    <Video source={{uri:"https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4"}}
        style={styles.video} resizeMode='contain' shouldPlay
        />
      } 
      loader={
          <ActivityIndicator color='red'/>
        }
      />
    )
  }
}


const styles=StyleSheet.create({
  video:{
    position: 'absolute' ,
    left: 0,
    right: 0,
    bottom: 0,
    top:0,
  }
})
export default Player
```

falta crear los botones de pausa y volumen, pero al ser de expo  posee propiedades diferentes, usar: 
https://medium.com/@kalen7/build-this-simple-video-player-with-react-native-and-expo-to-tell-a-multi-part-story-part-3-48f3ce1664f6
https://medium.com/front-end-weekly/how-to-play-video-with-react-native-and-expo-30523bfcb311


### Redux



