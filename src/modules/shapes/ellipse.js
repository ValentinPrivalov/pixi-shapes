import BaseShape from './baseShape';

export default class Ellipse extends BaseShape {
    draw(graphics) {
        graphics.drawEllipse(this.width / 2, 0, this.width / 2, this.height / 3);
    }

    calcArea() {
        const r = this.height / 3;
        const R = this.width / 2;
        this.totalPixels = Math.PI * R * r;
    }
}
