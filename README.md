# Angular's Drag-only directive
This is the latest Angular's package used for dynamically dragging/moving the 
elements in your web-based application.

Live demo is available [here](http://github.com/Flyrell/ng-dragonly-demo)

### Installation

Installing using npm:

```
npm install --save-dev ng-dragonly
```

... or using git:

```
git clone https://github.com/Flyrell/ng-dragonly.git
```

### Usage
DragOnly directive only works when the movable elements can be positioned using `top` and `left` css styles.
- Include `DragOnlyModule` in your app module's imports.
```typescript
import { DragOnlyModule } from "ng-dragonly"
// ...
@NgModule({
imports: [
    // ...
    DragOnlyModule
]
})
```

- Add directive to the element you want to move
```html
<div ... dragOnly></div>
```

- In case you have more movable elements, you need to specify the `id` 
of each movable elements.This is done using the same directive.
```html
<div ... dragOnly="id_of_movable_element"></div>
```
or
```html
<div ... [dragOnly]="'id_of_movable_element'"></div>
```

`id` can be either a type of `number` or `string` and it's going to be used
for element's position storing. It's also going to be used in the future releases.


### CHANGELOG:
#### v1.3.0
- Due to many changes and fixes in the last few days I decided to release v1.3.0
which is the first stable version of the ng-dragonly. For the last few days
I managed to repair few compilation issues, made package platform agnostic, 
updated readme etc.
#### v1.2.0 - v1.2.5
- Made breaking changes to compilation process and typings configuration
#### v1.1.0
- Cleared `if` statement when reading from sessionStorage
- Should now clear all event listeners after clicking the right mouse button
#### v1.0.2
- Changed importing from directive to module so that no further issues with 
multiple directive's declarations in modules will be presented. The other reason
for that is to prepare the package for future changes
#### v1.0.1
- Added Usage section to README file
#### v1.0.0
- Ability to drag the elements on your website
- Automatically saving the window's position in sessionStorage
- Ability to have more than one dragging windows in one app


Please if you have any new feature suggestions or bug fixes, please, 
feel free to open an new issue on [GitHub](https://github.com/Flyrell/ng-dragonly)

------

Dawid Zbiński using MIT licence.