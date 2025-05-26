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

/**
 * Representa un eje de coordenadas con un rango mínimo y máximo, y una etiqueta.
 */
export class Axis {
    private min: number;
    private max: number;
    private label: string;

    /**
     * Crea una nueva instancia de Axis.
     * @param min - Valor mínimo del eje.
     * @param max - Valor máximo del eje.
     * @param label - Etiqueta del eje.
     */
    constructor(min: number, max: number, label: string) {
        this.min = min;
        this.max = max;
        this.label = label;
    }

    /**
     * Dibuja el eje en el contexto de un canvas.
     * @param ctx - Contexto 2D del canvas.
     * @param x1 - Coordenada X inicial.
     * @param y1 - Coordenada Y inicial.
     * @param x2 - Coordenada X final.
     * @param y2 - Coordenada Y final.
     */
    draw(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}