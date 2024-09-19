import { useEffect, useState } from "react";
import { appSettings } from "../settings/appSettings";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IEmployee } from "../interfaces/IEmployee";
import { Container, Row, Col, Table, Button } from "reactstrap";

const ListEmployees = () => {
  const [employee, setEmployee] = useState<IEmployee[]>([]);

  const fetchEmployee = async () => {
    const response = await fetch(`${appSettings.apiUrl}Employee/List Employees`)
    if (response.ok) {
      const data = await response.json();
      setEmployee(data);
    }
  }

  useEffect(() => {
    fetchEmployee();
  }, [])

  const DeleteEmployee = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete Employee",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`${appSettings.apiUrl}Employee/Delete/${id}`, { method: "DELETE" })
        if (response.ok) await fetchEmployee();
      }
    });
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>List Employees</h4>
          <hr />
          <Link className="btn btn-success mb-3" to='/newEmployee'>New Employee</Link>

          <Table bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Salary</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employee.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.salary}</td>
                  <td >
                    <Link className="btn btn-primary me-3" to={`/editEmployee/${item.id}`}>Edit</Link>
                    <Button color="danger" onClick={() => { DeleteEmployee(item.id!) }}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default ListEmployees
