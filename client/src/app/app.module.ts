import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BlockUIModule } from 'ng-block-ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { DashComponent } from './dash/dash.component';
import { RoutesModule } from './routes.module';
import { GroupComponent } from './group/group.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { BasicmodalComponent } from './basicmodal/basicmodal.component';
import { InputComponent } from './input/input.component';
import { QuestionComponent } from './question/question.component';
import { QuestionService } from 'src/services/question.service';
import { SubgroupComponent } from './subgroup/subgroup.component';
import { SubgroupModalComponent } from './subgroup-modal/subgroup-modal.component';
import { CollectionComponent } from './collection/collection.component';
import { CollectionModalComponent } from './collection-modal/collection-modal.component';
import { ProductComponent } from './product/product.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { ClientComponent } from './client/client.component';
import { ClientModalComponent } from './client-modal/client-modal.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { ChangeModalComponent } from './change-modal/change-modal.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { AddressModalComponent } from './address-modal/address-modal.component';
import { AddressEditComponent } from './address-edit/address-edit.component';
import { SaleComponent } from './sale/sale.component';
import { SaleModalComponent } from './sale-modal/sale-modal.component';
import { ProductSaleModalComponent } from './product-sale-modal/product-sale-modal.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    DashComponent,
    GroupComponent,
    UserComponent,
    EditModalComponent,
    BasicmodalComponent,
    InputComponent,
    QuestionComponent,
    SubgroupComponent,
    SubgroupModalComponent,
    CollectionComponent,
    CollectionModalComponent,
    ProductComponent,
    ProductModalComponent,
    ClientComponent,
    ClientModalComponent,
    ClientEditComponent,
    DropdownComponent,
    UserModalComponent,
    ChangeModalComponent,
    ErrorModalComponent,
    AddressModalComponent,
    AddressEditComponent,
    SaleComponent,
    SaleModalComponent,
    ProductSaleModalComponent,
    SignUpComponent
    ],
  imports: [
    RoutesModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BlockUIModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
    ],
  exports : [
    RouterModule
  ],
  providers: [
    QuestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
