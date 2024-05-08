const { interval, Subject, takeUntil } = require("rxjs");

const stop = new Subject();

const intervalObservable = interval(1000);

intervalObservable.pipe(takeUntil(stop)).subscribe(console.log);

setTimeout(() => {
  console.log("STOP!");
  stop.next();
}, 5000);
