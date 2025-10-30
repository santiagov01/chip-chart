import { useState } from "react";
import { Calculator, Zap, Battery, Radio } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const ElectronicsCalculator = () => {
  // Ohm's Law
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");

  // Power
  const [power, setPower] = useState("");
  const [powerV, setPowerV] = useState("");
  const [powerI, setPowerI] = useState("");

  // Energy
  const [energy, setEnergy] = useState("");
  const [energyP, setEnergyP] = useState("");
  const [time, setTime] = useState("");

  // Capacitor
  const [capacitance, setCapacitance] = useState("");
  const [frequency, setFrequency] = useState("");
  const [reactance, setReactance] = useState("");

  const calculateOhmsLaw = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const r = parseFloat(resistance);

    if (!isNaN(v) && !isNaN(i) && isNaN(r)) {
      setResistance((v / i).toFixed(4));
    } else if (!isNaN(v) && isNaN(i) && !isNaN(r)) {
      setCurrent((v / r).toFixed(4));
    } else if (isNaN(v) && !isNaN(i) && !isNaN(r)) {
      setVoltage((i * r).toFixed(4));
    }
  };

  const calculatePower = () => {
    const p = parseFloat(power);
    const v = parseFloat(powerV);
    const i = parseFloat(powerI);

    if (!isNaN(v) && !isNaN(i) && isNaN(p)) {
      setPower((v * i).toFixed(4));
    } else if (!isNaN(p) && !isNaN(v) && isNaN(i)) {
      setPowerI((p / v).toFixed(4));
    } else if (!isNaN(p) && isNaN(v) && !isNaN(i)) {
      setPowerV((p / i).toFixed(4));
    }
  };

  const calculateEnergy = () => {
    const e = parseFloat(energy);
    const p = parseFloat(energyP);
    const t = parseFloat(time);

    if (!isNaN(p) && !isNaN(t) && isNaN(e)) {
      setEnergy((p * t).toFixed(4));
    } else if (!isNaN(e) && !isNaN(t) && isNaN(p)) {
      setEnergyP((e / t).toFixed(4));
    } else if (!isNaN(e) && isNaN(t) && !isNaN(p)) {
      setTime((e / p).toFixed(4));
    }
  };

  const calculateReactance = () => {
    const c = parseFloat(capacitance) * 1e-6; // Convert μF to F
    const f = parseFloat(frequency);
    const xc = parseFloat(reactance);

    if (!isNaN(c) && !isNaN(f) && isNaN(xc)) {
      setReactance((1 / (2 * Math.PI * f * c)).toFixed(4));
    } else if (!isNaN(c) && isNaN(f) && !isNaN(xc)) {
      setFrequency((1 / (2 * Math.PI * c * xc)).toFixed(4));
    } else if (isNaN(c) && !isNaN(f) && !isNaN(xc)) {
      setCapacitance(((1 / (2 * Math.PI * f * xc)) * 1e6).toFixed(4));
    }
  };

  return (
    <div className="w-80 bg-card border-r border-border h-screen overflow-y-auto">
      <div className="p-4 border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Electronics Calculator
        </h2>
      </div>

      <div className="p-4">
        <Tabs defaultValue="ohm" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ohm">Ohm's Law</TabsTrigger>
            <TabsTrigger value="power">Power</TabsTrigger>
          </TabsList>
          <TabsList className="grid w-full grid-cols-2 mt-2">
            <TabsTrigger value="energy">Energy</TabsTrigger>
            <TabsTrigger value="reactance">Reactance</TabsTrigger>
          </TabsList>

          <TabsContent value="ohm" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Ohm's Law
                </CardTitle>
                <CardDescription className="text-xs">
                  V = I × R
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="voltage" className="text-xs">Voltage (V)</Label>
                  <Input
                    id="voltage"
                    type="number"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                    onBlur={calculateOhmsLaw}
                    placeholder="Enter voltage"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="current" className="text-xs">Current (A)</Label>
                  <Input
                    id="current"
                    type="number"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    onBlur={calculateOhmsLaw}
                    placeholder="Enter current"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="resistance" className="text-xs">Resistance (Ω)</Label>
                  <Input
                    id="resistance"
                    type="number"
                    value={resistance}
                    onChange={(e) => setResistance(e.target.value)}
                    onBlur={calculateOhmsLaw}
                    placeholder="Enter resistance"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="power" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Battery className="h-4 w-4 text-primary" />
                  Power Calculation
                </CardTitle>
                <CardDescription className="text-xs">
                  P = V × I
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="power" className="text-xs">Power (W)</Label>
                  <Input
                    id="power"
                    type="number"
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                    onBlur={calculatePower}
                    placeholder="Enter power"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="powerV" className="text-xs">Voltage (V)</Label>
                  <Input
                    id="powerV"
                    type="number"
                    value={powerV}
                    onChange={(e) => setPowerV(e.target.value)}
                    onBlur={calculatePower}
                    placeholder="Enter voltage"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="powerI" className="text-xs">Current (A)</Label>
                  <Input
                    id="powerI"
                    type="number"
                    value={powerI}
                    onChange={(e) => setPowerI(e.target.value)}
                    onBlur={calculatePower}
                    placeholder="Enter current"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="energy" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Energy Calculation
                </CardTitle>
                <CardDescription className="text-xs">
                  E = P × t
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="energy" className="text-xs">Energy (J or Wh)</Label>
                  <Input
                    id="energy"
                    type="number"
                    value={energy}
                    onChange={(e) => setEnergy(e.target.value)}
                    onBlur={calculateEnergy}
                    placeholder="Enter energy"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="energyP" className="text-xs">Power (W)</Label>
                  <Input
                    id="energyP"
                    type="number"
                    value={energyP}
                    onChange={(e) => setEnergyP(e.target.value)}
                    onBlur={calculateEnergy}
                    placeholder="Enter power"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-xs">Time (s or h)</Label>
                  <Input
                    id="time"
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    onBlur={calculateEnergy}
                    placeholder="Enter time"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reactance" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Radio className="h-4 w-4 text-primary" />
                  Capacitive Reactance
                </CardTitle>
                <CardDescription className="text-xs">
                  Xc = 1 / (2πfC)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="capacitance" className="text-xs">Capacitance (μF)</Label>
                  <Input
                    id="capacitance"
                    type="number"
                    value={capacitance}
                    onChange={(e) => setCapacitance(e.target.value)}
                    onBlur={calculateReactance}
                    placeholder="Enter capacitance"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="frequency" className="text-xs">Frequency (Hz)</Label>
                  <Input
                    id="frequency"
                    type="number"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    onBlur={calculateReactance}
                    placeholder="Enter frequency"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="reactance" className="text-xs">Reactance (Ω)</Label>
                  <Input
                    id="reactance"
                    type="number"
                    value={reactance}
                    onChange={(e) => setReactance(e.target.value)}
                    onBlur={calculateReactance}
                    placeholder="Enter reactance"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
