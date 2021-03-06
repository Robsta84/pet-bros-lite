import { Component, OnInit } from '@angular/core';
import { Router } from '../../common';

import { PetFinderService } from 'petfinder-angular-service';
import { AvailableValues } from 'petfinder-angular-service/models';
import { KeyLabel } from '../../models/key-label';

@Component({
  selector: 'petbros-shelter-search',
  templateUrl: './shelter-search.component.html',
  styleUrls: ['./shelter-search.component.scss']
})
export class ShelterSearchComponent implements OnInit {
  public location = 'Boston, MA';
  public name = '';

  public availableValues = AvailableValues;
  public animal = '';
  public breed = '';

  public animals: KeyLabel[];
  public breeds: KeyLabel[];

  constructor(
    private router: Router,
    private petfinderService: PetFinderService) { }

  ngOnInit() {
    this.animals = KeyLabel.mapAvailableValues(AvailableValues.animal, 'Any Animal');
    this.breeds = KeyLabel.mapAvailableValues([], 'Any Breed');
  }

  refreshBreeds() {
    this.breed = '';
    if (this.animal) {
      this.petfinderService.breedList(this.animal)
      .then(breeds => this.breeds = KeyLabel.mapAvailableValues(breeds, 'Any breed'));
    } else {
      this.breeds = [];
    }
  }

  findShelters() {
    const navigationExtras = {
      queryParams: {
        searchByBreed: false,
        location: this.location,
        name: this.name
      }
    };
    this.router.navigate(['shelterSearch/results'], navigationExtras);
  }

  findSheltersByBreed() {
    const navigationExtras = {
      queryParams: {
        searchByBreed: true,
        animal: this.animal,
        breed: this.breed
      }
    };
    this.router.navigate(['shelterSearch/results'], navigationExtras);
  }

}
