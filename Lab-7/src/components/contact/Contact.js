import React, { useState } from 'react'
import { Button, Col, Row, InputGroup, Form, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
export default function Contact() {

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container style={{backgroundColor:'#F0FFFF'}}>
    <h1>Contact Us</h1>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom04">
        <Form.Label>Language</Form.Label>
        <Form.Select aria-label="Default select example">
          <option>Choose your favorite language</option>
          <option value="1">EngLand</option>
          <option value="2">France</option>
          <option value="3">Spain</option>
          <option value="4">Việt Nam</option>
        </Form.Select>
        </Form.Group>
      </Row>
      <Form.Group style={{marginTop:'20px', marginBottom:'30px'}}>
          <Form.Label>Your Content</Form.Label>
           <div className="input-group">
           <span className="input-group-text">
              <FontAwesomeIcon icon={faEdit} />
            </span>
            <Form.Control
              type="text"
              placeholder="Write here ..."
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please write content here.
            </Form.Control.Feedback>
            </div>
         </Form.Group>
         <hr/>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button style={{marginBottom:'256px'}} type="submit" variant='success'>Submit form</Button>
    </Form>
    </Container>
  )
}