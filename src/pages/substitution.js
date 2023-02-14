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
            binary_result : '',
            unicode_result : '',
            type: 'binary'
        }
        this.fileInput = createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleEncrypt = () => {
        //handle text input
        if(this.fileInput.current.files[0] == null) {
            let cypher = substitution(this.state.message, this.state.input_size);
            this.setState({result: cypher});
            this.setState({binary_result: cypher});

            let bitDiff = cypher.length % 8;
            if (bitDiff!==0){
                for (let i = 0; i < 8 - bitDiff; i++){
                    cypher += 0;
                }
            }
            let cipher = "";
            for (let i = 0; i < cypher.length; i++) {
                cipher += String.fromCodePoint(parseInt(cypher.substring(i, i+8), 2));
            }
            this.setState({unicode_result: cipher});

        } 
        //handle file input
        else {
            const fr = new FileReader();
            fr.onload = () => {
                this.setState({message: fr.result});
                let cypher = substitution(this.state.message, this.state.input_size);
                this.setState({result: cypher});
                this.setState({binary_result: cypher});

                let bitDiff = cypher.length % 8;
                if (bitDiff!==0){
                    for (let i = 0; i < 8 - bitDiff; i++){
                        cypher += 0;
                    }
                }
                let cipher = "";
                for (let i = 0; i < cypher.length; i++) {
                    cipher += String.fromCodePoint(parseInt(cypher.substring(i, i+8), 2));
                }
                this.setState({unicode_result: cipher});
            }
            fr.readAsText(this.fileInput.current.files[0]);

        }

        this.setState({type: 'binary'});
        
    }

    handleDecrypt = () => {
        //handle text input
        if(this.fileInput.current.files[0] == null) {
            let plainMsg = inverseSubstitution(this.state.message, this.state.input_size);
            this.setState({result: plainMsg});
            this.setState({unicode_result: plainMsg});
        } 
        //handle file input
        else {
            const fr = new FileReader();
            fr.onload = () => {
                this.setState({message: fr.result});
                let plainMsg = inverseSubstitution(fr.result, this.state.input_size);
                this.setState({result: plainMsg});
                this.setState({unicode_result: plainMsg});
            }
            fr.readAsText(this.fileInput.current.files[0]);
        }
        
        this.setState({type: 'binary'});

    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        if (name === 'type') this.handleType(e);
    }

    handleType = (e) => {
        if (e.target.value === 'unicode') {
            this.setState({result: this.state.unicode_result});
        } else {
            this.setState({result: this.state.binary_result});
        }
    }

    clearField = () => {
        this.fileInput.current.value = null;
    }

    handleSaveFile = () => {
        let blob = new Blob([this.state.unicode_result],
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
                    <Form.Label>Input size</Form.Label>
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
                    <Form.Check inline label="Binary" type="radio" value="binary" name="type" onChange={this.handleInputChange} checked={this.state.type === 'binary'}/>
                    <Form.Check inline label="Unicode" type="radio" value="unicode" name="type" onChange={this.handleInputChange} checked={this.state.type === 'unicode'}/>
                </Form.Group>
            </Container><br/>
            <Button variant="primary" type="button" onClick={this.handleSaveFile}>Download as File</Button>

            <Container className="mb-5"></Container>
        </Container>
    )
    }
}

export default Substitution;