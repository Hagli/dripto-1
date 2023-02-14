import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Component, createRef} from 'react';
import { substitution, inverseSubstitution } from "../functions/substitution";

class Substitution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : '',
            input_size : '',
            result : '',
            fake_result : '',
            spaced: 'no-space'
        }
        this.fileInput = createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleEncrypt = () => {
        //handle text input
        if(this.fileInput.current.files[0] == null) {
            let cypher = substitution(this.state.message, this.state.input_size);
            this.setState({result: cypher});
            this.setState({fake_result: cypher});

        } 
        //handle file input
        else {
            const fr = new FileReader();
            fr.onload = () => {
                this.setState({message: fr.result});
                let cypher = substitution(this.state.message, this.state.input_size);
                this.setState({result: cypher});
                this.setState({fake_result: cypher});
            }
            fr.readAsText(this.fileInput.current.files[0]);

        }

        this.setState({spaced: 'no-space'});
        
    }

    handleDecrypt = () => {
        //handle text input
        if(this.fileInput.current.files[0] == null) {
            let plainMsg = inverseSubstitution(this.state.message, this.state.input_size);
            this.setState({result: plainMsg});
            this.setState({fake_result: plainMsg});
        } 
        //handle file input
        else {
            const fr = new FileReader();
            fr.onload = () => {
                this.setState({message: fr.result});
                let plainMsg = inverseSubstitution(fr.result, this.state.input_size);
                this.setState({result: plainMsg});
                this.setState({fake_result: plainMsg});
            }
            fr.readAsText(this.fileInput.current.files[0]);
        }
        
        this.setState({spaced: 'no-space'});

    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        if (name === 'spaced') this.handleSpace(e);
    }

    handleSpace = (e) => {
        if (e.target.value === 'spaced') {
            let r = this.state.result.replace(/(.{8})/g,"$& ");
            this.setState({result: r});
        } else {
            this.setState({result: this.state.fake_result});
        }
    }

    clearField = () => {
        this.fileInput.current.value = null;
    }

    handleSaveFile = () => {
        let blob = new Blob([this.state.fake_result],
                { type: "text/plain;charset=utf-8" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "cypher.txt";
        link.click();
    }
    render() {
    return (
        <Container>
            <h1 className="mb-5 mt-5">Substitution (DES S-Box)</h1>
            <Form className="mb-5">
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Plain Text / Cypher Text</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="" name="message" value={this.state.message} onChange={this.handleInputChange}></Form.Control>
                    <Form.Label>Input File</Form.Label>
                    <Form.Control type="file" accept=".txt" ref={this.fileInput}/>
                    <Button variant="outline-secondary" size="sm" type="button" onClick={this.clearField} className="mt-1 mb-4">Clear</Button>
                    <br/>
                    <Form.Label>a</Form.Label>
                    <Form.Control type="number" pattern="[0-9]*" placeholder="" name="input_size" value={this.state.input_size} onChange={this.handleInputChange}></Form.Control>
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
             <Container>
                <Form.Group className="mb-3">                
                    <Form.Check inline label="No Space" type="radio" value="no-space" name="spaced" onChange={this.handleInputChange} checked={this.state.spaced === 'no-space'}/>
                    <Form.Check inline label="Spaced" type="radio" value="spaced" name="spaced" onChange={this.handleInputChange} checked={this.state.spaced === 'spaced'}/>
                </Form.Group>
            </Container><br/>
            <Button variant="primary" type="button" onClick={this.handleSaveFile}>Download as File</Button>

            <Container className="mb-5"></Container>
        </Container>
    )
    }
}

export default Substitution;