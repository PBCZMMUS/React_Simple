// Components/Courses.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;