import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExchangeRatesService } from '../../services/exchange-rates.service';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  displayedColumns: string[] = ['currency', 'rate'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private exchangeRatesService: ExchangeRatesService) { }

  ngOnInit(): void {
    this.loadExchangeRates();
  }

  loadExchangeRates(): void {
    this.exchangeRatesService.getExchangeRates().subscribe(rates => {
      this.dataSource.data = Object.entries(rates).map(([key, value]) => ({ currency: key, rate: value }));
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
