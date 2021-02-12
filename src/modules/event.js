export default class Event {
    constructor() {
        this.subscriptions = [];
    }

    subscribe(listener) {
        if (!listener) {
            return;
        }
        this.subscriptions.push(listener);
    }

    emit(data) {
        this.subscriptions.forEach(listener => listener(data));
    }
}
