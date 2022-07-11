import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Card, CardText, CardBody, CardTitle, CardSubtitle, CardLink, Button,  NavBar, Nav, NavItem, NavLink, Badge} from 'reactstrap'
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faVideo, faStar } from '@fortawesome/free-solid-svg-icons'
import Movie from './components/Movies'


function App() {

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


  var movieList = moviesData.map(function(movie, i) {
    return <Movie key = {i} movieName = {movie.name} movieDesc = {movie.desc} movieImg = {movie.img} globalRating = {movie.note} globalCountRating = {movie.vote} />
  })


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
            <NavItem>
              <NavLink active href="#">
                <Button color="secondary">11 films</Button>
              </NavLink>
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
