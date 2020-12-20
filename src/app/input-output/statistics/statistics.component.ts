import {Component, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';

import {InputOutput} from '../../models/input-output.model';

import {Label, MultiDataSet} from 'ng2-charts';
import {ChartType} from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: []
})
export class StatisticsComponent implements OnInit {

  inputs = 0;
  outputs = 0;

  totalInputs = 0;
  totalOutputs = 0;

  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppState>) {
    this.store.select('inputOutput')
      .subscribe(({items}) => {
        this.generateStatistics(items);
      });
  }

  ngOnInit(): void {
  }

  generateStatistics(items: InputOutput[]): void {
    this.inputs = 0;
    this.outputs = 0;
    this.totalInputs = 0;
    this.totalOutputs = 0;

    for (const item of items) {
      if (item.type === 'input') {
        this.totalInputs += item.amount;
        this.inputs++;
      } else {
        this.totalOutputs += item.amount;
        this.outputs++;
      }
    }
    this.doughnutChartData = [[this.totalInputs, this.totalOutputs]];
  }

  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
