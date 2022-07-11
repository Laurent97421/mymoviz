import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Card, CardText, CardBody, CardTitle, CardSubtitle, CardLink, Button,  NavBar, Nav, NavItem, NavLink, Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Popover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem, ListGroupItemText, List} from 'reactstrap'
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faVideo, faStar } from '@fortawesome/free-solid-svg-icons'
import Movie from './components/Movies'
import {useState} from 'react'



function App() {

  // Copie depuis la doc reactstrap pour le Popover
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  // Equivalent de la base de données, ou JSON d'une API :
  var moviesData = [
    { name: "Star Wars : L'ascension de Skywalker", desc: "La conclusion de la saga Skywalker. De nouvelles légendes vont naître dans cette ...", img: "/img/starwars.jpg", note: 6.7, vote: 5 },
    { name: "Maléfique : Le pouvoir du mal", desc: "Plusieurs années après avoir découvert pourquoi la plus célèbre méchante Disney avait un cœur ...", img: "img/maleficent.jpg", note: 8.2, vote: 3 },
    { name: "Jumanji: The Next Level", desc: "L’équipe est de retour, mais le jeu a changé. Alors qu’ils retournent dans Jumanji pour secourir ...", img: "img/jumanji.jpg", note: 4, vote: 5 },
    { name: "Once Upon a Time... in Hollywood", desc: "En 1969, Rick Dalton – star déclinante d'une série télévisée de western – et Cliff Booth, blah blah blah à hollywood...", img: "img/once_upon.jpg", note: 6, vote: 7 },
    { name: "La Reine des neiges 2", desc: "Elsa, Anna, Kristoff, Olaf et Sven voyagent bien au-delà des portes d’Arendelle à la recherche de réponses ...", img: "img/frozen.jpg", note: 4.6, vote: 3 },
    { name: "Terminator: Dark Fate", desc: "De nos jours à Mexico. Dani Ramos, 21 ans, travaille sur une chaîne de montage dans une usine automobile...", img: "img/terminator.jpg", note: 6.1, vote: 1 },
    { name: "Bad Boy 3", desc: "Baaaaaad Boyyyyys", img: "img/badboy3.jpg", note: 8, vote: 27 }
  ]

  // Variable d'états qui servira de compteur pour les likes
  const [moviesCount, setMoviesCount] = useState(0);
  
  // Création de la wishlist
  const [moviesWishList, setMoviesWishList] = useState([])
  
  // // Pour que le picto coeur swap du noir au rouge et inversement
  // const [toSee, setToSee] = useState(false)

  // Compteur de films likés
  var handleClickAddMovie = (movieName, movieImg) => {
    // console.log('Click detected')
    setMoviesWishList([...moviesWishList,{movieName: movieName, movieImg: movieImg}])
    setMoviesCount(moviesCount + 1)
  }
  // console.log(moviesCount)
  
  var handleClickDeleteMovie = (movieName) => {
    setMoviesWishList(moviesWishList.filter(e => e.movieName !== movieName))
    setMoviesCount(moviesCount - 1)
    // console.log(moviesCount)
  }
  
  var cardWish = moviesWishList.map((movie, i) => {
    return (
      <Card className='card' onClick={ () => {handleClickDeleteMovie(movie.movieName)} }>
          <img src={movie.movieImg} /> {movie.movieName}
      </Card>
    )
  })

  var movieList = moviesData.map(function(movie, i) {
    
    var alreadyExist = moviesWishList.find(e => e.movieName === movie.name )

    var isSee = true;
    
    if(alreadyExist === undefined){
      isSee = false;
    }
    // console.log('porgoor '+isSee)
    
    return <Movie key = {i} isSee = {isSee} movieName = {movie.name} movieDesc = {movie.desc} movieImg = {movie.img} globalRating = {movie.note} globalCountRating = {movie.vote} handleClickAddMovieParent = {handleClickAddMovie} handleClickDeleteMovieParent = {handleClickDeleteMovie} />
  })

  // var listItem = [];
  // for(let i = 0; i < moviesCount; i++){
  //   listItem.push(<ListGroupItem key={i}>{moviesWishList[i].movieName}  <img src={moviesWishList[i].movieImg}/>   </ListGroupItem> )
  //   console.log(moviesWishList.length)
  // }
  //  


  
  // console.log(moviesWishList.length)

  return (
    <div className="App" style={{backgroundColor: '#2d3436'}}>

    <Container >
      <Row>
          <Nav>
            <NavItem>
              <NavLink href="#">
                <img src = '/img/logo.png' />
              </NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="#" style = {{color: 'white'}}>
                Last Releases
              </NavLink>
            </NavItem>
            <NavItem className='me-auto' navbar>
                <DropdownToggle>
                  <Button type='button' id='Popover1'> {moviesCount} films </Button>
                </DropdownToggle>
                  <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                  <PopoverHeader>WishList</PopoverHeader>
                  <PopoverBody>
                    <ListGroup>
                      {/* <ListGroupItem> */}
                        {/* <ListGroupItemText> */}
                          {cardWish}
                        {/* </ListGroupItemText> */}
                      {/* </ListGroupItem> */}
                    </ListGroup>
                  </PopoverBody>
                </Popover>
            </NavItem>
          </Nav>
      </Row>

        {/* On injecte le tableau customisé [movieList] 
        dans ces balises JSX sous forme d'objet JavaScript */}
      <Row>
        {movieList}
      </Row>
    </Container>


    </div>
  );
}

export default App;
