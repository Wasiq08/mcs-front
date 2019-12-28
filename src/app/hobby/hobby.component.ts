import { Component, OnInit, Input, Inject } from '@angular/core';
import { User } from '../shared/models/user';
import { Hobby } from '../shared/models/hobby';
import { HobbyService } from '../shared/services/hobby/hobby.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Passion {
  value: string;
  name: string;
}

const ELEMENT_DATA: Hobby[] = [
  { name: 'Hydrogen', passionLevel: 'Medium', year: '1992' },
  { name: 'Hydrogen', passionLevel: 'Medium', year: '1992' },
  { name: 'Hydrogen', passionLevel: 'Medium', year: '1992' },
  { name: 'Hydrogen', passionLevel: 'Medium', year: '1992' },

];

@Component({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.css']
})
export class HobbyComponent implements OnInit {

  @Input() selectedUser;
  isUserSelected: Boolean = false;
  selectedPassion: any;
  hobby: Hobby = {} as any;
  passion: Passion[] = [
    { value: 'Low', name: 'Low' },
    { value: 'Medium', name: 'Medium' },
    { value: 'High', name: 'High' },
    { value: 'Very-High', name: 'Very-High' }
  ];
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['Passion Level', 'Hobby', 'Year'];

  constructor(private _HobbyService: HobbyService, public dialog: MatDialog) {

  }

  ngOnChanges() {

    if (this.selectedUser) {
      this.isUserSelected = true;
      this.fetchHobby();
    }
  }
  ngOnInit() {

  }
  addHobby() {

    this.hobby.userId = this.selectedUser._id;
    this._HobbyService.addHobby(this.hobby).subscribe((result: any) => {
      console.log('result', result);
      if (result.success === true) {
        this.fetchHobby();
      }
    });
  }

  fetchHobby() {
    this._HobbyService.getUserHobby(this.selectedUser._id).subscribe((hobbies: any) => {
      this.dataSource = hobbies.data;
    });
  }

  deleteHobby(Hobby) {
    const dialogRef = this.dialog.open(HobbyConfirmDialog, {
      width: '250px',
      data: { Hobby: Hobby }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchHobby();
    });
  }
}

@Component({
  selector: 'hobby-delete',
  templateUrl: '../shared/dialog/confirm.html',
})

export class HobbyConfirmDialog {

  constructor(
    public dialogRef: MatDialogRef<HobbyConfirmDialog>,
    private _HobbyService: HobbyService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteUserHobby() {
    this.removeHobby(this.data.Hobby)
  }

  removeHobby(Hobby) {
    this._HobbyService.deleteHobby(Hobby._id, Hobby.userId).subscribe((result: any) => {
      this.dialogRef.close();
    });
  }

}
