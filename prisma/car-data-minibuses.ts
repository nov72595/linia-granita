import type { BrandData } from './car-data-eu';

function mb(name: string, generations: BrandData['models'][0]['generations']): BrandData['models'][0] {
  return { name, generations, vehicleType: 'bus' };
}

export const minibusBrands: BrandData[] = [
  {
    name: 'Mercedes-Benz',
    models: [
      mb('Sprinter', [
        { name: 'T1N (W901–905)', yearFrom: 1995, yearTo: 2006, bodyType: 'van' },
        { name: 'NCV3 (W906)', yearFrom: 2006, yearTo: 2018, bodyType: 'van' },
        { name: 'VS30 (W907/910)', yearFrom: 2018, yearTo: null, bodyType: 'van' },
      ]),
      mb('Viano', [
        { name: 'W639', yearFrom: 2003, yearTo: 2014, bodyType: 'van' },
      ]),
      mb('V-Class', [
        { name: 'W447', yearFrom: 2014, yearTo: null, bodyType: 'van' },
      ]),
      mb('MB100', [
        { name: 'MB100', yearFrom: 1981, yearTo: 1996, bodyType: 'van' },
      ]),
      mb('T1', [
        { name: 'T1 (W601–602)', yearFrom: 1977, yearTo: 1995, bodyType: 'van' },
      ]),
      mb('Citan', [
        { name: 'W415', yearFrom: 2012, yearTo: 2021, bodyType: 'van' },
        { name: 'W420', yearFrom: 2021, yearTo: null, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'Volkswagen',
    models: [
      mb('Crafter', [
        { name: 'Crafter I', yearFrom: 2006, yearTo: 2016, bodyType: 'van' },
        { name: 'Crafter II', yearFrom: 2016, yearTo: null, bodyType: 'van' },
      ]),
      mb('Transporter', [
        { name: 'T3', yearFrom: 1979, yearTo: 1992, bodyType: 'van' },
        { name: 'T4', yearFrom: 1990, yearTo: 2003, bodyType: 'van' },
        { name: 'T5', yearFrom: 2003, yearTo: 2015, bodyType: 'van' },
        { name: 'T6', yearFrom: 2015, yearTo: 2019, bodyType: 'van' },
        { name: 'T6.1', yearFrom: 2019, yearTo: null, bodyType: 'van' },
      ]),
      mb('Caravelle', [
        { name: 'T4', yearFrom: 1990, yearTo: 2003, bodyType: 'van' },
        { name: 'T5', yearFrom: 2003, yearTo: 2015, bodyType: 'van' },
        { name: 'T6', yearFrom: 2015, yearTo: 2019, bodyType: 'van' },
        { name: 'T6.1', yearFrom: 2019, yearTo: null, bodyType: 'van' },
      ]),
      mb('LT', [
        { name: 'LT I', yearFrom: 1975, yearTo: 1996, bodyType: 'van' },
        { name: 'LT II', yearFrom: 1996, yearTo: 2006, bodyType: 'van' },
      ]),
      mb('ID. Buzz', [
        { name: 'ID. Buzz', yearFrom: 2022, yearTo: null, bodyType: 'minivan' },
      ]),
    ],
  },
  {
    name: 'Ford',
    models: [
      mb('Transit Custom', [
        { name: 'Transit Custom I', yearFrom: 2012, yearTo: 2023, bodyType: 'van' },
        { name: 'Transit Custom II', yearFrom: 2023, yearTo: null, bodyType: 'van' },
      ]),
      mb('Tourneo Custom', [
        { name: 'Tourneo Custom I', yearFrom: 2012, yearTo: 2023, bodyType: 'van' },
        { name: 'Tourneo Custom II', yearFrom: 2023, yearTo: null, bodyType: 'van' },
      ]),
      mb('Tourneo Connect', [
        { name: 'Tourneo Connect I', yearFrom: 2002, yearTo: 2013, bodyType: 'van' },
        { name: 'Tourneo Connect II', yearFrom: 2013, yearTo: 2022, bodyType: 'van' },
        { name: 'Tourneo Connect III', yearFrom: 2022, yearTo: null, bodyType: 'van' },
      ]),
      mb('Tourneo Courier', [
        { name: 'Tourneo Courier I', yearFrom: 2014, yearTo: null, bodyType: 'van' },
      ]),
      mb('E-Transit', [
        { name: 'E-Transit', yearFrom: 2022, yearTo: null, bodyType: 'van' },
      ]),
      mb('Transit Courier', [
        { name: 'Transit Courier I', yearFrom: 2014, yearTo: null, bodyType: 'van' },
      ]),
      mb('Econovan / Spectron', [
        { name: 'Econovan', yearFrom: 1979, yearTo: 1999, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'Renault',
    models: [
      mb('Master', [
        { name: 'Master I', yearFrom: 1980, yearTo: 1998, bodyType: 'van' },
        { name: 'Master II', yearFrom: 1998, yearTo: 2010, bodyType: 'van' },
        { name: 'Master III', yearFrom: 2010, yearTo: null, bodyType: 'van' },
      ]),
      mb('Trafic', [
        { name: 'Trafic I', yearFrom: 1981, yearTo: 2001, bodyType: 'van' },
        { name: 'Trafic II', yearFrom: 2001, yearTo: 2014, bodyType: 'van' },
        { name: 'Trafic III', yearFrom: 2014, yearTo: null, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'Peugeot',
    models: [
      mb('Boxer', [
        { name: 'Boxer I', yearFrom: 1994, yearTo: 2006, bodyType: 'van' },
        { name: 'Boxer II', yearFrom: 2006, yearTo: 2014, bodyType: 'van' },
        { name: 'Boxer III', yearFrom: 2014, yearTo: null, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'Citroën',
    models: [
      mb('Jumper', [
        { name: 'Jumper I', yearFrom: 1994, yearTo: 2006, bodyType: 'van' },
        { name: 'Jumper II', yearFrom: 2006, yearTo: 2014, bodyType: 'van' },
        { name: 'Jumper III', yearFrom: 2014, yearTo: null, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'Fiat',
    models: [
      mb('Scudo', [
        { name: 'Scudo I', yearFrom: 1996, yearTo: 2007, bodyType: 'van' },
        { name: 'Scudo II', yearFrom: 2007, yearTo: 2016, bodyType: 'van' },
      ]),
      mb('Talento', [
        { name: 'Talento', yearFrom: 2016, yearTo: 2021, bodyType: 'van' },
      ]),
      mb('Ulysse', [
        { name: 'Ulysse I', yearFrom: 1994, yearTo: 2002, bodyType: 'minivan' },
        { name: 'Ulysse II', yearFrom: 2002, yearTo: 2010, bodyType: 'minivan' },
      ]),
      mb('E-Ducato', [
        { name: 'E-Ducato', yearFrom: 2021, yearTo: null, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'Opel',
    models: [
      mb('Movano', [
        { name: 'Movano A', yearFrom: 1998, yearTo: 2010, bodyType: 'van' },
        { name: 'Movano B', yearFrom: 2010, yearTo: 2021, bodyType: 'van' },
        { name: 'Movano C', yearFrom: 2021, yearTo: null, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'Iveco',
    models: [
      mb('Daily', [
        { name: 'Daily III', yearFrom: 1999, yearTo: 2006, bodyType: 'van' },
        { name: 'Daily IV', yearFrom: 2006, yearTo: 2011, bodyType: 'van' },
        { name: 'Daily V', yearFrom: 2011, yearTo: 2014, bodyType: 'van' },
        { name: 'Daily VI', yearFrom: 2014, yearTo: 2019, bodyType: 'van' },
        { name: 'Daily VII', yearFrom: 2019, yearTo: null, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'MAN',
    models: [
      mb('TGE', [
        { name: 'TGE I', yearFrom: 2017, yearTo: null, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'Nissan',
    models: [
      mb('NV200', [
        { name: 'NV200', yearFrom: 2009, yearTo: 2021, bodyType: 'van' },
      ]),
      mb('NV300', [
        { name: 'NV300', yearFrom: 2016, yearTo: null, bodyType: 'van' },
      ]),
      mb('NV400', [
        { name: 'NV400', yearFrom: 2010, yearTo: null, bodyType: 'van' },
      ]),
      mb('Primastar', [
        { name: 'Primastar I', yearFrom: 2001, yearTo: 2014, bodyType: 'van' },
        { name: 'Primastar II', yearFrom: 2021, yearTo: null, bodyType: 'van' },
      ]),
      mb('Interstar', [
        { name: 'Interstar', yearFrom: 2002, yearTo: 2010, bodyType: 'van' },
      ]),
      mb('Urvan / Caravan', [
        { name: 'E24', yearFrom: 1986, yearTo: 2001, bodyType: 'van' },
        { name: 'E25', yearFrom: 2001, yearTo: 2012, bodyType: 'van' },
        { name: 'E26', yearFrom: 2012, yearTo: null, bodyType: 'van' },
      ]),
      mb('Vanette', [
        { name: 'Vanette', yearFrom: 1985, yearTo: 2010, bodyType: 'van' },
      ]),
      mb('Townstar', [
        { name: 'Townstar', yearFrom: 2022, yearTo: null, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'Toyota',
    models: [
      mb('HiAce', [
        { name: 'H100', yearFrom: 1989, yearTo: 2004, bodyType: 'van' },
        { name: 'H200', yearFrom: 2004, yearTo: 2019, bodyType: 'van' },
        { name: 'H300', yearFrom: 2019, yearTo: null, bodyType: 'van' },
      ]),
      mb('Coaster', [
        { name: 'B40/B50', yearFrom: 1993, yearTo: 2017, bodyType: 'bus' },
        { name: 'B60/B70', yearFrom: 2017, yearTo: null, bodyType: 'bus' },
      ]),
      mb('ProAce', [
        { name: 'ProAce I', yearFrom: 2013, yearTo: 2016, bodyType: 'van' },
        { name: 'ProAce II', yearFrom: 2016, yearTo: null, bodyType: 'van' },
      ]),
      mb('ProAce City', [
        { name: 'ProAce City', yearFrom: 2020, yearTo: null, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'Hyundai',
    models: [
      mb('H350', [
        { name: 'H350', yearFrom: 2014, yearTo: 2020, bodyType: 'van' },
      ]),
      mb('County', [
        { name: 'County', yearFrom: 1998, yearTo: null, bodyType: 'bus' },
      ]),
      mb('HD', [
        { name: 'HD65/72/78', yearFrom: 2004, yearTo: null, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'Kia',
    models: [
      mb('Bongo', [
        { name: 'Bongo III', yearFrom: 2004, yearTo: null, bodyType: 'van' },
      ]),
      mb('Pregio', [
        { name: 'Pregio', yearFrom: 1995, yearTo: 2006, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'SsangYong',
    models: [
      mb('Istana', [
        { name: 'Istana', yearFrom: 1995, yearTo: 2003, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'Mitsubishi',
    models: [
      mb('L300', [
        { name: 'L300 III', yearFrom: 1986, yearTo: 2014, bodyType: 'van' },
      ]),
      mb('Delica', [
        { name: 'D:4 (IV)', yearFrom: 1994, yearTo: 2007, bodyType: 'minivan' },
        { name: 'D:5 (V)', yearFrom: 2007, yearTo: null, bodyType: 'minivan' },
      ]),
      mb('Rosa', [
        { name: 'Rosa', yearFrom: 1997, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
  {
    name: 'Mazda',
    models: [
      mb('Bongo', [
        { name: 'Bongo', yearFrom: 1983, yearTo: 2020, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'Honda',
    models: [
      mb('StepWGN', [
        { name: 'RF1 (I)', yearFrom: 1996, yearTo: 2001, bodyType: 'minivan' },
        { name: 'RF3 (II)', yearFrom: 2001, yearTo: 2005, bodyType: 'minivan' },
        { name: 'RG (III)', yearFrom: 2005, yearTo: 2009, bodyType: 'minivan' },
        { name: 'RK (IV)', yearFrom: 2009, yearTo: 2015, bodyType: 'minivan' },
        { name: 'RP (V)', yearFrom: 2015, yearTo: 2022, bodyType: 'minivan' },
        { name: 'RP8 (VI)', yearFrom: 2022, yearTo: null, bodyType: 'minivan' },
      ]),
      mb('Freed', [
        { name: 'GB3 (I)', yearFrom: 2008, yearTo: 2016, bodyType: 'minivan' },
        { name: 'GB5 (II)', yearFrom: 2016, yearTo: null, bodyType: 'minivan' },
      ]),
      mb('Elysion', [
        { name: 'RR (I)', yearFrom: 2004, yearTo: 2013, bodyType: 'minivan' },
      ]),
    ],
  },
  {
    name: 'Toyota',
    models: [
      mb('Noah / Voxy', [
        { name: 'R60 (I)', yearFrom: 2001, yearTo: 2007, bodyType: 'minivan' },
        { name: 'R70 (II)', yearFrom: 2007, yearTo: 2014, bodyType: 'minivan' },
        { name: 'R80 (III)', yearFrom: 2014, yearTo: 2022, bodyType: 'minivan' },
        { name: 'R90 (IV)', yearFrom: 2022, yearTo: null, bodyType: 'minivan' },
      ]),
      mb('Estima / Previa', [
        { name: 'XR10/20 (I)', yearFrom: 1990, yearTo: 2000, bodyType: 'minivan' },
        { name: 'XR30/40 (II)', yearFrom: 2000, yearTo: 2006, bodyType: 'minivan' },
        { name: 'XR50 (III)', yearFrom: 2006, yearTo: 2019, bodyType: 'minivan' },
      ]),
      mb('Granvia', [
        { name: 'Granvia (old)', yearFrom: 1995, yearTo: 2002, bodyType: 'van' },
        { name: 'Granvia (new)', yearFrom: 2019, yearTo: null, bodyType: 'van' },
      ]),
      mb('Vellfire', [
        { name: 'AH20 (I)', yearFrom: 2008, yearTo: 2015, bodyType: 'minivan' },
        { name: 'AH30 (II)', yearFrom: 2015, yearTo: 2023, bodyType: 'minivan' },
        { name: 'AH40 (III)', yearFrom: 2023, yearTo: null, bodyType: 'minivan' },
      ]),
      mb('TownAce / LiteAce', [
        { name: 'S400', yearFrom: 2008, yearTo: null, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'Dodge',
    models: [
      mb('Ram Van', [
        { name: 'Ram Van', yearFrom: 1994, yearTo: 2003, bodyType: 'van' },
      ]),
      mb('Sprinter', [
        { name: 'Sprinter', yearFrom: 2003, yearTo: 2006, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'Chevrolet',
    models: [
      mb('Express', [
        { name: 'Express I', yearFrom: 1996, yearTo: 2002, bodyType: 'van' },
        { name: 'Express II', yearFrom: 2003, yearTo: null, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'GMC',
    models: [
      mb('Savana (pass.)', [
        { name: 'Savana I', yearFrom: 1996, yearTo: 2002, bodyType: 'van' },
        { name: 'Savana II', yearFrom: 2003, yearTo: null, bodyType: 'van' },
      ]),
    ],
  },
  {
    name: 'GAZ',
    models: [
      mb('GAZelle NEXT (пасс.)', [
        { name: 'A65R52', yearFrom: 2013, yearTo: null, bodyType: 'van' },
      ]),
      mb('GAZelle City', [
        { name: 'GAZelle City', yearFrom: 2020, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
  {
    name: 'UAZ',
    models: [
      mb('Буханка (СГР/2206)', [
        { name: 'UAZ-452/2206', yearFrom: 1965, yearTo: null, bodyType: 'van' },
      ]),
    ],
  },

  // ─── Dedicated Bus Brands ───
  {
    name: 'Yutong',
    models: [
      mb('ZK6129H', [
        { name: 'ZK6129H', yearFrom: 2004, yearTo: null, bodyType: 'bus' },
      ]),
      mb('ZK6119HA', [
        { name: 'ZK6119HA', yearFrom: 2006, yearTo: null, bodyType: 'bus' },
      ]),
      mb('ZK6858H', [
        { name: 'ZK6858H', yearFrom: 2010, yearTo: null, bodyType: 'bus' },
      ]),
      mb('ZK6128H', [
        { name: 'ZK6128H', yearFrom: 2003, yearTo: null, bodyType: 'bus' },
      ]),
      mb('E12', [
        { name: 'E12', yearFrom: 2019, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
  {
    name: 'King Long',
    models: [
      mb('XMQ6127C', [
        { name: 'XMQ6127C', yearFrom: 2005, yearTo: null, bodyType: 'bus' },
      ]),
      mb('XMQ6900', [
        { name: 'XMQ6900', yearFrom: 2010, yearTo: null, bodyType: 'bus' },
      ]),
      mb('XMQ6130', [
        { name: 'XMQ6130', yearFrom: 2008, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
  {
    name: 'Higer',
    models: [
      mb('KLQ6129Q', [
        { name: 'KLQ6129Q', yearFrom: 2005, yearTo: null, bodyType: 'bus' },
      ]),
      mb('KLQ6109', [
        { name: 'KLQ6109', yearFrom: 2008, yearTo: null, bodyType: 'bus' },
      ]),
      mb('KLQ6119', [
        { name: 'KLQ6119', yearFrom: 2006, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
  {
    name: 'Golden Dragon',
    models: [
      mb('XML6125', [
        { name: 'XML6125', yearFrom: 2005, yearTo: null, bodyType: 'bus' },
      ]),
      mb('XML6127', [
        { name: 'XML6127', yearFrom: 2006, yearTo: null, bodyType: 'bus' },
      ]),
      mb('XML6957', [
        { name: 'XML6957', yearFrom: 2008, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
  {
    name: 'Zhongtong',
    models: [
      mb('LCK6127H', [
        { name: 'LCK6127H', yearFrom: 2005, yearTo: null, bodyType: 'bus' },
      ]),
      mb('LCK6108', [
        { name: 'LCK6108', yearFrom: 2008, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
  {
    name: 'Irisbus',
    models: [
      mb('Crossway', [
        { name: 'Crossway', yearFrom: 2006, yearTo: null, bodyType: 'bus' },
      ]),
      mb('Recreo', [
        { name: 'Recreo', yearFrom: 2005, yearTo: null, bodyType: 'bus' },
      ]),
      mb('Arway', [
        { name: 'Arway', yearFrom: 2006, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
  {
    name: 'Volvo',
    models: [
      mb('B7R / B8R', [
        { name: 'B7R', yearFrom: 1999, yearTo: 2012, bodyType: 'bus' },
        { name: 'B8R', yearFrom: 2012, yearTo: null, bodyType: 'bus' },
      ]),
      mb('9700', [
        { name: '9700', yearFrom: 2001, yearTo: null, bodyType: 'bus' },
      ]),
      mb('9900', [
        { name: '9900', yearFrom: 2003, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
  {
    name: 'Scania',
    models: [
      mb('Touring', [
        { name: 'Touring HD', yearFrom: 2011, yearTo: null, bodyType: 'bus' },
      ]),
      mb('Citywide', [
        { name: 'Citywide', yearFrom: 2012, yearTo: null, bodyType: 'bus' },
      ]),
      mb('Interlink', [
        { name: 'Interlink', yearFrom: 2015, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
  {
    name: 'MAN',
    models: [
      mb("Lion's Coach", [
        { name: "Lion's Coach", yearFrom: 2004, yearTo: null, bodyType: 'bus' },
      ]),
      mb("Lion's City", [
        { name: "Lion's City", yearFrom: 2004, yearTo: null, bodyType: 'bus' },
      ]),
      mb("Lion's Intercity", [
        { name: "Lion's Intercity", yearFrom: 2015, yearTo: null, bodyType: 'bus' },
      ]),
    ],
  },
];
