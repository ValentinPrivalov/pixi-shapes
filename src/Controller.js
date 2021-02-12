import Model from './Model';
import View from './View';

// import './components/View/styles.less';

export default class Controller {
    constructor() {
        this.Model = new Model();
        this.View = new View();
    }

    /**
     * Init Controller, bind handlers and subscribe events
     */
    init() {
        this.View.init(this.Model.getData());
        this.View.updateGravity = this.Model.updateGravity.bind(this);
        this.View.updateShapesNumber = this.Model.updateShapesNumber.bind(this);
        this.View.onClickShape = this.onClickShape.bind(this);
        this.View.onClickScene = this.onClickScene.bind(this);

        this.Model.onGravityChange.subscribe(this.View.onGravityChange.bind(this));
        this.Model.onShapesPerSecChange.subscribe(this.View.onShapesPerSecChange.bind(this));
        this.Model.onShapesCountChange.subscribe(this.View.onShapesCountChange.bind(this));
        this.Model.updateGravity();
        this.Model.updateShapesNumber();

        this.requestNewShape();
    }

    /**
     * Handler for generating new shape on mouse coordinates
     */
    onClickScene(data) {
        const {x, y} = data.global; // get click coordinates
        const shape = this.Model.createNewShape();
        shape.x = x - shape.width / 2; // set pos to coordinates
        shape.y = y - shape.height / 2;
        this.View.renderShape(shape);
        this.View.fallDownShape(shape, this.Model.getData());
    }

    onClickShape(shape, repaint) {
        this.Model.removeShape(shape);
        this.View.destroyShape(shape);
        if (repaint) {
            const shapes = this.Model.changeShapesColor();
            this.View.repaintAllShapes(shapes);
        }
    }

    /**
     * Calc time diff and add new shape
     */
    requestNewShape = (timerStart = Date.now()) => {
        const timeSpent = Date.now() - timerStart;
        const data = this.Model.getData();

        if (timeSpent > 1000 / data.shapesPerSec) {
            const shape = this.Model.createNewShape();
            this.View.renderShape(shape);
            this.View.fallDownShape(shape, data);
            timerStart = Date.now();
        }
        requestAnimationFrame(this.requestNewShape.bind(this, timerStart));
    };
}
