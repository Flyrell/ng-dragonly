import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({selector: '[dragOnly]'})
export class DragOnlyDirective implements OnInit {

    /**
     * current element's position
     *
     * @type {EventPosition}
     */
    private elementPosition: EventPosition;

    /**
     * current mouse position
     *
     * @type {EventPosition}
     */
    private mousePosition: EventPosition;

    /**
     * array of functions - event listeners - for updating
     * positions and destroying other global event handlers
     *
     * @type {Array<Function>}
     */
    private handlersToDestroy: Array<Function>;

    /**
     * sessionStorage key for element's position saving
     *
     * @type {string}
     */
    private sessionStorageKey: string;

    /**
     * dragOnly identifier - useful when there are more
     * elements which use this component
     *
     * @type {string|number}
     */
    @Input() dragOnly: string|number;

    /**
     * constructs the DraggableDirective. Injects the
     * elementRef and the Renderer Object to be more
     * platform agnostic
     *
     * @param {ElementRef} elementRef
     * @param {Renderer} renderer
     */
    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    /**
     * initializes component's variables with default values
     * and sets sessionKey based on passed values to dragOnly
     * input. Also creates main event listener for drag only
     * component and sets the first state of element passed.
     */
    ngOnInit(): void {
        this.handlersToDestroy    = [];
        this.sessionStorageKey    = 'dragOnlyElementPosition' + this.dragOnly;
        this.elementPosition      = this.calculateInitialPosition();
        this.renderer.listen(this.elementRef.nativeElement, 'mousedown', (ev) => this.init(ev));
        this.update();
    }

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
    init(event: MouseEvent): void {
        this.mousePosition = new EventPosition(event.clientX, event.clientY);
        this.handlersToDestroy    = [
            this.renderer.listen('document', 'mousemove', (ev: MouseEvent) => this.calculate(ev)),
            this.renderer.listen('document', 'mouseup', (ev: MouseEvent) => this.removeHandlers()),
            this.renderer.listen('document', 'contextmenu', (ev: MouseEvent) => this.removeHandlers())
        ];
    }

    /**
     * calculates the position difference vector, sets new
     * mousePosition and calculates the new position
     * of the element.
     *
     * @param {MouseEvent} event
     */
    calculate(event: MouseEvent): void {
        const moveVector           = this.mousePosition.diff(new EventPosition(event.clientX, event.clientY));
        this.mousePosition         = this.mousePosition.add(moveVector);
        this.elementPosition       = this.elementPosition.add(moveVector);
        this.update();
    }

    /**
     * removes event handlers created on mouseDown init
     * event handler. Also stores the current position
     * in sessionStorage, so it's restored after page
     * refreshes.
     */
    removeHandlers(): void {
        for (const handler of this.handlersToDestroy) {
            if (typeof handler === 'function') handler();
        }
        this.store();
    }

    /**
     * stores the position of the element in sessionStorage
     */
    store(): void {
        try {
            sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(this.elementPosition));
        } catch (e) {
            console.log(`
            Your browser does not support sessionStorage and will 
            not store the position of the element after it's closed.
            Error message: ` + e.message);
        }
    }

    /**
     * reads the position of the element from sessionStorage
     *
     * @returns {EventPosition}
     */
    read(): EventPosition|boolean {
        try {
            const data = sessionStorage.getItem(this.sessionStorageKey);
            if (!data) return false;
            const parsedData = JSON.parse(data) as EventPosition;
            return new EventPosition(parsedData.x, parsedData.y);
        } catch (e) {
            console.log(`
            Your browser does not support sessionStorage and will 
            not store the position of the element after it's closed.
            Error message: ` + e.message);
        }
        return false;
    }

    /**
     * updates element's top and left positions in pixels
     * based on the current position set by handlers.
     */
    update(): void {
        this.renderer.setStyle(this.elementRef.nativeElement, 'top', this.elementPosition.y + 'px');
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', this.elementPosition.x + 'px');
    }

    /**
     * returns very initial position of the element based
     * on saved value in sessionStorage. If nothing is
     * saved, position of the screen's center is returned.
     *
     * @returns {EventPosition}
     */
    calculateInitialPosition(): EventPosition {
        const positionBefore = this.read();
        if (positionBefore instanceof EventPosition) return positionBefore;
        return new EventPosition((window.innerWidth / 2), window.innerHeight / 2);
    }

}

/**
 * helper class for working with positions
 */
export class EventPosition {

    /**
     * constructs EventPosition object based
     * on x and y coordinates.
     *
     * @param {number} x
     * @param {number} y
     */
    constructor(public x: number, public y: number) {}

    /**
     * calculates difference between current
     * EventPosition and passed EventPosition.
     * Returns new EventPosition with calculated
     * difference as coordinates.
     *
     * @param {EventPosition} ev
     * @returns {EventPosition}
     */
    public diff(ev: EventPosition): EventPosition {
        return new EventPosition(-this.x + ev.x, -this.y + ev.y);
    }

    /**
     * adds passed EventPosition's coordinates to
     * current EventPosition's coordinates and
     * returns new EventPosition with calculated
     * values as coordinates.
     *
     * @param {EventPosition} ev
     * @returns {EventPosition}
     */
    public add(ev: EventPosition): EventPosition {
        return new EventPosition(this.x + ev.x, this.y + ev.y);
    }

}