import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { map } from 'rxjs'

export interface ListItem {
  name: string
  directory: boolean
  path: string
  extension: string
  size: string
  createdAt: Date
  permissions: Permissions
}

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor (private http: HttpClient, private toast: ToastrService) { }

  getDirectoryListing (path: string = '/') {
    return this.http.post<any>('/api/list', { path })
      .pipe(map((response: { success: boolean, message?: string, data: Array<ListItem> }) => {
        if (response.success) {
          return response.data
        } else {
          this.toast.error(response.message, 'Error')
          return []
        }
      }))

  }
}
