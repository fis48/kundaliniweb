import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Main } from '../services/main';
import { Content } from '../interfaces';

@Component({
  selector: 'app-top',
  imports: [],
  templateUrl: './top.html',
  styleUrl: './top.css'
})
export class Top {
  private mainService = inject(Main)
  @Input() sectionTitle:string | undefined
  @Output() sendSection = new EventEmitter()
  public sections:Content[] = []

  ngOnInit() {
    this.mainService.requestSections().subscribe({
      next: (resp:any) => {
        this.mainService.setSections(resp.sections as Content[])
        this.setSections()
        if (this.sectionTitle) {
          this.getSection(this.sectionTitle)
        }
      },
      error: err => console.log('Error getting sections:', err)
    })
  }

  /**
   * setSections
   */
  public setSections() {
    this.sections = this.mainService.getSections()
  }

  /**
   * getSection
   */
  public getSection(sectionTitle:string) {
    let section = this.mainService.getSection(sectionTitle)
    this.sendSection.emit(section)
  }

}
