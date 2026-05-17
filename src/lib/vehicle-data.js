// ===== Vehicle Performance Gains Database =====
// Hierarchical: type → brand → model → generation → engine
// Each engine has stock and tuned (Stage 1) power/torque specs

import { truckData } from './data-trucks.js';
import { motoData } from './data-motos.js';
import { boatData } from './data-boats.js';
import { agriData } from './data-agri.js';
import { extraCarData } from './data-cars-extra.js';

export const vehicleDatabase = {
  car: {
    Audi: {
      A3: {
        '8V - 2013-2020': {
          '1.6 TDI 110hp': { fuel:'Diesel', cc:1598, code:'CLHA', ecu:'Bosch EDC17C64', hp:110, nm:250, hp1:145, nm1:320 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'CRLB', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TFSI 190hp': { fuel:'Gasoline', cc:1984, code:'CJXC', ecu:'Bosch MED17.5.2', hp:190, nm:320, hp1:245, nm1:400 },
          '2.0 TFSI S3 310hp': { fuel:'Gasoline', cc:1984, code:'CJXG', ecu:'Siemens Simos 18.1', hp:310, nm:400, hp1:370, nm1:480 },
        },
        '8Y - 2020+': {
          '1.5 TFSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DTUA', ecu:'Bosch MD1CP004', hp:150, nm:360, hp1:195, nm1:440 },
        }
      },
      A4: {
        'B8 - 2008-2015': {
          '2.0 TDI 143hp': { fuel:'Diesel', cc:1968, code:'CAGA', ecu:'Bosch EDC17CP20', hp:143, nm:320, hp1:185, nm1:400 },
          '2.0 TDI 177hp': { fuel:'Diesel', cc:1968, code:'CJCA', ecu:'Bosch EDC17C46', hp:177, nm:380, hp1:220, nm1:460 },
          '2.0 TFSI 211hp': { fuel:'Gasoline', cc:1984, code:'CDNC', ecu:'Bosch MED17.5', hp:211, nm:350, hp1:260, nm1:420 },
          '3.0 TDI 245hp': { fuel:'Diesel', cc:2967, code:'CDUC', ecu:'Bosch EDC17CP44', hp:245, nm:500, hp1:300, nm1:600 },
        },
        'B9 - 2016-2023': {
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DETA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DEUA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
          '2.0 TFSI 190hp': { fuel:'Gasoline', cc:1984, code:'CVKB', ecu:'Siemens Simos 18.10', hp:190, nm:320, hp1:245, nm1:400 },
          '2.0 TFSI 252hp': { fuel:'Gasoline', cc:1984, code:'CVKD', ecu:'Siemens Simos 18.10', hp:252, nm:370, hp1:310, nm1:450 },
        }
      },
      A5: {
        'MK1 - 2007-2016': {
          '2.0 TDI 143hp': { fuel:'Diesel', cc:1968, code:'CAGA', ecu:'Bosch EDC17CP20', hp:143, nm:320, hp1:185, nm1:400 },
          '2.0 TDI 177hp': { fuel:'Diesel', cc:1968, code:'CJCA', ecu:'Bosch EDC17C46', hp:177, nm:380, hp1:220, nm1:460 },
          '3.0 TDI 218hp': { fuel:'Diesel', cc:2967, code:'CDUC', ecu:'Bosch EDC17CP44', hp:218, nm:450, hp1:275, nm1:560 },
        },
        'MK2 - 2016-2023': {
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DETA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DEUA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
          '2.0 TFSI 190hp': { fuel:'Gasoline', cc:1984, code:'CVKB', ecu:'Siemens Simos 18.10', hp:190, nm:320, hp1:245, nm1:400 },
        }
      },
      Q5: {
        'FY - 2017+': {
          '2.0 TDI 163hp': { fuel:'Diesel', cc:1968, code:'DETA', ecu:'Bosch EDC17C74', hp:163, nm:380, hp1:210, nm1:460 },
          '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DEUA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
          '2.0 TFSI 252hp': { fuel:'Gasoline', cc:1984, code:'DKNA', ecu:'Siemens Simos 18.10', hp:252, nm:370, hp1:310, nm1:450 },
        }
      }
    },
    BMW: {
      '1 Series': {
        'F20/F21 - 2011-2019': {
          '116d 116hp': { fuel:'Diesel', cc:1995, code:'N47D20C', ecu:'Bosch EDC17C50', hp:116, nm:260, hp1:155, nm1:330 },
          '118d 150hp': { fuel:'Diesel', cc:1995, code:'B47D20A', ecu:'Bosch EDC17C50', hp:150, nm:320, hp1:195, nm1:400 },
          '120d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch EDC17C50', hp:190, nm:400, hp1:235, nm1:470 },
          'M135i 326hp': { fuel:'Gasoline', cc:2979, code:'N55B30', ecu:'Bosch MEVD17.2.5', hp:326, nm:450, hp1:380, nm1:540 },
        }
      },
      '3 Series': {
        'F30/F31 - 2012-2019': {
          '318d 150hp': { fuel:'Diesel', cc:1995, code:'B47D20A', ecu:'Bosch EDC17C50', hp:150, nm:320, hp1:195, nm1:400 },
          '320d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch EDC17C50', hp:190, nm:400, hp1:235, nm1:470 },
          '330d 258hp': { fuel:'Diesel', cc:2993, code:'N57D30A', ecu:'Bosch EDC17C56', hp:258, nm:560, hp1:310, nm1:650 },
          '320i 184hp': { fuel:'Gasoline', cc:1997, code:'N20B20B', ecu:'Bosch MEVD17.2.4', hp:184, nm:270, hp1:235, nm1:350 },
          '335i 306hp': { fuel:'Gasoline', cc:2979, code:'N55B30', ecu:'Bosch MEVD17.2', hp:306, nm:400, hp1:365, nm1:500 },
        },
        'G20/G21 - 2019+': {
          '318d 150hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch MD1CS001', hp:150, nm:350, hp1:200, nm1:420 },
          '320d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20O1', ecu:'Bosch MD1CS001', hp:190, nm:400, hp1:240, nm1:480 },
          '330i 258hp': { fuel:'Gasoline', cc:1998, code:'B48B20B', ecu:'Bosch MG1CS201', hp:258, nm:400, hp1:310, nm1:480 },
          'M340i 374hp': { fuel:'Gasoline', cc:2998, code:'B58B30M1', ecu:'Bosch MG1CS201', hp:374, nm:500, hp1:430, nm1:600 },
        }
      },
      '5 Series': {
        'G30/G31 - 2017-2023': {
          '520d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch MD1CS001', hp:190, nm:400, hp1:240, nm1:480 },
          '530d 265hp': { fuel:'Diesel', cc:2993, code:'B57D30A', ecu:'Bosch MD1CS001', hp:265, nm:620, hp1:320, nm1:700 },
          '540i 340hp': { fuel:'Gasoline', cc:2998, code:'B58B30M0', ecu:'Bosch MG1CS003', hp:340, nm:450, hp1:400, nm1:560 },
        }
      }
    },
    Mercedes: {
      'A-Class': {
        'W177 - 2018+': {
          'A180d 116hp': { fuel:'Diesel', cc:1461, code:'OM608', ecu:'Bosch MD1CS006', hp:116, nm:260, hp1:150, nm1:330 },
          'A200d 150hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:150, nm:320, hp1:195, nm1:400 },
          'A250 224hp': { fuel:'Gasoline', cc:1991, code:'M260', ecu:'Bosch MED17.7.7', hp:224, nm:350, hp1:280, nm1:430 },
          'A35 AMG 306hp': { fuel:'Gasoline', cc:1991, code:'M260', ecu:'Bosch MED17.7.7', hp:306, nm:400, hp1:365, nm1:480 },
        }
      },
      'C-Class': {
        'W205 - 2014-2021': {
          'C200d 160hp': { fuel:'Diesel', cc:1598, code:'OM626', ecu:'Delphi CRD3.60', hp:160, nm:360, hp1:200, nm1:430 },
          'C220d 194hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:194, nm:400, hp1:240, nm1:480 },
          'C300d 245hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:245, nm:500, hp1:300, nm1:600 },
          'C43 AMG 390hp': { fuel:'Gasoline', cc:2996, code:'M276', ecu:'Bosch MED17.7.3', hp:390, nm:520, hp1:440, nm1:600 },
        }
      }
    },
    Volkswagen: {
      Golf: {
        'MK7 - 2012-2020': {
          '1.6 TDI 110hp': { fuel:'Diesel', cc:1598, code:'CLHA', ecu:'Bosch EDC17C64', hp:110, nm:250, hp1:145, nm1:320 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'CRLB', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI GTD 184hp': { fuel:'Diesel', cc:1968, code:'CUNA', ecu:'Bosch EDC17C74', hp:184, nm:380, hp1:225, nm1:460 },
          '2.0 TSI GTI 230hp': { fuel:'Gasoline', cc:1984, code:'CHHB', ecu:'Siemens Simos 18.1', hp:230, nm:350, hp1:300, nm1:440 },
          '2.0 TSI R 310hp': { fuel:'Gasoline', cc:1984, code:'CJXG', ecu:'Siemens Simos 18.1', hp:310, nm:400, hp1:370, nm1:480 },
        },
        'MK8 - 2020+': {
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DTUA', ecu:'Bosch MD1CP004', hp:150, nm:360, hp1:195, nm1:440 },
          '2.0 TSI GTI 245hp': { fuel:'Gasoline', cc:1984, code:'DNUA', ecu:'Bosch MG1CS111', hp:245, nm:370, hp1:310, nm1:450 },
          '2.0 TSI R 320hp': { fuel:'Gasoline', cc:1984, code:'DNUE', ecu:'Bosch MG1CS111', hp:320, nm:420, hp1:385, nm1:500 },
        }
      },
      Tiguan: {
        'MK2 - 2016+': {
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DFGA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DFHA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
          '2.0 TSI 190hp': { fuel:'Gasoline', cc:1984, code:'CZPA', ecu:'Siemens Simos 18.10', hp:190, nm:320, hp1:245, nm1:400 },
        }
      },
      Transporter: {
        'T6 - 2015+': {
          '2.0 TDI 102hp': { fuel:'Diesel', cc:1968, code:'CXHA', ecu:'Bosch EDC17C74', hp:102, nm:250, hp1:145, nm1:330 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'CAAC', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 204hp': { fuel:'Diesel', cc:1968, code:'CXEB', ecu:'Bosch EDC17C74', hp:204, nm:450, hp1:240, nm1:520 },
        }
      }
    },
    Renault: {
      Megane: {
        'MK4 - 2016+': {
          '1.5 dCi 110hp': { fuel:'Diesel', cc:1461, code:'K9K', ecu:'Bosch EDC17C42', hp:110, nm:260, hp1:140, nm1:320 },
          '1.6 dCi 130hp': { fuel:'Diesel', cc:1598, code:'R9M', ecu:'Bosch EDC17C42', hp:130, nm:320, hp1:170, nm1:400 },
          '1.8 TCe RS 280hp': { fuel:'Gasoline', cc:1798, code:'M5P', ecu:'Siemens EMS3155', hp:280, nm:390, hp1:320, nm1:450 },
        }
      },
      Clio: {
        'MK5 - 2019+': {
          '1.0 TCe 100hp': { fuel:'Gasoline', cc:999, code:'H5H', ecu:'Continental EMS3120', hp:100, nm:160, hp1:120, nm1:200 },
          '1.3 TCe 130hp': { fuel:'Gasoline', cc:1333, code:'H5H', ecu:'Continental EMS3120', hp:130, nm:240, hp1:160, nm1:290 },
          '1.5 dCi 85hp': { fuel:'Diesel', cc:1461, code:'K9K', ecu:'Bosch EDC17C42', hp:85, nm:220, hp1:115, nm1:280 },
        }
      },
      'Trafic': {
        'MK3 - 2014+': {
          '1.6 dCi 95hp': { fuel:'Diesel', cc:1598, code:'R9M', ecu:'Bosch EDC17C42', hp:95, nm:260, hp1:130, nm1:330 },
          '1.6 dCi 120hp': { fuel:'Diesel', cc:1598, code:'R9M', ecu:'Bosch EDC17C42', hp:120, nm:320, hp1:160, nm1:390 },
          '2.0 dCi 145hp': { fuel:'Diesel', cc:1997, code:'M9R', ecu:'Bosch EDC17C42', hp:145, nm:340, hp1:185, nm1:420 },
          '2.0 dCi 170hp': { fuel:'Diesel', cc:1997, code:'M9R', ecu:'Bosch EDC17C42', hp:170, nm:380, hp1:210, nm1:460 },
        }
      }
    },
    Peugeot: {
      '208': {
        'MK2 - 2019+': {
          '1.2 PureTech 100hp': { fuel:'Gasoline', cc:1199, code:'EB2', ecu:'Valeo VD56.1', hp:100, nm:205, hp1:130, nm1:260 },
          '1.2 PureTech 130hp': { fuel:'Gasoline', cc:1199, code:'EB2', ecu:'Valeo VD56.1', hp:130, nm:230, hp1:160, nm1:290 },
          '1.5 BlueHDi 100hp': { fuel:'Diesel', cc:1499, code:'DV5', ecu:'Bosch EDC17C60', hp:100, nm:250, hp1:135, nm1:315 },
        }
      },
      '308': {
        'MK2 - 2013-2021': {
          '1.5 BlueHDi 130hp': { fuel:'Diesel', cc:1499, code:'DV5RD', ecu:'Bosch EDC17C60', hp:130, nm:300, hp1:165, nm1:370 },
          '1.6 BlueHDi 120hp': { fuel:'Diesel', cc:1560, code:'DV6FD', ecu:'Bosch EDC17C60', hp:120, nm:300, hp1:155, nm1:370 },
          '1.6 THP GT 205hp': { fuel:'Gasoline', cc:1598, code:'EP6FDTM', ecu:'Bosch MED17.4.4', hp:205, nm:285, hp1:240, nm1:340 },
          '2.0 BlueHDi GT 180hp': { fuel:'Diesel', cc:1997, code:'DW10FD', ecu:'Delphi DCM6.2A', hp:180, nm:400, hp1:220, nm1:470 },
        }
      },
      '3008': {
        'MK2 - 2016+': {
          '1.5 BlueHDi 130hp': { fuel:'Diesel', cc:1499, code:'DV5RD', ecu:'Bosch EDC17C60', hp:130, nm:300, hp1:165, nm1:370 },
          '1.6 PureTech 180hp': { fuel:'Gasoline', cc:1598, code:'EP6FADTX', ecu:'Bosch MED17.4.4', hp:180, nm:250, hp1:215, nm1:310 },
          '2.0 BlueHDi 180hp': { fuel:'Diesel', cc:1997, code:'DW10FD', ecu:'Delphi DCM6.2A', hp:180, nm:400, hp1:220, nm1:470 },
        }
      }
    }
  },
  van: {
    Renault: {
      Trafic: {
        'MK3 - 2014+': {
          '1.6 dCi 95hp': { fuel:'Diesel', cc:1598, code:'R9M', ecu:'Bosch EDC17C42', hp:95, nm:260, hp1:130, nm1:330 },
          '1.6 dCi 120hp': { fuel:'Diesel', cc:1598, code:'R9M', ecu:'Bosch EDC17C42', hp:120, nm:320, hp1:160, nm1:390 },
          '2.0 dCi 170hp': { fuel:'Diesel', cc:1997, code:'M9R', ecu:'Bosch EDC17C42', hp:170, nm:380, hp1:210, nm1:460 },
        }
      },
      Master: {
        'MK3 - 2010+': {
          '2.3 dCi 125hp': { fuel:'Diesel', cc:2299, code:'M9T', ecu:'Bosch EDC17C42', hp:125, nm:310, hp1:165, nm1:390 },
          '2.3 dCi 145hp': { fuel:'Diesel', cc:2299, code:'M9T', ecu:'Bosch EDC17C42', hp:145, nm:350, hp1:185, nm1:430 },
          '2.3 dCi 165hp': { fuel:'Diesel', cc:2299, code:'M9T', ecu:'Bosch EDC17C42', hp:165, nm:380, hp1:205, nm1:460 },
        }
      }
    },
    Mercedes: {
      Sprinter: {
        'W906 - 2006-2018': {
          '2.1 CDI 129hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3.10', hp:129, nm:305, hp1:170, nm1:380 },
          '2.1 CDI 163hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3.10', hp:163, nm:380, hp1:205, nm1:460 },
          '3.0 CDI 190hp': { fuel:'Diesel', cc:2987, code:'OM642', ecu:'Bosch EDC17CP46', hp:190, nm:440, hp1:240, nm1:530 },
        }
      },
      Vito: {
        'W447 - 2014+': {
          '1.6 CDI 88hp': { fuel:'Diesel', cc:1598, code:'OM622', ecu:'Bosch EDC17C66', hp:88, nm:230, hp1:120, nm1:300 },
          '1.6 CDI 114hp': { fuel:'Diesel', cc:1598, code:'OM622', ecu:'Bosch EDC17C66', hp:114, nm:270, hp1:150, nm1:340 },
          '2.1 CDI 136hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3.60', hp:136, nm:330, hp1:180, nm1:410 },
          '2.1 CDI 163hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3.60', hp:163, nm:380, hp1:205, nm1:460 },
        }
      }
    },
    Volkswagen: {
      Transporter: {
        'T6/T6.1 - 2015+': {
          '2.0 TDI 102hp': { fuel:'Diesel', cc:1968, code:'CXHA', ecu:'Bosch EDC17C74', hp:102, nm:250, hp1:145, nm1:330 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'CAAC', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI BiTurbo 204hp': { fuel:'Diesel', cc:1968, code:'CXEB', ecu:'Bosch EDC17C74', hp:204, nm:450, hp1:240, nm1:520 },
        }
      },
      Crafter: {
        'MK2 - 2017+': {
          '2.0 TDI 102hp': { fuel:'Diesel', cc:1968, code:'DAUA', ecu:'Bosch EDC17C74', hp:102, nm:300, hp1:140, nm1:370 },
          '2.0 TDI 140hp': { fuel:'Diesel', cc:1968, code:'DAUB', ecu:'Bosch EDC17C74', hp:140, nm:340, hp1:180, nm1:420 },
          '2.0 TDI 177hp': { fuel:'Diesel', cc:1968, code:'DAUC', ecu:'Bosch EDC17C74', hp:177, nm:410, hp1:220, nm1:490 },
        }
      }
    }
  },
  truck: {
    Mercedes: {
      Actros: {
        'MP4 - 2011+': {
          '12.8L OM471 449hp': { fuel:'Diesel', cc:12809, code:'OM471', ecu:'MCM2.1', hp:449, nm:2200, hp1:500, nm1:2450 },
          '12.8L OM471 510hp': { fuel:'Diesel', cc:12809, code:'OM471', ecu:'MCM2.1', hp:510, nm:2500, hp1:560, nm1:2750 },
        }
      }
    }
  },
  moto: motoData,
  boat: boatData,
  agri: agriData,
};

// Merge extra car brands into existing car category
Object.keys(extraCarData).forEach(brand => {
  if (!vehicleDatabase.car[brand]) vehicleDatabase.car[brand] = {};
  Object.assign(vehicleDatabase.car[brand], extraCarData[brand]);
});

// Merge truckData into existing truck category
Object.keys(truckData).forEach(brand => {
  if (!vehicleDatabase.truck[brand]) vehicleDatabase.truck[brand] = {};
  Object.assign(vehicleDatabase.truck[brand], truckData[brand]);
});

// Display labels for vehicle types
export const typeLabels = {
  car: 'Car', van: 'Van', truck: 'Truck',
  moto: 'Motorcycle', boat: 'Boat / Marine', agri: 'Agricultural'
};

export const typeIcons = {
  car: 'car',
  van: 'van',
  truck: 'truck',
  moto: 'motorbike',
  boat: 'sailboat',
  agri: 'tractor'
};

// Get all vehicle types
export function getTypes() {
  return Object.keys(vehicleDatabase);
}

// Get brands for a type
export function getBrands(type) {
  return type && vehicleDatabase[type] ? Object.keys(vehicleDatabase[type]) : [];
}

// Get models for a brand
export function getModels(type, brand) {
  return type && brand && vehicleDatabase[type]?.[brand] ? Object.keys(vehicleDatabase[type][brand]) : [];
}

// Get generations for a model
export function getGenerations(type, brand, model) {
  return type && brand && model && vehicleDatabase[type]?.[brand]?.[model] ? Object.keys(vehicleDatabase[type][brand][model]) : [];
}

// Get engines for a generation
export function getEngines(type, brand, model, gen) {
  return type && brand && model && gen && vehicleDatabase[type]?.[brand]?.[model]?.[gen] ? Object.keys(vehicleDatabase[type][brand][model][gen]) : [];
}

// Get engine specs
export function getSpecs(type, brand, model, gen, engine) {
  return vehicleDatabase[type]?.[brand]?.[model]?.[gen]?.[engine] || null;
}
