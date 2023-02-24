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
            <Nav.Link href="/guidepage">Guide</Nav.Link>
            <Nav.Link href="/bubblemap">BubbleMaps</Nav.Link>
            <Nav.Link href="/scatter">Scatter Graphs</Nav.Link>
            <Nav.Link href="/pie">Pie Charts</Nav.Link>
            <Nav.Link href="/bar">Bar Charts</Nav.Link>
            <Nav.Link href="/line">Line Charts</Nav.Link>
            <Nav.Link href="/multiline">Multi-line Charts</Nav.Link>
            <Nav.Link href="/choropleth">Choropleths</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMain;