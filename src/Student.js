import React, { useState, useEffect } from "react";
import { BsPlusLg, BsDashLg } from "react-icons/bs";

function Student({ data, updateStudent }) {
	const [toggle, setToggle] = useState(false);
	const [tag, setTag] = useState("");
	const [tags, setTags] = useState(data.tags);
	const addTag = (e) => {
		if (e.keyCode == 13) {
			updateStudent(tag, data.id);
			e.target.value = "";
		}

		setTag("");
	};
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
				<div className="tag-section">
					<ul className="tags">
						{tags.map((tag) => (
							<li key={tag}>{tag}</li>
						))}
					</ul>
					<input
						type="text"
						onKeyDown={(e) => addTag(e)}
						onChange={(e) => setTag(e.target.value)}
					/>
				</div>
			</div>
			<div className="toggle">
				{!toggle ? (
					<button onClick={() => setToggle(!toggle)}>
						<BsPlusLg />
					</button>
				) : (
					<button onClick={() => setToggle(!toggle)}>
						<BsDashLg />
					</button>
				)}
			</div>
			{toggle && (
				<div className="grades">
					<ul>
						{data.grades.map((grade, index) => (
							<li key={`${index}-${grade}`}>
								Test {index + 1}
								<span className="left-mg">{grade}%</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</section>
	);
}

export default Student;
