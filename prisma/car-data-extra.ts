import type { BrandData } from './car-data-eu';

export const extraBrands: BrandData[] = [
  {
    name: 'Bugatti',
    models: [
      { name: 'Veyron', generations: [
        { name: '16.4', yearFrom: 2005, yearTo: 2015, bodyType: 'coupe' },
      ]},
      { name: 'Chiron', generations: [
        { name: 'I', yearFrom: 2016, yearTo: 2024, bodyType: 'coupe' },
      ]},
      { name: 'Divo', generations: [
        { name: 'I', yearFrom: 2018, yearTo: 2021, bodyType: 'coupe' },
      ]},
      { name: 'Tourbillon', generations: [
        { name: 'I', yearFrom: 2024, yearTo: null, bodyType: 'coupe' },
      ]},
    ],
  },
  {
    name: 'Maybach',
    models: [
      { name: '57', generations: [
        { name: 'W240', yearFrom: 2002, yearTo: 2012, bodyType: 'sedan' },
      ]},
      { name: '62', generations: [
        { name: 'V240', yearFrom: 2002, yearTo: 2012, bodyType: 'sedan' },
      ]},
    ],
  },
  {
    name: 'Haima',
    models: [
      { name: '3', generations: [
        { name: 'I', yearFrom: 2007, yearTo: 2012, bodyType: 'sedan' },
      ]},
      { name: '7', generations: [
        { name: 'I', yearFrom: 2011, yearTo: 2017, bodyType: 'crossover' },
      ]},
      { name: '8S', generations: [
        { name: 'I', yearFrom: 2019, yearTo: null, bodyType: 'crossover' },
      ]},
      { name: 'S5', generations: [
        { name: 'I', yearFrom: 2014, yearTo: 2019, bodyType: 'crossover' },
      ]},
      { name: 'M3', generations: [
        { name: 'I', yearFrom: 2015, yearTo: 2020, bodyType: 'sedan' },
      ]},
    ],
  },
  {
    name: 'BAW',
    models: [
      { name: 'BJ40', generations: [
        { name: 'I', yearFrom: 2013, yearTo: 2018, bodyType: 'suv' },
      ]},
      { name: 'BJ80', generations: [
        { name: 'I', yearFrom: 2016, yearTo: 2022, bodyType: 'suv' },
      ]},
      { name: 'Luling', generations: [
        { name: 'I', yearFrom: 2008, yearTo: 2015, bodyType: 'pickup' },
      ]},
    ],
  },
  {
    name: 'Changhe',
    models: [
      { name: 'Q7', generations: [
        { name: 'I', yearFrom: 2017, yearTo: 2020, bodyType: 'crossover' },
      ]},
      { name: 'Q35', generations: [
        { name: 'I', yearFrom: 2016, yearTo: 2020, bodyType: 'crossover' },
      ]},
      { name: 'A6', generations: [
        { name: 'I', yearFrom: 2017, yearTo: 2020, bodyType: 'crossover' },
      ]},
    ],
  },
  {
    name: 'Vortex',
    models: [
      { name: 'Tingo', generations: [
        { name: 'I', yearFrom: 2010, yearTo: 2014, bodyType: 'crossover' },
      ]},
      { name: 'Estina', generations: [
        { name: 'I', yearFrom: 2008, yearTo: 2012, bodyType: 'sedan' },
      ]},
      { name: 'Corda', generations: [
        { name: 'I', yearFrom: 2010, yearTo: 2014, bodyType: 'sedan' },
      ]},
    ],
  },
  {
    name: 'DerWays',
    models: [
      { name: 'Cowboy', generations: [
        { name: 'I', yearFrom: 2005, yearTo: 2010, bodyType: 'pickup' },
      ]},
      { name: 'Shuttle', generations: [
        { name: 'I', yearFrom: 2006, yearTo: 2010, bodyType: 'crossover' },
      ]},
      { name: 'Aurora', generations: [
        { name: 'I', yearFrom: 2007, yearTo: 2012, bodyType: 'crossover' },
      ]},
      { name: 'Land Crown', generations: [
        { name: 'I', yearFrom: 2007, yearTo: 2012, bodyType: 'suv' },
      ]},
    ],
  },
  {
    name: 'Scion',
    models: [
      { name: 'tC', generations: [
        { name: 'I (ANT10)', yearFrom: 2004, yearTo: 2010, bodyType: 'coupe' },
        { name: 'II (AGT20)', yearFrom: 2010, yearTo: 2016, bodyType: 'coupe' },
      ]},
      { name: 'xB', generations: [
        { name: 'I (NCP31)', yearFrom: 2003, yearTo: 2007, bodyType: 'hatchback' },
        { name: 'II (NCP110)', yearFrom: 2007, yearTo: 2015, bodyType: 'hatchback' },
      ]},
      { name: 'FR-S', generations: [
        { name: 'I (ZN6)', yearFrom: 2012, yearTo: 2016, bodyType: 'coupe' },
      ]},
      { name: 'iA', generations: [
        { name: 'I', yearFrom: 2015, yearTo: 2016, bodyType: 'sedan' },
      ]},
    ],
  },
  {
    name: 'Proton',
    models: [
      { name: 'X50', generations: [
        { name: 'I', yearFrom: 2020, yearTo: null, bodyType: 'crossover' },
      ]},
      { name: 'X70', generations: [
        { name: 'I', yearFrom: 2018, yearTo: null, bodyType: 'crossover' },
      ]},
      { name: 'Saga', generations: [
        { name: 'III', yearFrom: 2016, yearTo: null, bodyType: 'sedan' },
      ]},
      { name: 'Persona', generations: [
        { name: 'II', yearFrom: 2016, yearTo: null, bodyType: 'sedan' },
      ]},
      { name: 'Iriz', generations: [
        { name: 'I', yearFrom: 2014, yearTo: null, bodyType: 'hatchback' },
      ]},
      { name: 'Exora', vehicleType: "bus", generations: [
        { name: 'I', yearFrom: 2009, yearTo: null, bodyType: 'minivan' },
      ]},
    ],
  },
  {
    name: 'Aiways',
    models: [
      { name: 'U5', generations: [
        { name: 'I', yearFrom: 2019, yearTo: null, bodyType: 'crossover' },
      ]},
      { name: 'U6', generations: [
        { name: 'I', yearFrom: 2022, yearTo: null, bodyType: 'crossover_coupe' },
      ]},
    ],
  },
  {
    name: 'Arcfox',
    models: [
      { name: 'Alpha T', generations: [
        { name: 'I', yearFrom: 2020, yearTo: null, bodyType: 'crossover' },
      ]},
      { name: 'Alpha S', generations: [
        { name: 'I', yearFrom: 2021, yearTo: null, bodyType: 'sedan' },
      ]},
      { name: 'Alpha T5', generations: [
        { name: 'I', yearFrom: 2024, yearTo: null, bodyType: 'crossover' },
      ]},
    ],
  },
  {
    name: 'GAC Aion',
    models: [
      { name: 'S', generations: [
        { name: 'I', yearFrom: 2019, yearTo: 2023, bodyType: 'sedan' },
        { name: 'II (S Plus)', yearFrom: 2023, yearTo: null, bodyType: 'sedan' },
      ]},
      { name: 'Y', generations: [
        { name: 'I', yearFrom: 2021, yearTo: 2024, bodyType: 'crossover' },
        { name: 'II (Y Plus)', yearFrom: 2024, yearTo: null, bodyType: 'crossover' },
      ]},
      { name: 'V', generations: [
        { name: 'I', yearFrom: 2020, yearTo: 2023, bodyType: 'crossover' },
        { name: 'II', yearFrom: 2023, yearTo: null, bodyType: 'crossover' },
      ]},
      { name: 'LX', generations: [
        { name: 'I', yearFrom: 2019, yearTo: null, bodyType: 'suv' },
      ]},
      { name: 'Hyper GT', generations: [
        { name: 'I', yearFrom: 2023, yearTo: null, bodyType: 'sedan' },
      ]},
      { name: 'Hyper SSR', generations: [
        { name: 'I', yearFrom: 2023, yearTo: null, bodyType: 'roadster' },
      ]},
    ],
  },
  {
    name: 'Hafei',
    models: [
      { name: 'Brio', generations: [
        { name: 'I', yearFrom: 2003, yearTo: 2010, bodyType: 'hatchback' },
      ]},
      { name: 'Princip', generations: [
        { name: 'I', yearFrom: 2006, yearTo: 2010, bodyType: 'sedan' },
      ]},
      { name: 'Simbo', generations: [
        { name: 'I', yearFrom: 2006, yearTo: 2010, bodyType: 'hatchback' },
      ]},
      { name: 'Saibao', generations: [
        { name: 'I', yearFrom: 2005, yearTo: 2010, bodyType: 'sedan' },
      ]},
    ],
  },
  {
    name: 'DFSK',
    models: [
      { name: 'Glory 580', generations: [
        { name: 'I', yearFrom: 2016, yearTo: null, bodyType: 'crossover' },
      ]},
      { name: 'Glory i-Auto', generations: [
        { name: 'I', yearFrom: 2020, yearTo: null, bodyType: 'crossover' },
      ]},
      { name: 'Glory 560', generations: [
        { name: 'I', yearFrom: 2017, yearTo: null, bodyType: 'crossover' },
      ]},
      { name: 'Seres 3', generations: [
        { name: 'I', yearFrom: 2020, yearTo: null, bodyType: 'crossover' },
      ]},
    ],
  },
];
