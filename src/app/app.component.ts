import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { AgGridAngular } from "ag-grid-angular";
import {
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  NumberFilterModule,
  SideBarDef,
  TextFilterModule,
  ValidationModule,
} from "ag-grid-community";
import {
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  PivotModule,
  SetFilterModule,
} from "ag-grid-enterprise";
ModuleRegistry.registerModules([
  NumberFilterModule,
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
  PivotModule,
  TextFilterModule,
  ValidationModule /* Development Only */,
]);

export interface IOlympicData {
    athlete: string,
    age: number,
    country: string,
    year: number,
    date: string,
    sport: string,
    gold: number,
    silver: number,
    bronze: number,
    total: number
}


@Component({
  selector: 'app-root',
  imports: [AgGridAngular],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
                                    styles: [
                                      `

                                      html, body {
                                        height: 200px !important;
                                      }


                                      `,
                                    ],
})
export class AppComponent {
  showGrid = true; // Set to false to hide the grid

    columnDefs: ColDef[] = [
      { field: "athlete", filter: "agTextColumnFilter", minWidth: 200 },
      { field: "age" },
      { field: "country", minWidth: 180 },
      { field: "year" },
      { field: "date", minWidth: 150 },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];
    defaultColDef: ColDef = {
      flex: 1,
      minWidth: 100,
      // allow every column to be aggregated
      enableValue: true,
      // allow every column to be grouped
      enableRowGroup: true,
      // allow every column to be pivoted
      enablePivot: true,
      filter: true,
    };
    autoGroupColumnDef: ColDef = {
      minWidth: 200,
    };
    rowData!: IOlympicData[];
    sideBar: SideBarDef = {
      toolPanels: [
        {
          id: "filters",
          labelDefault: "Filters",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
        },

      ],position: "left",
      defaultToolPanel: "filters",
    };

    constructor(private http: HttpClient) {}

    onGridReady(params: GridReadyEvent<IOlympicData>) {
      this.http
        .get<IOlympicData[]>(
          "https://www.ag-grid.com/example-assets/olympic-winners.json"
        )
        .subscribe((data) => {console.log(data);this.rowData = data});
    }
}
