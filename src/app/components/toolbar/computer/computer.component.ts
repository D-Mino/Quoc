import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { DialogComponent } from '@components/dialog/dialog.component';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.scss']
})
export class ComputerComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'ip',
    'description',
    'system',
    'memory',
    'cpu',
    'actions'
  ];
  dataSource = new MatTableDataSource([
    {
      name: 'May 01',
      ip: '172.16.101.11',
      description: 'Server',
      system: 'Windows 10 Pro',
      memory: '8 gb',
      cpu: 4
    }
  ]);
  public computers: any[];

  constructor(
    private _dialog: MatDialog,
    private _api: ApiService
  ) {
    this.computers = [];
  }

  ngOnInit() {
    this.getList();
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getList() {
    this._api.get('diagram').subscribe(response => {
      this.computers = response;
      this.dataSource.data = this.computers;
    });
  }

  public addComputer() {
    this.open(
      AddComponent,
      {
        maxWidth: '500px',
      },
      (result) => {
        this._api.post('diagram', result).subscribe(response => {
          this.computers.push(response);
          this.dataSource.data = this.computers;
        });
      }
    );
  }

  public deleteScript(cpu, e) {
    e.stopPropagation();
    this.open(DialogComponent, {}, result => {
      this._api.delete('diagram/' + cpu.id).subscribe(response => {
        this.computers = this.computers.filter(c => c.id !== cpu.id);
        this.dataSource.data = this.computers;
      });
    });
  }

  private open(component, options, success) {
    const dialogRef = this._dialog.open(
      component,
      Object.assign(
        {
          width: '80%',
          maxWidth: '500px',
          autoFocus: false
        },
        options
      )
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        success(result);
      }
    });
  }
}
