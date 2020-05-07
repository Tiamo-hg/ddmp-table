import { DdmpTableComponent } from './../ddmp-table.component';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DdmpTableConfig, DdmpRequestOptions } from '../ddmp-table.config';
import { DdmpHttpTableService } from './ddmp-http-table.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-ddmp-http-table',
  templateUrl: './ddmp-http-table.component.html',
  styleUrls: ['./ddmp-http-table.component.less']
})
export class DdmpHttpTableComponent implements OnInit {

  @Input() requestOptions: DdmpRequestOptions;

  @Input() requestParams: any;

  @Input() requestHeaders?: Array<any>;

  @Input() incepector?: {
    requestIncepector?: Function,
    responseIncepector?: Function
  };
  @ViewChild('ddmpTable') ddmpTable: DdmpTableComponent;
  @Input() dataSet: Array<any>;

  @Input() tableConfig: DdmpTableConfig;

  @Input() chooseDataSet: Array<any>;

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
  @Output() pageDataChangeEvent = new EventEmitter<any[]>();

  @Output() chooseRowEvent = new EventEmitter<any>();

  @Output() dblChooseRowEvent = new EventEmitter<any>();

  @Output() tdClickEvent = new EventEmitter<any>();


  constructor(private ddmpHttpTableService: DdmpHttpTableService, private notifyService: NzNotificationService) {
  }

  ngOnInit() {
    // 初始加载数据
    if (this.tableConfig.style.needInitData !== false) {
      this.loadDdmpData();
    }
  }

  getPageInfo() {
    return { pageIndex: this.tableConfig.pagination.currentPage, pageSize: this.tableConfig.pagination.pageSize };
  }

  loadDdmpData() {
    // 延时100ms，以防止参数更新不及时
    setTimeout(() => {
      if (!this.incepector) {
        this.incepector = {};
      }

      const params = {
        ...this.requestParams,
        page: this.tableConfig.pagination.currentPage ? this.tableConfig.pagination.currentPage : 1,
        pageSize: this.tableConfig.pagination.pageSize
      };

      this.tableConfig.style.loading = true;
      this.ddmpHttpTableService.loadHttpData(this.requestOptions, params,
        this.requestHeaders, this.incepector.requestIncepector, this.incepector.responseIncepector)
        .subscribe(res => {
          // console.log(res);
          if (res['code'] === 'ok') {
            this.dataSet = res ? res.table : [];
            this.tableConfig.pagination.total = res ? res.total : 0;
          } else {
            this.notifyService.error('服务器返回失败', res ? res.msg : '', {
              nzAnimate: true
            });
          }
        }, error => {
          this.notifyService.error('请求列表失败', '当前网络不稳定，请刷新后重试', {
            nzAnimate: true
          });
          this.tableConfig.style.loading = false;
        }, () => {
          this.tableConfig.style.loading = false;
        });
    }, 100);
  }

  pageIndexChange($event) {
    this.loadDdmpData();
    this.pageIndexChangeEvent.emit($event);
  }

  pageSizeChange($event) {
    this.loadDdmpData();
    this.pageSizeChangeEvent.emit($event);
  }

  option($event) {
    this.optionEvent.emit($event);
  }

  clickCheckAll($event) {
    this.clickCheckAllEvent.emit($event);
  }

  pageDataChange($event) {
    this.pageDataChangeEvent.emit($event);
  }

  clickCheckRow($event) {
    this.clickCheckRowEvent.emit($event);
  }

  chooseRow($event) {
    this.chooseRowEvent.emit($event);
  }

  dblChooseRow($event) {
    this.dblChooseRowEvent.emit($event);
  }

  tdClick($event) {
    this.tdClickEvent.emit($event);
  }

  sort($event) {
    if ($event && $event.key && $event.value) {
      this.dataSet = this.dataSet.sort((a, b) => ($event.value === 'ascend') ? (a[$event.key] > b[$event.key] ? 1 : -1) : (b[$event.key] > a[$event.key] ? 1 : -1));
    } else {
    }
  }


}
