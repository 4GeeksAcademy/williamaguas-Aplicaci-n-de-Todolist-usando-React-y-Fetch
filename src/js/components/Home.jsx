import React, { useState, useEffect } from 'react';
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	let [tarea, setTarea] = useState("")
	let [lista, setLista] = useState([])


	const traerUsuario = () => {
		fetch("https://playground.4geeks.com/todo/users/william",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(response => response.json())
			.then((data) => console.log(data))
			.catch(error => {
				console.log('Looks like there was a problem: \n', error);
			});
	}
	const crearTarea = (text) => {
		fetch("https://playground.4geeks.com/todo/todos/william",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					label: text,
					is_done: false
				})
			}
		)
			.then(response => response.json())
			.then(data => {
				console.log(data)
				traerTareas()
			})

			.catch(error => {
				console.log('Looks like there was a problem: \n', error);
			});
	}


	const traerTareas = () => {
		fetch("https://playground.4geeks.com/todo/users/william")
			.then(response => {


				if (response.status === 404) {
					traerUsuario()
				}
				// Lee la respuesta como JSON
				return response.json();
			})
			.then(data => {
				// Haz lo que quieras con la respuesta JSONificada
				setLista(data.todos)

			})
			.catch(error => {
				console.log('Looks like there was a problem: \n', error);
			});
	}
	useEffect(() => {
		traerTareas();
	}, []);

	const agregar = (event) => {
		if (event.key === "Enter") {
			crearTarea(tarea)
			setTarea("")
		}
	}
	const eliminarTarea = (id) => {
fetch(`https://playground.4geeks.com/todo/todos/${id}`,
			{
				method: "DELETE",
			}
		)
			.then((response) => {
				console.log(response)
				traerTareas()
			})

			.catch(error => {
				console.log('Looks like there was a problem: \n', error);
			});
	}
	return (
		<div className="contenedor d-flex justify-content-center align-items-center">
			<h1>Todolist </h1>
			<div className="paper border text-center">
				<input type="text" placeholder="agrega una tarea" onChange={(e) => setTarea(e.target.value)} value={tarea} onKeyDown={agregar} />
				<ul className="list-unstyled">
					{lista.map((item, index) => (
						<li key={item.id}>{item.label}<span className="borrador" onClick={() => eliminarTarea(item.id)}> ❌ </span> <hr /> </li>
					))}
				</ul>
				<p className="d-flex justify-content-start">{lista.length} item left</p>
			</div >
		</div>
	)

}
export default Home;