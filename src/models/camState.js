export default function CamState(args) {
    const {
        cam
    } = args;

    this.key = cam.guid;

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    this.reset = function() {
        this.selected = false;
        this.checked = false;
    }

    this.reset()
}