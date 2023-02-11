
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';

const NavigationBar = () => {
	
	const [drip, setDrip] = useState(true);
	useEffect(() => {
		if (drip) {
			document.body.classList.add('drip');
		} else {
			document.body.classList.remove('drip');
		}
	   }, [drip])

	return (
		<>
		<Navbar bg='dark' variant='dark'>
			<Container>
				<Navbar.Brand>Dripto</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link href="/vigenere">
						Vigenere
					</Nav.Link>
					<Nav.Link href="/auto-key-vigenere">
						Auto-Key Vigenere
					</Nav.Link>
					<Nav.Link href="/ext-vigenere">
						Extended Vigenere
					</Nav.Link>
					<Nav.Link href="/affine">
						Affine Cypher
					</Nav.Link>
					<Nav.Link href="/playfair">
						Playfair Cypher
					</Nav.Link>
					<Nav.Link href="/hill">
						Hill Cypher
					</Nav.Link>
				</Nav>
			</Container>
			<Button className="me-5" variant="outline-light" onClick={() => {setDrip(!drip)}}>Drip</Button>
		</Navbar>
		</>
	);
};

export default NavigationBar;
