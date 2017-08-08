# Angular's Drag-only directive
This is the latest Angular's package used for dynamically dragging the 
components/elements in your web-based application.

### Installation

Installing using npm:

```
npm install --save-dev ng-dragonly
```

... or download `dragonly.directive.ts` from `src/` directory and put it into your project's `app/` directory.

### Usage
- Include `DragOnlyDirective` in your app.module.ts
```typescript
import { DragOnlyDirective } from "ng-dragonly"
...
NgModule({
declarations: [
    ...
    DragOnlyDirective
]
})
...
```

- Add directive to the element you want 
```html
<div ... dragOnly></div>
```

- If you have more than one element that you want to be movable 
you need to also specify the id for each element. To do it just 
pass the id using same directive, like so:
```html
<div ... dragOnly="id_of_movable_element"></div>
```


### CHANGELOG:
#### v1.0.1
1. Added Usage section to README file
#### v1.0.0
1. Ability to drag the elements on your website
2. Automatically saving the window's position in sessionStorage
3. Ability to have more than one dragging windows in one app


Please if you have any suggestions or bug fixes, please, 
feel free to open an new issue on [GitHub](https://github.com/Flyrell/ng-dragonly).

------

Dawid Zbiński using MIT licence.
