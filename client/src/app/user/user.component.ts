import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';
import { ObjectUtils } from 'src/utils/ObjectUtils';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users :  Array<any> = [];
  originalList : Array<any> = [];
  filterTerm : string = ''

  constructor(private httpService : HttpService, public dialog: MatDialog, private question : QuestionService) { }

  ngOnInit(): void {
    this.list();
  }

  public async list(){    
    this.users = await this.httpService.get('user');
    ObjectUtils.copyArray(this.users, this.originalList);
  }

  public filterInput(){
    ObjectUtils.filterArray(this.users, this.originalList, this.filterTerm, 'name');
  }

  public async deleteUser(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('user', {id});
      this.list();    
    }) 
  }  

  public openModal(){
    const dialog = this.dialog.open(UserModalComponent, {
      width: '450px'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(colecao : any){
    const dialog = this.dialog.open(UserModalComponent, {
      width: '450px',
      data : colecao
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

}

