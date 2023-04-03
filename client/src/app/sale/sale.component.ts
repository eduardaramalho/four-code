import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';
import { ObjectUtils } from 'src/utils/ObjectUtils';
import { SaleModalComponent } from '../sale-modal/sale-modal.component';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  vendas     : Array<any> =[];  
  originalList : Array<any> =[]; 
  filterTerm : string = '';

  constructor(private httpService : HttpService, public dialog: MatDialog, private question : QuestionService) { }

  ngOnInit(): void {
    this.list()
  }

  public async list(){    
    this.vendas = await this.httpService.get('pedido');
    ObjectUtils.copyArray(this.vendas, this.originalList);
  }


  public filterInput(){
    ObjectUtils.filterArray(this.vendas, this.originalList, this.filterTerm, 'id');
  }

  public delete(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('pedido', {id});
      this.list();    
    }) 
  }

  public openModal(){
    const dialog = this.dialog.open(SaleModalComponent, {
      width: '650px'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(data : any){
    const dialog = this.dialog.open(SaleModalComponent, {
      width: '650px',
      data : data.id
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }



}
