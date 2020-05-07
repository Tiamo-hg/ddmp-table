Aphrodite通用表格使用指南

通用表格组件，旨在实现一组通用的表格组件，来通过配置实现各个业务化的需求，并提供统一的风格样式，和快速开发的能力。

### 何时使用
* 当有大量结构化的数据需要展现时；
* 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

### 如何使用
<!-- y: '240px'y: '240px'，设置 y 属性，必须设置头部宽度，不然会造成各个列之间大小不一致，每个列宽度默认80px-->
Table 组件同时具备了易用性和高度可定制性
使用Demo 如下

```
// home.component.html
<div>
    <app-ddmp-table [tableConfig] = "tableConfig" [chooseDataSet]="selectedDataSet" [dataSet] = "dataSet" (optionEvent) = optionEvent($event) (pageEvent) = pageEvent($event)></app-ddmp-table>
</div>
```

```
// home.component.ts

import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NetworkApi } from "src/app/network/network-api";
import { DdmpTableConfig } from "src/app/component/ddmp-table/ddmp-table.config";
import { ObjectUtilsService } from 'src/app/util/object-util.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"]
})
export class HomeComponent implements OnInit {
  constructor(private httpClient: HttpClient, private objectUtilsService: ObjectUtilsService) {}

  tableConfig: any = {};
  dataSet: Array<any>;
  selectedDataSet: Array<any>;

  ngOnInit() {
    this.tableConfig = {
      // 表头数据
      columnSet: [
        {
          title: "name",
          // width: '',
          property: "name",
          position: "left"
        },
        {
          title: "age",
          // width: '',
          property: "age"
        },
        {
          title: "address",
          // width: '',
          property: "address"
        },
        {
          title: "city",
          // width: '',
          property: "city"
        },
        {
          title: "province",
          // width: '',
          property: "province"
        }
      ],
      // 分页参数
      pagination: {
        // 分页类型
        paginationType: "SERVER",
        // 分页大小
        pageSizeOptions: [10, 20, 30, 40, 50],
        // 当前页
        currentPage: 1,
        // 一页大小
        pageSize: 10,
        // 总数
        total: 30
      },
      // 操作列，按钮参数
      buttonOptions: [
        {
          icon: "edit",
          theme: "twotone",
          text: "",
          tag: "edit"
        },
        {
          icon: "delete",
          theme: "twotone",
          text: "",
          tag: "delete"
        }
      ],
      // 是否多选
      checkOptions: {
        checkType: "SINGLE",
        disabledCheckAll: false
      },
      // 表格样式
      style: {
        size: "default",
        bordered: true,
        noResult: "暂无数据"
      }
    };

    this.tableConfig = this.objectUtilsService.extend(
      true,
      {},
      new DdmpTableConfig(),
      this.tableConfig
    );
    console.log(this.tableConfig);

    this.dataSet = [];
    for (let i = 1; i <= 30; i++) {
      this.dataSet.push({
        id: `${i}`,
        name: "John Brown",
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        city: "Shanghai",
        province: "jingan"
        // options    : ['edit'],
      });
    }

    this.selectedDataSet = [];
    this.selectedDataSet.push({
      id: `1`,
      name: "John Brown",
      age: `12`,
      address: `New York No. 1 Lake Park`,
      city: "Shanghai",
      province: "jingan",
      options: ["edit"]
    });
    this.selectedDataSet.push({
      id: `10`,
      name: "John Brown",
      age: `102`,
      address: `New York No. 10 Lake Park`,
      city: "Shanghai",
      province: "jingan"
    });

    this.httpClient
      .request(
        NetworkApi.NETWORK_API_DEMO.method,
        NetworkApi.NETWORK_API_DEMO.url,
        {
          params: {
            query: "123"
          }
        }
      )
      .subscribe(res => {
        console.log(res);
      });
  }

  optionEvent(params) {
    console.log(params);
  }

  pageEvent(params) {
    console.log(params);
  }
}

```

```
// home.module.ts
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";

import { DdmpTableModule } from "../../component/ddmp-table/ddmp-table.module";

@NgModule({
  imports: [CommonModule, HomeRoutingModule, DdmpTableModule],
  declarations: [HomeComponent],
  exports: []
})
export class HomeModule {}
```

### API(app-ddmp-table)


#### INPUT 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tableConfig | 通用表格的配置信息 | DdmpTableConfig | 默认值见DdmpTableConfig |
| dataSet | 页面加载的当前数据 | any[]	 | - |
| chooseDataSet | 初始化时候已经选择的数据 | any[]	 | - |

DdmpTableConfig 

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columnSet | 表格的列配置信息 | DdmpTableColumn[] | - |
| pagination | 页面分页参数 | DdpmTablePagination	 | 默认值见DdpmTablePagination |
| buttonOptions | 表格按钮列配置 | DdmpTableRowOptionsButton[]	 | - |
| checkOptions | 表格选择操作配置 | DdmpTableRowCheckOptions	 | 默认值见DdmpTableRowCheckOptions |
| style | 表格主样式配置 | DdmpTableStyle	 | DdmpTableStyle |

DdmpTableColumn 

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 列上的标题 | string | - |
| width | 列上宽度的配置, *注：若设置了 style 中的 scroll 里面的y 值，则必须给所有的列设置 width，否则会出现表头宽度不匹配的情况* |  string (xx%或xxpx)	 | - |
| property | 列上的数据字段配置 | DdmpTableRowOptionsButton[]	 | - |
| position | 列的位置，偏左还是偏右 | 可选值 left/center/right | center |
| type | 列的类型 | 可选值 default/link | default |


DdpmTablePagination

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| paginationType | 分页类型 | FRONT/SERVER/NONE | SERVER |
| pageSizeOptions | 可选择每页多少数据 |  Number[] | [10, 20, 30] |
| currentPage | 当前第几页 | Number	| 1 |
| pageSize | 每页展现的数据大小 | Number | 10 |
| total | 总数据，只在后端分页的时候有用 | Number | - |

DdmpTableRowOptionsButton

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标 | string (可选 ng-zorro 的图标) | - |
| theme | 图标主题 |  string (可选 ng-zorro 的图标主题) | - |
| text |  文本，和 icon，不同时生效，优先icon | string	| - |
| tag |  按钮的标签，主要是判断多个按钮事件时候使用 | string | - |

DdmpTableRowCheckOptions

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checkType | 选择类型 | MUTI/SINGLE/NONE | "NONE" |
| disabledCheckAll | 是否禁用多选 | Boolean | - |
| indeterminate | 内部使用，暂无特殊效果 | string	| - |
| checked |  是否默认全选，建议使用 selectedData 传入 | string | - |

DdmpTableStyle

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 行间距大小 | default/small/middle | "default" |
| bordered | 是否存在表格边框 | Boolean | true |
| noResult |  无数据时显示 | string/TemplateRef	| "暂无数据" |
| hasIndex |  是否有索引 | string | - |
| scroll |  控制表格大小 , 若指定 y 的大小，则列宽必须指定 | { x?: string; y?: string } | { x: "100%"} |
| loadingDelay | loading多少毫秒延时之后出现，防止闪烁 | Number | 300 |

#### OUTPUT 事件
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| (optionEvent) | 操作按钮事件 | EventEmitter<any> | - |
| (pageIndexChangeEvent) | 分页索引事件 | EventEmitter<any> | - |
| (pageSizeChangeEvent) | 分页大小改变事件 | EventEmitter<any> | --- |
| (clickCheckAllEvent) | 全选事件 | EventEmitter<any[]> | - |
| (clickCheckRowEvent) | 多选时，选择当单行的事件 |  EventEmitter<any> | - |
| (pageDataChangeEvent) | 当前页面数据变化时候的回调 | EventEmitter<any[]> | --- |
| (chooseRowEvent) | 单选时，单击单行的事件 | EventEmitter<any> | --- |
| (tdClickEvent) | 点击单个单元格里面的事件，现在所有的点击都会返回，需要根据 property 来判断那一列被点击了 | EventEmitter<any> | --- |

#### 组件获取值
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| chooseDataSet | 当前选择的数据 | any[] | - |
| dataSet | 当前页面的所有数据 | any[] | - |

### API - (app-ddmp-http-table)

此表格为`app-http-table`的扩展表格, 故能使用上述所有特性，但可以新增网络请求使用功能，以更加快速的开发表格样式

#### INPUT 输入参数
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| requestOptions | 请求的一些固有属性 | DdmpRequestOptions | - |
| requestParams | 请求需要由外部传入的参数，如查询参数等 | {} (any) | - |
| requestHeaders | 请求时需要传入的额外请求头 | [] (any[])	| - |
| incepector | 请求发起和完成的相关数据处理 | { requestIncepector?: Function, responseIncepector?: Function } | - |

DdmpRequestOptions

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | 查询的url | string | - |
| method | 查询的方法 | string | 'GET' |
| headers?| 静态请求头 | [] (any[])	| - |
| responseType? | 返回值类型 |  string	| "json" |


incepector

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| requestIncepector | 请求的相关拦截器, 可接收一个参数，对里面的数据进行改变，改变后需返回同样的数据结构  requestIncepector({ requestOptions: requestOptions, params: params, headers: headers}) | Function | - |
| responseIncepector | 返回的相关拦截器, 可接收一个参数，对里面的数据进行改变，改变后需返回同样的数据结构 responseIncepector(res) | Function | - |

