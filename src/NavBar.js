import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavMain() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">HPTG</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/bubblemap">Bubble Maps</Nav.Link>
            <Nav.Link href="/scatter">Scatter Graph</Nav.Link>
            <Nav.Link href="/pie">Pie Chart</Nav.Link>
            <Nav.Link href="/bar">Bar Chart</Nav.Link>
            <Nav.Link href="/line">Line Chart</Nav.Link>
            <Nav.Link href="/multiline">Multi-line Chart</Nav.Link>
            <Nav.Link href="/choropleth">Choropleth Map</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMain;