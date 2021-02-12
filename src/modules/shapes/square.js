import BaseShape from './baseShape';

export default class Square extends BaseShape {
    draw(graphics) {
        graphics.drawRect(0, 0, this.width, this.height);
    }

    calcArea() {
        this.totalPixels = this.width * this.height;
    }
}
