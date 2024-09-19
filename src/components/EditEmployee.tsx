import { ChangeEvent, useEffect, useState } from "react";
import { appSettings } from "../settings/appSettings";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { IEmployee } from "../interfaces/IEmployee";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

const initialEmployee = {
  id: 0,
  name: "",
  email: "",
  salary: 0
}

const EditEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<IEmployee>(initialEmployee);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch(`${appSettings.apiUrl}Employee/Obtain/${id}`)
      if (response.ok) {
        const data = await response.json();
        setEmployee(data);
      }
    }
    fetchEmployee();
  }, [])


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveEmployee = async () => {
    const response = await fetch(`${appSettings.apiUrl}Employee/Edit`, {
      method: 'PUT',
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
        text: "Cant edit the employee",
        icon: "warning",
      })
    }
  }
  
  const goBack = () => {
    navigate("/");
  }

  return (
    <Container className="mt-5">
    <Row>
      <Col sm={{ size: 8, offset: 2 }}>
        <h4>Edit Employee</h4>
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

export default EditEmployee
