import makeId from '../makeId';

export default class BaseShape {
    constructor() {
        this.id = makeId(6);
        this.graphics = null;
        this.x = 0;
        this.y = 0;
        this.width = 120;
        this.height = 120;
        this.type = 'base';
        this.color = null;
        this.points = [];
        this.fallDown = null; // animate tick
    }

    init({type, color}, data) {
        this.x = Math.floor(Math.random() * (data.sceneWidth - this.width));
        this.y = -this.height;
        this.type = type;
        this.color = color;
    }

    setPos(x, y) {
        this.graphics.position.set(x, y);
    }

    draw(graphics) {
        graphics.drawPolygon(this.convertPointsToPolygon(this.points));
    }

    calcArea() {
        let area = 0;

        for (let i = 0; i < this.points.length; i++) {
            const x1 = this.points[i].x;
            const y1 = this.points[i].y;
            const x2 = this.points[(i + 1) % this.points.length].x;
            const y2 = this.points[(i + 1) % this.points.length].y;
            area += x1 * y2;
            area -= x2 * y1;
        }
        this.totalPixels = area / 2;
    }

    convertPointsToPolygon(points) {
        const polygon = [];
        points.forEach(({x, y}) => polygon.push(x, y));
        return polygon;
    }
}
