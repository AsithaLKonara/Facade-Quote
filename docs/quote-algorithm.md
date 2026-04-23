# Quote Algorithm - A ZONE Solutions

## Goal
To provide deterministic, accurate, and formula-based pricing for fabrication services.

## Formula Components
The total cost of a quote is calculated as:
`Total = (Material Cost) + (Machine Cost) + (Labor Cost) + (Delivery Cost)`

### 1. Material Cost
`Material Cost = Area (sqft) * Price Per SqFt * Quantity`
- Area (sqft) = (Width (in) * Height (in)) / 144

### 2. Machine Cost
`Machine Cost = Area (sqft) * Machine Rate * Quantity`
- CNC Cutting: `pricingData.cnc.cuttingPerSqFt`
- CNC Engraving: `pricingData.cnc.engravingPerSqFt`
- Laser Cutting: `pricingData.laser.cuttingPerSqFt`
- Laser Engraving: `pricingData.laser.engravingPerSqFt`

### 3. Labor Cost
`Labor Cost = Base Assembly Fee + (Material Cost * 0.1)`
- Additional fees are added for special options (e.g., Lighting: +1500 LKR).

### 4. Delivery Cost
`Delivery Cost = Distance (km) * Cost Per Km`
- Free for glass boards (not supported/restricted by engine).

## Deterministic Nature
The algorithm remains deterministic, with the possibility to add historical data-based adjustments or AI predictions in the future as per rule #11.
