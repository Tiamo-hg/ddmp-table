import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef
} from "@angular/core";
import {
  NzTableComponent,
} from "ng-zorro-antd";
import { DdmpTableConfig } from "./ddmp-table.config";
import { debug } from 'util';

@Component({
  selector: "app-ddmp-table",
  templateUrl: "./ddmp-table.component.html",
  styleUrls: ["./ddmp-table.component.less"]
})
export class DdmpTableComponent implements OnInit {
  @ViewChild("basicTable") basicTable: NzTableComponent;

  // 总条数
  @Input() totalPageNumber: number;

  /**
   * 表格配置信息，需要产出详细的 MD 文档
   */
  @Input() tableConfig: DdmpTableConfig;

  /**
   * 传入表单数据
   */
  // 表格数据
  _dataSet: Array<any>;
  get dataSet(): Array<any> {
    return this._dataSet;
  }
  @Input("dataSet") set dataSet(dataSet: Array<any>) {
    // 匹配dataSet 和 chooseDataSet
    if (dataSet !== this._dataSet) {
      this._dataSet = dataSet;
      this.refreshCheckStatus();
    }
  }

  /**
   * 传入选中数据
   */
  // 选中数据
  _chooseDataSet: Array<any> | Object;
  get chooseDataSet(): Array<any> | Object {
    return this._chooseDataSet;
  }
  @Input("chooseDataSet") set chooseDataSet(
    chooseDataSet: Array<any> | Object
  ) {
    // 匹配dataSet 和 chooseDataSet
    if (chooseDataSet !== this._chooseDataSet) {
      if (
        this.tableConfig.checkOptions.checkType === "SINGLE" &&
        chooseDataSet &&
        chooseDataSet instanceof Array &&
        (chooseDataSet as Array<any>).length > 0
      ) {
        chooseDataSet = chooseDataSet[0];
      }
      this._chooseDataSet = chooseDataSet;
      this.refreshCheckStatus();
    }
    // 匹配dataSet 和 chooseDataSet
  }

  // 操作按钮事件
  @Output() optionEvent = new EventEmitter();

  // 分页索引事件
  @Output() pageIndexChangeEvent = new EventEmitter();

  // 分页大小改变事件
  @Output() pageSizeChangeEvent = new EventEmitter();

  // 全选传入事件
  @Output() clickCheckAllEvent = new EventEmitter<any>();

  // 勾选传入事件
  @Output() clickCheckRowEvent = new EventEmitter<any>();

  // 当前页面数据变化时候的回调
  @Output() pageDataChangeEvent = new EventEmitter<any>();

  @Output() chooseRowEvent = new EventEmitter<any>();

  // 双击事件获取当前行信息
  @Output() dblChooseRowEvent = new EventEmitter<any>();

  @Output() tdClickEvent = new EventEmitter<any>();

  @Output() sortEvent = new EventEmitter<any>();


  constructor() {}

  ngOnInit() {
  }

  /**
   * 刷新选中框的状态
   */
  refreshCheckStatus(): void {
    this.mergeDataAndSelectedRow(
      this.dataSet,
      this.chooseDataSet ? this.chooseDataSet : []
    );
    const validData = this.basicTable.data.filter(
      value => !value.checkDisabled
    );
    const allChecked =
      validData.length > 0 && validData.every(value => value.checked === true);
    const allUnChecked = validData.every(value => !value.checked);
    this.tableConfig.checkOptions.checked = allChecked;
    this.tableConfig.checkOptions.indeterminate = !allChecked && !allUnChecked;
    // 若 chooseData 中存在数据，则在此显示
  }

  /**
   * 多选时的全选事件
   * @param checked 是否选中
   */
  checkAll(checked: boolean) {
    if (checked) {
      this.mergeSelectedRow(this.basicTable.data);
    } else {
      this.popSelectedRow(this.basicTable.data);
    }
    this.refreshCheckStatus();
    if (this.clickCheckAllEvent) {
      this.clickCheckAllEvent.emit(checked);
    }
  }

  /**
   * 多选时的单选事件
   * @param data 行数据
   * @param index 索引
   * @param checked 状态
   */
  checkedRow(data: any, index: number, checked: boolean) {
    if (checked) {
      this.mergeSelectedRow(data);
    } else {
      this.popSelectedRow(data);
    }
    this.refreshCheckStatus();
    if (this.clickCheckRowEvent) {
      this.clickCheckRowEvent.emit({
        checked: checked,
        index: index,
        data: data
      });
    }
  }

  /**
   * 当前页面变化
   * @param index 索引
   */
  pageIndexChange(index: number): void {
    this.refreshCheckStatus();
    if (this.pageIndexChangeEvent) {
      this.pageIndexChangeEvent.emit({ pageIndex: index , pageSize: this.tableConfig.pagination.pageSize });
    }
  }

  /**
   * 当前页面大小改变
   * @param size  大小
   */
  pageSizeChange(size: number): void {
    this.refreshCheckStatus();
    if (this.pageSizeChangeEvent) {
      this.pageSizeChangeEvent.emit({pageIndex: this.tableConfig.pagination.currentPage, pageSize: size });
    }
  }

  /**
   * 多选按钮的操作
   * @param data 数据
   * @param index 索引
   * @param tag 操作标签
   */
  chooseEvent(data, index, tag) {
    this.refreshCheckStatus();
    if (this.optionEvent) {
      this.optionEvent.emit({ data: data, index: index, tag: tag });
    }
  }

  /**
   * 当前页数据的回调
   * @param $event 数据
   */
  currentPageDataChange($event: Array<any>): void {
    this.refreshCheckStatus();
    if (this.pageDataChangeEvent) {
      this.pageDataChangeEvent.emit($event);
    }
  }

  tdClick(data, index, property) {
    if (this.tdClickEvent) {
      this.tdClickEvent.emit({ data: data, index: index, property: property });
    }
  }

  chooseSingleRow(data, index) {
    if (this.tableConfig.checkOptions.checkType === "SINGLE") {
      this.dataSet.forEach(currentData => {
        if (currentData !== data) {
          currentData.checked = false;
        }
      });
      data.checked = !data.checked;
      if (data.checked) {
        this.chooseDataSet = data;
        if (this.chooseRowEvent) {
          console.log(data);
          console.log(index);
          this.chooseRowEvent.emit({ data: data, index: index });
        }
      } else {
        this.chooseDataSet = null;
      }
    }
  }

  dblChooseSingleRow(data, index) {
    if (!data.checked) {
      this.chooseDataSet = data;
      if (this.dblChooseRowEvent) {
        this.dblChooseRowEvent.emit({ data: data, index: index });
      }
    } else {
      this.chooseDataSet = null;
      return;
    }
  }

  /**
   * 组件对外暴露的获取页面信息的方法
   */
  getPageInfo() {
    return {pageIndex: this.tableConfig.pagination.currentPage ,  pageSize: this.tableConfig.pagination.pageSize};
  }

  /**
   * 合并选择行
   * @param selectedData 合并选择行
   */
  mergeSelectedRow(selectedData: Array<any> | Object) {
    if (this.tableConfig.checkOptions.checkType === "SINGLE") {
      if (selectedData instanceof Array && selectedData.length > 0) {
        this.chooseDataSet = selectedData[0];
      } else {
        this.chooseDataSet = selectedData;
      }
    } else if (this.tableConfig.checkOptions.checkType === "MUTI") {
      this.dataSet.forEach(data => {
        data.checked = false;
      });
      if (!this.chooseDataSet || !(this.chooseDataSet instanceof Array)) {
        this.chooseDataSet = [];
      }
      if (selectedData && !(selectedData instanceof Array)) {
        const tempData = selectedData;
        selectedData = [tempData];
      } else if (!selectedData) {
        selectedData = [];
      }
      selectedData = (selectedData as Array<any>).filter(
        value => !value.checkDisabled
      );
      (selectedData as Array<any>).forEach(currentData => {
        let canPush = true;
        for (const data of this.chooseDataSet as Array<any>) {
          if (data === currentData || (data.id && currentData.id === data.id)) {
            canPush = false;
            data.checked = true;
            currentData.checked = true;
            break;
          }
        }
        if (canPush) {
          (this.chooseDataSet as Array<any>).push(currentData);
        }
      });
      (this.chooseDataSet as Array<any>).forEach(chooseData => {
        chooseData.checked = true;
      });
    }
  }

  /**
   * 反选数据行
   * @param selectedData 反选数据
   */
  popSelectedRow(selectedData: Array<any> | Object) {
    if (this.tableConfig.checkOptions.checkType === "SINGLE") {
      this.chooseDataSet = null;
    } else if (this.tableConfig.checkOptions.checkType === "MUTI") {
      this.dataSet.forEach(data => {
        data.checked = false;
        delete data.isDelete;
      });
      if (selectedData && !(selectedData instanceof Array)) {
        const tempData = selectedData;
        selectedData = [tempData];
      } else if (!selectedData) {
        selectedData = [];
      }
      selectedData = (selectedData as Array<any>).filter(
        value => !value.checkDisabled
      );
      (selectedData as Array<any>).forEach((currentData, index) => {
        for (
          let chooseDeleteIndex = 0;
          chooseDeleteIndex < (this.chooseDataSet as Array<any>).length;
          chooseDeleteIndex++
        ) {
          const data = (this.chooseDataSet as Array<any>)[chooseDeleteIndex];
          if (data === currentData || (data.id && currentData.id === data.id)) {
            data.checked = false;
            currentData.checked = false;
            data.isDelete = true;
            currentData.isDelete = true;
            break;
          }
        }
      });
    }
    this.chooseDataSet = (this.chooseDataSet as Array<any>).filter(
      data => !(data.isDelete === true)
    );
    (this.chooseDataSet as Array<any>).forEach(chooseData => {
      chooseData.checked = true;
    });
  }

  /**
   * 初始化选择
   * @param dataArray 初始化数组
   * @param selectedData 初始化选择数组
   */
  mergeDataAndSelectedRow(
    dataArray: Array<any>,
    selectedData: Array<any> | Object
  ) {
    if (selectedData && !(selectedData instanceof Array)) {
      const tempData = selectedData;
      selectedData = [tempData];
    } else if (!selectedData) {
      selectedData = [];
    }
    selectedData = (selectedData as Array<any>).filter(
      value => !value.checkDisabled
    );

    // FIXME: 要判断
    if (dataArray === undefined || dataArray.length === 0) { return; }
    dataArray.forEach(data => {
      data.checked = false ;
    });

    (dataArray as Array<any>).forEach((currentData, index) => {
      for (
        let chooseDeleteIndex = 0;
        chooseDeleteIndex < (selectedData as Array<any>).length;
        chooseDeleteIndex++
      ) {
        const data = (selectedData as Array<any>)[chooseDeleteIndex];
        if (data === currentData || (data.id && currentData.id === data.id)) {
          data.checked = true;
          currentData.checked = true;
          break;
        }
      }
    });
  }

  containTag(tags: Array<string>, tag: string) {
    if (tags) {
      const resultTags = tags.filter(currentTag => {
        return tag === currentTag;
      });
      if (resultTags && resultTags.length > 0) {
        return true;
      }
    } else {
      return true;
    }
    return false;
  }

  sort(sort: { key: string, value: string }): void {
    if (this.sort) {
      this.sortEvent.emit({
        key: sort.key,
        value: sort.value,
      });
    }
  }

}
