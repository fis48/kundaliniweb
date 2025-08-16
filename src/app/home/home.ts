import { Component, inject } from '@angular/core';
import { Main } from '../services/main';
import { Content } from '../interfaces';
import { Top } from '../top/top';

@Component({
  selector: 'app-home',
  imports: [
    Top
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private mainService = inject(Main)
  public apiUrl:string | undefined
  public section:Content | undefined
  public content:Content | undefined
  public contentChildren:Content[] = []

  ngOnInit() {
    this.apiUrl = this.mainService.getApiUrl()
  }

  /**
   * handleSection
   */
  public handleSection(section:Content) {
    this.clearContent()
    this.section = section
  }

  /**
   * getContent
   */
  public getContent(id:string) {
    this.clearContent()
    this.mainService.getContent(id).subscribe({
      next: content => {
        this.content = content as Content
        this.handleChildren()
      },
      error: err => console.log("Error getting content:", err)
    })
  }

  /**
   * handleChildren
   */
  public handleChildren() {
    if (this.content && this.content.children) {
      this.content.children.forEach((child:Content) => {
        if (child.id) {
          this.mainService.getContent(child.id).subscribe({
            next: (ch:any) => {
              this.contentChildren.push(ch as Content)
            },
            error: err => console.log('Error getting child', err)
          })        
        }
      });
    }
  }

  /**
   * clearContent
   */
  public clearContent() {
    this.content = undefined
    this.contentChildren = []    
  }
}
