import Event from './modules/event';
import Shape from './modules/shapes';

export default class Model {
    constructor() {
        this.data = {
            shapes: {},
            shapesPerSec: 1,
            gravityValue: 3,
            sceneWidth: 800,
            sceneHeight: 600
        };
        this.shapeColors = [0x00FFFF, 0xFF0000, 0x00FF00, 0x0000FF, 0xe74c3c, 0x3498db, 0x9b59b6, 0x2c3e50, 0xf1c40f];
        this.shapeTypes = ['3 sides', '4 sides', '5 sides', '6 sides', 'circle', 'ellipse' /*'random (example Shape 3)'*/];

        this.onGravityChange = new Event();
        this.onShapesPerSecChange = new Event();
        this.onShapesCountChange = new Event();
    }

    /**
     * Create new Shape object
     * Set random type and color
     */
    createNewShape() {
        const type = this.getRandomValue(this.shapeTypes);
        const color = this.getRandomValue(this.shapeColors);

        const shape = new Shape(type);
        shape.init({type, color}, this.data);
        shape.calcArea();

        // save to collection
        this.data.shapes[shape.id] = shape;
        this.onShapesCountChange.emit(this.data);
        return shape;
    }

    getRandomValue(values) {
        return values[Math.floor(Math.random() * values.length)];
    }

    removeShape(shape) {
        delete this.data.shapes[shape.id];
        this.onShapesCountChange.emit(this.data);
    }

    changeShapesColor() {
        Object.keys(this.data.shapes).forEach(id =>
            this.data.shapes[id].color = this.getRandomValue(this.shapeColors));
        return this.data.shapes;
    }

    getData() {
        return this.data;
    }

    /**
     * Update gravity value
     * Set value limits in 1-10
     * @param offset
     */
    updateGravity = (offset = 0) => {
        let {gravityValue} = this.data;
        if (gravityValue + offset < 1 || gravityValue + offset > 10) {
            return;
        }

        this.data.gravityValue = gravityValue + offset;
        this.onGravityChange.emit(this.data);
    };

    /**
     * Update shapesPerSec value
     * Set value limits in 1-10
     * @param offset
     */
    updateShapesNumber = (offset = 0) => {
        let {shapesPerSec} = this.data;
        if (shapesPerSec + offset < 1 || shapesPerSec + offset > 10) {
            return;
        }

        this.data.shapesPerSec += offset;
        this.onShapesPerSecChange.emit(this.data);
    };
}
