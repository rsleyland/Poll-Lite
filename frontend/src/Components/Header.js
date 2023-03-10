import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap';

const Header = () => {

    return (
        <Navbar bg="dark" className='' style={{height: "60px"}}>
            <Container className='justify-content-around'>
                <Navbar.Brand className='text-light' href="/">Poll <small>lite</small></Navbar.Brand>
                <Nav>
                    <Nav.Link className='text-light' href="/">New Poll</Nav.Link>
                    <Nav.Link className='text-light' href="#acc">Account</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

    )


}

export { Header };