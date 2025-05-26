/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author kyliam Chinea Salcedo
 * @since Mar 24, 2025
 * @description Program that reads JSON data from URL
 *
 *  If you use fetch It produces an error
 *  But when I load the page I Obtain this error:
 *    Access to fetch at  from origin  has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
 *    If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
 *
 * This 0error occurs because of the CORS (Cross-Origin Resource Sharing) policy which is implemented by the server hosting
 * the resource you are trying to access. This policy restricts cross-origin requests made by web browsers, for security reasons.
 *
 * @see {@link
* https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe}
*/

import { Axis } from "./axis.js";
import * as math from 'mathjs';

/**
 * Clase que gestiona la generación y dibujo de gráficos en un canvas HTML.
 */
export class Graphic {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private centerX: number;
    private centerY: number;
    private functions: ((x: number) => number)[] = [];

    /**
     * Crea una instancia de Graphic.
     * @param canvas - Elemento canvas donde se dibujará el gráfico.
     */
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("No se pudo obtener el contexto 2D");
        this.ctx = ctx;
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
        this.drawGraph();
        this.setupInputListener();
    }

    /**
     * Dibuja el gráfico completo en el canvas, incluyendo los ejes, las líneas discontinuas y las etiquetas.
     * Esto también establece el origen de los ejes en el centro del canvas.
     */
    drawGraph(): void {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const axisX = new Axis(-width / 2, width / 2, "X");
        const axisY = new Axis(-height / 2, height / 2, "Y");
        axisX.draw(this.ctx, 0, this.centerY, width, this.centerY);
        axisY.draw(this.ctx, this.centerX, 0, this.centerX, height);
    }

    /**
     * Agrega una función al gráfico y luego redibuja el gráfico con la nueva función.
     * @param fn - Función a agregar al gráfico, representada por una función matemática de tipo `(x: number) => number`.
     */
    drawFunction(fn: (x: number) => number): void {
        this.functions.push(fn);
        this.redraw();
    }
    
    /**
     * Redibuja el gráfico completo. Borra el contenido anterior del canvas, dibuja nuevamente los ejes,
     * las líneas discontinuas y las funciones previamente agregadas.
     */
    redraw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGraph();
        const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
        this.ctx.lineWidth = 2;
        
        this.functions.forEach(fn => {
            const randomIndex = Math.floor(Math.random() * colors.length);
            let color : string = colors[randomIndex];
            this.ctx.strokeStyle = color;
            this.ctx.beginPath();
            for (let x = -this.centerX; x < this.centerX; x += 1) {
                const y = fn(x / 25) * 25;
                const canvasX = this.centerX + x;
                const canvasY = this.centerY - y;
                if (x === -this.centerX) {
                    this.ctx.moveTo(canvasX, canvasY);
                } else {
                    this.ctx.lineTo(canvasX, canvasY);
                }
            }
            this.ctx.stroke();
        });
    }

    /**
     * Configura el listener para la entrada de funciones.
     */
    setupInputListener(): void {
        const input = document.getElementById("functionInput") as HTMLInputElement;
        input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                const fnStr = input.value;
                try {
                    const parsedFunction = math.compile(fnStr);
                    const fn = (x: number) => parsedFunction.evaluate({x});
                    this.drawFunction(fn);
                } catch (error) {
                    console.log("Invalid function input", error);
                }
                input.value = "";
            }
        });
    }
}
export function createGraphic(canvas: HTMLCanvasElement): void {
    new Graphic(canvas);
}