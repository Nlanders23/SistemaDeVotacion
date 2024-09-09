const crearCuestionario = (pregunta, alternativas, respuestaCorrecta) => ({
    pregunta,
    alternativas,
    respuestaCorrecta
  });
  
  const obtenerRespuestaValida = (pregunta, alternativas) => {
    const respuestaUsuario = parseInt(prompt(pregunta));
    return (isNaN(respuestaUsuario) || respuestaUsuario < 1 || respuestaUsuario > alternativas.length)
      ? (console.log("Por favor, ingresa un número válido dentro del rango de alternativas."),
         obtenerRespuestaValida(pregunta, alternativas))
      : respuestaUsuario;
  };
  
  const crearPregunta = (numeroPregunta, numeroAlternativas) => {
    const pregunta = prompt(`CREA UNA NUEVA PREGUNTA ${numeroPregunta}`);
    const alternativas = Array.from(
      { length: numeroAlternativas },
      (_, i) => prompt(`ALTERNATIVA ${i + 1} PARA LA PREGUNTA ${numeroPregunta}`)
    );
    const respuestaCorrecta = obtenerRespuestaValida(
      `¿Cuál es la respuesta correcta para la pregunta ${numeroPregunta}? (Introduce el número)`,
      alternativas
    );
    return crearCuestionario(pregunta, alternativas, respuestaCorrecta);
  };
  
  const crearCuestionarios = (numeroPreguntas, numeroAlternativas) =>
    Array.from({ length: numeroPreguntas }, (_, i) => crearPregunta(i + 1, numeroAlternativas));
  
  const realizarCuestionario = (cuestionario, index) => {
    console.log(`Pregunta ${index + 1}: ${cuestionario.pregunta}`);
    cuestionario.alternativas.forEach((alternativa, altIndex) => {
      console.log(`  ${altIndex + 1}. ${alternativa}`);
    });
  
    const respuestaUsuario = obtenerRespuestaValida(
      `Respuesta para la pregunta ${index + 1}:`,
      cuestionario.alternativas
    );
    const esCorrecta = respuestaUsuario === cuestionario.respuestaCorrecta;
  
    console.log(esCorrecta ? "¡Correcto!" : "Incorrecto.");
  
    return {
      pregunta: cuestionario.pregunta,
      respuestaCorrecta: cuestionario.alternativas[cuestionario.respuestaCorrecta - 1],
      respuestaUsuario: cuestionario.alternativas[respuestaUsuario - 1],
      esCorrecta
    };
  };
  
  const mostrarResultado = (resultado, index) => {
    console.log(`Pregunta ${index + 1}:`);
    console.log(`Pregunta: ${resultado.pregunta}`);
    console.log(`Respuesta correcta: ${resultado.respuestaCorrecta}`);
    console.log(`Tu respuesta: ${resultado.respuestaUsuario}`);
    console.log(`¿Correcto? ${resultado.esCorrecta ? 'Sí' : 'No'}`);
  };
  
  const calcularPuntuacion = resultados =>
    resultados.filter(r => r.esCorrecta).length;
  
  // Ejecución principal
  const NUMERO_PREGUNTAS = parseInt(prompt("¿Cuántas preguntas deseas crear?"));
  const NUMERO_ALTERNATIVAS = 4;
  
  const cuestionarios = crearCuestionarios(NUMERO_PREGUNTAS, NUMERO_ALTERNATIVAS);
  const resultados = cuestionarios.map(realizarCuestionario);
  
  console.log("Resultados del cuestionario:");
  resultados.forEach(mostrarResultado);
  
  const puntuacion = calcularPuntuacion(resultados);
  console.log(`Tu puntuación final es: ${puntuacion}/${cuestionarios.length}`);