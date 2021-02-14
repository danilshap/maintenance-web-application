import { Component, OnInit } from '@angular/core';
import { EChartsOption } from "echarts";
import { ReportsService } from "src/models/sevices/reports.service";
import { ReportsViewData } from "src/models/view-data/reports-view-data";

@Component({
  selector: 'admin-reports-page',
  templateUrl: './admin-reports-page.component.html'
})
export class AdminReportsPageComponent implements OnInit {
  reportsViewData!: ReportsViewData;
  chartOption!: EChartsOption;

  constructor(private reportsService: ReportsService){}

  ngOnInit(): void {
    this.reportsService.getReports().subscribe((data: any) => {
      this.reportsViewData = data as ReportsViewData;
      this.initEchart(this.reportsViewData);
    });
  }

  isMalfunctionsData(): boolean {
    return this.reportsViewData.malfunctionsViewData === undefined || this.reportsViewData.malfunctionsViewData.length === 0;
  }

  initEchart(data: ReportsViewData): void {
    this.chartOption = {
      tooltip: {
          trigger: 'item'
      },
      legend: {
          top: '1%',
          left: 'center'
      },
      toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            saveAsImage: {show: true}
        }
    },
      series: [
          {
              name: 'Данные о неисправностях',
              type: 'pie',
              radius: ['40%', '80%'],
              avoidLabelOverlap: false,
              itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
              },
              label: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '14',
                      fontWeight: 'bold'
                  }
              },
              labelLine: {
                  show: false
              },
              data: data.malfunctionsViewData.map(m => ({
                'name': m.title,
                'value': m.count
              }))
          }
      ]
  };
  }
}
