import { Component, OnInit } from '@angular/core'
import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons'
import { ListItem, ListService } from './services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  faFolder = faFolder
  faFile = faFile
  currentDirectoryList: Array<ListItem> = []
  currentPath: string = '/'

  constructor (private listService: ListService) {}

  ngOnInit () {
    this.getListing()
  }

  goToDirectory (item?: ListItem) {
    if (!item?.directory) return

    this.getListing(item?.path)
  }

  goBack () {
    const path = this.currentPath.substring(0, this.currentPath.lastIndexOf('/'))

    this.getListing(path)
  }

  getListing (path = '/') {
    this.currentPath = path

    this.listService.getDirectoryListing(this.currentPath).subscribe((list) => {
      this.currentDirectoryList = [...list]
    })
  }
}
