import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Component, createRef} from 'react';
import {hillEncrypt, hillDecrypt} from "../functions/hill";

class Hill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : '',
            key_a : '',
            key_b : '',
            key_c : '',
            key_d : '',
            result : ''
        }
        this.fileInput = createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleEncrypt = () => {
        if(this.fileInput.current.files[0] == null) {
            let cypher = hillEncrypt(this.state.message, this.state.key_a, this.state.key_b, this.state.key_c, this.state.key_d);
            this.setState({result: cypher});

        } else {
            const fr = new FileReader();
            fr.onload = () => {
                this.setState({message: fr.result});
                let cypher = hillEncrypt(this.state.message, this.state.key_a, this.state.key_b, this.state.key_c, this.state.key_d);
                this.setState({result: cypher});
            }
            fr.readAsText(this.fileInput.current.files[0]);

        }
        
    }

    handleDecrypt = () => {
        if(this.fileInput.current.files[0] == null) {
            let plainMsg = hillDecrypt(this.state.message, this.state.key_a, this.state.key_b, this.state.key_c, this.state.key_d);
            this.setState({result: plainMsg});
        } else {
            const fr = new FileReader();
            fr.onload = () => {
                this.setState({message: fr.result});
                let cypher = hillDecrypt(this.state.message, this.state.key_a, this.state.key_b, this.state.key_c, this.state.key_d);
                this.setState({result: cypher});
            }
            fr.readAsText(this.fileInput.current.files[0]);
        }
        
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    clearField = () => {
        this.fileInput.current.value = null;
    }

    handleSaveFile = () => {
        let blob = new Blob([this.state.result],
                { type: "text/plain;charset=utf-8" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "cypher.txt";
        link.click();
    }

    render() {
    return (
        <Container>
            <h1 className="mb-5 mt-5">Hill Cypher</h1>
            <Form className="mb-5">
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Plain Text / Cypher Text</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="" name="message" value={this.state.message} onChange={this.handleInputChange}></Form.Control>
                    <Form.Label>Input File</Form.Label>
                    <Form.Control type="file" accept=".txt" ref={this.fileInput}/>
                    <Button variant="outline-secondary" size="sm" type="button" onClick={this.clearField} className="mt-1 mb-4">Clear</Button>
                    <br/>
                    <Form.Label>a</Form.Label>
                    <Form.Control type="number" pattern="[0-9]*" placeholder="" name="key_a" value={this.state.key_a} onChange={this.handleInputChange}></Form.Control>
                    <Form.Label>b</Form.Label>
                    <Form.Control type="number" pattern="[0-9]*" placeholder="" name="key_b" value={this.state.key_b} onChange={this.handleInputChange}></Form.Control>
                    <Form.Label>c</Form.Label>
                    <Form.Control type="number" pattern="[0-9]*" placeholder="" name="key_c" value={this.state.key_c} onChange={this.handleInputChange}></Form.Control>
                    <Form.Label>d</Form.Label>
                    <Form.Control type="number" pattern="[0-9]*" placeholder="" name="key_d" value={this.state.key_d} onChange={this.handleInputChange}></Form.Control>
                </Form.Group>

                <Container className="d-flex gap-3">
                    <Button variant="primary" type="button" onClick={this.handleEncrypt}>
                        Encrypt
                    </Button>
                    <Button variant="secondary" type="button" onClick={this.handleDecrypt}>
                        Decrypt
                    </Button>
                </Container>
            </Form>
            <br/>
            
            <Form.Label>Output</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="" readOnly name="result" value={this.state.result}/>
            <br/>
            <Button variant="primary" type="button" onClick={this.handleSaveFile}>Download as File</Button>

            <Container className="mb-5"></Container>
            
        </Container>
    )
    }
}

export default Hill;