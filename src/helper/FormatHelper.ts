class FormatHelper {
  formatPrice = (price: string) => {
    if (!price) return '';
    const cleaned = price.replace(/[^0-9.]/g, '');
    const [integerPart, decimalPart] = cleaned.split('.');
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ',',
    );
    const formattedDecimalPart = decimalPart ? decimalPart.substring(0, 2) : '';
    return formattedDecimalPart
      ? `${formattedIntegerPart}.${formattedDecimalPart}`
      : formattedIntegerPart;
  };
  formatNumber = (number: number): number => {
    let formattedNumber = number.toString().replace(/,/g, '');
    return Number(formattedNumber);
  };
  extractWordWithPrefix(text: string) {
    const match = text.match(/[\[\{](.*?)[\]\}]/);
    if (match) {
      return match[1];
    }
    return null;
  }
  extractWithSuffix(text: string) {
    const match = text.match(/[\[\{](.*?)[\]\}]/);
    if (match) {
      return match[1];
    }
    return null;
  }
  replacePrefixedWord(text: string) {
    const match = text.match(/[\[\{](.*?)[\]\}]/);
    if (match) {
      const word = match[1];
      const updatedText = text.replace(match[0], word);
      return updatedText;
    }
    return text;
  }
  convertArrayToLowerCase = (array: any[]) => {
    return array?.map(c => c.toLocaleLowerCase()) || [];
  };
}
export default new FormatHelper();
