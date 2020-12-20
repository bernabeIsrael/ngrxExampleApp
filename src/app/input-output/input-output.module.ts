import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';

import {DashboardRoutesModule} from '../dashboard/dashboard-routes.module';
import {SharedModule} from '../shared/shared.module';

import {DashboardComponent} from '../dashboard/dashboard.component';
import {InputOutputComponent} from './input-output.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {DetailComponent} from './detail/detail.component';
import {InputOrderPipe} from '../pipes/input-order.pipe';

import {StoreModule} from '@ngrx/store';
import {inputOutputReducer} from './input-output.reducer';





@NgModule({
  declarations: [
    DashboardComponent,
    InputOutputComponent,
    StatisticsComponent,
    DetailComponent,
    InputOrderPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('inputOutput', inputOutputReducer),
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    DashboardRoutesModule,
  ]
})
export class InputOutputModule {
}
