import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react'
import CardList  from './components/card-list/card-list.component';
import SearchBox from './components/seacrh-box/search-box.component';

const App = () => {

  const [searchField,setSearchField] = useState('');
  const [monsters,setMonsters] = useState([]);
  const [filteredMonsters,setFilteredMonsters] = useState(monsters)
  
  useEffect( ()=> {
    fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
    response.json()).then((users) => {
    setMonsters(users);
})
  },[])

  useEffect( ()=> {
    const newFlteredMonsters = monsters.filter(monster => monster.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase()))
    setFilteredMonsters(newFlteredMonsters)
  },[monsters,searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value
    setSearchField(searchFieldString);
  }


  return(
    <div className="App">
    <h1 className='app-title' >Monsters Rolodex</h1>
    <SearchBox onChangeHandler={onSearchChange} placeholder={"search monsters"} classname={"monster-search-box"}></SearchBox>
    <CardList monsters = {filteredMonsters}></CardList>
  </div>
  )
}
// class App extends Component {

//   constructor(){
//     super();
//     this.state = {
//       monsters : [
//       ],
//       searchField : ''
//     }
//   }
//   componentDidMount(){
//     console.log("componentDidMount")
//     fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
//       response.json()).then((users) => {
//           this.setState(() => {
//             return {monsters : users}
//           })
//       })
//   }
//   onSearchChange = (event) => {
//     const searchField = event.target.value
//     this.setState(() => {
//       return { searchField }
//     })
//   }
//   render (){
//     console.log("render");
//     const {monsters,searchField} = this.state;
//     const {onSearchChange} = this;
//     const filteredMonsters = monsters.filter(monster => monster.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase()))
//     return (
//       <div className="App">
//         <h1 className='app-title' >Monsters Rolodex</h1>
//         <SearchBox onChangeHandler={onSearchChange} placeholder={"search monsters"} classname={"monster-search-box"}></SearchBox>
//         <CardList monsters = {filteredMonsters}></CardList>
//       </div>
//     );
//   }
// }

export default App;
