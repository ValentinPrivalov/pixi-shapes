import * as PIXI from 'pixi.js';
import texts from './modules/texts.json';

window.PIXI = PIXI;

export default class View {
    constructor() {
        this.mainStage = null;
        this.updateShapesNumber = null; // handler for change Model.shapesPerSec
        this.updateGravity = null; // handler for change Model.gravityValue
        this.onClickScene = null;
        this.onClickShape = null;
    }

    init(data) {
        this.createPixiApplication(data);

        document.getElementById('shapes-decrement-btn').addEventListener('click', () => this.updateShapesNumber(-1));
        document.getElementById('shapes-increment-btn').addEventListener('click', () => this.updateShapesNumber(1));
        document.getElementById('gravity-decrement-btn').addEventListener('click', () => this.updateGravity(-1));
        document.getElementById('gravity-increment-btn').addEventListener('click', () => this.updateGravity(1));
        this.onGravityChange(data);
        this.onShapesPerSecChange(data);
        this.onShapesCountChange(data);
    }

    onGravityChange({gravityValue}) {
        document.getElementById('value-gravity').innerHTML = texts.gravityValue + gravityValue;
    }

    onShapesPerSecChange({shapesPerSec}) {
        document.getElementById('value-shapes').innerHTML = texts.shapesPerSec + shapesPerSec;
    }

    onShapesCountChange({shapes}) {
        let totalPixels = 0;
        for (let id in shapes) {
            totalPixels += shapes[id].totalPixels;
        }

        document.getElementById('shapes-count').innerHTML = texts.shapesCount + Object.keys(shapes).length;
        document.getElementById('total-pixels').innerHTML = texts.totalPixels + totalPixels.toFixed(0);
    }

    /**
     * Create PIXI.Application and other elements
     */
    createPixiApplication = data => {
        this.PIXIApp = new PIXI.Application({
            width: data.sceneWidth, height: data.sceneHeight,
            view: document.getElementById('stage'),
            transparent: true
        });

        this.createMainStage();
        this.createBackground(data);
    };

    /**
     * Create new PIXI.Container for shapes
     */
    createMainStage() {
        const mainStage = new PIXI.Container();
        mainStage.name = 'mainStage';

        this.mainStage = mainStage;
        this.PIXIApp.stage.addChild(mainStage);
        return mainStage;
    }

    /**
     * Create background PIXI.Graphics on all area
     */
    createBackground({sceneWidth, sceneHeight}) {
        const bg = new PIXI.Graphics();
        bg.name = 'background';
        bg.beginFill(0x000000);
        bg.drawRect(0, 0, sceneWidth, sceneHeight);
        bg.endFill();
        bg.alpha = 0;
        bg.interactive = true;
        bg.buttonMode = true;
        bg.on('pointerdown', ({data}) => this.onClickScene(data));
        this.mainStage.addChild(bg);
    }

    /**
     * Create new PIXI.Graphics object
     */
    renderShape(shape) {
        shape.graphics = new PIXI.Graphics();
        shape.graphics.beginFill(shape.color);
        shape.draw(shape.graphics);
        shape.graphics.endFill();
        shape.graphics.name = `${shape.type}_${shape.id}`;
        shape.setPos(shape.x, shape.y);

        // add onclick event
        shape.graphics.interactive = true;
        shape.graphics.buttonMode = true;
        shape.graphics.on('pointerdown', () => this.onClickShape(shape, true));

        this.mainStage.addChild(shape.graphics);
    }

    /**
     * Add animation to PIXI ticker
     */
    fallDownShape(shape, data) {
        shape.fallDown = () => {
            shape.graphics.position.y += data.gravityValue;

            // shape already is outside the bottom of the scene
            shape.graphics.position.y > data.sceneHeight + shape.graphics.height &&
            this.onClickShape(shape);
        };
        this.PIXIApp.ticker.add(shape.fallDown);
    }

    destroyShape(shape) {
        shape.graphics.destroy();
        this.PIXIApp.ticker.remove(shape.fallDown);
        this.mainStage.removeChild(shape.graphics);
    }

    /**
     * Change shapes tint
     */
    repaintAllShapes(shapes) {
        Object.keys(shapes).forEach(id =>
            shapes[id].graphics.tint = shapes[id].color);
    }
}
