import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';

function NavbarL() {
  return (
    <>
    
    
        <Container className='container d-flex justify-content-center flex-column'>
          <p>nombre</p>
          <input type="text" />
          <br />
          <p>email</p>
          <input type="text" />
          <br />
          <p>contraseña</p>
          <input type="text" />
          <br />
          <p>rol</p>
          <input type="text" />
          <br />
          <p>institucion</p>
          <input type="text" />
          <br />
          <Button>Agregacion</Button>
        </Container>
      
      <br />
    </>
  );
}

export default NavbarL;
