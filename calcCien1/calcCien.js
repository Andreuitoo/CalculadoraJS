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
}

function Display (displayValorActual, displayValorAnterior) {
    this.displayValorActual = displayValorActual;
    this.displayValorAnterior = displayValorAnterior;
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
        coseno: "cos"
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
    if (this.tipoOperacion !== undefined) {
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
}

Display.prototype.calcular = function () {
    var valorAnterior = this.parsearValorAnterior();
    var valorActual = this.parsearValorActual();

    if (isNaN(valorActual) || isNaN(valorAnterior)) return;
    this.valorActual = calculador[this.tipoOperacion](
        valorAnterior,
        valorActual
    );
    this.pushArray();
};

Display.prototype.actualizarHistorial = function () {
    var respuestaAnterior = document.getElementById("respuesta-anterior");
    respuestaAnterior.innerHTML = historial.join(", ");
}

Display.prototype.raizCuadrada = function () {
    var valorActual = parseFloat(this.valorActual);
    if (isNaN(valorActual)) return;
    this.valorActual = calculador.raizCuadrada(valorActual);
    this.pushArray();
}

Display.prototype.potencia = function () {
    var valorAnterior = parseFloat(this.valorAnterior);
    var valorActual = parseFloat(this.valorActual);
    if (isNaN(valorActual) || isNaN(valorAnterior)) return;
    this.valorActual = calculador.potencia(valorAnterior, valorActual);
    this.pushArray();
}

Display.prototype.coseno = function () {
    var valorActual = parseFloat(this.valorActual);
    if (isNaN(valorActual)) return;
    this.valorActual = Math.cos(valorActual);
    this.pushArray();
}

var displayValorAnterior = document.getElementById("valor-anterior");
var displayValorActual = document.getElementById("valor-actual");
var botonesNumeros = document.querySelectorAll('.numero');
var botonesOperadores = document.querySelectorAll('.operador');
var historial = [];

var display = new Display(displayValorActual, displayValorAnterior);

var calculador = new Calculadora();

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