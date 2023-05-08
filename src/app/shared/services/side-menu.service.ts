import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class SideMenuService {
    private isCollapsed = new BehaviorSubject<boolean>(false)
    
    getIsCollapsed(): Observable<boolean> {
        return this.isCollapsed.asObservable()
    }

    collapse() {
        this.isCollapsed.next(!this.isCollapsed.value)
    }
}