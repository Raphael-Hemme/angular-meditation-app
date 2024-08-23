import { computed, Injectable, signal } from '@angular/core';
import { DateTime, Duration } from 'luxon';

export type Break = {
  startTime: DateTime;
  endTime: DateTime;
};

export type Session = {
  startTimeStamp: DateTime;
  endTimeStamp: null | DateTime;
  breaks: Break[];
  duration: Duration;
};

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private ZERO_DURATION = Duration.fromMillis(0);

  public currSessionStart = signal<null | DateTime>(null);
  public currSessionEnd = signal<null | DateTime>(null);
  public currSessionBreak = signal<null | Break>(null);
  public currSessionBreaks = signal<Break[]>([]);
  public currSessionDur = signal<Duration>(this.ZERO_DURATION);

  public currSession = computed(() => {
    return {
      startTime: this.currSessionStart(),
      endTime: this.currSessionEnd(),
      breaks: this.currSessionBreaks(),
      duration: this.currSessionDur(),
    };
  });

  constructor() {}

  public generateNewSession(): Session {
    return {
      startTimeStamp: DateTime.now(),
      endTimeStamp: null,
      breaks: [],
      duration: this.ZERO_DURATION,
    };
  }

  public saveSession(): void {
    console.log('saving....');
    console.log(
      'start: ',
      this.currSession().startTime?.toFormat('dd.LL.yyyy - hh:mm:ss')
    );
    console.log(
      'end: ',
      this.currSession().endTime?.toFormat('dd.LL.yyyy - hh:mm:ss')
    );
    console.log(
      'duration: ',
      this.currSession().duration?.toFormat('hh:mm:ss')
    );
    console.log('----- Breaks -----');
    for (const b of this.currSession().breaks) {
      console.log('start: ', b.startTime.toFormat('hh:mm:ss'));
      console.log('end: ', b.endTime.toFormat('hh:mm:ss'));
      console.log('-----');
    }
  }
}
