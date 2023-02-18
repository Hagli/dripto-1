import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Component, createRef} from 'react';
import { permutation } from "../functions/permutation";

class Permutation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : '',
            box_width : '',
            box_height : '',
            result : '',
            binary_result : '',
            unicode_result : '',
            type: 'binary',
            P_box : ''
        }
        this.fileInput = createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleEncrypt = () => {
        //handle text input
        if(this.fileInput.current.files[0] == null) {
            let cypher = permutation(this.state.message, this.state.box_width, this.state.box_height);
            this.setState({result: cypher[0]});
            this.setState({binary_result: cypher[0]});
            this.setState({unicode_result: cypher[2]});
            this.setState({P_box: cypher[1]});

        } 
        //handle file input
        else {
            const fr = new FileReader();
            fr.onload = () => {
                this.setState({message: fr.result});
                let cypher = permutation(this.state.message, this.state.box_width, this.state.box_height);
                this.setState({result: cypher[0]});
                this.setState({binary_result: cypher[0]});
                this.setState({unicode_result: cypher[2]});
                this.setState({P_box: cypher[1]});
                
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
            <h1 className="mb-5 mt-5">Permutation (With Random DES P-Box)</h1>
            <Form className="mb-5">
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Plain Text / Cypher Text</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="" name="message" value={this.state.message} onChange={this.handleInputChange}></Form.Control>
                    <Form.Label>Input File</Form.Label>
                    <Form.Control type="file" accept=".txt" ref={this.fileInput}/>
                    <Button variant="outline-secondary" size="sm" type="button" onClick={this.clearField} className="mt-1 mb-4">Clear</Button>
                    <br/>
                    <Form.Label>Box width</Form.Label>
                    <Form.Control type="number" pattern="[0-9]*" placeholder="" name="box_width" value={this.state.box_width} onChange={this.handleInputChange}></Form.Control>
                    <Form.Label>Box height</Form.Label>
                    <Form.Control type="number" pattern="[0-9]*" placeholder="" name="box_height" value={this.state.box_height} onChange={this.handleInputChange}></Form.Control>
                </Form.Group>

                <Container className="d-flex gap-3">
                    <Button variant="primary" type="button" onClick={this.handleEncrypt}>
                        Encrypt
                    </Button>
                </Container>
            </Form>
            
            <Form.Label>Output</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="" readOnly name="result" value={this.state.result}/>
            <Container>
                <Form.Group className="mb-3">                
                    <Form.Check inline label="Binary" type="radio" value="binary" name="type" onChange={this.handleInputChange} checked={this.state.type === 'binary'}/>
                    <Form.Check inline label="Unicode" type="radio" value="unicode" name="type" onChange={this.handleInputChange} checked={this.state.type === 'unicode'}/>
                </Form.Group>
                <Button variant="primary" type="button" onClick={this.handleSaveFile}>Download as File</Button>
            </Container><br/>
            
            <Form className="mb-5">
                <Form.Label>The P-Box</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="" readOnly name="S-Box" value={this.state.P_box}/>
            </Form>

            <Container className="mb-5"></Container>
        </Container>
    )
    }
}

export default Permutation;