import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { DdmpTableComponent } from "./ddmp-table.component";
import { DdmpHttpTableComponent } from './ddmp-http-table/ddmp-http-table.component';
import { DdmpHttpTableService } from './ddmp-http-table/ddmp-http-table.service';

@NgModule({
  imports: [CommonModule, NgZorroAntdModule],
  declarations: [DdmpTableComponent, DdmpHttpTableComponent],
  exports: [DdmpTableComponent, DdmpHttpTableComponent],
  providers: [DdmpHttpTableService]
})
export class DdmpTableModule {}
