import { Router } from '@angular/router';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { EmitService } from 'src/app/services/emit.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userResponse?: UserResponse | null
  isPopoverOpen = false;
  activeNavItem: number = 0;
 userChangedSubscription: Subscription | undefined;

  constructor(private userService: UserService, private popoverConfig: NgbPopoverConfig, private tokenService: TokenService, private router: Router, private emitService: EmitService) { }
  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }


  handleItemClick(index: number): void {
    if(index === 0) {
      this.router.navigate(['/user-profile'])
    }
    if(index === 2) {
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserFromLocalStorage();
    }
    this.isPopoverOpen = false; //close the popover after clicking an item
  }


  ngOnInit(): void {
    this.userResponse = this.userService.getUserFromLocalStorage();
    //đăng kí nhận sự kiện khi user thay đổi cập nhật or đăng nhập để get data
    this.userChangedSubscription = this.emitService.userChanged.subscribe(() => {
      this.handleUserChange();
    });

  }

  ngOnDestroy(): void {

    if (this.userChangedSubscription) {
      this.userChangedSubscription.unsubscribe();
    }
  }
  setActiveNavItem(index: number) {

    this.activeNavItem = index;
  }
  handleUserChange() {

    this.userResponse = this.userService.getUserFromLocalStorage();
  }

}
