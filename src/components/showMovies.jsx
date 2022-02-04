import React from 'react';
import Like from './common/like';

const ShowMovies = (props) => {
    const{pageMovies,handleLike ,handleDelete}= props;
    return ( 
        <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pageMovies.map((m) => (
                <tr key={m._id}>
                  <td>{m.title}</td>
                  <td>{m.genre.name}</td>
                  <td>{m.numberInStock}</td>
                  <td>{m.dailyRentalRate}</td>
                  <td>
                    <Like liked={m.liked} onClick={() => handleLike(m)} />
                  </td>
                  <td
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(m)}
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
     );
}
 
export default ShowMovies;