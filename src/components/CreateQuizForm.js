import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
export default function CreateQuizForm() {
  return (
    <div>
      <MDBContainer>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Questions Title</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="NodeJS, ReactJS, Algorithm, Data Structure" />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" value="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form.Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows="9" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </MDBContainer>
    </div>
  );
}
