import type { BrandData } from './car-data-eu';

function truck(name: string, generations: BrandData['models'][0]['generations']): BrandData['models'][0] {
  return { name, generations, vehicleType: 'truck' };
}

function bus(name: string, generations: BrandData['models'][0]['generations']): BrandData['models'][0] {
  return { name, generations, vehicleType: 'bus' };
}

export const truckBusBrands: BrandData[] = [
  // ─── Trucks ───
  {
    name: 'Scania',
    models: [
      truck('R series', [
        { name: '5 series', yearFrom: 2004, yearTo: 2016, bodyType: 'truck' },
        { name: '6 series', yearFrom: 2009, yearTo: 2017, bodyType: 'truck' },
        { name: 'Next Gen', yearFrom: 2017, yearTo: null, bodyType: 'truck' },
      ]),
      truck('P series', [
        { name: '4 series', yearFrom: 1996, yearTo: 2004, bodyType: 'truck' },
        { name: '5 series', yearFrom: 2004, yearTo: 2016, bodyType: 'truck' },
        { name: '6 series', yearFrom: 2016, yearTo: null, bodyType: 'truck' },
      ]),
      truck('G series', [
        { name: '5 series', yearFrom: 2007, yearTo: 2016, bodyType: 'truck' },
        { name: '6 series', yearFrom: 2016, yearTo: null, bodyType: 'truck' },
      ]),
      truck('S series', [
        { name: 'Next Gen', yearFrom: 2016, yearTo: null, bodyType: 'truck' },
      ]),
    ],
  },
  {
    name: 'MAN',
    models: [
      truck('TGX', [
        { name: 'I', yearFrom: 2007, yearTo: 2020, bodyType: 'truck' },
        { name: 'II', yearFrom: 2020, yearTo: null, bodyType: 'truck' },
      ]),
      truck('TGS', [
        { name: 'I', yearFrom: 2007, yearTo: 2021, bodyType: 'truck' },
        { name: 'II', yearFrom: 2021, yearTo: null, bodyType: 'truck' },
      ]),
      truck('TGL', [
        { name: 'I', yearFrom: 2005, yearTo: null, bodyType: 'truck' },
      ]),
    ],
  },
  {
    name: 'DAF',
    models: [
      truck('XF', [
        { name: '105', yearFrom: 2006, yearTo: 2013, bodyType: 'truck' },
        { name: 'Euro 6', yearFrom: 2013, yearTo: null, bodyType: 'truck' },
      ]),
      truck('CF', [
        { name: 'Euro 5', yearFrom: 2006, yearTo: 2013, bodyType: 'truck' },
        { name: 'Euro 6', yearFrom: 2013, yearTo: null, bodyType: 'truck' },
      ]),
      truck('LF', [
        { name: 'Euro 5', yearFrom: 2006, yearTo: 2013, bodyType: 'truck' },
        { name: 'Euro 6', yearFrom: 2013, yearTo: null, bodyType: 'truck' },
      ]),
    ],
  },
  {
    name: 'Volvo Trucks',
    models: [
      truck('FH', [
        { name: '3rd gen', yearFrom: 2002, yearTo: 2012, bodyType: 'truck' },
        { name: '4th gen', yearFrom: 2012, yearTo: null, bodyType: 'truck' },
      ]),
      truck('FM', [
        { name: '3rd gen', yearFrom: 2005, yearTo: 2013, bodyType: 'truck' },
        { name: '4th gen', yearFrom: 2013, yearTo: null, bodyType: 'truck' },
      ]),
      truck('FMX', [
        { name: 'I', yearFrom: 2010, yearTo: null, bodyType: 'truck' },
      ]),
    ],
  },
  {
    name: 'Iveco',
    models: [
      truck('Stralis', [
        { name: 'I', yearFrom: 2002, yearTo: 2012, bodyType: 'truck' },
        { name: 'Hi-Way', yearFrom: 2012, yearTo: 2019, bodyType: 'truck' },
      ]),
      truck('S-Way', [
        { name: 'I', yearFrom: 2019, yearTo: null, bodyType: 'truck' },
      ]),
      truck('Eurocargo', [
        { name: 'IV', yearFrom: 2008, yearTo: 2015, bodyType: 'truck' },
        { name: 'V', yearFrom: 2015, yearTo: null, bodyType: 'truck' },
      ]),
    ],
  },
  {
    name: 'Renault Trucks',
    models: [
      truck('T', [
        { name: 'I', yearFrom: 2013, yearTo: null, bodyType: 'truck' },
      ]),
      truck('T High', [
        { name: 'I', yearFrom: 2015, yearTo: null, bodyType: 'truck' },
      ]),
      truck('D', [
        { name: 'I', yearFrom: 2013, yearTo: null, bodyType: 'truck' },
      ]),
    ],
  },
  {
    name: 'МАЗ',
    models: [
      truck('5440', [
        { name: 'I', yearFrom: 2003, yearTo: null, bodyType: 'truck' },
      ]),
      truck('6430', [
        { name: 'I', yearFrom: 2000, yearTo: null, bodyType: 'truck' },
      ]),
      truck('5340', [
        { name: 'I', yearFrom: 2005, yearTo: null, bodyType: 'truck' },
      ]),
    ],
  },
  {
    name: 'КамАЗ',
    models: [
      truck('5490', [
        { name: 'Neo', yearFrom: 2013, yearTo: null, bodyType: 'truck' },
      ]),
      truck('65115', [
        { name: 'I', yearFrom: 1998, yearTo: null, bodyType: 'truck' },
      ]),
      truck('65222', [
        { name: 'I', yearFrom: 2010, yearTo: null, bodyType: 'truck' },
      ]),
      truck('54901', [
        { name: 'I', yearFrom: 2019, yearTo: null, bodyType: 'truck' },
      ]),
    ],
  },

  // ─── Buses ───
  {
    name: 'Setra',
    models: [
      bus('S 500', [
        { name: 'ComfortClass', yearFrom: 2012, yearTo: null, bodyType: 'bus' },
      ]),
      bus('S 400', [
        { name: 'I', yearFrom: 2001, yearTo: 2014, bodyType: 'bus' },
      ]),
      bus('S 300', [
        { name: 'I', yearFrom: 1991, yearTo: 2001, bodyType: 'bus' },
      ]),
    ],
  },
  {
    name: 'Neoplan',
    models: [
      bus('Cityliner', [
        { name: 'II', yearFrom: 2006, yearTo: null, bodyType: 'bus' },
      ]),
      bus('Skyliner', [
        { name: 'II', yearFrom: 2006, yearTo: null, bodyType: 'bus' },
      ]),
      bus('Tourliner', [
        { name: 'II', yearFrom: 2006, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
  {
    name: 'МАЗ',
    models: [
      bus('203', [
        { name: 'I', yearFrom: 2005, yearTo: null, bodyType: 'bus' },
      ]),
      bus('206', [
        { name: 'I', yearFrom: 2014, yearTo: null, bodyType: 'bus' },
      ]),
      bus('256', [
        { name: 'I', yearFrom: 2017, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
  {
    name: 'ПАЗ',
    models: [
      bus('3205', [
        { name: 'I', yearFrom: 1989, yearTo: null, bodyType: 'bus' },
      ]),
      bus('Vector Next', [
        { name: 'I', yearFrom: 2017, yearTo: null, bodyType: 'bus' },
      ]),
      bus('4234', [
        { name: 'I', yearFrom: 2003, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
  {
    name: 'ЛиАЗ',
    models: [
      bus('5292', [
        { name: 'I', yearFrom: 2004, yearTo: null, bodyType: 'bus' },
      ]),
      bus('6213', [
        { name: 'I', yearFrom: 2007, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
  {
    name: 'Mercedes-Benz',
    models: [
      bus('Tourismo', [
        { name: 'I', yearFrom: 2005, yearTo: null, bodyType: 'bus' },
      ]),
      bus('Travego', [
        { name: 'I', yearFrom: 1999, yearTo: 2016, bodyType: 'bus' },
      ]),
      bus('Citaro', [
        { name: 'II', yearFrom: 2011, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
];
