import type { BrandData } from "./car-data-eu";

export const otherBrands: BrandData[] = [
  // ========== AMERICAN ==========
  {
    name: "Ford",
    models: [
      { name: "Focus", generations: [
        { name: "Focus I", yearFrom: 1998, yearTo: 2004, bodyType: "hatchback" },
        { name: "Focus II", yearFrom: 2004, yearTo: 2011, bodyType: "hatchback" },
        { name: "Focus III", yearFrom: 2011, yearTo: 2018, bodyType: "hatchback" },
        { name: "Focus IV", yearFrom: 2018, yearTo: 2025, bodyType: "hatchback" },
      ]},
      { name: "Mondeo", generations: [
        { name: "Mondeo II", yearFrom: 2000, yearTo: 2007, bodyType: "sedan" },
        { name: "Mondeo III", yearFrom: 2007, yearTo: 2014, bodyType: "sedan" },
        { name: "Mondeo IV", yearFrom: 2014, yearTo: 2022, bodyType: "sedan" },
        { name: "Mondeo V", yearFrom: 2022, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Fiesta", generations: [
        { name: "Fiesta V", yearFrom: 1995, yearTo: 1999, bodyType: "hatchback" },
        { name: "Fiesta VI", yearFrom: 1999, yearTo: 2008, bodyType: "hatchback" },
        { name: "Fiesta VII", yearFrom: 2008, yearTo: 2017, bodyType: "hatchback" },
      ]},
      { name: "Kuga", generations: [
        { name: "Kuga I", yearFrom: 2008, yearTo: 2012, bodyType: "crossover" },
        { name: "Kuga II", yearFrom: 2012, yearTo: 2020, bodyType: "crossover" },
        { name: "Kuga III", yearFrom: 2020, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Explorer", generations: [
        { name: "Explorer III", yearFrom: 1995, yearTo: 2001, bodyType: "suv" },
        { name: "Explorer IV", yearFrom: 2002, yearTo: 2005, bodyType: "suv" },
        { name: "Explorer V", yearFrom: 2006, yearTo: 2010, bodyType: "suv" },
        { name: "Explorer VI", yearFrom: 2011, yearTo: 2019, bodyType: "suv" },
        { name: "Explorer (U625)", yearFrom: 2020, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Mustang", generations: [
        { name: "Mustang V", yearFrom: 2005, yearTo: 2014, bodyType: "coupe" },
        { name: "Mustang VI", yearFrom: 2015, yearTo: 2023, bodyType: "coupe" },
        { name: "Mustang VII", yearFrom: 2024, yearTo: null, bodyType: "coupe" },
      ]},
      { name: "EcoSport", generations: [
        { name: "EcoSport I", yearFrom: 2003, yearTo: 2012, bodyType: "crossover" },
        { name: "EcoSport II", yearFrom: 2012, yearTo: 2022, bodyType: "crossover" },
      ]},
      { name: "Puma", generations: [
        { name: "Puma I", yearFrom: 2019, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Bronco", generations: [
        { name: "Bronco VI", yearFrom: 2021, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Bronco Sport", generations: [
        { name: "Bronco Sport I", yearFrom: 2021, yearTo: null, bodyType: "suv" },
      ]},
      { name: "F-150", generations: [
        { name: "F-150 X", yearFrom: 1997, yearTo: 2003, bodyType: "pickup" },
        { name: "F-150 XI", yearFrom: 2004, yearTo: 2008, bodyType: "pickup" },
        { name: "F-150 XII", yearFrom: 2009, yearTo: 2014, bodyType: "pickup" },
        { name: "F-150 XIII", yearFrom: 2015, yearTo: 2020, bodyType: "pickup" },
        { name: "F-150 XIV", yearFrom: 2021, yearTo: null, bodyType: "pickup" },
      ]},
      { name: "Ranger", generations: [
        { name: "Ranger (T6)", yearFrom: 2011, yearTo: 2018, bodyType: "pickup" },
        { name: "Ranger (P703)", yearFrom: 2019, yearTo: null, bodyType: "pickup" },
      ]},
      { name: "Edge", generations: [
        { name: "Edge I", yearFrom: 2007, yearTo: 2014, bodyType: "crossover" },
        { name: "Edge II", yearFrom: 2015, yearTo: 2023, bodyType: "crossover" },
      ]},
      { name: "Escape", generations: [
        { name: "Escape I", yearFrom: 2001, yearTo: 2007, bodyType: "suv" },
        { name: "Escape II", yearFrom: 2008, yearTo: 2012, bodyType: "suv" },
        { name: "Escape III", yearFrom: 2013, yearTo: 2019, bodyType: "suv" },
        { name: "Escape IV", yearFrom: 2020, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Maverick", generations: [
        { name: "Maverick I", yearFrom: 2022, yearTo: null, bodyType: "pickup" },
      ]},
      { name: "Galaxy", vehicleType: "bus", generations: [
        { name: "Galaxy II", yearFrom: 2006, yearTo: 2015, bodyType: "minivan" },
        { name: "Galaxy III", yearFrom: 2015, yearTo: null, bodyType: "minivan" },
      ]},
      { name: "S-Max", vehicleType: "bus", generations: [
        { name: "S-Max I", yearFrom: 2006, yearTo: 2015, bodyType: "minivan" },
        { name: "S-Max II", yearFrom: 2015, yearTo: null, bodyType: "minivan" },
      ]},
      { name: "Transit", vehicleType: "bus", generations: [
        { name: "Transit V", yearFrom: 2000, yearTo: 2006, bodyType: "van" },
        { name: "Transit VI", yearFrom: 2006, yearTo: 2013, bodyType: "van" },
        { name: "Transit VII", yearFrom: 2014, yearTo: null, bodyType: "van" },
      ]},
      { name: "Transit Connect", vehicleType: "bus", generations: [
        { name: "Transit Connect I", yearFrom: 2002, yearTo: 2013, bodyType: "van" },
        { name: "Transit Connect II", yearFrom: 2013, yearTo: null, bodyType: "van" },
      ]},
      { name: "C-Max", vehicleType: "bus", generations: [
        { name: "C-Max I", yearFrom: 2003, yearTo: 2010, bodyType: "minivan" },
        { name: "C-Max II", yearFrom: 2010, yearTo: 2019, bodyType: "minivan" },
      ]},
      { name: "Fusion", generations: [
        { name: "Fusion I", yearFrom: 2006, yearTo: 2012, bodyType: "sedan" },
        { name: "Fusion II", yearFrom: 2013, yearTo: 2020, bodyType: "sedan" },
      ]},
      { name: "Taurus", generations: [
        { name: "Taurus IV", yearFrom: 2000, yearTo: 2007, bodyType: "sedan" },
        { name: "Taurus V", yearFrom: 2008, yearTo: 2009, bodyType: "sedan" },
        { name: "Taurus VI", yearFrom: 2010, yearTo: 2019, bodyType: "sedan" },
      ]},
      { name: "Expedition", generations: [
        { name: "Expedition II", yearFrom: 2003, yearTo: 2006, bodyType: "suv" },
        { name: "Expedition III", yearFrom: 2007, yearTo: 2017, bodyType: "suv" },
        { name: "Expedition IV", yearFrom: 2018, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Flex", generations: [
        { name: "Flex I", yearFrom: 2009, yearTo: 2019, bodyType: "crossover" },
      ]},
      { name: "Crown Victoria", generations: [
        { name: "Crown Victoria", yearFrom: 1992, yearTo: 2011, bodyType: "sedan" },
      ]},
    ],
  },
  {
    name: "Chevrolet",
    models: [
      { name: "Cruze", generations: [
        { name: "Cruze I", yearFrom: 2008, yearTo: 2016, bodyType: "sedan" },
        { name: "Cruze II", yearFrom: 2016, yearTo: 2019, bodyType: "sedan" },
      ]},
      { name: "Aveo", generations: [
        { name: "Aveo T200", yearFrom: 2002, yearTo: 2006, bodyType: "hatchback" },
        { name: "Aveo T250", yearFrom: 2006, yearTo: 2011, bodyType: "hatchback" },
        { name: "Aveo T300", yearFrom: 2011, yearTo: 2016, bodyType: "hatchback" },
      ]},
      { name: "Captiva", generations: [
        { name: "Captiva I", yearFrom: 2006, yearTo: 2015, bodyType: "suv" },
        { name: "Captiva II", yearFrom: 2019, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Tahoe", generations: [
        { name: "Tahoe III", yearFrom: 2000, yearTo: 2006, bodyType: "suv" },
        { name: "Tahoe IV", yearFrom: 2007, yearTo: 2014, bodyType: "suv" },
        { name: "Tahoe V", yearFrom: 2015, yearTo: 2020, bodyType: "suv" },
        { name: "Tahoe VI", yearFrom: 2021, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Camaro", generations: [
        { name: "Camaro V", yearFrom: 2010, yearTo: 2015, bodyType: "coupe" },
        { name: "Camaro VI", yearFrom: 2016, yearTo: 2023, bodyType: "coupe" },
      ]},
      { name: "Corvette", generations: [
        { name: "Corvette C5", yearFrom: 1997, yearTo: 2004, bodyType: "coupe" },
        { name: "Corvette C6", yearFrom: 2005, yearTo: 2013, bodyType: "coupe" },
        { name: "Corvette C7", yearFrom: 2014, yearTo: 2019, bodyType: "coupe" },
        { name: "Corvette C8", yearFrom: 2020, yearTo: null, bodyType: "coupe" },
      ]},
      { name: "Malibu", generations: [
        { name: "Malibu VII", yearFrom: 2004, yearTo: 2008, bodyType: "sedan" },
        { name: "Malibu VIII", yearFrom: 2008, yearTo: 2012, bodyType: "sedan" },
        { name: "Malibu IX", yearFrom: 2012, yearTo: 2016, bodyType: "sedan" },
        { name: "Malibu X", yearFrom: 2016, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Traverse", generations: [
        { name: "Traverse I", yearFrom: 2009, yearTo: 2017, bodyType: "suv" },
        { name: "Traverse II", yearFrom: 2018, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Trailblazer", generations: [
        { name: "Trailblazer I", yearFrom: 2002, yearTo: 2009, bodyType: "suv" },
        { name: "Trailblazer II", yearFrom: 2012, yearTo: 2019, bodyType: "suv" },
        { name: "Trailblazer (new)", yearFrom: 2020, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Spark", generations: [
        { name: "Spark I", yearFrom: 2009, yearTo: 2015, bodyType: "hatchback" },
        { name: "Spark II", yearFrom: 2015, yearTo: 2019, bodyType: "hatchback" },
        { name: "Spark III", yearFrom: 2019, yearTo: 2022, bodyType: "hatchback" },
        { name: "Spark IV", yearFrom: 2022, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Orlando", vehicleType: "bus", generations: [
        { name: "Orlando I", yearFrom: 2011, yearTo: 2018, bodyType: "minivan" },
      ]},
      { name: "Lacetti", generations: [
        { name: "Lacetti", yearFrom: 2002, yearTo: 2013, bodyType: "sedan" },
      ]},
      { name: "Equinox", generations: [
        { name: "Equinox I", yearFrom: 2005, yearTo: 2009, bodyType: "suv" },
        { name: "Equinox II", yearFrom: 2010, yearTo: 2017, bodyType: "suv" },
        { name: "Equinox III", yearFrom: 2018, yearTo: 2023, bodyType: "suv" },
        { name: "Equinox IV", yearFrom: 2024, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Bolt EV", generations: [
        { name: "Bolt EV I", yearFrom: 2017, yearTo: 2023, bodyType: "hatchback" },
        { name: "Bolt EV II", yearFrom: 2025, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Bolt EUV", generations: [
        { name: "Bolt EUV I", yearFrom: 2021, yearTo: 2023, bodyType: "crossover" },
        { name: "Bolt EUV II", yearFrom: 2025, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Blazer", generations: [
        { name: "Blazer (new)", yearFrom: 2019, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Suburban", generations: [
        { name: "Suburban X", yearFrom: 2000, yearTo: 2006, bodyType: "suv" },
        { name: "Suburban XI", yearFrom: 2007, yearTo: 2014, bodyType: "suv" },
        { name: "Suburban XII", yearFrom: 2015, yearTo: 2020, bodyType: "suv" },
        { name: "Suburban XIII", yearFrom: 2021, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Silverado", generations: [
        { name: "Silverado II", yearFrom: 1999, yearTo: 2006, bodyType: "pickup" },
        { name: "Silverado III", yearFrom: 2007, yearTo: 2013, bodyType: "pickup" },
        { name: "Silverado IV", yearFrom: 2014, yearTo: 2018, bodyType: "pickup" },
        { name: "Silverado V", yearFrom: 2019, yearTo: null, bodyType: "pickup" },
      ]},
      { name: "Colorado", generations: [
        { name: "Colorado I", yearFrom: 2004, yearTo: 2012, bodyType: "pickup" },
        { name: "Colorado II", yearFrom: 2012, yearTo: 2022, bodyType: "pickup" },
        { name: "Colorado III", yearFrom: 2023, yearTo: null, bodyType: "pickup" },
      ]},
      { name: "Impala", generations: [
        { name: "Impala IX", yearFrom: 2000, yearTo: 2005, bodyType: "sedan" },
        { name: "Impala X", yearFrom: 2006, yearTo: 2020, bodyType: "sedan" },
      ]},
      { name: "Cobalt", generations: [
        { name: "Cobalt I", yearFrom: 2005, yearTo: 2010, bodyType: "sedan" },
        { name: "Cobalt II", yearFrom: 2011, yearTo: 2016, bodyType: "sedan" },
      ]},
      { name: "Niva", generations: [
        { name: "Niva I", yearFrom: 2002, yearTo: 2009, bodyType: "suv" },
        { name: "Niva рестайлинг", yearFrom: 2009, yearTo: 2020, bodyType: "suv" },
      ]},
      { name: "Tracker", generations: [
        { name: "Tracker (new)", yearFrom: 2019, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Onix", generations: [
        { name: "Onix I", yearFrom: 2012, yearTo: 2019, bodyType: "hatchback" },
        { name: "Onix II", yearFrom: 2019, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Lanos", generations: [
        { name: "Lanos", yearFrom: 1997, yearTo: 2012, bodyType: "sedan" },
      ]},
      { name: "Epica", generations: [
        { name: "Epica I", yearFrom: 2006, yearTo: 2012, bodyType: "sedan" },
        { name: "Epica II", yearFrom: 2012, yearTo: 2015, bodyType: "sedan" },
      ]},
      { name: "Trax", generations: [
        { name: "Trax I", yearFrom: 2013, yearTo: 2022, bodyType: "crossover" },
        { name: "Trax II", yearFrom: 2023, yearTo: null, bodyType: "crossover" },
      ]},
    ],
  },
  {
    name: "Jeep",
    models: [
      { name: "Wrangler", generations: [
        { name: "Wrangler TJ", yearFrom: 1997, yearTo: 2006, bodyType: "suv" },
        { name: "Wrangler JK", yearFrom: 2007, yearTo: 2018, bodyType: "suv" },
        { name: "Wrangler JL", yearFrom: 2018, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Grand Cherokee", generations: [
        { name: "Grand Cherokee WJ", yearFrom: 1999, yearTo: 2004, bodyType: "suv" },
        { name: "Grand Cherokee WK", yearFrom: 2005, yearTo: 2010, bodyType: "suv" },
        { name: "Grand Cherokee WK2", yearFrom: 2011, yearTo: 2021, bodyType: "suv" },
        { name: "Grand Cherokee WL", yearFrom: 2021, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Cherokee", generations: [
        { name: "Cherokee KJ", yearFrom: 2002, yearTo: 2007, bodyType: "suv" },
        { name: "Cherokee KK", yearFrom: 2008, yearTo: 2013, bodyType: "suv" },
        { name: "Cherokee KL", yearFrom: 2014, yearTo: 2023, bodyType: "suv" },
      ]},
      { name: "Compass", generations: [
        { name: "Compass MK", yearFrom: 2007, yearTo: 2016, bodyType: "crossover" },
        { name: "Compass MP", yearFrom: 2017, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Renegade", generations: [
        { name: "Renegade BU", yearFrom: 2014, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Gladiator", generations: [
        { name: "Gladiator JT", yearFrom: 2020, yearTo: null, bodyType: "pickup" },
      ]},
      { name: "Commander", generations: [
        { name: "Commander XK", yearFrom: 2006, yearTo: 2010, bodyType: "suv" },
        { name: "Commander (new)", yearFrom: 2022, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Patriot", generations: [
        { name: "Patriot MK", yearFrom: 2007, yearTo: 2017, bodyType: "crossover" },
      ]},
      { name: "Liberty", generations: [
        { name: "Liberty KJ", yearFrom: 2002, yearTo: 2007, bodyType: "suv" },
        { name: "Liberty KK", yearFrom: 2008, yearTo: 2012, bodyType: "suv" },
      ]},
      { name: "Grand Wagoneer", generations: [
        { name: "Grand Wagoneer", yearFrom: 2022, yearTo: null, bodyType: "suv" },
      ]},
    ],
  },
  {
    name: "Dodge",
    models: [
      { name: "Challenger", generations: [
        { name: "Challenger III", yearFrom: 2008, yearTo: 2023, bodyType: "coupe" },
      ]},
      { name: "Charger", generations: [
        { name: "Charger VII", yearFrom: 2006, yearTo: 2010, bodyType: "sedan" },
        { name: "Charger (LD)", yearFrom: 2011, yearTo: 2024, bodyType: "sedan" },
      ]},
      { name: "Durango", generations: [
        { name: "Durango III", yearFrom: 2011, yearTo: 2020, bodyType: "suv" },
        { name: "Durango IV", yearFrom: 2021, yearTo: null, bodyType: "suv" },
      ]},
      { name: "RAM 1500", generations: [
        { name: "RAM 1500 IV", yearFrom: 2009, yearTo: 2018, bodyType: "pickup" },
        { name: "RAM 1500 V", yearFrom: 2019, yearTo: null, bodyType: "pickup" },
      ]},
      { name: "Journey", generations: [
        { name: "Journey I", yearFrom: 2009, yearTo: 2020, bodyType: "crossover" },
      ]},
      { name: "Nitro", generations: [
        { name: "Nitro", yearFrom: 2007, yearTo: 2012, bodyType: "suv" },
      ]},
      { name: "Caliber", generations: [
        { name: "Caliber", yearFrom: 2007, yearTo: 2012, bodyType: "hatchback" },
      ]},
      { name: "Grand Caravan", vehicleType: "bus", generations: [
        { name: "Grand Caravan", yearFrom: 1984, yearTo: 2020, bodyType: "minivan" },
      ]},
      { name: "Viper", generations: [
        { name: "Viper ZB", yearFrom: 2013, yearTo: 2017, bodyType: "roadster" },
      ]},
      { name: "Hornet", generations: [
        { name: "Hornet", yearFrom: 2023, yearTo: null, bodyType: "crossover" },
      ]},
    ],
  },
  {
    name: "Chrysler",
    models: [
      { name: "300", generations: [
        { name: "300 LX", yearFrom: 2005, yearTo: 2010, bodyType: "sedan" },
        { name: "300 LD", yearFrom: 2011, yearTo: 2023, bodyType: "sedan" },
      ]},
      { name: "300C", generations: [
        { name: "300C LX", yearFrom: 2005, yearTo: 2010, bodyType: "sedan" },
        { name: "300C LD", yearFrom: 2011, yearTo: 2023, bodyType: "sedan" },
      ]},
      { name: "Pacifica", vehicleType: "bus", generations: [
        { name: "Pacifica CS", yearFrom: 2017, yearTo: 2023, bodyType: "minivan" },
        { name: "Pacifica RU", yearFrom: 2024, yearTo: null, bodyType: "minivan" },
      ]},
      { name: "Voyager", vehicleType: "bus", generations: [
        { name: "Voyager IV", yearFrom: 1996, yearTo: 2000, bodyType: "minivan" },
        { name: "Voyager V", yearFrom: 2019, yearTo: 2023, bodyType: "minivan" },
      ]},
      { name: "Sebring", generations: [
        { name: "Sebring II", yearFrom: 2001, yearTo: 2006, bodyType: "sedan" },
        { name: "Sebring III", yearFrom: 2007, yearTo: 2010, bodyType: "sedan" },
      ]},
      { name: "PT Cruiser", generations: [
        { name: "PT Cruiser", yearFrom: 2000, yearTo: 2010, bodyType: "hatchback" },
      ]},
      { name: "Crossfire", generations: [
        { name: "Crossfire", yearFrom: 2004, yearTo: 2008, bodyType: "coupe" },
      ]},
      { name: "Town & Country", vehicleType: "bus", generations: [
        { name: "Town & Country", yearFrom: 1990, yearTo: 2016, bodyType: "minivan" },
      ]},
    ],
  },
  {
    name: "Cadillac",
    models: [
      { name: "CTS", generations: [
        { name: "CTS I", yearFrom: 2003, yearTo: 2007, bodyType: "sedan" },
        { name: "CTS II", yearFrom: 2008, yearTo: 2013, bodyType: "sedan" },
        { name: "CTS III", yearFrom: 2014, yearTo: 2019, bodyType: "sedan" },
      ]},
      { name: "CT4", generations: [
        { name: "CT4 I", yearFrom: 2020, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "CT5", generations: [
        { name: "CT5 I", yearFrom: 2020, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "XT4", generations: [
        { name: "XT4 I", yearFrom: 2018, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "XT5", generations: [
        { name: "XT5 I", yearFrom: 2017, yearTo: null, bodyType: "suv" },
      ]},
      { name: "XT6", generations: [
        { name: "XT6 I", yearFrom: 2020, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Escalade", generations: [
        { name: "Escalade II", yearFrom: 2002, yearTo: 2006, bodyType: "suv" },
        { name: "Escalade III", yearFrom: 2007, yearTo: 2014, bodyType: "suv" },
        { name: "Escalade IV", yearFrom: 2015, yearTo: 2020, bodyType: "suv" },
        { name: "Escalade V", yearFrom: 2021, yearTo: null, bodyType: "suv" },
      ]},
      { name: "SRX", generations: [
        { name: "SRX I", yearFrom: 2004, yearTo: 2009, bodyType: "suv" },
        { name: "SRX II", yearFrom: 2010, yearTo: 2016, bodyType: "suv" },
      ]},
      { name: "ATS", generations: [
        { name: "ATS I", yearFrom: 2013, yearTo: 2019, bodyType: "sedan" },
      ]},
      { name: "XTS", generations: [
        { name: "XTS", yearFrom: 2013, yearTo: 2019, bodyType: "sedan" },
      ]},
      { name: "Lyriq", generations: [
        { name: "Lyriq I", yearFrom: 2023, yearTo: null, bodyType: "suv" },
      ]},
      { name: "STS", generations: [
        { name: "STS", yearFrom: 2005, yearTo: 2011, bodyType: "sedan" },
      ]},
      { name: "DTS", generations: [
        { name: "DTS", yearFrom: 2006, yearTo: 2011, bodyType: "sedan" },
      ]},
      { name: "ELR", generations: [
        { name: "ELR", yearFrom: 2014, yearTo: 2016, bodyType: "coupe" },
      ]},
    ],
  },
  {
    name: "Lincoln",
    models: [
      { name: "Navigator", generations: [
        { name: "Navigator III", yearFrom: 2003, yearTo: 2006, bodyType: "suv" },
        { name: "Navigator IV", yearFrom: 2007, yearTo: 2017, bodyType: "suv" },
        { name: "Navigator V", yearFrom: 2018, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Aviator", generations: [
        { name: "Aviator II", yearFrom: 2020, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Corsair", generations: [
        { name: "Corsair I", yearFrom: 2020, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Nautilus", generations: [
        { name: "Nautilus I", yearFrom: 2019, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Continental", generations: [
        { name: "Continental X", yearFrom: 2017, yearTo: 2020, bodyType: "sedan" },
      ]},
      { name: "MKX", generations: [
        { name: "MKX", yearFrom: 2007, yearTo: 2018, bodyType: "crossover" },
      ]},
      { name: "MKZ", generations: [
        { name: "MKZ", yearFrom: 2013, yearTo: 2020, bodyType: "sedan" },
      ]},
      { name: "MKC", generations: [
        { name: "MKC", yearFrom: 2015, yearTo: 2019, bodyType: "crossover" },
      ]},
      { name: "MKT", generations: [
        { name: "MKT", yearFrom: 2010, yearTo: 2019, bodyType: "suv" },
      ]},
      { name: "MKS", generations: [
        { name: "MKS", yearFrom: 2009, yearTo: 2016, bodyType: "sedan" },
      ]},
      { name: "Town Car", generations: [
        { name: "Town Car", yearFrom: 1998, yearTo: 2011, bodyType: "sedan" },
      ]},
    ],
  },
  {
    name: "GMC",
    models: [
      { name: "Yukon", generations: [
        { name: "Yukon II", yearFrom: 2000, yearTo: 2006, bodyType: "suv" },
        { name: "Yukon III", yearFrom: 2007, yearTo: 2014, bodyType: "suv" },
        { name: "Yukon IV", yearFrom: 2015, yearTo: 2020, bodyType: "suv" },
        { name: "Yukon V", yearFrom: 2021, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Sierra", generations: [
        { name: "Sierra I", yearFrom: 1999, yearTo: 2006, bodyType: "pickup" },
        { name: "Sierra II", yearFrom: 2007, yearTo: 2013, bodyType: "pickup" },
        { name: "Sierra III", yearFrom: 2014, yearTo: 2018, bodyType: "pickup" },
        { name: "Sierra IV", yearFrom: 2019, yearTo: null, bodyType: "pickup" },
      ]},
      { name: "Canyon", generations: [
        { name: "Canyon I", yearFrom: 2004, yearTo: 2012, bodyType: "pickup" },
        { name: "Canyon II", yearFrom: 2015, yearTo: 2022, bodyType: "pickup" },
        { name: "Canyon III", yearFrom: 2023, yearTo: null, bodyType: "pickup" },
      ]},
      { name: "Acadia", generations: [
        { name: "Acadia I", yearFrom: 2007, yearTo: 2016, bodyType: "suv" },
        { name: "Acadia II", yearFrom: 2017, yearTo: 2023, bodyType: "suv" },
        { name: "Acadia III", yearFrom: 2024, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Terrain", generations: [
        { name: "Terrain I", yearFrom: 2010, yearTo: 2017, bodyType: "crossover" },
        { name: "Terrain II", yearFrom: 2018, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Envoy", generations: [
        { name: "Envoy II", yearFrom: 2002, yearTo: 2005, bodyType: "suv" },
        { name: "Envoy III", yearFrom: 2006, yearTo: 2009, bodyType: "suv" },
      ]},
      { name: "Savana", vehicleType: "bus", generations: [
        { name: "Savana", yearFrom: 1996, yearTo: null, bodyType: "van" },
      ]},
      { name: "Denali", generations: [
        { name: "Denali", yearFrom: 1999, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Hummer EV", generations: [
        { name: "Hummer EV", yearFrom: 2022, yearTo: null, bodyType: "pickup" },
      ]},
    ],
  },
  {
    name: "Buick",
    models: [
      { name: "Envision", generations: [
        { name: "Envision I", yearFrom: 2016, yearTo: 2020, bodyType: "crossover" },
        { name: "Envision II", yearFrom: 2021, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Enclave", generations: [
        { name: "Enclave I", yearFrom: 2008, yearTo: 2017, bodyType: "suv" },
        { name: "Enclave II", yearFrom: 2018, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Encore", generations: [
        { name: "Encore I", yearFrom: 2013, yearTo: 2022, bodyType: "crossover" },
      ]},
      { name: "Encore GX", generations: [
        { name: "Encore GX I", yearFrom: 2020, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Regal", generations: [
        { name: "Regal V", yearFrom: 2004, yearTo: 2008, bodyType: "sedan" },
        { name: "Regal VI", yearFrom: 2011, yearTo: 2020, bodyType: "sedan" },
      ]},
      { name: "LaCrosse", generations: [
        { name: "LaCrosse I", yearFrom: 2005, yearTo: 2009, bodyType: "sedan" },
        { name: "LaCrosse II", yearFrom: 2010, yearTo: 2019, bodyType: "sedan" },
      ]},
      { name: "Verano", generations: [
        { name: "Verano", yearFrom: 2012, yearTo: 2017, bodyType: "sedan" },
      ]},
      { name: "Cascada", generations: [
        { name: "Cascada", yearFrom: 2016, yearTo: 2019, bodyType: "cabrio" },
      ]},
      { name: "GL8", vehicleType: "bus", generations: [
        { name: "GL8", yearFrom: 2000, yearTo: null, bodyType: "minivan" },
      ]},
      { name: "Lucerne", generations: [
        { name: "Lucerne", yearFrom: 2006, yearTo: 2011, bodyType: "sedan" },
      ]},
      { name: "Century", generations: [
        { name: "Century", yearFrom: 1997, yearTo: 2005, bodyType: "sedan" },
      ]},
    ],
  },
  {
    name: "Tesla",
    models: [
      { name: "Model 3", generations: [
        { name: "Model 3 I", yearFrom: 2017, yearTo: 2023, bodyType: "sedan" },
        { name: "Model 3 Highland", yearFrom: 2024, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Model Y", generations: [
        { name: "Model Y I", yearFrom: 2020, yearTo: 2024, bodyType: "suv" },
        { name: "Model Y Juniper", yearFrom: 2025, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Model S", generations: [
        { name: "Model S I", yearFrom: 2012, yearTo: 2021, bodyType: "liftback" },
        { name: "Model S refresh", yearFrom: 2021, yearTo: null, bodyType: "liftback" },
      ]},
      { name: "Model X", generations: [
        { name: "Model X I", yearFrom: 2015, yearTo: 2021, bodyType: "suv" },
        { name: "Model X refresh", yearFrom: 2022, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Cybertruck", generations: [
        { name: "Cybertruck I", yearFrom: 2024, yearTo: null, bodyType: "pickup" },
      ]},
      { name: "Roadster", generations: [
        { name: "Roadster I", yearFrom: 2008, yearTo: 2012, bodyType: "roadster" },
      ]},
    ],
  },
  {
    name: "Hummer",
    models: [
      { name: "H2", generations: [
        { name: "H2 I", yearFrom: 2003, yearTo: 2009, bodyType: "suv" },
      ]},
      { name: "H3", generations: [
        { name: "H3 I", yearFrom: 2006, yearTo: 2010, bodyType: "suv" },
      ]},
      { name: "EV", generations: [
        { name: "EV pickup", yearFrom: 2022, yearTo: null, bodyType: "pickup" },
        { name: "EV SUV", yearFrom: 2024, yearTo: null, bodyType: "suv" },
      ]},
    ],
  },
  {
    name: "RAM",
    models: [
      { name: "1500", generations: [
        { name: "1500 IV DT", yearFrom: 2009, yearTo: 2018, bodyType: "pickup" },
        { name: "1500 V", yearFrom: 2019, yearTo: null, bodyType: "pickup" },
      ]},
      { name: "2500", generations: [
        { name: "2500 IV", yearFrom: 2010, yearTo: 2018, bodyType: "pickup" },
        { name: "2500 V", yearFrom: 2019, yearTo: null, bodyType: "pickup" },
      ]},
      { name: "3500", generations: [
        { name: "3500 IV", yearFrom: 2010, yearTo: 2018, bodyType: "pickup" },
        { name: "3500 V", yearFrom: 2019, yearTo: null, bodyType: "pickup" },
      ]},
      { name: "ProMaster", vehicleType: "bus", generations: [
        { name: "ProMaster I", yearFrom: 2014, yearTo: null, bodyType: "van" },
      ]},
    ],
  },
  {
    name: "Lucid",
    models: [
      { name: "Air", generations: [
        { name: "Air I", yearFrom: 2021, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Gravity", generations: [
        { name: "Gravity I", yearFrom: 2025, yearTo: null, bodyType: "suv" },
      ]},
    ],
  },

  // ========== CIS ==========
  {
    name: "Lada",
    models: [
      { name: "Vesta", generations: [
        { name: "Vesta I", yearFrom: 2015, yearTo: 2024, bodyType: "sedan" },
        { name: "Vesta II NG", yearFrom: 2024, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Granta", generations: [
        { name: "Granta I", yearFrom: 2011, yearTo: 2018, bodyType: "sedan" },
        { name: "Granta рестайлинг", yearFrom: 2018, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Niva Travel", generations: [
        { name: "Niva Travel", yearFrom: 2020, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Niva Legend", generations: [
        { name: "Niva Legend 2121", yearFrom: 1977, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Largus", generations: [
        { name: "Largus I", yearFrom: 2012, yearTo: 2021, bodyType: "wagon" },
        { name: "Largus II", yearFrom: 2021, yearTo: null, bodyType: "wagon" },
      ]},
      { name: "XRAY", generations: [
        { name: "XRAY I", yearFrom: 2016, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Kalina", generations: [
        { name: "Kalina I", yearFrom: 2004, yearTo: 2013, bodyType: "hatchback" },
        { name: "Kalina II", yearFrom: 2013, yearTo: 2018, bodyType: "hatchback" },
      ]},
      { name: "Priora", generations: [
        { name: "Priora I", yearFrom: 2007, yearTo: 2018, bodyType: "sedan" },
      ]},
      { name: "4x4", generations: [
        { name: "4x4 2121", yearFrom: 1977, yearTo: null, bodyType: "suv" },
      ]},
      { name: "2110", generations: [
        { name: "2110", yearFrom: 1996, yearTo: 2007, bodyType: "sedan" },
      ]},
      { name: "2111", generations: [
        { name: "2111", yearFrom: 1998, yearTo: 2007, bodyType: "wagon" },
      ]},
      { name: "2112", generations: [
        { name: "2112", yearFrom: 1999, yearTo: 2008, bodyType: "liftback" },
      ]},
      { name: "2114", generations: [
        { name: "2114", yearFrom: 2001, yearTo: 2013, bodyType: "hatchback" },
      ]},
      { name: "2115", generations: [
        { name: "2115", yearFrom: 2001, yearTo: 2012, bodyType: "sedan" },
      ]},
      { name: "2107", generations: [
        { name: "2107", yearFrom: 1982, yearTo: 2012, bodyType: "sedan" },
      ]},
      { name: "2106", generations: [
        { name: "2106", yearFrom: 1976, yearTo: 2006, bodyType: "sedan" },
      ]},
      { name: "2105", generations: [
        { name: "2105", yearFrom: 1980, yearTo: 2010, bodyType: "sedan" },
      ]},
      { name: "2104", generations: [
        { name: "2104", yearFrom: 1984, yearTo: 2012, bodyType: "wagon" },
      ]},
      { name: "2101", generations: [
        { name: "2101", yearFrom: 1970, yearTo: 1988, bodyType: "sedan" },
      ]},
      { name: "Oka", generations: [
        { name: "Oka", yearFrom: 1988, yearTo: 2008, bodyType: "hatchback" },
      ]},
    ],
  },
  {
    name: "GAZ",
    models: [
      { name: "Gazelle Next", vehicleType: "bus", generations: [
        { name: "Gazelle Next I", yearFrom: 2013, yearTo: null, bodyType: "van" },
      ]},
      { name: "Gazelle NN", vehicleType: "bus", generations: [
        { name: "Gazelle NN I", yearFrom: 2010, yearTo: null, bodyType: "van" },
      ]},
      { name: "Sobol", vehicleType: "bus", generations: [
        { name: "Sobol I", yearFrom: 1998, yearTo: 2010, bodyType: "van" },
        { name: "Sobol II", yearFrom: 2010, yearTo: null, bodyType: "van" },
      ]},
      { name: "Volga 3102", generations: [
        { name: "Volga 3102", yearFrom: 1997, yearTo: 2009, bodyType: "sedan" },
      ]},
      { name: "Volga 31105", generations: [
        { name: "Volga 31105", yearFrom: 2004, yearTo: 2010, bodyType: "sedan" },
      ]},
      { name: "Volga Siber", generations: [
        { name: "Volga Siber", yearFrom: 2008, yearTo: 2010, bodyType: "sedan" },
      ]},
      { name: "GAZelle Business", vehicleType: "bus", generations: [
        { name: "GAZelle Business", yearFrom: 2010, yearTo: null, bodyType: "van" },
      ]},
    ],
  },
  {
    name: "UAZ",
    models: [
      { name: "Patriot", generations: [
        { name: "Patriot I", yearFrom: 2005, yearTo: 2014, bodyType: "suv" },
        { name: "Patriot рестайлинг", yearFrom: 2014, yearTo: 2022, bodyType: "suv" },
        { name: "Patriot II", yearFrom: 2022, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Hunter", generations: [
        { name: "Hunter I", yearFrom: 2003, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Pickup", generations: [
        { name: "Pickup I", yearFrom: 2008, yearTo: null, bodyType: "pickup" },
      ]},
      { name: "Profi", vehicleType: "bus", generations: [
        { name: "Profi I", yearFrom: 2019, yearTo: null, bodyType: "van" },
      ]},
      { name: "SGR", vehicleType: "bus", generations: [
        { name: "SGR Буханка", yearFrom: 1965, yearTo: null, bodyType: "van" },
      ]},
    ],
  },
  {
    name: "Moskvich",
    models: [
      { name: "3", generations: [
        { name: "3 I", yearFrom: 2022, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "3e", generations: [
        { name: "3e I", yearFrom: 2022, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "6", generations: [
        { name: "6 I", yearFrom: 2024, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "2141 Svyatogor", generations: [
        { name: "2141 Svyatogor", yearFrom: 1998, yearTo: 2003, bodyType: "hatchback" },
      ]},
      { name: "2140", generations: [
        { name: "2140", yearFrom: 1976, yearTo: 1988, bodyType: "sedan" },
      ]},
    ],
  },
  {
    name: "ZAZ",
    models: [
      { name: "Chance", generations: [
        { name: "Chance I", yearFrom: 2009, yearTo: 2015, bodyType: "sedan" },
      ]},
      { name: "Forza", generations: [
        { name: "Forza I", yearFrom: 2010, yearTo: 2015, bodyType: "sedan" },
      ]},
      { name: "Sens", generations: [
        { name: "Sens I", yearFrom: 2011, yearTo: 2015, bodyType: "hatchback" },
      ]},
      { name: "Vida", generations: [
        { name: "Vida I", yearFrom: 2012, yearTo: 2018, bodyType: "sedan" },
      ]},
      { name: "Slavuta", generations: [
        { name: "Slavuta", yearFrom: 1998, yearTo: 2012, bodyType: "sedan" },
      ]},
      { name: "Tavria", generations: [
        { name: "Tavria", yearFrom: 1987, yearTo: 2011, bodyType: "hatchback" },
      ]},
      { name: "1102", generations: [
        { name: "1102", yearFrom: 1998, yearTo: 2011, bodyType: "hatchback" },
      ]},
      { name: "1103", generations: [
        { name: "1103", yearFrom: 1998, yearTo: 2011, bodyType: "hatchback" },
      ]},
    ],
  },
  {
    name: "Belgee",
    models: [
      { name: "X50", generations: [
        { name: "X50 I", yearFrom: 2023, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "X70", generations: [
        { name: "X70 I", yearFrom: 2023, yearTo: null, bodyType: "suv" },
      ]},
    ],
  },
  {
    name: "Ravon",
    models: [
      { name: "R2", generations: [
        { name: "R2 I", yearFrom: 2016, yearTo: 2020, bodyType: "hatchback" },
      ]},
      { name: "R4", generations: [
        { name: "R4 I", yearFrom: 2016, yearTo: 2020, bodyType: "sedan" },
      ]},
      { name: "Gentra", generations: [
        { name: "Gentra I", yearFrom: 2015, yearTo: 2020, bodyType: "sedan" },
      ]},
      { name: "Nexia R3", generations: [
        { name: "Nexia R3", yearFrom: 2013, yearTo: 2020, bodyType: "sedan" },
      ]},
    ],
  },
  {
    name: "TagAZ",
    models: [
      { name: "Tager", generations: [
        { name: "Tager I", yearFrom: 2008, yearTo: 2014, bodyType: "suv" },
      ]},
      { name: "C10", generations: [
        { name: "C10", yearFrom: 2006, yearTo: 2014, bodyType: "sedan" },
      ]},
      { name: "Vega", generations: [
        { name: "Vega", yearFrom: 2006, yearTo: 2014, bodyType: "sedan" },
      ]},
      { name: "Road Partner", generations: [
        { name: "Road Partner", yearFrom: 2008, yearTo: 2014, bodyType: "pickup" },
      ]},
      { name: "Aquila", generations: [
        { name: "Aquila", yearFrom: 2006, yearTo: 2014, bodyType: "sedan" },
      ]},
    ],
  },

  // ========== OTHER ==========
  {
    name: "Iran Khodro",
    models: [
      { name: "Samand", generations: [
        { name: "Samand I", yearFrom: 2001, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Dena", generations: [
        { name: "Dena I", yearFrom: 2012, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Runna", generations: [
        { name: "Runna I", yearFrom: 2012, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "Peugeot Pars", generations: [
        { name: "Peugeot Pars", yearFrom: 2001, yearTo: 2018, bodyType: "sedan" },
      ]},
    ],
  },
  {
    name: "Mahindra",
    models: [
      { name: "Scorpio", generations: [
        { name: "Scorpio I", yearFrom: 2002, yearTo: 2014, bodyType: "suv" },
        { name: "Scorpio II", yearFrom: 2014, yearTo: null, bodyType: "suv" },
      ]},
      { name: "XUV700", generations: [
        { name: "XUV700 I", yearFrom: 2021, yearTo: null, bodyType: "suv" },
      ]},
      { name: "XUV500", generations: [
        { name: "XUV500 I", yearFrom: 2011, yearTo: 2022, bodyType: "suv" },
      ]},
      { name: "XUV300", generations: [
        { name: "XUV300 I", yearFrom: 2019, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Thar", generations: [
        { name: "Thar I", yearFrom: 2010, yearTo: 2020, bodyType: "suv" },
        { name: "Thar II", yearFrom: 2020, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Bolero", generations: [
        { name: "Bolero", yearFrom: 2000, yearTo: null, bodyType: "suv" },
      ]},
      { name: "KUV100", generations: [
        { name: "KUV100", yearFrom: 2016, yearTo: 2022, bodyType: "hatchback" },
      ]},
    ],
  },
  {
    name: "Tata",
    models: [
      { name: "Nexon", generations: [
        { name: "Nexon I", yearFrom: 2017, yearTo: 2023, bodyType: "crossover" },
        { name: "Nexon II", yearFrom: 2023, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Harrier", generations: [
        { name: "Harrier I", yearFrom: 2020, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Safari", generations: [
        { name: "Safari III", yearFrom: 2023, yearTo: null, bodyType: "suv" },
      ]},
      { name: "Punch", generations: [
        { name: "Punch I", yearFrom: 2021, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "Tiago", generations: [
        { name: "Tiago I", yearFrom: 2016, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Altroz", generations: [
        { name: "Altroz I", yearFrom: 2020, yearTo: null, bodyType: "hatchback" },
      ]},
      { name: "Indica", generations: [
        { name: "Indica", yearFrom: 1998, yearTo: 2018, bodyType: "hatchback" },
      ]},
    ],
  },
  {
    name: "Evolute",
    models: [
      { name: "i-Pro", generations: [
        { name: "i-Pro I", yearFrom: 2023, yearTo: null, bodyType: "sedan" },
      ]},
      { name: "i-Joy", generations: [
        { name: "i-Joy I", yearFrom: 2023, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "i-Sky", generations: [
        { name: "i-Sky I", yearFrom: 2024, yearTo: null, bodyType: "crossover" },
      ]},
    ],
  },
  {
    name: "Livan",
    models: [
      { name: "X3 Pro", generations: [
        { name: "X3 Pro I", yearFrom: 2023, yearTo: null, bodyType: "crossover" },
      ]},
      { name: "X6 Pro", generations: [
        { name: "X6 Pro I", yearFrom: 2023, yearTo: null, bodyType: "suv" },
      ]},
      { name: "S6 Pro", generations: [
        { name: "S6 Pro I", yearFrom: 2023, yearTo: null, bodyType: "sedan" },
      ]},
    ],
  },
];
