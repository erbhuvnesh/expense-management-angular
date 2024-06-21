import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  editMode = false;
  userId = 1;

  constructor(private userService: UserService, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profilePicture: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUser(this.userId).subscribe((data: User) => {
      this.user = data;
      this.userForm.patchValue(this.user);
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser = { ...this.user, ...this.userForm.value };
      this.userService.updateUser(updatedUser).subscribe((data: User) => {
        this.user = data;
        this.editMode = false;
        this.snackBar.open('User details updated successfully', 'Close', {
          duration: 2000,
          panelClass: ['green-snackbar']
        });
      });
    }
  }
}
