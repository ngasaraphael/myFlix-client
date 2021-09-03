import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: '611d625b59db0314b6eca809',
          Title: 'Silence of the Lambs',
          Description:
            'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
          Genre: {
            Name: 'Action',
            Description:
              'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases.',
          },
          Director: {
            Name: 'Jonathan Demme',
            Bio: 'Robert Jonathan Demme was an American director, producer, and screenwriter.',
            Birth: '1944',
            Death: '2017',
          },
          ImagePath:
            'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
          Featured: true,
        },
        {
          _id: '611da03a89f6daf462285935',
          Title: 'The Godfather : Part II',
          Description:
            "this mob drama, based on Mario Puzo's novel of the same name, focuses on the powerful Italian-American crime family of Don Vito Corleone (Marlon Brando). When the don's youngest son, Michael (Al Pacino), reluctantly joins the Mafia, he becomes involved in the inevitable cycle of violence and betrayal.",
          Genre: {
            Name: 'Drama',
            Description:
              ' Drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.',
          },
          Director: {
            Name: 'Francis Ford Coppola',
            Bio: 'Updated Bio',
            Birth: '1939',
          },
          ImagePath:
            'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
          Featured: true,
        },
        {
          _id: '611da17f89f6daf462285937',
          Title: 'The Godfather',
          Description:
            "This mob drama, based on Mario Puzo's novel of the same name, focuses on the powerful Italian-American crime family of Don Vito Corleone (Marlon Brando). When the don's youngest son, Michael (Al Pacino), reluctantly joins the Mafia, he becomes involved in the inevitable cycle of violence and betrayal.",
          Genre: {
            Name: 'Drama',
            Description:
              ' Drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.',
          },
          Director: {
            Name: 'Francis Ford Coppola',
            Bio: "Francis Ford Coppola is an American film director, producer, and screenwriter. He was a central figure in the New Hollywood filmmaking movement of the 1960s and 1970s.[5] His accolades include five Academy Awards, six Golden Globe Awards, two Palmes d'Or, and a British Academy Film Award.",
            Birth: '1939',
          },
          ImagePath:
            'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
          Featured: true,
        },

        //{
        //   _id: 1,
        //   Title: 'Inception',
        //   Description: 'desc1...',
        //   ImagePath: 'https://unsplash.com/photos/4K2lIP0zc_k',
        // },
        // {
        //   _id: 2,
        //   Title: 'The Shawshank Redemption',
        //   Description: 'desc2...',
        //   ImagePath: 'https://unsplash.com/photos/4K2lIP0zc_k',
        // },
        // {
        //   _id: 3,
        //   Title: 'Gladiator',
        //   Description: 'desc3...',
        //   ImagePath: 'https://unsplash.com/photos/4K2lIP0zc_k',
        // },
      ],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }
  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className='main-view'>The list is empty!</div>;

    return (
      <div className='main-view'>
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
