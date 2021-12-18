import React, { useState, useEffect } from "react";
import Student from "./Student";

function App() {
	const url = "https://api.hatchways.io/assessment/students";
	const [students, setStudents] = useState([]);
	const [filteredStudents, setFilteredStudents] = useState([]);
	const [nameFilter, setNameFilter] = useState("");
	const [tagFilter, setTagFilter] = useState("");

	useEffect(() => {
		let results;

		if (nameFilter.length == 0) {
			results = students.filter((student) => {
				return student.tags.find((tag) => tag.includes(tagFilter));
			});
		}
		if (tagFilter.length == 0) {
			results = students.filter((student) => {
				return (
					student.firstName.toLowerCase().includes(nameFilter) ||
					student.lastName.toLowerCase().includes(nameFilter)
				);
			});
		}

		if (tagFilter.length != 0 && nameFilter.length != 0) {
			results = students.filter((student) => {
				return (
					(student.firstName.toLowerCase().includes(nameFilter) ||
						student.lastName.toLowerCase().includes(nameFilter)) &&
					student.tags.find((tag) => tag.includes(tagFilter))
				);
			});
		}

		setFilteredStudents(results);
	}, [nameFilter, tagFilter]);

	const updateStudent = (value, id) => {
		const updatedStudents = students.map((item) => {
			if (item.id === id) {
				item.tags.push(value);
			}
			return item;
		});
		setStudents(updatedStudents);
		console.log(updatedStudents);
	};

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				let completedObj = data.students.map((student) =>
					Object.assign(student, { tags: [] })
				);
				setStudents(completedObj);
				setFilteredStudents(completedObj);
			});
	}, []);

	return (
		<div className="App">
			<input
				type="text"
				onChange={(e) => setNameFilter(e.target.value)}
				placeholder="Search by name"
			/>
			<input
				type="text"
				onChange={(e) => setTagFilter(e.target.value)}
				placeholder="Search by tag"
			/>
			{filteredStudents.map((student) => (
				<Student
					key={`${student.firstName}${student.lastName}`}
					data={student}
					updateStudent={updateStudent}
				/>
			))}
		</div>
	);
}

export default App;
