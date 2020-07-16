
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { PreviousRouteService } from 'src/app/core/services/previous-route/previous-route.service';



@Component({
  selector: 'app-lost-conexion',
  templateUrl: './lost-conexion.component.html',
  styleUrls: ['./lost-conexion.component.scss']
})
export class LostConexionComponent implements OnInit {

  apiUrl = environment.apiUrl;
  constructor( private httpClient:HttpClient,
    private previousRouteService:PreviousRouteService,
    private utilsService:UtilsService,
    private showToastrService:ShowToastrService,
    private router:Router ) { }

  ngOnInit() {
    // const interVal = setInterval(()=>{
    //   this.httpClient.get(environment.apiUrl+'uptime').subscribe(()=>{
    //     clearInterval(interVal);
    //     this.showToastrService.showInfo("Recuperando la conexión a internet","Conexón recuperada");
    //     this.router.navigate(['/']);
    //   });
    // },5000);

  }

}
