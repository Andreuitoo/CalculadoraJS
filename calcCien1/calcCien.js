class Calculadora {
    
    sumar(num1, num2) {
        return num1 + num2;
    }

    restar(num1, num2) {
        return num1 - num2;
    }

    dividir(num1, num2) {
        return num1 / num2;
    }

    multiplicar(num1, num2) {
        return num1 * num2;
    }

    potencia(num1, num2) {
        return Math.pow(num1, num2);
    }

    raizCuadrada(num1) {
        return Math.sqrt(num1);
    }

    logaritmo(num1) {
        return Math.log(num1);
    }

    coseno(num1) {
        return Math.cos(num1);
    }

    seno(num1) {
        return Math.sin(num1);
    }

    tangente(num1) {
        return Math.tan(num1);
    }
}

function Display (displayValorActual, displayValorAnterior) {
    this.displayValorActual = displayValorActual;
    this.displayValorAnterior = displayValorAnterior;
    this.calculador = new Calculadora();
    this.tipoOperacion = undefined;
    this.valorActual = "";
    this.valorAnterior = "";
    this.signos = {
        sumar: "+",
        dividir: "%",
        multiplicar: "x",
        restar: "-",
        potencia: "^",
        raizCuadrada: "√",
        coseno: "cos",
        seno: "sen",
        tangente: "tan",
        logaritmo: "log",
    };
}

Display.prototype.parsearValorActual = function () {
    this.valorActual = parseFloat(this.valorActual);
    return this.valorActual;
};

Display.prototype.parsearValorAnterior = function () {
    this.valorAnterior = parseFloat(this.valorAnterior);
    return this.valorAnterior;
};

Display.prototype.borrar = function () {
    this.valorActual = this.valorActual.toString().slice(0, -1);
    this.imprimirValores();
};

Display.prototype.borrarTodo = function () {
    this.valorActual = "";
    this.valorAnterior = "";
    this.tipoOperacion = undefined;
    this.imprimirValores();
};

Display.prototype.computar = function (tipo) {
    if (this.tipoOperacion !== "igual") {
        this.calcular();
    }
    this.tipoOperacion = tipo;
    this.valorAnterior = this.valorActual || this.valorAnterior;
    this.valorActual = "";
    this.imprimirValores();
};

Display.prototype.agregarNumero= function (numero) {
    if (numero === "." && this.valorActual.includes(".")) return;
    this.valorActual = this.valorActual.toString() + numero.toString();
    this.imprimirValores();
};

Display.prototype.imprimirValores = function () {
    this.displayValorActual.textContent = this.valorActual;
    this.displayValorAnterior.textContent =
        this.valorAnterior + " " + (this.signos[this.tipoOperacion] || ""); 
};

Display.prototype.pushArray = function () {
    historial.push(this.valorActual);
    this.actualizarHistorial();
};

Display.prototype.calcular = function (valorAnterior, valorActual) {
    valorAnterior = this.parsearValorAnterior();
    valorActual = this.parsearValorActual();

    if (isNaN(valorActual) || isNaN(valorAnterior)) return;
    this.valorActual = this.calculador[this.tipoOperacion](
        valorAnterior,
        valorActual
    );
    this.pushArray();
};

Display.prototype.actualizarHistorial = function () {
    var respuestaAnterior = document.getElementById("respuesta-anterior");
    var listaHistorial = document.createElement("ul"); 
    for (var i = 0; i < historial.length; i++) {
      var itemHistorial = document.createElement("li"); 
      itemHistorial.innerText = historial[i]; 
      listaHistorial.appendChild(itemHistorial); 
    }
    respuestaAnterior.innerHTML = ""; 
    respuestaAnterior.appendChild(listaHistorial);
};


var displayValorAnterior = document.getElementById("valor-anterior");
var displayValorActual = document.getElementById("valor-actual");
var botonesNumeros = document.querySelectorAll('.numero');
var botonesOperadores = document.querySelectorAll('.operador');
var historial = [];

var display = new Display(displayValorActual, displayValorAnterior);

botonesNumeros.forEach(function (boton) {
    boton.addEventListener('click', function () {;
        display.agregarNumero(boton.innerHTML);
    });
});

botonesOperadores.forEach(function (boton) {
    boton.addEventListener('click', function () {
        display.computar(boton.value);
    });
});