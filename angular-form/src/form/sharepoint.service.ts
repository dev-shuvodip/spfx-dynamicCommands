import { Injectable } from '@angular/core';
import { ISPFXContext, spfi, SPFI, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { milestone } from 'src/models/milestone.model';

@Injectable({
  providedIn: 'root'
})
export class SharepointService {
  private readonly _context = (window as { [key: string]: any; })["webPartContext"] as any
  public get context() {
    return this._context
  }

  private _sp: SPFI = spfi(this.context.pageContext.web.absoluteUrl).using(SPFx((this.context as unknown) as ISPFXContext))
  public get sp(): SPFI {
    return this._sp
  }
  public set sp(value: SPFI) {
    this._sp = value
  }

  constructor(private httpClient: HttpClient) { }

  public async GetMileStone(): Promise<milestone[]> {
    const mileStone = await this.httpClient
      .get<any>(
        `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Milestones')/items?$select=InternalPhaseName,PhaseID,TotalMilestone,CompletedMilestone`
      )
      .pipe(map((response) => response.value as milestone[]))
      .toPromise();

    return mileStone!;
  }
}
