import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { IPartners } from './types/partner.type';
import { partners } from './partners.data';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './partners.component.html'
})
export class PartnersComponent {
  partners: IPartners[] = partners;
}
