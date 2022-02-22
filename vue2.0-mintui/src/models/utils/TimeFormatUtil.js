export class TimeFormatUtil {
  static getDurationDescription(flight) {
    let duartionMin = flight.getDurationInMinute();

    let day = Math.floor(duartionMin / (24 * 60));
    let minuteLeft = Math.floor(duartionMin % (24 * 60));
    let hour = Math.floor(minuteLeft / 60);
    let minute = Math.floor(minuteLeft % 60);
    let des = day == 0 ? "" : day + "d ";
    des += hour + "h ";
    des += minute + "m";
    return des;
  }

  static getDisplayHourAndMinute(date) {
    let h = date.getHours().toString();
    h = h.length == 1 ? "0".concat(h) : h;

    let m = date.getMinutes().toString();
    m = m.length == 1 ? "0".concat(m) : m;

    return h + ":" + m;
  }
  static getYearMonthDateString(date) { 
    if (date == "") {
      return;
    } else {
      let y = String(date.getFullYear());
      let m = String(date.getMonth() + 1);
      let d = String(date.getDate());

      m = m.length == 1 ? "0".concat(m) : m;
      d = d.length == 1 ? "0".concat(d) : d;

      return y + "-" + m + "-" + d;
    }
    // else if (date.indexOf(":")) {
    //   let td = date.split("T")[0];
    //   return (date = new Date(Date.parse(td.replace(/-/g, "/"))));
    // }
  }

  static getYearMonthDateStringSpe(date) {
    if (date == "") {
      return;
    }
    let y = String(date.getFullYear());
    let m = String(date.getMonth() + 1);
    let d = String(date.getDate());

    m = m.length == 1 ? "0".concat(m) : m;
    d = d.length == 1 ? "0".concat(d) : d;

    return d + "-" + m + "-" + y;
  }

  static getBookDetailDate(date) {
    let y = String(date.getFullYear());
    let m = this.getMonthDescription(date.getMonth()).replace(/\./g, "");
    let d = String(date.getDate());

    d = d.length == 1 ? "0".concat(d) : d;

    return d + " " + m + " " + y;
  }

  static getOrderDetailDate(date) {
    let t = new Date(date);
    let y = t.getFullYear();
    let m = this.getMonthDescription(t.getMonth());
    let d = t.getDate();
    let w = this.getWeekDayDescription(t.getDay());
    return w + "," + d + " " + m + "," + y;
  }

  static getWalletDate(date) {
    let t = new Date(date);
    let y = t.getFullYear();
    let m = this.getMonthDescription(t.getMonth()).replace(/\./g, "");
    let d = t.getDate();
    return d + " " + m + " " + y;
  }

  static getWeekDayDescription(dayOfWeek) {
    switch (dayOfWeek) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
    }
  }

  static getMonthDescription(monthOfYear) {
    switch (monthOfYear) {
      case 0:
        return "Jan.";
      case 1:
        return "Feb.";
      case 2:
        return "Mar.";
      case 3:
        return "Apr.";
      case 4:
        return "May.";
      case 5:
        return "Jun.";
      case 6:
        return "Jul.";
      case 7:
        return "Aug.";
      case 8:
        return "Sep.";
      case 9:
        return "Oct.";
      case 10:
        return "Nov.";
      case 11:
        return "Dec.";
    }
  }
}
