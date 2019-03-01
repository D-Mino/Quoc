import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  public script: string;
  constructor() {
    this.script = `
    <script>
      window.addEventListener('load', function () {
          document.getElementById('connectionTypeVNC').click();
          document.getElementById('connectBtn').click();
      })
    </script>`;
  }

  ngOnInit() {}
}
