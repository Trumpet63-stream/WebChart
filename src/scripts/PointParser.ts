import {Parser} from "./Parser";
import {Point2D} from "./Point2D";
import {ParsingError} from "./errors/ParsingError";

export class PointParser {
    private parser: Parser;

    constructor(parser: Parser) {
        this.parser = parser;
    }

    public parse(string: string): Point2D[] {
        let values: string[][] = this.parser.parse(string);
        this.validateValues(values);
        return PointParser.getPoints(values);
    }

    private validateValues(values: string[][]): void {
        for (let i = 0; i < values.length; i++) {
            let row = values[i];
            if (!this.is2d(row)) {
                throw new ParsingError("encountered a row that did not have exactly 2 dimensions (row " + i + ")");
            }
            if (!PointParser.hasNumbers(row)) {
                throw new ParsingError("could not parse numbers from row " + i);
            }
        }
    }

    is2d(row: string[]): boolean {
        return row.length === 2;
    }

    private static hasNumbers(row: string[]): boolean {
        return !isNaN(parseFloat(row[0])) && !isNaN(parseFloat(row[1]));
    }

    private static getPoints(values: string[][]): Point2D[] {
        let points: Point2D[] = [];
        for (let i = 0; i < values.length; i++) {
            let row = values[i];
            let x = parseFloat(row[0]);
            let y = parseFloat(row[1]);
            points.push(new Point2D(x, y));
        }
        return points;
    }

}