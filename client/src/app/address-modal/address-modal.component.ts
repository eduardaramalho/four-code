import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';
import { ObjectUtils } from 'src/utils/ObjectUtils';

export interface DialogDataClient {
  client : Array<any>;
  id: number;
  razaoSocial: string;
  name: string;
}

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss']
})
export class AddressModalComponent implements OnInit {
  enderecos : Array<any> = [];
  originalList : Array<any> = [];
  filterTerm : string = '';

  constructor(private httpService : HttpService, public dialog : MatDialog, private question: QuestionService,  @Inject(MAT_DIALOG_DATA) private data : DialogDataClient) { }

  ngOnInit(): void {
    this.list();
  }

  public async list(){    
    this.enderecos = await this.httpService.get(`cliente/${this.data.id}`);
    ObjectUtils.copyArray(this.enderecos, this.originalList);
  }

  public filterInput(){
    ObjectUtils.filterArray(this.enderecos, this.originalList, this.filterTerm, 'rua');
  }
  
  public async deleteEndereco(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('endereco', {id});
      this.list();    
    }) 
  }  


}
