import { Category } from "@/types/component";

export const sampleCategories: Category[] = [
  {
    id: "passive",
    name: "Passive Components",
    icon: "Cpu",
    subcategories: [
      {
        id: "resistors",
        name: "Resistors",
        categoryId: "passive",
        components: [
          {
            id: "res-1",
            name: "1kΩ Carbon Film Resistor",
            description: "General purpose 1/4W carbon film resistor with 5% tolerance",
            subcategoryId: "resistors",
            specifications: [
              { key: "Resistance", value: "1kΩ" },
              { key: "Power", value: "0.25W" },
              { key: "Tolerance", value: "±5%" },
              { key: "Temperature Coefficient", value: "±200ppm/°C" },
            ],
          },
          {
            id: "res-2",
            name: "10kΩ Metal Film Resistor",
            description: "Precision metal film resistor with low noise characteristics",
            subcategoryId: "resistors",
            specifications: [
              { key: "Resistance", value: "10kΩ" },
              { key: "Power", value: "0.5W" },
              { key: "Tolerance", value: "±1%" },
              { key: "Temperature Coefficient", value: "±50ppm/°C" },
            ],
          },
        ],
      },
      {
        id: "capacitors",
        name: "Capacitors",
        categoryId: "passive",
        components: [
          {
            id: "cap-1",
            name: "100nF Ceramic Capacitor",
            description: "X7R multilayer ceramic capacitor for decoupling applications",
            subcategoryId: "capacitors",
            specifications: [
              { key: "Capacitance", value: "100nF" },
              { key: "Voltage Rating", value: "50V" },
              { key: "Tolerance", value: "±10%" },
              { key: "Dielectric", value: "X7R" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "semiconductors",
    name: "Semiconductors",
    icon: "Zap",
    subcategories: [
      {
        id: "transistors",
        name: "Transistors",
        categoryId: "semiconductors",
        components: [
          {
            id: "trans-1",
            name: "2N2222A NPN Transistor",
            description: "General purpose NPN switching transistor",
            subcategoryId: "transistors",
            specifications: [
              { key: "Type", value: "NPN BJT" },
              { key: "Collector Current", value: "800mA" },
              { key: "Voltage", value: "40V" },
              { key: "Power", value: "500mW" },
              { key: "hFE", value: "100-300" },
            ],
          },
        ],
      },
      {
        id: "diodes",
        name: "Diodes",
        categoryId: "semiconductors",
        components: [
          {
            id: "diode-1",
            name: "1N4148 Switching Diode",
            description: "High-speed switching diode for general purpose applications",
            subcategoryId: "diodes",
            specifications: [
              { key: "Type", value: "Signal Diode" },
              { key: "Forward Current", value: "200mA" },
              { key: "Reverse Voltage", value: "100V" },
              { key: "Reverse Recovery", value: "4ns" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ics",
    name: "Integrated Circuits",
    icon: "Microchip",
    subcategories: [
      {
        id: "amplifiers",
        name: "Amplifiers and Comparators",
        categoryId: "ics",
        components: [
          {
            id: "opamp-1",
            name: "LM358 Dual Op-Amp",
            description: "Dual operational amplifier with low power consumption",
            subcategoryId: "amplifiers",
            specifications: [
              { key: "Channels", value: "2" },
              { key: "Supply Voltage", value: "3V to 32V" },
              { key: "Gain Bandwidth", value: "1MHz" },
              { key: "Slew Rate", value: "0.3V/µs" },
            ],
          },
        ],
      },
      {
        id: "timers",
        name: "Timers and Oscillators",
        categoryId: "ics",
        components: [
          {
            id: "timer-1",
            name: "NE555 Timer IC",
            description: "Precision timing circuit capable of producing accurate time delays",
            subcategoryId: "timers",
            specifications: [
              { key: "Supply Voltage", value: "4.5V to 16V" },
              { key: "Output Current", value: "200mA" },
              { key: "Frequency Range", value: "0.1Hz to 500kHz" },
              { key: "Temperature Stability", value: "50ppm/°C" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "sensors",
    name: "Sensors and Actuators",
    icon: "Radar",
    subcategories: [
      {
        id: "temperature",
        name: "Temperature Sensors",
        categoryId: "sensors",
        components: [
          {
            id: "temp-1",
            name: "LM35 Temperature Sensor",
            description: "Precision centigrade temperature sensor with linear output",
            subcategoryId: "temperature",
            specifications: [
              { key: "Range", value: "-55°C to 150°C" },
              { key: "Accuracy", value: "±0.5°C" },
              { key: "Output", value: "10mV/°C" },
              { key: "Supply Voltage", value: "4V to 30V" },
            ],
          },
        ],
      },
    ],
  },
];
