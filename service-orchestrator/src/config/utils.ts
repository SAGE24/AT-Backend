export class Utils {
  static getCurrentDate(): string {
    const dateNow = new Date();
    return `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;
  }
}
