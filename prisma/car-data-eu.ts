export interface GenData {
  name: string;
  yearFrom: number;
  yearTo: number | null;
  bodyType: string;
}

export interface ModelData {
  name: string;
  generations: GenData[];
  vehicleType?: string;
}

export interface BrandData {
  name: string;
  models: ModelData[];
}

export const europeanBrands: BrandData[] = [
  {
    name: "Volkswagen",
    models: [
      { name: "Golf", generations: [
        { name: "Golf I", yearFrom: 1974, yearTo: 1983, bodyType: "hatchback" },
        { name: "Golf II", yearFrom: 1983, yearTo: 1992, bodyType: "hatchback" },
        { name: "Golf III", yearFrom: 1991, yearTo: 1997, bodyType: "hatchback" },
        { name: "Golf IV", yearFrom: 1997, yearTo: 2003, bodyType: "hatchback" },
        { name: "Golf V", yearFrom: 2003, yearTo: 2008, bodyType: "hatchback" },
        { name: "Golf VI", yearFrom: 2008, yearTo: 2012, bodyType: "hatchback" },
        { name: "Golf VII", yearFrom: 2012, yearTo: 2020, bodyType: "hatchback" },
        { name: "Golf VIII", yearFrom: 2020, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Passat", generations: [
        { name: "Passat B3", yearFrom: 1988, yearTo: 1993, bodyType: "sedan" },
        { name: "Passat B4", yearFrom: 1993, yearTo: 1996, bodyType: "sedan" },
        { name: "Passat B5", yearFrom: 1996, yearTo: 2005, bodyType: "sedan" },
        { name: "Passat B6", yearFrom: 2005, yearTo: 2010, bodyType: "sedan" },
        { name: "Passat B7", yearFrom: 2010, yearTo: 2014, bodyType: "sedan" },
        { name: "Passat B8", yearFrom: 2014, yearTo: 2023, bodyType: "sedan" },
        { name: "Passat B9", yearFrom: 2023, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Tiguan", generations: [
        { name: "Tiguan I", yearFrom: 2007, yearTo: 2016, bodyType: "suv" },
        { name: "Tiguan II", yearFrom: 2016, yearTo: 2024, bodyType: "suv" },
        { name: "Tiguan III", yearFrom: 2024, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Polo", generations: [
        { name: "Polo III", yearFrom: 1994, yearTo: 2001, bodyType: "hatchback" },
        { name: "Polo IV", yearFrom: 2001, yearTo: 2009, bodyType: "hatchback" },
        { name: "Polo V", yearFrom: 2009, yearTo: 2017, bodyType: "hatchback" },
        { name: "Polo VI", yearFrom: 2017, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Touareg", generations: [
        { name: "Touareg I", yearFrom: 2002, yearTo: 2010, bodyType: "suv" },
        { name: "Touareg II", yearFrom: 2010, yearTo: 2018, bodyType: "suv" },
        { name: "Touareg III", yearFrom: 2018, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Jetta", generations: [
        { name: "Jetta V", yearFrom: 2005, yearTo: 2010, bodyType: "sedan" },
        { name: "Jetta VI", yearFrom: 2010, yearTo: 2018, bodyType: "sedan" },
        { name: "Jetta VII", yearFrom: 2018, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Arteon", generations: [
        { name: "Arteon I", yearFrom: 2017, yearTo: 2024, bodyType: "liftback" },
        { name: "Arteon II", yearFrom: 2024, yearTo: null, bodyType: "liftback" },
      ]},
      { name: "T-Roc", generations: [
        { name: "T-Roc I", yearFrom: 2017, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "ID.3", generations: [
        { name: "ID.3 I", yearFrom: 2020, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "ID.4", generations: [
        { name: "ID.4 I", yearFrom: 2020, yearTo: null, bodyType: "suv" },
      ]},
      { name: "ID.7", generations: [
        { name: "ID.7 I", yearFrom: 2023, yearTo: null, bodyType: "liftback" },
      ]},
      { name: "Touran", vehicleType: "bus", generations: [
        { name: "Touran I", yearFrom: 2003, yearTo: 2015, bodyType: "minivan" },
        { name: "Touran II", yearFrom: 2015, yearTo: null, bodyType: "minivan" },
      ]},
      { name: "Caddy", vehicleType: "bus", generations: [
        { name: "Caddy III", yearFrom: 2003, yearTo: 2015, bodyType: "van" },
        { name: "Caddy IV", yearFrom: 2015, yearTo: 2020, bodyType: "van" },
        { name: "Caddy V", yearFrom: 2020, yearTo: null, bodyType: "van" },
      ]},
      { name: "Multivan", vehicleType: "bus", generations: [
        { name: "Transporter T5", yearFrom: 2003, yearTo: 2015, bodyType: "van" },
        { name: "Transporter T6", yearFrom: 2015, yearTo: 2023, bodyType: "van" },
        { name: "Multivan T7", yearFrom: 2021, yearTo: null, bodyType: "minivan" },
      ]},
      { name: "Sharan", vehicleType: "bus", generations: [
        { name: "Sharan I", yearFrom: 1995, yearTo: 2010, bodyType: "minivan" },
        { name: "Sharan II", yearFrom: 2010, yearTo: 2022, bodyType: "minivan" },
      ]},
      { name: "Scirocco", generations: [
        { name: "Scirocco III", yearFrom: 2008, yearTo: 2017, bodyType: "coupe" },
      ]},
      { name: "Phaeton", generations: [
        { name: "Phaeton I", yearFrom: 2002, yearTo: 2016, bodyType: "sedan" },
      ]},
      { name: "CC", generations: [
        { name: "CC", yearFrom: 2008, yearTo: 2017, bodyType: "sedan" },
      ]},
      { name: "Up", generations: [
        { name: "Up", yearFrom: 2011, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "T-Cross", generations: [
        { name: "T-Cross I", yearFrom: 2019, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Tiguan Allspace", generations: [
        { name: "Tiguan Allspace", yearFrom: 2017, yearTo: 2024, bodyType: "suv" },
      ]},
      { name: "Taos", generations: [
        { name: "Taos I", yearFrom: 2021, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Atlas", generations: [
        { name: "Atlas I", yearFrom: 2017, yearTo: null, bodyType: "suv" },
      ]},
    ],
  },
  {
    name: "BMW",
    models: [
      { name: "1 Series", generations: [
        { name: "1 Series E87", yearFrom: 2004, yearTo: 2011, bodyType: "hatchback" },
        { name: "1 Series F20", yearFrom: 2011, yearTo: 2019, bodyType: "hatchback" },
        { name: "1 Series F40", yearFrom: 2019, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "2 Series", generations: [
        { name: "2 Series F22", yearFrom: 2014, yearTo: 2021, bodyType: "coupe" },
        { name: "2 Series F44", yearFrom: 2019, yearTo: null, bodyType: "liftback" },
        { name: "2 Series G42", yearFrom: 2021, yearTo: null, bodyType: "coupe" },
      ]},
      { name: "3 Series", generations: [
        { name: "3 Series E46", yearFrom: 1998, yearTo: 2005, bodyType: "sedan" },
        { name: "3 Series E90", yearFrom: 2005, yearTo: 2012, bodyType: "sedan" },
        { name: "3 Series F30", yearFrom: 2012, yearTo: 2019, bodyType: "sedan" },
        { name: "3 Series G20", yearFrom: 2019, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "4 Series", generations: [
        { name: "4 Series F32", yearFrom: 2013, yearTo: 2020, bodyType: "coupe" },
        { name: "4 Series G22", yearFrom: 2020, yearTo: null, bodyType: "coupe" },
      ]},
      { name: "5 Series", generations: [
        { name: "5 Series E39", yearFrom: 1995, yearTo: 2003, bodyType: "sedan" },
        { name: "5 Series E60", yearFrom: 2003, yearTo: 2010, bodyType: "sedan" },
        { name: "5 Series F10", yearFrom: 2010, yearTo: 2017, bodyType: "sedan" },
        { name: "5 Series G30", yearFrom: 2017, yearTo: 2023, bodyType: "sedan" },
        { name: "5 Series G60", yearFrom: 2023, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "6 Series", generations: [
        { name: "6 Series E63", yearFrom: 2003, yearTo: 2010, bodyType: "coupe" },
        { name: "6 Series F06", yearFrom: 2011, yearTo: 2019, bodyType: "coupe" },
        { name: "6 Series G32", yearFrom: 2017, yearTo: 2024, bodyType: "wagon" },
      ]},
      { name: "7 Series", generations: [
        { name: "7 Series E65", yearFrom: 2001, yearTo: 2008, bodyType: "sedan" },
        { name: "7 Series F01", yearFrom: 2008, yearTo: 2015, bodyType: "sedan" },
        { name: "7 Series G11", yearFrom: 2015, yearTo: 2022, bodyType: "sedan" },
        { name: "7 Series G70", yearFrom: 2022, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "8 Series", generations: [{ name: "8 Series G14", yearFrom: 2018, yearTo: null, bodyType: "coupe" }]},
      { name: "X1", generations: [
        { name: "X1 E84", yearFrom: 2009, yearTo: 2015, bodyType: "suv" },
        { name: "X1 F48", yearFrom: 2015, yearTo: 2022, bodyType: "suv" },
        { name: "X1 U11", yearFrom: 2022, yearTo: null, bodyType: "suv" },
      ]},
      { name: "X2", generations: [
        { name: "X2 F39", yearFrom: 2017, yearTo: 2023, bodyType: "crossover" },
        { name: "X2 U10", yearFrom: 2023, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "X3", generations: [
        { name: "X3 E83", yearFrom: 2003, yearTo: 2010, bodyType: "suv" },
        { name: "X3 F25", yearFrom: 2010, yearTo: 2017, bodyType: "suv" },
        { name: "X3 G01", yearFrom: 2017, yearTo: 2024, bodyType: "suv" },
        { name: "X3 G45", yearFrom: 2024, yearTo: null, bodyType: "suv" },
      ]},
      { name: "X4", generations: [
        { name: "X4 F26", yearFrom: 2014, yearTo: 2022, bodyType: "crossover" },
        { name: "X4 G02", yearFrom: 2018, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "X5", generations: [
        { name: "X5 E53", yearFrom: 1999, yearTo: 2006, bodyType: "suv" },
        { name: "X5 E70", yearFrom: 2006, yearTo: 2013, bodyType: "suv" },
        { name: "X5 F15", yearFrom: 2013, yearTo: 2018, bodyType: "suv" },
        { name: "X5 G05", yearFrom: 2018, yearTo: null, bodyType: "suv" },
      ]},
      { name: "X6", generations: [
        { name: "X6 E71", yearFrom: 2008, yearTo: 2014, bodyType: "crossover" },
        { name: "X6 F16", yearFrom: 2014, yearTo: 2019, bodyType: "crossover" },
        { name: "X6 G06", yearFrom: 2019, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "X7", generations: [{ name: "X7 G07", yearFrom: 2019, yearTo: null, bodyType: "suv" }]},
      { name: "Z4", generations: [
        { name: "Z4 E85", yearFrom: 2002, yearTo: 2008, bodyType: "roadster" },
        { name: "Z4 E89", yearFrom: 2009, yearTo: 2016, bodyType: "roadster" },
        { name: "Z4 G29", yearFrom: 2019, yearTo: null, bodyType: "roadster" },
      ]},
      { name: "iX", generations: [{ name: "iX", yearFrom: 2021, yearTo: null, bodyType: "suv" }]},
      { name: "i4", generations: [{ name: "i4", yearFrom: 2021, yearTo: null, bodyType: "liftback" }]},
      { name: "i3", generations: [{ name: "i3", yearFrom: 2013, yearTo: 2022, bodyType: "hatchback" }]},
      { name: "iX3", generations: [{ name: "iX3", yearFrom: 2020, yearTo: null, bodyType: "suv" }]},
      { name: "i7", generations: [{ name: "i7", yearFrom: 2022, yearTo: null, bodyType: "sedan" }]},
      { name: "XM", generations: [{ name: "XM", yearFrom: 2023, yearTo: null, bodyType: "suv" }]},
      { name: "M2", generations: [
        { name: "M2 F87", yearFrom: 2015, yearTo: 2021, bodyType: "coupe" },
        { name: "M2 G87", yearFrom: 2022, yearTo: null, bodyType: "coupe" },
      ]},
      { name: "M3", generations: [
        { name: "M3 E46", yearFrom: 2000, yearTo: 2006, bodyType: "sedan" },
        { name: "M3 E90", yearFrom: 2007, yearTo: 2013, bodyType: "sedan" },
        { name: "M3 F80", yearFrom: 2014, yearTo: 2020, bodyType: "sedan" },
        { name: "M3 G80", yearFrom: 2020, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "M4", generations: [
        { name: "M4 F82", yearFrom: 2014, yearTo: 2020, bodyType: "coupe" },
        { name: "M4 G82", yearFrom: 2020, yearTo: null, bodyType: "coupe" },
      ]},
      { name: "M5", generations: [
        { name: "M5 E39", yearFrom: 1998, yearTo: 2003, bodyType: "sedan" },
        { name: "M5 E60", yearFrom: 2005, yearTo: 2010, bodyType: "sedan" },
        { name: "M5 F10", yearFrom: 2011, yearTo: 2016, bodyType: "sedan" },
        { name: "M5 F90", yearFrom: 2017, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "M6", generations: [
        { name: "M6 E63", yearFrom: 2005, yearTo: 2010, bodyType: "coupe" },
        { name: "M6 F06", yearFrom: 2012, yearTo: 2018, bodyType: "coupe" },
      ]},
      { name: "M8", generations: [{ name: "M8 F92", yearFrom: 2019, yearTo: null, bodyType: "coupe" }]},
    ],
  },
  {
    name: "Audi",
    models: [
      { name: "80", generations: [
        { name: "B1", yearFrom: 1972, yearTo: 1978, bodyType: "sedan" },
        { name: "B2", yearFrom: 1978, yearTo: 1984, bodyType: "sedan" },
        { name: "B2 рестайлинг", yearFrom: 1984, yearTo: 1986, bodyType: "sedan" },
        { name: "B3", yearFrom: 1986, yearTo: 1991, bodyType: "sedan" },
        { name: "B4", yearFrom: 1991, yearTo: 1994, bodyType: "sedan" },
        { name: "B4 рестайлинг", yearFrom: 1994, yearTo: 1996, bodyType: "sedan" },
      ]},
      { name: "A1", generations: [
        { name: "A1 8X", yearFrom: 2010, yearTo: 2018, bodyType: "hatchback" },
        { name: "A1 GB", yearFrom: 2018, yearTo: 2024, bodyType: "hatchback" },
      ]},
      { name: "A3", generations: [
        { name: "A3 8L", yearFrom: 1996, yearTo: 2003, bodyType: "hatchback" },
        { name: "A3 8P", yearFrom: 2003, yearTo: 2012, bodyType: "hatchback" },
        { name: "A3 8V", yearFrom: 2012, yearTo: 2020, bodyType: "hatchback" },
        { name: "A3 8Y", yearFrom: 2020, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "A4", generations: [
        { name: "A4 B5", yearFrom: 1994, yearTo: 2001, bodyType: "sedan" },
        { name: "A4 B6", yearFrom: 2000, yearTo: 2004, bodyType: "sedan" },
        { name: "A4 B7", yearFrom: 2004, yearTo: 2008, bodyType: "sedan" },
        { name: "A4 B8", yearFrom: 2008, yearTo: 2015, bodyType: "sedan" },
        { name: "A4 B9", yearFrom: 2015, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "A5", generations: [
        { name: "A5 8T", yearFrom: 2007, yearTo: 2016, bodyType: "coupe" },
        { name: "A5 F5", yearFrom: 2016, yearTo: null, bodyType: "coupe" },
      ]},
      { name: "A6", generations: [
        { name: "A6 C5", yearFrom: 1997, yearTo: 2004, bodyType: "sedan" },
        { name: "A6 C6", yearFrom: 2004, yearTo: 2011, bodyType: "sedan" },
        { name: "A6 C7", yearFrom: 2011, yearTo: 2018, bodyType: "sedan" },
        { name: "A6 C8", yearFrom: 2018, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "A7", generations: [
        { name: "A7 4G", yearFrom: 2010, yearTo: 2017, bodyType: "liftback" },
        { name: "A7 4K", yearFrom: 2017, yearTo: null, bodyType: "liftback" },
      ]},
      { name: "A8", generations: [
        { name: "A8 D2", yearFrom: 1994, yearTo: 2002, bodyType: "sedan" },
        { name: "A8 D3", yearFrom: 2002, yearTo: 2009, bodyType: "sedan" },
        { name: "A8 D4", yearFrom: 2009, yearTo: 2017, bodyType: "sedan" },
        { name: "A8 D5", yearFrom: 2017, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Q2", generations: [{ name: "Q2", yearFrom: 2016, yearTo: null, bodyType: "crossover" }]},
      { name: "Q3", generations: [
        { name: "Q3 8U", yearFrom: 2011, yearTo: 2018, bodyType: "suv" },
        { name: "Q3 F3", yearFrom: 2018, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Q4 e-tron", generations: [{ name: "Q4 e-tron", yearFrom: 2021, yearTo: null, bodyType: "suv" }]},
      { name: "Q5", generations: [
        { name: "Q5 8R", yearFrom: 2008, yearTo: 2017, bodyType: "suv" },
        { name: "Q5 FY", yearFrom: 2016, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Q7", generations: [
        { name: "Q7 4L", yearFrom: 2005, yearTo: 2015, bodyType: "suv" },
        { name: "Q7 4M", yearFrom: 2015, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Q8", generations: [{ name: "Q8", yearFrom: 2018, yearTo: null, bodyType: "suv" }]},
      { name: "TT", generations: [
        { name: "TT 8N", yearFrom: 1998, yearTo: 2006, bodyType: "coupe" },
        { name: "TT 8J", yearFrom: 2006, yearTo: 2014, bodyType: "coupe" },
        { name: "TT 8S", yearFrom: 2014, yearTo: 2023, bodyType: "coupe" },
      ]},
      { name: "e-tron", generations: [{ name: "e-tron", yearFrom: 2018, yearTo: 2024, bodyType: "suv" }]},
      { name: "e-tron GT", generations: [{ name: "e-tron GT", yearFrom: 2021, yearTo: null, bodyType: "liftback" }]},
      { name: "RS3", generations: [
        { name: "RS3 8P", yearFrom: 2011, yearTo: 2012, bodyType: "hatchback" },
        { name: "RS3 8V", yearFrom: 2015, yearTo: 2021, bodyType: "hatchback" },
        { name: "RS3 8Y", yearFrom: 2021, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "RS4", generations: [
        { name: "RS4 B7", yearFrom: 2005, yearTo: 2008, bodyType: "sedan" },
        { name: "RS4 B8", yearFrom: 2012, yearTo: 2015, bodyType: "sedan" },
        { name: "RS4 B9", yearFrom: 2017, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "RS5", generations: [
        { name: "RS5 8T", yearFrom: 2010, yearTo: 2015, bodyType: "coupe" },
        { name: "RS5 F5", yearFrom: 2017, yearTo: null, bodyType: "coupe" },
      ]},
      { name: "RS6", generations: [
        { name: "RS6 C5", yearFrom: 2002, yearTo: 2004, bodyType: "sedan" },
        { name: "RS6 C6", yearFrom: 2008, yearTo: 2010, bodyType: "sedan" },
        { name: "RS6 C7", yearFrom: 2013, yearTo: 2018, bodyType: "wagon" },
        { name: "RS6 C8", yearFrom: 2019, yearTo: null, bodyType: "wagon" },
      ]},
      { name: "RS7", generations: [
        { name: "RS7 4G", yearFrom: 2013, yearTo: 2018, bodyType: "liftback" },
        { name: "RS7 4K", yearFrom: 2019, yearTo: null, bodyType: "liftback" },
      ]},
      { name: "RS Q8", generations: [{ name: "RS Q8", yearFrom: 2019, yearTo: null, bodyType: "suv" }]},
    ],
  },
  {
    name: "Mercedes-Benz",
    models: [
      { name: "A-Class", generations: [
        { name: "A-Class W168", yearFrom: 1997, yearTo: 2004, bodyType: "hatchback" },
        { name: "A-Class W169", yearFrom: 2004, yearTo: 2012, bodyType: "hatchback" },
        { name: "A-Class W176", yearFrom: 2012, yearTo: 2018, bodyType: "hatchback" },
        { name: "A-Class W177", yearFrom: 2018, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "B-Class", generations: [
        { name: "B-Class W245", yearFrom: 2005, yearTo: 2011, bodyType: "hatchback" },
        { name: "B-Class W246", yearFrom: 2011, yearTo: 2019, bodyType: "hatchback" },
        { name: "B-Class W247", yearFrom: 2019, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "C-Class", generations: [
        { name: "C-Class W202", yearFrom: 1993, yearTo: 2000, bodyType: "sedan" },
        { name: "C-Class W203", yearFrom: 2000, yearTo: 2007, bodyType: "sedan" },
        { name: "C-Class W204", yearFrom: 2007, yearTo: 2014, bodyType: "sedan" },
        { name: "C-Class W205", yearFrom: 2014, yearTo: 2021, bodyType: "sedan" },
        { name: "C-Class W206", yearFrom: 2021, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "E-Class", generations: [
        { name: "E-Class W210", yearFrom: 1995, yearTo: 2002, bodyType: "sedan" },
        { name: "E-Class W211", yearFrom: 2002, yearTo: 2009, bodyType: "sedan" },
        { name: "E-Class W212", yearFrom: 2009, yearTo: 2016, bodyType: "sedan" },
        { name: "E-Class W213", yearFrom: 2016, yearTo: 2023, bodyType: "sedan" },
        { name: "E-Class W214", yearFrom: 2023, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "S-Class", generations: [
        { name: "S-Class W220", yearFrom: 1998, yearTo: 2005, bodyType: "sedan" },
        { name: "S-Class W221", yearFrom: 2005, yearTo: 2013, bodyType: "sedan" },
        { name: "S-Class W222", yearFrom: 2013, yearTo: 2020, bodyType: "sedan" },
        { name: "S-Class W223", yearFrom: 2020, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "CLA", generations: [
        { name: "CLA C117", yearFrom: 2013, yearTo: 2019, bodyType: "liftback" },
        { name: "CLA C118", yearFrom: 2019, yearTo: null, bodyType: "liftback" },
      ]},
      { name: "CLS", generations: [
        { name: "CLS W218", yearFrom: 2010, yearTo: 2018, bodyType: "liftback" },
        { name: "CLS W257", yearFrom: 2018, yearTo: 2023, bodyType: "liftback" },
      ]},
      { name: "CLC", generations: [{ name: "CLC", yearFrom: 2008, yearTo: 2011, bodyType: "coupe" }]},
      { name: "CLK", generations: [
        { name: "CLK W208", yearFrom: 1997, yearTo: 2002, bodyType: "coupe" },
        { name: "CLK W209", yearFrom: 2002, yearTo: 2010, bodyType: "coupe" },
      ]},
      { name: "SLK", generations: [
        { name: "SLK R170", yearFrom: 1996, yearTo: 2004, bodyType: "roadster" },
        { name: "SLK R171", yearFrom: 2004, yearTo: 2011, bodyType: "roadster" },
        { name: "SLC R172", yearFrom: 2011, yearTo: 2020, bodyType: "roadster" },
      ]},
      { name: "GLA", generations: [
        { name: "GLA X156", yearFrom: 2013, yearTo: 2020, bodyType: "crossover" },
        { name: "GLA H247", yearFrom: 2020, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "GLB", generations: [{ name: "GLB X247", yearFrom: 2019, yearTo: null, bodyType: "suv" }]},
      { name: "GLC", generations: [
        { name: "GLC X253", yearFrom: 2015, yearTo: 2022, bodyType: "suv" },
        { name: "GLC X254", yearFrom: 2022, yearTo: null, bodyType: "suv" },
      ]},
      { name: "GLE", generations: [
        { name: "GLE W166", yearFrom: 2015, yearTo: 2019, bodyType: "suv" },
        { name: "GLE W167", yearFrom: 2019, yearTo: null, bodyType: "suv" },
      ]},
      { name: "GLS", generations: [
        { name: "GLS X166", yearFrom: 2015, yearTo: 2019, bodyType: "suv" },
        { name: "GLS X167", yearFrom: 2019, yearTo: null, bodyType: "suv" },
      ]},
      { name: "G-Class", generations: [
        { name: "G-Class W461", yearFrom: 1990, yearTo: 2013, bodyType: "suv" },
        { name: "G-Class W463", yearFrom: 1990, yearTo: 2018, bodyType: "suv" },
        { name: "G-Class W463A", yearFrom: 2018, yearTo: null, bodyType: "suv" },
      ]},
      { name: "ML", generations: [
        { name: "ML W163", yearFrom: 1997, yearTo: 2005, bodyType: "suv" },
        { name: "ML W164", yearFrom: 2005, yearTo: 2011, bodyType: "suv" },
      ]},
      { name: "GL", generations: [{ name: "GL X164", yearFrom: 2006, yearTo: 2012, bodyType: "suv" }]},
      { name: "Vito", vehicleType: "bus", generations: [
        { name: "Vito W638", yearFrom: 1996, yearTo: 2003, bodyType: "van" },
        { name: "Vito W639", yearFrom: 2003, yearTo: 2014, bodyType: "van" },
        { name: "Vito/V-Class W447", yearFrom: 2014, yearTo: null, bodyType: "van" },
      ]},
      { name: "EQC", generations: [{ name: "EQC", yearFrom: 2019, yearTo: 2023, bodyType: "suv" }]},
      { name: "EQS", generations: [{ name: "EQS", yearFrom: 2021, yearTo: null, bodyType: "sedan" }]},
      { name: "EQE", generations: [{ name: "EQE", yearFrom: 2022, yearTo: null, bodyType: "sedan" }]},
      { name: "EQA", generations: [{ name: "EQA", yearFrom: 2021, yearTo: null, bodyType: "suv" }]},
      { name: "EQB", generations: [{ name: "EQB", yearFrom: 2021, yearTo: null, bodyType: "suv" }]},
      { name: "AMG GT", generations: [
        { name: "AMG GT", yearFrom: 2014, yearTo: 2022, bodyType: "coupe" },
        { name: "AMG GT (new)", yearFrom: 2023, yearTo: null, bodyType: "coupe" },
      ]},
      { name: "SL", generations: [
        { name: "SL R230", yearFrom: 2001, yearTo: 2011, bodyType: "roadster" },
        { name: "SL R231", yearFrom: 2012, yearTo: 2020, bodyType: "roadster" },
        { name: "SL R232", yearFrom: 2022, yearTo: null, bodyType: "roadster" },
      ]},
      { name: "Maybach S", generations: [
        { name: "Maybach S W222", yearFrom: 2015, yearTo: 2020, bodyType: "sedan" },
        { name: "Maybach S W223", yearFrom: 2021, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Maybach GLS", generations: [{ name: "Maybach GLS", yearFrom: 2020, yearTo: null, bodyType: "suv" }]},
    ],
  },
  {
    name: "Renault",
    models: [
      { name: "Duster", generations: [
        { name: "Duster I", yearFrom: 2010, yearTo: 2015, bodyType: "suv" },
        { name: "Duster II", yearFrom: 2015, yearTo: 2021, bodyType: "suv" },
        { name: "Duster III", yearFrom: 2021, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Logan", generations: [
        { name: "Logan I", yearFrom: 2004, yearTo: 2012, bodyType: "sedan" },
        { name: "Logan II", yearFrom: 2012, yearTo: 2021, bodyType: "sedan" },
        { name: "Logan III", yearFrom: 2021, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Sandero", generations: [
        { name: "Sandero I", yearFrom: 2008, yearTo: 2012, bodyType: "hatchback" },
        { name: "Sandero II", yearFrom: 2012, yearTo: 2020, bodyType: "hatchback" },
        { name: "Sandero III", yearFrom: 2020, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Arkana", generations: [{ name: "Arkana", yearFrom: 2019, yearTo: null, bodyType: "crossover" }]},
      { name: "Kaptur", generations: [{ name: "Kaptur", yearFrom: 2016, yearTo: null, bodyType: "suv" }]},
      { name: "Megane", generations: [
        { name: "Megane II", yearFrom: 2002, yearTo: 2008, bodyType: "hatchback" },
        { name: "Megane III", yearFrom: 2008, yearTo: 2016, bodyType: "hatchback" },
        { name: "Megane IV", yearFrom: 2016, yearTo: 2023, bodyType: "hatchback" },
        { name: "Megane E-Tech", yearFrom: 2022, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Scenic", vehicleType: "bus", generations: [
        { name: "Scenic II", yearFrom: 2003, yearTo: 2009, bodyType: "minivan" },
        { name: "Scenic III", yearFrom: 2009, yearTo: 2016, bodyType: "minivan" },
        { name: "Scenic IV", yearFrom: 2016, yearTo: 2022, bodyType: "minivan" },
      ]},
      { name: "Koleos", generations: [
        { name: "Koleos I", yearFrom: 2008, yearTo: 2016, bodyType: "suv" },
        { name: "Koleos II", yearFrom: 2016, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Clio", generations: [
        { name: "Clio III", yearFrom: 2005, yearTo: 2013, bodyType: "hatchback" },
        { name: "Clio IV", yearFrom: 2012, yearTo: 2019, bodyType: "hatchback" },
        { name: "Clio V", yearFrom: 2019, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Fluence", generations: [{ name: "Fluence", yearFrom: 2009, yearTo: 2016, bodyType: "sedan" }]},
      { name: "Laguna", generations: [
        { name: "Laguna II", yearFrom: 2000, yearTo: 2007, bodyType: "liftback" },
        { name: "Laguna III", yearFrom: 2007, yearTo: 2015, bodyType: "liftback" },
      ]},
      { name: "Latitude", generations: [{ name: "Latitude", yearFrom: 2010, yearTo: 2015, bodyType: "sedan" }]},
      { name: "Kangoo", vehicleType: "bus", generations: [
        { name: "Kangoo II", yearFrom: 2007, yearTo: 2021, bodyType: "van" },
        { name: "Kangoo III", yearFrom: 2021, yearTo: null, bodyType: "van" },
      ]},
      { name: "Talisman", generations: [{ name: "Talisman", yearFrom: 2015, yearTo: 2022, bodyType: "sedan" }]},
      { name: "Espace", vehicleType: "bus", generations: [
        { name: "Espace IV", yearFrom: 2002, yearTo: 2014, bodyType: "minivan" },
        { name: "Espace V", yearFrom: 2015, yearTo: 2023, bodyType: "minivan" },
      ]},
      { name: "Twingo", generations: [
        { name: "Twingo II", yearFrom: 2007, yearTo: 2014, bodyType: "hatchback" },
        { name: "Twingo III", yearFrom: 2014, yearTo: 2021, bodyType: "hatchback" },
      ]},
      { name: "Zoe", generations: [{ name: "Zoe", yearFrom: 2012, yearTo: null, bodyType: "hatchback" }]},
      { name: "Symbol", generations: [
        { name: "Symbol II", yearFrom: 2008, yearTo: 2012, bodyType: "sedan" },
        { name: "Symbol III", yearFrom: 2012, yearTo: 2021, bodyType: "sedan" },
      ]},
      { name: "Kadjar", generations: [{ name: "Kadjar", yearFrom: 2015, yearTo: 2022, bodyType: "suv" }]},
    ],
  },
  {
    name: "Škoda",
    models: [
      { name: "Octavia", generations: [
        { name: "Octavia A4", yearFrom: 1996, yearTo: 2004, bodyType: "hatchback" },
        { name: "Octavia A5", yearFrom: 2004, yearTo: 2013, bodyType: "hatchback" },
        { name: "Octavia A7", yearFrom: 2012, yearTo: 2020, bodyType: "hatchback" },
        { name: "Octavia A8", yearFrom: 2019, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Rapid", generations: [
        { name: "Rapid I", yearFrom: 2012, yearTo: 2020, bodyType: "sedan" },
        { name: "Rapid II", yearFrom: 2019, yearTo: 2022, bodyType: "sedan" },
      ]},
      { name: "Kodiaq", generations: [
        { name: "Kodiaq I", yearFrom: 2016, yearTo: 2024, bodyType: "suv" },
        { name: "Kodiaq II", yearFrom: 2024, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Superb", generations: [
        { name: "Superb I", yearFrom: 2001, yearTo: 2008, bodyType: "sedan" },
        { name: "Superb II", yearFrom: 2008, yearTo: 2015, bodyType: "sedan" },
        { name: "Superb III", yearFrom: 2015, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Kamiq", generations: [{ name: "Kamiq", yearFrom: 2019, yearTo: null, bodyType: "crossover" }]},
      { name: "Karoq", generations: [{ name: "Karoq", yearFrom: 2017, yearTo: null, bodyType: "suv" }]},
      { name: "Fabia", generations: [
        { name: "Fabia I", yearFrom: 1999, yearTo: 2007, bodyType: "hatchback" },
        { name: "Fabia II", yearFrom: 2007, yearTo: 2014, bodyType: "hatchback" },
        { name: "Fabia III", yearFrom: 2014, yearTo: 2021, bodyType: "hatchback" },
        { name: "Fabia IV", yearFrom: 2021, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Enyaq", generations: [{ name: "Enyaq", yearFrom: 2020, yearTo: null, bodyType: "suv" }]},
      { name: "Roomster", vehicleType: "bus", generations: [{ name: "Roomster", yearFrom: 2006, yearTo: 2015, bodyType: "minivan" }]},
      { name: "Yeti", generations: [{ name: "Yeti", yearFrom: 2009, yearTo: 2017, bodyType: "suv" }]},
      { name: "Scala", generations: [{ name: "Scala", yearFrom: 2019, yearTo: null, bodyType: "hatchback" }]},
      { name: "Citigo", generations: [{ name: "Citigo", yearFrom: 2011, yearTo: 2021, bodyType: "hatchback" }]},
    ],
  },
  {
    name: "Peugeot",
    models: [
      { name: "107", generations: [{ name: "107", yearFrom: 2005, yearTo: 2014, bodyType: "hatchback" }]},
      { name: "108", generations: [{ name: "108", yearFrom: 2014, yearTo: null, bodyType: "hatchback" }]},
      { name: "206", generations: [{ name: "206", yearFrom: 1998, yearTo: 2012, bodyType: "hatchback" }]},
      { name: "207", generations: [{ name: "207", yearFrom: 2006, yearTo: 2014, bodyType: "hatchback" }]},
      { name: "208", generations: [
        { name: "208 I", yearFrom: 2012, yearTo: 2019, bodyType: "hatchback" },
        { name: "208 II", yearFrom: 2019, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "301", generations: [{ name: "301", yearFrom: 2012, yearTo: null, bodyType: "sedan" }]},
      { name: "306", generations: [{ name: "306", yearFrom: 1993, yearTo: 2002, bodyType: "hatchback" }]},
      { name: "307", generations: [{ name: "307", yearFrom: 2000, yearTo: 2008, bodyType: "hatchback" }]},
      { name: "308", generations: [
        { name: "308 I", yearFrom: 2007, yearTo: 2013, bodyType: "hatchback" },
        { name: "308 II", yearFrom: 2013, yearTo: 2021, bodyType: "hatchback" },
        { name: "308 III", yearFrom: 2021, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "406", generations: [{ name: "406", yearFrom: 1995, yearTo: 2004, bodyType: "sedan" }]},
      { name: "407", generations: [{ name: "407", yearFrom: 2004, yearTo: 2011, bodyType: "sedan" }]},
      { name: "408", generations: [
        { name: "408 I", yearFrom: 2010, yearTo: 2014, bodyType: "sedan" },
        { name: "408 II", yearFrom: 2022, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "508", generations: [
        { name: "508 I", yearFrom: 2010, yearTo: 2018, bodyType: "sedan" },
        { name: "508 II", yearFrom: 2018, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "2008", generations: [
        { name: "2008 I", yearFrom: 2013, yearTo: 2019, bodyType: "crossover" },
        { name: "2008 II", yearFrom: 2019, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "3008", generations: [
        { name: "3008 I", yearFrom: 2008, yearTo: 2016, bodyType: "crossover" },
        { name: "3008 II", yearFrom: 2016, yearTo: null, bodyType: "suv" },
      ]},
      { name: "4008", generations: [{ name: "4008", yearFrom: 2012, yearTo: null, bodyType: "suv" }]},
      { name: "5008", generations: [
        { name: "5008 I", yearFrom: 2009, yearTo: 2017, bodyType: "minivan" },
        { name: "5008 II", yearFrom: 2017, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Partner", vehicleType: "bus", generations: [
        { name: "Partner", yearFrom: 1996, yearTo: 2008, bodyType: "van" },
        { name: "Partner/Rifter", yearFrom: 2008, yearTo: null, bodyType: "van" },
      ]},
      { name: "Expert", vehicleType: "bus", generations: [
        { name: "Expert", yearFrom: 1995, yearTo: 2007, bodyType: "van" },
        { name: "Expert/Traveller", yearFrom: 2016, yearTo: null, bodyType: "van" },
      ]},
      { name: "RCZ", generations: [{ name: "RCZ", yearFrom: 2010, yearTo: 2015, bodyType: "coupe" }]},
    ],
  },
  {
    name: "Opel",
    models: [
      { name: "Astra", generations: [
        { name: "Astra G", yearFrom: 1998, yearTo: 2004, bodyType: "hatchback" },
        { name: "Astra H", yearFrom: 2004, yearTo: 2009, bodyType: "hatchback" },
        { name: "Astra J", yearFrom: 2009, yearTo: 2015, bodyType: "hatchback" },
        { name: "Astra K", yearFrom: 2015, yearTo: 2021, bodyType: "hatchback" },
        { name: "Astra L", yearFrom: 2021, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Insignia", generations: [
        { name: "Insignia A", yearFrom: 2008, yearTo: 2017, bodyType: "sedan" },
        { name: "Insignia B", yearFrom: 2017, yearTo: 2022, bodyType: "sedan" },
      ]},
      { name: "Mokka", generations: [
        { name: "Mokka A", yearFrom: 2012, yearTo: 2016, bodyType: "crossover" },
        { name: "Mokka B", yearFrom: 2020, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Grandland", generations: [{ name: "Grandland I", yearFrom: 2017, yearTo: null, bodyType: "suv" }]},
      { name: "Corsa", generations: [
        { name: "Corsa C", yearFrom: 2000, yearTo: 2006, bodyType: "hatchback" },
        { name: "Corsa D", yearFrom: 2006, yearTo: 2014, bodyType: "hatchback" },
        { name: "Corsa E", yearFrom: 2014, yearTo: 2019, bodyType: "hatchback" },
        { name: "Corsa F", yearFrom: 2019, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Zafira", vehicleType: "bus", generations: [
        { name: "Zafira A", yearFrom: 1999, yearTo: 2005, bodyType: "minivan" },
        { name: "Zafira B", yearFrom: 2005, yearTo: 2014, bodyType: "minivan" },
        { name: "Zafira C", yearFrom: 2011, yearTo: 2019, bodyType: "minivan" },
      ]},
      { name: "Vectra", generations: [
        { name: "Vectra B", yearFrom: 1995, yearTo: 2002, bodyType: "sedan" },
        { name: "Vectra C", yearFrom: 2002, yearTo: 2008, bodyType: "sedan" },
      ]},
      { name: "Meriva", vehicleType: "bus", generations: [
        { name: "Meriva A", yearFrom: 2003, yearTo: 2010, bodyType: "minivan" },
        { name: "Meriva B", yearFrom: 2010, yearTo: 2017, bodyType: "minivan" },
      ]},
      { name: "Crossland", generations: [{ name: "Crossland", yearFrom: 2017, yearTo: null, bodyType: "crossover" }]},
      { name: "Combo", vehicleType: "bus", generations: [
        { name: "Combo C", yearFrom: 2001, yearTo: 2007, bodyType: "van" },
        { name: "Combo D", yearFrom: 2011, yearTo: 2018, bodyType: "van" },
        { name: "Combo E", yearFrom: 2018, yearTo: null, bodyType: "van" },
      ]},
      { name: "Antara", generations: [{ name: "Antara", yearFrom: 2006, yearTo: 2015, bodyType: "suv" }]},
      { name: "Omega", generations: [{ name: "Omega B", yearFrom: 1994, yearTo: 2003, bodyType: "sedan" }]},
      { name: "Signum", generations: [{ name: "Signum", yearFrom: 2003, yearTo: 2008, bodyType: "liftback" }]},
      { name: "Vivaro", vehicleType: "bus", generations: [
        { name: "Vivaro A", yearFrom: 2001, yearTo: 2014, bodyType: "van" },
        { name: "Vivaro B", yearFrom: 2014, yearTo: 2019, bodyType: "van" },
        { name: "Vivaro C", yearFrom: 2019, yearTo: null, bodyType: "van" },
      ]},
      { name: "Karl", generations: [{ name: "Karl/Rocks", yearFrom: 2015, yearTo: 2019, bodyType: "hatchback" }]},
    ],
  },
  {
    name: "Citroën",
    models: [
      { name: "C3", generations: [
        { name: "C3 I", yearFrom: 2002, yearTo: 2009, bodyType: "hatchback" },
        { name: "C3 II", yearFrom: 2009, yearTo: 2016, bodyType: "hatchback" },
        { name: "C3 III", yearFrom: 2016, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "C4", generations: [
        { name: "C4 I", yearFrom: 2004, yearTo: 2010, bodyType: "hatchback" },
        { name: "C4 II", yearFrom: 2010, yearTo: 2018, bodyType: "hatchback" },
        { name: "C4 III", yearFrom: 2020, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "C5", generations: [
        { name: "C5 I", yearFrom: 2000, yearTo: 2008, bodyType: "sedan" },
        { name: "C5 II", yearFrom: 2008, yearTo: 2017, bodyType: "sedan" },
        { name: "C5 III", yearFrom: 2017, yearTo: 2021, bodyType: "sedan" },
      ]},
      { name: "C5 X", generations: [{ name: "C5 X", yearFrom: 2021, yearTo: null, bodyType: "liftback" }]},
      { name: "C-Elysée", generations: [{ name: "C-Elysée", yearFrom: 2012, yearTo: null, bodyType: "sedan" }]},
      { name: "Berlingo", vehicleType: "bus", generations: [
        { name: "Berlingo II", yearFrom: 2008, yearTo: 2018, bodyType: "van" },
        { name: "Berlingo III", yearFrom: 2018, yearTo: null, bodyType: "van" },
      ]},
      { name: "C5 Aircross", generations: [{ name: "C5 Aircross", yearFrom: 2017, yearTo: null, bodyType: "suv" }]},
      { name: "C3 Aircross", generations: [{ name: "C3 Aircross", yearFrom: 2017, yearTo: null, bodyType: "crossover" }]},
      { name: "C4 Cactus", generations: [{ name: "C4 Cactus", yearFrom: 2014, yearTo: 2022, bodyType: "crossover" }]},
      { name: "SpaceTourer", vehicleType: "bus", generations: [{ name: "SpaceTourer", yearFrom: 2016, yearTo: null, bodyType: "van" }]},
      { name: "Grand C4 Picasso", vehicleType: "bus", generations: [{ name: "Grand C4 Picasso", yearFrom: 2006, yearTo: 2018, bodyType: "minivan" }]},
      { name: "Jumpy", vehicleType: "bus", generations: [
        { name: "Jumpy", yearFrom: 1995, yearTo: 2007, bodyType: "van" },
        { name: "Jumpy II", yearFrom: 2007, yearTo: 2016, bodyType: "van" },
        { name: "Jumpy III", yearFrom: 2016, yearTo: null, bodyType: "van" },
      ]},
      { name: "C1", generations: [
        { name: "C1 I", yearFrom: 2005, yearTo: 2014, bodyType: "hatchback" },
        { name: "C1 II", yearFrom: 2014, yearTo: 2022, bodyType: "hatchback" },
      ]},
      { name: "C2", generations: [{ name: "C2", yearFrom: 2003, yearTo: 2009, bodyType: "hatchback" }]},
      { name: "C-Crosser", generations: [{ name: "C-Crosser", yearFrom: 2007, yearTo: 2012, bodyType: "suv" }]},
      { name: "DS3", generations: [{ name: "DS3", yearFrom: 2009, yearTo: 2019, bodyType: "hatchback" }]},
      { name: "DS4", generations: [
        { name: "DS4", yearFrom: 2011, yearTo: 2018, bodyType: "hatchback" },
        { name: "DS 4 (brand)", yearFrom: 2021, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "DS5", generations: [{ name: "DS5", yearFrom: 2011, yearTo: 2018, bodyType: "liftback" }]},
    ],
  },
  {
    name: "Fiat",
    models: [
      { name: "500", generations: [{ name: "500 (new)", yearFrom: 2007, yearTo: null, bodyType: "hatchback" }]},
      { name: "500X", generations: [{ name: "500X", yearFrom: 2014, yearTo: null, bodyType: "crossover" }]},
      { name: "500L", vehicleType: "bus", generations: [{ name: "500L", yearFrom: 2012, yearTo: 2022, bodyType: "minivan" }]},
      { name: "Panda", generations: [
        { name: "Panda II", yearFrom: 2003, yearTo: 2012, bodyType: "hatchback" },
        { name: "Panda III", yearFrom: 2011, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Tipo", generations: [
        { name: "Tipo I", yearFrom: 1988, yearTo: 1995, bodyType: "sedan" },
        { name: "Tipo II", yearFrom: 2015, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Punto", generations: [
        { name: "Punto", yearFrom: 1993, yearTo: 1999, bodyType: "hatchback" },
        { name: "Grande Punto", yearFrom: 2005, yearTo: 2009, bodyType: "hatchback" },
        { name: "Punto Evo", yearFrom: 2009, yearTo: 2018, bodyType: "hatchback" },
      ]},
      { name: "Doblo", vehicleType: "bus", generations: [
        { name: "Doblo I", yearFrom: 2000, yearTo: 2010, bodyType: "van" },
        { name: "Doblo II", yearFrom: 2009, yearTo: 2015, bodyType: "van" },
        { name: "Doblo III", yearFrom: 2015, yearTo: null, bodyType: "van" },
      ]},
      { name: "Ducato", vehicleType: "bus", generations: [
        { name: "Ducato III", yearFrom: 2002, yearTo: 2014, bodyType: "van" },
        { name: "Ducato IV", yearFrom: 2014, yearTo: null, bodyType: "van" },
      ]},
      { name: "Freemont", generations: [{ name: "Freemont", yearFrom: 2011, yearTo: 2016, bodyType: "suv" }]},
      { name: "Bravo", generations: [{ name: "Bravo II", yearFrom: 2007, yearTo: 2016, bodyType: "hatchback" }]},
      { name: "Linea", generations: [{ name: "Linea", yearFrom: 2007, yearTo: 2015, bodyType: "sedan" }]},
      { name: "Stilo", generations: [{ name: "Stilo", yearFrom: 2001, yearTo: 2008, bodyType: "hatchback" }]},
      { name: "Albea", generations: [{ name: "Albea", yearFrom: 2002, yearTo: 2012, bodyType: "sedan" }]},
      { name: "Qubo", vehicleType: "bus", generations: [{ name: "Qubo", yearFrom: 2008, yearTo: 2022, bodyType: "van" }]},
      { name: "Sedici", generations: [{ name: "Sedici", yearFrom: 2006, yearTo: 2014, bodyType: "suv" }]},
      { name: "Fiorino", vehicleType: "bus", generations: [
        { name: "Fiorino II", yearFrom: 2007, yearTo: 2014, bodyType: "van" },
        { name: "Fiorino III", yearFrom: 2014, yearTo: null, bodyType: "van" },
      ]},
    ],
  },
  {
    name: "Volvo",
    models: [
      { name: "XC40", generations: [{ name: "XC40", yearFrom: 2017, yearTo: null, bodyType: "suv" }]},
      { name: "EX40", generations: [{ name: "EX40", yearFrom: 2024, yearTo: null, bodyType: "suv" }]},
      { name: "XC60", generations: [
        { name: "XC60 I", yearFrom: 2008, yearTo: 2017, bodyType: "suv" },
        { name: "XC60 II", yearFrom: 2017, yearTo: null, bodyType: "suv" },
      ]},
      { name: "XC90", generations: [
        { name: "XC90 I", yearFrom: 2002, yearTo: 2014, bodyType: "suv" },
        { name: "XC90 II", yearFrom: 2014, yearTo: null, bodyType: "suv" },
      ]},
      { name: "S40", generations: [{ name: "S40 II", yearFrom: 2003, yearTo: 2012, bodyType: "sedan" }]},
      { name: "S60", generations: [
        { name: "S60 II", yearFrom: 2010, yearTo: 2018, bodyType: "sedan" },
        { name: "S60 III", yearFrom: 2018, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "S80", generations: [
        { name: "S80 I", yearFrom: 1998, yearTo: 2006, bodyType: "sedan" },
        { name: "S80 II", yearFrom: 2006, yearTo: 2016, bodyType: "sedan" },
      ]},
      { name: "S90", generations: [{ name: "S90", yearFrom: 2016, yearTo: null, bodyType: "sedan" }]},
      { name: "V40", generations: [{ name: "V40 II", yearFrom: 2012, yearTo: 2019, bodyType: "hatchback" }]},
      { name: "V50", generations: [{ name: "V50", yearFrom: 2004, yearTo: 2012, bodyType: "wagon" }]},
      { name: "V60", generations: [
        { name: "V60 I", yearFrom: 2010, yearTo: 2018, bodyType: "wagon" },
        { name: "V60 II", yearFrom: 2018, yearTo: null, bodyType: "wagon" },
      ]},
      { name: "V70", generations: [
        { name: "V70 II", yearFrom: 2000, yearTo: 2007, bodyType: "wagon" },
        { name: "V70 III", yearFrom: 2007, yearTo: 2016, bodyType: "wagon" },
      ]},
      { name: "V90", generations: [{ name: "V90", yearFrom: 2016, yearTo: null, bodyType: "wagon" }]},
      { name: "C30", generations: [{ name: "C30", yearFrom: 2006, yearTo: 2013, bodyType: "hatchback" }]},
      { name: "C40", generations: [{ name: "C40", yearFrom: 2021, yearTo: null, bodyType: "suv" }]},
      { name: "C70", generations: [{ name: "C70 II", yearFrom: 2006, yearTo: 2013, bodyType: "cabrio" }]},
      { name: "EX30", generations: [{ name: "EX30", yearFrom: 2023, yearTo: null, bodyType: "suv" }]},
      { name: "EX90", generations: [{ name: "EX90", yearFrom: 2024, yearTo: null, bodyType: "suv" }]},
    ],
  },
  {
    name: "Porsche",
    models: [
      { name: "911", generations: [
        { name: "911 996", yearFrom: 1997, yearTo: 2004, bodyType: "coupe" },
        { name: "911 997", yearFrom: 2004, yearTo: 2012, bodyType: "coupe" },
        { name: "911 991", yearFrom: 2011, yearTo: 2019, bodyType: "coupe" },
        { name: "911 992", yearFrom: 2019, yearTo: null, bodyType: "coupe" },
      ]},
      { name: "Cayenne", generations: [
        { name: "Cayenne I", yearFrom: 2002, yearTo: 2010, bodyType: "suv" },
        { name: "Cayenne II", yearFrom: 2010, yearTo: 2017, bodyType: "suv" },
        { name: "Cayenne III", yearFrom: 2017, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Macan", generations: [
        { name: "Macan I", yearFrom: 2014, yearTo: 2023, bodyType: "suv" },
        { name: "Macan II", yearFrom: 2024, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Panamera", generations: [
        { name: "Panamera I", yearFrom: 2009, yearTo: 2016, bodyType: "liftback" },
        { name: "Panamera II", yearFrom: 2016, yearTo: null, bodyType: "liftback" },
      ]},
      { name: "Taycan", generations: [{ name: "Taycan", yearFrom: 2019, yearTo: null, bodyType: "liftback" }]},
      { name: "Boxster", generations: [
        { name: "Boxster 986", yearFrom: 1996, yearTo: 2004, bodyType: "roadster" },
        { name: "Boxster 987", yearFrom: 2004, yearTo: 2012, bodyType: "roadster" },
        { name: "Boxster 981", yearFrom: 2012, yearTo: 2016, bodyType: "roadster" },
        { name: "718 Boxster", yearFrom: 2016, yearTo: null, bodyType: "roadster" },
      ]},
      { name: "Cayman", generations: [
        { name: "Cayman 987c", yearFrom: 2005, yearTo: 2012, bodyType: "coupe" },
        { name: "Cayman 981c", yearFrom: 2012, yearTo: 2016, bodyType: "coupe" },
        { name: "718 Cayman", yearFrom: 2016, yearTo: null, bodyType: "coupe" },
      ]},
    ],
  },
  {
    name: "MINI",
    models: [
      { name: "Cooper", generations: [
        { name: "MINI R50", yearFrom: 2000, yearTo: 2006, bodyType: "hatchback" },
        { name: "MINI R56", yearFrom: 2006, yearTo: 2013, bodyType: "hatchback" },
        { name: "MINI F56", yearFrom: 2013, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Countryman", generations: [
        { name: "Countryman R60", yearFrom: 2010, yearTo: 2016, bodyType: "crossover" },
        { name: "Countryman F60", yearFrom: 2016, yearTo: 2023, bodyType: "crossover" },
        { name: "Countryman U25", yearFrom: 2023, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Clubman", generations: [
        { name: "Clubman R55", yearFrom: 2007, yearTo: 2014, bodyType: "wagon" },
        { name: "Clubman F54", yearFrom: 2015, yearTo: null, bodyType: "wagon" },
      ]},
      { name: "Paceman", generations: [{ name: "Paceman R61", yearFrom: 2012, yearTo: 2016, bodyType: "crossover" }]},
      { name: "Coupe", generations: [{ name: "Coupe R58", yearFrom: 2011, yearTo: 2015, bodyType: "coupe" }]},
      { name: "Roadster", generations: [{ name: "Roadster R59", yearFrom: 2012, yearTo: 2015, bodyType: "roadster" }]},
    ],
  },
  {
    name: "Jaguar",
    models: [
      { name: "XE", generations: [{ name: "XE", yearFrom: 2015, yearTo: null, bodyType: "sedan" }]},
      { name: "XF", generations: [
        { name: "XF I", yearFrom: 2007, yearTo: 2015, bodyType: "sedan" },
        { name: "XF II", yearFrom: 2015, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "XJ", generations: [
        { name: "XJ X350", yearFrom: 2003, yearTo: 2009, bodyType: "sedan" },
        { name: "XJ X351", yearFrom: 2009, yearTo: 2019, bodyType: "sedan" },
      ]},
      { name: "F-Pace", generations: [{ name: "F-Pace", yearFrom: 2016, yearTo: null, bodyType: "suv" }]},
      { name: "E-Pace", generations: [{ name: "E-Pace", yearFrom: 2017, yearTo: null, bodyType: "suv" }]},
      { name: "I-Pace", generations: [{ name: "I-Pace", yearFrom: 2018, yearTo: null, bodyType: "suv" }]},
      { name: "F-Type", generations: [{ name: "F-Type", yearFrom: 2013, yearTo: null, bodyType: "coupe" }]},
      { name: "XK", generations: [{ name: "XK/XKR X150", yearFrom: 2006, yearTo: 2014, bodyType: "coupe" }]},
      { name: "S-Type", generations: [{ name: "S-Type", yearFrom: 1998, yearTo: 2008, bodyType: "sedan" }]},
      { name: "X-Type", generations: [{ name: "X-Type", yearFrom: 2001, yearTo: 2009, bodyType: "sedan" }]},
    ],
  },
  {
    name: "Land Rover",
    models: [
      { name: "Range Rover", generations: [
        { name: "Range Rover L322", yearFrom: 2002, yearTo: 2012, bodyType: "suv" },
        { name: "Range Rover L405", yearFrom: 2012, yearTo: 2022, bodyType: "suv" },
        { name: "Range Rover L460", yearFrom: 2022, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Range Rover Sport", generations: [
        { name: "Range Rover Sport L320", yearFrom: 2005, yearTo: 2013, bodyType: "suv" },
        { name: "Range Rover Sport L494", yearFrom: 2013, yearTo: 2022, bodyType: "suv" },
        { name: "Range Rover Sport L461", yearFrom: 2022, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Range Rover Evoque", generations: [
        { name: "Evoque L538", yearFrom: 2011, yearTo: 2019, bodyType: "suv" },
        { name: "Evoque L551", yearFrom: 2019, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Range Rover Velar", generations: [{ name: "Velar", yearFrom: 2017, yearTo: null, bodyType: "suv" }]},
      { name: "Discovery", generations: [
        { name: "Discovery 3", yearFrom: 2004, yearTo: 2009, bodyType: "suv" },
        { name: "Discovery 4", yearFrom: 2009, yearTo: 2016, bodyType: "suv" },
        { name: "Discovery 5", yearFrom: 2016, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Discovery Sport", generations: [{ name: "Discovery Sport", yearFrom: 2014, yearTo: null, bodyType: "suv" }]},
      { name: "Defender", generations: [{ name: "Defender L663", yearFrom: 2020, yearTo: null, bodyType: "suv" }]},
      { name: "Freelander", generations: [
        { name: "Freelander 1", yearFrom: 1997, yearTo: 2006, bodyType: "suv" },
        { name: "Freelander 2", yearFrom: 2006, yearTo: 2014, bodyType: "suv" },
      ]},
    ],
  },
  {
    name: "SEAT",
    models: [
      { name: "Leon", generations: [
        { name: "Leon I", yearFrom: 1999, yearTo: 2005, bodyType: "hatchback" },
        { name: "Leon II", yearFrom: 2005, yearTo: 2012, bodyType: "hatchback" },
        { name: "Leon III", yearFrom: 2012, yearTo: 2020, bodyType: "hatchback" },
        { name: "Leon IV", yearFrom: 2020, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Ibiza", generations: [
        { name: "Ibiza III", yearFrom: 2002, yearTo: 2008, bodyType: "hatchback" },
        { name: "Ibiza IV", yearFrom: 2008, yearTo: 2017, bodyType: "hatchback" },
        { name: "Ibiza V", yearFrom: 2017, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Ateca", generations: [{ name: "Ateca", yearFrom: 2016, yearTo: null, bodyType: "suv" }]},
      { name: "Arona", generations: [{ name: "Arona", yearFrom: 2017, yearTo: null, bodyType: "crossover" }]},
      { name: "Tarraco", generations: [{ name: "Tarraco", yearFrom: 2018, yearTo: null, bodyType: "suv" }]},
      { name: "Toledo", generations: [
        { name: "Toledo II", yearFrom: 1998, yearTo: 2004, bodyType: "sedan" },
        { name: "Toledo III", yearFrom: 2004, yearTo: 2009, bodyType: "liftback" },
        { name: "Toledo IV", yearFrom: 2012, yearTo: 2019, bodyType: "liftback" },
      ]},
      { name: "Altea", generations: [
        { name: "Altea", yearFrom: 2004, yearTo: 2015, bodyType: "hatchback" },
        { name: "Altea XL", yearFrom: 2007, yearTo: 2015, bodyType: "hatchback" },
      ]},
      { name: "Alhambra", vehicleType: "bus", generations: [
        { name: "Alhambra I", yearFrom: 1996, yearTo: 2010, bodyType: "minivan" },
        { name: "Alhambra II", yearFrom: 2010, yearTo: 2020, bodyType: "minivan" },
      ]},
      { name: "Mii", generations: [{ name: "Mii", yearFrom: 2011, yearTo: 2021, bodyType: "hatchback" }]},
      { name: "Cordoba", generations: [
        { name: "Cordoba", yearFrom: 1993, yearTo: 1999, bodyType: "sedan" },
        { name: "Cordoba II", yearFrom: 1999, yearTo: 2009, bodyType: "sedan" },
      ]},
    ],
  },
  {
    name: "Alfa Romeo",
    models: [
      { name: "Giulia", generations: [{ name: "Giulia", yearFrom: 2015, yearTo: null, bodyType: "sedan" }]},
      { name: "Stelvio", generations: [{ name: "Stelvio", yearFrom: 2016, yearTo: null, bodyType: "suv" }]},
      { name: "Giulietta", generations: [{ name: "Giulietta 940", yearFrom: 2010, yearTo: 2020, bodyType: "hatchback" }]},
      { name: "159", generations: [{ name: "159", yearFrom: 2005, yearTo: 2011, bodyType: "sedan" }]},
      { name: "MiTo", generations: [{ name: "MiTo", yearFrom: 2008, yearTo: 2018, bodyType: "hatchback" }]},
      { name: "147", generations: [{ name: "147", yearFrom: 2000, yearTo: 2010, bodyType: "hatchback" }]},
      { name: "156", generations: [{ name: "156", yearFrom: 1997, yearTo: 2007, bodyType: "sedan" }]},
      { name: "GT", generations: [{ name: "GT", yearFrom: 2003, yearTo: 2010, bodyType: "coupe" }]},
      { name: "Brera", generations: [{ name: "Brera/Spider", yearFrom: 2005, yearTo: 2010, bodyType: "coupe" }]},
      { name: "Tonale", generations: [{ name: "Tonale", yearFrom: 2022, yearTo: null, bodyType: "suv" }]},
    ],
  },
  {
    name: "Maserati",
    models: [
      { name: "Ghibli", generations: [{ name: "Ghibli III", yearFrom: 2013, yearTo: null, bodyType: "sedan" }]},
      { name: "Levante", generations: [{ name: "Levante", yearFrom: 2016, yearTo: null, bodyType: "suv" }]},
      { name: "Quattroporte", generations: [
        { name: "Quattroporte V", yearFrom: 2003, yearTo: 2012, bodyType: "sedan" },
        { name: "Quattroporte VI", yearFrom: 2013, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "GranTurismo", generations: [
        { name: "GranTurismo I", yearFrom: 2007, yearTo: 2019, bodyType: "coupe" },
        { name: "GranTurismo II", yearFrom: 2023, yearTo: null, bodyType: "coupe" },
      ]},
      { name: "Grecale", generations: [{ name: "Grecale", yearFrom: 2022, yearTo: null, bodyType: "suv" }]},
      { name: "MC20", generations: [{ name: "MC20", yearFrom: 2020, yearTo: null, bodyType: "coupe" }]},
      { name: "GranCabrio", generations: [
        { name: "GranCabrio", yearFrom: 2010, yearTo: 2019, bodyType: "cabrio" },
        { name: "GranCabrio II", yearFrom: 2024, yearTo: null, bodyType: "cabrio" },
      ]},
    ],
  },
  {
    name: "Ferrari",
    models: [
      { name: "488", generations: [
        { name: "488 GTB", yearFrom: 2015, yearTo: 2019, bodyType: "coupe" },
        { name: "488 Spider", yearFrom: 2015, yearTo: 2019, bodyType: "cabrio" },
      ]},
      { name: "F8 Tributo", generations: [
        { name: "F8 Tributo", yearFrom: 2019, yearTo: 2023, bodyType: "coupe" },
        { name: "F8 Spider", yearFrom: 2019, yearTo: 2023, bodyType: "cabrio" },
      ]},
      { name: "Roma", generations: [{ name: "Roma", yearFrom: 2020, yearTo: null, bodyType: "coupe" }]},
      { name: "SF90", generations: [{ name: "SF90 Stradale", yearFrom: 2019, yearTo: null, bodyType: "coupe" }]},
      { name: "296", generations: [
        { name: "296 GTB", yearFrom: 2022, yearTo: null, bodyType: "coupe" },
        { name: "296 GTS", yearFrom: 2022, yearTo: null, bodyType: "cabrio" },
      ]},
      { name: "Portofino", generations: [
        { name: "Portofino", yearFrom: 2017, yearTo: 2022, bodyType: "cabrio" },
        { name: "Portofino M", yearFrom: 2020, yearTo: 2023, bodyType: "cabrio" },
      ]},
      { name: "812", generations: [
        { name: "812 Superfast", yearFrom: 2017, yearTo: 2024, bodyType: "coupe" },
        { name: "812 GTS", yearFrom: 2019, yearTo: 2024, bodyType: "cabrio" },
      ]},
      { name: "California", generations: [
        { name: "California", yearFrom: 2008, yearTo: 2014, bodyType: "cabrio" },
        { name: "California T", yearFrom: 2014, yearTo: 2017, bodyType: "cabrio" },
      ]},
      { name: "458", generations: [
        { name: "458 Italia", yearFrom: 2009, yearTo: 2015, bodyType: "coupe" },
        { name: "458 Spider", yearFrom: 2011, yearTo: 2015, bodyType: "cabrio" },
      ]},
      { name: "FF", generations: [
        { name: "FF", yearFrom: 2011, yearTo: 2016, bodyType: "coupe" },
        { name: "GTC4Lusso", yearFrom: 2016, yearTo: 2020, bodyType: "coupe" },
      ]},
      { name: "F12", generations: [{ name: "F12 Berlinetta", yearFrom: 2012, yearTo: 2017, bodyType: "coupe" }]},
      { name: "LaFerrari", generations: [{ name: "LaFerrari", yearFrom: 2013, yearTo: 2018, bodyType: "coupe" }]},
    ],
  },
  {
    name: "Lamborghini",
    models: [
      { name: "Huracán", generations: [
        { name: "Huracán LP610", yearFrom: 2014, yearTo: 2019, bodyType: "coupe" },
        { name: "Huracán EVO", yearFrom: 2019, yearTo: 2022, bodyType: "coupe" },
        { name: "Huracán Tecnica", yearFrom: 2022, yearTo: null, bodyType: "coupe" },
        { name: "Huracán STO", yearFrom: 2021, yearTo: null, bodyType: "coupe" },
      ]},
      { name: "Urus", generations: [
        { name: "Urus", yearFrom: 2018, yearTo: 2024, bodyType: "suv" },
        { name: "Urus SE", yearFrom: 2024, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Aventador", generations: [
        { name: "Aventador LP700", yearFrom: 2011, yearTo: 2016, bodyType: "coupe" },
        { name: "Aventador S", yearFrom: 2016, yearTo: 2018, bodyType: "coupe" },
        { name: "Aventador SVJ", yearFrom: 2018, yearTo: 2022, bodyType: "coupe" },
      ]},
      { name: "Gallardo", generations: [{ name: "Gallardo", yearFrom: 2003, yearTo: 2013, bodyType: "coupe" }]},
      { name: "Revuelto", generations: [{ name: "Revuelto", yearFrom: 2023, yearTo: null, bodyType: "coupe" }]},
    ],
  },
  {
    name: "Bentley",
    models: [
      { name: "Continental GT", generations: [
        { name: "Continental GT I", yearFrom: 2003, yearTo: 2011, bodyType: "coupe" },
        { name: "Continental GT II", yearFrom: 2011, yearTo: 2018, bodyType: "coupe" },
        { name: "Continental GT III", yearFrom: 2018, yearTo: null, bodyType: "coupe" },
      ]},
      { name: "Flying Spur", generations: [
        { name: "Flying Spur I", yearFrom: 2005, yearTo: 2013, bodyType: "sedan" },
        { name: "Flying Spur II", yearFrom: 2013, yearTo: 2019, bodyType: "sedan" },
        { name: "Flying Spur III", yearFrom: 2019, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Bentayga", generations: [
        { name: "Bentayga I", yearFrom: 2015, yearTo: 2020, bodyType: "suv" },
        { name: "Bentayga II", yearFrom: 2020, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Mulsanne", generations: [{ name: "Mulsanne", yearFrom: 2010, yearTo: 2020, bodyType: "sedan" }]},
    ],
  },
  {
    name: "Rolls-Royce",
    models: [
      { name: "Phantom", generations: [
        { name: "Phantom VII", yearFrom: 2003, yearTo: 2017, bodyType: "sedan" },
        { name: "Phantom VIII", yearFrom: 2017, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Ghost", generations: [
        { name: "Ghost I", yearFrom: 2009, yearTo: 2020, bodyType: "sedan" },
        { name: "Ghost II", yearFrom: 2020, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Wraith", generations: [{ name: "Wraith", yearFrom: 2013, yearTo: 2023, bodyType: "coupe" }]},
      { name: "Cullinan", generations: [{ name: "Cullinan", yearFrom: 2018, yearTo: null, bodyType: "suv" }]},
      { name: "Dawn", generations: [{ name: "Dawn", yearFrom: 2015, yearTo: 2023, bodyType: "cabrio" }]},
      { name: "Spectre", generations: [{ name: "Spectre", yearFrom: 2023, yearTo: null, bodyType: "coupe" }]},
    ],
  },
  {
    name: "Aston Martin",
    models: [
      { name: "DB11", generations: [{ name: "DB11", yearFrom: 2016, yearTo: 2023, bodyType: "coupe" }]},
      { name: "DB12", generations: [{ name: "DB12", yearFrom: 2023, yearTo: null, bodyType: "coupe" }]},
      { name: "Vantage", generations: [
        { name: "Vantage V8", yearFrom: 2005, yearTo: 2017, bodyType: "coupe" },
        { name: "Vantage (new)", yearFrom: 2018, yearTo: null, bodyType: "coupe" },
      ]},
      { name: "DBX", generations: [
        { name: "DBX", yearFrom: 2020, yearTo: null, bodyType: "suv" },
        { name: "DBX707", yearFrom: 2022, yearTo: null, bodyType: "suv" },
      ]},
      { name: "DBS", generations: [{ name: "DBS Superleggera", yearFrom: 2018, yearTo: 2023, bodyType: "coupe" }]},
      { name: "Rapide", generations: [{ name: "Rapide/S", yearFrom: 2010, yearTo: 2020, bodyType: "sedan" }]},
      { name: "DB9", generations: [{ name: "DB9", yearFrom: 2004, yearTo: 2016, bodyType: "coupe" }]},
    ],
  },
  {
    name: "McLaren",
    models: [
      { name: "570S", generations: [
        { name: "570S", yearFrom: 2015, yearTo: 2020, bodyType: "coupe" },
        { name: "570GT", yearFrom: 2016, yearTo: 2020, bodyType: "coupe" },
      ]},
      { name: "600LT", generations: [{ name: "600LT", yearFrom: 2018, yearTo: 2021, bodyType: "coupe" }]},
      { name: "620R", generations: [{ name: "620R", yearFrom: 2019, yearTo: 2020, bodyType: "coupe" }]},
      { name: "720S", generations: [{ name: "720S", yearFrom: 2017, yearTo: null, bodyType: "coupe" }]},
      { name: "765LT", generations: [{ name: "765LT", yearFrom: 2020, yearTo: 2021, bodyType: "coupe" }]},
      { name: "GT", generations: [{ name: "GT", yearFrom: 2019, yearTo: null, bodyType: "coupe" }]},
      { name: "Artura", generations: [{ name: "Artura", yearFrom: 2021, yearTo: null, bodyType: "coupe" }]},
      { name: "P1", generations: [{ name: "P1", yearFrom: 2013, yearTo: 2015, bodyType: "coupe" }]},
      { name: "540C", generations: [{ name: "540C", yearFrom: 2015, yearTo: 2020, bodyType: "coupe" }]},
    ],
  },
  {
    name: "Smart",
    models: [
      { name: "ForTwo", generations: [
        { name: "ForTwo W450", yearFrom: 1998, yearTo: 2007, bodyType: "hatchback" },
        { name: "ForTwo W451", yearFrom: 2007, yearTo: 2014, bodyType: "hatchback" },
        { name: "ForTwo W453", yearFrom: 2014, yearTo: 2019, bodyType: "hatchback" },
      ]},
      { name: "ForFour", generations: [{ name: "ForFour W453", yearFrom: 2014, yearTo: 2019, bodyType: "hatchback" }]},
      { name: "#1", generations: [{ name: "#1", yearFrom: 2022, yearTo: null, bodyType: "suv" }]},
      { name: "#3", generations: [{ name: "#3", yearFrom: 2024, yearTo: null, bodyType: "suv" }]},
    ],
  },
  {
    name: "Saab",
    models: [
      { name: "9-3", generations: [
        { name: "9-3 I", yearFrom: 1998, yearTo: 2002, bodyType: "sedan" },
        { name: "9-3 II", yearFrom: 2002, yearTo: 2012, bodyType: "sedan" },
      ]},
      { name: "9-5", generations: [
        { name: "9-5 I", yearFrom: 1997, yearTo: 2010, bodyType: "sedan" },
        { name: "9-5 II", yearFrom: 2010, yearTo: 2012, bodyType: "sedan" },
      ]},
      { name: "9-4X", generations: [{ name: "9-4X", yearFrom: 2011, yearTo: 2012, bodyType: "suv" }]},
    ],
  },
  {
    name: "Dacia",
    models: [
      { name: "Logan", generations: [
        { name: "Logan I", yearFrom: 2004, yearTo: 2012, bodyType: "sedan" },
        { name: "Logan II", yearFrom: 2012, yearTo: 2021, bodyType: "sedan" },
        { name: "Logan III", yearFrom: 2021, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Sandero", generations: [
        { name: "Sandero I", yearFrom: 2008, yearTo: 2012, bodyType: "hatchback" },
        { name: "Sandero II", yearFrom: 2012, yearTo: 2020, bodyType: "hatchback" },
        { name: "Sandero III", yearFrom: 2020, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Duster", generations: [
        { name: "Duster I", yearFrom: 2010, yearTo: 2015, bodyType: "suv" },
        { name: "Duster II", yearFrom: 2015, yearTo: 2021, bodyType: "suv" },
        { name: "Duster III", yearFrom: 2021, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Lodgy", vehicleType: "bus", generations: [{ name: "Lodgy", yearFrom: 2012, yearTo: 2022, bodyType: "minivan" }]},
      { name: "Dokker", vehicleType: "bus", generations: [{ name: "Dokker", yearFrom: 2012, yearTo: null, bodyType: "van" }]},
      { name: "Jogger", generations: [{ name: "Jogger", yearFrom: 2022, yearTo: null, bodyType: "wagon" }]},
      { name: "Spring", generations: [{ name: "Spring", yearFrom: 2021, yearTo: null, bodyType: "hatchback" }]},
    ],
  },
  {
    name: "DS",
    models: [
      { name: "DS 3", generations: [{ name: "DS 3 Crossback", yearFrom: 2018, yearTo: null, bodyType: "crossover" }]},
      { name: "DS 4", generations: [
        { name: "DS 4 I", yearFrom: 2021, yearTo: 2024, bodyType: "hatchback" },
        { name: "DS 4 II", yearFrom: 2024, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "DS 5", generations: [{ name: "DS 5", yearFrom: 2011, yearTo: 2018, bodyType: "liftback" }]},
      { name: "DS 7", generations: [{ name: "DS 7 Crossback", yearFrom: 2017, yearTo: null, bodyType: "suv" }]},
      { name: "DS 9", generations: [{ name: "DS 9", yearFrom: 2020, yearTo: null, bodyType: "sedan" }]},
    ],
  },
  {
    name: "Cupra",
    models: [
      { name: "Ateca", generations: [{ name: "Cupra Ateca", yearFrom: 2018, yearTo: null, bodyType: "suv" }]},
      { name: "Formentor", generations: [{ name: "Formentor", yearFrom: 2020, yearTo: null, bodyType: "crossover" }]},
      { name: "Born", generations: [{ name: "Born", yearFrom: 2021, yearTo: null, bodyType: "hatchback" }]},
      { name: "Leon", generations: [{ name: "Cupra Leon", yearFrom: 2020, yearTo: null, bodyType: "hatchback" }]},
      { name: "Tavascan", generations: [{ name: "Tavascan", yearFrom: 2024, yearTo: null, bodyType: "suv" }]},
    ],
  },
  {
    name: "Alpine",
    models: [
      { name: "A110", generations: [{ name: "A110 (2017+)", yearFrom: 2017, yearTo: null, bodyType: "coupe" }]},
    ],
  },
  {
    name: "Lotus",
    models: [
      { name: "Elise", generations: [
        { name: "Elise S1", yearFrom: 1996, yearTo: 2001, bodyType: "roadster" },
        { name: "Elise S2", yearFrom: 2001, yearTo: 2010, bodyType: "roadster" },
        { name: "Elise S3", yearFrom: 2010, yearTo: 2021, bodyType: "roadster" },
      ]},
      { name: "Exige", generations: [
        { name: "Exige S1", yearFrom: 2000, yearTo: 2004, bodyType: "coupe" },
        { name: "Exige S2", yearFrom: 2004, yearTo: 2012, bodyType: "coupe" },
        { name: "Exige S3", yearFrom: 2012, yearTo: 2021, bodyType: "coupe" },
      ]},
      { name: "Evora", generations: [{ name: "Evora", yearFrom: 2009, yearTo: 2021, bodyType: "coupe" }]},
      { name: "Emira", generations: [{ name: "Emira", yearFrom: 2021, yearTo: null, bodyType: "coupe" }]},
      { name: "Eletre", generations: [{ name: "Eletre", yearFrom: 2023, yearTo: null, bodyType: "suv" }]},
    ],
  },
  {
    name: "Polestar",
    models: [
      { name: "Polestar 1", generations: [{ name: "Polestar 1", yearFrom: 2019, yearTo: 2021, bodyType: "coupe" }]},
      { name: "Polestar 2", generations: [{ name: "Polestar 2", yearFrom: 2020, yearTo: null, bodyType: "liftback" }]},
      { name: "Polestar 3", generations: [{ name: "Polestar 3", yearFrom: 2023, yearTo: null, bodyType: "suv" }]},
      { name: "Polestar 4", generations: [{ name: "Polestar 4", yearFrom: 2024, yearTo: null, bodyType: "suv" }]},
    ],
  },
  {
    name: "Lancia",
    models: [
      { name: "Ypsilon", generations: [
        { name: "Ypsilon 843", yearFrom: 2003, yearTo: 2011, bodyType: "hatchback" },
        { name: "Ypsilon 846", yearFrom: 2011, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Delta", generations: [{ name: "Delta III", yearFrom: 2008, yearTo: 2014, bodyType: "hatchback" }]},
      { name: "Musa", vehicleType: "bus", generations: [{ name: "Musa", yearFrom: 2004, yearTo: 2012, bodyType: "minivan" }]},
      { name: "Thesis", generations: [{ name: "Thesis", yearFrom: 2001, yearTo: 2009, bodyType: "sedan" }]},
    ],
  },
  {
    name: "Rover",
    models: [
      { name: "75", generations: [{ name: "75", yearFrom: 1998, yearTo: 2005, bodyType: "sedan" }]},
      { name: "45", generations: [{ name: "45", yearFrom: 1999, yearTo: 2005, bodyType: "sedan" }]},
      { name: "25", generations: [{ name: "25", yearFrom: 1999, yearTo: 2005, bodyType: "hatchback" }]},
      { name: "200", generations: [{ name: "200", yearFrom: 1989, yearTo: 1999, bodyType: "hatchback" }]},
      { name: "400", generations: [{ name: "400", yearFrom: 1990, yearTo: 1999, bodyType: "sedan" }]},
      { name: "600", generations: [{ name: "600", yearFrom: 1993, yearTo: 1999, bodyType: "sedan" }]},
    ],
  },
];
