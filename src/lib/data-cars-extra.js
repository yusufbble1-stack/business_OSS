// ===== Additional Car Brands Database =====
export const extraCarData = {
  Toyota: {
    'Yaris': {
      'XP150 - 2013-2020': {
        '1.4 D-4D 90hp': { fuel:'Diesel', cc:1364, code:'1ND-TV', ecu:'Bosch EDC17CP37', hp:90, nm:205, hp1:115, nm1:260 },
      },
      'XP210 - 2020+': {
        '1.5 VVT-i 125hp': { fuel:'Gasoline', cc:1490, code:'M15A-FKS', ecu:'Denso', hp:125, nm:153, hp1:138, nm1:170 },
      },
      'GR - 2020+': {
        '1.6 Turbo 261hp': { fuel:'Gasoline', cc:1618, code:'G16E-GTS', ecu:'Denso', hp:261, nm:360, hp1:300, nm1:420 },
      }
    },
    'Corolla': {
      'E210 - 2019+': {
        '1.2 Turbo 116hp': { fuel:'Gasoline', cc:1197, code:'8NR-FTS', ecu:'Denso', hp:116, nm:185, hp1:140, nm1:230 },
        '2.0 Hybrid 180hp': { fuel:'Hybrid', cc:1987, code:'M20A-FXS', ecu:'Denso', hp:180, nm:190, hp1:195, nm1:210 },
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
    'RAV4': {
      'XA50 - 2018+': {
        '2.0 VVT-i 175hp': { fuel:'Gasoline', cc:1987, code:'M20A-FKS', ecu:'Denso', hp:175, nm:208, hp1:190, nm1:230 },
      }
    },
    'Land Cruiser': {
      'J150 - 2009-2023': {
        '3.0 D-4D 190hp': { fuel:'Diesel', cc:2982, code:'1KD-FTV', ecu:'Denso', hp:190, nm:420, hp1:225, nm1:510 },
        '2.8 D-4D 177hp': { fuel:'Diesel', cc:2755, code:'1GD-FTV', ecu:'Denso', hp:177, nm:450, hp1:215, nm1:530 },
        '2.8 D-4D 204hp': { fuel:'Diesel', cc:2755, code:'1GD-FTV', ecu:'Denso', hp:204, nm:500, hp1:240, nm1:580 },
      },
      'J300 - 2021+': {
        '3.3 D-4D 309hp': { fuel:'Diesel', cc:3346, code:'F33A-FTV', ecu:'Denso', hp:309, nm:700, hp1:360, nm1:800 },
      }
    },
    'C-HR': {
      '2016-2023': {
        '1.2 Turbo 116hp': { fuel:'Gasoline', cc:1197, code:'8NR-FTS', ecu:'Denso', hp:116, nm:185, hp1:140, nm1:230 }
      }
    },
    'Auris': {
      'E180 - 2012-2018': {
        '1.2 Turbo 116hp': { fuel:'Gasoline', cc:1197, code:'8NR-FTS', ecu:'Denso', hp:116, nm:185, hp1:140, nm1:230 },
        '1.4 D-4D 90hp': { fuel:'Diesel', cc:1364, code:'1ND-TV', ecu:'Denso', hp:90, nm:205, hp1:115, nm1:260 }
      }
    }
  },
  Ford: {
    'Fiesta': {
      'MK7 - 2008-2017': {
        '1.0 EcoBoost 100hp': { fuel:'Gasoline', cc:999, code:'SFJA', ecu:'Bosch MED17.0.1', hp:100, nm:170, hp1:130, nm1:210 },
        '1.0 EcoBoost 125hp': { fuel:'Gasoline', cc:999, code:'M1DA', ecu:'Bosch MED17.0.1', hp:125, nm:170, hp1:155, nm1:220 },
        '1.6 ST 182hp': { fuel:'Gasoline', cc:1596, code:'JTJA', ecu:'Bosch MED17.2', hp:182, nm:240, hp1:210, nm1:320 },
      },
      'MK8 - 2017-2023': {
        '1.0 EcoBoost 100hp': { fuel:'Gasoline', cc:999, code:'SFJN', ecu:'Bosch MED17.0.1', hp:100, nm:170, hp1:135, nm1:220 },
        '1.0 EcoBoost 125hp': { fuel:'Gasoline', cc:999, code:'M1JN', ecu:'Bosch MED17.0.1', hp:125, nm:170, hp1:155, nm1:230 },
        '1.5 ST 200hp': { fuel:'Gasoline', cc:1497, code:'YZJA', ecu:'Bosch MG1CS016', hp:200, nm:290, hp1:235, nm1:360 },
      }
    },
    'Focus': {
      'MK3 - 2011-2018': {
        '1.0 EcoBoost 125hp': { fuel:'Gasoline', cc:999, code:'M1DA', ecu:'Bosch MED17.0.1', hp:125, nm:170, hp1:155, nm1:220 },
        '1.6 TDCi 115hp': { fuel:'Diesel', cc:1560, code:'T1DA', ecu:'Siemens SID807EV', hp:115, nm:270, hp1:140, nm1:320 },
        '2.0 TDCi 150hp': { fuel:'Diesel', cc:1997, code:'T7DB', ecu:'Delphi DCM6.1', hp:150, nm:370, hp1:195, nm1:440 },
        '2.0 EcoBoost ST 250hp': { fuel:'Gasoline', cc:1999, code:'R9DA', ecu:'Bosch MED17.2', hp:250, nm:360, hp1:280, nm1:440 },
        '2.3 EcoBoost RS 350hp': { fuel:'Gasoline', cc:2261, code:'YVDA', ecu:'Bosch MED17.2', hp:350, nm:440, hp1:380, nm1:520 },
      },
      'MK4 - 2018+': {
        '1.0 EcoBoost 125hp': { fuel:'Gasoline', cc:999, code:'M1DA', ecu:'Bosch MED17.0.1', hp:125, nm:170, hp1:155, nm1:220 },
        '1.5 EcoBoost 150hp': { fuel:'Gasoline', cc:1498, code:'M8DA', ecu:'Bosch MED17.2', hp:150, nm:240, hp1:185, nm1:300 },
        '2.0 EcoBlue 150hp': { fuel:'Diesel', cc:1996, code:'YL2S', ecu:'Bosch EDC17C70', hp:150, nm:370, hp1:190, nm1:440 },
        '2.3 EcoBoost ST 280hp': { fuel:'Gasoline', cc:2261, code:'E5GA', ecu:'Bosch MED17.2', hp:280, nm:420, hp1:330, nm1:490 },
      }
    },
    'Ranger': {
      'T6 - 2011-2019': {
        '2.2 TDCi 150hp': { fuel:'Diesel', cc:2198, code:'GBVAJQJ', ecu:'Siemens SID208', hp:150, nm:375, hp1:180, nm1:440 },
        '3.2 TDCi 200hp': { fuel:'Diesel', cc:3198, code:'SAFA', ecu:'Siemens SID208', hp:200, nm:470, hp1:240, nm1:550 },
      },
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
    'Transit Custom': {
      '2018+': {
        '2.0 EcoBlue 130hp': { fuel:'Diesel', cc:1996, code:'YNF6', ecu:'Bosch EDC17C70', hp:130, nm:385, hp1:170, nm1:450 },
        '2.0 EcoBlue 170hp': { fuel:'Diesel', cc:1996, code:'YNFS', ecu:'Bosch EDC17C70', hp:170, nm:405, hp1:205, nm1:480 },
      }
    },
    'Mustang': {
      'S550 - 2015-2023': {
        '2.3 EcoBoost 290hp': { fuel:'Gasoline', cc:2261, code:'E5GA', ecu:'Bosch MED17.2', hp:290, nm:440, hp1:345, nm1:520 },
        '2.3 EcoBoost 317hp': { fuel:'Gasoline', cc:2261, code:'E5GA', ecu:'Bosch MED17.2', hp:317, nm:432, hp1:360, nm1:520 },
        '5.0 V8 GT 421hp': { fuel:'Gasoline', cc:5038, code:'Coyote', ecu:'Ford PCM', hp:421, nm:530, hp1:450, nm1:570 },
        '5.0 V8 GT 450hp': { fuel:'Gasoline', cc:5038, code:'Coyote', ecu:'Ford PCM', hp:450, nm:529, hp1:480, nm1:560 },
      }
    },
    'Kuga': {
      'MK2 - 2012-2019': {
        '2.0 TDCi 150hp': { fuel:'Diesel', cc:1997, code:'T7MB', ecu:'Delphi DCM6.1', hp:150, nm:370, hp1:190, nm1:440 },
        '2.0 TDCi 180hp': { fuel:'Diesel', cc:1997, code:'T8MA', ecu:'Delphi DCM6.1', hp:180, nm:400, hp1:210, nm1:470 }
      },
      'MK3 - 2019+': {
        '1.5 EcoBoost 150hp': { fuel:'Gasoline', cc:1497, code:'YZJA', ecu:'Bosch MG1CS016', hp:150, nm:240, hp1:180, nm1:300 },
        '2.0 EcoBlue 190hp': { fuel:'Diesel', cc:1996, code:'YL2S', ecu:'Bosch EDC17C70', hp:190, nm:400, hp1:220, nm1:470 }
      }
    },
    'Puma': {
      '2019+': {
        '1.0 EcoBoost mHEV 125hp': { fuel:'Hybrid', cc:999, code:'B7JA', ecu:'Bosch MG1CS016', hp:125, nm:210, hp1:150, nm1:260 }
      }
    }
  },
  Seat: {
    Leon: {
      'MK3 - 2012-2020': {
        '1.4 TSI 150hp': { fuel:'Gasoline', cc:1395, code:'CZEA', ecu:'Bosch MED17.5.25', hp:150, nm:250, hp1:180, nm1:310 },
        '1.6 TDI 115hp': { fuel:'Diesel', cc:1598, code:'DDYA', ecu:'Bosch EDC17C74', hp:115, nm:250, hp1:145, nm1:320 },
        '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'CRLB', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
        '2.0 TDI 184hp': { fuel:'Diesel', cc:1968, code:'CUNA', ecu:'Bosch EDC17C74', hp:184, nm:380, hp1:225, nm1:460 },
        '2.0 TSI Cupra 290hp': { fuel:'Gasoline', cc:1984, code:'CJXH', ecu:'Siemens Simos 18.1', hp:290, nm:350, hp1:360, nm1:480 },
        '2.0 TSI Cupra 300hp': { fuel:'Gasoline', cc:1984, code:'CJXC', ecu:'Siemens Simos 18.1', hp:300, nm:380, hp1:360, nm1:480 },
      },
      'MK4 - 2020+': {
        '1.5 TSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 },
        '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DTUA', ecu:'Bosch MD1CP004', hp:150, nm:360, hp1:195, nm1:440 },
        '2.0 TSI Cupra 300hp': { fuel:'Gasoline', cc:1984, code:'DNUE', ecu:'Bosch MG1CS111', hp:300, nm:400, hp1:365, nm1:480 },
      }
    },
    Ateca: {
      '2016+': {
        '1.6 TDI 115hp': { fuel:'Diesel', cc:1598, code:'DDYA', ecu:'Bosch EDC17C74', hp:115, nm:250, hp1:145, nm1:320 },
        '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DFGA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
        '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DFHA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
        '1.5 TSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 },
        '2.0 TSI 190hp': { fuel:'Gasoline', cc:1984, code:'CZPA', ecu:'Siemens Simos 18.10', hp:190, nm:320, hp1:245, nm1:400 },
        '2.0 TSI Cupra 300hp': { fuel:'Gasoline', cc:1984, code:'DNUE', ecu:'Bosch MG1CS111', hp:300, nm:400, hp1:360, nm1:480 },
      }
    },
    Ibiza: {
      'KJ - 2017+': {
        '1.0 TSI 95hp': { fuel:'Gasoline', cc:999, code:'CHZB', ecu:'Bosch Bosch MED17.5.21', hp:95, nm:175, hp1:120, nm1:210 },
        '1.0 TSI 115hp': { fuel:'Gasoline', cc:999, code:'CHZC', ecu:'Bosch Bosch MED17.5.21', hp:115, nm:200, hp1:140, nm1:240 },
        '1.5 TSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 },
      }
    },
    Arona: {
      '2017+': {
        '1.0 TSI 115hp': { fuel:'Gasoline', cc:999, code:'CHZC', ecu:'Bosch MED17.5.21', hp:115, nm:200, hp1:140, nm1:245 },
        '1.5 TSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 }
      }
    },
    Tarraco: {
      '2018+': {
        '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DFGA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
        '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DFHA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 }
      }
    }
  },
  Skoda: {
    Octavia: {
      'MK3 - 2013-2020': {
        '1.4 TSI 150hp': { fuel:'Gasoline', cc:1395, code:'CHPA', ecu:'Bosch MED17.5.21', hp:150, nm:250, hp1:180, nm1:310 },
        '1.6 TDI 115hp': { fuel:'Diesel', cc:1598, code:'DDYA', ecu:'Bosch EDC17C74', hp:115, nm:250, hp1:145, nm1:320 },
        '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'CRLB', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
        '2.0 TDI RS 184hp': { fuel:'Diesel', cc:1968, code:'CUNA', ecu:'Bosch EDC17C74', hp:184, nm:380, hp1:225, nm1:460 },
        '2.0 TSI RS 220hp': { fuel:'Gasoline', cc:1984, code:'CHHB', ecu:'Siemens Simos 18.1', hp:220, nm:350, hp1:300, nm1:440 },
        '2.0 TSI RS 230hp': { fuel:'Gasoline', cc:1984, code:'CHHA', ecu:'Siemens Simos 18.1', hp:230, nm:350, hp1:300, nm1:440 },
        '2.0 TSI RS 245hp': { fuel:'Gasoline', cc:1984, code:'DLBA', ecu:'Siemens Simos 18.10', hp:245, nm:370, hp1:310, nm1:450 },
      },
      'MK4 - 2020+': {
        '1.5 TSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 },
        '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DTUA', ecu:'Bosch MD1CP004', hp:150, nm:360, hp1:195, nm1:440 },
        '2.0 TSI RS 245hp': { fuel:'Gasoline', cc:1984, code:'DNUA', ecu:'Bosch MG1CS111', hp:245, nm:370, hp1:310, nm1:450 },
      }
    },
    Superb: {
      'MK3 - 2015+': {
        '1.4 TSI 150hp': { fuel:'Gasoline', cc:1395, code:'CZEA', ecu:'Bosch MED17.5.25', hp:150, nm:250, hp1:180, nm1:310 },
        '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DFGA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
        '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DFHA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
        '2.0 TSI 220hp': { fuel:'Gasoline', cc:1984, code:'CHHB', ecu:'Siemens Simos 18.1', hp:220, nm:350, hp1:300, nm1:440 },
        '2.0 TSI 272hp': { fuel:'Gasoline', cc:1984, code:'DNUA', ecu:'Bosch MG1CS111', hp:272, nm:350, hp1:340, nm1:445 },
        '2.0 TSI 280hp': { fuel:'Gasoline', cc:1984, code:'DJHB', ecu:'Siemens Simos 18.10', hp:280, nm:350, hp1:340, nm1:430 },
      }
    },
    Kodiaq: {
      '2016+': {
        '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DFGA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
        '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DFHA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
        '2.0 TDI RS 240hp': { fuel:'Diesel', cc:1968, code:'CUAA', ecu:'Bosch EDC17C74', hp:240, nm:500, hp1:290, nm1:590 },
      }
    },
    Fabia: {
      'MK3 - 2014-2021': {
        '1.0 TSI 95hp': { fuel:'Gasoline', cc:999, code:'CHZB', ecu:'Bosch MED17.5.21', hp:95, nm:160, hp1:120, nm1:210 },
        '1.2 TSI 110hp': { fuel:'Gasoline', cc:1197, code:'CJZD', ecu:'Bosch MED17.5.21', hp:110, nm:175, hp1:140, nm1:230 }
      },
      'MK4 - 2021+': {
        '1.0 TSI 110hp': { fuel:'Gasoline', cc:999, code:'DLAA', ecu:'Bosch MG1CS011', hp:110, nm:200, hp1:140, nm1:250 },
        '1.5 TSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 }
      }
    },
    Karoq: {
      '2017+': {
        '1.6 TDI 115hp': { fuel:'Diesel', cc:1598, code:'DDYA', ecu:'Bosch EDC17C74', hp:115, nm:250, hp1:145, nm1:320 },
        '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DFGA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 }
      }
    }
  },
  Citroen: {
    'C3': {
      'MK3 - 2016+': {
        '1.2 PureTech 82hp': { fuel:'Gasoline', cc:1199, code:'EB2F', ecu:'Valeo VD46.1', hp:82, nm:118, hp1:95, nm1:140 },
        '1.2 PureTech 110hp': { fuel:'Gasoline', cc:1199, code:'EB2', ecu:'Valeo VD56.1', hp:110, nm:205, hp1:140, nm1:260 },
        '1.5 BlueHDi 100hp': { fuel:'Diesel', cc:1499, code:'DV5', ecu:'Bosch EDC17C60', hp:100, nm:250, hp1:135, nm1:315 },
      }
    },
    'C4': {
      'MK3 - 2020+': {
        '1.2 PureTech 130hp': { fuel:'Gasoline', cc:1199, code:'EB2ADTS', ecu:'Valeo VD56.1', hp:130, nm:230, hp1:160, nm1:290 },
        '1.5 BlueHDi 130hp': { fuel:'Diesel', cc:1499, code:'DV5RC', ecu:'Bosch MD1CS003', hp:130, nm:300, hp1:160, nm1:360 },
      }
    },
    'C5 Aircross': {
      '2019+': {
        '1.2 PureTech 130hp': { fuel:'Gasoline', cc:1199, code:'EB2DTS', ecu:'Valeo VD46.1', hp:130, nm:230, hp1:155, nm1:280 },
        '1.5 BlueHDi 130hp': { fuel:'Diesel', cc:1499, code:'DV5RD', ecu:'Bosch EDC17C60', hp:130, nm:300, hp1:165, nm1:370 },
        '2.0 BlueHDi 180hp': { fuel:'Diesel', cc:1997, code:'DW10FD', ecu:'Delphi DCM6.2A', hp:180, nm:400, hp1:220, nm1:470 },
      }
    },
    'C1': {
      '2014-2021': {
        '1.0 VTi 68hp': { fuel:'Gasoline', cc:998, code:'1KR', ecu:'Denso', hp:68, nm:95, hp1:75, nm1:105 },
        '1.2 VTi 82hp': { fuel:'Gasoline', cc:1199, code:'EB2F', ecu:'Valeo VD46.1', hp:82, nm:116, hp1:92, nm1:130 }
      }
    },
    'Berlingo': {
      '2018+': {
        '1.5 BlueHDi 100hp': { fuel:'Diesel', cc:1499, code:'DV5RD', ecu:'Bosch EDC17C60', hp:100, nm:250, hp1:135, nm1:315 },
        '1.5 BlueHDi 130hp': { fuel:'Diesel', cc:1499, code:'DV5RC', ecu:'Bosch MD1CS003', hp:130, nm:300, hp1:160, nm1:360 }
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
    },
    'Panda': {
      '2011+': {
        '1.2 69hp': { fuel:'Gasoline', cc:1242, code:'169A4', ecu:'Marelli 9GF', hp:69, nm:102, hp1:78, nm1:115 },
        '1.3 MultiJet 75hp': { fuel:'Diesel', cc:1248, code:'169A1', ecu:'Marelli 8F3', hp:75, nm:190, hp1:95, nm1:230 },
        '1.3 MultiJet 95hp': { fuel:'Diesel', cc:1248, code:'199B1', ecu:'Bosch EDC17C49', hp:95, nm:200, hp1:120, nm1:250 }
      }
    },
    '500X': {
      '2014+': {
        '1.3 MultiJet 95hp': { fuel:'Diesel', cc:1248, code:'199B1', ecu:'Marelli 8F3', hp:95, nm:200, hp1:115, nm1:240 },
        '1.6 MultiJet 120hp': { fuel:'Diesel', cc:1598, code:'552603', ecu:'Bosch EDC17C69', hp:120, nm:320, hp1:150, nm1:380 }
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
    },
    'Corsa': {
      'E - 2014-2019': {
        '1.3 CDTi 95hp': { fuel:'Diesel', cc:1248, code:'B13DTE', ecu:'Marelli 8DF', hp:95, nm:190, hp1:115, nm1:240 },
        '1.4 Turbo 100hp': { fuel:'Gasoline', cc:1364, code:'B14NEH', ecu:'Delco E78', hp:100, nm:200, hp1:130, nm1:250 }
      },
      'F - 2019+': {
        '1.2 Turbo 100hp': { fuel:'Gasoline', cc:1199, code:'F12XHT', ecu:'Valeo VD56.1', hp:100, nm:205, hp1:130, nm1:260 },
        '1.5 BlueHDi 100hp': { fuel:'Diesel', cc:1499, code:'D15DT', ecu:'Bosch MD1CS003', hp:100, nm:250, hp1:135, nm1:315 }
      }
    },
    'Mokka': {
      '2012-2019': {
        '1.6 CDTi 136hp': { fuel:'Diesel', cc:1598, code:'B16DTH', ecu:'Bosch EDC17C59', hp:136, nm:320, hp1:165, nm1:380 },
        '1.4 Turbo 140hp': { fuel:'Gasoline', cc:1364, code:'A14NET', ecu:'Delco E78', hp:140, nm:200, hp1:165, nm1:245 }
      }
    }
  },
  'Land Rover': {
    'Range Rover Sport': {
      'L494 - 2013-2022': {
        '3.0 TDV6 258hp': { fuel:'Diesel', cc:2993, code:'306DT', ecu:'Bosch EDC17CP55', hp:258, nm:600, hp1:300, nm1:680 },
        '3.0 SDV6 306hp': { fuel:'Diesel', cc:2993, code:'306DT', ecu:'Bosch EDC17CP55', hp:306, nm:700, hp1:350, nm1:790 },
        '3.0 SDV6 292hp': { fuel:'Diesel', cc:2993, code:'306DT', ecu:'Bosch EDC17CP55', hp:292, nm:600, hp1:340, nm1:700 },
        '3.0 P400 400hp': { fuel:'Gasoline', cc:2996, code:'P400', ecu:'Bosch MED17.8.32', hp:400, nm:550, hp1:450, nm1:620 },
        '5.0 V8 SVR 550hp': { fuel:'Gasoline', cc:5000, code:'AJ-V8', ecu:'Bosch MED17.8.31', hp:550, nm:680, hp1:600, nm1:750 },
        '5.0 V8 SVR 575hp': { fuel:'Gasoline', cc:5000, code:'AJ-V8', ecu:'Bosch MED17.8.31', hp:575, nm:700, hp1:630, nm1:770 },
      }
    },
    'Defender': {
      'L663 - 2020+': {
        '2.0 D200 200hp': { fuel:'Diesel', cc:1999, code:'204DTA', ecu:'Bosch MD1CS006', hp:200, nm:430, hp1:240, nm1:510 },
        '2.0 D240 240hp': { fuel:'Diesel', cc:1999, code:'204DTA', ecu:'Bosch MD1CS006', hp:240, nm:430, hp1:280, nm1:510 },
        '3.0 D250 249hp': { fuel:'Diesel', cc:2996, code:'AJ20D6', ecu:'Bosch MD1CS006', hp:249, nm:570, hp1:290, nm1:660 },
        '3.0 D300 300hp': { fuel:'Diesel', cc:2996, code:'AJ20D6', ecu:'Bosch MD1CS006', hp:300, nm:650, hp1:340, nm1:720 },
        '3.0 P400 400hp': { fuel:'Gasoline', cc:2996, code:'P400', ecu:'Bosch MED17.8.32', hp:400, nm:550, hp1:450, nm1:620 },
      }
    },
    'Discovery': {
      'L462 - 2017+': {
        '2.0 Sd4 240hp': { fuel:'Diesel', cc:1999, code:'204DTA', ecu:'Bosch MED17.8.32', hp:240, nm:500, hp1:280, nm1:570 },
        '3.0 TD6 258hp': { fuel:'Diesel', cc:2993, code:'306DT', ecu:'Bosch EDC17CP55', hp:258, nm:600, hp1:310, nm1:680 },
      }
    },
    'Range Rover Evoque': {
      'L538 - 2011-2018': {
        '2.0 D150 150hp': { fuel:'Diesel', cc:1999, code:'204DTD', ecu:'Bosch MED17.8.32', hp:150, nm:380, hp1:180, nm1:440 },
        '2.0 D180 180hp': { fuel:'Diesel', cc:1999, code:'204DTA', ecu:'Bosch MED17.8.32', hp:180, nm:430, hp1:215, nm1:490 }
      },
      'L551 - 2018+': {
        '2.0 D150 150hp': { fuel:'Diesel', cc:1999, code:'204DTD', ecu:'Bosch MD1CS006', hp:150, nm:380, hp1:185, nm1:440 },
        '2.0 D180 180hp': { fuel:'Diesel', cc:1999, code:'204DTA', ecu:'Bosch MD1CS006', hp:180, nm:430, hp1:215, nm1:490 }
      }
    },
    'Range Rover Velar': {
      'L560 - 2017+': {
        '2.0 D180 180hp': { fuel:'Diesel', cc:1999, code:'204DTA', ecu:'Bosch MD1CS006', hp:180, nm:430, hp1:215, nm1:495 },
        '2.0 D240 240hp': { fuel:'Diesel', cc:1999, code:'204DTA', ecu:'Bosch MD1CS006', hp:240, nm:500, hp1:280, nm1:570 }
      }
    }
  },
  Porsche: {
    'Cayenne': {
      '92A - 2010-2017': {
        '3.0 TDI 240hp': { fuel:'Diesel', cc:2967, code:'MCR.CC', ecu:'Bosch EDC17CP44', hp:240, nm:550, hp1:300, nm1:650 },
        '3.0 TDI 262hp': { fuel:'Diesel', cc:2967, code:'MCV.VA', ecu:'Bosch EDC17CP54', hp:262, nm:580, hp1:310, nm1:680 },
        '4.2 TDI S 382hp': { fuel:'Diesel', cc:4134, code:'MCU.DB', ecu:'Bosch EDC17CP44', hp:382, nm:850, hp1:430, nm1:980 },
      },
      '9YA - 2018+': {
        '3.0 V6 340hp': { fuel:'Gasoline', cc:2995, code:'MCY.PA', ecu:'Bosch MG1CS111', hp:340, nm:450, hp1:400, nm1:530 },
        '2.9 V6 S 440hp': { fuel:'Gasoline', cc:2894, code:'MCX.PA', ecu:'Bosch MG1CS111', hp:440, nm:550, hp1:510, nm1:640 },
        '4.0 V8 Turbo 550hp': { fuel:'Gasoline', cc:3996, code:'MCU.YA', ecu:'Bosch MG1CS111', hp:550, nm:770, hp1:620, nm1:860 },
      }
    },
    'Macan': {
      '95B - 2014-2018': {
        '3.0 S TDI 258hp': { fuel:'Diesel', cc:2967, code:'MCT.BA', ecu:'Bosch EDC17CP44', hp:258, nm:580, hp1:310, nm1:680 },
        '3.0 S 340hp': { fuel:'Gasoline', cc:2997, code:'MCT.MA', ecu:'Siemens SDI10.2', hp:340, nm:460, hp1:390, nm1:550 },
        '3.6 Turbo 400hp': { fuel:'Gasoline', cc:3606, code:'MCT.LA', ecu:'Siemens SDI10.2', hp:400, nm:550, hp1:440, nm1:680 },
      },
      '95B.2 - 2019+': {
        '2.0 Turbo 245hp': { fuel:'Gasoline', cc:1984, code:'DKN', ecu:'Siemens Simos 18.10', hp:245, nm:370, hp1:300, nm1:450 },
        '2.0 Turbo 265hp': { fuel:'Gasoline', cc:1984, code:'DKN', ecu:'Siemens Simos 18.10', hp:265, nm:400, hp1:315, nm1:470 },
        '3.0 S 354hp': { fuel:'Gasoline', cc:2995, code:'MCY.PA', ecu:'Bosch MG1CS111', hp:354, nm:480, hp1:410, nm1:570 },
        '2.9 V6 GTS 380hp': { fuel:'Gasoline', cc:2894, code:'MCX.DA', ecu:'Bosch MG1CS111', hp:380, nm:520, hp1:440, nm1:600 },
        '2.9 V6 Turbo 440hp': { fuel:'Gasoline', cc:2894, code:'MCX.ZA', ecu:'Bosch MG1CS111', hp:440, nm:550, hp1:500, nm1:660 },
      }
    },
    '911': {
      '991 - 2011-2019': {
        '3.0 Carrera 370hp': { fuel:'Gasoline', cc:2981, code:'MDC.HA', ecu:'Continental SDI21', hp:370, nm:450, hp1:430, nm1:550 },
        '3.0 Carrera S 420hp': { fuel:'Gasoline', cc:2981, code:'MDC.JA', ecu:'Continental SDI21', hp:420, nm:500, hp1:485, nm1:600 },
        '3.8 Turbo S 560hp': { fuel:'Gasoline', cc:3800, code:'MA1.71', ecu:'Siemens SDI9', hp:560, nm:700, hp1:620, nm1:820 },
      },
      '992 - 2019+': {
        '3.0 Carrera S 450hp': { fuel:'Gasoline', cc:2981, code:'DKKA', ecu:'Bosch MG1CS007', hp:450, nm:530, hp1:520, nm1:650 },
        '3.8 Turbo S 650hp': { fuel:'Gasoline', cc:3745, code:'DKLA', ecu:'Bosch MG1CS007', hp:650, nm:800, hp1:720, nm1:950 },
      }
    },
    '718 Boxster/Cayman': {
      '2016+': {
        '2.0 Turbo 300hp': { fuel:'Gasoline', cc:1988, code:'MDD.PB', ecu:'Bosch MED17.1.11', hp:300, nm:380, hp1:360, nm1:440 },
        '2.5 Turbo S 350hp': { fuel:'Gasoline', cc:2497, code:'MDD.NC', ecu:'Bosch MED17.1.11', hp:350, nm:420, hp1:400, nm1:480 },
      }
    },
    'Panamera': {
      '970 - 2009-2016': {
        '3.0 D 250hp': { fuel:'Diesel', cc:2967, code:'MCR.CC', ecu:'Bosch EDC17CP44', hp:250, nm:550, hp1:300, nm1:650 },
        '4.8 Turbo S 550hp': { fuel:'Gasoline', cc:4806, code:'M48.70', ecu:'Siemens SDI6', hp:550, nm:750, hp1:600, nm1:880 },
      },
      '971 - 2016-2023': {
        '2.9 V6 4 E-Hybrid 462hp': { fuel:'Hybrid', cc:2894, code:'MCX.TA', ecu:'Bosch MG1CS111', hp:462, nm:700, hp1:520, nm1:820 },
        '4.0 Turbo S 630hp': { fuel:'Gasoline', cc:3996, code:'MCV.DA', ecu:'Bosch MG1CS111', hp:630, nm:820, hp1:700, nm1:950 },
      }
    },
    'Taycan': {
      'Y1A - 2019+': {
        'Taycan 4S 530hp': { fuel:'Electric', cc:0, code:'Taycan', ecu:'OEM BMS', hp:530, nm:640, hp1:530, nm1:640 },
        'Taycan Turbo S 761hp': { fuel:'Electric', cc:0, code:'Taycan', ecu:'OEM BMS', hp:761, nm:1050, hp1:761, nm1:1050 },
      }
    }
  },
  Jaguar: {
    'F-Pace': {
      '2016+': {
        '2.0d 180hp': { fuel:'Diesel', cc:1999, code:'204DTA', ecu:'Bosch MD1CS006', hp:180, nm:430, hp1:220, nm1:510 },
        '2.0d 240hp': { fuel:'Diesel', cc:1999, code:'204DTA', ecu:'Bosch MD1CS006', hp:240, nm:500, hp1:280, nm1:570 },
        '3.0 V6 S 380hp': { fuel:'Gasoline', cc:2995, code:'AJ-V6', ecu:'Bosch MED17.8.32', hp:380, nm:450, hp1:430, nm1:520 },
      }
    },
    'F-Type': {
      '2013-2024': {
        '2.0 Turbo 300hp': { fuel:'Gasoline', cc:1997, code:'AJ200P', ecu:'Bosch MED17.8.32', hp:300, nm:400, hp1:340, nm1:470 },
        '3.0 V6 S 380hp': { fuel:'Gasoline', cc:2995, code:'AJ126', ecu:'Bosch MED17.8.32', hp:380, nm:460, hp1:420, nm1:525 },
        '5.0 V8 R 550hp': { fuel:'Gasoline', cc:5000, code:'AJ133', ecu:'Bosch MED17.8.31', hp:550, nm:680, hp1:600, nm1:780 },
        '5.0 V8 SVR 575hp': { fuel:'Gasoline', cc:5000, code:'AJ133', ecu:'Bosch MED17.8.31', hp:575, nm:700, hp1:620, nm1:800 },
      }
    },
    'XE': {
      '2015+': {
        '2.0d 180hp': { fuel:'Diesel', cc:1999, code:'204DTA', ecu:'Bosch MD1CS006', hp:180, nm:430, hp1:220, nm1:510 },
        '2.0d 240hp': { fuel:'Diesel', cc:1999, code:'204DTA', ecu:'Bosch MD1CS006', hp:240, nm:500, hp1:280, nm1:570 }
      }
    },
    'XF': {
      '2015+': {
        '2.0d 180hp': { fuel:'Diesel', cc:1999, code:'204DTA', ecu:'Bosch MD1CS006', hp:180, nm:430, hp1:220, nm1:510 },
        '2.0d 240hp': { fuel:'Diesel', cc:1999, code:'204DTA', ecu:'Bosch MD1CS006', hp:240, nm:500, hp1:280, nm1:570 },
        '3.0d 300hp': { fuel:'Diesel', cc:2993, code:'306DT', ecu:'Bosch EDC17CP55', hp:300, nm:700, hp1:350, nm1:790 }
      }
    }
  },
  Nissan: {
    Qashqai: {
      'MK2 - 2013-2021': {
        '1.5 dCi 110hp': { fuel:'Diesel', cc:1461, code:'K9K', ecu:'Siemens SID309', hp:110, nm:260, hp1:130, nm1:320 },
        '1.6 dCi 130hp': { fuel:'Diesel', cc:1598, code:'R9M', ecu:'Bosch EDC17C42', hp:130, nm:320, hp1:160, nm1:380 },
      },
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
    },
    'Juke': {
      'F15 - 2010-2019': {
        '1.5 dCi 110hp': { fuel:'Diesel', cc:1461, code:'K9K', ecu:'Siemens SID309', hp:110, nm:260, hp1:130, nm1:320 }
      },
      'F16 - 2019+': {
        '1.0 DIG-T 117hp': { fuel:'Gasoline', cc:999, code:'HR10DDT', ecu:'Bosch MG1CS021', hp:117, nm:180, hp1:140, nm1:240 }
      }
    },
    'GT-R': {
      'R35 - 2007+': {
        '3.8 V6 BiTurbo 550hp': { fuel:'Gasoline', cc:3800, code:'VR38DETT', ecu:'Denso', hp:550, nm:632, hp1:600, nm1:750 },
        '3.8 V6 BiTurbo 570hp': { fuel:'Gasoline', cc:3800, code:'VR38DETT', ecu:'Denso', hp:570, nm:637, hp1:620, nm1:760 }
      }
    }
  },
  Hyundai: {
    Tucson: {
      '2015-2020': {
        '1.7 CRDi 116hp': { fuel:'Diesel', cc:1685, code:'D4FD', ecu:'Bosch EDC17C57', hp:116, nm:280, hp1:140, nm1:340 },
        '2.0 CRDi 185hp': { fuel:'Diesel', cc:1995, code:'D4HA', ecu:'Bosch EDC17C57', hp:185, nm:400, hp1:220, nm1:480 },
      },
      '2021+': {
        '1.6 T-GDi 150hp': { fuel:'Gasoline', cc:1598, code:'G4FP', ecu:'Kefico', hp:150, nm:250, hp1:180, nm1:300 },
        '1.6 CRDi 136hp': { fuel:'Diesel', cc:1598, code:'D4FE', ecu:'Bosch EDC17C57', hp:136, nm:320, hp1:170, nm1:390 },
      }
    },
    'i30 N': {
      '2017-2020': {
        '2.0 T-GDi N 250hp': { fuel:'Gasoline', cc:1998, code:'G4KH', ecu:'Kefico', hp:250, nm:353, hp1:290, nm1:420 },
        '2.0 T-GDi N Performance 275hp': { fuel:'Gasoline', cc:1998, code:'G4KH', ecu:'Kefico', hp:275, nm:353, hp1:310, nm1:430 },
      },
      '2021+': {
        '2.0 T-GDi 280hp': { fuel:'Gasoline', cc:1998, code:'G4KH', ecu:'Kefico', hp:280, nm:392, hp1:325, nm1:450 },
      }
    },
    'i20': {
      '2020+': {
        '1.0 T-GDi 100hp': { fuel:'Gasoline', cc:998, code:'G3LE', ecu:'Kefico', hp:100, nm:172, hp1:130, nm1:210 }
      }
    },
    'Kona': {
      '2017+': {
        '1.0 T-GDi 120hp': { fuel:'Gasoline', cc:998, code:'G3LC', ecu:'Kefico', hp:120, nm:172, hp1:145, nm1:215 },
        '1.6 CRDi 136hp': { fuel:'Diesel', cc:1598, code:'D4FE', ecu:'Bosch EDC17C57', hp:136, nm:320, hp1:170, nm1:390 }
      }
    }
  },
  Kia: {
    Sportage: {
      '2016-2021': {
        '1.7 CRDi 115hp': { fuel:'Diesel', cc:1685, code:'D4FD', ecu:'Bosch EDC17C57', hp:115, nm:280, hp1:140, nm1:340 },
        '2.0 CRDi 185hp': { fuel:'Diesel', cc:1995, code:'D4HA', ecu:'Bosch EDC17C57', hp:185, nm:400, hp1:220, nm1:480 },
      },
      '2022+': {
        '1.6 T-GDi 150hp': { fuel:'Gasoline', cc:1598, code:'G4FP', ecu:'Kefico', hp:150, nm:250, hp1:180, nm1:300 },
        '1.6 CRDi 136hp': { fuel:'Diesel', cc:1598, code:'D4FE', ecu:'Bosch EDC17C57', hp:136, nm:320, hp1:170, nm1:390 },
      }
    },
    Stinger: {
      '2018+': {
        '2.0 T-GDi 245hp': { fuel:'Gasoline', cc:1998, code:'G4KL', ecu:'Kefico', hp:245, nm:353, hp1:290, nm1:415 },
        '2.2 CRDi 200hp': { fuel:'Diesel', cc:2199, code:'D4HC', ecu:'Bosch EDC17C57', hp:200, nm:440, hp1:240, nm1:520 },
        '3.3 V6 T-GDi GT 370hp': { fuel:'Gasoline', cc:3342, code:'G6DP', ecu:'Kefico', hp:370, nm:510, hp1:420, nm1:580 },
      }
    },
    'Ceed': {
      'CD - 2018+': {
        '1.0 T-GDi 120hp': { fuel:'Gasoline', cc:998, code:'G3LC', ecu:'Kefico', hp:120, nm:172, hp1:145, nm1:215 },
        '1.4 T-GDi 140hp': { fuel:'Gasoline', cc:1353, code:'G4LD', ecu:'Kefico', hp:140, nm:242, hp1:165, nm1:300 }
      }
    },
    'Niro': {
      '2016-2022': {
        '1.6 GDi Hybrid 141hp': { fuel:'Hybrid', cc:1580, code:'G4LE', ecu:'Kefico', hp:141, nm:265, hp1:155, nm1:290 }
      }
    }
  },
  Volvo: {
    'XC90': {
      '2015-2022': {
        '2.0 D5 235hp': { fuel:'Diesel', cc:1969, code:'D4204T23', ecu:'Denso', hp:235, nm:480, hp1:275, nm1:540 },
        '2.0 T6 320hp': { fuel:'Gasoline', cc:1969, code:'B4204T27', ecu:'Denso', hp:320, nm:400, hp1:360, nm1:470 }
      }
    },
    'XC60': {
      '2017+': {
        '2.0 D4 190hp': { fuel:'Diesel', cc:1969, code:'D4204T14', ecu:'Denso', hp:190, nm:400, hp1:220, nm1:460 },
        '2.0 D5 235hp': { fuel:'Diesel', cc:1969, code:'D4204T23', ecu:'Denso', hp:235, nm:480, hp1:275, nm1:540 },
      }
    },
    'V40': {
      '2012-2019': {
        '2.0 D2 120hp': { fuel:'Diesel', cc:1969, code:'D4204T8', ecu:'Denso', hp:120, nm:280, hp1:160, nm1:350 },
        '2.0 D3 150hp': { fuel:'Diesel', cc:1969, code:'D4204T9', ecu:'Denso', hp:150, nm:320, hp1:185, nm1:400 }
      }
    },
    'XC40': {
      '2017+': {
        '2.0 D3 150hp': { fuel:'Diesel', cc:1969, code:'D4204T16', ecu:'Denso', hp:150, nm:320, hp1:185, nm1:400 },
        '2.0 D4 190hp': { fuel:'Diesel', cc:1969, code:'D4204T14', ecu:'Denso', hp:190, nm:400, hp1:220, nm1:460 }
      }
    }
  },
  'Alfa Romeo': {
    'Giulia': {
      '2016+': {
        '2.0 TB 200hp': { fuel:'Gasoline', cc:1995, code:'FCA-GME', ecu:'Marelli', hp:200, nm:330, hp1:280, nm1:440 },
        '2.0 TB 280hp': { fuel:'Gasoline', cc:1995, code:'FCA-GME', ecu:'Marelli', hp:280, nm:400, hp1:310, nm1:460 },
        '2.2 JTDM 180hp': { fuel:'Diesel', cc:2143, code:'FCA-JTD', ecu:'Bosch EDC17C69', hp:180, nm:450, hp1:220, nm1:520 },
        '2.9 V6 Quadrifoglio 510hp': { fuel:'Gasoline', cc:2891, code:'690T', ecu:'Bosch MED17.3.5', hp:510, nm:600, hp1:570, nm1:700 },
      }
    },
    'Stelvio': {
      '2017+': {
        '2.0 TB 280hp': { fuel:'Gasoline', cc:1995, code:'FCA-GME', ecu:'Marelli', hp:280, nm:400, hp1:310, nm1:460 },
        '2.2 JTDM 210hp': { fuel:'Diesel', cc:2143, code:'FCA-JTD', ecu:'Bosch EDC17C69', hp:210, nm:470, hp1:245, nm1:540 },
      }
    },
    'Giulietta': {
      '2010-2020': {
        '1.4 TB 120hp': { fuel:'Gasoline', cc:1368, code:'198A4', ecu:'Bosch ME7.9.10', hp:120, nm:206, hp1:140, nm1:250 },
        '1.6 JTDM 120hp': { fuel:'Diesel', cc:1598, code:'940A3', ecu:'Bosch EDC17C49', hp:120, nm:320, hp1:145, nm1:380 },
        '1.75 TBi 240hp': { fuel:'Gasoline', cc:1742, code:'940B2', ecu:'Bosch MED17.3.3', hp:240, nm:340, hp1:275, nm1:400 }
      }
    },
    'MiTo': {
      '2008-2018': {
        '1.3 MultiJet 95hp': { fuel:'Diesel', cc:1248, code:'199B1', ecu:'Marelli 8F3', hp:95, nm:200, hp1:115, nm1:240 }
      }
    }
  },
  Honda: {
    'Civic Type R': {
      'FK2 - 2015-2017': {
        '2.0 VTEC Turbo 310hp': { fuel:'Gasoline', cc:1996, code:'K20C1', ecu:'Bosch MED17.9.3', hp:310, nm:400, hp1:355, nm1:470 },
      },
      'FK8 - 2017-2021': {
        '2.0 VTEC Turbo 320hp': { fuel:'Gasoline', cc:1996, code:'K20C1', ecu:'Bosch MED17.9.3', hp:320, nm:400, hp1:365, nm1:470 },
      }
    },
    'Civic': {
      'MK10 - 2015-2021': {
        '1.0 VTEC Turbo 129hp': { fuel:'Gasoline', cc:988, code:'P10A2', ecu:'Bosch EDC17CP52', hp:129, nm:200, hp1:150, nm1:240 },
        '1.5 VTEC Turbo 182hp': { fuel:'Gasoline', cc:1498, code:'L15B7', ecu:'Keihin', hp:182, nm:240, hp1:210, nm1:290 }
      }
    },
    'CR-V': {
      '2018+': {
        '1.5 VTEC Turbo 173hp': { fuel:'Gasoline', cc:1498, code:'L15BY', ecu:'Keihin', hp:173, nm:220, hp1:200, nm1:270 }
      }
    }
  },
  Mazda: {
    'Mazda 3': {
      'BP - 2019+': {
        '1.8 SkyActiv-D 116hp': { fuel:'Diesel', cc:1759, code:'S8-DPTS', ecu:'Denso', hp:116, nm:270, hp1:145, nm1:320 },
      }
    },
    'Mazda 2': {
      'DJ - 2014+': {
        '1.5 SkyActiv-G 90hp': { fuel:'Gasoline', cc:1496, code:'P5-VPS', ecu:'Denso', hp:90, nm:148, hp1:105, nm1:165 }
      }
    },
    'CX-5': {
      'KF - 2017+': {
        '2.2 SkyActiv-D 150hp': { fuel:'Diesel', cc:2191, code:'SH-VPTS', ecu:'Denso', hp:150, nm:380, hp1:185, nm1:440 },
        '2.2 SkyActiv-D 184hp': { fuel:'Diesel', cc:2191, code:'SH-VPTS', ecu:'Denso', hp:184, nm:445, hp1:210, nm1:490 }
      }
    }
  },
  Ferrari: {
    '458 Italia': {
      '2009-2015': {
        '4.5 V8 570hp': { fuel:'Gasoline', cc:4499, code:'F136 FB', ecu:'Bosch MED9.6.1', hp:570, nm:540, hp1:595, nm1:565 },
      }
    },
    '488 GTB': {
      '2015-2019': {
        '3.9 V8 TT 670hp': { fuel:'Gasoline', cc:3902, code:'F154 CB', ecu:'Bosch MED17.3.5', hp:670, nm:760, hp1:750, nm1:890 },
      }
    },
    'F8 Tributo': {
      '2019+': {
        '3.9 V8 TT 720hp': { fuel:'Gasoline', cc:3902, code:'F154 CD', ecu:'Bosch MG1CS005', hp:720, nm:770, hp1:790, nm1:900 },
      }
    },
    'Roma': {
      '2020+': {
        '3.9 V8 TT 620hp': { fuel:'Gasoline', cc:3902, code:'F154 BH', ecu:'Bosch MG1CS005', hp:620, nm:760, hp1:700, nm1:880 }
      }
    }
  },
  Lamborghini: {
    'Huracan': {
      'LP610-4 - 2014-2019': {
        '5.2 V10 610hp': { fuel:'Gasoline', cc:5204, code:'IDS', ecu:'Bosch MED17.1.1', hp:610, nm:560, hp1:640, nm1:590 },
      },
      'Evo - 2019+': {
        '5.2 V10 640hp': { fuel:'Gasoline', cc:5204, code:'DKAA', ecu:'Bosch MED17.1.1', hp:640, nm:600, hp1:670, nm1:630 },
      }
    },
    'Urus': {
      '2018+': {
        '4.0 V8 TT 650hp': { fuel:'Gasoline', cc:3996, code:'DHU', ecu:'Bosch MG1CS008', hp:650, nm:850, hp1:740, nm1:980 },
      }
    },
    'Aventador': {
      'LP700-4 - 2011-2016': {
        '6.5 V12 700hp': { fuel:'Gasoline', cc:6498, code:'L539', ecu:'Liek', hp:700, nm:690, hp1:730, nm1:720 }
      }
    }
  },
  Smart: {
    'Fortwo': {
      '453 - 2014-2024': {
        '0.9 Turbo 90hp': { fuel:'Gasoline', cc:898, code:'H4B', ecu:'Bosch ME17.9.20', hp:90, nm:135, hp1:115, nm1:175 },
        '0.9 Brabus 109hp': { fuel:'Gasoline', cc:898, code:'H4B', ecu:'Bosch ME17.9.20', hp:109, nm:170, hp1:125, nm1:210 }
      }
    }
  },
  SsangYong: {
    'Korando': {
      'C300 - 2019+': {
        '1.5 T-GDI 163hp': { fuel:'Gasoline', cc:1497, code:'G15DTF', ecu:'Delphi', hp:163, nm:280, hp1:190, nm1:340 },
        '1.6 e-XDI 136hp': { fuel:'Diesel', cc:1597, code:'D16DTF', ecu:'Delphi', hp:136, nm:324, hp1:165, nm1:390 }
      }
    }
  },
  Subaru: {
    'Impreza WRX STI': {
      'VA - 2014-2021': {
        '2.5T STI 300hp': { fuel:'Gasoline', cc:2457, code:'EJ257', ecu:'Denso', hp:300, nm:407, hp1:340, nm1:490 }
      }
    },
    'Forester': {
      'SJ - 2012-2018': {
        '2.0 XT 241hp': { fuel:'Gasoline', cc:1998, code:'FA20F', ecu:'Denso', hp:241, nm:350, hp1:280, nm1:420 }
      }
    }
  },
  Suzuki: {
    'Swift': {
      'AZ - 2017-2024': {
        '1.4 BoosterJet Sport 140hp': { fuel:'Gasoline', cc:1373, code:'K14C', ecu:'Bosch MED17.9.63', hp:140, nm:230, hp1:165, nm1:290 },
        '1.0 BoosterJet 111hp': { fuel:'Gasoline', cc:998, code:'K10C', ecu:'Bosch MED17.9.63', hp:111, nm:170, hp1:135, nm1:215 }
      }
    },
    'Vitara': {
      'LY - 2015+': {
        '1.4 BoosterJet 140hp': { fuel:'Gasoline', cc:1373, code:'K14C', ecu:'Bosch MED17.9.63', hp:140, nm:220, hp1:165, nm1:280 }
      }
    }
  },
  Tesla: {
    'Model 3': {
      '2017+': {
        'Long Range 351hp': { fuel:'Electric', cc:0, code:'Dual Motor', ecu:'OEM BMS', hp:351, nm:527, hp1:351, nm1:527 },
        'Performance 462hp': { fuel:'Electric', cc:0, code:'Dual Motor', ecu:'OEM BMS', hp:462, nm:639, hp1:462, nm1:639 }
      }
    }
  },
  Vauxhall: {
    'Corsa': {
      'F - 2019+': {
        '1.2 Turbo 100hp': { fuel:'Gasoline', cc:1199, code:'F12XHT', ecu:'Valeo VD56.1', hp:100, nm:205, hp1:130, nm1:260 },
        '1.2 Turbo 130hp': { fuel:'Gasoline', cc:1199, code:'F12XHT', ecu:'Valeo VD56.1', hp:130, nm:230, hp1:155, nm1:290 }
      }
    },
    'Astra': {
      'K - 2015-2021': {
        '1.4 Turbo 150hp': { fuel:'Gasoline', cc:1399, code:'B14XFT', ecu:'Delco E80', hp:150, nm:245, hp1:180, nm1:300 }
      }
    }
  },
  Lancia: {
    'Delta': {
      'III - 2008-2014': {
        '1.9 TwinTurbo MultiJet 190hp': { fuel:'Diesel', cc:1910, code:'844A3000', ecu:'Bosch EDC16C39', hp:190, nm:400, hp1:220, nm1:470 },
        '1.4 T-Jet 150hp': { fuel:'Gasoline', cc:1368, code:'198A1000', ecu:'Bosch ME7.9.10', hp:150, nm:206, hp1:175, nm1:260 }
      }
    }
  },
  Lexus: {
    'IS': {
      'XE30 - 2013-2020': {
        '200t 245hp': { fuel:'Gasoline', cc:1998, code:'8AR-FTS', ecu:'Denso', hp:245, nm:350, hp1:285, nm1:420 },
        '300h Hybrid 223hp': { fuel:'Hybrid', cc:2494, code:'2AR-FSE', ecu:'Denso', hp:223, nm:221, hp1:240, nm1:250 }
      }
    }
  },
  Lincoln: {
    'Navigator': {
      'IV - 2018+': {
        '3.5 V6 EcoBoost 456hp': { fuel:'Gasoline', cc:3496, code:'EcoBoost', ecu:'Ford PCM', hp:456, nm:691, hp1:510, nm1:820 }
      }
    },
    'MKZ': {
      '2013-2020': {
        '2.0 EcoBoost 245hp': { fuel:'Gasoline', cc:1999, code:'EcoBoost', ecu:'Bosch MED17.2', hp:245, nm:373, hp1:285, nm1:440 }
      }
    }
  },
  Lotus: {
    'Evora': {
      '2009-2021': {
        '3.5 V6 S 350hp': { fuel:'Gasoline', cc:3456, code:'2GR-FE', ecu:'Lotus T6', hp:350, nm:400, hp1:380, nm1:440 }
      }
    },
    'Emira': {
      '2022+': {
        '2.0 Turbo AMG 365hp': { fuel:'Gasoline', cc:1991, code:'M139', ecu:'Bosch CPC', hp:365, nm:430, hp1:420, nm1:510 }
      }
    }
  },
  Luxgen: {
    'U6': {
      '2013+': {
        '1.8 Eco Hyper 170hp': { fuel:'Gasoline', cc:1798, code:'Luxgen 1.8T', hp:170, nm:256, hp1:200, nm1:310 }
      }
    }
  },
  'Lynk & Co': {
    '01': {
      '2017+': {
        '2.0 TD 190hp': { fuel:'Gasoline', cc:1969, code:'B4204T', ecu:'Denso', hp:190, nm:300, hp1:240, nm1:380 },
        '1.5T PHEV 262hp': { fuel:'Hybrid', cc:1477, code:'JLH-3G15TD', ecu:'Volvo', hp:262, nm:425, hp1:290, nm1:480 }
      }
    }
  }
};
