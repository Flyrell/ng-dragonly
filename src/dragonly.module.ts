import { NgModule } from "@angular/core";
import { DragOnlyDirective } from "./dragonly.directive";

@NgModule({
    declarations: [DragOnlyDirective],
    exports: [DragOnlyDirective]
})
export class DragOnlyModule {}