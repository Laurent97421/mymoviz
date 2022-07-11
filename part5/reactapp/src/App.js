import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Card, CardText, CardBody, CardTitle, CardSubtitle, CardLink, Button,  NavBar, Nav, NavItem, NavLink, Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Popover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem, ListGroupItemText, List} from 'reactstrap'
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faVideo, faStar } from '@fortawesome/free-solid-svg-icons'
import Movie from './components/Movies'
import {useState, useEffect} from 'react'



function App() {

  // Copie depuis la doc reactstrap pour le Popover
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);
  
  // Variable d'états qui servira de compteur pour les likes
  const [moviesCount, setMoviesCount] = useState(0);
  
  // Création de la wishlist
  const [moviesWishList, setMoviesWishList] = useState([])

  // On récupère les films que notre backend récupère dans notre API TheMovieDB
  const [moviesFromBackend, setMoviesList] = useState([]);
  useEffect (() => {
    async function loadData(){
      // Récupération des films via l'API
      const rawResponse = await fetch('/new-movies');
      const response = await rawResponse.json();
      setMoviesList(response.movies);

      // Récupération de la wishlist au démarrage de la page
      const rawResponseWish = await fetch('/wishlist-movie');
      const responseWish = await rawResponseWish.json();
      console.log(responseWish)
      const wishListFromDB = responseWish.movieList.map((movie,i) => {
        return {movieName:movie.movieName,movieImg:movie.movieImg}
      })
      setMoviesWishList(wishListFromDB)
      setMoviesCount(responseWish.movieList.length)
      // console.log(4444)
    }
    loadData();
  }, [])
  // console.log(moviesFromBackend)
  
  // // Pour que le picto coeur swap du noir au rouge et inversement
  // const [toSee, setToSee] = useState(false)

  // Compteur de films likés
  var handleClickAddMovie = async (movieName, movieImg) => {
    // console.log('Click detected')
    setMoviesWishList([...moviesWishList,{movieName: movieName, movieImg: movieImg}])
    setMoviesCount(moviesCount + 1)
    await fetch('/wishlist-movie', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `name=${movieName}&img=${movieImg}`
    });
  }
  // console.log(moviesCount)
  
  var handleClickDeleteMovie = async (movieName) => {
    setMoviesWishList(moviesWishList.filter(e => e.movieName !== movieName))
    setMoviesCount(moviesCount - 1)
    // console.log(moviesCount)
    await fetch('/wishlist-movie/'+ movieName, {
      method: 'DELETE',
    });
  }
  
  var cardWish = moviesWishList.map((movie, i) => {
    return (
      <Card className='card' onClick={ () => {handleClickDeleteMovie(movie.movieName)} }>
          <img src={movie.movieImg} /> {movie.movieName}
      </Card>
    )
  })

  var movieList = moviesFromBackend.map(function(movie, i) {
    
    var alreadyExist = moviesWishList.find(e => e.movieName === movie.title )

    var isSee = true;
    
    if(alreadyExist === undefined){
      isSee = false;
    }
    // console.log('porgoor '+isSee)

    // Si description trop longue on met ... à partir du caractère 80
    if(movie.overview.length > 80){
    movie.overview = movie.overview.slice(0,80)+'...'
  }

  

    // Si le film n'a pas d'image on en met une générique
    // if(movie.backdrop_path == undefined){
    // }

    return <Movie key = {i} isSee = {isSee} movieName = {movie.title} movieDesc = {movie.overview} movieImg = {'https://image.tmdb.org/t/p/w500/'+movie.backdrop_path} globalRating = {movie.vote_average} globalCountRating = {movie.vote_count} handleClickAddMovieParent = {handleClickAddMovie} handleClickDeleteMovieParent = {handleClickDeleteMovie} />
  })
  // console.log(444)
  // console.log(movieList)

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
