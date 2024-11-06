import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [section, setSection] = useState("A");
  const [period, setPeriod] = useState(1);
  const [subject, setSubject] = useState("");
  const [faculty, setFaculty] = useState("");
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    // Fetch the initial timetable for the selected section
    fetchTimetable();
  }, [section]);

  const fetchTimetable = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/timetable/${section}`);
      setTimetable(response.data.data);
    } catch (error) {
      console.error("Error fetching timetable:", error);
    }
  };

  const addToTimetable = async () => {
    if (!subject || !faculty) {
      alert("Please enter both subject and faculty name.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/timetable", {
        section,
        period,
        subject,
        faculty,
      });

      if (response.data.success) {
        fetchTimetable(); // Refresh timetable after updating
        setSubject("");
        setFaculty("");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4">Timetable Generator</h1>

      <Form className="mb-4">
        <Form.Group>
          <Form.Label>Select Section</Form.Label>
          <Form.Select value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Period</Form.Label>
          <Form.Select value={period} onChange={(e) => setPeriod(e.target.value)}>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <option key={num} value={num}>
                Period {num}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Faculty</Form.Label>
          <Form.Control
            type="text"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            placeholder="Enter faculty name"
          />
        </Form.Group>

        <Button variant="primary" className="mt-3" onClick={addToTimetable}>
          Add to Timetable
        </Button>
      </Form>

      <h2 className="text-center">Timetable for Section {section}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Period</th>
            <th>Subject</th>
            <th>Faculty</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((item, index) => (
            <tr key={index}>
              <td>Period {index + 1}</td>
              <td>{item.subject}</td>
              <td>{item.faculty}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
