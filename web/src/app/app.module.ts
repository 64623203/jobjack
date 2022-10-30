import { ScrollingModule } from '@angular/cdk/scrolling'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ToastNoAnimationModule } from 'ngx-toastr'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ListService } from './services'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ScrollingModule,
    ToastNoAnimationModule.forRoot()
  ],
  providers: [
    ListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
