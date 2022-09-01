import {
  Component,
  OnInit
} from '@angular/core';
import { item, metadata } from 'src/models/item.model';
import { SharepointService } from './sharepoint.service';
import { milestone } from 'src/models/milestone.model';

@Component({
  selector: 'form-custom',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  mileStone: milestone[] = []
  chartReady!: boolean
  labels: string[] = []
  completedMileStone: number[] = []
  incompleteMileStone: number[] = []
  totalEngagements: number = 0
  completedEngagements: number = 0

  constructor(private sharepointService: SharepointService) { }

  ngOnInit(): void {
    this.sharepointService.GetMileStone().then((item: milestone[]): void => {
      this.mileStone = item
      this.mileStone.forEach((element) => {
        this.completedMileStone.push(Math.round((element.CompletedMilestone / element.TotalMilestone) * 100))
        this.incompleteMileStone.push(Math.round(((element.TotalMilestone - element.CompletedMilestone) / element.TotalMilestone) * 100))
        this.labels.push(element.InternalPhaseName)
        this.totalEngagements += element.TotalMilestone
        this.completedEngagements += element.CompletedMilestone
      })
    }).finally(() => {
      this.chartReady = true
    })
  }
}
