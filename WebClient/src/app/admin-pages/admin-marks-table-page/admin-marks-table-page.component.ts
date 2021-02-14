import { Component, OnInit } from "@angular/core";
import { Mark } from "src/models/entities/mark";
import { MarksService } from "src/models/sevices/marks.service";

@Component({
  selector: 'marks-table-page',
  templateUrl: './admin-marks-table-page.component.html'
})
export class AdminMarksTablePageComponent implements OnInit{
  marks!: Mark[];

  constructor(private marksService: MarksService){}

  ngOnInit(): void {
    this.marksService.getMarks().subscribe((data: any) => {
      this.marks = data as Mark[];
    });
  }
}
