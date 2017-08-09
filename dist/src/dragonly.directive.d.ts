import { ElementRef, OnInit, Renderer2 } from '@angular/core';
export declare class DragOnlyDirective implements OnInit {
    private elementRef;
    private renderer;
    /**
     * current element's position
     *
     * @type {EventPosition}
     */
    private elementPosition;
    /**
     * current mouse position
     *
     * @type {EventPosition}
     */
    private mousePosition;
    /**
     * array of functions - event listeners - for updating
     * positions and destroying other global event handlers
     *
     * @type {Array<Function>}
     */
    private handlersToDestroy;
    /**
     * sessionStorage key for element's position saving
     *
     * @type {string}
     */
    private sessionStorageKey;
    /**
     * dragOnly identifier - useful when there are more
     * elements which use this component
     *
     * @type {string|number}
     */
    dragOnly: string | number;
    /**
     * constructs the DraggableDirective. Injects the
     * elementRef and the Renderer Object to be more
     * platform agnostic
     *
     * @param {ElementRef} elementRef
     * @param {Renderer} renderer
     */
    constructor(elementRef: ElementRef, renderer: Renderer2);
    /**
     * initializes component's variables with default values
     * and sets sessionKey based on passed values to dragOnly
     * input. Also creates main event listener for drag only
     * component and sets the first state of element passed.
     */
    ngOnInit(): void;
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
    init(event: MouseEvent): void;
    /**
     * calculates the position difference vector, sets new
     * mousePosition and calculates the new position
     * of the element.
     *
     * @param {MouseEvent} event
     */
    calculate(event: MouseEvent): void;
    /**
     * removes event handlers created on mouseDown init
     * event handler. Also stores the current position
     * in sessionStorage, so it's restored after page
     * refreshes.
     */
    removeHandlers(): void;
    /**
     * stores the position of the element in sessionStorage
     */
    store(): void;
    /**
     * reads the position of the element from sessionStorage
     *
     * @returns {EventPosition}
     */
    read(): EventPosition | boolean;
    /**
     * updates element's top and left positions in pixels
     * based on the current position set by handlers.
     */
    update(): void;
    /**
     * returns very initial position of the element based
     * on saved value in sessionStorage. If nothing is
     * saved, position of the screen's center is returned.
     *
     * @returns {EventPosition}
     */
    calculateInitialPosition(): EventPosition;
}
/**
 * helper class for working with positions
 */
export declare class EventPosition {
    x: number;
    y: number;
    /**
     * constructs EventPosition object based
     * on x and y coordinates.
     *
     * @param {number} x
     * @param {number} y
     */
    constructor(x: number, y: number);
    /**
     * calculates difference between current
     * EventPosition and passed EventPosition.
     * Returns new EventPosition with calculated
     * difference as coordinates.
     *
     * @param {EventPosition} ev
     * @returns {EventPosition}
     */
    diff(ev: EventPosition): EventPosition;
    /**
     * adds passed EventPosition's coordinates to
     * current EventPosition's coordinates and
     * returns new EventPosition with calculated
     * values as coordinates.
     *
     * @param {EventPosition} ev
     * @returns {EventPosition}
     */
    add(ev: EventPosition): EventPosition;
}
