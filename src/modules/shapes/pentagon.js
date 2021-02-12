import BaseShape from './baseShape';

export default class Pentagon extends BaseShape {
    points = [
        {x: 60, y: 0},
        {x: 100, y: 50},
        {x: 70, y: this.height},
        {x: 0, y: 100},
        {x: 0, y: 20}
    ];
}
