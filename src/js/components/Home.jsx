import React, { useState, useEffect } from 'react';
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	let [tarea, setTarea] = useState("")
	let [lista, setLista] = useState([])



	const traerTareas = () => {
		 fetch ("https://playground.4geeks.com/todo/users/william")
    .then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
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
  	},[]);
	const escribirTarea = (event) => {
		setTarea(event.target.value)
	}
	const agregar = (event) => {
		if (event.key === "Enter") {
			
		}
	}
	const eliminarTarea = (posicion) => {
		setLista(lista.filter((item, index) => index !== posicion))
	}
	return (
		<div className="contenedor d-flex justify-content-center align-items-center">
			<h1>Todolist </h1>
			<div className="paper border text-center">
				<input type="text" placeholder="agrega una tarea" onChange={escribirTarea} value={tarea} onKeyDown={agregar} />
				<ul className="list-unstyled">
					{lista.map((item, index) => (
						<li key={index}>{item.label}<span className="borrador" onClick={() => eliminarTarea(index)}> ❌ </span> <hr /> </li>
					))}
				</ul>
				<p className="d-flex justify-content-start">{lista.length} item left</p>
			</div >
		</div>
	)

}
export default Home;