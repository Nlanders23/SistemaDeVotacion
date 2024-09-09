// creamos la clase pregunta para la creación de una pregunta, alternativas y respuesta correcta
class Pregunta {
    constructor(enunciado, alternativas, respuestaCorrecta) {
      this.enunciado = enunciado;
      this.alternativas = alternativas;
      this.respuestaCorrecta = respuestaCorrecta;
    }
  }
  
  //creamos una clase para las respuestas ingresadas por el usuario
  class Respuesta {
    constructor(pregunta, respuestaUsuario) {
      this.pregunta = pregunta;
      this.respuestaUsuario = respuestaUsuario;
    }
  
    esCorrecta() {
      return this.respuestaUsuario === this.pregunta.respuestaCorrecta;
    }
  }
  
  //creamos una clase para validar que la respuesta correcta e ingresada por el usuario sean numéricas y estén dentro del rango del arreglo
  class ValidadorEntrada {
    static obtenerNumeroValido(mensaje, min, max) {
      let entrada;
      do {
        entrada = parseInt(prompt(mensaje));
        if (isNaN(entrada) || entrada < min || entrada > max) {
          console.log(`Por favor, ingresa un número válido entre ${min} y ${max}.`);
        }
      } while (isNaN(entrada) || entrada < min || entrada > max);
      return entrada;
    }
  
    static obtenerTexto(mensaje) {
      return prompt(mensaje);
    }
  }
  
  // creamos una clase para ordenar nuestro cuestionario por medio de arreglos
  class Cuestionario {
    constructor() {
      this.preguntas = [];
      this.respuestas = [];
    }
  
    crearPreguntas(numeroPreguntas, numeroAlternativas) {
      for (let i = 1; i <= numeroPreguntas; i++) {
        const enunciado = ValidadorEntrada.obtenerTexto(`CREA UNA NUEVA PREGUNTA ${i}`);
        const alternativas = [];
        for (let j = 1; j <= numeroAlternativas; j++) {
          alternativas.push(ValidadorEntrada.obtenerTexto(`ALTERNATIVA ${j} PARA LA PREGUNTA ${i}`));
        }
        const respuestaCorrecta = ValidadorEntrada.obtenerNumeroValido(
          `¿Cuál es la respuesta correcta para la pregunta ${i}? (Introduce el número)`,
          1,
          numeroAlternativas
        );
        this.preguntas.push(new Pregunta(enunciado, alternativas, respuestaCorrecta));
      }
    }
  
    realizarCuestionario() {
      this.preguntas.forEach((pregunta, index) => {
        console.log(`Pregunta ${index + 1}: ${pregunta.enunciado}`);
        pregunta.alternativas.forEach((alternativa, altIndex) => {
          console.log(`  ${altIndex + 1}. ${alternativa}`);
        });
  
        const respuestaUsuario = ValidadorEntrada.obtenerNumeroValido(
          `Respuesta para la pregunta ${index + 1}:`,
          1,
          pregunta.alternativas.length
        );
        this.respuestas.push(new Respuesta(pregunta, respuestaUsuario));
  
        console.log(this.respuestas[index].esCorrecta() ? "¡Correcto!" : "Incorrecto.");
      });
    }
  
    mostrarResultados() {
      console.log("Resultados del cuestionario:");
      this.respuestas.forEach((respuesta, index) => {
        console.log(`Pregunta ${index + 1}:`);
        console.log(`Pregunta: ${respuesta.pregunta.enunciado}`);
        console.log(`Respuesta correcta: ${respuesta.pregunta.alternativas[respuesta.pregunta.respuestaCorrecta - 1]}`);
        console.log(`Tu respuesta: ${respuesta.pregunta.alternativas[respuesta.respuestaUsuario - 1]}`);
        console.log(`¿Correcto? ${respuesta.esCorrecta() ? 'Sí' : 'No'}`);
      });
  
      const puntuacion = this.respuestas.filter(r => r.esCorrecta()).length;
      console.log(`Tu puntuación final es: ${puntuacion}/${this.preguntas.length}`);
    }
  }
  
  // Uso del sistema de cuestionario
  const cuestionario = new Cuestionario();
  const NUMERO_PREGUNTAS = ValidadorEntrada.obtenerNumeroValido("¿Cuántas preguntas deseas crear?", 1, 100);
  const NUMERO_ALTERNATIVAS = 4;
  
  cuestionario.crearPreguntas(NUMERO_PREGUNTAS, NUMERO_ALTERNATIVAS);
  cuestionario.realizarCuestionario();
  cuestionario.mostrarResultados();