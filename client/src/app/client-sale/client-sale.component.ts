import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';
import { ObjectUtils } from 'src/utils/ObjectUtils';
import { ClientSaleModalComponent } from '../client-sale-modal/client-sale-modal.component';

@Component({
  selector: 'app-client-sale',
  templateUrl: './client-sale.component.html',
  styleUrls: ['./client-sale.component.scss']
})
export class ClientSaleComponent implements OnInit {
  sales : Array<any> =[]; 
  originalList : Array<any> =[]; 
  filterTerm : string = '';

  constructor(private httpService : HttpService, public dialog: MatDialog, private question: QuestionService) { }

  ngOnInit(): void {
    this.list()
  }

  public async list(){    
    this.sales = await this.httpService.get('sale');
    ObjectUtils.copyArray(this.sales, this.originalList);
}

  public filterInput(){
    ObjectUtils.filterArray(this.sales, this.originalList, this.filterTerm, 'meses');
  }

  public openModal(){
    const dialog = this.dialog.open(ClientSaleModalComponent, {
      width: '450px'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(sale : any){
    const dialog = this.dialog.open(ClientSaleModalComponent, {
      width: '450px',
      data : sale
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

   public async delete(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('sale', {id});
      this.list();    
    }) 
  }   

}
