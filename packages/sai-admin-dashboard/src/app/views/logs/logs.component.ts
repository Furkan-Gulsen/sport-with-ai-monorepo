import { Component, OnInit } from '@angular/core';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  constructor(private logsService: LogsService) {}

  public logs: any[] = [];

  ngOnInit(): void {
    this.getLogs();
  }

  private getLogs(): void {
    this.logsService.getLogs().subscribe((logs: any) => {
      console.log(logs);
      this.logs = logs;
    });
  }
}
