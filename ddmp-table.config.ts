
import { TemplateRef } from "@angular/core";

export class DdmpTableColumn {
  // 列上标题配置
  title: string;
  // 列上宽度配置
  width?: string;
  // 列上的数据配置
  property: string;
  // 列的位置，偏左还是偏右
  position: "left" | "center" | "right" = "center";
  // 动态模板
  columnTemplate?: TemplateRef<any>;
  // 整列的类型
  type?: "template" | "default" | "link" = "default";

  sort?: boolean = false
}

export class DdpmTablePagination {
  // 分页类型
  paginationType: "FRONT" | "SERVER" | "NONE" = "SERVER";
  // 分页大小
  pageSizeOptions: Array<any> = [10, 20, 30, 40, 50];
  // 当前页
  currentPage: Number = 1;
  // 一页大小
  pageSize: Number = 10;
  // 总数
  total?: Number;
}

export class DdmpTableRowOptionsButton {
  // 按钮图标
  icon?: string;
  // 按钮主题
  theme?: string;
  // 文本标题，暂未支持，优先使用图标
  text?: string;
  // 标签
  tag: string;
}

export class DdmpTableRowCheckOptions {
  // 是否需要选择，选择类型
  checkType?: "MUTI" | "SINGLE" | "NONE" = "NONE";
  // 是否需要disabled 掉全选按钮
  disabledCheckAll?: Boolean = false;
  // 暂时不需要在 indeterminate 设置，会自动设置
  indeterminate?: Boolean;
  // 是否默认全选，暂时不需要输入，建议输入 selectedData来判断
  checked?: Boolean;
}

export class DdmpTableStyle {
  size?: "default" | "small" | "middle" = "default";
  bordered?: Boolean = true;
  noResult?: string | TemplateRef<any> = "暂无数据";
  hasIndex?: Boolean = true;
  scroll?: { x: string; y?: string } = { x: "100%" };
  loadingDelay?: Number = 300;
  loading?: Boolean = false;
  needInitData?: Boolean = true;
  nzHideOnSinglePage?: Boolean = true;
}

export class DdmpTableConfig {
  // 相关列配置
  columnSet: Array<DdmpTableColumn>;
  // 分页参数
  pagination: DdpmTablePagination = new DdpmTablePagination();
  // 行上的按钮动作
  buttonOptions?: Array<DdmpTableRowOptionsButton>;
  // checkOptions,多选项的配置
  checkOptions: DdmpTableRowCheckOptions = new DdmpTableRowCheckOptions();

  style: DdmpTableStyle = new DdmpTableStyle();

}

export class DdmpRequestOptions {
  url: string;
  method?: string;
  headers?: [];
  responseType?: string;
}
