import { ChangeEvent, useState } from "react";
import { appSettings } from "../settings/appSettings";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IEmployee } from "../interfaces/IEmployee";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

const initialEmployee = {
  name: "",
  email: "",
  salary: 0
}

const NewEmployee = () => {
  const [employee, setEmployee] = useState<IEmployee>(initialEmployee);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const goBack = () => {
    navigate("/");
  }

  const saveEmployee = async () => {
    const response = await fetch(`${appSettings.apiUrl}Employee/New`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    })
    if (response.ok) {
      navigate("/")
    } else {
      Swal.fire({
        title: "Error!",
        text: "Cant save the employee",
        icon: "warning",
      })
    }

  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>New Employee</h4>
          <hr />
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input type="text" name="name" onChange={handleInputChange} value={employee.name} />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" name="email" onChange={handleInputChange} value={employee.email} />
            </FormGroup>
            <FormGroup>
              <Label>Salary</Label>
              <Input type="number" name="salary" onChange={handleInputChange} value={employee.salary} />
            </FormGroup>
          </Form>

          <Button color="primary" className="me-4" onClick={saveEmployee}>Save</Button>
          <Button color="secondary" onClick={goBack}>Return</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default NewEmployee
