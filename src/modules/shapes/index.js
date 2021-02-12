import BaseShape from './baseShape';
import Triangle from './triangle';
import Square from './square';
import Pentagon from './pentagon';
import Hexagon from './hexagon';
import Circle from './circle';
import Ellipse from './ellipse';

/**
 * Create and draw new graphics element
 */
export default function Shape(type) {
    let shape = new BaseShape();

    switch (type) {
        case '3 sides':
            shape = new Triangle();
            break;
        case '4 sides':
            shape = new Square();
            break;
        case '5 sides':
            shape = new Pentagon();
            break;
        case '6 sides':
            shape = new Hexagon();
            break;
        case 'circle':
            shape = new Circle();
            break;
        case 'ellipse':
            shape = new Ellipse();
            break;
    }

    return shape;
}
