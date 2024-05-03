export class DateFormatter {

  date = new Date()
 
  
  formatDateToYYYYMMDD(): string {
    const year = this.date.getFullYear();
    const month = (this.date.getMonth() + 1).toString().padStart(2, "0");
    const day = this.date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  formatDateToDDMMYYYY(date:Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}.${month}.${year}`;
  }
formatStartDate(): string {
  const date = new Date();
  date.setDate(this.date.getDate() - 7);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

}
