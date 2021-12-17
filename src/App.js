import React, { useState, useEffect } from "react";

function App() {
	const url = "https://api.hatchways.io/assessment/students";
	const [students, setStudents] = useState([]);
	const [filteredStudents, setFilteredStudents] = useState([]);

	const filter = (filterValue) => {
		let results = students.filter((student) => {
			return (
				student.firstName.toLowerCase().includes(filterValue.trim()) ||
				student.lastName.toLowerCase().includes(filterValue.trim())
			);
		});
		setFilteredStudents(results);
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
				onChange={(e) => filter(e.target.value)}
				placeholder="Search by name"
			/>
			{filteredStudents.map((student) => (
				<Student
					key={`${student.firstName}${student.lastName}`}
					data={student}
				/>
			))}
		</div>
	);
}

function Student({ data }) {
	const averageGrades = (arrayToConvert) => {
		let arr = arrayToConvert.map((elem) => parseInt(elem, 10));
		return arr.reduce((a, b) => a + b, 0) / arr.length;
	};
	return (
		<section className="student">
			<div className="image">
				<img src={data.pic} alt={`${data.firstName}${data.lastName}`} />
			</div>
			<div className="details">
				<h1>
					{data.firstName} {data.lastName}
				</h1>
				<ul>
					<li>Email: {data.email}</li>
					<li>Company: {data.company}</li>
					<li>Skill: {data.skill}</li>
					<li>
						Average: {`${averageGrades(data.grades).toFixed(2)}%`}
					</li>
				</ul>
			</div>
		</section>
	);
}

export default App;
