import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
var DragOnlyDirective = (function () {
    /**
     * constructs the DraggableDirective. Injects the
     * elementRef and the Renderer Object to be more
     * platform agnostic
     *
     * @param {ElementRef} elementRef
     * @param {Renderer} renderer
     */
    function DragOnlyDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    /**
     * initializes component's variables with default values
     * and sets sessionKey based on passed values to dragOnly
     * input. Also creates main event listener for drag only
     * component and sets the first state of element passed.
     */
    DragOnlyDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.handlersToDestroy = [];
        this.sessionStorageKey = 'dragOnlyElementPosition' + this.dragOnly;
        this.elementPosition = this.calculateInitialPosition();
        this.renderer.listen(this.elementRef.nativeElement, 'mousedown', function (ev) { return _this.init(ev); });
        this.update();
    };
    /**
     * initializes event handlers for mouseMove and
     * mouseUp events on document object and also sets the
     * mousePosition of the mouseDown event, so then
     * we can calculate the movement vector which is used
     * to move the element. We use vectors because you don't
     * always click on the center of the document so we
     * cannot set the position from the mouse coordinates.
     *
     * @param {MouseEvent} event
     */
    DragOnlyDirective.prototype.init = function (event) {
        var _this = this;
        this.mousePosition = new EventPosition(event.clientX, event.clientY);
        this.handlersToDestroy = [
            this.renderer.listen('document', 'mousemove', function (ev) { return _this.calculate(ev); }),
            this.renderer.listen('document', 'mouseup', function (ev) { return _this.removeHandlers(); }),
            this.renderer.listen('document', 'contextmenu', function (ev) { return _this.removeHandlers(); })
        ];
    };
    /**
     * calculates the position difference vector, sets new
     * mousePosition and calculates the new position
     * of the element.
     *
     * @param {MouseEvent} event
     */
    DragOnlyDirective.prototype.calculate = function (event) {
        var moveVector = this.mousePosition.diff(new EventPosition(event.clientX, event.clientY));
        this.mousePosition = this.mousePosition.add(moveVector);
        this.elementPosition = this.elementPosition.add(moveVector);
        this.update();
    };
    /**
     * removes event handlers created on mouseDown init
     * event handler. Also stores the current position
     * in sessionStorage, so it's restored after page
     * refreshes.
     */
    DragOnlyDirective.prototype.removeHandlers = function () {
        for (var _i = 0, _a = this.handlersToDestroy; _i < _a.length; _i++) {
            var handler = _a[_i];
            if (typeof handler === 'function')
                handler();
        }
        this.store();
    };
    /**
     * stores the position of the element in sessionStorage
     */
    DragOnlyDirective.prototype.store = function () {
        try {
            sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(this.elementPosition));
        }
        catch (e) {
            console.log("\n            Your browser does not support sessionStorage and will \n            not store the position of the element after it's closed.\n            Error message: " + e.message);
        }
    };
    /**
     * reads the position of the element from sessionStorage
     *
     * @returns {EventPosition}
     */
    DragOnlyDirective.prototype.read = function () {
        try {
            var data = sessionStorage.getItem(this.sessionStorageKey);
            if (!data)
                return false;
            var parsedData = JSON.parse(data);
            return new EventPosition(parsedData.x, parsedData.y);
        }
        catch (e) {
            console.log("\n            Your browser does not support sessionStorage and will \n            not store the position of the element after it's closed.\n            Error message: " + e.message);
        }
        return false;
    };
    /**
     * updates element's top and left positions in pixels
     * based on the current position set by handlers.
     */
    DragOnlyDirective.prototype.update = function () {
        this.renderer.setStyle(this.elementRef.nativeElement, 'top', this.elementPosition.y + 'px');
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', this.elementPosition.x + 'px');
    };
    /**
     * returns very initial position of the element based
     * on saved value in sessionStorage. If nothing is
     * saved, position of the screen's center is returned.
     *
     * @returns {EventPosition}
     */
    DragOnlyDirective.prototype.calculateInitialPosition = function () {
        var positionBefore = this.read();
        if (positionBefore instanceof EventPosition)
            return positionBefore;
        return new EventPosition((window.innerWidth / 2), window.innerHeight / 2);
    };
    DragOnlyDirective.decorators = [
        { type: Directive, args: [{ selector: '[dragOnly]' },] },
    ];
    /** @nocollapse */
    DragOnlyDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    DragOnlyDirective.propDecorators = {
        'dragOnly': [{ type: Input },],
    };
    return DragOnlyDirective;
}());
export { DragOnlyDirective };
/**
 * helper class for working with positions
 */
var EventPosition = (function () {
    /**
     * constructs EventPosition object based
     * on x and y coordinates.
     *
     * @param {number} x
     * @param {number} y
     */
    function EventPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * calculates difference between current
     * EventPosition and passed EventPosition.
     * Returns new EventPosition with calculated
     * difference as coordinates.
     *
     * @param {EventPosition} ev
     * @returns {EventPosition}
     */
    EventPosition.prototype.diff = function (ev) {
        return new EventPosition(-this.x + ev.x, -this.y + ev.y);
    };
    /**
     * adds passed EventPosition's coordinates to
     * current EventPosition's coordinates and
     * returns new EventPosition with calculated
     * values as coordinates.
     *
     * @param {EventPosition} ev
     * @returns {EventPosition}
     */
    EventPosition.prototype.add = function (ev) {
        return new EventPosition(this.x + ev.x, this.y + ev.y);
    };
    return EventPosition;
}());
export { EventPosition };
//# sourceMappingURL=dragonly.directive.js.map