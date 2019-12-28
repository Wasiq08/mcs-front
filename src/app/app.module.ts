import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

import { UserComponent } from './user/user.component';
import { HobbyComponent, HobbyConfirmDialog } from './hobby/hobby.component';
import { UserService } from './shared/services/user/user.service';
import { HobbyService } from './shared/services/hobby/hobby.service';
import { HttpMockRequestInterceptor } from './shared/services/httpMockRequestInterceptor';

const isMock = false;
let providers = [];
if (isMock) {
  providers.push({
    provide: HTTP_INTERCEPTORS,
    useClass: HttpMockRequestInterceptor,
    multi: true
  });
}

providers = providers.concat([
  UserService,
  HobbyService
]);

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HobbyComponent,
    HobbyConfirmDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule

  ],
  providers,
  bootstrap: [AppComponent],
  entryComponents: [HobbyConfirmDialog]
})
export class AppModule { }
