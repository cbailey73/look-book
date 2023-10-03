import { removeBookId } from '../../utils/localStorage';

import {
    Card,
    Button,
    Col
  } from 'react-bootstrap';


const MyBooks = ({ books }) => {
    if (!books.length) {
      return <h3>No Books Saved</h3>;
    }
  
    return (
        <div fluid className='text-light bg-dark p-5'>
        { books &&
        books.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => removeBookId(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </div>
    );
  };
  
  export default MyBooks;