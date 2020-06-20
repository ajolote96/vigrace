import React from 'react';
import $ from 'jquery';

import './interprete.css'

const Interprete = () => {
    const hideInterpreter = () =>{
        $("#interSteps").hide()
    }

    return(
        <div id="interSteps" className="inter-container" hidden={true}>
            <button onClick={() => hideInterpreter()} className="close"></button>
            <h1>Instrucciones para descargar el convertidor</h1>
            <ul>
                <li>
                    <h5>Descargar intérprete de Python</h5>
                    <p>Python es un lenguaje de programación interpretado, esto significa que necesita un programa llamado intérprete que le permite funcionar. 
                        <br/>Es necesario descargarlo e instalarlo para que el script funcione correctamente.
                        <br/>Puede descargarlo desde el <a rel="noopener noreferrer" href="https://www.python.org/downloads/" target="_blank">siguiente enlace</a>
                    </p>
                </li>
                <li>
                    <h5>Descargar el script</h5>
                    <p>Una vez que tenga el intérprete instalado solo descargue el script dando clic aquí. <br/>Siga los pasos que se le indiquen en el script</p>
                </li>
            </ul>
        </div>
    )
}

export default Interprete;