import BaseShape from './baseShape';

export default class Triangle extends BaseShape {
    points = [
        {x: 50, y: 0},
        {x: this.width, y: 100},
        {x: 0, y: this.height}
    ];
}
