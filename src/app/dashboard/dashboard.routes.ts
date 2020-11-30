import {Routes} from '@angular/router';
import {StatisticsComponent} from "../input-output/statistics/statistics.component";
import {InputOutputComponent} from "../input-output/input-output.component";
import {DetailComponent} from "../input-output/detail/detail.component";

export const dashboardRoutes: Routes = [

  {path: '', component: StatisticsComponent},
  {path: 'input-output', component: InputOutputComponent},
  {path: 'detail', component: DetailComponent},

];
