import BaseShape from './baseShape';

export default class Circle extends BaseShape {
    draw(graphics) {
        graphics.drawCircle(this.width / 2, 0, this.height / 2);
    }

    calcArea() {
        const r = this.height / 2;
        this.totalPixels = Math.PI * r * r;
    }
}
