import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';
import { ObjectUtils } from 'src/utils/ObjectUtils';
import { ChargeModalComponent } from '../charge-modal/charge-modal.component';

@Component({
  selector: 'app-charge-carrying',
  templateUrl: './charge-carrying.component.html',
  styleUrls: ['./charge-carrying.component.scss']
})
export class ChargeCarryingComponent implements OnInit {
  fretes : Array<any> = [];
  originalList : Array<any> =[]; 
  filterTerm : string = '';

  constructor(private httpService : HttpService, private question : QuestionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
  }

  public async list(){    
    this.fretes = await this.httpService.get('frete');
    ObjectUtils.copyArray(this.fretes, this.originalList);
  }

  public filterInput(){
    ObjectUtils.filterArray(this.fretes, this.originalList, this.filterTerm, 'id');
  }

  public openModal(){
    const dialog = this.dialog.open(ChargeModalComponent, {
      width: '450px'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
      console.log('fechou modal')
    })
  }

  public openModalEdit(frete : any){
    const dialog = this.dialog.open(ChargeModalComponent, {
      width: '450px',
      data : frete
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public async deleteFrete(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('frete', {id});
      this.list();    
    }) 
  }  

}
