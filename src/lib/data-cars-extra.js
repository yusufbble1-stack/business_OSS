// ===== Additional Car Brands Database =====
export const extraCarData = {
  Toyota: {
    'Yaris GR': {
      '2020+': {
        '1.6 Turbo 261hp': { fuel:'Gasoline', cc:1618, code:'G16E-GTS', ecu:'Denso', hp:261, nm:360, hp1:300, nm1:420 },
      }
    },
    'Supra': {
      'A90 - 2019+': {
        '2.0 Turbo 258hp': { fuel:'Gasoline', cc:1998, code:'B48B20B', ecu:'Bosch MG1CS201', hp:258, nm:400, hp1:310, nm1:480 },
        '3.0 Turbo 340hp': { fuel:'Gasoline', cc:2998, code:'B58B30M1', ecu:'Bosch MG1CS201', hp:340, nm:500, hp1:420, nm1:600 },
      }
    },
    'Hilux': {
      '2016+': {
        '2.4 D-4D 150hp': { fuel:'Diesel', cc:2393, code:'2GD-FTV', ecu:'Denso', hp:150, nm:400, hp1:185, nm1:470 },
        '2.8 D-4D 204hp': { fuel:'Diesel', cc:2755, code:'1GD-FTV', ecu:'Denso', hp:204, nm:500, hp1:240, nm1:580 },
      }
    },
    'Land Cruiser': {
      '2021+': {
        '3.3 D-4D 309hp': { fuel:'Diesel', cc:3346, code:'F33A-FTV', ecu:'Denso', hp:309, nm:700, hp1:360, nm1:800 },
      }
    }
  },
  Ford: {
    'Focus': {
      'MK4 - 2018+': {
        '1.0 EcoBoost 125hp': { fuel:'Gasoline', cc:999, code:'M1DA', ecu:'Bosch MED17.0.1', hp:125, nm:170, hp1:155, nm1:220 },
        '1.5 EcoBoost 150hp': { fuel:'Gasoline', cc:1498, code:'M8DA', ecu:'Bosch MED17.2', hp:150, nm:240, hp1:185, nm1:300 },
        '2.3 EcoBoost ST 280hp': { fuel:'Gasoline', cc:2261, code:'E5GA', ecu:'Bosch MED17.2', hp:280, nm:420, hp1:330, nm1:490 },
      }
    },
    'Ranger': {
      'MK3 - 2019+': {
        '2.0 EcoBlue 170hp': { fuel:'Diesel', cc:1996, code:'YN2S', ecu:'Bosch EDC17C70', hp:170, nm:420, hp1:210, nm1:500 },
        '2.0 EcoBlue BiTurbo 213hp': { fuel:'Diesel', cc:1996, code:'YN2T', ecu:'Bosch EDC17C70', hp:213, nm:500, hp1:255, nm1:580 },
      }
    },
    'Transit': {
      '2019+': {
        '2.0 EcoBlue 105hp': { fuel:'Diesel', cc:1996, code:'YMF6', ecu:'Bosch EDC17C70', hp:105, nm:310, hp1:140, nm1:380 },
        '2.0 EcoBlue 130hp': { fuel:'Diesel', cc:1996, code:'YMF6', ecu:'Bosch EDC17C70', hp:130, nm:385, hp1:165, nm1:460 },
        '2.0 EcoBlue 170hp': { fuel:'Diesel', cc:1996, code:'YMF6', ecu:'Bosch EDC17C70', hp:170, nm:405, hp1:210, nm1:480 },
      }
    },
    'Mustang': {
      '2018+': {
        '2.3 EcoBoost 290hp': { fuel:'Gasoline', cc:2261, code:'E5GA', ecu:'Bosch MED17.2', hp:290, nm:440, hp1:345, nm1:520 },
        '5.0 V8 GT 450hp': { fuel:'Gasoline', cc:5038, code:'Coyote', ecu:'Ford PCM', hp:450, nm:529, hp1:480, nm1:560 },
      }
    }
  },
  Seat: {
    Leon: {
      'MK4 - 2020+': {
        '1.5 TSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 },
        '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DTUA', ecu:'Bosch MD1CP004', hp:150, nm:360, hp1:195, nm1:440 },
        '2.0 TSI Cupra 300hp': { fuel:'Gasoline', cc:1984, code:'DNUE', ecu:'Bosch MG1CS111', hp:300, nm:400, hp1:365, nm1:480 },
      }
    },
    Ateca: {
      '2016+': {
        '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DFGA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
        '2.0 TSI 190hp': { fuel:'Gasoline', cc:1984, code:'CZPA', ecu:'Siemens Simos 18.10', hp:190, nm:320, hp1:245, nm1:400 },
      }
    }
  },
  Skoda: {
    Octavia: {
      'MK4 - 2020+': {
        '1.5 TSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 },
        '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DTUA', ecu:'Bosch MD1CP004', hp:150, nm:360, hp1:195, nm1:440 },
        '2.0 TSI RS 245hp': { fuel:'Gasoline', cc:1984, code:'DNUA', ecu:'Bosch MG1CS111', hp:245, nm:370, hp1:310, nm1:450 },
      }
    },
    Superb: {
      'MK3 - 2015+': {
        '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DFGA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
        '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DFHA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
        '2.0 TSI 280hp': { fuel:'Gasoline', cc:1984, code:'DJHB', ecu:'Siemens Simos 18.10', hp:280, nm:350, hp1:340, nm1:430 },
      }
    }
  },
  Citroen: {
    'C3': {
      'MK3 - 2016+': {
        '1.2 PureTech 110hp': { fuel:'Gasoline', cc:1199, code:'EB2', ecu:'Valeo VD56.1', hp:110, nm:205, hp1:140, nm1:260 },
        '1.5 BlueHDi 100hp': { fuel:'Diesel', cc:1499, code:'DV5', ecu:'Bosch EDC17C60', hp:100, nm:250, hp1:135, nm1:315 },
      }
    },
    'C5 Aircross': {
      '2019+': {
        '1.5 BlueHDi 130hp': { fuel:'Diesel', cc:1499, code:'DV5RD', ecu:'Bosch EDC17C60', hp:130, nm:300, hp1:165, nm1:370 },
        '2.0 BlueHDi 180hp': { fuel:'Diesel', cc:1997, code:'DW10FD', ecu:'Delphi DCM6.2A', hp:180, nm:400, hp1:220, nm1:470 },
      }
    }
  },
  Fiat: {
    '500': {
      '2015+': {
        '0.9 TwinAir 85hp': { fuel:'Gasoline', cc:875, code:'312A', ecu:'Marelli 8GMF', hp:85, nm:145, hp1:105, nm1:180 },
        '1.3 MultiJet 95hp': { fuel:'Diesel', cc:1248, code:'199B', ecu:'Bosch EDC17C49', hp:95, nm:200, hp1:120, nm1:250 },
      }
    },
    'Ducato': {
      '2014+': {
        '2.3 MultiJet 130hp': { fuel:'Diesel', cc:2287, code:'F1AGL', ecu:'Bosch EDC17C49', hp:130, nm:320, hp1:165, nm1:390 },
        '2.3 MultiJet 160hp': { fuel:'Diesel', cc:2287, code:'F1AGL', ecu:'Bosch EDC17C49', hp:160, nm:400, hp1:200, nm1:480 },
        '2.3 MultiJet 180hp': { fuel:'Diesel', cc:2287, code:'F1AGL', ecu:'Bosch EDC17C49', hp:180, nm:450, hp1:220, nm1:530 },
      }
    }
  },
  Opel: {
    Astra: {
      'MK6 - 2015+': {
        '1.4 Turbo 150hp': { fuel:'Gasoline', cc:1399, code:'B14XFT', ecu:'Delco E80', hp:150, nm:245, hp1:180, nm1:300 },
        '1.6 CDTi 136hp': { fuel:'Diesel', cc:1598, code:'B16DTH', ecu:'Bosch EDC17C59', hp:136, nm:320, hp1:170, nm1:390 },
      }
    },
    Insignia: {
      'MK2 - 2017+': {
        '2.0 CDTi 170hp': { fuel:'Diesel', cc:1956, code:'B20DTH', ecu:'Bosch EDC17C59', hp:170, nm:400, hp1:210, nm1:475 },
        '2.0 Turbo 260hp': { fuel:'Gasoline', cc:1998, code:'B20NHT', ecu:'Delco E80', hp:260, nm:400, hp1:310, nm1:470 },
      }
    }
  },
  'Land Rover': {
    'Range Rover Sport': {
      '2018+': {
        '3.0 SDV6 306hp': { fuel:'Diesel', cc:2993, code:'306DT', ecu:'Bosch EDC17CP55', hp:306, nm:700, hp1:350, nm1:790 },
        '3.0 P400 400hp': { fuel:'Gasoline', cc:2996, code:'P400', ecu:'Bosch MED17.8.32', hp:400, nm:550, hp1:450, nm1:620 },
        '5.0 V8 SVR 575hp': { fuel:'Gasoline', cc:5000, code:'AJ-V8', ecu:'Bosch MED17.8.31', hp:575, nm:700, hp1:630, nm1:770 },
      }
    },
    'Defender': {
      '2020+': {
        '2.0 D200 200hp': { fuel:'Diesel', cc:1999, code:'204DTA', ecu:'Bosch MD1CS006', hp:200, nm:430, hp1:240, nm1:510 },
        '3.0 D250 249hp': { fuel:'Diesel', cc:2996, code:'306DT', ecu:'Bosch EDC17CP55', hp:249, nm:570, hp1:290, nm1:660 },
        '3.0 P400 400hp': { fuel:'Gasoline', cc:2996, code:'P400', ecu:'Bosch MED17.8.32', hp:400, nm:550, hp1:450, nm1:620 },
      }
    }
  },
  Porsche: {
    'Cayenne': {
      '2018+': {
        '3.0 V6 340hp': { fuel:'Gasoline', cc:2995, code:'MCY.PA', ecu:'Bosch MG1CS111', hp:340, nm:450, hp1:400, nm1:530 },
        '2.9 V6 S 440hp': { fuel:'Gasoline', cc:2894, code:'MCX.PA', ecu:'Bosch MG1CS111', hp:440, nm:550, hp1:510, nm1:640 },
        '4.0 V8 Turbo 550hp': { fuel:'Gasoline', cc:3996, code:'MCU.YA', ecu:'Bosch MG1CS111', hp:550, nm:770, hp1:620, nm1:860 },
      }
    },
    'Macan': {
      '2019+': {
        '2.0 Turbo 265hp': { fuel:'Gasoline', cc:1984, code:'DKN', ecu:'Siemens Simos 18.10', hp:265, nm:400, hp1:315, nm1:470 },
        '2.9 V6 GTS 380hp': { fuel:'Gasoline', cc:2894, code:'MCX.DA', ecu:'Bosch MG1CS111', hp:380, nm:520, hp1:440, nm1:600 },
      }
    }
  },
  Jaguar: {
    'F-Pace': {
      '2016+': {
        '2.0d 180hp': { fuel:'Diesel', cc:1999, code:'204DTA', ecu:'Bosch MD1CS006', hp:180, nm:430, hp1:220, nm1:510 },
        '3.0 V6 S 380hp': { fuel:'Gasoline', cc:2995, code:'AJ-V6', ecu:'Bosch MED17.8.32', hp:380, nm:450, hp1:430, nm1:520 },
      }
    }
  },
  Nissan: {
    Qashqai: {
      'MK3 - 2021+': {
        '1.3 DIG-T 140hp': { fuel:'Gasoline', cc:1332, code:'H5H', ecu:'Continental EMS3155', hp:140, nm:240, hp1:170, nm1:295 },
        '1.3 DIG-T 158hp': { fuel:'Gasoline', cc:1332, code:'H5H', ecu:'Continental EMS3155', hp:158, nm:270, hp1:188, nm1:325 },
      }
    },
    Navara: {
      '2016+': {
        '2.3 dCi 163hp': { fuel:'Diesel', cc:2298, code:'YS23', ecu:'Bosch EDC17C84', hp:163, nm:403, hp1:200, nm1:480 },
        '2.3 dCi 190hp': { fuel:'Diesel', cc:2298, code:'YS23', ecu:'Bosch EDC17C84', hp:190, nm:450, hp1:230, nm1:530 },
      }
    }
  },
  Hyundai: {
    Tucson: {
      '2021+': {
        '1.6 T-GDi 150hp': { fuel:'Gasoline', cc:1598, code:'G4FP', ecu:'Kefico', hp:150, nm:250, hp1:180, nm1:300 },
        '1.6 CRDi 136hp': { fuel:'Diesel', cc:1598, code:'D4FE', ecu:'Bosch EDC17C57', hp:136, nm:320, hp1:170, nm1:390 },
      }
    },
    'i30 N': {
      '2021+': {
        '2.0 T-GDi 280hp': { fuel:'Gasoline', cc:1998, code:'G4KH', ecu:'Kefico', hp:280, nm:392, hp1:325, nm1:450 },
      }
    }
  },
  Kia: {
    Sportage: {
      '2022+': {
        '1.6 T-GDi 150hp': { fuel:'Gasoline', cc:1598, code:'G4FP', ecu:'Kefico', hp:150, nm:250, hp1:180, nm1:300 },
        '1.6 CRDi 136hp': { fuel:'Diesel', cc:1598, code:'D4FE', ecu:'Bosch EDC17C57', hp:136, nm:320, hp1:170, nm1:390 },
      }
    },
    Stinger: {
      '2018+': {
        '2.0 T-GDi 245hp': { fuel:'Gasoline', cc:1998, code:'G4KL', ecu:'Kefico', hp:245, nm:353, hp1:290, nm1:415 },
        '3.3 V6 T-GDi GT 370hp': { fuel:'Gasoline', cc:3342, code:'G6DP', ecu:'Kefico', hp:370, nm:510, hp1:420, nm1:580 },
      }
    }
  }
};
