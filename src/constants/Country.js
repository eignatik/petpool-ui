import {countries} from "countries-list";

export class Country {
  static countriesWithoutFlags = ['AQ', 'BL', 'BQ', 'CW', 'GG', 'IM', 'JE', 'MF', 'SS', 'SX', 'XK'];

  static getCountriesForDropDownUi() {
    return Object.keys(countries).filter(x => this.countriesWithoutFlags.indexOf(x) === -1)
      .map(x => {
        let key = x.toLowerCase();
        return {key: key, value: key, flag: key, text: countries[x].name};
       });
  }
}