import BaseShape from './baseShape';

export default class Hexagon extends BaseShape {
    points = [
        {x: 60, y: 0},
        {x: this.width, y: 30},
        {x: this.width, y: 90},
        {x: 60, y: this.height},
        {x: 0, y: 90},
        {x: 0, y: 30}
    ];
}
