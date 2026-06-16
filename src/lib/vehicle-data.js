// ===== Vehicle Performance Gains Database =====
// Hierarchical: type → brand → model → generation → engine
// Each engine has stock and tuned (Stage 1) power/torque specs

import { truckData } from './data-trucks.js';
import { motoData } from './data-motos.js';
import { boatData } from './data-boats.js';
import { agriData } from './data-agri.js';
import { extraCarData } from './data-cars-extra.js';
import allCarBrandsAndModels from '../data/all_car_brands_and_models.json';


export const vehicleDatabase = {
  car: {
    Audi: {
      A1: {
        '8X - 2010-2018': {
          '1.0 TFSI 95hp': { fuel:'Gasoline', cc:999, code:'CHZB', ecu:'Bosch MED17.5.21', hp:95, nm:160, hp1:120, nm1:200 },
          '1.4 TFSI 125hp': { fuel:'Gasoline', cc:1395, code:'CZEA', ecu:'Bosch MED17.5.25', hp:125, nm:200, hp1:155, nm1:260 },
          '1.4 TFSI 150hp': { fuel:'Gasoline', cc:1395, code:'CZEA', ecu:'Bosch MED17.5.25', hp:150, nm:250, hp1:180, nm1:310 },
          '1.6 TDI 90hp': { fuel:'Diesel', cc:1598, code:'CAYB', ecu:'Bosch EDC17C64', hp:90, nm:230, hp1:120, nm1:290 },
          '1.6 TDI 116hp': { fuel:'Diesel', cc:1598, code:'CLHA', ecu:'Bosch EDC17C64', hp:116, nm:250, hp1:145, nm1:320 },
          '2.0 TFSI S1 231hp': { fuel:'Gasoline', cc:1984, code:'CJXG', ecu:'Siemens Simos 18.1', hp:231, nm:370, hp1:300, nm1:450 },
        },
        'GB - 2018+': {
          '1.0 TFSI 95hp': { fuel:'Gasoline', cc:999, code:'DLAA', ecu:'Bosch MG1CS011', hp:95, nm:175, hp1:125, nm1:220 },
          '1.0 TFSI 116hp': { fuel:'Gasoline', cc:999, code:'DKRF', ecu:'Bosch MG1CS011', hp:116, nm:200, hp1:145, nm1:260 },
          '1.5 TFSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 },
          '2.0 TFSI S1 231hp': { fuel:'Gasoline', cc:1984, code:'DKZA', ecu:'Bosch MG1CS111', hp:231, nm:370, hp1:300, nm1:450 },
          '2.0 TDI 116hp': { fuel:'Diesel', cc:1968, code:'DTTE', ecu:'Bosch MD1CP004', hp:116, nm:300, hp1:150, nm1:370 },
        }
      },
      A3: {
        '8P - 2003-2012': {
          '1.6 TDI 105hp': { fuel:'Diesel', cc:1598, code:'CAYC', ecu:'Bosch EDC17C46', hp:105, nm:250, hp1:140, nm1:310 },
          '1.9 TDI 105hp': { fuel:'Diesel', cc:1896, code:'BLS', ecu:'Bosch EDC16U34', hp:105, nm:250, hp1:140, nm1:320 },
          '2.0 TDI 140hp': { fuel:'Diesel', cc:1968, code:'BKD', ecu:'Bosch EDC16U31', hp:140, nm:320, hp1:180, nm1:400 },
          '2.0 TDI 170hp': { fuel:'Diesel', cc:1968, code:'CBBB', ecu:'Bosch EDC17CP14', hp:170, nm:350, hp1:210, nm1:430 },
          '2.0 TFSI 200hp': { fuel:'Gasoline', cc:1984, code:'AXX', ecu:'Bosch MED9.1', hp:200, nm:280, hp1:250, nm1:370 },
          '2.0 TFSI S3 265hp': { fuel:'Gasoline', cc:1984, code:'CDLA', ecu:'Bosch MED17.5', hp:265, nm:350, hp1:320, nm1:430 },
          '3.2 VR6 250hp': { fuel:'Gasoline', cc:3189, code:'BDB', ecu:'Bosch MED9.1', hp:250, nm:320, hp1:260, nm1:335 },
        },
        '8V - 2013-2020': {
          '1.0 TFSI 115hp': { fuel:'Gasoline', cc:999, code:'CHZJ', ecu:'Bosch MED17.5.21', hp:115, nm:200, hp1:140, nm1:250 },
          '1.4 TFSI 125hp': { fuel:'Gasoline', cc:1395, code:'CZEA', ecu:'Bosch MED17.5.25', hp:125, nm:200, hp1:155, nm1:260 },
          '1.4 TFSI 150hp': { fuel:'Gasoline', cc:1395, code:'CZEA', ecu:'Bosch MED17.5.25', hp:150, nm:250, hp1:180, nm1:310 },
          '1.5 TFSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 },
          '1.6 TDI 110hp': { fuel:'Diesel', cc:1598, code:'CLHA', ecu:'Bosch EDC17C64', hp:110, nm:250, hp1:145, nm1:320 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'CRLB', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 184hp': { fuel:'Diesel', cc:1968, code:'CUNA', ecu:'Bosch EDC17C74', hp:184, nm:380, hp1:225, nm1:460 },
          '2.0 TFSI 190hp': { fuel:'Gasoline', cc:1984, code:'CJXC', ecu:'Bosch MED17.5.2', hp:190, nm:320, hp1:245, nm1:400 },
          '2.0 TFSI S3 310hp': { fuel:'Gasoline', cc:1984, code:'CJXG', ecu:'Siemens Simos 18.1', hp:310, nm:400, hp1:370, nm1:480 },
          '2.5 TFSI RS3 400hp': { fuel:'Gasoline', cc:2480, code:'DAZA', ecu:'Bosch MG1CS002', hp:400, nm:480, hp1:460, nm1:560 },
        },
        '8Y - 2020+': {
          '1.0 TFSI 110hp': { fuel:'Gasoline', cc:999, code:'DLAA', ecu:'Bosch MG1CS011', hp:110, nm:200, hp1:140, nm1:250 },
          '1.5 TFSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 },
          '2.0 TDI 116hp': { fuel:'Diesel', cc:1968, code:'DTTE', ecu:'Bosch MD1CP004', hp:116, nm:300, hp1:150, nm1:370 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DTUA', ecu:'Bosch MD1CP004', hp:150, nm:360, hp1:195, nm1:440 },
          '2.0 TFSI S3 310hp': { fuel:'Gasoline', cc:1984, code:'DNUE', ecu:'Bosch MG1CS111', hp:310, nm:400, hp1:370, nm1:480 },
          '2.5 TFSI RS3 400hp': { fuel:'Gasoline', cc:2480, code:'DAZA', ecu:'Bosch MG1CS002', hp:400, nm:500, hp1:470, nm1:580 },
        }
      },
      A4: {
        'B7 - 2004-2008': {
          '1.9 TDI 115hp': { fuel:'Diesel', cc:1896, code:'AVF', ecu:'Bosch EDC15P+', hp:115, nm:285, hp1:150, nm1:350 },
          '2.0 TDI 140hp': { fuel:'Diesel', cc:1968, code:'BLB', ecu:'Bosch EDC16U31', hp:140, nm:320, hp1:180, nm1:400 },
          '2.0 TDI 170hp': { fuel:'Diesel', cc:1968, code:'BRD', ecu:'Bosch EDC16CP34', hp:170, nm:350, hp1:210, nm1:430 },
          '2.0 TFSI 200hp': { fuel:'Gasoline', cc:1984, code:'BWE', ecu:'Bosch MED9.1', hp:200, nm:280, hp1:250, nm1:370 },
          '3.0 TDI 233hp': { fuel:'Diesel', cc:2967, code:'ASB', ecu:'Bosch EDC16CP34', hp:233, nm:450, hp1:285, nm1:550 },
        },
        'B8 - 2008-2015': {
          '1.8 TFSI 120hp': { fuel:'Gasoline', cc:1798, code:'CABB', ecu:'Bosch MED17.5', hp:120, nm:230, hp1:170, nm1:310 },
          '1.8 TFSI 160hp': { fuel:'Gasoline', cc:1798, code:'CABA', ecu:'Bosch MED17.5', hp:160, nm:250, hp1:210, nm1:340 },
          '2.0 TDI 120hp': { fuel:'Diesel', cc:1968, code:'CJCB', ecu:'Bosch EDC17C46', hp:120, nm:290, hp1:160, nm1:370 },
          '2.0 TDI 143hp': { fuel:'Diesel', cc:1968, code:'CAGA', ecu:'Bosch EDC17CP20', hp:143, nm:320, hp1:185, nm1:400 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'CSUA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 177hp': { fuel:'Diesel', cc:1968, code:'CJCA', ecu:'Bosch EDC17C46', hp:177, nm:380, hp1:220, nm1:460 },
          '2.0 TFSI 211hp': { fuel:'Gasoline', cc:1984, code:'CDNC', ecu:'Bosch MED17.5', hp:211, nm:350, hp1:260, nm1:420 },
          '2.0 TFSI 225hp': { fuel:'Gasoline', cc:1984, code:'CNCD', ecu:'Siemens Simos 18.1', hp:225, nm:350, hp1:280, nm1:430 },
          '3.0 TDI 204hp': { fuel:'Diesel', cc:2967, code:'CAPA', ecu:'Bosch EDC17CP44', hp:204, nm:450, hp1:260, nm1:560 },
          '3.0 TDI 245hp': { fuel:'Diesel', cc:2967, code:'CDUC', ecu:'Bosch EDC17CP44', hp:245, nm:500, hp1:300, nm1:600 },
          '3.0 TFSI 272hp': { fuel:'Gasoline', cc:2995, code:'CMUA', ecu:'Siemens Simos 8.4', hp:272, nm:400, hp1:330, nm1:480 },
          '3.0 TFSI S4 333hp': { fuel:'Gasoline', cc:2995, code:'CGWC', ecu:'Siemens Simos 8.4', hp:333, nm:440, hp1:400, nm1:530 },
        },
        'B9 - 2016-2023': {
          '1.4 TFSI 150hp': { fuel:'Gasoline', cc:1395, code:'CVNA', ecu:'Bosch MED17.5.25', hp:150, nm:250, hp1:180, nm1:310 },
          '2.0 TDI 122hp': { fuel:'Diesel', cc:1968, code:'DETA', ecu:'Bosch EDC17C74', hp:122, nm:300, hp1:160, nm1:380 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DETA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DEUA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
          '2.0 TFSI 150hp': { fuel:'Gasoline', cc:1984, code:'CVKB', ecu:'Siemens Simos 18.10', hp:150, nm:270, hp1:200, nm1:350 },
          '2.0 TFSI 190hp': { fuel:'Gasoline', cc:1984, code:'CVKB', ecu:'Siemens Simos 18.10', hp:190, nm:320, hp1:245, nm1:400 },
          '2.0 TFSI 252hp': { fuel:'Gasoline', cc:1984, code:'CVKD', ecu:'Siemens Simos 18.10', hp:252, nm:370, hp1:310, nm1:450 },
          '2.0 TFSI S4 354hp': { fuel:'Gasoline', cc:1984, code:'CWGD', ecu:'Siemens Simos 18.10', hp:354, nm:500, hp1:410, nm1:570 },
          '3.0 TDI 218hp': { fuel:'Diesel', cc:2967, code:'CSWB', ecu:'Bosch EDC17CP54', hp:218, nm:500, hp1:275, nm1:600 },
          '3.0 TDI 272hp': { fuel:'Diesel', cc:2967, code:'CVUA', ecu:'Bosch EDC17CP54', hp:272, nm:600, hp1:330, nm1:700 },
          '3.0 TFSI 354hp': { fuel:'Gasoline', cc:2995, code:'CWGD', ecu:'Siemens Simos 18.10', hp:354, nm:500, hp1:410, nm1:570 },
          '2.9 TFSI RS4 450hp': { fuel:'Gasoline', cc:2894, code:'DECA', ecu:'Bosch MG1CS002', hp:450, nm:600, hp1:510, nm1:700 },
        }
      },
      A5: {
        'MK1 (8T) - 2007-2016': {
          '1.8 TFSI 160hp': { fuel:'Gasoline', cc:1798, code:'CABA', ecu:'Bosch MED17.5', hp:160, nm:250, hp1:210, nm1:340 },
          '1.8 TFSI 170hp': { fuel:'Gasoline', cc:1798, code:'CABD', ecu:'Bosch MED17.5', hp:170, nm:320, hp1:220, nm1:390 },
          '2.0 TDI 143hp': { fuel:'Diesel', cc:1968, code:'CAGA', ecu:'Bosch EDC17CP20', hp:143, nm:320, hp1:185, nm1:400 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'CSUA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 177hp': { fuel:'Diesel', cc:1968, code:'CJCA', ecu:'Bosch EDC17C46', hp:177, nm:380, hp1:220, nm1:460 },
          '2.0 TFSI 211hp': { fuel:'Gasoline', cc:1984, code:'CDNC', ecu:'Bosch MED17.5', hp:211, nm:350, hp1:260, nm1:420 },
          '2.0 TFSI 225hp': { fuel:'Gasoline', cc:1984, code:'CNCD', ecu:'Siemens Simos 18.1', hp:225, nm:350, hp1:280, nm1:430 },
          '3.0 TDI 204hp': { fuel:'Diesel', cc:2967, code:'CAPA', ecu:'Bosch EDC17CP44', hp:204, nm:450, hp1:260, nm1:560 },
          '3.0 TDI 218hp': { fuel:'Diesel', cc:2967, code:'CDUC', ecu:'Bosch EDC17CP44', hp:218, nm:450, hp1:275, nm1:560 },
          '3.0 TDI 245hp': { fuel:'Diesel', cc:2967, code:'CDUC', ecu:'Bosch EDC17CP44', hp:245, nm:500, hp1:300, nm1:600 },
          '3.0 TFSI 272hp': { fuel:'Gasoline', cc:2995, code:'CMUA', ecu:'Siemens Simos 8.4', hp:272, nm:400, hp1:330, nm1:480 },
          '3.0 TFSI S5 333hp': { fuel:'Gasoline', cc:2995, code:'CGWC', ecu:'Siemens Simos 8.4', hp:333, nm:440, hp1:400, nm1:530 },
          '4.2 FSI RS5 450hp': { fuel:'Gasoline', cc:4163, code:'CFSA', ecu:'Bosch MED17.1.1', hp:450, nm:430, hp1:465, nm1:450 },
        },
        'MK2 (F5) - 2016-2023': {
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DETA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 163hp': { fuel:'Diesel', cc:1968, code:'DETA', ecu:'Bosch EDC17C74', hp:163, nm:380, hp1:210, nm1:460 },
          '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DEUA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
          '2.0 TFSI 190hp': { fuel:'Gasoline', cc:1984, code:'CVKB', ecu:'Siemens Simos 18.10', hp:190, nm:320, hp1:245, nm1:400 },
          '2.0 TFSI 252hp': { fuel:'Gasoline', cc:1984, code:'CVKD', ecu:'Siemens Simos 18.10', hp:252, nm:370, hp1:310, nm1:450 },
          '2.0 TFSI S5 354hp': { fuel:'Gasoline', cc:1984, code:'CWGD', ecu:'Siemens Simos 18.10', hp:354, nm:500, hp1:410, nm1:570 },
          '3.0 TDI 218hp': { fuel:'Diesel', cc:2967, code:'CSWB', ecu:'Bosch EDC17CP54', hp:218, nm:500, hp1:275, nm1:600 },
          '3.0 TDI 286hp': { fuel:'Diesel', cc:2967, code:'CVUA', ecu:'Bosch EDC17CP54', hp:286, nm:620, hp1:340, nm1:720 },
          '2.9 TFSI RS5 450hp': { fuel:'Gasoline', cc:2894, code:'DECA', ecu:'Bosch MG1CS002', hp:450, nm:600, hp1:510, nm1:700 },
        }
      },
      A6: {
        'C6 - 2004-2011': {
          '2.0 TDI 140hp': { fuel:'Diesel', cc:1968, code:'BLB', ecu:'Bosch EDC16U31', hp:140, nm:320, hp1:180, nm1:400 },
          '2.0 TDI 170hp': { fuel:'Diesel', cc:1968, code:'CAHA', ecu:'Bosch EDC17CP14', hp:170, nm:350, hp1:210, nm1:430 },
          '2.7 TDI 190hp': { fuel:'Diesel', cc:2698, code:'CANA', ecu:'Bosch EDC17CP24', hp:190, nm:400, hp1:240, nm1:500 },
          '3.0 TDI 225hp': { fuel:'Diesel', cc:2967, code:'ASB', ecu:'Bosch EDC16CP34', hp:225, nm:450, hp1:280, nm1:550 },
          '3.0 TDI 240hp': { fuel:'Diesel', cc:2967, code:'CDYA', ecu:'Bosch EDC17CP44', hp:240, nm:500, hp1:295, nm1:600 },
          '2.0 TFSI 170hp': { fuel:'Gasoline', cc:1984, code:'BPJ', ecu:'Bosch MED9.1', hp:170, nm:280, hp1:220, nm1:360 },
          '3.0 TFSI 290hp': { fuel:'Gasoline', cc:2995, code:'CAJA', ecu:'Siemens Simos 8.3', hp:290, nm:420, hp1:345, nm1:500 },
          '4.2 FSI RS6 580hp': { fuel:'Gasoline', cc:4163, code:'BUH', ecu:'Bosch MED9.1.2', hp:580, nm:650, hp1:630, nm1:730 },
        },
        'C7 - 2011-2018': {
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'CSUA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 177hp': { fuel:'Diesel', cc:1968, code:'CGLC', ecu:'Bosch EDC17C46', hp:177, nm:380, hp1:220, nm1:460 },
          '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'CNHA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
          '2.0 TFSI 252hp': { fuel:'Gasoline', cc:1984, code:'CYMC', ecu:'Siemens Simos 18.10', hp:252, nm:370, hp1:310, nm1:450 },
          '3.0 TDI 218hp': { fuel:'Diesel', cc:2967, code:'CLAA', ecu:'Bosch EDC17CP44', hp:218, nm:500, hp1:275, nm1:600 },
          '3.0 TDI 272hp': { fuel:'Diesel', cc:2967, code:'CVUA', ecu:'Bosch EDC17CP44', hp:272, nm:580, hp1:330, nm1:680 },
          '3.0 TDI 320hp BiTDI': { fuel:'Diesel', cc:2967, code:'CZVA', ecu:'Bosch EDC17CP54', hp:320, nm:650, hp1:380, nm1:750 },
          '3.0 TFSI 333hp': { fuel:'Gasoline', cc:2995, code:'CGWB', ecu:'Siemens Simos 8.4', hp:333, nm:440, hp1:400, nm1:530 },
          '4.0 TFSI RS6 560hp': { fuel:'Gasoline', cc:3993, code:'CWUB', ecu:'Bosch MED17.1.6', hp:560, nm:700, hp1:640, nm1:830 },
          '4.0 TFSI RS6 Performance 605hp': { fuel:'Gasoline', cc:3993, code:'CWUC', ecu:'Bosch MED17.1.6', hp:605, nm:750, hp1:680, nm1:870 },
        },
        'C8 - 2018+': {
          '2.0 TDI 163hp': { fuel:'Diesel', cc:1968, code:'DETA', ecu:'Bosch MD1CP004', hp:163, nm:380, hp1:210, nm1:460 },
          '2.0 TDI 204hp': { fuel:'Diesel', cc:1968, code:'DTUA', ecu:'Bosch MD1CP004', hp:204, nm:400, hp1:245, nm1:480 },
          '2.0 TFSI 245hp': { fuel:'Gasoline', cc:1984, code:'DNUA', ecu:'Bosch MG1CS111', hp:245, nm:370, hp1:300, nm1:450 },
          '3.0 TDI 231hp': { fuel:'Diesel', cc:2967, code:'DCPC', ecu:'Bosch MD1CP004', hp:231, nm:500, hp1:285, nm1:610 },
          '3.0 TDI 286hp': { fuel:'Diesel', cc:2967, code:'DCPC', ecu:'Bosch MD1CP004', hp:286, nm:620, hp1:340, nm1:720 },
          '3.0 TFSI 340hp': { fuel:'Gasoline', cc:2995, code:'DCBE', ecu:'Bosch MG1CS002', hp:340, nm:500, hp1:400, nm1:580 },
          '2.9 TFSI S6 450hp': { fuel:'Gasoline', cc:2894, code:'DECA', ecu:'Bosch MG1CS002', hp:450, nm:600, hp1:510, nm1:700 },
          '4.0 TFSI RS6 600hp': { fuel:'Gasoline', cc:3996, code:'DCTB', ecu:'Bosch MG1CS008', hp:600, nm:800, hp1:680, nm1:920 },
        }
      },
      A7: {
        'MK1 (4G) - 2010-2018': {
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'CSUA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '3.0 TDI 218hp': { fuel:'Diesel', cc:2967, code:'CLAA', ecu:'Bosch EDC17CP44', hp:218, nm:500, hp1:275, nm1:600 },
          '3.0 TDI 272hp': { fuel:'Diesel', cc:2967, code:'CVUA', ecu:'Bosch EDC17CP44', hp:272, nm:580, hp1:330, nm1:680 },
          '3.0 TDI BiTDI 320hp': { fuel:'Diesel', cc:2967, code:'CZVA', ecu:'Bosch EDC17CP54', hp:320, nm:650, hp1:380, nm1:750 },
          '3.0 TFSI 310hp': { fuel:'Gasoline', cc:2995, code:'CGWB', ecu:'Siemens Simos 8.4', hp:310, nm:440, hp1:380, nm1:530 },
          '3.0 TFSI S7 450hp': { fuel:'Gasoline', cc:3993, code:'CEUC', ecu:'Bosch MED17.1.6', hp:450, nm:550, hp1:510, nm1:640 },
          '4.0 TFSI RS7 560hp': { fuel:'Gasoline', cc:3993, code:'CWUB', ecu:'Bosch MED17.1.6', hp:560, nm:700, hp1:640, nm1:830 },
          '4.0 TFSI RS7 Performance 605hp': { fuel:'Gasoline', cc:3993, code:'CWUC', ecu:'Bosch MED17.1.6', hp:605, nm:750, hp1:680, nm1:870 },
        },
        'MK2 (C8) - 2018+': {
          '2.0 TDI 163hp': { fuel:'Diesel', cc:1968, code:'DETA', ecu:'Bosch MD1CP004', hp:163, nm:380, hp1:210, nm1:460 },
          '2.0 TDI 204hp': { fuel:'Diesel', cc:1968, code:'DTUA', ecu:'Bosch MD1CP004', hp:204, nm:400, hp1:245, nm1:480 },
          '3.0 TDI 231hp': { fuel:'Diesel', cc:2967, code:'DCPC', ecu:'Bosch MD1CP004', hp:231, nm:500, hp1:285, nm1:610 },
          '3.0 TDI 286hp': { fuel:'Diesel', cc:2967, code:'DCPC', ecu:'Bosch MD1CP004', hp:286, nm:620, hp1:340, nm1:720 },
          '3.0 TFSI 340hp': { fuel:'Gasoline', cc:2995, code:'DCBE', ecu:'Bosch MG1CS002', hp:340, nm:500, hp1:400, nm1:580 },
          '2.9 TFSI S7 450hp': { fuel:'Gasoline', cc:2894, code:'DECA', ecu:'Bosch MG1CS002', hp:450, nm:600, hp1:510, nm1:700 },
          '4.0 TFSI RS7 600hp': { fuel:'Gasoline', cc:3996, code:'DCTB', ecu:'Bosch MG1CS008', hp:600, nm:800, hp1:680, nm1:920 },
        }
      },
      A8: {
        'D4 - 2010-2017': {
          '3.0 TDI 250hp': { fuel:'Diesel', cc:2967, code:'CDTA', ecu:'Bosch EDC17CP44', hp:250, nm:550, hp1:305, nm1:650 },
          '3.0 TDI 258hp': { fuel:'Diesel', cc:2967, code:'CDTA', ecu:'Bosch EDC17CP44', hp:258, nm:580, hp1:310, nm1:680 },
          '4.2 TDI 350hp': { fuel:'Diesel', cc:4134, code:'CDSB', ecu:'Bosch EDC17CP44', hp:350, nm:800, hp1:400, nm1:900 },
          '3.0 TFSI 310hp': { fuel:'Gasoline', cc:2995, code:'CGWA', ecu:'Siemens Simos 8.4', hp:310, nm:440, hp1:380, nm1:530 },
          '4.0 TFSI 420hp': { fuel:'Gasoline', cc:3993, code:'CEUA', ecu:'Bosch MED17.1.6', hp:420, nm:550, hp1:480, nm1:640 },
          '4.0 TFSI S8 520hp': { fuel:'Gasoline', cc:3993, code:'CGTA', ecu:'Bosch MED17.1.6', hp:520, nm:650, hp1:590, nm1:760 },
          '6.3 W12 500hp': { fuel:'Gasoline', cc:6299, code:'CTNA', ecu:'Bosch MED17.1.6', hp:500, nm:625, hp1:530, nm1:660 },
        },
        'D5 - 2017+': {
          '3.0 TDI 231hp': { fuel:'Diesel', cc:2967, code:'DCPC', ecu:'Bosch MD1CP004', hp:231, nm:500, hp1:285, nm1:610 },
          '3.0 TDI 286hp': { fuel:'Diesel', cc:2967, code:'DCPC', ecu:'Bosch MD1CP004', hp:286, nm:600, hp1:340, nm1:700 },
          '3.0 TFSI 340hp': { fuel:'Gasoline', cc:2995, code:'DCBE', ecu:'Bosch MG1CS002', hp:340, nm:500, hp1:400, nm1:580 },
          '4.0 TFSI S8 571hp': { fuel:'Gasoline', cc:3996, code:'DCTB', ecu:'Bosch MG1CS008', hp:571, nm:800, hp1:650, nm1:920 },
          '6.0 W12 585hp': { fuel:'Gasoline', cc:5998, code:'DCTA', ecu:'Bosch MG1CS008', hp:585, nm:800, hp1:620, nm1:850 },
        }
      },
      Q2: {
        '2016+': {
          '1.0 TFSI 116hp': { fuel:'Gasoline', cc:999, code:'CHZJ', ecu:'Bosch MED17.5.21', hp:116, nm:200, hp1:145, nm1:260 },
          '1.4 TFSI 150hp': { fuel:'Gasoline', cc:1395, code:'CZEA', ecu:'Bosch MED17.5.25', hp:150, nm:250, hp1:180, nm1:310 },
          '1.5 TFSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 },
          '1.6 TDI 116hp': { fuel:'Diesel', cc:1598, code:'DDYA', ecu:'Bosch EDC17C74', hp:116, nm:250, hp1:150, nm1:320 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DFGA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DFHA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
          '2.0 TFSI 190hp': { fuel:'Gasoline', cc:1984, code:'CZPB', ecu:'Siemens Simos 18.10', hp:190, nm:320, hp1:245, nm1:400 },
          '2.5 TFSI SQ2 300hp': { fuel:'Gasoline', cc:2480, code:'DAZA', ecu:'Bosch MG1CS002', hp:300, nm:400, hp1:360, nm1:480 },
        }
      },
      Q3: {
        'MK1 (8U) - 2011-2018': {
          '1.4 TFSI 150hp': { fuel:'Gasoline', cc:1395, code:'CZEA', ecu:'Bosch MED17.5.25', hp:150, nm:250, hp1:180, nm1:310 },
          '2.0 TDI 120hp': { fuel:'Diesel', cc:1968, code:'CUVB', ecu:'Bosch EDC17C74', hp:120, nm:290, hp1:160, nm1:370 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'CUVD', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 184hp': { fuel:'Diesel', cc:1968, code:'CUVC', ecu:'Bosch EDC17C74', hp:184, nm:380, hp1:225, nm1:460 },
          '2.0 TFSI 180hp': { fuel:'Gasoline', cc:1984, code:'CCZC', ecu:'Bosch MED17.5.2', hp:180, nm:320, hp1:235, nm1:400 },
          '2.0 TFSI 220hp': { fuel:'Gasoline', cc:1984, code:'CULB', ecu:'Siemens Simos 18.1', hp:220, nm:350, hp1:280, nm1:430 },
          '2.5 TFSI RS Q3 340hp': { fuel:'Gasoline', cc:2480, code:'CZGA', ecu:'Bosch MED17.1.62', hp:340, nm:450, hp1:390, nm1:520 },
        },
        'MK2 (F3) - 2018+': {
          '1.5 TFSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DFGA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DFHA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
          '2.0 TFSI 190hp': { fuel:'Gasoline', cc:1984, code:'CZPB', ecu:'Siemens Simos 18.10', hp:190, nm:320, hp1:245, nm1:400 },
          '2.0 TFSI 230hp': { fuel:'Gasoline', cc:1984, code:'DKZA', ecu:'Bosch MG1CS111', hp:230, nm:350, hp1:290, nm1:440 },
          '2.5 TFSI RS Q3 400hp': { fuel:'Gasoline', cc:2480, code:'DAZA', ecu:'Bosch MG1CS002', hp:400, nm:480, hp1:460, nm1:560 },
        }
      },
      Q5: {
        'MK1 (8R) - 2008-2017': {
          '2.0 TDI 143hp': { fuel:'Diesel', cc:1968, code:'CAGA', ecu:'Bosch EDC17CP20', hp:143, nm:320, hp1:185, nm1:400 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'CSUA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 177hp': { fuel:'Diesel', cc:1968, code:'CJCA', ecu:'Bosch EDC17C46', hp:177, nm:380, hp1:220, nm1:460 },
          '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'CNHA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
          '2.0 TFSI 211hp': { fuel:'Gasoline', cc:1984, code:'CDNC', ecu:'Bosch MED17.5', hp:211, nm:350, hp1:260, nm1:420 },
          '2.0 TFSI 225hp': { fuel:'Gasoline', cc:1984, code:'CNCD', ecu:'Siemens Simos 18.1', hp:225, nm:350, hp1:280, nm1:430 },
          '3.0 TDI 245hp': { fuel:'Diesel', cc:2967, code:'CDUC', ecu:'Bosch EDC17CP44', hp:245, nm:500, hp1:300, nm1:600 },
          '3.0 TDI 258hp': { fuel:'Diesel', cc:2967, code:'CVUA', ecu:'Bosch EDC17CP44', hp:258, nm:580, hp1:310, nm1:680 },
          '3.0 TFSI 272hp': { fuel:'Gasoline', cc:2995, code:'CTUA', ecu:'Siemens Simos 8.4', hp:272, nm:400, hp1:330, nm1:480 },
          '3.0 TFSI SQ5 354hp': { fuel:'Gasoline', cc:2995, code:'CTUD', ecu:'Siemens Simos 8.4', hp:354, nm:470, hp1:410, nm1:550 },
        },
        'MK2 (FY) - 2017+': {
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DETA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 163hp': { fuel:'Diesel', cc:1968, code:'DETA', ecu:'Bosch EDC17C74', hp:163, nm:380, hp1:210, nm1:460 },
          '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DEUA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
          '2.0 TDI 204hp': { fuel:'Diesel', cc:1968, code:'DTUA', ecu:'Bosch MD1CP004', hp:204, nm:400, hp1:245, nm1:480 },
          '2.0 TFSI 190hp': { fuel:'Gasoline', cc:1984, code:'DKNA', ecu:'Siemens Simos 18.10', hp:190, nm:320, hp1:245, nm1:400 },
          '2.0 TFSI 252hp': { fuel:'Gasoline', cc:1984, code:'DKNA', ecu:'Siemens Simos 18.10', hp:252, nm:370, hp1:310, nm1:450 },
          '3.0 TDI 286hp': { fuel:'Diesel', cc:2967, code:'DCPC', ecu:'Bosch MD1CP004', hp:286, nm:620, hp1:340, nm1:720 },
          '3.0 TFSI SQ5 354hp': { fuel:'Gasoline', cc:2995, code:'CWGD', ecu:'Siemens Simos 18.10', hp:354, nm:500, hp1:410, nm1:570 },
        }
      },
      Q7: {
        'MK1 (4L) - 2006-2015': {
          '3.0 TDI 233hp': { fuel:'Diesel', cc:2967, code:'BUG', ecu:'Bosch EDC16CP34', hp:233, nm:500, hp1:285, nm1:600 },
          '3.0 TDI 240hp': { fuel:'Diesel', cc:2967, code:'CASA', ecu:'Bosch EDC17CP44', hp:240, nm:550, hp1:295, nm1:650 },
          '3.0 TDI 245hp': { fuel:'Diesel', cc:2967, code:'CRCA', ecu:'Bosch EDC17CP44', hp:245, nm:550, hp1:300, nm1:650 },
          '3.0 TFSI 333hp': { fuel:'Gasoline', cc:2995, code:'CTWA', ecu:'Siemens Simos 8.4', hp:333, nm:440, hp1:400, nm1:530 },
          '4.2 TDI 340hp': { fuel:'Diesel', cc:4134, code:'CCFA', ecu:'Bosch EDC17CP44', hp:340, nm:760, hp1:400, nm1:870 },
          '6.0 TDI V12 500hp': { fuel:'Diesel', cc:5934, code:'CCGA', ecu:'Bosch EDC17CP44', hp:500, nm:1000, hp1:560, nm1:1100 },
        },
        'MK2 (4M) - 2015+': {
          '2.0 TDI 163hp': { fuel:'Diesel', cc:1968, code:'CUAA', ecu:'Bosch EDC17C74', hp:163, nm:380, hp1:210, nm1:460 },
          '3.0 TDI 218hp': { fuel:'Diesel', cc:2967, code:'CRTC', ecu:'Bosch EDC17CP54', hp:218, nm:500, hp1:275, nm1:600 },
          '3.0 TDI 272hp': { fuel:'Diesel', cc:2967, code:'CRTE', ecu:'Bosch EDC17CP54', hp:272, nm:600, hp1:330, nm1:700 },
          '3.0 TDI 286hp': { fuel:'Diesel', cc:2967, code:'DCPC', ecu:'Bosch MD1CP004', hp:286, nm:600, hp1:340, nm1:700 },
          '3.0 TFSI 340hp': { fuel:'Gasoline', cc:2995, code:'DCBE', ecu:'Bosch MG1CS002', hp:340, nm:500, hp1:400, nm1:580 },
          '3.0 TFSI SQ7 507hp': { fuel:'Gasoline', cc:2995, code:'DCBE', ecu:'Bosch MG1CS002', hp:507, nm:770, hp1:570, nm1:860 },
          '4.0 TDI SQ7 435hp': { fuel:'Diesel', cc:3956, code:'CZAC', ecu:'Bosch MD1CP004', hp:435, nm:900, hp1:500, nm1:1020 },
        }
      },
      Q8: {
        '2018+': {
          '2.0 TDI 204hp': { fuel:'Diesel', cc:1968, code:'DTUA', ecu:'Bosch MD1CP004', hp:204, nm:400, hp1:245, nm1:480 },
          '3.0 TDI 231hp': { fuel:'Diesel', cc:2967, code:'DCPC', ecu:'Bosch MD1CP004', hp:231, nm:500, hp1:285, nm1:610 },
          '3.0 TDI 286hp': { fuel:'Diesel', cc:2967, code:'DCPC', ecu:'Bosch MD1CP004', hp:286, nm:600, hp1:340, nm1:700 },
          '3.0 TFSI 340hp': { fuel:'Gasoline', cc:2995, code:'DCBE', ecu:'Bosch MG1CS002', hp:340, nm:500, hp1:400, nm1:580 },
          '4.0 TFSI SQ8 507hp': { fuel:'Gasoline', cc:3996, code:'DCTB', ecu:'Bosch MG1CS008', hp:507, nm:770, hp1:580, nm1:870 },
          '4.0 TFSI RS Q8 600hp': { fuel:'Gasoline', cc:3996, code:'DCTB', ecu:'Bosch MG1CS008', hp:600, nm:800, hp1:680, nm1:920 },
          '4.0 TDI SQ8 435hp': { fuel:'Diesel', cc:3956, code:'CZAC', ecu:'Bosch MD1CP004', hp:435, nm:900, hp1:500, nm1:1020 },
        }
      },
      TT: {
        'MK2 (8J) - 2006-2014': {
          '1.8 TFSI 160hp': { fuel:'Gasoline', cc:1798, code:'CDAA', ecu:'Bosch MED17.5', hp:160, nm:250, hp1:210, nm1:340 },
          '2.0 TDI 170hp': { fuel:'Diesel', cc:1968, code:'CBBB', ecu:'Bosch EDC17CP14', hp:170, nm:350, hp1:210, nm1:430 },
          '2.0 TFSI 200hp': { fuel:'Gasoline', cc:1984, code:'CCZA', ecu:'Bosch MED17.5', hp:200, nm:280, hp1:260, nm1:370 },
          '2.0 TFSI 211hp': { fuel:'Gasoline', cc:1984, code:'CDLB', ecu:'Bosch MED17.5.2', hp:211, nm:350, hp1:260, nm1:420 },
          '2.0 TFSI TTS 272hp': { fuel:'Gasoline', cc:1984, code:'CDLA', ecu:'Bosch MED17.5', hp:272, nm:350, hp1:320, nm1:430 },
          '2.5 TFSI TTRS 340hp': { fuel:'Gasoline', cc:2480, code:'CEPA', ecu:'Bosch MED17.1', hp:340, nm:450, hp1:395, nm1:530 },
          '2.5 TFSI TTRS Plus 360hp': { fuel:'Gasoline', cc:2480, code:'CEPB', ecu:'Bosch MED17.1', hp:360, nm:465, hp1:415, nm1:550 },
        },
        'MK3 (8S) - 2014+': {
          '1.8 TFSI 180hp': { fuel:'Gasoline', cc:1798, code:'CJSA', ecu:'Siemens Simos 12.1', hp:180, nm:250, hp1:225, nm1:330 },
          '2.0 TDI 184hp': { fuel:'Diesel', cc:1968, code:'CUNA', ecu:'Bosch EDC17C74', hp:184, nm:380, hp1:225, nm1:460 },
          '2.0 TFSI 197hp': { fuel:'Gasoline', cc:1984, code:'DKTA', ecu:'Bosch MG1CS111', hp:197, nm:320, hp1:250, nm1:400 },
          '2.0 TFSI 230hp': { fuel:'Gasoline', cc:1984, code:'CHHB', ecu:'Siemens Simos 18.1', hp:230, nm:370, hp1:300, nm1:450 },
          '2.0 TFSI 245hp': { fuel:'Gasoline', cc:1984, code:'DNUA', ecu:'Bosch MG1CS111', hp:245, nm:370, hp1:300, nm1:450 },
          '2.0 TFSI TTS 306hp': { fuel:'Gasoline', cc:1984, code:'CJXG', ecu:'Siemens Simos 18.1', hp:306, nm:380, hp1:365, nm1:470 },
          '2.5 TFSI TTRS 400hp': { fuel:'Gasoline', cc:2480, code:'DAZA', ecu:'Bosch MG1CS002', hp:400, nm:480, hp1:460, nm1:560 },
        }
      },
      'e-tron': {
        '2019+': {
          '55 Quattro 408hp': { fuel:'Electric', cc:0, code:'EMB', ecu:'OEM BMS', hp:408, nm:664, hp1:408, nm1:664 },
          '50 Quattro 313hp': { fuel:'Electric', cc:0, code:'EMA', ecu:'OEM BMS', hp:313, nm:540, hp1:313, nm1:540 },
          'S 503hp': { fuel:'Electric', cc:0, code:'EMC', ecu:'OEM BMS', hp:503, nm:973, hp1:503, nm1:973 },
        }
      },
      'e-tron GT': {
        '2021+': {
          'e-tron GT 476hp': { fuel:'Electric', cc:0, code:'J1', ecu:'OEM BMS', hp:476, nm:630, hp1:476, nm1:630 },
          'RS e-tron GT 598hp': { fuel:'Electric', cc:0, code:'J1', ecu:'OEM BMS', hp:598, nm:830, hp1:598, nm1:830 },
        }
      },
      RS3: {
        '8P - 2011-2012': {
          '2.5 TFSI RS3 340hp': { fuel:'Gasoline', cc:2480, code:'CEPA', ecu:'Bosch MED17.1.62', hp:340, nm:450, hp1:400, nm1:550 },
        },
        '8V - 2015-2020': {
          '2.5 TFSI RS3 367hp': { fuel:'Gasoline', cc:2480, code:'CZGB', ecu:'Bosch MED17.1.62', hp:367, nm:465, hp1:410, nm1:550 },
          '2.5 TFSI RS3 400hp': { fuel:'Gasoline', cc:2480, code:'DAZA', ecu:'Bosch MG1CS002', hp:400, nm:480, hp1:460, nm1:560 },
        },
        '8Y - 2021+': {
          '2.5 TFSI RS3 400hp': { fuel:'Gasoline', cc:2480, code:'DNWC', ecu:'Bosch MG1CS002', hp:400, nm:500, hp1:475, nm1:590 },
        }
      },
      RS4: {
        'B7 - 2006-2008': {
          '4.2 FSI RS4 420hp': { fuel:'Gasoline', cc:4163, code:'BNS', ecu:'Bosch MED9.1.1', hp:420, nm:430, hp1:440, nm1:455 },
        },
        'B8 - 2012-2015': {
          '4.2 FSI RS4 450hp': { fuel:'Gasoline', cc:4163, code:'CFSA', ecu:'Bosch MED17.1.1', hp:450, nm:430, hp1:475, nm1:455 },
        },
        'B9 - 2017+': {
          '2.9 TFSI RS4 450hp': { fuel:'Gasoline', cc:2894, code:'DECA', ecu:'Bosch MG1CS002', hp:450, nm:600, hp1:510, nm1:700 },
        }
      },
      RS5: {
        '8T - 2010-2016': {
          '4.2 FSI RS5 450hp': { fuel:'Gasoline', cc:4163, code:'CFSA', ecu:'Bosch MED17.1.1', hp:450, nm:430, hp1:475, nm1:455 },
        },
        'F5 - 2017+': {
          '2.9 TFSI RS5 450hp': { fuel:'Gasoline', cc:2894, code:'DECA', ecu:'Bosch MG1CS002', hp:450, nm:600, hp1:510, nm1:700 },
        }
      },
      RS6: {
        'C5 - 2002-2004': {
          '4.2 biturbo RS6 450hp': { fuel:'Gasoline', cc:4172, code:'BCY', ecu:'Bosch ME7.1.1', hp:450, nm:560, hp1:495, nm1:650 },
        },
        'C6 - 2008-2010': {
          '5.0 TFSI V10 RS6 580hp': { fuel:'Gasoline', cc:4991, code:'BUH', ecu:'Bosch MED9.1.2', hp:580, nm:650, hp1:630, nm1:730 },
        },
        'C7 - 2013-2018': {
          '4.0 TFSI RS6 560hp': { fuel:'Gasoline', cc:3993, code:'CWUB', ecu:'Bosch MED17.1.6', hp:560, nm:700, hp1:640, nm1:830 },
          '4.0 TFSI RS6 Performance 605hp': { fuel:'Gasoline', cc:3993, code:'CWUC', ecu:'Bosch MED17.1.6', hp:605, nm:750, hp1:680, nm1:870 },
        },
        'C8 - 2019+': {
          '4.0 TFSI RS6 600hp': { fuel:'Gasoline', cc:3996, code:'DCTB', ecu:'Bosch MG1CS008', hp:600, nm:800, hp1:680, nm1:920 },
        }
      },
      RS7: {
        'C7 - 2013-2018': {
          '4.0 TFSI RS7 560hp': { fuel:'Gasoline', cc:3993, code:'CWUB', ecu:'Bosch MED17.1.6', hp:560, nm:700, hp1:640, nm1:830 },
          '4.0 TFSI RS7 Performance 605hp': { fuel:'Gasoline', cc:3993, code:'CWUC', ecu:'Bosch MED17.1.6', hp:605, nm:750, hp1:680, nm1:870 },
        },
        'C8 - 2019+': {
          '4.0 TFSI RS7 600hp': { fuel:'Gasoline', cc:3996, code:'DCTB', ecu:'Bosch MG1CS008', hp:600, nm:800, hp1:680, nm1:920 },
        }
      },
      'RS Q3': {
        '8U - 2013-2018': {
          '2.5 TFSI RS Q3 310hp': { fuel:'Gasoline', cc:2480, code:'CTS', ecu:'Bosch MED17.1.62', hp:310, nm:420, hp1:360, nm1:500 },
          '2.5 TFSI RS Q3 340hp': { fuel:'Gasoline', cc:2480, code:'CZGA', ecu:'Bosch MED17.1.62', hp:340, nm:450, hp1:390, nm1:520 },
          '2.5 TFSI RS Q3 Performance 367hp': { fuel:'Gasoline', cc:2480, code:'CZGB', ecu:'Bosch MED17.1.62', hp:367, nm:465, hp1:415, nm1:540 },
        },
        'F3 - 2019+': {
          '2.5 TFSI RS Q3 400hp': { fuel:'Gasoline', cc:2480, code:'DNWA', ecu:'Bosch MG1CS002', hp:400, nm:480, hp1:460, nm1:560 },
        }
      },
      'RS Q8': {
        '4M - 2020+': {
          '4.0 TFSI RS Q8 600hp': { fuel:'Gasoline', cc:3996, code:'DHUB', ecu:'Bosch MG1CS008', hp:600, nm:800, hp1:680, nm1:920 },
        }
      },
      'R8': {
        'Type 42 - 2007-2015': {
          '4.2 FSI V8 420hp': { fuel:'Gasoline', cc:4163, code:'BYH', ecu:'Bosch MED9.1.2', hp:420, nm:430, hp1:445, nm1:460 },
          '5.2 FSI V10 525hp': { fuel:'Gasoline', cc:5204, code:'BUJ', ecu:'Bosch MED9.1.2', hp:525, nm:530, hp1:560, nm1:575 },
        },
        'Type 4S - 2015-2023': {
          '5.2 FSI V10 540hp': { fuel:'Gasoline', cc:5204, code:'DKAA', ecu:'Bosch MED17.1.1', hp:540, nm:540, hp1:600, nm1:580 },
          '5.2 FSI V10 Plus 610hp': { fuel:'Gasoline', cc:5204, code:'DKAA', ecu:'Bosch MED17.1.1', hp:610, nm:560, hp1:640, nm1:600 },
        }
      },
      'Q4 e-tron': {
        '2021+': {
          '35 e-tron 170hp': { fuel:'Electric', cc:0, code:'EBJ', ecu:'OEM BMS', hp:170, nm:310, hp1:170, nm1:310 },
          '40 e-tron 204hp': { fuel:'Electric', cc:0, code:'EBG', ecu:'OEM BMS', hp:204, nm:310, hp1:204, nm1:310 },
          '50 e-tron Quattro 299hp': { fuel:'Electric', cc:0, code:'EBG', ecu:'OEM BMS', hp:299, nm:460, hp1:299, nm1:460 },
        }
      },
    },
    BMW: {
      '1 Series': {
        'E81/E82/E87/E88 - 2004-2013': {
          '116i 115hp': { fuel:'Gasoline', cc:1596, code:'N45B16', ecu:'Bosch ME9.2', hp:115, nm:150, hp1:125, nm1:170 },
          '118d 143hp': { fuel:'Diesel', cc:1995, code:'N47D20A', ecu:'Bosch EDC17C06', hp:143, nm:300, hp1:177, nm1:380 },
          '120d 177hp': { fuel:'Diesel', cc:1995, code:'N47D20A', ecu:'Bosch EDC17C06', hp:177, nm:350, hp1:215, nm1:420 },
          '123d 204hp': { fuel:'Diesel', cc:1995, code:'N47D20D', ecu:'Bosch EDC17C06', hp:204, nm:400, hp1:245, nm1:480 },
          '130i 265hp': { fuel:'Gasoline', cc:2996, code:'N52B30', ecu:'Siemens MSV70', hp:265, nm:315, hp1:280, nm1:335 },
          '135i 306hp': { fuel:'Gasoline', cc:2979, code:'N54B30', ecu:'Siemens MSD80', hp:306, nm:400, hp1:360, nm1:500 },
          '1M Coupe 340hp': { fuel:'Gasoline', cc:2979, code:'N54B30TO', ecu:'Siemens MSD81', hp:340, nm:450, hp1:400, nm1:540 },
        },
        'F20/F21 - 2011-2019': {
          '114i 102hp': { fuel:'Gasoline', cc:1598, code:'N13B16', ecu:'Bosch MEVD17.2.8', hp:102, nm:180, hp1:170, nm1:250 },
          '116i 136hp': { fuel:'Gasoline', cc:1598, code:'N13B16', ecu:'Bosch MEVD17.2.8', hp:136, nm:220, hp1:200, nm1:300 },
          '118i 170hp': { fuel:'Gasoline', cc:1598, code:'N13B16', ecu:'Bosch MEVD17.2.8', hp:170, nm:250, hp1:220, nm1:310 },
          '116d 116hp': { fuel:'Diesel', cc:1995, code:'N47D20C', ecu:'Bosch EDC17C50', hp:116, nm:260, hp1:155, nm1:330 },
          '118d 150hp': { fuel:'Diesel', cc:1995, code:'B47D20A', ecu:'Bosch EDC17C50', hp:150, nm:320, hp1:195, nm1:400 },
          '120d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch EDC17C50', hp:190, nm:400, hp1:235, nm1:470 },
          '125d 224hp': { fuel:'Diesel', cc:1995, code:'B47D20O0', ecu:'Bosch EDC17C50', hp:224, nm:450, hp1:275, nm1:530 },
          'M135i 320hp': { fuel:'Gasoline', cc:2979, code:'N55B30', ecu:'Bosch MEVD17.2.5', hp:320, nm:450, hp1:380, nm1:540 },
          'M140i 340hp': { fuel:'Gasoline', cc:2998, code:'B58B30O0', ecu:'Bosch MG1CS003', hp:340, nm:500, hp1:420, nm1:600 },
        },
        'F40 - 2019+': {
          '116d 116hp': { fuel:'Diesel', cc:1496, code:'B37C15U0', ecu:'Bosch MD1CS001', hp:116, nm:270, hp1:150, nm1:340 },
          '118d 150hp': { fuel:'Diesel', cc:1995, code:'B47C20U1', ecu:'Bosch MD1CS001', hp:150, nm:350, hp1:195, nm1:420 },
          '120d 190hp': { fuel:'Diesel', cc:1995, code:'B47C20O1', ecu:'Bosch MD1CS001', hp:190, nm:400, hp1:230, nm1:480 },
          '118i 140hp': { fuel:'Gasoline', cc:1499, code:'B38A15F', ecu:'Bosch MG1CS201', hp:140, nm:220, hp1:175, nm1:290 },
          '128ti 265hp': { fuel:'Gasoline', cc:1998, code:'B48A20T1', ecu:'Bosch MG1CS201', hp:265, nm:400, hp1:310, nm1:480 },
          'M135i xDrive 306hp': { fuel:'Gasoline', cc:1998, code:'B48A20T1', ecu:'Bosch MG1CS201', hp:306, nm:450, hp1:360, nm1:520 },
        }
      },
      '2 Series': {
        'F22/F23 - 2014-2021': {
          '218d 150hp': { fuel:'Diesel', cc:1995, code:'B47D20A', ecu:'Bosch EDC17C50', hp:150, nm:320, hp1:195, nm1:400 },
          '220d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch EDC17C50', hp:190, nm:400, hp1:235, nm1:470 },
          '220i 184hp': { fuel:'Gasoline', cc:1998, code:'B48B20A', ecu:'Bosch MG1CS003', hp:184, nm:270, hp1:260, nm1:400 },
          '230i 252hp': { fuel:'Gasoline', cc:1998, code:'B48B20B', ecu:'Bosch MG1CS003', hp:252, nm:350, hp1:310, nm1:460 },
          'M235i 326hp': { fuel:'Gasoline', cc:2979, code:'N55B30', ecu:'Bosch MEVD17.2.6', hp:326, nm:450, hp1:380, nm1:540 },
          'M240i 340hp': { fuel:'Gasoline', cc:2998, code:'B58B30O0', ecu:'Bosch MG1CS003', hp:340, nm:500, hp1:420, nm1:600 },
        },
        'F44 Gran Coupe - 2020+': {
          '218i 136hp': { fuel:'Gasoline', cc:1499, code:'B38A15F', ecu:'Bosch MG1CS201', hp:136, nm:220, hp1:175, nm1:290 },
          '220i 178hp': { fuel:'Gasoline', cc:1998, code:'B48A20M1', ecu:'Bosch MG1CS201', hp:178, nm:280, hp1:240, nm1:400 },
          'M235i xDrive 306hp': { fuel:'Gasoline', cc:1998, code:'B48A20T1', ecu:'Bosch MG1CS201', hp:306, nm:450, hp1:360, nm1:520 },
        },
        'G42 - 2021+': {
          '220i 184hp': { fuel:'Gasoline', cc:1998, code:'B48B20A', ecu:'Bosch MG1CS201', hp:184, nm:300, hp1:260, nm1:420 },
          'M240i xDrive 374hp': { fuel:'Gasoline', cc:2998, code:'B58B30O1', ecu:'Bosch MG1CS201', hp:374, nm:500, hp1:440, nm1:610 },
        }
      },
      '3 Series': {
        'E46 - 1998-2006': {
          '320d 136hp': { fuel:'Diesel', cc:1951, code:'M47D20', ecu:'Bosch EDC15V', hp:136, nm:280, hp1:165, nm1:340 },
          '320d 150hp': { fuel:'Diesel', cc:1995, code:'M47D20TU', ecu:'Bosch DDE5', hp:150, nm:330, hp1:185, nm1:400 },
          '330d 184hp': { fuel:'Diesel', cc:2926, code:'M57D30', ecu:'Bosch DDE4', hp:184, nm:390, hp1:225, nm1:480 },
          '330d 204hp': { fuel:'Diesel', cc:2993, code:'M57D30TU', ecu:'Bosch DDE5', hp:204, nm:410, hp1:250, nm1:520 },
        },
        'E90/E91/E92/E93 - 2005-2013': {
          '318d 143hp': { fuel:'Diesel', cc:1995, code:'N47D20A', ecu:'Bosch EDC17C06', hp:143, nm:300, hp1:177, nm1:380 },
          '320d 163hp': { fuel:'Diesel', cc:1995, code:'M47D20TU2', ecu:'Bosch DDE6', hp:163, nm:340, hp1:195, nm1:400 },
          '320d 177hp': { fuel:'Diesel', cc:1995, code:'N47D20A', ecu:'Bosch EDC17C06', hp:177, nm:350, hp1:215, nm1:420 },
          '320d 184hp': { fuel:'Diesel', cc:1995, code:'N47D20C', ecu:'Bosch EDC17C41', hp:184, nm:380, hp1:220, nm1:450 },
          '325d 197hp': { fuel:'Diesel', cc:2993, code:'M57D30TU2', ecu:'Bosch DDE6', hp:197, nm:400, hp1:245, nm1:500 },
          '325d 204hp': { fuel:'Diesel', cc:2993, code:'N57D30A', ecu:'Bosch EDC17C41', hp:204, nm:430, hp1:265, nm1:530 },
          '330d 231hp': { fuel:'Diesel', cc:2993, code:'M57D30TU2', ecu:'Bosch DDE6', hp:231, nm:500, hp1:280, nm1:600 },
          '330d 245hp': { fuel:'Diesel', cc:2993, code:'N57D30A', ecu:'Bosch EDC17C41', hp:245, nm:520, hp1:300, nm1:620 },
          '335d 286hp': { fuel:'Diesel', cc:2993, code:'M57D30TUP2', ecu:'Bosch DDE626', hp:286, nm:580, hp1:340, nm1:680 },
          '335i 306hp': { fuel:'Gasoline', cc:2979, code:'N54B30', ecu:'Siemens MSD80', hp:306, nm:400, hp1:360, nm1:500 },
        },
        'F30/F31/F34 - 2012-2019': {
          '316d 116hp': { fuel:'Diesel', cc:1995, code:'N47D20C', ecu:'Bosch EDC17C50', hp:116, nm:260, hp1:180, nm1:380 },
          '318d 143hp': { fuel:'Diesel', cc:1995, code:'N47D20C', ecu:'Bosch EDC17C50', hp:143, nm:320, hp1:185, nm1:400 },
          '318d 150hp': { fuel:'Diesel', cc:1995, code:'B47D20A', ecu:'Bosch EDC17C50', hp:150, nm:320, hp1:195, nm1:400 },
          '320d 184hp': { fuel:'Diesel', cc:1995, code:'N47D20C', ecu:'Bosch EDC17C50', hp:184, nm:380, hp1:220, nm1:450 },
          '320d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch EDC17C50', hp:190, nm:400, hp1:235, nm1:470 },
          '330d 258hp': { fuel:'Diesel', cc:2993, code:'N57D30A', ecu:'Bosch EDC17C56', hp:258, nm:560, hp1:310, nm1:650 },
          '335d xDrive 313hp': { fuel:'Diesel', cc:2993, code:'N57D30B', ecu:'Bosch EDC17C56', hp:313, nm:630, hp1:370, nm1:720 },
          '320i 184hp': { fuel:'Gasoline', cc:1997, code:'N20B20B', ecu:'Bosch MEVD17.2.4', hp:184, nm:270, hp1:260, nm1:400 },
          '328i 245hp': { fuel:'Gasoline', cc:1997, code:'N20B20A', ecu:'Bosch MEVD17.2.4', hp:245, nm:350, hp1:290, nm1:420 },
          '330i 252hp': { fuel:'Gasoline', cc:1998, code:'B48B20B', ecu:'Bosch MG1CS003', hp:252, nm:350, hp1:310, nm1:460 },
          '335i 306hp': { fuel:'Gasoline', cc:2979, code:'N55B30', ecu:'Bosch MEVD17.2', hp:306, nm:400, hp1:365, nm1:500 },
          '340i 326hp': { fuel:'Gasoline', cc:2998, code:'B58B30M0', ecu:'Bosch MG1CS003', hp:326, nm:450, hp1:400, nm1:560 },
        },
        'G20/G21 - 2019+': {
          '318d 150hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch MD1CS001', hp:150, nm:350, hp1:200, nm1:420 },
          '320d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20O1', ecu:'Bosch MD1CS001', hp:190, nm:400, hp1:240, nm1:480 },
          '330d 265hp': { fuel:'Diesel', cc:2993, code:'B57D30O0', ecu:'Bosch MD1CS001', hp:265, nm:580, hp1:320, nm1:680 },
          'M340d 340hp': { fuel:'Diesel', cc:2993, code:'B57D30T0', ecu:'Bosch MD1CS001', hp:340, nm:700, hp1:400, nm1:800 },
          '320i 184hp': { fuel:'Gasoline', cc:1998, code:'B48B20A', ecu:'Bosch MG1CS201', hp:184, nm:300, hp1:260, nm1:420 },
          '330i 258hp': { fuel:'Gasoline', cc:1998, code:'B48B20B', ecu:'Bosch MG1CS201', hp:258, nm:400, hp1:310, nm1:480 },
          'M340i 374hp': { fuel:'Gasoline', cc:2998, code:'B58B30M1', ecu:'Bosch MG1CS201', hp:374, nm:500, hp1:430, nm1:600 },
        }
      },
      '4 Series': {
        'F32/F33/F36 - 2013-2020': {
          '420d 184hp': { fuel:'Diesel', cc:1995, code:'N47D20C', ecu:'Bosch EDC17C50', hp:184, nm:380, hp1:220, nm1:450 },
          '420d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch EDC17C50', hp:190, nm:400, hp1:235, nm1:470 },
          '430d 258hp': { fuel:'Diesel', cc:2993, code:'N57D30A', ecu:'Bosch EDC17C56', hp:258, nm:560, hp1:310, nm1:650 },
          '435d xDrive 313hp': { fuel:'Diesel', cc:2993, code:'N57D30B', ecu:'Bosch EDC17C56', hp:313, nm:630, hp1:370, nm1:720 },
          '420i 184hp': { fuel:'Gasoline', cc:1998, code:'B48B20A', ecu:'Bosch MG1CS003', hp:184, nm:270, hp1:260, nm1:400 },
          '430i 252hp': { fuel:'Gasoline', cc:1998, code:'B48B20B', ecu:'Bosch MG1CS003', hp:252, nm:350, hp1:310, nm1:460 },
          '435i 306hp': { fuel:'Gasoline', cc:2979, code:'N55B30', ecu:'Bosch MEVD17.2', hp:306, nm:400, hp1:365, nm1:500 },
          '440i 326hp': { fuel:'Gasoline', cc:2998, code:'B58B30M0', ecu:'Bosch MG1CS003', hp:326, nm:450, hp1:400, nm1:560 },
        },
        'G22/G23/G26 - 2020+': {
          '420i 184hp': { fuel:'Gasoline', cc:1998, code:'B48B20A', ecu:'Bosch MG1CS201', hp:184, nm:300, hp1:260, nm1:420 },
          '430i 258hp': { fuel:'Gasoline', cc:1998, code:'B48B20B', ecu:'Bosch MG1CS201', hp:258, nm:400, hp1:310, nm1:480 },
          'M440i xDrive 374hp': { fuel:'Gasoline', cc:2998, code:'B58B30O1', ecu:'Bosch MG1CS201', hp:374, nm:500, hp1:440, nm1:610 },
        }
      },
      '5 Series': {
        'E60/E61 - 2003-2010': {
          '520d 163hp': { fuel:'Diesel', cc:1995, code:'M47D20TU2', ecu:'Bosch DDE6', hp:163, nm:345, hp1:195, nm1:400 },
          '520d 177hp': { fuel:'Diesel', cc:1995, code:'N47D20A', ecu:'Bosch EDC17C06', hp:177, nm:350, hp1:215, nm1:420 },
          '525d 177hp': { fuel:'Diesel', cc:2497, code:'M57D25TU', ecu:'Bosch DDE5', hp:177, nm:400, hp1:210, nm1:480 },
          '525d 197hp': { fuel:'Diesel', cc:2993, code:'M57D30TU2', ecu:'Bosch DDE6', hp:197, nm:400, hp1:245, nm1:500 },
          '530d 218hp': { fuel:'Diesel', cc:2993, code:'M57D30TU', ecu:'Bosch DDE5', hp:218, nm:500, hp1:265, nm1:600 },
          '530d 231hp': { fuel:'Diesel', cc:2993, code:'M57D30TU2', ecu:'Bosch DDE6', hp:231, nm:500, hp1:280, nm1:600 },
          '530d 235hp': { fuel:'Diesel', cc:2993, code:'M57D30TU2', ecu:'Bosch DDE6', hp:235, nm:500, hp1:285, nm1:600 },
          '535d 272hp': { fuel:'Diesel', cc:2993, code:'M57D30TUP', ecu:'Bosch DDE6', hp:272, nm:560, hp1:320, nm1:660 },
          '535d 286hp': { fuel:'Diesel', cc:2993, code:'M57D30TUP2', ecu:'Bosch DDE626', hp:286, nm:580, hp1:340, nm1:680 },
          '535i 306hp': { fuel:'Gasoline', cc:2979, code:'N54B30', ecu:'Siemens MSD80', hp:306, nm:400, hp1:360, nm1:500 },
        },
        'F10/F11/F07 - 2010-2017': {
          '518d 143hp': { fuel:'Diesel', cc:1995, code:'N47D20C', ecu:'Bosch EDC17C50', hp:143, nm:360, hp1:185, nm1:430 },
          '518d 150hp': { fuel:'Diesel', cc:1995, code:'B47D20A', ecu:'Bosch EDC17C50', hp:150, nm:360, hp1:195, nm1:430 },
          '520d 184hp': { fuel:'Diesel', cc:1995, code:'N47D20C', ecu:'Bosch EDC17C50', hp:184, nm:380, hp1:220, nm1:450 },
          '520d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch EDC17C50', hp:190, nm:400, hp1:235, nm1:470 },
          '525d 204hp': { fuel:'Diesel', cc:2993, code:'N57D30U0', ecu:'Bosch EDC17C41', hp:204, nm:450, hp1:265, nm1:550 },
          '525d 218hp': { fuel:'Diesel', cc:1995, code:'N47D20D', ecu:'Bosch EDC17C50', hp:218, nm:450, hp1:260, nm1:520 },
          '530d 245hp': { fuel:'Diesel', cc:2993, code:'N57D30A', ecu:'Bosch EDC17C41', hp:245, nm:540, hp1:300, nm1:640 },
          '530d 258hp': { fuel:'Diesel', cc:2993, code:'N57D30O1', ecu:'Bosch EDC17C56', hp:258, nm:560, hp1:310, nm1:650 },
          '535d 300hp': { fuel:'Diesel', cc:2993, code:'N57D30B', ecu:'Bosch EDC17C41', hp:300, nm:600, hp1:360, nm1:700 },
          '535d 313hp': { fuel:'Diesel', cc:2993, code:'N57D30T1', ecu:'Bosch EDC17C56', hp:313, nm:630, hp1:370, nm1:720 },
          'M550d xDrive 381hp': { fuel:'Diesel', cc:2993, code:'N57D30S1', ecu:'Bosch EDC17C56', hp:381, nm:740, hp1:430, nm1:840 },
          '535i 306hp': { fuel:'Gasoline', cc:2979, code:'N55B30', ecu:'Bosch MEVD17.2', hp:306, nm:400, hp1:365, nm1:500 },
          '550i 407hp': { fuel:'Gasoline', cc:4395, code:'N63B44A', ecu:'Bosch MSD85', hp:407, nm:600, hp1:490, nm1:720 },
          '550i 450hp': { fuel:'Gasoline', cc:4395, code:'N63B44B', ecu:'Bosch MEVD17.2.8', hp:450, nm:650, hp1:520, nm1:780 },
        },
        'G30/G31 - 2017-2023': {
          '520d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch MD1CS001', hp:190, nm:400, hp1:240, nm1:480 },
          '525d 231hp': { fuel:'Diesel', cc:1995, code:'B47D20T0', ecu:'Bosch MD1CS001', hp:231, nm:500, hp1:275, nm1:580 },
          '530d 265hp': { fuel:'Diesel', cc:2993, code:'B57D30A', ecu:'Bosch MD1CS001', hp:265, nm:620, hp1:320, nm1:700 },
          '540d xDrive 320hp': { fuel:'Diesel', cc:2993, code:'B57D30T0', ecu:'Bosch MD1CS001', hp:320, nm:680, hp1:380, nm1:780 },
          'M550d xDrive 400hp': { fuel:'Diesel', cc:2993, code:'B57D30C', ecu:'Bosch MD1CS001', hp:400, nm:760, hp1:460, nm1:860 },
          '520i 184hp': { fuel:'Gasoline', cc:1998, code:'B48B20A', ecu:'Bosch MG1CS003', hp:184, nm:290, hp1:260, nm1:420 },
          '530i 252hp': { fuel:'Gasoline', cc:1998, code:'B48B20B', ecu:'Bosch MG1CS003', hp:252, nm:350, hp1:310, nm1:460 },
          '540i 340hp': { fuel:'Gasoline', cc:2998, code:'B58B30M0', ecu:'Bosch MG1CS003', hp:340, nm:450, hp1:400, nm1:560 },
          'M550i xDrive 462hp': { fuel:'Gasoline', cc:4395, code:'N63B44C', ecu:'Bosch MG1CS003', hp:462, nm:650, hp1:530, nm1:760 },
          'M550i xDrive 530hp': { fuel:'Gasoline', cc:4395, code:'N63B44D', ecu:'Bosch MG1CS024', hp:530, nm:750, hp1:620, nm1:880 },
        }
      },
      '6 Series': {
        'F12/F13/F06 - 2011-2018': {
          '640d 313hp': { fuel:'Diesel', cc:2993, code:'N57D30T1', ecu:'Bosch EDC17C56', hp:313, nm:630, hp1:370, nm1:720 },
          '640i 320hp': { fuel:'Gasoline', cc:2979, code:'N55B30A', ecu:'Bosch MEVD17.2.6', hp:320, nm:450, hp1:380, nm1:540 },
          '650i 450hp': { fuel:'Gasoline', cc:4395, code:'N63B44B', ecu:'Bosch MEVD17.2.8', hp:450, nm:650, hp1:520, nm1:780 }
        }
      },
      '8 Series': {
        'G14/G15/G16 - 2018+': {
          '840d xDrive 320hp': { fuel:'Diesel', cc:2993, code:'B57D30T0', ecu:'Bosch MD1CS001', hp:320, nm:680, hp1:380, nm1:780 },
          '840i 340hp': { fuel:'Gasoline', cc:2998, code:'B58B30O1', ecu:'Bosch MG1CS201', hp:340, nm:500, hp1:420, nm1:600 },
          'M850i xDrive 530hp': { fuel:'Gasoline', cc:4395, code:'N63B44D', ecu:'Bosch MG1CS024', hp:530, nm:750, hp1:620, nm1:880 }
        }
      },
      '7 Series': {
        'F01/F02 - 2008-2015': {
          '730d 245hp': { fuel:'Diesel', cc:2993, code:'N57D30A', ecu:'Bosch EDC17C41', hp:245, nm:540, hp1:300, nm1:640 },
          '730d 258hp': { fuel:'Diesel', cc:2993, code:'N57D30O1', ecu:'Bosch EDC17C56', hp:258, nm:560, hp1:310, nm1:650 },
          '740d 306hp': { fuel:'Diesel', cc:2993, code:'N57D30B', ecu:'Bosch EDC17C41', hp:306, nm:600, hp1:360, nm1:700 },
          '740d 313hp': { fuel:'Diesel', cc:2993, code:'N57D30T1', ecu:'Bosch EDC17C56', hp:313, nm:630, hp1:370, nm1:720 },
        },
        'G11/G12 - 2015-2022': {
          '730d 265hp': { fuel:'Diesel', cc:2993, code:'B57D30A', ecu:'Bosch MD1CS001', hp:265, nm:620, hp1:320, nm1:700 },
          '740d 320hp': { fuel:'Diesel', cc:2993, code:'B57D30T0', ecu:'Bosch MD1CS001', hp:320, nm:680, hp1:380, nm1:780 },
          '750d 400hp': { fuel:'Diesel', cc:2993, code:'B57D30C', ecu:'Bosch MD1CS001', hp:400, nm:760, hp1:460, nm1:860 },
          '740i 326hp': { fuel:'Gasoline', cc:2998, code:'B58B30M0', ecu:'Bosch MG1CS003', hp:326, nm:450, hp1:400, nm1:560 },
          '750i 450hp': { fuel:'Gasoline', cc:4395, code:'N63B44C', ecu:'Bosch MG1CS003', hp:450, nm:650, hp1:530, nm1:760 },
        }
      },
      'X1': {
        'E84 - 2009-2015': {
          'sDrive18d 143hp': { fuel:'Diesel', cc:1995, code:'N47D20A', ecu:'Bosch EDC17C06', hp:143, nm:320, hp1:180, nm1:400 },
          'xDrive20d 177hp': { fuel:'Diesel', cc:1995, code:'N47D20A', ecu:'Bosch EDC17C06', hp:177, nm:350, hp1:215, nm1:420 }
        },
        'F48 - 2015-2022': {
          'sDrive18d 150hp': { fuel:'Diesel', cc:1995, code:'B47D20A', ecu:'Bosch EDC17C50', hp:150, nm:330, hp1:190, nm1:400 },
          'xDrive20d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch EDC17C50', hp:190, nm:400, hp1:230, nm1:470 },
          'sDrive18i 136hp': { fuel:'Gasoline', cc:1499, code:'B38A15A', ecu:'Bosch MEVD17.2.3', hp:136, nm:220, hp1:170, nm1:290 },
          'xDrive20i 192hp': { fuel:'Gasoline', cc:1998, code:'B48A20A', ecu:'Bosch MG1CS003', hp:192, nm:280, hp1:240, nm1:390 }
        },
        'U11 - 2022+': {
          'sDrive18d 150hp': { fuel:'Diesel', cc:1995, code:'B47C20U1', ecu:'Bosch MD1CS001', hp:150, nm:360, hp1:195, nm1:420 },
          'sDrive20i 170hp': { fuel:'Gasoline', cc:1499, code:'B38A15P', ecu:'Bosch MG1CS201', hp:170, nm:280, hp1:200, nm1:350 }
        }
      },
      'X2': {
        'F39 - 2018-2023': {
          'sDrive18d 150hp': { fuel:'Diesel', cc:1995, code:'B47D20A', ecu:'Bosch EDC17C50', hp:150, nm:350, hp1:190, nm1:420 },
          'xDrive20d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch EDC17C50', hp:190, nm:400, hp1:230, nm1:470 },
          'sDrive18i 136hp': { fuel:'Gasoline', cc:1499, code:'B38A15F', ecu:'Bosch MG1CS201', hp:136, nm:220, hp1:175, nm1:290 },
          'xDrive20i 192hp': { fuel:'Gasoline', cc:1998, code:'B48A20A', ecu:'Bosch MG1CS003', hp:192, nm:280, hp1:240, nm1:390 },
          'M35i 306hp': { fuel:'Gasoline', cc:1998, code:'B48A20T1', ecu:'Bosch MG1CS201', hp:306, nm:450, hp1:360, nm1:520 }
        }
      },
      'X3': {
        'F25 - 2010-2017': {
          'xDrive20d 184hp': { fuel:'Diesel', cc:1995, code:'N47D20C', ecu:'Bosch EDC17C50', hp:184, nm:380, hp1:220, nm1:450 },
          'xDrive20d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch EDC17C50', hp:190, nm:400, hp1:235, nm1:470 },
          'xDrive30d 258hp': { fuel:'Diesel', cc:2993, code:'N57D30A', ecu:'Bosch EDC17C56', hp:258, nm:560, hp1:310, nm1:650 },
          'xDrive35d 313hp': { fuel:'Diesel', cc:2993, code:'N57D30T1', ecu:'Bosch EDC17C56', hp:313, nm:630, hp1:370, nm1:720 },
        },
        'G01 - 2017+': {
          'xDrive20d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch MD1CS001', hp:190, nm:400, hp1:240, nm1:480 },
          'xDrive30d 265hp': { fuel:'Diesel', cc:2993, code:'B57D30A', ecu:'Bosch MD1CS001', hp:265, nm:620, hp1:320, nm1:700 },
          'M40d 326hp': { fuel:'Diesel', cc:2993, code:'B57D30T0', ecu:'Bosch MD1CS001', hp:326, nm:680, hp1:380, nm1:780 },
          'xDrive20i 184hp': { fuel:'Gasoline', cc:1998, code:'B48B20A', ecu:'Bosch MG1CS003', hp:184, nm:290, hp1:260, nm1:420 },
          'xDrive30i 252hp': { fuel:'Gasoline', cc:1998, code:'B48B20B', ecu:'Bosch MG1CS003', hp:252, nm:350, hp1:310, nm1:460 },
          'M40i 354hp': { fuel:'Gasoline', cc:2998, code:'B58B30M0', ecu:'Bosch MG1CS003', hp:354, nm:500, hp1:420, nm1:600 },
          'M40i 360hp': { fuel:'Gasoline', cc:2998, code:'B58B30O1', ecu:'Bosch MG1CS201', hp:360, nm:500, hp1:430, nm1:610 },
        }
      },
      'X4': {
        'F26 - 2014-2018': {
          'xDrive20d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20', ecu:'Bosch EDC17C50', hp:190, nm:400, hp1:235, nm1:470 },
          'xDrive30d 258hp': { fuel:'Diesel', cc:2993, code:'N57D30A', ecu:'Bosch EDC17C56', hp:258, nm:560, hp1:310, nm1:650 },
          'xDrive35d 313hp': { fuel:'Diesel', cc:2993, code:'N57D30T1', ecu:'Bosch EDC17C56', hp:313, nm:630, hp1:370, nm1:720 },
          'xDrive20i 184hp': { fuel:'Gasoline', cc:1997, code:'N20B20A', ecu:'Bosch MEVD17.2.4', hp:184, nm:270, hp1:260, nm1:400 },
          'xDrive28i 245hp': { fuel:'Gasoline', cc:1997, code:'N20B20A', ecu:'Bosch MEVD17.2.4', hp:245, nm:350, hp1:290, nm1:420 },
          'xDrive35i 306hp': { fuel:'Gasoline', cc:2979, code:'N55B30', ecu:'Bosch MEVD17.2', hp:306, nm:400, hp1:360, nm1:500 },
          'M40i 360hp': { fuel:'Gasoline', cc:2979, code:'N55B30T0', ecu:'Bosch MEVD17.2.G', hp:360, nm:465, hp1:410, nm1:570 },
        },
        'G02 - 2018+': {
          'xDrive20d 190hp': { fuel:'Diesel', cc:1995, code:'B47D20B', ecu:'Bosch MD1CS001', hp:190, nm:400, hp1:240, nm1:480 },
          'xDrive30d 265hp': { fuel:'Diesel', cc:2993, code:'B57D30A', ecu:'Bosch MD1CS001', hp:265, nm:620, hp1:320, nm1:700 },
          'M40d 326hp': { fuel:'Diesel', cc:2993, code:'B57D30T0', ecu:'Bosch MD1CS001', hp:326, nm:680, hp1:380, nm1:780 },
          'M40d 340hp': { fuel:'Diesel', cc:2993, code:'B57D30T2', ecu:'Bosch MD1CS001', hp:340, nm:700, hp1:400, nm1:800 },
          'xDrive20i 184hp': { fuel:'Gasoline', cc:1998, code:'B48B20A', ecu:'Bosch MG1CS003', hp:184, nm:290, hp1:260, nm1:420 },
          'xDrive30i 252hp': { fuel:'Gasoline', cc:1998, code:'B48B20B', ecu:'Bosch MG1CS003', hp:252, nm:350, hp1:310, nm1:460 },
          'M40i 354hp': { fuel:'Gasoline', cc:2998, code:'B58B30M0', ecu:'Bosch MG1CS003', hp:354, nm:500, hp1:420, nm1:600 },
          'M40i 360hp': { fuel:'Gasoline', cc:2998, code:'B58B30O1', ecu:'Bosch MG1CS201', hp:360, nm:500, hp1:430, nm1:610 },
          'X4 M 480hp': { fuel:'Gasoline', cc:2993, code:'S58B30A', ecu:'Bosch MG1CS024', hp:480, nm:600, hp1:570, nm1:750 },
          'X4 M Competition 510hp': { fuel:'Gasoline', cc:2993, code:'S58B30A', ecu:'Bosch MG1CS024', hp:510, nm:600, hp1:600, nm1:780 },
        }
      },
      'X5': {
        'E70 - 2006-2013': {
          '3.0d 235hp': { fuel:'Diesel', cc:2993, code:'M57D30TU2', ecu:'Bosch DDE6', hp:235, nm:520, hp1:285, nm1:610 },
          '3.0sd 286hp': { fuel:'Diesel', cc:2993, code:'M57D30TUP2', ecu:'Bosch DDE626', hp:286, nm:580, hp1:340, nm1:680 },
          'xDrive30d 245hp': { fuel:'Diesel', cc:2993, code:'N57D30A', ecu:'Bosch EDC17C41', hp:245, nm:540, hp1:300, nm1:640 },
          'xDrive40d 306hp': { fuel:'Diesel', cc:2993, code:'N57D30B', ecu:'Bosch EDC17C41', hp:306, nm:600, hp1:360, nm1:700 },
        },
        'F15 - 2013-2018': {
          'sDrive25d 218hp': { fuel:'Diesel', cc:1995, code:'N47D20D', ecu:'Bosch EDC17C50', hp:218, nm:450, hp1:260, nm1:520 },
          'xDrive30d 258hp': { fuel:'Diesel', cc:2993, code:'N57D30A', ecu:'Bosch EDC17C56', hp:258, nm:560, hp1:310, nm1:650 },
          'xDrive40d 313hp': { fuel:'Diesel', cc:2993, code:'N57D30T1', ecu:'Bosch EDC17C56', hp:313, nm:630, hp1:370, nm1:720 },
          'M50d 381hp': { fuel:'Diesel', cc:2993, code:'N57D30S1', ecu:'Bosch EDC17C56', hp:381, nm:740, hp1:430, nm1:840 },
        },
        'G05 - 2018+': {
          'xDrive30d 265hp': { fuel:'Diesel', cc:2993, code:'B57D30A', ecu:'Bosch MD1CS001', hp:265, nm:620, hp1:320, nm1:700 },
          'xDrive40d 340hp': { fuel:'Diesel', cc:2993, code:'B57D30T0', ecu:'Bosch MD1CS001', hp:340, nm:700, hp1:400, nm1:800 },
          'M50d 400hp': { fuel:'Diesel', cc:2993, code:'B57D30C', ecu:'Bosch MD1CS001', hp:400, nm:760, hp1:460, nm1:860 },
          'xDrive40i 340hp': { fuel:'Gasoline', cc:2998, code:'B58B30M1', ecu:'Bosch MG1CS201', hp:340, nm:450, hp1:420, nm1:580 },
          'M50i 530hp': { fuel:'Gasoline', cc:4395, code:'N63B44D', ecu:'Bosch MG1CS024', hp:530, nm:750, hp1:620, nm1:880 },
        }
      },
      'X6': {
        'E71 - 2008-2014': {
          'xDrive30d 235hp': { fuel:'Diesel', cc:2993, code:'M57D30TU2', ecu:'Bosch DDE6', hp:235, nm:520, hp1:285, nm1:610 },
          'xDrive30d 245hp': { fuel:'Diesel', cc:2993, code:'N57D30A', ecu:'Bosch EDC17C41', hp:245, nm:540, hp1:300, nm1:640 },
          'xDrive35d 286hp': { fuel:'Diesel', cc:2993, code:'M57D30TUP2', ecu:'Bosch DDE626', hp:286, nm:580, hp1:340, nm1:680 },
          'xDrive40d 306hp': { fuel:'Diesel', cc:2993, code:'N57D30B', ecu:'Bosch EDC17C41', hp:306, nm:600, hp1:360, nm1:700 },
          'M50d 381hp': { fuel:'Diesel', cc:2993, code:'N57D30S1', ecu:'Bosch EDC17C56', hp:381, nm:740, hp1:430, nm1:840 },
          'xDrive35i 306hp': { fuel:'Gasoline', cc:2979, code:'N54B30', ecu:'Siemens MSD80', hp:306, nm:400, hp1:360, nm1:500 },
          'xDrive50i 407hp': { fuel:'Gasoline', cc:4395, code:'N63B44A', ecu:'Bosch MSD85', hp:407, nm:600, hp1:490, nm1:720 },
        },
        'F16 - 2014-2019': {
          'xDrive30d 258hp': { fuel:'Diesel', cc:2993, code:'N57D30A', ecu:'Bosch EDC17C56', hp:258, nm:560, hp1:310, nm1:650 },
          'xDrive40d 313hp': { fuel:'Diesel', cc:2993, code:'N57D30T1', ecu:'Bosch EDC17C56', hp:313, nm:630, hp1:370, nm1:720 },
          'M50d 381hp': { fuel:'Diesel', cc:2993, code:'N57D30S1', ecu:'Bosch EDC17C56', hp:381, nm:740, hp1:430, nm1:840 },
          'xDrive35i 306hp': { fuel:'Gasoline', cc:2979, code:'N55B30', ecu:'Bosch MEVD17.2.6', hp:306, nm:400, hp1:365, nm1:500 },
          'xDrive50i 450hp': { fuel:'Gasoline', cc:4395, code:'N63B44B', ecu:'Bosch MEVD17.2.8', hp:450, nm:650, hp1:520, nm1:780 },
        },
        'G06 - 2019+': {
          'xDrive30d 265hp': { fuel:'Diesel', cc:2993, code:'B57D30A', ecu:'Bosch MD1CS001', hp:265, nm:620, hp1:320, nm1:700 },
          'xDrive40d 340hp': { fuel:'Diesel', cc:2993, code:'B57D30T0', ecu:'Bosch MD1CS001', hp:340, nm:700, hp1:400, nm1:800 },
          'M50d 400hp': { fuel:'Diesel', cc:2993, code:'B57D30C', ecu:'Bosch MD1CS001', hp:400, nm:760, hp1:460, nm1:860 },
          'xDrive40i 340hp': { fuel:'Gasoline', cc:2998, code:'B58B30M1', ecu:'Bosch MG1CS201', hp:340, nm:450, hp1:420, nm1:580 },
          'M50i 530hp': { fuel:'Gasoline', cc:4395, code:'N63B44D', ecu:'Bosch MG1CS024', hp:530, nm:750, hp1:620, nm1:880 },
        }
      },
      'X7': {
        'G07 - 2019+': {
          'xDrive30d 265hp': { fuel:'Diesel', cc:2993, code:'B57D30A', ecu:'Bosch MD1CS001', hp:265, nm:620, hp1:320, nm1:700 },
          'xDrive40d 340hp': { fuel:'Diesel', cc:2993, code:'B57D30T0', ecu:'Bosch MD1CS001', hp:340, nm:700, hp1:400, nm1:800 },
          'M50d 400hp': { fuel:'Diesel', cc:2993, code:'B57D30C', ecu:'Bosch MD1CS001', hp:400, nm:760, hp1:460, nm1:860 },
          'xDrive40i 340hp': { fuel:'Gasoline', cc:2998, code:'B58B30M1', ecu:'Bosch MG1CS201', hp:340, nm:450, hp1:420, nm1:580 },
          'M50i 530hp': { fuel:'Gasoline', cc:4395, code:'N63B44D', ecu:'Bosch MG1CS024', hp:530, nm:750, hp1:620, nm1:880 }
        }
      },
      'Z4': {
        'E89 - 2009-2016': {
          'sDrive20i 184hp': { fuel:'Gasoline', cc:1997, code:'N20B20', ecu:'Bosch MEVD17.2.4', hp:184, nm:270, hp1:260, nm1:400 },
          'sDrive28i 245hp': { fuel:'Gasoline', cc:1997, code:'N20B20', ecu:'Bosch MEVD17.2.4', hp:245, nm:350, hp1:295, nm1:420 },
          'sDrive35i 306hp': { fuel:'Gasoline', cc:2979, code:'N54B30', ecu:'Siemens MSD81', hp:306, nm:400, hp1:360, nm1:500 },
          'sDrive35is 340hp': { fuel:'Gasoline', cc:2979, code:'N54B30', ecu:'Siemens MSD81', hp:340, nm:450, hp1:400, nm1:540 },
        },
        'G29 - 2018+': {
          'sDrive20i 197hp': { fuel:'Gasoline', cc:1998, code:'B48B20A', ecu:'Bosch MG1CS003', hp:197, nm:320, hp1:260, nm1:420 },
          'sDrive30i 258hp': { fuel:'Gasoline', cc:1998, code:'B48B20B', ecu:'Bosch MG1CS003', hp:258, nm:400, hp1:310, nm1:480 },
          'M40i 340hp': { fuel:'Gasoline', cc:2998, code:'B58B30M1', ecu:'Bosch MG1CS201', hp:340, nm:500, hp1:420, nm1:600 },
        }
      },
      'M2': {
        'F87 - 2016-2021': {
          '3.0 N55 M2 370hp': { fuel:'Gasoline', cc:2979, code:'N55B30T0', ecu:'Bosch MEVD17.2.G', hp:370, nm:465, hp1:430, nm1:580 },
          '3.0 S55 M2 Competition 410hp': { fuel:'Gasoline', cc:2979, code:'S55B30', ecu:'Bosch MEVD17.2.G', hp:410, nm:550, hp1:520, nm1:700 },
          '3.0 S55 M2 CS 450hp': { fuel:'Gasoline', cc:2979, code:'S55B30', ecu:'Bosch MEVD17.2.G', hp:450, nm:550, hp1:530, nm1:700 },
        },
        'G87 - 2023+': {
          '3.0 S58 M2 460hp': { fuel:'Gasoline', cc:2993, code:'S58B30A', ecu:'Bosch MG1CS024', hp:460, nm:550, hp1:550, nm1:750 },
        }
      },
      'M3': {
        'E46 - 2000-2006': {
          '3.2 S54 M3 343hp': { fuel:'Gasoline', cc:3246, code:'S54B32', ecu:'Siemens MSS54', hp:343, nm:365, hp1:360, nm1:390 },
        },
        'E90/E92/E93 - 2007-2013': {
          '4.0 S65 M3 420hp': { fuel:'Gasoline', cc:3999, code:'S65B40', ecu:'Siemens MSS60', hp:420, nm:400, hp1:445, nm1:425 },
        },
        'F80 - 2014-2018': {
          '3.0 S55 M3 431hp': { fuel:'Gasoline', cc:2979, code:'S55B30', ecu:'Bosch MEVD17.2.G', hp:431, nm:550, hp1:520, nm1:700 },
          '3.0 S55 M3 Competition 450hp': { fuel:'Gasoline', cc:2979, code:'S55B30', ecu:'Bosch MEVD17.2.G', hp:450, nm:550, hp1:530, nm1:700 },
          '3.0 S55 M3 CS 460hp': { fuel:'Gasoline', cc:2979, code:'S55B30', ecu:'Bosch MEVD17.2.G', hp:460, nm:600, hp1:540, nm1:720 },
        },
        'G80 - 2021+': {
          '3.0 S58 M3 480hp': { fuel:'Gasoline', cc:2993, code:'S58B30A', ecu:'Bosch MG1CS024', hp:480, nm:550, hp1:580, nm1:750 },
          '3.0 S58 M3 Competition 510hp': { fuel:'Gasoline', cc:2993, code:'S58B30A', ecu:'Bosch MG1CS024', hp:510, nm:650, hp1:620, nm1:800 },
          '3.0 S58 M3 CS 550hp': { fuel:'Gasoline', cc:2993, code:'S58B30A', ecu:'Bosch MG1CS024', hp:550, nm:650, hp1:650, nm1:800 },
        }
      },
      'M4': {
        'F82/F83 - 2014-2020': {
          '3.0 S55 M4 431hp': { fuel:'Gasoline', cc:2979, code:'S55B30', ecu:'Bosch MEVD17.2.G', hp:431, nm:550, hp1:520, nm1:700 },
          '3.0 S55 M4 Competition 450hp': { fuel:'Gasoline', cc:2979, code:'S55B30', ecu:'Bosch MEVD17.2.G', hp:450, nm:550, hp1:530, nm1:700 },
          '3.0 S55 M4 CS 460hp': { fuel:'Gasoline', cc:2979, code:'S55B30', ecu:'Bosch MEVD17.2.G', hp:460, nm:600, hp1:540, nm1:720 },
          '3.0 S55 M4 GTS 500hp': { fuel:'Gasoline', cc:2979, code:'S55B30', ecu:'Bosch MEVD17.2.G', hp:500, nm:600, hp1:560, nm1:740 },
        },
        'G82/G83 - 2021+': {
          '3.0 S58 M4 480hp': { fuel:'Gasoline', cc:2993, code:'S58B30A', ecu:'Bosch MG1CS024', hp:480, nm:550, hp1:580, nm1:750 },
          '3.0 S58 M4 Competition 510hp': { fuel:'Gasoline', cc:2993, code:'S58B30A', ecu:'Bosch MG1CS024', hp:510, nm:650, hp1:620, nm1:800 },
          '3.0 S58 M4 CSL 550hp': { fuel:'Gasoline', cc:2993, code:'S58B30A', ecu:'Bosch MG1CS024', hp:550, nm:650, hp1:650, nm1:800 },
        }
      },
      'M5': {
        'E60/E61 - 2005-2010': {
          '5.0 S85 M5 507hp': { fuel:'Gasoline', cc:4999, code:'S85B50', ecu:'Siemens MS45', hp:507, nm:520, hp1:530, nm1:550 },
        },
        'F10 - 2011-2017': {
          '4.4 S63 M5 560hp': { fuel:'Gasoline', cc:4395, code:'S63B44B', ecu:'Bosch MEVD17.2.8', hp:560, nm:680, hp1:680, nm1:850 },
          '4.4 S63 M5 Competition 575hp': { fuel:'Gasoline', cc:4395, code:'S63B44B', ecu:'Bosch MEVD17.2.8', hp:575, nm:680, hp1:690, nm1:850 },
          '4.4 S63 M5 30 Jahre 600hp': { fuel:'Gasoline', cc:4395, code:'S63B44B', ecu:'Bosch MEVD17.2.8', hp:600, nm:700, hp1:700, nm1:870 },
        },
        'F90 - 2017-2023': {
          '4.4 S63 M5 600hp': { fuel:'Gasoline', cc:4395, code:'S63B44T4', ecu:'Bosch MG1CS003', hp:600, nm:750, hp1:720, nm1:900 },
          '4.4 S63 M5 Competition 625hp': { fuel:'Gasoline', cc:4395, code:'S63B44T4', ecu:'Bosch MG1CS003', hp:625, nm:750, hp1:740, nm1:920 },
          '4.4 S63 M5 CS 635hp': { fuel:'Gasoline', cc:4395, code:'S63B44T4', ecu:'Bosch MG1CS024', hp:635, nm:750, hp1:750, nm1:920 },
        }
      },
      'M6': {
        'E63/E64 - 2005-2010': {
          '5.0 S85 M6 507hp': { fuel:'Gasoline', cc:4999, code:'S85B50', ecu:'Siemens MS45', hp:507, nm:520, hp1:530, nm1:550 },
        },
        'F12/F13/F06 - 2012-2018': {
          '4.4 S63 M6 560hp': { fuel:'Gasoline', cc:4395, code:'S63B44B', ecu:'Bosch MEVD17.2.8', hp:560, nm:680, hp1:680, nm1:850 },
          '4.4 S63 M6 Competition 600hp': { fuel:'Gasoline', cc:4395, code:'S63B44B', ecu:'Bosch MEVD17.2.8', hp:600, nm:700, hp1:700, nm1:870 },
        }
      },
      'X5 M / X6 M': {
        'E70/E71 - 2009-2013': {
          '4.4 S63 X5 M 555hp': { fuel:'Gasoline', cc:4395, code:'S63B44A', ecu:'Bosch MSD85', hp:555, nm:680, hp1:650, nm1:830 },
        },
        'F85/F86 - 2015-2018': {
          '4.4 S63 X5 M 575hp': { fuel:'Gasoline', cc:4395, code:'S63B44B', ecu:'Bosch MEVD17.2.8', hp:575, nm:750, hp1:680, nm1:900 },
        },
        'F95/F96 - 2020+': {
          '4.4 S63 X5 M Competition 625hp': { fuel:'Gasoline', cc:4395, code:'S63B44T4', ecu:'Bosch MG1CS024', hp:625, nm:750, hp1:740, nm1:930 },
        }
      }
    },
    Mercedes: {
      'A-Class': {
        'W176 - 2012-2018': {
          'A180 CDI 109hp': { fuel:'Diesel', cc:1461, code:'OM607', ecu:'Bosch EDC17C43', hp:109, nm:260, hp1:135, nm1:310 },
          'A200 CDI 136hp': { fuel:'Diesel', cc:1796, code:'OM651', ecu:'Delphi CRD3', hp:136, nm:300, hp1:170, nm1:380 },
          'A220 CDI 170hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3', hp:170, nm:350, hp1:210, nm1:430 },
          'A180 122hp': { fuel:'Gasoline', cc:1595, code:'M270', ecu:'Bosch MED17.7.2', hp:122, nm:200, hp1:165, nm1:280 },
          'A200 156hp': { fuel:'Gasoline', cc:1595, code:'M270', ecu:'Bosch MED17.7.2', hp:156, nm:250, hp1:175, nm1:300 },
          'A250 211hp': { fuel:'Gasoline', cc:1991, code:'M270', ecu:'Bosch MED17.7.2', hp:211, nm:350, hp1:250, nm1:420 },
          'A45 AMG 360hp': { fuel:'Gasoline', cc:1991, code:'M133', ecu:'Bosch MED17.7.5', hp:360, nm:450, hp1:400, nm1:530 },
          'A45 AMG 381hp': { fuel:'Gasoline', cc:1991, code:'M133', ecu:'Bosch MED17.7.5', hp:381, nm:475, hp1:420, nm1:560 },
        },
        'W177 - 2018+': {
          'A180d 116hp': { fuel:'Diesel', cc:1461, code:'OM608', ecu:'Bosch MD1CS006', hp:116, nm:260, hp1:150, nm1:330 },
          'A200d 150hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:150, nm:320, hp1:195, nm1:400 },
          'A220d 190hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:190, nm:400, hp1:230, nm1:480 },
          'A180 136hp': { fuel:'Gasoline', cc:1332, code:'M282', ecu:'Bosch MG1CS006', hp:136, nm:200, hp1:165, nm1:250 },
          'A200 163hp': { fuel:'Gasoline', cc:1332, code:'M282', ecu:'Bosch MG1CS006', hp:163, nm:250, hp1:190, nm1:300 },
          'A250 224hp': { fuel:'Gasoline', cc:1991, code:'M260', ecu:'Bosch MED17.7.7', hp:224, nm:350, hp1:280, nm1:430 },
          'A35 AMG 306hp': { fuel:'Gasoline', cc:1991, code:'M260', ecu:'Bosch MED17.7.7', hp:306, nm:400, hp1:365, nm1:480 },
          'A45 AMG 387hp': { fuel:'Gasoline', cc:1991, code:'M139', ecu:'Bosch CPC', hp:387, nm:480, hp1:430, nm1:560 },
          'A45 S AMG 421hp': { fuel:'Gasoline', cc:1991, code:'M139', ecu:'Bosch CPC', hp:421, nm:500, hp1:460, nm1:600 },
        }
      },
      'B-Class': {
        'W246 - 2011-2019': {
          'B180 CDI 109hp': { fuel:'Diesel', cc:1461, code:'OM607', ecu:'Bosch EDC17C43', hp:109, nm:260, hp1:135, nm1:310 },
          'B200 CDI 136hp': { fuel:'Diesel', cc:1796, code:'OM651', ecu:'Delphi CRD3', hp:136, nm:300, hp1:170, nm1:380 },
          'B220 CDI 170hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3', hp:170, nm:350, hp1:210, nm1:430 },
        }
      },
      'C-Class': {
        'W204 - 2007-2014': {
          'C200 CDI 136hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD2', hp:136, nm:360, hp1:170, nm1:420 },
          'C220 CDI 170hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD2', hp:170, nm:400, hp1:210, nm1:480 },
          'C250 CDI 204hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD2', hp:204, nm:500, hp1:240, nm1:580 },
          'C320 CDI 224hp': { fuel:'Diesel', cc:2987, code:'OM642', ecu:'Bosch EDC16CP31', hp:224, nm:510, hp1:270, nm1:600 },
          'C350 CDI 265hp': { fuel:'Diesel', cc:2987, code:'OM642', ecu:'Bosch EDC17CP46', hp:265, nm:620, hp1:310, nm1:700 },
        },
        'W205 - 2014-2021': {
          'C180 BlueTEC 116hp': { fuel:'Diesel', cc:1598, code:'OM626', ecu:'Delphi CRD3', hp:116, nm:280, hp1:150, nm1:340 },
          'C200d 160hp': { fuel:'Diesel', cc:1598, code:'OM626', ecu:'Delphi CRD3.60', hp:160, nm:360, hp1:200, nm1:430 },
          'C220d 170hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3', hp:170, nm:400, hp1:215, nm1:480 },
          'C220d 194hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:194, nm:400, hp1:240, nm1:480 },
          'C250d 204hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3', hp:204, nm:500, hp1:245, nm1:580 },
          'C300d 245hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:245, nm:500, hp1:300, nm1:600 },
          'C180 156hp': { fuel:'Gasoline', cc:1595, code:'M274', ecu:'Bosch MED17.7.2', hp:156, nm:250, hp1:185, nm1:310 },
          'C200 184hp': { fuel:'Gasoline', cc:1991, code:'M274', ecu:'Bosch MED17.7.2', hp:184, nm:300, hp1:220, nm1:370 },
          'C300 245hp': { fuel:'Gasoline', cc:1991, code:'M274', ecu:'Bosch MED17.7.2', hp:245, nm:370, hp1:290, nm1:440 },
          'C43 AMG 367hp': { fuel:'Gasoline', cc:2996, code:'M276', ecu:'Bosch MED17.7.3', hp:367, nm:520, hp1:420, nm1:600 },
          'C43 AMG 390hp': { fuel:'Gasoline', cc:2996, code:'M276', ecu:'Bosch MED17.7.3', hp:390, nm:520, hp1:440, nm1:600 },
          'C63 AMG 476hp': { fuel:'Gasoline', cc:3982, code:'M177', ecu:'Bosch MED17.7.5', hp:476, nm:650, hp1:580, nm1:800 },
          'C63 S AMG 510hp': { fuel:'Gasoline', cc:3982, code:'M177', ecu:'Bosch MED17.7.5', hp:510, nm:700, hp1:600, nm1:850 },
        },
        'W206 - 2021+': {
          'C200d 163hp': { fuel:'Diesel', cc:1993, code:'OM654M', ecu:'Bosch MD1CP001', hp:163, nm:380, hp1:200, nm1:440 },
          'C220d 200hp': { fuel:'Diesel', cc:1993, code:'OM654M', ecu:'Bosch MD1CP001', hp:200, nm:440, hp1:240, nm1:510 },
          'C300d 265hp': { fuel:'Diesel', cc:1993, code:'OM654M', ecu:'Bosch MD1CP001', hp:265, nm:550, hp1:310, nm1:630 },
          'C200 204hp': { fuel:'Gasoline', cc:1496, code:'M254', ecu:'Bosch MG1CP002', hp:204, nm:300, hp1:240, nm1:370 },
          'C300 258hp': { fuel:'Gasoline', cc:1999, code:'M254', ecu:'Bosch MG1CP002', hp:258, nm:400, hp1:300, nm1:480 },
        }
      },
      'E-Class': {
        'W212 - 2009-2016': {
          'E200 CDI 136hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD2', hp:136, nm:360, hp1:170, nm1:420 },
          'E220 CDI 170hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD2', hp:170, nm:400, hp1:210, nm1:480 },
          'E250 CDI 204hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD2', hp:204, nm:500, hp1:240, nm1:580 },
          'E350 CDI 231hp': { fuel:'Diesel', cc:2987, code:'OM642', ecu:'Bosch EDC17CP46', hp:231, nm:540, hp1:280, nm1:620 },
          'E350 CDI 265hp': { fuel:'Diesel', cc:2987, code:'OM642', ecu:'Bosch EDC17CP46', hp:265, nm:620, hp1:310, nm1:700 },
        },
        'W213 - 2016-2023': {
          'E200d 150hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:150, nm:360, hp1:195, nm1:440 },
          'E220d 194hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:194, nm:400, hp1:240, nm1:480 },
          'E300d 245hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:245, nm:500, hp1:300, nm1:600 },
          'E350d 258hp': { fuel:'Diesel', cc:2987, code:'OM642', ecu:'Bosch EDC17CP60', hp:258, nm:620, hp1:310, nm1:720 },
          'E400d 340hp': { fuel:'Diesel', cc:2925, code:'OM656', ecu:'Bosch MD1CP001', hp:340, nm:700, hp1:400, nm1:800 },
          'E43 AMG 401hp': { fuel:'Gasoline', cc:2996, code:'M276', ecu:'Bosch MED17.7.3.1', hp:401, nm:520, hp1:450, nm1:600 },
          'E53 AMG 435hp': { fuel:'Gasoline', cc:2999, code:'M256', ecu:'Bosch MG1CP002', hp:435, nm:520, hp1:490, nm1:620 },
          'E63 AMG 571hp': { fuel:'Gasoline', cc:3982, code:'M177', ecu:'Bosch MED17.7.5', hp:571, nm:750, hp1:680, nm1:950 },
          'E63 S AMG 612hp': { fuel:'Gasoline', cc:3982, code:'M177', ecu:'Bosch MED17.7.5', hp:612, nm:850, hp1:700, nm1:1050 },
        }
      },
      'S-Class': {
        'W221 - 2005-2013': {
          'S320 CDI 235hp': { fuel:'Diesel', cc:2987, code:'OM642', ecu:'Bosch EDC16CP31', hp:235, nm:540, hp1:280, nm1:620 },
          'S350 BlueTEC 258hp': { fuel:'Diesel', cc:2987, code:'OM642', ecu:'Bosch EDC17CP46', hp:258, nm:620, hp1:310, nm1:700 },
        },
        'W222 - 2013-2020': {
          'S350d 258hp': { fuel:'Diesel', cc:2987, code:'OM642', ecu:'Bosch EDC17CP60', hp:258, nm:620, hp1:310, nm1:720 },
          'S350d 286hp': { fuel:'Diesel', cc:2925, code:'OM656', ecu:'Bosch MD1CP001', hp:286, nm:600, hp1:340, nm1:720 },
          'S400d 340hp': { fuel:'Diesel', cc:2925, code:'OM656', ecu:'Bosch MD1CP001', hp:340, nm:700, hp1:400, nm1:820 },
          'S500 455hp': { fuel:'Gasoline', cc:4663, code:'M278', ecu:'Bosch MED17.7.8', hp:455, nm:700, hp1:530, nm1:820 },
          'S63 AMG 585hp': { fuel:'Gasoline', cc:5461, code:'M157', ecu:'Bosch MED17.7.8', hp:585, nm:900, hp1:660, nm1:1050 },
          'S63 AMG 612hp': { fuel:'Gasoline', cc:3982, code:'M177', ecu:'Bosch MED17.7.5', hp:612, nm:900, hp1:700, nm1:1080 },
        }
      },
      'CLA': {
        'C117 - 2013-2019': {
          'CLA 180d 109hp': { fuel:'Diesel', cc:1461, code:'OM607', ecu:'Bosch EDC17C43', hp:109, nm:260, hp1:135, nm1:310 },
          'CLA 200d 136hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3', hp:136, nm:300, hp1:170, nm1:380 },
          'CLA 220d 177hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3', hp:177, nm:350, hp1:215, nm1:430 },
          'CLA 200 156hp': { fuel:'Gasoline', cc:1595, code:'M270', ecu:'Bosch MED17.7.2', hp:156, nm:250, hp1:175, nm1:300 },
          'CLA 250 211hp': { fuel:'Gasoline', cc:1991, code:'M270', ecu:'Bosch MED17.7.2', hp:211, nm:350, hp1:250, nm1:420 },
          'CLA 45 AMG 360hp': { fuel:'Gasoline', cc:1991, code:'M133', ecu:'Bosch MED17.7.5', hp:360, nm:450, hp1:400, nm1:530 },
        },
        'C118 - 2019+': {
          'CLA 180d 116hp': { fuel:'Diesel', cc:1461, code:'OM608', ecu:'Bosch MD1CS006', hp:116, nm:260, hp1:150, nm1:330 },
          'CLA 200d 150hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:150, nm:320, hp1:195, nm1:400 },
          'CLA 220d 190hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:190, nm:400, hp1:230, nm1:480 },
          'CLA 200 163hp': { fuel:'Gasoline', cc:1332, code:'M282', ecu:'Bosch MG1CS006', hp:163, nm:250, hp1:190, nm1:300 },
          'CLA 250 224hp': { fuel:'Gasoline', cc:1991, code:'M260', ecu:'Bosch MED17.7.7', hp:224, nm:350, hp1:280, nm1:430 },
          'CLA 35 AMG 306hp': { fuel:'Gasoline', cc:1991, code:'M260', ecu:'Bosch MED17.7.7', hp:306, nm:400, hp1:365, nm1:480 },
          'CLA 45 S AMG 421hp': { fuel:'Gasoline', cc:1991, code:'M139', ecu:'Bosch CPC', hp:421, nm:500, hp1:460, nm1:600 },
        }
      },
      'CLS': {
        'W218 - 2011-2018': {
          'CLS 250 CDI 204hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3', hp:204, nm:500, hp1:240, nm1:580 },
          'CLS 350 CDI 265hp': { fuel:'Diesel', cc:2987, code:'OM642', ecu:'Bosch EDC17CP46', hp:265, nm:620, hp1:310, nm1:700 }
        },
        'C257 - 2018+': {
          'CLS 300d 245hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:245, nm:500, hp1:300, nm1:600 },
          'CLS 350d 286hp': { fuel:'Diesel', cc:2925, code:'OM656', ecu:'Bosch MD1CP001', hp:286, nm:600, hp1:340, nm1:720 },
          'CLS 400d 340hp': { fuel:'Diesel', cc:2925, code:'OM656', ecu:'Bosch MD1CP001', hp:340, nm:700, hp1:400, nm1:800 }
        }
      },
      'GLA': {
        'X156 - 2013-2020': {
          'GLA 200d 136hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3', hp:136, nm:300, hp1:170, nm1:380 },
          'GLA 220d 177hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3', hp:177, nm:350, hp1:215, nm1:430 },
          'GLA 200 156hp': { fuel:'Gasoline', cc:1595, code:'M270', ecu:'Bosch MED17.7.2', hp:156, nm:250, hp1:175, nm1:300 },
          'GLA 250 211hp': { fuel:'Gasoline', cc:1991, code:'M270', ecu:'Bosch MED17.7.2', hp:211, nm:350, hp1:250, nm1:420 },
          'GLA 45 AMG 381hp': { fuel:'Gasoline', cc:1991, code:'M133', ecu:'Bosch MED17.7.5', hp:381, nm:475, hp1:420, nm1:560 },
        }
      },
      'GLB': {
        'X247 - 2019+': {
          'GLB 180d 116hp': { fuel:'Diesel', cc:1461, code:'OM608', ecu:'Bosch MD1CS006', hp:116, nm:260, hp1:150, nm1:330 },
          'GLB 200d 150hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:150, nm:320, hp1:195, nm1:400 },
          'GLB 220d 190hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:190, nm:400, hp1:230, nm1:480 },
          'GLB 200 163hp': { fuel:'Gasoline', cc:1332, code:'M282', ecu:'Bosch MG1CS006', hp:163, nm:250, hp1:190, nm1:300 },
          'GLB 250 224hp': { fuel:'Gasoline', cc:1991, code:'M260', ecu:'Bosch MED17.7.7', hp:224, nm:350, hp1:280, nm1:430 }
        }
      },
      'GLC': {
        'X253 - 2015-2022': {
          'GLC 220d 170hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3', hp:170, nm:400, hp1:215, nm1:480 },
          'GLC 220d 194hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:194, nm:400, hp1:240, nm1:480 },
          'GLC 250d 204hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3', hp:204, nm:500, hp1:245, nm1:580 },
          'GLC 300d 245hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:245, nm:500, hp1:300, nm1:600 },
          'GLC 350d 258hp': { fuel:'Diesel', cc:2987, code:'OM642', ecu:'Bosch EDC17CP60', hp:258, nm:620, hp1:310, nm1:720 },
          'GLC 43 AMG 367hp': { fuel:'Gasoline', cc:2996, code:'M276', ecu:'Bosch MED17.7.3', hp:367, nm:520, hp1:420, nm1:600 },
          'GLC 63 AMG 476hp': { fuel:'Gasoline', cc:3982, code:'M177', ecu:'Bosch MED17.7.5', hp:476, nm:650, hp1:580, nm1:800 },
          'GLC 63 S AMG 510hp': { fuel:'Gasoline', cc:3982, code:'M177', ecu:'Bosch MED17.7.5', hp:510, nm:700, hp1:600, nm1:850 },
        }
      },
      'GLC Coupe': {
        'C253 - 2016-2023': {
          'GLC 220d 170hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3', hp:170, nm:400, hp1:215, nm1:480 },
          'GLC 250d 204hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3', hp:204, nm:500, hp1:245, nm1:580 },
          'GLC 300d 245hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:245, nm:500, hp1:300, nm1:600 },
          'GLC 43 AMG 367hp': { fuel:'Gasoline', cc:2996, code:'M276', ecu:'Bosch MED17.7.3', hp:367, nm:520, hp1:420, nm1:600 },
          'GLC 63 AMG 476hp': { fuel:'Gasoline', cc:3982, code:'M177', ecu:'Bosch MED17.7.5', hp:476, nm:650, hp1:580, nm1:800 }
        }
      },
      'GLE': {
        'W166 - 2015-2019': {
          'GLE 250d 204hp': { fuel:'Diesel', cc:2143, code:'OM651', ecu:'Delphi CRD3', hp:204, nm:500, hp1:240, nm1:580 },
          'GLE 350d 258hp': { fuel:'Diesel', cc:2987, code:'OM642', ecu:'Bosch EDC17CP60', hp:258, nm:620, hp1:310, nm1:720 },
        },
        'V167 - 2019+': {
          'GLE 300d 245hp': { fuel:'Diesel', cc:1950, code:'OM654', ecu:'Bosch MD1CS006', hp:245, nm:500, hp1:300, nm1:600 },
          'GLE 350d 272hp': { fuel:'Diesel', cc:2925, code:'OM656', ecu:'Bosch MD1CP001', hp:272, nm:600, hp1:320, nm1:720 },
          'GLE 400d 330hp': { fuel:'Diesel', cc:2925, code:'OM656', ecu:'Bosch MD1CP001', hp:330, nm:700, hp1:390, nm1:800 },
        }
      },
      'GLS': {
        'X167 - 2019+': {
          'GLS 350d 286hp': { fuel:'Diesel', cc:2925, code:'OM656', ecu:'Bosch MD1CP001', hp:286, nm:600, hp1:340, nm1:720 },
          'GLS 400d 330hp': { fuel:'Diesel', cc:2925, code:'OM656', ecu:'Bosch MD1CP001', hp:330, nm:700, hp1:390, nm1:800 },
          'GLS 450 367hp': { fuel:'Gasoline', cc:2999, code:'M256', ecu:'Bosch MG1CP002', hp:367, nm:500, hp1:420, nm1:580 }
        }
      },
      'G-Class': {
        'W463 - 2018+': {
          'G350d 286hp': { fuel:'Diesel', cc:2925, code:'OM656', ecu:'Bosch MD1CP001', hp:286, nm:600, hp1:340, nm1:720 },
          'G400d 330hp': { fuel:'Diesel', cc:2925, code:'OM656', ecu:'Bosch MD1CP001', hp:330, nm:700, hp1:390, nm1:800 },
          'G500 422hp': { fuel:'Gasoline', cc:3982, code:'M176', ecu:'Bosch MED17.7.5', hp:422, nm:610, hp1:500, nm1:750 },
          'G63 AMG 585hp': { fuel:'Gasoline', cc:3982, code:'M177', ecu:'Bosch MED17.7.5', hp:585, nm:850, hp1:680, nm1:1000 },
        }
      },
      'AMG GT': {
        'C190 - 2015-2021': {
          'AMG GT 462hp': { fuel:'Gasoline', cc:3982, code:'M178', ecu:'Bosch MED17.7.5', hp:462, nm:600, hp1:550, nm1:750 },
          'AMG GT S 510hp': { fuel:'Gasoline', cc:3982, code:'M178', ecu:'Bosch MED17.7.5', hp:510, nm:650, hp1:590, nm1:800 },
          'AMG GT C 557hp': { fuel:'Gasoline', cc:3982, code:'M178', ecu:'Bosch MED17.7.5', hp:557, nm:680, hp1:620, nm1:820 },
          'AMG GT R 585hp': { fuel:'Gasoline', cc:3982, code:'M178', ecu:'Bosch MED17.7.5', hp:585, nm:700, hp1:650, nm1:850 },
        },
        'C192 - 2023+': {
          'AMG GT 53 476hp': { fuel:'Gasoline', cc:2999, code:'M256', ecu:'Bosch MG1CP002', hp:476, nm:520, hp1:530, nm1:620 },
          'AMG GT 63 585hp': { fuel:'Gasoline', cc:3982, code:'M177', ecu:'Bosch MG1CS008', hp:585, nm:800, hp1:680, nm1:950 },
        }
      }
    },
    Volkswagen: {
      Polo: {
        '6R/6C - 2009-2017': {
          '1.2 TSI 90hp': { fuel:'Gasoline', cc:1197, code:'CBZC', ecu:'Bosch MED17.5.21', hp:90, nm:160, hp1:130, nm1:210 },
          '1.2 TSI 110hp': { fuel:'Gasoline', cc:1197, code:'CBZB', ecu:'Bosch MED17.5.21', hp:110, nm:175, hp1:140, nm1:230 },
          '1.4 TDI 90hp': { fuel:'Diesel', cc:1422, code:'CYZA', ecu:'Delphi DCM6.2', hp:90, nm:230, hp1:120, nm1:280 },
          '1.6 TDI 90hp': { fuel:'Diesel', cc:1598, code:'CAYB', ecu:'Bosch PCR2.1', hp:90, nm:230, hp1:120, nm1:290 },
          '1.4 TSI BlueGT 150hp': { fuel:'Gasoline', cc:1395, code:'CPTA', ecu:'Bosch MED17.5.25', hp:150, nm:250, hp1:185, nm1:310 },
          '1.8 TSI GTI 192hp': { fuel:'Gasoline', cc:1798, code:'DAJA', ecu:'Siemens Simos 18.1', hp:192, nm:320, hp1:240, nm1:400 },
        },
        'AW - 2017+': {
          '1.0 TSI 95hp': { fuel:'Gasoline', cc:999, code:'CHZB', ecu:'Bosch Bosch MED17.5.21', hp:95, nm:175, hp1:120, nm1:210 },
          '1.0 TSI 115hp': { fuel:'Gasoline', cc:999, code:'CHZC', ecu:'Bosch Bosch MED17.5.21', hp:115, nm:200, hp1:140, nm1:240 },
          '1.5 TSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 },
          '2.0 TSI GTI 200hp': { fuel:'Gasoline', cc:1984, code:'CZPC', ecu:'Siemens Simos 18.10', hp:200, nm:320, hp1:250, nm1:400 },
          '2.0 TSI GTI 207hp': { fuel:'Gasoline', cc:1984, code:'DNNF', ecu:'Bosch MG1CS111', hp:207, nm:320, hp1:260, nm1:410 },
        }
      },
      Golf: {
        'MK5 - 2003-2009': {
          '1.9 TDI 105hp': { fuel:'Diesel', cc:1896, code:'BKC', ecu:'Bosch EDC16U1', hp:105, nm:250, hp1:140, nm1:320 },
          '2.0 TDI 140hp': { fuel:'Diesel', cc:1968, code:'BKD', ecu:'Bosch EDC16U31', hp:140, nm:320, hp1:180, nm1:400 },
          '2.0 TFSI GTI 200hp': { fuel:'Gasoline', cc:1984, code:'AXX', ecu:'Bosch MED9.1', hp:200, nm:280, hp1:245, nm1:370 },
          '2.0 TFSI Edition 30 230hp': { fuel:'Gasoline', cc:1984, code:'BYD', ecu:'Bosch MED9.1', hp:230, nm:300, hp1:300, nm1:400 },
        },
        'MK6 - 2008-2013': {
          '1.6 TDI 105hp': { fuel:'Diesel', cc:1598, code:'CAYC', ecu:'Bosch PCR2.1', hp:105, nm:250, hp1:140, nm1:310 },
          '2.0 TDI 140hp': { fuel:'Diesel', cc:1968, code:'CBAB', ecu:'Bosch EDC17CP14', hp:140, nm:320, hp1:180, nm1:400 },
          '2.0 TDI GTD 170hp': { fuel:'Diesel', cc:1968, code:'CBBB', ecu:'Bosch EDC17CP14', hp:170, nm:350, hp1:205, nm1:430 },
          '2.0 TSI GTI 211hp': { fuel:'Gasoline', cc:1984, code:'CCZB', ecu:'Bosch MED17.5', hp:211, nm:280, hp1:260, nm1:380 },
          '2.0 TSI R 270hp': { fuel:'Gasoline', cc:1984, code:'CDLF', ecu:'Bosch MED9.1', hp:270, nm:350, hp1:310, nm1:430 },
        },
        'MK7 - 2012-2020': {
          '1.4 TSI GTE (Hybrid) 204hp': { fuel:'Hybrid', cc:1395, code:'CUKB', ecu:'Bosch MED17.1.21', hp:204, nm:350, hp1:240, nm1:420 },
          '1.6 TDI 110hp': { fuel:'Diesel', cc:1598, code:'CLHA', ecu:'Bosch EDC17C64', hp:110, nm:250, hp1:145, nm1:320 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'CRLB', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI GTD 184hp': { fuel:'Diesel', cc:1968, code:'CUNA', ecu:'Bosch EDC17C74', hp:184, nm:380, hp1:225, nm1:460 },
          '2.0 TSI GTI 220hp': { fuel:'Gasoline', cc:1984, code:'CHHB', ecu:'Siemens Simos 18.1', hp:220, nm:350, hp1:300, nm1:440 },
          '2.0 TSI GTI Performance 230hp': { fuel:'Gasoline', cc:1984, code:'CHHB', ecu:'Siemens Simos 18.1', hp:230, nm:350, hp1:300, nm1:440 },
          '2.0 TSI GTI Performance 245hp': { fuel:'Gasoline', cc:1984, code:'DLBA', ecu:'Siemens Simos 18.10', hp:245, nm:370, hp1:300, nm1:450 },
          '2.0 TSI GTI Clubsport 265hp': { fuel:'Gasoline', cc:1984, code:'CJXE', ecu:'Siemens Simos 18.1', hp:265, nm:350, hp1:310, nm1:450 },
          '2.0 TSI GTI Clubsport S 310hp': { fuel:'Gasoline', cc:1984, code:'CJXG', ecu:'Siemens Simos 18.1', hp:310, nm:380, hp1:365, nm1:460 },
          '2.0 TSI GTI TCR 290hp': { fuel:'Gasoline', cc:1984, code:'DNUC', ecu:'Bosch MG1CS111', hp:290, nm:380, hp1:360, nm1:480 },
          '2.0 TSI R (Golf 7R) 300hp': { fuel:'Gasoline', cc:1984, code:'CJXC', ecu:'Siemens Simos 18.1', hp:300, nm:380, hp1:360, nm1:480 },
          '2.0 TSI R (Golf 7.5R) 310hp': { fuel:'Gasoline', cc:1984, code:'DJHA', ecu:'Siemens Simos 18.10', hp:310, nm:400, hp1:370, nm1:480 },
        },
        'MK8 - 2020+': {
          '1.4 TSI GTE (Hybrid) 245hp': { fuel:'Hybrid', cc:1395, code:'DGEA', ecu:'Bosch MG1CS011', hp:245, nm:400, hp1:285, nm1:470 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DTUA', ecu:'Bosch MD1CP004', hp:150, nm:360, hp1:195, nm1:440 },
          '2.0 TDI GTD 200hp': { fuel:'Diesel', cc:1968, code:'DTSB', ecu:'Bosch MD1CP004', hp:200, nm:400, hp1:240, nm1:480 },
          '2.0 TSI GTI 245hp': { fuel:'Gasoline', cc:1984, code:'DNUA', ecu:'Bosch MG1CS111', hp:245, nm:370, hp1:310, nm1:450 },
          '2.0 TSI GTI Clubsport 300hp': { fuel:'Gasoline', cc:1984, code:'DNUE', ecu:'Bosch MG1CS111', hp:300, nm:400, hp1:365, nm1:480 },
          '2.0 TSI R (Golf 8R) 320hp': { fuel:'Gasoline', cc:1984, code:'DNUE', ecu:'Bosch MG1CS111', hp:320, nm:420, hp1:385, nm1:500 },
          '2.0 TSI R 20 Years 333hp': { fuel:'Gasoline', cc:1984, code:'DNUE', ecu:'Bosch MG1CS111', hp:333, nm:420, hp1:390, nm1:500 },
        }
      },
      Arteon: {
        '2017+': {
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DFGA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DFHA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
          '2.0 TSI 190hp': { fuel:'Gasoline', cc:1984, code:'CZPA', ecu:'Siemens Simos 18.10', hp:190, nm:320, hp1:245, nm1:400 },
          '2.0 TSI 272hp': { fuel:'Gasoline', cc:1984, code:'DNUA', ecu:'Bosch MG1CS111', hp:272, nm:350, hp1:340, nm1:445 },
          '2.0 TSI R 320hp': { fuel:'Gasoline', cc:1984, code:'DNUE', ecu:'Bosch MG1CS111', hp:320, nm:420, hp1:380, nm1:500 }
        }
      },
      Passat: {
        'B6 - 2005-2010': {
          '1.9 TDI 105hp': { fuel:'Diesel', cc:1896, code:'BLS', ecu:'Bosch EDC16U34', hp:105, nm:250, hp1:140, nm1:320 },
          '2.0 TDI 140hp': { fuel:'Diesel', cc:1968, code:'BMP', ecu:'Bosch EDC16U34', hp:140, nm:320, hp1:180, nm1:400 },
          '2.0 TDI 170hp': { fuel:'Diesel', cc:1968, code:'BMR', ecu:'Siemens PPD1.2', hp:170, nm:350, hp1:205, nm1:420 },
        },
        'B7 - 2010-2014': {
          '1.6 TDI 105hp': { fuel:'Diesel', cc:1598, code:'CAYC', ecu:'Bosch PCR2.1', hp:105, nm:250, hp1:140, nm1:310 },
          '2.0 TDI 140hp': { fuel:'Diesel', cc:1968, code:'CFFB', ecu:'Bosch EDC17C46', hp:140, nm:320, hp1:180, nm1:400 },
          '2.0 TDI 177hp': { fuel:'Diesel', cc:1968, code:'CFGB', ecu:'Bosch EDC17C46', hp:177, nm:380, hp1:215, nm1:450 },
        },
        'B8 - 2014-2023': {
          '1.6 TDI 120hp': { fuel:'Diesel', cc:1598, code:'DCXA', ecu:'Bosch EDC17C64', hp:120, nm:250, hp1:150, nm1:320 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'CRLB', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DFHA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
          '2.0 TDI BiTDI 240hp': { fuel:'Diesel', cc:1968, code:'CUAA', ecu:'Bosch EDC17C74', hp:240, nm:500, hp1:290, nm1:590 },
          '2.0 TSI 220hp': { fuel:'Gasoline', cc:1984, code:'CHHB', ecu:'Siemens Simos 18.1', hp:220, nm:350, hp1:300, nm1:440 },
          '2.0 TSI 272hp': { fuel:'Gasoline', cc:1984, code:'DNUA', ecu:'Bosch MG1CS111', hp:272, nm:350, hp1:340, nm1:445 },
          '2.0 TSI 280hp': { fuel:'Gasoline', cc:1984, code:'CJXA', ecu:'Siemens Simos 18.10', hp:280, nm:350, hp1:350, nm1:440 },
        }
      },
      Tiguan: {
        'MK1 - 2007-2016': {
          '2.0 TDI 140hp': { fuel:'Diesel', cc:1968, code:'CBAB', ecu:'Bosch EDC17CP14', hp:140, nm:320, hp1:180, nm1:400 },
          '2.0 TDI 170hp': { fuel:'Diesel', cc:1968, code:'CBBB', ecu:'Bosch EDC17CP14', hp:170, nm:350, hp1:205, nm1:430 },
          '2.0 TSI 200hp': { fuel:'Gasoline', cc:1984, code:'CAWB', ecu:'Bosch MED17.5', hp:200, nm:280, hp1:250, nm1:370 },
        },
        'MK2 - 2016+': {
          '1.6 TDI 115hp': { fuel:'Diesel', cc:1598, code:'DGTE', ecu:'Bosch EDC17C64', hp:115, nm:280, hp1:145, nm1:340 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DFGA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TDI 190hp': { fuel:'Diesel', cc:1968, code:'DFHA', ecu:'Bosch EDC17C74', hp:190, nm:400, hp1:235, nm1:480 },
          '2.0 TDI BiTDI 240hp': { fuel:'Diesel', cc:1968, code:'CUAA', ecu:'Bosch EDC17C74', hp:240, nm:500, hp1:290, nm1:590 },
          '2.0 TSI 190hp': { fuel:'Gasoline', cc:1984, code:'CZPA', ecu:'Siemens Simos 18.10', hp:190, nm:320, hp1:245, nm1:400 },
          '2.0 TSI 220hp': { fuel:'Gasoline', cc:1984, code:'CHHB', ecu:'Siemens Simos 18.1', hp:220, nm:350, hp1:300, nm1:440 },
          '2.0 TSI R 320hp': { fuel:'Gasoline', cc:1984, code:'DNUE', ecu:'Bosch MG1CS111', hp:320, nm:420, hp1:380, nm1:500 },
        }
      },
      'T-Roc': {
        '2017+': {
          '1.0 TSI 115hp': { fuel:'Gasoline', cc:999, code:'CHZJ', ecu:'Bosch MED17.5.21', hp:115, nm:200, hp1:140, nm1:250 },
          '1.5 TSI 150hp': { fuel:'Gasoline', cc:1498, code:'DADA', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DFGA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 },
          '2.0 TSI 190hp': { fuel:'Gasoline', cc:1984, code:'CZPA', ecu:'Siemens Simos 18.10', hp:190, nm:320, hp1:245, nm1:400 },
          '2.0 TSI R 300hp': { fuel:'Gasoline', cc:1984, code:'DNUE', ecu:'Bosch MG1CS111', hp:300, nm:400, hp1:365, nm1:480 }
        }
      },
      'Touran': {
        '2015+': {
          '1.6 TDI 115hp': { fuel:'Diesel', cc:1598, code:'DDYA', ecu:'Bosch EDC17C74', hp:115, nm:250, hp1:145, nm1:320 },
          '2.0 TDI 150hp': { fuel:'Diesel', cc:1968, code:'DFGA', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:195, nm1:420 }
        }
      },
      Touareg: {
        '7P - 2010-2018': {
          '3.0 TDI V6 204hp': { fuel:'Diesel', cc:2967, code:'CASD', ecu:'Bosch EDC17CP44', hp:204, nm:450, hp1:260, nm1:550 },
          '3.0 TDI V6 245hp': { fuel:'Diesel', cc:2967, code:'CRCA', ecu:'Bosch EDC17CP44', hp:245, nm:550, hp1:300, nm1:650 },
          '3.0 TDI V6 262hp': { fuel:'Diesel', cc:2967, code:'CVVA', ecu:'Bosch EDC17CP54', hp:262, nm:580, hp1:310, nm1:680 },
          '4.2 TDI V8 340hp': { fuel:'Diesel', cc:4134, code:'CKDA', ecu:'Bosch EDC17CP44', hp:340, nm:800, hp1:400, nm1:920 },
        },
        'CR - 2018+': {
          '3.0 TDI V6 231hp': { fuel:'Diesel', cc:2967, code:'DPCA', ecu:'Bosch MD1CP004', hp:231, nm:500, hp1:290, nm1:600 },
          '3.0 TDI V6 286hp': { fuel:'Diesel', cc:2967, code:'DCPC', ecu:'Bosch MD1CP004', hp:286, nm:600, hp1:340, nm1:700 },
          '3.0 TSI V6 340hp': { fuel:'Gasoline', cc:2995, code:'DCBE', ecu:'Bosch MG1CS002', hp:340, nm:500, hp1:420, nm1:600 },
          '4.0 TDI V8 421hp': { fuel:'Diesel', cc:3956, code:'DMKB', ecu:'Bosch MD1CP004', hp:421, nm:900, hp1:500, nm1:1050 },
        }
      },
      Scirocco: {
        'MK3 - 2008-2017': {
          '2.0 TDI 140hp': { fuel:'Diesel', cc:1968, code:'CBAB', ecu:'Bosch EDC17CP14', hp:140, nm:320, hp1:180, nm1:400 },
          '2.0 TDI 170hp': { fuel:'Diesel', cc:1968, code:'CBBB', ecu:'Bosch EDC17CP14', hp:170, nm:350, hp1:205, nm1:430 },
          '2.0 TSI 200hp': { fuel:'Gasoline', cc:1984, code:'CAWB', ecu:'Bosch MED17.5', hp:200, nm:280, hp1:250, nm1:370 },
          '2.0 TSI 211hp': { fuel:'Gasoline', cc:1984, code:'CCZB', ecu:'Bosch MED17.5', hp:211, nm:280, hp1:260, nm1:380 },
          '2.0 TSI R 265hp': { fuel:'Gasoline', cc:1984, code:'CDLA', ecu:'Bosch MED9.1', hp:265, nm:350, hp1:310, nm1:430 },
          '2.0 TSI R 280hp': { fuel:'Gasoline', cc:1984, code:'CDLK', ecu:'Siemens Simos 18.1', hp:280, nm:350, hp1:330, nm1:450 },
        }
      },
    },
    Renault: {
      Clio: {
        'MK4 - 2012-2019': {
          '0.9 TCe 90hp': { fuel:'Gasoline', cc:898, code:'H4Bt', ecu:'Bosch ME17.9.20', hp:90, nm:135, hp1:110, nm1:175 },
          '1.2 TCe 120hp': { fuel:'Gasoline', cc:1197, code:'H5F', ecu:'Continental EMS3120', hp:120, nm:190, hp1:145, nm1:240 },
          '1.5 dCi 90hp': { fuel:'Diesel', cc:1461, code:'K9K', ecu:'Bosch EDC17C42', hp:90, nm:220, hp1:115, nm1:270 },
          '1.5 dCi 110hp': { fuel:'Diesel', cc:1461, code:'K9K', ecu:'Bosch EDC17C42', hp:110, nm:260, hp1:130, nm1:320 },
          '1.6 TCe RS 200hp': { fuel:'Gasoline', cc:1618, code:'M5M', ecu:'Continental EMS3125', hp:200, nm:240, hp1:230, nm1:300 },
          '1.6 TCe RS Trophy 220hp': { fuel:'Gasoline', cc:1618, code:'M5M', ecu:'Continental EMS3125', hp:220, nm:260, hp1:240, nm1:320 },
        },
        'MK5 - 2019+': {
          '1.0 TCe 90hp': { fuel:'Gasoline', cc:999, code:'H4Dt', ecu:'Bosch ME17.9.20', hp:90, nm:160, hp1:115, nm1:200 },
          '1.0 TCe 100hp': { fuel:'Gasoline', cc:999, code:'H5H', ecu:'Continental EMS3120', hp:100, nm:160, hp1:120, nm1:200 },
          '1.3 TCe 130hp': { fuel:'Gasoline', cc:1333, code:'H5H', ecu:'Continental EMS3120', hp:130, nm:240, hp1:160, nm1:290 },
          '1.5 dCi 85hp': { fuel:'Diesel', cc:1461, code:'K9K', ecu:'Bosch EDC17C42', hp:85, nm:220, hp1:115, nm1:280 },
          '1.5 dCi 115hp': { fuel:'Diesel', cc:1461, code:'K9K', ecu:'Bosch EDC17C84', hp:115, nm:260, hp1:145, nm1:320 },
        }
      },
      Megane: {
        'MK3 - 2008-2016': {
          '1.5 dCi 110hp': { fuel:'Diesel', cc:1461, code:'K9K', ecu:'Siemens SID305', hp:110, nm:240, hp1:130, nm1:300 },
          '1.9 dCi 130hp': { fuel:'Diesel', cc:1870, code:'F9Q', ecu:'Bosch EDC16C36', hp:130, nm:300, hp1:160, nm1:370 },
          '2.0 dCi 160hp': { fuel:'Diesel', cc:1995, code:'M9R', ecu:'Bosch EDC16C36', hp:160, nm:380, hp1:190, nm1:440 },
          '2.0 T RS 250hp': { fuel:'Gasoline', cc:1998, code:'F4Rt', ecu:'Sagem S3000', hp:250, nm:340, hp1:295, nm1:400 },
          '2.0 T RS 265hp': { fuel:'Gasoline', cc:1998, code:'F4Rt', ecu:'Sagem S3000', hp:265, nm:360, hp1:305, nm1:420 },
        },
        'MK4 - 2016+': {
          '1.2 TCe 130hp': { fuel:'Gasoline', cc:1197, code:'H5F', ecu:'Continental EMS3125', hp:130, nm:205, hp1:155, nm1:260 },
          '1.3 TCe 140hp': { fuel:'Gasoline', cc:1332, code:'H5H', ecu:'Continental EMS3125', hp:140, nm:240, hp1:170, nm1:290 },
          '1.5 dCi 110hp': { fuel:'Diesel', cc:1461, code:'K9K', ecu:'Bosch EDC17C42', hp:110, nm:260, hp1:140, nm1:320 },
          '1.6 dCi 130hp': { fuel:'Diesel', cc:1598, code:'R9M', ecu:'Bosch EDC17C42', hp:130, nm:320, hp1:170, nm1:400 },
          '1.6 dCi GT 165hp': { fuel:'Diesel', cc:1598, code:'R9M', ecu:'Bosch EDC17C42', hp:165, nm:380, hp1:195, nm1:440 },
          '1.8 TCe RS 280hp': { fuel:'Gasoline', cc:1798, code:'M5P', ecu:'Siemens EMS3155', hp:280, nm:390, hp1:320, nm1:450 },
          '1.8 TCe Trophy 300hp': { fuel:'Gasoline', cc:1798, code:'M5P', ecu:'Siemens EMS3155', hp:300, nm:400, hp1:330, nm1:460 },
        }
      },
      Trafic: {
        'MK3 - 2014+': {
          '1.6 dCi 95hp': { fuel:'Diesel', cc:1598, code:'R9M', ecu:'Bosch EDC17C42', hp:95, nm:260, hp1:130, nm1:330 },
          '1.6 dCi 120hp': { fuel:'Diesel', cc:1598, code:'R9M', ecu:'Bosch EDC17C42', hp:120, nm:320, hp1:160, nm1:390 },
          '1.6 dCi 140hp': { fuel:'Diesel', cc:1598, code:'R9M', ecu:'Bosch EDC17C42', hp:140, nm:340, hp1:175, nm1:420 },
          '2.0 dCi 120hp': { fuel:'Diesel', cc:1997, code:'M9R', ecu:'Bosch EDC17C84', hp:120, nm:320, hp1:160, nm1:390 },
          '2.0 dCi 145hp': { fuel:'Diesel', cc:1997, code:'M9R', ecu:'Bosch EDC17C84', hp:145, nm:340, hp1:185, nm1:420 },
          '2.0 dCi 170hp': { fuel:'Diesel', cc:1997, code:'M9R', ecu:'Bosch EDC17C84', hp:170, nm:380, hp1:210, nm1:460 },
        }
      }
    },
    Peugeot: {
      '208': {
        'MK1 - 2012-2019': {
          '1.4 HDi 68hp': { fuel:'Diesel', cc:1398, code:'DV4TD', ecu:'Bosch EDC17C10', hp:68, nm:160, hp1:92, nm1:210 },
          '1.6 BlueHDi 75hp': { fuel:'Diesel', cc:1560, code:'DV6FE', ecu:'Bosch EDC17C60', hp:75, nm:230, hp1:115, nm1:280 },
          '1.6 BlueHDi 100hp': { fuel:'Diesel', cc:1560, code:'DV6FD', ecu:'Bosch EDC17C60', hp:100, nm:254, hp1:130, nm1:310 },
          '1.6 BlueHDi 120hp': { fuel:'Diesel', cc:1560, code:'DV6FC', ecu:'Bosch EDC17C60', hp:120, nm:300, hp1:150, nm1:360 },
          '1.6 THP GTI 200hp': { fuel:'Gasoline', cc:1598, code:'EP6CDTX', ecu:'Bosch MED17.4.2', hp:200, nm:275, hp1:230, nm1:340 },
          '1.6 THP GTI 30th 208hp': { fuel:'Gasoline', cc:1598, code:'EP6FDTX', ecu:'Bosch MED17.4.4', hp:208, nm:300, hp1:240, nm1:365 },
        },
        'MK2 - 2019+': {
          '1.2 PureTech 75hp': { fuel:'Gasoline', cc:1199, code:'EB2FA', ecu:'Valeo VD56.1', hp:75, nm:118, hp1:90, nm1:145 },
          '1.2 PureTech 100hp': { fuel:'Gasoline', cc:1199, code:'EB2ADT', ecu:'Valeo VD56.1', hp:100, nm:205, hp1:130, nm1:260 },
          '1.2 PureTech 130hp': { fuel:'Gasoline', cc:1199, code:'EB2ADTS', ecu:'Valeo VD56.1', hp:130, nm:230, hp1:160, nm1:290 },
          '1.5 BlueHDi 100hp': { fuel:'Diesel', cc:1499, code:'DV5RD', ecu:'Bosch MD1CS003', hp:100, nm:250, hp1:135, nm1:315 },
        }
      },
      '308': {
        'MK2 - 2013-2021': {
          '1.2 PureTech 110hp': { fuel:'Gasoline', cc:1199, code:'EB2DT', ecu:'Valeo VD46.1', hp:110, nm:205, hp1:135, nm1:250 },
          '1.2 PureTech 130hp': { fuel:'Gasoline', cc:1199, code:'EB2DTS', ecu:'Valeo VD46.1', hp:130, nm:230, hp1:155, nm1:280 },
          '1.5 BlueHDi 130hp': { fuel:'Diesel', cc:1499, code:'DV5RD', ecu:'Bosch MD1CS003', hp:130, nm:300, hp1:165, nm1:370 },
          '1.6 BlueHDi 120hp': { fuel:'Diesel', cc:1560, code:'DV6FD', ecu:'Bosch EDC17C60', hp:120, nm:300, hp1:155, nm1:370 },
          '1.6 THP GT 205hp': { fuel:'Gasoline', cc:1598, code:'EP6FDTM', ecu:'Bosch MED17.4.4', hp:205, nm:285, hp1:240, nm1:340 },
          '2.0 BlueHDi GT 180hp': { fuel:'Diesel', cc:1997, code:'DW10FC', ecu:'Delphi DCM6.2', hp:180, nm:400, hp1:215, nm1:470 },
          '1.6 e-THP GTI 270hp': { fuel:'Gasoline', cc:1598, code:'EP6FDTR', ecu:'Bosch MED17.4.4', hp:270, nm:330, hp1:300, nm1:395 },
        },
        'MK3 - 2021+': {
          '1.2 PureTech 130hp': { fuel:'Gasoline', cc:1199, code:'EB2ADTS', ecu:'Valeo VD56.1', hp:130, nm:230, hp1:160, nm1:290 },
          '1.5 BlueHDi 130hp': { fuel:'Diesel', cc:1499, code:'DV5RC', ecu:'Bosch MD1CS003', hp:130, nm:300, hp1:160, nm1:360 },
        }
      },
      '3008': {
        'MK2 - 2016+': {
          '1.2 PureTech 130hp': { fuel:'Gasoline', cc:1199, code:'EB2DTS', ecu:'Valeo VD46.1', hp:130, nm:230, hp1:155, nm1:280 },
          '1.5 BlueHDi 130hp': { fuel:'Diesel', cc:1499, code:'DV5RD', ecu:'Bosch MD1CS003', hp:130, nm:300, hp1:165, nm1:370 },
          '1.6 PureTech 180hp': { fuel:'Gasoline', cc:1598, code:'EP6FADTX', ecu:'Bosch MED17.4.4', hp:180, nm:250, hp1:210, nm1:310 },
          '2.0 BlueHDi 180hp': { fuel:'Diesel', cc:1997, code:'DW10FC', ecu:'Delphi DCM6.2', hp:180, nm:400, hp1:215, nm1:470 },
        }
      },
      '508': {
        'MK2 - 2018+': {
          '1.5 BlueHDi 130hp': { fuel:'Diesel', cc:1499, code:'DV5RD', ecu:'Bosch MD1CS003', hp:130, nm:300, hp1:165, nm1:370 },
          '2.0 BlueHDi 160hp': { fuel:'Diesel', cc:1997, code:'DW10FC', ecu:'Delphi DCM6.2', hp:160, nm:400, hp1:195, nm1:460 },
          '2.0 BlueHDi 180hp': { fuel:'Diesel', cc:1997, code:'DW10FC', ecu:'Delphi DCM6.2', hp:180, nm:400, hp1:215, nm1:470 },
          '1.6 PureTech 180hp': { fuel:'Gasoline', cc:1598, code:'EP6FADTX', ecu:'Bosch MED17.4.4', hp:180, nm:250, hp1:210, nm1:310 },
          '1.6 PureTech 225hp': { fuel:'Gasoline', cc:1598, code:'EP6FADTX', ecu:'Bosch MED17.4.4', hp:225, nm:300, hp1:260, nm1:370 },
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
    },
    Ford: {
      'Transit Custom': {
        '2018+': {
          '2.0 EcoBlue 130hp': { fuel:'Diesel', cc:1996, code:'YNF6', ecu:'Bosch EDC17C70', hp:130, nm:385, hp1:170, nm1:450 },
          '2.0 EcoBlue 170hp': { fuel:'Diesel', cc:1996, code:'YNFS', ecu:'Bosch EDC17C70', hp:170, nm:405, hp1:205, nm1:480 },
        }
      }
    },
    Peugeot: {
      'Boxer': {
        '2016+': {
          '2.0 BlueHDi 130hp': { fuel:'Diesel', cc:1997, code:'AH03', ecu:'Delphi DCM6.2', hp:130, nm:340, hp1:165, nm1:400 },
          '2.0 BlueHDi 160hp': { fuel:'Diesel', cc:1997, code:'AH03', ecu:'Delphi DCM6.2', hp:160, nm:350, hp1:195, nm1:420 },
        }
      }
    },
    Citroen: {
      'Jumper': {
        '2016+': {
          '2.0 BlueHDi 130hp': { fuel:'Diesel', cc:1997, code:'AH03', ecu:'Delphi DCM6.2', hp:130, nm:340, hp1:165, nm1:400 },
        }
      }
    },
    Fiat: {
      'Ducato': {
        '2014+': {
          '2.3 MultiJet 130hp': { fuel:'Diesel', cc:2287, code:'F1AGL', ecu:'Bosch EDC17C49', hp:130, nm:320, hp1:165, nm1:390 },
          '2.3 MultiJet 150hp': { fuel:'Diesel', cc:2287, code:'F1AGL', ecu:'Bosch EDC17C49', hp:150, nm:380, hp1:185, nm1:440 },
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

// Define standard engines template for generic models
// Based on real-world tuning data across common engine families
const genericEngines = {
  // ── Turbo Diesel ──
  '1.5 Turbo Diesel (100hp)': { fuel:'Diesel', cc:1499, code:'Generic 1.5d', ecu:'Bosch EDC17C60', hp:100, nm:250, hp1:130, nm1:310 },
  '1.6 Turbo Diesel (115hp)': { fuel:'Diesel', cc:1598, code:'Generic 1.6d', ecu:'Bosch EDC17C64', hp:115, nm:260, hp1:145, nm1:325 },
  '2.0 Turbo Diesel (150hp)': { fuel:'Diesel', cc:1968, code:'Generic 2.0d', ecu:'Bosch EDC17C74', hp:150, nm:340, hp1:190, nm1:420 },
  '2.0 Turbo Diesel (190hp)': { fuel:'Diesel', cc:1968, code:'Generic 2.0d', ecu:'Bosch MD1CP004', hp:190, nm:400, hp1:232, nm1:480 },
  '2.0 Turbo Diesel (240hp)': { fuel:'Diesel', cc:1999, code:'Generic 2.0d', ecu:'Bosch MD1CS006', hp:240, nm:500, hp1:285, nm1:580 },
  '3.0 V6 Turbo Diesel (258hp)': { fuel:'Diesel', cc:2967, code:'Generic 3.0d', ecu:'Bosch EDC17CP54', hp:258, nm:580, hp1:305, nm1:680 },
  '3.0 V6 Turbo Diesel (300hp)': { fuel:'Diesel', cc:2993, code:'Generic 3.0d', ecu:'Bosch EDC17CP55', hp:300, nm:650, hp1:350, nm1:740 },
  // ── Turbo Petrol ──
  '1.0 Turbo Petrol (95hp)':  { fuel:'Gasoline', cc:999,  code:'Generic 1.0T', ecu:'Bosch MED17.5.21', hp:95,  nm:160, hp1:120, nm1:200 },
  '1.0 Turbo Petrol (125hp)': { fuel:'Gasoline', cc:999,  code:'Generic 1.0T', ecu:'Bosch MED17.5.21', hp:125, nm:200, hp1:155, nm1:250 },
  '1.2 Turbo Petrol (110hp)': { fuel:'Gasoline', cc:1197, code:'Generic 1.2T', ecu:'Valeo VD56.1', hp:110, nm:185, hp1:138, nm1:230 },
  '1.4 Turbo Petrol (150hp)': { fuel:'Gasoline', cc:1395, code:'Generic 1.4T', ecu:'Bosch MED17.5.25', hp:150, nm:250, hp1:180, nm1:310 },
  '1.5 Turbo Petrol (150hp)': { fuel:'Gasoline', cc:1498, code:'Generic 1.5T', ecu:'Bosch MG1CS011', hp:150, nm:250, hp1:185, nm1:310 },
  '2.0 Turbo Petrol (190hp)': { fuel:'Gasoline', cc:1984, code:'Generic 2.0T', ecu:'Siemens Simos 18.1', hp:190, nm:320, hp1:235, nm1:395 },
  '2.0 Turbo Petrol (250hp)': { fuel:'Gasoline', cc:1984, code:'Generic 2.0T', ecu:'Siemens Simos 18.10', hp:250, nm:370, hp1:300, nm1:450 },
  '2.0 Turbo Petrol (300hp)': { fuel:'Gasoline', cc:1984, code:'Generic 2.0T', ecu:'Bosch MG1CS111', hp:300, nm:400, hp1:355, nm1:480 },
  '3.0 V6 Turbo Petrol (340hp)': { fuel:'Gasoline', cc:2995, code:'Generic 3.0T', ecu:'Bosch MG1CS111', hp:340, nm:500, hp1:395, nm1:580 },
  // ── Naturally Aspirated ──
  '1.6 NA Petrol (110hp)':  { fuel:'Gasoline', cc:1598, code:'Generic 1.6 NA', ecu:'Generic OEM', hp:110, nm:152, hp1:118, nm1:163 },
  '2.0 NA Petrol (150hp)':  { fuel:'Gasoline', cc:1998, code:'Generic 2.0 NA', ecu:'Generic OEM', hp:150, nm:195, hp1:162, nm1:210 },
  '2.5 NA Petrol (185hp)':  { fuel:'Gasoline', cc:2488, code:'Generic 2.5 NA', ecu:'Generic OEM', hp:185, nm:245, hp1:198, nm1:262 },
  // ── Hybrid & Electric ──
  '1.8 Hybrid (140hp)':  { fuel:'Hybrid', cc:1798, code:'Generic HEV', ecu:'OEM HEV ECU', hp:140, nm:185, hp1:152, nm1:200 },
  'Electric Motor (200hp)': { fuel:'Electric', cc:0, code:'EV Motor', ecu:'OEM BMS (locked)', hp:200, nm:350, hp1:200, nm1:350 },
  // ── Custom ──
  'Other / Custom Engine': { fuel:'Custom', cc:0, code:'Custom', ecu:'Custom', hp:0, nm:0, hp1:0, nm1:0 }
};

// Merge crawled brands & models into car category
allCarBrandsAndModels.forEach(item => {
  const brand = item.brand;
  if (!vehicleDatabase.car[brand]) {
    vehicleDatabase.car[brand] = {};
  }
  
  item.models.forEach(model => {
    if (!vehicleDatabase.car[brand][model]) {
      // Create a generic model entry
      vehicleDatabase.car[brand][model] = {
        'Standard - All Years': { ...genericEngines }
      };
    } else {
      // Model exists, append Custom Engine to all its generations
      const generations = vehicleDatabase.car[brand][model];
      Object.keys(generations).forEach(genName => {
        generations[genName]['Other / Custom Engine'] = { fuel:'Custom', cc:0, code:'Custom', ecu:'Custom', hp:0, nm:0, hp1:0, nm1:0 };
      });
    }
  });
});

// For any hardcoded car brand/model that didn't get merged because they were not in the crawled list,
// let's still add 'Other / Custom Engine' to all their models/generations!
Object.keys(vehicleDatabase.car).forEach(brand => {
  Object.keys(vehicleDatabase.car[brand]).forEach(model => {
    const generations = vehicleDatabase.car[brand][model];
    Object.keys(generations).forEach(genName => {
      if (!generations[genName]['Other / Custom Engine']) {
        generations[genName]['Other / Custom Engine'] = { fuel:'Custom', cc:0, code:'Custom', ecu:'Custom', hp:0, nm:0, hp1:0, nm1:0 };
      }
    });
  });
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
