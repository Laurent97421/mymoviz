

import '../App.css'
import React from 'react';
import { Col, Card, CardText, CardBody, CardImg, Button, Badge, ButtonGroup } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faVideo, faStar, faEye } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'



// Affiche les etoiles de globalRating
// Push des etoiles jaunes dans globalRating

function Movie(props) {

  // Création des états
  // const [likeMovie, setLikeMovie] = useState(false);
  const [watchMovie, setWatchMovie] = useState(0);
  const [countWatchMovie, setCountWatchMovie] = useState(0);
  const [myRatingMovie, setMyRatingMovie] = useState(0);
  // Technique classique : créer un boolean à false, pour l'utiliser d'une manière qu'on veut. 
  // le 'false' est transformé à 'true' dans les fonctions handleClick, qui s'active dès qu'on vote
  const [isRatingMovie, setIsRatingMovie ] = useState(false)
  


  // Changer la couleur du coeur like
  var handleClickLike = () => {
    // setLikeMovie(!props.isSee);
    if(!props.isSee){
      props.handleClickAddMovieParent(props.movieName, props.movieImg);
    } else {
      props.handleClickDeleteMovieParent(props.movieName);
    }
  }
  var styleLike;
  if (props.isSee) {
    styleLike = { color: '#e74c3c', cursor: 'pointer', userSelect: 'none' };
  } else {
    styleLike = { cursor: 'pointer', userSelect: 'none' };
  }

  // Changer la couleur du crypto vidéo et incrémenter le compteur de +1
  var handleClickMovie = () => {
    setWatchMovie(true);
    setCountWatchMovie(countWatchMovie + 1)
  }
  var styleMovie;
  if (watchMovie === true) {
    styleMovie = { color: '#e74c3c', cursor: 'pointer' }
  } else {
    styleMovie = { cursor: 'pointer' }
  }


  // Barre mon avis
  // Les 10 étoiles noires dans un tableau, ce sera plus propre à lire
  var starsMyRating = [];
  for (let i = 0; i < 10; i++) {
    var styleMyRating = {};
    if (i < myRatingMovie) {
      styleMyRating = { color: '#f1c40f' }
    }
    starsMyRating.push(<FontAwesomeIcon  onClick={() => {setMyRatingMovie(i+1)} } style={styleMyRating} icon={faStar} />)
  }

  // On ajoute une étoile jaune en cliquant sur le +
  var handleClickMyRatingMovieAdd = () => {
    if (myRatingMovie < 10) {
      setMyRatingMovie(myRatingMovie + 1);
      setIsRatingMovie(true);
    }
  }
  // On enlève une étoile jaune en cliquant sur le -, ne peut pas aller en négatif
  var handleClickMyRatingMovieRemove = () => {
    if (myRatingMovie > 0) {
      setMyRatingMovie(myRatingMovie - 1);
      setIsRatingMovie(true);
    }
  }


  // // Prise en compte de notre note dans la moyenne
  //// Calculer la nouvelle moyenne ////
  var nbTotalNote = props.globalRating * props.globalCountRating
  var nbTotalVote = props.globalCountRating
  if(isRatingMovie) {
    nbTotalNote = nbTotalNote + myRatingMovie
    nbTotalVote += 1
  }
  var updatedScore = Math.round(nbTotalNote/nbTotalVote)


  // Ajout des étoiles jaunes au global rating
  var starsGlobalRating = [];
  for (let i = 0; i < 10; i++) {
    var style = {};
    if (i < updatedScore) {
      style = { color: '#f1c40f' }
    }
    starsGlobalRating.push(<FontAwesomeIcon style={style} icon={faStar} />)
  }

  // Compteur de like
  // var handleClickAddMovieChild = () => {
  //   if(!props.isSee){
  //     props.handleClickAddMovieParent(props.movieName, props.movieImg);
  //   }
  // }

  // var handleClickDeleteMovieChild = () => {
  //   if(props.isSee){
  //     props.handleClickDeleteMovieParent(props.movieName);
  //   }
  // }  

  return (
    <Col xs={12} lg={6} xl={4}>
      <Card class="card" style={{ marginBottom: 10, marginTop: 10 }}>
        <CardImg alt={props.movieName} src={props.movieImg} width="100%" />
        <CardBody>
          <CardText>
            Like
            {' '}
            <FontAwesomeIcon onClick={() => handleClickLike()} icon={faHeart} style={styleLike} />
            {/* <FontAwesomeIcon onClick={() => handleClickAddMovieChild()} icon={faHeart} style={styleLike} /> */}
          </CardText>
          <CardText>
            Nombre de vues
            {' '}
            <FontAwesomeIcon onClick={() => handleClickMovie()} icon={faEye} style={styleMovie} />
            {' '}
            <Badge color="secondary" style={{ marginRight: 2 }}> {countWatchMovie} </Badge>
          </CardText>
          <CardText>
            Mon avis {' '}
            {starsMyRating}
            <ButtonGroup>
              <Button onClick={() => handleClickMyRatingMovieRemove()} > - </Button>
              <Button onClick={() => handleClickMyRatingMovieAdd()}> + </Button>
            </ButtonGroup>
          </CardText>
          <CardText>
            Moyenne
            {' '}
            {starsGlobalRating}
            {props.globalCountRating}
          </CardText>
          <CardText>
            {props.movieName}
          </CardText>
          <CardText>
            {props.movieDesc}
          </CardText>
        </CardBody>
      </Card>
    </Col>
  )
}

export default Movie;