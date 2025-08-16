import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Content } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class Main {
  private http = inject(HttpClient)
  private apiUrl:string = environment.apiUrl
  private sections = signal<Content[]>([])


  /**
   * getApiUrl
   */
  public getApiUrl() {
    return this.apiUrl
  }

  /**
   * getSections
   */
  public requestSections() {
    const headers = new HttpHeaders({
      'X-Company-Id': environment.companyId
    })

    return this.http.get(
      `${this.apiUrl}/webcontents/sections`,
      { headers }
    )
  }

  /**
   * setSections
   */
  public setSections(sections:Content[]) {
    this.sections.set(sections)
  }

  /**
   * getSections
   */
  public getSections() {
    return this.sections()
  }

  /**
   * getSection
   */
  public getSection(title:string): Content | undefined {
    const section = this.sections().find(s => s.title == title)
    return section
  }

  /**
   * getContent
   */
  public getContent(id:string) {
    return this.http.get(
      `${this.apiUrl}/webcontents/${id}`
    )
  }

}
