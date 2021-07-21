import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RentalAd } from 'src/app/domain/rental-ad';
import { RentaladService } from 'src/app/services/rentalad.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  rentalAds: Observable<RentalAd[]>;
  rentalAdsCopy: Observable<RentalAd[]>;

  title = 'Anuncios';
  subtitle = 'Anuncios Disponibles';

  constructor(private rentalAdService: RentaladService,
              private router: Router) { }

  ngOnInit() {
    this.rentalAds = this.rentalAdService.getRentalAds();
    this.rentalAdsCopy = this.rentalAdService.getRentalAds();
  }

  create(){
    this.router.navigate(['/rental-ads/create']);
  }

  update(rentalAd: RentalAd){
    const params: NavigationExtras = {
      queryParams: {
        rentalAd,
        flag: true
      }
    };
    this.router.navigate(['/rental-ads/create'], params);
  }

  search(evt: any) {
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }
    this.rentalAds = this.rentalAdsCopy.pipe(
      map(items =>
        items.filter(item => item.title.toLowerCase()
        .indexOf(searchTerm.toLowerCase()) > -1))
    );
  }

}
