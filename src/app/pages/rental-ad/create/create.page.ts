import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalAd } from 'src/app/domain/rental-ad';
import { RentaladService } from 'src/app/services/rentalad.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  rentalAd: RentalAd = new RentalAd();
  flag: boolean;

  titleS = 'Crear Anuncio Nuevo';
  titleU = 'Actualizar Anuncio';

  constructor(private rentalAdService: RentaladService,
              private router: Router,
              private route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      this.rentalAd = new RentalAd();
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.rentalAd = this.router.getCurrentNavigation().extras.queryParams.rentalAd;
      }
      this.flag = params.flag;
    });
  }

  ngOnInit() {
  }

  save(){
    this.rentalAdService.save(this.rentalAd);
    this.router.navigate(['/rental-ads/list']);
  }

  delete(){
    this.rentalAd.enabled = false;
    this.save();
  }

  cancel(){
    this.router.navigate(['/rental-ads/list']);
  }

}
