// ===== Agricultural Vehicle Performance Database =====
export const agriData = {
  'John Deere': {
    '6R Series': {
      '2019+': {
        '4.5L 6110R 110hp': { fuel:'Diesel', cc:4500, code:'PowerTech PVS', ecu:'Bosch EDC17CV54', hp:110, nm:475, hp1:130, nm1:545 },
        '4.5L 6130R 130hp': { fuel:'Diesel', cc:4500, code:'PowerTech PVS', ecu:'Bosch EDC17CV54', hp:130, nm:530, hp1:152, nm1:610 },
        '6.8L 6155R 155hp': { fuel:'Diesel', cc:6800, code:'PowerTech PVX', ecu:'Bosch EDC17CV54', hp:155, nm:630, hp1:180, nm1:725 },
        '6.8L 6195R 195hp': { fuel:'Diesel', cc:6800, code:'PowerTech PVX', ecu:'Bosch EDC17CV54', hp:195, nm:780, hp1:225, nm1:895 },
        '6.8L 6215R 215hp': { fuel:'Diesel', cc:6800, code:'PowerTech PVX', ecu:'Bosch EDC17CV54', hp:215, nm:890, hp1:248, nm1:1020 },
        '6.8L 6250R 250hp': { fuel:'Diesel', cc:6800, code:'PowerTech PVX', ecu:'Bosch EDC17CV54', hp:250, nm:1020, hp1:288, nm1:1170 },
      }
    },
    '7R Series': {
      '2020+': {
        '6.8L 7R 270 270hp': { fuel:'Diesel', cc:6800, code:'PowerTech PVX', ecu:'Bosch EDC17CV54', hp:270, nm:1060, hp1:310, nm1:1220 },
        '6.8L 7R 310 310hp': { fuel:'Diesel', cc:6800, code:'PowerTech PVX', ecu:'Bosch EDC17CV54', hp:310, nm:1230, hp1:358, nm1:1415 },
        '6.8L 7R 350 350hp': { fuel:'Diesel', cc:6800, code:'PowerTech PVX', ecu:'Bosch EDC17CV54', hp:350, nm:1380, hp1:400, nm1:1585 },
      }
    },
    '8R Series': {
      '2020+': {
        '9.0L 8R 280 280hp': { fuel:'Diesel', cc:9000, code:'PowerTech PSS', ecu:'Bosch EDC17CV54', hp:280, nm:1125, hp1:322, nm1:1295 },
        '9.0L 8R 370 370hp': { fuel:'Diesel', cc:9000, code:'PowerTech PSS', ecu:'Bosch EDC17CV54', hp:370, nm:1530, hp1:425, nm1:1760 },
        '9.0L 8R 410 410hp': { fuel:'Diesel', cc:9000, code:'PowerTech PSS', ecu:'Bosch EDC17CV54', hp:410, nm:1680, hp1:470, nm1:1930 },
      }
    }
  },
  'Case IH': {
    'Puma': {
      '2019+': {
        '6.7L Puma 150 150hp': { fuel:'Diesel', cc:6728, code:'FPT NEF6', ecu:'Bosch EDC17C49', hp:150, nm:650, hp1:175, nm1:750 },
        '6.7L Puma 185 185hp': { fuel:'Diesel', cc:6728, code:'FPT NEF6', ecu:'Bosch EDC17C49', hp:185, nm:780, hp1:215, nm1:900 },
        '6.7L Puma 220 220hp': { fuel:'Diesel', cc:6728, code:'FPT NEF6', ecu:'Bosch EDC17C49', hp:220, nm:910, hp1:255, nm1:1045 },
      }
    },
    'Optum': {
      '2016+': {
        '6.7L Optum 270 CVX': { fuel:'Diesel', cc:6728, code:'FPT NEF6', ecu:'Bosch EDC17C49', hp:270, nm:1100, hp1:312, nm1:1265 },
        '6.7L Optum 300 CVX': { fuel:'Diesel', cc:6728, code:'FPT NEF6', ecu:'Bosch EDC17C49', hp:300, nm:1210, hp1:345, nm1:1390 },
      }
    },
    'Magnum': {
      '2019+': {
        '8.7L Magnum 340': { fuel:'Diesel', cc:8700, code:'FPT Cursor 9', ecu:'Bosch EDC17C49', hp:340, nm:1450, hp1:392, nm1:1670 },
        '8.7L Magnum 380': { fuel:'Diesel', cc:8700, code:'FPT Cursor 9', ecu:'Bosch EDC17C49', hp:380, nm:1580, hp1:435, nm1:1820 },
      }
    }
  },
  'New Holland': {
    'T6': {
      '2019+': {
        '4.5L T6.145 145hp': { fuel:'Diesel', cc:4485, code:'FPT NEF4', ecu:'Bosch EDC17C49', hp:145, nm:620, hp1:168, nm1:712 },
        '4.5L T6.175 175hp': { fuel:'Diesel', cc:4485, code:'FPT NEF4', ecu:'Bosch EDC17C49', hp:175, nm:730, hp1:202, nm1:840 },
      }
    },
    'T7': {
      '2019+': {
        '6.7L T7.230 230hp': { fuel:'Diesel', cc:6728, code:'FPT NEF6', ecu:'Bosch EDC17C49', hp:230, nm:940, hp1:265, nm1:1080 },
        '6.7L T7.270 270hp': { fuel:'Diesel', cc:6728, code:'FPT NEF6', ecu:'Bosch EDC17C49', hp:270, nm:1100, hp1:312, nm1:1265 },
        '6.7L T7.315 315hp': { fuel:'Diesel', cc:6728, code:'FPT NEF6', ecu:'Bosch EDC17C49', hp:315, nm:1260, hp1:362, nm1:1450 },
      }
    }
  },
  Fendt: {
    '700 Vario': {
      '2020+': {
        '6.1L 718 Vario 185hp': { fuel:'Diesel', cc:6057, code:'AGCO Power', ecu:'Bosch EDC17CV52', hp:185, nm:780, hp1:215, nm1:900 },
        '6.1L 720 Vario 209hp': { fuel:'Diesel', cc:6057, code:'AGCO Power', ecu:'Bosch EDC17CV52', hp:209, nm:880, hp1:242, nm1:1010 },
        '6.1L 724 Vario 237hp': { fuel:'Diesel', cc:6057, code:'AGCO Power', ecu:'Bosch EDC17CV52', hp:237, nm:1000, hp1:275, nm1:1150 },
      }
    },
    '900 Vario': {
      '2019+': {
        '7.8L 930 Vario 305hp': { fuel:'Diesel', cc:7752, code:'AGCO Power', ecu:'Bosch EDC17CV52', hp:305, nm:1280, hp1:350, nm1:1475 },
        '7.8L 936 Vario 360hp': { fuel:'Diesel', cc:7752, code:'AGCO Power', ecu:'Bosch EDC17CV52', hp:360, nm:1510, hp1:415, nm1:1735 },
        '7.8L 942 Vario 415hp': { fuel:'Diesel', cc:7752, code:'AGCO Power', ecu:'Bosch EDC17CV52', hp:415, nm:1710, hp1:475, nm1:1965 },
      }
    }
  },
  'Massey Ferguson': {
    '5S Series': {
      '2020+': {
        '4.4L 5S.105 105hp': { fuel:'Diesel', cc:4400, code:'AGCO Power', ecu:'Bosch EDC17CV52', hp:105, nm:440, hp1:122, nm1:505 },
        '4.4L 5S.135 135hp': { fuel:'Diesel', cc:4400, code:'AGCO Power', ecu:'Bosch EDC17CV52', hp:135, nm:550, hp1:156, nm1:632 },
        '4.4L 5S.145 145hp': { fuel:'Diesel', cc:4400, code:'AGCO Power', ecu:'Bosch EDC17CV52', hp:145, nm:590, hp1:168, nm1:678 },
      }
    },
    '7S Series': {
      '2021+': {
        '6.6L 7S.180 180hp': { fuel:'Diesel', cc:6600, code:'AGCO Power', ecu:'Bosch EDC17CV52', hp:180, nm:760, hp1:208, nm1:875 },
        '6.6L 7S.210 210hp': { fuel:'Diesel', cc:6600, code:'AGCO Power', ecu:'Bosch EDC17CV52', hp:210, nm:880, hp1:242, nm1:1010 },
      }
    }
  },
  Claas: {
    'Arion 500': {
      '2019+': {
        '4.5L Arion 510 125hp': { fuel:'Diesel', cc:4500, code:'FPT NEF4', ecu:'Bosch EDC17C49', hp:125, nm:530, hp1:145, nm1:610 },
        '6.5L Arion 550 155hp': { fuel:'Diesel', cc:4500, code:'FPT NEF4', ecu:'Bosch EDC17C49', hp:155, nm:640, hp1:180, nm1:735 },
      }
    },
    'Axion 800': {
      '2018+': {
        '6.8L Axion 810 215hp': { fuel:'Diesel', cc:6788, code:'FPT NEF6', ecu:'Bosch EDC17C49', hp:215, nm:890, hp1:248, nm1:1025 },
        '6.8L Axion 830 260hp': { fuel:'Diesel', cc:6788, code:'FPT NEF6', ecu:'Bosch EDC17C49', hp:260, nm:1060, hp1:300, nm1:1220 },
        '6.8L Axion 870 295hp': { fuel:'Diesel', cc:6788, code:'FPT NEF6', ecu:'Bosch EDC17C49', hp:295, nm:1200, hp1:340, nm1:1380 },
      }
    }
  },
  Steyr: {
    'Terrus CVT': {
      '2016+': {
        '6.7L 6300 Terrus 300hp': { fuel:'Diesel', cc:6728, code:'FPT NEF6', ecu:'Bosch EDC17C49', hp:300, nm:1282, hp1:345, nm1:1470 }
      }
    },
    'Profi CVT': {
      '2018+': {
        '4.5L 4145 Profi 145hp': { fuel:'Diesel', cc:4485, code:'FPT NEF4', ecu:'Bosch EDC17C49', hp:145, nm:650, hp1:175, nm1:755 }
      }
    }
  },
  Valtra: {
    'T Series': {
      'T4 - 2014+': {
        '7.4L T234 235hp': { fuel:'Diesel', cc:7400, code:'AGCO Power 74AWF', ecu:'Bosch EDC17CV52', hp:235, nm:1000, hp1:275, nm1:1160 }
      }
    },
    'N Series': {
      'N4 - 2015+': {
        '4.9L N174 165hp': { fuel:'Diesel', cc:4900, code:'AGCO Power 49AWF', ecu:'Bosch EDC17CV52', hp:165, nm:730, hp1:195, nm1:840 }
      }
    }
  },
  Krone: {
    'BiG X': {
      '2018+': {
        '11.9L BiG X 680 687hp': { fuel:'Diesel', cc:11900, code:'Liebherr D9512', ecu:'Bosch EDC17CV52', hp:687, nm:3000, hp1:770, nm1:3400 }
      }
    }
  },
  'Lamborghini Tractors': {
    'Mach VRT': {
      '2015+': {
        '6.1L Mach 250 VRT 250hp': { fuel:'Diesel', cc:6057, code:'Deutz TCD 6.1', hp:250, nm:1000, hp1:290, nm1:1180 }
      }
    },
    'Spark VRT': {
      '2017+': {
        '4.1L Spark 165 VRT 165hp': { fuel:'Diesel', cc:4038, code:'Deutz TCD 4.1', hp:165, nm:680, hp1:195, nm1:800 }
      }
    }
  }
};
