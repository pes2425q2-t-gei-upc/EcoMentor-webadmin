import {Show, SimpleShowLayout, BooleanField, DateField, NumberField, TextField} from "react-admin";

export const CertificateShow = () => (
    <Show>
        <SimpleShowLayout>
            <NumberField source="certificateId" label="ID" />
            <TextField source="certificateType" label="Type" />
            <TextField source="documentId" label="Document ID" />
            <DateField source="entryDate" label="Entry Date" />
            <NumberField source="cadastreMeters" label="Cadastre Meters" />
            <TextField source="buildingUse" label="Building Use" />
            <NumberField source="buildingYear" label="Building Year" />
            <TextField source="floor" label="Floor" />
            <TextField source="door" label="Door" />
            <TextField source="climateZone" label="Climate Zone" />

            <NumberField source="nonRenewablePrimaryEnergy" label="Non-Renewable Primary Energy" />
            <TextField source="nonRenewablePrimaryQualification" label="Non-Renewable Primary Qual." />
            <NumberField source="finalEnergyConsumption" label="Final Energy Consumption" />

            <NumberField source="heatingEmissions" label="Heating Emissions" />
            <TextField source="heatingQualification" label="Heating Qual." />
            <NumberField source="refrigerationEmissions" label="Refrigeration Emissions" />
            <TextField source="refrigerationQualification" label="Refrigeration Qual." />
            <NumberField source="acsEmissions" label="ACS Emissions" />
            <TextField source="acsQualification" label="ACS Qual." />
            <NumberField source="lightingEmissions" label="Lighting Emissions" />
            <TextField source="lightingQualification" label="Lighting Qual." />
            <NumberField source="co2Emissions" label="CO2 Emissions" />
            <TextField source="co2Qualification" label="CO2 Qual." />

            <NumberField source="annualCost" label="Annual Cost" />
            <NumberField source="insulation" label="Insulation" />
            <NumberField source="windowEfficiency" label="Window Efficiency" />

            <BooleanField source="biomass" label="Biomass" />
            <BooleanField source="districtNet" label="District Net" />
            <BooleanField source="electricVehicle" label="Electric Vehicle" />
            <BooleanField source="energeticRehabilitation" label="Energetic Rehab." />
            <BooleanField source="geothermal" label="Geothermal" />
            <BooleanField source="photovoltaicSolar" label="Photovoltaic Solar" />
            <BooleanField source="residentialUseVentilation" label="Ventilation" />
            <BooleanField source="solarThermal" label="Solar Thermal" />
        </SimpleShowLayout>
    </Show>
);